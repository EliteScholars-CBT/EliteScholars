import { getSupabase } from "../_helpers/supabase.js";

export const PLAYED_XP = 10;
export const WON_XP = 40;
export const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

export const norm = (e) => String(e || "").toLowerCase().trim();

// Flip stale pending rows to 'expired' (accepted ones stay playable).
export async function expireStale(sb, filterCol, email) {
  await sb.from("challenges").update({ status: "expired" })
    .eq(filterCol, email).eq("status", "pending").lte("expires_at", new Date().toISOString());
}

// Shape rows like the old Sheets objects the frontend already understands.
export function shape(r) {
  return { ...r, expires_at: r.expires_at, completed_at: r.completed_at };
}
