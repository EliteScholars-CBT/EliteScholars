// Reminder tracking: what students do with our notifications (the server logs what we send).
export function trackNotif(type, extra) {
  try {
    fetch('/api/events/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, ...(extra || {}) }), keepalive: true }).catch(() => {});
  } catch { /* ignore */ }
}

// Call once when the app starts: logs "opened from a reminder" (from the ?np= link or from the open app being focused by a tap).
export function captureNotificationOpen() {
  try {
    const u = new URL(window.location.href);
    const kind = u.searchParams.get('np');
    if (kind) {
      trackNotif('push_open', { kind: kind.slice(0, 40) });
      u.searchParams.delete('np');
      window.history.replaceState({}, '', u.pathname + (u.search || '') + u.hash);
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'NOTIFICATION_CLICK') trackNotif('push_open', { kind: String((e.data.data && e.data.data.type) || 'general').slice(0, 40) });
      });
    }
  } catch { /* ignore */ }
}
