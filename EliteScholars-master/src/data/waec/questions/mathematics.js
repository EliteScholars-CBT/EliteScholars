// ============================================================================
// WAEC Mathematics — Question Bank & Learn Content
// ============================================================================

export const WAEC_MATHEMATICS = [
  {
    q: 'Simplify: log₁₀ 1000',
    o: ['1', '2', '3', '4'],
    a: 2,
    e: 'log₁₀ 1000 = log₁₀ 10³ = 3.',
    h: 'How many times must you raise 10 to get 1000?',
    yr: '2023',
  },
  {
    q: 'Find the gradient of the line 3y = 6x + 9.',
    o: ['2', '3', '6', '9'],
    a: 0,
    e: 'Divide through by 3: y = 2x + 3. Gradient = coefficient of x = 2.',
    h: 'Rearrange to y = mx + c.',
    yr: '2022',
  },
  {
    q: 'A bag contains 4 red and 6 blue balls. What is the probability of picking a red ball?',
    o: ['2/5', '3/5', '1/4', '2/3'],
    a: 0,
    e: 'P(red) = 4/(4+6) = 4/10 = 2/5.',
    h: 'Probability = favourable ÷ total.',
    yr: '2023',
  },
  {
    q: 'Evaluate: 5! (5 factorial)',
    o: ['20', '60', '100', '120'],
    a: 3,
    e: '5! = 5 × 4 × 3 × 2 × 1 = 120.',
    h: 'Multiply all integers from 1 to 5.',
    yr: '2021',
  },
  {
    q: 'The sum of angles in a triangle is:',
    o: ['90°', '180°', '270°', '360°'],
    a: 1,
    e: 'The interior angles of any triangle always add up to 180°.',
    h: 'Basic geometry rule.',
    yr: '2022',
  },
  {
    q: 'Solve: 2x² - 5x - 3 = 0',
    o: ['x = 3 or x = -½', 'x = -3 or x = ½', 'x = 3 or x = ½', 'x = -3 or x = -½'],
    a: 0,
    e: 'Factorise: (2x + 1)(x - 3) = 0. So x = -½ or x = 3.',
    h: 'Find two numbers that multiply to (2×-3)=-6 and add to -5.',
    yr: '2023',
  },
  {
    q: 'Find the area of a circle with radius 7 cm. (π = 22/7)',
    o: ['22 cm²', '44 cm²', '154 cm²', '308 cm²'],
    a: 2,
    e: 'Area = πr² = 22/7 × 7² = 22/7 × 49 = 22 × 7 = 154 cm².',
    h: 'A = πr²',
    yr: '2022',
  },
  {
    q: 'Express 2/3 as a percentage.',
    o: ['33.3%', '66.6%', '0.67%', '6.7%'],
    a: 1,
    e: '2/3 × 100 = 200/3 ≈ 66.67%.',
    h: 'Multiply fraction by 100.',
    yr: '2021',
  },
  {
    q: 'What is the value of x in the equation: 3x - 7 = 14?',
    o: ['5', '6', '7', '8'],
    a: 2,
    e: '3x = 14 + 7 = 21. x = 21/3 = 7.',
    h: 'Add 7 to both sides, then divide by 3.',
    yr: '2022',
  },
  {
    q: 'The volume of a cuboid is length × breadth × height. Find the volume if l=5, b=4, h=3.',
    o: ['20 cm³', '47 cm³', '60 cm³', '35 cm³'],
    a: 2,
    e: 'V = 5 × 4 × 3 = 60 cm³.',
    h: 'Multiply all three dimensions.',
    yr: '2023',
  },
];

// ============================================================================
// WAEC Mathematics Learn Content — Topic 1 is RICH
// ============================================================================

