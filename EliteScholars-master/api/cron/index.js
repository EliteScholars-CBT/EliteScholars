// ============================================================================
// api/cron/index.js — Combined cron jobs
// Runs via Vercel Cron Jobs (schedule configured in vercel.json)
// ============================================================================

import { sheetsGet } from '../_helpers/sheets.js';
import { Resend }    from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.FROM_EMAIL;

// ============================================================================
// SHARED HELPERS
// ============================================================================

function getWeekRange() {
  const now    = new Date();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - now.getDay());
  const monday = new Date(sunday);
  monday.setDate(sunday.getDate() - 6);

  const fmt = (d) => d.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return { from: fmt(monday), to: fmt(sunday) };
}

function getGrade(avg) {
  if (avg >= 80) return { grade: 'A', label: 'Excellent',       color: '#28c840' };
  if (avg >= 65) return { grade: 'B', label: 'Good',            color: '#5eb4ff' };
  if (avg >= 50) return { grade: 'C', label: 'Average',         color: '#ffbd2e' };
  if (avg >= 40) return { grade: 'D', label: 'Below Average',   color: '#ff9500' };
  return              { grade: 'F', label: 'Needs Improvement', color: '#ff5f57' };
}

function formatSubjectName(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

// ============================================================================
// GUARDIAN REPORT EMAIL
// ============================================================================

function buildReportEmail({
  wardName,
  stats,
  subjectPerformance,
  achievements,
  weekFrom,
  weekTo,
  plan,
}) {
  const sessions  = stats?.sessions  || 0;
  const streak    = stats?.streak    || 0;
  const allScores = stats?.allScores || [];

  const avg = allScores.length
    ? Math.round(
        allScores.slice(-7).reduce((a, b) => a + b, 0) /
        Math.min(allScores.length, 7)
      )
    : 0;

  const { grade, label, color } = getGrade(avg);

  const subjects = Object.entries(subjectPerformance || {})
    .filter(([, v]) => (v?.total || 0) > 0)
    .sort((a, b) => (b[1]?.total || 0) - (a[1]?.total || 0))
    .slice(0, 6);

  const recentAchievements = (achievements || []).slice(-3);

  const subjectRows = subjects.map(([key, val]) => {
    const subjAvg   = Math.round(val.averageScore || 0);
    const subjGrade = getGrade(subjAvg);
    return (
      '<tr>' +
      '<td style="padding:10px 14px;border-bottom:1px solid #1e1e3a;color:#c8c8c8;font-size:13px;text-align:left;">' +
        formatSubjectName(key) +
      '</td>' +
      '<td style="padding:10px 14px;border-bottom:1px solid #1e1e3a;color:#9090b0;font-size:13px;text-align:center;">' +
        (val.total || 0) +
      '</td>' +
      '<td style="padding:10px 14px;border-bottom:1px solid #1e1e3a;color:#9090b0;font-size:13px;text-align:center;">' +
        (val.bestScore || 0) + '%' +
      '</td>' +
      '<td style="padding:10px 14px;border-bottom:1px solid #1e1e3a;color:#9090b0;font-size:13px;text-align:center;">' +
        subjAvg + '%' +
      '</td>' +
      '<td style="padding:10px 14px;border-bottom:1px solid #1e1e3a;text-align:center;">' +
        '<span style="color:' + subjGrade.color + ';font-weight:700;font-size:13px;">' +
          subjGrade.grade +
        '</span>' +
      '</td>' +
      '</tr>'
    );
  }).join('');

  const achievementBadges = recentAchievements.length > 0
    ? recentAchievements.map(a =>
        '<span style="display:inline-block;background:rgba(212,175,55,0.15);' +
        'border:1px solid rgba(212,175,55,0.3);border-radius:20px;padding:4px 12px;' +
        'margin:3px;font-size:11px;color:#D4AF37;">' +
          (a?.icon || '🏆') + ' ' + (a?.name || a?.id || 'Achievement') +
        '</span>'
      ).join('')
    : '<span style="color:#5a5a7a;font-size:12px;">No new achievements this week</span>';

  const subjectTableBlock = subjects.length > 0
    ? '<tr><td style="padding:0 32px 24px;">' +
        '<div style="font-size:12px;font-weight:700;color:#9090b0;letter-spacing:1px;' +
        'text-transform:uppercase;margin-bottom:12px;">📚 Subject Performance</div>' +
        '<div style="background:#0f0f1a;border-radius:10px;overflow:hidden;border:1px solid #2a2a4a;">' +
          '<table width="100%" cellpadding="0" cellspacing="0">' +
            '<tr style="background:#111130;">' +
              '<th style="padding:10px 14px;color:#5a5a7a;font-size:10px;letter-spacing:1px;text-transform:uppercase;text-align:left;font-weight:600;">Subject</th>' +
              '<th style="padding:10px 14px;color:#5a5a7a;font-size:10px;letter-spacing:1px;text-transform:uppercase;text-align:center;font-weight:600;">Sessions</th>' +
              '<th style="padding:10px 14px;color:#5a5a7a;font-size:10px;letter-spacing:1px;text-transform:uppercase;text-align:center;font-weight:600;">Best</th>' +
              '<th style="padding:10px 14px;color:#5a5a7a;font-size:10px;letter-spacing:1px;text-transform:uppercase;text-align:center;font-weight:600;">Avg</th>' +
              '<th style="padding:10px 14px;color:#5a5a7a;font-size:10px;letter-spacing:1px;text-transform:uppercase;text-align:center;font-weight:600;">Grade</th>' +
            '</tr>' +
            subjectRows +
          '</table>' +
        '</div>' +
      '</td></tr>'
    : '';

  const progressNote = avg >= 70
    ? wardName + ' is performing excellently this week. Their consistent effort and dedication is showing great results. Keep encouraging them!'
    : avg >= 50
    ? wardName + ' is making steady progress. With continued practice and focus, we expect to see significant improvement in the coming weeks.'
    : wardName + ' needs more practice sessions this week. We encourage you to remind them to study daily — even 15 minutes makes a difference.';

  const planLabel   = plan || 'Premium';
  const borderColor = color + '44';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Weekly Report</title>
</head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f1a;padding:32px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:580px;background:#1a1a2e;border-radius:16px;overflow:hidden;border:1px solid #2a2a4a;">

      <tr>
        <td style="background:linear-gradient(135deg,#4B0082,#7B2FBE,#4B0082);padding:28px 32px;text-align:center;">
          <div style="font-size:13px;color:rgba(255,255,255,0.6);letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">
            EliteScholars · Weekly Report
          </div>
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">
            📊 Academic Progress Report
          </h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">
            ${weekFrom} — ${weekTo}
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:28px 32px 0;">
          <p style="margin:0 0 6px;color:#c8c8c8;font-size:14px;line-height:1.7;">Dear Guardian,</p>
          <p style="margin:0 0 24px;color:#9090b0;font-size:14px;line-height:1.7;">
            Here is a detailed report of <strong style="color:#c8b4f0;">${wardName}</strong>'s
            study activity on EliteScholars this week. This report covers Monday through Saturday.
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:0 32px 24px;">
          <div style="background:#0f0f1a;border:2px solid ${borderColor};border-radius:14px;padding:20px;text-align:center;">
            <div style="font-size:11px;color:#5a5a7a;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">
              Overall Weekly Grade
            </div>
            <div style="font-size:64px;font-weight:900;color:${color};line-height:1;margin-bottom:6px;">
              ${grade}
            </div>
            <div style="font-size:14px;color:${color};font-weight:600;">${label}</div>
            <div style="font-size:12px;color:#5a5a7a;margin-top:4px;">
              Based on average score of ${avg}% this week
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td style="padding:0 32px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:33%;text-align:center;background:#0f0f1a;border-radius:10px;padding:16px 8px;border:1px solid #2a2a4a;">
                <div style="font-size:28px;font-weight:900;color:#c8b4f0;">${sessions}</div>
                <div style="font-size:10px;color:#5a5a7a;text-transform:uppercase;letter-spacing:1px;margin-top:4px;">Sessions</div>
              </td>
              <td style="width:4%;"></td>
              <td style="width:33%;text-align:center;background:#0f0f1a;border-radius:10px;padding:16px 8px;border:1px solid #2a2a4a;">
                <div style="font-size:28px;font-weight:900;color:#ffbd2e;">${streak}</div>
                <div style="font-size:10px;color:#5a5a7a;text-transform:uppercase;letter-spacing:1px;margin-top:4px;">Day Streak 🔥</div>
              </td>
              <td style="width:4%;"></td>
              <td style="width:33%;text-align:center;background:#0f0f1a;border-radius:10px;padding:16px 8px;border:1px solid #2a2a4a;">
                <div style="font-size:28px;font-weight:900;color:#28c840;">${avg}%</div>
                <div style="font-size:10px;color:#5a5a7a;text-transform:uppercase;letter-spacing:1px;margin-top:4px;">Avg Score</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      ${subjectTableBlock}

      <tr>
        <td style="padding:0 32px 24px;">
          <div style="font-size:12px;font-weight:700;color:#9090b0;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;">
            🏆 Recent Achievements
          </div>
          <div style="background:#0f0f1a;border-radius:10px;padding:16px;border:1px solid #2a2a4a;">
            ${achievementBadges}
          </div>
        </td>
      </tr>

      <tr>
        <td style="padding:0 32px 28px;">
          <div style="background:rgba(75,0,130,0.2);border:1px solid rgba(75,0,130,0.4);border-radius:10px;padding:16px 20px;">
            <div style="font-size:12px;font-weight:700;color:#c8b4f0;margin-bottom:8px;">📝 Progress Note</div>
            <p style="margin:0;color:#9090b0;font-size:13px;line-height:1.7;">${progressNote}</p>
          </div>
        </td>
      </tr>

      <tr>
        <td style="padding:0 32px 24px;">
          <div style="border-top:1px solid #2a2a4a;"></div>
        </td>
      </tr>

      <tr>
        <td style="padding:0 32px 28px;">
          <p style="margin:0;color:#5a5a7a;font-size:11px;line-height:1.7;">
            This report is generated automatically every Sunday for
            <strong style="color:#9090b0;">${wardName}</strong>'s
            EliteScholars <strong style="color:#9090b0;">${planLabel}</strong> account.
            To update or remove your guardian email, ${wardName} can do so in their Profile Settings.
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#13132a;padding:20px 32px;text-align:center;border-top:1px solid #2a2a4a;">
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

// ============================================================================
// SUBSCRIPTION EMAILS
// ============================================================================

const PLAN_NAMES = {
  monthly: 'Premium Monthly',
  annual:  'Premium Annual',
  pro:     'Pro Monthly',
};

function expiryReminderEmail({ firstName, plan, expiresAt }) {
  const expiryFormatted = formatDate(expiresAt);
  const planName        = PLAN_NAMES[plan] || plan;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f1a;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:520px;background:#1a1a2e;border-radius:16px;overflow:hidden;border:1px solid #2a2a4a;">
      <tr>
        <td style="background:linear-gradient(135deg,#7a4500,#c47000,#7a4500);padding:32px 40px;text-align:center;">
          <div style="font-size:48px;margin-bottom:8px;">⏳</div>
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Your Premium ends in 3 days</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">EliteScholars · Renewal Reminder</p>
        </td>
      </tr>
      <tr>
        <td style="padding:40px 40px 32px;">
          <h2 style="margin:0 0 6px;color:#fff;font-size:18px;">Hey ${firstName} ⏰</h2>
          <p style="margin:0 0 24px;color:#9090b0;font-size:14px;line-height:1.7;">
            Your <strong style="color:#c8b4f0;">${planName}</strong> subscription expires on
            <strong style="color:#ffbd2e;">${expiryFormatted}</strong>. That's just 3 days away.
            Don't let your streak and progress lose momentum — you've come too far!
          </p>
          <div style="background:#0f0f1a;border:1px solid #c47000;border-radius:12px;padding:20px;text-align:center;margin-bottom:24px;">
            <p style="margin:0 0 6px;color:#9090b0;font-size:12px;">Your subscription expires</p>
            <p style="margin:0;color:#ffbd2e;font-size:24px;font-weight:700;">${expiryFormatted}</p>
          </div>
          <div style="background:rgba(255,95,87,0.06);border:1px solid rgba(255,95,87,0.2);border-radius:10px;padding:18px 20px;margin-bottom:24px;">
            <p style="margin:0 0 12px;color:#ff5f57;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">What you will lose after expiry</p>
            <p style="margin:0 0 8px;color:#c8c8c8;font-size:13px;">❌ Unlimited CBT sessions — gone</p>
            <p style="margin:0 0 8px;color:#c8c8c8;font-size:13px;">❌ Learn mode access — locked</p>
            <p style="margin:0 0 8px;color:#c8c8c8;font-size:13px;">❌ Game mode — restricted</p>
            <p style="margin:0;color:#c8c8c8;font-size:13px;">❌ Leaderboard and challenges — limited</p>
          </div>
          <div style="text-align:center;margin-bottom:24px;">
            <a href="https://elitescholars.site" style="display:inline-block;background:linear-gradient(135deg,#4B0082,#7B2FBE);color:#fff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;">
              Renew Now →
            </a>
          </div>
          <p style="margin:0;color:#5a5a7a;font-size:12px;line-height:1.7;">
            Renewing takes less than 2 minutes. Keep the momentum going, ${firstName} — your exams won't wait.
          </p>
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

function missYouEmail({ firstName }) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f1a;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:520px;background:#1a1a2e;border-radius:16px;overflow:hidden;border:1px solid #2a2a4a;">
      <tr>
        <td style="background:linear-gradient(135deg,#1a0030,#4B0082,#1a0030);padding:32px 40px;text-align:center;">
          <div style="font-size:52px;margin-bottom:8px;">🥺</div>
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">We miss you, ${firstName}</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">EliteScholars · Come Back</p>
        </td>
      </tr>
      <tr>
        <td style="padding:40px 40px 32px;">
          <p style="margin:0 0 20px;color:#c8c8c8;font-size:15px;line-height:1.8;">
            Hey <strong style="color:#c8b4f0;">${firstName}</strong> 🥺
          </p>
          <p style="margin:0 0 20px;color:#9090b0;font-size:14px;line-height:1.8;">
            Your Premium subscription has expired and honestly... EliteScholars hasn't been the same without you.
            Your study streak, your scores, your progress — it's all still here, waiting for you to come back.
          </p>
          <p style="margin:0 0 28px;color:#9090b0;font-size:14px;line-height:1.8;">
            Your exam won't prepare itself. And you were so close 💪
          </p>
          <div style="background:#0f0f1a;border:1px solid #2a2a4a;border-radius:12px;padding:20px;margin-bottom:24px;">
            <p style="margin:0 0 14px;color:#c8b4f0;font-size:13px;font-weight:600;">Here's what you're missing right now 😔</p>
            <p style="margin:0 0 10px;color:#9090b0;font-size:13px;">📚 <strong style="color:#c8c8c8;">Unlimited CBT Practice</strong> — practice as many times as you need</p>
            <p style="margin:0 0 10px;color:#9090b0;font-size:13px;">🧠 <strong style="color:#c8c8c8;">Full Learn Mode</strong> — master every topic before your exam</p>
            <p style="margin:0 0 10px;color:#9090b0;font-size:13px;">🎮 <strong style="color:#c8c8c8;">Game Mode</strong> — make studying actually fun</p>
            <p style="margin:0 0 10px;color:#9090b0;font-size:13px;">🏆 <strong style="color:#c8c8c8;">Leaderboard</strong> — compete with students across Nigeria</p>
            <p style="margin:0;color:#9090b0;font-size:13px;">⚡ <strong style="color:#c8c8c8;">Challenges</strong> — push yourself further every day</p>
          </div>
          <div style="background:linear-gradient(135deg,rgba(75,0,130,0.3),rgba(123,47,190,0.3));border:1px solid #4B0082;border-radius:12px;padding:20px;text-align:center;margin-bottom:24px;">
            <p style="margin:0 0 6px;color:#c8b4f0;font-size:14px;line-height:1.6;">
              Your exam is coming. Every day without practice is a day your competition gets ahead.
            </p>
            <p style="margin:0 0 16px;color:#9090b0;font-size:13px;">Come back. We've got you. 🙏</p>
            <a href="https://elitescholars.site" style="display:inline-block;background:linear-gradient(135deg,#4B0082,#7B2FBE);color:#fff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;">
              Renew My Premium
            </a>
          </div>
          <div style="background:#0f0f1a;border:1px solid #2a2a4a;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0 0 12px;color:#5a5a7a;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Available Plans</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;"><span style="color:#c8c8c8;font-size:13px;">⭐ Pro Monthly</span></td>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;text-align:right;"><span style="color:#28c840;font-size:13px;font-weight:600;">₦3,000/mo</span></td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;"><span style="color:#c8c8c8;font-size:13px;">💎 Premium Monthly</span></td>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;text-align:right;"><span style="color:#28c840;font-size:13px;font-weight:600;">₦9,000/mo</span></td>
              </tr>
              <tr>
                <td style="padding:8px 0;"><span style="color:#c8c8c8;font-size:13px;">👑 Premium Annual</span></td>
                <td style="padding:8px 0;text-align:right;"><span style="color:#28c840;font-size:13px;font-weight:600;">₦89,000/yr</span></td>
              </tr>
            </table>
          </div>
          <p style="margin:0;color:#5a5a7a;font-size:12px;line-height:1.7;text-align:center;">
            We believe in you, ${firstName}. Come back and show your exams what you're made of 💜
          </p>
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

// ============================================================================
// JOB: Guardian Reports (Sundays 5AM UTC)
// ============================================================================

async function runGuardianReports() {
  const { from: weekFrom, to: weekTo } = getWeekRange();
  const result = await sheetsGet({ action: 'getUsersWithGuardians' });

  if (!result?.success) throw new Error('Failed to fetch users with guardians');

  const users = result.users || [];
  const sent  = { success: 0, errors: 0 };

  for (const user of users) {
    if (!user.guardianEmail || !user.email) continue;

    const wardName = (user.firstName + ' ' + user.lastName).trim() || 'Your Ward';

    try {
      await resend.emails.send({
        from:    'EliteScholars <' + FROM + '>',
        to:      user.guardianEmail,
        subject: '📊 ' + wardName + "'s Weekly Study Report — EliteScholars",
        html:    buildReportEmail({
          wardName,
          stats:              user.stats,
          subjectPerformance: user.subjectPerformance,
          achievements:       user.achievements,
          weekFrom,
          weekTo,
          plan:               user.plan,
        }),
      });
      sent.success++;
      console.log('Report sent for:', user.email, '→', user.guardianEmail);
    } catch (err) {
      console.error('Failed to send report for:', user.email, err.message);
      sent.errors++;
    }
  }

  return {
    type:  'guardian_reports',
    sent,
    total: users.length,
    week:  weekFrom + ' — ' + weekTo,
  };
}

// ============================================================================
// JOB: Subscription Reminders (Daily 7AM UTC)
// ============================================================================

async function runSubscriptionReminders(isSunday = false) {

  console.log('About to call getExpiringSubscriptions');
  const result = await sheetsGet({ action: 'getExpiringSubscriptions' });
console.log('Finished calling getExpiringSubscriptions ', result);

  if (!result?.success) throw new Error('Failed to fetch subscriptions');

  const { expiring = [], expired = [] } = result;
  const sent = { reminders: 0, missYou: 0, errors: 0 };

  // Send expiry reminders (always, every day)
  for (const user of expiring) {
    try {
      await resend.emails.send({
        from:    'EliteScholars <' + FROM + '>',
        to:      user.email,
        subject: '⏳ ' + (user.firstName || 'Student') + ', your Premium expires in 3 days',
        html:    expiryReminderEmail({
          firstName: user.firstName || 'Student',
          plan:      user.plan,
          expiresAt: user.expiresAt,
        }),
      });
      sent.reminders++;
      console.log('Reminder sent to:', user.email);
    } catch (err) {
      console.error('Reminder error:', user.email, err.message);
      sent.errors++;
    }
  }

  // Send "I miss you" ONLY on Sundays (weekly)
  if (isSunday) {
    console.log('📅 Sunday detected — Sending "We Miss You" emails');
    for (const user of expired) {
      try {
        await resend.emails.send({
          from:    'EliteScholars <' + FROM + '>',
          to:      user.email,
          subject: '🥺 ' + (user.firstName || 'Student') + ', we miss you — come back to EliteScholars',
          html:    missYouEmail({
            firstName: user.firstName || 'Student',
            plan:      user.plan,
          }),
        });
        sent.missYou++;
        console.log('Miss-you sent to:', user.email);
      } catch (err) {
        console.error('Miss-you error:', user.email, err.message);
        sent.errors++;
      }
    }
  } else {
    console.log('📅 Not Sunday — Skipping "We Miss You" emails (will send next Sunday)');
  }

  return {
    type:        'subscription_reminders',
    sent,
    expiring:    expiring.length,
    expired:     expired.length,
    missYouSent: isSunday,
  };
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

export default async function handler(req, res) {
  // ⚠️ TEMPORARILY DISABLE AUTH FOR TESTING ⚠️
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ error: 'Unauthorized' });
  }

  const now  = new Date();
  const hour = now.getUTCHours();
  const day  = now.getUTCDay();

  try {
    let result;

    // Manual trigger via query param
    const job = req.query?.job;

    if (job === 'guardian-reports') {
      console.log('🔵 MANUAL TRIGGER: Guardian Reports');
      result = await runGuardianReports();
    } 
    else if (job === 'subscription-reminders') {
      console.log('🟢 MANUAL TRIGGER: Subscription Reminders');
      result = await runSubscriptionReminders(true); // manual = send everything
    }
    // ⚠️ ALSO ADD TEST MODE - just visit /api/cron?test=guardian
    else if (req.query?.test === 'guardian') {
      console.log('🧪 TEST MODE: Guardian Reports');
      result = await runGuardianReports();
    }
    else if (req.query?.test === 'subscription') {
      console.log('🧪 TEST MODE: Subscription Reminders');
      result = await runSubscriptionReminders(true); // test = send everything
    }
    else if (day === 0 && hour === 5) {
      result = await runGuardianReports();
    } 
    else if (hour === 7) {
      const isSunday = day === 0;
      console.log(`📅 SCHEDULED: Subscription Reminders (Daily 7AM UTC) — isSunday: ${isSunday}`);
      result = await runSubscriptionReminders(isSunday);
    } 
    else {
      result = {
        message: 'No job scheduled for this time.',
        utcHour: hour,
        utcDay:  day,
        hint: 'Use ?job=guardian-reports or ?test=guardian to force run'
      };
    }

    return res.status(200).json({ success: true, ...result });

  } catch (err) {
    console.error('Cron handler crash:', err.message);
    return res.status(500).json({ error: err.message });
  }
}