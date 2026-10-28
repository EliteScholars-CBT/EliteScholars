// School plan payments: one row in `payments` (unique tx_ref = no double activation), then extend the school's plan.
import { getSupabase, supabaseEnabled } from "./supabase.js";
import { getPricing, planFor } from "./pricing.js";
import { recordCommission } from "./partners.js";
import { ensureAccount } from "./schoolPlan.js";

const DAY = 86400000;
export const PERIOD_DAYS = { month: 30, term: 120, semester: 120, session: 365, year: 365 };
export const periodDays = (p) => PERIOD_DAYS[String(p || "term").toLowerCase()] || 120;

// What a school (terms) or a tutorial centre (months) can buy. The last option is the full year.
export const PERIOD_OPTIONS = { school: [1, 2, 3], centre: [1, 3, 6, 12] };
export const YEAR_PERIODS = { school: 3, centre: 12 };
const daysFor = (kind, n) => (n === YEAR_PERIODS[kind] ? 365 : (kind === "centre" ? 30 : 120) * n);
const normPeriods = (kind, p) => (PERIOD_OPTIONS[kind] || PERIOD_OPTIONS.school).includes(Number(p)) ? Number(p) : 1;

export function amountFor(kind, tier, n) {
  if (!tier) return 0;
  return n === YEAR_PERIODS[kind] && tier.yearPrice > 0 ? tier.yearPrice : tier.price * n;
}

export async function schoolQuote(sb, schoolId, periods) {
  const pr = await getPricing();
  const { data: sc } = await sb.from("schools").select("kind").eq("id", schoolId).maybeSingle();
  const kind = sc && sc.kind === "centre" ? "centre" : "school";
  const plan = planFor(pr, kind);
  const { count } = await sb.from("school_students").select("email", { count: "exact", head: true }).eq("school_id", schoolId);
  const students = count || 0;
  let tier = plan.tiers[0];
  for (const t of plan.tiers) if (students >= t.min) tier = t;
  const n = normPeriods(kind, periods);
  const options = PERIOD_OPTIONS[kind].map((k) => ({ periods: k, amount: amountFor(kind, tier, k), year: k === YEAR_PERIODS[kind] }));
  return { kind, students, tier, periods: n, period: plan.period, days: daysFor(kind, n), amount: amountFor(kind, tier, n), options, yearPeriods: YEAR_PERIODS[kind] };
}

export async function activateSchoolAndLog({ email, txRef, amount, schoolId, periods }) {
  if (!supabaseEnabled()) return { error: true };
  const sb = getSupabase();
  try {
    const { data: school } = await sb.from("schools").select("id,name,owner_email,kind").eq("id", schoolId).maybeSingle();
    if (!school) return { error: true };
    const claim = await sb.from("payments").insert({ tx_ref: txRef, email, plan: `school:${schoolId}`, amount: Number(amount) || 0, status: "successful" });
    if (claim.error) {
      if (claim.error.code === "23505" || /duplicate/i.test(claim.error.message || "")) return { duplicate: true };
      throw claim.error;
    }
    const kind = school.kind === "centre" ? "centre" : "school";
    const days = daysFor(kind, normPeriods(kind, periods));
    const acc = await ensureAccount(sb, school.owner_email, school.name);
    const base = Math.max(Date.now(), acc.paid_until ? new Date(acc.paid_until).getTime() : 0);
    const paidUntil = new Date(base + days * DAY).toISOString();
    await sb.from("school_accounts").update({ paid_until: paidUntil, amount_paid: Number(acc.amount_paid || 0) + (Number(amount) || 0) }).eq("teacher_email", school.owner_email);
    await recordCommission({ email: school.owner_email, txRef, amount }); // a partner who referred the school earns on it
    if (email !== school.owner_email) await recordCommission({ email, txRef, amount });
    return { ok: true, paidUntil, schoolName: school.name };
  } catch (e) {
    console.error("[schoolPay] failed:", e?.message);
    return { error: true };
  }
}
