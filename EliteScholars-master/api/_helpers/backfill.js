// api/_helpers/backfill.js
// Copy an old Sheets account into Supabase the first time that person signs in.
// Never overwrites an existing Supabase row.
import { getSupabase } from "./supabase.js";
import { legacyGetXP } from "./legacy.js";

const PLANS = ["annual", "pro"];

// storedHash: the password hash to keep (scrypt if we know the plain password,
// otherwise the legacy hash, which is upgraded on the next real login).
export async function backfillProfile(email, p, storedHash) {
  const sb = getSupabase();
  if (!sb || !p) return { ok: false };
  try {
    const { data: existing } = await sb.from("profiles").select("email").eq("email", email).maybeSingle();
    if (existing) return { ok: true, existed: true };

    const total = (await legacyGetXP(email)) ?? 0;
    const level = Math.floor(total / 100) + 1;
    const exp = p.premiumExpiresAt ? new Date(Number(p.premiumExpiresAt)) : null;
    const planOk = PLANS.includes(p.premiumPlan);
    const active = !!(planOk && exp && !isNaN(exp) && exp > new Date());

    const { error } = await sb.from("profiles").insert({
      email,
      username: p.username || null,
      first_name: p.firstName || "",
      last_name: p.lastName || "",
      password_hash: storedHash,
      student_type: p.studentType || "",
      selected_exams: p.selectedExams || [],
      stats: p.stats || {},
      achievements: p.achievements || [],
      subject_performance: p.subjectPerformance || {},
      total_xp: total, level, xp_to_next: level * 100 - total,
      is_premium: active,
      subscription_plan: planOk ? p.premiumPlan : null,
      expires_at: exp && !isNaN(exp) ? exp.toISOString() : null,
      last_login: new Date().toISOString(),
    });
    if (error) { console.warn("[backfill] insert failed:", error.message); return { ok: false }; }
    return { ok: true };
  } catch (e) {
    console.warn("[backfill] failed:", e?.message);
    return { ok: false };
  }
}
