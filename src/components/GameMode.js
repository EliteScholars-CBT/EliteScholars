import { reserve } from '../utils/entitlement';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { addXP } from '../utils/xpManager';
import { GOLD } from '../utils/colors';
import Icon, { EmojiIcon } from './Icon';
import { buildScramble, buildScrambleDeck, normalizeAnswer, buildMatchDeck, buildPictureDeck, buildPictureRound, generateSequence, SIMON_COLORS, topCategories, itemsInCategories, buildSliceDeck, shuffle, rng } from '../utils/gameEngine';
import GameHud from './GameHud';
import { bankFor } from '../data/gkBank';
import { MoreGames, MORE_GAME_TYPES, MORE_GAME_INFO, buildMoreGame } from './GameMore';
import '../styles/gamemode.css';

// ============================================================================
// GameMode — quick-play practice, deliberately NOT multiple-choice. CBT already
// covers "read a question, pick an option"; these two games test recall
// (Word Scramble) and pairing (Memory Match) instead.
// ============================================================================


/* ── Word Scramble ───────────────────────────────────────────────────────── */

function ScrambleGame({ deck, onEnd, email, name }) {
  const [idx, setIdx]     = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [timer, setTimer] = useState(20);
  const [flash, setFlash] = useState(null);
  const [picked, setPicked] = useState([]);   // tile ids chosen, in order
  const [pool, setPool]   = useState(() => buildScramble(deck[0].term, Math.random).tiles);
  const [done, setDone]   = useState(false);
  const timerRef = useRef(null);
  const MAX_TIMER = 20;
  const item = deck[idx];

  useEffect(() => {
    setPool(buildScramble(item.term, Math.random).tiles);
    setPicked([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const advance = useCallback((correct) => {
    clearInterval(timerRef.current);
    if (correct) {
      const pts = 15 * combo;
      setScore((s) => s + pts);
      setCombo((c) => Math.min(c + 1, 5));
      setFlash('correct');
    } else {
      setLives((l) => {
        const nl = l - 1;
        if (nl <= 0) setTimeout(() => setDone(true), 500);
        return nl;
      });
      setCombo(1);
      setFlash('wrong');
    }
    setTimeout(() => {
      setFlash(null);
      if (idx + 1 >= deck.length) { setDone(true); return; }
      setIdx((i) => i + 1);
      setTimer(MAX_TIMER);
    }, correct ? 550 : 750);
  }, [combo, idx, deck.length]);

  const tapTile = (tile) => {
    if (flash) return;
    const next = [...picked, tile.id];
    setPicked(next);
    const guess = next.map((id) => pool.find((t) => t.id === id).ch).join('');
    if (guess.length === pool.length) {
      const ok = normalizeAnswer(guess) === normalizeAnswer(item.term);
      advance(ok);
    }
  };
  const undo = () => setPicked((p) => p.slice(0, -1));

  useEffect(() => {
    if (done) return undefined;
    setTimer(MAX_TIMER);
    timerRef.current = setInterval(() => {
      setTimer((t) => { if (t <= 1) { advance(false); return MAX_TIMER; } return t - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, done]);

  useEffect(() => {
    if (done) {
      addXP(email, name, Math.round(score / 2), 'game_scramble');
      onEnd(score, deck.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (done) return null;

  let li = 0;
  return (
    <div className={`game-arena scramble-game ${flash || ''}`}>
      <GameHud score={score} lives={lives} timer={timer} maxTimer={MAX_TIMER} combo={combo} />
      <div className="game-story-bar">
        <span className="game-story-icon"><Icon name="wand" size={16} /></span>
        <span className="game-story-text">Unscramble the word from the clue below</span>
      </div>
      <div className="game-question-card">
        <div className="game-q-counter">
          {idx + 1} / {deck.length}
          {item.category && <span className="game-q-category">{item.category}</span>}
        </div>
        <div className="game-q-text">{item.clue}</div>
      </div>

      <div className="scramble-slots">
        {item.term.trim().split(/\s+/).map((w, wi) => (
          <div className="scramble-word-slots" key={wi}>
            {w.split('').map((_, k) => {
              const pos = li++;
              const id = picked[pos];
              const t = id && pool.find((x) => x.id === id);
              return <span key={k} className={`scramble-slot ${t ? 'filled' : ''}`}>{t ? t.ch : ''}</span>;
            })}
          </div>
        ))}
      </div>

      <div className="scramble-tiles">
        {pool.map((t) => (
          <button
            key={t.id}
            className={`scramble-tile ${picked.includes(t.id) ? 'used' : ''}`}
            disabled={picked.includes(t.id) || !!flash}
            onClick={() => tapTile(t)}
          >
            {t.ch}
          </button>
        ))}
      </div>
      <button className="scramble-undo" onClick={undo} disabled={!picked.length || !!flash}>
        <Icon name="arrowLeft" size={14} /> Undo letter
      </button>
    </div>
  );
}

/* ── Memory Match ────────────────────────────────────────────────────────── */

function MemoryGame({ deck, onEnd, email, name }) {
  const PAIRS = deck.length / 2;
  const [cards, setCards]     = useState(deck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore]     = useState(0);
  const [moves, setMoves]     = useState(0);
  const [done, setDone]       = useState(false);
  const [flash, setFlash]     = useState(null);
  const lockRef = useRef(false);

  const flip = (card) => {
    if (lockRef.current) return;
    if (flipped.length === 1 && flipped[0].id === card.id) return;
    if (matched.includes(card.pairId)) return;
    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      lockRef.current = true;
      const [a, b] = newFlipped;
      if (a.pairId === b.pairId && a.side !== b.side) {
        setMatched((m) => { const nm = [...m, a.pairId]; if (nm.length === PAIRS) setTimeout(() => setDone(true), 600); return nm; });
        setScore((s) => s + 20);
        setFlash('correct');
        setTimeout(() => { setFlipped([]); setFlash(null); lockRef.current = false; }, 700);
      } else {
        setFlash('wrong');
        setTimeout(() => { setFlipped([]); setFlash(null); lockRef.current = false; }, 900);
      }
    }
  };

  useEffect(() => {
    if (done) {
      const bonus = Math.max(0, 60 - moves * 2);
      const total = score + bonus;
      addXP(email, name, Math.round(total / 2), 'game_memory');
      onEnd(total, PAIRS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (done) return null;

  return (
    <div className={`game-arena memory-game ${flash || ''}`}>
      <div className="game-hud">
        <div className="game-hud-lives"><span style={{ fontSize: 13, color: GOLD }}>Pairs: {matched.length}/{PAIRS}</span></div>
        <div className="game-hud-center"><span style={{ fontSize: 12, color: '#9CA3AF' }}>Moves: {moves}</span></div>
        <div className="game-hud-score"><span className="game-score-num">{score}</span></div>
      </div>
      <div className="game-story-bar">
        <span className="game-story-icon"><EmojiIcon emoji="🧠" size="1.1em" /></span>
        <span className="game-story-text">Match each clue with its correct answer</span>
      </div>
      <div className="memory-grid">
        {cards.map((card) => {
          const isFlipped = flipped.find((f) => f.id === card.id) || matched.includes(card.pairId);
          return (
            <button key={card.id} className={`memory-card ${isFlipped ? 'flipped' : ''} ${matched.includes(card.pairId) ? 'matched' : ''}`} onClick={() => flip(card)}>
              <div className="memory-card-inner">
                <div className="memory-card-back">?</div>
                <div className={`memory-card-front ${card.side === 'a' ? 'question' : 'answer'}`}>{card.text}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Picture Round: picture + first letter revealed, unscramble the rest ── */

function PictureRoundGame({ deck, onEnd, email, name }) {
  const [idx, setIdx]     = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [timer, setTimer] = useState(18);
  const [flash, setFlash] = useState(null);
  const [picked, setPicked] = useState([]);
  const [round, setRound] = useState(() => buildPictureRound(deck[0].term, Math.random));
  const [done, setDone]   = useState(false);
  const timerRef = useRef(null);
  const MAX_TIMER = 18;
  const item = deck[idx];

  useEffect(() => {
    setRound(buildPictureRound(item.term, Math.random));
    setPicked([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const advance = useCallback((correct) => {
    clearInterval(timerRef.current);
    if (correct) {
      setScore((s) => s + 18 * combo);
      setCombo((c) => Math.min(c + 1, 5));
      setFlash('correct');
    } else {
      setLives((l) => { const nl = l - 1; if (nl <= 0) setTimeout(() => setDone(true), 500); return nl; });
      setCombo(1);
      setFlash('wrong');
    }
    setTimeout(() => {
      setFlash(null);
      if (idx + 1 >= deck.length) { setDone(true); return; }
      setIdx((i) => i + 1);
      setTimer(MAX_TIMER);
    }, correct ? 550 : 750);
  }, [combo, idx, deck.length]);

  const tapTile = (tile) => {
    if (flash) return;
    const next = [...picked, tile.id];
    setPicked(next);
    if (next.length === round.tiles.length) {
      const rest = next.map((id) => round.tiles.find((t) => t.id === id).ch).join('');
      advance(normalizeAnswer(round.first + rest) === normalizeAnswer(item.term));
    }
  };
  const undo = () => setPicked((p) => p.slice(0, -1));

  useEffect(() => {
    if (done) return undefined;
    setTimer(MAX_TIMER);
    timerRef.current = setInterval(() => {
      setTimer((t) => { if (t <= 1) { advance(false); return MAX_TIMER; } return t - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, done]);

  useEffect(() => {
    if (done) { addXP(email, name, Math.round(score / 2), 'game_picture'); onEnd(score, deck.length); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (done) return null;

  return (
    <div className={`game-arena picture-game ${flash || ''}`}>
      <GameHud score={score} lives={lives} timer={timer} maxTimer={MAX_TIMER} combo={combo} />
      <div className="game-story-bar">
        <span className="game-story-icon"><Icon name="image" size={16} /></span>
        <span className="game-story-text">Picture round — first letter's free, guess the rest</span>
      </div>
      <div className="picture-round-card">
        <div className="picture-round-counter">{idx + 1} / {deck.length}</div>
        <div className="picture-round-emoji">{item.emoji}</div>
        {item.category && <span className="game-q-category">{item.category}</span>}
      </div>

      <div className="scramble-slots">
        <span className="scramble-slot filled first-letter">{round.first}</span>
        {round.tiles.map((_, k) => {
          const id = picked[k];
          const t = id && round.tiles.find((x) => x.id === id);
          return <span key={k} className={`scramble-slot ${t ? 'filled' : ''}`}>{t ? t.ch : ''}</span>;
        })}
      </div>

      <div className="scramble-tiles">
        {round.tiles.map((t) => (
          <button
            key={t.id}
            className={`scramble-tile ${picked.includes(t.id) ? 'used' : ''}`}
            disabled={picked.includes(t.id) || !!flash}
            onClick={() => tapTile(t)}
          >
            {t.ch}
          </button>
        ))}
      </div>
      <button className="scramble-undo" onClick={undo} disabled={!picked.length || !!flash}>
        <Icon name="arrowLeft" size={14} /> Undo letter
      </button>
    </div>
  );
}

/* ── Colour Memory: watch the sequence light up, repeat it back in order ── */

const COLOR_HEX = { red: '#EF4444', blue: '#3B82F6', green: '#22C55E', yellow: '#EAB308', purple: '#A855F7', orange: '#F97316' };

function ColourMemoryGame({ targetRounds, startLen, onEnd, email, name }) {
  const [round, setRound]   = useState(1);
  const [sequence, setSeq]  = useState(() => generateSequence(startLen, Math.random));
  const [active, setActive] = useState(-1);
  const [phase, setPhase]   = useState('showing'); // showing | input | done
  const [input, setInput]   = useState([]);
  const [lives, setLives]   = useState(3);
  const [score, setScore]   = useState(0);
  const [flash, setFlash]   = useState(null);
  const [over, setOver]     = useState(false);
  const timers = useRef([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const playback = useCallback((seq) => {
    clearTimers();
    setPhase('showing');
    setActive(-1);
    seq.forEach((_, i) => {
      timers.current.push(setTimeout(() => setActive(i), 300 + i * 650));
      timers.current.push(setTimeout(() => setActive(-1), 300 + i * 650 + 420));
    });
    timers.current.push(setTimeout(() => { setPhase('input'); setInput([]); }, 300 + seq.length * 650));
  }, []);

  useEffect(() => { playback(sequence); return clearTimers; }, [sequence]); // eslint-disable-line

  useEffect(() => () => clearTimers(), []);

  const tapColor = (color) => {
    if (phase !== 'input') return;
    const pos = input.length;
    if (sequence[pos] === color) {
      const next = [...input, color];
      setInput(next);
      if (next.length === sequence.length) {
        const pts = round * 35;
        setScore((s) => s + pts);
        setFlash('correct');
        if (round >= targetRounds) {
          setTimeout(() => setOver(true), 500);
        } else {
          setTimeout(() => {
            setFlash(null);
            const nextSeq = generateSequence(startLen + round, Math.random);
            setRound((r) => r + 1);
            setSeq(nextSeq);
          }, 600);
        }
      }
    } else {
      setFlash('wrong');
      const nl = lives - 1;
      setLives(nl);
      if (nl <= 0) {
        setTimeout(() => setOver(true), 500);
      } else {
        setTimeout(() => { setFlash(null); playback(sequence); }, 700);
      }
    }
  };

  useEffect(() => {
    if (over) { addXP(email, name, Math.round(score / 2), 'game_colour'); onEnd(score, targetRounds * 20); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [over]);

  if (over) return null;

  return (
    <div className={`game-arena colour-game ${flash || ''}`}>
      <div className="game-hud">
        <div className="game-hud-lives">{Array.from({ length: 3 }).map((_, i) => (
          <Icon key={i} name="heart" size={17} style={{ opacity: i < lives ? 1 : 0.2, color: '#EF4444' }} />
        ))}</div>
        <div className="game-hud-center"><span style={{ fontSize: 12, color: 'rgba(255,255,255,.7)' }}>Round {round} / {targetRounds}</span></div>
        <div className="game-hud-score"><span className="game-score-num">{score}</span></div>
      </div>
      <div className="game-story-bar">
        <span className="game-story-icon"><Icon name="palette" size={16} /></span>
        <span className="game-story-text">{phase === 'showing' ? 'Watch the sequence closely…' : 'Now tap them back in the same order'}</span>
      </div>

      <div className="colour-progress">
        {sequence.map((_, i) => <span key={i} className={`colour-dot ${i < input.length ? 'done' : ''}`} />)}
      </div>

      <div className="colour-grid">
        {SIMON_COLORS.map((c) => (
          <button
            key={c}
            className={`colour-tile ${active >= 0 && sequence[active] === c ? 'lit' : ''}`}
            style={{ '--tile-color': COLOR_HEX[c] }}
            disabled={phase !== 'input'}
            onClick={() => tapColor(c)}
            aria-label={c}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Word Slice: swipe or tap to slice the right word before it floats off ── */

function WordSliceGame({ deck, lifetime, onEnd, email, name }) {
  const [idx, setIdx]       = useState(0);
  const [lives, setLives]   = useState(3);
  const [score, setScore]   = useState(0);
  const [combo, setCombo]   = useState(1);
  const [flash, setFlash]   = useState(null);
  const [dead, setDead]     = useState([]);
  const [remainMs, setRemainMs] = useState(lifetime);
  const [over, setOver]     = useState(false);
  const draggingRef  = useRef(false);
  const resolvedRef  = useRef(false);
  const timerRef     = useRef(null);
  const tickRef      = useRef(null);
  const startedAtRef = useRef(0);
  const round = deck[idx];

  const nextRound = useCallback(() => {
    clearTimeout(timerRef.current);
    clearInterval(tickRef.current);
    if (idx + 1 >= deck.length) { setOver(true); return; }
    setIdx((i) => i + 1);
    setDead([]);
  }, [idx, deck.length]);

  useEffect(() => {
    if (over) return undefined;
    resolvedRef.current = false;
    startedAtRef.current = Date.now();
    setRemainMs(lifetime);
    timerRef.current = setTimeout(() => { if (!resolvedRef.current) nextRound(); }, lifetime);
    tickRef.current = setInterval(() => setRemainMs(Math.max(0, lifetime - (Date.now() - startedAtRef.current))), 100);
    return () => { clearTimeout(timerRef.current); clearInterval(tickRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const sliceBubble = (bubble) => {
    if (resolvedRef.current || dead.includes(bubble.id) || over) return;
    setDead((d) => [...d, bubble.id]);
    if (bubble.correct) {
      resolvedRef.current = true;
      clearTimeout(timerRef.current);
      clearInterval(tickRef.current);
      setScore((s) => s + 20 * combo);
      setCombo((c) => Math.min(c + 1, 5));
      setFlash('correct');
      setTimeout(() => { setFlash(null); nextRound(); }, 480);
    } else {
      setCombo(1);
      setFlash('wrong');
      setTimeout(() => setFlash(null), 320);
      const nl = lives - 1;
      setLives(nl);
      if (nl <= 0) { clearTimeout(timerRef.current); clearInterval(tickRef.current); setTimeout(() => setOver(true), 450); }
    }
  };

  const pointFromEvent = (e) => (e.touches && e.touches[0] ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY });
  const hitTest = (x, y) => {
    const el = document.elementFromPoint(x, y);
    const hit = el && el.closest && el.closest('[data-slice-id]');
    if (!hit) return;
    const bubble = round.bubbles.find((b) => b.id === hit.getAttribute('data-slice-id'));
    if (bubble) sliceBubble(bubble);
  };
  const onDown = (e) => { draggingRef.current = true; const p = pointFromEvent(e); hitTest(p.x, p.y); };
  const onMove = (e) => { if (!draggingRef.current) return; const p = pointFromEvent(e); hitTest(p.x, p.y); };
  const onUp = () => { draggingRef.current = false; };

  useEffect(() => {
    if (over) { addXP(email, name, Math.round(score / 2), 'game_slice'); onEnd(score, deck.length); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [over]);

  if (over) return null;
  const LANES = [18, 50, 82];

  return (
    <div className={`game-arena slice-game ${flash || ''}`}>
      <GameHud score={score} lives={lives} timer={remainMs / 1000} maxTimer={lifetime / 1000} combo={combo} />
      <div className="game-story-bar">
        <span className="game-story-icon"><Icon name="wand" size={16} /></span>
        <span className="game-story-text">Slice the word that answers the clue — swipe or tap</span>
      </div>
      <div className="game-question-card">
        <div className="game-q-counter">
          {idx + 1} / {deck.length}
          {round.category && <span className="game-q-category">{round.category}</span>}
        </div>
        <div className="game-q-text">{round.clue}</div>
      </div>

      <div
        className="slice-track"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onTouchStart={onDown}
        onTouchMove={onMove}
        onTouchEnd={onUp}
      >
        {round.bubbles.map((b) => (
          <div key={`${idx}-${b.id}`} className="slice-bubble-track" style={{ left: `${LANES[b.lane % LANES.length]}%`, animationDuration: `${lifetime}ms` }}>
            <div className={`slice-bubble ${dead.includes(b.id) ? 'dead' : ''}`} data-slice-id={b.id}>{b.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Sort Rush: drag each falling term into its matching category bucket ── */

const CATEGORY_ICON = {
  Sports: 'swords', Science: 'flask', Nature: 'leaf', Geography: 'globe',
  History: 'landmark', Entertainment: 'play', Nigeria: 'flag', Technology: 'laptop',
};

function SortRushGame({ items, categories, fallDuration, onEnd, email, name }) {
  const [idx, setIdx]     = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [flash, setFlash] = useState(null);
  const [grabbed, setGrabbed] = useState(false);
  const [pos, setPos]     = useState(null); // { x, y } while dragging (viewport coords)
  const [resolved, setResolved] = useState(false);
  const [over, setOver]   = useState(false);
  const bucketRefs = useRef([]);
  const resolvedRef = useRef(false);
  const item = items[idx];

  const advance = useCallback(() => {
    if (idx + 1 >= items.length) { setOver(true); return; }
    setIdx((i) => i + 1);
    setGrabbed(false);
    setPos(null);
    setResolved(false);
    resolvedRef.current = false;
  }, [idx, items.length]);

  const resolveDrop = (bucketIdx) => {
    if (resolvedRef.current) return;
    resolvedRef.current = true;
    setResolved(true);
    setGrabbed(false);
    if (bucketIdx === -1) {
      // dropped outside any bucket — neutral miss, no penalty
      setTimeout(advance, 420);
      return;
    }
    const correct = categories[bucketIdx] === item.category;
    if (correct) {
      setScore((s) => s + 25 * combo);
      setCombo((c) => Math.min(c + 1, 5));
      setFlash('correct');
    } else {
      setCombo(1);
      setFlash('wrong');
      const nl = lives - 1;
      setLives(nl);
      if (nl <= 0) { setTimeout(() => setOver(true), 500); setTimeout(() => setFlash(null), 400); return; }
    }
    setTimeout(() => { setFlash(null); advance(); }, 480);
  };

  const grab = (e) => {
    if (resolvedRef.current) return;
    e.preventDefault();
    const p = e.touches && e.touches[0] ? e.touches[0] : e;
    setGrabbed(true);
    setPos({ x: p.clientX, y: p.clientY });
  };
  const move = (e) => {
    if (!grabbed || resolvedRef.current) return;
    const p = e.touches && e.touches[0] ? e.touches[0] : e;
    setPos({ x: p.clientX, y: p.clientY });
  };
  const release = (e) => {
    if (!grabbed || resolvedRef.current) return;
    const p = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : e;
    const x = p.clientX, y = p.clientY;
    let hitIdx = -1;
    bucketRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) hitIdx = i;
    });
    resolveDrop(hitIdx);
  };

  const onFallEnd = () => { if (!resolvedRef.current) { resolvedRef.current = true; setResolved(true); setTimeout(advance, 60); } };

  useEffect(() => {
    if (over) { addXP(email, name, Math.round(score / 2), 'game_sort'); onEnd(score, items.length); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [over]);

  if (over) return null;

  return (
    <div className={`game-arena sort-game ${flash || ''}`}>
      <div className="game-hud">
        <div className="game-hud-lives">{Array.from({ length: 3 }).map((_, i) => (
          <Icon key={i} name="heart" size={17} style={{ opacity: i < lives ? 1 : 0.2, color: '#EF4444' }} />
        ))}</div>
        <div className="game-hud-center"><span style={{ fontSize: 12, color: 'rgba(255,255,255,.7)' }}>{idx + 1} / {items.length}</span></div>
        <div className="game-hud-score"><span className="game-score-num">{score}</span>{combo > 1 && <span className="game-combo">×{combo}</span>}</div>
      </div>
      <div className="game-story-bar">
        <span className="game-story-icon"><Icon name="layers" size={16} /></span>
        <span className="game-story-text">Drag each word into the category it belongs to</span>
      </div>

      <div className="sort-track">
        {!resolved && (
          <div
            key={idx}
            className={`sort-item ${grabbed ? 'grabbed' : 'falling'}`}
            style={grabbed && pos ? { left: pos.x, top: pos.y } : { animationDuration: `${fallDuration}ms` }}
            onAnimationEnd={onFallEnd}
            onPointerDown={grab}
            onPointerMove={move}
            onPointerUp={release}
            onTouchStart={grab}
            onTouchMove={move}
            onTouchEnd={release}
          >
            {item.term}
          </div>
        )}
      </div>

      <div className="sort-buckets">
        {categories.map((c, i) => (
          <div key={c} ref={(el) => { bucketRefs.current[i] = el; }} className="sort-bucket">
            <Icon name={CATEGORY_ICON[c] || 'star'} size={18} />
            <span>{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Menu / shell ────────────────────────────────────────────────────────── */

const GAME_TYPES = ['scramble', 'memory', 'picture', 'colormemory', 'slice', 'sort', ...MORE_GAME_TYPES];
const DIFFICULTIES = [
  { id: 'easy',   label: 'Easy',   icon: '😊', desc: 'More time, fewer terms' },
  { id: 'medium', label: 'Medium', icon: '😤', desc: 'Standard challenge' },
  { id: 'hard',   label: 'Hard',   icon: '🔥', desc: 'Less time, more terms, max XP' },
];

// Small built-in sampler so the games always have something to play even
// before real per-subject question-bank wiring lands. Each entry doubles as
// { term, clue } for Scramble and { a: clue, b: term } for Memory.
export default function GameMode(props) {
  const { onBack } = props;
  const [leaving, setLeaving] = useState(false);
  return (
    <div className="game-shell">
      <div className="game-topstrip">
        <button type="button" className="game-topback" onClick={() => setLeaving(true)} aria-label="Back"><Icon name="arrowLeft" size={18} /></button>
        <span className="game-toptitle">Game mode</span>
      </div>
      <GameModeInner {...props} />
      {leaving && (
        <div className="game-leave" role="dialog">
          <div className="game-leave-card"><b>Leave the game?</b><span>Your current round will be lost.</span>
            <div><button type="button" onClick={() => setLeaving(false)}>Keep playing</button><button type="button" className="out" onClick={onBack}>Leave</button></div></div>
        </div>
      )}
    </div>
  );
}

function GameModeInner({ onBack, email, name, onLimit }) {
  const [phase, setPhase]       = useState('menu');
  const [difficulty, setDiff]   = useState('medium');
  const [gameType, setGameType] = useState(null);
  const [deck, setDeck]         = useState([]);
  const [colourCfg, setColourCfg] = useState(null);
  const [sortCfg, setSortCfg]   = useState(null);
  const [sliceCfg, setSliceCfg] = useState(null);
  const [result, setResult]     = useState(null);

  const [starting, setStarting] = useState(false);
  const [moreCfg, setMoreCfg]   = useState(null);

  const startGame = async () => {
    if (starting) return;
    setStarting(true);
    let slot = { allowed: true };
    try { slot = await reserve(email, 'game', `game_${Date.now()}`); } catch { /* offline: let them play */ }
    setStarting(false);
    if (!slot.allowed) { if (onLimit) onLimit('games'); return; }
    const GK_BANK = bankFor(difficulty);
    const type = GAME_TYPES[Math.floor(Math.random() * GAME_TYPES.length)];
    setGameType(type);
    const count = difficulty === 'easy' ? 6 : difficulty === 'hard' ? 10 : 8;
    const seed = Date.now() & 0xffffffff;
    if (type === 'scramble') {
      setDeck(buildScrambleDeck(GK_BANK, count, rng(seed)));
    } else if (type === 'memory') {
      setDeck(buildMatchDeck(GK_BANK.map((s) => ({ a: s.clue, b: s.term })), Math.min(6, count), rng(seed)));
    } else if (type === 'picture') {
      setDeck(buildPictureDeck(GK_BANK, count, rng(seed)));
    } else if (type === 'colormemory') {
      const targetRounds = difficulty === 'easy' ? 6 : difficulty === 'hard' ? 10 : 8;
      const startLen = difficulty === 'easy' ? 3 : difficulty === 'hard' ? 4 : 3;
      setColourCfg({ targetRounds, startLen });
    } else if (type === 'slice') {
      const lifetime = difficulty === 'easy' ? 6500 : difficulty === 'hard' ? 4200 : 5300;
      setSliceCfg({ lifetime });
      setDeck(buildSliceDeck(GK_BANK, count, 2, rng(seed)));
    } else if (type === 'sort') {
      const cats = shuffle(topCategories(GK_BANK, 5), rng(seed)).slice(0, 3);
      const pool = itemsInCategories(GK_BANK, cats, rng(seed + 1)).slice(0, count);
      const fallDuration = difficulty === 'easy' ? 6500 : difficulty === 'hard' ? 4200 : 5300;
      setSortCfg({ categories: cats, items: pool, fallDuration });
    } else if (MORE_GAME_TYPES.includes(type)) {
      setMoreCfg(buildMoreGame(type, difficulty, seed));
    }
    setPhase('playing');
  };

  const handleEnd = (score, total) => {
    const xp = Math.round(score / 2);
    setResult({ score, total, xp });
    setPhase('result');
  };

  if (phase === 'playing') {
    if (gameType === 'scramble')    return <ScrambleGame deck={deck} onEnd={handleEnd} email={email} name={name} />;
    if (gameType === 'memory')      return <MemoryGame   deck={deck} onEnd={handleEnd} email={email} name={name} />;
    if (gameType === 'picture')     return <PictureRoundGame deck={deck} onEnd={handleEnd} email={email} name={name} />;
    if (gameType === 'colormemory') return <ColourMemoryGame targetRounds={colourCfg.targetRounds} startLen={colourCfg.startLen} onEnd={handleEnd} email={email} name={name} />;
    if (gameType === 'slice')       return <WordSliceGame deck={deck} lifetime={sliceCfg.lifetime} onEnd={handleEnd} email={email} name={name} />;
    if (gameType === 'sort')        return <SortRushGame items={sortCfg.items} categories={sortCfg.categories} fallDuration={sortCfg.fallDuration} onEnd={handleEnd} email={email} name={name} />;
    if (moreCfg && MORE_GAME_TYPES.includes(gameType)) return <MoreGames type={gameType} cfg={moreCfg} onEnd={handleEnd} email={email} name={name} />;
  }

  if (phase === 'result') {
    const tier = result.score >= result.total * 15 ? 'trophy' : result.score >= result.total * 8 ? 'star' : 'zap';
    const title = result.score >= result.total * 15 ? 'Legendary!' : result.score >= result.total * 8 ? 'Well played!' : 'Keep going!';
    return (
      <div className="game-result-screen">
        <div className="game-result-card">
          <div className="game-result-icon"><Icon name={tier} size={44} /></div>
          <div className="game-result-title">{title}</div>
          <div className="game-result-score">{result.score} pts</div>
          <div className="game-result-xp">+{result.xp} XP earned</div>
          <div className="game-result-actions">
            <button className="game-result-btn" onClick={startGame}><Icon name="refresh" size={16} /> Play Again</button>
            <button className="game-result-btn" style={{ background: 'transparent', border: `2px solid ${GOLD}`, color: GOLD }} onClick={onBack}><Icon name="arrowLeft" size={15} /> Exit</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scr fd game-menu-screen">
      <div className="game-menu-header">
        <div className="game-menu-title"><EmojiIcon emoji="🎮" size="1.15em" /> Game Mode</div>
        <div className="game-menu-sub">Quick brain games. Play, score and earn XP.</div>
      </div>

      <div className="game-diff-label">Choose Difficulty:</div>
      <div className="game-diff-grid">
        {DIFFICULTIES.map((d) => (
          <button key={d.id} className={`game-diff-card ${difficulty === d.id ? 'selected' : ''}`} onClick={() => setDiff(d.id)}>
            <span className="game-diff-icon">{d.icon}</span>
            <span className="game-diff-name">{d.label}</span>
            <span className="game-diff-desc">{d.desc}</span>
          </button>
        ))}
      </div>

      <div className="game-modes-preview">
        <div className="game-mode-preview-card">
          <span className="game-mode-preview-icon"><Icon name="wand" size={17} /></span>
          <div>
            <div className="game-mode-preview-name">Word Scramble</div>
            <div className="game-mode-preview-desc">Read the clue, tap the scrambled letters in order to spell the term.</div>
          </div>
        </div>
        <div className="game-mode-preview-card">
          <span className="game-mode-preview-icon"><EmojiIcon emoji="🧠" size="1.1em" /></span>
          <div>
            <div className="game-mode-preview-name">Memory Match</div>
            <div className="game-mode-preview-desc">Flip cards to pair each clue with its answer. Fewest moves wins.</div>
          </div>
        </div>
        <div className="game-mode-preview-card">
          <span className="game-mode-preview-icon"><Icon name="image" size={17} /></span>
          <div>
            <div className="game-mode-preview-name">Picture Round</div>
            <div className="game-mode-preview-desc">A picture and the first letter — spell out the rest of the word.</div>
          </div>
        </div>
        <div className="game-mode-preview-card">
          <span className="game-mode-preview-icon"><Icon name="palette" size={17} /></span>
          <div>
            <div className="game-mode-preview-name">Colour Memory</div>
            <div className="game-mode-preview-desc">Watch the sequence light up, then tap it back in the same order.</div>
          </div>
        </div>
        <div className="game-mode-preview-card">
          <span className="game-mode-preview-icon"><Icon name="zap" size={17} /></span>
          <div>
            <div className="game-mode-preview-name">Word Slice</div>
            <div className="game-mode-preview-desc">Swipe or tap to slice the floating word that answers the clue.</div>
          </div>
        </div>
        <div className="game-mode-preview-card">
          <span className="game-mode-preview-icon"><Icon name="layers" size={17} /></span>
          <div>
            <div className="game-mode-preview-name">Sort Rush</div>
            <div className="game-mode-preview-desc">Drag each falling word into the category it belongs to.</div>
          </div>
        </div>
      </div>

      <div className="game-modes-preview">
        {MORE_GAME_INFO.map((g) => (
          <div className="game-mode-preview-card" key={g.name}>
            <span className="game-mode-preview-icon"><EmojiIcon emoji={g.icon} size="1.1em" /></span>
            <div><div className="game-mode-preview-name">{g.name}</div><div className="game-mode-preview-desc">{g.desc}</div></div>
          </div>
        ))}
      </div>

      <div className="game-random-note"><EmojiIcon emoji="🎲" size="1.1em" /> Game type is selected randomly each round</div>

      <button className="game-start-btn" onClick={startGame} disabled={starting}>
        <Icon name="swords" size={17} /> {starting ? 'Getting ready…' : 'Start playing'}
      </button>
    </div>
  );
}
