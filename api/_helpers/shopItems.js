// The full shop catalogue = built-in items (constants/shop.js, prices from Admin → Prices)
// + items added in Admin → Shop (table shop_items). Where each item shows (app / blog /
// landing page) is controlled by flags; built-in flags live in settings.shop_flags.
import { getSupabase, supabaseEnabled } from "./supabase.js";
import { SHOP_ITEMS } from "./constants/shop.js";
import { getPricing, fmtNaira } from "./pricing.js";

const DEFAULT_FLAGS = { app: true, blog: false, landing: true, active: true };
export const mediaUrl = (id) => (id ? `/api/site/media?id=${encodeURIComponent(id)}` : null);

async function loadFlags(sb) {
  try { const { data } = await sb.from("settings").select("value").eq("key", "shop_flags").maybeSingle(); return (data && data.value) || {}; } catch { return {}; }
}

// All purchasable items (never the premium plan). `includeHidden` is for the admin list.
export async function getShopCatalog({ includeHidden = false } = {}) {
  const pr = await getPricing();
  const sb = supabaseEnabled() ? getSupabase() : null;
  const flags = sb ? await loadFlags(sb) : {};
  const out = [];
  for (const it of SHOP_ITEMS) {
    if (it.isPremium) continue;
    const f = { ...DEFAULT_FLAGS, ...(flags[it.id] || {}) };
    const price = pr.items[it.id];
    // Admin edits to a built-in item (title, description, picture…) are stored beside its visibility flags.
    const ov = flags[it.id] || {};
    const edited = {};
    if (typeof ov.title === "string" && ov.title) edited.title = ov.title;
    if (typeof ov.description === "string") edited.description = ov.description;
    if (typeof ov.category === "string" && ov.category) edited.category = ov.category;
    if (typeof ov.badge === "string") edited.badge = ov.badge || null;
    if (ov.imageId) { edited.imageUrl = mediaUrl(ov.imageId); edited.imageId = ov.imageId; }
    out.push({ ...it, ...edited, builtin: true, priceNGN: price, price: price ? fmtNaira(price) : it.price, show: { app: f.app, blog: f.blog, landing: f.landing }, active: f.active, sort: 0 });
  }
  if (sb) {
    try {
      const { data } = await sb.from("shop_items").select("*").order("sort", { ascending: true }).order("created_at", { ascending: false }).limit(300);
      for (const r of data || []) {
        out.push({
          id: r.id, title: r.title, description: r.description, category: r.category, badge: r.badge || null, link: r.link || null,
          image: null, imageUrl: mediaUrl(r.image_id), imageId: r.image_id || null,
          priceNGN: r.price_ngn, price: fmtNaira(r.price_ngn), builtin: false,
          show: { app: r.show_app, blog: r.show_blog, landing: r.show_landing }, active: r.active, sort: r.sort,
        });
      }
    } catch { /* table not created yet */ }
  }
  return includeHidden ? out : out.filter((i) => i.active);
}

export async function findShopItem(id, anyState = false) {
  if (typeof id !== "string") return null;
  const all = await getShopCatalog({ includeHidden: anyState });
  return all.find((i) => i.id === id) || null;
}

// What is safe to show the public: no delivery link for admin-added items.
export const publicItem = (i) => ({
  id: i.id, title: i.title, description: i.description, category: i.category, badge: i.badge || null, price: i.price, priceNGN: i.priceNGN,
  image: i.image || null, imageUrl: i.imageUrl || (i.image ? `/shop/${i.image}` : null), ...(i.builtin ? { link: i.link } : {}),
});
