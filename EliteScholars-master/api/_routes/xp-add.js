// POST /api/xp/add  { amount, reason }   (signed-in users only; account comes from the session)
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { awardXP } from "../_helpers/xp.js";
import { getSupabase } from "../_helpers/supabase.js";

const MAX_PER_CALL = 600;       // largest legitimate single award is a long quiz
const MAX_PER_DAY = 4000;       // rolling 24h ceiling per account

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);

  const email = await requireUser(req, res);
  if (!email) return;
  if (!(await rateLimitOk(req, res, "xp", 60, 60, email))) return;

  const b = readBody(req);
  const amount = Math.floor(Number(b.amount));
  if (!Number.isFinite(amount) || amount < 1 || amount > MAX_PER_CALL) return sendErr(res, "Amount out of range.");

  const sb = getSupabase();
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { data: recent } = await sb.from("xp_events").select("amount").eq("email", email).gte("created_at", since);
  const today = (recent || []).reduce((s, r) => s + (r.amount || 0), 0);
  if (today + amount > MAX_PER_DAY) return sendErr(res, "Daily XP limit reached.");

  const total = await awardXP(email, amount, String(b.reason || "").slice(0, 60));
  return sendOk(res, { total_xp: total });
}
