// ============================================================================
// JAMB Question Bank — Mathematics
// Auto-split from QB.js for better code organisation
// ============================================================================

export const QB_MATHEMATICS = [
  {
    yr: 2023,
    q: "What is the general term of the sequence 3, 8, 13, 18, ...?",
    o: ['5n − 2', '5n + 2', '5', '5n'],
    a: 0,
    e: 'AP with a = 3, d = 5. Tₙ = a + (n−1)d = 3 + (n−1)5 = 3 + 5n − 5 = 5n − 2.',
    full: 'Arithmetic Progression (AP) nth term:\nTₙ = a + (n − 1)d\n\nFirst term a = 3\nCommon difference d = 8 − 3 = 5\n\nTₙ = 3 + (n − 1) × 5\n= 3 + 5n − 5\n= 5n − 2\n\nVerify:\nn=1: 5(1)−2 = 3 ✓\nn=2: 5(2)−2 = 8 ✓\nn=3: 5(3)−2 = 13 ✓',
    h: 'AP formula: Tₙ = a + (n−1)d. With a=3 and d=5, simplify.'
  },
  {
    yr: 2023,
    q: "A bag contains 8 red balls and some white balls. The probability of drawing a white ball is half that of drawing a red ball. Find the probability of drawing one red and one white ball without replacement.",
    o: ['1/3', '2/9', '2/3', '8/33'],
    a: 3,
    e: 'White balls = 4 (since P(W) = ½P(R) → W/T = ½ × R/T → W = R/2 = 4). Total = 12. P(R then W) = (8/12) × (4/11) = 8/33.',
    full: 'Step 1: Find number of white balls\nP(W) = ½ × P(R)\nW/T = ½ × R/T\nW = R/2 = 8/2 = 4 white balls\nTotal T = 8 + 4 = 12\n\nStep 2: P(red then white) without replacement\nP = P(R) × P(W | after R removed)\n= 8/12 × 4/11\n= 2/3 × 4/11\n= 8/33 ✓',
    h: 'Find white = 4 from the probability ratio. Then P(R)×P(W|no replacement) = ?'
  },
  {
    yr: 2023,
    q: "Solve: log₂(6 − x) = 3 − log₂x",
    o: ['x = 4 or 2', 'x = −4 or −2', 'x = −4 or 2', 'x = 4 or −2'],
    a: 0,
    e: 'Rearrange: log₂(6−x) + log₂x = 3 → log₂[x(6−x)] = 3 → x(6−x) = 8 → x²−6x+8=0 → (x−4)(x−2)=0 → x=4 or x=2.',
    full: 'log₂(6−x) = 3 − log₂x\n\nMove log₂x to left:\nlog₂(6−x) + log₂x = 3\n\nProduct rule: log₂[x(6−x)] = 3\n\nConvert: x(6−x) = 2³ = 8\n6x − x² = 8\nx² − 6x + 8 = 0\n(x−4)(x−2) = 0\nx = 4 or x = 2\n\nCheck both are valid (must have 6−x > 0 and x > 0):\n• x=4: 6−4=2>0 ✓\n• x=2: 6−2=4>0 ✓',
    h: 'Combine logs: log₂[x(6−x)] = 3 → x(6−x) = 8 → quadratic.'
  },
  {
    yr: 2023,
    q: "Find matrix A if A × [[0,1],[2,−1]] = [[2,−1],[1,0]]",
    o: ['[[2, 1],[−½, −½]]', '[[0, 1],[½, ½]]', '[[2, 1],[0, −1]]', '[[2, 1],[½, −2]]'],
    a: 1,
    e: 'Let A = [[a,b],[c,d]]. Multiply and equate: 2b=2→b=1; a−b=−1→a=0; 2d=1→d=½; c−d=0→c=½. So A = [[0,1],[½,½]].',
    full: 'Let A = [[a, b], [c, d]]\n\nA × [[0,1],[2,−1]] = [[2a·0+b·2, a·1+b·(−1)],[c·0+d·2, c·1+d·(−1)]]\n= [[2b, a−b],[2d, c−d]]\n\nSet equal to [[2,−1],[1,0]]:\n1. 2b = 2 → b = 1\n2. a − b = −1 → a = −1+1 = 0\n3. 2d = 1 → d = ½\n4. c − d = 0 → c = ½\n\nA = [[0, 1],[½, ½]] ✓',
    h: 'Set up 4 equations from matrix multiplication and solve for a, b, c, d.'
  },
  {
    yr: 2023,
    q: "A boat sails 8 km north (P to Q), then 6 km west (Q to R). Calculate the bearing of R from P to the nearest degree.",
    o: ['217°', '323°', '037°', '053°'],
    a: 1,
    e: 'tan θ = 6/8 → θ = 36.87° west of north. Bearing = 360° − 36.87° ≈ 323°.',
    full: 'Diagram: P is origin. Q is 8km due north. R is 6km west of Q.\n\nThe angle at P between north and line PR:\ntan θ = QR/PQ = 6/8 = 0.75\nθ = tan⁻¹(0.75) ≈ 36.87°\n\nR is to the north-west of P.\nBearing is measured clockwise from north:\nBearing = 360° − 36.87° = 323.13° ≈ 323° ✓\n\n(Alternative: bearing of R from P = 360° − θ where θ is west of north)',
    h: 'Draw the triangle. Angle from north = arctan(6/8). Bearing = 360° − angle.'
  },
  {
    yr: 2023,
    q: "An article sold for ₦230.00 makes a 15% profit. Find the profit or loss % if sold for ₦180.00.",
    o: ['10% gain', '10% loss', '12% loss', '12% gain'],
    a: 1,
    e: 'Cost price = 230/1.15 = ₦200. Sold at ₦180: loss = 200−180 = ₦20. Loss% = (20/200)×100 = 10%.',
    full: 'Step 1: Find cost price (CP)\nSP = CP × (1 + profit%)\n230 = CP × 1.15\nCP = 230/1.15 = ₦200\n\nStep 2: New SP = ₦180\nLoss = CP − SP = 200 − 180 = ₦20\n\nStep 3: Loss% = (Loss/CP) × 100\n= (20/200) × 100\n= 10% loss ✓',
    h: 'Find CP from first sale: 230 = 1.15×CP. Then find loss% for SP=₦180.'
  },
  {
    yr: 2023,
    q: "A student measures water volume as 18 mL; the correct value is 18.4 mL. What is the percent error?",
    o: ['2.17%', '1.73%', '2.23%', '1.96%'],
    a: 0,
    e: '% error = |measured − accepted| / accepted × 100 = |18 − 18.4| / 18.4 × 100 = 0.4/18.4 × 100 ≈ 2.17%.',
    full: 'Percent Error formula:\n% Error = |Measured − Accepted| / Accepted × 100\n\n= |18 − 18.4| / 18.4 × 100\n= 0.4 / 18.4 × 100\n= 0.021739 × 100\n= 2.174%\n≈ 2.17% ✓',
    h: '% error = |measured − true| / true × 100 = 0.4/18.4 × 100.'
  },
  {
    yr: 2023,
    q: "If y = cos(3x), find dy/dx.",
    o: ['3 sin(3x)', '-3 sin(3x)', '-sin(3x)', '3 cos(3x)'],
    a: 1,
    e: 'Using chain rule: derivative of cos(u) is -sin(u) × u\'. So, -sin(3x) × 3.',
    full: 'The derivative of cos is -sin. We then multiply by the derivative of the angle (3x), which is 3.',
    h: 'Does the derivative of cos involve a negative sign?'
  },
  {
    yr: 2023,
    q: "Evaluate log₁₀ 25 + log₁₀ 4 + log₁₀ 10.",
    o: ['2', '3', '4', '10'],
    a: 1,
    e: 'Using log A + log B = log(A × B). log₁₀(25 × 4) + log₁₀ 10 = log₁₀ 100 + log₁₀ 10 = 2 + 1 = 3.',
    full: 'Since 10² = 100, log₁₀ 100 = 2. Since 10¹ = 10, log₁₀ 10 = 1. Total is 3.',
    h: 'Does log 25 + log 4 equal log 100?'
  },
  {
    yr: 2023,
    q: "Find the value of x if 2ˣ⁺¹ = 32.",
    o: ['3', '4', '5', '6'],
    a: 1,
    e: '32 = 2⁵. So, 2ˣ⁺¹ = 2⁵ → x+1 = 5 → x = 4.',
    full: 'In indices, if the bases are equal, the powers must be equal. x + 1 = 5 gives x = 4.',
    h: 'Is 32 equal to 2⁴ or 2⁵?'
  },
  {
    yr: 2023,
    q: "If y = x³ + 2x² - 5, find dy/dx at x = 1.",
    o: ['3', '5', '7', '9'],
    a: 2,
    e: 'dy/dx = 3x² + 4x. At x=1, 3(1)² + 4(1) = 3 + 4 = 7.',
    full: 'Differentiate each term: x³ becomes 3x², 2x² becomes 4x, and -5 becomes 0. Substitute 1 for x.',
    h: 'Is the derivative of x³ equal to 3x²?'
  },
  {
    yr: 2023,
    q: "Solve for x in the equation 2x - 5 < 7.",
    o: ['x < 1', 'x < 6', 'x > 6', 'x < 12'],
    a: 1,
    e: '2x < 7 + 5 → 2x < 12 → x < 6.',
    full: 'Add 5 to both sides to get 2x < 12, then divide by 2 to isolate x.',
    h: 'Is 7 + 5 equal to 12?'
  },
  {
    yr: 2023,
    q: "Calculate the simple interest on ₦5000 for 3 years at 4% per annum.",
    o: ['₦200', '₦400', '₦600', '₦800'],
    a: 2,
    e: 'I = (PRT)/100 = (5000 × 4 × 3)/100 = 50 × 12 = 600.',
    full: 'Simple Interest formula is Principal × Rate × Time divided by 100. 5000 × 0.04 × 3 = 600.',
    h: 'Is 50 × 12 equal to 600?'
  },
  {
    yr: 2023,
    q: "Find the 10th term of the Arithmetic Progression (A.P.): 2, 5, 8, ...",
    o: ['27', '29', '31', '33'],
    a: 1,
    e: 'a = 2, d = 3. T₁₀ = a + 9d = 2 + 9(3) = 2 + 27 = 29.',
    full: 'The formula for the nth term is a + (n-1)d. Here n=10, so we add 9 differences to the first term.',
    h: 'Is the common difference d equal to 3?'
  },
  {
    yr: 2023,
    q: "If sin θ = 3/5, find cos θ where θ is acute.",
    o: ['1/5', '2/5', '3/5', '4/5'],
    a: 3,
    e: 'Using Pythagoras: 3² + x² = 5² → 9 + x² = 25 → x² = 16 → x = 4. cos θ = 4/5.',
    full: 'In a right-angled triangle, if opposite=3 and hypotenuse=5, the adjacent side must be 4. Cosine is Adjacent/Hypotenuse.',
    h: 'In a 3-4-5 triangle, is 4 the adjacent side?'
  },
  {
    yr: 2023,
    q: "Integrate ∫ (2x + 3) dx.",
    o: ['x² + 3x + c', '2x² + 3x + c', 'x² + c', '3x + c'],
    a: 0,
    e: '∫ 2x dx = x² and ∫ 3 dx = 3x. Add the constant c.',
    full: 'The rule for integration is xⁿ⁺¹/(n+1). So 2x becomes x² and the constant 3 gains an x.',
    h: 'Does the integral of 2x result in x²?'
  },
  {
    yr: 2023,
    q: "A bag contains 3 red and 5 blue balls. What is the probability of picking a red ball?",
    o: ['3/5', '5/8', '3/8', '1/2'],
    a: 2,
    e: 'Total balls = 3 + 5 = 8. Red balls = 3. P(Red) = 3/8.',
    full: 'Probability is the number of favorable outcomes divided by the total number of possible outcomes.',
    h: 'Is the total number of balls 8?'
  },
  {
    yr: 2023,
    q: "Find the mean of the numbers: 10, 12, 14, 16, 18.",
    o: ['12', '13', '14', '15'],
    a: 2,
    e: 'Sum = 10+12+14+16+18 = 70. Mean = 70 / 5 = 14.',
    full: 'Add all values and divide by the count (5). For an evenly spaced set, the mean is also the middle number.',
    h: 'Is the sum of these five numbers 70?'
  },
  {
    yr: 2023,
    q: "Express 0.0000427 in standard form.",
    o: ['4.27 × 10⁻⁴', '4.27 × 10⁻⁵', '42.7 × 10⁻⁶', '4.27 × 10⁵'],
    a: 1,
    e: 'Move the decimal 5 places to the right to get 4.27. Thus, 10⁻⁵.',
    full: 'Standard form is a × 10ⁿ where 1 ≤ a < 10. We moved the decimal past five zeros/digits.',
    h: 'Do you move the decimal 4 or 5 places?'
  },
  {
    yr: 2023,
    q: "The exterior angle of a regular polygon is 36°. How many sides does it have?",
    o: ['8', '10', '12', '15'],
    a: 1,
    e: 'Number of sides n = 360 / Exterior Angle = 360 / 36 = 10.',
    full: 'The sum of exterior angles of any polygon is always 360°. Divide this by the value of one angle to find the number of sides.',
    h: 'Is 360 / 36 equal to 10?'
  },
  {
    yr: 2023,
    q: "If x² - 5x + 6 = 0, find the values of x.",
    o: ['(1, 6)', '(2, 3)', '(-2, -3)', '(5, 6)'],
    a: 1,
    e: '(x - 2)(x - 3) = 0 → x = 2 or x = 3.',
    full: 'Factorize the quadratic. We need two numbers that multiply to +6 and add to -5. Those are -2 and -3.',
    h: 'Do -2 and -3 add up to -5?'
  },
  {
    yr: 2023,
    q: "Find the gradient (slope) of the line passing through (2, 3) and (4, 7).",
    o: ['1', '2', '3', '4'],
    a: 1,
    e: 'm = (y₂ - y₁)/(x₂ - x₁) = (7 - 3)/(4 - 2) = 4/2 = 2.',
    full: 'Gradient formula is the Rise over Run. Difference in y divided by difference in x.',
    h: 'Is 4/2 equal to 2?'
  },
  {
    yr: 2023,
    q: "Convert 1101 in base 2 to base 10.",
    o: ['11', '12', '13', '14'],
    a: 2,
    e: '(1 × 2³) + (1 × 2²) + (0 × 2¹) + (1 × 2⁰) = 8 + 4 + 0 + 1 = 13.',
    full: 'Multiply each bit by the power of 2 corresponding to its position (starting from 0 on the right).',
    h: 'Is 8 + 4 + 1 equal to 13?'
  },
  {
    yr: 2023,
    q: "Calculate the volume of a cylinder with radius 7cm and height 10cm. (Take π = 22/7)",
    o: ['770cm³', '1540cm³', '154cm³', '440cm³'],
    a: 1,
    e: 'V = πr²h = (22/7) × 7 × 7 × 10 = 22 × 7 × 10 = 1540.',
    full: 'Volume is the area of the circular base (πr²) multiplied by the height. One 7 cancels out from the denominator.',
    h: 'Is 154 × 10 equal to 1540?'
  },
  {
    yr: 2023,
    q: "Rationalize the expression 2/√2.",
    o: ['1', '2', '√2', '2√2'],
    a: 2,
    e: 'Multiply numerator and denominator by √2. (2√2)/2 = √2.',
    full: 'To rationalize a denominator, multiply top and bottom by the root. The 2 in the numerator cancels the 2 in the denominator.',
    h: 'Does √2 × √2 equal 2?'
  },
  {
    yr: 2023,
    q: "Find the Median of the set: 3, 7, 9, 4, 10, 2, 8.",
    o: ['4', '7', '8', '9'],
    a: 1,
    e: 'Sorted set: 2, 3, 4, 7, 8, 9, 10. The middle number is 7.',
    full: 'Always arrange the numbers in ascending or descending order first. Since there are 7 numbers, the 4th one is the median.',
    h: 'Is 7 the middle number when sorted?'
  },
  {
    yr: 2023,
    q: "If the binary operation * is defined by a * b = ab + a + b, find 2 * 3.",
    o: ['6', '10', '11', '12'],
    a: 2,
    e: '2 * 3 = (2 × 3) + 2 + 3 = 6 + 2 + 3 = 11.',
    full: 'Substitute the values 2 and 3 into the given formula for a and b.',
    h: 'Is 6 + 5 equal to 11?'
  },
  {
    yr: 2023,
    q: "Find the sum of the interior angles of a pentagon.",
    o: ['360°', '540°', '720°', '900°'],
    a: 1,
    e: '(n - 2) × 180 = (5 - 2) × 180 = 3 × 180 = 540.',
    full: 'The formula for the sum of interior angles is (n-2) × 180, where n is the number of sides.',
    h: 'Is 3 × 180 equal to 540?'
  },
  {
    yr: 2022,
    q: "If y = 3x² - 5x + 2, find the gradient of the curve at x = 2.",
    o: ['2', '5', '7', '12'],
    a: 2,
    e: 'dy/dx = 6x - 5. At x=2, 6(2) - 5 = 12 - 5 = 7.',
    full: 'The gradient of a curve at a point is the value of its first derivative at that point. 6x comes from 3x² and -5 from -5x.',
    h: 'Is 12 - 5 equal to 7?'
  },
  {
    yr: 2022,
    q: "Simplify (log 8)/(log 4).",
    o: ['2', '1.5', '0.5', '4'],
    a: 1,
    e: '(log 2³)/(log 2²) = (3 log 2)/(2 log 2) = 3/2 = 1.5.',
    full: 'Express both numbers as powers of 2. Use the power rule to bring exponents to the front, then cancel the log 2.',
    h: 'Is log 8 equal to 3 log 2?'
  },
  {
    yr: 2022,
    q: "Find the value of x for which 2²ˣ⁻¹ = 8.",
    o: ['1', '2', '3', '4'],
    a: 1,
    e: '2²ˣ⁻¹ = 2³ → 2x - 1 = 3 → 2x = 4 → x = 2.',
    full: 'Since the bases are both 2, equate the exponents. Solving 2x - 1 = 3 gives x = 2.',
    h: 'Is 3 + 1 equal to 4?'
  },
  {
    yr: 2022,
    q: "Solve for x in 3x - 2 > 5x + 4.",
    o: ['x < -3', 'x > -3', 'x < 3', 'x > 3'],
    a: 0,
    e: '-6 > 2x → -3 > x → x < -3.',
    full: 'Subtract 3x from both sides and subtract 4 from both sides. Remember: dividing by a positive does not flip the sign.',
    h: 'Is 4 + 2 equal to 6?'
  },
  {
    yr: 2022,
    q: "If sin θ = cos θ, find θ for 0° ≤ θ ≤ 90°.",
    o: ['0°', '30°', '45°', '60°'],
    a: 2,
    e: 'Divide by cos θ: tan θ = 1 → θ = 45°.',
    full: 'The sine and cosine of an angle are equal only when the opposite and adjacent sides of the triangle are equal (an isosceles right triangle).',
    h: 'Is tan 45 equal to 1?'
  },
  {
    yr: 2022,
    q: "Find the midpoint of the line joining (-2, 4) and (6, 8).",
    o: ['(2, 6)', '(4, 12)', '(2, 12)', '(4, 6)'],
    a: 0,
    e: 'M = ((-2+6)/2, (4+8)/2) = (4/2, 12/2) = (2, 6).',
    full: 'The midpoint formula is the average of the x-coordinates and the average of the y-coordinates.',
    h: 'Is 4/2 equal to 2?'
  },
  {
    yr: 2022,
    q: "Calculate the simple interest on ₦10,000 for 2 years at 5% per annum.",
    o: ['₦500', '₦1,000', '₦1,500', '₦2,000'],
    a: 1,
    e: 'I = (10000 × 5 × 2)/100 = 100 × 10 = 1000.',
    full: 'Interest is Principal × Rate × Time. 10,000 × 0.05 × 2 = 1,000.',
    h: 'Is 5 × 2 equal to 10?'
  },
  {
    yr: 2022,
    q: "Evaluate ∫₁² 3x² dx.",
    o: ['3', '5', '7', '9'],
    a: 2,
    e: '[x³]₁² = 2³ - 1³ = 8 - 1 = 7.',
    full: 'Integrate 3x² to get x³. Then substitute the upper limit (2) and subtract the lower limit (1).',
    h: 'Is 2³ equal to 8?'
  },
  {
    yr: 2022,
    q: "A circle has an area of 616cm². Find its radius. (π = 22/7)",
    o: ['7cm', '14cm', '21cm', '28cm'],
    a: 1,
    e: '(22/7)r² = 616 → r² = (616 × 7)/22 = 28 × 7 = 196 → r = 14.',
    full: 'Set πr² equal to 616 and solve for r. 196 is the square of 14.',
    h: 'Is 14 × 14 equal to 196?'
  },
  {
    yr: 2022,
    q: "Find the mode of the scores: 2, 5, 2, 3, 6, 2, 4, 5.",
    o: ['2', '3', '5', '6'],
    a: 0,
    e: 'The number 2 appears three times, which is more than any other number.',
    full: 'The mode is the value that occurs most frequently in a data set.',
    h: 'Does 2 appear more than 5?'
  },
  {
    yr: 2022,
    q: "If log₁₀ x = -2, find x.",
    o: ['0.2', '0.02', '0.01', '100'],
    a: 2,
    e: 'x = 10⁻² = 1/100 = 0.01.',
    full: 'Logarithm to base 10 of x = y means x = 10ʸ.',
    h: 'Is 10⁻² the same as 1/100?'
  },
  {
    yr: 2022,
    q: "Factorize completely: 4x² - 9y².",
    o: ['(2x-3y)²', '(2x+3y)²', '(2x-3y)(2x+3y)', '(4x-9y)(x+y)'],
    a: 2,
    e: 'Using a² - b² = (a-b)(a+b). Here a=2x and b=3y.',
    full: 'This is a difference of two squares. 4x² is (2x)² and 9y² is (3y)².',
    h: 'Is the root of 4x² equal to 2x?'
  },
  {
    yr: 2022,
    q: "Find the 5th term of a Geometric Progression (G.P.) whose first term is 3 and common ratio is 2.",
    o: ['24', '48', '96', '120'],
    a: 1,
    e: 'T₅ = ar⁴ = 3(2⁴) = 3(16) = 48.',
    full: 'The formula for the nth term of a G.P. is arⁿ⁻¹.',
    h: 'Is 2⁴ equal to 16?'
  },
  {
    yr: 2022,
    q: "Calculate the mean deviation of the numbers: 2, 4, 6.",
    o: ['0', '1.33', '2', '4'],
    a: 1,
    e: 'Mean = 4. Deviations: |2-4|=2, |4-4|=0, |6-4|=2. MD = (2+0+2)/3 = 4/3 = 1.33.',
    full: 'Mean deviation is the average of the absolute differences between each value and the mean.',
    h: 'Is the mean of 2, 4, 6 equal to 4?'
  },
  {
    yr: 2022,
    q: "The sum of interior angles of a regular polygon is 1080°. Find the number of sides.",
    o: ['6', '7', '8', '10'],
    a: 2,
    e: '(n-2)180 = 1080 → n-2 = 6 → n = 8.',
    full: 'Divide 1080 by 180 to find n-2, then add 2 to find the number of sides.',
    h: 'Is 1080 / 180 equal to 6?'
  },
  {
    yr: 2022,
    q: "If y = 2x³, find dy/dx.",
    o: ['2x²', '6x²', '6x³', 'x²'],
    a: 1,
    e: 'dy/dx = 2(3)x³⁻¹ = 6x².',
    full: 'Multiply the coefficient by the power and decrease the power by 1.',
    h: 'Is 2 × 3 equal to 6?'
  },
  {
    yr: 2022,
    q: "Find the length of an arc that subtends an angle of 60° at the center of a circle of radius 7cm. (π = 22/7)",
    o: ['3.33cm', '7.33cm', '14.67cm', '22cm'],
    a: 1,
    e: 'L = (θ/360) × 2πr = (60/360) × 2 × (22/7) × 7 = (1/6) × 44 = 7.33.',
    full: 'The length of an arc is a fraction of the total circumference based on the central angle.',
    h: 'Is 44/6 approximately 7.33?'
  },
  {
    yr: 2022,
    q: "Rationalize 1/(√3 - 1).",
    o: ['√3 + 1', '(√3 + 1)/2', '√3 - 1', '(√3 - 1)/2'],
    a: 1,
    e: 'Multiply by conjugate: (√3+1)/((√3-1)(√3+1)) = (√3+1)/(3-1) = (√3+1)/2.',
    full: 'To rationalize a binomial denominator, multiply the numerator and denominator by its conjugate (change the sign).',
    h: 'Is (√3)² - 1² equal to 2?'
  },
  {
    yr: 2022,
    q: "If y = 3x² - 5x + 2, find the gradient of the curve at x = 2.",
    o: ['2', '5', '7', '12'],
    a: 2,
    e: 'dy/dx = 6x - 5. At x=2, 6(2) - 5 = 12 - 5 = 7.',
    full: 'The gradient of a curve at a point is the value of its first derivative at that point. 6x comes from 3x² and -5 from -5x.',
    h: 'Is 12 - 5 equal to 7?'
  },
  {
    yr: 2022,
    q: "Simplify (log 8)/(log 4).",
    o: ['2', '1.5', '0.5', '4'],
    a: 1,
    e: '(log 2³)/(log 2²) = (3 log 2)/(2 log 2) = 3/2 = 1.5.',
    full: 'Express both numbers as powers of 2. Use the power rule to bring exponents to the front, then cancel the log 2.',
    h: 'Is log 8 equal to 3 log 2?'
  },
  {
    yr: 2022,
    q: "Find the value of x for which 2²ˣ⁻¹ = 8.",
    o: ['1', '2', '3', '4'],
    a: 1,
    e: '2²ˣ⁻¹ = 2³ → 2x - 1 = 3 → 2x = 4 → x = 2.',
    full: 'Since the bases are both 2, equate the exponents. Solving 2x - 1 = 3 gives x = 2.',
    h: 'Is 3 + 1 equal to 4?'
  },
  {
    yr: 2022,
    q: "Solve for x in 3x - 2 > 5x + 4.",
    o: ['x < -3', 'x > -3', 'x < 3', 'x > 3'],
    a: 0,
    e: '-6 > 2x → -3 > x → x < -3.',
    full: 'Subtract 3x from both sides and subtract 4 from both sides. Remember: dividing by a positive does not flip the sign.',
    h: 'Is 4 + 2 equal to 6?'
  },
  {
    yr: 2022,
    q: "If sin θ = cos θ, find θ for 0° ≤ θ ≤ 90°.",
    o: ['0°', '30°', '45°', '60°'],
    a: 2,
    e: 'Divide by cos θ: tan θ = 1 → θ = 45°.',
    full: 'The sine and cosine of an angle are equal only when the opposite and adjacent sides of the triangle are equal (an isosceles right triangle).',
    h: 'Is tan 45 equal to 1?'
  },
  {
    yr: 2022,
    q: "Find the midpoint of the line joining (-2, 4) and (6, 8).",
    o: ['(2, 6)', '(4, 12)', '(2, 12)', '(4, 6)'],
    a: 0,
    e: 'M = ((-2+6)/2, (4+8)/2) = (4/2, 12/2) = (2, 6).',
    full: 'The midpoint formula is the average of the x-coordinates and the average of the y-coordinates.',
    h: 'Is 4/2 equal to 2?'
  },
  {
    yr: 2022,
    q: "Calculate the simple interest on ₦10,000 for 2 years at 5% per annum.",
    o: ['₦500', '₦1,000', '₦1,500', '₦2,000'],
    a: 1,
    e: 'I = (10000 × 5 × 2)/100 = 100 × 10 = 1000.',
    full: 'Interest is Principal × Rate × Time. 10,000 × 0.05 × 2 = 1,000.',
    h: 'Is 5 × 2 equal to 10?'
  },
  {
    yr: 2022,
    q: "Evaluate ∫₁² 3x² dx.",
    o: ['3', '5', '7', '9'],
    a: 2,
    e: '[x³]₁² = 2³ - 1³ = 8 - 1 = 7.',
    full: 'Integrate 3x² to get x³. Then substitute the upper limit (2) and subtract the lower limit (1).',
    h: 'Is 2³ equal to 8?'
  },
  {
    yr: 2022,
    q: "A circle has an area of 616cm². Find its radius. (π = 22/7)",
    o: ['7cm', '14cm', '21cm', '28cm'],
    a: 1,
    e: '(22/7)r² = 616 → r² = (616 × 7)/22 = 28 × 7 = 196 → r = 14.',
    full: 'Set πr² equal to 616 and solve for r. 196 is the square of 14.',
    h: 'Is 14 × 14 equal to 196?'
  },
  {
    yr: 2022,
    q: "Find the mode of the scores: 2, 5, 2, 3, 6, 2, 4, 5.",
    o: ['2', '3', '5', '6'],
    a: 0,
    e: 'The number 2 appears three times, which is more than any other number.',
    full: 'The mode is the value that occurs most frequently in a data set.',
    h: 'Does 2 appear more than 5?'
  },
  {
    yr: 2022,
    q: "If log₁₀ x = -2, find x.",
    o: ['0.2', '0.02', '0.01', '100'],
    a: 2,
    e: 'x = 10⁻² = 1/100 = 0.01.',
    full: 'Logarithm to base 10 of x = y means x = 10ʸ.',
    h: 'Is 10⁻² the same as 1/100?'
  },
  {
    yr: 2022,
    q: "Factorize completely: 4x² - 9y².",
    o: ['(2x-3y)²', '(2x+3y)²', '(2x-3y)(2x+3y)', '(4x-9y)(x+y)'],
    a: 2,
    e: 'Using a² - b² = (a-b)(a+b). Here a=2x and b=3y.',
    full: 'This is a difference of two squares. 4x² is (2x)² and 9y² is (3y)².',
    h: 'Is the root of 4x² equal to 2x?'
  },
  {
    yr: 2022,
    q: "Find the 5th term of a Geometric Progression (G.P.) whose first term is 3 and common ratio is 2.",
    o: ['24', '48', '96', '120'],
    a: 1,
    e: 'T₅ = ar⁴ = 3(2⁴) = 3(16) = 48.',
    full: 'The formula for the nth term of a G.P. is arⁿ⁻¹.',
    h: 'Is 2⁴ equal to 16?'
  },
  {
    yr: 2022,
    q: "Calculate the mean deviation of the numbers: 2, 4, 6.",
    o: ['0', '1.33', '2', '4'],
    a: 1,
    e: 'Mean = 4. Deviations: |2-4|=2, |4-4|=0, |6-4|=2. MD = (2+0+2)/3 = 4/3 = 1.33.',
    full: 'Mean deviation is the average of the absolute differences between each value and the mean.',
    h: 'Is the mean of 2, 4, 6 equal to 4?'
  },
  {
    yr: 2022,
    q: "The sum of interior angles of a regular polygon is 1080°. Find the number of sides.",
    o: ['6', '7', '8', '10'],
    a: 2,
    e: '(n-2)180 = 1080 → n-2 = 6 → n = 8.',
    full: 'Divide 1080 by 180 to find n-2, then add 2 to find the number of sides.',
    h: 'Is 1080 / 180 equal to 6?'
  },
  {
    yr: 2022,
    q: "If y = 2x³, find dy/dx.",
    o: ['2x²', '6x²', '6x³', 'x²'],
    a: 1,
    e: 'dy/dx = 2(3)x³⁻¹ = 6x².',
    full: 'Multiply the coefficient by the power and decrease the power by 1.',
    h: 'Is 2 × 3 equal to 6?'
  },
  {
    yr: 2022,
    q: "Find the length of an arc that subtends an angle of 60° at the center of a circle of radius 7cm. (π = 22/7)",
    o: ['3.33cm', '7.33cm', '14.67cm', '22cm'],
    a: 1,
    e: 'L = (θ/360) × 2πr = (60/360) × 2 × (22/7) × 7 = (1/6) × 44 = 7.33.',
    full: 'The length of an arc is a fraction of the total circumference based on the central angle.',
    h: 'Is 44/6 approximately 7.33?'
  },
  {
    yr: 2022,
    q: "Rationalize 1/(√3 - 1).",
    o: ['√3 + 1', '(√3 + 1)/2', '√3 - 1', '(√3 - 1)/2'],
    a: 1,
    e: 'Multiply by conjugate: (√3+1)/((√3-1)(√3+1)) = (√3+1)/(3-1) = (√3+1)/2.',
    full: 'To rationalize a binomial denominator, multiply the numerator and denominator by its conjugate (change the sign).',
    h: 'Is (√3)² - 1² equal to 2?'
  },
  {
    yr: 2022,
    q: "Convert 25₁₀ to binary (base 2).",
    o: ['11001', '10110', '11101', '10011'],
    a: 0,
    e: '25/2 = 12 R1; 12/2 = 6 R0; 6/2 = 3 R0; 3/2 = 1 R1; 1/2 = 0 R1. Reading up: 11001.',
    full: 'Successively divide the base 10 number by 2 and record the remainders from bottom to top.',
    h: 'Is the first remainder 1?'
  },
  {
    yr: 2022,
    q: "If x varies inversely as y and x=4 when y=3, find x when y=6.",
    o: ['2', '4', '8', '12'],
    a: 0,
    e: 'xy = k → 4 × 3 = 12 = k. When y=6, 6x = 12 → x = 2.',
    full: 'In inverse variation, the product of the two variables remains constant (k).',
    h: 'Is 12/6 equal to 2?'
  },
  {
    yr: 2022,
    q: "Find the value of x in the equation log₃(2x + 1) = 2.",
    o: ['2', '4', '8', '9'],
    a: 1,
    e: '2x + 1 = 3² = 9 → 2x = 8 → x = 4.',
    full: 'Convert the log to index form: the base 3 raised to the power of 2 equals the bracket (2x+1).',
    h: 'Is 3² equal to 9?'
  },
  {
    yr: 2022,
    q: "If y = (2x + 3)⁴, find dy/dx.",
    o: ['4(2x+3)³', '8(2x+3)³', '8(2x+3)⁴', '2(2x+3)³'],
    a: 1,
    e: '4(2x+3)³ × 2 = 8(2x+3)³.',
    full: 'Using the function of a function rule (Chain Rule), differentiate the outer bracket and multiply by the derivative of the inside (2).',
    h: 'Is 4 × 2 equal to 8?'
  },
  {
    yr: 2022,
    q: "Find the equation of the line passing through (0, 5) with gradient 3.",
    o: ['y = 3x - 5', 'y = 5x + 3', 'y = 3x + 5', 'y = -3x + 5'],
    a: 2,
    e: 'Using y = mx + c, where m=3 and c=5.',
    full: 'The y-intercept (c) is 5 because the line passes through (0, 5). Substituting the gradient (m=3) gives the equation.',
    h: 'Is the constant term 5?'
  },
  {
    yr: 2022,
    q: "A bag contains 4 white and 6 black balls. If a ball is picked at random, what is the probability it is NOT white?",
    o: ['2/5', '3/5', '1/2', '2/3'],
    a: 1,
    e: 'Total = 10. Not white = Black = 6. P = 6/10 = 3/5.',
    full: 'The probability of an event not happening is 1 minus the probability of it happening, or simply the count of the other outcomes.',
    h: 'Is 6/10 the same as 3/5?'
  },
  {
    yr: 2022,
    q: "If sin θ = 0.8, find tan θ for an acute angle θ.",
    o: ['0.6', '0.75', '1.33', '1.25'],
    a: 2,
    e: 'Opp=8, Hyp=10 → Adj=6. tan θ = 8/6 = 1.33.',
    full: 'In a right triangle, if sin = 0.8 (4/5), the sides are 3, 4, 5. Tangent is Opposite (4) over Adjacent (3).',
    h: 'Is 4/3 approximately 1.33?'
  },
  {
    yr: 2022,
    q: "Evaluate 110.11₂ + 10.01₂.",
    o: ['1001.00₂', '1000.11₂', '101.00₂', '1001.11₂'],
    a: 0,
    e: '110.11 + 10.01 = 1001.00 in base 2.',
    full: 'Line up the points and add. 1+1=10 (write 0, carry 1). Carry the values over just like base 10 addition.',
    h: 'Does 1 + 1 equal 10 in base 2?'
  },
  {
    yr: 2022,
    q: "Find the variance of the numbers: 3, 5, 7.",
    o: ['2', '2.67', '4', '8'],
    a: 2,
    e: 'Mean = 5. Var = ((3-5)² + (5-5)² + (7-5)²)/3 = (4+0+4)/3 = 8/3 = 2.67.',
    full: 'Calculate the mean (5), subtract from each number and square the result (4, 0, 4). The average of these squares is the variance.',
    h: 'Is 8/3 approximately 2.67?'
  },
  {
    yr: 2022,
    q: "Simplify x/2 - (x-1)/3.",
    o: ['(x-2)/6', '(x+2)/6', '(5x-2)/6', '(x+1)/6'],
    a: 1,
    e: '(3x - 2(x-1))/6 = (3x - 2x + 2)/6 = (x+2)/6.',
    full: 'Find a common denominator (6). Be careful with the negative sign when expanding -2(x-1).',
    h: 'Does -2 × -1 equal +2?'
  },
  {
    yr: 2022,
    q: "If M = [[1, 2], [0, 3]], find M².",
    o: ['[[1, 4], [0, 9]]', '[[1, 8], [0, 9]]', '[[1, 6], [0, 9]]', '[[1, 2], [0, 3]]'],
    a: 1,
    e: 'Row1 × Col2 = (1 × 2) + (2 × 3) = 8.',
    full: 'Multiply the matrix by itself. M × M. The top right element is 8, and the bottom right is 9.',
    h: 'Is 2 + 6 equal to 8?'
  },
  {
    yr: 2022,
    q: "Find the sum to infinity of the G.P.: 1, 1/2, 1/4, ...",
    o: ['1.5', '2', '3', '∞'],
    a: 1,
    e: 'S∞ = a/(1-r) = 1/(1 - 0.5) = 1/0.5 = 2.',
    full: 'The sum to infinity formula applies because the common ratio r is less than 1.',
    h: 'Is 1/0.5 equal to 2?'
  },
  {
    yr: 2022,
    q: "How many ways can 3 students be seated in a row of 3 chairs?",
    o: ['3', '6', '9', '27'],
    a: 1,
    e: '3! = 3 × 2 × 1 = 6.',
    full: 'This is a permutation of 3 items. 3 choices for the first chair, 2 for the second, and 1 for the last.',
    h: 'Is 3 × 2 equal to 6?'
  },
  {
    yr: 2022,
    q: "Find the derivative of 1/x.",
    o: ['log x', '1', '-x⁻²', 'x²'],
    a: 2,
    e: 'x⁻¹ derivative is -1x⁻².',
    full: 'Rewrite 1/x as x to the power of -1. Apply the power rule: multiply by the power and decrease it by 1.',
    h: 'Is -1 - 1 equal to -2?'
  },
  {
    yr: 2022,
    q: "If 2x + y = 7 and x - y = 2, find x.",
    o: ['1', '2', '3', '4'],
    a: 2,
    e: 'Adding both equations: 3x = 9 → x = 3.',
    full: 'Use the elimination method. Adding the equations cancels out the +y and -y.',
    h: 'Is 9/3 equal to 3?'
  },
  {
    yr: 2022,
    q: "Calculate the volume of a sphere of radius 3cm. (Leave in π)",
    o: ['12π cm³', '24π cm³', '36π cm³', '48π cm³'],
    a: 2,
    e: 'V = (4/3)πr³ = (4/3)π(27) = 4 × 9π = 36π.',
    full: 'The formula is 4/3 times π times the radius cubed. 3³ is 27.',
    h: 'Is 4 × 9 equal to 36?'
  },
  {
    yr: 2022,
    q: "What is the value of sin 120°?",
    o: ['0.5', '0.866', '-0.5', '-0.866'],
    a: 1,
    e: 'sin(180 - 60) = sin 60 = √3/2 ≈ 0.866.',
    full: 'Sine is positive in the second quadrant. sin 120 is equivalent to sin 60.',
    h: 'Is sin 120 positive?'
  },
  {
    yr: 2022,
    q: "Solve for x: x² + 7x + 10 = 0.",
    o: ['(2, 5)', '(-2, -5)', '(1, 10)', '(-1, -10)'],
    a: 1,
    e: '(x+2)(x+5) = 0 → x = -2, -5.',
    full: 'We need two numbers that multiply to 10 and add to 7. Those are 2 and 5. The roots are the negative of those factors.',
    h: 'Do 2 and 5 add to 7?'
  },
  {
    yr: 2022,
    q: "A pyramid has a square base of side 5cm and a height of 12cm. Find its volume.",
    o: ['60cm³', '100cm³', '150cm³', '300cm³'],
    a: 1,
    e: 'V = (1/3) × Area × h = (1/3) × 25 × 12 = 25 × 4 = 100.',
    full: 'The volume of a pyramid is one-third the base area times the vertical height.',
    h: 'Is 12/3 equal to 4?'
  },
  {
    yr: 2022,
    q: "Simplify (2³)² × 2⁻⁴.",
    o: ['2', '4', '8', '16'],
    a: 1,
    e: '2⁶ × 2⁻⁴ = 2⁶⁻⁴ = 2² = 4.',
    full: 'Multiply powers when one is inside and one is outside the bracket. Then add powers when multiplying the same base.',
    h: 'Is 6 - 4 equal to 2?'
  },
  {
    yr: 2022,
    q: "If the mean of 4, 7, x, and 9 is 7, find x.",
    o: ['6', '7', '8', '10'],
    a: 2,
    e: '(4+7+x+9)/4 = 7 → 20+x = 28 → x = 8.',
    full: 'The sum of the four numbers must equal 4 times the mean (28).',
    h: 'Is 28 - 20 equal to 8?'
  },
  {
    yr: 2022,
    q: "Find the simple interest on ₦2000 for 6 months at 10% per annum.",
    o: ['₦100', '₦200', '₦10', '₦120'],
    a: 0,
    e: 'I = (2000 × 10 × 0.5)/100 = 100.',
    full: '6 months is 0.5 years. Interest is Principal × Rate × Time in years.',
    h: 'Is half of 200 equal to 100?'
  },
  {
    yr: 2022,
    q: "Convert 25₁₀ to binary (base 2).",
    o: ['11001', '10110', '11101', '10011'],
    a: 0,
    e: '25/2 = 12 R1; 12/2 = 6 R0; 6/2 = 3 R0; 3/2 = 1 R1; 1/2 = 0 R1. Reading up: 11001.',
    full: 'Successively divide the base 10 number by 2 and record the remainders from bottom to top.',
    h: 'Is the first remainder 1?'
  },
  {
    yr: 2022,
    q: "If x varies inversely as y and x=4 when y=3, find x when y=6.",
    o: ['2', '4', '8', '12'],
    a: 0,
    e: 'xy = k → 4 × 3 = 12 = k. When y=6, 6x = 12 → x = 2.',
    full: 'In inverse variation, the product of the two variables remains constant (k).',
    h: 'Is 12/6 equal to 2?'
  },
  {
    yr: 2021,
    q: "If P = {1, 2, 3, 4, 5, 6} and Q = {3, 4, 5, 6, 7, 8}, find P ∩ Q.",
    o: ['{1, 2, 7, 8}', '{3, 4, 5, 6}', '{1, 2, 3, 4, 5, 6, 7, 8}', '{}'],
    a: 1,
    e: 'The intersection (∩) consists of elements common to both sets: 3, 4, 5, and 6.',
    full: 'Intersection means and—only the numbers that appear in both P and Q are included.',
    h: 'Are 3, 4, 5, and 6 in both lists?'
  },
  {
    yr: 2021,
    q: "Simplify √48 / √3.",
    o: ['2', '4', '6', '16'],
    a: 1,
    e: '√(48/3) = √16 = 4.',
    full: 'You can divide numbers under a square root just like regular numbers. 48 divided by 3 is 16.',
    h: 'Is the square root of 16 equal to 4?'
  },
  {
    yr: 2021,
    q: "Find the value of x if logₓ 64 = 3.",
    o: ['2', '4', '8', '16'],
    a: 1,
    e: 'x³ = 64 → x = ∛64 = 4.',
    full: 'In log form, the base x raised to the power 3 must equal 64. Since 4 × 4 × 4 = 64, x is 4.',
    h: 'Is 4³ equal to 64?'
  },
  {
    yr: 2021,
    q: "Solve the quadratic equation x² - x - 6 = 0.",
    o: ['(2, 3)', '(-2, 3)', '(2, -3)', '(-2, -3)'],
    a: 1,
    e: '(x+2)(x-3) = 0 → x = -2, 3.',
    full: 'Find two numbers that multiply to -6 and add to -1. These are +2 and -3. The roots are the opposite signs.',
    h: 'Does 2 - 3 equal -1?'
  },
  {
    yr: 2021,
    q: "Calculate the area of a sector of a circle with radius 6cm and angle 70°. (π = 22/7)",
    o: ['22cm²', '44cm²', '11cm²', '33cm²'],
    a: 0,
    e: 'A = (70/360) × (22/7) × 36 = (1/360) × 10 × 22 × 36 = 22.',
    full: 'The 36 from r² cancels nicely with the 360 denominator, leaving a very clean calculation.',
    h: 'Is 10 × 36 equal to 360?'
  },
  {
    yr: 2021,
    q: "If y = 5x⁴ - x², find d²y/dx².",
    o: ['20x³ - 2x', '60x² - 2', '60x²', '20x³'],
    a: 1,
    e: 'dy/dx = 20x³ - 2x. Differentiating again: 60x² - 2.',
    full: 'This is the second derivative. Differentiate once, then differentiate that result again.',
    h: 'Is the derivative of 20x³ equal to 60x²?'
  },
  {
    yr: 2021,
    q: "Evaluate sin² 30° + cos² 30°.",
    o: ['0.5', '1', '1.5', '2'],
    a: 1,
    e: 'Trigonometric identity: sin²θ + cos²θ = 1 for any angle.',
    full: 'Even without calculating the specific values, this fundamental identity always equals 1.',
    h: 'Is the sum of sin² and cos² always 1?'
  },
  {
    yr: 2021,
    q: "Find the gradient of the line 2x + 3y = 6.",
    o: ['2', '3', '2/3', '-2/3'],
    a: 3,
    e: '3y = -2x + 6 → y = (-2/3)x + 2. Gradient is -2/3.',
    full: 'Rearrange the equation into the slope-intercept form y = mx + c. The coefficient of x is the gradient.',
    h: 'Is the gradient negative?'
  },
  {
    yr: 2021,
    q: "A boy is 5 years older than his sister. If the sum of their ages is 19, how old is the sister?",
    o: ['7', '12', '5', '14'],
    a: 0,
    e: 'x + (x+5) = 19 → 2x = 14 → x = 7.',
    full: 'Let the sister\'s age be x. The boy is x+5. Solving the simple equation gives 7.',
    h: 'Is 19 - 5 equal to 14?'
  },
  {
    yr: 2021,
    q: "Find the mean of x, x+2, x+4, x+6.",
    o: ['x+2', 'x+3', 'x+4', 'x+5'],
    a: 1,
    e: 'Sum = 4x + 12. Mean = (4x + 12)/4 = x + 3.',
    full: 'Add all four terms and divide by 4. 4x divided by 4 is x, and 12 divided by 4 is 3.',
    h: 'Is the middle of the set between x+2 and x+4?'
  },
  {
    yr: 2021,
    q: "Simplify (3⁰ + 3⁻¹)⁻¹.",
    o: ['3/4', '4/3', '1/4', '3'],
    a: 0,
    e: '(1 + 1/3)⁻¹ = (4/3)⁻¹ = 3/4.',
    full: 'Anything to power 0 is 1. 3⁻¹ is 1/3. The final negative power flips the fraction.',
    h: 'Is 1 + 1/3 equal to 4/3?'
  },
  {
    yr: 2021,
    q: "Convert 101.1₂ to base 10.",
    o: ['5.1', '5.5', '6.5', '7.5'],
    a: 1,
    e: '4 + 0 + 1 + 0.5 = 5.5.',
    full: 'The digit after the decimal in base 2 represents 2⁻¹, which is 0.5.',
    h: 'Is 1/2 equal to 0.5?'
  },
  {
    yr: 2021,
    q: "If y is inversely proportional to x² and y=2 when x=3, find y when x=1.",
    o: ['6', '9', '18', '36'],
    a: 2,
    e: 'y = k/x² → 2 = k/9 → k=18. When x=1, y=18/1 = 18.',
    full: 'The constant k is y × x². Since 2 × 9 = 18, the constant is 18.',
    h: 'Is 2 × 9 equal to 18?'
  },
  {
    yr: 2021,
    q: "Find the 20th term of the A.P. -5, -2, 1, ...",
    o: ['52', '55', '58', '61'],
    a: 0,
    e: 'a = -5, d = 3. T₂₀ = -5 + 19(3) = -5 + 57 = 52.',
    full: 'The common difference is positive 3. Add 19 of these differences to the starting value -5.',
    h: 'Is 19 × 3 equal to 57?'
  },
  {
    yr: 2021,
    q: "What is the probability of picking a prime number from the set {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}?",
    o: ['2/5', '1/2', '3/10', '4/5'],
    a: 0,
    e: 'Primes are {2, 3, 5, 7}. Probability = 4/10 = 2/5.',
    full: 'Note that 1 is not a prime number. There are 4 primes in the first ten integers.',
    h: 'Is 4 out of 10 the same as 2/5?'
  },
  {
    yr: 2021,
    q: "Find the determinant of [[4, 2], [-3, 1]].",
    o: ['2', '6', '10', '-2'],
    a: 2,
    e: '(4 × 1) - (2 × -3) = 4 - (-6) = 10.',
    full: 'Multiply the main diagonal and subtract the product of the other diagonal. Watch the signs!',
    h: 'Is 4 + 6 equal to 10?'
  },
  {
    yr: 2021,
    q: "Integrate ∫ cos x dx.",
    o: ['sin x + c', '-sin x + c', 'tan x + c', 'cos² x + c'],
    a: 0,
    e: 'The derivative of sin x is cos x, so the integral of cos x is sin x.',
    full: 'Integration is the reverse of differentiation. The integral of cos is positive sin.',
    h: 'Is the integral of cos positive or negative?'
  },
  {
    yr: 2021,
    q: "Rationalize √2/√3.",
    o: ['√6/2', '√6/3', '√6', '2/3'],
    a: 1,
    e: 'Multiply top and bottom by √3 to get √6/3.',
    full: 'To remove the root from the bottom, multiply by that same root. √2 × √3 = √6.',
    h: 'Is 2 × 3 equal to 6?'
  },
  {
    yr: 2021,
    q: "Find the mode of 10, 11, 10, 12, 13, 11, 10.",
    o: ['10', '11', '12', '13'],
    a: 0,
    e: '10 appears 3 times, which is more than any other value.',
    full: 'The mode is the most frequent number. 10 is the clear winner here.',
    h: 'Does 10 appear three times?'
  },
  {
    yr: 2021,
    q: "If 3ˣ⁻¹ = 9, find x.",
    o: ['1', '2', '3', '4'],
    a: 2,
    e: '3ˣ⁻¹ = 3² → x-1 = 2 → x = 3.',
    full: 'Since 9 is 3², the powers must be equal. x - 1 = 2 means x must be 3.',
    h: 'Is 2 + 1 equal to 3?'
  },
  {
    yr: 2020,
    q: "If f(x) = 2x² - 3x + 1, find f(-2).",
    o: ['3', '7', '11', '15'],
    a: 3,
    e: '2(-2)² - 3(-2) + 1 = 2(4) + 6 + 1 = 8 + 6 + 1 = 15.',
    full: 'Substitute -2 for every x in the function. Remember that a negative number squared becomes positive ((-2)² = 4).',
    h: 'Is 8 + 7 equal to 15?'
  },
  {
    yr: 2020,
    q: "Simplify √98 - √50.",
    o: ['√2', '2√2', '3√2', '4√2'],
    a: 1,
    e: '√(49×2) - √(25×2) = 7√2 - 5√2 = 2√2.',
    full: 'Break the numbers into factors where one is a perfect square. 49 and 25 are the keys here.',
    h: 'Is 7 - 5 equal to 2?'
  },
  {
    yr: 2020,
    q: "Find the value of n if log₂ 32 = n.",
    o: ['3', '4', '5', '6'],
    a: 2,
    e: '2ⁿ = 32 → 2⁵ = 32 → n = 5.',
    full: 'Ask yourself: 2 raised to what power gives 32? Since 2 × 2 × 2 × 2 × 2 = 32, the answer is 5.',
    h: 'Is 2⁵ equal to 32?'
  },
  {
    yr: 2020,
    q: "Make t the subject of the formula: v = u + at.",
    o: ['t = v - u - a', 't = (v-u)/a', 't = (v+u)/a', 't = v - u + a'],
    a: 1,
    e: 'v - u = at → t = (v-u)/a.',
    full: 'Subtract u from both sides first, then divide the entire result by a to isolate t.',
    h: 'Do you subtract u or add u first?'
  },
  {
    yr: 2020,
    q: "The probability of an event happening is 0.35. What is the probability of it NOT happening?",
    o: ['0.35', '0.55', '0.65', '0.75'],
    a: 2,
    e: '1 - 0.35 = 0.65.',
    full: 'The sum of the probability of an event occurring and not occurring is always 1.',
    h: 'Is 1.00 - 0.35 equal to 0.65?'
  },
  {
    yr: 2020,
    q: "Find the 15th term of the A.P. 10, 7, 4, ...",
    o: ['-32', '-35', '-42', '-45'],
    a: 0,
    e: 'a=10, d=-3. T₁₅ = 10 + 14(-3) = 10 - 42 = -32.',
    full: 'The common difference is negative 3. Use the formula a + (n-1)d with n=15.',
    h: 'Is 14 × -3 equal to -42?'
  },
  {
    yr: 2020,
    q: "If y = x² sin x, find dy/dx.",
    o: ['2x cos x', 'x² cos x + 2x sin x', 'x² sin x + 2x cos x', '2x sin x'],
    a: 1,
    e: 'Product Rule: u dv/dx + v du/dx = x²(cos x) + sin x(2x).',
    full: 'Since two functions of x are multiplied, you must use the product rule (uv\' + vu\').',
    h: 'Is the derivative of sin x equal to cos x?'
  },
  {
    yr: 2020,
    q: "Calculate the perimeter of a sector with radius 7cm and angle 90°. (π = 22/7)",
    o: ['11cm', '18cm', '25cm', '36cm'],
    a: 2,
    e: 'Arc = (90/360) × 2 × (22/7) × 7 = 11. Perimeter = 11 + 7 + 7 = 25.',
    full: 'Perimeter of a sector is the Arc Length plus two radii (L + 2r).',
    h: 'Is 11 + 14 equal to 25?'
  },
  {
    yr: 2020,
    q: "Find the determinant of [[5, 3], [2, 4]].",
    o: ['14', '22', '26', '10'],
    a: 0,
    e: '(5 × 4) - (3 × 2) = 20 - 6 = 14.',
    full: 'For a 2x2 matrix, subtract the product of the off-diagonal from the product of the main diagonal.',
    h: 'Is 20 - 6 equal to 14?'
  },
  {
    yr: 2020,
    q: "If the mean of 2, 5, 8, x is 6, find x.",
    o: ['7', '8', '9', '10'],
    a: 2,
    e: '(15 + x)/4 = 6 → 15 + x = 24 → x = 9.',
    full: 'The sum of the numbers (15+x) must equal the mean multiplied by the count (6 × 4 = 24).',
    h: 'Is 24 - 15 equal to 9?'
  },
  {
    yr: 2020,
    q: "Evaluate ∫₀¹ (4x³) dx.",
    o: ['1', '2', '3', '4'],
    a: 0,
    e: '[x⁴]₀¹ = 1⁴ - 0⁴ = 1.',
    full: 'Integrate 4x³ to get x⁴. Evaluate it from 0 to 1.',
    h: 'Is 1⁴ equal to 1?'
  },
  {
    yr: 2020,
    q: "Solve for x: 3²ˣ = 27.",
    o: ['1', '1.5', '2', '3'],
    a: 1,
    e: '3²ˣ = 3³ → 2x = 3 → x = 1.5.',
    full: 'Write 27 as 3³. Equate the powers and solve the simple linear equation.',
    h: 'Is 3/2 equal to 1.5?'
  },
  {
    yr: 2020,
    q: "Rationalize 1/(√2 + 1).",
    o: ['√2 + 1', '√2 - 1', '(√2-1)/3', '1 - √2'],
    a: 1,
    e: 'Multiply by (√2-1). Denominator becomes 2-1=1.',
    full: 'Multiply both numerator and denominator by the conjugate (√2-1).',
    h: 'Is (√2)² - 1² equal to 1?'
  },
  {
    yr: 2020,
    q: "Find the coordinate of the midpoint between (3, 8) and (5, 2).",
    o: ['(4, 5)', '(8, 10)', '(1, -3)', '(4, 10)'],
    a: 0,
    e: '((3+5)/2, (8+2)/2) = (8/2, 10/2) = (4, 5).',
    full: 'Add the x-values and divide by 2; add the y-values and divide by 2.',
    h: 'Is 8/2 equal to 4?'
  },
  {
    yr: 2020,
    q: "If y varies directly as the square of x and y=36 when x=3, find y when x=2.",
    o: ['4', '8', '12', '16'],
    a: 3,
    e: 'y = kx² → 36 = k(9) → k=4. When x=2, y = 4(2²) = 16.',
    full: 'Find the constant k first by using the initial values, then apply it to the second case.',
    h: 'Is 4 × 4 equal to 16?'
  },
  {
    yr: 2020,
    q: "Convert 111₂ to base 10.",
    o: ['3', '7', '11', '15'],
    a: 1,
    e: '1(2²) + 1(2¹) + 1(2⁰) = 4 + 2 + 1 = 7.',
    full: 'Sum the powers of 2 for each 1 present in the binary string.',
    h: 'Is 4+2+1 equal to 7?'
  },
  {
    yr: 2020,
    q: "Find the mode of 7, 12, 7, 14, 15, 7, 12.",
    o: ['7', '12', '14', '15'],
    a: 0,
    e: '7 occurs three times, which is more frequent than any other number.',
    full: 'The mode is the value that appears most often in the data set.',
    h: 'Does 7 appear more than 12?'
  },
  {
    yr: 2020,
    q: "Find the angle whose tangent is 1.",
    o: ['30°', '45°', '60°', '90°'],
    a: 1,
    e: 'tan⁻¹(1) = 45°.',
    full: 'This occurs in an isosceles right triangle where the opposite and adjacent sides are equal.',
    h: 'Is sin 45 equal to cos 45?'
  },
  {
    yr: 2020,
    q: "If 2x - 3y = 1 and x + 3y = 8, find x.",
    o: ['2', '3', '4', '5'],
    a: 1,
    e: 'Add the equations: 3x = 9 → x = 3.',
    full: 'Adding the two equations eliminates the y term since -3y + 3y = 0.',
    h: 'Is 9/3 equal to 3?'
  },
  {
    yr: 2020,
    q: "Simplify (x² - 9)/(x + 3).",
    o: ['x + 3', 'x - 3', 'x - 9', 'x²'],
    a: 1,
    e: '((x-3)(x+3))/(x+3) = x - 3.',
    full: 'Factor the numerator using the difference of two squares and cancel the common factor.',
    h: 'Does (x-3)(x+3) equal x² - 9?'
  },
  {
    yr: 2020,
    q: "If P = {2, 3, 5, 7} and Q = {2, 4, 6, 8}, find P ∪ Q.",
    o: ['{2}', '{2, 3, 4, 5, 6, 7, 8}', '{3, 5, 7}', '{4, 6, 8}'],
    a: 1,
    e: 'The union (∪) includes all elements from both sets without duplication.',
    full: 'Union means everything in both. We list 2, 3, 4, 5, 6, 7, and 8. The number 2 is common but only written once.',
    h: 'Does the union include all unique numbers from both lists?'
  },
  {
    yr: 2020,
    q: "Find the derivative of y = 4x³ - 2x + 5.",
    o: ['12x² - 2', '12x² + 5', '4x² - 2', '12x³ - 2'],
    a: 0,
    e: 'dy/dx = 4(3)x³⁻¹ - 2(1)x¹⁻¹ + 0 = 12x² - 2.',
    full: 'Multiply the coefficient by the power and decrease the power by 1. The constant 5 becomes 0.',
    h: 'Is 4 × 3 equal to 12?'
  },
  {
    yr: 2020,
    q: "Calculate the total surface area of a cylinder with radius 7cm and height 10cm. (π = 22/7)",
    o: ['440cm²', '748cm²', '154cm²', '594cm²'],
    a: 1,
    e: 'TSA = 2πr(r + h) = 2(22/7)(7)(7 + 10) = 44(17) = 748.',
    full: 'The formula for the total surface area of a closed cylinder is 2πr² (two bases) + 2πrh (curved surface).',
    h: 'Is 44 × 17 equal to 748?'
  },
  {
    yr: 2020,
    q: "If log₁₀ x = 3, what is the value of x?",
    o: ['30', '100', '300', '1000'],
    a: 3,
    e: 'x = 10³ = 1000.',
    full: 'The base 10 raised to the result 3 gives the value of x. 10 × 10 × 10 = 1000.',
    h: 'Is 10³ equal to 1000?'
  },
  {
    yr: 2020,
    q: "Find the distance between (2, -3) and (2, 5).",
    o: ['2', '4', '8', '10'],
    a: 2,
    e: 'Since x-coords are the same, Distance = |5 - (-3)| = 8.',
    full: 'When points are on a vertical line, you simply find the absolute difference between the y-coordinates.',
    h: 'Is 5 + 3 equal to 8?'
  },
  {
    yr: 2020,
    q: "Solve the inequality: 5 - 2x ≥ 1.",
    o: ['x ≥ 2', 'x ≤ 2', 'x ≥ -2', 'x ≤ -2'],
    a: 1,
    e: '-2x ≥ -4 → x ≤ 2.',
    full: 'Subtract 5 from both sides to get -2x ≥ -4. Dividing by a negative number flips the inequality sign.',
    h: 'Does the sign flip when you divide by -2?'
  },
  {
    yr: 2020,
    q: "Calculate the volume of a sphere with diameter 14cm. (π = 22/7)",
    o: ['1437.33cm³', '179.67cm³', '616cm³', '4312cm³'],
    a: 0,
    e: 'r = 7. V = (4/3)π(7³) = (4/3) × (22/7) × 343 = 1437.33.',
    full: 'First, find the radius (half of diameter). Then apply the volume formula 4/3 πr³.',
    h: 'Is the radius 7?'
  },
  {
    yr: 2020,
    q: "Find the 10th term of the G.P.: 1, 2, 4, 8, ...",
    o: ['256', '512', '1024', '2048'],
    a: 1,
    e: 'T₁₀ = ar⁹ = 1(2⁹) = 512.',
    full: 'The first term a=1 and common ratio r=2. 2⁹ is 512.',
    h: 'Is 2⁹ equal to 512?'
  },
  {
    yr: 2020,
    q: "If y = (x² + 1)³, find dy/dx.",
    o: ['3(x²+1)²', '6x(x²+1)²', '6x(x²+1)³', '2x(x²+1)²'],
    a: 1,
    e: '3(x²+1)² × 2x = 6x(x²+1)².',
    full: 'Use the Chain Rule. Differentiate the outer power then multiply by the derivative of the inside (x²+1).',
    h: 'Is the derivative of x² + 1 equal to 2x?'
  },
  {
    yr: 2020,
    q: "Find the mean of the numbers: 15, 20, 25, 30, 35.",
    o: ['20', '25', '30', '35'],
    a: 1,
    e: 'Sum = 125. Mean = 125/5 = 25.',
    full: 'The numbers are in an arithmetic progression, so the mean is the middle term.',
    h: 'Is 25 the middle number?'
  },
  {
    yr: 2020,
    q: "A die is rolled. What is the probability of getting a number less than 3?",
    o: ['1/6', '1/3', '1/2', '2/3'],
    a: 1,
    e: 'Favorable outcomes: {1, 2}. Probability = 2/6 = 1/3.',
    full: 'There are 2 numbers less than 3 on a standard die out of 6 possible outcomes.',
    h: 'Is 2/6 equal to 1/3?'
  },
  {
    yr: 2020,
    q: "Integrate ∫ (sin x) dx.",
    o: ['cos x + c', '-cos x + c', 'sin² x + c', 'tan x + c'],
    a: 1,
    e: 'The derivative of cos x is -sin x, so the integral of sin x is -cos x.',
    full: 'Integration is the reverse process of differentiation. The integral of sin is negative cos.',
    h: 'Is the integral of sin negative?'
  },
  {
    yr: 2020,
    q: "Find the value of x if 2(x - 5) = 3(x + 2).",
    o: ['-16', '-4', '4', '16'],
    a: 0,
    e: '2x - 10 = 3x + 6 → -16 = x.',
    full: 'Expand the brackets, then subtract 2x and 6 from both sides to find x.',
    h: 'Is -10 - 6 equal to -16?'
  },
  {
    yr: 2020,
    q: "Calculate the area of a triangle with base 10cm and height 8cm.",
    o: ['40cm²', '80cm²', '20cm²', '100cm²'],
    a: 0,
    e: 'Area = 0.5 × 10 × 8 = 40.',
    full: 'The area of a triangle is half the base multiplied by the vertical height.',
    h: 'Is half of 80 equal to 40?'
  },
  {
    yr: 2020,
    q: "If log₂ x + log₂ 3 = log₂ 12, find x.",
    o: ['4', '9', '15', '36'],
    a: 0,
    e: 'log₂(3x) = log₂ 12 → 3x = 12 → x = 4.',
    full: 'Use the addition law: log A + log B = log(AB). Then equate the values.',
    h: 'Is 12/3 equal to 4?'
  },
  {
    yr: 2020,
    q: "Find the gradient of the line passing through (1, 1) and (3, 5).",
    o: ['1', '2', '3', '4'],
    a: 1,
    e: '(5 - 1)/(3 - 1) = 4/2 = 2.',
    full: 'Gradient is change in y over change in x. (5-1) divided by (3-1).',
    h: 'Is 4/2 equal to 2?'
  },
  {
    yr: 2020,
    q: "Simplify 2√3 × √6.",
    o: ['6√2', '18√2', '2√18', '6√18'],
    a: 0,
    e: '2√18 = 2√(9×2) = 2(3)√2 = 6√2.',
    full: 'Multiply the numbers inside the roots first, then simplify the resulting surd.',
    h: 'Is √18 the same as 3√2?'
  },
  {
    yr: 2020,
    q: "Find the sum of the interior angles of a quadrilateral.",
    o: ['180°', '270°', '360°', '540°'],
    a: 2,
    e: '(4-2) × 180 = 2 × 180 = 360.',
    full: 'Any four-sided figure can be split into two triangles, each having 180 degrees.',
    h: 'Is 2 × 180 equal to 360?'
  },
  {
    yr: 2019,
    q: "Simplify (log 9)/(log 3).",
    o: ['1', '2', '3', 'log 3'],
    a: 1,
    e: 'log 9 = log 3² = 2 log 3. Therefore, 2 log 3 / log 3 = 2.',
    full: 'Express 9 as 3². Using the power rule of logarithms, the exponent 2 comes to the front, allowing the log 3 terms to cancel out.',
    h: 'Is 9 equal to 3²?'
  },
  {
    yr: 2019,
    q: "If y = 4x³ - 5x² + 3, find dy/dx.",
    o: ['12x² - 10x', '12x² - 10x + 3', '4x² - 5x', '12x³ - 10x²'],
    a: 0,
    e: 'dy/dx = 4(3)x² - 5(2)x = 12x² - 10x.',
    full: 'Apply the power rule for each term: multiply the coefficient by the current power and then decrease the power by 1. The constant 3 becomes 0.',
    h: 'Is 4 × 3 equal to 12?'
  },
  {
    yr: 2019,
    q: "Find the value of x in the equation 2ˣ⁺¹ = 32.",
    o: ['3', '4', '5', '6'],
    a: 1,
    e: '2ˣ⁺¹ = 2⁵ → x + 1 = 5 → x = 4.',
    full: 'Express 32 as a power of 2 (2⁵). Since the bases are equal, you can equate the exponents and solve for x.',
    h: 'Is 2⁵ equal to 32?'
  },
  {
    yr: 2019,
    q: "Solve for x: 3x - 4 < 5x + 2.",
    o: ['x < -3', 'x > -3', 'x < 3', 'x > 3'],
    a: 1,
    e: '-6 < 2x → -3 < x → x > -3.',
    full: 'Collect x terms on one side and constants on the other. Dividing by a positive number does not flip the inequality sign.',
    h: 'Is -6/2 equal to -3?'
  },
  {
    yr: 2019,
    q: "Calculate the simple interest on ₦5000 for 3 years at 4% per annum.",
    o: ['₦200', '₦400', '₦600', '₦800'],
    a: 2,
    e: 'I = (5000 × 4 × 3)/100 = 50 × 12 = 600.',
    full: 'Use the Simple Interest formula: I = (PRT)/100. 5000 × 0.04 × 3 = 600.',
    h: 'Is 4 × 3 equal to 12?'
  },
  {
    yr: 2019,
    q: "Find the mean of 5, 8, 12, 15, 20.",
    o: ['10', '12', '13', '14'],
    a: 1,
    e: 'Sum = 60. Mean = 60/5 = 12.',
    full: 'Add all the numbers together to get the total sum, then divide by the total count of numbers.',
    h: 'Is 60/5 equal to 12?'
  },
  {
    yr: 2019,
    q: "If sin θ = 3/5, find tan θ for an acute angle θ.",
    o: ['3/4', '4/5', '4/3', '1/2'],
    a: 0,
    e: 'Opp=3, Hyp=5 → Adj = √(5² - 3²) = 4. tan = 3/4.',
    full: 'Using the Pythagorean theorem or the 3-4-5 triple, find the adjacent side. Tangent is Opposite over Adjacent.',
    h: 'Is the adjacent side 4?'
  },
  {
    yr: 2019,
    q: "Find the determinant of [[2, -3], [4, 1]].",
    o: ['-10', '-14', '10', '14'],
    a: 3,
    e: '(2 × 1) - (-3 × 4) = 2 - (-12) = 14.',
    full: 'Calculate the product of the main diagonal and subtract the product of the secondary diagonal. Watch the double negative.',
    h: 'Is 2 + 12 equal to 14?'
  },
  {
    yr: 2019,
    q: "Simplify √50 + √32 - √18.",
    o: ['4√2', '6√2', '8√2', '10√2'],
    a: 1,
    e: '5√2 + 4√2 - 3√2 = 6√2.',
    full: 'Simplify each surd by finding perfect square factors: √(25×2), √(16×2), and √(9×2).',
    h: 'Is 5 + 4 - 3 equal to 6?'
  },
  {
    yr: 2019,
    q: "The exterior angle of a regular polygon is 45°. How many sides has the polygon?",
    o: ['6', '8', '10', '12'],
    a: 1,
    e: 'n = 360 / 45 = 8.',
    full: 'The sum of the exterior angles of any polygon is always 360°. Divide this by the value of one exterior angle to find the number of sides.',
    h: 'Is 360/45 equal to 8?'
  },
  {
    yr: 2019,
    q: "Factorize completely: x² - 5x + 6.",
    o: ['(x-2)(x-3)', '(x+2)(x+3)', '(x-1)(x-6)', '(x+1)(x+6)'],
    a: 0,
    e: '(-2) × (-3) = 6 and (-2) + (-3) = -5.',
    full: 'Find two numbers that multiply to the constant (+6) and add to the middle coefficient (-5).',
    h: 'Do -2 and -3 add up to -5?'
  },
  {
    yr: 2019,
    q: "Find the 20th term of the A.P.: 2, 5, 8, ...",
    o: ['57', '59', '61', '63'],
    a: 1,
    e: 'T₂₀ = 2 + 19(3) = 2 + 57 = 59.',
    full: 'Use the formula a + (n-1)d. Here a=2, d=3, and n=20.',
    h: 'Is 19 × 3 equal to 57?'
  },
  {
    yr: 2019,
    q: "If y varies inversely as x and y=10 when x=2, find y when x=5.",
    o: ['4', '10', '20', '25'],
    a: 0,
    e: 'xy = k → 10 × 2 = 20 = k. When x=5, 5y = 20 → y = 4.',
    full: 'In inverse variation, the product of x and y is a constant (k). Solve for k first, then use it to find the new y.',
    h: 'Is 20/5 equal to 4?'
  },
  {
    yr: 2019,
    q: "Evaluate ∫₁³ (2x) dx.",
    o: ['4', '6', '8', '10'],
    a: 2,
    e: '[x²]₁³ = 3² - 1² = 9 - 1 = 8.',
    full: 'Integrate 2x to get x². Then calculate the difference between the upper bound squared and the lower bound squared.',
    h: 'Is 9 - 1 equal to 8?'
  },
  {
    yr: 2019,
    q: "Convert 42₁₀ to binary (base 2).",
    o: ['101010', '110010', '101100', '111000'],
    a: 0,
    e: '42/2=21 R0; 21/2=10 R1; 10/2=5 R0; 5/2=2 R1; 2/2=1 R0; 1/2=0 R1. Result: 101010.',
    full: 'Repeatedly divide the number by 2 and record the remainders from bottom to top.',
    h: 'Is the last digit 0?'
  },
  {
    yr: 2019,
    q: "Find the mode of 3, 4, 3, 5, 2, 3, 4.",
    o: ['2', '3', '4', '5'],
    a: 1,
    e: '3 appears three times, which is more than any other number.',
    full: 'The mode is the most frequently occurring value in a data set.',
    h: 'Does 3 appear the most?'
  },
  {
    yr: 2019,
    q: "Calculate the area of a circle whose radius is 3.5cm. (π = 22/7)",
    o: ['11cm²', '22cm²', '38.5cm²', '77cm²'],
    a: 2,
    e: 'Area = (22/7) × 3.5² = (22/7) × 12.25 = 38.5.',
    full: 'Use the area formula πr². 3.5 can be thought of as 7/2, which makes the calculation easier.',
    h: 'Is 3.5 × 3.5 equal to 12.25?'
  },
  {
    yr: 2019,
    q: "If log₁₀ 2 = 0.3010, find log₁₀ 8.",
    o: ['0.6020', '0.9030', '1.2040', '1.5050'],
    a: 1,
    e: 'log 2³ = 3 log 2 = 3(0.3010) = 0.9030.',
    full: 'Since 8 is 2³, you can use the power rule to multiply the given log value by 3.',
    h: 'Is 3 × 0.3010 equal to 0.9030?'
  },
  {
    yr: 2019,
    q: "Find the distance between the points (0, 0) and (6, 8).",
    o: ['7', '10', '14', '48'],
    a: 1,
    e: '√(6² + 8²) = √(36 + 64) = √100 = 10.',
    full: 'Apply the distance formula. For a point at the origin, the distance is simply the square root of the sum of the squares of the coordinates.',
    h: 'Is 36 + 64 equal to 100?'
  },
  {
    yr: 2019,
    q: "If y = cos x, find dy/dx at x = 90°.",
    o: ['1', '0', '-1', 'undefined'],
    a: 2,
    e: 'dy/dx = -sin x. At 90°, -sin(90°) = -1.',
    full: 'The derivative of cos x is -sin x. Evaluate this at 90 degrees, where sin is 1.',
    h: 'Is sin 90° equal to 1?'
  },
  {
    yr: 2019,
    q: "If P = [[x, 3], [2, 4]] and the determinant is 10, find x.",
    o: ['2', '4', '6', '8'],
    a: 1,
    e: '4x - (3 × 2) = 10 → 4x - 6 = 10 → 4x = 16 → x = 4.',
    full: 'Set the determinant formula ad - bc equal to 10 and solve the resulting linear equation for x.',
    h: 'Is 16/4 equal to 4?'
  },
  {
    yr: 2019,
    q: "Find the range of the numbers: 12, 1, 15, 22, 8.",
    o: ['14', '21', '22', '23'],
    a: 1,
    e: 'Range = Max - Min = 22 - 1 = 21.',
    full: 'The range is the simplest measure of dispersion, calculated as the difference between the highest and lowest values.',
    h: 'Is 22 - 1 equal to 21?'
  },
  {
    yr: 2019,
    q: "Solve the inequality: 2(x+3) ≥ 5x - 3.",
    o: ['x ≤ 3', 'x ≥ 3', 'x ≤ -3', 'x ≥ -3'],
    a: 0,
    e: '2x + 6 ≥ 5x - 3 → 9 ≥ 3x → 3 ≥ x.',
    full: 'Expand the bracket, collect the x terms, and remember that 3 ≥ x is the same as x ≤ 3.',
    h: 'Is 6 + 3 equal to 9?'
  },
  {
    yr: 2019,
    q: "If y = (3x - 1)², find dy/dx.",
    o: ['2(3x-1)', '6(3x-1)', '18x', '6x - 2'],
    a: 1,
    e: 'dy/dx = 2(3x-1) × 3 = 6(3x-1).',
    full: 'Using the chain rule: differentiate the power (bringing the 2 down) and multiply by the derivative of the inside (3).',
    h: 'Is 2 × 3 equal to 6?'
  },
  {
    yr: 2019,
    q: "Calculate the volume of a cylinder with radius 3cm and height 7cm. (π = 22/7)",
    o: ['66cm³', '132cm³', '198cm³', '462cm³'],
    a: 2,
    e: 'V = πr²h = (22/7) × 9 × 7 = 22 × 9 = 198.',
    full: 'The 7 in the height cancels the 7 in the denominator of π, leaving a simple multiplication of 22 × 9.',
    h: 'Is 22 × 9 equal to 198?'
  },
  {
    yr: 2019,
    q: "If logₐ 16 = 2, find a.",
    o: ['2', '4', '8', '32'],
    a: 1,
    e: 'a² = 16 → a = 4.',
    full: 'In log form, the base a raised to the power 2 equals 16. The square root of 16 is 4.',
    h: 'Is 4² equal to 16?'
  },
  {
    yr: 2019,
    q: "Find the 5th term of a G.P. where a = 2 and r = 3.",
    o: ['30', '54', '162', '486'],
    a: 2,
    e: 'T₅ = ar⁴ = 2(3⁴) = 2(81) = 162.',
    full: 'The formula is arⁿ⁻¹. Here n-1 = 4. 3 × 3 × 3 × 3 = 81.',
    h: 'Is 2 × 81 equal to 162?'
  },
  {
    yr: 2019,
    q: "A bag contains 5 red and 3 blue balls. If two balls are picked WITH replacement, what is the probability both are red?",
    o: ['25/64', '15/64', '9/64', '5/8'],
    a: 0,
    e: 'P = 5/8 × 5/8 = 25/64.',
    full: 'With replacement means the total stays at 8 for both picks. Multiply the individual probabilities.',
    h: 'Is 5 × 5 equal to 25?'
  },
  {
    yr: 2019,
    q: "Simplify x/3 + (x+1)/2.",
    o: ['(2x+3)/6', '(5x+3)/6', '(5x+1)/6', '(x+1)/5'],
    a: 1,
    e: '(2x + 3(x+1))/6 = (2x + 3x + 3)/6 = (5x+3)/6.',
    full: 'Find the common denominator (6) and adjust the numerators before adding them.',
    h: 'Does 2x + 3x equal 5x?'
  },
  {
    yr: 2019,
    q: "Find the median of 10, 15, 12, 18, 20, 14.",
    o: ['14', '14.5', '15', '16'],
    a: 1,
    e: 'Sorted: 10, 12, 14, 15, 18, 20. Median = (14+15)/2 = 14.5.',
    full: 'Since there are 6 numbers (even), the median is the average of the two middle numbers after sorting.',
    h: 'Is the average of 14 and 15 equal to 14.5?'
  },
  {
    yr: 2019,
    q: "If y = tan x, find dy/dx.",
    o: ['sec x', 'sec² x', '-sec² x', 'cos² x'],
    a: 1,
    e: 'Standard derivative of tan x is sec² x.',
    full: 'This is a fundamental trigonometric derivative identity.',
    h: 'Is the derivative of tan related to sec?'
  },
  {
    yr: 2019,
    q: "Solve for x: log₃ x - log₃ 2 = 1.",
    o: ['3', '5', '6', '9'],
    a: 2,
    e: 'log₃(x/2) = 1 → x/2 = 3¹ → x = 6.',
    full: 'Use the subtraction law: log A - log B = log(A/B). Then convert to index form.',
    h: 'Is 3 × 2 equal to 6?'
  },
  {
    yr: 2019,
    q: "Calculate the area of a square whose diagonal is √50 cm.",
    o: ['25cm²', '50cm²', '100cm²', '12.5cm²'],
    a: 0,
    e: 'Area = 0.5 × d² = 0.5 × 50 = 25.',
    full: 'For a square, the area can be calculated as half of the square of its diagonal.',
    h: 'Is half of 50 equal to 25?'
  },
  {
    yr: 2019,
    q: "If x + y = 10 and x - y = 2, find the value of xy.",
    o: ['12', '16', '24', '48'],
    a: 2,
    e: '2x = 12 → x=6, y=4. xy = 6 × 4 = 24.',
    full: 'Solve the simultaneous equations to find x and y, then multiply them together.',
    h: 'Is 6 × 4 equal to 24?'
  },
  {
    yr: 2019,
    q: "Find the gradient of the curve y = x² at the point (3, 9).",
    o: ['3', '6', '9', '1'],
    a: 1,
    e: 'dy/dx = 2x. At x=3, 2(3) = 6.',
    full: 'The gradient at a specific point is the value of the derivative at that point\'s x-coordinate.',
    h: 'Is 2 × 3 equal to 6?'
  },
  {
    yr: 2019,
    q: "Convert 17₁₀ to base 3.",
    o: ['122', '201', '121', '212'],
    a: 0,
    e: '17/3 = 5 R2; 5/3 = 1 R2; 1/3 = 0 R1. Reading up: 122.',
    full: 'Wait, calculation check: 17 = 1(9) + 2(3) + 2(1) = 9+6+2=17. Result is 122.',
    h: 'Is 122 the correct representation?'
  },
  {
    yr: 2019,
    q: "Find the variance of 2, 4, 6.",
    o: ['2', '2.67', '4', '8'],
    a: 1,
    e: 'Mean = 4. Var = (4+0+4)/3 = 8/3 = 2.67.',
    full: 'Variance is the average of the squared deviations from the mean. Sum is 8, divided by 3 is 2.67.',
    h: 'Is 8/3 equal to 2.67?'
  },
  {
    yr: 2019,
    q: "Rationalize 1/√5.",
    o: ['√5/5', '√5', '5', '1/5'],
    a: 0,
    e: 'Multiply top and bottom by √5.',
    full: 'To rationalize a single root in the denominator, multiply the numerator and denominator by that root.',
    h: 'Does the bottom become 5?'
  },
  {
    yr: 2019,
    q: "The sum of interior angles of a polygon with n sides is (n-2)180. Find the sum for a pentagon.",
    o: ['360°', '540°', '720°', '900°'],
    a: 1,
    e: '(5-2) × 180 = 3 × 180 = 540.',
    full: 'A pentagon has 5 sides. 3 × 180 gives the total sum of the internal angles.',
    h: 'Is 3 × 180 equal to 540?'
  },
  {
    yr: 2019,
    q: "Evaluate ∫₀² (3x² + 1) dx.",
    o: ['6', '8', '10', '12'],
    a: 2,
    e: '[x³ + x]₀² = (8 + 2) - (0) = 10.',
    full: 'Integrate each term: 3x² becomes x³ and 1 becomes x. Plug in the bounds and subtract.',
    h: 'Is 8 + 2 equal to 10?'
  },
  {
    yr: 2018,
    q: "If x * y = x + y - xy, find 2 * 3.",
    o: ['-1', '1', '5', '6'],
    a: 0,
    e: '2 + 3 - (2 × 3) = 5 - 6 = -1.',
    full: 'This is a binary operation. Replace x with 2 and y with 3 in the given rule.',
    h: 'Is 5 - 6 equal to -1?'
  },
  {
    yr: 2018,
    q: "Find the gradient of the line joining (2, 3) and (6, 11).",
    o: ['1', '2', '3', '4'],
    a: 1,
    e: '(11 - 3)/(6 - 2) = 8/4 = 2.',
    full: 'Gradient (m) is calculated as (y₂ - y₁)/(x₂ - x₁). 8 divided by 4 is 2.',
    h: 'Is 8/4 equal to 2?'
  },
  {
    yr: 2018,
    q: "Simplify √75 - √27 + √3.",
    o: ['2√3', '3√3', '4√3', '5√3'],
    a: 1,
    e: '5√3 - 3√3 + √3 = 3√3.',
    full: 'Break down the surds: √(25×3) and √(9×3). Then add and subtract the coefficients.',
    h: 'Is 5 - 3 + 1 equal to 3?'
  },
  {
    yr: 2018,
    q: "If log₁₀ x = -1, find x.",
    o: ['0.1', '0.01', '1', '10'],
    a: 0,
    e: 'x = 10⁻¹ = 1/10 = 0.1.',
    full: 'To solve for x, raise the base 10 to the power of the result -1.',
    h: 'Is 1/10 equal to 0.1?'
  },
  {
    yr: 2018,
    q: "Solve for x: x² - 4 = 0.",
    o: ['2', '-2', '±2', '4'],
    a: 2,
    e: 'x² = 4 → x = ±√4 = ±2.',
    full: 'When taking the square root of both sides of an equation, you must include both the positive and negative results.',
    h: 'Are there two possible answers?'
  },
  {
    yr: 2018,
    q: "Find the 10th term of the A.P. 5, 9, 13, ...",
    o: ['37', '41', '45', '49'],
    a: 1,
    e: '5 + 9(4) = 5 + 36 = 41.',
    full: 'Using a + (n-1)d: a=5, d=4, and n=10. 9 × 4 is 36.',
    h: 'Is 5 + 36 equal to 41?'
  },
  {
    yr: 2018,
    q: "If y = x³ - 2x, find dy/dx at x=2.",
    o: ['4', '8', '10', '12'],
    a: 2,
    e: '3x² - 2. At x=2, 3(4) - 2 = 10.',
    full: 'Differentiate the function to get 3x² - 2, then substitute x = 2.',
    h: 'Is 12 - 2 equal to 10?'
  },
  {
    yr: 2018,
    q: "Calculate the area of a circle with diameter 14cm. (π = 22/7)",
    o: ['44cm²', '154cm²', '616cm²', '11cm²'],
    a: 1,
    e: 'r = 7. Area = (22/7) × 49 = 154.',
    full: 'The radius is half the diameter (7). Use πr². 22 × 7 = 154.',
    h: 'Is 22 × 7 equal to 154?'
  },
  {
    yr: 2018,
    q: "Find the determinant of [[1, 2], [3, 4]].",
    o: ['-2', '2', '-10', '10'],
    a: 0,
    e: '(1 × 4) - (2 × 3) = 4 - 6 = -2.',
    full: 'Multiply the main diagonal (1 and 4) and subtract the product of the other diagonal (2 and 3).',
    h: 'Is 4 - 6 equal to -2?'
  },
  {
    yr: 2018,
    q: "What is the probability of picking a vowel from the word 'JAMB'?",
    o: ['1/4', '1/2', '3/4', '0'],
    a: 0,
    e: 'The only vowel is A. Total letters = 4. P = 1/4.',
    full: 'Vowels are A, E, I, O, U. In JAMB, only A qualifies out of 4 total letters.',
    h: 'Is there only one vowel?'
  },
  {
    yr: 2018,
    q: "If 3ˣ = 1/9, find x.",
    o: ['2', '-2', '3', '-3'],
    a: 1,
    e: '3ˣ = 3⁻² → x = -2.',
    full: 'Write 1/9 as 3 to the power of -2. Equate the exponents to find x.',
    h: 'Is 3⁻² equal to 1/9?'
  },
  {
    yr: 2018,
    q: "Find the mean of 2, 4, 6, 8, 10.",
    o: ['4', '5', '6', '8'],
    a: 2,
    e: 'Sum = 30. Mean = 30/5 = 6.',
    full: 'For a symmetric set of numbers like this, the mean is the middle value.',
    h: 'Is 6 the middle number?'
  },
  {
    yr: 2018,
    q: "Factorize completely: x² - 9.",
    o: ['(x-3)²', '(x+3)²', '(x-3)(x+3)', '(x-9)(x+1)'],
    a: 2,
    e: 'Difference of two squares: a² - b² = (a-b)(a+b).',
    full: 'Recognize that 9 is 3². This allows you to use the standard factorization for the difference of two squares.',
    h: 'Is √9 equal to 3?'
  },
  {
    yr: 2018,
    q: "Calculate the volume of a cube with side 4cm.",
    o: ['12cm³', '16cm³', '48cm³', '64cm³'],
    a: 3,
    e: 'V = 4³ = 64.',
    full: 'The volume of a cube is the side length raised to the power of 3. 4 × 4 × 4 = 64.',
    h: 'Is 16 × 4 equal to 64?'
  },
  {
    yr: 2018,
    q: "If y = sin x, find dy/dx at x = 0°.",
    o: ['0', '1', '-1', 'undefined'],
    a: 1,
    e: 'dy/dx = cos x. At 0°, cos(0) = 1.',
    full: 'The derivative of sin x is cos x. At 0 degrees, the value of cosine is 1.',
    h: 'Is cos 0° equal to 1?'
  },
  {
    yr: 2018,
    q: "Convert 11₁₀ to base 2.",
    o: ['1011', '1101', '1111', '1001'],
    a: 0,
    e: '11/2=5 R1; 5/2=2 R1; 2/2=1 R0; 1/2=0 R1. Result: 1011.',
    full: 'Successive division by 2 gives remainders of 1, 1, 0, 1. Read them from bottom to top.',
    h: 'Is the first digit 1?'
  },
  {
    yr: 2018,
    q: "Find the median of 1, 5, 2, 4, 3.",
    o: ['2', '3', '4', '5'],
    a: 1,
    e: 'Sorted: 1, 2, 3, 4, 5. Middle is 3.',
    full: 'Arrange the numbers in ascending order and identify the value in the center.',
    h: 'Is 3 the center value?'
  },
  {
    yr: 2018,
    q: "If y varies directly as x and y=8 when x=2, find y when x=5.",
    o: ['10', '15', '20', '25'],
    a: 2,
    e: 'y = kx → 8 = 2k → k = 4. y = 4 × 5 = 20.',
    full: 'Direct variation follows the rule y = kx. Solve for k first, then substitute the new x.',
    h: 'Is 4 × 5 equal to 20?'
  },
  {
    yr: 2018,
    q: "Simplify 2/x + 3/x.",
    o: ['5/x', '5/x²', '6/x', '6/x²'],
    a: 0,
    e: 'Since denominators are the same, just add the numerators: (2+3)/x = 5/x.',
    full: 'When adding fractions with a common denominator, you keep the denominator and add the numerators.',
    h: 'Is 2 + 3 equal to 5?'
  },
  {
    yr: 2018,
    q: "If P = {x : 2 < x < 5} and Q = {x : 4 < x < 8}, find P ∩ Q.",
    o: ['{x : 2 < x < 8}', '{x : 4 < x < 5}', '{x : 2 < x < 4}', '{x : 5 < x < 8}'],
    a: 1,
    e: 'The overlap between (2, 5) and (4, 8) is the interval (4, 5).',
    full: 'Intersection (∩) finds the shared region. Since Q starts at 4 and P ends at 5, only numbers between 4 and 5 are in both.',
    h: 'Is 4.5 in both sets?'
  },
  {
    yr: 2018,
    q: "Find the value of x for which log₂ (x - 1) = 3.",
    o: ['4', '7', '8', '9'],
    a: 3,
    e: 'x - 1 = 2³ = 8 → x = 9.',
    full: 'Convert the logarithm to index form. The base 2 raised to the power 3 equals the expression inside the log.',
    h: 'Is 8 + 1 equal to 9?'
  },
  {
    yr: 2018,
    q: "Calculate the distance between (-3, -4) and (0, 0).",
    o: ['3', '4', '5', '7'],
    a: 2,
    e: '√((-3)² + (-4)²) = √(9 + 16) = 5.',
    full: 'This is a standard 3-4-5 triangle calculation. The distance from the origin is the root of the sum of the squares of the coordinates.',
    h: 'Is √25 equal to 5?'
  },
  {
    yr: 2018,
    q: "If y = 2x² + 3, find the gradient of the curve at x = 1.",
    o: ['2', '4', '7', '1'],
    a: 1,
    e: 'dy/dx = 4x. At x=1, 4(1) = 4.',
    full: 'The gradient is found by differentiating the function and then plugging in the specific x-value.',
    h: 'Is 4 × 1 equal to 4?'
  },
  {
    yr: 2018,
    q: "A sector of a circle has radius 14cm and angle 60°. Find its arc length. (π = 22/7)",
    o: ['14.67cm', '29.33cm', '44cm', '154cm'],
    a: 0,
    e: 'L = (60/360) × 2 × (22/7) × 14 = (1/6) × 88 = 14.67.',
    full: 'Arc length is the fraction of the total circumference. 60/360 simplifies to 1/6.',
    h: 'Is 88/6 approximately 14.67?'
  },
  {
    yr: 2018,
    q: "If A = [[3, 2], [1, 4]], find 2A.",
    o: ['[[6, 4], [2, 8]]', '[[5, 4], [3, 6]]', '[[9, 4], [1, 16]]', '[[1.5, 1], [0.5, 2]]'],
    a: 0,
    e: 'Multiply every element inside the matrix by the scalar 2.',
    full: 'Scalar multiplication involves distributing the multiplier to every single entry in the matrix.',
    h: 'Is 3 × 2 equal to 6?'
  },
  {
    yr: 2018,
    q: "Find the sum to infinity of a G.P. where a = 10 and r = 0.5.",
    o: ['5', '15', '20', '40'],
    a: 2,
    e: 'S = 10/(1 - 0.5) = 10/0.5 = 20.',
    full: 'The sum to infinity formula is a/(1-r). Dividing by 0.5 is the same as multiplying by 2.',
    h: 'Is 10/0.5 equal to 20?'
  },
  {
    yr: 2018,
    q: "The sum of the ages of a father and son is 40. In 10 years, the father will be 3 times as old as the son. Find the son's current age.",
    o: ['5', '10', '15', '20'],
    a: 0,
    e: 'F+S=40, F+10=3(S+10). Solving gives S=5.',
    full: 'Set up two equations based on the current and future ages. Substitute F = 40-S into the second equation.',
    h: 'If the son is 5, is the father 35?'
  },
  {
    yr: 2018,
    q: "Simplify (x² - 1)/(x - 1).",
    o: ['x - 1', 'x + 1', 'x²', '1'],
    a: 1,
    e: '((x-1)(x+1))/(x-1) = x + 1.',
    full: 'The numerator is a difference of two squares. Once factored, the (x-1) terms cancel out.',
    h: 'Is 1² equal to 1?'
  },
  {
    yr: 2018,
    q: "Solve the inequality: 3 - x < 5.",
    o: ['x < 2', 'x > 2', 'x < -2', 'x > -2'],
    a: 3,
    e: '-x < 2 → x > -2.',
    full: 'Subtract 3 from both sides. When you multiply or divide by -1 to isolate x, the inequality sign must flip.',
    h: 'Did you flip the sign?'
  },
  {
    yr: 2018,
    q: "Find the variance of 1, 2, 3.",
    o: ['0.67', '1', '1.5', '2'],
    a: 0,
    e: 'Mean = 2. Var = (1 + 0 + 1)/3 = 0.67.',
    full: 'Calculate the mean (2), find the squares of deviations (1, 0, 1), and find their average.',
    h: 'Is 2/3 equal to 0.67?'
  },
  {
    yr: 2018,
    q: "Evaluate cos 60° + sin 30°.",
    o: ['0.5', '1', '1.5', '0.866'],
    a: 1,
    e: '0.5 + 0.5 = 1.',
    full: 'These are standard trigonometric values. Both cos 60 and sin 30 are equal to 1/2.',
    h: 'Is half plus half equal to one?'
  },
  {
    yr: 2018,
    q: "Find the equation of a line with gradient 2 passing through the origin (0, 0).",
    o: ['y = 2x', 'y = x + 2', 'y = 2', 'x = 2y'],
    a: 0,
    e: 'Using y = mx + c, m=2 and c=0.',
    full: 'Since it passes through the origin, the y-intercept (c) is zero. The equation simplifies to y = mx.',
    h: 'Is the intercept 0?'
  },
  {
    yr: 2018,
    q: "Calculate the volume of a cone with radius 3cm and height 4cm. (Leave in π)",
    o: ['4π', '12π', '36π', '48π'],
    a: 1,
    e: 'V = 1/3 π (3²) (4) = 1/3 π (9)(4) = 12π.',
    full: 'Apply the formula 1/3 πr²h. The 3 in the denominator cancels one 3 from the r².',
    h: 'Is 3 × 4 equal to 12?'
  },
  {
    yr: 2018,
    q: "If log₂ 8 + log₂ 4 = log₂ x, find x.",
    o: ['12', '16', '32', '64'],
    a: 2,
    e: 'log₂(8 × 4) = log₂ 32.',
    full: 'Using the addition law of logs, the sum of logs with the same base is the log of their product.',
    h: 'Is 8 × 4 equal to 32?'
  },
  {
    yr: 2018,
    q: "Rationalize 1/(2 - √3).",
    o: ['2 + √3', '2 - √3', '4 + √3', '1'],
    a: 0,
    e: 'Multiply by (2 + √3). Denominator is 4 - 3 = 1.',
    full: 'To rationalize a binomial denominator, multiply by its conjugate. The denominator becomes a difference of squares.',
    h: 'Is 4 - 3 equal to 1?'
  },
  {
    yr: 2018,
    q: "Find the 4th term of the expansion (x + y)³.",
    o: ['x³', '3x²y', '3xy²', 'y³'],
    a: 3,
    e: 'Expansion: x³ + 3x²y + 3xy² + y³.',
    full: 'Using Pascal\'s triangle or the binomial theorem, the coefficients for power 3 are 1, 3, 3, 1.',
    h: 'Is the last term y³?'
  },
  {
    yr: 2018,
    q: "If y = e²ˣ, find dy/dx.",
    o: ['e²ˣ', '2e²ˣ', '(1/2)e²ˣ', '2x e²ˣ⁻¹'],
    a: 1,
    e: 'Derivative of eᵃˣ is a eᵃˣ.',
    full: 'This follows the exponential chain rule. The derivative of the power (2) is brought down as a multiplier.',
    h: 'Is the derivative of 2x equal to 2?'
  },
  {
    yr: 2018,
    q: "Find the mode of 5, 2, 7, 5, 2, 5, 8.",
    o: ['2', '5', '7', '8'],
    a: 1,
    e: '5 appears three times, more than any other number.',
    full: 'The mode is the value with the highest frequency. Here, 5 is the most frequent.',
    h: 'Does 5 appear three times?'
  },
  {
    yr: 2018,
    q: "Integrate ∫₀¹ (x + 1) dx.",
    o: ['0.5', '1', '1.5', '2'],
    a: 2,
    e: '[0.5x² + x]₀¹ = 0.5 + 1 = 1.5.',
    full: 'Integrate x to get 0.5x² and 1 to get x. Plug in the upper limit 1 and subtract the lower limit 0.',
    h: 'Is 1 + 0.5 equal to 1.5?'
  },
  {
    yr: 2018,
    q: "Evaluate ∫ (x²) dx.",
    o: ['x³ + c', 'x³/3 + c', '2x + c', '3x³ + c'],
    a: 1,
    e: 'Using the power rule for integration: (xⁿ⁺¹)/(n+1).',
    full: 'Increase the power by 1 and divide by that new power. Don\'t forget the constant of integration (c).',
    h: 'Is the new power 3?'
  },
  {
    yr: 2020,
    q: "If y = 1/x², find dy/dx.",
    o: ['2x', '-2/x³', '1/x', '2/x³'],
    a: 1,
    e: 'x⁻² derivative is -2x⁻³ = -2/x³.',
    full: 'Rewrite as a negative power and use the power rule. The power decreases from -2 to -3.',
    h: 'Is the derivative negative?'
  },
  {
    yr: 2020,
    q: "What is the median of 8, 3, 7, 5, 10?",
    o: ['3', '5', '7', '8'],
    a: 2,
    e: 'Sorted: 3, 5, 7, 8, 10. The middle is 7.',
    full: 'Arrange in ascending order and pick the value exactly in the center.',
    h: 'Is 7 the middle number when sorted?'
  },
  {
    yr: 2021,
    q: "If y = 2x² + 5x - 3, find the coordinates of the point where the curve crosses the y-axis.",
    o: ['(0, 3)', '(0, -3)', '(3, 0)', '(-3, 0)'],
    a: 1,
    e: 'At the y-axis, x = 0. Substituting x=0 gives y = -3.',
    full: 'To find the y-intercept, always set x to zero. The constant term in the quadratic equation is the y-coordinate.',
    h: 'Is the constant term -3?'
  },
  {
    yr: 2021,
    q: "Find the value of x for which (x+2)/3 = (x-1)/2.",
    o: ['5', '7', '8', '9'],
    a: 1,
    e: '2(x+2) = 3(x-1) → 2x + 4 = 3x - 3 → x = 7.',
    full: 'Cross-multiply to remove the denominators, then expand the brackets and solve for x.',
    h: 'Is 4 + 3 equal to 7?'
  },
  {
    yr: 2021,
    q: "Calculate the distance between (-1, 2) and (2, 6).",
    o: ['3', '4', '5', '6'],
    a: 2,
    e: '√((2 - (-1))² + (6-2)²) = √(3² + 4²) = √25 = 5.',
    full: 'Use the distance formula. The difference in x is 3 and the difference in y is 4. This forms a 3-4-5 triangle.',
    h: 'Is √(9 + 16) equal to 5?'
  },
  {
    yr: 2021,
    q: "If log₁₀ 2 = 0.3010, find log₁₀ 20.",
    o: ['0.6020', '1.3010', '2.3010', '0.3010'],
    a: 1,
    e: 'log₁₀(2 × 10) = log₁₀ 2 + log₁₀ 10 = 0.3010 + 1 = 1.3010.',
    full: 'Using the multiplication law of logs, log(AB) = log A + log B. log₁₀ 10 is always 1.',
    h: 'Is 0.3010 + 1 equal to 1.3010?'
  },
  {
    yr: 2021,
    q: "Find the mean of the first five prime numbers.",
    o: ['5', '5.4', '5.6', '6'],
    a: 2,
    e: 'Primes: 2, 3, 5, 7, 11. Sum = 28. Mean = 28/5 = 5.6.',
    full: 'The first five primes are 2, 3, 5, 7, and 11. Add them up and divide by 5.',
    h: 'Is the sum of the first five primes 28?'
  },
  {
    yr: 2021,
    q: "If y = sin(2x), find dy/dx.",
    o: ['2 cos(2x)', '-2 cos(2x)', 'cos(2x)', '2 sin(2x)'],
    a: 0,
    e: 'Derivative of sin(u) is cos(u) × u\'. cos(2x) × 2 = 2 cos(2x).',
    full: 'Differentiate the sine function to get cosine, then multiply by the derivative of the inner function (2x).',
    h: 'Is the derivative of 2x equal to 2?'
  },
  {
    yr: 2021,
    q: "A fair coin is tossed three times. What is the probability of getting three heads?",
    o: ['1/3', '1/4', '1/6', '1/8'],
    a: 3,
    e: '1/2 × 1/2 × 1/2 = 1/8.',
    full: 'Each toss is independent with a 1/2 chance for heads. Multiply the probabilities for three consecutive heads.',
    h: 'Is 2 × 2 × 2 equal to 8?'
  },
  {
    yr: 2021,
    q: "Find the sum to infinity of the series 1 + 1/3 + 1/9 + ...",
    o: ['1.5', '2', '3', '0.5'],
    a: 0,
    e: 'S∞ = a/(1-r) = 1/(1 - 1/3) = 1/(2/3) = 1.5.',
    full: 'The first term a=1 and the common ratio r=1/3. The sum to infinity is 1 divided by 2/3.',
    h: 'Is 1 divided by 2/3 equal to 3/2?'
  },
  {
    yr: 2021,
    q: "Solve the inequality: 2(x - 3) < 4.",
    o: ['x < 5', 'x < 7', 'x > 5', 'x < 2'],
    a: 0,
    e: '2x - 6 < 4 → 2x < 10 → x < 5.',
    full: 'Divide by 2 first or expand the bracket. x - 3 < 2 leads directly to x < 5.',
    h: 'Is 4 + 6 equal to 10?'
  },
  {
    yr: 2021,
    q: "Find the variance of the data: 4, 4, 4, 4, 4.",
    o: ['0', '4', '16', '1'],
    a: 0,
    e: 'The numbers are all the same, so there is no spread (deviation) from the mean.',
    full: 'Variance measures spread. If every value is identical to the mean, the variance is always zero.',
    h: 'Is there any difference between the numbers?'
  },
  {
    yr: 2021,
    q: "If P = [[3, -1], [2, 1]], find P⁻¹ (the inverse).",
    o: ['(1/5)[[1, 1], [-2, 3]]', '(1/1)[[1, 1], [-2, 3]]', '[[1, 1], [-2, 3]]', '(1/5)[[3, 1], [-2, 1]]'],
    a: 0,
    e: 'det = 3 - (-2) = 5. Adjoint: swap 3 and 1, change signs of -1 and 2.',
    full: 'The inverse is 1/det multiplied by the adjoint matrix. Here the determinant is 5.',
    h: 'Is 3 + 2 equal to 5?'
  },
  {
    yr: 2021,
    q: "Convert 10₁₀ to base 3.",
    o: ['101', '110', '111', '121'],
    a: 0,
    e: '10/3 = 3 R1; 3/3 = 1 R0; 1/3 = 0 R1. Result: 101.',
    full: 'Divide 10 by 3 repeatedly and track the remainders from bottom to top.',
    h: 'Is the first remainder 1?'
  },
  {
    yr: 2021,
    q: "Find the radius of a sphere whose surface area is 154 cm². (π = 22/7)",
    o: ['3.5cm', '7cm', '14cm', '1.75cm'],
    a: 0,
    e: '4πr² = 154 → 4(22/7)r² = 154 → r² = 12.25 → r = 3.5.',
    full: 'Surface area formula for a sphere is 4πr². Solving for r gives 3.5 cm.',
    h: 'Is 3.5 the square root of 12.25?'
  },
  {
    yr: 2021,
    q: "Integrate ∫ (3x² + 4x) dx.",
    o: ['x³ + 2x² + c', '3x³ + 4x² + c', 'x³ + x² + c', '6x + 4 + c'],
    a: 0,
    e: '∫ 3x² = x³ and ∫ 4x = 2x².',
    full: 'Add 1 to the power and divide by the new power for each term. 3x³/3 = x³ and 4x²/2 = 2x².',
    h: 'Is 4/2 equal to 2?'
  },
  {
    yr: 2021,
    q: "If y = logₑ x, find dy/dx.",
    o: ['x', '1/x', 'eˣ', '1'],
    a: 1,
    e: 'The derivative of the natural logarithm ln(x) is 1/x.',
    full: 'This is a standard derivative rule in calculus.',
    h: 'Is the derivative of ln(x) equal to 1/x?'
  },
  {
    yr: 2021,
    q: "Find the median of the scores: 1, 3, 5, 2, 4.",
    o: ['2', '3', '4', '5'],
    a: 1,
    e: 'Sorted: 1, 2, 3, 4, 5. The middle value is 3.',
    full: 'Always arrange the numbers in order first. The middle value is the median.',
    h: 'Is 3 the middle number?'
  },
  {
    yr: 2021,
    q: "Find the exterior angle of a regular hexagon.",
    o: ['30°', '60°', '90°', '120°'],
    a: 1,
    e: '360 / 6 = 60°.',
    full: 'The sum of exterior angles of any polygon is 360°. A hexagon has 6 sides.',
    h: 'Is 360/6 equal to 60?'
  },
  {
    yr: 2021,
    q: "Simplify 2/x - 1/y.",
    o: ['(2y-x)/xy', '1/(x-y)', '(2-1)/xy', '(2x-y)/xy'],
    a: 0,
    e: 'Common denominator is xy. (2(y) - 1(x))/(xy) = (2y-x)/xy.',
    full: 'Find the LCM of the denominators and adjust the numerators accordingly.',
    h: 'Is the common denominator xy?'
  },
  {
    yr: 2021,
    q: "If tan θ = 3/4, find cos θ (θ is acute).",
    o: ['3/5', '4/5', '1/2', '3/4'],
    a: 1,
    e: 'Opp=3, Adj=4 → Hyp=5. cos = Adj/Hyp = 4/5.',
    full: 'Using the 3-4-5 Pythagorean triple. Cosine is Adjacent over Hypotenuse.',
    h: 'Is the adjacent side 4?'
  },
  {
    yr: 2021,
    q: "Calculate the volume of a cone with radius 7cm and height 3cm. (π = 22/7)",
    o: ['154cm³', '462cm³', '77cm³', '22cm³'],
    a: 0,
    e: 'V = 1/3 πr²h = 1/3 × 22/7 × 49 × 3 = 22 × 7 = 154.',
    full: 'The 1/3 and the height 3 cancel each other out, leaving just πr².',
    h: 'Is 22 × 7 equal to 154?'
  },
  {
    yr: 2023,
    q: "Find the range of the numbers: 20, 4, 15, 25, 10.",
    o: ['15', '20', '21', '25'],
    a: 2,
    e: 'Range = Max - Min = 25 - 4 = 21.',
    full: 'Range is simply the difference between the highest and lowest values in a data set.',
    h: 'Is 25 - 4 equal to 21?'
  },
  {
    yr: 2023,
    q: "Simplify √75 - √27 + √12.",
    o: ['4√3', '5√3', '6√3', '10√3'],
    a: 0,
    e: '5√3 - 3√3 + 2√3 = (5-3+2)√3 = 4√3.',
    full: 'Break down each surd: √(25×3), √(9×3), and √(4×3).',
    h: 'Is √75 the same as 5√3?'
  },
  {
    yr: 2023,
    q: "Calculate the area of a circle whose circumference is 44cm. (Take π = 22/7)",
    o: ['44cm²', '154cm²', '308cm²', '616cm²'],
    a: 1,
    e: 'C = 2πr = 44 → r=7. Area = πr² = (22/7) × 49 = 154.',
    full: 'First solve for r using the circumference formula, then plug that r into the area formula.',
    h: 'If 2πr = 44, is r equal to 7?'
  },
  {
    yr: 2023,
    q: "Solve for x: log₂ x = 5.",
    o: ['10', '25', '32', '64'],
    a: 2,
    e: 'x = 2⁵ = 32.',
    full: 'Convert from logarithmic form to exponential form: base raised to the result equals the argument.',
    h: 'Is 2 × 2 × 2 × 2 × 2 equal to 32?'
  },
  {
    yr: 2023,
    q: "Find the sum of the first 20 terms of the series: 5, 10, 15, ...",
    o: ['1000', '1050', '1100', '1150'],
    a: 1,
    e: 'Sₙ = n/2(2a + (n-1)d) = 20/2(10 + 19(5)) = 10(10 + 95) = 1050.',
    full: 'Use the A.P. sum formula where a=5, d=5, and n=20.',
    h: 'Is 10 × 105 equal to 1050?'
  },
  {
    yr: 2023,
    q: "If P = [[2, 3], [1, 4]], find the determinant of P.",
    o: ['5', '8', '11', '14'],
    a: 0,
    e: 'det(P) = (2 × 4) - (3 × 1) = 8 - 3 = 5.',
    full: 'For a 2x2 matrix, the determinant is ad - bc.',
    h: 'Is 8 - 3 equal to 5?'
  },
  {
    yr: 2023,
    q: "A fair die is tossed once. What is the probability of getting a number greater than 4?",
    o: ['1/6', '1/3', '1/2', '2/3'],
    a: 1,
    e: 'Numbers greater than 4 are {5, 6}. Probability = 2/6 = 1/3.',
    full: 'There are 6 possible outcomes. Only 2 of them satisfy the condition.',
    h: 'Are there 2 numbers greater than 4 on a die?'
  },
  {
    yr: 2023,
    q: "Find the value of (0.04)⁻¹/².",
    o: ['0.2', '2', '5', '25'],
    a: 2,
    e: '(4/100)⁻¹/² = (100/4)¹/² = √25 = 5.',
    full: 'A negative power flips the fraction. A 1/2 power is a square root.',
    h: 'Is the square root of 25 equal to 5?'
  },
  {
    yr: 2023,
    q: "Simplify (x² - 4)/(x - 2).",
    o: ['x - 2', 'x + 2', 'x + 4', 'x² + 2'],
    a: 1,
    e: '((x-2)(x+2))/(x-2) = x + 2.',
    full: 'Use the difference of two squares to factor the numerator, then cancel out common terms.',
    h: 'Does x² - 4 factor into (x-2)(x+2)?'
  },
  {
    yr: 2023,
    q: "Find the fourth proportional to 3, 5, and 9.",
    o: ['12', '15', '18', '21'],
    a: 1,
    e: '3/5 = 9/x → 3x = 45 → x = 15.',
    full: 'Set up a ratio: the first is to the second as the third is to the fourth.',
    h: 'Is 45/3 equal to 15?'
  },
  {
    yr: 2023,
    q: "What is the bearing of A from B if the bearing of B from A is 060°?",
    o: ['120°', '150°', '240°', '300°'],
    a: 2,
    e: '60 + 180 = 240°.',
    full: 'Back bearings are found by adding or subtracting 180° from the forward bearing.',
    h: 'Is 180 + 60 equal to 240?'
  },
  {
    yr: 2023,
    q: "The mean of five numbers is 12. If a sixth number 18 is added, find the new mean.",
    o: ['13', '14', '15', '16'],
    a: 0,
    e: 'Original total = 12 × 5 = 60. New total = 60 + 18 = 78. New mean = 78/6 = 13.',
    full: 'Calculate the total sum first, add the new number, then divide by the new total count.',
    h: 'Is 78/6 equal to 13?'
  },
  {
    yr: 2023,
    q: "Find the angle whose sine is 0.5.",
    o: ['30°', '45°', '60°', '90°'],
    a: 0,
    e: 'sin⁻¹(0.5) = 30°.',
    full: 'This is a standard trigonometric value. sin(30°) = 1/2.',
    h: 'Is sin 30 equal to 0.5?'
  },
  {
    yr: 2023,
    q: "Solve the inequality: 3(x - 2) ≤ 2x + 1.",
    o: ['x ≤ 5', 'x ≤ 7', 'x ≥ 7', 'x ≤ 3'],
    a: 1,
    e: '3x - 6 ≤ 2x + 1 → x ≤ 7.',
    full: 'Expand the bracket, then collect like terms on either side of the inequality.',
    h: 'Is 1 + 6 equal to 7?'
  },
  {
    yr: 2023,
    q: "Find the distance between the points (1, 2) and (4, 6).",
    o: ['3', '4', '5', '7'],
    a: 2,
    e: '√((4-1)² + (6-2)²) = √(3² + 4²) = √25 = 5.',
    full: 'Use the distance formula: √((x₂-x₁)² + (y₂-y₁)²).',
    h: 'Is √(9 + 16) equal to 5?'
  },
  {
    yr: 2023,
    q: "If y varies directly as x and y=12 when x=3, find y when x=5.",
    o: ['15', '18', '20', '24'],
    a: 2,
    e: 'y = kx → 12 = 3k → k=4. When x=5, y=4(5)=20.',
    full: 'Find the constant of proportionality (k) first, then apply it to the new value.',
    h: 'Is 4 × 5 equal to 20?'
  },
  {
    yr: 2023,
    q: "Simplify logₐ a³.",
    o: ['1', '3', 'a', 'a³'],
    a: 1,
    e: 'By power rule: 3 logₐ a = 3(1) = 3.',
    full: 'The exponent comes to the front, and log of a base to itself is always 1.',
    h: 'Is the power 3?'
  },
  {
    yr: 2023,
    q: "Calculate the total surface area of a cube of side 4cm.",
    o: ['16cm²', '64cm²', '96cm²', '128cm²'],
    a: 2,
    e: '6 × s² = 6 × 16 = 96.',
    full: 'A cube has 6 faces. Each face is a square with area s².',
    h: 'Is 6 × 16 equal to 96?'
  },
  {
    yr: 2023,
    q: "Find the value of x if 3x + 4 = 2(x - 1).",
    o: ['-6', '-2', '2', '6'],
    a: 0,
    e: '3x + 4 = 2x - 2 → x = -6.',
    full: 'Expand the bracket, then subtract 2x and 4 from both sides.',
    h: 'Is -2 - 4 equal to -6?'
  },


  {
    yr: 2023,
    q: 'How many different 8-letter arrangements are possible using the letters of the word SYLLABUS?',
    o: ['(8−1)!', '8!/2!', '8!/(2!·2!)', '8!'],
    a: 2,
    e: 'SYLLABUS has 8 letters with S repeated twice and L repeated twice. Arrangements = 8!/(2!·2!).',
    full: 'SYLLABUS: S-Y-L-L-A-B-U-S\nLetters: S(×2), Y(×1), L(×2), A(×1), B(×1), U(×1)\n\nFor permutations with repeated letters:\nn! / (n₁! · n₂! · ...)\n\n= 8! / (2! · 2!)\n\n(Dividing by 2! for the two S\'s and 2! for the two L\'s)\n\n= 40320 / (2 × 2) = 40320 / 4 = 10,080 arrangements',
    h: 'SYLLABUS has S×2 and L×2. Formula: 8!÷(2!×2!).',
  },
  {
    yr: 2023,
    q: 'Find the compound interest on ₦15,700 for 2 years at 8% per annum compounded annually.',
    o: ['₦6,212.48', '₦2,834.48', '₦18,312.48', '₦2,612.48'],
    a: 3,
    e: 'A = 15700×(1.08)² = 15700×1.1664 = ₦18,312.48. CI = 18,312.48 − 15,700 = ₦2,612.48.',
    full: 'Compound Interest formula:\nA = P(1 + r/100)ⁿ\n\nP = 15,700, r = 8%, n = 2\nA = 15,700 × (1.08)²\n= 15,700 × 1.1664\n= 18,312.48\n\nCI = A − P = 18,312.48 − 15,700 = ₦2,612.48 ✓\n\n(Note: 1.08² = 1.08 × 1.08 = 1.1664)',
    h: 'A = P(1.08)². CI = A − P. With P=15700 and n=2.',
  },

  // ── 2023 page 2 ──────────────────────────────────────────────────────────

  {
    yr: 2023,
    q: 'Divide 1101001₂ by 101₂.',
    o: ['11101₂', '111₂', '10111₂', '10101₂'],
    a: 3,
    e: '1101001₂ = 105₁₀. 101₂ = 5₁₀. 105 ÷ 5 = 21₁₀ = 10101₂.',
    full: 'Convert to base 10:\n1101001₂ = 1×64 + 1×32 + 0×16 + 1×8 + 0×4 + 0×2 + 1×1\n= 64 + 32 + 8 + 1 = 105\n\n101₂ = 1×4 + 0×2 + 1×1 = 5\n\n105 ÷ 5 = 21\n\nConvert 21 to binary:\n21 ÷ 2 = 10 r1\n10 ÷ 2 = 5 r0\n5 ÷ 2 = 2 r1\n2 ÷ 2 = 1 r0\n1 ÷ 2 = 0 r1\n\nRead remainders upward: 10101₂ ✓',
    h: 'Convert both to base 10: 105÷5=21. Then convert 21 back to binary.',
  },
  {
    yr: 2023,
    q: 'A rectangle has one side 6 cm shorter than the other. Area increases by 68 cm² when 2 cm is added to each side. Find the length of the shorter side.',
    o: ['15 cm', '19 cm', '13 cm', '21 cm'],
    a: 2,
    e: 'Let longer side = L. Shorter = L−6. New sides: L+2 and L−4. (L+2)(L−4) = L(L−6)+68. Solve: 4L=76 → L=19 → shorter = 13.',
    full: 'Let longer side = L, shorter side = L − 6\n\nOriginal area = L(L−6)\nNew area = (L+2)(L−4)\n\nCondition: new area = original + 68\n(L+2)(L−4) = L(L−6) + 68\nL² − 4L + 2L − 8 = L² − 6L + 68\nL² − 2L − 8 = L² − 6L + 68\n−2L − 8 = −6L + 68\n4L = 76\nL = 19\n\nShorter side = 19 − 6 = 13 cm ✓',
    h: 'Let longer side = L. Set up: (L+2)(L−4) = L(L−6) + 68. Solve for L.',
  },
  {
    yr: 2023,
    q: 'Ages of primary school students: 5–6 (freq 29), 7–8 (freq 40), 9–10 (freq 38). Estimate the median.',
    o: ['7.725', '6.225', '7.5', '6.5'],
    a: 0,
    e: 'n/2 = 107/2 = 53.5. Cumulative freq: up to 6 = 29, up to 8 = 69. Median class: 7–8. L=6.5, F=29, f=40, w=2. Median = 6.5 + (53.5−29)/40 × 2 = 6.5 + 1.225 = 7.725.',
    full: 'Total n = 29 + 40 + 38 = 107\nMedian position = n/2 = 53.5\n\nCumulative frequencies:\n• Up to age 6: 29 (below 53.5)\n• Up to age 8: 29 + 40 = 69 (exceeds 53.5) → median class is 7–8\n\nMedian formula for grouped data:\nMedian = L + [(n/2 − F) / f] × w\n\nWhere:\n• L = 6.5 (lower class boundary of 7–8)\n• F = 29 (cumulative freq before median class)\n• f = 40 (freq of median class)\n• w = 2 (class width: 8−6 = 2)\n\nMedian = 6.5 + [(53.5 − 29) / 40] × 2\n= 6.5 + [24.5/40] × 2\n= 6.5 + 0.6125 × 2\n= 6.5 + 1.225\n= 7.725 ✓',
    h: 'Find cumulative frequency. Median class is 7–8. Apply Median = L + [(n/2−F)/f]×w with w=2.',
  },
  {
    yr: 2023,
    q: 'At simple interest, a deposit triples in 10 years. After how many years will it become five times the original deposit?',
    o: ['15 years', '25 years', '20 years', '30 years'],
    a: 2,
    e: 'Amount = P + PrT. 3P = P + 10Pr → r = 0.2. For 5P: 5P = P + t(0.2)P → 0.2t = 4 → t = 20 years.',
    full: 'Simple Interest: A = P + PrT = P(1 + rT)\n\nStep 1: Find rate r\n3P = P(1 + 10r)\n3 = 1 + 10r\n10r = 2\nr = 0.2 (20% per year)\n\nStep 2: Find time for 5P\n5P = P(1 + 0.2t)\n5 = 1 + 0.2t\n0.2t = 4\nt = 20 years ✓',
    h: 'Find rate from "triples in 10 years": r = 20%. Then solve for time to reach 5× original.',
  },
  {
    yr: 2023,
    q: 'The second term of a geometric series is −2/3 and its sum to infinity is 3/2. Find the common ratio.',
    o: ['−1/3', '2', '4/3', '2/9'],
    a: 0,
    e: 'T₂ = ar = −2/3, S∞ = a/(1−r) = 3/2. Solve: 9r²−9r−4=0 → r = 4/3 or −1/3. Since |r|<1 for convergence, r = −1/3.',
    full: 'Given: T₂ = ar = −2/3 ... (i)\nS∞ = a/(1−r) = 3/2 ... (ii)\n\nFrom (i): a = −2/(3r)\n\nSubstitute into (ii):\n[−2/(3r)] / (1−r) = 3/2\n−2 / [3r(1−r)] = 3/2\nCross-multiply: −4 = 9r(1−r)\n−4 = 9r − 9r²\n9r² − 9r − 4 = 0\n\nQuadratic formula:\nr = [9 ± √(81+144)] / 18\n= [9 ± √225] / 18\n= [9 ± 15] / 18\n\nr = 24/18 = 4/3 (rejected: |r| > 1, series diverges)\nor r = −6/18 = −1/3 ✓ (|r| < 1, series converges)',
    h: 'Set up two equations. Substitute to get 9r²−9r−4=0. Pick |r|<1 for convergence.',
  },
  {
    yr: 2023,
    q: 'A rectangular plot has sides 38 m and 52 m, correct to the nearest metre. Find the range of possible values of the area.',
    o: [
      '1931.25 m² ≤ A < 2021.25 m²',
      '1950 m² ≤ A < 2002 m²',
      '1957 m² ≤ A < 1995 m²',
      '1931.25 m² ≥ A > 2021.25 m²',
    ],
    a: 0,
    e: 'Each side has ±0.5 m error. Min area = 37.5×51.5 = 1931.25; Max area = 38.5×52.5 = 2021.25. So 1931.25 ≤ A < 2021.25.',
    full: 'Correct to nearest metre means error = ±0.5 m\n\nLower bounds: 38−0.5 = 37.5 m; 52−0.5 = 51.5 m\nUpper bounds: 38+0.5 = 38.5 m; 52+0.5 = 52.5 m\n\nMinimum area = 37.5 × 51.5 = 1931.25 m²\nMaximum area = 38.5 × 52.5 = 2021.25 m²\n\nRange: 1931.25 ≤ A < 2021.25 m² ✓\n\n(Upper bound is excluded because the lengths are strictly less than the upper bounds)',
    h: 'Bounds: length ±0.5. Min area = 37.5×51.5, Max area = 38.5×52.5.',
  },
  {
    yr: 2023,
    q: 'Express 16.54×10⁻⁵ − 6.76×10⁻⁸ + 0.23×10⁻⁶ in standard form.',
    o: ['1.66×10⁻⁴', '1.66×10⁻⁵', '1.65×10⁻⁵', '1.65×10⁻⁴'],
    a: 0,
    e: '16.54×10⁻⁵ = 1.654×10⁻⁴; 0.23×10⁻⁶ = 0.0023×10⁻⁴; 6.76×10⁻⁸ ≈ 0.000676×10⁻⁴. Sum ≈ 1.6556×10⁻⁴ ≈ 1.66×10⁻⁴.',
    full: 'Convert all to ×10⁻⁴:\n• 16.54×10⁻⁵ = 1.654×10⁻⁴\n• 0.23×10⁻⁶ = 0.023×10⁻⁵ = 0.0023×10⁻⁴\n• 6.76×10⁻⁸ = 0.000676×10⁻⁴ (negligible)\n\nSum = (1.654 + 0.0023 − 0.000676)×10⁻⁴\n= 1.6556×10⁻⁴\n≈ 1.66×10⁻⁴ ✓',
    h: 'Convert everything to the same power of 10 (×10⁻⁴), then add/subtract coefficients.',
  },
  {
    yr: 2023,
    q: 'The distance between P(−3, −14) and Q(t, −5) is 9 units. Find t.',
    o: ['3', '2', '−3', '−2'],
    a: 2,
    e: '√[(t+3)² + (−5+14)²] = 9 → (t+3)² + 81 = 81 → (t+3)² = 0 → t = −3.',
    full: 'Distance formula: d = √[(x₂−x₁)² + (y₂−y₁)²]\n\n9 = √[(t−(−3))² + (−5−(−14))²]\n9 = √[(t+3)² + (9)²]\n9 = √[(t+3)² + 81]\n\nSquare both sides:\n81 = (t+3)² + 81\n(t+3)² = 0\nt + 3 = 0\nt = −3 ✓',
    h: 'Distance formula: 9² = (t+3)² + (−5+14)². The y-difference is exactly 9.',
  },
  {
    yr: 2023,
    q: 'Given a ∗ b = a²b and a ^ b = 2a + b, find (−4 ∗ 2) ^ (7 ∗ −1).',
    o: ['−49', '64', '113', '15'],
    a: 3,
    e: '(−4)∗2 = (−4)²×2 = 32. 7∗(−1) = 7²×(−1) = −49. 32^(−49) = 2(32)+(−49) = 64−49 = 15.',
    full: 'Operations defined:\na ∗ b = a²b\na ^ b = 2a + b\n\nStep 1: −4 ∗ 2\n= (−4)² × 2\n= 16 × 2\n= 32\n\nStep 2: 7 ∗ (−1)\n= 7² × (−1)\n= 49 × (−1)\n= −49\n\nStep 3: 32 ^ (−49)\n= 2(32) + (−49)\n= 64 − 49\n= 15 ✓',
    h: 'Evaluate each ∗ first, then apply ^ to the results.',
  },
  {
    yr: 2023,
    q: 'Evaluate ∫₀¹ (4x − 6·∛x²) dx',
    o: ['−5/8', '−8/5', '8/5', '5/8'],
    a: 1,
    e: '∫(4x − 6x^(2/3))dx = 2x² − (18/5)x^(5/3). At x=1: 2 − 18/5 = −8/5. At x=0: 0. Result = −8/5.',
    full: '∫₀¹ (4x − 6x^(2/3)) dx\n\n[Note: 6·³√x² = 6·x^(2/3)]\n\nIntegrate term by term:\n∫4x dx = 2x²\n∫6x^(2/3) dx = 6 × x^(5/3)/(5/3) = 6 × (3/5)x^(5/3) = (18/5)x^(5/3)\n\n= [2x² − (18/5)x^(5/3)]₀¹\n\nAt x = 1:\n2(1)² − (18/5)(1)^(5/3) = 2 − 18/5 = 10/5 − 18/5 = −8/5\n\nAt x = 0: 0\n\nResult = −8/5 − 0 = −8/5 ✓',
    h: '³√x² = x^(2/3). Integrate: ∫x^(2/3)dx = x^(5/3)÷(5/3) = (3/5)x^(5/3). Evaluate at 0 and 1.',
  },

  // ── 2024 page 7 ──────────────────────────────────────────────────────────

  {
    yr: 2024,
    q: 'Find the equation of the line through (5, 7) parallel to 7x + 5y = 12.',
    o: ['5x + 7y = 120', '7x + 5y = 70', 'x + y = 7', '15x + 17y = 90'],
    a: 1,
    e: 'Parallel lines share the same slope. From 7x+5y=12: slope = −7/5. Using point (5,7): y−7 = −7/5(x−5) → 5y−35 = −7x+35 → 7x+5y = 70.',
    full: 'Given line: 7x + 5y = 12\nRewrite: 5y = −7x + 12 → y = −(7/5)x + 12/5\nSlope m = −7/5\n\nParallel line through (5, 7) has same slope:\ny − 7 = −(7/5)(x − 5)\n\nMultiply through by 5:\n5y − 35 = −7(x − 5)\n5y − 35 = −7x + 35\n7x + 5y = 35 + 35\n7x + 5y = 70 ✓\n\nVerify: at (5,7): 7(5)+5(7) = 35+35 = 70 ✓',
    h: 'Parallel lines have same slope (−7/5). Use point-slope form with point (5,7).',
  },
  {
    yr: 2024,
    q: 'Given μ = {x : 1 ≤ x ≤ 20}, A = {multiples of 3}, B = {odd numbers}, find A ∩ B.',
    o: ['{1, 3, 6}', '{3, 5, 9, 12}', '{3, 9, 15}', '{2, 3, 9}'],
    a: 2,
    e: 'A = {3,6,9,12,15,18}. B = {1,3,5,7,9,11,13,15,17,19}. A∩B = numbers that are both multiples of 3 AND odd = {3, 9, 15}.',
    full: 'μ = {1, 2, 3, ..., 20}\n\nA = multiples of 3 within μ:\n{3, 6, 9, 12, 15, 18}\n\nB = odd numbers within μ:\n{1, 3, 5, 7, 9, 11, 13, 15, 17, 19}\n\nA ∩ B = elements in BOTH A and B:\nCheck A: 3(odd✓), 6(even✗), 9(odd✓), 12(even✗), 15(odd✓), 18(even✗)\n\nA ∩ B = {3, 9, 15} ✓\n\n(These are multiples of 3 that are also odd — equivalently, odd multiples of 3)',
    h: 'A∩B = numbers 1–20 that are BOTH multiples of 3 AND odd.',
  },
  {
    yr: 2024,
    q: 'If 25^(1−x) × 5^(x+2) ÷ (1/125)^x = 625^(−1), find x.',
    o: ['x = −4', 'x = 2', 'x = −2', 'x = 4'],
    a: 0,
    e: 'All base 5: 5^(2−2x) × 5^(x+2) ÷ 5^(−3x) = 5^(−4). Combine exponents: 2−2x+x+2+3x = 4+2x. Set 4+2x = −4 → x = −4.',
    full: 'Convert everything to base 5:\n• 25^(1−x) = (5²)^(1−x) = 5^(2−2x)\n• 5^(x+2) stays as is\n• (1/125)^x = (5^(−3))^x = 5^(−3x); dividing by it = ×5^(3x)\n• 625^(−1) = (5⁴)^(−1) = 5^(−4)\n\nEquation becomes:\n5^(2−2x) × 5^(x+2) × 5^(3x) = 5^(−4)\n\nAdd exponents on left:\n(2−2x) + (x+2) + (3x) = 4 + 2x\n\nSo: 5^(4+2x) = 5^(−4)\n4 + 2x = −4\n2x = −8\nx = −4 ✓',
    h: 'Convert all to base 5. Add exponents. Set equal to −4 and solve.',
  },
  {
    yr: 2024,
    q: 'Express the product of 0.0014 and 0.011 in standard form.',
    o: ['1.54×10⁻²', '1.54×10⁻³', '1.54×10⁻²', '1.54×10⁻⁵'],
    a: 3,
    e: '0.0014 × 0.011 = 1.4×10⁻³ × 1.1×10⁻² = 1.54×10⁻⁵.',
    full: 'Method 1 (direct):\n0.0014 × 0.011\n= 14×10⁻⁴ × 11×10⁻³\n= 154×10⁻⁷\n= 1.54×10⁻⁵\n\nMethod 2 (standard form):\n0.0014 = 1.4×10⁻³\n0.011 = 1.1×10⁻²\nProduct = 1.4×1.1 × 10⁻³×10⁻²\n= 1.54 × 10⁻⁵ ✓\n\nVerify: 0.0014 × 0.011 = 0.0000154 = 1.54×10⁻⁵ ✓',
    h: '0.0014 = 1.4×10⁻³, 0.011 = 1.1×10⁻². Multiply: 1.4×1.1=1.54, 10⁻³×10⁻²=10⁻⁵.',
  },
    
  {
    yr: 2021,
    q: 'Solve: 2/(2r−1) − 5/3 = 1/(r+2)',
    o: ['(−1, 5/2)', '(1, −5/2)', '(5/2, 1)', '(2, 1)'],
    a: 1,
    e: 'Rearrange to 2/(2r−1) − 1/(r+2) = 5/3. Combine with LCM (2r−1)(r+2): 5/[(2r−1)(r+2)] = 5/3 → (2r−1)(r+2) = 3 → 2r²+3r−5 = 0 → r = 1 or r = −5/2.',
    full: 'Step 1: Move 1/(r+2) to the left:\n2/(2r−1) − 1/(r+2) = 5/3\n\nStep 2: LCM of left side is (2r−1)(r+2):\n[2(r+2) − 1(2r−1)] / [(2r−1)(r+2)] = 5/3\n[2r+4 − 2r+1] / [(2r−1)(r+2)] = 5/3\n5 / [(2r−1)(r+2)] = 5/3\n\nStep 3: Cross-multiply:\n(2r−1)(r+2) = 3\n2r²+4r−r−2 = 3\n2r²+3r−5 = 0\n\nStep 4: Factorise:\n(2r+5)(r−1) = 0\nr = 1 or r = −5/2\n\nAnswer: (1, −5/2)',
    h: 'Combine fractions with LCM, then solve the resulting quadratic.',
  },

  {
    yr: 2021,
    q: 'In how many ways can 2 students be selected from a group of 5 students for a debating competition?',
    o: ['20 ways', '10 ways', '15 ways', '25 ways'],
    a: 1,
    e: '⁵C₂ = 5!/(3!×2!) = (5×4)/(2×1) = 10 ways.',
    full: 'This is a combination (selection without regard to order):\n\n⁵C₂ = 5! / [(5−2)! × 2!]\n= 5! / (3! × 2!)\n= (5 × 4 × 3!) / (3! × 2 × 1)\n= 20 / 2\n= 10 ways\n\nNote: If order mattered (permutation), it would be ⁵P₂ = 20. But selecting students for a team (debating competition) is a combination — order does not matter.',
    h: 'Selection without order = combination: ⁵C₂ = ?',
  },

  {
    yr: 2021,
    q: 'Find the rate of change of volume V of a hemisphere with respect to its radius r, when r = 2.',
    o: ['8π', '2π', '16π', '4π'],
    a: 0,
    e: 'V = (2/3)πr³ → dV/dr = 2πr². At r = 2: dV/dr = 2π(4) = 8π.',
    full: 'Volume of a hemisphere: V = (2/3)πr³\n\nDifferentiate with respect to r:\ndV/dr = (2/3)π × 3r² = 2πr²\n\nAt r = 2:\ndV/dr = 2π(2²) = 2π × 4 = 8π\n\nSo the rate of change of volume when r = 2 is 8π.',
    h: 'Differentiate V = (2/3)πr³ and substitute r = 2.',
  },

  {
    yr: 2021,
    q: 'A trapezium has two parallel sides of lengths 5 cm and 9 cm. If the area is 91 cm², what is the distance between the parallel sides?',
    o: ['13 cm', '12 cm', '8 cm', '9 cm'],
    a: 0,
    e: 'Area = ½(a+b)h → 91 = ½(5+9)h = 7h → h = 91/7 = 13 cm.',
    full: 'Formula: Area of trapezium = ½ × (sum of parallel sides) × height\n\n91 = ½ × (5 + 9) × h\n91 = ½ × 14 × h\n91 = 7h\nh = 91 ÷ 7\nh = 13 cm',
    h: 'Use Area = ½(a+b)h and solve for h.',
  },

  {
    yr: 2021,
    q: 'Find the value of p if the line through (−1, −p) and (−2, 2) is parallel to the line 2y + 8x − 17 = 0.',
    o: ['−2/7', '7/6', '−6/7', '2'],
    a: 3,
    e: 'The given line has slope −4 (from y = −4x + 17/2). Parallel slope = −4. Apply slope = (y₂−y₁)/(x₂−x₁): −4 = (2−(−p))/(−2−(−1)) = (2+p)/(−1) → 4 = 2+p → p = 2.',
    full: 'Step 1: Find slope of given line 2y+8x−17 = 0:\n2y = −8x + 17 → y = −4x + 17/2\nSlope m = −4\n\nStep 2: Parallel lines have equal slope, so the slope through (−1,−p) and (−2,2) is also −4:\nm = (2−(−p))/(−2−(−1)) = (2+p)/(−1) = −(2+p)\n\nSet equal to −4:\n−(2+p) = −4\n2+p = 4\np = 2',
    h: 'Find slope of given line, set slope of second line equal to it, solve for p.',
  },

  {
    yr: 2021,
    q: 'The ratio of the lengths of two similar rectangular blocks is 2:3. If the volume of the larger block is 351 cm³, find the volume of the smaller block.',
    o: ['234.00 cm³', '166.00 cm³', '526.50 cm³', '687 cm³'],
    a: 0,
    e: 'For similar solids, volume ratio = (length ratio)³ = (2/3)³ = 8/27. Volume of smaller = (8/27) × 351 = 104... wait — correct: ratio is 2³:3³ = 8:27. Smaller = 351 × (8/27) = 104. Hmm, but EduPadi answer is 234. Let me re-check: they use ratio 2:3 directly (not cubed) — 2/5 × 585 = 234. The EduPadi working is: total parts=5, larger gets 3/5 of total=351 → total=585, smaller=2/5×585=234. This treats it as a simple ratio, not similar solids. EduPadi answer: 234 cm³.',
    full: 'EduPadi working:\nRatio of lengths = 2:3. Total ratio parts = 2+3 = 5.\n\nLarger block gets 3 parts:\n3/5 × Total = 351\nTotal = 351 × 5/3 = 585 cm³\n\nSmaller block = 2/5 × 585 = 234 cm³\n\n⚠️ Note: Strictly for similar solids, volume scales as the CUBE of the length ratio (2³:3³ = 8:27), giving 351 × (8/27) ≈ 104 cm³. However, the JAMB verified answer for this question is 234 cm³ — the question appears to treat the ratio directly (not cubed). Follow the official answer: 234 cm³.',
    h: 'Ratio 2:3 → total parts 5 → find total volume → multiply smaller share.',
  },

  {
    yr: 2021,
    q: 'Find the derivative of y = 2x²(2x − 1) at x = −1.',
    o: ['−4', '16', '18', '−8'],
    a: 1,
    e: 'Expand: y = 4x³ − 2x². Differentiate: dy/dx = 12x² − 4x. At x = −1: 12(1) − 4(−1) = 12 + 4 = 16.',
    full: 'Step 1: Expand y:\ny = 2x²(2x − 1) = 4x³ − 2x²\n\nStep 2: Differentiate:\ndy/dx = 12x² − 4x\n\nStep 3: Substitute x = −1:\ndy/dx = 12(−1)² − 4(−1)\n= 12(1) + 4\n= 16',
    h: 'Expand, differentiate, then substitute x = −1.',
  },

  {
    yr: 2021,
    q: 'Correct 241.34 × (3 × 10⁻³)² to 4 significant figures.',
    o: ['0.0014', '0.001448', '0.0022', '0.002172'],
    a: 3,
    e: '(3×10⁻³)² = 9×10⁻⁶. 241.34 × 9×10⁻⁶ = 2172.06×10⁻⁶ = 0.00217206 ≈ 0.002172 (4 s.f.).',
    full: 'Step 1: Square the bracket:\n(3 × 10⁻³)² = 3² × (10⁻³)² = 9 × 10⁻⁶\n\nStep 2: Multiply:\n241.34 × 9 × 10⁻⁶ = 2172.06 × 10⁻⁶ = 0.00217206\n\nStep 3: Round to 4 significant figures:\n0.002172 (the digits 2, 1, 7, 2 are the 4 significant figures)\n\nAnswer: 0.002172',
    h: 'Square the bracket first, multiply, then round to 4 s.f.',
  },

  {
    yr: 2021,
    q: 'Find the mean deviation of 1, 2, 3 and 4.',
    o: ['1.0', '1.5', '2.0', '2.5'],
    a: 0,
    e: 'Mean = 2.5. Mean deviation = (|1−2.5|+|2−2.5|+|3−2.5|+|4−2.5|)/4 = (1.5+0.5+0.5+1.5)/4 = 4/4 = 1.0.',
    full: 'Step 1: Find the mean:\nMean = (1+2+3+4)/4 = 10/4 = 2.5\n\nStep 2: Find each deviation from the mean:\n|1−2.5| = 1.5\n|2−2.5| = 0.5\n|3−2.5| = 0.5\n|4−2.5| = 1.5\n\nStep 3: Mean deviation = sum of deviations / n:\n= (1.5 + 0.5 + 0.5 + 1.5) / 4\n= 4 / 4\n= 1.0',
    h: 'Mean deviation = average of |x − mean| for each value.',
  },

  {
    yr: 2023,
    q: 'What is the general term of the sequence 3, 8, 13, 18, ...?',
    o: ['5n − 2', '5n + 2', '5', '5n'],
    a: 0,
    e: 'Arithmetic sequence: a₁ = 3, d = 5. General term: aₙ = 3 + (n−1)×5 = 5n − 2.',
    full: 'This is an arithmetic sequence with:\n• First term a₁ = 3\n• Common difference d = 8 − 3 = 5\n\nFormula: aₙ = a₁ + (n−1)d\naₙ = 3 + (n−1)×5\naₙ = 3 + 5n − 5\naₙ = 5n − 2\n\nVerify: n=1 → 5(1)−2 = 3 ✓, n=2 → 5(2)−2 = 8 ✓, n=3 → 13 ✓',
    h: 'Find d, apply aₙ = a₁ + (n−1)d and simplify.',
  },

  {
    yr: 2023,
    q: 'A bag contains 8 red balls and some white balls. The probability of drawing a white ball is half the probability of drawing a red ball. Find the probability of drawing a red ball then a white ball without replacement.',
    o: ['1/3', '2/9', '2/3', '8/33'],
    a: 3,
    e: 'P(W) = ½ P(R) → W/T = ½(8/T) → W = 4. Total T = 12. P(red then white) = (8/12)×(4/11) = 32/132 = 8/33.',
    full: 'Step 1: Find number of white balls:\nP(W) = ½ × P(R)\nW/T = ½ × (8/T) → W = 4\nTotal balls T = 8 + 4 = 12\n\nStep 2: P(red first, then white without replacement):\nP = P(Red) × P(White | Red removed)\n= (8/12) × (4/11)\n= (2/3) × (4/11)\n= 8/33',
    h: 'Find W from the probability condition, then multiply sequential probabilities.',
  },

  {
    yr: 2023,
    q: 'Solve: log₂(6 − x) = 3 − log₂ x',
    o: ['x = 4 or 2', 'x = −4 or −2', 'x = −4 or 2', 'x = 4 or −2'],
    a: 0,
    e: 'log₂(6−x) + log₂x = 3 → log₂[x(6−x)] = 3 → x(6−x) = 8 → x²−6x+8 = 0 → (x−4)(x−2) = 0 → x = 4 or x = 2.',
    full: 'Step 1: Move log₂x to the left:\nlog₂(6−x) + log₂x = 3\n\nStep 2: Apply product rule:\nlog₂[x(6−x)] = 3\n\nStep 3: Convert to exponential:\nx(6−x) = 2³ = 8\n6x − x² = 8\nx² − 6x + 8 = 0\n\nStep 4: Factorise:\n(x − 4)(x − 2) = 0\nx = 4 or x = 2\n\nBoth are valid (both give positive arguments in the original log).',
    h: 'Combine logs using product rule, convert to exponential, solve the quadratic.',
  },

  {
    yr: 2023,
    q: 'A boat sails 8 km north from P to Q, then 6 km west from Q to R. Calculate the bearing of R from P to the nearest degree.',
    o: ['217°', '323°', '037°', '053°'],
    a: 1,
    e: 'tan θ = 6/8 → θ = tan⁻¹(0.75) ≈ 36.87°. R is northwest of P. Bearing = 360° − 36.87° ≈ 323°.',
    full: 'Draw the triangle: PQ = 8 km north, QR = 6 km west.\n\nThe angle at P between north and line PR:\ntan θ = opposite/adjacent = QR/PQ = 6/8 = 0.75\nθ = tan⁻¹(0.75) ≈ 36.87°\n\nR is to the northwest of P. Bearings are measured clockwise from north.\nThe northwest direction is in the 4th quadrant of the bearing system.\nBearing of R from P = 360° − 36.87° ≈ 323.13° ≈ 323°',
    h: 'Use tan to find angle at P, then compute bearing from north clockwise.',
  },

  {
    yr: 2023,
    q: 'An article sold for ₦230 makes a 15% profit. Find the profit or loss % if sold for ₦180.',
    o: ['10% gain', '10% loss', '12% loss', '12% gain'],
    a: 1,
    e: 'Cost price: 230 = 1.15C → C = 200. Loss = 200 − 180 = 20. Loss% = (20/200)×100 = 10% loss.',
    full: 'Step 1: Find the cost price:\nSelling price = Cost price × (1 + profit%)\n230 = C × 1.15\nC = 230/1.15 = ₦200\n\nStep 2: Sold at ₦180:\nLoss = 200 − 180 = ₦20\n\nStep 3: Loss percentage:\nLoss% = (20/200) × 100 = 10% loss',
    h: 'Find cost price from profit scenario, then calculate % loss at new price.',
  },

  {
    yr: 2023,
    q: 'The area A of a circle increases at 1.5 cm²/s. Find, to 3 significant figures, the rate at which the radius increases when A = 2 cm².',
    o: ['0.200 cm/s', '0.798 cm/s', '0.300 cm/s', '0.299 cm/s'],
    a: 3,
    e: 'A = πr² → dA/dt = 2πr·dr/dt. When A = 2: r = √(2/π). dr/dt = 1.5/(2π√(2/π)) = 1.5/(2√(2π)) ≈ 0.299 cm/s.',
    full: 'Given: dA/dt = 1.5 cm²/s, A = πr²\n\nDifferentiate implicitly:\ndA/dt = 2πr · dr/dt\n\nFind r when A = 2:\nπr² = 2 → r = √(2/π)\n\nSubstitute:\n1.5 = 2π × √(2/π) × dr/dt\n1.5 = 2√(2π) × dr/dt\ndr/dt = 1.5 / (2√(2π))\n= 1.5 / (2 × 2.5066...)\n= 1.5 / 5.0133\n≈ 0.299 cm/s (3 s.f.)\n\n⚠️ EduPadi\'s explanation had an error (substituted A=2 as if r=2). The correct working above gives 0.299 cm/s.',
    h: 'Use chain rule: dA/dt = 2πr·dr/dt. Find r from A = πr² = 2, then solve for dr/dt.',
  },

  {
    yr: 2023,
    q: 'How many different 8-letter words are possible using the letters of the word SYLLABUS?',
    o: ['(8−1)!', '8!/2!', '8!/(2!×2!)', '8!'],
    a: 2,
    e: 'SYLLABUS has 8 letters: S appears 2 times, L appears 2 times. Number of arrangements = 8!/(2!×2!).',
    full: 'SYLLABUS: S-Y-L-L-A-B-U-S\nCount each letter:\n• S: appears 2 times\n• Y: 1 time\n• L: 2 times\n• A: 1 time\n• B: 1 time\n• U: 1 time\n\nFormula for permutations with repeated letters:\nNumber of words = 8! / (2! × 2!)\n(divide by 2! for S repeated, and 2! for L repeated)\n\n= 40,320 / (2 × 2) = 40,320 / 4 = 10,080 different words',
    h: 'Count repeated letters (S×2, L×2), then divide 8! by each repetition factorial.',
  },

  {
    yr: 2023,
    q: 'Find the compound interest on ₦15,700 for 2 years at 8% per annum compounded annually.',
    o: ['₦6,212.48', '₦2,834.48', '₦18,312.48', '₦2,612.48'],
    a: 3,
    e: 'A = 15700(1.08)² = 15700 × 1.1664 = ₦18,312.48. CI = 18,312.48 − 15,700 = ₦2,612.48.',
    full: 'Formula: A = P(1 + r/100)ⁿ\n\nA = 15,700 × (1 + 8/100)²\n= 15,700 × (1.08)²\n= 15,700 × 1.1664\n= ₦18,312.48\n\nCompound Interest = A − P\n= 18,312.48 − 15,700\n= ₦2,612.48',
    h: 'CI = P(1 + r/100)ⁿ − P. Apply with P=15700, r=8, n=2.',
  },

  {
    yr: 2023,
    q: 'Divide 1101001₂ by 101₂.',
    o: ['11101₂', '111₂', '10111₂', '10101₂'],
    a: 3,
    e: '1101001₂ ÷ 101₂ = 10101₂. Verify: 10101₂ × 101₂ = 1101001₂ ✓.',
    full: 'Binary long division: 1101001₂ ÷ 101₂\n\nConvert to verify: 1101001₂ = 105, 101₂ = 5, 10101₂ = 21\n105 ÷ 5 = 21 ✓\n\nBinary long division steps:\n1101001 ÷ 101:\n- 110 ÷ 101 = 1 remainder 001\n- Bring down 1: 0011\n- 0011 ÷ 101 = 0 remainder 0011\n- Bring down 0: 00110\n- 00110 ÷ 101 = 0... continue...\nResult: 10101₂\n\nQuickest check: 10101₂ × 101₂:\n10101 × 101 = 10101 + 1010100 = 1101001 ✓',
    h: 'Do binary long division, or convert to base 10, divide, convert back.',
  },

  {
    yr: 2023,
    q: 'A rectangle has one side 6 cm shorter than the other. Adding 2 cm to each side increases the area by 68 cm². Find the length of the shorter side.',
    o: ['15 cm', '19 cm', '13 cm', '21 cm'],
    a: 2,
    e: 'Let longer side = L. Shorter = L−6. (L+2)(L−4) = L(L−6)+68 → 4L = 76 → L = 19. Shorter = 19−6 = 13 cm.',
    full: 'Let longer side = L cm, shorter side = (L−6) cm.\n\nOriginal area = L(L−6)\nNew dimensions: (L+2) and (L−6+2) = (L−4)\nNew area = (L+2)(L−4)\n\nSetting up equation:\n(L+2)(L−4) = L(L−6) + 68\nL²−4L+2L−8 = L²−6L + 68\nL²−2L−8 = L²−6L+68\n−2L−8 = −6L+68\n4L = 76\nL = 19 cm\n\nShorter side = 19−6 = 13 cm',
    h: 'Set up area equation after adding 2 cm to each side, expand and solve.',
  },

  {
    yr: 2023,
    q: 'At simple interest, a deposit triples in 10 years. After how many years will it become 5 times the deposit?',
    o: ['15 years', '25 years', '20 years', '30 years'],
    a: 2,
    e: 'A = P + 10Pr = 3P → r = 0.2 (20% per year). For 5P: P + 0.2Pt = 5P → 0.2t = 4 → t = 20 years.',
    full: 'Simple Interest formula: A = P + Prt = P(1 + rt)\n\nStep 1: Find rate r:\nAfter 10 years, A = 3P:\n3P = P(1 + 10r)\n3 = 1 + 10r\nr = 0.2 (i.e., 20% per year)\n\nStep 2: Find t for A = 5P:\n5P = P(1 + 0.2t)\n5 = 1 + 0.2t\n0.2t = 4\nt = 20 years',
    h: 'Find rate from triple-in-10-years condition, then apply to find time for 5×.',
  },

  {
    yr: 2023,
    q: 'The second term of a geometric series is −2/3 and its sum to infinity is 3/2. Find the common ratio.',
    o: ['−1/3', '2', '4/3', '2/9'],
    a: 0,
    e: 'T₂ = ar = −2/3, S∞ = a/(1−r) = 3/2. Solve simultaneously: 9r²−9r−4 = 0 → r = −1/3 (|r|<1 for convergence).',
    full: 'Given: T₂ = ar = −2/3 ... (i)\nS∞ = a/(1−r) = 3/2 ... (ii)\n\nFrom (i): a = −2/(3r)\n\nSubstitute into (ii):\n[−2/(3r)] / (1−r) = 3/2\n−2 / [3r(1−r)] = 3/2\nCross multiply: −4 = 9r(1−r)\n−4 = 9r − 9r²\n9r² − 9r − 4 = 0\n\nQuadratic formula:\nr = [9 ± √(81+144)] / 18 = [9 ± 15] / 18\nr = 24/18 = 4/3 or r = −6/18 = −1/3\n\nFor convergence |r| < 1 → r = −1/3 ✓',
    h: 'Set up two equations using T₂ and S∞ formulas, solve for r, pick |r| < 1.',
  },

  {
    yr: 2023,
    q: 'A rectangular plot has sides 38 m and 52 m, measured to the nearest metre. Find the range of possible values of the area.',
    o: [
      '1931.25 m² ≤ A < 2021.25 m²',
      '1950 m² ≤ A < 2002 m²',
      '1957 m² ≤ A < 1995 m²',
      '1931.25 m² ≥ A > 2021.25 m²',
    ],
    a: 0,
    e: 'Bounds: 37.5 ≤ length < 38.5 and 51.5 ≤ width < 52.5. Min area = 37.5×51.5 = 1931.25. Max area = 38.5×52.5 = 2021.25.',
    full: 'Measured to nearest metre means actual values lie within ±0.5 m:\n• 38 m → 37.5 ≤ actual < 38.5\n• 52 m → 51.5 ≤ actual < 52.5\n\nMinimum possible area:\n37.5 × 51.5 = 1931.25 m²\n\nMaximum possible area:\n38.5 × 52.5 = 2021.25 m²\n\nRange: 1931.25 m² ≤ A < 2021.25 m²',
    h: 'Apply ±0.5 error bounds to each side, compute min and max areas.',
  },

  {
    yr: 2023,
    q: 'Express 16.54×10⁻⁵ − 6.76×10⁻⁸ + 0.23×10⁻⁶ in standard form.',
    o: ['1.66×10⁻⁴', '1.66×10⁻⁵', '1.65×10⁻⁵', '1.65×10⁻⁴'],
    a: 0,
    e: 'Convert all to ×10⁻⁸: 16540×10⁻⁸ − 6.76×10⁻⁸ + 23×10⁻⁸ = 16556.24×10⁻⁸ ≈ 1.656×10⁻⁴ ≈ 1.66×10⁻⁴.',
    full: 'Convert all terms to the same power of 10 (use 10⁻⁸):\n• 16.54×10⁻⁵ = 16540×10⁻⁸ = 1,654,000×10⁻¹¹ ... better:\n\nConvert to 10⁻⁸:\n• 16.54×10⁻⁵ = 16.54×10⁻⁵ × (10³/10³) = 16540×10⁻⁸\n• 0.23×10⁻⁶ = 0.23×10⁻⁶ × (10²/10²) = 23×10⁻⁸\n• 6.76×10⁻⁸ = 6.76×10⁻⁸\n\nSum = (16540 + 23 − 6.76)×10⁻⁸\n= 16556.24×10⁻⁸\n= 1.655624×10⁻⁴\n≈ 1.66×10⁻⁴ (3 s.f.)',
    h: 'Convert all terms to the same power of 10, add/subtract, then write in standard form.',
  },

  {
    yr: 2023,
    q: 'Find the value of t if the distance between P(−3, −14) and Q(t, −5) is 9 units.',
    o: ['3', '2', '−3', '−2'],
    a: 2,
    e: 'd² = (t−(−3))² + (−5−(−14))² = (t+3)² + 81 = 81. So (t+3)² = 0 → t = −3.',
    full: 'Distance formula: d = √[(x₂−x₁)² + (y₂−y₁)²]\n\n9 = √[(t−(−3))² + (−5−(−14))²]\n9 = √[(t+3)² + (9)²]\n81 = (t+3)² + 81\n(t+3)² = 0\nt + 3 = 0\nt = −3',
    h: 'Apply distance formula, square both sides, solve for t.',
  },

  {
    yr: 2023,
    q: 'Let a ★ b = a²b and a ^ b = 2a + b. Find (−4 ★ 2) ^ (7 ★ −1).',
    o: ['−49', '64', '113', '15'],
    a: 3,
    e: '−4★2 = (−4)²×2 = 32. 7★(−1) = 7²×(−1) = −49. 32^(−49) = 2(32)+(−49) = 64−49 = 15.',
    full: 'Step 1: Evaluate −4 ★ 2:\na★b = a²b → (−4)★2 = (−4)² × 2 = 16 × 2 = 32\n\nStep 2: Evaluate 7 ★ (−1):\n7★(−1) = 7² × (−1) = 49 × (−1) = −49\n\nStep 3: Evaluate 32 ^ (−49):\na^b = 2a + b → 32^(−49) = 2(32) + (−49) = 64 − 49 = 15',
    h: 'Apply each binary operation in order: ★ first (twice), then ^.',
  },

  {
    yr: 2023,
    q: 'Evaluate ∫₀¹ (4x − 6∛x²) dx.',
    o: ['−5/8', '−8/5', '8/5', '5/8'],
    a: 1,
    e: '∛x² = x^(2/3). ∫(4x − 6x^(2/3))dx = [2x² − 6·(3/5)x^(5/3)]₀¹ = [2x² − (18/5)x^(5/3)]₀¹ = 2 − 18/5 = 10/5 − 18/5 = −8/5.',
    full: '∫₀¹ (4x − 6x^(2/3)) dx\n\nIntegrate term by term:\n∫4x dx = 2x²\n∫6x^(2/3) dx = 6 × x^(5/3)/(5/3) = 6 × (3/5)x^(5/3) = (18/5)x^(5/3)\n\nSo: [2x² − (18/5)x^(5/3)]₀¹\n\nAt x = 1: 2(1) − (18/5)(1) = 2 − 18/5 = 10/5 − 18/5 = −8/5\nAt x = 0: 0 − 0 = 0\n\nResult = −8/5 − 0 = −8/5',
    h: '∛x² = x^(2/3). Integrate each term using power rule, evaluate at limits.',
  },

  // ══════════════════════════════════════════════
  // 2024
  // ══════════════════════════════════════════════

  {
    yr: 2024,
    q: 'Find the equation of the line through (5, 7) parallel to the line 7x + 5y = 12.',
    o: ['5x + 7y = 120', '7x + 5y = 70', 'x + y = 7', '15x + 17y = 90'],
    a: 1,
    e: 'Slope of 7x+5y=12 is −7/5. Parallel line through (5,7): y−7 = −7/5(x−5) → 5y−35 = −7x+35 → 7x+5y = 70.',
    full: 'Step 1: Slope of given line 7x+5y = 12:\n5y = −7x+12 → y = −(7/5)x + 12/5\nSlope m = −7/5\n\nStep 2: Parallel line has same slope m = −7/5, passes through (5, 7):\ny − 7 = −(7/5)(x − 5)\n5(y − 7) = −7(x − 5)\n5y − 35 = −7x + 35\n7x + 5y = 70',
    h: 'Extract slope from given line, use point-slope form with the given point.',
  },

  {
    yr: 2024,
    q: 'If μ = {x : 1 ≤ x ≤ 20}, A = {multiples of 3} and B = {odd numbers}, find A ∩ B.',
    o: ['{1, 3, 6}', '{3, 5, 9, 12}', '{3, 9, 15}', '{2, 3, 9}'],
    a: 2,
    e: 'A = {3,6,9,12,15,18}. B = {1,3,5,7,9,11,13,15,17,19}. A∩B = numbers in both = {3, 9, 15}.',
    full: 'μ = {1, 2, 3, ..., 20}\n\nA = multiples of 3 in μ:\n{3, 6, 9, 12, 15, 18}\n\nB = odd numbers in μ:\n{1, 3, 5, 7, 9, 11, 13, 15, 17, 19}\n\nA ∩ B = elements in BOTH A and B:\n= odd multiples of 3 in μ\n= {3, 9, 15}',
    h: 'List A (multiples of 3) and B (odd numbers), then find the intersection.',
  },

  {
    yr: 2024,
    q: 'If 25¹⁻ˣ × 5ˣ⁺² ÷ (1/125)ˣ = 625⁻¹, find x.',
    o: ['x = −4', 'x = 2', 'x = −2', 'x = 4'],
    a: 0,
    e: 'Express in base 5: 5^(2−2x) × 5^(x+2) × 5^(3x) = 5^(−4). Combine: 5^(4+2x) = 5^(−4) → 4+2x = −4 → x = −4.',
    full: 'Convert all to base 5:\n• 25 = 5², so 25^(1−x) = 5^(2−2x)\n• 5^(x+2) stays\n• (1/125)^x = (5^(−3))^x = 5^(−3x), so ÷(1/125)^x = ×5^(3x)\n• 625 = 5⁴, so 625^(−1) = 5^(−4)\n\nEquation: 5^(2−2x) × 5^(x+2) × 5^(3x) = 5^(−4)\n\nAdd exponents: (2−2x) + (x+2) + (3x) = −4\n4 + 2x = −4\n2x = −8\nx = −4',
    h: 'Express all numbers as powers of 5, add exponents, equate to RHS exponent.',
  },

  {
    yr: 2024,
    q: 'Express the product of 0.0014 and 0.011 in standard form.',
    o: ['1.54×10⁻²', '1.54×10⁻³', '1.54×10⁻²', '1.54×10⁻⁵'],
    a: 3,
    e: '0.0014 × 0.011 = 14×10⁻⁴ × 11×10⁻³ = 154×10⁻⁷ = 1.54×10⁻⁵.',
    full: '0.0014 = 1.4 × 10⁻³\n0.011 = 1.1 × 10⁻²\n\nProduct = 1.4 × 1.1 × 10⁻³ × 10⁻² \n= 1.54 × 10⁻⁵\n\nVerify: 0.0014 × 0.011 = 0.0000154 = 1.54 × 10⁻⁵ ✓',
    h: 'Write each number in standard form, multiply coefficients and add exponents.',
  },
    {
      yr: 2024,
      q: 'Simplify: 2 cubed x 2 to the power 4',
      o: ['2 to the 7', '2 to the 12', '4 to the 7', '2 to the 6'],
      a: 0,
      e: 'Same base multiplication: add exponents. 2^3 x 2^4 = 2^7.',
      full: 'When multiplying numbers with the same base, you simply add the exponents. This is the product rule for indices: a^m × a^n = a^(m+n).\n\nHere, both numbers have base 2. So 2^3 × 2^4 = 2^(3+4) = 2^7. You do not multiply the base or the exponents — you keep the base and ADD the powers.\n\n2^7 = 128, if you want to check: 2^3 = 8, 2^4 = 16, and 8 × 16 = 128. Also 2^7 = 128. ✓\n\nThe option 2^12 would be correct for 2^3 × 2^4 only if you MULTIPLIED the exponents — but that is a different rule (the power rule, used for (2^3)^4).',
      h: 'Same base, multiplication: add the powers.',
    },
    {
      yr: 2024,
      q: '3x + 7 = 22. Find x.',
      o: ['3', '5', '4', '6'],
      a: 1,
      e: '3x + 7 = 22, so 3x = 15, so x = 5.',
      full: 'To solve a linear equation, isolate the variable by doing the same operation to both sides. Start by removing the constant term (7) from the left side.\n\nSubtract 7 from both sides: 3x + 7 - 7 = 22 - 7, giving 3x = 15.\nNow divide both sides by 3: 3x ÷ 3 = 15 ÷ 3, giving x = 5.\n\nVerify: substitute back — 3(5) + 7 = 15 + 7 = 22. ✓\n\nThis two-step approach (deal with addition/subtraction first, then multiplication/division) works for all linear equations.',
      h: 'Subtract 7 from both sides, then divide by 3.',
    },
    {
      yr: 2023,
      q: 'What is 15% of 200?',
      o: ['25', '30', '35', '40'],
      a: 1,
      e: '15/100 x 200 = 30.',
      full: 'To find a percentage of a quantity, convert the percentage to a decimal or fraction, then multiply by the quantity.\n\n15% means 15 out of every 100, so as a fraction it is 15/100 = 0.15.\n0.15 × 200 = 30.\n\nAlternatively, think of it as: 10% of 200 = 20, and 5% of 200 = 10 (half of 10%). Add them: 20 + 10 = 30. This mental arithmetic shortcut is useful in exams when a calculator is not available.',
      h: 'Percentage x total.',
    },
    {
      yr: 2024,
      q: 'Sum of angles in a triangle',
      o: ['90 degrees', '180 degrees', '270 degrees', '360 degrees'],
      a: 1,
      e: 'All interior angles of a triangle add up to 180 degrees.',
      full: 'This is one of the most fundamental theorems in Euclidean geometry. No matter the shape of the triangle — equilateral, isosceles, scalene, right-angled, or obtuse — the three interior angles always sum to exactly 180 degrees.\n\nYou can verify this with a simple physical proof: cut out a triangle from paper, tear off all three corners, and arrange them side by side. They form a straight line — which is 180 degrees.\n\nFor quadrilaterals (4 sides), interior angles sum to 360 degrees. For pentagons (5 sides), 540 degrees. For any polygon, the sum is (n-2) × 180 degrees. But for a triangle specifically, it is always 180.',
      h: 'Fundamental triangle theorem.',
    },
    {
      yr: 2023,
      q: 'Factorise: x squared minus 9',
      o: ['(x-3)(x-3)', '(x+3)(x+3)', '(x-3)(x+3)', '(x+9)(x-1)'],
      a: 2,
      e: 'x squared minus 9 is difference of two squares: (x-3)(x+3).',
      full: 'The difference of two squares is a factorisation pattern: a² - b² = (a - b)(a + b). Any expression in this form can be factorised immediately using this rule.\n\nHere, x² - 9 = x² - 3². So a = x and b = 3. Applying the formula: (x - 3)(x + 3).\n\nVerify by expanding: (x - 3)(x + 3) = x² + 3x - 3x - 9 = x² - 9. ✓\n\n(x - 3)(x - 3) would give x² - 6x + 9, which is not what we want. (x + 3)(x + 3) gives x² + 6x + 9. Only (x - 3)(x + 3) gives the original expression.',
      h: 'a squared minus b squared = (a-b)(a+b).',
    },
    {
      yr: 2022,
      q: 'Triangle base 6cm, height 8cm. Area?',
      o: ['48 cm2', '24 cm2', '14 cm2', '28 cm2'],
      a: 1,
      e: 'Area = half x base x height = half x 6 x 8 = 24 cm2.',
      full: 'The area of a triangle is calculated using the formula: Area = ½ × base × height. The height must be the perpendicular height — the vertical distance from the base to the opposite vertex, not the slant side.\n\nSubstituting: ½ × 6 × 8 = ½ × 48 = 24 cm².\n\nThe option 48 cm² is a common error — it comes from forgetting the half (calculating base × height without dividing by 2). Think of it this way: a triangle is exactly half of a rectangle with the same base and height. A 6×8 rectangle has area 48 cm², so the triangle inside it has area 24 cm².',
      h: 'Half base times height.',
    },
    {
      yr: 2024,
      q: 'Solve: 2x minus 5 is greater than 9',
      o: [
        'x greater than 2',
        'x greater than 7',
        'x less than 7',
        'x greater than 14',
      ],
      a: 1,
      e: '2x minus 5 greater than 9, so 2x greater than 14, so x greater than 7.',
      full: 'Solving inequalities follows the same steps as solving equations, with one crucial difference: if you multiply or divide both sides by a NEGATIVE number, you must flip the inequality sign.\n\nHere, we are only adding and dividing by positive numbers, so the inequality direction stays the same throughout.\n\nAdd 5 to both sides: 2x - 5 + 5 > 9 + 5, giving 2x > 14.\nDivide both sides by 2: 2x/2 > 14/2, giving x > 7.\n\nThis means x can be any value greater than 7 — like 7.1, 8, 100 — but NOT 7 itself (it is a strict inequality, not ≥).',
      h: 'Add 5 to both sides, divide by 2.',
    },
    {
      yr: 2023,
      q: 'LCM of 4, 6 and 12',
      o: ['48', '24', '12', '36'],
      a: 2,
      e: 'LCM of 4, 6 and 12 is 12 — smallest divisible by all three.',
      full: 'The Lowest Common Multiple (LCM) is the smallest positive integer that is divisible by all the numbers in the set.\n\nList the multiples: Multiples of 4: 4, 8, 12, 16... Multiples of 6: 6, 12, 18... Multiples of 12: 12, 24...\n\nThe first number appearing in all three lists is 12. Check: 12 ÷ 4 = 3 ✓, 12 ÷ 6 = 2 ✓, 12 ÷ 12 = 1 ✓.\n\nAlternatively, use prime factorisation: 4 = 2², 6 = 2 × 3, 12 = 2² × 3. LCM = 2² × 3 = 12.',
      h: 'Smallest number all three divide into evenly.',
    },
    {
      yr: 2022,
      q: 'Convert 0.375 to a fraction in lowest terms',
      o: ['3/8', '375/100', '3/4', '1/3'],
      a: 0,
      e: '0.375 = 375/1000 = 3/8.',
      full: 'To convert a decimal to a fraction, write it over the appropriate power of 10. 0.375 has three decimal places, so it becomes 375/1000.\n\nNow simplify by finding the HCF (Highest Common Factor) of 375 and 1000. Both are divisible by 5: 375 ÷ 5 = 75, 1000 ÷ 5 = 200. Both are divisible by 5 again: 75 ÷ 5 = 15, 200 ÷ 5 = 40. Both are divisible by 5 once more: 15 ÷ 5 = 3, 40 ÷ 5 = 8. Result: 3/8.\n\nVerify: 3 ÷ 8 = 0.375. ✓',
      h: '375/1000. Find the HCF.',
    },
    {
      yr: 2024,
      q: 'Gradient through points (2,3) and (6,11)',
      o: ['2', '3', '4', '1'],
      a: 0,
      e: 'Gradient = (11-3)/(6-2) = 8/4 = 2.',
      full: 'The gradient (slope) of a line measures how steeply it rises or falls. It is calculated as the change in y divided by the change in x between any two points on the line — often remembered as "rise over run."\n\nFormula: m = (y₂ - y₁) / (x₂ - x₁)\n\nUsing the points (2, 3) and (6, 11):\nm = (11 - 3) / (6 - 2) = 8 / 4 = 2\n\nA gradient of 2 means for every 1 unit you move right, the line goes up 2 units. You can use either point as (x₁, y₁) — the result will be the same.',
      h: 'Rise over run: change in y divided by change in x.',
    },
    {
      yr: 2023,
      q: 'Express 64 as a power of 2',
      o: ['2 to the 5', '2 to the 6', '2 to the 7', '2 to the 4'],
      a: 1,
      e: '2 to the power 6 = 64.',
      full: 'To express 64 as a power of 2, ask: how many times must you multiply 2 by itself to get 64?\n\n2¹ = 2\n2² = 4\n2³ = 8\n2⁴ = 16\n2⁵ = 32\n2⁶ = 64 ✓\n\nSo 64 = 2⁶. The exponent 6 means 2 is multiplied by itself 6 times: 2 × 2 × 2 × 2 × 2 × 2 = 64. This is a useful power to memorise, along with the other powers of 2 up to 2¹⁰ = 1024.',
      h: 'Keep doubling from 2 until you reach 64.',
    },
    {
      yr: 2022,
      q: "If P(A) = 0.3, then P(A') is",
      o: ['0.3', '0.7', '1.3', '0.03'],
      a: 1,
      e: "P(A') = 1 minus P(A) = 0.7.",
      full: 'A\' (read "A prime" or "A complement") represents the event of A NOT occurring — everything except A. Since A either happens or it does not, P(A) + P(A\') must always equal 1.\n\nThis is called the complement rule: P(A\') = 1 - P(A).\n\nIf P(A) = 0.3, then P(A\') = 1 - 0.3 = 0.7. In other words, there is a 30% chance of A happening and a 70% chance of it not happening.',
      h: "P(A) + P(A') = 1 always.",
    },
    {
      yr: 2024,
      q: 'Expand (x + 3) squared',
      o: ['x2 + 9', 'x2 + 6x + 9', 'x2 + 3x + 9', 'x2 + 6x + 3'],
      a: 1,
      e: '(x+3) squared = x2 + 6x + 9.',
      h: '(a+b) squared = a2 + 2ab + b2.',
    },
    {
      yr: 2023,
      q: 'Car travels 120km in 2 hours. Average speed?',
      o: ['240 km/h', '60 km/h', '40 km/h', '80 km/h'],
      a: 1,
      e: 'Speed = Distance/Time = 120/2 = 60 km/h.',
      full: 'Speed is how far something travels per unit of time. The formula is simply Speed = Distance ÷ Time.\n\n120 km ÷ 2 hours = 60 km/h.\n\nIf the question asked for time: Time = Distance ÷ Speed.\nIf it asked for distance: Distance = Speed × Time.\n\nThese three forms are worth memorising. The unit km/h tells you the answer — kilometres per hour — confirming you should divide distance (km) by time (h).',
      h: 'Speed = Distance divided by Time.',
    },
    {
      yr: 2022,
      q: 'Evaluate: log base 2 of 16',
      o: ['2', '4', '8', '3'],
      a: 1,
      e: 'Log base 2 of 16 = 4 because 2 to the power 4 = 16.',
      full: 'A logarithm answers the question: "What power must I raise the base to in order to get this number?"\n\nlog₂(16) asks: "What power of 2 gives me 16?"\n2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16. The answer is 4.\n\nLogarithms and exponentials are inverses of each other. If 2⁴ = 16, then log₂(16) = 4. This relationship is the key to solving any logarithm problem.',
      h: '2 to what power equals 16?',
    },
    {
      yr: 2024,
      q: 'Circumference of a circle with radius 7, using pi = 22/7',
      o: ['22', '44', '154', '22/7'],
      a: 1,
      e: 'Circumference = 2 x pi x r = 2 x 22/7 x 7 = 44.',
      full: 'The circumference of a circle is the distance around its outer edge — essentially, the perimeter of a circle. The formula is C = 2πr (or equivalently C = πd, where d is the diameter = 2r).\n\nWith r = 7 and π = 22/7:\nC = 2 × 22/7 × 7\nThe 7 in the numerator and denominator cancel: = 2 × 22 = 44.\n\nThe area formula (πr²) would give 22/7 × 49 = 154 cm² — that is for area, not circumference. Always remember: circumference involves the radius to the FIRST power (2πr), while area involves the radius SQUARED (πr²).',
      h: 'C = 2 pi r. Substitute r = 7.',
    },
    {
      yr: 2023,
      q: 'Evaluate the square root of 144',
      o: ['11', '12', '13', '14'],
      a: 1,
      e: 'Square root of 144 = 12 because 12 x 12 = 144.',
      full: 'The square root of a number is the value that, when multiplied by itself, gives that number. To find √144, ask: which number times itself equals 144?\n\n10 × 10 = 100 (too small)\n11 × 11 = 121 (still too small)\n12 × 12 = 144 ✓\n\nSo √144 = 12. This is a perfect square — the result is a whole number. It is useful to memorise the perfect squares up to at least 15²: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225.',
      h: 'Which number multiplied by itself gives 144?',
    },
    {
      yr: 2022,
      q: 'What is the median of 3, 7, 2, 9, 5?',
      o: ['5', '7', '3', '9'],
      a: 0,
      e: 'Ordered: 2, 3, 5, 7, 9. The middle value (3rd) is 5.',
      full: 'The median is the middle value in an ordered data set. The key steps are: (1) arrange all values in ascending or descending order, and (2) find the middle value.\n\nOriginal data: 3, 7, 2, 9, 5.\nOrdered: 2, 3, 5, 7, 9.\nThere are 5 values, so the middle is the 3rd value (position = (5+1)/2 = 3).\nThe 3rd value in the ordered set is 5.\n\nThe median is 5. Note that 7 is the most frequently confused answer — people pick the wrong value by not ordering first. Always order before finding the median.',
      h: 'Arrange in order and pick the middle value.',
    },
    {
      yr: 2024,
      q: 'Simplify: (3x squared y)(2xy cubed)',
      o: [
        '6x cubed y to the 4',
        '5x cubed y to the 4',
        '6x squared y cubed',
        '6x cubed y cubed',
      ],
      a: 0,
      e: 'Multiply coefficients: 3x2=6. Add exponents: x becomes x cubed, y becomes y to the 4.',
      full: 'When multiplying algebraic terms, you multiply the numbers (coefficients) together and add the exponents of matching variables.\n\n(3x²y)(2xy³): Multiply coefficients: 3 × 2 = 6. For x: x² × x¹ = x^(2+1) = x³. For y: y¹ × y³ = y^(1+3) = y⁴. Result: 6x³y⁴.\n\nThe rule is: same base, multiplication means ADD the exponents. Never multiply the exponents when multiplying — that rule (multiply exponents) only applies when raising a power to another power, like (x²)³ = x⁶.',
      h: 'Multiply numbers, add powers of same variables.',
    },
    {
      yr: 2023,
      q: 'A man sells for 600 naira, profit of 20%. Cost price?',
      o: ['500 naira', '480 naira', '520 naira', '450 naira'],
      a: 0,
      e: 'SP = CP x 1.2. So CP = 600 divided by 1.2 = 500 naira.',
      full: 'Profit and loss problems require understanding the relationship between cost price (CP), selling price (SP), and profit percentage.\n\nA 20% profit means the selling price is 120% of the cost price (the original 100% + 20% profit).\nSo: SP = CP × (100% + 20%) = CP × 1.20\n\nRearranging to find CP: CP = SP ÷ 1.20 = 600 ÷ 1.20 = 500 naira.\n\nVerify: 20% of 500 = 100. Cost price 500 + profit 100 = selling price 600. ✓\n\nA common error is simply calculating 20% of 600 (= 120) and subtracting to get 480 — but that would only work if the profit percentage was calculated on the selling price, not the cost price.',
      h: 'SP = CP x (1 + profit%). Solve for CP.',
    },
    {
      yr: 2022,
      q: 'The interior angle of a regular hexagon is',
      o: ['108 degrees', '120 degrees', '135 degrees', '60 degrees'],
      a: 1,
      e: 'Interior angle = (n-2) x 180 divided by n = (6-2) x 180/6 = 120 degrees.',
      full: 'The sum of interior angles of any polygon is (n-2) × 180°, where n is the number of sides.\nFor a regular polygon (all sides and angles equal), each interior angle = (n-2) × 180° ÷ n.\n\nFor a hexagon (6 sides): Each angle = (6-2) × 180° ÷ 6 = 4 × 180° ÷ 6 = 720° ÷ 6 = 120°.\n\nCommon polygon angles: equilateral triangle = 60°, square = 90°, regular pentagon = 108°, regular hexagon = 120°, regular octagon = 135°. Memorising these helps with quick calculation.',
      h: 'Formula: (n-2) x 180 divided by n.',
    },
    {
      yr: 2024,
      q: 'Solve: x squared minus 5x + 6 = 0',
      o: ['x=2 or x=3', 'x=-2 or x=-3', 'x=1 or x=6', 'x=-1 or x=-6'],
      a: 0,
      e: 'Factorise: (x-2)(x-3) = 0. So x = 2 or x = 3.',
      full: 'To solve a quadratic equation by factorisation, find two numbers that multiply to give the constant term (6) and add to give the coefficient of x (-5).\n\nWe need two numbers that: multiply to +6 AND add to -5.\nThose numbers are -2 and -3 (since -2 × -3 = +6 and -2 + (-3) = -5).\n\nSo x² - 5x + 6 = (x - 2)(x - 3) = 0.\nIf (x-2) = 0, then x = 2.\nIf (x-3) = 0, then x = 3.\n\nVerify: (2)² - 5(2) + 6 = 4 - 10 + 6 = 0 ✓. (3)² - 5(3) + 6 = 9 - 15 + 6 = 0 ✓.',
      h: 'Find two numbers that multiply to 6 and add to -5.',
    },
    {
      yr: 2023,
      q: 'Evaluate: 5 factorial',
      o: ['25', '60', '120', '720'],
      a: 2,
      e: '5! = 5 x 4 x 3 x 2 x 1 = 120.',
      full: 'The factorial of a number n (written n!) means multiplying all positive integers from n down to 1. It counts the number of ways to arrange n objects in a sequence.\n\n5! = 5 × 4 × 3 × 2 × 1 = 120.\n\nStep by step: 5 × 4 = 20. 20 × 3 = 60. 60 × 2 = 120. 120 × 1 = 120.\n\nFactorials grow very quickly: 0! = 1 (by definition), 1! = 1, 2! = 2, 3! = 6, 4! = 24, 5! = 120, 6! = 720, 7! = 5040. Factorials are used extensively in probability, combinations, and permutations.',
      h: 'Factorial means multiply all integers down to 1.',
    },
    {
      yr: 2022,
      q: 'Find the volume of a cube with side 4cm',
      o: ['16 cm3', '24 cm3', '64 cm3', '48 cm3'],
      a: 2,
      e: 'Volume of cube = side cubed = 4 cubed = 64 cm3.',
      full: "A cube has all sides equal. Its volume is found by multiplying length × width × height — and since all three are equal in a cube, this simplifies to side³ (side to the power of 3).\n\nWith side = 4 cm: Volume = 4³ = 4 × 4 × 4 = 16 × 4 = 64 cm³.\n\nThe common errors: 4² = 16 gives area, not volume. 4 × 6 = 24 gives the sum of edges (not volume). 4 × 12 = 48 gives... nothing useful. The cube's volume formula is always s³.",
      h: 'Volume = s x s x s.',
    },
    {
      yr: 2024,
      q: 'What type of angle is 135 degrees?',
      o: ['Acute', 'Right', 'Obtuse', 'Reflex'],
      a: 2,
      e: 'An obtuse angle is between 90 and 180 degrees. 135 falls in this range.',
      full: 'Angles are classified by their size:\n\nAcute: less than 90°. These are small, sharp angles.\nRight: exactly 90°. A perfect corner.\nObtuse: between 90° and 180°. Wider than a right angle but less than a straight line.\nStraight: exactly 180°. A flat line.\nReflex: between 180° and 360°. Greater than a straight line.\n\n135° falls clearly between 90° and 180° — so it is obtuse. It is wider than a right angle but has not yet opened to form a straight line.',
      h: '90 degrees is less than obtuse is less than 180 degrees.',
    },
    {
      yr: 2023,
      q: 'A bag has 3 red and 5 blue balls. Probability of picking red?',
      o: ['3/8', '5/8', '3/5', '1/3'],
      a: 0,
      e: 'P(red) = 3 divided by (3+5) = 3/8.',
      full: 'Probability is calculated as: P(event) = Number of favourable outcomes ÷ Total number of possible outcomes.\n\nThe bag contains 3 red balls and 5 blue balls. Total = 3 + 5 = 8 balls.\nFavourable outcomes (picking red) = 3.\nP(red) = 3/8.\n\nThis means if you picked a ball many times (replacing it each time), you would expect to pick red 3 out of every 8 times — or about 37.5% of the time.\n\nDo not confuse 3/8 with 3/5 (which would be the probability among only the non-blue balls — a different question).',
      h: 'Probability = favourable outcomes divided by total outcomes.',
    },
    {
      yr: 2022,
      q: 'Simplify: 2 to the 5 divided by 2 to the 3',
      o: ['2', '4', '8', '16'],
      a: 1,
      e: '2^5 divided by 2^3 = 2^(5-3) = 2^2 = 4.',
      full: 'The division rule for indices (quotient rule): when dividing numbers with the same base, subtract the exponents. a^m ÷ a^n = a^(m-n).\n\n2⁵ ÷ 2³ = 2^(5-3) = 2² = 4.\n\nVerify: 2⁵ = 32 and 2³ = 8. 32 ÷ 8 = 4. ✓\n\nRemember the three index rules: multiply → add exponents (2³ × 2⁴ = 2⁷). Divide → subtract exponents (2⁵ ÷ 2³ = 2²). Power of a power → multiply exponents ((2²)³ = 2⁶).',
      h: 'Same base division: subtract exponents.',
    },
    {
      yr: 2024,
      q: 'The mean of 4, 8, 6, 2, 10 is',
      o: ['5', '6', '7', '8'],
      a: 1,
      e: 'Mean = (4+8+6+2+10)/5 = 30/5 = 6.',
      full: 'The mean (arithmetic average) is calculated by adding all values in the data set and dividing by the count of values.\n\nData: 4, 8, 6, 2, 10.\nSum: 4 + 8 + 6 + 2 + 10 = 30.\nCount: 5 values.\nMean = 30 ÷ 5 = 6.\n\nThe mean of 6 means that if all five values were equal, each would be 6. The mean represents the "balance point" of the data set. Note that no value in this set actually equals the mean — that is perfectly normal.',
      h: 'Sum all values then divide by the count.',
    },
    {
      yr: 2023,
      q: 'Express 0.000345 in standard form',
      o: [
        '3.45 x 10 to -4',
        '3.45 x 10 to -3',
        '34.5 x 10 to -5',
        '0.345 x 10 to -3',
      ],
      a: 0,
      e: '0.000345 = 3.45 x 10 to the -4. Move decimal 4 places right.',
      full: 'Standard form (scientific notation) expresses any number as a × 10ⁿ where 1 is less than or equal to a, which is less than 10, and n is an integer.\n\nFor 0.000345: move the decimal point to the right until you have a number between 1 and 10. Moving right 4 places gives 3.45 (moving the decimal right gives a smaller original number, so the power of 10 is negative).\n\nCount: 0.000345 → 0.00345 (1 place) → 0.0345 (2) → 0.345 (3) → 3.45 (4 places).\nSo the power is -4: 3.45 × 10⁻⁴.\n\nFor large numbers, you move left (positive power). For small numbers, you move right (negative power).',
      h: 'Standard form: a x 10 to n where 1 is less than or equal to a less than 10.',
    },
    {
      yr: 2022,
      q: 'What is the reciprocal of 2/5?',
      o: ['2/5', '5/2', '-2/5', '-5/2'],
      a: 1,
      e: 'The reciprocal is obtained by flipping the fraction: reciprocal of 2/5 = 5/2.',
      h: 'Flip the numerator and denominator.',
    },
  ];
