// ============================================================================
// SS3 FURTHER MATHEMATICS — COMPLETE LEARNING MODULE (11 TOPICS)
// NERDC Scheme of Work — First Term and Second Term (no Third Term content in NERDC SS3 Further Mathematics scheme)
// ============================================================================

export const WAEC_FURTHER_MATHEMATICS_LEARN_SS3 = [
{
  "topic": "Inequalities",
  "topicCode": "SS3-FMT-01",
  "module": "Inequalities",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic covers <span class=\"learn-keyword\">quadratic inequalities</span> and <span class=\"learn-keyword\">inequalities in two dimensions</span>, extending linear inequality skills to curves and regions.\n</div>\n\n<h3 class=\"learn-subheading\">1. Solving Quadratic Inequalities</h3>\n<p class=\"learn-p\">Factorize, find critical values, then test intervals using a sign diagram.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Solve x&sup2;&minus;5x+6 &gt; 0.<br>Factorize: (x&minus;2)(x&minus;3) &gt; 0. Critical values: x=2, x=3.<br>Testing intervals: for x&lt;2, both factors negative &rArr; positive product. For 2&lt;x&lt;3, one negative one positive &rArr; negative. For x&gt;3, both positive &rArr; positive.<br>Solution: <strong>x&lt;2 or x&gt;3</strong>.</p>\n\n<h3 class=\"learn-subheading\">2. Solving x&sup2; &le; a Type Inequalities</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Solve x&sup2; &le; 16.<br>&minus;4 &le; x &le; <strong>4</strong>.</p>\n\n<h3 class=\"learn-subheading\">3. Inequalities in Two Dimensions</h3>\n<p class=\"learn-p\">Graph the boundary line (solid for &le;/&ge;, dashed for &lt;/&gt;), then shade the region satisfying the inequality.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Shade the region satisfying y &le; 2x+1 and x &ge; 0.<br>Draw y=2x+1 as a solid line, shade below it (since y&le;); draw x=0 as a solid vertical line, shade to the right (x&ge;0). The feasible region is the overlap.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> When multiplying or dividing an inequality by a negative number, always REVERSE the inequality sign.\n</div>\n",
  "questions": [
    {
      "q": "Solve x²-5x+6 > 0.",
      "o": [
        "x<2 or x>3",
        "2<x<3",
        "x<2 only",
        "x>3 only"
      ],
      "a": 0,
      "e": "Factorize: (x−2)(x−3)>0. Testing intervals shows the product is positive when x<2 or x>3.",
      "h": "Find the critical values, then test the sign of the product in each interval.",
      "yr": "SS3"
    },
    {
      "q": "Solve x²≤16.",
      "o": [
        "-4≤x≤4",
        "x≤4",
        "x≥-4",
        "x≤16"
      ],
      "a": 0,
      "e": "Taking square roots of both sides (and reflecting the inequality for both positive and negative roots): −4≤x≤4.",
      "h": "For x²≤a (a>0), the solution is −√a≤x≤√a.",
      "yr": "SS3"
    },
    {
      "q": "Solve x²-9 < 0.",
      "o": [
        "-3<x<3",
        "x<3",
        "x>-3",
        "x<-3 or x>3"
      ],
      "a": 0,
      "e": "x²<9 means −3<x<3 (a quadratic 'between the roots' inequality).",
      "h": "Factor as a difference of squares and test intervals.",
      "yr": "SS3"
    },
    {
      "q": "Solve x²-7x+10 ≤ 0.",
      "o": [
        "2≤x≤5",
        "x≤2 or x≥5",
        "x≤2",
        "x≥5"
      ],
      "a": 0,
      "e": "Factorize: (x−2)(x−5)≤0. This holds for 2≤x≤5 (between the roots, inclusive).",
      "h": "Find the roots, then determine where the product is ≤0 (between the roots for an upward parabola).",
      "yr": "SS3"
    },
    {
      "q": "Solve x²+x-6 > 0.",
      "o": [
        "x<-3 or x>2",
        "-3<x<2",
        "x<-3",
        "x>2"
      ],
      "a": 0,
      "e": "Factorize: (x+3)(x−2)>0. This holds for x<−3 or x>2 (outside the roots).",
      "h": "Find the roots, then determine where the product is positive (outside the roots for an upward parabola).",
      "yr": "SS3"
    },
    {
      "q": "When solving an inequality, what happens when you multiply or divide both sides by a negative number?",
      "o": [
        "The inequality sign must be reversed",
        "Nothing changes",
        "The inequality becomes an equation",
        "The solution becomes undefined"
      ],
      "a": 0,
      "e": "Multiplying or dividing by a negative number flips the direction of the inequality.",
      "h": "This is a fundamental rule of inequality manipulation.",
      "yr": "SS3"
    },
    {
      "q": "Solve 2x²-8 ≥ 0.",
      "o": [
        "x≤-2 or x≥2",
        "-2≤x≤2",
        "x≥2",
        "x≤-2"
      ],
      "a": 0,
      "e": "2x²≥8, x²≥4, so x≤−2 or x≥2.",
      "h": "Isolate x² first, then solve the resulting inequality.",
      "yr": "SS3"
    },
    {
      "q": "For the quadratic inequality (x-1)(x+4)<0, what is the solution?",
      "o": [
        "-4<x<1",
        "x<-4 or x>1",
        "x<1",
        "x>-4"
      ],
      "a": 0,
      "e": "The product is negative between the roots: −4<x<1.",
      "h": "A product of two factors is negative when one is positive and the other negative — this occurs between the roots.",
      "yr": "SS3"
    },
    {
      "q": "Describe the region satisfying y>x+2 on a graph.",
      "o": [
        "The region above the line y=x+2 (dashed boundary, since strict inequality)",
        "The region below the line y=x+2",
        "The line itself only",
        "The entire coordinate plane"
      ],
      "a": 0,
      "e": "Since y is greater than the line's value, the shaded region lies above the dashed line (strict inequality means the boundary itself is excluded).",
      "h": "Think about which side of the line has larger y-values for the same x.",
      "yr": "SS3"
    },
    {
      "q": "Describe the boundary line style for y≤3x-1 (non-strict inequality).",
      "o": [
        "Solid line (boundary included)",
        "Dashed line (boundary excluded)",
        "No line is drawn",
        "A curved line"
      ],
      "a": 0,
      "e": "Non-strict inequalities (≤ or ≥) use a solid boundary line since points on the line satisfy the inequality.",
      "h": "≤ and ≥ include the boundary, shown with a solid line.",
      "yr": "SS3"
    },
    {
      "q": "Find the region satisfying both x≥0 and y≥0 on a graph.",
      "o": [
        "The first quadrant (including the axes)",
        "The entire plane",
        "Only the origin",
        "The fourth quadrant"
      ],
      "a": 0,
      "e": "x≥0 and y≥0 together describe the first quadrant (where both coordinates are non-negative).",
      "h": "Think about which quadrant has both x and y non-negative.",
      "yr": "SS3"
    },
    {
      "q": "Solve x²-6x+9 ≤ 0.",
      "o": [
        "x=3 (a single solution)",
        "x≤3",
        "x≥3",
        "No solution"
      ],
      "a": 0,
      "e": "x²−6x+9=(x−3)², which is always ≥0, equaling 0 only at x=3. So (x−3)²≤0 only when x=3.",
      "h": "Recognize this as a perfect square trinomial.",
      "yr": "SS3"
    },
    {
      "q": "Solve x²+4 > 0.",
      "o": [
        "All real numbers (always true)",
        "No solution",
        "x>0 only",
        "x<0 only"
      ],
      "a": 0,
      "e": "Since x² is always ≥0, x²+4 is always ≥4, which is always greater than 0 — true for all real x.",
      "h": "Consider the minimum possible value of x²+4.",
      "yr": "SS3"
    },
    {
      "q": "Solve x²+1 < 0.",
      "o": [
        "No solution (impossible for real x)",
        "All real numbers",
        "x<-1",
        "x>1"
      ],
      "a": 0,
      "e": "Since x²≥0 always, x²+1≥1, which can never be less than 0. No real solution exists.",
      "h": "Consider the minimum possible value of x²+1.",
      "yr": "SS3"
    },
    {
      "q": "Graph the inequality x<5 and y>2 together. What shape of region results?",
      "o": [
        "An open (unbounded) region to the upper-left, bounded by dashed lines at x=5 and y=2",
        "A closed rectangle",
        "A single point",
        "The entire plane"
      ],
      "a": 0,
      "e": "Combining x<5 (left of a vertical dashed line) and y>2 (above a horizontal dashed line) gives an open, unbounded region in the upper-left area.",
      "h": "Think about combining a vertical boundary and a horizontal boundary, both strict (dashed).",
      "yr": "SS3"
    },
    {
      "q": "Solve (2x-3)(x+1) ≥ 0.",
      "o": [
        "x≤-1 or x≥1.5",
        "-1≤x≤1.5",
        "x≤-1",
        "x≥1.5"
      ],
      "a": 0,
      "e": "Critical values: x=1.5 and x=−1. Testing intervals, the product is ≥0 for x≤−1 or x≥1.5 (outside the roots).",
      "h": "Find the critical values, then test which intervals make the product non-negative.",
      "yr": "SS3"
    },
    {
      "q": "Why is it important to use a sign diagram (test intervals) when solving quadratic inequalities?",
      "o": [
        "Because the sign of the expression can change between critical points, and testing each interval confirms where the inequality holds",
        "Sign diagrams are optional and never necessary",
        "Quadratic inequalities always have the same solution pattern",
        "Testing intervals is only needed for linear inequalities"
      ],
      "a": 0,
      "e": "The expression's sign can only change at critical values (roots), so systematically testing each resulting interval ensures an accurate, error-free solution.",
      "h": "Think about why the sign of a quadratic expression changes only at specific points.",
      "yr": "SS3"
    },
    {
      "q": "Solve x²-2x-3 ≥ 0.",
      "o": [
        "x≤-1 or x≥3",
        "-1≤x≤3",
        "x≤-1",
        "x≥3"
      ],
      "a": 0,
      "e": "Factorize: (x+1)(x−3)≥0. This holds for x≤−1 or x≥3 (outside the roots).",
      "h": "Find the roots, then determine where the product is non-negative.",
      "yr": "SS3"
    },
    {
      "q": "A feasible region is bounded by y≤4, x≥1, and y≥x. What type of shape typically results from combining three linear inequalities like this?",
      "o": [
        "A polygon (such as a triangle), bounded by the three lines",
        "A circle",
        "An unbounded region only",
        "A single line"
      ],
      "a": 0,
      "e": "Combining three linear inequalities (each defining a half-plane) typically creates a bounded polygonal region where all three conditions overlap.",
      "h": "Think about how each inequality cuts the plane, and what shape results from their intersection.",
      "yr": "SS3"
    },
    {
      "q": "Why are inequalities in two dimensions important in real-world problem-solving (e.g., linear programming)?",
      "o": [
        "They define feasible regions representing all possible solutions meeting multiple constraints simultaneously",
        "They have no practical use beyond pure mathematics",
        "They only apply to single-variable problems",
        "They replace the need for equations entirely"
      ],
      "a": 0,
      "e": "Two-dimensional inequalities model real constraints (like budget, resources, time) and their overlapping feasible region shows every combination of variables that satisfies all constraints at once.",
      "h": "Think about how multiple real-world limits combine to form a region of valid options.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Matrices and Determinants",
  "topicCode": "SS3-FMT-02",
  "module": "Matrices and Determinants",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic extends matrix skills to <span class=\"learn-keyword\">matrices as linear transformations</span> and solving <span class=\"learn-keyword\">3&times;3 simultaneous equations</span> using matrices.\n</div>\n\n<h3 class=\"learn-subheading\">1. Matrices as Linear Transformations</h3>\n<p class=\"learn-p\">A matrix can transform points in the plane. Multiplying a transformation matrix by a coordinate vector (x,y) gives the new (transformed) coordinates.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Apply the matrix [[2,0],[0,2]] to the point (3,4).<br>[[2,0],[0,2]] &times; [3,4] = [2(3)+0(4), 0(3)+2(4)] = <strong>(6,8)</strong> &mdash; this represents an enlargement by scale factor 2.</p>\n\n<h3 class=\"learn-subheading\">2. Determinant of a 3&times;3 Matrix</h3>\n<p class=\"learn-p\">For [[a,b,c],[d,e,f],[g,h,i]]: <strong>det = a(ei&minus;fh) &minus; b(di&minus;fg) + c(dh&minus;eg)</strong></p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the determinant of [[1,2,3],[0,1,4],[5,6,0]].<br>det = 1(1&times;0&minus;4&times;6) &minus; 2(0&times;0&minus;4&times;5) + 3(0&times;6&minus;1&times;5)<br>= 1(&minus;24) &minus; 2(&minus;20) + 3(&minus;5) = &minus;24+40&minus;15 = <strong>1</strong>.</p>\n\n<h3 class=\"learn-subheading\">3. Solving 3&times;3 Simultaneous Equations Using Matrices</h3>\n<p class=\"learn-p\">Use Cramer's rule: each variable equals the determinant of the matrix (with that variable's column replaced by the constants) divided by the main determinant.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> When expanding a 3&times;3 determinant, always alternate signs (+,&minus;,+) across the top row &mdash; forgetting this sign pattern is the most common error.\n</div>\n",
  "questions": [
    {
      "q": "Apply the matrix [[2,0],[0,2]] to the point (3,4).",
      "o": [
        "(6, 8)",
        "(3, 4)",
        "(5, 6)",
        "(8, 6)"
      ],
      "a": 0,
      "e": "[[2,0],[0,2]]×[3,4]=[2(3)+0(4), 0(3)+2(4)]=(6,8).",
      "h": "Multiply the matrix by the coordinate vector, row by row.",
      "yr": "SS3"
    },
    {
      "q": "Find the determinant of [[1,2,3],[0,1,4],[5,6,0]].",
      "o": [
        "1",
        "-1",
        "24",
        "-24"
      ],
      "a": 0,
      "e": "det=1(1×0−4×6)−2(0×0−4×5)+3(0×6−1×5)=1(−24)−2(−20)+3(−5)=−24+40−15=1.",
      "h": "Use the cofactor expansion along the top row, alternating signs.",
      "yr": "SS3"
    },
    {
      "q": "What transformation does the matrix [[1,0],[0,-1]] represent?",
      "o": [
        "A reflection in the x-axis",
        "A reflection in the y-axis",
        "A rotation by 90°",
        "An enlargement"
      ],
      "a": 0,
      "e": "This matrix keeps x unchanged but negates y, which is a reflection in the x-axis.",
      "h": "Think about how the matrix affects the x and y coordinates separately.",
      "yr": "SS3"
    },
    {
      "q": "What transformation does the matrix [[0,-1],[1,0]] represent?",
      "o": [
        "A rotation of 90° anticlockwise about the origin",
        "A reflection in the x-axis",
        "An enlargement by factor 2",
        "A translation"
      ],
      "a": 0,
      "e": "This matrix is the standard rotation matrix for 90° anticlockwise rotation about the origin.",
      "h": "Recall the standard form of rotation matrices.",
      "yr": "SS3"
    },
    {
      "q": "Find the determinant of [[2,0,0],[0,3,0],[0,0,4]] (a diagonal matrix).",
      "o": [
        "24",
        "9",
        "2",
        "0"
      ],
      "a": 0,
      "e": "For a diagonal matrix, det=product of diagonal entries=2×3×4=24.",
      "h": "For diagonal matrices, the determinant is simply the product of the diagonal elements.",
      "yr": "SS3"
    },
    {
      "q": "Find the determinant of [[1,1,1],[2,2,2],[3,3,3]] (rows are multiples of each other).",
      "o": [
        "0",
        "6",
        "1",
        "18"
      ],
      "a": 0,
      "e": "Since the rows are proportional (linearly dependent), the determinant is 0.",
      "h": "A determinant is 0 whenever rows (or columns) are linearly dependent.",
      "yr": "SS3"
    },
    {
      "q": "What does a 3×3 matrix with determinant 0 indicate?",
      "o": [
        "The matrix is singular, meaning the system of equations it represents has no unique solution",
        "The matrix has an inverse",
        "All entries are zero",
        "The matrix represents a rotation"
      ],
      "a": 0,
      "e": "A zero determinant means the matrix is singular (non-invertible), implying the associated system has either no solution or infinitely many.",
      "h": "Recall that a zero determinant implies the matrix cannot be inverted.",
      "yr": "SS3"
    },
    {
      "q": "Apply matrix [[3,0],[0,1]] to point (2,5). What transformation does this represent?",
      "o": [
        "(6, 5) — a stretch in the x-direction by factor 3",
        "(2, 15)",
        "(6, 15)",
        "(5, 2)"
      ],
      "a": 0,
      "e": "[[3,0],[0,1]]×[2,5]=[3(2)+0(5), 0(2)+1(5)]=(6,5), stretching x by factor 3 while leaving y unchanged.",
      "h": "Multiply the matrix by the point, noting the diagonal entries scale x and y independently.",
      "yr": "SS3"
    },
    {
      "q": "Find the determinant of [[4,3,2],[1,0,1],[2,1,3]].",
      "o": [
        "-5",
        "5",
        "-1",
        "1"
      ],
      "a": 0,
      "e": "det=4(0×3−1×1)−3(1×3−1×2)+2(1×1−0×2)=4(−1)−3(1)+2(1)=−4−3+2=−5.",
      "h": "Use cofactor expansion along the top row, alternating signs carefully.",
      "yr": "SS3"
    },
    {
      "q": "Using Cramer's rule for a 3×3 system, how is each variable found?",
      "o": [
        "By dividing the determinant (with that variable's column replaced by constants) by the main determinant",
        "By adding all three determinants together",
        "By multiplying the determinants",
        "By taking the square root of the main determinant"
      ],
      "a": 0,
      "e": "Cramer's rule states xᵢ=(determinant with column i replaced by constants)÷(main determinant).",
      "h": "Recall the structure of Cramer's rule for systems of equations.",
      "yr": "SS3"
    },
    {
      "q": "Why is the identity matrix I important in matrix algebra?",
      "o": [
        "Multiplying any matrix by I leaves it unchanged, similar to multiplying a number by 1",
        "I is always the zero matrix",
        "I has no special properties",
        "I changes the dimensions of any matrix it multiplies"
      ],
      "a": 0,
      "e": "The identity matrix acts as the multiplicative identity: AI=IA=A for any compatible matrix A.",
      "h": "Think of the identity matrix as the matrix equivalent of the number 1.",
      "yr": "SS3"
    },
    {
      "q": "Find the determinant of [[5,2],[3,1]] (a 2×2 matrix, for comparison).",
      "o": [
        "-1",
        "11",
        "5",
        "2"
      ],
      "a": 0,
      "e": "det=5(1)−2(3)=5−6=−1.",
      "h": "For a 2×2 matrix [[a,b],[c,d]], det=ad−bc.",
      "yr": "SS3"
    },
    {
      "q": "If matrix A represents a reflection, what happens when A is applied twice (A²)?",
      "o": [
        "It returns the point to its original position (A² = Identity)",
        "It doubles the reflection effect",
        "It becomes undefined",
        "It rotates the point by 180°"
      ],
      "a": 0,
      "e": "Reflecting twice over the same line returns every point to its original position, so A² equals the identity matrix.",
      "h": "Think about what happens geometrically when you reflect a shape, then reflect it again over the same line.",
      "yr": "SS3"
    },
    {
      "q": "What geometric transformation does a matrix with determinant 1 preserve?",
      "o": [
        "Area (the transformation is area-preserving)",
        "Only angles, not area",
        "Nothing is preserved",
        "Only the origin stays fixed"
      ],
      "a": 0,
      "e": "The absolute value of a transformation matrix's determinant represents how areas scale; a determinant of 1 means area is preserved.",
      "h": "The determinant's magnitude represents the area scale factor of the transformation.",
      "yr": "SS3"
    },
    {
      "q": "What does a negative determinant indicate about a 2D transformation?",
      "o": [
        "The transformation includes a reflection (orientation is reversed)",
        "The transformation is impossible",
        "The matrix has no inverse",
        "The transformation only scales, never reflects"
      ],
      "a": 0,
      "e": "A negative determinant indicates the transformation flips orientation (like a mirror image), in addition to any scaling.",
      "h": "Think about how reflections affect the sign of the area scale factor.",
      "yr": "SS3"
    },
    {
      "q": "Find the determinant of the identity matrix I (3×3): [[1,0,0],[0,1,0],[0,0,1]].",
      "o": [
        "1",
        "0",
        "3",
        "-1"
      ],
      "a": 0,
      "e": "det(I)=1×1×1=1, as expected for the identity matrix.",
      "h": "For a diagonal matrix, multiply the diagonal entries.",
      "yr": "SS3"
    },
    {
      "q": "A system of three equations in three unknowns has a main determinant of 0. What does this imply?",
      "o": [
        "The system does not have a unique solution (it may have no solution or infinitely many)",
        "The system always has a unique solution",
        "The variables must all equal zero",
        "The system is impossible to analyze"
      ],
      "a": 0,
      "e": "A zero main determinant in Cramer's rule means division by zero is required, indicating the system lacks a unique solution.",
      "h": "Think about what happens when you try to divide by a zero determinant in Cramer's rule.",
      "yr": "SS3"
    },
    {
      "q": "Apply the matrix [[1,0],[0,1]] (identity) to the point (7,-3). What is the result?",
      "o": [
        "(7, -3) — unchanged",
        "(0, 0)",
        "(-7, 3)",
        "(3, -7)"
      ],
      "a": 0,
      "e": "The identity matrix leaves every point unchanged: (7,−3) maps to (7,−3).",
      "h": "Recall that the identity matrix represents 'no transformation'.",
      "yr": "SS3"
    },
    {
      "q": "Why might engineers and computer graphics designers use matrices to represent transformations?",
      "o": [
        "Matrices allow transformations (rotation, scaling, reflection) to be combined and applied efficiently through multiplication",
        "Matrices are only used in pure mathematics with no practical application",
        "Transformations cannot be represented mathematically",
        "Matrices make transformations slower to compute"
      ],
      "a": 0,
      "e": "Matrix representations allow complex sequences of transformations to be combined into a single matrix (via multiplication), making computations in graphics and engineering much more efficient.",
      "h": "Think about how combining multiple transformations benefits from matrix multiplication.",
      "yr": "SS3"
    },
    {
      "q": "Using Cramer's rule, what happens if you try to solve a system where the main determinant is non-zero but one numerator determinant is zero?",
      "o": [
        "That particular variable equals zero, while the system still has a unique solution overall",
        "The entire system has no solution",
        "All variables must be zero",
        "The system has infinite solutions"
      ],
      "a": 0,
      "e": "If the main determinant is non-zero (ensuring a unique solution exists) but a specific numerator determinant is zero, that specific variable's value is simply zero.",
      "h": "Remember that each variable is calculated independently using its own numerator determinant.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Partial Fractions",
  "topicCode": "SS3-FMT-03",
  "module": "Algebra",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Partial fractions</span> break down a complex rational expression into simpler fractions, useful in integration and algebraic manipulation.\n</div>\n\n<h3 class=\"learn-subheading\">1. Proper Rational Functions with Distinct Linear Factors</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Express 5x&minus;1 &divide; (x&minus;1)(x+2) in partial fractions.<br>Let 5x&minus;1 &divide; (x&minus;1)(x+2) = A/(x&minus;1) + B/(x+2).<br>5x&minus;1 = A(x+2) + B(x&minus;1).<br>At x=1: 4 = 3A &rArr; A = 4/3.<br>At x=&minus;2: &minus;11 = &minus;3B &rArr; B = 11/3.<br>Result: <strong>(4/3)/(x&minus;1) + (11/3)/(x+2)</strong>.</p>\n\n<h3 class=\"learn-subheading\">2. Repeated Linear Factors</h3>\n<p class=\"learn-p\">For a repeated factor (x&minus;a)&sup2;, use A/(x&minus;a) + B/(x&minus;a)&sup2;.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Express 3x+1 &divide; (x&minus;1)&sup2; in partial fractions.<br>3x+1 = A(x&minus;1) + B.<br>At x=1: 4 = B.<br>Comparing x coefficients: 3 = A.<br>Result: <strong>3/(x&minus;1) + 4/(x&minus;1)&sup2;</strong>.</p>\n\n<h3 class=\"learn-subheading\">3. Other Forms (Quadratic Denominator)</h3>\n<p class=\"learn-p\">For an irreducible quadratic factor, use (Ax+B)/(quadratic) as the partial fraction form.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Always check that the original expression is a PROPER fraction (degree of numerator less than denominator) before applying partial fractions — if not, perform polynomial division first.\n</div>\n",
  "questions": [
    {
      "q": "Express (5x-1)/((x-1)(x+2)) in partial fractions.",
      "o": [
        "(4/3)/(x-1) + (11/3)/(x+2)",
        "4/(x-1) + 11/(x+2)",
        "(4/3)/(x+1) + (11/3)/(x-2)",
        "4/(x-1) - 11/(x+2)"
      ],
      "a": 0,
      "e": "Setting 5x−1=A(x+2)+B(x−1), at x=1: A=4/3; at x=−2: B=11/3.",
      "h": "Use the cover-up method: substitute each factor's root to isolate A and B.",
      "yr": "SS3"
    },
    {
      "q": "Express (3x+1)/((x-1)²) in partial fractions.",
      "o": [
        "3/(x-1) + 4/(x-1)²",
        "3/(x-1)² + 4/(x-1)",
        "(3x+1)/(x-1)²",
        "3/(x-1) - 4/(x-1)²"
      ],
      "a": 0,
      "e": "3x+1=A(x−1)+B. At x=1: B=4. Comparing x-coefficients: A=3.",
      "h": "For a repeated factor, use A/(x−a) + B/(x−a)².",
      "yr": "SS3"
    },
    {
      "q": "What form should be used for a proper fraction with denominator (x-2)(x+3)?",
      "o": [
        "A/(x-2) + B/(x+3)",
        "A/(x-2)² + B/(x+3)²",
        "(Ax+B)/((x-2)(x+3))",
        "A(x-2) + B(x+3)"
      ],
      "a": 0,
      "e": "For distinct linear factors, use separate single fractions: A/(x−2) + B/(x+3).",
      "h": "Distinct linear factors each get their own single-term fraction.",
      "yr": "SS3"
    },
    {
      "q": "What form should be used for a repeated factor (x+1)²?",
      "o": [
        "A/(x+1) + B/(x+1)²",
        "A/(x+1)²",
        "A/(x+1) + B/(x+1)",
        "2A/(x+1)"
      ],
      "a": 0,
      "e": "Repeated linear factors require both a single power term AND the squared term: A/(x+1) + B/(x+1)².",
      "h": "Each power of the repeated factor, from 1 up to the repeat count, needs its own term.",
      "yr": "SS3"
    },
    {
      "q": "Express 1/((x-1)(x-2)) in partial fractions.",
      "o": [
        "-1/(x-1) + 1/(x-2)",
        "1/(x-1) + 1/(x-2)",
        "1/(x-1) - 1/(x-2)",
        "-1/(x-1) - 1/(x-2)"
      ],
      "a": 0,
      "e": "1=A(x−2)+B(x−1). At x=1: 1=−A, A=−1. At x=2: 1=B. Result: −1/(x−1)+1/(x−2).",
      "h": "Use the cover-up method with each root to find A and B.",
      "yr": "SS3"
    },
    {
      "q": "Why must a rational expression be 'proper' (numerator degree < denominator degree) before applying standard partial fractions?",
      "o": [
        "If improper, polynomial long division must first be performed to separate a whole polynomial part from a proper remainder fraction",
        "Improper fractions cannot have partial fraction decompositions at all",
        "Degree does not matter for partial fractions",
        "All rational expressions are automatically proper"
      ],
      "a": 0,
      "e": "Standard partial fraction techniques apply only to proper fractions; an improper fraction must first be divided to extract a polynomial part plus a proper remainder.",
      "h": "Think about why the degree comparison matters before decomposing.",
      "yr": "SS3"
    },
    {
      "q": "Express (2x+3)/((x+1)(x+2)) in partial fractions.",
      "o": [
        "1/(x+1) + 1/(x+2)",
        "1/(x+1) - 1/(x+2)",
        "2/(x+1) + 1/(x+2)",
        "-1/(x+1) + 1/(x+2)"
      ],
      "a": 0,
      "e": "2x+3=A(x+2)+B(x+1). At x=−1: 1=A. At x=−2: −1=−B, so B=1. Result: 1/(x+1)+1/(x+2).",
      "h": "Use the cover-up method with each factor's root.",
      "yr": "SS3"
    },
    {
      "q": "Express (x+5)/((x-3)(x+1)) in partial fractions.",
      "o": [
        "2/(x-3) - 1/(x+1)",
        "2/(x-3) + 1/(x+1)",
        "-2/(x-3) + 1/(x+1)",
        "2/(x+3) - 1/(x-1)"
      ],
      "a": 0,
      "e": "x+5=A(x+1)+B(x−3). At x=3: 8=4A, A=2. At x=−1: 4=−4B, B=−1. Result: 2/(x−3)−1/(x+1).",
      "h": "Substitute each root to isolate A and B.",
      "yr": "SS3"
    },
    {
      "q": "Express (7x-4)/(x(x-1)) in partial fractions.",
      "o": [
        "4/x + 3/(x-1)",
        "4/x - 3/(x-1)",
        "-4/x + 3/(x-1)",
        "4/(x-1) + 3/x"
      ],
      "a": 0,
      "e": "7x−4=A(x−1)+Bx. At x=0: −4=−A, A=4. At x=1: 3=B. Result: 4/x+3/(x−1).",
      "h": "Substitute x=0 and x=1 (the roots of the denominator) to isolate A and B.",
      "yr": "SS3"
    },
    {
      "q": "What is the main use of partial fractions in calculus?",
      "o": [
        "Simplifying complex rational functions to make integration easier",
        "Finding the derivative of polynomials",
        "Solving quadratic equations",
        "Graphing straight lines"
      ],
      "a": 0,
      "e": "Partial fractions break complex rational expressions into simpler terms that are each easy to integrate individually.",
      "h": "Think about why breaking a complex fraction into simple pieces helps in calculus.",
      "yr": "SS3"
    },
    {
      "q": "Express 2x/((x-1)(x+1)) in partial fractions.",
      "o": [
        "1/(x-1) + 1/(x+1)",
        "1/(x-1) - 1/(x+1)",
        "2/(x-1) + 2/(x+1)",
        "-1/(x-1) + 1/(x+1)"
      ],
      "a": 0,
      "e": "2x=A(x+1)+B(x−1). At x=1: 2=2A, A=1. At x=−1: −2=−2B, B=1. Result: 1/(x−1)+1/(x+1).",
      "h": "Substitute each root to isolate A and B.",
      "yr": "SS3"
    },
    {
      "q": "For an irreducible quadratic denominator like x²+1, what form should the partial fraction numerator take?",
      "o": [
        "Ax+B (a linear expression)",
        "A constant A only",
        "A/x²",
        "A quadratic expression"
      ],
      "a": 0,
      "e": "An irreducible quadratic factor requires a linear numerator (Ax+B), since a constant alone isn't general enough to match all possible numerators.",
      "h": "The numerator's degree should be one less than the denominator factor's degree.",
      "yr": "SS3"
    },
    {
      "q": "Express (4x-1)/((x+2)(x-3)) in partial fractions.",
      "o": [
        "9/(5(x+2)) + 11/(5(x-3))",
        "9/(x+2) + 11/(x-3)",
        "-9/(5(x+2)) + 11/(5(x-3))",
        "9/(5(x+2)) - 11/(5(x-3))"
      ],
      "a": 0,
      "e": "4x−1=A(x−3)+B(x+2). At x=−2: −9=−5A, A=9/5. At x=3: 11=5B, B=11/5. Result: 9/(5(x+2))+11/(5(x-3)).",
      "h": "Substitute each root, then solve for A and B, being careful with fractional coefficients.",
      "yr": "SS3"
    },
    {
      "q": "Express 6/((x-2)(x+4)) in partial fractions.",
      "o": [
        "1/(x-2) - 1/(x+4)",
        "1/(x-2) + 1/(x+4)",
        "-1/(x-2) + 1/(x+4)",
        "6/(x-2) - 6/(x+4)"
      ],
      "a": 0,
      "e": "6=A(x+4)+B(x−2). At x=2: 6=6A, A=1. At x=−4: 6=−6B, B=−1. Result: 1/(x−2)−1/(x+4).",
      "h": "Substitute each root to isolate A and B.",
      "yr": "SS3"
    },
    {
      "q": "Why is the 'cover-up method' a convenient shortcut for partial fractions with distinct linear factors?",
      "o": [
        "It allows direct substitution of each factor's root to instantly isolate that term's constant, avoiding solving simultaneous equations",
        "It works for all types of denominators equally well",
        "It eliminates the need for partial fractions entirely",
        "It only works for improper fractions"
      ],
      "a": 0,
      "e": "By substituting the root of each linear factor, all other terms vanish (become zero), allowing the corresponding constant to be found directly without solving a system of equations.",
      "h": "Think about why substituting a factor's root makes other terms disappear.",
      "yr": "SS3"
    },
    {
      "q": "Express (x²+1)/(x(x-1)) — note this is improper. What must be done first?",
      "o": [
        "Perform polynomial division since the numerator's degree equals the denominator's degree",
        "Apply standard partial fractions directly",
        "The expression cannot be decomposed",
        "Multiply both sides by x²"
      ],
      "a": 0,
      "e": "Since both numerator and denominator here have the same degree (2), this is an improper fraction, requiring division first to extract a polynomial part.",
      "h": "Compare the degrees of the numerator (2) and denominator (2, since x(x-1)=x²-x) before proceeding.",
      "yr": "SS3"
    },
    {
      "q": "Express (3x-5)/((x-1)(x-4)) in partial fractions.",
      "o": [
        "(2/3)/(x-1) + (7/3)/(x-4)",
        "2/(x-1) + 7/(x-4)",
        "-(2/3)/(x-1) + (7/3)/(x-4)",
        "(2/3)/(x-1) - (7/3)/(x-4)"
      ],
      "a": 0,
      "e": "3x−5=A(x−4)+B(x−1). At x=1: −2=−3A, A=2/3. At x=4: 7=3B, B=7/3.",
      "h": "Substitute each root to isolate A and B.",
      "yr": "SS3"
    },
    {
      "q": "Why are partial fractions especially useful when integrating rational functions with distinct linear factors in the denominator?",
      "o": [
        "Each resulting simple fraction integrates directly to a logarithmic function, which is much easier than integrating the original complex fraction",
        "Partial fractions eliminate the need for integration entirely",
        "They only work for non-calculus applications",
        "They make the function impossible to integrate"
      ],
      "a": 0,
      "e": "Each term of the form A/(x−a) integrates to A ln|x−a|, a standard and simple result, making the overall integration process far more manageable than attempting the original complex fraction directly.",
      "h": "Think about the standard integral of 1/(x-a).",
      "yr": "SS3"
    },
    {
      "q": "Express 5/((x+1)(x+6)) in partial fractions.",
      "o": [
        "1/(x+1) - 1/(x+6)",
        "1/(x+1) + 1/(x+6)",
        "-1/(x+1) + 1/(x+6)",
        "5/(x+1) - 5/(x+6)"
      ],
      "a": 0,
      "e": "5=A(x+6)+B(x+1). At x=−1: 5=5A, A=1. At x=−6: 5=−5B, B=−1. Result: 1/(x+1)−1/(x+6).",
      "h": "Substitute each root to isolate A and B.",
      "yr": "SS3"
    },
    {
      "q": "What check should be performed after finding a partial fraction decomposition?",
      "o": [
        "Recombine the fractions over a common denominator and verify it matches the original expression",
        "No check is needed once A and B are found",
        "Only check the sign of A",
        "Verify the denominator is correct only"
      ],
      "a": 0,
      "e": "Combining the resulting partial fractions back into a single fraction and comparing with the original expression confirms the decomposition is correct.",
      "h": "Think about how you would verify any algebraic decomposition is accurate.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Probability Distributions",
  "topicCode": "SS3-FMT-04",
  "module": "Statistics and Probability",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic covers three key <span class=\"learn-keyword\">probability distributions</span>: <span class=\"learn-keyword\">Binomial</span>, <span class=\"learn-keyword\">Poisson</span>, and <span class=\"learn-keyword\">Normal</span>, used to model different types of random events.\n</div>\n\n<h3 class=\"learn-subheading\">1. Binomial Distribution</h3>\n<p class=\"learn-p\">Used for a fixed number of independent trials, each with the same probability of success.<br><strong>P(X=r) = &#8319;C&#8348; p<sup>r</sup> q<sup>n&minus;r</sup></strong>, where p=P(success), q=1&minus;p, n=trials.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> A coin is tossed 5 times. Find P(exactly 3 heads).<br>n=5, p=0.5, r=3. P = &#8309;C&#8323; (0.5)&#179;(0.5)&sup2; = 10 &times; 0.125 &times; 0.25 = <strong>0.3125</strong>.</p>\n\n<h3 class=\"learn-subheading\">2. Poisson Distribution</h3>\n<p class=\"learn-p\">Used for rare events over a fixed interval (time/space), with mean &lambda;.<br><strong>P(X=r) = (e<sup>&minus;&lambda;</sup> &lambda;<sup>r</sup>) &divide; r!</strong></p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> If the average number of calls per minute is 2 (&lambda;=2), find P(exactly 1 call) (e&#8315;&sup2;&asymp;0.1353).<br>P(X=1) = (0.1353 &times; 2) &divide; 1 = <strong>0.2706</strong>.</p>\n\n<h3 class=\"learn-subheading\">3. Normal Distribution</h3>\n<p class=\"learn-p\">A continuous, symmetric bell-shaped distribution, described by mean &mu; and standard deviation &sigma;. Values are standardized using <strong>Z = (X&minus;&mu;)/&sigma;</strong> to use standard normal tables.</p>\n\n<h3 class=\"learn-subheading\">4. Binomial Approximation by Poisson</h3>\n<p class=\"learn-p\">When n is large and p is small, Binomial(n,p) can be approximated by Poisson with &lambda;=np.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Use Binomial for a FIXED number of trials; use Poisson for events occurring over a continuous interval with a known average rate.\n</div>\n",
  "questions": [
    {
      "q": "A coin is tossed 5 times. Find P(exactly 3 heads).",
      "o": [
        "0.3125",
        "0.5",
        "0.25",
        "0.125"
      ],
      "a": 0,
      "e": "P=⁵C₃(0.5)³(0.5)²=10×0.125×0.25=0.3125.",
      "h": "Use P(X=r)=ⁿCᵣ pʳ q^(n-r).",
      "yr": "SS3"
    },
    {
      "q": "If the average number of calls per minute is 2, find P(exactly 1 call) using Poisson (e⁻²≈0.1353).",
      "o": [
        "0.2706",
        "0.1353",
        "0.5413",
        "0.0902"
      ],
      "a": 0,
      "e": "P(X=1)=(0.1353×2)/1=0.2706.",
      "h": "Use P(X=r)=(e^(-λ)λʳ)/r!.",
      "yr": "SS3"
    },
    {
      "q": "What type of distribution is used for a fixed number of independent trials with constant success probability?",
      "o": [
        "Binomial distribution",
        "Poisson distribution",
        "Normal distribution",
        "None of these"
      ],
      "a": 0,
      "e": "The Binomial distribution models a fixed number of independent trials, each with the same success probability.",
      "h": "Think about which distribution requires a specific count of repeated trials.",
      "yr": "SS3"
    },
    {
      "q": "What type of distribution is used for rare events over a continuous interval with a known average rate?",
      "o": [
        "Poisson distribution",
        "Binomial distribution",
        "Normal distribution",
        "None of these"
      ],
      "a": 0,
      "e": "The Poisson distribution models the number of events in a fixed interval, given an average rate.",
      "h": "Think about events like calls per minute or accidents per day.",
      "yr": "SS3"
    },
    {
      "q": "What is the formula used to standardize a normal distribution value X?",
      "o": [
        "Z=(X-μ)/σ",
        "Z=X-μ",
        "Z=X/σ",
        "Z=μ/X"
      ],
      "a": 0,
      "e": "Standardization converts X to a Z-score: Z=(X−μ)/σ.",
      "h": "Subtract the mean, then divide by the standard deviation.",
      "yr": "SS3"
    },
    {
      "q": "A die is rolled 4 times. Find P(exactly 2 sixes), given p=1/6, q=5/6.",
      "o": [
        "0.1157",
        "0.5",
        "0.25",
        "0.0231"
      ],
      "a": 0,
      "e": "P=⁴C₂(1/6)²(5/6)²=6×(1/36)×(25/36)≈0.1157.",
      "h": "Use the binomial formula with n=4, r=2, p=1/6.",
      "yr": "SS3"
    },
    {
      "q": "When can a Binomial distribution be approximated by a Poisson distribution?",
      "o": [
        "When n is large and p is small",
        "When n is small and p is large",
        "Only when p=0.5",
        "Never, they are unrelated"
      ],
      "a": 0,
      "e": "The Poisson approximation to the Binomial works well when n is large and p is small, with λ=np.",
      "h": "Think about the conditions for 'rare events' approximation.",
      "yr": "SS3"
    },
    {
      "q": "If n=100 and p=0.02 for a binomial distribution, find λ for the Poisson approximation.",
      "o": [
        "2",
        "0.02",
        "100",
        "50"
      ],
      "a": 0,
      "e": "λ=np=100×0.02=2.",
      "h": "Use λ=np for the Poisson approximation parameter.",
      "yr": "SS3"
    },
    {
      "q": "What shape does a normal distribution curve have?",
      "o": [
        "Symmetric, bell-shaped",
        "Skewed to the right",
        "Uniform (flat)",
        "Skewed to the left"
      ],
      "a": 0,
      "e": "The normal distribution is symmetric and bell-shaped, centered at the mean.",
      "h": "Think of the classic 'bell curve'.",
      "yr": "SS3"
    },
    {
      "q": "A biased coin has P(head)=0.3. Find P(exactly 2 heads) in 3 tosses.",
      "o": [
        "0.189",
        "0.3",
        "0.09",
        "0.027"
      ],
      "a": 0,
      "e": "P=³C₂(0.3)²(0.7)¹=3×0.09×0.7=0.189.",
      "h": "Use the binomial formula with n=3, r=2, p=0.3.",
      "yr": "SS3"
    },
    {
      "q": "What are the key parameters that define a normal distribution?",
      "o": [
        "Mean (μ) and standard deviation (σ)",
        "Only the mean",
        "Only the standard deviation",
        "Number of trials and probability of success"
      ],
      "a": 0,
      "e": "A normal distribution is fully described by its mean μ and standard deviation σ.",
      "h": "Two parameters determine the shape and position of a normal curve.",
      "yr": "SS3"
    },
    {
      "q": "In a Poisson distribution with λ=3, find P(X=0) (e⁻³≈0.0498).",
      "o": [
        "0.0498",
        "0.1494",
        "0.2240",
        "0.0821"
      ],
      "a": 0,
      "e": "P(X=0)=(e⁻³×3⁰)/0!=0.0498×1/1=0.0498.",
      "h": "Use P(X=0)=(e^(-λ)λ⁰)/0!, noting 3⁰=1 and 0!=1.",
      "yr": "SS3"
    },
    {
      "q": "In a Poisson distribution with λ=3, find P(X=1) using e⁻³≈0.0498.",
      "o": [
        "0.1494",
        "0.0498",
        "0.2240",
        "0.0821"
      ],
      "a": 0,
      "e": "P(X=1)=(0.0498×3)/1=0.1494.",
      "h": "Use P(X=1)=(e^(-λ)λ¹)/1!.",
      "yr": "SS3"
    },
    {
      "q": "A quality control process finds 5% of items defective. For a batch of 10 items, which distribution best models the number of defects?",
      "o": [
        "Binomial distribution",
        "Normal distribution",
        "Poisson distribution (always preferred for any %)",
        "None of these"
      ],
      "a": 0,
      "e": "With a fixed number of trials (10 items) and constant probability of defect (5%), the Binomial distribution is the direct and appropriate model.",
      "h": "Look for a fixed number of trials with a constant success/failure probability.",
      "yr": "SS3"
    },
    {
      "q": "Find the probability of getting at least 1 head in 3 coin tosses using the complement rule.",
      "o": [
        "0.875",
        "0.125",
        "0.5",
        "0.75"
      ],
      "a": 0,
      "e": "P(at least 1 head)=1−P(no heads)=1−(0.5)³=1−0.125=0.875.",
      "h": "Use the complement: P(at least 1)=1−P(none).",
      "yr": "SS3"
    },
    {
      "q": "Why is the Normal distribution considered continuous, while Binomial and Poisson are discrete?",
      "o": [
        "Normal distribution variables can take any value within a range, while Binomial/Poisson count whole-number occurrences",
        "All three distributions are actually continuous",
        "Binomial and Poisson are also continuous",
        "There is no real difference between them"
      ],
      "a": 0,
      "e": "Binomial and Poisson distributions count discrete events (whole numbers like 0,1,2,...), while the Normal distribution models continuous measurements (like height or weight) that can take any value.",
      "h": "Think about whether the outcomes being modeled are 'counts' or 'measurements'.",
      "yr": "SS3"
    },
    {
      "q": "A factory produces light bulbs with 2% defect rate. In a Poisson approximation for 200 bulbs, find λ.",
      "o": [
        "4",
        "2",
        "200",
        "0.02"
      ],
      "a": 0,
      "e": "λ=np=200×0.02=4.",
      "h": "Multiply the sample size by the defect probability.",
      "yr": "SS3"
    },
    {
      "q": "In a binomial distribution, what does 'q' represent?",
      "o": [
        "The probability of failure (q=1-p)",
        "The probability of success",
        "The number of trials",
        "The number of successes"
      ],
      "a": 0,
      "e": "q represents the probability of failure, calculated as 1 minus the probability of success (p).",
      "h": "q is the complement of p.",
      "yr": "SS3"
    },
    {
      "q": "Why is the Poisson distribution particularly useful for modeling rare events like accidents or system failures?",
      "o": [
        "Because it accurately models the probability of a small number of events occurring over a fixed interval given a known average rate, especially when individual probabilities are very low",
        "It only works for common, frequent events",
        "It cannot model any real-world phenomena",
        "It requires events to be guaranteed to happen"
      ],
      "a": 0,
      "e": "The Poisson distribution is mathematically derived for scenarios with low individual event probability but many opportunities for the event to occur, making it ideal for rare-event modeling.",
      "h": "Think about the conditions that make Poisson the natural choice for rare, random events.",
      "yr": "SS3"
    },
    {
      "q": "A survey shows 60% of students prefer online classes. For a sample of 5 students, find the expected number who prefer online classes.",
      "o": [
        "3",
        "5",
        "2.5",
        "0.6"
      ],
      "a": 0,
      "e": "Expected value (mean) of a binomial distribution = np = 5×0.6=3.",
      "h": "Use the formula for the mean of a binomial distribution: E(X)=np.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Variance",
  "topicCode": "SS3-FMT-05",
  "module": "Statistics and Probability",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic covers <span class=\"learn-keyword\">mean</span>, <span class=\"learn-keyword\">variance</span>, and <span class=\"learn-keyword\">coefficient of variation</span> of the Binomial, Poisson, and Normal distributions.\n</div>\n\n<h3 class=\"learn-subheading\">1. Binomial Distribution: Mean and Variance</h3>\n<p class=\"learn-p\"><strong>Mean (&mu;) = np</strong> &nbsp;&nbsp; <strong>Variance (&sigma;&sup2;) = npq</strong></p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> For n=20, p=0.3, find the mean and variance.<br>Mean = 20(0.3) = 6. Variance = 20(0.3)(0.7) = <strong>4.2</strong>.</p>\n\n<h3 class=\"learn-subheading\">2. Poisson Distribution: Mean and Variance</h3>\n<p class=\"learn-p\">For Poisson, <strong>Mean = Variance = &lambda;</strong> (a special property).</p>\n\n<h3 class=\"learn-subheading\">3. Normal Distribution: Mean and Variance</h3>\n<p class=\"learn-p\">Defined directly by parameters &mu; (mean) and &sigma;&sup2; (variance).</p>\n\n<h3 class=\"learn-subheading\">4. Coefficient of Variation</h3>\n<p class=\"learn-p\"><strong>CV = (&sigma; &divide; &mu;) &times; 100%</strong> &mdash; measures relative variability (useful for comparing spread between datasets with different means).</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> For a distribution with mean=50 and standard deviation=5, find the CV.<br>CV = (5/50) &times; 100% = <strong>10%</strong>.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Remember the standard deviation is the SQUARE ROOT of variance — don't confuse the two when answering questions.\n</div>\n",
  "questions": [
    {
      "q": "For a binomial distribution with n=20, p=0.3, find the mean.",
      "o": [
        "6",
        "4.2",
        "2.05",
        "14"
      ],
      "a": 0,
      "e": "Mean=np=20×0.3=6.",
      "h": "Use Mean=np for a binomial distribution.",
      "yr": "SS3"
    },
    {
      "q": "For the same binomial distribution (n=20, p=0.3), find the variance.",
      "o": [
        "4.2",
        "6",
        "2.05",
        "14"
      ],
      "a": 0,
      "e": "Variance=npq=20×0.3×0.7=4.2.",
      "h": "Use Variance=npq, where q=1−p.",
      "yr": "SS3"
    },
    {
      "q": "For a Poisson distribution with λ=7, what is the variance?",
      "o": [
        "7",
        "49",
        "3.5",
        "14"
      ],
      "a": 0,
      "e": "For a Poisson distribution, variance always equals the mean (λ): variance=7.",
      "h": "Recall the special Poisson property: mean=variance=λ.",
      "yr": "SS3"
    },
    {
      "q": "Find the coefficient of variation for a distribution with mean=50 and standard deviation=5.",
      "o": [
        "10%",
        "20%",
        "5%",
        "50%"
      ],
      "a": 0,
      "e": "CV=(5/50)×100%=10%.",
      "h": "Use CV=(σ/μ)×100%.",
      "yr": "SS3"
    },
    {
      "q": "For a binomial distribution with n=50, p=0.4, find the mean and variance.",
      "o": [
        "Mean=20, Variance=12",
        "Mean=12, Variance=20",
        "Mean=20, Variance=20",
        "Mean=12, Variance=12"
      ],
      "a": 0,
      "e": "Mean=np=50×0.4=20. Variance=npq=50×0.4×0.6=12.",
      "h": "Apply Mean=np and Variance=npq.",
      "yr": "SS3"
    },
    {
      "q": "What is the standard deviation of a distribution with variance=16?",
      "o": [
        "4",
        "16",
        "8",
        "256"
      ],
      "a": 0,
      "e": "Standard deviation=√variance=√16=4.",
      "h": "Standard deviation is the square root of variance.",
      "yr": "SS3"
    },
    {
      "q": "For a Poisson distribution with mean=5, find the standard deviation.",
      "o": [
        "2.24",
        "5",
        "25",
        "10"
      ],
      "a": 0,
      "e": "Variance=mean=5 for Poisson. Standard deviation=√5≈2.24.",
      "h": "Find the variance first (equals the mean for Poisson), then take the square root.",
      "yr": "SS3"
    },
    {
      "q": "Which distribution has the unique property that mean equals variance?",
      "o": [
        "Poisson distribution",
        "Binomial distribution",
        "Normal distribution",
        "All distributions have this property"
      ],
      "a": 0,
      "e": "The Poisson distribution has the special property that its mean and variance are both equal to λ.",
      "h": "This is a defining characteristic distinguishing Poisson from Binomial and Normal.",
      "yr": "SS3"
    },
    {
      "q": "For a binomial distribution with n=100, p=0.5, find the variance.",
      "o": [
        "25",
        "50",
        "75",
        "10"
      ],
      "a": 0,
      "e": "Variance=npq=100×0.5×0.5=25.",
      "h": "Apply Variance=npq.",
      "yr": "SS3"
    },
    {
      "q": "Compare two distributions: A (mean=20, SD=4) and B (mean=50, SD=8). Which has higher relative variability (CV)?",
      "o": [
        "A, since CV_A=20% vs CV_B=16%",
        "B, since its SD is larger",
        "They have the same CV",
        "Cannot be determined"
      ],
      "a": 0,
      "e": "CV_A=(4/20)×100%=20%. CV_B=(8/50)×100%=16%. Since 20%>16%, A has higher relative variability.",
      "h": "Calculate CV for both and compare — a larger raw SD doesn't always mean higher relative variability.",
      "yr": "SS3"
    },
    {
      "q": "Why is the coefficient of variation useful when comparing two datasets with different means?",
      "o": [
        "It expresses variability as a percentage relative to the mean, allowing fair comparison regardless of scale",
        "It eliminates the need for standard deviation",
        "It is only used for Normal distributions",
        "It always equals the standard deviation"
      ],
      "a": 0,
      "e": "Since CV standardizes spread relative to the mean, it allows meaningful comparison between datasets with very different scales or units.",
      "h": "Think about why comparing raw standard deviations can be misleading between datasets of different scales.",
      "yr": "SS3"
    },
    {
      "q": "For a binomial distribution with mean=8 and variance=4.8, find p (using variance=npq and mean=np).",
      "o": [
        "0.4",
        "0.6",
        "0.8",
        "0.2"
      ],
      "a": 0,
      "e": "q=variance/mean=4.8/8=0.6. So p=1−q=0.4.",
      "h": "Divide variance by mean to find q, then subtract from 1 to find p.",
      "yr": "SS3"
    },
    {
      "q": "Using the previous result (p=0.4, mean=8), find n.",
      "o": [
        "20",
        "15",
        "10",
        "25"
      ],
      "a": 0,
      "e": "mean=np=8. n=8/p=8/0.4=20.",
      "h": "Divide the mean by p to find n.",
      "yr": "SS3"
    },
    {
      "q": "A normal distribution has mean=100 and variance=25. Find the standard deviation.",
      "o": [
        "5",
        "25",
        "10",
        "2.5"
      ],
      "a": 0,
      "e": "Standard deviation=√25=5.",
      "h": "Take the square root of the variance.",
      "yr": "SS3"
    },
    {
      "q": "Find the coefficient of variation for the normal distribution with mean=100 and SD=5.",
      "o": [
        "5%",
        "10%",
        "20%",
        "2%"
      ],
      "a": 0,
      "e": "CV=(5/100)×100%=5%.",
      "h": "Use CV=(σ/μ)×100%.",
      "yr": "SS3"
    },
    {
      "q": "If a binomial distribution has p=0.5, what is the maximum possible value of q (and how does this affect variance)?",
      "o": [
        "q=0.5, giving the maximum possible variance (npq) for a given n",
        "q=1, giving zero variance",
        "q=0, giving maximum variance",
        "Variance is unaffected by p and q"
      ],
      "a": 0,
      "e": "Variance npq is maximized when p=q=0.5 (since the product pq is maximized at this point, given p+q=1), making p=0.5 the point of greatest binomial variability.",
      "h": "Think about how the product pq behaves as p varies between 0 and 1.",
      "yr": "SS3"
    },
    {
      "q": "For a Poisson distribution with variance=9, find the mean.",
      "o": [
        "9",
        "3",
        "81",
        "4.5"
      ],
      "a": 0,
      "e": "Since mean=variance for Poisson, mean=9.",
      "h": "Recall the special Poisson property.",
      "yr": "SS3"
    },
    {
      "q": "A dataset has CV=25% and mean=80. Find the standard deviation.",
      "o": [
        "20",
        "25",
        "80",
        "100"
      ],
      "a": 0,
      "e": "CV=(σ/μ)×100%. 25=(σ/80)×100. σ=25×80/100=20.",
      "h": "Rearrange the CV formula to solve for standard deviation.",
      "yr": "SS3"
    },
    {
      "q": "Why does the variance formula npq for a binomial distribution always give a non-negative result?",
      "o": [
        "Because n, p, and q are all non-negative (n is a count, p and q are probabilities between 0 and 1)",
        "Variance can sometimes be negative",
        "npq can be any real number",
        "There is no mathematical reason"
      ],
      "a": 0,
      "e": "Since n≥0 (a count of trials) and both p and q are probabilities (values between 0 and 1, hence non-negative), their product npq must also be non-negative, consistent with variance always being ≥0.",
      "h": "Think about the possible value ranges of n, p, and q.",
      "yr": "SS3"
    },
    {
      "q": "A manufacturing process has a defect rate modeled by Poisson with λ=2.5. Find the variance and standard deviation.",
      "o": [
        "Variance=2.5, SD≈1.58",
        "Variance=6.25, SD=2.5",
        "Variance=1.58, SD=2.5",
        "Variance=2.5, SD=2.5"
      ],
      "a": 0,
      "e": "For Poisson, variance=λ=2.5. SD=√2.5≈1.58.",
      "h": "Remember variance=λ for Poisson, then take the square root for SD.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Correlation",
  "topicCode": "SS3-FMT-06",
  "module": "Statistics and Probability",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Correlation</span> measures the strength and direction of a relationship between two variables. This topic covers scatter diagrams and Spearman's rank correlation coefficient.\n</div>\n\n<h3 class=\"learn-subheading\">1. Scatter Diagrams</h3>\n<p class=\"learn-p\">A scatter diagram plots paired data points to visually assess the relationship. Points trending upward (left to right) suggest positive correlation; downward suggests negative correlation; no clear pattern suggests no correlation.</p>\n\n<h3 class=\"learn-subheading\">2. Spearman's Rank Correlation Coefficient</h3>\n<p class=\"learn-p\"><strong>r<sub>s</sub> = 1 &minus; [6&Sigma;d&sup2; &divide; n(n&sup2;&minus;1)]</strong>, where d = difference in ranks, n = number of pairs.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Two judges rank 5 contestants. The rank differences are d = 1,&minus;1,2,&minus;2,0. Find r<sub>s</sub>.<br>d&sup2; = 1,1,4,4,0. &Sigma;d&sup2;=10.<br>r<sub>s</sub> = 1 &minus; [6(10) &divide; 5(25&minus;1)] = 1 &minus; [60/120] = 1&minus;0.5 = <strong>0.5</strong>.</p>\n\n<h3 class=\"learn-subheading\">3. Interpreting the Correlation Coefficient</h3>\n<p class=\"learn-p\">r<sub>s</sub> ranges from &minus;1 to +1. Values close to +1 indicate strong positive correlation; close to &minus;1 indicate strong negative correlation; close to 0 indicate little/no correlation.</p>\n\n<h3 class=\"learn-subheading\">4. Tied Ranks</h3>\n<p class=\"learn-p\">When two or more values are equal, assign each the AVERAGE of the ranks they would have occupied.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> If two values would normally be ranked 3rd and 4th, both receive rank <strong>3.5</strong>.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Always double-check that &Sigma;d = 0 before computing r<sub>s</sub> &mdash; this is a built-in check since rank differences should balance out.\n</div>\n",
  "questions": [
    {
      "q": "Two judges rank 5 contestants with rank differences d=1,-1,2,-2,0. Find Spearman's rank correlation coefficient.",
      "o": [
        "0.5",
        "1",
        "0.6",
        "0.4"
      ],
      "a": 0,
      "e": "Σd²=1+1+4+4+0=10. rs=1−[6(10)/5(24)]=1−[60/120]=1−0.5=0.5.",
      "h": "Use rs=1−[6Σd²/n(n²-1)].",
      "yr": "SS3"
    },
    {
      "q": "What does a scatter diagram with points trending upward (left to right) suggest?",
      "o": [
        "Positive correlation",
        "Negative correlation",
        "No correlation",
        "Perfect correlation only"
      ],
      "a": 0,
      "e": "An upward trend indicates that as one variable increases, the other also tends to increase — positive correlation.",
      "h": "Think about the direction of the overall pattern of points.",
      "yr": "SS3"
    },
    {
      "q": "What does a scatter diagram with points trending downward (left to right) suggest?",
      "o": [
        "Negative correlation",
        "Positive correlation",
        "No correlation",
        "Perfect correlation only"
      ],
      "a": 0,
      "e": "A downward trend indicates that as one variable increases, the other tends to decrease — negative correlation.",
      "h": "Think about the direction of the overall pattern of points.",
      "yr": "SS3"
    },
    {
      "q": "What is the range of Spearman's rank correlation coefficient?",
      "o": [
        "-1 to +1",
        "0 to 1",
        "-1 to 0",
        "0 to 100"
      ],
      "a": 0,
      "e": "rs ranges from −1 (perfect negative correlation) to +1 (perfect positive correlation).",
      "h": "Correlation coefficients are always bounded between −1 and 1.",
      "yr": "SS3"
    },
    {
      "q": "How should tied ranks be handled in Spearman's rank correlation?",
      "o": [
        "Assign each tied value the average of the ranks they would have occupied",
        "Assign both the higher rank",
        "Assign both the lower rank",
        "Ties cannot be handled; data must be discarded"
      ],
      "a": 0,
      "e": "Tied values receive the average of the ranks they would span (e.g., two values tied for 3rd and 4th both get rank 3.5).",
      "h": "Average the ranks that the tied values would have occupied.",
      "yr": "SS3"
    },
    {
      "q": "If two values are tied for 2nd and 3rd place, what rank should each receive?",
      "o": [
        "2.5",
        "2",
        "3",
        "Either 2 or 3, chosen arbitrarily"
      ],
      "a": 0,
      "e": "Average of 2 and 3 is 2.5, assigned to both tied values.",
      "h": "Average the two rank positions.",
      "yr": "SS3"
    },
    {
      "q": "Find Spearman's rank correlation coefficient given Σd²=0 and n=6.",
      "o": [
        "1 (perfect positive correlation)",
        "0",
        "-1",
        "0.5"
      ],
      "a": 0,
      "e": "rs=1−[6(0)/6(35)]=1−0=1, indicating perfect positive correlation (ranks match exactly).",
      "h": "When Σd²=0, every rank difference is zero, meaning the rankings perfectly agree.",
      "yr": "SS3"
    },
    {
      "q": "What does rs=-1 indicate about the relationship between two rankings?",
      "o": [
        "Perfect negative correlation (rankings are exact opposites)",
        "Perfect positive correlation",
        "No correlation at all",
        "An error in calculation"
      ],
      "a": 0,
      "e": "rs=−1 means the two rankings are exact opposites — as one rank increases, the other decreases perfectly.",
      "h": "The most negative possible value represents perfectly opposing rank order.",
      "yr": "SS3"
    },
    {
      "q": "What does rs=0 indicate?",
      "o": [
        "No consistent relationship between the two rankings",
        "Perfect positive correlation",
        "Perfect negative correlation",
        "An error in the data"
      ],
      "a": 0,
      "e": "rs=0 suggests there is no consistent linear relationship between the two sets of rankings.",
      "h": "Zero correlation means no discernible pattern links the two rankings.",
      "yr": "SS3"
    },
    {
      "q": "Calculate rs given Σd²=20 and n=6.",
      "o": [
        "0.429",
        "0.5",
        "0.571",
        "0.6"
      ],
      "a": 0,
      "e": "rs=1−[6(20)/6(35)]=1−[120/210]=1−0.571=0.429.",
      "h": "Substitute carefully into the formula, computing n(n²-1) first.",
      "yr": "SS3"
    },
    {
      "q": "In a study, rs between hours studied and exam scores is 0.85. What does this suggest?",
      "o": [
        "A strong positive relationship between study hours and exam scores",
        "A strong negative relationship",
        "No meaningful relationship",
        "The data must be incorrect"
      ],
      "a": 0,
      "e": "A value close to +1 (0.85) indicates a strong positive correlation, suggesting more study hours tend to associate with higher scores.",
      "h": "Values close to +1 indicate strong positive correlation.",
      "yr": "SS3"
    },
    {
      "q": "What should Σd always equal (before squaring) in a Spearman's rank correlation calculation, and why?",
      "o": [
        "0, since rank differences should balance out (some positive, some negative)",
        "It should always equal n",
        "It should always be positive",
        "It has no fixed expected value"
      ],
      "a": 0,
      "e": "Since ranks are assigned from 1 to n for both variables, the positive and negative differences should sum to zero — a useful check for calculation errors.",
      "h": "Think about why rank differences (not squared) should cancel out overall.",
      "yr": "SS3"
    },
    {
      "q": "A scatter diagram shows points scattered randomly with no visible pattern. What does this suggest about correlation?",
      "o": [
        "Little to no correlation between the variables",
        "Strong positive correlation",
        "Strong negative correlation",
        "Perfect correlation"
      ],
      "a": 0,
      "e": "Random scatter with no discernible trend suggests the variables have little or no linear relationship.",
      "h": "No visible pattern means no clear correlation.",
      "yr": "SS3"
    },
    {
      "q": "Find rs given Σd²=4 and n=4.",
      "o": [
        "0.8",
        "0.6",
        "0.4",
        "0.9"
      ],
      "a": 0,
      "e": "rs=1−[6(4)/4(15)]=1−[24/60]=1−0.4=0.6. Rechecking: 24/60=0.4, so rs=0.6, matching option index1.",
      "h": "Compute n(n²-1) carefully, then substitute into the formula.",
      "yr": "SS3"
    },
    {
      "q": "Why might Spearman's rank correlation be preferred over other correlation methods when data is ordinal (ranked) rather than exact numerical values?",
      "o": [
        "It is specifically designed to measure the relationship between ranked (ordinal) data, rather than requiring precise numerical measurements",
        "It only works with numerical data",
        "It is less accurate than other methods always",
        "It cannot handle ranked data at all"
      ],
      "a": 0,
      "e": "Spearman's method is built around comparing RANK orderings, making it the natural and appropriate tool when exact numerical values are unavailable or less meaningful than relative ranking.",
      "h": "Think about situations where only relative order (not precise values) is known, like judging competitions.",
      "yr": "SS3"
    },
    {
      "q": "If a dataset has exactly matching ranks for all n pairs (perfect agreement), what is Σd² and rs?",
      "o": [
        "Σd²=0, rs=1",
        "Σd²=n, rs=0",
        "Σd²=1, rs=0",
        "Σd²=0, rs=0"
      ],
      "a": 0,
      "e": "Perfect agreement means every difference d=0, so Σd²=0, giving rs=1.",
      "h": "Perfectly matching ranks mean zero rank differences throughout.",
      "yr": "SS3"
    },
    {
      "q": "Two examiners rank 8 candidates with Σd²=42. Find rs.",
      "o": [
        "0.5",
        "0.6",
        "0.4",
        "0.45"
      ],
      "a": 0,
      "e": "rs=1−[6(42)/8(63)]=1−[252/504]=1−0.5=0.5.",
      "h": "Calculate n(n²-1)=8(64-1)=8(63)=504, then substitute.",
      "yr": "SS3"
    },
    {
      "q": "Why is it important to assign ranks consistently (e.g., always rank from highest to lowest) across both variables in Spearman's calculation?",
      "o": [
        "Inconsistent ranking direction would distort the calculated differences and give a meaningless or incorrect correlation value",
        "Ranking direction doesn't matter at all",
        "It only matters for negative correlations",
        "Consistent ranking is only needed for large datasets"
      ],
      "a": 0,
      "e": "If one variable is ranked highest-to-lowest and the other lowest-to-highest, the resulting differences would not accurately reflect the true relationship, producing a misleading rs value.",
      "h": "Think about what would happen to the rank differences if the ranking direction were inconsistent.",
      "yr": "SS3"
    },
    {
      "q": "A correlation coefficient of rs=0.1 is found between shoe size and test scores among adults. What is the likely interpretation?",
      "o": [
        "Essentially no meaningful correlation; shoe size likely has no real relationship with test scores",
        "A strong positive relationship",
        "A strong negative relationship",
        "The data must be re-collected"
      ],
      "a": 0,
      "e": "A value very close to 0 indicates negligible correlation — in this case, confirming the intuitive expectation that shoe size and test scores are unrelated.",
      "h": "Values near 0 indicate little to no meaningful relationship.",
      "yr": "SS3"
    },
    {
      "q": "What practical use does correlation analysis have in fields like economics or social science?",
      "o": [
        "It helps identify and quantify relationships between variables (e.g., income and spending), informing predictions and policy decisions",
        "It has no practical use outside pure statistics",
        "It can only be used with perfectly ranked data",
        "It proves causation between variables"
      ],
      "a": 0,
      "e": "Correlation analysis helps researchers and policymakers understand how variables relate, supporting decisions in economics, social science, business, and more — though it's important to remember correlation does not imply causation.",
      "h": "Think about how understanding relationships between variables supports real-world decision-making.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Integration",
  "topicCode": "SS3-FMT-07",
  "module": "Calculus",
  "term": "Second Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic extends <span class=\"learn-keyword\">integration</span> to logarithmic functions, definite integrals with kinematics applications, areas under curves, the <span class=\"learn-keyword\">trapezoidal rule</span>, and <span class=\"learn-keyword\">volumes of solids of revolution</span>.\n</div>\n\n<h3 class=\"learn-subheading\">1. Integration Involving Logarithms</h3>\n<p class=\"learn-p\"><strong>&int;(1/x) dx = ln|x| + C</strong></p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Integrate &int;(3/x) dx.<br>= 3ln|x| + <strong>C</strong>.</p>\n\n<h3 class=\"learn-subheading\">2. Kinematics: v-t and s-t Graphs</h3>\n<p class=\"learn-p\">Area under a v-t graph = displacement. Area under an a-t graph = change in velocity.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> If v=4t+2 (m/s), find displacement from t=0 to t=3.<br>s = &int;&#8320;&#179;(4t+2)dt = [2t&sup2;+2t]&#8320;&#179; = (18+6)&minus;0 = <strong>24m</strong>.</p>\n\n<h3 class=\"learn-subheading\">3. Trapezoidal Rule</h3>\n<p class=\"learn-p\"><strong>Area &asymp; h/2 [y&#8320;+y&#8345; + 2(y&#8321;+y&#8322;+...+y<sub>n&minus;1</sub>)]</strong>, where h is the strip width.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Estimate &int;&#8320;&#8308; x&sup2; dx using the trapezoidal rule with 4 strips (h=1), where y-values at x=0,1,2,3,4 are 0,1,4,9,16.<br>Area &asymp; 1/2 [0+16 + 2(1+4+9)] = 1/2[16+28] = <strong>22</strong> (compared to the exact value of 64/3&asymp;21.33).</p>\n\n<h3 class=\"learn-subheading\">4. Volume of Solids of Revolution</h3>\n<p class=\"learn-p\"><strong>V = &pi;&int;<sub>a</sub><sup>b</sup> y&sup2; dx</strong> (rotation about the x-axis).</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the volume generated when y=x is rotated about the x-axis from x=0 to x=3.<br>V = &pi;&int;&#8320;&#179; x&sup2; dx = &pi;[x&#179;/3]&#8320;&#179; = &pi;(9) = <strong>9&pi;</strong>.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> For the trapezoidal rule, remember the pattern: ends counted once, all interior points counted TWICE, then multiply by h/2.\n</div>\n",
  "questions": [
    {
      "q": "Integrate ∫(3/x) dx.",
      "o": [
        "3ln|x| + C",
        "3/x² + C",
        "ln|3x| + C",
        "3x + C"
      ],
      "a": 0,
      "e": "∫(1/x)dx=ln|x|, so ∫(3/x)dx=3ln|x|+C.",
      "h": "Use the standard result ∫(1/x)dx=ln|x|+C.",
      "yr": "SS3"
    },
    {
      "q": "If v=4t+2 (m/s), find the displacement from t=0 to t=3.",
      "o": [
        "24 m",
        "18 m",
        "20 m",
        "30 m"
      ],
      "a": 0,
      "e": "s=∫₀³(4t+2)dt=[2t²+2t]₀³=(18+6)−0=24m.",
      "h": "Integrate velocity to find displacement, then apply the limits.",
      "yr": "SS3"
    },
    {
      "q": "Estimate ∫₀⁴x²dx using the trapezoidal rule with 4 strips (h=1), y-values 0,1,4,9,16.",
      "o": [
        "22",
        "21.33",
        "20",
        "24"
      ],
      "a": 0,
      "e": "Area≈(1/2)[0+16+2(1+4+9)]=(1/2)[16+28]=22.",
      "h": "Apply Area≈h/2[y₀+yₙ+2(sum of interior y-values)].",
      "yr": "SS3"
    },
    {
      "q": "Find the volume generated when y=x is rotated about the x-axis from x=0 to x=3.",
      "o": [
        "9π",
        "3π",
        "27π",
        "6π"
      ],
      "a": 0,
      "e": "V=π∫₀³x²dx=π[x³/3]₀³=π(9)=9π.",
      "h": "Use V=π∫ y² dx for rotation about the x-axis.",
      "yr": "SS3"
    },
    {
      "q": "Integrate ∫(5/x) dx.",
      "o": [
        "5ln|x| + C",
        "5/x² + C",
        "ln|5x| + C",
        "5x + C"
      ],
      "a": 0,
      "e": "∫(5/x)dx=5ln|x|+C.",
      "h": "Factor out the constant, then apply the standard log integral.",
      "yr": "SS3"
    },
    {
      "q": "If acceleration a=6t and v=0 at t=0, find velocity v(t).",
      "o": [
        "3t²",
        "6t²",
        "3t",
        "6t"
      ],
      "a": 0,
      "e": "v=∫6t dt=3t²+C. At t=0, v=0, so C=0. v=3t².",
      "h": "Integrate acceleration to get velocity, using the initial condition to find C.",
      "yr": "SS3"
    },
    {
      "q": "Using v=3t², find the displacement from t=0 to t=2.",
      "o": [
        "8",
        "6",
        "4",
        "12"
      ],
      "a": 0,
      "e": "s=∫₀²3t²dt=[t³]₀²=8−0=8.",
      "h": "Integrate velocity, then apply the limits.",
      "yr": "SS3"
    },
    {
      "q": "What does the area under a velocity-time (v-t) graph represent?",
      "o": [
        "Displacement",
        "Acceleration",
        "Speed",
        "Time"
      ],
      "a": 0,
      "e": "The area under a v-t graph gives the total displacement over that time interval.",
      "h": "Area = integral of velocity with respect to time = displacement.",
      "yr": "SS3"
    },
    {
      "q": "What does the area under an acceleration-time (a-t) graph represent?",
      "o": [
        "Change in velocity",
        "Displacement",
        "Change in acceleration",
        "Distance only"
      ],
      "a": 0,
      "e": "The area under an a-t graph gives the change in velocity over that time interval.",
      "h": "Area = integral of acceleration with respect to time = change in velocity.",
      "yr": "SS3"
    },
    {
      "q": "Find the volume generated when y=2 (a constant) is rotated about the x-axis from x=0 to x=5 (a cylinder).",
      "o": [
        "20π",
        "10π",
        "40π",
        "4π"
      ],
      "a": 0,
      "e": "V=π∫₀⁵(2)²dx=π∫₀⁵4dx=π[4x]₀⁵=π(20)=20π.",
      "h": "Apply V=π∫y²dx with y=2 constant.",
      "yr": "SS3"
    },
    {
      "q": "Estimate ∫₀²x dx using the trapezoidal rule with 2 strips (h=1), y-values 0,1,2.",
      "o": [
        "2",
        "1.5",
        "2.5",
        "1"
      ],
      "a": 0,
      "e": "Area≈(1/2)[0+2+2(1)]=(1/2)[4]=2 (matching the exact value since y=x is linear).",
      "h": "Apply the trapezoidal rule formula with the given y-values.",
      "yr": "SS3"
    },
    {
      "q": "Why does the trapezoidal rule give an exact result for linear functions like y=x?",
      "o": [
        "Because trapezoids perfectly match straight-line segments, with no curvature to approximate",
        "The trapezoidal rule is always exact for any function",
        "Linear functions cannot be integrated using the trapezoidal rule",
        "It only works for quadratic functions"
      ],
      "a": 0,
      "e": "Since trapezoids have straight sides, they perfectly fit the straight-line segments of a linear function, eliminating any approximation error.",
      "h": "Think about why a trapezoid's straight edges introduce no error for a straight-line function.",
      "yr": "SS3"
    },
    {
      "q": "Integrate ∫(2x + 3/x) dx.",
      "o": [
        "x² + 3ln|x| + C",
        "x² + 3/x² + C",
        "2x² + 3ln|x| + C",
        "x² + ln|3x| + C"
      ],
      "a": 0,
      "e": "∫2x dx=x². ∫(3/x)dx=3ln|x|. Sum: x²+3ln|x|+C.",
      "h": "Integrate each term separately using the power rule and log rule.",
      "yr": "SS3"
    },
    {
      "q": "A car accelerates with a=4 m/s² from rest. Find its velocity after 5 seconds.",
      "o": [
        "20 m/s",
        "5 m/s",
        "4 m/s",
        "25 m/s"
      ],
      "a": 0,
      "e": "v=∫₀⁵4 dt=[4t]₀⁵=20m/s (starting from rest means v=0 at t=0, consistent since C=0 here).",
      "h": "Integrate constant acceleration over time to find velocity.",
      "yr": "SS3"
    },
    {
      "q": "Find the area under y=3x² between x=1 and x=2.",
      "o": [
        "7",
        "8",
        "6",
        "9"
      ],
      "a": 0,
      "e": "Area=∫₁²3x²dx=[x³]₁²=8−1=7.",
      "h": "Integrate, then evaluate at the limits.",
      "yr": "SS3"
    },
    {
      "q": "Find the volume when y=√x is rotated about the x-axis from x=0 to x=4.",
      "o": [
        "8π",
        "4π",
        "16π",
        "2π"
      ],
      "a": 0,
      "e": "V=π∫₀⁴(√x)²dx=π∫₀⁴x dx=π[x²/2]₀⁴=π(8)=8π.",
      "h": "Note that (√x)²=x, simplifying the integral before evaluating.",
      "yr": "SS3"
    },
    {
      "q": "Estimate ∫₀³x² dx using the trapezoidal rule with 3 strips (h=1), y-values 0,1,4,9.",
      "o": [
        "9.5",
        "9",
        "12",
        "10.5"
      ],
      "a": 0,
      "e": "Area≈(1/2)[0+9+2(1+4)]=(1/2)[9+10]=(1/2)(19)=9.5.",
      "h": "Apply the trapezoidal rule formula, carefully summing the interior values.",
      "yr": "SS3"
    },
    {
      "q": "Why is the trapezoidal rule useful when an exact antiderivative is difficult or impossible to find?",
      "o": [
        "It provides a numerical approximation of the definite integral using simple geometric shapes (trapezoids), without needing the antiderivative",
        "It always gives the exact answer regardless of the function",
        "It replaces the need for integration entirely",
        "It only works for polynomial functions"
      ],
      "a": 0,
      "e": "The trapezoidal rule approximates area using straightforward geometric calculation, making it valuable for functions where finding an antiderivative analytically is difficult or impossible.",
      "h": "Think about situations where a function has no simple algebraic antiderivative.",
      "yr": "SS3"
    },
    {
      "q": "If s=t³-3t² (position in meters), find the velocity function v=ds/dt.",
      "o": [
        "3t²-6t",
        "t²-3t",
        "3t-6",
        "3t²-3t"
      ],
      "a": 0,
      "e": "v=ds/dt=3t²-6t (this uses differentiation, the reverse of integration, to verify consistency).",
      "h": "Differentiate the position function to find velocity.",
      "yr": "SS3"
    },
    {
      "q": "Using v=3t²-6t, find the displacement from t=0 to t=2 by integrating back.",
      "o": [
        "-4",
        "4",
        "8",
        "-8"
      ],
      "a": 0,
      "e": "s=∫₀²(3t²-6t)dt=[t³-3t²]₀²=(8-12)-0=-4.",
      "h": "Integrate velocity and evaluate at the limits, noting the result can be negative (net displacement in the negative direction).",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Conic Sections",
  "topicCode": "SS3-FMT-08",
  "module": "Coordinate Geometry",
  "term": "Second Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Conic sections</span> are curves formed by slicing a cone: the <span class=\"learn-keyword\">parabola</span>, <span class=\"learn-keyword\">ellipse</span>, and <span class=\"learn-keyword\">hyperbola</span>, each with a standard equation.\n</div>\n\n<h3 class=\"learn-subheading\">1. Parabola</h3>\n<p class=\"learn-p\">Standard form: <strong>y&sup2; = 4ax</strong> (opens rightward, vertex at origin, focus at (a,0)).</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the focus of y&sup2;=12x.<br>4a=12, a=3. Focus = <strong>(3,0)</strong>.</p>\n\n<h3 class=\"learn-subheading\">2. Ellipse</h3>\n<p class=\"learn-p\">Standard form: <strong>x&sup2;/a&sup2; + y&sup2;/b&sup2; = 1</strong> (a&gt;b, major axis along x-axis).</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the semi-major and semi-minor axes of x&sup2;/25 + y&sup2;/9 = 1.<br>a&sup2;=25, a=5 (semi-major). b&sup2;=9, b=<strong>3</strong> (semi-minor).</p>\n\n<h3 class=\"learn-subheading\">3. Hyperbola</h3>\n<p class=\"learn-p\">Standard form: <strong>x&sup2;/a&sup2; &minus; y&sup2;/b&sup2; = 1</strong>.</p>\n\n<h3 class=\"learn-subheading\">4. Parametric Equations</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Conic</th><th>Parametric Form</th></tr></thead>\n    <tbody>\n      <tr><td>Parabola y&sup2;=4ax</td><td>x=at&sup2;, y=2at</td></tr>\n      <tr><td>Ellipse x&sup2;/a&sup2;+y&sup2;/b&sup2;=1</td><td>x=a cos&theta;, y=b sin&theta;</td></tr>\n      <tr><td>Hyperbola x&sup2;/a&sup2;&minus;y&sup2;/b&sup2;=1</td><td>x=a sec&theta;, y=b tan&theta;</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Identify the conic type FIRST by checking the equation's form — this determines which standard formula and parametric equations to apply.\n</div>\n",
  "questions": [
    {
      "q": "Find the focus of the parabola y²=12x.",
      "o": [
        "(3, 0)",
        "(12, 0)",
        "(0, 3)",
        "(6, 0)"
      ],
      "a": 0,
      "e": "4a=12, so a=3. The focus is at (a,0)=(3,0).",
      "h": "Compare with y²=4ax to find a, then the focus is at (a,0).",
      "yr": "SS3"
    },
    {
      "q": "Find the semi-major and semi-minor axes of x²/25+y²/9=1.",
      "o": [
        "a=5, b=3",
        "a=3, b=5",
        "a=25, b=9",
        "a=9, b=25"
      ],
      "a": 0,
      "e": "a²=25 gives a=5 (semi-major, since 25>9). b²=9 gives b=3 (semi-minor).",
      "h": "Take square roots of the denominators; the larger value is the semi-major axis.",
      "yr": "SS3"
    },
    {
      "q": "What is the standard form of a parabola opening rightward with vertex at the origin?",
      "o": [
        "y²=4ax",
        "x²=4ay",
        "x²/a²+y²/b²=1",
        "x²/a²-y²/b²=1"
      ],
      "a": 0,
      "e": "y²=4ax is the standard form for a rightward-opening parabola with vertex at the origin.",
      "h": "This is the fundamental parabola equation form.",
      "yr": "SS3"
    },
    {
      "q": "What is the standard form of an ellipse centered at the origin with major axis along the x-axis?",
      "o": [
        "x²/a²+y²/b²=1 (a>b)",
        "y²=4ax",
        "x²/a²-y²/b²=1",
        "x²+y²=a²"
      ],
      "a": 0,
      "e": "The standard ellipse equation is x²/a²+y²/b²=1, with a>b when the major axis is along the x-axis.",
      "h": "The larger denominator corresponds to the major axis direction.",
      "yr": "SS3"
    },
    {
      "q": "What is the standard form of a hyperbola centered at the origin, opening left-right?",
      "o": [
        "x²/a²-y²/b²=1",
        "x²/a²+y²/b²=1",
        "y²=4ax",
        "y²/a²-x²/b²=1"
      ],
      "a": 0,
      "e": "x²/a²-y²/b²=1 is the standard hyperbola form opening along the x-axis.",
      "h": "The minus sign (instead of plus) distinguishes a hyperbola from an ellipse.",
      "yr": "SS3"
    },
    {
      "q": "Find the value of 'a' for the parabola y²=20x.",
      "o": [
        "5",
        "20",
        "10",
        "4"
      ],
      "a": 0,
      "e": "4a=20, so a=5.",
      "h": "Compare with y²=4ax and solve for a.",
      "yr": "SS3"
    },
    {
      "q": "Write the parametric equations for the parabola y²=8x.",
      "o": [
        "x=2t², y=4t",
        "x=4t², y=2t",
        "x=8t², y=t",
        "x=t², y=8t"
      ],
      "a": 0,
      "e": "4a=8, so a=2. Parametric form: x=at²=2t², y=2at=4t.",
      "h": "Find a first, then substitute into x=at², y=2at.",
      "yr": "SS3"
    },
    {
      "q": "What are the parametric equations for an ellipse x²/16+y²/4=1?",
      "o": [
        "x=4cosθ, y=2sinθ",
        "x=2cosθ, y=4sinθ",
        "x=16cosθ, y=4sinθ",
        "x=4sinθ, y=2cosθ"
      ],
      "a": 0,
      "e": "a²=16 gives a=4; b²=4 gives b=2. Parametric form: x=a cosθ=4cosθ, y=b sinθ=2sinθ.",
      "h": "Find a and b from the denominators, then substitute into x=a cosθ, y=b sinθ.",
      "yr": "SS3"
    },
    {
      "q": "Find the semi-major axis of the ellipse x²/49+y²/36=1.",
      "o": [
        "7",
        "6",
        "49",
        "36"
      ],
      "a": 0,
      "e": "a²=49, so a=7 (the larger denominator gives the semi-major axis).",
      "h": "Take the square root of the larger denominator.",
      "yr": "SS3"
    },
    {
      "q": "What type of conic is represented by x²/9-y²/4=1?",
      "o": [
        "Hyperbola",
        "Ellipse",
        "Parabola",
        "Circle"
      ],
      "a": 0,
      "e": "The minus sign between the x² and y² terms identifies this as a hyperbola.",
      "h": "Look for the minus sign distinguishing a hyperbola from an ellipse.",
      "yr": "SS3"
    },
    {
      "q": "What type of conic is represented by y²=16x?",
      "o": [
        "Parabola",
        "Ellipse",
        "Hyperbola",
        "Circle"
      ],
      "a": 0,
      "e": "The equation y²=4ax (with only one squared variable) identifies this as a parabola.",
      "h": "Only one variable is squared — a defining feature of a parabola.",
      "yr": "SS3"
    },
    {
      "q": "What type of conic is represented by x²/25+y²/25=1 (equal denominators)?",
      "o": [
        "A circle (a special case of an ellipse)",
        "A hyperbola",
        "A parabola",
        "Not a valid conic"
      ],
      "a": 0,
      "e": "When a=b in the ellipse equation, the shape becomes a circle (a special ellipse with equal axes).",
      "h": "Equal denominators in the ellipse form create a circle.",
      "yr": "SS3"
    },
    {
      "q": "Find the focus of the parabola x²=4y (opening upward, where x²=4ay).",
      "o": [
        "(0, 1)",
        "(1, 0)",
        "(0, 4)",
        "(4, 0)"
      ],
      "a": 0,
      "e": "4a=4, so a=1. For x²=4ay, the focus is at (0,a)=(0,1).",
      "h": "Compare with x²=4ay; the focus is at (0,a) for an upward-opening parabola.",
      "yr": "SS3"
    },
    {
      "q": "Using parametric equations x=3cosθ, y=2sinθ, identify the conic and its standard equation.",
      "o": [
        "Ellipse: x²/9+y²/4=1",
        "Hyperbola: x²/9-y²/4=1",
        "Parabola: y²=12x",
        "Circle: x²+y²=9"
      ],
      "a": 0,
      "e": "Since x=a cosθ, y=b sinθ with a=3, b=2, this represents the ellipse x²/9+y²/4=1.",
      "h": "Recognize the cosine/sine parametric form as characteristic of an ellipse.",
      "yr": "SS3"
    },
    {
      "q": "Using parametric equations x=4secθ, y=3tanθ, identify the conic and its standard equation.",
      "o": [
        "Hyperbola: x²/16-y²/9=1",
        "Ellipse: x²/16+y²/9=1",
        "Parabola: y²=16x",
        "Circle: x²+y²=16"
      ],
      "a": 0,
      "e": "Since x=a secθ, y=b tanθ with a=4, b=3, this represents the hyperbola x²/16-y²/9=1.",
      "h": "Recognize the secant/tangent parametric form as characteristic of a hyperbola.",
      "yr": "SS3"
    },
    {
      "q": "Find the eccentricity formula's relevance: for a circle, what is the eccentricity?",
      "o": [
        "0 (a circle has zero eccentricity)",
        "1",
        "Greater than 1",
        "Undefined"
      ],
      "a": 0,
      "e": "A circle, being a special case of an ellipse with a=b, has eccentricity 0 (perfectly 'round', no elongation).",
      "h": "Eccentricity measures how 'stretched' a conic is; a circle has none.",
      "yr": "SS3"
    },
    {
      "q": "For a parabola, what is the eccentricity always equal to?",
      "o": [
        "1",
        "0",
        "Greater than 1",
        "It varies"
      ],
      "a": 0,
      "e": "All parabolas have eccentricity exactly equal to 1, by definition.",
      "h": "This is a defining property that distinguishes a parabola from ellipses (e<1) and hyperbolas (e>1).",
      "yr": "SS3"
    },
    {
      "q": "For an ellipse (not a circle), what is the range of eccentricity?",
      "o": [
        "0 < e < 1",
        "e = 1",
        "e > 1",
        "e = 0"
      ],
      "a": 0,
      "e": "An ellipse has eccentricity strictly between 0 and 1 (0 would make it a circle, 1 would make it a parabola).",
      "h": "Ellipses are 'less stretched' than parabolas but not perfectly circular.",
      "yr": "SS3"
    },
    {
      "q": "For a hyperbola, what is the range of eccentricity?",
      "o": [
        "e > 1",
        "0 < e < 1",
        "e = 1",
        "e = 0"
      ],
      "a": 0,
      "e": "Hyperbolas have eccentricity greater than 1, reflecting their more 'open' shape compared to ellipses.",
      "h": "Hyperbolas are the most 'stretched' of the conics, with the curve opening outward indefinitely.",
      "yr": "SS3"
    },
    {
      "q": "Why are conic sections important in real-world applications like satellite orbits and architecture?",
      "o": [
        "Planetary and satellite orbits follow elliptical paths, and conic shapes are used in designing arches, lenses, and reflective surfaces",
        "Conic sections have no real-world applications",
        "They are purely theoretical with no physical relevance",
        "Only circles have practical uses, not other conics"
      ],
      "a": 0,
      "e": "Conic sections model natural phenomena (planetary orbits are ellipses, a thrown object follows a parabola) and are deliberately used in engineering and architecture (parabolic reflectors, elliptical arches) due to their unique geometric properties.",
      "h": "Think about real examples: planetary motion, satellite dishes, bridge arches.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Statics",
  "topicCode": "SS3-FMT-09",
  "module": "Mechanics",
  "term": "Second Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Statics</span> studies forces in equilibrium (balanced, not causing motion). This topic covers resultant forces, moments, resolution of forces, and friction.\n</div>\n\n<h3 class=\"learn-subheading\">1. Forces in Equilibrium</h3>\n<p class=\"learn-p\">A system is in equilibrium when the resultant (net) force is zero, and the net moment (turning effect) is also zero.</p>\n\n<h3 class=\"learn-subheading\">2. Resultant of Parallel Forces</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Two forces of 8N and 5N act in the same direction. Find the resultant.<br>Resultant = 8+5 = <strong>13N</strong> (same direction).<br>If opposite directions: Resultant = 8&minus;5 = <strong>3N</strong> (direction of the larger force).</p>\n\n<h3 class=\"learn-subheading\">3. Moment of a Force</h3>\n<p class=\"learn-p\"><strong>Moment = Force &times; Perpendicular distance from the pivot</strong></p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> A force of 20N acts at a perpendicular distance of 0.5m from a pivot. Find the moment.<br>Moment = 20 &times; 0.5 = <strong>10 Nm</strong>.</p>\n\n<h3 class=\"learn-subheading\">4. Resolution of Forces</h3>\n<p class=\"learn-p\">A force F at angle &theta; can be resolved into horizontal (F cos&theta;) and vertical (F sin&theta;) components.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Resolve a 10N force acting at 30&deg; to the horizontal.<br>Horizontal = 10cos30&deg; &asymp; 8.66N. Vertical = 10sin30&deg; = <strong>5N</strong>.</p>\n\n<h3 class=\"learn-subheading\">5. Friction</h3>\n<p class=\"learn-p\">Friction opposes relative motion between surfaces. <strong>Maximum friction = &mu;R</strong>, where &mu; = coefficient of friction, R = normal reaction force.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> For a body in equilibrium under three forces, always apply the principle that the sum of forces in any direction (horizontal, vertical) equals zero.\n</div>\n",
  "questions": [
    {
      "q": "Two forces of 8N and 5N act in the same direction. Find the resultant.",
      "o": [
        "13 N",
        "3 N",
        "40 N",
        "1.6 N"
      ],
      "a": 0,
      "e": "Resultant=8+5=13N (same direction, so forces add).",
      "h": "Forces in the same direction simply add together.",
      "yr": "SS3"
    },
    {
      "q": "Two forces of 8N and 5N act in opposite directions. Find the resultant.",
      "o": [
        "3 N",
        "13 N",
        "40 N",
        "1.6 N"
      ],
      "a": 0,
      "e": "Resultant=8−5=3N, in the direction of the larger force.",
      "h": "Opposite forces subtract; the result acts in the direction of the larger force.",
      "yr": "SS3"
    },
    {
      "q": "A force of 20N acts at a perpendicular distance of 0.5m from a pivot. Find the moment.",
      "o": [
        "10 Nm",
        "20 Nm",
        "0.5 Nm",
        "40 Nm"
      ],
      "a": 0,
      "e": "Moment=Force×distance=20×0.5=10Nm.",
      "h": "Use Moment=Force×perpendicular distance.",
      "yr": "SS3"
    },
    {
      "q": "Resolve a 10N force acting at 30° to the horizontal. Find the vertical component.",
      "o": [
        "5 N",
        "8.66 N",
        "10 N",
        "0 N"
      ],
      "a": 0,
      "e": "Vertical component=10sin30°=10×0.5=5N.",
      "h": "Use Vertical=F sinθ.",
      "yr": "SS3"
    },
    {
      "q": "Using the same 10N force at 30°, find the horizontal component.",
      "o": [
        "8.66 N",
        "5 N",
        "10 N",
        "0 N"
      ],
      "a": 0,
      "e": "Horizontal component=10cos30°≈8.66N.",
      "h": "Use Horizontal=F cosθ.",
      "yr": "SS3"
    },
    {
      "q": "What condition must be met for a system of forces to be in equilibrium?",
      "o": [
        "The resultant force and resultant moment must both be zero",
        "The forces must all be equal",
        "There must be exactly two forces",
        "The forces must all point in the same direction"
      ],
      "a": 0,
      "e": "Equilibrium requires zero net force (no acceleration) AND zero net moment (no rotation).",
      "h": "Equilibrium means no resulting translational OR rotational effect.",
      "yr": "SS3"
    },
    {
      "q": "If the coefficient of friction μ=0.4 and the normal reaction R=50N, find the maximum friction force.",
      "o": [
        "20 N",
        "50 N",
        "0.4 N",
        "12.5 N"
      ],
      "a": 0,
      "e": "Maximum friction=μR=0.4×50=20N.",
      "h": "Use Maximum friction=μR.",
      "yr": "SS3"
    },
    {
      "q": "A beam is balanced on a pivot with a 30N force at 2m on one side. What force at 3m on the other side keeps it balanced?",
      "o": [
        "20 N",
        "30 N",
        "45 N",
        "60 N"
      ],
      "a": 0,
      "e": "For balance, moments must be equal: 30×2=F×3, so F=60/3=20N.",
      "h": "Set the two moments (force×distance) equal to each other, since the system is in equilibrium.",
      "yr": "SS3"
    },
    {
      "q": "What is the moment of a force that acts directly through the pivot point?",
      "o": [
        "Zero (the perpendicular distance is zero)",
        "Equal to the force magnitude",
        "Always maximum",
        "Cannot be determined"
      ],
      "a": 0,
      "e": "If a force acts through the pivot, its perpendicular distance from the pivot is zero, making the moment (Force×distance) zero.",
      "h": "Think about what happens to Moment=Force×distance when distance=0.",
      "yr": "SS3"
    },
    {
      "q": "Three forces of 4N, 6N, and 10N act on a point and the system is in equilibrium. If 4N and 6N act at right angles, what must the 10N force be?",
      "o": [
        "Equal and opposite to the resultant of the 4N and 6N forces",
        "Unrelated to the other two forces",
        "Always acting horizontally",
        "Twice the resultant of the other two"
      ],
      "a": 0,
      "e": "For equilibrium, the third force must exactly balance (be equal and opposite to) the resultant of the other two forces.",
      "h": "For three forces in equilibrium, each force balances the resultant of the other two.",
      "yr": "SS3"
    },
    {
      "q": "Find the resultant of the 4N and 6N forces (at right angles) from the previous question, using Pythagoras.",
      "o": [
        "7.21 N",
        "10 N",
        "2 N",
        "24 N"
      ],
      "a": 0,
      "e": "Resultant=√(4²+6²)=√(16+36)=√52≈7.21N.",
      "h": "For perpendicular forces, use Pythagoras' theorem to find the resultant.",
      "yr": "SS3"
    },
    {
      "q": "What is the normal reaction force R for an object of weight 80N resting on a horizontal surface (no other vertical forces)?",
      "o": [
        "80 N (equal and opposite to weight)",
        "0 N",
        "40 N",
        "160 N"
      ],
      "a": 0,
      "e": "For equilibrium on a horizontal surface, R must equal the weight: R=80N.",
      "h": "Vertical equilibrium requires R to balance the weight exactly.",
      "yr": "SS3"
    },
    {
      "q": "A force of 15N acts horizontally on a body. If the body is in equilibrium, what must be the horizontal friction force opposing it?",
      "o": [
        "15 N (equal and opposite)",
        "0 N",
        "7.5 N",
        "30 N"
      ],
      "a": 0,
      "e": "For equilibrium, friction must exactly balance the applied force: 15N.",
      "h": "Equilibrium means the net horizontal force is zero.",
      "yr": "SS3"
    },
    {
      "q": "Why is the concept of 'moment' important in analyzing structures like see-saws or bridges?",
      "o": [
        "It determines the turning effect of forces, crucial for understanding rotational balance and structural stability",
        "Moments only apply to very large structures",
        "Moments have no practical engineering use",
        "Moment is the same as force and adds nothing new"
      ],
      "a": 0,
      "e": "Moments quantify the rotational (turning) effect of a force about a pivot, essential for ensuring structures like bridges and levers remain stable and balanced.",
      "h": "Think about how forces at different distances from a pivot cause different turning effects.",
      "yr": "SS3"
    },
    {
      "q": "A ladder leans against a wall. What force provides the horizontal component balancing the ladder's tendency to slip?",
      "o": [
        "Friction at the base of the ladder",
        "Only the weight of the ladder",
        "The normal reaction at the wall alone",
        "Gravity acting horizontally"
      ],
      "a": 0,
      "e": "Friction at the ladder's base (where it meets the ground) provides the horizontal force preventing the ladder from sliding.",
      "h": "Think about what prevents horizontal sliding at the base of the ladder.",
      "yr": "SS3"
    },
    {
      "q": "A 50N weight hangs from two strings at angles, each making 60° with the horizontal (symmetric). Find the tension component balancing the weight vertically (combined).",
      "o": [
        "50 N (total vertical components must equal the weight)",
        "25 N",
        "100 N",
        "0 N"
      ],
      "a": 0,
      "e": "For vertical equilibrium, the combined vertical components of tension in both strings must equal the weight: 50N total.",
      "h": "Vertical equilibrium requires upward forces to balance the downward weight exactly.",
      "yr": "SS3"
    },
    {
      "q": "What does the 'polygon of forces' represent in statics?",
      "o": [
        "A graphical method showing that forces in equilibrium, drawn tip-to-tail, form a closed polygon",
        "A type of force that only exists in polygons",
        "An error in force calculation",
        "A method only used for two forces"
      ],
      "a": 0,
      "e": "When forces in equilibrium are drawn as vectors tip-to-tail, they form a closed polygon (since the resultant is zero, the path returns to the starting point).",
      "h": "Think about what it means graphically for the resultant force to be zero.",
      "yr": "SS3"
    },
    {
      "q": "A horizontal force of 12N and a vertical force of 5N act on an object. Find the magnitude of the resultant force.",
      "o": [
        "13 N",
        "17 N",
        "7 N",
        "60 N"
      ],
      "a": 0,
      "e": "Resultant=√(12²+5²)=√(144+25)=√169=13N.",
      "h": "Use Pythagoras' theorem for two perpendicular forces.",
      "yr": "SS3"
    },
    {
      "q": "Why must both force AND moment equilibrium be satisfied for a rigid body to be considered in complete equilibrium?",
      "o": [
        "A body could have zero net force but still rotate (non-zero moment), or vice versa, so both conditions are needed to rule out all motion",
        "Force equilibrium alone is always sufficient",
        "Moment equilibrium alone is always sufficient",
        "These two conditions are actually identical"
      ],
      "a": 0,
      "e": "A body can have balanced forces (no net push/pull) yet still experience a turning effect (unbalanced moment) causing rotation, so both zero net force AND zero net moment are required for true equilibrium.",
      "h": "Think of a scenario where forces cancel out but still cause rotation (like a couple).",
      "yr": "SS3"
    },
    {
      "q": "A block on an inclined plane is in equilibrium. What force prevents it from sliding down?",
      "o": [
        "Friction acting up the slope, balancing the component of weight along the slope",
        "Only the normal reaction",
        "Only gravity",
        "No force is needed since the block is inclined"
      ],
      "a": 0,
      "e": "Friction, acting up the slope, balances the component of the block's weight acting down the slope, keeping it stationary.",
      "h": "Think about the forces along the slope direction: weight component down, friction up.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Modelling",
  "topicCode": "SS3-FMT-10",
  "module": "Mathematical Modelling",
  "term": "Second Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Mathematical modelling</span> translates real-world situations into mathematical equations or functions, which are then analyzed to make predictions or decisions.\n</div>\n\n<h3 class=\"learn-subheading\">1. Dependent and Independent Variables</h3>\n<p class=\"learn-p\">The <strong>independent variable</strong> is the input (controlled or chosen). The <strong>dependent variable</strong> is the output (changes in response).</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> In the model Cost = 50 + 5x (x=number of items), identify the variables.<br>x (number of items) is the <strong>independent</strong> variable. Cost is the <strong>dependent</strong> variable.</p>\n\n<h3 class=\"learn-subheading\">2. Steps in Constructing a Mathematical Model</h3>\n<p class=\"learn-p\">1. Define the problem. 2. Identify variables. 3. Make assumptions. 4. Formulate equations/relationships. 5. Solve/analyze. 6. Validate against real data. 7. Refine if needed.</p>\n\n<h3 class=\"learn-subheading\">3. Application: Population Growth Model</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> A population grows according to P=1000(1.05)<sup>t</sup>. Find the population after 3 years.<br>P = 1000(1.05)&sup3; = 1000(1.1576) &asymp; <strong>1158 people</strong>.</p>\n\n<h3 class=\"learn-subheading\">4. Application: Business/Economic Models</h3>\n<p class=\"learn-p\">Models like supply/demand curves, cost functions, and profit functions use mathematical modelling to predict business outcomes.</p>\n\n<h3 class=\"learn-subheading\">5. Application: Biological/Social Sciences</h3>\n<p class=\"learn-p\">Models can represent disease spread, resource consumption, or social behavior trends mathematically.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Always state your assumptions clearly when constructing a model — assumptions simplify reality and must be acknowledged as limitations of the model.\n</div>\n",
  "questions": [
    {
      "q": "In the model Cost=50+5x (x=number of items), identify the independent variable.",
      "o": [
        "x (number of items)",
        "Cost",
        "50",
        "5"
      ],
      "a": 0,
      "e": "x is the input variable we choose or control, making it independent; Cost depends on x.",
      "h": "The independent variable is the input; the dependent variable is the output.",
      "yr": "SS3"
    },
    {
      "q": "In the model Cost=50+5x, identify the dependent variable.",
      "o": [
        "Cost",
        "x",
        "50",
        "5"
      ],
      "a": 0,
      "e": "Cost depends on the value of x, making it the dependent variable.",
      "h": "The dependent variable changes in response to the independent variable.",
      "yr": "SS3"
    },
    {
      "q": "A population grows according to P=1000(1.05)^t. Find the population after 3 years.",
      "o": [
        "1158 (approx)",
        "1050",
        "1150",
        "1200"
      ],
      "a": 0,
      "e": "P=1000(1.05)³=1000×1.1576≈1158.",
      "h": "Substitute t=3 into the model and calculate.",
      "yr": "SS3"
    },
    {
      "q": "What is the first step in constructing a mathematical model?",
      "o": [
        "Define the problem clearly",
        "Solve the equations",
        "Validate against real data",
        "Make assumptions"
      ],
      "a": 0,
      "e": "Clearly defining the problem is the essential first step before any variables or equations can be identified.",
      "h": "You must understand what you're modeling before proceeding further.",
      "yr": "SS3"
    },
    {
      "q": "Why are assumptions necessary when building a mathematical model?",
      "o": [
        "They simplify the complexity of real-world situations to make them mathematically tractable",
        "Assumptions make models less accurate always",
        "Models never require assumptions",
        "Assumptions replace the need for data"
      ],
      "a": 0,
      "e": "Real-world situations are often too complex to model exactly, so simplifying assumptions are made to create a workable, analyzable model.",
      "h": "Think about why real-world complexity needs to be simplified for mathematical analysis.",
      "yr": "SS3"
    },
    {
      "q": "A car's fuel consumption model is F=0.08d (F=fuel in liters, d=distance in km). Find the fuel used for a 250km trip.",
      "o": [
        "20 liters",
        "25 liters",
        "15 liters",
        "30 liters"
      ],
      "a": 0,
      "e": "F=0.08×250=20 liters.",
      "h": "Substitute d=250 into the model.",
      "yr": "SS3"
    },
    {
      "q": "In a disease-spread model, if N(t) represents the number of infected people over time t, what type of variable is N?",
      "o": [
        "Dependent variable (depends on time t)",
        "Independent variable",
        "A constant",
        "Not a variable at all"
      ],
      "a": 0,
      "e": "N changes in response to t (time), making N the dependent variable.",
      "h": "N's value depends on the input variable t.",
      "yr": "SS3"
    },
    {
      "q": "What should be done after formulating and solving a mathematical model?",
      "o": [
        "Validate it against real-world data to check accuracy",
        "Immediately discard it",
        "Use it without any further checks",
        "Only use it for theoretical purposes"
      ],
      "a": 0,
      "e": "Validation against real data is crucial to determine whether the model accurately represents reality, and whether refinement is needed.",
      "h": "A model's usefulness depends on checking it against actual observed outcomes.",
      "yr": "SS3"
    },
    {
      "q": "A company's profit model is P=200x-3000 (x=units sold). Find the profit when 20 units are sold.",
      "o": [
        "₦1,000",
        "₦4,000",
        "₦3,000",
        "₦200"
      ],
      "a": 0,
      "e": "P=200(20)-3000=4000-3000=₦1,000.",
      "h": "Substitute x=20 into the profit model.",
      "yr": "SS3"
    },
    {
      "q": "Using P=200x-3000, find the break-even point (where profit=0).",
      "o": [
        "15 units",
        "20 units",
        "10 units",
        "3000 units"
      ],
      "a": 0,
      "e": "0=200x-3000, 200x=3000, x=15.",
      "h": "Set the profit function equal to zero and solve for x.",
      "yr": "SS3"
    },
    {
      "q": "What type of mathematical model would best represent exponential population growth?",
      "o": [
        "An exponential function, e.g., P=P₀(1+r)^t",
        "A linear function",
        "A constant function",
        "A quadratic function with a negative leading coefficient"
      ],
      "a": 0,
      "e": "Exponential growth is best modeled by an exponential function, where growth compounds over time.",
      "h": "Think about which function type captures growth that accelerates (compounds) over time.",
      "yr": "SS3"
    },
    {
      "q": "A model predicts temperature T=20+0.5h, where h=hours after sunrise. Find T after 6 hours.",
      "o": [
        "23",
        "20",
        "26",
        "15"
      ],
      "a": 0,
      "e": "T=20+0.5(6)=20+3=23.",
      "h": "Substitute h=6 into the model.",
      "yr": "SS3"
    },
    {
      "q": "In mathematical modelling applied to social sciences, what might be modeled?",
      "o": [
        "Trends in social behavior, such as the spread of information or opinions",
        "Only physical measurements like distance",
        "Only financial transactions",
        "Social sciences cannot use mathematical models"
      ],
      "a": 0,
      "e": "Mathematical modelling in social sciences can represent phenomena like opinion spread, voting patterns, or social network dynamics using appropriate equations.",
      "h": "Think about how social phenomena can show patterns describable with mathematics.",
      "yr": "SS3"
    },
    {
      "q": "Why might a simple linear model be insufficient for modeling population growth over long periods?",
      "o": [
        "Population growth is often exponential, not linear, especially when resources are abundant",
        "Linear models are always perfectly accurate",
        "Population never changes over time",
        "Linear models are too complex to use"
      ],
      "a": 0,
      "e": "Real populations often grow proportionally to their current size (exponential growth), which a linear model (constant rate of increase) fails to capture accurately over long periods.",
      "h": "Think about how population growth compounds, rather than increasing by the same fixed amount each period.",
      "yr": "SS3"
    },
    {
      "q": "A model for the cost of a taxi ride is C=5+2d (C in dollars, d in km). What does the constant 5 represent?",
      "o": [
        "A fixed base charge independent of distance",
        "The cost per km",
        "The maximum distance",
        "The total number of trips"
      ],
      "a": 0,
      "e": "The constant term (5) represents a fixed charge that applies regardless of the distance traveled (e.g., a base fare).",
      "h": "In a linear model y=mx+c, the constant c represents the fixed/starting value.",
      "yr": "SS3"
    },
    {
      "q": "In the taxi model C=5+2d, what does the coefficient 2 represent?",
      "o": [
        "The cost per km (rate of change)",
        "The fixed base charge",
        "The total distance",
        "The number of passengers"
      ],
      "a": 0,
      "e": "The coefficient of d represents how much the cost increases for each additional km — the rate of change.",
      "h": "In y=mx+c, the coefficient m represents the rate of change.",
      "yr": "SS3"
    },
    {
      "q": "Why is refining a model sometimes necessary after validation?",
      "o": [
        "Initial assumptions may not perfectly match reality, so adjustments improve accuracy based on observed discrepancies",
        "Models never need refinement once created",
        "Refinement replaces the need for assumptions",
        "Models are only refined if they are completely wrong"
      ],
      "a": 0,
      "e": "Comparing model predictions to real data often reveals discrepancies, prompting adjustments to assumptions or equations to improve the model's accuracy.",
      "h": "Think about the iterative nature of model-building: build, test, refine.",
      "yr": "SS3"
    },
    {
      "q": "A biological model for bacteria growth is N=500(2)^t (t in hours). Find the bacteria count after 4 hours.",
      "o": [
        "8000",
        "2000",
        "4000",
        "1000"
      ],
      "a": 0,
      "e": "N=500×2⁴=500×16=8000.",
      "h": "Substitute t=4 into the exponential growth model.",
      "yr": "SS3"
    },
    {
      "q": "What is a key limitation of all mathematical models, regardless of how well-constructed?",
      "o": [
        "They are simplifications of reality and cannot capture every possible real-world factor",
        "They are always 100% accurate",
        "They require no assumptions",
        "They can predict the future with certainty"
      ],
      "a": 0,
      "e": "Since models rely on simplifying assumptions, they can never capture the full complexity of real-world systems, meaning some degree of approximation or error is inherent.",
      "h": "Think about the fundamental trade-off between simplicity (needed for analysis) and complete accuracy.",
      "yr": "SS3"
    },
    {
      "q": "Why is mathematical modelling considered an interdisciplinary tool?",
      "o": [
        "It is applied across diverse fields like physics, biology, economics, and social science to solve real-world problems",
        "It is only used in pure mathematics",
        "It has no applications outside of engineering",
        "It is restricted to a single field of study"
      ],
      "a": 0,
      "e": "Mathematical modelling techniques (equations, functions, optimization) are broadly applicable, making them valuable tools across virtually every scientific and social discipline.",
      "h": "Think about how the same mathematical tools (functions, equations) apply to very different real-world contexts.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Game Theory",
  "topicCode": "SS3-FMT-11",
  "module": "Game Theory",
  "term": "Second Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Game theory</span> studies strategic decision-making between competing players. This topic covers two-person zero-sum games and solving them using pure and mixed strategies.\n</div>\n\n<h3 class=\"learn-subheading\">1. Key Terms</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Term</th><th>Meaning</th></tr></thead>\n    <tbody>\n      <tr><td>Zero-sum game</td><td>One player's gain equals the other's loss</td></tr>\n      <tr><td>Payoff matrix</td><td>A table showing outcomes for each combination of strategies</td></tr>\n      <tr><td>Pure strategy</td><td>A player always chooses the same single strategy</td></tr>\n      <tr><td>Mixed strategy</td><td>A player randomizes between strategies with certain probabilities</td></tr>\n      <tr><td>Saddle point</td><td>A payoff that is both the minimum of its row and maximum of its column &mdash; the game's solution under pure strategy</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">2. Finding a Saddle Point (Pure Strategy)</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the saddle point of the payoff matrix: Row1: [4,2], Row2: [3,5].<br>Row minimums: Row1=2, Row2=3. Maximum of row minimums (maximin) = 3.<br>Column maximums: Col1=4, Col2=5. Minimum of column maximums (minimax) = 4.<br>Since maximin(3) &ne; minimax(4), there is <strong>no pure-strategy saddle point</strong> &mdash; a mixed strategy is needed.</p>\n\n<h3 class=\"learn-subheading\">3. The Minimax-Maximin Principle</h3>\n<p class=\"learn-p\">A saddle point exists when the <strong>maximin equals the minimax</strong>. This value is called the <strong>value of the game</strong>.</p>\n\n<h3 class=\"learn-subheading\">4. Mixed Strategy (2&times;2 Games)</h3>\n<p class=\"learn-p\">When no saddle point exists, players use probability-weighted strategies to minimize their maximum expected loss (or maximize minimum expected gain).</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Always check for a saddle point FIRST (compare maximin and minimax) before attempting a mixed-strategy calculation &mdash; if they're equal, you've already found the solution.\n</div>\n",
  "questions": [
    {
      "q": "Find the maximin of the payoff matrix: Row1: [4,2], Row2: [3,5].",
      "o": [
        "3",
        "2",
        "4",
        "5"
      ],
      "a": 0,
      "e": "Row minimums: Row1=2, Row2=3. Maximin=max(2,3)=3.",
      "h": "Find the minimum of each row, then take the maximum of those minimums.",
      "yr": "SS3"
    },
    {
      "q": "Find the minimax of the same payoff matrix: Row1: [4,2], Row2: [3,5].",
      "o": [
        "4",
        "2",
        "3",
        "5"
      ],
      "a": 0,
      "e": "Column maximums: Col1=4, Col2=5. Minimax=min(4,5)=4.",
      "h": "Find the maximum of each column, then take the minimum of those maximums.",
      "yr": "SS3"
    },
    {
      "q": "Since maximin(3)≠minimax(4) in this matrix, what can be concluded?",
      "o": [
        "No pure-strategy saddle point exists; a mixed strategy is needed",
        "The game has no solution at all",
        "The saddle point is 3.5",
        "Both players always lose"
      ],
      "a": 0,
      "e": "When maximin≠minimax, there's no pure-strategy equilibrium, so mixed strategies must be used to find the optimal solution.",
      "h": "A saddle point requires maximin to equal minimax.",
      "yr": "SS3"
    },
    {
      "q": "What is a zero-sum game?",
      "o": [
        "A game where one player's gain exactly equals the other player's loss",
        "A game with no winner",
        "A game where both players always win",
        "A game with zero possible outcomes"
      ],
      "a": 0,
      "e": "In a zero-sum game, the total payoff is constant — whatever one player gains, the other loses exactly that amount.",
      "h": "'Zero-sum' means the gains and losses sum to zero.",
      "yr": "SS3"
    },
    {
      "q": "What is a payoff matrix?",
      "o": [
        "A table showing the outcome for each combination of strategies by both players",
        "A single number representing the game's outcome",
        "A list of all possible players",
        "A graph of game strategies"
      ],
      "a": 0,
      "e": "A payoff matrix organizes the results (payoffs) for every possible pairing of strategies chosen by the two players.",
      "h": "Think of it as a table cross-referencing each player's strategy choices.",
      "yr": "SS3"
    },
    {
      "q": "Find the saddle point of the matrix: Row1: [2,3], Row2: [1,4] (check if maximin=minimax).",
      "o": [
        "2 (saddle point exists)",
        "3",
        "4",
        "1"
      ],
      "a": 0,
      "e": "Row minimums: Row1=2, Row2=1. Maximin=max(2,1)=2. Column maximums: Col1=2, Col2=4. Minimax=min(2,4)=2. Since maximin=minimax=2, a saddle point exists with value 2.",
      "h": "Compare row minimums (take their max) against column maximums (take their min).",
      "yr": "SS3"
    },
    {
      "q": "What is a 'pure strategy' in game theory?",
      "o": [
        "Always choosing the same single strategy, regardless of the opponent's choice",
        "Randomizing between multiple strategies",
        "A strategy that never wins",
        "A strategy only used in non-zero-sum games"
      ],
      "a": 0,
      "e": "A pure strategy means a player consistently selects one specific strategy, as opposed to mixing between several.",
      "h": "'Pure' implies a single, unchanging choice.",
      "yr": "SS3"
    },
    {
      "q": "What is a 'mixed strategy' in game theory?",
      "o": [
        "Randomizing between available strategies according to specific probabilities",
        "Always choosing the same strategy",
        "A strategy used only by one player",
        "Combining two different games"
      ],
      "a": 0,
      "e": "A mixed strategy involves assigning probabilities to different strategies and choosing randomly based on those probabilities, typically used when no pure-strategy saddle point exists.",
      "h": "'Mixed' implies a blend/probability distribution over multiple strategies.",
      "yr": "SS3"
    },
    {
      "q": "In a payoff matrix, Player A wants to maximize their minimum guaranteed payoff. What principle does this describe?",
      "o": [
        "The maximin principle",
        "The minimax principle",
        "The zero-sum principle",
        "The equilibrium principle"
      ],
      "a": 0,
      "e": "The maximin principle involves choosing the strategy that maximizes the player's minimum possible payoff (a cautious, worst-case approach).",
      "h": "'Maxi-min' = maximize the minimum.",
      "yr": "SS3"
    },
    {
      "q": "In a payoff matrix, Player B wants to minimize their maximum possible loss. What principle does this describe?",
      "o": [
        "The minimax principle",
        "The maximin principle",
        "The zero-sum principle",
        "The dominant strategy principle"
      ],
      "a": 0,
      "e": "The minimax principle involves choosing the strategy that minimizes the maximum possible loss.",
      "h": "'Mini-max' = minimize the maximum.",
      "yr": "SS3"
    },
    {
      "q": "Find the row minimums of the matrix: Row1: [7,3,5], Row2: [2,6,4].",
      "o": [
        "Row1=3, Row2=2",
        "Row1=7, Row2=6",
        "Row1=5, Row2=4",
        "Row1=3, Row2=4"
      ],
      "a": 0,
      "e": "Row1 minimum=min(7,3,5)=3. Row2 minimum=min(2,6,4)=2.",
      "h": "Find the smallest value in each row.",
      "yr": "SS3"
    },
    {
      "q": "Using the row minimums from the previous question (3 and 2), find the maximin.",
      "o": [
        "3",
        "2",
        "7",
        "6"
      ],
      "a": 0,
      "e": "Maximin=max(3,2)=3.",
      "h": "Take the maximum of the row minimums found.",
      "yr": "SS3"
    },
    {
      "q": "Find the column maximums of the matrix: Row1: [7,3,5], Row2: [2,6,4].",
      "o": [
        "Col1=7, Col2=6, Col3=5",
        "Col1=2, Col2=3, Col3=4",
        "Col1=7, Col2=3, Col3=5",
        "Col1=5, Col2=6, Col3=7"
      ],
      "a": 0,
      "e": "Col1 max=max(7,2)=7. Col2 max=max(3,6)=6. Col3 max=max(5,4)=5.",
      "h": "Find the largest value in each column.",
      "yr": "SS3"
    },
    {
      "q": "Using the column maximums (7,6,5), find the minimax.",
      "o": [
        "5",
        "7",
        "6",
        "3"
      ],
      "a": 0,
      "e": "Minimax=min(7,6,5)=5.",
      "h": "Take the minimum of the column maximums found.",
      "yr": "SS3"
    },
    {
      "q": "Compare maximin (3) and minimax (5) from the previous questions. Does a saddle point exist?",
      "o": [
        "No, since 3≠5, mixed strategy is needed",
        "Yes, the saddle point is 3",
        "Yes, the saddle point is 5",
        "Yes, the saddle point is 4"
      ],
      "a": 0,
      "e": "Since maximin(3) does not equal minimax(5), no pure-strategy saddle point exists.",
      "h": "A saddle point requires maximin to exactly equal minimax.",
      "yr": "SS3"
    },
    {
      "q": "Why is understanding game theory useful in business competition analysis?",
      "o": [
        "It helps model strategic decision-making where outcomes depend on the choices of competing firms or individuals",
        "Game theory only applies to literal games like chess",
        "It has no practical business applications",
        "It only works when there is exactly one player"
      ],
      "a": 0,
      "e": "Game theory provides a mathematical framework for analyzing competitive situations (pricing wars, market entry decisions) where each party's best choice depends on what others choose.",
      "h": "Think about business scenarios involving competitors making interdependent strategic choices.",
      "yr": "SS3"
    },
    {
      "q": "Find the saddle point of the matrix: Row1: [5,1], Row2: [1,5] (if any).",
      "o": [
        "No saddle point exists (maximin=1, minimax=5)",
        "1 (clear saddle point)",
        "5 (clear saddle point)",
        "3 (average value)"
      ],
      "a": 0,
      "e": "Row minimums: Row1=1, Row2=1, giving maximin=1. Column maximums: Col1=5, Col2=5, giving minimax=5. Since maximin(1)≠minimax(5), no pure-strategy saddle point exists here, requiring a mixed strategy.",
      "h": "Carefully compute maximin and minimax separately before comparing.",
      "yr": "SS3"
    },
    {
      "q": "What does 'the value of the game' refer to in game theory?",
      "o": [
        "The payoff value at the saddle point, representing the guaranteed outcome under optimal pure strategies",
        "The total number of possible strategies",
        "The number of players in the game",
        "The size of the payoff matrix"
      ],
      "a": 0,
      "e": "When a saddle point exists, its payoff value represents the guaranteed result both players should expect under optimal play — called the value of the game.",
      "h": "This term specifically refers to the payoff at a true saddle point.",
      "yr": "SS3"
    },
    {
      "q": "In a matrix game, if a particular strategy for Player A is always at least as good as another regardless of what Player B does, what is this called?",
      "o": [
        "A dominant strategy",
        "A mixed strategy",
        "A saddle point",
        "A zero-sum outcome"
      ],
      "a": 0,
      "e": "A dominant strategy performs at least as well as any alternative, no matter what the opponent does, making it the clear best choice.",
      "h": "Think about a strategy that is never worse, and sometimes better, than alternatives.",
      "yr": "SS3"
    },
    {
      "q": "Why might real-world competitive situations (like pricing strategies between two companies) be modeled as zero-sum games?",
      "o": [
        "When total market share or profit is essentially fixed, one company's gain directly corresponds to the other's loss",
        "All business situations are zero-sum",
        "Zero-sum models are never realistic for business",
        "Only non-competitive situations can be modeled this way"
      ],
      "a": 0,
      "e": "In situations with a fixed total 'pie' (like market share in a mature market), one competitor gaining customers often means the other directly loses them, fitting the zero-sum framework.",
      "h": "Think about competitive scenarios where the total available 'prize' is fixed.",
      "yr": "SS3"
    }
  ]
}
];
