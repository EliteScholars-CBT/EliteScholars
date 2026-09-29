// ============================================================================
// JAMB Data — Master index
//
// Structure:
//   jamb/questions/<subject>.js  — question bank per subject
//   jamb/learn/<subject>.js      — learn content per subject (borrowed from WAEC)
// ============================================================================

// Question banks
import { QB_ACCOUNTING } from './questions/accounting';
import { QB_BIOLOGY } from './questions/biology';
import { QB_CHEMISTRY } from './questions/chemistry';
import { QB_ECONOMICS } from './questions/economics';
import { QB_ENGLISH } from './questions/english';
import { QB_GOVERNMENT } from './questions/government';
import { QB_LITERATURE } from './questions/literature';
import { QB_MATHEMATICS } from './questions/mathematics';
import { QB_NOVEL } from './questions/novel';
import { QB_PHYSICS } from './questions/physics';

// Learn content (JAMB's own files for its original 9 subjects)
import { JAMB_LEARN_ENGLISH } from './learn/english';
import { JAMB_LEARN_MATHEMATICS } from './learn/mathematics';
import { JAMB_LEARN_PHYSICS } from './learn/physics';
import { JAMB_LEARN_CHEMISTRY } from './learn/chemistry';
import { JAMB_LEARN_BIOLOGY } from './learn/biology';
import { JAMB_LEARN_ECONOMICS } from './learn/economics';
import { JAMB_LEARN_GOVERNMENT } from './learn/government';
import { JAMB_LEARN_LITERATURE } from './learn/literature';
import { JAMB_LEARN_ACCOUNTING } from './learn/accounting';

// Subjects shared directly from WAEC_LEARN — these ARE part of the JAMB UTME
// syllabus but don't have their own jamb/learn/ files. CBT question pool
// falls back to WAEC_QB automatically in Quiz.js for these too.
import { WAEC_LEARN } from '../waec/learn/index';

// QB object — backward compatible with Quiz.js
export const QB = {
  accounting: QB_ACCOUNTING,
  biology: QB_BIOLOGY,
  chemistry: QB_CHEMISTRY,
  economics: QB_ECONOMICS,
  english: QB_ENGLISH,
  government: QB_GOVERNMENT,
  literature: QB_LITERATURE,
  mathematics: QB_MATHEMATICS,
  novel: QB_NOVEL,
  physics: QB_PHYSICS,
};

// Learn object keyed by subject ID
export const JAMB_LEARN = {
  // ── JAMB's own learn content ─────────────────────────────────────────────
  english: JAMB_LEARN_ENGLISH,
  mathematics: JAMB_LEARN_MATHEMATICS,
  physics: JAMB_LEARN_PHYSICS,
  chemistry: JAMB_LEARN_CHEMISTRY,
  biology: JAMB_LEARN_BIOLOGY,
  economics: JAMB_LEARN_ECONOMICS,
  government: JAMB_LEARN_GOVERNMENT,
  literature: JAMB_LEARN_LITERATURE,
  accounting: JAMB_LEARN_ACCOUNTING,

  // ── JAMB syllabus subjects shared directly from WAEC_LEARN ───────────────
  further_maths: WAEC_LEARN.further_maths,
  crs: WAEC_LEARN.crs,
  commerce: WAEC_LEARN.commerce,
  geography: WAEC_LEARN.geography,
  agric_science: WAEC_LEARN.agric_science,

  // NOTE: civic, visual_arts, food_nutrition, marketing, digital_tech,
  // citizenship are intentionally NOT included — they are not part of the
  // JAMB UTME syllabus. If you decide JAMB should support any of these,
  // just add a line here, e.g.: civic: WAEC_LEARN.civic,
};

// Re-export individual QB arrays
export { QB_ACCOUNTING } from './questions/accounting';
export { QB_BIOLOGY } from './questions/biology';
export { QB_CHEMISTRY } from './questions/chemistry';
export { QB_ECONOMICS } from './questions/economics';
export { QB_ENGLISH } from './questions/english';
export { QB_GOVERNMENT } from './questions/government';
export { QB_LITERATURE } from './questions/literature';
export { QB_MATHEMATICS } from './questions/mathematics';
export { QB_NOVEL } from './questions/novel';
export { QB_PHYSICS } from './questions/physics';
