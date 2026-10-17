// ============================================================================
// SS1 PHYSICS — COMPLETE LEARNING MODULE (18 TOPICS)
// NERDC Scheme of Work — First Term to Third Term
// ============================================================================

export const WAEC_PHYSICS_LEARN_SS1 = [
  {
    "topic": "Fundamentals and Derived Quantities and Units",
    "topicCode": "SS1-PHY-01",
    "module": "Measurement and Units",
    "term": "First Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Physics</span> is the science that deals with matter, energy, and the fundamental laws governing the universe. Before solving any physics problem, we must agree on how to <em>measure</em> things. <span class=\"learn-keyword\">Physical quantities</span> are properties of matter or phenomena that can be measured. Every measurement requires both a number and a <span class=\"learn-keyword\">unit</span>. The international standard system of measurement used in science worldwide is the <span class=\"learn-keyword\">Système Internationale (SI)</span>, adopted by Nigeria and all modern scientific communities.\n</div>\n\n<h3 class=\"learn-subheading\">1. Physical Quantities</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">physical quantity</span> is any property that can be measured and expressed as a number with a unit. Examples: length (5 metres), mass (70 kilograms), time (3 seconds), force (20 newtons). Physical quantities are classified into two types: fundamental (base) and derived.</p>\n\n<h3 class=\"learn-subheading\">2. Fundamental (Base) Quantities and Units</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Fundamental quantities</span> are the basic quantities that cannot be defined in terms of other quantities. There are 7 SI base quantities:</p>\n\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Quantity</th><th>SI Unit</th><th>Symbol</th><th>Example in Nigeria</th></tr></thead>\n    <tbody>\n      <tr><td>Length</td><td>metre</td><td>m</td><td>Length of Lagos-Abuja road (~820 km)</td></tr>\n      <tr><td>Mass</td><td>kilogram</td><td>kg</td><td>Mass of a bag of rice (50 kg)</td></tr>\n      <tr><td>Time</td><td>second</td><td>s</td><td>Duration of WAEC Physics exam (3 hours)</td></tr>\n      <tr><td>Electric current</td><td>ampere</td><td>A</td><td>Current drawn by a television set</td></tr>\n      <tr><td>Temperature</td><td>kelvin</td><td>K</td><td>Temperature of molten iron</td></tr>\n      <tr><td>Amount of substance</td><td>mole</td><td>mol</td><td>Amount of oxygen in a flask</td></tr>\n      <tr><td>Luminous intensity</td><td>candela</td><td>cd</td><td>Brightness of a street lamp</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">3. Derived Quantities and Units</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Derived quantities</span> are obtained by combining fundamental quantities through multiplication, division, or both. Their units are combinations of base units.</p>\n\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Derived Quantity</th><th>Definition/Formula</th><th>SI Unit</th><th>Unit in Base Units</th></tr></thead>\n    <tbody>\n      <tr><td>Area</td><td>length × length</td><td>m²</td><td>m²</td></tr>\n      <tr><td>Volume</td><td>length³</td><td>m³</td><td>m³</td></tr>\n      <tr><td>Speed/Velocity</td><td>distance/time</td><td>m/s</td><td>m s⁻¹</td></tr>\n      <tr><td>Acceleration</td><td>velocity/time</td><td>m/s²</td><td>m s⁻²</td></tr>\n      <tr><td>Force</td><td>mass × acceleration</td><td>newton (N)</td><td>kg m s⁻²</td></tr>\n      <tr><td>Work/Energy</td><td>force × distance</td><td>joule (J)</td><td>kg m² s⁻²</td></tr>\n      <tr><td>Power</td><td>work/time</td><td>watt (W)</td><td>kg m² s⁻³</td></tr>\n      <tr><td>Pressure</td><td>force/area</td><td>pascal (Pa)</td><td>kg m⁻¹ s⁻²</td></tr>\n      <tr><td>Density</td><td>mass/volume</td><td>kg/m³</td><td>kg m⁻³</td></tr>\n      <tr><td>Frequency</td><td>1/period</td><td>hertz (Hz)</td><td>s⁻¹</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">SI System — Base Units to Derived Units</text>\n    <rect x=\"10\" y=\"30\" width=\"460\" height=\"155\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <text x=\"240\" y=\"52\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"10\" font-weight=\"bold\">7 Base Quantities → All Derived Quantities</text>\n    <text x=\"60\" y=\"75\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"8\">Length (m)</text>\n    <text x=\"150\" y=\"75\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"8\">Mass (kg)</text>\n    <text x=\"240\" y=\"75\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"8\">Time (s)</text>\n    <text x=\"330\" y=\"75\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"8\">Current (A)</text>\n    <text x=\"420\" y=\"75\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"8\">Temp (K)</text>\n    <line x1=\"60\" y1=\"80\" x2=\"140\" y2=\"110\" stroke=\"#7C3AED\" stroke-width=\"1\"/>\n    <line x1=\"150\" y1=\"80\" x2=\"160\" y2=\"110\" stroke=\"#7C3AED\" stroke-width=\"1\"/>\n    <line x1=\"240\" y1=\"80\" x2=\"210\" y2=\"110\" stroke=\"#7C3AED\" stroke-width=\"1\"/>\n    <line x1=\"330\" y1=\"80\" x2=\"290\" y2=\"110\" stroke=\"#7C3AED\" stroke-width=\"1\"/>\n    <line x1=\"420\" y1=\"80\" x2=\"360\" y2=\"110\" stroke=\"#7C3AED\" stroke-width=\"1\"/>\n    <rect x=\"110\" y=\"110\" width=\"260\" height=\"25\" rx=\"5\" fill=\"#2d1b4e\" stroke=\"#FFC53D\" stroke-width=\"1.5\"/>\n    <text x=\"240\" y=\"126\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"9\">Derived Quantities</text>\n    <text x=\"140\" y=\"155\" text-anchor=\"middle\" fill=\"#5eb4ff\" font-size=\"8\">Force = kg m s⁻²</text>\n    <text x=\"240\" y=\"155\" text-anchor=\"middle\" fill=\"#5eb4ff\" font-size=\"8\">Energy = kg m² s⁻²</text>\n    <text x=\"350\" y=\"155\" text-anchor=\"middle\" fill=\"#5eb4ff\" font-size=\"8\">Pressure = kg m⁻¹ s⁻²</text>\n    <text x=\"240\" y=\"175\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"8\">All derived units = combinations of the 7 base units</text>\n    <rect x=\"10\" y=\"30\" width=\"460\" height=\"155\" rx=\"8\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"1\">\n      <animate attributeName=\"opacity\" values=\"0.3;0.8;0.3\" dur=\"2s\" repeatCount=\"indefinite\"/>\n    </rect>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">4. Dimensional Analysis</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Dimensional analysis</span> is the process of checking the consistency of physical equations by examining the dimensions (units) of each quantity. It helps verify formulae and convert between units.</p>\n<p class=\"learn-p\"><strong>Dimensions of base quantities:</strong> Length [L], Mass [M], Time [T], Current [I], Temperature [θ], Amount [N], Luminous intensity [J]</p>\n<p class=\"learn-p\"><strong>Example:</strong> Verify that F = ma is dimensionally consistent.<br>\n[F] = [m][a] = kg × m s⁻² = kg m s⁻² = N ✓</p>\n<p class=\"learn-p\"><strong>Example:</strong> Show that the unit of work (joule) = kg m² s⁻²<br>\nW = F × d = (kg m s⁻²) × m = kg m² s⁻² ✓</p>\n\n<h3 class=\"learn-subheading\">5. SI Prefixes</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Prefix</th><th>Symbol</th><th>Multiplier</th><th>Example</th></tr></thead>\n    <tbody>\n      <tr><td>tera</td><td>T</td><td>10¹²</td><td>1 TB = 10¹² bytes</td></tr>\n      <tr><td>giga</td><td>G</td><td>10⁹</td><td>1 GHz = 10⁹ Hz</td></tr>\n      <tr><td>mega</td><td>M</td><td>10⁶</td><td>1 MW = 10⁶ W</td></tr>\n      <tr><td>kilo</td><td>k</td><td>10³</td><td>1 km = 10³ m</td></tr>\n      <tr><td>centi</td><td>c</td><td>10⁻²</td><td>1 cm = 10⁻² m</td></tr>\n      <tr><td>milli</td><td>m</td><td>10⁻³</td><td>1 mm = 10⁻³ m</td></tr>\n      <tr><td>micro</td><td>μ</td><td>10⁻⁶</td><td>1 μm = 10⁻⁶ m</td></tr>\n      <tr><td>nano</td><td>n</td><td>10⁻⁹</td><td>1 nm = 10⁻⁹ m</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> The 7 fundamental quantities must be memorised. A common mnemonic is <strong>MATLIKE C</strong>: <strong>M</strong>ass, <strong>A</strong>mount of substance (mole), <strong>T</strong>ime, <strong>L</strong>ength, <strong>I</strong>ntensity (luminous), <strong>K</strong>elvin (temperature), <strong>E</strong>lectric current, <strong>C</strong>andela. In WAEC, you are frequently asked to express derived units in terms of base units (e.g., \"express the unit of force in SI base units\").\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Physical quantities = fundamental + derived. 7 fundamental: mass (kg), length (m), time (s), temperature (K), electric current (A), amount of substance (mol), luminous intensity (cd). Derived quantities combine base units: speed (m/s), force (N = kg m s⁻²), energy (J = kg m² s⁻²), power (W = kg m² s⁻³), pressure (Pa = kg m⁻¹ s⁻²). Dimensional analysis checks equation consistency.\n</div>\n  ",
    "questions": [
      {
        "q": "How many fundamental (base) quantities are there in the SI system?",
        "o": [
          "5",
          "6",
          "7",
          "9"
        ],
        "a": 2,
        "e": "There are exactly 7 SI base quantities: mass, length, time, electric current, thermodynamic temperature, amount of substance, and luminous intensity. All other physical quantities are derived from these seven.",
        "h": "The 7 SI base quantities form the foundation of all measurement.",
        "yr": "SS1"
      },
      {
        "q": "Which of the following is a fundamental quantity?",
        "o": [
          "Force",
          "Velocity",
          "Electric current",
          "Pressure"
        ],
        "a": 2,
        "e": "Electric current (measured in amperes, A) is one of the 7 SI fundamental quantities. Force, velocity, and pressure are all derived quantities — they are obtained by combining fundamental quantities.",
        "h": "Fundamental quantities cannot be defined in terms of other quantities.",
        "yr": "SS1"
      },
      {
        "q": "The SI unit of electric current is:",
        "o": [
          "volt",
          "ohm",
          "watt",
          "ampere"
        ],
        "a": 3,
        "e": "The ampere (A) is the SI unit of electric current and one of the 7 base SI units. Volt is the unit of potential difference, ohm is resistance, and watt is power — all derived units.",
        "h": "Current → ampere (A). One of the 7 base SI units.",
        "yr": "SS1"
      },
      {
        "q": "Force in terms of SI base units is expressed as:",
        "o": [
          "kg m s⁻¹",
          "kg m s⁻²",
          "kg m² s⁻²",
          "kg m⁻¹ s⁻²"
        ],
        "a": 1,
        "e": "F = ma. [F] = kg × m s⁻² = kg m s⁻². The newton (N) = kg m s⁻². This is obtained from Newton's second law: force = mass × acceleration, where acceleration has units m s⁻².",
        "h": "F = ma → kg × (m/s²) = kg m s⁻².",
        "yr": "SS1"
      },
      {
        "q": "Energy (joule) expressed in SI base units is:",
        "o": [
          "kg m s⁻²",
          "kg m² s⁻²",
          "kg m s⁻³",
          "kg m² s⁻³"
        ],
        "a": 1,
        "e": "W = F × d = (kg m s⁻²) × m = kg m² s⁻². The joule (J) = kg m² s⁻². This can also be derived from kinetic energy ½mv² = kg × (m s⁻¹)² = kg m² s⁻².",
        "h": "Energy = Force × distance = kg m s⁻² × m = kg m² s⁻².",
        "yr": "SS1"
      },
      {
        "q": "What is the SI prefix for 10⁻³?",
        "o": [
          "micro (μ)",
          "milli (m)",
          "centi (c)",
          "nano (n)"
        ],
        "a": 1,
        "e": "Milli (m) represents 10⁻³. So 1 millimetre = 10⁻³ m, 1 milligramme = 10⁻³ g. Micro = 10⁻⁶, centi = 10⁻², nano = 10⁻⁹.",
        "h": "milli = 10⁻³. Remember: mm, mg, ms.",
        "yr": "SS1"
      },
      {
        "q": "Which of the following is a DERIVED quantity?",
        "o": [
          "Mass",
          "Length",
          "Time",
          "Density"
        ],
        "a": 3,
        "e": "Density = mass/volume = mass/length³, so it is derived from two fundamental quantities (mass and length). Mass, length, and time are fundamental (base) quantities.",
        "h": "Derived = made from combining base quantities. Density = mass/volume.",
        "yr": "SS1"
      },
      {
        "q": "What does dimensional analysis allow physicists to do?",
        "o": [
          "Calculate exact numerical answers",
          "Check the consistency and correctness of physical equations",
          "Measure quantities directly",
          "Convert Celsius to Fahrenheit"
        ],
        "a": 1,
        "e": "Dimensional analysis checks whether the units (dimensions) on both sides of an equation are consistent. It can verify formulae, detect errors, and derive relationships between quantities, but cannot give numerical constants.",
        "h": "Dimensional analysis checks unit consistency of equations.",
        "yr": "SS1"
      },
      {
        "q": "The SI unit of luminous intensity is:",
        "o": [
          "lux",
          "lumen",
          "candela",
          "watt"
        ],
        "a": 2,
        "e": "Candela (cd) is the SI base unit of luminous intensity — one of the 7 fundamental SI units. Lux is illuminance (lm/m²), lumen is luminous flux, watt is power.",
        "h": "Luminous intensity → candela (cd). A base SI unit.",
        "yr": "SS1"
      },
      {
        "q": "Power expressed in SI base units is:",
        "o": [
          "kg m s⁻²",
          "kg m² s⁻²",
          "kg m² s⁻³",
          "kg m s⁻³"
        ],
        "a": 2,
        "e": "Power = Work/Time. [P] = kg m² s⁻² / s = kg m² s⁻³. The watt (W) = kg m² s⁻³.",
        "h": "Power = Energy/Time = kg m² s⁻² / s = kg m² s⁻³.",
        "yr": "SS1"
      },
      {
        "q": "Convert 5000 metres to kilometres.",
        "o": [
          "0.5 km",
          "5 km",
          "50 km",
          "500 km"
        ],
        "a": 1,
        "e": "1 km = 1000 m = 10³ m. 5000 m = 5000/1000 km = 5 km. Using prefix: kilo = 10³, so divide by 10³.",
        "h": "1 km = 1000 m. Divide metres by 1000.",
        "yr": "SS1"
      },
      {
        "q": "Which quantity has the SI unit 'pascal' (Pa)?",
        "o": [
          "Force",
          "Work",
          "Pressure",
          "Power"
        ],
        "a": 2,
        "e": "Pressure is measured in pascals (Pa). 1 Pa = 1 N/m² = 1 kg m⁻¹ s⁻². Pressure = Force/Area.",
        "h": "Pascal (Pa) = unit of pressure = N/m².",
        "yr": "SS1"
      },
      {
        "q": "The amount of substance is measured in:",
        "o": [
          "kilogram",
          "kelvin",
          "mole",
          "candela"
        ],
        "a": 2,
        "e": "The mole (mol) is the SI unit for amount of substance — one of the 7 fundamental SI units. 1 mole = 6.022 × 10²³ particles (Avogadro's number).",
        "h": "Amount of substance → mole (mol). A base SI unit.",
        "yr": "SS1"
      },
      {
        "q": "In the expression v = u + at, what is the dimension of 'at'?",
        "o": [
          "[L]",
          "[LT⁻¹]",
          "[LT⁻²]",
          "[T]"
        ],
        "a": 1,
        "e": "a has dimensions [LT⁻²] (acceleration). t has dimensions [T]. Therefore at has dimensions [LT⁻²][T] = [LT⁻¹], which is the same as velocity [LT⁻¹]. This confirms dimensional consistency: v and at have the same dimensions.",
        "h": "a = [LT⁻²], t = [T]. at = [LT⁻²][T] = [LT⁻¹] = velocity.",
        "yr": "SS1"
      },
      {
        "q": "What is 3.5 × 10⁶ watts expressed in megawatts?",
        "o": [
          "3.5 MW",
          "35 MW",
          "350 MW",
          "0.35 MW"
        ],
        "a": 0,
        "e": "1 MW = 10⁶ W. 3.5 × 10⁶ W = 3.5 MW.",
        "h": "Mega = 10⁶. Divide by 10⁶ to convert to MW.",
        "yr": "SS1"
      },
      {
        "q": "The hertz (Hz) is the SI unit of:",
        "o": [
          "Heat",
          "Wavelength",
          "Frequency",
          "Height"
        ],
        "a": 2,
        "e": "Hertz (Hz) is the SI unit of frequency. 1 Hz = 1 cycle per second = 1 s⁻¹. In base units: Hz = s⁻¹.",
        "h": "Frequency (cycles per second) → hertz (Hz) = s⁻¹.",
        "yr": "SS1"
      },
      {
        "q": "Which of the following pairs correctly matches a physical quantity with its SI unit?",
        "o": [
          "Force — joule",
          "Work — newton",
          "Power — watt",
          "Pressure — newton"
        ],
        "a": 2,
        "e": "Power → watt (W) ✓. Force → newton (N), not joule. Work → joule (J), not newton. Pressure → pascal (Pa), not newton.",
        "h": "Power → watt. Force → newton. Work → joule. Pressure → pascal.",
        "yr": "SS1"
      },
      {
        "q": "Pressure in terms of base units is:",
        "o": [
          "kg m s⁻²",
          "kg m⁻¹ s⁻²",
          "kg m² s⁻²",
          "kg⁻¹ m s⁻²"
        ],
        "a": 1,
        "e": "Pressure = Force/Area = (kg m s⁻²)/m² = kg m⁻¹ s⁻². The pascal (Pa) = kg m⁻¹ s⁻².",
        "h": "Pressure = N/m² = kg m s⁻² / m² = kg m⁻¹ s⁻².",
        "yr": "SS1"
      },
      {
        "q": "Which fundamental quantity measures the 'hotness' of an object on an absolute scale?",
        "o": [
          "Heat energy",
          "Thermodynamic temperature",
          "Specific heat capacity",
          "Thermal conductivity"
        ],
        "a": 1,
        "e": "Thermodynamic temperature (measured in kelvin, K) is the SI base quantity for temperature on an absolute scale. 0 K = absolute zero (no thermal motion). Celsius uses an offset: T(K) = T(°C) + 273.15.",
        "h": "Thermodynamic temperature → kelvin (K). A base SI unit.",
        "yr": "SS1"
      },
      {
        "q": "A student writes: 'density = mass × volume'. Dimensional analysis shows this is wrong because:",
        "o": [
          "Density has no units",
          "The dimensions of mass × volume ≠ dimensions of density",
          "Volume is not a physical quantity",
          "Mass cannot be multiplied by volume"
        ],
        "a": 1,
        "e": "Correct formula is density = mass/volume. Dimensions: [M]/[L³] = kg m⁻³. But mass × volume = [M][L³] = kg m³, which is not density. Dimensional analysis immediately reveals the formula is incorrect because both sides must have the same dimensions.",
        "h": "Density = mass/volume, not mass × volume. Check dimensions: kg/m³ ≠ kg·m³.",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Measurements of Mass, Weight, Length and Time",
    "topicCode": "SS1-PHY-02",
    "module": "Measurement and Units",
    "term": "First Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  Accurate measurement is the bedrock of physics and all sciences. Every measurement involves choosing an appropriate instrument, using it correctly, and understanding the limitations of the measurement. This topic covers the measurement of four fundamental quantities — mass, weight, length, and time — with the instruments used, the concept of accuracy, and the types of errors that affect measurements. In Nigerian everyday life, measurement is critical: from weighing produce in Balogun Market to timing sprinters at national championships.\n</div>\n\n<h3 class=\"learn-subheading\">1. Mass and Its Measurement</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Mass</span> is the quantity of matter in a body. It is a scalar quantity and remains constant regardless of location (same on Earth as on the Moon). SI unit: kilogram (kg).</p>\n<ul class=\"learn-list\">\n  <li><strong>Beam balance:</strong> Compares unknown mass with known standard masses. Works on any planet. Used in chemistry labs, gold markets.</li>\n  <li><strong>Electronic balance:</strong> Measures mass digitally. Very accurate. Used in hospitals, pharmacies (like in Lagos medical labs).</li>\n  <li><strong>Spring balance (for weight, not mass):</strong> Reads weight (force of gravity) which varies with location.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">2. Weight and Its Measurement</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Weight</span> is the gravitational force acting on a body. It is a vector quantity (has both magnitude and direction — always toward Earth's centre). W = mg, where g = gravitational field strength (≈ 9.8 m/s² on Earth's surface). SI unit: newton (N).</p>\n<p class=\"learn-p\"><strong>Key distinction:</strong> A bag of rice has mass 50 kg everywhere, but weight = 50 × 9.8 = 490 N on Earth, and only about 81 N on the Moon (g_moon ≈ 1.6 m/s²).</p>\n\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Property</th><th>Mass</th><th>Weight</th></tr></thead>\n    <tbody>\n      <tr><td>Definition</td><td>Amount of matter</td><td>Gravitational force on body</td></tr>\n      <tr><td>Type</td><td>Scalar</td><td>Vector</td></tr>\n      <tr><td>SI Unit</td><td>kilogram (kg)</td><td>newton (N)</td></tr>\n      <tr><td>Measured with</td><td>Beam balance</td><td>Spring balance</td></tr>\n      <tr><td>Changes with location?</td><td>No — constant everywhere</td><td>Yes — varies with g</td></tr>\n      <tr><td>Can it be zero?</td><td>Never (matter always has mass)</td><td>Yes — in space (zero g)</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">3. Length and Its Measurement</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Length</span> is the measure of distance between two points. SI unit: metre (m). Different instruments are used depending on the scale of measurement:</p>\n\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Instrument</th><th>Range</th><th>Precision</th><th>Use</th></tr></thead>\n    <tbody>\n      <tr><td>Metre rule</td><td>0–1 m</td><td>1 mm (0.1 cm)</td><td>General lengths, wood, fabric</td></tr>\n      <tr><td>Vernier callipers</td><td>0–15 cm typical</td><td>0.01 cm (0.1 mm)</td><td>Diameter of cylinders, small objects</td></tr>\n      <tr><td>Micrometer screw gauge</td><td>0–25 mm</td><td>0.001 cm (0.01 mm)</td><td>Wire diameter, thin sheets</td></tr>\n      <tr><td>Measuring tape</td><td>Up to 50 m or more</td><td>1 mm</td><td>Land survey, building dimensions</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Vernier Callipers — Reading the Scale</text>\n    <!-- Main scale -->\n    <rect x=\"30\" y=\"60\" width=\"380\" height=\"30\" rx=\"3\" fill=\"#2d1b4e\" stroke=\"#FFC53D\" stroke-width=\"2\"/>\n    <text x=\"20\" y=\"55\" fill=\"#9090b0\" font-size=\"8\">Main scale (cm)</text>\n    <text x=\"35\" y=\"80\" fill=\"#c8c8c8\" font-size=\"8\">0</text>\n    <text x=\"73\" y=\"80\" fill=\"#c8c8c8\" font-size=\"8\">1</text>\n    <text x=\"111\" y=\"80\" fill=\"#c8c8c8\" font-size=\"8\">2</text>\n    <text x=\"149\" y=\"80\" fill=\"#c8c8c8\" font-size=\"8\">3</text>\n    <text x=\"187\" y=\"80\" fill=\"#c8c8c8\" font-size=\"8\">4</text>\n    <text x=\"225\" y=\"80\" fill=\"#c8c8c8\" font-size=\"8\">5</text>\n    <!-- Vernier scale -->\n    <rect x=\"120\" y=\"90\" width=\"200\" height=\"25\" rx=\"3\" fill=\"#1a3030\" stroke=\"#28c840\" stroke-width=\"2\"/>\n    <text x=\"120\" y=\"107\" fill=\"#28c840\" font-size=\"7\">0</text>\n    <text x=\"136\" y=\"107\" fill=\"#28c840\" font-size=\"7\">1</text>\n    <text x=\"152\" y=\"107\" fill=\"#28c840\" font-size=\"7\">2</text>\n    <text x=\"168\" y=\"107\" fill=\"#28c840\" font-size=\"7\">3</text>\n    <text x=\"184\" y=\"107\" fill=\"#28c840\" font-size=\"7\">4</text>\n    <text x=\"200\" y=\"107\" fill=\"#28c840\" font-size=\"7\">5</text>\n    <text x=\"216\" y=\"107\" fill=\"#28c840\" font-size=\"7\">6</text>\n    <text x=\"232\" y=\"107\" fill=\"#28c840\" font-size=\"7\">7</text>\n    <text x=\"248\" y=\"107\" fill=\"#28c840\" font-size=\"7\">8</text>\n    <text x=\"264\" y=\"107\" fill=\"#28c840\" font-size=\"7\">9</text>\n    <text x=\"280\" y=\"107\" fill=\"#28c840\" font-size=\"7\">10</text>\n    <line x1=\"168\" y1=\"90\" x2=\"168\" y2=\"120\" stroke=\"#ff5f57\" stroke-width=\"2\"/>\n    <text x=\"400\" y=\"75\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"9\" font-weight=\"bold\">Reading:</text>\n    <text x=\"400\" y=\"90\" text-anchor=\"middle\" fill=\"#c8c8c8\" font-size=\"8\">Main scale: 2.3 cm</text>\n    <text x=\"400\" y=\"104\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"8\">Vernier: 3 × 0.01 = 0.03</text>\n    <text x=\"400\" y=\"118\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"9\">Total: 2.33 cm</text>\n    <text x=\"240\" y=\"160\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"8\">Precision = 0.01 cm; Reading = Main + (Vernier div × 0.01)</text>\n    <text x=\"240\" y=\"175\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"8\">Vernier callipers measure to 0.1 mm — 10x more precise than metre rule</text>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">4. Time and Its Measurement</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Time</span> is the duration of events or intervals between them. SI unit: second (s). Instruments for measuring time:</p>\n<ul class=\"learn-list\">\n  <li><strong>Stopwatch/Stopclcock:</strong> Used for short intervals (sports timing at NSSF, physics experiments).</li>\n  <li><strong>Pendulum clock:</strong> Uses the regular oscillation of a pendulum (period T = 2π√(L/g)) for accurate timekeeping.</li>\n  <li><strong>Ticker tape timer / stroboscope:</strong> Used in physics labs to record motion at precise time intervals.</li>\n  <li><strong>Atomic clock:</strong> Most accurate timekeeping device — used in GPS systems, internet time servers.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">5. Accuracy, Precision, and Errors</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Accuracy</span> refers to how close a measurement is to the true (actual) value. <span class=\"learn-keyword\">Precision</span> refers to how repeatable or consistent measurements are — how close repeated measurements are to each other (but not necessarily to the true value).</p>\n<ul class=\"learn-list\">\n  <li><strong>Systematic error:</strong> Consistent error that affects all measurements by the same amount in the same direction. Caused by: zero error in instruments, parallax error, incorrectly calibrated instruments. Can be corrected by recalibrating or subtracting the error.</li>\n  <li><strong>Random error:</strong> Unpredictable errors that vary in magnitude and direction between measurements. Caused by: human reaction time, environmental fluctuations. Reduced by taking many readings and averaging.</li>\n  <li><strong>Zero error:</strong> An instrument reads a non-zero value when the correct reading should be zero. Must be corrected: true reading = observed − zero error.</li>\n  <li><strong>Parallax error:</strong> Error due to the observer's eye not being directly in line with the scale pointer. Avoided by viewing at right angles to the scale.</li>\n</ul>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Mass vs Weight:</strong> A very common exam question distinguishes mass from weight. Remember: mass is measured by a BEAM balance (uses gravitational force equally on both sides), weight by a SPRING balance (uses spring extension). Mass stays constant everywhere; weight changes with gravitational field strength g. An astronaut has the same mass on the Moon as on Earth, but their weight is ⅙ on the Moon.\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Mass (kg) = amount of matter, constant, measured by beam balance. Weight (N) = gravitational force = mg, varies with location, measured by spring balance. Length instruments: metre rule (1mm), vernier callipers (0.1mm), micrometer (0.01mm). Time measured by stopwatch, pendulum clock, ticker timer. Accuracy = closeness to true value; precision = repeatability. Errors: systematic (consistent, correctable) vs random (unpredictable, reducible by averaging).\n</div>\n  ",
    "questions": [
      {
        "q": "A student weighs 60 kg on Earth. What is their mass on the Moon?",
        "o": [
          "10 kg",
          "60 kg",
          "360 kg",
          "600 kg"
        ],
        "a": 1,
        "e": "Mass is the quantity of matter in a body and does not change with location. The student's mass remains 60 kg on the Moon. However, their weight changes: W = mg = 60 × 1.6 ≈ 96 N on the Moon (vs 588 N on Earth).",
        "h": "Mass is constant everywhere. Only weight changes with gravitational field strength.",
        "yr": "SS1"
      },
      {
        "q": "Which instrument is most appropriate for measuring the diameter of a wire?",
        "o": [
          "Metre rule",
          "Measuring tape",
          "Vernier callipers",
          "Micrometer screw gauge"
        ],
        "a": 3,
        "e": "A micrometer screw gauge has precision of 0.01 mm (10 μm), making it ideal for measuring small dimensions like wire diameters. Vernier callipers (0.1 mm) are less precise. A metre rule (1 mm) is far too imprecise for wire measurement.",
        "h": "Smallest, most precise measurements need micrometer screw gauge (0.01 mm).",
        "yr": "SS1"
      },
      {
        "q": "The SI unit of weight is:",
        "o": [
          "kilogram (kg)",
          "gram (g)",
          "newton (N)",
          "metre (m)"
        ],
        "a": 2,
        "e": "Weight is a force (gravitational pull on a body), so its SI unit is the newton (N). W = mg, where m is in kg and g ≈ 9.8 m/s², giving N = kg m s⁻². The kilogram is the unit of mass, not weight.",
        "h": "Weight is a force → measured in newtons (N).",
        "yr": "SS1"
      },
      {
        "q": "What is the weight of a 5 kg object on Earth? (g = 10 m/s²)",
        "o": [
          "0.5 N",
          "5 N",
          "50 N",
          "500 N"
        ],
        "a": 2,
        "e": "W = mg = 5 kg × 10 m/s² = 50 N.",
        "h": "W = mg. Substitute m = 5 kg and g = 10 m/s².",
        "yr": "SS1"
      },
      {
        "q": "A zero error in a vernier calliper reads +0.02 cm when nothing is being measured. A student measures an object and reads 3.56 cm. The true length is:",
        "o": [
          "3.54 cm",
          "3.56 cm",
          "3.58 cm",
          "3.02 cm"
        ],
        "a": 0,
        "e": "True reading = Observed reading − Zero error = 3.56 − 0.02 = 3.54 cm. A positive zero error means the instrument reads too high, so we subtract it to get the true value.",
        "h": "True reading = observed − zero error. Positive zero error: subtract from reading.",
        "yr": "SS1"
      },
      {
        "q": "Parallax error occurs when:",
        "o": [
          "The instrument is not calibrated",
          "The observer's eye is not level with the scale",
          "The measurement is taken too quickly",
          "The object being measured is too large"
        ],
        "a": 1,
        "e": "Parallax error occurs when the observer's line of sight is not perpendicular to the scale being read, causing the scale reading to appear shifted. Prevented by ensuring the eye is directly in line with the scale pointer or marking.",
        "h": "Parallax = eye not perpendicular to scale. Eye must be directly level with reading.",
        "yr": "SS1"
      },
      {
        "q": "A beam balance is preferred over a spring balance for measuring mass because:",
        "o": [
          "It is cheaper to manufacture",
          "It measures mass directly regardless of gravitational field strength",
          "It is more compact and portable",
          "It can measure larger masses"
        ],
        "a": 1,
        "e": "A beam balance compares the gravitational force on the unknown mass with the gravitational force on known reference masses. Since g acts equally on both sides, the comparison is valid regardless of the value of g — making it useful on the Moon or at different heights. Spring balance readings depend on g and would be wrong at different locations.",
        "h": "Beam balance: gravitational force on both sides cancel → works anywhere.",
        "yr": "SS1"
      },
      {
        "q": "Systematic errors can be reduced by:",
        "o": [
          "Taking many repeated measurements and averaging them",
          "Identifying and correcting the source of the consistent error (e.g., recalibration)",
          "Using a digital instrument instead of analogue",
          "Measuring more quickly"
        ],
        "a": 1,
        "e": "Systematic errors are consistent and can be identified and corrected. Examples: zero error (subtract the offset), calibration error (recalibrate), parallax (adjust eye position). Random errors are reduced by averaging repeated measurements.",
        "h": "Systematic errors → identified and corrected. Random errors → averaged.",
        "yr": "SS1"
      },
      {
        "q": "The precision of a vernier calliper is:",
        "o": [
          "0.1 mm (0.01 cm)",
          "1 mm (0.1 cm)",
          "0.01 mm (0.001 cm)",
          "1 cm"
        ],
        "a": 0,
        "e": "A vernier calliper can measure to 0.1 mm (= 0.01 cm). The vernier scale divides 9 mm into 10 equal parts, giving a least count of 0.1 mm. A micrometer screw gauge is more precise at 0.01 mm.",
        "h": "Vernier calliper precision = 0.1 mm = 0.01 cm.",
        "yr": "SS1"
      },
      {
        "q": "Which of the following is a vector quantity?",
        "o": [
          "Mass",
          "Speed",
          "Weight",
          "Time"
        ],
        "a": 2,
        "e": "Weight is a vector quantity because it is a force (gravitational pull) that has both magnitude and direction (always toward Earth's centre). Mass, speed, and time are scalar quantities — they have magnitude only.",
        "h": "Weight = gravitational force = vector (has direction). Mass = scalar.",
        "yr": "SS1"
      },
      {
        "q": "A pendulum clock uses which property of the pendulum for timekeeping?",
        "o": [
          "The length of the pendulum string",
          "The mass of the pendulum bob",
          "The regular, constant period of oscillation",
          "The amplitude of swing"
        ],
        "a": 2,
        "e": "The pendulum clock relies on the isochronous property of the pendulum — that the period T = 2π√(L/g) depends only on pendulum length L and g, not on the amplitude of swing (for small angles). This gives a regular, predictable time interval.",
        "h": "Pendulum: period is constant and regular → used for timekeeping.",
        "yr": "SS1"
      },
      {
        "q": "If a student measures a length five times and gets: 4.2, 4.3, 4.2, 4.3, 4.2 cm, this is an example of:",
        "o": [
          "High accuracy, low precision",
          "Low accuracy, high precision",
          "High accuracy, high precision",
          "Low accuracy, low precision"
        ],
        "a": 1,
        "e": "The measurements are very consistent (close together: range 0.1 cm) → HIGH precision. However, we don't know if the true value is close to 4.2-4.3 cm without knowing the actual length. If the true value were 5.0 cm, these readings would have LOW accuracy despite high precision.",
        "h": "Consistent readings = high precision. Close to true value = high accuracy.",
        "yr": "SS1"
      },
      {
        "q": "The relationship between weight W, mass m, and gravitational field strength g is:",
        "o": [
          "W = m/g",
          "W = m + g",
          "W = mg",
          "W = g/m"
        ],
        "a": 2,
        "e": "Weight W = mg, where m is mass in kg and g is gravitational field strength (≈ 9.8 N/kg or m/s² on Earth's surface). This gives weight in newtons.",
        "h": "W = mg. Weight is mass multiplied by gravitational field strength.",
        "yr": "SS1"
      },
      {
        "q": "An astronaut has a mass of 80 kg on Earth. On the Moon (g = 1.6 m/s²), their weight is:",
        "o": [
          "80 N",
          "128 N",
          "784 N",
          "13.3 N"
        ],
        "a": 1,
        "e": "W = mg = 80 × 1.6 = 128 N on the Moon. (On Earth: W = 80 × 9.8 = 784 N).",
        "h": "W = mg = 80 × 1.6 = 128 N on the Moon.",
        "yr": "SS1"
      },
      {
        "q": "Which error type affects all measurements in the same direction by the same amount?",
        "o": [
          "Random error",
          "Human error",
          "Systematic error",
          "Precision error"
        ],
        "a": 2,
        "e": "Systematic errors consistently affect all measurements in the same direction (all too high or all too low) by a constant amount. They have an identifiable cause (zero error, miscalibration, parallax) and can be corrected. Random errors vary unpredictably.",
        "h": "Systematic = consistent, same direction, same amount. Random = unpredictable.",
        "yr": "SS1"
      },
      {
        "q": "A ticker tape timer is used in physics labs primarily to measure:",
        "o": [
          "Temperature",
          "Mass of objects",
          "Time intervals in motion experiments",
          "Electrical resistance"
        ],
        "a": 2,
        "e": "A ticker tape timer makes dots on a paper tape at regular time intervals (50 Hz → dots every 0.02 s). The tape is attached to a moving object, and the spacing of dots reveals how the object's velocity changes with time — very useful for motion experiments.",
        "h": "Ticker tape timer: dots at fixed intervals → measures time in motion experiments.",
        "yr": "SS1"
      },
      {
        "q": "Which of the following measurements of length requires the MOST precise instrument?",
        "o": [
          "Width of a classroom (about 6 m)",
          "Height of a student (about 1.7 m)",
          "Thickness of a razor blade (about 0.1 mm)",
          "Length of a table (about 2 m)"
        ],
        "a": 2,
        "e": "The thickness of a razor blade (~0.1 mm) requires a micrometer screw gauge (precision 0.01 mm). The other measurements are at centimetre or metre scale where a metre rule or measuring tape suffices.",
        "h": "Thinnest object → needs most precise instrument (micrometer).",
        "yr": "SS1"
      },
      {
        "q": "What is the difference between accuracy and precision?",
        "o": [
          "They mean the same thing in physics",
          "Accuracy = closeness to true value; Precision = consistency/repeatability of measurements",
          "Precision = closeness to true value; Accuracy = repeatability",
          "Accuracy is for mass; precision is for length"
        ],
        "a": 1,
        "e": "Accuracy describes how close a measurement is to the true value. Precision describes how repeatable or consistent measurements are — how close they are to each other. A precise but inaccurate measurement is consistently wrong (systematic error). Ideally we want both high accuracy and high precision.",
        "h": "Accuracy = true value. Precision = repeatability/consistency.",
        "yr": "SS1"
      },
      {
        "q": "The measuring instrument with the greatest precision for measuring small lengths is:",
        "o": [
          "Metre rule",
          "Measuring tape",
          "Vernier callipers",
          "Micrometer screw gauge"
        ],
        "a": 3,
        "e": "Micrometer screw gauge → precision 0.01 mm. Vernier callipers → 0.1 mm. Metre rule → 1 mm. Measuring tape → 1 mm. For the smallest lengths, the micrometer screw gauge provides the greatest precision.",
        "h": "Precision ranking: micrometer (0.01 mm) > vernier (0.1 mm) > metre rule (1 mm).",
        "yr": "SS1"
      },
      {
        "q": "A metre rule has a zero error of −0.2 cm (reads −0.2 cm with nothing measured). A length reads 15.3 cm. The true length is:",
        "o": [
          "15.1 cm",
          "15.3 cm",
          "15.5 cm",
          "15.7 cm"
        ],
        "a": 2,
        "e": "True reading = Observed − Zero error = 15.3 − (−0.2) = 15.5 cm. A negative zero error means the instrument reads too low, so we add the absolute error to correct.",
        "h": "True = observed − zero error = 15.3 − (−0.2) = 15.5 cm.",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Position, Distance and Displacement",
    "topicCode": "SS1-PHY-03",
    "module": "Motion",
    "term": "First Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  Understanding how objects move begins with precisely describing <em>where</em> an object is and <em>how far</em> it has moved. The concepts of position, distance, and displacement form the foundation for all of kinematics — the study of motion. The critical distinction between distance (a scalar) and displacement (a vector) is one of the most fundamental ideas in physics and has practical significance in navigation, GPS systems, sports, and engineering.\n</div>\n\n<h3 class=\"learn-subheading\">1. Position</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Position</span> describes the location of an object relative to a reference point (origin). In one dimension, position is simply a value on a number line (positive or negative depending on direction from origin). In two dimensions, position requires coordinates (x, y). Position is a vector quantity — it specifies both how far and in what direction from the reference point.</p>\n<p class=\"learn-p\"><strong>Example:</strong> A student starts at the gate of a school (origin). They walk 50 m North. Their position is \"50 m North of the gate.\"</p>\n\n<h3 class=\"learn-subheading\">2. Distance</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Distance</span> is the total length of path travelled by an object, regardless of direction. It is a <strong>scalar quantity</strong> — it has magnitude only, no direction. Distance can only be zero or positive, never negative.</p>\n<ul class=\"learn-list\">\n  <li>Distance measures the complete path length.</li>\n  <li>It depends on the actual route taken.</li>\n  <li>SI unit: metre (m)</li>\n  <li>Example: A runner completes a 400m track circuit — distance = 400 m.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">3. Displacement</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Displacement</span> is the straight-line distance from the starting point to the ending point, measured in a specific direction. It is a <strong>vector quantity</strong> — it has both magnitude and direction.</p>\n<ul class=\"learn-list\">\n  <li>Displacement = final position − initial position.</li>\n  <li>It depends only on start and end points, not the path taken.</li>\n  <li>Displacement can be zero even if distance is not (e.g., returning to start).</li>\n  <li>SI unit: metre (m), with direction specified.</li>\n  <li>Example: The same 400m track runner returns to start — displacement = 0 m.</li>\n</ul>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Distance vs Displacement</text>\n    <rect x=\"10\" y=\"30\" width=\"220\" height=\"155\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <rect x=\"250\" y=\"30\" width=\"220\" height=\"155\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#28c840\" stroke-width=\"1.5\"/>\n    <!-- Path diagram left: winding path -->\n    <circle cx=\"40\" cy=\"160\" r=\"5\" fill=\"#FFC53D\"/>\n    <text x=\"38\" y=\"175\" fill=\"#FFC53D\" font-size=\"7\">Start</text>\n    <path d=\"M40,160 Q80,130 110,120 Q140,110 160,90 Q180,70 200,60\" stroke=\"#ff9500\" stroke-width=\"2.5\" fill=\"none\"/>\n    <circle cx=\"200\" cy=\"60\" r=\"5\" fill=\"#28c840\"/>\n    <text x=\"195\" y=\"52\" fill=\"#28c840\" font-size=\"7\">End</text>\n    <text x=\"120\" y=\"190\" text-anchor=\"middle\" fill=\"#ff9500\" font-size=\"8\">Distance = actual path length</text>\n    <text x=\"120\" y=\"50\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"9\" font-weight=\"bold\">DISTANCE (scalar)</text>\n    <!-- Displacement diagram right: straight line -->\n    <circle cx=\"280\" cy=\"160\" r=\"5\" fill=\"#FFC53D\"/>\n    <text x=\"278\" y=\"175\" fill=\"#FFC53D\" font-size=\"7\">Start</text>\n    <line x1=\"280\" y1=\"160\" x2=\"440\" y2=\"60\" stroke=\"#28c840\" stroke-width=\"3\"/>\n    <circle cx=\"440\" cy=\"60\" r=\"5\" fill=\"#28c840\"/>\n    <text x=\"440\" y=\"52\" fill=\"#28c840\" font-size=\"7\">End</text>\n    <text x=\"372\" y=\"120\" fill=\"#28c840\" font-size=\"8\" transform=\"rotate(-30,372,120)\">Displacement</text>\n    <path d=\"M430,75 L440,60 L450,78\" fill=\"none\" stroke=\"#28c840\" stroke-width=\"2\"/>\n    <text x=\"370\" y=\"190\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"8\">Displacement = straight-line, A to B</text>\n    <text x=\"370\" y=\"50\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"9\" font-weight=\"bold\">DISPLACEMENT (vector)</text>\n    <rect x=\"10\" y=\"30\" width=\"220\" height=\"155\" rx=\"8\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"1\">\n      <animate attributeName=\"opacity\" values=\"0.3;0.8;0.3\" dur=\"2s\" repeatCount=\"indefinite\"/>\n    </rect>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">4. Key Differences: Distance vs Displacement</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Feature</th><th>Distance</th><th>Displacement</th></tr></thead>\n    <tbody>\n      <tr><td>Type</td><td>Scalar</td><td>Vector</td></tr>\n      <tr><td>Definition</td><td>Total path length</td><td>Shortest straight line from start to end, with direction</td></tr>\n      <tr><td>Negative possible?</td><td>No (always ≥ 0)</td><td>Yes (opposite direction is negative)</td></tr>\n      <tr><td>Zero condition</td><td>Only if object hasn't moved</td><td>When start = end position (even if moved far)</td></tr>\n      <tr><td>Path dependent?</td><td>Yes</td><td>No — only start and end matter</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">5. Practical Examples</h3>\n<p class=\"learn-p\"><strong>Example 1:</strong> A bus travels from Lagos to Ibadan (125 km) along the expressway, then returns to Lagos. Total distance = 250 km. Displacement = 0 km (back at starting point).</p>\n<p class=\"learn-p\"><strong>Example 2:</strong> A student walks 3 km East, then 4 km North. Distance = 3 + 4 = 7 km. Displacement = √(3² + 4²) = 5 km in direction North-East (at angle tan⁻¹(4/3) = 53° from East). The displacement uses the resultant vector.</p>\n\n<h3 class=\"learn-subheading\">6. Position-Time Graphs</h3>\n<p class=\"learn-p\">A position-time graph plots an object's position (y-axis) against time (x-axis). Key features:</p>\n<ul class=\"learn-list\">\n  <li>Slope (gradient) = velocity (not speed).</li>\n  <li>A horizontal line = object at rest (no change in position).</li>\n  <li>A straight line = constant velocity (uniform motion).</li>\n  <li>A curve = changing velocity (acceleration).</li>\n  <li>Negative slope = object moving in negative direction (e.g., returning toward origin).</li>\n</ul>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Displacement vs Distance:</strong> \"A car travels around a circular track of circumference 800m and returns to the starting point.\" Distance = 800m. Displacement = 0m (start = end). When the question asks for \"how far from the start?\" it wants displacement (straight line). When it asks \"how far did it travel?\" it wants distance (total path). These are the most common ways examiners test this concept.\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Position = location relative to reference point (vector). Distance = total path length (scalar, always ≥ 0). Displacement = straight-line distance from start to finish with direction (vector, can be negative or zero). Key: distance ≥ displacement. Displacement = 0 when start = finish. On position-time graphs: gradient = velocity. Displacement is calculated using vector methods when paths change direction.\n</div>\n  ",
    "questions": [
      {
        "q": "A student walks 4 m East and then 3 m North. What is the total distance walked?",
        "o": [
          "5 m",
          "7 m",
          "1 m",
          "√7 m"
        ],
        "a": 1,
        "e": "Distance = total path length = 4 + 3 = 7 m. Distance is a scalar and simply adds up regardless of direction.",
        "h": "Distance = add all path lengths = 4 + 3 = 7 m.",
        "yr": "SS1"
      },
      {
        "q": "Using the same situation (4 m East then 3 m North), what is the magnitude of displacement?",
        "o": [
          "7 m",
          "1 m",
          "5 m",
          "12 m"
        ],
        "a": 2,
        "e": "Displacement = straight-line distance from start to finish. Using Pythagoras: d = √(4² + 3²) = √(16 + 9) = √25 = 5 m (directed North-East).",
        "h": "Displacement = √(East² + North²) = √(16+9) = 5 m.",
        "yr": "SS1"
      },
      {
        "q": "A bus travels from Lagos to Ibadan (125 km) and back to Lagos. Its displacement is:",
        "o": [
          "250 km",
          "125 km",
          "0 km",
          "−125 km"
        ],
        "a": 2,
        "e": "Displacement = final position − initial position. Since the bus returns to Lagos (its starting point), its net displacement = 0 km. Distance = 250 km.",
        "h": "Start = End position → displacement = 0.",
        "yr": "SS1"
      },
      {
        "q": "Which of the following is a vector quantity?",
        "o": [
          "Distance",
          "Speed",
          "Displacement",
          "Mass"
        ],
        "a": 2,
        "e": "Displacement is a vector quantity — it has both magnitude (how far) and direction (which way). Distance and speed are scalars (magnitude only). Mass is also scalar.",
        "h": "Displacement = vector (magnitude + direction). Distance = scalar.",
        "yr": "SS1"
      },
      {
        "q": "On a position-time graph, the slope (gradient) represents:",
        "o": [
          "Acceleration",
          "Distance",
          "Velocity",
          "Speed"
        ],
        "a": 2,
        "e": "The gradient of a position-time graph = change in position / change in time = displacement / time = velocity. A steeper slope means greater velocity. A negative slope means motion in the negative direction.",
        "h": "Position-time graph gradient = velocity (not speed).",
        "yr": "SS1"
      },
      {
        "q": "A particle moves 6 m to the right and then 6 m back to its starting point. Its displacement is:",
        "o": [
          "12 m",
          "0 m",
          "6 m",
          "−12 m"
        ],
        "a": 1,
        "e": "Starting point = final point. Displacement = final position − initial position = 0 − 0 = 0 m. The particle returned to its original position. Distance = 6 + 6 = 12 m.",
        "h": "Returned to start → displacement = 0. Distance = 12 m.",
        "yr": "SS1"
      },
      {
        "q": "What is the position of an object 5 m to the left of the origin on a number line (origin = 0)?",
        "o": [
          "+5 m",
          "−5 m",
          "5 m (no sign)",
          "0 m"
        ],
        "a": 1,
        "e": "Position is measured from the origin (reference point). Moving left is the negative direction on a standard number line, so the position is −5 m. Negative sign indicates direction.",
        "h": "Position = distance from origin with direction. Left = negative.",
        "yr": "SS1"
      },
      {
        "q": "Displacement can be zero even if the distance is not zero. This occurs when:",
        "o": [
          "The object never moves",
          "The object returns exactly to its starting position",
          "The object moves very slowly",
          "The object moves in one direction only"
        ],
        "a": 1,
        "e": "Displacement = final position − initial position. If the object returns to exactly where it started, initial position = final position, so displacement = 0. But it has covered a non-zero distance along its path.",
        "h": "Displacement = 0 when final position = initial position (returned to start).",
        "yr": "SS1"
      },
      {
        "q": "A position-time graph shows a horizontal straight line. This indicates the object is:",
        "o": [
          "Accelerating",
          "Moving at constant velocity",
          "At rest (stationary)",
          "Decelerating"
        ],
        "a": 2,
        "e": "A horizontal line on a position-time graph means position does not change with time — the object is stationary (at rest). Gradient = 0 = velocity = 0.",
        "h": "Horizontal line on position-time graph → object at rest (velocity = 0).",
        "yr": "SS1"
      },
      {
        "q": "An athlete runs once around a 400 m circular track. At the end, their distance and displacement are respectively:",
        "o": [
          "400 m and 400 m",
          "400 m and 0 m",
          "0 m and 400 m",
          "800 m and 0 m"
        ],
        "a": 1,
        "e": "The athlete travels 400 m around the track (distance = 400 m) but returns to the starting point, so displacement = 0 m. Distance ≠ displacement because the path is not straight.",
        "h": "One complete loop: distance = circumference = 400 m, displacement = 0.",
        "yr": "SS1"
      },
      {
        "q": "A car travels 30 km North then 40 km East. The magnitude of its total displacement from the starting point is:",
        "o": [
          "10 km",
          "50 km",
          "70 km",
          "1200 km"
        ],
        "a": 1,
        "e": "Displacement = √(30² + 40²) = √(900 + 1600) = √2500 = 50 km. Distance = 30 + 40 = 70 km.",
        "h": "Displacement = √(30² + 40²) = 50 km (Pythagoras).",
        "yr": "SS1"
      },
      {
        "q": "Which statement about distance is TRUE?",
        "o": [
          "Distance can be negative",
          "Distance depends only on the start and end points",
          "Distance is a scalar quantity equal to the total path length",
          "Distance has the same magnitude as displacement"
        ],
        "a": 2,
        "e": "Distance is a scalar quantity representing the total length of the path travelled, regardless of direction. It is always non-negative (≥ 0) and depends on the actual path taken, not just start and end points.",
        "h": "Distance = scalar, total path length, always ≥ 0, path-dependent.",
        "yr": "SS1"
      },
      {
        "q": "A student walks 12 m East, 5 m North. What is the direction of displacement? (Hint: use tan)",
        "o": [
          "22.6° North of East",
          "67.4° North of East",
          "45° North of East",
          "53.1° North of East"
        ],
        "a": 0,
        "e": "tan θ = North/East = 5/12. θ = tan⁻¹(5/12) ≈ 22.6°. So displacement = √(12²+5²) = 13 m at 22.6° North of East.",
        "h": "Direction = tan⁻¹(N/E) = tan⁻¹(5/12) ≈ 22.6° N of E.",
        "yr": "SS1"
      },
      {
        "q": "Position is measured relative to:",
        "o": [
          "The centre of the Earth",
          "A reference point or origin chosen by the observer",
          "The North Pole always",
          "The last position of the object"
        ],
        "a": 1,
        "e": "Position is always measured relative to a chosen reference point (origin). This reference point can be any convenient location — a door, a city, the Earth's centre — chosen by the observer for the problem.",
        "h": "Position is measured from a reference point (origin) chosen by the observer.",
        "yr": "SS1"
      },
      {
        "q": "A curved line on a position-time graph indicates:",
        "o": [
          "Constant velocity",
          "The object is at rest",
          "The velocity is changing (acceleration or deceleration)",
          "The object is moving in a circle"
        ],
        "a": 2,
        "e": "On a position-time graph, a curve means the gradient (slope) is changing — which means velocity is changing (acceleration). A straight line = constant velocity. A horizontal line = zero velocity.",
        "h": "Curved position-time graph → changing slope → changing velocity = acceleration.",
        "yr": "SS1"
      },
      {
        "q": "A displacement of −20 m means:",
        "o": [
          "The object has moved 20 m in the negative direction (e.g., west or south)",
          "The object has lost 20 m of distance",
          "The measurement is wrong (displacement can't be negative)",
          "The object is 20 m below ground"
        ],
        "a": 0,
        "e": "Negative displacement means the object has moved in the direction defined as negative for that problem — typically opposite to the initial direction, such as West if East is positive, or South if North is positive. Displacement CAN be negative, zero, or positive.",
        "h": "Negative displacement = movement in the negative direction. Sign indicates direction.",
        "yr": "SS1"
      },
      {
        "q": "In Lagos traffic, a danfo bus takes a winding route of 15 km from Oshodi to Ikeja, while the straight-line distance between them is 8 km. The bus's displacement from Oshodi to Ikeja is:",
        "o": [
          "15 km",
          "8 km",
          "23 km",
          "7 km"
        ],
        "a": 1,
        "e": "Displacement = straight-line distance from start to finish = 8 km (in the direction from Oshodi to Ikeja). Distance = 15 km (actual route taken). Displacement is always ≤ distance.",
        "h": "Displacement = straight-line (shortest) distance between start and end = 8 km.",
        "yr": "SS1"
      },
      {
        "q": "What is the SI unit of both distance and displacement?",
        "o": [
          "kilometre (km)",
          "metre (m)",
          "centimetre (cm)",
          "foot"
        ],
        "a": 1,
        "e": "Both distance and displacement are measured in metres (m) in the SI system. The difference is that displacement also requires a direction to be fully specified (it's a vector), while distance just needs a magnitude (scalar).",
        "h": "Both distance and displacement: SI unit = metre (m).",
        "yr": "SS1"
      },
      {
        "q": "A negative position on a position-time graph indicates:",
        "o": [
          "The object has moved faster than expected",
          "The object's position is on the negative side of the reference point (origin)",
          "The object has decelerated",
          "An error in measurement"
        ],
        "a": 1,
        "e": "A negative position simply means the object is located on the negative side of the origin (reference point) — for example, south of a reference point if North is positive. It is not an error; it indicates direction from the origin.",
        "h": "Negative position = object is on the negative side of the origin. Not an error.",
        "yr": "SS1"
      },
      {
        "q": "A displacement of 10 m at 45° North of East has northward component of:",
        "o": [
          "5 m",
          "5√2 m",
          "10 m",
          "10√2 m"
        ],
        "a": 1,
        "e": "Northward component = 10 sin45° = 10 × √2/2 = 5√2 ≈ 7.07 m. The eastward component is also 5√2 m.",
        "h": "N-component = 10 sin45° = 5√2 m.",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Scalars and Vectors",
    "topicCode": "SS1-PHY-04",
    "module": "Motion",
    "term": "First Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  Every physical quantity falls into one of two categories: <span class=\"learn-keyword\">scalar</span> quantities (described by magnitude alone) and <span class=\"learn-keyword\">vector</span> quantities (requiring both magnitude and direction). This distinction is fundamental — it determines how quantities can be added, subtracted, and used in calculations. Understanding vectors is essential for analysing forces, velocities, and many other physical phenomena.\n</div>\n\n<h3 class=\"learn-subheading\">1. Scalar Quantities</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">scalar</span> is a quantity with magnitude only — no direction needed to describe it fully. Scalars follow ordinary arithmetic: 5 kg + 3 kg = 8 kg (always).</p>\n<p class=\"learn-p\"><strong>Examples of scalars:</strong> mass, distance, speed, time, temperature, energy, volume, density, pressure, electric charge, frequency.</p>\n\n<h3 class=\"learn-subheading\">2. Vector Quantities</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">vector</span> is a quantity with both magnitude and direction. The same magnitude in different directions represents different vectors. Vectors require special rules for addition.</p>\n<p class=\"learn-p\"><strong>Examples of vectors:</strong> displacement, velocity, acceleration, force, momentum, weight, electric field, magnetic field.</p>\n\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Scalar</th><th>Related Vector</th><th>Difference</th></tr></thead>\n    <tbody>\n      <tr><td>Distance (50 m)</td><td>Displacement (50 m North)</td><td>Displacement specifies direction</td></tr>\n      <tr><td>Speed (20 m/s)</td><td>Velocity (20 m/s East)</td><td>Velocity specifies direction</td></tr>\n      <tr><td>Mass (70 kg)</td><td>Weight (686 N downward)</td><td>Weight specifies direction</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">3. Vector Representation</h3>\n<p class=\"learn-p\">Vectors are represented by arrows where:</p>\n<ul class=\"learn-list\">\n  <li>The <strong>length</strong> of the arrow represents the <strong>magnitude</strong> (drawn to scale).</li>\n  <li>The <strong>direction</strong> of the arrow represents the <strong>direction</strong> of the vector.</li>\n  <li>Vectors are written in bold (**F**) or with an arrow (→F) or underlined (F).</li>\n</ul>\n\n<h3 class=\"learn-subheading\">4. Addition of Vectors</h3>\n<h4 class=\"learn-subsubheading\">Graphical Method (Triangle/Parallelogram Rule)</h4>\n<p class=\"learn-p\">Vectors in the same direction: add magnitudes. Vectors in opposite directions: subtract magnitudes. Vectors at an angle: use graphical or analytical methods.</p>\n<p class=\"learn-p\"><strong>Triangle Rule:</strong> Draw the first vector, then draw the second vector starting from the tip of the first. The resultant goes from the tail of the first to the tip of the second.</p>\n<p class=\"learn-p\"><strong>Parallelogram Rule:</strong> Draw both vectors from the same point. Complete the parallelogram. The diagonal from the common starting point is the resultant.</p>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Vector Addition — Triangle Rule</text>\n    <!-- Vector A -->\n    <line x1=\"40\" y1=\"130\" x2=\"160\" y2=\"130\" stroke=\"#FFC53D\" stroke-width=\"3\"/>\n    <polygon points=\"158,125 168,130 158,135\" fill=\"#FFC53D\"/>\n    <text x=\"100\" y=\"122\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"9\">A = 120 m (East)</text>\n    <!-- Vector B from tip of A -->\n    <line x1=\"160\" y1=\"130\" x2=\"220\" y2=\"70\" stroke=\"#28c840\" stroke-width=\"3\"/>\n    <polygon points=\"213,65 220,70 215,78\" fill=\"#28c840\"/>\n    <text x=\"210\" y=\"95\" fill=\"#28c840\" font-size=\"9\">B = 90 m (NE)</text>\n    <!-- Resultant -->\n    <line x1=\"40\" y1=\"130\" x2=\"220\" y2=\"70\" stroke=\"#ff5f57\" stroke-width=\"2.5\" stroke-dasharray=\"6,3\"/>\n    <polygon points=\"213,65 222,70 216,78\" fill=\"#ff5f57\"/>\n    <text x=\"100\" y=\"95\" fill=\"#ff5f57\" font-size=\"9\">R (Resultant)</text>\n    <!-- Labels -->\n    <text x=\"40\" y=\"148\" fill=\"#9090b0\" font-size=\"8\">Start (tail of A)</text>\n    <text x=\"155\" y=\"148\" fill=\"#9090b0\" font-size=\"8\">Tip of A</text>\n    <text x=\"222\" y=\"68\" fill=\"#9090b0\" font-size=\"8\">End</text>\n    <!-- Parallelogram Rule diagram -->\n    <text x=\"370\" y=\"45\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"10\" font-weight=\"bold\">Parallelogram Rule</text>\n    <line x1=\"310\" y1=\"150\" x2=\"430\" y2=\"150\" stroke=\"#FFC53D\" stroke-width=\"2.5\"/>\n    <polygon points=\"428,145 438,150 428,155\" fill=\"#FFC53D\"/>\n    <line x1=\"310\" y1=\"150\" x2=\"350\" y2=\"80\" stroke=\"#28c840\" stroke-width=\"2.5\"/>\n    <polygon points=\"344,77 350,80 348,89\" fill=\"#28c840\"/>\n    <line x1=\"430\" y1=\"150\" x2=\"470\" y2=\"80\" stroke=\"#28c840\" stroke-width=\"1.5\" stroke-dasharray=\"4,2\"/>\n    <line x1=\"350\" y1=\"80\" x2=\"470\" y2=\"80\" stroke=\"#FFC53D\" stroke-width=\"1.5\" stroke-dasharray=\"4,2\"/>\n    <line x1=\"310\" y1=\"150\" x2=\"470\" y2=\"80\" stroke=\"#ff5f57\" stroke-width=\"2.5\" stroke-dasharray=\"5,3\"/>\n    <polygon points=\"462,77 470,80 465,88\" fill=\"#ff5f57\"/>\n    <text x=\"395\" y=\"175\" text-anchor=\"middle\" fill=\"#ff5f57\" font-size=\"8\">Diagonal = Resultant R</text>\n    <rect x=\"10\" y=\"28\" width=\"460\" height=\"165\" rx=\"8\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"1\">\n      <animate attributeName=\"opacity\" values=\"0.3;0.8;0.3\" dur=\"2s\" repeatCount=\"indefinite\"/>\n    </rect>\n  </svg>\n</div>\n\n<h4 class=\"learn-subsubheading\">Analytical Method (Using Trigonometry)</h4>\n<p class=\"learn-p\">For vectors at right angles: R = √(A² + B²), with direction θ = tan⁻¹(B/A)</p>\n<p class=\"learn-p\"><strong>Example:</strong> Forces 3 N East and 4 N North act on a body. Find the resultant.<br>\nR = √(3² + 4²) = 5 N. θ = tan⁻¹(4/3) = 53.1° North of East.</p>\n\n<h3 class=\"learn-subheading\">5. Resolution of Vectors</h3>\n<p class=\"learn-p\">Any vector can be broken into two components at right angles (usually horizontal and vertical). This is called <span class=\"learn-keyword\">resolution</span>.</p>\n<p class=\"learn-p\">For a vector F at angle θ to the horizontal:</p>\n<ul class=\"learn-list\">\n  <li><strong>Horizontal component:</strong> Fₓ = F cos θ</li>\n  <li><strong>Vertical component:</strong> F_y = F sin θ</li>\n</ul>\n<p class=\"learn-p\"><strong>Example:</strong> A force of 100 N acts at 30° above the horizontal. Find its components.<br>\nFₓ = 100 cos 30° = 100 × (√3/2) = 86.6 N (horizontal)<br>\nF_y = 100 sin 30° = 100 × ½ = 50 N (vertical)</p>\n\n<h3 class=\"learn-subheading\">6. Equilibrium</h3>\n<p class=\"learn-p\">A body is in <span class=\"learn-keyword\">equilibrium</span> when the resultant of all forces acting on it is zero. This means the vector sum of all forces = 0 (net force = 0). The body either remains at rest or continues moving at constant velocity.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Identifying Scalars and Vectors:</strong> Key mnemonic: vectors involve MOVEMENT or FORCE with direction (velocity, displacement, force, weight, acceleration, momentum). Scalars are \"amounts\" without direction (speed, distance, mass, time, energy, temperature). A common trick question: \"Is pressure a scalar or vector?\" — Pressure is a SCALAR (magnitude only, no specific direction in a fluid). Electric field and magnetic field are VECTORS.\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Scalars = magnitude only (distance, speed, mass, time, energy). Vectors = magnitude + direction (displacement, velocity, acceleration, force, weight, momentum). Vectors represented by arrows (length = magnitude, direction = arrow direction). Vector addition: triangle rule (tip-to-tail) or parallelogram rule. At right angles: R = √(A²+B²). Resolution: Fₓ = F cosθ, F_y = F sinθ. Equilibrium: resultant force = 0.\n</div>\n  ",
    "questions": [
      {
        "q": "Which of the following is a scalar quantity?",
        "o": [
          "Weight",
          "Velocity",
          "Temperature",
          "Acceleration"
        ],
        "a": 2,
        "e": "Temperature is a scalar — it has magnitude only (e.g., 37°C) and no direction. Weight (gravitational force = vector), velocity (speed + direction = vector), and acceleration (rate of change of velocity = vector) are all vector quantities.",
        "h": "Temperature = scalar (magnitude only). Weight, velocity, acceleration = vectors.",
        "yr": "SS1"
      },
      {
        "q": "A vector quantity always requires:",
        "o": [
          "A unit of measurement only",
          "Both magnitude and direction",
          "Only direction",
          "Only magnitude"
        ],
        "a": 1,
        "e": "A vector requires BOTH magnitude (how big) and direction (which way). Neither alone is sufficient to fully describe a vector. For example, '5 m/s' is speed (scalar), but '5 m/s East' is velocity (vector).",
        "h": "Vector = magnitude + direction. Scalar = magnitude only.",
        "yr": "SS1"
      },
      {
        "q": "Forces of 6 N East and 8 N North act on a body. The resultant force is:",
        "o": [
          "14 N",
          "2 N",
          "10 N",
          "48 N"
        ],
        "a": 2,
        "e": "Since the forces are at right angles: R = √(6² + 8²) = √(36 + 64) = √100 = 10 N.",
        "h": "Perpendicular forces: R = √(6² + 8²) = 10 N.",
        "yr": "SS1"
      },
      {
        "q": "The horizontal component of a 50 N force acting at 60° above the horizontal is:",
        "o": [
          "25 N",
          "43.3 N",
          "50 N",
          "86.6 N"
        ],
        "a": 0,
        "e": "Fₓ = F cos θ = 50 × cos 60° = 50 × 0.5 = 25 N.",
        "h": "Horizontal component = F cos θ = 50 cos 60°.",
        "yr": "SS1"
      },
      {
        "q": "The vertical component of a 100 N force at 30° to the horizontal is:",
        "o": [
          "50 N",
          "86.6 N",
          "100 N",
          "57.7 N"
        ],
        "a": 0,
        "e": "F_y = F sin θ = 100 × sin 30° = 100 × 0.5 = 50 N.",
        "h": "Vertical component = F sin θ = 100 sin 30° = 50 N.",
        "yr": "SS1"
      },
      {
        "q": "Two forces of 5 N each act in exactly opposite directions on a body. The resultant is:",
        "o": [
          "10 N",
          "5 N",
          "0 N",
          "25 N"
        ],
        "a": 2,
        "e": "Forces in opposite directions: R = 5 − 5 = 0 N. The forces cancel out perfectly. The body is in equilibrium.",
        "h": "Equal and opposite forces: resultant = 0 N.",
        "yr": "SS1"
      },
      {
        "q": "In the parallelogram rule for vector addition, the resultant is:",
        "o": [
          "The sum of the two sides",
          "One of the two sides of the parallelogram",
          "The diagonal of the parallelogram from the common starting point",
          "The perimeter of the parallelogram"
        ],
        "a": 2,
        "e": "In the parallelogram rule, two vectors are drawn from the same point. A parallelogram is completed. The resultant is the diagonal of the parallelogram that starts from the same common point.",
        "h": "Parallelogram rule: resultant = diagonal from common starting point.",
        "yr": "SS1"
      },
      {
        "q": "Which pair consists of one scalar and one vector quantity?",
        "o": [
          "Speed and velocity",
          "Mass and force",
          "Distance and displacement",
          "All of the above"
        ],
        "a": 3,
        "e": "Speed (scalar) and velocity (vector) ✓. Mass (scalar) and force (vector) ✓. Distance (scalar) and displacement (vector) ✓. All three pairs correctly pair a scalar with its related vector quantity.",
        "h": "All three pairs: scalar & vector. Speed/velocity, mass/force, distance/displacement.",
        "yr": "SS1"
      },
      {
        "q": "A body is in equilibrium when:",
        "o": [
          "It moves at constant velocity only",
          "The net (resultant) force on it is zero",
          "It is at rest only",
          "All forces acting on it are equal"
        ],
        "a": 1,
        "e": "Equilibrium occurs when the vector sum (resultant) of ALL forces acting on the body equals zero. This means the body either remains at rest (static equilibrium) or moves at constant velocity (dynamic equilibrium).",
        "h": "Equilibrium → net force = 0 → at rest or constant velocity.",
        "yr": "SS1"
      },
      {
        "q": "Which of the following is a vector quantity?",
        "o": [
          "Energy",
          "Momentum",
          "Speed",
          "Frequency"
        ],
        "a": 1,
        "e": "Momentum = mass × velocity. Since velocity is a vector, momentum (p = mv) is also a vector. Energy, speed, and frequency are scalar quantities.",
        "h": "Momentum = mv (vector because velocity is vector). Energy, speed, frequency = scalars.",
        "yr": "SS1"
      },
      {
        "q": "A force F = 40 N at angle 45° to horizontal. Find Fₓ and F_y.",
        "o": [
          "Fₓ = 28.3 N, F_y = 28.3 N",
          "Fₓ = 20 N, F_y = 34.6 N",
          "Fₓ = 40 N, F_y = 40 N",
          "Fₓ = 34.6 N, F_y = 20 N"
        ],
        "a": 0,
        "e": "Fₓ = 40 cos 45° = 40 × (√2/2) ≈ 28.3 N. F_y = 40 sin 45° ≈ 28.3 N. At 45°, horizontal and vertical components are equal.",
        "h": "At 45°: Fₓ = F_y = F/√2 ≈ 28.3 N.",
        "yr": "SS1"
      },
      {
        "q": "Two forces of 3 N and 4 N act at right angles. The angle the resultant makes with the 4 N force is:",
        "o": [
          "36.9°",
          "53.1°",
          "45°",
          "30°"
        ],
        "a": 0,
        "e": "tan θ = opposite/adjacent = 3/4 → θ = tan⁻¹(0.75) ≈ 36.9°. The resultant makes 36.9° with the 4 N force.",
        "h": "tan θ = 3/4 → θ = tan⁻¹(3/4) ≈ 36.9°.",
        "yr": "SS1"
      },
      {
        "q": "Which of the following physical quantities can have a negative value?",
        "o": [
          "Mass",
          "Speed",
          "Distance",
          "Velocity"
        ],
        "a": 3,
        "e": "Velocity is a vector and can be negative (indicating motion in the negative/reverse direction). Mass, speed, and distance are all scalars that can only be zero or positive — they cannot be negative.",
        "h": "Vectors (like velocity) can be negative. Scalars (mass, speed, distance) cannot.",
        "yr": "SS1"
      },
      {
        "q": "To find the resultant of two vectors using the triangle rule:",
        "o": [
          "Draw both vectors from the same point and find the diagonal",
          "Draw vectors tip-to-tail; the resultant goes from the first tail to the last tip",
          "Add the magnitudes algebraically",
          "Subtract the smaller from the larger"
        ],
        "a": 1,
        "e": "Triangle rule (tip-to-tail method): draw vector A, then draw vector B starting from the tip of A. The resultant R goes from the tail of A to the tip of B (closing the triangle).",
        "h": "Triangle rule = tip-to-tail. Resultant = from first tail to last tip.",
        "yr": "SS1"
      },
      {
        "q": "Which pair correctly shows a scalar and its SI unit?",
        "o": [
          "Velocity — m/s",
          "Displacement — m (with direction)",
          "Speed — m/s",
          "Force — N (with direction)"
        ],
        "a": 2,
        "e": "Speed is a scalar measured in m/s. Velocity (m/s with direction) is a vector. Displacement (m with direction) is a vector. Force (N with direction) is a vector.",
        "h": "Speed = scalar = m/s. Velocity = vector = m/s with direction.",
        "yr": "SS1"
      },
      {
        "q": "The magnitude of the resultant of two forces P and Q acting at an angle θ to each other is given by:",
        "o": [
          "R = P + Q",
          "R = |P − Q|",
          "R = √(P² + Q² + 2PQ cos θ)",
          "R = √(P² + Q² − 2PQ cos θ)"
        ],
        "a": 2,
        "e": "The general formula for the resultant of two vectors is R = √(P² + Q² + 2PQ cos θ). Special cases: θ = 0° (same direction) → R = P + Q; θ = 90° → R = √(P²+Q²); θ = 180° (opposite) → R = |P−Q|.",
        "h": "General resultant: R = √(P² + Q² + 2PQ cosθ).",
        "yr": "SS1"
      },
      {
        "q": "A 10 N force acts North and a 10 N force acts South on an object. The resultant force is:",
        "o": [
          "20 N North",
          "20 N South",
          "10 N North",
          "0 N"
        ],
        "a": 3,
        "e": "Two equal forces in opposite directions: R = 10 − 10 = 0 N. The object is in equilibrium.",
        "h": "Equal and opposite forces cancel: net force = 0 N.",
        "yr": "SS1"
      },
      {
        "q": "Pressure, although measured in Pa (N/m²), is classified as a scalar because:",
        "o": [
          "It has very small magnitude",
          "In a fluid, it acts equally in all directions — no single specified direction",
          "It is always positive",
          "It cannot be measured with a vector instrument"
        ],
        "a": 1,
        "e": "Pressure in a fluid acts equally in all directions simultaneously (Pascal's principle). Since it has no specific single direction, it is classified as a scalar quantity despite being derived from force (a vector). The pressure at a point in a fluid is the same in all directions.",
        "h": "Pressure in fluid: same in all directions → scalar. No single specific direction.",
        "yr": "SS1"
      },
      {
        "q": "Forces of 5 N East, 5 N West, and 10 N North act on an object. The resultant force is:",
        "o": [
          "20 N North",
          "10 N North",
          "10 N Northeast",
          "0 N"
        ],
        "a": 1,
        "e": "East-West: 5 E + 5 W = 0 N. North: 10 N. Resultant = 10 N North.",
        "h": "Opposite E-W forces cancel. Remaining = 10 N North.",
        "yr": "SS1"
      },
      {
        "q": "A 60 N force acts at 30° to a surface. The component perpendicular (normal) to the surface is:",
        "o": [
          "30 N",
          "30√3 N",
          "60 N",
          "52 N"
        ],
        "a": 0,
        "e": "Perpendicular component = 60 sin30° = 60 × 0.5 = 30 N. (The component along the surface = 60 cos30° = 30√3 N.)",
        "h": "Perpendicular component = F sin30° = 60 × 0.5 = 30 N.",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Speed, Velocity and Acceleration",
    "topicCode": "SS1-PHY-05",
    "module": "Motion",
    "term": "First Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Speed</span>, <span class=\"learn-keyword\">velocity</span>, and <span class=\"learn-keyword\">acceleration</span> are the fundamental quantities of kinematics — the description of motion. These quantities describe HOW an object moves: how fast, in what direction, and whether the motion is changing. These concepts underpin everything from the design of Lagos traffic systems to the trajectory of Nigerian satellites and the physics of a Bolt electric car.\n</div>\n\n<h3 class=\"learn-subheading\">1. Speed</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Speed</span> is the rate of change of distance with time. It is a scalar quantity.</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>Speed = Distance / Time → v = d/t</strong></p>\n<p class=\"learn-p\">SI unit: metre per second (m/s or m s⁻¹). Other units: km/h (divide m/s by 3.6 or multiply km/h by 3.6 to get m/s... actually: 1 m/s = 3.6 km/h, so km/h × (1/3.6) = m/s).</p>\n<ul class=\"learn-list\">\n  <li><strong>Average speed</strong> = total distance / total time</li>\n  <li><strong>Instantaneous speed</strong> = speed at a specific instant (shown by speedometer)</li>\n  <li><strong>Uniform speed</strong> = constant speed (covers equal distances in equal time intervals)</li>\n</ul>\n\n<h3 class=\"learn-subheading\">2. Velocity</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Velocity</span> is the rate of change of displacement with time. It is a vector quantity (magnitude + direction).</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>Velocity = Displacement / Time → v = s/t</strong></p>\n<p class=\"learn-p\">A body can have constant speed but changing velocity (e.g., circular motion at constant speed — direction changes, so velocity changes, so there is acceleration).</p>\n<p class=\"learn-p\"><strong>Average velocity</strong> = total displacement / total time (may differ from average speed if object changes direction).</p>\n\n<h3 class=\"learn-subheading\">3. Acceleration</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Acceleration</span> is the rate of change of velocity with time. It is a vector quantity.</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>a = (v − u) / t</strong></p>\n<p class=\"learn-p\">where u = initial velocity, v = final velocity, t = time taken. SI unit: m/s² (m s⁻²).</p>\n<ul class=\"learn-list\">\n  <li><strong>Positive acceleration:</strong> velocity is increasing (speeding up in positive direction).</li>\n  <li><strong>Negative acceleration (deceleration/retardation):</strong> velocity is decreasing (slowing down).</li>\n  <li><strong>Uniform acceleration:</strong> velocity changes by equal amounts in equal time intervals.</li>\n  <li><strong>Zero acceleration:</strong> constant velocity (or rest) — no change in velocity.</li>\n</ul>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Velocity-Time Graphs</text>\n    <!-- Axes -->\n    <line x1=\"40\" y1=\"170\" x2=\"460\" y2=\"170\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <line x1=\"40\" y1=\"20\" x2=\"40\" y2=\"175\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <text x=\"465\" y=\"173\" fill=\"#9090b0\" font-size=\"8\">t</text>\n    <text x=\"30\" y=\"18\" fill=\"#9090b0\" font-size=\"8\">v</text>\n    <text x=\"35\" y=\"175\" fill=\"#9090b0\" font-size=\"7\">0</text>\n    <!-- Constant velocity (horizontal line) -->\n    <line x1=\"50\" y1=\"100\" x2=\"160\" y2=\"100\" stroke=\"#28c840\" stroke-width=\"2.5\"/>\n    <text x=\"105\" y=\"90\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"8\">Constant velocity</text>\n    <text x=\"105\" y=\"80\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">(a = 0)</text>\n    <!-- Uniform acceleration (straight line going up) -->\n    <line x1=\"180\" y1=\"170\" x2=\"290\" y2=\"80\" stroke=\"#FFC53D\" stroke-width=\"2.5\"/>\n    <text x=\"250\" y=\"115\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"8\">Uniform accel.</text>\n    <text x=\"250\" y=\"127\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">(gradient = a)</text>\n    <!-- Deceleration (line going down) -->\n    <line x1=\"310\" y1=\"80\" x2=\"420\" y2=\"170\" stroke=\"#ff5f57\" stroke-width=\"2.5\"/>\n    <text x=\"375\" y=\"100\" text-anchor=\"middle\" fill=\"#ff5f57\" font-size=\"8\">Deceleration</text>\n    <text x=\"375\" y=\"112\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">(negative a)</text>\n    <!-- Area label -->\n    <text x=\"240\" y=\"190\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"8\">Area under v-t graph = displacement</text>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">4. Velocity-Time Graphs</h3>\n<p class=\"learn-p\">A velocity-time graph plots velocity (y-axis) against time (x-axis). Key features:</p>\n<ul class=\"learn-list\">\n  <li><strong>Slope (gradient)</strong> = acceleration. Positive slope = positive acceleration; negative slope = deceleration.</li>\n  <li><strong>Area under the graph</strong> = displacement (not distance — the shape can go below the x-axis).</li>\n  <li><strong>Horizontal line (v = constant)</strong> = zero acceleration (uniform velocity).</li>\n  <li><strong>Straight line with positive slope</strong> = uniform acceleration.</li>\n  <li><strong>Line reaching v = 0</strong> = object has stopped.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">5. Unit Conversions</h3>\n<p class=\"learn-p\"><strong>km/h to m/s:</strong> Divide by 3.6. Example: 90 km/h = 90/3.6 = 25 m/s</p>\n<p class=\"learn-p\"><strong>m/s to km/h:</strong> Multiply by 3.6. Example: 30 m/s = 30 × 3.6 = 108 km/h</p>\n<p class=\"learn-p\">This conversion is essential in Nigeria's road safety context — speed limits are often in km/h but physics problems use m/s.</p>\n\n<h3 class=\"learn-subheading\">6. Practical Applications</h3>\n<ul class=\"learn-list\">\n  <li>Nigerian highways: speed limit 100 km/h = 27.8 m/s. Police radar guns measure instantaneous speed.</li>\n  <li>A sprinter covers 100 m in 10 s: average speed = 10 m/s = 36 km/h.</li>\n  <li>Free fall: every object near Earth accelerates at g ≈ 9.8 m/s² downward (regardless of mass).</li>\n</ul>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Speed vs Velocity:</strong> \"A car goes around a roundabout at 60 km/h.\" Its SPEED is constant at 60 km/h. Its VELOCITY is constantly changing (direction changes at every point on the roundabout). Therefore there IS acceleration (change in velocity) even though speed is constant. This is the most common conceptual confusion in this topic.\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Speed = distance/time (scalar, m/s). Velocity = displacement/time (vector, m/s). Acceleration a = (v−u)/t (vector, m/s²). On v-t graphs: gradient = acceleration; area under graph = displacement. Convert: km/h ÷ 3.6 = m/s. Deceleration = negative acceleration. Uniform acceleration = straight line on v-t graph. A body moving in a circle at constant speed still has changing velocity (direction changes) → centripetal acceleration.\n</div>\n  ",
    "questions": [
      {
        "q": "A bus travels 120 km in 2 hours. Its average speed is:",
        "o": [
          "240 km/h",
          "60 km/h",
          "60 m/s",
          "120 m/s"
        ],
        "a": 1,
        "e": "Average speed = total distance / total time = 120 km / 2 h = 60 km/h.",
        "h": "Speed = distance/time = 120/2 = 60 km/h.",
        "yr": "SS1"
      },
      {
        "q": "Convert 72 km/h to m/s.",
        "o": [
          "72 m/s",
          "20 m/s",
          "25.9 m/s",
          "259 m/s"
        ],
        "a": 1,
        "e": "72 km/h ÷ 3.6 = 20 m/s. Alternatively: 72 km/h = 72,000 m / 3600 s = 20 m/s.",
        "h": "km/h → m/s: divide by 3.6. 72/3.6 = 20 m/s.",
        "yr": "SS1"
      },
      {
        "q": "Acceleration is defined as:",
        "o": [
          "Speed per unit time",
          "Distance per unit time squared",
          "Rate of change of velocity with time",
          "Rate of change of speed"
        ],
        "a": 2,
        "e": "Acceleration = rate of change of velocity with time = (v − u)/t. It is a vector quantity and has SI unit m/s².",
        "h": "Acceleration = (v − u)/t = rate of change of velocity.",
        "yr": "SS1"
      },
      {
        "q": "A car accelerates from rest to 30 m/s in 10 s. The acceleration is:",
        "o": [
          "300 m/s²",
          "3 m/s²",
          "0.33 m/s²",
          "3000 m/s²"
        ],
        "a": 1,
        "e": "a = (v − u)/t = (30 − 0)/10 = 3 m/s².",
        "h": "a = (v−u)/t = (30−0)/10 = 3 m/s².",
        "yr": "SS1"
      },
      {
        "q": "On a velocity-time graph, the area under the graph represents:",
        "o": [
          "Speed",
          "Acceleration",
          "Distance only",
          "Displacement"
        ],
        "a": 3,
        "e": "The area under a velocity-time graph = displacement. (Note: if the graph dips below zero — velocity reverses — the area is signed, giving displacement not distance.)",
        "h": "Area under v-t graph = displacement.",
        "yr": "SS1"
      },
      {
        "q": "A car moving at 20 m/s decelerates uniformly to rest in 5 s. The deceleration is:",
        "o": [
          "4 m/s²",
          "−4 m/s²",
          "0.25 m/s²",
          "100 m/s²"
        ],
        "a": 0,
        "e": "a = (v−u)/t = (0−20)/5 = −4 m/s². The magnitude of deceleration is 4 m/s². (Some questions ask for 'deceleration' as a positive value = 4 m/s².)",
        "h": "a = (0−20)/5 = −4 m/s². Deceleration magnitude = 4 m/s².",
        "yr": "SS1"
      },
      {
        "q": "The gradient (slope) of a velocity-time graph represents:",
        "o": [
          "Displacement",
          "Speed",
          "Distance",
          "Acceleration"
        ],
        "a": 3,
        "e": "The slope of a velocity-time graph = change in velocity / change in time = acceleration. A positive slope = positive acceleration; negative slope = deceleration; zero slope (horizontal) = constant velocity.",
        "h": "v-t graph gradient = acceleration.",
        "yr": "SS1"
      },
      {
        "q": "A car moves at 90 km/h. A police radar measures the car's speed. Convert 90 km/h to m/s.",
        "o": [
          "32.4 m/s",
          "25 m/s",
          "324 m/s",
          "2.5 m/s"
        ],
        "a": 1,
        "e": "90 km/h ÷ 3.6 = 25 m/s.",
        "h": "90 km/h ÷ 3.6 = 25 m/s.",
        "yr": "SS1"
      },
      {
        "q": "A car goes around a circular roundabout at constant speed. Which statement is TRUE?",
        "o": [
          "Its velocity is also constant",
          "It has no acceleration",
          "Its velocity is changing (direction changes)",
          "Its speed and velocity are both constant"
        ],
        "a": 2,
        "e": "Speed is constant, but velocity is a vector — it depends on direction. At every point on the circular path, the direction of motion changes, so velocity constantly changes. Therefore, there IS acceleration (centripetal acceleration directed toward the centre).",
        "h": "Circular motion: constant speed but changing direction → changing velocity → acceleration.",
        "yr": "SS1"
      },
      {
        "q": "A body has velocity u = 5 m/s and constant acceleration a = 2 m/s². What is the velocity after 4 s?",
        "o": [
          "10 m/s",
          "13 m/s",
          "18 m/s",
          "40 m/s"
        ],
        "a": 1,
        "e": "v = u + at = 5 + (2)(4) = 5 + 8 = 13 m/s.",
        "h": "v = u + at = 5 + 2×4 = 13 m/s.",
        "yr": "SS1"
      },
      {
        "q": "The SI unit of acceleration is:",
        "o": [
          "m/s",
          "m s⁻¹",
          "m s⁻²",
          "km/h²"
        ],
        "a": 2,
        "e": "Acceleration = velocity/time = (m/s)/s = m/s² = m s⁻². The SI unit is metres per second squared (m s⁻²).",
        "h": "Acceleration = m/s ÷ s = m/s² = m s⁻².",
        "yr": "SS1"
      },
      {
        "q": "A horizontal line on a velocity-time graph indicates:",
        "o": [
          "Zero velocity (object at rest)",
          "Uniform acceleration",
          "Constant velocity (zero acceleration)",
          "Deceleration"
        ],
        "a": 2,
        "e": "A horizontal line means velocity is not changing with time → acceleration = 0 → constant velocity. (Note: if the horizontal line is at v = 0, it means the object is at rest.)",
        "h": "Horizontal on v-t graph: slope = 0 → acceleration = 0 → constant velocity.",
        "yr": "SS1"
      },
      {
        "q": "Average velocity is calculated as:",
        "o": [
          "Total distance / total time",
          "Total displacement / total time",
          "(Initial + final speed) / 2",
          "Acceleration × time"
        ],
        "a": 1,
        "e": "Average velocity = total displacement / total time. This differs from average speed (which uses total distance). For uniformly accelerated motion: v_avg = (u + v)/2 also works.",
        "h": "Average velocity = total displacement / total time.",
        "yr": "SS1"
      },
      {
        "q": "A sprinter runs 100 m in 10 s. Their average speed in km/h is:",
        "o": [
          "10 km/h",
          "36 km/h",
          "100 km/h",
          "1 km/h"
        ],
        "a": 1,
        "e": "Speed = 100/10 = 10 m/s. Convert: 10 × 3.6 = 36 km/h.",
        "h": "Speed = 10 m/s. m/s × 3.6 = km/h. 10 × 3.6 = 36 km/h.",
        "yr": "SS1"
      },
      {
        "q": "Deceleration is:",
        "o": [
          "Negative displacement",
          "Positive acceleration",
          "Acceleration in the opposite direction to motion (reduction in speed)",
          "Zero velocity"
        ],
        "a": 2,
        "e": "Deceleration (retardation) is acceleration directed opposite to the direction of motion, causing the object to slow down. It is numerically a negative acceleration when motion is in the positive direction.",
        "h": "Deceleration = acceleration opposing motion = object slowing down.",
        "yr": "SS1"
      },
      {
        "q": "A velocity-time graph shows a straight line from (0, 0) to (10, 50). The acceleration is:",
        "o": [
          "5 m/s²",
          "50 m/s²",
          "10 m/s²",
          "500 m/s²"
        ],
        "a": 0,
        "e": "Acceleration = gradient = change in velocity / change in time = 50 / 10 = 5 m/s².",
        "h": "Gradient = Δv/Δt = 50/10 = 5 m/s².",
        "yr": "SS1"
      },
      {
        "q": "An object has initial velocity 0 m/s, acceleration 4 m/s². What is its velocity after 6 s?",
        "o": [
          "4 m/s",
          "10 m/s",
          "24 m/s",
          "144 m/s"
        ],
        "a": 2,
        "e": "v = u + at = 0 + 4 × 6 = 24 m/s.",
        "h": "v = u + at = 0 + 4×6 = 24 m/s.",
        "yr": "SS1"
      },
      {
        "q": "Convert 15 m/s to km/h.",
        "o": [
          "15 km/h",
          "54 km/h",
          "4.17 km/h",
          "150 km/h"
        ],
        "a": 1,
        "e": "15 m/s × 3.6 = 54 km/h.",
        "h": "m/s × 3.6 = km/h. 15 × 3.6 = 54 km/h.",
        "yr": "SS1"
      },
      {
        "q": "Which scenario represents zero acceleration?",
        "o": [
          "A car speeding up on a straight road",
          "A ball falling freely under gravity",
          "A bus moving at steady 60 km/h on a straight road",
          "A satellite orbiting Earth in a circular orbit"
        ],
        "a": 2,
        "e": "A bus moving at constant 60 km/h on a straight road has constant speed AND constant direction → constant velocity → zero acceleration. Free fall: a = g ≠ 0. Circular orbit: direction changes → acceleration ≠ 0.",
        "h": "Constant velocity (constant speed + straight line) → zero acceleration.",
        "yr": "SS1"
      },
      {
        "q": "A body's velocity changes from 20 m/s East to 20 m/s West in 4 s. The acceleration is:",
        "o": [
          "0 m/s² (speed constant)",
          "10 m/s² West",
          "10 m/s² East",
          "5 m/s² West"
        ],
        "a": 1,
        "e": "Change in velocity = final − initial = −20 − (+20) = −40 m/s (taking East as +ve). a = Δv/t = −40/4 = −10 m/s² = 10 m/s² West. Though speed is unchanged (20 m/s), direction changed → acceleration exists.",
        "h": "Acceleration = (v−u)/t = (−20−20)/4 = −10 m/s² = 10 m/s² West.",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Motion — Equations and Applications",
    "topicCode": "SS1-PHY-06",
    "module": "Motion",
    "term": "First Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  The equations of motion for uniform acceleration provide a powerful mathematical toolkit for solving all problems involving objects moving with constant acceleration. These four equations — derived from the definitions of velocity and acceleration — allow us to find distance, time, velocity, or acceleration when given the other quantities. They are applied daily in engineering (braking distances for Nigerian vehicles), athletics (sprint performance analysis), space science (rocket trajectories), and many other fields.\n</div>\n\n<h3 class=\"learn-subheading\">1. The Four Equations of Uniformly Accelerated Motion</h3>\n<p class=\"learn-p\">For constant acceleration <em>a</em>, with initial velocity <em>u</em>, final velocity <em>v</em>, displacement <em>s</em>, and time <em>t</em>:</p>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Equation</th><th>Form</th><th>Quantities Not Needed</th></tr></thead>\n    <tbody>\n      <tr><td>1st Equation</td><td>v = u + at</td><td>s (displacement)</td></tr>\n      <tr><td>2nd Equation</td><td>s = ut + ½at²</td><td>v (final velocity)</td></tr>\n      <tr><td>3rd Equation</td><td>v² = u² + 2as</td><td>t (time)</td></tr>\n      <tr><td>4th Equation</td><td>s = (u + v)t / 2</td><td>a (acceleration)</td></tr>\n    </tbody>\n  </table>\n</div>\n<p class=\"learn-p\"><strong>Memory tip:</strong> These equations only apply when acceleration is uniform (constant). For non-uniform acceleration, graphical or calculus methods are needed.</p>\n\n<h3 class=\"learn-subheading\">2. Derivation of the Equations</h3>\n<p class=\"learn-p\"><strong>From the definition of acceleration:</strong> a = (v − u)/t → <strong>v = u + at</strong> (1st equation)</p>\n<p class=\"learn-p\"><strong>Average velocity:</strong> v_avg = (u + v)/2. Displacement = v_avg × t = (u + v)t/2. Also <strong>s = (u+v)t/2</strong> (4th equation).</p>\n<p class=\"learn-p\"><strong>Substitute v = u + at into 4th equation:</strong><br>\ns = (u + u + at)t/2 = (2ut + at²)/2 = ut + ½at² → <strong>s = ut + ½at²</strong> (2nd equation)</p>\n<p class=\"learn-p\"><strong>Eliminate t:</strong> From 1st: t = (v−u)/a. Substitute into 4th: s = (u+v)(v−u)/(2a) = (v²−u²)/(2a) → <strong>v² = u² + 2as</strong> (3rd equation)</p>\n\n<h3 class=\"learn-subheading\">3. Free Fall under Gravity</h3>\n<p class=\"learn-p\">Objects falling freely under gravity (ignoring air resistance) experience uniform downward acceleration g ≈ 9.8 m/s² (often taken as 10 m/s² in problems). The equations of motion apply with a = g (downward positive convention):</p>\n<ul class=\"learn-list\">\n  <li>v = u + gt</li>\n  <li>h = ut + ½gt²</li>\n  <li>v² = u² + 2gh</li>\n</ul>\n<p class=\"learn-p\"><strong>Key facts about free fall:</strong></p>\n<ul class=\"learn-list\">\n  <li>All objects fall with the same acceleration g regardless of mass (Galileo's observation, proven by Apollo 15 feather-hammer drop on the Moon).</li>\n  <li>Object dropped from rest: u = 0, so v = gt and h = ½gt².</li>\n  <li>Object thrown upward: at maximum height, v = 0. Time to max height = u/g.</li>\n</ul>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Free Fall and Vertical Motion</text>\n    <rect x=\"10\" y=\"28\" width=\"220\" height=\"160\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <rect x=\"250\" y=\"28\" width=\"220\" height=\"160\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#28c840\" stroke-width=\"1.5\"/>\n    <!-- Free fall diagram -->\n    <text x=\"120\" y=\"50\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"9\" font-weight=\"bold\">Dropped from rest (u=0)</text>\n    <circle cx=\"120\" cy=\"70\" r=\"8\" fill=\"#FFC53D\"/>\n    <circle cx=\"120\" cy=\"100\" r=\"8\" fill=\"#FFC53D\" opacity=\"0.7\"/>\n    <circle cx=\"120\" cy=\"140\" r=\"8\" fill=\"#FFC53D\" opacity=\"0.4\"/>\n    <line x1=\"120\" y1=\"78\" x2=\"120\" y2=\"92\" stroke=\"#ff9500\" stroke-width=\"2\"/>\n    <polygon points=\"116,90 120,96 124,90\" fill=\"#ff9500\"/>\n    <line x1=\"120\" y1=\"108\" x2=\"120\" y2=\"132\" stroke=\"#ff9500\" stroke-width=\"2\"/>\n    <polygon points=\"116,130 120,136 124,130\" fill=\"#ff9500\"/>\n    <text x=\"135\" y=\"73\" fill=\"#9090b0\" font-size=\"7\">t=0, v=0</text>\n    <text x=\"135\" y=\"103\" fill=\"#9090b0\" font-size=\"7\">t=1s, v=10m/s</text>\n    <text x=\"135\" y=\"143\" fill=\"#9090b0\" font-size=\"7\">t=2s, v=20m/s</text>\n    <text x=\"120\" y=\"178\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">v=gt, h=½gt²</text>\n    <!-- Thrown upward diagram -->\n    <text x=\"360\" y=\"50\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"9\" font-weight=\"bold\">Thrown upward (u=20m/s)</text>\n    <circle cx=\"360\" cy=\"155\" r=\"8\" fill=\"#28c840\"/>\n    <circle cx=\"360\" cy=\"120\" r=\"8\" fill=\"#28c840\" opacity=\"0.7\"/>\n    <circle cx=\"360\" cy=\"75\" r=\"8\" fill=\"#28c840\" opacity=\"0.4\"/>\n    <line x1=\"360\" y1=\"147\" x2=\"360\" y2=\"128\" stroke=\"#FFC53D\" stroke-width=\"2\"/>\n    <polygon points=\"356,130 360,124 364,130\" fill=\"#FFC53D\"/>\n    <text x=\"380\" y=\"72\" fill=\"#ff5f57\" font-size=\"7\">v=0 at top</text>\n    <text x=\"380\" y=\"115\" fill=\"#9090b0\" font-size=\"7\">still rising</text>\n    <text x=\"380\" y=\"150\" fill=\"#9090b0\" font-size=\"7\">launch (u=20m/s)</text>\n    <text x=\"360\" y=\"178\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">Max height = u²/2g; t_up = u/g</text>\n    <rect x=\"10\" y=\"28\" width=\"220\" height=\"160\" rx=\"8\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"1\">\n      <animate attributeName=\"opacity\" values=\"0.3;0.8;0.3\" dur=\"2s\" repeatCount=\"indefinite\"/>\n    </rect>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">4. Worked Examples</h3>\n<p class=\"learn-p\"><strong>Example 1:</strong> A car starts from rest and accelerates uniformly at 3 m/s² for 8 s. Find the final velocity and distance covered.<br>\nv = u + at = 0 + 3 × 8 = <strong>24 m/s</strong><br>\ns = ut + ½at² = 0 + ½ × 3 × 64 = <strong>96 m</strong></p>\n\n<p class=\"learn-p\"><strong>Example 2:</strong> A ball is dropped from a height of 20 m. Find the time to reach the ground. (g = 10 m/s²)<br>\nh = ½gt² → 20 = ½ × 10 × t² → t² = 4 → t = <strong>2 s</strong></p>\n\n<p class=\"learn-p\"><strong>Example 3:</strong> A stone is thrown upward with velocity 15 m/s. Find: (a) maximum height; (b) time to reach maximum height. (g = 10 m/s²)<br>\nAt max height, v = 0. v² = u² − 2gh → 0 = 225 − 20h → h = <strong>11.25 m</strong><br>\nv = u − gt → 0 = 15 − 10t → t = <strong>1.5 s</strong></p>\n\n<h3 class=\"learn-subheading\">5. Graphical Analysis of Motion</h3>\n<ul class=\"learn-list\">\n  <li><strong>Displacement-time (s-t) graph:</strong> Gradient = velocity. Straight line = uniform velocity. Curve = changing velocity (acceleration).</li>\n  <li><strong>Velocity-time (v-t) graph:</strong> Gradient = acceleration. Area = displacement. Straight line with slope = uniform acceleration. Horizontal = constant velocity.</li>\n  <li><strong>Acceleration-time (a-t) graph:</strong> Horizontal line = uniform acceleration. Area = change in velocity.</li>\n</ul>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Choosing the Right Equation:</strong> Identify what you know (u, v, a, s, t) and what you need to find. Then select the equation that contains both the known quantities AND the unknown. Example: \"find distance given u, a, t but NOT v\" → use s = ut + ½at² (no v). \"find velocity given u, a, s but NOT t\" → use v² = u² + 2as (no t).\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> 4 equations of motion (uniform acceleration only): v = u+at; s = ut+½at²; v² = u²+2as; s = (u+v)t/2. Free fall: u = 0 for dropped objects; a = g ≈ 10 m/s²; at max height v = 0. Time to max height = u/g. Max height = u²/2g. s-t graph gradient = velocity. v-t graph gradient = acceleration; area = displacement. Equations fail for non-uniform acceleration.\n</div>\n  ",
    "questions": [
      {
        "q": "A car starts from rest and accelerates at 4 m/s². Find its velocity after 5 s.",
        "o": [
          "9 m/s",
          "16 m/s",
          "20 m/s",
          "80 m/s"
        ],
        "a": 2,
        "e": "v = u + at = 0 + 4 × 5 = 20 m/s.",
        "h": "v = u + at = 0 + 4×5 = 20 m/s.",
        "yr": "SS1"
      },
      {
        "q": "A ball is dropped from rest at height 45 m. Find the time to hit the ground. (g = 10 m/s²)",
        "o": [
          "3 s",
          "4 s",
          "4.5 s",
          "9 s"
        ],
        "a": 0,
        "e": "h = ½gt² → 45 = ½ × 10 × t² = 5t² → t² = 9 → t = 3 s.",
        "h": "h = ½gt² → t = √(2h/g) = √(90/10) = 3 s.",
        "yr": "SS1"
      },
      {
        "q": "A car moving at 30 m/s decelerates at 5 m/s². How long before it stops?",
        "o": [
          "6 s",
          "5 s",
          "3 s",
          "150 s"
        ],
        "a": 0,
        "e": "v = u + at → 0 = 30 − 5t → t = 6 s.",
        "h": "v = u + at → 0 = 30 − 5t → t = 30/5 = 6 s.",
        "yr": "SS1"
      },
      {
        "q": "Find the displacement of a car accelerating from rest at 2 m/s² for 10 s.",
        "o": [
          "20 m",
          "100 m",
          "200 m",
          "1000 m"
        ],
        "a": 1,
        "e": "s = ut + ½at² = 0 + ½ × 2 × 100 = 100 m.",
        "h": "s = ut + ½at² = 0 + ½(2)(10²) = 100 m.",
        "yr": "SS1"
      },
      {
        "q": "Using v² = u² + 2as, find the final velocity of a body with u = 0, a = 5 m/s², s = 20 m.",
        "o": [
          "10 m/s",
          "50 m/s",
          "100 m/s",
          "5 m/s"
        ],
        "a": 0,
        "e": "v² = u² + 2as = 0 + 2(5)(10) = 100 → v = 10 m/s.",
        "h": "v² = 2as → v = √(2×5×10) = √100 = 10 m/s.",
        "yr": "SS1"
      },
      {
        "q": "A stone is thrown upward with initial velocity 20 m/s. The maximum height reached is: (g = 10 m/s²)",
        "o": [
          "10 m",
          "20 m",
          "40 m",
          "200 m"
        ],
        "a": 1,
        "e": "At max height, v = 0. v² = u² − 2gh → 0 = 400 − 20h → h = 20 m.",
        "h": "At top, v=0. h = u²/(2g) = 400/20 = 20 m.",
        "yr": "SS1"
      },
      {
        "q": "A body starts from rest and reaches 40 m/s. If the acceleration is 8 m/s², what distance was covered?",
        "o": [
          "100 m",
          "200 m",
          "160 m",
          "320 m"
        ],
        "a": 0,
        "e": "v² = u² + 2as → 1600 = 0 + 2(8)s → s = 1600/16 = 100 m.",
        "h": "v² = u² + 2as → s = (v²−u²)/(2a) = 1600/16 = 100 m.",
        "yr": "SS1"
      },
      {
        "q": "A train moving at 25 m/s brakes uniformly and stops in 50 m. The braking acceleration is:",
        "o": [
          "−6.25 m/s²",
          "−12.5 m/s²",
          "−0.5 m/s²",
          "−625 m/s²"
        ],
        "a": 0,
        "e": "v² = u² + 2as → 0 = 625 + 2a(50) → 100a = −625 → a = −6.25 m/s².",
        "h": "v² = u² + 2as → 0 = 25² + 2a(50) → a = −6.25 m/s².",
        "yr": "SS1"
      },
      {
        "q": "The equations of motion for uniform acceleration CANNOT be used when:",
        "o": [
          "The body starts from rest",
          "The acceleration is zero",
          "The acceleration is not constant (non-uniform)",
          "The body moves in a straight line"
        ],
        "a": 2,
        "e": "The four equations of motion (v=u+at, s=ut+½at², v²=u²+2as, s=(u+v)t/2) are derived assuming constant (uniform) acceleration. They cannot be applied when acceleration varies with time or position.",
        "h": "Equations of motion require CONSTANT (uniform) acceleration.",
        "yr": "SS1"
      },
      {
        "q": "A stone is thrown upward with u = 20 m/s. Time to reach maximum height (g = 10 m/s²):",
        "o": [
          "1 s",
          "2 s",
          "4 s",
          "10 s"
        ],
        "a": 1,
        "e": "At max height, v = 0. v = u − gt → 0 = 20 − 10t → t = 2 s.",
        "h": "At max height: v = 0. t = u/g = 20/10 = 2 s.",
        "yr": "SS1"
      },
      {
        "q": "An object falls from rest. After 4 s, its velocity is (g = 10 m/s²):",
        "o": [
          "10 m/s",
          "20 m/s",
          "40 m/s",
          "160 m/s"
        ],
        "a": 2,
        "e": "v = u + gt = 0 + 10 × 4 = 40 m/s (downward).",
        "h": "v = gt = 10 × 4 = 40 m/s.",
        "yr": "SS1"
      },
      {
        "q": "Which equation gives displacement without using final velocity v?",
        "o": [
          "v = u + at",
          "s = (u + v)t/2",
          "v² = u² + 2as",
          "s = ut + ½at²"
        ],
        "a": 3,
        "e": "s = ut + ½at² contains u, a, t, and s — no final velocity v. This is the most useful equation when final velocity is unknown.",
        "h": "s = ut + ½at² does not contain v — use when v is unknown.",
        "yr": "SS1"
      },
      {
        "q": "How does air resistance affect free fall compared to ideal (vacuum) free fall?",
        "o": [
          "Air resistance increases the acceleration",
          "Air resistance has no effect",
          "Air resistance reduces acceleration and causes terminal velocity",
          "Air resistance only affects light objects"
        ],
        "a": 2,
        "e": "Air resistance acts upward (opposing motion), reducing the net downward force and hence the acceleration. As speed increases, air resistance increases until it equals gravity → net force = 0 → terminal velocity (constant falling speed). In vacuum, all objects fall with the same g.",
        "h": "Air resistance opposes fall → reduces acceleration → terminal velocity at which forces balance.",
        "yr": "SS1"
      },
      {
        "q": "A car starts from rest, accelerates at 3 m/s² for 6 s, then moves at constant velocity for 4 s. Total displacement:",
        "o": [
          "54 m",
          "82 m",
          "126 m",
          "102 m"
        ],
        "a": 2,
        "e": "Phase 1: s = ½at² = ½(3)(36) = 54 m; v = 3×6 = 18 m/s. Phase 2: s = 18×4 = 72 m. Total = 126 m.",
        "h": "Calculate each phase separately, then add displacements.",
        "yr": "SS1"
      },
      {
        "q": "If the displacement-time graph of a body is a straight line through the origin, the body is:",
        "o": [
          "Accelerating uniformly from rest",
          "Moving at constant velocity",
          "At rest",
          "Decelerating"
        ],
        "a": 1,
        "e": "A straight line through the origin on an s-t graph means displacement increases proportionally with time → constant velocity. The gradient (slope) equals the constant velocity.",
        "h": "Straight line on s-t graph = constant velocity (constant gradient).",
        "yr": "SS1"
      },
      {
        "q": "Galileo showed that in the absence of air resistance, objects of different masses fall with:",
        "o": [
          "Different accelerations (heavier falls faster)",
          "The same acceleration g",
          "Zero acceleration",
          "Acceleration depending on size"
        ],
        "a": 1,
        "e": "Galileo demonstrated (and the Apollo 15 Moon experiment confirmed) that in the absence of air resistance, ALL objects fall with the same gravitational acceleration g ≈ 9.8 m/s² regardless of their mass or shape. This contradicted Aristotle's view that heavier objects fall faster.",
        "h": "Without air resistance, all objects fall with same acceleration g (Galileo).",
        "yr": "SS1"
      },
      {
        "q": "A body has initial velocity 10 m/s and constant acceleration −2 m/s² (deceleration). When does it momentarily stop?",
        "o": [
          "t = 2 s",
          "t = 5 s",
          "t = 10 s",
          "t = 20 s"
        ],
        "a": 1,
        "e": "v = u + at → 0 = 10 + (−2)t → 2t = 10 → t = 5 s.",
        "h": "v = 0: 0 = 10 − 2t → t = 5 s.",
        "yr": "SS1"
      },
      {
        "q": "A ball is thrown downward with initial speed 5 m/s from a cliff. After 3 s, its speed is: (g = 10 m/s²)",
        "o": [
          "15 m/s",
          "25 m/s",
          "35 m/s",
          "30 m/s"
        ],
        "a": 2,
        "e": "v = u + gt = 5 + 10 × 3 = 35 m/s (downward). The initial 5 m/s is in the same direction as g.",
        "h": "v = u + gt = 5 + 10×3 = 35 m/s.",
        "yr": "SS1"
      },
      {
        "q": "The fourth equation of motion s = (u + v)t/2 is most useful when:",
        "o": [
          "Time t is unknown",
          "Acceleration a is unknown, but initial and final velocities and time are known",
          "Only initial velocity u is known",
          "Displacement s is not needed"
        ],
        "a": 1,
        "e": "s = (u+v)t/2 involves s, u, v, and t — but NOT acceleration a. Use it when acceleration is unknown or not needed but both u and v are known.",
        "h": "s = (u+v)t/2: use when acceleration is unknown.",
        "yr": "SS1"
      },
      {
        "q": "A body starts at rest and travels 80 m in 4 s under uniform acceleration. The acceleration is:",
        "o": [
          "5 m/s²",
          "10 m/s²",
          "20 m/s²",
          "40 m/s²"
        ],
        "a": 1,
        "e": "s = ut + ½at² → 80 = 0 + ½a(16) = 8a → a = 10 m/s².",
        "h": "s = ½at² → a = 2s/t² = 2×80/16 = 10 m/s².",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Linear Momentum and Newton's Laws of Motion",
    "topicCode": "SS1-PHY-07",
    "module": "Force and Motion",
    "term": "Second Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Newton's Laws of Motion</span> are the cornerstone of classical mechanics — the mathematical framework describing how forces affect the motion of objects. Formulated by Sir Isaac Newton in his 1687 <em>Principia Mathematica</em>, these laws explain everything from why a danfo bus skids when brakes are applied suddenly, to how rockets are launched into orbit. <span class=\"learn-keyword\">Linear momentum</span> — the product of mass and velocity — is the quantity that Newton's laws ultimately govern.\n</div>\n\n<h3 class=\"learn-subheading\">1. Linear Momentum</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Linear momentum</span> (p) is the product of an object's mass and velocity:</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>p = mv</strong></p>\n<p class=\"learn-p\">Momentum is a vector quantity (same direction as velocity). SI unit: kg m/s (or kg m s⁻¹, equivalent to N·s).</p>\n<ul class=\"learn-list\">\n  <li>A truck of mass 10,000 kg moving at 20 m/s has p = 200,000 kg m/s.</li>\n  <li>A bullet of mass 0.01 kg at 500 m/s has p = 5 kg m/s.</li>\n  <li>Larger momentum is harder to stop — this is why heavy vehicles need longer braking distances.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">2. Newton's First Law (Law of Inertia)</h3>\n<p class=\"learn-p\"><em>\"Every object continues in its state of rest or uniform motion in a straight line unless acted upon by an external unbalanced force.\"</em></p>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Inertia</span> is the resistance of an object to changes in its state of motion. Greater mass = greater inertia.</p>\n<ul class=\"learn-list\">\n  <li>A passenger lurches forward when a bus brakes suddenly (inertia of passenger continues forward).</li>\n  <li>A book remains on a table (at rest) unless a force moves it.</li>\n  <li>A ball rolling on a frictionless surface would continue indefinitely (frictionless = no external force).</li>\n</ul>\n\n<h3 class=\"learn-subheading\">3. Newton's Second Law</h3>\n<p class=\"learn-p\"><em>\"The rate of change of momentum of a body is directly proportional to the applied force and takes place in the direction of the force.\"</em></p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>F = ma</strong> (for constant mass)</p>\n<p class=\"learn-p\">More precisely: F = Δp/Δt = (mv − mu)/t = m(v−u)/t = ma</p>\n<p class=\"learn-p\">SI unit of force: newton (N) = kg m s⁻²</p>\n\n<h3 class=\"learn-subheading\">4. Newton's Third Law</h3>\n<p class=\"learn-p\"><em>\"For every action, there is an equal and opposite reaction.\"</em></p>\n<p class=\"learn-p\">When object A exerts a force on object B, object B exerts an equal and opposite force on object A. These forces act on DIFFERENT objects, so they do not cancel each other out.</p>\n<ul class=\"learn-list\">\n  <li>A rocket expels gas downward (action) → gas pushes rocket upward (reaction).</li>\n  <li>A gun recoils when a bullet is fired.</li>\n  <li>A swimmer pushes water backward → water pushes swimmer forward.</li>\n  <li>Earth attracts a falling apple downward; the apple also attracts Earth upward (but Earth is so massive, it doesn't visibly move).</li>\n</ul>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Newton's Three Laws — Summary</text>\n    <rect x=\"10\" y=\"28\" width=\"145\" height=\"160\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#FFC53D\" stroke-width=\"1.5\"/>\n    <rect x=\"167\" y=\"28\" width=\"145\" height=\"160\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#28c840\" stroke-width=\"1.5\"/>\n    <rect x=\"325\" y=\"28\" width=\"145\" height=\"160\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#ff5f57\" stroke-width=\"1.5\"/>\n    <text x=\"82\" y=\"48\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"9\" font-weight=\"bold\">1st Law</text>\n    <text x=\"82\" y=\"62\" text-anchor=\"middle\" fill=\"#c8c8c8\" font-size=\"8\">Inertia</text>\n    <text x=\"82\" y=\"78\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">Body continues at</text>\n    <text x=\"82\" y=\"90\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">rest or uniform</text>\n    <text x=\"82\" y=\"102\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">motion unless</text>\n    <text x=\"82\" y=\"114\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">external force acts</text>\n    <text x=\"82\" y=\"135\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"8\">Net F = 0 →</text>\n    <text x=\"82\" y=\"148\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"8\">no change</text>\n    <text x=\"240\" y=\"48\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"9\" font-weight=\"bold\">2nd Law</text>\n    <text x=\"240\" y=\"62\" text-anchor=\"middle\" fill=\"#c8c8c8\" font-size=\"8\">F = ma</text>\n    <text x=\"240\" y=\"78\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">Force = rate of</text>\n    <text x=\"240\" y=\"90\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">change of momentum</text>\n    <text x=\"240\" y=\"105\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"9\">F = Δp/Δt = ma</text>\n    <text x=\"240\" y=\"125\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">1 N = 1 kg m/s²</text>\n    <text x=\"398\" y=\"48\" text-anchor=\"middle\" fill=\"#ff5f57\" font-size=\"9\" font-weight=\"bold\">3rd Law</text>\n    <text x=\"398\" y=\"62\" text-anchor=\"middle\" fill=\"#c8c8c8\" font-size=\"8\">Action-Reaction</text>\n    <text x=\"398\" y=\"78\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">Every action has</text>\n    <text x=\"398\" y=\"90\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">equal and opposite</text>\n    <text x=\"398\" y=\"102\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">reaction on</text>\n    <text x=\"398\" y=\"114\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">different object</text>\n    <text x=\"398\" y=\"135\" text-anchor=\"middle\" fill=\"#ff5f57\" font-size=\"8\">Rocket propulsion</text>\n    <text x=\"398\" y=\"148\" text-anchor=\"middle\" fill=\"#ff5f57\" font-size=\"8\">Gun recoil</text>\n    <rect x=\"10\" y=\"28\" width=\"145\" height=\"160\" rx=\"8\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"1\">\n      <animate attributeName=\"opacity\" values=\"0.3;0.8;0.3\" dur=\"2s\" repeatCount=\"indefinite\"/>\n    </rect>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">5. Impulse</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Impulse</span> is the product of force and the time over which it acts:</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>Impulse = F × t = Δp = mv − mu</strong></p>\n<p class=\"learn-p\">Impulse equals the change in momentum. SI unit: N·s = kg m/s.</p>\n<p class=\"learn-p\"><strong>Application:</strong> A longer contact time for the same change in momentum requires a smaller force. This is why: car airbags inflate (increase contact time, reduce force on passenger); cricketers draw their hands back when catching a fast ball; pole vaulters use cushioned mats.</p>\n\n<h3 class=\"learn-subheading\">6. Conservation of Linear Momentum</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">law of conservation of momentum</span>: \"The total linear momentum of a system of bodies is constant if no external force acts on the system.\"</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂</strong></p>\n<p class=\"learn-p\"><strong>Types of collision:</strong></p>\n<ul class=\"learn-list\">\n  <li><strong>Elastic collision:</strong> Both momentum and kinetic energy are conserved. Objects bounce off each other perfectly.</li>\n  <li><strong>Inelastic collision:</strong> Momentum is conserved but kinetic energy is NOT (some converted to heat/sound). Most real collisions are inelastic.</li>\n  <li><strong>Perfectly inelastic collision:</strong> Objects stick together after collision — maximum kinetic energy loss.</li>\n</ul>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Newton's 3rd Law:</strong> Action and reaction forces act on DIFFERENT objects (not on the same object). They never cancel each other out. Common error: \"The force of gravity on a book and the table's normal reaction are action-reaction pairs.\" WRONG — normal reaction balances gravity (Newton's 1st law equilibrium); action-reaction pair would be: book pushes table down AND table pushes book up.\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Momentum p = mv (vector, kg m/s). Newton's 1st Law: inertia — no change in motion without net force. 2nd Law: F = ma = Δp/Δt. 3rd Law: action = equal and opposite reaction (on different objects). Impulse = Ft = Δp. Conservation of momentum: total momentum constant when no external force. Elastic collision: KE conserved. Inelastic: KE not conserved.\n</div>\n  ",
    "questions": [
      {
        "q": "A 2 kg ball moves at 5 m/s. Its linear momentum is:",
        "o": [
          "2.5 kg m/s",
          "7 kg m/s",
          "10 kg m/s",
          "0.4 kg m/s"
        ],
        "a": 2,
        "e": "p = mv = 2 × 5 = 10 kg m/s.",
        "h": "p = mv = 2 × 5 = 10 kg m/s.",
        "yr": "SS1"
      },
      {
        "q": "Newton's First Law is also known as the Law of:",
        "o": [
          "Conservation of Energy",
          "Gravitation",
          "Inertia",
          "Action and Reaction"
        ],
        "a": 2,
        "e": "Newton's First Law is the Law of Inertia — bodies resist changes to their state of motion. A body at rest stays at rest, and a body in motion continues at constant velocity, unless an external force acts.",
        "h": "Newton's 1st Law = Law of Inertia.",
        "yr": "SS1"
      },
      {
        "q": "A 5 kg object accelerates at 3 m/s². The net force acting on it is:",
        "o": [
          "1.67 N",
          "8 N",
          "15 N",
          "53 N"
        ],
        "a": 2,
        "e": "F = ma = 5 × 3 = 15 N.",
        "h": "F = ma = 5 × 3 = 15 N.",
        "yr": "SS1"
      },
      {
        "q": "Newton's Third Law states that action and reaction forces:",
        "o": [
          "Act on the same object and cancel",
          "Are equal in magnitude but act on DIFFERENT objects",
          "Only apply to collisions",
          "Always act horizontally"
        ],
        "a": 1,
        "e": "Action and reaction forces (Newton's 3rd Law) are equal in magnitude and opposite in direction, but they act on DIFFERENT objects. Therefore, they do not cancel each other.",
        "h": "3rd Law: equal and opposite forces on DIFFERENT objects.",
        "yr": "SS1"
      },
      {
        "q": "Impulse is defined as:",
        "o": [
          "Force × distance",
          "Force × time = change in momentum",
          "Mass × acceleration",
          "Change in kinetic energy"
        ],
        "a": 1,
        "e": "Impulse = F × t = Δp = mv − mu. Impulse equals the change in momentum. Unit: N·s = kg m/s.",
        "h": "Impulse = F × t = change in momentum.",
        "yr": "SS1"
      },
      {
        "q": "The law of conservation of momentum applies when:",
        "o": [
          "All forces are equal",
          "No external force acts on the system",
          "All collisions are elastic",
          "All objects are moving in the same direction"
        ],
        "a": 1,
        "e": "The law of conservation of linear momentum states that total momentum is constant (conserved) when no NET external force acts on the system. Internal forces between objects in the system do not change the total momentum.",
        "h": "Momentum conserved → no external force on the system.",
        "yr": "SS1"
      },
      {
        "q": "A 1000 kg car moving at 20 m/s collides with a stationary 500 kg car and they stick together. Final velocity is:",
        "o": [
          "20 m/s",
          "13.3 m/s",
          "30 m/s",
          "40 m/s"
        ],
        "a": 1,
        "e": "Conservation of momentum: m₁u₁ + m₂u₂ = (m₁+m₂)v → 1000×20 + 500×0 = 1500×v → v = 20000/1500 = 13.3 m/s.",
        "h": "p_initial = p_final: 1000×20 = 1500×v → v = 13.3 m/s.",
        "yr": "SS1"
      },
      {
        "q": "A gun of mass 2 kg fires a bullet of mass 0.02 kg at 300 m/s. The recoil velocity of the gun is:",
        "o": [
          "3 m/s",
          "300 m/s",
          "150 m/s",
          "6 m/s"
        ],
        "a": 0,
        "e": "Conservation of momentum (system initially at rest): 0 = 0.02×300 + 2×v_gun → 2v_gun = −6 → v_gun = −3 m/s. Recoil speed = 3 m/s (backward).",
        "h": "0 = m_bullet × v_bullet + m_gun × v_gun → v_gun = 3 m/s backward.",
        "yr": "SS1"
      },
      {
        "q": "In an elastic collision:",
        "o": [
          "Only momentum is conserved",
          "Both momentum and kinetic energy are conserved",
          "Neither is conserved",
          "Only kinetic energy is conserved"
        ],
        "a": 1,
        "e": "An elastic collision conserves BOTH linear momentum AND kinetic energy. Objects bounce back perfectly with no energy lost to heat or deformation. In inelastic collisions, momentum is conserved but kinetic energy is not.",
        "h": "Elastic = momentum + KE both conserved.",
        "yr": "SS1"
      },
      {
        "q": "Car airbags reduce injury by:",
        "o": [
          "Increasing the force on the passenger",
          "Decreasing the time of collision, increasing force",
          "Increasing the time of collision, reducing the force for the same momentum change",
          "Absorbing the passenger's kinetic energy into the airbag permanently"
        ],
        "a": 2,
        "e": "Impulse = F × t = Δp. For the same change in momentum (Δp), a longer time (t) means a smaller force (F). Airbags increase the collision time, reducing the peak force on the passenger, preventing serious injury.",
        "h": "Airbag: longer time → smaller force (Impulse = Ft = constant Δp).",
        "yr": "SS1"
      },
      {
        "q": "The SI unit of impulse is equivalent to:",
        "o": [
          "N/s",
          "kg m/s",
          "kg m/s²",
          "J/m"
        ],
        "a": 1,
        "e": "Impulse = Ft = kg m s⁻² × s = kg m s⁻¹ = kg m/s. This is the same as the unit of momentum, which makes sense since Impulse = change in momentum.",
        "h": "Impulse unit = N·s = kg m/s = same as momentum.",
        "yr": "SS1"
      },
      {
        "q": "A passenger in a bus lurches forward when the driver brakes suddenly. This illustrates:",
        "o": [
          "Newton's Third Law",
          "Conservation of momentum",
          "Newton's First Law (inertia)",
          "Newton's Second Law"
        ],
        "a": 2,
        "e": "Newton's First Law (inertia): the passenger's body tends to continue moving forward at the original speed even when the bus decelerates. The body resists the change in motion. This is inertia — the tendency to maintain current state of motion.",
        "h": "Passenger lurches forward when bus stops = inertia = Newton's 1st Law.",
        "yr": "SS1"
      },
      {
        "q": "Force is defined by Newton's 2nd Law as:",
        "o": [
          "Force = mass × distance",
          "Force = rate of change of speed",
          "Force = rate of change of momentum (F = Δp/Δt = ma)",
          "Force = mass/acceleration"
        ],
        "a": 2,
        "e": "Newton's 2nd Law: F = Δp/Δt = d(mv)/dt. For constant mass: F = m(Δv/Δt) = ma. The force equals the rate of change of momentum.",
        "h": "F = ma = Δp/Δt (Newton's 2nd Law).",
        "yr": "SS1"
      },
      {
        "q": "A rocket accelerates in space by expelling gas. This is an application of:",
        "o": [
          "Newton's First Law",
          "Newton's Second Law only",
          "Newton's Third Law (reaction to expelled gas)",
          "Conservation of energy"
        ],
        "a": 2,
        "e": "Rocket propulsion uses Newton's 3rd Law: the rocket expels gas backward (action), and the reaction force propels the rocket forward. In space there is nothing to push against — the reaction to expelled gas is sufficient. Also involves conservation of momentum.",
        "h": "Rocket: gas expelled backward (action) → rocket moves forward (reaction) = 3rd Law.",
        "yr": "SS1"
      },
      {
        "q": "An object of mass 3 kg has momentum 12 kg m/s. Its velocity is:",
        "o": [
          "4 m/s",
          "9 m/s",
          "36 m/s",
          "0.25 m/s"
        ],
        "a": 0,
        "e": "p = mv → v = p/m = 12/3 = 4 m/s.",
        "h": "v = p/m = 12/3 = 4 m/s.",
        "yr": "SS1"
      },
      {
        "q": "Two objects collide and stick together (perfectly inelastic collision). Kinetic energy is:",
        "o": [
          "Fully conserved",
          "Partially lost (converted to heat, sound, deformation)",
          "Increased",
          "Only momentum is lost"
        ],
        "a": 1,
        "e": "In a perfectly inelastic collision, objects stick together. Momentum is conserved, but kinetic energy is NOT fully conserved — some is converted to internal energy (heat, sound, deformation of objects). This is the maximum KE loss for any collision.",
        "h": "Perfectly inelastic: maximum KE lost. Momentum always conserved.",
        "yr": "SS1"
      },
      {
        "q": "The weight of a 10 kg object (g = 10 m/s²) is also the force of gravity. By Newton's 3rd Law, the object exerts an equal force of 100 N:",
        "o": [
          "Downward on Earth",
          "Upward on Earth",
          "Sideways on Earth",
          "Not on Earth but on the air around it"
        ],
        "a": 1,
        "e": "Earth exerts 100 N downward on the object (weight). By Newton's 3rd Law, the object exerts 100 N UPWARD on Earth. This is the action-reaction pair. Earth is so massive it doesn't noticeably accelerate.",
        "h": "3rd Law: if Earth pulls object down with 100 N, object pulls Earth up with 100 N.",
        "yr": "SS1"
      },
      {
        "q": "A force of 20 N acts on a 4 kg body for 3 s. The change in momentum is:",
        "o": [
          "15 kg m/s",
          "60 kg m/s",
          "80 kg m/s",
          "240 kg m/s"
        ],
        "a": 1,
        "e": "Impulse = F × t = 20 × 3 = 60 N·s = 60 kg m/s = change in momentum.",
        "h": "Δp = F × t = 20 × 3 = 60 kg m/s.",
        "yr": "SS1"
      },
      {
        "q": "An object of mass 5 kg moving at 4 m/s East collides with a 3 kg object moving at 2 m/s West. Total momentum before collision is:",
        "o": [
          "26 kg m/s East",
          "26 kg m/s West",
          "14 kg m/s East",
          "14 kg m/s West"
        ],
        "a": 2,
        "e": "Taking East as positive: p_total = 5(+4) + 3(−2) = 20 − 6 = 14 kg m/s East.",
        "h": "Take East as +ve. p = 5(4) + 3(−2) = 20 − 6 = 14 kg m/s East.",
        "yr": "SS1"
      },
      {
        "q": "A 0.5 kg ball moving at 4 m/s hits a wall and bounces back at 4 m/s. The change in momentum is:",
        "o": [
          "0 kg m/s",
          "2 kg m/s",
          "4 kg m/s",
          "8 kg m/s"
        ],
        "a": 2,
        "e": "Initial momentum = 0.5×4 = 2 kg m/s (toward wall). Final momentum = 0.5×(−4) = −2 kg m/s (away from wall). Change = −2 − 2 = −4 kg m/s. Magnitude = 4 kg m/s.",
        "h": "Δp = m×Δv = 0.5×(−4−4) = −4 kg m/s (magnitude = 4 kg m/s).",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Work, Energy and Power",
    "topicCode": "SS1-PHY-08",
    "module": "Energy",
    "term": "Second Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Work</span>, <span class=\"learn-keyword\">energy</span>, and <span class=\"learn-keyword\">power</span> are among the most important concepts in physics — and in everyday Nigerian life. The energy in petroleum extracted from the Niger Delta powers generators, vehicles, and industry across Africa. Understanding these concepts is essential for electrical engineering, power plant design, and the growing renewable energy sector in Nigeria (solar panels on rooftops in Lagos, wind farms in Katsina).\n</div>\n\n<h3 class=\"learn-subheading\">1. Work</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Work</span> is done when a force causes displacement of an object in the direction of the force.</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>W = F × d × cos θ</strong></p>\n<p class=\"learn-p\">where F = applied force (N), d = displacement (m), θ = angle between force and displacement. SI unit: joule (J) = N·m.</p>\n<ul class=\"learn-list\">\n  <li>θ = 0° (force and displacement in same direction): W = Fd (maximum work)</li>\n  <li>θ = 90° (force perpendicular to displacement): W = 0 (no work done) — e.g., carrying a bag horizontally while walking</li>\n  <li>θ = 180° (force opposing motion): W = −Fd (negative work — e.g., friction)</li>\n  <li>Work done by gravity on a falling body: W = mgh (positive, gravity and motion in same direction)</li>\n</ul>\n\n<h3 class=\"learn-subheading\">2. Energy</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Energy</span> is the capacity to do work. SI unit: joule (J). Energy is a scalar quantity.</p>\n\n<h4 class=\"learn-subsubheading\">Kinetic Energy</h4>\n<p class=\"learn-p\">Energy of motion: <strong>KE = ½mv²</strong></p>\n<p class=\"learn-p\">A moving vehicle has KE — this is what makes road accidents so devastating at high speeds (KE depends on v²).</p>\n\n<h4 class=\"learn-subsubheading\">Gravitational Potential Energy</h4>\n<p class=\"learn-p\">Energy stored by virtue of position in a gravitational field: <strong>PE = mgh</strong></p>\n<p class=\"learn-p\">where m = mass (kg), g = gravitational field strength (≈ 10 m/s²), h = height above reference level (m).</p>\n\n<h4 class=\"learn-subsubheading\">Conservation of Mechanical Energy</h4>\n<p class=\"learn-p\">In the absence of friction and other dissipative forces: <strong>KE + PE = constant</strong></p>\n<p class=\"learn-p\">At maximum height (v = 0): all energy is PE. At ground (h = 0): all energy is KE.</p>\n<p class=\"learn-p\">½mv² + mgh = constant → <strong>½mv₁² + mgh₁ = ½mv₂² + mgh₂</strong></p>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Energy Conservation — Ball Falling</text>\n    <rect x=\"10\" y=\"28\" width=\"460\" height=\"160\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <!-- Ball at top -->\n    <circle cx=\"100\" cy=\"60\" r=\"12\" fill=\"#FFC53D\"/>\n    <text x=\"100\" y=\"43\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"8\">PE = mgh</text>\n    <text x=\"100\" y=\"32\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">KE = 0 (v=0)</text>\n    <!-- Ball midway -->\n    <circle cx=\"240\" cy=\"120\" r=\"12\" fill=\"#FFC53D\" opacity=\"0.7\"/>\n    <text x=\"240\" y=\"105\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"8\">PE = ½mgh</text>\n    <text x=\"240\" y=\"95\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"7\">KE = ½mgh</text>\n    <!-- Ball at bottom -->\n    <circle cx=\"380\" cy=\"168\" r=\"12\" fill=\"#FFC53D\" opacity=\"0.4\"/>\n    <text x=\"380\" y=\"155\" text-anchor=\"middle\" fill=\"#ff5f57\" font-size=\"8\">PE = 0</text>\n    <text x=\"380\" y=\"145\" text-anchor=\"middle\" fill=\"#ff5f57\" font-size=\"7\">KE = mgh</text>\n    <!-- Arrows showing trajectory -->\n    <path d=\"M112,60 Q180,90 228,120\" stroke=\"#FFC53D\" stroke-width=\"1.5\" fill=\"none\" stroke-dasharray=\"4,2\"/>\n    <path d=\"M252,120 Q320,150 368,168\" stroke=\"#FFC53D\" stroke-width=\"1.5\" fill=\"none\" stroke-dasharray=\"4,2\"/>\n    <!-- Height indicators -->\n    <line x1=\"50\" y1=\"60\" x2=\"50\" y2=\"175\" stroke=\"#8B5CF6\" stroke-width=\"1.5\"/>\n    <text x=\"38\" y=\"120\" fill=\"#8B5CF6\" font-size=\"8\">h</text>\n    <polygon points=\"46,168 50,178 54,168\" fill=\"#8B5CF6\"/>\n    <text x=\"240\" y=\"192\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\">Total energy = KE + PE = constant (no friction)</text>\n    <rect x=\"10\" y=\"28\" width=\"460\" height=\"160\" rx=\"8\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"1\">\n      <animate attributeName=\"opacity\" values=\"0.3;0.8;0.3\" dur=\"2s\" repeatCount=\"indefinite\"/>\n    </rect>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">3. Power</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Power</span> is the rate of doing work (or transferring energy):</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>P = W/t = Fv</strong></p>\n<p class=\"learn-p\">SI unit: watt (W) = J/s. Also useful: 1 kW = 1000 W; 1 MW = 10⁶ W.</p>\n<p class=\"learn-p\">P = Fv: power of a vehicle engine equals driving force × velocity. A car engine with power 100 kW and driving force 5000 N travels at: v = P/F = 100,000/5,000 = 20 m/s.</p>\n\n<h3 class=\"learn-subheading\">4. Efficiency</h3>\n<p class=\"learn-p\"><strong>Efficiency</strong> is the ratio of useful output energy to total input energy:</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>Efficiency = (Useful output / Total input) × 100%</strong></p>\n<p class=\"learn-p\">No machine is 100% efficient — energy is always lost (usually as heat due to friction). Nigeria's power grid efficiency is an important practical concern.</p>\n\n<h3 class=\"learn-subheading\">5. Forms of Energy</h3>\n<ul class=\"learn-list\">\n  <li>Kinetic energy (motion)</li>\n  <li>Potential energy (position, elastic, chemical, nuclear)</li>\n  <li>Thermal (heat) energy</li>\n  <li>Electrical energy</li>\n  <li>Sound energy</li>\n  <li>Light (radiant/electromagnetic) energy</li>\n  <li>Chemical energy (in food, petrol, batteries)</li>\n  <li>Nuclear energy</li>\n</ul>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">law of conservation of energy</span>: energy can neither be created nor destroyed — only converted from one form to another. Total energy of a closed system is constant.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Work Done at an Angle:</strong> W = Fd cos θ. The key is the angle between force and displacement. \"A person pushes a trolley with force 80 N at 30° to the horizontal for 10 m.\" W = 80 × 10 × cos 30° = 800 × (√3/2) ≈ 693 J. \"A person carries a 10 kg bag for 100 m horizontally.\" W = 0 (weight is vertical, displacement is horizontal, θ = 90°, cos 90° = 0).\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Work W = Fd cosθ (J). No work if θ=90°. KE = ½mv². PE = mgh. Conservation: KE+PE = constant (no friction). Power P = W/t = Fv (W). Efficiency = (useful output/input)×100%. Energy forms: kinetic, potential (gravitational, elastic, chemical, nuclear), heat, electrical, sound, light. Conservation of energy: energy converts between forms, total unchanged.\n</div>\n  ",
    "questions": [
      {
        "q": "Work is done when:",
        "o": [
          "A force is applied to an object",
          "A force causes displacement in the direction of the force",
          "An object moves with constant velocity",
          "An object is at rest under balanced forces"
        ],
        "a": 1,
        "e": "Work = Fd cosθ. Work is done only when a force causes displacement. If θ = 90° (force perpendicular to motion), no work is done. A force with no resulting displacement does no work (e.g., pushing against a fixed wall).",
        "h": "Work requires force AND displacement in the force's direction.",
        "yr": "SS1"
      },
      {
        "q": "A force of 30 N pushes an object 5 m along a horizontal surface. Work done is:",
        "o": [
          "6 J",
          "35 J",
          "150 J",
          "750 J"
        ],
        "a": 2,
        "e": "W = F × d = 30 × 5 = 150 J (θ = 0°, force and displacement in same direction, cos 0° = 1).",
        "h": "W = Fd = 30 × 5 = 150 J.",
        "yr": "SS1"
      },
      {
        "q": "The kinetic energy of a 4 kg ball moving at 6 m/s is:",
        "o": [
          "12 J",
          "24 J",
          "72 J",
          "144 J"
        ],
        "a": 2,
        "e": "KE = ½mv² = ½ × 4 × 36 = 72 J.",
        "h": "KE = ½mv² = ½ × 4 × 6² = 72 J.",
        "yr": "SS1"
      },
      {
        "q": "A 5 kg stone is lifted 3 m above the ground. Its gravitational PE is (g = 10 m/s²):",
        "o": [
          "150 J",
          "50 J",
          "15 J",
          "500 J"
        ],
        "a": 0,
        "e": "PE = mgh = 5 × 10 × 3 = 150 J.",
        "h": "PE = mgh = 5 × 10 × 3 = 150 J.",
        "yr": "SS1"
      },
      {
        "q": "A machine does 2000 J of work in 40 s. Its power is:",
        "o": [
          "80000 W",
          "50 W",
          "2040 W",
          "1960 W"
        ],
        "a": 1,
        "e": "P = W/t = 2000/40 = 50 W.",
        "h": "P = W/t = 2000/40 = 50 W.",
        "yr": "SS1"
      },
      {
        "q": "A person carries a heavy bag of 20 kg horizontally for 10 m. The work done against gravity is:",
        "o": [
          "2000 J",
          "200 J",
          "0 J",
          "20 J"
        ],
        "a": 2,
        "e": "W = Fd cosθ. The weight (gravity) acts vertically downward; displacement is horizontal. θ = 90° between gravity and displacement. W = Fd cos90° = 0.",
        "h": "Weight is vertical; motion is horizontal → θ=90° → W = Fd cos90° = 0.",
        "yr": "SS1"
      },
      {
        "q": "Conservation of mechanical energy states:",
        "o": [
          "KE is always converted to PE and back",
          "KE + PE = constant when no friction or other dissipative forces act",
          "Total energy including heat is never conserved",
          "Energy can be created by machines"
        ],
        "a": 1,
        "e": "Conservation of mechanical energy: when no friction or non-conservative forces act, the total mechanical energy (KE + PE) remains constant. Energy converts between KE and PE but the total does not change.",
        "h": "KE + PE = constant (no friction). Total mechanical energy conserved.",
        "yr": "SS1"
      },
      {
        "q": "The efficiency of a machine is 75%. If 400 J of energy is input, useful output energy is:",
        "o": [
          "300 J",
          "75 J",
          "475 J",
          "533 J"
        ],
        "a": 0,
        "e": "Useful output = efficiency × input = 0.75 × 400 = 300 J. The remaining 100 J is wasted (heat, friction, etc.).",
        "h": "Output = efficiency × input = 0.75 × 400 = 300 J.",
        "yr": "SS1"
      },
      {
        "q": "Power can also be expressed as:",
        "o": [
          "Force × distance",
          "Force × velocity (P = Fv)",
          "Mass × acceleration",
          "Energy × time"
        ],
        "a": 1,
        "e": "P = W/t = F×d/t = F×v. So Power = Force × velocity. This is useful for calculating the power output of engines and motors.",
        "h": "P = W/t = Fd/t = Fv.",
        "yr": "SS1"
      },
      {
        "q": "A 10 kg ball falls freely from 20 m height. Just before hitting the ground, its KE is (g = 10 m/s²):",
        "o": [
          "100 J",
          "200 J",
          "1000 J",
          "2000 J"
        ],
        "a": 3,
        "e": "Using conservation of energy: KE at bottom = PE at top = mgh = 10×10×20 = 2000 J. (Or v²=2gh=400, v=20m/s, KE=½mv²=½×10×400=2000 J).",
        "h": "KE = PE lost = mgh = 10×10×20 = 2000 J.",
        "yr": "SS1"
      },
      {
        "q": "The law of conservation of energy states:",
        "o": [
          "Energy can be created by nuclear reactions",
          "Energy is destroyed when used in machines",
          "Energy can neither be created nor destroyed, only transformed",
          "Only kinetic and potential energy are conserved"
        ],
        "a": 2,
        "e": "The law of conservation of energy: energy cannot be created from nothing, nor destroyed — it can only be converted from one form to another. The total energy of a closed system remains constant.",
        "h": "Energy: neither created nor destroyed — only transformed between forms.",
        "yr": "SS1"
      },
      {
        "q": "A 2 kg stone is thrown vertically upward with speed 10 m/s. The maximum height reached (g = 10 m/s²) using energy conservation:",
        "o": [
          "2 m",
          "5 m",
          "10 m",
          "20 m"
        ],
        "a": 1,
        "e": "KE at bottom = PE at top. ½mv² = mgh → h = v²/(2g) = 100/20 = 5 m.",
        "h": "½mv² = mgh → h = v²/2g = 100/20 = 5 m.",
        "yr": "SS1"
      },
      {
        "q": "A crane lifts a 500 kg load 10 m in 20 s. Power required is (g = 10 m/s²):",
        "o": [
          "250 W",
          "2500 W",
          "25000 W",
          "50000 W"
        ],
        "a": 1,
        "e": "W = mgh = 500×10×10 = 50,000 J. P = W/t = 50,000/20 = 2500 W = 2.5 kW.",
        "h": "P = mgh/t = 50000/20 = 2500 W.",
        "yr": "SS1"
      },
      {
        "q": "Work done when force is perpendicular to displacement is:",
        "o": [
          "Maximum",
          "Equal to Fd",
          "Zero",
          "Negative"
        ],
        "a": 2,
        "e": "W = Fd cos θ. When θ = 90°: W = Fd cos 90° = Fd × 0 = 0. No work is done when force is perpendicular to displacement.",
        "h": "θ = 90°: W = Fd cos90° = 0.",
        "yr": "SS1"
      },
      {
        "q": "A vehicle engine has power 80 kW and driving force 4000 N. Its maximum speed is:",
        "o": [
          "20 km/h",
          "20 m/s",
          "320 m/s",
          "0.05 m/s"
        ],
        "a": 1,
        "e": "P = Fv → v = P/F = 80,000/4,000 = 20 m/s.",
        "h": "v = P/F = 80,000/4,000 = 20 m/s.",
        "yr": "SS1"
      },
      {
        "q": "Chemical energy stored in petrol is converted mainly to what form when burned in an engine?",
        "o": [
          "Electrical energy",
          "Kinetic and thermal (heat) energy",
          "Potential energy",
          "Nuclear energy"
        ],
        "a": 1,
        "e": "When petrol burns in an engine, chemical energy converts to: thermal energy (heat — most) and kinetic energy (motion of pistons/vehicle). Some is also lost as sound. In Nigeria, petrol engines power millions of vehicles and generators.",
        "h": "Petrol combustion: chemical → kinetic + thermal energy.",
        "yr": "SS1"
      },
      {
        "q": "The unit of energy (joule) in base SI units is:",
        "o": [
          "kg m/s",
          "kg m² s⁻²",
          "kg m s⁻²",
          "kg m² s⁻³"
        ],
        "a": 1,
        "e": "J = N·m = (kg m s⁻²) × m = kg m² s⁻². Energy in base units = kg m² s⁻².",
        "h": "J = Nm = kg m s⁻² × m = kg m² s⁻².",
        "yr": "SS1"
      },
      {
        "q": "A boy weighing 500 N runs up stairs of height 4 m in 5 s. His power output is:",
        "o": [
          "400 W",
          "2500 W",
          "100 W",
          "10000 W"
        ],
        "a": 0,
        "e": "W = F × d = 500 × 4 = 2000 J. P = W/t = 2000/5 = 400 W.",
        "h": "W = 500×4 = 2000 J. P = 2000/5 = 400 W.",
        "yr": "SS1"
      },
      {
        "q": "If the speed of a moving body doubles, its kinetic energy:",
        "o": [
          "Doubles",
          "Halves",
          "Quadruples (×4)",
          "Increases by 8 times"
        ],
        "a": 2,
        "e": "KE = ½mv². If v doubles (v → 2v): new KE = ½m(2v)² = ½m × 4v² = 4 × ½mv² = 4 × original KE. KE quadruples.",
        "h": "KE ∝ v². If v doubles, KE × 4.",
        "yr": "SS1"
      },
      {
        "q": "A 1000 W motor runs for 30 minutes. The electrical energy consumed in kJ is:",
        "o": [
          "30 kJ",
          "1800 kJ",
          "500 kJ",
          "3000 kJ"
        ],
        "a": 1,
        "e": "E = P×t = 1000 W × (30×60) s = 1000 × 1800 = 1,800,000 J = 1800 kJ.",
        "h": "E = Pt = 1000 × 1800 = 1,800,000 J = 1800 kJ.",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Mechanical Energy — Machines",
    "topicCode": "SS1-PHY-09",
    "module": "Energy and Machines",
    "term": "Second Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Simple machines</span> are devices that make work easier — not by reducing the work done, but by changing the magnitude or direction of the force required. They allow a small force (effort) to overcome a large force (load). Simple machines are found everywhere in Nigerian life: pulleys in market lifting systems, levers in bottle openers and crowbars, inclined planes in ramps at car parks, wheel-and-axle in water wells (Kano's ancient water system), gears in bicycles.\n</div>\n\n<h3 class=\"learn-subheading\">1. Key Definitions</h3>\n<ul class=\"learn-list\">\n  <li><strong>Load (L):</strong> The force overcome by the machine (the resistance).</li>\n  <li><strong>Effort (E):</strong> The force applied to the machine by the operator.</li>\n  <li><strong>Mechanical Advantage (MA):</strong> MA = Load/Effort = L/E. A machine with MA > 1 allows a small effort to overcome a large load.</li>\n  <li><strong>Velocity Ratio (VR):</strong> VR = Distance moved by effort / Distance moved by load. Also called the ideal mechanical advantage.</li>\n  <li><strong>Efficiency (η):</strong> η = (MA/VR) × 100% = (Work output / Work input) × 100%</li>\n</ul>\n\n<h3 class=\"learn-subheading\">2. Relationship Between MA, VR, and Efficiency</h3>\n<p class=\"learn-p\">For an ideal (frictionless) machine: MA = VR and efficiency = 100%.</p>\n<p class=\"learn-p\">In real machines: MA &lt; VR due to friction, and efficiency &lt; 100%.</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>η = (MA/VR) × 100% = (Useful work output / Total work input) × 100%</strong></p>\n\n<h3 class=\"learn-subheading\">3. Types of Simple Machines</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Machine</th><th>VR Formula</th><th>Nigerian Example</th></tr></thead>\n    <tbody>\n      <tr><td>Lever (1st class)</td><td>VR = effort arm / load arm</td><td>See-saw, scissors, crowbar, claw hammer</td></tr>\n      <tr><td>Lever (2nd class)</td><td>VR = effort arm / load arm &gt;1</td><td>Wheelbarrow, bottle opener, nutcracker</td></tr>\n      <tr><td>Lever (3rd class)</td><td>VR &lt; 1 (speed multiplier)</td><td>Human forearm lifting a load, tweezers</td></tr>\n      <tr><td>Pulley (single fixed)</td><td>VR = 1</td><td>Changes direction of force only</td></tr>\n      <tr><td>Pulley (single movable)</td><td>VR = 2</td><td>Halves the effort</td></tr>\n      <tr><td>Block and tackle (n ropes)</td><td>VR = n (number of pulleys)</td><td>Building construction hoists</td></tr>\n      <tr><td>Inclined plane</td><td>VR = L/h (length/height)</td><td>Ramps, roads on hills</td></tr>\n      <tr><td>Screw</td><td>VR = 2πR/p (pitch)</td><td>Screw jack (car lifting), vise</td></tr>\n      <tr><td>Wheel and axle</td><td>VR = R/r (radii)</td><td>Steering wheel, water well, windlass</td></tr>\n      <tr><td>Wedge</td><td>VR = L/W</td><td>Axe, knife, chisel, door wedge</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Simple Machines</text>\n    <!-- Lever (Class 1) -->\n    <text x=\"90\" y=\"38\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\" font-weight=\"bold\">Lever (1st class)</text>\n    <line x1=\"20\" y1=\"100\" x2=\"175\" y2=\"100\" stroke=\"#FFC53D\" stroke-width=\"3\"/>\n    <polygon points=\"95,90 100,105 105,90\" fill=\"#7C3AED\"/>\n    <text x=\"100\" y=\"118\" fill=\"#9090b0\" font-size=\"7\">Fulcrum</text>\n    <line x1=\"35\" y1=\"100\" x2=\"35\" y2=\"65\" stroke=\"#ff5f57\" stroke-width=\"2\"/>\n    <polygon points=\"30,65 35,58 40,65\" fill=\"#ff5f57\"/>\n    <text x=\"25\" y=\"60\" fill=\"#ff5f57\" font-size=\"7\">L</text>\n    <line x1=\"160\" y1=\"100\" x2=\"160\" y2=\"130\" stroke=\"#28c840\" stroke-width=\"2\"/>\n    <polygon points=\"155,128 160,135 165,128\" fill=\"#28c840\"/>\n    <text x=\"167\" y=\"133\" fill=\"#28c840\" font-size=\"7\">E</text>\n    <text x=\"57\" y=\"87\" fill=\"#9090b0\" font-size=\"7\">d_L</text>\n    <text x=\"130\" y=\"87\" fill=\"#9090b0\" font-size=\"7\">d_E</text>\n    <!-- Inclined plane -->\n    <text x=\"350\" y=\"38\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\" font-weight=\"bold\">Inclined Plane</text>\n    <polygon points=\"230,170 460,170 460,100\" fill=\"#2d1b4e\" stroke=\"#FFC53D\" stroke-width=\"2\"/>\n    <text x=\"350\" y=\"165\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"8\">length L</text>\n    <text x=\"465\" y=\"138\" fill=\"#9090b0\" font-size=\"8\">h</text>\n    <line x1=\"460\" y1=\"100\" x2=\"460\" y2=\"170\" stroke=\"#FFC53D\" stroke-width=\"1.5\" stroke-dasharray=\"3,2\"/>\n    <rect x=\"295\" y=\"150\" width=\"20\" height=\"15\" rx=\"3\" fill=\"#FFC53D\" opacity=\"0.7\"/>\n    <line x1=\"315\" y1=\"157\" x2=\"355\" y2=\"135\" stroke=\"#28c840\" stroke-width=\"2\"/>\n    <polygon points=\"350,128 358,135 350,140\" fill=\"#28c840\"/>\n    <text x=\"330\" y=\"128\" fill=\"#28c840\" font-size=\"7\">E</text>\n    <text x=\"240\" y=\"190\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">VR = L/h; Effort < Load; direction changed</text>\n    <text x=\"90\" y=\"160\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">VR = d_E/d_L = effort arm/load arm</text>\n    <rect x=\"10\" y=\"28\" width=\"460\" height=\"165\" rx=\"8\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"1\">\n      <animate attributeName=\"opacity\" values=\"0.3;0.8;0.3\" dur=\"2s\" repeatCount=\"indefinite\"/>\n    </rect>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">4. Classes of Levers</h3>\n<p class=\"learn-p\">Levers are classified by the position of the fulcrum (pivot), effort, and load:</p>\n<ul class=\"learn-list\">\n  <li><strong>Class 1:</strong> Fulcrum between load and effort. MA can be > 1 or < 1. Examples: seesaw, scissors, pliers, crowbar, claw hammer (when pulling nails).</li>\n  <li><strong>Class 2:</strong> Load between fulcrum and effort. MA always > 1. Examples: wheelbarrow, bottle opener, nutcracker, stapler.</li>\n  <li><strong>Class 3:</strong> Effort between fulcrum and load. MA always < 1 but speed is gained. Examples: forearm (elbow = fulcrum, bicep = effort, hand = load), tweezers, broom.</li>\n</ul>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — VR for Pulleys:</strong> For a pulley system, VR = number of rope segments supporting the load (not counting the rope you pull). For a single fixed pulley: VR = 1 (no mechanical advantage, only direction change). For a single movable pulley: VR = 2. For a block-and-tackle with n pulleys total: VR = 2n (for double purchase) or simply count supporting ropes.\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Machines make work easier (change force magnitude/direction). MA = Load/Effort. VR = effort distance/load distance. Efficiency = (MA/VR) × 100%. Real machines: MA < VR, efficiency < 100% (friction). Levers: Class 1 (fulcrum between), Class 2 (load between), Class 3 (effort between). Pulley VR = number of supporting ropes. Inclined plane VR = L/h. No machine reduces total work done — only force required.\n</div>\n  ",
    "questions": [
      {
        "q": "A machine has load 500 N and effort 100 N. The Mechanical Advantage is:",
        "o": [
          "5",
          "0.2",
          "400",
          "600"
        ],
        "a": 0,
        "e": "MA = Load/Effort = 500/100 = 5. This means the effort is 5 times less than the load — the machine magnifies force by 5.",
        "h": "MA = Load/Effort = 500/100 = 5.",
        "yr": "SS1"
      },
      {
        "q": "The Velocity Ratio (VR) of a machine is defined as:",
        "o": [
          "Load/Effort",
          "Effort/Load",
          "Distance moved by effort/Distance moved by load",
          "Efficiency × MA"
        ],
        "a": 2,
        "e": "VR = (distance moved by effort)/(distance moved by load). VR is a property of the machine's geometry and does not depend on friction (unlike MA).",
        "h": "VR = effort distance/load distance.",
        "yr": "SS1"
      },
      {
        "q": "The efficiency of a machine with MA = 4 and VR = 5 is:",
        "o": [
          "20%",
          "80%",
          "125%",
          "1.25%"
        ],
        "a": 1,
        "e": "Efficiency = (MA/VR) × 100% = (4/5) × 100% = 80%.",
        "h": "Efficiency = (MA/VR) × 100% = 4/5 × 100% = 80%.",
        "yr": "SS1"
      },
      {
        "q": "A single fixed pulley has VR =",
        "o": [
          "0",
          "1",
          "2",
          "Depends on load"
        ],
        "a": 1,
        "e": "A single fixed pulley changes the direction of force only. The effort moves the same distance as the load moves, so VR = 1. MA ≈ 1 (with friction, slightly less).",
        "h": "Single fixed pulley: VR = 1 (changes direction, not force magnitude).",
        "yr": "SS1"
      },
      {
        "q": "In a lever, the Mechanical Advantage equals:",
        "o": [
          "load arm / effort arm",
          "effort arm / load arm",
          "load / effort arm",
          "effort arm × load arm"
        ],
        "a": 1,
        "e": "For a lever at equilibrium (moments): Load × load arm = Effort × effort arm. MA = Load/Effort = effort arm/load arm.",
        "h": "MA = effort arm/load arm (from moments: Ld_L = Ed_E).",
        "yr": "SS1"
      },
      {
        "q": "A wheelbarrow has its wheel (fulcrum) at one end, load in the middle, and effort at the handles. This is a:",
        "o": [
          "Class 1 lever",
          "Class 2 lever",
          "Class 3 lever",
          "Pulley"
        ],
        "a": 1,
        "e": "A wheelbarrow is a Class 2 lever: load is between the fulcrum (wheel axle) and the effort (hands at handles). Class 2 levers always have MA > 1.",
        "h": "Class 2: load between fulcrum and effort. Wheelbarrow = classic example.",
        "yr": "SS1"
      },
      {
        "q": "The efficiency of an ideal (frictionless) machine is:",
        "o": [
          "Less than 100%",
          "Equal to 100%",
          "Greater than 100%",
          "Zero"
        ],
        "a": 1,
        "e": "For an ideal frictionless machine, MA = VR, so efficiency = (MA/VR) × 100% = 100%. In practice, friction reduces MA below VR, giving efficiency < 100%.",
        "h": "Ideal machine: MA = VR → efficiency = 100%.",
        "yr": "SS1"
      },
      {
        "q": "An inclined plane is 8 m long and 2 m high. Its Velocity Ratio is:",
        "o": [
          "0.25",
          "4",
          "16",
          "6"
        ],
        "a": 1,
        "e": "VR of inclined plane = length/height = L/h = 8/2 = 4.",
        "h": "VR inclined plane = L/h = 8/2 = 4.",
        "yr": "SS1"
      },
      {
        "q": "A block-and-tackle system has 4 rope segments supporting the load. The VR is:",
        "o": [
          "2",
          "4",
          "8",
          "1"
        ],
        "a": 1,
        "e": "For a block-and-tackle (compound pulley), VR = number of rope segments supporting the movable pulley block (the load). With 4 supporting segments: VR = 4.",
        "h": "Block-and-tackle: VR = number of supporting rope segments.",
        "yr": "SS1"
      },
      {
        "q": "Why can no machine have efficiency greater than 100%?",
        "o": [
          "Machines are poorly designed in Nigeria",
          "Energy input must always exceed useful output because friction converts some energy to heat",
          "No one has invented such a machine yet",
          "The formula doesn't allow it mathematically"
        ],
        "a": 1,
        "e": "Conservation of energy prevents efficiency > 100%. Total energy input = useful output + energy lost (heat/sound from friction). Useful output can never exceed input, so efficiency ≤ 100%. A machine claiming >100% efficiency would violate energy conservation.",
        "h": "Energy conservation: input ≥ useful output (some lost to friction). Efficiency ≤ 100%.",
        "yr": "SS1"
      },
      {
        "q": "The human forearm lifting a load (elbow = fulcrum, bicep muscle = effort, hand holds load) is a:",
        "o": [
          "Class 1 lever",
          "Class 2 lever",
          "Class 3 lever",
          "Wheel and axle"
        ],
        "a": 2,
        "e": "Human forearm: elbow = fulcrum, bicep (between elbow and hand) = effort, load at hand. Effort is between fulcrum and load → Class 3 lever. MA < 1 but speed and range of motion are gained.",
        "h": "Effort between fulcrum and load = Class 3 lever. E.g., forearm, tweezers, broom.",
        "yr": "SS1"
      },
      {
        "q": "An effort of 200 N moves through 4 m to lift a load of 600 N by 1 m. Efficiency is:",
        "o": [
          "33.3%",
          "75%",
          "67%",
          "50%"
        ],
        "a": 1,
        "e": "Work input = 200 × 4 = 800 J. Work output = 600 × 1 = 600 J. Efficiency = 600/800 × 100% = 75%.",
        "h": "Efficiency = work output/work input = (600×1)/(200×4) × 100% = 75%.",
        "yr": "SS1"
      },
      {
        "q": "Scissors are an example of which class of lever?",
        "o": [
          "Class 1",
          "Class 2",
          "Class 3",
          "Not a lever"
        ],
        "a": 0,
        "e": "Scissors: the pivot/fulcrum is in the middle, the effort is applied at the handles, and the load (object being cut) is at the blades on the other side. Fulcrum between load and effort = Class 1 lever.",
        "h": "Scissors: pivot in middle, load and effort on opposite sides = Class 1.",
        "yr": "SS1"
      },
      {
        "q": "A screw jack has a circular handle of radius 20 cm and a pitch (thread spacing) of 2 mm. VR = 2πR/p =",
        "o": [
          "π × 0.01",
          "200π",
          "10π",
          "100π"
        ],
        "a": 1,
        "e": "VR = 2πR/p = 2π × 20 cm / 0.2 cm = 2π × 100 = 200π ≈ 628. Wait: pitch = 2 mm = 0.2 cm. VR = 2π(20)/0.2 = 40π/0.2 = 200π.",
        "h": "VR = 2πR/p = 2π(20)/0.2 = 200π.",
        "yr": "SS1"
      },
      {
        "q": "The main reason machines are not 100% efficient is:",
        "o": [
          "Poor design",
          "Friction between moving parts converting input energy to heat",
          "The machines are too old",
          "They don't follow Newton's laws"
        ],
        "a": 1,
        "e": "In all real machines, friction between moving parts converts some of the input energy into heat (and sound), which is wasted. This reduces the useful output below the total input, giving efficiency < 100%.",
        "h": "Friction wastes energy as heat → efficiency < 100%.",
        "yr": "SS1"
      },
      {
        "q": "A single movable pulley has efficiency 80%. If load = 400 N, what effort is needed?",
        "o": [
          "250 N",
          "200 N",
          "160 N",
          "500 N"
        ],
        "a": 0,
        "e": "Ideal effort (VR=2): 400/2 = 200 N. But efficiency = 80% = MA/(VR) → MA = 0.8 × 2 = 1.6. Effort = Load/MA = 400/1.6 = 250 N.",
        "h": "VR=2, eff=80%: MA=1.6. Effort = Load/MA = 400/1.6 = 250 N.",
        "yr": "SS1"
      },
      {
        "q": "Which simple machine changes only the DIRECTION of force (not its magnitude)?",
        "o": [
          "Inclined plane",
          "Single fixed pulley",
          "Lever with MA > 1",
          "Block and tackle"
        ],
        "a": 1,
        "e": "A single fixed pulley has VR = 1 and (ideal) MA = 1 — it does not change the magnitude of force, only its direction. For example, pulling down to lift up.",
        "h": "Single fixed pulley: VR=1, only changes direction of force.",
        "yr": "SS1"
      },
      {
        "q": "Machines make work easier by:",
        "o": [
          "Reducing the total work that must be done",
          "Reducing the force required (at the cost of greater distance) or changing force direction",
          "Creating energy from nothing",
          "Eliminating friction completely"
        ],
        "a": 1,
        "e": "Machines do NOT reduce the total work done (Work = Fd; if F decreases, d must increase proportionally). They make work easier by: (1) reducing the required force (at the cost of larger distance moved by effort), or (2) changing the direction of force. Total work done is at least as much as the output work (efficiency ≤ 100%).",
        "h": "Machines reduce FORCE needed, not total work done. Tradeoff: more distance.",
        "yr": "SS1"
      },
      {
        "q": "A lever has load arm 2 m and effort arm 6 m. Its velocity ratio is:",
        "o": [
          "1/3",
          "3",
          "12",
          "6"
        ],
        "a": 1,
        "e": "VR = effort arm/load arm = 6/2 = 3. This means the effort moves 3 times the distance the load moves.",
        "h": "VR = effort arm / load arm = 6/2 = 3.",
        "yr": "SS1"
      },
      {
        "q": "A machine has VR = 8 and efficiency 75%. An effort of 50 N is applied. The load lifted is:",
        "o": [
          "300 N",
          "400 N",
          "600 N",
          "533 N"
        ],
        "a": 0,
        "e": "MA = efficiency × VR = 0.75 × 8 = 6. Load = MA × Effort = 6 × 50 = 300 N.",
        "h": "MA = efficiency × VR = 0.75×8 = 6. Load = MA × Effort = 6×50 = 300 N.",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Heat Energy I — Temperature and Its Measurement",
    "topicCode": "SS1-PHY-10",
    "module": "Heat",
    "term": "Second Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Heat</span> and <span class=\"learn-keyword\">temperature</span> are distinct physical concepts that are often confused in everyday language. Temperature is a measure of the average kinetic energy of the particles in a substance — it tells us how \"hot\" or \"cold\" something is. Heat is the energy transferred between objects due to a temperature difference. This distinction is fundamental in thermodynamics and has practical implications in medicine (body temperature), cooking (food temperatures), and industrial processes.\n</div>\n\n<h3 class=\"learn-subheading\">1. Heat vs Temperature</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Property</th><th>Heat</th><th>Temperature</th></tr></thead>\n    <tbody>\n      <tr><td>Definition</td><td>Energy transferred due to temperature difference</td><td>Measure of average kinetic energy of particles</td></tr>\n      <tr><td>Type</td><td>Form of energy</td><td>Physical property (not energy)</td></tr>\n      <tr><td>SI Unit</td><td>joule (J)</td><td>kelvin (K)</td></tr>\n      <tr><td>Instrument</td><td>Calorimeter</td><td>Thermometer</td></tr>\n      <tr><td>Direction of flow</td><td>From hot → cold (always)</td><td>Not applicable</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">2. Temperature Scales</h3>\n<p class=\"learn-p\">Three main temperature scales are used:</p>\n\n<h4 class=\"learn-subsubheading\">Celsius Scale (°C)</h4>\n<ul class=\"learn-list\">\n  <li>Lower fixed point (ice point): 0°C (temperature of pure melting ice at standard pressure)</li>\n  <li>Upper fixed point (steam point): 100°C (temperature of steam from boiling water at standard pressure)</li>\n  <li>100 equal divisions between fixed points</li>\n</ul>\n\n<h4 class=\"learn-subsubheading\">Kelvin Scale (K) — SI Temperature</h4>\n<ul class=\"learn-list\">\n  <li>Absolute zero: 0 K = −273.15°C (no thermal motion; minimum possible temperature)</li>\n  <li>Conversion: T(K) = T(°C) + 273 (approximately)</li>\n  <li>Ice point: 273 K. Steam point: 373 K.</li>\n  <li>1 kelvin = 1 degree Celsius (same size degree interval)</li>\n</ul>\n\n<h4 class=\"learn-subsubheading\">Fahrenheit Scale (°F)</h4>\n<ul class=\"learn-list\">\n  <li>Used mainly in the USA and Nigeria informally for weather/body temperature.</li>\n  <li>Ice point: 32°F. Steam point: 212°F. Body temperature: 98.6°F = 37°C.</li>\n  <li>Conversion: T(°F) = (9/5)T(°C) + 32; T(°C) = (5/9)(T(°F) − 32)</li>\n</ul>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Temperature Scales Comparison</text>\n    <!-- Three thermometers -->\n    <rect x=\"60\" y=\"30\" width=\"20\" height=\"150\" rx=\"5\" fill=\"#1B0A47\" stroke=\"#FFC53D\" stroke-width=\"1.5\"/>\n    <rect x=\"180\" y=\"30\" width=\"20\" height=\"150\" rx=\"5\" fill=\"#1B0A47\" stroke=\"#28c840\" stroke-width=\"1.5\"/>\n    <rect x=\"300\" y=\"30\" width=\"20\" height=\"150\" rx=\"5\" fill=\"#1B0A47\" stroke=\"#ff9500\" stroke-width=\"1.5\"/>\n    <!-- Fill levels for 37°C body temp -->\n    <rect x=\"62\" y=\"90\" width=\"16\" height=\"88\" rx=\"3\" fill=\"#ff5f57\"/>\n    <rect x=\"182\" y=\"90\" width=\"16\" height=\"88\" rx=\"3\" fill=\"#ff5f57\"/>\n    <rect x=\"302\" y=\"115\" width=\"16\" height=\"63\" rx=\"3\" fill=\"#ff5f57\"/>\n    <!-- Scale labels -->\n    <text x=\"70\" y=\"25\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"9\" font-weight=\"bold\">°C</text>\n    <text x=\"190\" y=\"25\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"9\" font-weight=\"bold\">K</text>\n    <text x=\"310\" y=\"25\" text-anchor=\"middle\" fill=\"#ff9500\" font-size=\"9\" font-weight=\"bold\">°F</text>\n    <!-- Celsius marks -->\n    <text x=\"85\" y=\"35\" fill=\"#FFC53D\" font-size=\"7\">100</text>\n    <text x=\"85\" y=\"90\" fill=\"#FFC53D\" font-size=\"7\">37</text>\n    <text x=\"85\" y=\"178\" fill=\"#FFC53D\" font-size=\"7\">0</text>\n    <!-- Kelvin marks -->\n    <text x=\"205\" y=\"35\" fill=\"#28c840\" font-size=\"7\">373</text>\n    <text x=\"205\" y=\"90\" fill=\"#28c840\" font-size=\"7\">310</text>\n    <text x=\"205\" y=\"178\" fill=\"#28c840\" font-size=\"7\">273</text>\n    <!-- Fahrenheit marks -->\n    <text x=\"325\" y=\"35\" fill=\"#ff9500\" font-size=\"7\">212</text>\n    <text x=\"325\" y=\"115\" fill=\"#ff9500\" font-size=\"7\">98.6</text>\n    <text x=\"325\" y=\"178\" fill=\"#ff9500\" font-size=\"7\">32</text>\n    <!-- Labels -->\n    <text x=\"70\" y=\"35\" text-anchor=\"middle\" fill=\"#ff5f57\" font-size=\"6\">Steam</text>\n    <text x=\"190\" y=\"35\" text-anchor=\"middle\" fill=\"#ff5f57\" font-size=\"6\">Steam</text>\n    <text x=\"310\" y=\"35\" text-anchor=\"middle\" fill=\"#ff5f57\" font-size=\"6\">Steam</text>\n    <text x=\"240\" y=\"197\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"8\">T(K) = T(°C) + 273 | T(°F) = 9/5 × T(°C) + 32</text>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">3. Thermometers</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">thermometer</span> measures temperature. It works on the principle that some physical property (thermometric property) changes predictably with temperature.</p>\n\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Thermometer Type</th><th>Thermometric Property</th><th>Range</th><th>Use</th></tr></thead>\n    <tbody>\n      <tr><td>Liquid-in-glass (mercury)</td><td>Volume expansion of mercury</td><td>−39°C to 357°C</td><td>Clinical, laboratory</td></tr>\n      <tr><td>Liquid-in-glass (alcohol)</td><td>Volume expansion of alcohol</td><td>−115°C to 78°C</td><td>Low temperatures, weather</td></tr>\n      <tr><td>Resistance thermometer (platinum)</td><td>Change in electrical resistance</td><td>−260°C to 1200°C</td><td>Precision measurement, industry</td></tr>\n      <tr><td>Thermocouple</td><td>Thermoelectric EMF</td><td>−250°C to 1600°C</td><td>High temperatures, furnaces</td></tr>\n      <tr><td>Clinical thermometer</td><td>Mercury volume, with constriction</td><td>35°C to 42°C</td><td>Body temperature (hospitals)</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">4. Clinical Thermometer</h3>\n<p class=\"learn-p\">The clinical thermometer has a <span class=\"learn-keyword\">constriction</span> (narrow point) in the bore just above the bulb. This prevents mercury from flowing back after removal from the patient's body, allowing the temperature to be read at leisure. Range: 35°C to 42°C (normal body temperature ≈ 37°C). It is STERILISED between patients to prevent infection transmission.</p>\n\n<h3 class=\"learn-subheading\">5. Fixed Points and Calibration</h3>\n<p class=\"learn-p\">To calibrate a thermometer:</p>\n<ol class=\"learn-list learn-ordered\">\n  <li>Place the thermometer in melting ice (0°C) — mark the lower fixed point.</li>\n  <li>Place in steam above boiling water at standard pressure (100°C) — mark the upper fixed point.</li>\n  <li>Divide the distance between marks into 100 equal divisions (for Celsius scale).</li>\n</ol>\n<p class=\"learn-p\">Temperature of unknown object: θ = (l_θ − l₀)/(l₁₀₀ − l₀) × 100°C, where l = length of mercury column at that temperature.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Temperature Conversions:</strong> Most commonly tested: T(K) = T(°C) + 273. So 0°C = 273 K, 100°C = 373 K, body temp 37°C = 310 K, absolute zero 0 K = −273°C. For Fahrenheit: body temp 37°C = 37 × 9/5 + 32 = 66.6 + 32 = 98.6°F. Room temperature: 25°C = 298 K = 77°F.\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Heat = energy transferred (J). Temperature = average KE of particles (K or °C). Scales: Celsius (0°C ice, 100°C steam), Kelvin (T_K = T_C + 273, 0K absolute zero), Fahrenheit (32°F ice, 212°F steam). Thermometers: liquid-in-glass (mercury, alcohol), resistance, thermocouple, clinical. Clinical thermometer has constriction to hold reading. Fixed points for calibration: 0°C (ice) and 100°C (steam).\n</div>\n  ",
    "questions": [
      {
        "q": "What is the SI unit of temperature?",
        "o": [
          "Degree Celsius (°C)",
          "Degree Fahrenheit (°F)",
          "Kelvin (K)",
          "Joule (J)"
        ],
        "a": 2,
        "e": "Kelvin (K) is the SI unit of thermodynamic temperature. It is one of the 7 base SI units. Absolute zero (0 K) = −273°C, the lowest possible temperature.",
        "h": "SI unit of temperature = kelvin (K).",
        "yr": "SS1"
      },
      {
        "q": "Convert 27°C to kelvin.",
        "o": [
          "246 K",
          "300 K",
          "373 K",
          "27 K"
        ],
        "a": 1,
        "e": "T(K) = T(°C) + 273 = 27 + 273 = 300 K.",
        "h": "T(K) = T(°C) + 273 = 27 + 273 = 300 K.",
        "yr": "SS1"
      },
      {
        "q": "What is the boiling point of water on the Kelvin scale?",
        "o": [
          "100 K",
          "173 K",
          "273 K",
          "373 K"
        ],
        "a": 3,
        "e": "Water boils at 100°C. T(K) = 100 + 273 = 373 K.",
        "h": "100°C + 273 = 373 K.",
        "yr": "SS1"
      },
      {
        "q": "A clinical thermometer has a constriction in the bore in order to:",
        "o": [
          "Increase its range",
          "Allow the mercury to contract and expand more freely",
          "Prevent mercury from flowing back after removal from the patient",
          "Reduce the size of the thermometer"
        ],
        "a": 2,
        "e": "The constriction prevents mercury from flowing back into the bulb after the thermometer is removed from the patient's body, allowing the maximum temperature to be read at any time after measurement.",
        "h": "Constriction = keeps mercury at maximum reading after thermometer removal.",
        "yr": "SS1"
      },
      {
        "q": "Heat is defined as:",
        "o": [
          "The temperature of a body",
          "Energy transferred between objects because of a temperature difference",
          "The total kinetic energy of all particles",
          "The degree of hotness of a body"
        ],
        "a": 1,
        "e": "Heat is energy in transit — it is transferred from a hotter body to a cooler body because of a temperature difference. Once transferred, heat becomes internal energy of the cooler body. Heat is NOT the same as temperature.",
        "h": "Heat = energy transferred due to temperature difference.",
        "yr": "SS1"
      },
      {
        "q": "Normal human body temperature (37°C) converted to Fahrenheit is:",
        "o": [
          "37°F",
          "66.6°F",
          "98.6°F",
          "310°F"
        ],
        "a": 2,
        "e": "T(°F) = (9/5)T(°C) + 32 = (9/5)(37) + 32 = 66.6 + 32 = 98.6°F.",
        "h": "T(°F) = 9/5 × T(°C) + 32 = 9/5 × 37 + 32 = 98.6°F.",
        "yr": "SS1"
      },
      {
        "q": "Absolute zero (0 K) is equivalent to:",
        "o": [
          "0°C",
          "−100°C",
          "−273°C",
          "273°C"
        ],
        "a": 2,
        "e": "0 K = 0 − 273 = −273°C (approximately −273.15°C). At absolute zero, particles theoretically have minimum thermal energy and motion essentially ceases.",
        "h": "0 K = −273°C (absolute zero).",
        "yr": "SS1"
      },
      {
        "q": "The thermometric property used in a mercury thermometer is:",
        "o": [
          "Change in electrical resistance",
          "Change in volume of mercury with temperature",
          "Change in pressure of mercury",
          "Thermal emission of mercury"
        ],
        "a": 1,
        "e": "Mercury thermometers use the thermal expansion of mercury — as temperature rises, mercury expands and the liquid level rises in the capillary tube. The position of the meniscus indicates temperature.",
        "h": "Mercury thermometer: volume expansion of mercury with temperature.",
        "yr": "SS1"
      },
      {
        "q": "Which thermometer has the widest temperature range?",
        "o": [
          "Mercury-in-glass thermometer",
          "Alcohol-in-glass thermometer",
          "Clinical thermometer",
          "Thermocouple thermometer"
        ],
        "a": 3,
        "e": "Thermocouple thermometers can measure from −250°C to over 1600°C — the widest range. This makes them ideal for furnaces, engines, and extreme environments. Mercury thermometers are limited to −39°C to 357°C.",
        "h": "Thermocouple: widest range (−250°C to 1600°C).",
        "yr": "SS1"
      },
      {
        "q": "The temperature at the ice point (lower fixed point) on the Celsius scale is:",
        "o": [
          "−273°C",
          "0°C",
          "32°C",
          "100°C"
        ],
        "a": 1,
        "e": "The lower fixed point (ice point) is 0°C — the temperature of pure melting ice at standard atmospheric pressure. This is one of the two reference points used to calibrate a Celsius thermometer.",
        "h": "Lower fixed point = ice point = 0°C.",
        "yr": "SS1"
      },
      {
        "q": "An alcohol thermometer is preferred over mercury for measuring VERY LOW temperatures because:",
        "o": [
          "Alcohol is cheaper than mercury",
          "Alcohol has a much lower freezing point (−115°C) compared to mercury (−39°C)",
          "Alcohol expands more uniformly",
          "Alcohol is safer to use"
        ],
        "a": 1,
        "e": "Mercury freezes at −39°C, making it useless for temperatures below this. Alcohol freezes at −115°C, making it suitable for very low temperatures like those in Arctic regions or cold storage facilities.",
        "h": "Alcohol freezes at −115°C vs mercury at −39°C → alcohol better for very low temps.",
        "yr": "SS1"
      },
      {
        "q": "Convert −40°C to Fahrenheit.",
        "o": [
          "−40°F",
          "0°F",
          "−72°F",
          "40°F"
        ],
        "a": 0,
        "e": "T(°F) = (9/5)(−40) + 32 = −72 + 32 = −40°F. This is the only temperature where Celsius and Fahrenheit have the same numerical value!",
        "h": "T(°F) = 9/5×(−40)+32 = −72+32 = −40°F. (−40°C = −40°F!)",
        "yr": "SS1"
      },
      {
        "q": "Temperature is a measure of:",
        "o": [
          "The total thermal energy of a body",
          "The average kinetic energy of the particles of a substance",
          "The heat content of a body",
          "The specific heat capacity"
        ],
        "a": 1,
        "e": "Temperature is a measure of the AVERAGE kinetic energy of the particles (atoms/molecules) of a substance. Higher temperature = faster average particle motion. Total thermal energy also depends on the NUMBER of particles (hence depends on mass too).",
        "h": "Temperature = average KE of particles. Total KE depends on mass too.",
        "yr": "SS1"
      },
      {
        "q": "A thermometer reads 25 mm in ice and 225 mm in steam (100°C). At what temperature does it read 125 mm?",
        "o": [
          "25°C",
          "50°C",
          "75°C",
          "100°C"
        ],
        "a": 1,
        "e": "θ = (l_θ − l₀)/(l₁₀₀ − l₀) × 100 = (125−25)/(225−25) × 100 = 100/200 × 100 = 50°C.",
        "h": "θ = (reading − lower)/(upper − lower) × 100.",
        "yr": "SS1"
      },
      {
        "q": "What temperature on the Kelvin scale corresponds to 0°C?",
        "o": [
          "0 K",
          "100 K",
          "273 K",
          "373 K"
        ],
        "a": 2,
        "e": "T(K) = T(°C) + 273 = 0 + 273 = 273 K. This is the ice point on the Kelvin scale.",
        "h": "0°C + 273 = 273 K (ice point on Kelvin scale).",
        "yr": "SS1"
      },
      {
        "q": "Convert 77°F to Celsius.",
        "o": [
          "15°C",
          "25°C",
          "35°C",
          "45°C"
        ],
        "a": 1,
        "e": "T(°C) = (5/9)(T(°F) − 32) = (5/9)(77 − 32) = (5/9)(45) = 25°C.",
        "h": "T(°C) = 5/9 × (T(°F) − 32) = 5/9 × 45 = 25°C.",
        "yr": "SS1"
      },
      {
        "q": "Why must a clinical thermometer be sterilised between patients?",
        "o": [
          "To reset the mercury to zero",
          "To prevent transmission of infection from one patient to another",
          "To recalibrate the fixed points",
          "To prevent the constriction from clogging"
        ],
        "a": 1,
        "e": "The clinical thermometer contacts the patient's body (usually mouth or armpit). Bacteria and viruses can be transmitted on the thermometer's surface. Sterilisation (using alcohol or UV light) kills pathogens, preventing cross-infection between patients.",
        "h": "Sterilisation = prevents infection transmission between patients.",
        "yr": "SS1"
      },
      {
        "q": "The upper fixed point (steam point) used for thermometer calibration is:",
        "o": [
          "Temperature of boiling water at any pressure",
          "Temperature of water vapour at exactly one atmosphere pressure (100°C)",
          "Temperature of molten ice at standard pressure",
          "Temperature of dry steam"
        ],
        "a": 1,
        "e": "The upper fixed point is the temperature of water vapour (steam) from boiling water at exactly one standard atmosphere (101.325 kPa). This is 100°C. At different pressures, the boiling point changes (pressure cooking works on this principle).",
        "h": "Upper fixed point = steam point = 100°C at standard atmospheric pressure.",
        "yr": "SS1"
      },
      {
        "q": "A platinum resistance thermometer reads 20 Ω at 0°C and 28 Ω at 100°C. At what temperature is the resistance 24 Ω?",
        "o": [
          "25°C",
          "40°C",
          "50°C",
          "60°C"
        ],
        "a": 2,
        "e": "θ = (R_θ − R₀)/(R₁₀₀ − R₀) × 100 = (24−20)/(28−20) × 100 = 4/8 × 100 = 50°C.",
        "h": "θ = (R_θ − R₀)/(R₁₀₀ − R₀) × 100 = 4/8 × 100 = 50°C.",
        "yr": "SS1"
      },
      {
        "q": "Temperature increases from 20°C to 120°C. In kelvin, this change is:",
        "o": [
          "100 K",
          "393 K",
          "273 K",
          "393 K"
        ],
        "a": 0,
        "e": "Temperature change in Celsius = 120 − 20 = 100°C. Temperature change in Kelvin = 100 K. (A change of 1°C equals a change of 1 K — only starting values differ by 273.)",
        "h": "Temperature change: ΔT(°C) = ΔT(K). 100°C change = 100 K change.",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Heat Energy II — Heat Measurement",
    "topicCode": "SS1-PHY-11",
    "module": "Heat",
    "term": "Second Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  This topic deals with the quantitative measurement of heat — how much energy is needed to change the temperature of a substance, and how much energy is required to change its state (solid to liquid, liquid to gas) at constant temperature. These concepts have direct applications in cooking (how much energy to boil water), industrial processes, refrigeration, and climate science. The key experimental tool is the <span class=\"learn-keyword\">calorimeter</span>.\n</div>\n\n<h3 class=\"learn-subheading\">1. Specific Heat Capacity</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">specific heat capacity (c)</span> of a substance is the amount of heat required to raise the temperature of 1 kg of the substance by 1°C (or 1 K). SI unit: J kg⁻¹ K⁻¹.</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>Q = mcΔθ</strong></p>\n<p class=\"learn-p\">where Q = heat energy (J), m = mass (kg), c = specific heat capacity (J kg⁻¹ K⁻¹), Δθ = temperature change (°C or K).</p>\n<p class=\"learn-p\"><strong>Important values:</strong></p>\n<ul class=\"learn-list\">\n  <li>Water: c = 4200 J kg⁻¹ K⁻¹ (very high — explains why the ocean moderates climate)</li>\n  <li>Aluminium: c = 900 J kg⁻¹ K⁻¹</li>\n  <li>Iron/Steel: c ≈ 460 J kg⁻¹ K⁻¹</li>\n  <li>Copper: c ≈ 390 J kg⁻¹ K⁻¹</li>\n  <li>Glass: c ≈ 840 J kg⁻¹ K⁻¹</li>\n</ul>\n\n<h3 class=\"learn-subheading\">2. Latent Heat</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Latent heat</span> is the heat energy absorbed or released during a change of state (at constant temperature). \"Latent\" means hidden — temperature does not change during a phase change.</p>\n\n<h4 class=\"learn-subsubheading\">Specific Latent Heat of Fusion (Lf)</h4>\n<p class=\"learn-p\">Heat required to change 1 kg of solid to liquid at constant temperature (melting point):</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>Q = mLf</strong></p>\n<p class=\"learn-p\">Specific latent heat of fusion of ice = 3.34 × 10⁵ J kg⁻¹ = 336,000 J/kg</p>\n\n<h4 class=\"learn-subsubheading\">Specific Latent Heat of Vaporisation (Lv)</h4>\n<p class=\"learn-p\">Heat required to change 1 kg of liquid to vapour at constant temperature (boiling point):</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>Q = mLv</strong></p>\n<p class=\"learn-p\">Specific latent heat of vaporisation of water = 2.26 × 10⁶ J kg⁻¹ = 2,260,000 J/kg (much larger than Lf).</p>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Heating Curve of Water</text>\n    <line x1=\"40\" y1=\"20\" x2=\"40\" y2=\"175\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <line x1=\"35\" y1=\"170\" x2=\"460\" y2=\"170\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <text x=\"455\" y=\"178\" fill=\"#9090b0\" font-size=\"7\">t</text>\n    <text x=\"28\" y=\"18\" fill=\"#9090b0\" font-size=\"7\">T/°C</text>\n    <text x=\"30\" y=\"173\" fill=\"#9090b0\" font-size=\"7\">−20</text>\n    <text x=\"30\" y=\"130\" fill=\"#9090b0\" font-size=\"7\">0</text>\n    <text x=\"30\" y=\"60\" fill=\"#9090b0\" font-size=\"7\">100</text>\n    <!-- Ice warming -->\n    <line x1=\"50\" y1=\"170\" x2=\"100\" y2=\"130\" stroke=\"#5eb4ff\" stroke-width=\"2.5\"/>\n    <!-- Melting (horizontal at 0°C) -->\n    <line x1=\"100\" y1=\"130\" x2=\"180\" y2=\"130\" stroke=\"#FFC53D\" stroke-width=\"3\"/>\n    <!-- Water warming -->\n    <line x1=\"180\" y1=\"130\" x2=\"280\" y2=\"60\" stroke=\"#28c840\" stroke-width=\"2.5\"/>\n    <!-- Boiling (horizontal at 100°C) -->\n    <line x1=\"280\" y1=\"60\" x2=\"400\" y2=\"60\" stroke=\"#ff5f57\" stroke-width=\"3\"/>\n    <!-- Steam warming -->\n    <line x1=\"400\" y1=\"60\" x2=\"450\" y2=\"40\" stroke=\"#ff9500\" stroke-width=\"2.5\"/>\n    <!-- Labels -->\n    <text x=\"75\" y=\"158\" fill=\"#5eb4ff\" font-size=\"7\">Solid (ice)</text>\n    <text x=\"140\" y=\"120\" fill=\"#FFC53D\" font-size=\"7\">Melting (Lf)</text>\n    <text x=\"230\" y=\"100\" fill=\"#28c840\" font-size=\"7\">Liquid (water)</text>\n    <text x=\"335\" y=\"50\" fill=\"#ff5f57\" font-size=\"7\">Boiling (Lv)</text>\n    <text x=\"430\" y=\"38\" fill=\"#ff9500\" font-size=\"7\">Gas</text>\n    <text x=\"140\" y=\"113\" fill=\"#9090b0\" font-size=\"6\">T constant</text>\n    <text x=\"335\" y=\"63\" fill=\"#9090b0\" font-size=\"6\">T constant</text>\n    <text x=\"240\" y=\"193\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"8\">Q = mcΔθ (sloped) | Q = mL (flat = constant T)</text>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">3. Calorimetry</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Calorimetry</span> is the measurement of heat exchange. The <span class=\"learn-keyword\">principle of calorimetry</span> (conservation of energy): heat lost by hot body = heat gained by cold body (in an insulated system).</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>Heat lost = Heat gained: m₁c₁Δθ₁ = m₂c₂Δθ₂</strong></p>\n<p class=\"learn-p\"><strong>Example:</strong> 0.5 kg of iron (c = 460 J kg⁻¹K⁻¹) at 90°C is placed in 1 kg of water (c = 4200 J kg⁻¹K⁻¹) at 20°C. Find the final temperature θ.<br>\nHeat lost by iron = heat gained by water:<br>\n0.5 × 460 × (90 − θ) = 1 × 4200 × (θ − 20)<br>\n230(90 − θ) = 4200(θ − 20)<br>\n20700 − 230θ = 4200θ − 84000<br>\n104700 = 4430θ → θ ≈ 23.6°C</p>\n\n<h3 class=\"learn-subheading\">4. Why Water Has a High Specific Heat Capacity</h3>\n<p class=\"learn-p\">Water's unusually high specific heat capacity (4200 J kg⁻¹K⁻¹) has major implications:</p>\n<ul class=\"learn-list\">\n  <li>The ocean acts as a heat reservoir, moderating coastal climates (Lagos is cooler in summer than inland Abuja).</li>\n  <li>Water is an effective coolant in car radiators and industrial processes.</li>\n  <li>Human bodies (≈ 60% water) maintain stable temperature despite heat production and loss.</li>\n  <li>Cooking: water takes a long time to heat up and cool down.</li>\n</ul>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Latent Heat Questions:</strong> Key distinction: during a phase change (melting or boiling), Q = mL and temperature does NOT change. During temperature change, Q = mcΔθ and state does NOT change. A common exam question: \"Calculate heat needed to convert 0.5 kg of ice at 0°C to steam at 100°C.\" This requires THREE stages: (1) Melt ice: Q₁ = 0.5 × Lf; (2) Heat water: Q₂ = 0.5 × 4200 × 100; (3) Vaporise water: Q₃ = 0.5 × Lv. Total = Q₁ + Q₂ + Q₃.\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Specific heat capacity c: Q = mcΔθ. c(water) = 4200 J/kg/K. Specific latent heat of fusion Lf: Q = mLf (solid→liquid at constant T). Specific latent heat of vaporisation Lv: Q = mLv (liquid→gas at constant T). Lv(water) > Lf(water). Calorimetry: heat lost = heat gained. Heating curve shows horizontal lines at melting and boiling points where Q = mL. Slopes show Q = mcΔθ.\n</div>\n  ",
    "questions": [
      {
        "q": "The formula Q = mcΔθ is used to calculate:",
        "o": [
          "Latent heat",
          "Specific heat capacity (heat for temperature change)",
          "Power",
          "Work done"
        ],
        "a": 1,
        "e": "Q = mcΔθ calculates the heat energy needed to change the temperature of a mass m by Δθ, given its specific heat capacity c. This does NOT apply during a phase change (where Q = mL instead).",
        "h": "Q = mcΔθ: heat for temperature change. Q = mL: heat for phase change.",
        "yr": "SS1"
      },
      {
        "q": "How much heat is required to raise the temperature of 2 kg of water by 30°C? (c_water = 4200 J/kg/K)",
        "o": [
          "252,000 J",
          "6300 J",
          "126,000 J",
          "504 J"
        ],
        "a": 0,
        "e": "Q = mcΔθ = 2 × 4200 × 30 = 252,000 J = 252 kJ.",
        "h": "Q = 2 × 4200 × 30 = 252,000 J.",
        "yr": "SS1"
      },
      {
        "q": "During melting, the temperature of a substance:",
        "o": [
          "Increases rapidly",
          "Remains constant",
          "Decreases",
          "Fluctuates unpredictably"
        ],
        "a": 1,
        "e": "During a phase change (melting), the temperature remains CONSTANT. The heat supplied is used to overcome intermolecular forces and change the state, not to increase temperature. This is captured in Q = mL (no temperature change term).",
        "h": "During phase change: temperature constant. Q = mL (not mcΔθ).",
        "yr": "SS1"
      },
      {
        "q": "Specific latent heat of vaporisation of water (≈ 2.26 × 10⁶ J/kg) is much LARGER than latent heat of fusion (3.36 × 10⁵ J/kg) because:",
        "o": [
          "Vaporisation occurs at higher temperature",
          "Vaporisation requires breaking virtually all intermolecular bonds (large volume change)",
          "Water is denser as steam than as ice",
          "Fusion happens more quickly"
        ],
        "a": 1,
        "e": "Vaporisation requires breaking (or greatly separating) nearly all intermolecular bonds — molecules must escape from the liquid into gas phase against intermolecular attractions. Fusion only involves partial breaking of bonds (solid → liquid). The much greater energy required to escape completely makes Lv >> Lf.",
        "h": "Vaporisation: all intermolecular bonds broken (gas far from liquid) → much more energy.",
        "yr": "SS1"
      },
      {
        "q": "The principle of calorimetry states:",
        "o": [
          "Total heat energy is constant in the universe",
          "Heat lost by hot body = heat gained by cold body (in insulated system)",
          "Specific heat capacity equals latent heat",
          "Heat always flows from cold to hot"
        ],
        "a": 1,
        "e": "The principle of calorimetry is an application of energy conservation: in an insulated (thermally isolated) system, heat lost by the hotter body equals heat gained by the cooler body. m₁c₁Δθ₁ = m₂c₂Δθ₂.",
        "h": "Calorimetry: heat lost = heat gained (conservation of energy in insulated system).",
        "yr": "SS1"
      },
      {
        "q": "How much heat is needed to melt 0.2 kg of ice at 0°C? (Lf = 336,000 J/kg)",
        "o": [
          "1680 J",
          "16,800 J",
          "67,200 J",
          "336,000 J"
        ],
        "a": 2,
        "e": "Q = mLf = 0.2 × 336,000 = 67,200 J.",
        "h": "Q = mLf = 0.2 × 336,000 = 67,200 J.",
        "yr": "SS1"
      },
      {
        "q": "The specific heat capacity of water is 4200 J kg⁻¹ K⁻¹. This means:",
        "o": [
          "4200 J raises 1 kg of water from 0°C to 4200°C",
          "4200 J is needed to raise the temperature of 1 kg of water by 1°C",
          "Water has a low ability to store heat",
          "All substances require 4200 J per kg per degree"
        ],
        "a": 1,
        "e": "Specific heat capacity definition: the heat required per unit mass per unit temperature rise. c = 4200 J/kg/K means 4200 J raises 1 kg of water by 1°C (or 1 K). This is unusually high compared to most materials.",
        "h": "c = 4200 J/kg/K: 4200 J heats 1 kg of water by 1°C.",
        "yr": "SS1"
      },
      {
        "q": "An iron block (m=0.3 kg, c=460 J/kg/K) at 100°C is placed in 0.5 kg water at 20°C. Using heat lost = heat gained, final temperature θ is approximately:",
        "o": [
          "27°C",
          "29°C",
          "31°C",
          "60°C"
        ],
        "a": 0,
        "e": "Heat lost by iron = heat gained by water: 0.3×460×(100−θ) = 0.5×4200×(θ−20) → 55,800 = 2238θ → θ ≈ 24.9°C ≈ 25°C.",
        "h": "Set heat lost by iron = heat gained by water. Solve for θ.",
        "yr": "SS1"
      },
      {
        "q": "On a heating curve (temperature vs heat added), the horizontal sections represent:",
        "o": [
          "Rapid heating",
          "Phase changes at constant temperature where Q = mL",
          "Cooling periods",
          "Increases in specific heat capacity"
        ],
        "a": 1,
        "e": "Horizontal sections on the heating curve occur at the melting point (ice → water at 0°C) and boiling point (water → steam at 100°C). During these phase changes, temperature stays constant while heat (Q = mL) changes the state of matter.",
        "h": "Horizontal on heating curve = phase change at constant T = Q = mL.",
        "yr": "SS1"
      },
      {
        "q": "Sweating cools the body because:",
        "o": [
          "Sweat removes waste heat directly",
          "Evaporation of sweat from the skin requires latent heat, absorbing heat from the body",
          "Water on the skin blocks heat from entering",
          "Sweat has a lower temperature than body temperature"
        ],
        "a": 1,
        "e": "Evaporation requires latent heat of vaporisation. When sweat evaporates, it absorbs this latent heat FROM the skin surface, cooling it. The latent heat of vaporisation of water is very high (2.26 × 10⁶ J/kg), making evaporative cooling very effective.",
        "h": "Evaporation needs latent heat → takes heat FROM skin → cooling effect.",
        "yr": "SS1"
      },
      {
        "q": "Calculate the heat needed to convert 0.1 kg of water at 100°C into steam. (Lv = 2.26 × 10⁶ J/kg)",
        "o": [
          "22,600 J",
          "226,000 J",
          "2,260 J",
          "2,260,000 J"
        ],
        "a": 1,
        "e": "Q = mLv = 0.1 × 2.26 × 10⁶ = 226,000 J = 226 kJ.",
        "h": "Q = mLv = 0.1 × 2,260,000 = 226,000 J.",
        "yr": "SS1"
      },
      {
        "q": "The reason water is used as a coolant in car radiators is because:",
        "o": [
          "It is colourless and tasteless",
          "It has a very high specific heat capacity, so it can absorb large amounts of heat for small temperature rise",
          "It does not react with the engine",
          "It is cheap and readily available only"
        ],
        "a": 1,
        "e": "Water's high specific heat capacity (4200 J/kg/K — the highest of common liquids) means it can absorb large amounts of heat energy from the engine while rising only a little in temperature. This makes it an excellent coolant.",
        "h": "Water coolant: high c = absorbs much heat per degree rise = effective cooling.",
        "yr": "SS1"
      },
      {
        "q": "The heat required to completely convert 0.5 kg of ice at 0°C into water at 0°C and then into steam at 100°C is:",
        "o": [
          "168,000 J + 210,000 J + 1,130,000 J",
          "336,000 J + 210,000 J + 2,260,000 J",
          "It's impossible to calculate",
          "Only the steam step needs calculation"
        ],
        "a": 0,
        "e": "Three steps for 0.5 kg: Q₁ = 0.5×336,000 = 168,000 J (melt); Q₂ = 0.5×4200×100 = 210,000 J (heat water); Q₃ = 0.5×2,260,000 = 1,130,000 J (vaporise). Total = 1,508,000 J.",
        "h": "Three stages: melt (Q=mLf), heat water (Q=mcΔθ), vaporise (Q=mLv).",
        "yr": "SS1"
      },
      {
        "q": "Which of the following has the highest specific heat capacity?",
        "o": [
          "Iron (460 J/kg/K)",
          "Copper (390 J/kg/K)",
          "Water (4200 J/kg/K)",
          "Aluminium (900 J/kg/K)"
        ],
        "a": 2,
        "e": "Water has by far the highest specific heat capacity of common materials at 4200 J/kg/K. This is why water is such an effective coolant and why oceans moderate Earth's climate.",
        "h": "Water: c = 4200 J/kg/K — highest of common materials.",
        "yr": "SS1"
      },
      {
        "q": "What does 'latent' mean in the context of latent heat?",
        "o": [
          "Large",
          "Hidden (temperature does not change during phase change)",
          "Liquid",
          "Lightning-fast"
        ],
        "a": 1,
        "e": "'Latent' comes from Latin 'latere' meaning 'to be hidden.' During a phase change, heat is absorbed or released but the temperature does not change — the heat is 'hidden' within the changing structure of the material (breaking/forming intermolecular bonds).",
        "h": "Latent = hidden: temperature doesn't change during phase change.",
        "yr": "SS1"
      },
      {
        "q": "The specific latent heat of fusion of a substance is defined as:",
        "o": [
          "Heat required to raise the temperature of 1 kg by 1°C",
          "Heat required to change 1 kg of solid to liquid at constant temperature",
          "Heat released when 1 kg of gas condenses to liquid",
          "Total heat content per kilogram"
        ],
        "a": 1,
        "e": "Specific latent heat of fusion (Lf) = heat energy required to change 1 kg of a substance from solid to liquid at its melting point (constant temperature). It is the 'per unit mass' form: Q = mLf.",
        "h": "Specific latent heat of fusion = heat per kg to melt solid at constant temperature.",
        "yr": "SS1"
      },
      {
        "q": "400 g of a metal is heated from 25°C to 125°C using 18,000 J. The specific heat capacity of the metal is:",
        "o": [
          "450 J/kg/K",
          "7,200 J/kg/K",
          "72 J/kg/K",
          "1,800 J/kg/K"
        ],
        "a": 0,
        "e": "Q = mcΔθ → 18,000 = 0.4 × c × (125−25) = 0.4 × c × 100 = 40c → c = 450 J/kg/K.",
        "h": "c = Q/(mΔθ) = 18,000/(0.4×100) = 18,000/40 = 450 J/kg/K.",
        "yr": "SS1"
      },
      {
        "q": "How much energy is released when 0.5 kg of steam at 100°C condenses to water at 100°C? (Lv = 2.26×10⁶ J/kg)",
        "o": [
          "1.13×10⁶ J",
          "2.26×10⁶ J",
          "4.52×10⁵ J",
          "0.5 J"
        ],
        "a": 0,
        "e": "Q = mLv = 0.5 × 2.26×10⁶ = 1.13×10⁶ J. Condensation releases the same amount of heat that vaporisation absorbs.",
        "h": "Q = mLv = 0.5 × 2.26×10⁶ = 1.13×10⁶ J (released on condensation).",
        "yr": "SS1"
      },
      {
        "q": "250 g of water (c=4200 J/kg/K) is heated from 20°C to 80°C. Energy needed:",
        "o": [
          "63,000 J",
          "21,000 J",
          "1,050 J",
          "630 J"
        ],
        "a": 0,
        "e": "Q = mcΔθ = 0.25 × 4200 × 60 = 63,000 J = 63 kJ.",
        "h": "Q = mcΔθ = 0.25 × 4200 × 60 = 63,000 J.",
        "yr": "SS1"
      },
      {
        "q": "A block of metal of mass 0.2 kg absorbs 1800 J of heat and its temperature rises by 20°C. Specific heat capacity is:",
        "o": [
          "180 J/kg/K",
          "450 J/kg/K",
          "900 J/kg/K",
          "1800 J/kg/K"
        ],
        "a": 1,
        "e": "c = Q/(mΔθ) = 1800/(0.2×20) = 1800/4 = 450 J/kg/K.",
        "h": "c = Q/(mΔθ) = 1800/(0.2×20) = 450 J/kg/K.",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Particulate Nature of Matter",
    "topicCode": "SS1-PHY-12",
    "module": "Properties of Matter",
    "term": "Second Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  Everything around us — the air, water, rocks, food, and our own bodies — is made up of incredibly tiny particles: <span class=\"learn-keyword\">atoms</span> and <span class=\"learn-keyword\">molecules</span>. The <span class=\"learn-keyword\">particulate (kinetic molecular) theory of matter</span> explains the properties and behaviour of solids, liquids, and gases in terms of the motion and arrangement of these particles. This theory provides the microscopic explanation for macroscopic phenomena like pressure, diffusion, Brownian motion, and the three states of matter.\n</div>\n\n<h3 class=\"learn-subheading\">1. The Kinetic Molecular Theory</h3>\n<p class=\"learn-p\">Key assumptions of the kinetic molecular theory:</p>\n<ol class=\"learn-list learn-ordered\">\n  <li>All matter is made up of a large number of very small particles (atoms or molecules).</li>\n  <li>These particles are in continuous random motion.</li>\n  <li>The particles exert forces (intermolecular forces) on each other — attractive and repulsive.</li>\n  <li>Kinetic energy of particles increases with temperature.</li>\n  <li>No energy is lost in collisions between particles (elastic collisions in ideal gas).</li>\n</ol>\n\n<h3 class=\"learn-subheading\">2. States of Matter</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Property</th><th>Solid</th><th>Liquid</th><th>Gas</th></tr></thead>\n    <tbody>\n      <tr><td>Particle arrangement</td><td>Regular, close-packed lattice</td><td>Random, close-packed</td><td>Random, far apart</td></tr>\n      <tr><td>Particle motion</td><td>Vibrate about fixed positions</td><td>Vibrate and translate slowly</td><td>Move rapidly and randomly</td></tr>\n      <tr><td>Intermolecular forces</td><td>Very strong</td><td>Moderate</td><td>Very weak (negligible)</td></tr>\n      <tr><td>Shape</td><td>Fixed</td><td>Takes shape of container</td><td>Fills entire container</td></tr>\n      <tr><td>Volume</td><td>Fixed</td><td>Fixed</td><td>Fills container volume</td></tr>\n      <tr><td>Compressibility</td><td>Almost incompressible</td><td>Almost incompressible</td><td>Highly compressible</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">3. Brownian Motion</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Brownian motion</span> is the random, irregular motion of small visible particles suspended in a fluid (liquid or gas), caused by continuous bombardment by the invisible molecules of the fluid.</p>\n<p class=\"learn-p\"><strong>Evidence from experiment:</strong></p>\n<ul class=\"learn-list\">\n  <li>Robert Brown (1827) observed pollen grains zigzagging randomly in water under a microscope.</li>\n  <li>Smoke particles (from a burning match or incense stick) appear to dance randomly when observed under a microscope — they are bombarded by fast-moving air molecules.</li>\n  <li>The smoke cell experiment: a glass cell containing smoke is illuminated and viewed through a microscope — bright specks of smoke particles are seen moving in random, jerky paths.</li>\n</ul>\n<p class=\"learn-p\"><strong>Significance:</strong> Brownian motion provides direct experimental evidence for:</p>\n<ul class=\"learn-list\">\n  <li>The existence of atoms and molecules.</li>\n  <li>The random continuous motion of particles.</li>\n  <li>The kinetic molecular theory of matter.</li>\n</ul>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Brownian Motion and States of Matter</text>\n    <!-- Brownian motion diagram -->\n    <rect x=\"10\" y=\"28\" width=\"200\" height=\"155\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <text x=\"110\" y=\"48\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\" font-weight=\"bold\">Brownian Motion</text>\n    <text x=\"110\" y=\"62\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">(smoke cell experiment)</text>\n    <!-- Random walk path -->\n    <path d=\"M110,170 L100,155 L120,140 L95,125 L115,110 L90,95 L115,80 L100,70\" stroke=\"#FFC53D\" stroke-width=\"2\" fill=\"none\" stroke-dasharray=\"4,2\"/>\n    <!-- Small molecules -->\n    <circle cx=\"70\" cy=\"120\" r=\"2.5\" fill=\"#28c840\" opacity=\"0.6\"/>\n    <circle cx=\"85\" cy=\"100\" r=\"2.5\" fill=\"#28c840\" opacity=\"0.6\"/>\n    <circle cx=\"140\" cy=\"115\" r=\"2.5\" fill=\"#28c840\" opacity=\"0.6\"/>\n    <circle cx=\"155\" cy=\"90\" r=\"2.5\" fill=\"#28c840\" opacity=\"0.6\"/>\n    <circle cx=\"75\" cy=\"140\" r=\"2.5\" fill=\"#28c840\" opacity=\"0.6\"/>\n    <circle cx=\"145\" cy=\"145\" r=\"2.5\" fill=\"#28c840\" opacity=\"0.6\"/>\n    <circle cx=\"130\" cy=\"170\" r=\"2.5\" fill=\"#28c840\" opacity=\"0.6\"/>\n    <!-- Large smoke particle -->\n    <circle cx=\"110\" cy=\"130\" r=\"7\" fill=\"#FFC53D\" opacity=\"0.8\"/>\n    <text x=\"110\" y=\"190\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">Smoke particle (large, visible)</text>\n    <text x=\"110\" y=\"180\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">Air molecules (tiny, invisible)</text>\n    <!-- States diagram -->\n    <rect x=\"225\" y=\"28\" width=\"245\" height=\"155\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#28c840\" stroke-width=\"1.5\"/>\n    <text x=\"348\" y=\"48\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\" font-weight=\"bold\">Three States of Matter</text>\n    <!-- Solid -->\n    <text x=\"270\" y=\"65\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"8\">SOLID</text>\n    <circle cx=\"252\" cy=\"80\" r=\"4\" fill=\"#FFC53D\"/>\n    <circle cx=\"265\" cy=\"80\" r=\"4\" fill=\"#FFC53D\"/>\n    <circle cx=\"278\" cy=\"80\" r=\"4\" fill=\"#FFC53D\"/>\n    <circle cx=\"252\" cy=\"93\" r=\"4\" fill=\"#FFC53D\"/>\n    <circle cx=\"265\" cy=\"93\" r=\"4\" fill=\"#FFC53D\"/>\n    <circle cx=\"278\" cy=\"93\" r=\"4\" fill=\"#FFC53D\"/>\n    <!-- Liquid -->\n    <text x=\"345\" y=\"65\" text-anchor=\"middle\" fill=\"#5eb4ff\" font-size=\"8\">LIQUID</text>\n    <circle cx=\"320\" cy=\"80\" r=\"4\" fill=\"#5eb4ff\"/>\n    <circle cx=\"333\" cy=\"75\" r=\"4\" fill=\"#5eb4ff\"/>\n    <circle cx=\"346\" cy=\"83\" r=\"4\" fill=\"#5eb4ff\"/>\n    <circle cx=\"320\" cy=\"90\" r=\"4\" fill=\"#5eb4ff\"/>\n    <circle cx=\"336\" cy=\"94\" r=\"4\" fill=\"#5eb4ff\"/>\n    <circle cx=\"349\" cy=\"78\" r=\"4\" fill=\"#5eb4ff\"/>\n    <!-- Gas -->\n    <text x=\"422\" y=\"65\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"8\">GAS</text>\n    <circle cx=\"395\" cy=\"75\" r=\"4\" fill=\"#28c840\"/>\n    <circle cx=\"430\" cy=\"90\" r=\"4\" fill=\"#28c840\"/>\n    <circle cx=\"410\" cy=\"110\" r=\"4\" fill=\"#28c840\"/>\n    <circle cx=\"445\" cy=\"75\" r=\"4\" fill=\"#28c840\"/>\n    <circle cx=\"400\" cy=\"130\" r=\"4\" fill=\"#28c840\"/>\n    <text x=\"270\" y=\"115\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">Fixed lattice</text>\n    <text x=\"345\" y=\"115\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">Random, close</text>\n    <text x=\"422\" y=\"150\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">Random, far apart</text>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">4. Diffusion</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Diffusion</span> is the random mixing of particles of two substances due to their continuous random motion, with no overall pressure difference. Diffusion occurs because particles move randomly and spread from regions of high concentration to regions of low concentration.</p>\n<ul class=\"learn-list\">\n  <li><strong>Gaseous diffusion is faster than liquid diffusion</strong> because gas molecules move faster (lower intermolecular forces, lower density).</li>\n  <li><strong>Bromine vapour experiment:</strong> brown bromine gas diffuses to fill a jar of air — visible demonstration of diffusion.</li>\n  <li><strong>Graham's Law of Diffusion:</strong> Rate of diffusion ∝ 1/√(density or molecular mass). Lighter molecules diffuse faster.</li>\n  <li><strong>Examples in Nigeria:</strong> Smell of suya (grilled meat) spreading in a market; perfume spreading in a room; colour from a dye tablet spreading in water.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">5. Pressure in Gases</h3>\n<p class=\"learn-p\">Gas pressure is caused by the continuous bombardment of the container walls by rapidly moving gas molecules. Pressure increases when:</p>\n<ul class=\"learn-list\">\n  <li><strong>Temperature increases</strong> → molecules move faster → more frequent and harder collisions → higher pressure.</li>\n  <li><strong>Volume decreases</strong> (at constant temperature) → more frequent collisions with walls → higher pressure (Boyle's Law, covered in next topic).</li>\n  <li><strong>More gas is added</strong> → more molecules → more collisions → higher pressure.</li>\n</ul>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Brownian Motion:</strong> Key to describe correctly: \"(1) Smoke particles are large enough to be visible; (2) Air molecules are too small to see but move fast; (3) Air molecules randomly bombard the smoke particle from all directions; (4) At any instant, more molecules hit one side than the other; (5) This imbalance changes randomly → smoke particle moves randomly.\" Common error: saying the smoke particles are molecules — they are NOT molecules, they are large aggregates of carbon particles.\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Kinetic theory: matter = tiny particles in continuous random motion; KE increases with temperature. Solids: regular lattice, vibrate. Liquids: random, close, translate slowly. Gases: random, far apart, move fast. Brownian motion: random jerky motion of visible particles caused by invisible molecular bombardment — evidence for molecular theory. Diffusion: random spreading from high to low concentration; gases faster than liquids. Gas pressure: from molecular bombardment of container walls.\n</div>\n  ",
    "questions": [
      {
        "q": "Brownian motion is the:",
        "o": [
          "Regular circular motion of atoms in a crystal",
          "Random, jerky motion of visible particles caused by bombardment by invisible molecules",
          "Motion of molecules in a gas",
          "Vibration of atoms in a solid"
        ],
        "a": 1,
        "e": "Brownian motion refers to the random, irregular (zigzag) motion of visible particles (like smoke or pollen) suspended in a fluid, caused by the continuous uneven bombardment of these particles by the invisible molecules of the surrounding fluid.",
        "h": "Brownian motion = random jerky motion of large visible particles hit by invisible molecules.",
        "yr": "SS1"
      },
      {
        "q": "In which state of matter do particles move most rapidly and freely?",
        "o": [
          "Solid",
          "Liquid",
          "Gas",
          "All states equally"
        ],
        "a": 2,
        "e": "Gas particles have the most kinetic energy and move most rapidly and freely, with very weak intermolecular forces and large spaces between particles. Solid particles only vibrate about fixed positions.",
        "h": "Fastest particle motion: gas (most KE, weakest intermolecular forces).",
        "yr": "SS1"
      },
      {
        "q": "Diffusion occurs because:",
        "o": [
          "Gravity pulls particles downward",
          "Particles move randomly from regions of high to low concentration",
          "Only gases can move in a container",
          "External pressure drives particles"
        ],
        "a": 1,
        "e": "Diffusion is the net movement of particles from regions of HIGH concentration to regions of LOW concentration, driven by the random thermal motion of particles. It continues until uniform concentration is achieved.",
        "h": "Diffusion: random motion → particles spread from high to low concentration.",
        "yr": "SS1"
      },
      {
        "q": "Gaseous diffusion is faster than liquid diffusion because:",
        "o": [
          "Gas molecules are lighter",
          "Gas molecules move faster due to weaker intermolecular forces and larger separation",
          "Gas has no gravity effect",
          "Liquid molecules are too large to diffuse"
        ],
        "a": 1,
        "e": "Gas molecules experience very weak intermolecular forces and have much larger separation, so they move much faster than liquid molecules. Higher speed → faster diffusion. Also, gases have no 'neighbours' to impede movement.",
        "h": "Gases: weaker forces, larger separation, faster molecules → faster diffusion.",
        "yr": "SS1"
      },
      {
        "q": "The kinetic molecular theory states that temperature is related to:",
        "o": [
          "The mass of particles",
          "The total kinetic energy of all particles",
          "The average kinetic energy of the particles",
          "The potential energy of the particles"
        ],
        "a": 2,
        "e": "Temperature is proportional to the AVERAGE kinetic energy of the particles of a substance. As temperature rises, average KE increases (particles move faster on average). Total KE depends on both temperature and the number of particles (mass).",
        "h": "Temperature ∝ average KE of particles (not total KE).",
        "yr": "SS1"
      },
      {
        "q": "In the smoke cell experiment demonstrating Brownian motion, what is observed?",
        "o": [
          "Smoke particles moving in regular patterns",
          "Tiny air molecules visible through the microscope",
          "Bright speck-like smoke particles moving in random, jerky paths",
          "Smoke particles settling gradually to the bottom"
        ],
        "a": 2,
        "e": "In the smoke cell experiment, smoke particles (large enough to reflect light) appear as bright specks moving in random, erratic (zigzag) paths when viewed through a microscope. This is because fast-moving air molecules bombard them randomly.",
        "h": "Smoke cell: bright smoke specks visible, moving in random jerky (zigzag) paths.",
        "yr": "SS1"
      },
      {
        "q": "Which provides direct evidence for the existence of molecules?",
        "o": [
          "The colour of a substance",
          "Brownian motion",
          "The weight of a substance",
          "The shape of a crystal"
        ],
        "a": 1,
        "e": "Brownian motion provides direct experimental evidence for molecular existence: the random bombardment of visible particles by invisible molecules is the only explanation for the random erratic motion observed. Without molecules, there would be no agent causing this motion.",
        "h": "Brownian motion = direct evidence for existence and random motion of molecules.",
        "yr": "SS1"
      },
      {
        "q": "Gas pressure increases when the container volume decreases (at constant temperature) because:",
        "o": [
          "Gas molecules become heavier",
          "Gas molecules collide with walls more frequently",
          "Temperature automatically increases",
          "The gas absorbs heat from the walls"
        ],
        "a": 1,
        "e": "When volume decreases with constant temperature, the same number of molecules must travel less distance before hitting the walls — so they collide with the walls more frequently. More frequent collisions per unit area → higher pressure.",
        "h": "Smaller volume → more frequent wall collisions → higher pressure.",
        "yr": "SS1"
      },
      {
        "q": "In a solid, the particles:",
        "o": [
          "Move rapidly and randomly throughout the material",
          "Are fixed in position and do not move at all",
          "Vibrate about fixed positions within a regular lattice structure",
          "Are far apart with negligible interactions"
        ],
        "a": 2,
        "e": "Solid particles are held in fixed positions within a regular lattice by strong intermolecular forces. They can vibrate (oscillate) about their fixed positions but cannot translate freely. This gives solids their fixed shape and volume.",
        "h": "Solids: vibrate about fixed lattice positions. Strong intermolecular forces.",
        "yr": "SS1"
      },
      {
        "q": "According to Graham's Law, which gas diffuses faster: oxygen (M=32) or hydrogen (M=2)?",
        "o": [
          "Oxygen (M=32), because it's heavier",
          "Hydrogen (M=2), because it's lighter",
          "Both diffuse at the same rate",
          "Depends on temperature only"
        ],
        "a": 1,
        "e": "Graham's Law: rate of diffusion ∝ 1/√M. Hydrogen (M=2): rate ∝ 1/√2. Oxygen (M=32): rate ∝ 1/√32. Ratio: H₂/O₂ = √(32/2) = √16 = 4. Hydrogen diffuses 4 times faster than oxygen.",
        "h": "Graham's Law: lighter gas (smaller M) diffuses faster. H₂ faster than O₂.",
        "yr": "SS1"
      },
      {
        "q": "The smell of suya (grilled meat) spreading across a market in Lagos is an example of:",
        "o": [
          "Brownian motion",
          "Diffusion of gases",
          "Convection",
          "Radiation of smell particles"
        ],
        "a": 1,
        "e": "The smell of suya spreads by diffusion — volatile smell molecules randomly move from the high concentration near the grill to regions of lower concentration throughout the market. Wind also aids this (convection), but the fundamental spreading mechanism is diffusion.",
        "h": "Smell spreading = diffusion of gaseous molecules from high to low concentration.",
        "yr": "SS1"
      },
      {
        "q": "Intermolecular forces in a liquid compared to a solid are:",
        "o": [
          "Much stronger",
          "About the same strength",
          "Moderate (weaker than solid, stronger than gas)",
          "Non-existent"
        ],
        "a": 2,
        "e": "In a liquid: intermolecular forces are moderate — stronger than in gases (molecules are still close together) but weaker than in solids (molecules can slide past each other). This explains why liquids flow and take the shape of their container.",
        "h": "Intermolecular forces: solid (strong) > liquid (moderate) > gas (very weak).",
        "yr": "SS1"
      },
      {
        "q": "Why does a gas exert pressure on the walls of its container?",
        "o": [
          "Due to the weight of the gas",
          "Due to continuous random bombardment of the walls by gas molecules",
          "Because gases are always expanding",
          "Due to electrical attraction between gas and container"
        ],
        "a": 1,
        "e": "Gas pressure results from the continuous, random bombardment of container walls by gas molecules. Each collision exerts a tiny force on the wall, and the total force per unit area is the gas pressure.",
        "h": "Gas pressure = force per area from continuous molecular bombardment of walls.",
        "yr": "SS1"
      },
      {
        "q": "The liquid state of matter differs from the gaseous state because liquids:",
        "o": [
          "Have no definite shape",
          "Have a definite volume but no definite shape",
          "Have both definite shape and volume",
          "Are incompressible only"
        ],
        "a": 1,
        "e": "Liquids have a definite volume (intermolecular forces prevent them from expanding indefinitely) but no fixed shape (molecules can flow, so they take the shape of the container). Gases have neither definite shape nor definite volume.",
        "h": "Liquid: definite volume, no definite shape. Gas: neither definite shape nor volume.",
        "yr": "SS1"
      },
      {
        "q": "What effect does increasing temperature have on the Brownian motion of smoke particles?",
        "o": [
          "Particles slow down and become less random",
          "Particles become visible without a microscope",
          "Particles show more vigorous and rapid random motion",
          "Temperature has no effect on Brownian motion"
        ],
        "a": 2,
        "e": "Higher temperature → air molecules have higher average KE → move faster → collide with smoke particles more forcefully and frequently → smoke particles exhibit MORE vigorous, rapid, random motion. Brownian motion increases with temperature.",
        "h": "Higher temperature → faster air molecules → more vigorous Brownian motion.",
        "yr": "SS1"
      },
      {
        "q": "In which change of state does a substance absorb energy while temperature remains constant?",
        "o": [
          "Condensation (gas → liquid)",
          "Freezing (liquid → solid)",
          "Melting (solid → liquid)",
          "Cooling (liquid losing heat)"
        ],
        "a": 2,
        "e": "Melting is an endothermic (heat-absorbing) phase change where solid converts to liquid at constant temperature. The heat absorbed (latent heat of fusion) breaks intermolecular bonds without raising temperature.",
        "h": "Melting: absorbs heat (latent heat of fusion) at constant temperature.",
        "yr": "SS1"
      },
      {
        "q": "Robert Brown's original observation of Brownian motion used:",
        "o": [
          "Smoke particles in air",
          "Pollen grains suspended in water",
          "Bromine vapour in air",
          "Carbon particles in oil"
        ],
        "a": 1,
        "e": "Robert Brown (1827) observed pollen grains (from flowers) suspended in water randomly jerking about under a microscope. He initially thought the pollen grains were 'alive,' but later discovered the motion occurred with any small particles and was not biological.",
        "h": "Robert Brown (1827): pollen grains in water → first observation of Brownian motion.",
        "yr": "SS1"
      },
      {
        "q": "The kinetic energy of gas molecules is directly proportional to:",
        "o": [
          "Pressure",
          "Volume",
          "Absolute temperature (in kelvin)",
          "Mass of individual molecules"
        ],
        "a": 2,
        "e": "From the kinetic theory of gases: average KE per molecule = (3/2)kT, where k is Boltzmann's constant and T is absolute temperature in kelvin. KE is directly proportional to absolute temperature. This is why the Kelvin scale (not Celsius) must be used in gas law calculations.",
        "h": "KE of gas molecules ∝ absolute temperature T (in kelvin).",
        "yr": "SS1"
      },
      {
        "q": "The smell of food cooking spreads throughout a room. This is evidence of:",
        "o": [
          "Convection of hot air",
          "Diffusion of volatile molecules",
          "Radiation of heat",
          "Brownian motion only"
        ],
        "a": 1,
        "e": "The smell spreads by diffusion — volatile molecules from the food randomly move from the high concentration near the cooking source to regions of lower concentration throughout the room. This is direct evidence of the random motion of molecules.",
        "h": "Smell spreading = diffusion of volatile molecules through random thermal motion.",
        "yr": "SS1"
      },
      {
        "q": "At absolute zero, the kinetic energy of gas molecules is:",
        "o": [
          "Maximum",
          "Average",
          "Zero (minimum possible)",
          "Equal to 1 J"
        ],
        "a": 2,
        "e": "At absolute zero (0 K = −273°C), the kinetic theory predicts that all molecular thermal motion ceases — average KE = 0 (minimum possible). In practice, quantum mechanics shows a small residual 'zero-point energy' remains, but classical physics gives KE = 0.",
        "h": "Absolute zero (0 K): kinetic energy = 0 (minimum — no thermal motion).",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Fluids at Rest and in Motion",
    "topicCode": "SS1-PHY-13",
    "module": "Properties of Matter",
    "term": "Third Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Fluids</span> — liquids and gases — are substances that flow and take the shape of their containers. The study of fluids at rest is <span class=\"learn-keyword\">hydrostatics</span>, while fluids in motion is <span class=\"learn-keyword\">hydrodynamics</span>. These principles govern water supply systems in Nigerian cities, oil pipeline pressure, dam construction, ship design, aeroplane flight, and blood flow in the human body.\n</div>\n\n<h3 class=\"learn-subheading\">1. Pressure in Fluids</h3>\n<p class=\"learn-p\">Pressure at a depth h in a fluid of density ρ:</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>P = hρg</strong></p>\n<p class=\"learn-p\">where h = depth (m), ρ = density of fluid (kg/m³), g = gravitational field strength (m/s²).</p>\n<p class=\"learn-p\"><strong>Key properties of fluid pressure:</strong></p>\n<ul class=\"learn-list\">\n  <li>Pressure increases with depth (deeper → higher pressure).</li>\n  <li>Pressure acts equally in all directions at any point (isotropic).</li>\n  <li>Pressure depends on depth and fluid density, NOT on the shape of the container (hydrostatic paradox).</li>\n  <li>Pressure is transmitted equally throughout a fluid (Pascal's principle).</li>\n</ul>\n\n<h3 class=\"learn-subheading\">2. Pascal's Principle</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Pascal's Principle</span>: \"Pressure applied to an enclosed fluid is transmitted equally and undiminished to every part of the fluid and to the walls of the container.\"</p>\n<p class=\"learn-p\">Application — <span class=\"learn-keyword\">Hydraulic press/lift</span>:</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>P = F₁/A₁ = F₂/A₂ → F₂ = F₁ × (A₂/A₁)</strong></p>\n<p class=\"learn-p\"><strong>Example:</strong> A hydraulic press has piston areas A₁ = 5 cm² and A₂ = 200 cm². An effort of 100 N on the small piston produces a force of 100 × (200/5) = 4000 N on the large piston. Used in: car hydraulic brakes, car lifts in mechanics workshops, hydraulic jacks.</p>\n\n<h3 class=\"learn-subheading\">3. Archimedes' Principle</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Archimedes' Principle</span>: \"When a body is wholly or partially immersed in a fluid, it experiences an upthrust (buoyant force) equal to the weight of the fluid displaced.\"</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>Upthrust = Weight of fluid displaced = ρ_fluid × V_submerged × g</strong></p>\n<ul class=\"learn-list\">\n  <li><strong>Floatation condition:</strong> A body floats when upthrust = weight. This means: weight of object = weight of fluid displaced → volume of fluid displaced = volume of body × (density of object / density of fluid).</li>\n  <li><strong>For a floating body:</strong> density of object = density of fluid × (fraction submerged). If ρ_object < ρ_fluid, object floats; if ρ_object > ρ_fluid, object sinks.</li>\n</ul>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Archimedes' Principle and Pascal's Law</text>\n    <!-- Archimedes' diagram -->\n    <rect x=\"20\" y=\"40\" width=\"180\" height=\"140\" rx=\"5\" fill=\"#0a1f3a\" stroke=\"#5eb4ff\" stroke-width=\"2\"/>\n    <text x=\"110\" y=\"58\" text-anchor=\"middle\" fill=\"#5eb4ff\" font-size=\"8\">Water (ρ = 1000 kg/m³)</text>\n    <rect x=\"60\" y=\"70\" width=\"80\" height=\"60\" rx=\"4\" fill=\"#FFC53D\" opacity=\"0.8\"/>\n    <text x=\"100\" y=\"103\" text-anchor=\"middle\" fill=\"#0f0020\" font-size=\"8\" font-weight=\"bold\">Object</text>\n    <!-- Arrows -->\n    <line x1=\"100\" y1=\"65\" x2=\"100\" y2=\"45\" stroke=\"#ff9500\" stroke-width=\"2.5\"/>\n    <polygon points=\"96,48 100,40 104,48\" fill=\"#ff9500\"/>\n    <text x=\"115\" y=\"48\" fill=\"#ff9500\" font-size=\"7\">Upthrust</text>\n    <line x1=\"100\" y1=\"135\" x2=\"100\" y2=\"155\" stroke=\"#ff5f57\" stroke-width=\"2.5\"/>\n    <polygon points=\"96,152 100,160 104,152\" fill=\"#ff5f57\"/>\n    <text x=\"115\" y=\"158\" fill=\"#ff5f57\" font-size=\"7\">Weight (W)</text>\n    <text x=\"110\" y=\"185\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">U = ρ_fluid × V_sub × g</text>\n    <!-- Pascal's diagram -->\n    <text x=\"360\" y=\"38\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\" font-weight=\"bold\">Hydraulic Press</text>\n    <rect x=\"270\" y=\"100\" width=\"40\" height=\"60\" rx=\"3\" fill=\"#0a3a1a\" stroke=\"#28c840\" stroke-width=\"1.5\"/>\n    <rect x=\"350\" y=\"60\" width=\"90\" height=\"100\" rx=\"3\" fill=\"#0a3a1a\" stroke=\"#28c840\" stroke-width=\"1.5\"/>\n    <line x1=\"270\" y1=\"130\" x2=\"350\" y2=\"130\" stroke=\"#5eb4ff\" stroke-width=\"5\"/>\n    <line x1=\"310\" y1=\"100\" x2=\"310\" y2=\"140\" stroke=\"#7C3AED\" stroke-width=\"2\"/>\n    <rect x=\"275\" y=\"95\" width=\"30\" height=\"8\" rx=\"2\" fill=\"#FFC53D\"/>\n    <rect x=\"355\" y=\"95\" width=\"80\" height=\"8\" rx=\"2\" fill=\"#FFC53D\"/>\n    <line x1=\"290\" y1=\"70\" x2=\"290\" y2=\"95\" stroke=\"#ff9500\" stroke-width=\"2\"/>\n    <polygon points=\"286,75 290,68 294,75\" fill=\"#ff9500\"/>\n    <text x=\"277\" y=\"65\" fill=\"#ff9500\" font-size=\"7\">F₁ (small)</text>\n    <line x1=\"395\" y1=\"55\" x2=\"395\" y2=\"95\" stroke=\"#28c840\" stroke-width=\"4\"/>\n    <polygon points=\"391,60 395,53 399,60\" fill=\"#28c840\"/>\n    <text x=\"425\" y=\"75\" fill=\"#28c840\" font-size=\"7\">F₂ (large)</text>\n    <text x=\"290\" y=\"178\" fill=\"#9090b0\" font-size=\"7\">A₁ small</text>\n    <text x=\"395\" y=\"178\" fill=\"#9090b0\" font-size=\"7\">A₂ large</text>\n    <text x=\"360\" y=\"192\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">F₂/F₁ = A₂/A₁ (Pascal's Law)</text>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">4. Law of Floatation</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">law of floatation</span>: \"A floating body displaces its own weight of fluid.\"</p>\n<ul class=\"learn-list\">\n  <li>A ship floats because its large hollow hull displaces a weight of water equal to the total weight of the ship.</li>\n  <li>An object with density less than water floats (wood ≈ 500 kg/m³ < water 1000 kg/m³).</li>\n  <li>An object with density greater than water sinks (iron ≈ 7900 kg/m³ > water 1000 kg/m³).</li>\n  <li>An iron ship floats because the effective density of the hull + air is less than water.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">5. Atmospheric Pressure</h3>\n<p class=\"learn-p\">The atmosphere exerts pressure on everything at Earth's surface. Standard atmospheric pressure = 101,325 Pa ≈ 1 atm = 760 mmHg = 1.013 × 10⁵ Pa.</p>\n<p class=\"learn-p\"><strong>Instruments for measuring atmospheric pressure:</strong></p>\n<ul class=\"learn-list\">\n  <li><strong>Mercury barometer:</strong> A tube of mercury inverted in a mercury trough. Height of mercury column ≈ 760 mm at sea level. P = hρg = 0.76 × 13,600 × 10 ≈ 101,360 Pa.</li>\n  <li><strong>Aneroid barometer:</strong> Uses a sealed, partially evacuated metal capsule that deforms with pressure changes. More portable than mercury barometer.</li>\n</ul>\n<p class=\"learn-p\">Atmospheric pressure decreases with altitude — at the top of Chappal Waddi (Nigeria's highest peak, 2419 m), pressure is significantly lower than at Lagos coastline.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Archimedes and Floatation:</strong> For a floating object: Upthrust = Weight, so Weight of fluid displaced = Weight of object. The fraction submerged = ρ_object / ρ_fluid. Example: ice (ρ = 917 kg/m³) floating in water (ρ = 1000 kg/m³): fraction submerged = 917/1000 = 0.917 = 91.7% submerged. This is why icebergs are mostly underwater (and why the Titanic sank).\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Fluid pressure P = hρg (depends on depth, density, g). Pressure acts in all directions equally. Pascal's principle: pressure transmitted equally in enclosed fluid. Hydraulic press: F₂ = F₁ × A₂/A₁. Archimedes: upthrust = weight of fluid displaced. Float: ρ_object < ρ_fluid; Sink: ρ_object > ρ_fluid. Law of floatation: floating body displaces its own weight of fluid. Atmospheric pressure ≈ 101,325 Pa, measured by barometers.\n</div>\n  ",
    "questions": [
      {
        "q": "The pressure at a depth of 5 m in water (density 1000 kg/m³, g = 10 m/s²) is:",
        "o": [
          "5000 Pa",
          "50,000 Pa",
          "500 Pa",
          "5 Pa"
        ],
        "a": 1,
        "e": "P = hρg = 5 × 1000 × 10 = 50,000 Pa = 50 kPa.",
        "h": "P = hρg = 5 × 1000 × 10 = 50,000 Pa.",
        "yr": "SS1"
      },
      {
        "q": "Pascal's Principle states that pressure applied to an enclosed fluid:",
        "o": [
          "Decreases with depth",
          "Is transmitted equally throughout the fluid",
          "Only acts downward",
          "Depends on the shape of the container"
        ],
        "a": 1,
        "e": "Pascal's Principle: pressure applied to an enclosed fluid is transmitted equally and undiminished to every point in the fluid and to the walls of the container. This is the basis of hydraulic machines.",
        "h": "Pascal's Principle: pressure transmitted equally throughout enclosed fluid.",
        "yr": "SS1"
      },
      {
        "q": "A hydraulic press has pistons of area 10 cm² and 500 cm². An effort of 200 N on the small piston produces a load of:",
        "o": [
          "4 N",
          "10,000 N",
          "500 N",
          "2000 N"
        ],
        "a": 1,
        "e": "F₂ = F₁ × A₂/A₁ = 200 × (500/10) = 200 × 50 = 10,000 N.",
        "h": "F₂ = F₁ × A₂/A₁ = 200 × 50 = 10,000 N.",
        "yr": "SS1"
      },
      {
        "q": "Archimedes' Principle states that the upthrust on a submerged object equals:",
        "o": [
          "The weight of the object",
          "The weight of the fluid displaced by the object",
          "The pressure at the depth of the object",
          "The density of the fluid"
        ],
        "a": 1,
        "e": "Archimedes' Principle: 'When a body is immersed in a fluid, it experiences an upthrust equal to the weight of the fluid it displaces.' Upthrust = ρ_fluid × V_submerged × g.",
        "h": "Upthrust = weight of fluid displaced (Archimedes' Principle).",
        "yr": "SS1"
      },
      {
        "q": "An object of mass 5 kg and volume 0.001 m³ is fully submerged in water (ρ = 1000 kg/m³, g = 10 m/s²). The upthrust is:",
        "o": [
          "5 N",
          "10 N",
          "50 N",
          "100 N"
        ],
        "a": 1,
        "e": "Upthrust = ρ_fluid × V × g = 1000 × 0.001 × 10 = 10 N.",
        "h": "Upthrust = ρ_fluid × V_submerged × g = 1000 × 0.001 × 10 = 10 N.",
        "yr": "SS1"
      },
      {
        "q": "An object will FLOAT in a fluid when:",
        "o": [
          "Its mass equals the mass of the fluid",
          "Its density is greater than the fluid's density",
          "Its weight equals the upthrust (density ≤ fluid density)",
          "The fluid is water"
        ],
        "a": 2,
        "e": "An object floats when upthrust = weight, which occurs when the object's density ≤ fluid density. If ρ_object < ρ_fluid, the object can displace its own weight of fluid without being fully submerged, so it floats partially above the surface.",
        "h": "Object floats when weight = upthrust → ρ_object ≤ ρ_fluid.",
        "yr": "SS1"
      },
      {
        "q": "The law of floatation states:",
        "o": [
          "All objects float in water",
          "A floating body displaces its own WEIGHT of fluid",
          "A floating body displaces its own VOLUME of fluid",
          "Upthrust equals the mass of the floating body"
        ],
        "a": 1,
        "e": "Law of floatation: a floating body displaces a volume of fluid whose WEIGHT equals the weight of the floating body. This is a specific application of Archimedes' principle for floating bodies.",
        "h": "Law of floatation: floating body displaces fluid equal to its own WEIGHT.",
        "yr": "SS1"
      },
      {
        "q": "A piece of wood with density 600 kg/m³ floats in water (1000 kg/m³). The fraction of wood submerged is:",
        "o": [
          "0.4 (40%)",
          "0.6 (60%)",
          "0.1 (10%)",
          "All of it (100%)"
        ],
        "a": 1,
        "e": "Fraction submerged = ρ_object/ρ_fluid = 600/1000 = 0.6 = 60%. 60% of the wood is below water, 40% above.",
        "h": "Fraction submerged = ρ_object / ρ_fluid = 600/1000 = 0.6.",
        "yr": "SS1"
      },
      {
        "q": "Standard atmospheric pressure at sea level is approximately:",
        "o": [
          "101.3 Pa",
          "10,130 Pa",
          "101,325 Pa",
          "1,013,250 Pa"
        ],
        "a": 2,
        "e": "Standard atmospheric pressure = 1 atm = 101,325 Pa ≈ 1.013 × 10⁵ Pa = 760 mmHg. This supports a column of mercury 760 mm (76 cm) high.",
        "h": "Standard atmospheric pressure ≈ 101,325 Pa ≈ 760 mmHg.",
        "yr": "SS1"
      },
      {
        "q": "In a mercury barometer, the height of mercury column at sea level is approximately:",
        "o": [
          "76 mm",
          "760 mm",
          "7600 mm",
          "76 cm (= 760 mm)"
        ],
        "a": 3,
        "e": "The mercury barometer shows 760 mm = 76 cm of mercury at standard atmospheric pressure. Both options B (760 mm) and D (76 cm = 760 mm) are equivalent. Select D = 76 cm = 760 mm as the standard way it's expressed.",
        "h": "Mercury barometer: ≈ 760 mm = 76 cm at standard atmospheric pressure.",
        "yr": "SS1"
      },
      {
        "q": "Pressure in a fluid at a given depth does NOT depend on:",
        "o": [
          "Depth of the fluid",
          "Density of the fluid",
          "Gravitational field strength",
          "Shape of the container"
        ],
        "a": 3,
        "e": "P = hρg — pressure depends on depth (h), density (ρ), and g. It does NOT depend on the shape of the container or the total amount of fluid (hydrostatic paradox). Pressure at the same depth is the same regardless of container shape.",
        "h": "P = hρg: depends on h, ρ, g. NOT on container shape (hydrostatic paradox).",
        "yr": "SS1"
      },
      {
        "q": "An iron block (ρ = 7900 kg/m³) sinks in water (ρ = 1000 kg/m³) because:",
        "o": [
          "Iron is magnetic",
          "Iron's density is greater than water's density",
          "Iron is too heavy to float",
          "Iron repels water"
        ],
        "a": 1,
        "e": "An object sinks when its density > fluid density. Iron (7900 kg/m³) > water (1000 kg/m³), so iron sinks. An iron ship floats because the hollow hull (containing air) makes the effective average density of the ship < water.",
        "h": "Object sinks when ρ_object > ρ_fluid. Iron: 7900 > 1000 → sinks.",
        "yr": "SS1"
      },
      {
        "q": "Which instrument is used to measure atmospheric pressure?",
        "o": [
          "Manometer",
          "Thermometer",
          "Barometer",
          "Hydrometer"
        ],
        "a": 2,
        "e": "A barometer measures atmospheric pressure. Types: mercury barometer (glass tube of mercury inverted in a trough) and aneroid barometer (sealed metal capsule that deforms with pressure). A manometer measures gauge pressure. A hydrometer measures density of liquids.",
        "h": "Barometer = measures atmospheric pressure.",
        "yr": "SS1"
      },
      {
        "q": "The upthrust on a 200 cm³ object fully submerged in water (ρ = 1000 kg/m³, g = 10 m/s²) is:",
        "o": [
          "0.2 N",
          "2 N",
          "20 N",
          "200 N"
        ],
        "a": 1,
        "e": "V = 200 cm³ = 200 × 10⁻⁶ m³. Upthrust = ρVg = 1000 × 200 × 10⁻⁶ × 10 = 2 N.",
        "h": "Upthrust = ρVg = 1000 × 0.0002 × 10 = 2 N.",
        "yr": "SS1"
      },
      {
        "q": "Atmospheric pressure decreases with altitude because:",
        "o": [
          "Temperature increases with altitude",
          "The atmosphere is thinner at greater height — less air column above",
          "Wind removes air from higher altitudes",
          "Gravity is zero at high altitude"
        ],
        "a": 1,
        "e": "Atmospheric pressure at any height equals the weight of the air column above that height per unit area. At higher altitudes, there is less air above → less weight → lower pressure. At Chappal Waddi (Nigeria, 2419 m), pressure is noticeably lower than at Lagos.",
        "h": "Higher altitude = less air above = lower weight per area = lower pressure.",
        "yr": "SS1"
      },
      {
        "q": "Car hydraulic brakes use Pascal's Principle because:",
        "o": [
          "Brakes use oil which is a liquid",
          "Pressure applied at the brake pedal is transmitted equally to all brake pistons",
          "Hydraulics are more reliable than mechanical systems",
          "Oil is compressible"
        ],
        "a": 1,
        "e": "Car hydraulic brakes work by Pascal's Principle: pressure applied by the driver's foot on the brake pedal piston is transmitted equally through brake fluid to all four wheel cylinders, applying equal braking force to all wheels.",
        "h": "Hydraulic brakes: pedal pressure transmitted equally through fluid to all wheels.",
        "yr": "SS1"
      },
      {
        "q": "A ship can float even though it is made of steel because:",
        "o": [
          "Steel is lighter than water",
          "The hull is sealed and the ship's average density including enclosed air is less than water",
          "Sea water is denser than fresh water",
          "Ships use special anti-sinking material"
        ],
        "a": 1,
        "e": "A steel ship floats because its large hollow hull contains air, making the ship's AVERAGE density (total mass / total volume including hull + air) less than water density. The ship displaces water equal to its own weight before fully submerging.",
        "h": "Steel ship floats: hollow hull + air makes average density < water density.",
        "yr": "SS1"
      },
      {
        "q": "Ice (density 917 kg/m³) floating in water (density 1000 kg/m³): what fraction is above the water?",
        "o": [
          "91.7%",
          "8.3%",
          "50%",
          "9.17%"
        ],
        "a": 1,
        "e": "Fraction submerged = 917/1000 = 0.917 = 91.7%. So fraction above water = 1 − 0.917 = 0.083 = 8.3%. Only about 8-9% of an iceberg is visible above water.",
        "h": "Fraction above = 1 − (ρ_ice/ρ_water) = 1 − 0.917 = 0.083 = 8.3%.",
        "yr": "SS1"
      },
      {
        "q": "An object weighs 50 N in air and 35 N when fully submerged in water. The upthrust is:",
        "o": [
          "85 N",
          "35 N",
          "15 N",
          "50 N"
        ],
        "a": 2,
        "e": "Upthrust = Weight in air − Apparent weight in fluid = 50 − 35 = 15 N. This 15 N equals the weight of water displaced by the object.",
        "h": "Upthrust = weight in air − weight in fluid = 50 − 35 = 15 N.",
        "yr": "SS1"
      },
      {
        "q": "A diver at 10 m depth in sea water (ρ=1025 kg/m³, g=10 m/s²) experiences total pressure of:",
        "o": [
          "102,500 Pa",
          "203,825 Pa",
          "101,325 Pa + 102,500 Pa = 203,825 Pa",
          "Only 102,500 Pa"
        ],
        "a": 2,
        "e": "Total pressure = atmospheric + fluid pressure = 101,325 + hρg = 101,325 + 10×1025×10 = 101,325 + 102,500 = 203,825 Pa.",
        "h": "Total pressure = P_atm + hρg = 101,325 + 102,500 = 203,825 Pa.",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Gas Laws",
    "topicCode": "SS1-PHY-14",
    "module": "Properties of Matter",
    "term": "Third Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  The <span class=\"learn-keyword\">gas laws</span> describe the relationships between the pressure, volume, and temperature of a fixed mass of gas. These laws, derived from experimental observations in the 17th–19th centuries, are fundamental to understanding engines, refrigerators, weather patterns, and biological processes like breathing. They also form the foundation of the <span class=\"learn-keyword\">kinetic theory of gases</span>.\n</div>\n\n<h3 class=\"learn-subheading\">1. Boyle's Law (Pressure-Volume Relationship)</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Boyle's Law</span> (1662): \"At constant temperature, the pressure of a fixed mass of gas is inversely proportional to its volume.\"</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>P ∝ 1/V (at constant T) → PV = constant → P₁V₁ = P₂V₂</strong></p>\n<p class=\"learn-p\"><strong>Example:</strong> A gas at pressure 200 kPa and volume 3 L is compressed to volume 1 L at constant temperature. Find the new pressure.<br>\nP₁V₁ = P₂V₂ → 200 × 3 = P₂ × 1 → P₂ = 600 kPa</p>\n<p class=\"learn-p\"><strong>Graph:</strong> P vs V: hyperbola. P vs 1/V: straight line through origin.</p>\n\n<h3 class=\"learn-subheading\">2. Charles's Law (Volume-Temperature Relationship)</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Charles's Law</span> (1787): \"At constant pressure, the volume of a fixed mass of gas is directly proportional to its absolute temperature.\"</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>V ∝ T (at constant P) → V/T = constant → V₁/T₁ = V₂/T₂</strong></p>\n<p class=\"learn-p\"><em>Note: Temperature must be in KELVIN (K = °C + 273)</em></p>\n<p class=\"learn-p\"><strong>Example:</strong> A gas at 27°C has volume 4 L. Find volume at 127°C (constant pressure).<br>\nT₁ = 27 + 273 = 300 K; T₂ = 127 + 273 = 400 K<br>\nV₂ = V₁ × T₂/T₁ = 4 × (400/300) = 5.33 L</p>\n<p class=\"learn-p\"><strong>Graph:</strong> V vs T (Kelvin): straight line through absolute zero (origin at 0 K).</p>\n\n<h3 class=\"learn-subheading\">3. Pressure Law (Gay-Lussac's Law)</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">Pressure Law</span>: \"At constant volume, the pressure of a fixed mass of gas is directly proportional to its absolute temperature.\"</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>P ∝ T (at constant V) → P/T = constant → P₁/T₁ = P₂/T₂</strong></p>\n<p class=\"learn-p\"><strong>Example:</strong> A tyre has pressure 200 kPa at 27°C. After a long journey, temperature rises to 77°C. Find new pressure (constant volume).<br>\nT₁ = 300 K; T₂ = 350 K<br>\nP₂ = P₁ × T₂/T₁ = 200 × (350/300) = 233.3 kPa</p>\n\n<h3 class=\"learn-subheading\">4. The Combined (General) Gas Law</h3>\n<p class=\"learn-p\">Combining all three laws for a fixed mass of gas:</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>PV/T = constant → P₁V₁/T₁ = P₂V₂/T₂</strong></p>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Gas Laws — Graphical Representations</text>\n    <!-- Boyle's Law P vs V -->\n    <text x=\"80\" y=\"38\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\">Boyle's Law (P vs V)</text>\n    <line x1=\"25\" y1=\"170\" x2=\"150\" y2=\"170\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <line x1=\"25\" y1=\"45\" x2=\"25\" y2=\"172\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <text x=\"148\" y=\"178\" fill=\"#9090b0\" font-size=\"7\">V</text>\n    <text x=\"16\" y=\"42\" fill=\"#9090b0\" font-size=\"7\">P</text>\n    <path d=\"M30,55 Q60,90 90,130 Q110,155 145,168\" stroke=\"#FFC53D\" stroke-width=\"2.5\" fill=\"none\"/>\n    <text x=\"80\" y=\"188\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">PV = const (hyperbola)</text>\n    <!-- Charles's Law V vs T -->\n    <text x=\"240\" y=\"38\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\">Charles's Law (V vs T)</text>\n    <line x1=\"165\" y1=\"170\" x2=\"310\" y2=\"170\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <line x1=\"185\" y1=\"45\" x2=\"185\" y2=\"172\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <text x=\"308\" y=\"178\" fill=\"#9090b0\" font-size=\"7\">T(K)</text>\n    <text x=\"175\" y=\"42\" fill=\"#9090b0\" font-size=\"7\">V</text>\n    <line x1=\"185\" y1=\"170\" x2=\"305\" y2=\"60\" stroke=\"#28c840\" stroke-width=\"2.5\"/>\n    <text x=\"165\" y=\"170\" fill=\"#9090b0\" font-size=\"7\">0K</text>\n    <text x=\"240\" y=\"188\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">V/T = const (straight line)</text>\n    <!-- Pressure Law P vs T -->\n    <text x=\"405\" y=\"38\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\">Pressure Law (P vs T)</text>\n    <line x1=\"330\" y1=\"170\" x2=\"470\" y2=\"170\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <line x1=\"348\" y1=\"45\" x2=\"348\" y2=\"172\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <text x=\"468\" y=\"178\" fill=\"#9090b0\" font-size=\"7\">T(K)</text>\n    <text x=\"338\" y=\"42\" fill=\"#9090b0\" font-size=\"7\">P</text>\n    <line x1=\"348\" y1=\"170\" x2=\"465\" y2=\"65\" stroke=\"#ff5f57\" stroke-width=\"2.5\"/>\n    <text x=\"330\" y=\"170\" fill=\"#9090b0\" font-size=\"7\">0K</text>\n    <text x=\"405\" y=\"188\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">P/T = const (straight line)</text>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">5. Ideal Gas Equation</h3>\n<p class=\"learn-p\">For n moles of an ideal gas:</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>PV = nRT</strong></p>\n<p class=\"learn-p\">where R = universal gas constant = 8.314 J mol⁻¹ K⁻¹.</p>\n<p class=\"learn-p\">An <span class=\"learn-keyword\">ideal gas</span> is a theoretical model in which: (1) molecules have zero volume; (2) no intermolecular forces except during elastic collisions. Real gases behave like ideal gases at low pressures and high temperatures.</p>\n\n<h3 class=\"learn-subheading\">6. Absolute Zero</h3>\n<p class=\"learn-p\">Extrapolating Charles's and the Pressure Law graphs to zero volume or pressure gives the same intercept: <strong>−273°C = 0 K</strong> (absolute zero). This is the lowest possible temperature — all molecular motion would theoretically cease. In practice, absolute zero cannot be reached, only approached.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Always Convert to Kelvin:</strong> The single most common error in gas law problems is using Celsius instead of Kelvin. ALWAYS convert: T(K) = T(°C) + 273. Example: 27°C = 300 K (not 27 K!). Gas laws break down completely if you use Celsius — you might get a volume of zero at 0°C, which is wrong (gas still occupies volume at 0°C, just less than at higher temperatures).\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Boyle's Law: PV = constant (T constant). P₁V₁ = P₂V₂. Charles's Law: V/T = constant (P constant). V₁/T₁ = V₂/T₂. Pressure Law: P/T = constant (V constant). P₁/T₁ = P₂/T₂. Combined: P₁V₁/T₁ = P₂V₂/T₂. ALWAYS use Kelvin (T_K = T_°C + 273). Ideal gas: PV = nRT. Absolute zero = 0 K = −273°C.\n</div>\n  ",
    "questions": [
      {
        "q": "Boyle's Law states that at constant temperature:",
        "o": [
          "PV = nRT",
          "P/T = constant",
          "PV = constant",
          "V/T = constant"
        ],
        "a": 2,
        "e": "Boyle's Law: at constant temperature and fixed mass of gas, pressure × volume = constant (PV = k). Equivalently: P₁V₁ = P₂V₂. As pressure increases, volume decreases proportionally.",
        "h": "Boyle's Law: PV = constant (at constant T).",
        "yr": "SS1"
      },
      {
        "q": "A gas has pressure 300 kPa and volume 2 L. At constant temperature, if volume decreases to 0.5 L, the new pressure is:",
        "o": [
          "75 kPa",
          "150 kPa",
          "600 kPa",
          "1200 kPa"
        ],
        "a": 3,
        "e": "P₁V₁ = P₂V₂ → 300 × 2 = P₂ × 0.5 → P₂ = 600/0.5 = 1200 kPa.",
        "h": "P₁V₁ = P₂V₂ → P₂ = 300×2/0.5 = 1200 kPa.",
        "yr": "SS1"
      },
      {
        "q": "Charles's Law relates volume to temperature at constant pressure. The temperature must be expressed in:",
        "o": [
          "Celsius (°C)",
          "Fahrenheit (°F)",
          "Kelvin (K)",
          "Any temperature scale"
        ],
        "a": 2,
        "e": "Charles's Law: V/T = constant requires temperature in KELVIN (absolute temperature scale). Using Celsius gives wrong answers because 0°C is not the same as zero volume. T(K) = T(°C) + 273.",
        "h": "Gas laws require temperature in KELVIN (K = °C + 273).",
        "yr": "SS1"
      },
      {
        "q": "A gas at 27°C has volume 3 L. At 127°C (constant pressure), the volume is:",
        "o": [
          "4 L",
          "6 L",
          "1.5 L",
          "9 L"
        ],
        "a": 0,
        "e": "T₁ = 27+273 = 300 K. T₂ = 127+273 = 400 K. V₂ = V₁×T₂/T₁ = 3×(400/300) = 4 L.",
        "h": "V₁/T₁ = V₂/T₂ → V₂ = 3×400/300 = 4 L.",
        "yr": "SS1"
      },
      {
        "q": "The Pressure Law (Gay-Lussac's Law) states that at constant volume:",
        "o": [
          "PV = constant",
          "P/T = constant",
          "V/T = constant",
          "P × T = constant"
        ],
        "a": 1,
        "e": "Pressure Law: at constant volume, P/T = constant. So P₁/T₁ = P₂/T₂. Pressure increases proportionally with absolute temperature at constant volume.",
        "h": "Pressure Law: P/T = constant (at constant V). P₁/T₁ = P₂/T₂.",
        "yr": "SS1"
      },
      {
        "q": "A tyre has pressure 250 kPa at 17°C. After driving, temperature rises to 47°C (constant volume). New pressure:",
        "o": [
          "275.9 kPa",
          "294.1 kPa",
          "437.5 kPa",
          "250 kPa"
        ],
        "a": 0,
        "e": "T₁ = 290 K, T₂ = 320 K. P₂ = P₁×T₂/T₁ = 250×(320/290) = 275.9 kPa.",
        "h": "P₂ = P₁×T₂/T₁ = 250×320/290 ≈ 275.9 kPa.",
        "yr": "SS1"
      },
      {
        "q": "The combined gas law is:",
        "o": [
          "PV = nRT",
          "P₁V₁/T₁ = P₂V₂/T₂",
          "P₁V₁ = P₂V₂",
          "V₁/T₁ = V₂/T₂"
        ],
        "a": 1,
        "e": "The combined gas law brings together Boyle's, Charles's, and the Pressure Law: P₁V₁/T₁ = P₂V₂/T₂ (for a fixed mass of gas). It applies when none of the three variables is held constant.",
        "h": "Combined gas law: P₁V₁/T₁ = P₂V₂/T₂.",
        "yr": "SS1"
      },
      {
        "q": "Absolute zero is the temperature at which:",
        "o": [
          "Water freezes",
          "All gases become liquid",
          "All molecular motion theoretically ceases (minimum KE)",
          "Pressure becomes zero always"
        ],
        "a": 2,
        "e": "Absolute zero (0 K = −273°C) is the theoretical minimum temperature where all molecular thermal motion ceases. At this point, gas would have zero volume (ideal gas) and zero pressure. In practice, it cannot be reached.",
        "h": "Absolute zero = 0 K = −273°C = all molecular motion ceases.",
        "yr": "SS1"
      },
      {
        "q": "A gas at P₁ = 100 kPa, V₁ = 5 L, T₁ = 300 K. Find V₂ when P₂ = 200 kPa and T₂ = 400 K.",
        "o": [
          "3.33 L",
          "5 L",
          "6.67 L",
          "10 L"
        ],
        "a": 0,
        "e": "P₁V₁/T₁ = P₂V₂/T₂ → V₂ = P₁V₁T₂/(T₁P₂) = (100×5×400)/(300×200) = 200,000/60,000 = 3.33 L.",
        "h": "V₂ = P₁V₁T₂/(T₁P₂) = 100×5×400/(300×200) = 3.33 L.",
        "yr": "SS1"
      },
      {
        "q": "The graph of P vs 1/V for Boyle's Law is:",
        "o": [
          "A curve (parabola)",
          "A straight line through the origin",
          "A horizontal line",
          "A vertical line"
        ],
        "a": 1,
        "e": "From P = k/V (Boyle's Law), P = k × (1/V). This is the equation y = mx with x = 1/V and y = P, giving a straight line through the origin with slope k. (P vs V is a hyperbola.)",
        "h": "P = k(1/V): plot P vs 1/V → straight line through origin.",
        "yr": "SS1"
      },
      {
        "q": "Why must gas law calculations use absolute temperature (Kelvin)?",
        "o": [
          "Kelvin is the SI unit, so it must be used",
          "Using Celsius would give division by zero at 0°C and negative volumes below 0°C",
          "Kelvin is easier to calculate with",
          "Gas laws were discovered using Kelvin scale"
        ],
        "a": 1,
        "e": "If Celsius were used, V/T = constant would give zero volume at 0°C (impossible — gas still has volume) and negative volumes below 0°C (physically meaningless). The Kelvin scale starts at absolute zero — the true zero of temperature — making ratios of temperatures meaningful.",
        "h": "Kelvin: 0°C≠absolute zero. Celsius gives wrong/meaningless results in gas laws.",
        "yr": "SS1"
      },
      {
        "q": "An ideal gas obeys PV = nRT. If temperature doubles at constant volume, pressure:",
        "o": [
          "Halves",
          "Remains the same",
          "Doubles",
          "Quadruples"
        ],
        "a": 2,
        "e": "PV = nRT. At constant V and n: P = nRT/V ∝ T. If T doubles, P doubles.",
        "h": "PV = nRT, constant V: P ∝ T. T doubles → P doubles.",
        "yr": "SS1"
      },
      {
        "q": "Extrapolation of the V-T graph (Charles's Law) to V = 0 gives a temperature of:",
        "o": [
          "−100°C",
          "0°C",
          "−273°C",
          "273°C"
        ],
        "a": 2,
        "e": "The V-T graph (Charles's Law) extrapolated to V = 0 gives T = −273°C = 0 K (absolute zero). This is how absolute zero was first estimated experimentally — by observing the trend of gas volumes as temperature decreases.",
        "h": "V-T graph extrapolated to V=0 → T = −273°C = 0 K (absolute zero).",
        "yr": "SS1"
      },
      {
        "q": "A gas has volume 8 L at 20°C. At 60°C (constant pressure), the volume is:",
        "o": [
          "8×(60/20) = 24 L",
          "8×(333/293) = 9.09 L",
          "8×(60/20) L (wrong)",
          "8×(273/293) L"
        ],
        "a": 1,
        "e": "T₁ = 20+273 = 293 K. T₂ = 60+273 = 333 K. V₂ = 8×(333/293) ≈ 9.09 L. Common error: V₂ = 8×(60/20) = 24 L — this wrongly uses Celsius.",
        "h": "T₁ = 293 K, T₂ = 333 K. V₂ = 8×333/293 ≈ 9.09 L (must use Kelvin!).",
        "yr": "SS1"
      },
      {
        "q": "Boyle's Law graph (P vs V) is a hyperbola because:",
        "o": [
          "Gas molecules are spherical",
          "P and V are inversely proportional (P ∝ 1/V)",
          "Temperature is constant",
          "The gas has constant density"
        ],
        "a": 1,
        "e": "P = constant/V = k × V⁻¹. This inverse relationship between P and V produces a rectangular hyperbola when P is plotted against V. The product PV = constant along the curve.",
        "h": "P ∝ 1/V → hyperbola on P-V graph.",
        "yr": "SS1"
      },
      {
        "q": "In which real-life situation does the Pressure Law apply when the temperature of a sealed container increases?",
        "o": [
          "A punctured tyre",
          "A sealed aerosol can heated in a fire",
          "A syringe being compressed",
          "Gas escaping from a cylinder"
        ],
        "a": 1,
        "e": "A sealed aerosol can has fixed volume and fixed amount of gas. When heated, T increases → P increases (Pressure Law: P/T = constant). This is why aerosol cans have warnings not to expose to heat — increased pressure can cause explosion.",
        "h": "Sealed container + increasing T = increasing P (Pressure Law). Aerosol can.",
        "yr": "SS1"
      },
      {
        "q": "The universal gas constant R in PV = nRT has units:",
        "o": [
          "J/mol",
          "J/(mol·K)",
          "Pa·m³",
          "kPa·L"
        ],
        "a": 1,
        "e": "R = 8.314 J mol⁻¹ K⁻¹. Units: from PV = nRT → R = PV/(nT) = (Pa × m³)/(mol × K) = (N/m² × m³)/(mol × K) = N·m/(mol·K) = J/(mol·K).",
        "h": "R = 8.314 J mol⁻¹ K⁻¹.",
        "yr": "SS1"
      },
      {
        "q": "At constant temperature, halving the pressure of a gas:",
        "o": [
          "Halves the volume",
          "Doubles the volume",
          "Quadruples the volume",
          "Does not change the volume"
        ],
        "a": 1,
        "e": "PV = constant. If P halves (P → P/2): (P/2)V₂ = PV₁ → V₂ = 2V₁. Volume doubles when pressure is halved (at constant temperature).",
        "h": "PV = constant. P halved → V doubled.",
        "yr": "SS1"
      },
      {
        "q": "Standard Temperature and Pressure (STP) in gas experiments refers to:",
        "o": [
          "0°C and 1 atm (101,325 Pa)",
          "100°C and 1 atm",
          "25°C and 100 kPa",
          "0 K and 0 Pa"
        ],
        "a": 0,
        "e": "Standard Temperature and Pressure (STP): 0°C (273 K) and 1 atm (101,325 Pa). At STP, 1 mole of ideal gas occupies 22.4 L. (Note: IUPAC now uses 0°C and 100 kPa as standard, but 0°C and 1 atm is still widely used.)",
        "h": "STP = 0°C (273 K) and 1 atm = 101,325 Pa.",
        "yr": "SS1"
      },
      {
        "q": "A bicycle tyre at 300 kPa and 27°C is heated to 57°C (constant volume). New pressure:",
        "o": [
          "600 kPa",
          "300 kPa",
          "330 kPa",
          "271 kPa"
        ],
        "a": 2,
        "e": "T₁=300K, T₂=330K. P₂=P₁×T₂/T₁=300×330/300=330 kPa.",
        "h": "P₂=P₁T₂/T₁=300×330/300=330 kPa. (T₁=300K, T₂=330K)",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Simple Harmonic Motion",
    "topicCode": "SS1-PHY-15",
    "module": "Waves and Oscillations",
    "term": "Third Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Simple Harmonic Motion (SHM)</span> is a special type of oscillatory motion where the restoring force is directly proportional to the displacement from the equilibrium position and always directed toward the equilibrium. SHM is the mathematical basis for understanding waves, sound, pendulum clocks, springs, musical instruments, and many other physical phenomena. It is the simplest model of periodic (repeating) motion.\n</div>\n\n<h3 class=\"learn-subheading\">1. Definitions</h3>\n<ul class=\"learn-list\">\n  <li><span class=\"learn-keyword\">Oscillation:</span> A to-and-fro motion about an equilibrium position.</li>\n  <li><span class=\"learn-keyword\">Period (T):</span> Time for one complete oscillation. SI unit: second (s).</li>\n  <li><span class=\"learn-keyword\">Frequency (f):</span> Number of complete oscillations per second. SI unit: hertz (Hz). f = 1/T.</li>\n  <li><span class=\"learn-keyword\">Amplitude (A):</span> Maximum displacement from equilibrium. SI unit: metre (m).</li>\n  <li><span class=\"learn-keyword\">Displacement (x):</span> Distance from equilibrium at any instant (can be positive or negative).</li>\n</ul>\n\n<h3 class=\"learn-subheading\">2. Conditions for SHM</h3>\n<p class=\"learn-p\">For SHM, the following conditions must be met:</p>\n<ol class=\"learn-list learn-ordered\">\n  <li>The motion is oscillatory (to-and-fro about equilibrium).</li>\n  <li>The restoring force is proportional to the displacement: <strong>F = −kx</strong> (the negative sign means force opposes displacement).</li>\n  <li>The restoring force always points toward the equilibrium position.</li>\n</ol>\n<p class=\"learn-p\">The acceleration of SHM: <strong>a = −ω²x</strong>, where ω = angular frequency = 2πf = 2π/T</p>\n\n<h3 class=\"learn-subheading\">3. The Simple Pendulum</h3>\n<p class=\"learn-p\">A simple pendulum consists of a small bob of mass m suspended from a fixed point by a light inextensible string of length L. For small angles of swing (< 10°), the pendulum exhibits SHM.</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>T = 2π√(L/g)</strong></p>\n<p class=\"learn-p\"><strong>Key observations about the pendulum:</strong></p>\n<ul class=\"learn-list\">\n  <li>Period depends on LENGTH of string (L) and gravitational field strength (g).</li>\n  <li>Period does NOT depend on amplitude (for small swings) — isochronous property.</li>\n  <li>Period does NOT depend on mass of bob (m).</li>\n  <li>Increasing g (lower altitude) → shorter period. Decreasing g (higher altitude) → longer period.</li>\n</ul>\n<p class=\"learn-p\"><strong>Example:</strong> Find period of a pendulum of length 1 m. (g = 10 m/s²)<br>\nT = 2π√(1/10) = 2π × (1/√10) ≈ 2π × 0.316 ≈ 1.99 s ≈ 2 s</p>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Simple Harmonic Motion — Pendulum and Spring</text>\n    <!-- Pendulum -->\n    <rect x=\"10\" y=\"28\" width=\"210\" height=\"158\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <text x=\"115\" y=\"46\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\" font-weight=\"bold\">Simple Pendulum</text>\n    <line x1=\"115\" y1=\"55\" x2=\"115\" y2=\"55\" stroke=\"#FFC53D\" stroke-width=\"3\"/>\n    <rect x=\"90\" y=\"52\" width=\"50\" height=\"8\" rx=\"2\" fill=\"#7C3AED\"/>\n    <!-- String and bob at equilibrium -->\n    <line x1=\"115\" y1=\"60\" x2=\"115\" y2=\"145\" stroke=\"#c8c8c8\" stroke-width=\"1.5\"/>\n    <circle cx=\"115\" cy=\"152\" r=\"8\" fill=\"#FFC53D\"/>\n    <!-- Bob displaced -->\n    <line x1=\"115\" y1=\"60\" x2=\"150\" y2=\"130\" stroke=\"#c8c8c8\" stroke-width=\"1.5\" stroke-dasharray=\"3,2\"/>\n    <circle cx=\"150\" cy=\"137\" r=\"8\" fill=\"#FFC53D\" opacity=\"0.5\"/>\n    <line x1=\"115\" y1=\"60\" x2=\"80\" y2=\"130\" stroke=\"#c8c8c8\" stroke-width=\"1.5\" stroke-dasharray=\"3,2\"/>\n    <circle cx=\"80\" cy=\"137\" r=\"8\" fill=\"#FFC53D\" opacity=\"0.5\"/>\n    <!-- Arc path -->\n    <path d=\"M80,137 Q115,155 150,137\" stroke=\"#ff9500\" stroke-width=\"1.5\" fill=\"none\" stroke-dasharray=\"4,2\"/>\n    <text x=\"115\" y=\"95\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"8\">L</text>\n    <text x=\"115\" y=\"182\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"8\">T = 2π√(L/g)</text>\n    <text x=\"115\" y=\"170\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">Period ∝ √L, independent of m</text>\n    <!-- Spring-mass -->\n    <rect x=\"240\" y=\"28\" width=\"230\" height=\"158\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#28c840\" stroke-width=\"1.5\"/>\n    <text x=\"355\" y=\"46\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\" font-weight=\"bold\">Spring-Mass System</text>\n    <rect x=\"330\" y=\"52\" width=\"50\" height=\"6\" rx=\"2\" fill=\"#7C3AED\"/>\n    <!-- Spring coil representation -->\n    <path d=\"M355,58 L355,65 Q345,68 355,71 Q365,74 355,77 Q345,80 355,83 Q365,86 355,89 Q345,92 355,95 Q365,98 355,101 Q345,104 355,107 Q365,110 355,113 L355,120\" stroke=\"#c8c8c8\" stroke-width=\"2\" fill=\"none\"/>\n    <rect x=\"335\" y=\"120\" width=\"40\" height=\"25\" rx=\"4\" fill=\"#FFC53D\"/>\n    <text x=\"355\" y=\"136\" text-anchor=\"middle\" fill=\"#0f0020\" font-size=\"8\" font-weight=\"bold\">m</text>\n    <!-- Arrows for force -->\n    <line x1=\"355\" y1=\"145\" x2=\"355\" y2=\"165\" stroke=\"#ff5f57\" stroke-width=\"2\"/>\n    <polygon points=\"351,162 355,170 359,162\" fill=\"#ff5f57\"/>\n    <text x=\"370\" y=\"163\" fill=\"#ff5f57\" font-size=\"7\">mg (weight)</text>\n    <line x1=\"355\" y1=\"120\" x2=\"355\" y2=\"100\" stroke=\"#28c840\" stroke-width=\"2\" stroke-dasharray=\"3,2\"/>\n    <polygon points=\"351,103 355,95 359,103\" fill=\"#28c840\"/>\n    <text x=\"370\" y=\"108\" fill=\"#28c840\" font-size=\"7\">Spring force (F=−kx)</text>\n    <text x=\"355\" y=\"182\" text-anchor=\"middle\" fill=\"#28c840\" font-size=\"8\">T = 2π√(m/k)</text>\n    <text x=\"355\" y=\"170\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">Period ∝ √(m/k)</text>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">4. The Spring-Mass System</h3>\n<p class=\"learn-p\">A mass m attached to a spring of spring constant k (N/m) also undergoes SHM when displaced from equilibrium:</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>T = 2π√(m/k)</strong></p>\n<ul class=\"learn-list\">\n  <li>Period increases with mass m (heavier mass → slower oscillation).</li>\n  <li>Period decreases with spring constant k (stiffer spring → faster oscillation).</li>\n  <li>Period does NOT depend on amplitude (for SHM).</li>\n</ul>\n\n<h3 class=\"learn-subheading\">5. Energy in SHM</h3>\n<p class=\"learn-p\">In SHM, energy continuously converts between kinetic and potential forms:</p>\n<ul class=\"learn-list\">\n  <li>At maximum displacement (amplitude): KE = 0, PE = maximum.</li>\n  <li>At equilibrium: KE = maximum, PE = 0.</li>\n  <li>Total mechanical energy = KE + PE = constant (in ideal SHM without damping).</li>\n</ul>\n\n<h3 class=\"learn-subheading\">6. Damped and Forced Oscillations</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Damped oscillation:</span> Amplitude decreases over time due to energy loss (friction, air resistance). Pendulum clocks compensate by adding energy via a mechanism (mainspring/battery).</p>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Resonance:</span> When a system is driven at its natural frequency, the amplitude of oscillation becomes maximum. Examples: collapse of Tacoma Narrows Bridge (wind at resonant frequency), tuning a radio (electrical resonance), microwave cooking (water molecules resonating at microwave frequency).</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Pendulum vs Spring:</strong> Pendulum: T = 2π√(L/g) — depends on L and g, NOT mass or amplitude. To halve the period: decrease L by factor 4 (since T ∝ √L). Spring: T = 2π√(m/k) — depends on mass and spring constant, NOT amplitude. To halve the period: decrease m by factor 4, OR increase k by factor 4.\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> SHM: oscillatory, F = −kx (restoring force ∝ displacement), a = −ω²x. Pendulum: T = 2π√(L/g) — depends on L and g only. Spring: T = 2π√(m/k). Period and frequency: T = 1/f. Energy: PE max at amplitude, KE max at equilibrium. Total energy constant in ideal SHM. Resonance: driven at natural frequency → maximum amplitude. Damping: energy lost to friction reduces amplitude.\n</div>\n  ",
    "questions": [
      {
        "q": "In Simple Harmonic Motion (SHM), the restoring force is:",
        "o": [
          "Constant in magnitude",
          "Proportional to velocity",
          "Proportional to displacement and directed toward equilibrium",
          "Equal to gravity"
        ],
        "a": 2,
        "e": "In SHM, the restoring force F = −kx: it is proportional to displacement x and directed toward the equilibrium position (opposite to displacement). The negative sign indicates the force opposes the displacement.",
        "h": "SHM: F = −kx — proportional to displacement, toward equilibrium.",
        "yr": "SS1"
      },
      {
        "q": "A pendulum with period T = 2 s completes one full swing. Its frequency is:",
        "o": [
          "2 Hz",
          "1 Hz",
          "0.5 Hz",
          "4 Hz"
        ],
        "a": 2,
        "e": "f = 1/T = 1/2 = 0.5 Hz.",
        "h": "f = 1/T = 1/2 = 0.5 Hz.",
        "yr": "SS1"
      },
      {
        "q": "The period of a simple pendulum depends on:",
        "o": [
          "The mass of the bob",
          "The amplitude of swing",
          "The length of the string and g",
          "All of the above"
        ],
        "a": 2,
        "e": "T = 2π√(L/g). The period depends only on the string length L and gravitational field strength g. It does NOT depend on mass or amplitude (for small angles).",
        "h": "Pendulum T = 2π√(L/g): depends on L and g only.",
        "yr": "SS1"
      },
      {
        "q": "A pendulum of length 1 m has period approximately (g = 10 m/s²):",
        "o": [
          "1 s",
          "2 s",
          "0.5 s",
          "π s"
        ],
        "a": 1,
        "e": "T = 2π√(L/g) = 2π√(1/10) = 2π/√10 ≈ 2π/3.162 ≈ 1.987 s ≈ 2 s.",
        "h": "T = 2π√(1/10) ≈ 2 s.",
        "yr": "SS1"
      },
      {
        "q": "The amplitude of a SHM is defined as:",
        "o": [
          "The total distance covered in one oscillation",
          "The period of oscillation",
          "The maximum displacement from equilibrium",
          "The time for half an oscillation"
        ],
        "a": 2,
        "e": "Amplitude = maximum displacement from the equilibrium position. It represents the 'size' of the oscillation. In SHM (ideal, undamped), amplitude is constant.",
        "h": "Amplitude = maximum displacement from equilibrium.",
        "yr": "SS1"
      },
      {
        "q": "For a spring-mass system with spring constant k = 100 N/m and mass m = 1 kg, the period is:",
        "o": [
          "2π/10 ≈ 0.63 s",
          "2π s",
          "π/5 s",
          "2π/100 s"
        ],
        "a": 0,
        "e": "T = 2π√(m/k) = 2π√(1/100) = 2π/10 ≈ 0.628 s.",
        "h": "T = 2π√(m/k) = 2π√(1/100) = 2π/10 ≈ 0.63 s.",
        "yr": "SS1"
      },
      {
        "q": "At which point in SHM does a pendulum have maximum kinetic energy?",
        "o": [
          "At maximum displacement (amplitude)",
          "At the equilibrium position",
          "Halfway between equilibrium and amplitude",
          "At all points equally"
        ],
        "a": 1,
        "e": "At the equilibrium position: displacement = 0, velocity = maximum, so KE = ½mv² is maximum and PE = 0. At amplitude: velocity = 0, KE = 0, PE = maximum.",
        "h": "Maximum KE at equilibrium (maximum velocity). Maximum PE at amplitude (v=0).",
        "yr": "SS1"
      },
      {
        "q": "Resonance occurs when:",
        "o": [
          "The frequency of oscillation is zero",
          "The applied (driving) frequency equals the system's natural frequency",
          "The amplitude of oscillation is zero",
          "The system is overdamped"
        ],
        "a": 1,
        "e": "Resonance occurs when the frequency of the driving force equals the natural frequency of the oscillating system. At resonance, energy transfer is most efficient and amplitude becomes maximum.",
        "h": "Resonance: driving frequency = natural frequency → maximum amplitude.",
        "yr": "SS1"
      },
      {
        "q": "If the length of a pendulum is quadrupled, the period:",
        "o": [
          "Quadruples",
          "Halves",
          "Doubles",
          "Remains the same"
        ],
        "a": 2,
        "e": "T = 2π√(L/g) ∝ √L. If L quadruples (L → 4L): new T = 2π√(4L/g) = 2π×2×√(L/g) = 2T. Period doubles.",
        "h": "T ∝ √L. L×4 → T×√4 = T×2. Period doubles.",
        "yr": "SS1"
      },
      {
        "q": "In SHM, the total mechanical energy:",
        "o": [
          "Increases as amplitude decreases",
          "Is zero at equilibrium",
          "Remains constant (in ideal SHM without damping)",
          "Depends on the direction of motion"
        ],
        "a": 2,
        "e": "In ideal (undamped) SHM, total energy = KE + PE = constant at all times. Energy converts between KE and PE but total remains the same. Damping (friction) causes total energy to decrease over time.",
        "h": "Ideal SHM: Total energy (KE + PE) = constant. Converts between forms.",
        "yr": "SS1"
      },
      {
        "q": "A pendulum clock runs slow at higher altitude. This is because:",
        "o": [
          "Air resistance increases at altitude",
          "Temperature is lower at altitude",
          "Gravitational field strength g is smaller at altitude, increasing the period",
          "The pendulum length increases due to thermal expansion"
        ],
        "a": 2,
        "e": "T = 2π√(L/g). At higher altitude, g is smaller (further from Earth's centre). Smaller g → larger T → clock runs slower (takes longer for each swing). Pendulum clocks are affected by location.",
        "h": "Higher altitude: smaller g → larger T = 2π√(L/g) → clock runs slow.",
        "yr": "SS1"
      },
      {
        "q": "Damped oscillation refers to:",
        "o": [
          "Forced oscillation at resonance",
          "Oscillation where amplitude decreases over time due to energy loss",
          "Oscillation with increasing amplitude",
          "Oscillation at constant amplitude"
        ],
        "a": 1,
        "e": "Damped oscillation: amplitude gradually decreases over time because energy is lost to friction, air resistance, or other dissipative forces. In a pendulum clock, the mainspring provides energy to compensate for damping.",
        "h": "Damped oscillation: amplitude decreases due to energy loss (friction, air resistance).",
        "yr": "SS1"
      },
      {
        "q": "The frequency of oscillation of a mass-spring system is 5 Hz. Its period is:",
        "o": [
          "5 s",
          "0.2 s",
          "50 s",
          "25 s"
        ],
        "a": 1,
        "e": "T = 1/f = 1/5 = 0.2 s.",
        "h": "T = 1/f = 1/5 = 0.2 s.",
        "yr": "SS1"
      },
      {
        "q": "Increasing the mass on a spring (spring constant k = constant) will:",
        "o": [
          "Decrease the period",
          "Increase the period (T = 2π√(m/k) ∝ √m)",
          "Not affect the period",
          "Increase the spring constant"
        ],
        "a": 1,
        "e": "T = 2π√(m/k). Since T ∝ √m: increasing mass increases the period (slower oscillation with heavier mass).",
        "h": "T = 2π√(m/k) ∝ √m. More mass → longer period.",
        "yr": "SS1"
      },
      {
        "q": "The property of a pendulum that makes it useful for timekeeping is:",
        "o": [
          "It always has the same amplitude",
          "Its period is constant and independent of amplitude (isochronous)",
          "The bob is always spherical",
          "It requires no energy to keep swinging"
        ],
        "a": 1,
        "e": "The isochronous property: a pendulum's period T = 2π√(L/g) is constant and does not depend on amplitude (for small angles). This means each swing takes the same time regardless of how far the pendulum swings — essential for accurate timekeeping.",
        "h": "Pendulum: isochronous = constant period regardless of amplitude (small angles).",
        "yr": "SS1"
      },
      {
        "q": "In SHM, acceleration a and displacement x are related by:",
        "o": [
          "a = ω²x",
          "a = −ω²x (acceleration ∝ −displacement)",
          "a = ωx",
          "a = constant"
        ],
        "a": 1,
        "e": "a = −ω²x. The negative sign shows acceleration is always directed opposite to displacement (toward equilibrium). Magnitude: |a| = ω²|x|, so larger displacement → larger restoring acceleration.",
        "h": "SHM: a = −ω²x. Acceleration proportional to displacement, opposite direction.",
        "yr": "SS1"
      },
      {
        "q": "What effect does doubling the amplitude of a pendulum have on its period?",
        "o": [
          "Doubles the period",
          "Halves the period",
          "No effect on period (for small amplitudes)",
          "Quadruples the period"
        ],
        "a": 2,
        "e": "T = 2π√(L/g) — the period does NOT depend on amplitude (for small angles of swing, typically < 10°). This isochronous property is what makes pendulums ideal for clocks.",
        "h": "Period of pendulum is INDEPENDENT of amplitude (small angles).",
        "yr": "SS1"
      },
      {
        "q": "A spring of spring constant k = 400 N/m has a 4 kg mass attached. Period of oscillation:",
        "o": [
          "π/5 s ≈ 0.628 s",
          "2π/5 s ≈ 1.257 s",
          "π/10 s",
          "4π s"
        ],
        "a": 0,
        "e": "T = 2π√(m/k) = 2π√(4/400) = 2π√(0.01) = 2π × 0.1 = 0.2π ≈ 0.628 s = π/5 s.",
        "h": "T = 2π√(4/400) = 2π×0.1 = 0.2π = π/5 s.",
        "yr": "SS1"
      },
      {
        "q": "A spring-mass system has T=0.5 s. What mass is attached if k=80 N/m?",
        "o": [
          "0.25 kg",
          "0.5 kg",
          "0.507 kg",
          "5 kg"
        ],
        "a": 2,
        "e": "T=2π√(m/k) → 0.5=2π√(m/80) → √(m/80)=0.5/(2π)=0.0796 → m/80=0.00634 → m=0.507 kg.",
        "h": "T=2π√(m/k) → m=k(T/2π)²=80×(0.5/2π)²≈0.507 kg.",
        "yr": "SS1"
      },
      {
        "q": "A pendulum has period 3 s on Earth (g=10 m/s²). Find the string length.",
        "o": [
          "2.28 m",
          "0.91 m",
          "9 m",
          "1.5 m"
        ],
        "a": 0,
        "e": "T=2π√(L/g) → 3=2π√(L/10) → √(L/10)=3/(2π) → L/10=(3/2π)²=0.2282 → L=2.28 m.",
        "h": "L=g(T/2π)²=10×(3/2π)²=10×0.2282=2.28 m.",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Projectile Motion",
    "topicCode": "SS1-PHY-16",
    "module": "Motion",
    "term": "Third Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Projectile motion</span> is the motion of an object thrown into the air and moving under the influence of gravity alone (ignoring air resistance). It is a combination of two independent motions: uniform horizontal motion and uniformly accelerated vertical motion. Understanding projectiles is essential for ballistics (artillery shells), sports (football trajectory in a Lagos stadium), engineering (water jets from fountains), and space science (satellite orbital mechanics).\n</div>\n\n<h3 class=\"learn-subheading\">1. The Key Principle</h3>\n<p class=\"learn-p\">Projectile motion can be analysed by separating it into two independent components:</p>\n<ul class=\"learn-list\">\n  <li><strong>Horizontal (x-direction):</strong> Constant velocity (no air resistance → no horizontal force → no horizontal acceleration). v_x = u cosθ = constant throughout flight.</li>\n  <li><strong>Vertical (y-direction):</strong> Uniform downward acceleration due to gravity (g = 9.8 ≈ 10 m/s²). v_y = u sinθ − gt (decreasing upward, increasing downward).</li>\n</ul>\n\n<h3 class=\"learn-subheading\">2. Equations of Projectile Motion</h3>\n<p class=\"learn-p\">For a projectile launched at angle θ to horizontal with initial speed u:</p>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Quantity</th><th>Horizontal (x)</th><th>Vertical (y)</th></tr></thead>\n    <tbody>\n      <tr><td>Initial velocity component</td><td>u_x = u cosθ</td><td>u_y = u sinθ</td></tr>\n      <tr><td>Acceleration</td><td>a_x = 0</td><td>a_y = −g (downward)</td></tr>\n      <tr><td>Velocity at time t</td><td>v_x = u cosθ (constant)</td><td>v_y = u sinθ − gt</td></tr>\n      <tr><td>Displacement at time t</td><td>x = u cosθ × t</td><td>y = u sinθ × t − ½gt²</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">3. Important Derived Quantities</h3>\n<p class=\"learn-p\"><strong>Time to maximum height (apex):</strong> At apex, v_y = 0.<br>\n0 = u sinθ − gt → <strong>t_apex = u sinθ / g</strong></p>\n\n<p class=\"learn-p\"><strong>Maximum height (H):</strong><br>\nH = u sinθ × t_apex − ½g × t_apex² = (u sinθ)²/(2g)<br>\n<strong>H = u² sin²θ / (2g)</strong></p>\n\n<p class=\"learn-p\"><strong>Total time of flight:</strong><br>\nThe total time = 2 × t_apex (symmetrical trajectory for level ground)<br>\n<strong>T_total = 2u sinθ / g</strong></p>\n\n<p class=\"learn-p\"><strong>Range (R):</strong> Horizontal distance = v_x × T_total<br>\nR = u cosθ × (2u sinθ / g) = u² × 2sinθ cosθ / g<br>\n<strong>R = u² sin2θ / g</strong></p>\n\n<p class=\"learn-p\"><strong>Maximum range:</strong> sin2θ = 1 → 2θ = 90° → <strong>θ = 45°</strong> gives maximum range R_max = u²/g.</p>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Projectile Motion</text>\n    <!-- Ground line -->\n    <line x1=\"20\" y1=\"175\" x2=\"460\" y2=\"175\" stroke=\"#7C3AED\" stroke-width=\"2\"/>\n    <!-- Trajectory parabola (45°) -->\n    <path d=\"M30,175 Q240,40 450,175\" stroke=\"#FFC53D\" stroke-width=\"2.5\" fill=\"none\"/>\n    <!-- Velocity components -->\n    <line x1=\"30\" y1=\"175\" x2=\"75\" y2=\"175\" stroke=\"#5eb4ff\" stroke-width=\"2\"/>\n    <polygon points=\"73,171 80,175 73,179\" fill=\"#5eb4ff\"/>\n    <text x=\"52\" y=\"167\" fill=\"#5eb4ff\" font-size=\"7\">u cosθ</text>\n    <line x1=\"30\" y1=\"175\" x2=\"30\" y2=\"140\" stroke=\"#28c840\" stroke-width=\"2\"/>\n    <polygon points=\"26,143 30,136 34,143\" fill=\"#28c840\"/>\n    <text x=\"35\" y=\"158\" fill=\"#28c840\" font-size=\"7\">u sinθ</text>\n    <!-- Initial velocity vector -->\n    <line x1=\"30\" y1=\"175\" x2=\"68\" y2=\"142\" stroke=\"#FFC53D\" stroke-width=\"2.5\"/>\n    <polygon points=\"63,139 70,142 65,149\" fill=\"#FFC53D\"/>\n    <text x=\"40\" y=\"148\" fill=\"#FFC53D\" font-size=\"8\">u</text>\n    <!-- Angle -->\n    <path d=\"M50,175 Q54,168 58,170\" fill=\"none\" stroke=\"#ff9500\" stroke-width=\"1.5\"/>\n    <text x=\"55\" y=\"182\" fill=\"#ff9500\" font-size=\"8\">θ</text>\n    <!-- Apex labels -->\n    <line x1=\"240\" y1=\"40\" x2=\"240\" y2=\"175\" stroke=\"#8B5CF6\" stroke-width=\"1.5\" stroke-dasharray=\"4,2\"/>\n    <text x=\"248\" y=\"108\" fill=\"#8B5CF6\" font-size=\"7\">H (max height)</text>\n    <!-- Range label -->\n    <line x1=\"30\" y1=\"185\" x2=\"450\" y2=\"185\" stroke=\"#ff5f57\" stroke-width=\"2\"/>\n    <text x=\"240\" y=\"195\" text-anchor=\"middle\" fill=\"#ff5f57\" font-size=\"7\">Range R = u²sin2θ/g (max at θ=45°)</text>\n    <!-- Horizontal arrow at apex -->\n    <line x1=\"240\" y1=\"40\" x2=\"275\" y2=\"40\" stroke=\"#5eb4ff\" stroke-width=\"2\"/>\n    <polygon points=\"273,36 280,40 273,44\" fill=\"#5eb4ff\"/>\n    <text x=\"285\" y=\"44\" fill=\"#5eb4ff\" font-size=\"7\">v_x = ucosθ</text>\n    <text x=\"240\" y=\"30\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">v_y = 0 at apex</text>\n    <circle cx=\"240\" cy=\"40\" r=\"3\" fill=\"#FFC53D\"/>\n    <circle cx=\"30\" cy=\"175\" r=\"5\" fill=\"#28c840\"/>\n    <circle cx=\"450\" cy=\"175\" r=\"5\" fill=\"#28c840\"/>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">4. Special Cases</h3>\n<h4 class=\"learn-subsubheading\">Horizontal Projectile (θ = 0°)</h4>\n<p class=\"learn-p\">Object launched horizontally (like a ball rolled off a table):</p>\n<ul class=\"learn-list\">\n  <li>u_x = u (constant), u_y = 0</li>\n  <li>y = ½gt² (downward), x = ut</li>\n  <li>Time to hit ground from height h: t = √(2h/g)</li>\n  <li>Range = u × t = u√(2h/g)</li>\n</ul>\n\n<h4 class=\"learn-subsubheading\">Velocity at any time</h4>\n<p class=\"learn-p\">v_x = u cosθ (constant). v_y = u sinθ − gt<br>\nSpeed: v = √(v_x² + v_y²). Direction: tan φ = v_y/v_x</p>\n\n<h3 class=\"learn-subheading\">5. Applications</h3>\n<ul class=\"learn-list\">\n  <li><strong>Sports:</strong> Football kick, javelin throw, shotput — maximise range at 45°.</li>\n  <li><strong>Ballistics:</strong> Military artillery uses 45° for maximum range.</li>\n  <li><strong>Water fountains:</strong> Jets of water follow parabolic paths.</li>\n  <li><strong>Fireworks:</strong> Rockets follow parabolic trajectories (approximately).</li>\n  <li><strong>Basketball:</strong> Free throw trajectory — players instinctively use optimal angle.</li>\n</ul>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Angle for Maximum Range:</strong> Maximum range occurs at θ = 45°. This is because R = u² sin2θ/g and sin2θ is maximum when 2θ = 90°, i.e., θ = 45°. Note: angles θ and (90° − θ) give the same range — e.g., 30° and 60° give the same range. At 45°: H = u²/4g, R = u²/g. Range = 4H at 45°.\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Projectile = horizontal (constant velocity) + vertical (uniform acceleration g). Components: u_x = ucosθ, u_y = usinθ. Time to apex: t =usinθ/g. Max height: H = u²sin²θ/(2g). Range: R = u²sin2θ/g. Max range at θ = 45°: R_max = u²/g. At apex: v_y = 0, v_x = ucosθ (still moving horizontally). Horizontal projectile: y = ½gt², x = ut.\n</div>\n  ",
    "questions": [
      {
        "q": "In projectile motion, which component of velocity remains constant throughout the flight?",
        "o": [
          "Vertical velocity",
          "Horizontal velocity",
          "Both horizontal and vertical",
          "Neither component is constant"
        ],
        "a": 1,
        "e": "Horizontal velocity remains constant (in the absence of air resistance) because there is no horizontal force acting on the projectile. Vertical velocity changes because gravity acts downward, accelerating the object vertically.",
        "h": "No horizontal force → horizontal velocity constant. Gravity changes vertical velocity.",
        "yr": "SS1"
      },
      {
        "q": "A ball is thrown horizontally at 20 m/s from a height of 20 m. How long does it take to reach the ground? (g = 10 m/s²)",
        "o": [
          "1 s",
          "2 s",
          "4 s",
          "10 s"
        ],
        "a": 1,
        "e": "Horizontal projectile: y = ½gt² → 20 = ½ × 10 × t² = 5t² → t² = 4 → t = 2 s.",
        "h": "y = ½gt² → t = √(2h/g) = √(40/10) = 2 s.",
        "yr": "SS1"
      },
      {
        "q": "For maximum horizontal range, the angle of projection should be:",
        "o": [
          "30°",
          "45°",
          "60°",
          "90°"
        ],
        "a": 1,
        "e": "Range R = u²sin2θ/g. Maximum range when sin2θ = 1, i.e., 2θ = 90°, so θ = 45°. At 45°, R_max = u²/g.",
        "h": "Maximum range at θ = 45° (sin2θ is maximised).",
        "yr": "SS1"
      },
      {
        "q": "A ball thrown at 30 m/s at 45°. Maximum range (g = 10 m/s²):",
        "o": [
          "45 m",
          "90 m",
          "60 m",
          "900 m"
        ],
        "a": 1,
        "e": "R_max = u²/g = 30²/10 = 900/10 = 90 m. (At 45°: R = u²sin90°/g = u²/g)",
        "h": "At 45°: R = u²/g = 30²/10 = 90 m.",
        "yr": "SS1"
      },
      {
        "q": "At the highest point of projectile trajectory:",
        "o": [
          "Both horizontal and vertical velocities are zero",
          "Horizontal velocity is zero; vertical is maximum",
          "Vertical velocity is zero; horizontal velocity equals initial horizontal component",
          "Speed is maximum"
        ],
        "a": 2,
        "e": "At the apex: vertical velocity v_y = 0 (momentarily stops rising). Horizontal velocity v_x = ucosθ (unchanged — still moving forward). Speed at apex = ucosθ (minimum speed during flight).",
        "h": "At apex: v_y = 0, v_x = ucosθ (horizontal unchanged).",
        "yr": "SS1"
      },
      {
        "q": "Time of flight for a projectile at angle θ with initial speed u is:",
        "o": [
          "u sinθ / g",
          "2u sinθ / g",
          "u cosθ / g",
          "u² sinθ / g"
        ],
        "a": 1,
        "e": "Total time = 2 × time to apex = 2 × (u sinθ/g) = 2u sinθ/g. The factor 2 comes from the symmetry: time going up = time coming down.",
        "h": "T_total = 2u sinθ/g (twice the time to apex).",
        "yr": "SS1"
      },
      {
        "q": "A ball is launched at 10 m/s at 30° to the horizontal. The horizontal component of velocity is:",
        "o": [
          "5 m/s",
          "5√3 m/s",
          "10 m/s",
          "10√3 m/s"
        ],
        "a": 1,
        "e": "u_x = u cosθ = 10 × cos30° = 10 × (√3/2) = 5√3 ≈ 8.66 m/s.",
        "h": "u_x = u cosθ = 10 cos30° = 5√3 m/s.",
        "yr": "SS1"
      },
      {
        "q": "A ball is projected at 20 m/s at 60°. The vertical component of initial velocity is:",
        "o": [
          "10 m/s",
          "10√2 m/s",
          "10√3 m/s",
          "20 m/s"
        ],
        "a": 2,
        "e": "u_y = u sinθ = 20 × sin60° = 20 × (√3/2) = 10√3 ≈ 17.3 m/s.",
        "h": "u_y = u sin60° = 20 × √3/2 = 10√3 m/s.",
        "yr": "SS1"
      },
      {
        "q": "Two projectiles are launched at 15° and 75° with the same speed. Their ranges are:",
        "o": [
          "The 15° projectile has larger range",
          "The 75° projectile has larger range",
          "Both have the same range",
          "Depends on the speed"
        ],
        "a": 2,
        "e": "Complementary angles (θ and 90°−θ) give the same range: R = u²sin2θ/g. Since sin(2×15°) = sin30° and sin(2×75°) = sin150° = sin30°, both have equal ranges.",
        "h": "Angles θ and 90°−θ (complementary) give same range. 15° + 75° = 90°.",
        "yr": "SS1"
      },
      {
        "q": "The trajectory (path) of a projectile is a:",
        "o": [
          "Straight line",
          "Circle",
          "Parabola",
          "Ellipse"
        ],
        "a": 2,
        "e": "A projectile follows a parabolic path. From x = u cosθ × t (so t = x/(ucosθ)) and y = u sinθ × t − ½gt², substituting: y = x tanθ − gx²/(2u²cos²θ). This is of the form y = ax + bx², which is a parabola.",
        "h": "Projectile path: y = ax + bx² → parabola.",
        "yr": "SS1"
      },
      {
        "q": "Maximum height H of a projectile at angle θ with speed u is:",
        "o": [
          "u²sin²θ/(g)",
          "u²sin²θ/(2g)",
          "u²sin(2θ)/g",
          "u²/(g)"
        ],
        "a": 1,
        "e": "H = u²sin²θ/(2g). At the apex: v_y² = u_y² − 2gH = 0 → H = u_y²/(2g) = (u sinθ)²/(2g) = u²sin²θ/(2g).",
        "h": "H = u²sin²θ/(2g). Use v_y = 0 at apex.",
        "yr": "SS1"
      },
      {
        "q": "A stone is thrown horizontally from a cliff at 15 m/s. The stone hits the ground 3 s later. The range (horizontal distance) is:",
        "o": [
          "5 m",
          "45 m",
          "135 m",
          "22.5 m"
        ],
        "a": 1,
        "e": "Range = horizontal velocity × time = 15 × 3 = 45 m.",
        "h": "Range = u_x × t = 15 × 3 = 45 m.",
        "yr": "SS1"
      },
      {
        "q": "At the apex of a projectile's path, the speed is:",
        "o": [
          "Zero (object stops)",
          "Maximum",
          "u cosθ (minimum — only horizontal component remains)",
          "u sinθ"
        ],
        "a": 2,
        "e": "At the apex, v_y = 0. Speed = √(v_x² + v_y²) = √((ucosθ)² + 0²) = ucosθ. This is the minimum speed during the flight (since v_y = 0).",
        "h": "At apex: v_y = 0, speed = v_x = ucosθ (minimum speed).",
        "yr": "SS1"
      },
      {
        "q": "Ignoring air resistance, a bullet fired horizontally and a bullet dropped simultaneously from the same height will:",
        "o": [
          "The fired bullet lands first",
          "The dropped bullet lands first",
          "Both land at the same time",
          "Depends on the speed of the fired bullet"
        ],
        "a": 2,
        "e": "Both bullets have the same initial vertical velocity (zero) and fall under the same acceleration g. Time to hit the ground depends only on vertical motion: t = √(2h/g). Both land at the same time — the horizontal speed of the fired bullet doesn't affect when it hits the ground.",
        "h": "Vertical and horizontal motions independent. Both have same initial v_y = 0 → land simultaneously.",
        "yr": "SS1"
      },
      {
        "q": "A projectile is launched at 45°. If the initial speed doubles, the range:",
        "o": [
          "Doubles",
          "Quadruples",
          "Increases by 1.5×",
          "Halves"
        ],
        "a": 1,
        "e": "R = u²sin2θ/g ∝ u². If u doubles (u → 2u): R → (2u)²/g = 4u²/g = 4R. Range quadruples.",
        "h": "R ∝ u². If u doubles, R quadruples.",
        "yr": "SS1"
      },
      {
        "q": "In the absence of air resistance, which quantity is NOT constant during projectile flight?",
        "o": [
          "Horizontal velocity (v_x)",
          "Vertical acceleration (downward g)",
          "Total speed of the projectile",
          "Mass of the projectile"
        ],
        "a": 2,
        "e": "Horizontal velocity is constant (no horizontal force). Vertical acceleration = g (constant). Mass is constant. However, the TOTAL SPEED changes continuously — it is minimum at the apex (= ucosθ) and varies throughout the flight as v_y changes.",
        "h": "Total speed changes throughout flight (v_y changes). Horizontal velocity and g are constant.",
        "yr": "SS1"
      },
      {
        "q": "Range R and maximum height H of a projectile at 45° are related by:",
        "o": [
          "R = H",
          "R = 2H",
          "R = 4H",
          "R = H/2"
        ],
        "a": 2,
        "e": "At 45°: R = u²/g and H = u²sin²45°/(2g) = u²×(½)/(2g) = u²/(4g). So R = u²/g = 4 × u²/(4g) = 4H. Range = 4 × maximum height at 45°.",
        "h": "At 45°: R = u²/g and H = u²/(4g) → R = 4H.",
        "yr": "SS1"
      },
      {
        "q": "A football is kicked at 20 m/s at 30° above ground. Time to reach maximum height (g = 10 m/s²):",
        "o": [
          "1 s",
          "2 s",
          "3 s",
          "4 s"
        ],
        "a": 0,
        "e": "t_apex = u sinθ/g = 20 × sin30°/10 = 20 × 0.5/10 = 10/10 = 1 s.",
        "h": "t_apex = u sinθ/g = 20×0.5/10 = 1 s.",
        "yr": "SS1"
      },
      {
        "q": "A ball thrown at 30 m/s at 30°. Maximum height (g=10 m/s²):",
        "o": [
          "11.25 m",
          "22.5 m",
          "45 m",
          "5 m"
        ],
        "a": 0,
        "e": "H=u²sin²θ/(2g)=900×sin²30°/20=900×0.25/20=225/20=11.25 m.",
        "h": "H=u²sin²θ/(2g)=900×0.25/20=11.25 m.",
        "yr": "SS1"
      },
      {
        "q": "A cannonball is fired at 50 m/s at 60° above horizontal. Its range is (g=10 m/s²):",
        "o": [
          "125 m",
          "216.5 m",
          "250 m",
          "433 m"
        ],
        "a": 1,
        "e": "R=u²sin2θ/g=2500×sin120°/10=2500×(√3/2)/10=2500×0.866/10=216.5 m.",
        "h": "R=u²sin2θ/g=2500×sin120°/10=2500×0.866/10=216.5 m.",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Types of Waves",
    "topicCode": "SS1-PHY-17",
    "module": "Waves",
    "term": "Third Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Waves</span> are disturbances that transfer energy from one place to another without the permanent displacement of matter. Waves are everywhere — sound reaches our ears as pressure waves in air, light from the sun travels as electromagnetic waves through empty space, earthquakes travel as seismic waves through the Earth, and radio signals in Nigeria are transmitted as electromagnetic waves. Understanding waves is fundamental to communications technology, medicine (ultrasound, X-rays), and physics.\n</div>\n\n<h3 class=\"learn-subheading\">1. Classification of Waves</h3>\n<h4 class=\"learn-subsubheading\">By Medium Requirement</h4>\n<ul class=\"learn-list\">\n  <li><strong>Mechanical waves:</strong> Require a medium (material) to travel through. Cannot travel through a vacuum. Examples: sound waves, water waves, seismic waves, waves on a string.</li>\n  <li><strong>Electromagnetic (EM) waves:</strong> Do NOT require a medium — can travel through a vacuum. Examples: light, radio waves, microwaves, infrared, ultraviolet, X-rays, gamma rays. All travel at c = 3 × 10⁸ m/s in vacuum.</li>\n</ul>\n\n<h4 class=\"learn-subsubheading\">By Direction of Vibration</h4>\n<ul class=\"learn-list\">\n  <li><strong>Transverse waves:</strong> The vibration (displacement) is PERPENDICULAR to the direction of wave travel. Examples: all electromagnetic waves, water waves, waves on a string/rope.</li>\n  <li><strong>Longitudinal waves:</strong> The vibration is PARALLEL to the direction of wave travel. Creates compressions (high pressure) and rarefactions (low pressure). Examples: sound waves, compression waves in springs.</li>\n</ul>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Transverse vs Longitudinal Waves</text>\n    <!-- Transverse wave -->\n    <text x=\"120\" y=\"38\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\" font-weight=\"bold\">Transverse Wave</text>\n    <text x=\"120\" y=\"50\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">(e.g., light, water wave)</text>\n    <path d=\"M20,100 Q45,60 70,100 Q95,140 120,100 Q145,60 170,100 Q195,140 220,100\" stroke=\"#FFC53D\" stroke-width=\"2.5\" fill=\"none\"/>\n    <line x1=\"20\" y1=\"100\" x2=\"225\" y2=\"100\" stroke=\"#7C3AED\" stroke-width=\"1\" stroke-dasharray=\"3,2\"/>\n    <polygon points=\"222,97 228,100 222,103\" fill=\"#7C3AED\"/>\n    <text x=\"235\" y=\"103\" fill=\"#7C3AED\" font-size=\"7\">→ direction of travel</text>\n    <!-- Vibration arrows -->\n    <line x1=\"70\" y1=\"100\" x2=\"70\" y2=\"60\" stroke=\"#28c840\" stroke-width=\"1.5\" stroke-dasharray=\"2,1\"/>\n    <line x1=\"120\" y1=\"100\" x2=\"120\" y2=\"140\" stroke=\"#28c840\" stroke-width=\"1.5\" stroke-dasharray=\"2,1\"/>\n    <text x=\"80\" y=\"78\" fill=\"#28c840\" font-size=\"7\">⬆ vibration</text>\n    <text x=\"80\" y=\"150\" fill=\"#28c840\" font-size=\"7\">⬇ (perpendicular)</text>\n    <!-- Longitudinal wave -->\n    <text x=\"350\" y=\"38\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\" font-weight=\"bold\">Longitudinal Wave</text>\n    <text x=\"350\" y=\"50\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">(e.g., sound)</text>\n    <!-- Compressions and rarefactions -->\n    <rect x=\"255\" y=\"80\" width=\"10\" height=\"40\" rx=\"2\" fill=\"#FFC53D\" opacity=\"0.9\"/>\n    <rect x=\"272\" y=\"80\" width=\"4\" height=\"40\" rx=\"2\" fill=\"#FFC53D\" opacity=\"0.4\"/>\n    <rect x=\"283\" y=\"80\" width=\"10\" height=\"40\" rx=\"2\" fill=\"#FFC53D\" opacity=\"0.9\"/>\n    <rect x=\"300\" y=\"80\" width=\"4\" height=\"40\" rx=\"2\" fill=\"#FFC53D\" opacity=\"0.4\"/>\n    <rect x=\"311\" y=\"80\" width=\"10\" height=\"40\" rx=\"2\" fill=\"#FFC53D\" opacity=\"0.9\"/>\n    <rect x=\"328\" y=\"80\" width=\"4\" height=\"40\" rx=\"2\" fill=\"#FFC53D\" opacity=\"0.4\"/>\n    <rect x=\"339\" y=\"80\" width=\"10\" height=\"40\" rx=\"2\" fill=\"#FFC53D\" opacity=\"0.9\"/>\n    <rect x=\"356\" y=\"80\" width=\"4\" height=\"40\" rx=\"2\" fill=\"#FFC53D\" opacity=\"0.4\"/>\n    <rect x=\"367\" y=\"80\" width=\"10\" height=\"40\" rx=\"2\" fill=\"#FFC53D\" opacity=\"0.9\"/>\n    <rect x=\"384\" y=\"80\" width=\"4\" height=\"40\" rx=\"2\" fill=\"#FFC53D\" opacity=\"0.4\"/>\n    <rect x=\"395\" y=\"80\" width=\"10\" height=\"40\" rx=\"2\" fill=\"#FFC53D\" opacity=\"0.9\"/>\n    <rect x=\"412\" y=\"80\" width=\"4\" height=\"40\" rx=\"2\" fill=\"#FFC53D\" opacity=\"0.4\"/>\n    <rect x=\"423\" y=\"80\" width=\"15\" height=\"40\" rx=\"2\" fill=\"#FFC53D\" opacity=\"0.9\"/>\n    <line x1=\"255\" y1=\"130\" x2=\"438\" y2=\"130\" stroke=\"#7C3AED\" stroke-width=\"1\" stroke-dasharray=\"2,1\"/>\n    <polygon points=\"436,127 442,130 436,133\" fill=\"#7C3AED\"/>\n    <text x=\"260\" y=\"158\" fill=\"#ff9500\" font-size=\"7\">C = compression</text>\n    <text x=\"340\" y=\"158\" fill=\"#5eb4ff\" font-size=\"7\">R = rarefaction</text>\n    <text x=\"260\" y=\"170\" fill=\"#9090b0\" font-size=\"7\">← same direction as travel →</text>\n    <text x=\"120\" y=\"183\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"8\">Vibration ⊥ travel</text>\n    <text x=\"350\" y=\"183\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"8\">Vibration ∥ travel</text>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">2. The Electromagnetic Spectrum</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Wave Type</th><th>Wavelength Range</th><th>Applications</th></tr></thead>\n    <tbody>\n      <tr><td>Radio waves</td><td>10² m to 10⁴ m</td><td>Broadcasting (NTA, Radio Nigeria), communications</td></tr>\n      <tr><td>Microwaves</td><td>10⁻³ m to 10⁻¹ m</td><td>Radar, microwave ovens, mobile phone signals</td></tr>\n      <tr><td>Infrared (IR)</td><td>10⁻⁶ m to 10⁻³ m</td><td>Night vision cameras, TV remote controls, heat lamps</td></tr>\n      <tr><td>Visible light</td><td>4×10⁻⁷ m to 7×10⁻⁷ m</td><td>Vision, photography, photosynthesis</td></tr>\n      <tr><td>Ultraviolet (UV)</td><td>10⁻⁸ m to 4×10⁻⁷ m</td><td>Sterilisation, vitamin D synthesis, fluorescence</td></tr>\n      <tr><td>X-rays</td><td>10⁻¹¹ m to 10⁻⁸ m</td><td>Medical imaging (LUTH, UCH), security scanners</td></tr>\n      <tr><td>Gamma rays</td><td>&lt; 10⁻¹¹ m</td><td>Cancer treatment, sterilisation of medical equipment</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">3. Common Properties of All Waves</h3>\n<ul class=\"learn-list\">\n  <li><strong>Reflection:</strong> Bouncing back from a surface.</li>\n  <li><strong>Refraction:</strong> Change in speed (and direction) when passing from one medium to another.</li>\n  <li><strong>Diffraction:</strong> Spreading around obstacles or through openings.</li>\n  <li><strong>Interference:</strong> Superposition of two or more waves — constructive (peaks add) or destructive (peaks cancel).</li>\n  <li><strong>Polarisation:</strong> Restriction of vibration to one plane (only transverse waves can be polarised).</li>\n</ul>\n\n<h3 class=\"learn-subheading\">4. Progressive vs Stationary Waves</h3>\n<ul class=\"learn-list\">\n  <li><strong>Progressive (travelling) wave:</strong> Energy is transported from one place to another. All particles vibrate with the same amplitude. Phase changes continuously along the wave.</li>\n  <li><strong>Stationary (standing) wave:</strong> Formed by superposition of two identical waves travelling in opposite directions. Nodes (zero amplitude) and antinodes (maximum amplitude) form fixed positions. No net energy transport.</li>\n</ul>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Transverse vs Longitudinal:</strong> The key difference: TRANSVERSE = vibration perpendicular to travel (can be polarised). LONGITUDINAL = vibration parallel to travel (cannot be polarised). Sound is always longitudinal (in any medium). Light is always transverse. Water surface waves look transverse but actually combine both (particles move in ellipses). Only TRANSVERSE waves can be polarised — this is how polaroid sunglasses work.\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Mechanical waves: need medium (sound, water, seismic). EM waves: no medium needed (light, radio, X-rays, gamma). Transverse: vibration ⊥ travel (light, water, rope). Longitudinal: vibration ∥ travel (sound, compression springs). EM spectrum: radio → microwave → IR → visible → UV → X-ray → gamma (decreasing λ, increasing f and energy). All waves: reflection, refraction, diffraction, interference. Only transverse: polarisation.\n</div>\n  ",
    "questions": [
      {
        "q": "Which type of wave does NOT require a medium to travel?",
        "o": [
          "Sound waves",
          "Water waves",
          "Electromagnetic waves",
          "Seismic waves"
        ],
        "a": 2,
        "e": "Electromagnetic waves (light, radio, X-rays, gamma rays, etc.) can travel through a vacuum without any medium. Mechanical waves (sound, water, seismic) require a material medium to propagate.",
        "h": "EM waves: no medium needed (can travel through vacuum). Mechanical waves need medium.",
        "yr": "SS1"
      },
      {
        "q": "In a transverse wave, the vibration direction is:",
        "o": [
          "Parallel to the direction of wave travel",
          "Perpendicular to the direction of wave travel",
          "At 45° to the direction of travel",
          "In a circular path"
        ],
        "a": 1,
        "e": "In a transverse wave, the oscillating particles vibrate at right angles (perpendicular) to the direction in which the wave travels. Examples: light waves, water waves, waves on a rope.",
        "h": "Transverse: vibration ⊥ direction of travel.",
        "yr": "SS1"
      },
      {
        "q": "Sound is an example of which type of wave?",
        "o": [
          "Transverse mechanical wave",
          "Longitudinal electromagnetic wave",
          "Longitudinal mechanical wave",
          "Transverse electromagnetic wave"
        ],
        "a": 2,
        "e": "Sound is a longitudinal mechanical wave. It is mechanical (requires a medium — air, water, solid) and longitudinal (compressions and rarefactions travel parallel to the direction of sound propagation).",
        "h": "Sound = longitudinal + mechanical (needs medium, vibration ∥ travel).",
        "yr": "SS1"
      },
      {
        "q": "Which property of waves allows only transverse waves to be polarised?",
        "o": [
          "Transverse waves have higher frequency",
          "In transverse waves, vibration is in a plane perpendicular to travel, which can be restricted to one direction",
          "Longitudinal waves cannot be reflected",
          "Transverse waves travel faster"
        ],
        "a": 1,
        "e": "Polarisation restricts the vibration of a wave to a single plane. In transverse waves, the vibration is perpendicular to travel and can be in any direction in that perpendicular plane — it can be filtered to one plane. Longitudinal waves vibrate along the direction of travel (no transverse plane to select from), so they cannot be polarised.",
        "h": "Polarisation: restrict to one transverse plane. Only possible for transverse waves.",
        "yr": "SS1"
      },
      {
        "q": "Which region of the electromagnetic spectrum has the highest frequency?",
        "o": [
          "Radio waves",
          "Infrared",
          "Visible light",
          "Gamma rays"
        ],
        "a": 3,
        "e": "In the electromagnetic spectrum, frequency increases from radio waves (lowest f) to gamma rays (highest f). Order: radio → microwave → infrared → visible → ultraviolet → X-rays → gamma rays (increasing frequency, decreasing wavelength).",
        "h": "EM spectrum: γ-rays have highest frequency and energy, radio waves lowest.",
        "yr": "SS1"
      },
      {
        "q": "In a longitudinal wave, compressions are regions where:",
        "o": [
          "Particles are spaced far apart (low density)",
          "Particles are bunched close together (high density, high pressure)",
          "Particles vibrate perpendicular to travel",
          "Energy is zero"
        ],
        "a": 1,
        "e": "In a longitudinal wave (e.g., sound): compressions = regions where particles are pushed close together → high pressure, high density. Rarefactions = regions where particles are spread apart → low pressure, low density.",
        "h": "Compression: particles close together, high pressure. Rarefaction: particles spread, low pressure.",
        "yr": "SS1"
      },
      {
        "q": "All electromagnetic waves in vacuum travel at:",
        "o": [
          "3 × 10⁵ m/s",
          "3 × 10⁸ m/s",
          "3 × 10¹⁰ m/s",
          "3 × 10⁶ m/s"
        ],
        "a": 1,
        "e": "All electromagnetic waves travel at the speed of light in vacuum: c = 3 × 10⁸ m/s (approximately 300,000 km/s). This includes radio waves, visible light, X-rays, and gamma rays — all travel at c in vacuum.",
        "h": "All EM waves in vacuum: speed c = 3 × 10⁸ m/s.",
        "yr": "SS1"
      },
      {
        "q": "Radio Nigeria broadcasts on radio waves. Radio waves are:",
        "o": [
          "Mechanical transverse waves",
          "Electromagnetic transverse waves",
          "Mechanical longitudinal waves",
          "Sound waves transmitted through air"
        ],
        "a": 1,
        "e": "Radio waves are electromagnetic waves — they are transverse and do not require a medium (travel through space). They are produced by oscillating electric currents in antennas and can travel from transmitters to receivers.",
        "h": "Radio waves = electromagnetic + transverse. No medium needed.",
        "yr": "SS1"
      },
      {
        "q": "The difference between a progressive wave and a stationary (standing) wave is:",
        "o": [
          "Standing waves travel faster",
          "Progressive waves transfer energy; standing waves have fixed nodes and antinodes with no net energy transfer",
          "Standing waves only occur in electromagnetic waves",
          "Progressive waves cannot be reflected"
        ],
        "a": 1,
        "e": "A progressive (travelling) wave carries energy from source to receiver. A stationary (standing) wave is formed by superposition of two waves in opposite directions — it has fixed nodes (zero amplitude) and antinodes (maximum amplitude) and transfers no net energy.",
        "h": "Progressive wave: transfers energy. Standing wave: nodes/antinodes, no net energy transfer.",
        "yr": "SS1"
      },
      {
        "q": "X-rays used in hospitals (e.g., LUTH) are:",
        "o": [
          "Sound waves of very high frequency",
          "Longitudinal mechanical waves",
          "Electromagnetic waves with very short wavelength",
          "Transverse mechanical waves"
        ],
        "a": 2,
        "e": "X-rays are electromagnetic waves with very short wavelengths (10⁻¹¹ to 10⁻⁸ m). They are transverse electromagnetic waves that penetrate soft tissue but are absorbed by denser bone — hence their medical imaging application.",
        "h": "X-rays = EM waves, short λ, transverse, no medium needed.",
        "yr": "SS1"
      },
      {
        "q": "Which statement about all waves is TRUE?",
        "o": [
          "All waves can travel through a vacuum",
          "All waves exhibit reflection, refraction, and diffraction",
          "All waves are transverse",
          "All waves require a medium to travel"
        ],
        "a": 1,
        "e": "Reflection, refraction, and diffraction are exhibited by ALL waves — both mechanical and electromagnetic, both transverse and longitudinal. Not all waves can travel through vacuum (mechanical cannot) and not all waves are transverse (longitudinal waves exist).",
        "h": "Reflection, refraction, diffraction: properties of ALL waves.",
        "yr": "SS1"
      },
      {
        "q": "Polaroid sunglasses reduce glare by using the principle of:",
        "o": [
          "Refraction of light",
          "Diffraction of light",
          "Polarisation of transverse light waves",
          "Reflection of sound waves"
        ],
        "a": 2,
        "e": "Polaroid sunglasses contain a polarising filter that only transmits light vibrating in one specific plane. Glare from horizontal surfaces (roads, water) is mostly horizontally polarised — the vertical polaroid filter blocks this, reducing glare.",
        "h": "Polaroid glasses: polarisation filter blocks horizontally polarised glare.",
        "yr": "SS1"
      },
      {
        "q": "Water waves at a beach are best described as:",
        "o": [
          "Purely transverse mechanical waves",
          "Purely longitudinal mechanical waves",
          "Mechanical waves with transverse components (particles move in ellipses)",
          "Electromagnetic waves"
        ],
        "a": 2,
        "e": "Water surface waves are mechanical and complex — water particles actually move in elliptical paths combining both forward-backward (longitudinal) and up-down (transverse) motion. In deep water, they are more circular. They are generally described as transverse in simple treatment.",
        "h": "Water waves: mechanical, complex motion (transverse + longitudinal components).",
        "yr": "SS1"
      },
      {
        "q": "Infrared radiation from remote controls can operate TVs because:",
        "o": [
          "Infrared is a mechanical wave that shakes the TV sensor",
          "Infrared is an electromagnetic wave that carries encoded signals to the TV's infrared sensor",
          "Infrared radiation heats the TV sensor",
          "Infrared has the same frequency as visible light"
        ],
        "a": 1,
        "e": "Infrared radiation from a remote control is an electromagnetic wave. It carries encoded signals (pulses) that travel from the remote to the TV's infrared-sensitive photodetector, which decodes the signal to perform the commanded action.",
        "h": "IR remote = EM wave carrying encoded signal to TV sensor.",
        "yr": "SS1"
      },
      {
        "q": "The speed of electromagnetic waves in a medium (other than vacuum) is:",
        "o": [
          "Always c = 3 × 10⁸ m/s",
          "Greater than c",
          "Less than c (c/n, where n is refractive index)",
          "Zero (they cannot travel in media)"
        ],
        "a": 2,
        "e": "In any medium other than vacuum, EM waves travel more slowly than c. Speed in medium = c/n, where n = refractive index. For glass (n ≈ 1.5): speed = c/1.5 = 2 × 10⁸ m/s. Only in vacuum do they travel at exactly c.",
        "h": "EM waves in medium: speed = c/n < c (slower than in vacuum).",
        "yr": "SS1"
      },
      {
        "q": "Diffraction of waves occurs when:",
        "o": [
          "Waves bounce off a flat surface",
          "Waves change speed and direction at an interface",
          "Waves spread around obstacles or through openings",
          "Two waves cancel each other"
        ],
        "a": 2,
        "e": "Diffraction is the spreading of waves around obstacles or through openings. It is most pronounced when the wavelength is comparable to the size of the obstacle/opening. It explains why sound can be heard around corners and why radio waves can reach receivers behind hills.",
        "h": "Diffraction = waves spreading around obstacles or through gaps.",
        "yr": "SS1"
      },
      {
        "q": "Which of the following correctly orders the EM spectrum by INCREASING wavelength?",
        "o": [
          "Gamma → X-ray → UV → visible → IR → microwave → radio",
          "Radio → microwave → IR → visible → UV → X-ray → gamma",
          "Visible → radio → gamma → UV → X-ray → microwave → IR",
          "Gamma → UV → X-ray → visible → IR → radio → microwave"
        ],
        "a": 0,
        "e": "Increasing wavelength (λ): gamma rays (shortest) → X-rays → UV → visible → infrared → microwaves → radio waves (longest). Equivalently: gamma has highest frequency, radio has lowest frequency. Energy ∝ frequency ∝ 1/λ.",
        "h": "Increasing λ: gamma → X-ray → UV → visible → IR → microwave → radio.",
        "yr": "SS1"
      },
      {
        "q": "Microwave ovens cook food by making water molecules resonate at microwave frequency. This is an example of:",
        "o": [
          "Reflection",
          "Diffraction",
          "Polarisation",
          "Resonance/absorption"
        ],
        "a": 3,
        "e": "Microwave ovens operate at a frequency (2.45 GHz) that causes water molecules to absorb maximum energy (resonance). The oscillating electric field of microwaves causes polar water molecules to rotate rapidly, generating heat throughout the food.",
        "h": "Microwave oven: water molecules absorb microwave energy (resonance) → heat.",
        "yr": "SS1"
      },
      {
        "q": "Ultraviolet (UV) radiation from the sun is responsible for:",
        "o": [
          "Keeping the Earth warm (greenhouse effect)",
          "Vitamin D synthesis in skin and causing sunburn",
          "Radio communications",
          "Cooking food"
        ],
        "a": 1,
        "e": "UV radiation (wavelength 10⁻⁸ to 4×10⁻⁷ m) causes vitamin D synthesis in human skin and also causes sunburn and skin cancer with excessive exposure. It is partially blocked by the ozone layer.",
        "h": "UV = vitamin D synthesis + sunburn + skin cancer (blocked by ozone layer).",
        "yr": "SS1"
      },
      {
        "q": "Which electromagnetic wave has the longest wavelength?",
        "o": [
          "Gamma rays",
          "X-rays",
          "Visible light",
          "Radio waves"
        ],
        "a": 3,
        "e": "Radio waves have the longest wavelengths in the EM spectrum (from about 1 mm to hundreds of kilometres). Gamma rays have the shortest wavelengths (< 10⁻¹¹ m).",
        "h": "Longest wavelength in EM spectrum: radio waves.",
        "yr": "SS1"
      }
    ]
  },
  {
    "topic": "Properties of Waves",
    "topicCode": "SS1-PHY-18",
    "module": "Waves",
    "term": "Third Term",
    "contentHTML": "\n<div class=\"learn-intro\">\n  All waves share common properties — they reflect, refract, diffract, interfere, and can be described by the same mathematical relationships between wavelength, frequency, period, and speed. This topic explores these wave properties quantitatively and describes the phenomena that result from them. Understanding wave properties is essential for designing antennas, optical instruments, concert halls (acoustics), and wireless communication systems that are transforming Nigeria's digital economy.\n</div>\n\n<h3 class=\"learn-subheading\">1. Wave Terminology</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Term</th><th>Symbol</th><th>Definition</th><th>SI Unit</th></tr></thead>\n    <tbody>\n      <tr><td>Wavelength</td><td>λ (lambda)</td><td>Distance between two successive points in phase (e.g., crest to crest, trough to trough)</td><td>metre (m)</td></tr>\n      <tr><td>Frequency</td><td>f</td><td>Number of complete waves passing a point per second</td><td>hertz (Hz)</td></tr>\n      <tr><td>Period</td><td>T</td><td>Time for one complete wave to pass a point</td><td>second (s)</td></tr>\n      <tr><td>Amplitude</td><td>A</td><td>Maximum displacement from equilibrium position</td><td>metre (m)</td></tr>\n      <tr><td>Wave speed</td><td>v</td><td>Speed at which the wave pattern travels</td><td>m/s</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">2. The Wave Equation</h3>\n<p class=\"learn-p\">The fundamental wave equation relates speed, frequency, and wavelength:</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>v = fλ</strong></p>\n<p class=\"learn-p\">Since T = 1/f: <strong>v = λ/T</strong></p>\n<p class=\"learn-p\"><strong>Examples:</strong></p>\n<ul class=\"learn-list\">\n  <li>Radio wave: f = 100 MHz = 10⁸ Hz. Speed = c = 3×10⁸ m/s. λ = c/f = 3×10⁸/10⁸ = 3 m.</li>\n  <li>Sound: speed = 340 m/s at 20°C. f = 440 Hz (musical note A). λ = v/f = 340/440 ≈ 0.77 m.</li>\n  <li>Visible light: λ = 600 nm = 6×10⁻⁷ m. Speed = c. f = c/λ = 3×10⁸/(6×10⁻⁷) = 5×10¹⁴ Hz.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">3. Reflection of Waves</h3>\n<p class=\"learn-p\">When a wave strikes a boundary and bounces back, <span class=\"learn-keyword\">reflection</span> occurs. Laws of reflection (same as for light):</p>\n<ul class=\"learn-list\">\n  <li>Angle of incidence = Angle of reflection (both measured from the normal).</li>\n  <li>Incident ray, reflected ray, and normal are all in the same plane.</li>\n  <li>Frequency and speed do NOT change on reflection.</li>\n  <li>Wavelength does NOT change on reflection.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">4. Refraction of Waves</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Refraction</span> occurs when a wave crosses from one medium to another with a different wave speed. The frequency remains constant, but wavelength and direction change.</p>\n<p class=\"learn-p\" style=\"text-align:center;\"><strong>Snell's Law: n₁ sinθ₁ = n₂ sinθ₂ → sinθ₁/sinθ₂ = v₁/v₂ = n₂/n₁</strong></p>\n<p class=\"learn-p\">When a wave enters a denser medium: speed decreases, wavelength decreases, ray bends toward normal.</p>\n<p class=\"learn-p\">When a wave enters a less dense medium: speed increases, wavelength increases, ray bends away from normal.</p>\n<p class=\"learn-p\">Frequency remains constant during refraction (energy conservation: E = hf is conserved per photon).</p>\n\n<div class=\"learn-svg-wrap\">\n  <svg class=\"learn-svg\" viewBox=\"0 0 480 200\" xmlns=\"http://www.w3.org/2000/svg\">\n    <rect width=\"480\" height=\"200\" fill=\"#0f0020\" rx=\"10\"/>\n    <text x=\"240\" y=\"18\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"11\" font-weight=\"bold\">Wave Properties</text>\n    <!-- Wave anatomy -->\n    <rect x=\"10\" y=\"28\" width=\"210\" height=\"155\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#7C3AED\" stroke-width=\"1.5\"/>\n    <text x=\"115\" y=\"47\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\" font-weight=\"bold\">Wave Anatomy</text>\n    <path d=\"M20,100 Q42.5,55 65,100 Q87.5,145 110,100 Q132.5,55 155,100 Q177.5,145 200,100\" stroke=\"#FFC53D\" stroke-width=\"2.5\" fill=\"none\"/>\n    <line x1=\"20\" y1=\"100\" x2=\"205\" y2=\"100\" stroke=\"#7C3AED\" stroke-width=\"1\" stroke-dasharray=\"3,2\"/>\n    <!-- Crest -->\n    <line x1=\"65\" y1=\"100\" x2=\"65\" y2=\"55\" stroke=\"#28c840\" stroke-width=\"1\" stroke-dasharray=\"2,1\"/>\n    <text x=\"68\" y=\"52\" fill=\"#28c840\" font-size=\"7\">Crest</text>\n    <!-- Trough -->\n    <line x1=\"110\" y1=\"100\" x2=\"110\" y2=\"145\" stroke=\"#ff5f57\" stroke-width=\"1\" stroke-dasharray=\"2,1\"/>\n    <text x=\"113\" y=\"155\" fill=\"#ff5f57\" font-size=\"7\">Trough</text>\n    <!-- Wavelength -->\n    <line x1=\"20\" y1=\"110\" x2=\"110\" y2=\"110\" stroke=\"#FFC53D\" stroke-width=\"2\"/>\n    <text x=\"65\" y=\"125\" text-anchor=\"middle\" fill=\"#FFC53D\" font-size=\"7\">λ</text>\n    <!-- Amplitude -->\n    <line x1=\"30\" y1=\"100\" x2=\"30\" y2=\"55\" stroke=\"#ff9500\" stroke-width=\"1.5\" stroke-dasharray=\"2,1\"/>\n    <polygon points=\"26,58 30,52 34,58\" fill=\"#ff9500\"/>\n    <text x=\"8\" y=\"80\" fill=\"#ff9500\" font-size=\"7\">A</text>\n    <text x=\"115\" y=\"178\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"8\">v = fλ = λ/T</text>\n    <!-- Refraction diagram -->\n    <rect x=\"240\" y=\"28\" width=\"230\" height=\"155\" rx=\"8\" fill=\"#1B0A47\" stroke=\"#28c840\" stroke-width=\"1.5\"/>\n    <text x=\"355\" y=\"47\" text-anchor=\"middle\" fill=\"#c8b4f0\" font-size=\"9\" font-weight=\"bold\">Refraction</text>\n    <line x1=\"240\" y1=\"120\" x2=\"470\" y2=\"120\" stroke=\"#7C3AED\" stroke-width=\"2\"/>\n    <text x=\"420\" y=\"116\" fill=\"#9090b0\" font-size=\"7\">boundary</text>\n    <rect x=\"240\" y=\"120\" width=\"230\" height=\"63\" rx=\"0\" fill=\"#1a1a3a\" opacity=\"0.5\"/>\n    <text x=\"280\" y=\"140\" fill=\"#5eb4ff\" font-size=\"7\">denser medium (slower)</text>\n    <!-- Normal -->\n    <line x1=\"355\" y1=\"60\" x2=\"355\" y2=\"170\" stroke=\"#7C3AED\" stroke-width=\"1\" stroke-dasharray=\"3,2\"/>\n    <text x=\"360\" y=\"65\" fill=\"#9090b0\" font-size=\"7\">normal</text>\n    <!-- Incident ray -->\n    <line x1=\"300\" y1=\"60\" x2=\"355\" y2=\"120\" stroke=\"#FFC53D\" stroke-width=\"2.5\"/>\n    <polygon points=\"350,117 357,120 353,126\" fill=\"#FFC53D\"/>\n    <text x=\"295\" y=\"72\" fill=\"#FFC53D\" font-size=\"7\">incident</text>\n    <!-- Refracted ray (bends toward normal) -->\n    <line x1=\"355\" y1=\"120\" x2=\"380\" y2=\"170\" stroke=\"#28c840\" stroke-width=\"2.5\"/>\n    <polygon points=\"377,167 381,174 385,167\" fill=\"#28c840\"/>\n    <text x=\"385\" y=\"153\" fill=\"#28c840\" font-size=\"7\">refracted</text>\n    <text x=\"340\" y=\"82\" fill=\"#FFC53D\" font-size=\"7\">θ₁</text>\n    <text x=\"360\" y=\"140\" fill=\"#28c840\" font-size=\"7\">θ₂</text>\n    <text x=\"355\" y=\"185\" text-anchor=\"middle\" fill=\"#9090b0\" font-size=\"7\">n₁sinθ₁ = n₂sinθ₂</text>\n  </svg>\n</div>\n\n<h3 class=\"learn-subheading\">5. Diffraction</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Diffraction</span> is the bending and spreading of waves around obstacles or through openings. Diffraction is most significant when the wavelength is comparable to the size of the obstacle or gap. This explains:</p>\n<ul class=\"learn-list\">\n  <li>Why sound diffracts around buildings but light does not (sound has λ ≈ cm-metres; light has λ ≈ 10⁻⁷ m).</li>\n  <li>Why long-wave radio (λ = km) diffracts around mountains but short-wave doesn't (different propagation).</li>\n  <li>Diffraction of water waves through a harbour entrance.</li>\n</ul>\n\n<h3 class=\"learn-subheading\">6. Interference</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Interference</span> occurs when two or more waves superpose. The <span class=\"learn-keyword\">principle of superposition</span>: the resultant displacement is the vector sum of the individual displacements.</p>\n<ul class=\"learn-list\">\n  <li><strong>Constructive interference:</strong> Waves in phase (path difference = nλ, where n = 0, 1, 2,...) — amplitudes ADD → bright fringe or loud region.</li>\n  <li><strong>Destructive interference:</strong> Waves out of phase (path difference = (n+½)λ) — amplitudes SUBTRACT → dark fringe or quiet region.</li>\n  <li><strong>Young's double-slit experiment:</strong> Light passing through two narrow slits creates alternating bright and dark fringes — demonstrates light's wave nature.</li>\n</ul>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip — Wave Equation v = fλ:</strong> The most-used formula in waves. Know these relationships: if f doubles (at same speed), λ halves. If speed doubles (same f), λ doubles. If speed doubles (same λ), f doubles. Speed of EM waves in vacuum is always c regardless of f — so higher f means shorter λ. Common data: speed of sound ≈ 340 m/s; speed of light (EM) = 3×10⁸ m/s.\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">🎯</span>\n  <strong>Summary:</strong> Wave equation: v = fλ. Reflection: angle in = angle out; speed, frequency, wavelength unchanged. Refraction: speed and wavelength change, frequency constant; Snell's law: n₁sinθ₁ = n₂sinθ₂. Diffraction: waves spread around obstacles; most pronounced when λ ≈ obstacle size. Interference: constructive (in phase, path diff = nλ); destructive (out of phase, path diff = (n+½)λ). Only transverse waves show polarisation.\n</div>\n  ",
    "questions": [
      {
        "q": "A wave has frequency 200 Hz and wavelength 1.7 m. Its speed is:",
        "o": [
          "340 m/s",
          "200 m/s",
          "1.7 m/s",
          "118 m/s"
        ],
        "a": 0,
        "e": "v = fλ = 200 × 1.7 = 340 m/s (speed of sound in air at room temperature).",
        "h": "v = fλ = 200 × 1.7 = 340 m/s.",
        "yr": "SS1"
      },
      {
        "q": "Radio waves of frequency 100 MHz travel at 3×10⁸ m/s. Their wavelength is:",
        "o": [
          "3 m",
          "30 m",
          "0.3 m",
          "300 m"
        ],
        "a": 0,
        "e": "λ = v/f = (3×10⁸)/(100×10⁶) = 3×10⁸/10⁸ = 3 m.",
        "h": "λ = v/f = 3×10⁸/10⁸ = 3 m.",
        "yr": "SS1"
      },
      {
        "q": "What quantity remains constant when a wave refracts (changes medium)?",
        "o": [
          "Speed",
          "Wavelength",
          "Frequency",
          "Amplitude"
        ],
        "a": 2,
        "e": "When a wave crosses from one medium to another, its frequency remains constant. Speed and wavelength both change (v = fλ, so if v changes and f stays constant, λ must change). Amplitude may also change.",
        "h": "Refraction: speed and wavelength change, frequency stays constant.",
        "yr": "SS1"
      },
      {
        "q": "The law of reflection states:",
        "o": [
          "Angle of incidence + angle of reflection = 90°",
          "Angle of incidence = angle of refraction",
          "Angle of incidence = angle of reflection (measured from normal)",
          "The reflected ray is parallel to the incident ray"
        ],
        "a": 2,
        "e": "Law of reflection: the angle of incidence (θᵢ) equals the angle of reflection (θᵣ), both measured from the normal to the reflecting surface. The incident ray, reflected ray, and normal are coplanar.",
        "h": "Reflection: θᵢ = θᵣ (both from normal to surface).",
        "yr": "SS1"
      },
      {
        "q": "Diffraction is most pronounced when the wavelength is:",
        "o": [
          "Much larger than the obstacle",
          "Much smaller than the obstacle",
          "Comparable to (similar size as) the obstacle/gap",
          "Equal to the speed of the wave"
        ],
        "a": 2,
        "e": "Diffraction effects are most significant when the wavelength λ is comparable to the size of the obstacle or aperture. When λ << obstacle, little diffraction occurs (shadows are sharp). When λ >> obstacle, diffraction is extensive.",
        "h": "Maximum diffraction: λ ≈ size of obstacle/gap.",
        "yr": "SS1"
      },
      {
        "q": "Constructive interference occurs when two waves:",
        "o": [
          "Are 180° out of phase (path difference = λ/2)",
          "Are in phase (path difference = nλ, n = 0, 1, 2...)",
          "Have different frequencies",
          "Travel in opposite directions always"
        ],
        "a": 1,
        "e": "Constructive interference: waves are in phase (path difference = 0, λ, 2λ, etc. = whole number of wavelengths). Their displacements add together, producing maximum amplitude.",
        "h": "Constructive interference: in phase, path difference = nλ (n = 0,1,2...).",
        "yr": "SS1"
      },
      {
        "q": "The wavelength of sound (v = 340 m/s) at 1000 Hz is:",
        "o": [
          "0.34 m",
          "3.4 m",
          "34 m",
          "340 m"
        ],
        "a": 0,
        "e": "λ = v/f = 340/1000 = 0.34 m = 34 cm.",
        "h": "λ = v/f = 340/1000 = 0.34 m.",
        "yr": "SS1"
      },
      {
        "q": "Snell's Law of refraction (n₁sinθ₁ = n₂sinθ₂) relates:",
        "o": [
          "The speeds of waves in different media only",
          "The angles of incidence and refraction to the refractive indices",
          "The frequencies in two media",
          "The amplitudes in two media"
        ],
        "a": 1,
        "e": "Snell's Law: n₁sinθ₁ = n₂sinθ₂, where n₁, n₂ are refractive indices and θ₁, θ₂ are angles measured from the normal. It quantitatively describes how the angle of a wave changes when it crosses into a different medium.",
        "h": "Snell's Law: n₁sinθ₁ = n₂sinθ₂ — relates angles and refractive indices.",
        "yr": "SS1"
      },
      {
        "q": "Light passing from air (n=1) into glass (n=1.5) at incidence angle 30°. Using Snell's Law, sinθ₂ =",
        "o": [
          "sinθ₂ = 0.5/1.5 = 0.333 → θ₂ ≈ 19.5°",
          "sinθ₂ = 1.5×0.5 = 0.75 → θ₂ ≈ 48.6°",
          "sinθ₂ = 0.5 = sin30°",
          "sinθ₂ = 1"
        ],
        "a": 0,
        "e": "n₁sinθ₁ = n₂sinθ₂ → 1×sin30° = 1.5×sinθ₂ → 0.5 = 1.5sinθ₂ → sinθ₂ = 0.333 → θ₂ ≈ 19.5°. Ray bends toward the normal when entering denser medium.",
        "h": "n₁sinθ₁ = n₂sinθ₂: 1×0.5 = 1.5×sinθ₂ → sinθ₂ = 1/3 ≈ 19.5°.",
        "yr": "SS1"
      },
      {
        "q": "The principle of superposition states that:",
        "o": [
          "Waves can only add, never subtract",
          "When two waves meet, the resultant displacement is the vector sum of individual displacements",
          "Waves destroy each other when they meet",
          "Only waves of the same type can superpose"
        ],
        "a": 1,
        "e": "The principle of superposition: when two or more waves occupy the same region, the resultant displacement at any point is the vector (algebraic) sum of the individual displacements. This applies to both constructive and destructive interference.",
        "h": "Superposition: resultant displacement = vector sum of individual displacements.",
        "yr": "SS1"
      },
      {
        "q": "Young's double-slit experiment demonstrated that light is a:",
        "o": [
          "Stream of particles (photons only)",
          "Wave (showing interference patterns)",
          "Longitudinal wave",
          "Sound wave at high frequency"
        ],
        "a": 1,
        "e": "Young's double-slit experiment (1801) produced alternating bright and dark fringes (interference pattern), proving light has wave properties. Only waves can interfere — particles would just produce two bright regions. (Light also has particle properties — wave-particle duality.)",
        "h": "Young's double-slit: interference fringes prove light has wave properties.",
        "yr": "SS1"
      },
      {
        "q": "A wave with period 0.01 s has frequency:",
        "o": [
          "0.01 Hz",
          "10 Hz",
          "100 Hz",
          "1000 Hz"
        ],
        "a": 2,
        "e": "f = 1/T = 1/0.01 = 100 Hz.",
        "h": "f = 1/T = 1/0.01 = 100 Hz.",
        "yr": "SS1"
      },
      {
        "q": "Destructive interference produces:",
        "o": [
          "Maximum amplitude (bright regions)",
          "Zero or minimum amplitude (dark/quiet regions)",
          "Sound amplification",
          "Increased wave speed"
        ],
        "a": 1,
        "e": "Destructive interference occurs when waves are out of phase (path difference = λ/2, 3λ/2, etc.). The displacements cancel each other, producing zero or minimum amplitude — dark fringes in light, quiet spots in sound.",
        "h": "Destructive interference: waves out of phase → amplitudes cancel → dark/quiet.",
        "yr": "SS1"
      },
      {
        "q": "Sound travels at 340 m/s in air and at 1500 m/s in water. A 500 Hz sound wave crosses from air to water. Its frequency and wavelength in water:",
        "o": [
          "f = 500 Hz (unchanged), λ increases to 3 m",
          "f = 500 Hz (unchanged), λ decreases to 0.23 m",
          "f increases, λ stays the same",
          "Both f and λ change"
        ],
        "a": 0,
        "e": "Frequency stays constant at 500 Hz. In water: λ = v/f = 1500/500 = 3 m. In air: λ = 340/500 = 0.68 m. So wavelength increases in water (faster medium).",
        "h": "Refraction: f stays 500 Hz. λ_water = 1500/500 = 3 m (larger in faster medium).",
        "yr": "SS1"
      },
      {
        "q": "In the electromagnetic spectrum, as frequency increases:",
        "o": [
          "Wavelength increases and energy decreases",
          "Wavelength decreases and energy increases (E = hf)",
          "Both wavelength and energy increase",
          "Speed increases beyond c"
        ],
        "a": 1,
        "e": "E = hf: energy is directly proportional to frequency. As f increases, E increases. Since v = fλ = c (constant for EM waves in vacuum), λ = c/f: as f increases, λ decreases. So higher frequency = shorter wavelength = more energy.",
        "h": "Higher f → shorter λ (λ = c/f), higher energy (E = hf).",
        "yr": "SS1"
      },
      {
        "q": "Echo is an example of which wave property?",
        "o": [
          "Refraction",
          "Diffraction",
          "Interference",
          "Reflection"
        ],
        "a": 3,
        "e": "An echo is sound reflected from a surface (e.g., a building, cliff, or mountain). The reflected sound returns to the listener after a delay (time = 2d/v, where d is distance to reflecting surface). Echoes are used in sonar and ultrasound imaging.",
        "h": "Echo = reflection of sound from a surface.",
        "yr": "SS1"
      },
      {
        "q": "The wavelength of visible light (∼550 nm) is much smaller than a doorway (∼1 m). Therefore, light passing through a doorway:",
        "o": [
          "Diffracts significantly around the doorframe",
          "Shows very little diffraction (straight-line propagation)",
          "Refracts through the door frame",
          "Creates bright and dark fringes on the opposite wall"
        ],
        "a": 1,
        "e": "Diffraction is significant only when λ ≈ obstacle size. Visible light: λ ≈ 550 nm = 5.5×10⁻⁷ m. Doorway ≈ 1 m. Since λ << doorway, light diffracts very little — it travels in straight lines. Sound (λ ≈ 0.1−10 m) diffracts significantly through the same doorway.",
        "h": "λ << gap → little diffraction. Light λ = 550 nm << door = 1 m → minimal diffraction.",
        "yr": "SS1"
      },
      {
        "q": "A microwave has wavelength 12 cm. Given c = 3×10⁸ m/s, its frequency is:",
        "o": [
          "2.5×10⁹ Hz (2.5 GHz)",
          "3.6×10¹⁰ Hz",
          "36 Hz",
          "4×10⁶ Hz"
        ],
        "a": 0,
        "e": "λ = 12 cm = 0.12 m. f = v/λ = (3×10⁸)/0.12 = 2.5×10⁹ Hz = 2.5 GHz. (This is close to the 2.45 GHz used in microwave ovens.)",
        "h": "f = c/λ = 3×10⁸/0.12 = 2.5×10⁹ Hz = 2.5 GHz.",
        "yr": "SS1"
      },
      {
        "q": "The frequency of visible yellow light is approximately 5×10¹⁴ Hz. Its wavelength in vacuum (c=3×10⁸ m/s) is:",
        "o": [
          "600 nm",
          "150 nm",
          "1500 nm",
          "6000 nm"
        ],
        "a": 0,
        "e": "λ=c/f=3×10⁸/(5×10¹⁴)=6×10⁻⁷ m=600 nm.",
        "h": "λ=c/f=3×10⁸/5×10¹⁴=6×10⁻⁷ m=600 nm.",
        "yr": "SS1"
      },
      {
        "q": "Total internal reflection can occur when light travels:",
        "o": [
          "From a less dense medium to a denser medium",
          "From a denser medium to a less dense medium at the critical angle or beyond",
          "At any angle in any medium",
          "Only in glass fibre optics"
        ],
        "a": 1,
        "e": "Total internal reflection occurs when light travels from a denser medium (e.g., glass, n=1.5) to a less dense medium (e.g., air, n=1) and the angle of incidence exceeds the critical angle. No refracted ray escapes — all light is reflected back inside. This is the basis of optical fibres.",
        "h": "Total internal reflection: denser→less dense medium, angle > critical angle.",
        "yr": "SS1"
      }
    ]
  }
];
