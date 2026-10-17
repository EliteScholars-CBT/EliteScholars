// POST /api/challenges/submit-score  { challenge_id, email, score }
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { awardXP } from "../_helpers/xp.js";
import { norm, PLAYED_XP, WON_XP } from "./challenges-util.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "Challenges backend not configured.", 503);

  const email = await requireUser(req, res);
  if (!email) return;
  const b = readBody(req);
  const score = Math.min(1000, Math.max(0, Number(b.score) || 0));
  if (!b.challenge_id) return sendErr(res, "challenge_id required.");

  const sb = getSupabase();
  const { data: ch } = await sb.from("challenges").select("*").eq("challenge_id", b.challenge_id).maybeSingle();
  if (!ch) return sendErr(res, "Challenge not found", 404);

  const isChallenger = email === ch.challenger_email;
  const isOpponent = email === ch.opponent_email;
  if (!isChallenger && !isOpponent) return sendErr(res, "You are not part of this challenge.", 403);
  if (ch.status === "completed") {
    return sendOk(res, { winner: ch.winner_email, xpAwarded: 0, completed: true });
  }

  const patch = isChallenger ? { challenger_score: score } : { opponent_score: score };
  const cs = isChallenger ? score : ch.challenger_score;
  const os = isOpponent ? score : ch.opponent_score;
  const both = cs !== null && cs !== undefined && os !== null && os !== undefined;

  let winner = null;
  let xpAwarded = 0;

  if (!both) {
    if (ch.status === "pending") patch.status = "accepted";
    await sb.from("challenges").update(patch).eq("challenge_id", ch.challenge_id);
  } else {
    winner = Number(cs) === Number(os) ? "draw" : Number(cs) > Number(os) ? ch.challenger_email : ch.opponent_email;
    // Guarded update: only the request that flips status to 'completed' pays out XP.
    const { data: flipped } = await sb.from("challenges")
      .update({ ...patch, status: "completed", winner_email: winner, completed_at: new Date().toISOString() })
      .eq("challenge_id", ch.challenge_id).neq("status", "completed").select("challenge_id");

    if (flipped?.length) {
      const cWon = winner === ch.challenger_email;
      const oWon = winner === ch.opponent_email;
      const cXp = PLAYED_XP + (cWon ? WON_XP : 0);
      const oXp = PLAYED_XP + (oWon ? WON_XP : 0);
      await awardXP(ch.challenger_email, cXp, cWon ? "challenge_won" : "challenge_played");
      await awardXP(ch.opponent_email, oXp, oWon ? "challenge_won" : "challenge_played");
      if (winner !== "draw") {
        const loser = cWon ? ch.opponent_email : ch.challenger_email;
        for (const [em, col] of [[winner, "challenges_won"], [loser, "challenges_lost"]]) {
          const { data: p } = await sb.from("profiles").select(col).eq("email", em).maybeSingle();
          if (p) await sb.from("profiles").update({ [col]: (p[col] || 0) + 1 }).eq("email", em);
        }
      }
      xpAwarded = isChallenger ? cXp : oXp;
    }
  }

  return sendOk(res, { winner, xpAwarded, completed: winner !== null });
}
