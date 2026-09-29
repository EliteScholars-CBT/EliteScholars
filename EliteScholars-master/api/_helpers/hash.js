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