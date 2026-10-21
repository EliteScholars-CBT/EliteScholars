// api/_helpers/premium.js — premium activation + payment logging (Supabase only).
import { getSupabase, supabaseEnabled } from "./supabase.js";
import { recordCommission } from "./partners.js";

const PLANS = ["annual", "pro"];

export async function getFirstName(email) {
  if (supabaseEnabled()) {
    const { data } = await getSupabase().from("profiles").select("first_name").eq("email", email).maybeSingle();
    if (data?.first_name) return data.first_name;
  }
  return "Student";
}

// Idempotent per transaction: the redirect, the webhook and any replayed
// request all call this, but a given tx_ref can only ever activate premium once
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
    const { data } = await sb.from("profiles").update({
      is_premium: true,
      subscription_plan: PLANS.includes(plan) ? plan : "annual",
      subscribed_at: new Date().toISOString(),
      expires_at: expiresAt,
      subscription_tx_ref: txRef,
    }).eq("email", email).select("email");
    if (!data?.length) console.error("[premium] paid but no profile row for", email);
    await recordCommission({ email, txRef, amount });
    return { activated: !!data?.length };
  } catch (e) {
    console.error("[premium] write failed:", e?.message);
    return { activated: false, error: true };
  }
}

// { isPremium, plan, expiresAt, expiresStr }
export async function getPremiumStatus(email) {
  const none = { success: true, isPremium: false, plan: null, expiresAt: null, expiresStr: null };
  if (!supabaseEnabled()) return none;
  const { data, error } = await getSupabase().from("profiles").select("subscription_plan,expires_at").eq("email", email).maybeSingle();
  if (error || !data || !data.expires_at || !data.subscription_plan) return none;
  const exp = new Date(data.expires_at);
  const active = exp > new Date();
  return {
    success: true,
    isPremium: active,
    plan: active ? data.subscription_plan : null,
    expiresAt: active ? exp.getTime() : null,
    expiresStr: active ? exp.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" }) : null,
  };
}

// A paid shop item: logged once per transaction, and the referring partner earns commission on it
// exactly like they do on Premium.
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
