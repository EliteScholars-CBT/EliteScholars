// Game scoreboard.
//   POST /api/game/score   { anon, game, score }  -> saves the score, returns rank, top players and who you beat
//   GET  /api/game/board?anon=…                   -> the weekly board
// Works for guests (anonymous id from the browser) and for signed-in students (name from their profile).
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { parseSessionToken, tokenFromRequest } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";

const ANON = /^[a-z0-9]{10,32}$/;
const GAMES = /^[a-z0-9_-]{2,30}$/;
const WEEK = 7 * 86400000;

async function who(sb, req, anon) {
  const em = parseSessionToken(tokenFromRequest(req))?.email || null;
  if (em) {
    let name = "Student";
    try { const { data } = await sb.from("profiles").select("first_name,username").eq("email", em).maybeSingle(); if (data) name = data.first_name || data.username || name; } catch { /* default */ }
    return { key: em, guest: false, name: String(name).slice(0, 24) };
  }
  if (!ANON.test(String(anon || ""))) return null;
  return { key: "g:" + anon, guest: true, name: "Guest " + String(anon).slice(-4).toUpperCase() };
}

async function weekly(sb) {
  const since = new Date(Date.now() - WEEK).toISOString();
  const { data } = await sb.from("game_scores").select("player_key,name,is_guest,score").gte("created_at", since).order("score", { ascending: false }).limit(3000);
  const best = new Map();
  for (const r of data || []) { const c = best.get(r.player_key); if (!c || r.score > c.score) best.set(r.player_key, { key: r.player_key, name: r.name, guest: !!r.is_guest, score: r.score }); }
  return [...best.values()].sort((a, b) => b.score - a.score);
}

const view = (list, me) => {
  const top = list.slice(0, 10).map((p, i) => ({ rank: i + 1, name: p.name, score: p.score, guest: p.guest, you: p.key === me }));
  const i = list.findIndex((p) => p.key === me);
  const mine = i >= 0 ? { rank: i + 1, name: list[i].name, score: list[i].score, you: true } : null;
  return { top, mine, players: list.length };
};

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!supabaseEnabled()) return sendErr(res, "Scores are not available right now.", 503);
  const sb = getSupabase();
  const op = String(req.query.op || "board");

  if (op === "board") {
    if (req.method !== "GET") return sendMethodNotAllowed(res);
    if (!(await rateLimitOk(req, res, "gboard", 60, 60))) return;
    const me = await who(sb, req, req.query.anon);
    let list = [];
    try { list = await weekly(sb); } catch { return sendErr(res, "Could not load the scoreboard.", 500); }
    return sendOk(res, view(list, me && me.key));
  }

  if (op === "score") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    if (!(await rateLimitOk(req, res, "gscore", 40, 60))) return;
    const b = readBody(req);
    const me = await who(sb, req, b.anon);
    if (!me) return sendErr(res, "Missing player id.");
    const game = String(b.game || "mixed");
    const score = Math.round(Number(b.score));
    if (!GAMES.test(game) || !Number.isFinite(score) || score < 0 || score > 3000) return sendErr(res, "Invalid score.");
    let before = [];
    try { before = await weekly(sb); } catch { /* first score */ }
    const prev = before.find((p) => p.key === me.key);
    try { await sb.from("game_scores").insert({ player_key: me.key, is_guest: me.guest, name: me.name, game, score }); } catch { return sendErr(res, "Could not save your score.", 500); }
    const mineBest = Math.max(score, prev ? prev.score : 0);
    const others = before.filter((p) => p.key !== me.key);
    const list = [...others, { key: me.key, name: me.name, guest: me.guest, score: mineBest }].sort((a, b2) => b2.score - a.score);
    const beat = others.filter((p) => p.score < score).sort((a, b2) => b2.score - a.score).slice(0, 3).map((p) => ({ name: p.name, score: p.score }));
    const above = others.filter((p) => p.score >= score).sort((a, b2) => a.score - b2.score)[0];
    return sendOk(res, { ...view(list, me.key), score, best: mineBest, newBest: !prev || score > prev.score, beat, nextUp: above ? { name: above.name, score: above.score, gap: above.score - score } : null });
  }
  return sendErr(res, "Unknown request.", 404);
}
