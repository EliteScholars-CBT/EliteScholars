// ============================================================================
// WAEC Learn Mode — Master index
// Topics organised by SS level but merged for the learn mode component
//
// NOTE: For newer subjects (further_maths, crs, visual_arts, food_nutrition,
// marketing, digital_tech, agric_science, citizenship), only SS1 files exist
// for now. SS2/SS3 imports and merges are commented out below — when those
// files are added, just uncomment the 3 matching lines per subject and the
// content picks up automatically.
// ============================================================================

import { WAEC_ENGLISH_LEARN_SS1 } from './ss1/english';
import { WAEC_ENGLISH_LEARN_SS2 } from './ss2/english';
import { WAEC_ENGLISH_LEARN_SS3 } from './ss3/english';
import { WAEC_MATHEMATICS_LEARN_SS1 } from './ss1/mathematics';
import { WAEC_MATHEMATICS_LEARN_SS2 } from './ss2/mathematics';
import { WAEC_MATHEMATICS_LEARN_SS3 } from './ss3/mathematics';
import { WAEC_PHYSICS_LEARN_SS1 } from './ss1/physics';
import { WAEC_PHYSICS_LEARN_SS2 } from './ss2/physics';
import { WAEC_PHYSICS_LEARN_SS3 } from './ss3/physics';
import { WAEC_CHEMISTRY_LEARN_SS1 } from './ss1/chemistry';
import { WAEC_CHEMISTRY_LEARN_SS2 } from './ss2/chemistry';
import { WAEC_CHEMISTRY_LEARN_SS3 } from './ss3/chemistry';
import { WAEC_BIOLOGY_LEARN_SS1 } from './ss1/biology';
import { WAEC_BIOLOGY_LEARN_SS2 } from './ss2/biology';
import { WAEC_BIOLOGY_LEARN_SS3 } from './ss3/biology';
import { WAEC_ECONOMICS_LEARN_SS1 } from './ss1/economics';
import { WAEC_ECONOMICS_LEARN_SS2 } from './ss2/economics';
import { WAEC_ECONOMICS_LEARN_SS3 } from './ss3/economics';
import { WAEC_GOVERNMENT_LEARN_SS1 } from './ss1/government';
import { WAEC_GOVERNMENT_LEARN_SS2 } from './ss2/government';
import { WAEC_GOVERNMENT_LEARN_SS3 } from './ss3/government';
import { WAEC_LITERATURE_LEARN_SS1 } from './ss1/literature';
import { WAEC_LITERATURE_LEARN_SS2 } from './ss2/literature';
import { WAEC_LITERATURE_LEARN_SS3 } from './ss3/literature';
import { WAEC_ACCOUNTING_LEARN_SS1 } from './ss1/accounting';
import { WAEC_ACCOUNTING_LEARN_SS2 } from './ss2/accounting';
import { WAEC_ACCOUNTING_LEARN_SS3 } from './ss3/accounting';
import { WAEC_GEOGRAPHY_LEARN_SS1 } from './ss1/geography';
import { WAEC_GEOGRAPHY_LEARN_SS2 } from './ss2/geography';
import { WAEC_GEOGRAPHY_LEARN_SS3 } from './ss3/geography';
import { WAEC_COMMERCE_LEARN_SS1 } from './ss1/commerce';
import { WAEC_COMMERCE_LEARN_SS2 } from './ss2/commerce';
import { WAEC_COMMERCE_LEARN_SS3 } from './ss3/commerce';
import { WAEC_CIVIC_LEARN_SS1 } from './ss1/civic';
import { WAEC_CIVIC_LEARN_SS2 } from './ss2/civic';
import { WAEC_CIVIC_LEARN_SS3 } from './ss3/civic';

// ── New subjects — SS1 only for now ──────────────────────────────────────
import { WAEC_FURTHER_MATHS_LEARN_SS1 } from './ss1/further_maths';
// import { WAEC_FURTHER_MATHS_LEARN_SS2 } from './ss2/further_maths';
// import { WAEC_FURTHER_MATHS_LEARN_SS3 } from './ss3/further_maths';

import { WAEC_CRS_LEARN_SS1 } from './ss1/crs';
// import { WAEC_CRS_LEARN_SS2 } from './ss2/crs';
// import { WAEC_CRS_LEARN_SS3 } from './ss3/crs';

import { WAEC_VISUAL_ARTS_LEARN_SS1 } from './ss1/visual_arts';
// import { WAEC_VISUAL_ARTS_LEARN_SS2 } from './ss2/visual_arts';
// import { WAEC_VISUAL_ARTS_LEARN_SS3 } from './ss3/visual_arts';

import { WAEC_FOOD_NUTRITION_LEARN_SS1 } from './ss1/food_nutrition';
// import { WAEC_FOOD_NUTRITION_LEARN_SS2 } from './ss2/food_nutrition';
// import { WAEC_FOOD_NUTRITION_LEARN_SS3 } from './ss3/food_nutrition';

