// Adds the signed login token to every request the app makes to its own /api.
// (Admin and partner pages set their own Authorization header, which is kept.)
// The token lives in the saved profile (ep_user.passwordHash) and is a signed
// session, not the user's password hash.
export function getSessionToken() {
  try {
    const u = JSON.parse(localStorage.getItem('ep_user') || 'null');
    const t = u && u.passwordHash;
    return typeof t === 'string' && t.startsWith('u1.') ? t : '';
  } catch { return ''; }
}

export function installSessionFetch() {
  if (typeof window === 'undefined' || window.__esFetchPatched) return;
  window.__esFetchPatched = true;
  const orig = window.fetch.bind(window);
  window.fetch = (input, init = {}) => {
    try {
      const url = typeof input === 'string' ? input : (input && input.url) || '';
      if (url.startsWith('/api/')) {
        const token = getSessionToken();
        if (token) {
          const headers = new Headers(init.headers || (typeof input !== 'string' && input.headers) || {});
          if (!headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`);
          init = { ...init, headers };
        }
      }
    } catch { /* fall through to a plain request */ }
    return orig(input, init);
  };
}
