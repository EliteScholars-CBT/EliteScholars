// Forgot-password for partners and the admin dashboard.
//   /api/data?route=recovery/forgot  POST { kind: "partner" | "admin", email? }
//   /api/data?route=recovery/reset   POST { kind, email?, code, password? }
// A 6-digit code is emailed (valid 15 minutes, 5 tries). Partners and team members set a new password with it.
// The owner's password lives in the server settings (ADMIN_PASSWORD), so the owner gets a one-time sign-in code at
// ADMIN_NOTIFY_EMAIL instead, which signs them in without changing anything. The reply never says whether an account exists.
import crypto from "crypto";
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { redis } from "../_helpers/redis.js";
import { checkRateLimit } from "../_helpers/rateLimit.js";
import { sendMail } from "../_helpers/mail.js";
import { hashPartnerPassword } from "../_helpers/partners.js";
import { hashPasswordStrong } from "../_helpers/hash.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ip = (req) => req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
const safeEq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };
// Same signed owner token the admin login issues (see admin.js): expiry + HMAC of it, valid 12 hours.
const ownerSecret = () => process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
const makeOwnerToken = () => { const exp = Date.now() + 12 * 60 * 60 * 1000; return `${exp}.${crypto.createHmac("sha256", ownerSecret()).update(String(exp)).digest("hex")}`; };
const GENERIC = "If that account exists, a code has been sent to its email. It works for 15 minutes.";

export default async function handler(req, res) {
  setCors(res);
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "Not available right now.", 503);
  const op = req.query.op;
  const b = readBody(req);
  const kind = b.kind === "admin" ? "admin" : b.kind === "partner" ? "partner" : "";
  if (!kind) return sendErr(res, "Something went wrong.");
  const sb = getSupabase();
  const email = String(b.email || "").toLowerCase().trim();
  const owner = kind === "admin" && !email;
  if (!owner && !EMAIL_RE.test(email)) return sendErr(res, "Enter a valid email address.");
  const who = owner ? "owner" : email;
  const key = `recover:${kind}:${who}`;

  if (op === "forgot") {
    const r1 = await checkRateLimit(`recover-send:${kind}:${who}`, 3, 3600);
    const r2 = await checkRateLimit(`recover-send-ip:${ip(req)}`, 10, 3600);
    if (!r1.allowed || !r2.allowed) return sendErr(res, "Too many requests. Try again later.", 429);
    let to = "", name = "";
    if (owner) {
      to = String(process.env.ADMIN_NOTIFY_EMAIL || "").trim();
      if (!to) return sendErr(res, "Owner recovery is not set up. Add ADMIN_NOTIFY_EMAIL in the server settings.", 503);
      name = "Owner";
    } else if (kind === "partner") {
      const { data: p } = await sb.from("partners").select("email,full_name,status").eq("email", email).maybeSingle();
      if (p && p.status !== "suspended") { to = p.email; name = p.full_name || ""; }
    } else {
      const { data: a } = await sb.from("admin_users").select("email,name,active").eq("email", email).maybeSingle();
      if (a && a.active) { to = a.email; name = a.name || ""; }
    }
    if (!to) return sendOk(res, { message: GENERIC });
    const code = crypto.randomInt(100000, 1000000).toString();
    try { await redis.set(key, JSON.stringify({ code, attempts: 0 }), { ex: 900 }); }
    catch { return sendErr(res, "Could not start the reset. Please try again.", 500); }
    await sendMail(to, owner ? "Your EliteScholars admin sign-in code" : "Your EliteScholars password reset code",
      `Hi${name ? " " + name.split(" ")[0] : ""},\n\nYour code is ${code}. It works for 15 minutes.\n\n${owner ? "Enter it on the admin page to sign in." : "Enter it with your new password to finish resetting."} If you did not ask for this, ignore this email; nothing has changed.`,
      { emoji: "🔐", heading: owner ? "Admin sign-in code" : "Password reset code", rows: [["Code", code]] });
    return sendOk(res, { message: GENERIC });
  }

  if (op === "reset") {
    const code = String(b.code || "").trim();
    const password = String(b.password || "");
    if (!/^\d{6}$/.test(code)) return sendErr(res, "Enter the 6-digit code from the email.");
    if (!owner && password.length < 8) return sendErr(res, "New password must be at least 8 characters.");
    const rl = await checkRateLimit(`recover-try-ip:${ip(req)}`, 20, 900);
    if (!rl.allowed) return sendErr(res, "Too many attempts. Try again later.", 429);
    let rec = null;
    try { const raw = await redis.get(key); rec = raw ? (typeof raw === "string" ? JSON.parse(raw) : raw) : null; } catch { rec = null; }
    if (!rec || !rec.code) return sendErr(res, "That code has expired. Ask for a new one.", 400);
    if ((rec.attempts || 0) >= 5) { try { await redis.del(key); } catch {} return sendErr(res, "Too many wrong codes. Ask for a new one.", 429); }
    if (!safeEq(code, rec.code)) {
      try { await redis.set(key, JSON.stringify({ code: rec.code, attempts: (rec.attempts || 0) + 1 }), { ex: 900 }); } catch {}
      return sendErr(res, "That code is not right.", 400);
    }
    try { await redis.del(key); } catch {}
    if (owner) {
      if (!ownerSecret()) return sendErr(res, "Admin is not configured.", 503);
      return sendOk(res, { token: makeOwnerToken(), admin: { name: "Owner", owner: true } });
    }
    if (kind === "partner") {
      const { data, error } = await sb.from("partners").update({ password_hash: hashPartnerPassword(password) }).eq("email", email).select("id");
      if (error || !data || !data.length) return sendErr(res, "Could not reset the password.", 400);
    } else {
      const { data, error } = await sb.from("admin_users").update({ pass_hash: hashPasswordStrong(password) }).eq("email", email).eq("active", true).select("id");
      if (error || !data || !data.length) return sendErr(res, "Could not reset the password.", 400);
    }
    return sendOk(res, { message: "Password changed. You can sign in now." });
  }

  return sendErr(res, "Unknown request.", 404);
}
