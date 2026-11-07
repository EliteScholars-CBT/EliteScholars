// EliteScholars service worker: offline app + push notifications.
//
// OFFLINE: on install we download the whole app (every JavaScript, CSS and image file the build lists in
// /asset-manifest.json), so after one online visit the app opens and works with no network at all, with the
// full design. Hashed build files never change, so they are served from the cache first. Pages use the network
// when it answers quickly and the saved copy when it does not (slow or no data). Bump CACHE_VERSION when you
// change this file.
const CACHE_VERSION = 'v15';
const CACHE_NAME  = 'elitescholars-' + CACHE_VERSION;
const RUNTIME     = 'elitescholars-runtime-' + CACHE_VERSION;   // images, fonts and anything else seen while online
const SHELL = ['/', '/index.html', '/app', '/manifest.json', '/favicon.ico', '/android-chrome-192x192.png', '/android-chrome-512x512.png', '/apple-touch-icon.png', '/premium.png'];
const NAV_TIMEOUT_MS = 3500;

let _reminderTids = [];
let _reminderName = 'Scholar';

// Download (or top up) everything the app needs to run offline. Failures on single files never stop the rest.
async function precacheApp() {
  const cache = await caches.open(CACHE_NAME);
  const urls = new Set(SHELL);
  try {
    const r = await fetch('/asset-manifest.json', { cache: 'no-store' });
    if (r.ok) {
      const m = await r.json();
      Object.values(m.files || {}).forEach((u) => { if (typeof u === 'string' && !u.endsWith('.map') && u.startsWith('/')) urls.add(u); });
    }
  } catch { /* offline: whatever is already cached stays */ }
  const have = new Set((await cache.keys()).map((k) => new URL(k.url).pathname));
  const todo = [...urls].filter((u) => !have.has(u.split('?')[0]) || SHELL.includes(u));
  for (let i = 0; i < todo.length; i += 6) {
    await Promise.all(todo.slice(i, i + 6).map(async (u) => {
      try { const res = await fetch(u, { cache: 'reload' }); if (res && res.ok) await cache.put(u, res); } catch { /* skip */ }
    }));
  }
  // drop build files that are no longer part of the app (old hashed bundles)
  const keep = new Set([...urls].map((u) => u.split('?')[0]));
  for (const k of await cache.keys()) { const path = new URL(k.url).pathname; if (path.startsWith('/static/') && !keep.has(path)) await cache.delete(k); }
}

self.addEventListener('install', (event) => {
  event.waitUntil(precacheApp().catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME && k !== RUNTIME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

const isAsset = (path) => path.startsWith('/static/');
const isImage = (req, path) => req.destination === 'image' || /\.(png|jpe?g|webp|gif|svg|ico|woff2?)$/i.test(path);

async function fromAnyCache(req, opts) {
  return (await caches.match(req, opts)) || null;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts (the app's typeface): keep a copy so the design looks right offline too.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(caches.open(RUNTIME).then(async (c) => {
      const hit = await c.match(req);
      const net = fetch(req).then((res) => { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()).catch(() => {}); return res; }).catch(() => null);
      return hit || (await net) || Response.error();
    }));
    return;
  }

  if (url.origin !== self.location.origin) return;
  // API calls always go to the network: a cached /api/entitlement or /api/payment/status could show the wrong plan,
  // and the app has its own offline handling for failed API calls.
  if (url.pathname.startsWith('/api/')) return;

  // Pages. The site is one app shell, so any app or site page offline opens the saved shell. Blog pages are
  // plain files and are cached as themselves.
  if (req.mode === 'navigate') {
    const blog = url.pathname.startsWith('/blog');
    event.respondWith((async () => {
      const cached = async () => (await fromAnyCache(req, { ignoreSearch: true }))
        || (blog ? null : (await caches.match(url.pathname.startsWith('/app') ? '/app' : '/index.html', { ignoreSearch: true })) || (await caches.match('/index.html')))
        || (await caches.match('/'));
      try {
        const res = await Promise.race([
          fetch(req),
          new Promise((_, rej) => setTimeout(() => rej(new Error('slow')), NAV_TIMEOUT_MS)),
        ]);
        if (res && res.ok) { const clone = res.clone(); caches.open(CACHE_NAME).then((c) => c.put(blog ? req : (url.pathname.startsWith('/app') ? '/app' : '/index.html'), clone)).catch(() => {}); return res; }
        return (await cached()) || res;
      } catch {
        return (await cached()) || Response.error();
      }
    })());
    return;
  }

  // Build files (hashed names, never change): cache first, then network and save.
  if (isAsset(url.pathname)) {
    event.respondWith((async () => {
      const hit = await fromAnyCache(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res && res.ok) { const clone = res.clone(); caches.open(CACHE_NAME).then((c) => c.put(req, clone)).catch(() => {}); }
        return res;
      } catch { return Response.error(); }
    })());
    return;
  }

  // Pictures and fonts: show the saved one straight away, refresh it quietly in the background.
  if (isImage(req, url.pathname)) {
    event.respondWith(caches.open(RUNTIME).then(async (c) => {
      const hit = (await c.match(req)) || (await caches.match(req));
      const net = fetch(req).then((res) => { if (res && res.ok) c.put(req, res.clone()).catch(() => {}); return res; }).catch(() => null);
      return hit || (await net) || Response.error();
    }));
    return;
  }

  // Everything else (manifest, small json, scripts in /public): network first, saved copy when offline.
  event.respondWith(
    fetch(req)
      .then((res) => { if (res && res.ok && res.type === 'basic') { const clone = res.clone(); caches.open(RUNTIME).then((c) => c.put(req, clone)).catch(() => {}); } return res; })
      .catch(async () => (await fromAnyCache(req)) || Response.error())
  );
});

