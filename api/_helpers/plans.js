// api/_helpers/plans.js — the Pro products. Each unlocks ONE exam area; everything else stays on the free tier.
//   scope "jamb"       JAMB
//   scope "waec_neco"  WAEC and NECO together
//   scope "gst"        GST (university)
export const SCOPES = ["jamb", "waec_neco", "gst"];

export const PLAN_DEFS = {
  jamb:       { scope: "jamb",      days: 365, name: "JAMB Pro (1 year)",         priceKey: "jamb",       defaultPrice: 3000 },
  waecneco6:  { scope: "waec_neco", days: 183, name: "WAEC & NECO Pro (6 months)", priceKey: "waecneco6",  defaultPrice: 5000 },
  waecneco12: { scope: "waec_neco", days: 365, name: "WAEC & NECO Pro (1 year)",   priceKey: "waecneco12", defaultPrice: 8000 },
  gst6:       { scope: "gst",       days: 183, name: "GST Pro (6 months)",         priceKey: "gst6",       defaultPrice: 5000 },
  gst12:      { scope: "gst",       days: 365, name: "GST Pro (1 year)",           priceKey: "gst12",      defaultPrice: 8000 },
};
// Old checkouts / cached apps still say "annual": that used to be the JAMB-priced Pro.
export const normalizePlan = (p) => (p === "annual" ? "jamb" : p);
export const isScopedPlan = (p) => !!PLAN_DEFS[normalizePlan(p)];

// exam type chosen in the app -> scope
export const scopeForExam = (exam) => {
  const e = String(exam || "").toLowerCase();
  if (e === "jamb") return "jamb";
  if (e === "waec" || e === "neco" || e === "waec_neco" || e === "waecneco") return "waec_neco";
  if (e === "gst") return "gst";
  return null;
};

// Squad plans: one payer, one year, up to `seats` people, Pro for ONE exam area. group50 / group100 are the JAMB squads
// (their price is the base); WAEC & NECO and GST squads follow the same discount JAMB gets over its individual price.
export const GROUP_DEFS = {
  group50:      { scope: "jamb",      seats: 50,  base: "jamb",       label: "JAMB" },
  group100:     { scope: "jamb",      seats: 100, base: "jamb",       label: "JAMB" },
  group50_waec: { scope: "waec_neco", seats: 50,  base: "waecneco12", label: "WAEC & NECO" },
  group100_waec:{ scope: "waec_neco", seats: 100, base: "waecneco12", label: "WAEC & NECO" },
  group50_gst:  { scope: "gst",       seats: 50,  base: "gst12",      label: "GST" },
  group100_gst: { scope: "gst",       seats: 100, base: "gst12",      label: "GST" },
};
export const isGroupPlan = (p) => !!GROUP_DEFS[p];
