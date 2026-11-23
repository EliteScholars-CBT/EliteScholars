// Adsterra earnings for ALL time (?days=0). Every other range is handled by admin-ops.js ("ads-adsterra").
import { sendOk, sendErr, setCors } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { adminFromToken } from "./admin.js";
import adminOps from "./admin-ops.js";

const START = "2024-01-01"; // before the account existed, so this covers everything
let cache = null;

export default async function handler(req, res) {
  if (String(req.query.days) !== "0") { req.query = { ...req.query, op: "ads-adsterra" }; return adminOps(req, res); }
  setCors(res);
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  const who = adminFromToken((req.headers.authorization || "").replace(/^Bearer\s+/i, ""));
  if (!who) return sendErr(res, "Session expired. Please sign in again.", 401);
  if (!supabaseEnabled()) return sendErr(res, "Supabase is not configured.", 503);
  let perms = who.perms;
  if (!who.owner) {
    const { data: row } = await getSupabase().from("admin_users").select("active,perms").eq("id", who.id).maybeSingle();
    if (!row || !row.active) return sendErr(res, "Your admin access has been turned off.", 401);
    perms = Array.isArray(row.perms) ? row.perms : [];
  }
  if (!who.owner && !perms.includes("ads")) return sendErr(res, "You don't have access to that.", 403);
  const key = (process.env.ADSTERRA_API || process.env.ADSTERRA_API_KEY || "").trim();
  if (!key) return sendOk(res, { adsterra: { configured: false, message: "ADSTERRA_API is not set in Vercel (Settings → Environment Variables). Add it, then redeploy." } });
  const gb = ["date", "country", "placement", "domain", "device_type"].includes(String(req.query.group_by)) ? String(req.query.group_by) : "date";
  cache = cache || new Map();
  const hit = cache.get(gb);
  if (hit && Date.now() - hit.t < 5 * 60000) return sendOk(res, { adsterra: hit.v });
  const url = `https://api3.adsterratools.com/publisher/stats.json?start_date=${START}&finish_date=${new Date().toISOString().slice(0, 10)}&group_by=${gb}`;
  try {
    const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 20000);
    const r = await fetch(url, { headers: { "X-API-Key": key, Accept: "application/json" }, signal: ctl.signal }); clearTimeout(tm);
    const txt = await r.text(); let j = {}; try { j = JSON.parse(txt); } catch { /* not json */ }
    if (!r.ok) return sendOk(res, { adsterra: { configured: true, error: r.status === 401 || r.status === 403 ? "Adsterra rejected the API key (check the ADSTERRA_API value)." : `Adsterra answered ${r.status}: ${String(j.message || txt).slice(0, 160)}` } });
    const items = (Array.isArray(j.items) ? j.items : []).map((x) => ({ label: String(x.date || x.country || x.placement || x.domain || x.device_type || x.name || "—"), impressions: Number(x.impression ?? x.impressions ?? 0), clicks: Number(x.clicks || 0), ctr: Number(x.ctr || 0), cpm: Number(x.cpm || 0), revenue: Number(x.revenue || 0) }));
    const t = items.reduce((a, x) => ({ impressions: a.impressions + x.impressions, clicks: a.clicks + x.clicks, revenue: a.revenue + x.revenue }), { impressions: 0, clicks: 0, revenue: 0 });
    const v = { configured: true, days: 0, groupBy: gb, items, totals: { ...t, ctr: t.impressions ? (t.clicks / t.impressions) * 100 : 0, cpm: t.impressions ? (t.revenue / t.impressions) * 1000 : 0 } };
    cache.set(gb, { t: Date.now(), v });
    return sendOk(res, { adsterra: v });
  } catch (e) { return sendOk(res, { adsterra: { configured: true, error: "Could not reach Adsterra right now. Try again in a minute." } }); }
}
