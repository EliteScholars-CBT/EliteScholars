// Builds the flashcard deck for any subject of any exam.
// Curated cards (src/data/flashcards.js) come first; then cards made from the
// subject's lesson questions so WAEC / NECO / GST subjects have decks too.
import { FLASHCARDS } from '../data/flashcards';
import { JAMB_LEARN } from '../data/jamb';
import { WAEC_LEARN } from '../data/waec/learn/index';
import { NECO_LEARN } from '../data/neco/index';
import { GST_LEARN } from '../data/gst/index';

const LEARN = { jamb: JAMB_LEARN, waec: WAEC_LEARN, neco: NECO_LEARN, gst: GST_LEARN };
const cache = {};

const clip = (s, n) => { const t = String(s || '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1).trimEnd() + '…' : t; };

function fromLessons(subjectId, examType) {
  const bank = LEARN[examType] || WAEC_LEARN;
  const topics = (bank && bank[subjectId]) || [];
  const out = [];
  const seen = new Set();
  topics.forEach((t) => {
    (t.questions || []).forEach((q) => {
      if (!q || !Array.isArray(q.o) || typeof q.a !== 'number' || !q.o[q.a] || !q.q) return;
      const key = q.q.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      out.push({
        id: `L${out.length + 1}`,
        term: clip(q.q, 200),
        definition: clip(q.o[q.a], 200),
        example: q.e ? clip(q.e, 260) : '',
        tip: q.h ? clip(q.h, 160) : '',
        topic: t.topic || '',
      });
    });
  });
  return out;
}

// Spread evenly across topics so a deck is not all from the first chapter.
function sample(arr, n) {
  if (arr.length <= n) return arr;
  const step = arr.length / n;
  return Array.from({ length: n }, (_, i) => arr[Math.floor(i * step)]);
}

export function getDeck(subjectId, examType = 'jamb') {
  const key = `${examType}:${subjectId}`;
  if (cache[key]) return cache[key];
  const curated = (examType === 'jamb' || !LEARN[examType]) && FLASHCARDS[subjectId] ? FLASHCARDS[subjectId] : (FLASHCARDS[subjectId] || []);
  const lessons = sample(fromLessons(subjectId, examType), 60);
  // Curated cards are JAMB-syllabus; for other exams lead with lesson cards.
  const deck = examType === 'jamb' ? [...curated, ...lessons.slice(0, Math.max(0, 80 - curated.length))] : [...lessons, ...curated.slice(0, 20)];
  cache[key] = deck;
  return deck;
}
