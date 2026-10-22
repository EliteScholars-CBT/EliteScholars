// /api/admin/login (POST {password})   /api/admin/stats (GET, Bearer token)
// Protected by ADMIN_PASSWORD (Vercel env). Sessions are short-lived signed tokens.
import crypto from "crypto";
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { checkRateLimit } from "../_helpers/rateLimit.js";
import { verifyPassword } from "../_helpers/hash.js";

const TTL_MS = 12 * 60 * 60 * 1000;
const SUB_TTL_MS = 6 * 60 * 60 * 1000;
const secret = () => process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
const sign = (exp) => crypto.createHmac("sha256", secret()).update(String(exp)).digest("hex");
const digest = (s) => crypto.createHash("sha256").update(String(s)).digest();
const safeEq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };

// Permissions a sub-admin can be given. Michael (the owner password) always has all of them.
export const ADMIN_PERMS = {
  analytics: "Analytics & overview", students: "Students & activity", blog: "Blog analytics", partners: "Affiliate partners",
  payouts: "Partner payouts & commissions", mail: "Send emails", reports: "Question reports", access: "Access & free trials",
  prices: "Prices & school plans", schools: "Schools", ai: "AI keys", ads: "Ads", shop: "Shop items", status: "Status monitoring",
};
export const ROLE_TEMPLATES = {
  support: { label: "Support", perms: ["students", "reports", "access", "status"] },
  marketing: { label: "Marketing", perms: ["analytics", "blog", "mail", "partners", "ads", "shop"] },
  finance: { label: "Finance", perms: ["analytics", "partners", "payouts", "prices"] },
  content: { label: "Content", perms: ["reports", "blog"] },
};

function makeToken() {
  const exp = Date.now() + TTL_MS;
  return `${exp}.${sign(exp)}`;
}
export function makeSubToken(admin) {
  const body = Buffer.from(JSON.stringify({ i: admin.id, n: admin.name, p: admin.perms, e: Date.now() + SUB_TTL_MS })).toString("base64url");
  return `a1.${body}.${crypto.createHmac("sha256", secret()).update(`a1.${body}`).digest("base64url")}`;
}
// Who is this token? → { owner, id, name, perms } or null (signature + expiry only).
export function adminFromToken(token) {
  if (!secret() || !token) return null;
  const t = String(token);
  if (t.startsWith("a1.")) {
    const [, body, sig] = t.split(".");
    if (!body || !sig) return null;
    const good = crypto.createHmac("sha256", secret()).update(`a1.${body}`).digest("base64url");
    if (!safeEq(sig, good)) return null;
    try {
      const p = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
      if (!p.e || p.e < Date.now()) return null;
      return { owner: false, id: p.i, name: p.n, perms: Array.isArray(p.p) ? p.p : [] };
    } catch { return null; }
  }
  const [exp, sig] = t.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return null;
  if (!safeEq(sig, sign(exp))) return null;
  return { owner: true, id: "owner", name: "Owner", perms: Object.keys(ADMIN_PERMS) };
}
// perm omitted = any signed-in admin. Owner passes every check.
export function tokenOk(token, perm) {
  const a = adminFromToken(token);
  if (!a) return false;
  return a.owner || !perm || a.perms.includes(perm);
}

