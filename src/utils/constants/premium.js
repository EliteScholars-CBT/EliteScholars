// ============================================================================
// constants/premium.js — Freemium limits and pricing
// ============================================================================

// ── Free-tier limits ──────────────────────────────────────────────────────────
export const FREE_TOPICS_PER_DAY  = 50;   // max learn-mode topics per day
export const FREE_SESSION_MINUTES = 2400;  // max CBT/learn time per session (minutes) (original value 240)
export const FREE_COOLDOWN_HOURS  = 0;   // hours before they can continue after limit

// ── Premium pricing ───────────────────────────────────────────────────────────
export const PREMIUM_MONTHLY_PRICE = 9000;
export const PREMIUM_ANNUAL_PRICE  = 89000;

// ── Pro plan ──────────────────────────────────────────────────────────────────
export const PRO_MONTHLY_PRICE = 3000;

// ── Calculated discount ───────────────────────────────────────────────────────
export const PREMIUM_ANNUAL_SAVINGS = PREMIUM_MONTHLY_PRICE * 12 - PREMIUM_ANNUAL_PRICE;
export const PREMIUM_ANNUAL_DISCOUNT_PCT = Math.round(
  (PREMIUM_ANNUAL_SAVINGS / (PREMIUM_MONTHLY_PRICE * 12)) * 100
);
