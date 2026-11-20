// Come-back emails for students who stopped practising. Runs once a day from the 8am study-reminder job.
//
// Who: students who have practised at least once, who are NOT also a partner, have not
// opted out (students who also get phone push are emailed too), and have been away for a while. What: up to five friendly emails, spaced further and further apart, ending
// with a "this is our last email" note. Then silence until they come back. Coming back resets the sequence.
//
// Logged in `events`: nudge_sent {step}, nudge_click {step}, nudge_return {step, hours}. State lives in `email_nudges`.
import crypto from "crypto";
import { Resend } from "resend";
import { getSupabase, supabaseEnabled } from "./supabase.js";
import { layout, esc } from "./emailTemplates.js";

const SITE = (process.env.SITE_URL || process.env.APP_ORIGIN || "https://elitescholars.site").replace(/\/$/, "");
const DAY = 86400000;
const DAILY_CAP = 90;             // Resend's free plan allows 100 a day
const MAX_IDLE_DAYS = 45;         // accounts quiet for longer than this at the start are left alone
const FIRST_AFTER = 3;            // days away before email 1
const GAPS = [5, 7, 8, 9];        // days to wait after email 1, 2, 3, 4  →  emails land at day 3, 8, 15, 23, 32
export const STEPS = 5;

const secret = () => process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const sign = (s) => crypto.createHmac("sha256", secret()).update(s).digest("hex");
export const unsubToken = (email) => sign("unsub:" + email).slice(0, 32);               // same token the existing /api/mail/unsubscribe checks
export const clickToken = (email, step) => sign(`nudge:${email}:${step}`).slice(0, 24);
export const unsubUrl = (email) => `${SITE}/api/mail/unsubscribe?e=${encodeURIComponent(email)}&t=${unsubToken(email)}`;
export const clickUrl = (email, step) => `${SITE}/api/data?route=mail/nudge&op=go&e=${encodeURIComponent(email)}&s=${step}&t=${clickToken(email, step)}`;

const firstName = (u) => String(u.first_name || u.username || "there").trim().split(/\s+/)[0] || "there";
const p = (t) => `<p style="margin:0 0 14px">${t}</p>`;
const b = (t) => `<b style="color:#6d28d9">${esc(t)}</b>`;

