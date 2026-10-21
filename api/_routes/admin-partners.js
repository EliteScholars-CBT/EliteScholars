// Admin view of the affiliate programme.
// /api/admin/partners (GET) /partner (GET ?id=) /partner-action (POST) /payouts (GET) /payout-action (POST) /settings (GET|POST)
import crypto from "crypto";
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { tokenOk } from "./admin.js";
import {
  hashPartnerPassword, decryptText, getSettings, effectiveRate, sumCommissions, validCode, round2,
} from "../_helpers/partners.js";
import { sendMail, sendHtml } from "../_helpers/mail.js";
import { partnerApprovedEmail, payoutPaidEmail } from "../_helpers/emailTemplates.js";

const D = 86400000, H = 3600000;
const lagosDay = (ms) => new Date(ms + H).toISOString().slice(0, 10);
const group = (rows, key) => { const m = {}; for (const r of rows) (m[r[key]] ||= []).push(r); return m; };

async function fetchAll(sb, table, cols, apply) {
  const out = [];
  for (let i = 0; i < 40; i++) {
    let q = sb.from(table).select(cols);
    if (apply) q = apply(q);
    const { data, error } = await q.range(i * 1000, i * 1000 + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    out.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return out;
}

async function overview(sb) {
  const settings = await getSettings();
  const [partners, students, comms, payouts, clicks] = await Promise.all([
    fetchAll(sb, "partners", "id,email,full_name,phone,referral_code,status,commission_rate,created_at,approved_at,last_login,bank_name"),
    fetchAll(sb, "profiles", "referrer_partner_id,created_at", (q) => q.not("referrer_partner_id", "is", null)),
    fetchAll(sb, "partner_commissions", "partner_id,referred_email,amount,status,created_at"),
    fetchAll(sb, "partner_payouts", "id,partner_id,amount,status,requested_at"),
    fetchAll(sb, "events", "payload,created_at", (q) => q.eq("type", "referral_link_opened")),
  ]);
  const sBy = group(students, "referrer_partner_id");
  const cBy = group(comms, "partner_id");
  const clicksByCode = {};
  for (const c of clicks) { const k = c.payload?.referral_code; if (k) clicksByCode[k] = (clicksByCode[k] || 0) + 1; }

  const rows = partners.map((p) => {
    const cm = cBy[p.id] || [];
    const t = sumCommissions(cm);
    const payers = new Set(cm.filter((c) => c.status !== "cancelled").map((c) => c.referred_email));
    return {
      id: p.id, name: p.full_name, email: p.email, phone: p.phone, code: p.referral_code, status: p.status,
      customRate: p.commission_rate, rate: effectiveRate(p, settings), joined: p.created_at, lastLogin: p.last_login,
      hasBank: !!p.bank_name, clicks: clicksByCode[p.referral_code] || 0,
      signups: (sBy[p.id] || []).length, paying: payers.size, ...t,
    };
  });

  // programme-wide trend: partner-attributed signups per day, last 30 days
  const now = Date.now();
  const days = []; for (let i = 29; i >= 0; i--) days.push(lagosDay(now - i * D));
  const idx = Object.fromEntries(days.map((d, i) => [d, i]));
  const signups = new Array(30).fill(0), earnings = new Array(30).fill(0);
  for (const s of students) { const i = idx[lagosDay(new Date(s.created_at).getTime())]; if (i !== undefined) signups[i]++; }
  for (const c of comms) { if (c.status === "cancelled") continue; const i = idx[lagosDay(new Date(c.created_at).getTime())]; if (i !== undefined) earnings[i] += Number(c.amount); }

  const all = sumCommissions(comms);
  return {
    settings,
    summary: {
      partners: partners.length,
      active: partners.filter((p) => p.status === "active").length,
      pending: partners.filter((p) => p.status === "pending").length,
      suspended: partners.filter((p) => p.status === "suspended").length,
      referredStudents: students.length,
      payingReferred: new Set(comms.filter((c) => c.status !== "cancelled").map((c) => c.referred_email)).size,
      clicks: clicks.length,
      openPayouts: payouts.filter((x) => x.status === "requested").length,
      openPayoutAmount: round2(payouts.filter((x) => x.status === "requested").reduce((a, x) => a + Number(x.amount), 0)),
      ...all,
    },
    series: { labels: days.map((d) => d.slice(5)), signups, earnings },
    partners: rows.sort((a, b) => b.earnedTotal - a.earnedTotal || b.signups - a.signups),
  };
}

async function detail(sb, id) {
  const settings = await getSettings();
  const { data: p } = await sb.from("partners").select("*").eq("id", id).maybeSingle();
  if (!p) return null;
  const [students, comms, payouts, clicks] = await Promise.all([
    sb.from("profiles").select("email,first_name,last_name,username,created_at,is_premium,expires_at").eq("referrer_partner_id", id).order("created_at", { ascending: false }).limit(1000),
    sb.from("partner_commissions").select("*").eq("partner_id", id).order("created_at", { ascending: false }).limit(1000),
    sb.from("partner_payouts").select("*").eq("partner_id", id).order("requested_at", { ascending: false }).limit(200),
    sb.from("events").select("created_at").eq("type", "referral_link_opened").eq("payload->>referral_code", p.referral_code).limit(5000),
  ]);
  const cm = comms.data || [];
  const earnedBy = {};
  for (const c of cm) if (c.status !== "cancelled") earnedBy[c.referred_email] = (earnedBy[c.referred_email] || 0) + Number(c.amount);
  return {
    settings,
    partner: {
      id: p.id, name: p.full_name, email: p.email, phone: p.phone, code: p.referral_code, status: p.status,
      customRate: p.commission_rate, rate: effectiveRate(p, settings), notes: p.notes,
      joined: p.created_at, approvedAt: p.approved_at, lastLogin: p.last_login,
      bank: { bankName: p.bank_name || "", accountName: p.account_name || "", accountNumber: decryptText(p.account_number_enc) },
    },
    kpis: { clicks: (clicks.data || []).length, signups: (students.data || []).length, ...sumCommissions(cm) },
    students: (students.data || []).map((s) => ({
      email: s.email, name: `${s.first_name || ""} ${s.last_name || ""}`.trim() || s.username || "", joined: s.created_at,
      premium: !!(s.is_premium && s.expires_at && new Date(s.expires_at) > new Date()), earned: round2(earnedBy[s.email] || 0),
    })),
    commissions: cm,
    payouts: (payouts.data || []).map((x) => ({ ...x, account_number_enc: undefined, accountNumber: decryptText(x.account_number_enc) })),
  };
}

export default async function handler(req, res) {
  setCors(res);
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const permNeeded = ["payouts","payout-action","commission-action"].includes(String(req.query.op)) ? "payouts" : "partners";
  if (!tokenOk(token, permNeeded)) return sendErr(res, "Session expired. Please sign in again.", 401);
  if (!supabaseEnabled()) return sendErr(res, "Supabase is not configured.", 503);
  const sb = getSupabase();
  const op = req.query.op;

  try {
    if (op === "partners") return req.method === "GET" ? sendOk(res, await overview(sb)) : sendMethodNotAllowed(res);

    if (op === "partner") {
      const d = await detail(sb, String(req.query.id || ""));
      return d ? sendOk(res, d) : sendErr(res, "Partner not found.", 404);
    }

    if (op === "payouts") {
      const { data: po } = await sb.from("partner_payouts").select("*").order("requested_at", { ascending: false }).limit(300);
      const ids = [...new Set((po || []).map((x) => x.partner_id))];
      const { data: ps } = ids.length ? await sb.from("partners").select("id,full_name,email,phone").in("id", ids) : { data: [] };
      const pm = Object.fromEntries((ps || []).map((p) => [p.id, p]));
      return sendOk(res, {
        payouts: (po || []).map((x) => ({
          id: x.id, amount: x.amount, status: x.status, reference: x.reference, note: x.note, requestedAt: x.requested_at, processedAt: x.processed_at,
          partner: pm[x.partner_id] || {}, bankName: x.bank_name, accountName: x.account_name, accountNumber: decryptText(x.account_number_enc),
        })),
      });
    }

    if (op === "settings") {
      if (req.method === "GET") return sendOk(res, { settings: await getSettings() });
      if (req.method !== "POST") return sendMethodNotAllowed(res);
      const b = readBody(req);
      const rows = [];
      if (b.defaultRate !== undefined) {
        const r = Number(b.defaultRate);
        if (!Number.isFinite(r) || r < 0 || r > 100) return sendErr(res, "Rate must be between 0 and 100.");
        rows.push({ key: "default_commission_rate", value: r });
      }
      if (b.minPayout !== undefined) {
        const m = Number(b.minPayout);
        if (!Number.isFinite(m) || m < 0) return sendErr(res, "Minimum payout must be 0 or more.");
        rows.push({ key: "min_payout", value: m });
      }
      if (rows.length) await sb.from("settings").upsert(rows.map((r) => ({ ...r, updated_at: new Date().toISOString() })), { onConflict: "key" });
      return sendOk(res, { settings: await getSettings() });
    }

    if (op === "partner-action") {
      if (req.method !== "POST") return sendMethodNotAllowed(res);
      const b = readBody(req);
      const action = b.action;

      if (action === "bulk-rate") {
        let rate = null;
        if (b.rate !== null && b.rate !== "" && b.rate !== undefined) {
          rate = Number(b.rate);
          if (!Number.isFinite(rate) || rate < 0 || rate > 100) return sendErr(res, "Rate must be between 0 and 100.");
        }
        const { data } = await sb.from("partners").update({ commission_rate: rate }).not("id", "is", null).select("id");
        return sendOk(res, { updated: (data || []).length });
      }

      const id = String(b.id || "");
      const { data: p } = await sb.from("partners").select("*").eq("id", id).maybeSingle();
      if (!p) return sendErr(res, "Partner not found.", 404);

      if (action === "approve" || action === "activate") {
        await sb.from("partners").update({ status: "active", approved_at: p.approved_at || new Date().toISOString() }).eq("id", id);
        if (p.status === "pending") {
          const settingsNow = await getSettings();
          await sendHtml(p.email, "You're approved as an EliteScholars partner 🎉", partnerApprovedEmail({ name: p.full_name.split(" ")[0], code: p.referral_code, rate: effectiveRate(p, settingsNow) }));
        }
        return sendOk(res, {});
      }
      if (action === "suspend") { await sb.from("partners").update({ status: "suspended" }).eq("id", id); return sendOk(res, {}); }
      if (action === "set-rate") {
        let rate = null;
        if (b.rate !== null && b.rate !== "" && b.rate !== undefined) {
          rate = Number(b.rate);
          if (!Number.isFinite(rate) || rate < 0 || rate > 100) return sendErr(res, "Rate must be between 0 and 100.");
        }
        await sb.from("partners").update({ commission_rate: rate }).eq("id", id);
        return sendOk(res, {});
      }
      if (action === "set-code") {
        const code = String(b.code || "").toUpperCase().trim();
        if (!validCode(code)) return sendErr(res, "Code must be 4-16 letters/numbers and must not end in 4 digits.");
        const { error } = await sb.from("partners").update({ referral_code: code }).eq("id", id);
        if (error) return sendErr(res, error.code === "23505" ? "That code is already taken." : "Could not change the code.");
        return sendOk(res, {});
      }
      if (action === "set-notes") { await sb.from("partners").update({ notes: String(b.notes || "").slice(0, 2000) }).eq("id", id); return sendOk(res, {}); }
      if (action === "reset-password") {
        const temp = crypto.randomBytes(5).toString("hex");
        await sb.from("partners").update({ password_hash: hashPartnerPassword(temp) }).eq("id", id);
        return sendOk(res, { tempPassword: temp });
      }
      return sendErr(res, "Unknown action.");
    }

    if (op === "commission-action") {
      if (req.method !== "POST") return sendMethodNotAllowed(res);
      const b = readBody(req);
      if (b.action === "cancel") {
        const { data } = await sb.from("partner_commissions").update({ status: "cancelled" }).eq("id", b.id).eq("status", "earned").select("id");
        return data?.length ? sendOk(res, {}) : sendErr(res, "Only unpaid commissions that are not in a payout can be cancelled.");
      }
      if (b.action === "restore") {
        const { data } = await sb.from("partner_commissions").update({ status: "earned" }).eq("id", b.id).eq("status", "cancelled").select("id");
        return data?.length ? sendOk(res, {}) : sendErr(res, "Nothing to restore.");
      }
      return sendErr(res, "Unknown action.");
    }

    if (op === "payout-action") {
      if (req.method !== "POST") return sendMethodNotAllowed(res);
      const b = readBody(req);
      const { data: po } = await sb.from("partner_payouts").select("*").eq("id", b.id).maybeSingle();
      if (!po) return sendErr(res, "Payout not found.", 404);
      if (po.status !== "requested") return sendErr(res, "This payout was already processed.");
      const { data: p } = await sb.from("partners").select("full_name,email").eq("id", po.partner_id).maybeSingle();
      const now = new Date().toISOString();

      if (b.action === "paid") {
        const { data: flipped } = await sb.from("partner_payouts").update({ status: "paid", processed_at: now, reference: String(b.reference || "").slice(0, 120) })
          .eq("id", po.id).eq("status", "requested").select("id");
        if (!flipped?.length) return sendErr(res, "This payout was already processed.");
        await sb.from("partner_commissions").update({ status: "paid", paid_at: now }).eq("payout_id", po.id).eq("status", "in_payout");
        if (p) await sendHtml(p.email, "Your EliteScholars payout has been sent 💸", payoutPaidEmail({ name: p.full_name.split(" ")[0], amount: po.amount, reference: b.reference }));
        return sendOk(res, {});
      }
      if (b.action === "reject") {
        const { data: flipped } = await sb.from("partner_payouts").update({ status: "rejected", processed_at: now, note: String(b.note || "").slice(0, 300) })
          .eq("id", po.id).eq("status", "requested").select("id");
        if (!flipped?.length) return sendErr(res, "This payout was already processed.");
        await sb.from("partner_commissions").update({ status: "earned", payout_id: null }).eq("payout_id", po.id).eq("status", "in_payout");
        if (p) await sendMail(p.email, "About your EliteScholars payout request", `Hi ${p.full_name.split(" ")[0]},\nYour payout request could not be processed${b.note ? `: ${b.note}` : ""}. Your earnings are safe and available to request again.`);
        return sendOk(res, {});
      }
      return sendErr(res, "Unknown action.");
    }
  } catch (e) {
    console.error("[admin-partners]", op, e.message);
    return sendErr(res, "Something went wrong.", 500);
  }
  return sendErr(res, "Unknown op.");
}
