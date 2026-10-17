// POST /api/challenges/create
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { norm, EXPIRY_MS } from "./challenges-util.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "Challenges backend not configured.", 503);

  const challenger = await requireUser(req, res);
  if (!challenger) return;
  if (!(await rateLimitOk(req, res, "chcreate", 20, 3600, challenger))) return;
  const b = readBody(req);
  const opponent = norm(b.opponent_email);
  if (!opponent) return sendErr(res, "Opponent email required.");
  if (challenger === opponent) return sendErr(res, "You can't challenge yourself.");

  const sb = getSupabase();
  let { data: opp } = await sb.from("profiles").select("email,first_name,username").eq("email", opponent).maybeSingle();
  if (!opp) return sendErr(res, "Opponent email not found. They must be registered.");
  const { data: me } = await sb.from("profiles").select("first_name,username").eq("email", challenger).maybeSingle();

  const id = "CH-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  const score = Number.isFinite(Number(b.challenger_score)) ? Math.min(1000, Math.max(0, Number(b.challenger_score))) : null;
  const row = {
    challenge_id: id,
    challenger_email: challenger,
    challenger_name: me?.username || me?.first_name || challenger.split("@")[0],
    opponent_email: opponent,
    opponent_name: opp.username || opp.first_name || b.opponent_name || opponent.split("@")[0],
    exam_type: String(b.exam_type || "").slice(0, 60),
    university: String(b.university || "").slice(0, 80),
    subject: String(b.subject || "").slice(0, 80),
    num_questions: b.num_questions ?? null,
    time_limit: b.time_limit ?? null,
    message_template: String(b.message_template || "").slice(0, 200),
    custom_message: String(b.custom_message || "").slice(0, 300),
    status: "pending",
    challenger_score: score,
    expires_at: new Date(Date.now() + EXPIRY_MS).toISOString(),
  };
  const { error } = await sb.from("challenges").insert(row);
  if (error) { console.error("[challenge create]", error.message); return sendErr(res, "Could not create challenge.", 500); }

  return sendOk(res, { challenge_id: id });
}
