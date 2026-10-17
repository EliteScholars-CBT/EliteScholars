// api/_helpers/squads.js
import { getSupabase } from "./supabase.js";

// Add earned XP to the member's squad contribution. Best effort.
export async function bumpSquadXPServer(email, amount) {
  const sb = getSupabase();
  if (!sb || !email || !amount) return;
  try {
    const { data } = await sb.from("squad_members").select("id,xp_contributed").eq("email", email);
    for (const m of data || []) {
      await sb.from("squad_members").update({ xp_contributed: (m.xp_contributed || 0) + amount }).eq("id", m.id);
    }
  } catch (e) {
    console.warn("[squads] bump failed:", e?.message);
  }
}
