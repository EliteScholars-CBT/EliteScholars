// School plan: every school (teacher account) starts with a free trial; after that it needs an
// active plan, which the admin activates once the school has paid. Trial length and the
// price tiers (by number of students) are set by the admin in settings.
import { getPricing, tierFor } from "./pricing.js";

const DAY = 86400000;

export async function ensureAccount(sb, email, schoolName) {
  const { data: ex } = await sb.from("school_accounts").select("*").eq("teacher_email", email).maybeSingle();
  if (ex) return ex;
  const pr = await getPricing();
  const now = Date.now();
  const row = { teacher_email: email, school_name: schoolName || "", trial_started_at: new Date(now).toISOString(), trial_ends_at: new Date(now + pr.school.trialDays * DAY).toISOString() };
  const { data } = await sb.from("school_accounts").insert(row).select("*").single();
  return data || row;
}

export function accountStatus(acc) {
  const now = Date.now();
  if (acc && acc.paid_until && new Date(acc.paid_until).getTime() > now) return { status: "active", daysLeft: Math.ceil((new Date(acc.paid_until).getTime() - now) / DAY), until: acc.paid_until };
  if (acc && acc.trial_ends_at && new Date(acc.trial_ends_at).getTime() > now) return { status: "trial", daysLeft: Math.ceil((new Date(acc.trial_ends_at).getTime() - now) / DAY), until: acc.trial_ends_at };
  return { status: "expired", daysLeft: 0, until: (acc && (acc.paid_until || acc.trial_ends_at)) || null };
}

export async function planSummary(sb, email, students) {
  const acc = await ensureAccount(sb, email, "");
  const st = accountStatus(acc);
  const pr = await getPricing();
  const tier = tierFor(pr.school, students);
  return { ...st, students, tier: tier ? { label: tier.label, price: tier.price } : null, period: pr.school.period, trialDays: pr.school.trialDays };
}

export async function canUseSchool(sb, email) {
  const acc = await ensureAccount(sb, email, "");
  return accountStatus(acc).status !== "expired";
}
