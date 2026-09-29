// ============================================================================
// constants/xp.js — XP reward values
//
// Rebalanced to slow down level progression. The level curve itself
// (cumulative threshold × 1.5 per level) was fine — the issue was that
// per-action rewards (especially topicCompleted, perfectQuiz, dailyLogin,
// and the perfect-round bonus stack) were too generous relative to that
// curve, letting students cross multiple levels in a single day just from
// reading a few Learn topics or playing one perfect quiz round.
// ============================================================================

export const XP_REWARDS = {
  perCorrectAnswer: 5, // unchanged — core unit of "work" the curve is built around
  perfectRound: 15, // was 30
  perfectQuiz: 25, // was 60
  ninetyPlusQuiz: 10, // was 25
  topicCompleted: 15, // was 40 — previously the single biggest source of XP inflation
  dailyLogin: 5, // was 15
  streakBonus3: 15, // was 25
  streakBonus7: 35, // was 60
  streakBonus30: 90, // was 150
  challengeWon: 40, // was 70
  challengePlayed: 10, // was 15
  speedBonus: 8, // was 20
  firstQuizEver: 25, // was 40
  shopVisit: 3, // was 5
  shareApp: 10, // was 20
  gameCompleted: 20, // was 35
  gamePerfect: 40, // was 80
  learnQuizPass: 15, // was 30
};
