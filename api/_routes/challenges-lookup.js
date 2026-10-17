// GET /api/challenges/lookup?email=...  or ?username=...
import { sendErr, sendMethodNotAllowed, setCors } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { selectOne, supabaseEnabled } from "../_helpers/supabase.js";

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "Backend not configured.", 503);
  const me = await requireUser(req, res);
  if (!me) return;
  if (!(await rateLimitOk(req, res, "lookup", 40, 300, me))) return;
  const match = req.query.email
    ? { email: String(req.query.email).toLowerCase().trim() }
    : { username: String(req.query.username || "").trim() };
  const r = await selectOne("profiles", match);
  if (!r.ok) return sendErr(res, "Lookup failed.", 500);
  if (!r.row) return res.status(200).json({ success: false });
  return res.status(200).json({
    success: true, email: r.row.email, firstName: r.row.first_name,
    lastName: r.row.last_name, username: r.row.username || "",
    profile: { firstName: r.row.first_name, lastName: r.row.last_name },
  });
}
