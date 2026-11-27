// Free-trial emails for schools and tutorial centres:
//   warn  : 3 days (or fewer) before the trial ends
//   ended : the trial has just ended
//   week  : a week after it ended (also sent straight away to trials that ended before this feature existed)
// Each email goes out once per trial. Schools that have paid, or ever paid, are never emailed.
import { layout, esc } from "./emailTemplates.js";
import { sendHtml } from "./mail.js";
import { getPricing } from "./pricing.js";

const D = 86400000;
const APP = "https://elitescholars.site";
const SINCE_KEY = "school_trial_mail_since";

const fmtDate = (ms) => new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });
const naira = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;
const firstWord = (s) => String(s || "").trim().split(/\s+/)[0] || "";

// ── the three emails ───────────────────────────────────────────────────────────────────────
export function copyFor(stage, c) {
  const word = c.kind === "centre" ? "centre" : "school";
  const org = esc(c.org || (c.kind === "centre" ? "your centre" : "your school"));
  const hi = `<p style="margin:0 0 12px">Hi ${esc(c.first || "there")},</p>`;
  const cta = { label: "Choose a plan", url: `${APP}/school-portal` };
  const kids = c.students > 0 ? `${c.students} student${c.students === 1 ? "" : "s"}` : "";
  const stopList = `<ul style="margin:0 0 14px;padding-left:20px">
<li>You will not be able to create classes, set assignments or post notices.</li>
<li>${kids ? `Your ${kids} will stop receiving new work and notices from you.` : "Students you add later will not get work or notices from you."}</li>
<li>Everything you have already set up stays saved. It comes back the moment you activate a plan.</li></ul>`;
  const from = c.fromPrice ? `<p style="margin:0 0 12px">Plans start from <b>${naira(c.fromPrice)} per ${esc(c.period)}</b> and are priced by the number of students, so you only pay for what you use.</p>` : "";
  if (stage === "warn") {
    const left = c.daysLeft <= 1 ? "1 day" : `${c.daysLeft} days`;
    return {
      subject: `Your EliteScholars free trial ends in ${left}`, emoji: "⏳", heading: `Your free trial ends in ${left}`,
      preheader: `${c.org || "Your " + word}: choose a plan to keep your classes running`,
      body: `${hi}<p style="margin:0 0 12px">The free trial for <b>${org}</b> on EliteScholars ends on <b>${fmtDate(c.endsAt)}</b>. After that, your ${word} dashboard tools pause:</p>${stopList}${from}`,
      rows: [["Trial ends", fmtDate(c.endsAt)], ...(c.students > 0 ? [["Students in your classes", String(c.students)]] : []), ...(c.classes > 0 ? [["Classes", String(c.classes)]] : [])],
      cta, note: "Choosing a plan takes about two minutes. You can pay by card, bank transfer or USSD.",
    };
  }
  if (stage === "ended") {
    return {
      subject: `Your EliteScholars free trial has ended`, emoji: "🔒", heading: "Your free trial has ended",
      preheader: `${c.org || "Your " + word} is paused. Nothing is lost.`,
      body: `${hi}<p style="margin:0 0 12px">The free trial for <b>${org}</b> ended on <b>${fmtDate(c.endsAt)}</b>, so your ${word} dashboard tools are paused for now:</p>${stopList}${from}`,
      rows: [["Trial ended", fmtDate(c.endsAt)], ...(c.students > 0 ? [["Students in your classes", String(c.students)]] : [])],
      cta, note: "Pick a plan and everything is back exactly as you left it.",
    };
  }
  return {
    subject: `Your ${word} space on EliteScholars is still saved`, emoji: "👋", heading: `We kept your ${word} space safe`,
    preheader: `${c.org || "Your " + word}: pick up where you left off`,
    body: `${hi}<p style="margin:0 0 12px">It has been a little while since the free trial for <b>${org}</b> ended, and we have not heard from you. We wanted to check in.</p><p style="margin:0 0 12px">Your classes${kids ? `, your ${kids}` : ""} and results are all still saved. Nothing has been deleted.</p>${from}<p style="margin:0 0 12px">If something got in the way, or you have a question about pricing, we would love to help. If it simply was not the right time, no problem at all, your ${word} will be here when you are ready.</p>`,
    rows: [["Trial ended", fmtDate(c.endsAt)], ...(c.students > 0 ? [["Students in your classes", String(c.students)]] : [])],
    cta: { label: "Pick up where I left off", url: `${APP}/school-portal` }, note: "This is a one-time follow-up. We will not keep emailing you about it.",
  };
}

