// ============================================================================
// api/constants/premium.js — Freemium limits and pricing (server-side)
// ============================================================================

export const FREE_TOPICS_PER_DAY   = 2;
export const FREE_SESSION_MINUTES  = 30;
export const FREE_COOLDOWN_HOURS   = 0;

// Pro is annual-only — no monthly tier.
export const PREMIUM_ANNUAL_PRICE          = 3000;
export const PREMIUM_ANNUAL_ORIGINAL_PRICE = 15000;
export const PRO_MONTHLY_PRICE             = 3000;

export const PAYMENT_URL_PRO     = 'https://selar.co/elitescholars-pro';
export const PAYMENT_URL_ANNUAL  = 'https://selar.co/elitescholars-annual';
