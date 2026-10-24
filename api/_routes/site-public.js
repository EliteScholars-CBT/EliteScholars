// Public (no login) endpoints for the marketing pages.
//   GET/POST /api/site/school-info  -> live school plan: trial days + price tiers
//   GET      /api/site/config       -> ad settings (what the blog and the app should show)
//   POST     /api/site/school-demo  { name, school, phone, email, students, message } -> emails the admin
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getPricing } from "../_helpers/pricing.js";
import { getAdsConfig } from "../_helpers/adsConfig.js";
import { getSettings as getPartnerSettings } from "../_helpers/partners.js";
import { getShopCatalog, publicItem } from "../_helpers/shopItems.js";
import { getSupabase } from "../_helpers/supabase.js";
import { notifyAdmin } from "../_helpers/mail.js";
import { insertRow, supabaseEnabled } from "../_helpers/supabase.js";

const clean = (v, n) => String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/\s+/g, " ").trim().slice(0, n);

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  const op = String(req.query?.op || "");

  if (op === "config") {
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60");
    let partnerRate = 40;
    try { if (supabaseEnabled()) partnerRate = (await getPartnerSettings()).defaultRate || 40; } catch { /* default */ }
    return sendOk(res, { ads: await getAdsConfig(), partnerRate });
  }

  if (op === "shop") {
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60");
    const where = ["landing", "blog", "app"].includes(String(req.query?.where)) ? String(req.query.where) : "landing";
    let items = [];
    try { items = (await getShopCatalog()).filter((i) => i.show[where]).slice(0, 24).map(publicItem); } catch { /* none */ }
    return sendOk(res, { items });
  }

  if (op === "blog-covers") {
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60");
    let map = {};
    try { const { data } = await getSupabase().from("settings").select("value").eq("key", "blog_covers").maybeSingle(); map = (data && data.value) || {}; } catch { /* none */ }
    const out = {};
    for (const [k, v] of Object.entries(map)) out[k] = `/api/site/media?id=${encodeURIComponent(v)}`;
    return sendOk(res, { covers: out });
  }

  if (op === "media") {
    // Only images uploaded from Admin → Shop / Blog covers are public.
    const id = String(req.query?.id || "");
    if (!/^[0-9a-f-]{36}$/i.test(id) || !supabaseEnabled()) return res.status(404).end();
    const { data } = await getSupabase().from("media").select("data,email").eq("id", id).maybeSingle();
    const m = data && (data.email === "shop-admin" || data.email === "blog-admin") && /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(data.data);
    if (!m) return res.status(404).end();
    res.setHeader("Content-Type", m[1]);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.status(200).send(Buffer.from(m[2], "base64"));
  }

  if (op === "school-info") {
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60");
    const p = await getPricing();
    return sendOk(res, { trialDays: p.school.trialDays, period: p.school.period, tiers: p.school.tiers });
  }

  if (op === "school-demo") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    if (!(await rateLimitOk(req, res, "school-demo", 5, 3600))) return;
    const b = readBody(req);
    const name = clean(b.name, 80), school = clean(b.school, 120), phone = clean(b.phone, 30), email = clean(b.email, 120);
    const students = clean(b.students, 20), message = clean(b.message, 600);
    if (b.website) return sendOk(res, {}); // honeypot: bots fill this, people never see it
    if (name.length < 2 || school.length < 2) return sendErr(res, "Please add your name and your school's name.");
    if (!/^\+?[0-9 ()-]{7,20}$/.test(phone) && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return sendErr(res, "Add a phone number or an email so we can reach you.");
    try { if (supabaseEnabled()) await insertRow("events", { type: "school_demo_request", payload: { name, school, phone, email, students, message } }); } catch { /* logging only */ }
    try {
      await notifyAdmin(`School demo request: ${school}`, `${name} from ${school} wants a demo.`, {
        emoji: "🏫",
        rows: [["Name", name], ["School", school], ["Phone", phone || "-"], ["Email", email || "-"], ["Students", students || "-"], ["Message", message || "-"]],
      });
    } catch { /* admin email is best effort */ }
    return sendOk(res, { message: "Thanks! We'll contact you within 24 hours." });
  }
  return sendErr(res, "Unknown route.", 404);
}
