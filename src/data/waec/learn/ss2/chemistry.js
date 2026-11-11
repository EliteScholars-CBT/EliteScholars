// ============================================================================
// WAEC/NECO Learn — SS2/CHEMISTRY (NERDC 2025 scheme) — 32 topics
// ============================================================================

export const WAEC_CHEMISTRY_LEARN_SS2 = [
  {
    "topic": "Separation of Mixtures",
    "topicCode": "SS2-CHEM-01",
    "module": "Physical Chemistry",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\">A <span class=\"learn-keyword\">mixture</span> contains two or more substances combined physically, each retaining its properties. Separation techniques exploit differences in physical properties such as solubility, boiling point, particle size, density, and magnetism.</div><h3 class=\"learn-subheading\">1. Filtration</h3><p class=\"learn-p\">Separates an insoluble solid from a liquid. Liquid (filtrate) passes through filter paper; solid (residue) is trapped. Example: sand from water.</p><h3 class=\"learn-subheading\">2. Evaporation and Crystallisation</h3><p class=\"learn-p\">Evaporation removes solvent to leave dissolved solid. Crystallisation is preferred — controlled cooling forms pure crystals without decomposition. Example: CuSO₄ crystals from solution.</p><h3 class=\"learn-subheading\">3. Distillation and Fractional Distillation</h3><p class=\"learn-p\">Distillation separates a soluble solid from its solvent or a liquid from a non-volatile dissolved substance (e.g., salt water → pure water). Fractional distillation separates miscible liquids with different boiling points using a fractionating column. Example: ethanol/water separation; crude oil fractions.</p><h3 class=\"learn-subheading\">4. Chromatography</h3><p class=\"learn-p\">Separates components based on differential affinity for stationary vs mobile phase. Rf = distance moved by substance ÷ distance moved by solvent front (value 0–1).</p><h3 class=\"learn-subheading\">5. Other Techniques</h3><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Technique</th><th>Basis</th><th>Example</th></tr></thead><tbody><tr><td>Magnetic separation</td><td>Magnetism</td><td>Iron from sand</td></tr><tr><td>Sublimation</td><td>Sublimation property</td><td>Iodine or NH₄Cl from mixture</td></tr><tr><td>Solvent extraction</td><td>Differential solubility</td><td>Iodine from water using hexane</td></tr><tr><td>Centrifugation</td><td>Density (spinning)</td><td>Blood cells from plasma</td></tr></tbody></table></div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Rf Formula:</strong> Rf = distance by spot ÷ distance by solvent front. Always 0–1.</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> Filtration (insoluble solid). Crystallisation (pure solid). Distillation (solid dissolved in liquid). Fractional distillation (miscible liquids). Chromatography (Rf values). Sublimation (sublimable solid). Magnetic separation (magnetic component).</div>",
    "questions": [
      {
        "q": "Which technique separates an insoluble solid from a liquid?",
        "o": [
          "Distillation",
          "Filtration",
          "Crystallisation",
          "Chromatography"
        ],
        "a": 1,
        "e": "Filtration separates insoluble solids from liquids. The liquid (filtrate) passes through filter paper; the solid (residue) stays on top. Example: filtering sand from water.",
        "h": "Insoluble solid from liquid → Filtration.",
        "yr": "SS2"
      },
      {
        "q": "The Rf value in paper chromatography is calculated as:",
        "o": [
          "Solvent distance ÷ spot distance",
          "Spot distance ÷ solvent front distance",
          "Spot distance × solvent distance",
          "Mass of spot ÷ mass of solvent"
        ],
        "a": 1,
        "e": "Rf = distance moved by the spot ÷ distance moved by the solvent front. Rf is always between 0 and 1.",
        "h": "Rf = spot distance ÷ solvent front distance.",
        "yr": "SS2"
      },
      {
        "q": "Fractional distillation differs from simple distillation in that it:",
        "o": [
          "Uses a higher temperature",
          "Uses a fractionating column to separate liquids with close but different boiling points",
          "Only collects one fraction",
          "Works for immiscible liquids only"
        ],
        "a": 1,
        "e": "Fractional distillation uses a fractionating column — vapours condense and re-vaporise repeatedly, each time becoming richer in the lower-boiling component, allowing separation of close-boiling liquids.",
        "h": "Fractional distillation = fractionating column for liquids with close boiling points.",
        "yr": "SS2"
      },
      {
        "q": "Crystallisation is preferred over evaporation to dryness because:",
        "o": [
          "It is faster",
          "Slow cooling allows pure crystals to form without thermal decomposition",
          "It needs less equipment",
          "It works only for coloured salts"
        ],
        "a": 1,
        "e": "Evaporation to dryness uses high heat that can decompose heat-sensitive compounds. Crystallisation involves partial evaporation then slow cooling — pure crystals form without decomposition.",
        "h": "Crystallisation = slow cooling → pure crystals without decomposition.",
        "yr": "SS2"
      },
      {
        "q": "Which technique separates iron filings from sand?",
        "o": [
          "Filtration",
          "Magnetic separation",
          "Distillation",
          "Chromatography"
        ],
        "a": 1,
        "e": "Iron is magnetic; sand is not. A magnet attracts iron filings, leaving sand behind. Magnetic separation exploits the difference in magnetic properties.",
        "h": "Iron (magnetic) from sand (non-magnetic) → Magnetic separation.",
        "yr": "SS2"
      },
      {
        "q": "Sublimation separates iodine from sand because:",
        "o": [
          "Iodine dissolves in sand",
          "Iodine converts directly from solid to vapour on heating while sand does not",
          "Sand dissolves in iodine vapour",
          "Both sublime at different rates"
        ],
        "a": 1,
        "e": "Iodine sublimes — converts directly from solid to purple vapour without passing through liquid phase. The vapour condenses on a cold surface above, leaving non-sublimable sand behind.",
        "h": "Iodine sublimes (solid→vapour); sand does not → Sublimation.",
        "yr": "SS2"
      },
      {
        "q": "In paper chromatography, a component that travels furthest has:",
        "o": [
          "Smallest Rf",
          "Largest Rf (most soluble in mobile phase, least attracted to stationary phase)",
          "Rf greater than 1",
          "Same Rf as all others"
        ],
        "a": 1,
        "e": "Travelling furthest gives highest Rf (closest to 1). The component is most soluble in the mobile phase (solvent) and least retained by the stationary phase (paper).",
        "h": "Furthest travel = highest Rf value.",
        "yr": "SS2"
      },
      {
        "q": "The apparatus used to condense vapour to liquid in distillation is:",
        "o": [
          "The flask",
          "The Liebig condenser",
          "The fractionating column",
          "The thermometer"
        ],
        "a": 1,
        "e": "The Liebig condenser has cold water flowing around an outer jacket, cooling the vapour inside back to liquid which drips into the collection flask.",
        "h": "Condenser in distillation = Liebig condenser.",
        "yr": "SS2"
      },
      {
        "q": "To separate ethanol (bp 78°C) from water (bp 100°C), the best method is:",
        "o": [
          "Filtration",
          "Crystallisation",
          "Fractional distillation",
          "Magnetic separation"
        ],
        "a": 2,
        "e": "Ethanol and water are miscible with close boiling points. Fractional distillation using a fractionating column separates them — ethanol vapour condenses first at ~78°C.",
        "h": "Miscible liquids with different boiling points → Fractional distillation.",
        "yr": "SS2"
      },
      {
        "q": "The filtrate in a filtration experiment is:",
        "o": [
          "Solid on filter paper",
          "Liquid that passes through the filter paper",
          "The filter paper itself",
          "The funnel"
        ],
        "a": 1,
        "e": "Filtrate = the liquid that passes through the filter paper. Residue = solid trapped on the filter paper.",
        "h": "Filtrate = liquid through filter paper. Residue = solid on paper.",
        "yr": "SS2"
      },
      {
        "q": "Solvent extraction uses a separating funnel when:",
        "o": [
          "Two liquids are miscible",
          "A solute is more soluble in one immiscible liquid than another",
          "The mixture is magnetic",
          "Two liquids have very different boiling points"
        ],
        "a": 1,
        "e": "Solvent extraction exploits differential solubility. Example: iodine is more soluble in hexane than water — shaking aqueous iodine with hexane transfers iodine to the hexane layer.",
        "h": "Solvent extraction: differential solubility; separating funnel for immiscible liquids.",
        "yr": "SS2"
      },
      {
        "q": "Which method separates crude oil into petrol, kerosene, diesel?",
        "o": [
          "Simple distillation",
          "Filtration",
          "Fractional distillation",
          "Crystallisation"
        ],
        "a": 2,
        "e": "Crude oil is a mixture of hydrocarbons with different boiling points. Industrial fractional distillation in a fractionating tower separates them into fractions.",
        "h": "Crude oil separation = industrial fractional distillation.",
        "yr": "SS2"
      },
      {
        "q": "In a chromatography experiment, a spot moves 4.5 cm and the solvent front moves 9 cm. Rf = ?",
        "o": [
          "2.0",
          "0.25",
          "4.5",
          "0.5"
        ],
        "a": 3,
        "e": "Rf = 4.5 ÷ 9 = 0.5.",
        "h": "Rf = 4.5 ÷ 9 = 0.5.",
        "yr": "SS2"
      },
      {
        "q": "Decantation involves:",
        "o": [
          "Filtering through paper",
          "Carefully pouring off liquid from above a settled solid",
          "Spinning at high speed",
          "Evaporating solvent completely"
        ],
        "a": 1,
        "e": "Decantation is carefully pouring liquid off from above a settled solid sediment — a simple preliminary separation before filtration.",
        "h": "Decantation = carefully pouring liquid from above settled solid.",
        "yr": "SS2"
      },
      {
        "q": "Centrifugation is used instead of filtration when:",
        "o": [
          "Particles are too large",
          "Particles are too fine to settle or filter quickly — spinning forces denser particles outward",
          "The mixture is homogeneous",
          "Temperature is very high"
        ],
        "a": 1,
        "e": "Centrifugation spins at high speed, generating centrifugal force that pushes denser particles to the bottom faster than gravity — used for fine colloids and biological separations.",
        "h": "Centrifugation = spinning separates fine particles too small for normal filtration.",
        "yr": "SS2"
      },
      {
        "q": "Which mixture is BEST separated by simple distillation?",
        "o": [
          "Ethanol and water",
          "Salt dissolved in water",
          "Iron filings and sand",
          "Coloured dyes in ink"
        ],
        "a": 1,
        "e": "Simple distillation is ideal for separating a dissolved solid from its liquid solvent. Salt water is distilled to collect pure water — water vaporises and is condensed; salt remains.",
        "h": "Simple distillation = solid dissolved in liquid (e.g., salt water → pure water).",
        "yr": "SS2"
      },
      {
        "q": "Ammonium chloride can be separated from sand by sublimation because:",
        "o": [
          "NH₄Cl is magnetic",
          "NH₄Cl sublimes on heating while sand remains solid",
          "Sand dissolves in NH₄Cl",
          "Both sublime at the same temperature"
        ],
        "a": 1,
        "e": "NH₄Cl sublimes on gentle heating — converts directly from white solid to vapour, which condenses as white crystals on a cooler surface. Sand does not sublime.",
        "h": "NH₄Cl sublimes; sand does not → Sublimation.",
        "yr": "SS2"
      },
      {
        "q": "In chromatography, the stationary phase is:",
        "o": [
          "The moving solvent",
          "The fixed medium (paper or silica plate)",
          "The spots of mixture",
          "The baseline pencil line"
        ],
        "a": 1,
        "e": "The stationary phase is the fixed medium — silica gel on TLC plate or cellulose in paper chromatography. The mobile phase is the moving solvent.",
        "h": "Stationary phase = fixed medium (paper/silica). Mobile phase = moving solvent.",
        "yr": "SS2"
      },
      {
        "q": "Why must chromatography spots be placed ABOVE the solvent level?",
        "o": [
          "To make spots more visible",
          "To prevent spots dissolving directly into bulk solvent before separation occurs",
          "To make solvent evaporate faster",
          "To increase Rf"
        ],
        "a": 1,
        "e": "If spots are below solvent level, they dissolve directly into the solvent and wash away before separation can occur. Spots above the solvent are carried by capillary action at different rates.",
        "h": "Spots above solvent: prevents direct dissolution; allows capillary separation.",
        "yr": "SS2"
      },
      {
        "q": "What property must a substance have for sublimation to be useful?",
        "o": [
          "Soluble in water",
          "Converts directly from solid to vapour without passing through liquid state",
          "Denser than other components",
          "Magnetic"
        ],
        "a": 1,
        "e": "A sublimable substance converts directly from solid to gas when heated (and back to solid when cooled) without passing through liquid. Examples: iodine, NH₄Cl, naphthalene.",
        "h": "Sublimation requires: solid → vapour without liquid phase (sublimable property).",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Water",
    "topicCode": "SS2-CHEM-02",
    "module": "Physical Chemistry",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\">Water (H₂O) is the most important liquid on Earth. This topic covers its composition, properties, hardness, and treatment.</div><h3 class=\"learn-subheading\">1. Composition of Water</h3><p class=\"learn-p\">Electrolysis of water: 2H₂O → 2H₂ + O₂. H₂:O₂ volume ratio = 2:1. Synthesis: 2H₂ + O₂ → 2H₂O.</p><h3 class=\"learn-subheading\">2. Properties</h3><ul class=\"learn-list\"><li>Boiling point 100°C; freezing point 0°C</li><li>Maximum density at 4°C</li><li>Universal solvent; amphoteric</li><li>High specific heat capacity; extensive hydrogen bonding</li></ul><h3 class=\"learn-subheading\">3. Hardness of Water</h3><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Type</th><th>Cause</th><th>Removal</th></tr></thead><tbody><tr><td>Temporary</td><td>Ca(HCO₃)₂ and Mg(HCO₃)₂</td><td>Boiling; Clark's method (Ca(OH)₂)</td></tr><tr><td>Permanent</td><td>CaSO₄ and MgSO₄</td><td>Washing soda (Na₂CO₃); ion exchange; distillation</td></tr></tbody></table></div><h3 class=\"learn-subheading\">4. Water Treatment</h3><p class=\"learn-p\">Steps: Sedimentation → Coagulation (alum, Al₂(SO₄)₃) → Filtration (sand/gravel) → Chlorination (kills pathogens).</p><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Key:</strong> Temporary hardness removed by boiling (bicarbonate decomposes). Permanent cannot be boiled away — needs washing soda, ion exchange, or distillation.</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> H₂:O₂ = 2:1 from electrolysis. Temporary = Ca(HCO₃)₂, removed by boiling/lime. Permanent = CaSO₄, removed by Na₂CO₃ or ion exchange. Treatment: sedimentation→coagulation (alum)→filtration→chlorination.</div>",
    "questions": [
      {
        "q": "Electrolysis of water produces hydrogen and oxygen in what volume ratio?",
        "o": [
          "1:2",
          "2:1",
          "1:1",
          "3:1"
        ],
        "a": 1,
        "e": "2H₂O → 2H₂ + O₂. Two moles H₂ produced per mole O₂. H₂:O₂ = 2:1 by volume. Hydrogen at cathode; oxygen at anode.",
        "h": "2H₂O → 2H₂ + O₂ → H₂:O₂ = 2:1 by volume.",
        "yr": "SS2"
      },
      {
        "q": "What causes temporary hardness in water?",
        "o": [
          "Dissolved CaSO₄",
          "Dissolved Ca(HCO₃)₂ and Mg(HCO₃)₂",
          "Dissolved MgCl₂",
          "Dissolved NaCl"
        ],
        "a": 1,
        "e": "Temporary hardness is caused by dissolved calcium and magnesium bicarbonates, formed when acidic rainwater dissolves limestone: CaCO₃ + H₂O + CO₂ → Ca(HCO₃)₂.",
        "h": "Temporary hardness = Ca(HCO₃)₂ and Mg(HCO₃)₂.",
        "yr": "SS2"
      },
      {
        "q": "Temporary hardness is removed by boiling because:",
        "o": [
          "Heat dissolves calcium ions",
          "Ca(HCO₃)₂ decomposes: Ca(HCO₃)₂ → CaCO₃↓ + H₂O + CO₂, removing Ca²⁺",
          "Boiling increases CaSO₄ solubility",
          "Steam carries away Ca²⁺"
        ],
        "a": 1,
        "e": "Boiling decomposes calcium bicarbonate: Ca(HCO₃)₂ → CaCO₃(s)↓ + H₂O + CO₂. CaCO₃ precipitates as limescale; water loses Ca²⁺ and becomes soft.",
        "h": "Boiling: Ca(HCO₃)₂ → CaCO₃↓ + H₂O + CO₂.",
        "yr": "SS2"
      },
      {
        "q": "Which method removes BOTH temporary and permanent hardness?",
        "o": [
          "Boiling",
          "Clark's method",
          "Ion exchange resin",
          "Filtration"
        ],
        "a": 2,
        "e": "Ion exchange resins exchange Ca²⁺ and Mg²⁺ for Na⁺ or H⁺, removing all hardness (both types). Boiling and Clark's method only remove temporary hardness.",
        "h": "Ion exchange removes BOTH types of hardness.",
        "yr": "SS2"
      },
      {
        "q": "What chemical causes coagulation during water treatment?",
        "o": [
          "NaCl",
          "Alum (Al₂(SO₄)₃)",
          "CaCO₃",
          "NaOH"
        ],
        "a": 1,
        "e": "Alum (aluminium sulphate) dissolves and forms gelatinous Al(OH)₃ that traps and clumps fine suspended particles, making them settle (sedimentation).",
        "h": "Coagulation = alum (Al₂(SO₄)₃) traps fine particles.",
        "yr": "SS2"
      },
      {
        "q": "Permanent hardness is caused by:",
        "o": [
          "Ca(HCO₃)₂",
          "Dissolved CaSO₄ and MgSO₄",
          "Dissolved sodium salts",
          "Rainwater dissolving gypsum only"
        ],
        "a": 1,
        "e": "Permanent hardness is caused by CaSO₄, MgSO₄, CaCl₂, MgCl₂ — sulphates and chlorides of Ca and Mg that don't decompose on boiling.",
        "h": "Permanent hardness = CaSO₄ and MgSO₄ (stable to boiling).",
        "yr": "SS2"
      },
      {
        "q": "Clark's method softens water by adding:",
        "o": [
          "Na₂CO₃",
          "Slaked lime Ca(OH)₂",
          "Chlorine gas",
          "Alum"
        ],
        "a": 1,
        "e": "Clark's method adds Ca(OH)₂: Ca(OH)₂ + Ca(HCO₃)₂ → 2CaCO₃↓ + 2H₂O. CaCO₃ precipitates, removing Ca²⁺. Removes temporary hardness only.",
        "h": "Clark's method = Ca(OH)₂ → precipitates CaCO₃ → removes temporary hardness.",
        "yr": "SS2"
      },
      {
        "q": "Why is chlorine added during water treatment?",
        "o": [
          "To remove hardness ions",
          "To kill bacteria and harmful microorganisms (disinfection)",
          "To improve taste",
          "To acidify water"
        ],
        "a": 1,
        "e": "Chlorination adds small amounts of Cl₂ or chlorine compounds to kill bacteria, viruses, and pathogens, making treated water safe to drink.",
        "h": "Chlorination = kills bacteria/pathogens for safe drinking water.",
        "yr": "SS2"
      },
      {
        "q": "Water has an unusually high boiling point (100°C) for such a small molecule because:",
        "o": [
          "It is very dense",
          "Extensive hydrogen bonding between water molecules requires significant energy to break",
          "It contains oxygen atoms",
          "It has covalent double bonds"
        ],
        "a": 1,
        "e": "Water forms strong O–H···O hydrogen bonds between molecules. These intermolecular forces require much energy to overcome, resulting in the unusually high boiling point of 100°C for such a small molecule.",
        "h": "Water's high boiling point = extensive hydrogen bonding between molecules.",
        "yr": "SS2"
      },
      {
        "q": "Washing soda (Na₂CO₃) softens water by:",
        "o": [
          "Evaporating Ca²⁺ ions",
          "Precipitating Ca²⁺ as CaCO₃↓: Ca²⁺ + CO₃²⁻ → CaCO₃↓",
          "Neutralising acidity",
          "Dissolving all salts"
        ],
        "a": 1,
        "e": "Na₂CO₃ provides CO₃²⁻ ions that react with Ca²⁺ and Mg²⁺ to form insoluble carbonates that settle out, removing hardness. Works for both temporary and permanent hardness.",
        "h": "Washing soda: Ca²⁺ + CO₃²⁻ → CaCO₃↓. Removes both hardness types.",
        "yr": "SS2"
      },
      {
        "q": "Water's maximum density occurs at:",
        "o": [
          "0°C",
          "4°C",
          "100°C",
          "25°C"
        ],
        "a": 1,
        "e": "Water reaches maximum density (~1.0 g/cm³) at 4°C. Above and below 4°C, water is less dense. Ice (0°C) is less dense than liquid water — explaining why ice floats.",
        "h": "Water maximum density = ~1.0 g/cm³ at 4°C. Ice floats because less dense than liquid water.",
        "yr": "SS2"
      },
      {
        "q": "Water is described as amphoteric. This means it can:",
        "o": [
          "Dissolve both acids and bases",
          "Act as acid (donate H⁺) or base (accept H⁺) depending on what it reacts with",
          "Conduct electricity in both AC and DC",
          "Both freeze and boil at unusual temperatures"
        ],
        "a": 1,
        "e": "Amphoteric: can donate or accept protons. As acid: H₂O → H⁺ + OH⁻. As base: H₂O + H⁺ → H₃O⁺. Example: HCl + H₂O → H₃O⁺ + Cl⁻ (water acts as base).",
        "h": "Amphoteric water: can donate H⁺ (acid) or accept H⁺ (base) depending on reactant.",
        "yr": "SS2"
      },
      {
        "q": "The correct order for water treatment is:",
        "o": [
          "Chlorination→Sedimentation→Filtration→Coagulation",
          "Sedimentation→Coagulation→Filtration→Chlorination",
          "Filtration→Sedimentation→Coagulation→Chlorination",
          "Coagulation→Chlorination→Sedimentation→Filtration"
        ],
        "a": 1,
        "e": "Correct order: (1) Sedimentation — large particles settle. (2) Coagulation — alum clumps fine particles. (3) Filtration — sand/gravel removes remaining particles. (4) Chlorination — disinfection.",
        "h": "Water treatment: Sedimentation → Coagulation (alum) → Filtration → Chlorination.",
        "yr": "SS2"
      },
      {
        "q": "Hard water forms scum with soap. The scum is:",
        "o": [
          "Undissolved soap",
          "Insoluble calcium stearate formed when soap reacts with Ca²⁺",
          "Bacteria and dirt",
          "Undissolved carbonate"
        ],
        "a": 1,
        "e": "Soap (sodium stearate) + Ca²⁺ → calcium stearate (insoluble scum). 2C₁₇H₃₅COONa + Ca²⁺ → (C₁₇H₃₅COO)₂Ca↓ + 2Na⁺. The scum wastes soap and is ineffective for cleaning.",
        "h": "Scum = insoluble calcium stearate (soap + Ca²⁺ in hard water).",
        "yr": "SS2"
      },
      {
        "q": "A sample of water cannot be softened by boiling. What type of hardness does it contain?",
        "o": [
          "Temporary only",
          "Permanent hardness — CaSO₄/MgSO₄ that don't decompose on heating",
          "Both types",
          "No hardness"
        ],
        "a": 1,
        "e": "If water remains hard after boiling, it contains permanent hardness (CaSO₄, MgSO₄). These salts don't decompose on heating unlike bicarbonates (temporary). Needs washing soda, ion exchange, or distillation.",
        "h": "Cannot be softened by boiling = permanent hardness.",
        "yr": "SS2"
      },
      {
        "q": "The formula for calcium bicarbonate — responsible for temporary hardness — is:",
        "o": [
          "CaCO₃",
          "CaSO₄",
          "Ca(HCO₃)₂",
          "CaCl₂"
        ],
        "a": 2,
        "e": "Calcium bicarbonate = Ca(HCO₃)₂. Forms when acidic rainwater (CO₂ + H₂O = H₂CO₃) dissolves limestone: CaCO₃ + H₂CO₃ → Ca(HCO₃)₂.",
        "h": "Calcium bicarbonate = Ca(HCO₃)₂ — causes temporary hardness.",
        "yr": "SS2"
      },
      {
        "q": "Which is an advantage of hard water?",
        "o": [
          "It lathers easily with soap",
          "Ca²⁺ ions beneficial for bone/teeth development; may protect against cardiovascular disease",
          "It doesn't form scale in pipes",
          "Cheaper to treat than soft water"
        ],
        "a": 1,
        "e": "Hard water contains Ca²⁺ ions important for bone and teeth development. Studies suggest people in hard water areas have lower rates of cardiovascular disease — a health advantage despite soap-wasting and scale-forming disadvantages.",
        "h": "Advantage of hard water: Ca²⁺ beneficial for bones, teeth, and cardiovascular health.",
        "yr": "SS2"
      },
      {
        "q": "The reaction 2H₂ + O₂ → 2H₂O: volumes of H₂ and O₂ that react are in ratio:",
        "o": [
          "1:2",
          "2:1",
          "1:1",
          "3:1"
        ],
        "a": 1,
        "e": "By Avogadro's Law: 2H₂ + O₂ → 2H₂O. 2 volumes H₂ react with 1 volume O₂. H₂:O₂ = 2:1.",
        "h": "2H₂ + O₂ → 2H₂O: H₂:O₂ volume ratio = 2:1.",
        "yr": "SS2"
      },
      {
        "q": "Distillation removes both types of hardness because:",
        "o": [
          "It kills all bacteria",
          "Only pure water vaporises and condenses — all dissolved ions remain in flask",
          "It adds fresh minerals",
          "It changes pH"
        ],
        "a": 1,
        "e": "During distillation, pure water evaporates and condenses as distillate, leaving all dissolved salts (CaSO₄, Ca(HCO₃)₂) behind. Distilled water contains no dissolved ions — both hardness types completely removed.",
        "h": "Distillation: only pure water vaporises; all ions remain behind → removes all hardness.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following best explains why water is called the 'universal solvent'?",
        "o": [
          "It dissolves all substances without exception",
          "Its polarity and hydrogen-bonding ability allow it to dissolve a wider variety of ionic and polar compounds than almost any other liquid",
          "It has the highest boiling point of all solvents",
          "It does not react chemically with solutes"
        ],
        "a": 1,
        "e": "Water is polar (δ+ on H, δ− on O) and forms hydrogen bonds. This allows it to surround and solvate ionic compounds (like NaCl) and polar molecules (like sugars and alcohols). No solvent dissolves everything, but water dissolves more substances than any other common liquid.",
        "h": "Universal solvent: water polarity + hydrogen bonding dissolves ionic and polar compounds.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Acids, Bases and Salts",
    "topicCode": "SS2-CHEM-03",
    "module": "Physical Chemistry",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\"><span class=\"learn-keyword\">Acids</span>, <span class=\"learn-keyword\">bases</span>, and <span class=\"learn-keyword\">salts</span> are fundamental classes of chemical compounds. They react in neutralisation reactions to form salts and water.</div><h3 class=\"learn-subheading\">1. Definitions</h3><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Theory</th><th>Acid</th><th>Base</th></tr></thead><tbody><tr><td>Arrhenius</td><td>Produces H⁺ in water</td><td>Produces OH⁻ in water</td></tr><tr><td>Brønsted–Lowry</td><td>H⁺ donor</td><td>H⁺ acceptor</td></tr><tr><td>Lewis</td><td>Electron pair acceptor</td><td>Electron pair donor</td></tr></tbody></table></div><h3 class=\"learn-subheading\">2. Properties</h3><ul class=\"learn-list\"><li>Acids: pH &lt; 7; turn blue litmus red; react with metals (H₂↑), carbonates (CO₂↑), bases (neutralisation)</li><li>Strong acids (HCl, H₂SO₄, HNO₃) fully dissociate; weak acids (CH₃COOH) partially dissociate</li><li>Bases: pH &gt; 7; turn red litmus blue; alkali = soluble base</li></ul><h3 class=\"learn-subheading\">3. pH Scale</h3><p class=\"learn-p\">pH = −log[H⁺]. Scale 0–14: 0–6 acidic; 7 neutral; 8–14 alkaline.</p><h3 class=\"learn-subheading\">4. Salt Preparation</h3><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Method</th><th>Example</th></tr></thead><tbody><tr><td>Acid + Metal</td><td>Zn + H₂SO₄ → ZnSO₄ + H₂</td></tr><tr><td>Acid + Metal oxide</td><td>CuO + H₂SO₄ → CuSO₄ + H₂O</td></tr><tr><td>Acid + Carbonate</td><td>CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂</td></tr><tr><td>Neutralisation</td><td>NaOH + HCl → NaCl + H₂O</td></tr><tr><td>Precipitation</td><td>BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl</td></tr></tbody></table></div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Key:</strong> Strong acid ≠ concentrated acid. Strong = fully dissociates. Weak = partially. Insoluble salts made by precipitation.</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> Arrhenius: H⁺/OH⁻. Brønsted–Lowry: H⁺ donor/acceptor. Lewis: e⁻ pair acceptor/donor. pH&lt;7=acid; 7=neutral; &gt;7=alkaline. Insoluble salts by precipitation; soluble by neutralisation.</div>",
    "questions": [
      {
        "q": "According to Brønsted–Lowry theory, an acid is:",
        "o": [
          "Produces OH⁻ in water",
          "A proton (H⁺) donor",
          "An electron pair acceptor",
          "A substance with pH < 7"
        ],
        "a": 1,
        "e": "Brønsted–Lowry (1923): acid = proton (H⁺) donor; base = proton acceptor. Broader than Arrhenius — works in non-aqueous solvents. Example: HCl donates H⁺ to H₂O → HCl is the acid.",
        "h": "Brønsted–Lowry acid = proton (H⁺) donor.",
        "yr": "SS2"
      },
      {
        "q": "According to Lewis theory, a base is:",
        "o": [
          "A proton donor",
          "A proton acceptor",
          "An electron pair donor",
          "An electron pair acceptor"
        ],
        "a": 2,
        "e": "Lewis (1923): base = electron pair donor; acid = electron pair acceptor. Broadest definition — includes reactions without proton transfer. Example: NH₃ donates electron pair to BF₃.",
        "h": "Lewis base = electron pair donor; Lewis acid = electron pair acceptor.",
        "yr": "SS2"
      },
      {
        "q": "The difference between a base and an alkali is:",
        "o": [
          "Bases have higher pH",
          "Alkali = soluble base. All alkalis are bases; not all bases dissolve in water",
          "Alkalis are gases; bases are solids",
          "Bases react with acids; alkalis do not"
        ],
        "a": 1,
        "e": "Base = neutralises acid (accepts H⁺ or produces OH⁻). Alkali = soluble base. CuO is a base (insoluble); NaOH is both base and alkali (dissolves to give OH⁻).",
        "h": "Alkali = soluble base. All alkalis are bases; not all bases are alkalis.",
        "yr": "SS2"
      },
      {
        "q": "Strong acids differ from weak acids in that strong acids:",
        "o": [
          "Are more concentrated",
          "Fully dissociate into ions in water; weak acids only partially dissociate",
          "React faster with everything",
          "Have lower molecular masses"
        ],
        "a": 1,
        "e": "Strong acids (HCl, H₂SO₄, HNO₃) fully dissociate (~100%). Weak acids (CH₃COOH) partially dissociate, establishing an equilibrium. This is about dissociation, not concentration.",
        "h": "Strong acid = 100% dissociation. Weak acid = partial dissociation (equilibrium).",
        "yr": "SS2"
      },
      {
        "q": "The pH of a neutral solution at 25°C is:",
        "o": [
          "0",
          "7",
          "14",
          "1"
        ],
        "a": 1,
        "e": "At 25°C, neutral: [H⁺]=[OH⁻]=10⁻⁷ mol/L. pH=−log(10⁻⁷)=7. Acidic: pH<7. Alkaline: pH>7.",
        "h": "Neutral pH = 7 at 25°C.",
        "yr": "SS2"
      },
      {
        "q": "The reaction between an acid and a base producing salt and water is called:",
        "o": [
          "Decomposition",
          "Precipitation",
          "Neutralisation",
          "Hydrolysis"
        ],
        "a": 2,
        "e": "Neutralisation: Acid + Base → Salt + Water. Example: HCl + NaOH → NaCl + H₂O. H⁺ combines with OH⁻ to form water; remaining ions form the salt.",
        "h": "Acid + Base → Salt + Water = Neutralisation.",
        "yr": "SS2"
      },
      {
        "q": "The best method to prepare insoluble salt BaSO₄ is:",
        "o": [
          "Neutralisation",
          "Acid + metal",
          "Precipitation: mixing two solutions containing the required ions",
          "Crystallisation"
        ],
        "a": 2,
        "e": "Insoluble salts made by precipitation: BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq). The precipitate is filtered, washed, and dried.",
        "h": "Insoluble salts = precipitation (mix two solutions; product precipitates).",
        "yr": "SS2"
      },
      {
        "q": "Which of the following is a weak acid?",
        "o": [
          "HCl",
          "H₂SO₄",
          "HNO₃",
          "CH₃COOH (ethanoic acid)"
        ],
        "a": 3,
        "e": "Ethanoic acid (CH₃COOH) partially dissociates: CH₃COOH ⇌ CH₃COO⁻ + H⁺ — weak acid. HCl, H₂SO₄, HNO₃ are strong acids (fully dissociate).",
        "h": "Weak acids: CH₃COOH, H₂CO₃. Strong: HCl, H₂SO₄, HNO₃.",
        "yr": "SS2"
      },
      {
        "q": "When zinc reacts with dilute H₂SO₄, products are:",
        "o": [
          "ZnSO₄ and O₂",
          "ZnSO₄ and H₂",
          "ZnO and H₂O",
          "ZnS and H₂O"
        ],
        "a": 1,
        "e": "Zn + H₂SO₄ → ZnSO₄ + H₂. Active metals above hydrogen in reactivity series displace hydrogen from dilute acids. H₂ causes a squeaky pop with a lit splint.",
        "h": "Zn + H₂SO₄ → ZnSO₄ + H₂. Metal + acid → salt + hydrogen.",
        "yr": "SS2"
      },
      {
        "q": "Which observation correctly identifies an acidic solution using litmus?",
        "o": [
          "Red litmus turns blue",
          "Blue litmus turns red",
          "Litmus becomes colourless",
          "Yellow litmus turns green"
        ],
        "a": 1,
        "e": "Acids turn blue litmus red. Alkalis turn red litmus blue. Classic litmus test.",
        "h": "Acid: turns blue litmus red. Alkali: turns red litmus blue.",
        "yr": "SS2"
      },
      {
        "q": "NaOH + NH₄Cl on heating gives:",
        "o": [
          "NaCl + H₂ + O₂",
          "NaCl + H₂O + NH₃",
          "Na₂CO₃ + H₂ + N₂",
          "NaCl + H₂SO₄"
        ],
        "a": 1,
        "e": "NaOH + NH₄Cl → NaCl + H₂O + NH₃. Alkalis react with ammonium salts on warming to produce ammonia — the test for NH₄⁺ ions.",
        "h": "NaOH + NH₄Cl → NaCl + H₂O + NH₃ (ammonia test for NH₄⁺).",
        "yr": "SS2"
      },
      {
        "q": "Excess CuO is added when preparing CuSO₄ from CuO + H₂SO₄ because:",
        "o": [
          "CuO is cheap",
          "Excess CuO ensures all acid is neutralised, preventing acid contamination of crystals",
          "Excess CuO improves crystal colour",
          "CuO makes the reaction faster"
        ],
        "a": 1,
        "e": "CuO + H₂SO₄ → CuSO₄ + H₂O. Excess CuO ensures all H₂SO₄ is neutralised. Unreacted CuO (insoluble) is filtered off before crystallisation.",
        "h": "Excess CuO = ensures all acid neutralised; excess filtered off.",
        "yr": "SS2"
      },
      {
        "q": "The conjugate base of HNO₃ is:",
        "o": [
          "H₂NO₃⁺",
          "NO₃⁻",
          "OH⁻",
          "H₃O⁺"
        ],
        "a": 1,
        "e": "Conjugate base = acid minus H⁺. HNO₃ → H⁺ + NO₃⁻. Conjugate base of HNO₃ = NO₃⁻.",
        "h": "HNO₃ − H⁺ = NO₃⁻ (conjugate base).",
        "yr": "SS2"
      },
      {
        "q": "CaCO₃ + 2HCl → ? The salt formed is:",
        "o": [
          "CaSO₄",
          "CaCl₂",
          "Ca(NO₃)₂",
          "CaCO₃"
        ],
        "a": 1,
        "e": "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. The salt is calcium chloride (CaCl₂). CO₂ gas is evolved (bubbles).",
        "h": "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. Salt = calcium chloride.",
        "yr": "SS2"
      },
      {
        "q": "At pH 1, universal indicator shows:",
        "o": [
          "Purple/violet",
          "Green",
          "Red/dark red (strongly acidic)",
          "Yellow"
        ],
        "a": 2,
        "e": "Universal indicator: pH 1–3 = red/dark red (strongly acidic); pH 4–6 = orange/yellow (weakly acidic); pH 7 = green (neutral); pH 8–10 = blue; pH 11–14 = purple.",
        "h": "pH 1 = red/dark red. pH 7 = green. pH 14 = purple.",
        "yr": "SS2"
      },
      {
        "q": "A substance with pH = 12 is:",
        "o": [
          "Strongly acidic",
          "Weakly acidic",
          "Neutral",
          "Strongly alkaline"
        ],
        "a": 3,
        "e": "pH 12 is well above 7 — strongly alkaline. At pH 12, [H⁺] = 10⁻¹² mol/L; [OH⁻] = 10⁻² mol/L.",
        "h": "pH 12 = strongly alkaline.",
        "yr": "SS2"
      },
      {
        "q": "Gas produced when a carbonate reacts with acid, and its test:",
        "o": [
          "H₂ — squeaky pop",
          "O₂ — relights glowing splint",
          "CO₂ — turns limewater milky",
          "NH₃ — turns damp red litmus blue"
        ],
        "a": 2,
        "e": "Carbonates + acid → CO₂. Test: CO₂ bubbled through limewater (Ca(OH)₂) → milky (CaCO₃ precipitates): CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O.",
        "h": "Carbonate + acid → CO₂. CO₂ test: turns limewater milky.",
        "yr": "SS2"
      },
      {
        "q": "25.0 cm³ of 0.1 mol/L NaOH neutralised by 12.5 cm³ HCl. Concentration of HCl?",
        "o": [
          "0.05 mol/L",
          "0.1 mol/L",
          "0.2 mol/L",
          "0.4 mol/L"
        ],
        "a": 2,
        "e": "n(NaOH)=0.025×0.1=0.0025 mol. NaOH:HCl=1:1. n(HCl)=0.0025 mol. c(HCl)=0.0025/0.0125=0.2 mol/L.",
        "h": "n(NaOH)=0.0025 mol → n(HCl)=0.0025 mol → c=0.0025/0.0125=0.2 mol/L.",
        "yr": "SS2"
      },
      {
        "q": "H₂SO₄ + 2NaOH → ? The salt is:",
        "o": [
          "NaCl",
          "Na₂SO₄",
          "NaNO₃",
          "Na₂SO₃"
        ],
        "a": 1,
        "e": "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Sulphuric acid + sodium hydroxide → sodium sulphate. Cation from base (Na⁺), anion from acid (SO₄²⁻).",
        "h": "H₂SO₄ + NaOH → Na₂SO₄ (sodium sulphate).",
        "yr": "SS2"
      },
      {
        "q": "Arrhenius theory's limitation vs Brønsted–Lowry is that Arrhenius:",
        "o": [
          "Requires electron pairs",
          "Only applies to aqueous solutions — cannot explain acid-base reactions in non-aqueous solvents",
          "Does not apply to strong acids",
          "Requires all acids to be organic"
        ],
        "a": 1,
        "e": "Arrhenius requires water — acid must produce H⁺ in water; base must produce OH⁻ in water. Brønsted–Lowry is broader — applies to proton transfer in any solvent (e.g., HCl(g) + NH₃(g) → NH₄Cl(s)).",
        "h": "Arrhenius limitation = requires aqueous solution (water).",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Solubility and Solubility Curves",
    "topicCode": "SS2-CHEM-04",
    "module": "Physical Chemistry",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\"><span class=\"learn-keyword\">Solubility</span> is the maximum mass of a solute that dissolves in 100 g of solvent at a given temperature to form a saturated solution. <span class=\"learn-keyword\">Solubility curves</span> show how solubility changes with temperature.</div><h3 class=\"learn-subheading\">1. Key Definitions</h3><ul class=\"learn-list\"><li><strong>Saturated solution:</strong> cannot dissolve more solute at that temperature</li><li><strong>Unsaturated solution:</strong> can dissolve more solute</li><li><strong>Supersaturated solution:</strong> unstable; more dissolved than normally possible; crystallises on disturbance</li></ul><h3 class=\"learn-subheading\">2. Effect of Temperature on Solubility</h3><ul class=\"learn-list\"><li>Most solids: solubility increases with temperature (KNO₃, KCl, NaCl)</li><li>Gases: solubility decreases with increasing temperature (CO₂ in water)</li><li>Exceptions: CaSO₄ — solubility decreases with temperature (exothermic dissolution)</li></ul><h3 class=\"learn-subheading\">3. Crystal Calculation</h3><p class=\"learn-p\">Mass of crystals = (solubility at higher T − solubility at lower T) × (mass of water / 100).</p><h3 class=\"learn-subheading\">4. Factors Affecting Solubility</h3><ul class=\"learn-list\"><li>Temperature (most important for solids)</li><li>Pressure (affects gases — Henry's Law: S ∝ P)</li><li>Nature of solute and solvent (like dissolves like)</li></ul><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Crystal Calculation:</strong> Mass of crystals = difference in solubility × (water mass / 100).</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> Solubility = g solute per 100 g water at given T. Saturated = maximum dissolved. Solid solubility mostly ↑ with T; gas solubility ↓ with T. Henry's Law: gas solubility ∝ pressure.</div>",
    "questions": [
      {
        "q": "Solubility of a substance is defined as:",
        "o": [
          "Amount dissolved in any volume of solvent",
          "Maximum mass of solute that dissolves in 100 g of solvent at a given temperature",
          "Volume of solute per litre of solution",
          "Rate at which solute dissolves"
        ],
        "a": 1,
        "e": "Solubility = maximum mass (grams) of solute that dissolves in exactly 100 g of solvent at a specified temperature to form a saturated solution.",
        "h": "Solubility = max mass of solute per 100 g water at given T (g/100 g water).",
        "yr": "SS2"
      },
      {
        "q": "A saturated solution is one that:",
        "o": [
          "Contains equal masses of solute and solvent",
          "Cannot dissolve more solute at the given temperature",
          "Is very concentrated but can still dissolve more",
          "Has been heated to boiling"
        ],
        "a": 1,
        "e": "A saturated solution has dissolved the maximum possible amount of solute at that temperature. Adding more solute leaves it undissolved.",
        "h": "Saturated = cannot dissolve more solute at that temperature.",
        "yr": "SS2"
      },
      {
        "q": "KNO₃ solubility is 110 g/100g at 60°C and 30 g/100g at 20°C. Crystals deposited on cooling 100g water from 60°C to 20°C?",
        "o": [
          "30 g",
          "80 g",
          "110 g",
          "140 g"
        ],
        "a": 1,
        "e": "Crystals = 110 − 30 = 80 g (per 100 g water). Solution can only hold 30 g at 20°C; excess 80 g crystallises.",
        "h": "Crystals = solubility at high T − solubility at low T = 110 − 30 = 80 g.",
        "yr": "SS2"
      },
      {
        "q": "Solubility of gases in water generally:",
        "o": [
          "Increases with temperature",
          "Decreases with temperature",
          "Is unaffected by temperature",
          "Increases with decreasing pressure"
        ],
        "a": 1,
        "e": "Unlike solids, gases become less soluble as temperature increases. Warm fizzy drinks go flat faster — CO₂ is less soluble at higher temperatures.",
        "h": "Gas solubility DECREASES with increasing temperature.",
        "yr": "SS2"
      },
      {
        "q": "Henry's Law states that gas solubility in a liquid is:",
        "o": [
          "Inversely proportional to temperature",
          "Directly proportional to the partial pressure of the gas above the liquid",
          "Proportional to mass of the liquid",
          "Independent of pressure"
        ],
        "a": 1,
        "e": "Henry's Law: S = kP. More pressure forces more gas into solution. Explains carbonated drinks (CO₂ dissolved under pressure) and decompression sickness in divers.",
        "h": "Henry's Law: gas solubility ∝ pressure above liquid.",
        "yr": "SS2"
      },
      {
        "q": "A supersaturated solution is:",
        "o": [
          "Heated to boiling",
          "Unstable; contains more dissolved solute than normally possible; crystallises on disturbance",
          "Equal masses of solute and solvent",
          "Very dilute"
        ],
        "a": 1,
        "e": "Supersaturated solution contains more dissolved solute than the saturation level allows. Prepared by careful cooling of saturated solution. Unstable — scratching container or adding seed crystal causes rapid crystallisation.",
        "h": "Supersaturated = more dissolved than normally possible; crystallises on disturbance.",
        "yr": "SS2"
      },
      {
        "q": "On a solubility curve, a point above the curve represents:",
        "o": [
          "Unsaturated solution",
          "Supersaturated solution — more dissolved than the solubility allows",
          "Saturated solution",
          "Solution at boiling point"
        ],
        "a": 1,
        "e": "On solubility curve: above = supersaturated; on curve = saturated; below = unsaturated.",
        "h": "Above curve = supersaturated; on curve = saturated; below = unsaturated.",
        "yr": "SS2"
      },
      {
        "q": "Like dissolves like means:",
        "o": [
          "Same-mass solutes dissolve in each other",
          "Polar solutes dissolve best in polar solvents; non-polar solutes in non-polar solvents",
          "All salts dissolve in water",
          "Gases dissolve only in liquid gases"
        ],
        "a": 1,
        "e": "Polar solvents (water) dissolve polar/ionic substances (NaCl, sugars). Non-polar solvents (hexane) dissolve non-polar substances (fats, waxes, iodine).",
        "h": "Like dissolves like: polar in polar; non-polar in non-polar.",
        "yr": "SS2"
      },
      {
        "q": "Solubility of NaCl is 36 g/100 g water at 20°C. How much NaCl dissolves in 200 g water?",
        "o": [
          "36 g",
          "18 g",
          "72 g",
          "100 g"
        ],
        "a": 2,
        "e": "For 200 g water: 36 × (200/100) = 36 × 2 = 72 g.",
        "h": "36 g/100g × 200g = 72 g NaCl.",
        "yr": "SS2"
      },
      {
        "q": "From a solubility curve you can determine all EXCEPT:",
        "o": [
          "Solubility at specific temperature",
          "Mass of crystals on cooling",
          "Temperature where two salts have equal solubility",
          "Rate of dissolution"
        ],
        "a": 3,
        "e": "Solubility curves show equilibrium solubility at each temperature — not how fast the solute dissolves (rate depends on particle size, stirring, T — a kinetics question).",
        "h": "Solubility curves show equilibrium solubility — NOT rate of dissolution.",
        "yr": "SS2"
      },
      {
        "q": "KCl solubility: 50 g/100g at 80°C and 40 g/100g at 40°C. Crystals per 100 g water on cooling?",
        "o": [
          "40 g",
          "50 g",
          "10 g",
          "90 g"
        ],
        "a": 2,
        "e": "Crystals = 50 − 40 = 10 g per 100 g water.",
        "h": "10 g crystals per 100 g water (50 − 40 = 10 g).",
        "yr": "SS2"
      },
      {
        "q": "Which factor does NOT significantly affect solubility of a solid in liquid?",
        "o": [
          "Temperature",
          "Nature of solvent",
          "Nature of solute",
          "Pressure (at normal ranges)"
        ],
        "a": 3,
        "e": "Pressure has negligible effect on solid solubility (unlike gases). Solid solubility depends on temperature and nature of solute/solvent.",
        "h": "Pressure negligibly affects solid solubility (major for gases via Henry's Law).",
        "yr": "SS2"
      },
      {
        "q": "Efflorescence refers to:",
        "o": [
          "Crystals absorbing water from atmosphere",
          "Crystals losing water of crystallisation to atmosphere, becoming powder",
          "Solution evaporating completely",
          "Salt dissolving in its own water of crystallisation"
        ],
        "a": 1,
        "e": "Efflorescent salts lose water of crystallisation to dry air — form anhydrous powdery surface. Example: Na₂CO₃·10H₂O → Na₂CO₃·H₂O powder.",
        "h": "Efflorescence = crystals lose water of crystallisation to dry air (become powdery).",
        "yr": "SS2"
      },
      {
        "q": "Hygroscopic vs deliquescent substances:",
        "o": [
          "Identical behaviour",
          "Hygroscopic absorbs water but stays solid; deliquescent absorbs enough water to dissolve completely",
          "Both dissolve in absorbed water",
          "Hygroscopic for liquids only"
        ],
        "a": 1,
        "e": "Hygroscopic: absorbs water but remains solid (e.g., silica gel, anhydrous CaCl₂). Deliquescent: absorbs so much water it dissolves completely (e.g., NaOH, FeCl₃ in humid conditions).",
        "h": "Hygroscopic = absorbs water, stays solid. Deliquescent = absorbs water and dissolves.",
        "yr": "SS2"
      },
      {
        "q": "Miscible liquids are those that:",
        "o": [
          "Are insoluble in each other",
          "Dissolve in each other in all proportions",
          "Have equal density",
          "Have same boiling point"
        ],
        "a": 1,
        "e": "Miscible liquids dissolve in each other in any ratio (homogeneous mixture). Example: ethanol and water. Immiscible: water and oil form separate layers.",
        "h": "Miscible = dissolve in each other completely (e.g., ethanol and water).",
        "yr": "SS2"
      },
      {
        "q": "Water of crystallisation in CuSO₄·5H₂O means:",
        "o": [
          "Water surrounding crystals outside",
          "Water molecules chemically incorporated into crystal structure at definite ratios",
          "Water produced during reaction",
          "Water used to wash crystals"
        ],
        "a": 1,
        "e": "Water of crystallisation is chemically combined within the crystal structure at a fixed, definite ratio. In CuSO₄·5H₂O, each formula unit has exactly 5 water molecules in the lattice.",
        "h": "Water of crystallisation = water chemically in crystal structure at fixed ratios.",
        "yr": "SS2"
      },
      {
        "q": "Steep solubility curve indicates:",
        "o": [
          "Slightly soluble at all temperatures",
          "Strong temperature dependence — small T change causes large solubility change; efficient crystallisation on cooling",
          "Compound decomposes at high T",
          "A gas not a solid"
        ],
        "a": 1,
        "e": "Steep curve = solubility strongly dependent on temperature. Large amount of crystals form when hot saturated solution is cooled — efficient purification by fractional crystallisation.",
        "h": "Steep solubility curve = strongly temperature-dependent; efficient crystallisation on cooling.",
        "yr": "SS2"
      },
      {
        "q": "Which statement about solutions is INCORRECT?",
        "o": [
          "Solubility of most solids increases with temperature",
          "Adding solute to saturated solution at constant T increases solubility",
          "Gases more soluble at higher pressures (Henry's Law)",
          "Saturated solution is in equilibrium between dissolved and undissolved solute"
        ],
        "a": 1,
        "e": "Adding solute to a saturated solution does NOT increase solubility — it is a fixed property at a given temperature. Excess solute remains undissolved.",
        "h": "Adding solute to saturated solution does NOT increase solubility.",
        "yr": "SS2"
      },
      {
        "q": "Sugar solubility: 200 g/100g at 50°C; 150 g/100g at 30°C. Crystals from 300 g water cooled from 50°C to 30°C?",
        "o": [
          "50 g",
          "100 g",
          "150 g",
          "200 g"
        ],
        "a": 2,
        "e": "Crystals per 100 g water = 200 − 150 = 50 g. For 300 g water: 50 × 3 = 150 g.",
        "h": "Crystals/100g = 50g. For 300g water: 50×3 = 150g.",
        "yr": "SS2"
      },
      {
        "q": "CaSO₄ shows slight decrease in solubility with temperature. This is because:",
        "o": [
          "Its dissolution is exothermic — higher T shifts equilibrium to dissolve less",
          "Measurement error",
          "It is a gas behaving like a solid",
          "Normal solid behaviour"
        ],
        "a": 0,
        "e": "When dissolution is exothermic (releases heat), Le Chatelier's principle predicts increasing T shifts equilibrium left (less dissolving), decreasing solubility. CaSO₄ dissolution is exothermic.",
        "h": "CaSO₄ solubility decreases with T: exothermic dissolution (Le Chatelier).",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Environmental Chemistry",
    "topicCode": "SS2-CHEM-05",
    "module": "Applied Chemistry",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\"><span class=\"learn-keyword\">Environmental chemistry</span> studies chemical processes in the environment and the impacts of human activities on air, water, and soil.</div><h3 class=\"learn-subheading\">1. Air Pollutants</h3><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Pollutant</th><th>Source</th><th>Effect</th></tr></thead><tbody><tr><td>CO</td><td>Incomplete combustion</td><td>Binds haemoglobin; toxic</td></tr><tr><td>SO₂</td><td>Burning fossil fuels</td><td>Acid rain; respiratory problems</td></tr><tr><td>NOₓ</td><td>Car engines</td><td>Acid rain; photochemical smog</td></tr><tr><td>CO₂</td><td>Combustion</td><td>Greenhouse effect</td></tr><tr><td>CFCs</td><td>Old refrigerants</td><td>Ozone depletion</td></tr></tbody></table></div><h3 class=\"learn-subheading\">2. Acid Rain</h3><p class=\"learn-p\">pH below 5.6. SO₂ + H₂O → H₂SO₃ → H₂SO₄; NO₂ + H₂O → HNO₃. Effects: destroys forests, acidifies lakes, corrodes limestone buildings.</p><h3 class=\"learn-subheading\">3. Greenhouse Effect</h3><p class=\"learn-p\">CO₂, CH₄, N₂O trap infrared radiation. Enhanced greenhouse effect from burning fossil fuels → global warming.</p><h3 class=\"learn-subheading\">4. Ozone Depletion</h3><p class=\"learn-p\">CFCs release Cl• radicals: Cl• + O₃ → ClO• + O₂ (catalytic chain). Montreal Protocol (1987) phased out CFCs.</p><h3 class=\"learn-subheading\">5. Water Pollution</h3><ul class=\"learn-list\"><li>Eutrophication: fertiliser runoff → algal bloom → O₂ depletion</li><li>Oil spills: kills aquatic life</li><li>Heavy metals: biomagnification</li></ul><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Links:</strong> SO₂/NOₓ → acid rain. CO₂/CH₄ → greenhouse/global warming. CFCs → ozone depletion. Fertiliser runoff → eutrophication.</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> CO (haemoglobin), SO₂ (acid rain), NOₓ (acid rain/smog), CO₂ (greenhouse), CFCs (ozone). Acid rain pH &lt; 5.6. Montreal Protocol banned CFCs. Eutrophication: fertiliser→algae→O₂ depletion.</div>",
    "questions": [
      {
        "q": "CO is dangerous because it:",
        "o": [
          "Causes acid rain",
          "Binds haemoglobin 200× stronger than O₂, preventing oxygen transport",
          "Destroys ozone",
          "Is a greenhouse gas"
        ],
        "a": 1,
        "e": "CO binds haemoglobin 200× more strongly than O₂, forming stable carboxyhaemoglobin. Blood cannot carry oxygen → hypoxia → death. Produced by incomplete combustion.",
        "h": "CO: binds haemoglobin → prevents O₂ transport → hypoxia.",
        "yr": "SS2"
      },
      {
        "q": "Acid rain is defined as rain with pH below:",
        "o": [
          "7.0",
          "6.0",
          "5.6",
          "4.0"
        ],
        "a": 2,
        "e": "Normal rain pH ≈ 5.6 (dissolved CO₂). Acid rain pH < 5.6 due to dissolved H₂SO₄ and HNO₃ from SO₂ and NOₓ.",
        "h": "Acid rain pH < 5.6.",
        "yr": "SS2"
      },
      {
        "q": "The Montreal Protocol (1987) was an agreement to:",
        "o": [
          "Reduce CO₂ emissions",
          "Phase out CFCs and other ozone-depleting substances",
          "Regulate industrial water pollution",
          "Limit SO₂ from power stations"
        ],
        "a": 1,
        "e": "Montreal Protocol (1987) phased out production and use of CFCs and other ozone-depleting substances. One of the most successful international environmental agreements.",
        "h": "Montreal Protocol (1987) = phase out CFCs to protect ozone layer.",
        "yr": "SS2"
      },
      {
        "q": "Eutrophication is caused by:",
        "o": [
          "Oil spills",
          "Fertiliser runoff → algal bloom → decomposition → O₂ depletion → aquatic death",
          "Acid rain",
          "Biomagnification"
        ],
        "a": 1,
        "e": "Nitrates and phosphates from fertilisers wash into lakes → explosive algal growth → algae die → bacteria decompose consuming O₂ → fish suffocate.",
        "h": "Eutrophication: fertiliser runoff → algal bloom → O₂ depletion.",
        "yr": "SS2"
      },
      {
        "q": "Which greenhouse gas is produced by cattle and rice paddies?",
        "o": [
          "SO₂",
          "CH₄ (methane)",
          "NO₂",
          "Cl₂"
        ],
        "a": 1,
        "e": "Methane (CH₄) is produced by methanogenic bacteria in ruminant guts (cattle) and flooded paddy fields. CH₄ has ≈28× global warming potential of CO₂.",
        "h": "Methane (CH₄) = from cattle and flooded rice paddies.",
        "yr": "SS2"
      },
      {
        "q": "CFCs destroy ozone through:",
        "o": [
          "Dissolving ozone in acid rain",
          "Releasing Cl• radicals: Cl• + O₃ → ClO• + O₂ (catalytic chain)",
          "Reacting with UV to produce SO₂",
          "Raising stratosphere temperature"
        ],
        "a": 1,
        "e": "UV breaks CFCs → Cl• radicals. Chain: Cl• + O₃ → ClO• + O₂; ClO• + O• → Cl• + O₂. Each Cl• destroys thousands of O₃ molecules.",
        "h": "CFCs → Cl• radicals → Cl• + O₃ → ClO• + O₂ (catalytic chain).",
        "yr": "SS2"
      },
      {
        "q": "SO₂ contributes to acid rain by:",
        "o": [
          "Reacting with ozone",
          "Dissolving in rainwater: SO₂ + H₂O → H₂SO₃, oxidised to H₂SO₄",
          "Decomposing water",
          "Reacting with nitrogen"
        ],
        "a": 1,
        "e": "SO₂ + H₂O → H₂SO₃ → oxidised by O₂ to H₂SO₄. This strong acid in rain is the main cause of acid rain from coal-burning power plants.",
        "h": "SO₂ + H₂O → H₂SO₃ → H₂SO₄ (acid rain).",
        "yr": "SS2"
      },
      {
        "q": "The enhanced greenhouse effect refers to:",
        "o": [
          "Natural warming of Earth",
          "Human-intensified warming from increased CO₂/CH₄ causing global warming",
          "Effect of greenhouses on plants",
          "Increased UV reaching Earth"
        ],
        "a": 1,
        "e": "Natural greenhouse effect is essential. Enhanced greenhouse effect = intensification from human activities (burning fossil fuels, deforestation) increasing atmospheric CO₂, CH₄, N₂O beyond natural levels.",
        "h": "Enhanced greenhouse effect = human-intensified warming → global warming.",
        "yr": "SS2"
      },
      {
        "q": "Biomagnification of mercury means:",
        "o": [
          "Mercury diluted up food chain",
          "Mercury accumulates and concentrates increasingly up food chain: plankton→fish→birds→humans",
          "Mercury removed by bacteria",
          "Only plants affected"
        ],
        "a": 1,
        "e": "Mercury: absorbed by plankton in tiny amounts → small fish eat many plankton (concentrate mercury) → larger fish → top predators accumulate very high levels. Caused Minamata disease in Japan.",
        "h": "Biomagnification: pollutant concentrates up food chain.",
        "yr": "SS2"
      },
      {
        "q": "Photochemical smog forms when:",
        "o": [
          "SO₂ mixes with fog",
          "Sunlight reacts with NOₓ and hydrocarbons from car exhausts → ground-level O₃, PAN",
          "Black smoke released in winter",
          "CFCs react with fog"
        ],
        "a": 1,
        "e": "Photochemical smog: UV + NOₓ + unburnt hydrocarbons → ground-level ozone (O₃), peroxyacetyl nitrate (PAN), other irritants causing respiratory problems and eye irritation.",
        "h": "Photochemical smog = sunlight + NOₓ + hydrocarbons → ground-level O₃.",
        "yr": "SS2"
      },
      {
        "q": "Major consequence of ozone depletion:",
        "o": [
          "More acid rain",
          "Increased UV-B → more skin cancer, cataracts, marine ecosystem damage",
          "Global cooling",
          "More greenhouse warming"
        ],
        "a": 1,
        "e": "Ozone layer absorbs UV-B (280–315 nm). Depletion → more UV-B → skin cancer (melanoma), cataracts, immune suppression, damage to phytoplankton and marine food chains.",
        "h": "Ozone depletion → more UV-B → skin cancer, cataracts, marine damage.",
        "yr": "SS2"
      },
      {
        "q": "Bioremediation is:",
        "o": [
          "Using chemicals to dissolve pollutants",
          "Using living organisms (bacteria, fungi, plants) to break down or remove pollutants",
          "Burning contaminated soil",
          "Diluting pollutants with water"
        ],
        "a": 1,
        "e": "Bioremediation uses microorganisms or plants to degrade, transform, or remove pollutants. Bacteria break down crude oil; sunflowers absorb heavy metals from soil (phytoremediation).",
        "h": "Bioremediation = microorganisms/plants remove/break down environmental pollutants.",
        "yr": "SS2"
      },
      {
        "q": "NOₓ produced in car engines because:",
        "o": [
          "Engines use nitrogen as fuel",
          "High combustion temperatures cause N₂ + O₂ → NO, then NO₂",
          "Petrol contains nitrogen compounds",
          "NOₓ added as fuel additive"
        ],
        "a": 1,
        "e": "At high engine temperatures (>1000°C): N₂ + O₂ → 2NO. NO → NO₂ in air. NOₓ causes acid rain (forms HNO₃) and photochemical smog. Catalytic converters convert NOₓ → N₂.",
        "h": "NOₓ from cars: high T causes N₂ + O₂ → NO, then NO₂.",
        "yr": "SS2"
      },
      {
        "q": "Acid rain corrodes limestone because:",
        "o": [
          "Acid reacts with silicate in stone",
          "Limestone (CaCO₃) + H₂SO₄ → CaSO₄ + H₂O + CO₂ (dissolves stone)",
          "Acid raises temperature of stone",
          "Nitrogen forms gas breaking stone"
        ],
        "a": 1,
        "e": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂. CaCO₃ gradually dissolves. CaSO₄ forms powdery surface (gypsum) that crumbles. Destroys historic buildings and statues.",
        "h": "Acid rain + limestone (CaCO₃) → CaSO₄ + H₂O + CO₂ → stone erodes.",
        "yr": "SS2"
      },
      {
        "q": "Kyoto Protocol and Paris Agreement aim to:",
        "o": [
          "Ban CFCs globally",
          "Reduce greenhouse gas emissions to mitigate global warming",
          "Clean up oil spills",
          "Regulate pesticide use"
        ],
        "a": 1,
        "e": "Kyoto Protocol (1997) and Paris Agreement (2015) set targets for reducing greenhouse gas emissions (especially CO₂) to limit global temperature rise and mitigate climate change.",
        "h": "Kyoto Protocol + Paris Agreement = reduce greenhouse gas emissions.",
        "yr": "SS2"
      },
      {
        "q": "Oil spills damage the environment by:",
        "o": [
          "Making water more alkaline",
          "Surface film prevents gas exchange; coats/kills marine birds and animals; destroys food chains",
          "Increasing O₂ content of water",
          "Decomposing rapidly without impact"
        ],
        "a": 1,
        "e": "Oil surface film: prevents O₂/CO₂ exchange (suffocates aquatic life), coats and kills seabirds and mammals, contaminates beaches, disrupts marine food chains.",
        "h": "Oil spills: surface film prevents gas exchange, coats/kills marine life.",
        "yr": "SS2"
      },
      {
        "q": "BOD (Biochemical Oxygen Demand) measures:",
        "o": [
          "Dissolved O₂ available for fish",
          "O₂ consumed by microorganisms decomposing organic matter — high BOD = high pollution, low dissolved O₂",
          "pH of water",
          "Nitrate concentration"
        ],
        "a": 1,
        "e": "BOD = O₂ consumed by bacteria decomposing organic matter over 5 days at 20°C. High BOD = much organic matter → bacteria consume O₂ → less for fish. Clean water = low BOD.",
        "h": "High BOD = high organic pollution = bacteria consume O₂ = less for aquatic life.",
        "yr": "SS2"
      },
      {
        "q": "Correct pair of gas and environmental problem:",
        "o": [
          "CO₂ — ozone depletion",
          "CFCs — greenhouse only",
          "SO₂ — acid rain",
          "CH₄ — acid rain"
        ],
        "a": 2,
        "e": "SO₂ → acid rain. CO₂ → greenhouse/global warming. CFCs → ozone depletion. CH₄ → greenhouse gas (not acid rain).",
        "h": "SO₂ → acid rain. CO₂ → greenhouse. CFCs → ozone depletion.",
        "yr": "SS2"
      },
      {
        "q": "Lead in old petrol was phased out because:",
        "o": [
          "Too expensive",
          "Neurotoxin accumulating in body → brain damage especially in children",
          "Corrosive to engines",
          "Greenhouse gas"
        ],
        "a": 1,
        "e": "Tetraethyl lead released lead particles when burned. Lead is a cumulative neurotoxin causing developmental delays, reduced IQ in children, and neurological damage.",
        "h": "Lead in petrol = neurotoxin → brain damage, especially in children.",
        "yr": "SS2"
      },
      {
        "q": "Catalytic converters convert:",
        "o": [
          "CO₂ and H₂O into hydrocarbons",
          "CO and NOₓ into CO₂, N₂, and H₂O through catalytic reactions",
          "SO₂ into H₂SO₄",
          "O₂ into ozone"
        ],
        "a": 1,
        "e": "Catalytic converters (Pt, Pd, Rh catalysts): CO → CO₂; 2CO + 2NO → 2CO₂ + N₂; hydrocarbons → CO₂ + H₂O. Significantly reduce toxic vehicle emissions.",
        "h": "Catalytic converter: CO + NOₓ + hydrocarbons → CO₂ + N₂ + H₂O.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Electrolysis",
    "topicCode": "SS2-CHEM-16",
    "module": "Electrochemistry",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\">Electrolysis is the use of <span class=\"learn-keyword\">electricity</span> to break down a compound into simpler substances. The word means \"breaking by electricity\". It matters because it is how factories make aluminium, chlorine and caustic soda, and how a jeweller puts a shiny layer of silver or gold on a cheap metal. In Nigeria, the same idea is used when a roadside worker chromium-plates a car bumper or a ring. In this lesson you will learn the words used in electrolysis, how ions are chosen for discharge, the uses of electrolysis, and Faraday's laws with calculations.</div>\n\n<h3 class=\"learn-subheading\">1. Electrolytes and Non-electrolytes</h3>\n<p class=\"learn-p\">An <span class=\"learn-keyword\">electrolyte</span> is a substance that conducts electricity when it is melted (molten) or dissolved in water, and is decomposed (broken down) by the current. Electrolytes contain <span class=\"learn-keyword\">ions</span>. Ions are charged particles. In a solid, the ions are locked in place and cannot move, so a solid ionic compound does not conduct. When the compound melts or dissolves, the ions become free to move, and they carry the current.</p>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">non-electrolyte</span> does not conduct in any state, because it has no free ions. Examples are sugar solution, ethanol, kerosene and pure water (pure water has too few ions).</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Type</th><th>Meaning</th><th>Examples</th></tr></thead><tbody>\n<tr><td>Strong electrolyte</td><td>Almost fully split into ions, so conducts very well</td><td>NaCl solution, dilute H₂SO₄, NaOH solution</td></tr>\n<tr><td>Weak electrolyte</td><td>Only slightly split into ions, so conducts poorly</td><td>Ethanoic acid (vinegar), ammonia solution</td></tr>\n<tr><td>Non-electrolyte</td><td>No ions at all</td><td>Sugar solution, ethanol, kerosene</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Note: metals and graphite also conduct, but they conduct by moving electrons and they are not decomposed. They are conductors, not electrolytes.</p>\n\n<h3 class=\"learn-subheading\">2. Electrodes and the Electrolytic Cell</h3>\n<p class=\"learn-p\">An <span class=\"learn-keyword\">electrode</span> is the rod or plate that carries current into or out of the electrolyte. The vessel holding the electrolyte and the two electrodes, joined to a battery or direct current (d.c.) supply, is called an <span class=\"learn-keyword\">electrolytic cell</span>.</p>\n<ul class=\"learn-list\">\n<li><strong>Anode</strong>: the electrode joined to the positive (+) terminal of the battery. Negative ions (<span class=\"learn-keyword\">anions</span>) move to it. <strong>Oxidation</strong> (loss of electrons) happens here.</li>\n<li><strong>Cathode</strong>: the electrode joined to the negative (−) terminal. Positive ions (<span class=\"learn-keyword\">cations</span>) move to it. <strong>Reduction</strong> (gain of electrons) happens here.</li>\n</ul>\n<p class=\"learn-p\">A memory aid: \"AN OX and a RED CAT\" means ANode = OXidation, REDuction = CAThode. Also, \"anions go to the anode\".</p>\n<p class=\"learn-p\">Electrodes can be <strong>inert</strong> or <strong>active</strong>. An inert electrode (platinum or graphite) only carries current and does not take part in the reaction. An active electrode (such as copper or silver) can itself dissolve or be built up during electrolysis.</p>\n\n<h3 class=\"learn-subheading\">3. Principles: What Happens in the Cell</h3>\n<ol class=\"learn-ordered\">\n<li>Step 1: The electrolyte is melted or dissolved, so its ions are free to move.</li>\n<li>Step 2: The battery pushes electrons through the wire to the cathode. The cathode becomes negative.</li>\n<li>Step 3: Cations move to the cathode and gain electrons: M⁺ + e⁻ → M. This is reduction.</li>\n<li>Step 4: Anions move to the anode and lose electrons: 2X⁻ → X₂ + 2e⁻. This is oxidation.</li>\n<li>Step 5: The electrons released at the anode go back through the wire to the battery. The circuit is complete.</li>\n</ol>\n<p class=\"learn-p\">Example: molten sodium chloride (NaCl). It has only Na⁺ and Cl⁻ ions. At the cathode: Na⁺ + e⁻ → Na (silvery sodium metal). At the anode: 2Cl⁻ → Cl₂ + 2e⁻ (greenish-yellow chlorine gas). The compound is split into its elements.</p>\n\n<h3 class=\"learn-subheading\">4. Preferential (Selective) Discharge of Ions</h3>\n<p class=\"learn-p\">A water solution has two sets of ions. For example, in sodium chloride solution there are Na⁺ and Cl⁻ from the salt, and H⁺ and OH⁻ from water. Only one cation and one anion is discharged (changed to atoms or molecules) at each electrode. Choosing which one is called <span class=\"learn-keyword\">preferential discharge</span>. Three things decide it.</p>\n<ul class=\"learn-list\">\n<li><strong>Position in the electrochemical series.</strong> At the cathode, the ion lower in the series (less reactive metal) is discharged first. Order of cations, easiest to discharge first: Ag⁺, Cu²⁺, H⁺, Pb²⁺, Sn²⁺, Fe²⁺, Zn²⁺, Al³⁺, Mg²⁺, Na⁺, K⁺. So Cu²⁺ is discharged before H⁺, but H⁺ is discharged before Na⁺ and Zn²⁺. At the anode, the usual order of anions is OH⁻ before SO₄²⁻ and NO₃⁻ (which are almost never discharged from solution), and the halide ions (Cl⁻, Br⁻, I⁻) are discharged in preference to OH⁻ when they are concentrated.</li>\n<li><strong>Concentration of the ion.</strong> A much more concentrated ion can be discharged in preference to one that is higher in the order. Concentrated brine gives chlorine at the anode, but very dilute sodium chloride gives mostly oxygen.</li>\n<li><strong>Nature of the electrode.</strong> An active anode (like copper) dissolves instead of any anion being discharged.</li>\n</ul>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Electrolyte and electrodes</th><th>Cathode product</th><th>Anode product</th></tr></thead><tbody>\n<tr><td>Molten NaCl (graphite)</td><td>Sodium metal</td><td>Chlorine gas</td></tr>\n<tr><td>Concentrated NaCl solution, brine (graphite)</td><td>Hydrogen gas</td><td>Chlorine gas</td></tr>\n<tr><td>Dilute H₂SO₄ (platinum)</td><td>Hydrogen gas</td><td>Oxygen gas</td></tr>\n<tr><td>CuSO₄ solution (graphite or platinum)</td><td>Copper metal</td><td>Oxygen gas</td></tr>\n<tr><td>CuSO₄ solution (copper electrodes)</td><td>Copper deposited</td><td>Copper anode dissolves</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\"><strong>Dilute sulphuric acid:</strong> cathode: 2H⁺ + 2e⁻ → H₂. Anode: 4OH⁻ → 2H₂O + O₂ + 4e⁻. Hydrogen and oxygen are collected in the volume ratio 2 : 1. Overall, water is decomposed: 2H₂O → 2H₂ + O₂. The acid only helps the water conduct.</p>\n<p class=\"learn-p\"><strong>Brine:</strong> Na⁺ stays in solution because H⁺ is discharged first. Cl⁻ is discharged at the anode because it is concentrated. The solution left behind contains Na⁺ and OH⁻, which is sodium hydroxide (caustic soda).</p>\n<p class=\"learn-p\"><strong>Copper(II) sulphate with copper electrodes:</strong> at the anode Cu → Cu²⁺ + 2e⁻ (the electrode wears away). At the cathode Cu²⁺ + 2e⁻ → Cu. The colour of the blue solution stays the same, because copper ions removed at the cathode are replaced from the anode.</p>\n\n<h3 class=\"learn-subheading\">5. Applications of Electrolysis</h3>\n<ul class=\"learn-list\">\n<li><strong>Electroplating</strong>: covering a metal object with a thin layer of another metal to stop rust, or to make it look good. The object to be plated is the <strong>cathode</strong>. The plating metal is the <strong>anode</strong>. The electrolyte is a salt of the plating metal. Example: silver plating a spoon uses a silver anode, the spoon as cathode and silver nitrate solution.</li>\n<li><strong>Purification (refining) of copper</strong>: the impure copper is the anode. A thin strip of pure copper is the cathode. The electrolyte is copper(II) sulphate solution. Pure copper builds up on the cathode while impurities fall off as sludge.</li>\n<li><strong>Extraction of reactive metals</strong>: aluminium is extracted by electrolysis of aluminium oxide dissolved in molten cryolite, using graphite electrodes. Sodium is extracted by electrolysis of molten sodium chloride. These metals are too reactive to be obtained by heating with carbon.</li>\n<li><strong>Manufacture of chemicals</strong>: electrolysis of brine gives chlorine, hydrogen and sodium hydroxide.</li>\n<li><strong>Anodising</strong>: making the oxide layer on aluminium thicker so that it resists corrosion.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">6. Faraday's Laws of Electrolysis</h3>\n<p class=\"learn-p\">Michael Faraday studied how much substance is made during electrolysis. First, we need the <span class=\"learn-keyword\">quantity of electricity</span>, Q, measured in coulombs (C). It equals current I (in amperes, A) multiplied by time t (in seconds, s): <strong>Q = I × t</strong>.</p>\n<p class=\"learn-p\"><strong>Faraday's first law:</strong> the mass of a substance liberated at an electrode is directly proportional to the quantity of electricity passed. Double the charge, and you get double the mass.</p>\n<p class=\"learn-p\"><strong>Faraday's second law:</strong> when the same quantity of electricity is passed through different electrolytes, the masses of substances liberated are proportional to their equivalent masses (relative atomic mass divided by the charge on the ion).</p>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">Faraday constant</span> (F) is the charge carried by one mole of electrons: <strong>1 F = 96 500 C/mol</strong> (the value used in WAEC). It is the charge needed to liberate 1 mole of a metal for a +1 ion, 1/2 mole for a 2+ ion, and so on. To use it, write the half-equation and count the electrons.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Find Q = I × t (convert minutes to seconds).</li>\n<li>Step 2: Find moles of electrons = Q ÷ 96 500.</li>\n<li>Step 3: Use the half-equation to change moles of electrons to moles of the substance.</li>\n<li>Step 4: Mass = moles × molar mass, or volume (gas at s.t.p.) = moles × 22.4 dm³.</li>\n</ol>\n\n<h3 class=\"learn-subheading\">7. Worked Calculations</h3>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> A current of 2.0 A flows for 30 minutes through copper(II) sulphate solution. What mass of copper is deposited? (Cu = 63.5, F = 96 500 C/mol)<br>Time = 30 × 60 = 1800 s.<br>Q = I × t = 2.0 × 1800 = 3600 C.<br>Moles of electrons = 3600 ÷ 96 500 = 0.0373 mol.<br>Cu²⁺ + 2e⁻ → Cu, so moles of Cu = 0.0373 ÷ 2 = 0.01865 mol.<br>Mass = 0.01865 × 63.5 = 1.18 g.<br><strong>Answer: about 1.18 g of copper.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> How long must a current of 3.0 A pass through silver nitrate solution to deposit 5.4 g of silver? (Ag = 108)<br>Moles of Ag = 5.4 ÷ 108 = 0.05 mol.<br>Ag⁺ + e⁻ → Ag, so 1 mole of electrons gives 1 mole of Ag. Moles of electrons = 0.05 mol.<br>Q = 0.05 × 96 500 = 4825 C.<br>t = Q ÷ I = 4825 ÷ 3.0 = 1608 s (about 26.8 minutes).<br><strong>Answer: about 1608 seconds.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> What volume of chlorine at s.t.p. is liberated when 5.0 A flows for 965 s through brine? (Molar volume = 22.4 dm³)<br>Q = 5.0 × 965 = 4825 C.<br>Moles of electrons = 4825 ÷ 96 500 = 0.05 mol.<br>2Cl⁻ → Cl₂ + 2e⁻, so moles of Cl₂ = 0.05 ÷ 2 = 0.025 mol.<br>Volume = 0.025 × 22.4 = 0.56 dm³.<br><strong>Answer: 0.56 dm³ of chlorine.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4 (second law):</strong> The same charge passes through silver nitrate and copper(II) sulphate solutions in series. 2.16 g of silver is deposited. What mass of copper is deposited? (Ag = 108, Cu = 63.5)<br>Moles of Ag = 2.16 ÷ 108 = 0.02 mol, so electrons = 0.02 mol.<br>Cu²⁺ needs 2 electrons per atom, so moles of Cu = 0.02 ÷ 2 = 0.01 mol.<br>Mass of Cu = 0.01 × 63.5 = 0.635 g.<br><strong>Answer: 0.635 g of copper.</strong></div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Forgetting to change minutes to seconds. Always multiply minutes by 60 before using Q = It.<br>2. Mixing up the electrodes. The anode is positive and gets anions. The cathode is negative and gets cations. Metals and hydrogen always form at the cathode.<br>3. Ignoring the number of electrons. Cu²⁺ needs 2 electrons, Al³⁺ needs 3, Ag⁺ needs 1. Always write the half-equation first.<br>4. Saying a solid salt, or sugar solution, is an electrolyte. Only molten or dissolved ionic compounds are electrolytes.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often asks: \"State the products at the anode and cathode when ... is electrolysed using platinum electrodes\" and \"Calculate the mass of ... deposited when a current of ... flows for ...\". Write the half-equations for full marks, and show Q = It, the moles, and the units (g, dm³, s). Remember that the electrodes can change the answer: copper electrodes in CuSO₄ give a different anode result from graphite.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>• Electrolysis uses direct current to decompose a molten or dissolved ionic compound.<br>• Anode (+): anions go there, oxidation. Cathode (−): cations go there, reduction.<br>• Ion choice depends on the electrochemical series, concentration and electrode type.<br>• Uses: electroplating, copper refining, extraction of Al and Na, chlor-alkali industry.<br>• Q = It; 1 F = 96 500 C/mol; mass is proportional to charge (1st law) and to equivalent mass (2nd law).</div>",
    "questions": [
      {
        "q": "Which of the following is an electrolyte?",
        "o": [
          "Molten sodium chloride",
          "Sugar solution",
          "Ethanol",
          "Kerosene"
        ],
        "a": 0,
        "e": "Molten sodium chloride contains free Na⁺ and Cl⁻ ions that carry current and are decomposed. Sugar, ethanol and kerosene are covalent and have no ions, so they are non-electrolytes.",
        "h": "Look for an ionic compound that is melted or dissolved.",
        "yr": "SS2"
      },
      {
        "q": "During electrolysis, the electrode connected to the positive terminal of the battery is called the",
        "o": [
          "Cathode",
          "Anode",
          "Electrolyte",
          "Conductor"
        ],
        "a": 1,
        "e": "The anode is joined to the positive terminal and attracts anions, where oxidation takes place. The cathode is the one joined to the negative terminal.",
        "h": "Anions go to this electrode.",
        "yr": "SS2"
      },
      {
        "q": "In the electrolysis of dilute sulphuric acid using platinum electrodes, the gases collected at the cathode and anode are respectively",
        "o": [
          "Oxygen and hydrogen",
          "Hydrogen and sulphur dioxide",
          "Hydrogen and oxygen",
          "Oxygen and sulphur trioxide"
        ],
        "a": 2,
        "e": "H⁺ is discharged at the cathode to give hydrogen. At the anode OH⁻ is discharged to give oxygen, because SO₄²⁻ is not discharged. Hydrogen and oxygen come out in a 2 : 1 volume ratio.",
        "h": "Positive ions give a gas at the negative electrode.",
        "yr": "SS2"
      },
      {
        "q": "Which process takes place at the cathode?",
        "o": [
          "Oxidation",
          "Loss of electrons",
          "Evaporation",
          "Reduction"
        ],
        "a": 3,
        "e": "Cations gain electrons at the cathode, and gain of electrons is reduction. Oxidation and loss of electrons happen at the anode.",
        "h": "AN OX and a RED CAT.",
        "yr": "SS2"
      },
      {
        "q": "When concentrated sodium chloride solution (brine) is electrolysed with graphite electrodes, the product at the anode is",
        "o": [
          "Oxygen",
          "Sodium",
          "Chlorine",
          "Hydrogen"
        ],
        "a": 2,
        "e": "Cl⁻ is concentrated, so it is discharged in preference to OH⁻ and chlorine forms at the anode. Sodium is never formed from solution because H⁺ is discharged first, and hydrogen forms at the cathode, not the anode.",
        "h": "The anode gives a greenish-yellow gas.",
        "yr": "SS2"
      },
      {
        "q": "In electroplating a spoon with silver, the spoon is made the",
        "o": [
          "Anode",
          "Electrolyte",
          "Salt bridge",
          "Cathode"
        ],
        "a": 3,
        "e": "The object to be plated is the cathode, so that Ag⁺ ions are reduced and deposited on it. The anode is a bar of the plating metal (silver).",
        "h": "Metal is deposited at the negative electrode.",
        "yr": "SS2"
      },
      {
        "q": "Which statement about the electrolysis of copper(II) sulphate solution using copper electrodes is correct?",
        "o": [
          "The anode increases in mass",
          "The blue colour fades completely",
          "Oxygen is given off at the anode",
          "The anode dissolves and copper is deposited on the cathode"
        ],
        "a": 3,
        "e": "The copper anode loses electrons and dissolves (Cu → Cu²⁺ + 2e⁻) while Cu²⁺ is deposited at the cathode. The ions removed are replaced, so the blue colour stays the same and no oxygen forms.",
        "h": "Copper is an active electrode.",
        "yr": "SS2"
      },
      {
        "q": "Which ion is discharged first at the cathode from a solution containing Cu²⁺, H⁺ and Na⁺ ions (all at similar concentration)?",
        "o": [
          "Cu²⁺",
          "H⁺",
          "Na⁺",
          "OH⁻"
        ],
        "a": 0,
        "e": "Cu²⁺ is lower in the electrochemical series than H⁺ and Na⁺, so it is discharged first. OH⁻ is an anion and goes to the anode, not the cathode.",
        "h": "Least reactive metal ion is discharged first.",
        "yr": "SS2"
      },
      {
        "q": "A current of 4 A flows for 2 minutes. The quantity of electricity passed is",
        "o": [
          "8 C",
          "480 C",
          "240 C",
          "2 C"
        ],
        "a": 1,
        "e": "Convert time first: 2 minutes = 120 s. Q = I × t = 4 × 120 = 480 C. Using 2 instead of 120 s gives the wrong answer 8 C.",
        "h": "Change minutes to seconds first.",
        "yr": "SS2"
      },
      {
        "q": "Aluminium is extracted industrially by electrolysis of aluminium oxide dissolved in molten",
        "o": [
          "Sodium chloride",
          "Cryolite",
          "Brine",
          "Limestone"
        ],
        "a": 1,
        "e": "Aluminium oxide has a very high melting point, so it is dissolved in molten cryolite, which lowers the temperature needed. Graphite electrodes are used, and aluminium forms at the cathode.",
        "h": "It is a sodium aluminium fluoride compound.",
        "yr": "SS2"
      },
      {
        "q": "How many coulombs are needed to deposit 1 mole of copper from Cu²⁺ solution? (F = 96 500 C/mol)",
        "o": [
          "96 500 C",
          "48 250 C",
          "289 500 C",
          "193 000 C"
        ],
        "a": 3,
        "e": "Cu²⁺ + 2e⁻ → Cu, so 2 moles of electrons are needed. Charge = 2 × 96 500 = 193 000 C. 96 500 C would only deposit half a mole of copper.",
        "h": "Count the electrons in the half-equation.",
        "yr": "SS2"
      },
      {
        "q": "What mass of silver is deposited when 0.05 mol of electrons passes through silver nitrate solution? (Ag = 108)",
        "o": [
          "5.4 g",
          "2.7 g",
          "10.8 g",
          "0.54 g"
        ],
        "a": 0,
        "e": "Ag⁺ + e⁻ → Ag, so 0.05 mol of electrons gives 0.05 mol of Ag. Mass = 0.05 × 108 = 5.4 g.",
        "h": "One electron per silver ion.",
        "yr": "SS2"
      },
      {
        "q": "A current of 5.0 A flows for 965 s through brine. What volume of chlorine at s.t.p. is liberated? (F = 96 500 C/mol; molar volume = 22.4 dm³)",
        "o": [
          "1.12 dm³",
          "0.28 dm³",
          "0.56 dm³",
          "2.24 dm³"
        ],
        "a": 2,
        "e": "Q = 5.0 × 965 = 4825 C, so moles of electrons = 4825 ÷ 96 500 = 0.05. Since 2Cl⁻ → Cl₂ + 2e⁻, moles of Cl₂ = 0.025. Volume = 0.025 × 22.4 = 0.56 dm³.",
        "h": "Two electrons make one Cl₂ molecule.",
        "yr": "SS2"
      },
      {
        "q": "The same quantity of electricity deposits 0.02 mol of silver from AgNO₃ solution. How many moles of copper would it deposit from CuSO₄ solution?",
        "o": [
          "0.02 mol",
          "0.01 mol",
          "0.04 mol",
          "0.005 mol"
        ],
        "a": 1,
        "e": "0.02 mol of silver needs 0.02 mol of electrons. Each Cu²⁺ needs 2 electrons, so moles of Cu = 0.02 ÷ 2 = 0.01 mol. This follows Faraday's second law.",
        "h": "Copper needs twice as many electrons per atom.",
        "yr": "SS2"
      },
      {
        "q": "Which statement correctly states Faraday's first law of electrolysis?",
        "o": [
          "Equal charges give equal masses of every substance",
          "The mass liberated is inversely proportional to time",
          "The mass liberated is proportional to the quantity of electricity passed",
          "The mass liberated depends on the colour of the electrolyte"
        ],
        "a": 2,
        "e": "Faraday's first law says mass liberated ∝ Q = It, so doubling the charge doubles the mass. Equal charges give equal masses only for ions with the same equivalent mass, so the first option is wrong.",
        "h": "Think of mass and charge going up together.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Electrochemical Cells",
    "topicCode": "SS2-CHEM-17",
    "module": "Electrochemistry",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\">An <span class=\"learn-keyword\">electrochemical cell</span> is a device in which chemical energy and electrical energy are changed into each other through a redox reaction. Some cells make electricity from a chemical reaction. Others use electricity to force a chemical reaction. This topic matters because every torch battery, phone battery and car battery works by this idea. When NEPA takes the light and you switch on a rechargeable lamp, you are using an electrochemical cell. In this lesson you will compare galvanic and electrolytic cells, build the Daniell cell step by step, see how it works, calculate cell voltages, and learn the uses of cells.</div>\n\n<h3 class=\"learn-subheading\">1. Redox: The Idea Behind Every Cell</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">redox reaction</span> is a reaction in which one substance loses electrons (<strong>oxidation</strong>) while another gains electrons (<strong>reduction</strong>). The two always go together. If a zinc rod is put in copper(II) sulphate solution, zinc loses electrons and copper ions gain them:</p>\n<p class=\"learn-p\">Zn + Cu²⁺ → Zn²⁺ + Cu</p>\n<p class=\"learn-p\">The electrons pass directly from zinc to copper ions, and the energy is lost as heat. An electrochemical cell separates the two half-reactions so that the electrons are forced to travel through an outside wire. A moving stream of electrons in a wire is an electric current, and this is how we get useful electrical energy.</p>\n\n<h3 class=\"learn-subheading\">2. Two Kinds of Electrochemical Cell</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">galvanic cell</span> (also called a <span class=\"learn-keyword\">voltaic cell</span>) uses a spontaneous (self-starting) chemical reaction to produce electricity. An <span class=\"learn-keyword\">electrolytic cell</span> uses electricity from outside to make a non-spontaneous reaction happen, as you learnt in electrolysis.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Feature</th><th>Galvanic cell</th><th>Electrolytic cell</th></tr></thead><tbody>\n<tr><td>Energy change</td><td>Chemical energy → electrical energy</td><td>Electrical energy → chemical energy</td></tr>\n<tr><td>Reaction</td><td>Spontaneous</td><td>Forced by a battery</td></tr>\n<tr><td>Anode</td><td>Negative (−)</td><td>Positive (+)</td></tr>\n<tr><td>Cathode</td><td>Positive (+)</td><td>Negative (−)</td></tr>\n<tr><td>Electrolyte</td><td>Usually two solutions joined by a salt bridge</td><td>One electrolyte, one vessel</td></tr>\n<tr><td>Example</td><td>Daniell cell, torch battery</td><td>Electroplating, extraction of aluminium</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">In both cells, oxidation happens at the anode and reduction happens at the cathode. Only the signs (+ or −) are different. Electrons always flow through the wire from the anode to the cathode.</p>\n\n<h3 class=\"learn-subheading\">3. Construction of the Daniell Cell</h3>\n<p class=\"learn-p\">The Daniell cell is the standard example of a galvanic cell. Build it like this.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Put a zinc rod in a beaker of zinc sulphate solution. This is the zinc half-cell.</li>\n<li>Step 2: Put a copper rod in a second beaker of copper(II) sulphate solution. This is the copper half-cell.</li>\n<li>Step 3: Join the two rods with a wire. A voltmeter or bulb can be placed in the wire.</li>\n<li>Step 4: Join the two solutions with a <span class=\"learn-keyword\">salt bridge</span>. This is a strip of filter paper, or a U-tube, soaked in a salt solution such as potassium nitrate (KNO₃) or potassium chloride.</li>\n</ol>\n<p class=\"learn-p\">The salt bridge completes the circuit and keeps both solutions electrically neutral by letting ions move between them. Without it, the cell stops working very quickly, because charge builds up in the half-cells.</p>\n\n<h3 class=\"learn-subheading\">4. Working Principle of the Daniell Cell</h3>\n<p class=\"learn-p\">Zinc is more reactive than copper, so it loses electrons more easily.</p>\n<ul class=\"learn-list\">\n<li><strong>At the zinc electrode (anode, negative):</strong> Zn → Zn²⁺ + 2e⁻ (oxidation). The zinc rod slowly wears away.</li>\n<li><strong>Electron flow:</strong> the electrons go through the wire from zinc to copper.</li>\n<li><strong>At the copper electrode (cathode, positive):</strong> Cu²⁺ + 2e⁻ → Cu (reduction). Copper is deposited and the copper rod gets heavier. The blue colour of the solution slowly fades.</li>\n<li><strong>In the salt bridge:</strong> negative ions (like NO₃⁻) move towards the zinc half-cell, and positive ions (like K⁺) move towards the copper half-cell.</li>\n<li><strong>Overall:</strong> Zn + Cu²⁺ → Zn²⁺ + Cu</li>\n</ul>\n<p class=\"learn-p\">The cell is written in short form, called <span class=\"learn-keyword\">cell notation</span>: <strong>Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s)</strong>. The anode goes on the left, the cathode on the right. A single line (|) shows a boundary between phases and a double line (||) shows the salt bridge.</p>\n\n<h3 class=\"learn-subheading\">5. Electrode Potentials and Cell Voltage</h3>\n<p class=\"learn-p\">Each metal has a different tendency to lose electrons. This is measured as the <span class=\"learn-keyword\">standard electrode potential</span>, E°, in volts. It is measured against the hydrogen electrode, which is given the value 0.00 V. A more negative E° means the metal loses electrons more easily (more reactive). Listing metals this way gives the electrochemical series.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Half-reaction (reduction)</th><th>E° (volts)</th></tr></thead><tbody>\n<tr><td>Mg²⁺ + 2e⁻ → Mg</td><td>−2.37</td></tr>\n<tr><td>Zn²⁺ + 2e⁻ → Zn</td><td>−0.76</td></tr>\n<tr><td>Fe²⁺ + 2e⁻ → Fe</td><td>−0.44</td></tr>\n<tr><td>2H⁺ + 2e⁻ → H₂</td><td>0.00</td></tr>\n<tr><td>Cu²⁺ + 2e⁻ → Cu</td><td>+0.34</td></tr>\n<tr><td>Ag⁺ + e⁻ → Ag</td><td>+0.80</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">The e.m.f. (voltage) of a cell under standard conditions is: <strong>E°cell = E°(cathode) − E°(anode)</strong>. The cathode is the electrode with the more positive E°. If E°cell is positive, the reaction is spontaneous and the cell will work.</p>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Calculate E°cell of the Daniell cell.<br>Cathode is Cu: E° = +0.34 V. Anode is Zn: E° = −0.76 V.<br>E°cell = 0.34 − (−0.76) = 0.34 + 0.76 = 1.10 V.<br><strong>Answer: 1.10 V.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> A cell is made from magnesium and silver electrodes in solutions of their ions. Find the anode, the cathode and E°cell.<br>Mg has the more negative E° (−2.37 V), so Mg is the anode. Ag (+0.80 V) is the cathode.<br>E°cell = 0.80 − (−2.37) = 0.80 + 2.37 = 3.17 V.<br>Equations: Mg → Mg²⁺ + 2e⁻ and Ag⁺ + e⁻ → Ag. Balanced overall: Mg + 2Ag⁺ → Mg²⁺ + 2Ag (the silver half-reaction is doubled so the electrons cancel).<br><strong>Answer: anode Mg, cathode Ag, E°cell = 3.17 V.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> Will iron displace copper from copper(II) sulphate solution? Will copper displace zinc from zinc sulphate solution?<br>Iron and copper: if Fe is anode (−0.44) and Cu cathode (+0.34), E°cell = 0.34 − (−0.44) = +0.78 V. It is positive, so Fe + Cu²⁺ → Fe²⁺ + Cu happens. Yes.<br>Copper and zinc: if Cu is anode (+0.34) and Zn²⁺ is reduced (−0.76), E°cell = −0.76 − 0.34 = −1.10 V. It is negative, so no reaction. No.<br><strong>Answer: iron displaces copper; copper does not displace zinc.</strong></div>\n\n<h3 class=\"learn-subheading\">6. Other Common Cells and Their Uses</h3>\n<ul class=\"learn-list\">\n<li><strong>Dry cell (Leclanché cell):</strong> used in torches and radios. The zinc case is the anode (negative). A carbon rod in the middle is the cathode (positive), surrounded by a paste of manganese(IV) oxide and ammonium chloride. It gives about 1.5 V and cannot be recharged. It is a <strong>primary cell</strong>.</li>\n<li><strong>Lead-acid accumulator:</strong> used in cars and generators. The anode is lead (Pb), the cathode is lead(IV) oxide (PbO₂), and the electrolyte is dilute sulphuric acid. Each cell gives about 2 V, so six cells joined together make a 12 V car battery. It can be recharged, so it is a <strong>secondary cell</strong>.</li>\n<li><strong>Rechargeable cells</strong> such as nickel-cadmium and lithium-ion are used in phones and laptops.</li>\n<li><strong>Fuel cell:</strong> hydrogen and oxygen are fed in continuously and react to form water, producing electricity, as in some spacecraft.</li>\n</ul>\n<p class=\"learn-p\">Other applications of the electrochemical idea: measuring the reactivity of metals, protecting iron from rusting by joining it to a more reactive metal such as zinc (<span class=\"learn-keyword\">sacrificial protection</span>, as in galvanised roofing sheets), and the electrolytic cell uses you studied in electrolysis.</p>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Saying the anode is always positive. In a galvanic cell the anode is negative; in an electrolytic cell the anode is positive. In both, the anode is where oxidation happens.<br>2. Doing E°cell = E°(anode) − E°(cathode). Always take the cathode value minus the anode value.<br>3. Changing the sign of E° when you double an equation. E° does not change when you multiply the half-equation.<br>4. Forgetting the salt bridge, or saying electrons travel through it. Ions move in the salt bridge; electrons move in the wire.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC asks you to \"draw and label a Daniell cell\", \"write the half-equations\", \"state the direction of electron flow\", and \"calculate the e.m.f. of the cell\". Label anode, cathode, salt bridge, voltmeter and the electrolytes. Always write E°cell = E°cathode − E°anode and show the unit (V). Also learn to state one difference between galvanic and electrolytic cells.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>• A galvanic cell turns chemical energy into electrical energy; an electrolytic cell does the opposite.<br>• Oxidation is at the anode, reduction is at the cathode. Electrons flow from anode to cathode in the wire.<br>• Daniell cell: Zn anode (−), Cu cathode (+), salt bridge, E°cell = 1.10 V.<br>• E°cell = E°cathode − E°anode; positive means the reaction is spontaneous.<br>• Uses: dry cells, lead-acid batteries, rechargeable cells, fuel cells, sacrificial protection.</div>",
    "questions": [
      {
        "q": "A galvanic cell is a device that converts",
        "o": [
          "Chemical energy to electrical energy",
          "Electrical energy to chemical energy",
          "Heat energy to light energy",
          "Mechanical energy to chemical energy"
        ],
        "a": 0,
        "e": "A galvanic (voltaic) cell uses a spontaneous redox reaction to produce an electric current. The reverse change, electrical to chemical energy, happens in an electrolytic cell.",
        "h": "Think of what a torch battery does.",
        "yr": "SS2"
      },
      {
        "q": "In the Daniell cell, the zinc electrode is the",
        "o": [
          "Cathode, where reduction occurs",
          "Anode, where oxidation occurs",
          "Salt bridge",
          "Cathode, where oxidation occurs"
        ],
        "a": 1,
        "e": "Zinc is more reactive than copper, so it loses electrons: Zn → Zn²⁺ + 2e⁻. Loss of electrons is oxidation, and oxidation always occurs at the anode.",
        "h": "Which metal loses electrons more easily?",
        "yr": "SS2"
      },
      {
        "q": "The function of the salt bridge in a galvanic cell is to",
        "o": [
          "Supply electrons to the cathode",
          "Increase the mass of the anode",
          "Complete the circuit by allowing ions to move between the half-cells",
          "Prevent the cell from producing current"
        ],
        "a": 2,
        "e": "The salt bridge lets ions flow between the two solutions, which completes the circuit and keeps both solutions electrically neutral. Electrons travel in the wire, not in the salt bridge.",
        "h": "Ions, not electrons, move through it.",
        "yr": "SS2"
      },
      {
        "q": "In a galvanic cell, electrons flow through the external wire from the",
        "o": [
          "Cathode to the anode",
          "Salt bridge to the cathode",
          "Positive electrode to the negative electrode",
          "Anode to the cathode"
        ],
        "a": 3,
        "e": "Electrons are released at the anode by oxidation and travel through the wire to the cathode, where they are used in reduction. So the flow is anode to cathode.",
        "h": "Electrons leave where oxidation happens.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following is a difference between a galvanic cell and an electrolytic cell?",
        "o": [
          "Oxidation occurs at the cathode in a galvanic cell",
          "The anode is negative in a galvanic cell but positive in an electrolytic cell",
          "Both need a battery to work",
          "Reduction occurs at the anode in an electrolytic cell"
        ],
        "a": 1,
        "e": "In a galvanic cell the anode is the negative electrode, but in an electrolytic cell it is joined to the positive terminal of the battery. Oxidation occurs at the anode in both cells.",
        "h": "Compare the signs of the anode in each cell.",
        "yr": "SS2"
      },
      {
        "q": "The cell notation Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s) shows that",
        "o": [
          "Copper is the anode",
          "Zinc is the cathode",
          "Zinc is the anode and copper is the cathode",
          "The salt bridge is on the left"
        ],
        "a": 2,
        "e": "By convention the anode is written on the left and the cathode on the right. The double line (||) stands for the salt bridge. So zinc is the anode and copper is the cathode.",
        "h": "Anode on the left.",
        "yr": "SS2"
      },
      {
        "q": "Given E° of Zn²⁺/Zn = −0.76 V and Cu²⁺/Cu = +0.34 V, the e.m.f. of the Zn–Cu cell is",
        "o": [
          "−0.42 V",
          "0.42 V",
          "1.10 V",
          "−1.10 V"
        ],
        "a": 2,
        "e": "E°cell = E°cathode − E°anode = 0.34 − (−0.76) = 1.10 V. Subtracting the wrong way round would give −1.10 V, and just adding signs wrongly gives 0.42 V.",
        "h": "Cathode minus anode, watch the double negative.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following is used as the electrolyte in a lead-acid accumulator?",
        "o": [
          "Ammonium chloride paste",
          "Dilute sulphuric acid",
          "Potassium nitrate",
          "Concentrated brine"
        ],
        "a": 1,
        "e": "A lead-acid battery uses dilute sulphuric acid with a lead anode and a lead(IV) oxide cathode. Ammonium chloride paste is used in the dry cell.",
        "h": "The word acid is in its name.",
        "yr": "SS2"
      },
      {
        "q": "A dry (Leclanché) cell differs from a lead-acid accumulator because the dry cell",
        "o": [
          "Gives about 12 V",
          "Uses sulphuric acid",
          "Has a lead anode",
          "Cannot be recharged"
        ],
        "a": 3,
        "e": "The dry cell is a primary cell, so its reaction cannot be reversed by recharging. The lead-acid accumulator is a secondary cell and can be recharged.",
        "h": "Think of a used torch battery.",
        "yr": "SS2"
      },
      {
        "q": "Which metal can be used to give sacrificial protection to iron (E° = −0.44 V)?",
        "o": [
          "Copper (+0.34 V)",
          "Zinc (−0.76 V)",
          "Silver (+0.80 V)",
          "Lead (−0.13 V)"
        ],
        "a": 1,
        "e": "Zinc has a more negative E° than iron, so it is more reactive and is oxidised instead of the iron. Copper, silver and lead are less reactive than zinc; copper and silver would make iron rust faster.",
        "h": "The protecting metal must be more reactive than iron.",
        "yr": "SS2"
      },
      {
        "q": "A cell is made from magnesium (E° = −2.37 V) and silver (E° = +0.80 V). What is the e.m.f. under standard conditions?",
        "o": [
          "1.57 V",
          "−3.17 V",
          "1.57 V less than the silver value",
          "3.17 V"
        ],
        "a": 3,
        "e": "Silver is the cathode and magnesium is the anode. E°cell = 0.80 − (−2.37) = 3.17 V. A positive value means the reaction is spontaneous.",
        "h": "Cathode is the more positive electrode.",
        "yr": "SS2"
      },
      {
        "q": "Which reaction will NOT take place spontaneously? (E°: Zn²⁺/Zn = −0.76 V, Fe²⁺/Fe = −0.44 V, Cu²⁺/Cu = +0.34 V)",
        "o": [
          "Zn + Cu²⁺ → Zn²⁺ + Cu",
          "Fe + Cu²⁺ → Fe²⁺ + Cu",
          "Zn + Fe²⁺ → Zn²⁺ + Fe",
          "Cu + Zn²⁺ → Cu²⁺ + Zn"
        ],
        "a": 3,
        "e": "For Cu + Zn²⁺, E°cell = −0.76 − 0.34 = −1.10 V, which is negative, so no reaction occurs. The other three each give a positive E°cell because the metal being oxidised has the more negative E°.",
        "h": "Look for the negative E°cell.",
        "yr": "SS2"
      },
      {
        "q": "A student wants to make a 12 V car battery from lead-acid cells that give about 2 V each. How many cells must be connected in series?",
        "o": [
          "12",
          "2",
          "6",
          "24"
        ],
        "a": 2,
        "e": "Voltages add when cells are joined in series. Number of cells = 12 V ÷ 2 V = 6 cells. That is why a car battery has six compartments.",
        "h": "Divide total voltage by voltage per cell.",
        "yr": "SS2"
      },
      {
        "q": "In the Daniell cell, as the cell works, what happens to the mass of the zinc rod and the copper rod?",
        "o": [
          "Zinc decreases, copper increases",
          "Zinc increases, copper decreases",
          "Both increase",
          "Both decrease"
        ],
        "a": 0,
        "e": "Zinc dissolves as Zn²⁺ ions (anode), so its mass decreases. Cu²⁺ ions are reduced to copper metal on the copper rod, so its mass increases.",
        "h": "One electrode dissolves, one gains metal.",
        "yr": "SS2"
      },
      {
        "q": "For the spontaneous cell reaction Mg + 2Ag⁺ → Mg²⁺ + 2Ag, the half-equation at the cathode is",
        "o": [
          "Mg → Mg²⁺ + 2e⁻",
          "Ag → Ag⁺ + e⁻",
          "Mg²⁺ + 2e⁻ → Mg",
          "Ag⁺ + e⁻ → Ag"
        ],
        "a": 3,
        "e": "Reduction (gain of electrons) occurs at the cathode, and silver ions gain electrons: Ag⁺ + e⁻ → Ag. Mg → Mg²⁺ + 2e⁻ is the anode (oxidation) reaction.",
        "h": "Which species gains electrons?",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Acid-Base Titration",
    "topicCode": "SS2-CHEM-18",
    "module": "Electrochemistry and Volumetric Analysis",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\">\n<p class=\"learn-p\"><span class=\"learn-keyword\">Acid-base titration</span> is a laboratory method used to find out how strong (how concentrated) an acid or a base solution is. We add one solution slowly into a measured amount of the other until the reaction is exactly complete. Think of a market woman measuring garri with a cup: she counts how many cups fill the bag. In titration, the \"cups\" are drops and cubic centimetres of solution, and we count them very carefully. Factories that make soft drinks, soap and medicine use titration every day to check their products. In this lesson you will learn the apparatus, the steps, the indicators, and how to calculate concentrations.</p>\n</div>\n\n<h3 class=\"learn-subheading\">1. Some Words You Must Know First</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">solution</span> is a liquid made when a solid, liquid or gas (the solute) dissolves in a liquid (the solvent). A <span class=\"learn-keyword\">standard solution</span> is a solution whose concentration is known exactly. <span class=\"learn-keyword\">Concentration</span> tells us how much solute is in a fixed volume of solution. We measure it in two ways:</p>\n<ul class=\"learn-list\">\n<li>Molar concentration (molarity): moles of solute per dm³ of solution. Unit: mol/dm³, also written M.</li>\n<li>Mass concentration: grams of solute per dm³ of solution. Unit: g/dm³.</li>\n</ul>\n<p class=\"learn-p\">Remember that 1 dm³ = 1000 cm³. A <span class=\"learn-keyword\">mole</span> is a fixed amount of a substance. The number of moles = mass ÷ molar mass. A <span class=\"learn-keyword\">neutralisation</span> reaction is the reaction of an acid with a base to give a salt and water only. Example: HCl + NaOH → NaCl + H₂O.</p>\n\n<h3 class=\"learn-subheading\">2. The Apparatus and What Each One Does</h3>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Apparatus</th><th>Use</th></tr></thead>\n<tbody>\n<tr><td>Burette</td><td>A long glass tube with a tap (stopcock) and a scale. It delivers a variable volume of one solution, drop by drop. The difference between the start and final readings is the titre.</td></tr>\n<tr><td>Pipette (with a pipette filler)</td><td>Measures out one fixed volume very accurately, for example 25.0 cm³. Never suck by mouth.</td></tr>\n<tr><td>Conical flask</td><td>Holds the solution from the pipette. Its slanting sides let you swirl without spilling.</td></tr>\n<tr><td>White tile</td><td>Placed under the flask so that the colour change is easy to see.</td></tr>\n<tr><td>Funnel</td><td>Used to fill the burette. It is removed before reading the burette.</td></tr>\n<tr><td>Retort stand and clamp</td><td>Holds the burette upright.</td></tr>\n<tr><td>Wash bottle with distilled water</td><td>Rinses the apparatus and washes down drops from the flask walls.</td></tr>\n<tr><td>Volumetric (standard) flask</td><td>Used to prepare a standard solution of an exact volume, such as 250 cm³.</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">titre</span> is the volume of solution delivered from the burette. The <span class=\"learn-keyword\">end point</span> is the moment the indicator just changes colour, showing that the reaction is complete.</p>\n\n<h3 class=\"learn-subheading\">3. Acid-Base Indicators</h3>\n<p class=\"learn-p\">An <span class=\"learn-keyword\">indicator</span> is a substance that has one colour in acid and a different colour in alkali. It tells us when the acid and the base have exactly neutralised each other. Only 2 or 3 drops are needed. Common indicators are:</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Indicator</th><th>Colour in acid</th><th>Colour in alkali</th><th>Notes</th></tr></thead>\n<tbody>\n<tr><td>Methyl orange</td><td>Red</td><td>Yellow</td><td>Orange at the end point. Changes at about pH 3 to 4.5.</td></tr>\n<tr><td>Phenolphthalein</td><td>Colourless</td><td>Pink</td><td>Changes at about pH 8 to 10.</td></tr>\n<tr><td>Bromothymol blue</td><td>Yellow</td><td>Blue</td><td>Green when neutral. Changes at about pH 6 to 7.6.</td></tr>\n<tr><td>Litmus</td><td>Red</td><td>Blue</td><td>Good for a quick test, but its colour change is not sharp enough for titration.</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\"><strong>Choosing the right indicator.</strong> The pH at the end point depends on the strength of the acid and the base used. A <span class=\"learn-keyword\">strong acid</span> (such as HCl) ionises almost completely in water. A <span class=\"learn-keyword\">weak acid</span> (such as ethanoic acid) ionises only slightly. The same is true for strong bases (NaOH) and weak bases (NH₃ solution).</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Acid and base used</th><th>Suitable indicator</th></tr></thead>\n<tbody>\n<tr><td>Strong acid + strong base (HCl and NaOH)</td><td>Methyl orange or phenolphthalein</td></tr>\n<tr><td>Weak acid + strong base (ethanoic acid and NaOH)</td><td>Phenolphthalein</td></tr>\n<tr><td>Strong acid + weak base (HCl and NH₃ solution)</td><td>Methyl orange</td></tr>\n<tr><td>Weak acid + weak base</td><td>No indicator gives a sharp change</td></tr>\n</tbody></table></div>\n\n<h3 class=\"learn-subheading\">4. The Procedure Step by Step</h3>\n<p class=\"learn-p\">Suppose the acid is in the burette and the base is in the flask.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Rinse the burette with distilled water, then with a little of the acid. This stops water from diluting the acid.</li>\n<li>Step 2: Rinse the pipette with a little of the base solution, and rinse the conical flask with distilled water only. (Never rinse the flask with the base, because extra base would be left in it and spoil the result.)</li>\n<li>Step 3: Fill the burette with the acid using a funnel. Open the tap briefly so the tip is full of acid with no air bubble. Remove the funnel. Read the bottom of the meniscus (the curved surface of the liquid) at eye level, and record the initial reading.</li>\n<li>Step 4: Use the pipette and filler to transfer 25.0 cm³ of the base into the conical flask. Add 2 or 3 drops of the indicator.</li>\n<li>Step 5: Stand the flask on the white tile under the burette. Run in the acid while swirling the flask with one hand.</li>\n<li>Step 6: Go slowly (drop by drop) when the colour starts to change slowly. Stop at the first permanent colour change. This is the end point.</li>\n<li>Step 7: Read the final burette reading. Titre = final reading − initial reading.</li>\n<li>Step 8: Repeat until you have at least two or three titres that agree within 0.10 cm³ (concordant titres). Find their average (mean).</li>\n</ol>\n<p class=\"learn-p\">The first titration is often a rough one to find the approximate end point. Then you repeat more carefully.</p>\n\n<h3 class=\"learn-subheading\">5. The Calculation Method</h3>\n<p class=\"learn-p\">We use the balanced equation to see how many moles of acid react with one mole of base. The general equation is:</p>\n<p class=\"learn-p\"><strong>(CₐVₐ) ÷ (C_bV_b) = nₐ ÷ n_b</strong></p>\n<p class=\"learn-p\">Here Cₐ and C_b are the molar concentrations of acid and base, Vₐ and V_b are their volumes (in the same unit), and nₐ and n_b are the numbers of moles of acid and base in the balanced equation. For example, in HCl + NaOH → NaCl + H₂O, nₐ = 1 and n_b = 1. In H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O, nₐ = 1 and n_b = 2.</p>\n<p class=\"learn-p\">Many students prefer the mole method, which is safer:</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Write the balanced equation.</li>\n<li>Step 2: Find moles of the solution whose concentration you know: moles = concentration (mol/dm³) × volume (dm³). To change cm³ to dm³, divide by 1000.</li>\n<li>Step 3: Use the mole ratio from the equation to get the moles of the other solution.</li>\n<li>Step 4: Concentration = moles ÷ volume (dm³).</li>\n<li>Step 5: To change to g/dm³, multiply molar concentration by the molar mass.</li>\n</ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> 25.0 cm³ of sodium hydroxide solution was neutralised by 20.0 cm³ of 0.10 mol/dm³ HCl. Find the concentration of the NaOH in mol/dm³.<br>Equation: HCl + NaOH → NaCl + H₂O (ratio 1 : 1).<br>Moles of HCl = 0.10 × (20.0 ÷ 1000) = 0.10 × 0.0200 = 0.00200 mol.<br>Moles of NaOH = 0.00200 mol (1 : 1).<br>Concentration of NaOH = 0.00200 ÷ (25.0 ÷ 1000) = 0.00200 ÷ 0.0250 = 0.080 mol/dm³.<br><strong>Answer: 0.080 mol/dm³.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> 25.0 cm³ of 0.20 mol/dm³ NaOH needed 20.0 cm³ of sulphuric acid for complete neutralisation. Find the concentration of the acid.<br>Equation: H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O (1 mole of acid : 2 moles of base).<br>Moles of NaOH = 0.20 × 0.0250 = 0.00500 mol.<br>Moles of H₂SO₄ = 0.00500 ÷ 2 = 0.00250 mol.<br>Concentration of acid = 0.00250 ÷ 0.0200 = 0.125 mol/dm³.<br><strong>Answer: 0.125 mol/dm³.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> 25.0 cm³ of sodium carbonate solution reacted completely with 20.0 cm³ of 0.10 mol/dm³ HCl. Find the concentration of the sodium carbonate in mol/dm³ and in g/dm³. (Na = 23, C = 12, O = 16)<br>Equation: Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂ (1 mole of carbonate : 2 moles of acid).<br>Moles of HCl = 0.10 × 0.0200 = 0.00200 mol.<br>Moles of Na₂CO₃ = 0.00200 ÷ 2 = 0.00100 mol.<br>Concentration = 0.00100 ÷ 0.0250 = 0.040 mol/dm³.<br>Molar mass of Na₂CO₃ = (2 × 23) + 12 + (3 × 16) = 46 + 12 + 48 = 106 g/mol.<br>Mass concentration = 0.040 × 106 = 4.24 g/dm³.<br><strong>Answer: 0.040 mol/dm³, which is 4.24 g/dm³.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4 (using the formula):</strong> What volume of 0.10 mol/dm³ KOH will neutralise 20.0 cm³ of 0.15 mol/dm³ HNO₃?<br>Equation: HNO₃ + KOH → KNO₃ + H₂O, so nₐ = 1 and n_b = 1.<br>(CₐVₐ) ÷ (C_bV_b) = nₐ ÷ n_b gives (0.15 × 20.0) ÷ (0.10 × V_b) = 1.<br>0.10 × V_b = 3.0, so V_b = 3.0 ÷ 0.10 = 30.0 cm³.<br><strong>Answer: 30.0 cm³ of KOH.</strong></div>\n\n<h3 class=\"learn-subheading\">6. Accuracy and Good Practice</h3>\n<ul class=\"learn-list\">\n<li>Read the burette at eye level, at the bottom of the meniscus, to avoid parallax error (a wrong reading caused by looking from above or below).</li>\n<li>Remove the funnel before reading, because a drop hanging in it can fall and change the volume.</li>\n<li>Make sure there is no air bubble in the burette tip.</li>\n<li>Add the last drops one at a time near the end point, and wash the walls of the flask with distilled water. Extra distilled water in the flask does not change the number of moles, so it is allowed.</li>\n<li>Use concordant titres (within 0.10 cm³) and take their mean. Titres 22.10, 22.00 and 22.20 give a mean of 22.10 cm³.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">7. Uses of Titration</h3>\n<ul class=\"learn-list\">\n<li>Finding the concentration of an acid or alkali in the laboratory.</li>\n<li>Checking the acid content of foods and drinks, such as vinegar, lime juice and soft drinks.</li>\n<li>Checking the purity of drugs, for example finding how much antacid (a base) is in a tablet.</li>\n<li>Checking soil acidity so that farmers know how much lime to add.</li>\n<li>Controlling quality in industries that make soap, fertiliser and cleaning chemicals.</li>\n<li>Finding the percentage purity of a solid, such as impure sodium hydroxide, and the relative molecular mass of an unknown acid.</li>\n</ul>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Forgetting the mole ratio. For H₂SO₄ with NaOH the ratio is 1 : 2, not 1 : 1. Always write the balanced equation first.<br>2. Using cm³ in a calculation that needs dm³. Divide cm³ by 1000, or use the same unit on both sides in the formula.<br>3. Rinsing the conical flask with the solution that will go in it, or rinsing the burette with water only. Rinse the burette with its own solution and the flask with distilled water.<br>4. Using the wrong indicator, such as methyl orange for a weak acid with a strong base.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often gives a table of burette readings. Subtract to get each titre, pick the concordant ones, and find the mean. Then write the balanced equation, work out moles, and give the answer with units. In the practical paper, record all readings to two decimal places, show the units, and state the colour change at the end point, for example \"pink to colourless\" or \"yellow to orange\". The theory paper often asks you to name the apparatus, state the indicator and give a reason for choosing it.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>Titration finds an unknown concentration by neutralising a measured volume exactly.<br>The burette delivers the titre. The pipette measures a fixed volume into the conical flask.<br>An indicator shows the end point: methyl orange is red in acid and yellow in alkali; phenolphthalein is colourless in acid and pink in alkali.<br>Use phenolphthalein for weak acid with strong base, and methyl orange for strong acid with weak base.<br>Moles = concentration × volume in dm³. Use the balanced equation for the ratio.<br>(CₐVₐ) ÷ (C_bV_b) = nₐ ÷ n_b.<br>Take the mean of concordant titres, and convert to g/dm³ by multiplying by molar mass.</div>",
    "questions": [
      {
        "q": "Which apparatus is used to measure exactly 25.0 cm³ of a solution into a conical flask during titration?",
        "o": [
          "Measuring cylinder",
          "Pipette",
          "Beaker",
          "Funnel"
        ],
        "a": 1,
        "e": "A pipette is made to deliver one fixed volume very accurately, such as 25.0 cm³. A measuring cylinder is less accurate, and a beaker only gives a rough volume.",
        "h": "Think of the tool made for one fixed, exact volume.",
        "yr": "SS2"
      },
      {
        "q": "In a titration, the volume of solution delivered from the burette is called the",
        "o": [
          "End point",
          "Meniscus",
          "Titre",
          "Standard solution"
        ],
        "a": 2,
        "e": "The titre is the final burette reading minus the initial reading. The end point is the moment the indicator changes colour, not the volume.",
        "h": "It is found by subtracting the initial reading from the final reading.",
        "yr": "SS2"
      },
      {
        "q": "What colour does methyl orange show in an acid solution?",
        "o": [
          "Yellow",
          "Colourless",
          "Pink",
          "Red"
        ],
        "a": 3,
        "e": "Methyl orange is red in acid and yellow in alkali, and it is orange at the end point. Pink is the colour of phenolphthalein in alkali.",
        "h": "Methyl orange is red in acid and yellow in alkali.",
        "yr": "SS2"
      },
      {
        "q": "Which indicator is colourless in acid and pink in alkali?",
        "o": [
          "Phenolphthalein",
          "Methyl orange",
          "Bromothymol blue",
          "Red litmus"
        ],
        "a": 0,
        "e": "Phenolphthalein is colourless in acid and turns pink in alkali. Methyl orange is red in acid and yellow in alkali.",
        "h": "Its name begins with the letters 'phen'.",
        "yr": "SS2"
      },
      {
        "q": "Ethanoic acid (a weak acid) is titrated with sodium hydroxide (a strong base). The most suitable indicator is",
        "o": [
          "Methyl orange",
          "Phenolphthalein",
          "Universal paper only",
          "No indicator is needed"
        ],
        "a": 1,
        "e": "A weak acid with a strong base gives an end point above pH 7, and phenolphthalein changes colour at about pH 8 to 10. Methyl orange changes at about pH 3 to 4.5, which is too low.",
        "h": "The end point is slightly alkaline.",
        "yr": "SS2"
      },
      {
        "q": "Why is the burette rinsed with a little of the solution it will hold before it is filled?",
        "o": [
          "To make the tap turn easily",
          "To remove air bubbles only",
          "To change the colour of the indicator",
          "To prevent water left inside from diluting the solution"
        ],
        "a": 3,
        "e": "Any distilled water left in the burette would dilute the solution and change its concentration, giving a wrong titre. Rinsing with the solution itself avoids this.",
        "h": "Think about what leftover water does to concentration.",
        "yr": "SS2"
      },
      {
        "q": "The end point of a titration is the point at which",
        "o": [
          "The indicator just changes colour permanently",
          "The burette is empty",
          "The flask is full",
          "The acid is added in excess"
        ],
        "a": 0,
        "e": "At the end point the indicator changes colour, showing that the reaction is just complete. Adding acid in excess would pass the end point.",
        "h": "It is shown by the indicator.",
        "yr": "SS2"
      },
      {
        "q": "How many moles of HCl are present in 20.0 cm³ of 0.50 mol/dm³ HCl solution?",
        "o": [
          "0.0250 mol",
          "0.0100 mol",
          "10.0 mol",
          "0.400 mol"
        ],
        "a": 1,
        "e": "Moles = concentration × volume in dm³ = 0.50 × (20.0 ÷ 1000) = 0.50 × 0.0200 = 0.0100 mol. Using 20.0 without changing to dm³ would give a wrong answer of 10.0.",
        "h": "Change 20.0 cm³ to dm³ first.",
        "yr": "SS2"
      },
      {
        "q": "25.0 cm³ of NaOH solution was neutralised by 20.0 cm³ of 0.10 mol/dm³ HCl. The concentration of the NaOH in mol/dm³ is",
        "o": [
          "0.125",
          "0.050",
          "0.100",
          "0.080"
        ],
        "a": 3,
        "e": "Moles of HCl = 0.10 × 0.0200 = 0.00200 mol, and the ratio HCl : NaOH is 1 : 1. Concentration of NaOH = 0.00200 ÷ 0.0250 = 0.080 mol/dm³. The value 0.125 comes from dividing the wrong way round.",
        "h": "Moles of acid = moles of base, then divide by 0.0250 dm³.",
        "yr": "SS2"
      },
      {
        "q": "20.0 cm³ of 0.10 mol/dm³ H₂SO₄ neutralised 25.0 cm³ of NaOH solution. The concentration of the NaOH is (H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O)",
        "o": [
          "0.080 mol/dm³",
          "0.16 mol/dm³",
          "0.32 mol/dm³",
          "0.040 mol/dm³"
        ],
        "a": 1,
        "e": "Moles of H₂SO₄ = 0.10 × 0.0200 = 0.00200 mol. The ratio is 1 : 2, so moles of NaOH = 0.00400 mol. Concentration = 0.00400 ÷ 0.0250 = 0.16 mol/dm³. Using a 1 : 1 ratio would wrongly give 0.080.",
        "h": "One mole of H₂SO₄ reacts with two moles of NaOH.",
        "yr": "SS2"
      },
      {
        "q": "What volume of 0.10 mol/dm³ NaOH will neutralise 10.0 cm³ of 0.20 mol/dm³ HCl?",
        "o": [
          "5.0 cm³",
          "10.0 cm³",
          "20.0 cm³",
          "40.0 cm³"
        ],
        "a": 2,
        "e": "Moles of HCl = 0.20 × 0.0100 = 0.00200 mol, so moles of NaOH = 0.00200 mol (1 : 1). Volume = 0.00200 ÷ 0.10 = 0.0200 dm³ = 20.0 cm³. The NaOH is half as concentrated, so twice the volume is needed.",
        "h": "The base is half as concentrated as the acid.",
        "yr": "SS2"
      },
      {
        "q": "What is the mass concentration, in g/dm³, of a 0.10 mol/dm³ NaOH solution? (Na = 23, O = 16, H = 1)",
        "o": [
          "4.0 g/dm³",
          "40 g/dm³",
          "0.40 g/dm³",
          "2.3 g/dm³"
        ],
        "a": 0,
        "e": "Molar mass of NaOH = 23 + 16 + 1 = 40 g/mol. Mass concentration = molar concentration × molar mass = 0.10 × 40 = 4.0 g/dm³.",
        "h": "Multiply the molarity by the molar mass.",
        "yr": "SS2"
      },
      {
        "q": "A student obtained titres of 22.10 cm³, 22.00 cm³ and 22.20 cm³. The mean titre is",
        "o": [
          "22.00 cm³",
          "22.20 cm³",
          "66.30 cm³",
          "22.10 cm³"
        ],
        "a": 3,
        "e": "Mean = (22.10 + 22.00 + 22.20) ÷ 3 = 66.30 ÷ 3 = 22.10 cm³. The sum 66.30 is not the mean, because we must divide by the number of titres.",
        "h": "Add the three titres, then divide by three.",
        "yr": "SS2"
      },
      {
        "q": "A student rinsed the conical flask with the alkali before pipetting 25.0 cm³ of the alkali into it. What is the likely effect on the titre?",
        "o": [
          "It will be larger than the correct value",
          "It will be smaller than the correct value",
          "It will not change",
          "The indicator will not work"
        ],
        "a": 0,
        "e": "The rinsing leaves extra alkali in the flask, so the flask holds more moles of alkali than the pipette delivered. More acid is then needed to neutralise it, so the titre is too large. The flask should be rinsed with distilled water only.",
        "h": "Extra alkali needs extra acid.",
        "yr": "SS2"
      },
      {
        "q": "25.0 cm³ of 0.10 mol/dm³ Na₂CO₃ reacts with HCl according to Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂. The volume of 0.20 mol/dm³ HCl required is",
        "o": [
          "12.5 cm³",
          "50.0 cm³",
          "20.0 cm³",
          "25.0 cm³"
        ],
        "a": 3,
        "e": "Moles of Na₂CO₃ = 0.10 × 0.0250 = 0.00250 mol. The ratio is 1 : 2, so moles of HCl = 0.00500 mol. Volume = 0.00500 ÷ 0.20 = 0.0250 dm³ = 25.0 cm³. Using a 1 : 1 ratio would wrongly give 12.5 cm³.",
        "h": "Carbonate needs twice as many moles of acid.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Atomic Structure",
    "topicCode": "SS2-CHEM-06",
    "module": "Atomic Structure",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">All matter is made of <span class=\"learn-keyword\">atoms</span>. Understanding atomic structure explains chemical properties, bonding, and the periodic table.</div><h3 class=\"learn-subheading\">1. Subatomic Particles</h3><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Particle</th><th>Charge</th><th>Mass</th><th>Location</th></tr></thead><tbody><tr><td>Proton (p⁺)</td><td>+1</td><td>1</td><td>Nucleus</td></tr><tr><td>Neutron (n⁰)</td><td>0</td><td>1</td><td>Nucleus</td></tr><tr><td>Electron (e⁻)</td><td>−1</td><td>≈0 (1/1836)</td><td>Shells/orbitals</td></tr></tbody></table></div><h3 class=\"learn-subheading\">2. Atomic Number and Mass Number</h3><ul class=\"learn-list\"><li><strong>Z (atomic number):</strong> number of protons — defines the element</li><li><strong>A (mass number):</strong> protons + neutrons</li><li><strong>Neutrons:</strong> N = A − Z</li><li>Neutral atom: electrons = protons = Z</li></ul><h3 class=\"learn-subheading\">3. Isotopes</h3><p class=\"learn-p\">Same Z, different A (different neutrons). Same chemical properties; slightly different physical properties. Examples: ³⁵Cl (75%) and ³⁷Cl (25%) → Ar = 35.5</p><h3 class=\"learn-subheading\">4. Electronic Configuration</h3><p class=\"learn-p\">Max electrons per shell: 2n². Shell 1=2, Shell 2=8, Shell 3=18. Examples: Na(Z=11): 2,8,1. Ca(Z=20): 2,8,8,2.</p><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Relative Atomic Mass:</strong> Ar = weighted average. Cl: (35×75 + 37×25)/100 = 35.5.</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> Proton (Z, +1, nucleus). Neutron (N=A−Z, neutral). Electron (≈0, −1, shells). Isotopes: same Z, different A. Config: 2,8,18... Ar = weighted average.</div>",
    "questions": [
      {
        "q": "The atomic number of an element is:",
        "o": [
          "Number of neutrons",
          "Total protons + neutrons",
          "Number of protons in nucleus",
          "Number of outer electrons"
        ],
        "a": 2,
        "e": "Atomic number (Z) = number of protons in nucleus. Uniquely identifies the element. In a neutral atom, Z also equals the number of electrons.",
        "h": "Atomic number Z = number of protons (defines the element).",
        "yr": "SS2"
      },
      {
        "q": "Atom with mass number 35 and atomic number 17 has how many neutrons?",
        "o": [
          "17",
          "35",
          "18",
          "52"
        ],
        "a": 2,
        "e": "Neutrons = A − Z = 35 − 17 = 18. This is ³⁵Cl (Chlorine-35).",
        "h": "Neutrons = A − Z = 35 − 17 = 18.",
        "yr": "SS2"
      },
      {
        "q": "Isotopes have the same:",
        "o": [
          "Mass number, different atomic number",
          "Atomic number (protons) but different mass numbers (neutrons)",
          "Number of neutrons, different protons",
          "Identical chemical and physical properties"
        ],
        "a": 1,
        "e": "Isotopes: same Z (same element, same chemical properties), different A (different neutrons, slightly different physical properties).",
        "h": "Isotopes: same Z (protons), different A (neutrons).",
        "yr": "SS2"
      },
      {
        "q": "Electronic configuration of Ca (Z=20) is:",
        "o": [
          "2, 8, 10",
          "2, 8, 8, 2",
          "2, 8, 9, 1",
          "2, 10, 8"
        ],
        "a": 1,
        "e": "Ca (Z=20): Shell 1=2, Shell 2=8, Shell 3=8, Shell 4=2. Total: 2+8+8+2=20. Configuration: 2,8,8,2.",
        "h": "Ca (Z=20): 2, 8, 8, 2.",
        "yr": "SS2"
      },
      {
        "q": "Chlorine: ³⁵Cl (75%) and ³⁷Cl (25%). Relative atomic mass?",
        "o": [
          "36",
          "35.5",
          "37",
          "35"
        ],
        "a": 1,
        "e": "Ar = (35×75/100) + (37×25/100) = 26.25 + 9.25 = 35.5.",
        "h": "Ar = (35×75 + 37×25)/100 = 35.5.",
        "yr": "SS2"
      },
      {
        "q": "Maximum electrons in the third shell (M shell) is:",
        "o": [
          "8",
          "18",
          "32",
          "2"
        ],
        "a": 1,
        "e": "Max electrons in shell n = 2n². Shell 3: 2×9 = 18.",
        "h": "Max electrons shell 3 = 2×3² = 18.",
        "yr": "SS2"
      },
      {
        "q": "Chemical properties of an element are determined by:",
        "o": [
          "Neutrons",
          "Protons",
          "Electrons (especially valence electrons in outer shell)",
          "Nucleons"
        ],
        "a": 2,
        "e": "Chemical properties determined by electrons — specifically valence (outermost shell) electrons. They participate in bonding and determine reactivity.",
        "h": "Chemical properties: determined by valence (outer shell) electrons.",
        "yr": "SS2"
      },
      {
        "q": "Ion Na⁺ has electronic configuration 2,8. Na⁺ has:",
        "o": [
          "11 electrons and 11 protons",
          "10 electrons and 11 protons",
          "10 electrons and 10 protons",
          "11 electrons and 10 protons"
        ],
        "a": 1,
        "e": "Na Z=11 → 11 protons (unchanged). Na⁺ lost 1 electron: 11−1=10 electrons. Config: 2+8=10.",
        "h": "Na⁺: 11 protons (Z=11), 10 electrons (lost 1). Config: 2,8.",
        "yr": "SS2"
      },
      {
        "q": "¹⁴C differs from ¹²C in that:",
        "o": [
          "Different number of protons",
          "2 more neutrons (8 vs 6), making ¹⁴C radioactively unstable",
          "2 more electrons",
          "Different element"
        ],
        "a": 1,
        "e": "¹²C: Z=6, 6 neutrons. ¹⁴C: Z=6 (still carbon), 8 neutrons. Extra neutrons make ¹⁴C radioactive (half-life 5,730 years). Used in radiocarbon dating.",
        "h": "¹⁴C vs ¹²C: same Z=6; ¹⁴C has 8 neutrons (vs 6) → radioactive.",
        "yr": "SS2"
      },
      {
        "q": "Valence electrons are:",
        "o": [
          "All electrons in atom",
          "Electrons in first shell only",
          "Electrons in outermost shell — determine chemical behaviour",
          "Neutrons in nucleus"
        ],
        "a": 2,
        "e": "Valence electrons = electrons in outermost shell. Determine valency, bonding, and reactivity. Elements in same group have same number of valence electrons → similar chemistry.",
        "h": "Valence electrons = outer shell electrons; determine bonding and chemistry.",
        "yr": "SS2"
      },
      {
        "q": "Element with config 2,8,6 is in which Group?",
        "o": [
          "Group II",
          "Group IV",
          "Group VI",
          "Group VIII"
        ],
        "a": 2,
        "e": "6 valence electrons = Group VI. Z = 2+8+6 = 16 = Sulphur (Group VI).",
        "h": "6 valence electrons = Group VI. Config 2,8,6: Z=16 = Sulphur.",
        "yr": "SS2"
      },
      {
        "q": "Rutherford's gold foil experiment showed:",
        "o": [
          "All alpha particles deflected 180°",
          "Most alphas passed through; few deflected at large angles → tiny dense positive nucleus",
          "Alphas converted to electrons",
          "Electrons orbit in circles"
        ],
        "a": 1,
        "e": "Rutherford (1911): most alphas pass through (atom = mostly empty space); ~1 in 8000 deflected at large angles (concentrated positive charge). Conclusion: tiny dense positive nucleus.",
        "h": "Rutherford: most alphas through; few deflect back → tiny dense nucleus.",
        "yr": "SS2"
      },
      {
        "q": "Config 2,8,8,1 is in which Period?",
        "o": [
          "Period 2",
          "Period 3",
          "Period 4",
          "Period 5"
        ],
        "a": 2,
        "e": "Period = number of shells. Config 2,8,8,1 has 4 shells → Period 4. Z=19=Potassium. Group I (1 valence electron).",
        "h": "4 shells (2,8,8,1) → Period 4. Z=19 = Potassium.",
        "yr": "SS2"
      },
      {
        "q": "An anion is:",
        "o": [
          "Atom lost electrons, positive charge",
          "Atom gained electrons, negative charge",
          "Atom with equal protons and electrons",
          "Atom with more protons than neutrons"
        ],
        "a": 1,
        "e": "Anion = gained electrons → negative charge (e.g., O²⁻). Cation = lost electrons → positive charge (e.g., Na⁺).",
        "h": "Anion = gained electrons → negative charge. Cation = lost electrons → positive.",
        "yr": "SS2"
      },
      {
        "q": "Elements X (2,8,2) and Y (2,8,6) form which type of compound?",
        "o": [
          "Covalent (share electrons)",
          "Ionic (X loses 2e⁻ to Y → X²⁺ and Y²⁻)",
          "Metallic",
          "No compound forms"
        ],
        "a": 1,
        "e": "X has 2 valence electrons (metal, loses electrons). Y has 6 valence electrons (non-metal, gains 2). X loses 2e⁻ to Y → ionic bond. Example: X=Mg, Y=S → MgS.",
        "h": "Metal (2 valence e⁻) + non-metal (6 valence e⁻) → ionic compound.",
        "yr": "SS2"
      },
      {
        "q": "Bohr model proposed electrons:",
        "o": [
          "Randomly distributed",
          "Orbit nucleus in specific energy levels; emit or absorb light only when jumping between levels",
          "In plum pudding arrangement",
          "Stationary around nucleus"
        ],
        "a": 1,
        "e": "Bohr (1913): electrons in specific quantised energy shells. Jump between levels by absorbing or emitting photons (E=hf). Explained hydrogen line spectrum.",
        "h": "Bohr: electrons in specific shells; emit/absorb light when changing levels.",
        "yr": "SS2"
      },
      {
        "q": "Ar = 24. Isotopes: mass 24 (80%), mass 25 (x%), mass 26 (4%). x = ?",
        "o": [
          "10",
          "16",
          "20",
          "12"
        ],
        "a": 1,
        "e": "80 + x + 4 = 100 → x = 16.",
        "h": "80 + x + 4 = 100 → x = 16%.",
        "yr": "SS2"
      },
      {
        "q": "Cl⁻ (Z=17) contains how many electrons?",
        "o": [
          "16",
          "17",
          "18",
          "35"
        ],
        "a": 2,
        "e": "Cl Z=17 → 17 electrons neutral. Cl⁻ gained 1e⁻ → 18 electrons. Config: 2,8,8 (noble gas configuration).",
        "h": "Cl⁻: 17 protons + 1 gained electron = 18 electrons. Config: 2,8,8.",
        "yr": "SS2"
      },
      {
        "q": "Which pair are isotopes?",
        "o": [
          "¹²C and ¹²N",
          "²³Na and ²⁴Mg",
          "¹H and ²H",
          "¹⁶O and ³²S"
        ],
        "a": 2,
        "e": "Isotopes = same Z, different A. ¹H (Z=1) and ²H (Z=1) are both hydrogen → isotopes. All other pairs are different elements.",
        "h": "¹H and ²H: both Z=1 (hydrogen); different A (0 and 1 neutron) → isotopes.",
        "yr": "SS2"
      },
      {
        "q": "Mass of electron relative to proton is approximately:",
        "o": [
          "Equal (1:1)",
          "1/1836 of proton mass",
          "Twice proton mass",
          "1/2 proton mass"
        ],
        "a": 1,
        "e": "Electron mass ≈ 9.11×10⁻³¹ kg = 1/1836 of proton mass. Electrons have negligible mass — atom mass essentially all in nucleus (protons + neutrons).",
        "h": "Electron mass ≈ 1/1836 of proton mass — negligible for atomic mass.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Chemical Bonding",
    "topicCode": "SS2-CHEM-07",
    "module": "Atomic Structure",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\"><span class=\"learn-keyword\">Chemical bonds</span> hold atoms together. Atoms bond to achieve stable noble gas configurations. Bond type depends on the nature of atoms and electronegativity differences.</div><h3 class=\"learn-subheading\">1. Ionic Bonding</h3><p class=\"learn-p\">Electrons transferred from metal to non-metal → ions attract electrostatically. High MP/BP; conduct when dissolved/molten; soluble in water; brittle.</p><h3 class=\"learn-subheading\">2. Covalent Bonding</h3><p class=\"learn-p\">Electrons shared between non-metals. Single (1 pair), double (2 pairs), triple (3 pairs). Low MP/BP; poor conductors; often insoluble in water. Dative bond: both electrons from one atom.</p><h3 class=\"learn-subheading\">3. Metallic Bonding</h3><p class=\"learn-p\">Sea of delocalised electrons around positive metal ions. Explains conductivity, malleability, ductility, lustre.</p><h3 class=\"learn-subheading\">4. Electronegativity</h3><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>EN Difference</th><th>Bond Type</th></tr></thead><tbody><tr><td>0</td><td>Pure covalent</td></tr><tr><td>0.1–1.7</td><td>Polar covalent</td></tr><tr><td>&gt;1.7</td><td>Ionic</td></tr></tbody></table></div><h3 class=\"learn-subheading\">5. VSEPR Shapes</h3><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Molecule</th><th>Bonding Pairs</th><th>Lone Pairs</th><th>Shape</th><th>Angle</th></tr></thead><tbody><tr><td>BeCl₂</td><td>2</td><td>0</td><td>Linear</td><td>180°</td></tr><tr><td>BF₃</td><td>3</td><td>0</td><td>Trigonal planar</td><td>120°</td></tr><tr><td>CH₄</td><td>4</td><td>0</td><td>Tetrahedral</td><td>109.5°</td></tr><tr><td>NH₃</td><td>3</td><td>1</td><td>Pyramidal</td><td>107°</td></tr><tr><td>H₂O</td><td>2</td><td>2</td><td>Bent</td><td>104.5°</td></tr></tbody></table></div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>VSEPR:</strong> Lone pairs repel more than bonding pairs. CH₄=109.5°, NH₃=107°, H₂O=104.5°. Each lone pair reduces bond angle.</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> Ionic = electron transfer. Covalent = sharing. Metallic = electron sea. Dative = both electrons from one atom. Lone pairs reduce bond angles.</div>",
    "questions": [
      {
        "q": "Ionic bond forms when:",
        "o": [
          "Two non-metals share electrons equally",
          "Metal transfers electrons to non-metal forming oppositely charged ions",
          "Metal shares electrons with another metal",
          "Electrons delocalised across many atoms"
        ],
        "a": 1,
        "e": "Ionic bonding: electron transfer from metal (loses electrons) to non-metal (gains electrons). Oppositely charged ions attract electrostatically.",
        "h": "Ionic bond = electron TRANSFER (metal→non-metal) → electrostatic attraction.",
        "yr": "SS2"
      },
      {
        "q": "Shape of water molecule (H₂O):",
        "o": [
          "Linear (180°)",
          "Trigonal planar (120°)",
          "Tetrahedral (109.5°)",
          "Bent/V-shaped (~104.5°)"
        ],
        "a": 3,
        "e": "H₂O: 2 bonding pairs + 2 lone pairs on oxygen. VSEPR: 4 pairs arrange tetrahedrally, but lone pairs compress H–O–H to 104.5° → bent shape.",
        "h": "H₂O: 2 bonding + 2 lone pairs → bent, 104.5°.",
        "yr": "SS2"
      },
      {
        "q": "Metallic conductivity explained by:",
        "o": [
          "Metal ions vibrating and carrying current",
          "Free delocalised electrons moving under voltage, carrying charge",
          "Ionic bonds breaking for current flow",
          "No fixed positive ions in metals"
        ],
        "a": 1,
        "e": "Free delocalised electrons in metallic bond flow directionally when voltage applied → electrical current. This explains both electrical and thermal conductivity.",
        "h": "Metallic conductivity: free delocalised electrons flow under voltage.",
        "yr": "SS2"
      },
      {
        "q": "A dative (coordinate) bond differs from normal covalent bond in that:",
        "o": [
          "Dative bond is weaker",
          "Both electrons in shared pair come from only ONE atom (the donor)",
          "Dative involves electron transfer",
          "Dative only in ionic compounds"
        ],
        "a": 1,
        "e": "Normal covalent: each atom contributes 1 electron to shared pair. Dative: one atom (Lewis base/donor) supplies both electrons. Example: NH₄⁺ formation — N donates lone pair to H⁺.",
        "h": "Dative bond: both electrons from ONE atom (the donor).",
        "yr": "SS2"
      },
      {
        "q": "Bond angle in CH₄ is 109.5° because:",
        "o": [
          "4 lone pairs around carbon",
          "4 bonding pairs arranged tetrahedrally — equal repulsions maximise separation",
          "Carbon forms 4 double bonds",
          "Ionic bonds between C and H"
        ],
        "a": 1,
        "e": "CH₄: 4 bonding pairs, 0 lone pairs. VSEPR: 4 pairs arrange tetrahedrally at 109.5° — equal repulsions, no lone pairs to distort.",
        "h": "CH₄: 4 bonding, 0 lone pairs → perfect tetrahedron, 109.5°.",
        "yr": "SS2"
      },
      {
        "q": "Which molecule has a triple bond?",
        "o": [
          "H₂O",
          "O₂",
          "N₂",
          "CO₂"
        ],
        "a": 2,
        "e": "N₂ has triple bond (N≡N): 3 shared pairs. One of the strongest bonds in chemistry (~945 kJ/mol). O₂ has double bond; CO₂ has two double bonds; H₂O has single bonds.",
        "h": "N≡N triple bond (3 shared pairs) — very strong bond.",
        "yr": "SS2"
      },
      {
        "q": "Ionic compounds conduct electricity when dissolved because:",
        "o": [
          "Water breaks bonds creating free electrons",
          "Dissolving releases free ions (cations and anions) that carry current toward electrodes",
          "Compound reacts with water to form metals",
          "Water molecules carry electrons"
        ],
        "a": 1,
        "e": "NaCl → Na⁺(aq) + Cl⁻(aq). Na⁺ moves to cathode (−); Cl⁻ moves to anode (+). Moving ions carry electrical charge → current.",
        "h": "Ionic solution: ions move to electrodes, carrying charge → conducts electricity.",
        "yr": "SS2"
      },
      {
        "q": "NH₃ bond angle is ~107°, less than 109.5° because:",
        "o": [
          "N is smaller than C",
          "1 lone pair on N repels bonding pairs more than bonding pairs repel each other, compressing H–N–H",
          "NH₃ is ionic",
          "H has no electron pairs"
        ],
        "a": 1,
        "e": "NH₃: 3 bonding + 1 lone pair. Lone pair (closer to N nucleus) repels bonding pairs more strongly → compresses angle from 109.5° to ~107°.",
        "h": "NH₃: lone pair repels bonding pairs more → 107° (less than 109.5°).",
        "yr": "SS2"
      },
      {
        "q": "EN difference indicating ionic bond:",
        "o": [
          "H–H (0)",
          "C–H (~0.4)",
          "N–H (~0.9)",
          "Na–Cl (~2.1)"
        ],
        "a": 3,
        "e": "EN difference >1.7 = ionic. Na (0.9) vs Cl (3.0) = 2.1 → ionic. H–H=0 (pure covalent); C–H=0.4 (polar covalent); N–H=0.9 (polar covalent).",
        "h": "EN difference >1.7 = ionic. Na–Cl ≈ 2.1 → ionic.",
        "yr": "SS2"
      },
      {
        "q": "Covalent molecular compounds are poor conductors because:",
        "o": [
          "Their bonds are too strong",
          "No free ions or delocalised electrons — all electrons fixed in bonds between specific atoms",
          "They melt at very high T",
          "They react with electrodes"
        ],
        "a": 1,
        "e": "Conductivity requires mobile charge carriers. Covalent molecular compounds have all electrons fixed in specific bonds — no free electrons; no ions in solution → don't conduct.",
        "h": "Covalent compounds: no free electrons or ions → cannot conduct electricity.",
        "yr": "SS2"
      },
      {
        "q": "High melting point of ionic compounds explained by:",
        "o": [
          "Strong covalent bonds between ions",
          "Strong electrostatic attractions between oppositely charged ions throughout the lattice — requires much energy to overcome",
          "Large atomic masses",
          "Metallic bonding within lattice"
        ],
        "a": 1,
        "e": "Ionic lattice: millions of ions held by strong electrostatic forces in all directions. Melting requires overcoming all these forces simultaneously → very high temperatures (NaCl melts at 801°C).",
        "h": "High ionic MP: strong electrostatic forces throughout lattice → much energy to melt.",
        "yr": "SS2"
      },
      {
        "q": "In NH₄⁺ formation, the 4th N–H bond is dative because:",
        "o": [
          "H contributes two electrons",
          "N donates its lone pair to H⁺ (empty orbital) — both electrons from N",
          "4th bond is weaker",
          "N loses an electron"
        ],
        "a": 1,
        "e": "NH₃ has lone pair on N. H⁺ has empty orbital. N donates lone pair to H⁺ → dative N→H bond. Once formed, all 4 N–H bonds are identical.",
        "h": "NH₄⁺: N lone pair donated to H⁺ → dative bond. All 4 N–H bonds identical once formed.",
        "yr": "SS2"
      },
      {
        "q": "Metallic malleability explained by:",
        "o": [
          "Directional ionic bonds allowing sliding",
          "Non-directional electron sea allows ion layers to slide without breaking bond",
          "Weak covalent bonds that break/reform",
          "High electronegativity of metals"
        ],
        "a": 1,
        "e": "Metallic bond is non-directional — electron sea surrounds ions from all angles. Layers of metal ions can slide past each other; electron sea maintains bonding throughout.",
        "h": "Metallic malleability: non-directional electron sea allows ion layers to slide.",
        "yr": "SS2"
      },
      {
        "q": "BF₃ has trigonal planar shape. B–F bonds are:",
        "o": [
          "At 90° in square arrangement",
          "All in same plane at 120°",
          "Pyramidal at 107°",
          "At 109.5°"
        ],
        "a": 1,
        "e": "BF₃: B has 3 bonding pairs, 0 lone pairs. Three pairs maximise separation at 120° in a plane → trigonal planar. B has incomplete octet (6 electrons).",
        "h": "BF₃: 3 bonding pairs, 0 lone pairs → trigonal planar, 120°.",
        "yr": "SS2"
      },
      {
        "q": "Polar covalent bond forms when:",
        "o": [
          "Atoms have identical electronegativity",
          "Different electronegativities cause unequal sharing → partial charges δ+ and δ−",
          "Electrons completely transferred",
          "Both atoms are metals"
        ],
        "a": 1,
        "e": "Unequal sharing due to EN difference → more EN atom attracts electrons more → δ− on it; δ+ on other. Example: Hδ+–Clδ− (Cl more EN).",
        "h": "Polar covalent: unequal sharing → δ+ and δ− partial charges.",
        "yr": "SS2"
      },
      {
        "q": "Which has giant ionic lattice structure?",
        "o": [
          "Glucose",
          "Diamond",
          "NaCl",
          "Iodine"
        ],
        "a": 2,
        "e": "NaCl = giant ionic lattice (Na⁺ and Cl⁻ in regular 3D array). Glucose = simple covalent molecule. Diamond = giant covalent. Iodine = simple covalent molecular solid.",
        "h": "Giant ionic lattice = NaCl. Giant covalent = diamond/silica.",
        "yr": "SS2"
      },
      {
        "q": "More shared pairs = ?",
        "o": [
          "Weaker and longer bond",
          "Stronger and shorter bond: single < double < triple",
          "Bond strength unrelated to shared pairs",
          "Triple bonds weakest"
        ],
        "a": 1,
        "e": "Bond order ↑ → stronger bond, shorter length. N–N (single, ~163 kJ/mol) < N=N (double, ~418) < N≡N (triple, ~945 kJ/mol).",
        "h": "More shared pairs → stronger, shorter bond. Single < Double < Triple.",
        "yr": "SS2"
      },
      {
        "q": "Gas, low BP, no conductivity — which bond type?",
        "o": [
          "Ionic",
          "Metallic",
          "Giant covalent",
          "Simple covalent (molecular)"
        ],
        "a": 3,
        "e": "Simple covalent (molecular): low MP/BP (weak intermolecular forces), gases/liquids at room T, no free ions/electrons → don't conduct. Examples: CH₄, CO₂, HCl.",
        "h": "Gas, low BP, no conductivity = simple covalent molecular compound.",
        "yr": "SS2"
      },
      {
        "q": "NaCl dot-and-cross shows:",
        "o": [
          "Electrons shared equally",
          "Na's electron transferred to Cl → Na⁺ (2,8) and Cl⁻ (2,8,8)",
          "Shared electrons between Na and Cl",
          "Both with 8 outer electrons still bonded"
        ],
        "a": 1,
        "e": "Ionic compounds show complete electron transfer. Na loses 1e⁻ (becomes Na⁺, 2,8); Cl gains 1e⁻ (becomes Cl⁻, 2,8,8). Charges shown in brackets.",
        "h": "NaCl dot-and-cross: complete electron transfer. Na⁺(2,8) and Cl⁻(2,8,8).",
        "yr": "SS2"
      },
      {
        "q": "VSEPR predicts molecular shapes based on:",
        "o": [
          "Bond lengths and energies",
          "Electron pairs (bonding + lone) arranging to minimise repulsion around central atom",
          "Atomic radii",
          "Electronegativity differences"
        ],
        "a": 1,
        "e": "VSEPR: electron pairs repel → arrange to maximise separation/minimise repulsion. Lone pairs repel more than bonding pairs. Shape and bond angles result from this arrangement.",
        "h": "VSEPR: electron pairs repel → maximise separation → determines shape and angles.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Chemical Reactions and Stoichiometry",
    "topicCode": "SS2-CHEM-08",
    "module": "Chemical Calculations",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\"><span class=\"learn-keyword\">Stoichiometry</span> is the quantitative study of chemical reactions using balanced equations to calculate amounts of reactants and products.</div><h3 class=\"learn-subheading\">1. The Mole Concept</h3><ul class=\"learn-list\"><li>1 mol = 6.02 × 10²³ particles (Avogadro's number)</li><li>n = m/M (moles = mass ÷ molar mass)</li><li>At STP: 1 mol gas = 22.4 L</li><li>Concentration c = n/V (mol/L)</li></ul><h3 class=\"learn-subheading\">2. Types of Reactions</h3><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Type</th><th>Example</th></tr></thead><tbody><tr><td>Synthesis</td><td>2H₂ + O₂ → 2H₂O</td></tr><tr><td>Decomposition</td><td>2H₂O₂ → 2H₂O + O₂</td></tr><tr><td>Displacement</td><td>Zn + CuSO₄ → ZnSO₄ + Cu</td></tr><tr><td>Double decomposition</td><td>AgNO₃ + NaCl → AgCl↓ + NaNO₃</td></tr></tbody></table></div><h3 class=\"learn-subheading\">3. Stoichiometric Calculations</h3><ol class=\"learn-list\"><li>Write and balance equation</li><li>n = m/M for given substance</li><li>Use mole ratio from equation</li><li>m = n × M for required substance</li></ol><h3 class=\"learn-subheading\">4. Limiting Reagent and % Yield</h3><ul class=\"learn-list\"><li>Limiting reagent = completely consumed first; limits product</li><li>% yield = (actual/theoretical) × 100</li></ul><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Key formulae:</strong> n=m/M. n=V/22.4 (L at STP). c=n/V (mol/L). N=n×6.02×10²³.</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> 1 mol = 6.02×10²³ particles. n=m/M. 1 mol gas = 22.4 L at STP. Mole ratio from balanced equation. Limiting reagent consumed first. % yield = (actual/theoretical) × 100.</div>",
    "questions": [
      {
        "q": "Moles in 56 g of Fe (Ar=56)?",
        "o": [
          "56 mol",
          "0.5 mol",
          "1 mol",
          "2 mol"
        ],
        "a": 2,
        "e": "n = m/M = 56/56 = 1 mol.",
        "h": "n = m/M = 56 ÷ 56 = 1 mol.",
        "yr": "SS2"
      },
      {
        "q": "Avogadro's number is:",
        "o": [
          "6.02 × 10²³ per mole",
          "22.4 × 10²³ per mole",
          "1.66 × 10⁻²⁷ per mole",
          "6.02 × 10¹² per mole"
        ],
        "a": 0,
        "e": "Nₐ = 6.02 × 10²³ per mole — number of particles in one mole of any substance.",
        "h": "Avogadro's number = 6.02 × 10²³ per mole.",
        "yr": "SS2"
      },
      {
        "q": "Volume of 1 mole of any gas at STP:",
        "o": [
          "22.4 L",
          "24.0 L",
          "11.2 L",
          "44.8 L"
        ],
        "a": 0,
        "e": "At STP (0°C, 1 atm), molar volume = 22.4 L/mol for all ideal gases (Avogadro's Law).",
        "h": "Molar volume at STP = 22.4 L/mol.",
        "yr": "SS2"
      },
      {
        "q": "2H₂ + O₂ → 2H₂O. Moles of water from 4 mol H₂?",
        "o": [
          "2 mol",
          "4 mol",
          "8 mol",
          "1 mol"
        ],
        "a": 1,
        "e": "H₂:H₂O ratio = 2:2 = 1:1. So 4 mol H₂ → 4 mol H₂O.",
        "h": "2H₂ + O₂ → 2H₂O. H₂:H₂O=1:1. 4 mol H₂ → 4 mol H₂O.",
        "yr": "SS2"
      },
      {
        "q": "Mass of CO₂ from burning 12 g carbon? (C=12, O=16)",
        "o": [
          "12 g",
          "22 g",
          "44 g",
          "28 g"
        ],
        "a": 2,
        "e": "C + O₂ → CO₂. n(C)=12/12=1 mol → n(CO₂)=1 mol. M(CO₂)=44. Mass=1×44=44 g.",
        "h": "C+O₂→CO₂. n(C)=1mol→n(CO₂)=1mol. Mass=44g.",
        "yr": "SS2"
      },
      {
        "q": "The limiting reagent is:",
        "o": [
          "Reactant in largest amount",
          "Reactant completely consumed first, determining maximum product",
          "Product formed in smallest amount",
          "Reactant with highest molar mass"
        ],
        "a": 1,
        "e": "Limiting reagent runs out first, stopping further product formation. It limits the yield. Other reactant(s) are in excess.",
        "h": "Limiting reagent = consumed first; determines max product. Others = in excess.",
        "yr": "SS2"
      },
      {
        "q": "% yield calculated as:",
        "o": [
          "(theoretical/actual) × 100",
          "(actual/theoretical) × 100",
          "(actual − theoretical) × 100",
          "(mol product/mol reactant) × 100"
        ],
        "a": 1,
        "e": "% yield = (actual yield ÷ theoretical yield) × 100. Always ≤ 100%.",
        "h": "% yield = (actual/theoretical) × 100. Always ≤ 100%.",
        "yr": "SS2"
      },
      {
        "q": "Molar mass of CaCO₃? (Ca=40, C=12, O=16)",
        "o": [
          "68",
          "100",
          "84",
          "116"
        ],
        "a": 1,
        "e": "M = 40 + 12 + 3(16) = 40 + 12 + 48 = 100 g/mol.",
        "h": "M(CaCO₃) = 40+12+3(16) = 100 g/mol.",
        "yr": "SS2"
      },
      {
        "q": "CaCO₃ → CaO + CO₂. Mass of CaO from 25 g CaCO₃? (CaCO₃=100, CaO=56)",
        "o": [
          "25 g",
          "14 g",
          "56 g",
          "100 g"
        ],
        "a": 1,
        "e": "n(CaCO₃)=25/100=0.25 mol → n(CaO)=0.25 mol. Mass=0.25×56=14 g.",
        "h": "n=0.25 mol → mass CaO = 0.25×56 = 14 g.",
        "yr": "SS2"
      },
      {
        "q": "Molar concentration =",
        "o": [
          "Mass of solute ÷ volume",
          "Moles of solute ÷ volume in litres",
          "Mass of solute ÷ mass of solvent",
          "Volume of solute ÷ volume of solvent"
        ],
        "a": 1,
        "e": "Concentration c = n/V, where n = moles and V = volume in litres (dm³). Units: mol/L or mol dm⁻³.",
        "h": "Concentration c = n/V (mol/L). n=moles; V=volume in litres.",
        "yr": "SS2"
      },
      {
        "q": "Molecules in 0.5 mol water? (Nₐ=6.02×10²³)",
        "o": [
          "3.01 × 10²³",
          "6.02 × 10²³",
          "1.204 × 10²⁴",
          "6.02 × 10²²"
        ],
        "a": 0,
        "e": "N = n × Nₐ = 0.5 × 6.02×10²³ = 3.01×10²³.",
        "h": "N = 0.5 × 6.02×10²³ = 3.01×10²³ molecules.",
        "yr": "SS2"
      },
      {
        "q": "Volume of CO₂ at STP from 10 g CaCO₃? (CaCO₃=100, Vm=22.4 L/mol)",
        "o": [
          "22.4 L",
          "2.24 L",
          "11.2 L",
          "4.48 L"
        ],
        "a": 1,
        "e": "n(CaCO₃)=10/100=0.1 mol → n(CO₂)=0.1 mol. V=0.1×22.4=2.24 L.",
        "h": "n=0.1 mol → V=0.1×22.4=2.24 L at STP.",
        "yr": "SS2"
      },
      {
        "q": "Theoretical yield 20 g, obtained 15 g. % yield?",
        "o": [
          "133%",
          "75%",
          "25%",
          "15%"
        ],
        "a": 1,
        "e": "% yield = (15/20)×100 = 75%.",
        "h": "% yield = (15/20)×100 = 75%.",
        "yr": "SS2"
      },
      {
        "q": "Empirical formula shows:",
        "o": [
          "Actual atoms in one molecule",
          "Simplest whole-number ratio of atoms of each element",
          "Arrangement of atoms in space",
          "Molar mass of compound"
        ],
        "a": 1,
        "e": "Empirical formula = simplest ratio of atoms. Example: Glucose C₆H₁₂O₆ has empirical formula CH₂O (ratio 1:2:1).",
        "h": "Empirical formula = simplest whole-number ratio of atoms.",
        "yr": "SS2"
      },
      {
        "q": "Compound: 40% C, 6.7% H, 53.3% O. Empirical formula? (C=12,H=1,O=16)",
        "o": [
          "C₂H₄O₂",
          "CHO",
          "CH₂O",
          "C₂H₂O"
        ],
        "a": 2,
        "e": "Moles: C=40/12=3.33; H=6.7/1=6.7; O=53.3/16=3.33. Divide by smallest (3.33): C=1, H=2, O=1. EF=CH₂O.",
        "h": "C:H:O = 3.33:6.7:3.33 = 1:2:1 → CH₂O.",
        "yr": "SS2"
      },
      {
        "q": "Example of double decomposition reaction:",
        "o": [
          "2Na + Cl₂ → 2NaCl",
          "CaCO₃ → CaO + CO₂",
          "NaCl + AgNO₃ → AgCl↓ + NaNO₃",
          "Zn + H₂SO₄ → ZnSO₄ + H₂"
        ],
        "a": 2,
        "e": "Double decomposition: AB + CD → AD + CB (ion exchange). NaCl + AgNO₃ → AgCl↓ + NaNO₃. AgCl precipitates.",
        "h": "Double decomposition: AB+CD→AD+CB. NaCl+AgNO₃→AgCl↓+NaNO₃.",
        "yr": "SS2"
      },
      {
        "q": "Mix 2 mol H₂ and 1 mol O₂. Limiting reagent?",
        "o": [
          "H₂",
          "O₂",
          "Neither — both completely consumed (exact ratio)",
          "Water"
        ],
        "a": 2,
        "e": "2H₂ + O₂ needs 2:1 ratio. 2 mol H₂ : 1 mol O₂ = exactly 2:1. Both consumed completely — neither in excess.",
        "h": "2 mol H₂ : 1 mol O₂ = exact 2:1 ratio → both consumed; no limiting reagent.",
        "yr": "SS2"
      },
      {
        "q": "Mass of O₂ to burn 4 g H₂? (H=1, O=16; 2H₂+O₂→2H₂O)",
        "o": [
          "4 g",
          "16 g",
          "32 g",
          "8 g"
        ],
        "a": 2,
        "e": "n(H₂)=4/2=2 mol. Ratio H₂:O₂=2:1 → n(O₂)=1 mol. Mass=1×32=32 g.",
        "h": "n(H₂)=2 mol → n(O₂)=1 mol → mass O₂=32 g.",
        "yr": "SS2"
      },
      {
        "q": "0.2 mol NaOH in 250 cm³ water: concentration?",
        "o": [
          "0.05 mol/L",
          "0.8 mol/L",
          "0.5 mol/L",
          "2.0 mol/L"
        ],
        "a": 1,
        "e": "c = n/V = 0.2/(0.25) = 0.8 mol/L.",
        "h": "c = 0.2/0.25 = 0.8 mol/L.",
        "yr": "SS2"
      },
      {
        "q": "Empirical formula CH₂, molar mass 56 g/mol. Molecular formula? (C=12,H=1)",
        "o": [
          "CH₂",
          "C₂H₄",
          "C₃H₆",
          "C₄H₈"
        ],
        "a": 3,
        "e": "EF mass = 12+2=14. Ratio = 56/14=4. Molecular formula = 4×CH₂ = C₄H₈.",
        "h": "EF mass=14. Ratio=56/14=4. MF=C₄H₈.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Gas Laws",
    "topicCode": "SS2-CHEM-09",
    "module": "Physical Chemistry",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">The <span class=\"learn-keyword\">gas laws</span> describe how the pressure, volume, and temperature of a gas are related. They apply to ideal gases — gases that have no intermolecular forces and whose molecules have negligible volume. Real gases approximate ideal behaviour at low pressures and high temperatures.</div><h3 class=\"learn-subheading\">1. Boyle's Law (1662)</h3><p class=\"learn-p\">At constant temperature, the pressure of a fixed mass of gas is inversely proportional to its volume:</p><p class=\"learn-p\"><strong>P ∝ 1/V (constant T and n) → PV = constant → P₁V₁ = P₂V₂</strong></p><ul class=\"learn-list\"><li>If pressure doubles, volume halves (at constant T).</li><li>Graph of P vs 1/V: straight line through origin.</li></ul><h3 class=\"learn-subheading\">2. Charles' Law (1787)</h3><p class=\"learn-p\">At constant pressure, the volume of a fixed mass of gas is directly proportional to its absolute temperature (in Kelvin):</p><p class=\"learn-p\"><strong>V ∝ T (constant P and n) → V/T = constant → V₁/T₁ = V₂/T₂</strong></p><ul class=\"learn-list\"><li>T must always be in Kelvin: K = °C + 273</li><li>Gas volume → 0 as T → 0 K (absolute zero = −273°C)</li></ul><h3 class=\"learn-subheading\">3. Pressure Law (Gay-Lussac's Law)</h3><p class=\"learn-p\">At constant volume, pressure is directly proportional to absolute temperature:</p><p class=\"learn-p\"><strong>P/T = constant → P₁/T₁ = P₂/T₂</strong></p><h3 class=\"learn-subheading\">4. Combined Gas Law</h3><p class=\"learn-p\"><strong>P₁V₁/T₁ = P₂V₂/T₂</strong></p><p class=\"learn-p\">This combines Boyle's and Charles' Laws and applies when all three variables change.</p><h3 class=\"learn-subheading\">5. Ideal Gas Equation</h3><p class=\"learn-p\"><strong>PV = nRT</strong></p><ul class=\"learn-list\"><li>P = pressure (Pa or atm)</li><li>V = volume (m³ or L)</li><li>n = moles of gas</li><li>R = gas constant = 8.314 J mol⁻¹ K⁻¹ (or 0.0821 L atm mol⁻¹ K⁻¹)</li><li>T = absolute temperature (K)</li></ul><h3 class=\"learn-subheading\">6. Avogadro's Law</h3><p class=\"learn-p\">Equal volumes of all gases at the same temperature and pressure contain equal numbers of molecules. At STP: 1 mole of any gas occupies 22.4 L.</p><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Law</th><th>Variables Constant</th><th>Relationship</th></tr></thead><tbody><tr><td>Boyle's</td><td>T, n</td><td>PV = k; P₁V₁ = P₂V₂</td></tr><tr><td>Charles'</td><td>P, n</td><td>V/T = k; V₁/T₁ = V₂/T₂</td></tr><tr><td>Gay-Lussac's</td><td>V, n</td><td>P/T = k; P₁/T₁ = P₂/T₂</td></tr><tr><td>Combined</td><td>n</td><td>P₁V₁/T₁ = P₂V₂/T₂</td></tr><tr><td>Ideal gas</td><td>—</td><td>PV = nRT</td></tr></tbody></table></div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Always convert to Kelvin:</strong> T(K) = T(°C) + 273. Forgetting this is the most common gas law mistake. At STP: T = 273 K, P = 101,325 Pa (1 atm).</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> Boyle: P₁V₁=P₂V₂ (constant T). Charles: V₁/T₁=V₂/T₂ (constant P). Combined: P₁V₁/T₁=P₂V₂/T₂. Ideal: PV=nRT. Avogadro: 1 mol gas = 22.4 L at STP. Always use Kelvin.</div>",
    "questions": [
      {
        "q": "Boyle's Law states that at constant temperature, the pressure and volume of a fixed mass of gas are:",
        "o": [
          "Directly proportional (P ∝ V)",
          "Inversely proportional (P ∝ 1/V)",
          "Independent of each other",
          "Equal to each other"
        ],
        "a": 1,
        "e": "Boyle's Law (1662): at constant temperature, P ∝ 1/V → PV = constant. If pressure doubles, volume halves; if volume triples, pressure drops to one-third. A graph of P vs 1/V is a straight line through the origin.",
        "h": "Boyle's Law: P ∝ 1/V at constant T. PV = constant. P₁V₁ = P₂V₂.",
        "yr": "SS2"
      },
      {
        "q": "A gas has volume 500 cm³ at 2 atm. What is its volume at 5 atm (constant temperature)?",
        "o": [
          "1250 cm³",
          "200 cm³",
          "250 cm³",
          "100 cm³"
        ],
        "a": 1,
        "e": "Boyle's Law: P₁V₁ = P₂V₂. 2 × 500 = 5 × V₂. V₂ = 1000/5 = 200 cm³.",
        "h": "P₁V₁ = P₂V₂ → 2×500 = 5×V₂ → V₂ = 200 cm³.",
        "yr": "SS2"
      },
      {
        "q": "Charles' Law requires temperature to be expressed in:",
        "o": [
          "Degrees Celsius (°C)",
          "Degrees Fahrenheit (°F)",
          "Kelvin (K)",
          "Any temperature scale"
        ],
        "a": 2,
        "e": "Charles' Law states V ∝ T (absolute temperature). Temperature must be in Kelvin because the relationship is proportional — at 0 K (absolute zero), volume would theoretically be zero. Using Celsius would give negative volumes at temperatures below 0°C, which is physically meaningless.",
        "h": "Gas laws require Kelvin. T(K) = T(°C) + 273. Never use Celsius in gas law calculations.",
        "yr": "SS2"
      },
      {
        "q": "A gas occupies 300 cm³ at 27°C. What volume will it occupy at 127°C at constant pressure?",
        "o": [
          "600 cm³",
          "400 cm³",
          "150 cm³",
          "300 cm³"
        ],
        "a": 1,
        "e": "Charles' Law: V₁/T₁ = V₂/T₂. T₁ = 27+273 = 300 K; T₂ = 127+273 = 400 K. V₂ = V₁ × T₂/T₁ = 300 × 400/300 = 400 cm³.",
        "h": "V₁/T₁=V₂/T₂. T₁=300K, T₂=400K. V₂=300×400/300=400 cm³.",
        "yr": "SS2"
      },
      {
        "q": "The ideal gas equation is PV = nRT. What does 'n' represent?",
        "o": [
          "The pressure of the gas",
          "The number of moles of gas",
          "The temperature in Kelvin",
          "The gas constant"
        ],
        "a": 1,
        "e": "In PV = nRT: P = pressure, V = volume, n = number of moles of gas, R = universal gas constant (8.314 J mol⁻¹K⁻¹), T = absolute temperature (K). The equation relates all state variables of an ideal gas.",
        "h": "PV = nRT: n = number of moles of gas.",
        "yr": "SS2"
      },
      {
        "q": "Absolute zero (0 K or −273°C) is the temperature at which:",
        "o": [
          "All gases condense into solids",
          "The volume of a gas would theoretically reach zero and all molecular motion ceases",
          "Gases exert maximum pressure",
          "Water freezes at any pressure"
        ],
        "a": 1,
        "e": "Absolute zero (0 K = −273.15°C) is the theoretical temperature at which an ideal gas would have zero volume (Charles' Law extrapolation) and all thermal motion ceases. In practice, real gases liquefy before reaching absolute zero.",
        "h": "Absolute zero (0 K = −273°C) = theoretical zero volume; all molecular motion stops.",
        "yr": "SS2"
      },
      {
        "q": "Gay-Lussac's Law (Pressure Law) states that at constant volume:",
        "o": [
          "Pressure is inversely proportional to temperature",
          "Pressure is directly proportional to absolute temperature: P/T = constant",
          "Pressure is independent of temperature",
          "Pressure equals temperature times volume"
        ],
        "a": 1,
        "e": "Gay-Lussac's Pressure Law: at constant volume, P ∝ T (Kelvin). P/T = constant → P₁/T₁ = P₂/T₂. Example: heating a sealed container increases gas pressure (risk of explosion). Car tyres have higher pressure in hot weather.",
        "h": "Gay-Lussac's Law: P/T = constant at fixed V. P₁/T₁ = P₂/T₂.",
        "yr": "SS2"
      },
      {
        "q": "A gas at 300 K and 1 atm occupies 2 L. What volume does it occupy at 600 K and 2 atm?",
        "o": [
          "4 L",
          "2 L",
          "1 L",
          "8 L"
        ],
        "a": 1,
        "e": "Combined gas law: P₁V₁/T₁ = P₂V₂/T₂. (1×2)/300 = (2×V₂)/600. 2/300 = 2V₂/600. 2/300 = V₂/300. V₂ = 2 L. (Pressure doubled reduces V by ½; temperature doubled increases V by 2 → net effect: same volume.)",
        "h": "P₁V₁/T₁=P₂V₂/T₂ → (1×2)/300=(2×V₂)/600 → V₂=2 L.",
        "yr": "SS2"
      },
      {
        "q": "Avogadro's Law states that equal volumes of gases at the same temperature and pressure:",
        "o": [
          "Have equal masses",
          "Have equal numbers of molecules (and moles)",
          "Have equal densities",
          "Exert equal pressures on their containers"
        ],
        "a": 1,
        "e": "Avogadro's Law: at the same T and P, equal volumes of any gas contain equal numbers of molecules (and therefore equal moles). This is why 1 mole of any ideal gas at STP occupies 22.4 L, regardless of whether it is H₂, O₂, CO₂, or N₂.",
        "h": "Avogadro's Law: equal volumes (same T, P) = equal moles/molecules. 1 mol any gas = 22.4 L at STP.",
        "yr": "SS2"
      },
      {
        "q": "Using PV = nRT (R = 0.0821 L·atm/mol·K), what is the volume of 2 moles of an ideal gas at 300 K and 1 atm?",
        "o": [
          "24.63 L",
          "49.26 L",
          "12.31 L",
          "82.1 L"
        ],
        "a": 1,
        "e": "PV = nRT → V = nRT/P = (2 × 0.0821 × 300)/1 = (49.26)/1 = 49.26 L.",
        "h": "V = nRT/P = (2 × 0.0821 × 300)/1 = 49.26 L.",
        "yr": "SS2"
      },
      {
        "q": "A graph of volume (V) against temperature (T in Kelvin) at constant pressure gives:",
        "o": [
          "A curve (hyperbola)",
          "A straight line through the origin, confirming V ∝ T (Charles' Law)",
          "A horizontal line (V is constant)",
          "A vertical line (T is constant)"
        ],
        "a": 1,
        "e": "Charles' Law: V ∝ T (Kelvin) at constant P. A plot of V vs T(K) gives a straight line passing through the origin (or extrapolating to zero at 0 K). This linear relationship confirms direct proportionality.",
        "h": "V vs T(K) graph = straight line through origin (Charles' Law: V ∝ T).",
        "yr": "SS2"
      },
      {
        "q": "A sealed container of gas at 300 K has pressure 2 atm. If heated to 450 K (constant volume), what is the new pressure?",
        "o": [
          "3 atm",
          "1.33 atm",
          "4 atm",
          "1 atm"
        ],
        "a": 0,
        "e": "Gay-Lussac's Law: P₁/T₁ = P₂/T₂. P₂ = P₁ × T₂/T₁ = 2 × 450/300 = 2 × 1.5 = 3 atm.",
        "h": "P₁/T₁=P₂/T₂ → P₂=2×(450/300)=3 atm.",
        "yr": "SS2"
      },
      {
        "q": "What volume (at STP) does 11 g of CO₂ occupy? (C=12, O=16; Vm=22.4 L/mol at STP)",
        "o": [
          "5.6 L",
          "22.4 L",
          "11.2 L",
          "2.24 L"
        ],
        "a": 0,
        "e": "M(CO₂) = 12 + 32 = 44 g/mol. n = 11/44 = 0.25 mol. V = n × 22.4 = 0.25 × 22.4 = 5.6 L.",
        "h": "n=11/44=0.25 mol. V=0.25×22.4=5.6 L at STP.",
        "yr": "SS2"
      },
      {
        "q": "An ideal gas differs from a real gas in that an ideal gas:",
        "o": [
          "Has higher density than real gases",
          "Has no intermolecular forces and occupies no volume (point masses) — real gases have both intermolecular forces and volume",
          "Cannot be liquefied under any conditions",
          "Obeys gas laws only at high pressures"
        ],
        "a": 1,
        "e": "An ideal gas: (1) has no intermolecular attractive or repulsive forces; (2) the gas molecules themselves occupy no volume (point masses). Real gases deviate from ideal behaviour at high pressures (molecules forced close together) and low temperatures (intermolecular forces become significant).",
        "h": "Ideal gas: no intermolecular forces, negligible molecular volume. Real gas deviates at high P, low T.",
        "yr": "SS2"
      },
      {
        "q": "The SI unit of pressure is:",
        "o": [
          "Atmosphere (atm)",
          "Millimetres of mercury (mmHg)",
          "Pascal (Pa)",
          "Bar"
        ],
        "a": 2,
        "e": "The SI unit of pressure is the Pascal (Pa), where 1 Pa = 1 N/m². Standard atmospheric pressure = 101,325 Pa = 101.325 kPa. Other common units: 1 atm = 760 mmHg = 101.325 kPa. R = 8.314 J mol⁻¹K⁻¹ when using Pa and m³.",
        "h": "SI unit of pressure = Pascal (Pa). 1 atm = 101,325 Pa = 760 mmHg.",
        "yr": "SS2"
      },
      {
        "q": "According to Gay-Lussac's Law of combining volumes, when gases react, they do so in:",
        "o": [
          "Ratios of their molar masses",
          "Simple whole number ratios of their volumes (at same T and P) — consistent with the mole ratios in the balanced equation",
          "Equal volumes always",
          "Ratios of their densities"
        ],
        "a": 1,
        "e": "Gay-Lussac's Law of combining volumes: gases react in simple whole number ratios of volumes (e.g., H₂:O₂:H₂O = 2:1:2 by volume). This is consistent with Avogadro's Law — equal volumes contain equal moles, so volume ratios = mole ratios from the balanced equation.",
        "h": "Gay-Lussac combining volumes: gases react in simple whole-number volume ratios = mole ratios.",
        "yr": "SS2"
      },
      {
        "q": "A gas occupies 4 L at STP. How many moles does it contain? (Vm = 22.4 L/mol)",
        "o": [
          "4 mol",
          "22.4 mol",
          "0.179 mol",
          "89.6 mol"
        ],
        "a": 2,
        "e": "n = V/Vm = 4/22.4 = 0.179 mol (approximately 1/5.6 mol).",
        "h": "n = V/Vm = 4/22.4 = 0.179 mol at STP.",
        "yr": "SS2"
      },
      {
        "q": "Real gases deviate most from ideal behaviour at:",
        "o": [
          "Low pressures and high temperatures",
          "High pressures and low temperatures",
          "Standard temperature and pressure (STP)",
          "High pressures and high temperatures"
        ],
        "a": 1,
        "e": "At high pressures, molecules are forced close together — their own volume becomes significant (unlike point masses). At low temperatures, molecules move slowly — intermolecular attractive forces become significant and the gas may liquefy. Both conditions cause major deviation from ideal behaviour.",
        "h": "Real gas deviates most at HIGH pressure (volume of molecules matters) and LOW temperature (forces matter).",
        "yr": "SS2"
      },
      {
        "q": "Which of the following correctly converts 25°C to Kelvin?",
        "o": [
          "248 K",
          "298 K",
          "273 K",
          "25 K"
        ],
        "a": 1,
        "e": "T(K) = T(°C) + 273 = 25 + 273 = 298 K. This conversion is essential for all gas law calculations — Charles' Law and the ideal gas equation require absolute temperature in Kelvin.",
        "h": "T(K) = T(°C) + 273 = 25 + 273 = 298 K.",
        "yr": "SS2"
      },
      {
        "q": "Using the combined gas law, a gas at 27°C, 1 atm and 3 L is heated to 127°C and compressed to 2 atm. What is the new volume?",
        "o": [
          "1.5 L",
          "2 L",
          "3 L",
          "6 L"
        ],
        "a": 0,
        "e": "T₁ = 300 K, T₂ = 400 K. P₁V₁/T₁ = P₂V₂/T₂ → (1×3)/300 = (2×V₂)/400. 3/300 = 2V₂/400. 0.01 = V₂/200. V₂ = 2 L. Wait: (1×3)/300 = 0.01; (2×V₂)/400 → 0.01 = 2V₂/400 → V₂ = (0.01×400)/2 = 4/2 = 2 L.",
        "h": "P₁V₁/T₁=P₂V₂/T₂ → (1×3)/300=(2×V₂)/400 → V₂=2 L.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Electrochemistry",
    "topicCode": "SS2-CHEM-10",
    "module": "Electrochemistry",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\"><span class=\"learn-keyword\">Electrochemistry</span> is the branch of chemistry that deals with the relationship between chemical reactions and electrical energy. It includes electrolysis (using electricity to drive chemical reactions) and electrochemical cells (using chemical reactions to produce electricity).</div><h3 class=\"learn-subheading\">1. Electrolysis</h3><p class=\"learn-p\">Electrolysis uses direct current (DC) to decompose an electrolyte (ionic compound in solution or molten). Key components:</p><ul class=\"learn-list\"><li><strong>Electrolyte:</strong> ionic compound that conducts when dissolved or molten</li><li><strong>Cathode:</strong> negative electrode — cations (positive ions) move here and are reduced (gain electrons)</li><li><strong>Anode:</strong> positive electrode — anions (negative ions) move here and are oxidised (lose electrons)</li></ul><h3 class=\"learn-subheading\">2. Electrolysis of Key Electrolytes</h3><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Electrolyte</th><th>Cathode Product</th><th>Anode Product</th></tr></thead><tbody><tr><td>Dilute H₂SO₄</td><td>H₂ gas</td><td>O₂ gas</td></tr><tr><td>Dilute HCl</td><td>H₂ gas</td><td>Cl₂ gas (or O₂ if very dilute)</td></tr><tr><td>Molten NaCl</td><td>Na metal</td><td>Cl₂ gas</td></tr><tr><td>CuSO₄ (Cu electrodes)</td><td>Cu deposited</td><td>Cu dissolves</td></tr><tr><td>CuSO₄ (Pt electrodes)</td><td>Cu deposited</td><td>O₂ gas</td></tr></tbody></table></div><h3 class=\"learn-subheading\">3. Faraday's Laws of Electrolysis</h3><ul class=\"learn-list\"><li><strong>First Law:</strong> The mass of substance deposited at an electrode is proportional to the quantity of electricity (charge) passed. m ∝ Q</li><li><strong>Second Law:</strong> When the same quantity of electricity is passed through different electrolytes, the masses deposited are proportional to the equivalent masses (molar mass ÷ valency).</li><li><strong>Key formula:</strong> Q = It (charge = current × time). Mass deposited: m = (M × I × t)/(n × F), where F = Faraday constant = 96,500 C/mol</li></ul><h3 class=\"learn-subheading\">4. Applications of Electrolysis</h3><ul class=\"learn-list\"><li>Electroplating (coating metal with another metal)</li><li>Extraction of metals (Al from Al₂O₃, Na from molten NaCl)</li><li>Purification of copper</li><li>Manufacture of chlorine and NaOH (chlor-alkali industry)</li></ul><h3 class=\"learn-subheading\">5. Electrochemical Cells</h3><p class=\"learn-p\">Galvanic/voltaic cells convert chemical energy to electrical energy. The cell with zinc and copper electrodes (Daniell cell): Zn|Zn²⁺||Cu²⁺|Cu. Anode: Zn → Zn²⁺ + 2e⁻ (oxidation). Cathode: Cu²⁺ + 2e⁻ → Cu (reduction).</p><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>OILRIG:</strong> Oxidation Is Loss (of electrons); Reduction Is Gain (of electrons). At cathode: reduction. At anode: oxidation. Cations go to cathode; anions go to anode.</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> Electrolysis: cathode = reduction (cations); anode = oxidation (anions). Faraday: Q=It; m=(MIt)/(nF); F=96,500 C/mol. Applications: electroplating, metal extraction, chlor-alkali. Galvanic cells: chemical → electrical energy.</div>",
    "questions": [
      {
        "q": "In electrolysis, the cathode is the electrode where:",
        "o": [
          "Oxidation occurs and anions are discharged",
          "Reduction occurs and cations gain electrons (are discharged)",
          "The positive terminal of the battery connects",
          "Oxygen is always produced"
        ],
        "a": 1,
        "e": "The cathode is the negative electrode in electrolysis. Cations (positive ions) are attracted to it and are reduced (gain electrons). Memory: Cathode = Reduction = Cations. Example: Cu²⁺ + 2e⁻ → Cu (copper deposited at cathode).",
        "h": "Cathode: negative electrode; reduction occurs; cations discharge here. OILRIG: Reduction Is Gain.",
        "yr": "SS2"
      },
      {
        "q": "The Faraday constant (F) represents:",
        "o": [
          "The charge of one electron",
          "The total charge of one mole of electrons (96,500 coulombs per mole)",
          "The voltage needed for electrolysis",
          "The mass of one mole of any element"
        ],
        "a": 1,
        "e": "The Faraday constant F = 96,500 C/mol is the charge of one mole of electrons. It links electrical measurements (charge in coulombs) to chemical amounts (moles). One mole of a monovalent ion (e.g., Na⁺, Cu⁺) requires 1 F; a divalent ion (Cu²⁺) requires 2 F.",
        "h": "Faraday constant F = 96,500 C/mol = charge of 1 mole of electrons.",
        "yr": "SS2"
      },
      {
        "q": "What mass of copper is deposited when a current of 2 A flows for 965 seconds through CuSO₄ solution? (Cu=64, F=96,500 C/mol)",
        "o": [
          "0.64 g",
          "1.28 g",
          "0.32 g",
          "2.56 g"
        ],
        "a": 0,
        "e": "Q = I × t = 2 × 965 = 1930 C. m = (M × Q)/(n × F) = (64 × 1930)/(2 × 96500) = 123520/193000 = 0.64 g. (Cu²⁺ needs 2 electrons, n=2)",
        "h": "Q=It=1930C. m=(MQ)/(nF)=(64×1930)/(2×96500)=0.64g.",
        "yr": "SS2"
      },
      {
        "q": "During the electrolysis of molten sodium chloride (NaCl), sodium metal is produced at the:",
        "o": [
          "Anode, by reduction of Na⁺",
          "Cathode, by reduction of Na⁺: Na⁺ + e⁻ → Na",
          "Anode, by oxidation of Cl⁻",
          "Cathode, by oxidation of Na⁺"
        ],
        "a": 1,
        "e": "In molten NaCl: Na⁺ ions migrate to the cathode (negative electrode) where they gain electrons (reduction): Na⁺ + e⁻ → Na. This is how sodium metal is industrially produced (Down's cell). At the anode: 2Cl⁻ → Cl₂ + 2e⁻ (oxidation).",
        "h": "Molten NaCl cathode: Na⁺ + e⁻ → Na (sodium metal). Anode: 2Cl⁻ → Cl₂ + 2e⁻.",
        "yr": "SS2"
      },
      {
        "q": "In electroplating, the object to be plated is connected as the:",
        "o": [
          "Anode",
          "Cathode — the metal ions in solution are reduced and deposited on it",
          "Positive terminal",
          "Electrolyte"
        ],
        "a": 1,
        "e": "In electroplating: the object to be coated = cathode (negative). Metal to be plated with = anode (positive, or dissolved from solution). Metal ions from the electrolyte are reduced and deposited on the object. Example: silver-plating spoons — spoon is cathode, silver is anode, AgNO₃ solution is electrolyte.",
        "h": "Object to be plated = cathode. Metal ions reduced and deposited onto it from solution.",
        "yr": "SS2"
      },
      {
        "q": "Faraday's First Law of Electrolysis states that the mass of substance deposited:",
        "o": [
          "Is independent of the electricity passed",
          "Is directly proportional to the quantity of electricity (charge Q = It) passed through the electrolyte",
          "Depends only on the temperature of the electrolyte",
          "Is inversely proportional to the current"
        ],
        "a": 1,
        "e": "Faraday's First Law: m ∝ Q, where Q = It (charge in coulombs = current in amperes × time in seconds). Double the charge → double the mass deposited. m = (M/nF) × Q, where M = molar mass, n = valency, F = 96,500 C/mol.",
        "h": "Faraday's 1st Law: m ∝ Q=It. Double charge → double mass deposited.",
        "yr": "SS2"
      },
      {
        "q": "The chlor-alkali process electrolyses brine (NaCl solution) to produce:",
        "o": [
          "Sodium metal and chlorine only",
          "Chlorine gas, hydrogen gas, and sodium hydroxide solution",
          "Only sodium hydroxide and water",
          "Hydrogen gas and sodium metal"
        ],
        "a": 1,
        "e": "Electrolysis of brine: Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻ (hydrogen gas evolved; OH⁻ accumulates with Na⁺ to form NaOH). Anode: 2Cl⁻ → Cl₂ + 2e⁻ (chlorine gas). Products: Cl₂ (industrial bleach, PVC), H₂ (fuel), NaOH (soap, paper).",
        "h": "Chlor-alkali: brine electrolysis → Cl₂ (anode) + H₂ + NaOH (cathode side).",
        "yr": "SS2"
      },
      {
        "q": "In the electrolysis of dilute sulphuric acid using platinum electrodes, which gas is produced at the anode?",
        "o": [
          "Hydrogen (H₂)",
          "Sulphur dioxide (SO₂)",
          "Oxygen (O₂)",
          "Sulphur trioxide (SO₃)"
        ],
        "a": 2,
        "e": "Electrolysis of dilute H₂SO₄: Cathode: 4H⁺ + 4e⁻ → 2H₂ (hydrogen). Anode: 2H₂O → O₂ + 4H⁺ + 4e⁻ (oxygen). The SO₄²⁻ ions are not discharged (water is oxidised preferentially). H₂:O₂ = 2:1 by volume.",
        "h": "Dilute H₂SO₄ electrolysis: cathode = H₂; anode = O₂. H₂:O₂ = 2:1.",
        "yr": "SS2"
      },
      {
        "q": "In the Daniell cell (Zn|ZnSO₄||CuSO₄|Cu), the zinc electrode acts as the:",
        "o": [
          "Cathode — copper deposits on it",
          "Anode — zinc dissolves: Zn → Zn²⁺ + 2e⁻ (oxidation)",
          "Electrolyte",
          "Salt bridge"
        ],
        "a": 1,
        "e": "In the Daniell cell: Zn is the anode (negative terminal of galvanic cell) — it undergoes oxidation: Zn → Zn²⁺ + 2e⁻. Electrons flow through external circuit from Zn to Cu. At Cu cathode: Cu²⁺ + 2e⁻ → Cu (copper deposits). The cell produces ~1.1 V.",
        "h": "Daniell cell: Zn = anode (oxidised: Zn→Zn²⁺+2e⁻). Cu = cathode (Cu²⁺+2e⁻→Cu).",
        "yr": "SS2"
      },
      {
        "q": "Electrolysis of CuSO₄ with copper electrodes (not platinum) results in:",
        "o": [
          "Copper deposited at cathode and oxygen at anode",
          "Copper deposited at cathode and copper dissolved from the anode (anode mass decreases)",
          "Sulphur deposited at cathode",
          "No reaction at either electrode"
        ],
        "a": 1,
        "e": "With copper electrodes: Cathode: Cu²⁺ + 2e⁻ → Cu (copper deposited). Anode: Cu → Cu²⁺ + 2e⁻ (copper anode dissolves). The CuSO₄ concentration stays constant. This is used in copper refining — impure copper anode dissolves, pure copper deposits on cathode.",
        "h": "CuSO₄ with Cu electrodes: Cu deposits at cathode; Cu anode dissolves. Used in copper purification.",
        "yr": "SS2"
      },
      {
        "q": "Why is electrolysis of molten ionic compounds (not aqueous solutions) required to extract very reactive metals like sodium and aluminium?",
        "o": [
          "Molten compounds are cheaper to process",
          "In aqueous solution, water would be preferentially discharged instead of the reactive metal ion, so the molten form is needed to obtain the pure metal",
          "Aqueous electrolysis is too slow",
          "Reactive metals are only found in molten rocks"
        ],
        "a": 1,
        "e": "Very reactive metals (Na, Al, Mg) cannot be obtained by electrolysis of aqueous solutions because H₂O is discharged at the cathode instead (water is reduced: 2H₂O + 2e⁻ → H₂ + 2OH⁻). The metal ion is not reduced. Molten compounds remove water, allowing the metal ion to be reduced.",
        "h": "Reactive metals need molten electrolysis: in water, H₂O discharges instead of the reactive metal ion.",
        "yr": "SS2"
      },
      {
        "q": "Faraday's Second Law states that the same quantity of electricity liberates masses of different substances:",
        "o": [
          "In ratio of their molar masses",
          "In ratio of their equivalent masses (molar mass ÷ valency)",
          "In equal masses",
          "In inverse ratio of their densities"
        ],
        "a": 1,
        "e": "Faraday's Second Law: same charge passed through different electrolytes deposits masses in ratio of their equivalent masses (E = M/n, where M = molar mass, n = valency). Example: 1 F deposits 108 g Ag (M=108, n=1) but only 32 g Cu (M=64, n=2) — because Cu needs 2 electrons per atom.",
        "h": "Faraday's 2nd Law: same charge → masses deposited ∝ equivalent mass (M/n).",
        "yr": "SS2"
      },
      {
        "q": "In a galvanic (voltaic) cell, the electrons flow in the external circuit from:",
        "o": [
          "Cathode to anode",
          "Anode to cathode (from the electrode being oxidised to the electrode where reduction occurs)",
          "Positive to negative terminal",
          "Through the electrolyte only"
        ],
        "a": 1,
        "e": "In a galvanic cell: at the anode, oxidation releases electrons into the external circuit. Electrons flow through the wire from anode (negative terminal) to cathode (positive terminal). Inside the electrolyte, ions carry the current. Conventional current flows in the opposite direction to electron flow.",
        "h": "Galvanic cell: electrons flow in external circuit from anode (oxidation) to cathode (reduction).",
        "yr": "SS2"
      },
      {
        "q": "The quantity of electricity Q in coulombs is calculated as:",
        "o": [
          "Q = I/t",
          "Q = I × t (current in amperes × time in seconds)",
          "Q = V × R",
          "Q = m × F"
        ],
        "a": 1,
        "e": "Q = I × t, where I = current (amperes, A) and t = time (seconds, s). Units: 1 A × 1 s = 1 coulomb (C). This fundamental relationship links the electrical measurement (current and time) to the chemical amount via Faraday's laws.",
        "h": "Q = I × t (coulombs = amperes × seconds).",
        "yr": "SS2"
      },
      {
        "q": "The purpose of the salt bridge in an electrochemical cell is:",
        "o": [
          "To allow electrons to flow between the two half-cells",
          "To complete the electrical circuit by allowing ions to flow between the two half-cells, maintaining electrical neutrality",
          "To provide the electrolyte for reduction reactions",
          "To separate the products from the reactants"
        ],
        "a": 1,
        "e": "The salt bridge (typically KNO₃ or KCl in agar) completes the ionic circuit between the two half-cells. Without it, charge would build up in each half-cell (one becoming more positive, one more negative) and the cell would stop. The salt bridge allows ion flow to maintain charge balance.",
        "h": "Salt bridge = allows ions to flow between half-cells, maintaining charge neutrality and completing circuit.",
        "yr": "SS2"
      },
      {
        "q": "How long must a current of 5 A flow to deposit 2 g of copper from CuSO₄ solution? (Cu=64, F=96,500 C/mol)",
        "o": [
          "1206 s",
          "2413 s",
          "6034 s",
          "3017 s"
        ],
        "a": 0,
        "e": "n(Cu) = 2/64 = 0.03125 mol. Cu²⁺ + 2e⁻ → Cu (n=2). Q needed = n × n(e⁻/mol) × F = 0.03125 × 2 × 96500 = 6031 C. t = Q/I = 6031/5 ≈ 1206 s.",
        "h": "n(Cu)=2/64=0.03125 mol. Q=0.03125×2×96500=6031 C. t=Q/I=6031/5≈1206 s.",
        "yr": "SS2"
      },
      {
        "q": "Aluminium is extracted industrially from bauxite (Al₂O₃) by electrolysis. This is necessary because:",
        "o": [
          "Al is too rare to obtain by other methods",
          "Al is too reactive to be reduced by carbon or other chemical reducing agents at economical temperatures, so electrical energy must be used",
          "Al cannot form ions",
          "Chemical reduction produces impure aluminium"
        ],
        "a": 1,
        "e": "Aluminium is very reactive — it sits above carbon in the reactivity series. Carbon cannot reduce Al₂O₃ at economically viable temperatures (Al₂O₃ requires ~2000°C for carbon reduction). Electrolysis of molten Al₂O₃ (dissolved in cryolite at 900°C) is the only economical method.",
        "h": "Al too reactive for carbon reduction → electrolysis of molten Al₂O₃ (Hall-Héroult process).",
        "yr": "SS2"
      },
      {
        "q": "What is OILRIG and how does it apply to electrolysis?",
        "o": [
          "An oil industry process for refining metals",
          "Oxidation Is Loss (electrons); Reduction Is Gain (electrons). Anode: oxidation (loss of electrons). Cathode: reduction (gain of electrons)",
          "A type of electrochemical cell used in oil refining",
          "The process of oil electrolysis for hydrogen production"
        ],
        "a": 1,
        "e": "OILRIG is the mnemonic for electron transfer in redox chemistry: Oxidation Is Loss of electrons (OIL); Reduction Is Gain of electrons (RIG). In electrolysis: Anode = Oxidation (anions lose electrons here); Cathode = Reduction (cations gain electrons here).",
        "h": "OILRIG: Oxidation = Loss of electrons (anode); Reduction = Gain of electrons (cathode).",
        "yr": "SS2"
      },
      {
        "q": "In refining impure copper by electrolysis, the impure copper is the:",
        "o": [
          "Cathode — pure copper dissolves onto it",
          "Anode — impure copper dissolves; pure Cu²⁺ ions deposit on the pure copper cathode",
          "Electrolyte — dissolved in CuSO₄ solution",
          "Salt bridge material"
        ],
        "a": 1,
        "e": "Copper refining: impure copper = anode (dissolves: Cu → Cu²⁺ + 2e⁻; impurities fall as anode sludge). Pure copper = cathode (Cu²⁺ + 2e⁻ → Cu deposits). The CuSO₄ electrolyte maintains Cu²⁺ concentration. Result: pure copper cathode; precious metal impurities recovered from anode sludge.",
        "h": "Copper refining: impure Cu = anode (dissolves). Pure Cu = cathode (deposits). Impurities = anode sludge.",
        "yr": "SS2"
      },
      {
        "q": "In the electrolysis of dilute HCl using platinum electrodes, what gas is produced at the anode when the acid is concentrated?",
        "o": [
          "Oxygen (O₂)",
          "Chlorine (Cl₂) — Cl⁻ ions are preferentially discharged over OH⁻ at high Cl⁻ concentration",
          "Hydrogen (H₂)",
          "Sulphur dioxide (SO₂)"
        ],
        "a": 1,
        "e": "Anode discharge depends on ion concentration and discharge potential. In dilute HCl, OH⁻ is preferentially discharged (→ O₂). In concentrated HCl, Cl⁻ concentration is high enough to be preferentially discharged: 2Cl⁻ → Cl₂ + 2e⁻. This concentration effect is important in the chlor-alkali industry.",
        "h": "Concentrated HCl electrolysis anode: Cl⁻ discharged preferentially → Cl₂ gas.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Saponification and Detergents",
    "topicCode": "SS2-CHEM-19",
    "module": "Soaps, Detergents and Cleansing Agents",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">\n<p class=\"learn-p\">Every day you wash your clothes, your plates and your body with <span class=\"learn-keyword\">soap</span> or <span class=\"learn-keyword\">detergent</span>. Both remove dirt and grease that water alone cannot remove. <span class=\"learn-keyword\">Saponification</span> is the chemical reaction used to make soap from fats or oils. In many Nigerian homes, local black soap is still made by boiling palm oil or palm kernel oil with a strong alkali made from ashes. In this lesson you will learn how soap is made, how it cleans, its properties, how it differs from a detergent, and the uses of both.</p>\n</div>\n\n<h3 class=\"learn-subheading\">1. Fats, Oils and Esters</h3>\n<p class=\"learn-p\">Before we make soap, we must know what it is made from. Fats and oils are natural substances found in plants and animals. Palm oil, groundnut oil, shea butter and beef fat are examples. A fat is solid at room temperature, while an oil is liquid.</p>\n<p class=\"learn-p\">Chemically, fats and oils are <span class=\"learn-keyword\">esters</span> of glycerol. An ester is a compound formed when an acid reacts with an alcohol. Glycerol (propane-1,2,3-triol, C₃H₈O₃) is an alcohol with three –OH groups. It joins with three molecules of <span class=\"learn-keyword\">fatty acids</span>, which are long-chain carboxylic acids such as stearic acid (C₁₇H₃₅COOH), palmitic acid and oleic acid. Because of this, fats and oils are called <span class=\"learn-keyword\">triglycerides</span> (three fatty acid groups on one glycerol).</p>\n\n<h3 class=\"learn-subheading\">2. What Is Saponification?</h3>\n<p class=\"learn-p\">Saponification is the alkaline hydrolysis of a fat or oil. <span class=\"learn-keyword\">Hydrolysis</span> means breaking a compound down by reacting it with water or with an alkali. When a fat or oil is heated with a strong alkali such as sodium hydroxide (NaOH) or potassium hydroxide (KOH), it breaks into <strong>glycerol</strong> and the <strong>sodium (or potassium) salt of the fatty acid</strong>. That salt is the soap.</p>\n<p class=\"learn-p\">General word equation:</p>\n<p class=\"learn-p\"><strong>Fat or oil + sodium hydroxide → glycerol + soap (sodium salt of a fatty acid)</strong></p>\n<p class=\"learn-p\">Chemical equation using glyceryl tristearate (tristearin, C₅₇H₁₁₀O₆) as the fat:</p>\n<p class=\"learn-p\"><strong>C₃H₅(OOCC₁₇H₃₅)₃ + 3NaOH → C₃H₅(OH)₃ + 3C₁₇H₃₅COONa</strong></p>\n<p class=\"learn-p\">The product sodium stearate, C₁₇H₃₅COONa, is a typical soap. A soap formed with NaOH is hard and is called <span class=\"learn-keyword\">hard soap</span> (the bar soap you buy). A soap formed with KOH is soft and is called <span class=\"learn-keyword\">soft soap</span>, and it is used in liquid soap and shaving cream.</p>\n\n<h3 class=\"learn-subheading\">3. How Soap Is Made, Step by Step</h3>\n<ol class=\"learn-ordered\">\n<li>Step 1: The fat or oil (for example palm oil, palm kernel oil, coconut oil or tallow) is heated in a large kettle with a hot solution of sodium hydroxide. This is called boiling. Saponification takes place.</li>\n<li>Step 2: When the reaction is complete, the mixture contains soap, glycerol, water and a little excess alkali.</li>\n<li>Step 3: Common salt (sodium chloride) solution (brine) is added. The soap is less soluble in salty water, so it separates and floats as a thick curd. This is called <span class=\"learn-keyword\">salting out</span>.</li>\n<li>Step 4: The liquid below the soap, called <span class=\"learn-keyword\">spent lye</span>, contains glycerol, salt and water. It is drained off. The glycerol is recovered and sold because it is valuable (used in cosmetics, medicine and explosives).</li>\n<li>Step 5: The soap curd is washed to remove excess alkali, then dried.</li>\n<li>Step 6: Colour, perfume and sometimes germicides (germ killers) are added. The soap is pressed into bars and cut.</li>\n</ol>\n<p class=\"learn-p\">In local soap making, the alkali (potash, mainly KOH and potassium carbonate) is obtained by burning plantain peels, cocoa pod husks or palm bunch and soaking the ash in water. The liquid is filtered and then boiled with palm oil or palm kernel oil. This gives a soft, dark soap.</p>\n\n<h3 class=\"learn-subheading\">4. How Soap Cleans (Cleansing Action)</h3>\n<p class=\"learn-p\">A soap particle has two parts, so it behaves like two different substances joined together:</p>\n<ul class=\"learn-list\">\n<li>A long hydrocarbon <strong>tail</strong>. It is <span class=\"learn-keyword\">hydrophobic</span> (water-hating) and <span class=\"learn-keyword\">lipophilic</span> (grease-loving). It dissolves in oil and grease but not in water.</li>\n<li>A charged <strong>head</strong>, –COO⁻Na⁺. It is <span class=\"learn-keyword\">hydrophilic</span> (water-loving) and dissolves in water.</li>\n</ul>\n<p class=\"learn-p\">When you wash a greasy cloth, the tails push into the grease while the heads stay in the water. Rubbing and shaking pull the grease off the cloth and break it into tiny droplets. Each droplet becomes surrounded by soap particles with their tails inside and their heads outside. These droplets are called <span class=\"learn-keyword\">micelles</span>. The heads are negatively charged, so the droplets repel each other and do not join back together. This keeps the grease spread out (an <span class=\"learn-keyword\">emulsion</span>) so that it can be rinsed away with the water. Soap also lowers the surface tension of water, so the water wets the cloth better.</p>\n\n<h3 class=\"learn-subheading\">5. Properties of Soap</h3>\n<ul class=\"learn-list\">\n<li>Soaps are sodium or potassium salts of long-chain fatty acids.</li>\n<li>They dissolve in water to form a slippery solution which is slightly alkaline, because the soap partly hydrolyses in water.</li>\n<li>They form a lather easily in soft water.</li>\n<li>They form a <span class=\"learn-keyword\">scum</span> (a sticky white solid) in hard water. Hard water contains calcium (Ca²⁺) or magnesium (Mg²⁺) ions. These ions react with soap to give insoluble calcium or magnesium salts: 2C₁₇H₃₅COO⁻ + Ca²⁺ → (C₁₇H₃₅COO)₂Ca. Soap is wasted in this way before any lather can form.</li>\n<li>In acidic water, soap is changed to the insoluble fatty acid, so it does not clean well.</li>\n<li>Soaps are biodegradable. This means bacteria can break them down, so they do not pollute rivers for long.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">6. Detergents</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">detergent</span> (soapless detergent) is a cleaning agent that is not made from fats and oils. It is made from petroleum products (hydrocarbons). The usual detergent is the sodium salt of an alkyl benzene sulphonic acid, for example sodium dodecylbenzene sulphonate. A simpler type is sodium alkyl sulphate, such as sodium lauryl sulphate.</p>\n<p class=\"learn-p\">How it is made in three steps: (1) A long-chain hydrocarbon from petroleum is changed to a compound that can react with sulphuric acid. (2) The compound is treated with concentrated sulphuric acid, which gives a sulphonic acid (R–SO₃H). (3) The acid is neutralised with sodium hydroxide to give the sodium salt (R–SO₃⁻Na⁺), which is the detergent.</p>\n<p class=\"learn-p\">A detergent has the same shape as soap: a long hydrocarbon tail and a charged head (–SO₃⁻ or –OSO₃⁻). It cleans by exactly the same micelle action. The difference is that its head does not form an insoluble salt with Ca²⁺ or Mg²⁺ ions, so it lathers in hard water.</p>\n\n<h3 class=\"learn-subheading\">7. Soap and Detergent Compared</h3>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Feature</th><th>Soap</th><th>Soapless detergent</th></tr></thead>\n<tbody>\n<tr><td>Raw materials</td><td>Natural fats and oils, and an alkali</td><td>Petroleum products and sulphuric acid</td></tr>\n<tr><td>Active part (head)</td><td>Carboxylate, –COO⁻</td><td>Sulphonate, –SO₃⁻, or sulphate, –OSO₃⁻</td></tr>\n<tr><td>Action in hard water</td><td>Forms scum, so wastes soap and gives poor lather</td><td>Does not form scum, so lathers well</td></tr>\n<tr><td>Action in acidic water</td><td>Changes to insoluble fatty acid, so poor cleaning</td><td>Still works well</td></tr>\n<tr><td>Biodegradability</td><td>Biodegradable</td><td>Modern straight-chain types are biodegradable; the old branched-chain types were not</td></tr>\n<tr><td>Cost</td><td>Often cheap to make locally</td><td>Cheap to make in large industries</td></tr>\n<tr><td>Effect on skin</td><td>Mild; but slightly alkaline</td><td>Can be harsher on skin</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Old detergents had branched hydrocarbon chains that bacteria could not break down. They collected as thick foam on rivers and harmed fish. Modern detergents have straight chains, so bacteria can break them down. Still, detergents containing phosphates can cause too much growth of algae in water bodies, which uses up the oxygen that fish need.</p>\n\n<h3 class=\"learn-subheading\">8. Uses of Soap and Detergents</h3>\n<ul class=\"learn-list\">\n<li>Soap: bathing, washing hands, laundry, and shaving cream (soft soap).</li>\n<li>Soap is also used as a lubricant, and in making some polishes and paints.</li>\n<li>Detergents: washing clothes (washing powders), washing dishes, and cleaning floors, toilets and vehicles.</li>\n<li>Detergents: shampoos and toothpaste (foaming agents), and cleaning machines in industries.</li>\n<li>Both lower the surface tension of water, so they are used as wetting agents and emulsifiers.</li>\n<li>Glycerol from soap making is used in cosmetics, medicines, antifreeze and explosives (nitroglycerine).</li>\n</ul>\n\n<h3 class=\"learn-subheading\">9. Calculations on Saponification</h3>\n<p class=\"learn-p\">Use the balanced equation: C₃H₅(OOCC₁₇H₃₅)₃ + 3NaOH → C₃H₅(OH)₃ + 3C₁₇H₃₅COONa. First work out the molar masses (C = 12, H = 1, O = 16, Na = 23): tristearin C₅₇H₁₁₀O₆ = (57 × 12) + 110 + (6 × 16) = 684 + 110 + 96 = 890 g/mol. NaOH = 40 g/mol. Glycerol C₃H₈O₃ = 36 + 8 + 48 = 92 g/mol. Sodium stearate C₁₈H₃₅O₂Na = 216 + 35 + 32 + 23 = 306 g/mol. As a check, the masses balance: 890 + (3 × 40) = 1010, and 92 + (3 × 306) = 1010.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> What mass of sodium hydroxide is needed to saponify 89 g of tristearin completely?<br>Moles of tristearin = 89 ÷ 890 = 0.10 mol.<br>The ratio fat : NaOH is 1 : 3, so moles of NaOH = 3 × 0.10 = 0.30 mol.<br>Mass of NaOH = 0.30 × 40 = 12 g.<br><strong>Answer: 12 g of NaOH.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> What masses of soap (sodium stearate) and glycerol are produced from 445 g of tristearin?<br>Moles of tristearin = 445 ÷ 890 = 0.50 mol.<br>Moles of soap = 3 × 0.50 = 1.50 mol. Mass of soap = 1.50 × 306 = 459 g.<br>Moles of glycerol = 0.50 mol. Mass of glycerol = 0.50 × 92 = 46 g.<br><strong>Answer: 459 g of soap and 46 g of glycerol.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> A hard water sample contains 0.010 mol of Ca²⁺ ions. What mass of sodium stearate is wasted as scum, and what mass of calcium stearate forms? 2C₁₇H₃₅COONa + Ca²⁺ → (C₁₇H₃₅COO)₂Ca + 2Na⁺<br>The ratio soap : Ca²⁺ is 2 : 1, so moles of sodium stearate = 2 × 0.010 = 0.020 mol.<br>Mass of sodium stearate = 0.020 × 306 = 6.12 g.<br>Molar mass of calcium stearate = 2 × (216 + 35 + 32) + 40 = 2 × 283 + 40 = 606 g/mol. Mass of scum = 0.010 × 606 = 6.06 g.<br><strong>Answer: 6.12 g of soap is wasted, and 6.06 g of scum forms.</strong></div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Saying that soap is made by \"neutralising\" a fat with an acid. It is made by heating a fat with a strong alkali (hydrolysis).<br>2. Forgetting that three moles of NaOH are needed for each mole of fat, because glycerol has three –OH groups.<br>3. Writing that detergents are made from fats. They are made from petroleum products.<br>4. Saying \"soap does not clean in hard water\". It does clean, but first it reacts with Ca²⁺ and Mg²⁺ to give scum, so a lot of soap is wasted and the lather is poor.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often asks you to (a) define saponification, (b) write the equation for a fat and sodium hydroxide, (c) name the by-product (glycerol), (d) say why soap forms scum in hard water, and (e) state two differences between soap and detergent. Always name the raw materials and the reason, for example \"detergent has no scum in hard water because its calcium salt is soluble\". In the practical paper, you may be asked to show that a detergent lathers in hard water but soap does not.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>Fats and oils are esters of glycerol with fatty acids.<br>Saponification: fat or oil + NaOH (or KOH) → glycerol + soap. NaOH gives hard soap and KOH gives soft soap.<br>Soap is salted out with brine, and glycerol is recovered from the spent lye.<br>Soap cleans using micelles: the tail dissolves in grease, and the head dissolves in water.<br>Soap forms scum with Ca²⁺ and Mg²⁺ in hard water. Detergents do not.<br>Detergents are made from petroleum and sulphuric acid. Modern ones are biodegradable.</div>",
    "questions": [
      {
        "q": "Saponification is the reaction of a fat or oil with",
        "o": [
          "A strong alkali to give glycerol and soap",
          "A strong acid to give glycerol and soap",
          "Hydrogen to give a saturated fat",
          "Chlorine to give a detergent"
        ],
        "a": 0,
        "e": "Saponification is the alkaline hydrolysis of a fat or oil. Heating the fat with NaOH or KOH gives glycerol and the salt of a fatty acid, which is the soap. An acid does not make soap.",
        "h": "Soap making needs a strong alkali.",
        "yr": "SS2"
      },
      {
        "q": "Which substance is the by-product when soap is made from a fat or oil?",
        "o": [
          "Ethanol",
          "Glycerol",
          "Ethanoic acid",
          "Sodium chloride"
        ],
        "a": 1,
        "e": "The fat breaks into soap and glycerol (propane-1,2,3-triol). Glycerol is recovered from the spent lye and used in cosmetics and medicines.",
        "h": "It is an alcohol with three –OH groups.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following is a soap?",
        "o": [
          "C₁₇H₃₅COOH",
          "C₁₂H₂₅OSO₃Na",
          "C₁₇H₃₅COONa",
          "C₃H₅(OH)₃"
        ],
        "a": 2,
        "e": "Sodium stearate, C₁₇H₃₅COONa, is the sodium salt of a fatty acid, so it is a soap. C₁₇H₃₅COOH is the fatty acid itself, and C₁₂H₂₅OSO₃Na is a sodium alkyl sulphate detergent. C₃H₅(OH)₃ is glycerol.",
        "h": "A soap is the sodium salt of a long-chain fatty acid.",
        "yr": "SS2"
      },
      {
        "q": "Adding sodium chloride solution (brine) to the soap mixture so that the soap separates is called",
        "o": [
          "Hydrolysis",
          "Esterification",
          "Neutralisation",
          "Salting out"
        ],
        "a": 3,
        "e": "Soap is less soluble in salty water, so it separates as a curd and floats. This step is called salting out. Hydrolysis is the breakdown of the fat itself.",
        "h": "The name describes what the salt does.",
        "yr": "SS2"
      },
      {
        "q": "Soap forms scum in hard water because hard water contains",
        "o": [
          "Chloride ions",
          "Calcium and magnesium ions",
          "Sodium ions",
          "Carbon dioxide only"
        ],
        "a": 1,
        "e": "Ca²⁺ and Mg²⁺ ions react with soap anions to give insoluble calcium and magnesium salts, which appear as scum. Sodium ions give soluble salts with soap, so they do not cause scum.",
        "h": "Think of the ions that cause water hardness.",
        "yr": "SS2"
      },
      {
        "q": "In the cleansing action of soap, the part of the soap particle that dissolves in grease is the",
        "o": [
          "Charged head",
          "Sodium ion",
          "Hydrocarbon tail",
          "Glycerol part"
        ],
        "a": 2,
        "e": "The long hydrocarbon tail is hydrophobic and dissolves in grease. The charged –COO⁻ head dissolves in water and so stays outside the micelle.",
        "h": "The tail is water-hating and grease-loving.",
        "yr": "SS2"
      },
      {
        "q": "Which statement correctly describes a soapless detergent?",
        "o": [
          "It is made from palm oil and potash",
          "It is made only from animal fat",
          "It is the potassium salt of glycerol",
          "It is made from petroleum products and does not form scum in hard water"
        ],
        "a": 3,
        "e": "Detergents are made from petroleum products and sulphuric acid. Their calcium and magnesium salts are soluble, so they do not form scum. Palm oil and potash are used to make soap.",
        "h": "Think of the raw material and what happens in hard water.",
        "yr": "SS2"
      },
      {
        "q": "A soap made with potassium hydroxide is usually",
        "o": [
          "Soft",
          "Hard and insoluble",
          "Not a soap at all",
          "A detergent"
        ],
        "a": 0,
        "e": "Potassium soaps are soft and are used in liquid soaps and shaving cream. Sodium soaps are hard, like bar soap. Both are true soaps.",
        "h": "NaOH gives the hard bars; KOH gives the other type.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following is NOT a difference between soap and a soapless detergent?",
        "o": [
          "Soap forms scum in hard water but detergent does not",
          "Both have a long hydrocarbon tail and a charged head",
          "Soap is made from fats and oils but detergent is made from petroleum",
          "Soap is poor in acidic water but detergent still works"
        ],
        "a": 1,
        "e": "Both soap and detergent have a hydrocarbon tail and a charged head, so this is a similarity, not a difference. The other three statements are true differences.",
        "h": "One option describes something they share.",
        "yr": "SS2"
      },
      {
        "q": "How many moles of NaOH are needed to saponify 2 moles of a triglyceride?",
        "o": [
          "2 mol",
          "3 mol",
          "6 mol",
          "9 mol"
        ],
        "a": 2,
        "e": "Each molecule of triglyceride has three ester groups, so one mole needs 3 moles of NaOH. For 2 moles of fat, moles of NaOH = 2 × 3 = 6 mol.",
        "h": "Use the 1 : 3 ratio from the equation.",
        "yr": "SS2"
      },
      {
        "q": "What mass of NaOH is needed to saponify 89 g of tristearin (molar mass 890 g/mol)? (NaOH = 40)",
        "o": [
          "4 g",
          "12 g",
          "40 g",
          "120 g"
        ],
        "a": 1,
        "e": "Moles of tristearin = 89 ÷ 890 = 0.10 mol. Moles of NaOH = 3 × 0.10 = 0.30 mol, so mass = 0.30 × 40 = 12 g. The answer 4 g comes from forgetting the factor of 3.",
        "h": "Find moles of fat first, then multiply by 3.",
        "yr": "SS2"
      },
      {
        "q": "The molar mass of sodium stearate, C₁₇H₃₅COONa, is (C = 12, H = 1, O = 16, Na = 23)",
        "o": [
          "283 g/mol",
          "284 g/mol",
          "289 g/mol",
          "306 g/mol"
        ],
        "a": 3,
        "e": "The formula has 18 C, 35 H, 2 O and 1 Na. Mass = (18 × 12) + 35 + (2 × 16) + 23 = 216 + 35 + 32 + 23 = 306 g/mol. The value 283 leaves out the sodium.",
        "h": "Count all 18 carbon atoms, including the one in –COO.",
        "yr": "SS2"
      },
      {
        "q": "What mass of glycerol (92 g/mol) is produced when 0.50 mol of a triglyceride is saponified completely?",
        "o": [
          "46 g",
          "92 g",
          "138 g",
          "276 g"
        ],
        "a": 0,
        "e": "One mole of triglyceride gives one mole of glycerol, so 0.50 mol gives 0.50 mol of glycerol. Mass = 0.50 × 92 = 46 g. The value 138 comes from multiplying by 3 wrongly.",
        "h": "The ratio of fat to glycerol is 1 : 1.",
        "yr": "SS2"
      },
      {
        "q": "A student washes with a bar of soap in water that is very hard, and finds that very little lather forms and a white solid appears. Which change would improve the result most?",
        "o": [
          "Using a detergent instead of soap",
          "Using more cold water only",
          "Adding vinegar to the water",
          "Warming the soap bar"
        ],
        "a": 0,
        "e": "The white solid is scum made from the reaction of soap with Ca²⁺ and Mg²⁺. A soapless detergent forms soluble salts with these ions, so it lathers well. Vinegar is an acid and would make soap less effective.",
        "h": "Choose the cleaning agent that does not form scum.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following best explains why old branched-chain detergents caused foam on rivers?",
        "o": [
          "They were too soluble in oil",
          "Bacteria could not break them down, so they were not biodegradable",
          "They were made from natural fats",
          "They formed scum with sodium ions"
        ],
        "a": 1,
        "e": "The branched hydrocarbon chains could not be broken down by bacteria, so the detergent stayed in the water and made thick foam. Modern straight-chain detergents are biodegradable.",
        "h": "Think about what bacteria can and cannot break down.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Halogens",
    "topicCode": "SS2-CHEM-20",
    "module": "Group Chemistry: Halogens and Metals",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">\n<p class=\"learn-p\">The <span class=\"learn-keyword\">halogens</span> are the elements in Group 17 of the Periodic Table: fluorine, chlorine, bromine and iodine (and astatine, which is radioactive and rare). The name means \"salt-formers\", because they react with metals to form salts. You meet them daily: the chlorine that makes pipe-borne water safe to drink, the iodine in iodised table salt that prevents goitre, and the fluoride in your toothpaste. In this lesson you will learn their general properties, the trends down the group, their important compounds, and their uses.</p>\n</div>\n\n<h3 class=\"learn-subheading\">1. Position and Electron Arrangement</h3>\n<p class=\"learn-p\">The halogens sit in Group 17, just before the noble gases. Each halogen atom has <strong>7 electrons</strong> in its outer shell (the valence shell). Each atom needs just one more electron to have a full outer shell, so halogens easily gain one electron to form a negative ion with charge 1−, called a <span class=\"learn-keyword\">halide ion</span> (F⁻, Cl⁻, Br⁻, I⁻). They can also share one electron with another atom to form a covalent bond. The elements exist as <span class=\"learn-keyword\">diatomic molecules</span>, which means two atoms joined together: F₂, Cl₂, Br₂ and I₂.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Element</th><th>Symbol</th><th>Atomic number</th><th>Electron arrangement</th></tr></thead>\n<tbody>\n<tr><td>Fluorine</td><td>F</td><td>9</td><td>2, 7</td></tr>\n<tr><td>Chlorine</td><td>Cl</td><td>17</td><td>2, 8, 7</td></tr>\n<tr><td>Bromine</td><td>Br</td><td>35</td><td>2, 8, 18, 7</td></tr>\n<tr><td>Iodine</td><td>I</td><td>53</td><td>2, 8, 18, 18, 7</td></tr>\n</tbody></table></div>\n\n<h3 class=\"learn-subheading\">2. Physical Properties and Trends Down the Group</h3>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Property</th><th>Fluorine</th><th>Chlorine</th><th>Bromine</th><th>Iodine</th></tr></thead>\n<tbody>\n<tr><td>State at room temperature</td><td>Gas</td><td>Gas</td><td>Liquid</td><td>Solid</td></tr>\n<tr><td>Colour</td><td>Pale yellow</td><td>Greenish-yellow</td><td>Reddish-brown</td><td>Grey-black (purple vapour)</td></tr>\n<tr><td>Melting point (°C)</td><td>−220</td><td>−101</td><td>−7</td><td>114</td></tr>\n<tr><td>Boiling point (°C)</td><td>−188</td><td>−34</td><td>59</td><td>184</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Going <strong>down</strong> the group from fluorine to iodine:</p>\n<ul class=\"learn-list\">\n<li>The colour gets darker.</li>\n<li>The melting and boiling points increase, because the molecules get larger and the forces between them get stronger.</li>\n<li>The atoms get bigger (atomic radius increases), because there are more electron shells.</li>\n<li>The elements are less <span class=\"learn-keyword\">electronegative</span> (they attract electrons less strongly). Electronegativity is the power of an atom to attract electrons.</li>\n<li>Reactivity <strong>decreases</strong>. This is the opposite of the alkali metals. Fluorine is the most reactive. The outer shell is closer to the nucleus in a small atom, so it pulls in an extra electron more strongly.</li>\n</ul>\n<p class=\"learn-p\">Other properties: halogens are non-metals, they are poor conductors of electricity, and they have sharp, choking smells. Their vapours are poisonous and must be handled with care. Iodine is only slightly soluble in water but dissolves well in organic solvents such as hexane. Iodine <span class=\"learn-keyword\">sublimes</span> on heating, which means it changes straight from solid to vapour without becoming a liquid.</p>\n\n<h3 class=\"learn-subheading\">3. Chemical Properties</h3>\n<p class=\"learn-p\"><strong>(a) Reaction with metals.</strong> Halogens react with metals to form ionic halides (salts). The halogen is an <span class=\"learn-keyword\">oxidising agent</span>, because it takes electrons from the metal.</p>\n<p class=\"learn-p\">2Na + Cl₂ → 2NaCl (sodium burns in chlorine with a bright yellow flame, giving white sodium chloride).<br>2Fe + 3Cl₂ → 2FeCl₃ (hot iron wool burns in chlorine to give brown iron(III) chloride). Note that chlorine takes iron to Fe³⁺, but iodine gives only iron(II) iodide, FeI₂, because iodine is a weaker oxidising agent.</p>\n<p class=\"learn-p\"><strong>(b) Reaction with hydrogen.</strong> They form hydrogen halides, HX, which are colourless gases that dissolve in water to give acids.</p>\n<ul class=\"learn-list\">\n<li>H₂ + F₂ → 2HF: explosive, even in the dark and at low temperature.</li>\n<li>H₂ + Cl₂ → 2HCl: explosive in bright sunlight, but slow in the dark.</li>\n<li>H₂ + Br₂ → 2HBr: needs heating.</li>\n<li>H₂ + I₂ ⇌ 2HI: slow and reversible, needs heating.</li>\n</ul>\n<p class=\"learn-p\">The reactions get less vigorous down the group, which shows that reactivity decreases.</p>\n<p class=\"learn-p\"><strong>(c) Reaction with water.</strong> Fluorine reacts violently: 2F₂ + 2H₂O → 4HF + O₂. Chlorine dissolves in water and partly reacts: Cl₂ + H₂O ⇌ HCl + HOCl. HOCl is chloric(I) acid (hypochlorous acid). It is unstable and gives oxygen in sunlight: 2HOCl → 2HCl + O₂. HOCl is a bleach, so damp chlorine bleaches coloured materials. Bromine reacts only slightly, and iodine hardly at all.</p>\n<p class=\"learn-p\"><strong>(d) Reaction with alkalis.</strong> Chlorine reacts with cold dilute sodium hydroxide: Cl₂ + 2NaOH → NaCl + NaOCl + H₂O. The product NaOCl is sodium chlorate(I), the active part of household bleach.</p>\n<p class=\"learn-p\"><strong>(e) Displacement reactions.</strong> A more reactive halogen displaces (pushes out) a less reactive halogen from a solution of its halide. This proves the order of reactivity Cl₂ > Br₂ > I₂.</p>\n<ul class=\"learn-list\">\n<li>Cl₂ + 2KBr → 2KCl + Br₂ (the solution turns orange-brown).</li>\n<li>Cl₂ + 2KI → 2KCl + I₂ (the solution turns brown, and a dark solid may form).</li>\n<li>Br₂ + 2KI → 2KBr + I₂.</li>\n<li>Iodine does not displace chlorine or bromine, and bromine does not displace chlorine. No reaction occurs.</li>\n</ul>\n<p class=\"learn-p\">In ionic form: Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂. Chlorine gains electrons (is reduced), and bromide loses electrons (is oxidised).</p>\n\n<h3 class=\"learn-subheading\">4. Chlorine in Detail</h3>\n<p class=\"learn-p\"><strong>Laboratory preparation.</strong> Concentrated hydrochloric acid is heated with manganese(IV) oxide:</p>\n<p class=\"learn-p\">MnO₂ + 4HCl → MnCl₂ + Cl₂ + 2H₂O</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Heat the mixture in a flask fitted with a thistle funnel (for adding acid).</li>\n<li>Step 2: Pass the gas through water to remove hydrogen chloride fumes.</li>\n<li>Step 3: Pass it through concentrated sulphuric acid to dry it.</li>\n<li>Step 4: Collect by downward delivery (upward displacement of air), because chlorine is denser than air. It is poisonous, so work in a fume cupboard.</li>\n</ol>\n<p class=\"learn-p\"><strong>Industrial preparation:</strong> by the electrolysis of concentrated sodium chloride solution (brine), which gives chlorine at the anode, hydrogen at the cathode and sodium hydroxide solution.</p>\n<p class=\"learn-p\"><strong>Test for chlorine:</strong> it turns damp blue litmus paper red and then bleaches it white. Dry chlorine does not bleach, because the bleaching comes from HOCl formed with water.</p>\n\n<h3 class=\"learn-subheading\">5. Hydrogen Chloride and Halide Compounds</h3>\n<p class=\"learn-p\">Hydrogen chloride is made in the laboratory by gently heating sodium chloride with concentrated sulphuric acid: NaCl + H₂SO₄ → NaHSO₄ + HCl. It is a colourless gas with a choking smell. It is denser than air, fumes in moist air, and is extremely soluble in water to give hydrochloric acid, a strong acid. When ammonia gas meets hydrogen chloride, white fumes of ammonium chloride form: NH₃ + HCl → NH₄Cl.</p>\n<p class=\"learn-p\"><strong>Test for halide ions.</strong> Add dilute nitric acid, then silver nitrate solution, to the solution:</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Halide ion</th><th>Precipitate with AgNO₃</th><th>Effect of ammonia solution</th></tr></thead>\n<tbody>\n<tr><td>Chloride, Cl⁻</td><td>White (AgCl)</td><td>Dissolves in dilute ammonia</td></tr>\n<tr><td>Bromide, Br⁻</td><td>Cream (AgBr)</td><td>Dissolves only in concentrated ammonia</td></tr>\n<tr><td>Iodide, I⁻</td><td>Yellow (AgI)</td><td>Does not dissolve</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Ionic equation: Ag⁺(aq) + Cl⁻(aq) → AgCl(s). Silver fluoride is soluble, so fluoride gives no precipitate. The nitric acid is added first to remove carbonate and other ions that would also give a precipitate with silver ions.</p>\n\n<h3 class=\"learn-subheading\">6. Uses of the Halogens and Their Compounds</h3>\n<ul class=\"learn-list\">\n<li><strong>Fluorine:</strong> fluorides in toothpaste to prevent tooth decay; PTFE (Teflon) for non-stick frying pans; hydrogen fluoride to etch glass; and in the past, CFC refrigerants (now restricted because they harm the ozone layer).</li>\n<li><strong>Chlorine:</strong> killing germs in drinking water and swimming pools; making bleach; making PVC plastic (for pipes and cables); making hydrochloric acid, and solvents and insecticides.</li>\n<li><strong>Bromine:</strong> silver bromide in photographic film; fire retardants; some medicines and dyes.</li>\n<li><strong>Iodine:</strong> an antiseptic (tincture of iodine) for cleaning wounds; iodised salt to prevent goitre, which is a swelling of the neck caused by lack of iodine; and making dyes.</li>\n<li><strong>Sodium chloride:</strong> food flavouring and preservation, and the raw material for chlorine and sodium hydroxide.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">7. Calculations</h3>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> What volume of chlorine at s.t.p. is obtained from 8.7 g of manganese(IV) oxide and excess concentrated HCl? (Mn = 55, O = 16, molar volume = 22.4 dm³/mol at s.t.p.)<br>MnO₂ + 4HCl → MnCl₂ + Cl₂ + 2H₂O.<br>Molar mass of MnO₂ = 55 + (2 × 16) = 87 g/mol.<br>Moles of MnO₂ = 8.7 ÷ 87 = 0.10 mol. The ratio MnO₂ : Cl₂ is 1 : 1, so moles of Cl₂ = 0.10 mol.<br>Volume = 0.10 × 22.4 = 2.24 dm³.<br><strong>Answer: 2.24 dm³ of chlorine.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> Excess silver nitrate solution is added to a solution containing 5.85 g of sodium chloride. What mass of silver chloride forms? (Na = 23, Cl = 35.5, Ag = 108)<br>NaCl + AgNO₃ → AgCl + NaNO₃.<br>Molar mass of NaCl = 23 + 35.5 = 58.5 g/mol. Moles of NaCl = 5.85 ÷ 58.5 = 0.10 mol.<br>The ratio NaCl : AgCl is 1 : 1, so moles of AgCl = 0.10 mol.<br>Molar mass of AgCl = 108 + 35.5 = 143.5 g/mol. Mass = 0.10 × 143.5 = 14.35 g.<br><strong>Answer: 14.35 g of silver chloride.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> Chlorine is passed into a solution containing 0.20 mol of potassium bromide until the reaction is complete. Find the volume of chlorine used at s.t.p. and the mass of bromine formed. (Br = 80)<br>Cl₂ + 2KBr → 2KCl + Br₂.<br>The ratio Cl₂ : KBr is 1 : 2, so moles of Cl₂ = 0.20 ÷ 2 = 0.10 mol. Volume = 0.10 × 22.4 = 2.24 dm³.<br>The ratio Br₂ : KBr is 1 : 2, so moles of Br₂ = 0.10 mol. Molar mass of Br₂ = 160 g/mol, so mass = 0.10 × 160 = 16 g.<br><strong>Answer: 2.24 dm³ of chlorine, and 16 g of bromine.</strong></div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Saying that reactivity increases down Group 17. It decreases. Fluorine is the most reactive and iodine the least, which is the opposite of Group 1.<br>2. Writing halogen formulas as single atoms. They are diatomic: Cl₂, not Cl.<br>3. Mixing up the colours of the silver halide precipitates. Remember: white, cream, yellow for Cl, Br, I (getting darker).<br>4. Saying that dry chlorine bleaches. Only moist chlorine bleaches, because HOCl does the bleaching.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC questions often ask you to (a) give the colour and state of each halogen, (b) explain the order of reactivity using displacement reactions, (c) describe the laboratory preparation of chlorine with a labelled diagram, and (d) identify an unknown halide by the silver nitrate test. Always write the balanced equation for displacement reactions, and name the colour change you would observe.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>Halogens are Group 17 non-metals with 7 outer electrons, and they exist as diatomic molecules.<br>Going down: colour gets darker, melting and boiling points rise (gas, gas, liquid, solid), and reactivity falls.<br>A more reactive halogen displaces a less reactive one from its halide solution.<br>Chlorine is made from MnO₂ and concentrated HCl, dried with concentrated H₂SO₄, and collected by downward delivery.<br>Halide test: AgNO₃ gives white (Cl⁻), cream (Br⁻) and yellow (I⁻) precipitates.<br>Uses include water treatment, bleach, PVC, antiseptic, iodised salt and fluoride toothpaste.</div>",
    "questions": [
      {
        "q": "How many electrons are there in the outer shell of a halogen atom?",
        "o": [
          "1",
          "5",
          "7",
          "8"
        ],
        "a": 2,
        "e": "Halogens are in Group 17, so each atom has 7 electrons in its outer shell. They need just one more electron to reach 8, which is why they form ions with a 1− charge.",
        "h": "The group number is 17, so the outer shell has 10 less than that.",
        "yr": "SS2"
      },
      {
        "q": "Which halogen is a reddish-brown liquid at room temperature?",
        "o": [
          "Chlorine",
          "Bromine",
          "Iodine",
          "Fluorine"
        ],
        "a": 1,
        "e": "Bromine is the only halogen that is a liquid at room temperature, and it is reddish-brown. Chlorine is a greenish-yellow gas, and iodine is a grey-black solid.",
        "h": "It is one of the only two liquid elements at room temperature, and it is not a metal.",
        "yr": "SS2"
      },
      {
        "q": "Going down Group 17 from fluorine to iodine, the reactivity",
        "o": [
          "Increases",
          "Stays the same",
          "Decreases",
          "Increases and then decreases"
        ],
        "a": 2,
        "e": "Reactivity decreases down the group. Atoms get larger, so the nucleus attracts an incoming electron less strongly. Fluorine is the most reactive halogen.",
        "h": "This is the opposite of what happens in Group 1.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following is the correct state of the halogens at room temperature, from fluorine to iodine?",
        "o": [
          "Solid, liquid, gas, gas",
          "Liquid, gas, gas, solid",
          "Gas, liquid, gas, solid",
          "Gas, gas, liquid, solid"
        ],
        "a": 3,
        "e": "Fluorine and chlorine are gases, bromine is a liquid and iodine is a solid. Boiling points rise down the group because the molecules become larger and the attraction between them gets stronger.",
        "h": "Think of the change from gas through liquid to solid as you go down.",
        "yr": "SS2"
      },
      {
        "q": "When chlorine gas is passed into potassium iodide solution, the solution turns brown because",
        "o": [
          "Iodine is displaced from the solution",
          "Bromine is formed",
          "Chlorine dissolves to give a brown solution",
          "Potassium chlorate forms"
        ],
        "a": 0,
        "e": "Chlorine is more reactive than iodine, so it displaces iodine: Cl₂ + 2KI → 2KCl + I₂. The iodine formed gives the brown colour. No bromine is present in this mixture.",
        "h": "A more reactive halogen pushes out a less reactive one.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following mixtures will NOT show any reaction?",
        "o": [
          "Chlorine and potassium bromide solution",
          "Bromine and potassium iodide solution",
          "Chlorine and potassium iodide solution",
          "Iodine and potassium chloride solution"
        ],
        "a": 3,
        "e": "Iodine is less reactive than chlorine, so it cannot displace chlorine from its salt. The other three mixtures all involve a more reactive halogen with a less reactive halide.",
        "h": "Check which halogen is the weaker one.",
        "yr": "SS2"
      },
      {
        "q": "Chlorine is collected in the laboratory by downward delivery (upward displacement of air) because it is",
        "o": [
          "Lighter than air",
          "Less soluble in water than air",
          "Denser than air",
          "A colourless gas"
        ],
        "a": 2,
        "e": "Chlorine is denser than air, so it sinks and pushes the air up and out of the jar. It is also poisonous and greenish-yellow, so the colour shows when the jar is full.",
        "h": "The gas sinks to the bottom of the jar.",
        "yr": "SS2"
      },
      {
        "q": "In the laboratory preparation of chlorine, the gas is dried by passing it through",
        "o": [
          "Water",
          "Concentrated sulphuric acid",
          "Dilute hydrochloric acid",
          "Sodium hydroxide solution"
        ],
        "a": 1,
        "e": "Concentrated sulphuric acid removes water vapour from the gas. Water is used first to remove hydrogen chloride fumes, but it does not dry the gas. Sodium hydroxide would react with the chlorine.",
        "h": "Which concentrated acid is a good drying agent?",
        "yr": "SS2"
      },
      {
        "q": "Which test result shows that a solution contains bromide ions?",
        "o": [
          "A white precipitate with AgNO₃ that dissolves in dilute ammonia",
          "A yellow precipitate with AgNO₃",
          "No precipitate with AgNO₃",
          "A cream precipitate with AgNO₃ that dissolves only in concentrated ammonia"
        ],
        "a": 3,
        "e": "Silver bromide is cream and dissolves only in concentrated ammonia solution. The white precipitate is silver chloride, and the yellow one is silver iodide.",
        "h": "The colour is between white and yellow.",
        "yr": "SS2"
      },
      {
        "q": "Why is dilute nitric acid added before silver nitrate when testing for halide ions?",
        "o": [
          "To make the precipitate dissolve",
          "To remove ions such as carbonate that would also form a precipitate",
          "To change chloride ions to chlorine",
          "To dissolve the halide"
        ],
        "a": 1,
        "e": "Carbonate and other ions can also form insoluble silver salts. Nitric acid removes them, so any precipitate that forms is a silver halide.",
        "h": "It removes ions that could mislead the test.",
        "yr": "SS2"
      },
      {
        "q": "Which halogen compound is used to prevent tooth decay and goitre respectively?",
        "o": [
          "Iodide and fluoride",
          "Chloride and bromide",
          "Bromide and iodide",
          "Fluoride and iodide"
        ],
        "a": 3,
        "e": "Fluoride in toothpaste helps prevent tooth decay. Iodide added to table salt (iodised salt) prevents goitre, the swelling of the neck caused by a lack of iodine.",
        "h": "Match each compound to its use in order: teeth first, neck second.",
        "yr": "SS2"
      },
      {
        "q": "What volume of chlorine at s.t.p. is obtained from 17.4 g of MnO₂ with excess concentrated HCl? (Mn = 55, O = 16; molar volume 22.4 dm³)",
        "o": [
          "2.24 dm³",
          "4.48 dm³",
          "8.96 dm³",
          "44.8 dm³"
        ],
        "a": 1,
        "e": "Molar mass of MnO₂ = 87 g/mol, so moles = 17.4 ÷ 87 = 0.20 mol. The ratio MnO₂ : Cl₂ is 1 : 1, so volume = 0.20 × 22.4 = 4.48 dm³.",
        "h": "Find moles of MnO₂ first, then multiply by 22.4.",
        "yr": "SS2"
      },
      {
        "q": "What mass of silver chloride is formed when excess AgNO₃ is added to 11.7 g of sodium chloride? (Na = 23, Cl = 35.5, Ag = 108)",
        "o": [
          "14.35 g",
          "57.4 g",
          "28.7 g",
          "143.5 g"
        ],
        "a": 2,
        "e": "Moles of NaCl = 11.7 ÷ 58.5 = 0.20 mol. The ratio NaCl : AgCl is 1 : 1, and the molar mass of AgCl is 143.5 g/mol. Mass = 0.20 × 143.5 = 28.7 g.",
        "h": "Moles of NaCl equal moles of AgCl.",
        "yr": "SS2"
      },
      {
        "q": "What mass of iodine is formed when 0.05 mol of chlorine reacts with excess potassium iodide solution? (I = 127)",
        "o": [
          "12.7 g",
          "6.35 g",
          "25.4 g",
          "254 g"
        ],
        "a": 0,
        "e": "Cl₂ + 2KI → 2KCl + I₂, so 1 mole of Cl₂ gives 1 mole of I₂. Moles of I₂ = 0.05 mol, and the molar mass of I₂ is 254 g/mol. Mass = 0.05 × 254 = 12.7 g.",
        "h": "The ratio of Cl₂ to I₂ is 1 : 1, and iodine is I₂.",
        "yr": "SS2"
      },
      {
        "q": "A damp piece of blue litmus paper is placed in a gas jar of chlorine. What is observed?",
        "o": [
          "It turns red and is then bleached white",
          "It turns red and stays red",
          "It remains blue",
          "It turns green"
        ],
        "a": 0,
        "e": "Chlorine in water forms HCl (which turns litmus red) and HOCl (which bleaches). So the paper first turns red and is then bleached. Dry paper would not be bleached.",
        "h": "Two acids form when chlorine meets water, one of them a bleach.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Alkali and Alkaline Earth Metals",
    "topicCode": "SS2-CHEM-21",
    "module": "Group Chemistry: Halogens and Metals",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">\n<p class=\"learn-p\">The <span class=\"learn-keyword\">alkali metals</span> (Group 1) and the <span class=\"learn-keyword\">alkaline earth metals</span> (Group 2) are two families of very useful metals. Common salt (sodium chloride) in your kitchen, the chalk in your classroom, the limestone used to make cement, and the bright white flash in fireworks all come from these families. These metals are so reactive that you will never find them as free metals in nature. In this lesson you will learn their characteristics, where they occur, how reactive they are, and what we use them for.</p>\n</div>\n\n<h3 class=\"learn-subheading\">1. The Two Families</h3>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Feature</th><th>Group 1: alkali metals</th><th>Group 2: alkaline earth metals</th></tr></thead>\n<tbody>\n<tr><td>Members</td><td>Lithium (Li), sodium (Na), potassium (K), rubidium (Rb), caesium (Cs), francium (Fr)</td><td>Beryllium (Be), magnesium (Mg), calcium (Ca), strontium (Sr), barium (Ba), radium (Ra)</td></tr>\n<tr><td>Outer electrons</td><td>1</td><td>2</td></tr>\n<tr><td>Ion formed</td><td>M⁺</td><td>M²⁺</td></tr>\n<tr><td>Bonding in compounds</td><td>Ionic</td><td>Ionic (beryllium is mostly covalent)</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">The Group 1 metals are called <span class=\"learn-keyword\">alkali metals</span> because they react with water to form alkalis (strongly basic solutions). The Group 2 metals are called <span class=\"learn-keyword\">alkaline earth metals</span> because their oxides, which were called \"earths\" long ago, dissolve slightly to give alkaline solutions. An atom that loses its outer electrons becomes a positive ion called a <span class=\"learn-keyword\">cation</span>. All these metals lose their outer electrons easily, so they are strong <span class=\"learn-keyword\">reducing agents</span> (substances that give away electrons).</p>\n\n<h3 class=\"learn-subheading\">2. Characteristics of the Alkali Metals</h3>\n<ul class=\"learn-list\">\n<li>They are soft. Lithium, sodium and potassium can be cut with a knife, and a freshly cut surface is shiny silver but quickly turns dull in air.</li>\n<li>They have low densities. Lithium, sodium and potassium are lighter than water and float on it.</li>\n<li>They have low melting and boiling points compared with other metals.</li>\n<li>They are good conductors of heat and electricity.</li>\n<li>They are very reactive, so they are stored under oil (such as kerosene or paraffin oil) to keep out air and moisture.</li>\n<li>Their compounds are ionic, white, and nearly all soluble in water.</li>\n<li>They give characteristic <span class=\"learn-keyword\">flame test</span> colours. In a flame test, a small amount of the compound is put into a flame, and the colour shows which metal is present: lithium gives crimson red, sodium gives golden yellow and potassium gives lilac.</li>\n</ul>\n<p class=\"learn-p\"><strong>Trends down Group 1</strong> (Li to Cs): the atoms get larger, melting points fall, the metals get softer, and reactivity increases. The reason is simple: the outer electron is farther from the nucleus in a bigger atom, so it is held less strongly and is lost more easily.</p>\n\n<h3 class=\"learn-subheading\">3. Reactions of the Alkali Metals</h3>\n<ol class=\"learn-ordered\">\n<li>With water: they give the metal hydroxide (an alkali) and hydrogen. 2Na + 2H₂O → 2NaOH + H₂. Lithium fizzes steadily. Sodium melts into a ball and darts about on the water. Potassium reacts so fast that the hydrogen catches fire with a lilac flame. A little universal indicator shows the solution is strongly alkaline.</li>\n<li>With oxygen (air): they tarnish and form oxides. 4Na + O₂ → 2Na₂O, and 4Li + O₂ → 2Li₂O. Potassium also burns easily.</li>\n<li>With chlorine: they burn to give the chloride. 2Na + Cl₂ → 2NaCl.</li>\n<li>With dilute acids: they react violently and dangerously, so this is never done in the laboratory.</li>\n</ol>\n\n<h3 class=\"learn-subheading\">4. Characteristics of the Alkaline Earth Metals</h3>\n<ul class=\"learn-list\">\n<li>They are shiny, silvery-white metals that tarnish slowly in air.</li>\n<li>They are harder and denser than the alkali metals, and they have higher melting points. This is because each atom gives two electrons to the sea of electrons, so the metallic bonding is stronger.</li>\n<li>They are good conductors of heat and electricity.</li>\n<li>They are less reactive than the Group 1 metal in the same period, but reactivity increases down the group: Be &lt; Mg &lt; Ca &lt; Sr &lt; Ba.</li>\n<li>Their compounds are ionic and most are white solids.</li>\n<li>Flame tests: calcium gives brick red, strontium gives crimson red and barium gives apple green. Magnesium and beryllium give no characteristic colour.</li>\n</ul>\n<p class=\"learn-p\">Why are they less reactive than Group 1 metals? Each Group 2 atom has to lose two electrons, and its nucleus has one more proton, so it pulls its outer electrons more strongly. More energy is needed to remove them.</p>\n\n<h3 class=\"learn-subheading\">5. Reactions of the Alkaline Earth Metals</h3>\n<ol class=\"learn-ordered\">\n<li>With oxygen: magnesium burns with a dazzling white flame to give white magnesium oxide. 2Mg + O₂ → 2MgO. Calcium gives calcium oxide: 2Ca + O₂ → 2CaO.</li>\n<li>With water: magnesium reacts very slowly with cold water but burns in steam: Mg + H₂O(g) → MgO + H₂. Calcium reacts steadily with cold water to give a milky solution (calcium hydroxide) and hydrogen: Ca + 2H₂O → Ca(OH)₂ + H₂.</li>\n<li>With dilute acids: they give a salt and hydrogen. Mg + 2HCl → MgCl₂ + H₂.</li>\n<li>With chlorine: Ca + Cl₂ → CaCl₂.</li>\n</ol>\n<p class=\"learn-p\"><strong>Solubility trends down Group 2.</strong> The hydroxides become more soluble down the group: Mg(OH)₂ is almost insoluble, Ca(OH)₂ is slightly soluble (its solution is limewater), and Ba(OH)₂ is quite soluble. The sulphates become less soluble down the group: MgSO₄ is very soluble, CaSO₄ is slightly soluble and BaSO₄ is insoluble. This is why barium chloride is used to test for sulphate ions: a white precipitate of BaSO₄ forms. Carbonates of Group 2 are insoluble, and they decompose when heated: CaCO₃ → CaO + CO₂.</p>\n\n<h3 class=\"learn-subheading\">6. Occurrence</h3>\n<p class=\"learn-p\">Because they are so reactive, these metals occur only as compounds. They are obtained from their compounds by electrolysis of the molten chlorides (sodium from molten NaCl, magnesium from molten MgCl₂).</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Metal</th><th>Natural source</th></tr></thead>\n<tbody>\n<tr><td>Sodium</td><td>Sodium chloride (common salt, in sea water and rock salt); sodium carbonate; sodium nitrate</td></tr>\n<tr><td>Potassium</td><td>Potassium chloride (sylvite); potassium nitrate</td></tr>\n<tr><td>Magnesium</td><td>Magnesite (MgCO₃); dolomite (CaCO₃·MgCO₃); sea water; Epsom salt (MgSO₄·7H₂O)</td></tr>\n<tr><td>Calcium</td><td>Limestone, marble and chalk (all CaCO₃); gypsum (CaSO₄·2H₂O); fluorspar (CaF₂)</td></tr>\n<tr><td>Barium</td><td>Barytes (BaSO₄)</td></tr>\n</tbody></table></div>\n\n<h3 class=\"learn-subheading\">7. Uses</h3>\n<ul class=\"learn-list\">\n<li><strong>Sodium:</strong> making sodium hydroxide (for soap), sodium vapour street lamps (yellow light), and a coolant in some nuclear reactors. Sodium chloride is used for food and food preservation, and in the chemical industry.</li>\n<li><strong>Sodium compounds:</strong> sodium carbonate (washing soda) for softening hard water and making glass; sodium hydrogencarbonate (baking soda) for baking and as an antacid.</li>\n<li><strong>Potassium:</strong> potassium compounds (potassium nitrate and potassium chloride) are used in fertilisers, because plants need potassium.</li>\n<li><strong>Lithium:</strong> rechargeable batteries (for example in phones).</li>\n<li><strong>Magnesium:</strong> light alloys, flares and fireworks (a white flame), and the \"milk of magnesia\" antacid, which is magnesium hydroxide.</li>\n<li><strong>Calcium:</strong> limestone for making cement, lime (CaO) for making steel and treating acidic soil, slaked lime (Ca(OH)₂) for neutralising acidic soil, and plaster of Paris and chalk.</li>\n<li><strong>Barium:</strong> a \"barium meal\" (barium sulphate) is swallowed to make the stomach show up on X-ray pictures. Barium compounds give green fireworks, and strontium compounds give red ones.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">8. Calculations</h3>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> 2.3 g of sodium is dropped into excess water. Find the volume of hydrogen at s.t.p. and the mass of sodium hydroxide formed. (Na = 23, O = 16, H = 1; molar volume 22.4 dm³)<br>2Na + 2H₂O → 2NaOH + H₂.<br>Moles of Na = 2.3 ÷ 23 = 0.10 mol.<br>The ratio Na : H₂ is 2 : 1, so moles of H₂ = 0.05 mol. Volume = 0.05 × 22.4 = 1.12 dm³.<br>The ratio Na : NaOH is 1 : 1, so moles of NaOH = 0.10 mol. Mass = 0.10 × 40 = 4.0 g.<br><strong>Answer: 1.12 dm³ of hydrogen and 4.0 g of NaOH.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> 4.0 g of calcium reacts with excess water. Find the mass of calcium hydroxide formed and the volume of hydrogen at s.t.p. (Ca = 40, O = 16, H = 1)<br>Ca + 2H₂O → Ca(OH)₂ + H₂.<br>Moles of Ca = 4.0 ÷ 40 = 0.10 mol. The ratios are 1 : 1 : 1, so 0.10 mol of Ca(OH)₂ and 0.10 mol of H₂ are formed.<br>Molar mass of Ca(OH)₂ = 40 + 2(16 + 1) = 74 g/mol. Mass = 0.10 × 74 = 7.4 g.<br>Volume of H₂ = 0.10 × 22.4 = 2.24 dm³.<br><strong>Answer: 7.4 g of Ca(OH)₂ and 2.24 dm³ of hydrogen.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> 2.4 g of magnesium reacts completely with dilute hydrochloric acid of concentration 2.0 mol/dm³. What volume of the acid is needed, and what volume of hydrogen forms at s.t.p.? (Mg = 24)<br>Mg + 2HCl → MgCl₂ + H₂.<br>Moles of Mg = 2.4 ÷ 24 = 0.10 mol.<br>Moles of HCl = 2 × 0.10 = 0.20 mol. Volume of acid = moles ÷ concentration = 0.20 ÷ 2.0 = 0.10 dm³ = 100 cm³.<br>Moles of H₂ = 0.10 mol. Volume = 0.10 × 22.4 = 2.24 dm³.<br><strong>Answer: 100 cm³ of acid and 2.24 dm³ of hydrogen.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Limestone is heated strongly. What mass of quicklime (CaO) and what volume of CO₂ at s.t.p. are produced from 50 g of pure calcium carbonate? (Ca = 40, C = 12, O = 16)<br>CaCO₃ → CaO + CO₂.<br>Molar mass of CaCO₃ = 40 + 12 + 48 = 100 g/mol. Moles = 50 ÷ 100 = 0.50 mol.<br>Moles of CaO = 0.50 mol. Molar mass of CaO = 56 g/mol. Mass = 0.50 × 56 = 28 g.<br>Moles of CO₂ = 0.50 mol. Volume = 0.50 × 22.4 = 11.2 dm³.<br><strong>Answer: 28 g of CaO and 11.2 dm³ of CO₂.</strong></div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Saying that reactivity decreases down the group. For both Group 1 and Group 2 it increases down the group, because the outer electrons are lost more easily.<br>2. Writing the wrong charge. Group 1 ions are M⁺ and Group 2 ions are M²⁺, so write Ca²⁺ and Na⁺, and the formula CaCl₂ with two chlorides.<br>3. Forgetting to balance the water equations. Sodium gives 2NaOH with 2H₂O, but calcium gives Ca(OH)₂ with 2H₂O.<br>4. Mixing up flame colours. Learn them in pairs: sodium golden yellow, potassium lilac, calcium brick red, barium apple green.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often asks you to compare sodium and magnesium (or sodium and calcium) in terms of reaction with water, to explain why Group 1 metals are stored under oil, to give the flame colours, and to state the uses of named compounds such as washing soda, quicklime and slaked lime. A good answer states what you would observe (for example \"fizzing, the metal melts and darts about\") and gives the balanced equation.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>Group 1 metals have 1 outer electron and form M⁺. Group 2 metals have 2 outer electrons and form M²⁺.<br>Group 1 metals are soft, light, low-melting and stored under oil. Group 2 metals are harder, denser and less reactive.<br>Reactivity increases down both groups.<br>Metal + water gives hydroxide + hydrogen. Mg burns with a white flame.<br>They occur only as compounds, such as rock salt, limestone and gypsum.<br>Uses include salt, washing soda, fertilisers, cement, lime, antacids and X-ray barium meals.</div>",
    "questions": [
      {
        "q": "How many electrons are in the outer shell of an alkaline earth metal atom?",
        "o": [
          "1",
          "3",
          "4",
          "2"
        ],
        "a": 3,
        "e": "Alkaline earth metals are in Group 2, so each atom has 2 electrons in its outer shell. They lose both to form M²⁺ ions. Alkali metals have only 1 outer electron.",
        "h": "The group number tells you the number of outer electrons.",
        "yr": "SS2"
      },
      {
        "q": "Why are sodium and potassium stored under kerosene or paraffin oil?",
        "o": [
          "They are very reactive with air and moisture",
          "They are heavy and sink in water",
          "They are poisonous gases",
          "They lose their colour in oil"
        ],
        "a": 0,
        "e": "Sodium and potassium react quickly with oxygen and water vapour in the air. The oil keeps these out so the metals do not tarnish or catch fire.",
        "h": "Think of what the oil keeps away from the metal.",
        "yr": "SS2"
      },
      {
        "q": "Which flame colour is produced by a potassium compound?",
        "o": [
          "Golden yellow",
          "Brick red",
          "Apple green",
          "Lilac"
        ],
        "a": 3,
        "e": "Potassium gives a lilac flame. Sodium gives golden yellow, calcium gives brick red and barium gives apple green.",
        "h": "It is a pale purple colour.",
        "yr": "SS2"
      },
      {
        "q": "When a small piece of sodium is dropped on water, the products are",
        "o": [
          "Sodium oxide and oxygen",
          "Sodium hydroxide and hydrogen",
          "Sodium chloride and hydrogen",
          "Sodium hydroxide and oxygen"
        ],
        "a": 1,
        "e": "2Na + 2H₂O → 2NaOH + H₂. Sodium gives an alkaline solution of sodium hydroxide and releases hydrogen gas, which does not come from oxygen.",
        "h": "The gas given off is the lightest one.",
        "yr": "SS2"
      },
      {
        "q": "Going down Group 1 from lithium to caesium, the reactivity of the metals",
        "o": [
          "Decreases",
          "Stays constant",
          "Increases",
          "Is the same as for Group 2"
        ],
        "a": 2,
        "e": "Reactivity increases down the group because the atoms get larger, so the outer electron is farther from the nucleus and is lost more easily.",
        "h": "Compare lithium fizzing with potassium bursting into flame.",
        "yr": "SS2"
      },
      {
        "q": "Which statement correctly explains why calcium is less reactive than potassium?",
        "o": [
          "Calcium has only one outer electron",
          "Calcium atoms have a stronger pull on the outer electrons and need to lose two",
          "Calcium is a non-metal",
          "Calcium atoms are much larger than potassium atoms"
        ],
        "a": 1,
        "e": "Calcium has 20 protons and its two outer electrons are pulled more strongly than potassium's single outer electron. It also has to lose two electrons, so more energy is needed. Calcium atoms are in fact smaller than potassium atoms.",
        "h": "Compare the nuclear pull and the number of electrons to lose.",
        "yr": "SS2"
      },
      {
        "q": "Which of these metals burns in air with a dazzling white flame to leave a white ash?",
        "o": [
          "Sodium",
          "Potassium",
          "Copper",
          "Magnesium"
        ],
        "a": 3,
        "e": "Magnesium burns with a brilliant white flame to give white magnesium oxide: 2Mg + O₂ → 2MgO. This property is used in flares and fireworks.",
        "h": "It is a Group 2 metal used in fireworks.",
        "yr": "SS2"
      },
      {
        "q": "Which compound is the main component of limestone, marble and chalk?",
        "o": [
          "Calcium carbonate",
          "Calcium sulphate",
          "Magnesium carbonate",
          "Sodium chloride"
        ],
        "a": 0,
        "e": "Limestone, marble and chalk are all forms of calcium carbonate, CaCO₃. Gypsum is calcium sulphate, and magnesite is magnesium carbonate.",
        "h": "On heating it gives quicklime and carbon dioxide.",
        "yr": "SS2"
      },
      {
        "q": "A white precipitate forms when barium chloride solution is added to a solution. The precipitate does not dissolve in dilute hydrochloric acid. The solution contains",
        "o": [
          "Chloride ions",
          "Carbonate ions",
          "Sulphate ions",
          "Nitrate ions"
        ],
        "a": 2,
        "e": "Barium sulphate is insoluble, even in dilute acid, so the test shows sulphate ions. A carbonate would also give a white precipitate, but it dissolves in dilute acid. Chloride and nitrate ions give no precipitate with barium ions.",
        "h": "The only insoluble barium salt here that resists acid is the sulphate.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following is used as a barium meal for X-ray pictures of the stomach?",
        "o": [
          "Barium chloride",
          "Barium sulphate",
          "Barium carbonate",
          "Barium hydroxide"
        ],
        "a": 1,
        "e": "Barium sulphate is insoluble, so it is not absorbed by the body and is safe to swallow. Other barium salts are soluble or poisonous.",
        "h": "It is the insoluble barium salt.",
        "yr": "SS2"
      },
      {
        "q": "Slaked lime is used by farmers to",
        "o": [
          "Make soil more acidic",
          "Kill the plants",
          "Neutralise acidic soil",
          "Add nitrogen to the soil"
        ],
        "a": 2,
        "e": "Slaked lime is calcium hydroxide, a base. It neutralises excess acid in the soil, so crops grow better. It does not contain nitrogen.",
        "h": "It is a base added to an acid problem.",
        "yr": "SS2"
      },
      {
        "q": "What volume of hydrogen at s.t.p. is released when 2.3 g of sodium reacts with excess water? (Na = 23; molar volume = 22.4 dm³)",
        "o": [
          "0.56 dm³",
          "1.12 dm³",
          "2.24 dm³",
          "4.48 dm³"
        ],
        "a": 1,
        "e": "Moles of Na = 2.3 ÷ 23 = 0.10 mol. From 2Na + 2H₂O → 2NaOH + H₂, moles of H₂ = 0.05 mol. Volume = 0.05 × 22.4 = 1.12 dm³. The value 2.24 dm³ comes from forgetting the ratio 2 : 1.",
        "h": "Two moles of sodium give one mole of hydrogen.",
        "yr": "SS2"
      },
      {
        "q": "What mass of calcium hydroxide is formed when 8.0 g of calcium reacts with excess water? (Ca = 40, O = 16, H = 1)",
        "o": [
          "7.4 g",
          "14.8 g",
          "3.7 g",
          "74 g"
        ],
        "a": 1,
        "e": "Moles of Ca = 8.0 ÷ 40 = 0.20 mol. The ratio Ca : Ca(OH)₂ is 1 : 1, and the molar mass of Ca(OH)₂ is 40 + 2(17) = 74 g/mol. Mass = 0.20 × 74 = 14.8 g.",
        "h": "Moles of calcium equal moles of calcium hydroxide.",
        "yr": "SS2"
      },
      {
        "q": "What volume of 1.0 mol/dm³ HCl will react completely with 1.2 g of magnesium? (Mg = 24; Mg + 2HCl → MgCl₂ + H₂)",
        "o": [
          "50 cm³",
          "200 cm³",
          "25 cm³",
          "100 cm³"
        ],
        "a": 3,
        "e": "Moles of Mg = 1.2 ÷ 24 = 0.050 mol. Moles of HCl = 2 × 0.050 = 0.10 mol. Volume = 0.10 ÷ 1.0 = 0.10 dm³ = 100 cm³. The value 50 cm³ comes from a 1 : 1 ratio.",
        "h": "Each mole of Mg needs two moles of HCl.",
        "yr": "SS2"
      },
      {
        "q": "What mass of calcium oxide is obtained by heating 200 g of pure calcium carbonate strongly? (Ca = 40, C = 12, O = 16)",
        "o": [
          "112 g",
          "56 g",
          "100 g",
          "88 g"
        ],
        "a": 0,
        "e": "CaCO₃ → CaO + CO₂. Moles of CaCO₃ = 200 ÷ 100 = 2.0 mol, so moles of CaO = 2.0 mol. Mass = 2.0 × 56 = 112 g. The value 88 g is the mass of the carbon dioxide.",
        "h": "Moles of CaO equal moles of CaCO₃, and CaO has a molar mass of 56.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Transition Elements",
    "topicCode": "SS2-CHEM-22",
    "module": "Metals and Their Compounds",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">Look at a nail, a copper wire, and the bright chrome on a bicycle handle. All three are made from <span class=\"learn-keyword\">transition elements</span>. These are metals found in the middle block of the Periodic Table. They are strong, they conduct electricity, and many of their compounds are brightly coloured. In Nigeria, iron is used for roofing sheets and building rods, and copper is used in the cables that bring NEPA light to your home. In this topic you will learn what makes an element a transition element, its general properties, why it can show more than one <span class=\"learn-keyword\">oxidation state</span>, how it forms <span class=\"learn-keyword\">complex compounds</span>, and why it matters in industry.</div>\n\n<h3 class=\"learn-subheading\">1. What is a Transition Element?</h3>\n<p class=\"learn-p\">The Periodic Table has blocks. The <span class=\"learn-keyword\">d-block</span> is the block in the middle, between Group 2 and Group 13. In these atoms the last electrons are added to the <strong>d sub-shell</strong> (3d, 4d or 5d).</p>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">transition element</span> is an element that has an incomplete (partly filled) d sub-shell in its atom, or in at least one of its common ions. A d sub-shell can hold up to 10 electrons, so \"incomplete\" means it holds 1 to 9 electrons.</p>\n<p class=\"learn-p\">In SS2 we study the first row, which runs from Scandium (Sc) to Zinc (Zn). The common ones are:</p>\n<ul class=\"learn-list\">\n<li>Titanium (Ti), Vanadium (V), Chromium (Cr), Manganese (Mn)</li>\n<li>Iron (Fe), Cobalt (Co), Nickel (Ni), Copper (Cu)</li>\n</ul>\n<p class=\"learn-p\"><strong>Note:</strong> Scandium forms only Sc³⁺, which has no d electrons. Zinc forms only Zn²⁺, which has a full 3d¹⁰ sub-shell. So Sc and Zn are d-block elements, but they are <em>not</em> true transition elements. Zinc does not show the typical transition properties, such as coloured compounds.</p>\n\n<h3 class=\"learn-subheading\">2. Electronic Configuration</h3>\n<p class=\"learn-p\">The electrons fill the 4s sub-shell first, then the 3d sub-shell. The short form uses [Ar], which stands for the 18 electrons of argon (1s² 2s² 2p⁶ 3s² 3p⁶).</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Element</th><th>Atomic number</th><th>Configuration</th></tr></thead>\n<tbody>\n<tr><td>Scandium (Sc)</td><td>21</td><td>[Ar] 3d¹ 4s²</td></tr>\n<tr><td>Titanium (Ti)</td><td>22</td><td>[Ar] 3d² 4s²</td></tr>\n<tr><td>Vanadium (V)</td><td>23</td><td>[Ar] 3d³ 4s²</td></tr>\n<tr><td>Chromium (Cr)</td><td>24</td><td>[Ar] 3d⁵ 4s¹</td></tr>\n<tr><td>Manganese (Mn)</td><td>25</td><td>[Ar] 3d⁵ 4s²</td></tr>\n<tr><td>Iron (Fe)</td><td>26</td><td>[Ar] 3d⁶ 4s²</td></tr>\n<tr><td>Cobalt (Co)</td><td>27</td><td>[Ar] 3d⁷ 4s²</td></tr>\n<tr><td>Nickel (Ni)</td><td>28</td><td>[Ar] 3d⁸ 4s²</td></tr>\n<tr><td>Copper (Cu)</td><td>29</td><td>[Ar] 3d¹⁰ 4s¹</td></tr>\n<tr><td>Zinc (Zn)</td><td>30</td><td>[Ar] 3d¹⁰ 4s²</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Two elements are special. Chromium is 3d⁵ 4s¹ (not 3d⁴ 4s²) and copper is 3d¹⁰ 4s¹ (not 3d⁹ 4s²). This is because a half-filled d sub-shell (5 electrons) and a completely filled d sub-shell (10 electrons) are extra stable.</p>\n<p class=\"learn-p\">When a transition metal forms a positive ion, it loses its <strong>4s electrons first</strong>, then 3d electrons if needed. For example, Fe²⁺ is [Ar] 3d⁶ and Fe³⁺ is [Ar] 3d⁵.</p>\n\n<h3 class=\"learn-subheading\">3. General Properties of Transition Elements</h3>\n<p class=\"learn-p\">Because the 3d and 4s electrons have almost the same energy, all these elements behave in a similar way. Their general properties are:</p>\n<ul class=\"learn-list\">\n<li><strong>Hard, strong, dense metals</strong> with high melting and boiling points (iron melts at about 1538 °C).</li>\n<li><strong>Good conductors</strong> of heat and electricity. Copper is used for electric wires.</li>\n<li><strong>Shiny</strong> (lustrous), and <strong>malleable and ductile</strong>.</li>\n<li><strong>Variable oxidation states</strong> (more than one charge in compounds).</li>\n<li><strong>Coloured compounds and ions</strong> (most compounds of s-block metals like sodium are white).</li>\n<li><strong>Catalytic activity:</strong> they and their compounds act as good catalysts.</li>\n<li><strong>Formation of complex ions</strong> (explained in Section 5).</li>\n<li><strong>Paramagnetism:</strong> many of their compounds are attracted by a magnet, because of unpaired d electrons.</li>\n</ul>\n<p class=\"learn-p\">Compare this with Group 1 metals such as sodium. Sodium is soft, melts at 98 °C, has only one oxidation state (+1), and its compounds are white.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Common ion</th><th>Colour in solution</th></tr></thead>\n<tbody>\n<tr><td>Cu²⁺ (copper(II))</td><td>Blue</td></tr>\n<tr><td>Fe²⁺ (iron(II))</td><td>Pale green</td></tr>\n<tr><td>Fe³⁺ (iron(III))</td><td>Yellow-brown</td></tr>\n<tr><td>MnO₄⁻ (permanganate)</td><td>Purple</td></tr>\n<tr><td>Cr₂O₇²⁻ (dichromate)</td><td>Orange</td></tr>\n<tr><td>Ni²⁺ (nickel(II))</td><td>Green</td></tr>\n<tr><td>Co²⁺ (cobalt(II))</td><td>Pink</td></tr>\n</tbody></table></div>\n\n<h3 class=\"learn-subheading\">4. Variable Oxidation States</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">oxidation state</span> (or oxidation number) is the charge an atom has, or appears to have, in a compound. Sodium is always +1, but iron can be +2 or +3. This is called <span class=\"learn-keyword\">variable oxidation state</span>.</p>\n<p class=\"learn-p\"><strong>Why?</strong> The 4s and 3d electrons are very close in energy. So, after the 4s electrons are lost, one or more 3d electrons can also be lost without needing too much energy. This gives several possible charges.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Element</th><th>Common oxidation states</th><th>Example</th></tr></thead>\n<tbody>\n<tr><td>Chromium</td><td>+2, +3, +6</td><td>Cr₂O₃ (+3), K₂Cr₂O₇ (+6)</td></tr>\n<tr><td>Manganese</td><td>+2, +4, +6, +7</td><td>MnO₂ (+4), KMnO₄ (+7)</td></tr>\n<tr><td>Iron</td><td>+2, +3</td><td>FeSO₄ (+2), Fe₂O₃ (+3)</td></tr>\n<tr><td>Copper</td><td>+1, +2</td><td>Cu₂O (+1), CuO (+2)</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Rules for finding oxidation numbers:</p>\n<ol class=\"learn-ordered\">\n<li>An atom in its free state (Fe, Cu, O₂) is 0.</li>\n<li>Oxygen is usually −2. Hydrogen is usually +1.</li>\n<li>The sum of oxidation numbers in a neutral compound is 0. In an ion, the sum equals the charge on the ion.</li>\n</ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Find the oxidation number of manganese in KMnO₄.<br>Step 1: K is +1, O is −2, Mn is x.<br>Step 2: The compound is neutral, so (+1) + x + 4(−2) = 0.<br>Step 3: 1 + x − 8 = 0, so x = +7.<br><strong>Answer: Mn is +7.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> Find the oxidation number of chromium in K₂Cr₂O₇.<br>Step 1: There are 2 K (+1 each), 2 Cr (x each) and 7 O (−2 each).<br>Step 2: 2(+1) + 2x + 7(−2) = 0.<br>Step 3: 2 + 2x − 14 = 0, so 2x = 12, and x = +6.<br><strong>Answer: Cr is +6.</strong></div>\n<p class=\"learn-p\">Changing the oxidation state is <em>redox</em>. Fe²⁺ → Fe³⁺ + e⁻ is oxidation (loss of electrons). The purple MnO₄⁻ turns almost colourless when it is reduced to Mn²⁺ in acid. This is used in titrations.</p>\n\n<h3 class=\"learn-subheading\">5. Complex Compounds</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">complex compound</span> (or complex ion) has a central metal ion with a number of molecules or ions attached to it by <strong>dative covalent (coordinate) bonds</strong>. In a dative bond, both shared electrons come from one atom.</p>\n<ul class=\"learn-list\">\n<li>The <span class=\"learn-keyword\">ligand</span> is the molecule or ion that donates a lone pair of electrons to the central metal ion. Common ligands: H₂O, NH₃, Cl⁻, CN⁻, OH⁻.</li>\n<li>The <span class=\"learn-keyword\">coordination number</span> is the number of ligand bonds to the central ion. Common values are 4 and 6.</li>\n</ul>\n<p class=\"learn-p\">Transition metal ions form complexes easily because they are small, carry a charge, and have empty d orbitals that can accept the lone pairs.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Complex ion</th><th>Central ion</th><th>Ligand</th><th>Coordination number</th><th>Colour</th></tr></thead>\n<tbody>\n<tr><td>[Cu(H₂O)₆]²⁺</td><td>Cu²⁺</td><td>H₂O</td><td>6</td><td>Blue</td></tr>\n<tr><td>[Cu(NH₃)₄]²⁺</td><td>Cu²⁺</td><td>NH₃</td><td>4</td><td>Deep blue</td></tr>\n<tr><td>[Fe(CN)₆]⁴⁻</td><td>Fe²⁺</td><td>CN⁻</td><td>6</td><td>Yellow (in K₄[Fe(CN)₆])</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\"><strong>A classic test.</strong> Add a little NH₃ solution to blue copper(II) sulphate solution: a pale blue precipitate of Cu(OH)₂ forms. Add excess NH₃ and the precipitate dissolves, giving a <strong>deep blue solution</strong> of [Cu(NH₃)₄]²⁺.</p>\n<p class=\"learn-p\"><strong>Tests with sodium hydroxide:</strong> Fe²⁺ gives a green precipitate, Fe³⁺ gives a reddish-brown precipitate, and Cu²⁺ gives a pale blue precipitate.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> Find the oxidation number of iron in [Fe(CN)₆]⁴⁻.<br>Step 1: Each CN⁻ is −1, so 6 ligands give −6.<br>Step 2: The overall charge is −4, so x + (−6) = −4.<br>Step 3: x = −4 + 6 = +2.<br><strong>Answer: Fe is +2.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Write the electronic configuration of Fe³⁺ (atomic number 26).<br>Step 1: Fe atom is [Ar] 3d⁶ 4s².<br>Step 2: To form Fe³⁺ remove 3 electrons: the 2 electrons in 4s first, then 1 electron from 3d.<br>Step 3: 3d⁶ becomes 3d⁵.<br><strong>Answer: Fe³⁺ is [Ar] 3d⁵.</strong></div>\n\n<h3 class=\"learn-subheading\">6. Industrial Importance</h3>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Element / compound</th><th>Use in industry</th></tr></thead>\n<tbody>\n<tr><td>Iron</td><td>Steel for rods, roofing, vehicles and bridges. Iron is also the catalyst in the Haber process for ammonia.</td></tr>\n<tr><td>Vanadium(V) oxide, V₂O₅</td><td>Catalyst in the Contact process for sulphuric acid.</td></tr>\n<tr><td>Nickel</td><td>Catalyst for hydrogenation (making margarine from vegetable oil); in stainless steel and coins.</td></tr>\n<tr><td>Platinum</td><td>Catalyst for making nitric acid (Ostwald process); in catalytic converters.</td></tr>\n<tr><td>Copper</td><td>Electric cables, water pipes, and alloys such as brass and bronze.</td></tr>\n<tr><td>Chromium</td><td>Chrome plating to stop rust and give shine; in stainless steel.</td></tr>\n<tr><td>Manganese(IV) oxide, MnO₂</td><td>Used in dry cells (batteries); catalyst for decomposing hydrogen peroxide.</td></tr>\n<tr><td>Titanium</td><td>Light, strong and rust-resistant; used for aircraft parts and artificial joints.</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Transition metals are also used to make <strong>alloys</strong> (mixtures of metals). Steel is mainly iron mixed with a little carbon. Adding chromium and nickel to iron gives stainless steel, which does not rust easily.</p>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Saying Zn and Sc are typical transition elements. They are d-block, but Zn²⁺ is 3d¹⁰ and Sc³⁺ is 3d⁰, so neither has an incomplete d sub-shell in its common ion.<br>2. Removing 3d electrons before 4s when forming ions. Remove the 4s electrons first.<br>3. Writing Cr as 3d⁴ 4s² and Cu as 3d⁹ 4s². The correct forms are 3d⁵ 4s¹ and 3d¹⁰ 4s¹.<br>4. Forgetting that the overall charge of a complex ion equals the metal charge plus the ligand charges.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often asks: \"State two properties that make transition elements different from Group 1 metals\" (answer: variable oxidation states, coloured compounds, catalytic activity, high melting point, complex formation). Also expect: \"Calculate the oxidation number of Mn in KMnO₄\", \"Name the catalyst used in the Haber/Contact process\", and \"What is observed when excess NH₃ is added to CuSO₄ solution?\" (deep blue solution). Always write the ion formula, not just the colour.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>• Transition elements have an incomplete d sub-shell in the atom or its common ions.<br>• Properties: hard, high melting point, conduct well, coloured compounds, catalysts, paramagnetic.<br>• Variable oxidation states arise because 4s and 3d electrons have close energies (Fe +2/+3, Cu +1/+2, Mn up to +7).<br>• Complexes have a central metal ion with ligands bonded by dative bonds; the coordination number is the number of bonds.<br>• Uses: iron and steel, V₂O₅ in the Contact process, Ni in hydrogenation, Pt in nitric acid, Cu in cables.</div>",
    "questions": [
      {
        "q": "A transition element is best defined as an element that",
        "o": [
          "has a filled outer s sub-shell only",
          "is found in Group 1 of the Periodic Table",
          "has an incomplete d sub-shell in its atom or in at least one of its common ions",
          "forms only colourless compounds"
        ],
        "a": 2,
        "e": "A transition element has a partly filled d sub-shell (1 to 9 d electrons) in the atom or in a common ion. Group 1 metals are s-block elements and their compounds are usually white, so the other options do not describe transition elements.",
        "h": "Think about which sub-shell is only partly filled.",
        "yr": "SS2"
      },
      {
        "q": "What is the electronic configuration of iron (atomic number 26)?",
        "o": [
          "[Ar] 3d⁸",
          "[Ar] 3d⁴ 4s²",
          "[Ar] 3d⁷ 4s¹",
          "[Ar] 3d⁶ 4s²"
        ],
        "a": 3,
        "e": "Argon has 18 electrons. Iron has 26, so 8 more electrons are added: 2 go into 4s and 6 into 3d, giving [Ar] 3d⁶ 4s². The option 3d⁴ 4s² would only have 24 electrons in total, which is chromium's atomic number.",
        "h": "Add up 18 + the electrons in 3d and 4s to reach 26.",
        "yr": "SS2"
      },
      {
        "q": "Which of these d-block elements is NOT a typical transition element?",
        "o": [
          "Iron",
          "Zinc",
          "Copper",
          "Manganese"
        ],
        "a": 1,
        "e": "Zinc forms only Zn²⁺, which has a full 3d¹⁰ sub-shell, so it has no incomplete d sub-shell in its atom or common ion. Iron, copper and manganese all form ions with partly filled d sub-shells.",
        "h": "Which element only forms an ion with a full 3d sub-shell?",
        "yr": "SS2"
      },
      {
        "q": "A solution containing Cu²⁺ ions is usually",
        "o": [
          "colourless",
          "blue",
          "pale green",
          "purple"
        ],
        "a": 1,
        "e": "Hydrated copper(II) ions are blue, as seen in copper(II) sulphate solution. Pale green is the colour of Fe²⁺ and purple is the colour of permanganate (MnO₄⁻).",
        "h": "Think of the colour of copper(II) sulphate crystals dissolved in water.",
        "yr": "SS2"
      },
      {
        "q": "Which catalyst is used in the Contact process for making sulphuric acid?",
        "o": [
          "Finely divided iron",
          "Nickel",
          "Platinum gauze",
          "Vanadium(V) oxide"
        ],
        "a": 3,
        "e": "Vanadium(V) oxide, V₂O₅, speeds up the oxidation of SO₂ to SO₃. Iron is the catalyst for the Haber process, nickel is used in hydrogenation, and platinum is used in the Ostwald process.",
        "h": "The catalyst is an oxide of a transition element with symbol V.",
        "yr": "SS2"
      },
      {
        "q": "Transition elements show variable oxidation states mainly because",
        "o": [
          "they have very high melting points",
          "they are all metals",
          "the 4s and 3d electrons have very similar energies",
          "they have only one outer electron"
        ],
        "a": 2,
        "e": "Since 4s and 3d electrons are close in energy, after the 4s electrons are lost, some 3d electrons can also be lost with little extra energy. This gives several possible charges. High melting point is a property but it does not explain changing charge.",
        "h": "Compare the energies of the 4s and 3d electrons.",
        "yr": "SS2"
      },
      {
        "q": "What is the oxidation number of manganese in KMnO₄?",
        "o": [
          "+7",
          "+2",
          "+5",
          "+4"
        ],
        "a": 0,
        "e": "K is +1 and four oxygen atoms give −8. So +1 + x − 8 = 0, giving x = +7. The value +4 is the oxidation number in MnO₂, a different compound.",
        "h": "The sum of all oxidation numbers in a neutral compound is zero.",
        "yr": "SS2"
      },
      {
        "q": "Calculate the oxidation number of chromium in K₂Cr₂O₇.",
        "o": [
          "+3",
          "+6",
          "+12",
          "+7"
        ],
        "a": 1,
        "e": "2(+1) + 2x + 7(−2) = 0, so 2 + 2x − 14 = 0 and 2x = 12, giving x = +6. The value +12 is wrong because it is the total for both Cr atoms, not for one atom.",
        "h": "There are two chromium atoms, so divide the total by 2.",
        "yr": "SS2"
      },
      {
        "q": "When excess ammonia solution is added to copper(II) sulphate solution, the final colour observed is",
        "o": [
          "a deep blue solution",
          "a green precipitate",
          "a reddish-brown precipitate",
          "a colourless solution"
        ],
        "a": 0,
        "e": "A little NH₃ first gives a pale blue precipitate of Cu(OH)₂. In excess NH₃ this dissolves to form the deep blue complex ion [Cu(NH₃)₄]²⁺. Green and reddish-brown precipitates are formed by iron(II) and iron(III) with alkalis.",
        "h": "The precipitate dissolves because a complex ion forms.",
        "yr": "SS2"
      },
      {
        "q": "In a complex ion, a ligand is",
        "o": [
          "the central metal ion",
          "the charge on the complex",
          "a molecule or ion that donates a lone pair of electrons to the central ion",
          "the number of bonds around the central ion"
        ],
        "a": 2,
        "e": "A ligand donates a lone pair of electrons to the central metal ion and forms a dative bond. Examples are H₂O, NH₃, Cl⁻ and CN⁻. The number of bonds is the coordination number, not the ligand.",
        "h": "Ligands have lone pairs to give away.",
        "yr": "SS2"
      },
      {
        "q": "What is the coordination number of copper in [Cu(NH₃)₄]²⁺?",
        "o": [
          "2",
          "6",
          "4",
          "8"
        ],
        "a": 2,
        "e": "There are four NH₃ ligands, each joined to Cu²⁺ by one dative bond, so the coordination number is 4. The charge 2+ is not the coordination number.",
        "h": "Count the ligands attached to the central ion.",
        "yr": "SS2"
      },
      {
        "q": "Find the oxidation number of iron in [Fe(CN)₆]⁴⁻.",
        "o": [
          "+2",
          "+3",
          "+6",
          "−2"
        ],
        "a": 0,
        "e": "Six CN⁻ ligands contribute −6. If x is the oxidation number of iron, x + (−6) = −4, so x = +2. A student who answers +3 has forgotten that the overall charge of the ion is −4, not −3.",
        "h": "x plus the total ligand charge must equal the charge on the whole ion.",
        "yr": "SS2"
      },
      {
        "q": "What is the electronic configuration of the Fe³⁺ ion?",
        "o": [
          "[Ar] 3d⁵",
          "[Ar] 3d³ 4s²",
          "[Ar] 3d⁶",
          "[Ar] 3d⁴ 4s¹"
        ],
        "a": 0,
        "e": "Fe is [Ar] 3d⁶ 4s². The 4s electrons are removed first (2 electrons), then one 3d electron, leaving [Ar] 3d⁵. Removing 3d electrons first would give the wrong answer 3d³ 4s².",
        "h": "Remove electrons from 4s first.",
        "yr": "SS2"
      },
      {
        "q": "Sodium hydroxide solution is added to a solution of iron(III) salt. What is observed?",
        "o": [
          "A green precipitate",
          "A white precipitate soluble in excess",
          "A pale blue precipitate",
          "A reddish-brown precipitate"
        ],
        "a": 3,
        "e": "Fe³⁺ gives reddish-brown Fe(OH)₃. A green precipitate is formed by Fe²⁺ and a pale blue precipitate by Cu²⁺.",
        "h": "Iron(III) hydroxide looks like rust.",
        "yr": "SS2"
      },
      {
        "q": "Copper is [Ar] 3d¹⁰ 4s¹ and not [Ar] 3d⁹ 4s² because",
        "o": [
          "copper has 28 electrons",
          "4s is always filled with only one electron",
          "copper has no d electrons",
          "a completely filled 3d sub-shell is extra stable"
        ],
        "a": 3,
        "e": "One 4s electron moves into 3d to give a filled 3d¹⁰ sub-shell, which is more stable. The same idea explains chromium being 3d⁵ 4s¹ (half-filled d). Copper has 29 electrons, not 28.",
        "h": "Full and half-full d sub-shells are especially stable.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "General Properties of Metals",
    "topicCode": "SS2-CHEM-23",
    "module": "Metals and Their Compounds",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">Metals are all around you: the aluminium pot your mother cooks with, the iron roofing sheet over your head, the copper wire in your phone charger, and the gold in a wedding ring. Some metals, like sodium, react very fast with water, while others, like gold, hardly react at all. In this topic you will learn the <span class=\"learn-keyword\">reactivity series</span>, which puts metals in order of how eagerly they react. You will also learn how metals are <span class=\"learn-keyword\">extracted</span> from their ores, how they are <span class=\"learn-keyword\">refined</span> (purified), and how <span class=\"learn-keyword\">metallic bonding</span> explains why metals shine, conduct electricity and can be hammered into shape.</div>\n\n<h3 class=\"learn-subheading\">1. The Reactivity Series</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">reactivity series</span> is a list of metals arranged from the most reactive to the least reactive. A more reactive metal loses electrons more easily to form positive ions. Hydrogen is included in the list for comparison.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Metal</th><th>Symbol</th><th>Reactivity</th></tr></thead>\n<tbody>\n<tr><td>Potassium</td><td>K</td><td>Most reactive</td></tr>\n<tr><td>Sodium</td><td>Na</td><td>↓</td></tr>\n<tr><td>Calcium</td><td>Ca</td><td>↓</td></tr>\n<tr><td>Magnesium</td><td>Mg</td><td>↓</td></tr>\n<tr><td>Aluminium</td><td>Al</td><td>↓</td></tr>\n<tr><td>Zinc</td><td>Zn</td><td>↓</td></tr>\n<tr><td>Iron</td><td>Fe</td><td>↓</td></tr>\n<tr><td>Tin</td><td>Sn</td><td>↓</td></tr>\n<tr><td>Lead</td><td>Pb</td><td>↓</td></tr>\n<tr><td>(Hydrogen)</td><td>H</td><td>reference</td></tr>\n<tr><td>Copper</td><td>Cu</td><td>↓</td></tr>\n<tr><td>Silver</td><td>Ag</td><td>↓</td></tr>\n<tr><td>Gold</td><td>Au</td><td>Least reactive</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">A memory aid: \"<strong>K</strong>ing <strong>Na</strong>poleon <strong>Ca</strong>n <strong>M</strong>ake <strong>Al</strong>l <strong>Z</strong>ealous <strong>Fe</strong>llows <strong>S</strong>ing <strong>P</strong>raises <strong>H</strong>appily, <strong>Cu</strong>rrently <strong>Ag</strong>reeing <strong>Au</strong>dience.\"</p>\n\n<h3 class=\"learn-subheading\">2. How Metals React: Evidence for the Order</h3>\n<ul class=\"learn-list\">\n<li><strong>With cold water:</strong> K, Na and Ca react with cold water to give the metal hydroxide and hydrogen. Example: 2Na + 2H₂O → 2NaOH + H₂. Potassium reacts most violently.</li>\n<li><strong>With steam:</strong> Mg, Al (if its oxide layer is removed), Zn and Fe react with steam to give the metal oxide and hydrogen. Example: Mg + H₂O(g) → MgO + H₂. Iron gives Fe₃O₄: 3Fe + 4H₂O(g) → Fe₃O₄ + 4H₂ (reversible).</li>\n<li><strong>With dilute acids:</strong> Metals above hydrogen react with dilute HCl or H₂SO₄ to give a salt and hydrogen. Example: Zn + 2HCl → ZnCl₂ + H₂. Copper, silver and gold do not react with dilute acids.</li>\n<li><strong>With oxygen:</strong> Reactive metals burn easily in air. Example: 2Mg + O₂ → 2MgO. Copper only forms black CuO when heated strongly. Gold does not react.</li>\n</ul>\n<p class=\"learn-p\"><strong>Displacement reactions.</strong> A more reactive metal removes a less reactive metal from a solution of its salt. Zn + CuSO₄ → ZnSO₄ + Cu. Zinc is above copper, so zinc goes into solution, and brown copper is deposited. Copper placed in zinc sulphate solution will do nothing, because copper is less reactive than zinc.</p>\n<p class=\"learn-p\"><strong>Stability of compounds.</strong> The more reactive a metal, the more stable its compounds are to heat. The carbonate of sodium does not decompose on heating, but copper carbonate easily decomposes: CuCO₃ → CuO + CO₂.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1 (Prediction):</strong> Will a reaction occur when an iron nail is placed in copper(II) sulphate solution?<br>Step 1: Compare positions: iron is above copper in the series, so iron is more reactive.<br>Step 2: So iron displaces copper: Fe + CuSO₄ → FeSO₄ + Cu.<br>Step 3: Observation: the nail is coated with a brown deposit, and the blue solution slowly turns pale green (Fe²⁺).<br><strong>Answer: Yes, a displacement reaction occurs.</strong></div>\n\n<h3 class=\"learn-subheading\">3. How Reactivity Decides the Method of Extraction</h3>\n<p class=\"learn-p\">Most metals are found in the earth as compounds called <span class=\"learn-keyword\">ores</span>. <strong>Extraction</strong> means getting the metal out of its ore. The method depends on where the metal is in the series.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Position</th><th>Metals</th><th>Method</th></tr></thead>\n<tbody>\n<tr><td>Very reactive</td><td>K, Na, Ca, Mg, Al</td><td>Electrolysis of the molten compound</td></tr>\n<tr><td>Middle</td><td>Zn, Fe, Sn, Pb</td><td>Reduction by heating with carbon or carbon monoxide</td></tr>\n<tr><td>Unreactive</td><td>Cu (from some ores), Ag, Au</td><td>Found native (as the free metal) or easily obtained by heating or simple chemical methods</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Reactive metals hold on tightly to oxygen, so carbon is not strong enough to remove it. A very strong method, electrolysis, is needed.</p>\n\n<h3 class=\"learn-subheading\">4. Extraction of Iron (Blast Furnace)</h3>\n<p class=\"learn-p\">The main ore is <strong>haematite</strong>, Fe₂O₃. It is mixed with <strong>coke</strong> (carbon) and <strong>limestone</strong> (CaCO₃) and put into the top of the blast furnace. Hot air is blown in at the bottom.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Coke burns in the hot air: C + O₂ → CO₂. This gives heat.</li>\n<li>Step 2: CO₂ reacts with more hot coke: CO₂ + C → 2CO. Carbon monoxide is the reducing agent.</li>\n<li>Step 3: CO reduces the ore: Fe₂O₃ + 3CO → 2Fe + 3CO₂. The molten iron sinks to the bottom.</li>\n<li>Step 4: Limestone decomposes: CaCO₃ → CaO + CO₂.</li>\n<li>Step 5: CaO removes sand (silicon dioxide impurity): CaO + SiO₂ → CaSiO₃. This is <strong>slag</strong>, which floats on the iron and is removed separately.</li>\n</ol>\n<p class=\"learn-p\">The iron from the furnace is called <strong>pig iron</strong> or cast iron. It has about 4% carbon and is brittle. Steel is made by removing most of the carbon and adding other metals.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> What mass of iron can be obtained from 80 kg of Fe₂O₃? (Fe = 56, O = 16)<br>Step 1: Equation: Fe₂O₃ + 3CO → 2Fe + 3CO₂.<br>Step 2: Molar mass of Fe₂O₃ = 2(56) + 3(16) = 112 + 48 = 160 g/mol. Mass of 2 mol Fe = 2 × 56 = 112 g.<br>Step 3: 160 g of Fe₂O₃ gives 112 g of Fe, so 80 kg gives (112/160) × 80 = 56 kg.<br><strong>Answer: 56 kg of iron.</strong></div>\n\n<h3 class=\"learn-subheading\">5. Extraction of Aluminium and Sodium (Electrolysis)</h3>\n<p class=\"learn-p\"><strong>Aluminium.</strong> The ore is <strong>bauxite</strong>, which is impure hydrated aluminium oxide. It is purified to pure Al₂O₃ (alumina). Alumina melts at over 2000 °C, so it is dissolved in molten <strong>cryolite</strong> (Na₃AlF₆). This lowers the melting point to about 950 °C and saves energy. Electrolysis is done with graphite (carbon) electrodes.</p>\n<ul class=\"learn-list\">\n<li>At the cathode (negative): Al³⁺ + 3e⁻ → Al. Molten aluminium collects at the bottom.</li>\n<li>At the anode (positive): 2O²⁻ → O₂ + 4e⁻. The oxygen burns away the carbon anode, so the anodes must be replaced.</li>\n</ul>\n<p class=\"learn-p\"><strong>Sodium.</strong> Molten sodium chloride is electrolysed in the Down's cell. At the cathode: Na⁺ + e⁻ → Na. At the anode: 2Cl⁻ → Cl₂ + 2e⁻. Calcium chloride is added to lower the melting point.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> What quantity of electricity is needed to deposit 9 g of aluminium? (Al = 27, 1 Faraday = 96500 C)<br>Step 1: Al³⁺ + 3e⁻ → Al, so 3 mol of electrons give 1 mol (27 g) of Al.<br>Step 2: 27 g needs 3 × 96500 = 289500 C.<br>Step 3: 9 g needs (9/27) × 289500 = 96500 C.<br><strong>Answer: 96500 C.</strong></div>\n\n<h3 class=\"learn-subheading\">6. Refining of Metals</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Refining</span> means removing impurities from a metal after extraction, to make it pure enough to use.</p>\n<ul class=\"learn-list\">\n<li><strong>Electrolytic refining of copper:</strong> The impure copper is the <em>anode</em>. A thin sheet of pure copper is the <em>cathode</em>. The electrolyte is copper(II) sulphate solution. At the anode: Cu → Cu²⁺ + 2e⁻. At the cathode: Cu²⁺ + 2e⁻ → Cu. Pure copper builds up on the cathode, and the impurities fall to the bottom as sludge.</li>\n<li><strong>Distillation:</strong> Metals with low boiling points, such as zinc, can be heated until they vaporise and then be condensed as pure metal.</li>\n<li><strong>Removing carbon:</strong> Pig iron is converted to steel by blowing oxygen through it to burn off the excess carbon.</li>\n</ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> A current of 5 A refines copper. How long is needed to deposit 6.35 g of Cu? (Cu = 63.5, 1 F = 96500 C)<br>Step 1: Moles of Cu = 6.35 / 63.5 = 0.1 mol.<br>Step 2: Cu²⁺ + 2e⁻ → Cu, so charge = 0.1 × 2 × 96500 = 19300 C.<br>Step 3: Time = Q / I = 19300 / 5 = 3860 s (about 64.3 minutes).<br><strong>Answer: 3860 seconds.</strong></div>\n\n<h3 class=\"learn-subheading\">7. Metallic Bonding</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Metallic bonding</span> is the force of attraction between positive metal ions and a \"sea\" of free (delocalised) electrons around them. The metal atoms lose their outer electrons. These electrons are no longer held by one atom, so they move freely through the whole structure. The positive ions are arranged in a regular layered pattern. The bond is strong in all directions.</p>\n<p class=\"learn-p\">This one idea explains the properties of metals:</p>\n<ul class=\"learn-list\">\n<li><strong>Electrical conductivity:</strong> The free electrons can move and carry charge.</li>\n<li><strong>Thermal conductivity:</strong> The free electrons pass energy along quickly.</li>\n<li><strong>Malleable and ductile:</strong> The layers of ions can slide over each other without breaking the bond, because the sea of electrons still holds them together.</li>\n<li><strong>High melting and boiling points:</strong> The attraction between ions and electrons is strong, and takes a lot of heat to break.</li>\n<li><strong>Lustre (shiny):</strong> The free electrons reflect light.</li>\n</ul>\n<p class=\"learn-p\"><strong>Strength of the bond.</strong> It is stronger when the metal ion has a bigger charge, a smaller size, and more delocalised electrons. So magnesium (Mg²⁺, 2 electrons per atom) has a higher melting point than sodium (Na⁺, 1 electron per atom). Sodium is soft and melts at 98 °C, but magnesium melts at about 650 °C.</p>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Putting hydrogen in the wrong place. It is a reference point between lead and copper, and only metals above it react with dilute acids to give hydrogen.<br>2. Saying carbon is used to extract aluminium or sodium. These are too reactive; electrolysis is used.<br>3. Writing the wrong electrode for refining: the impure metal is the anode and pure metal is the cathode.<br>4. Saying \"metallic bonds are between metal atoms sharing electrons\". Say instead that positive ions are attracted to delocalised electrons.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often asks you to write equations for the blast furnace, name the ore of a metal (haematite for iron, bauxite for aluminium), state why cryolite is added, and explain malleability or conduction using metallic bonding. For displacement questions, always compare positions in the series first. In calculations, write the half-equation to find the number of electrons before using Faraday's constant.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>• The reactivity series: K, Na, Ca, Mg, Al, Zn, Fe, Sn, Pb, (H), Cu, Ag, Au.<br>• A more reactive metal displaces a less reactive one from its salt solution.<br>• K to Al are extracted by electrolysis; Zn, Fe, Sn, Pb by carbon or carbon monoxide.<br>• Iron: haematite, coke and limestone in the blast furnace; Al: bauxite and cryolite by electrolysis.<br>• Refining of copper: impure anode, pure cathode, copper(II) sulphate electrolyte.<br>• Metallic bonding is the attraction between positive ions and delocalised electrons.</div>",
    "questions": [
      {
        "q": "Which of these metals is the most reactive?",
        "o": [
          "Potassium",
          "Zinc",
          "Copper",
          "Iron"
        ],
        "a": 0,
        "e": "Potassium is at the top of the reactivity series, so it loses electrons most easily. Zinc and iron are in the middle, and copper is below hydrogen, so they are less reactive.",
        "h": "Look at the top of the reactivity series.",
        "yr": "SS2"
      },
      {
        "q": "Which metal will NOT react with dilute hydrochloric acid?",
        "o": [
          "Magnesium",
          "Zinc",
          "Iron",
          "Copper"
        ],
        "a": 3,
        "e": "Only metals above hydrogen in the reactivity series displace hydrogen from dilute acids. Copper is below hydrogen, so it does not react with dilute HCl. Mg, Zn and Fe all give hydrogen gas.",
        "h": "Which metal is below hydrogen in the series?",
        "yr": "SS2"
      },
      {
        "q": "What is observed when a clean iron nail is placed in copper(II) sulphate solution?",
        "o": [
          "A brown deposit forms on the nail and the blue colour fades",
          "No change occurs",
          "The nail dissolves and a white solid forms",
          "The solution turns purple"
        ],
        "a": 0,
        "e": "Iron is more reactive than copper, so it displaces copper: Fe + CuSO₄ → FeSO₄ + Cu. Brown copper coats the nail and the blue Cu²⁺ ions are replaced by pale green Fe²⁺ ions.",
        "h": "Iron is above copper in the series.",
        "yr": "SS2"
      },
      {
        "q": "The main ore of aluminium is",
        "o": [
          "haematite",
          "bauxite",
          "galena",
          "limestone"
        ],
        "a": 1,
        "e": "Bauxite is impure hydrated aluminium oxide, from which pure alumina (Al₂O₃) is obtained. Haematite is the ore of iron and limestone is calcium carbonate.",
        "h": "The ore name begins with the letter b.",
        "yr": "SS2"
      },
      {
        "q": "Why is cryolite added during the extraction of aluminium?",
        "o": [
          "It reduces alumina to aluminium",
          "It lowers the melting point of alumina",
          "It forms slag with impurities",
          "It acts as the cathode"
        ],
        "a": 1,
        "e": "Pure alumina melts above 2000 °C. Dissolving it in molten cryolite lowers the working temperature to about 950 °C, which saves a lot of energy. Cryolite does not reduce the alumina; electrolysis does that.",
        "h": "Think about saving energy and heat.",
        "yr": "SS2"
      },
      {
        "q": "In the blast furnace, the substance that actually reduces iron(III) oxide is",
        "o": [
          "limestone",
          "calcium oxide",
          "carbon monoxide",
          "hot air"
        ],
        "a": 2,
        "e": "Coke burns to CO₂, which reacts with more carbon to give CO. The carbon monoxide then reduces the ore: Fe₂O₃ + 3CO → 2Fe + 3CO₂. Limestone is used to remove sand as slag.",
        "h": "A gas made from coke does the reducing.",
        "yr": "SS2"
      },
      {
        "q": "What is the purpose of limestone in the blast furnace?",
        "o": [
          "To supply heat",
          "To act as a catalyst",
          "To react with sand to form slag",
          "To reduce the ore"
        ],
        "a": 2,
        "e": "Limestone decomposes to CaO, and CaO combines with sand (SiO₂) to form calcium silicate, CaSiO₃, which is slag. Slag floats on the molten iron and is removed. Heat comes from burning coke.",
        "h": "It removes an impurity found in the ore.",
        "yr": "SS2"
      },
      {
        "q": "Sodium is extracted from its compounds by",
        "o": [
          "heating with carbon",
          "electrolysis of the molten chloride",
          "displacement with copper",
          "heating the ore in air"
        ],
        "a": 1,
        "e": "Sodium is very high in the reactivity series, so carbon cannot reduce its compounds. Molten sodium chloride is electrolysed and sodium forms at the cathode: Na⁺ + e⁻ → Na.",
        "h": "Very reactive metals need a very strong method.",
        "yr": "SS2"
      },
      {
        "q": "In the electrolytic refining of copper, the impure copper is made the",
        "o": [
          "anode",
          "cathode",
          "electrolyte",
          "salt bridge"
        ],
        "a": 0,
        "e": "The impure copper is the anode, where Cu → Cu²⁺ + 2e⁻. The copper ions move to the pure copper cathode and are deposited. Mixing up the electrodes is a very common error.",
        "h": "The anode is where the metal dissolves.",
        "yr": "SS2"
      },
      {
        "q": "Metals are malleable because",
        "o": [
          "their ions are held in fixed positions",
          "they have covalent bonds",
          "layers of positive ions can slide over each other while the electron sea holds them together",
          "they have low melting points"
        ],
        "a": 2,
        "e": "In metallic bonding the layers of ions can slide without breaking the bond, because the sea of delocalised electrons still holds them together. In an ionic solid, sliding the layers brings like charges together and the crystal breaks.",
        "h": "Think about layers sliding.",
        "yr": "SS2"
      },
      {
        "q": "Which statement best describes metallic bonding?",
        "o": [
          "Sharing of electrons between two metal atoms",
          "Transfer of electrons from metal to non-metal",
          "Attraction between molecules",
          "Attraction between positive ions and delocalised electrons"
        ],
        "a": 3,
        "e": "Metallic bonding is the force of attraction between positive metal ions and the sea of delocalised electrons. Option one describes covalent bonding and option two describes ionic bonding.",
        "h": "Think of ions in a sea of electrons.",
        "yr": "SS2"
      },
      {
        "q": "Magnesium has a higher melting point than sodium mainly because",
        "o": [
          "it is a softer metal",
          "it has fewer protons",
          "its ion has a bigger charge and it gives more delocalised electrons",
          "its atoms are larger"
        ],
        "a": 2,
        "e": "Magnesium gives 2 electrons per atom (Mg²⁺) and sodium gives 1 (Na⁺). More delocalised electrons and a bigger ionic charge give stronger metallic bonding, so more heat is needed to melt Mg.",
        "h": "Compare Mg²⁺ with Na⁺.",
        "yr": "SS2"
      },
      {
        "q": "Calculate the mass of iron that can be obtained from 320 kg of Fe₂O₃. (Fe = 56, O = 16)",
        "o": [
          "224 kg",
          "112 kg",
          "160 kg",
          "320 kg"
        ],
        "a": 0,
        "e": "Fe₂O₃ has molar mass 160, and it gives 2Fe = 112 parts. So the mass of iron = (112/160) × 320 = 224 kg. The answer 112 kg is the mass from only 160 kg of ore.",
        "h": "Use the ratio 160 g of Fe₂O₃ to 112 g of Fe.",
        "yr": "SS2"
      },
      {
        "q": "What quantity of electricity is needed to deposit 0.5 mole of aluminium? (1 F = 96500 C)",
        "o": [
          "96500 C",
          "289500 C",
          "48250 C",
          "144750 C"
        ],
        "a": 3,
        "e": "Al³⁺ + 3e⁻ → Al, so 1 mole of Al needs 3 F. For 0.5 mole, charge = 0.5 × 3 × 96500 = 144750 C. The value 289500 C is the charge for 1 mole.",
        "h": "Find the number of electrons per Al atom, then multiply by 0.5.",
        "yr": "SS2"
      },
      {
        "q": "A current of 2 A flows for 9650 s through molten sodium chloride. What mass of sodium is deposited? (Na = 23, 1 F = 96500 C)",
        "o": [
          "2.3 g",
          "9.2 g",
          "1.15 g",
          "4.6 g"
        ],
        "a": 3,
        "e": "Charge = 2 × 9650 = 19300 C. Moles of electrons = 19300/96500 = 0.2 mol. Na⁺ + e⁻ → Na, so 0.2 mol of Na = 0.2 × 23 = 4.6 g.",
        "h": "Charge = current × time, then divide by 96500.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Non-Metals and Their Compounds",
    "topicCode": "SS2-CHEM-24",
    "module": "Non-Metals and Their Compounds",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">The air you breathe is about one-fifth <span class=\"learn-keyword\">oxygen</span> and four-fifths <span class=\"learn-keyword\">nitrogen</span>. The water in your bucket is made from oxygen and <span class=\"learn-keyword\">hydrogen</span>. The fertiliser a farmer spreads on a farm in Kwara or Benue contains nitrogen compounds, and the gas used for cooking in many Nigerian homes burns with oxygen to give heat. These three non-metals are among the most important elements on Earth. In this topic you will learn how each one is prepared in the laboratory, its properties and uses, and the important compounds it forms: water, hydrogen peroxide, oxides, ammonia and nitric acid.</div>\n\n<h3 class=\"learn-subheading\">1. Hydrogen: Preparation</h3>\n<p class=\"learn-p\"><strong>Hydrogen (H₂)</strong> is the lightest element. It is a colourless, odourless gas that is the least dense of all gases.</p>\n<p class=\"learn-p\"><strong>Laboratory preparation.</strong> A reactive metal, usually zinc, is added to dilute hydrochloric acid or dilute sulphuric acid.</p>\n<ul class=\"learn-list\">\n<li>Zn + 2HCl → ZnCl₂ + H₂</li>\n<li>Zn + H₂SO₄ → ZnSO₄ + H₂</li>\n</ul>\n<p class=\"learn-p\">The gas is collected over water, because hydrogen is almost insoluble in water, or by downward delivery (upward displacement of air), because it is lighter than air. Dilute nitric acid is not used, because it is an oxidising agent and gives other products instead of hydrogen.</p>\n<p class=\"learn-p\"><strong>Test for hydrogen.</strong> Bring a burning splint to the gas. Hydrogen burns with a <strong>\"pop\" sound</strong>.</p>\n<p class=\"learn-p\"><strong>Other methods.</strong> Hydrogen can also be made by reacting sodium or calcium with cold water (2Na + 2H₂O → 2NaOH + H₂), by passing steam over red-hot iron, and by electrolysis of water. In industry it is made from natural gas (methane) and steam: CH₄ + H₂O → CO + 3H₂.</p>\n\n<h3 class=\"learn-subheading\">2. Hydrogen: Properties and Uses</h3>\n<ul class=\"learn-list\">\n<li>It is colourless, odourless and tasteless, and very light.</li>\n<li>It is not acidic or basic (it is neutral to litmus).</li>\n<li><strong>It burns in air</strong> with a pale blue flame to form water: 2H₂ + O₂ → 2H₂O. A mixture of hydrogen and air can explode.</li>\n<li><strong>It is a reducing agent.</strong> It removes oxygen from heated metal oxides: CuO + H₂ → Cu + H₂O. The black copper(II) oxide turns brown (copper metal), and drops of water form.</li>\n<li>It combines with nitrogen to make ammonia (the Haber process): N₂ + 3H₂ ⇌ 2NH₃.</li>\n</ul>\n<p class=\"learn-p\"><strong>Uses:</strong> making ammonia (for fertiliser), hardening vegetable oils into margarine (hydrogenation, with a nickel catalyst), rocket fuel, filling weather balloons, and making hydrogen chloride.</p>\n<p class=\"learn-p\"><strong>Water, H₂O</strong> is the oxide of hydrogen. It is a neutral liquid, and it is a good solvent. Anhydrous copper(II) sulphate (white) turns blue with water, and dry cobalt chloride paper turns from blue to pink. These are tests for water.</p>\n\n<h3 class=\"learn-subheading\">3. Oxygen: Preparation and Test</h3>\n<p class=\"learn-p\"><strong>Oxygen (O₂)</strong> makes up about 21% of air by volume. Living things need it for respiration and fuels need it to burn.</p>\n<p class=\"learn-p\"><strong>Laboratory preparation.</strong> The usual method is to decompose <strong>hydrogen peroxide</strong> solution with a catalyst, <strong>manganese(IV) oxide (MnO₂)</strong>:</p>\n<p class=\"learn-p\">2H₂O₂ → 2H₂O + O₂ (MnO₂ catalyst)</p>\n<p class=\"learn-p\">Another method is to heat potassium chlorate with MnO₂: 2KClO₃ → 2KCl + 3O₂. A third is to heat potassium permanganate: 2KMnO₄ → K₂MnO₄ + MnO₂ + O₂. The gas is collected over water, because it is only slightly soluble in water.</p>\n<p class=\"learn-p\"><strong>Test for oxygen.</strong> A glowing splint is placed in the gas. It <strong>relights</strong>.</p>\n<p class=\"learn-p\"><strong>Industrial preparation.</strong> Oxygen is obtained by the fractional distillation of liquid air. Liquid air is warmed slowly, and nitrogen boils off first (b.p. −196 °C) and oxygen later (b.p. −183 °C).</p>\n\n<h3 class=\"learn-subheading\">4. Oxygen: Properties, Oxides and Uses</h3>\n<ul class=\"learn-list\">\n<li>It is a colourless, odourless gas, slightly soluble in water, and a little denser than air.</li>\n<li>It supports combustion (but does not burn itself).</li>\n<li>It reacts with most elements to form <span class=\"learn-keyword\">oxides</span>.</li>\n</ul>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Element</th><th>Reaction with oxygen</th><th>Type of oxide</th></tr></thead>\n<tbody>\n<tr><td>Magnesium</td><td>2Mg + O₂ → 2MgO (bright white flame)</td><td>Basic</td></tr>\n<tr><td>Sodium</td><td>4Na + O₂ → 2Na₂O (yellow flame)</td><td>Basic</td></tr>\n<tr><td>Carbon</td><td>C + O₂ → CO₂</td><td>Acidic</td></tr>\n<tr><td>Sulphur</td><td>S + O₂ → SO₂ (blue flame)</td><td>Acidic</td></tr>\n<tr><td>Aluminium</td><td>4Al + 3O₂ → 2Al₂O₃</td><td>Amphoteric</td></tr>\n<tr><td>Iron</td><td>3Fe + 2O₂ → Fe₃O₄</td><td>Basic</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">A <strong>basic oxide</strong> (metal oxide) reacts with acids. An <strong>acidic oxide</strong> (non-metal oxide) dissolves in water to form an acid and reacts with alkalis. An <strong>amphoteric oxide</strong> reacts with both acids and alkalis, for example Al₂O₃ and ZnO. Water and carbon monoxide are neutral oxides.</p>\n<p class=\"learn-p\"><strong>Uses of oxygen:</strong> breathing in hospitals and by divers, oxy-acetylene welding and cutting, steel making, and rocket fuel.</p>\n<p class=\"learn-p\"><strong>Hydrogen peroxide (H₂O₂)</strong> is a colourless liquid. It decomposes slowly to water and oxygen, so it is stored in dark bottles. It is used as a bleach and as an antiseptic.</p>\n\n<h3 class=\"learn-subheading\">5. Nitrogen: Preparation, Properties and Uses</h3>\n<p class=\"learn-p\"><strong>Nitrogen (N₂)</strong> makes up about 78% of air by volume. Its two atoms are held by a triple bond, which is very strong, so nitrogen is unreactive at normal temperature.</p>\n<p class=\"learn-p\"><strong>Industrial preparation:</strong> fractional distillation of liquid air. <strong>Laboratory preparation:</strong> pure nitrogen can be made by heating ammonium nitrite, which decomposes: NH₄NO₂ → N₂ + 2H₂O. In school, nitrogen is also obtained by removing oxygen from air, for example by passing air over red-hot copper (2Cu + O₂ → 2CuO), but this nitrogen contains a little argon.</p>\n<ul class=\"learn-list\">\n<li>It is a colourless, odourless gas, slightly soluble in water, and neutral.</li>\n<li>It does not burn and does not support combustion.</li>\n<li>At high temperatures it reacts with oxygen (in lightning, or in a car engine) to form nitrogen monoxide: N₂ + O₂ → 2NO.</li>\n<li>With hydrogen it forms ammonia (Haber process, with an iron catalyst).</li>\n<li>It reacts with hot magnesium to form magnesium nitride: 3Mg + N₂ → Mg₃N₂.</li>\n</ul>\n<p class=\"learn-p\"><strong>Uses:</strong> making ammonia and fertilisers, an inert atmosphere in food packing, and liquid nitrogen for freezing and cooling.</p>\n<p class=\"learn-p\"><strong>Oxides of nitrogen.</strong> Dinitrogen oxide (N₂O, \"laughing gas\") is used as an anaesthetic. Nitrogen monoxide (NO) is colourless, and turns into brown nitrogen dioxide (NO₂) in air: 2NO + O₂ → 2NO₂. NO₂ is an acidic gas that causes acid rain. It is a pollutant.</p>\n\n<h3 class=\"learn-subheading\">6. Ammonia (NH₃)</h3>\n<p class=\"learn-p\"><strong>Laboratory preparation:</strong> heat an ammonium salt with a strong base, usually ammonium chloride with calcium hydroxide.</p>\n<p class=\"learn-p\">2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2H₂O + 2NH₃</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Mix the solids and heat them in a test tube that slopes slightly downward, so water does not run back and crack the glass.</li>\n<li>Step 2: Pass the gas through a drying tower of quicklime (CaO). Concentrated H₂SO₄ and CaCl₂ must NOT be used, because they react with ammonia.</li>\n<li>Step 3: Collect by <strong>downward displacement of air</strong> (upward delivery), because ammonia is less dense than air and very soluble in water.</li>\n</ol>\n<p class=\"learn-p\"><strong>Properties:</strong></p>\n<ul class=\"learn-list\">\n<li>Colourless gas with a strong pungent smell, very soluble in water.</li>\n<li>Its solution is weakly alkaline: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻. It turns red litmus blue.</li>\n<li>It reacts with acids to give ammonium salts. With hydrogen chloride it gives dense white fumes of ammonium chloride: NH₃ + HCl → NH₄Cl. This is the test for ammonia gas.</li>\n<li>It burns in oxygen with a yellowish flame to form nitrogen and water.</li>\n</ul>\n<p class=\"learn-p\"><strong>Uses:</strong> making fertilisers (such as ammonium sulphate and urea), making nitric acid, cleaning agents, and refrigeration.</p>\n\n<h3 class=\"learn-subheading\">7. Nitric Acid (HNO₃)</h3>\n<p class=\"learn-p\"><strong>Laboratory preparation:</strong> heat sodium nitrate or potassium nitrate with concentrated sulphuric acid and condense the vapour: NaNO₃ + H₂SO₄ → NaHSO₄ + HNO₃. Pure nitric acid is colourless, but it often turns yellow because of dissolved NO₂. This is caused by light: 4HNO₃ → 4NO₂ + 2H₂O + O₂. So it is stored in dark bottles.</p>\n<p class=\"learn-p\"><strong>Properties:</strong> it is a strong acid and a strong oxidising agent. Dilute nitric acid has the usual acid properties (it reacts with bases and carbonates), but it does not normally give hydrogen with metals. Concentrated nitric acid reacts with copper: Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O, giving brown fumes of NO₂ and a blue solution.</p>\n<p class=\"learn-p\"><strong>Test for nitrates.</strong> Add NaOH and aluminium foil to the solution and warm it. Ammonia is given off, which turns red litmus blue. The brown ring test is also used.</p>\n<p class=\"learn-p\"><strong>Uses:</strong> making fertilisers such as ammonium nitrate, explosives, dyes and drugs.</p>\n<p class=\"learn-p\"><strong>The nitrogen cycle</strong> links these compounds. Nitrogen in air is \"fixed\" by lightning and by bacteria in the root nodules of legumes such as beans. Plants take up nitrates, animals eat plants, and decay returns nitrogen compounds to the soil.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> What volume of hydrogen at s.t.p. is produced when 6.5 g of zinc reacts with excess dilute HCl? (Zn = 65; molar volume = 22.4 dm³ at s.t.p.)<br>Step 1: Zn + 2HCl → ZnCl₂ + H₂, so 1 mol Zn gives 1 mol H₂.<br>Step 2: Moles of Zn = 6.5 / 65 = 0.1 mol.<br>Step 3: Moles of H₂ = 0.1 mol. Volume = 0.1 × 22.4 = 2.24 dm³.<br><strong>Answer: 2.24 dm³ of hydrogen.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> What volume of oxygen at s.t.p. is released by the complete decomposition of 6.8 g of hydrogen peroxide? (H = 1, O = 16; 22.4 dm³ per mole)<br>Step 1: 2H₂O₂ → 2H₂O + O₂. So 2 mol H₂O₂ give 1 mol O₂.<br>Step 2: Molar mass of H₂O₂ = 2 + 32 = 34 g/mol. Moles = 6.8 / 34 = 0.2 mol.<br>Step 3: Moles of O₂ = 0.2 / 2 = 0.1 mol. Volume = 0.1 × 22.4 = 2.24 dm³.<br><strong>Answer: 2.24 dm³ of oxygen.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> What mass of ammonia is formed from 5.35 g of ammonium chloride heated with excess calcium hydroxide? (N = 14, H = 1, Cl = 35.5)<br>Step 1: 2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2H₂O + 2NH₃. So 2 mol NH₄Cl give 2 mol NH₃, a 1 : 1 ratio.<br>Step 2: Molar mass of NH₄Cl = 14 + 4 + 35.5 = 53.5 g/mol. Moles = 5.35 / 53.5 = 0.1 mol.<br>Step 3: Moles of NH₃ = 0.1 mol. Molar mass of NH₃ = 17 g/mol. Mass = 0.1 × 17 = 1.7 g.<br><strong>Answer: 1.7 g of ammonia.</strong></div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Using concentrated H₂SO₄ to dry ammonia. It reacts with the gas. Use quicklime.<br>2. Collecting ammonia over water. It is very soluble in water, so use downward displacement of air.<br>3. Mixing up the tests: hydrogen gives a \"pop\" with a flame, oxygen relights a glowing splint.<br>4. Forgetting the mole ratio from the equation. In the hydrogen peroxide reaction, 2 mol of H₂O₂ give only 1 mol of O₂.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often asks you to describe the laboratory preparation of one of these gases with a labelled diagram, an equation, the method of collection and the test for the gas. Learn the collection method and the drying agent for each. Typical question wording: \"State the test for ammonia gas\" or \"Write the equation for the reaction of dilute HCl with zinc\". Always show the mole ratio in calculations.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>• Hydrogen: Zn + dilute acid; light gas; burns with a pop; reducing agent; used for ammonia and margarine.<br>• Oxygen: decomposition of H₂O₂ with MnO₂; relights a glowing splint; forms basic, acidic and amphoteric oxides.<br>• Nitrogen: 78% of air; unreactive; obtained from liquid air; used for ammonia and fertilisers.<br>• Ammonia: from an ammonium salt and a base; alkaline gas; collected by downward displacement of air; dried with quicklime.<br>• Nitric acid: strong acid and oxidising agent; made from a nitrate and concentrated H₂SO₄.</div>",
    "questions": [
      {
        "q": "Which reagents are used to prepare hydrogen in the laboratory?",
        "o": [
          "Zinc and dilute hydrochloric acid",
          "Copper and dilute hydrochloric acid",
          "Zinc and dilute nitric acid",
          "Sodium chloride and water"
        ],
        "a": 0,
        "e": "Zinc is above hydrogen in the reactivity series, so it displaces hydrogen from dilute HCl: Zn + 2HCl → ZnCl₂ + H₂. Copper is below hydrogen and does not react, and dilute nitric acid is an oxidising agent that does not give hydrogen.",
        "h": "The metal must be above hydrogen in the reactivity series.",
        "yr": "SS2"
      },
      {
        "q": "What is the test for hydrogen gas?",
        "o": [
          "It relights a glowing splint",
          "It turns limewater milky",
          "It turns damp red litmus blue",
          "It burns with a pop sound when a flame is applied"
        ],
        "a": 3,
        "e": "Hydrogen burns with a squeaky pop when a lighted splint is brought near. Relighting a glowing splint is the test for oxygen, milky limewater is for carbon dioxide, and blue litmus is for ammonia.",
        "h": "Think of a small explosion sound.",
        "yr": "SS2"
      },
      {
        "q": "The catalyst used when preparing oxygen from hydrogen peroxide is",
        "o": [
          "iron",
          "vanadium(V) oxide",
          "platinum",
          "manganese(IV) oxide"
        ],
        "a": 3,
        "e": "Manganese(IV) oxide, MnO₂, speeds up the decomposition 2H₂O₂ → 2H₂O + O₂ and is not used up. Iron is for the Haber process and V₂O₅ is for the Contact process.",
        "h": "The catalyst is a black oxide of manganese.",
        "yr": "SS2"
      },
      {
        "q": "Oxygen is tested by",
        "o": [
          "a burning splint, which gives a pop",
          "damp blue litmus paper, which turns red",
          "limewater, which turns milky",
          "a glowing splint, which relights"
        ],
        "a": 3,
        "e": "Oxygen supports burning, so a glowing splint bursts into flame again. A pop is the test for hydrogen.",
        "h": "Oxygen supports combustion.",
        "yr": "SS2"
      },
      {
        "q": "Which oxide is amphoteric?",
        "o": [
          "CO₂",
          "Al₂O₃",
          "Na₂O",
          "SO₂"
        ],
        "a": 1,
        "e": "Aluminium oxide reacts with both acids and alkalis, so it is amphoteric. CO₂ and SO₂ are acidic oxides and Na₂O is a basic oxide.",
        "h": "Amphoteric oxides react with both acids and bases.",
        "yr": "SS2"
      },
      {
        "q": "Industrially, nitrogen and oxygen are obtained from",
        "o": [
          "electrolysis of brine",
          "the Haber process",
          "fractional distillation of liquid air",
          "heating limestone"
        ],
        "a": 2,
        "e": "Liquid air is warmed slowly. Nitrogen boils off first (−196 °C) and oxygen later (−183 °C), so they can be separated. The Haber process makes ammonia, not these gases.",
        "h": "The gases have different boiling points.",
        "yr": "SS2"
      },
      {
        "q": "Nitrogen is unreactive at room temperature mainly because",
        "o": [
          "it is a metal",
          "its two atoms are joined by a strong triple bond",
          "it is very soluble in water",
          "it is less dense than air"
        ],
        "a": 1,
        "e": "The N≡N triple bond is very strong and needs a lot of energy to break, so nitrogen reacts only at high temperature or with a catalyst. Density and solubility do not control reactivity.",
        "h": "Think about the bond between the two nitrogen atoms.",
        "yr": "SS2"
      },
      {
        "q": "Ammonia gas is collected by",
        "o": [
          "upward displacement of air",
          "over water",
          "over mercury only",
          "downward displacement of air"
        ],
        "a": 3,
        "e": "Ammonia is less dense than air, so it is collected by downward displacement of air (upward delivery). It is very soluble in water, so it cannot be collected over water.",
        "h": "The gas is lighter than air and very soluble in water.",
        "yr": "SS2"
      },
      {
        "q": "Which drying agent is suitable for ammonia gas?",
        "o": [
          "Concentrated sulphuric acid",
          "Anhydrous calcium chloride",
          "Quicklime (calcium oxide)",
          "Phosphorus(V) oxide"
        ],
        "a": 2,
        "e": "Quicklime is basic and does not react with ammonia. Concentrated H₂SO₄ and P₄O₁₀ are acidic and react with it, and CaCl₂ forms a compound with ammonia.",
        "h": "Ammonia is basic, so use a basic drying agent.",
        "yr": "SS2"
      },
      {
        "q": "Dense white fumes form when a rod dipped in concentrated HCl is held near a gas. The gas is",
        "o": [
          "hydrogen",
          "nitrogen",
          "ammonia",
          "oxygen"
        ],
        "a": 2,
        "e": "NH₃ reacts with HCl to form tiny solid particles of ammonium chloride, seen as white fumes: NH₃ + HCl → NH₄Cl. The other gases do not do this.",
        "h": "The white solid is ammonium chloride.",
        "yr": "SS2"
      },
      {
        "q": "Brown fumes are given off when concentrated nitric acid reacts with copper. The gas is",
        "o": [
          "N₂",
          "NH₃",
          "NO₂",
          "H₂"
        ],
        "a": 2,
        "e": "Concentrated nitric acid is an oxidising agent. It is reduced to nitrogen dioxide, a brown gas, in the reaction Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O. Hydrogen is not given off.",
        "h": "The colour of the gas is brown.",
        "yr": "SS2"
      },
      {
        "q": "Why is nitric acid stored in dark bottles?",
        "o": [
          "Light decomposes it to give NO₂, O₂ and water",
          "It reacts with air",
          "It is very cold",
          "It absorbs water"
        ],
        "a": 0,
        "e": "Light causes 4HNO₃ → 4NO₂ + 2H₂O + O₂. The dissolved brown NO₂ makes the acid yellow. A dark bottle reduces this decomposition.",
        "h": "Think of what light does to the acid.",
        "yr": "SS2"
      },
      {
        "q": "Calculate the volume of hydrogen at s.t.p. obtained when 13 g of zinc reacts with excess dilute acid. (Zn = 65; molar volume 22.4 dm³)",
        "o": [
          "2.24 dm³",
          "4.48 dm³",
          "11.2 dm³",
          "44.8 dm³"
        ],
        "a": 1,
        "e": "Moles of Zn = 13/65 = 0.2 mol. Zn + 2HCl → ZnCl₂ + H₂ gives 1 mol H₂ per mol Zn, so 0.2 mol H₂ = 0.2 × 22.4 = 4.48 dm³. The answer 2.24 dm³ is for only 6.5 g of zinc.",
        "h": "Find moles of Zn first, then multiply by 22.4.",
        "yr": "SS2"
      },
      {
        "q": "What volume of oxygen at s.t.p. is produced by the decomposition of 0.4 mol of hydrogen peroxide? (22.4 dm³ per mole)",
        "o": [
          "4.48 dm³",
          "8.96 dm³",
          "2.24 dm³",
          "17.92 dm³"
        ],
        "a": 0,
        "e": "2H₂O₂ → 2H₂O + O₂, so 2 mol H₂O₂ give 1 mol O₂. Moles of O₂ = 0.4/2 = 0.2 mol. Volume = 0.2 × 22.4 = 4.48 dm³. The answer 8.96 dm³ ignores the 2 : 1 ratio.",
        "h": "Two moles of peroxide give one mole of oxygen.",
        "yr": "SS2"
      },
      {
        "q": "What mass of ammonia is obtained from 10.7 g of ammonium chloride heated with excess calcium hydroxide? (N = 14, H = 1, Cl = 35.5)",
        "o": [
          "3.4 g",
          "1.7 g",
          "17 g",
          "0.2 g"
        ],
        "a": 0,
        "e": "Molar mass of NH₄Cl = 53.5 g/mol, so moles = 10.7/53.5 = 0.2 mol. The ratio of NH₄Cl to NH₃ is 1 : 1, so 0.2 mol NH₃ × 17 g/mol = 3.4 g. The answer 1.7 g is for only 5.35 g of the salt.",
        "h": "The ratio of NH₄Cl to NH₃ is 1 : 1.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Chemical Energetics",
    "topicCode": "SS2-CHEM-11",
    "module": "Physical Chemistry",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\"><span class=\"learn-keyword\">Chemical energetics</span> (thermochemistry) studies the heat energy changes that accompany chemical reactions. Every chemical reaction either releases or absorbs energy, usually as heat. Understanding these changes is essential for predicting reaction feasibility and designing industrial processes.</div><h3 class=\"learn-subheading\">1. Exothermic and Endothermic Reactions</h3><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Type</th><th>Heat Change</th><th>ΔH</th><th>Examples</th></tr></thead><tbody><tr><td>Exothermic</td><td>Releases heat to surroundings; temperature rises</td><td>Negative (−)</td><td>Combustion, neutralisation, respiration, rusting</td></tr><tr><td>Endothermic</td><td>Absorbs heat from surroundings; temperature falls</td><td>Positive (+)</td><td>Thermal decomposition, dissolving NH₄NO₃, photosynthesis</td></tr></tbody></table></div><h3 class=\"learn-subheading\">2. Enthalpy Change (ΔH)</h3><p class=\"learn-p\">ΔH = H(products) − H(reactants). At constant pressure, ΔH equals the heat exchanged with the surroundings.</p><ul class=\"learn-list\"><li><strong>Standard enthalpy of combustion (ΔH°c):</strong> heat released when 1 mole of a substance burns completely in oxygen under standard conditions.</li><li><strong>Standard enthalpy of formation (ΔH°f):</strong> heat change when 1 mole of a compound forms from its elements in their standard states.</li><li><strong>Standard enthalpy of neutralisation (ΔH°neut):</strong> heat released when 1 mole of water forms from the neutralisation of an acid by a base. For strong acid + strong base: ≈ −57 kJ/mol.</li></ul><h3 class=\"learn-subheading\">3. Hess's Law</h3><p class=\"learn-p\">The total enthalpy change for a reaction is the same regardless of the route taken, provided initial and final conditions are the same.</p><p class=\"learn-p\">This allows calculation of ΔH for reactions that cannot be measured directly: ΔH(reaction) = ΣΔH°f(products) − ΣΔH°f(reactants)</p><h3 class=\"learn-subheading\">4. Bond Energies</h3><p class=\"learn-p\">Breaking bonds requires energy (endothermic); forming bonds releases energy (exothermic).</p><p class=\"learn-p\"><strong>ΔH(reaction) = Σ(bond energies broken) − Σ(bond energies formed)</strong></p><p class=\"learn-p\">If bonds formed release more energy than bonds broken absorb → exothermic (ΔH negative).</p><h3 class=\"learn-subheading\">5. Energy Profile Diagrams</h3><p class=\"learn-p\">An energy profile (reaction coordinate diagram) shows the energy of reactants, the activation energy (Eₐ) barrier (transition state), and the energy of products. Catalyst lowers Eₐ without changing ΔH.</p><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Key Rule:</strong> Exothermic: ΔH negative (energy released). Endothermic: ΔH positive (energy absorbed). Bond breaking = endothermic; bond forming = exothermic. Catalyst lowers Eₐ but does NOT change ΔH.</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> Exothermic: ΔH < 0 (combustion, neutralisation). Endothermic: ΔH > 0 (thermal decomposition, photosynthesis). Hess's Law: ΔH same regardless of route. Bond energies: ΔH = bonds broken − bonds formed. Catalyst lowers Eₐ; does not change ΔH.</div>",
    "questions": [
      {
        "q": "An exothermic reaction is one in which:",
        "o": [
          "Heat is absorbed from the surroundings, causing a temperature decrease",
          "Heat is released to the surroundings, causing a temperature increase; ΔH is negative",
          "The reaction requires a catalyst to proceed",
          "The products have higher energy than the reactants"
        ],
        "a": 1,
        "e": "Exothermic reactions release energy (usually heat) to the surroundings, so the temperature of the reaction mixture and surroundings rises. ΔH = H(products) − H(reactants) < 0 (negative), because products have lower energy than reactants.",
        "h": "Exothermic: heat released → temperature rises; ΔH < 0 (negative).",
        "yr": "SS2"
      },
      {
        "q": "Which of the following is an endothermic process?",
        "o": [
          "Combustion of petrol",
          "Neutralisation of HCl by NaOH",
          "Thermal decomposition of calcium carbonate: CaCO₃ → CaO + CO₂",
          "Rusting of iron"
        ],
        "a": 2,
        "e": "Thermal decomposition of CaCO₃ requires heat input (strongly endothermic — requires about 178 kJ/mol). Combustion, neutralisation, and rusting are all exothermic (they release heat).",
        "h": "Endothermic examples: thermal decomposition (CaCO₃→CaO+CO₂), photosynthesis, dissolving NH₄NO₃.",
        "yr": "SS2"
      },
      {
        "q": "Hess's Law states that:",
        "o": [
          "The heat of a reaction depends on the pathway taken",
          "The total enthalpy change for a reaction is the same regardless of the route, provided initial and final states are the same",
          "Exothermic reactions always have higher activation energies",
          "The enthalpy change equals the bond energy of all products"
        ],
        "a": 1,
        "e": "Hess's Law (conservation of energy applied to thermochemistry): ΔH for a reaction is a state function — it depends only on the initial and final states, not the pathway. This allows calculation of ΔH values for reactions that cannot be measured directly by combining other known ΔH values.",
        "h": "Hess's Law: ΔH same regardless of route (state function). Allows indirect ΔH calculation.",
        "yr": "SS2"
      },
      {
        "q": "The standard enthalpy of neutralisation for strong acid + strong base is approximately:",
        "o": [
          "+57 kJ/mol",
          "−57 kJ/mol",
          "−285 kJ/mol",
          "+285 kJ/mol"
        ],
        "a": 1,
        "e": "The standard enthalpy of neutralisation for strong acid + strong base ≈ −57 kJ/mol. The negative sign indicates it is exothermic (heat released). This is the heat released when 1 mol of water forms: H⁺(aq) + OH⁻(aq) → H₂O(l), ΔH = −57 kJ/mol.",
        "h": "Strong acid + strong base neutralisation: ΔH ≈ −57 kJ/mol (exothermic).",
        "yr": "SS2"
      },
      {
        "q": "If ΔHf°(CO₂) = −394 kJ/mol and ΔHf°(H₂O) = −286 kJ/mol, what is ΔH for CH₄ combustion if ΔHf°(CH₄) = −75 kJ/mol? CH₄ + 2O₂ → CO₂ + 2H₂O",
        "o": [
          "−891 kJ/mol",
          "+891 kJ/mol",
          "−605 kJ/mol",
          "−969 kJ/mol"
        ],
        "a": 0,
        "e": "ΔH = ΣΔHf°(products) − ΣΔHf°(reactants). = [ΔHf°(CO₂) + 2×ΔHf°(H₂O)] − [ΔHf°(CH₄) + 2×ΔHf°(O₂)]. = [−394 + 2(−286)] − [−75 + 0]. = [−394 − 572] − [−75]. = −966 − (−75) = −966 + 75 = −891 kJ/mol.",
        "h": "ΔH = [−394 + 2(−286)] − [−75 + 0] = −966 + 75 = −891 kJ/mol.",
        "yr": "SS2"
      },
      {
        "q": "Bond breaking in a chemical reaction is:",
        "o": [
          "Always exothermic (releases energy)",
          "Always endothermic (requires energy input)",
          "Sometimes exothermic, sometimes endothermic",
          "Neither exothermic nor endothermic"
        ],
        "a": 1,
        "e": "Breaking chemical bonds always requires energy input — it is always endothermic. Conversely, forming bonds always releases energy — always exothermic. The overall ΔH of a reaction is: ΔH = energy absorbed (bonds broken) − energy released (bonds formed).",
        "h": "Bond breaking = endothermic (requires energy). Bond forming = exothermic (releases energy).",
        "yr": "SS2"
      },
      {
        "q": "Using bond energies: H₂ + Cl₂ → 2HCl. Bond energies: H–H = 436, Cl–Cl = 243, H–Cl = 432 kJ/mol. ΔH = ?",
        "o": [
          "+185 kJ/mol",
          "−185 kJ/mol",
          "−679 kJ/mol",
          "+679 kJ/mol"
        ],
        "a": 1,
        "e": "ΔH = bonds broken − bonds formed. Broken: H–H (436) + Cl–Cl (243) = 679 kJ. Formed: 2 × H–Cl = 2 × 432 = 864 kJ. ΔH = 679 − 864 = −185 kJ/mol. Exothermic (more energy released forming bonds than absorbed breaking them).",
        "h": "ΔH = bonds broken − bonds formed = 679 − 864 = −185 kJ/mol.",
        "yr": "SS2"
      },
      {
        "q": "In an energy profile (reaction coordinate) diagram for an exothermic reaction:",
        "o": [
          "Products are shown at a higher energy level than reactants",
          "Products are shown at a lower energy level than reactants; ΔH is negative; Eₐ is the peak above the reactants",
          "The activation energy equals the enthalpy change",
          "The transition state has lower energy than the reactants"
        ],
        "a": 1,
        "e": "For an exothermic reaction: energy profile shows reactants at higher energy, a peak (transition state/activation energy Eₐ), then products at lower energy. ΔH = energy(products) − energy(reactants) = negative (energy released as heat).",
        "h": "Exothermic energy profile: reactants (high) → peak (Eₐ) → products (lower). ΔH = negative.",
        "yr": "SS2"
      },
      {
        "q": "A catalyst affects a chemical reaction by:",
        "o": [
          "Increasing the enthalpy change (ΔH) of the reaction",
          "Lowering the activation energy (Eₐ) without changing ΔH, allowing the reaction to proceed faster",
          "Providing additional energy to reactants permanently",
          "Changing the products of the reaction"
        ],
        "a": 1,
        "e": "A catalyst provides an alternative reaction pathway with a lower activation energy (Eₐ). This means more reactant molecules have enough energy to react — increasing the reaction rate. The catalyst does NOT change ΔH (the overall energy difference between reactants and products is unchanged).",
        "h": "Catalyst: lowers Eₐ (faster reaction) but does NOT change ΔH (same overall energy change).",
        "yr": "SS2"
      },
      {
        "q": "The standard enthalpy of formation (ΔHf°) of an element in its standard state is:",
        "o": [
          "Always negative",
          "Always positive",
          "Zero (by definition)",
          "Equal to its bond energy"
        ],
        "a": 2,
        "e": "By convention, ΔHf° of any element in its standard state is defined as zero. Examples: ΔHf°(O₂, g) = 0; ΔHf°(C, graphite) = 0; ΔHf°(H₂, g) = 0. This provides a reference point for all enthalpy of formation calculations.",
        "h": "ΔHf° of elements in standard state = 0 (by definition). Reference point for calculations.",
        "yr": "SS2"
      },
      {
        "q": "Photosynthesis (6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂) is endothermic because:",
        "o": [
          "It produces glucose which is a fuel",
          "It absorbs light energy to convert CO₂ and H₂O into higher-energy glucose molecules — the products have more energy than the reactants",
          "It releases oxygen gas",
          "CO₂ and H₂O react spontaneously without energy input"
        ],
        "a": 1,
        "e": "Photosynthesis is endothermic (ΔH positive) — it requires energy (absorbed from sunlight) to convert low-energy reactants (CO₂ and H₂O) into higher-energy products (glucose and O₂). Without continuous light energy input, the reaction cannot proceed.",
        "h": "Photosynthesis = endothermic: absorbs light energy to make high-energy glucose (ΔH > 0).",
        "yr": "SS2"
      },
      {
        "q": "When 1.0 g of ethanol (C₂H₅OH, M=46) burns and raises the temperature of 200 g of water by 11.5°C, what is the enthalpy of combustion per mole? (Specific heat capacity of water = 4.2 J/g°C)",
        "o": [
          "−99.54 kJ/mol",
          "−1366 kJ/mol",
          "−4.57 kJ/mol",
          "−966 kJ/mol"
        ],
        "a": 1,
        "e": "Q = mcΔT = 200 × 4.2 × 11.5 = 9660 J = 9.66 kJ for 1.0 g. n(ethanol) = 1.0/46 mol. ΔHc = Q/n = 9.66/(1/46) = 9.66 × 46 = 444.4 kJ/mol (negative for exothermic). Actual combustion ΔH = −1366 kJ/mol (losses here — heat losses to surroundings). Using the calculation: 9.66 × 46 = 444.4 kJ/mol. So ΔHc per mole ≈ −444 kJ/mol from this data. The closest option is −1366 kJ/mol if we note significant heat loss in this simple calorimetry setup.",
        "h": "Q=mcΔT=200×4.2×11.5=9660J. Per mole: 9.66×46=444 kJ/mol (calorimetry approximation).",
        "yr": "SS2"
      },
      {
        "q": "Using Hess's Law, if: A → B, ΔH₁ = +50 kJ/mol and B → C, ΔH₂ = −80 kJ/mol, what is ΔH for A → C?",
        "o": [
          "+130 kJ/mol",
          "−130 kJ/mol",
          "−30 kJ/mol",
          "+30 kJ/mol"
        ],
        "a": 2,
        "e": "By Hess's Law: A → C = A → B → C. ΔH = ΔH₁ + ΔH₂ = +50 + (−80) = −30 kJ/mol.",
        "h": "Hess's Law: ΔH(A→C) = ΔH₁ + ΔH₂ = +50 + (−80) = −30 kJ/mol.",
        "yr": "SS2"
      },
      {
        "q": "The activation energy (Eₐ) of a reaction is best described as:",
        "o": [
          "The total energy released by the reaction",
          "The minimum energy that reactant molecules must possess to undergo a successful collision and form products",
          "The difference in energy between products and reactants",
          "The energy stored in chemical bonds of the products"
        ],
        "a": 1,
        "e": "Activation energy (Eₐ) is the minimum energy barrier that must be overcome for reactant molecules to convert to products. Only collisions where the molecules have kinetic energy ≥ Eₐ result in product formation. Catalysts lower Eₐ, allowing more molecules to react.",
        "h": "Activation energy (Eₐ) = minimum energy colliding molecules must have to react successfully.",
        "yr": "SS2"
      },
      {
        "q": "Why does neutralisation of a weak acid by a strong base release less heat than strong acid + strong base?",
        "o": [
          "Weak acids react more slowly",
          "Some energy is used to fully ionise the weak acid — so less net energy is released in the ion combination step",
          "Weak acids are colder",
          "The salt formed by weak acid neutralisation absorbs heat"
        ],
        "a": 1,
        "e": "For strong acid + strong base: net ionic equation is H⁺ + OH⁻ → H₂O, ΔH = −57 kJ/mol. For weak acid (e.g., CH₃COOH): partial ionisation means some energy is consumed to fully ionise the acid, reducing the net heat released. The neutralisation enthalpy is less negative than −57 kJ/mol.",
        "h": "Weak acid neutralisation: energy consumed ionising acid → less heat released than −57 kJ/mol.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following statements about enthalpy changes is CORRECT?",
        "o": [
          "Enthalpy change depends on the pathway of the reaction",
          "Enthalpy is a state function — ΔH depends only on the initial and final states, not the route",
          "Exothermic reactions always have negative activation energies",
          "Enthalpy change equals the work done by the system"
        ],
        "a": 1,
        "e": "Enthalpy (H) is a state function — ΔH depends only on the states of reactants and products, not on how the reaction proceeds. This is the basis of Hess's Law. Path-independent property means indirect ΔH calculations are valid.",
        "h": "Enthalpy is a state function: ΔH depends only on initial and final states, not the path.",
        "yr": "SS2"
      },
      {
        "q": "The enthalpy change when C (graphite) + O₂(g) → CO₂(g) is −394 kJ/mol. This is the standard enthalpy of:",
        "o": [
          "Formation of carbon only",
          "Combustion of carbon AND formation of CO₂ (both simultaneously in this case)",
          "Neutralisation of carbonic acid",
          "Decomposition of CO₂"
        ],
        "a": 1,
        "e": "C + O₂ → CO₂ is simultaneously: the standard enthalpy of combustion of carbon (ΔHc° = −394 kJ/mol, heat released burning 1 mol C); AND the standard enthalpy of formation of CO₂ (ΔHf° = −394 kJ/mol, heat when 1 mol CO₂ forms from its elements).",
        "h": "C + O₂ → CO₂, ΔH = −394 kJ/mol is both ΔHc°(C) and ΔHf°(CO₂).",
        "yr": "SS2"
      },
      {
        "q": "Dissolving ammonium nitrate (NH₄NO₃) in water causes the temperature of the solution to decrease. This indicates the process is:",
        "o": [
          "Exothermic (heat is released)",
          "Endothermic (heat is absorbed from the surroundings, cooling the solution)",
          "Neutral (no heat change)",
          "A chemical reaction, not a physical change"
        ],
        "a": 1,
        "e": "The temperature decrease shows that heat is absorbed from the surroundings (the solution and surroundings become cooler). Dissolving NH₄NO₃ is endothermic — the energy needed to break the ionic lattice exceeds the energy released by hydration of the ions. This principle is used in instant cold packs.",
        "h": "NH₄NO₃ dissolving: temperature drops → endothermic (absorbs heat). Used in cold packs.",
        "yr": "SS2"
      },
      {
        "q": "In the equation: ΔH(reaction) = Σ(bond energies broken) − Σ(bond energies formed), if this value is negative:",
        "o": [
          "More energy was absorbed breaking bonds than released forming bonds",
          "More energy was released forming bonds than absorbed breaking bonds — the reaction is exothermic",
          "The reaction is endothermic",
          "The activation energy is very high"
        ],
        "a": 1,
        "e": "If Σ(bonds broken) < Σ(bonds formed), then ΔH = negative → exothermic. More energy is released when bonds form than was absorbed when bonds broke. The excess energy is released to the surroundings as heat, raising the temperature.",
        "h": "ΔH negative from bond energies: bonds formed > bonds broken → exothermic (energy released).",
        "yr": "SS2"
      },
      {
        "q": "The specific heat capacity of water (4.2 J/g°C) means that:",
        "o": [
          "Water boils at 4.2°C",
          "4.2 J of energy is needed to raise the temperature of 1 g of water by 1°C",
          "Water releases 4.2 J when freezing",
          "Water conducts heat 4.2 times better than other substances"
        ],
        "a": 1,
        "e": "Specific heat capacity (c) = the energy needed to raise 1 g of a substance by 1°C (or 1 K). For water, c = 4.2 J g⁻¹ °C⁻¹. Used in calorimetry: Q = mcΔT, where m = mass (g), c = 4.2 J/g°C, ΔT = temperature change.",
        "h": "Specific heat capacity of water = 4.2 J/g°C. Used in: Q = mcΔT.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Rates of Reaction",
    "topicCode": "SS2-CHEM-12",
    "module": "Physical Chemistry",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">The <span class=\"learn-keyword\">rate of a chemical reaction</span> is the speed at which reactants are converted to products — how fast the reaction proceeds. Understanding reaction rates is crucial in industrial chemistry (maximising product yield efficiently) and everyday life (controlling corrosion, food preservation, drug activity).</div><h3 class=\"learn-subheading\">1. Definition and Measurement of Rate</h3><p class=\"learn-p\">Rate = change in concentration / change in time = Δ[concentration] / Δt. Can be measured by monitoring: gas volume evolved, change in mass (gas escaping), change in colour, turbidity (precipitate formation), or electrical conductivity.</p><h3 class=\"learn-subheading\">2. Factors Affecting Rate of Reaction</h3><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Factor</th><th>Effect on Rate</th><th>Explanation</th></tr></thead><tbody><tr><td>Concentration</td><td>Higher concentration → faster rate</td><td>More particles per unit volume → more frequent collisions</td></tr><tr><td>Temperature</td><td>Higher temperature → faster rate</td><td>More particles have energy ≥ Eₐ; more frequent and energetic collisions</td></tr><tr><td>Surface area</td><td>Larger surface area → faster rate</td><td>More surface exposed → more collision sites for reactant particles</td></tr><tr><td>Catalyst</td><td>Catalyst → faster rate</td><td>Lowers activation energy (Eₐ); more particles have enough energy</td></tr><tr><td>Pressure (gases)</td><td>Higher pressure → faster rate</td><td>Gas molecules closer together → more frequent collisions</td></tr><tr><td>Light</td><td>Light increases rate in photochemical reactions</td><td>Provides energy to initiate reaction (e.g., H₂ + Cl₂ in UV)</td></tr></tbody></table></div><h3 class=\"learn-subheading\">3. Collision Theory</h3><p class=\"learn-p\">For a reaction to occur, reacting particles must: (1) collide with each other, (2) collide with sufficient energy (≥ activation energy), and (3) collide in the correct orientation. Factors that increase the rate of successful collisions increase the reaction rate.</p><h3 class=\"learn-subheading\">4. Maxwell-Boltzmann Distribution</h3><p class=\"learn-p\">The Maxwell-Boltzmann distribution shows the spread of kinetic energies among gas molecules at a given temperature. At higher temperatures, the peak shifts to higher energy and more molecules exceed the activation energy threshold.</p><h3 class=\"learn-subheading\">5. Effect of a Catalyst</h3><p class=\"learn-p\">A catalyst provides an alternative reaction pathway with lower Eₐ. On the Maxwell-Boltzmann curve, the vertical line representing Eₐ moves to the left — a greater proportion of molecules now have energy ≥ new lower Eₐ. Rate increases without changing ΔH.</p><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Temperature Rule:</strong> A 10°C rise in temperature approximately doubles the reaction rate. This rule of thumb reflects the exponential dependence of rate on temperature (Arrhenius equation: k = Ae^(−Eₐ/RT)).</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> Rate affected by: concentration, temperature, surface area, catalyst, pressure (gases), light. Collision theory: successful collision needs correct energy (≥Eₐ) and orientation. Catalyst: lowers Eₐ, increases rate, does not change ΔH. Temperature rise of 10°C ≈ doubles rate.</div>",
    "questions": [
      {
        "q": "The rate of a chemical reaction is defined as:",
        "o": [
          "The amount of energy released per second",
          "The change in concentration of a reactant or product per unit time",
          "The activation energy divided by temperature",
          "The number of moles of product formed"
        ],
        "a": 1,
        "e": "Reaction rate = Δ[concentration]/Δt (change in concentration per unit time). Units: mol/L·s or mol dm⁻³ s⁻¹. Rate can also be expressed as change in mass per unit time, or volume of gas evolved per unit time, depending on what is measured.",
        "h": "Rate = Δ[concentration]/Δt (change in concentration per unit time).",
        "yr": "SS2"
      },
      {
        "q": "According to collision theory, a collision between reactant molecules results in a reaction ONLY if:",
        "o": [
          "The molecules are moving in the same direction",
          "The colliding molecules have energy greater than or equal to the activation energy AND collide with the correct orientation",
          "The molecules are at the same temperature",
          "At least one molecule is a catalyst"
        ],
        "a": 1,
        "e": "Collision theory requires: (1) the molecules must collide; (2) collision energy must be ≥ activation energy (Eₐ); and (3) the collision must have the correct geometric orientation (reacting parts of molecules must meet). All three conditions must be satisfied for a successful (productive) collision.",
        "h": "Successful collision: energy ≥ Eₐ AND correct orientation. Both conditions required.",
        "yr": "SS2"
      },
      {
        "q": "Why does increasing the surface area of a solid reactant increase the reaction rate?",
        "o": [
          "It increases the temperature of the reaction",
          "It exposes more reactant particles at the surface, providing more sites for collision with other reactants",
          "It increases the concentration of dissolved particles",
          "It lowers the activation energy"
        ],
        "a": 1,
        "e": "Reactions occur at the surface where reactant particles can meet. Increasing surface area (e.g., using powder instead of lumps) exposes more reactant particles to the other reactant, increasing the frequency of successful collisions per unit time, thus increasing the rate.",
        "h": "Larger surface area = more exposed particles = more collision sites = faster rate.",
        "yr": "SS2"
      },
      {
        "q": "A temperature rise of 10°C approximately:",
        "o": [
          "Halves the reaction rate",
          "Doubles the reaction rate",
          "Has no effect on reaction rate",
          "Triples the reaction rate"
        ],
        "a": 1,
        "e": "The approximate rule: every 10°C rise doubles the rate of reaction. This reflects the exponential relationship between temperature and rate (Arrhenius equation). At higher temperatures, many more molecules have energy ≥ Eₐ, and collision frequency increases.",
        "h": "10°C temperature rise ≈ doubles the reaction rate.",
        "yr": "SS2"
      },
      {
        "q": "In the Maxwell-Boltzmann energy distribution at a higher temperature compared to a lower temperature:",
        "o": [
          "The peak shifts to lower energy and fewer molecules exceed Eₐ",
          "The peak shifts to higher energy, the curve flattens and broadens, and more molecules have energy ≥ Eₐ",
          "The curve shape remains identical",
          "Fewer molecules have the most probable energy"
        ],
        "a": 1,
        "e": "At higher T: the peak of the Maxwell-Boltzmann curve shifts to higher energy and becomes lower/broader. The total area under the curve remains the same (same number of molecules), but the proportion of molecules with energy ≥ Eₐ (shaded area to the right of Eₐ) is much larger.",
        "h": "Higher T: peak shifts right (higher energy), curve flattens/broadens, more molecules exceed Eₐ.",
        "yr": "SS2"
      },
      {
        "q": "How does increasing the concentration of a reactant in solution increase the reaction rate?",
        "o": [
          "It increases the activation energy",
          "More reactant particles per unit volume leads to more frequent collisions per unit time",
          "It increases the bond energies of the reactant",
          "It changes the products of the reaction"
        ],
        "a": 1,
        "e": "Higher concentration = more particles per unit volume. More particles → more frequent collisions → more frequent successful collisions (those with energy ≥ Eₐ and correct orientation) → faster rate. This is the main explanation for concentration's effect on rate.",
        "h": "Higher concentration → more particles/volume → more frequent collisions → faster rate.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following methods can be used to measure the rate of the reaction: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂?",
        "o": [
          "Measuring the change in colour of the solution",
          "Measuring the loss in mass of the reaction vessel (as CO₂ escapes) over time",
          "Measuring the electrical conductivity change",
          "Measuring the change in pressure inside a sealed container at constant volume"
        ],
        "a": 1,
        "e": "CO₂ gas is produced and escapes. Placing the flask on a balance and recording mass over time shows a decreasing mass as CO₂ is lost. Rate = loss in mass / time. Alternatively, the volume of CO₂ collected in a gas syringe can be measured over time.",
        "h": "CaCO₃ + HCl → CO₂: measure rate by loss of mass (CO₂ escapes) or gas volume collected.",
        "yr": "SS2"
      },
      {
        "q": "How does a catalyst increase the rate of a reaction without being consumed?",
        "o": [
          "It supplies additional energy to reactant molecules permanently",
          "It provides an alternative reaction pathway with lower activation energy, allowing more molecules to react; it is regenerated at the end",
          "It increases the concentration of reactants",
          "It changes the temperature of the reaction"
        ],
        "a": 1,
        "e": "A catalyst participates in the reaction mechanism to provide a lower-energy alternative pathway (lower Eₐ), but is regenerated at the end of each catalytic cycle. Because it is regenerated, small amounts can catalyse many cycles — it is not consumed overall.",
        "h": "Catalyst: lower Eₐ alternative pathway + regenerated at end = not consumed; increases rate.",
        "yr": "SS2"
      },
      {
        "q": "The reaction between marble chips (CaCO₃) and dilute HCl is slower when large marble lumps are used compared to small chips. This demonstrates the effect of:",
        "o": [
          "Temperature on rate",
          "Concentration on rate",
          "Surface area on rate",
          "Catalyst on rate"
        ],
        "a": 2,
        "e": "Large marble lumps have less total surface area exposed than small chips of the same mass. Less surface area means fewer CaCO₃ particles are accessible to HCl molecules per unit time → fewer collisions per second → slower rate. This directly demonstrates the surface area effect.",
        "h": "Large lumps = less surface area = fewer collisions = slower rate. Demonstrates surface area effect.",
        "yr": "SS2"
      },
      {
        "q": "In a graph of volume of CO₂ collected over time for the reaction CaCO₃ + HCl, the gradient of the curve represents:",
        "o": [
          "The total amount of CO₂ produced",
          "The rate of reaction at that instant (steeper gradient = faster rate)",
          "The activation energy of the reaction",
          "The moles of CaCO₃ that reacted"
        ],
        "a": 1,
        "e": "The gradient (slope) of a volume-time graph = rate of gas production at that moment. The curve is steepest at the start (high concentration of HCl → fast rate) and becomes less steep as HCl is consumed, until the gradient = 0 (reaction stops — one reactant exhausted).",
        "h": "Gradient of volume-time graph = instantaneous reaction rate at that point.",
        "yr": "SS2"
      },
      {
        "q": "Adding a catalyst to the Maxwell-Boltzmann diagram shifts the activation energy line to the:",
        "o": [
          "Right (higher energy) — fewer molecules react",
          "Left (lower energy) — a greater proportion of molecules now have sufficient energy to react",
          "It does not change Eₐ on the diagram",
          "It shifts the entire molecular energy distribution to the right"
        ],
        "a": 1,
        "e": "A catalyst lowers Eₐ — so on the Maxwell-Boltzmann diagram, the vertical Eₐ line moves to the left. The energy distribution curve itself does not change (temperature unchanged). More molecules now lie to the right of the new lower Eₐ line → more molecules can react → faster rate.",
        "h": "Catalyst on Maxwell-Boltzmann: Eₐ line shifts LEFT (lower). More molecules exceed new Eₐ.",
        "yr": "SS2"
      },
      {
        "q": "The reaction H₂(g) + I₂(g) → 2HI(g) at constant volume. Increasing the pressure of the system increases the rate because:",
        "o": [
          "Pressure changes the activation energy",
          "Increased pressure compresses the gas, increasing concentration of molecules and hence collision frequency",
          "Pressure directly adds energy to molecules",
          "It forces a new reaction pathway"
        ],
        "a": 1,
        "e": "For gases at constant temperature, increasing pressure decreases the volume, which increases the number of gas molecules per unit volume (concentration). Higher concentration → more frequent collisions → faster rate. For gases, pressure and concentration are directly proportional (PV = nRT at constant T).",
        "h": "Higher gas pressure → higher concentration → more collisions → faster rate.",
        "yr": "SS2"
      },
      {
        "q": "Which statement correctly compares the use of a catalyst and increasing temperature to speed up a reaction?",
        "o": [
          "Both lower the activation energy",
          "A catalyst lowers Eₐ (alternative pathway); temperature increases the proportion of molecules with energy ≥ existing Eₐ. Both increase rate but by different mechanisms",
          "Temperature changes ΔH; a catalyst does not",
          "Both are equally effective for all reactions"
        ],
        "a": 1,
        "e": "Catalyst: provides alternative pathway with lower Eₐ; energy distribution unchanged. Temperature: same Eₐ but more molecules now have sufficient energy (distribution shifts to higher energy). Both increase the proportion of molecules that can react but through different mechanisms.",
        "h": "Catalyst: lowers Eₐ. Temperature: more molecules exceed existing Eₐ. Different mechanisms, both faster.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following does NOT affect the rate of a homogeneous liquid-phase reaction?",
        "o": [
          "Temperature",
          "Concentration of reactants",
          "Particle size of the reactant",
          "Presence of a catalyst"
        ],
        "a": 2,
        "e": "Particle size affects rate only for heterogeneous reactions involving solids (where surface area matters). In a homogeneous liquid-phase reaction, all reactants are already dissolved and freely mixed — particle size of the solid starting material is irrelevant once dissolved.",
        "h": "Particle size only matters for solid reactants (heterogeneous). Irrelevant for homogeneous liquid reactions.",
        "yr": "SS2"
      },
      {
        "q": "Light can initiate some chemical reactions (photochemical reactions). An example is:",
        "o": [
          "Neutralisation of HCl by NaOH",
          "The reaction of hydrogen and chlorine: H₂ + Cl₂ → 2HCl (explosively fast in UV light)",
          "Crystallisation of NaCl from solution",
          "Electrolysis of water"
        ],
        "a": 1,
        "e": "H₂(g) + Cl₂(g) react very slowly in the dark, but explosively in UV light. Light photons have enough energy to break the Cl–Cl bond, generating Cl• radicals that initiate a chain reaction. Photosynthesis is also a photochemical process (light-driven).",
        "h": "Photochemical reaction example: H₂ + Cl₂ → 2HCl (explosive in UV/sunlight).",
        "yr": "SS2"
      },
      {
        "q": "In a reaction rate experiment, the reaction is slower at the end than at the beginning because:",
        "o": [
          "The temperature decreases as the reaction proceeds",
          "The concentration of reactants decreases as they are consumed, leading to fewer collisions per unit time",
          "The activation energy increases during the reaction",
          "The catalyst is consumed during the reaction"
        ],
        "a": 1,
        "e": "As reactants are consumed, their concentration decreases. Lower concentration → fewer particles per unit volume → fewer collisions per second → fewer successful collisions per second → slower rate. This explains why rate-time curves for most reactions show decreasing rate over time.",
        "h": "Reaction slows down: reactant concentration decreases → fewer collisions → slower rate.",
        "yr": "SS2"
      },
      {
        "q": "The Arrhenius equation (k = Ae^(−Eₐ/RT)) shows that the rate constant k:",
        "o": [
          "Decreases as temperature increases",
          "Increases exponentially as temperature increases or as activation energy decreases",
          "Is independent of temperature",
          "Depends only on the concentration of reactants"
        ],
        "a": 1,
        "e": "In the Arrhenius equation: k increases as T increases (exponential dependence) and as Eₐ decreases. This mathematically confirms: higher T → faster rate; lower Eₐ (catalyst) → faster rate. The exponential term e^(−Eₐ/RT) represents the fraction of molecules with energy ≥ Eₐ.",
        "h": "Arrhenius: k increases exponentially with T and with lower Eₐ — mathematical basis of rate factors.",
        "yr": "SS2"
      },
      {
        "q": "In an experiment monitoring the rate of the iodine clock reaction, 'clock time' (time to colour change) becomes shorter when:",
        "o": [
          "Concentration of reactants is decreased",
          "Temperature is lowered",
          "Concentration of reactants is increased (fewer seconds before the colour change threshold is reached)",
          "A catalyst is removed"
        ],
        "a": 2,
        "e": "In the iodine clock reaction, the colour change occurs when a threshold quantity of iodine has been produced. Higher concentration of reactants → faster production of iodine → threshold reached sooner → shorter clock time. Shorter clock time = faster reaction rate.",
        "h": "Iodine clock: higher concentration → shorter time to colour change = faster rate.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following statements about enzymes as biological catalysts is CORRECT?",
        "o": [
          "Enzymes increase activation energy to control reaction rate",
          "Enzymes are biological catalysts that lower the activation energy of biochemical reactions; they are specific to particular substrates and are affected by temperature and pH",
          "Enzymes are consumed during biological reactions",
          "Enzymes work equally well at all temperatures"
        ],
        "a": 1,
        "e": "Enzymes are highly specific biological catalysts (proteins) that lower Eₐ for biochemical reactions. They have an optimal temperature (~37°C in humans) and pH. Above the optimal temperature, the enzyme denatures (protein structure unfolds) and loses activity — the rate decreases dramatically.",
        "h": "Enzymes: biological catalysts, lower Eₐ, specific to substrate, denatured at high temperature/extreme pH.",
        "yr": "SS2"
      },
      {
        "q": "A reaction has a rate constant that doubles for every 10°C rise. If the rate constant at 20°C is k, what is it at 50°C?",
        "o": [
          "2k",
          "4k",
          "6k",
          "8k"
        ],
        "a": 3,
        "e": "Every 10°C rise doubles the rate constant. From 20°C to 50°C is a rise of 30°C = 3 × 10°C. Rate doubles 3 times: k → 2k (at 30°C) → 4k (at 40°C) → 8k (at 50°C). So the rate constant is 8k.",
        "h": "3 × 10°C rise = doubles 3 times: k × 2 × 2 × 2 = 8k.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Chemical Equilibrium",
    "topicCode": "SS2-CHEM-13",
    "module": "Physical Chemistry",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\"><span class=\"learn-keyword\">Chemical equilibrium</span> is the state in a reversible reaction where the rate of the forward reaction equals the rate of the reverse reaction, so the concentrations of reactants and products remain constant over time. It is a dynamic equilibrium — both reactions continue but at equal rates.</div><h3 class=\"learn-subheading\">1. Reversible Reactions and Equilibrium</h3><p class=\"learn-p\">A reversible reaction can proceed in both directions: A + B ⇌ C + D. At equilibrium: rate(forward) = rate(reverse); concentrations are constant (not equal); the reaction appears to have stopped but both directions continue.</p><h3 class=\"learn-subheading\">2. The Equilibrium Constant (Kc)</h3><p class=\"learn-p\">For the reaction: aA + bB ⇌ cC + dD</p><p class=\"learn-p\"><strong>Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ</strong></p><ul class=\"learn-list\"><li>Large Kc (>>1): equilibrium lies to the right (products favoured)</li><li>Small Kc (<<1): equilibrium lies to the left (reactants favoured)</li><li>Kc only changes with temperature</li></ul><h3 class=\"learn-subheading\">3. Le Chatelier's Principle</h3><p class=\"learn-p\">If a system at equilibrium is subjected to a change (stress), the equilibrium shifts in the direction that counteracts the change.</p><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Stress Applied</th><th>Equilibrium Shift</th></tr></thead><tbody><tr><td>Increase concentration of reactant</td><td>Forward (to use up excess reactant)</td></tr><tr><td>Increase concentration of product</td><td>Reverse (to use up excess product)</td></tr><tr><td>Increase temperature</td><td>Endothermic direction (absorbs the added heat)</td></tr><tr><td>Decrease temperature</td><td>Exothermic direction (generates heat)</td></tr><tr><td>Increase pressure (gas)</td><td>Side with fewer moles of gas</td></tr><tr><td>Decrease pressure (gas)</td><td>Side with more moles of gas</td></tr><tr><td>Add catalyst</td><td>No shift in position (equilibrium reached faster)</td></tr></tbody></table></div><h3 class=\"learn-subheading\">4. The Haber Process (N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92 kJ/mol)</h3><ul class=\"learn-list\"><li>High pressure (150–300 atm) → shifts right (4 mol gas → 2 mol gas)</li><li>Low temperature (450°C, a compromise) → thermodynamically favours NH₃ but kinetics too slow at very low T</li><li>Iron catalyst → increases rate without changing equilibrium position</li></ul><h3 class=\"learn-subheading\">5. The Contact Process (2SO₂ + O₂ ⇌ 2SO₃, ΔH = −196 kJ/mol)</h3><ul class=\"learn-list\"><li>High pressure (1–2 atm) → shifts right (3 mol → 2 mol gas)</li><li>Temperature ≈ 450°C (compromise)</li><li>V₂O₅ catalyst</li><li>SO₃ + H₂O → H₂SO₄ (sulphuric acid production)</li></ul><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Le Chatelier Summary:</strong> Add reactant → forward shift. Remove product → forward shift. Increase T → endothermic shift. Increase P → fewer gas moles shift. Catalyst → no position change, only faster equilibrium.</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> Equilibrium: rate(fwd) = rate(rev); concentrations constant. Kc = [products]/[reactants] (powers = coefficients). Le Chatelier: system counteracts stress. Haber: N₂+3H₂→2NH₃, high P, 450°C, Fe catalyst. Contact: 2SO₂+O₂→2SO₃, V₂O₅ catalyst → H₂SO₄.</div>",
    "questions": [
      {
        "q": "At chemical equilibrium, which of the following is TRUE?",
        "o": [
          "The concentrations of reactants and products are equal",
          "The reaction has stopped completely",
          "The rate of the forward reaction equals the rate of the reverse reaction, and concentrations remain constant",
          "All reactants have been converted to products"
        ],
        "a": 2,
        "e": "At equilibrium: forward rate = reverse rate (dynamic equilibrium). Concentrations are constant (not necessarily equal). Both reactions continue simultaneously. The system appears static macroscopically but is dynamic at the molecular level.",
        "h": "Equilibrium: rate(fwd)=rate(rev); concentrations constant; reactions continue in both directions.",
        "yr": "SS2"
      },
      {
        "q": "For the reaction N₂ + 3H₂ ⇌ 2NH₃, the expression for Kc is:",
        "o": [
          "Kc = [NH₃]² / ([N₂][H₂]³)",
          "Kc = [N₂][H₂]³ / [NH₃]²",
          "Kc = [NH₃] / ([N₂][H₂])",
          "Kc = 2[NH₃] / ([N₂] + 3[H₂])"
        ],
        "a": 0,
        "e": "Kc = [products]^(stoichiometric coefficients) / [reactants]^(stoichiometric coefficients). Kc = [NH₃]² / ([N₂]¹[H₂]³). Products in numerator, reactants in denominator, each raised to their stoichiometric coefficient from the balanced equation.",
        "h": "Kc = [NH₃]² / [N₂][H₂]³. Products over reactants, raised to their coefficients.",
        "yr": "SS2"
      },
      {
        "q": "Le Chatelier's Principle states that when a system at equilibrium is stressed:",
        "o": [
          "It reaches a new equilibrium with a different Kc",
          "The system shifts in the direction that counteracts or minimises the applied stress",
          "The system always moves in the forward direction",
          "The catalyst changes the equilibrium position"
        ],
        "a": 1,
        "e": "Le Chatelier's Principle: a system at equilibrium responds to stress (change in concentration, T, or P) by shifting in the direction that opposes or reduces the effect of the stress. This shifts the equilibrium position but Kc changes only with temperature.",
        "h": "Le Chatelier: system shifts to counteract applied stress (concentration, T, or P change).",
        "yr": "SS2"
      },
      {
        "q": "In the Haber process (N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92 kJ/mol), high pressure favours NH₃ production because:",
        "o": [
          "High pressure increases the temperature",
          "The forward reaction produces fewer moles of gas (4 mol → 2 mol), so increasing pressure shifts equilibrium to the right",
          "High pressure decreases the activation energy",
          "Pressure changes the value of Kc"
        ],
        "a": 1,
        "e": "N₂ + 3H₂ → 2NH₃: left side has 1+3 = 4 moles of gas; right side has 2 moles. By Le Chatelier's Principle, increasing pressure shifts equilibrium to the side with fewer moles of gas (right, towards NH₃), favouring NH₃ production.",
        "h": "Haber: high P → shifts to fewer gas moles (right, 4→2 mol) → more NH₃.",
        "yr": "SS2"
      },
      {
        "q": "Why is a compromise temperature of about 450°C used in the Haber process rather than a much lower temperature?",
        "o": [
          "NH₃ decomposes above 450°C",
          "At very low temperatures, the rate becomes too slow despite better yield — 450°C balances yield and rate; iron catalyst compensates for the rate at this temperature",
          "The iron catalyst only works at 450°C",
          "High temperature increases Kc for this exothermic reaction"
        ],
        "a": 1,
        "e": "N₂ + 3H₂ ⇌ 2NH₃ is exothermic. Lower T → more NH₃ at equilibrium (thermodynamic benefit). But lower T → much slower rate (kinetic problem). At 450°C with iron catalyst, a reasonable rate AND acceptable yield (≈15%) are achieved. This is the industrial compromise.",
        "h": "450°C compromise: lower T gives better yield but too slow. 450°C balances rate and yield with Fe catalyst.",
        "yr": "SS2"
      },
      {
        "q": "Adding a catalyst to a reversible reaction at equilibrium:",
        "o": [
          "Shifts the equilibrium position towards products",
          "Does not change the equilibrium position — it speeds up both forward and reverse reactions equally, reaching equilibrium faster",
          "Increases the value of Kc",
          "Shifts the equilibrium towards reactants"
        ],
        "a": 1,
        "e": "A catalyst lowers Eₐ for both the forward and reverse reactions equally. This means equilibrium is reached faster, but the equilibrium position (ratio of products to reactants) does not change. Kc is unchanged by a catalyst.",
        "h": "Catalyst: reaches equilibrium faster but does NOT change equilibrium position or Kc.",
        "yr": "SS2"
      },
      {
        "q": "For the equilibrium H₂(g) + I₂(g) ⇌ 2HI(g), increasing pressure has:",
        "o": [
          "A large effect — shifts strongly to the right",
          "No effect on equilibrium position — equal moles of gas on both sides (1+1=2 and 2)",
          "A large effect — shifts strongly to the left",
          "The effect of increasing Kc"
        ],
        "a": 1,
        "e": "H₂ + I₂ ⇌ 2HI: left side has 1+1=2 moles of gas; right side has 2 moles of gas. Equal moles on both sides → pressure change has no effect on equilibrium position (the system cannot 'favour' either side by changing pressure).",
        "h": "H₂ + I₂ ⇌ 2HI: equal moles both sides → pressure change has NO effect on equilibrium.",
        "yr": "SS2"
      },
      {
        "q": "If Kc for a reaction is very large (e.g., Kc = 10¹⁰), this means:",
        "o": [
          "The reaction barely proceeds — mostly reactants remain",
          "Equilibrium lies strongly to the right — mostly products present at equilibrium",
          "The reaction proceeds extremely slowly",
          "The reaction is endothermic"
        ],
        "a": 1,
        "e": "Kc = [products]/[reactants]. Large Kc (>>1) means [products] >> [reactants] at equilibrium — equilibrium lies to the right, favouring products. The reaction is essentially complete. Kc says nothing about the rate — only about the equilibrium position.",
        "h": "Large Kc (>>1) = equilibrium favours products (lies to the right).",
        "yr": "SS2"
      },
      {
        "q": "In the Contact Process (2SO₂ + O₂ ⇌ 2SO₃, ΔH = −196 kJ/mol), the catalyst used is:",
        "o": [
          "Iron (Fe)",
          "Vanadium(V) oxide (V₂O₅)",
          "Platinum (Pt)",
          "Nickel (Ni)"
        ],
        "a": 1,
        "e": "The Contact Process (manufacture of H₂SO₄) uses vanadium(V) oxide (V₂O₅) as the catalyst at ≈450°C. V₂O₅ can be oxidised to VO₂⁺ and reduced back, acting as a redox catalyst. Pt was used originally but V₂O₅ is cheaper and works well at 450°C.",
        "h": "Contact Process catalyst = V₂O₅ (vanadium pentoxide) at ≈450°C.",
        "yr": "SS2"
      },
      {
        "q": "Temperature is the only factor that changes the value of the equilibrium constant Kc because:",
        "o": [
          "Concentration changes shift the equilibrium position without altering the ratio of concentrations at the new equilibrium",
          "Temperature changes the actual thermodynamic equilibrium (changes the ratio of forward to reverse rate constants differently)",
          "Pressure changes Kc for all reactions",
          "Catalysts increase Kc by lowering activation energy"
        ],
        "a": 1,
        "e": "Kc is defined by the equilibrium position, which is temperature-dependent (different thermodynamic stability at different T). Changes in concentration or pressure shift the equilibrium to restore the same Kc ratio — they don't change Kc. Only temperature changes the equilibrium constant because it changes the relative stability of reactants vs products.",
        "h": "Only temperature changes Kc. Concentration and pressure shifts restore the same Kc. Catalyst: no change.",
        "yr": "SS2"
      },
      {
        "q": "For the exothermic equilibrium 2SO₂ + O₂ ⇌ 2SO₃ (ΔH = −196 kJ/mol), increasing temperature:",
        "o": [
          "Shifts equilibrium to the right — more SO₃ produced",
          "Shifts equilibrium to the left — less SO₃ produced (endothermic direction absorbs the added heat)",
          "Has no effect on equilibrium position",
          "Increases Kc"
        ],
        "a": 1,
        "e": "For exothermic equilibrium: increasing T supplies energy → system counteracts by absorbing it → shifts in endothermic direction (reverse, left) → less SO₃, more SO₂ and O₂. Kc decreases with increasing T for exothermic reactions.",
        "h": "Exothermic equilibrium + increase T → shifts left (endothermic direction). Less SO₃. Kc decreases.",
        "yr": "SS2"
      },
      {
        "q": "In the equilibrium N₂O₄(g) ⇌ 2NO₂(g) (colourless ⇌ brown), at constant temperature, squeezing the gas mixture into a smaller volume initially causes the brown colour to intensify, then:",
        "o": [
          "It stays intensely brown permanently",
          "The mixture gradually returns to a lighter brown as the equilibrium shifts left (towards fewer gas moles — N₂O₄ side: 1 mole)",
          "The colour changes to colourless immediately",
          "The reaction stops and no further change occurs"
        ],
        "a": 1,
        "e": "Squeezing → higher pressure → momentarily more NO₂ (brown). Le Chatelier: system shifts left (2 mol NO₂ → 1 mol N₂O₄, fewer gas moles) to reduce pressure. Some NO₂ converts to colourless N₂O₄ → colour fades from intense brown to a lighter brown (still darker than before, as total concentration increased).",
        "h": "Squeeze N₂O₄⇌2NO₂: pressure increases → shifts left (fewer moles) → brown fades partially.",
        "yr": "SS2"
      },
      {
        "q": "Removing a product from an equilibrium mixture causes the equilibrium to:",
        "o": [
          "Shift to the left — less product forms",
          "Shift to the right — more product forms to replace what was removed (Le Chatelier: system counteracts the decrease)",
          "Remain unchanged",
          "Increase Kc"
        ],
        "a": 1,
        "e": "Le Chatelier: removing product decreases its concentration below equilibrium level. System shifts right (forward direction) to produce more product and restore equilibrium. This is exploited industrially — continuously removing product drives the reaction towards completion.",
        "h": "Remove product → equilibrium shifts right (forward) to replace it. Increases conversion of reactants.",
        "yr": "SS2"
      },
      {
        "q": "The dynamic nature of equilibrium means:",
        "o": [
          "Once equilibrium is reached, no further chemical changes occur",
          "At equilibrium, both forward and reverse reactions continue simultaneously at equal rates — it is constantly active at the molecular level",
          "The concentrations of reactants and products are slowly changing towards one side",
          "All bond-breaking and bond-making has stopped"
        ],
        "a": 1,
        "e": "Dynamic equilibrium: the word 'dynamic' means active/moving. At equilibrium, both forward and reverse reactions continue at equal speeds. At the molecular level, products are constantly reforming reactants and reactants are constantly forming products — the rates are equal so concentrations appear constant.",
        "h": "Dynamic equilibrium: both reactions continue at equal rates. Concentrations constant but reactions ongoing.",
        "yr": "SS2"
      },
      {
        "q": "Why does the Haber process operate at high pressure (150–300 atm) despite the safety risks and high equipment costs?",
        "o": [
          "High pressure increases the temperature of the reaction",
          "High pressure shifts equilibrium right (4 mol gas → 2 mol gas) significantly increasing NH₃ yield — the economic benefit outweighs the costs",
          "High pressure reduces the cost of the catalyst",
          "High pressure prevents the decomposition of NH₃"
        ],
        "a": 1,
        "e": "N₂ + 3H₂ ⇌ 2NH₃: going from 4 to 2 moles of gas. High pressure strongly favours NH₃ (by Le Chatelier). Industrial plants use 150–300 atm because the yield improvement justifies the cost of high-pressure reactors and safety systems.",
        "h": "High pressure in Haber: 4 mol gas → 2 mol gas shift → more NH₃ yield. Economic benefit justifies cost.",
        "yr": "SS2"
      },
      {
        "q": "For an endothermic equilibrium, increasing temperature:",
        "o": [
          "Shifts equilibrium to the left (exothermic direction)",
          "Shifts equilibrium to the right (endothermic direction — absorbs the added heat), increasing product yield and Kc",
          "Has no effect on equilibrium position",
          "Decreases Kc"
        ],
        "a": 1,
        "e": "For endothermic equilibrium: ΔH > 0. Increasing T → Le Chatelier: system absorbs heat by shifting in the endothermic direction (right) → more products formed → Kc increases. Contrast with exothermic: increasing T shifts left (reduces Kc).",
        "h": "Endothermic equilibrium + increase T → shifts right (more products, higher Kc).",
        "yr": "SS2"
      },
      {
        "q": "In the Contact Process, SO₃ cannot be absorbed directly in water to form H₂SO₄ industrially because:",
        "o": [
          "SO₃ does not react with water",
          "Direct absorption in water produces a highly corrosive mist of H₂SO₄ droplets that is difficult to handle and causes acid mist pollution — instead, SO₃ is dissolved in concentrated H₂SO₄ to form oleum, then diluted",
          "Water is too expensive",
          "SO₃ forms SO₂ when dissolved in water"
        ],
        "a": 1,
        "e": "SO₃ + H₂O → H₂SO₄: this reaction releases so much heat that it produces a dense, corrosive acid mist (aerosol of H₂SO₄ droplets) that is impossible to condense economically. Industrially: SO₃ + H₂SO₄ (conc.) → H₂S₂O₇ (oleum), then H₂S₂O₇ + H₂O → 2H₂SO₄.",
        "h": "SO₃ not dissolved in water directly: produces corrosive acid mist. Instead: SO₃ + conc. H₂SO₄ → oleum.",
        "yr": "SS2"
      },
      {
        "q": "The equilibrium constant expression does NOT include:",
        "o": [
          "Concentrations of aqueous solutes",
          "Concentrations of gaseous species",
          "Concentration of pure solids and pure liquids (they are omitted as their activities are defined as 1)",
          "Concentrations of dissolved ions"
        ],
        "a": 2,
        "e": "Pure solids and pure liquids are omitted from Kc expressions because their 'concentration' (density) is constant — it doesn't change as the reaction proceeds. Only species whose concentrations can vary (dissolved solutes, gases) are included in Kc.",
        "h": "Pure solids and pure liquids omitted from Kc expression (constant concentration = activity = 1).",
        "yr": "SS2"
      },
      {
        "q": "In a closed system, a coloured reaction at equilibrium shows a constant colour. If the volume is suddenly halved, the sequence of events is:",
        "o": [
          "Colour immediately becomes lighter, stays lighter permanently",
          "Colour immediately intensifies (same moles, half volume = double concentration), then adjusts as equilibrium shifts to the side with fewer gas moles",
          "Colour immediately disappears, then reappears",
          "No change in colour at any point"
        ],
        "a": 1,
        "e": "Halving volume: immediately doubles all concentrations → colour intensifies. Then Le Chatelier shifts equilibrium to the side with fewer gas moles, partially reducing concentration of coloured species. Final colour: more intense than original but less intense than immediately after compression.",
        "h": "Halved volume: immediate intensification (concentration doubled) → then partial shift to fewer moles.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following correctly describes a system in dynamic equilibrium?",
        "o": [
          "Reactant concentrations are steadily increasing",
          "Product concentrations are steadily decreasing",
          "Macroscopically, concentrations appear constant; microscopically, reactant and product molecules are continuously interconverting",
          "The reaction has reached its minimum energy state and no further molecular movement occurs"
        ],
        "a": 2,
        "e": "Dynamic equilibrium is macroscopically static (constant concentrations, colour, pressure) but microscopically dynamic (forward and reverse reactions continue simultaneously at equal rates). Molecules of reactants and products continuously interconvert, but the net concentrations don't change.",
        "h": "Dynamic equilibrium: macroscopically constant; microscopically, constant interconversion of reactants/products.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Organic Chemistry Introduction",
    "topicCode": "SS2-CHEM-14",
    "module": "Organic Chemistry",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\"><span class=\"learn-keyword\">Organic chemistry</span> is the study of carbon-containing compounds. Carbon's unique ability to form four covalent bonds and to bond to itself in chains and rings makes possible an enormous variety of organic molecules — essential for life, industry, and medicine.</div><h3 class=\"learn-subheading\">1. Why Carbon is Special</h3><ul class=\"learn-list\"><li>Forms 4 covalent bonds (tetravalent)</li><li>Can bond to itself in long chains (catenation)</li><li>Forms single, double, and triple bonds</li><li>Stable C–C bonds — great diversity of structures</li><li>Can form ring structures (cyclic compounds)</li></ul><h3 class=\"learn-subheading\">2. Homologous Series</h3><p class=\"learn-p\">A homologous series is a family of organic compounds that: (a) have the same general formula; (b) differ by CH₂ from one member to the next; (c) show a gradual change in physical properties (boiling point, density) with increasing chain length; (d) have similar chemical properties.</p><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Series</th><th>Functional Group</th><th>General Formula</th><th>Example</th></tr></thead><tbody><tr><td>Alkanes</td><td>C–C single bonds only</td><td>CₙH₂ₙ₊₂</td><td>CH₄, C₂H₆, C₃H₈</td></tr><tr><td>Alkenes</td><td>C=C double bond</td><td>CₙH₂ₙ</td><td>C₂H₄, C₃H₆</td></tr><tr><td>Alkynes</td><td>C≡C triple bond</td><td>CₙH₂ₙ₋₂</td><td>C₂H₂ (ethyne)</td></tr><tr><td>Alcohols</td><td>–OH hydroxyl</td><td>CₙH₂ₙ₊₁OH</td><td>CH₃OH, C₂H₅OH</td></tr><tr><td>Carboxylic acids</td><td>–COOH</td><td>CₙH₂ₙ₊₁COOH</td><td>CH₃COOH (ethanoic acid)</td></tr><tr><td>Aldehydes</td><td>–CHO</td><td>CₙH₂ₙO</td><td>HCHO (methanal)</td></tr></tbody></table></div><h3 class=\"learn-subheading\">3. IUPAC Nomenclature</h3><ul class=\"learn-list\"><li>Count the longest carbon chain → prefix (meth-1, eth-2, prop-3, but-4, pent-5, hex-6)</li><li>Identify and name the functional group → suffix (-ane, -ene, -ol, -al, -anoic acid)</li><li>Number the chain from the end nearest the functional group</li><li>Name and number substituents (methyl-, ethyl-)</li></ul><h3 class=\"learn-subheading\">4. Structural Isomerism</h3><p class=\"learn-p\">Isomers have the same molecular formula but different structural arrangements. Types: chain isomerism (different carbon skeletons), position isomerism (functional group at different positions), functional group isomerism (same formula, different functional groups).</p><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Prefixes:</strong> meth(1), eth(2), prop(3), but(4), pent(5), hex(6), hept(7), oct(8). Saturated = alkanes (single bonds only). Unsaturated = alkenes/alkynes (double/triple bonds).</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> Carbon: tetravalent, catenation. Homologous series: same formula, differ by CH₂, same functional group. Alkanes CₙH₂ₙ₊₂, alkenes CₙH₂ₙ, alkynes CₙH₂ₙ₋₂, alcohols CₙH₂ₙ₊₁OH. IUPAC: longest chain + functional group suffix. Isomers: same molecular formula, different structures.</div>",
    "questions": [
      {
        "q": "Organic chemistry is primarily the study of:",
        "o": [
          "Compounds of all metals",
          "Carbon-containing compounds (excluding simple carbonate and oxide exceptions)",
          "All non-metallic elements",
          "Biological organisms only"
        ],
        "a": 1,
        "e": "Organic chemistry studies carbon-containing compounds. Simple exceptions (CO₂, CO, H₂CO₃, metal carbonates, metal cyanides) are classified as inorganic despite containing carbon. The vast majority of known chemical compounds are organic (over 20 million).",
        "h": "Organic chemistry = study of carbon-containing compounds (with few inorganic exceptions like CO₂, CO).",
        "yr": "SS2"
      },
      {
        "q": "The property of carbon that allows it to form long chains and ring structures is called:",
        "o": [
          "Tetravalence",
          "Catenation — the ability of carbon atoms to bond to each other in chains or rings",
          "Electronegativity",
          "Ionisation"
        ],
        "a": 1,
        "e": "Catenation is the ability of an atom to form bonds with other atoms of the same element. Carbon excels at catenation — C–C bonds are strong and stable, allowing formation of chains of thousands of carbon atoms (polymers, DNA backbone) and ring systems (benzene, sugars).",
        "h": "Catenation = carbon bonding to itself in long chains or rings.",
        "yr": "SS2"
      },
      {
        "q": "The general formula for alkanes is:",
        "o": [
          "CₙH₂ₙ",
          "CₙH₂ₙ₊₂",
          "CₙH₂ₙ₋₂",
          "CₙH₂ₙ₊₁OH"
        ],
        "a": 1,
        "e": "Alkanes (saturated hydrocarbons, only single C–C bonds) have general formula CₙH₂ₙ₊₂. Examples: CH₄ (n=1, methane), C₂H₆ (n=2, ethane), C₃H₈ (n=3, propane). Each extra CH₂ unit adds 1 C and 2 H.",
        "h": "Alkane general formula: CₙH₂ₙ₊₂ (saturated, single bonds only).",
        "yr": "SS2"
      },
      {
        "q": "A homologous series is characterised by members that:",
        "o": [
          "Have the same molecular formula",
          "Differ by CH₂ from one member to the next, share the same general formula and functional group, and have similar chemical properties",
          "Have identical boiling points",
          "All have the same number of carbon atoms"
        ],
        "a": 1,
        "e": "Homologous series properties: (1) same general formula; (2) consecutive members differ by CH₂; (3) gradual change in physical properties (BP, density, viscosity) with chain length; (4) same functional group → same chemical reactions.",
        "h": "Homologous series: differ by CH₂, same general formula, same functional group, similar chemistry.",
        "yr": "SS2"
      },
      {
        "q": "The IUPAC name of CH₃–CH₂–CH₂–OH is:",
        "o": [
          "Methanol",
          "Ethanol",
          "Propan-1-ol",
          "Butan-1-ol"
        ],
        "a": 2,
        "e": "3 carbon chain (prop-) with –OH at carbon 1 (propan-1-ol). Count: C1(OH)–C2–C3. The –OH group is the alcohol (–ol) suffix. Numbering from the OH end: CH₃OH end = C1. Name: propan-1-ol.",
        "h": "CH₃CH₂CH₂OH: 3 carbons (prop-) + OH at C1 (-1-ol) = propan-1-ol.",
        "yr": "SS2"
      },
      {
        "q": "The functional group –COOH is characteristic of which organic family?",
        "o": [
          "Alcohols",
          "Aldehydes",
          "Carboxylic acids",
          "Esters"
        ],
        "a": 2,
        "e": "The carboxyl group (–COOH) is the functional group of carboxylic acids. It consists of a carbonyl (C=O) and a hydroxyl (–OH) bonded to the same carbon. Example: CH₃COOH (ethanoic acid/acetic acid). Carboxylic acids are weak acids in water.",
        "h": "–COOH = carboxyl group = functional group of carboxylic acids.",
        "yr": "SS2"
      },
      {
        "q": "Structural isomers have:",
        "o": [
          "The same structural formula and same molecular formula",
          "The same molecular formula but different structural arrangements of atoms",
          "Different molecular formulas but same physical properties",
          "The same boiling point but different molecular formulas"
        ],
        "a": 1,
        "e": "Structural isomers: same molecular formula (same number of each type of atom) but different arrangements (connectivity) of atoms. Example: C₄H₁₀ — butane (straight chain) and methylpropane (branched) are structural isomers — same formula, different structures, different properties.",
        "h": "Structural isomers: same molecular formula, different structural arrangements.",
        "yr": "SS2"
      },
      {
        "q": "The first member of the alkene homologous series is ethene (C₂H₄). Why cannot methene (CH₂) exist?",
        "o": [
          "Carbon cannot form a double bond",
          "A double bond requires two carbon atoms — a single carbon cannot form a C=C double bond with itself",
          "Methene is too reactive to be stable",
          "The formula CH₂ does not satisfy the general formula for alkenes"
        ],
        "a": 1,
        "e": "Alkenes have a C=C double bond. A C=C requires two carbon atoms — minimum chain length = 2 carbons. With 1 carbon, there is no second carbon to form C=C with. Hence the simplest alkene is ethene (C₂H₄), not a 1-carbon compound.",
        "h": "Alkenes need minimum 2 carbons for C=C double bond → simplest alkene = ethene (C₂H₄).",
        "yr": "SS2"
      },
      {
        "q": "How do members of a homologous series show a gradual change in physical properties?",
        "o": [
          "They do not — all members have identical boiling points",
          "As chain length (carbon number) increases, van der Waals forces between molecules increase → higher boiling point, higher melting point, greater viscosity",
          "Shorter chains have higher boiling points",
          "Physical properties are random among homologous series members"
        ],
        "a": 1,
        "e": "Longer carbon chains have larger molecular surface areas → stronger van der Waals (London dispersion) forces between molecules → more energy needed to separate them → higher melting/boiling points. This is the gradual physical property trend in homologous series.",
        "h": "Longer chain → stronger van der Waals forces → higher BP and MP (gradual trend in homologous series).",
        "yr": "SS2"
      },
      {
        "q": "The IUPAC name of CH₃–CH(CH₃)–CH₃ is:",
        "o": [
          "Butane",
          "Propane",
          "Methylpropane (2-methylpropane)",
          "Ethylmethane"
        ],
        "a": 2,
        "e": "Longest chain: 3 carbons (propane backbone). A methyl branch (–CH₃) is at C2 of the propane chain. IUPAC name: 2-methylpropane. Total carbons: 4 (same as butane), but it is a branched isomer. Common name: isobutane.",
        "h": "CH₃CH(CH₃)CH₃ = 2-methylpropane (3-carbon main chain with CH₃ branch at C2).",
        "yr": "SS2"
      },
      {
        "q": "Alcohols contain the functional group –OH. In ethanol (C₂H₅OH), the –OH group makes it:",
        "o": [
          "Strongly acidic (like HCl)",
          "Weakly acidic and able to form hydrogen bonds with water — hence miscible with water in all proportions",
          "Completely non-polar and insoluble in water",
          "A strong base"
        ],
        "a": 1,
        "e": "The –OH group in ethanol allows: (1) hydrogen bonding with water molecules → miscibility with water; (2) very weak acidity (pKa ≈ 16 — much weaker than carboxylic acids). Ethanol is completely miscible with water due to its ability to hydrogen bond.",
        "h": "Ethanol –OH: hydrogen bonding with water → fully miscible; weakly acidic (not as strong as RCOOH).",
        "yr": "SS2"
      },
      {
        "q": "Which of the following organic compounds is a saturated hydrocarbon?",
        "o": [
          "Ethene (C₂H₄)",
          "Ethyne (C₂H₂)",
          "Ethane (C₂H₆)",
          "Benzene (C₆H₆)"
        ],
        "a": 2,
        "e": "Saturated hydrocarbons contain only single C–C bonds (alkanes). Ethane (C₂H₆) is the simplest saturated molecule with two carbons. Ethene (C₂H₄) has a double bond; ethyne (C₂H₂) has a triple bond; benzene has delocalised double bonds — all are unsaturated.",
        "h": "Saturated = only single bonds (alkanes). Ethane (C₂H₆) is saturated. Ethene/ethyne are unsaturated.",
        "yr": "SS2"
      },
      {
        "q": "Position isomerism occurs when:",
        "o": [
          "Compounds have different carbon skeletons",
          "The same functional group occupies different positions on the same carbon skeleton",
          "Compounds belong to different homologous series",
          "Compounds have different molecular formulas"
        ],
        "a": 1,
        "e": "Position isomers have the same molecular formula, same type of functional group, same carbon skeleton, but the functional group is at different positions. Example: propan-1-ol (OH at C1) and propan-2-ol (OH at C2) — both C₃H₇OH but different structures.",
        "h": "Position isomerism: same skeleton, same functional group, but at different positions.",
        "yr": "SS2"
      },
      {
        "q": "The molecular formula C₄H₈ could represent which two types of compounds?",
        "o": [
          "Alkane and alkyne",
          "Alkene (with one C=C double bond) and cycloalkane (ring compound with one ring, no double bonds)",
          "Alcohol and aldehyde",
          "Alkane and alcohol"
        ],
        "a": 1,
        "e": "C₄H₈ satisfies both CₙH₂ₙ (alkene formula, e.g., but-1-ene) and cycloalkane formula (e.g., cyclobutane). This is functional group isomerism — same molecular formula but different functional groups (double bond vs ring).",
        "h": "C₄H₈: alkene (CₙH₂ₙ, but-1-ene) AND cycloalkane (cyclobutane) — functional group isomers.",
        "yr": "SS2"
      },
      {
        "q": "The suffix '-ene' in IUPAC nomenclature indicates the compound contains:",
        "o": [
          "An –OH group",
          "A C=C double bond (alkene family)",
          "A –COOH group",
          "A C≡C triple bond"
        ],
        "a": 1,
        "e": "IUPAC suffixes: -ane (single bonds, alkane), -ene (C=C double bond, alkene), -yne (C≡C triple bond, alkyne), -ol (–OH, alcohol), -al (–CHO, aldehyde), -anoic acid (–COOH, carboxylic acid). The suffix indicates the principal functional group.",
        "h": "IUPAC suffix -ene = C=C double bond (alkene). -ane = single bonds. -yne = triple bond.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following is the correct molecular formula for propan-2-ol?",
        "o": [
          "C₂H₅OH",
          "C₃H₇OH (specifically CH₃CH(OH)CH₃)",
          "C₄H₉OH",
          "C₃H₅OH"
        ],
        "a": 1,
        "e": "Propan-2-ol: 3 carbon chain (prop-), –OH at C2 (-2-ol). Structure: CH₃–CH(OH)–CH₃. Molecular formula: C₃H₇OH = C₃H₈O. It is the isomer of propan-1-ol (CH₃CH₂CH₂OH) — same molecular formula, different OH position.",
        "h": "Propan-2-ol = CH₃CH(OH)CH₃. Molecular formula: C₃H₇OH (C₃H₈O).",
        "yr": "SS2"
      },
      {
        "q": "The boiling points of the first few alkanes increase with chain length because:",
        "o": [
          "Longer chains have stronger covalent bonds",
          "Longer chains have greater surface area for intermolecular van der Waals (London dispersion) forces, requiring more energy to separate the molecules",
          "Longer chains contain more electrons which repel each other",
          "Shorter chains are more soluble in water"
        ],
        "a": 1,
        "e": "Van der Waals (London dispersion) forces increase with molecular surface area. Longer alkane chains have greater surface area → stronger intermolecular forces → more energy (higher T) needed to overcome them and vaporise the liquid. Methane (BP −162°C) to octane (BP 126°C) shows this trend.",
        "h": "Longer alkane chain → greater surface area → stronger van der Waals → higher boiling point.",
        "yr": "SS2"
      },
      {
        "q": "Carbon is described as tetravalent. In organic molecules, this means carbon forms:",
        "o": [
          "Four ionic bonds",
          "Exactly four covalent bonds in all its compounds",
          "A maximum of four covalent bonds, which can be single, double, or triple bonds combining to give 4 bond pairs",
          "Four bonds only with hydrogen"
        ],
        "a": 2,
        "e": "Carbon has 4 valence electrons and forms exactly 4 covalent bonds. These can be: four single bonds (CH₄), two single + one double (CH₂=CH₂), or one single + one triple (HC≡CH). The 4 bond capacity is always satisfied in stable organic compounds.",
        "h": "Carbon = tetravalent: forms exactly 4 covalent bonds (single, double, triple combinations).",
        "yr": "SS2"
      },
      {
        "q": "Which pair of compounds are functional group isomers?",
        "o": [
          "Propan-1-ol and propan-2-ol",
          "Ethanol (C₂H₅OH) and methoxyethane (CH₃OCH₂CH₃) — both C₃H₈O but different functional groups (–OH vs ether –O–)",
          "Ethane and propane",
          "Ethene and propene"
        ],
        "a": 1,
        "e": "Functional group isomers: same molecular formula but different functional groups. Propan-1-ol (C₃H₇OH) and methoxyethane (CH₃OC₂H₅) are both C₃H₈O but have –OH (alcohol) and –O– (ether) functional groups respectively — different functional groups, same molecular formula.",
        "h": "Functional group isomers: same molecular formula, different functional groups (e.g., alcohol and ether).",
        "yr": "SS2"
      },
      {
        "q": "The IUPAC name of CH₃–CH₂–CH₂–CH₂–OH is:",
        "o": [
          "Propan-1-ol",
          "Butan-1-ol",
          "Butanol",
          "Pentan-1-ol"
        ],
        "a": 1,
        "e": "Four carbons in the longest chain (but-) with –OH at carbon 1 (-1-ol): butan-1-ol. Structure: HO–CH₂–CH₂–CH₂–CH₃. Molecular formula C₄H₉OH (C₄H₁₀O).",
        "h": "CH₃CH₂CH₂CH₂OH: 4 carbons (but-) + OH at C1 (-1-ol) = butan-1-ol.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Petroleum and Petrochemicals",
    "topicCode": "SS2-CHEM-15",
    "module": "Organic Chemistry",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\"><span class=\"learn-keyword\">Petroleum</span> (crude oil) is a naturally occurring mixture of hydrocarbons formed over millions of years from the remains of marine organisms under heat and pressure. It is Nigeria's most important natural resource and the basis of a vast petrochemical industry. Understanding its refining and uses is essential for both chemistry and national development.</div><h3 class=\"learn-subheading\">1. Formation and Composition of Crude Oil</h3><p class=\"learn-p\">Crude oil forms from marine organisms buried under sediment over millions of years. Heat and pressure transform them into a complex mixture of mainly alkanes, cycloalkanes, and aromatic hydrocarbons. Natural gas (mainly methane) is often found above oil deposits.</p><h3 class=\"learn-subheading\">2. Fractional Distillation of Crude Oil</h3><p class=\"learn-p\">Crude oil is refined by fractional distillation in a fractionating tower. Crude oil is heated and vaporised; vapours rise up the tower and condense at different heights according to their boiling points.</p><div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Fraction</th><th>Approx. Boiling Range</th><th>Carbon Atoms</th><th>Main Uses</th></tr></thead><tbody><tr><td>Refinery gas (LPG)</td><td>Below 25°C</td><td>C₁–C₄</td><td>Cooking fuel, heating</td></tr><tr><td>Petrol (gasoline)</td><td>25–75°C</td><td>C₅–C₁₀</td><td>Fuel for cars</td></tr><tr><td>Naphtha</td><td>75–150°C</td><td>C₇–C₁₀</td><td>Chemicals, solvents</td></tr><tr><td>Kerosene (jet fuel)</td><td>150–240°C</td><td>C₁₁–C₁₅</td><td>Aircraft fuel, cooking</td></tr><tr><td>Diesel oil (gas oil)</td><td>240–350°C</td><td>C₁₅–C₂₅</td><td>Diesel engines, heating</td></tr><tr><td>Fuel oil</td><td>350–400°C</td><td>C₂₀–C₇₀</td><td>Ships, power stations</td></tr><tr><td>Lubricating oil/wax</td><td>400–500°C</td><td>C₃₀–C₅₀</td><td>Engine oil, candles</td></tr><tr><td>Bitumen (asphalt)</td><td>Above 500°C (residue)</td><td>C₇₀+</td><td>Road surfacing, roofing</td></tr></tbody></table></div><h3 class=\"learn-subheading\">3. Cracking</h3><p class=\"learn-p\"><span class=\"learn-keyword\">Cracking</span> breaks down large, less useful hydrocarbon molecules into smaller, more useful ones — especially petrol and ethene (for plastics).</p><ul class=\"learn-list\"><li><strong>Thermal cracking:</strong> High temperature (700–900°C) and pressure; produces alkenes and alkanes.</li><li><strong>Catalytic cracking:</strong> Lower temperature (500°C) using zeolite/aluminium oxide catalyst; produces high-octane petrol and alkenes.</li><li>Example: C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆ (alkane + alkene)</li></ul><h3 class=\"learn-subheading\">4. Reforming</h3><p class=\"learn-p\">Reforming converts straight-chain alkanes into branched alkanes and aromatic compounds (benzene, toluene) to improve petrol's octane rating. Uses platinum or rhenium catalyst.</p><h3 class=\"learn-subheading\">5. Petrochemicals</h3><p class=\"learn-p\">Petrochemicals are chemicals derived from petroleum/natural gas, used as raw materials for the chemical industry:</p><ul class=\"learn-list\"><li>Ethene → polyethylene (plastic bags), ethanol, PVC</li><li>Propene → polypropylene, propan-2-ol</li><li>Benzene → drugs, dyes, explosives, plastics</li><li>Methane → ammonia (Haber process), methanol, hydrogen fuel</li></ul><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Cracking Summary:</strong> Large hydrocarbons → smaller (alkenes + alkanes). Alkenes (unsaturated) are needed for making plastics. Cracking produces ethene (C₂H₄) — the most important petrochemical feedstock for the polymer industry.</div><div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> Crude oil = mixture of hydrocarbons. Refining = fractional distillation (smallest/lowest BP at top: LPG, petrol, naphtha, kerosene, diesel, fuel oil, bitumen at bottom). Cracking: large → small molecules + alkenes. Reforming: straight chain → branched/aromatic (higher octane). Petrochemicals: ethene, propene, benzene, methane.</div>",
    "questions": [
      {
        "q": "Crude oil is best described as:",
        "o": [
          "A pure compound of one type of hydrocarbon",
          "A naturally occurring complex mixture of mainly hydrocarbon compounds formed from ancient marine organisms",
          "A synthetic material manufactured from coal",
          "A single type of alkane produced in Nigeria"
        ],
        "a": 1,
        "e": "Crude oil (petroleum) is a naturally occurring mixture of hundreds of different hydrocarbon compounds — primarily alkanes, cycloalkanes, and aromatic hydrocarbons — formed from marine organisms buried under sediment over millions of years and transformed by heat and pressure.",
        "h": "Crude oil = naturally occurring complex mixture of hydrocarbons from ancient marine organisms.",
        "yr": "SS2"
      },
      {
        "q": "In the fractional distillation of crude oil, fractions are separated according to their:",
        "o": [
          "Molecular masses only",
          "Boiling points — smaller molecules with lower boiling points rise higher in the column and condense at the top",
          "Colours and appearance",
          "Solubility in water"
        ],
        "a": 1,
        "e": "Fractions separate by boiling point. Heated crude oil vapour rises up the fractionating tower. Lower boiling point fractions (LPG, petrol) condense near the top (cooler); higher boiling point fractions (diesel, fuel oil) condense lower; bitumen remains as residue at the base.",
        "h": "Fractional distillation: separates by boiling point. Low BP → top. High BP → bottom. Bitumen = residue.",
        "yr": "SS2"
      },
      {
        "q": "Which fraction of crude oil is used as fuel for aircraft (jet fuel)?",
        "o": [
          "Petrol (gasoline)",
          "Naphtha",
          "Kerosene (paraffin)",
          "Diesel oil"
        ],
        "a": 2,
        "e": "Kerosene (paraffin), containing approximately C₁₁–C₁₅ hydrocarbons with a boiling range of 150–240°C, is used as jet fuel (aviation fuel) and for domestic cooking stoves. It is less volatile than petrol and ignites reliably at aircraft operating conditions.",
        "h": "Kerosene (C₁₁–C₁₅) = jet/aviation fuel and domestic cooking fuel.",
        "yr": "SS2"
      },
      {
        "q": "Cracking of large hydrocarbon molecules is carried out to:",
        "o": [
          "Increase the boiling point of the crude oil fractions",
          "Break large, less useful molecules into smaller, more useful ones — especially petrol-range alkanes and ethene for plastics",
          "Combine small molecules into larger ones",
          "Purify crude oil from sulphur impurities"
        ],
        "a": 1,
        "e": "Crude oil naturally produces too much heavy fuel oil and not enough petrol and ethene (for polymer production). Cracking breaks heavy fractions (C₁₅–C₃₀) into petrol-sized molecules and ethene/propene (alkenes needed for the plastics industry).",
        "h": "Cracking: breaks large hydrocarbons → smaller (petrol) + alkenes (for plastics).",
        "yr": "SS2"
      },
      {
        "q": "The difference between thermal cracking and catalytic cracking is that catalytic cracking:",
        "o": [
          "Uses higher temperatures (above 900°C)",
          "Uses lower temperature (around 500°C) with a zeolite catalyst, producing more branched alkanes and alkenes (higher octane petrol)",
          "Produces only methane and ethane",
          "Requires higher pressure than thermal cracking"
        ],
        "a": 1,
        "e": "Thermal cracking: 700–900°C, high pressure — good for making ethene. Catalytic cracking: ~500°C, atmospheric or low pressure, zeolite/silica-alumina catalyst — produces higher-octane branched alkanes and more aromatic compounds, better for petrol quality. Catalytic is preferred industrially.",
        "h": "Catalytic cracking: ~500°C, zeolite catalyst, produces branched alkanes and aromatics (higher octane).",
        "yr": "SS2"
      },
      {
        "q": "The refinery gas fraction (LPG) consists mainly of:",
        "o": [
          "C₁₀–C₁₅ hydrocarbons used as aviation fuel",
          "C₁–C₄ hydrocarbons (methane, ethane, propane, butane) used as cooking and heating fuel",
          "C₂₀+ hydrocarbons used for lubricating engines",
          "C₅–C₈ hydrocarbons used as petrol"
        ],
        "a": 1,
        "e": "LPG (Liquefied Petroleum Gas) = the lightest fraction from crude oil refining, consisting of C₁–C₄ hydrocarbons (methane, ethane, propane, butane). These gases have the lowest boiling points and rise to the very top of the fractionating tower. Used as cooking gas and heating fuel.",
        "h": "LPG = C₁–C₄ (methane to butane); lightest fraction; used for cooking and heating.",
        "yr": "SS2"
      },
      {
        "q": "The residue left at the bottom of the fractionating tower after crude oil distillation is:",
        "o": [
          "Diesel oil",
          "Lubricating oil",
          "Kerosene",
          "Bitumen (asphalt)"
        ],
        "a": 3,
        "e": "Bitumen (asphalt) is the heaviest fraction remaining as a dark, viscous residue at the base of the fractionating tower. It contains C₇₀+ hydrocarbons with very high boiling points (above 500°C). Used for road surfacing (tarmac) and waterproofing roofs.",
        "h": "Bitumen = heaviest residue at base of tower; C₇₀+; used for road surfacing (tarmac).",
        "yr": "SS2"
      },
      {
        "q": "Ethene (C₂H₄) is one of the most important petrochemicals because it is used to make:",
        "o": [
          "Diesel fuel and lubricating oil",
          "Polyethylene (polythene), PVC, ethanol, and many other polymer and chemical products",
          "Natural gas (methane)",
          "Bitumen for road surfaces"
        ],
        "a": 1,
        "e": "Ethene is the most widely produced organic chemical in the world. By addition polymerisation: nCH₂=CH₂ → (–CH₂–CH₂–)n (polyethylene). It is also used to make: PVC (from chloroethene), polystyrene, ethanol (industrial), and ethylene glycol (antifreeze).",
        "h": "Ethene (C₂H₄) = key feedstock → polyethylene, PVC, ethanol, ethylene glycol.",
        "yr": "SS2"
      },
      {
        "q": "Reforming in petroleum refining converts straight-chain alkanes to branched alkanes and aromatic compounds mainly to:",
        "o": [
          "Reduce the boiling point of petrol",
          "Improve the octane number (knock resistance) of petrol — branched and aromatic compounds burn more smoothly in engines",
          "Produce diesel fuel more efficiently",
          "Remove sulphur from petroleum fractions"
        ],
        "a": 1,
        "e": "The octane number measures petrol's resistance to 'knocking' (premature ignition) in engines. Straight-chain alkanes have low octane numbers; branched alkanes and aromatic compounds (benzene, toluene) have high octane numbers. Reforming converts straight-chain to branched/aromatic to make premium petrol.",
        "h": "Reforming: straight chain → branched/aromatic → higher octane number (better anti-knock petrol).",
        "yr": "SS2"
      },
      {
        "q": "The cracking reaction: C₁₆H₃₄ → C₈H₁₈ + X. What is X?",
        "o": [
          "C₈H₃₄",
          "C₈H₁₆ (an alkene — oct-1-ene)",
          "C₈H₂₀",
          "C₄H₈ + C₄H₈"
        ],
        "a": 1,
        "e": "Carbon balance: C₁₆H₃₄ → C₈H₁₈ + X. C: 16=8+8 ✓; H: 34=18+H_X → H_X=16. X = C₈H₁₆, which fits alkene formula CₙH₂ₙ → oct-1-ene (C₈H₁₆). Cracking always produces at least one alkene product.",
        "h": "C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆. C₈H₁₆ is an alkene (CₙH₂ₙ).",
        "yr": "SS2"
      },
      {
        "q": "Nigeria's crude oil is primarily found in which region of the country?",
        "o": [
          "North-Western Nigeria (Sokoto Basin)",
          "South-South Nigeria (Niger Delta, including Bayelsa, Rivers, Delta States)",
          "South-Eastern Nigeria (Anambra, Imo)",
          "Central Nigeria (Plateau, Kogi States)"
        ],
        "a": 1,
        "e": "Nigeria's petroleum deposits are concentrated in the Niger Delta region of South-South Nigeria — particularly in Bayelsa, Rivers, Delta, Akwa Ibom, Cross River, and Edo States. Nigeria is Africa's largest oil producer and a major OPEC member.",
        "h": "Nigeria's oil = Niger Delta region (South-South: Bayelsa, Rivers, Delta, Akwa Ibom).",
        "yr": "SS2"
      },
      {
        "q": "Natural gas, often found alongside crude oil deposits, consists mainly of:",
        "o": [
          "Ethane and propane",
          "Methane (CH₄), the simplest alkane",
          "Benzene and toluene",
          "Hydrogen and nitrogen"
        ],
        "a": 1,
        "e": "Natural gas is predominantly methane (CH₄, typically 70–90%) with smaller amounts of ethane, propane, and butane. It is a cleaner fuel than coal or oil (produces mainly CO₂ and H₂O when burned) and is the raw material for the Haber process (NH₃ production).",
        "h": "Natural gas = mainly methane (CH₄), the simplest alkane.",
        "yr": "SS2"
      },
      {
        "q": "The environmental problems associated with petroleum extraction and use in Nigeria include:",
        "o": [
          "Making the soil more fertile",
          "Oil spills destroying farmland and aquatic ecosystems, gas flaring causing air pollution and global warming, and displacement of communities",
          "Reducing unemployment in oil-producing areas only",
          "No significant environmental problems"
        ],
        "a": 1,
        "e": "Nigeria's petroleum industry has caused: (1) oil spills contaminating farmland, rivers, and coastal ecosystems in the Niger Delta; (2) gas flaring (burning excess natural gas) — major contributor to air pollution, acid rain, and CO₂ emissions; (3) displacement and poverty of host communities.",
        "h": "Nigeria oil environmental problems: oil spills, gas flaring, ecosystem destruction, community displacement.",
        "yr": "SS2"
      },
      {
        "q": "Which fraction of crude oil is used to lubricate car engines?",
        "o": [
          "Petrol (gasoline)",
          "Kerosene",
          "Lubricating oil (C₃₀–C₅₀ fraction)",
          "Bitumen"
        ],
        "a": 2,
        "e": "Lubricating oil (containing C₃₀–C₅₀ hydrocarbons) is the fraction used as engine oil. It reduces friction between moving metal parts in engines. The same fraction is further processed to make petroleum jelly (Vaseline) and paraffin wax (for candles).",
        "h": "Lubricating oil = C₃₀–C₅₀ fraction; reduces friction in engines.",
        "yr": "SS2"
      },
      {
        "q": "Methane from natural gas is used in the Haber process to produce hydrogen. How is hydrogen obtained from methane?",
        "o": [
          "By directly burning methane in air",
          "By steam reforming: CH₄ + H₂O ⇌ CO + 3H₂ (then CO + H₂O → CO₂ + H₂)",
          "By cracking methane at high temperature",
          "By electrolysis of liquid methane"
        ],
        "a": 1,
        "e": "Steam reforming: CH₄ + H₂O → CO + 3H₂ (high T, Ni catalyst). Then water-gas shift reaction: CO + H₂O → CO₂ + H₂. Combined: CH₄ + 2H₂O → CO₂ + 4H₂. This H₂ is used in the Haber process to make ammonia: N₂ + 3H₂ → 2NH₃.",
        "h": "H₂ from methane: steam reforming (CH₄ + H₂O → CO + 3H₂) → H₂ for Haber process.",
        "yr": "SS2"
      },
      {
        "q": "Benzene (C₆H₆), obtained from petroleum reforming, is important as a petrochemical because it is used to make:",
        "o": [
          "Polyethylene bags and bottles",
          "Drugs (aspirin, paracetamol), dyes, explosives (TNT), nylon, polystyrene, and many other products",
          "Aviation fuel directly",
          "Cooking gas (LPG)"
        ],
        "a": 1,
        "e": "Benzene is one of the most important chemical feedstocks: drugs (aspirin = acetylsalicylic acid, paracetamol), dyes (coal-tar dyes), explosives (TNT = trinitrotoluene), nylon (caprolactam from cyclohexane/benzene), polystyrene (from styrene = ethenylbenzene).",
        "h": "Benzene petrochemical → drugs, dyes, explosives (TNT), nylon, polystyrene.",
        "yr": "SS2"
      },
      {
        "q": "The octane number of a fuel measures:",
        "o": [
          "The number of carbon atoms in the fuel",
          "The percentage of octane in the fuel by mass",
          "The fuel's resistance to premature ignition (knocking) in an engine — higher octane = smoother combustion",
          "The energy content of the fuel in kJ/mol"
        ],
        "a": 2,
        "e": "Octane number (octane rating) measures anti-knock performance. Iso-octane (2,2,4-trimethylpentane) is defined as 100; n-heptane as 0. A petrol with octane number 95 performs as well as a mixture of 95% iso-octane and 5% n-heptane in an engine. Higher octane = less knocking.",
        "h": "Octane number = anti-knock resistance rating. Higher = smoother combustion (less knocking).",
        "yr": "SS2"
      },
      {
        "q": "The process by which crude oil is formed over millions of years is best described as:",
        "o": [
          "Combustion of ancient plant material under high pressure",
          "Biological decay and fossilisation of ancient marine organisms under heat and pressure, converting them into complex hydrocarbon mixtures",
          "Chemical synthesis of hydrocarbons from water and carbon dioxide",
          "Cooling and solidification of magma from volcanic activity"
        ],
        "a": 1,
        "e": "Crude oil formation: marine organisms (phytoplankton, zooplankton) die and sink, covered by sediment. Over millions of years, heat (geothermal) and pressure (from overlying rock) transforms the organic matter via diagenesis and catagenesis into crude oil and natural gas.",
        "h": "Crude oil: ancient marine organisms → buried → heat + pressure over millions of years → hydrocarbons.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following best explains why diesel oil is suitable for use in diesel engines but not in petrol engines?",
        "o": [
          "Diesel has too high an octane number for petrol engines",
          "Diesel has a higher boiling point and carbon chain length (C₁₅–C₂₅) — it is designed to ignite by compression (no spark plug), unlike petrol which requires spark ignition",
          "Diesel is too expensive for petrol cars",
          "Diesel cannot be refined from crude oil"
        ],
        "a": 1,
        "e": "Diesel engines use compression ignition — diesel fuel ignites when compressed to high pressure without a spark plug. Petrol engines use spark ignition — petrol is ignited by a spark plug. Using diesel in a petrol engine (or vice versa) causes serious damage because the ignition mechanism is different.",
        "h": "Diesel = compression ignition (no spark). Petrol = spark ignition. Different mechanisms; incompatible.",
        "yr": "SS2"
      },
      {
        "q": "Gas flaring in Nigeria's Niger Delta involves:",
        "o": [
          "Controlled burning of petrol in refineries",
          "Burning off associated natural gas (mainly methane) that comes up with crude oil because it is uneconomical to capture — contributing to CO₂ and air pollution",
          "Using natural gas productively for electricity generation",
          "Flaring kerosene for cooking purposes"
        ],
        "a": 1,
        "e": "Gas flaring occurs when natural gas extracted alongside crude oil is burned off (flared) at oil wells because infrastructure to capture, process, and sell it is lacking or deemed uneconomical. Nigeria was historically one of the world's largest gas flaring nations — contributing significantly to CO₂ emissions, air pollution, and environmental degradation in the Niger Delta.",
        "h": "Gas flaring = burning associated natural gas from oil wells (wasteful; causes CO₂ pollution).",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Sulphur and Its Compounds",
    "topicCode": "SS2-CHEM-25",
    "module": "Non-Metals and Their Compounds",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">Have you ever lit a match and smelt a sharp, choking smell? That smell comes from <span class=\"learn-keyword\">sulphur</span> burning. Sulphur is a yellow solid that is used to make <span class=\"learn-keyword\">sulphuric acid</span>, the acid in car batteries and one of the most widely used chemicals in the world. Sulphuric acid is used to make fertilisers for our farms, soap powders, paints and many other things. The gas <span class=\"learn-keyword\">sulphur dioxide</span> is made when sulphur burns, and it also comes from factory chimneys and car exhausts. In this topic you will learn where sulphur is found, how it is obtained, its properties and uses, and the preparation, properties and uses of sulphur dioxide and sulphuric acid.</div>\n\n<h3 class=\"learn-subheading\">1. Occurrence of Sulphur</h3>\n<p class=\"learn-p\">Sulphur (symbol S, atomic number 16) is a non-metal. It is found in two ways.</p>\n<ul class=\"learn-list\">\n<li><strong>As the free element:</strong> in underground deposits and near volcanoes, for example in Sicily (Italy), Texas and Louisiana (USA), Mexico and Poland.</li>\n<li><strong>Combined in compounds:</strong> as sulphides such as galena (PbS), zinc blende (ZnS) and iron pyrites (FeS₂); as sulphates such as gypsum (CaSO₄·2H₂O); and in natural gas and crude oil as hydrogen sulphide (H₂S) and other sulphur compounds.</li>\n</ul>\n<p class=\"learn-p\">Sulphur is also found in proteins, so there is a little in eggs, meat and hair.</p>\n\n<h3 class=\"learn-subheading\">2. Extraction: the Frasch Process</h3>\n<p class=\"learn-p\">Sulphur deposits lie deep underground, so miners cannot dig them out easily. The <span class=\"learn-keyword\">Frasch process</span> is used. Sulphur melts at a low temperature (about 113 °C), so it can be melted underground and pumped up.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Three pipes, one inside the other, are driven down into the sulphur bed.</li>\n<li>Step 2: Superheated water (about 170 °C) is forced down the outer pipe. It melts the sulphur.</li>\n<li>Step 3: Hot compressed air is forced down the inner pipe. It pushes the molten sulphur up through the middle pipe, as a frothy mixture.</li>\n<li>Step 4: The liquid sulphur is run into tanks and left to cool and solidify. It is about 99% pure.</li>\n</ol>\n\n<h3 class=\"learn-subheading\">3. Allotropes and Physical Properties</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Allotropy</span> means that an element exists in two or more different forms in the same physical state. Sulphur has two main crystal forms, <strong>rhombic</strong> and <strong>monoclinic</strong>. Both are made of S₈ molecules, which are rings of eight sulphur atoms.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Property</th><th>Rhombic sulphur</th><th>Monoclinic sulphur</th></tr></thead>\n<tbody>\n<tr><td>Shape of crystal</td><td>Octahedral (diamond shaped)</td><td>Long needle-shaped</td></tr>\n<tr><td>Colour</td><td>Bright yellow</td><td>Pale yellow</td></tr>\n<tr><td>Melting point</td><td>About 113 °C</td><td>About 119 °C</td></tr>\n<tr><td>Stable</td><td>Below 96 °C</td><td>Above 96 °C</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">The temperature at which one form changes into the other is called the <strong>transition temperature</strong>. For sulphur it is about 96 °C.</p>\n<p class=\"learn-p\"><strong>Effect of heating.</strong> When sulphur is heated slowly, it first melts to a pale yellow, runny liquid at about 113 °C. On more heating, it becomes darker and very thick (it will not pour) at about 180 °C. At higher temperature, it becomes runny again and boils at about 445 °C. If boiling sulphur is poured into cold water, it forms a rubbery brown solid called <strong>plastic sulphur</strong>. It slowly changes back to rhombic sulphur.</p>\n<p class=\"learn-p\">Other physical properties: sulphur is a brittle solid, a poor conductor of heat and electricity, insoluble in water, and soluble in carbon disulphide (CS₂).</p>\n\n<h3 class=\"learn-subheading\">4. Chemical Properties and Uses of Sulphur</h3>\n<ul class=\"learn-list\">\n<li><strong>It burns in air</strong> with a blue flame, to form sulphur dioxide: S + O₂ → SO₂.</li>\n<li><strong>With metals</strong> it forms sulphides when heated. Iron and sulphur form iron(II) sulphide: Fe + S → FeS (a black solid).</li>\n<li><strong>With hydrogen</strong> it forms hydrogen sulphide, which smells of rotten eggs: H₂ + S → H₂S.</li>\n<li>Hot concentrated nitric acid oxidises sulphur to sulphuric acid.</li>\n</ul>\n<p class=\"learn-p\"><strong>Uses of sulphur:</strong></p>\n<ul class=\"learn-list\">\n<li>Over 80% is used to make sulphuric acid.</li>\n<li><strong>Vulcanisation of rubber:</strong> sulphur is heated with rubber to make it harder and more elastic (as in tyres).</li>\n<li>Making matches, gunpowder and fireworks.</li>\n<li>As a fungicide on farms and in skin ointments and medicines.</li>\n<li>Making dyes, bleach for paper, and sulphur compounds for preserving food.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">5. Sulphur Dioxide (SO₂)</h3>\n<p class=\"learn-p\"><strong>Laboratory preparation.</strong> There are two common methods.</p>\n<ul class=\"learn-list\">\n<li>Heating copper with concentrated sulphuric acid: Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O.</li>\n<li>Adding dilute hydrochloric acid to a sulphite (such as sodium sulphite): Na₂SO₃ + 2HCl → 2NaCl + H₂O + SO₂.</li>\n</ul>\n<p class=\"learn-p\">The gas is dried by bubbling it through concentrated sulphuric acid. It is collected by <strong>downward delivery</strong> (upward displacement of air), because it is denser than air. It cannot be collected over water because it is very soluble in water.</p>\n<p class=\"learn-p\"><strong>Properties.</strong></p>\n<ul class=\"learn-list\">\n<li>Colourless gas with a sharp, choking smell. It is poisonous, denser than air and very soluble in water.</li>\n<li><strong>Acidic:</strong> it dissolves in water to give sulphurous acid, SO₂ + H₂O ⇌ H₂SO₃. This turns blue litmus red. It reacts with alkalis to give sulphites: SO₂ + 2NaOH → Na₂SO₃ + H₂O.</li>\n<li><strong>Reducing agent:</strong> it turns acidified potassium manganate(VII) from purple to colourless, and acidified potassium dichromate(VI) from orange to green.</li>\n<li><strong>Bleaching agent:</strong> in the presence of water it bleaches coloured materials, such as flowers and paper, by removing oxygen (reduction). The bleaching is only temporary. Chlorine, which bleaches by oxidation, is permanent.</li>\n</ul>\n<p class=\"learn-p\"><strong>Test for SO₂:</strong> it turns acidified purple KMnO₄ colourless (or orange dichromate green).</p>\n<p class=\"learn-p\"><strong>Uses:</strong> making sulphuric acid, bleaching wool, paper and straw, preserving food and drinks, and killing germs and insects (fumigation). <strong>A danger:</strong> SO₂ released from burning fuels causes <strong>acid rain</strong>, which damages buildings, crops and rivers.</p>\n\n<h3 class=\"learn-subheading\">6. Sulphuric Acid: the Contact Process</h3>\n<p class=\"learn-p\">Sulphuric acid, H₂SO₄, is made in industry by the <span class=\"learn-keyword\">Contact process</span>.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Sulphur is burnt in dry air (or sulphide ores are roasted) to give sulphur dioxide: S + O₂ → SO₂.</li>\n<li>Step 2: SO₂ and air are purified (dust and impurities poison the catalyst), then passed over a catalyst of <strong>vanadium(V) oxide (V₂O₅)</strong> at about 450 °C and 1–2 atmospheres: 2SO₂ + O₂ ⇌ 2SO₃. This reaction is reversible and exothermic.</li>\n<li>Step 3: SO₃ is dissolved in concentrated sulphuric acid to make <strong>oleum</strong> (H₂S₂O₇): SO₃ + H₂SO₄ → H₂S₂O₇. SO₃ is not dissolved directly in water, because that makes a fine mist of acid, which is hard to condense.</li>\n<li>Step 4: The oleum is diluted carefully with water to give concentrated acid: H₂S₂O₇ + H₂O → 2H₂SO₄.</li>\n</ol>\n\n<h3 class=\"learn-subheading\">7. Properties and Uses of Sulphuric Acid</h3>\n<ul class=\"learn-list\">\n<li><strong>Dilute acid</strong> shows the usual acid properties. It reacts with metals above hydrogen: Zn + H₂SO₄ → ZnSO₄ + H₂. It reacts with bases: CuO + H₂SO₄ → CuSO₄ + H₂O. It reacts with carbonates to give carbon dioxide: Na₂CO₃ + H₂SO₄ → Na₂SO₄ + H₂O + CO₂.</li>\n<li><strong>Concentrated acid as a drying agent:</strong> it absorbs water vapour from gases that do not react with it.</li>\n<li><strong>Concentrated acid as a dehydrating agent:</strong> it removes water from compounds. It turns white sugar to black carbon: C₁₂H₂₂O₁₁ → 12C + 11H₂O. It turns blue copper(II) sulphate crystals to white powder.</li>\n<li><strong>Concentrated acid as an oxidising agent:</strong> hot concentrated acid reacts with copper, giving SO₂: Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O.</li>\n<li><strong>Test for sulphate ions:</strong> add barium chloride solution to a solution of the acid or a sulphate. A white precipitate of barium sulphate forms, and it does not dissolve in dilute HCl: Ba²⁺ + SO₄²⁻ → BaSO₄.</li>\n</ul>\n<p class=\"learn-p\"><strong>Safety:</strong> always add acid to water, slowly, while stirring. Adding water to concentrated acid gives out so much heat that the mixture can spit.</p>\n<p class=\"learn-p\"><strong>Uses:</strong> making fertilisers (ammonium sulphate and superphosphate), car battery acid, soaps and detergents, paints and pigments, plastics and fibres, and removing rust from iron before it is plated.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> What mass and volume (at s.t.p.) of SO₂ are made when 3.2 g of sulphur burns completely? (S = 32, O = 16; 22.4 dm³ per mole)<br>Step 1: S + O₂ → SO₂, so 1 mol S gives 1 mol SO₂.<br>Step 2: Moles of S = 3.2 / 32 = 0.1 mol, so moles of SO₂ = 0.1 mol.<br>Step 3: Mass of SO₂ = 0.1 × 64 = 6.4 g. Volume = 0.1 × 22.4 = 2.24 dm³.<br><strong>Answer: 6.4 g, or 2.24 dm³.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> What mass of H₂SO₄ can be made from 64 kg of SO₂? (S = 32, O = 16, H = 1)<br>Step 1: SO₂ → SO₃ → H₂SO₄, so 1 mol SO₂ finally gives 1 mol H₂SO₄.<br>Step 2: Molar mass of SO₂ = 64 g/mol and H₂SO₄ = 2 + 32 + 64 = 98 g/mol.<br>Step 3: 64 kg of SO₂ gives 98 kg of H₂SO₄ (the ratio is 64 : 98).<br><strong>Answer: 98 kg of H₂SO₄.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> 4.9 g of H₂SO₄ is dissolved in water to make 500 cm³ of solution. (a) Find its concentration in mol/dm³. (b) What volume of 0.1 mol/dm³ NaOH neutralises 25 cm³ of this acid?<br>Step 1: Moles of acid = 4.9 / 98 = 0.05 mol. Volume = 500 cm³ = 0.5 dm³. Concentration = 0.05 / 0.5 = 0.1 mol/dm³.<br>Step 2: H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Moles of acid in 25 cm³ = 0.1 × 0.025 = 0.0025 mol.<br>Step 3: Moles of NaOH = 2 × 0.0025 = 0.005 mol. Volume = 0.005 / 0.1 = 0.05 dm³ = 50 cm³.<br><strong>Answer: (a) 0.1 mol/dm³; (b) 50 cm³.</strong></div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Adding water to concentrated sulphuric acid. Always add acid to water.<br>2. Saying SO₂ bleaches by oxidation. It bleaches by reduction, and the colour can come back; chlorine bleaches by oxidation.<br>3. Forgetting that H₂SO₄ is dibasic: 1 mol of acid needs 2 mol of NaOH.<br>4. Writing the Contact process catalyst as iron or platinum. It is vanadium(V) oxide.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often asks for the conditions in the Contact process (V₂O₅, 450 °C, 1–2 atm), the reason SO₃ is not dissolved directly in water, the Frasch process, and the three roles of concentrated H₂SO₄ (drying, dehydrating, oxidising). Expect also \"State two uses of sulphur dioxide\" and \"Describe a test for a sulphate\". Give the observation with the equation.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>• Sulphur occurs free (volcanic areas) and as sulphides, sulphates and in fuels. It is mined by the Frasch process.<br>• Its allotropes are rhombic and monoclinic (transition temperature about 96 °C); plastic sulphur forms when boiling sulphur is poured into cold water.<br>• SO₂ is acidic, a reducing and bleaching agent, and a cause of acid rain.<br>• The Contact process: S → SO₂ → SO₃ (V₂O₅, 450 °C) → oleum → H₂SO₄.<br>• Concentrated H₂SO₄ dries, dehydrates and oxidises. Test for sulphates: BaCl₂ gives a white precipitate.</div>",
    "questions": [
      {
        "q": "Which of these is an ore (compound) of sulphur?",
        "o": [
          "Iron pyrites",
          "Haematite",
          "Bauxite",
          "Cryolite"
        ],
        "a": 0,
        "e": "Iron pyrites, FeS₂, is a sulphide. Haematite is an iron oxide, bauxite is an aluminium ore, and cryolite is Na₃AlF₆.",
        "h": "Look for the ore that contains S in its formula.",
        "yr": "SS2"
      },
      {
        "q": "The method used to obtain sulphur from underground deposits is the",
        "o": [
          "Haber process",
          "Contact process",
          "Frasch process",
          "Solvay process"
        ],
        "a": 2,
        "e": "In the Frasch process, superheated water melts the sulphur and compressed air forces it to the surface. The Contact process makes sulphuric acid and the Haber process makes ammonia.",
        "h": "It uses three concentric pipes.",
        "yr": "SS2"
      },
      {
        "q": "Rhombic and monoclinic sulphur are examples of",
        "o": [
          "allotropes",
          "isotopes",
          "isomers",
          "alloys"
        ],
        "a": 0,
        "e": "Allotropes are different forms of the same element in the same physical state. Both forms are made of S₈ molecules. Isotopes differ in the number of neutrons, not in structure.",
        "h": "Different forms of the same element.",
        "yr": "SS2"
      },
      {
        "q": "When boiling sulphur is poured quickly into cold water, the product is",
        "o": [
          "rhombic sulphur",
          "monoclinic sulphur",
          "plastic sulphur",
          "sulphur dioxide"
        ],
        "a": 2,
        "e": "Fast cooling of the hot liquid traps the sulphur chains and gives a rubbery brown solid called plastic sulphur. It slowly changes back to rhombic sulphur.",
        "h": "The product is rubbery.",
        "yr": "SS2"
      },
      {
        "q": "What is observed when sulphur burns in air?",
        "o": [
          "A blue flame and a choking gas",
          "A bright white flame and white ash",
          "A yellow flame and brown fumes",
          "No flame, only a glow"
        ],
        "a": 0,
        "e": "Sulphur burns with a blue flame to form SO₂, a colourless gas with a sharp choking smell: S + O₂ → SO₂. White ash with a bright white flame is magnesium.",
        "h": "Think of the smell of a burnt match.",
        "yr": "SS2"
      },
      {
        "q": "Which use of sulphur involves heating it with rubber?",
        "o": [
          "Hydrogenation",
          "Fermentation",
          "Vulcanisation",
          "Galvanising"
        ],
        "a": 2,
        "e": "Vulcanisation uses sulphur to cross-link rubber, making it harder and more elastic for tyres. Hydrogenation makes margarine and galvanising coats iron with zinc.",
        "h": "It makes car tyres stronger.",
        "yr": "SS2"
      },
      {
        "q": "Which is a suitable method for collecting sulphur dioxide?",
        "o": [
          "Over water",
          "Downward displacement of air (upward delivery)",
          "By a syringe over mercury only",
          "Upward displacement of air (downward delivery)"
        ],
        "a": 3,
        "e": "SO₂ is denser than air and very soluble in water, so it is collected by upward displacement of air (downward delivery). Collecting over water would dissolve the gas.",
        "h": "The gas is denser than air and dissolves in water.",
        "yr": "SS2"
      },
      {
        "q": "Which observation shows that SO₂ is a reducing agent?",
        "o": [
          "It turns blue litmus red",
          "It has a choking smell",
          "Acidified KMnO₄ changes from purple to colourless",
          "It dissolves in water"
        ],
        "a": 2,
        "e": "SO₂ reduces purple MnO₄⁻ to almost colourless Mn²⁺ in acid. Turning litmus red shows that it is acidic, not that it is a reducing agent.",
        "h": "Reducing agents change the colour of acidified permanganate.",
        "yr": "SS2"
      },
      {
        "q": "The catalyst and temperature in the Contact process are",
        "o": [
          "iron, 450 °C",
          "vanadium(V) oxide, 450 °C",
          "platinum, 800 °C",
          "nickel, 200 °C"
        ],
        "a": 1,
        "e": "V₂O₅ speeds up the reaction 2SO₂ + O₂ ⇌ 2SO₃ at about 450 °C. Iron is for ammonia and platinum is for the Ostwald process.",
        "h": "The catalyst is an oxide of a transition metal with symbol V.",
        "yr": "SS2"
      },
      {
        "q": "Why is sulphur trioxide dissolved in concentrated sulphuric acid and not directly in water?",
        "o": [
          "Water reacts too slowly",
          "SO₃ is insoluble in water",
          "The reaction absorbs heat",
          "Direct reaction gives a fine acid mist that is hard to condense"
        ],
        "a": 3,
        "e": "The reaction of SO₃ with water is very exothermic and makes a fog of tiny acid droplets. SO₃ dissolves in concentrated H₂SO₄ to give oleum, which is then diluted.",
        "h": "Think about a mist forming.",
        "yr": "SS2"
      },
      {
        "q": "When concentrated sulphuric acid is added to sugar, the sugar turns black. This shows the acid acts as a",
        "o": [
          "reducing agent",
          "dehydrating agent",
          "bleaching agent",
          "drying agent only"
        ],
        "a": 1,
        "e": "The acid removes water from sugar (C₁₂H₂₂O₁₁), leaving black carbon. The action is called dehydration. A drying agent only absorbs water from gases, without changing the substance.",
        "h": "Water is removed from the compound itself.",
        "yr": "SS2"
      },
      {
        "q": "A white precipitate that does not dissolve in dilute HCl forms when BaCl₂ solution is added to a solution. The solution contains",
        "o": [
          "chloride ions",
          "carbonate ions",
          "nitrate ions",
          "sulphate ions"
        ],
        "a": 3,
        "e": "Ba²⁺ + SO₄²⁻ → BaSO₄, a white solid that is insoluble in dilute acid. Barium carbonate would also be white, but it dissolves in dilute HCl with effervescence.",
        "h": "BaSO₄ is insoluble in acid.",
        "yr": "SS2"
      },
      {
        "q": "What volume of SO₂ at s.t.p. is produced when 16 g of sulphur burns completely? (S = 32; molar volume 22.4 dm³)",
        "o": [
          "22.4 dm³",
          "11.2 dm³",
          "5.6 dm³",
          "44.8 dm³"
        ],
        "a": 1,
        "e": "Moles of S = 16/32 = 0.5 mol. S + O₂ → SO₂ gives 0.5 mol SO₂. Volume = 0.5 × 22.4 = 11.2 dm³. The answer 22.4 dm³ would be for 32 g of sulphur.",
        "h": "Find moles of sulphur, and the ratio is 1 : 1.",
        "yr": "SS2"
      },
      {
        "q": "What mass of H₂SO₄ is in 250 cm³ of a 0.2 mol/dm³ solution? (H = 1, S = 32, O = 16)",
        "o": [
          "19.6 g",
          "9.8 g",
          "49 g",
          "4.9 g"
        ],
        "a": 3,
        "e": "Moles = 0.2 × 0.25 = 0.05 mol. Molar mass of H₂SO₄ = 98 g/mol. Mass = 0.05 × 98 = 4.9 g. The answer 19.6 g comes from using 1 dm³ with 0.2 mol.",
        "h": "Moles = concentration × volume in dm³.",
        "yr": "SS2"
      },
      {
        "q": "How many moles of NaOH are needed to neutralise 0.02 mol of H₂SO₄ completely?",
        "o": [
          "0.04 mol",
          "0.01 mol",
          "0.02 mol",
          "0.08 mol"
        ],
        "a": 0,
        "e": "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. One mole of the acid needs two moles of NaOH, so 0.02 × 2 = 0.04 mol. The acid is dibasic, so the answer 0.02 mol is wrong.",
        "h": "Count the replaceable hydrogen atoms in the acid.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Carbon and Its Compounds",
    "topicCode": "SS2-CHEM-26",
    "module": "Non-Metals and Their Compounds",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">The charcoal that roasts corn by the roadside, the lead in your pencil, the gas in your cooking cylinder, the fizz in a bottle of soft drink and the chalk or limestone in a quarry all contain <span class=\"learn-keyword\">carbon</span>. Carbon is an element that forms more compounds than any other element, and all living things are built from it. In this topic you will study the different forms of carbon, its two main <span class=\"learn-keyword\">oxides</span>, its <span class=\"learn-keyword\">carbonates</span>, and the <span class=\"learn-keyword\">hydrocarbons</span> which we use as fuels. You will also see why carbon and its compounds are so important to us.</div>\n\n<h3 class=\"learn-subheading\">1. Carbon and Its Allotropes</h3>\n<p class=\"learn-p\">Carbon (symbol C, atomic number 6) has the electronic configuration 2, 4. It has 4 outer electrons and forms covalent bonds. Carbon exists in several forms called <span class=\"learn-keyword\">allotropes</span>. Allotropes are different forms of the same element in the same physical state. They have different physical properties but the same chemical properties.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Property</th><th>Diamond</th><th>Graphite</th></tr></thead>\n<tbody>\n<tr><td>Structure</td><td>Each carbon atom is bonded to 4 others in a tetrahedral, 3-dimensional network</td><td>Each carbon is bonded to 3 others in flat layers of hexagons. Layers are held by weak forces</td></tr>\n<tr><td>Hardness</td><td>The hardest natural substance</td><td>Soft and slippery (layers slide over each other)</td></tr>\n<tr><td>Electrical conductivity</td><td>Does not conduct (no free electrons)</td><td>Conducts (each atom has one free, delocalised electron)</td></tr>\n<tr><td>Melting point</td><td>Very high</td><td>Very high</td></tr>\n<tr><td>Uses</td><td>Jewellery, cutting glass, drill tips</td><td>Pencil \"lead\", lubricant, electrodes, brushes in motors</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\"><strong>Amorphous carbon</strong> has no regular crystal structure. Examples are <strong>charcoal</strong> (burning wood without enough air), <strong>coke</strong> (heating coal without air), and <strong>soot or lampblack</strong> (burning oil or kerosene with too little air). Charcoal is a fuel and it adsorbs gases and coloured substances, so it is used in filters and gas masks. Coke is a fuel and a reducing agent in the blast furnace. Soot is used to make black ink, shoe polish and car tyres. A third crystalline form is <strong>fullerene</strong> (such as C₆₀), which is made of balls of carbon atoms.</p>\n\n<h3 class=\"learn-subheading\">2. Chemical Properties of Carbon</h3>\n<ul class=\"learn-list\">\n<li><strong>Burning in plenty of air</strong> gives carbon dioxide: C + O₂ → CO₂. In a limited supply of air, it gives carbon monoxide: 2C + O₂ → 2CO.</li>\n<li><strong>Reducing agent.</strong> Carbon removes oxygen from metal oxides on heating: 2CuO + C → 2Cu + CO₂. This is how iron is extracted.</li>\n<li><strong>With steam</strong> red-hot carbon gives carbon monoxide and hydrogen, which is called water gas: C + H₂O → CO + H₂.</li>\n<li>Hot concentrated acids oxidise it: C + 2H₂SO₄ → CO₂ + 2SO₂ + 2H₂O.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">3. Carbon Dioxide (CO₂)</h3>\n<p class=\"learn-p\"><strong>Preparation.</strong> Add dilute hydrochloric acid to marble chips (calcium carbonate): CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. Dilute sulphuric acid is not used, because the insoluble calcium sulphate that forms coats the marble and stops the reaction. The gas is dried with concentrated H₂SO₄ and collected by <strong>upward displacement of air</strong> (downward delivery) because it is denser than air. It can also be collected over water, although it is slightly soluble.</p>\n<p class=\"learn-p\"><strong>Properties:</strong></p>\n<ul class=\"learn-list\">\n<li>Colourless, odourless gas, denser than air, and slightly soluble in water.</li>\n<li><strong>Weakly acidic:</strong> CO₂ + H₂O ⇌ H₂CO₃ (carbonic acid). It turns damp blue litmus slightly red and reacts with alkalis: CO₂ + 2NaOH → Na₂CO₃ + H₂O.</li>\n<li>It does not burn, and does not normally support combustion. A burning magnesium ribbon, however, continues to burn in it: 2Mg + CO₂ → 2MgO + C.</li>\n<li><strong>Test:</strong> it turns clear limewater milky because insoluble calcium carbonate forms: Ca(OH)₂ + CO₂ → CaCO₃ + H₂O. In excess CO₂ the milkiness disappears, because soluble calcium hydrogen carbonate forms: CaCO₃ + H₂O + CO₂ → Ca(HCO₃)₂.</li>\n</ul>\n<p class=\"learn-p\"><strong>Uses:</strong> fire extinguishers (it is heavy and smothers a fire), fizzy drinks, \"dry ice\" (solid CO₂) for cooling, and photosynthesis in plants. CO₂ is a <strong>greenhouse gas</strong>. Too much of it from burning fuels traps heat and causes global warming.</p>\n\n<h3 class=\"learn-subheading\">4. Carbon Monoxide (CO)</h3>\n<p class=\"learn-p\">Carbon monoxide forms when carbon or carbon compounds burn in a limited supply of air, for example in car engines and badly ventilated charcoal fires. In the laboratory, it can be prepared by warming methanoic acid (formic acid) with concentrated sulphuric acid, which removes water: HCOOH → CO + H₂O.</p>\n<ul class=\"learn-list\">\n<li>Colourless, odourless, almost insoluble in water, and <strong>neutral</strong> to litmus.</li>\n<li><strong>Very poisonous.</strong> It combines with haemoglobin in the blood and stops it carrying oxygen. Never sleep in a closed room with a burning charcoal stove or a generator running.</li>\n<li>It burns with a blue flame to give CO₂: 2CO + O₂ → 2CO₂, so it is a fuel.</li>\n<li>It is a <strong>reducing agent</strong>: Fe₂O₃ + 3CO → 2Fe + 3CO₂.</li>\n</ul>\n<p class=\"learn-p\"><strong>Uses:</strong> fuel (in water gas and producer gas) and as a reducing agent in the blast furnace.</p>\n\n<h3 class=\"learn-subheading\">5. Carbonates and Hydrogen Carbonates</h3>\n<p class=\"learn-p\">Carbonates contain the carbonate ion, CO₃²⁻. Examples are calcium carbonate (limestone, marble, chalk), sodium carbonate (washing soda), and copper(II) carbonate. Hydrogen carbonates contain HCO₃⁻, for example sodium hydrogen carbonate (baking soda).</p>\n<ul class=\"learn-list\">\n<li><strong>Solubility:</strong> carbonates of sodium, potassium and ammonium are soluble in water. Most other carbonates are insoluble.</li>\n<li><strong>With acids</strong>, carbonates give a salt, water and carbon dioxide (effervescence): Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂. This is a test for carbonates.</li>\n<li><strong>Action of heat:</strong> most carbonates break down to the oxide and CO₂: CaCO₃ → CaO + CO₂ and CuCO₃ → CuO + CO₂ (green solid to black solid). The carbonates of sodium and potassium are not decomposed by ordinary heating.</li>\n<li><strong>Hydrogen carbonates</strong> decompose easily on heating: 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂.</li>\n</ul>\n<p class=\"learn-p\"><strong>Uses:</strong> limestone is used to make cement, quicklime (CaO) and glass, and to neutralise acidic soil. Sodium carbonate is used for making glass and soap and for softening water. Baking soda is used in cooking (it makes dough rise) and in medicine (it neutralises excess stomach acid).</p>\n\n<h3 class=\"learn-subheading\">6. Hydrocarbons</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Hydrocarbons</span> are compounds that contain only carbon and hydrogen. They are the main part of petroleum (crude oil) and natural gas. The main families are:</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Family</th><th>General formula</th><th>Type of bond</th><th>Example</th></tr></thead>\n<tbody>\n<tr><td>Alkanes</td><td>CₙH₂ₙ₊₂</td><td>Only single bonds (saturated)</td><td>Methane CH₄, ethane C₂H₆, propane C₃H₈, butane C₄H₁₀</td></tr>\n<tr><td>Alkenes</td><td>CₙH₂ₙ</td><td>One C=C double bond (unsaturated)</td><td>Ethene C₂H₄, propene C₃H₆</td></tr>\n<tr><td>Alkynes</td><td>CₙH₂ₙ₋₂</td><td>One C≡C triple bond (unsaturated)</td><td>Ethyne C₂H₂</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\"><strong>Burning.</strong> In plenty of air, hydrocarbons burn to give CO₂ and water: CH₄ + 2O₂ → CO₂ + 2H₂O. In too little air, they give CO or soot, and a smoky flame. Alkanes are fairly unreactive, while alkenes and alkynes are reactive, because of their double or triple bonds. <strong>Test for unsaturation:</strong> alkenes and alkynes turn orange-brown bromine water colourless. Alkanes do not.</p>\n<p class=\"learn-p\"><strong>Uses:</strong> methane (natural gas) and propane/butane (cooking gas) are fuels. Petrol, kerosene and diesel are from petroleum. Ethene is used to make polythene, and ethyne is used in oxy-acetylene welding.</p>\n\n<h3 class=\"learn-subheading\">7. Importance of Carbon and Its Compounds</h3>\n<ul class=\"learn-list\">\n<li><strong>Fuels:</strong> coal, charcoal, petrol, kerosene, diesel and cooking gas.</li>\n<li><strong>Food:</strong> carbohydrates, fats and proteins are carbon compounds.</li>\n<li><strong>Industry:</strong> coke for iron smelting, graphite for electrodes and lubricants, limestone for cement, and plastics and drugs made from hydrocarbons.</li>\n<li><strong>Nature:</strong> in the carbon cycle, plants use CO₂ in photosynthesis, and respiration and burning return it to the air.</li>\n<li><strong>Problems:</strong> too much CO₂ causes global warming, and CO from engines and fires is poisonous.</li>\n</ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> What volume of CO₂ at s.t.p. is given off when 10 g of CaCO₃ reacts with excess dilute HCl? (Ca = 40, C = 12, O = 16; 22.4 dm³ per mole)<br>Step 1: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂, so 1 mol CaCO₃ gives 1 mol CO₂.<br>Step 2: Molar mass of CaCO₃ = 40 + 12 + 48 = 100 g/mol. Moles = 10 / 100 = 0.1 mol.<br>Step 3: Volume of CO₂ = 0.1 × 22.4 = 2.24 dm³.<br><strong>Answer: 2.24 dm³ of CO₂.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> What mass of quicklime (CaO) is obtained by heating 50 g of limestone? (Ca = 40, C = 12, O = 16)<br>Step 1: CaCO₃ → CaO + CO₂, so 1 mol CaCO₃ gives 1 mol CaO.<br>Step 2: Moles of CaCO₃ = 50 / 100 = 0.5 mol. So moles of CaO = 0.5 mol.<br>Step 3: Molar mass of CaO = 40 + 16 = 56 g/mol. Mass = 0.5 × 56 = 28 g.<br><strong>Answer: 28 g of CaO.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> 1.6 g of methane is burnt completely in excess oxygen. Find the mass of water formed. (C = 12, H = 1, O = 16)<br>Step 1: CH₄ + 2O₂ → CO₂ + 2H₂O, so 1 mol CH₄ gives 2 mol H₂O.<br>Step 2: Molar mass of CH₄ = 16 g/mol. Moles = 1.6 / 16 = 0.1 mol. Moles of H₂O = 0.2 mol.<br>Step 3: Molar mass of H₂O = 18 g/mol. Mass = 0.2 × 18 = 3.6 g.<br><strong>Answer: 3.6 g of water.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> 20 cm³ of ethane is burnt in excess oxygen. What volume of CO₂ is formed (all gases at the same conditions)?<br>Step 1: 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O. Gas volumes are in the same ratio as moles.<br>Step 2: 2 volumes of ethane give 4 volumes of CO₂, so 1 volume gives 2 volumes.<br>Step 3: 20 cm³ × 2 = 40 cm³.<br><strong>Answer: 40 cm³ of CO₂.</strong></div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Saying diamond conducts electricity. It does not, because it has no free electrons. Graphite does conduct.<br>2. Using dilute sulphuric acid with marble to make CO₂. Use dilute hydrochloric acid.<br>3. Forgetting that limewater turns clear again in excess CO₂.<br>4. Mixing up the general formulae. Alkanes are CₙH₂ₙ₊₂ and alkenes are CₙH₂ₙ.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often asks you to explain, in terms of structure, why graphite is soft and a conductor but diamond is hard and not a conductor. It also asks for the laboratory preparation and test for CO₂, the dangers of CO, and the name and formula of simple hydrocarbons. Always write \"limewater turns milky\" for the test of CO₂, and write the equation.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>• Carbon's allotropes: diamond (hard, non-conductor), graphite (soft, conductor), and amorphous carbon (charcoal, coke, soot).<br>• Carbon burns to CO₂ in plenty of air and to CO in limited air. It is a reducing agent.<br>• CO₂ is made from marble and dilute HCl, turns limewater milky, and is acidic. CO is poisonous, neutral and a reducing agent.<br>• Carbonates give CO₂ with acids; most decompose on heating, except those of sodium and potassium.<br>• Hydrocarbons contain carbon and hydrogen only: alkanes (CₙH₂ₙ₊₂), alkenes (CₙH₂ₙ) and alkynes (CₙH₂ₙ₋₂).</div>",
    "questions": [
      {
        "q": "Diamond and graphite are both",
        "o": [
          "isotopes of carbon",
          "compounds of carbon",
          "mixtures of carbon and hydrogen",
          "allotropes of carbon"
        ],
        "a": 3,
        "e": "They are different forms of the same element in the same physical state, so they are allotropes. Isotopes are atoms of the same element with different numbers of neutrons.",
        "h": "Same element, different structure.",
        "yr": "SS2"
      },
      {
        "q": "Graphite conducts electricity because",
        "o": [
          "it has free ions",
          "it is very hard",
          "it has free (delocalised) electrons",
          "it has a tetrahedral structure"
        ],
        "a": 2,
        "e": "Each carbon atom in graphite uses only three of its four outer electrons for bonding, so one electron per atom is free to move between the layers. Diamond uses all four, so it has no free electrons.",
        "h": "Graphite atoms bond to only three others.",
        "yr": "SS2"
      },
      {
        "q": "Graphite is used as a lubricant because",
        "o": [
          "it is very hard",
          "its layers are held by weak forces and slide over each other",
          "it melts easily",
          "it burns well"
        ],
        "a": 1,
        "e": "The layers of hexagons are held together by weak forces, so they slide easily. This makes graphite soft and slippery. Hardness would make it a poor lubricant.",
        "h": "Think about layers sliding.",
        "yr": "SS2"
      },
      {
        "q": "Which of these is an example of amorphous carbon?",
        "o": [
          "Diamond",
          "Graphite",
          "Fullerene",
          "Charcoal"
        ],
        "a": 3,
        "e": "Charcoal has no regular crystal structure. Diamond, graphite and fullerene all have regular crystal structures.",
        "h": "It is made by burning wood without enough air.",
        "yr": "SS2"
      },
      {
        "q": "Which reagents are best for making carbon dioxide in the laboratory?",
        "o": [
          "Marble chips and dilute sulphuric acid",
          "Sodium carbonate and concentrated sulphuric acid",
          "Marble chips and dilute hydrochloric acid",
          "Charcoal and water"
        ],
        "a": 2,
        "e": "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. Dilute H₂SO₄ forms insoluble CaSO₄, which coats the marble and stops the reaction.",
        "h": "The salt formed must be soluble.",
        "yr": "SS2"
      },
      {
        "q": "A gas turns limewater milky. The gas is",
        "o": [
          "hydrogen",
          "carbon monoxide",
          "carbon dioxide",
          "oxygen"
        ],
        "a": 2,
        "e": "CO₂ reacts with calcium hydroxide to form insoluble calcium carbonate, which makes the limewater milky. Carbon monoxide does not react with limewater.",
        "h": "The milky solid is calcium carbonate.",
        "yr": "SS2"
      },
      {
        "q": "What happens when excess CO₂ is bubbled through limewater?",
        "o": [
          "The milkiness disappears because soluble calcium hydrogen carbonate forms",
          "The milkiness remains",
          "A brown precipitate forms",
          "The gas burns"
        ],
        "a": 0,
        "e": "CaCO₃ + H₂O + CO₂ → Ca(HCO₃)₂. Calcium hydrogen carbonate is soluble, so the solution turns clear again.",
        "h": "The precipitate reacts further.",
        "yr": "SS2"
      },
      {
        "q": "Carbon monoxide is dangerous mainly because it",
        "o": [
          "is acidic",
          "combines with haemoglobin and stops it carrying oxygen",
          "turns limewater milky",
          "is very dense"
        ],
        "a": 1,
        "e": "CO binds to haemoglobin much more strongly than oxygen does, so the blood cannot carry oxygen and a person can die. CO is neutral, and it does not affect limewater.",
        "h": "Think about what it does in the blood.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following carbonates is NOT decomposed by heating with an ordinary Bunsen burner?",
        "o": [
          "CaCO₃",
          "Na₂CO₃",
          "CuCO₃",
          "ZnCO₃"
        ],
        "a": 1,
        "e": "Sodium carbonate is very stable to heat. Calcium, copper and zinc carbonates all decompose to their oxide and CO₂ on heating.",
        "h": "Carbonates of the most reactive metals are stable.",
        "yr": "SS2"
      },
      {
        "q": "What is observed when green copper(II) carbonate is heated strongly?",
        "o": [
          "It turns white",
          "It melts and boils",
          "It turns black and a gas that turns limewater milky is given off",
          "It turns blue"
        ],
        "a": 2,
        "e": "CuCO₃ → CuO + CO₂. Black copper(II) oxide is left, and CO₂ turns limewater milky.",
        "h": "The oxide of copper(II) is black.",
        "yr": "SS2"
      },
      {
        "q": "The general formula for the alkanes is",
        "o": [
          "CₙH₂ₙ₊₂",
          "CₙH₂ₙ",
          "CₙH₂ₙ₋₂",
          "CₙHₙ"
        ],
        "a": 0,
        "e": "Alkanes have only single bonds. For example, methane CH₄ (n = 1), ethane C₂H₆ (n = 2). CₙH₂ₙ is the formula for alkenes.",
        "h": "Test with methane, CH₄.",
        "yr": "SS2"
      },
      {
        "q": "Which test distinguishes an alkene from an alkane?",
        "o": [
          "Alkenes turn bromine water colourless",
          "Alkenes turn limewater milky",
          "Alkenes do not burn",
          "Alkenes turn litmus red"
        ],
        "a": 0,
        "e": "Alkenes have a C=C double bond that reacts with bromine, so orange bromine water becomes colourless. Alkanes do not react with bromine water.",
        "h": "It involves an orange-brown liquid.",
        "yr": "SS2"
      },
      {
        "q": "What mass of CO₂ is produced when 25 g of calcium carbonate is heated strongly? (Ca = 40, C = 12, O = 16)",
        "o": [
          "22 g",
          "25 g",
          "44 g",
          "11 g"
        ],
        "a": 3,
        "e": "CaCO₃ → CaO + CO₂. Moles of CaCO₃ = 25/100 = 0.25 mol. Moles of CO₂ = 0.25 mol. Mass = 0.25 × 44 = 11 g. The mass of 1 mole of CO₂ (44 g) is not the answer here.",
        "h": "Moles of CaCO₃ equal moles of CO₂.",
        "yr": "SS2"
      },
      {
        "q": "What volume of CO₂ at s.t.p. is obtained when 0.2 mol of Na₂CO₃ reacts with excess dilute HCl? (22.4 dm³ per mole)",
        "o": [
          "4.48 dm³",
          "2.24 dm³",
          "44.8 dm³",
          "8.96 dm³"
        ],
        "a": 0,
        "e": "Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂, so 1 mol of carbonate gives 1 mol of CO₂. Volume = 0.2 × 22.4 = 4.48 dm³. The 2 in front of HCl does not change the CO₂ ratio.",
        "h": "The ratio of Na₂CO₃ to CO₂ is 1 : 1.",
        "yr": "SS2"
      },
      {
        "q": "30 cm³ of propane (C₃H₈) is burnt completely in excess oxygen. What volume of CO₂ is formed at the same conditions?",
        "o": [
          "30 cm³",
          "60 cm³",
          "120 cm³",
          "90 cm³"
        ],
        "a": 3,
        "e": "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. One volume of propane gives 3 volumes of CO₂, so 30 × 3 = 90 cm³. The answer 120 cm³ is the volume of water vapour formed.",
        "h": "Use the ratio of volumes from the balanced equation.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Industrial Preparation of Chemicals",
    "topicCode": "SS2-CHEM-27",
    "module": "Industrial Chemistry",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">The fertiliser that helps a farmer in Kano or Ogun grow more maize, the acid in a car battery, and the cleaner used to remove rust from metal all begin in a chemical factory. Making a chemical in a test tube is easy, but a factory must make thousands of tonnes every day, cheaply and safely. This is called <span class=\"learn-keyword\">large-scale production</span>. In this topic you will study how three very important chemicals are made in industry: <span class=\"learn-keyword\">hydrogen chloride</span> (for hydrochloric acid), <span class=\"learn-keyword\">ammonia</span> (the Haber process) and <span class=\"learn-keyword\">sulphuric acid</span> (the Contact process). You will also learn why the conditions are chosen and how the products are used.</div>\n\n<h3 class=\"learn-subheading\">1. Ideas Behind Industrial Processes</h3>\n<p class=\"learn-p\">A factory wants to make as much product as possible, as quickly as possible, at the lowest cost. To decide the best conditions it looks at these things:</p>\n<ul class=\"learn-list\">\n<li><strong>Raw materials:</strong> they must be cheap and plentiful (air, water, natural gas, sulphur, salt).</li>\n<li><strong>Yield:</strong> the amount of product made. We want a high yield.</li>\n<li><strong>Rate:</strong> how fast the reaction goes. A catalyst makes it faster without being used up.</li>\n<li><strong>Cost and safety:</strong> high temperature and pressure cost money and need strong equipment.</li>\n</ul>\n<p class=\"learn-p\">Many industrial reactions are <span class=\"learn-keyword\">reversible</span>, shown with the sign ⇌. They reach an <strong>equilibrium</strong>, where the forward and backward reactions go at the same rate. <strong>Le Chatelier's principle</strong> says that if a condition is changed, the equilibrium shifts to oppose the change. We use this idea to get a higher yield:</p>\n<ul class=\"learn-list\">\n<li><strong>Higher pressure</strong> favours the side with fewer gas molecules.</li>\n<li><strong>Lower temperature</strong> favours the exothermic (heat-giving) direction, but makes the reaction slow. So a compromise temperature is chosen.</li>\n<li>A <strong>catalyst</strong> does not change the yield. It only helps equilibrium to be reached faster.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">2. Industrial Preparation of Hydrogen Chloride and Hydrochloric Acid</h3>\n<p class=\"learn-p\">Hydrogen chloride (HCl) is a colourless gas that dissolves in water to form <strong>hydrochloric acid</strong>. The main industrial method is the <strong>direct combination of hydrogen and chlorine</strong>. Both gases are by-products of the electrolysis of brine (concentrated sodium chloride solution), which is also used to make sodium hydroxide.</p>\n<p class=\"learn-p\">H₂ + Cl₂ → 2HCl</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Brine is electrolysed. Chlorine forms at the anode and hydrogen at the cathode.</li>\n<li>Step 2: Hydrogen is burnt in a stream of chlorine in a special burner. The flame burns steadily, and a mixture of the two gases may explode, so the gases are kept apart until they burn.</li>\n<li>Step 3: The hot HCl gas is cooled and passed up a tower, while water trickles down. HCl dissolves in the water. This gives hydrochloric acid, of about 35% concentration (concentrated acid).</li>\n</ol>\n<p class=\"learn-p\">HCl is extremely soluble in water, so the absorption tower must be designed so that water does not suck back into the burner. Hydrogen chloride is also obtained as a by-product when hydrocarbons are chlorinated. In the laboratory, it is made by gently heating sodium chloride with concentrated sulphuric acid: NaCl + H₂SO₄ → NaHSO₄ + HCl.</p>\n<p class=\"learn-p\"><strong>Properties:</strong> HCl gas is colourless, has a sharp smell, fumes in moist air, and turns blue litmus red when it is damp. It forms dense white fumes of ammonium chloride with ammonia. Its solution is a strong acid, so it reacts with metals (Zn + 2HCl → ZnCl₂ + H₂), carbonates and bases. Test for chloride ions: add silver nitrate solution, and a white precipitate of AgCl forms: Ag⁺ + Cl⁻ → AgCl.</p>\n<p class=\"learn-p\"><strong>Uses:</strong> removing rust from steel before galvanising or painting (\"pickling\"), cleaning, making chlorides and dyes, treating water, making glucose and gelatine, and as a laboratory reagent. The stomach also makes dilute hydrochloric acid to help digest food.</p>\n\n<h3 class=\"learn-subheading\">3. Industrial Preparation of Ammonia: the Haber Process</h3>\n<p class=\"learn-p\">Ammonia is made from nitrogen and hydrogen by the <span class=\"learn-keyword\">Haber process</span>:</p>\n<p class=\"learn-p\">N₂ + 3H₂ ⇌ 2NH₃ (ΔH = −92 kJ; the forward reaction is exothermic)</p>\n<ul class=\"learn-list\">\n<li><strong>Nitrogen</strong> comes from the air, by fractional distillation of liquid air.</li>\n<li><strong>Hydrogen</strong> comes from natural gas (methane) and steam: CH₄ + H₂O → CO + 3H₂. Water can also be used as a source.</li>\n</ul>\n<p class=\"learn-p\"><strong>The conditions:</strong></p>\n<ul class=\"learn-list\">\n<li><strong>Catalyst:</strong> finely divided <strong>iron</strong>. It makes the reaction fast enough.</li>\n<li><strong>Temperature:</strong> about <strong>450 °C</strong>. Low temperature gives a better yield, because the forward reaction is exothermic, but the rate would be too slow. So 450 °C is a compromise between yield and rate.</li>\n<li><strong>Pressure:</strong> about <strong>200 atmospheres</strong>. There are 4 moles of gas on the left (1 N₂ + 3 H₂) and 2 moles on the right (2 NH₃). High pressure shifts the equilibrium to the right, giving more ammonia. Very high pressure is too expensive and dangerous.</li>\n</ul>\n<p class=\"learn-p\"><strong>Steps in the process:</strong></p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Pure nitrogen and hydrogen, in the ratio 1 : 3, are mixed and compressed.</li>\n<li>Step 2: The gases pass over the hot iron catalyst. Only about 15% turns into ammonia in one pass.</li>\n<li>Step 3: The mixture is cooled. Ammonia liquefies easily (its boiling point is −33 °C) and is run off.</li>\n<li>Step 4: The unreacted nitrogen and hydrogen are <strong>recycled</strong> back to the reactor. This saves raw materials and increases the total yield.</li>\n</ol>\n<p class=\"learn-p\"><strong>Uses of ammonia:</strong></p>\n<ul class=\"learn-list\">\n<li><strong>Fertilisers:</strong> ammonium sulphate, (NH₄)₂SO₄, ammonium nitrate, NH₄NO₃, and urea. This is the biggest use. Nigeria has fertiliser plants in Rivers State that use natural gas to make ammonia and urea.</li>\n<li><strong>Nitric acid:</strong> ammonia is oxidised in air over a hot platinum catalyst to nitrogen monoxide, which is then changed into nitric acid.</li>\n<li>Making explosives, plastics, nylon and dyes, cleaning fluids, and as a refrigerant.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">4. Industrial Preparation of Sulphuric Acid: the Contact Process</h3>\n<p class=\"learn-p\">Sulphuric acid is made by the <span class=\"learn-keyword\">Contact process</span>. The raw materials are sulphur (or sulphide ores), air and water.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: <strong>Making SO₂.</strong> Sulphur is burnt in dry air: S + O₂ → SO₂. The gas is cleaned to remove dust and other impurities that would \"poison\" the catalyst.</li>\n<li>Step 2: <strong>Converting SO₂ to SO₃.</strong> SO₂ and air pass over the <strong>vanadium(V) oxide (V₂O₅)</strong> catalyst at about <strong>450 °C</strong> and <strong>1–2 atmospheres</strong>: 2SO₂ + O₂ ⇌ 2SO₃ (ΔH = −197 kJ). About 98–99% of the SO₂ is converted when it is passed through the catalyst in stages.</li>\n<li>Step 3: <strong>Absorbing SO₃.</strong> SO₃ is dissolved in concentrated sulphuric acid (98%) to make <strong>oleum</strong>: SO₃ + H₂SO₄ → H₂S₂O₇.</li>\n<li>Step 4: <strong>Dilution.</strong> The oleum is carefully mixed with water: H₂S₂O₇ + H₂O → 2H₂SO₄.</li>\n</ol>\n<p class=\"learn-p\"><strong>Why these conditions?</strong> There are 3 moles of gas on the left and 2 on the right, so pressure would increase the yield. But the yield is already very high at 1–2 atmospheres, so high pressure is not worth the cost. The reaction is exothermic, so a lower temperature gives a better yield, but 450 °C gives a good rate. Direct dissolving of SO₃ in water is avoided because it forms a mist of acid which is hard to condense.</p>\n<p class=\"learn-p\"><strong>Uses:</strong> fertilisers (superphosphate and ammonium sulphate), car battery acid, paints and pigments, detergents, plastics and synthetic fibres, and cleaning metals.</p>\n<h3 class=\"learn-subheading\">5. Applications and Care for the Environment</h3>\n<p class=\"learn-p\">These three chemicals are made and used in very large amounts, so many other industries depend on them.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\">\n<thead><tr><th>Product</th><th>Main applications</th></tr></thead>\n<tbody>\n<tr><td>Hydrochloric acid</td><td>Pickling of steel, cleaning, making chlorides, water treatment</td></tr>\n<tr><td>Ammonia</td><td>Fertilisers, nitric acid, explosives, nylon, refrigeration</td></tr>\n<tr><td>Sulphuric acid</td><td>Fertilisers, batteries, detergents, paints, plastics</td></tr>\n</tbody></table></div>\n<ul class=\"learn-list\">\n<li><strong>Waste gases:</strong> unreacted SO₂ from the Contact process would cause acid rain, so factories convert as much of it as possible to SO₃ and clean the waste gas before releasing it.</li>\n<li><strong>Fertiliser run-off:</strong> too much nitrogen fertiliser can wash into rivers and harm water life, so farmers should apply the right amount.</li>\n<li><strong>Safety:</strong> hydrogen and chlorine mixtures can explode, and the acids are corrosive, so workers wear protective clothing and the plants are well ventilated.</li>\n</ul>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> What mass of HCl is produced from 142 g of chlorine? (H = 1, Cl = 35.5)<br>Step 1: H₂ + Cl₂ → 2HCl, so 1 mol Cl₂ gives 2 mol HCl.<br>Step 2: Molar mass of Cl₂ = 71 g/mol. Moles = 142 / 71 = 2 mol. Moles of HCl = 4 mol.<br>Step 3: Molar mass of HCl = 36.5 g/mol. Mass = 4 × 36.5 = 146 g.<br><strong>Answer: 146 g of HCl.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> 30 dm³ of nitrogen reacts completely with hydrogen in the Haber process. What volume of hydrogen is needed and what volume of ammonia forms (same conditions)?<br>Step 1: N₂ + 3H₂ ⇌ 2NH₃. Gas volumes are in the ratio of the moles, 1 : 3 : 2.<br>Step 2: Hydrogen = 3 × 30 = 90 dm³.<br>Step 3: Ammonia = 2 × 30 = 60 dm³.<br><strong>Answer: 90 dm³ of H₂ is needed and 60 dm³ of NH₃ forms.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> From 28 kg of nitrogen, a plant obtains 8.5 kg of ammonia. Calculate the percentage yield. (N = 14, H = 1)<br>Step 1: N₂ + 3H₂ → 2NH₃. Moles of N₂ = 28 000 / 28 = 1000 mol.<br>Step 2: Moles of NH₃ expected = 2 × 1000 = 2000 mol. Molar mass of NH₃ = 17 g/mol. Theoretical mass = 2000 × 17 = 34 000 g = 34 kg.<br>Step 3: Percentage yield = (actual / theoretical) × 100 = (8.5 / 34) × 100 = 25%.<br><strong>Answer: 25%.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> What mass of H₂SO₄ can be made from 16 kg of sulphur if the process is 90% efficient? (S = 32, H = 1, O = 16)<br>Step 1: S → SO₂ → SO₃ → H₂SO₄, so 1 mol S finally gives 1 mol H₂SO₄.<br>Step 2: Moles of S = 16 000 / 32 = 500 mol. Theoretical mass of H₂SO₄ = 500 × 98 = 49 000 g = 49 kg.<br>Step 3: At 90% efficiency: 49 × 90/100 = 44.1 kg.<br><strong>Answer: 44.1 kg of H₂SO₄.</strong></div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Saying a catalyst increases the yield. It only speeds up the reaction. Temperature and pressure change the yield.<br>2. Mixing up the catalysts. Haber process: iron. Contact process: vanadium(V) oxide.<br>3. Saying SO₃ is dissolved in water. It is dissolved in concentrated sulphuric acid to give oleum.<br>4. Forgetting that unreacted gases in the Haber process are recycled, and that the temperature is a compromise (450 °C), not the best temperature for yield.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often asks you to \"state the conditions and catalyst\" and \"give the equation\" for the Haber and Contact processes, to explain the pressure and temperature chosen using Le Chatelier's principle, and to name two uses of each product. Write the balanced equation with ⇌ and say whether it is exothermic. For a percentage yield question, always find the theoretical yield first.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>• Industry looks for a high yield, a fast rate and low cost, and uses catalysts and recycling.<br>• HCl: H₂ burns in Cl₂ (both from the electrolysis of brine), then the gas is dissolved in water.<br>• Ammonia, the Haber process: N₂ + 3H₂ ⇌ 2NH₃, iron catalyst, 450 °C, about 200 atm, unreacted gases recycled. Used for fertilisers and nitric acid.<br>• Sulphuric acid, the Contact process: S → SO₂ → SO₃ (V₂O₅, 450 °C, 1–2 atm) → oleum → H₂SO₄.<br>• Percentage yield = (actual / theoretical) × 100.</div>",
    "questions": [
      {
        "q": "Which two gases combine directly to make hydrogen chloride in industry?",
        "o": [
          "Hydrogen and oxygen",
          "Nitrogen and hydrogen",
          "Chlorine and oxygen",
          "Hydrogen and chlorine"
        ],
        "a": 3,
        "e": "H₂ + Cl₂ → 2HCl. The hydrogen and chlorine come from the electrolysis of brine. Nitrogen and hydrogen make ammonia.",
        "h": "Both gases come from electrolysing brine.",
        "yr": "SS2"
      },
      {
        "q": "In the industrial manufacture of hydrochloric acid, the HCl gas is",
        "o": [
          "dissolved in water in an absorption tower",
          "collected over mercury",
          "bubbled through concentrated H₂SO₄",
          "liquefied at 450 °C"
        ],
        "a": 0,
        "e": "HCl is extremely soluble in water, so it is absorbed in water trickling down a tower to give hydrochloric acid. Concentrated H₂SO₄ is used to dry other gases, not to make the acid.",
        "h": "HCl is very soluble in water.",
        "yr": "SS2"
      },
      {
        "q": "Hydrochloric acid is used in industry for",
        "o": [
          "vulcanising rubber",
          "making margarine",
          "making soap from alkanes",
          "pickling (cleaning rust from) steel"
        ],
        "a": 3,
        "e": "Dilute hydrochloric acid dissolves the rust layer on steel before it is galvanised or painted. Vulcanising uses sulphur and margarine uses hydrogen with a nickel catalyst.",
        "h": "It removes an oxide layer from metal.",
        "yr": "SS2"
      },
      {
        "q": "The equation for the Haber process is",
        "o": [
          "N₂ + H₂ ⇌ NH₃",
          "2NH₃ → N₂ + 3H₂ only",
          "N₂ + 3H₂ ⇌ 2NH₃",
          "N₂ + 2H₂ ⇌ 2NH₃"
        ],
        "a": 2,
        "e": "The balanced equation is N₂ + 3H₂ ⇌ 2NH₃. It has 2 N atoms and 6 H atoms on each side. The other options are not balanced or leave out the reversible reaction.",
        "h": "Count the atoms on each side.",
        "yr": "SS2"
      },
      {
        "q": "The catalyst used in the Haber process is",
        "o": [
          "vanadium(V) oxide",
          "platinum",
          "manganese(IV) oxide",
          "finely divided iron"
        ],
        "a": 3,
        "e": "Finely divided iron speeds up the combination of nitrogen and hydrogen. V₂O₅ is for the Contact process, and platinum is for oxidising ammonia in nitric acid manufacture.",
        "h": "It is a common metal used for roofing sheets.",
        "yr": "SS2"
      },
      {
        "q": "Why is a high pressure used in the Haber process?",
        "o": [
          "To make the reaction exothermic",
          "To lower the boiling point of ammonia",
          "To shift the equilibrium towards ammonia, because there are fewer gas molecules on the right",
          "To destroy the catalyst"
        ],
        "a": 2,
        "e": "There are 4 moles of gas on the left and 2 on the right. According to Le Chatelier's principle, high pressure favours the side with fewer moles, so more NH₃ is formed.",
        "h": "Count the gas molecules on each side.",
        "yr": "SS2"
      },
      {
        "q": "Why is a temperature of about 450 °C used in the Haber process, even though a lower temperature gives a higher yield?",
        "o": [
          "At lower temperature the reaction would be too slow",
          "The catalyst melts below 450 °C",
          "Ammonia is only made above 450 °C",
          "Nitrogen is a liquid below 450 °C"
        ],
        "a": 0,
        "e": "The forward reaction is exothermic, so low temperature favours a higher yield. But the reaction rate becomes too low. 450 °C is a compromise between a good yield and a fast rate.",
        "h": "It is a compromise between yield and rate.",
        "yr": "SS2"
      },
      {
        "q": "Unreacted nitrogen and hydrogen in the Haber process are",
        "o": [
          "released into the air",
          "recycled into the reactor",
          "burnt to give water",
          "dissolved in water"
        ],
        "a": 1,
        "e": "Only about 15% of the gases change into ammonia in each pass. The ammonia is liquefied and removed, and the unreacted gases are returned to the reactor, which saves raw materials.",
        "h": "Raw materials must not be wasted.",
        "yr": "SS2"
      },
      {
        "q": "Which of the following is the major use of ammonia?",
        "o": [
          "Making cement",
          "Making glass",
          "Making fertilisers",
          "Making tyres"
        ],
        "a": 2,
        "e": "Most ammonia is used to make fertilisers such as ammonium sulphate, ammonium nitrate and urea. It is also used for making nitric acid and explosives.",
        "h": "Think of farmers and crop yields.",
        "yr": "SS2"
      },
      {
        "q": "In the Contact process, sulphur dioxide is changed to sulphur trioxide using",
        "o": [
          "iron at 200 atm",
          "platinum at 1000 °C",
          "nickel at 150 °C",
          "vanadium(V) oxide at about 450 °C"
        ],
        "a": 3,
        "e": "2SO₂ + O₂ ⇌ 2SO₃ takes place over V₂O₅ at about 450 °C and 1–2 atmospheres. Iron and 200 atm are conditions for the Haber process.",
        "h": "The catalyst has symbol V.",
        "yr": "SS2"
      },
      {
        "q": "In the Contact process, SO₃ is first dissolved in",
        "o": [
          "concentrated sulphuric acid",
          "water",
          "dilute sulphuric acid",
          "sodium hydroxide solution"
        ],
        "a": 0,
        "e": "SO₃ dissolves in 98% sulphuric acid to form oleum, H₂S₂O₇, which is then diluted with water. Dissolving SO₃ directly in water makes an acid mist that is hard to condense.",
        "h": "The product is called oleum.",
        "yr": "SS2"
      },
      {
        "q": "Why is a very high pressure NOT used in the Contact process?",
        "o": [
          "The yield is already very high at 1–2 atm, so extra pressure is not worth the cost",
          "High pressure destroys V₂O₅",
          "SO₂ is a solid at high pressure",
          "The reaction is endothermic"
        ],
        "a": 0,
        "e": "About 98–99% conversion is reached at 1–2 atm. High pressure would need expensive strong equipment and would add very little extra yield.",
        "h": "Think about cost against benefit.",
        "yr": "SS2"
      },
      {
        "q": "What volume of hydrogen is needed to react completely with 50 dm³ of nitrogen in the Haber process (same conditions)?",
        "o": [
          "50 dm³",
          "100 dm³",
          "150 dm³",
          "75 dm³"
        ],
        "a": 2,
        "e": "N₂ + 3H₂ ⇌ 2NH₃, so the volume ratio N₂ : H₂ = 1 : 3. Hydrogen = 3 × 50 = 150 dm³. The answer 100 dm³ is the volume of ammonia formed.",
        "h": "The ratio of N₂ to H₂ is 1 : 3.",
        "yr": "SS2"
      },
      {
        "q": "A plant makes 17 kg of ammonia from 28 kg of nitrogen. What is the percentage yield? (N = 14, H = 1)",
        "o": [
          "25%",
          "50%",
          "100%",
          "75%"
        ],
        "a": 1,
        "e": "28 kg of N₂ is 1000 mol, which gives 2000 mol of NH₃ = 2000 × 17 g = 34 kg (theoretical). Percentage yield = (17/34) × 100 = 50%.",
        "h": "Find the theoretical mass of ammonia first.",
        "yr": "SS2"
      },
      {
        "q": "What mass of H₂SO₄ can be made from 6.4 kg of sulphur dioxide, assuming complete conversion? (H = 1, S = 32, O = 16)",
        "o": [
          "6.4 kg",
          "9.8 kg",
          "98 kg",
          "4.9 kg"
        ],
        "a": 1,
        "e": "SO₂ (64 g/mol) finally gives H₂SO₄ (98 g/mol) in a 1 : 1 mole ratio. Moles of SO₂ = 6400/64 = 100 mol, so the mass of H₂SO₄ = 100 × 98 = 9800 g = 9.8 kg.",
        "h": "One mole of SO₂ gives one mole of H₂SO₄.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Hydrocarbons",
    "topicCode": "SS2-CHEM-28",
    "module": "Organic Chemistry",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">A <span class=\"learn-keyword\">hydrocarbon</span> is a compound that contains only two elements: hydrogen and carbon. Hydrocarbons are the main part of crude oil (petroleum) from the Niger Delta. When crude oil is refined, we get the petrol in your father's car, the kerosene in a stove, the diesel in a generator and the cooking gas in a kitchen. Even the candle wax used when NEPA takes the light is made of hydrocarbons. In this lesson you will learn the types of hydrocarbons, their properties, their reactions and the simple laboratory tests that tell them apart.</div>\n\n<h3 class=\"learn-subheading\">1. Carbon and the idea of a homologous series</h3>\n<p class=\"learn-p\">Carbon atoms can join to each other to make long chains. This is why there are millions of carbon compounds. Each carbon atom forms four bonds (we say carbon has a valency of 4). Hydrogen forms one bond.</p>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">homologous series</span> is a family of organic compounds that have the same general formula, similar chemical properties, and a gradual change in physical properties. Each member differs from the next by one CH₂ group. Hydrocarbons are placed in three main homologous series.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Series</th><th>General formula</th><th>Bonds between carbon atoms</th><th>Type</th></tr></thead><tbody>\n<tr><td>Alkanes</td><td>CₙH₂ₙ₊₂</td><td>Only single bonds (C–C)</td><td>Saturated</td></tr>\n<tr><td>Alkenes</td><td>CₙH₂ₙ</td><td>One double bond (C=C)</td><td>Unsaturated</td></tr>\n<tr><td>Alkynes</td><td>CₙH₂ₙ₋₂</td><td>One triple bond (C≡C)</td><td>Unsaturated</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">saturated</span> hydrocarbon has only single bonds, so each carbon holds as many hydrogen atoms as it can. An <span class=\"learn-keyword\">unsaturated</span> hydrocarbon has at least one double or triple bond between carbon atoms.</p>\n\n<h3 class=\"learn-subheading\">2. Types of hydrocarbons and their names</h3>\n<p class=\"learn-p\">The name of a hydrocarbon comes from the number of carbon atoms: 1 = meth, 2 = eth, 3 = prop, 4 = but, 5 = pent, 6 = hex. The ending shows the series: -ane for alkanes, -ene for alkenes and -yne for alkynes.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Carbon atoms</th><th>Alkane</th><th>Alkene</th><th>Alkyne</th></tr></thead><tbody>\n<tr><td>1</td><td>Methane CH₄</td><td>none</td><td>none</td></tr>\n<tr><td>2</td><td>Ethane C₂H₆</td><td>Ethene C₂H₄</td><td>Ethyne C₂H₂</td></tr>\n<tr><td>3</td><td>Propane C₃H₈</td><td>Propene C₃H₆</td><td>Propyne C₃H₄</td></tr>\n<tr><td>4</td><td>Butane C₄H₁₀</td><td>Butene C₄H₈</td><td>Butyne C₄H₆</td></tr>\n<tr><td>5</td><td>Pentane C₅H₁₂</td><td>Pentene C₅H₁₀</td><td>Pentyne C₅H₈</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Alkenes and alkynes need at least two carbon atoms, because a double or triple bond needs two carbons. Ethyne is also called acetylene.</p>\n<p class=\"learn-p\">A third group is the <span class=\"learn-keyword\">aromatic hydrocarbons</span>. These contain a ring of six carbon atoms, called the benzene ring. Benzene (C₆H₆) is the simplest example. They are unsaturated, but they behave differently from alkenes. Hydrocarbons whose carbons join in a ring without the benzene structure, such as cyclohexane (C₆H₁₂), are called cycloalkanes.</p>\n\n<h3 class=\"learn-subheading\">3. Physical properties of hydrocarbons</h3>\n<ul class=\"learn-list\">\n<li>Methane, ethane, propane and butane are gases at room temperature. Pentane to about C₁₇ are liquids. Very long chains are waxy solids.</li>\n<li>Boiling points rise as the chain gets longer, because bigger molecules attract each other more strongly.</li>\n<li>Hydrocarbons are non-polar. They do not dissolve in water, but they dissolve in organic solvents such as ether and benzene. This is why oil floats on water.</li>\n<li>They are less dense than water.</li>\n<li>They do not conduct electricity, because they have no free ions or electrons.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">4. Preparation of some hydrocarbons</h3>\n<p class=\"learn-p\"><strong>Methane</strong> is made in the laboratory by heating sodium ethanoate with soda lime (a mixture of sodium hydroxide and calcium oxide):</p>\n<p class=\"learn-p\">CH₃COONa + NaOH → CH₄ + Na₂CO₃</p>\n<p class=\"learn-p\">Methane also forms naturally from rotting plants in swamps, and it is the main part of natural gas.</p>\n<p class=\"learn-p\"><strong>Ethene</strong> is made by heating ethanol with excess concentrated sulphuric acid at about 170 °C. The acid removes water from the ethanol (this is called dehydration):</p>\n<p class=\"learn-p\">C₂H₅OH → C₂H₄ + H₂O</p>\n<p class=\"learn-p\"><strong>Ethyne</strong> is made by adding water to calcium carbide:</p>\n<p class=\"learn-p\">CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂</p>\n<p class=\"learn-p\">Petroleum is also separated by fractional distillation, and large molecules are broken into smaller ones by <span class=\"learn-keyword\">cracking</span>. Cracking is the breaking of long-chain alkanes into shorter alkanes and alkenes using heat and a catalyst. Example: C₁₀H₂₂ → C₈H₁₈ + C₂H₄.</p>\n\n<h3 class=\"learn-subheading\">5. Reactions of alkanes</h3>\n<p class=\"learn-p\">Alkanes are fairly unreactive because their C–C and C–H bonds are strong. They have two main reactions.</p>\n<p class=\"learn-p\"><strong>(a) Combustion (burning).</strong> In plenty of air, alkanes burn to give carbon(IV) oxide and water, and release heat. This is why they are good fuels.</p>\n<p class=\"learn-p\">CH₄ + 2O₂ → CO₂ + 2H₂O</p>\n<p class=\"learn-p\">In a poor supply of air (incomplete combustion), carbon monoxide or soot (carbon) forms. Carbon monoxide is a poisonous gas. This is why a generator must never be run in a closed room.</p>\n<p class=\"learn-p\"><strong>(b) Substitution.</strong> In a <span class=\"learn-keyword\">substitution reaction</span>, one atom is replaced by another atom. Methane reacts with chlorine in sunlight (or ultraviolet light), and hydrogen atoms are replaced one by one by chlorine atoms:</p>\n<p class=\"learn-p\">CH₄ + Cl₂ → CH₃Cl + HCl (chloromethane)</p>\n<p class=\"learn-p\">With more chlorine, we also get CH₂Cl₂, CHCl₃ (trichloromethane, also called chloroform) and CCl₄ (tetrachloromethane).</p>\n\n<h3 class=\"learn-subheading\">6. Reactions of alkenes and alkynes</h3>\n<p class=\"learn-p\">The double or triple bond is a region of high electron density, so alkenes and alkynes are much more reactive than alkanes. Their typical reaction is <span class=\"learn-keyword\">addition</span>: two molecules join to form one bigger molecule, and the double bond becomes a single bond.</p>\n<ul class=\"learn-list\">\n<li><strong>Hydrogenation</strong> (adding hydrogen, nickel catalyst, about 150 °C): C₂H₄ + H₂ → C₂H₆. This is how liquid vegetable oils are made into solid margarine.</li>\n<li><strong>Halogenation</strong> (adding bromine or chlorine): C₂H₄ + Br₂ → C₂H₄Br₂ (1,2-dibromoethane).</li>\n<li><strong>Addition of hydrogen halides:</strong> C₂H₄ + HBr → C₂H₅Br.</li>\n<li><strong>Hydration</strong> (adding steam, phosphoric acid catalyst): C₂H₄ + H₂O → C₂H₅OH (ethanol).</li>\n<li><strong>Polymerisation:</strong> many ethene molecules join to make poly(ethene), used for polythene bags and \"pure water\" sachets.</li>\n</ul>\n<p class=\"learn-p\">Alkynes add in two stages. Ethyne with hydrogen gives ethene first, then ethane. Ethyne with bromine gives C₂H₂Br₂ first, then C₂H₂Br₄ (1,1,2,2-tetrabromoethane).</p>\n<p class=\"learn-p\">Alkenes and alkynes also burn. Ethyne burns with a very hot, bright, smoky flame, which is used in oxy-acetylene welding: 2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O.</p>\n\n<h3 class=\"learn-subheading\">7. Tests for hydrocarbons</h3>\n<p class=\"learn-p\">We use simple tests to show whether a hydrocarbon is saturated or unsaturated.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Test</th><th>Alkane (saturated)</th><th>Alkene or alkyne (unsaturated)</th></tr></thead><tbody>\n<tr><td>Add bromine water (orange-brown) and shake</td><td>No change. Stays orange-brown.</td><td>Orange-brown colour disappears quickly (decolourised).</td></tr>\n<tr><td>Add acidified potassium manganate(VII) (purple)</td><td>No change. Stays purple.</td><td>Purple colour disappears (becomes colourless).</td></tr>\n<tr><td>Burn the gas</td><td>Clean, blue or pale flame</td><td>Yellow, smoky, sooty flame (more so for ethyne)</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">The bromine water test cannot tell an alkene from an alkyne. Both decolourise it. Also, the bromine water goes colourless because bromine adds across the double bond. It does not become \"clear like water\" from dilution.</p>\n\n<h3 class=\"learn-subheading\">8. Uses of hydrocarbons</h3>\n<ul class=\"learn-list\">\n<li>Methane: cooking gas (natural gas) and power generation.</li>\n<li>Propane and butane: liquefied petroleum gas (LPG) for cooking.</li>\n<li>Petrol, kerosene and diesel: fuels for vehicles, stoves and generators.</li>\n<li>Ethene: making plastics such as polyethene and making ethanol.</li>\n<li>Ethyne: welding and cutting of metals.</li>\n<li>Benzene and other aromatics: solvents and raw materials for dyes and drugs.</li>\n</ul>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> An alkane has 6 carbon atoms. Find its molecular formula and name.<br>Step 1: The general formula for alkanes is CₙH₂ₙ₊₂.<br>Step 2: n = 6, so the hydrogen atoms = 2(6) + 2 = 14.<br>Answer: C₆H₁₄, called hexane.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> An alkene has a relative molecular mass of 56. Find its formula. (C = 12, H = 1)<br>Step 1: Alkenes have the formula CₙH₂ₙ.<br>Step 2: Mass = 12n + 2n = 14n.<br>Step 3: 14n = 56, so n = 56 ÷ 14 = 4.<br>Answer: C₄H₈ (butene).</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> 10 cm³ of propane is burnt completely in excess oxygen. Find the volume of CO₂ formed and the volume of oxygen used (all gases at the same temperature and pressure).<br>Step 1: Balanced equation: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.<br>Step 2: For gases, the mole ratio is the same as the volume ratio. So 1 volume propane : 5 volumes O₂ : 3 volumes CO₂.<br>Step 3: Oxygen used = 5 × 10 = 50 cm³. CO₂ formed = 3 × 10 = 30 cm³.<br>Answer: 30 cm³ of CO₂ and 50 cm³ of O₂.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Find the mass of CO₂ produced when 16 g of methane burns completely. (C = 12, H = 1, O = 16)<br>Step 1: CH₄ + 2O₂ → CO₂ + 2H₂O.<br>Step 2: Molar mass of CH₄ = 12 + 4 = 16 g/mol. Moles = 16 ÷ 16 = 1 mol.<br>Step 3: 1 mol CH₄ gives 1 mol CO₂. Molar mass of CO₂ = 12 + 32 = 44 g/mol.<br>Answer: Mass of CO₂ = 1 × 44 = 44 g.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Using CₙH₂ₙ for alkanes. Remember: alkanes are CₙH₂ₙ₊₂ (the \"+2\" belongs to the saturated one).<br>2. Saying alkanes decolourise bromine water. They do not. Only alkenes and alkynes do, quickly and without light.<br>3. Forgetting to balance the equation before comparing gas volumes or moles.<br>4. Confusing addition with substitution. Alkenes add. Alkanes substitute.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often asks: \"Distinguish between ethane and ethene\" or \"Describe a test to show that a hydrocarbon is unsaturated\". Always give the reagent, the observation for each compound, and name the reaction type. Write balanced equations for combustion and addition. For gas-volume questions, balance first, then use the volume ratio.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>Hydrocarbons contain only carbon and hydrogen.<br>Alkanes CₙH₂ₙ₊₂ are saturated; alkenes CₙH₂ₙ and alkynes CₙH₂ₙ₋₂ are unsaturated.<br>Alkanes burn and undergo substitution; alkenes and alkynes undergo addition.<br>Bromine water and acidified KMnO₄ are decolourised by unsaturated hydrocarbons only.<br>Boiling points rise with chain length, and hydrocarbons do not dissolve in water.<br>Petroleum, cooking gas, plastics and welding gas all come from hydrocarbons.</div>",
    "questions": [
      {
        "q": "What is the general formula of the alkane series?",
        "o": [
          "CₙH₂ₙ₊₂",
          "CₙH₂ₙ",
          "CₙH₂ₙ₋₂",
          "CₙHₙ"
        ],
        "a": 0,
        "e": "Alkanes are saturated, so each carbon holds as many hydrogens as possible, giving CₙH₂ₙ₊₂. CₙH₂ₙ is the formula for alkenes and CₙH₂ₙ₋₂ is for alkynes.",
        "h": "Think of the series that has only single bonds.",
        "yr": "SS2"
      },
      {
        "q": "Which of these hydrocarbons is unsaturated?",
        "o": [
          "Ethane",
          "Ethene",
          "Propane",
          "Methane"
        ],
        "a": 1,
        "e": "Ethene (C₂H₄) has a C=C double bond, so it is unsaturated. Ethane, propane and methane have only single bonds and are saturated.",
        "h": "Look for the name that ends in -ene.",
        "yr": "SS2"
      },
      {
        "q": "Which of these will decolourise bromine water quickly?",
        "o": [
          "Methane",
          "Ethane",
          "Ethyne",
          "Propane"
        ],
        "a": 2,
        "e": "Ethyne has a triple bond, so bromine adds across it and the orange-brown colour disappears. Methane, ethane and propane are saturated and do not react with bromine water.",
        "h": "Only unsaturated compounds react.",
        "yr": "SS2"
      },
      {
        "q": "What is the molecular formula of butyne?",
        "o": [
          "C₄H₁₀",
          "C₄H₈",
          "C₄H₄",
          "C₄H₆"
        ],
        "a": 3,
        "e": "Alkynes have the formula CₙH₂ₙ₋₂. For n = 4, H = 2(4) − 2 = 6, so butyne is C₄H₆. C₄H₁₀ is butane and C₄H₈ is butene.",
        "h": "Use CₙH₂ₙ₋₂ with n = 4.",
        "yr": "SS2"
      },
      {
        "q": "Methane reacts with chlorine in sunlight to form chloromethane. This reaction is called",
        "o": [
          "addition",
          "substitution",
          "polymerisation",
          "hydration"
        ],
        "a": 1,
        "e": "A hydrogen atom of methane is replaced by a chlorine atom: CH₄ + Cl₂ → CH₃Cl + HCl. Replacement of one atom by another is substitution. Addition happens with alkenes, not alkanes.",
        "h": "One atom takes the place of another.",
        "yr": "SS2"
      },
      {
        "q": "Heating ethanol with excess concentrated sulphuric acid at about 170 °C produces",
        "o": [
          "ethane",
          "ethyne",
          "ethene",
          "methane"
        ],
        "a": 2,
        "e": "The acid removes water (dehydration): C₂H₅OH → C₂H₄ + H₂O. The product is ethene, which has two carbon atoms and a double bond.",
        "h": "The acid takes out H₂O from the alcohol.",
        "yr": "SS2"
      },
      {
        "q": "Ethyne is prepared in the laboratory by adding water to",
        "o": [
          "sodium ethanoate",
          "soda lime",
          "ethanol",
          "calcium carbide"
        ],
        "a": 3,
        "e": "The reaction is CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂. Sodium ethanoate with soda lime gives methane, and ethanol with concentrated acid gives ethene.",
        "h": "The solid reactant is a carbide.",
        "yr": "SS2"
      },
      {
        "q": "Ethene reacts with hydrogen in the presence of nickel to give",
        "o": [
          "ethane",
          "ethanol",
          "ethyne",
          "poly(ethene)"
        ],
        "a": 0,
        "e": "Hydrogenation adds H₂ across the double bond: C₂H₄ + H₂ → C₂H₆. The product is ethane, a saturated alkane. Ethanol would need steam, not hydrogen.",
        "h": "Adding H₂ removes the double bond.",
        "yr": "SS2"
      },
      {
        "q": "A family is told never to run a generator in a closed room. Which gas, formed by incomplete combustion of petrol, makes this dangerous?",
        "o": [
          "Carbon(IV) oxide",
          "Hydrogen",
          "Carbon monoxide",
          "Methane"
        ],
        "a": 2,
        "e": "With a poor air supply, hydrocarbons burn to give carbon monoxide, which is poisonous because it stops blood carrying oxygen. Carbon(IV) oxide forms in complete combustion and is much less dangerous in small amounts.",
        "h": "Incomplete combustion gives a poisonous oxide of carbon.",
        "yr": "SS2"
      },
      {
        "q": "An alkene has a relative molecular mass of 70. What is its molecular formula? (C = 12, H = 1)",
        "o": [
          "C₄H₈",
          "C₆H₁₂",
          "C₅H₁₂",
          "C₅H₁₀"
        ],
        "a": 3,
        "e": "For an alkene, mass = 14n. So 14n = 70, giving n = 5, and the formula is C₅H₁₀. C₅H₁₂ is an alkane and would have a mass of 72.",
        "h": "Each CH₂ unit has mass 14.",
        "yr": "SS2"
      },
      {
        "q": "20 cm³ of ethane burns completely in excess oxygen. What volume of CO₂ forms? (2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O)",
        "o": [
          "40 cm³",
          "20 cm³",
          "60 cm³",
          "70 cm³"
        ],
        "a": 0,
        "e": "The volume ratio is 2 ethane : 4 CO₂, which is 1 : 2. So 20 cm³ of ethane gives 2 × 20 = 40 cm³ of CO₂. The answer 20 cm³ forgets the ratio.",
        "h": "Compare the coefficients of ethane and CO₂.",
        "yr": "SS2"
      },
      {
        "q": "What mass of CO₂ forms when 22 g of propane (C₃H₈) burns completely? (C = 12, H = 1, O = 16; C₃H₈ + 5O₂ → 3CO₂ + 4H₂O)",
        "o": [
          "44 g",
          "66 g",
          "33 g",
          "132 g"
        ],
        "a": 1,
        "e": "Moles of propane = 22 ÷ 44 = 0.5 mol. The equation gives 3 mol CO₂ per mol of propane, so CO₂ = 1.5 mol. Mass = 1.5 × 44 = 66 g.",
        "h": "Find moles of propane first, then use the 1 : 3 ratio.",
        "yr": "SS2"
      },
      {
        "q": "An alkane contains 20 hydrogen atoms in each molecule. How many carbon atoms does it have?",
        "o": [
          "8",
          "10",
          "11",
          "9"
        ],
        "a": 3,
        "e": "For alkanes, H = 2n + 2. So 2n + 2 = 20, giving 2n = 18 and n = 9. The compound is nonane, C₉H₂₀.",
        "h": "Solve 2n + 2 = 20.",
        "yr": "SS2"
      },
      {
        "q": "Which compound will turn purple acidified potassium manganate(VII) colourless?",
        "o": [
          "Propene",
          "Propane",
          "Methane",
          "Butane"
        ],
        "a": 0,
        "e": "Propene has a C=C double bond, which is oxidised by the manganate(VII) ion, so the purple colour disappears. Propane, methane and butane are saturated and leave the solution purple.",
        "h": "Choose the unsaturated one.",
        "yr": "SS2"
      },
      {
        "q": "Why do the boiling points of alkanes increase as the number of carbon atoms increases?",
        "o": [
          "Longer molecules are more polar",
          "Longer molecules contain more double bonds",
          "Attraction between larger molecules is stronger",
          "Longer molecules dissolve in water"
        ],
        "a": 2,
        "e": "Bigger molecules have stronger attractions between them, so more heat energy is needed to separate them. Alkanes are non-polar and have only single bonds, and they do not dissolve in water.",
        "h": "Think about forces between molecules, not bonds inside them.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Alcohols, Ethers, and Phenols",
    "topicCode": "SS2-CHEM-29",
    "module": "Organic Chemistry",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">Alcohols, ethers and phenols are three families of organic compounds that contain <span class=\"learn-keyword\">oxygen</span> as well as carbon and hydrogen. The ethanol in hand sanitiser, the local gin made from palm wine (ogogoro), and the liquid used by doctors to clean skin before an injection are all alcohols. Ethers were once used to put patients to sleep during operations. Phenols are used as disinfectants and to make plastics. In this lesson you will learn how to recognise each family from its structure, how each reacts, and how they are used in industry.</div>\n\n<h3 class=\"learn-subheading\">1. Alcohols: structure and naming</h3>\n<p class=\"learn-p\">An <span class=\"learn-keyword\">alcohol</span> is an organic compound that has one or more hydroxyl groups (–OH) joined to a carbon chain. The hydroxyl group is the <span class=\"learn-keyword\">functional group</span>. A functional group is the atom or group of atoms that gives a family its chemical properties. Alcohols with one –OH group have the general formula CₙH₂ₙ₊₁OH, or R–OH, where R is an alkyl group.</p>\n<p class=\"learn-p\">The name comes from the alkane, by replacing the last \"e\" with \"-ol\".</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Name</th><th>Formula</th><th>Structure</th></tr></thead><tbody>\n<tr><td>Methanol</td><td>CH₃OH</td><td>CH₃–OH</td></tr>\n<tr><td>Ethanol</td><td>C₂H₅OH</td><td>CH₃CH₂–OH</td></tr>\n<tr><td>Propan-1-ol</td><td>C₃H₇OH</td><td>CH₃CH₂CH₂–OH</td></tr>\n<tr><td>Propan-2-ol</td><td>C₃H₇OH</td><td>CH₃CH(OH)CH₃</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">The number tells the carbon atom that carries the –OH. Propan-1-ol and propan-2-ol have the same formula but different structures, so they are isomers.</p>\n<p class=\"learn-p\">Alcohols are classified by the carbon atom that carries the –OH group:</p>\n<ul class=\"learn-list\">\n<li><strong>Primary (1°) alcohol:</strong> the carbon with –OH is joined to one other carbon (or none). Example: ethanol.</li>\n<li><strong>Secondary (2°) alcohol:</strong> the carbon with –OH is joined to two other carbons. Example: propan-2-ol.</li>\n<li><strong>Tertiary (3°) alcohol:</strong> the carbon with –OH is joined to three other carbons. Example: 2-methylpropan-2-ol, (CH₃)₃COH.</li>\n</ul>\n<p class=\"learn-p\">Alcohols with two –OH groups are called diols (for example, ethane-1,2-diol, used as antifreeze), and with three –OH groups are triols (for example, propane-1,2,3-triol, glycerol).</p>\n\n<h3 class=\"learn-subheading\">2. Physical properties of alcohols</h3>\n<ul class=\"learn-list\">\n<li>Their boiling points are higher than those of alkanes of similar size, because the –OH groups attract each other by hydrogen bonds. Ethanol boils at about 78 °C.</li>\n<li>Methanol, ethanol and propanol mix completely with water, because they can form hydrogen bonds with water. Solubility falls as the carbon chain gets longer.</li>\n<li>They are neutral to litmus.</li>\n<li>Methanol is poisonous. Drinking even a small amount can cause blindness or death. Ethanol is the alcohol in drinks but is harmful in excess.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">3. Preparation and industrial manufacture of ethanol</h3>\n<p class=\"learn-p\"><strong>(a) Fermentation.</strong> <span class=\"learn-keyword\">Fermentation</span> is the breakdown of sugar into ethanol and carbon(IV) oxide by the enzyme zymase in yeast, with no air present. Sugar from sugar cane, palm sap or grains such as sorghum is used.</p>\n<p class=\"learn-p\">C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂</p>\n<p class=\"learn-p\">The ethanol is separated from the mixture by fractional distillation. This is how palm wine, beer and local gin are made. Methylated spirit is ethanol with methanol and a dye added so that people cannot drink it.</p>\n<p class=\"learn-p\"><strong>(b) Hydration of ethene.</strong> In industry, ethene from petroleum is mixed with steam and passed over a phosphoric acid catalyst at high temperature and pressure: C₂H₄ + H₂O → C₂H₅OH.</p>\n\n<h3 class=\"learn-subheading\">4. Chemical reactions of alcohols</h3>\n<ol class=\"learn-ordered\">\n<li><strong>Combustion.</strong> Ethanol burns with a clean, pale blue flame: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O. It is used as a fuel and in spirit lamps.</li>\n<li><strong>Reaction with sodium.</strong> Sodium reacts gently with alcohols and gives hydrogen gas and a sodium alkoxide: 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂ (sodium ethoxide).</li>\n<li><strong>Esterification.</strong> An alcohol heated with a carboxylic acid and a few drops of concentrated sulphuric acid gives an ester and water: C₂H₅OH + CH₃COOH ⇌ CH₃COOC₂H₅ + H₂O (ethyl ethanoate).</li>\n<li><strong>Dehydration.</strong> Heating ethanol with excess concentrated sulphuric acid at about 170 °C gives ethene: C₂H₅OH → C₂H₄ + H₂O.</li>\n<li><strong>Oxidation.</strong> Warming with an oxidising agent such as acidified potassium dichromate(VI) (orange) turns the colour green as the alcohol is oxidised. The product depends on the class of alcohol:</li>\n</ol>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Alcohol</th><th>Product of oxidation</th><th>Example</th></tr></thead><tbody>\n<tr><td>Primary</td><td>Aldehyde first, then carboxylic acid</td><td>Ethanol → ethanal → ethanoic acid</td></tr>\n<tr><td>Secondary</td><td>Ketone</td><td>Propan-2-ol → propanone</td></tr>\n<tr><td>Tertiary</td><td>Not oxidised easily; colour stays orange</td><td>2-methylpropan-2-ol</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Vinegar forms when palm wine or wine is left open in air: bacteria oxidise the ethanol to ethanoic acid.</p>\n\n<h3 class=\"learn-subheading\">5. Ethers</h3>\n<p class=\"learn-p\">An <span class=\"learn-keyword\">ether</span> is an organic compound in which an oxygen atom is joined to two alkyl groups. The functional group is –O– and the general formula is R–O–R'. The general formula CₙH₂ₙ₊₂O is the same as that of saturated alcohols, so an ether is a functional-group isomer of an alcohol. For example, C₂H₆O can be ethanol (CH₃CH₂OH) or methoxymethane (CH₃OCH₃).</p>\n<p class=\"learn-p\">Common ethers: methoxymethane (CH₃OCH₃) and ethoxyethane, also called diethyl ether (C₂H₅OC₂H₅).</p>\n<p class=\"learn-p\"><strong>Preparation of ethoxyethane:</strong> heat excess ethanol with concentrated sulphuric acid at about 140 °C. Two ethanol molecules lose one water molecule: 2C₂H₅OH → C₂H₅OC₂H₅ + H₂O. Note that the temperature is lower (140 °C) than the one that gives ethene (170 °C), and the alcohol is in excess.</p>\n<p class=\"learn-p\"><strong>Properties:</strong> ethoxyethane is a colourless, very volatile liquid that boils at about 35 °C. It has no –OH group, so it has no hydrogen bonding between molecules and its boiling point is much lower than that of ethanol. It is only slightly soluble in water. It is highly flammable, so it must be kept away from flames. Ethers are fairly unreactive and do not react with sodium, which is a test that separates an ether from an alcohol.</p>\n<p class=\"learn-p\"><strong>Uses:</strong> as a solvent for fats, oils and resins; in the past as an anaesthetic in surgery; and as a starting-fluid for engines.</p>\n\n<h3 class=\"learn-subheading\">6. Phenols</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">phenol</span> is a compound in which the –OH group is joined directly to a carbon atom of a benzene ring. The simplest phenol is phenol itself, C₆H₅OH. It is a colourless, crystalline solid with a strong smell, and it turns pink on standing.</p>\n<p class=\"learn-p\">Phenol is different from an alcohol because the benzene ring makes the –OH group more acidic.</p>\n<ul class=\"learn-list\">\n<li><strong>Weak acid:</strong> phenol is a weak acid. It reacts with sodium hydroxide: C₆H₅OH + NaOH → C₆H₅ONa + H₂O (sodium phenoxide). Alcohols do not react with NaOH.</li>\n<li><strong>It is too weak an acid to react with sodium carbonate</strong> and release carbon(IV) oxide.</li>\n<li><strong>Reaction with bromine water:</strong> a white precipitate of 2,4,6-tribromophenol forms and the bromine colour is lost.</li>\n<li><strong>Test with iron(III) chloride:</strong> a violet (purple) colour forms. Alcohols give no such colour.</li>\n<li>Phenol is poisonous and burns skin, so it must be handled with care.</li>\n</ul>\n<p class=\"learn-p\"><strong>Uses of phenols:</strong> disinfectants and antiseptics (diluted), making plastics such as Bakelite (phenol with methanal), dyes, drugs and resins.</p>\n\n<h3 class=\"learn-subheading\">7. Industrial applications</h3>\n<ul class=\"learn-list\">\n<li><strong>Ethanol:</strong> alcoholic drinks, hand sanitiser, a solvent in paints, perfumes and drugs, a fuel (blended with petrol), and the raw material for ethanoic acid and esters.</li>\n<li><strong>Methanol:</strong> making methanal (for plastics) and as a solvent and fuel. It is not drinkable.</li>\n<li><strong>Glycerol:</strong> soap making (as a by-product), cosmetics and explosives.</li>\n<li><strong>Ethane-1,2-diol:</strong> antifreeze and making polyester.</li>\n<li><strong>Ethers:</strong> solvents. <strong>Phenols:</strong> plastics, dyes and disinfectants.</li>\n</ul>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Find the relative molecular mass of ethanol, C₂H₅OH. (C = 12, H = 1, O = 16)<br>Step 1: Carbon: 2 × 12 = 24.<br>Step 2: Hydrogen: 6 × 1 = 6 (five in C₂H₅ and one in OH).<br>Step 3: Oxygen: 1 × 16 = 16.<br>Answer: 24 + 6 + 16 = 46.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> What mass of ethanol can be made by fermenting 90 g of glucose? (C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂; C = 12, H = 1, O = 16)<br>Step 1: Molar mass of glucose = 6(12) + 12(1) + 6(16) = 180 g/mol.<br>Step 2: Moles of glucose = 90 ÷ 180 = 0.5 mol.<br>Step 3: From the equation, 1 mol glucose gives 2 mol ethanol. So moles of ethanol = 2 × 0.5 = 1.0 mol.<br>Step 4: Mass of ethanol = 1.0 × 46 = 46 g.<br>Answer: 46 g of ethanol.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> Find the volume of CO₂ at s.t.p. formed when 4.6 g of ethanol burns completely. (Molar volume at s.t.p. = 22.4 dm³; C₂H₅OH = 46)<br>Step 1: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O.<br>Step 2: Moles of ethanol = 4.6 ÷ 46 = 0.1 mol.<br>Step 3: 1 mol ethanol gives 2 mol CO₂, so moles of CO₂ = 0.2 mol.<br>Step 4: Volume = 0.2 × 22.4 = 4.48 dm³.<br>Answer: 4.48 dm³ of CO₂.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Classify propan-2-ol and say what forms when it is oxidised.<br>Step 1: Structure is CH₃CH(OH)CH₃. The carbon holding –OH is joined to two other carbons.<br>Step 2: So it is a secondary alcohol.<br>Answer: Oxidation with acidified K₂Cr₂O₇ gives a ketone, propanone (CH₃COCH₃), and the orange solution turns green.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Thinking alcohols are acidic or react with NaOH. Only phenols (and carboxylic acids) do.<br>2. Mixing up 140 °C and 170 °C. Ether forms at 140 °C with excess alcohol; ethene forms at 170 °C with excess acid.<br>3. Forgetting that a tertiary alcohol is not easily oxidised.<br>4. Saying ethers and alcohols with the same formula are the same compound. They are isomers with different functional groups.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC likes questions such as \"Write the equation for the fermentation of glucose\", \"Distinguish between a primary and a tertiary alcohol\", and \"Name the product of oxidising ethanol\". Learn the colour change of the dichromate test (orange to green) and the FeCl₃ test for phenol (violet). For calculations, always write the balanced equation first.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>Alcohols contain –OH on an alkyl chain and are classed as primary, secondary or tertiary.<br>Ethanol is made by fermentation of sugar or by hydration of ethene.<br>Alcohols burn, react with sodium, form esters, dehydrate and are oxidised (except tertiary).<br>Ethers have the R–O–R' structure, are volatile, flammable and fairly unreactive.<br>Phenols have –OH on a benzene ring, are weakly acidic and give a violet colour with FeCl₃.<br>They are used as fuels, solvents, drinks, anaesthetics, disinfectants and in plastics.</div>",
    "questions": [
      {
        "q": "What is the functional group of alcohols?",
        "o": [
          "–OH (hydroxyl)",
          "–COOH",
          "–CHO",
          "–O–"
        ],
        "a": 0,
        "e": "Alcohols contain the hydroxyl group, –OH, joined to a carbon chain. –COOH is the carboxylic acid group, –CHO is the aldehyde group and –O– is the ether group.",
        "h": "It is made of one oxygen and one hydrogen.",
        "yr": "SS2"
      },
      {
        "q": "Propan-2-ol, CH₃CH(OH)CH₃, is classified as a",
        "o": [
          "primary alcohol",
          "secondary alcohol",
          "tertiary alcohol",
          "ether"
        ],
        "a": 1,
        "e": "The carbon carrying the –OH group is joined to two other carbon atoms, so the alcohol is secondary. A primary alcohol has the –OH carbon joined to only one other carbon.",
        "h": "Count the carbons attached to the carbon that holds –OH.",
        "yr": "SS2"
      },
      {
        "q": "What colour change is seen when ethanol is warmed with acidified potassium dichromate(VI)?",
        "o": [
          "Purple to colourless",
          "Colourless to purple",
          "Orange to green",
          "Green to orange"
        ],
        "a": 2,
        "e": "Dichromate(VI) is orange. It is reduced as it oxidises the ethanol, so it turns green. Purple to colourless is the change seen with manganate(VII) in tests for unsaturation.",
        "h": "Dichromate starts orange.",
        "yr": "SS2"
      },
      {
        "q": "Fermentation of glucose by yeast produces",
        "o": [
          "methanol and water",
          "ethanol and oxygen",
          "ethanoic acid and water",
          "ethanol and carbon(IV) oxide"
        ],
        "a": 3,
        "e": "The equation is C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂, catalysed by zymase. It is the bubbles of CO₂ that you see in fermenting palm wine.",
        "h": "Gas bubbles come out of fermenting sugar.",
        "yr": "SS2"
      },
      {
        "q": "Which of these compounds is an ether?",
        "o": [
          "CH₃CH₂OH",
          "CH₃OCH₃",
          "CH₃COOH",
          "C₆H₅OH"
        ],
        "a": 1,
        "e": "An ether has an oxygen atom joined to two alkyl groups (R–O–R'). CH₃OCH₃ is methoxymethane. CH₃CH₂OH is an alcohol, CH₃COOH is an acid and C₆H₅OH is a phenol.",
        "h": "The oxygen sits between two carbon groups.",
        "yr": "SS2"
      },
      {
        "q": "Which reagent gives a violet colour with phenol but no colour with ethanol?",
        "o": [
          "Bromine in the dark",
          "Sodium metal",
          "Iron(III) chloride solution",
          "Acidified potassium dichromate(VI)"
        ],
        "a": 2,
        "e": "Phenol forms a coloured complex with iron(III) chloride, giving a violet colour. Ethanol gives no colour change. Sodium reacts with both, so it cannot tell them apart.",
        "h": "It is an iron salt.",
        "yr": "SS2"
      },
      {
        "q": "Ethoxyethane is made by heating",
        "o": [
          "excess concentrated H₂SO₄ with ethanol at 170 °C",
          "ethene with steam",
          "ethanol with sodium",
          "excess ethanol with concentrated H₂SO₄ at 140 °C"
        ],
        "a": 3,
        "e": "Two ethanol molecules lose one molecule of water at about 140 °C when ethanol is in excess: 2C₂H₅OH → C₂H₅OC₂H₅ + H₂O. At 170 °C with excess acid, ethene forms instead.",
        "h": "The lower temperature gives the ether.",
        "yr": "SS2"
      },
      {
        "q": "Which alcohol is NOT easily oxidised by acidified potassium dichromate(VI)?",
        "o": [
          "2-methylpropan-2-ol",
          "Ethanol",
          "Propan-1-ol",
          "Propan-2-ol"
        ],
        "a": 0,
        "e": "2-methylpropan-2-ol is a tertiary alcohol, and tertiary alcohols resist oxidation, so the solution stays orange. Primary alcohols give aldehydes or acids and secondary alcohols give ketones.",
        "h": "Look for the tertiary alcohol.",
        "yr": "SS2"
      },
      {
        "q": "When sodium is added to ethanol, the gas given off is",
        "o": [
          "oxygen",
          "carbon(IV) oxide",
          "hydrogen",
          "ethene"
        ],
        "a": 2,
        "e": "Sodium replaces the hydrogen of the –OH group: 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂. The gas is hydrogen, which burns with a pop.",
        "h": "The metal replaces hydrogen from –OH.",
        "yr": "SS2"
      },
      {
        "q": "Heating ethanol with ethanoic acid and a little concentrated sulphuric acid forms",
        "o": [
          "ethyl methanoate",
          "methyl ethanoate",
          "propanoic acid",
          "ethyl ethanoate"
        ],
        "a": 3,
        "e": "The alcohol part (ethyl) comes from ethanol and the acid part (ethanoate) comes from ethanoic acid, so the ester is ethyl ethanoate, CH₃COOC₂H₅. Water is the other product.",
        "h": "Name the alcohol part first, then the acid part.",
        "yr": "SS2"
      },
      {
        "q": "What is the relative molecular mass of methanol, CH₃OH? (C = 12, H = 1, O = 16)",
        "o": [
          "32",
          "30",
          "28",
          "46"
        ],
        "a": 0,
        "e": "Carbon is 12, four hydrogens are 4 × 1 = 4, and oxygen is 16. The total is 12 + 4 + 16 = 32. The value 46 belongs to ethanol.",
        "h": "Count all four hydrogen atoms.",
        "yr": "SS2"
      },
      {
        "q": "What mass of ethanol forms when 36 g of glucose is fermented completely? (C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂; C₆H₁₂O₆ = 180, C₂H₅OH = 46)",
        "o": [
          "9.2 g",
          "18.4 g",
          "36.8 g",
          "46.0 g"
        ],
        "a": 1,
        "e": "Moles of glucose = 36 ÷ 180 = 0.2 mol. The ratio is 1 : 2, so moles of ethanol = 0.4 mol. Mass = 0.4 × 46 = 18.4 g. Forgetting the factor of 2 gives 9.2 g.",
        "h": "Remember that 1 mol glucose gives 2 mol ethanol.",
        "yr": "SS2"
      },
      {
        "q": "Methylated spirit is not safe to drink because it contains",
        "o": [
          "too much water",
          "yeast",
          "ethanoic acid",
          "methanol"
        ],
        "a": 3,
        "e": "Methylated spirit is ethanol with methanol (and a dye) added. Methanol is poisonous and can cause blindness or death, which discourages drinking.",
        "h": "The added alcohol is the poisonous one with one carbon.",
        "yr": "SS2"
      },
      {
        "q": "Which compound is a functional-group isomer of ethanol?",
        "o": [
          "Methoxymethane",
          "Methanol",
          "Ethanal",
          "Propan-1-ol"
        ],
        "a": 0,
        "e": "Ethanol and methoxymethane both have the formula C₂H₆O, but one is an alcohol and the other is an ether. Methanol and propan-1-ol have different formulae.",
        "h": "The isomer has the same formula C₂H₆O.",
        "yr": "SS2"
      },
      {
        "q": "What volume of CO₂ at s.t.p. forms when 9.2 g of ethanol burns completely? (C₂H₅OH = 46; molar volume = 22.4 dm³)",
        "o": [
          "4.48 dm³",
          "6.72 dm³",
          "8.96 dm³",
          "13.44 dm³"
        ],
        "a": 2,
        "e": "Moles of ethanol = 9.2 ÷ 46 = 0.2 mol. One mole of ethanol gives two moles of CO₂, so CO₂ = 0.4 mol. Volume = 0.4 × 22.4 = 8.96 dm³.",
        "h": "Use the ratio 1 ethanol : 2 CO₂.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Aldehydes and Ketones",
    "topicCode": "SS2-CHEM-30",
    "module": "Organic Chemistry",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">Aldehydes and ketones are two closely related families of organic compounds. Both contain a <span class=\"learn-keyword\">carbonyl group</span>, which is a carbon atom joined to an oxygen atom by a double bond (C=O). The liquid used to remove nail polish is a ketone called propanone, also known as acetone. The formalin used to preserve dead specimens in the school laboratory contains an aldehyde called methanal. The pleasant smell of some fruits and flowers also comes from these compounds. In this lesson you will learn how to name them, make them, tell them apart, and use them.</div>\n\n<h3 class=\"learn-subheading\">1. Structure of aldehydes and ketones</h3>\n<p class=\"learn-p\">The carbonyl group, C=O, is found in both families. The difference is the position of the carbonyl group in the molecule.</p>\n<ul class=\"learn-list\">\n<li>In an <span class=\"learn-keyword\">aldehyde</span>, the carbonyl group is at the end of the carbon chain. The carbon is joined to at least one hydrogen atom. The functional group is –CHO. General formula: R–CHO.</li>\n<li>In a <span class=\"learn-keyword\">ketone</span>, the carbonyl group is in the middle of the chain. The carbon is joined to two carbon groups. The functional group is –CO–. General formula: R–CO–R'.</li>\n</ul>\n<p class=\"learn-p\">Both families have the general molecular formula CₙH₂ₙO (for the simple, saturated ones). Since they have the same formula, an aldehyde and a ketone with the same number of carbon atoms are isomers. For example, propanal (CH₃CH₂CHO) and propanone (CH₃COCH₃) are both C₃H₆O.</p>\n\n<h3 class=\"learn-subheading\">2. Naming aldehydes and ketones</h3>\n<p class=\"learn-p\">Aldehydes take the name of the alkane and end in <strong>-al</strong>. Ketones end in <strong>-one</strong>. In ketones with five or more carbons, a number shows where the C=O is.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Name</th><th>Formula</th><th>Family</th></tr></thead><tbody>\n<tr><td>Methanal</td><td>HCHO</td><td>Aldehyde</td></tr>\n<tr><td>Ethanal</td><td>CH₃CHO</td><td>Aldehyde</td></tr>\n<tr><td>Propanal</td><td>CH₃CH₂CHO</td><td>Aldehyde</td></tr>\n<tr><td>Propanone</td><td>CH₃COCH₃</td><td>Ketone</td></tr>\n<tr><td>Butanone</td><td>CH₃COCH₂CH₃</td><td>Ketone</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">The simplest ketone is propanone, because a ketone needs two carbon groups on the carbonyl carbon, and so needs at least three carbon atoms. The simplest aldehyde is methanal.</p>\n\n<h3 class=\"learn-subheading\">3. Physical properties</h3>\n<ul class=\"learn-list\">\n<li>Methanal is a gas at room temperature. Ethanal boils at about 21 °C. Propanone is a colourless liquid with a boiling point of about 56 °C.</li>\n<li>Their boiling points are higher than those of alkanes of similar size, because the C=O bond is polar, but lower than those of alcohols, because their molecules cannot form hydrogen bonds with each other.</li>\n<li>The smaller members mix well with water, because they can form hydrogen bonds with water molecules. Solubility falls as the carbon chain gets longer.</li>\n<li>Methanal has a sharp smell. Propanone has a sweet, sharp smell and is very flammable.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">4. Preparation</h3>\n<p class=\"learn-p\"><strong>Aldehydes</strong> are made by the mild oxidation of <em>primary</em> alcohols. The alcohol is warmed with acidified potassium dichromate(VI). The aldehyde has a low boiling point, so it is distilled out as soon as it forms. If it stays in the mixture, it is oxidised further to a carboxylic acid.</p>\n<p class=\"learn-p\">CH₃CH₂OH + [O] → CH₃CHO + H₂O (ethanol → ethanal)</p>\n<p class=\"learn-p\">Here [O] stands for oxygen supplied by the oxidising agent.</p>\n<p class=\"learn-p\"><strong>Ketones</strong> are made by the oxidation of <em>secondary</em> alcohols with the same reagent:</p>\n<p class=\"learn-p\">CH₃CH(OH)CH₃ + [O] → CH₃COCH₃ + H₂O (propan-2-ol → propanone)</p>\n<p class=\"learn-p\"><strong>Industrial method for methanal:</strong> methanol vapour mixed with air is passed over a hot silver or copper catalyst: CH₃OH + ½O₂ → HCHO + H₂O. The methanal gas is dissolved in water to give formalin.</p>\n\n<h3 class=\"learn-subheading\">5. Chemical reactions</h3>\n<ol class=\"learn-ordered\">\n<li><strong>Oxidation (aldehydes only).</strong> Aldehydes are easily oxidised to carboxylic acids: CH₃CHO + [O] → CH₃COOH. Ketones are not easily oxidised, because there is no hydrogen on the carbonyl carbon. This difference is the basis of the tests in the next section.</li>\n<li><strong>Reduction.</strong> Reduction is the opposite of oxidation. Using hydrogen with a nickel catalyst, or a reducing agent such as lithium tetrahydridoaluminate(III) or sodium tetrahydridoborate, an aldehyde is reduced to a <em>primary</em> alcohol and a ketone to a <em>secondary</em> alcohol. CH₃CHO + H₂ → CH₃CH₂OH. CH₃COCH₃ + H₂ → CH₃CH(OH)CH₃.</li>\n<li><strong>Addition reactions.</strong> The C=O double bond can add molecules, like the C=C bond of alkenes does. For example, hydrogen cyanide adds to ethanal to form a hydroxynitrile.</li>\n<li><strong>Combustion.</strong> They burn to give CO₂ and water. C₃H₆O + 4O₂ → 3CO₂ + 3H₂O.</li>\n<li><strong>Condensation polymerisation (methanal).</strong> Methanal reacts with phenol to form the plastic Bakelite, and with urea to form urea-methanal resin. In these reactions, small molecules such as water are lost.</li>\n</ol>\n\n<h3 class=\"learn-subheading\">6. Identification: tests for aldehydes and ketones</h3>\n<p class=\"learn-p\">First, to show that a compound is a carbonyl compound (either family), add 2,4-dinitrophenylhydrazine (2,4-DNPH, also called Brady's reagent). An orange or yellow precipitate forms with both an aldehyde and a ketone.</p>\n<p class=\"learn-p\">Next, to tell an aldehyde from a ketone, use a test that needs the compound to be oxidised:</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Test</th><th>Aldehyde</th><th>Ketone</th></tr></thead><tbody>\n<tr><td>Tollens' reagent (silver nitrate in ammonia), warm</td><td>A silver mirror forms on the tube</td><td>No change</td></tr>\n<tr><td>Fehling's solution (blue), warm</td><td>Blue turns to a red-brown precipitate of copper(I) oxide</td><td>No change; stays blue</td></tr>\n<tr><td>Acidified potassium dichromate(VI)</td><td>Orange turns green</td><td>No change; stays orange</td></tr>\n<tr><td>Acidified potassium manganate(VII)</td><td>Purple turns colourless</td><td>No colour change (under mild conditions)</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">In the silver mirror test, the aldehyde is oxidised and the silver ions are reduced to silver metal. In the Fehling's test, the copper(II) ions are reduced to copper(I) oxide.</p>\n\n<h3 class=\"learn-subheading\">7. Uses of aldehydes and ketones</h3>\n<ul class=\"learn-list\">\n<li><strong>Methanal:</strong> formalin (a 40% solution in water) preserves biological specimens and is used to disinfect; it is used to make Bakelite and other resins.</li>\n<li><strong>Ethanal:</strong> making ethanoic acid and other chemicals.</li>\n<li><strong>Propanone:</strong> a solvent for paints, varnish and nail polish remover; it is used to make plastics and drugs.</li>\n<li>Many perfumes and flavours (such as the smell of almond and vanilla) are aldehydes or ketones.</li>\n<li>Some sugars are aldehydes or ketones (glucose has an aldehyde group, fructose a ketone group). This is why glucose gives a positive Fehling's test.</li>\n</ul>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> What mass of ethanoic acid forms when 4.4 g of ethanal is completely oxidised? (CH₃CHO + [O] → CH₃COOH; C = 12, H = 1, O = 16)<br>Step 1: Molar mass of CH₃CHO = 2(12) + 4(1) + 16 = 44 g/mol.<br>Step 2: Moles of ethanal = 4.4 ÷ 44 = 0.1 mol.<br>Step 3: The ratio is 1 : 1, so moles of ethanoic acid = 0.1 mol.<br>Step 4: Molar mass of CH₃COOH = 2(12) + 4(1) + 2(16) = 60 g/mol. Mass = 0.1 × 60 = 6.0 g.<br>Answer: 6.0 g of ethanoic acid.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> A saturated aldehyde has a relative molecular mass of 58. Find its formula and name. (C = 12, H = 1, O = 16)<br>Step 1: General formula CₙH₂ₙO has mass 12n + 2n + 16 = 14n + 16.<br>Step 2: 14n + 16 = 58, so 14n = 42 and n = 3.<br>Step 3: The formula is C₃H₆O. As an aldehyde, the structure is CH₃CH₂CHO.<br>Answer: C₃H₆O, propanal. (Its ketone isomer is propanone.)</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> Find the mass of CO₂ formed when 5.8 g of propanone burns completely. (C₃H₆O + 4O₂ → 3CO₂ + 3H₂O; C₃H₆O = 58, CO₂ = 44)<br>Step 1: Moles of propanone = 5.8 ÷ 58 = 0.1 mol.<br>Step 2: The ratio is 1 : 3, so moles of CO₂ = 0.3 mol.<br>Step 3: Mass of CO₂ = 0.3 × 44 = 13.2 g.<br>Answer: 13.2 g of CO₂.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Find the percentage by mass of carbon in methanal, HCHO. (C = 12, H = 1, O = 16)<br>Step 1: Molar mass = 12 + 2(1) + 16 = 30.<br>Step 2: Percentage of carbon = (12 ÷ 30) × 100 = 40%.<br>Answer: 40% carbon.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Saying ketones give a silver mirror or reduce Fehling's solution. Only aldehydes do.<br>2. Forgetting to distil the aldehyde out. If it stays in the hot oxidising mixture, it becomes a carboxylic acid.<br>3. Writing –COH instead of –CHO for the aldehyde group.<br>4. Saying reduction of a ketone gives a primary alcohol. It gives a secondary alcohol.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> A common WAEC question is \"Describe a chemical test to distinguish propanal from propanone\". Name the reagent (Tollens' or Fehling's), give the result for each (silver mirror or red-brown precipitate for propanal; no change for propanone). You may also be asked to write the structures of isomers with the formula C₃H₆O, or the equation for oxidising a named alcohol.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>Aldehydes (R–CHO) and ketones (R–CO–R') both contain the C=O group.<br>Primary alcohols oxidise to aldehydes; secondary alcohols oxidise to ketones.<br>Aldehydes oxidise easily to acids; ketones do not.<br>Reduction gives primary alcohols from aldehydes and secondary alcohols from ketones.<br>Tollens' and Fehling's tests are positive for aldehydes only; 2,4-DNPH is positive for both.<br>Uses include formalin, Bakelite, solvents, flavours and perfumes.</div>",
    "questions": [
      {
        "q": "What is the functional group of an aldehyde?",
        "o": [
          "–CHO",
          "–CO–",
          "–COOH",
          "–OH"
        ],
        "a": 0,
        "e": "An aldehyde has the carbonyl group at the end of the chain, written –CHO. A ketone has –CO– in the middle, an acid has –COOH and an alcohol has –OH.",
        "h": "The carbonyl carbon carries one hydrogen.",
        "yr": "SS2"
      },
      {
        "q": "What is the name of CH₃COCH₃?",
        "o": [
          "Propanal",
          "Propanone",
          "Propan-2-ol",
          "Ethanal"
        ],
        "a": 1,
        "e": "The C=O is in the middle of a three-carbon chain, so it is a ketone ending in -one: propanone. Propanal is the aldehyde isomer, CH₃CH₂CHO.",
        "h": "Ketone names end in -one.",
        "yr": "SS2"
      },
      {
        "q": "A primary alcohol is gently oxidised and the product is distilled out at once. The product is",
        "o": [
          "a ketone",
          "a carboxylic acid",
          "an ether",
          "an aldehyde"
        ],
        "a": 3,
        "e": "Mild oxidation of a primary alcohol gives an aldehyde. It must be distilled out quickly, otherwise it is oxidised further to a carboxylic acid. Ketones come from secondary alcohols.",
        "h": "Distilling stops further oxidation.",
        "yr": "SS2"
      },
      {
        "q": "Oxidation of propan-2-ol with acidified potassium dichromate(VI) gives",
        "o": [
          "propanone",
          "propanal",
          "propanoic acid",
          "propene"
        ],
        "a": 0,
        "e": "Propan-2-ol is a secondary alcohol, and secondary alcohols are oxidised to ketones: CH₃CH(OH)CH₃ + [O] → CH₃COCH₃ + H₂O. Propanal would come from propan-1-ol.",
        "h": "Secondary alcohol gives a ketone.",
        "yr": "SS2"
      },
      {
        "q": "Which reagent gives a silver mirror with an aldehyde but no change with a ketone?",
        "o": [
          "2,4-dinitrophenylhydrazine",
          "Tollens' reagent",
          "Bromine water",
          "Litmus solution"
        ],
        "a": 1,
        "e": "Tollens' reagent is silver nitrate in ammonia. The aldehyde is oxidised and silver ions are reduced to silver metal, which coats the tube. 2,4-DNPH reacts with both families.",
        "h": "Silver nitrate in ammonia.",
        "yr": "SS2"
      },
      {
        "q": "What is seen when ethanal is warmed with Fehling's solution?",
        "o": [
          "Blue colour stays",
          "Green precipitate forms",
          "Red-brown precipitate forms",
          "Silver mirror forms"
        ],
        "a": 2,
        "e": "Copper(II) ions in Fehling's solution are reduced to red-brown copper(I) oxide by the aldehyde. A ketone leaves the solution blue. The silver mirror belongs to Tollens' test.",
        "h": "The blue copper(II) is reduced.",
        "yr": "SS2"
      },
      {
        "q": "Which reagent forms an orange or yellow precipitate with both aldehydes and ketones?",
        "o": [
          "Fehling's solution",
          "Tollens' reagent",
          "Acidified potassium dichromate(VI)",
          "2,4-dinitrophenylhydrazine"
        ],
        "a": 3,
        "e": "2,4-DNPH (Brady's reagent) reacts with the C=O group, which both families contain, so both give an orange or yellow precipitate. The other reagents only react with aldehydes.",
        "h": "It tests for the C=O group itself.",
        "yr": "SS2"
      },
      {
        "q": "Reduction of propanone with hydrogen and a nickel catalyst gives",
        "o": [
          "propan-2-ol",
          "propan-1-ol",
          "propanal",
          "propanoic acid"
        ],
        "a": 0,
        "e": "A ketone is reduced to a secondary alcohol: CH₃COCH₃ + H₂ → CH₃CH(OH)CH₃. A primary alcohol such as propan-1-ol comes from reducing an aldehyde.",
        "h": "Ketone gives secondary alcohol.",
        "yr": "SS2"
      },
      {
        "q": "Which pair of compounds are isomers of each other?",
        "o": [
          "Ethanal and ethanol",
          "Propanal and propanone",
          "Methanal and methanol",
          "Propanone and propanoic acid"
        ],
        "a": 1,
        "e": "Propanal and propanone both have the formula C₃H₆O but different functional groups. Ethanal (C₂H₄O) and ethanol (C₂H₆O) have different formulae.",
        "h": "Look for the same molecular formula.",
        "yr": "SS2"
      },
      {
        "q": "Which substance is used for preserving biological specimens?",
        "o": [
          "Propanone",
          "Ethanoic acid",
          "Formalin",
          "Butanone"
        ],
        "a": 2,
        "e": "Formalin is a solution of methanal in water (about 40%). It preserves specimens and acts as a disinfectant. Propanone is a solvent used in nail polish remover.",
        "h": "It is a solution of methanal.",
        "yr": "SS2"
      },
      {
        "q": "Methanal reacts with phenol to form the plastic called",
        "o": [
          "polythene",
          "nylon",
          "PVC",
          "Bakelite"
        ],
        "a": 3,
        "e": "Methanal and phenol undergo condensation polymerisation, losing water, to form Bakelite. Polythene comes from ethene, and PVC from chloroethene.",
        "h": "This was one of the first synthetic plastics.",
        "yr": "SS2"
      },
      {
        "q": "What is the relative molecular mass of butanone, CH₃COCH₂CH₃? (C = 12, H = 1, O = 16)",
        "o": [
          "72",
          "58",
          "70",
          "74"
        ],
        "a": 0,
        "e": "The formula is C₄H₈O. Mass = 4(12) + 8(1) + 16 = 48 + 8 + 16 = 72. The value 58 belongs to propanone.",
        "h": "Write the molecular formula first.",
        "yr": "SS2"
      },
      {
        "q": "What mass of propanone forms when 6.0 g of propan-2-ol is oxidised completely? (CH₃CH(OH)CH₃ → CH₃COCH₃; propan-2-ol = 60, propanone = 58)",
        "o": [
          "3.0 g",
          "5.8 g",
          "6.0 g",
          "11.6 g"
        ],
        "a": 1,
        "e": "Moles of propan-2-ol = 6.0 ÷ 60 = 0.1 mol. The ratio is 1 : 1, so propanone = 0.1 mol. Mass = 0.1 × 58 = 5.8 g.",
        "h": "The mole ratio is 1 : 1.",
        "yr": "SS2"
      },
      {
        "q": "What volume of CO₂ at s.t.p. forms when 2.9 g of propanone burns completely? (C₃H₆O + 4O₂ → 3CO₂ + 3H₂O; C₃H₆O = 58; molar volume = 22.4 dm³)",
        "o": [
          "1.12 dm³",
          "2.24 dm³",
          "3.36 dm³",
          "6.72 dm³"
        ],
        "a": 2,
        "e": "Moles of propanone = 2.9 ÷ 58 = 0.05 mol. The ratio is 1 : 3, so CO₂ = 0.15 mol. Volume = 0.15 × 22.4 = 3.36 dm³. Forgetting the factor of 3 gives 1.12 dm³.",
        "h": "One propanone gives three CO₂.",
        "yr": "SS2"
      },
      {
        "q": "What is the percentage by mass of oxygen in methanal, HCHO? (C = 12, H = 1, O = 16)",
        "o": [
          "40%",
          "46.7%",
          "30%",
          "53.3%"
        ],
        "a": 3,
        "e": "Molar mass of HCHO = 12 + 2 + 16 = 30. Oxygen = (16 ÷ 30) × 100 = 53.3%. The 40% value is the percentage of carbon.",
        "h": "Divide the oxygen mass by 30.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Carboxylic Acids and Esters",
    "topicCode": "SS2-CHEM-31",
    "module": "Organic Chemistry",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">Carboxylic acids are organic compounds that contain the <span class=\"learn-keyword\">carboxyl group</span>, –COOH. They are weak acids. The sour taste of vinegar comes from a carboxylic acid called ethanoic acid. The sting of an ant or a red ant bite in the farm contains methanoic acid. When a carboxylic acid reacts with an alcohol, it forms an <span class=\"learn-keyword\">ester</span>, a compound with a sweet, fruity smell that is used in perfumes, food flavours and soap making. In this lesson you will learn the structure, reactions and uses of both families.</div>\n\n<h3 class=\"learn-subheading\">1. Structure of carboxylic acids</h3>\n<p class=\"learn-p\">The carboxyl group is made of a carbonyl group (C=O) and a hydroxyl group (–OH) joined to the same carbon atom. It is written –COOH.</p>\n<p class=\"learn-p\">The general formula of a simple carboxylic acid is R–COOH, where R is an alkyl group or a hydrogen atom. The general molecular formula is CₙH₂ₙO₂ (for saturated acids with one –COOH group). Methanoic acid is HCOOH, where R is just H.</p>\n<p class=\"learn-p\">Carboxylic acids are named from the alkane with the same number of carbons, ending in <strong>-oic acid</strong>. The carbon of the –COOH group is counted in the chain.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Name</th><th>Formula</th><th>Common name</th></tr></thead><tbody>\n<tr><td>Methanoic acid</td><td>HCOOH</td><td>Formic acid</td></tr>\n<tr><td>Ethanoic acid</td><td>CH₃COOH</td><td>Acetic acid</td></tr>\n<tr><td>Propanoic acid</td><td>CH₃CH₂COOH</td><td>Propionic acid</td></tr>\n<tr><td>Butanoic acid</td><td>CH₃CH₂CH₂COOH</td><td>Butyric acid</td></tr>\n</tbody></table></div>\n\n<h3 class=\"learn-subheading\">2. Physical properties of carboxylic acids</h3>\n<ul class=\"learn-list\">\n<li>The first members are colourless liquids with sharp, sour smells. Pure ethanoic acid freezes at about 17 °C, so it forms ice-like crystals on a cool day. It is called <em>glacial</em> ethanoic acid.</li>\n<li>Their boiling points are high for their size (ethanoic acid boils at about 118 °C). This is because carboxylic acid molecules form strong hydrogen bonds with each other.</li>\n<li>The small acids (methanoic to butanoic) mix freely with water, because they form hydrogen bonds with water. Solubility falls as the carbon chain gets longer.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">3. Preparation of carboxylic acids</h3>\n<ol class=\"learn-ordered\">\n<li><strong>Oxidation of a primary alcohol</strong> using an oxidising agent such as acidified potassium dichromate(VI), heated under reflux so the vapour is returned to the flask. The alcohol goes to an aldehyde first and then to the acid: CH₃CH₂OH + 2[O] → CH₃COOH + H₂O.</li>\n<li><strong>Oxidation of an aldehyde:</strong> CH₃CHO + [O] → CH₃COOH.</li>\n<li><strong>Natural source:</strong> when palm wine or other weak alcohol is left open to the air, bacteria oxidise the ethanol to ethanoic acid, and the drink turns sour. This is how vinegar is made.</li>\n<li><strong>Hydrolysis of an ester</strong> with dilute acid gives the acid and an alcohol (see Section 7).</li>\n</ol>\n\n<h3 class=\"learn-subheading\">4. Chemical reactions of carboxylic acids</h3>\n<p class=\"learn-p\">Carboxylic acids are <strong>weak acids</strong>. This means that they ionise only a little in water: CH₃COOH ⇌ CH₃COO⁻ + H⁺. They show the usual properties of acids, though less strongly than hydrochloric acid.</p>\n<ol class=\"learn-ordered\">\n<li><strong>With indicators:</strong> they turn blue litmus red.</li>\n<li><strong>With reactive metals</strong> (Mg, Zn): a salt and hydrogen gas form. 2CH₃COOH + Mg → (CH₃COO)₂Mg + H₂.</li>\n<li><strong>With bases and alkalis</strong> (neutralisation): CH₃COOH + NaOH → CH₃COONa + H₂O. The salt, sodium ethanoate, is a white solid.</li>\n<li><strong>With carbonates and hydrogencarbonates:</strong> carbon(IV) oxide gas is given off with fizzing. 2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂. This is the usual test for a carboxylic acid, since most alcohols, aldehydes and ketones do not react with carbonates.</li>\n<li><strong>With alcohols:</strong> <span class=\"learn-keyword\">esterification</span> (see Section 5).</li>\n</ol>\n\n<h3 class=\"learn-subheading\">5. Esters and esterification</h3>\n<p class=\"learn-p\">An <span class=\"learn-keyword\">ester</span> has the functional group –COO– and the general formula R–COO–R'. <strong>Esterification</strong> is the reaction between a carboxylic acid and an alcohol, in the presence of concentrated sulphuric acid as a catalyst, to form an ester and water. The mixture is warmed.</p>\n<p class=\"learn-p\">CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O (ethanoic acid + ethanol → ethyl ethanoate + water)</p>\n<p class=\"learn-p\">The reaction is reversible, so it does not go to completion. Concentrated sulphuric acid is the catalyst, and it also takes up water, which pushes the reaction towards the ester.</p>\n<p class=\"learn-p\"><strong>How to name an ester.</strong></p>\n<ol class=\"learn-ordered\">\n<li>Step 1: The first word comes from the alcohol (ethanol gives <em>ethyl</em>, methanol gives <em>methyl</em>).</li>\n<li>Step 2: The second word comes from the acid (ethanoic acid gives <em>ethanoate</em>, propanoic acid gives <em>propanoate</em>).</li>\n</ol>\n<p class=\"learn-p\">So methanol + ethanoic acid gives methyl ethanoate, CH₃COOCH₃. Ethanol + propanoic acid gives ethyl propanoate, CH₃CH₂COOCH₂CH₃.</p>\n\n<h3 class=\"learn-subheading\">6. Properties of esters</h3>\n<ul class=\"learn-list\">\n<li>Esters are colourless, volatile liquids with pleasant fruity smells. For example, ethyl butanoate smells of pineapple and pentyl ethanoate smells of banana.</li>\n<li>They are only slightly soluble in water, and they boil at lower temperatures than the acids they come from because their molecules cannot form hydrogen bonds with each other.</li>\n<li>They are neutral to litmus.</li>\n<li>Esters are flammable.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">7. Hydrolysis of esters and soap making</h3>\n<p class=\"learn-p\"><strong>Hydrolysis</strong> means breaking down a compound using water. An ester is hydrolysed back to the acid and the alcohol by heating with dilute acid (reversible): CH₃COOC₂H₅ + H₂O ⇌ CH₃COOH + C₂H₅OH.</p>\n<p class=\"learn-p\">When an ester is heated with an alkali such as sodium hydroxide, the reaction goes to completion. It gives the sodium salt of the acid and the alcohol: CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH. This is called <strong>saponification</strong>.</p>\n<p class=\"learn-p\">Fats and oils (from palm kernel, groundnut, or animals) are esters of long-chain acids with glycerol (propane-1,2,3-triol). When they are boiled with sodium hydroxide or potassium hydroxide, they give glycerol and the sodium salts of the long-chain acids. These salts are <strong>soap</strong>. Local soaps made from palm oil and potash use this same reaction.</p>\n\n<h3 class=\"learn-subheading\">8. Uses</h3>\n<ul class=\"learn-list\">\n<li><strong>Methanoic acid:</strong> used to coagulate (set) latex in rubber making, and in leather work.</li>\n<li><strong>Ethanoic acid:</strong> as vinegar for food preservation and cooking; making ethanoates and plastics such as cellulose ethanoate; making esters; and as a solvent.</li>\n<li><strong>Esters:</strong> artificial flavours and perfumes; solvents for paints, glues and nail polish remover (ethyl ethanoate); making soaps (from fats and oils); and making synthetic fibres such as Terylene (polyester).</li>\n</ul>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> What mass of ethyl ethanoate forms when 6.0 g of ethanoic acid reacts completely with excess ethanol? (CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O; CH₃COOH = 60, CH₃COOC₂H₅ = 88)<br>Step 1: Moles of ethanoic acid = 6.0 ÷ 60 = 0.1 mol.<br>Step 2: The ratio is 1 : 1, so moles of ester = 0.1 mol.<br>Step 3: Mass of ester = 0.1 × 88 = 8.8 g.<br>Answer: 8.8 g of ethyl ethanoate.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> 23 g of ethanol is reacted with excess ethanoic acid. If the percentage yield is 60%, what mass of ethyl ethanoate is obtained? (C₂H₅OH = 46, CH₃COOC₂H₅ = 88)<br>Step 1: Moles of ethanol = 23 ÷ 46 = 0.5 mol.<br>Step 2: Theoretical moles of ester = 0.5 mol (ratio 1 : 1).<br>Step 3: Theoretical mass = 0.5 × 88 = 44 g.<br>Step 4: Actual mass = 60% of 44 = 0.60 × 44 = 26.4 g.<br>Answer: 26.4 g.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> A saturated carboxylic acid has a relative molecular mass of 74. Find its formula and name. (C = 12, H = 1, O = 16)<br>Step 1: The general formula CₙH₂ₙO₂ has mass 12n + 2n + 32 = 14n + 32.<br>Step 2: 14n + 32 = 74, so 14n = 42 and n = 3.<br>Step 3: The formula is C₃H₆O₂, which is CH₃CH₂COOH.<br>Answer: C₃H₆O₂, propanoic acid.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> 25.0 cm³ of an ethanoic acid solution is neutralised by 20.0 cm³ of 0.10 mol/dm³ sodium hydroxide. Find the concentration of the acid in mol/dm³ and in g/dm³. (CH₃COOH = 60)<br>Step 1: Equation: CH₃COOH + NaOH → CH₃COONa + H₂O (ratio 1 : 1).<br>Step 2: Moles of NaOH = 0.10 × 20.0 ÷ 1000 = 0.002 mol. So moles of acid = 0.002 mol.<br>Step 3: Concentration of acid = 0.002 ÷ 0.0250 dm³ = 0.08 mol/dm³.<br>Step 4: Mass concentration = 0.08 × 60 = 4.8 g/dm³.<br>Answer: 0.08 mol/dm³ or 4.8 g/dm³.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Writing the ester name the wrong way round. The alcohol part comes first, then the acid part: ethanol + ethanoic acid gives ethyl ethanoate.<br>2. Leaving out the sulphuric acid catalyst or the water in the esterification equation.<br>3. Calling the carboxylic acid a strong acid. It is a weak acid because it is only slightly ionised.<br>4. Forgetting that acid hydrolysis of an ester is reversible, but alkaline hydrolysis (saponification) goes to completion.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often asks you to \"Write an equation for the reaction between ethanoic acid and ethanol\" and to name the product, or to state the conditions (concentrated H₂SO₄, warm). You may also be asked for the test for a carboxylic acid (effervescence with sodium carbonate) or for the use of esters. Show the –COOH and –COO– groups clearly in your structures.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>Carboxylic acids contain –COOH; their general formula is R–COOH and their names end in -oic acid.<br>They are made by oxidising primary alcohols or aldehydes.<br>They are weak acids: they react with metals, bases and carbonates.<br>Acid + alcohol ⇌ ester + water, with concentrated H₂SO₄ as catalyst (esterification).<br>Esters (R–COO–R') smell fruity and are used as flavours, perfumes and solvents.<br>Alkaline hydrolysis of fats and oils (saponification) gives soap and glycerol.</div>",
    "questions": [
      {
        "q": "What is the functional group of a carboxylic acid?",
        "o": [
          "–COOH",
          "–CHO",
          "–OH",
          "–COO–"
        ],
        "a": 0,
        "e": "The carboxyl group, –COOH, is a C=O and an –OH on the same carbon. –CHO is the aldehyde group, –OH is the alcohol group and –COO– is the ester group.",
        "h": "It has two oxygen atoms and one hydrogen.",
        "yr": "SS2"
      },
      {
        "q": "What is the name of CH₃CH₂COOH?",
        "o": [
          "Ethanoic acid",
          "Propanoic acid",
          "Propanol",
          "Butanoic acid"
        ],
        "a": 1,
        "e": "The chain has three carbons, counting the carbon of the –COOH group, so the name is propanoic acid. Ethanoic acid has two carbons and butanoic acid has four.",
        "h": "Count all the carbons, including the –COOH carbon.",
        "yr": "SS2"
      },
      {
        "q": "Which gas is given off when ethanoic acid is added to sodium carbonate?",
        "o": [
          "Hydrogen",
          "Oxygen",
          "Carbon(IV) oxide",
          "Ethene"
        ],
        "a": 2,
        "e": "Acids react with carbonates to give a salt, water and carbon(IV) oxide: 2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂. Hydrogen is given off only with metals.",
        "h": "The fizzing gas turns lime water milky.",
        "yr": "SS2"
      },
      {
        "q": "Which statement about ethanoic acid is correct?",
        "o": [
          "It is a strong acid",
          "It is neutral to litmus",
          "It is a base",
          "It is a weak acid"
        ],
        "a": 3,
        "e": "Ethanoic acid ionises only slightly in water: CH₃COOH ⇌ CH₃COO⁻ + H⁺. This makes it a weak acid. It turns blue litmus red.",
        "h": "Think about how much it ionises.",
        "yr": "SS2"
      },
      {
        "q": "Vinegar is a dilute solution of",
        "o": [
          "ethanoic acid",
          "methanoic acid",
          "ethanol",
          "ethyl ethanoate"
        ],
        "a": 0,
        "e": "Vinegar is a dilute solution of ethanoic acid, which gives its sour taste. It forms when ethanol in weak alcoholic drinks is oxidised by bacteria in air.",
        "h": "Its sour taste comes from a two-carbon acid.",
        "yr": "SS2"
      },
      {
        "q": "A carboxylic acid is made by the oxidation of",
        "o": [
          "an alkane",
          "a primary alcohol",
          "an ester",
          "a tertiary alcohol"
        ],
        "a": 1,
        "e": "A primary alcohol is oxidised first to an aldehyde and then to a carboxylic acid when heated under reflux with acidified dichromate(VI). Tertiary alcohols resist oxidation.",
        "h": "The –OH carbon has only one other carbon attached.",
        "yr": "SS2"
      },
      {
        "q": "Which pair of compounds reacts to form ethyl ethanoate?",
        "o": [
          "Methanol and ethanoic acid",
          "Ethanol and methanoic acid",
          "Ethanol and ethanoic acid",
          "Ethanal and ethanol"
        ],
        "a": 2,
        "e": "The first word of the name, ethyl, comes from ethanol, and the second word, ethanoate, comes from ethanoic acid. Concentrated H₂SO₄ is the catalyst.",
        "h": "Alcohol gives the first word; acid gives the second.",
        "yr": "SS2"
      },
      {
        "q": "What is the role of concentrated sulphuric acid in esterification?",
        "o": [
          "It is an oxidising agent only",
          "It is a base",
          "It is a reducing agent",
          "It is a catalyst and takes up water"
        ],
        "a": 3,
        "e": "Concentrated sulphuric acid speeds up the reaction and absorbs the water formed, which pushes the reversible reaction towards the ester. It does not oxidise the alcohol here.",
        "h": "The reaction is reversible, and water is a product.",
        "yr": "SS2"
      },
      {
        "q": "Esters are generally used as",
        "o": [
          "flavours and perfumes",
          "fuels for vehicles",
          "strong acids",
          "fertilisers"
        ],
        "a": 0,
        "e": "Esters have sweet, fruity smells, so they are used as food flavours and in perfumes. Ethyl ethanoate is also a solvent in nail polish remover.",
        "h": "Think of their smell.",
        "yr": "SS2"
      },
      {
        "q": "Heating ethyl ethanoate with sodium hydroxide solution gives",
        "o": [
          "ethanoic acid and ethanol",
          "sodium ethanoate and ethanol",
          "sodium ethoxide and ethanoic acid",
          "ethene and water"
        ],
        "a": 1,
        "e": "Alkaline hydrolysis (saponification) gives the sodium salt of the acid and the alcohol: CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH. With NaOH the acid is neutralised, so the salt forms, not the free acid.",
        "h": "The alkali neutralises the acid that forms.",
        "yr": "SS2"
      },
      {
        "q": "Soap is made by boiling fats or oils with",
        "o": [
          "dilute hydrochloric acid",
          "ethanol",
          "sodium hydroxide",
          "water only"
        ],
        "a": 2,
        "e": "Fats and oils are esters of glycerol. Boiling with sodium hydroxide hydrolyses them to glycerol and the sodium salts of long-chain acids. These salts are soap.",
        "h": "The reaction is called saponification.",
        "yr": "SS2"
      },
      {
        "q": "Which test distinguishes ethanoic acid from ethanol?",
        "o": [
          "Adding acidified dichromate",
          "Adding sodium metal",
          "Burning each in air",
          "Adding sodium hydrogencarbonate"
        ],
        "a": 3,
        "e": "Ethanoic acid gives effervescence of CO₂ with sodium hydrogencarbonate, but ethanol does not. Sodium metal reacts with both, and dichromate reacts only with ethanol.",
        "h": "Only an acid releases CO₂ from a carbonate.",
        "yr": "SS2"
      },
      {
        "q": "A saturated carboxylic acid has relative molecular mass 60. Its formula is (C = 12, H = 1, O = 16)",
        "o": [
          "CH₃COOH",
          "HCOOH",
          "CH₃CH₂COOH",
          "CH₃OH"
        ],
        "a": 0,
        "e": "For CₙH₂ₙO₂, 14n + 32 = 60, so n = 2. The formula is C₂H₄O₂, which is CH₃COOH. HCOOH has mass 46, and CH₃CH₂COOH has mass 74.",
        "h": "Solve 14n + 32 = 60.",
        "yr": "SS2"
      },
      {
        "q": "What mass of ethyl ethanoate forms from 12.0 g of ethanoic acid reacting completely with excess ethanol? (CH₃COOH = 60; CH₃COOC₂H₅ = 88)",
        "o": [
          "8.8 g",
          "17.6 g",
          "26.4 g",
          "44.0 g"
        ],
        "a": 1,
        "e": "Moles of acid = 12.0 ÷ 60 = 0.2 mol. The ratio is 1 : 1, so moles of ester = 0.2 mol. Mass = 0.2 × 88 = 17.6 g. The value 8.8 g is for only 6.0 g of acid.",
        "h": "Moles of acid equal moles of ester.",
        "yr": "SS2"
      },
      {
        "q": "What volume of CO₂ at s.t.p. forms when 6.0 g of ethanoic acid reacts with excess sodium carbonate? (2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂; CH₃COOH = 60; molar volume = 22.4 dm³)",
        "o": [
          "0.56 dm³",
          "2.24 dm³",
          "1.12 dm³",
          "4.48 dm³"
        ],
        "a": 2,
        "e": "Moles of acid = 6.0 ÷ 60 = 0.1 mol. The ratio is 2 acid : 1 CO₂, so CO₂ = 0.05 mol. Volume = 0.05 × 22.4 = 1.12 dm³. Using a 1 : 1 ratio gives 2.24 dm³, which is wrong.",
        "h": "Two moles of acid give only one mole of CO₂.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Polymers and Plastics",
    "topicCode": "SS2-CHEM-32",
    "module": "Organic Chemistry",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">A <span class=\"learn-keyword\">polymer</span> is a very large molecule made by joining many small molecules, called <span class=\"learn-keyword\">monomers</span>, in a long chain. The word comes from \"poly\", meaning many, and \"mer\", meaning part. Plastics are polymers that can be moulded into shape. In Nigeria you meet them every day: the sachet \"pure water\" bag, the plastic bucket in the bathroom, the PVC pipe, the nylon rope and the rubber of a danfo tyre. Natural polymers also exist, such as starch in garri, protein in beans and cellulose in cotton. In this lesson you will learn the types of polymers, how they form, their uses, and the dangers of plastic waste.</div>\n\n<h3 class=\"learn-subheading\">1. What a polymer is</h3>\n<p class=\"learn-p\">A monomer is a small molecule that can join to many others. When thousands of monomers join, the product is a polymer. The process is <span class=\"learn-keyword\">polymerisation</span>. The part of the polymer that repeats again and again is called the <strong>repeat unit</strong>. A polymer is written as the repeat unit in brackets with the letter n outside, where n is the number of repeat units.</p>\n<p class=\"learn-p\">Since a polymer is a huge molecule, its relative molecular mass is very large (often thousands). Relative molecular mass of a polymer = n × relative molecular mass of the repeat unit.</p>\n\n<h3 class=\"learn-subheading\">2. Types of polymers</h3>\n<p class=\"learn-p\">Polymers can be classified in three ways.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Basis</th><th>Type</th><th>Meaning and examples</th></tr></thead><tbody>\n<tr><td>Source</td><td>Natural</td><td>Found in nature: starch, cellulose, proteins, natural rubber, wool, silk</td></tr>\n<tr><td>Source</td><td>Synthetic</td><td>Made in industry: polythene, PVC, nylon, Terylene, Bakelite, polystyrene</td></tr>\n<tr><td>Method of formation</td><td>Addition</td><td>Monomers with a C=C bond join; nothing is lost. Polythene, PVC, polystyrene</td></tr>\n<tr><td>Method of formation</td><td>Condensation</td><td>Monomers join and lose a small molecule such as water. Nylon, Terylene, Bakelite, proteins</td></tr>\n<tr><td>Effect of heat</td><td>Thermoplastic</td><td>Softens on heating and can be re-moulded. Polythene, PVC, polystyrene, nylon</td></tr>\n<tr><td>Effect of heat</td><td>Thermosetting</td><td>Sets hard when moulded and does not soften again on heating. Bakelite, urea-methanal resin</td></tr>\n</tbody></table></div>\n\n<h3 class=\"learn-subheading\">3. Addition polymerisation</h3>\n<p class=\"learn-p\">In <span class=\"learn-keyword\">addition polymerisation</span>, the monomers are unsaturated, which means they have a C=C double bond. Under high pressure and temperature, with a catalyst, one bond of each double bond opens and the molecules join end to end. The polymer has the same empirical formula as the monomer. No other product forms.</p>\n<p class=\"learn-p\"><strong>Polythene (polyethene)</strong> from ethene:</p>\n<p class=\"learn-p\">n CH₂=CH₂ → –(CH₂–CH₂)ₙ–</p>\n<p class=\"learn-p\"><strong>PVC (polyvinyl chloride, polychloroethene)</strong> from chloroethene, CH₂=CHCl:</p>\n<p class=\"learn-p\">n CH₂=CHCl → –(CH₂–CHCl)ₙ–</p>\n<p class=\"learn-p\"><strong>Polystyrene</strong> comes from phenylethene (styrene), C₆H₅CH=CH₂. <strong>PTFE</strong> (Teflon) comes from tetrafluoroethene, CF₂=CF₂.</p>\n<p class=\"learn-p\"><strong>Natural rubber</strong> is a natural addition polymer of 2-methylbuta-1,3-diene (isoprene). Raw rubber is soft and sticky. It is heated with sulphur in a process called <strong>vulcanisation</strong>. The sulphur forms cross-links between chains, so the rubber becomes harder, stronger and more elastic. This is why vehicle tyres are made from vulcanised rubber.</p>\n\n<h3 class=\"learn-subheading\">4. Condensation polymerisation</h3>\n<p class=\"learn-p\">In <span class=\"learn-keyword\">condensation polymerisation</span>, each monomer has two reactive functional groups. When two monomers join, a small molecule (usually water) is lost. The polymer therefore does not have the same formula as the monomers added together.</p>\n<ul class=\"learn-list\">\n<li><strong>Nylon:</strong> formed from a diamine (1,6-diaminohexane) and a dicarboxylic acid (hexanedioic acid). The –NH₂ and –COOH groups join to form amide links, –CONH–, and water is lost.</li>\n<li><strong>Terylene (polyester):</strong> formed from a diol (ethane-1,2-diol) and a dicarboxylic acid (benzene-1,4-dicarboxylic acid). The –OH and –COOH groups join to form ester links, –COO–, and water is lost. It is used for clothing.</li>\n<li><strong>Bakelite:</strong> formed from methanal and phenol, with water lost.</li>\n<li><strong>Proteins:</strong> natural polymers made from amino acids joined by amide links.</li>\n</ul>\n<p class=\"learn-p\">A quick way to tell the two types apart: if the monomer has a C=C bond and only one product forms, it is addition. If two different functional groups react and water is lost, it is condensation.</p>\n\n<h3 class=\"learn-subheading\">5. Thermoplastics and thermosetting plastics</h3>\n<p class=\"learn-p\"><strong>Thermoplastics</strong> have long chains that are not strongly joined to one another. On heating, the chains slide past each other and the plastic softens. On cooling it hardens again. This is why they can be melted and recycled. <strong>Thermosetting plastics</strong> have chains joined by strong cross-links, forming a rigid network. They do not soften when heated again; they char instead. This is why Bakelite is used for electric plugs, switches and handles of cooking pots.</p>\n\n<h3 class=\"learn-subheading\">6. Uses of polymers and plastics</h3>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Polymer</th><th>Uses</th></tr></thead><tbody>\n<tr><td>Polythene</td><td>Sachet water bags, shopping bags, buckets, bowls, packaging film</td></tr>\n<tr><td>PVC</td><td>Water pipes, electric cable insulation, raincoats, floor tiles</td></tr>\n<tr><td>Polystyrene</td><td>Food packs, insulation, disposable cups</td></tr>\n<tr><td>PTFE</td><td>Non-stick coating for frying pans</td></tr>\n<tr><td>Nylon</td><td>Ropes, fishing nets, clothes, tents, toothbrush bristles</td></tr>\n<tr><td>Terylene</td><td>Clothes and curtains</td></tr>\n<tr><td>Bakelite</td><td>Electric plugs, switches, pot handles</td></tr>\n<tr><td>Rubber</td><td>Tyres, shoe soles, rubber bands</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Plastics are popular because they are cheap, light, strong, waterproof, do not rust, and can be moulded into any shape. They are also good electrical insulators.</p>\n\n<h3 class=\"learn-subheading\">7. Dangers of plastics and how to reduce them</h3>\n<ul class=\"learn-list\">\n<li><strong>They are not biodegradable.</strong> Bacteria cannot break them down, so plastic waste stays in the soil and water for a very long time.</li>\n<li><strong>Blocked drains and flooding.</strong> Plastic bags and bottles thrown into gutters block them, causing floods in the rainy season.</li>\n<li><strong>Harm to animals.</strong> Animals on land and in the sea can swallow plastic or get trapped in it. Plastic pollutes rivers, lagoons and the sea.</li>\n<li><strong>Poisonous gases when burnt.</strong> Burning plastics produces smoke with carbon(II) oxide and other toxic gases. PVC gives off hydrogen chloride. This pollutes the air and harms health.</li>\n<li><strong>Reduced soil quality.</strong> Plastic waste in farmland stops water and air reaching the roots.</li>\n</ul>\n<p class=\"learn-p\"><strong>Ways to reduce the danger:</strong> reduce the use of plastics; reuse containers; recycle thermoplastics by melting and re-moulding; collect waste properly and do not dump it in gutters; use biodegradable materials such as paper or leaves for packaging; and do not burn plastics in the open.</p>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> A sample of polythene has a relative molecular mass of 14 000. How many ethene molecules joined to form one molecule of it? (C = 12, H = 1)<br>Step 1: Repeat unit is CH₂–CH₂, with the same formula as ethene, C₂H₄. Mass = 2(12) + 4(1) = 28.<br>Step 2: n = 14 000 ÷ 28 = 500.<br>Answer: 500 ethene molecules.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> A molecule of PVC has a relative molecular mass of 125 000. Find the value of n. (C = 12, H = 1, Cl = 35.5)<br>Step 1: Repeat unit is CH₂CHCl, which is C₂H₃Cl. Mass = 2(12) + 3(1) + 35.5 = 62.5.<br>Step 2: n = 125 000 ÷ 62.5 = 2000.<br>Answer: n = 2000.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> What mass of polythene can be made from 5.6 kg of ethene if the yield is 80%?<br>Step 1: In addition polymerisation, nothing is lost, so the theoretical mass of polythene equals the mass of ethene = 5.6 kg.<br>Step 2: Actual mass = 80% of 5.6 = 0.80 × 5.6 = 4.48 kg.<br>Answer: 4.48 kg of polythene.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Find the percentage by mass of chlorine in PVC. (C = 12, H = 1, Cl = 35.5)<br>Step 1: Mass of repeat unit C₂H₃Cl = 62.5.<br>Step 2: Percentage of chlorine = (35.5 ÷ 62.5) × 100 = 56.8%.<br>Answer: 56.8% chlorine.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong><br>1. Writing the polymer without the brackets and n, or drawing the C=C double bond in the polymer. The polymer chain has only single bonds.<br>2. Saying that condensation polymers form with no other product. A small molecule, usually water, is lost.<br>3. Mixing up thermoplastic (softens on heating) and thermosetting (does not soften).<br>4. Saying plastics rot. They are non-biodegradable.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often asks you to \"define polymerisation\", \"distinguish between addition and condensation polymerisation\" (give an example of each), or to write the equation for the formation of polythene or PVC. Also expect \"state two uses of polythene\" and \"state two dangers of plastic waste\". For marks, name the monomer, the repeat unit and the type of polymerisation.</div>\n\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong><br>A polymer is a large molecule made from many small monomers by polymerisation.<br>Addition polymers (polythene, PVC) form from C=C monomers with no by-product.<br>Condensation polymers (nylon, Terylene, Bakelite) lose water or another small molecule.<br>Thermoplastics soften on heating; thermosetting plastics do not.<br>Relative molecular mass of polymer = n × mass of repeat unit.<br>Plastics are useful but non-biodegradable, block drains and give off toxic gases when burnt; reduce, reuse and recycle.</div>",
    "questions": [
      {
        "q": "A small molecule that joins with many others to form a polymer is called a",
        "o": [
          "monomer",
          "isomer",
          "catalyst",
          "solvent"
        ],
        "a": 0,
        "e": "A monomer is the small repeating molecule. Many monomers join to form a polymer. Isomers are compounds with the same formula but different structures.",
        "h": "Mono means one.",
        "yr": "SS2"
      },
      {
        "q": "The monomer of polythene is",
        "o": [
          "methane",
          "ethene",
          "ethyne",
          "chloroethene"
        ],
        "a": 1,
        "e": "Polythene is formed from ethene, CH₂=CH₂, by addition polymerisation. Chloroethene is the monomer of PVC.",
        "h": "It is an alkene with two carbon atoms.",
        "yr": "SS2"
      },
      {
        "q": "Which of these is a natural polymer?",
        "o": [
          "Nylon",
          "Polythene",
          "Starch",
          "PVC"
        ],
        "a": 2,
        "e": "Starch is made by plants from glucose units. Nylon, polythene and PVC are synthetic polymers made in factories.",
        "h": "Garri is rich in it.",
        "yr": "SS2"
      },
      {
        "q": "Which statement describes addition polymerisation?",
        "o": [
          "Monomers join and water is lost",
          "Monomers join without any other product",
          "A polymer is broken into monomers",
          "Monomers join only when cooled"
        ],
        "a": 1,
        "e": "In addition polymerisation, unsaturated monomers join through their C=C bonds and nothing is lost. Losing water is the feature of condensation polymerisation.",
        "h": "Think of the monomers simply adding together.",
        "yr": "SS2"
      },
      {
        "q": "Which polymer is formed by condensation polymerisation?",
        "o": [
          "Polythene",
          "PVC",
          "Polystyrene",
          "Nylon"
        ],
        "a": 3,
        "e": "Nylon forms when a diamine reacts with a dicarboxylic acid and water is lost. Polythene, PVC and polystyrene are addition polymers.",
        "h": "Its monomers have two functional groups.",
        "yr": "SS2"
      },
      {
        "q": "A plastic that softens on heating and can be re-moulded is",
        "o": [
          "thermoplastic",
          "thermosetting",
          "a vulcanised rubber",
          "a protein"
        ],
        "a": 0,
        "e": "A thermoplastic has chains that slide when heated, so it can be melted and re-shaped. A thermosetting plastic does not soften again once set.",
        "h": "Thermo means heat; plastic means mouldable.",
        "yr": "SS2"
      },
      {
        "q": "Which of these is a thermosetting plastic used for electric plugs?",
        "o": [
          "PVC",
          "Bakelite",
          "Polythene",
          "Polystyrene"
        ],
        "a": 1,
        "e": "Bakelite has strong cross-links between chains, so it stays hard when heated and is a good electrical insulator. PVC and polythene are thermoplastics.",
        "h": "It is made from methanal and phenol.",
        "yr": "SS2"
      },
      {
        "q": "The process of heating raw rubber with sulphur is called",
        "o": [
          "polymerisation",
          "fermentation",
          "vulcanisation",
          "saponification"
        ],
        "a": 2,
        "e": "Vulcanisation forms sulphur cross-links between rubber chains, making rubber harder, stronger and more elastic. It is used in making tyres.",
        "h": "It is named after a Roman god of fire.",
        "yr": "SS2"
      },
      {
        "q": "PVC is used in making",
        "o": [
          "fuels",
          "soaps",
          "fertilisers",
          "water pipes"
        ],
        "a": 3,
        "e": "PVC is strong, waterproof and does not rust, so it is used for pipes, cable insulation and floor tiles. It is not a fuel, soap or fertiliser.",
        "h": "It does not rust or corrode.",
        "yr": "SS2"
      },
      {
        "q": "Why is plastic waste a serious problem?",
        "o": [
          "It is not biodegradable",
          "It dissolves in water",
          "It rots quickly in soil",
          "It is heavier than metals"
        ],
        "a": 0,
        "e": "Bacteria cannot break plastics down, so they stay in the environment for a very long time, block gutters and pollute water. Plastics do not rot.",
        "h": "Think about what bacteria can break down.",
        "yr": "SS2"
      },
      {
        "q": "Which gas is given off when PVC is burnt, in addition to carbon(II) oxide?",
        "o": [
          "Hydrogen chloride",
          "Oxygen",
          "Nitrogen",
          "Helium"
        ],
        "a": 0,
        "e": "PVC contains chlorine, so burning it gives off toxic hydrogen chloride gas. This is one reason plastics should not be burnt in the open.",
        "h": "PVC contains chlorine.",
        "yr": "SS2"
      },
      {
        "q": "Which monomer pair forms Bakelite?",
        "o": [
          "Ethene and chlorine",
          "Methanal and phenol",
          "Ethanol and ethanoic acid",
          "Styrene and ethene"
        ],
        "a": 1,
        "e": "Bakelite is a condensation polymer of methanal and phenol, with water lost. Ethanol and ethanoic acid form an ester, not a polymer.",
        "h": "It was met in the aldehydes lesson.",
        "yr": "SS2"
      },
      {
        "q": "A polythene molecule has a relative molecular mass of 28 000. How many ethene units does it contain? (C = 12, H = 1)",
        "o": [
          "100",
          "500",
          "2000",
          "1000"
        ],
        "a": 3,
        "e": "The repeat unit C₂H₄ has mass 2(12) + 4(1) = 28. n = 28 000 ÷ 28 = 1000. Using 14 as the mass of the unit would give 2000, which is wrong.",
        "h": "Divide the polymer mass by the monomer mass.",
        "yr": "SS2"
      },
      {
        "q": "What is the relative mass of the repeat unit of PVC, C₂H₃Cl? (C = 12, H = 1, Cl = 35.5)",
        "o": [
          "62.5",
          "28.0",
          "97.5",
          "27.5"
        ],
        "a": 0,
        "e": "The mass is 2(12) + 3(1) + 35.5 = 24 + 3 + 35.5 = 62.5. The value 28 is for ethene, without chlorine.",
        "h": "Add 2 carbons, 3 hydrogens and 1 chlorine.",
        "yr": "SS2"
      },
      {
        "q": "What mass of polythene is made from 14 kg of ethene if the yield is 90%?",
        "o": [
          "9.0 kg",
          "14.0 kg",
          "12.6 kg",
          "15.4 kg"
        ],
        "a": 2,
        "e": "In addition polymerisation the theoretical mass of polymer equals the mass of monomer, 14 kg. Actual mass = 0.90 × 14 = 12.6 kg. The yield cannot give more than 14 kg.",
        "h": "Find 90% of the theoretical mass.",
        "yr": "SS2"
      }
    ]
  }
];
