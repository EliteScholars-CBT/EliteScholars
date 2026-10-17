// api/_helpers/queries.js — reads used by cron jobs (Supabase only).
import { getSupabase, supabaseEnabled } from "./supabase.js";

export async function getUsersWithGuardians() {
  const users = [];
  const seen = new Set();
  if (supabaseEnabled()) {
    const sb = getSupabase();
    const { data } = await sb.from("profiles")
      .select("email,first_name,last_name,guardian_email,subscription_plan,stats,subject_performance,achievements")
      .not("guardian_email", "is", null).eq("is_premium", true);
    for (const r of data || []) {
      if (!r.guardian_email) continue;
      seen.add(r.email);
      users.push({
        email: r.email, firstName: r.first_name, lastName: r.last_name,
        guardianEmail: r.guardian_email, plan: r.subscription_plan || "",
        stats: r.stats || {}, subjectPerformance: r.subject_performance || {}, achievements: r.achievements || [],
      });
    }
  }
  return { success: true, users };
}

export async function getExpiringSubscriptions() {
  const expiring = [];
  const expired = [];
  const seen = new Set();
  if (supabaseEnabled()) {
    const sb = getSupabase();
    const { data } = await sb.from("profiles")
      .select("email,first_name,subscription_plan,expires_at").eq("is_premium", true).not("expires_at", "is", null);
    const now = Date.now();
    for (const r of data || []) {
      seen.add(r.email);
      const diff = new Date(r.expires_at).getTime() - now;
      const row = { email: r.email, firstName: r.first_name || "", plan: r.subscription_plan || "", expiresAt: r.expires_at };
      if (diff > 0 && diff <= 3 * 86400000) expiring.push(row);
      else if (diff <= 0) expired.push(row);
    }
  }
  return { success: true, expiring, expired };
}
