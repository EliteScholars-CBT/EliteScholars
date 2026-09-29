// ============================================================================
// api/payment/verify.js — GET /api/payment/verify
// Called after Flutterwave redirects back
// ============================================================================

import { setCors, sendMethodNotAllowed } from '../_helpers/response.js';
import { sheetsGet } from '../_helpers/sheets.js';
import { Resend } from 'resend';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;
const resend         = new Resend(process.env.RESEND_API_KEY);
const FROM           = process.env.FROM_EMAIL;
const APP_URL        = 'https://elitescholars.site';

const PLAN_NAMES = {
  monthly: 'Premium Monthly',
  annual:  'Premium Annual',
  pro:     'Pro Monthly',
};

const PLAN_AMOUNTS = {
  monthly: '₦9,000',
  annual:  '₦89,000',
  pro:     '₦100',
};

function getExpiryDate(plan) {
  const days = plan === 'annual' ? 365 : 30;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

function formatDate(date) {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

function confirmationEmail({ firstName, plan, amount, activatedOn, expiryDate }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f1a;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:520px;background:#1a1a2e;border-radius:16px;overflow:hidden;border:1px solid #2a2a4a;">
      <tr>
        <td style="background:linear-gradient(135deg,#0a5c2e,#1a8c47,#0a5c2e);padding:32px 40px;text-align:center;">
          <div style="font-size:48px;margin-bottom:8px;">🎉</div>
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">You're now Premium!</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">EliteScholars · Subscription Confirmed</p>
        </td>
      </tr>
      <tr>
        <td style="padding:40px 40px 32px;">
          <h2 style="margin:0 0 6px;color:#fff;font-size:18px;">Hey ${firstName} 👋</h2>
          <p style="margin:0 0 24px;color:#9090b0;font-size:14px;line-height:1.7;">
            Your payment was successful and your <strong style="color:#c8b4f0;">${PLAN_NAMES[plan]}</strong> plan is now active. Get ready to crush your exams! 🚀
          </p>
          <div style="background:#0f0f1a;border:1px solid #2a2a4a;border-radius:12px;padding:20px;margin-bottom:24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;"><span style="color:#5a5a7a;font-size:12px;">Plan</span></td>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;text-align:right;"><span style="color:#c8b4f0;font-size:13px;font-weight:600;">${PLAN_NAMES[plan]} ⭐</span></td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;"><span style="color:#5a5a7a;font-size:12px;">Amount Paid</span></td>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;text-align:right;"><span style="color:#28c840;font-size:13px;font-weight:600;">${amount}</span></td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;"><span style="color:#5a5a7a;font-size:12px;">Activated On</span></td>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;text-align:right;"><span style="color:#c8c8c8;font-size:13px;">${activatedOn}</span></td>
              </tr>
              <tr>
                <td style="padding:8px 0;"><span style="color:#5a5a7a;font-size:12px;">Expires On</span></td>
                <td style="padding:8px 0;text-align:right;"><span style="color:#ffbd2e;font-size:13px;font-weight:600;">${expiryDate}</span></td>
              </tr>
            </table>
          </div>
          <div style="background:rgba(40,200,64,0.06);border:1px solid rgba(40,200,64,0.2);border-radius:10px;padding:18px 20px;margin-bottom:24px;">
            <p style="margin:0 0 12px;color:#28c840;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">What's unlocked for you</p>
            <p style="margin:0 0 8px;color:#c8c8c8;font-size:13px;">📚 Unlimited CBT practice sessions</p>
            <p style="margin:0 0 8px;color:#c8c8c8;font-size:13px;">🧠 Full Learn mode access</p>
            <p style="margin:0 0 8px;color:#c8c8c8;font-size:13px;">🎮 Game mode — all levels</p>
            <p style="margin:0 0 8px;color:#c8c8c8;font-size:13px;">🏆 Leaderboard and challenges</p>
            <p style="margin:0;color:#c8c8c8;font-size:13px;">⚡ Priority support</p>
          </div>
          <p style="margin:0;color:#5a5a7a;font-size:12px;line-height:1.7;">Questions? Just reply to this email. We are always here for you, ${firstName}.</p>
        </td>
      </tr>
      <tr>
        <td style="background:#13132a;padding:20px 40px;text-align:center;border-top:1px solid #2a2a4a;">
          <p style="margin:0 0 4px;color:#5a5a7a;font-size:11px;">© 2026 EliteScholars · Built for Nigerian Students</p>
          <p style="margin:0;color:#3a3a5a;font-size:10px;">JAMB · WAEC · NECO · POST UTME · GST</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET')     return sendMethodNotAllowed(res);

  const tx_ref = Array.isArray(req.query.tx_ref) 
  ? req.query.tx_ref[0] 
  : req.query.tx_ref;
const { plan, email, status } = req.query;

  console.log('Verify called with params:', { tx_ref, plan, email, status });

  if (status === 'cancelled') {
    return res.redirect(`${APP_URL}/?payment=cancelled`);
  }

  if (!tx_ref || !plan || !email) {
    console.error('Missing params:', { tx_ref, plan, email });
    return res.redirect(`${APP_URL}/?payment=failed`);
  }

  try {
    // ── Step 1: Verify with Flutterwave ─────────────────────────────────────
    const flwRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${tx_ref}`,
      { headers: { Authorization: `Bearer ${FLW_SECRET_KEY}` } }
    );

    const flwText = await flwRes.text();
    let flwData;
    try {
      flwData = JSON.parse(flwText);
    } catch {
      console.error('FLW verify non-JSON:', flwText);
      return res.redirect(`${APP_URL}/?payment=failed`);
    }

    // ── Debug logs ───────────────────────────────────────────────────────────
    console.log('FLW verify status:', flwData?.status);
    console.log('FLW tx status:', flwData?.data?.status);
    console.log('FLW currency:', flwData?.data?.currency);
    console.log('FLW customer email:', flwData?.data?.customer?.email);
    console.log('URL email param:', email);
    console.log('FLW full response:', JSON.stringify(flwData));

    const txData = flwData?.data;

    if (
      flwData.status !== 'success'          ||
      txData?.status !== 'successful'        ||
      txData?.currency !== 'NGN'             ||
      txData?.customer?.email?.toLowerCase() !== email.toLowerCase()
    ) {
      console.error('Verification failed — condition dump:', {
        flwStatus:  flwData?.status,
        txStatus:   txData?.status,
        currency:   txData?.currency,
        flwEmail:   txData?.customer?.email?.toLowerCase(),
        urlEmail:   email.toLowerCase(),
        emailMatch: txData?.customer?.email?.toLowerCase() === email.toLowerCase(),
      });
      return res.redirect(`${APP_URL}/?payment=failed`);
    }

    // ── Step 2: Calculate expiry ─────────────────────────────────────────────
    const expiryDateObj   = getExpiryDate(plan);
    const expiresAt       = expiryDateObj.toISOString();
    const expiryFormatted = formatDate(expiryDateObj);
    const activatedOn     = formatDate(new Date());
    const emailLower      = email.toLowerCase().trim();

    // ── Step 3: Get user profile for firstName ───────────────────────────────
    let firstName = 'Student';
    try {
      const profile = await sheetsGet({ action: 'getProfile', email: emailLower });
      if (profile?.profile?.firstName) firstName = profile.profile.firstName;
    } catch {}

    // ── Step 4: Activate premium in profile sheet ────────────────────────────
    try {
      await sheetsGet({
        action:    'activatePremium',
        email:     emailLower,
        plan,
        txRef:     tx_ref,
        expiresAt,
        amount:    String(txData.amount),
      });
      console.log('activatePremium done for:', emailLower);
    } catch (err) {
      console.error('activatePremium error:', err.message);
    }

    // ── Step 5: Log to payments sheet ────────────────────────────────────────
    try {
      await sheetsGet({
        action:        'logPayment',
        email:         emailLower,
        firstName,
        plan,
        amount:        String(txData.amount),
        currency:      txData.currency,
        txRef:         tx_ref,
        flwRef:        txData.flw_ref || '',
        status:        'successful',
        paymentMethod: txData.payment_type || '',
        paymentDate:   new Date().toISOString(),
        expiryDate:    expiresAt,
        verifiedBy:    'redirect',
      });
      console.log('logPayment done for:', emailLower);
    } catch (err) {
      console.error('logPayment error:', err.message);
    }

    // ── Step 6: Send confirmation email ─────────────────────────────────────
    try {
      await resend.emails.send({
        from:    `EliteScholars <${FROM}>`,
        to:      emailLower,
        subject: `🎉 ${firstName}, your Premium is now active!`,
        html:    confirmationEmail({
          firstName,
          plan,
          amount:      PLAN_AMOUNTS[plan] || `₦${txData.amount}`,
          activatedOn,
          expiryDate:  expiryFormatted,
        }),
      });
      console.log('Confirmation email sent to:', emailLower);
    } catch (err) {
      console.error('Confirmation email error:', err.message);
    }

    // ── Step 7: Redirect to app ──────────────────────────────────────────────
    console.log('Redirecting to success for:', emailLower);
    return res.redirect(
      `${APP_URL}/?payment=success&plan=${plan}&email=${encodeURIComponent(emailLower)}&expiry=${encodeURIComponent(expiresAt)}&name=${encodeURIComponent(firstName)}`
    );

  } catch (err) {
    console.error('Verify handler crash:', err.message);
    return res.redirect(`${APP_URL}/?payment=failed`);
  }
}