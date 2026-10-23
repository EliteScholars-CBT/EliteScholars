// A pool of AI keys (Gemini, Anthropic, OpenAI) used in rotation for file study rewriting.
//
// ONE environment variable holds everything — AI_KEYS — a JSON array, one object per key,
// each carrying its own settings:
//
//   AI_KEYS=[
//     {"name":"gemini-a","provider":"gemini","key":"AIza...","model":"gemini-2.5-flash","weight":3},
//     {"name":"claude-a","provider":"anthropic","key":"sk-ant-...","model":"claude-haiku-5-5","weight":2},
//     {"name":"gpt-a","provider":"openai","key":"sk-...","model":"gpt-4o-mini","weight":1,"enabled":true}
//   ]
//
// Fields: name (label, shown in admin), provider (gemini | anthropic | openai), key, model (optional),
// weight (how often it is picked, default 1), enabled (default true), maxTokens (default 2000),
// temperature (default 0.2), timeoutMs (default 25000), baseUrl (optional: any OpenAI-compatible service).
// If AI_KEYS is not set, the older ANTHROPIC_API_KEY / AI_MODEL variables still work.
import { insertRow, supabaseEnabled } from "./supabase.js";

const DEFAULT_MODEL = { gemini: "gemini-2.5-flash", anthropic: process.env.AI_MODEL || "claude-haiku-5-5", openai: "gpt-4o-mini" };
const PROVIDERS = Object.keys(DEFAULT_MODEL);
const cooling = new Map(); // key name -> time (ms) until which we skip it

export function loadKeys() {
  const out = [];
  const raw = process.env.AI_KEYS;
  if (raw && raw.trim()) {
    try {
      let list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [list];
      list.forEach((k, i) => {
        if (!k || typeof k !== "object") return;
        const provider = String(k.provider || "").toLowerCase();
        if (!PROVIDERS.includes(provider) || !k.key) return;
        out.push({
          name: String(k.name || `${provider}-${i + 1}`).slice(0, 40), provider, key: String(k.key),
          model: String(k.model || DEFAULT_MODEL[provider]), weight: Math.max(0, Math.min(20, Number(k.weight ?? 1))),
          enabled: k.enabled !== false, maxTokens: Math.max(200, Math.min(8000, Number(k.maxTokens) || 2000)),
          temperature: Number.isFinite(Number(k.temperature)) ? Number(k.temperature) : 0.2,
          timeoutMs: Math.max(3000, Math.min(28000, Number(k.timeoutMs) || 25000)), baseUrl: k.baseUrl ? String(k.baseUrl).replace(/\/+$/, "") : "",
        });
      });
    } catch (e) { console.error("[ai] AI_KEYS is not valid JSON:", e?.message); }
  } else if (process.env.ANTHROPIC_API_KEY) {
    out.push({ name: "anthropic-env", provider: "anthropic", key: process.env.ANTHROPIC_API_KEY, model: DEFAULT_MODEL.anthropic, weight: 1, enabled: true, maxTokens: 2000, temperature: 0.2, timeoutMs: 25000, baseUrl: "" });
  }
  return out;
}

export const aiConfigured = () => loadKeys().some((k) => k.enabled && k.weight > 0);

// Weighted random order: heavier keys tend to come first, every key still gets a turn as backup.
// Keys that just failed are tried last.
export function pickOrder(keys = loadKeys()) {
  const now = Date.now();
  const pool = keys.filter((k) => k.enabled && k.weight > 0);
  const ready = pool.filter((k) => (cooling.get(k.name) || 0) <= now), rest = pool.filter((k) => (cooling.get(k.name) || 0) > now);
  const shuffle = (arr) => {
    const left = [...arr], out = [];
    while (left.length) {
      const total = left.reduce((a, k) => a + k.weight, 0);
      let r = Math.random() * total, i = 0;
      for (; i < left.length - 1; i++) { r -= left[i].weight; if (r <= 0) break; }
      out.push(left.splice(i, 1)[0]);
    }
    return out;
  };
  return [...shuffle(ready), ...shuffle(rest)];
}

async function post(url, headers, body, timeoutMs) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const r = await fetch(url, { method: "POST", signal: ctl.signal, headers: { "content-type": "application/json", ...headers }, body: JSON.stringify(body) });
    if (!r.ok) {
      const err = new Error(`status ${r.status}`); err.status = r.status;
      try { err.detail = String(await r.text()).replace(/\s+/g, " ").slice(0, 300); } catch { /* ignore */ }
      throw err;
    }
    return await r.json();
  } finally { clearTimeout(t); }
}

