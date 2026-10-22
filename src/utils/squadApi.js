// ============================================================================
// squadApi.js — Study Squads backend calls (our own /api/squads/* routes,
// stored in Supabase). If the backend is unreachable the UI falls back to the
// locally cached squad — see StudySquads.js.
// ============================================================================

async function callSquadApi(path, payload, retry = true) {
  try {
    const response = await fetch(`/api/squads/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    let data;
    try { data = await response.json(); } catch { return { success: false, _noBackend: true }; }
    return { success: data?.success === true, ...data };
  } catch (error) {
    if (retry) {
      await new Promise((r) => setTimeout(r, 1000));
      return callSquadApi(path, payload, false);
    }
    console.warn(`squadApi: ${path} failed`, error);
    return { success: false, _noBackend: true };
  }
}

export const MAX_SQUADS = 5;

export const createSquad = (name, email, username) =>
  callSquadApi('create', { name, email, username });

export const joinSquad = (code, email, username) =>
  callSquadApi('join', { code: (code || '').trim().toUpperCase(), email, username });

export const getSquad = (email) => callSquadApi('get', { email });

export const leaveSquad = (squadId, email) => callSquadApi('leave', { squadId, email });

// Squad totals are now updated server-side whenever /api/xp/add runs, so the
// client no longer needs to ping separately.
export const postSquadXP = () => {};

/* ── Local cache (shared with StudySquads.js and xpManager.js) ──────────── */

const CACHE_KEY = 'es_squad_v1';

export function loadSquadCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch { return null; }
}
export function saveSquadCache(squad) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(squad)); } catch { /* ignore */ }
}
export function clearSquadCache() {
  try { localStorage.removeItem(CACHE_KEY); } catch { /* ignore */ }
}

// Called from xpManager.addXP on every XP gain, anywhere in the app. Keeps
// the locally cached squad's "me" row current so the leaderboard reflects
// your own XP immediately, and best-effort pings the backend so it'll do
// the same for everyone else once the Apps Script action exists.
export function bumpSquadXP(email, amount) {
  const squad = loadSquadCache();
  if (!squad || !amount) return;
  const members = (squad.members || []).map((m) =>
    m.email === email || m.isMe ? { ...m, xp: (m.xp || 0) + amount } : m
  );
  saveSquadCache({ ...squad, members });
  postSquadXP(squad.id, email, amount);
}

export const genSquadCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no O/0/I/1 ambiguity
  let out = '';
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
};
