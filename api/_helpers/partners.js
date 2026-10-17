// api/_helpers/partners.js — affiliate partner logic shared by routes.
import crypto from "crypto";
import { getSupabase } from "./supabase.js";

const SESSION_MS = 7 * 24 * 60 * 60 * 1000;
const secret = () => `partner:${process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || ""}`;

/* ── passwords (scrypt + per-user salt) ─────────────────────────────────── */
export function hashPartnerPassword(pw) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(pw), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}
export function verifyPartnerPassword(pw, stored) {
  try {
    const [salt, hash] = String(stored).split(":");
    const test = crypto.scryptSync(String(pw), salt, 64);
    const good = Buffer.from(hash, "hex");
    return good.length === test.length && crypto.timingSafeEqual(good, test);
  } catch { return false; }
}

/* ── session tokens ─────────────────────────────────────────────────────── */
const sig = (body) => crypto.createHmac("sha256", secret()).update(body).digest("hex");
export function makePartnerToken(partnerId) {
  const body = `${partnerId}.${Date.now() + SESSION_MS}`;
  return `${body}.${sig(body)}`;
}
export function partnerIdFromToken(token) {
  if (!process.env.ADMIN_PASSWORD && !process.env.ADMIN_SESSION_SECRET) return null;
  const parts = String(token || "").split(".");
  if (parts.length !== 3) return null;
  const [id, exp, s] = parts;
  if (Number(exp) < Date.now()) return null;
  const good = sig(`${id}.${exp}`);
  if (s.length !== good.length || !crypto.timingSafeEqual(Buffer.from(s), Buffer.from(good))) return null;
  return id;
}

/* ── bank detail encryption (AES-256-GCM, key from env) ─────────────────── */
const dataKey = () => {
  const k = process.env.PARTNER_DATA_KEY;
  return k && k.length >= 16 ? crypto.createHash("sha256").update(k).digest() : null;
};
export const encryptionReady = () => !!dataKey();
export function encryptText(plain) {
  const key = dataKey();
  if (!key) throw new Error("PARTNER_DATA_KEY not set");
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([c.update(String(plain), "utf8"), c.final()]);
  return [iv.toString("hex"), c.getAuthTag().toString("hex"), enc.toString("hex")].join(":");
}
export function decryptText(blob) {
  try {
    const key = dataKey();
    if (!key || !blob) return "";
    const [iv, tag, enc] = String(blob).split(":");
    const d = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "hex"));
    d.setAuthTag(Buffer.from(tag, "hex"));
    return Buffer.concat([d.update(Buffer.from(enc, "hex")), d.final()]).toString("utf8");
  } catch { return ""; }
}

/* ── small utils ────────────────────────────────────────────────────────── */
export const maskEmail = (e) => {
  const [u, d] = String(e || "").split("@");
  if (!d) return "***";
  return `${u.slice(0, 2)}${"*".repeat(Math.max(2, Math.min(5, u.length - 2)))}@${d}`;
};
export const maskAccount = (n) => (n ? `******${String(n).slice(-4)}` : "");
export const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const ALNUM = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
// "AFF" + 4 chars + a final LETTER, so it can never look like a student code (those end in 4 digits).
export function makePartnerCode() {
  let c = "AFF";
  for (let i = 0; i < 4; i++) c += ALNUM[crypto.randomInt(ALNUM.length)];
  return c + ALPHA[crypto.randomInt(ALPHA.length)];
}
export const validCode = (c) => /^[A-Z0-9]{4,16}$/.test(c) && !/\d{4}$/.test(c);

/* ── settings ───────────────────────────────────────────────────────────── */
export async function getSettings() {
  const sb = getSupabase();
  const { data } = await sb.from("settings").select("key,value");
  const m = Object.fromEntries((data || []).map((r) => [r.key, r.value]));
  return {
    defaultRate: Number(m.default_commission_rate ?? 40),
    minPayout: Number(m.min_payout ?? 1000),
  };
}
export const effectiveRate = (partner, settings) =>
  partner.commission_rate !== null && partner.commission_rate !== undefined ? Number(partner.commission_rate) : settings.defaultRate;

/* ── find a partner by the code a student signed up with ────────────────── */
export async function findPartnerByCode(code) {
  const sb = getSupabase();
  if (!sb || !code) return null;
  const { data } = await sb.from("partners").select("id,email,status").eq("referral_code", String(code).toUpperCase().trim()).maybeSingle();
  return data || null;
}

/* ── create the commission when a referred student pays ─────────────────── */
export async function recordCommission({ email, txRef, amount }) {
  const sb = getSupabase();
  if (!sb || !email || !txRef) return { ok: false };
  try {
    const { data: student } = await sb.from("profiles").select("referrer_partner_id").eq("email", email).maybeSingle();
    if (!student?.referrer_partner_id) return { ok: false, reason: "not referred" };
    const { data: partner } = await sb.from("partners").select("id,email,status,commission_rate").eq("id", student.referrer_partner_id).maybeSingle();
    if (!partner || partner.status !== "active") return { ok: false, reason: "partner not active" };
    if (partner.email === email) return { ok: false, reason: "self referral" };
    const settings = await getSettings();
    const rate = effectiveRate(partner, settings);
    const pay = Number(amount) || 0;
    if (pay <= 0 || rate <= 0) return { ok: false, reason: "nothing to earn" };
    const { error } = await sb.from("partner_commissions").upsert(
      { partner_id: partner.id, payment_tx_ref: txRef, referred_email: email, payment_amount: pay, rate, amount: round2((pay * rate) / 100) },
      { onConflict: "payment_tx_ref", ignoreDuplicates: true }
    );
    if (error) { console.error("[commission]", error.message); return { ok: false }; }
    return { ok: true };
  } catch (e) {
    console.error("[commission] failed:", e?.message);
    return { ok: false };
  }
}

/* ── totals for a set of commissions ────────────────────────────────────── */
export function sumCommissions(rows) {
  const t = { earnedTotal: 0, available: 0, inPayout: 0, paid: 0, cancelled: 0 };
  for (const c of rows) {
    const a = Number(c.amount) || 0;
    if (c.status === "cancelled") { t.cancelled += a; continue; }
    t.earnedTotal += a;
    if (c.status === "earned") t.available += a;
    else if (c.status === "in_payout") t.inPayout += a;
    else if (c.status === "paid") t.paid += a;
  }
  for (const k of Object.keys(t)) t[k] = round2(t[k]);
  return t;
}
