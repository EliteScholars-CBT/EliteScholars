// ============================================================================
// gameEngine.js — pure logic for non-quiz mini-games (no multiple choice).
// Used by GameMode (built-in subjects) and FileStudy (uploaded files).
// Kept dependency-free and framework-free so it's easy to unit-test.
// ============================================================================

export function rng(seed) {
  let a = seed >>> 0 || 1;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle(arr, rand = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── Word Scramble ───────────────────────────────────────────────────────── */

// A term is worth scrambling if it's short, alphabetic-ish, and not a whole
// sentence — single words or a couple of short words at most.
export function isScramblable(term) {
  if (!term) return false;
  const t = String(term).trim();
  if (!t || t.length > 16) return false;
  if (!/^[A-Za-z][A-Za-z .'-]*[A-Za-z.]$|^[A-Za-z]$/.test(t)) return false;
  const words = t.split(/\s+/);
  if (words.length > 2) return false;
  if (words.some((w) => w.replace(/[^A-Za-z]/g, '').length < 2)) return false;
  if (t.replace(/[^A-Za-z]/g, '').length < 3) return false;
  return true;
}

// Shuffles the letters of each word independently (spaces stay put), and
// guarantees the result differs from the original whenever that's possible.
export function scrambleWord(word, rand = Math.random) {
  const letters = word.split('');
  if (letters.length < 2) return letters;
  let out = letters;
  for (let tries = 0; tries < 8; tries++) {
    out = shuffle(letters, rand);
    if (out.join('') !== word) break;
  }
  return out;
}

// Returns { tiles, groups } — tiles is a flat, shuffled array of
// { id, ch, wordIdx }; groups is the word boundaries (letters per word) so
// the UI can render "_ _ _  _ _" with a visible gap between words.
export function buildScramble(term, rand = Math.random) {
  const words = term.trim().split(/\s+/);
  let tileId = 0;
  const tiles = [];
  words.forEach((w, wi) => {
    scrambleWord(w.toUpperCase(), rand).forEach((ch) => {
      tiles.push({ id: `t${tileId++}`, ch, wordIdx: wi });
    });
  });
  return { tiles: shuffle(tiles, rand), groups: words.map((w) => w.length) };
}

export const normalizeAnswer = (s) => s.toUpperCase().replace(/[^A-Z]/g, '');

// Builds a scramble deck from generic { term, clue } pairs (caller maps its
// own data — quiz answers, glossary terms, flashcard fronts — into this
// shape). Filters out anything too long/sentence-like to fairly scramble.
export function buildScrambleDeck(pairs, limit = 12, rand = Math.random) {
  const seen = new Set();
  const pool = pairs.filter((p) => {
    if (!isScramblable(p.term)) return false;
    const key = normalizeAnswer(p.term);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return shuffle(pool, rand).slice(0, limit);
}

/* ── Picture Round (image + first letter revealed) ─────────────────────── */

// A term qualifies for a picture round if it's a single plain word of a
// guessable length — the picture and first letter are the only hints.
export function isPicturable(term) {
  return /^[A-Za-z]{4,11}$/.test(String(term || '').trim());
}

export function buildPictureDeck(items, limit = 10, rand = Math.random) {
  const seen = new Set();
  const pool = items.filter((it) => {
    if (!it.emoji || !isPicturable(it.term)) return false;
    const key = it.term.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return shuffle(pool, rand).slice(0, limit);
}

// First letter is pre-revealed and removed from the tile pool; the rest of
// the word's letters come back scrambled so the picture + first letter are
// the only hints, same tap-to-spell interaction as buildScramble.
export function buildPictureRound(term, rand = Math.random) {
  const upper = term.toUpperCase();
  const rest = upper.slice(1).split('');
  let shuffled_ = rest;
  for (let tries = 0; tries < 8; tries++) {
    shuffled_ = shuffle(rest, rand);
    if (shuffled_.join('') !== rest.join('') || rest.length < 2) break;
  }
  return {
    first: upper[0],
    tiles: shuffled_.map((ch, i) => ({ id: `p${i}`, ch })),
    length: upper.length,
  };
}

/* ── Colour Memory (Simon-style sequence recall) ────────────────────────── */

export const SIMON_COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

export function generateSequence(length, rand = Math.random, palette = SIMON_COLORS) {
  const seq = [];
  for (let i = 0; i < length; i++) seq.push(palette[Math.floor(rand() * palette.length)]);
  return seq;
}

/* ── Word Slice (decoy picking) & Sort Rush (category picking) ─────────── */

// Picks n other bank items as decoys for a "slice the right word" round —
// avoids repeats and prefers a mix of lengths so decoys aren't a giveaway.
export function pickDecoys(bank, correct, n, rand = Math.random) {
  const pool = bank.filter((it) => it.term.toLowerCase() !== correct.term.toLowerCase());
  return shuffle(pool, rand).slice(0, n);
}

// Returns the n most-populated categories in a bank — used so a sorting
// game always has enough items per bucket to be fair and solvable.
export function topCategories(bank, n = 3) {
  const counts = new Map();
  bank.forEach((it) => { if (it.category) counts.set(it.category, (counts.get(it.category) || 0) + 1); });
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([c]) => c);
}

export function itemsInCategories(bank, categories, rand = Math.random) {
  return shuffle(bank.filter((it) => categories.includes(it.category)), rand);
}

// Precomputes every round of a Word Slice game: one correct term + a couple
// of decoys per round, shuffled into a fixed lane order (3 bubbles/round).
export function buildSliceDeck(bank, count = 8, decoysPerRound = 2, rand = Math.random) {
  const rounds = shuffle(bank, rand).slice(0, count);
  return rounds.map((r, ri) => {
    const decoys = pickDecoys(bank, r, decoysPerRound, rand);
    const bubbles = shuffle(
      [{ text: r.term, correct: true }, ...decoys.map((d) => ({ text: d.term, correct: false }))],
      rand
    ).map((b, i) => ({ id: `s${ri}-${i}`, ...b, lane: i }));
    return { term: r.term, clue: r.clue, category: r.category, bubbles };
  });
}

/* ── Match pairs (memory grid) ───────────────────────────────────────────── */

const trimTxt = (s, max) => {
  const str = String(s ?? '');
  return str.length > max ? str.slice(0, max - 1).trimEnd() + '…' : str;
};

// Builds a shuffled memory-grid deck from generic { a, b } pairs (question/
// answer, term/definition — caller's choice). Two cards per pair: { id,
// text, pairId, side }.
export function buildMatchDeck(pairs, count = 6, rand = Math.random) {
  const usable = pairs.filter((p) => p.a != null && p.b != null && String(p.a).trim() && String(p.b).trim());
  const picked = shuffle(usable, rand).slice(0, count);
  const cards = [];
  picked.forEach((p, i) => {
    cards.push({ id: `a${i}`, text: trimTxt(p.a, 60), pairId: i, side: 'a' });
    cards.push({ id: `b${i}`, text: trimTxt(p.b, 60), pairId: i, side: 'b' });
  });
  return shuffle(cards, rand);
}
