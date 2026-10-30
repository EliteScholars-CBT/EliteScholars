// Crash reporting: when a screen (or the whole app) crashes we send the admin the error, which screen it was,
// who it happened to and the full device details. If the phone is offline the report waits and is sent on the
// next launch. Never throws: a crash reporter must not crash.
const QUEUE = 'es_crash_queue';

export function deviceInfo() {
  const n = typeof navigator !== 'undefined' ? navigator : {};
  const w = typeof window !== 'undefined' ? window : {};
  const s = w.screen || {};
  const conn = n.connection || {};
  const d = {
    userAgent: n.userAgent || '',
    platform: (n.userAgentData && n.userAgentData.platform) || n.platform || '',
    mobile: n.userAgentData ? !!n.userAgentData.mobile : /Mobi|Android/i.test(n.userAgent || ''),
    brands: n.userAgentData && n.userAgentData.brands ? n.userAgentData.brands.map((b) => `${b.brand} ${b.version}`).join(', ') : '',
    language: n.language || '',
    screen: `${s.width || 0}x${s.height || 0}`,
    viewport: `${w.innerWidth || 0}x${w.innerHeight || 0}`,
    pixelRatio: w.devicePixelRatio || 1,
    memoryGB: n.deviceMemory || 0,
    cpuCores: n.hardwareConcurrency || 0,
    online: n.onLine !== false,
    connection: conn.effectiveType || '',
    saveData: !!conn.saveData,
    standalone: !!((w.matchMedia && w.matchMedia('(display-mode: standalone)').matches) || n.standalone),
    serviceWorker: !!(n.serviceWorker && n.serviceWorker.controller),
    notifications: typeof Notification !== 'undefined' ? Notification.permission : 'unsupported',
    timezone: (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return ''; } })(),
    time: new Date().toISOString(),
  };
  return d;
}

function who() {
  try {
    const u = JSON.parse(localStorage.getItem('ep_user') || 'null') || {};
    return { email: u.email || '', name: [u.firstName, u.lastName].filter(Boolean).join(' ') || u.name || u.username || '' };
  } catch { return { email: '', name: '' }; }
}

async function post(payload) {
  const r = await fetch('/api/report/crash', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), keepalive: true });
  return r.ok;
}

let sentThisSession = new Set();

export async function reportCrash(error, info) {
  try {
    const message = String((error && (error.message || error)) || 'Unknown error').slice(0, 400);
    if (sentThisSession.has(message)) return;
    sentThisSession.add(message);
    const payload = {
      ...who(), message, stack: String((error && error.stack) || '').slice(0, 3000), componentStack: String((info && info.componentStack) || '').slice(0, 2000),
      screen: (typeof window !== 'undefined' && window.__esScreen) || '', url: typeof location !== 'undefined' ? location.href : '', device: deviceInfo(),
      appVersion: (typeof window !== 'undefined' && window.__esBuild) || '',
    };
    let ok = false;
    try { ok = await post(payload); } catch { ok = false; }
    if (!ok) {
      try { const q = JSON.parse(localStorage.getItem(QUEUE) || '[]'); q.push(payload); localStorage.setItem(QUEUE, JSON.stringify(q.slice(-5))); } catch { /* ignore */ }
    }
  } catch { /* never throw */ }
}

// Send anything saved while offline. Call once at startup.
export async function flushCrashQueue() {
  try {
    const q = JSON.parse(localStorage.getItem(QUEUE) || '[]');
    if (!q.length) return;
    localStorage.removeItem(QUEUE);
    for (const p of q) { try { if (!(await post(p))) throw new Error('x'); } catch { try { const left = JSON.parse(localStorage.getItem(QUEUE) || '[]'); left.push(p); localStorage.setItem(QUEUE, JSON.stringify(left.slice(-5))); } catch { /* ignore */ } } }
  } catch { /* ignore */ }
}
