// Public contact form. POST /api/data?route=contact/submit { name, reply, topic, message, page } (no sign-in needed).
// Saved to contact_messages; admins read them in the Messages tab and get a bell alert.
import { sendOk, sendErr, setCors, readBody } from "../_helpers/response.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { parseSessionToken, tokenFromRequest } from "../_helpers/session.js";

const TOPICS = ["Student help", "Payments & Pro", "Schools", "Tutorial centres", "Partners", "Something else"];
const clean = (v, n) => String(v || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, n);

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendErr(res, "POST only.", 405);
  if (!supabaseEnabled()) return sendErr(res, "Not available right now.", 503);
  if (!(await rateLimitOk(req, res, "contact", 5, 3600))) return;
  const b = readBody(req);
  const message = clean(b.message, 1500);
  if (message.length < 5) return sendErr(res, "Please write a few words first.");
  const parsed = parseSessionToken(tokenFromRequest(req));
  const { error } = await getSupabase().from("contact_messages").insert({
    topic: TOPICS.includes(b.topic) ? b.topic : "Something else",
    name: clean(b.name, 80), reply: clean(b.reply, 80), message,
    email: parsed ? parsed.email : null, page: clean(b.page, 60) || "/contact", status: "new",
  });
  if (error) { console.error("[contact]", error.message); return sendErr(res, "Could not send your message.", 500); }
  return sendOk(res, {});
}
