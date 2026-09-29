const CACHE_NAME  = 'elitescholars-v3';
const STATIC_ASSETS = ['/', '/index.html', '/manifest.json'];

let _reminderTids = [];
let _reminderName = 'Scholar';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
        return res;
      })
      .catch(() => caches.match(event.request))
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
    data: { url: data.url || '/', type: data.type || 'general', challengerName: data.challengerName || '' },
    actions: data.actions || [],
    vibrate: [200, 100, 200],
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'EliteScholars CBT', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';
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
    data: { url: '/', type: 'reminder' },
  });
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
      data: { url: '/', type: 'reminder' },
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
      data: { url: '/', type: 'challenge', challengerName },
      actions: [
        { action: 'accept',  title: '⚔️ Accept Challenge' },
        { action: 'dismiss', title: 'Later' },
      ],
    });
  }
});
