const SW_URL = '/sw.js';

export async function registerSW() {
  if (!('serviceWorker' in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register(SW_URL);
    return reg;
  } catch (err) {
    console.warn('[SW] Registration failed:', err);
    return null;
  }
}

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  const result = await Notification.requestPermission();
  return result;
}

async function sendSWMessage(data) {
  if (!('serviceWorker' in navigator)) return;
  const reg = await navigator.serviceWorker.ready;
  if (reg.active) reg.active.postMessage(data);
}

export async function showStudyReminder(msg) {
  if (Notification.permission !== 'granted') return;
  await sendSWMessage({
    type: 'SHOW_REMINDER',
    body: msg || "Time for today's practice! Don't break your streak 🔥",
  });
}

export async function showChallengeNotification({ challengerName, subject, examType }) {
  if (Notification.permission !== 'granted') return;
  await sendSWMessage({
    type: 'SHOW_CHALLENGE',
    challengerName,
    subject,
    examType,
  });
}

export async function scheduleDailyReminder(reminderTimes = [18], name = 'Scholar') {
  if (Notification.permission !== 'granted') return;
  const times = Array.isArray(reminderTimes) ? reminderTimes : [reminderTimes];
  await sendSWMessage({
    type: 'SCHEDULE_REMINDERS',
    times,
    name,
  });
  try { localStorage.setItem('es_reminder_times', JSON.stringify(times)); } catch {}
  try { localStorage.setItem('es_reminder_name', name); } catch {}
}

export function cancelDailyReminder() {
  sendSWMessage({ type: 'CANCEL_REMINDERS' });
  try { localStorage.removeItem('es_reminder_times'); } catch {}
}

export function listenForSWMessages(callback) {
  if (!('serviceWorker' in navigator)) return () => {};
  const handler = (event) => {
    if (event.data?.type === 'NOTIFICATION_CLICK') callback(event.data);
  };
  navigator.serviceWorker.addEventListener('message', handler);
  return () => navigator.serviceWorker.removeEventListener('message', handler);
}
