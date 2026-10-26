// Small helpers for the game scoreboard and the public /game page.
const KEY = 'es_game_anon';
export function getAnon() {
  try {
    let a = localStorage.getItem(KEY);
    if (!a || !/^[a-z0-9]{10,32}$/.test(a)) {
      a = Array.from(crypto.getRandomValues(new Uint8Array(12))).map((b) => (b % 36).toString(36)).join('');
      localStorage.setItem(KEY, a);
    }
    return a;
  } catch { return 'anon' + Math.random().toString(36).slice(2, 12); }
}

export function trackGame(type, extra = {}) {
  try { fetch('/api/events/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, anon: getAnon(), ...extra }), keepalive: true }).catch(() => {}); } catch { /* analytics only */ }
}

export async function postScore(game, score) {
  try {
    const r = await fetch('/api/game/score', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ anon: getAnon(), game, score }) });
    const d = await r.json();
    return d && d.success !== false ? d : null;
  } catch { return null; }
}

export async function getBoard() {
  try {
    const r = await fetch(`/api/game/board?anon=${getAnon()}`);
    const d = await r.json();
    return d && d.success !== false ? d : null;
  } catch { return null; }
}

// Games take turns: a shuffled "bag" is used up before any game comes round again, and the next bag never starts with the game just played.
const BAG = 'es_game_bag';
export function nextGameType(all) {
  let bag = [];
  try { bag = JSON.parse(sessionStorage.getItem(BAG) || '[]').filter((t) => all.includes(t)); } catch { bag = []; }
  if (!bag.length) {
    let last = ''; try { last = sessionStorage.getItem(BAG + '_last') || ''; } catch { /* ignore */ }
    bag = [...all].sort(() => Math.random() - 0.5);
    if (bag.length > 1 && bag[bag.length - 1] === last) { const i = Math.floor(Math.random() * (bag.length - 1)); [bag[bag.length - 1], bag[i]] = [bag[i], bag[bag.length - 1]]; }
  }
  const t = bag.pop();
  try { sessionStorage.setItem(BAG, JSON.stringify(bag)); sessionStorage.setItem(BAG + '_last', t); } catch { /* ignore */ }
  return t;
}

export const gameShareUrl = () => `${window.location.origin}/game?src=whatsapp&utm_campaign=gameshare`;
export function shareScore(score, via) {
  const text = `I scored ${score} on EliteScholars games. Can you beat me? Play free: ${gameShareUrl()}`;
  trackGame('game_share', { channel: via, score });
  if (via === 'whatsapp') { window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener'); return; }
  if (via === 'native' && navigator.share) { navigator.share({ text, url: gameShareUrl() }).catch(() => {}); return; }
  try { navigator.clipboard && navigator.clipboard.writeText(text); } catch { /* ignore */ }
}