import { WAEC_MARKETING_LEARN_SS1 } from './ss1/marketing';
// import { WAEC_MARKETING_LEARN_SS2 } from './ss2/marketing';
// import { WAEC_MARKETING_LEARN_SS3 } from './ss3/marketing';

// ── Future subjects — SS1 only for now ───────────────────────────────────
import { WAEC_DIGITAL_TECH_LEARN_SS1 } from './ss1/digital_tech';
// import { WAEC_DIGITAL_TECH_LEARN_SS2 } from './ss2/digital_tech';
// import { WAEC_DIGITAL_TECH_LEARN_SS3 } from './ss3/digital_tech';

import { WAEC_AGRIC_SCIENCE_LEARN_SS1 } from './ss1/agric_science';
// import { WAEC_AGRIC_SCIENCE_LEARN_SS2 } from './ss2/agric_science';
// import { WAEC_AGRIC_SCIENCE_LEARN_SS3 } from './ss3/agric_science';

import { WAEC_CITIZENSHIP_LEARN_SS1 } from './ss1/citizenship';
// import { WAEC_CITIZENSHIP_LEARN_SS2 } from './ss2/citizenship';
// import { WAEC_CITIZENSHIP_LEARN_SS3 } from './ss3/citizenship';

// Merged learn content keyed by subject ID
export const WAEC_LEARN = {
  english: [...WAEC_ENGLISH_LEARN_SS1, ...WAEC_ENGLISH_LEARN_SS2, ...WAEC_ENGLISH_LEARN_SS3],
  mathematics: [
    ...WAEC_MATHEMATICS_LEARN_SS1,
    ...WAEC_MATHEMATICS_LEARN_SS2,
    ...WAEC_MATHEMATICS_LEARN_SS3,
  ],
  physics: [...WAEC_PHYSICS_LEARN_SS1, ...WAEC_PHYSICS_LEARN_SS2, ...WAEC_PHYSICS_LEARN_SS3],
  chemistry: [
    ...WAEC_CHEMISTRY_LEARN_SS1,
    ...WAEC_CHEMISTRY_LEARN_SS2,
    ...WAEC_CHEMISTRY_LEARN_SS3,
  ],
  biology: [...WAEC_BIOLOGY_LEARN_SS1, ...WAEC_BIOLOGY_LEARN_SS2, ...WAEC_BIOLOGY_LEARN_SS3],
  economics: [
    ...WAEC_ECONOMICS_LEARN_SS1,
    ...WAEC_ECONOMICS_LEARN_SS2,
    ...WAEC_ECONOMICS_LEARN_SS3,
  ],
  government: [
    ...WAEC_GOVERNMENT_LEARN_SS1,
    ...WAEC_GOVERNMENT_LEARN_SS2,
    ...WAEC_GOVERNMENT_LEARN_SS3,
  ],
  literature: [
    ...WAEC_LITERATURE_LEARN_SS1,
    ...WAEC_LITERATURE_LEARN_SS2,
    ...WAEC_LITERATURE_LEARN_SS3,
  ],
  accounting: [
    ...WAEC_ACCOUNTING_LEARN_SS1,
    ...WAEC_ACCOUNTING_LEARN_SS2,
    ...WAEC_ACCOUNTING_LEARN_SS3,
  ],
  geography: [
    ...WAEC_GEOGRAPHY_LEARN_SS1,
    ...WAEC_GEOGRAPHY_LEARN_SS2,
    ...WAEC_GEOGRAPHY_LEARN_SS3,
  ],
  commerce: [...WAEC_COMMERCE_LEARN_SS1, ...WAEC_COMMERCE_LEARN_SS2, ...WAEC_COMMERCE_LEARN_SS3],
  civic: [...WAEC_CIVIC_LEARN_SS1, ...WAEC_CIVIC_LEARN_SS2, ...WAEC_CIVIC_LEARN_SS3],

  // ── New subjects — SS1 only for now; uncomment SS2/SS3 spreads below
  // once those files exist (and uncomment the matching imports above) ──────
  further_maths: [
    ...WAEC_FURTHER_MATHS_LEARN_SS1,
    // ...WAEC_FURTHER_MATHS_LEARN_SS2,
    // ...WAEC_FURTHER_MATHS_LEARN_SS3,
  ],
  crs: [
    ...WAEC_CRS_LEARN_SS1,
    // ...WAEC_CRS_LEARN_SS2,
    // ...WAEC_CRS_LEARN_SS3,
  ],
  visual_arts: [
    ...WAEC_VISUAL_ARTS_LEARN_SS1,
    // ...WAEC_VISUAL_ARTS_LEARN_SS2,
    // ...WAEC_VISUAL_ARTS_LEARN_SS3,
  ],
  food_nutrition: [
    ...WAEC_FOOD_NUTRITION_LEARN_SS1,
    // ...WAEC_FOOD_NUTRITION_LEARN_SS2,
    // ...WAEC_FOOD_NUTRITION_LEARN_SS3,
  ],
  marketing: [
    ...WAEC_MARKETING_LEARN_SS1,
    // ...WAEC_MARKETING_LEARN_SS2,
    // ...WAEC_MARKETING_LEARN_SS3,
  ],

  // ── Future subjects — SS1 only for now ───────────────────────────────────
  digital_tech: [
    ...WAEC_DIGITAL_TECH_LEARN_SS1,
    // ...WAEC_DIGITAL_TECH_LEARN_SS2,
    // ...WAEC_DIGITAL_TECH_LEARN_SS3,
  ],
  agric_science: [
    ...WAEC_AGRIC_SCIENCE_LEARN_SS1,
    // ...WAEC_AGRIC_SCIENCE_LEARN_SS2,
    // ...WAEC_AGRIC_SCIENCE_LEARN_SS3,
  ],
  citizenship: [
    ...WAEC_CITIZENSHIP_LEARN_SS1,
    // ...WAEC_CITIZENSHIP_LEARN_SS2,
    // ...WAEC_CITIZENSHIP_LEARN_SS3,
  ],
};

