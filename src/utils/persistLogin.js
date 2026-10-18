// Keeps students signed in.
// 1. Asks the browser to treat our storage as "persistent" so it is not wiped
//    when the phone is low on space.
// 2. Mirrors the saved login (ep_user) into a long-lived cookie. If the browser
//    ever clears localStorage but keeps cookies, the student is restored
//    silently instead of being asked to sign in again.
// 3. Logging out (removing ep_user) clears the cookie too.
const KEY = 'ep_user';
const COOKIE = 'es_login';
const MAX_AGE = 60 * 60 * 24 * 365; // one year

function readCookie() {
  try {
    const m = document.cookie.split('; ').find((c) => c.startsWith(COOKIE + '='));
    return m ? decodeURIComponent(m.slice(COOKIE.length + 1)) : '';
  } catch { return ''; }
}

function writeCookie(value) {
  try {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    if (!value) {
      document.cookie = `${COOKIE}=; Max-Age=0; Path=/; SameSite=Lax${secure}`;
      return;
    }
    const enc = encodeURIComponent(value);
    if (enc.length > 3500) return; // browsers drop cookies larger than ~4KB
    document.cookie = `${COOKIE}=${enc}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  } catch { /* cookies blocked — localStorage still works */ }
}

export function installLoginPersistence() {
  if (typeof window === 'undefined' || window.__esPersistInstalled) return;
  window.__esPersistInstalled = true;

  try {
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  } catch { /* not supported */ }

  // Restore after a storage wipe
  try {
    if (!localStorage.getItem(KEY)) {
      const saved = readCookie();
      if (saved) {
        const u = JSON.parse(saved);
        if (u && u.email && typeof u.passwordHash === 'string') localStorage.setItem(KEY, saved);
      }
    } else {
      writeCookie(localStorage.getItem(KEY)); // refresh the cookie's lifetime on every visit
    }
  } catch { /* ignore */ }

  // Keep the cookie in step with every login / logout
  try {
    const proto = Storage.prototype;
    const set = proto.setItem;
    const remove = proto.removeItem;
    proto.setItem = function (k, v) {
      const r = set.apply(this, arguments);
      if (this === window.localStorage && k === KEY) writeCookie(String(v));
      return r;
    };
    proto.removeItem = function (k) {
      const r = remove.apply(this, arguments);
      if (this === window.localStorage && k === KEY) writeCookie('');
      return r;
    };
  } catch { /* ignore */ }
}
