// Admin email centre.
//   GET  /api/admin/mail-audience?kind=students|partners&search=   -> counts + search matches
//   POST /api/admin/mail-send                                      -> send / forward a campaign
//   GET  /api/admin/mail-history                                   -> recent campaigns
//   GET  /api/mail/unsubscribe?e=&t=                               -> public opt-out link (HTML)
// Channels: "direct" (Resend, built in) or "campmailer" (forwarded to your CampMailer
// app: set CAMPMAILER_URL and CAMPMAILER_API_KEY — see docs/CAMPMAILER-INTEGRATION-PROMPT.txt).
import crypto from "crypto";
import { Resend } from "resend";
import { sendOk, sendErr, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { tokenOk } from "./admin.js";

const MAX_DIRECT = 1000;
const MAX_FORWARD = 5000;
const SITE = (process.env.SITE_URL || process.env.APP_ORIGIN || "https://elitescholars.site").replace(/\/$/, "");
const isEmail = (s) => /^[^\s@,()"'<>]+@[^\s@,()"'<>]+\.[^\s@,()"'<>]+$/.test(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const secret = () => process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const unsubToken = (email) => crypto.createHmac("sha256", secret()).update("unsub:" + email).digest("hex").slice(0, 32);
const unsubUrl = (email) => `${SITE}/api/mail/unsubscribe?e=${encodeURIComponent(email)}&t=${unsubToken(email)}`;

async function resolve(sb, a) {
  const kind = a && a.kind === "partners" ? "partners" : "students";
  const table = kind === "partners" ? "partners" : "profiles";
  const nameCols = kind === "partners" ? "email,full_name,status" : "email,first_name,last_name,username,is_premium,expires_at";
  let rows = [];
  if (a && a.mode === "selected") {
    const emails = [...new Set((a.emails || []).map((e) => String(e).toLowerCase().trim()).filter(isEmail))].slice(0, MAX_FORWARD);
    for (let i = 0; i < emails.length; i += 200) {
      const { data } = await sb.from(table).select(nameCols).in("email", emails.slice(i, i + 200));
      rows.push(...(data || []));
    }
  } else {
    for (let from = 0; from < MAX_FORWARD; from += 1000) {
      const { data } = await sb.from(table).select(nameCols).range(from, from + 999);
      if (!data || !data.length) break;
      rows.push(...data);
      if (data.length < 1000) break;
    }
    const f = a && a.filter;
    const now = Date.now();
    if (kind === "partners" && (f === "active" || f === "pending" || f === "suspended")) rows = rows.filter((r) => r.status === f);
    if (kind === "students" && f === "premium") rows = rows.filter((r) => r.is_premium && r.expires_at && new Date(r.expires_at).getTime() > now);
    if (kind === "students" && f === "free") rows = rows.filter((r) => !(r.is_premium && r.expires_at && new Date(r.expires_at).getTime() > now));
  }
  const out = rows.filter((r) => isEmail(r.email || "")).map((r) => {
    const full = kind === "partners" ? r.full_name || "" : [r.first_name, r.last_name].filter(Boolean).join(" ") || r.username || "";
    const first = (kind === "partners" ? full : r.first_name || r.username || "").split(" ")[0] || "there";
    return { email: r.email.toLowerCase(), name: full || first, first_name: first, type: kind === "partners" ? "partner" : "student" };
  });
  const { data: opt } = await sb.from("email_optouts").select("email");
  const out2 = new Set((opt || []).map((o) => o.email));
  return out.filter((r) => !out2.has(r.email));
}

const fill = (tpl, r) => String(tpl).replace(/\{\{\s*(name|first_name|email)\s*\}\}/gi, (_, k) => ({ name: r.name, first_name: r.first_name, email: r.email }[k.toLowerCase()] || ""));

function html(message, r) {
  const body = fill(message, r).split("\n").map((l) => (l.trim() ? `<p style="margin:0 0 12px">${esc(l)}</p>` : "<br>")).join("");
  return `<div style="font-family:system-ui,Segoe UI,sans-serif;line-height:1.6;color:#1a1433;max-width:560px;margin:auto;padding:20px"><div style="font-weight:800;color:#6D28D9;margin-bottom:14px">EliteScholars</div>${body}<hr style="border:0;border-top:1px solid #eee;margin:22px 0 10px"><p style="color:#6b6490;font-size:12px">You are receiving this from EliteScholars. <a href="${unsubUrl(r.email)}" style="color:#6b6490">Unsubscribe</a></p></div>`;
}

async function sendDirect(recipients, subject, message) {
  const FROM = process.env.FROM_EMAIL;
  if (!process.env.RESEND_API_KEY || !FROM) throw new Error("Email sending is not set up (RESEND_API_KEY / FROM_EMAIL).");
  const client = new Resend(process.env.RESEND_API_KEY);
  let sent = 0, failed = 0;
  for (let i = 0; i < recipients.length; i += 100) {
    const chunk = recipients.slice(i, i + 100);
    try {
      const r = await client.batch.send(chunk.map((x) => ({
        from: `EliteScholars <${FROM}>`, to: [x.email], subject: fill(subject, x), html: html(message, x),
        headers: { "List-Unsubscribe": `<${unsubUrl(x.email)}>` },
      })));
      if (r && r.error) failed += chunk.length; else sent += chunk.length;
    } catch (e) { console.warn("[admin-mail] batch", e?.message); failed += chunk.length; }
  }
  return { sent, failed };
}

async function forwardToCampMailer(payload) {
  const base = (process.env.CAMPMAILER_URL || "").replace(/\/$/, "");
  const key = process.env.CAMPMAILER_API_KEY;
  if (!base || !key) throw new Error("CampMailer is not connected yet. Set CAMPMAILER_URL and CAMPMAILER_API_KEY in Vercel.");
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 20000);
  try {
    const r = await fetch(`${base}/api/integrations/elitescholars/campaigns`, {
      method: "POST", signal: ctl.signal,
      headers: { "content-type": "application/json", authorization: `Bearer ${key}`, "idempotency-key": payload.idempotency_key },
      body: JSON.stringify(payload),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j || j.success === false) throw new Error((j && j.error) || `CampMailer answered ${r.status}.`);
    return j;
  } finally { clearTimeout(t); }
}

function unsubPage(msg) {
  return `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>EliteScholars</title><body style="font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#f5f3ff"><div style="max-width:380px;background:#fff;padding:28px;border-radius:18px;text-align:center;box-shadow:0 8px 30px rgba(46,16,101,.12)"><h2 style="color:#6D28D9;margin:0 0 8px">EliteScholars</h2><p style="color:#374151">${esc(msg)}</p></div></body>`;
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  const op = String(req.query?.op || "");

  if (op === "unsubscribe") {
    const e = String(req.query.e || "").toLowerCase();
    const t = String(req.query.t || "");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    if (!isEmail(e) || t.length !== 32 || !crypto.timingSafeEqual(Buffer.from(t), Buffer.from(unsubToken(e)))) return res.status(400).send(unsubPage("This unsubscribe link is not valid."));
    if (supabaseEnabled()) await getSupabase().from("email_optouts").upsert({ email: e }, { onConflict: "email" });
    return res.status(200).send(unsubPage("You have been unsubscribed. You will no longer get announcement emails from EliteScholars."));
  }

  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!tokenOk(token, "mail")) return res.status(401).json({ success: false, error: "Session expired. Please sign in again." });
  if (!supabaseEnabled()) return sendErr(res, "Database not configured.", 503);
  const sb = getSupabase();

  try {
    if (op === "mail-audience") {
      const kind = req.query.kind === "partners" ? "partners" : "students";
      const q = String(req.query.search || "").trim().toLowerCase();
      const cnt = async (table, f) => { let b = sb.from(table).select("email", { count: "exact", head: true }); if (f) b = f(b); const { count } = await b; return count || 0; };
      const counts = kind === "partners"
        ? { all: await cnt("partners"), active: await cnt("partners", (b) => b.eq("status", "active")), pending: await cnt("partners", (b) => b.eq("status", "pending")) }
        : { all: await cnt("profiles"), premium: await cnt("profiles", (b) => b.gt("expires_at", new Date().toISOString())) };
      let matches = [];
      if (q.length >= 2 && !/[,()"'%]/.test(q)) {
        if (kind === "partners") {
          const { data } = await sb.from("partners").select("email,full_name,status").or(`email.ilike.%${q}%,full_name.ilike.%${q}%`).limit(25);
          matches = (data || []).map((r) => ({ email: r.email, name: r.full_name, tag: r.status }));
        } else {
          const { data } = await sb.from("profiles").select("email,username,first_name,last_name").or(`email.ilike.%${q}%,username.ilike.%${q}%,first_name.ilike.%${q}%,last_name.ilike.%${q}%`).limit(25);
          matches = (data || []).map((r) => ({ email: r.email, name: [r.first_name, r.last_name].filter(Boolean).join(" ") || r.username || "", tag: r.username ? "@" + r.username : "" }));
        }
      }
      return sendOk(res, { counts, matches, campmailer: !!(process.env.CAMPMAILER_URL && process.env.CAMPMAILER_API_KEY), direct: !!(process.env.RESEND_API_KEY && process.env.FROM_EMAIL) });
    }

    if (op === "mail-history") {
      const { data } = await sb.from("email_campaigns").select("*").order("created_at", { ascending: false }).limit(30);
      return sendOk(res, { campaigns: data || [] });
    }

    if (op === "mail-send") {
      if (req.method !== "POST") return sendErr(res, "POST only.", 405);
      const b = readBody(req);
      const subject = String(b.subject || "").trim().slice(0, 150);
      const message = String(b.message || "").trim().slice(0, 8000);
      if (subject.length < 3) return sendErr(res, "Add a subject.");
      if (message.length < 5) return sendErr(res, "Write the message.");
      const channel = b.channel === "campmailer" ? "campmailer" : "direct";
      const recipients = await resolve(sb, b.audience || {});
      if (!recipients.length) return sendErr(res, "No recipients matched (unsubscribed or none selected).");
      if (channel === "direct" && recipients.length > MAX_DIRECT) return sendErr(res, `Direct sending is limited to ${MAX_DIRECT} at a time. Narrow the audience or use CampMailer.`);
      if (b.testOnly) recipients.splice(1);

      const key = crypto.randomUUID();
      let result = { sent: 0, failed: 0 }, external = null;
      try {
        if (channel === "direct") result = await sendDirect(recipients, subject, message);
        else {
          const j = await forwardToCampMailer({
            idempotency_key: key, source: "elitescholars-admin",
            campaign: { name: String(b.campaignName || subject).slice(0, 120), subject, body: message, kind: (b.audience && b.audience.kind) || "students", unsubscribe_url_template: `${SITE}/api/mail/unsubscribe?e={{email}}&t={{unsub_token}}` },
            recipients: recipients.map((r) => ({ ...r, unsub_token: unsubToken(r.email) })),
          });
          external = String(j.campaign_id || "");
          result = { sent: Number(j.accepted) || recipients.length, failed: Number(j.rejected) || 0 };
        }
      } catch (e) {
        await sb.from("email_campaigns").insert({ subject, channel, audience: (b.audience && b.audience.kind) || "students", recipients: recipients.length, sent: 0, failed: recipients.length, status: "failed", external_id: null, error: String(e.message || e).slice(0, 300) });
        return sendErr(res, e.message || "Could not send.", 502);
      }
      await sb.from("email_campaigns").insert({ subject, channel, audience: (b.audience && b.audience.kind) || "students", recipients: recipients.length, sent: result.sent, failed: result.failed, status: result.failed && !result.sent ? "failed" : "done", external_id: external });
      return sendOk(res, { recipients: recipients.length, ...result, channel, external_id: external, test: !!b.testOnly });
    }
    return sendErr(res, "Unknown op.", 404);
  } catch (e) {
    console.error("[admin-mail]", op, e?.message);
    return sendErr(res, "Could not complete that.", 500);
  }
}
