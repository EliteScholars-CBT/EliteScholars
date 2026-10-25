// Squad chat.
//   POST /api/squads/chat         { since?, peek? }   -> messages (oldest first) or unread count
//   POST /api/squads/chat-send    { text?, image?, sticker? }
//   POST /api/squads/chat-delete  { id }
//   POST /api/squads/chat-typing | chat-react {id,emoji} | chat-pin {id,pin} | chat-edit {id,text}
//   POST /api/media/get           { id }              -> { image } (data URL)
// Only members of the squad can read or write. Members who are not looking at
// the chat get a push notification when a message arrives.
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { pushToEmails } from "../_helpers/push.js";
import { saveMedia, saveAudio } from "../_helpers/media.js";
import { eliteEmails } from "../_helpers/elite.js";
import { judgePhoto } from "../_helpers/imageGuard.js";
import { checkText } from "../_helpers/contentGuard.js";
import { logBlocked } from "../_helpers/security.js";

const clean = (v, n) => String(v || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/\n{3,}/g, "\n\n").trim().slice(0, n);
const UUID = /^[\w-]{6,64}$/;
const EDIT_MS = 15 * 60 * 1000;
const REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "🙏", "🔥", "👏"];

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

  const BASE = "id,email,display_name,kind,text,media_id,created_at";
  const FULL = `${BASE},updated_at,edited_at,reactions,pinned_at`;
  const ONLINE_MS = 3 * 60 * 1000;
  const shape = (r, elite) => {
    const rx = r.reactions && typeof r.reactions === "object" ? r.reactions : {};
    const counts = {}; let mineR = null;
    for (const [em, who] of Object.entries(rx)) { const l = Array.isArray(who) ? who : []; if (l.length) counts[em] = l.length; if (l.includes(email)) mineR = em; }
    return {
      id: r.id, kind: r.kind, text: r.text, media_id: r.media_id, created_at: r.created_at,
      author: r.email === email ? "You" : r.display_name, mine: r.email === email, elite: elite.has(r.email),
      edited: !!r.edited_at, reactions: counts, my_reaction: mineR, pinned: !!r.pinned_at, updated_at: r.updated_at || r.created_at,
    };
  };

  if (op === "list") {
    const parse = (v) => { const d = v ? new Date(v) : null; return d && !isNaN(d.getTime()) ? d.toISOString() : null; };
    const validSince = parse(b.since), before = parse(b.before);
    if (b.peek) {
      let q = sb.from("squad_messages").select("id", { count: "exact", head: true }).eq("squad_id", squadId).neq("email", email);
      if (validSince) q = q.gt("created_at", validSince);
      const { count } = await q;
      return sendOk(res, { unread: count || 0 });
    }
    // newer databases have updated_at / reactions / pins; older ones still work without them
    const run = async (cols, useUpdated) => {
      let q = sb.from("squad_messages").select(cols).eq("squad_id", squadId);
      if (validSince) q = q.gt(useUpdated ? "updated_at" : "created_at", validSince).order(useUpdated ? "updated_at" : "created_at", { ascending: true }).limit(150);
      else if (before) q = q.lt("created_at", before).order("created_at", { ascending: false }).limit(50);
      else q = q.order("created_at", { ascending: false }).limit(80);
      return q;
    };
    let full = true;
    let { data, error } = await run(FULL, true);
    if (error) { full = false; ({ data, error } = await run(BASE, false)); }
    if (error) { console.error("[chat] list", error.message); return sendErr(res, "Could not load chat.", 500); }
    let rows = data || [];
    if (!validSince) rows = rows.slice().reverse();
    const hasMore = !validSince && (data || []).length >= (before ? 50 : 80);
    sb.from("squad_chat_reads").upsert({ squad_id: squadId, email, seen_at: nowIso }, { onConflict: "squad_id,email" }).then(() => {}, () => {});
    const elite = await eliteEmails([...new Set(rows.map((r) => r.email))]);
    const out = { messages: rows.map((r) => shape(r, elite)), now: nowIso, hasMore, full };
    if (!before) {
      // who is here, who is typing, what is pinned, and which messages still exist (so deletions reach everyone)
      const [{ data: members }, { data: reads }, pinQ, idsQ] = await Promise.all([
        sb.from("squad_members").select("email,display_name").eq("squad_id", squadId),
        sb.from("squad_chat_reads").select("email,seen_at,typing_at").eq("squad_id", squadId),
        full ? sb.from("squad_messages").select("id,email,display_name,kind,text,media_id,pinned_at").eq("squad_id", squadId).not("pinned_at", "is", null).order("pinned_at", { ascending: true }).limit(5) : Promise.resolve({ data: [] }),
        sb.from("squad_messages").select("id").eq("squad_id", squadId).order("created_at", { ascending: false }).limit(120),
      ]);
      const list = members || [];
      const emails = list.map((m) => m.email);
      let seen = {};
      if (emails.length) { const { data: ps, error: pe } = await sb.from("profiles").select("email,last_seen").in("email", emails); if (!pe) (ps || []).forEach((p) => { if (p.last_seen) seen[p.email] = p.last_seen; }); }
      const live = (e) => e === email || (seen[e] && Date.now() - new Date(seen[e]).getTime() < ONLINE_MS);
      const nm = Object.fromEntries(list.map((m) => [m.email, m.display_name || m.email.split("@")[0]]));
      out.online = emails.filter(live).length; out.total = emails.length;
      out.typing = (reads || []).filter((r) => r.email !== email && r.typing_at && Date.now() - new Date(r.typing_at).getTime() < 6000).map((r) => nm[r.email] || "Someone");
      out.pins = (pinQ.data || []).map((r) => ({ id: r.id, kind: r.kind, text: r.kind === "image" && !String(r.text || "").startsWith("vn:") ? "" : r.text, media_id: r.media_id, author: r.email === email ? "You" : r.display_name }));
      out.ids = (idsQ.data || []).map((r) => r.id);
    }
    return sendOk(res, out);
  }

  if (op === "typing") {
    sb.from("squad_chat_reads").upsert({ squad_id: squadId, email, seen_at: nowIso, typing_at: nowIso }, { onConflict: "squad_id,email" }).then(() => {}, () => {});
    return sendOk(res, {});
  }

  if (op === "react" || op === "pin" || op === "edit") {
    const id = String(b.id || "");
    if (!UUID.test(id)) return sendErr(res, "Invalid message.");
    const { data: msg, error: me } = await sb.from("squad_messages").select(FULL).eq("id", id).eq("squad_id", squadId).maybeSingle();
    if (me) return sendErr(res, "Run the latest chat SQL first (see schema.sql).", 500);
    if (!msg) return sendErr(res, "That message is gone.", 404);
    const elite = await eliteEmails([msg.email]);
    if (op === "react") {
      const em = String(b.emoji || "");
      if (em && !REACTIONS.includes(em)) return sendErr(res, "That reaction is not available.");
      const rx = { ...(msg.reactions && typeof msg.reactions === "object" ? msg.reactions : {}) };
      let had = false;
      for (const k of Object.keys(rx)) { const l = (Array.isArray(rx[k]) ? rx[k] : []).filter((e) => e !== email); if (k === em && l.length !== (rx[k] || []).length) had = true; if (l.length) rx[k] = l; else delete rx[k]; }
      if (em && !had) rx[em] = [...(rx[em] || []), email];
      const { error } = await sb.from("squad_messages").update({ reactions: rx, updated_at: nowIso }).eq("id", id);
      if (error) return sendErr(res, "Could not react.", 500);
      return sendOk(res, { message: shape({ ...msg, reactions: rx, updated_at: nowIso }, elite) });
    }
    if (op === "pin") {
      const pin = !!b.pin;
      if (pin && !msg.pinned_at) {
        const { count } = await sb.from("squad_messages").select("id", { count: "exact", head: true }).eq("squad_id", squadId).not("pinned_at", "is", null);
        if ((count || 0) >= 5) return sendErr(res, "You can pin up to 5 messages. Unpin one first.");
      }
      const { error } = await sb.from("squad_messages").update({ pinned_at: pin ? (msg.pinned_at || nowIso) : null, updated_at: nowIso }).eq("id", id);
      if (error) return sendErr(res, "Could not pin.", 500);
      return sendOk(res, { message: shape({ ...msg, pinned_at: pin ? (msg.pinned_at || nowIso) : null, updated_at: nowIso }, elite) });
    }
    // edit: your own text messages, for 15 minutes
    if (msg.email !== email) return sendErr(res, "You can only edit your own messages.", 403);
    if (msg.kind !== "text") return sendErr(res, "Only text messages can be edited.");
    if (Date.now() - new Date(msg.created_at).getTime() > EDIT_MS) return sendErr(res, "You can only edit a message within 15 minutes of sending it.");
    const text = clean(b.text, 600);
    if (!text) return sendErr(res, "A message can't be empty.");
    { const g = checkText(text, { mode: "chat" }); if (!g.ok) { await logBlocked(sb, { email, where: "chat-edit", flag: g.flag, text }); return sendErr(res, g.message); } }
    const { error } = await sb.from("squad_messages").update({ text, edited_at: nowIso, updated_at: nowIso }).eq("id", id);
    if (error) return sendErr(res, "Could not edit.", 500);
    return sendOk(res, { message: shape({ ...msg, text, edited_at: nowIso, updated_at: nowIso }, elite) });
  }

  if (op === "send") {
    const text = clean(b.text, 600);
    const sticker = clean(b.sticker, 40);
    if (text) { const g = checkText(text, { mode: "chat" }); if (!g.ok) { await logBlocked(sb, { email, where: "chat", flag: g.flag, text }); return sendErr(res, g.message); } }
    let kind = "text", mediaId = null, voiceText = "";
    if (b.voice) {
      // voice note: stored like a picture row (kind "image") with text "vn:<seconds>" so no database change is needed
      const secs = Math.max(1, Math.min(90, Math.round(Number(b.secs) || 1)));
      const a = await saveAudio(sb, email, b.voice);
      if (a.error) return sendErr(res, a.error);
      kind = "image"; mediaId = a.id; voiceText = `vn:${secs}`;
    } else if (b.image) {
      // photos are checked on the sender's phone (no AI); the words read from the picture are checked here too
      const j = judgePhoto(b);
      if (!j.ok) { await logBlocked(sb, { email, where: "chat", flag: j.flag, text: b.ocr ? `[words in photo] ${String(b.ocr).slice(0, 400)}` : "", image: b.image }); return sendErr(res, j.error); }
      const m = await saveMedia(sb, email, b.image);
      if (m.error) return sendErr(res, m.error);
      kind = "image"; mediaId = m.id;
    } else if (sticker) kind = "sticker";
    if (kind === "text" && !text) return sendErr(res, "Type a message first.");
    const body = voiceText || (kind === "sticker" ? sticker : text);
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
        const preview = voiceText ? "sent a voice note 🎤" : kind === "image" ? "sent a photo 📷" : kind === "sticker" ? (body.startsWith("st:") ? "sent a sticker" : `sent ${body}`) : body.length > 80 ? body.slice(0, 77) + "…" : body;
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
