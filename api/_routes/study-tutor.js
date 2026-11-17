// The AI tutor behind the "Ask the AI tutor" button on a worked answer. Called through /api/study/rewrite with
// { mode: "tutor", question, attempt? }. The on-device engine answers first; this is for when a student wants the
// question explained properly, or the engine could not solve it (or may have got it wrong).
// Keys come from the same pool as the rewrite route (api/_helpers/aiPool.js). Replies with { steps, answer, tip }.
import { sendOk, sendErr } from "../_helpers/response.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { generate } from "../_helpers/aiPool.js";

const SYSTEM = `You are a patient, expert tutor for Nigerian secondary-school and university-entrance students (JAMB, WAEC, NECO, GST) in Mathematics, Physics, Chemistry, Biology, English, Economics, Government, Literature, Geography and related subjects.
How to answer:
- Work out the answer carefully yourself before you write it. For calculations, show each step with the numbers, then state the final answer with its unit.
- If an "engine attempt" is given, check it. If it is right, say so briefly in the first step and explain why. If it is wrong or incomplete, correct it plainly and say what went wrong.
- For theory questions, explain the idea simply, in the order a good teacher would, with one short example from everyday Nigerian life when it helps.
- If the question is ambiguous or missing information, say what you assumed in the first step. Never invent facts, numbers, names or dates. If you are not sure, say so.
- Plain text only: write powers as x^2, fractions as a/b, and do not use markdown or LaTeX.
- Reply with ONE JSON object only, no code fences, in exactly this shape:
{"steps":["short step 1","short step 2"],"answer":"the final answer in one or two sentences","tip":"one short exam tip or a common mistake to avoid (may be empty)"}
- 2 to 9 steps, each one or two sentences.`;

const str = (v, n) => (typeof v === "string" ? v.replace(/[ \t]+/g, " ").trim().slice(0, n) : "");

function parse(text) {
  const t = String(text || "").trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  if (a < 0 || b <= a) return null;
  try {
    const j = JSON.parse(t.slice(a, b + 1));
    const steps = (Array.isArray(j.steps) ? j.steps : []).map((s) => str(s, 500)).filter(Boolean).slice(0, 9);
    const answer = str(j.answer, 500);
    if (!steps.length || !answer) return null;
    return { steps, answer, tip: str(j.tip, 300) };
  } catch { return null; }
}

export default async function tutorAnswer(req, res, email, body) {
  const question = str(String(body.question || ""), 1500);
  if (question.length < 5) return sendErr(res, "Type or choose a question first.");
  if (!(await rateLimitOk(req, res, "studytutor-day", 40, 86400, email))) return;
  const attempt = str(String(body.attempt || ""), 1500);
  const user = `Question:\n${question}\n\n${attempt ? `Engine attempt (may be wrong):\n${attempt}` : "No engine attempt."}`;
  try {
    let out = null;
    await generate({ system: SYSTEM, user, maxTokens: 1200 }, (t) => { out = parse(t); return !!out; });
    return sendOk(res, out);
  } catch (e) {
    console.error("[study-tutor]", e?.message, e?.detail || "");
    return res.status(502).json({ success: false, code: "AI_FAIL", error: "The AI tutor is busy right now. Please try again in a moment." });
  }
}
