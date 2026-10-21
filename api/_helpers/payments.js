// api/_helpers/payments.js — shared, hardened payment confirmation.
// Used by BOTH the browser redirect (payment/verify) and Flutterwave's server
// webhook (payment/webhook). Whichever arrives first activates premium; the
// other is a harmless no-op, so a replayed link can never extend a subscription.
import { Resend } from 'resend';
import { getFirstName, activatePremiumAndLog, logShopPurchase } from './premium.js';
import { getPricing } from './pricing.js';
import { SHOP_ITEMS } from './constants/shop.js';

const APP_URL = 'https://elitescholars.site';
const PLAN_AMOUNT = { annual: 3000, pro: 3000, shop: 1 }; // real prices come from admin settings (see getPricing)
const PLAN_NAMES = { annual: 'Premium Annual', pro: 'Pro Monthly' };
const PLAN_DAYS = { annual: 365, pro: 30 };
const fmt = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const planFromTxRef = (txRef) => {
  const m = /^ES-([A-Z]+)-\d{10,}-[A-Z0-9]{4,}$/.exec(String(txRef || ''));
  const plan = m ? m[1].toLowerCase() : null;
  return PLAN_AMOUNT[plan] ? plan : null;
};

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
          <h2 style="margin:0 0 6px;color:#fff;font-size:18px;">Hey ${String(firstName).replace(/[<>&"]/g, "")} 👋</h2>
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
          <p style="margin:0;color:#5a5a7a;font-size:12px;line-height:1.7;">Questions? Just reply to this email. We are always here for you, ${String(firstName).replace(/[<>&"]/g, "")}.</p>
        </td>
      </tr>
      <tr>
        <td style="background:#13132a;padding:20px 40px;text-align:center;border-top:1px solid #2a2a4a;">
          <p style="margin:0 0 4px;color:#5a5a7a;font-size:11px;">© 2026 EliteScholars · Built for Nigerian Students</p>
          <p style="margin:0;color:#3a3a5a;font-size:10px;">JAMB · WAEC · NECO · GST</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}


// Ask Flutterwave directly (never trust query strings / webhook bodies).
export async function verifyWithFlutterwave(txRef) {
  const plan = planFromTxRef(txRef);
  if (!plan || !process.env.FLW_SECRET_KEY) return null;
  try {
    const r = await fetch(
      `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${encodeURIComponent(txRef)}`,
      { headers: { Authorization: `Bearer ${process.env.FLW_SECRET_KEY}` } }
    );
    const j = JSON.parse(await r.text());
    const t = j?.data;
    if (j?.status !== 'success' || !t) return null;
    if (t.status !== 'successful' || t.currency !== 'NGN' || t.tx_ref !== txRef) return null;
    const pr = await getPricing();
    let item = null;
    let need;
    if (plan === 'shop') {
      item = SHOP_ITEMS.find((i) => i.id === t.meta?.item && !i.isPremium);
      if (!item) return null;
      need = Number(t.meta?.expected) || pr.items[item.id];
    } else {
      need = Number(t.meta?.expected) || (plan === 'pro' ? pr.pro : pr.premiumAnnual);
    }
    if (!(need > 0) || Number(t.amount) < need) return null;
    const email = String(t.customer?.email || '').toLowerCase().trim();
    if (!email) return null;
    return { plan, email, amount: Number(t.amount), tx: t, item };
  } catch (e) {
    console.error('[payments] verify failed:', e?.message);
    return null;
  }
}

// Activate (once) and email (once). Returns { ok, firstName, expiresAt, fresh }.
export async function finalizePayment(txRef, via) {
  const v = await verifyWithFlutterwave(txRef);
  if (!v) return { ok: false };
  const { plan, email, amount, item } = v;
  const firstName = await getFirstName(email);
  if (plan === 'shop') {
    const r = await logShopPurchase({ email, txRef, amount, itemId: item.id });
    if (r.error) return { ok: false };
    if (r.duplicate) return { ok: true, fresh: false, plan, email, firstName, item: item.id, link: item.link };
    try {
      if (process.env.RESEND_API_KEY && process.env.FROM_EMAIL) {
        const { shopReceiptEmail } = await import('./emailTemplates.js');
        await new Resend(process.env.RESEND_API_KEY).emails.send({
          from: `EliteScholars <${process.env.FROM_EMAIL}>`, to: email,
          subject: `🛍️ Your purchase: ${item.title.replace(/[^\w\s:&'-]/g, '').trim()}`,
          html: shopReceiptEmail({ firstName, title: item.title, link: item.link, amount: `₦${amount.toLocaleString('en-NG')}` }),
        });
      }
    } catch (e) { console.error('[payments] shop email failed:', e?.message); }
    return { ok: true, fresh: true, plan, email, firstName, item: item.id, link: item.link };
  }
  const expiry = new Date(Date.now() + PLAN_DAYS[plan] * 86400000);
  const expiresAt = expiry.toISOString();

  const r = await activatePremiumAndLog({ email, plan, txRef, expiresAt, amount });
  if (r.error) return { ok: false };
  if (r.duplicate) return { ok: true, fresh: false, plan, email, firstName, expiresAt: null };

  try {
    if (process.env.RESEND_API_KEY && process.env.FROM_EMAIL) {
      await new Resend(process.env.RESEND_API_KEY).emails.send({
        from: `EliteScholars <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: `🎉 ${firstName}, your Premium is now active!`,
        html: confirmationEmail({ firstName, plan, amount: `₦${amount.toLocaleString('en-NG')}`, activatedOn: fmt(new Date()), expiryDate: fmt(expiry) }),
      });
    }
  } catch (e) { console.error('[payments] email failed:', e?.message); }
  return { ok: true, fresh: true, plan, email, firstName, expiresAt };
}
