// GET /api/payment/verify — Flutterwave redirects the browser here after payment.
// Nothing in the query string is trusted: the transaction is re-checked with
// Flutterwave, and the account/plan/amount come from that record.
import { setCors, sendMethodNotAllowed } from '../_helpers/response.js';
import { finalizePayment } from '../_helpers/payments.js';
import { getPremiumStatus } from '../_helpers/premium.js';
import { checkRateLimit } from '../_helpers/rateLimit.js';
import { planFromTxRef } from '../_helpers/payments.js';
import { clientIp } from '../_helpers/guard.js';

const APP_URL = 'https://elitescholars.site';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return sendMethodNotAllowed(res);

  const tx_ref = String(Array.isArray(req.query.tx_ref) ? req.query.tx_ref[0] : req.query.tx_ref || '');
  const school = planFromTxRef(tx_ref) === 'school'; // school plan payments go back to the school portal
  const home = school ? `${APP_URL}/school-portal` : `${APP_URL}/app`;
  if (req.query.status === 'cancelled') return res.redirect(`${home}?payment=cancelled`);
  if (!tx_ref) return res.redirect(`${home}?payment=failed`);
  // This is a browser redirect, so never answer with raw JSON — send them back to the app.
  try {
    const { allowed } = await checkRateLimit(`rl:payverify:${clientIp(req)}`, 60, 600);
    if (!allowed) return res.redirect(`${home}?payment=pending`);
  } catch { /* limiter unavailable — carry on */ }

  try {
    const r = await finalizePayment(tx_ref, 'redirect');
    if (!r.ok) return res.redirect(`${home}?payment=failed`);
    if (school) return res.redirect(`${home}?payment=success`);

    if (r.plan === 'shop') {
      return res.redirect(`${APP_URL}/app?payment=success&plan=shop&item=${encodeURIComponent(r.item)}&email=${encodeURIComponent(r.email)}&name=${encodeURIComponent(r.firstName)}`);
    }
    let expiresAt = r.expiresAt;
    if (!expiresAt) { // already processed (webhook got there first, or a page refresh)
      const st = await getPremiumStatus(r.email);
      expiresAt = st.expiresAt ? new Date(st.expiresAt).toISOString() : new Date().toISOString();
    }
    return res.redirect(
      `${APP_URL}/app?payment=success&plan=${r.plan}&email=${encodeURIComponent(r.email)}&expiry=${encodeURIComponent(expiresAt)}&name=${encodeURIComponent(r.firstName)}`
    );
  } catch (err) {
    console.error('Verify handler crash:', err?.message);
    return res.redirect(`${home}?payment=failed`);
  }
}
