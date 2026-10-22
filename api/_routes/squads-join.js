import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { loadSquadById, loadSquadsFor, MAX_SQUADS } from "./squads-util.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "Squads backend not configured.", 503);

  const email = await requireUser(req, res);
  if (!email) return;
  const b = readBody(req);
  const code = String(b.code || "").trim().toUpperCase();
  if (!email || !code) return sendErr(res, "Code and email required.");

  const sb = getSupabase();
  const { data: squad } = await sb.from("squads").select("id").eq("code", code).maybeSingle();
  if (!squad) return sendErr(res, "No squad found with that code.");

  const mine = await loadSquadsFor(email);
  const existing = mine.find((q) => q.id === squad.id);
  if (!existing && mine.length >= MAX_SQUADS) return sendErr(res, `You can be in up to ${MAX_SQUADS} squads. Leave one to join another.`);

  const { count } = await sb.from("squad_members").select("id", { count: "exact", head: true }).eq("squad_id", squad.id);
  if ((count || 0) >= 20 && !existing) return sendErr(res, "This squad is full.");

  await sb.from("squad_members").upsert(
    { squad_id: squad.id, email, display_name: String(b.username || email.split("@")[0]).slice(0, 40) },
    { onConflict: "squad_id,email", ignoreDuplicates: true }
  );
  return sendOk(res, { squad: await loadSquadById(squad.id) });
}
