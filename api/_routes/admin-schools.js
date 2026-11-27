// Admin: every school and tutorial centre, with their trial / plan state and trial-email status.
//   GET  /api/admin/school-plans                       perm: schools or prices
//   POST /api/admin/school-plans  { action: "send-trial-emails" }   send whatever trial emails are due right now
import { sendOk, sendErr, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { adminFromToken } from "./admin.js";
import { getPricing, tierFor } from "../_helpers/pricing.js";
import { accountStatus } from "../_helpers/schoolPlan.js";
import { planTrialEmails, runTrialEmails } from "../_helpers/schoolTrialEmails.js";

export default async function handler(req, res) {
  setCors(res);
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  const who = adminFromToken((req.headers.authorization || "").replace(/^Bearer\s+/i, ""));
  if (!who) return sendErr(res, "Session expired. Please sign in again.", 401);
  if (!supabaseEnabled()) return sendErr(res, "Supabase is not configured.", 503);
  const has = (p) => who.owner || (who.perms || []).includes(p);
  if (!has("schools") && !has("prices")) return sendErr(res, "You don't have access to that.", 403);
  const sb = getSupabase();
  try {
    if (req.method === "POST") {
      if (!has("schools")) return sendErr(res, "You don't have access to that.", 403);
      const b = readBody(req);
      if (b.action !== "send-trial-emails") return sendErr(res, "Unknown action.");
      const r = await runTrialEmails(sb);
      try { await sb.from("admin_audit").insert({ admin_name: who.name, action: "school.trial-emails", detail: `sent ${r.sent}, failed ${r.failed}` }); } catch { /* best effort */ }
      return sendOk(res, { result: r });
    }
    const pr = await getPricing();
    const [{ data: accs }, { data: classes }, { data: owned }] = await Promise.all([
      sb.from("school_accounts").select("*").order("created_at", { ascending: false }).limit(500),
      sb.from("classes").select("id,teacher_email,name"),
      sb.from("schools").select("owner_email,name,kind,contact_name,phone,created_at").order("created_at", { ascending: true }).limit(1000),
    ]);
    const cls = classes || [];
    const { data: mem } = cls.length ? await sb.from("class_members").select("class_id") : { data: [] };
    const perClass = {}; for (const m of mem || []) perClass[m.class_id] = (perClass[m.class_id] || 0) + 1;
    const perTeacher = {}, classCount = {};
    for (const c of cls) { perTeacher[c.teacher_email] = (perTeacher[c.teacher_email] || 0) + (perClass[c.id] || 0); classCount[c.teacher_email] = (classCount[c.teacher_email] || 0) + 1; }
    const owner = {};
    for (const s of owned || []) { const e = String(s.owner_email || "").toLowerCase(); if (e && !owner[e]) owner[e] = s; }
    const schools = (accs || []).map((a) => {
      const o = owner[String(a.teacher_email || "").toLowerCase()] || {};
      const kind = o.kind === "centre" ? "centre" : "school";
      const sp = kind === "centre" ? pr.centre : pr.school;
      const st = accountStatus(a), students = perTeacher[a.teacher_email] || 0, tier = tierFor(sp, students);
      return {
        email: a.teacher_email, school: a.school_name || o.name || "", kind, ...st, students, classes: classCount[a.teacher_email] || 0,
        tier: tier ? tier.label : "", price: tier ? tier.price : 0, period: sp.period,
        trialStarted: a.trial_started_at, trialEnds: a.trial_ends_at, paidUntil: a.paid_until, amountPaid: a.amount_paid, notes: a.notes,
        contact: o.contact_name || "", phone: o.phone || "", createdAt: a.created_at,
        mail: { warn: a.trial_warn_sent_at || null, ended: a.trial_end_sent_at || null, week: a.trial_week_sent_at || null },
      };
    });
    let due = [];
    try { due = (await planTrialEmails(sb)).due.map((d) => ({ email: d.email, org: d.org, kind: d.kind, stage: d.stage, backfill: !!d.backfill })); } catch (e) { console.warn("[school trial plan]", e && e.message); }
    return sendOk(res, { settings: pr.school, centreSettings: pr.centre, schools, due, mailReady: !!(process.env.RESEND_API_KEY && process.env.FROM_EMAIL) });
  } catch (e) {
    console.error("[admin-schools]", e && e.message);
    return sendErr(res, "Server error", 500);
  }
}
