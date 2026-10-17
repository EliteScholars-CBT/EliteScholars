// ============================================================================
// api/_helpers/hash.js — Password hashing (Node.js crypto)
// ============================================================================

import crypto from 'crypto';

export function hashPassword(password) {
  const salt = process.env.HASH_SALT || 'ep_salt_2025';
  return crypto.createHash('sha256')
    .update(password + salt)
    .digest('hex');
}

// ── Strong password hashing (scrypt + per-user salt) ─────────────────────────
// Old accounts still hold the fast SHA-256 hash above; verifyPassword accepts
// both and tells the caller when to upgrade the stored value after a login.
export function hashPasswordStrong(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

const safeEq = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

export function verifyPassword(password, stored) {
  if (!stored) return { ok: false, upgrade: false };
  if (String(stored).startsWith('scrypt$')) {
    const [, salt, hash] = String(stored).split('$');
    try {
      const test = crypto.scryptSync(String(password), salt, 64).toString('hex');
      return { ok: safeEq(test, hash), upgrade: false };
    } catch { return { ok: false, upgrade: false }; }
  }
  return { ok: safeEq(hashPassword(password), stored), upgrade: true };
}

// Used when a client presents an old-style stored credential (the legacy hash).
export const legacyHashMatches = (presented, stored) => !!stored && safeEq(presented, stored);
