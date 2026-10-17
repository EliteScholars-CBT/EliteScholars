// api/_helpers/session.js — signed login sessions.
// The browser keeps a signed token (never the password hash). Every protected
// route calls requireUser(), which derives the account from the token, so a
// request can only ever act as the person it was issued to.
import crypto from "crypto";
import { getSupabase } from "./supabase.js";

const TTL_MS = 180 * 24 * 60 * 60 * 1000;

function secret() {
  const s = process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!s) return null;
  return crypto.createHash("sha256").update(`es-session:${s}`).digest();
}
const b64 = (s) => Buffer.from(s).toString("base64url");
const unb64 = (s) => Buffer.from(s, "base64url").toString("utf8");
const sign = (body) => crypto.createHmac("sha256", secret()).update(body).digest("base64url");
// Changing the password changes this value, which invalidates every older session.
const fingerprint = (pwHash) => crypto.createHash("sha256").update(String(pwHash || "")).digest("hex").slice(0, 16);

export const isSessionToken = (t) => typeof t === "string" && t.startsWith("u1.");

export function makeSessionToken(email, pwHash) {
  if (!secret()) throw new Error("Session secret not configured");
  const body = `u1.${b64(email)}.${Date.now() + TTL_MS}.${fingerprint(pwHash)}`;
  return `${body}.${sign(body)}`;
}

export function parseSessionToken(token) {
  try {
    if (!secret() || !isSessionToken(token)) return null;
    const parts = token.split(".");
    if (parts.length !== 5) return null;
    const body = parts.slice(0, 4).join(".");
    const good = sign(body);
    const given = parts[4];
    if (given.length !== good.length || !crypto.timingSafeEqual(Buffer.from(given), Buffer.from(good))) return null;
    const exp = Number(parts[2]);
    if (!exp || exp < Date.now()) return null;
    return { email: unb64(parts[1]), fp: parts[3] };
  } catch { return null; }
}

export function tokenFromRequest(req) {
  const h = (req.headers?.authorization || "").replace(/^Bearer\s+/i, "");
  if (h) return h;
  const b = req.body;
  if (b && typeof b === "object" && typeof b.token === "string") return b.token; // sendBeacon cannot set headers
  return "";
}

// Returns the signed-in account's email, or null after sending a 401.
export async function requireUser(req, res) {
  const parsed = parseSessionToken(tokenFromRequest(req));
  if (parsed) {
    const sb = getSupabase();
    if (sb) {
      const { data } = await sb.from("profiles").select("email,password_hash").eq("email", parsed.email).maybeSingle();
      if (data && fingerprint(data.password_hash) === parsed.fp) return data.email;
    }
  }
  res.status(401).json({ success: false, error: "Please sign in again.", code: "AUTH" });
  return null;
}

// Verify a session token against a known profile row (used by /auth/verify).
export const sessionMatchesRow = (token, row) => {
  const p = parseSessionToken(token);
  return !!(p && row && p.email === row.email && p.fp === fingerprint(row.password_hash));
};