export const WAEC_MATHEMATICS_LEARN = [
  {
    topic: 'Number Bases',
    contentHTML: `
<div class="learn-intro">
  A <span class="learn-keyword">number base</span> (or radix) tells you how many unique digits a number system uses. Our everyday numbers use <strong>Base 10</strong> (ten digits: 0–9), but computers use <strong>Base 2</strong> (binary).
</div>

<h3 class="learn-subheading">Common Number Bases</h3>
<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Base</th><th>Name</th><th>Digits Used</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td><span class="learn-keyword">Base 2</span></td><td>Binary</td><td>0, 1</td><td>1011₂</td></tr>
      <tr><td><span class="learn-keyword">Base 8</span></td><td>Octal</td><td>0–7</td><td>17₈</td></tr>
      <tr><td><span class="learn-keyword">Base 10</span></td><td>Decimal</td><td>0–9</td><td>1000₁₀</td></tr>
      <tr><td><span class="learn-keyword">Base 16</span></td><td>Hexadecimal</td><td>0–9, A–F</td><td>3F₁₆</td></tr>
    </tbody>
  </table>
</div>

<h3 class="learn-subheading">SVG Illustration — Place Values in Base 2</h3>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="320" height="130" rx="12" fill="#f8faff" stroke="#dbeafe" stroke-width="1.5"/>
    <text x="160" y="18" text-anchor="middle" font-size="9" fill="#64748b" font-family="sans-serif" font-weight="600">Converting 1011₂ to Base 10</text>

    <!-- Columns: bit positions -->
    <!-- 2³ = 8 -->
    <rect x="10" y="26" width="60" height="34" rx="8" fill="#dbeafe"/>
    <text x="40" y="40" text-anchor="middle" font-size="14" fill="#1d4ed8" font-family="sans-serif" font-weight="800">1</text>
    <text x="40" y="53" text-anchor="middle" font-size="9" fill="#64748b" font-family="sans-serif">2³ = 8</text>

    <!-- 2² = 4 -->
    <rect x="80" y="26" width="60" height="34" rx="8" fill="#fee2e2"/>
    <text x="110" y="40" text-anchor="middle" font-size="14" fill="#9a3412" font-family="sans-serif" font-weight="800">0</text>
    <text x="110" y="53" text-anchor="middle" font-size="9" fill="#64748b" font-family="sans-serif">2² = 4</text>

    <!-- 2¹ = 2 -->
    <rect x="150" y="26" width="60" height="34" rx="8" fill="#dcfce7"/>
    <text x="180" y="40" text-anchor="middle" font-size="14" fill="#065f46" font-family="sans-serif" font-weight="800">1</text>
    <text x="180" y="53" text-anchor="middle" font-size="9" fill="#64748b" font-family="sans-serif">2¹ = 2</text>

    <!-- 2⁰ = 1 -->
    <rect x="220" y="26" width="60" height="34" rx="8" fill="#fef3c7"/>
    <text x="250" y="40" text-anchor="middle" font-size="14" fill="#b45309" font-family="sans-serif" font-weight="800">1</text>
    <text x="250" y="53" text-anchor="middle" font-size="9" fill="#64748b" font-family="sans-serif">2⁰ = 1</text>

    <!-- Contribution row -->
    <text x="40" y="78" text-anchor="middle" font-size="11" fill="#1d4ed8" font-family="sans-serif" font-weight="700">1×8=8</text>
    <text x="110" y="78" text-anchor="middle" font-size="11" fill="#9a3412" font-family="sans-serif" font-weight="700">0×4=0</text>
    <text x="180" y="78" text-anchor="middle" font-size="11" fill="#065f46" font-family="sans-serif" font-weight="700">1×2=2</text>
    <text x="250" y="78" text-anchor="middle" font-size="11" fill="#b45309" font-family="sans-serif" font-weight="700">1×1=1</text>

    <!-- Sum -->
    <text x="160" y="103" text-anchor="middle" font-size="11" fill="#7c3aed" font-family="sans-serif" font-weight="700">Total = 8 + 0 + 2 + 1 = 11₁₀</text>
    <text x="160" y="118" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="sans-serif">∴ 1011₂ = 11₁₀</text>
  </svg>
</div>

<h3 class="learn-subheading">Converting Base 10 → Base 2 (Successive Division)</h3>
<p class="learn-p">To convert a decimal number to binary, repeatedly divide by 2 and record the remainders:</p>

<div class="learn-worked-example">
  <div class="learn-worked-title">Convert 13₁₀ to Binary</div>
  <table class="learn-table learn-small-table">
    <thead><tr><th>Division</th><th>Quotient</th><th>Remainder</th></tr></thead>
    <tbody>
      <tr><td>13 ÷ 2</td><td>6</td><td><strong>1</strong></td></tr>
      <tr><td>6 ÷ 2</td><td>3</td><td><strong>0</strong></td></tr>
      <tr><td>3 ÷ 2</td><td>1</td><td><strong>1</strong></td></tr>
      <tr><td>1 ÷ 2</td><td>0</td><td><strong>1</strong></td></tr>
    </tbody>
  </table>
  <p class="learn-p">Read remainders <strong>bottom to top</strong>: <span class="learn-keyword">1101₂</span></p>
  <p class="learn-p learn-verify">✅ Verify: 1×8 + 1×4 + 0×2 + 1×1 = 8+4+0+1 = <strong>13</strong> ✓</p>
</div>

<h3 class="learn-subheading">Addition in Base 2</h3>
<p class="learn-p">Binary addition rules:</p>
<ul class="learn-list">
  <li>0 + 0 = 0</li>
  <li>0 + 1 = 1</li>
  <li>1 + 1 = <span class="learn-keyword">10</span> (write 0, carry 1)</li>
  <li>1 + 1 + 1 = <span class="learn-keyword">11</span> (write 1, carry 1)</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>WAEC Tip:</strong> Number base questions often combine conversion and arithmetic. Practice both directions (decimal↔binary) and verify your answers by converting back.</span>
</div>
    `,
    content:
      'Numbers can be written in any base. Base 2 (binary) uses only 0 and 1. Base 8 (octal) uses 0–7. To convert from base n to base 10, multiply each digit by n raised to its position power and sum the results.',
  },
  {
    topic: 'Logarithms',
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Logarithm</span> is the inverse of exponentiation. If b<sup>y</sup> = x, then log<sub>b</sub>(x) = y. Read it as: "b to the power y gives x."
</div>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 300 90" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <rect width="300" height="90" rx="12" fill="#f8faff" stroke="#dbeafe" stroke-width="1.5"/>
    <text x="150" y="22" text-anchor="middle" font-size="10" fill="#64748b" font-family="sans-serif" font-weight="600">Logarithm ↔ Exponent Relationship</text>
    <!-- Box 1: exponential -->
    <rect x="10" y="32" width="120" height="40" rx="8" fill="#dbeafe"/>
    <text x="70" y="50" text-anchor="middle" font-size="12" fill="#1d4ed8" font-family="sans-serif" font-weight="700">10³ = 1000</text>
    <text x="70" y="65" text-anchor="middle" font-size="9" fill="#64748b" font-family="sans-serif">Exponential form</text>
    <!-- Arrow -->
    <text x="150" y="55" text-anchor="middle" font-size="16" fill="#7c3aed" font-family="sans-serif">⇔</text>
    <!-- Box 2: log -->
    <rect x="170" y="32" width="120" height="40" rx="8" fill="#ede9fe"/>
    <text x="230" y="50" text-anchor="middle" font-size="12" fill="#7c3aed" font-family="sans-serif" font-weight="700">log₁₀(1000) = 3</text>
    <text x="230" y="65" text-anchor="middle" font-size="9" fill="#64748b" font-family="sans-serif">Logarithmic form</text>
  </svg>
</div>

<h3 class="learn-subheading">Laws of Logarithms</h3>
<div class="learn-formula-list">
  <div class="learn-formula"><span class="learn-formula-label">Product Rule:</span> log(AB) = log A + log B</div>
  <div class="learn-formula"><span class="learn-formula-label">Quotient Rule:</span> log(A/B) = log A − log B</div>
  <div class="learn-formula"><span class="learn-formula-label">Power Rule:</span> log(Aⁿ) = n × log A</div>
  <div class="learn-formula"><span class="learn-formula-label">Change of Base:</span> log<sub>b</sub>A = log A / log b</div>
  <div class="learn-formula"><span class="learn-formula-label">Special Values:</span> log<sub>b</sub>(1) = 0 &nbsp;|&nbsp; log<sub>b</sub>(b) = 1</div>
</div>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>WAEC Tip:</strong> log without a base specified means log₁₀ (common logarithm). ln means natural logarithm (base e ≈ 2.718).</span>
</div>
    `,
    content:
      'log_b(x) = y means b^y = x. Key rules: log(AB) = log A + log B; log(A/B) = log A – log B; log(A^n) = n log A. log₁₀ is the common log; ln is the natural log.',
  },
  {
    topic: 'Quadratic Equations',
    contentHTML: `
<div class="learn-intro">
  A <span class="learn-keyword">quadratic equation</span> has the standard form: <strong>ax² + bx + c = 0</strong>, where a ≠ 0.
</div>

<h3 class="learn-subheading">Three Methods of Solution</h3>
<ol class="learn-list learn-ordered">
  <li><strong>Factorisation</strong> — find two numbers that multiply to <em>ac</em> and add to <em>b</em>, then split and factorise.</li>
  <li><strong>Quadratic Formula</strong> — always works: <br/><span class="learn-formula-inline">x = (−b ± √(b²−4ac)) / 2a</span></li>
  <li><strong>Completing the Square</strong> — rearrange to (x + p)² = q form.</li>
</ol>

<div class="learn-worked-example">
  <div class="learn-worked-title">Worked Example: Solve 2x² − 5x − 3 = 0</div>
  <p class="learn-p"><strong>Method: Factorisation</strong></p>
  <p class="learn-p">a=2, b=−5, c=−3. Need two numbers × to ac = 2×(−3) = −6, and + to −5.</p>
  <p class="learn-p">Numbers: <strong>−6 and +1</strong> (−6 × 1 = −6, −6 + 1 = −5) ✓</p>
  <p class="learn-p">Split: 2x² − 6x + x − 3 = 0</p>
  <p class="learn-p">Factorise: 2x(x − 3) + 1(x − 3) = 0</p>
  <p class="learn-p">(2x + 1)(x − 3) = 0</p>
  <p class="learn-p"><span class="learn-keyword">x = −½ &nbsp;or&nbsp; x = 3</span></p>
</div>

<h3 class="learn-subheading">The Discriminant (b² − 4ac)</h3>
<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Discriminant Value</th><th>Nature of Roots</th></tr></thead>
    <tbody>
      <tr><td>b² − 4ac &gt; 0</td><td>Two distinct real roots</td></tr>
      <tr><td>b² − 4ac = 0</td><td>One repeated real root</td></tr>
      <tr><td>b² − 4ac &lt; 0</td><td>No real roots (complex)</td></tr>
    </tbody>
  </table>
</div>
    `,
    content:
      'ax² + bx + c = 0. Solve by factorisation, quadratic formula x = (–b ± √(b²–4ac)) / 2a, or completing the square. The discriminant b²–4ac tells you the nature of roots.',
  },
  {
    topic: 'Probability',
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Probability</span> measures how likely an event is to occur. It always falls between 0 (impossible) and 1 (certain).
</div>
<h3 class="learn-subheading">Basic Formula</h3>
<div class="learn-formula-list">
  <div class="learn-formula"><span class="learn-formula-label">P(Event) =</span> Number of favourable outcomes / Total possible outcomes</div>
  <div class="learn-formula"><span class="learn-formula-label">P(A or B) =</span> P(A) + P(B) − P(A and B)</div>
  <div class="learn-formula"><span class="learn-formula-label">P(A and B) =</span> P(A) × P(B) &nbsp;<em>[for independent events]</em></div>
  <div class="learn-formula"><span class="learn-formula-label">P(not A) =</span> 1 − P(A)</div>
</div>
<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>WAEC Tip:</strong> The sum of all probabilities in a sample space always equals 1. Use this to check your answers.</span>
</div>
    `,
    content:
      'P(event) = favourable outcomes / total possible outcomes. P(A or B) = P(A) + P(B) – P(A and B). P(A and B) = P(A) × P(B) for independent events. Sum of all probabilities = 1.',
  },
  {
    topic: 'Mensuration',
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Mensuration</span> is the branch of mathematics dealing with measurement of geometric figures — their length, area, and volume.
</div>
<h3 class="learn-subheading">2D Shape Formulas</h3>
<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Shape</th><th>Area</th><th>Perimeter</th></tr></thead>
    <tbody>
      <tr><td>Circle</td><td>πr²</td><td>2πr</td></tr>
      <tr><td>Triangle</td><td>½ × base × height</td><td>a + b + c</td></tr>
      <tr><td>Rectangle</td><td>l × w</td><td>2(l + w)</td></tr>
      <tr><td>Square</td><td>s²</td><td>4s</td></tr>
      <tr><td>Trapezium</td><td>½(a+b)×h</td><td>a+b+c+d</td></tr>
    </tbody>
  </table>
</div>
<h3 class="learn-subheading">3D Shape Formulas</h3>
<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Shape</th><th>Volume</th><th>Surface Area</th></tr></thead>
    <tbody>
      <tr><td>Cylinder</td><td>πr²h</td><td>2πr(r+h)</td></tr>
      <tr><td>Cone</td><td>⅓πr²h</td><td>πr(r+l) where l=slant height</td></tr>
      <tr><td>Sphere</td><td>⁴⁄₃πr³</td><td>4πr²</td></tr>
      <tr><td>Cuboid</td><td>l×b×h</td><td>2(lb+bh+lh)</td></tr>
    </tbody>
  </table>
</div>
<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>WAEC Tip:</strong> Always write out the formula first, substitute values, then calculate. This avoids errors and earns method marks even if the final answer is wrong.</span>
</div>
    `,
    content:
      'Circle: Area = πr², Circumference = 2πr. Triangle: Area = ½ × base × height. Cylinder: Volume = πr²h. Cone: Volume = ⅓πr²h. Sphere: Volume = 4/3πr³.',
  },
];
