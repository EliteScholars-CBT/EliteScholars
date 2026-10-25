// Remembers the browser's "install this app" offer so Settings can use it any time (even after the banner is gone).
let deferred = null;
const subs = new Set();
const ping = () => subs.forEach((f) => { try { f(); } catch { /* ignore */ } });

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; ping(); });
  window.addEventListener('appinstalled', () => { deferred = null; try { localStorage.setItem('es_pwa_installed', 'true'); } catch { /* ignore */ } ping(); });
}

export const isStandaloneApp = () => typeof window !== 'undefined' && (!!(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true);
export const isIosDevice = () => typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
export const canInstallNow = () => !!deferred;
export const onInstallChange = (f) => { subs.add(f); return () => subs.delete(f); };

// Returns 'accepted' | 'dismissed' | 'unavailable'
export async function installApp() {
  if (!deferred) return 'unavailable';
  const e = deferred;
  try {
    e.prompt();
    const r = await e.userChoice;
    deferred = null; ping();
    return r && r.outcome === 'accepted' ? 'accepted' : 'dismissed';
  } catch { return 'unavailable'; }
}
