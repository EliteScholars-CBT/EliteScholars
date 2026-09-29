// analytics.js
// FIX (Issue 9): trackSessionEnd now receives milliseconds from Date.now() diff,
//                converts to HH:MM:SS for the formatted field.
import { SHEETS_URL } from '../utils/constants';

// ============================================================================
// BASE ANALYTICS FUNCTIONS
// ============================================================================

export function getDeviceInfo() {
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android/i.test(ua);
  const isTablet = /iPad|Tablet/i.test(ua);
  const browser =
    /Chrome/i.test(ua) && !/Edge|OPR/i.test(ua) ? 'Chrome' :
    /Firefox/i.test(ua) ? 'Firefox' :
    /Safari/i.test(ua) && !/Chrome/i.test(ua) ? 'Safari' :
    /Edge/i.test(ua) ? 'Edge' :
    /OPR|Opera/i.test(ua) ? 'Opera' : 'Other';
  const device = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';
  const os =
    /Android/i.test(ua) ? 'Android' :
    /iPhone|iPad/i.test(ua) ? 'iOS' :
    /Windows/i.test(ua) ? 'Windows' :
    /Mac/i.test(ua) ? 'macOS' :
    /Linux/i.test(ua) ? 'Linux' : 'Unknown';
  return { browser, device, os };
}

export function fmtTimestamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function trackEvent(eventName, data) {
  if (!SHEETS_URL) return;
  const eventData = {
    event: eventName,
    timestamp: fmtTimestamp(),
    ...data,
  };
  fetch(SHEETS_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  }).catch(() => {});
}

// ============================================================================
// LEADERBOARD ANALYTICS
// ============================================================================

export function trackLeaderboardView(userEmail, timeframe, examType, subject = null) {
  trackEvent('leaderboard_view', {
    user_email: userEmail,
    timeframe,
    exam_type: examType,
    subject,
    ...getDeviceInfo(),
  });
}

export function trackLeaderboardFilter(userEmail, filterType, filterValue) {
  trackEvent('leaderboard_filter', {
    user_email: userEmail,
    filter_type: filterType,
    filter_value: filterValue,
    ...getDeviceInfo(),
  });
}

// ============================================================================
// CHALLENGE ANALYTICS
// ============================================================================

export function trackChallengeCreated(challengerEmail, opponentEmail, examType, subject, numQuestions, timeLimit) {
  trackEvent('challenge_created', {
    challenger_email: challengerEmail,
    opponent_email: opponentEmail,
    exam_type: examType,
    subject,
    num_questions: numQuestions,
    time_limit: timeLimit,
    ...getDeviceInfo(),
  });
}

export function trackChallengeAction(challengeId, action, userEmail, result = null) {
  trackEvent('challenge_action', {
    challenge_id: challengeId,
    action,
    user_email: userEmail,
    result,
    ...getDeviceInfo(),
  });
}

// ============================================================================
// XP ANALYTICS
// ============================================================================

export function trackXPEarned(userEmail, amount, reason, totalXP, newLevel, oldLevel) {
  trackEvent('xp_earned', {
    user_email: userEmail,
    amount,
    reason,
    total_xp: totalXP,
    new_level: newLevel,
    level_up: newLevel > oldLevel,
    ...getDeviceInfo(),
  });
}

export function trackLevelUp(userEmail, oldLevel, newLevel, totalXP) {
  trackEvent('level_up', {
    user_email: userEmail,
    old_level: oldLevel,
    new_level: newLevel,
    total_xp: totalXP,
    ...getDeviceInfo(),
  });
}

// ============================================================================
// SESSION ANALYTICS
// ============================================================================

export function trackSessionStart(userEmail, userName) {
  trackEvent('session_start', {
    user_email: userEmail,
    user_name: userName,
    ...getDeviceInfo(),
  });
}

// FIX (Issue 9): Accept durationMs (milliseconds from Date.now() diff).
// Converts to seconds first, then formats as HH:MM:SS.
export function trackSessionEnd(userEmail, durationMs) {
  const totalSeconds = Math.floor((durationMs || 0) / 1000);
  const hours   = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const formattedDuration =
    `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;

  trackEvent('session_end', {
    user_email: userEmail,
    duration_seconds: totalSeconds,
    duration_formatted: formattedDuration,
    ...getDeviceInfo(),
  });
}

// ============================================================================
// QUIZ ANALYTICS (Enhanced with XP)
// ============================================================================

export function trackQuizCompleteWithXP(userEmail, subject, score, totalXP, xpEarned, levelUp, newLevel) {
  trackEvent('quiz_complete_xp', {
    user_email: userEmail,
    subject,
    score,
    total_xp: totalXP,
    xp_earned: xpEarned,
    level_up: levelUp,
    new_level: newLevel,
    ...getDeviceInfo(),
  });
}
