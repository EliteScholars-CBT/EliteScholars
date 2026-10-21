import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { addXP } from '../utils/xpManager';
import { shuffle, rng, normalizeAnswer } from '../utils/gameEngine';
import { GK_BANK } from '../data/gkBank';
import { NUMBER_FACTS } from '../data/numberFacts';
import GameHud from './GameHud';
import Icon from './Icon';

// ============================================================================
// Five more quick games: True or False, Hangman, Higher or Lower, Odd One Out
// and Speed Maths. They share one round loop (lives, combo, timer) so they all
// feel the same and pay XP the same way as the original games.
// ============================================================================

export const MORE_GAME_TYPES = ['truefalse', 'hangman', 'highlow', 'oddone', 'speedmath'];

export const MORE_GAME_INFO = [
  { icon: '✅', name: 'True or False', desc: 'A clue and a word appear. Is it a match? Decide fast.' },
  { icon: '🔤', name: 'Hangman', desc: 'Guess the word one letter at a time before the mistakes run out.' },
  { icon: '📈', name: 'Higher or Lower', desc: 'Which number is bigger? Keep your streak alive.' },
  { icon: '🕵️', name: 'Odd One Out', desc: 'Three words belong together. Tap the one that does not.' },
  { icon: '🧮', name: 'Speed Maths', desc: 'Quick mental sums. Type the answer before the clock runs out.' },
];

const SECS = { easy: 1.4, medium: 1, hard: 0.75 };
const COUNT = { easy: 8, medium: 10, hard: 12 };

