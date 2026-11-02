// api/_helpers/partnerActivity.js — what partners do, how active they are, and the 3-week inactivity rule.
import { getSupabase } from "./supabase.js";
import { sendHtml, notifyAdmin } from "./mail.js";
import { partnerInactivityWarningEmail, partnerSuspendedEmail } from "./emailTemplates.js";

export const D = 86400000;
export const WARN_AFTER_DAYS = 14;     // a week before suspension
export const SUSPEND_AFTER_DAYS = 21;  // 3 weeks with no login and no link click
export const ACTIVITY_KINDS = ["login", "copy_link", "resource_view", "resource_download", "prices_view"];

export const KIND_LABEL = {
  login: "Logged in", copy_link: "Copied a link", resource_view: "Opened a resource",
  resource_download: "Downloaded a resource", prices_view: "Checked the prices",
  link_click: "Someone opened their link",
};

// Record one thing a partner did (best effort, never throws). Also refreshes last_seen.
export async function logPartnerActivity(p, kind, detail = "") {
  try {
    if (!ACTIVITY_KINDS.includes(kind)) return;
    const sb = getSupabase();
    await sb.from("events").insert({ type: "partner_activity", email: p.email, payload: { partner_id: p.id, kind, detail: String(detail || "").slice(0, 120) } });
    await sb.from("partners").update({ last_seen: new Date().toISOString() }).eq("id", p.id);
  } catch (e) { console.warn("[partner activity]", e?.message); }
}

// Every link click for a partner code, from either event the app records.
export const clickCode = (e) => {
  const p = e.payload || {};
  return e.type === "referral_link_opened" ? (p.referral_code || p.code) : p.ref;
};

// The most recent time each partner (by id) logged in OR had their link clicked. This is the ONLY thing the 3-week rule looks at.
export function lastRealActivity(p, lastClickByCode) {
  const times = [p.last_login, lastClickByCode[p.referral_code], p.reactivated_at, p.approved_at || p.created_at]
    .filter(Boolean).map((x) => new Date(x).getTime());
  return times.length ? Math.max(...times) : 0;
}

async function fetchEvents(sb, types, sinceIso) {
  const out = [];
  for (let i = 0; i < 20; i++) {
    const { data, error } = await sb.from("events").select("type,payload,created_at").in("type", types).gte("created_at", sinceIso)
      .order("created_at", { ascending: false }).range(i * 1000, i * 1000 + 999);
    if (error) throw new Error(error.message);
    out.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return out;
}

export async function lastClicks(sb, sinceIso) {
  const ev = await fetchEvents(sb, ["referral_link_opened", "visit_source"], sinceIso);
  const m = {};
  for (const e of ev) { const c = clickCode(e); if (c && !m[c]) m[c] = e.created_at; } // newest first
  return m;
}

// Daily job: warn at 14 days idle, suspend at 21. Returns what it did.
export async function runPartnerInactivity() {
  const sb = getSupabase();
  const now = Date.now();
  const since = new Date(now - 60 * D).toISOString();
  const [{ data: partners }, clicks] = await Promise.all([
    sb.from("partners").select("id,email,full_name,referral_code,status,created_at,approved_at,last_login,reactivated_at,inactivity_warned_at").eq("status", "active"),
    lastClicks(sb, since),
  ]);
  const warned = [], suspended = [], recovered = [];
  for (const p of partners || []) {
    const last = lastRealActivity(p, clicks);
    const idle = (now - last) / D;
    const first = (p.full_name || "there").split(" ")[0];
    if (idle < WARN_AFTER_DAYS) {
      if (p.inactivity_warned_at) { await sb.from("partners").update({ inactivity_warned_at: null }).eq("id", p.id); recovered.push(p.full_name); }
      continue;
    }
    // A partner is only ever suspended AFTER the one-week warning email has gone out (so nobody is suspended by surprise).
    const warnedAt = p.inactivity_warned_at ? new Date(p.inactivity_warned_at).getTime() : 0;
    if (warnedAt && idle >= SUSPEND_AFTER_DAYS && now - warnedAt >= 7 * D - 3 * 3600000) {
      const { data: flipped } = await sb.from("partners").update({ status: "suspended", auto_suspended_at: new Date().toISOString() }).eq("id", p.id).eq("status", "active").select("id");
      if (!flipped?.length) continue;
      const sent = await sendHtml(p.email, "Your EliteScholars partner account has been suspended", partnerSuspendedEmail({ name: first, days: Math.floor(idle) }));
      await sb.from("events").insert({ type: "partner_auto_suspended", email: p.email, payload: { partner_id: p.id, name: p.full_name, idle_days: Math.floor(idle), email_sent: sent } });
      suspended.push(p.full_name);
      continue;
    }
    if (!warnedAt) { // 14+ days idle and not warned yet: warn now, suspend a week later if still idle
      const sent = await sendHtml(p.email, "Your EliteScholars partner account will be suspended in 7 days", partnerInactivityWarningEmail({ name: first, days: Math.floor(idle), code: p.referral_code }));
      await sb.from("partners").update({ inactivity_warned_at: new Date().toISOString() }).eq("id", p.id);
      await sb.from("events").insert({ type: "partner_inactivity_warned", email: p.email, payload: { partner_id: p.id, name: p.full_name, idle_days: Math.floor(idle), email_sent: sent } });
      warned.push(p.full_name);
    }
  }
  if (warned.length) await notifyAdmin("Partners warned about inactivity", `${warned.length} partner${warned.length === 1 ? " was" : "s were"} emailed a one-week warning before suspension: ${warned.join(", ")}.`, { emoji: "🟡", heading: "Inactivity warning sent" });
  if (suspended.length) await notifyAdmin("Partners suspended for inactivity", `${suspended.length} partner${suspended.length === 1 ? " was" : "s were"} suspended automatically (3 weeks with no login and no link click): ${suspended.join(", ")}. They have been emailed.`, { emoji: "⛔", heading: "Partner auto-suspended" });
  return { partnerWarned: warned, partnerSuspended: suspended, partnerRecovered: recovered };
}
