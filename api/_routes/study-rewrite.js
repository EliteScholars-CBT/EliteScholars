// POST /api/study/rewrite  { text, title? }  (signed-in users only)
// Rewrites one chunk of an uploaded document into simple, clean study material
// using an AI model, and returns strict JSON the app can render. The API key
// stays on the server. Keys rotate through the pool in api/_helpers/aiPool.js (Gemini / Anthropic / OpenAI).
// If AI is not configured, the app silently uses its
// on-device engine instead (this route answers 503 + code "NO_AI").
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { aiConfigured, generate } from "../_helpers/aiPool.js";

const MAX_CHARS = 4500;

const SYSTEM = `You turn a passage from a Nigerian student's study document into clear study material for secondary-school and university-entrance students (JAMB, WAEC, NECO, GST).
Rules:
- Use only facts present in the passage. Never invent facts, numbers, names or dates.
- Rewrite in simple, plain English with short sentences. Explain hard words briefly. Do not copy long phrases.
- Ignore page numbers, headers, footers, watermarks, broken characters and formatting noise.
- Reply with ONE JSON object only, no markdown fences, in exactly this shape:
{"sections":[{"title":"short title","points":["1 to 2 sentence point", "... 3 to 6 points"],"terms":["key term", "... up to 5"],"check":{"q":"question","o":["A","B","C","D"],"a":0,"e":"one-sentence explanation"}}],
"cards":[{"front":"term or question","back":"short clear answer"}],
"questions":[{"q":"question","o":["A","B","C","D"],"a":0,"e":"one-sentence explanation"}],
"overview":["1 to 2 sentence summary of the passage"]}
- 1 to 3 sections, 4 to 10 cards, 3 to 8 questions. Each question has exactly 4 distinct options and "a" is the index (0-3) of the correct one. Wrong options must be plausible but clearly wrong.`;

const str = (v, n) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, n) : "");
const strArr = (v, n, len) => (Array.isArray(v) ? v.map((x) => str(x, len)).filter(Boolean).slice(0, n) : []);

function cleanQ(q) {
  if (!q || typeof q !== "object") return null;
  const o = strArr(q.o, 4, 160);
  const a = Number(q.a);
  if (o.length !== 4 || new Set(o.map((x) => x.toLowerCase())).size !== 4) return null;
  if (!Number.isInteger(a) || a < 0 || a > 3) return null;
  const qq = str(q.q, 300);
  if (!qq) return null;
  return { q: qq, o, a, e: str(q.e, 240) };
}

export function sanitize(raw) {
  const sections = (Array.isArray(raw?.sections) ? raw.sections : []).slice(0, 3).map((s) => {
    const points = strArr(s?.points, 6, 300);
    if (!points.length) return null;
    return { title: str(s.title, 60) || "Key ideas", points, terms: strArr(s.terms, 5, 40), check: cleanQ(s.check) || undefined };
  }).filter(Boolean);
  const cards = (Array.isArray(raw?.cards) ? raw.cards : []).slice(0, 10).map((c) => {
    const front = str(c?.front, 160), back = str(c?.back, 300);
    return front && back ? { front, back, kind: "def" } : null;
  }).filter(Boolean);
  const questions = (Array.isArray(raw?.questions) ? raw.questions : []).slice(0, 8).map(cleanQ).filter(Boolean);
  const overview = strArr(raw?.overview, 2, 300);
  if (!sections.length) return null;
  return { sections, cards, questions, overview };
}

function parseJson(text) {
  const t = String(text || "").trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  if (a < 0 || b <= a) return null;
  try { return JSON.parse(t.slice(a, b + 1)); } catch { return null; }
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);

  const email = await requireUser(req, res);
  if (!email) return;
  if (!aiConfigured()) return res.status(503).json({ success: false, code: "NO_AI", error: "AI rewrite is not available right now." });
  if (!(await rateLimitOk(req, res, "studyai", 60, 3600, email))) return;

  const b = readBody(req);
  const text = str(String(b.text || ""), MAX_CHARS + 200).slice(0, MAX_CHARS);
  if (text.length < 200) return sendErr(res, "Not enough text to rewrite.");

  try {
    let parsed = null;
    await generate(
      { system: SYSTEM, user: `Document: ${str(b.title, 80) || "Study file"}\n\nPassage:\n${text}`, maxTokens: 2000 },
      (t) => { parsed = sanitize(parseJson(t)); return !!parsed; }
    );
    return sendOk(res, parsed);
  } catch (e) {
    console.error("[study-rewrite]", e?.message);
    return res.status(502).json({ success: false, code: "AI_FAIL", error: "The rewrite service is busy. Using the quick version instead." });
  }
}
