// ============================================================================
// api/shop.js — GET /api/shop
// Returns shop items from server-side constants
// ============================================================================

import { sendOk, sendMethodNotAllowed, setCors } from './_helpers/response.js';
import { SHOP_ITEMS } from './_helpers/constants/shop.js';
import {
  PREMIUM_MONTHLY_PRICE,
  PREMIUM_ANNUAL_PRICE,
  PRO_MONTHLY_PRICE,
  PAYMENT_URL_MONTHLY,
  PAYMENT_URL_ANNUAL,
  PAYMENT_URL_PRO,
} from './_helpers/constants/premium.js';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return sendMethodNotAllowed(res);

  return sendOk(res, {
    items: SHOP_ITEMS,
    pricing: {
      premiumMonthly: PREMIUM_MONTHLY_PRICE,
      premiumAnnual:  PREMIUM_ANNUAL_PRICE,
      pro:            PRO_MONTHLY_PRICE,
      urls: {
        monthly: PAYMENT_URL_MONTHLY,
        annual:  PAYMENT_URL_ANNUAL,
        pro:     PAYMENT_URL_PRO,
      },
    },
  });
}