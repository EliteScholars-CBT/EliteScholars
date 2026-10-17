// /api/profile/sync (POST)  /check-username (GET)  /guardian (GET get, POST set)
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk, jsonSize } from "../_helpers/guard.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
const parse = (v, fallback) => {
  if (v === undefined || v === null) return undefined;
  if (typeof v === "string") { try { return JSON.parse(v); } catch { return fallback; } }
  return v;
};

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  const op = req.query.op;
  const sb = supabaseEnabled() ? getSupabase() : null;

  if (op === "sync") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const email = await requireUser(req, res);
    if (!email) return;
    if (!(await rateLimitOk(req, res, "sync", 60, 300, email))) return;
    const b = readBody(req);
    if (jsonSize([b.stats, b.achievements, b.subjectPerformance]) > 100000) return sendErr(res, "Payload too large.");
    const stats = parse(b.stats, {});
    const ach = parse(b.achievements, []);
    const sp = parse(b.subjectPerformance, {});
    if (sb) {
      const patch = { last_active: new Date().toISOString() };
      if (stats !== undefined) {
        patch.stats = stats;
        if (typeof stats === "object" && stats) {
          for (const [k, col] of [["quizzesTaken", "quizzes_taken"], ["totalCorrect", "total_correct"], ["totalQuestions", "total_questions"], ["perfectRounds", "perfect_rounds"], ["currentStreak", "current_streak"], ["bestStreak", "best_streak"]]) {
            if (Number.isFinite(Number(stats[k]))) patch[col] = Number(stats[k]);
          }
        }
      }
      if (ach !== undefined) patch.achievements = ach;
      if (sp !== undefined) patch.subject_performance = sp;
      await sb.from("profiles").update(patch).eq("email", email);
    }
    return sendOk(res, {});
  }

  if (op === "check-username") {
    if (req.method !== "GET") return sendMethodNotAllowed(res);
    const username = String(req.query.username || "").trim();
    if (!(await rateLimitOk(req, res, "uname", 40, 300))) return;
    if (!username) return res.status(200).json({ available: false, error: "Username required." });
    if (!USERNAME_REGEX.test(username)) {
      return res.status(200).json({ available: false, error: "Username must be 3-20 characters, start with a letter, and contain only letters, numbers, or underscores." });
    }
    if (sb) {
      const { data, error } = await sb.from("profiles").select("email").ilike("username", username).limit(1).maybeSingle();
      if (!error && data) return res.status(200).json({ available: false });
    }
    return res.status(200).json({ available: true });
  }

  if (op === "guardian") {
    if (req.method === "GET") {
      const email = await requireUser(req, res);
      if (!email) return;
      if (sb) {
        const { data, error } = await sb.from("profiles").select("first_name,last_name,guardian_email").eq("email", email).maybeSingle();
        if (!error && data) {
          return res.status(200).json({ success: true, profile: { email, firstName: data.first_name, lastName: data.last_name, guardianEmail: data.guardian_email || "" } });
        }
      }
      return res.status(200).json({ success: false });
    }
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const email = await requireUser(req, res);
    if (!email) return;
    const b = readBody(req);
    const guardianEmail = String(b.guardianEmail || "").toLowerCase().trim();
    if (guardianEmail.length > 254 || !/^[^\s@,()"']+@[^\s@,()"']+\.[^\s@,()"']+$/.test(guardianEmail)) return sendErr(res, "Guardian email required.");
    if (!sb) return sendErr(res, "Service unavailable.", 503);
    const { data } = await sb.from("profiles").update({ guardian_email: guardianEmail }).eq("email", email).select("email");
    if (!data?.length) return sendErr(res, "Account not found.");
    return sendOk(res, { guardianEmail });
  }
  return sendErr(res, "Unknown op.");
}
