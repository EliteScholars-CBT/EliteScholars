import { checkRateLimit } from '../_helpers/rateLimit.js';
import {
  sendOk,
  sendErr,
  sendRateLimited,
  sendMethodNotAllowed,
  setCors,
} from '../_helpers/response.js';
import { hashPassword } from '../_helpers/hash.js';
import { sheetsGet, sheetsPost } from '../_helpers/sheets.js';
import { logSecurityEvent } from '../_helpers/security.js';

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return sendMethodNotAllowed(res);

  const DEBUG = true;
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  const key = `register:${ip}`;

  console.log('📝 [register] Request received from IP:', ip);

  const { allowed, retryAfter } = await checkRateLimit(key, 5, 3600);
  if (!allowed) {
    console.log('🚫 [register] Rate limited:', ip);
    await logSecurityEvent({ type: 'register_rate_limited', email: '', ip, detail: 'IP blocked' });
    return sendRateLimited(res, retryAfter);
  }

  const { firstName, lastName, email, password, studentType, selectedExams, username } =
    req.body || {};

  console.log('📋 [register] Body fields received:', {
    firstName: firstName || '(missing)',
    lastName: lastName || '(missing)',
    email: email || '(missing)',
    password: password ? '[present]' : '(missing)',
    studentType: studentType || '(missing)',
    selectedExams: selectedExams || '(missing)',
    username: username || '(missing)',
  });

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !studentType ||
    !selectedExams ||
    !username
  ) {
    console.log('❌ [register] Missing required fields');
    return sendErr(res, 'All fields are required.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.log('❌ [register] Invalid email:', email);
    return sendErr(res, 'Invalid email address.');
  }

  if (password.length < 8) {
    console.log('❌ [register] Password too short');
    return sendErr(res, 'Password must be at least 8 characters.');
  }

  const usernameTrimmed = username.trim();
  if (!USERNAME_REGEX.test(usernameTrimmed)) {
    console.log('❌ [register] Invalid username:', usernameTrimmed);
    return sendErr(
      res,
      'Username must be 3-20 characters, start with a letter, and contain only letters, numbers, or underscores.'
    );
  }

  const emailLower = email.toLowerCase().trim();
  const passwordHash = hashPassword(password);

  console.log('🔑 [register] Password hashed. Checking if email exists...');

  // CHECK IF USER EXISTS
  let existing;
  try {
    existing = await sheetsGet({
      action: 'loginProfile',
      email: emailLower,
      passwordHash: '__check_exists__',
    });
    console.log('📥 [register] Email check response:', existing);
  } catch (e) {
    console.error('❌ [register] Email check threw:', e.message);
    existing = { success: false };
  }

  if (existing.success && existing.exists === true) {
    console.log('❌ [register] Email already exists:', emailLower);
    return sendErr(res, 'An account with this email already exists.');
  }

  // CHECK USERNAME AVAILABILITY
  let usernameCheck;
  try {
    usernameCheck = await sheetsGet({
      action: 'checkUsername',
      username: usernameTrimmed,
    });
    console.log('📥 [register] Username check response:', usernameCheck);
  } catch (e) {
    console.error('❌ [register] Username check threw:', e.message);
    usernameCheck = { available: true }; // assume available if check fails
  }

  if (usernameCheck.error && usernameCheck.error !== 'INVALID_JSON_RESPONSE') {
    console.log('❌ [register] Username check error:', usernameCheck.error);
    return sendErr(res, usernameCheck.error);
  }

  if (usernameCheck.available === false) {
    console.log('❌ [register] Username taken:', usernameTrimmed);
    return sendErr(res, 'Username is already taken. Please choose another.');
  }

  // REGISTER USER
  console.log('📤 [register] Sending registerProfile to Sheets:', {
    email: emailLower,
    username: usernameTrimmed,
  });

  let result;
  try {
    result = await sheetsGet({
      action: 'registerProfile',
      email: emailLower,
      firstName,
      lastName,
      passwordHash,
      studentType,
      selectedExams: JSON.stringify(selectedExams),
      username: usernameTrimmed,
    });
    console.log('📥 [register] registerProfile response:', result);
  } catch (e) {
    console.error('❌ [register] registerProfile threw:', e.message);
    result = { success: false, error: e.message };
  }

  if (!result.success) {
    console.error('❌ [register] Registration failed:', result.error);
    // Still return a partial success so the frontend bypass can take over
    // if the account was actually created but the response was malformed
    return sendErr(res, result.error || 'Registration failed.');
  }

  // Log the registration event (fire and forget)
  sheetsPost({
    event: 'register',
    name: `${firstName} ${lastName}`,
    email: emailLower,
    username: usernameTrimmed,
  }).catch((e) => console.warn('[register] sheetsPost analytics failed:', e.message));

  console.log('✅ [register] Registration complete for:', emailLower);

  return sendOk(res, {
    profile: {
      email: emailLower,
      firstName,
      lastName,
      studentType,
      selectedExams,
      passwordHash,
      username: usernameTrimmed,
      stats: {},
      achievements: [],
      subjectPerformance: {},
    },
    ...(DEBUG && { debug: { generatedHash: passwordHash, ip } }),
  });
}
