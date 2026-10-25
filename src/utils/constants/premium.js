// ============================================================================
// constants/premium.js — Freemium limits and pricing
// ============================================================================

// ── Free-tier limits ──────────────────────────────────────────────────────────
export const FREE_TOPICS_PER_DAY  = 3;    // free learn-mode topics per day (admin can change; this is the offline fallback)
export const FREE_SESSION_MINUTES = 2400;  // max CBT/learn time per session (minutes) (original value 240)
export const FREE_COOLDOWN_HOURS  = 0;   // hours before they can continue after limit

// ── Pro pricing — annual only, no monthly tier ─────────────────────────────
export const PREMIUM_ANNUAL_PRICE          = 3000;
export const PREMIUM_ANNUAL_ORIGINAL_PRICE = 15000; // slashed-out "was" price shown in the UI


// ── Calculated discount ───────────────────────────────────────────────────────
export const PREMIUM_ANNUAL_SAVINGS = PREMIUM_ANNUAL_ORIGINAL_PRICE - PREMIUM_ANNUAL_PRICE;
export const PREMIUM_ANNUAL_DISCOUNT_PCT = Math.round(
  (PREMIUM_ANNUAL_SAVINGS / PREMIUM_ANNUAL_ORIGINAL_PRICE) * 100
);
