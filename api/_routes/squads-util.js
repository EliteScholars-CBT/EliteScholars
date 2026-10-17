import { getSupabase } from "../_helpers/supabase.js";
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function makeCode() {
  let c = "";
  for (let i = 0; i < 6; i++) c += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return c;
}
export async function loadSquadFor(email) {
  const sb = getSupabase();
  const { data: mem } = await sb.from("squad_members").select("squad_id").eq("email", email).limit(1).maybeSingle();
  if (!mem) return null;
  return loadSquadById(mem.squad_id);
}
export async function loadSquadById(id) {
  const sb = getSupabase();
  const { data: squad } = await sb.from("squads").select("*").eq("id", id).maybeSingle();
  if (!squad) return null;
  const { data: members } = await sb.from("squad_members").select("email,display_name,xp_contributed,joined_at").eq("squad_id", id).order("xp_contributed", { ascending: false });
  const list = members || [];
  return {
    id: squad.id, code: squad.code, name: squad.name, owner_email: squad.owner_email,
    total_xp: list.reduce((a, m) => a + (m.xp_contributed || 0), 0),
    members: list.map((m) => ({ email: m.email, name: m.display_name, xp: m.xp_contributed })),
  };
}
