// POST /api/push/key | /api/push/subscribe { subscription } | /api/push/unsubscribe { endpoint }
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { pushEnabled } from "../_helpers/push.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  const email = await requireUser(req, res);
  if (!email) return;
  if (!(await rateLimitOk(req, res, "push", 30, 60, email))) return;
  const op = String(req.query?.op || "");

  if (op === "key") {
    if (!pushEnabled()) return res.status(503).json({ success: false, code: "NO_PUSH", error: "Notifications are not available right now." });
    return sendOk(res, { key: process.env.VAPID_PUBLIC_KEY });
  }
  if (!supabaseEnabled()) return sendErr(res, "Not available.", 503);
  const sb = getSupabase();
  const b = readBody(req);

  if (op === "subscribe") {
    const s = b.subscription || {};
    const endpoint = String(s.endpoint || "");
    const p256dh = String(s.keys?.p256dh || "");
    const auth = String(s.keys?.auth || "");
    if (!/^https:\/\//.test(endpoint) || endpoint.length > 600 || !p256dh || !auth || p256dh.length > 200 || auth.length > 100) return sendErr(res, "Invalid subscription.");
    const { count } = await sb.from("push_subscriptions").select("endpoint", { count: "exact", head: true }).eq("email", email);
    if ((count || 0) >= 8) await sb.from("push_subscriptions").delete().eq("email", email); // keep it tidy: newest device wins
    const { error } = await sb.from("push_subscriptions").upsert({ endpoint, email, p256dh, auth }, { onConflict: "endpoint" });
    if (error) return sendErr(res, "Could not save.", 500);
    return sendOk(res, { subscribed: true });
  }
  if (op === "unsubscribe") {
    const endpoint = String(b.endpoint || "");
    if (endpoint) await sb.from("push_subscriptions").delete().eq("endpoint", endpoint).eq("email", email);
    else await sb.from("push_subscriptions").delete().eq("email", email);
    return sendOk(res, { subscribed: false });
  }
  return sendErr(res, "Unknown action.", 404);
}
