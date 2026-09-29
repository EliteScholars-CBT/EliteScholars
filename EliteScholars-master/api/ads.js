// ============================================================================
// api/ads.js — GET /api/ads?exam=jamb
// Returns filtered affiliate ads for the current exam type
// ============================================================================

import { sendOk, sendMethodNotAllowed, setCors } from './_helpers/response.js';
import {
  AFFILIATE_ADS,
  SHOW_ADS,
  PUBLISHER_AD_ENABLED,
  CUSTOM_AD_ENABLED,
  CUSTOM_AD,
} from './_helpers/constants/ads.js';

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return sendMethodNotAllowed(res);

  const exam     = req.query.exam?.toLowerCase() || 'all';
  const filtered = AFFILIATE_ADS.filter(ad => {
    if (!ad.audiences || ad.audiences.length === 0) return true;
    if (ad.audiences.includes('all')) return true;
    return ad.audiences.includes(exam);
  });

  return sendOk(res, {
    showAds:          SHOW_ADS,
    publisherEnabled: PUBLISHER_AD_ENABLED,
    affiliateAds:     filtered,
    customAd:         CUSTOM_AD_ENABLED ? CUSTOM_AD : null,
  });
}