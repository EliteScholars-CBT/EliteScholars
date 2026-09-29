import { SUBJ } from './subjects';
import { WAEC_SUBJECTS } from './waec/index';
import { GST_SUBJECTS } from './gst/index';
import { NECO_SUBJECTS } from './neco/index';

// ============================================================================
// Unified subject metadata lookup
//
// SUBJ (data/subjects.js) only covers JAMB/WAEC-style subject ids. It does NOT
// include GST subjects (gst_english, gst_compute, etc.) or any NECO-only ids.
// Components like Ready.js, Result.js, ScoreCard.js, and Quiz.js previously did
// `SUBJ[subjectId] || SUBJ.economics`, which silently fell back to the wrong
// subject (e.g. "Economics") whenever subjectId wasn't in SUBJ — most notably
// for every GST subject. This caused the "subject name not tallying" bugs on
// the Get Ready screen and the Q5/5 results screen.
//
// getSubjectMeta() merges SUBJ + WAEC_SUBJECTS + GST_SUBJECTS + NECO_SUBJECTS
// into one lookup table so ANY subjectId, from ANY exam type, resolves to its
// correct label/icon/color/bg.
// ============================================================================

const ALL_SUBJECTS_MAP = (() => {
  const map = { ...SUBJ };

  [...(WAEC_SUBJECTS || []), ...(GST_SUBJECTS || []), ...(NECO_SUBJECTS || [])].forEach((s) => {
    if (s?.id && !map[s.id]) map[s.id] = s;
  });

  return map;
})();

// Generic fallback used only if a subjectId truly isn't found anywhere
const DEFAULT_META = { label: 'General', icon: '📘', color: '#7C3AED', bg: '#EDE9FE' };

export function getSubjectMeta(subjectId) {
  return ALL_SUBJECTS_MAP[subjectId] || DEFAULT_META;
}
