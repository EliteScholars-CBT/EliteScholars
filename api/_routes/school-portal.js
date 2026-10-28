// School portal: POST /api/portal/<op>.
// A school has an owner (first admin), staff (admins and teachers), classes and students.
//  - Admins manage staff, classes, students and see school-wide reports.
//  - Teachers see only their own classes and those students.
// Students join with a class code (the normal app) or are created in bulk by the school.
import crypto from "crypto";
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase, supabaseEnabled, insertRow } from "../_helpers/supabase.js";
import { hashPasswordStrong } from "../_helpers/hash.js";
import { ensureAccount, planSummary, canUseSchool } from "../_helpers/schoolPlan.js";
import { roleIn, uuidish } from "../_helpers/schoolPortal.js";
import { pushToEmails } from "../_helpers/push.js";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const code6 = () => Array.from({ length: 6 }, () => ALPHABET[crypto.randomInt(ALPHABET.length)]).join("");
const clean = (v, n) => String(v || "").replace(/[\u0000-\u001F]/g, "").trim().slice(0, n);
const EMAIL = /^[^\s@,()"']+@[^\s@,()"']+\.[^\s@,()"']+$/;
const DAY = 86400000;
const STUDENT_DOMAIN = "students.elitescholars.site";
const chunk = (a, n) => { const o = []; for (let i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o; };
const PW_CHARS = "abcdefghjkmnpqrstuvwxyz23456789";
const tempPassword = () => Array.from({ length: 8 }, () => PW_CHARS[crypto.randomInt(PW_CHARS.length)]).join("");

async function profilesFor(sb, emails) {
  const out = new Map();
  for (const part of chunk([...new Set(emails)], 150)) {
    const { data } = await sb.from("profiles").select("email,username,first_name,last_name,level,total_xp,current_streak,quizzes_taken,total_correct,total_questions,last_active,subject_performance").in("email", part);
    (data || []).forEach((p) => out.set(p.email, p));
  }
  return out;
}
const nameOf = (p, fb) => (p && ([p.first_name, p.last_name].filter(Boolean).join(" ") || p.username)) || fb || "Student";
const avgOf = (p) => (p && p.total_questions > 0 ? Math.round((p.total_correct * 100) / p.total_questions) : 0);

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "The school portal is not available right now.", 503);
  const email = await requireUser(req, res);
  if (!email) return;
  if (!(await rateLimitOk(req, res, "portal", 150, 60, email))) return;
  const op = String(req.query?.op || "");
  const b = readBody(req);
  const sb = getSupabase();

  try {
    // ── which schools am I part of? ─────────────────────────────────────────
    if (op === "me") {
      const { data: owned } = await sb.from("schools").select("id,name").eq("owner_email", email);
      const { data: staff } = await sb.from("school_staff").select("school_id,role").eq("email", email);
      const ids = [...new Set([...(owned || []).map((s) => s.id), ...(staff || []).map((s) => s.school_id)])];
      let schools = [];
      if (ids.length) {
        const { data } = await sb.from("schools").select("id,name,owner_email,kind").in("id", ids);
        schools = (data || []).map((s) => ({ id: s.id, name: s.name, kind: s.kind || "school", role: s.owner_email === email ? "admin" : ((staff || []).find((x) => x.school_id === s.id) || {}).role || "teacher" }));
      }
      return sendOk(res, { schools });
    }

    if (op === "school-create") {
      const name = clean(b.name, 80);
      const kind = b.kind === "centre" ? "centre" : "school";
      if (name.length < 3) return sendErr(res, kind === "centre" ? "Enter your centre's name." : "Enter your school's name.");
      const { count } = await sb.from("schools").select("id", { count: "exact", head: true }).eq("owner_email", email);
      if ((count || 0) >= 3) return sendErr(res, "You already have the maximum number of schools.");
      const { data, error } = await sb.from("schools").insert({ name, owner_email: email, kind }).select("id,name,kind").single();
      if (error || !data) return sendErr(res, "Could not create the school. Try again.", 500);
      await sb.from("school_staff").upsert({ school_id: data.id, email, role: "admin", added_by: email }, { onConflict: "school_id,email" });
      await ensureAccount(sb, email, name, kind); // starts the free trial
      return sendOk(res, { school: { id: data.id, name: data.name, kind, role: "admin" } });
    }

    // everything below needs a school and a role in it
    const schoolId = String(b.school_id || "");
    const role = await roleIn(sb, schoolId, email);
    if (!role) return sendErr(res, "You are not part of this school.", 403);
    const isAdmin = role === "admin";
    const { data: school } = await sb.from("schools").select("id,name,owner_email,kind,logo").eq("id", schoolId).maybeSingle();
    if (!school) return sendErr(res, "School not found.", 404);
    const planOk = async () => canUseSchool(sb, school.owner_email);
    const PLAN_MSG = "The school plan has ended. Contact EliteScholars to activate it.";

    const classesOf = async () => {
      let q = sb.from("classes").select("id,name,code,teacher_email,created_at").eq("school_id", schoolId).order("created_at", { ascending: true }).limit(200);
      if (!isAdmin) q = q.eq("teacher_email", email);
      return (await q).data || [];
    };
    const membersOf = async (classIds) => {
      const out = [];
      for (const part of chunk(classIds, 50)) { const { data } = await sb.from("class_members").select("class_id,email,display_name").in("class_id", part).limit(5000); out.push(...(data || [])); }
      return out;
    };

    // ── overview ────────────────────────────────────────────────────────────
    if (op === "overview") {
      const classes = await classesOf();
      const mem = await membersOf(classes.map((c) => c.id));
      const counts = {}; mem.forEach((m) => { counts[m.class_id] = (counts[m.class_id] || 0) + 1; });
      const { data: allStudents } = await sb.from("school_students").select("email").eq("school_id", schoolId).limit(5000);
      const inClass = new Set((await membersOf((await sb.from("classes").select("id").eq("school_id", schoolId).limit(200)).data?.map((c) => c.id) || [])).map((m) => m.email));
      const total = (allStudents || []).length;
      const unassigned = isAdmin ? (allStudents || []).filter((s) => !inClass.has(s.email)).length : 0;
      let staff = [];
      if (isAdmin) {
        const { data } = await sb.from("school_staff").select("email,role,created_at").eq("school_id", schoolId).order("created_at", { ascending: true });
        const rows = data || [];
        if (!rows.find((r) => r.email === school.owner_email)) rows.unshift({ email: school.owner_email, role: "admin" });
        const pf = await profilesFor(sb, rows.map((r) => r.email));
        staff = rows.map((r) => ({ email: r.email, role: r.role, owner: r.email === school.owner_email, name: nameOf(pf.get(r.email), ""), registered: pf.has(r.email) }));
      }
      const nameByEmail = new Map(staff.map((s) => [s.email, s.name]));
      let teacherNames = nameByEmail;
      if (!isAdmin) teacherNames = new Map([[email, "You"]]);
      const plan = isAdmin ? await planSummary(sb, school.owner_email, total, school.kind) : null;
      return sendOk(res, {
        school: { id: school.id, name: school.name, kind: school.kind || "school", logo: school.logo || null }, role, plan,
        totals: { classes: classes.length, students: isAdmin ? total : new Set(mem.map((m) => m.email)).size, staff: staff.length, unassigned },
        classes: classes.map((c) => ({ id: c.id, name: c.name, code: c.code, teacher: c.teacher_email, teacher_name: teacherNames.get(c.teacher_email) || c.teacher_email.split("@")[0], students: counts[c.id] || 0 })),
        staff,
      });
    }

    // ── staff (admin) ───────────────────────────────────────────────────────
    if (op === "staff-add") {
      if (!isAdmin) return sendErr(res, "Only school admins can do that.", 403);
      const em = clean(b.email, 254).toLowerCase();
      if (!EMAIL.test(em)) return sendErr(res, "Enter a valid email address.");
      const r = b.role === "admin" ? "admin" : "teacher";
      const { count } = await sb.from("school_staff").select("email", { count: "exact", head: true }).eq("school_id", schoolId);
      if ((count || 0) >= 60) return sendErr(res, "That is the maximum number of staff.");
      if (em === school.owner_email) return sendErr(res, "The owner is already an admin.");
      await sb.from("school_staff").upsert({ school_id: schoolId, email: em, role: r, added_by: email }, { onConflict: "school_id,email" });
      const { data: p } = await sb.from("profiles").select("email").eq("email", em).maybeSingle();
      return sendOk(res, { added: em, hasAccount: !!p });
    }
    if (op === "staff-remove") {
      if (!isAdmin) return sendErr(res, "Only school admins can do that.", 403);
      const em = clean(b.email, 254).toLowerCase();
      if (em === school.owner_email) return sendErr(res, "The school owner cannot be removed.");
      await sb.from("school_staff").delete().eq("school_id", schoolId).eq("email", em);
      await sb.from("classes").update({ teacher_email: school.owner_email }).eq("school_id", schoolId).eq("teacher_email", em); // their classes go to the owner
      return sendOk(res, { removed: em });
    }

    // ── classes ─────────────────────────────────────────────────────────────
    if (op === "class-save") {
      if (!(await planOk())) return sendErr(res, PLAN_MSG, 402);
      const name = clean(b.name, 60);
      if (name.length < 2) return sendErr(res, "Give the class a name.");
      let teacher = clean(b.teacher_email, 254).toLowerCase() || email;
      if (!isAdmin) teacher = email; // teachers only create/rename their own
      if (teacher !== school.owner_email) {
        const { data: st } = await sb.from("school_staff").select("email").eq("school_id", schoolId).eq("email", teacher).maybeSingle();
        if (!st) return sendErr(res, "Add that teacher to the school first.");
      }
      if (b.id) {
        if (!uuidish(b.id)) return sendErr(res, "Invalid class.");
        const { data: c } = await sb.from("classes").select("id,teacher_email,school_id").eq("id", b.id).maybeSingle();
        if (!c || c.school_id !== schoolId) return sendErr(res, "Class not found.", 404);
        if (!isAdmin && c.teacher_email !== email) return sendErr(res, "Not allowed.", 403);
        await sb.from("classes").update({ name, teacher_email: teacher }).eq("id", c.id);
        return sendOk(res, { id: c.id });
      }
      const { count } = await sb.from("classes").select("id", { count: "exact", head: true }).eq("school_id", schoolId);
      if ((count || 0) >= 100) return sendErr(res, "That is the maximum number of classes.");
      for (let i = 0; i < 6; i++) {
        const { data, error } = await sb.from("classes").insert({ teacher_email: teacher, name, school_name: school.name, school_id: schoolId, code: code6() }).select("id,code").single();
        if (!error && data) return sendOk(res, { id: data.id, code: data.code });
        if (error && error.code !== "23505") break;
      }
      return sendErr(res, "Could not create the class. Try again.", 500);
    }
    if (op === "class-delete") {
      if (!isAdmin) return sendErr(res, "Only school admins can do that.", 403);
      if (!uuidish(b.id)) return sendErr(res, "Invalid class.");
      await sb.from("classes").delete().eq("id", b.id).eq("school_id", schoolId);
      return sendOk(res, { deleted: true });
    }

    // ── students ────────────────────────────────────────────────────────────
    const myClassIds = async () => (await classesOf()).map((c) => c.id);
    const classAllowed = async (id) => { if (!uuidish(id)) return null; const { data: c } = await sb.from("classes").select("id,name,teacher_email,school_id").eq("id", id).maybeSingle(); if (!c || c.school_id !== schoolId) return null; if (!isAdmin && c.teacher_email !== email) return null; return c; };

    if (op === "students") {
      const classes = await classesOf();
      const byId = new Map(classes.map((c) => [c.id, c]));
      let ids = classes.map((c) => c.id);
      if (b.class_id) { if (!byId.has(b.class_id)) return sendErr(res, "Class not found.", 404); ids = [b.class_id]; }
      const mem = await membersOf(ids);
      const emails = mem.map((m) => m.email);
      let extra = [];
      if (isAdmin && !b.class_id) {
        const { data } = await sb.from("school_students").select("email,created_by_school").eq("school_id", schoolId).limit(5000);
        extra = (data || []).filter((s) => !emails.includes(s.email));
      }
      const { data: made } = await sb.from("school_students").select("email,created_by_school").eq("school_id", schoolId).eq("created_by_school", true).limit(5000);
      const madeSet = new Set((made || []).map((m) => m.email));
      const pf = await profilesFor(sb, [...emails, ...extra.map((e) => e.email)]);
      const seen = new Map();
      const rows = [];
      const add = (em, cid) => {
        const p = pf.get(em);
        if (!seen.has(em)) { const row = { email: madeSet.has(em) ? em : "", username: (p && p.username) || "", name: nameOf(p, em.split("@")[0]), classes: [], xp: (p && p.total_xp) || 0, streak: (p && p.current_streak) || 0, quizzes: (p && p.quizzes_taken) || 0, avg: avgOf(p), last_active: (p && p.last_active) || null, created: madeSet.has(em), key: em }; seen.set(em, row); rows.push(row); }
        if (cid) seen.get(em).classes.push({ id: cid, name: byId.get(cid)?.name || "" });
      };
      mem.forEach((m) => add(m.email, m.class_id));
      extra.forEach((e) => add(e.email, null));
      rows.sort((a, c2) => a.name.localeCompare(c2.name));
      return sendOk(res, { students: rows.slice(0, 1000) });
    }

    if (op === "student-add") {
      if (!(await planOk())) return sendErr(res, PLAN_MSG, 402);
      const c = await classAllowed(b.class_id);
      if (!c) return sendErr(res, "Choose one of your classes.");
      const id = clean(b.identifier, 254).toLowerCase();
      if (id.length < 3) return sendErr(res, "Enter the student's username or email.");
      let { data: p } = await sb.from("profiles").select("email,username,first_name").eq(id.includes("@") ? "email" : "username", id).maybeSingle();
      if (!p && !id.includes("@")) { try { const r = await sb.from("profiles").select("email,username,first_name").ilike("username", id).maybeSingle(); p = r.data; } catch { /* exact match only */ } }
      if (!p) return sendErr(res, "No student found with that username or email. Ask them to sign up first, or use the class code.", 404);
      const { count } = await sb.from("class_members").select("id", { count: "exact", head: true }).eq("class_id", c.id);
      if ((count || 0) >= 300) return sendErr(res, "This class is full.");
      await sb.from("class_members").upsert({ class_id: c.id, email: p.email, display_name: p.first_name || p.username || "" }, { onConflict: "class_id,email" });
      await sb.from("school_students").upsert({ school_id: schoolId, email: p.email }, { onConflict: "school_id,email", ignoreDuplicates: true });
      return sendOk(res, { added: p.username || p.first_name || "Student" });
    }

    if (op === "student-bulk") {
      if (!(await planOk())) return sendErr(res, PLAN_MSG, 402);
      const c = await classAllowed(b.class_id);
      if (!c) return sendErr(res, "Choose one of your classes.");
      const names = [...new Set((Array.isArray(b.names) ? b.names : String(b.names || "").split(/\n|,/)).map((n) => clean(n, 60)).filter((n) => n.length >= 2))].slice(0, 60);
      if (!names.length) return sendErr(res, "Type or paste at least one student name.");
      const { count } = await sb.from("class_members").select("id", { count: "exact", head: true }).eq("class_id", c.id);
      if ((count || 0) + names.length > 300) return sendErr(res, "That would make the class larger than 300 students.");
      const out = [];
      for (const full of names) {
        const parts = full.split(/\s+/);
        const first = parts[0], last = parts.slice(1).join(" ") || "-";
        const slug = (parts.join("").toLowerCase().replace(/[^a-z0-9]/g, "") || "student").slice(0, 12);
        let created = null, pw = tempPassword();
        for (let i = 0; i < 6 && !created; i++) {
          const suffix = String(crypto.randomInt(1000, 9999));
          const username = (/^[a-z]/.test(slug) ? slug : "s" + slug).slice(0, 14) + suffix;
          const em = `${username}@${STUDENT_DOMAIN}`;
          const r = await insertRow("profiles", { email: em, username, first_name: first.slice(0, 40), last_name: last.slice(0, 40), password_hash: hashPasswordStrong(pw), student_type: "senior_school", selected_exams: [] });
          if (r.ok) created = { email: em, username };
        }
        if (!created) { out.push({ name: full, error: "Could not create this one. Try again." }); continue; }
        await sb.from("class_members").upsert({ class_id: c.id, email: created.email, display_name: first }, { onConflict: "class_id,email" });
        await sb.from("school_students").upsert({ school_id: schoolId, email: created.email, created_by_school: true }, { onConflict: "school_id,email" });
        out.push({ name: full, username: created.username, email: created.email, password: pw });
      }
      return sendOk(res, { class: c.name, created: out.filter((o) => !o.error).length, accounts: out });
    }

    if (op === "student-reset") {
      const em = clean(b.email, 254).toLowerCase();
      const { data: ss } = await sb.from("school_students").select("email,created_by_school").eq("school_id", schoolId).eq("email", em).maybeSingle();
      if (!ss || !ss.created_by_school) return sendErr(res, "You can only reset passwords for accounts the school created.", 403);
      if (!isAdmin) { const ids = await myClassIds(); const mem = ids.length ? (await sb.from("class_members").select("email").in("class_id", ids).eq("email", em)).data || [] : []; if (!mem.length) return sendErr(res, "Not allowed.", 403); }
      const pw = tempPassword();
      await sb.from("profiles").update({ password_hash: hashPasswordStrong(pw) }).eq("email", em);
      return sendOk(res, { email: em, password: pw });
    }

    if (op === "student-move") {
      if (!isAdmin) return sendErr(res, "Only school admins can move students.", 403);
      const em = clean(b.email, 254).toLowerCase();
      const { data: ss } = await sb.from("school_students").select("email").eq("school_id", schoolId).eq("email", em).maybeSingle();
      if (!ss) return sendErr(res, "That student is not in this school.", 404);
      const { data: cls } = await sb.from("classes").select("id").eq("school_id", schoolId);
      const ids = (cls || []).map((c) => c.id);
      if (ids.length) await sb.from("class_members").delete().eq("email", em).in("class_id", ids);
      if (b.class_id) {
        const c = await classAllowed(b.class_id);
        if (!c) return sendErr(res, "Class not found.", 404);
        const { data: p } = await sb.from("profiles").select("first_name,username").eq("email", em).maybeSingle();
        await sb.from("class_members").upsert({ class_id: c.id, email: em, display_name: (p && (p.first_name || p.username)) || "" }, { onConflict: "class_id,email" });
      }
      return sendOk(res, { moved: true });
    }

    if (op === "student-remove") {
      const em = clean(b.email, 254).toLowerCase();
      const { data: cls } = await sb.from("classes").select("id,teacher_email").eq("school_id", schoolId);
      const ids = (cls || []).filter((c) => isAdmin || c.teacher_email === email).map((c) => c.id);
      if (ids.length) await sb.from("class_members").delete().eq("email", em).in("class_id", ids);
      if (isAdmin) await sb.from("school_students").delete().eq("school_id", schoolId).eq("email", em);
      return sendOk(res, { removed: true });
    }

    // ── reports ─────────────────────────────────────────────────────────────
    const scoreOf = (p) => { const x = p || {}; if (Number.isFinite(Number(x.score)) && x.score !== null && x.score !== "") return Math.max(0, Math.min(100, Math.round(Number(x.score)))); const q = Number(x.totalQ); return q > 0 ? Math.round((Number(x.correct) * 100) / q) : null; };
    const dayKey = (t) => new Date(new Date(t).getTime() + 3600000).toISOString().slice(0, 10); // Lagos day
    const quizEvents = async (emails, sinceIso) => {
      const rows = [];
      for (const part of chunk([...new Set(emails)], 100)) {
        const { data } = await sb.from("events").select("email,payload,created_at").eq("type", "quiz_complete").in("email", part).gte("created_at", sinceIso).order("created_at", { ascending: false }).limit(4000);
        (data || []).forEach((r) => rows.push({ email: r.email, subject: String((r.payload && r.payload.subject) || "other"), score: scoreOf(r.payload), at: r.created_at }));
      }
      return rows.filter((r) => r.score !== null);
    };
    const mean = (a) => (a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : 0);
    const series = (days, rows) => {
      const out = [];
      for (let i = days - 1; i >= 0; i--) out.push({ day: dayKey(Date.now() - i * DAY), quizzes: 0, active: new Set() });
      const idx = new Map(out.map((d, i) => [d.day, i]));
      rows.forEach((r) => { const i = idx.get(dayKey(r.at)); if (i !== undefined) { out[i].quizzes++; out[i].active.add(r.email); } });
      return out.map((d) => ({ day: d.day, quizzes: d.quizzes, active: d.active.size }));
    };
    const asgStats = async (classIds, memberships) => {
      const asg = []; const done = [];
      if (classIds.length) { const { data } = await sb.from("assignments").select("id,class_id,title,due_at,created_at").in("class_id", classIds).order("created_at", { ascending: false }).limit(500); asg.push(...(data || [])); }
      for (const part of chunk(asg.map((a) => a.id), 100)) { const { data } = await sb.from("assignment_done").select("assignment_id,email").in("assignment_id", part); done.push(...(data || [])); }
      return { asg, doneSet: new Set(done.map((d) => d.assignment_id + "|" + d.email)) };
    };

    if (op === "reports") {
      const days = [7, 30, 90].includes(Number(b.days)) ? Number(b.days) : 30;
      let classes = await classesOf();
      if (b.class_id) classes = classes.filter((c) => c.id === b.class_id);
      const mem = await membersOf(classes.map((c) => c.id));
      const emails = [...new Set(mem.map((m) => m.email))];
      const pf = await profilesFor(sb, emails);
      const since = new Date(Date.now() - days * DAY).toISOString();
      const prevSince = new Date(Date.now() - 2 * days * DAY).toISOString();
      const all = await quizEvents(emails, prevSince);
      const cur = all.filter((r) => r.at >= since), prev = all.filter((r) => r.at < since);
      const { asg, doneSet } = await asgStats(classes.map((c) => c.id), mem);
      const clsOfEmail = new Map(); mem.forEach((m) => { const c = classes.find((x) => x.id === m.class_id); if (c) { if (!clsOfEmail.has(m.email)) clsOfEmail.set(m.email, []); clsOfEmail.get(m.email).push(c.name); } });
      const now = Date.now();
      const lastActive = (p) => (p && p.last_active ? new Date(p.last_active).getTime() : 0);
      const students = emails.map((em) => {
        const p = pf.get(em); const mine = cur.filter((r) => r.email === em); const before = prev.filter((r) => r.email === em);
        const myClassIds = mem.filter((m) => m.email === em).map((m) => m.class_id);
        const myAsg = asg.filter((a) => myClassIds.includes(a.class_id));
        const hw = myAsg.filter((a) => doneSet.has(a.id + "|" + em)).length;
        const avg = mean(mine.map((r) => r.score)), pavg = mean(before.map((r) => r.score));
        const idle = lastActive(p) ? Math.floor((now - lastActive(p)) / DAY) : 999;
        const risk = idle >= 14 || (mine.length >= 3 && avg < 40) ? "high" : idle >= 7 || (mine.length >= 3 && avg < 50) ? "watch" : "ok";
        return { key: em, name: nameOf(p, em.split("@")[0]), username: (p && p.username) || "", classes: clsOfEmail.get(em) || [], quizzes: mine.length, avg, trend: mine.length && before.length ? avg - pavg : null, streak: (p && p.current_streak) || 0, xp: (p && p.total_xp) || 0, last_active: (p && p.last_active) || null, idle_days: idle === 999 ? null : idle, homework: myAsg.length ? `${hw}/${myAsg.length}` : "-", hw_pct: myAsg.length ? Math.round((hw * 100) / myAsg.length) : null, risk };
      }).sort((a, c2) => a.name.localeCompare(c2.name));
      const perClass = classes.map((c) => {
        const ms = mem.filter((m) => m.class_id === c.id).map((m) => m.email);
        const rows = cur.filter((r) => ms.includes(r.email));
        const act = new Set(rows.map((r) => r.email)).size;
        const ids = asg.filter((a) => a.class_id === c.id);
        const possible = ids.length * ms.length;
        const got = ids.reduce((n, a) => n + ms.filter((e) => doneSet.has(a.id + "|" + e)).length, 0);
        return { id: c.id, name: c.name, teacher: c.teacher_email, students: ms.length, quizzes: rows.length, avg: mean(rows.map((r) => r.score)), participation: ms.length ? Math.round((act * 100) / ms.length) : 0, homework: possible ? Math.round((got * 100) / possible) : null, assignments: ids.length };
      });
      const sub = {};
      cur.forEach((r) => { const o = (sub[r.subject] = sub[r.subject] || { subject: r.subject, scores: [], who: new Set() }); o.scores.push(r.score); o.who.add(r.email); });
      const subjects = Object.values(sub).map((o) => ({ subject: o.subject, avg: mean(o.scores), attempts: o.scores.length, students: o.who.size })).sort((a, c2) => c2.attempts - a.attempts);
      const buckets = [["0-39", 0, 39], ["40-49", 40, 49], ["50-59", 50, 59], ["60-69", 60, 69], ["70-79", 70, 79], ["80-100", 80, 100]].map(([label, lo, hi]) => ({ label, count: students.filter((s) => s.quizzes > 0 && s.avg >= lo && s.avg <= hi).length }));
      const withQ = students.filter((s) => s.quizzes > 0);
      const activeN = students.filter((s) => s.quizzes > 0).length;
      return sendOk(res, {
        days, since, generated: new Date().toISOString(),
        summary: { students: students.length, active: activeN, participation: students.length ? Math.round((activeN * 100) / students.length) : 0, quizzes: cur.length, avg: mean(cur.map((r) => r.score)), prevAvg: prev.length ? mean(prev.map((r) => r.score)) : null, prevQuizzes: prev.length, atRisk: students.filter((s) => s.risk === "high").length, watch: students.filter((s) => s.risk === "watch").length },
        series: series(days, cur), classes: perClass, subjects, distribution: buckets, students,
        top: [...withQ].sort((a, c2) => c2.avg - a.avg || c2.quizzes - a.quizzes).slice(0, 10),
        improvers: withQ.filter((s) => s.trend !== null && s.trend > 0).sort((a, c2) => c2.trend - a.trend).slice(0, 5),
        needsHelp: students.filter((s) => s.risk !== "ok").sort((a, c2) => (a.risk === c2.risk ? (c2.idle_days || 0) - (a.idle_days || 0) : a.risk === "high" ? -1 : 1)).slice(0, 30),
      });
    }

    if (op === "student-report") {
      const em = clean(b.email, 254).toLowerCase();
      const classes = await classesOf();
      const mem = (await membersOf(classes.map((c) => c.id))).filter((m) => m.email === em);
      if (!mem.length) return sendErr(res, "That student is not in your classes.", 404);
      const days = [30, 90].includes(Number(b.days)) ? Number(b.days) : 90;
      const pf = await profilesFor(sb, [em]); const p = pf.get(em);
      const since = new Date(Date.now() - days * DAY).toISOString();
      const rows = await quizEvents([em], since);
      const myClasses = mem.map((m) => classes.find((c) => c.id === m.class_id)).filter(Boolean);
      const { asg, doneSet } = await asgStats(myClasses.map((c) => c.id), mem);
      const bySubject = {};
      rows.forEach((r) => { (bySubject[r.subject] = bySubject[r.subject] || []).push(r); });
      const subjects = Object.entries(bySubject).map(([s, a]) => ({ subject: s, avg: mean(a.map((r) => r.score)), attempts: a.length, best: Math.max(...a.map((r) => r.score)), last: a[0].score })).sort((x, y) => y.avg - x.avg);
      const weekly = []; for (let i = 11; i >= 0; i--) { const lo = Date.now() - (i + 1) * 7 * DAY, hi = Date.now() - i * 7 * DAY; const w = rows.filter((r) => { const t = new Date(r.at).getTime(); return t >= lo && t < hi; }); weekly.push({ label: `W${12 - i}`, avg: w.length ? mean(w.map((r) => r.score)) : null, quizzes: w.length }); }
      const half = rows.filter((r) => new Date(r.at).getTime() >= Date.now() - (days / 2) * DAY), older = rows.filter((r) => new Date(r.at).getTime() < Date.now() - (days / 2) * DAY);
      return sendOk(res, {
        student: { name: nameOf(p, em.split("@")[0]), username: (p && p.username) || "", classes: myClasses.map((c) => c.name), level: (p && p.level) || 1, xp: (p && p.total_xp) || 0, streak: (p && p.current_streak) || 0, last_active: (p && p.last_active) || null, overall: avgOf(p), quizzes_all: (p && p.quizzes_taken) || 0 },
        days, quizzes: rows.length, avg: mean(rows.map((r) => r.score)), trend: half.length && older.length ? mean(half.map((r) => r.score)) - mean(older.map((r) => r.score)) : null,
        series: series(Math.min(days, 30), rows), weekly, subjects, strengths: subjects.filter((s) => s.attempts >= 2).slice(0, 3), weak: [...subjects].filter((s) => s.attempts >= 2).sort((x, y) => x.avg - y.avg).slice(0, 3),
        recent: rows.slice(0, 15), homework: asg.slice(0, 30).map((a) => ({ title: a.title, due_at: a.due_at, done: doneSet.has(a.id + "|" + em) })),
      });
    }

    // ── logo ────────────────────────────────────────────────────────────────
    if (op === "school-logo") {
      if (!isAdmin) return sendErr(res, "Only admins can change the logo.", 403);
      const img = String(b.image || "");
      if (img === "") { await sb.from("schools").update({ logo: null }).eq("id", schoolId); return sendOk(res, { logo: null }); }
      if (!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(img) || img.length > 160000) return sendErr(res, "Use a PNG or JPEG logo (it is shrunk automatically). This one is too large.");
      await sb.from("schools").update({ logo: img }).eq("id", schoolId);
      return sendOk(res, { logo: img });
    }

    // ── notices (shown as official statuses to students) ────────────────────
    const BGS = ["violet", "gold", "teal", "rose", "blue", "dark"];
    const postNotice = async (text, classId, hours, bg) => {
      const expires = new Date(Date.now() + hours * 3600000).toISOString();
      const { data, error } = await sb.from("statuses").insert({ email, display_name: school.name, text, bg, privacy: "school", school_id: schoolId, class_id: classId || null, expires_at: expires }).select("id,created_at").single();
      if (error || !data) return null;
      let emails;
      if (classId) emails = (await membersOf([classId])).map((m) => m.email);
      else emails = ((await sb.from("school_students").select("email").eq("school_id", schoolId).limit(5000)).data || []).map((r) => r.email);
      try { await pushToEmails(emails, { title: `📢 ${school.name}`, body: text.slice(0, 110), url: "/app", tag: "notice-" + data.id, type: "notice" }); } catch { /* push is best effort */ }
      return { id: data.id, audience: emails.length };
    };
    if (op === "announce") {
      if (!(await planOk())) return sendErr(res, PLAN_MSG, 402);
      if (!(await rateLimitOk(req, res, "notice", 30, 3600, email))) return;
      const text = String(b.text || "").replace(/\r/g, "").replace(/[\u0000-\u0009\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, 600);
      if (text.length < 3) return sendErr(res, "Write the notice first.");
      let classId = null;
      if (b.class_id) { const c = await classAllowed(b.class_id); if (!c) return sendErr(res, "Choose one of your classes."); classId = c.id; }
      else if (!isAdmin) return sendErr(res, "Choose one of your classes to post to.");
      const hours = [24, 72, 168].includes(Number(b.hours)) ? Number(b.hours) : 24;
      const r = await postNotice(text, classId, hours, BGS.includes(b.bg) ? b.bg : "violet");
      if (!r) return sendErr(res, "Could not post the notice. Run the update-8 SQL, then try again.", 500);
      return sendOk(res, r);
    }
    if (op === "announce-list") {
      let q = sb.from("statuses").select("id,text,class_id,created_at,expires_at,email").eq("school_id", schoolId).eq("privacy", "school").order("created_at", { ascending: false }).limit(40);
      if (!isAdmin) q = q.eq("email", email);
      const { data } = await q;
      const cls = (await sb.from("classes").select("id,name").eq("school_id", schoolId).limit(200)).data || [];
      const now = Date.now();
      return sendOk(res, { notices: (data || []).map((n) => ({ id: n.id, text: n.text, class: n.class_id ? ((cls.find((c) => c.id === n.class_id) || {}).name || "Class") : "Everyone", at: n.created_at, live: new Date(n.expires_at).getTime() > now, expires: n.expires_at, mine: n.email === email })) });
    }
    if (op === "announce-delete") {
      if (!uuidish(b.id)) return sendErr(res, "Not found.", 404);
      let q = sb.from("statuses").delete().eq("id", b.id).eq("school_id", schoolId);
      if (!isAdmin) q = q.eq("email", email);
      await q;
      return sendOk(res, {});
    }

    // ── mock exam nights ────────────────────────────────────────────────────
    if (op === "mock-save") {
      if (!(await planOk())) return sendErr(res, PLAN_MSG, 402);
      const title = clean(b.title, 80), subject = clean(b.subject, 60).toLowerCase();
      const exam = ["jamb", "waec", "neco", "gst"].includes(String(b.exam_type)) ? String(b.exam_type) : "jamb";
      if (title.length < 3) return sendErr(res, "Give the mock exam a title.");
      if (!subject && b.source !== "custom") return sendErr(res, "Choose a subject.");
      const subj = subject || "general";
      const kind = ["mock", "test", "quiz"].includes(String(b.kind)) ? String(b.kind) : "mock";
      const source = b.source === "custom" ? "custom" : "builtin";
      let questions = null;
      if (source === "custom") {
        const raw = Array.isArray(b.questions) ? b.questions : [];
        questions = raw.map((x) => ({ q: clean(x && x.q, 400), o: (Array.isArray(x && x.o) ? x.o : []).map((t) => clean(t, 160)).filter(Boolean).slice(0, 5), a: Math.round(Number(x && x.a)), e: clean(x && x.e, 300) }))
          .filter((x) => x.q.length >= 3 && x.o.length >= 2 && Number.isInteger(x.a) && x.a >= 0 && x.a < x.o.length);
        if (questions.length < 1) return sendErr(res, "Add at least one question with its options and the right answer.");
        if (questions.length > 60) return sendErr(res, "A test can have up to 60 questions.");
      }
      const durationMin = source === "custom" ? Math.max(0, Math.min(240, Math.round(Number(b.duration_min) || 0))) : 0;
      const starts = new Date(b.starts_at); const hrs = Math.max(1, Math.min(72, Math.round(Number(b.window_hours) || 3)));
      if (isNaN(starts.getTime())) return sendErr(res, "Choose the date and time.");
      let classId = null;
      if (b.class_id) { const c = await classAllowed(b.class_id); if (!c) return sendErr(res, "Choose one of your classes."); classId = c.id; }
      else if (!isAdmin) return sendErr(res, "Choose one of your classes.");
      const ends = new Date(starts.getTime() + hrs * 3600000);
      const { data, error } = await sb.from("school_mocks").insert({ school_id: schoolId, class_id: classId, title, subject: subj, exam_type: exam, starts_at: starts.toISOString(), ends_at: ends.toISOString(), created_by: email, kind, source, questions, duration_min: durationMin }).select("id").single();
      if (error || !data) return sendErr(res, "Could not save. Run the update-8 SQL, then try again.", 500);
      const when = new Date(starts.getTime() + 3600000).toISOString();
      const day = when.slice(0, 10), hm = when.slice(11, 16);
      let notified = null;
      if (b.notify !== false) notified = await postNotice(`${kind === "quiz" ? "❓ Quiz" : kind === "test" ? "📋 Test" : "📝 Mock exam"}: ${title}\n${day} at ${hm} (Lagos time). Open EliteScholars > My Classes when it starts. Open for ${hrs} hour${hrs === 1 ? "" : "s"}.`, classId, Math.min(168, Math.max(24, Math.ceil((starts.getTime() + hrs * 3600000 - Date.now()) / 3600000 / 24) * 24)), "gold");
      return sendOk(res, { id: data.id, notified: notified ? notified.audience : 0 });
    }
    if (op === "mock-list") {
      let q = sb.from("school_mocks").select("*").eq("school_id", schoolId).order("starts_at", { ascending: false }).limit(40);
      const { data } = await q;
      const cls = (await sb.from("classes").select("id,name,teacher_email").eq("school_id", schoolId).limit(200)).data || [];
      let mocks = (data || []).filter((m) => isAdmin || !m.class_id || (cls.find((c) => c.id === m.class_id) || {}).teacher_email === email);
      const ids = mocks.map((m) => m.id);
      const sc = ids.length ? ((await sb.from("school_mock_scores").select("mock_id,email,score,correct,total,created_at").in("mock_id", ids).limit(10000)).data || []) : [];
      const pf = await profilesFor(sb, [...new Set(sc.map((x) => x.email))]);
      const now = Date.now();
      const out = [];
      for (const m of mocks) {
        const rows = sc.filter((x) => x.mock_id === m.id).sort((a, c) => c.score - a.score);
        const aud = m.class_id ? (await membersOf([m.class_id])).length : ((await sb.from("school_students").select("email", { count: "exact", head: true }).eq("school_id", schoolId)).count || 0);
        out.push({ id: m.id, kind: m.kind || "mock", source: m.source || "builtin", questions: Array.isArray(m.questions) ? m.questions.length : 0, duration_min: m.duration_min || 0, title: m.title, subject: m.subject, exam_type: m.exam_type, starts_at: m.starts_at, ends_at: m.ends_at, class: m.class_id ? ((cls.find((c) => c.id === m.class_id) || {}).name || "Class") : "Everyone",
          state: new Date(m.starts_at).getTime() > now ? "upcoming" : new Date(m.ends_at).getTime() > now ? "live" : "closed",
          audience: aud, took: rows.length, avg: mean(rows.map((r) => r.score)), top: rows.slice(0, 50).map((r, i) => ({ rank: i + 1, name: nameOf(pf.get(r.email), r.email.split("@")[0]), score: r.score, correct: r.correct, total: r.total })) });
      }
      return sendOk(res, { mocks: out });
    }
    if (op === "mock-delete") {
      if (!uuidish(b.id)) return sendErr(res, "Not found.", 404);
      const { data: m } = await sb.from("school_mocks").select("id,created_by").eq("id", b.id).eq("school_id", schoolId).maybeSingle();
      if (!m || (!isAdmin && m.created_by !== email)) return sendErr(res, "Not allowed.", 403);
      await sb.from("school_mocks").delete().eq("id", b.id);
      return sendOk(res, {});
    }

    // ── plan + online payment ───────────────────────────────────────────────
    if (op === "quote") {
      if (!isAdmin) return sendErr(res, "Only school admins can do that.", 403);
      const { schoolQuote } = await import("../_helpers/schoolPay.js");
      const q = await schoolQuote(sb, schoolId, b.periods);
      const plan = await planSummary(sb, school.owner_email, q.students, school.kind);
      const { data: pays } = await sb.from("payments").select("tx_ref,amount,created_at").eq("plan", `school:${schoolId}`).order("created_at", { ascending: false }).limit(20);
      return sendOk(res, { quote: { students: q.students, tier: q.tier && q.tier.label, perPeriod: q.tier ? q.tier.price : 0, kind: q.kind, options: q.options, yearPeriods: q.yearPeriods, periods: q.periods, period: q.period, amount: q.amount, days: q.days }, plan, payments: pays || [], online: !!process.env.FLW_SECRET_KEY });
    }
    if (op === "pay") {
      if (!isAdmin) return sendErr(res, "Only school admins can pay for the plan.", 403);
      if (!(await rateLimitOk(req, res, "schoolpay", 10, 3600, email))) return;
      if (!process.env.FLW_SECRET_KEY) return sendErr(res, "Online payment is not set up yet. Please contact EliteScholars.");
      const { schoolQuote } = await import("../_helpers/schoolPay.js");
      const q = await schoolQuote(sb, schoolId, b.periods);
      if (!(q.amount > 0)) return sendErr(res, "We could not work out the price. Please contact EliteScholars.");
      const txRef = `ES-SCHOOL-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
      const { data: me } = await sb.from("profiles").select("first_name").eq("email", email).maybeSingle();
      try {
        const r = await fetch("https://api.flutterwave.com/v3/payments", {
          method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.FLW_SECRET_KEY}` },
          body: JSON.stringify({ tx_ref: txRef, amount: q.amount, currency: "NGN", redirect_url: `https://elitescholars.site/api/payment/verify?tx_ref=${txRef}`, customer: { email, name: (me && me.first_name) || "School admin" },
            customizations: { title: "EliteScholars Schools", description: `${school.name}: school plan (${q.periods === q.yearPeriods ? "full year" : q.periods + " " + q.period + (q.periods > 1 ? "s" : "")})`, logo: "https://elitescholars.site/android-chrome-192x192.png" },
            meta: { plan: "school", school_id: schoolId, periods: q.periods, email, expected: q.amount } }),
        });
        const d = JSON.parse(await r.text());
        if (d.status !== "success") return sendErr(res, d.message || "Could not start the payment. Please try again.");
        return sendOk(res, { paymentLink: d.data.link, amount: q.amount });
      } catch { return sendErr(res, "Could not reach the payment provider. Check your connection and try again."); }
    }

    return sendErr(res, "Unknown action.", 404);
  } catch (e) {
    console.error("[portal]", op, e?.message);
    return sendErr(res, "Something went wrong.", 500);
  }
}
