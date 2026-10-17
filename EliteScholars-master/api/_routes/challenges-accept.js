import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { norm } from "./challenges-util.js";

export function makeStatusHandler(status, action) {
  return async function handler(req, res) {
    setCors(res);
    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    if (!supabaseEnabled()) return sendErr(res, "Challenges backend not configured.", 503);
    const me = await requireUser(req, res);
    if (!me) return;
    const b = readBody(req);
    if (!b.challenge_id) return sendErr(res, "challenge_id required.");
    const sb = getSupabase();
    const { data, error } = await sb.from("challenges").update({ status })
      .eq("challenge_id", b.challenge_id).eq("opponent_email", me)
      .in("status", ["pending", "accepted"]).select("challenge_id");
    if (error) return sendErr(res, "Update failed.", 500);
    if (!data?.length) return sendErr(res, "Challenge not found or already finished.", 404);
    return sendOk(res, {});
  };
}
export default makeStatusHandler("accepted", "acceptChallenge");
