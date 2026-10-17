// ============================================================================
// api/_helpers/response.js — Standardised API responses
// ============================================================================

export function sendOk(res, data = {}) {
  return res.status(200).json({ success: true, ...data });
}

export function sendErr(res, message, status = 400) {
  return res.status(status).json({ success: false, error: message });
}

export function sendRateLimited(res, retryAfter = 900) {
  return res.status(429).json({
    success: false,
    error: `Too many attempts. Try again in ${Math.ceil(retryAfter / 60)} minutes.`,
  });
}

export function sendMethodNotAllowed(res) {
  return res.status(405).json({ success: false, error: 'Method not allowed.' });
}

// The app calls its own /api from the same origin, so no wildcard is needed.
// Only the real site (and local development) may call these routes from a browser.
const ALLOWED_ORIGIN = process.env.APP_ORIGIN || 'https://elitescholars.site';
export function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Vercel parses application/json itself; text/plain bodies arrive as strings.
export function readBody(req) {
  const b = req.body;
  if (!b) return {};
  if (typeof b === 'string') {
    try { return JSON.parse(b); } catch { return {}; }
  }
  return b;
}
