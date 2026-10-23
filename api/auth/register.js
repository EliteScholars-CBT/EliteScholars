import { checkRateLimit } from '../_helpers/rateLimit.js';
import { sendOk, sendErr, sendRateLimited, sendMethodNotAllowed, setCors } from '../_helpers/response.js';
import { hashPasswordStrong } from '../_helpers/hash.js';
import { logSecurityEvent } from '../_helpers/security.js';
import { selectOne, insertRow, supabaseEnabled } from '../_helpers/supabase.js';
import { findPartnerByCode } from '../_helpers/partners.js';
import { legacyProfileExists } from '../_helpers/legacy.js';
import { profileOut } from '../_helpers/profileOut.js';
import { clientIp } from '../_helpers/guard.js';
import { startTrialIfEnabled } from '../_helpers/access.js';
import { safeHandler } from "../_helpers/safe.js";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
const NAME_MAX = 60;
const str = (v) => typeof v === 'string';

async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return res.status(503).json({ success: false, error: 'Service unavailable.' });

  const ip = clientIp(req);
  const { allowed, retryAfter } = await checkRateLimit(`register:${ip}`, 5, 3600);
  if (!allowed) {
    await logSecurityEvent({ type: 'register_rate_limited', email: '', ip, detail: 'IP blocked' });
    return sendRateLimited(res, retryAfter);
  }

  const { firstName, lastName, email, password, studentType, selectedExams, username, referredBy } = req.body || {};

  if (![firstName, lastName, email, password, studentType, username].every((v) => str(v) && v) || !Array.isArray(selectedExams)) {
    return sendErr(res, 'All fields are required.');
  }
  if (firstName.length > NAME_MAX || lastName.length > NAME_MAX || studentType.length > 40 || selectedExams.length > 20 || selectedExams.some((x) => !str(x) || x.length > 40)) {
    return sendErr(res, 'Some details are too long.');
  }
  if (email.length > 254 || !/^[^\s@,()"']+@[^\s@,()"']+\.[^\s@,()"']+$/.test(email)) return sendErr(res, 'Invalid email address.');
  if (password.length < 8 || password.length > 200) return sendErr(res, 'Password must be at least 8 characters.');

  const usernameTrimmed = username.trim();
  if (!USERNAME_REGEX.test(usernameTrimmed)) {
    return sendErr(res, 'Username must be 3-20 characters, start with a letter, and contain only letters, numbers, or underscores.');
  }

  const emailLower = email.toLowerCase().trim();

  const [byEmail, byName] = await Promise.all([
    selectOne('profiles', { email: emailLower }),
    selectOne('profiles', { username: usernameTrimmed }),
  ]);
  if (!byEmail.ok || !byName.ok) return sendErr(res, 'Could not complete registration. Please try again.');
  if (byEmail.row || (await legacyProfileExists(emailLower))) return sendErr(res, 'An account with this email already exists.');
  if (byName.row) return sendErr(res, 'Username is already taken. Please choose another.');

  // Referred by an affiliate partner? (their own email never counts)
  let partner = null;
  const refCode = str(referredBy) && /^[A-Za-z0-9_-]{3,32}$/.test(referredBy) ? referredBy.toUpperCase() : null;
  if (refCode) {
    partner = await findPartnerByCode(refCode);
    if (partner && partner.email === emailLower) partner = null;
  }

  const saved = await insertRow('profiles', {
    email: emailLower,
    username: usernameTrimmed,
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    password_hash: hashPasswordStrong(password),
    student_type: studentType,
    selected_exams: selectedExams,
    referred_by_code: refCode,
    referrer_partner_id: partner ? partner.id : null,
  });
  if (!saved.ok) {
    console.error('[register] save failed:', saved.error?.message || saved.error);
    return sendErr(res, 'Registration failed. The email or username may already be in use.');
  }

  if (refCode) {
    const ck = Number(req.body?.referralClickedAt || 0);
    const clickedAt = ck > Date.now() - 61 * 86400000 && ck <= Date.now() ? new Date(ck).toISOString() : null;
    if (clickedAt) await insertRow('events', { type: 'referral_link_opened', email: emailLower, created_at: clickedAt, payload: { code: refCode, partner: partner ? partner.full_name || '' : '' } });
  }
  if (refCode) await insertRow('referrals', { code: refCode, referred_email: emailLower, partner_id: partner ? partner.id : null });
  await insertRow('events', { type: 'register', email: emailLower, payload: { username: usernameTrimmed, ...(refCode ? { code: refCode, partner: partner ? partner.full_name || '' : '' } : {}) } });

  await startTrialIfEnabled(emailLower);
  const row = (await selectOne('profiles', { email: emailLower })).row;
  if (!row) return sendErr(res, 'Registration failed. Please try again.');
  return sendOk(res, { profile: profileOut(row) });
}


export default safeHandler(handler, "auth/register");
