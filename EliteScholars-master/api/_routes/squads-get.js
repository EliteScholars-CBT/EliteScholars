import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { supabaseEnabled } from "../_helpers/supabase.js";
import { loadSquadFor } from "./squads-util.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "Squads backend not configured.", 503);
  const email = await requireUser(req, res);
  if (!email) return;
  return sendOk(res, { squad: await loadSquadFor(email) });
}
