// ============================================================================
// api/auth/reset.js — POST /api/auth/reset
// Verifies code from Redis then updates password in sheet
// ============================================================================

import { redis } from '../_helpers/redis.js';
import { sendOk, sendErr, sendMethodNotAllowed, setCors } from '../_helpers/response.js';
import { hashPassword } from '../_helpers/hash.js';
import { sheetsGet } from '../_helpers/sheets.js';

export default async function handler(req, res) {
  try {
    setCors(res);
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST')    return sendMethodNotAllowed(res);

    const { email, code, newPassword } = req.body || {};

    if (!email || !code || !newPassword) {
      return sendErr(res, 'All fields are required.');
    }

    if (newPassword.length < 8) {
      return sendErr(res, 'Password must be at least 8 characters.');
    }

    const emailLower = email.toLowerCase().trim();
    const redisKey   = `reset:${emailLower}`;

    // ── Get stored data from Redis ──────────────────────────────────────────
    let stored;
    try {
      const raw = await redis.get(redisKey);
      if (!raw) {
        return sendErr(res, 'Reset code has expired. Please request a new one.');
      }
      stored = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (err) {
      console.error('Redis get error:', err);
      return sendErr(res, 'Failed to verify reset code. Please try again.');
    }

    console.log('Stored reset entry:', JSON.stringify(stored));

    // ── Check attempts (max 5) ──────────────────────────────────────────────
    if ((stored.attempts || 0) >= 5) {
      await redis.del(redisKey);
      return sendErr(res, 'Too many attempts. Please request a new reset code.');
    }

    // ── Verify code ─────────────────────────────────────────────────────────
    if (String(stored.code).trim() !== String(code).trim()) {
      stored.attempts = (stored.attempts || 0) + 1;
      await redis.set(redisKey, JSON.stringify(stored), { ex: 900 });
      return sendErr(res, `Invalid reset code. ${5 - stored.attempts} attempts remaining.`);
    }

    // ── Hash new password ───────────────────────────────────────────────────
    const passwordHash = hashPassword(newPassword);

    // ── Update sheet ────────────────────────────────────────────────────────
    let result;
    try {
      result = await sheetsGet({
        action:       'updatePassword',
        email:        emailLower,
        passwordHash,
      });
    } catch (err) {
      console.error('Sheets update error:', err);
      return sendErr(res, 'Failed to contact database. Please try again.');
    }

    console.log('updatePassword result:', JSON.stringify(result));

    if (!result?.success) {
      return sendErr(res, result?.error || 'Failed to reset password. Please try again.');
    }

    // ── Cleanup Redis ───────────────────────────────────────────────────────
    try {
      await redis.del(redisKey);
    } catch {}

    return sendOk(res, { message: 'Password reset successfully. You can now log in.' });

  } catch (err) {
    console.error('Reset handler crash:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Internal server error',
    });
  }
}