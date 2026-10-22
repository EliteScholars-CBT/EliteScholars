import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { makeCode, loadSquadById, loadSquadsFor, MAX_SQUADS } from "./squads-util.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "Squads backend not configured.", 503);

  const email = await requireUser(req, res);
  if (!email) return;
  const b = readBody(req);
  const name = String(b.name || "").trim().slice(0, 40);
  if (!email || !name) return sendErr(res, "Squad name and email required.");

  const sb = getSupabase();
  if ((await loadSquadsFor(email)).length >= MAX_SQUADS) return sendErr(res, `You can be in up to ${MAX_SQUADS} squads. Leave one to add another.`);

  let squad = null;
  for (let i = 0; i < 5 && !squad; i++) {
    const { data, error } = await sb.from("squads").insert({ code: makeCode(), name, owner_email: email }).select().maybeSingle();
    if (error) { if (error.code === "23505") continue; return sendErr(res, "Could not create squad.", 500); }
    squad = data;
  }
  if (!squad) return sendErr(res, "Could not create squad. Try again.", 500);

  await sb.from("squad_members").insert({ squad_id: squad.id, email, display_name: String(b.username || email.split("@")[0]).slice(0, 40) });
  return sendOk(res, { squad: await loadSquadById(squad.id) });
}
