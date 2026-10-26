// Web Push helper. Needs VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY (and optionally VAPID_SUBJECT).
// Never throws: push is best-effort and must not break the action that triggered it.
import { getSupabase, supabaseEnabled } from "./supabase.js";

export const pushEnabled = () => !!(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);

let wp = null;
async function lib() {
  if (wp) return wp;
  const m = await import("web-push");
  wp = m.default || m;
  wp.setVapidDetails(process.env.VAPID_SUBJECT || `mailto:${process.env.FROM_EMAIL || "support@elitescholars.site"}`, process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
  return wp;
}

// Opening the app from a notification adds ?np=<kind> so the app can log "opened from a reminder".
const withNp = (u, kind) => { const s = String(u); return /[?&]np=/.test(s) ? s : s + (s.includes("?") ? "&" : "?") + "np=" + encodeURIComponent(kind); };

// payload: { title, body, url, tag }
export async function pushToEmails(emails, payload) {
  const out = { sent: 0, removed: 0, failed: 0 };
  const okEmails = [];
  const list = [...new Set((emails || []).filter(Boolean))];
  if (!list.length || !pushEnabled() || !supabaseEnabled()) return out;
  try {
    const sb = getSupabase();
    const w = await lib();
    const subs = [];
    for (let i = 0; i < list.length; i += 200) {
      const { data } = await sb.from("push_subscriptions").select("endpoint,p256dh,auth,email").in("email", list.slice(i, i + 200));
      subs.push(...(data || []));
    }
    const body = JSON.stringify({ title: payload.title, body: payload.body, url: withNp(payload.url || "/app", payload.type || "general"), tag: payload.tag || "elitescholars", type: payload.type || "general" });
    const dead = [];
    for (let i = 0; i < subs.length; i += 25) {
      await Promise.all(subs.slice(i, i + 25).map(async (s) => {
        try {
          await w.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, body, { TTL: 43200 });
          out.sent++; okEmails.push(s.email);
        } catch (e) {
          if (e && (e.statusCode === 404 || e.statusCode === 410)) dead.push(s.endpoint); else out.failed++;
        }
      }));
    }
    // keep a record of every push that went out (who, what kind) for Admin → Reminders
    if (okEmails.length) {
      const kind = String(payload.type || "general").slice(0, 40), tag = String(payload.tag || "").slice(0, 60);
      const rows = [...new Set(okEmails)].map((email) => ({ type: "push_sent", email, payload: { kind, tag } }));
      for (let i = 0; i < rows.length; i += 200) { try { await sb.from("events").insert(rows.slice(i, i + 200)); } catch { /* log only */ } }
    }
    if (dead.length) { await sb.from("push_subscriptions").delete().in("endpoint", dead); out.removed = dead.length; }
  } catch (e) { console.warn("[push]", e?.message); }
  return out;
}
