// Question reports from students, reviewed by the admin.
//   POST /api/report/submit   { subject, exam, qi, question, options, reason, note }   (signed-in student)
//   GET  /api/admin/reports   (admin)        POST /api/admin/report-action { id, status }
import crypto from "crypto";
import { sendOk, sendErr, setCors, readBody } from "../_helpers/response.js";
import { requireUser, parseSessionToken, tokenFromRequest } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { tokenOk } from "./admin.js";

const REASONS = ["wrong_answer", "typo", "unclear", "wrong_subject", "other"];
const clean = (v, n) => String(v || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, n);

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!supabaseEnabled()) return sendErr(res, "Not available right now.", 503);
  const op = String(req.query?.op || "");
  const sb = getSupabase();

  if (op === "submit") {
    if (req.method !== "POST") return sendErr(res, "POST only.", 405);
    const email = await requireUser(req, res);
    if (!email) return;
    if (!(await rateLimitOk(req, res, "qreport", 30, 86400, email))) return;
    const b = readBody(req);
    const question = clean(b.question, 400);
    if (question.length < 5) return sendErr(res, "Missing question.");
    const reason = REASONS.includes(b.reason) ? b.reason : "other";
    const key = crypto.createHash("sha1").update(`${clean(b.subject, 40)}|${question}`).digest("hex").slice(0, 20);
    const { data: dup } = await sb.from("question_reports").select("id").eq("email", email).eq("qkey", key).maybeSingle();
    if (dup) return sendOk(res, { duplicate: true });
    const { error } = await sb.from("question_reports").insert({
      email, qkey: key, subject: clean(b.subject, 40), exam: clean(b.exam, 12), qi: Number.isFinite(Number(b.qi)) ? Math.floor(Number(b.qi)) : null,
      question, options: Array.isArray(b.options) ? b.options.slice(0, 5).map((o) => clean(o, 160)) : [], reason, note: clean(b.note, 300), status: "open",
    });
    if (error) return sendErr(res, "Could not send the report.", 500);
    return sendOk(res, {});
  }

  // App crash reports. Works signed out too (an app can crash before login); a valid session token proves who it was.
  if (op === "crash") {
    if (req.method !== "POST") return sendErr(res, "POST only.", 405);
    if (!(await rateLimitOk(req, res, "crash", 20, 3600))) return;
    const b = readBody(req);
    const message = clean(b.message, 400);
    if (!message) return sendErr(res, "Empty report.");
    const parsed = parseSessionToken(tokenFromRequest(req));
    const claimed = clean(b.email, 120).toLowerCase();
    const email = parsed ? parsed.email : claimed;
    const d = b.device && typeof b.device === "object" ? b.device : {};
    const device = {};
    for (const [k, v] of Object.entries(d).slice(0, 40)) device[clean(k, 40)] = typeof v === "number" || typeof v === "boolean" ? v : clean(v, 300);
    const stack = clean(b.stack, 3000);
    const fp = crypto.createHash("sha1").update(`${message}|${stack.split("\n")[1] || ""}`).digest("hex").slice(0, 16);
    const { error } = await sb.from("crash_reports").insert({
      email: email || null, name: clean(b.name, 80), verified: !!parsed, message, stack, component_stack: clean(b.componentStack, 2000),
      screen: clean(b.screen, 40), url: clean(b.url, 300), device, app_version: clean(b.appVersion, 40), fp, status: "open",
    });
    if (error) return sendErr(res, "Could not save the report.", 500);
    return sendOk(res, {});
  }

  // admin
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!tokenOk(token, "reports")) return res.status(401).json({ success: false, error: "Session expired. Please sign in again." });
  if (op === "list") {
    const status = req.query.status === "resolved" ? "resolved" : "open";
    const { data } = await sb.from("question_reports").select("id,subject,exam,qi,question,options,reason,note,status,created_at,qkey").eq("status", status).order("created_at", { ascending: false }).limit(300);
    const groups = new Map();
    (data || []).forEach((r) => {
      const g = groups.get(r.qkey) || { key: r.qkey, subject: r.subject, exam: r.exam, question: r.question, options: r.options, count: 0, reasons: {}, notes: [], ids: [], latest: r.created_at };
      g.count++; g.reasons[r.reason] = (g.reasons[r.reason] || 0) + 1; g.ids.push(r.id); if (r.note) g.notes.push(r.note);
      groups.set(r.qkey, g);
    });
    return sendOk(res, { reports: [...groups.values()].sort((a, b) => b.count - a.count) });
  }
  if (op === "crash-list") {
    const status = req.query.status === "resolved" ? "resolved" : "open";
    const { data } = await sb.from("crash_reports").select("id,email,name,verified,message,stack,component_stack,screen,url,device,app_version,fp,created_at").eq("status", status).order("created_at", { ascending: false }).limit(400);
    const groups = new Map();
    (data || []).forEach((r) => {
      const g = groups.get(r.fp) || { key: r.fp, message: r.message, stack: r.stack, componentStack: r.component_stack, screen: r.screen, count: 0, users: new Set(), ids: [], latest: r.created_at, events: [] };
      g.count++; g.ids.push(r.id); if (r.email) g.users.add(r.email);
      if (g.events.length < 8) g.events.push({ id: r.id, email: r.email, name: r.name, verified: r.verified, at: r.created_at, url: r.url, device: r.device, appVersion: r.app_version, screen: r.screen });
      groups.set(r.fp, g);
    });
    return sendOk(res, { crashes: [...groups.values()].map((g) => ({ ...g, users: [...g.users].slice(0, 30), userCount: g.users.size })).sort((a, b) => new Date(b.latest) - new Date(a.latest)) });
  }
  if (op === "crash-action") {
    if (req.method !== "POST") return sendErr(res, "POST only.", 405);
    const b = readBody(req);
    const ids = (Array.isArray(b.ids) ? b.ids : []).filter((x) => /^[\w-]{6,64}$/.test(String(x))).slice(0, 500);
    if (!ids.length) return sendErr(res, "Nothing selected.");
    if (b.status === "delete") await sb.from("crash_reports").delete().in("id", ids);
    else await sb.from("crash_reports").update({ status: b.status === "open" ? "open" : "resolved" }).in("id", ids);
    return sendOk(res, {});
  }
  if (op === "action") {
    if (req.method !== "POST") return sendErr(res, "POST only.", 405);
    const b = readBody(req);
    const ids = (Array.isArray(b.ids) ? b.ids : []).filter((x) => /^[\w-]{6,64}$/.test(String(x))).slice(0, 200);
    if (!ids.length) return sendErr(res, "Nothing selected.");
    if (b.status === "delete") await sb.from("question_reports").delete().in("id", ids);
    else await sb.from("question_reports").update({ status: b.status === "open" ? "open" : "resolved" }).in("id", ids);
    return sendOk(res, {});
  }
  return sendErr(res, "Unknown action.", 404);
}
