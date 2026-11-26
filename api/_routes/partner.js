// Partner (affiliate) API: /api/partner/{signup,login,me,bank,payout,password}
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { checkRateLimit, clearRateLimit } from "../_helpers/rateLimit.js";
import {
  hashPartnerPassword, verifyPartnerPassword, makePartnerToken, partnerIdFromToken, makePartnerCode,
  encryptText, decryptText, encryptionReady, maskEmail, maskAccount, round2, getSettings, effectiveRate, sumCommissions,
} from "../_helpers/partners.js";
import { notifyAdmin } from "../_helpers/mail.js";
import { logPartnerActivity } from "../_helpers/partnerActivity.js";
import { getPricing } from "../_helpers/pricing.js";
import { RESOURCES } from "../_helpers/partnerResources.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ip = (req) => req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
const H = 3600000, D = 86400000;
const lagosDay = (ms) => new Date(ms + H).toISOString().slice(0, 10);

async function authed(req, res) {
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const id = partnerIdFromToken(token);
  if (!id) { sendErr(res, "Session expired. Please sign in again.", 401); return null; }
  const { data } = await getSupabase().from("partners").select("*").eq("id", id).maybeSingle();
  if (!data || data.status === "suspended") { sendErr(res, "This account is not active.", 401); return null; }
  return data;
}

const publicPartner = (p, settings) => ({
  id: p.id, name: p.full_name, email: p.email, phone: p.phone, status: p.status, code: p.referral_code,
  rate: effectiveRate(p, settings),
  bank: { bankName: p.bank_name || "", accountName: p.account_name || "", accountMasked: maskAccount(decryptText(p.account_number_enc)), saved: !!p.account_number_enc },
});

