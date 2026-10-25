// Everything a student tries to post that is REFUSED (explicit words, scam / money offers, links, phone numbers, flagged photos)
// is still kept for the admin: who, where, what they wrote, and the picture. It appears in Admin → Security and in the
// student's activity ("Blocked: …"). Never throws; never slows the student's request.
import { saveMedia } from "./media.js";

const WHERE = { status: "a status", reply: "a status reply", chat: "squad chat", "chat-edit": "an edited chat message", photo: "a photo", voice: "a voice note" };
export const whereLabel = (w) => WHERE[w] || "the app";

export async function logBlocked(sb, { email, where, flag, text, image, detail }) {
  try {
    if (!sb || !email) return;
    let mediaId = null;
    if (image) { const m = await saveMedia(sb, email, image); if (!m.error) mediaId = m.id; }
    await sb.from("events").insert({ type: "content_blocked", email, payload: { where: where || "status", flag: flag || "blocked", text: String(text || "").slice(0, 500), mediaId, detail: detail ? String(detail).slice(0, 200) : undefined } });
  } catch (e) { console.error("[security] log failed", e && e.message); }
}

// Logs login / sign-up problems to the Apps Script sheet (the original helper).
export async function logSecurityEvent({ type, email, ip, detail = '' }) {
  try {
    const { sheetsPost } = await import('./sheets.js'); // optional helper: if it is missing the log is simply skipped
    await sheetsPost({
      action: 'securityEvents',
      events: [{
        type,
        target:    email || '',
        detail,
        url:       'api/' + type,
        ua:        '',
        timestamp: new Date().toISOString(),
      }],
    });
  } catch {}
}
