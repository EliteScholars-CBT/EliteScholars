// POST /api/events/batch  { kind: 'study'|'ad'|'security', events: [...] }
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { parseSessionToken, tokenFromRequest } from "../_helpers/session.js";
import { rateLimitOk, jsonSize } from "../_helpers/guard.js";

const KINDS = new Set(["study", "ad", "security"]);

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!(await rateLimitOk(req, res, "evb", 30, 60))) return;

  const b = readBody(req);
  if (!KINDS.has(b.kind)) return sendErr(res, "Unknown kind.");
  const events = Array.isArray(b.events) ? b.events.slice(0, 100) : [];
  if (!events.length) return sendOk(res, {});
  if (jsonSize(events) > 60000) return sendErr(res, "Payload too large.");

  const em = parseSessionToken(tokenFromRequest(req))?.email || null;
  if (supabaseEnabled()) {
    const rows = events.map((e) => ({
      type: `${b.kind}_${String((e && (e.type || e.event)) || "event").slice(0, 40)}`,
      email: em,
      payload: e,
    }));
    const { error } = await getSupabase().from("events").insert(rows);
    if (error) console.warn("[events/batch]", error.message);
  }
  return sendOk(res, {});
}
