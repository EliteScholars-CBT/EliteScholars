// ============================================================================
// api/shop.js — GET /api/shop
// Returns shop items from server-side constants
// ============================================================================

import { sendOk, sendMethodNotAllowed, setCors } from './_helpers/response.js';
import { SHOP_ITEMS } from './_helpers/constants/shop.js';
import {
  PREMIUM_ANNUAL_PRICE,
  PREMIUM_ANNUAL_ORIGINAL_PRICE,
  PRO_MONTHLY_PRICE,
  PAYMENT_URL_ANNUAL,
  PAYMENT_URL_PRO,
} from './_helpers/constants/premium.js';

import { getPricing, fmtNaira } from './_helpers/pricing.js';
import { getShopCatalog, publicItem } from './_helpers/shopItems.js';
import { safeHandler } from "./_helpers/safe.js";
async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return sendMethodNotAllowed(res);

  let pr = null;
  try { pr = await getPricing(); } catch { /* defaults */ }
  let extra = [];
  try { extra = (await getShopCatalog()).filter((i) => i.show.app); } catch { /* fall back to built-ins */ }
  const shown = new Set(extra.map((i) => i.id));
  const items = [
    ...SHOP_ITEMS.filter((it) => it.isPremium).map((it) => ({ ...it, price: `${fmtNaira(pr ? pr.premiumAnnual : PREMIUM_ANNUAL_PRICE)}/yr` })),
    ...(extra.length ? extra.map(publicItem) : SHOP_ITEMS.filter((it) => !it.isPremium && !shown.has(it.id)).map((it) => ({ ...it, priceNGN: pr ? pr.items[it.id] : undefined, price: pr && pr.items[it.id] ? fmtNaira(pr.items[it.id]) : it.price }))),
  ];
  return sendOk(res, {
    items,
    pricing: {
      premiumAnnual:         pr ? pr.premiumAnnual : PREMIUM_ANNUAL_PRICE,
      premiumAnnualOriginal: pr ? pr.premiumAnnualOriginal : PREMIUM_ANNUAL_ORIGINAL_PRICE,
      pro:                   pr ? pr.pro : PRO_MONTHLY_PRICE,
      urls: {
        annual: PAYMENT_URL_ANNUAL,
        pro:    PAYMENT_URL_PRO,
      },
    },
  });
}

export default safeHandler(handler, "shop");
