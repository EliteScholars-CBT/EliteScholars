// GET /api/challenges/list?kind=pending|history|messages&email=...
import { sendErr, sendMethodNotAllowed, setCors } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { norm, expireStale } from "./challenges-util.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "Challenges backend not configured.", 503);

  const email = await requireUser(req, res);
  if (!email) return;
  const sb = getSupabase();
  const kind = req.query.kind;

  if (kind === "messages") {
    const { data } = await sb.from("challenge_messages").select("message_id,category,message_text").eq("is_active", true);
    return res.status(200).json(data || []);
  }
  if (!email) return sendErr(res, "email required.");

  if (kind === "pending") {
    await expireStale(sb, "opponent_email", email);
    const { data } = await sb.from("challenges").select("*")
      .eq("opponent_email", email).in("status", ["pending", "accepted"])
      .gt("expires_at", new Date().toISOString()).order("expires_at", { ascending: false });
    return res.status(200).json(data || []);
  }
  if (kind === "history") {
    await expireStale(sb, "opponent_email", email);
    await expireStale(sb, "challenger_email", email);
    const { data } = await sb.from("challenges").select("*")
      .or(`challenger_email.eq.${email},opponent_email.eq.${email}`)
      .order("created_at", { ascending: false }).limit(200);
    const rows = (data || []).filter(
      (r) => ["completed", "declined", "expired"].includes(r.status) || (r.status === "accepted" && r.challenger_email === email)
    );
    return res.status(200).json(rows);
  }
  return sendErr(res, "Unknown kind.");
}
