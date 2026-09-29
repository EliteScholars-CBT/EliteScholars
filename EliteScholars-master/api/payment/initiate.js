// ============================================================================
// api/payment/initiate.js — POST /api/payment/initiate
// Creates a Flutterwave payment session server-side
// ============================================================================

import { sendOk, sendErr, sendMethodNotAllowed, setCors } from '../_helpers/response.js';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

const PLAN_AMOUNTS = { monthly: 9000, annual: 89000, pro: 3000 };
const PLAN_NAMES   = {
  monthly: 'EliteScholars Premium Monthly',
  annual:  'EliteScholars Premium Annual',
  pro:     'EliteScholars Pro',
};

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return sendMethodNotAllowed(res);

  const { email, name, plan } = req.body || {};

  if (!email || !name || !plan) return sendErr(res, 'email, name and plan are required.');
  if (!PLAN_AMOUNTS[plan])      return sendErr(res, 'Invalid plan.');

  // ── Guard: env var missing ─────────────────────────────────────────────────
  if (!FLW_SECRET_KEY) {
    console.error('FLW_SECRET_KEY is not set in environment variables.');
    return sendErr(res, 'Payment service is not configured. Please contact support.');
  }

  // ── Log key presence for debugging (never log the full key) ───────────────
  console.log('FLW_SECRET_KEY present:', !!FLW_SECRET_KEY);
  console.log('FLW_SECRET_KEY prefix:', FLW_SECRET_KEY.substring(0, 12) + '...');
  console.log('Plan:', plan, '| Amount:', PLAN_AMOUNTS[plan], '| Email:', email);

  const amount      = PLAN_AMOUNTS[plan];
  const txRef       = `ES-${plan.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  const redirectUrl = `https://elitescholars.site/api/payment/verify?tx_ref=${txRef}&plan=${plan}&email=${encodeURIComponent(email)}`;

  const payload = {
    tx_ref:       txRef,
    amount,
    currency:     'NGN',
    redirect_url: redirectUrl,
    customer:     { email, name },
    customizations: {
      title:       'EliteScholars (Resumeefy Concepts)',
      description: PLAN_NAMES[plan],
      logo:        'https://elitescholars.site/android-chrome-192x192.png',
    },
    meta: { plan, email },
  };

  console.log('Flutterwave payload:', JSON.stringify(payload));

  // ── Call Flutterwave v3 ────────────────────────────────────────────────────
  try {
    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${FLW_SECRET_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    console.log('Flutterwave HTTP status:', response.status);

    // Read as text first — guards against HTML error pages
    const text = await response.text();
    console.log('Flutterwave raw response:', text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error('Flutterwave returned non-JSON:', text);
      return sendErr(res, 'Payment provider returned an unexpected response. Please try again.');
    }

    // console.log('Flutterwave parsed response:', JSON.stringify(data));

    if (data.status !== 'success') {
      console.error('Flutterwave error response:', JSON.stringify(data));
      return sendErr(res, data.message || 'Failed to initiate payment. Please try again.');
    }

    return sendOk(res, {
      paymentLink: data.data.link,
      txRef,
      plan,
      amount,
    });

  } catch (err) {
    console.error('Payment initiate network error:', err.message);
    return sendErr(res, 'Could not reach payment provider. Please check your connection and try again.');
  }
}
