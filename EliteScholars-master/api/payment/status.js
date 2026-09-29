// ============================================================================
// api/payment/status.js — GET /api/payment/status?email=...
// Returns current premium status from sheet
// ============================================================================

import { sendOk, sendErr, sendMethodNotAllowed, setCors } from '../_helpers/response.js';
import { sheetsGet } from '../_helpers/sheets.js';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return sendMethodNotAllowed(res);

  const { email } = req.query;
  if (!email) return sendErr(res, 'email is required.');

  const result = await sheetsGet({ action: 'getPremiumStatus', email: email.toLowerCase().trim() });
  return sendOk(res, result);
}