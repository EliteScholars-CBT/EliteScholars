// ============================================================================
// api/payment/status.js — GET /api/payment/status?email=...
// Returns current premium status from sheet
// ============================================================================

import { sendOk, sendErr, sendMethodNotAllowed, setCors } from '../_helpers/response.js';
import { requireUser } from '../_helpers/session.js';
import { getPremiumStatus } from '../_helpers/premium.js';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return sendMethodNotAllowed(res);

  const email = await requireUser(req, res);
  if (!email) return;

  const result = await getPremiumStatus(email);
  return sendOk(res, result);
}