// Supabase returns at most 1000 rows per request, so page through.
async function fetchAll(sb, table, cols, apply, maxPages = 30) {
  const out = [];
  for (let i = 0; i < maxPages; i++) {
    let q = sb.from(table).select(cols);
    if (apply) q = apply(q);
    const { data, error } = await q.range(i * 1000, i * 1000 + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    out.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return out;
}

// ── Time helpers: everything is bucketed in Nigerian time (UTC+1, no DST) ───
const H = 3600000, D = 86400000;
const lagosISO = (ms) => new Date(ms + H).toISOString();
const dayStart = (ms) => Math.floor((ms + H) / D) * D - H; // Lagos midnight, as UTC ms
const ymd = (ms) => lagosISO(ms).slice(0, 10);
const parseDay = (str) => { const [y, m, d] = String(str).split("-").map(Number); return Date.UTC(y, m - 1, d) - H; };

function resolveRange(q, earliestMs) {
  const now = Date.now();
  const today0 = dayStart(now);
  const r = String(q.range || "30d");
  let from, to = now, label;
  if (r === "today") { from = today0; label = "Today"; }
  else if (r === "7d") { from = today0 - 6 * D; label = "Last 7 days"; }
  else if (r === "30d") { from = today0 - 29 * D; label = "Last 30 days"; }
  else if (r === "90d") { from = today0 - 89 * D; label = "Last 90 days"; }
  else if (r === "thismonth") { const t = lagosISO(now); from = parseDay(`${t.slice(0, 7)}-01`); label = "This month"; }
  else if (/^month:\d{4}-\d{2}$/.test(r)) {
    const [y, m] = r.slice(6).split("-").map(Number);
    from = Date.UTC(y, m - 1, 1) - H; to = Math.min(now, Date.UTC(y, m, 1) - H - 1);
    label = new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
  }
  else if (r === "thisyear") { from = parseDay(`${lagosISO(now).slice(0, 4)}-01-01`); label = "This year"; }
  else if (/^year:\d{4}$/.test(r)) {
    const y = Number(r.slice(5)); from = Date.UTC(y, 0, 1) - H; to = Math.min(now, Date.UTC(y + 1, 0, 1) - H - 1); label = String(y);
  }
  else if (r === "all") { from = dayStart(earliestMs || now - 365 * D); label = "All time"; }
  else if (r === "custom" && q.from && q.to) {
    from = parseDay(q.from); to = Math.min(now, parseDay(q.to) + D - 1); label = `${q.from} to ${q.to}`;
  }
  else { from = today0 - 29 * D; label = "Last 30 days"; }
  if (!(from < to)) from = to - D;
  const span = to - from;
  const bucket = span <= 2 * D ? "hour" : span <= 92 * D ? "day" : "month";
  return { key: r, from, to, label, bucket, prevFrom: from - span, prevTo: from - 1 };
}

function makeBuckets(from, to, bucket) {
  const keys = [];
  if (bucket === "month") {
    let t = new Date(lagosISO(from).slice(0, 7) + "-01T00:00:00Z");
    const end = new Date(lagosISO(to).slice(0, 7) + "-01T00:00:00Z");
    while (t <= end) { keys.push(t.toISOString().slice(0, 7)); t = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 1)); }
  } else {
    const step = bucket === "hour" ? H : D;
    const start = bucket === "hour" ? Math.floor((from + H) / H) * H - H : dayStart(from);
    for (let t = start; t <= to; t += step) keys.push(lagosISO(t).slice(0, bucket === "hour" ? 13 : 10));
  }
  return keys;
}
const bucketKey = (ms, bucket) => lagosISO(ms).slice(0, bucket === "hour" ? 13 : bucket === "day" ? 10 : 7);
const labelFor = (k, bucket) => bucket === "hour" ? `${k.slice(11)}:00` : bucket === "day" ? k.slice(5) : k;

const SKIP_EVENTS = "(xp_earned,quiz_complete_xp,leaderboard_view,leaderboard_filter)";

function aggregate(rows, from, to, bucket) {
  const keys = makeBuckets(from, to, bucket);
  const idx = Object.fromEntries(keys.map((k, i) => [k, i]));
  const n = keys.length;
  const z = () => new Array(n).fill(0);
  const series = { signups: z(), quizzes: z(), revenue: z(), challenges: z(), xp: z(), active: z() };
  const activeSets = keys.map(() => new Set());
  const inR = (ts) => ts >= from && ts <= to;
  const put = (name, ts, v = 1) => { const i = idx[bucketKey(ts, bucket)]; if (i !== undefined) series[name][i] += v; };

  const out = { keys, series, activeAll: new Set(), hours: new Array(24).fill(0), weekdays: new Array(7).fill(0) };
  const touch = (email, ts) => {
    const i = idx[bucketKey(ts, bucket)];
    if (i !== undefined && email) { activeSets[i].add(email); out.activeAll.add(email); }
    const l = new Date(ts + H);
    out.hours[l.getUTCHours()]++;
    out.weekdays[(l.getUTCDay() + 6) % 7]++; // Monday first
  };
  for (const p of rows.profiles) { const t = new Date(p.created_at).getTime(); if (inR(t)) put("signups", t); }
  for (const x of rows.xp) { const t = new Date(x.created_at).getTime(); if (!inR(t)) continue; put("xp", t, Math.max(0, Number(x.amount) || 0)); touch(x.email, t); }
  for (const e of rows.events) {
    const t = new Date(e.created_at).getTime(); if (!inR(t)) continue;
    if (e.type === "quiz_complete") put("quizzes", t);
    if (e.email && e.type !== "register") touch(e.email, t);
  }
  for (const c of rows.challenges) { const t = new Date(c.created_at).getTime(); if (inR(t)) put("challenges", t); }
  for (const p of rows.payments) { if (p.status !== "successful") continue; const t = new Date(p.created_at).getTime(); if (inR(t)) put("revenue", t, Number(p.amount) || 0); }
  series.active = activeSets.map((s) => s.size);
  return out;
}

