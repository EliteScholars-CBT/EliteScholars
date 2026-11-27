// Admin Blog analytics: GET /api/admin/blog?days=7|30|90   (perm: blog)
// Reads, change since the period before, when people read (hour and weekday, Nigerian time),
// the latest reads, and per-post details. A "read" is one reader session on one post.
import { sendOk, sendErr, setCors } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { adminFromToken } from "./admin.js";

const H = 3600000, D = 86400000;
const lagosDay = (ms) => new Date(ms + H).toISOString().slice(0, 10);
const top = (obj, n = 8) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n).map(([name, count]) => ({ name, count }));
const hostOf = (r) => { if (!r || r === "direct") return "Direct"; try { return new URL(r).hostname.replace(/^www\./, ""); } catch { return String(r).slice(0, 40); } };

async function fetchPages(sb, cols, apply, maxPages) {
  const out = [];
  for (let i = 0; i < maxPages; i++) {
    let q = sb.from("events").select(cols);
    if (apply) q = apply(q);
    const { data, error } = await q.range(i * 1000, i * 1000 + 999);
    if (error) throw new Error(error.message);
    out.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return out;
}

async function blogStats(sb, days) {
  const now = Date.now();
  const since = new Date(now - (2 * days + 1) * D).toISOString(); // this period, the one before it, and a day of slack
  const rows = await fetchPages(sb, "type,payload,created_at", (q) => q.in("type", ["blog_page_view", "blog_session_end"]).gte("created_at", since).order("created_at", { ascending: false }), 60);

  // one session = one read
  const sessions = new Map();
  for (const r of rows) {
    const p = r.payload || {};
    const sid = p.sessionId || `${r.created_at}`;
    let s = sessions.get(sid);
    if (!s) { s = { post: p.postId || p.postTitle || "", title: p.postTitle || p.postId || "Unknown", category: p.category || "", device: p.device || "unknown", ref: hostOf(p.referrer), at: r.created_at, dur: 0, scroll: 0, ended: false }; sessions.set(sid, s); }
    if (r.type === "blog_session_end") { s.ended = true; s.dur = Math.max(s.dur, Number(p.durationSec) || 0); s.scroll = Math.max(s.scroll, Number(p.maxScrollPct) || 0); }
    if (r.created_at < s.at) s.at = r.created_at;
    if (!s.post && p.postId) s.post = p.postId;
    if (s.title === "Unknown" && p.postTitle) s.title = p.postTitle;
  }

  const startThis = now - days * D, startPrev = now - 2 * days * D;
  const todayKey = lagosDay(now), yestKey = lagosDay(now - D);
  const all = [...sessions.values()];
  const cur = all.filter((s) => new Date(s.at).getTime() >= startThis);
  const prevViews = all.filter((s) => { const t = new Date(s.at).getTime(); return t >= startPrev && t < startThis; }).length;
  let today = 0, yesterday = 0;
  for (const s of all) { const k = lagosDay(new Date(s.at).getTime()); if (k === todayKey) today++; else if (k === yestKey) yesterday++; }

  const posts = new Map();
  const dayViews = {}, devices = {}, refs = {}, cats = {};
  const hours = new Array(24).fill(0), weekdays = new Array(7).fill(0);
  for (const s of cur) {
    const key = s.post || s.title;
    let po = posts.get(key);
    if (!po) { po = { id: key, title: s.title, category: s.category, views: 0, ended: 0, dur: 0, scroll: 0, finished: 0, devices: {}, refs: {}, days: {}, last: s.at }; posts.set(key, po); }
    po.views++; po.devices[s.device] = (po.devices[s.device] || 0) + 1; po.refs[s.ref] = (po.refs[s.ref] || 0) + 1;
    if (s.at > po.last) po.last = s.at;
    const t = new Date(s.at).getTime(), l = new Date(t + H);
    const d = l.toISOString().slice(0, 10);
    po.days[d] = (po.days[d] || 0) + 1; dayViews[d] = (dayViews[d] || 0) + 1;
    hours[l.getUTCHours()]++; weekdays[(l.getUTCDay() + 6) % 7]++;
    if (s.ended) { po.ended++; po.dur += s.dur; po.scroll += s.scroll; if (s.scroll >= 80) po.finished++; }
    devices[s.device] = (devices[s.device] || 0) + 1; refs[s.ref] = (refs[s.ref] || 0) + 1;
    if (s.category) cats[s.category] = (cats[s.category] || 0) + 1;
  }
  const list = [...posts.values()].map((p) => ({
    id: p.id, title: p.title, category: p.category, views: p.views, last: p.last,
    avgSeconds: p.ended ? Math.round(p.dur / p.ended) : 0, avgScroll: p.ended ? Math.round(p.scroll / p.ended) : 0,
    finishRate: p.ended ? Math.round((p.finished / p.ended) * 100) : 0,
    devices: top(p.devices, 4), referrers: top(p.refs, 5), days: Object.entries(p.days).sort(([a], [b]) => (a < b ? -1 : 1)).slice(-14).map(([day, views]) => ({ day, views })),
  })).sort((a, b) => b.views - a.views);

  const ended = cur.filter((s) => s.ended);
  const labels = [];
  for (let i = days - 1; i >= 0; i--) labels.push(lagosDay(now - i * D));
  const recent = [...cur].sort((a, b) => (a.at < b.at ? 1 : -1)).slice(0, 30)
    .map((s) => ({ at: s.at, id: s.post, title: s.title, device: s.device, source: s.ref, seconds: s.ended ? s.dur : null, scroll: s.ended ? s.scroll : null }));
  return {
    days, totalViews: cur.length, prevViews, today, yesterday,
    avgSeconds: ended.length ? Math.round(ended.reduce((a, s) => a + s.dur, 0) / ended.length) : 0,
    finishRate: ended.length ? Math.round((ended.filter((s) => s.scroll >= 80).length / ended.length) * 100) : 0,
    series: { labels: labels.map((l) => l.slice(5)), values: labels.map((l) => dayViews[l] || 0) },
    hours, weekdays, recent,
    devices: top(devices, 4), referrers: top(refs, 8), categories: top(cats, 8), posts: list.slice(0, 120),
    truncated: rows.length >= 60000,
  };
}

export default async function handler(req, res) {
  setCors(res);
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  const who = adminFromToken((req.headers.authorization || "").replace(/^Bearer\s+/i, ""));
  if (!who) return sendErr(res, "Session expired. Please sign in again.", 401);
  if (!supabaseEnabled()) return sendErr(res, "Supabase is not configured.", 503);
  if (!who.owner && !(who.perms || []).includes("blog")) return sendErr(res, "You don't have access to that.", 403);
  try {
    const days = [7, 30, 90].includes(Number(req.query.days)) ? Number(req.query.days) : 30;
    return sendOk(res, { blog: await blogStats(getSupabase(), days) });
  } catch (e) {
    console.error("[admin-blog]", e && e.message);
    return sendErr(res, "Could not load blog stats.", 500);
  }
}
