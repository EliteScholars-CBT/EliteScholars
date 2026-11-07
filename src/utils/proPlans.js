// proPlans.js — Pro is sold per exam area. Prices come from the server (admin can change them); these are only fallbacks.
//   JAMB Pro       3,000 / year
//   WAEC & NECO    5,000 / 6 months   or  8,000 / year
//   GST            5,000 / 6 months   or  8,000 / year
// Pro for one area never unlocks another: other exams stay on the free tier.
import { scopeForExam } from './entitlement';

export const PRO_PRODUCTS = [
  {
    scope: 'jamb', label: 'JAMB Pro', emoji: '🎯', color: '#FFC53D', glow: 'rgba(255,197,61,0.30)',
    pitch: 'Unlimited JAMB practice for a full year.',
    options: [{ id: 'jamb', period: '1 year', fallback: 3000 }],
    features: ['Unlimited JAMB CBT & topics', 'Learn, flashcards & games', 'No ads · offline access'],
  },
  {
    scope: 'waec_neco', label: 'WAEC & NECO Pro', emoji: '📘', color: '#38BDF8', glow: 'rgba(56,189,248,0.28)',
    pitch: 'One plan covers both WAEC and NECO.',
    options: [{ id: 'waecneco6', period: '6 months', fallback: 5000 }, { id: 'waecneco12', period: '1 year', fallback: 8000 }],
    features: ['Unlimited WAEC & NECO CBT', 'Learn, flashcards & games', 'No ads · offline access'],
  },
  {
    scope: 'gst', label: 'GST Pro', emoji: '🎓', color: '#A78BFA', glow: 'rgba(167,139,250,0.30)',
    pitch: 'Protect your CGPA. All GST courses, unlimited.',
    options: [{ id: 'gst6', period: '6 months', fallback: 5000 }, { id: 'gst12', period: '1 year', fallback: 8000 }],
    features: ['Unlimited GST CBT & topics', 'Learn, flashcards & games', 'No ads · offline access'],
  },
];

export const productFor = (scope) => PRO_PRODUCTS.find((p) => p.scope === scope) || PRO_PRODUCTS[0];
export const productOfPlan = (planId) => PRO_PRODUCTS.find((p) => p.options.some((o) => o.id === (planId === 'annual' ? 'jamb' : planId))) || null;
export const defaultScope = (exam) => scopeForExam(exam) || 'jamb';
export function priceOf(pricing, opt) {
  const v = (pricing && pricing.plans && pricing.plans[opt.id]) ?? (opt.id === 'jamb' ? pricing && pricing.premiumAnnual : undefined);
  return Number(v) > 0 ? Number(v) : opt.fallback;
}
export const SCOPE_NAME = { jamb: 'JAMB', waec_neco: 'WAEC & NECO', gst: 'GST' };
export const PLAN_LABEL = { annual: 'JAMB Pro (1 year)', jamb: 'JAMB Pro (1 year)', waecneco6: 'WAEC & NECO Pro (6 months)', waecneco12: 'WAEC & NECO Pro (1 year)', gst6: 'GST Pro (6 months)', gst12: 'GST Pro (1 year)' };

// Cards are shown in the order that suits the student: their own exam first.
//   JAMB candidate      -> JAMB, WAEC & NECO, GST
//   WAEC / NECO student -> WAEC & NECO, JAMB, GST
//   University (GST)    -> GST, JAMB, WAEC & NECO
export function orderedProducts(exam) {
  const first = scopeForExam(exam) || 'waec_neco';
  const rest = { jamb: ['waec_neco', 'gst'], waec_neco: ['jamb', 'gst'], gst: ['jamb', 'waec_neco'] }[first];
  return [first, ...rest].map((sc) => PRO_PRODUCTS.find((p) => p.scope === sc)).filter(Boolean);
}
