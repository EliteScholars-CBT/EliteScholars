// ============================================================================
// syncQueue.js — offline-first sync for fire-and-forget network calls.
//
// Several places in the app (XP sync, squad pings, analytics) fire a
// best-effort POST and silently swallow failures. That's fine on a flaky
// connection, but on a genuinely OFFLINE device it means the action is lost
// forever the moment the tab closes. This queue fixes that: a failed send
// gets stored locally and retried automatically the next time the device
// comes back online, so nothing earned offline is lost — it just syncs late.
// ============================================================================

const QUEUE_KEY = 'es_sync_queue_v1';
const MAX_QUEUED = 300; // keep the queue from growing unbounded on a long offline stretch

function loadQueue() {
  try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); } catch { return []; }
}
function saveQueue(q) {
  try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-MAX_QUEUED))); } catch { /* ignore */ }
}

export function queueLength() {
  return loadQueue().length;
}

// Queues a POST for retry. `contentType` defaults to text/plain — see the
// long comment in challengeApi.js for why that matters against Apps Script.
export function enqueueSync({ url, payload, contentType = 'text/plain;charset=utf-8' }) {
  const q = loadQueue();
  q.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, ts: Date.now(), url, payload, contentType });
  saveQueue(q);
}

let flushing = false;

export async function flushSyncQueue() {
  if (flushing || !navigator.onLine) return;
  const q = loadQueue();
  if (!q.length) return;
  flushing = true;
  const remaining = [];
  for (const item of q) {
    try {
      await fetch(item.url, {
        method: 'POST',
        headers: { 'Content-Type': item.contentType },
        body: JSON.stringify(item.payload),
      });
    } catch {
      remaining.push(item); // still offline (or the request genuinely failed) — keep it queued
    }
  }
  saveQueue(remaining);
  flushing = false;
}

let initialized = false;

// Call once, near app startup. Safe to call multiple times.
export function initSyncQueue() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  window.addEventListener('online', flushSyncQueue);
  flushSyncQueue(); // in case there's already a backlog and we're already online
}
