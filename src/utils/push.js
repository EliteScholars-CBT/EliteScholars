// Web push for daily streak reminders, challenges, squad chat and class assignments.
//
// Why this is built defensively: on many Android phones push setup fails quietly (the service worker is not ready
// yet, the browser still holds a subscription made with an old key, the phone's push service times out once, or a
// sign-in token is missing). Every step below has a timeout or a retry, and the reason a setup failed is kept in
// `lastPushError` and sent to our analytics so we can see what is going wrong on which phones.
const urlB64 = (b) => {
  const pad = '='.repeat((4 - (b.length % 4)) % 4);
  const raw = atob((b + pad).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
};

export const pushSupported = () =>
  typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

// iPhones only allow notifications for apps added to the Home Screen.
export const isIOS = () => typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent || '');
export const isStandalone = () => typeof window !== 'undefined' && ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true);
export const needsHomeScreen = () => isIOS() && !isStandalone();

export let lastPushError = '';
const fail = (why, ret = 'unavailable') => { lastPushError = why; return ret; };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// The service worker, registered if it somehow is not, with a time limit so we never wait forever.
async function getReg(ms = 8000) {
  try {
    let reg = await navigator.serviceWorker.getRegistration();
    if (!reg) reg = await navigator.serviceWorker.register('/sw.js');
    return await Promise.race([navigator.serviceWorker.ready, wait(ms).then(() => null)]) || reg;
  } catch { return null; }
}

const sameKey = (sub, keyBytes) => {
  try {
    const cur = sub.options && sub.options.applicationServerKey;
    if (!cur) return true; // cannot tell: keep it
    const a = new Uint8Array(cur);
    return a.length === keyBytes.length && a.every((v, i) => v === keyBytes[i]);
  } catch { return true; }
};

async function fetchKey() {
  try {
    const kr = await fetch('/api/push/key', { method: 'POST' });
    const kj = await kr.json().catch(() => null);
    if (kr.status === 401) return { err: 'signed-out' };
    if (kr.status === 503 || (kj && kj.code === 'NO_PUSH')) return { err: 'server-not-configured' };
    if (!kr.ok || !kj || !kj.key) return { err: 'no-key' };
    return { key: kj.key };
  } catch { return { err: 'offline' }; }
}

// Make sure this phone has a working subscription made with the current key, and that the server knows it.
async function ensureSubscribed(reg) {
  const k = await fetchKey();
  if (k.err) return fail(k.err);
  const keyBytes = urlB64(k.key);
  let sub = await reg.pushManager.getSubscription();
  if (sub && !sameKey(sub, keyBytes)) { try { await sub.unsubscribe(); } catch { /* ignore */ } sub = null; } // old key: a push to it would be rejected
  if (!sub) {
    let lastErr = null;
    for (let i = 0; i < 3 && !sub; i++) {
      try { sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes }); }
      catch (e) { lastErr = e; await wait(900 * (i + 1)); }
    }
    if (!sub) return fail(`subscribe-failed:${(lastErr && lastErr.name) || 'unknown'}`);
  }
  try {
    const r = await fetch('/api/push/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subscription: sub.toJSON() }) });
    if (r.status === 401) return fail('signed-out');
    return r.ok ? 'on' : fail(`save-failed:${r.status}`);
  } catch { return fail('offline'); }
}

export async function pushStatus() {
  if (!pushSupported()) return needsHomeScreen() ? 'homescreen' : 'unsupported';
  if (Notification.permission === 'denied') return 'blocked';
  try {
    const reg = await getReg(4000);
    if (!reg) return 'off';
    const sub = await reg.pushManager.getSubscription();
    return sub && Notification.permission === 'granted' ? 'on' : 'off';
  } catch { return 'off'; }
}

// Returns 'on' | 'blocked' | 'unsupported' | 'homescreen' | 'unavailable'
export async function enablePush() {
  lastPushError = '';
  if (!pushSupported()) return needsHomeScreen() ? 'homescreen' : 'unsupported';
  let perm = Notification.permission;
  if (perm !== 'granted') {
    try { perm = await Notification.requestPermission(); } catch { perm = 'denied'; }
  }
  if (perm !== 'granted') return perm === 'denied' ? 'blocked' : fail('permission-dismissed');
  const reg = await getReg();
  if (!reg) return fail('service-worker-not-ready');
  try { return await ensureSubscribed(reg); } catch (e) { return fail(`error:${(e && e.name) || 'unknown'}`); }
}

// Run quietly every time a signed-in student opens the app: repairs a lost, expired or old-key subscription and
// re-links this phone to whoever is signed in now. Does nothing unless notifications are already allowed.
export async function syncPush() {
  try {
    if (!pushSupported() || Notification.permission !== 'granted') return 'skip';
    const reg = await getReg(6000);
    if (!reg) return 'skip';
    return await ensureSubscribed(reg);
  } catch { return 'skip'; }
}

export async function disablePush() {
  try {
    const reg = await getReg(4000);
    const sub = reg && (await reg.pushManager.getSubscription());
    if (sub) {
      await fetch('/api/push/unsubscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ endpoint: sub.endpoint }) });
      await sub.unsubscribe();
    }
  } catch { /* ignore */ }
  return 'off';
}
