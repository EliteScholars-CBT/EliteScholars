// UNN.js - University of Nigeria, Nsukka
// Post UTME Questions 2005-2008
// Subjects: Mathematics, English, Government, CRS, Literature, Economics

export const UNN = {
  mathematics: [
    {
      yr: 2005,
      university: "UNN",
      q: "Find n if 314₁₀ - 256₇ = 340ₙ",
      o: ["7", "8", "9", "10"],
      a: 0,
      e: "Convert 256₇ to base 10: 2×7² + 5×7 + 6 = 98+35+6=139. 314 - 139 = 175. Convert 175 to base n where 340ₙ = 3n² + 4n = 175 → 3n²+4n-175=0 → n=7.",
      full: "The correct answer is A (7). First convert 256₇ to base 10: 2×7² = 2×49 = 98, 5×7 = 35, plus 6 = 139. Then 314 - 139 = 175. The number 340ₙ means 3×n² + 4×n + 0 = 3n² + 4n. Set this equal to 175: 3n² + 4n = 175 → 3n² + 4n - 175 = 0. Solve using quadratic formula or factoring: (3n + 25)(n - 7) = 0 → n = 7 or n = -25/3. Since n must be positive and greater than the digits (0-6 for base 7), n = 7 is the answer. Understanding number base conversion is essential for solving such problems.",
      h: "Convert to base 10, solve quadratic equation"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "What is the difference between 1.867551 correct to four significant figures and 1.867551 correct to four decimal places?",
      o: ["5×10⁻³", "4×10⁻⁴", "5×10⁻⁴", "10×10⁻³"],
      a: 1,
      e: "1.867551 to 4 s.f. = 1.868. To 4 d.p. = 1.8676. Difference = 0.0004 = 4×10⁻⁴.",
      full: "The correct answer is B (4×10⁻⁴). Rounding to four significant figures: 1.867551 - look at the first four digits (1.867) then the next digit is 5, so we round up: 1.868. Rounding to four decimal places: 1.867551 - look at the fourth decimal place (position 4: 1.8675) then the next digit is 5, so round up: 1.8676. The difference: 1.8676 - 1.8680 = -0.0004. Absolute difference = 0.0004 = 4×10⁻⁴. Option A (5×10⁻³ = 0.005) is too large. Option C (5×10⁻⁴ = 0.0005) is close but incorrect. Option D (10×10⁻³ = 0.01) is much larger. Understanding significant figures and decimal places is crucial for scientific measurement and reporting.",
      h: "Significant figures: count all non-zero digits; decimal places: count after decimal point"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "In an examination, all the candidates offered at least one of English and French. If 52% offered French and 65% offered English, what percentage offered French only?",
      o: ["17%", "35%", "48%", "45%"],
      a: 1,
      e: "Let x = % offering both. Then (52-x) + x + (65-x) = 100 → 117 - x = 100 → x = 17%. French only = 52% - 17% = 35%.",
      full: "The correct answer is B (35%). This is a Venn diagram problem. Total = 100%. Let the percentage offering both subjects be x. Then: French only = 52% - x, English only = 65% - x, Both = x. Sum = (52-x) + (65-x) + x = 117 - x = 100. Therefore x = 17%. French only = 52% - 17% = 35%. Option A (17%) is the percentage offering both subjects. Option C (48%) is too high. Option D (45%) is incorrect. This type of problem is common in set theory and probability. Understanding how to use inclusion-exclusion principle (|A∪B| = |A| + |B| - |A∩B|) is key: 100 = 52 + 65 - x → x = 17, then French only = 52 - 17 = 35.",
      h: "French only = French total - both"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Simplify (6x³+5x²-8x-3)/(2x²+x-3)",
      o: ["3x-1", "1-3x", "3x+1", "-(3x-1)"],
      a: 2,
      e: "Perform polynomial long division: quotient = 3x + 1 with remainder 0.",
      full: "The correct answer is C (3x+1). Perform polynomial long division: Divide the leading term 6x³ by 2x² to get 3x. Multiply (2x²+x-3) by 3x: 6x³+3x²-9x. Subtract from the original: (6x³+5x²-8x-3) - (6x³+3x²-9x) = 2x²+x-3. Now divide 2x² by 2x² to get 1. Multiply (2x²+x-3) by 1: 2x²+x-3. Subtract to get remainder 0. So quotient = 3x+1. Option A (3x-1) would give a different remainder. Option B (1-3x) is negative. Option D (-(3x-1)) = -3x+1. Factoring the denominator: 2x²+x-3 = (2x+3)(x-1). The numerator factors to (2x+3)(x-1)(3x+1). Canceling gives 3x+1. Understanding polynomial division is essential for simplifying rational expressions.",
      h: "Factor numerator and denominator, cancel common factors"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Find the range of values of x satisfying the inequalities 2x-5 < 7 and 25+2x > 15",
      o: ["5 < x < 6", "-5 < x < 6", "-6 < x < 5", "-6 < x < -5"],
      a: 1,
      e: "First: 2x-5 < 7 → x < 6. Second: 25+2x > 15 → x > -5. Combined: -5 < x < 6.",
      full: "The correct answer is B (-5 < x < 6). Solve each inequality separately: 2x - 5 < 7 → add 5 to both sides: 2x < 12 → divide by 2: x < 6. 25 + 2x > 15 → subtract 25: 2x > -10 → divide by 2: x > -5. Combine both conditions: x must satisfy both x < 6 AND x > -5. This gives the compound inequality -5 < x < 6. Option A (5 < x < 6) uses the wrong boundary (5 instead of -5). Option C (-6 < x < 5) has reversed boundaries. Option D (-6 < x < -5) is a different interval entirely. Understanding how to solve linear inequalities and combine them using 'and' (intersection) is fundamental to algebra.",
      h: "Solve each inequality separately, then combine with 'and'"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "If the 8th term of an A.P is three times the second term and the sum of the first three terms is 18, find the first term of the A.P.",
      o: ["4", "2", "8", "3"],
      a: 0,
      e: "U₈ = a+7d, U₂ = a+d. a+7d = 3(a+d) → 2d = a. S₃ = 3(a+d)=18 → a+d=6. Substitute a=2d: 2d+d=6 → d=2, a=4.",
      full: "The correct answer is A (4). Let the first term be a and common difference be d. The nth term of an AP is a + (n-1)d. So U₈ = a+7d and U₂ = a+d. Given U₈ = 3×U₂: a+7d = 3(a+d) → a+7d = 3a+3d → 7d-3d = 3a-a → 4d = 2a → 2d = a. Sum of first three terms: S₃ = 3/2[2a + (3-1)d] = 3/2[2a+2d] = 3(a+d) = 18. So a+d = 6. Substitute a = 2d: 2d + d = 6 → 3d = 6 → d = 2. Then a = 2d = 4. Option B (2) is incorrect. Option C (8) is too high. Option D (3) is close but wrong. Understanding arithmetic progressions and their properties is essential for sequence problems.",
      h: "Use AP formulas: Uₙ = a+(n-1)d, Sₙ = n/2[2a+(n-1)d]"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Find the sum to infinity of the series 4 + 3 + 9/4 + 27/16 + ...",
      o: ["16", "16/3", "1", "8"],
      a: 0,
      e: "GP: a=4, r=3/4. Sum to infinity = a/(1-r) = 4/(1-0.75) = 16.",
      full: "The correct answer is A (16). Identify the series: 4, 3, 9/4, 27/16,... Check ratios: 3/4 = 0.75, (9/4)/3 = 9/12 = 3/4, (27/16)/(9/4) = (27/16)×(4/9) = 108/144 = 3/4. So common ratio r = 3/4, which is between -1 and 1, so the sum to infinity exists. First term a = 4. Sum to infinity S∞ = a/(1-r) = 4/(1 - 3/4) = 4/(1/4) = 16. Option B (16/3 ≈ 5.33) would be for a=4, r=1/4. Option C (1) is too small. Option D (8) is half of the correct answer. Understanding geometric progressions and the condition for convergence (|r|<1) is crucial.",
      h: "S∞ = a/(1-r) for |r| < 1"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "A chord of a circle of radius 10cm is drawn 8cm from the centre of the circle. Find the length of the chord.",
      o: ["6cm", "2√14 cm", "12cm", "√41 cm"],
      a: 2,
      e: "Half-chord = √(r² - d²) = √(100 - 64) = 6cm. Full chord = 12cm.",
      full: "The correct answer is C (12cm). For a circle, the perpendicular from the center to a chord bisects the chord. The distance from the center to the chord (d) is 8cm, and the radius (r) is 10cm. Half the chord length (x) satisfies x² + d² = r² (Pythagorean theorem). So x² = r² - d² = 100 - 64 = 36, so x = 6cm. The full chord length is 2x = 12cm. Option A (6cm) is only half the chord. Option B (2√14 ≈ 7.48cm) is incorrect. Option D (√41 ≈ 6.4cm) is incorrect. Understanding circle geometry and the relationship between radius, chord, and perpendicular distance is important for solving such problems.",
      h: "Chord length = 2√(r² - d²), where d = distance from center"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Find the equation of the line which passes through (-2,1) and is perpendicular to the line 4x - 2y + 1 = 0",
      o: ["2y - x - 4 = 0", "2y + x = 0", "2y - x = 0", "y - 2x - 5 = 0"],
      a: 1,
      e: "Given line slope m₁=2, perpendicular slope m₂=-1/2. Through (-2,1): y-1 = -½(x+2) → 2y + x = 0.",
      full: "The correct answer is B (2y + x = 0). First, find the slope of the given line: 4x - 2y + 1 = 0 → -2y = -4x - 1 → y = 2x + 0.5. So slope m₁ = 2. For perpendicular lines, m₁×m₂ = -1, so m₂ = -1/2. The required line passes through (-2,1). Using point-slope form: y - y₁ = m(x - x₁) → y - 1 = -½(x - (-2)) = -½(x + 2). Multiply both sides by 2: 2y - 2 = -(x + 2) = -x - 2. So 2y - 2 = -x - 2 → 2y = -x → 2y + x = 0. Option A (2y - x - 4 = 0) has slope 1/2, not perpendicular. Option C (2y - x = 0) has slope 1/2. Option D (y - 2x - 5 = 0) has slope 2, which is parallel, not perpendicular. Understanding slope relationships and line equations is fundamental.",
      h: "Perpendicular slopes: m₁×m₂ = -1"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The distribution below shows the scores of sixty students in a class test. What percentage of the students scored at least 3? (Score: 0,1,2,3,4,5; Frequency: 2,8,14,16,12,8)",
      o: ["60%", "36%", "66%", "40%"],
      a: 0,
      e: "Students scoring ≥3 = 16+12+8 = 36. Percentage = 36/60 × 100% = 60%.",
      full: "The correct answer is A (60%). Total students = sum of frequencies = 2+8+14+16+12+8 = 60. Students scoring at least 3 (score ≥ 3) are those with scores 3, 4, and 5: frequencies 16 + 12 + 8 = 36. Percentage = (36/60) × 100% = 60%. Option B (36%) is the actual count, not the percentage. Option C (66%) is too high. Option D (40%) would be for 24 students. Understanding how to calculate percentages from frequency distributions is essential for data analysis.",
      h: "Percentage = (number meeting condition ÷ total) × 100%"
    }
  ],

  english: [
    {
      yr: 2005,
      university: "UNN",
      q: "I am intent _____ continuing my course.",
      o: ["on", "with", "as", "to", "at"],
      a: 0,
      e: "Intent on is the correct prepositional phrase.",
      full: "The correct phrase is 'intent on', meaning determined to do something. 'Intent on continuing' is standard English. The other prepositions do not form this idiomatic expression. Option A is correct.",
      h: "Intent on = determined to"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Elemi's sagacity contrasted sharply with his friend's _____.",
      o: ["Timidity", "Wisdom", "Fluency", "Foolishness"],
      a: 3,
      e: "Sagacity (wisdom) opposite is foolishness.",
      full: "Sagacity means wisdom, good judgment, and intelligence. The contrast would be with its opposite—foolishness. 'Timidity' means shyness, 'fluency' means eloquence, 'wisdom' is a synonym. Option D is correct.",
      h: "Sagacity ↔ foolishness"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Some people keep ferocious animals as pets.",
      o: ["Gentle", "Wild", "Fierce", "Domestic"],
      a: 0,
      e: "Ferocious (fierce) opposite is gentle.",
      full: "Ferocious means savagely fierce, cruel, or violent. The opposite would be gentle. 'Wild' is similar, 'fierce' is a synonym, 'domestic' means tame but not direct opposite. Option A is correct.",
      h: "Ferocious ↔ gentle"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Every visitor to Calabar must visit where photographs and artifacts of early European colonial presence in Nigeria are kept.",
      o: ["Archives", "Ranch", "Market", "Museum"],
      a: 3,
      e: "Museums preserve historical artifacts and photographs.",
      full: "A museum collects, preserves, and displays historical artifacts and photographs. Archives primarily store documents. A ranch is for livestock, a market for trading. Option D is correct.",
      h: "Museum = artifacts + photos"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Ebier's generosity turned out to be her Achilles' heel.",
      o: ["Strong point", "Favourite habit", "Weak point", "Less popular virtue"],
      a: 2,
      e: "Achilles' heel means a weakness or vulnerable point.",
      full: "The idiom 'Achilles' heel' refers to a person's point of weakness or vulnerability. In Greek mythology, Achilles was invulnerable except for his heel. Here, generosity became her weakness. Option C is correct.",
      h: "Achilles' heel = weakness"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The giant hydro-electric project is among the _____ of colonial rule in Southern Africa.",
      o: ["Inheritance", "Remnants", "Legacies", "Evidence"],
      a: 2,
      e: "Legacies are things handed down from the past.",
      full: "A 'legacy' is something handed down from the past. Hydro-electric projects built during colonial times are legacies of colonial rule. Option C is correct.",
      h: "Legacies = things from the past"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Ukpabio is proficient _____ tailoring.",
      o: ["With", "In", "Of", "At"],
      a: 1,
      e: "Proficient in is the correct preposition.",
      full: "The adjective 'proficient' is followed by 'in' when referring to a skill or field. 'Proficient in tailoring' is correct. Option B is correct.",
      h: "Proficient in (a skill)"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The demonstration was organized by hoodlums.",
      o: ["Criminals", "Activists", "Thugs", "Soldiers"],
      a: 1,
      e: "Hoodlums (thugs) opposite is activists (peaceful protesters).",
      full: "The question asks for opposite meaning. 'Hoodlums' refers to violent criminals or thugs. The opposite would be peaceful 'activists'. Option B is correct.",
      h: "Hoodlums ↔ activists"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The plaintiff convinced the court that the murder was inadvertent.",
      o: ["Brutal", "Wicked", "Careless", "Premeditated"],
      a: 3,
      e: "Inadvertent (unintentional) opposite is premeditated (planned).",
      full: "Inadvertent means unintentional, accidental. The opposite is 'premeditated'—planned in advance. Option D is correct.",
      h: "Inadvertent ↔ premeditated"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The bush burning festival will further _____ our forest resource.",
      o: ["Increase", "Reduce", "Deplete", "Remove"],
      a: 2,
      e: "Bush burning depletes forest resources.",
      full: "Bush burning destroys vegetation and reduces forest resources. 'Deplete' means to reduce in quantity or use up. Option C is correct.",
      h: "Deplete = use up/destroy"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "You are driving too fast for safety.",
      o: ["That speed is all right and safe", "That speed is not fast enough for safety", "That speed is not entirely safe", "You should drive faster to ensure safety"],
      a: 2,
      e: "The statement warns that the speed exceeds safe limits.",
      full: "The sentence means the driver is exceeding a safe speed. The speed is 'not entirely safe' because it could lead to accidents. Option C correctly captures this meaning.",
      h: "Too fast = not safe"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "For all I care, the man may be dead.",
      o: ["I am not sure that the man is dead", "I am not interested in his death", "I very much care in case he is dead", "I am ignorant of the man's death"],
      a: 1,
      e: "For all I care means I don't care at all.",
      full: "The idiom 'for all I care' expresses complete indifference. The speaker doesn't care whether the man is dead or alive. Option B captures this meaning of disinterest.",
      h: "For all I care = I don't care"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The priest was invited to consecrate the new building.",
      o: ["destroy", "abuse", "tarnish", "pollute"],
      a: 0,
      e: "Consecrate means to make holy; opposite is desecrate/destroy.",
      full: "To consecrate means to declare something sacred. The opposite would be to desecrate, destroy, or defile. 'Destroy' is the closest antonym among options. Option A is correct.",
      h: "Consecrate ↔ destroy"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "A majority of those who sat for the last JAMB examination are sanguine of success.",
      o: ["hopeful", "unsure", "pessimistic", "disheartened"],
      a: 2,
      e: "Sanguine means optimistic; opposite is pessimistic.",
      full: "Sanguine means confidently optimistic and hopeful. The opposite is 'pessimistic' (expecting the worst). Option C is correct.",
      h: "Sanguine ↔ pessimistic"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "When we woke up this morning, the sky was overcast.",
      o: ["cloudy", "clear", "shiny", "brilliant"],
      a: 1,
      e: "Overcast means covered with clouds; opposite is clear.",
      full: "Overcast means the sky is fully covered with clouds, blocking sunlight. The opposite would be 'clear' (no clouds). Option B is correct.",
      h: "Overcast ↔ clear"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Enemies of progress covertly strive to undermine the efforts of this administration.",
      o: ["secretly", "boldly", "consistently", "overtly"],
      a: 3,
      e: "Covertly means secretly; opposite is overtly (openly).",
      full: "Covertly means in a hidden, secret manner. The opposite is 'overtly' (openly, publicly). Option D is correct.",
      h: "Covertly ↔ overtly"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The boy is constantly under the _____ that he is the best student in the class.",
      o: ["elusion", "delusion", "illusion", "allusion"],
      a: 1,
      e: "Delusion is a false belief held despite evidence.",
      full: "A 'delusion' is a persistent false belief that contradicts reality. The boy falsely believes he is the best student. 'Illusion' is a misperception of something real. Option B is correct.",
      h: "Delusion = false belief"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Her parents did not approve of her marriage two years ago because she had not reached her _____.",
      o: ["maturity", "puberty", "majority", "minority"],
      a: 2,
      e: "Majority means legal adulthood (usually 18).",
      full: "In legal terms, 'majority' refers to the age at which a person is legally considered an adult. She had not reached the age of majority. Option C is correct.",
      h: "Majority = legal adulthood"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Our teacher _____ the importance of reading over our work before submission.",
      o: ["emphasized on", "emphasized", "layed emphasis on", "put emphasis"],
      a: 1,
      e: "Emphasized is used without a preposition.",
      full: "The verb 'emphasize' is transitive and does not require a preposition. 'Emphasized the importance' is correct. Option B is correct.",
      h: "Emphasize (no 'on')"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Young men should not get mixed _____ politics.",
      o: ["in with", "up with", "up in", "on with"],
      a: 2,
      e: "Mixed up in politics means involved in.",
      full: "The idiom is 'get mixed up in' meaning to become involved in (often with negative connotation). 'Mixed up in politics' is correct. Option C is correct.",
      h: "Mixed up in = involved in"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Much to his chagrin, he did not win the race.",
      o: ["stupefaction", "disappointment", "shock", "surprise"],
      a: 1,
      e: "Chagrin means disappointment or annoyance.",
      full: "Chagrin is a feeling of distress or humiliation caused by failure or disappointment. 'Disappointment' is the closest synonym. Option B is correct.",
      h: "Chagrin = disappointment"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Traditional rulers are not supposed to be involved in partisan politics.",
      o: ["dirty", "party", "modern", "surprise"],
      a: 1,
      e: "Partisan means supporting a particular party.",
      full: "Partisan politics means politics aligned with a specific political party. 'Party' politics is the closest meaning. Option B is correct.",
      h: "Partisan = party-aligned"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Mr. Adamu is a dominant partner in our business.",
      o: ["a prominent", "an important", "an outstanding", "an influential"],
      a: 1,
      e: "Dominant means most important or influential.",
      full: "Dominant means having power and influence over others. 'Important' captures this meaning. 'Prominent' and 'outstanding' are also close, but 'important' is the best fit. Option B is correct.",
      h: "Dominant = important/influential"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The patient disregarded the advice of the doctor.",
      o: ["Ignored", "disobeyed", "questioned", "respected"],
      a: 0,
      e: "Disregarded means paid no attention to, ignored.",
      full: "To disregard means to ignore or pay no attention to something. 'Ignored' is the direct synonym. Option A is correct.",
      h: "Disregarded = ignored"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The lawyer pleaded with the judge to _____ justice with mercy.",
      o: ["temper", "temper", "tamper", "taper"],
      a: 0,
      e: "Temper justice with mercy means moderate justice with mercy.",
      full: "The idiom is 'temper justice with mercy' meaning to moderate or balance strict justice with compassion. 'Temper' means to moderate or soften. Option A is correct.",
      h: "Temper justice with mercy"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "So far, no _____ drug has been discovered as a cure for the AIDS disease.",
      o: ["effected", "efficient", "efficacious", "effectual"],
      a: 2,
      e: "Efficacious means effective in producing a desired result.",
      full: "Efficacious means capable of producing the intended result (especially for medicines). 'Efficacious drug' is the correct term. Option C is correct.",
      h: "Efficacious = effective (medicine)"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The student leaders were _____ punished.",
      o: ["unduly", "unduly", "unduly", "unduly"],
      a: 0,
      e: "Unduly means excessively or inappropriately.",
      full: "All options appear identical. 'Unduly' means excessively or more than is appropriate. Option A is correct by default.",
      h: "Unduly = excessively"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Choose the word that has the same consonant sound as 'vision'.",
      o: ["Mansion", "Profession", "Cession", "Precision"],
      a: 3,
      e: "Vision has /ʒ/ sound; precision has same /ʒ/.",
      full: "The 's' in 'vision' is pronounced /ʒ/. 'Precision' also has the /ʒ/ sound (pre-ci-zhun). 'Mansion', 'profession', 'cession' have /ʃ/ (sh sound). Option D is correct.",
      h: "Vision and precision share /ʒ/"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Choose the word that has the same consonant sound as 'chair'.",
      o: ["Chancellor", "Chiffon", "Chalet", "Champaign"],
      a: 0,
      e: "Chair has /tʃ/ sound; chancellor has same.",
      full: "'Chair' begins with the /tʃ/ sound (like 'church'). 'Chancellor' also begins with /tʃ/. 'Chiffon', 'chalet', 'champaign' have /ʃ/ (sh sound from French origin). Option A is correct.",
      h: "Chair = /tʃ/ sound"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The secretary enjoys travelling AT NIGHT. (Emphatic stress on AT NIGHT)",
      o: ["Did the secretary enjoy travelling by day?", "Does the secretary enjoy travelling by day?", "Who enjoys travelling by night?", "Does the secretary hate travelling at night?"],
      a: 1,
      e: "Stress on AT NIGHT contrasts with 'by day'.",
      full: "If 'AT NIGHT' is emphasized, the implied contrast is with travelling during the day. The question 'Does the secretary enjoy travelling by day?' would be answered 'No, he enjoys travelling AT NIGHT.' Option B is correct.",
      h: "Stress on time → contrast with other time"
    }
  ],

  government: [
    {
      yr: 2005,
      university: "UNN",
      q: "In the British parliamentary system of government, the monarch can be referred to as the _____.",
      o: ["Queen in parliament", "Queen and parliament", "Queen's parliament", "Queen's assembly"],
      a: 0,
      e: "The monarch is part of Parliament (Queen-in-Parliament).",
      full: "In the British system, the Crown is an integral part of Parliament. The term 'Queen-in-Parliament' (or King-in-Parliament) refers to the monarch acting with the advice and consent of Parliament. Option A is correct.",
      h: "Queen-in-Parliament = monarch + Parliament"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "In Nigeria, representation of state in the upper house is based on _____.",
      o: ["population", "ethnicity", "equity", "equality"],
      a: 3,
      e: "Each state has equal representation (3 senators) regardless of size/population.",
      full: "The Nigerian Senate (upper house) gives each state equal representation—3 senators per state, plus 1 for FCT. This is based on equality of states, not population. Option D is correct.",
      h: "Senate = equal per state (3 senators)"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Conditions for forming a federation do not include one of these:",
      o: ["small population", "diverse ethnic groups", "geographical nearness", "fear of domination"],
      a: 0,
      e: "Small population is not a condition for federalism.",
      full: "Federalism often arises from diverse ethnic groups wanting unity but fearing domination by larger groups, and geographical proximity. Small population is not a necessary condition. Option A is correct.",
      h: "Small population ≠ federalism requirement"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "A written constitution must contain a _____.",
      o: ["dialogue", "discourse", "preamble", "summary"],
      a: 2,
      e: "A preamble is an introductory statement in constitutions.",
      full: "Most written constitutions begin with a preamble—an introductory statement explaining the document's philosophy, objectives, and authority. Option C is correct.",
      h: "Preamble = constitution introduction"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Voting in elections in Nigeria is limited to ages",
      o: ["21 and above", "20 and above", "19 and above", "18 and above"],
      a: 3,
      e: "The voting age in Nigeria is 18.",
      full: "The 1999 Constitution of Nigeria sets the minimum voting age at 18 years. Option D is correct.",
      h: "Voting age = 18"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Public opinion can function better under _____.",
      o: ["democratic government", "dictatorial regime", "despotic regime", "military regime"],
      a: 0,
      e: "Democracy allows free expression of public opinion.",
      full: "Public opinion thrives where there is freedom of speech, assembly, and press—characteristics of democratic government. Dictatorships suppress or manipulate public opinion. Option A is correct.",
      h: "Democracy = free public opinion"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "In pre-colonial Nigeria, the northern emir did not use one of these as his head official:",
      o: ["the Talakawa", "the Waziri", "the Galadima", "the Madawaki"],
      a: 0,
      e: "Talakawa refers to common people, not an official title.",
      full: "The Talakawa were the commoners/subjects, not an official. The Waziri (chief adviser), Galadima (territorial administrator), and Madawaki (military leader) were key emirate officials. Option A is correct.",
      h: "Talakawa = common people (not official)"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The main motive of the imperialist penetration was to _____.",
      o: ["educate", "Christianise", "trade", "socialize"],
      a: 2,
      e: "Economic motives (trade, resources) drove imperialism.",
      full: "While missionaries educated/Christianized and some argued civilizing missions, the primary motive for imperialist expansion was economic—trade, raw materials, markets. Option C is correct.",
      h: "Imperialism = trade/resources"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The 1963 constitution in Nigeria is known as the _____.",
      o: ["presidential constitution", "independence constitution", "republican constitution", "federal constitution"],
      a: 2,
      e: "The 1963 Constitution made Nigeria a republic.",
      full: "The 1963 Constitution replaced the Queen with a President as Head of State, making Nigeria a republic within the Commonwealth. It is called the Republican Constitution. Option C is correct.",
      h: "1963 = Republican Constitution"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The national security commission is chaired by the",
      o: ["Chief Justice of the Federation", "President of the Federal Republic of Nigeria", "Inspector-General of Police", "President of the Senate"],
      a: 2,
      e: "The Inspector-General of Police chairs the National Security Commission.",
      full: "The National Security Commission (now National Security Council) includes the IGP as a key member, often chairing security coordination meetings at operational levels. Option C is correct.",
      h: "IGP chairs security commission"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Matters of which the federal government alone can legislate are called",
      o: ["exclusive list", "concurrent list", "residual list", "inclusive list"],
      a: 0,
      e: "The Exclusive List contains matters only federal government can legislate on.",
      full: "In Nigeria's federal system, the Exclusive Legislative List contains items (defense, currency, foreign affairs) on which only the National Assembly can make laws. Option A is correct.",
      h: "Exclusive List = only federal laws"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Regulations made by a local government are called _____.",
      o: ["laws", "bills", "bye-laws", "issuances"],
      a: 2,
      e: "Local government regulations are called bye-laws.",
      full: "Local governments make 'bye-laws'—regulations that apply within their jurisdiction on matters assigned to them. These must not conflict with state or federal laws. Option C is correct.",
      h: "Bye-laws = local regulations"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "One most important achievement of the military _____.",
      o: ["creation of states", "diminution of corruption", "preserving Nigerian unity", "decongesting the ports"],
      a: 2,
      e: "The military preserved Nigerian unity during the Civil War.",
      full: "The military's most significant achievement was preserving Nigeria's unity during the 1967-1970 Civil War, preventing secession. Option C is correct.",
      h: "Military = preserved unity"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "One of these is not necessary for a dynamic foreign policy?",
      o: ["political stability", "military capability", "mass party", "economic stability"],
      a: 2,
      e: "A mass party is not necessary for foreign policy.",
      full: "Dynamic foreign policy requires political stability, economic strength, and military capability. A mass party is a domestic political structure, not essential for foreign policy execution. Option C is correct.",
      h: "Mass party ≠ foreign policy requirement"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Nigeria is a member of the Commonwealth of Nations because she was once ruled by _____.",
      o: ["France", "Russia", "United States of America", "Great Britain"],
      a: 3,
      e: "Former British colonies join the Commonwealth.",
      full: "Nigeria was a British colony until 1960. Former British colonies are eligible to join the Commonwealth of Nations. Option D is correct.",
      h: "Commonwealth = former British colonies"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Franchise means the",
      o: ["right of all French citizens to vote", "right of all adults to vote", "right of all aliens to vote", "right of all property owners to vote"],
      a: 1,
      e: "Franchise means the right to vote.",
      full: "Franchise (or suffrage) is the right to vote in political elections. In modern democracies, it typically applies to all adult citizens. Option B is correct.",
      h: "Franchise = right to vote"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Citizenship can be acquired by",
      o: ["nationalism", "indigenization", "naturalization", "communalism"],
      a: 2,
      e: "Naturalization is the legal process of becoming a citizen.",
      full: "Citizenship can be acquired by birth, registration, or naturalization (the legal process for foreigners to become citizens). Option C is correct.",
      h: "Naturalization = becoming citizen"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "In unitary system of government, power is derived from",
      o: ["a rigid constitution", "the judiciary", "executive head of state", "one source of authority"],
      a: 3,
      e: "Unitary systems have one central source of authority.",
      full: "In a unitary system, all governmental power is concentrated in the central government. Local governments derive their authority from the center. Option D is correct.",
      h: "Unitary = one source of power"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The powers allocated to the federal government in a federation are primarily contained in the",
      o: ["central legislative list", "exclusive legislative list", "residual legislative list", "concurrent legislative list"],
      a: 1,
      e: "The Exclusive List contains federal powers only.",
      full: "In a federation like Nigeria, the Exclusive Legislative List contains matters on which only the federal government can legislate. Option B is correct.",
      h: "Exclusive List = federal powers"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "A constitution is said to be rigid if it",
      o: ["can only be interpreted by the military", "is written by different authors", "cannot be amended by the executive", "has cumbersome provisions for its amendment"],
      a: 3,
      e: "Rigid constitutions are difficult to amend.",
      full: "A rigid constitution has special, difficult procedures for amendment (e.g., supermajorities, referendums) compared to ordinary laws. Option D is correct.",
      h: "Rigid constitution = hard to amend"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Which of the following political parties in Nigeria formed the opposition in the House of Representatives during the First Republic?",
      o: ["NCNC and AG", "NCNC and UMBC", "NPC and AG", "AG and UMBC"],
      a: 0,
      e: "NCNC and AG formed the opposition against NPC.",
      full: "During the First Republic (1960-1966), the Northern People's Congress (NPC) led the coalition government. The opposition comprised the National Council of Nigeria and the Cameroons (NCNC) and the Action Group (AG). Option A is correct.",
      h: "First Republic opposition = NCNC + AG"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Red-tapism in the civil service refers to",
      o: ["use of red tapes on documents", "slowness of action", "cooperation between civil servants and politicians", "politicization of civil service"],
      a: 1,
      e: "Red tape means excessive bureaucracy causing delays.",
      full: "Red-tapism refers to excessive adherence to rules and formalities, causing bureaucratic delays and inefficiency. Option B is correct.",
      h: "Red tape = bureaucratic delays"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "One of the functions of political parties is to",
      o: ["make laws", "declare a state of emergency", "interpret the constitution", "aggregate interests"],
      a: 3,
      e: "Political parties aggregate and articulate diverse interests.",
      full: "One key function of political parties is interest aggregation—combining various group demands into coherent policy platforms. Option D is correct.",
      h: "Parties = aggregate interests"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Immediately after the war, Nigeria embarked on",
      o: ["rejuvenation, rehabilitation and reconstruction", "reconciliation, rehabilitation and reconstruction", "rebuilding, rejoicing and regimentation", "rehabilitation, repression and renaissance"],
      a: 1,
      e: "Post-Civil War policy was 'Reconciliation, Rehabilitation, and Reconstruction'.",
      full: "After the 1970 Civil War, the Gowon administration adopted the '3Rs' policy: Reconciliation, Rehabilitation, and Reconstruction. Option B is correct.",
      h: "3Rs = Reconciliation, Rehabilitation, Reconstruction"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The Nigerian Council was created by",
      o: ["Frederick Lugard", "Arthur Richards", "Hugh Clifford", "Bernard Bourdillon"],
      a: 0,
      e: "Lord Lugard created the Nigerian Council in 1914.",
      full: "Sir Frederick Lugard, the first Governor-General of amalgamated Nigeria, established the Nigerian Council in 1914 as an advisory body. Option A is correct.",
      h: "Lugard = Nigerian Council (1914)"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The census crises of 1962/63 was caused by",
      o: ["the 1959 pre-independent election", "revenue allocation formulation", "gross irregularities and figure allocation", "Awolowo's move towards socialism"],
      a: 2,
      e: "The census crises resulted from irregularities and disputed figures.",
      full: "The 1962/63 census was marred by gross irregularities, inflated figures, and regional disputes over population counts affecting revenue allocation and representation. Option C is correct.",
      h: "Census crises = irregularities"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Africa became the centre-piece of Nigeria's foreign policy under the regime of",
      o: ["Tafawa Balewa", "Yakubu Gowon", "Murtala Mohammed", "Shehu Shagari"],
      a: 2,
      e: "Murtala Mohammed made Africa the centerpiece of foreign policy.",
      full: "General Murtala Mohammed (1975-1976) articulated 'Africa as the centerpiece of Nigeria's foreign policy,' emphasizing decolonization, anti-apartheid, and African unity. Option C is correct.",
      h: "Murtala = Africa centerpiece"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Which of the following is not an OPEC member state?",
      o: ["Nigeria", "Indonesia", "Venezuela", "Ghana"],
      a: 3,
      e: "Ghana is not a member of OPEC.",
      full: "OPEC (Organization of Petroleum Exporting Countries) includes Nigeria, Indonesia (former member), Venezuela, but not Ghana (non-oil producer). Option D is correct.",
      h: "Ghana ≠ OPEC member"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Which of the following is permanent in international politics?",
      o: ["Bilateral relationship", "Economic aid", "Friendship", "Permanent interest"],
      a: 3,
      e: "National interests are permanent; alliances/friendships change.",
      full: "In international relations, national interests (security, economic welfare) are permanent, while specific alliances, friendships, and aid relationships change over time. Option D is correct.",
      h: "Permanent interest = national interest"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The major objective of OPEC is to",
      o: ["increase oil production", "decrease oil production", "stop oil production", "stabilize oil price"],
      a: 3,
      e: "OPEC aims to stabilize oil prices and ensure steady supply.",
      full: "OPEC's primary objective is to coordinate and unify petroleum policies to stabilize oil prices, ensure efficient supply, and provide fair returns to producers. Option D is correct.",
      h: "OPEC = price stabilization"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "An electoral college system of voting is a form of",
      o: ["direct election", "indirect election", "secret ballot", "referendum"],
      a: 1,
      e: "Electoral college is indirect election—voters elect electors who then vote.",
      full: "In an electoral college system, citizens vote for electors, who then vote for the actual candidate. This is indirect election. Option B is correct.",
      h: "Electoral college = indirect election"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "In a democracy, sovereignty resides in the",
      o: ["prime minister", "president", "electorate", "political parties"],
      a: 2,
      e: "Popular sovereignty means power resides in the people (electorate).",
      full: "In a democracy, sovereignty belongs to the people, who exercise it through voting (the electorate). Option C is correct.",
      h: "Democracy = popular sovereignty"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The main objective of a single-party system is that it encourages",
      o: ["bloated bureaucracy", "dictatorship", "popular sovereignty", "representative government"],
      a: 1,
      e: "Single-party systems tend toward dictatorship.",
      full: "Single-party systems concentrate power in one party, often leading to authoritarian or dictatorial rule. Option B is correct.",
      h: "Single-party → dictatorship"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Which of the following is a source of a country's constitution?",
      o: ["Mandamus", "Judicial injunction", "Political decisions", "Executive order"],
      a: 2,
      e: "Political decisions (e.g., constitutional conventions) are sources.",
      full: "Constitutions derive from political decisions, historical events, judicial precedents, and legislative acts. Among options, political decisions are a source. Option C is correct.",
      h: "Political decisions = constitutional source"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Local government is described as grassroots government because",
      o: ["it is nearest to the people", "headquarters located in villages", "leaders from villages", "all local people participate"],
      a: 0,
      e: "Local government is closest to the people at grassroots level.",
      full: "Local government is called 'grassroots' because it operates at the community level, closest to the citizens it serves. Option A is correct.",
      h: "Grassroots = closest to people"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The 1954 Lyttleton Constitution of Nigeria created the office of",
      o: ["Regional premier", "Prime minister", "Speaker of the house", "Governor"],
      a: 0,
      e: "The Lyttleton Constitution created regional premiers.",
      full: "The 1954 Lyttleton Constitution established federalism and created the position of Regional Premier for each region. Option A is correct.",
      h: "Lyttleton = regional premiers"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Manifesto refers to the",
      o: ["national development plan", "budget speech", "national objectives", "programme of a political party"],
      a: 3,
      e: "A manifesto is a political party's published program.",
      full: "A manifesto is a public declaration of a political party's principles, policies, and intentions before an election. Option D is correct.",
      h: "Manifesto = party program"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "One of the methods used to oust an erring Oba in the Yoruba tradition is",
      o: ["impeachment", "forcing him to commit suicide", "vote of no confidence", "forcing him to go into exile"],
      a: 1,
      e: "An erring Oba was traditionally forced to commit suicide.",
      full: "In traditional Yoruba politics, a disgraced or incompetent Oba might be forced to commit suicide as a form of removal and atonement. Option B is correct.",
      h: "Erring Oba → forced suicide"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The French policy of assimilation in West Africa was essentially a form of",
      o: ["indirect rule", "democratic rule", "monarchical rule", "direct rule"],
      a: 3,
      e: "Assimilation was direct rule, imposing French culture.",
      full: "French assimilation policy aimed to make Africans 'French' by imposing French culture, language, and laws—a form of direct rule. Option D is correct.",
      h: "Assimilation = direct rule"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The Nigerian civil war was fought because",
      o: ["Biafra was ripe for independence", "Eastern Region was marginalized", "Hausa-Fulani wanted domination", "Igbos were massacred in the North (1966)"],
      a: 3,
      e: "The 1966 massacres of Igbos in the North triggered the war.",
      full: "The immediate cause of the Civil War was the 1966 massacres of Easterners (mostly Igbos) in Northern Nigeria, leading to the Eastern Region's secession as Biafra. Option D is correct.",
      h: "1966 massacres → Civil War"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The world organization which existed before the United Nations Organization was the",
      o: ["League of Nations", "European Economic Community", "African Union", "Commonwealth of Nations"],
      a: 0,
      e: "The League of Nations preceded the UN.",
      full: "The League of Nations was established after WWI (1919) and dissolved in 1946, replaced by the United Nations. Option A is correct.",
      h: "League of Nations → UN"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The foreign affairs minister who advocated the 'Concert of Medium Powers' was",
      o: ["Prof. Ibrahim Gambari", "Major-General Joe Garba", "Alhaji Rilwanu Lukman", "Prof. Bolaji Akinyemi"],
      a: 3,
      e: "Prof. Bolaji Akinyemi advocated the Concert of Medium Powers.",
      full: "Professor Bolaji Akinyemi, as Nigeria's External Affairs Minister (1985-1987), proposed the 'Concert of Medium Powers' as a foreign policy strategy. Option D is correct.",
      h: "Akinyemi = Concert of Medium Powers"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Which of the following states is not a member of the African Union?",
      o: ["South Africa", "Egypt", "Spain", "Angola"],
      a: 2,
      e: "Spain is a European country, not in the AU.",
      full: "The African Union consists of African countries. Spain is in Europe and not a member. Option C is correct.",
      h: "Spain ≠ AU member"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Non-alignment policy does not apply to one of these countries.",
      o: ["Nigeria", "Ghana", "Algeria", "Britain"],
      a: 3,
      e: "Britain is a NATO/Western bloc member, not non-aligned.",
      full: "Non-alignment refers to countries not formally aligned with any major power bloc (Cold War). Britain was a NATO member and Western bloc, not non-aligned. Option D is correct.",
      h: "Britain = not non-aligned"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The ten non-permanent members of the Security Council are elected by the",
      o: ["Trusteeship Council", "Economic and Social Council", "General Assembly", "UN High Commission for Refugees"],
      a: 2,
      e: "The UN General Assembly elects non-permanent Security Council members.",
      full: "The UN General Assembly elects ten non-permanent members of the Security Council for two-year terms. Option C is correct.",
      h: "General Assembly elects non-permanent SC members"
    }
  ],

  crs: [
    {
      yr: 2005,
      university: "UNN",
      q: "The first person that revealed to Eli the evil that would come to his home was",
      o: ["Joel", "a man of God", "a prophet from Shiloh", "Samuel"],
      a: 1,
      e: "A man of God came to Eli with the prophecy of judgment.",
      full: "In 1 Samuel 2:27-36, a man of God came to Eli and prophesied judgment on his house because of his sons' wickedness. Option B is correct.",
      h: "Man of God prophesied to Eli"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "In the story of transfiguration, Moses and Elijah represented the",
      o: ["glory of God", "old testament saints", "law and the prophets", "end of the age"],
      a: 2,
      e: "Moses (Law) and Elijah (Prophets) represent the Old Testament.",
      full: "In the Transfiguration (Matthew 17, Mark 9, Luke 9), Moses represents the Law and Elijah represents the Prophets, showing Jesus as fulfillment of both. Option C is correct.",
      h: "Moses = Law, Elijah = Prophets"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "What did Asa do that was right in the eye of the LORD?",
      o: ["He removed all the idols of his father", "He killed all the priests of Baal", "His reign was peaceful", "He killed all the Baal worshipers"],
      a: 0,
      e: "Asa removed idols and restored true worship.",
      full: "King Asa of Judah did what was right by removing foreign altars, high places, and idols (1 Kings 15:11-12; 2 Chronicles 14). Option A is correct.",
      h: "Asa removed idols"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The royal law in the scripture according to James is",
      o: ["loving one's neighbour as oneself", "praying for one's enemies", "leaving vengeance to God", "submitting to authority always"],
      a: 0,
      e: "James calls 'love your neighbor as yourself' the royal law.",
      full: "James 2:8 refers to 'love your neighbor as yourself' as the royal law found in Scripture. Option A is correct.",
      h: "Royal law = love neighbor"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "An unwise decision of Solomon was the issue of the",
      o: ["building of the palace", "building of the temple", "felling of timber", "forced labour"],
      a: 3,
      e: "Solomon's forced labor policy led to discontent and eventual division.",
      full: "Solomon's heavy forced labor for his building projects (1 Kings 12:4) caused widespread resentment and contributed to the kingdom's division after his death. Option D is correct.",
      h: "Forced labour = Solomon's unwise decision"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "In Romans, believers are taught to obey those in authority because rulers are representatives of",
      o: ["the prophets", "the kingdom", "God", "the people"],
      a: 2,
      e: "Romans 13 teaches that authorities are instituted by God.",
      full: "Romans 13:1-2 teaches that all authority comes from God, and believers should submit to governing authorities as God's servants. Option C is correct.",
      h: "Authorities = God's representatives"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "God blessed the seventh day and made it holy because",
      o: ["He rested on that day from all His work", "Adam gave names to creatures on that day", "it was a Sabbath day", "human beings were created on that day"],
      a: 0,
      e: "God rested on the seventh day after creation and blessed it.",
      full: "Genesis 2:2-3 states that God rested on the seventh day from His work of creation, blessed it, and made it holy. Option A is correct.",
      h: "Seventh day = God rested"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "When Simon Peter saw the great shoal of fish they caught, he exclaimed with personal self-judgment because he was",
      o: ["a sinful man", "astonished", "amazed", "amenable"],
      a: 0,
      e: "Peter said 'Depart from me, for I am a sinful man, O Lord' (Luke 5:8).",
      full: "After the miraculous catch of fish, Peter fell at Jesus' knees saying 'Depart from me, for I am a sinful man, O Lord' (Luke 5:8). Option A is correct.",
      h: "Peter = sinful man"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "After the great council in Jerusalem, the apostles and elders sent some members to Antioch with Paul and Barnabas. The people sent were",
      o: ["Peter and James", "Barnabas and Judas", "Judas and Silas", "Silas and Mark"],
      a: 2,
      e: "Judas (called Barsabbas) and Silas were sent with Paul and Barnabas.",
      full: "Acts 15:22-27 records that Judas (called Barsabbas) and Silas were sent with Paul and Barnabas to deliver the council's letter to Antioch. Option C is correct.",
      h: "Judas and Silas sent to Antioch"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Those who do not believe in Jesus Christ are condemned already because they",
      o: ["are stubborn", "have not believed", "worship idols", "have already perished"],
      a: 1,
      e: "John 3:18 says unbelievers are condemned because they have not believed.",
      full: "John 3:18 states: 'Whoever believes in him is not condemned, but whoever does not believe stands condemned already because they have not believed in the name of God's one and only Son.' Option B is correct.",
      h: "Unbelief = condemnation"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "God loves his son Jesus because he",
      o: ["is obedient to his father", "is the good shepherd", "laid down his life for all", "is the word that became flesh"],
      a: 0,
      e: "Jesus said the Father loves him because he lays down his life (John 10:17).",
      full: "John 10:17 states: 'The reason my Father loves me is that I lay down my life—only to take it up again.' Obedience to the Father's will is the basis. Option A is correct.",
      h: "Father loves Son for obedience"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Who are the children of God? Those who",
      o: ["keep his command", "have faith in the son", "hear the word and keep it", "love one another"],
      a: 1,
      e: "John 1:12 says those who receive and believe in Jesus become children of God.",
      full: "John 1:12: 'Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God.' Option B is correct.",
      h: "Believe in Son = children of God"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Jesus pronounced woe on Chorazin and Bethsaida because they were",
      o: ["enemies of truth", "not obedient to the law", "not repentant of their sins", "against the word of God"],
      a: 2,
      e: "Jesus condemned them for not repenting despite witnessing miracles.",
      full: "Matthew 11:21: 'Woe to you, Chorazin! Woe to you, Bethsaida! For if the miracles that were performed in you had been performed in Tyre and Sidon, they would have repented long ago.' Option C is correct.",
      h: "Chorazin/Bethsaida = unrepentant"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The trial of Jesus brought two enemies together to become friends. Who were these enemies?",
      o: ["Pilate and Jesus", "Herod and Pilate", "the Jews and the Romans", "the chief priest and the Pharisees"],
      a: 1,
      e: "Herod and Pilate became friends that day (Luke 23:12).",
      full: "Luke 23:12: 'That day Herod and Pilate became friends—before this they had been enemies.' Option B is correct.",
      h: "Herod and Pilate became friends"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Why did King Josiah say that workers repairing the house should not be asked to give an account of their spending? They",
      o: ["were not accountable", "did not know how to protect their interest", "were very honest and hardworking", "had the fear of god and respect for the king"],
      a: 2,
      e: "The workers were trustworthy and honest (2 Kings 22:7).",
      full: "2 Kings 22:7 states: 'But they need not account for the money entrusted to them, because they are honest and trustworthy workers.' Option C is correct.",
      h: "Workers = honest and trustworthy"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Moses the servant of the Lord did not see the land of",
      o: ["Negeb", "Gilead", "Canaan", "Zoar"],
      a: 2,
      e: "Moses saw Canaan from Pisgah but did not enter (Deuteronomy 34).",
      full: "Moses was allowed to see the Promised Land (Canaan) from Mount Nebo but was not permitted to enter because of his disobedience at Meribah. Option C is correct.",
      h: "Moses = saw Canaan, didn't enter"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The place where God appeared to Solomon in a dream by night and told him to ask for anything was called",
      o: ["Gibeon", "Gilgal", "Gezer", "Shiloh"],
      a: 0,
      e: "God appeared to Solomon at Gibeon (1 Kings 3:5).",
      full: "1 Kings 3:5: 'At Gibeon the LORD appeared to Solomon during the night in a dream, and God said, 'Ask for whatever you want me to give you.'' Option A is correct.",
      h: "Gibeon = Solomon's dream"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Why did God command different bands to attack and destroy Judah?",
      o: ["because of innocent blood Manasseh had shed", "God wanted to wipe Judah off his sight", "Manasseh committed great sin", "Manasseh defiled Jerusalem"],
      a: 0,
      e: "Manasseh's shedding of innocent blood brought judgment (2 Kings 24:3-4).",
      full: "2 Kings 24:3-4 states that the Lord removed Judah because of Manasseh's sins, including the innocent blood he had shed. Option A is correct.",
      h: "Manasseh = innocent blood → judgment"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The sin committed by the Israelites that made God send prophet Ezekiel was",
      o: ["idolatry", "stubbornness", "rebellion", "faithfulness"],
      a: 0,
      e: "Idolatry was the primary sin leading to the exile and Ezekiel's mission.",
      full: "Ezekiel was called to confront Israel's idolatry and rebellion against God, which led to the Babylonian exile. Option A is correct.",
      h: "Idolatry = Israel's sin"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "How did King Josiah pay the workmen who had oversight of the house of the Lord during the repair?",
      o: ["from normal temple collection", "from money given by the people", "from treasury", "from donations"],
      a: 1,
      e: "The money collected from the people was given directly to the workers.",
      full: "2 Kings 22:4-6 records that the money brought to the temple was given directly to the workmen without accounting because they were trustworthy. Option B is correct.",
      h: "People's money → workers"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Why was Jonah displeased exceedingly and angry while he was in Nineveh?",
      o: ["God repented of the evil and forgave Nineveh", "God wanted to destroy Nineveh", "God wanted Jonah to preach to Nineveh", "God changed his mind and did not destroy"],
      a: 3,
      e: "Jonah was angry because God relented from destroying Nineveh (Jonah 4:1-2).",
      full: "Jonah 4:1-2 states Jonah was greatly displeased and angry because God relented from sending calamity on Nineveh after their repentance. Option D is correct.",
      h: "Jonah angry = God didn't destroy"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "What was to be the reward of Israel according to Isaiah, if they were willing and obedient? They would",
      o: ["inherit the entire land", "be the people of God", "prosper and devour enemies", "eat the good of the land"],
      a: 3,
      e: "Isaiah 1:19 promises: 'If you are willing and obedient, you will eat the good of the land.'",
      full: "Isaiah 1:19: 'If you are willing and obedient, you will eat the good of the land.' Option D is correct.",
      h: "Isaiah 1:19 = eat good of land"
    }
  ],

  literature: [
    {
      yr: 2006,
      university: "UNN",
      q: "In Dennis Brutus' 'A Troubadour I Traverse,' the poet",
      o: ["sees his country as wild and undeveloped", "loves his country in spite of difficulties", "hates his country because it is run by dictators", "does not care about his country"],
      a: 1,
      e: "Brutus expresses love for his troubled homeland under apartheid.",
      full: "In 'A Troubadour I Traverse,' Dennis Brutus expresses a deep, troubled love for his country (South Africa under apartheid), despite its oppression and suffering. Option B is correct.",
      h: "Brutus = love despite oppression"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Ofeimun's 'We Must Learn Again to Fly'",
      o: ["expresses hope in the future", "pretends all is well", "urges acceptance of misfortunes", "blames foreigners for problems"],
      a: 0,
      e: "The poem expresses hope for renewal and recovery.",
      full: "Ofeimun's poem encourages Nigerians to recover from setbacks and 'learn again to fly'—expressing optimism about the future despite current difficulties. Option A is correct.",
      h: "Learn again to fly = hope/renewal"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "In Milton's 'On His Blindness,' the poet",
      o: ["expresses deep anger with God for making him blind", "believes anyone blind must beg", "states that even with blindness one can serve God", "believes blindness is punishment for sin"],
      a: 2,
      e: "Milton concludes that God does not need man's work—those who wait serve Him.",
      full: "Milton's sonnet ends with 'They also serve who only stand and wait,' meaning that even in blindness, one can serve God through patience and faith. Option C is correct.",
      h: "They also serve who only stand and wait"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "In Keats' 'On the Grasshopper and Cricket,' the poet",
      o: ["sees insects as nuisance to be eradicated", "emphasizes each is active at different times of day", "describes physical differences", "establishes insect lives on nectar"],
      a: 1,
      e: "The grasshopper is active in summer, cricket in winter.",
      full: "Keats' poem shows that the poetry of earth never ceases—the grasshopper sings in summer, the cricket in winter. Option B is correct.",
      h: "Grasshopper (summer) / Cricket (winter)"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The dominant literary device in Blake's lines ('And their sun does never shine...') is",
      o: ["apostrophe", "allusion", "simile", "repetition"],
      a: 3,
      e: "The repetition of 'And their...' is anaphora (repetition).",
      full: "The lines repeat the structure 'And their...' at the beginning of each line, which is a form of repetition (anaphora). Option D is correct.",
      h: "Repetition of 'And their'"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "From Blake's lines ('Cruelty has a human heart...'), Blake's perspective on man is",
      o: ["inspiring", "hopeful", "gloomy", "fortunate"],
      a: 2,
      e: "Blake presents human emotions as dark and destructive.",
      full: "Blake's lines suggest that cruelty, jealousy, and secrecy are inherent in human nature, presenting a rather gloomy or pessimistic view of humanity. Option C is correct.",
      h: "Gloomy view of human nature"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The time of day captured in Gray's lines ('The curfew tells the knell of parting day...') is",
      o: ["early morning", "mid-afternoon", "Sunday", "evening"],
      a: 3,
      e: "Curfew bell and parting day indicate evening.",
      full: "The 'curfew' bell and 'parting day' (day ending) indicate evening or twilight. Option D is correct.",
      h: "Curfew + parting day = evening"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "The tone or mood expressed in Arnold's lines ('Ah love, let us be true to one another...') is",
      o: ["optimistic", "elated", "melancholic", "expectant"],
      a: 2,
      e: "The poem presents a pessimistic view of the world but finds solace in love.",
      full: "Arnold's 'Dover Beach' presents a melancholic view of a world without certitude or joy, finding only love as refuge. Option C is correct.",
      h: "Melancholic tone"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "John Durbeyfield's action of ordering a carriage on learning of his noble ancestors shows that he",
      o: ["will become a knight like his ancestors", "has inherited a great fortune", "is rather foolish and easily carried away", "will become the Mayor of Marlott"],
      a: 2,
      e: "Durbeyfield is foolishly carried away by the news of his ancestry.",
      full: "In 'Tess of the D'Urbervilles,' John Durbeyfield's immediate, extravagant reaction to learning he has noble ancestors reveals his foolish and easily excited nature. Option C is correct.",
      h: "Durbeyfield = foolishly carried away"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "From Durbeyfield's statement ('Daze my eyes...'), the society in which he lives is",
      o: ["very rural and undeveloped", "class conscious", "oppressive", "superstitious"],
      a: 1,
      e: "The society values noble ancestry, showing class consciousness.",
      full: "The fact that discovering noble ancestry changes Durbeyfield's behavior indicates a class-conscious society where lineage matters greatly. Option B is correct.",
      h: "Class conscious society"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "When Ophelia tells her father about Hamlet's love interest in her, he",
      o: ["decides to send Ophelia to England", "asks the queen to speak to Hamlet", "tells Ophelia to stop further contact with Hamlet", "encourages Ophelia to love Hamlet"],
      a: 2,
      e: "Polonius forbids Ophelia from seeing Hamlet.",
      full: "In 'Hamlet,' when Ophelia tells Polonius of Hamlet's advances, Polonius orders her to stop seeing him, believing Hamlet's intentions are not honorable. Option C is correct.",
      h: "Polonius forbids contact"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "Polonius is sending his son Laertes to",
      o: ["Wittenberg", "Sweden", "Ireland", "France"],
      a: 3,
      e: "Laertes is going to France.",
      full: "In 'Hamlet,' Polonius sends his son Laertes to France to continue his education. Option D is correct.",
      h: "Laertes → France"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "A literary work which is a mocking imitation of another work is called",
      o: ["a copyright", "a slander", "pornography", "a parody"],
      a: 3,
      e: "A parody is a humorous or mocking imitation.",
      full: "Parody is a literary or artistic work that imitates the style of another work for comic effect or ridicule. Option D is correct.",
      h: "Parody = mocking imitation"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "A literary work whose meaning can be understood at two different levels is called",
      o: ["biography", "epic", "free verse", "allegory"],
      a: 3,
      e: "Allegory has literal and symbolic meanings.",
      full: "An allegory is a story that can be interpreted at both a literal level and a symbolic level (e.g., 'Pilgrim's Progress'). Option D is correct.",
      h: "Allegory = two levels of meaning"
    },
    {
      yr: 2006,
      university: "UNN",
      q: "A subordinate or minor plot running through a work of fiction is called",
      o: ["an underdevelopment", "an understatement", "parallelism", "subplot"],
      a: 3,
      e: "A subplot is a secondary plot in a narrative.",
      full: "A subplot is a secondary strand of the plot that runs parallel to the main plot, often involving minor characters. Option D is correct.",
      h: "Subplot = secondary plot"
    },
    // 2007/2008 Literature Questions
    {
      yr: 2007,
      university: "UNN",
      q: "White ball of fire tore through dome of the night. It exploded into the branches of a colossal tree of fire - whose stem instantly leap towards the earth. The passage directs its appeal primarily to the sense of",
      o: ["hearing", "sight", "touch", "smell"],
      a: 1,
      e: "The passage appeals primarily to the sense of sight (visual imagery).",
      full: "The correct answer is 'sight'. The passage uses vivid visual imagery: 'white ball of fire', 'dome of the night', 'colossal tree of fire', 'leap towards the earth'. These descriptions create a mental picture that appeals to the reader's sense of sight. There is no emphasis on sound (hearing), touch, or smell in this passage. Therefore, sight is the correct answer.",
      h: "Visual imagery = descriptions that create pictures in the mind (sight)."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "What happens to a dream deferred? Does it dry up Like a raisin in the sun Or fester like a sore in the sun? And then run? In the above lines, the poet achieves special effect by use of",
      o: ["transferred epithet", "synecdoche", "alliteration", "simile"],
      a: 3,
      e: "The poet uses similes comparing a deferred dream to a raisin and a sore.",
      full: "The correct answer is 'simile'. A simile is a figure of speech that compares two different things using 'like' or 'as'. In these lines (from Langston Hughes' 'Harlem'), the poet asks: 'Does it dry up like a raisin in the sun? Or fester like a sore in the sun?' Both comparisons use 'like', making them similes. Transferred epithet (option A) moves an adjective from one noun to another. Synecdoche (option B) uses a part to represent the whole. Alliteration (option C) repeats initial consonant sounds. Therefore, simile is correct.",
      h: "Simile = comparison using 'like' or 'as' (e.g., 'dry up LIKE a raisin')."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "She said you just had to make an emotional commitment in marriage. It was like skiing, you couldn't see in advance what would happen but you had to let go. Maybe that was why I failed, because I didn't know what I had to let go of. For me it hadn't been like skiing, it was more like jumping off a cliff. That was the feeling I had all the time I was married, in the air, going down, waiting for the smash at the bottom. The passage indicates that the author's experience in marriage was",
      o: [
        "exhilarating like skiing",
        "steeped in boredom and monotony",
        "full of fear of the unknown",
        "fraught with grief and despair"
      ],
      a: 2,
      e: "The author's marriage felt like 'jumping off a cliff' - waiting for disaster, full of fear of the unknown.",
      full: "The correct answer is 'full of fear of the unknown'. The author contrasts the advice that marriage is 'like skiing' (requiring letting go despite uncertainty) with her own experience: 'it was more like jumping off a cliff... waiting for the smash at the bottom.' This imagery conveys constant fear, anticipation of disaster, and the terror of not knowing when the crash will come. Option A (exhilarating) is the opposite of her experience. Option B (boredom) is not indicated. Option D (grief and despair) is close but 'fear of the unknown' more precisely captures the 'waiting for the smash' feeling.",
      h: "Jumping off a cliff = fear, anticipation of disaster, uncertainty."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "___ her vesper done of all its wreathed peals her hair she frees. Unclasps her warmed jewels one by one; loosens her fragrant bodice; by degrees rich attire creeps rustling to her knees. The passage gives ample evidence of the poet's",
      o: [
        "sensuous description",
        "meticulous attention to matters concerning women",
        "mastery of the Spenserian stanza",
        "sensual feelings and emotions"
      ],
      a: 0,
      e: "The passage is rich in sensuous description (appealing to the senses).",
      full: "The correct answer is 'sensuous description'. Sensuous description appeals to the physical senses - sight, touch, smell. The passage describes: 'warmed jewels' (touch), 'fragrant bodice' (smell), 'rich attire creeps rustling' (sound and movement), 'hair she frees' (sight). These vivid sensory details create a luxurious, tactile experience. Option B (meticulous attention to women) is too narrow. Option C (Spenserian stanza) refers to a specific poetic form not evident here. Option D (sensual feelings) relates to the poet's emotions, not the descriptive quality. Therefore, 'sensuous description' is correct.",
      h: "Sensuous description = appeals to physical senses (touch, smell, sight, sound)."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "For I have known them all already, known them all. Have known the evenings, mornings, afternoons, I have measured out my life with coffee spoons. The tone in these lines suggests",
      o: [
        "the author's desire to accomplish more in life",
        "anxiety and tension",
        "tediousness and boredom",
        "anger and exasperation"
      ],
      a: 2,
      e: "Measuring life with coffee spoons suggests a mundane, repetitive, boring existence.",
      full: "The correct answer is 'tediousness and boredom'. These lines from T.S. Eliot's 'The Love Song of J. Alfred Prufrock' convey a sense of monotony and meaninglessness. 'Measuring out life with coffee spoons' suggests a life reduced to trivial, repetitive daily rituals - each day blending into the next with no significance. The repetition of 'known them all' emphasizes weariness. Option A (desire to accomplish more) is not evident - he seems resigned, not aspirational. Option B (anxiety/tension) is present elsewhere in the poem but not the dominant tone here. Option D (anger) is not expressed. Therefore, tediousness and boredom is correct.",
      h: "Measuring life with coffee spoons = mundane, repetitive, boring existence."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "Olu hissed, slammed the door and dashed out screaming. The dominant figure of speech in the above sentence is",
      o: ["zeugma", "oxymoron", "hyperbole", "onomatopoeia"],
      a: 3,
      e: "The words 'hissed' and 'screaming' imitate the sounds they describe (onomatopoeia).",
      full: "The correct answer is 'onomatopoeia'. Onomatopoeia is the use of words that imitate the sounds they describe. 'Hissed' imitates the sound of a sharp exhalation or snake sound. 'Screaming' imitates the sound of a loud, high-pitched cry. These sound-imitating words dominate the sentence. Zeugma (option A) uses one word to modify two others in different ways. Oxymoron (option B) combines contradictory terms. Hyperbole (option C) is exaggeration. Therefore, onomatopoeia is correct.",
      h: "Onomatopoeia = words that sound like what they describe (hiss, scream, bang, buzz)."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "A dungeon horrible, on all sides round. As one great furnace flamed, and yet from those flames, no light, but rather darkness visible. The phrase 'darkness visible' in the above lines is an example of",
      o: ["metaphor", "hyperbole", "oxymoron", "litotes"],
      a: 2,
      e: "'Darkness visible' combines two contradictory terms (darkness cannot be seen), making an oxymoron.",
      full: "The correct answer is 'oxymoron'. An oxymoron is a figure of speech that combines two contradictory or opposite terms. 'Darkness' (absence of light) and 'visible' (able to be seen) are contradictory - normally darkness is NOT visible. The phrase creates a striking paradox. Metaphor (option A) is a direct comparison without 'like' or 'as'. Hyperbole (option B) is exaggeration. Litotes (option D) uses understatement by negating the opposite. Therefore, 'oxymoron' is correct.",
      h: "Oxymoron = contradictory terms combined (e.g., 'darkness visible', 'deafening silence')."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "Was it for this you took such constant care. The bodkin, comb and essence to prepare? For this torturing iron wreathed round? The dominant figure of speech in above passage is",
      o: ["synecdoche", "rhetorical question", "parody", "apostrophe"],
      a: 1,
      e: "The speaker asks questions that expect no answer - rhetorical questions.",
      full: "The correct answer is 'rhetorical question'. A rhetorical question is asked not to get an answer but to make a point or create emphasis. The speaker asks 'Was it for this you took such constant care?' and 'For this torturing iron wreathed round?' - these questions are not meant to be answered but to express dismay and frustration. Synecdoche (option A) uses a part for the whole. Parody (option C) imitates another work for comic effect. Apostrophe (option D) addresses an absent person or abstract idea. Therefore, rhetorical question is correct.",
      h: "Rhetorical question = question asked for effect, not expecting an answer."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "The early morning smoke had now gone off the eyes of the day. Trees and houses were still wet from last night's rain, but a cool breeze caressed the world like a gentle hand. The dominant literary device in this passage is",
      o: ["metaphor", "oxymoron", "synecdoche", "personification"],
      a: 3,
      e: "The breeze 'caressed the world like a gentle hand' - giving human qualities to the breeze.",
      full: "The correct answer is 'personification'. Personification gives human characteristics or actions to non-human things. In this passage, the 'cool breeze caressed the world like a gentle hand' - 'caressed' is a human action (affectionate touching). Also, 'the eyes of the day' personifies the day as having eyes. Metaphor (option A) is direct comparison without 'like'/'as' - present but not dominant. Oxymoron (option B) is contradictory terms. Synecdoche (option C) is part for whole. Personification is the dominant device.",
      h: "Personification = giving human qualities to non-human things (breeze 'caresses')."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "Have you got hands today? No, I am working alone. My helpers are on strike. Would you like to engage me? My fees are reasonable. No thank you. In this brief dialogue, the first line contains the device known as",
      o: ["synecdoche", "paradox", "oxymoron", "hyperbole"],
      a: 0,
      e: "'Hands' is used to represent workers (part for whole - synecdoche).",
      full: "The correct answer is 'synecdoche'. Synecdoche is a figure of speech where a part of something represents the whole, or the whole represents a part. Here, 'hands' (part of the body) is used to mean 'workers' (the whole person). The speaker asks 'Have you got hands today?' meaning 'Do you have workers/helpers today?' Paradox (option B) is a seemingly contradictory statement. Oxymoron (option C) combines contradictory terms. Hyperbole (option D) is exaggeration. Therefore, synecdoche is correct.",
      h: "Synecdoche = part for whole (e.g., 'hands' meaning workers, 'wheels' meaning car)."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "An ode is best described as",
      o: [
        "story told in poetic form",
        "poetic composition of fourteen lines",
        "narration about nature and natural objects",
        "lyrical poem addressed to some person or thing"
      ],
      a: 3,
      e: "An ode is a lyrical poem that addresses or celebrates a person, thing, or abstract idea.",
      full: "The correct answer is 'lyrical poem addressed to some person or thing'. An ode is a formal, often ceremonious lyric poem that addresses and often praises a person, place, thing, or idea. Famous examples include Keats' 'Ode to a Nightingale' and 'Ode on a Grecian Urn'. Option A describes narrative poetry. Option B describes a sonnet (14 lines). Option C is too narrow. Therefore, option D is correct.",
      h: "Ode = lyric poem addressing/praising a specific subject."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "Alliteration is",
      o: [
        "the use of figures of speech to achieve poetic effect",
        "the repetition of two or more words having the same initial consonant sound",
        "usually employed to set the scene for a conflict"
      ],
      a: 1,
      e: "Alliteration is the repetition of initial consonant sounds in nearby words.",
      full: "The correct answer is 'the repetition of two or more words having the same initial consonant sound'. Alliteration is a sound device where the same consonant sound appears at the beginning of stressed syllables in nearby words (e.g., 'Peter Piper picked', 'wild and woolly'). Option A is too broad (describes figurative language generally). Option C is not accurate - alliteration has many uses beyond setting conflict scenes. Therefore, option B is correct.",
      h: "Alliteration = same starting consonant sound repeated (e.g., 'big blue balloon')."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "An allegory is a story",
      o: [
        "in which people or things or events have another meaning",
        "which aims at teaching a moral lesson",
        "in which allegations are made about the characters",
        "told in verse"
      ],
      a: 0,
      e: "An allegory uses symbolic characters/events to represent abstract ideas or hidden meanings.",
      full: "The correct answer is 'in which people or things or events have another meaning'. An allegory is a narrative in which characters, settings, and events symbolize abstract concepts or moral qualities, creating a second hidden meaning beneath the literal story. Examples include Orwell's 'Animal Farm' (representing the Russian Revolution) and Bunyan's 'The Pilgrim's Progress'. Option B (teaching moral lesson) is often a purpose of allegory but not the definition. Option C confuses 'allegory' with 'allegation'. Option D is incorrect - allegories can be prose or verse. Therefore, option A is correct.",
      h: "Allegory = story with hidden symbolic meaning (literal + figurative levels)."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "A couplet is a",
      o: [
        "succession of three rhyming lines",
        "succession of two rhyming lines",
        "poem of two stanzas",
        "poem of three stanzas"
      ],
      a: 1,
      e: "A couplet consists of two consecutive lines that rhyme.",
      full: "The correct answer is 'succession of two rhyming lines'. A couplet is a pair of successive lines of verse, typically rhyming and having the same meter. Shakespearean sonnets end with a rhyming couplet. Option A describes a triplet (tercet). Options C and D describe stanza counts, not couplets. Therefore, option B is correct.",
      h: "Couplet = two rhyming lines of poetry (e.g., 'So long as men can breathe or eyes can see, / So long lives this, and this gives life to thee.')."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "A sonnet is a poem of",
      o: ["fourteen lines", "ten lines", "seven stanzas", "six stanzas"],
      a: 0,
      e: "A sonnet is a 14-line poem, typically in iambic pentameter.",
      full: "The correct answer is 'fourteen lines'. A sonnet is a poetic form consisting of 14 lines, traditionally written in iambic pentameter. Two main types exist: the Italian (Petrarchan) sonnet with an octave (8 lines) and sestet (6 lines); and the English (Shakespearean) sonnet with three quatrains (12 lines) and a final couplet (2 lines). Options B, C, and D are incorrect. Therefore, option A is correct.",
      h: "Sonnet = 14-line poem (Shakespearean or Petrarchan)."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "An antagonist is the character in a narrative who",
      o: [
        "uses abusive language to antagonize other characters",
        "works against the interest of the protagonist",
        "works against the interest of other characters",
        "champions the cause of the protagonist"
      ],
      a: 1,
      e: "The antagonist opposes the protagonist (main character).",
      full: "The correct answer is 'works against the interest of the protagonist'. In narrative, the protagonist is the main character. The antagonist is the character or force that opposes the protagonist, creating conflict. The antagonist is not necessarily villainous (could be an opposing force or rival). Option A describes an insulting character but is not the definition. Option C is too broad. Option D describes the ally or sidekick, not antagonist. Therefore, option B is correct.",
      h: "Antagonist = opposes protagonist (main character). Protagonist vs. Antagonist."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "The novel, the novella and the short story are the major sub-genres of",
      o: ["nonfiction", "prose-fiction", "poetry", "drama"],
      a: 1,
      e: "The novel, novella, and short story are all forms of prose fiction.",
      full: "The correct answer is 'prose-fiction'. Prose fiction is narrative writing in prose (not poetry) that tells imagined stories. The three main lengths are: short story (brief), novella (medium-length), and novel (long). Nonfiction (option A) deals with factual information. Poetry (option C) uses verse and figurative language. Drama (option D) is written for performance. Therefore, prose-fiction is correct.",
      h: "Prose fiction = novel, novella, short story (imagined narratives in prose)."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "Any work of literature which sets out to instruct may be called",
      o: ["dialectic", "decadent", "definitive", "didactic"],
      a: 3,
      e: "Didactic literature is intended to teach or instruct.",
      full: "The correct answer is 'didactic'. Didactic literature is designed to teach a moral, ethical, or practical lesson. It emphasizes instruction and education. Dialectic (option A) relates to logical argumentation. Decadent (option B) refers to moral decline or artistic excess. Definitive (option C) means authoritative or final. Therefore, 'didactic' is correct.",
      h: "Didactic = intended to instruct/teach (often moral lessons)."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "The substitution of a mild and pleasant expression for a harsh and blunt one is called",
      o: ["ambiguity", "climax", "peripety", "euphemism"],
      a: 3,
      e: "Euphemism replaces harsh/direct terms with milder alternatives.",
      full: "The correct answer is 'euphemism'. Euphemism is a figure of speech where an unpleasant, harsh, or blunt word/phrase is replaced with a milder, more pleasant one (e.g., 'passed away' instead of 'died', 'downsizing' instead of 'firing'). Ambiguity (option A) means having multiple meanings. Climax (option B) is the point of highest tension. Peripety (option C) is a sudden reversal of fortune. Therefore, euphemism is correct.",
      h: "Euphemism = mild expression for harsh truth (e.g., 'passed away' for 'died')."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "Caricature is used to",
      o: [
        "ridicule a person by distorting his most prominent features",
        "censure an individual by emphasizing his weakness",
        "expose the folly in literature",
        "elicit the artistic potential of dramatists"
      ],
      a: 0,
      e: "Caricature exaggerates prominent features for comic or satirical effect.",
      full: "The correct answer is 'ridicule a person by distorting his most prominent features'. Caricature is a representation (often in visual art or writing) that exaggerates certain characteristics or features of a person for comic effect or ridicule. Political cartoons often use caricature. Option B (censure) is possible but not the definition. Option C and D are too broad. Therefore, option A is correct.",
      h: "Caricature = exaggerated depiction of prominent features for comic/satirical effect."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "Pip's flippant remarks concerning the tombstones in the opening chapter of Great Expectations indicate",
      o: [
        "his longing for death",
        "the child's inability to understand death",
        "his yearning for his parents",
        "his fascination with inscriptions on stonework"
      ],
      a: 1,
      e: "Pip's casual remarks about tombstones show he doesn't grasp the gravity of death.",
      full: "The correct answer is 'the child's inability to understand death'. At the beginning of Charles Dickens' 'Great Expectations', young Pip is in the churchyard looking at his parents' tombstones. His flippant, matter-of-fact remarks show that as a young child, he does not fully comprehend the finality and emotional weight of death. He sees the tombstones as objects of curiosity rather than markers of loss. Option A (longing for death) is not indicated. Option C (yearning for parents) - he never knew them, so his feelings are detached. Option D is too literal. Therefore, option B is correct.",
      h: "Young Pip's flippant remarks = childish inability to understand death's gravity."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "In Great Expectations, while Pip was going away from home to take the coach to London, Joe and Biddy threw old shoes at him because",
      o: [
        "Pip had in haste forgotten to pack those old shoes of his",
        "they wanted to play a practical joke on Pip for the last time",
        "Pip had made them angry by his joy to leave home",
        "they believed that the act would bring him good luck"
      ],
      a: 3,
      e: "Throwing old shoes after someone was a traditional good luck custom.",
      full: "The correct answer is 'they believed that the act would bring him good luck'. In English folklore and tradition, throwing old shoes after someone who is leaving on a journey is considered a good luck charm. Joe and Biddy perform this act affectionately, wishing Pip well as he departs for London. Options A, B, and C misinterpret the gesture as negative or practical joking. Therefore, option D is correct.",
      h: "Throwing old shoes after departing person = traditional good luck custom."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "His mouth was such a post-office of a mouth that he had a mechanical appearance of smiling. This description in Great Expectations refers to",
      o: ["Mr. Pumblechook", "Mr. Wemmick", "Estella", "Mr. Drummle"],
      a: 1,
      e: "This description of a mechanical, post-office-like mouth refers to Mr. Wemmick.",
      full: "The correct answer is 'Mr. Wemmick'. In Dickens' 'Great Expectations', Mr. Wemmick is Jaggers' clerk. He is described as having a 'post-office of a mouth' - a mouth that opens and closes mechanically like a letter slot. This reflects his compartmentalized personality: formal at work, warm at home in his 'Castle'. Mr. Pumblechook (option A) is pompous but not described this way. Estella (option C) is beautiful and cold. Mr. Drummle (option D) is brutish. Therefore, Mr. Wemmick is correct.",
      h: "Mr. Wemmick = 'post-office mouth' (mechanical, slot-like)."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "At the very end of Great Expectations, Estella disclosed to Pip that the sources of her present maturity and wisdom was",
      o: [
        "the sound education she had at school",
        "her pleasant association with Miss Havisham",
        "the suffering she had experienced in life",
        "her long exposure to high society"
      ],
      a: 2,
      e: "Estella's suffering (especially her abusive marriage to Drummle) made her wise.",
      full: "The correct answer is 'the suffering she had experienced in life'. At the end of 'Great Expectations', Estella has been humbled by her miserable marriage to the brutish Bentley Drummle, who mistreated her. This suffering has broken down her coldness and given her wisdom and empathy. Option A (education) - she was educated but remained cold. Option B (association with Miss Havisham) - Miss Havisham raised her to be cold and vengeful. Option D (high society) - she was always in high society. Therefore, suffering is correct.",
      h: "Estella's wisdom came from suffering (abusive marriage to Drummle)."
    },
    {
      yr: 2007,
      university: "UNN",
      q: "In Great Expectations, Pip's nursing of Magwitch is significant because it",
      o: [
        "prevents Magwitch from confirming Pip as his heir",
        "recalls Herbert's nursing of Pip",
        "shows Pip's gratitude and humanity",
        "her long exposure to high society"
      ],
      a: 2,
      e: "Pip nursing the dying Magwitch shows his moral growth and gratitude.",
      full: "The correct answer is 'shows Pip's gratitude and humanity'. After discovering that Magwitch (the escaped convict) is his secret benefactor, Pip initially feels revulsion. However, he comes to care for Magwitch, nursing him during his final illness and trial. This demonstrates Pip's moral development from a snob who was ashamed of his humble origins to a compassionate human being who shows gratitude to the man who made his 'great expectations' possible. Option A is incorrect. Option B is not the primary significance. Option D is garbled. Therefore, option C (showing gratitude and humanity) is correct.",
      h: "Pip nursing Magwitch = moral growth, gratitude, humanity."
    },
    // 2008/2009 Arrow of God Questions
    {
      yr: 2008,
      university: "UNN",
      q: "When he came back from Okperi, I went to his house and he talked like a sane man. I reminded him of saying that a man must dance the dance prevailing in his time. The above statement was made by Ofoka about",
      o: ["Nwaka", "Akuebue", "Ezeulu", "Obika"],
      a: 2,
      e: "Ofoka is speaking about Ezeulu, the Chief Priest of Ulu.",
      full: "The correct answer is 'Ezeulu'. In Chinua Achebe's 'Arrow of God', Ezeulu is the Chief Priest of Ulu. Ofoka, his friend, tries to counsel him about adapting to changing times. The phrase 'a man must dance the dance prevailing in his time' is key advice given to Ezeulu, who struggles to adapt to colonial rule. Nwaka (option A) is Ezeulu's rival. Akuebue (option B) is another friend of Ezeulu. Obika (option D) is Ezeulu's son. Therefore, Ezeulu is correct.",
      h: "Ezeulu = Chief Priest of Ulu in 'Arrow of God' - struggles to adapt to change."
    },
    {
      yr: 2008,
      university: "UNN",
      q: "A man who brings ant-ridden faggots into his hut should expect the visit of lizards. What does Nwaka refer to as 'ant-ridden faggots' in this context?",
      o: [
        "the visit of the court messenger",
        "the unexpected consultation of Ezeulu with the Chiefs of Umuaro",
        "the friendship between Ezeulu and the white man",
        "Ezeulu's rejection of the kind gesture of some Chiefs to accompany him to Okperi"
      ],
      a: 2,
      e: "Nwaka criticizes Ezeulu's friendship with the white man as 'ant-ridden faggots'.",
      full: "The correct answer is 'the friendship between Ezeulu and the white man'. In 'Arrow of God', Nwaka uses this proverb to criticize Ezeulu's association with the white colonial administration. 'Ant-ridden faggots' (firewood infested with ants) attract lizards. Similarly, Ezeulu's relationship with the white man will bring trouble. Nwaka is Ezeulu's rival and opposes his influence. Options A, B, and D are not what Nwaka refers to. Therefore, option C is correct.",
      h: "Ant-ridden faggots = Ezeulu's friendship with white man (brings trouble)."
    },
    {
      yr: 2008,
      university: "UNN",
      q: "The lesson which emerges from the fate of Ezeulu is that",
      o: [
        "the will of the priest is the will of his god",
        "Christianity is superior to traditional religion",
        "no man ever won judgement against his clan",
        "Captain Winterbottom was right after all"
      ],
      a: 2,
      e: "Ezeulu's tragedy shows that an individual cannot win against his community.",
      full: "The correct answer is 'no man ever won judgement against his clan'. Ezeulu's downfall comes when he defies his community by refusing to eat the sacred yams and declare the harvest. His rigidity isolates him from his people. The novel demonstrates that even a powerful priest cannot stand against the collective will of the clan. Option A (priest's will = god's will) - Ezeulu believes this but is proven wrong. Option B (Christianity superior) - not the lesson. Option D is incorrect. Therefore, option C is the central theme.",
      h: "Ezeulu's fate = 'no man wins judgement against his clan' (community over individual)."
    },
    {
      yr: 2008,
      university: "UNN",
      q: "Ezeulu sent his son, Oduche, to join the Christians because",
      o: [
        "of his great love for the white man",
        "he had come to distrust the power of Ulu",
        "he did not want Oduche to succeed him as Chief priest",
        "he wanted a representative in the group in case they became powerful"
      ],
      a: 3,
      e: "Ezeulu sends Oduche to learn the white man's ways to have an insider.",
      full: "The correct answer is 'he wanted a representative in the group in case they became powerful'. In 'Arrow of God', Ezeulu sends his son Oduche to learn the ways of the Christians. He explains that he wants to have one of his sons inside the new system to understand it and protect the clan's interests - 'to be our eye there'. It is a strategic decision, not out of love for whites (option A), distrust of Ulu (option B), or dislike of Oduche as successor (option C). Therefore, option D is correct.",
      h: "Ezeulu sends Oduche to Christians = strategic - 'to be our eye there'."
    },
    {
      yr: 2008,
      university: "UNN",
      q: "Nwaka's hostility to Ezeulu is attributed to",
      o: [
        "his great wealth and sense of importance",
        "the rivalry between Umuueroa and Umuachala",
        "the instigation of Ezeulu's mysterious powers"
      ],
      a: 0,
      e: "Nwaka is wealthy and proud, which fuels his opposition to Ezeulu.",
      full: "The correct answer is 'his great wealth and sense of importance'. In 'Arrow of God', Nwaka is a wealthy man who resents Ezeulu's spiritual authority. His wealth gives him a sense of importance and the confidence to challenge the Chief Priest. Option B (rivalry between villages) - Nwaka is from Umuachala, Ezeulu from Umuueroa, but this is not the primary cause. Option C (Ezeulu's powers) - Nwaka doubts Ezeulu's powers. Therefore, his wealth and pride are the main drivers of his hostility.",
      h: "Nwaka's hostility = wealth + pride (challenges Ezeulu's authority)."
    },
    {
      yr: 2008,
      university: "UNN",
      q: "Kwesi Brew's 'The Dry Season' shows that",
      o: [
        "destruction is present in almost every action",
        "nature is the sole destructive force",
        "animals are the sole destructive force",
        "birds are the sole destruction force"
      ],
      a: 0,
      e: "The poem depicts destruction as pervasive in human and natural actions.",
      full: "The correct answer is 'destruction is present in almost every action'. In Kwesi Brew's poem 'The Dry Season', the poet observes that during the dry season, everything seems to lead to destruction - the sun scorches, fires break out, vegetation dies. The poem suggests that destruction is inherent in many actions, not limited to nature alone. Options B, C, and D are too narrow and absolute. Therefore, option A captures the poem's theme.",
      h: "Kwesi Brew's 'The Dry Season' = destruction pervades actions."
    },
    {
      yr: 2008,
      university: "UNN",
      q: "And we learn to sing half familiar half strange songs. We learn to dance half familiar half strange rhythms. The repetition of 'half familiar half strange' emphasizes the",
      o: [
        "songs' compositional complexity",
        "singer's weakness of perception",
        "singer's cultural problems",
        "singer's innate stupidity"
      ],
      a: 2,
      e: "The repetition highlights the cultural dislocation and hybridity experienced by the singer.",
      full: "The correct answer is 'singer's cultural problems'. The phrase 'half familiar half strange' reflects the experience of cultural hybridity, alienation, and identity confusion often faced by people caught between two cultures (e.g., through colonialism or diaspora). The songs and rhythms are neither fully familiar nor fully foreign - this in-betweenness creates cultural problems. Option A focuses on the songs rather than the singer's experience. Options B and D are incorrect. Therefore, 'singer's cultural problems' is correct.",
      h: "'Half familiar half strange' = cultural hybridity, identity confusion."
    },
    {
      yr: 2008,
      university: "UNN",
      q: "Horrors were your flowers then, the bright red Bougainvillea. The above lines from Kwesi Brew's 'The Executioner's Dream' depict the executioner's",
      o: ["attractiveness", "beauty consciousness", "gentleness", "callousness"],
      a: 3,
      e: "The executioner sees horrors as flowers - showing his callousness to violence.",
      full: "The correct answer is 'callousness'. The executioner's dream presents horrors as beautiful flowers (bright red Bougainvillea). This juxtaposition of violence ('horrors') with beauty ('flowers') reveals the executioner's emotional numbness and indifference to suffering. He has become so desensitized that he finds beauty in horror. Options A, B, and C are not supported - the line does not show attractiveness, beauty consciousness, or gentleness. Therefore, callousness is correct.",
      h: "Horrors as flowers = desensitization/callousness to violence."
    },
    {
      yr: 2008,
      university: "UNN",
      q: "J.P. Clark's 'Streamside Exchange' depicts an interplay of",
      o: [
        "anxiety and passion",
        "ignorance and wisdom",
        "excitement and passion",
        "anxiety and ignorance"
      ],
      a: 1,
      e: "The poem contrasts the child's ignorance with the bird's wisdom.",
      full: "The correct answer is 'ignorance and wisdom'. In J.P. Clark's 'Streamside Exchange', a child questions a bird about its activities. The child's naive questions represent ignorance, while the bird's responses (or lack thereof) represent a deeper wisdom about nature and existence. The poem creates an interplay between these two states. Options A, C, and D do not capture the central contrast. Therefore, 'ignorance and wisdom' is correct.",
      h: "'Streamside Exchange' = child's ignorance vs. bird's wisdom."
    }
  ],

  economics: [
    {
      yr: 2005,
      university: "UNN",
      q: "Scarcity in economics means that _____.",
      o: ["human wants are limitless", "the economy has very few resources", "the economy can scarcely produce anything", "resources are limited"],
      a: 3,
      e: "Scarcity means limited resources relative to unlimited wants.",
      full: "In economics, scarcity refers to the fundamental problem that resources are finite while human wants are infinite. Option D correctly identifies the resource limitation aspect.",
      h: "Scarcity = limited resources"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Air is essential to life but commands no price! Diamond is not essential but commands a high price! This is the paradox of _____.",
      o: ["thrift", "value", "abundance", "scarcity"],
      a: 1,
      e: "The paradox of value (diamond-water paradox) explains this.",
      full: "The diamond-water paradox (or paradox of value) questions why necessities (water) have low value while luxuries (diamonds) have high value. Answer: scarcity determines price, not usefulness. Option B is correct.",
      h: "Paradox of value = diamond-water"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Economies of scale operate only when _____.",
      o: ["marginal cost is falling with input", "average cost is falling with input", "fixed cost is variable", "variable cost is less than fixed cost"],
      a: 1,
      e: "Economies of scale occur when average cost decreases as output increases.",
      full: "Economies of scale refer to the cost advantages firms get when production becomes efficient—average cost falls as output increases. Option B is correct.",
      h: "Economies of scale = falling AC"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Efficiency in production involves _____.",
      o: ["reducing workforce size", "producing given output at lowest cost", "adopting capital-intensive technology", "increasing quantity of fixed factors"],
      a: 1,
      e: "Productive efficiency means producing at minimum cost.",
      full: "Productive efficiency occurs when a firm produces a given output at the lowest possible cost using the optimal combination of inputs. Option B is correct.",
      h: "Efficiency = lowest cost production"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "An effect of inflation is that it _____.",
      o: ["discourages barter trade", "favours debtors at expense of creditors", "increases real income of salary earners", "increases value of exports"],
      a: 1,
      e: "Inflation erodes the real value of money, benefiting borrowers.",
      full: "Inflation reduces the purchasing power of money. Borrowers (debtors) repay loans with money worth less than when borrowed, while lenders (creditors) lose. Option B is correct.",
      h: "Inflation = debtors gain, creditors lose"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The migration of young people from rural areas in Nigeria should help to raise the _____.",
      o: ["standard of living in urban areas", "total productivity of labour in rural areas", "marginal productivity of labour in rural areas", "marginal productivity of labour in urban areas"],
      a: 3,
      e: "Migration increases labour supply in cities, raising marginal productivity with capital investment.",
      full: "The question is tricky. Migration of young people increases labour supply in urban areas, which can initially lower marginal productivity, but with capital investment can raise it. Given options, migration typically raises urban labour productivity as workers find more productive jobs. Option D is correct.",
      h: "Rural-urban migration → urban labour productivity"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "A modern corporation is owned by _____.",
      o: ["debenture holders", "ordinary shareholders", "preference shareholders", "creditors"],
      a: 1,
      e: "Ordinary (common) shareholders are the true owners of a corporation.",
      full: "Ordinary shareholders are the residual owners of a corporation—they have voting rights and claim remaining profits after all obligations. Debenture holders and creditors are lenders, preference shareholders have limited ownership. Option B is correct.",
      h: "Ordinary shareholders = owners"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "One of the most important factors to be considered in the location of an industry is _____.",
      o: ["nearness to financial centre", "assured patronage by government", "availability of inputs and market", "availability of security"],
      a: 2,
      e: "Proximity to raw materials and markets is crucial for industrial location.",
      full: "Industrial location theory emphasizes access to raw materials (inputs) and proximity to consumers (market) as primary factors influencing location decisions. Option C is correct.",
      h: "Inputs + market = key location factors"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "What is the term used to describe a policy aimed at promoting the local production of goods which are usually imported?",
      o: ["deregulation", "import substitution", "tariff reduction", "backward integration"],
      a: 1,
      e: "Import substitution industrialization (ISI) promotes domestic production of formerly imported goods.",
      full: "Import substitution is an economic policy that encourages domestic production of goods that were previously imported, often through tariffs, quotas, and subsidies. Option B is correct.",
      h: "Import substitution = local production of imports"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Progressive tax structure is designed to _____.",
      o: ["take more from the poor", "take more from the rich", "take equal proportion from all", "reduce problems of tax imposition"],
      a: 1,
      e: "Progressive taxes take a higher percentage from higher incomes.",
      full: "A progressive tax system imposes a higher tax rate on higher incomes, redistributing wealth from rich to poor. Option B is correct.",
      h: "Progressive tax = rich pay higher %"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "The use of legally permissible means to reduce tax liabilities is known as tax _____.",
      o: ["evasion", "avoidance", "relief", "exemption"],
      a: 1,
      e: "Tax avoidance uses legal methods; tax evasion is illegal.",
      full: "Tax avoidance is the legal minimization of tax liability through legitimate deductions, credits, and loopholes. Tax evasion is illegal concealment of income. Option B is correct.",
      h: "Avoidance = legal, evasion = illegal"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Privatization of government-owned companies means the",
      o: ["relinquishing of government's equity to private individuals", "recapitalization of government companies", "joint participation of government and private individuals", "none of the above"],
      a: 0,
      e: "Privatization transfers ownership from public to private sector.",
      full: "Privatization involves selling state-owned enterprises to private investors, reducing government ownership. Option A is correct.",
      h: "Privatization = government sells to private"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "Gains from trade depend on",
      o: ["comparative advantage", "absolute advantage", "distributive cost advantage", "absolute cost advantage"],
      a: 0,
      e: "Comparative advantage is the basis for gains from trade.",
      full: "David Ricardo's theory of comparative advantage shows that countries gain from trade by specializing in goods where they have lower opportunity cost, even without absolute advantage. Option A is correct.",
      h: "Comparative advantage = trade gains"
    },
    {
      yr: 2005,
      university: "UNN",
      q: "A country's import price index by 1995 was 50 and her index of export price was 70, calculate the terms of trade.",
      o: ["20%", "71%", "120%", "140%"],
      a: 3,
      e: "Terms of trade = (Export Price Index / Import Price Index) × 100.",
      full: "Terms of Trade = (70/50) × 100 = 140%. This indicates favorable terms of trade—exports buy 40% more imports than before. Option D is correct.",
      h: "Terms of trade = (export/import) × 100"
    }
  ]
};
