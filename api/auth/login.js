import { checkRateLimit, clearRateLimit } from "../_helpers/rateLimit.js";
import { hashPasswordStrong, verifyPassword } from "../_helpers/hash.js";
import { legacyLoginWithPassword } from "../_helpers/legacy.js";
import { backfillProfile } from "../_helpers/backfill.js";
import { selectOne, updateRow, supabaseEnabled } from "../_helpers/supabase.js";
import { logSecurityEvent } from "../_helpers/security.js";
import { profileOut } from "../_helpers/profileOut.js";
import { clientIp } from "../_helpers/guard.js";
import { setCors, sendMethodNotAllowed } from "../_helpers/response.js";
import { safeHandler } from "../_helpers/safe.js";

const FAIL = { success: false, stage: "login_failed", message: "Incorrect email or password." };

async function handler(req, res) {
  try {
    setCors(res);
    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    if (!supabaseEnabled()) return res.status(503).json({ success: false, message: "Service unavailable." });

    const ip = clientIp(req);
    const body = req.body || {};
    if (typeof body.email !== "string" || typeof body.password !== "string" || !body.email || !body.password || body.password.length > 200) {
      return res.status(400).json({ success: false, stage: "validation_error", message: "Email and password required" });
    }
    const email = body.email.toLowerCase().trim();

    // Per account+IP, and a wider per-IP limit against password spraying.
    const key = `login:${email}:${ip}`;
    const [a, b] = await Promise.all([checkRateLimit(key, 10, 900), checkRateLimit(`login-ip:${ip}`, 60, 900)]);
    if (!a.allowed || !b.allowed) {
      await logSecurityEvent({ type: "login_rate_limited", email, ip });
      return res.status(429).json({ success: false, stage: "rate_limited", message: "Too many attempts. Try again later.", retryAfter: a.retryAfter || b.retryAfter });
    }

    let row = null;
    const found = await selectOne("profiles", { email });
    if (found.ok && found.row?.password_hash) {
      const v = verifyPassword(body.password, found.row.password_hash);
      if (v.ok) {
        row = found.row;
        const patch = { last_login: new Date().toISOString() };
        if (v.upgrade) { // old SHA-256 hash -> scrypt
          patch.password_hash = hashPasswordStrong(body.password);
          row = { ...row, password_hash: patch.password_hash };
        }
        updateRow("profiles", { email }, patch).catch(() => {});
      }
    } else if (found.ok && !found.row) {
      // Not moved to Supabase yet: optional legacy bridge (only if SHEETS_URL is set).
      const legacy = await legacyLoginWithPassword(email, body.password);
      if (legacy) {
        const strong = hashPasswordStrong(body.password);
        const r = await backfillProfile(email, legacy, strong);
        if (r.ok) {
          const again = await selectOne("profiles", { email });
          if (again.ok && again.row) row = again.row;
        }
      }
    }

    if (!row) {
      await logSecurityEvent({ type: "login_failed", email, ip });
      return res.status(401).json(FAIL);
    }

    if (row.suspended) {
      return res.status(403).json({ success: false, stage: "suspended", message: "Your account has been suspended. Contact elitescholars.site@gmail.com if you think this is a mistake." });
    }
    await clearRateLimit(key);
    return res.status(200).json({ success: true, stage: "login_success", profile: profileOut(row) });
  } catch (err) {
    console.error("[login]", err?.message);
    return res.status(500).json({ success: false, stage: "internal_error", message: "Something went wrong. Please try again." });
  }
}


export default safeHandler(handler, "auth/login");
