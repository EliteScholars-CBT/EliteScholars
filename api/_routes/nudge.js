// Come-back email tracking and admin numbers.
//   GET /api/data?route=mail/nudge&op=go&e=&s=&t=     tracked button in the email: logs the click, then opens the app
//   GET /api/data?route=mail/nudge&op=preview&code=   ONE-TIME: sends all five emails to the owner so they can be checked
//   GET /api/data?route=admin/nudges&range=           admin numbers for Admin → Reminders (today, week, month, lastmonth, year, all)
import crypto from "crypto";
import { sendOk, sendErr, setCors } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { tokenOk } from "./admin.js";
import { sendHtml } from "../_helpers/mail.js";
import { buildNudge, clickToken, STEPS } from "../_helpers/emailNudges.js";
import { resolvePeriod } from "../_helpers/periods.js";

const SITE = (process.env.SITE_URL || process.env.APP_ORIGIN || "https://elitescholars.site").replace(/\/$/, "");
const OWNER = "michaelokpegboro@gmail.com";
const PREVIEW_HASH = "17742d17ff793ff8589f4a618f40164a643f2cfa318cb2a3b86bf1a34b76ac41";
const isEmail = (s) => /^[^\s@,()"'<>]+@[^\s@,()"'<>]+\.[^\s@,()"'<>]+$/.test(s);
const same = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  const route = String(req.query?.route || "");
  const q = req.query || {};

  if (route === "mail/nudge" && q.op === "go") {
    const e = String(q.e || "").toLowerCase(), step = Number(q.s);
    const ok = isEmail(e) && step >= 1 && step <= STEPS && same(String(q.t || ""), clickToken(e, step));
    if (ok && supabaseEnabled()) { try { await getSupabase().from("events").insert({ type: "nudge_click", email: e, payload: { step } }); } catch { /* log only */ } }
    res.setHeader("Cache-Control", "no-store");
    return res.redirect(302, `${SITE}/app?ne=${ok ? step : 0}`);
  }

  if (route === "mail/nudge" && q.op === "preview") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    const page = (m) => `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:system-ui;padding:32px;max-width:480px;margin:auto"><p>${m}</p>`;
    const code = String(q.code || "");
    if (!same(crypto.createHash("sha256").update(code).digest("hex"), PREVIEW_HASH)) return res.status(403).send(page("That code isn't valid."));
    if (!supabaseEnabled()) return res.status(503).send(page("Database not configured."));
    const sb = getSupabase();
    const { data: used } = await sb.from("settings").select("value").eq("key", "nudge_preview_used").maybeSingle();
    if (used) return res.status(410).send(page("This code was already used."));
    await sb.from("settings").upsert({ key: "nudge_preview_used", value: { at: new Date().toISOString() }, updated_at: new Date().toISOString() }, { onConflict: "key" });
    const sample = { name: "Michael", quizzes: 14, level: 6, xp: 2380, best: 9, exam: "WAEC" };
    let sent = 0;
    for (let step = 1; step <= STEPS; step++) {
      const m = buildNudge(step, sample, OWNER);
      if (await sendHtml(OWNER, `[Preview ${step}/${STEPS}] ${m.subject}`, m.html)) sent++;
      await new Promise((r) => setTimeout(r, 600));
    }
    return res.status(200).send(page(sent === STEPS ? `Sent all ${STEPS} preview emails to ${OWNER}. Check your inbox (and spam).` : `Only ${sent} of ${STEPS} sent. Check RESEND_API_KEY and FROM_EMAIL in Vercel.`));
  }

  if (route === "admin/nudges") {
    const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (!tokenOk(token, "analytics")) return res.status(401).json({ success: false, error: "Session expired. Please sign in again." });
    if (!supabaseEnabled()) return sendErr(res, "Database not configured.", 503);
    const sb = getSupabase();
    const per = resolvePeriod(q.range || "week"), since = per.since;
    const rows = [];
    for (let from = 0; from < 20000; from += 1000) {
      const { data } = await sb.from("events").select("type,email,payload,created_at").in("type", ["nudge_sent", "nudge_click", "nudge_return"]).gte("created_at", since).lte("created_at", per.until).order("created_at", { ascending: false }).range(from, from + 999);
      if (!data || !data.length) break;
      rows.push(...data);
      if (data.length < 1000) break;
    }
    const steps = Array.from({ length: STEPS }, (_, i) => ({ step: i + 1, sent: 0, clicked: new Set(), returned: new Set() }));
    const sentTo = new Set(), recovered = new Set(), clickedAny = new Set();
    for (const r of rows) {
      const s = steps[Number(r.payload && r.payload.step) - 1];
      if (!s) continue;
      if (r.type === "nudge_sent") { s.sent++; sentTo.add(r.email); }
      else if (r.type === "nudge_click") { s.clicked.add(r.email); clickedAny.add(r.email); }
      else if (r.type === "nudge_return") { s.returned.add(r.email); recovered.add(r.email); }
    }
    let optedOut = 0;
    try { const { data } = await sb.from("email_optouts").select("email").gte("created_at", since).lte("created_at", per.until); optedOut = (data || []).filter((o) => sentTo.has(String(o.email).toLowerCase())).length; } catch { /* optional */ }
    const { count: inSequence } = await sb.from("email_nudges").select("email", { count: "exact", head: true }).gt("step", 0).lt("step", STEPS);
    const { count: finished } = await sb.from("email_nudges").select("email", { count: "exact", head: true }).gte("step", STEPS);
    const recent = rows.filter((r) => r.type === "nudge_sent").slice(0, 25);
    const clickedKey = new Set(rows.filter((r) => r.type === "nudge_click").map((r) => `${r.email}:${r.payload && r.payload.step}`));
    const retKey = new Set(rows.filter((r) => r.type === "nudge_return").map((r) => `${r.email}:${r.payload && r.payload.step}`));
    const names = {};
    const em = [...new Set(recent.map((r) => r.email))];
    if (em.length) { const { data } = await sb.from("profiles").select("email,first_name,last_name,username").in("email", em); (data || []).forEach((p) => { names[p.email] = `${p.first_name || ""} ${p.last_name || ""}`.trim() || p.username || p.email; }); }
    return sendOk(res, {
      range: per.key, label: per.label,
      totals: { sent: steps.reduce((a, s) => a + s.sent, 0), people: sentTo.size, clicked: clickedAny.size, recovered: recovered.size, optedOut, inSequence: inSequence || 0, finished: finished || 0 },
      steps: steps.map((s) => ({ step: s.step, sent: s.sent, clicked: s.clicked.size, returned: s.returned.size })),
      recent: recent.map((r) => { const k = `${r.email}:${r.payload && r.payload.step}`; return { at: r.created_at, name: names[r.email] || r.email, step: Number(r.payload && r.payload.step), clicked: clickedKey.has(k), returned: retKey.has(k) }; }),
    });
  }

  return res.status(404).json({ success: false, error: "Unknown route." });
}
