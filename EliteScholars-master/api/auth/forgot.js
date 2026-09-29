// ============================================================================
// api/auth/forgot.js — POST /api/auth/forgot
// Rate limited: 3 requests per hour per email
// Sends reset code via Resend
// ============================================================================

import crypto from "crypto";
import { Resend } from "resend";

import { redis } from "../_helpers/redis.js";
import { checkRateLimit } from "../_helpers/rateLimit.js";
import { sheetsGet } from "../_helpers/sheets.js";

import {
  sendOk,
  sendErr,
  sendRateLimited,
  sendMethodNotAllowed,
  setCors
} from "../_helpers/response.js";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.FROM_EMAIL;

export default async function handler(req, res) {
  try {

    setCors(res);
    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST")    return sendMethodNotAllowed(res);

    // ── Body ──────────────────────────────────────────────────────────────────
    const { email } = req.body || {};
    if (!email) return sendErr(res, "Email required.");

    const emailLower = email.toLowerCase().trim();

    // ── Rate limit ────────────────────────────────────────────────────────────
    const rateKey = `forgot:${emailLower}`;
    const { allowed, retryAfter } = await checkRateLimit(rateKey, 3, 3600);
    if (!allowed) return sendRateLimited(res, retryAfter);

    // ── Check account exists ──────────────────────────────────────────────────
    let existing;
    try {
      existing = await sheetsGet({
        action: "getProfile",
        email:  emailLower,
      });
    } catch (err) {
      console.error("getProfile error:", err);
      return sendErr(res, "Failed to verify account. Please try again.");
    }

    console.log("getProfile result:", JSON.stringify(existing));

    if (!existing?.success) {
      return sendErr(res, existing?.error || "No account found with this email.");
    }

    // ── Generate secure 6-digit code ──────────────────────────────────────────
    const code = crypto.randomInt(100000, 1000000).toString();

    // ── Store in Redis (15 min TTL) ───────────────────────────────────────────
    try {
      await redis.set(
        `reset:${emailLower}`,
        JSON.stringify({ code, attempts: 0 }),
        { ex: 900 }
      );
    } catch (err) {
      console.error("Redis set error:", err);
      return sendErr(res, "Failed to store reset code. Please try again.");
    }

    // ── Send email via Resend ─────────────────────────────────────────────────
    try {
      await resend.emails.send({
        from:    `EliteScholars <${FROM}>`,
        to:      emailLower,
        subject: "Your EliteScholars Password Reset Code",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Code</title>
</head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f1a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:520px;background:#1a1a2e;border-radius:16px;overflow:hidden;border:1px solid #2a2a4a;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#4B0082,#7B2FBE,#4B0082);padding:32px 40px;text-align:center;">
              <div style="font-size:36px;margin-bottom:8px;">🎓</div>
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">
                EliteScholars
              </h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.6);font-size:12px;letter-spacing:2px;text-transform:uppercase;">
                Your Study & Exam Prep App
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:40px 40px 32px;">

              <h2 style="margin:0 0 8px;color:#ffffff;font-size:20px;font-weight:600;">
                Password Reset Request
              </h2>
              <p style="margin:0 0 28px;color:#9090b0;font-size:14px;line-height:1.6;">
                We received a request to reset your EliteScholars password.
                Use the code below to continue. This code expires in
                <strong style="color:#c8b4f0;">15 minutes</strong>.
              </p>

              <!-- CODE BOX -->
              <div style="background:#0f0f1a;border:1px solid #4B0082;border-radius:12px;padding:28px 20px;text-align:center;margin-bottom:28px;">
                <p style="margin:0 0 12px;color:#9090b0;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
                  Your Reset Code
                </p>
                <div style="font-family:'Courier New',monospace;font-size:42px;font-weight:700;letter-spacing:10px;color:#c8b4f0;line-height:1;">
                  ${code}
                </div>
              </div>

              <!-- WARNING -->
              <div style="background:rgba(255,189,46,0.08);border:1px solid rgba(255,189,46,0.25);border-radius:8px;padding:14px 16px;margin-bottom:28px;">
                <p style="margin:0;color:#ffbd2e;font-size:12px;line-height:1.6;">
                  ⚠️ &nbsp;If you did not request this, please ignore this email.
                  Your account remains secure.
                </p>
              </div>

              <!-- DIVIDER -->
              <div style="border-top:1px solid #2a2a4a;margin-bottom:24px;"></div>

              <p style="margin:0;color:#5a5a7a;font-size:12px;line-height:1.7;">
                This email was sent to
                <span style="color:#9090b0;">${emailLower}</span>.
                If you need help, reply to this email or contact our support team.
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#13132a;padding:20px 40px;text-align:center;border-top:1px solid #2a2a4a;">
              <p style="margin:0 0 4px;color:#5a5a7a;font-size:11px;">
                © 2026 EliteScholars · Built for Nigerian Students
              </p>
              <p style="margin:0;color:#3a3a5a;font-size:10px;">
                JAMB · WAEC · NECO · POST UTME · GST
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
        `,
      });
    } catch (err) {
      console.error("Resend error:", err);
      return sendErr(res, "Failed to send reset email. Please try again.");
    }

    // ── Success ───────────────────────────────────────────────────────────────
    return sendOk(res, { message: "Reset code sent to your email." });

  } catch (err) {
    console.error("Forgot handler crash:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Internal server error",
    });
  }
}