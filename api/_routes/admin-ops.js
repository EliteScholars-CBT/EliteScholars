// Admin tools beyond analytics. All GET/POST /api/admin/<op>, Bearer admin token.
//   me, alerts                      any signed-in admin
//   students, student               perm: students
//   activity                        perm: students
//   blog                            perm: blog
//   sources                         perm: analytics (traffic sources, optional ?ref=PARTNERCODE)
//   team, team-save, team-reset, team-delete   owner only (sub-admins and their permissions)
//   prices, prices-save, school-plans, school-settings, school-account   perm: prices / schools
//   audit                           owner only
import crypto from "crypto";
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { getAdsConfig, sanitizeAds, bustAdsCache } from "../_helpers/adsConfig.js";
import { getShopCatalog, getRemovedBuiltins } from "../_helpers/shopItems.js";
import { saveMedia } from "../_helpers/media.js";
import { whereLabel } from "../_helpers/security.js";
import { adminFromToken, ADMIN_PERMS, ROLE_TEMPLATES } from "./admin.js";
import { hashPasswordStrong } from "../_helpers/hash.js";
import { sendHtml } from "../_helpers/mail.js";
import { subAdminWelcomeEmail } from "../_helpers/emailTemplates.js";
import { getPricing, bustPricingCache, DEFAULT_SCHOOL, tierFor } from "../_helpers/pricing.js";
import { SHOP_ITEMS } from "../_helpers/constants/shop.js";
import { accountStatus } from "../_helpers/schoolPlan.js";
import { poolDiagnostics, loadKeys, callKey } from "../_helpers/aiPool.js";

const MIN = 60000, H = 3600000, D = 86400000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v, n) => String(v || "").replace(/[\u0000-\u001F]/g, "").trim().slice(0, n);
const iso = (v) => { const t = new Date(v).getTime(); return Number.isFinite(t) ? new Date(t).toISOString() : null; };
const genPassword = () => {
  const A = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from({ length: 12 }, () => A[crypto.randomInt(A.length)]).join("");
};
const safeRegex = (s) => String(s || "").replace(/[%,()*]/g, " ").trim().slice(0, 60);

async function audit(sb, who, action, detail) {
  try { await sb.from("admin_audit").insert({ admin_name: who.name, action, detail: String(detail || "").slice(0, 400) }); } catch { /* best effort */ }
}

const SORTS = { last_seen: "last_active", xp: "total_xp", joined: "created_at", streak: "current_streak", quizzes: "quizzes_taken", level: "level", login: "last_login" };

function studentFilters(q, query) {
  const text = safeRegex(query.q);
  if (text) q = q.or(`email.ilike.%${text}%,username.ilike.%${text}%,first_name.ilike.%${text}%,last_name.ilike.%${text}%`);
  const now = Date.now();
  const seen = String(query.seen || "");
  const win = { online: 15 * MIN, "1h": H, "24h": D, "7d": 7 * D, "30d": 30 * D }[seen];
  if (win) q = q.gte("last_active", new Date(now - win).toISOString());
  if (seen === "inactive7d") q = q.or(`last_active.is.null,last_active.lt.${new Date(now - 7 * D).toISOString()}`);
  if (seen === "inactive30d") q = q.or(`last_active.is.null,last_active.lt.${new Date(now - 30 * D).toISOString()}`);
  if (seen === "never") q = q.is("last_active", null);
  const f = iso(query.seenFrom), t = iso(query.seenTo);
  if (f) q = q.gte("last_active", f);
  if (t) q = q.lte("last_active", t);
  const jf = iso(query.joinedFrom), jt = iso(query.joinedTo);
  if (jf) q = q.gte("created_at", jf);
  if (jt) q = q.lte("created_at", jt);
  if (query.minXp !== undefined && query.minXp !== "" && Number.isFinite(Number(query.minXp))) q = q.gte("total_xp", Number(query.minXp));
  if (query.maxXp !== undefined && query.maxXp !== "" && Number.isFinite(Number(query.maxXp))) q = q.lte("total_xp", Number(query.maxXp));
  if (query.premium === "yes") q = q.gt("expires_at", new Date(now).toISOString());
  if (query.premium === "no") q = q.or(`expires_at.is.null,expires_at.lt.${new Date(now).toISOString()}`);
  if (query.type) q = q.eq("student_type", String(query.type).slice(0, 20));
  return q;
}

const studentRow = (p) => ({
  email: p.email, name: [p.first_name, p.last_name].filter(Boolean).join(" ") || p.username || p.email.split("@")[0], username: p.username || "",
  level: p.level, xp: p.total_xp, streak: p.current_streak, bestStreak: p.best_streak, quizzes: p.quizzes_taken,
  accuracy: p.total_questions ? Math.round((p.total_correct / p.total_questions) * 100) : null,
  lastActive: p.last_active, lastLogin: p.last_login, joined: p.created_at, type: p.student_type,
  premium: !!(p.expires_at && new Date(p.expires_at) > new Date()), plan: p.subscription_plan, expiresAt: p.expires_at,
});

