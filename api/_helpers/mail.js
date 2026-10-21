// api/_helpers/mail.js — small best-effort emails (never throws)
import { Resend } from "resend";
import { textEmail } from "./emailTemplates.js";

const FROM = process.env.FROM_EMAIL;
let resend = null;
const client = () => (resend ||= new Resend(process.env.RESEND_API_KEY));

// Send ready-made HTML (see emailTemplates.js).
export async function sendHtml(to, subject, html) {
  if (!to || !process.env.RESEND_API_KEY || !FROM) return false;
  try { await client().emails.send({ from: `EliteScholars <${FROM}>`, to, subject, html }); return true; }
  catch (e) { console.warn("[mail]", e?.message); return false; }
}

export async function sendMail(to, subject, text, opts) {
  if (!to || !process.env.RESEND_API_KEY || !FROM) return false;
  try {
    const html = textEmail(subject, text, opts);
    await client().emails.send({ from: `EliteScholars <${FROM}>`, to, subject, html });
    return true;
  } catch (e) {
    console.warn("[mail]", e?.message);
    return false;
  }
}

// Heads-up to the owner (set ADMIN_NOTIFY_EMAIL in Vercel to receive these).
export const notifyAdmin = (subject, text, opts) => sendMail(process.env.ADMIN_NOTIFY_EMAIL, subject, text, { emoji: "🔔", cta: { label: "Open admin", url: "https://elitescholars.site/admin" }, ...(opts || {}) });
