// ============================================================================
// constants/quiz.js — Quiz behaviour settings
// ============================================================================

export const ROUND_SIZE       = 20;
export const SHARE_GATE_EVERY = 50;

// Seconds per question by subject type
// Calculation-heavy subjects get 25 s; others get 16 s
export function getTimerSecs(subjectId, questionCount) {
  const calcSubjects = ['mathematics', 'physics', 'chemistry'];
  const secsPerQ = calcSubjects.includes(subjectId) ? 20 : 10;
  return questionCount * secsPerQ;
}