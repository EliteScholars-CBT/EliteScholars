// Squad chat.
//   POST /api/squads/chat         { since?, peek? }   -> messages (oldest first) or unread count
//   POST /api/squads/chat-send    { text?, image?, sticker? }
//   POST /api/squads/chat-delete  { id }
//   POST /api/media/get           { id }              -> { image } (data URL)
// Only members of the squad can read or write. Members who are not looking at
// the chat get a push notification when a message arrives.
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { pushToEmails } from "../_helpers/push.js";
import { saveMedia } from "../_helpers/media.js";
import { eliteEmails } from "../_helpers/elite.js";

const clean = (v, n) => String(v || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/\n{3,}/g, "\n\n").trim().slice(0, n);
const UUID = /^[\w-]{6,64}$/;

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!supabaseEnabled()) return sendErr(res, "Chat is not available right now.", 503);
  const email = await requireUser(req, res);
  if (!email) return;
  const op = String(req.query?.op || "");
  if (!(await rateLimitOk(req, res, `chat-${op}`, op === "send" ? 40 : 240, 60, email))) return;
  const sb = getSupabase();
  const b = readBody(req);

  if (op === "media") {
    const id = String(b.id || "");
    if (!UUID.test(id)) return sendErr(res, "Invalid image.");
    const { data } = await sb.from("media").select("data").eq("id", id).maybeSingle();
    if (!data) return sendErr(res, "Image not found.", 404);
    res.setHeader("Cache-Control", "private, max-age=86400");
    return sendOk(res, { image: data.data });
  }

  // students can be in several squads: the app says which one it means
  let memQ = sb.from("squad_members").select("squad_id,display_name").eq("email", email);
  if (UUID.test(String(b.squadId || ""))) memQ = memQ.eq("squad_id", String(b.squadId));
  const { data: mem } = await memQ.limit(1).maybeSingle();
  if (!mem) return sendErr(res, "Join a squad to use chat.", 403);
  const squadId = mem.squad_id;
  const nowIso = new Date().toISOString();

  if (op === "list") {
    const since = b.since ? new Date(b.since) : null;
    const validSince = since && !isNaN(since.getTime()) ? since.toISOString() : null;
    if (b.peek) {
      let q = sb.from("squad_messages").select("id", { count: "exact", head: true }).eq("squad_id", squadId).neq("email", email);
      if (validSince) q = q.gt("created_at", validSince);
      const { count } = await q;
      return sendOk(res, { unread: count || 0 });
    }
    let q = sb.from("squad_messages").select("id,email,display_name,kind,text,media_id,created_at").eq("squad_id", squadId);
    q = validSince ? q.gt("created_at", validSince).order("created_at", { ascending: true }).limit(100)
                   : q.order("created_at", { ascending: false }).limit(60);
    const { data, error } = await q;
    if (error) { console.error("[chat] list", error.message); return sendErr(res, "Could not load chat.", 500); }
    const rows = validSince ? data || [] : (data || []).reverse();
    sb.from("squad_chat_reads").upsert({ squad_id: squadId, email, seen_at: nowIso }, { onConflict: "squad_id,email" }).then(() => {}, () => {});
    const elite = await eliteEmails([...new Set(rows.map((r) => r.email))]);
    return sendOk(res, {
      messages: rows.map((r) => ({
        id: r.id, kind: r.kind, text: r.text, media_id: r.media_id, created_at: r.created_at,
        author: r.email === email ? "You" : r.display_name, mine: r.email === email, elite: elite.has(r.email),
      })),
      now: nowIso,
    });
  }

  if (op === "send") {
    const text = clean(b.text, 600);
    const sticker = clean(b.sticker, 40);
    let kind = "text", mediaId = null;
    if (b.image) {
      const m = await saveMedia(sb, email, b.image);
      if (m.error) return sendErr(res, m.error);
      kind = "image"; mediaId = m.id;
    } else if (sticker) kind = "sticker";
    if (kind === "text" && !text) return sendErr(res, "Type a message first.");
    const body = kind === "sticker" ? sticker : text;
    const { data, error } = await sb.from("squad_messages").insert({ squad_id: squadId, email, display_name: mem.display_name || email.split("@")[0], kind, text: body, media_id: mediaId }).select("id,created_at").single();
    if (error) { console.error("[chat] send", error.message); return sendErr(res, "Could not send.", 500); }
    // housekeeping: keep the last 30 days only
    sb.from("squad_messages").delete().lt("created_at", new Date(Date.now() - 30 * 86400000).toISOString()).then(() => {}, () => {});

    // push to teammates who are not in the chat right now
    try {
      const { data: members } = await sb.from("squad_members").select("email").eq("squad_id", squadId);
      const others = (members || []).map((m) => m.email).filter((e) => e !== email);
      const { data: reads } = await sb.from("squad_chat_reads").select("email,seen_at").eq("squad_id", squadId).in("email", others.length ? others : ["-"]);
      const active = new Set((reads || []).filter((r) => Date.now() - new Date(r.seen_at).getTime() < 15000).map((r) => r.email));
      const targets = others.filter((e) => !active.has(e));
      if (targets.length) {
        const { data: squad } = await sb.from("squads").select("name").eq("id", squadId).maybeSingle();
        const who = mem.display_name || "A squadmate";
        const preview = kind === "image" ? "sent a photo 📷" : kind === "sticker" ? `sent ${body}` : body.length > 80 ? body.slice(0, 77) + "…" : body;
        await pushToEmails(targets, { title: `💬 ${(squad && squad.name) || "Your squad"}`, body: kind === "text" ? `${who}: ${preview}` : `${who} ${preview}`, url: "/app?squadchat=1", tag: `squad-chat-${squadId}`, type: "squad-chat" });
      }
    } catch (e) { console.warn("[chat] push", e?.message); }

    return sendOk(res, { message: { id: data.id, kind, text: body, media_id: mediaId, created_at: data.created_at, author: "You", mine: true } });
  }

  if (op === "delete") {
    const id = String(b.id || "");
    if (!UUID.test(id)) return sendErr(res, "Invalid message.");
    const { data: msg } = await sb.from("squad_messages").select("id,email").eq("id", id).eq("squad_id", squadId).maybeSingle();
    if (!msg) return sendOk(res, { deleted: true });
    let allowed = msg.email === email;
    if (!allowed) {
      const { data: sq } = await sb.from("squads").select("owner_email").eq("id", squadId).maybeSingle();
      allowed = !!sq && sq.owner_email === email;
    }
    if (!allowed) return sendErr(res, "You can only delete your own messages.", 403);
    await sb.from("squad_messages").delete().eq("id", id);
    return sendOk(res, { deleted: true });
  }

  return sendErr(res, "Unknown action.", 404);
}