const sum = (a) => a.reduce((x, y) => x + y, 0);
const pct = (cur, prev) => (prev > 0 ? Math.round(((cur - prev) / prev) * 100) : cur > 0 ? null : 0);
const pctOf = (a, b) => (b > 0 ? Math.round((a / b) * 100) : 0);

function buildInsights(d) {
  const out = [];
  const add = (tone, text) => out.push({ tone, text });
  const k = d.kpis;
  const trend = (name, key, fmt = (x) => x) => {
    const c = pct(k[key].v, k[key].prev);
    if (c === null) add("good", `${name} appeared this period (${fmt(k[key].v)}) with none in the previous one.`);
    else if (Math.abs(c) >= 10 && (k[key].v + k[key].prev) >= 5) add(c > 0 ? "good" : "warn", `${name} ${c > 0 ? "rose" : "fell"} ${Math.abs(c)}% versus the previous period (${fmt(k[key].prev)} to ${fmt(k[key].v)}).`);
  };
  trend("New signups", "signups");
  trend("Active students", "active");
  trend("Completed quizzes", "quizzes");
  trend("Revenue", "revenue", (x) => "₦" + Number(x).toLocaleString("en-NG"));

  const hrs = d.hours, tot = sum(hrs);
  if (tot >= 30) {
    const peak = hrs.indexOf(Math.max(...hrs));
    const wd = d.weekdays, pd = wd.indexOf(Math.max(...wd));
    const names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const hh = (h) => `${h % 12 || 12}${h < 12 ? "am" : "pm"}`;
    add("info", `Students are busiest around ${hh(peak)} on ${names[pd]}s (Nigerian time). Schedule reminders, posts and challenges just before that window.`);
  }
  if (d.funnel.quizStarted >= 10) {
    const rate = pctOf(d.funnel.quizCompleted, d.funnel.quizStarted);
    if (rate < 60) add("warn", `Only ${rate}% of started quizzes are finished. Many students leave midway; shorter quizzes or a saved-progress prompt could help.`);
    else if (rate >= 80) add("good", `${rate}% of started quizzes are completed, which shows strong engagement once students begin.`);
  }
  if (d.activation.newStudents >= 5) {
    const a = pctOf(d.activation.activated, d.activation.newStudents);
    add(a < 50 ? "warn" : "good", `${a}% of new students did something in the app after signing up (${d.activation.activated} of ${d.activation.newStudents}). ${a < 50 ? "Many register and never come back; a welcome flow or first-day reminder should lift this." : "Signups are turning into real use."}`);
  }
  if (d.returning.total >= 5) {
    const r = pctOf(d.returning.returning, d.returning.total);
    add("info", `${r}% of active students signed up before this period (returning); ${100 - r}% are new.`);
  }
  if (k.signups.v >= 5 && k.payments.v >= 0) {
    const c = ((k.payments.v / k.signups.v) * 100).toFixed(1);
    add("info", `${k.payments.v} payment${k.payments.v === 1 ? "" : "s"} against ${k.signups.v} new signups (${c}%). This is a rough conversion signal, since buyers may have joined earlier.`);
  }
  if (d.referralSignups >= 3 && k.signups.v > 0) add("good", `${pctOf(d.referralSignups, k.signups.v)}% of signups came through referral links.`);
  if (d.pwa.shown >= 10) {
    const r = pctOf(d.pwa.installed, d.pwa.shown);
    add(r < 5 ? "warn" : "info", `Install banner: ${d.pwa.installed} installs from ${d.pwa.shown} views (${r}%).${r < 5 ? " Try a clearer benefit line or show it after a good result, like finishing a quiz." : ""}`);
  }
  const lf = (d.security.find((s) => s.name === "login_failed") || {}).count || 0;
  if (lf >= 20) add("warn", `${lf} failed logins in this period. Worth watching for password-guessing attempts.`);
  if (d.topSubjects[0] && d.topSubjects[0].count >= 5) add("info", `${d.topSubjects[0].name} is the most-played subject (${d.topSubjects[0].count} quiz starts).`);
  if (!out.length) add("info", "Not enough activity in this period to draw conclusions yet. Pick a wider range or check back as data builds up.");
  return out.slice(0, 9);
}

