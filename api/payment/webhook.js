// POST /api/payment/webhook — Flutterwave server-to-server notification.
// Set FLW_WEBHOOK_HASH (Vercel) to the same "secret hash" you enter in the
// Flutterwave dashboard. Requests without it are rejected.
import crypto from 'crypto';
import { setCors, sendMethodNotAllowed } from '../_helpers/response.js';
import { finalizePayment } from '../_helpers/payments.js';
import { safeHandler } from "../_helpers/safe.js";

const same = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

async function handler(req, res) {
  setCors(res);
  if (req.method !== 'POST') return sendMethodNotAllowed(res);

  const secret = process.env.FLW_WEBHOOK_HASH;
  if (!secret || !same(req.headers['verif-hash'] || '', secret)) return res.status(401).end();

  const txRef = req.body?.data?.tx_ref || req.body?.txRef;
  if (typeof txRef !== 'string' || !txRef) return res.status(200).end(); // nothing to do
  try { await finalizePayment(txRef, 'webhook'); } catch (e) { console.error('[webhook]', e?.message); }
  return res.status(200).end(); // always 200 so Flutterwave doesn't keep retrying
}


export default safeHandler(handler, "payment/webhook");