// Plain-English one-liners for the activity timeline
const EVENT_LABEL = {
  quiz_start: "Started a quiz", quiz_complete: "Finished a quiz", signup: "Signed up", login: "Logged in", premium_modal_open: "Looked at Pro",
  learn_open: "Opened a Learn topic", status_post: "Posted a status", status_reply: "Replied to a status", status_reply_back: "Answered a reply on their status", status_blocked: "Tried to post a blocked status", game_start: "Started a game", game_over: "Finished a game", share: "Shared something", pwa_installed: "Installed the app",
};
const labelEvent = (e) => {
  const p = e.payload || {};
  if (e.type === "file_upload") return `Uploaded a file to study${p.n ? ` (upload #${p.n})` : ""}${p.fileName ? ` — ${p.fileName}` : ""}${p.engine ? ` · ${p.engine === "ai" ? "AI" : "quick"} rewrite` : ""}`;
  const base = EVENT_LABEL[e.type] || String(e.type).replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
  if (e.type === "referral_link_opened") return `Opened a partner link${p.code || p.referral_code ? ` (${p.code || p.referral_code})` : ""}${p.partner ? ` — ${p.partner}` : ""}`;
  if (e.type === "register") return `Signed up${p.code ? ` via partner ${p.partner ? p.partner + " " : ""}(${p.code})` : ""}`;
  if (e.type === "referral_signup") return `Signed up through a partner link${p.referred_by ? ` (${p.referred_by})` : ""}`;
  if (e.type === "status_post") return `Posted a status (${p.privacy || "squad"}${p.photo ? ", with photo" : ""})${p.preview ? ` — "${p.preview}"` : ""}`;
  if (e.type === "status_reply" || e.type === "status_reply_back") return `${EVENT_LABEL[e.type]}${p.to ? ` by ${p.to}` : ""}${p.preview ? ` — "${p.preview}"` : ""}`;
  if (e.type === "content_blocked") return `Blocked: tried to post ${({ explicit: "explicit words", scam: "a money / scam offer", link: "a link", phone: "a phone number" })[String(p.flag).replace(/^photo:/, "")] || p.flag || "something not allowed"} in ${whereLabel(p.where)}${p.text ? ` — "${String(p.text).slice(0, 60)}"` : ""}`;
  if (e.type === "status_blocked") return `Tried to post a blocked status (${p.flag || "flagged"})`;
  const extra = [p.subject, p.exam, p.topic, p.score !== undefined ? `score ${p.score}` : "", p.postTitle].filter(Boolean).join(" · ");
  return extra ? `${base} — ${extra}` : base;
};

async function timeline(sb, email, limit = 120) {
  const [ev, xp, ch1, ch2, pay, st, as] = await Promise.all([
    sb.from("events").select("type,payload,created_at").eq("email", email).order("created_at", { ascending: false }).limit(limit),
    sb.from("xp_events").select("amount,reason,created_at").eq("email", email).order("created_at", { ascending: false }).limit(60),
    sb.from("challenges").select("challenger_name,opponent_name,subject,status,created_at").eq("challenger_email", email).order("created_at", { ascending: false }).limit(20),
    sb.from("challenges").select("challenger_name,opponent_name,subject,status,created_at").eq("opponent_email", email).order("created_at", { ascending: false }).limit(20),
    sb.from("payments").select("plan,amount,created_at,status").eq("email", email).order("created_at", { ascending: false }).limit(20),
    sb.from("statuses").select("privacy,created_at").eq("email", email).order("created_at", { ascending: false }).limit(10),
    sb.from("assignment_done").select("created_at").eq("email", email).order("created_at", { ascending: false }).limit(10),
  ]);
  const out = [];
  for (const e of ev.data || []) out.push({ at: e.created_at, kind: "event", text: labelEvent(e) });
  for (const x of xp.data || []) out.push({ at: x.created_at, kind: "xp", text: `${x.amount >= 0 ? "+" : ""}${x.amount} XP${x.reason ? ` — ${x.reason}` : ""}` });
  for (const c of ch1.data || []) out.push({ at: c.created_at, kind: "challenge", text: `Challenged ${c.opponent_name || "a friend"}${c.subject ? ` in ${c.subject}` : ""} (${c.status})` });
  for (const c of ch2.data || []) out.push({ at: c.created_at, kind: "challenge", text: `Was challenged by ${c.challenger_name || "a friend"}${c.subject ? ` in ${c.subject}` : ""} (${c.status})` });
  for (const p of pay.data || []) out.push({ at: p.created_at, kind: "payment", text: `Payment ₦${Number(p.amount).toLocaleString("en-NG")} — ${p.plan} (${p.status})` });
  for (const s of st.data || []) out.push({ at: s.created_at, kind: "status", text: `Posted a status (${s.privacy})` });
  for (const a of as.data || []) out.push({ at: a.created_at, kind: "school", text: "Completed an assignment" });
  return out.filter((x) => x.at).sort((a, b) => new Date(b.at) - new Date(a.at));
}

async function fetchPages(sb, table, cols, apply, maxPages = 30) {
  const out = [];
  for (let i = 0; i < maxPages; i++) {
    let q = sb.from(table).select(cols);
    if (apply) q = apply(q);
    const { data, error } = await q.range(i * 1000, i * 1000 + 999);
    if (error) throw new Error(error.message);
    out.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return out;
}

const top = (obj, n = 8) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n).map(([name, count]) => ({ name, count }));
const hostOf = (r) => { if (!r || r === "direct") return "Direct"; try { return new URL(r).hostname.replace(/^www\./, ""); } catch { return String(r).slice(0, 40); } };

// Traffic sources: visits (visit_source) and sign-ups (signup_source) by channel, optionally for one partner code.
async function sourceStats(sb, days, ref) {
  const since = new Date(Date.now() - days * D).toISOString();
  const rows = await fetchPages(sb, "events", "type,payload,created_at", (q) => {
    let x = q.in("type", ["visit_source", "signup_source"]).gte("created_at", since);
    if (ref) x = x.eq("payload->>ref", ref);
    return x;
  }, 40);
  const by = {}, byPage = {}, byRef = {}, perDay = {}, byCamp = {};
  const bump = (o, k, f) => { (o[k] = o[k] || { visits: 0, signups: 0 })[f]++; };
  const dayKey = (iso) => new Date(new Date(iso).getTime() + 3600000).toISOString().slice(0, 10);
  let visits = 0, signups = 0;
  for (const r of rows) {
    const p = r.payload || {};
    const src = String(p.source || "direct").slice(0, 40);
    const f = r.type === "visit_source" ? "visits" : "signups";
    if (f === "visits") visits++; else signups++;
    bump(by, src, f);
    if (f === "visits") byPage[p.page || "page"] = (byPage[p.page || "page"] || 0) + 1;
    if (p.ref) bump(byRef, String(p.ref), f);
    if (p.campaign) bump(byCamp, `${src} · ${String(p.campaign).slice(0, 40)}`, f);
    const d = dayKey(r.created_at); perDay[d] = (perDay[d] || 0) + (f === "visits" ? 1 : 0);
  }
  const list = (o) => Object.entries(o).map(([name, v]) => ({ name, visits: v.visits, signups: v.signups, rate: v.visits ? Math.round((v.signups / v.visits) * 1000) / 10 : 0 })).sort((a, b) => b.visits + b.signups - (a.visits + a.signups));
  const labels = [], values = [];
  for (let i = days - 1; i >= 0; i--) { const d = dayKey(new Date(Date.now() - i * D).toISOString()); labels.push(d.slice(5)); values.push(perDay[d] || 0); }
  return { days, ref: ref || "", visits, signups, sources: list(by), partners: list(byRef).slice(0, 25), campaigns: list(byCamp).slice(0, 40), pages: Object.entries(byPage).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count), series: { labels, values }, truncated: rows.length >= 40000 };
}

// Ad analytics from our own events. (Adsterra's earnings are only in their dashboard.)
async function adStats(sb, days) {
  const since = new Date(Date.now() - days * D).toISOString();
  const rows = await fetchPages(sb, "events", "type,payload,created_at", (q) => q.in("type", ["ad_impression", "ad_click", "ad_ad_impression", "ad_ad_click", "blog_ad_view", "blog_ad_click"]).gte("created_at", since), 40);
  const dayKey = (iso) => new Date(new Date(iso).getTime() + 3600000).toISOString().slice(0, 10);
  const place = {}, perDay = {};
  const bump = (name, surface, kind, f) => { const o = (place[`${surface}|${name}|${kind}`] = place[`${surface}|${name}|${kind}`] || { surface, name, kind, views: 0, clicks: 0 }); o[f]++; };
  let appViews = 0, blogViews = 0, clicks = 0;
  for (const r of rows) {
    const p = r.payload || {};
    const d = dayKey(r.created_at);
    // the app saves these as "ad_ad_impression" / "ad_ad_click" (batch kind + event name); older rows may have no prefix
    if (r.type === "ad_ad_impression") r.type = "ad_impression"; else if (r.type === "ad_ad_click") r.type = "ad_click";
    if (r.type === "ad_impression") { appViews++; bump(String(p.adId || "app"), "App", String(p.adType || "ad"), "views"); (perDay[d] = perDay[d] || { app: 0, blog: 0 }).app++; }
    else if (r.type === "blog_ad_view") { blogViews++; bump(String(p.slot || "slot"), "Blog", String(p.kind === "adsterra" ? "Adsterra" : "Own ad"), "views"); (perDay[d] = perDay[d] || { app: 0, blog: 0 }).blog++; }
    else { clicks++; bump(String(p.adId || p.slot || p.ad || "ad"), r.type === "ad_click" ? "App" : "Blog", String(p.adType || p.kind || "ad"), "clicks"); }
  }
  const labels = [], app = [], blog = [];
  for (let i = days - 1; i >= 0; i--) { const d = dayKey(new Date(Date.now() - i * D).toISOString()); labels.push(d.slice(5)); app.push((perDay[d] || {}).app || 0); blog.push((perDay[d] || {}).blog || 0); }
  return { days, appViews, blogViews, clicks, placements: Object.values(place).sort((a, b) => b.views - a.views), series: { labels, app, blog }, truncated: rows.length >= 40000 };
}

