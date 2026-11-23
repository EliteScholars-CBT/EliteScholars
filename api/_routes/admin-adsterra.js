// Adsterra earnings for the admin "Adsterra earnings" tab. GET /api/admin/ads-adsterra?range=today|week|month|lastmonth|all&group_by=...
// Dates follow Nigerian time. "All time" is fetched in 90-day pieces and joined, because one huge request is unreliable.
import { sendOk, sendErr, setCors } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { adminFromToken } from "./admin.js";

const H = 3600000, D = 86400000;
const ALL_FROM = "2025-01-01"; // before any traffic could have reached the account
const GROUPS = ["date", "country", "placement", "domain", "device_type"];
const RANGES = ["today", "week", "month", "lastmonth", "all"];
const lag = (ms) => new Date(ms + H).toISOString().slice(0, 10);
const addDays = (s, n) => lag(Date.parse(`${s}T00:00:00Z`) + n * D - H);

function resolve(range) {
  const today = lag(Date.now());
  if (range === "today") return { from: today, to: today, label: "Today" };
  if (range === "week") { const dow = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7; return { from: addDays(today, -dow), to: today, label: "This week (Mon to today)" }; }
  if (range === "lastmonth") { const first = `${today.slice(0, 7)}-01`; const to = addDays(first, -1); return { from: `${to.slice(0, 7)}-01`, to, label: "Last month" }; }
  if (range === "all") return { from: ALL_FROM, to: today, label: "All time" };
  return { from: `${today.slice(0, 7)}-01`, to: today, label: "This month" };
}

async function pull(key, from, to, gb) {
  const url = `https://api3.adsterratools.com/publisher/stats.json?start_date=${from}&finish_date=${to}&group_by=${gb}`;
  const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 20000);
  try {
    const r = await fetch(url, { headers: { "X-API-Key": key, Accept: "application/json" }, signal: ctl.signal });
    const txt = await r.text(); let j = {}; try { j = JSON.parse(txt); } catch { /* not json */ }
    if (!r.ok) { const e = new Error(r.status === 401 || r.status === 403 ? "Adsterra rejected the API key (check the ADSTERRA_API value)." : `Adsterra answered ${r.status}: ${String(j.message || txt).slice(0, 160)}`); e.shown = true; throw e; }
    return (Array.isArray(j.items) ? j.items : []).map((x) => ({ label: String(x.date || x.country || x.placement || x.domain || x.device_type || x.name || "—"), impressions: Number(x.impression ?? x.impressions ?? 0), clicks: Number(x.clicks || 0), revenue: Number(x.revenue || 0) }));
  } finally { clearTimeout(tm); }
}

export default async function handler(req, res) {
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

  const range = RANGES.includes(String(req.query.range)) ? String(req.query.range) : "month";
  const gb = GROUPS.includes(String(req.query.group_by)) ? String(req.query.group_by) : "date";
  const { from, to, label } = resolve(range);
  const ck = `${range}:${gb}:${to}`;
  globalThis.__adsterraCache2 = globalThis.__adsterraCache2 || new Map();
  const hit = globalThis.__adsterraCache2.get(ck);
  if (hit && Date.now() - hit.t < 5 * 60000) return sendOk(res, { adsterra: hit.v });

  try {
    // split into pieces of at most 90 days
    const pieces = [];
    for (let s = from; s <= to; ) { const e = addDays(s, 89) < to ? addDays(s, 89) : to; pieces.push([s, e]); s = addDays(e, 1); }
    const got = [];
    for (let i = 0; i < pieces.length; i += 3) got.push(...(await Promise.all(pieces.slice(i, i + 3).map(([a, b]) => pull(key, a, b, gb)))));
    const rows = got.flat();
    const map = new Map();
    for (const x of rows) { const o = map.get(x.label) || { label: x.label, impressions: 0, clicks: 0, revenue: 0 }; o.impressions += x.impressions; o.clicks += x.clicks; o.revenue += x.revenue; map.set(x.label, o); }
    let items = [...map.values()].map((o) => ({ ...o, ctr: o.impressions ? (o.clicks / o.impressions) * 100 : 0, cpm: o.impressions ? (o.revenue / o.impressions) * 1000 : 0 }));
    items = gb === "date" ? items.sort((a, b) => (a.label < b.label ? -1 : 1)) : items.sort((a, b) => b.revenue - a.revenue);
    const t = items.reduce((a, x) => ({ impressions: a.impressions + x.impressions, clicks: a.clicks + x.clicks, revenue: a.revenue + x.revenue }), { impressions: 0, clicks: 0, revenue: 0 });
    const v = { configured: true, range, rangeLabel: label, from, to, groupBy: gb, items, totals: { ...t, ctr: t.impressions ? (t.clicks / t.impressions) * 100 : 0, cpm: t.impressions ? (t.revenue / t.impressions) * 1000 : 0 } };
    globalThis.__adsterraCache2.set(ck, { t: Date.now(), v });
    return sendOk(res, { adsterra: v });
  } catch (e) {
    return sendOk(res, { adsterra: { configured: true, error: e && e.shown ? e.message : "Could not reach Adsterra right now. Try again in a minute." } });
  }
}