async function buildStats(q) {
  const sb = getSupabase();
  const profiles = await fetchAll(sb, "profiles", "email,created_at,is_premium,expires_at,student_type");
  const earliest = profiles.reduce((m, p) => Math.min(m, new Date(p.created_at).getTime()), Date.now());
  const rg = resolveRange(q, earliest);
  const since = new Date(rg.prevFrom).toISOString();
  const until = new Date(rg.to).toISOString();
  const win = (qb) => qb.gte("created_at", since).lte("created_at", until);

  const [xp, events, challenges, payments, referrals] = await Promise.all([
    fetchAll(sb, "xp_events", "email,created_at,amount", win, 60),
    fetchAll(sb, "events", "type,email,payload,created_at", (qb) => win(qb).not("type", "in", SKIP_EVENTS), 60),
    fetchAll(sb, "challenges", "status,created_at", win),
    fetchAll(sb, "payments", "email,plan,amount,created_at,status"),
    fetchAll(sb, "referrals", "code,created_at", win),
  ]);

  const rows = { profiles, xp, events, challenges, payments };
  const cur = aggregate(rows, rg.from, rg.to, rg.bucket);
  const prev = aggregate(rows, rg.prevFrom, rg.prevTo, rg.bucket);

  const inCur = (t) => { const x = new Date(t).getTime(); return x >= rg.from && x <= rg.to; };
  const curEvents = events.filter((e) => inCur(e.created_at));
  const ec = {};
  const subjects = {}, exams = {}, security = {};
  const pwa = { shown: 0, installed: 0, dismissed: 0, askedYes: 0, askedNo: 0 };
  for (const e of curEvents) {
    ec[e.type] = (ec[e.type] || 0) + 1;
    const pl = e.payload || {};
    if (e.type === "pwa_banner_shown") pwa.shown++;
    if (e.type === "pwa_installed") pwa.installed++;
    if (e.type === "pwa_banner_dismissed") pwa.dismissed++;
    if (e.type === "pwa_install_response") { const v = JSON.stringify(pl).toLowerCase(); if (v.includes("yes") || v.includes("true")) pwa.askedYes++; else pwa.askedNo++; }
    if (e.type === "quiz_start") {
      const s = pl.subject || pl.subject_id || pl.subjectLabel; if (s) subjects[s] = (subjects[s] || 0) + 1;
      const x = pl.exam_type || pl.examType || pl.exam; if (x) exams[x] = (exams[x] || 0) + 1;
    }
    if (String(e.type).startsWith("security_")) security[e.type.slice(9)] = (security[e.type.slice(9)] || 0) + 1;
  }
  const top = (obj, n) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n).map(([name, count]) => ({ name, count }));

  const curPays = payments.filter((p) => p.status === "successful" && inCur(p.created_at));
  const plans = {};
  for (const p of curPays) { const o = plans[p.plan || "unknown"] || (plans[p.plan || "unknown"] = { name: p.plan || "unknown", count: 0, amount: 0 }); o.count++; o.amount += Number(p.amount) || 0; }

  const refByCode = {};
  const curRefs = referrals.filter((r) => inCur(r.created_at));
  for (const r of curRefs) refByCode[r.code] = (refByCode[r.code] || 0) + 1;

  const newProfiles = profiles.filter((p) => inCur(p.created_at));
  const newEmails = new Set(newProfiles.map((p) => p.email));
  const activeNew = [...cur.activeAll].filter((e) => newEmails.has(e)).length;
  const typeCount = {};
  for (const p of newProfiles) typeCount[p.student_type || "unknown"] = (typeCount[p.student_type || "unknown"] || 0) + 1;

  const chStatus = {};
  for (const c of challenges.filter((c) => inCur(c.created_at))) chStatus[c.status] = (chStatus[c.status] || 0) + 1;

  const kv = (key) => ({ v: sum(cur.series[key]), prev: sum(prev.series[key]) });
  const kpis = {
    signups: kv("signups"), quizzes: kv("quizzes"), revenue: kv("revenue"), challenges: kv("challenges"), xp: kv("xp"),
    active: { v: cur.activeAll.size, prev: prev.activeAll.size },
    payments: { v: curPays.length, prev: payments.filter((p) => p.status === "successful" && new Date(p.created_at).getTime() >= rg.prevFrom && new Date(p.created_at).getTime() <= rg.prevTo).length },
  };

  const data = {
    generatedAt: new Date().toISOString(),
    range: { key: rg.key, label: rg.label, bucket: rg.bucket, from: ymd(rg.from), to: ymd(rg.to) },
    truncated: [xp, events].some((a) => a.length >= 60000),
    totals: {
      students: profiles.length,
      premiumActive: profiles.filter((p) => p.is_premium && p.expires_at && new Date(p.expires_at) > new Date()).length,
      revenueAllTime: payments.filter((p) => p.status === "successful").reduce((a, p) => a + Number(p.amount || 0), 0),
    },
    kpis,
    series: { labels: cur.keys.map((k) => labelFor(k, rg.bucket)), keys: cur.keys, ...cur.series },
    prevSeries: prev.series,
    hours: cur.hours,
    weekdays: cur.weekdays,
    funnel: { registered: newProfiles.length, quizStarted: ec.quiz_start || 0, quizCompleted: ec.quiz_complete || 0 },
    activation: { newStudents: newProfiles.length, activated: activeNew },
    returning: { total: cur.activeAll.size, returning: cur.activeAll.size - activeNew },
    topEvents: top(ec, 12),
    topSubjects: top(subjects, 8),
    examTypes: top(exams, 6),
    studentTypes: top(typeCount, 6),
    challengeStatus: chStatus,
    plans: Object.values(plans),
    pwa,
    referralCodes: top(refByCode, 10),
    referralSignups: curRefs.length,
    security: top(security, 8),
    recentPayments: curPays.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10)
      .map((p) => ({ email: p.email, plan: p.plan, amount: p.amount, at: p.created_at })),
  };
  data.insights = buildInsights(data);
  return data;
}

