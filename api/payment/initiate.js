// ============================================================================
// api/payment/initiate.js — POST /api/payment/initiate
// Creates a Flutterwave payment session server-side
// ============================================================================

import crypto from 'crypto';
import { sendOk, sendErr, sendMethodNotAllowed, setCors } from '../_helpers/response.js';
import { requireUser } from '../_helpers/session.js';
import { rateLimitOk } from '../_helpers/guard.js';
import { getFirstName } from '../_helpers/premium.js';
import { getPricing } from '../_helpers/pricing.js';
import { findShopItem } from '../_helpers/shopItems.js';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

// Premium is annual-only — no monthly tier. Prices come from the admin-editable settings.
const PLAN_NAMES   = {
  annual: 'EliteScholars Premium Annual',
};

async function run(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return sendMethodNotAllowed(res);

  // The payer is always the signed-in account, never a name/email from the request.
  const email = await requireUser(req, res);
  if (!email) return;
  if (!(await rateLimitOk(req, res, 'payinit', 10, 3600, email))) return;
  const { plan, item } = req.body || {};
  const pricing = await getPricing();
  const shopItem = typeof item === 'string' ? await findShopItem(item) : null;
  if (item && !shopItem) return sendErr(res, 'That item is not available.');
  if (!shopItem && (typeof plan !== 'string' || plan !== 'annual')) return sendErr(res, 'Invalid plan.');
  const name = await getFirstName(email);

  // ── Guard: env var missing ─────────────────────────────────────────────────
  if (!FLW_SECRET_KEY) {
    console.error('FLW_SECRET_KEY is not set in environment variables.');
    return sendErr(res, 'Payment service is not configured. Please contact support.');
  }

  const amount      = shopItem ? shopItem.priceNGN : pricing.premiumAnnual;
  const kind        = shopItem ? 'shop' : plan;
  const txRef       = `ES-${kind.toUpperCase()}-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const redirectUrl = `https://elitescholars.site/api/payment/verify?tx_ref=${txRef}`;

  const payload = {
    tx_ref:       txRef,
    amount,
    currency:     'NGN',
    redirect_url: redirectUrl,
    customer:     { email, name },
    customizations: {
      title:       'EliteScholars (Resumeefy Concepts)',
      description: shopItem ? shopItem.title : PLAN_NAMES[plan],
      logo:        'https://elitescholars.site/android-chrome-192x192.png',
    },
    meta: shopItem ? { plan: 'shop', item: shopItem.id, email, expected: amount } : { plan, email, expected: amount },
  };

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

    // Read as text first — guards against HTML error pages
    const text = await response.text();

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
      plan: kind,
      amount,
    });

  } catch (err) {
    console.error('Payment initiate network error:', err.message);
    return sendErr(res, 'Could not reach payment provider. Please check your connection and try again.');
  }
}

export default async function handler(req, res) {
  try {
    return await run(req, res);
  } catch (err) {
    console.error('Payment initiate crash:', err?.message);
    if (!res.headersSent) return sendErr(res, 'Something went wrong starting your payment. Please try again.', 500);
  }
}
