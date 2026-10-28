// Prices and plan settings the admin can change at any time (stored in the
// `settings` table). Falls back to the built-in defaults when nothing is set.
import { getSupabase, supabaseEnabled } from "./supabase.js";
import { PREMIUM_ANNUAL_PRICE, PREMIUM_ANNUAL_ORIGINAL_PRICE, PRO_MONTHLY_PRICE } from "./constants/premium.js";
import { SHOP_ITEMS } from "./constants/shop.js";

export const DEFAULT_SCHOOL = {
  trialDays: 14,
  // Price for a school with at least `min` students (one term, in naira). Admin edits these.
  tiers: [
    { min: 0,   label: "Starter (up to 99 students)", price: 25000 },
    { min: 100, label: "Growing (100+ students)",     price: 60000 },
    { min: 200, label: "Standard (200+ students)",    price: 110000 },
    { min: 500, label: "Large (500+ students)",       price: 250000 },
  ],
  period: "term",
};

// Tutorial / JAMB centres: they run all year in cohorts, so they pay by the month (or 3, 6, 12 months).
// `yearPrice` (optional, on any tier) is the price for the full year; 0 means "just add up the periods".
export const DEFAULT_CENTRE = {
  trialDays: 14,
  tiers: [
    { min: 0,   label: "Small centre (up to 49 students)", price: 15000, yearPrice: 150000 },
    { min: 50,  label: "Growing (50+ students)",           price: 30000, yearPrice: 300000 },
    { min: 150, label: "Large (150+ students)",            price: 55000, yearPrice: 550000 },
  ],
  period: "month",
};

// Group plans: one payer, one year, up to `seats` members. Prices are editable in Admin → Prices.
export const GROUP_DEFAULTS = { group50: 145000, group100: 285000 };
export const GROUP_SEATS = { group50: 50, group100: 100 };

export const parseNaira = (s) => Number(String(s || "").replace(/[^\d]/g, "")) || 0;
export const fmtNaira = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

let cache = { at: 0, v: null };
export function bustPricingCache() { cache = { at: 0, v: null }; }

export async function getPricing() {
  if (cache.v && Date.now() - cache.at < 15000) return cache.v;
  let m = {};
  if (supabaseEnabled()) {
    try {
      const { data } = await getSupabase().from("settings").select("key,value").in("key", ["prices", "school_plan", "centre_plan"]);
      m = Object.fromEntries((data || []).map((r) => [r.key, r.value]));
    } catch { /* defaults */ }
  }
  const p = m.prices || {};
  const items = {};
  for (const it of SHOP_ITEMS) {
    if (it.isPremium) continue;
    const o = p.items && Number(p.items[it.id]);
    items[it.id] = o > 0 ? o : parseNaira(it.price);
  }
  const sp = m.school_plan || {};
  const school = {
    trialDays: Number.isFinite(Number(sp.trialDays)) ? Number(sp.trialDays) : DEFAULT_SCHOOL.trialDays,
    tiers: Array.isArray(sp.tiers) && sp.tiers.length ? sp.tiers : DEFAULT_SCHOOL.tiers,
    period: sp.period || DEFAULT_SCHOOL.period,
  };
  const normTiers = (arr) => arr.map((t) => ({ min: Number(t.min) || 0, label: String(t.label || ""), price: Number(t.price) || 0, yearPrice: Number(t.yearPrice) > 0 ? Math.round(Number(t.yearPrice)) : 0 })).sort((a, b) => a.min - b.min);
  school.tiers = normTiers(school.tiers);
  const cp = m.centre_plan || {};
  const centre = {
    trialDays: Number.isFinite(Number(cp.trialDays)) ? Number(cp.trialDays) : DEFAULT_CENTRE.trialDays,
    tiers: normTiers(Array.isArray(cp.tiers) && cp.tiers.length ? cp.tiers : DEFAULT_CENTRE.tiers),
    period: "month",
  };
  const v = {
    premiumAnnual: Number(p.premiumAnnual) > 0 ? Number(p.premiumAnnual) : PREMIUM_ANNUAL_PRICE,
    premiumAnnualOriginal: Number(p.premiumAnnualOriginal) > 0 ? Number(p.premiumAnnualOriginal) : PREMIUM_ANNUAL_ORIGINAL_PRICE,
    pro: Number(p.pro) > 0 ? Number(p.pro) : PRO_MONTHLY_PRICE,
    group50: Number(p.group50) > 0 ? Number(p.group50) : GROUP_DEFAULTS.group50,
    group100: Number(p.group100) > 0 ? Number(p.group100) : GROUP_DEFAULTS.group100,
    items, school, centre,
  };
  cache = { at: Date.now(), v };
  return v;
}

export const planFor = (pr, kind) => (kind === "centre" ? pr.centre : pr.school);
export const tierFor = (school, students) => {
  let t = school.tiers[0];
  for (const x of school.tiers) if (students >= x.min) t = x;
  return t;
};