export default async function handler(req, res) {
  setCors(res);
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  const op = req.query.op;

  if (!process.env.ADMIN_PASSWORD) return sendErr(res, "Admin is not configured (ADMIN_PASSWORD missing).", 503);

  if (op === "login") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
    const { allowed } = await checkRateLimit(`admin-login:${ip}`, 6, 900);
    if (!allowed) return sendErr(res, "Too many attempts. Try again in 15 minutes.", 429);
    const { password, email } = readBody(req);
    if (email) {
      // sub-admin sign-in
      if (!supabaseEnabled()) return sendErr(res, "Not available.", 503);
      const em = String(email).toLowerCase().trim();
      const { data: ad } = await getSupabase().from("admin_users").select("*").eq("email", em).maybeSingle();
      const okPw = ad && ad.active && password && verifyPassword(String(password), ad.pass_hash).ok;
      if (!okPw) return sendErr(res, "Wrong email or password.", 401);
      await getSupabase().from("admin_users").update({ last_login: new Date().toISOString() }).eq("id", ad.id);
      return sendOk(res, { token: makeSubToken(ad), admin: { name: ad.name, perms: ad.perms } });
    }
    const ok = password && crypto.timingSafeEqual(digest(password), digest(process.env.ADMIN_PASSWORD));
    if (!ok) return sendErr(res, "Wrong password.", 401);
    return sendOk(res, { token: makeToken(), admin: { name: "Owner", perms: Object.keys(ADMIN_PERMS), owner: true } });
  }

  if (op === "stats") {
    if (req.method !== "GET") return sendMethodNotAllowed(res);
    const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (!tokenOk(token, "analytics")) return sendErr(res, "Session expired. Please sign in again.", 401);
    if (!supabaseEnabled()) return sendErr(res, "Supabase is not configured.", 503);
    try {
      return sendOk(res, { stats: await buildStats(req.query) });
    } catch (e) {
      console.error("[admin stats]", e.message);
      return sendErr(res, "Could not load stats.", 500);
    }
  }
  return sendErr(res, "Unknown op.");
}
