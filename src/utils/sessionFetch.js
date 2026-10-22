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
    const isApi = (() => {
      try { return (typeof input === 'string' ? input : (input && input.url) || '').indexOf('/api/') !== -1; } catch { return false; }
    })();
    const p = orig(input, init);
    return isApi ? p.then(makeJsonSafe).then(checkSuspended) : p;
  };
}

// A suspended account is signed out once, with the reason on screen.
let suspendedShown = false;
function checkSuspended(res) {
  try {
    if (res.status === 403 && !suspendedShown && getSessionToken()) {
      res.clone().json().then((j) => {
        if (j && j.code === 'SUSPENDED' && !suspendedShown) {
          suspendedShown = true;
          try { localStorage.removeItem('ep_user'); } catch { /* ignore */ }
          try { window.alert(j.error); } catch { /* ignore */ }
          window.location.href = '/';
        }
      }).catch(() => {});
    }
  } catch { /* ignore */ }
  return res;
}

// If the server (or a proxy, or a captive Wi-Fi page) answers with HTML or plain
// text instead of JSON, res.json() would throw "Unexpected token < in JSON".
// Make it resolve to a normal failure object instead, so no screen ever shows
// that message and every caller's existing error handling just works.
function makeJsonSafe(res) {
  try {
    const raw = res.clone();
    res.json = async () => {
      let text = '';
      try { text = await raw.text(); } catch { /* network cut mid-body */ }
      try { return JSON.parse(text); } catch {
        return {
          success: false,
          _nonJson: true,
          status: res.status,
          error: res.status >= 500 ? 'Server is busy. Please try again in a moment.' : 'Could not reach the server. Check your connection and try again.',
          message: res.status >= 500 ? 'Server is busy. Please try again in a moment.' : 'Could not reach the server. Check your connection and try again.',
        };
      }
    };
  } catch { /* leave the response untouched */ }
  return res;
}
