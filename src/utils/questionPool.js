// ============================================================================
// questionPool.js — ONE place that decides which questions a subject has.
// Used by Quiz.js (to build the 20-question round) and Subjects.js (to hide
// subjects with 0 questions and to show the same count the quiz really has).
// ============================================================================
import { QB } from '../data/jamb';
import { WAEC_SUBJECTS, WAEC_QB, WAEC_LEARN } from '../data/waec/index';
import { NECO_SUBJECTS, NECO_QB } from '../data/neco/index';
import { GST_SUBJECTS, GST_QB, GST_LEARN } from '../data/gst/index';
import { SUBJ } from '../data/subjects';

// Dedupe by question text (the questions have no `id` field).
const key = (x) => String(x.q).trim().toLowerCase();
// Only accept well-formed questions so one bad entry can't crash a quiz.
const valid = (x) =>
  x && x.q && Array.isArray(x.o) && x.o.length >= 2 && Number.isInteger(x.a) && x.a < x.o.length;
// Questions embedded inside the learn topics of a subject.
const topicQs = (learn, id) =>
  ((learn && learn[id]) || []).flatMap((t) => (Array.isArray(t.questions) ? t.questions : []));

const cache = {};

// Full, de-duplicated list of questions for one subject in one exam type.
export function getQuestionPool(examType, subjectId) {
  const ck = `${examType}:${subjectId}`;
  if (cache[ck]) return cache[ck];

  let sources;
  if (examType === 'gst') {
    sources = [GST_QB[subjectId] || [], topicQs(GST_LEARN, subjectId)];
  } else if (examType === 'waec') {
    // WAEC: own bank + its learn-topic questions + the shared JAMB bank.
    sources = [WAEC_QB[subjectId] || [], topicQs(WAEC_LEARN, subjectId), QB[subjectId] || []];
  } else if (examType === 'neco') {
    // NECO shares the WAEC learn topics and the JAMB bank.
    sources = [
      NECO_QB[subjectId] || [],
      WAEC_QB[subjectId] || [],
      topicQs(WAEC_LEARN, subjectId),
      QB[subjectId] || [],
    ];
  } else {
    // JAMB: its own bank, with WAEC as a safety net.
    sources = [QB[subjectId] || [], WAEC_QB[subjectId] || []];
  }

  const seen = new Set();
  const pool = [];
  sources.forEach((list) =>
    list.forEach((item) => {
      if (!valid(item)) return;
      const k = key(item);
      if (!seen.has(k)) {
        seen.add(k);
        pool.push(item);
      }
    })
  );
  cache[ck] = pool;
  return pool;
}

export const poolSize = (examType, subjectId) => getQuestionPool(examType, subjectId).length;

const subjectIds = (examType) => {
  if (examType === 'waec') return WAEC_SUBJECTS.map((s) => s.id);
  if (examType === 'neco') return NECO_SUBJECTS.map((s) => s.id);
  if (examType === 'gst') return GST_SUBJECTS.map((s) => s.id);
  return Object.keys(SUBJ); // jamb
};

let logged = false;
// Logs, for every exam type, the number of questions in every subject, and
// warns about the subjects that have 0 questions (they are hidden in CBT).
export function logQuestionSummary(force = false) {
  if (logged && !force) return;
  logged = true;
  ['jamb', 'waec', 'neco', 'gst'].forEach((exam) => {
    const rows = subjectIds(exam).map((id) => ({ subject: id, questions: poolSize(exam, id) }));
    const total = rows.reduce((n, r) => n + r.questions, 0);
    const hidden = rows.filter((r) => r.questions === 0).map((r) => r.subject);
    console.groupCollapsed(`[Questions] ${exam.toUpperCase()} — ${rows.length} subjects, ${total} questions`);
    console.table(rows);
    if (hidden.length) console.warn(`[Questions] ${exam.toUpperCase()} hidden (0 questions):`, hidden.join(', '));
    else console.log(`[Questions] ${exam.toUpperCase()}: no subjects hidden`);
    console.groupEnd();
  });
}
