// Ad settings the admin controls (stored in `settings`, key "ads").
// One object drives BOTH the blog and the app, so nothing needs a redeploy.
import { getSupabase, supabaseEnabled } from "./supabase.js";

// Our own paid-for promos (not Adsterra). Off until switched on in Admin → Ads → Our own ads.
export const DEFAULT_OWN_ADS = [
  { id: "affiliate-masterclass", enabled: false, title: "Earn ₦150k from Affiliate Marketing", desc: "Take the bold step today and start earning while you learn.", cta: "Join Masterclass →", image: "/images/ads/doxiee-affiliate-masterclass.jpg", link: "https://wa.me/2347052122350?text=Hello%2C%20I%20need%20the%20Affiliate%20Masterclass.%20I%20was%20referred%20by%20EliteScholars" },
  { id: "resumify", enabled: false, title: "50+ Remote Roles for Students!", desc: "Get a professional student resume today for just ₦5k and start getting offers.", cta: "Get Resume for ₦5k →", image: "/images/ads/resumeefy-student.jpg", link: "https://wa.me/2349093788218?text=Hello%2C%20I%20need%20the%20Student%20Resume%20service.%20I%20was%20referred%20by%20EliteScholars" },
  { id: "volt-accessories", enabled: false, title: "Power Your Lifestyle!", desc: "Reliable, stylish, affordable phone accessories: chargers, cases, AirPods, cables, power banks and more.", cta: "Order Now →", image: "/images/ads/volt-victory-accessories.jpg", link: "https://wa.me/2349034878935?text=Hello%2C%20I%20want%20to%20order%20phone%20accessories.%20I%20was%20referred%20by%20EliteScholars" },
  { id: "palmpay", enabled: false, title: "Open Your PalmPay Account Today!", desc: "Receive money from parents faster, buy airtime instantly and pay without stress.", cta: "Create PalmPay Account →", image: "/images/ads/palmpay-students.jpg", link: "https://info.palmpay.com/sP7ZEQrG" },
];

export const DEFAULT_ADS = {
  ownAds: DEFAULT_OWN_ADS,
  master: true,                 // false = no ads anywhere (house ads included)
  hideForPremium: true,         // pro students never see ads in the app
  units: {
    native:    { enabled: true, src: "https://pl29020764.profitableratecpmnetwork.com/ec0487cde03d79b75629df8828d753f9/invoke.js", containerId: "container-ec0487cde03d79b75629df8828d753f9" },
    socialBar: { enabled: true, src: "https://bauval.org/14/8e3a8cb51dbac0f09bcc9b94b5ea806c" },
  },
  blog: {
    enabled: true,
    socialBar: true,
    house: true,                // our own promos fill spots with no third-party ad
    slots: { top: true, inline: true, end: true, sidebar: true, feed: true, sticky: true },
  },
  app: {
    enabled: true,
    socialBar: true,
    house: true,
    learn: { enabled: true, everySections: 2, max: 3 },   // under every Nth text section while studying
    results: true,                                          // after a quiz result
  },
};

const bool = (v, d) => (typeof v === "boolean" ? v : d);
const int = (v, lo, hi, d) => { const n = Math.floor(Number(v)); return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : d; };
const url = (v, d) => { const s = String(v == null ? d : v).trim(); return /^(https:)?\/\/[^\s"'<>]{4,300}$/.test(s) ? s : ""; };
const cid = (v, d) => String(v == null ? d : v).replace(/[^A-Za-z0-9_-]/g, "").slice(0, 80);

const txt = (v, n) => String(v == null ? "" : v).replace(/[<>]/g, "").trim().slice(0, n);
const imgUrl = (v) => { const s = String(v || "").trim(); return /^(\/[A-Za-z0-9_./-]{2,200}|https:\/\/[^\s"'<>]{4,300})$/.test(s) ? s : ""; };
const linkUrl = (v) => { const s = String(v || "").trim(); return /^(https:\/\/[^\s"'<>]{4,600}|\/[A-Za-z0-9_./?=&%-]{1,200})$/.test(s) ? s : ""; };
function ownAds(list) {
  if (!Array.isArray(list)) return DEFAULT_OWN_ADS.map((x) => ({ ...x }));
  return list.slice(0, 12).map((a, i) => ({
    id: String((a && a.id) || `ad${i + 1}`).replace(/[^A-Za-z0-9_-]/g, "").slice(0, 40) || `ad${i + 1}`,
    enabled: !!(a && a.enabled), title: txt(a && a.title, 80), desc: txt(a && a.desc, 200), cta: txt(a && a.cta, 40) || "Open →",
    image: imgUrl(a && a.image), link: linkUrl(a && a.link),
  })).filter((a) => a.title && a.link);
}

export function sanitizeAds(v = {}) {
  const D = DEFAULT_ADS, u = v.units || {}, b = v.blog || {}, a = v.app || {}, bs = b.slots || {}, al = a.learn || {};
  return {
    master: bool(v.master, D.master),
    ownAds: ownAds(v.ownAds),
    hideForPremium: bool(v.hideForPremium, D.hideForPremium),
    units: {
      native: { enabled: bool(u.native && u.native.enabled, D.units.native.enabled), src: url(u.native && u.native.src, D.units.native.src), containerId: cid(u.native && u.native.containerId, D.units.native.containerId) },
      socialBar: { enabled: bool(u.socialBar && u.socialBar.enabled, D.units.socialBar.enabled), src: url(u.socialBar && u.socialBar.src, D.units.socialBar.src) },
    },
    blog: {
      enabled: bool(b.enabled, D.blog.enabled), socialBar: bool(b.socialBar, D.blog.socialBar), house: bool(b.house, D.blog.house),
      slots: Object.fromEntries(Object.keys(D.blog.slots).map((k) => [k, bool(bs[k], D.blog.slots[k])])),
    },
    app: {
      enabled: bool(a.enabled, D.app.enabled), socialBar: bool(a.socialBar, D.app.socialBar), house: bool(a.house, D.app.house),
      learn: { enabled: bool(al.enabled, D.app.learn.enabled), everySections: int(al.everySections, 1, 10, D.app.learn.everySections), max: int(al.max, 1, 10, D.app.learn.max) },
      results: bool(a.results, D.app.results),
    },
  };
}

let cache = { at: 0, v: null };
export function bustAdsCache() { cache = { at: 0, v: null }; }

export async function getAdsConfig() {
  if (cache.v && Date.now() - cache.at < 30000) return cache.v;
  let raw = {};
  if (supabaseEnabled()) {
    try { const { data } = await getSupabase().from("settings").select("value").eq("key", "ads").maybeSingle(); raw = (data && data.value) || {}; } catch { /* defaults */ }
  }
  cache = { at: Date.now(), v: sanitizeAds(raw) };
  return cache.v;
}