/* ── shared round loop ───────────────────────────────────────────────────── */
function useRoundLoop({ count, secs, pts = 15, tag, onEnd, email, name }) {
  const [s, setS] = useState({ idx: 0, lives: 3, score: 0, combo: 1, flash: null, timer: secs, done: false });
  const ref = useRef(s);
  ref.current = s;
  const lock = useRef(false);
  const ended = useRef(false);

  const resolve = useCallback((correct) => {
    if (lock.current || ref.current.done) return;
    lock.current = true;
    setS((c) => ({ ...c, flash: correct ? 'correct' : 'wrong', score: c.score + (correct ? pts * c.combo : 0), combo: correct ? Math.min(c.combo + 1, 5) : 1, lives: correct ? c.lives : c.lives - 1 }));
    setTimeout(() => {
      lock.current = false;
      setS((c) => (c.lives <= 0 || c.idx + 1 >= count ? { ...c, flash: null, done: true } : { ...c, flash: null, idx: c.idx + 1, timer: secs }));
    }, correct ? 550 : 850);
  }, [count, secs, pts]);

  useEffect(() => {
    if (s.done || s.flash) return undefined;
    const t = setInterval(() => setS((c) => (c.timer <= 0 ? c : { ...c, timer: c.timer - 1 })), 1000);
    return () => clearInterval(t);
  }, [s.done, s.flash, s.idx]);

  useEffect(() => { if (!s.done && !s.flash && s.timer <= 0) resolve(false); }, [s.timer, s.done, s.flash, resolve]);

  useEffect(() => {
    if (s.done && !ended.current) {
      ended.current = true;
      addXP(email, name, Math.round(s.score / 2), tag);
      onEnd(s.score, count);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.done]);

  return { ...s, resolve };
}

function Shell({ loop, secs, label, children, kind }) {
  return (
    <div className={`game-arena more-game ${kind} ${loop.flash || ''}`}>
      <GameHud score={loop.score} lives={loop.lives} timer={loop.timer} maxTimer={secs} combo={loop.combo} />
      <div className="game-story-bar"><span className="game-story-icon"><Icon name="zap" size={16} /></span><span className="game-story-text">{label}</span></div>
      {children}
    </div>
  );
}

const Counter = ({ i, n, extra }) => <div className="game-q-counter">{i + 1} / {n}{extra ? <span className="game-q-category">{extra}</span> : null}</div>;

/* ── True or False ───────────────────────────────────────────────────────── */
function buildTrueFalse(count, rand) {
  const bank = GK_BANK;
  return shuffle(bank, rand).slice(0, count).map((it) => {
    const truth = rand() < 0.5;
    let shown = it.term;
    if (!truth) {
      const others = bank.filter((o) => o.term !== it.term && o.category === it.category);
      const pool = others.length ? others : bank.filter((o) => o.term !== it.term);
      shown = pool[Math.floor(rand() * pool.length)].term;
    }
    return { clue: it.clue, shown, truth, category: it.category, answer: it.term };
  });
}

function TrueFalseGame({ cfg, onEnd, email, name }) {
  const loop = useRoundLoop({ count: cfg.deck.length, secs: cfg.secs, tag: 'game_truefalse', onEnd, email, name });
  const q = cfg.deck[loop.idx] || cfg.deck[0];
  const answer = (v) => { if (loop.flash) return; loop.resolve(v === q.truth); };
  return (
    <Shell loop={loop} secs={cfg.secs} label="Is the word the right answer for the clue?" kind="tf-game">
      <div className="game-question-card">
        <Counter i={loop.idx} n={cfg.deck.length} extra={q.category} />
        <div className="game-q-text">{q.clue}</div>
        <div className="gm2-big">{q.shown}</div>
      </div>
      <div className="gm2-two">
        <button className="gm2-btn yes" onClick={() => answer(true)}>✓ True</button>
        <button className="gm2-btn no" onClick={() => answer(false)}>✗ False</button>
      </div>
      {loop.flash === 'wrong' && <div className="gm2-reveal">{q.truth ? <>It was <b>True</b>.</> : <>It was <b>False</b> — the answer is <b>{q.answer}</b>.</>}</div>}
    </Shell>
  );
}

/* ── Hangman ─────────────────────────────────────────────────────────────── */
const KEYS = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
function HangmanGame({ cfg, onEnd, email, name }) {
  const loop = useRoundLoop({ count: cfg.deck.length, secs: cfg.secs, pts: 20, tag: 'game_hangman', onEnd, email, name });
  const item = cfg.deck[loop.idx] || cfg.deck[0];
  const word = normalizeAnswer(item.term);
  const [guessed, setGuessed] = useState([]);
  const wrong = guessed.filter((g) => !word.includes(g));
  const won = word.split('').every((c) => guessed.includes(c));
  const maxWrong = cfg.maxWrong;

  useEffect(() => { setGuessed([]); }, [loop.idx]);
  useEffect(() => { if (won && !loop.flash) loop.resolve(true); }, [won]); // eslint-disable-line
  useEffect(() => { if (wrong.length >= maxWrong && !loop.flash) loop.resolve(false); }, [wrong.length]); // eslint-disable-line

  const tap = (k) => { if (loop.flash || guessed.includes(k)) return; setGuessed((g) => [...g, k]); };
  const shown = item.term.toUpperCase().split('').map((ch) => (/[A-Z]/.test(ch) ? (guessed.includes(ch) || loop.flash === 'wrong' ? ch : '_') : ch));
  return (
    <Shell loop={loop} secs={cfg.secs} label={`Guess the word · ${maxWrong - wrong.length} mistake${maxWrong - wrong.length === 1 ? '' : 's'} left`} kind="hang-game">
      <div className="game-question-card">
        <Counter i={loop.idx} n={cfg.deck.length} extra={item.category} />
        <div className="game-q-text">{item.clue}</div>
      </div>
      <div className={`gm2-word ${loop.flash === 'wrong' ? 'lost' : ''}`}>{shown.map((c, i) => <span key={i} className={c === ' ' ? 'sp' : ''}>{c}</span>)}</div>
      <div className="gm2-lives">{Array.from({ length: maxWrong }).map((_, i) => <i key={i} className={i < wrong.length ? 'used' : ''} />)}</div>
      <div className="gm2-keys">
        {KEYS.map((k) => <button key={k} disabled={guessed.includes(k)} className={guessed.includes(k) ? (word.includes(k) ? 'hit' : 'miss') : ''} onClick={() => tap(k)}>{k}</button>)}
      </div>
    </Shell>
  );
}

/* ── Higher or Lower ─────────────────────────────────────────────────────── */
function buildHighLow(count, rand) {
  const facts = shuffle(NUMBER_FACTS, rand);
  const rounds = [];
  for (let i = 0; i < count; i++) {
    const a = facts[(i * 2) % facts.length], b = facts[(i * 2 + 1) % facts.length];
    if (a.v === b.v) { i--; facts.push(facts.shift()); continue; }
    rounds.push([a, b]);
  }
  return rounds;
}

function HighLowGame({ cfg, onEnd, email, name }) {
  const loop = useRoundLoop({ count: cfg.deck.length, secs: cfg.secs, tag: 'game_highlow', onEnd, email, name });
  const [a, b] = cfg.deck[loop.idx] || cfg.deck[0];
  const pick = (which) => { if (loop.flash) return; const big = a.v > b.v ? 0 : 1; loop.resolve(which === big); };
  const card = (f, i) => (
    <button key={i} className={`gm2-card ${loop.flash ? (f.v === Math.max(a.v, b.v) ? 'win' : 'lose') : ''}`} onClick={() => pick(i)}>
      <span>{f.q}</span>
      <b>{loop.flash ? f.v.toLocaleString('en-NG') : '?'}</b>
    </button>
  );
  return (
    <Shell loop={loop} secs={cfg.secs} label="Tap the one with the bigger number" kind="hl-game">
      <Counter i={loop.idx} n={cfg.deck.length} />
      <div className="gm2-cards">{card(a, 0)}<div className="gm2-vs">VS</div>{card(b, 1)}</div>
    </Shell>
  );
}

/* ── Odd One Out ─────────────────────────────────────────────────────────── */
function buildOdd(count, rand) {
  const cats = {};
  GK_BANK.forEach((it) => { (cats[it.category] ||= []).push(it); });
  const names = Object.keys(cats).filter((c) => cats[c].length >= 4);
  const rounds = [];
  for (let i = 0; i < count; i++) {
    const cat = names[Math.floor(rand() * names.length)];
    const rest = names.filter((n) => n !== cat);
    const oddCat = rest[Math.floor(rand() * rest.length)];
    const three = shuffle(cats[cat], rand).slice(0, 3).map((x) => x.term);
    const odd = shuffle(cats[oddCat], rand)[0].term;
    const opts = shuffle([...three, odd], rand);
    rounds.push({ opts, odd, cat, oddCat });
  }
  return rounds;
}

function OddOneGame({ cfg, onEnd, email, name }) {
  const loop = useRoundLoop({ count: cfg.deck.length, secs: cfg.secs, tag: 'game_oddone', onEnd, email, name });
  const q = cfg.deck[loop.idx] || cfg.deck[0];
  const [pickd, setPickd] = useState('');
  useEffect(() => { setPickd(''); }, [loop.idx]);
  const tap = (o) => { if (loop.flash) return; setPickd(o); loop.resolve(o === q.odd); };
  return (
    <Shell loop={loop} secs={cfg.secs} label="Three belong together. Which one does not?" kind="odd-game">
      <Counter i={loop.idx} n={cfg.deck.length} />
      <div className="gm2-grid">
        {q.opts.map((o) => <button key={o} className={`gm2-opt ${loop.flash && o === q.odd ? 'good' : ''} ${loop.flash === 'wrong' && o === pickd ? 'bad' : ''}`} onClick={() => tap(o)}>{o}</button>)}
      </div>
      {loop.flash && <div className="gm2-reveal"><b>{q.odd}</b> is {q.oddCat}; the others are {q.cat}.</div>}
    </Shell>
  );
}

/* ── Speed Maths ─────────────────────────────────────────────────────────── */
function buildMaths(count, difficulty, rand) {
  const R = (a, b) => a + Math.floor(rand() * (b - a + 1));
  const out = [];
  for (let i = 0; i < count; i++) {
    const hard = difficulty === 'hard', easy = difficulty === 'easy';
    const kind = R(0, hard ? 3 : 2);
    let text, ans;
    if (kind === 0) { const a = R(easy ? 5 : 12, easy ? 40 : hard ? 199 : 90), b = R(easy ? 3 : 8, easy ? 30 : hard ? 150 : 70); text = `${a} + ${b}`; ans = a + b; }
    else if (kind === 1) { const a = R(easy ? 20 : 40, easy ? 60 : hard ? 250 : 120), b = R(3, Math.min(a - 1, easy ? 30 : 90)); text = `${a} − ${b}`; ans = a - b; }
    else if (kind === 2) { const a = R(2, easy ? 9 : hard ? 15 : 12), b = R(2, easy ? 9 : hard ? 14 : 12); text = `${a} × ${b}`; ans = a * b; }
    else { const b = R(3, 12), q = R(3, 15); text = `${b * q} ÷ ${b}`; ans = q; }
    out.push({ text, ans });
  }
  return out;
}

function SpeedMathGame({ cfg, onEnd, email, name }) {
  const loop = useRoundLoop({ count: cfg.deck.length, secs: cfg.secs, pts: 15, tag: 'game_speedmath', onEnd, email, name });
  const q = cfg.deck[loop.idx] || cfg.deck[0];
  const [val, setVal] = useState('');
  useEffect(() => { setVal(''); }, [loop.idx]);
  const press = (k) => {
    if (loop.flash) return;
    if (k === 'del') { setVal((v) => v.slice(0, -1)); return; }
    if (k === 'go') { if (val) loop.resolve(Number(val) === q.ans); return; }
    const next = (val + k).slice(0, 5);
    setVal(next);
    if (next.length >= String(q.ans).length && Number(next) === q.ans) loop.resolve(true);
  };
  return (
    <Shell loop={loop} secs={cfg.secs} label="Work it out and type the answer" kind="math-game">
      <div className="game-question-card">
        <Counter i={loop.idx} n={cfg.deck.length} />
        <div className="gm2-sum">{q.text} = <span className={loop.flash === 'wrong' ? 'bad' : ''}>{loop.flash === 'wrong' ? q.ans : (val || '?')}</span></div>
      </div>
      <div className="gm2-pad">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'go'].map((k) => (
          <button key={k} className={k === 'go' ? 'go' : k === 'del' ? 'del' : ''} onClick={() => press(k)}>{k === 'del' ? '⌫' : k === 'go' ? 'OK' : k}</button>
        ))}
      </div>
    </Shell>
  );
}