async function dashboard(p) {
  const sb = getSupabase();
  const settings = await getSettings();
  const now = Date.now();
  const N = 180; // days of history for the charts (so 90 days can be compared with the 90 before)

  const [students, comms, payouts, clicks, srcEv] = await Promise.all([
    sb.from("profiles").select("email,first_name,created_at,is_premium").eq("referrer_partner_id", p.id).order("created_at", { ascending: false }).limit(1000),
    sb.from("partner_commissions").select("*").eq("partner_id", p.id).order("created_at", { ascending: false }).limit(1000),
    sb.from("partner_payouts").select("id,amount,status,reference,note,requested_at,processed_at").eq("partner_id", p.id).order("requested_at", { ascending: false }).limit(100),
    sb.from("events").select("created_at").eq("type", "referral_link_opened").eq("payload->>referral_code", p.referral_code).limit(5000),
    sb.from("events").select("type,payload,created_at").in("type", ["visit_source", "signup_source"]).eq("payload->>ref", p.referral_code).limit(5000),
  ]);
  // traffic sources and tagged links, for today (1), this week (7), the last 30 / 90 days and all time (0)
  const srcFor = (n, fromMs) => {
    const from = fromMs ?? now - n * D, bySrc = {}, byTag = {};
    for (const e of srcEv.data || []) {
      if (new Date(e.created_at).getTime() < from) continue;
      const pl = e.payload || {};
      const k = String(pl.source || "direct").slice(0, 40);
      const o = (bySrc[k] = bySrc[k] || { visits: 0, signups: 0 });
      if (e.type === "visit_source") o.visits++; else o.signups++;
      if (pl.campaign) { const t = String(pl.campaign).slice(0, 40); const c = (byTag[t] = byTag[t] || { visits: 0, signups: 0 }); if (e.type === "visit_source") c.visits++; else c.signups++; }
    }
    const list = (m) => Object.entries(m).map(([name, v]) => ({ name, ...v })).sort((a, b) => b.visits + b.signups - (a.visits + a.signups));
    return { sources: list(bySrc), tags: list(byTag).slice(0, 15) };
  };
  const t0 = Date.parse(`${lagosDay(now)}T00:00:00Z`) - H; // start of today, Nigerian time
  const dow = (new Date(`${lagosDay(now)}T00:00:00Z`).getUTCDay() + 6) % 7; // Monday = 0
  const sourcesBy = { 0: srcFor(36500), 1: srcFor(1, t0), 7: srcFor(7, t0 - dow * D), 30: srcFor(30), 90: srcFor(90) }; // 1 = today, 7 = this week
  const sources = sourcesBy[30].sources;
  const st = students.data || [], cm = comms.data || [], po = payouts.data || [], ck = clicks.data || [];

  const paidBy = {};
  for (const c of cm) if (c.status !== "cancelled") paidBy[c.referred_email] = (paidBy[c.referred_email] || 0) + Number(c.amount);
  const payers = new Set(cm.filter((c) => c.status !== "cancelled").map((c) => c.referred_email));

  // daily series
  const days = [];
  for (let i = N - 1; i >= 0; i--) days.push(lagosDay(now - i * D));
  const idx = Object.fromEntries(days.map((d, i) => [d, i]));
  const mk = () => new Array(N).fill(0);
  const series = { clicks: mk(), signups: mk(), earnings: mk(), paying: mk() };
  for (const c of ck) { const i = idx[lagosDay(new Date(c.created_at).getTime())]; if (i !== undefined) series.clicks[i]++; }
  for (const s of st) { const i = idx[lagosDay(new Date(s.created_at).getTime())]; if (i !== undefined) series.signups[i]++; }
  for (const c of cm) { if (c.status === "cancelled") continue; const i = idx[lagosDay(new Date(c.created_at).getTime())]; if (i !== undefined) series.earnings[i] += Number(c.amount); }

  // first payment of each referred student (counts as "new paying student" on that day)
  const firstPaid = {};
  for (const c of cm) { if (c.status === "cancelled") continue; const t = new Date(c.created_at).getTime(); if (!firstPaid[c.referred_email] || t < firstPaid[c.referred_email]) firstPaid[c.referred_email] = t; }
  for (const t of Object.values(firstPaid)) { const i = idx[lagosDay(t)]; if (i !== undefined) series.paying[i]++; }
  const joined = Object.fromEntries(st.map((x) => [x.email, new Date(x.created_at).getTime()]));
  const gaps = Object.entries(firstPaid).filter(([e]) => joined[e]).map(([e, t]) => Math.max(0, (t - joined[e]) / D));
  const avgDaysToPay = gaps.length ? Math.round((gaps.reduce((a, b) => a + b, 0) / gaps.length) * 10) / 10 : null;

  // everything since the beginning, week by week (for the "All time" view)
  const wk = (ms) => { const day0 = Math.floor((ms + H) / D) * D - H; const dow = (new Date(day0 + H).getUTCDay() + 6) % 7; return day0 - dow * D; };
  const stamps = [...ck, ...st, ...cm].map((x) => new Date(x.created_at).getTime()).filter((t) => t > 0);
  const firstWeek = wk(stamps.length ? Math.min(...stamps) : now), lastWeek = wk(now);
  const weeks = [];
  for (let t = Math.max(firstWeek, lastWeek - 155 * 7 * D); t <= lastWeek; t += 7 * D) weeks.push(t);
  const widx = Object.fromEntries(weeks.map((t, i) => [t, i]));
  const wz = () => new Array(weeks.length).fill(0);
  const allTime = { labels: weeks.map((t) => lagosDay(t).slice(2)), clicks: wz(), signups: wz(), earnings: wz(), paying: wz() };
  for (const c of ck) { const i = widx[wk(new Date(c.created_at).getTime())]; if (i !== undefined) allTime.clicks[i]++; }
  for (const x of st) { const i = widx[wk(new Date(x.created_at).getTime())]; if (i !== undefined) allTime.signups[i]++; }
  for (const c of cm) { if (c.status === "cancelled") continue; const i = widx[wk(new Date(c.created_at).getTime())]; if (i !== undefined) allTime.earnings[i] += Number(c.amount); }
  for (const t of Object.values(firstPaid)) { const i = widx[wk(t)]; if (i !== undefined) allTime.paying[i]++; }
  allTime.earnings = allTime.earnings.map(round2);

  // when the link gets clicked (last 90 days, Nigerian time)
  const hours = new Array(24).fill(0), weekdays = new Array(7).fill(0);
  for (const c of ck) { const t = new Date(c.created_at).getTime(); if (t < now - 90 * D) continue; const l = new Date(t + H); hours[l.getUTCHours()]++; weekdays[(l.getUTCDay() + 6) % 7]++; }

  // earnings by month, last 6 months
  const monthKey = (ms) => new Date(ms + H).toISOString().slice(0, 7);
  const months = [];
  for (let i = 5; i >= 0; i--) { const d = new Date(now + H); d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() - i); months.push(d.toISOString().slice(0, 7)); }
  const monthly = { labels: months.map((m) => m.slice(2).replace("-", "/")), keys: months, values: months.map(() => 0) };
  for (const c of cm) { if (c.status === "cancelled") continue; const i = months.indexOf(monthKey(new Date(c.created_at).getTime())); if (i >= 0) monthly.values[i] += Number(c.amount); }
  monthly.values = monthly.values.map(round2);

  const totals = sumCommissions(cm);
  const open = po.find((x) => x.status === "requested");
  return {
    partner: publicPartner(p, settings),
    settings: { minPayout: settings.minPayout },
    kpis: {
      clicks: ck.length, signups: st.length, paying: payers.size,
      conversion: st.length ? Math.round((payers.size / st.length) * 1000) / 10 : 0,
      ...totals,
    },
    openPayout: open || null,
    sources, sourcesBy, avgDaysToPay, hours, weekdays, monthly, allTime,
    series: { labels: days.map((d) => d.slice(5)), ...series },
    referrals: st.slice(0, 300).map((s) => ({
      name: s.first_name || "Student", email: maskEmail(s.email), joined: s.created_at,
      status: payers.has(s.email) ? "Paid" : "Signed up", earned: round2(paidBy[s.email] || 0),
    })),
    commissions: cm.slice(0, 200).map((c) => ({
      id: c.id, email: maskEmail(c.referred_email), paymentAmount: c.payment_amount, rate: c.rate, amount: c.amount, status: c.status, at: c.created_at,
    })),
    payouts: po,
  };
}

