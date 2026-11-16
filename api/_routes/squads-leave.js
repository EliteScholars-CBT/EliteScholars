import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "Squads backend not configured.", 503);
  const email = await requireUser(req, res);
  if (!email) return;
  const b = readBody(req);
  if (!b.squadId) return sendErr(res, "squadId and email required.");
  const sb = getSupabase();
  const { data: sq } = await sb.from("squads").select("name").eq("id", b.squadId).maybeSingle();
  await sb.from("squad_members").delete().eq("squad_id", b.squadId).eq("email", email);
  const { count } = await sb.from("squad_members").select("id", { count: "exact", head: true }).eq("squad_id", b.squadId);
  sb.from("events").insert({ type: "squad_left", email, payload: { subject: `Left squad "${(sq && sq.name) || ""}"`, topic: count ? `${count} members left` : "squad is now empty and was closed" } }).then(() => {}, () => {});
  if (!count) await sb.from("squads").delete().eq("id", b.squadId);
  return sendOk(res, {});
}
