// Where did this visitor come from? WhatsApp, Facebook, Google, direct, a partner's link...
// Sent once per browser session as `visit_source`; the first-touch source is kept for
// 60 days and sent again as `signup_source` when the visitor registers.
const FIRST_KEY = 'es_first_source';
const SENT_KEY = 'es_source_sent';
const DAYS = 60;

const ALIASES = {
  wa: 'whatsapp', whatsapp: 'whatsapp', 'api.whatsapp.com': 'whatsapp', 'web.whatsapp.com': 'whatsapp', 'wa.me': 'whatsapp',
  fb: 'facebook', facebook: 'facebook', 'l.facebook.com': 'facebook', 'm.facebook.com': 'facebook', 'lm.facebook.com': 'facebook', 'facebook.com': 'facebook',
  ig: 'instagram', instagram: 'instagram', 'l.instagram.com': 'instagram', 'instagram.com': 'instagram',
  tw: 'x', twitter: 'x', x: 'x', 't.co': 'x', 'twitter.com': 'x', 'x.com': 'x',
  tiktok: 'tiktok', 'tiktok.com': 'tiktok', 'vm.tiktok.com': 'tiktok',
  telegram: 'telegram', tg: 'telegram', 't.me': 'telegram', 'web.telegram.org': 'telegram',
  youtube: 'youtube', yt: 'youtube', 'youtube.com': 'youtube', 'm.youtube.com': 'youtube', 'youtu.be': 'youtube',
  google: 'google', 'google.com': 'google', 'google.com.ng': 'google', bing: 'bing', 'bing.com': 'bing', duckduckgo: 'google',
  linkedin: 'linkedin', 'linkedin.com': 'linkedin', 'lnkd.in': 'linkedin',
  snapchat: 'snapchat', email: 'email', sms: 'sms', 'mail.google.com': 'email',
};

export const SOURCE_LABELS = {
  whatsapp: 'WhatsApp', facebook: 'Facebook', instagram: 'Instagram', x: 'X (Twitter)', tiktok: 'TikTok', telegram: 'Telegram',
  youtube: 'YouTube', google: 'Google search', bing: 'Bing', linkedin: 'LinkedIn', snapchat: 'Snapchat', email: 'Email', sms: 'SMS', direct: 'Direct', other: 'Other sites',
};

const clean = (v) => String(v || '').toLowerCase().trim().replace(/^www\./, '').replace(/[^a-z0-9.\-_]/g, '').slice(0, 40);

export function classifySource(referrer, search, ownHost) {
  const params = new URLSearchParams(search || '');
  const utm = clean(params.get('utm_source'));
  const tag = utm || clean(params.get('src') || params.get('source'));
  if (tag && ALIASES[tag]) return ALIASES[tag];
  if (utm) return utm; // an explicit utm_source we don't know by name: keep it as written
  let host = '';
  try { host = referrer ? new URL(referrer).hostname.replace(/^www\./, '').toLowerCase() : ''; } catch { host = ''; }
  if (host && ownHost && host === ownHost.replace(/^www\./, '')) return 'internal';
  if (host) {
    if (ALIASES[host]) return ALIASES[host];
    if (/google\./.test(host)) return 'google';
    if (/facebook\./.test(host)) return 'facebook';
    if (/instagram\./.test(host)) return 'instagram';
    return 'other';
  }
  return 'direct';
}

const post = (type, payload) => {
  try { fetch('/api/events/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, ...payload }), keepalive: true }).catch(() => {}); } catch { /* ignore */ }
};

const pageKind = (path) => (path === '/' || path === '/school' ? 'landing' : path.startsWith('/blog') ? 'blog' : path.startsWith('/app') ? 'app' : 'page');

export function captureTrafficSource() {
  try {
    if (sessionStorage.getItem(SENT_KEY)) return;
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const ref = (params.get('ref') || '').trim().toUpperCase().slice(0, 32) || '';
    let source = classifySource(document.referrer, search, window.location.hostname);
    const campaign = String(params.get('utm_campaign') || params.get('campaign') || params.get('c') || '').toLowerCase().replace(/[^a-z0-9._-]/g, '').slice(0, 40);
    if (source === 'internal') return; // moving around our own site is not a new visit
    sessionStorage.setItem(SENT_KEY, '1');
    const storedRaw = localStorage.getItem(FIRST_KEY);
    let first = null;
    try { first = storedRaw ? JSON.parse(storedRaw) : null; } catch { first = null; }
    const fresh = !first || (Date.now() - first.at) / 86400000 > DAYS || (ref && !first.ref);
    if (fresh) localStorage.setItem(FIRST_KEY, JSON.stringify({ source, ref, campaign, at: Date.now() }));
    post('visit_source', { source, ref, campaign, page: pageKind(window.location.pathname), returning: !fresh });
  } catch { /* analytics must never break the app */ }
}

// Call once right after a successful registration.
export function trackSignupSource() {
  try {
    const raw = localStorage.getItem(FIRST_KEY);
    const f = raw ? JSON.parse(raw) : null;
    post('signup_source', { source: (f && f.source) || 'direct', ref: (f && f.ref) || '', campaign: (f && f.campaign) || '' });
  } catch { post('signup_source', { source: 'direct', ref: '' }); }
}
