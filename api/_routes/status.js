// Student status updates (24-hour stories).
//   POST /api/status/post    { text, bg, privacy }      privacy: "me" | "squad" | "public"
//   POST /api/status/feed    {}                          -> statuses the caller may see
//   POST /api/status/delete  { id }
// Emails are never sent to other users: the feed shows display names only.
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { eliteEmails } from "../_helpers/elite.js";
import { saveMedia } from "../_helpers/media.js";

const HOURS = 24;
const PRIVACY = ["me", "squad", "public"];
const BGS = ["violet", "gold", "teal", "rose", "blue", "dark"];
const MAX_PER_DAY = 10;

const cleanText = (v) => String(v || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, 280);

async function nameOf(sb, email) {
  const { data } = await sb.from("profiles").select("username,first_name").eq("email", email).maybeSingle();
  return (data && (data.username || data.first_name)) || email.split("@")[0];
}

async function squadEmails(sb, email) {
  const { data: mem } = await sb.from("squad_members").select("squad_id").eq("email", email).limit(1).maybeSingle();
  if (!mem) return [];
  const { data } = await sb.from("squad_members").select("email").eq("squad_id", mem.squad_id);
  return (data || []).map((r) => r.email).filter((e) => e !== email);
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "Status is not available right now.", 503);
  const email = await requireUser(req, res);
  if (!email) return;
  if (!(await rateLimitOk(req, res, "status", 120, 60, email))) return;

  const op = String(req.query?.op || "");
  const b = readBody(req);
  const sb = getSupabase();
  const nowIso = new Date().toISOString();

  if (op === "post") {
    const text = cleanText(b.text);
    if (text.length < 1 && !b.image) return sendErr(res, "Write something first.");
    const privacy = PRIVACY.includes(b.privacy) ? b.privacy : "me";
    const bg = BGS.includes(b.bg) ? b.bg : "violet";
    const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const { count } = await sb.from("statuses").select("id", { count: "exact", head: true }).eq("email", email).gte("created_at", since);
    if ((count || 0) >= MAX_PER_DAY) return sendErr(res, "You can post up to 10 statuses a day.");
    let mediaId = null;
    if (b.image) {
      const m = await saveMedia(sb, email, b.image);
      if (m.error) return sendErr(res, m.error);
      mediaId = m.id;
    }
    const display = await nameOf(sb, email);
    const expires = new Date(Date.now() + HOURS * 3600 * 1000).toISOString();
    const { data, error } = await sb.from("statuses").insert({ email, display_name: display, text, bg, privacy, media_id: mediaId, expires_at: expires }).select("id,created_at,expires_at").single();
    if (error) { console.error("[status] insert", error.message); return sendErr(res, "Could not post your status.", 500); }
    // housekeeping: drop statuses that expired more than a day ago
    sb.from("statuses").delete().lt("expires_at", new Date(Date.now() - 24 * 3600 * 1000).toISOString()).then(() => {}, () => {});
    sb.from("media").delete().lt("created_at", new Date(Date.now() - 31 * 86400000).toISOString()).then(() => {}, () => {});
    return sendOk(res, { status: { id: data.id, media_id: mediaId, text, bg, privacy, created_at: data.created_at, expires_at: data.expires_at, author: display, mine: true } });
  }

  if (op === "feed") {
    const mates = await squadEmails(sb, email);
    const q = sb.from("statuses").select("id,email,display_name,text,bg,privacy,media_id,created_at,expires_at").gt("expires_at", nowIso).order("created_at", { ascending: false }).limit(150);
    const { data, error } = await q;
    if (error) { console.error("[status] feed", error.message); return sendErr(res, "Could not load statuses.", 500); }
    const mateSet = new Set(mates);
    const elite = await eliteEmails((data || []).map((r) => r.email));
    const rows = (data || []).filter((r) => r.email === email || r.privacy === "public" || (r.privacy === "squad" && mateSet.has(r.email)));
    return sendOk(res, {
      statuses: rows.slice(0, 100).map((r) => ({
        id: r.id, media_id: r.media_id || null, text: r.text, bg: r.bg, privacy: r.privacy, created_at: r.created_at, expires_at: r.expires_at,
        author: r.email === email ? "You" : r.display_name, mine: r.email === email, elite: elite.has(r.email),
        // stable per-author key so the app can group stories without exposing emails
        key: r.email === email ? "me" : `${r.display_name}`,
      })),
    });
  }

  if (op === "delete") {
    const id = String(b.id || "");
    if (!/^[\w-]{6,64}$/.test(id)) return sendErr(res, "Invalid status.");
    await sb.from("statuses").delete().eq("id", id).eq("email", email);
    return sendOk(res, { deleted: true });
  }

  return sendErr(res, "Unknown action.", 404);
}