// ── who is due what ───────────────────────────────────────────────────────────────────────────────
async function loadContext(sb) {
  const [{ data: accs }, { data: schools }, { data: classes }, pr] = await Promise.all([
    sb.from("school_accounts").select("*").limit(3000),
    sb.from("schools").select("owner_email,name,kind,contact_name,created_at").order("created_at", { ascending: true }).limit(3000),
    sb.from("classes").select("id,teacher_email").limit(10000),
    getPricing(),
  ]);
  const cls = classes || [];
  const { data: mem } = cls.length ? await sb.from("class_members").select("class_id").limit(100000) : { data: [] };
  const perClass = {}; for (const m of mem || []) perClass[m.class_id] = (perClass[m.class_id] || 0) + 1;
  const students = {}, classCount = {};
  for (const c of cls) { const e = String(c.teacher_email || "").toLowerCase(); students[e] = (students[e] || 0) + (perClass[c.id] || 0); classCount[e] = (classCount[e] || 0) + 1; }
  const owner = {};
  for (const s of schools || []) { const e = String(s.owner_email || "").toLowerCase(); if (e && !owner[e]) owner[e] = s; }
  return { accs: accs || [], owner, students, classCount, pr };
}

async function sinceMs(sb) {
  const { data } = await sb.from("settings").select("value").eq("key", SINCE_KEY).maybeSingle();
  const v = data && data.value && (data.value.at || data.value);
  const t = v ? new Date(v).getTime() : 0;
  if (t) return t;
  const now = Date.now();
  await sb.from("settings").upsert({ key: SINCE_KEY, value: { at: new Date(now).toISOString() }, updated_at: new Date(now).toISOString() }, { onConflict: "key" });
  return now;
}

export async function planTrialEmails(sb) {
  const now = Date.now();
  const [ctx, since] = await Promise.all([loadContext(sb), sinceMs(sb)]);
  const due = [], resets = [];
  for (const a of ctx.accs) {
    const email = String(a.teacher_email || "").toLowerCase();
    if (!email || a.paid_until || Number(a.amount_paid || 0) > 0 || !a.trial_ends_at) continue; // paying (or ever paid) schools are not trial leads
    const endMs = new Date(a.trial_ends_at).getTime();
    const o = ctx.owner[email] || {};
    const kind = o.kind === "centre" ? "centre" : "school";
    const sp = kind === "centre" ? ctx.pr.centre : ctx.pr.school;
    const base = {
      email, kind, org: o.name || a.school_name || "", first: firstWord(o.contact_name) || firstWord(a.school_name) || "",
      students: ctx.students[email] || 0, classes: ctx.classCount[email] || 0, endsAt: endMs,
      fromPrice: sp && sp.tiers && sp.tiers[0] ? sp.tiers[0].price : 0, period: (sp && sp.period) || "month",
    };
    const any = a.trial_warn_sent_at || a.trial_end_sent_at || a.trial_week_sent_at;
    if (endMs > now) {
      const daysLeft = Math.ceil((endMs - now) / D);
      if (daysLeft > 3 && any) { resets.push(email); continue; } // trial was extended: warn again later
      if (daysLeft <= 3 && !a.trial_warn_sent_at) due.push({ ...base, stage: "warn", daysLeft });
      continue;
    }
    if (a.trial_week_sent_at) continue;
    const ago = now - endMs;
    if (endMs < since && !a.trial_end_sent_at) due.push({ ...base, stage: "week", backfill: true }); // ended before this feature: send the follow-up now
    else if (ago >= 7 * D - 3 * 3600000) due.push({ ...base, stage: "week" });
    else if (!a.trial_end_sent_at) due.push({ ...base, stage: "ended" });
  }
  return { due, resets };
}

export async function runTrialEmails(sb, { dryRun = false } = {}) {
  const out = { sent: 0, failed: 0, byStage: { warn: 0, ended: 0, week: 0 }, items: [], skipped: "" };
  if (!dryRun && (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL)) return { ...out, skipped: "Email is not set up (RESEND_API_KEY / FROM_EMAIL)." };
  const { due, resets } = await planTrialEmails(sb);
  if (dryRun) return { ...out, items: due.map((d) => ({ email: d.email, org: d.org, kind: d.kind, stage: d.stage })) };
  if (resets.length) await sb.from("school_accounts").update({ trial_warn_sent_at: null, trial_end_sent_at: null, trial_week_sent_at: null }).in("teacher_email", resets);
  const nowIso = new Date().toISOString();
  for (const c of due) {
    const m = copyFor(c.stage, c);
    const ok = await sendHtml(c.email, m.subject, layout({ preheader: m.preheader, emoji: m.emoji, heading: m.heading, body: m.body, rows: m.rows, cta: m.cta, note: m.note }));
    if (ok) {
      const patch = c.stage === "warn" ? { trial_warn_sent_at: nowIso } : c.stage === "ended" ? { trial_end_sent_at: nowIso } : { trial_warn_sent_at: nowIso, trial_end_sent_at: nowIso, trial_week_sent_at: nowIso };
      await sb.from("school_accounts").update(patch).eq("teacher_email", c.email);
      out.sent++; out.byStage[c.stage]++;
    } else out.failed++;
    out.items.push({ email: c.email, org: c.org, kind: c.kind, stage: c.stage, ok });
  }
  return out;
}
