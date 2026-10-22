// entitlement.js — what this student may do, and the free-tier usage meter.
//
// Free students get a few uses of each thing per day (topics, CBT sessions,
// games and files uploaded to study from) each day. The server keeps
// the count (so clearing the browser doesn't reset it). If the server can't be
// reached the app falls back to a local counter so offline study isn't blocked.
import { FREE_TOPICS_PER_DAY } from './constants';

const CACHE_KEY = (e) => `ep_ent_${e}`;
const DEFAULT_LIMITS = { topics: FREE_TOPICS_PER_DAY, cbt: 3, games: 3, fileStudy: 2 };
const KIND_KEY = { topic: 'topics', cbt: 'cbt', game: 'games', file_study: 'fileStudy' };
const DAILY = { topic: true, cbt: true, game: true, file_study: true };

let mem = {};

const lagosDay = () => new Date(Date.now() + 3600000).toISOString().slice(0, 10);

function readCache(email) {
  if (mem[email]) return mem[email];
  try {
    const raw = localStorage.getItem(CACHE_KEY(email));
    if (raw) { mem[email] = JSON.parse(raw); return mem[email]; }
  } catch {}
  return null;
}

function writeCache(email, data) {
  mem[email] = data;
  try { localStorage.setItem(CACHE_KEY(email), JSON.stringify(data)); } catch {}
}

function stillUnlimited(ent) {
  if (!ent || !ent.unlimited) return false;
  if (ent.forever || !ent.until) return true;
  return new Date(ent.until).getTime() > Date.now();
}

export function isUnlimitedCached(email) {
  const c = email ? readCache(email) : null;
  return !!c && stillUnlimited(c.entitlement);
}

export function getCachedEntitlement(email) {
  const c = email ? readCache(email) : null;
  return c ? { ...c.entitlement, unlimited: stillUnlimited(c.entitlement) } : null;
}

// Fetch the latest from the server (and cache it). Returns the entitlement or null.
export async function refreshEntitlement(email) {
  if (!email) return null;
  try {
    const res = await fetch('/api/entitlement/get');
    if (!res.ok) return getCachedEntitlement(email);
    const j = await res.json();
    if (!j?.success) return getCachedEntitlement(email);
    writeCache(email, { entitlement: j.entitlement, limits: j.limits, session: j.session, usage: j.usage, usageDay: j.day, fetchedAt: Date.now() });
    return { ...j.entitlement, unlimited: stillUnlimited(j.entitlement) };
  } catch {
    return getCachedEntitlement(email);
  }
}

// ── local fallback meter (offline / signed-out device) ───────────────────────
const localKey = (email, kind) => `ep_use_${email}_${kind}_${DAILY[kind] ? lagosDay() : 'lifetime'}`;
function localRead(email, kind) {
  try { return JSON.parse(localStorage.getItem(localKey(email, kind)) || '{"count":0,"refs":[]}'); } catch { return { count: 0, refs: [] }; }
}
function localUse(email, kind, ref, limit) {
  const cur = localRead(email, kind);
  if (ref && cur.refs.includes(ref)) return { allowed: true, used: cur.count, limit };
  if (cur.count >= limit) return { allowed: false, used: cur.count, limit };
  const next = { count: cur.count + 1, refs: ref ? [...cur.refs, ref].slice(-200) : cur.refs };
  try { localStorage.setItem(localKey(email, kind), JSON.stringify(next)); } catch {}
  return { allowed: true, used: next.count, limit };
}

function limitFor(email, kind) {
  const c = readCache(email);
  return (c?.limits && c.limits[KIND_KEY[kind]]) ?? DEFAULT_LIMITS[KIND_KEY[kind]];
}

// Free-session rules set by the admin: { minutes, cooldownMinutes } (0 = off).
// Falls back to the built-in constants until the server answers.
export function getFreeSessionConfig(email) {
  const c = email ? readCache(email) : null;
  if (c && c.session) return { minutes: Number(c.session.minutes) || 0, cooldownMinutes: Number(c.session.cooldownMinutes) || 0 };
  return { minutes: 0, cooldownMinutes: 0 };
}

// How many uses are left right now (best effort, from the cache). Infinity if unlimited.
export function remaining(email, kind) {
  if (!email || isUnlimitedCached(email)) return Infinity;
  const c = readCache(email);
  const k = KIND_KEY[kind];
  const server = c?.usage?.[k];
  const limit = limitFor(email, kind);
  const serverUsed = server && (!DAILY[kind] || c.usageDay === lagosDay()) ? server.used : 0;
  const used = Math.max(serverUsed || 0, localRead(email, kind).count);
  return Math.max(0, limit - used);
}

// Ask to start one thing. kind: 'topic' | 'cbt' | 'game' | 'file_study'
// Resolves { allowed, used, limit }. Never throws.
export async function reserve(email, kind, ref = '') {
  if (!email) return { allowed: true };
  if (isUnlimitedCached(email)) return { allowed: true, unlimited: true };
  try {
    const res = await fetch('/api/entitlement/use', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, ref }),
    });
    if (res.status === 403) {
      const j = await res.json().catch(() => ({}));
      if (j.code === 'LIMIT') return { allowed: false, used: j.used, limit: j.limit, kind };
    }
    if (res.ok) {
      const j = await res.json();
      if (j?.unlimited) { refreshEntitlement(email); return { allowed: true, unlimited: true }; }
      // keep the cached meter current
      const c = readCache(email);
      if (c && j?.used !== undefined) {
        const k = KIND_KEY[kind];
        writeCache(email, { ...c, usageDay: lagosDay(), usage: { ...(c.usage || {}), [k]: { used: j.used, limit: j.limit } } });
      }
      return { allowed: true, used: j?.used, limit: j?.limit };
    }
  } catch { /* offline: fall through */ }
  return localUse(email, kind, ref, limitFor(email, kind));
}
