import { getSupabase } from "../_helpers/supabase.js";
import { eliteEmails } from "../_helpers/elite.js";

// A student can be in several squads at once, up to this many.
export const MAX_SQUADS = 5;
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
export async function loadSquadsFor(email) {
  const sb = getSupabase();
  const { data: mem } = await sb.from("squad_members").select("squad_id,joined_at").eq("email", email).order("joined_at", { ascending: true }).limit(MAX_SQUADS + 5);
  const out = [];
  for (const m of mem || []) {
    const sq = await loadSquadById(m.squad_id);
    if (sq) out.push({ ...sq, is_owner: sq.owner_email === email });
  }
  return out;
}
export async function loadSquadById(id) {
  const sb = getSupabase();
  const { data: squad } = await sb.from("squads").select("*").eq("id", id).maybeSingle();
  if (!squad) return null;
  const { data: members } = await sb.from("squad_members").select("email,display_name,xp_contributed,joined_at").eq("squad_id", id).order("xp_contributed", { ascending: false });
  const list = members || [];
  const elite = await eliteEmails(list.map((m) => m.email));
  // "online" = the app pinged in the last 3 minutes (profiles.last_seen; ignored if the column is not created yet)
  const seen = {};
  try {
    const { data: ps, error } = await sb.from("profiles").select("email,last_seen").in("email", list.map((m) => m.email));
    if (!error) (ps || []).forEach((p) => { if (p.last_seen) seen[p.email] = p.last_seen; });
  } catch { /* presence is cosmetic */ }
  const ONLINE_MS = 3 * 60 * 1000;
  return {
    id: squad.id, code: squad.code, name: squad.name, owner_email: squad.owner_email,
    total_xp: list.reduce((a, m) => a + (m.xp_contributed || 0), 0),
    members: list.map((m) => ({ email: m.email, name: m.display_name, xp: m.xp_contributed, elite: elite.has(m.email), last_seen: seen[m.email] || null, online: !!seen[m.email] && Date.now() - new Date(seen[m.email]).getTime() < ONLINE_MS })),
  };
}
