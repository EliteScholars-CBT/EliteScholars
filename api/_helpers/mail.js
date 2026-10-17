// api/_helpers/mail.js — small best-effort emails (never throws)
import { Resend } from "resend";

const FROM = process.env.FROM_EMAIL;
let resend = null;
const client = () => (resend ||= new Resend(process.env.RESEND_API_KEY));

export async function sendMail(to, subject, text) {
  if (!to || !process.env.RESEND_API_KEY || !FROM) return false;
  try {
    const html = `<div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a1433;max-width:520px">${String(text).split("\n").map((l) => `<p>${l}</p>`).join("")}<p style="color:#6b6490;font-size:12px">EliteScholars</p></div>`;
    await client().emails.send({ from: `EliteScholars <${FROM}>`, to, subject, html });
    return true;
  } catch (e) {
    console.warn("[mail]", e?.message);
    return false;
  }
}

// Heads-up to the owner (set ADMIN_NOTIFY_EMAIL in Vercel to receive these).
export const notifyAdmin = (subject, text) => sendMail(process.env.ADMIN_NOTIFY_EMAIL, subject, text);
