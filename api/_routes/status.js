// Student status updates (24-hour stories).
//   POST /api/status/post    { text, bg, privacy }      privacy: "me" | "squad" | "public"
//   POST /api/status/feed    {}                          -> statuses the caller may see
//   POST /api/status/delete  { id }
//   POST /api/status/react   { id, kind }                kind: like|love|fire|clap|wow, or "" to remove
//   POST /api/status/reply   { id, text, to? }           private reply to the author; the author answers with `to` = a reply id (a thread only the two can see)
//   POST /api/status/thread  { id }                      the conversation(s) under a status
//   POST /api/status/reshare { id, privacy }             copies a public status to your own, marked "Reshared from …"
//   POST /api/status/insights{ id }                      owner only: who reacted and replied
//   POST /api/status/report  { id, reason }              anyone who can see a status can report it to the admin
// Emails are never sent to other users: the feed shows display names only.
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { eliteEmails } from "../_helpers/elite.js";
import { saveMedia } from "../_helpers/media.js";
import { pushToEmails } from "../_helpers/push.js";
import { checkText } from "../_helpers/contentGuard.js";
import { judgePhoto } from "../_helpers/imageGuard.js";
import { logBlocked } from "../_helpers/security.js";
import { checkImage } from "../_helpers/media.js";

const HOURS = 24;
const PRIVACY = ["me", "squad", "public"];
const BGS = ["violet", "gold", "teal", "rose", "blue", "dark"];
const MAX_PER_DAY = 10;
const REACTIONS = ["like", "love", "fire", "clap", "wow"];
const REACT_EMOJI = { like: "👍", love: "❤️", fire: "🔥", clap: "👏", wow: "😮" };

const cleanText = (v) => String(v || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, 280);

async function nameOf(sb, email) {
  const { data } = await sb.from("profiles").select("username,first_name").eq("email", email).maybeSingle();
  return (data && (data.username || data.first_name)) || email.split("@")[0];
}

async function squadEmails(sb, email) {
  const { data: mem } = await sb.from("squad_members").select("squad_id").eq("email", email).limit(20);
  const ids = (mem || []).map((m) => m.squad_id);
  if (!ids.length) return [];
  const { data } = await sb.from("squad_members").select("email").in("squad_id", ids);
  return [...new Set((data || []).map((r) => r.email))].filter((e) => e !== email);
}

