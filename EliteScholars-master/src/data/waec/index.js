// ============================================================================
// WAEC Data — Master index
//
// Structure:
//   waec/questions/<subject>.js         — question bank per subject
//   waec/learn/ss1/<subject>.js         — SS1 learn topics
//   waec/learn/ss2/<subject>.js         — SS2 learn topics
//   waec/learn/ss3/<subject>.js         — SS3 learn topics
//   waec/learn/index.js                 — merged WAEC_LEARN object
// ============================================================================

// Question banks
import { WAEC_ACCOUNTING } from './questions/accounting';
import { WAEC_BIOLOGY } from './questions/biology';
import { WAEC_CHEMISTRY } from './questions/chemistry';
import { WAEC_CIVIC } from './questions/civic';
import { WAEC_COMMERCE } from './questions/commerce';
import { WAEC_ECONOMICS } from './questions/economics';
import { WAEC_ENGLISH } from './questions/english';
import { WAEC_GEOGRAPHY } from './questions/geography';
import { WAEC_GOVERNMENT } from './questions/government';
import { WAEC_LITERATURE } from './questions/literature';
import { WAEC_MATHEMATICS } from './questions/mathematics';
import { WAEC_PHYSICS } from './questions/physics';

// New subjects
import { WAEC_FURTHER_MATHS } from './questions/further_maths';
import { WAEC_CRS } from './questions/crs';
import { WAEC_VISUAL_ARTS } from './questions/visual_arts';
import { WAEC_FOOD_NUTRITION } from './questions/food_nutrition';
import { WAEC_MARKETING } from './questions/marketing';

// Future subjects (placeholders — ready for content upload)
import { WAEC_DIGITAL_TECH } from './questions/digital_tech';
import { WAEC_AGRIC_SCIENCE } from './questions/agric_science';
import { WAEC_CITIZENSHIP } from './questions/citizenship';

// Learn content (all SS levels merged)
import { WAEC_LEARN, WAEC_LEARN_BY_LEVEL } from './learn/index';

// Subject metadata (for UI display)
export const WAEC_SUBJECTS = [
  { id: 'english',        label: 'English Language',     icon: '📖', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'mathematics',    label: 'Mathematics',           icon: '📐', color: '#1D4ED8', bg: '#DBEAFE' },
  { id: 'physics',        label: 'Physics',               icon: '⚡', color: '#B45309', bg: '#FEF3C7' },
  { id: 'chemistry',       label: 'Chemistry',             icon: '⚗️', color: '#9A3412', bg: '#FEE2E2' },
  { id: 'biology',         label: 'Biology',               icon: '🔬', color: '#065F46', bg: '#DCFCE7' },
  { id: 'economics',       label: 'Economics',             icon: '📊', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'government',      label: 'Government',            icon: '🏛️', color: '#3F6212', bg: '#F7FEE7' },
  { id: 'literature',      label: 'Literature in English', icon: '📚', color: '#831843', bg: '#FCE7F3' },
  { id: 'accounting',      label: 'Financial Accounting',  icon: '💰', color: '#064E3B', bg: '#ECFDF5' },
  { id: 'geography',       label: 'Geography',             icon: '🌍', color: '#0C4A6E', bg: '#E0F2FE' },
  { id: 'commerce',        label: 'Commerce',              icon: '🏪', color: '#0F766E', bg: '#CCFBF1' },
  { id: 'civic',           label: 'Civic Education',       icon: '🗳️', color: '#1D4ED8', bg: '#DBEAFE' },

  // ── New subjects ──────────────────────────────────────────────────────────
  { id: 'further_maths',   label: 'Further Mathematics',   icon: '➗', color: '#1E40AF', bg: '#E0E7FF' },
  { id: 'crs',             label: 'Christian Religious Studies', icon: '✝️', color: '#7C2D12', bg: '#FFEDD5' },
  { id: 'visual_arts',     label: 'Visual Arts',           icon: '🎨', color: '#BE185D', bg: '#FCE7F3' },
  { id: 'food_nutrition',  label: 'Food and Nutrition',     icon: '🍲', color: '#B91C1C', bg: '#FEE2E2' },
  { id: 'marketing',       label: 'Marketing',              icon: '📢', color: '#C2410C', bg: '#FFEDD5' },

  // ── Future subjects (ready for content upload) ───────────────────────────
  { id: 'digital_tech',    label: 'Digital Technology',     icon: '💻', color: '#1D4ED8', bg: '#DBEAFE' },
  { id: 'agric_science',   label: 'Agricultural Science',   icon: '🌱', color: '#15803D', bg: '#DCFCE7' },
  { id: 'citizenship',     label: 'Citizenship',            icon: '🪪', color: '#4338CA', bg: '#E0E7FF' },
];

// QB object keyed by subject ID
export const WAEC_QB = {
  accounting: WAEC_ACCOUNTING,
  biology: WAEC_BIOLOGY,
  chemistry: WAEC_CHEMISTRY,
  civic: WAEC_CIVIC,
  commerce: WAEC_COMMERCE,
  economics: WAEC_ECONOMICS,
  english: WAEC_ENGLISH,
  geography: WAEC_GEOGRAPHY,
  government: WAEC_GOVERNMENT,
  literature: WAEC_LITERATURE,
  mathematics: WAEC_MATHEMATICS,
  physics: WAEC_PHYSICS,

  // New subjects
  further_maths: WAEC_FURTHER_MATHS,
  crs: WAEC_CRS,
  visual_arts: WAEC_VISUAL_ARTS,
  food_nutrition: WAEC_FOOD_NUTRITION,
  marketing: WAEC_MARKETING,

  // Future subjects
  digital_tech: WAEC_DIGITAL_TECH,
  agric_science: WAEC_AGRIC_SCIENCE,
  citizenship: WAEC_CITIZENSHIP,
};

// Re-export learn objects
export { WAEC_LEARN, WAEC_LEARN_BY_LEVEL };

// Re-export individual QB arrays
export { WAEC_ACCOUNTING } from './questions/accounting';
export { WAEC_BIOLOGY } from './questions/biology';
export { WAEC_CHEMISTRY } from './questions/chemistry';
export { WAEC_CIVIC } from './questions/civic';
export { WAEC_COMMERCE } from './questions/commerce';
export { WAEC_ECONOMICS } from './questions/economics';
export { WAEC_ENGLISH } from './questions/english';
export { WAEC_GEOGRAPHY } from './questions/geography';
export { WAEC_GOVERNMENT } from './questions/government';
export { WAEC_LITERATURE } from './questions/literature';
export { WAEC_MATHEMATICS } from './questions/mathematics';
export { WAEC_PHYSICS } from './questions/physics';
export { WAEC_FURTHER_MATHS } from './questions/further_maths';
export { WAEC_CRS } from './questions/crs';
export { WAEC_VISUAL_ARTS } from './questions/visual_arts';
export { WAEC_FOOD_NUTRITION } from './questions/food_nutrition';
export { WAEC_MARKETING } from './questions/marketing';
export { WAEC_DIGITAL_TECH } from './questions/digital_tech';
export { WAEC_AGRIC_SCIENCE } from './questions/agric_science';
export { WAEC_CITIZENSHIP } from './questions/citizenship';