async function blogStats(sb, days) {
  const since = new Date(Date.now() - days * D).toISOString();
  const rows = await fetchPages(sb, "events", "type,payload,created_at", (q) => q.in("type", ["blog_page_view", "blog_session_end"]).gte("created_at", since), 40);
  const sessions = new Map();
  for (const r of rows) {
    const p = r.payload || {};
    const sid = p.sessionId || `${r.created_at}`;
    let s = sessions.get(sid);
    if (!s) { s = { post: p.postId || p.postTitle || "", title: p.postTitle || p.postId || "Unknown", category: p.category || "", device: p.device || "unknown", ref: hostOf(p.referrer), at: r.created_at, dur: 0, scroll: 0, ended: false }; sessions.set(sid, s); }
    if (r.type === "blog_session_end") { s.ended = true; s.dur = Math.max(s.dur, Number(p.durationSec) || 0); s.scroll = Math.max(s.scroll, Number(p.maxScrollPct) || 0); }
    if (r.created_at < s.at) s.at = r.created_at;
  }
  const posts = new Map();
  const dayViews = {}, devices = {}, refs = {}, cats = {};
  for (const s of sessions.values()) {
    const key = s.post || s.title;
    let po = posts.get(key);
    if (!po) { po = { id: key, title: s.title, category: s.category, views: 0, ended: 0, dur: 0, scroll: 0, finished: 0, devices: {}, refs: {}, days: {} }; posts.set(key, po); }
    po.views++; po.devices[s.device] = (po.devices[s.device] || 0) + 1; po.refs[s.ref] = (po.refs[s.ref] || 0) + 1;
    const d = new Date(new Date(s.at).getTime() + H).toISOString().slice(0, 10);
    po.days[d] = (po.days[d] || 0) + 1; dayViews[d] = (dayViews[d] || 0) + 1;
    if (s.ended) { po.ended++; po.dur += s.dur; po.scroll += s.scroll; if (s.scroll >= 80) po.finished++; }
    devices[s.device] = (devices[s.device] || 0) + 1; refs[s.ref] = (refs[s.ref] || 0) + 1;
    if (s.category) cats[s.category] = (cats[s.category] || 0) + 1;
  }
  const list = [...posts.values()].map((p) => ({
    id: p.id, title: p.title, category: p.category, views: p.views,
    avgSeconds: p.ended ? Math.round(p.dur / p.ended) : 0, avgScroll: p.ended ? Math.round(p.scroll / p.ended) : 0,
    finishRate: p.ended ? Math.round((p.finished / p.ended) * 100) : 0,
    devices: top(p.devices, 4), referrers: top(p.refs, 5), days: Object.entries(p.days).sort(([a], [b]) => (a < b ? -1 : 1)).slice(-14).map(([day, views]) => ({ day, views })),
  })).sort((a, b) => b.views - a.views);
  const all = [...sessions.values()];
  const ended = all.filter((s) => s.ended);
  const labels = [];
  for (let i = days - 1; i >= 0 && labels.length < 90; i--) labels.push(new Date(Date.now() + H - i * D).toISOString().slice(0, 10));
  return {
    days, totalViews: all.length,
    avgSeconds: ended.length ? Math.round(ended.reduce((a, s) => a + s.dur, 0) / ended.length) : 0,
    finishRate: ended.length ? Math.round((ended.filter((s) => s.scroll >= 80).length / ended.length) * 100) : 0,
    series: { labels: labels.map((l) => l.slice(5)), values: labels.map((l) => dayViews[l] || 0) },
    devices: top(devices, 4), referrers: top(refs, 8), categories: top(cats, 8), posts: list.slice(0, 60),
    truncated: rows.length >= 40000,
  };
}

