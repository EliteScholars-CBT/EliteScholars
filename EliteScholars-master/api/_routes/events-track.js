// POST /api/events/track  { type, ...payload }  — analytics. Public (landing-page visits
// happen before login) but rate limited and size capped. The email is only trusted
// when it comes from a valid session.
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { insertRow, supabaseEnabled } from "../_helpers/supabase.js";
import { parseSessionToken, tokenFromRequest } from "../_helpers/session.js";
import { rateLimitOk, jsonSize } from "../_helpers/guard.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!(await rateLimitOk(req, res, "ev", 120, 60))) return;

  const b = readBody(req);
  const type = String(b.type || b.event || "").slice(0, 60);
  if (!type) return sendErr(res, "type required.");
  const { type: _t, event: _e, email: _m, user_email: _u, token: _k, ...payload } = b;
  if (jsonSize(payload) > 4000) return sendErr(res, "Payload too large.");

  const em = parseSessionToken(tokenFromRequest(req))?.email || null;
  if (supabaseEnabled()) await insertRow("events", { type, email: em, payload });
  return sendOk(res, {});
}
