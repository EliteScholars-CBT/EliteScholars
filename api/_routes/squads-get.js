import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { supabaseEnabled } from "../_helpers/supabase.js";
import { getSupabase } from "../_helpers/supabase.js";
import { loadSquadsFor } from "./squads-util.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "Squads backend not configured.", 503);
  const email = await requireUser(req, res);
  if (!email) return;
  // presence: every call (and the app's 1-minute heartbeat) marks the student as online
  try { await getSupabase().from("profiles").update({ last_seen: new Date().toISOString() }).eq("email", email); } catch { /* column may not exist yet */ }
  if (readBody(req).ping) return sendOk(res, { pong: true });
  const squads = await loadSquadsFor(email);
  // "squad" (the first one) is kept so older app versions keep working
  return sendOk(res, { squads, squad: squads[0] || null });
}