export default async function handler(req, res) {
  setCors(res);
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!supabaseEnabled()) return sendErr(res, "Partner system is not configured yet.", 503);
  const op = req.query.op;
  const sb = getSupabase();

  if (op === "signup") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const { allowed } = await checkRateLimit(`partner-signup:${ip(req)}`, 5, 3600);
    if (!allowed) return sendErr(res, "Too many attempts. Try again later.", 429);
    const b = readBody(req);
    const email = String(b.email || "").toLowerCase().trim();
    const name = String(b.name || "").trim().slice(0, 80);
    const phone = String(b.phone || "").trim().slice(0, 25);
    if (name.length < 2) return sendErr(res, "Enter your full name.");
    if (!EMAIL_RE.test(email)) return sendErr(res, "Enter a valid email address.");
    if (String(b.password || "").length < 8) return sendErr(res, "Password must be at least 8 characters.");
    if (phone.replace(/\D/g, "").length < 10) return sendErr(res, "Enter a valid phone number.");

    const { data: exists } = await sb.from("partners").select("id").eq("email", email).maybeSingle();
    if (exists) return sendErr(res, "A partner account with this email already exists.");
    // Someone we approved through Hiring signs up with their personal link and is activated straight away.
    let hired = null;
    const hireTok = String(b.hire || "").trim().slice(0, 60);
    if (hireTok) {
      const { data: ha } = await sb.from("hiring_applications").select("id,email,status,job_id").eq("token", hireTok).maybeSingle();
      if (ha && ha.status === "approved" && String(ha.email).toLowerCase() === email) hired = ha;
    }
    let created = null;
    for (let i = 0; i < 6 && !created; i++) {
      const { data, error } = await sb.from("partners").insert({
        email, full_name: name, phone, password_hash: hashPartnerPassword(b.password), referral_code: makePartnerCode(), status: hired ? "active" : "pending",
        ...(hired ? { approved_at: new Date().toISOString() } : {}),
      }).select("id").maybeSingle();
      if (error) { if (error.code === "23505" && !/email/.test(error.message)) continue; return sendErr(res, "Could not create account.", 500); }
      created = data;
    }
    if (!created) return sendErr(res, "Could not create account. Try again.", 500);
    if (hired) {
      await sb.from("hiring_applications").update({ status: "joined", joined_at: new Date().toISOString() }).eq("id", hired.id);
      try { await sb.from("hiring_events").insert({ job_id: hired.job_id, app_id: hired.id, type: "joined", text: `${email} signed up as a partner and is active` }); } catch { /* ignore */ }
      try {
        const { sendGroupInvite } = await import("../_helpers/hiring.js");
        const { data: hj } = await sb.from("hiring_jobs").select("*").eq("id", hired.job_id).maybeSingle();
        const { data: hf } = await sb.from("hiring_applications").select("*").eq("id", hired.id).maybeSingle();
        if (hj && hf && hj.group_url) await sendGroupInvite(sb, hj, hf);
      } catch (e) { console.warn("[hire] group invite", e && e.message); }
      return sendOk(res, { message: "Your partner account is ready. Sign in to get your link." });
    }
    await notifyAdmin("New partner waiting for your approval", "A new affiliate partner has signed up and is waiting for you to approve them.", { emoji: "🤝", heading: "New partner to approve", rows: [["Name", name], ["Email", email], ["Phone", phone || "—"]], cta: { label: "Review in admin", url: "https://elitescholars.site/admin" } });
    return sendOk(res, { message: "Account created. We will review and approve it shortly, and email you." });
  }

  if (op === "login") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const b = readBody(req);
    const email = String(b.email || "").toLowerCase().trim();
    const key = `partner-login:${email}:${ip(req)}`;
    const { allowed } = await checkRateLimit(key, 8, 900);
    if (!allowed) return sendErr(res, "Too many attempts. Try again in 15 minutes.", 429);
    const { data: p } = await sb.from("partners").select("*").eq("email", email).maybeSingle();
    if (!p || !verifyPartnerPassword(b.password, p.password_hash)) return sendErr(res, "Incorrect email or password.", 401);
    if (p.status === "suspended") return sendErr(res, "This account has been suspended. Contact EliteScholars.", 403);
    await clearRateLimit(key);
    await sb.from("partners").update({ last_login: new Date().toISOString(), last_seen: new Date().toISOString(), inactivity_warned_at: null }).eq("id", p.id);
    await logPartnerActivity(p, "login");
    return sendOk(res, { token: makePartnerToken(p.id) });
  }

  const p = await authed(req, res);
  if (!p) return;

  if (op === "me") {
    if (req.method !== "GET") return sendMethodNotAllowed(res);
    if (p.status === "pending") return sendOk(res, { pending: true, partner: publicPartner(p, await getSettings()) });
    try {
      // opening the portal with a saved session counts as being active (at most once every 30 minutes)
      if (!p.last_seen || Date.now() - new Date(p.last_seen).getTime() > 30 * 60000) {
        await sb.from("partners").update({ last_seen: new Date().toISOString(), last_login: new Date().toISOString(), inactivity_warned_at: null }).eq("id", p.id);
        await logPartnerActivity(p, "login", "returned to dashboard");
      }
      const dash = await dashboard(p);
      const pr = await getPricing();
      return sendOk(res, { ...dash, prices: pr, resources: RESOURCES });
    }
    catch (e) { console.error("[partner me]", e.message); return sendErr(res, "Could not load your dashboard.", 500); }
  }

  if (op === "track") { // the portal reports: copied a link, opened/downloaded a resource, checked prices
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const b = readBody(req);
    const kind = String(b.kind || "");
    if (!["copy_link", "resource_view", "resource_download", "prices_view"].includes(kind)) return sendErr(res, "Unknown activity.");
    await logPartnerActivity(p, kind, b.detail);
    return sendOk(res, {});
  }

  if (op === "bank") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    if (!encryptionReady()) return sendErr(res, "Bank details cannot be saved yet. Please contact EliteScholars.", 503);
    const b = readBody(req);
    const bankName = String(b.bankName || "").trim().slice(0, 60);
    const accountName = String(b.accountName || "").trim().slice(0, 80);
    const acct = String(b.accountNumber || "").replace(/\s/g, "");
    if (!bankName || accountName.length < 2) return sendErr(res, "Enter your bank and the account name.");
    if (!/^\d{10}$/.test(acct)) return sendErr(res, "Account number must be 10 digits.");
    await sb.from("partners").update({ bank_name: bankName, account_name: accountName, account_number_enc: encryptText(acct) }).eq("id", p.id);
    return sendOk(res, { message: "Bank details saved." });
  }

  if (op === "password") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const b = readBody(req);
    if (!verifyPartnerPassword(b.current, p.password_hash)) return sendErr(res, "Current password is wrong.", 401);
    if (String(b.next || "").length < 8) return sendErr(res, "New password must be at least 8 characters.");
    await sb.from("partners").update({ password_hash: hashPartnerPassword(b.next) }).eq("id", p.id);
    return sendOk(res, { message: "Password changed." });
  }

  if (op === "payout") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    if (p.status !== "active") return sendErr(res, "Your account is not approved yet.", 403);
    if (!p.account_number_enc) return sendErr(res, "Add your bank details first.");
    const settings = await getSettings();
    const { data: earned } = await sb.from("partner_commissions").select("id,amount").eq("partner_id", p.id).eq("status", "earned");
    const total = round2((earned || []).reduce((a, c) => a + Number(c.amount), 0));
    if (!earned?.length || total < settings.minPayout) return sendErr(res, `Minimum payout is ₦${settings.minPayout.toLocaleString("en-NG")}. You have ₦${total.toLocaleString("en-NG")} available.`);

    const { data: payout, error } = await sb.from("partner_payouts").insert({
      partner_id: p.id, amount: total, bank_name: p.bank_name, account_name: p.account_name, account_number_enc: p.account_number_enc,
    }).select("id").maybeSingle();
    if (error) return sendErr(res, error.code === "23505" ? "You already have a payout request waiting." : "Could not create the request.", error.code === "23505" ? 400 : 500);

    const { data: locked } = await sb.from("partner_commissions").update({ status: "in_payout", payout_id: payout.id })
      .in("id", earned.map((c) => c.id)).eq("status", "earned").select("amount");
    const locked2 = round2((locked || []).reduce((a, c) => a + Number(c.amount), 0));
    if (locked2 !== total) await sb.from("partner_payouts").update({ amount: locked2 || 0.01 }).eq("id", payout.id);
    await notifyAdmin("Partner payout requested", "A partner has asked to be paid out.", { emoji: "💸", heading: "Payout request", rows: [["Partner", p.full_name], ["Email", p.email], ["Amount", `₦${locked2.toLocaleString("en-NG")}`]] });
    return sendOk(res, { amount: locked2 });
  }
  return sendErr(res, "Unknown op.");
}
