// GET /api/study/web?q=...   (signed-in users only)
// Looks one topic or question up across the open web, not just Wikipedia, and returns readable passages the Study
// Engine can pick answers from: [{ title, url, host, label, text }].
// Sources, all tried in parallel and all optional (a source that fails is skipped):
//   1. Stack Exchange question + accepted answer (physics / chemistry / biology / maths sites)
//   2. Web search (DuckDuckGo, then Mojeek) -> the top result pages -> their main paragraphs
// Wikipedia / Wikibooks / Wikiversity are fetched by the engine itself in the browser.
import { sendOk, sendErr, sendMethodNotAllowed, setCors } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";

const UA = "Mozilla/5.0 (compatible; EliteScholarsStudyBot/1.0; +https://elitescholars.site)";
const MAX_PAGE_BYTES = 700_000;
const SKIP_HOSTS = /(^|\.)(facebook|instagram|twitter|x|tiktok|pinterest|youtube|youtu|linkedin|reddit|quora|amazon|ebay|scribd|coursehero|chegg|brainly|studocu|slideshare|wikipedia|wikibooks|wikiversity|wiktionary|duckduckgo|mojeek|google|bing)\.(com|be|org|net|co)$/i;
const STOP = new Set("what which when where why how does did the and for are was were with that this these those from into about explain describe state define give find calculate determine show using used then than also have has had not you your can will would could should their there they them its his her him she who whom whose been being such only just more most some any each both either neither between among".split(" "));

const terms = (q) => [...new Set((String(q).toLowerCase().match(/[a-z][a-z-]{3,}/g) || []).filter((w) => !STOP.has(w)))].slice(0, 12);
const stem = (w) => w.slice(0, 5);

async function get(url, opts = {}, ms = 6000, asText = true) {
  const ctl = new AbortController();
  const tm = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { ...opts, signal: ctl.signal, headers: { "User-Agent": UA, "Accept-Language": "en", ...(opts.headers || {}) }, redirect: "follow" });
    if (!r.ok) throw new Error("HTTP " + r.status);
    if (!asText) return await r.json();
    const buf = await r.arrayBuffer();
    return new TextDecoder("utf-8").decode(buf.byteLength > MAX_PAGE_BYTES ? buf.slice(0, MAX_PAGE_BYTES) : buf);
  } finally { clearTimeout(tm); }
}

