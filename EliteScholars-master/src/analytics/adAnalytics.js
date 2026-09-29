// ============================================================================
// adAnalytics.js — Ad impression, click, and viewability tracking
// All events are stored locally and flushed to Google Sheets
// ============================================================================

import { SHEETS_URL } from '../utils/constants';

const STORAGE_KEY = 'es_ad_events';
const MAX_QUEUED  = 50; // flush after this many queued events

// ── Internal queue ────────────────────────────────────────────────────────────
function readQueue() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeQueue(q) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(q.slice(-MAX_QUEUED)));
  } catch {}
}

// ── Flush to Sheets (fire-and-forget) ────────────────────────────────────────
async function flush(events) {
  if (!events.length) return;
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'adEvents', events }),
    });
  } catch {}
}

// ── Core tracker ──────────────────────────────────────────────────────────────
function track(type, data) {
  const event = {
    type,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    ...data,
  };
  const q = [...readQueue(), event];
  writeQueue(q);
  if (q.length >= MAX_QUEUED) {
    flush(q);
    writeQueue([]);
  }
  return event;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Track when an ad enters the viewport.
 * @param {'publisher'|'affiliate'|'custom'} adType
 * @param {string} adId - ad identifier
 * @param {string} examType - current exam context
 */
export function trackAdImpression(adType, adId, examType = '', link = '') {
  return track('ad_impression', { adType, adId, examType, link });
}

/**
 * Track when a user clicks an ad.
 * @param {'publisher'|'affiliate'|'custom'} adType
 * @param {string} adId
 * @param {string} link - destination URL
 * @param {string} examType
 */
export function trackAdClick(adType, adId, link = '', examType = '') {
  return track('ad_click', { adType, adId, link, examType });
}

/**
 * Track how long an ad was visible (viewability in seconds).
 * @param {string} adId
 * @param {number} visibleMs
 */
export function trackAdViewTime(adId, visibleMs, link = '') {
  return track('ad_view_time', { adId, link, visibleSec: Math.round((visibleMs / 1000) * 10) / 10 });
}

/**
 * Track when an ad fails to load.
 * @param {string} adId
 * @param {string} reason
 */
export function trackAdError(adId, reason = '') {
  return track('ad_error', { adId, reason });
}

/**
 * Flush any queued events immediately (call on page unload).
 */
export function flushAdAnalytics() {
  const q = readQueue();
  if (q.length) { flush(q); writeQueue([]); }
}

// ── IntersectionObserver helper ───────────────────────────────────────────────
// Attach to an ad DOM ref to automatically track impressions + view time.
let _observer = null;
const _viewStarts = new Map();

export function observeAdElement(el, adId, adType, examType, adLink) {
  if (!el || !('IntersectionObserver' in window)) return () => {};

  if (!_observer) {
    _observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.dataset.adId;
        if (!id) return;
        if (entry.isIntersecting) {
          trackAdImpression(entry.target.dataset.adType, id, entry.target.dataset.examType, entry.target.dataset.adLink || '');
          _viewStarts.set(id, Date.now());
        } else {
          const start = _viewStarts.get(id);
          if (start) {
            trackAdViewTime(id, Date.now() - start, entry.target.dataset.adLink || '');
            _viewStarts.delete(id);
          }
        }
      });
    }, { threshold: 0.5 });
  }

  el.dataset.adId    = adId;
  el.dataset.adType  = adType;
  el.dataset.examType = examType || '';
  el.dataset.adLink   = adLink || '';
  _observer.observe(el);

  return () => _observer.unobserve(el);
}
