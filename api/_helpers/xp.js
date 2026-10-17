// api/_helpers/xp.js
import { getSupabase } from "./supabase.js";
import { bumpSquadXPServer } from "./squads.js";

// Level rules match the live Apps Script: level = floor(xp/100)+1.
export function levelFor(totalXp) {
  const level = Math.floor(totalXp / 100) + 1;
  return { level, xp_to_next: level * 100 - totalXp };
}

// Returns the new total XP, or null if no Supabase row exists / Supabase is off.
export async function awardXP(email, amount, reason = "") {
  const sb = getSupabase();
  if (!sb || !email || !amount) return null;
  try {
    const { data: row, error } = await sb.from("profiles").select("total_xp").eq("email", email).maybeSingle();
    if (error || !row) return null;
    const total = (row.total_xp || 0) + amount;
    const { level, xp_to_next } = levelFor(total);
    const { error: upErr } = await sb
      .from("profiles")
      .update({ total_xp: total, level, xp_to_next, last_active: new Date().toISOString() })
      .eq("email", email);
    if (upErr) return null;
    await sb.from("xp_events").insert({ email, amount, reason });
    await bumpSquadXPServer(email, amount);
    return total;
  } catch (e) {
    console.warn("[xp] award failed:", e?.message);
    return null;
  }
}