export default async function handler(req, res) {
  setCors(res);
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  const op = String(req.query.op || "");
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const who = adminFromToken(token);
  if (!who) return sendErr(res, "Session expired. Please sign in again.", 401);
  if (!supabaseEnabled()) return sendErr(res, "Supabase is not configured.", 503);
  const sb = getSupabase();
  const need = (perm) => who.owner || who.perms.includes(perm);
  const deny = () => sendErr(res, "You don't have access to that.", 403);
  const q = req.method === "GET" ? req.query : { ...req.query, ...readBody(req) };
  const b = req.method === "POST" ? readBody(req) : {};

  // A sub-admin who has since been switched off loses access straight away.
  if (!who.owner && op !== "me") {
    const { data: row } = await sb.from("admin_users").select("active,perms").eq("id", who.id).maybeSingle();
    if (!row || !row.active) return sendErr(res, "Your admin access has been turned off.", 401);
    who.perms = Array.isArray(row.perms) ? row.perms : [];
  }

  try {
    if (op === "me") {
      let perms = who.perms;
      if (!who.owner) {
        const { data: row } = await sb.from("admin_users").select("active,perms").eq("id", who.id).maybeSingle();
        if (!row || !row.active) return sendErr(res, "Your admin access has been turned off.", 401);
        perms = Array.isArray(row.perms) ? row.perms : [];
      }
      return sendOk(res, { admin: { name: who.name, owner: who.owner, perms }, permLabels: ADMIN_PERMS, roles: ROLE_TEMPLATES });
    }

    if (op === "alerts") {
      const counts = {}, items = [];
      const cnt = async (table, apply) => { const { count } = await apply(sb.from(table).select("id", { count: "exact", head: true })); return count || 0; };
      if (need("partners")) {
        counts.partners = await cnt("partners", (x) => x.eq("status", "pending"));
        if (counts.partners) {
          const { data } = await sb.from("partners").select("full_name,created_at").eq("status", "pending").order("created_at", { ascending: false }).limit(5);
          for (const p of data || []) items.push({ kind: "partner", text: `${p.full_name} wants to be a partner`, at: p.created_at, tab: "partners" });
        }
      }
      if (need("payouts")) {
        counts.payouts = await cnt("partner_payouts", (x) => x.eq("status", "requested"));
        if (counts.payouts) items.push({ kind: "payout", text: `${counts.payouts} payout request${counts.payouts === 1 ? "" : "s"} waiting`, at: null, tab: "partners" });
      }
      if (need("reports")) {
        counts.reports = await cnt("question_reports", (x) => x.eq("status", "open"));
        if (counts.reports) items.push({ kind: "report", text: `${counts.reports} question report${counts.reports === 1 ? "" : "s"} to review`, at: null, tab: "reports" });
      }
      if (need("schools")) {
        const { data } = await sb.from("school_accounts").select("teacher_email,school_name,trial_ends_at,paid_until");
        const soon = (data || []).filter((a) => { const s = accountStatus(a); return s.status === "expired" || (s.status === "trial" && s.daysLeft <= 3); });
        counts.schools = soon.length;
        if (soon.length) items.push({ kind: "school", text: `${soon.length} school${soon.length === 1 ? "" : "s"} with a trial ending or ended`, at: null, tab: "schools" });
      }
      if (need("status")) {
        let n = 0;
        try { const r = await sb.from("statuses").select("id", { count: "exact", head: true }).eq("reviewed", false).gt("reports", 0); n = r.count || 0; } catch { n = 0; }
        counts.status = n;
        if (n) items.push({ kind: "status", text: `${n} reported status${n === 1 ? "" : "es"} to review`, at: null, tab: "status" });
      }
      if (need("status")) {
        // new refused posts (words, links, scams, flagged photos) since the admin last opened Security
        const seen = iso(q.secSince) || new Date(Date.now() - 24 * 3600000).toISOString();
        let n = 0;
        try { const r = await sb.from("events").select("id", { count: "exact", head: true }).in("type", ["content_blocked", "status_blocked", "multi_account"]).gt("created_at", seen); n = r.count || 0; } catch { n = 0; }
        counts.security = n;
        if (n) items.push({ kind: "security", text: `${n} blocked post${n === 1 ? "" : "s"} to look at (words, links, photos)`, at: null, tab: "security" });
      }
      return sendOk(res, { counts, total: Object.values(counts).reduce((a, n) => a + n, 0), items });
    }

    // ── students ──
    if (op === "students") {
      if (!need("students")) return deny();
      const page = Math.max(0, Number(q.page) || 0), size = Math.min(100, Math.max(10, Number(q.size) || 30));
      const col = SORTS[q.sort] || "last_active";
      const asc = String(q.dir) === "asc";
      const cols = "email,username,first_name,last_name,level,total_xp,current_streak,best_streak,quizzes_taken,total_correct,total_questions,last_active,last_login,created_at,student_type,subscription_plan,expires_at";
      const [{ data, error }, { count }] = await Promise.all([
        studentFilters(sb.from("profiles").select(cols), q).order(col, { ascending: asc, nullsFirst: false }).range(page * size, page * size + size - 1),
        studentFilters(sb.from("profiles").select("id", { count: "exact", head: true }), q),
      ]);
      if (error) { console.error("[admin students]", error.message); return sendErr(res, "Could not load students.", 500); }
      const now = Date.now();
      const { count: onlineNow } = await sb.from("profiles").select("id", { count: "exact", head: true }).gte("last_active", new Date(now - 15 * MIN).toISOString());
      return sendOk(res, { students: (data || []).map(studentRow), total: count || 0, page, size, onlineNow: onlineNow || 0 });
    }

    if (op === "student") {
      if (!need("students")) return deny();
      const email = String(q.email || "").toLowerCase().trim();
      if (!EMAIL_RE.test(email)) return sendErr(res, "Invalid student.");
      const { data: p } = await sb.from("profiles").select("*").eq("email", email).maybeSingle();
      if (!p) return sendErr(res, "Student not found.", 404);
      const [{ data: sm }, { data: cm }, { data: tc }, { data: pay }, activity] = await Promise.all([
        sb.from("squad_members").select("squad_id,xp_contributed").eq("email", email).limit(1).maybeSingle(),
        sb.from("class_members").select("class_id").eq("email", email),
        sb.from("classes").select("name,school_name,code").eq("teacher_email", email),
        sb.from("payments").select("plan,amount,status,created_at").eq("email", email).order("created_at", { ascending: false }).limit(10),
        timeline(sb, email, 120),
      ]);
      let referrer = null;
      if (p.referrer_partner_id || p.referred_by_code) {
        let pr = null;
        if (p.referrer_partner_id) pr = (await sb.from("partners").select("id,full_name,email,phone,referral_code,status").eq("id", p.referrer_partner_id).maybeSingle()).data;
        referrer = { code: p.referred_by_code || pr?.referral_code || "", partnerId: pr?.id || null, name: pr?.full_name || "", email: pr?.email || "", phone: pr?.phone || "", status: pr?.status || "" };
      }
      let squad = null;
      if (sm) { const { data: s } = await sb.from("squads").select("name,code").eq("id", sm.squad_id).maybeSingle(); if (s) squad = { name: s.name, code: s.code, xp: sm.xp_contributed }; }
      let classes = [];
      if ((cm || []).length) { const { data } = await sb.from("classes").select("name,school_name").in("id", cm.map((c) => c.class_id)); classes = data || []; }
      const subjects = Object.entries(p.subject_performance || {}).map(([k, v]) => ({ subject: k, ...(typeof v === "object" ? v : { value: v }) })).slice(0, 30);
      return sendOk(res, {
        student: {
          ...studentRow(p), firstName: p.first_name, lastName: p.last_name, exams: p.selected_exams, guardianEmail: p.guardian_email || "",
          totalCorrect: p.total_correct, totalQuestions: p.total_questions, perfectRounds: p.perfect_rounds, challengesWon: p.challenges_won, challengesLost: p.challenges_lost,
          achievements: (p.achievements || []).length, subjects, referredBy: p.referred_by_code || "",
        },
        referrer, squad, classes, teaching: tc || [], payments: pay || [], activity,
      });
    }

    if (op === "activity") {
      if (!need("students")) return deny();
      const days = Math.min(30, Math.max(1, Number(q.days) || 2));
      const since = new Date(Date.now() - days * D).toISOString();
      const before = iso(q.before);
      let email = "";
      const needle = safeRegex(q.q);
      if (needle) {
        const { data } = await sb.from("profiles").select("email").or(`email.ilike.%${needle}%,username.ilike.%${needle}%,first_name.ilike.%${needle}%`).limit(20);
        email = (data || []).map((r) => r.email);
        if (!email.length) return sendOk(res, { items: [], next: null });
      }
      const type = String(q.type || "");
      let evq = sb.from("events").select("type,email,payload,created_at").not("email", "is", null).gte("created_at", since).order("created_at", { ascending: false }).limit(150);
      if (before) evq = evq.lt("created_at", before);
      if (email) evq = evq.in("email", email);
      if (type && type !== "xp") evq = evq.eq("type", type);
      let xq = sb.from("xp_events").select("email,amount,reason,created_at").gte("created_at", since).order("created_at", { ascending: false }).limit(150);
      if (before) xq = xq.lt("created_at", before);
      if (email) xq = xq.in("email", email);
      const [evRes, xpRes] = await Promise.all([type === "xp" ? Promise.resolve({ data: [] }) : evq, !type || type === "xp" ? xq : Promise.resolve({ data: [] })]);
      let merged = [
        ...(evRes.data || []).map((e) => ({ at: e.created_at, email: e.email, kind: "event", type: e.type, text: labelEvent(e) })),
        ...(xpRes.data || []).map((x) => ({ at: x.created_at, email: x.email, kind: "xp", type: "xp", text: `${x.amount >= 0 ? "+" : ""}${x.amount} XP${x.reason ? ` — ${x.reason}` : ""}` })),
      ].sort((a, b) => new Date(b.at) - new Date(a.at)).slice(0, 120);
      const emails = [...new Set(merged.map((m) => m.email))];
      const names = {};
      for (let i = 0; i < emails.length; i += 100) {
        const { data } = await sb.from("profiles").select("email,username,first_name").in("email", emails.slice(i, i + 100));
        for (const p of data || []) names[p.email] = p.username || p.first_name || p.email.split("@")[0];
      }
      merged = merged.map((m) => ({ ...m, who: names[m.email] || m.email.split("@")[0] }));
      const { data: types } = await sb.from("events").select("type").not("email", "is", null).gte("created_at", since).limit(2000);
      const tc = {}; for (const t of types || []) tc[t.type] = (tc[t.type] || 0) + 1;
      return sendOk(res, { items: merged, next: merged.length >= 120 ? merged[merged.length - 1].at : null, types: top(tc, 20) });
    }

    // ── blog ──
    if (op === "blog") {
      if (!need("blog")) return deny();
      return sendOk(res, { blog: await blogStats(sb, [7, 30, 90].includes(Number(q.days)) ? Number(q.days) : 30) });
    }

    // ── WhatsApp group chats ──
    if (op === "groups") {
      if (!need("status")) return deny();
      const { loadGroups, AUDIENCES } = await import("../_helpers/groupChats.js");
      return sendOk(res, { groups: await loadGroups(sb), audiences: AUDIENCES });
    }
    if (op === "group-save" || op === "group-delete") {
      if (!need("status")) return deny();
      const { loadGroups, AUDIENCES, validGroupUrl } = await import("../_helpers/groupChats.js");
      let list = [...(await loadGroups(sb))];
      const id = String(b.id || "").slice(0, 40);
      if (op === "group-delete") {
        list = list.filter((g) => g.id !== id);
      } else {
        const name = String(b.name || "").trim().slice(0, 80);
        const url = String(b.url || "").trim();
        if (!name) return sendErr(res, "Give the group a name.");
        if (!validGroupUrl(url)) return sendErr(res, "That does not look like a WhatsApp group link (https://chat.whatsapp.com/…).");
        const audiences = (Array.isArray(b.audiences) ? b.audiences : []).filter((a) => AUDIENCES.includes(a));
        if (!audiences.length) return sendErr(res, "Choose who this group is for.");
        const row = { id: id || "g-" + Date.now().toString(36), name, url, audiences, on: b.on !== false };
        const i = list.findIndex((g) => g.id === row.id);
        if (i >= 0) list[i] = row; else { if (list.length >= 30) return sendErr(res, "That is the maximum number of groups."); list.push(row); }
      }
      await sb.from("settings").upsert({ key: "group_chats", value: list, updated_at: new Date().toISOString() }, { onConflict: "key" });
      await audit(sb, who, op === "group-delete" ? "groups.delete" : "groups.save", id || String(b.name || "").slice(0, 60));
      return sendOk(res, { groups: list });
    }

    // ── blog cover images ──
    if (op === "blog-covers") {
      if (!need("blog")) return deny();
      const { data } = await sb.from("settings").select("value").eq("key", "blog_covers").maybeSingle();
      const map = (data && data.value) || {};
      return sendOk(res, { covers: Object.fromEntries(Object.entries(map).map(([k, v]) => [k, `/api/site/media?id=${encodeURIComponent(v)}`])) });
    }
    if (op === "blog-cover-save" || op === "blog-cover-clear") {
      if (!need("blog")) return deny();
      const postId = String(b.postId || "");
      if (!/^[a-z0-9-]{3,140}$/.test(postId)) return sendErr(res, "Unknown post.");
      const { data: cur } = await sb.from("settings").select("value").eq("key", "blog_covers").maybeSingle();
      const map = { ...((cur && cur.value) || {}) };
      if (op === "blog-cover-clear") delete map[postId];
      else {
        const m = await saveMedia(sb, "blog-admin", b.image);
        if (m.error) return sendErr(res, m.error);
        map[postId] = m.id;
      }
      await sb.from("settings").upsert({ key: "blog_covers", value: map, updated_at: new Date().toISOString() }, { onConflict: "key" });
      await audit(sb, who, op === "blog-cover-clear" ? "blog.cover.clear" : "blog.cover.save", postId);
      return sendOk(res, {});
    }

    // ── shop items ──
    if (op === "shop-list") {
      if (!need("shop")) return deny();
      return sendOk(res, { items: await getShopCatalog({ includeHidden: true }), removed: await getRemovedBuiltins() });
    }
    if (op === "shop-save") {
      if (!need("shop")) return deny();
      const title = String(b.title || "").replace(/\s+/g, " ").trim().slice(0, 90);
      const description = String(b.description || "").trim().slice(0, 400);
      const price = Math.floor(Number(b.price));
      const category = String(b.category || "Notes").trim().slice(0, 30) || "Notes";
      const badge = String(b.badge || "").trim().slice(0, 20) || null;
      const link = String(b.link || "").trim();
      if (title.length < 3) return sendErr(res, "Give the item a title.");
      if (!(price >= 100 && price <= 500000)) return sendErr(res, "Price must be between ₦100 and ₦500,000.");
      if (link && !/^https:\/\/[^\s]{4,500}$/.test(link)) return sendErr(res, "The delivery link must start with https://");
      const row = { title, description, price_ngn: price, category, badge, link: link || null, show_app: !!b.showApp, show_blog: !!b.showBlog, show_landing: !!b.showLanding, active: b.active !== false, sort: Math.max(0, Math.min(999, Math.floor(Number(b.sort)) || 0)) };
      if (b.image) {
        const m = await saveMedia(sb, "shop-admin", b.image);
        if (m.error) return sendErr(res, m.error);
        row.image_id = m.id;
      }
      let id = String(b.id || "");
      if (id) {
        if (!id.startsWith("custom_")) {
          // built-in item: store the edits (and price) beside its visibility flags
          const base = SHOP_ITEMS.find((x) => x.id === id && !x.isPremium);
          if (!base) return sendErr(res, "Item not found.", 404);
          const { data: cur } = await sb.from("settings").select("value").eq("key", "shop_flags").maybeSingle();
          const all = { ...((cur && cur.value) || {}) };
          const prev = all[id] || {};
          all[id] = { ...prev, app: !!b.showApp, blog: !!b.showBlog, landing: !!b.showLanding, active: b.active !== false, title, description, category, badge: badge || "" };
          if (row.image_id) all[id].imageId = row.image_id;
          await sb.from("settings").upsert({ key: "shop_flags", value: all, updated_at: new Date().toISOString() }, { onConflict: "key" });
          const { data: pc } = await sb.from("settings").select("value").eq("key", "prices").maybeSingle();
          const prices = { ...((pc && pc.value) || {}) };
          prices.items = { ...(prices.items || {}), [id]: price };
          await sb.from("settings").upsert({ key: "prices", value: prices, updated_at: new Date().toISOString() }, { onConflict: "key" });
          bustPricingCache();
          await audit(sb, who, "shop.save", `${title} (built-in, ₦${price})`);
          return sendOk(res, { id });
        }
        const { data, error } = await sb.from("shop_items").update(row).eq("id", id).select("id");
        if (error) return sendErr(res, error.message);
        if (!(data && data.length)) return sendErr(res, "Item not found.", 404);
      } else {
        if (!row.image_id) return sendErr(res, "Add a picture for the item.");
        id = `custom_${crypto.randomBytes(5).toString("hex")}`;
        const { error } = await sb.from("shop_items").insert({ id, ...row });
        if (error) return sendErr(res, error.message);
      }
      await audit(sb, who, "shop.save", `${title} (₦${price})`);
      return sendOk(res, { id });
    }
    if (op === "shop-delete") {
      if (!need("shop")) return deny();
      const id = String(b.id || "");
      if (!id) return sendErr(res, "Pick an item.");
      if (!id.startsWith("custom_")) {
        // built-in item: mark it removed (or bring it back); students who already bought it keep their receipt
        if (!SHOP_ITEMS.some((x) => x.id === id && !x.isPremium)) return sendErr(res, "Unknown item.");
        const { data: cur } = await sb.from("settings").select("value").eq("key", "shop_flags").maybeSingle();
        const all = (cur && cur.value) || {};
        all[id] = { ...(all[id] || {}), removed: !b.restore };
        await sb.from("settings").upsert({ key: "shop_flags", value: all, updated_at: new Date().toISOString() }, { onConflict: "key" });
        await audit(sb, who, b.restore ? "shop.restore" : "shop.delete", id);
        return sendOk(res, {});
      }
      await sb.from("shop_items").delete().eq("id", id);
      await audit(sb, who, "shop.delete", id);
      return sendOk(res, {});
    }
    if (op === "shop-flags") {
      if (!need("shop")) return deny();
      const id = String(b.id || "");
      if (!id || id.startsWith("custom_")) return sendErr(res, "Not a built-in item.");
      const { data: cur } = await sb.from("settings").select("value").eq("key", "shop_flags").maybeSingle();
      const all = (cur && cur.value) || {};
      all[id] = { ...(all[id] || {}), app: !!b.showApp, blog: !!b.showBlog, landing: !!b.showLanding, active: b.active !== false };
      await sb.from("settings").upsert({ key: "shop_flags", value: all, updated_at: new Date().toISOString() }, { onConflict: "key" });
      await audit(sb, who, "shop.flags", id);
      return sendOk(res, {});
    }

    // ── status monitoring ──
    if (op === "status-list") {
      if (!need("status")) return deny();
      const filter = ["all", "reported", "photos", "unscanned"].includes(q.filter) ? q.filter : "all";
      const before = iso(q.before);
      const needle = safeRegex(q.q);
      const cols = "id,email,display_name,text,privacy,media_id,created_at,expires_at,reshared_from";
      const full = cols + ",reports,flag,scan,reviewed";
      const build = (c) => {
        let st = sb.from("statuses").select(c).order("created_at", { ascending: false }).limit(30);
        if (before) st = st.lt("created_at", before);
        if (needle) st = st.or(`text.ilike.%${needle}%,display_name.ilike.%${needle}%,email.ilike.%${needle}%`);
        if (filter === "photos") st = st.not("media_id", "is", null);
        return st;
      };
      let { data, error } = await build(full);
      let moderation = true;
      if (error) { moderation = false; ({ data, error } = await build(cols)); } // moderation SQL not run yet
      if (error) { console.error("[admin status-list]", error.message); return sendErr(res, "Could not load statuses.", 500); }
      let rows = data || [];
      if (moderation && filter === "reported") rows = rows.filter((r) => (r.reports || 0) > 0 || r.flag);
      if (moderation && filter === "unscanned") rows = rows.filter((r) => r.media_id && r.scan !== "clean");
      const emails = [...new Set(rows.map((r) => r.email))];
      const susp = new Set();
      if (emails.length) { try { const { data: ps } = await sb.from("profiles").select("email,suspended").in("email", emails); (ps || []).forEach((p) => { if (p.suspended) susp.add(p.email); }); } catch { /* column missing */ } }
      return sendOk(res, {
        moderation,
        items: rows.map((r) => ({
          id: r.id, email: r.email, name: r.display_name, text: r.text || "", privacy: r.privacy, mediaId: r.media_id || null, at: r.created_at, expiresAt: r.expires_at,
          resharedFrom: r.reshared_from || null, reports: r.reports || 0, flag: r.flag || null, scan: r.scan || null, reviewed: !!r.reviewed, suspended: susp.has(r.email),
        })),
        next: rows.length >= 30 ? rows[rows.length - 1].created_at : null,
      });
    }
    if (op === "security") {
      if (!need("status")) return deny();
      const before = iso(q.before);
      let ev = sb.from("events").select("id,email,payload,created_at").in("type", ["content_blocked", "status_blocked", "multi_account"]).order("created_at", { ascending: false }).limit(40);
      if (before) ev = ev.lt("created_at", before);
      const { data, error } = await ev;
      if (error) return sendErr(res, "Could not load the security log.", 500);
      const rows = data || [];
      const emails = [...new Set(rows.map((r) => r.email).filter(Boolean))];
      const nm = {}, susp = new Set();
      if (emails.length) {
        try { const { data: ps } = await sb.from("profiles").select("email,first_name,last_name,username,suspended").in("email", emails); (ps || []).forEach((p) => { nm[p.email] = `${p.first_name || ""} ${p.last_name || ""}`.trim() || p.username || p.email; if (p.suspended) susp.add(p.email); }); } catch { /* ignore */ }
      }
      const since = new Date(Date.now() - 7 * D).toISOString();
      const counts = {};
      try { const { data: c } = await sb.from("events").select("email").in("type", ["content_blocked", "status_blocked", "multi_account"]).gte("created_at", since).limit(5000); (c || []).forEach((r) => { counts[r.email] = (counts[r.email] || 0) + 1; }); } catch { /* ignore */ }
      return sendOk(res, {
        items: rows.map((r) => { const p = r.payload || {}; return { id: r.id, at: r.created_at, email: r.email, name: nm[r.email] || r.email, suspended: susp.has(r.email), where: p.where || "status", flag: String(p.flag || "blocked"), text: p.text || "", mediaId: p.mediaId || null, detail: p.detail || "", weekCount: counts[r.email] || 1 }; }),
        next: rows.length >= 40 ? rows[rows.length - 1].created_at : null,
      });
    }
    if (op === "games") {
      if (!need("analytics")) return deny();
      const days = [7, 30, 90].includes(Number(q.days)) ? Number(q.days) : 7;
      const since = new Date(Date.now() - days * D).toISOString();
      let rows = [];
      try { rows = await fetchPages(sb, "events", "type,email,payload,created_at", (x) => x.in("type", ["game_view", "game_started", "game_finished", "game_wall", "game_share", "game_signup_tap", "signup_source"]).gte("created_at", since), 30); } catch { return sendErr(res, "Could not load game numbers.", 500); }
      const guests = new Set(), played = new Set(), wallSeen = new Set(), shares = {}, days_ = {};
      let views = 0, started = 0, finished = 0, wall = 0, taps = 0, signups = 0, memberStarts = 0;
      for (const r of rows) {
        const p = r.payload || {};
        const day = String(r.created_at).slice(0, 10);
        const d = (days_[day] = days_[day] || { day, plays: 0, signups: 0 });
        if (r.type === "game_view") { views++; if (p.anon) guests.add(p.anon); }
        else if (r.type === "game_started") { if (r.email) memberStarts++; else started++; if (p.anon) played.add(p.anon); d.plays++; }
        else if (r.type === "game_finished") finished++;
        else if (r.type === "game_wall") { wall++; if (p.anon) wallSeen.add(p.anon); }
        else if (r.type === "game_share") { const c = String(p.channel || "other"); shares[c] = (shares[c] || 0) + 1; }
        else if (r.type === "game_signup_tap") taps++;
        else if (r.type === "signup_source" && p.via === "game") { signups++; d.signups++; }
      }
      let top = [], playersTotal = 0, guestBest = 0;
      try {
        const { data } = await sb.from("game_scores").select("player_key,name,is_guest,game,score,created_at").gte("created_at", since).order("score", { ascending: false }).limit(2000);
        const best = new Map();
        for (const r of data || []) if (!best.has(r.player_key)) best.set(r.player_key, r);
        playersTotal = best.size; guestBest = [...best.values()].filter((r) => r.is_guest).length;
        top = [...best.values()].slice(0, 15).map((r) => ({ name: r.name, guest: !!r.is_guest, score: r.score, game: r.game, at: r.created_at }));
      } catch { /* table may not exist yet */ }
      return sendOk(res, {
        days, views, guests: guests.size, guestStarts: started, memberStarts, finished, played: played.size, wall, wallPeople: wallSeen.size, taps, signups,
        shares, players: playersTotal, guestPlayers: guestBest, top, series: Object.values(days_).sort((a, b) => (a.day < b.day ? -1 : 1)),
      });
    }
    if (op === "reminders") {
      if (!need("analytics")) return deny();
      const days = [7, 30, 90].includes(Number(q.days)) ? Number(q.days) : 7;
      const since = new Date(Date.now() - days * D).toISOString();
      const TYPES = ["push_sent", "push_shown", "push_click", "push_open", "notif_prompt_shown", "notif_prompt_allow_tapped", "notif_enabled", "notif_blocked", "notif_failed", "notif_prompt_declined"];
      let rows = [];
      try { rows = await fetchPages(sb, "events", "type,email,payload,created_at", (x) => x.in("type", TYPES).gte("created_at", since), 30); } catch { return sendErr(res, "Could not load reminder numbers.", 500); }
      const tot = {}, kinds = {}, people = {}, opens = [];
      for (const r of rows) {
        tot[r.type] = (tot[r.type] || 0) + 1;
        const k = String((r.payload && r.payload.kind) || "general");
        if (r.type.startsWith("push_")) { const o = (kinds[k] = kinds[k] || { kind: k, sent: 0, shown: 0, clicks: 0, opens: 0 }); if (r.type === "push_sent") o.sent++; else if (r.type === "push_shown") o.shown++; else if (r.type === "push_click") o.clicks++; else if (r.type === "push_open") o.opens++; }
        if (r.type === "push_open" && r.email) { opens.push(r); people[r.email] = 1; }
      }
      opens.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
      const recent = opens.slice(0, 40);
      const emails = [...new Set(recent.map((r) => r.email))];
      const nm = {};
      if (emails.length) { try { const { data } = await sb.from("profiles").select("email,first_name,last_name,username").in("email", emails); (data || []).forEach((p) => { nm[p.email] = `${p.first_name || ""} ${p.last_name || ""}`.trim() || p.username || p.email; }); } catch { /* names optional */ } }
      let subscribers = 0;
      try { const r = await sb.from("push_subscriptions").select("endpoint", { count: "exact", head: true }); subscribers = r.count || 0; } catch { /* ignore */ }
      return sendOk(res, {
        days, subscribers,
        sent: tot.push_sent || 0, shown: tot.push_shown || 0, clicks: tot.push_click || 0, opens: tot.push_open || 0, openers: Object.keys(people).length,
        prompt: { shown: tot.notif_prompt_shown || 0, tapped: tot.notif_prompt_allow_tapped || 0, accepted: tot.notif_enabled || 0, blocked: tot.notif_blocked || 0, failed: tot.notif_failed || 0, declined: tot.notif_prompt_declined || 0 },
        kinds: Object.values(kinds).sort((a, b) => b.sent - a.sent),
        recent: recent.map((r) => ({ at: r.created_at, name: nm[r.email] || r.email, email: r.email, kind: String((r.payload && r.payload.kind) || "general") })),
      });
    }
    if (op === "status-media") {
      if (!need("status")) return deny();
      const id = String(q.id || "");
      if (!/^[\w-]{6,64}$/.test(id)) return sendErr(res, "Invalid image.");
      const { data } = await sb.from("media").select("data").eq("id", id).maybeSingle();
      if (!data) return sendErr(res, "Image not found.", 404);
      return sendOk(res, { image: data.data });
    }
    if (op === "status-action") {
      if (!need("status")) return deny();
      if (req.method !== "POST") return sendMethodNotAllowed(res);
      const id = String(b.id || "");
      if (!/^[\w-]{6,64}$/.test(id)) return sendErr(res, "Invalid status.");
      if (b.action === "delete") {
        const { data: row } = await sb.from("statuses").select("email,text").eq("id", id).maybeSingle();
        await sb.from("statuses").delete().eq("id", id);
        await audit(sb, who, "status.delete", `${row ? row.email : id}: ${String((row && row.text) || "(photo)").slice(0, 60)}`);
        return sendOk(res, { deleted: true });
      }
      if (b.action === "dismiss") {
        await sb.from("statuses").update({ reviewed: true }).eq("id", id);
        return sendOk(res, { dismissed: true });
      }
      return sendErr(res, "Unknown action.");
    }
    if (op === "status-suspend") {
      if (!need("status")) return deny();
      if (req.method !== "POST") return sendMethodNotAllowed(res);
      const email = String(b.email || "").toLowerCase().trim();
      if (!EMAIL_RE.test(email)) return sendErr(res, "Invalid student.");
      const on = b.suspended !== false;
      const reason = String(b.reason || "").trim().slice(0, 200) || null;
      const { error } = await sb.from("profiles").update({ suspended: on, suspended_reason: on ? reason : null }).eq("email", email);
      if (error) return sendErr(res, "Could not update the account. Run the moderation SQL in supabase/schema.sql first.", 500);
      if (on) await sb.from("statuses").delete().eq("email", email); // take their statuses down too
      await audit(sb, who, on ? "student.suspend" : "student.unsuspend", `${email}${reason ? ` — ${reason}` : ""}`);
      return sendOk(res, { suspended: on });
    }

    // ── ads ──
    if (op === "ads") {
      if (!need("ads")) return deny();
      bustAdsCache();
      return sendOk(res, { ads: await getAdsConfig() });
    }
    if (op === "ads-save") {
      if (!need("ads")) return deny();
      const next = sanitizeAds(b.ads || {});
      await sb.from("settings").upsert({ key: "ads", value: next, updated_at: new Date().toISOString() }, { onConflict: "key" });
      bustAdsCache();
      await audit(sb, who, "ads.save", `master ${next.master ? "on" : "off"}, blog ${next.blog.enabled ? "on" : "off"}, app ${next.app.enabled ? "on" : "off"}`);
      return sendOk(res, { ads: next });
    }
    if (op === "ads-stats") {
      if (!need("ads")) return deny();
      return sendOk(res, { stats: await adStats(sb, [7, 30, 90].includes(Number(q.days)) ? Number(q.days) : 30) });
    }

    if (op === "ads-adsterra") {
      if (!need("ads")) return deny();
      const key = (process.env.ADSTERRA_API || process.env.ADSTERRA_API_KEY || "").trim();
      if (!key) return sendOk(res, { adsterra: { configured: false, message: "ADSTERRA_API is not set in Vercel (Settings → Environment Variables). Add it, then redeploy." } });
      const days = [1, 7, 30, 90].includes(Number(q.days)) ? Number(q.days) : 30;
      const gb = ["date", "country", "placement", "domain", "device_type"].includes(String(q.group_by)) ? String(q.group_by) : "date";
      const ck = `${days}:${gb}`;
      globalThis.__adsterraCache = globalThis.__adsterraCache || new Map();
      const hit = globalThis.__adsterraCache.get(ck);
      if (hit && Date.now() - hit.t < 5 * 60000) return sendOk(res, { adsterra: hit.v });
      const day = (t) => new Date(t).toISOString().slice(0, 10);
      const url = `https://api3.adsterratools.com/publisher/stats.json?start_date=${day(Date.now() - (days - 1) * 86400000)}&finish_date=${day(Date.now())}&group_by=${gb}`;
      try {
        const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 15000);
        const r = await fetch(url, { headers: { "X-API-Key": key, Accept: "application/json" }, signal: ctl.signal }); clearTimeout(tm);
        const txt = await r.text(); let j = {}; try { j = JSON.parse(txt); } catch { /* not json */ }
        if (!r.ok) return sendOk(res, { adsterra: { configured: true, error: r.status === 401 || r.status === 403 ? "Adsterra rejected the API key (check the ADSTERRA_API value)." : `Adsterra answered ${r.status}: ${String(j.message || txt).slice(0, 160)}` } });
        const items = (Array.isArray(j.items) ? j.items : []).map((x) => ({ label: String(x.date || x.country || x.placement || x.domain || x.device_type || x.name || "—"), impressions: Number(x.impression ?? x.impressions ?? 0), clicks: Number(x.clicks || 0), ctr: Number(x.ctr || 0), cpm: Number(x.cpm || 0), revenue: Number(x.revenue || 0) }));
        const t = items.reduce((a, x) => ({ impressions: a.impressions + x.impressions, clicks: a.clicks + x.clicks, revenue: a.revenue + x.revenue }), { impressions: 0, clicks: 0, revenue: 0 });
        const v = { configured: true, days, groupBy: gb, items, totals: { ...t, ctr: t.impressions ? (t.clicks / t.impressions) * 100 : 0, cpm: t.impressions ? (t.revenue / t.impressions) * 1000 : 0 } };
        globalThis.__adsterraCache.set(ck, { t: Date.now(), v });
        return sendOk(res, { adsterra: v });
      } catch (e) { return sendOk(res, { adsterra: { configured: true, error: "Could not reach Adsterra right now. Try again in a minute." } }); }
    }

    if (op === "sources") {
      if (!need("analytics")) return deny();
      const ref = String(q.ref || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 32);
      return sendOk(res, { sources: await sourceStats(sb, [7, 30, 90].includes(Number(q.days)) ? Number(q.days) : 30, ref) });
    }

    // ── team (owner only) ──
    if (["team", "team-save", "team-reset", "team-delete", "audit"].includes(op) && !who.owner) return sendErr(res, "Only the owner can manage the admin team.", 403);

    if (op === "team") {
      const { data } = await sb.from("admin_users").select("id,name,email,perms,role,active,created_at,last_login").order("created_at", { ascending: false });
      return sendOk(res, { admins: data || [], permLabels: ADMIN_PERMS, roles: ROLE_TEMPLATES });
    }
    if (op === "team-save") {
      if (req.method !== "POST") return sendMethodNotAllowed(res);
      const perms = [...new Set((Array.isArray(b.perms) ? b.perms : []).filter((p) => ADMIN_PERMS[p]))];
      if (!perms.length) return sendErr(res, "Pick at least one permission.");
      if (b.id) {
        const patch = { perms, role: ROLE_TEMPLATES[b.role] ? b.role : "custom" };
        if (b.name) patch.name = clean(b.name, 60);
        if (typeof b.active === "boolean") patch.active = b.active;
        const { data, error } = await sb.from("admin_users").update(patch).eq("id", String(b.id)).select("id,name");
        if (error || !(data || []).length) return sendErr(res, "Could not update that admin.");
        await audit(sb, who, "team.update", `${data[0].name}: ${perms.join(", ")}${typeof b.active === "boolean" ? (b.active ? " (on)" : " (off)") : ""}`);
        return sendOk(res, {});
      }
      const name = clean(b.name, 60), email = String(b.email || "").toLowerCase().trim();
      if (name.length < 2) return sendErr(res, "Enter the person's name.");
      if (!EMAIL_RE.test(email)) return sendErr(res, "Enter a valid email.");
      const password = genPassword();
      const { error } = await sb.from("admin_users").insert({ name, email, pass_hash: hashPasswordStrong(password), perms, active: true, role: ROLE_TEMPLATES[b.role] ? b.role : "custom" });
      if (error) return sendErr(res, /duplicate|23505/.test(error.message + error.code) ? "That email is already an admin." : "Could not create the admin.");
      await audit(sb, who, "team.create", `${name} <${email}>: ${perms.join(", ")}`);
      let emailed = false;
      if (b.sendEmail) emailed = await sendHtml(email, "Your EliteScholars admin access", subAdminWelcomeEmail({ name, email, password, perms: perms.map((p) => ADMIN_PERMS[p]) }));
      return sendOk(res, { created: true, email, password, emailed });
    }
    if (op === "team-reset") {
      const password = genPassword();
      const { data } = await sb.from("admin_users").update({ pass_hash: hashPasswordStrong(password) }).eq("id", String(b.id || "")).select("name,email,perms");
      if (!(data || []).length) return sendErr(res, "Admin not found.", 404);
      await audit(sb, who, "team.reset", data[0].name);
      let emailed = false;
      if (b.sendEmail) emailed = await sendHtml(data[0].email, "Your new EliteScholars admin password", subAdminWelcomeEmail({ name: data[0].name, email: data[0].email, password, perms: (data[0].perms || []).map((p) => ADMIN_PERMS[p] || p) }));
      return sendOk(res, { email: data[0].email, password, emailed });
    }
    if (op === "team-delete") {
      const { data } = await sb.from("admin_users").delete().eq("id", String(b.id || "")).select("name");
      if ((data || []).length) await audit(sb, who, "team.delete", data[0].name);
      return sendOk(res, {});
    }
    if (op === "audit") {
      const { data } = await sb.from("admin_audit").select("admin_name,action,detail,created_at").order("created_at", { ascending: false }).limit(150);
      return sendOk(res, { log: data || [] });
    }

    // ── AI keys ──
    if (op === "ai-status") {
      if (!need("ai")) return deny();
      const diag = poolDiagnostics();
      const since = new Date(Date.now() - 7 * D).toISOString();
      const rows = await fetchPages(sb, "events", "payload,created_at", (x) => x.eq("type", "ai_call").gte("created_at", since), 10);
      const st = {};
      for (const r of rows) { const p = r.payload || {}; const o = (st[p.key] ||= { calls: 0, ok: 0, ms: 0, last: null, lastFail: null }); o.calls++; if (p.ok) { o.ok++; o.ms += Number(p.ms) || 0; } else if (!o.lastFail || r.created_at > o.lastFail) o.lastFail = r.created_at; if (!o.last || r.created_at > o.last) o.last = r.created_at; }
      return sendOk(res, { ...diag, keys: diag.keys.map((k) => { const o = st[k.name] || { calls: 0, ok: 0, ms: 0 }; return { ...k, calls: o.calls, failed: o.calls - o.ok, avgMs: o.ok ? Math.round(o.ms / o.ok) : 0, last: o.last || null, lastFail: o.lastFail || null }; }) });
    }
    if (op === "ai-test") {
      if (!need("ai")) return deny();
      if (req.method !== "POST") return sendMethodNotAllowed(res);
      const k = loadKeys().find((x) => x.name === String(b.name || ""));
      if (!k) return sendErr(res, "Key not found.", 404);
      const t0 = Date.now();
      try {
        const out = await callKey(k, { system: "Reply with a JSON object only.", user: 'Reply with {"ok":true}', maxTokens: 50 });
        return sendOk(res, { ok: String(out).trim().length > 0, ms: Date.now() - t0 });
      } catch (e) {
        return sendOk(res, { ok: false, ms: Date.now() - t0, status: e.status || 0, error: e.status === 401 || e.status === 403 ? "The provider rejected this key." : e.status === 429 ? "Rate limited or out of credit." : e.name === "AbortError" ? "Timed out." : "Could not reach the provider or the model name is wrong.", detail: e.detail || "" });
      }
    }

    // ── prices & school plans ──
    if (op === "prices") {
      if (!need("prices")) return deny();
      const pr = await getPricing();
      return sendOk(res, {
        prices: { premiumAnnual: pr.premiumAnnual, premiumAnnualOriginal: pr.premiumAnnualOriginal, pro: pr.pro, group50: pr.group50, group100: pr.group100 },
        items: SHOP_ITEMS.filter((i) => !i.isPremium).map((i) => ({ id: i.id, title: i.title, category: i.category, price: pr.items[i.id] })),
        school: pr.school,
      });
    }
    if (op === "prices-save") {
      if (!need("prices")) return deny();
      if (req.method !== "POST") return sendMethodNotAllowed(res);
      const num = (v) => { const n = Math.round(Number(v)); return Number.isFinite(n) && n > 0 && n <= 10000000 ? n : null; };
      const { data: cur } = await sb.from("settings").select("value").eq("key", "prices").maybeSingle();
      const next = { ...(cur && cur.value) };
      for (const k of ["premiumAnnual", "premiumAnnualOriginal", "pro", "group50", "group100"]) if (b[k] !== undefined) { const n = num(b[k]); if (!n) return sendErr(res, "Prices must be whole naira amounts above 0."); next[k] = n; }
      if (b.items && typeof b.items === "object") {
        next.items = { ...(next.items || {}) };
        for (const it of SHOP_ITEMS) if (b.items[it.id] !== undefined) { const n = num(b.items[it.id]); if (!n) return sendErr(res, `Invalid price for ${it.title}.`); next.items[it.id] = n; }
      }
      await sb.from("settings").upsert({ key: "prices", value: next, updated_at: new Date().toISOString() }, { onConflict: "key" });
      bustPricingCache();
      await audit(sb, who, "prices.save", JSON.stringify({ ...next, items: undefined }).slice(0, 200));
      return sendOk(res, {});
    }

    if (op === "school-plans") {
      if (!need("schools") && !need("prices")) return deny();
      const pr = await getPricing();
      const [{ data: accs }, { data: classes }] = await Promise.all([
        sb.from("school_accounts").select("*").order("created_at", { ascending: false }).limit(300),
        sb.from("classes").select("id,teacher_email,name"),
      ]);
      const cls = classes || [];
      const { data: mem } = cls.length ? await sb.from("class_members").select("class_id") : { data: [] };
      const perClass = {}; for (const m of mem || []) perClass[m.class_id] = (perClass[m.class_id] || 0) + 1;
      const perTeacher = {}, classCount = {};
      for (const c of cls) { perTeacher[c.teacher_email] = (perTeacher[c.teacher_email] || 0) + (perClass[c.id] || 0); classCount[c.teacher_email] = (classCount[c.teacher_email] || 0) + 1; }
      return sendOk(res, {
        settings: pr.school,
        schools: (accs || []).map((a) => {
          const st = accountStatus(a), students = perTeacher[a.teacher_email] || 0, tier = tierFor(pr.school, students);
          return { email: a.teacher_email, school: a.school_name, ...st, students, classes: classCount[a.teacher_email] || 0, tier: tier ? tier.label : "", price: tier ? tier.price : 0, trialStarted: a.trial_started_at, trialEnds: a.trial_ends_at, paidUntil: a.paid_until, amountPaid: a.amount_paid, notes: a.notes };
        }),
      });
    }
    if (op === "school-settings") {
      if (!need("prices")) return deny();
      if (req.method !== "POST") return sendMethodNotAllowed(res);
      const trialDays = Math.round(Number(b.trialDays));
      if (!Number.isFinite(trialDays) || trialDays < 0 || trialDays > 365) return sendErr(res, "Trial days must be between 0 and 365.");
      const tiers = (Array.isArray(b.tiers) ? b.tiers : []).map((t) => ({ min: Math.max(0, Math.round(Number(t.min) || 0)), label: clean(t.label, 60), price: Math.max(0, Math.round(Number(t.price) || 0)) }));
      if (!tiers.length) return sendErr(res, "Add at least one price tier.");
      if (tiers.some((t) => !t.price)) return sendErr(res, "Every tier needs a price.");
      if (new Set(tiers.map((t) => t.min)).size !== tiers.length) return sendErr(res, "Two tiers start at the same student count.");
      const value = { trialDays, tiers: tiers.map((t) => ({ ...t, label: t.label || `${t.min}+ students` })), period: clean(b.period, 20) || DEFAULT_SCHOOL.period };
      await sb.from("settings").upsert({ key: "school_plan", value, updated_at: new Date().toISOString() }, { onConflict: "key" });
      bustPricingCache();
      await audit(sb, who, "school.settings", `trial ${trialDays}d, ${tiers.length} tiers`);
      return sendOk(res, {});
    }
    if (op === "school-account") {
      if (!need("schools")) return deny();
      if (req.method !== "POST") return sendMethodNotAllowed(res);
      const email = String(b.email || "").toLowerCase().trim();
      const { data: acc } = await sb.from("school_accounts").select("*").eq("teacher_email", email).maybeSingle();
      if (!acc) return sendErr(res, "School not found.", 404);
      const patch = {};
      const now = Date.now();
      if (b.action === "extend-trial") {
        const days = Math.round(Number(b.days));
        if (!(days > 0 && days <= 365)) return sendErr(res, "Enter 1 to 365 days.");
        const base = Math.max(now, acc.trial_ends_at ? new Date(acc.trial_ends_at).getTime() : now);
        patch.trial_ends_at = new Date(base + days * D).toISOString();
      } else if (b.action === "activate") {
        const days = Math.round(Number(b.days));
        if (!(days > 0 && days <= 1100)) return sendErr(res, "Enter how many days to activate (1 to 1100).");
        const base = Math.max(now, acc.paid_until ? new Date(acc.paid_until).getTime() : now);
        patch.paid_until = new Date(base + days * D).toISOString();
        const paid = Math.round(Number(b.amount) || 0);
        if (paid > 0) patch.amount_paid = Number(acc.amount_paid || 0) + paid;
      } else if (b.action === "deactivate") {
        patch.paid_until = null; patch.trial_ends_at = new Date(now - 1000).toISOString();
      } else if (b.action === "note") {
        patch.notes = clean(b.note, 500);
      } else return sendErr(res, "Unknown action.");
      await sb.from("school_accounts").update(patch).eq("teacher_email", email);
      await audit(sb, who, `school.${b.action}`, `${acc.school_name || email}${b.days ? ` ${b.days}d` : ""}${b.amount ? ` ₦${b.amount}` : ""}`);
      return sendOk(res, {});
    }
  } catch (e) {
    console.error(`[admin-ops:${op}]`, e?.message);
    return sendErr(res, "Server error", 500);
  }
  return sendErr(res, "Unknown op.", 404);
}
