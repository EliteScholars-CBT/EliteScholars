// ============================================================================
// referral.js — referral codes, 60-day attribution, and analytics sends.
//
// The actual backend handling (a new sheet/column + action handlers in the
// Apps Script) isn't built yet — that's a deliberate next step once the
// owner is ready to wire it up. Everything here is written so that step is
// a drop-in: the frontend already generates codes, captures attribution,
// and sends well-formed analytics events to /api/events/track. Until the backend
// recognises these `action` values they'll simply be ignored server-side.
// ============================================================================


const ATTR_KEY = 'es_referral_attribution';
const ATTR_DAYS = 60;
const PROMPT_KEY = 'es_referral_prompt_last_shown';
const PROMPT_COOLDOWN_DAYS = 5;

/* ── Referral code ───────────────────────────────────────────────────────── */

// Deterministic, stable per-account code: readable (their username) plus a
// short check-suffix derived from their email so it can't be trivially
// guessed/collided between two students with similar usernames.
export function buildReferralCode(username, email) {
  const base = (username || 'scholar').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10) || 'SCHOLAR';
  let hash = 0;
  const seed = (email || username || '').toLowerCase();
  for (let i = 0; i < seed.length; i++) { hash = (hash * 31 + seed.charCodeAt(i)) >>> 0; }
  const suffix = (hash % 8999 + 1000).toString(); // stable 4-digit suffix
  return `${base}${suffix}`;
}

export function referralLink(code) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://elitescholars.site';
  return `${origin}/?ref=${encodeURIComponent(code)}`;
}

export function referralShareText(name, code) {
  const who = name ? `${name} ` : '';
  return `${who}invited you to EliteScholars — free WAEC, NECO, JAMB & GST practice with games, flashcards and challenges. Join with my link and we both move up the leaderboard: ${referralLink(code)}`;
}

/* ── 60-day attribution (localStorage, not a real cookie — more reliable
   inside a PWA/standalone shell, same effect for same-origin use) ──────── */

export function captureReferralFromURL(search) {
  try {
    const params = new URLSearchParams(search || (typeof window !== 'undefined' ? window.location.search : ''));
    const ref = params.get('ref');
    if (!ref) return null;
    const record = { code: ref.trim().toUpperCase(), capturedAt: Date.now() };
    localStorage.setItem(ATTR_KEY, JSON.stringify(record));
    sendAnalytics('referral_link_opened', { referral_code: record.code });
    return record;
  } catch {
    return null;
  }
}

export function getReferralAttribution() {
  try {
    const raw = localStorage.getItem(ATTR_KEY);
    if (!raw) return null;
    const record = JSON.parse(raw);
    const ageDays = (Date.now() - record.capturedAt) / (1000 * 60 * 60 * 24);
    if (ageDays > ATTR_DAYS) { localStorage.removeItem(ATTR_KEY); return null; }
    return record.code || null;
  } catch {
    return null;
  }
}

export function getReferralClickedAt() {
  try { return JSON.parse(localStorage.getItem(ATTR_KEY) || '{}').capturedAt || 0; } catch { return 0; }
}

export function clearReferralAttribution() {
  try { localStorage.removeItem(ATTR_KEY); } catch { /* ignore */ }
}

/* ── Referral prompt cooldown (so it asks, doesn't nag) ─────────────────── */

export function shouldShowReferralPrompt() {
  try {
    const last = parseInt(localStorage.getItem(PROMPT_KEY) || '0', 10);
    if (!last) return true;
    const daysSince = (Date.now() - last) / (1000 * 60 * 60 * 24);
    return daysSince >= PROMPT_COOLDOWN_DAYS;
  } catch {
    return false;
  }
}

export function markReferralPromptShown() {
  try { localStorage.setItem(PROMPT_KEY, String(Date.now())); } catch { /* ignore */ }
}

/* ── Analytics (best-effort, never blocks the UI) ───────────────────────── */

// Fire-and-forget POST to our own /api/events/track (stored in Supabase,
// mirrored to Sheets). Never blocks the UI.
export function sendAnalytics(event, data = {}) {
  try {
    fetch('/api/events/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: event, ...data, ts: Date.now() }),
    }).catch(() => { /* analytics is best-effort */ });
  } catch { /* ignore */ }
}

export function sendReferralSignup(email, referredByCode) {
  if (!referredByCode) return;
  sendAnalytics('referral_signup', { email: (email || '').toLowerCase().trim(), referred_by: referredByCode });
}
