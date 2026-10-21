// HTML email layout with a light touch of animation.
// Animation uses CSS keyframes, which Apple Mail, iOS Mail, Samsung Mail and Outlook for Mac show.
// Gmail and some others ignore them and simply show the finished, static design, so nothing breaks.
export const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const APP = "https://elitescholars.site";

const STYLE = `
@keyframes esFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes esFade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes esPulse{0%,100%{box-shadow:0 0 0 0 rgba(245,180,0,.55)}70%{box-shadow:0 0 0 14px rgba(245,180,0,0)}}
@keyframes esShine{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes esSpark{0%,100%{opacity:.25;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}
.es-float{animation:esFloat 3s ease-in-out infinite}
.es-fade{animation:esFade .7s ease both}
.es-fade2{animation:esFade .7s .15s ease both}
.es-fade3{animation:esFade .7s .3s ease both}
.es-cta{animation:esPulse 2.2s infinite}
.es-spark{animation:esSpark 2.4s infinite}
.es-shine{background-image:linear-gradient(110deg,#fff 30%,#f5b400 50%,#fff 70%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent!important;animation:esShine 4s linear infinite}
@media (max-width:520px){.es-pad{padding:26px 20px!important}.es-h{font-size:22px!important}}
`;

// body: trusted HTML (callers escape user data). rows: optional [[label, value], ...] summary table.
export function layout({ preheader = "", emoji = "🎓", heading, body = "", rows = null, cta = null, note = "" }) {
  const table = rows && rows.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0;border:1px solid #ece7fb;border-radius:14px;overflow:hidden">${rows.map(([k, v], i) => `<tr style="background:${i % 2 ? "#faf8ff" : "#ffffff"}"><td style="padding:11px 14px;color:#6b6490;font-size:13px">${esc(k)}</td><td style="padding:11px 14px;color:#1a1433;font-size:14px;font-weight:700;text-align:right">${esc(v)}</td></tr>`).join("")}</table>`
    : "";
  const button = cta
    ? `<div style="text-align:center;margin:26px 0 6px"><a class="es-cta" href="${esc(cta.url)}" style="display:inline-block;background:linear-gradient(135deg,#f5b400,#f59e0b);color:#1a1433;text-decoration:none;font-weight:800;font-size:15px;padding:14px 30px;border-radius:999px;white-space:nowrap">${esc(cta.label)}</a></div>`
    : "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><style>${STYLE}</style></head>
<body style="margin:0;padding:0;background:#f3effc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3effc"><tr><td align="center" style="padding:22px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 10px 40px rgba(76,29,149,.14)">
<tr><td align="center" style="background:linear-gradient(135deg,#2e1065,#6d28d9 60%,#8b5cf6);padding:34px 24px 28px">
<div class="es-spark" style="font-size:14px;letter-spacing:6px;color:#fcd34d">✦ ✧ ✦</div>
<div class="es-float" style="font-size:54px;line-height:1.1;margin:8px 0 6px">${emoji}</div>
<div class="es-h es-shine" style="font-size:26px;font-weight:800;color:#fff;line-height:1.25">${esc(heading)}</div>
</td></tr>
<tr><td class="es-pad" style="padding:30px 32px 26px;color:#1a1433;font-size:15px;line-height:1.7">
<div class="es-fade">${body}</div>
<div class="es-fade2">${table}</div>
<div class="es-fade3">${button}</div>
${note ? `<p style="margin:22px 0 0;color:#6b6490;font-size:12.5px">${note}</p>` : ""}
</td></tr>
<tr><td align="center" style="background:#faf8ff;padding:18px 20px;border-top:1px solid #ece7fb">
<div style="font-size:12px;color:#6b6490">EliteScholars · JAMB · WAEC · NECO · GST</div>
<div style="font-size:11px;color:#9d93c4;margin-top:4px"><a href="${APP}" style="color:#7c3aed;text-decoration:none">elitescholars.site</a></div>
</td></tr></table></td></tr></table></body></html>`;
}

const paras = (text) => String(text).split("\n").filter((l) => l.trim()).map((l) => `<p style="margin:0 0 12px">${esc(l)}</p>`).join("");

// Plain text → branded email (used by sendMail so every existing message gets the new look).
export function textEmail(subject, text, opts = {}) {
  return layout({ preheader: String(text).slice(0, 90), emoji: opts.emoji || "🎓", heading: opts.heading || subject, body: paras(text), cta: opts.cta || null, rows: opts.rows || null });
}

export const shopReceiptEmail = ({ firstName, title, link, amount }) => layout({
  preheader: `Your ${title} is ready`, emoji: "🛍️", heading: "Thank you for your purchase!",
  body: `<p style="margin:0 0 12px">Hi ${esc(firstName)}, your payment went through and your item is ready.</p>`,
  rows: [["Item", title.replace(/^[^\w]+/, "")], ["Amount paid", amount]],
  cta: link ? { label: "Open my purchase", url: link } : { label: "Open EliteScholars", url: `${APP}/app` },
  note: "Keep this email — the button above always opens your item.",
});

export const partnerApprovedEmail = ({ name, code, rate }) => layout({
  preheader: "You're in! Start sharing your link.", emoji: "🎉", heading: "You're an EliteScholars partner!",
  body: `<p style="margin:0 0 12px">Hi ${esc(name)}, great news — your application was approved.</p><p style="margin:0">You earn commission every time a student you refer pays — for Premium <b>and</b> for shop items.</p>`,
  rows: [["Your referral code", code], ["Your commission", `${rate}%`]],
  cta: { label: "Open my partner dashboard", url: `${APP}/partner` },
});

export const payoutPaidEmail = ({ name, amount, reference }) => layout({
  preheader: `₦${Number(amount).toLocaleString("en-NG")} is on its way`, emoji: "💸", heading: "Your payout has been sent",
  body: `<p style="margin:0 0 12px">Hi ${esc(name)}, we've sent your payout to your bank account. Thank you for partnering with us!</p>`,
  rows: [["Amount", `₦${Number(amount).toLocaleString("en-NG")}`], ...(reference ? [["Reference", reference]] : [])],
  cta: { label: "View my earnings", url: `${APP}/partner` },
});

export const adminAlertEmail = ({ emoji = "🔔", title, lines = [], rows = null, url = `${APP}/admin`, label = "Open admin" }) => layout({
  preheader: title, emoji, heading: title, body: paras(lines.join("\n")), rows, cta: { label, url },
});

export const subAdminWelcomeEmail = ({ name, email, password, perms }) => layout({
  preheader: "Your EliteScholars admin access", emoji: "🛡️", heading: "You're now an admin",
  body: `<p style="margin:0 0 12px">Hi ${esc(name)}, you've been given admin access to EliteScholars.</p><p style="margin:0">Sign in with the details below and change nothing about them until you've logged in once.</p>`,
  rows: [["Sign-in email", email], ["Password", password], ["Access", perms.join(", ")]],
  cta: { label: "Open the admin page", url: `${APP}/admin` },
  note: "Keep this password private. If you didn't expect this email, ignore it.",
});
