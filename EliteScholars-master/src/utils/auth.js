// ============================================================================
// auth.js — Local auth helpers (thin wrappers, real auth is in profileApi.js)
// ============================================================================

import { SHEETS_URL } from './constants';
import { getDeviceInfo } from '../analytics/quizAnalytics';

// Log session to register sheet (existing behaviour, unchanged)
export function logSessionToSheet(name, email) {
  try {
    const { browser, device, os } = getDeviceInfo();
    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'register',
        name, email, browser, device, os,
      }),
    });
  } catch {}
}