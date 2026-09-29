// ============================================================================
// xpManager.js — XP calculation and storage
// All XP values are defined in constants.js → XP_REWARDS
// ============================================================================

import { XP_REWARDS, SHEETS_URL } from './constants';

const XP_KEY = (email) => `ep_xp_${email}`;
const DAILY_XP_KEY = (email) => `ep_daily_xp_${email}_${new Date().toDateString()}`;

// ── Load / save ───────────────────────────────────────────────────────────────
export function loadXP(email) {
  if (!email) return 0;
  try {
    return parseInt(localStorage.getItem(XP_KEY(email)) || '0', 10);
  } catch { return 0; }
}

export function saveXPValue(email, xp) {
  if (!email) return;
  try { localStorage.setItem(XP_KEY(email), String(xp)); } catch {}
}

// ── Add XP ────────────────────────────────────────────────────────────────────
export async function addXP(email, name, amount, reason = '') {
  if (!email || !amount) return;
  const current = loadXP(email);
  const newTotal = current + amount;
  saveXPValue(email, newTotal);

  // Track daily XP
  try {
    const dailyRaw = localStorage.getItem(DAILY_XP_KEY(email));
    const dailyXP  = (dailyRaw ? parseInt(dailyRaw, 10) : 0) + amount;
    localStorage.setItem(DAILY_XP_KEY(email), String(dailyXP));
  } catch {}

  // Always push XP to server leaderboard (fire-and-forget)
  // This fires for ALL XP sources: quiz, daily login, topic complete, share, etc.
  try {
    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'addXP',
        email, name,
        xp: newTotal,
        amount,
        reason,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {}

  return newTotal;
}

// ── XP level system ───────────────────────────────────────────────────────────
export function getLevel(xp) {
  // XP thresholds per level: 100, 300, 600, 1000, 1500, 2100...
  let level = 1;
  let threshold = 100;
  let accumulated = 0;
  while (accumulated + threshold <= xp) {
    accumulated += threshold;
    level++;
    threshold = Math.round(threshold * 1.5);
  }
  return { level, currentXP: xp - accumulated, nextLevelXP: threshold, totalXP: xp };
}

export function getLevelTitle(level) {
  const titles = [
    '', 'Rookie', 'Learner', 'Student', 'Scholar', 'Achiever',
    'Expert', 'Master', 'Champion', 'Legend', 'Elite',
  ];
  return titles[Math.min(level, titles.length - 1)] || 'Elite';
}

// ── Calculate quiz XP ─────────────────────────────────────────────────────────
export function calculateQuizXP(correct, totalQ, timeRemaining = 0, streak = 1, usedFifty = false, usedHint = false) {
  let xp = 0;

  // Base: per correct answer
  xp += correct * XP_REWARDS.perCorrectAnswer;

  // Perfect round bonus
  if (correct === totalQ && totalQ > 0) {
    xp += XP_REWARDS.perfectRound;
  }

  // 90%+ bonus
  const pct = totalQ > 0 ? (correct / totalQ) * 100 : 0;
  if (pct >= 90 && !(correct === totalQ)) {
    xp += XP_REWARDS.ninetyPlusQuiz;
  }
  if (correct === totalQ && totalQ > 0) {
    xp += XP_REWARDS.perfectQuiz;
  }

  // Speed bonus — time remaining > 10s per question on average
  if (timeRemaining > 10 * totalQ && totalQ > 0) {
    xp += XP_REWARDS.speedBonus;
  }

  // Streak multiplier
  if (streak >= 30) xp = Math.round(xp * 1.5);
  else if (streak >= 7) xp = Math.round(xp * 1.3);
  else if (streak >= 3) xp = Math.round(xp * 1.15);

  return Math.max(0, xp);
}

// ── Daily login XP ────────────────────────────────────────────────────────────
const DAILY_LOGIN_KEY = (email) => `ep_dailylogin_${email}_${new Date().toDateString()}`;

export function awardDailyLoginXP(email, name) {
  if (!email) return 0;
  try {
    if (localStorage.getItem(DAILY_LOGIN_KEY(email))) return 0;
    localStorage.setItem(DAILY_LOGIN_KEY(email), '1');
    addXP(email, name, XP_REWARDS.dailyLogin, 'daily_login');
    return XP_REWARDS.dailyLogin;
  } catch { return 0; }
}

// ── Topic completion XP ───────────────────────────────────────────────────────
export function awardTopicXP(email, name) {
  if (!email) return 0;
  addXP(email, name, XP_REWARDS.topicCompleted, 'topic_completed');
  return XP_REWARDS.topicCompleted;
}

// ── Share XP ──────────────────────────────────────────────────────────────────
export function awardShareXP(email, name) {
  if (!email) return 0;
  addXP(email, name, XP_REWARDS.shareApp, 'share_app');
  return XP_REWARDS.shareApp;
}
