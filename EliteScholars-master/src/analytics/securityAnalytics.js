// ============================================================================
// securityAnalytics.js — Security breach & suspicious activity tracking
// ============================================================================

import { SHEETS_URL } from '../utils/constants';

const STORAGE_KEY = 'es_sec_events';
const MAX_QUEUED  = 30;

function readQueue() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
function writeQueue(q) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(q.slice(-MAX_QUEUED))); }
  catch {}
}
async function flush(events) {
  if (!events.length) return;
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'securityEvents', events }),
    });
  } catch {}
}

function track(type, data = {}) {
  const event = {
    type,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    ua: navigator.userAgent.slice(0, 120),
    ...data,
  };
  const q = [...readQueue(), event];
  writeQueue(q);
  if (q.length >= MAX_QUEUED) { flush(q); writeQueue([]); }
  return event;
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Track attempt to open browser DevTools */
export function trackDevToolsAttempt() {
  return track('devtools_open_attempt');
}

/** Track right-click / context menu attempt */
export function trackRightClickAttempt(target = '') {
  return track('right_click_attempt', { target });
}

/** Track copy/cut attempt on protected content */
export function trackCopyAttempt(targetClass = '') {
  return track('copy_attempt', { targetClass });
}

/** Track keyboard shortcut blocked (F12, Ctrl+U, etc.) */
export function trackKeyShortcutBlocked(key = '') {
  return track('keyboard_shortcut_blocked', { key });
}

/** Track rapid/bot-like quiz answer submissions */
export function trackSuspiciousQuizActivity(subjectId, detail = '') {
  return track('suspicious_quiz_activity', { subjectId, detail });
}

/** Track premium bypass attempt (e.g. localStorage manipulation) */
export function trackPremiumBypassAttempt(detail = '') {
  return track('premium_bypass_attempt', { detail });
}

/** Track session anomaly (e.g. too many sessions from same device in one day) */
export function trackSessionAnomaly(sessionsToday, limit) {
  return track('session_anomaly', { sessionsToday, limit });
}

/** Flush any queued events immediately */
export function flushSecurityAnalytics() {
  const q = readQueue();
  if (q.length) { flush(q); writeQueue([]); }
}

// ── Patch security.js to call these trackers ─────────────────────────────────
// Called from security.js applySecurityMeasures() via import
export function attachSecurityTrackers() {
  // Right-click
  document.addEventListener('contextmenu', (e) => {
    trackRightClickAttempt(e.target?.className?.toString?.()?.slice(0, 60) || '');
  }, { capture: true, passive: true });

  // Copy
  document.addEventListener('copy', () => {
    trackCopyAttempt(document.activeElement?.className?.toString?.()?.slice(0, 60) || '');
  }, { capture: true, passive: true });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
      (e.ctrlKey && ['U', 'S', 'P'].includes(e.key))
    ) {
      trackKeyShortcutBlocked(`${e.ctrlKey ? 'Ctrl+' : ''}${e.shiftKey ? 'Shift+' : ''}${e.key}`);
    }
  }, { capture: true, passive: true });

  // DevTools width heuristic
  let _warned = false;
  setInterval(() => {
    if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
      if (!_warned) { trackDevToolsAttempt(); _warned = true; }
    } else {
      _warned = false;
    }
  }, 2000);
}
