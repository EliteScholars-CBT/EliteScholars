// POST /api/auth/reset — verify emailed code, set a new (scrypt) password.
import { redis } from '../_helpers/redis.js';
import { sendOk, sendErr, sendMethodNotAllowed, setCors } from '../_helpers/response.js';
import { hashPasswordStrong } from '../_helpers/hash.js';
import { legacyProfileExists, legacyGetProfile } from '../_helpers/legacy.js';
import { selectOne, updateRow, supabaseEnabled } from '../_helpers/supabase.js';
import { backfillProfile } from '../_helpers/backfill.js';
import { rateLimitOk } from '../_helpers/guard.js';
import crypto from 'crypto';
import { safeHandler } from "../_helpers/safe.js";

const same = (a, b) => {
  const x = Buffer.from(String(a).trim()), y = Buffer.from(String(b).trim());
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

async function handler(req, res) {
  try {
    setCors(res);
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return sendMethodNotAllowed(res);
    if (!supabaseEnabled()) return res.status(503).json({ success: false, error: 'Service unavailable.' });
    if (!(await rateLimitOk(req, res, 'reset', 20, 3600))) return;

    const { email, code, newPassword } = req.body || {};
    if (![email, code, newPassword].every((v) => typeof v === 'string' && v)) return sendErr(res, 'All fields are required.');
    if (newPassword.length < 8 || newPassword.length > 200) return sendErr(res, 'Password must be at least 8 characters.');

    const emailLower = email.toLowerCase().trim();
    const redisKey = `reset:${emailLower}`;

    let stored;
    try {
      const raw = await redis.get(redisKey);
      if (!raw) return sendErr(res, 'Reset code has expired. Please request a new one.');
      stored = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (err) {
      console.error('Redis get error:', err?.message);
      return sendErr(res, 'Failed to verify reset code. Please try again.');
    }

    if ((stored.attempts || 0) >= 5) {
      await redis.del(redisKey);
      return sendErr(res, 'Too many attempts. Please request a new reset code.');
    }
    if (!same(stored.code, code)) {
      stored.attempts = (stored.attempts || 0) + 1;
      await redis.set(redisKey, JSON.stringify(stored), { ex: 900 });
      return sendErr(res, `Invalid reset code. ${5 - stored.attempts} attempts remaining.`);
    }

    const passwordHash = hashPasswordStrong(newPassword);
    const found = await selectOne('profiles', { email: emailLower });
    if (found.ok && found.row) {
      const r = await updateRow('profiles', { email: emailLower }, { password_hash: passwordHash });
      if (!r.ok) return sendErr(res, 'Failed to reset password. Please try again.');
    } else if (found.ok && (await legacyProfileExists(emailLower))) {
      // Old account not moved yet: create it in Supabase with the new password.
      const legacyProfile = await legacyGetProfile(emailLower);
      if (!legacyProfile || !(await backfillProfile(emailLower, legacyProfile, passwordHash)).ok) {
        return sendErr(res, 'Failed to reset password. Please try again.');
      }
    } else {
      return sendErr(res, 'Failed to reset password. Please try again.');
    }

    try { await redis.del(redisKey); } catch {}
    return sendOk(res, { message: 'Password reset successfully. You can now log in.' });
  } catch (err) {
    console.error('Reset handler crash:', err?.message);
    return res.status(500).json({ success: false, error: 'Something went wrong. Please try again.' });
  }
}


export default safeHandler(handler, "auth/reset");
