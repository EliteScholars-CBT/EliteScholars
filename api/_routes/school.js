// School / class dashboard: teachers make classes, students join with a code,
// teachers set assignments (text + images) and see how students are doing.
// All POST /api/school/<op>. Emails of students are never sent to other students;
// teachers see names/usernames and performance of the students in THEIR classes only.
import crypto from "crypto";
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { pushToEmails } from "../_helpers/push.js";
import { ensureAccount, planSummary, canUseSchool } from "../_helpers/schoolPlan.js";
import { canManageClass, planOwnerFor } from "../_helpers/schoolPortal.js";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const code6 = () => Array.from({ length: 6 }, () => ALPHABET[crypto.randomInt(ALPHABET.length)]).join("");
const clean = (v, n) => String(v || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, n);
const uuidish = (v) => /^[\w-]{6,64}$/.test(String(v || ""));
const IMG_RE = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
const MAX_IMG = 260000; // ~190KB image after base64
const mid = (id) => String(id);

async function loadClass(sb, id) {
  if (!uuidish(id)) return null;
  const { data } = await sb.from("classes").select("*").eq("id", id).maybeSingle();
  return data || null;
}
async function isMember(sb, classId, email) {
  const { data } = await sb.from("class_members").select("id").eq("class_id", classId).eq("email", email).maybeSingle();
  return !!data;
}
async function displayName(sb, email) {
  const { data } = await sb.from("profiles").select("username,first_name").eq("email", email).maybeSingle();
  return (data && (data.first_name || data.username)) || email.split("@")[0];
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "Classes are not available right now.", 503);
  const email = await requireUser(req, res);
  if (!email) return;
  if (!(await rateLimitOk(req, res, "school", 120, 60, email))) return;

  const op = String(req.query?.op || "");
  const b = readBody(req);
  const sb = getSupabase();

  try {
    // ── my classes (as teacher and as student) ──────────────────────────────
    if (op === "classes") {
      const { data: teaching } = await sb.from("classes").select("id,name,school_name,code,created_at").eq("teacher_email", email).order("created_at", { ascending: false });
      const { data: mem } = await sb.from("class_members").select("class_id").eq("email", email);
      const ids = (mem || []).map((m) => m.class_id);
      let joined = [];
      if (ids.length) {
        const { data } = await sb.from("classes").select("id,name,school_name,teacher_email").in("id", ids);
        joined = await Promise.all((data || []).map(async (c) => ({ id: c.id, name: c.name, school: c.school_name, teacher: await displayName(sb, c.teacher_email) })));
      }
      const counts = {};
      for (const c of teaching || []) {
        const { count } = await sb.from("class_members").select("id", { count: "exact", head: true }).eq("class_id", c.id);
        counts[c.id] = count || 0;
      }
      const total = Object.values(counts).reduce((a, n) => a + n, 0);
      const plan = (teaching || []).length ? await planSummary(sb, email, total) : null;
      return sendOk(res, { teaching: (teaching || []).map((c) => ({ id: c.id, name: c.name, school: c.school_name, code: c.code, students: counts[c.id] || 0 })), joined, plan });
    }

    // ── mock exams (student side) ────────────────────────────────────────────
    if (op === "mock-list") {
      const { data: ss } = await sb.from("school_students").select("school_id").eq("email", email).limit(10);
      const { data: cm } = await sb.from("class_members").select("class_id").eq("email", email).limit(60);
      const schoolIds = [...new Set((ss || []).map((r) => r.school_id))], classIds = new Set((cm || []).map((r) => r.class_id));
      if (!schoolIds.length) return sendOk(res, { mocks: [] });
      const since = new Date(Date.now() - 14 * 86400000).toISOString();
      const { data } = await sb.from("school_mocks").select("id,school_id,class_id,title,subject,exam_type,starts_at,ends_at,kind,source,duration_min,questions").in("school_id", schoolIds).gte("ends_at", since).order("starts_at", { ascending: false }).limit(20);
      const mine = (data || []).filter((m) => !m.class_id || classIds.has(m.class_id));
      const ids = mine.map((m) => m.id);
      const { data: sc } = ids.length ? await sb.from("school_mock_scores").select("mock_id,email,score").in("mock_id", ids).limit(10000) : { data: [] };
      const now = Date.now();
      return sendOk(res, { mocks: mine.map((m) => {
        const rows = (sc || []).filter((x) => x.mock_id === m.id).sort((a, c) => c.score - a.score);
        const my = rows.find((x) => x.email === email);
        return { id: m.id, kind: m.kind || "mock", source: m.source || "builtin", questions: Array.isArray(m.questions) ? m.questions.length : 0, duration_min: m.duration_min || 0, title: m.title, subject: m.subject, exam_type: m.exam_type, starts_at: m.starts_at, ends_at: m.ends_at,
          state: new Date(m.starts_at).getTime() > now ? "upcoming" : new Date(m.ends_at).getTime() > now ? "live" : "closed",
          done: !!my, my_score: my ? my.score : null, rank: my ? rows.indexOf(my) + 1 : null, took: rows.length };
      }) });
    }
    // Custom tests: the student gets the questions WITHOUT the answers; grading happens on the server.
    const openMock = async (id) => {
      if (!uuidish(id)) return { err: "Not found." };
      const { data: m } = await sb.from("school_mocks").select("id,school_id,class_id,title,starts_at,ends_at,source,questions,duration_min,kind").eq("id", id).maybeSingle();
      if (!m) return { err: "Not found." };
      const { data: ss } = await sb.from("school_students").select("email").eq("school_id", m.school_id).eq("email", email).maybeSingle();
      if (!ss) return { err: "This is not for you." };
      if (m.class_id && !(await isMember(sb, m.class_id, email))) return { err: "This is for another class." };
      return { m };
    };
    if (op === "mock-questions") {
      const { m, err } = await openMock(b.mock_id);
      if (err) return sendErr(res, err, 403);
      if (m.source !== "custom" || !Array.isArray(m.questions)) return sendErr(res, "This one uses the EliteScholars quiz.");
      const now = Date.now();
      if (now < new Date(m.starts_at).getTime() - 60000 || now > new Date(m.ends_at).getTime()) return sendErr(res, "This is not open right now.");
      const { data: had } = await sb.from("school_mock_scores").select("email").eq("mock_id", m.id).eq("email", email).maybeSingle();
      if (had) return sendErr(res, "You already took this one.");
      return sendOk(res, { title: m.title, kind: m.kind, duration_min: m.duration_min || 0, questions: m.questions.map((x) => ({ q: x.q, o: x.o })) });
    }
    if (op === "mock-submit") {
      if (!uuidish(b.mock_id)) return sendErr(res, "Not found.", 404);
      const { data: m } = await sb.from("school_mocks").select("id,school_id,class_id,starts_at,ends_at,source,questions").eq("id", b.mock_id).maybeSingle();
      if (!m) return sendErr(res, "Mock exam not found.", 404);
      const { data: ss } = await sb.from("school_students").select("email").eq("school_id", m.school_id).eq("email", email).maybeSingle();
      if (!ss) return sendErr(res, "This mock exam is not for you.", 403);
      if (m.class_id && !(await isMember(sb, m.class_id, email))) return sendErr(res, "This mock exam is for another class.", 403);
      const now = Date.now();
      if (now < new Date(m.starts_at).getTime() - 60000 || now > new Date(m.ends_at).getTime() + 30 * 60000) return sendErr(res, "This mock exam is not open.", 400);
      let review = null;
      if (m.source === "custom" && Array.isArray(m.questions)) { // grade it here: never trust a score sent by the phone
        const ans = Array.isArray(b.answers) ? b.answers : [];
        const total = m.questions.length; const correct = m.questions.reduce((n, x, i) => n + (Number(ans[i]) === x.a ? 1 : 0), 0);
        const score = total ? Math.round((correct * 100) / total) : 0;
        const { data: had2 } = await sb.from("school_mock_scores").select("email").eq("mock_id", m.id).eq("email", email).maybeSingle();
        if (had2) return sendOk(res, { already: true });
        const { error: e2 } = await sb.from("school_mock_scores").insert({ mock_id: m.id, email, score, correct, total });
        if (e2 && e2.code !== "23505") return sendErr(res, "Could not save your score.", 500);
        review = m.questions.map((x, i) => ({ a: x.a, e: x.e || "", yours: Number.isInteger(Number(ans[i])) ? Number(ans[i]) : null }));
        return sendOk(res, { score, correct, total, review });
      }
      const total = Math.max(0, Math.min(500, Math.round(Number(b.total) || 0))), correct = Math.max(0, Math.min(total, Math.round(Number(b.correct) || 0)));
      const score = total > 0 ? Math.round((correct * 100) / total) : Math.max(0, Math.min(100, Math.round(Number(b.score) || 0)));
      const { data: had } = await sb.from("school_mock_scores").select("email").eq("mock_id", m.id).eq("email", email).maybeSingle();
      if (had) return sendOk(res, { already: true });
      const { error } = await sb.from("school_mock_scores").insert({ mock_id: m.id, email, score, correct, total }); // first attempt counts
      if (error && error.code === "23505") return sendOk(res, { already: true });
      if (error) return sendErr(res, "Could not save your score.", 500);
      return sendOk(res, { score });
    }

    if (op === "class-create") {
      // Classes are created by school staff in the school portal, never from the student app.
      const { count: staffRows } = await sb.from("school_staff").select("email", { count: "exact", head: true }).eq("email", email);
      if (!staffRows) return sendErr(res, "Classes are created by teachers in the school portal (/school-portal).", 403);
      const name = clean(b.name, 60), school = clean(b.school, 80);
      if (name.length < 2) return sendErr(res, "Give the class a name.");
      const acc = await ensureAccount(sb, email, school);
      if (!(await canUseSchool(sb, email))) return sendErr(res, "Your free trial has ended. Contact EliteScholars to activate your school plan.", 402);
      if (school && !acc.school_name) await sb.from("school_accounts").update({ school_name: school }).eq("teacher_email", email);
      const { count } = await sb.from("classes").select("id", { count: "exact", head: true }).eq("teacher_email", email);
      if ((count || 0) >= 15) return sendErr(res, "You can have up to 15 classes.");
      for (let i = 0; i < 6; i++) {
        const code = code6();
        const { data, error } = await sb.from("classes").insert({ teacher_email: email, name, school_name: school, code }).select("id,code").single();
        if (!error && data) return sendOk(res, { class: { id: data.id, name, school, code: data.code, students: 0 } });
        if (error && error.code !== "23505") break;
      }
      return sendErr(res, "Could not create the class. Try again.", 500);
    }

    if (op === "class-join") {
      const code = clean(b.code, 10).toUpperCase();
      if (!/^[A-Z0-9]{6}$/.test(code)) return sendErr(res, "Enter the 6-character class code.");
      const { data: c } = await sb.from("classes").select("id,name,teacher_email,school_id").eq("code", code).maybeSingle();
      if (!c) return sendErr(res, "No class with that code.", 404);
      if (c.teacher_email === email) return sendErr(res, "That is your own class.");
      const { count } = await sb.from("class_members").select("id", { count: "exact", head: true }).eq("class_id", c.id);
      if ((count || 0) >= 300) return sendErr(res, "This class is full.");
      const { error } = await sb.from("class_members").upsert({ class_id: c.id, email, display_name: await displayName(sb, email) }, { onConflict: "class_id,email" });
      if (error) return sendErr(res, "Could not join.", 500);
      if (c.school_id) { try { await sb.from("school_students").upsert({ school_id: c.school_id, email }, { onConflict: "school_id,email", ignoreDuplicates: true }); } catch { /* portal list only */ } }
      return sendOk(res, { class: { id: c.id, name: c.name } });
    }

    if (op === "class-leave") {
      if (!uuidish(b.class_id)) return sendErr(res, "Invalid class.");
      await sb.from("class_members").delete().eq("class_id", b.class_id).eq("email", email);
      return sendOk(res, { left: true });
    }

    if (op === "class-delete") {
      const c = await loadClass(sb, b.class_id);
      if (!(await canManageClass(sb, c, email))) return sendErr(res, "Not allowed.", 403);
      await sb.from("classes").delete().eq("id", c.id);
      return sendOk(res, { deleted: true });
    }

    // ── teacher: students + performance ─────────────────────────────────────
    if (op === "class-members") {
      const c = await loadClass(sb, b.class_id);
      if (!(await canManageClass(sb, c, email))) return sendErr(res, "Not allowed.", 403);
      const { data: mem } = await sb.from("class_members").select("id,email,display_name,joined_at").eq("class_id", c.id).limit(300);
      const emails = (mem || []).map((m) => m.email);
      const { data: asg } = await sb.from("assignments").select("id").eq("class_id", c.id);
      const asgIds = (asg || []).map((a) => a.id);
      let done = [];
      if (asgIds.length) { const r = await sb.from("assignment_done").select("assignment_id,email").in("assignment_id", asgIds); done = r.data || []; }
      let profs = [];
      if (emails.length) {
        const r = await sb.from("profiles").select("email,username,first_name,last_name,level,total_xp,current_streak,quizzes_taken,total_correct,total_questions,last_active,subject_performance").in("email", emails);
        profs = r.data || [];
      }
      const byEmail = new Map(profs.map((p) => [p.email, p]));
      const students = (mem || []).map((m) => {
        const p = byEmail.get(m.email) || {};
        const sp = p.subject_performance && typeof p.subject_performance === "object" ? p.subject_performance : {};
        const subjects = Object.entries(sp).map(([k, v]) => ({ subject: k, avg: Math.round(v && v.total > 0 && v.correct != null ? (v.correct * 100) / v.total : Number(v && (v.avg ?? v.average ?? v.bestScore ?? v.score)) || 0) })).filter((x) => x.avg > 0).sort((a, b) => a.avg - b.avg).slice(0, 4);
        return {
          mid: mid(m.id),
          name: [p.first_name, p.last_name].filter(Boolean).join(" ") || m.display_name || p.username || "Student",
          username: p.username || "",
          level: p.level || 1, xp: p.total_xp || 0, streak: p.current_streak || 0, quizzes: p.quizzes_taken || 0,
          avg: p.total_questions > 0 ? Math.round((p.total_correct * 100) / p.total_questions) : 0,
          last_active: p.last_active || null,
          assignments_done: done.filter((d) => d.email === m.email).length,
          weakest: subjects,
        };
      });
      return sendOk(res, { class: { id: c.id, name: c.name, code: c.code }, assignments: asgIds.length, students });
    }

    if (op === "class-remove") {
      const c = await loadClass(sb, b.class_id);
      if (!(await canManageClass(sb, c, email))) return sendErr(res, "Not allowed.", 403);
      if (!uuidish(b.mid)) return sendErr(res, "Invalid student.");
      await sb.from("class_members").delete().eq("class_id", c.id).eq("id", b.mid);
      return sendOk(res, { removed: true });
    }

    // ── assignments ─────────────────────────────────────────────────────────
    if (op === "assign-create") {
      const c = await loadClass(sb, b.class_id);
      if (!(await canManageClass(sb, c, email))) return sendErr(res, "Not allowed.", 403);
      if (!(await canUseSchool(sb, await planOwnerFor(sb, c)))) return sendErr(res, "The school plan has ended. Contact EliteScholars to activate it.", 402);
      const title = clean(b.title, 120), body = String(b.body || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, 4000);
      if (title.length < 2) return sendErr(res, "Add a title.");
      if (!body && !(b.images && b.images.length)) return sendErr(res, "Write the assignment or add a picture.");
      const images = (Array.isArray(b.images) ? b.images : []).slice(0, 3);
      for (const im of images) if (typeof im !== "string" || im.length > MAX_IMG || !IMG_RE.test(im)) return sendErr(res, "Each picture must be a small JPG, PNG or WebP image.");
      let due = null;
      if (b.due_at) { const t = new Date(b.due_at).getTime(); if (!Number.isFinite(t)) return sendErr(res, "Invalid due date."); due = new Date(t).toISOString(); }
      const { data, error } = await sb.from("assignments").insert({ class_id: c.id, teacher_email: email, title, body, images, due_at: due }).select("id,created_at").single();
      if (error) { console.error("[school] assign", error.message); return sendErr(res, "Could not post the assignment.", 500); }
      const { data: mem } = await sb.from("class_members").select("email").eq("class_id", c.id);
      const dueTxt = due ? ` · due ${new Date(due).toLocaleDateString("en-NG", { day: "numeric", month: "short", timeZone: "Africa/Lagos" })}` : "";
      const pushed = await pushToEmails((mem || []).map((m) => m.email), { title: `📝 New assignment: ${title}`, body: `${c.name}${dueTxt}`, url: "/app", tag: "assignment-" + data.id, type: "assignment" });
      return sendOk(res, { id: data.id, notified: pushed.sent });
    }

    if (op === "assign-list") {
      // Teacher view of one class, or student view across all joined classes.
      let classIds = [], teacherMode = false, names = {};
      if (b.class_id) {
        const c = await loadClass(sb, b.class_id);
        if (!c) return sendErr(res, "Class not found.", 404);
        if (await canManageClass(sb, c, email)) teacherMode = true; else if (!(await isMember(sb, c.id, email))) return sendErr(res, "Not allowed.", 403);
        classIds = [c.id]; names[c.id] = c.name;
      } else {
        const { data: mem } = await sb.from("class_members").select("class_id").eq("email", email);
        classIds = (mem || []).map((m) => m.class_id);
        if (classIds.length) { const { data: cs } = await sb.from("classes").select("id,name").in("id", classIds); (cs || []).forEach((c) => { names[c.id] = c.name; }); }
      }
      if (!classIds.length) return sendOk(res, { assignments: [] });
      const { data: rows } = await sb.from("assignments").select("id,class_id,title,body,images,due_at,created_at").in("class_id", classIds).order("created_at", { ascending: false }).limit(60);
      const ids = (rows || []).map((r) => r.id);
      let done = [];
      if (ids.length) { const r = await sb.from("assignment_done").select("assignment_id,email").in("assignment_id", ids); done = r.data || []; }
      return sendOk(res, {
        assignments: (rows || []).map((r) => ({
          id: r.id, class_id: r.class_id, class_name: names[r.class_id] || "", title: r.title,
          preview: String(r.body || "").slice(0, 140), images: Array.isArray(r.images) ? r.images.length : 0,
          due_at: r.due_at, created_at: r.created_at,
          done: done.some((d) => d.assignment_id === r.id && d.email === email),
          done_count: teacherMode ? done.filter((d) => d.assignment_id === r.id).length : undefined,
        })),
      });
    }

    if (op === "assign-get") {
      if (!uuidish(b.id)) return sendErr(res, "Invalid assignment.");
      const { data: a } = await sb.from("assignments").select("*").eq("id", b.id).maybeSingle();
      if (!a) return sendErr(res, "Not found.", 404);
      const ac = await loadClass(sb, a.class_id);
      const mine = a.teacher_email === email || (await canManageClass(sb, ac, email));
      if (!mine && !(await isMember(sb, a.class_id, email))) return sendErr(res, "Not allowed.", 403);
      const { data: d } = await sb.from("assignment_done").select("id").eq("assignment_id", a.id).eq("email", email).maybeSingle();
      return sendOk(res, { assignment: { id: a.id, title: a.title, body: a.body, images: Array.isArray(a.images) ? a.images : [], due_at: a.due_at, created_at: a.created_at, done: !!d, mine } });
    }

    if (op === "assign-done") {
      if (!uuidish(b.id)) return sendErr(res, "Invalid assignment.");
      const { data: a } = await sb.from("assignments").select("id,class_id").eq("id", b.id).maybeSingle();
      if (!a || !(await isMember(sb, a.class_id, email))) return sendErr(res, "Not allowed.", 403);
      if (b.done === false) await sb.from("assignment_done").delete().eq("assignment_id", a.id).eq("email", email);
      else await sb.from("assignment_done").upsert({ assignment_id: a.id, email }, { onConflict: "assignment_id,email" });
      return sendOk(res, { done: b.done !== false });
    }

    if (op === "assign-delete") {
      if (!uuidish(b.id)) return sendErr(res, "Invalid assignment.");
      const { data: a } = await sb.from("assignments").select("id,class_id,teacher_email").eq("id", b.id).maybeSingle();
      if (!a) return sendOk(res, { deleted: true });
      if (a.teacher_email !== email && !(await canManageClass(sb, await loadClass(sb, a.class_id), email))) return sendErr(res, "Not allowed.", 403);
      await sb.from("assignments").delete().eq("id", a.id);
      return sendOk(res, { deleted: true });
    }
    return sendErr(res, "Unknown action.", 404);
  } catch (e) {
    console.error("[school]", op, e?.message);
    return sendErr(res, "Something went wrong.", 500);
  }
}
