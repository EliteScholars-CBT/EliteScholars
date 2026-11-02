// api/_helpers/premium.js — pro activation + payment logging (Supabase only).
import { getSupabase, supabaseEnabled } from "./supabase.js";
import { recordCommission } from "./partners.js";
import { PLAN_DEFS, normalizePlan } from "./plans.js";

const PLANS = ["annual", "pro"];

export async function getFirstName(email) {
  if (supabaseEnabled()) {
    const { data } = await getSupabase().from("profiles").select("first_name").eq("email", email).maybeSingle();
    if (data?.first_name) return data.first_name;
  }
  return "Student";
}

// Idempotent per transaction: the redirect, the webhook and any replayed
// request all call this, but a given tx_ref can only ever activate pro once
// (the payments row is claimed first; a duplicate is ignored).
export async function activatePremiumAndLog({ email, plan, txRef, expiresAt, amount }) {
  if (!supabaseEnabled()) return { activated: false };
  const sb = getSupabase();
  try {
    const claim = await sb.from("payments").insert({
      tx_ref: txRef, email, plan, amount: Number(amount) || 0, status: "successful",
    });
    if (claim.error) {
      if (claim.error.code === "23505" || /duplicate/i.test(claim.error.message || "")) return { activated: false, duplicate: true };
      throw claim.error;
    }
    const def = PLAN_DEFS[normalizePlan(plan)];
    let data;
    if (def) {
      // Per-exam Pro: add time to THAT exam only (extends from the current end date if it is still running).
      const cur = await sb.from("profiles").select("pro_exams,pro_all_until,expires_at").eq("email", email).maybeSingle();
      const exams = { ...((cur.data && cur.data.pro_exams) || {}) };
      const base = Math.max(Date.now(), exams[def.scope] ? new Date(exams[def.scope]).getTime() : 0);
      exams[def.scope] = new Date(base + def.days * 86400000).toISOString();
      const latest = Math.max(...Object.values(exams).map((x) => new Date(x).getTime()), cur.data?.pro_all_until ? new Date(cur.data.pro_all_until).getTime() : 0);
      const r = await sb.from("profiles").update({
        pro_exams: exams, is_premium: true, subscription_plan: normalizePlan(plan), subscribed_at: new Date().toISOString(),
        expires_at: new Date(latest).toISOString(), subscription_tx_ref: txRef,
      }).eq("email", email).select("email");
      if (r.error) {
        // The update-16 SQL has not been run yet: never lose a paid activation. Fall back to the old all-exams Pro.
        console.error("[premium] per-exam columns missing, using legacy activation:", r.error.message);
        const r2 = await sb.from("profiles").update({ is_premium: true, subscription_plan: "annual", subscribed_at: new Date().toISOString(), expires_at: expiresAt, subscription_tx_ref: txRef }).eq("email", email).select("email");
        data = r2.data;
      } else data = r.data;
    } else {
      const r = await sb.from("profiles").update({
        is_premium: true, subscription_plan: PLANS.includes(plan) ? plan : "annual", subscribed_at: new Date().toISOString(),
        expires_at: expiresAt, pro_all_until: expiresAt, subscription_tx_ref: txRef,
      }).eq("email", email).select("email");
      data = r.data;
    }
    if (!data?.length) console.error("[premium] paid but no profile row for", email);
    await recordCommission({ email, txRef, amount });
    return { activated: !!data?.length };
  } catch (e) {
    console.error("[premium] write failed:", e?.message);
    return { activated: false, error: true };
  }
}

// A group plan: the payer gets Pro for the year AND a group they can add members to
// (50 or 100 seats). Idempotent per transaction like activatePremiumAndLog.
export async function activateGroupAndLog({ email, plan, txRef, expiresAt, amount }) {
  if (!supabaseEnabled()) return { activated: false };
  const sb = getSupabase();
  try {
    const claim = await sb.from("payments").insert({ tx_ref: txRef, email, plan, amount: Number(amount) || 0, status: "successful" });
    if (claim.error) {
      if (claim.error.code === "23505" || /duplicate/i.test(claim.error.message || "")) return { activated: false, duplicate: true };
      throw claim.error;
    }
    const seats = plan === "group100" ? 100 : 50;
    const g = await sb.from("group_plans").insert({ owner_email: email, seats, plan, tx_ref: txRef, expires_at: expiresAt, amount: Number(amount) || 0 });
    if (g.error) throw g.error;
    await sb.from("profiles").update({
      is_premium: true, subscription_plan: "annual", subscribed_at: new Date().toISOString(), expires_at: expiresAt, pro_all_until: expiresAt, subscription_tx_ref: txRef,
    }).eq("email", email);
    await recordCommission({ email, txRef, amount });
    return { activated: true };
  } catch (e) {
    console.error("[premium] group write failed:", e?.message);
    return { activated: false, error: true };
  }
}

// { isPremium, plan, expiresAt, expiresStr, all, exams }  (exams = the per-exam Pro the student has right now)
export async function getPremiumStatus(email) {
  const none = { success: true, isPremium: false, plan: null, expiresAt: null, expiresStr: null, all: false, exams: {} };
  if (!supabaseEnabled()) return none;
  const sb = getSupabase();
  let r = await sb.from("profiles").select("subscription_plan,expires_at,pro_exams,pro_all_until").eq("email", email).maybeSingle();
  if (r.error) r = await sb.from("profiles").select("subscription_plan,expires_at").eq("email", email).maybeSingle();
  const data = r.data;
  if (!data) return none;
  const now = Date.now();
  const allUntil = data.pro_all_until !== undefined ? data.pro_all_until : data.expires_at;
  const all = !!allUntil && new Date(allUntil).getTime() > now;
  const exams = {};
  for (const [k, v] of Object.entries(data.pro_exams || {})) if (new Date(v).getTime() > now) exams[k] = new Date(v).getTime();
  if (!data.expires_at || !data.subscription_plan) return { ...none, all, exams };
  const exp = new Date(data.expires_at);
  const active = exp > new Date() && (all || Object.keys(exams).length > 0);
  const fmtD = (ms) => new Date(ms).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });
  return {
    success: true,
    isPremium: active,
    plan: active ? data.subscription_plan : null,
    expiresAt: active ? exp.getTime() : null,
    expiresStr: active ? fmtD(exp.getTime()) : null,
    all,
    exams,
    examsStr: Object.fromEntries(Object.entries(exams).map(([k, v]) => [k, fmtD(v)])),
  };
}

// A paid shop item: logged once per transaction, and the referring partner earns commission on it
// exactly like they do on Pro.
export async function logShopPurchase({ email, txRef, amount, itemId }) {
  if (!supabaseEnabled()) return { error: true };
  const sb = getSupabase();
  try {
    const claim = await sb.from("payments").insert({ tx_ref: txRef, email, plan: `shop:${itemId}`, amount: Number(amount) || 0, status: "successful" });
    if (claim.error) {
      if (claim.error.code === "23505" || /duplicate/i.test(claim.error.message || "")) return { duplicate: true };
      throw claim.error;
    }
    await recordCommission({ email, txRef, amount });
    return { ok: true };
  } catch (e) {
    console.error("[premium] shop write failed:", e?.message);
    return { error: true };
  }
}