// The five emails. u = { name, quizzes, level, xp, streak, best, idle, exam }
export function buildNudge(step, u, email) {
  const n = esc(u.name);
  const stats = [];
  if (u.quizzes) stats.push(["Quizzes done", String(u.quizzes)]);
  if (u.level) stats.push(["Your level", `Level ${u.level}`]);
  if (u.xp) stats.push(["XP earned", Number(u.xp).toLocaleString("en-NG")]);
  if (u.best > 1) stats.push(["Best streak", `${u.best} days`]);
  const exam = u.exam ? esc(u.exam) : "your exam";
  const goodbye = `<a href="${unsubUrl(email)}" style="color:#7c3aed">Stop these emails</a>`;
  const note = (extra) => `${extra ? extra + "<br>" : ""}You're getting this because you have an EliteScholars account. ${goodbye} any time.`;
  const cta = { url: clickUrl(email, step) };

  if (step === 1) return {
    subject: `${u.name}, your next topic is still waiting 📚`,
    html: layout({
      preheader: "No pressure. Ten minutes is plenty.", emoji: "📚", heading: `Hey ${u.name}, quick one`,
      body: p(`We noticed you haven't practised in a few days. No pressure at all, life gets busy.`) + p(`Your last session is exactly where you left it. Ten minutes today is enough to get back into the rhythm, and ${exam} will feel a lot less scary.`),
      rows: stats.length ? stats : null, cta: { ...cta, label: "Pick up where I stopped" }, note: note(),
    }),
  };
  if (step === 2) return {
    subject: `${u.name}, did you forget about us? 👀`,
    html: layout({
      preheader: "Your progress is safe. It's just waiting for you.", emoji: "👀", heading: "It's been about a week",
      body: p(`Hey ${n}, just checking in. Everything you've done so far is saved, so there's nothing to redo.`) + p(`A short quiz now beats a long cram later. Pick one subject, do five questions, and call it a win.`),
      rows: stats.length ? stats : null, cta: { ...cta, label: "Do one quick quiz" }, note: note(),
    }),
  };
  if (step === 3) return {
    subject: `Still thinking about ${u.exam || "your exam"}, ${u.name}?`,
    html: layout({
      preheader: "A few minutes a day adds up faster than you think.", emoji: "🎯", heading: `${u.name}, how's the prep going?`,
      body: p(`Two weeks is a long time to go without practice, and ${exam} isn't waiting for anyone.`) + p(`The students who do well aren't the ones who study for hours. They're the ones who show up a little every day. You've already shown you can: ${stats.length ? "look at what you've built so far." : "you started."}`),
      rows: stats.length ? stats : null, cta: { ...cta, label: "Back to practising" }, note: note(),
    }),
  };
  if (step === 4) return {
    subject: "These reminders don't seem to be working 😅",
    html: layout({
      preheader: "We'll make this easy. Just five minutes.", emoji: "😅", heading: "Okay, we get it",
      body: p(`${n}, we've sent a few notes and heard nothing back. That's fine. Maybe the timing is off, maybe school ate your week.`) + p(`Here's a small ask: one five-minute quiz, whenever you like. That's all. Do it and we'll stop bugging you either way.`) + p(`Next time you hear from us, it'll be to say goodbye.`),
      rows: null, cta: { ...cta, label: "Okay, five minutes" }, note: note(),
    }),
  };
  return {
    subject: `${u.name}, this is our last email 💜`,
    html: layout({
      preheader: "We won't email you again. Your progress stays saved.", emoji: "💜", heading: "Goodbye for now",
      body: p(`Hey ${n}, this is the last time we'll email you. We don't want to crowd your inbox.`) + p(`Everything you've done on EliteScholars stays saved, and your account is yours whenever you want it back. No emails, no pressure.`) + p(`Whatever ${exam} brings, we're rooting for you.`),
      rows: stats.length ? stats : null, cta: { ...cta, label: "I'm ready to come back" }, note: "This is the last email in this series. You won't hear from us again unless you return.",
    }),
  };
}

// Last time the student did anything: practised, signed in, was seen online, or simply opened the app (session events).
const ts = (v) => (v ? new Date(v).getTime() || 0 : 0);
const lastSeen = (r, opened) => Math.max(ts(r.last_active), ts(r.last_login), ts(r.last_seen), (opened && opened.get(String(r.email || "").toLowerCase())) || 0);
const OPEN_TYPES = ["session_start", "session_end", "session", "quiz_start", "quiz_complete"];
const examOf = (r) => { try { const a = Array.isArray(r.selected_exams) ? r.selected_exams : []; const x = a[0]; return x ? String(typeof x === "string" ? x : x.name || x.id || "").toUpperCase().slice(0, 20) : ""; } catch { return ""; } };

async function all(sb, table, cols, build) {
  const out = [];
  for (let from = 0; ; from += 1000) {
    let q = sb.from(table).select(cols).range(from, from + 999);
    if (build) q = build(q);
    const { data } = await q;
    if (!data || !data.length) break;
    out.push(...data);
    if (data.length < 1000) break;
  }
  return out;
}

