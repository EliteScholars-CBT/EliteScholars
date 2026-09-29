// ============================================================================
// studyAnalytics.js — Study session tracking
// Tracks who studies, what subject/exam/topic, for how long, and when
// ============================================================================

import { SHEETS_URL } from '../utils/constants';

const KEY_SESSION  = (email) => `es_study_session_${email}`;
const KEY_QUEUE    = 'es_study_queue';
const MAX_QUEUED   = 8; // flush sooner than before

function readQueue()   { try { return JSON.parse(localStorage.getItem(KEY_QUEUE) || '[]'); } catch { return []; } }
function writeQueue(q) { try { localStorage.setItem(KEY_QUEUE, JSON.stringify(q.slice(-MAX_QUEUED * 5))); } catch {} }

let flushInFlight = false;

async function flushToServer(events) {
  if (!events.length || flushInFlight) return false;
  flushInFlight = true;

  const payload = JSON.stringify({ action: 'studyEvents', events });

  try {
    // sendBeacon works during page unload and doesn't block
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      const ok = navigator.sendBeacon(SHEETS_URL, blob);
      flushInFlight = false;
      return ok;
    }

    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    });
    flushInFlight = false;
    return true;
  } catch {
    flushInFlight = false;
    return false;
  }
}

function enqueue(event, flushImmediately = false) {
  const q = [...readQueue(), event];
  writeQueue(q);

  if (flushImmediately || q.length >= MAX_QUEUED) {
    // Fire and forget — but only clear queue on confirmed success
    flushToServer(q).then((ok) => { if (ok) writeQueue([]); });
  }
}

// ── Session management ────────────────────────────────────────────────────────

export function startStudySession({ email, name, examType, subjectId, subjectLabel, topicName }) {
  if (!email) return;
  const session = {
    email, name, examType, subjectId, subjectLabel, topicName,
    startTime: Date.now(),
    startIso:  new Date().toISOString(),
    date:      new Date().toDateString(),
    hour:      new Date().getHours(),
  };
  try { localStorage.setItem(KEY_SESSION(email), JSON.stringify(session)); } catch {}
  return session;
}

export function endStudySession(email) {
  if (!email) return 0;
  try {
    const raw = localStorage.getItem(KEY_SESSION(email));
    if (!raw) return 0;
    const session = JSON.parse(raw);
    const durationMs  = Date.now() - (session.startTime || Date.now());
    const durationSec = Math.round(durationMs / 1000);
    const durationMin = Math.round(durationSec / 60 * 10) / 10;

    enqueue({
      type:         'study_session',
      timestamp:    new Date().toISOString(),
      email:        session.email,
      name:         session.name,
      examType:     session.examType,
      subjectId:    session.subjectId,
      subjectLabel: session.subjectLabel,
      topicName:    session.topicName,
      startIso:     session.startIso,
      endIso:       new Date().toISOString(),
      durationSec,
      durationMin,
      date:         session.date,
      hourOfDay:    session.hour,
    });

    localStorage.removeItem(KEY_SESSION(email));
    return durationSec;
  } catch { return 0; }
}

export function trackTopicOpened({ email, name, examType, subjectId, topicName, topicIndex }) {
  enqueue({
    type: 'topic_opened',
    timestamp: new Date().toISOString(),
    email, name, examType, subjectId, topicName, topicIndex,
    hourOfDay: new Date().getHours(),
  });
}

export function trackLearnQuizComplete({ email, name, examType, subjectId, topicName, score, total }) {
  enqueue({
    type: 'learn_quiz_complete',
    timestamp: new Date().toISOString(),
    email, name, examType, subjectId, topicName, score, total,
    pct: total > 0 ? Math.round((score / total) * 100) : 0,
  });
}

// Topic complete — flush immediately so it reaches Google Sheets right away
export function trackTopicComplete({ email, name, examType, subjectId, topicName, topicIndex }) {
  enqueue(
    {
      type: 'topic_completed',
      timestamp: new Date().toISOString(),
      email, name, examType, subjectId, topicName, topicIndex,
    },
    true // flushImmediately — don't wait for queue to fill
  );
}

// Flush remaining events — call on page unload / visibilitychange / periodically
export function flushStudyAnalytics() {
  const q = readQueue();
  if (!q.length) return;
  flushToServer(q).then((ok) => { if (ok) writeQueue([]); });
}