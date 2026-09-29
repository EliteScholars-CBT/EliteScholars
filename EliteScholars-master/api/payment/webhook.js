// ============================================================================
// api/payment/verify.js — GET /api/payment/verify
// Called after Flutterwave redirects back
// Email is handled by webhook.js — verify only activates and redirects
// ============================================================================

import { setCors, sendMethodNotAllowed } from '../_helpers/response.js';
import { sheetsGet } from '../_helpers/sheets.js';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;
const APP_URL        = 'https://elitescholars.site';

const PLAN_NAMES = {
  monthly: 'Premium Monthly',
  annual:  'Premium Annual',
  pro:     'Pro Monthly',
};

function getExpiryDate(plan) {
  const days = plan === 'annual' ? 365 : 30;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

function formatDate(date) {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET')     return sendMethodNotAllowed(res);

  // ── Fix duplicate tx_ref param from Flutterwave ───────────────────────────
  const tx_ref = Array.isArray(req.query.tx_ref)
    ? req.query.tx_ref[0]
    : req.query.tx_ref;
  const { plan, email, status } = req.query;

  console.log('Verify called with params:', { tx_ref, plan, email, status });

  if (status === 'cancelled') {
    return res.redirect(`${APP_URL}/?payment=cancelled`);
  }

  if (!tx_ref || !plan || !email) {
    console.error('Missing params:', { tx_ref, plan, email });
    return res.redirect(`${APP_URL}/?payment=failed`);
  }

  try {
    // ── Step 1: Verify with Flutterwave ──────────────────────────────────────
    const flwRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`,
      { headers: { Authorization: `Bearer ${FLW_SECRET_KEY}` } }
    );

    const flwText = await flwRes.text();
    let flwData;
    try {
      flwData = JSON.parse(flwText);
    } catch {
      console.error('FLW verify non-JSON:', flwText);
      return res.redirect(`${APP_URL}/?payment=failed`);
    }

    // console.log('FLW verify status:', flwData?.status);
    // console.log('FLW tx status:', flwData?.data?.status);
    // console.log('FLW currency:', flwData?.data?.currency);
    // console.log('FLW customer email:', flwData?.data?.customer?.email);
    // console.log('URL email param:', email);

    const txData = flwData?.data;

    if (
      flwData.status !== 'success'           ||
      txData?.status !== 'successful'         ||
      txData?.currency !== 'NGN'              ||
      txData?.customer?.email?.toLowerCase() !== email.toLowerCase()
    ) {
      console.error('Verification failed — condition dump:', {
        flwStatus:  flwData?.status,
        txStatus:   txData?.status,
        currency:   txData?.currency,
        flwEmail:   txData?.customer?.email?.toLowerCase(),
        urlEmail:   email.toLowerCase(),
        emailMatch: txData?.customer?.email?.toLowerCase() === email.toLowerCase(),
      });
      return res.redirect(`${APP_URL}/?payment=failed`);
    }

    // ── Step 2: Calculate expiry ──────────────────────────────────────────────
    const expiryDateObj = getExpiryDate(plan);
    const expiresAt     = expiryDateObj.toISOString();
    const activatedOn   = formatDate(new Date());
    const emailLower    = email.toLowerCase().trim();

    // ── Step 3: Get firstName for redirect ────────────────────────────────────
    let firstName = 'Student';
    try {
      const profile = await sheetsGet({ action: 'getProfile', email: emailLower });
      if (profile?.profile?.firstName) firstName = profile.profile.firstName;
    } catch {}

    // ── Step 4: Activate premium in profile sheet ─────────────────────────────
    try {
      await sheetsGet({
        action:    'activatePremium',
        email:     emailLower,
        plan,
        txRef:     tx_ref,
        expiresAt,
        amount:    String(txData.amount),
      });
      console.log('activatePremium done for:', emailLower);
    } catch (err) {
      console.error('activatePremium error:', err.message);
    }

    // ── Step 5: Log to payments sheet ─────────────────────────────────────────
    try {
      await sheetsGet({
        action:        'logPayment',
        email:         emailLower,
        firstName,
        plan,
        amount:        String(txData.amount),
        currency:      txData.currency,
        txRef:         tx_ref,
        flwRef:        txData.flw_ref || '',
        status:        'successful',
        paymentMethod: txData.payment_type || '',
        paymentDate:   new Date().toISOString(),
        expiryDate:    expiresAt,
        verifiedBy:    'redirect',
      });
      console.log('logPayment done for:', emailLower);
    } catch (err) {
      console.error('logPayment error:', err.message);
    }

    // ── Step 6: Redirect to app — webhook handles email ───────────────────────
    console.log('Redirecting to success for:', emailLower);
    return res.redirect(
      `${APP_URL}/?payment=success&plan=${plan}&email=${encodeURIComponent(emailLower)}&expiry=${encodeURIComponent(expiresAt)}&name=${encodeURIComponent(firstName)}`
    );

  } catch (err) {
    console.error('Verify handler crash:', err.message);
    return res.redirect(`${APP_URL}/?payment=failed`);
  }
}