export async function runEmailNudges() {
  const out = { type: "email_nudges", eligible: 0, sent: 0, failed: 0, returned: 0, byStep: {} };
  if (!supabaseEnabled()) return { ...out, skipped: "no database" };
  if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL) return { ...out, skipped: "email not set up (RESEND_API_KEY / FROM_EMAIL)" };
  const sb = getSupabase();
  const now = Date.now();

  const [students, partners, optouts, states] = await Promise.all([
    all(sb, "profiles", "email,first_name,username,quizzes_taken,level,total_xp,current_streak,best_streak,last_active,last_login,selected_exams,suspended,last_seen"),
    all(sb, "partners", "email"),
    all(sb, "email_optouts", "email"),
    all(sb, "email_nudges", "email,step,last_sent_at"),
  ]);
  const lc = (s) => String(s || "").toLowerCase();
  // latest time each student opened the app (last 60 days)
  const opened = new Map();
  try {
    const since = new Date(now - 60 * DAY).toISOString();
    for (let from = 0; from < 30000; from += 1000) {
      const { data } = await sb.from("events").select("email,created_at").in("type", OPEN_TYPES).gte("created_at", since).not("email", "is", null).order("created_at", { ascending: false }).range(from, from + 999);
      if (!data || !data.length) break;
      for (const r of data) { const e = lc(r.email), t = ts(r.created_at); if (e && t > (opened.get(e) || 0)) opened.set(e, t); }
      if (data.length < 1000) break;
    }
  } catch { /* falls back to profile times */ }
  const skip = new Set([...partners, ...optouts].map((r) => lc(r.email)));
  const state = new Map(states.map((r) => [lc(r.email), r]));
  const byEmail = new Map(students.map((r) => [lc(r.email), r]));

  // 1) students who came back after an email: log it once and start them over
  const events = [];
  for (const s of states) {
    const e = lc(s.email), u = byEmail.get(e);
    if (!u || !s.step || !s.last_sent_at) continue;
    const seen = lastSeen(u, opened), sentAt = new Date(s.last_sent_at).getTime();
    if (seen > sentAt) {
      events.push({ type: "nudge_return", email: e, payload: { step: s.step, hours: Math.round((seen - sentAt) / 3600000) } });
      await sb.from("email_nudges").update({ step: 0, updated_at: new Date().toISOString() }).eq("email", s.email);
      state.set(e, { ...s, step: 0 }); out.returned++;
    }
  }
  if (events.length) { try { await sb.from("events").insert(events); } catch { /* log only */ } }

  // 2) who is due an email today
  const due = [];
  for (const u of students) {
    const e = lc(u.email);
    if (!e || skip.has(e) || u.suspended || !(u.quizzes_taken >= 1)) continue;
    const seen = lastSeen(u, opened);
    if (!seen) continue;
    const idle = Math.floor((now - seen) / DAY);
    const st = state.get(e);
    const step = st ? st.step : 0;
    if (step >= STEPS) continue;                                   // finished: silent until they come back
    if (step === 0) { if (idle < FIRST_AFTER || idle > MAX_IDLE_DAYS) continue; }
    else {
      const wait = GAPS[step - 1] * DAY;
      if (!st.last_sent_at || now - new Date(st.last_sent_at).getTime() < wait) continue;
    }
    due.push({ u, e, step: step + 1, idle });
  }
  out.eligible = due.length;
  due.sort((a, b) => b.step - a.step);                              // finish people already mid-sequence before starting new ones
  const batch = due.slice(0, DAILY_CAP);
  if (!batch.length) return out;

  // 3) send (one batch request, so it stays well under Resend's rate limit)
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = `EliteScholars <${process.env.FROM_EMAIL}>`;
  const msgs = batch.map(({ u, e, step }) => {
    const m = buildNudge(step, { name: firstName(u), quizzes: u.quizzes_taken, level: u.level, xp: u.total_xp, streak: u.current_streak, best: u.best_streak, exam: examOf(u) }, e);
    return { from, to: e, subject: m.subject, html: m.html, headers: { "List-Unsubscribe": `<${unsubUrl(e)}>` } };
  });
  let ok = false;
  try { const r = await resend.batch.send(msgs); ok = !(r && r.error); if (!ok) console.warn("[nudges]", r.error?.message); } catch (err) { console.warn("[nudges]", err?.message); }
  if (!ok) { out.failed = batch.length; return out; }

  const stamp = new Date().toISOString();
  await sb.from("email_nudges").upsert(batch.map(({ e, step }) => ({ email: e, step, last_sent_at: stamp, updated_at: stamp })), { onConflict: "email" });
  try { await sb.from("events").insert(batch.map(({ e, step }) => ({ type: "nudge_sent", email: e, payload: { step } }))); } catch { /* log only */ }
  for (const { step } of batch) out.byStep[step] = (out.byStep[step] || 0) + 1;
  out.sent = batch.length;
  return out;
}
