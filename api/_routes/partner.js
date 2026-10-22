// Partner (affiliate) API: /api/partner/{signup,login,me,bank,payout,password}
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { checkRateLimit, clearRateLimit } from "../_helpers/rateLimit.js";
import {
  hashPartnerPassword, verifyPartnerPassword, makePartnerToken, partnerIdFromToken, makePartnerCode,
  encryptText, decryptText, encryptionReady, maskEmail, maskAccount, round2, getSettings, effectiveRate, sumCommissions,
} from "../_helpers/partners.js";
import { notifyAdmin } from "../_helpers/mail.js";

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
  const since = now - 29 * D - ((now + H) % D); // Lagos midnight 29 days ago

  const [students, comms, payouts, clicks, srcEv] = await Promise.all([
    sb.from("profiles").select("email,first_name,created_at,is_premium").eq("referrer_partner_id", p.id).order("created_at", { ascending: false }).limit(1000),
    sb.from("partner_commissions").select("*").eq("partner_id", p.id).order("created_at", { ascending: false }).limit(1000),
    sb.from("partner_payouts").select("id,amount,status,reference,note,requested_at,processed_at").eq("partner_id", p.id).order("requested_at", { ascending: false }).limit(100),
    sb.from("events").select("created_at").eq("type", "referral_link_opened").eq("payload->>referral_code", p.referral_code).limit(5000),
    sb.from("events").select("type,payload").in("type", ["visit_source", "signup_source"]).eq("payload->>ref", p.referral_code).gte("created_at", new Date(since).toISOString()).limit(5000),
  ]);
  const bySrc = {};
  for (const e of srcEv.data || []) {
    const k = String((e.payload && e.payload.source) || "direct").slice(0, 40);
    const o = (bySrc[k] = bySrc[k] || { visits: 0, signups: 0 });
    if (e.type === "visit_source") o.visits++; else o.signups++;
  }
  const sources = Object.entries(bySrc).map(([name, v]) => ({ name, ...v })).sort((a, b) => b.visits + b.signups - (a.visits + a.signups));
  const st = students.data || [], cm = comms.data || [], po = payouts.data || [], ck = clicks.data || [];

  const paidBy = {};
  for (const c of cm) if (c.status !== "cancelled") paidBy[c.referred_email] = (paidBy[c.referred_email] || 0) + Number(c.amount);
  const payers = new Set(cm.filter((c) => c.status !== "cancelled").map((c) => c.referred_email));

  // 30-day series
  const days = [];
  for (let i = 29; i >= 0; i--) days.push(lagosDay(now - i * D));
  const idx = Object.fromEntries(days.map((d, i) => [d, i]));
  const mk = () => new Array(30).fill(0);
  const series = { clicks: mk(), signups: mk(), earnings: mk() };
  for (const c of ck) { const i = idx[lagosDay(new Date(c.created_at).getTime())]; if (i !== undefined) series.clicks[i]++; }
  for (const s of st) { const i = idx[lagosDay(new Date(s.created_at).getTime())]; if (i !== undefined) series.signups[i]++; }
  for (const c of cm) { if (c.status === "cancelled") continue; const i = idx[lagosDay(new Date(c.created_at).getTime())]; if (i !== undefined) series.earnings[i] += Number(c.amount); }

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
    sources,
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
    let created = null;
    for (let i = 0; i < 6 && !created; i++) {
      const { data, error } = await sb.from("partners").insert({
        email, full_name: name, phone, password_hash: hashPartnerPassword(b.password), referral_code: makePartnerCode(), status: "pending",
      }).select("id").maybeSingle();
      if (error) { if (error.code === "23505" && !/email/.test(error.message)) continue; return sendErr(res, "Could not create account.", 500); }
      created = data;
    }
    if (!created) return sendErr(res, "Could not create account. Try again.", 500);
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
    await sb.from("partners").update({ last_login: new Date().toISOString() }).eq("id", p.id);
    return sendOk(res, { token: makePartnerToken(p.id) });
  }

  const p = await authed(req, res);
  if (!p) return;

  if (op === "me") {
    if (req.method !== "GET") return sendMethodNotAllowed(res);
    if (p.status === "pending") return sendOk(res, { pending: true, partner: publicPartner(p, await getSettings()) });
    try { return sendOk(res, await dashboard(p)); }
    catch (e) { console.error("[partner me]", e.message); return sendErr(res, "Could not load your dashboard.", 500); }
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
