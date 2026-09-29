// ============================================================================
// NECO Data — Master index
//
// Structure:
//   neco/questions/<subject>.js  — question bank per subject
//   neco/learn/                  — WAEC learn bank is shared (same SS curriculum)
// ============================================================================

// Question banks
import { NECO_QB_ENGLISH } from './questions/english';
import { NECO_QB_MATHEMATICS } from './questions/mathematics';
import { NECO_QB_PHYSICS } from './questions/physics';
import { NECO_QB_CHEMISTRY } from './questions/chemistry';
import { NECO_QB_BIOLOGY } from './questions/biology';
import { NECO_QB_ECONOMICS } from './questions/economics';
import { NECO_QB_GOVERNMENT } from './questions/government';
import { NECO_QB_LITERATURE } from './questions/literature';
import { NECO_QB_GEOGRAPHY } from './questions/geography';

// Learn content — shared from WAEC learn bank (NECO follows same SS curriculum)
// "WAEC" labels in content are swapped to "NECO" at render time in Learn.js
import { WAEC_LEARN } from '../waec/learn/index';

// Subject metadata — NECO's own question-bank subjects, plus subjects
// shared from WAEC (learn content always works via WAEC_LEARN; CBT falls
// back to WAEC_QB automatically in Quiz.js if NECO has no QB for a subject)
export const NECO_SUBJECTS = [
  { id: 'english', label: 'English Language', icon: '📖', color: '#0369A1', bg: '#E0F2FE' },
  { id: 'mathematics', label: 'Mathematics', icon: '📐', color: '#1D4ED8', bg: '#DBEAFE' },
  { id: 'physics', label: 'Physics', icon: '⚡', color: '#B45309', bg: '#FEF3C7' },
  { id: 'chemistry', label: 'Chemistry', icon: '⚗️', color: '#9A3412', bg: '#FEE2E2' },
  { id: 'biology', label: 'Biology', icon: '🔬', color: '#065F46', bg: '#DCFCE7' },
  { id: 'economics', label: 'Economics', icon: '📊', color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'government', label: 'Government', icon: '🏛️', color: '#3F6212', bg: '#F7FEE7' },
  { id: 'literature', label: 'Literature', icon: '📚', color: '#831843', bg: '#FCE7F3' },
  { id: 'geography', label: 'Geography', icon: '🌍', color: '#0C4A6E', bg: '#E0F2FE' },

  // ── New subjects (linked from WAEC) ─────────────────────────────────────
  {
    id: 'further_maths',
    label: 'Further Mathematics',
    icon: '➗',
    color: '#1E40AF',
    bg: '#E0E7FF',
  },
  { id: 'crs', label: 'Christian Religious Studies', icon: '✝️', color: '#7C2D12', bg: '#FFEDD5' },
  { id: 'commerce', label: 'Commerce', icon: '🏪', color: '#0F766E', bg: '#CCFBF1' },
  { id: 'visual_arts', label: 'Visual Arts', icon: '🎨', color: '#BE185D', bg: '#FCE7F3' },
  {
    id: 'food_nutrition',
    label: 'Food and Nutrition',
    icon: '🍲',
    color: '#B91C1C',
    bg: '#FEE2E2',
  },
  { id: 'marketing', label: 'Marketing', icon: '📢', color: '#C2410C', bg: '#FFEDD5' },

  // ── Future subjects (ready for content upload) ───────────────────────────
  { id: 'digital_tech', label: 'Digital Technology', icon: '💻', color: '#1D4ED8', bg: '#DBEAFE' },
  {
    id: 'agric_science',
    label: 'Agricultural Science',
    icon: '🌱',
    color: '#15803D',
    bg: '#DCFCE7',
  },
  { id: 'citizenship', label: 'Citizenship', icon: '🪪', color: '#4338CA', bg: '#E0E7FF' },
];

// QB object keyed by subject ID
export const NECO_QB = {
  english: NECO_QB_ENGLISH,
  mathematics: NECO_QB_MATHEMATICS,
  physics: NECO_QB_PHYSICS,
  chemistry: NECO_QB_CHEMISTRY,
  biology: NECO_QB_BIOLOGY,
  economics: NECO_QB_ECONOMICS,
  government: NECO_QB_GOVERNMENT,
  literature: NECO_QB_LITERATURE,
  geography: NECO_QB_GEOGRAPHY,
};

// Learn content — full WAEC learn bank (covers all subjects NECO uses,
// including all newly added and future subjects)
export const NECO_LEARN = WAEC_LEARN;