// Per-level access (for future SS-level filtering)
export const WAEC_LEARN_BY_LEVEL = {
  ss1: {
    english: WAEC_ENGLISH_LEARN_SS1,
    mathematics: WAEC_MATHEMATICS_LEARN_SS1,
    physics: WAEC_PHYSICS_LEARN_SS1,
    chemistry: WAEC_CHEMISTRY_LEARN_SS1,
    biology: WAEC_BIOLOGY_LEARN_SS1,
    economics: WAEC_ECONOMICS_LEARN_SS1,
    government: WAEC_GOVERNMENT_LEARN_SS1,
    literature: WAEC_LITERATURE_LEARN_SS1,
    accounting: WAEC_ACCOUNTING_LEARN_SS1,
    geography: WAEC_GEOGRAPHY_LEARN_SS1,
    commerce: WAEC_COMMERCE_LEARN_SS1,
    civic: WAEC_CIVIC_LEARN_SS1,
    further_maths: WAEC_FURTHER_MATHS_LEARN_SS1,
    crs: WAEC_CRS_LEARN_SS1,
    visual_arts: WAEC_VISUAL_ARTS_LEARN_SS1,
    food_nutrition: WAEC_FOOD_NUTRITION_LEARN_SS1,
    marketing: WAEC_MARKETING_LEARN_SS1,
    digital_tech: WAEC_DIGITAL_TECH_LEARN_SS1,
    agric_science: WAEC_AGRIC_SCIENCE_LEARN_SS1,
    citizenship: WAEC_CITIZENSHIP_LEARN_SS1,
  },
  ss2: {
    english: WAEC_ENGLISH_LEARN_SS2,
    mathematics: WAEC_MATHEMATICS_LEARN_SS2,
    physics: WAEC_PHYSICS_LEARN_SS2,
    chemistry: WAEC_CHEMISTRY_LEARN_SS2,
    biology: WAEC_BIOLOGY_LEARN_SS2,
    economics: WAEC_ECONOMICS_LEARN_SS2,
    government: WAEC_GOVERNMENT_LEARN_SS2,
    literature: WAEC_LITERATURE_LEARN_SS2,
    accounting: WAEC_ACCOUNTING_LEARN_SS2,
    geography: WAEC_GEOGRAPHY_LEARN_SS2,
    commerce: WAEC_COMMERCE_LEARN_SS2,
    civic: WAEC_CIVIC_LEARN_SS2,
    // New/future subjects have no SS2 file yet — left empty
    further_maths: [],
    crs: [],
    visual_arts: [],
    food_nutrition: [],
    marketing: [],
    digital_tech: [],
    agric_science: [],
    citizenship: [],
  },
  ss3: {
    english: WAEC_ENGLISH_LEARN_SS3,
    mathematics: WAEC_MATHEMATICS_LEARN_SS3,
    physics: WAEC_PHYSICS_LEARN_SS3,
    chemistry: WAEC_CHEMISTRY_LEARN_SS3,
    biology: WAEC_BIOLOGY_LEARN_SS3,
    economics: WAEC_ECONOMICS_LEARN_SS3,
    government: WAEC_GOVERNMENT_LEARN_SS3,
    literature: WAEC_LITERATURE_LEARN_SS3,
    accounting: WAEC_ACCOUNTING_LEARN_SS3,
    geography: WAEC_GEOGRAPHY_LEARN_SS3,
    commerce: WAEC_COMMERCE_LEARN_SS3,
    civic: WAEC_CIVIC_LEARN_SS3,
    // New/future subjects have no SS3 file yet — left empty
    further_maths: [],
    crs: [],
    visual_arts: [],
    food_nutrition: [],
    marketing: [],
    digital_tech: [],
    agric_science: [],
    citizenship: [],
  },
};