const decode = (s) => String(s || "")
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&rsquo;|&#8217;/g, "’")
  .replace(/&ndash;|&#8211;/g, "–").replace(/&mdash;|&#8212;/g, "—").replace(/&#(\d+);/g, (_, n) => { try { return String.fromCodePoint(+n); } catch { return " "; } });
const strip = (h) => decode(String(h || "").replace(/<(script|style|noscript|svg|nav|footer|header|aside|form)[\s\S]*?<\/\1>/gi, " ").replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

// Never fetch anything that is not a plain public web page.
function safeUrl(u) {
  try {
    const x = new URL(u);
    if (!/^https?:$/.test(x.protocol)) return null;
    const h = x.hostname.toLowerCase();
    if (!h.includes(".") || h === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(h) || h.includes(":") || /\.(local|internal|lan|home)$/.test(h)) return null;
    if (SKIP_HOSTS.test(h)) return null;
    return x.toString();
  } catch { return null; }
}
const hostLabel = (h) => {
  const x = h.replace(/^www\./, "");
  const known = { "britannica.com": "Britannica", "khanacademy.org": "Khan Academy", "bbc.co.uk": "BBC Bitesize", "bbc.com": "BBC", "nature.com": "Nature", "nih.gov": "NIH", "ncbi.nlm.nih.gov": "NCBI", "openstax.org": "OpenStax", "libretexts.org": "LibreTexts", "physicsclassroom.com": "The Physics Classroom", "chem.libretexts.org": "LibreTexts Chemistry", "byjus.com": "BYJU'S", "sciencedirect.com": "ScienceDirect", "mathsisfun.com": "Math Is Fun", "thoughtco.com": "ThoughtCo", "healthline.com": "Healthline", "nasa.gov": "NASA" };
  for (const k of Object.keys(known)) if (x === k || x.endsWith("." + k)) return known[k];
  return x;
};

/* ── 1. Stack Exchange ─────────────────────────────────────────────────── */
const SE_SITES = ["physics", "chemistry", "biology", "math"];
async function stackExchange(q, want) {
  const key = process.env.STACKEXCHANGE_KEY ? `&key=${encodeURIComponent(process.env.STACKEXCHANGE_KEY)}` : "";
  const tw = terms(q).map(stem);
  const found = (await Promise.all(SE_SITES.map(async (site) => {
    try {
      const j = await get(`https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&accepted=True&q=${encodeURIComponent(q.slice(0, 150))}&site=${site}&pagesize=2${key}`, {}, 5000, false);
      return (j.items || []).map((it) => ({ site, id: it.question_id, title: decode(it.title), link: it.link, score: it.score || 0, aid: it.accepted_answer_id }));
    } catch { return []; }
  }))).flat();
  const ranked = found.map((f) => {
    const w = new Set((f.title.toLowerCase().match(/[a-z][a-z-]{3,}/g) || []).map(stem));
    return { ...f, v: tw.filter((t) => w.has(t)).length };
  }).filter((f) => f.v >= Math.min(2, tw.length)).sort((a, b) => b.v - a.v || b.score - a.score).slice(0, want);
  const out = await Promise.all(ranked.map(async (f) => {
    try {
      const j = await get(`https://api.stackexchange.com/2.3/answers/${f.aid}?site=${f.site}&filter=withbody${key}`, {}, 5000, false);
      const body = strip(((j.items || [])[0] || {}).body || "");
      if (body.length < 80) return null;
      return { title: f.title, url: f.link, host: `${f.site}.stackexchange.com`, label: `${f.site[0].toUpperCase() + f.site.slice(1)} Stack Exchange`, text: body.slice(0, 5000), v: f.v + 1 };
    } catch { return null; }
  }));
  return out.filter(Boolean);
}

/* ── 2. Web search -> pages ─────────────────────────────────────────────── */
async function searchLinks(q) {
  const links = [];
  const add = (u, t) => { const s = safeUrl(u); if (s && !links.some((l) => l.url === s)) links.push({ url: s, title: decode(strip(t || "")) }); };
  try {
    const h = await get("https://html.duckduckgo.com/html/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: `q=${encodeURIComponent(q)}&kl=wt-wt` }, 6000);
    for (const m of h.matchAll(/<a[^>]+class="[^"]*result__a[^"]*"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
      let u = decode(m[1]);
      const g = u.match(/[?&]uddg=([^&]+)/);
      if (g) { try { u = decodeURIComponent(g[1]); } catch { /* keep */ } } else if (u.startsWith("//")) u = "https:" + u;
      add(u, m[2]);
    }
  } catch { /* try the next engine */ }
  if (links.length < 3) {
    try {
      const h = await get(`https://www.mojeek.com/search?q=${encodeURIComponent(q)}`, {}, 6000);
      for (const m of h.matchAll(/<a[^>]+class="[^"]*\b(?:ob|title)\b[^"]*"[^>]+href="(https?:[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) add(decode(m[1]), m[2]);
    } catch { /* no second engine */ }
  }
  return links.slice(0, 7);
}

function mainText(html, tw) {
  const body = html.match(/<(article|main)[\s\S]*?<\/\1>/i)?.[0] || html;
  const paras = [...body.matchAll(/<(p|li)[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => strip(m[2])).filter((p) => p.length > 60 && p.length < 900 && !/cookie|subscribe|sign up|privacy policy|all rights reserved|javascript/i.test(p));
  if (!paras.length) return "";
  const scored = paras.map((p, i) => {
    const w = new Set((p.toLowerCase().match(/[a-z][a-z-]{3,}/g) || []).map(stem));
    return { p, i, v: tw.filter((t) => w.has(t)).length };
  });
  const keep = scored.filter((s) => s.v >= Math.min(2, tw.length)).sort((a, b) => a.i - b.i);
  let out = "";
  for (const s of keep) { if (out.length + s.p.length > 5000) break; out += s.p + "\n"; }
  return out.trim();
}

async function webPages(q, want) {
  const tw = terms(q).map(stem);
  const links = await searchLinks(q);
  const pages = await Promise.all(links.map(async (l) => {
    try {
      const html = await get(l.url, {}, 5500);
      const text = mainText(html, tw);
      if (text.length < 160) return null;
      const host = new URL(l.url).hostname.replace(/^www\./, "");
      const title = decode(strip(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || l.title || host)).slice(0, 140);
      return { title, url: l.url, host, label: hostLabel(host), text, v: text.length };
    } catch { return null; }
  }));
  const seen = new Set();
  return pages.filter(Boolean).filter((p) => (seen.has(p.host) ? false : seen.add(p.host))).slice(0, want);
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return sendMethodNotAllowed(res);
  const email = await requireUser(req, res);
  if (!email) return;
  if (!(await rateLimitOk(req, res, "studyweb", 90, 3600, email))) return;

  const q = String(req.query?.q || "").replace(/\s+/g, " ").trim().slice(0, 200);
  if (q.length < 3) return sendErr(res, "Ask about something.");
  try {
    const [se, pages] = await Promise.all([stackExchange(q, 2).catch(() => []), webPages(q, 4).catch(() => [])]);
    const articles = [...pages, ...se].slice(0, 6).map(({ title, url, host, label, text }) => ({ title, url, host, label, text }));
    res.setHeader("Cache-Control", "private, max-age=3600");
    return sendOk(res, { articles });
  } catch (e) {
    console.error("[study-web]", e?.message);
    return sendOk(res, { articles: [] });
  }
}