export async function callKey(k, { system, user, maxTokens }) {
  // the caller's need wins over the key's default cap (a study rewrite needs ~4000 tokens of JSON), up to 8000
  const max = Math.min(Math.max(k.maxTokens, maxTokens || 0), 8000);
  if (k.provider === "anthropic") {
    const j = await post(`${k.baseUrl || "https://api.anthropic.com"}/v1/messages`, { "x-api-key": k.key, "anthropic-version": "2023-06-01" },
      { model: k.model, max_tokens: max, temperature: k.temperature, system, messages: [{ role: "user", content: user }] }, k.timeoutMs);
    return (j?.content || []).map((c) => c.text || "").join("");
  }
  if (k.provider === "openai") {
    const newer = /^(o\d|gpt-5)/.test(k.model);
    const body = { model: k.model, messages: [{ role: "system", content: system }, { role: "user", content: user }], response_format: { type: "json_object" } };
    if (newer) body.max_completion_tokens = max; else { body.max_tokens = max; body.temperature = k.temperature; }
    const j = await post(`${k.baseUrl || "https://api.openai.com"}/v1/chat/completions`, { authorization: `Bearer ${k.key}` }, body, k.timeoutMs);
    return j?.choices?.[0]?.message?.content || "";
  }
  // gemini
  const url = `${k.baseUrl || "https://generativelanguage.googleapis.com"}/v1beta/models/${encodeURIComponent(k.model)}:generateContent`;
  const gen = { maxOutputTokens: max, temperature: k.temperature, responseMimeType: "application/json" };
  const body = (g) => ({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: "user", parts: [{ text: user }] }], generationConfig: g });
  const read = (j) => (j?.candidates?.[0]?.content?.parts || []).filter((p) => !p.thought).map((p) => p.text || "").join("");
  // Gemini 2.5+ "thinking" tokens count against maxOutputTokens and can leave the JSON cut off, so keep thinking small.
  try {
    const j = await post(url, { "x-goog-api-key": k.key }, body({ ...gen, thinkingConfig: { thinkingBudget: 0 } }), k.timeoutMs);
    return read(j);
  } catch (e) {
    if (e.status !== 400) throw e; // this model does not accept the thinking setting: ask again without it
    return read(await post(url, { "x-goog-api-key": k.key }, body(gen), k.timeoutMs));
  }
}

function log(name, ok, ms, status) {
  if (!supabaseEnabled()) return;
  insertRow("events", { type: "ai_call", email: null, payload: { key: name, ok, ms, status: status || 0 } }).then(() => {}, () => {});
}

// Try keys in rotation until one answers. Returns { text, used } or throws the last error.
// `accept` lets the caller reject a useless answer (e.g. not valid JSON) so the next key is tried.
export async function generate(args, accept) {
  const order = pickOrder();
  if (!order.length) { const e = new Error("no ai keys"); e.code = "NO_AI"; throw e; }
  let last = null;
  const deadline = Date.now() + 27000;
  for (const k of order.slice(0, 3)) {
    if (Date.now() > deadline - 4000) break;
    const t0 = Date.now();
    try {
      const text = await callKey(k, args);
      if (accept && !accept(text)) { log(k.name, false, Date.now() - t0, 422); last = new Error("unusable answer"); continue; }
      log(k.name, true, Date.now() - t0);
      return { text, used: k.name };
    } catch (e) {
      last = e;
      const st = e.status || 0;
      // rate-limited / out of credit / bad key: rest this key for a while; transient: short rest
      cooling.set(k.name, Date.now() + (st === 429 || st === 402 || st === 401 || st === 403 ? 10 * 60000 : 30000));
      log(k.name, false, Date.now() - t0, st);
      console.error("[ai] key failed:", k.name, k.provider, k.model, st || e?.message, e?.detail || "");
    }
  }
  throw last || new Error("ai failed");
}

export const coolingState = () => Object.fromEntries([...cooling.entries()].filter(([, t]) => t > Date.now()).map(([n, t]) => [n, t]));

// For the admin screen: is AI_KEYS readable, and what did it contain (keys masked).
export function poolDiagnostics() {
  let problem = "";
  const raw = process.env.AI_KEYS;
  if (raw && raw.trim()) {
    try { const l = JSON.parse(raw); const arr = Array.isArray(l) ? l : [l]; const bad = arr.filter((k) => !k || !PROVIDERS.includes(String(k.provider || "").toLowerCase()) || !k.key).length; if (bad) problem = `${bad} entr${bad === 1 ? "y is" : "ies are"} missing a valid provider (gemini, anthropic or openai) or a key, so ${bad === 1 ? "it was" : "they were"} skipped.`; }
    catch (e) { problem = "AI_KEYS is not valid JSON, so no keys are loaded. Check commas and quotes."; }
  }
  const mask = (k) => (k.length > 10 ? `${k.slice(0, 4)}…${k.slice(-4)}` : "••••");
  return { problem, source: raw && raw.trim() ? "AI_KEYS" : process.env.ANTHROPIC_API_KEY ? "ANTHROPIC_API_KEY" : "none", keys: loadKeys().map((k) => ({ name: k.name, provider: k.provider, model: k.model, weight: k.weight, enabled: k.enabled, masked: mask(k.key), resting: (cooling.get(k.name) || 0) > Date.now() })) };
}
