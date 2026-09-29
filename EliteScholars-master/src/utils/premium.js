// ============================================================================
// premium.js — Premium subscription state management
// ============================================================================

import {
  FREE_TOPICS_PER_DAY,
  FREE_SESSION_MINUTES,
  FREE_COOLDOWN_HOURS,
  XP_REWARDS,
} from './constants';

// ── Storage keys ──────────────────────────────────────────────────────────────
const KEY_PREMIUM      = (email) => `ep_premium_${email}`;
const KEY_TOPICS_TODAY = (email) => `ep_topics_${email}_${new Date().toDateString()}`;
const KEY_SESSION_START= (email) => `ep_session_start_${email}`;
const KEY_COOLDOWN_END = (email) => `ep_cooldown_end_${email}`;

// ── Premium status ────────────────────────────────────────────────────────────

export function isPremium(email) {
  if (!email) return false;
  try {
    const raw = localStorage.getItem(KEY_PREMIUM(email));
    if (!raw) return false;
    const data = JSON.parse(raw);
    // Check expiry
    if (data.expiresAt && Date.now() > data.expiresAt) {
      localStorage.removeItem(KEY_PREMIUM(email));
      return false;
    }
    return data.active === true;
  } catch {
    return false;
  }
}

export function getPremiumData(email) {
  if (!email) return null;
  try {
    const raw = localStorage.getItem(KEY_PREMIUM(email));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function activatePremium(email, plan = 'monthly') {
  if (!email) return;
  const now = Date.now();
  const duration = plan === 'annual'
    ? 365 * 24 * 60 * 60 * 1000
    :  30 * 24 * 60 * 60 * 1000;

  const data = {
    active:     true,
    plan,
    activatedAt: now,
    expiresAt:   now + duration,
    expiresDateStr: new Date(now + duration).toLocaleDateString('en-NG', {
      day: 'numeric', month: 'long', year: 'numeric',
    }),
  };
  try {
    localStorage.setItem(KEY_PREMIUM(email), JSON.stringify(data));
  } catch {}
  return data;
}

export function cancelPremium(email) {
  if (!email) return;
  try { localStorage.removeItem(KEY_PREMIUM(email)); } catch {}
}

// ── Sync premium status from server ──────────────────────────────────────────
// Call this after a successful verifyProfile so localStorage stays in sync
// with whatever the server says about the user's subscription.

export function syncPremiumFromServer(email, premiumPlan, premiumExpiresAt) {
  if (!email || !premiumPlan || !premiumExpiresAt) return;
  try {
    const expiresAt = new Date(premiumExpiresAt).getTime();
    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      // Subscription expired or invalid — clear local record
      localStorage.removeItem(KEY_PREMIUM(email));
      return;
    }
    const data = {
      active:         true,
      plan:           premiumPlan,
      activatedAt:    Date.now(),
      expiresAt,
      expiresDateStr: new Date(expiresAt).toLocaleDateString('en-NG', {
        day: 'numeric', month: 'long', year: 'numeric',
      }),
    };
    localStorage.setItem(KEY_PREMIUM(email), JSON.stringify(data));
  } catch {}
}

// ── Free tier limits ──────────────────────────────────────────────────────────

export function getTopicsUsedToday(email) {
  if (!email) return 0;
  try {
    const raw = localStorage.getItem(KEY_TOPICS_TODAY(email));
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

export function incrementTopicsToday(email) {
  if (!email) return;
  try {
    const count = getTopicsUsedToday(email) + 1;
    localStorage.setItem(KEY_TOPICS_TODAY(email), String(count));
  } catch {}
}

export function canUseTopic(email) {
  if (isPremium(email)) return true;
  return getTopicsUsedToday(email) < FREE_TOPICS_PER_DAY;
}

// Session timer
export function startSession(email) {
  if (!email) return;
  try {
    if (!localStorage.getItem(KEY_SESSION_START(email))) {
      localStorage.setItem(KEY_SESSION_START(email), String(Date.now()));
    }
  } catch {}
}

export function getSessionMinutesUsed(email) {
  if (!email) return 0;
  try {
    const start = localStorage.getItem(KEY_SESSION_START(email));
    if (!start) return 0;
    return Math.floor((Date.now() - parseInt(start, 10)) / 60000);
  } catch {
    return 0;
  }
}

export function isSessionExpired(email) {
  if (isPremium(email)) return false;
  // Check if in cooldown
  if (isInCooldown(email)) return true;
  return getSessionMinutesUsed(email) >= FREE_SESSION_MINUTES;
}

export function startCooldown(email) {
  if (!email) return;
  try {
    const cooldownEnd = Date.now() + FREE_COOLDOWN_HOURS * 60 * 60 * 1000;
    localStorage.setItem(KEY_COOLDOWN_END(email), String(cooldownEnd));
    localStorage.removeItem(KEY_SESSION_START(email));
  } catch {}
}

export function isInCooldown(email) {
  if (!email) return false;
  try {
    const end = localStorage.getItem(KEY_COOLDOWN_END(email));
    if (!end) return false;
    if (Date.now() > parseInt(end, 10)) {
      localStorage.removeItem(KEY_COOLDOWN_END(email));
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function getCooldownSecondsLeft(email) {
  if (!email) return 0;
  try {
    const end = localStorage.getItem(KEY_COOLDOWN_END(email));
    if (!end) return 0;
    const diff = parseInt(end, 10) - Date.now();
    return diff > 0 ? Math.ceil(diff / 1000) : 0;
  } catch {
    return 0;
  }
}

export function resetSession(email) {
  if (!email) return;
  try {
    localStorage.removeItem(KEY_SESSION_START(email));
    localStorage.removeItem(KEY_COOLDOWN_END(email));
  } catch {}
}
