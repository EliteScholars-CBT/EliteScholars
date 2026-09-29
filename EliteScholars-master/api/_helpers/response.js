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

export function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}