// Load one live status and say whether `email` is allowed to see it.
async function visibleStatus(sb, email, id) {
  if (!/^[\w-]{6,64}$/.test(String(id || ""))) return null;
  const { data: row } = await sb.from("statuses").select("id,email,display_name,text,bg,privacy,media_id,expires_at,reshared_from,reshared_id").eq("id", id).gt("expires_at", new Date().toISOString()).maybeSingle();
  if (!row) return null;
  if (row.email === email || row.privacy === "public") return row;
  if (row.privacy === "squad" && (await squadEmails(sb, email)).includes(row.email)) return row;
  return null;
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

  if (op === "blocked") {
    if (!(await rateLimitOk(req, res, "status-blocked", 20, 600, email))) return;
    const image = b.image && checkImage(b.image).ok ? b.image : null;
    await logBlocked(sb, { email, where: b.where === "chat" ? "chat" : "photo", flag: `photo:${String(b.reason || "flagged").replace(/[^a-z]/g, "").slice(0, 12) || "flagged"}`, text: b.ocr ? `[words in photo] ${String(b.ocr).slice(0, 400)}` : "", image, detail: "stopped on the phone" });
    return sendOk(res, {});
  }

  if (op === "post") {
    const text = cleanText(b.text);
    if (text.length < 1 && !b.image) return sendErr(res, "Write something first.");
    const guard = checkText(text);
    if (!guard.ok) {
      await logBlocked(sb, { email, where: "status", flag: guard.flag, text });
      return sendErr(res, guard.message);
    }
    // Photos are checked on the poster's phone (no AI); here we apply the same word filter to the words read from the picture.
    let scan = null, forceSquad = false;
    if (b.image) {
      const j = judgePhoto(b);
      if (!j.ok) {
        await logBlocked(sb, { email, where: "photo", flag: j.flag, text: `${text}${b.ocr ? `\n[words in photo] ${String(b.ocr).slice(0, 300)}` : ""}`, image: b.image });
        return sendErr(res, j.error);
      }
      scan = j.scan; forceSquad = j.forceSquad;
    }
    let privacy = PRIVACY.includes(b.privacy) ? b.privacy : "me";
    if (forceSquad && privacy === "public") privacy = "squad"; // photos that could not be scanned never go public
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
    const base = { email, display_name: display, text, bg, privacy, media_id: mediaId, expires_at: expires };
    // "scan" records whether the phone checked the photo; it needs the moderation SQL, so fall back if that is not run yet
    let { data, error } = await sb.from("statuses").insert({ ...base, scan }).select("id,created_at,expires_at").single();
    if (error) ({ data, error } = await sb.from("statuses").insert(base).select("id,created_at,expires_at").single());
    if (error) { console.error("[status] insert", error.message); return sendErr(res, "Could not post your status.", 500); }
    sb.from("events").insert({ type: "status_post", email, payload: { privacy, photo: !!mediaId, scan: scan || undefined, statusId: data.id, preview: text.slice(0, 80) } }).then(() => {}, () => {});
    // housekeeping: drop statuses that expired more than a day ago
    sb.from("statuses").delete().lt("expires_at", new Date(Date.now() - 24 * 3600 * 1000).toISOString()).then(() => {}, () => {});
    sb.from("media").delete().lt("created_at", new Date(Date.now() - 31 * 86400000).toISOString()).then(() => {}, () => {});
    return sendOk(res, { status: { id: data.id, media_id: mediaId, text, bg, privacy, created_at: data.created_at, expires_at: data.expires_at, author: display, mine: true } });
  }

  if (op === "feed") {
    const mates = await squadEmails(sb, email);
    const q = sb.from("statuses").select("id,email,display_name,text,bg,privacy,media_id,created_at,expires_at,reshared_from").gt("expires_at", nowIso).order("created_at", { ascending: false }).limit(150);
    const { data, error } = await q;
    if (error) { console.error("[status] feed", error.message); return sendErr(res, "Could not load statuses.", 500); }
    const mateSet = new Set(mates);
    const elite = await eliteEmails((data || []).map((r) => r.email));
    const rows = (data || []).filter((r) => r.email === email || r.privacy === "public" || (r.privacy === "squad" && mateSet.has(r.email)));
    const shown = rows.slice(0, 100);
    const ids = shown.map((r) => r.id);
    const counts = {}, mine = {}, replyCount = {}, threadCount = {}, viewCount = {};
    if (ids.length) {
      const { data: rx } = await sb.from("status_reactions").select("status_id,email,kind").in("status_id", ids).limit(5000);
      (rx || []).forEach((x) => {
        const c = (counts[x.status_id] = counts[x.status_id] || {});
        c[x.kind] = (c[x.kind] || 0) + 1;
        if (x.email === email) mine[x.status_id] = x.kind;
      });
      const theirs = shown.filter((r) => r.email !== email).map((r) => r.id);
      if (theirs.length) { // how many times the author has answered me (needs the threading SQL)
        const { data: tr, error: te } = await sb.from("status_replies").select("status_id").in("status_id", theirs).eq("to_email", email).limit(2000);
        if (!te) (tr || []).forEach((x) => { threadCount[x.status_id] = (threadCount[x.status_id] || 0) + 1; });
      }
      const own = shown.filter((r) => r.email === email).map((r) => r.id);
      if (own.length) {
        const { data: rp } = await sb.from("status_replies").select("status_id").in("status_id", own).limit(5000);
        (rp || []).forEach((x) => { replyCount[x.status_id] = (replyCount[x.status_id] || 0) + 1; });
        const { data: vw, error: ve } = await sb.from("status_views").select("status_id").in("status_id", own).limit(10000);
        if (!ve) (vw || []).forEach((x) => { viewCount[x.status_id] = (viewCount[x.status_id] || 0) + 1; });
      }
    }
    return sendOk(res, {
      statuses: shown.map((r) => ({
        id: r.id, media_id: r.media_id || null, text: r.text, bg: r.bg, privacy: r.privacy, created_at: r.created_at, expires_at: r.expires_at,
        author: r.email === email ? "You" : r.display_name, mine: r.email === email, elite: elite.has(r.email),
        reshared_from: r.reshared_from || null,
        reactions: counts[r.id] || {}, my_reaction: mine[r.id] || "", replies: replyCount[r.id] || 0, views: viewCount[r.id] || 0, answered: threadCount[r.id] || 0,
        can_reshare: r.email !== email && r.privacy === "public",
        // stable per-author key so the app can group stories without exposing emails
        key: r.email === email ? "me" : `${r.display_name}`,
      })),
    });
  }

  if (op === "view") {
    // a student opened someone else's status: remember it once so the owner can see who looked
    const row = await visibleStatus(sb, email, b.id);
    if (!row || row.email === email) return sendOk(res, { ok: true });
    const display = await nameOf(sb, email);
    const { error } = await sb.from("status_views").upsert({ status_id: row.id, email, display_name: display }, { onConflict: "status_id,email", ignoreDuplicates: true });
    if (error) console.error("[status] view", error.message); // table not created yet: harmless
    return sendOk(res, { ok: true });
  }

  if (op === "delete") {
    const id = String(b.id || "");
    if (!/^[\w-]{6,64}$/.test(id)) return sendErr(res, "Invalid status.");
    await sb.from("statuses").delete().eq("id", id).eq("email", email);
    return sendOk(res, { deleted: true });
  }

  if (op === "react") {
    const row = await visibleStatus(sb, email, b.id);
    if (!row) return sendErr(res, "This status is no longer available.", 404);
    const kind = String(b.kind || "");
    if (!kind) {
      await sb.from("status_reactions").delete().eq("status_id", row.id).eq("email", email);
      return sendOk(res, { reaction: "" });
    }
    if (!REACTIONS.includes(kind)) return sendErr(res, "Unknown reaction.");
    const { data: had } = await sb.from("status_reactions").select("kind").eq("status_id", row.id).eq("email", email).maybeSingle();
    const display = await nameOf(sb, email);
    const { error } = await sb.from("status_reactions").upsert({ status_id: row.id, email, display_name: display, kind }, { onConflict: "status_id,email" });
    if (error) { console.error("[status] react", error.message); return sendErr(res, "Could not react.", 500); }
    if (!had && row.email !== email) {
      pushToEmails([row.email], { title: `${REACT_EMOJI[kind]} ${display} reacted to your status`, body: "Tap to see who is watching.", url: "/app", tag: `status-react-${row.id}`, type: "status" }).catch(() => {});
    }
    return sendOk(res, { reaction: kind });
  }

  if (op === "reply") {
    const row = await visibleStatus(sb, email, b.id);
    if (!row) return sendErr(res, "This status is no longer available.", 404);
    const text = cleanText(b.text).slice(0, 200);
    if (!text) return sendErr(res, "Write a reply first.");
    const guard = checkText(text);
    if (!guard.ok) { await logBlocked(sb, { email, where: "reply", flag: guard.flag, text }); return sendErr(res, guard.message); }
    if (!(await rateLimitOk(req, res, "status-reply", 12, 60, email))) return;
    const display = await nameOf(sb, email);
    const owner = row.email === email;
    let toEmail = row.email, parent = null;
    if (owner) {
      // the author answering one of the replies: thread it under that reply
      const { data: target } = await sb.from("status_replies").select("id,email,status_id").eq("id", String(b.to || "")).eq("status_id", row.id).maybeSingle();
      if (!target || target.email === email) return sendErr(res, "Pick a reply to answer.");
      toEmail = target.email; parent = target.id;
    }
    let ins = await sb.from("status_replies").insert({ status_id: row.id, email, display_name: display, text, to_email: toEmail, parent_id: parent });
    if (ins.error) ins = await sb.from("status_replies").insert({ status_id: row.id, email, display_name: display, text }); // threading SQL not run yet
    if (ins.error) { console.error("[status] reply", ins.error.message); return sendErr(res, "Could not send your reply.", 500); }
    sb.from("events").insert({ type: owner ? "status_reply_back" : "status_reply", email, payload: { statusId: row.id, to: owner ? undefined : row.display_name, preview: text.slice(0, 80) } }).then(() => {}, () => {});
    pushToEmails([toEmail], { title: owner ? `💬 ${display} replied to you` : `💬 ${display} replied to your status`, body: text.length > 80 ? text.slice(0, 77) + "…" : text, url: "/app", tag: `status-reply-${row.id}`, type: "status" }).catch(() => {});
    return sendOk(res, { sent: true });
  }

  if (op === "thread") {
    // the author sees every conversation under the status; anyone else sees only their own with the author
    const row = await visibleStatus(sb, email, b.id);
    if (!row) return sendErr(res, "This status is no longer available.", 404);
    let q = sb.from("status_replies").select("id,email,display_name,text,created_at,to_email").eq("status_id", row.id).order("created_at", { ascending: true }).limit(300);
    if (row.email !== email) q = q.or(`email.eq.${email},to_email.eq.${email}`);
    let { data, error } = await q;
    if (error) { ({ data } = await sb.from("status_replies").select("id,email,display_name,text,created_at").eq("status_id", row.id).eq("email", email).order("created_at", { ascending: true }).limit(100)); }
    const ownerView = row.email === email;
    const key = (r) => (r.email === row.email ? r.to_email : r.email) || r.email;
    const hash = (e) => { let h = 0; for (const c of String(e)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h.toString(36); };
    return sendOk(res, { replies: (data || []).map((r) => ({
      id: r.id, text: r.text, created_at: r.created_at,
      mine: r.email === email, from_author: r.email === row.email,
      name: r.email === row.email ? (ownerView ? "You" : row.display_name) : r.display_name,
      thread: ownerView ? hash(key(r)) : "me",
    })) });
  }

  if (op === "reshare") {
    const row = await visibleStatus(sb, email, b.id);
    if (!row) return sendErr(res, "This status is no longer available.", 404);
    if (row.email === email) return sendErr(res, "That is already your status.");
    if (row.privacy !== "public") return sendErr(res, "Only public statuses can be reshared.");
    const privacy = b.privacy === "public" ? "public" : "squad";
    const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const { count } = await sb.from("statuses").select("id", { count: "exact", head: true }).eq("email", email).gte("created_at", since);
    if ((count || 0) >= MAX_PER_DAY) return sendErr(res, "You can post up to 10 statuses a day.");
    const rootId = row.reshared_id || row.id;
    const { count: dup } = await sb.from("statuses").select("id", { count: "exact", head: true }).eq("email", email).eq("reshared_id", rootId).gt("expires_at", nowIso);
    if (dup) return sendErr(res, "You already reshared this one.");
    const original = row.reshared_from || row.display_name;
    const display = await nameOf(sb, email);
    const expires = new Date(Date.now() + HOURS * 3600 * 1000).toISOString();
    const { data, error } = await sb.from("statuses").insert({ email, display_name: display, text: row.text || "", bg: row.bg, privacy, media_id: row.media_id || null, expires_at: expires, reshared_from: original, reshared_id: rootId }).select("id").single();
    if (error) { console.error("[status] reshare", error.message); return sendErr(res, "Could not reshare.", 500); }
    if (row.email !== email) {
      pushToEmails([row.email], { title: `🔁 ${display} reshared your status`, body: "Your status is reaching more students.", url: "/app", tag: `status-reshare-${row.id}`, type: "status" }).catch(() => {});
    }
    return sendOk(res, { id: data.id, reshared_from: original });
  }

  if (op === "report") {
    const row = await visibleStatus(sb, email, b.id);
    if (!row) return sendErr(res, "This status is no longer available.", 404);
    if (row.email === email) return sendErr(res, "That is your own status.");
    const reason = cleanText(b.reason).slice(0, 80) || "reported";
    const { error } = await sb.from("status_reports").upsert({ status_id: row.id, email, reason }, { onConflict: "status_id,email" });
    if (error) { console.error("[status] report", error.message); return sendErr(res, "Could not send your report. Try again later.", 500); }
    const { count } = await sb.from("status_reports").select("email", { count: "exact", head: true }).eq("status_id", row.id);
    await sb.from("statuses").update({ reports: count || 1, reviewed: false }).eq("id", row.id);
    return sendOk(res, { reported: true });
  }

  if (op === "insights") {
    const id = String(b.id || "");
    if (!/^[\w-]{6,64}$/.test(id)) return sendErr(res, "Invalid status.");
    const { data: row } = await sb.from("statuses").select("id").eq("id", id).eq("email", email).maybeSingle();
    if (!row) return sendErr(res, "Not your status.", 403);
    const [{ data: rx }, { data: rp }] = await Promise.all([
      sb.from("status_reactions").select("display_name,kind,created_at").eq("status_id", id).order("created_at", { ascending: false }).limit(100),
      sb.from("status_replies").select("id,display_name,text,created_at,email").eq("status_id", id).order("created_at", { ascending: false }).limit(100),
    ]);
    const vq = await sb.from("status_views").select("display_name,created_at").eq("status_id", id).order("created_at", { ascending: false }).limit(300);
    return sendOk(res, { views: vq.error ? [] : (vq.data || []).map((v) => ({ display_name: v.display_name, created_at: v.created_at })), reactions: rx || [], replies: (rp || []).filter((r) => r.email !== email).map((r) => ({ id: r.id, display_name: r.display_name, text: r.text, created_at: r.created_at })) });
  }

  return sendErr(res, "Unknown action.", 404);
}
