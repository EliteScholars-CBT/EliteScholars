// Every game has its own little sound set: what a tap sounds like, what "correct" and "wrong" sound like.
// Attached once to the whole game screen, so it covers every game (and any added later) without touching their code.
import { tone } from './sounds';

const SCALES = [[523, 587, 659, 784, 880], [440, 523, 587, 659, 784], [392, 466, 523, 622, 698], [587, 659, 740, 880, 988], [349, 440, 523, 587, 698], [494, 554, 659, 740, 831]];
const WAVES = ['sine', 'triangle', 'square', 'sawtooth'];
const hash = (s) => { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };

// Hand-made sets for the six main games.
const SETS = {
  'scramble-game': { tap: (i) => tone(700 + (i % 6) * 40, 0.05, 'triangle', 0.11), good: () => [659, 784, 988, 1319].forEach((f, k) => tone(f, 0.1, 'sine', 0.15, k * 0.07)), bad: () => { tone(200, 0.18, 'sawtooth', 0.11); tone(150, 0.22, 'sawtooth', 0.09, 0.12); } },
  'memory-game': { tap: () => { tone(420, 0.05, 'triangle', 0.1); tone(640, 0.06, 'triangle', 0.09, 0.04); }, good: () => { tone(880, 0.09, 'sine', 0.15); tone(1175, 0.16, 'sine', 0.15, 0.08); }, bad: () => tone(260, 0.2, 'triangle', 0.14) },
  'picture-game': { tap: (i) => tone(500 + (i % 5) * 55, 0.05, 'sine', 0.1), good: () => [523, 659, 784].forEach((f, k) => tone(f, 0.16, 'triangle', 0.15, k * 0.1)), bad: () => { tone(330, 0.12, 'square', 0.07); tone(247, 0.22, 'square', 0.07, 0.11); } },
  'colour-game': { tap: (i) => tone([392, 494, 587, 698][i % 4], 0.22, 'sine', 0.2), good: () => [784, 988, 1175].forEach((f, k) => tone(f, 0.12, 'sine', 0.14, k * 0.06)), bad: () => { tone(110, 0.35, 'sawtooth', 0.14); tone(104, 0.35, 'square', 0.08); } },
  'slice-game': { tap: () => { tone(900, 0.04, 'sawtooth', 0.06); tone(300, 0.09, 'sawtooth', 0.07, 0.03); }, good: () => { tone(1100, 0.06, 'square', 0.08); tone(1500, 0.12, 'square', 0.08, 0.05); }, bad: () => tone(180, 0.25, 'square', 0.1) },
  'sort-game': { tap: () => tone(360, 0.07, 'triangle', 0.12), good: () => { tone(600, 0.07, 'sine', 0.14); tone(900, 0.12, 'sine', 0.14, 0.07); }, bad: () => { tone(280, 0.12, 'triangle', 0.13); tone(200, 0.16, 'triangle', 0.12, 0.1); } },
};

// The extra games get a set of their own, chosen from their name so each one stays the same every time.
function setFor(key) {
  if (SETS[key]) return SETS[key];
  const h = hash(key), sc = SCALES[h % SCALES.length], w = WAVES[(h >> 3) % 3], w2 = WAVES[(h >> 5) % 4];
  const vol = w === 'sine' ? 0.15 : 0.09;
  return {
    tap: (i) => tone(sc[i % sc.length] * (1 + ((h >> 7) % 2)), 0.06, w, vol * 0.8),
    good: () => [sc[0], sc[2], sc[4]].forEach((f, k) => tone(f, 0.13, w, vol, k * 0.08)),
    bad: () => { tone(sc[0] / 2, 0.2, w2, vol * 0.9); tone(sc[0] / 2.2, 0.25, w2, vol * 0.8, 0.12); },
  };
}

const gameKey = (arena) => {
  const cls = [...arena.classList].filter((c) => c !== 'game-arena' && c !== 'correct' && c !== 'wrong' && c !== 'fd');
  return cls.join('-') || 'game';
};

export function attachGameSounds(root) {
  if (!root) return () => {};
  const onDown = (e) => {
    const b = e.target.closest && e.target.closest('button, [role="button"], .memory-card, .scramble-tile');
    if (!b || b.disabled) return;
    const arena = b.closest('.game-arena');
    if (!arena) {
      if (b.closest('.game-diff-card')) tone(620, 0.07, 'sine', 0.12);
      else if (b.closest('.game-start-btn')) { tone(392, 0.08, 'triangle', 0.14); tone(523, 0.08, 'triangle', 0.14, 0.07); tone(784, 0.14, 'triangle', 0.16, 0.14); }
      else tone(560, 0.05, 'sine', 0.1);
      return;
    }
    const sibs = b.parentElement ? [...b.parentElement.children] : [];
    setFor(gameKey(arena)).tap(Math.max(0, sibs.indexOf(b)));
  };
  root.addEventListener('pointerdown', onDown, true);
  const seen = new WeakMap();
  const mo = new MutationObserver((list) => {
    for (const m of list) {
      const el = m.target;
      if (!(el instanceof Element) || !el.classList.contains('game-arena')) continue;
      const now = el.classList.contains('correct') ? 'c' : el.classList.contains('wrong') ? 'w' : '';
      if (seen.get(el) === now) continue;
      seen.set(el, now);
      if (now === 'c') setFor(gameKey(el)).good();
      else if (now === 'w') setFor(gameKey(el)).bad();
    }
  });
  mo.observe(root, { attributes: true, attributeFilter: ['class'], subtree: true });
  return () => { root.removeEventListener('pointerdown', onDown, true); mo.disconnect(); };
}