/* ── public API ──────────────────────────────────────────────────────────── */
export function buildMoreGame(type, difficulty, seed) {
  const rand = rng(seed);
  const count = COUNT[difficulty] || 10;
  const mult = SECS[difficulty] || 1;
  if (type === 'truefalse') return { deck: buildTrueFalse(count, rand), secs: Math.round(9 * mult) };
  if (type === 'hangman') {
    const words = GK_BANK.filter((w) => /^[A-Za-z ]{4,11}$/.test(w.term));
    return { deck: shuffle(words, rand).slice(0, Math.max(5, count - 3)), secs: Math.round(45 * mult), maxWrong: difficulty === 'hard' ? 5 : difficulty === 'easy' ? 8 : 6 };
  }
  if (type === 'highlow') return { deck: buildHighLow(count, rand), secs: Math.round(10 * mult) };
  if (type === 'oddone') return { deck: buildOdd(count, rand), secs: Math.round(11 * mult) };
  return { deck: buildMaths(count + 2, difficulty, rand), secs: Math.round(11 * mult) };
}

export function MoreGames({ type, cfg, onEnd, email, name }) {
  const props = { cfg, onEnd, email, name };
  const key = useMemo(() => `${type}-${cfg.deck.length}`, [type, cfg]);
  if (type === 'truefalse') return <TrueFalseGame key={key} {...props} />;
  if (type === 'hangman') return <HangmanGame key={key} {...props} />;
  if (type === 'highlow') return <HighLowGame key={key} {...props} />;
  if (type === 'oddone') return <OddOneGame key={key} {...props} />;
  return <SpeedMathGame key={key} {...props} />;
}

