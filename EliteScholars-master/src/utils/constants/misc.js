// ============================================================================
// constants/misc.js — Vibes, reminders, share copy
// ============================================================================

import { APP_URL } from './links';

// ── Reminder schedule ─────────────────────────────────────────────────────────
// 24h format hours. SW schedules a notification at each time every day.
export const REMINDER_TIMES = [6, 18]; // 6 AM and 6 PM

// ── Motivational vibes ────────────────────────────────────────────────────────
export const VIBES = [
  'Your brain is literally built different! 🧠',
  'This is what serious exam candidates look like! 🔥',
  "You're not just studying — you're dominating! 💪",
  "The exam hall has no idea what's coming. 😤",
  'You studied, you practiced, you conquered! 🏆',
  'Your consistency is your superpower! ⚡',
  '💡 Did you know? You can challenge a friend in the Challenges tab!',
  '💡 Use Learn Mode to master topics before CBT practice.',
  '💡 Boost your XP by maintaining daily streaks! Check your Profile.',
  '💡 Check the Shop tab for premium study materials! 🛍️',
  '💡 Use keyboard arrows ← → to navigate questions in a quiz!',
  '📚 Study Tip: Review your wrong answers — that is where marks hide.',
  '📚 Study Tip: 30 minutes daily beats 5 hours once a week.',
  '🎯 Exam Tip: Read every question twice before picking an answer.',
  '🎯 Exam Tip: Eliminate wrong options first — narrow it down!',
  '🏅 Win Tip: Players with 50+ quizzes score 40% higher on average.',
  '💡 Go Premium to remove all ads and unlock unlimited practice!',
];

// ── Share message ─────────────────────────────────────────────────────────────
export const shareMsg = (name, subject, correct, totalQ) =>
  `${name} just scored ${correct}/${totalQ} in ${subject} on EliteScholars CBT! 🔥\n\nFree exam prep at ${APP_URL} — come try it!`;