self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch {
    data = { title: 'EliteScholars', body: event.data ? event.data.text() : '' };
  }
  const options = {
    body:    data.body    || 'Time to study! 📚',
    icon:    data.icon    || '/android-chrome-192x192.png',
    badge:   data.badge   || '/android-chrome-192x192.png',
    tag:     data.tag     || 'elitescholars',
    renotify: true,
    requireInteraction: data.requireInteraction || false,
    data: { url: data.url || '/app', type: data.type || 'general', challengerName: data.challengerName || '' },
    actions: data.actions || [],
    vibrate: [200, 100, 200],
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'EliteScholars CBT', options).then(() => {
      try { return fetch('/api/events/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'push_shown', kind: data.type || 'general' }), keepalive: true }); } catch (e) { return null; }
    }).catch(() => {})
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  let targetUrl = event.notification.data?.url || '/app';
  const kind = event.notification.data?.type || 'general';
  if (!/[?&]np=/.test(targetUrl)) targetUrl += (targetUrl.includes('?') ? '&' : '?') + 'np=' + encodeURIComponent(kind);
  // count the click (no login needed); the app itself logs who opened it
  try { fetch('/api/events/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'push_click', kind, tag: event.notification.tag || '' }), keepalive: true }).catch(() => {}); } catch (e) { /* ignore */ }
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage({ type: 'NOTIFICATION_CLICK', data: event.notification.data });
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});

function showReminder(name) {
  return self.registration.showNotification('📚 Study Reminder — EliteScholars', {
    body:    `Hi ${name}! Time for today's study session. Don't break your streak! 🔥`,
    icon:    '/android-chrome-192x192.png',
    badge:   '/android-chrome-192x192.png',
    tag:     'study-reminder',
    renotify: true,
    vibrate: [200, 100, 200],
    data: { url: '/app', type: 'reminder' },
  }).then(() => { try { return fetch('/api/events/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'push_shown', kind: 'reminder' }), keepalive: true }); } catch (e) { return null; } }).catch(() => {});
}

function scheduleReminders(times, name) {
  _reminderTids.forEach(clearTimeout);
  _reminderTids = [];
  _reminderName = name || 'Scholar';

  times.forEach((hour) => {
    function scheduleNext() {
      const now    = new Date();
      const target = new Date();
      target.setHours(typeof hour === 'number' ? hour : parseInt(hour), 0, 0, 0);
      if (target <= now) target.setDate(target.getDate() + 1);
      const msUntil = target - now;
      const tid = setTimeout(() => {
        showReminder(_reminderName);
        scheduleNext();
      }, msUntil);
      _reminderTids.push(tid);
    }
    scheduleNext();
  });
}

self.addEventListener('message', (event) => {
  const { type } = event.data || {};

  if (type === 'PRECACHE') { event.waitUntil(precacheApp().catch(() => {})); return; }

  if (type === 'SCHEDULE_REMINDERS') {
    scheduleReminders(event.data.times || [18], event.data.name);
    return;
  }

  if (type === 'CANCEL_REMINDERS') {
    _reminderTids.forEach(clearTimeout);
    _reminderTids = [];
    return;
  }

  if (type === 'SHOW_REMINDER') {
    self.registration.showNotification('📚 Study Reminder — EliteScholars', {
      body:    event.data.body || "Don't break your streak! Time for today's practice session.",
      icon:    '/android-chrome-192x192.png',
      badge:   '/android-chrome-192x192.png',
      tag:     'study-reminder',
      renotify: true,
      vibrate: [200, 100, 200],
      data: { url: '/app', type: 'reminder' },
    });
    return;
  }

  if (type === 'SHOW_CHALLENGE') {
    const { challengerName, subject } = event.data;
    self.registration.showNotification('⚔️ New Challenge!', {
      body:    `${challengerName} challenged you to a ${subject} quiz! Can you beat their score?`,
      icon:    '/android-chrome-192x192.png',
      badge:   '/android-chrome-192x192.png',
      tag:     'challenge-' + challengerName,
      renotify: true,
      requireInteraction: true,
      vibrate: [300, 100, 300, 100, 300],
      data: { url: '/app', type: 'challenge', challengerName },
      actions: [
        { action: 'accept',  title: '⚔️ Accept Challenge' },
        { action: 'dismiss', title: 'Later' },
      ],
    });
  }
});

// The phone's push service sometimes replaces a subscription. Tell the open app so it can save the new one
// (the app also re-checks its subscription every time it starts).
self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => list.forEach((c) => c.postMessage({ type: 'PUSH_CHANGED' }))));
});
