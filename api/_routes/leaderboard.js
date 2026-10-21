// GET /api/leaderboard/get?type=&limit=   /rank?email=&type=   /users?current_email=
// Signed-in users only. Emails of other students are never returned.
import { sendErr, sendMethodNotAllowed, setCors } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import crypto from "crypto";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { eliteEmails } from "../_helpers/elite.js";

const VIEWS = { daily: "leaderboard_daily", weekly: "leaderboard_weekly", monthly: "leaderboard_monthly", alltime: "leaderboard_alltime" };
const ord = (n) => { const s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
const xpKey = (type) => (type === "alltime" ? "total_xp" : "xp_earned");

async function fromSupabase(type, limit) {
  const sb = getSupabase();
  const { data, error } = await sb.from(VIEWS[type]).select("*").order("xp", { ascending: false }).limit(limit);
  if (error) return null;
  return (data || []).map((r) => ({
    email: r.email,
    name: r.username || r.first_name || r.email.split("@")[0],
    username: r.username || "",
    level: r.level || 1,
    [xpKey(type)]: r.xp,
    ...(type === "alltime" ? { avg_score: r.avg_score || 0, total_quizzes: r.total_quizzes || 0 } : { quizzes: r.quizzes || 0 }),
  }));
}

async function board(type, limit) {
  const rows = (supabaseEnabled() ? await fromSupabase(type, limit) : null) || [];
  rows.forEach((r, i) => { r.rank = i + 1; r.rank_display = ord(i + 1); });
  return rows;
}

// Other students never see each other's email: their row gets an opaque id.
const opaque = (email) => "u_" + crypto.createHash("sha256").update("lb:" + email).digest("hex").slice(0, 12);

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return sendMethodNotAllowed(res);

  const me = await requireUser(req, res);
  if (!me) return;
  if (!(await rateLimitOk(req, res, "lb", 60, 60, me))) return;

  const op = req.query.op;
  const type = VIEWS[req.query.type] ? req.query.type : "alltime";

  if (op === "get") {
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const rows = await board(type, limit);
    const elite = await eliteEmails(rows.map((r) => r.email));
    return res.status(200).json(rows.map((r) => ({ ...r, elite: elite.has(r.email), email: r.email.toLowerCase() === me ? me : opaque(r.email.toLowerCase()) })));
  }

  if (op === "rank") {
    const rows = await board(type, 200);
    const mine = rows.find((r) => String(r.email).toLowerCase() === me);
    return res.status(200).json({ rank: mine ? mine.rank : 0, rank_display: mine ? mine.rank_display : "—" });
  }

  return sendErr(res, "Unknown op.");
}
