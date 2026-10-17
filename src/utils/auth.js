// ============================================================================
// auth.js — Local auth helpers (thin wrappers, real auth is in profileApi.js)
// ============================================================================

import { getDeviceInfo } from '../analytics/quizAnalytics';

// Log session to register sheet (existing behaviour, unchanged)
export function logSessionToSheet(name, email) {
  try {
    const { browser, device, os } = getDeviceInfo();
    fetch('/api/events/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'session', name, email, browser, device, os }),
    }).catch(() => {});
  } catch {}
}