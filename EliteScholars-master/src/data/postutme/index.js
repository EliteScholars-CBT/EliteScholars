// ============================================================================
// POST UTME Data — Master index
// POST UTME uses WAEC question banks and JAMB/WAEC learn content
// University-specific past questions are in the postutme/ root files
// ============================================================================

// Re-export WAEC QB for POST UTME CBT mode
export { WAEC_QB } from '../waec/index';
export { WAEC_SUBJECTS } from '../waec/index';

// POST UTME learn content (shared with JAMB, no SS divisions)
export { POSTUTME_LEARN } from './learn/index';

// University-specific question banks
import { ABU } from './abu';
import { BUK } from './buk';
import { FUNAAB } from './funaab';
import { LASU } from './lasu';
import { LAUTECH } from './lautech';
import { UNIBEN } from './uniben';
import { UNICAL } from './unical';
import { UNILAG } from './unilag';
import { UNILORIN } from './unilorin';
import { UNIUYO } from './uniuyo';
import { UNN } from './unn';

// Combined POST_UTME object (backward compat with Subjects.js)
export const POST_UTME = {
  abu: ABU,
  buk: BUK,
  funaab: FUNAAB,
  lasu: LASU,
  lautech: LAUTECH,
  uniben: UNIBEN,
  unical: UNICAL,
  unilag: UNILAG,
  unilorin: UNILORIN,
  uniuyo: UNIUYO,
  unn: UNN,
};

// Re-export individual university banks
export { ABU } from './abu';
export { BUK } from './buk';
export { FUNAAB } from './funaab';
export { LASU } from './lasu';
export { LAUTECH } from './lautech';
export { UNIBEN } from './uniben';
export { UNICAL } from './unical';
export { UNILAG } from './unilag';
export { UNILORIN } from './unilorin';
export { UNIUYO } from './uniuyo';
export { UNN } from './unn';