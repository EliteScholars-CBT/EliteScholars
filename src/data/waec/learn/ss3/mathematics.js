// ============================================================================
// SS3 MATHEMATICS — COMPLETE LEARNING MODULE (18 TOPICS)
// NERDC Scheme of Work — First Term and Second Term (no Third Term content in NERDC SS3 Mathematics scheme)
// ============================================================================

export const WAEC_MATHEMATICS_LEARN_SS3 = [
{
  "topic": "Review of Difficult SS2 Topics (Logarithms)",
  "topicCode": "SS3-MTH-01",
  "module": "Number and Numeration",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This review consolidates <span class=\"learn-keyword\">logarithm laws</span> from SS2, strengthening the foundation needed for financial mathematics, calculus, and other SS3 topics.\n</div>\n\n<h3 class=\"learn-subheading\">1. Laws of Logarithms (Recap)</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Law</th><th>Statement</th></tr></thead>\n    <tbody>\n      <tr><td>Product</td><td>log(AB) = log A + log B</td></tr>\n      <tr><td>Quotient</td><td>log(A/B) = log A &minus; log B</td></tr>\n      <tr><td>Power</td><td>log(A<sup>n</sup>) = n log A</td></tr>\n      <tr><td>Log of 1</td><td>log<sub>a</sub>1 = 0 (for any base a)</td></tr>\n      <tr><td>Log of base</td><td>log<sub>a</sub>a = 1</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">2. Change of Base Formula</h3>\n<p class=\"learn-p\"><strong>log<sub>b</sub>N = log<sub>a</sub>N &divide; log<sub>a</sub>b</strong></p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Evaluate log&#8322;8.<br>log&#8322;8 = log10 8 &divide; log10 2 = 0.9031 &divide; 0.3010 = <strong>3</strong> (confirming 2&sup3;=8).</p>\n\n<h3 class=\"learn-subheading\">3. Solving Logarithmic Equations</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Solve log&#8323;(x+1) = 2.<br>x+1 = 3&sup2; = 9. x = <strong>8</strong>.</p>\n<p class=\"learn-p\"><strong>Worked Example 2:</strong> Solve log x + log(x&minus;3) = 1 (base 10).<br>log[x(x&minus;3)] = 1. x(x&minus;3) = 10. x&sup2;&minus;3x&minus;10=0. (x&minus;5)(x+2)=0. x=5 (rejecting x=&minus;2 since log of a negative number is undefined).</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Always check logarithmic equation solutions against the domain (arguments of log must be positive) to reject invalid roots.\n</div>\n",
  "questions": [
    {
      "q": "Evaluate log₂8 using the change of base formula.",
      "o": [
        "3",
        "4",
        "2",
        "8"
      ],
      "a": 0,
      "e": "log₂8 = log10 8 ÷ log10 2 ≈0.9031÷0.3010=3, confirming 2³=8.",
      "h": "Use logb N = loga N ÷ loga b.",
      "yr": "SS3"
    },
    {
      "q": "Solve log₃(x+1) = 2.",
      "o": [
        "8",
        "9",
        "7",
        "10"
      ],
      "a": 0,
      "e": "x+1=3²=9, so x=8.",
      "h": "Rewrite the logarithmic equation in exponential form.",
      "yr": "SS3"
    },
    {
      "q": "Solve log x + log(x-3) = 1 (base 10), rejecting invalid roots.",
      "o": [
        "5",
        "-2",
        "5 or -2",
        "10"
      ],
      "a": 0,
      "e": "x(x−3)=10, x²−3x−10=0, (x−5)(x+2)=0. x=−2 is rejected since log of a negative number is undefined. x=5.",
      "h": "Combine using the product law, then solve the resulting quadratic, checking the domain.",
      "yr": "SS3"
    },
    {
      "q": "Evaluate log₅1.",
      "o": [
        "0",
        "1",
        "5",
        "Undefined"
      ],
      "a": 0,
      "e": "loga1=0 for any valid base a.",
      "h": "The logarithm of 1 in any base is always 0.",
      "yr": "SS3"
    },
    {
      "q": "Evaluate log₇7.",
      "o": [
        "1",
        "0",
        "7",
        "49"
      ],
      "a": 0,
      "e": "logaa=1 for any valid base a.",
      "h": "The logarithm of a number to its own base is always 1.",
      "yr": "SS3"
    },
    {
      "q": "Simplify log 20 + log 5 using the product law.",
      "o": [
        "log 100 = 2",
        "log 25",
        "log 15",
        "log 4"
      ],
      "a": 0,
      "e": "log20+log5=log(20×5)=log100=2.",
      "h": "Combine using the product law, then evaluate log100.",
      "yr": "SS3"
    },
    {
      "q": "Simplify log 200 − log 2 using the quotient law.",
      "o": [
        "log 100 = 2",
        "log 198",
        "log 400",
        "log 100 = 1"
      ],
      "a": 0,
      "e": "log200−log2=log(200÷2)=log100=2.",
      "h": "Combine using the quotient law.",
      "yr": "SS3"
    },
    {
      "q": "Solve log₂(x) = 5.",
      "o": [
        "32",
        "10",
        "25",
        "5"
      ],
      "a": 0,
      "e": "x=2⁵=32.",
      "h": "Rewrite in exponential form: x=2⁵.",
      "yr": "SS3"
    },
    {
      "q": "Simplify 2 log 3 + log 4 as a single logarithm.",
      "o": [
        "log 36",
        "log 10",
        "log 24",
        "log 48"
      ],
      "a": 0,
      "e": "2log3=log3²=log9. log9+log4=log(9×4)=log36.",
      "h": "Convert 2log3 to log(3²) first.",
      "yr": "SS3"
    },
    {
      "q": "Solve log(x²) = 4 (base 10), for positive x.",
      "o": [
        "100",
        "10",
        "1000",
        "50"
      ],
      "a": 0,
      "e": "x²=10⁴=10000, so x=100 (taking the positive root).",
      "h": "Rewrite in exponential form, then take the square root.",
      "yr": "SS3"
    },
    {
      "q": "Evaluate log₃27 using the power law, given 27=3³.",
      "o": [
        "3",
        "9",
        "27",
        "1"
      ],
      "a": 0,
      "e": "log₃(3³)=3log₃3=3×1=3.",
      "h": "Express 27 as a power of 3 first.",
      "yr": "SS3"
    },
    {
      "q": "Using logarithm tables, evaluate 34.2 × 1.56 (log34.2=1.5340, log1.56=0.1931).",
      "o": [
        "53.4",
        "43.4",
        "63.4",
        "73.4"
      ],
      "a": 0,
      "e": "Sum=1.5340+0.1931=1.7271. Antilog of 1.7271≈53.4.",
      "h": "Add the logs, then find the antilog.",
      "yr": "SS3"
    },
    {
      "q": "Simplify log 16 ÷ log 2.",
      "o": [
        "4",
        "2",
        "8",
        "16"
      ],
      "a": 0,
      "e": "log16÷log2 = log(2⁴)÷log2 = 4log2÷log2 = 4.",
      "h": "Express 16 as a power of 2.",
      "yr": "SS3"
    },
    {
      "q": "Solve log₄(x-2) = 1.",
      "o": [
        "6",
        "4",
        "2",
        "8"
      ],
      "a": 0,
      "e": "x−2=4¹=4, so x=6.",
      "h": "Rewrite in exponential form: x−2=4¹.",
      "yr": "SS3"
    },
    {
      "q": "Why must we reject negative solutions when solving logarithmic equations?",
      "o": [
        "Because the logarithm of a negative number or zero is undefined in the real number system",
        "Negative solutions are always correct",
        "Logarithms only apply to even numbers",
        "There is no restriction on logarithm arguments"
      ],
      "a": 0,
      "e": "Logarithms are only defined for positive real number arguments, so any solution making the argument ≤0 must be rejected.",
      "h": "Recall the domain restriction of logarithmic functions.",
      "yr": "SS3"
    },
    {
      "q": "Simplify log 5 + log 4 − log 2.",
      "o": [
        "log 10 = 1",
        "log 20",
        "log 7",
        "log 3"
      ],
      "a": 0,
      "e": "log5+log4−log2=log(5×4÷2)=log10=1.",
      "h": "Combine using product and quotient laws together.",
      "yr": "SS3"
    },
    {
      "q": "Evaluate log₂(1/8).",
      "o": [
        "-3",
        "3",
        "8",
        "-8"
      ],
      "a": 0,
      "e": "1/8=2⁻³, so log₂(1/8)=−3.",
      "h": "Express 1/8 as a negative power of 2.",
      "yr": "SS3"
    },
    {
      "q": "Solve 2log x = log 36 (base 10), for positive x.",
      "o": [
        "6",
        "18",
        "36",
        "3"
      ],
      "a": 0,
      "e": "log(x²)=log36, so x²=36, x=6 (positive root).",
      "h": "Use the power law to rewrite 2logx as log(x²), then equate arguments.",
      "yr": "SS3"
    },
    {
      "q": "Using logarithms, evaluate the cube root of 729 (log 729 = 2.8627).",
      "o": [
        "9",
        "8",
        "10",
        "7"
      ],
      "a": 0,
      "e": "Divide log by 3: 2.8627÷3=0.9542. Antilog of 0.9542=9 (matches 9³=729).",
      "h": "Divide the logarithm by the root index, then find the antilog.",
      "yr": "SS3"
    },
    {
      "q": "Simplify log₁₀1000 − log₁₀10.",
      "o": [
        "2",
        "3",
        "1",
        "30"
      ],
      "a": 0,
      "e": "log1000=3, log10=1. 3−1=2.",
      "h": "Evaluate each logarithm separately, then subtract.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Logic",
  "topicCode": "SS3-MTH-02",
  "module": "Logic",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Mathematical logic</span> studies statements and their truth values. This topic covers simple and compound statements, logical connectives, truth tables, and basic proof techniques.\n</div>\n\n<h3 class=\"learn-subheading\">1. Simple and Compound Statements</h3>\n<p class=\"learn-p\">A <strong>simple statement</strong> (proposition) is a sentence that is either true or false, but not both. A <strong>compound statement</strong> combines two or more simple statements using connectives.</p>\n\n<h3 class=\"learn-subheading\">2. Logical Connectives</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Connective</th><th>Symbol</th><th>Meaning</th></tr></thead>\n    <tbody>\n      <tr><td>Negation</td><td>&not;p</td><td>\"not p\"</td></tr>\n      <tr><td>Conjunction</td><td>p &and; q</td><td>\"p and q\" (true only if both true)</td></tr>\n      <tr><td>Disjunction</td><td>p &or; q</td><td>\"p or q\" (true if at least one is true)</td></tr>\n      <tr><td>Conditional</td><td>p &rarr; q</td><td>\"if p then q\"</td></tr>\n      <tr><td>Biconditional</td><td>p &harr; q</td><td>\"p if and only if q\"</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">3. Truth Tables</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Construct the truth table for p &and; q.</p>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>p</th><th>q</th><th>p &and; q</th></tr></thead>\n    <tbody>\n      <tr><td>T</td><td>T</td><td>T</td></tr>\n      <tr><td>T</td><td>F</td><td>F</td></tr>\n      <tr><td>F</td><td>T</td><td>F</td></tr>\n      <tr><td>F</td><td>F</td><td>F</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">4. Indirect Proof</h3>\n<p class=\"learn-p\">An indirect proof (proof by contradiction) assumes the opposite of what we want to prove, then shows this assumption leads to a contradiction, proving the original statement true.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> p &rarr; q is only FALSE when p is true and q is false; it is TRUE in all other cases — this is the most commonly confused connective.\n</div>\n",
  "questions": [
    {
      "q": "What is a simple statement (proposition) in logic?",
      "o": [
        "A sentence that is either true or false, but not both",
        "A sentence combining two ideas",
        "A question",
        "A command"
      ],
      "a": 0,
      "e": "A proposition is a declarative sentence with a definite truth value (true or false), not both.",
      "h": "Think about the defining feature of a logical statement.",
      "yr": "SS3"
    },
    {
      "q": "What does the symbol ∧ represent?",
      "o": [
        "Conjunction (and)",
        "Disjunction (or)",
        "Negation (not)",
        "Conditional (if...then)"
      ],
      "a": 0,
      "e": "∧ represents conjunction, meaning 'and' — true only when both parts are true.",
      "h": "∧ looks like the letter A for 'And'.",
      "yr": "SS3"
    },
    {
      "q": "What does the symbol ∨ represent?",
      "o": [
        "Disjunction (or)",
        "Conjunction (and)",
        "Negation (not)",
        "Biconditional"
      ],
      "a": 0,
      "e": "∨ represents disjunction, meaning 'or' — true if at least one part is true.",
      "h": "∨ looks like the letter V for 'oR' (or).",
      "yr": "SS3"
    },
    {
      "q": "When is the conditional statement p → q false?",
      "o": [
        "Only when p is true and q is false",
        "Only when both p and q are false",
        "Only when p is false",
        "Always false"
      ],
      "a": 0,
      "e": "p→q is false only in the single case where p is true but q is false; it is true in all other combinations.",
      "h": "A true premise leading to a false conclusion is the only case that breaks the conditional.",
      "yr": "SS3"
    },
    {
      "q": "Construct the truth value of p ∧ q when p is True and q is False.",
      "o": [
        "False",
        "True",
        "Undefined",
        "Depends on context"
      ],
      "a": 0,
      "e": "Conjunction is true only when BOTH are true; since q is false, p∧q is false.",
      "h": "∧ requires both statements to be true.",
      "yr": "SS3"
    },
    {
      "q": "Construct the truth value of p ∨ q when p is True and q is False.",
      "o": [
        "True",
        "False",
        "Undefined",
        "Depends on context"
      ],
      "a": 0,
      "e": "Disjunction is true if AT LEAST ONE is true; since p is true, p∨q is true.",
      "h": "∨ only needs one of the statements to be true.",
      "yr": "SS3"
    },
    {
      "q": "What is the negation of the statement 'It is raining'?",
      "o": [
        "It is not raining",
        "It is sunny",
        "It might rain",
        "It was raining"
      ],
      "a": 0,
      "e": "Negation simply reverses the truth value: 'It is not raining'.",
      "h": "Negation adds 'not' to directly reverse the statement.",
      "yr": "SS3"
    },
    {
      "q": "If p is False, what is the truth value of ¬p?",
      "o": [
        "True",
        "False",
        "Undefined",
        "Cannot be determined"
      ],
      "a": 0,
      "e": "Negation reverses the truth value: if p is False, ¬p is True.",
      "h": "Negation flips True to False and False to True.",
      "yr": "SS3"
    },
    {
      "q": "The biconditional p ↔ q is true when:",
      "o": [
        "p and q have the same truth value",
        "p is always true",
        "q is always true",
        "p and q are both false only"
      ],
      "a": 0,
      "e": "p↔q ('p if and only if q') is true whenever p and q share the same truth value (both true or both false).",
      "h": "Biconditional means both directions of the conditional hold.",
      "yr": "SS3"
    },
    {
      "q": "What is the converse of 'If p then q' (p → q)?",
      "o": [
        "If q then p (q → p)",
        "If not p then not q",
        "If not q then not p",
        "p and q"
      ],
      "a": 0,
      "e": "The converse reverses the direction: q → p.",
      "h": "Converse swaps the hypothesis and conclusion.",
      "yr": "SS3"
    },
    {
      "q": "What is the contrapositive of 'If p then q' (p → q)?",
      "o": [
        "If not q then not p (¬q → ¬p)",
        "If q then p",
        "If not p then not q",
        "p or q"
      ],
      "a": 0,
      "e": "The contrapositive negates and swaps both: ¬q → ¬p. It is always logically equivalent to the original conditional.",
      "h": "Contrapositive negates both parts AND reverses the direction.",
      "yr": "SS3"
    },
    {
      "q": "What is proof by contradiction (indirect proof)?",
      "o": [
        "Assuming the opposite of what you want to prove, then showing it leads to a contradiction",
        "Directly proving a statement using known facts",
        "Proving a statement is false",
        "Using a truth table only"
      ],
      "a": 0,
      "e": "Indirect proof assumes the negation of the target statement and derives a logical contradiction, thereby proving the original statement.",
      "h": "Think about 'proving by disproving the opposite'.",
      "yr": "SS3"
    },
    {
      "q": "How many rows does a truth table for two statements (p and q) have?",
      "o": [
        "4",
        "2",
        "8",
        "16"
      ],
      "a": 0,
      "e": "With 2 variables, each having 2 possible truth values, there are 2²=4 rows.",
      "h": "Use 2ⁿ where n is the number of statements.",
      "yr": "SS3"
    },
    {
      "q": "How many rows does a truth table for three statements (p, q, r) have?",
      "o": [
        "8",
        "4",
        "6",
        "9"
      ],
      "a": 0,
      "e": "With 3 variables: 2³=8 rows.",
      "h": "Use 2ⁿ where n is the number of statements.",
      "yr": "SS3"
    },
    {
      "q": "Two statements are logically equivalent if:",
      "o": [
        "They have the same truth value in every possible case",
        "They use the same symbols",
        "They are both true",
        "They are both simple statements"
      ],
      "a": 0,
      "e": "Logical equivalence means the statements' truth tables match exactly in every row.",
      "h": "Compare the full truth tables of both statements.",
      "yr": "SS3"
    },
    {
      "q": "Is p → q logically equivalent to ¬p ∨ q?",
      "o": [
        "Yes, they are always equivalent",
        "No, never equivalent",
        "Only when p is true",
        "Only when q is false"
      ],
      "a": 0,
      "e": "p→q and ¬p∨q have identical truth tables in all four cases, making them logically equivalent.",
      "h": "Compare the truth values of both expressions across all combinations of p and q.",
      "yr": "SS3"
    },
    {
      "q": "What is the inverse of 'If p then q' (p → q)?",
      "o": [
        "If not p then not q (¬p → ¬q)",
        "If q then p",
        "If not q then not p",
        "p and not q"
      ],
      "a": 0,
      "e": "The inverse negates both parts without swapping: ¬p → ¬q.",
      "h": "Inverse negates both the hypothesis and conclusion, keeping the same order.",
      "yr": "SS3"
    },
    {
      "q": "A statement that is always true, regardless of the truth values of its components, is called a:",
      "o": [
        "Tautology",
        "Contradiction",
        "Contingency",
        "Conjunction"
      ],
      "a": 0,
      "e": "A tautology is a compound statement that is true in every possible case.",
      "h": "This term describes a statement that's always true.",
      "yr": "SS3"
    },
    {
      "q": "A statement that is always false, regardless of the truth values of its components, is called a:",
      "o": [
        "Contradiction",
        "Tautology",
        "Conjunction",
        "Disjunction"
      ],
      "a": 0,
      "e": "A contradiction (or fallacy) is a compound statement that is false in every possible case.",
      "h": "This is the opposite of a tautology.",
      "yr": "SS3"
    },
    {
      "q": "Why are truth tables useful in logic?",
      "o": [
        "They systematically show the truth value of a compound statement for every possible combination of its components",
        "They only work for simple statements",
        "They replace the need for logical reasoning entirely",
        "They are used only in computer science"
      ],
      "a": 0,
      "e": "Truth tables exhaustively list every combination of truth values, allowing us to determine a compound statement's truth value in all cases, verify equivalences, and identify tautologies or contradictions.",
      "h": "Think about how listing all combinations helps analyze compound statements.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Application of Surds to Trigonometry",
  "topicCode": "SS3-MTH-03",
  "module": "Trigonometry",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic expresses <span class=\"learn-keyword\">trigonometric ratios</span> of 30&deg;, 45&deg;, and 60&deg; as <span class=\"learn-keyword\">surds</span> (exact values), and uses graphs of sine and cosine to solve equations over 0&deg;&ndash;360&deg;.\n</div>\n\n<h3 class=\"learn-subheading\">1. Exact Trigonometric Ratios (Surd Form)</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Angle</th><th>sin</th><th>cos</th><th>tan</th></tr></thead>\n    <tbody>\n      <tr><td>30&deg;</td><td>1/2</td><td>&radic;3/2</td><td>1/&radic;3</td></tr>\n      <tr><td>45&deg;</td><td>1/&radic;2</td><td>1/&radic;2</td><td>1</td></tr>\n      <tr><td>60&deg;</td><td>&radic;3/2</td><td>1/2</td><td>&radic;3</td></tr>\n    </tbody>\n  </table>\n</div>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Simplify sin60&deg; &times; cos30&deg; without a calculator.<br>sin60&deg;=&radic;3/2, cos30&deg;=&radic;3/2. Product = (&radic;3/2)&times;(&radic;3/2) = 3/4.</p>\n\n<h3 class=\"learn-subheading\">2. Graphs of Sine and Cosine</h3>\n<p class=\"learn-p\">y=sinx oscillates between &minus;1 and 1, starting at 0, rising to 1 at 90&deg;, back to 0 at 180&deg;, down to &minus;1 at 270&deg;, back to 0 at 360&deg;. y=cosx starts at 1, falls to 0 at 90&deg;, &minus;1 at 180&deg;, 0 at 270&deg;, 1 at 360&deg;.</p>\n\n<h3 class=\"learn-subheading\">3. Solving Trig Equations Using Graphs</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Using the graph of y=sinx, solve sinx=0.5 for 0&deg;&le;x&le;360&deg;.<br>Reading where the curve crosses y=0.5: <strong>x=30&deg; or x=150&deg;</strong> (since sin is positive in the first and second quadrants).</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Memorize the 30-45-60 surd values exactly — WAEC frequently tests simplifying expressions without calculators using these exact values.\n</div>\n",
  "questions": [
    {
      "q": "What is the exact value of sin30°?",
      "o": [
        "1/2",
        "√3/2",
        "1/√2",
        "1"
      ],
      "a": 0,
      "e": "sin30°=1/2 (standard exact value).",
      "h": "Recall the standard 30-45-60 triangle ratios.",
      "yr": "SS3"
    },
    {
      "q": "What is the exact value of cos60°?",
      "o": [
        "1/2",
        "√3/2",
        "1",
        "1/√2"
      ],
      "a": 0,
      "e": "cos60°=1/2 (standard exact value).",
      "h": "cos60° equals sin30° due to complementary angle relationships.",
      "yr": "SS3"
    },
    {
      "q": "What is the exact value of tan45°?",
      "o": [
        "1",
        "0",
        "√3",
        "1/√2"
      ],
      "a": 0,
      "e": "tan45°=1, since sin45°=cos45°=1/√2.",
      "h": "tan45° is the simplest exact trig value.",
      "yr": "SS3"
    },
    {
      "q": "Simplify sin60° × cos30° without a calculator.",
      "o": [
        "3/4",
        "1/2",
        "√3/4",
        "1"
      ],
      "a": 0,
      "e": "sin60°=√3/2, cos30°=√3/2. Product=(√3/2)×(√3/2)=3/4.",
      "h": "Substitute the exact surd values, then multiply.",
      "yr": "SS3"
    },
    {
      "q": "What is the exact value of tan60°?",
      "o": [
        "√3",
        "1/√3",
        "1",
        "√2"
      ],
      "a": 0,
      "e": "tan60°=sin60°/cos60°=(√3/2)/(1/2)=√3.",
      "h": "Divide sin60° by cos60°.",
      "yr": "SS3"
    },
    {
      "q": "What is the exact value of tan30°?",
      "o": [
        "1/√3",
        "√3",
        "1",
        "2"
      ],
      "a": 0,
      "e": "tan30°=sin30°/cos30°=(1/2)/(√3/2)=1/√3.",
      "h": "Divide sin30° by cos30°.",
      "yr": "SS3"
    },
    {
      "q": "Using the graph of y=sinx, solve sinx=0.5 for 0°≤x≤360°.",
      "o": [
        "x=30° or 150°",
        "x=30° only",
        "x=60° or 120°",
        "x=150° or 210°"
      ],
      "a": 0,
      "e": "sinx=0.5 at x=30° (first quadrant) and x=180°−30°=150° (second quadrant), since sine is positive in both.",
      "h": "Sine is positive in the 1st and 2nd quadrants; use the reference angle.",
      "yr": "SS3"
    },
    {
      "q": "Using the graph of y=cosx, solve cosx=0.5 for 0°≤x≤360°.",
      "o": [
        "x=60° or 300°",
        "x=60° only",
        "x=30° or 330°",
        "x=120° or 240°"
      ],
      "a": 0,
      "e": "cosx=0.5 at x=60° (first quadrant) and x=360°−60°=300° (fourth quadrant), since cosine is positive in both.",
      "h": "Cosine is positive in the 1st and 4th quadrants.",
      "yr": "SS3"
    },
    {
      "q": "Simplify (sin45°)² + (cos45°)².",
      "o": [
        "1",
        "0",
        "2",
        "1/2"
      ],
      "a": 0,
      "e": "(1/√2)²+(1/√2)²=1/2+1/2=1 (the Pythagorean identity).",
      "h": "This is the fundamental identity sin²θ+cos²θ=1.",
      "yr": "SS3"
    },
    {
      "q": "Rationalize and simplify 1/√2.",
      "o": [
        "√2/2",
        "1/2",
        "√2",
        "2"
      ],
      "a": 0,
      "e": "1/√2 × √2/√2 = √2/2.",
      "h": "Multiply numerator and denominator by √2.",
      "yr": "SS3"
    },
    {
      "q": "Between which x-values is sinx negative on the graph from 0° to 360°?",
      "o": [
        "180° to 360°",
        "0° to 180°",
        "0° to 90°",
        "270° to 360° only"
      ],
      "a": 0,
      "e": "Sine is positive from 0° to 180° and negative from 180° to 360°.",
      "h": "Recall which quadrants have positive/negative sine values.",
      "yr": "SS3"
    },
    {
      "q": "Between which x-values is cosx negative on the graph from 0° to 360°?",
      "o": [
        "90° to 270°",
        "0° to 90°",
        "270° to 360°",
        "0° to 180°"
      ],
      "a": 0,
      "e": "Cosine is positive from 0°–90° and 270°–360°, but negative from 90° to 270°.",
      "h": "Recall which quadrants have positive/negative cosine values.",
      "yr": "SS3"
    },
    {
      "q": "Simplify sin30° + cos60°.",
      "o": [
        "1",
        "1/2",
        "√3/2",
        "3/2"
      ],
      "a": 0,
      "e": "sin30°+cos60°=1/2+1/2=1.",
      "h": "Both values equal 1/2.",
      "yr": "SS3"
    },
    {
      "q": "Simplify tan45° × cos60°.",
      "o": [
        "1/2",
        "1",
        "√3/2",
        "2"
      ],
      "a": 0,
      "e": "tan45°=1, cos60°=1/2. Product=1×1/2=1/2.",
      "h": "Substitute exact values then multiply.",
      "yr": "SS3"
    },
    {
      "q": "Solve 2sinx=1 for 0°≤x≤360°.",
      "o": [
        "x=30° or 150°",
        "x=30° or 210°",
        "x=60° or 120°",
        "x=90° only"
      ],
      "a": 0,
      "e": "sinx=0.5, giving x=30° or x=150° (reference angle 30°, sine positive in Q1 and Q2).",
      "h": "Isolate sinx first, then find solutions using the reference angle.",
      "yr": "SS3"
    },
    {
      "q": "At what value of x does y=sinx reach its maximum value of 1 (0°≤x≤360°)?",
      "o": [
        "90°",
        "0°",
        "180°",
        "270°"
      ],
      "a": 0,
      "e": "sinx reaches its maximum value of 1 at x=90°.",
      "h": "Recall the peak of the sine curve.",
      "yr": "SS3"
    },
    {
      "q": "At what value of x does y=cosx reach its minimum value of -1 (0°≤x≤360°)?",
      "o": [
        "180°",
        "0°",
        "90°",
        "270°"
      ],
      "a": 0,
      "e": "cosx reaches its minimum value of −1 at x=180°.",
      "h": "Recall the trough of the cosine curve.",
      "yr": "SS3"
    },
    {
      "q": "Simplify (√3/2)² + (1/2)².",
      "o": [
        "1",
        "3/4",
        "1/4",
        "2"
      ],
      "a": 0,
      "e": "(√3/2)²+(1/2)²=3/4+1/4=1, consistent with sin²60°+cos²60°=1.",
      "h": "Square each term and add; relate to the Pythagorean identity.",
      "yr": "SS3"
    },
    {
      "q": "Express sin45°×2 in simplest surd form.",
      "o": [
        "√2",
        "1",
        "2√2",
        "1/√2"
      ],
      "a": 0,
      "e": "sin45°=1/√2. 2×1/√2=2/√2=√2 (after rationalizing).",
      "h": "Multiply then rationalize the denominator.",
      "yr": "SS3"
    },
    {
      "q": "Why are exact surd values of 30°, 45°, 60° important in trigonometry?",
      "o": [
        "They allow exact calculations without a calculator, important for proofs and WAEC non-calculator questions",
        "They are only used in advanced calculus",
        "They replace the need for a protractor",
        "They only apply to right triangles with specific side lengths"
      ],
      "a": 0,
      "e": "These standard angles produce exact (surd) values that are essential for solving problems precisely without a calculator, especially common in WAEC exams.",
      "h": "Think about why memorized exact values matter for non-calculator exam sections.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Matrices and Determinants",
  "topicCode": "SS3-MTH-04",
  "module": "Matrices and Determinants",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  A <span class=\"learn-keyword\">matrix</span> is a rectangular array of numbers. This topic covers matrix operations, the <span class=\"learn-keyword\">determinant</span> of a matrix, and using matrices to solve simultaneous equations.\n</div>\n\n<h3 class=\"learn-subheading\">1. Order of a Matrix</h3>\n<p class=\"learn-p\">A matrix with m rows and n columns has order m&times;n.</p>\n\n<h3 class=\"learn-subheading\">2. Matrix Addition and Subtraction</h3>\n<p class=\"learn-p\">Add or subtract corresponding elements (matrices must be the same order).</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Add [[1,2],[3,4]] + [[5,6],[7,8]] = <strong>[[6,8],[10,12]]</strong>.</p>\n\n<h3 class=\"learn-subheading\">3. Matrix Multiplication</h3>\n<p class=\"learn-p\">Multiply rows of the first matrix by columns of the second, summing the products.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Multiply [[1,2],[3,4]] &times; [[5,6],[7,8]].<br>Row1&times;Col1: 1(5)+2(7)=19. Row1&times;Col2: 1(6)+2(8)=22. Row2&times;Col1: 3(5)+4(7)=43. Row2&times;Col2: 3(6)+4(8)=50.<br>Result: <strong>[[19,22],[43,50]]</strong>.</p>\n\n<h3 class=\"learn-subheading\">4. Determinant of a 2&times;2 Matrix</h3>\n<p class=\"learn-p\">For [[a,b],[c,d]]: <strong>det = ad &minus; bc</strong>.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the determinant of [[3,5],[2,4]].<br>det = 3(4)&minus;5(2) = 12&minus;10 = <strong>2</strong>.</p>\n\n<h3 class=\"learn-subheading\">5. Solving Simultaneous Equations Using Matrices (Cramer's Rule)</h3>\n<p class=\"learn-p\">For ax+by=e, cx+dy=f: x = (ed&minus;bf)/(ad&minus;bc), y = (af&minus;ec)/(ad&minus;bc).</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> When multiplying matrices, always check that the number of columns in the first matrix equals the number of rows in the second — otherwise multiplication is undefined.\n</div>\n",
  "questions": [
    {
      "q": "What is the order of a matrix with 3 rows and 2 columns?",
      "o": [
        "3×2",
        "2×3",
        "5",
        "6"
      ],
      "a": 0,
      "e": "Order is given as rows×columns: 3×2.",
      "h": "Order format is (number of rows)×(number of columns).",
      "yr": "SS3"
    },
    {
      "q": "Add the matrices [[1,2],[3,4]] and [[5,6],[7,8]].",
      "o": [
        "[[6,8],[10,12]]",
        "[[5,12],[21,32]]",
        "[[4,4],[4,4]]",
        "[[6,8],[11,12]]"
      ],
      "a": 0,
      "e": "Add corresponding elements: 1+5=6, 2+6=8, 3+7=10, 4+8=12.",
      "h": "Add elements in the same position.",
      "yr": "SS3"
    },
    {
      "q": "Find the determinant of [[3,5],[2,4]].",
      "o": [
        "2",
        "22",
        "-2",
        "12"
      ],
      "a": 0,
      "e": "det=3(4)−5(2)=12−10=2.",
      "h": "For [[a,b],[c,d]], det=ad−bc.",
      "yr": "SS3"
    },
    {
      "q": "Multiply [[1,2],[3,4]] × [[5,6],[7,8]].",
      "o": [
        "[[19,22],[43,50]]",
        "[[5,12],[21,32]]",
        "[[6,8],[10,12]]",
        "[[17,20],[41,48]]"
      ],
      "a": 0,
      "e": "Row1×Col1=1(5)+2(7)=19; Row1×Col2=1(6)+2(8)=22; Row2×Col1=3(5)+4(7)=43; Row2×Col2=3(6)+4(8)=50.",
      "h": "Multiply rows of the first matrix by columns of the second, summing products.",
      "yr": "SS3"
    },
    {
      "q": "Find the determinant of [[6,2],[3,1]].",
      "o": [
        "0",
        "6",
        "2",
        "9"
      ],
      "a": 0,
      "e": "det=6(1)−2(3)=6−6=0.",
      "h": "Apply det=ad−bc.",
      "yr": "SS3"
    },
    {
      "q": "What does a determinant of 0 indicate about a matrix?",
      "o": [
        "The matrix is singular (has no inverse)",
        "The matrix is the identity matrix",
        "The matrix has only positive entries",
        "The matrix is a 1×1 matrix"
      ],
      "a": 0,
      "e": "A zero determinant means the matrix is singular, meaning it has no multiplicative inverse.",
      "h": "Think about what makes matrix division (inverse) impossible.",
      "yr": "SS3"
    },
    {
      "q": "Subtract [[8,5],[6,3]] − [[2,1],[4,2]].",
      "o": [
        "[[6,4],[2,1]]",
        "[[10,6],[10,5]]",
        "[[6,4],[2,2]]",
        "[[4,4],[2,1]]"
      ],
      "a": 0,
      "e": "Subtract corresponding elements: 8−2=6, 5−1=4, 6−4=2, 3−2=1.",
      "h": "Subtract elements in the same position.",
      "yr": "SS3"
    },
    {
      "q": "Using Cramer's rule, solve 2x+3y=13, x+y=5 for x. (Hint: find determinants first.)",
      "o": [
        "2",
        "3",
        "5",
        "1"
      ],
      "a": 0,
      "e": "Main det=2(1)−3(1)=−1. x-det=13(1)−3(5)=13−15=−2. x=(−2)/(−1)=2.",
      "h": "x = (det with x-column replaced by constants) ÷ (main determinant).",
      "yr": "SS3"
    },
    {
      "q": "Using the same equations (2x+3y=13, x+y=5), find y.",
      "o": [
        "3",
        "2",
        "5",
        "1"
      ],
      "a": 0,
      "e": "y-det=2(5)−13(1)=10−13=−3. y=(−3)/(−1)=3.",
      "h": "y = (det with y-column replaced by constants) ÷ (main determinant).",
      "yr": "SS3"
    },
    {
      "q": "What is the identity matrix for 2×2 matrices?",
      "o": [
        "[[1,0],[0,1]]",
        "[[0,0],[0,0]]",
        "[[1,1],[1,1]]",
        "[[2,0],[0,2]]"
      ],
      "a": 0,
      "e": "The 2×2 identity matrix has 1s on the main diagonal and 0s elsewhere: [[1,0],[0,1]].",
      "h": "The identity matrix acts like '1' in matrix multiplication.",
      "yr": "SS3"
    },
    {
      "q": "What is the transpose of the matrix [[1,2,3],[4,5,6]]?",
      "o": [
        "[[1,4],[2,5],[3,6]]",
        "[[4,5,6],[1,2,3]]",
        "[[1,2,3],[4,5,6]]",
        "[[6,5,4],[3,2,1]]"
      ],
      "a": 0,
      "e": "The transpose swaps rows and columns: the original 2×3 matrix becomes a 3×2 matrix.",
      "h": "Transpose turns rows into columns.",
      "yr": "SS3"
    },
    {
      "q": "Can a 2×3 matrix be multiplied by a 3×2 matrix?",
      "o": [
        "Yes, giving a 2×2 result",
        "No, dimensions don't match",
        "Yes, giving a 3×3 result",
        "Only if both matrices are square"
      ],
      "a": 0,
      "e": "Since the columns of the first (3) match the rows of the second (3), multiplication is valid, giving a 2×2 result.",
      "h": "Check that inner dimensions match: columns of first = rows of second.",
      "yr": "SS3"
    },
    {
      "q": "Find the determinant of [[5,0],[0,5]].",
      "o": [
        "25",
        "0",
        "10",
        "5"
      ],
      "a": 0,
      "e": "det=5(5)−0(0)=25.",
      "h": "Apply det=ad−bc.",
      "yr": "SS3"
    },
    {
      "q": "A matrix [[2,4],[1,2]] has what determinant?",
      "o": [
        "0",
        "8",
        "4",
        "2"
      ],
      "a": 0,
      "e": "det=2(2)−4(1)=4−4=0, meaning this matrix is singular.",
      "h": "Apply det=ad−bc and simplify.",
      "yr": "SS3"
    },
    {
      "q": "A matrix with only one row is called a:",
      "o": [
        "Row matrix",
        "Column matrix",
        "Square matrix",
        "Zero matrix"
      ],
      "a": 0,
      "e": "A matrix with a single row (1×n) is called a row matrix.",
      "h": "The name describes its single-row shape.",
      "yr": "SS3"
    },
    {
      "q": "A matrix with only one column is called a:",
      "o": [
        "Column matrix",
        "Row matrix",
        "Square matrix",
        "Identity matrix"
      ],
      "a": 0,
      "e": "A matrix with a single column (n×1) is called a column matrix.",
      "h": "The name describes its single-column shape.",
      "yr": "SS3"
    },
    {
      "q": "Multiply the matrix [[2,3]] (1×2) by [[1],[4]] (2×1).",
      "o": [
        "[[14]]",
        "[[2,3],[1,4]]",
        "[[6],[12]]",
        "[[3,12]]"
      ],
      "a": 0,
      "e": "Row×Column: 2(1)+3(4)=2+12=14, giving a 1×1 matrix [[14]].",
      "h": "Multiply corresponding elements and sum for the single resulting entry.",
      "yr": "SS3"
    },
    {
      "q": "Using matrices to solve 3x+y=11, x-y=1: find the main determinant.",
      "o": [
        "-4",
        "4",
        "10",
        "2"
      ],
      "a": 0,
      "e": "Main det=3(−1)−1(1)=−3−1=−4.",
      "h": "Form the coefficient matrix [[3,1],[1,-1]] and find its determinant.",
      "yr": "SS3"
    },
    {
      "q": "Using the same equations (3x+y=11, x-y=1, main det=-4), solve for x.",
      "o": [
        "3",
        "4",
        "2",
        "1"
      ],
      "a": 0,
      "e": "x-det=11(−1)−1(1)=−11−1=−12. x=(−12)/(−4)=3.",
      "h": "Replace the x-column with constants, find that determinant, divide by main det.",
      "yr": "SS3"
    },
    {
      "q": "Why are matrices useful for solving systems of simultaneous equations?",
      "o": [
        "They provide a systematic, organized method (like Cramer's rule) especially useful for larger systems",
        "They are only useful for single equations",
        "They eliminate the need for any calculation",
        "They only work for non-linear equations"
      ],
      "a": 0,
      "e": "Matrices and determinants provide a structured, scalable approach to solving systems of equations, particularly valuable as the number of equations and variables increases.",
      "h": "Think about how matrix methods organize and scale for complex systems.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Linear and Quadratic Equations",
  "topicCode": "SS3-MTH-05",
  "module": "Equations",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic covers solving a <span class=\"learn-keyword\">linear equation</span> and a <span class=\"learn-keyword\">quadratic equation</span> simultaneously, both algebraically and graphically, including applications to word problems.\n</div>\n\n<h3 class=\"learn-subheading\">1. Solving Algebraically (Substitution)</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Solve y=x+1 and y=x&sup2;&minus;5 simultaneously.<br>Substitute: x+1=x&sup2;&minus;5. x&sup2;&minus;x&minus;6=0. (x&minus;3)(x+2)=0. x=3 or x=&minus;2.<br>When x=3, y=4. When x=&minus;2, y=&minus;1. Solutions: <strong>(3,4) and (&minus;2,&minus;1)</strong>.</p>\n\n<h3 class=\"learn-subheading\">2. Solving Graphically</h3>\n<p class=\"learn-p\">Plot both the line and the curve on the same axes. The points of intersection give the solutions.</p>\n\n<h3 class=\"learn-subheading\">3. Word Problems Involving Capital Market Applications</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> A trader's profit P (in thousands) from selling x units follows P=&minus;x&sup2;+10x. If the trader wants a profit of 16 (thousand), find x.<br>&minus;x&sup2;+10x=16. x&sup2;&minus;10x+16=0. (x&minus;2)(x&minus;8)=0. x=2 or x=<strong>8</strong> units.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> When solving linear-quadratic systems, always substitute the linear equation into the quadratic (not the reverse) to keep the resulting equation solvable.\n</div>\n",
  "questions": [
    {
      "q": "Solve y=x+1 and y=x²−5 simultaneously for x.",
      "o": [
        "x=3 or x=-2",
        "x=-3 or x=2",
        "x=3 or x=2",
        "x=-3 or x=-2"
      ],
      "a": 0,
      "e": "x+1=x²−5, x²−x−6=0, (x−3)(x+2)=0, x=3 or x=−2.",
      "h": "Substitute the linear equation into the quadratic, then solve.",
      "yr": "SS3"
    },
    {
      "q": "Using the solutions x=3 and x=-2 from y=x+1, find the corresponding y-values.",
      "o": [
        "y=4 and y=-1",
        "y=3 and y=-2",
        "y=4 and y=1",
        "y=-4 and y=1"
      ],
      "a": 0,
      "e": "y=x+1: at x=3, y=4; at x=−2, y=−1.",
      "h": "Substitute each x-value back into the linear equation.",
      "yr": "SS3"
    },
    {
      "q": "A trader's profit follows P=-x²+10x. Find x when P=16.",
      "o": [
        "x=2 or x=8",
        "x=4 or x=6",
        "x=1 or x=9",
        "x=0 or x=10"
      ],
      "a": 0,
      "e": "−x²+10x=16, x²−10x+16=0, (x−2)(x−8)=0, x=2 or x=8.",
      "h": "Set the profit function equal to 16 and solve the resulting quadratic.",
      "yr": "SS3"
    },
    {
      "q": "Solve y=2x-1 and y=x²-4 simultaneously for x.",
      "o": [
        "x=3 or x=-1",
        "x=-3 or x=1",
        "x=3 or x=1",
        "x=-3 or x=-1"
      ],
      "a": 0,
      "e": "2x−1=x²−4, x²−2x−3=0, (x−3)(x+1)=0, x=3 or x=−1.",
      "h": "Substitute the linear equation into the quadratic.",
      "yr": "SS3"
    },
    {
      "q": "Solve y=x and y=x²-6 simultaneously for x.",
      "o": [
        "x=3 or x=-2",
        "x=-3 or x=2",
        "x=6 or x=-1",
        "x=2 or x=-3"
      ],
      "a": 0,
      "e": "x=x²−6, x²−x−6=0, (x−3)(x+2)=0, x=3 or x=−2.",
      "h": "Substitute y=x into the quadratic equation.",
      "yr": "SS3"
    },
    {
      "q": "A curve y=x²-5x+6 and a line y=2 intersect at how many points?",
      "o": [
        "Two points",
        "One point",
        "No points",
        "Infinite points"
      ],
      "a": 0,
      "e": "Setting x²−5x+6=2: x²−5x+4=0, (x−1)(x−4)=0, giving two solutions x=1 and x=4.",
      "h": "Solve the resulting quadratic and count the real solutions.",
      "yr": "SS3"
    },
    {
      "q": "Solve y=3x+2 and y=x²+2x simultaneously for x.",
      "o": [
        "x=2 or x=-1",
        "x=-2 or x=1",
        "x=2 or x=1",
        "x=-2 or x=-1"
      ],
      "a": 0,
      "e": "3x+2=x²+2x, x²−x−2=0, (x−2)(x+1)=0, x=2 or x=−1.",
      "h": "Substitute and rearrange into standard quadratic form.",
      "yr": "SS3"
    },
    {
      "q": "If a line and a parabola do not intersect, what does this mean algebraically?",
      "o": [
        "The resulting quadratic equation has a negative discriminant (no real roots)",
        "The resulting equation always has two solutions",
        "The line must be horizontal",
        "The parabola must open downward"
      ],
      "a": 0,
      "e": "No intersection means no real solutions exist, which occurs when the discriminant of the combined equation is negative.",
      "h": "Think about what a negative discriminant means for real solutions.",
      "yr": "SS3"
    },
    {
      "q": "Solve y=x-3 and y=x²-4x+3 simultaneously for x.",
      "o": [
        "x=3 or x=2",
        "x=-3 or x=-2",
        "x=3 or x=-2",
        "x=-3 or x=2"
      ],
      "a": 0,
      "e": "x−3=x²−4x+3, x²−5x+6=0, (x−3)(x−2)=0, x=3 or x=2.",
      "h": "Substitute and solve the resulting quadratic.",
      "yr": "SS3"
    },
    {
      "q": "A company's revenue is R=x²-8x+20 (in thousands). Find x when R=20.",
      "o": [
        "x=0 or x=8",
        "x=4 only",
        "x=2 or x=6",
        "x=1 or x=7"
      ],
      "a": 0,
      "e": "x²−8x+20=20, x²−8x=0, x(x−8)=0, x=0 or x=8.",
      "h": "Set the revenue equal to 20 and factor out common terms.",
      "yr": "SS3"
    },
    {
      "q": "Solve y=5-x and y=x²-7 simultaneously for x.",
      "o": [
        "x=3 or x=-4",
        "x=-3 or x=4",
        "x=3 or x=4",
        "x=-3 or x=-4"
      ],
      "a": 0,
      "e": "5−x=x²−7, x²+x−12=0, (x+4)(x−3)=0, x=−4 or x=3.",
      "h": "Rearrange carefully, watching the sign of x in the linear equation.",
      "yr": "SS3"
    },
    {
      "q": "In graphical solutions, the x-coordinate of an intersection point represents:",
      "o": [
        "A common solution satisfying both equations",
        "Only the linear equation's solution",
        "Only the quadratic equation's solution",
        "Neither equation's solution"
      ],
      "a": 0,
      "e": "At an intersection point, both the line and curve equations are simultaneously satisfied.",
      "h": "An intersection point lies on both graphs at once.",
      "yr": "SS3"
    },
    {
      "q": "Solve y=4x and y=x²+3 simultaneously for x.",
      "o": [
        "x=1 or x=3",
        "x=-1 or x=-3",
        "x=1 or x=-3",
        "x=-1 or x=3"
      ],
      "a": 0,
      "e": "4x=x²+3, x²−4x+3=0, (x−1)(x−3)=0, x=1 or x=3.",
      "h": "Substitute and solve the resulting quadratic.",
      "yr": "SS3"
    },
    {
      "q": "Find the y-values for the solutions x=1 and x=3 in y=4x.",
      "o": [
        "y=4 and y=12",
        "y=1 and y=3",
        "y=4 and y=3",
        "y=1 and y=12"
      ],
      "a": 0,
      "e": "y=4x: at x=1, y=4; at x=3, y=12.",
      "h": "Substitute each x-value into y=4x.",
      "yr": "SS3"
    },
    {
      "q": "A manufacturer's cost function is C=x²-6x+10. Find x when cost is minimized (vertex of the parabola).",
      "o": [
        "x=3",
        "x=6",
        "x=10",
        "x=0"
      ],
      "a": 0,
      "e": "The vertex of ax²+bx+c occurs at x=−b/2a=6/2=3.",
      "h": "Use the vertex formula x=−b/(2a).",
      "yr": "SS3"
    },
    {
      "q": "Solve y=3x-2 and y=x²-x-2 simultaneously for x.",
      "o": [
        "x=0 or x=4",
        "x=0 or x=-4",
        "x=2 or x=4",
        "x=-2 or x=0"
      ],
      "a": 0,
      "e": "3x−2=x²−x−2, x²−4x=0, x(x−4)=0, x=0 or x=4.",
      "h": "Substitute and simplify to standard quadratic form, then factor out the common term.",
      "yr": "SS3"
    },
    {
      "q": "Why is it standard practice to substitute the linear equation into the quadratic (not vice versa)?",
      "o": [
        "Because it keeps the resulting equation quadratic (solvable by factoring or the formula), avoiding a more complex equation",
        "Because the quadratic must always be solved first",
        "It doesn't matter which is substituted",
        "Substituting the quadratic is always required"
      ],
      "a": 0,
      "e": "Substituting the linear equation into the quadratic keeps the degree manageable (quadratic), making it solvable with standard methods.",
      "h": "Think about what happens to the equation's complexity if done the other way.",
      "yr": "SS3"
    },
    {
      "q": "Solve y=x+4 and y=x²-2x+4 simultaneously for x.",
      "o": [
        "x=0 or x=3",
        "x=-0 or x=-3",
        "x=0 or x=-3",
        "x=3 only"
      ],
      "a": 0,
      "e": "x+4=x²−2x+4, x²−3x=0, x(x−3)=0, x=0 or x=3.",
      "h": "Substitute and factor out the common term x.",
      "yr": "SS3"
    },
    {
      "q": "A parabola y=x²-4x+5 and a line y=1 — how many real intersection points exist?",
      "o": [
        "One point (the line is tangent to the curve)",
        "Two points",
        "No points",
        "Infinite points"
      ],
      "a": 0,
      "e": "x²−4x+5=1 gives x²−4x+4=0, (x−2)²=0, a repeated root at x=2 — meaning the line touches the curve at exactly one point (tangent).",
      "h": "Solve the resulting quadratic and check if the discriminant is zero.",
      "yr": "SS3"
    },
    {
      "q": "In the capital market application context, why might solving linear-quadratic systems be useful?",
      "o": [
        "To find break-even points or specific profit/cost targets where a linear relationship meets a quadratic one",
        "It has no practical business application",
        "Only for calculating simple interest",
        "Only used in pure algebra with no real-world use"
      ],
      "a": 0,
      "e": "Businesses often model costs, revenue, or profit with quadratic functions and compare them to linear targets or constraints, making these systems directly applicable to financial decision-making.",
      "h": "Think about how businesses might use these equations to find specific target values.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Surface Area and Volume of Spheres and Hemispheres",
  "topicCode": "SS3-MTH-06",
  "module": "Mensuration",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic covers formulas for the <span class=\"learn-keyword\">surface area</span> and <span class=\"learn-keyword\">volume</span> of spheres and hemispheres, both solid and hollow.\n</div>\n\n<h3 class=\"learn-subheading\">1. Sphere Formulas</h3>\n<p class=\"learn-p\"><strong>Surface Area = 4&pi;r&sup2;</strong> &nbsp;&nbsp; <strong>Volume = (4/3)&pi;r&sup3;</strong></p>\n\n<h3 class=\"learn-subheading\">2. Hemisphere Formulas</h3>\n<p class=\"learn-p\"><strong>Curved Surface Area = 2&pi;r&sup2;</strong> &nbsp;&nbsp; <strong>Total Surface Area = 3&pi;r&sup2;</strong> (curved + flat circle) &nbsp;&nbsp; <strong>Volume = (2/3)&pi;r&sup3;</strong></p>\n\n<h3 class=\"learn-subheading\">3. Worked Examples</h3>\n<p class=\"learn-p\"><strong>Example 1:</strong> Find the volume of a sphere with radius 6cm (take &pi;=22/7).<br>V = (4/3) &times; 22/7 &times; 6&sup3; = (4/3) &times; 22/7 &times; 216 &asymp; <strong>904.3 cm&sup3;</strong>.</p>\n<p class=\"learn-p\"><strong>Example 2:</strong> Find the surface area of a sphere with radius 7cm.<br>SA = 4 &times; 22/7 &times; 7&sup2; = 4 &times; 22/7 &times; 49 = <strong>616 cm&sup2;</strong>.</p>\n<p class=\"learn-p\"><strong>Example 3:</strong> Find the total surface area of a hemisphere with radius 5cm.<br>TSA = 3 &times; 22/7 &times; 5&sup2; = 3 &times; 22/7 &times; 25 &asymp; <strong>235.7 cm&sup2;</strong>.</p>\n\n<h3 class=\"learn-subheading\">4. Hollow Spheres</h3>\n<p class=\"learn-p\">For a hollow sphere with inner radius r and outer radius R, the volume of material = (4/3)&pi;(R&sup3;&minus;r&sup3;).</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Don't forget the flat circular base when calculating the TOTAL surface area of a hemisphere — it's a common mistake to use only the curved surface area (2&pi;r&sup2;).\n</div>\n",
  "questions": [
    {
      "q": "Find the volume of a sphere with radius 6cm (π=22/7).",
      "o": [
        "904.3 cm³",
        "452.6 cm³",
        "1206 cm³",
        "678.9 cm³"
      ],
      "a": 0,
      "e": "V=(4/3)×22/7×6³=(4/3)×22/7×216≈904.3 cm³.",
      "h": "Use V=(4/3)πr³.",
      "yr": "SS3"
    },
    {
      "q": "Find the surface area of a sphere with radius 7cm (π=22/7).",
      "o": [
        "616 cm²",
        "308 cm²",
        "1232 cm²",
        "154 cm²"
      ],
      "a": 0,
      "e": "SA=4×22/7×7²=4×22/7×49=616 cm².",
      "h": "Use SA=4πr².",
      "yr": "SS3"
    },
    {
      "q": "Find the total surface area of a hemisphere with radius 5cm (π=22/7).",
      "o": [
        "235.7 cm²",
        "157.1 cm²",
        "314.3 cm²",
        "78.6 cm²"
      ],
      "a": 0,
      "e": "TSA=3×22/7×5²=3×22/7×25≈235.7 cm².",
      "h": "Use TSA=3πr² (curved + flat circle).",
      "yr": "SS3"
    },
    {
      "q": "Find the curved surface area of a hemisphere with radius 5cm (π=22/7).",
      "o": [
        "157.1 cm²",
        "235.7 cm²",
        "78.6 cm²",
        "314.3 cm²"
      ],
      "a": 0,
      "e": "CSA=2×22/7×5²=2×22/7×25≈157.1 cm².",
      "h": "Use CSA=2πr² (curved surface only, excluding the flat circle).",
      "yr": "SS3"
    },
    {
      "q": "Find the volume of a hemisphere with radius 6cm (π=22/7).",
      "o": [
        "452.6 cm³",
        "904.3 cm³",
        "226.3 cm³",
        "678.9 cm³"
      ],
      "a": 0,
      "e": "V=(2/3)×22/7×6³=(2/3)×22/7×216≈452.6 cm³.",
      "h": "Use V=(2/3)πr³ for a hemisphere.",
      "yr": "SS3"
    },
    {
      "q": "A sphere has a volume of 904.3 cm³. What is its approximate radius (π=22/7)?",
      "o": [
        "6 cm",
        "5 cm",
        "7 cm",
        "8 cm"
      ],
      "a": 0,
      "e": "Working backward: 904.3=(4/3)(22/7)r³, solving gives r³≈216, so r≈6cm.",
      "h": "Rearrange V=(4/3)πr³ to solve for r.",
      "yr": "SS3"
    },
    {
      "q": "Find the volume of a hollow sphere with outer radius 10cm and inner radius 8cm (π=22/7).",
      "o": [
        "2290.7 cm³",
        "4188.8 cm³",
        "2144.8 cm³",
        "1900 cm³"
      ],
      "a": 0,
      "e": "V=(4/3)(22/7)(10³−8³)=(4/3)(22/7)(1000−512)=(4/3)(22/7)(488)≈2290.7 cm³.",
      "h": "Use V=(4/3)π(R³−r³) for a hollow sphere.",
      "yr": "SS3"
    },
    {
      "q": "A solid sphere of radius 3cm is melted and recast into a cone of the same radius. If the cone's volume equals the sphere's, find the cone's height (using V_cone=(1/3)πr²h).",
      "o": [
        "12 cm",
        "9 cm",
        "6 cm",
        "4 cm"
      ],
      "a": 0,
      "e": "Sphere V=(4/3)πr³. Cone V=(1/3)πr²h. Setting equal: (4/3)r³=(1/3)r²h, so h=4r=4(3)=12cm.",
      "h": "Equate sphere and cone volumes, then solve for h.",
      "yr": "SS3"
    },
    {
      "q": "Find the surface area of a sphere with diameter 14cm (π=22/7).",
      "o": [
        "616 cm²",
        "308 cm²",
        "1232 cm²",
        "154 cm²"
      ],
      "a": 0,
      "e": "Radius=7cm. SA=4×22/7×7²=616 cm².",
      "h": "First find the radius (half the diameter), then apply SA=4πr².",
      "yr": "SS3"
    },
    {
      "q": "How does the volume of a hemisphere compare to the volume of a full sphere with the same radius?",
      "o": [
        "Hemisphere volume is exactly half the sphere's volume",
        "Hemisphere volume equals the sphere's volume",
        "Hemisphere volume is a third of the sphere's volume",
        "Hemisphere volume is double the sphere's volume"
      ],
      "a": 0,
      "e": "Since a hemisphere is exactly half a sphere, its volume (2/3)πr³ is half of (4/3)πr³.",
      "h": "Compare the formulas (2/3)πr³ and (4/3)πr³.",
      "yr": "SS3"
    },
    {
      "q": "A spherical balloon has radius 3.5cm. Find its volume (π=22/7).",
      "o": [
        "179.67 cm³",
        "154 cm³",
        "200 cm³",
        "359.3 cm³"
      ],
      "a": 0,
      "e": "V=(4/3)×22/7×3.5³=(4/3)×22/7×42.875≈179.67 cm³.",
      "h": "Apply V=(4/3)πr³ with r=3.5cm.",
      "yr": "SS3"
    },
    {
      "q": "Find the total surface area of a hemisphere with radius 7cm (π=22/7).",
      "o": [
        "462 cm²",
        "308 cm²",
        "154 cm²",
        "616 cm²"
      ],
      "a": 0,
      "e": "TSA=3×22/7×7²=3×22/7×49=462 cm².",
      "h": "Apply TSA=3πr².",
      "yr": "SS3"
    },
    {
      "q": "A metal sphere of radius 4cm is melted and recast into smaller spheres of radius 1cm each. How many smaller spheres can be made?",
      "o": [
        "64",
        "16",
        "32",
        "48"
      ],
      "a": 0,
      "e": "Volume ratio=(4/1)³=64, since volume scales with the cube of the radius ratio.",
      "h": "Compare volumes using the cube of the radius ratio (big radius ÷ small radius)³.",
      "yr": "SS3"
    },
    {
      "q": "Find the radius of a sphere whose surface area is 1386 cm² (π=22/7).",
      "o": [
        "10.5 cm",
        "7 cm",
        "14 cm",
        "21 cm"
      ],
      "a": 0,
      "e": "1386=4×22/7×r². r²=1386÷(88/7)=1386×7/88=110.25. r=√110.25=10.5cm.",
      "h": "Rearrange SA=4πr² to solve for r².",
      "yr": "SS3"
    },
    {
      "q": "A hemisphere has radius 3cm. Find its volume (π=22/7).",
      "o": [
        "56.57 cm³",
        "113.1 cm³",
        "84.86 cm³",
        "28.3 cm³"
      ],
      "a": 0,
      "e": "V=(2/3)×22/7×3³=(2/3)×22/7×27≈56.57 cm³.",
      "h": "Apply V=(2/3)πr³.",
      "yr": "SS3"
    },
    {
      "q": "If the radius of a sphere is doubled, how does the volume change?",
      "o": [
        "It increases 8 times",
        "It doubles",
        "It increases 4 times",
        "It increases 16 times"
      ],
      "a": 0,
      "e": "Since V∝r³, doubling r multiplies volume by 2³=8.",
      "h": "Volume scales with the cube of the radius.",
      "yr": "SS3"
    },
    {
      "q": "If the radius of a sphere is doubled, how does the surface area change?",
      "o": [
        "It increases 4 times",
        "It doubles",
        "It increases 8 times",
        "It increases 16 times"
      ],
      "a": 0,
      "e": "Since SA∝r², doubling r multiplies surface area by 2²=4.",
      "h": "Surface area scales with the square of the radius.",
      "yr": "SS3"
    },
    {
      "q": "A hollow hemisphere has outer radius 6cm and inner radius 4cm. Find the volume of material used (π=22/7, using (2/3)π(R³-r³)).",
      "o": [
        "154.67 cm³",
        "100 cm³",
        "200 cm³",
        "75.5 cm³"
      ],
      "a": 0,
      "e": "V=(2/3)×22/7×(6³−4³)=(2/3)×22/7×(216−64)=(2/3)×22/7×152≈154.67 cm³.",
      "h": "Use V=(2/3)π(R³−r³) for a hollow hemisphere.",
      "yr": "SS3"
    },
    {
      "q": "A solid sphere has volume 38.808 cm³ with radius approximately 2.1cm (π=22/7). Verify this is consistent by checking r³≈9.26.",
      "o": [
        "Approximately consistent, confirming r≈2.1cm",
        "Not consistent",
        "Cannot be verified",
        "r should be 4.2cm"
      ],
      "a": 0,
      "e": "V=(4/3)(22/7)(2.1)³=(4/3)(22/7)(9.261)≈38.8 cm³, confirming consistency with the given volume.",
      "h": "Substitute r=2.1 into the volume formula and check if it matches.",
      "yr": "SS3"
    },
    {
      "q": "Why must the flat circular face be included when calculating the TOTAL surface area of a hemisphere (not just the curved part)?",
      "o": [
        "Because the total surface area includes every exposed surface, and the flat circular base is part of the solid's boundary",
        "The flat face is never part of a hemisphere",
        "Only the curved surface matters in all cases",
        "The flat face only matters for hollow hemispheres"
      ],
      "a": 0,
      "e": "A solid hemisphere has both a curved (domed) surface and a flat circular base; the TOTAL surface area must account for both exposed surfaces.",
      "h": "Think about every surface that would be visible/touchable on a solid hemisphere.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Longitude and Latitude I",
  "topicCode": "SS3-MTH-07",
  "module": "Earth Geometry",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Longitude and latitude</span> are imaginary lines used to locate any position on Earth. This topic introduces key terms and the formula for the radius of a parallel of latitude.\n</div>\n\n<h3 class=\"learn-subheading\">1. Key Terms</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Term</th><th>Meaning</th></tr></thead>\n    <tbody>\n      <tr><td>Equator</td><td>The great circle at 0&deg; latitude, dividing Earth into N and S hemispheres</td></tr>\n      <tr><td>Greenwich Meridian</td><td>The 0&deg; longitude line, dividing Earth into E and W hemispheres</td></tr>\n      <tr><td>Latitude</td><td>Angular distance North or South of the equator (0&deg;&ndash;90&deg;)</td></tr>\n      <tr><td>Longitude</td><td>Angular distance East or West of the Greenwich Meridian (0&deg;&ndash;180&deg;)</td></tr>\n      <tr><td>Parallel of latitude</td><td>A circle parallel to the equator, at a given latitude</td></tr>\n      <tr><td>Meridian</td><td>A great semicircle running from the North Pole to the South Pole</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">2. Radius of a Parallel of Latitude</h3>\n<p class=\"learn-p\"><strong>r = R cos&theta;</strong>, where R = radius of the Earth (&asymp;6400km), &theta; = the latitude.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the radius of the parallel of latitude 60&deg;N (R=6400km).<br>r = 6400 &times; cos60&deg; = 6400 &times; 0.5 = <strong>3200 km</strong>.</p>\n\n<h3 class=\"learn-subheading\">3. Length of an Arc on a Parallel of Latitude</h3>\n<p class=\"learn-p\"><strong>Length = (&theta;/360) &times; 2&pi;r</strong>, where r is the radius of that parallel, and &theta; is the longitude difference.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the distance along latitude 60&deg;N between longitudes 10&deg;E and 40&deg;E (r=3200km, &pi;=22/7).<br>Longitude difference=30&deg;. Distance = (30/360) &times; 2 &times; 22/7 &times; 3200 &asymp; <strong>1676.2 km</strong>.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Remember that along a MERIDIAN (same longitude), the radius used is always the full Earth radius R — it's only along a PARALLEL OF LATITUDE that you use r=R cos&theta;.\n</div>\n",
  "questions": [
    {
      "q": "What is the equator?",
      "o": [
        "The great circle at 0° latitude, dividing Earth into N and S hemispheres",
        "The 0° longitude line",
        "Any line parallel to the North Pole",
        "A meridian"
      ],
      "a": 0,
      "e": "The equator is the reference great circle at 0° latitude, splitting Earth into Northern and Southern hemispheres.",
      "h": "Latitude is measured from this reference circle.",
      "yr": "SS3"
    },
    {
      "q": "What is the Greenwich Meridian?",
      "o": [
        "The 0° longitude line, dividing Earth into E and W hemispheres",
        "The 0° latitude line",
        "A parallel of latitude",
        "The North Pole"
      ],
      "a": 0,
      "e": "The Greenwich (Prime) Meridian is the reference line at 0° longitude.",
      "h": "Longitude is measured from this reference line.",
      "yr": "SS3"
    },
    {
      "q": "Find the radius of the parallel of latitude 60°N (R=6400km).",
      "o": [
        "3200 km",
        "6400 km",
        "5543.1 km",
        "1600 km"
      ],
      "a": 0,
      "e": "r=R cosθ=6400×cos60°=6400×0.5=3200km.",
      "h": "Use r=R cosθ.",
      "yr": "SS3"
    },
    {
      "q": "Find the radius of the parallel of latitude 0° (equator), R=6400km.",
      "o": [
        "6400 km",
        "3200 km",
        "0 km",
        "1600 km"
      ],
      "a": 0,
      "e": "r=R cos0°=6400×1=6400km (the equator has the maximum radius, equal to Earth's radius).",
      "h": "cos0°=1.",
      "yr": "SS3"
    },
    {
      "q": "Find the distance along latitude 60°N between longitudes 10°E and 40°E (r=3200km, π=22/7).",
      "o": [
        "1676.2 km",
        "1800 km",
        "1500 km",
        "2000 km"
      ],
      "a": 0,
      "e": "Longitude difference=30°. Distance=(30/360)×2×22/7×3200≈1676.2km.",
      "h": "Use Length=(θ/360)×2πr.",
      "yr": "SS3"
    },
    {
      "q": "What is a parallel of latitude?",
      "o": [
        "A circle parallel to the equator at a given latitude",
        "A line from pole to pole",
        "The Greenwich Meridian",
        "A great circle through both poles"
      ],
      "a": 0,
      "e": "A parallel of latitude is a circle at constant latitude, running parallel to the equator.",
      "h": "Think about lines of constant latitude running east-west.",
      "yr": "SS3"
    },
    {
      "q": "What is a meridian?",
      "o": [
        "A great semicircle running from the North Pole to the South Pole",
        "A circle parallel to the equator",
        "The equator itself",
        "A line of constant latitude"
      ],
      "a": 0,
      "e": "A meridian is a great semicircle (half great circle) connecting the North and South Poles, representing a line of constant longitude.",
      "h": "Meridians run north-south, connecting the poles.",
      "yr": "SS3"
    },
    {
      "q": "Find the radius of the parallel of latitude 45°N (R=6400km).",
      "o": [
        "4525.5 km",
        "6400 km",
        "3200 km",
        "5600 km"
      ],
      "a": 0,
      "e": "r=6400×cos45°=6400×0.7071≈4525.5km.",
      "h": "Use r=R cosθ with θ=45°.",
      "yr": "SS3"
    },
    {
      "q": "Why is the radius of a parallel of latitude smaller at higher latitudes (closer to the poles)?",
      "o": [
        "Because cosθ decreases as θ increases toward 90°, shrinking the parallel's radius",
        "The radius stays constant everywhere on Earth",
        "Latitude has no effect on the radius",
        "The radius increases near the poles"
      ],
      "a": 0,
      "e": "Since r=R cosθ and cosθ decreases from 1 (at the equator) to 0 (at the poles), the parallel circles shrink as latitude increases.",
      "h": "Think about how cosθ behaves as θ approaches 90°.",
      "yr": "SS3"
    },
    {
      "q": "At what latitude does the radius of the parallel equal 0?",
      "o": [
        "90° (the poles)",
        "0° (the equator)",
        "45°",
        "60°"
      ],
      "a": 0,
      "e": "At the poles (90°), cos90°=0, so the parallel of latitude shrinks to a single point.",
      "h": "Consider where cosθ=0.",
      "yr": "SS3"
    },
    {
      "q": "Find the distance along the equator between longitudes 20°E and 50°E (R=6400km, π=22/7).",
      "o": [
        "3352.3 km",
        "3600 km",
        "3000 km",
        "3800 km"
      ],
      "a": 0,
      "e": "Longitude difference=30°. Distance=(30/360)×2×22/7×6400≈3352.3km.",
      "h": "On the equator, use the full Earth radius R since the equator's radius equals R.",
      "yr": "SS3"
    },
    {
      "q": "Find the radius of the parallel of latitude 30°S (R=6400km).",
      "o": [
        "5543.1 km",
        "3200 km",
        "6400 km",
        "4800 km"
      ],
      "a": 0,
      "e": "r=6400×cos30°=6400×0.866≈5543.1km. (South latitude uses the same formula as North.)",
      "h": "The formula r=R cosθ applies to both N and S latitudes equally.",
      "yr": "SS3"
    },
    {
      "q": "How many degrees does longitude range from, East or West of the Greenwich Meridian?",
      "o": [
        "0° to 180°",
        "0° to 90°",
        "0° to 360°",
        "0° to 45°"
      ],
      "a": 0,
      "e": "Longitude ranges from 0° to 180° East or West of the Greenwich Meridian.",
      "h": "Longitude has a maximum of 180° in either direction.",
      "yr": "SS3"
    },
    {
      "q": "How many degrees does latitude range from, North or South of the equator?",
      "o": [
        "0° to 90°",
        "0° to 180°",
        "0° to 360°",
        "0° to 45°"
      ],
      "a": 0,
      "e": "Latitude ranges from 0° (equator) to 90° (poles) North or South.",
      "h": "Latitude has a maximum of 90° (at the poles).",
      "yr": "SS3"
    },
    {
      "q": "Find the distance along latitude 50°N between longitudes 5°W and 25°E (R=6400km, π=22/7).",
      "o": [
        "2154.7 km",
        "3000 km",
        "2500 km",
        "2800 km"
      ],
      "a": 0,
      "e": "Longitude difference=25−(−5)=30°. r=6400×cos50°≈4114.0km. Distance=(30/360)×2×22/7×4114.0≈2154.7km.",
      "h": "Find the longitude difference first, then the radius at that latitude, then the arc length.",
      "yr": "SS3"
    },
    {
      "q": "What is the significance of the 0° longitude and 0° latitude intersection point?",
      "o": [
        "It lies in the Gulf of Guinea off the coast of West Africa, used as the reference origin for the global coordinate system",
        "It is located at the North Pole",
        "It has no particular significance",
        "It is the center of the Earth"
      ],
      "a": 0,
      "e": "The point where the equator meets the Greenwich Meridian (0°,0°) serves as the origin reference point for the entire global latitude-longitude coordinate system.",
      "h": "Think about where these two reference lines (equator and Prime Meridian) cross.",
      "yr": "SS3"
    },
    {
      "q": "Find the radius of the parallel of latitude 23.5°N (approximately the Tropic of Cancer), R=6400km.",
      "o": [
        "5869.3 km",
        "6400 km",
        "3200 km",
        "4800 km"
      ],
      "a": 0,
      "e": "r=6400×cos23.5°≈6400×0.9171≈5869.3km.",
      "h": "Apply r=R cosθ with θ=23.5°.",
      "yr": "SS3"
    },
    {
      "q": "Two points lie on the same meridian. What formula is used to find the distance between them?",
      "o": [
        "Distance = (θ/360) × 2πR, using the full Earth's radius R",
        "Distance = (θ/360) × 2πr, using the parallel's radius r",
        "Distance cannot be calculated",
        "Distance = θ × R only"
      ],
      "a": 0,
      "e": "Along a meridian, you always travel along a great circle of radius R (the full Earth radius), regardless of latitude.",
      "h": "Meridians are great circles with radius equal to Earth's radius.",
      "yr": "SS3"
    },
    {
      "q": "Find the distance along a meridian between latitudes 10°N and 40°N (R=6400km, π=22/7).",
      "o": [
        "3352.3 km",
        "3000 km",
        "3600 km",
        "2800 km"
      ],
      "a": 0,
      "e": "Latitude difference=30°. Distance=(30/360)×2×22/7×6400≈3352.3km (using full Earth radius since it's along a meridian).",
      "h": "Use the full Earth radius R since meridian distances are measured on great circles.",
      "yr": "SS3"
    },
    {
      "q": "Why is it important to distinguish between distance along a parallel of latitude and distance along a meridian?",
      "o": [
        "Because they use different radii (r=Rcosθ for parallels vs. R for meridians), giving different formulas and results",
        "They always give the same result",
        "Meridians have no defined length",
        "Parallels of latitude cannot be measured"
      ],
      "a": 0,
      "e": "Using the wrong radius leads to incorrect distance calculations — parallels use the latitude-dependent radius r=Rcosθ, while meridians always use the full Earth radius R.",
      "h": "Think about why using the correct radius matters for accurate calculations.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Longitude and Latitude II",
  "topicCode": "SS3-MTH-08",
  "module": "Earth Geometry",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic extends longitude and latitude calculations to <span class=\"learn-keyword\">distances between two points</span> and <span class=\"learn-keyword\">time differences</span> between places, using nautical rules.\n</div>\n\n<h3 class=\"learn-subheading\">1. Distance Along a Meridian (Same Longitude)</h3>\n<p class=\"learn-p\"><strong>Distance = (&theta;/360) &times; 2&pi;R</strong>, where &theta; is the latitude difference, R is Earth's radius.</p>\n\n<h3 class=\"learn-subheading\">2. Distance Along a Parallel of Latitude (Same Latitude)</h3>\n<p class=\"learn-p\"><strong>Distance = (&theta;/360) &times; 2&pi;r</strong>, where &theta; is the longitude difference, r = R cos(latitude).</p>\n\n<h3 class=\"learn-subheading\">3. Distance in Nautical Miles</h3>\n<p class=\"learn-p\">1&deg; of arc (along a great circle, i.e. a meridian) = 60 nautical miles. So distance along a meridian (in nautical miles) = latitude difference (in degrees) &times; 60.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the distance in nautical miles between latitudes 10&deg;N and 25&deg;N on the same meridian.<br>Difference = 15&deg;. Distance = 15 &times; 60 = <strong>900 nautical miles</strong>.</p>\n\n<h3 class=\"learn-subheading\">4. Time Differences Between Places</h3>\n<p class=\"learn-p\">The Earth rotates 360&deg; in 24 hours, so <strong>15&deg; of longitude = 1 hour</strong>. Places East of Greenwich are AHEAD in time; places West are BEHIND.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the time difference between two places at longitude 30&deg;E and 45&deg;W.<br>Longitude difference = 30+45 = 75&deg;. Time difference = 75 &divide; 15 = <strong>5 hours</strong>.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> When finding longitude difference between an East and a West point, ADD the two longitude values; when both are East (or both West), SUBTRACT them.\n</div>\n",
  "questions": [
    {
      "q": "Find the distance in nautical miles between latitudes 10°N and 25°N on the same meridian.",
      "o": [
        "900 nautical miles",
        "600 nautical miles",
        "1200 nautical miles",
        "450 nautical miles"
      ],
      "a": 0,
      "e": "Difference=15°. Distance=15×60=900 nautical miles.",
      "h": "Use 1° of latitude = 60 nautical miles.",
      "yr": "SS3"
    },
    {
      "q": "Find the time difference between two places at longitude 30°E and 45°W.",
      "o": [
        "5 hours",
        "3 hours",
        "4 hours",
        "6 hours"
      ],
      "a": 0,
      "e": "Longitude difference=30+45=75° (add since on opposite sides). Time difference=75÷15=5 hours.",
      "h": "Add longitudes when one is East and the other West.",
      "yr": "SS3"
    },
    {
      "q": "How many degrees of longitude correspond to 1 hour of time difference?",
      "o": [
        "15°",
        "1°",
        "24°",
        "60°"
      ],
      "a": 0,
      "e": "Earth rotates 360° in 24 hours: 360÷24=15° per hour.",
      "h": "Divide the full rotation (360°) by 24 hours.",
      "yr": "SS3"
    },
    {
      "q": "A place at longitude 60°E is ahead or behind GMT, and by how much?",
      "o": [
        "Ahead by 4 hours",
        "Behind by 4 hours",
        "Ahead by 2 hours",
        "Behind by 2 hours"
      ],
      "a": 0,
      "e": "East of Greenwich is ahead in time. Time=60÷15=4 hours ahead.",
      "h": "East means ahead; divide longitude by 15.",
      "yr": "SS3"
    },
    {
      "q": "A place at longitude 45°W is ahead or behind GMT, and by how much?",
      "o": [
        "Behind by 3 hours",
        "Ahead by 3 hours",
        "Behind by 1 hour",
        "Ahead by 1 hour"
      ],
      "a": 0,
      "e": "West of Greenwich is behind in time. Time=45÷15=3 hours behind.",
      "h": "West means behind; divide longitude by 15.",
      "yr": "SS3"
    },
    {
      "q": "Find the longitude difference between two points both at East longitude: 20°E and 65°E.",
      "o": [
        "45°",
        "85°",
        "20°",
        "65°"
      ],
      "a": 0,
      "e": "Since both are East, subtract: 65−20=45°.",
      "h": "Subtract longitudes when both are on the same side (both East or both West).",
      "yr": "SS3"
    },
    {
      "q": "Find the time difference corresponding to a 45° longitude difference.",
      "o": [
        "3 hours",
        "4 hours",
        "2 hours",
        "1 hour"
      ],
      "a": 0,
      "e": "Time=45÷15=3 hours.",
      "h": "Divide the longitude difference by 15.",
      "yr": "SS3"
    },
    {
      "q": "If it is 12:00 noon at Greenwich (0°), what time is it at a place 30°E?",
      "o": [
        "2:00 pm",
        "10:00 am",
        "12:00 noon",
        "1:00 pm"
      ],
      "a": 0,
      "e": "30°E is ahead by 30÷15=2 hours. 12:00+2=2:00pm.",
      "h": "East is ahead; add the time difference to the Greenwich time.",
      "yr": "SS3"
    },
    {
      "q": "If it is 12:00 noon at Greenwich (0°), what time is it at a place 45°W?",
      "o": [
        "9:00 am",
        "3:00 pm",
        "12:00 noon",
        "10:00 am"
      ],
      "a": 0,
      "e": "45°W is behind by 45÷15=3 hours. 12:00−3=9:00am.",
      "h": "West is behind; subtract the time difference from the Greenwich time.",
      "yr": "SS3"
    },
    {
      "q": "Find the distance along a meridian between latitudes 5°S and 20°N (R=6400km, π=22/7).",
      "o": [
        "2788.6 km",
        "2500 km",
        "3000 km",
        "2600 km"
      ],
      "a": 0,
      "e": "Latitude difference=5+20=25° (add since on opposite sides of equator). Distance=(25/360)×2×22/7×6400≈2788.6km.",
      "h": "Add latitudes when on opposite sides of the equator (one N, one S).",
      "yr": "SS3"
    },
    {
      "q": "Two places are on the same longitude but at latitudes 15°N and 35°N. Find their distance apart in nautical miles.",
      "o": [
        "1200 nautical miles",
        "1000 nautical miles",
        "1500 nautical miles",
        "900 nautical miles"
      ],
      "a": 0,
      "e": "Difference=20°. Distance=20×60=1200 nautical miles.",
      "h": "Use 1° latitude = 60 nautical miles along a meridian.",
      "yr": "SS3"
    },
    {
      "q": "A plane flies from longitude 10°W to longitude 50°E. Find the longitude difference.",
      "o": [
        "60°",
        "40°",
        "50°",
        "10°"
      ],
      "a": 0,
      "e": "Add since on opposite sides: 10+50=60°.",
      "h": "Add longitudes when one is West and the other East.",
      "yr": "SS3"
    },
    {
      "q": "Find the time it would take for the Earth to rotate through 90° of longitude.",
      "o": [
        "6 hours",
        "3 hours",
        "12 hours",
        "9 hours"
      ],
      "a": 0,
      "e": "Time=90÷15=6 hours.",
      "h": "Divide the longitude by 15°/hour.",
      "yr": "SS3"
    },
    {
      "q": "A place X is at 20°E and place Y is at 20°W. If it is 3:00pm at X, what time is it at Y?",
      "o": [
        "12:20 pm",
        "3:00 pm",
        "6:00 pm",
        "9:00 am"
      ],
      "a": 0,
      "e": "Longitude difference=20+20=40°. Time difference=40÷15≈2.67 hours (2 hours 40 minutes). Since Y is West of X, Y's time is earlier: 3:00pm−2h40m=12:20pm.",
      "h": "Find the longitude difference, convert to time, then subtract since Y is West of X.",
      "yr": "SS3"
    },
    {
      "q": "Why do places to the East of Greenwich experience sunrise earlier than places to the West?",
      "o": [
        "Because the Earth rotates from West to East, so eastern locations face the sun sooner",
        "The sun moves faster over eastern locations",
        "Eastern locations are physically closer to the sun",
        "There is no actual time difference"
      ],
      "a": 0,
      "e": "Since Earth rotates West to East, points further east come into the sun's view (sunrise) before points further west, making eastern times 'ahead'.",
      "h": "Think about the direction of Earth's rotation and how it affects when different longitudes face the sun.",
      "yr": "SS3"
    },
    {
      "q": "Find the distance in km between longitudes 0° and 90°E along the equator (R=6400km, π=22/7).",
      "o": [
        "10057 km",
        "8000 km",
        "9000 km",
        "12000 km"
      ],
      "a": 0,
      "e": "Distance=(90/360)×2×22/7×6400≈10057km.",
      "h": "Use the full Earth radius R since this is along the equator.",
      "yr": "SS3"
    },
    {
      "q": "A ship travels from latitude 60°N to latitude 30°N along the same meridian. Find the distance in nautical miles.",
      "o": [
        "1800 nautical miles",
        "1500 nautical miles",
        "2000 nautical miles",
        "1200 nautical miles"
      ],
      "a": 0,
      "e": "Difference=30°. Distance=30×60=1800 nautical miles.",
      "h": "Multiply the latitude difference by 60 nautical miles per degree.",
      "yr": "SS3"
    },
    {
      "q": "If the time at a place is 8:00am and the time at Greenwich is 5:00am, is the place East or West of Greenwich?",
      "o": [
        "East (since its time is ahead of GMT)",
        "West (since its time is ahead of GMT)",
        "Cannot be determined",
        "It is exactly at Greenwich"
      ],
      "a": 0,
      "e": "Since 8:00am is later (ahead) of 5:00am GMT, the place must be East of Greenwich.",
      "h": "A later (ahead) time compared to GMT indicates an Eastern location.",
      "yr": "SS3"
    },
    {
      "q": "Find the longitude of the place in the previous question (if its time is 3 hours ahead of GMT).",
      "o": [
        "45°E",
        "45°W",
        "30°E",
        "60°E"
      ],
      "a": 0,
      "e": "Time difference of 3 hours corresponds to 3×15=45° of longitude, and since it's ahead (East): 45°E.",
      "h": "Multiply the time difference by 15° per hour.",
      "yr": "SS3"
    },
    {
      "q": "Why is distance measured in nautical miles particularly useful for latitude calculations?",
      "o": [
        "Because 1° of latitude conveniently equals exactly 60 nautical miles, simplifying calculations along meridians",
        "Nautical miles are only used for longitude",
        "Nautical miles do not relate to degrees at all",
        "It is an arbitrary unit with no mathematical basis"
      ],
      "a": 0,
      "e": "The nautical mile was specifically defined so that 1 minute of latitude (1/60 of a degree) equals 1 nautical mile, making latitude-based distance calculations very convenient.",
      "h": "Think about how the nautical mile unit was originally defined in relation to latitude.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Binary Operations",
  "topicCode": "SS3-MTH-09",
  "module": "Binary Operations",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  A <span class=\"learn-keyword\">binary operation</span> combines two elements of a set to produce another element of the same set. This topic covers key properties: closure, commutativity, associativity, identity, and inverse.\n</div>\n\n<h3 class=\"learn-subheading\">1. Closure Property</h3>\n<p class=\"learn-p\">A set is <strong>closed</strong> under an operation if combining any two elements of the set always produces a result still in the set.</p>\n\n<h3 class=\"learn-subheading\">2. Commutativity</h3>\n<p class=\"learn-p\">An operation * is <strong>commutative</strong> if a*b = b*a for all a, b in the set.</p>\n\n<h3 class=\"learn-subheading\">3. Associativity</h3>\n<p class=\"learn-p\">An operation * is <strong>associative</strong> if (a*b)*c = a*(b*c) for all a, b, c in the set.</p>\n\n<h3 class=\"learn-subheading\">4. Identity Element</h3>\n<p class=\"learn-p\">An element e is the <strong>identity</strong> for * if a*e = e*a = a for all a.</p>\n\n<h3 class=\"learn-subheading\">5. Inverse Element</h3>\n<p class=\"learn-p\">For an element a, its <strong>inverse</strong> a&#8315;&sup1; satisfies a*a&#8315;&sup1; = a&#8315;&sup1;*a = e (the identity).</p>\n\n<h3 class=\"learn-subheading\">6. Worked Examples</h3>\n<p class=\"learn-p\"><strong>Example 1:</strong> If a*b = a+b&minus;ab, find 3*4.<br>3*4 = 3+4&minus;(3)(4) = 7&minus;12 = <strong>&minus;5</strong>.</p>\n<p class=\"learn-p\"><strong>Example 2:</strong> If a*b = 2a+b, find the identity element e such that a*e=a.<br>2a+e=a &rArr; e=a&minus;2a=&minus;a. Since this depends on a (not constant), this operation has <strong>no identity element</strong>.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> To check commutativity, always test with specific numbers in both orders (a*b vs b*a) — if they differ for even one example, the operation is NOT commutative.\n</div>\n",
  "questions": [
    {
      "q": "If a*b = a+b-ab, find 3*4.",
      "o": [
        "-5",
        "7",
        "-12",
        "19"
      ],
      "a": 0,
      "e": "3*4=3+4−(3)(4)=7−12=−5.",
      "h": "Substitute into the given operation formula.",
      "yr": "SS3"
    },
    {
      "q": "What does it mean for a set to be 'closed' under an operation?",
      "o": [
        "Combining any two elements of the set always produces a result still in the set",
        "The operation always gives zero",
        "The set has no elements",
        "The operation is always commutative"
      ],
      "a": 0,
      "e": "Closure means the result of the operation on any two set members remains within the same set.",
      "h": "Think about the result 'staying inside' the original set.",
      "yr": "SS3"
    },
    {
      "q": "An operation * is commutative if:",
      "o": [
        "a*b = b*a for all a, b",
        "a*b = a for all a, b",
        "(a*b)*c = a*(b*c)",
        "a*e = a for an identity e"
      ],
      "a": 0,
      "e": "Commutativity means the order of operation doesn't matter: a*b=b*a.",
      "h": "Think about whether swapping the order changes the result.",
      "yr": "SS3"
    },
    {
      "q": "An operation * is associative if:",
      "o": [
        "(a*b)*c = a*(b*c) for all a, b, c",
        "a*b = b*a",
        "a*e = a",
        "a*a⁻¹ = e"
      ],
      "a": 0,
      "e": "Associativity means grouping doesn't matter: (a*b)*c=a*(b*c).",
      "h": "Think about whether the grouping of operations changes the result.",
      "yr": "SS3"
    },
    {
      "q": "What is the identity element for ordinary addition on real numbers?",
      "o": [
        "0",
        "1",
        "-1",
        "Undefined"
      ],
      "a": 0,
      "e": "a+0=a for any real number a, so 0 is the identity for addition.",
      "h": "Think about what number, when added, leaves a number unchanged.",
      "yr": "SS3"
    },
    {
      "q": "What is the identity element for ordinary multiplication on real numbers?",
      "o": [
        "1",
        "0",
        "-1",
        "Undefined"
      ],
      "a": 0,
      "e": "a×1=a for any real number a, so 1 is the identity for multiplication.",
      "h": "Think about what number, when multiplied, leaves a number unchanged.",
      "yr": "SS3"
    },
    {
      "q": "If a*b = 2a+b, find the identity element e. What do you conclude?",
      "o": [
        "No identity element exists (since e would depend on a)",
        "e = 0",
        "e = 1",
        "e = 2"
      ],
      "a": 0,
      "e": "a*e=a → 2a+e=a → e=−a, which depends on a rather than being constant, so no identity element exists.",
      "h": "Set a*e=a and solve for e; check if it's a constant.",
      "yr": "SS3"
    },
    {
      "q": "Is the operation a*b = a-b commutative on the real numbers?",
      "o": [
        "No, since a-b ≠ b-a in general",
        "Yes, always commutative",
        "Only when a=b",
        "Only when a and b are both positive"
      ],
      "a": 0,
      "e": "Testing with a=5, b=3: 5*3=2, but 3*5=−2. Since these differ, subtraction is not commutative.",
      "h": "Test with specific numbers in both orders.",
      "yr": "SS3"
    },
    {
      "q": "Is the set of positive integers closed under subtraction?",
      "o": [
        "No, since subtracting a larger from a smaller positive integer gives a negative result",
        "Yes, always closed",
        "Only for even integers",
        "Only when both numbers are equal"
      ],
      "a": 0,
      "e": "E.g., 3−5=−2, which is not a positive integer, so the set is not closed under subtraction.",
      "h": "Find a counterexample where the result falls outside the set.",
      "yr": "SS3"
    },
    {
      "q": "If a*b = ab+1, find 2*3.",
      "o": [
        "7",
        "6",
        "5",
        "9"
      ],
      "a": 0,
      "e": "2*3=(2)(3)+1=6+1=7.",
      "h": "Substitute into the operation formula.",
      "yr": "SS3"
    },
    {
      "q": "Using a*b = ab+1, find 3*2 and compare with 2*3 to check commutativity.",
      "o": [
        "3*2=7, same as 2*3, so commutative",
        "3*2=6, different from 2*3",
        "3*2=5, different from 2*3",
        "Cannot be determined"
      ],
      "a": 0,
      "e": "3*2=(3)(2)+1=7, equal to 2*3=7, confirming this operation is commutative (since multiplication itself is commutative).",
      "h": "Compute 3*2 using the same formula and compare.",
      "yr": "SS3"
    },
    {
      "q": "What is the inverse of 5 under ordinary addition (identity=0)?",
      "o": [
        "-5",
        "1/5",
        "5",
        "0"
      ],
      "a": 0,
      "e": "5+(−5)=0 (the identity), so the inverse of 5 under addition is −5.",
      "h": "Find the number that, when added to 5, gives the identity (0).",
      "yr": "SS3"
    },
    {
      "q": "What is the inverse of 5 under ordinary multiplication (identity=1)?",
      "o": [
        "1/5",
        "-5",
        "5",
        "0"
      ],
      "a": 0,
      "e": "5×(1/5)=1 (the identity), so the inverse of 5 under multiplication is 1/5.",
      "h": "Find the number that, when multiplied by 5, gives the identity (1).",
      "yr": "SS3"
    },
    {
      "q": "If a*b = a+b+2, find the identity element e.",
      "o": [
        "-2",
        "0",
        "2",
        "1"
      ],
      "a": 0,
      "e": "a*e=a → a+e+2=a → e=−2.",
      "h": "Set a*e=a and solve for the constant e.",
      "yr": "SS3"
    },
    {
      "q": "Using the identity e=-2 from a*b=a+b+2, find the inverse of 3.",
      "o": [
        "-7",
        "-5",
        "7",
        "5"
      ],
      "a": 0,
      "e": "3*x=−2 (the identity) → 3+x+2=−2 → x=−7.",
      "h": "Set 3*x equal to the identity element and solve for x.",
      "yr": "SS3"
    },
    {
      "q": "Is matrix multiplication (for square matrices) commutative in general?",
      "o": [
        "No, AB ≠ BA in general for matrices",
        "Yes, always commutative",
        "Only for 1×1 matrices",
        "Only for identity matrices"
      ],
      "a": 0,
      "e": "Matrix multiplication is generally NOT commutative — the order of multiplication matters.",
      "h": "Recall that matrix multiplication order affects the result.",
      "yr": "SS3"
    },
    {
      "q": "If a*b = a² + b², is this operation commutative?",
      "o": [
        "Yes, since a²+b²=b²+a²",
        "No, never commutative",
        "Only when a=0",
        "Only when b=0"
      ],
      "a": 0,
      "e": "Since addition is commutative, a²+b²=b²+a² always, so this operation is commutative.",
      "h": "Check if swapping a and b changes the result.",
      "yr": "SS3"
    },
    {
      "q": "If a*b = a² + b², is this operation associative? Test with a=1,b=2,c=3.",
      "o": [
        "No, (1*2)*3 ≠ 1*(2*3) in general",
        "Yes, always associative",
        "Only for a=b=c",
        "Cannot be tested"
      ],
      "a": 0,
      "e": "(1*2)*3=(1+4)*3=5²+3²=25+9=34. 1*(2*3)=1*(4+9)=1²+13²=1+169=170. Since 34≠170, the operation is not associative.",
      "h": "Compute both groupings with specific numbers and compare.",
      "yr": "SS3"
    },
    {
      "q": "Why are the properties of binary operations (closure, commutativity, etc.) important in mathematics?",
      "o": [
        "They form the foundation for understanding algebraic structures like groups, rings, and fields",
        "They only apply to addition and subtraction",
        "They have no real mathematical significance",
        "They only matter in computer science"
      ],
      "a": 0,
      "e": "These properties define algebraic structures (groups, rings, fields) that underpin much of abstract algebra and have wide applications in mathematics and science.",
      "h": "Think about how these properties classify different types of mathematical systems.",
      "yr": "SS3"
    },
    {
      "q": "A set has an operation where every element has an inverse, the operation is associative, and there's an identity element. What algebraic structure might this represent?",
      "o": [
        "A group",
        "A simple set with no structure",
        "An unordered list",
        "A single number"
      ],
      "a": 0,
      "e": "A set with an associative operation, identity element, and inverses for every element forms what is called a 'group' in abstract algebra.",
      "h": "This combination of properties defines a specific named algebraic structure.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Arithmetic of Finance",
  "topicCode": "SS3-MTH-10",
  "module": "Commercial Mathematics",
  "term": "First Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic covers <span class=\"learn-keyword\">simple interest</span>, <span class=\"learn-keyword\">compound interest</span>, <span class=\"learn-keyword\">annuities</span>, <span class=\"learn-keyword\">depreciation</span>, and <span class=\"learn-keyword\">amortization</span> &mdash; essential tools for personal and business finance.\n</div>\n\n<h3 class=\"learn-subheading\">1. Simple Interest</h3>\n<p class=\"learn-p\"><strong>I = PRT/100</strong>, where P=Principal, R=Rate(%), T=Time(years).</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the simple interest on &#8358;50,000 at 8% per annum for 3 years.<br>I = (50000&times;8&times;3)/100 = <strong>&#8358;12,000</strong>.</p>\n\n<h3 class=\"learn-subheading\">2. Compound Interest</h3>\n<p class=\"learn-p\"><strong>A = P(1+R/100)<sup>T</sup></strong>, where A is the final amount.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the compound interest on &#8358;20,000 at 10% per annum for 2 years.<br>A = 20000(1.1)&sup2; = 20000(1.21) = &#8358;24,200. Interest = 24200&minus;20000 = <strong>&#8358;4,200</strong>.</p>\n\n<h3 class=\"learn-subheading\">3. Depreciation</h3>\n<p class=\"learn-p\"><strong>Value after depreciation = P(1&minus;R/100)<sup>T</sup></strong></p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> A car worth &#8358;2,000,000 depreciates at 15% per annum. Find its value after 2 years.<br>Value = 2000000(0.85)&sup2; = 2000000(0.7225) = <strong>&#8358;1,445,000</strong>.</p>\n\n<h3 class=\"learn-subheading\">4. Annuities</h3>\n<p class=\"learn-p\">An annuity is a series of equal payments made at regular intervals. It's used in savings plans, pensions, and loan repayments (amortization).</p>\n\n<h3 class=\"learn-subheading\">5. Amortization</h3>\n<p class=\"learn-p\">Amortization is the process of paying off a loan through regular installments that cover both principal and interest.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Compound interest ALWAYS exceeds simple interest for the same principal, rate, and time (beyond year 1) — use this to sanity-check your answers.\n</div>\n",
  "questions": [
    {
      "q": "Find the simple interest on ₦50,000 at 8% per annum for 3 years.",
      "o": [
        "₦12,000",
        "₦4,000",
        "₦15,000",
        "₦8,000"
      ],
      "a": 0,
      "e": "I=(50000×8×3)/100=₦12,000.",
      "h": "Use I=PRT/100.",
      "yr": "SS3"
    },
    {
      "q": "Find the compound interest on ₦20,000 at 10% per annum for 2 years.",
      "o": [
        "₦4,200",
        "₦4,000",
        "₦2,000",
        "₦2,420"
      ],
      "a": 0,
      "e": "A=20000(1.1)²=24200. Interest=24200−20000=₦4,200.",
      "h": "Use A=P(1+R/100)^T, then subtract the principal.",
      "yr": "SS3"
    },
    {
      "q": "A car worth ₦2,000,000 depreciates at 15% per annum. Find its value after 2 years.",
      "o": [
        "₦1,445,000",
        "₦1,700,000",
        "₦1,500,000",
        "₦1,300,000"
      ],
      "a": 0,
      "e": "Value=2000000(0.85)²=2000000(0.7225)=₦1,445,000.",
      "h": "Use Value=P(1−R/100)^T.",
      "yr": "SS3"
    },
    {
      "q": "What is the formula for simple interest?",
      "o": [
        "I=PRT/100",
        "I=P(1+R/100)^T",
        "I=P(1-R/100)^T",
        "I=PR/T"
      ],
      "a": 0,
      "e": "Simple interest: I=PRT/100, where P=principal, R=rate(%), T=time(years).",
      "h": "Simple interest grows linearly with time.",
      "yr": "SS3"
    },
    {
      "q": "What is the formula for compound amount?",
      "o": [
        "A=P(1+R/100)^T",
        "A=PRT/100",
        "A=P(1-R/100)^T",
        "A=P+R+T"
      ],
      "a": 0,
      "e": "Compound amount: A=P(1+R/100)^T, compounding annually.",
      "h": "Compound interest grows exponentially (power of T).",
      "yr": "SS3"
    },
    {
      "q": "Find the simple interest on ₦80,000 at 5% per annum for 4 years.",
      "o": [
        "₦16,000",
        "₦20,000",
        "₦4,000",
        "₦8,000"
      ],
      "a": 0,
      "e": "I=(80000×5×4)/100=₦16,000.",
      "h": "Apply I=PRT/100.",
      "yr": "SS3"
    },
    {
      "q": "Find the amount (principal+interest) after simple interest on ₦30,000 at 6% for 5 years.",
      "o": [
        "₦39,000",
        "₦9,000",
        "₦36,000",
        "₦33,000"
      ],
      "a": 0,
      "e": "I=(30000×6×5)/100=9000. Amount=30000+9000=₦39,000.",
      "h": "Add the simple interest to the principal to get the total amount.",
      "yr": "SS3"
    },
    {
      "q": "Find the compound amount on ₦15,000 at 20% per annum for 2 years.",
      "o": [
        "₦21,600",
        "₦18,000",
        "₦6,000",
        "₦21,000"
      ],
      "a": 0,
      "e": "A=15000(1.2)²=15000(1.44)=₦21,600.",
      "h": "Apply A=P(1+R/100)^T.",
      "yr": "SS3"
    },
    {
      "q": "What is an annuity?",
      "o": [
        "A series of equal payments made at regular intervals",
        "A one-time lump sum payment",
        "A type of loan with no interest",
        "A tax on savings"
      ],
      "a": 0,
      "e": "An annuity involves equal, regular payments — common in pensions, savings plans, and loan repayments.",
      "h": "Think about recurring, equal payments over time.",
      "yr": "SS3"
    },
    {
      "q": "What is amortization?",
      "o": [
        "Paying off a loan through regular installments covering both principal and interest",
        "A type of simple interest calculation",
        "The process of a currency losing value",
        "A tax deduction method"
      ],
      "a": 0,
      "e": "Amortization spreads loan repayment over time through structured installments, each covering part principal and part interest.",
      "h": "Think about how a mortgage or car loan is paid off.",
      "yr": "SS3"
    },
    {
      "q": "A machine worth ₦500,000 depreciates at 10% per annum. Find its value after 3 years.",
      "o": [
        "₦364,500",
        "₦350,000",
        "₦400,000",
        "₦450,000"
      ],
      "a": 0,
      "e": "Value=500000(0.9)³=500000(0.729)=₦364,500.",
      "h": "Apply Value=P(1−R/100)^T with T=3.",
      "yr": "SS3"
    },
    {
      "q": "Find the principal that yields a simple interest of ₦6,000 at 4% per annum over 5 years.",
      "o": [
        "₦30,000",
        "₦24,000",
        "₦15,000",
        "₦20,000"
      ],
      "a": 0,
      "e": "6000=P(4)(5)/100=0.2P. P=6000/0.2=₦30,000.",
      "h": "Rearrange I=PRT/100 to solve for P.",
      "yr": "SS3"
    },
    {
      "q": "Find the rate of interest if ₦10,000 earns ₦2,400 simple interest in 4 years.",
      "o": [
        "6%",
        "5%",
        "7%",
        "8%"
      ],
      "a": 0,
      "e": "2400=(10000×R×4)/100=400R. R=2400/400=6%.",
      "h": "Rearrange I=PRT/100 to solve for R.",
      "yr": "SS3"
    },
    {
      "q": "Compare simple interest and compound interest on the same principal, rate, and time (T>1). Which is generally larger?",
      "o": [
        "Compound interest, since interest earns interest over time",
        "Simple interest, since it is calculated more frequently",
        "They are always equal",
        "It depends only on the principal amount"
      ],
      "a": 0,
      "e": "Compound interest grows faster because each period's interest is calculated on the accumulated amount (principal+previous interest), unlike simple interest.",
      "h": "Think about how compound interest 'compounds' on previous interest.",
      "yr": "SS3"
    },
    {
      "q": "Find the compound interest (not amount) on ₦40,000 at 5% per annum for 2 years.",
      "o": [
        "₦4,100",
        "₦4,000",
        "₦2,000",
        "₦8,000"
      ],
      "a": 0,
      "e": "A=40000(1.05)²=40000(1.1025)=44100. Interest=44100−40000=₦4,100.",
      "h": "Find the compound amount first, then subtract the principal.",
      "yr": "SS3"
    },
    {
      "q": "A loan of ₦100,000 is to be repaid with simple interest at 12% per annum over 2.5 years. Find the total amount to be repaid.",
      "o": [
        "₦130,000",
        "₦125,000",
        "₦112,000",
        "₦124,000"
      ],
      "a": 0,
      "e": "I=(100000×12×2.5)/100=30000. Total=100000+30000=₦130,000.",
      "h": "Calculate the interest first, then add to the principal.",
      "yr": "SS3"
    },
    {
      "q": "A business asset depreciates from ₦800,000 to ₦648,000 in one year. Find the rate of depreciation.",
      "o": [
        "19%",
        "15%",
        "20%",
        "25%"
      ],
      "a": 0,
      "e": "Depreciation=800000−648000=152000. Rate=(152000/800000)×100=19%.",
      "h": "Find the depreciation amount, then express as a percentage of the original value.",
      "yr": "SS3"
    },
    {
      "q": "Why might a business prefer to know the amortization schedule of a loan?",
      "o": [
        "To understand how much of each payment goes toward principal versus interest over time",
        "Amortization schedules are not useful for businesses",
        "It only matters for very large loans",
        "It replaces the need for interest calculations"
      ],
      "a": 0,
      "e": "An amortization schedule helps businesses plan cash flow by showing exactly how each payment is split between reducing the principal and covering interest.",
      "h": "Think about why businesses need to track loan repayment details.",
      "yr": "SS3"
    },
    {
      "q": "Find the compound amount on ₦25,000 at 8% per annum for 3 years (approx, using (1.08)³≈1.2597).",
      "o": [
        "₦31,492.5",
        "₦30,000",
        "₦27,000",
        "₦33,000"
      ],
      "a": 0,
      "e": "A=25000×1.2597≈₦31,492.5.",
      "h": "Multiply the principal by (1+rate)^time.",
      "yr": "SS3"
    },
    {
      "q": "Why is compound interest considered more realistic for long-term savings and loans than simple interest?",
      "o": [
        "Because real financial institutions typically compound interest periodically, reflecting how money actually grows or accrues debt over time",
        "Simple interest is always used in practice",
        "Compound interest is purely theoretical",
        "There is no practical difference between them"
      ],
      "a": 0,
      "e": "Most real-world banking, savings, and loan products use compound interest (compounded annually, monthly, etc.), making it the more realistic model for financial planning.",
      "h": "Think about how actual banks and financial institutions calculate interest.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Financial Mathematics",
  "topicCode": "SS3-MTH-11",
  "module": "Commercial Mathematics",
  "term": "Second Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic introduces <span class=\"learn-keyword\">bonds, debentures, shares</span>, <span class=\"learn-keyword\">income tax</span>, and <span class=\"learn-keyword\">value-added tax (VAT)</span>, applying logarithms where needed for complex interest calculations.\n</div>\n\n<h3 class=\"learn-subheading\">1. Shares and Dividends</h3>\n<p class=\"learn-p\">A <strong>share</strong> represents partial ownership in a company. A <strong>dividend</strong> is the portion of profit paid to shareholders, usually per share or as a percentage.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> A man owns 500 shares of &#8358;10 each, paying 8% dividend. Find his total dividend.<br>Total share value = 500 &times; 10 = &#8358;5,000. Dividend = 8% of 5,000 = <strong>&#8358;400</strong>.</p>\n\n<h3 class=\"learn-subheading\">2. Bonds and Debentures</h3>\n<p class=\"learn-p\">A <strong>bond</strong> or <strong>debenture</strong> is a loan made to a company or government, repaid with interest over time.</p>\n\n<h3 class=\"learn-subheading\">3. Income Tax</h3>\n<p class=\"learn-p\">Tax is usually calculated on taxable income after allowances, often using a percentage rate (or graduated rates).</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> A worker earns &#8358;300,000 annually with a tax-free allowance of &#8358;50,000. If tax is 10% on the taxable income, find the tax paid.<br>Taxable income = 300000&minus;50000 = 250,000. Tax = 10% of 250,000 = <strong>&#8358;25,000</strong>.</p>\n\n<h3 class=\"learn-subheading\">4. Value-Added Tax (VAT)</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> An item costs &#8358;8,000 before VAT. If VAT is 7.5%, find the price including VAT.<br>VAT = 7.5% of 8000 = 600. Price with VAT = 8000+600 = <strong>&#8358;8,600</strong>.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Always distinguish between tax-free allowance (subtracted BEFORE calculating tax) and tax rate (applied AFTER subtracting allowances).\n</div>\n",
  "questions": [
    {
      "q": "A man owns 500 shares of ₦10 each, paying 8% dividend. Find his total dividend.",
      "o": [
        "₦400",
        "₦500",
        "₦40",
        "₦4,000"
      ],
      "a": 0,
      "e": "Total share value=500×10=5000. Dividend=8% of 5000=₦400.",
      "h": "Find the total share value first, then apply the dividend percentage.",
      "yr": "SS3"
    },
    {
      "q": "A worker earns ₦300,000 annually with a tax-free allowance of ₦50,000, taxed at 10%. Find the tax paid.",
      "o": [
        "₦25,000",
        "₦30,000",
        "₦5,000",
        "₦35,000"
      ],
      "a": 0,
      "e": "Taxable income=300000−50000=250000. Tax=10% of 250000=₦25,000.",
      "h": "Subtract the allowance first, then apply the tax rate.",
      "yr": "SS3"
    },
    {
      "q": "An item costs ₦8,000 before VAT. If VAT is 7.5%, find the price including VAT.",
      "o": [
        "₦8,600",
        "₦8,500",
        "₦8,750",
        "₦9,000"
      ],
      "a": 0,
      "e": "VAT=7.5% of 8000=600. Price with VAT=8000+600=₦8,600.",
      "h": "Calculate the VAT amount, then add to the original price.",
      "yr": "SS3"
    },
    {
      "q": "What is a share in the context of company finance?",
      "o": [
        "A unit representing partial ownership in a company",
        "A type of tax",
        "A government bond",
        "A loan to an individual"
      ],
      "a": 0,
      "e": "A share represents a fractional ownership stake in a company.",
      "h": "Think about what it means to 'own a piece' of a company.",
      "yr": "SS3"
    },
    {
      "q": "What is a dividend?",
      "o": [
        "The portion of company profit paid to shareholders",
        "A type of tax",
        "The price of a share",
        "A government bond"
      ],
      "a": 0,
      "e": "A dividend is the share of profit distributed to shareholders, often as a percentage of share value.",
      "h": "Dividends are profit-sharing payments to shareholders.",
      "yr": "SS3"
    },
    {
      "q": "A woman owns 200 shares of ₦25 each, paying 6% dividend. Find her total dividend.",
      "o": [
        "₦300",
        "₦1,200",
        "₦200",
        "₦500"
      ],
      "a": 0,
      "e": "Total share value=200×25=5000. Dividend=6% of 5000=₦300.",
      "h": "Find total share value, then apply the dividend rate.",
      "yr": "SS3"
    },
    {
      "q": "What is a bond or debenture?",
      "o": [
        "A loan made to a company or government, repaid with interest over time",
        "A share of company ownership",
        "A type of tax",
        "A savings account"
      ],
      "a": 0,
      "e": "Bonds/debentures represent borrowed money that the issuer repays with interest over a specified period.",
      "h": "Think of bonds as the buyer lending money to the issuer.",
      "yr": "SS3"
    },
    {
      "q": "Find the tax paid by a worker earning ₦500,000 with a ₦100,000 allowance, taxed at 15%.",
      "o": [
        "₦60,000",
        "₦75,000",
        "₦50,000",
        "₦40,000"
      ],
      "a": 0,
      "e": "Taxable income=500000−100000=400000. Tax=15% of 400000=₦60,000.",
      "h": "Subtract the allowance before applying the tax rate.",
      "yr": "SS3"
    },
    {
      "q": "An item costs ₦12,000 before VAT at 7.5%. Find the VAT amount only.",
      "o": [
        "₦900",
        "₦1,200",
        "₦750",
        "₦1,000"
      ],
      "a": 0,
      "e": "VAT=7.5% of 12000=₦900.",
      "h": "Calculate 7.5% of the pre-VAT price.",
      "yr": "SS3"
    },
    {
      "q": "If the total price of an item including 7.5% VAT is ₦10,750, find the price before VAT.",
      "o": [
        "₦10,000",
        "₦9,500",
        "₦10,500",
        "₦9,950"
      ],
      "a": 0,
      "e": "Let price=P. P(1.075)=10750. P=10750/1.075=₦10,000.",
      "h": "Divide the VAT-inclusive price by (1+VAT rate).",
      "yr": "SS3"
    },
    {
      "q": "A man earns ₦1,000,000 with a ₦200,000 allowance. If the tax rate is 20%, find his net income after tax.",
      "o": [
        "₦840,000",
        "₦800,000",
        "₦960,000",
        "₦920,000"
      ],
      "a": 0,
      "e": "Taxable income=1000000−200000=800000. Tax=20% of 800000=160000. Net income=1000000−160000=₦840,000.",
      "h": "Find the tax amount, then subtract from the gross income.",
      "yr": "SS3"
    },
    {
      "q": "What is the key difference between a shareholder and a bondholder?",
      "o": [
        "A shareholder owns part of the company (equity); a bondholder has lent money to the company (debt)",
        "They are the same thing",
        "Bondholders own the company; shareholders lend money",
        "Neither has any claim on the company"
      ],
      "a": 0,
      "e": "Shareholders hold equity (ownership), while bondholders hold debt (a loan they expect to be repaid with interest).",
      "h": "Think about ownership (equity) versus lending (debt).",
      "yr": "SS3"
    },
    {
      "q": "A trader buys goods worth ₦40,000 and sells them with 7.5% VAT added. Find the selling price.",
      "o": [
        "₦43,000",
        "₦42,500",
        "₦44,000",
        "₦43,500"
      ],
      "a": 0,
      "e": "VAT=7.5% of 40000=3000. Selling price=40000+3000=₦43,000.",
      "h": "Calculate VAT on the cost price, then add to find the selling price.",
      "yr": "SS3"
    },
    {
      "q": "Find the total dividend for 1,000 shares of ₦5 each at a 12% dividend rate.",
      "o": [
        "₦600",
        "₦500",
        "₦1,200",
        "₦60"
      ],
      "a": 0,
      "e": "Total share value=1000×5=5000. Dividend=12% of 5000=₦600.",
      "h": "Multiply shares by value per share, then apply the dividend rate.",
      "yr": "SS3"
    },
    {
      "q": "Why might a government issue bonds to the public?",
      "o": [
        "To raise funds for projects by borrowing from investors, repaying with interest over time",
        "Bonds are only issued by private companies",
        "To avoid collecting taxes",
        "Bonds have no real financial purpose"
      ],
      "a": 0,
      "e": "Governments issue bonds to raise capital for public projects, essentially borrowing from investors and committing to repay with interest.",
      "h": "Think about how governments fund large projects without immediately raising taxes.",
      "yr": "SS3"
    },
    {
      "q": "A worker's taxable income is ₦600,000, taxed progressively: 10% on the first ₦300,000 and 15% on the remaining amount. Find the total tax.",
      "o": [
        "₦75,000",
        "₦90,000",
        "₦60,000",
        "₦45,000"
      ],
      "a": 0,
      "e": "Tax on first 300000=10%×300000=30000. Tax on remaining 300000=15%×300000=45000. Total=30000+45000=₦75,000.",
      "h": "Apply each tax rate to its respective income bracket, then sum.",
      "yr": "SS3"
    },
    {
      "q": "Find the VAT-inclusive price of goods costing ₦15,000 before a 7.5% VAT.",
      "o": [
        "₦16,125",
        "₦16,000",
        "₦15,750",
        "₦16,500"
      ],
      "a": 0,
      "e": "VAT=7.5% of 15000=1125. Total=15000+1125=₦16,125.",
      "h": "Calculate the VAT, then add to the original price.",
      "yr": "SS3"
    },
    {
      "q": "What does 'taxable income' mean?",
      "o": [
        "The portion of income remaining after allowances/deductions, on which tax is calculated",
        "The total gross income before any deductions",
        "The tax amount itself",
        "The amount of VAT paid"
      ],
      "a": 0,
      "e": "Taxable income is what remains after subtracting allowances and deductions from gross income — this is the base on which tax rates are applied.",
      "h": "Think about what income is actually left to be taxed after allowances.",
      "yr": "SS3"
    },
    {
      "q": "Why is understanding VAT important for both businesses and consumers?",
      "o": [
        "Businesses must collect and remit VAT; consumers pay it as part of the purchase price, affecting overall cost",
        "VAT only affects businesses",
        "VAT is not relevant to everyday purchases",
        "VAT replaces all other forms of taxation"
      ],
      "a": 0,
      "e": "VAT is a consumption tax added to most goods and services; businesses must correctly calculate, collect, and remit it, while consumers need to understand it affects final prices.",
      "h": "Think about who pays VAT and who is responsible for collecting it.",
      "yr": "SS3"
    },
    {
      "q": "A ₦200,000 bond pays 5% interest per annum, paid in two equal instalments each year. Find the interest paid per instalment.",
      "o": [
        "₦5,000",
        "₦10,000",
        "₦2,500",
        "₦20,000"
      ],
      "a": 0,
      "e": "Annual interest=5% of 200000=₦10,000. Split into two equal instalments: 10000÷2=₦5,000 per instalment.",
      "h": "Find the full annual interest first, then divide by 2 for each instalment.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Coordinate Geometry of a Straight Line",
  "topicCode": "SS3-MTH-12",
  "module": "Coordinate Geometry",
  "term": "Second Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic reviews and extends <span class=\"learn-keyword\">coordinate geometry</span>: the Cartesian plane, distances, midpoints, gradients, and intercepts, with real-life applications.\n</div>\n\n<h3 class=\"learn-subheading\">1. Distance Between Two Points</h3>\n<p class=\"learn-p\"><strong>d = &radic;[(x&#8322;&minus;x&#8321;)&sup2; + (y&#8322;&minus;y&#8321;)&sup2;]</strong></p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the distance between (1,2) and (4,6).<br>d = &radic;[(4&minus;1)&sup2;+(6&minus;2)&sup2;] = &radic;[9+16] = &radic;25 = <strong>5</strong>.</p>\n\n<h3 class=\"learn-subheading\">2. Midpoint of a Line</h3>\n<p class=\"learn-p\"><strong>Midpoint = ((x&#8321;+x&#8322;)/2, (y&#8321;+y&#8322;)/2)</strong></p>\n\n<h3 class=\"learn-subheading\">3. Gradient and Equation of a Line</h3>\n<p class=\"learn-p\"><strong>m = (y&#8322;&minus;y&#8321;)/(x&#8322;&minus;x&#8321;)</strong>, and the equation is y=mx+c.</p>\n\n<h3 class=\"learn-subheading\">4. Application in Everyday Life</h3>\n<p class=\"learn-p\">Coordinate geometry is used in GPS navigation, computer graphics, engineering designs, and urban planning to represent and calculate positions and distances.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Always double-check your subtraction order when calculating gradient or distance — swapping x and y values, or using (x&#8321;&minus;x&#8322;) inconsistently with (y&#8322;&minus;y&#8321;), is a common error.\n</div>\n",
  "questions": [
    {
      "q": "Find the distance between (1,2) and (4,6).",
      "o": [
        "5",
        "7",
        "4",
        "6"
      ],
      "a": 0,
      "e": "d=√[(4−1)²+(6−2)²]=√[9+16]=√25=5.",
      "h": "Use d=√[(x₂−x₁)²+(y₂−y₁)²].",
      "yr": "SS3"
    },
    {
      "q": "Find the midpoint of the segment joining (2,3) and (8,9).",
      "o": [
        "(5, 6)",
        "(6, 5)",
        "(4, 6)",
        "(5, 5)"
      ],
      "a": 0,
      "e": "Midpoint=((2+8)/2,(3+9)/2)=(5,6).",
      "h": "Average the x-coordinates and y-coordinates separately.",
      "yr": "SS3"
    },
    {
      "q": "Find the gradient of the line through (2,3) and (6,11).",
      "o": [
        "2",
        "4",
        "1/2",
        "8"
      ],
      "a": 0,
      "e": "m=(11−3)/(6−2)=8/4=2.",
      "h": "Use m=(y₂−y₁)/(x₂−x₁).",
      "yr": "SS3"
    },
    {
      "q": "Find the distance between (0,0) and (6,8).",
      "o": [
        "10",
        "14",
        "8",
        "6"
      ],
      "a": 0,
      "e": "d=√(6²+8²)=√(36+64)=√100=10.",
      "h": "Apply the distance formula with one point at the origin.",
      "yr": "SS3"
    },
    {
      "q": "Find the equation of the line with gradient 3 passing through (0,5).",
      "o": [
        "y=3x+5",
        "y=3x-5",
        "y=5x+3",
        "y=3x"
      ],
      "a": 0,
      "e": "Using y=mx+c with m=3 and y-intercept c=5 (since x=0 gives y=5): y=3x+5.",
      "h": "The point (0,5) directly gives the y-intercept c.",
      "yr": "SS3"
    },
    {
      "q": "Find the midpoint of the segment joining (-2,4) and (6,-2).",
      "o": [
        "(2, 1)",
        "(4, 2)",
        "(1, 2)",
        "(2, 2)"
      ],
      "a": 0,
      "e": "Midpoint=((−2+6)/2,(4+(−2))/2)=(2,1).",
      "h": "Add coordinates, then divide by 2.",
      "yr": "SS3"
    },
    {
      "q": "Find the gradient of the line through (-1,-3) and (3,5).",
      "o": [
        "2",
        "4",
        "1/2",
        "8"
      ],
      "a": 0,
      "e": "m=(5−(−3))/(3−(−1))=8/4=2.",
      "h": "Apply m=(y₂−y₁)/(x₂−x₁), carefully handling negative values.",
      "yr": "SS3"
    },
    {
      "q": "Find the distance between (3,4) and (-3,-4).",
      "o": [
        "10",
        "12",
        "14",
        "8"
      ],
      "a": 0,
      "e": "d=√[(−3−3)²+(−4−4)²]=√[36+64]=√100=10.",
      "h": "Apply the distance formula, carefully computing the differences.",
      "yr": "SS3"
    },
    {
      "q": "If a line passes through (1,1) and (4,10), find its equation.",
      "o": [
        "y=3x-2",
        "y=3x+2",
        "y=2x-1",
        "y=3x"
      ],
      "a": 0,
      "e": "m=(10−1)/(4−1)=9/3=3. Using (1,1): y−1=3(x−1), y=3x−2.",
      "h": "Find the gradient first, then use the point-gradient form.",
      "yr": "SS3"
    },
    {
      "q": "Find the distance between (5,1) and (5,9).",
      "o": [
        "8",
        "10",
        "4",
        "6"
      ],
      "a": 0,
      "e": "Since x-coordinates are equal (vertical line), distance=|9−1|=8.",
      "h": "For a vertical line, distance equals the difference in y-coordinates.",
      "yr": "SS3"
    },
    {
      "q": "Find the midpoint of (10,10) and (0,0).",
      "o": [
        "(5, 5)",
        "(10, 10)",
        "(0, 0)",
        "(5, 10)"
      ],
      "a": 0,
      "e": "Midpoint=((10+0)/2,(10+0)/2)=(5,5).",
      "h": "Average the coordinates.",
      "yr": "SS3"
    },
    {
      "q": "Two points are equidistant from a third point. What geometric feature does this suggest about the third point relative to the two points?",
      "o": [
        "It could be the midpoint, or lie on the perpendicular bisector of the segment joining them",
        "It must always be the midpoint",
        "It cannot be determined",
        "It is always outside the triangle formed"
      ],
      "a": 0,
      "e": "Any point equidistant from two other points lies on the perpendicular bisector of the segment joining them (the midpoint is just one such point, on the line itself).",
      "h": "Think about the locus of points equidistant from two fixed points.",
      "yr": "SS3"
    },
    {
      "q": "Find the gradient of a line parallel to y=4x-7.",
      "o": [
        "4",
        "-7",
        "-4",
        "1/4"
      ],
      "a": 0,
      "e": "Parallel lines share the same gradient: 4.",
      "h": "Parallel lines have identical gradients.",
      "yr": "SS3"
    },
    {
      "q": "Find the gradient of a line perpendicular to y=2x+1.",
      "o": [
        "-1/2",
        "2",
        "-2",
        "1/2"
      ],
      "a": 0,
      "e": "Perpendicular gradients multiply to −1: 2×m=−1, m=−1/2.",
      "h": "Perpendicular gradients are negative reciprocals.",
      "yr": "SS3"
    },
    {
      "q": "How is coordinate geometry applied in GPS navigation?",
      "o": [
        "Positions are represented as coordinates, and distances/directions are calculated using coordinate geometry formulas",
        "GPS does not use coordinate geometry",
        "GPS only uses compass bearings, not coordinates",
        "Coordinate geometry is unrelated to location technology"
      ],
      "a": 0,
      "e": "GPS systems represent locations as coordinate pairs (latitude/longitude, similar to x,y) and use distance and direction formulas from coordinate geometry to calculate routes and positions.",
      "h": "Think about how location data is represented numerically.",
      "yr": "SS3"
    },
    {
      "q": "Find the distance between (-4,2) and (2,2).",
      "o": [
        "6",
        "4",
        "8",
        "2"
      ],
      "a": 0,
      "e": "Since y-coordinates are equal (horizontal line), distance=|2−(−4)|=6.",
      "h": "For a horizontal line, distance equals the difference in x-coordinates.",
      "yr": "SS3"
    },
    {
      "q": "Find the equation of the line through (0,0) with gradient -2.",
      "o": [
        "y=-2x",
        "y=2x",
        "y=-2x+1",
        "x=-2y"
      ],
      "a": 0,
      "e": "Using y=mx+c with c=0 (passes through origin) and m=−2: y=−2x.",
      "h": "A line through the origin has c=0 in y=mx+c.",
      "yr": "SS3"
    },
    {
      "q": "A triangle has vertices (0,0), (4,0), (0,3). Find the length of the hypotenuse (distance between (4,0) and (0,3)).",
      "o": [
        "5",
        "7",
        "6",
        "4"
      ],
      "a": 0,
      "e": "d=√[(0−4)²+(3−0)²]=√[16+9]=√25=5.",
      "h": "Apply the distance formula between the two non-origin vertices.",
      "yr": "SS3"
    },
    {
      "q": "Find the midpoint of a segment with one endpoint at (7,3) and midpoint at (5,5). Find the other endpoint.",
      "o": [
        "(3, 7)",
        "(6, 4)",
        "(2, 2)",
        "(12, 8)"
      ],
      "a": 0,
      "e": "If midpoint=(5,5) and one endpoint=(7,3), then other endpoint=(2×5−7, 2×5−3)=(3,7).",
      "h": "Use the midpoint formula in reverse: other endpoint=2×midpoint−known endpoint.",
      "yr": "SS3"
    },
    {
      "q": "Why is it useful to verify whether three points are collinear (lie on the same line) using gradients?",
      "o": [
        "If the gradient between each pair of points is the same, the points must lie on a single straight line",
        "Gradients cannot be used to check collinearity",
        "Collinearity can only be checked by drawing a graph",
        "It is impossible to determine collinearity mathematically"
      ],
      "a": 0,
      "e": "If the gradient from point A to B equals the gradient from B to C, all three points share the same straight-line direction, confirming they're collinear.",
      "h": "Equal gradients between pairs of points indicate they all lie on the same line.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Construction I",
  "topicCode": "SS3-MTH-13",
  "module": "Geometrical Constructions",
  "term": "Second Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  Geometric <span class=\"learn-keyword\">construction</span> uses only a ruler (straightedge) and compass to create precise geometric figures. This topic covers loci and special circles related to triangles.\n</div>\n\n<h3 class=\"learn-subheading\">1. Locus of Points Equidistant from Two Fixed Points</h3>\n<p class=\"learn-p\">This locus is the <strong>perpendicular bisector</strong> of the line joining the two points.</p>\n\n<h3 class=\"learn-subheading\">2. Locus of Points Equidistant from Two Lines</h3>\n<p class=\"learn-p\">This locus is the <strong>angle bisector</strong> between the two lines.</p>\n\n<h3 class=\"learn-subheading\">3. Locus of Points at a Fixed Distance from a Point</h3>\n<p class=\"learn-p\">This locus is a <strong>circle</strong> centered at that point with the given distance as its radius.</p>\n\n<h3 class=\"learn-subheading\">4. Circumscribed Circle (Circumcircle)</h3>\n<p class=\"learn-p\">The circle passing through all three vertices of a triangle. Its center (circumcenter) is found by constructing the perpendicular bisectors of any two sides &mdash; they meet at the circumcenter.</p>\n\n<h3 class=\"learn-subheading\">5. Inscribed Circle (Incircle)</h3>\n<p class=\"learn-p\">The circle touching all three sides of a triangle from inside. Its center (incenter) is found by constructing the angle bisectors of any two angles &mdash; they meet at the incenter.</p>\n\n<h3 class=\"learn-subheading\">6. Escribed Circle (Excircle)</h3>\n<p class=\"learn-p\">A circle outside the triangle, tangent to one side and the extensions of the other two sides.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Remember: perpendicular bisectors meet at the circumcenter (circle THROUGH vertices); angle bisectors meet at the incenter (circle INSIDE touching sides).\n</div>\n",
  "questions": [
    {
      "q": "What is the locus of points equidistant from two fixed points?",
      "o": [
        "The perpendicular bisector of the line joining the two points",
        "A circle centered at one of the points",
        "The angle bisector between the points",
        "A straight line through both points"
      ],
      "a": 0,
      "e": "Points equidistant from two fixed points form the perpendicular bisector of the segment joining them.",
      "h": "Think about the line of symmetry between two points.",
      "yr": "SS3"
    },
    {
      "q": "What is the locus of points equidistant from two intersecting lines?",
      "o": [
        "The angle bisector of the angle between the lines",
        "A circle centered at the intersection point",
        "A line parallel to one of the lines",
        "The perpendicular bisector of a segment"
      ],
      "a": 0,
      "e": "Points equidistant from two lines lie on the angle bisector of the angle formed between them.",
      "h": "The bisector of an angle represents points equally far from both arms.",
      "yr": "SS3"
    },
    {
      "q": "What is the locus of points at a fixed distance from a given point?",
      "o": [
        "A circle centered at that point, with radius equal to the fixed distance",
        "A straight line",
        "An angle bisector",
        "A perpendicular bisector"
      ],
      "a": 0,
      "e": "All points at a fixed distance from a point form a circle with that point as center.",
      "h": "Think about the definition of a circle.",
      "yr": "SS3"
    },
    {
      "q": "What is the circumscribed circle (circumcircle) of a triangle?",
      "o": [
        "The circle passing through all three vertices of the triangle",
        "The circle touching all three sides from inside",
        "A circle outside the triangle",
        "A circle with the triangle's area"
      ],
      "a": 0,
      "e": "The circumcircle passes exactly through each of the triangle's three vertices.",
      "h": "'Circum-' means 'around' — the circle goes around the vertices.",
      "yr": "SS3"
    },
    {
      "q": "How is the center of a circumscribed circle (circumcenter) found?",
      "o": [
        "By constructing the perpendicular bisectors of any two sides; they meet at the circumcenter",
        "By constructing angle bisectors",
        "By finding the midpoint of one side only",
        "By measuring from a single vertex"
      ],
      "a": 0,
      "e": "The perpendicular bisectors of the sides of a triangle all meet at a single point — the circumcenter.",
      "h": "Perpendicular bisectors of the sides locate the circumcenter.",
      "yr": "SS3"
    },
    {
      "q": "What is the inscribed circle (incircle) of a triangle?",
      "o": [
        "The circle touching all three sides of the triangle from inside",
        "The circle passing through the vertices",
        "A circle outside the triangle",
        "A circle with radius equal to one side"
      ],
      "a": 0,
      "e": "The incircle is tangent to (touches) all three sides of the triangle, staying inside it.",
      "h": "'In-' means 'inside' — the circle sits inside the triangle.",
      "yr": "SS3"
    },
    {
      "q": "How is the center of an inscribed circle (incenter) found?",
      "o": [
        "By constructing the angle bisectors of any two angles; they meet at the incenter",
        "By constructing perpendicular bisectors of the sides",
        "By finding the centroid only",
        "By measuring from one side only"
      ],
      "a": 0,
      "e": "The angle bisectors of a triangle's three angles all meet at a single point — the incenter.",
      "h": "Angle bisectors of the triangle's angles locate the incenter.",
      "yr": "SS3"
    },
    {
      "q": "What is an escribed circle (excircle) of a triangle?",
      "o": [
        "A circle outside the triangle, tangent to one side and the extensions of the other two sides",
        "A circle inside the triangle",
        "The circle through all vertices",
        "A circle with no relation to the triangle"
      ],
      "a": 0,
      "e": "An excircle lies outside the triangle, touching one side directly and the extended lines of the other two sides.",
      "h": "'Ex-' means 'outside' — this circle sits outside the triangle.",
      "yr": "SS3"
    },
    {
      "q": "How many perpendicular bisectors are needed (minimum) to locate the circumcenter of a triangle?",
      "o": [
        "2 (their intersection gives the circumcenter)",
        "1",
        "3, all are required",
        "None are needed"
      ],
      "a": 0,
      "e": "Since all three perpendicular bisectors meet at one point, constructing just 2 is enough to find that intersection (circumcenter).",
      "h": "Two lines are enough to determine a unique intersection point.",
      "yr": "SS3"
    },
    {
      "q": "What tools are traditionally used for geometric constructions?",
      "o": [
        "Ruler (straightedge) and compass only",
        "Protractor and calculator",
        "Ruler and protractor",
        "Compass and calculator"
      ],
      "a": 0,
      "e": "Classical geometric construction uses only an unmarked straightedge and a compass — no protractor or calculator.",
      "h": "Think about the traditional, minimal toolset for precise geometric drawing.",
      "yr": "SS3"
    },
    {
      "q": "What is the perpendicular bisector of a line segment?",
      "o": [
        "A line that crosses the segment at its midpoint at a 90° angle",
        "Any line crossing the segment",
        "A line parallel to the segment",
        "A line through one endpoint only"
      ],
      "a": 0,
      "e": "The perpendicular bisector passes through the segment's midpoint and is perpendicular (90°) to it.",
      "h": "It must satisfy both conditions: perpendicular AND passing through the midpoint.",
      "yr": "SS3"
    },
    {
      "q": "If a point lies on the perpendicular bisector of segment AB, what can be concluded?",
      "o": [
        "The point is equidistant from A and B",
        "The point is always the midpoint of AB",
        "The point lies on segment AB",
        "The point is closer to A than B"
      ],
      "a": 0,
      "e": "Every point on the perpendicular bisector of AB is equidistant from A and B — this is the defining property.",
      "h": "This is the fundamental property of the perpendicular bisector locus.",
      "yr": "SS3"
    },
    {
      "q": "If a point lies on the bisector of an angle, what can be concluded?",
      "o": [
        "The point is equidistant from both arms (lines) forming the angle",
        "The point is always the vertex of the angle",
        "The point lies exactly on one arm",
        "The point is twice as far from one arm as the other"
      ],
      "a": 0,
      "e": "Every point on an angle bisector is equidistant from both lines forming the angle — this is the defining property.",
      "h": "This is the fundamental property of the angle bisector locus.",
      "yr": "SS3"
    },
    {
      "q": "Why must constructions use only compass and straightedge (no measuring with a ruler's markings)?",
      "o": [
        "To maintain the classical geometric tradition of constructing figures using only relationships between points, lines, and circles, not direct measurement",
        "It is impossible to construct shapes any other way",
        "Rulers cannot draw straight lines",
        "There is no particular reason, it is arbitrary"
      ],
      "a": 0,
      "e": "Classical construction techniques rely purely on geometric relationships (equal radii, intersections) rather than numerical measurement, preserving mathematical precision and tradition.",
      "h": "Think about the historical and mathematical purpose of compass-and-straightedge construction.",
      "yr": "SS3"
    },
    {
      "q": "A circle is constructed so that it is tangent to (touches) all three sides of a triangle, staying inside it. What is this circle called?",
      "o": [
        "The inscribed circle (incircle)",
        "The circumscribed circle (circumcircle)",
        "An escribed circle (excircle)",
        "A locus circle"
      ],
      "a": 0,
      "e": "Tangent to all three SIDES, staying inside, describes the incircle.",
      "h": "Tangent to sides (not vertices), inside the triangle, points to the incircle.",
      "yr": "SS3"
    },
    {
      "q": "In constructing the locus of points equidistant from a point A and a line l, what shape results?",
      "o": [
        "A parabola (a curved locus, not a simple straight line or circle)",
        "A straight line only",
        "A circle only",
        "A single point"
      ],
      "a": 0,
      "e": "The locus of points equidistant from a fixed point and a fixed line is a parabola — this is actually the geometric definition of a parabola, though it goes beyond basic compass-and-straightedge constructions typically covered at this level.",
      "h": "This combines distance-to-point and distance-to-line conditions, producing a curved locus.",
      "yr": "SS3"
    },
    {
      "q": "How many angle bisectors (minimum) are needed to locate the incenter of a triangle?",
      "o": [
        "2 (their intersection gives the incenter)",
        "1",
        "3, all are required",
        "None are needed"
      ],
      "a": 0,
      "e": "Since all three angle bisectors meet at the incenter, constructing 2 is sufficient to find their intersection.",
      "h": "Two bisectors are enough to determine the unique intersection point.",
      "yr": "SS3"
    },
    {
      "q": "Why is the circumcenter sometimes located outside the triangle (for obtuse triangles)?",
      "o": [
        "Because the perpendicular bisectors of the sides can intersect at a point outside the triangle when one angle exceeds 90°",
        "The circumcenter is always inside every triangle",
        "Obtuse triangles have no circumcenter",
        "The circumcenter only exists for right triangles"
      ],
      "a": 0,
      "e": "For obtuse triangles, the point where the perpendicular bisectors meet falls outside the triangle's boundary, unlike for acute triangles where it's always inside.",
      "h": "Think about how the triangle's shape (acute, right, obtuse) affects where the bisectors intersect.",
      "yr": "SS3"
    },
    {
      "q": "What practical application might the circumcenter concept have in real life?",
      "o": [
        "Finding a central location equidistant from three given points, such as placing a facility equally accessible from three towns",
        "It has no practical application",
        "Only used in abstract mathematics",
        "Used only for measuring angles"
      ],
      "a": 0,
      "e": "The circumcenter represents the unique point equidistant from three given points, useful in planning facilities (schools, hospitals) to be equally accessible from several locations.",
      "h": "Think about situations where equal distance from three fixed points matters.",
      "yr": "SS3"
    },
    {
      "q": "Why is understanding loci important beyond basic geometric constructions?",
      "o": [
        "Loci describe paths or regions satisfying given conditions, forming the basis for more advanced topics like conic sections and coordinate geometry",
        "Loci have no further mathematical significance",
        "Loci only apply to triangles",
        "Loci are only used in construction, never elsewhere in mathematics"
      ],
      "a": 0,
      "e": "The concept of a locus (a set of points satisfying a condition) extends into advanced topics like conic sections (circles, parabolas, ellipses) and coordinate geometry, making it foundational.",
      "h": "Think about how 'set of points satisfying a condition' appears in other areas of mathematics.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Differentiation of Algebraic Functions I",
  "topicCode": "SS3-MTH-14",
  "module": "Calculus",
  "term": "Second Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Differentiation</span> finds the rate of change (gradient) of a function at any point. This topic introduces limits, the first principle of differentiation, and standard derivative rules.\n</div>\n\n<h3 class=\"learn-subheading\">1. The Concept of a Limit</h3>\n<p class=\"learn-p\">A limit describes the value a function approaches as the input approaches some value.</p>\n\n<h3 class=\"learn-subheading\">2. First Principle of Differentiation</h3>\n<p class=\"learn-p\"><strong>f'(x) = lim<sub>h&rarr;0</sub> [f(x+h) &minus; f(x)] &divide; h</strong></p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Differentiate f(x)=x&sup2; from first principles.<br>f(x+h)=(x+h)&sup2;=x&sup2;+2xh+h&sup2;.<br>f(x+h)&minus;f(x) = 2xh+h&sup2;.<br>[f(x+h)&minus;f(x)]/h = 2x+h.<br>As h&rarr;0: f'(x) = <strong>2x</strong>.</p>\n\n<h3 class=\"learn-subheading\">3. Power Rule (Standard Derivative Formula)</h3>\n<p class=\"learn-p\">For f(x) = x<sup>n</sup>: <strong>f'(x) = nx<sup>n&minus;1</sup></strong></p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Differentiate y = 5x&#179; &minus; 3x&sup2; + 7x &minus; 4.<br>dy/dx = 15x&sup2; &minus; 6x + 7.</p>\n\n<h3 class=\"learn-subheading\">4. Derivative of a Constant</h3>\n<p class=\"learn-p\">The derivative of any constant is 0, since a constant doesn't change.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Differentiate term by term: multiply each term's coefficient by its power, then reduce the power by 1 — constants always vanish (become 0).\n</div>\n",
  "questions": [
    {
      "q": "Differentiate f(x)=x² from first principles.",
      "o": [
        "2x",
        "x",
        "2x²",
        "x²"
      ],
      "a": 0,
      "e": "f(x+h)−f(x)=2xh+h². Dividing by h: 2x+h. As h→0: f'(x)=2x.",
      "h": "Expand f(x+h), subtract f(x), divide by h, then let h→0.",
      "yr": "SS3"
    },
    {
      "q": "Differentiate y=5x³-3x²+7x-4.",
      "o": [
        "15x²-6x+7",
        "15x²-6x",
        "5x²-3x+7",
        "15x³-6x+7"
      ],
      "a": 0,
      "e": "Differentiate term by term: d/dx(5x³)=15x², d/dx(-3x²)=-6x, d/dx(7x)=7, d/dx(-4)=0. Sum: 15x²-6x+7.",
      "h": "Apply the power rule to each term; constants vanish.",
      "yr": "SS3"
    },
    {
      "q": "What is the derivative of a constant (e.g., f(x)=7)?",
      "o": [
        "0",
        "7",
        "1",
        "x"
      ],
      "a": 0,
      "e": "Constants don't change, so their rate of change (derivative) is always 0.",
      "h": "A constant function has zero slope everywhere.",
      "yr": "SS3"
    },
    {
      "q": "Differentiate f(x)=x⁴.",
      "o": [
        "4x³",
        "x³",
        "4x⁴",
        "4x"
      ],
      "a": 0,
      "e": "Using the power rule: f'(x)=4x⁴⁻¹=4x³.",
      "h": "Apply f'(x)=nx^(n-1) with n=4.",
      "yr": "SS3"
    },
    {
      "q": "Differentiate f(x)=3x²+2x.",
      "o": [
        "6x+2",
        "6x",
        "3x+2",
        "6x²+2"
      ],
      "a": 0,
      "e": "d/dx(3x²)=6x, d/dx(2x)=2. Sum: 6x+2.",
      "h": "Apply the power rule to each term and sum the results.",
      "yr": "SS3"
    },
    {
      "q": "Differentiate f(x)=x.",
      "o": [
        "1",
        "x",
        "0",
        "x²"
      ],
      "a": 0,
      "e": "Using the power rule with n=1: f'(x)=1×x⁰=1.",
      "h": "Apply f'(x)=nx^(n-1) with n=1.",
      "yr": "SS3"
    },
    {
      "q": "Differentiate y=10.",
      "o": [
        "0",
        "10",
        "1",
        "10x"
      ],
      "a": 0,
      "e": "The derivative of any constant is 0.",
      "h": "Constants have zero rate of change.",
      "yr": "SS3"
    },
    {
      "q": "Differentiate f(x)=4x³-2x²+x-9.",
      "o": [
        "12x²-4x+1",
        "12x²-4x",
        "4x²-2x+1",
        "12x³-4x+1"
      ],
      "a": 0,
      "e": "d/dx(4x³)=12x², d/dx(-2x²)=-4x, d/dx(x)=1, d/dx(-9)=0. Sum: 12x²-4x+1.",
      "h": "Differentiate each term using the power rule.",
      "yr": "SS3"
    },
    {
      "q": "What does f'(x) represent geometrically?",
      "o": [
        "The gradient (slope) of the tangent to the curve at point x",
        "The area under the curve",
        "The y-intercept of the curve",
        "The maximum value of the function"
      ],
      "a": 0,
      "e": "The derivative f'(x) gives the gradient of the tangent line to the curve y=f(x) at the point x.",
      "h": "Think about what 'rate of change' means visually on a graph.",
      "yr": "SS3"
    },
    {
      "q": "Find the gradient of the curve y=x² at x=3.",
      "o": [
        "6",
        "9",
        "3",
        "12"
      ],
      "a": 0,
      "e": "y'=2x. At x=3: gradient=2(3)=6.",
      "h": "Differentiate first, then substitute x=3.",
      "yr": "SS3"
    },
    {
      "q": "Differentiate f(x)=2x⁵.",
      "o": [
        "10x⁴",
        "10x⁵",
        "2x⁴",
        "5x⁴"
      ],
      "a": 0,
      "e": "f'(x)=5×2x⁵⁻¹=10x⁴.",
      "h": "Multiply the coefficient by the power, then reduce the power by 1.",
      "yr": "SS3"
    },
    {
      "q": "Find the gradient of y=3x²-4x+1 at x=2.",
      "o": [
        "8",
        "12",
        "4",
        "10"
      ],
      "a": 0,
      "e": "y'=6x-4. At x=2: gradient=6(2)-4=12-4=8.",
      "h": "Differentiate first, then substitute x=2.",
      "yr": "SS3"
    },
    {
      "q": "Differentiate f(x)=x²+5x+6 from first principles (find the formula, not full working).",
      "o": [
        "2x+5",
        "2x",
        "x+5",
        "2x+6"
      ],
      "a": 0,
      "e": "Using first principles (or power rule as a check): d/dx(x²)=2x, d/dx(5x)=5, d/dx(6)=0. Sum: 2x+5.",
      "h": "Apply the power rule to verify the first-principles result.",
      "yr": "SS3"
    },
    {
      "q": "What is the first principle of differentiation based on?",
      "o": [
        "The limit of the average rate of change as the interval approaches zero",
        "The area under a curve",
        "Integration by substitution",
        "The sum of a series"
      ],
      "a": 0,
      "e": "First principles defines the derivative as the limit of [f(x+h)-f(x)]/h as h approaches 0 — essentially the limiting slope between two very close points.",
      "h": "Think about what happens to the slope between two points as they get infinitely close.",
      "yr": "SS3"
    },
    {
      "q": "Differentiate y=7x-3.",
      "o": [
        "7",
        "7x",
        "-3",
        "7x-3"
      ],
      "a": 0,
      "e": "d/dx(7x)=7, d/dx(-3)=0. Result: 7.",
      "h": "The derivative of a linear function ax+b is simply a (the coefficient of x).",
      "yr": "SS3"
    },
    {
      "q": "Find dy/dx if y=x³-6x²+9x.",
      "o": [
        "3x²-12x+9",
        "3x²-12x",
        "x²-6x+9",
        "3x³-12x+9"
      ],
      "a": 0,
      "e": "d/dx(x³)=3x², d/dx(-6x²)=-12x, d/dx(9x)=9. Sum: 3x²-12x+9.",
      "h": "Apply the power rule to each term.",
      "yr": "SS3"
    },
    {
      "q": "At what value of x is the gradient of y=x²-4x+3 equal to 0?",
      "o": [
        "2",
        "4",
        "0",
        "-2"
      ],
      "a": 0,
      "e": "y'=2x-4. Setting 2x-4=0: x=2.",
      "h": "Differentiate, set the derivative equal to 0, and solve for x.",
      "yr": "SS3"
    },
    {
      "q": "Differentiate f(x)=½x⁴.",
      "o": [
        "2x³",
        "½x³",
        "4x³",
        "x³"
      ],
      "a": 0,
      "e": "f'(x)=4×½x⁴⁻¹=2x³.",
      "h": "Multiply the coefficient by the power, then reduce the power by 1.",
      "yr": "SS3"
    },
    {
      "q": "Why is the derivative of a constant always zero?",
      "o": [
        "Because a constant function never changes value as x changes, so its rate of change is zero",
        "Constants have undefined derivatives",
        "Zero is a special rule with no mathematical reason",
        "Only some constants have zero derivatives"
      ],
      "a": 0,
      "e": "A constant function y=c has the same value for every x, meaning the curve is a horizontal line with zero slope everywhere — hence a derivative of 0.",
      "h": "Think about the graph of a constant function and its slope.",
      "yr": "SS3"
    },
    {
      "q": "Why is differentiation useful beyond just finding gradients?",
      "o": [
        "It helps analyze rates of change in real-world contexts, like velocity, growth rates, and optimization problems",
        "It only has theoretical use with no real applications",
        "It is only used to find y-intercepts",
        "It replaces the need for algebra entirely"
      ],
      "a": 0,
      "e": "Differentiation is widely applied in physics (velocity, acceleration), economics (marginal cost/revenue), biology (growth rates), and more, making it a powerful tool beyond pure geometry.",
      "h": "Think about real-world quantities that represent 'rate of change'.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Differentiation of Algebraic Functions II",
  "topicCode": "SS3-MTH-15",
  "module": "Calculus",
  "term": "Second Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic applies differentiation to solve real problems: finding <span class=\"learn-keyword\">maxima and minima</span>, analyzing <span class=\"learn-keyword\">rates of change</span>, and applications in business and capital markets.\n</div>\n\n<h3 class=\"learn-subheading\">1. Stationary Points</h3>\n<p class=\"learn-p\">A stationary point occurs where f'(x)=0. These can be a <strong>maximum</strong>, <strong>minimum</strong>, or <strong>point of inflection</strong>.</p>\n\n<h3 class=\"learn-subheading\">2. Second Derivative Test</h3>\n<p class=\"learn-p\">If f''(x) &lt; 0 at a stationary point, it's a <strong>maximum</strong>. If f''(x) &gt; 0, it's a <strong>minimum</strong>.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the stationary points of y=x&sup3;&minus;3x&sup2;+2 and classify them.<br>y'=3x&sup2;&minus;6x. Set=0: 3x(x&minus;2)=0. x=0 or x=2.<br>y''=6x&minus;6. At x=0: y''=&minus;6 (negative) &rArr; <strong>maximum</strong>. At x=2: y''=6 (positive) &rArr; <strong>minimum</strong>.</p>\n\n<h3 class=\"learn-subheading\">3. Rates of Change</h3>\n<p class=\"learn-p\">If s=distance and t=time, then velocity v=ds/dt (first derivative), and acceleration a=dv/dt (second derivative).</p>\n\n<h3 class=\"learn-subheading\">4. Application in Business</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> A firm's profit is P=&minus;2x&sup2;+40x&minus;50 (x=units sold). Find x that maximizes profit.<br>P'=&minus;4x+40. Set=0: x=10. P''=&minus;4 (negative, confirming maximum). Maximum profit at <strong>x=10 units</strong>.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Always use the second derivative test to confirm whether a stationary point is a maximum or minimum — don't just assume from the shape of the function.\n</div>\n",
  "questions": [
    {
      "q": "Find the stationary points of y=x³-3x²+2.",
      "o": [
        "x=0 and x=2",
        "x=0 and x=3",
        "x=1 and x=2",
        "x=0 only"
      ],
      "a": 0,
      "e": "y'=3x²-6x=3x(x-2). Setting=0: x=0 or x=2.",
      "h": "Set the first derivative equal to 0 and solve.",
      "yr": "SS3"
    },
    {
      "q": "Using the second derivative test on y=x³-3x²+2, classify x=0.",
      "o": [
        "Maximum (since y''=-6, negative)",
        "Minimum (since y''=-6, negative)",
        "Point of inflection",
        "Cannot be determined"
      ],
      "a": 0,
      "e": "y''=6x-6. At x=0: y''=-6, which is negative, indicating a maximum.",
      "h": "A negative second derivative at a stationary point indicates a maximum.",
      "yr": "SS3"
    },
    {
      "q": "Using the second derivative test on y=x³-3x²+2, classify x=2.",
      "o": [
        "Minimum (since y''=6, positive)",
        "Maximum (since y''=6, positive)",
        "Point of inflection",
        "Cannot be determined"
      ],
      "a": 0,
      "e": "y''=6x-6. At x=2: y''=6, which is positive, indicating a minimum.",
      "h": "A positive second derivative at a stationary point indicates a minimum.",
      "yr": "SS3"
    },
    {
      "q": "A firm's profit is P=-2x²+40x-50. Find the value of x that maximizes profit.",
      "o": [
        "10",
        "20",
        "5",
        "40"
      ],
      "a": 0,
      "e": "P'=-4x+40. Setting=0: x=10.",
      "h": "Differentiate, set equal to 0, and solve for x.",
      "yr": "SS3"
    },
    {
      "q": "Confirm the profit function P=-2x²+40x-50 has a maximum (not minimum) at x=10 using the second derivative.",
      "o": [
        "P''=-4 (negative), confirming a maximum",
        "P''=4 (positive), confirming a minimum",
        "P''=0, indicating inflection",
        "Cannot be determined"
      ],
      "a": 0,
      "e": "P''=-4, which is constant and negative, confirming the stationary point is a maximum.",
      "h": "Find the second derivative and check its sign.",
      "yr": "SS3"
    },
    {
      "q": "If s=t³-6t²+9t (distance in meters, t in seconds), find the velocity function v=ds/dt.",
      "o": [
        "3t²-12t+9",
        "3t²-12t",
        "t²-6t+9",
        "3t³-12t+9"
      ],
      "a": 0,
      "e": "v=ds/dt=3t²-12t+9.",
      "h": "Differentiate the distance function once to get velocity.",
      "yr": "SS3"
    },
    {
      "q": "Using v=3t²-12t+9, find the acceleration function a=dv/dt.",
      "o": [
        "6t-12",
        "6t",
        "3t-12",
        "6t²-12"
      ],
      "a": 0,
      "e": "a=dv/dt=6t-12.",
      "h": "Differentiate the velocity function (the second derivative of distance) to get acceleration.",
      "yr": "SS3"
    },
    {
      "q": "Find the velocity at t=2 seconds, given v=3t²-12t+9.",
      "o": [
        "-3 m/s",
        "3 m/s",
        "9 m/s",
        "-9 m/s"
      ],
      "a": 0,
      "e": "v(2)=3(4)-12(2)+9=12-24+9=-3.",
      "h": "Substitute t=2 into the velocity function.",
      "yr": "SS3"
    },
    {
      "q": "Find the maximum area of a rectangle with perimeter 20m (using A=x(10-x), maximize with respect to x).",
      "o": [
        "25 m²",
        "20 m²",
        "15 m²",
        "30 m²"
      ],
      "a": 0,
      "e": "A=10x-x². A'=10-2x. Setting=0: x=5. A(5)=5(10-5)=25 m² (this is actually a square, the maximum area case).",
      "h": "Express area in terms of one variable, differentiate, set to 0, then evaluate.",
      "yr": "SS3"
    },
    {
      "q": "A ball's height is given by h=20t-5t² (meters, t in seconds). Find the time at which the ball reaches maximum height.",
      "o": [
        "2 seconds",
        "4 seconds",
        "5 seconds",
        "10 seconds"
      ],
      "a": 0,
      "e": "h'=20-10t. Setting=0: t=2 seconds.",
      "h": "Differentiate, set equal to 0, and solve for t.",
      "yr": "SS3"
    },
    {
      "q": "Using h=20t-5t², find the maximum height reached by the ball.",
      "o": [
        "20 m",
        "40 m",
        "10 m",
        "25 m"
      ],
      "a": 0,
      "e": "At t=2: h=20(2)-5(4)=40-20=20m.",
      "h": "Substitute the time of maximum height back into the height function.",
      "yr": "SS3"
    },
    {
      "q": "What does a positive second derivative at a stationary point indicate?",
      "o": [
        "A minimum point",
        "A maximum point",
        "A point of inflection",
        "No conclusion can be drawn"
      ],
      "a": 0,
      "e": "A positive second derivative (concave up) at a stationary point indicates a minimum.",
      "h": "Think about the curve's concavity: positive second derivative means curving upward (like a valley).",
      "yr": "SS3"
    },
    {
      "q": "What does a negative second derivative at a stationary point indicate?",
      "o": [
        "A maximum point",
        "A minimum point",
        "A point of inflection",
        "No conclusion can be drawn"
      ],
      "a": 0,
      "e": "A negative second derivative (concave down) at a stationary point indicates a maximum.",
      "h": "Think about the curve's concavity: negative second derivative means curving downward (like a hill).",
      "yr": "SS3"
    },
    {
      "q": "A manufacturer's cost function is C=x²-20x+150. Find the value of x that minimizes cost.",
      "o": [
        "10",
        "20",
        "15",
        "5"
      ],
      "a": 0,
      "e": "C'=2x-20. Setting=0: x=10.",
      "h": "Differentiate, set equal to 0, and solve for x.",
      "yr": "SS3"
    },
    {
      "q": "Confirm the cost function C=x²-20x+150 has a minimum at x=10 using the second derivative.",
      "o": [
        "C''=2 (positive), confirming a minimum",
        "C''=-2 (negative), confirming a maximum",
        "C''=0, indicating inflection",
        "Cannot be determined"
      ],
      "a": 0,
      "e": "C''=2, which is positive, confirming the stationary point is a minimum.",
      "h": "Find the second derivative and check its sign.",
      "yr": "SS3"
    },
    {
      "q": "Find the minimum cost using C=x²-20x+150 at x=10.",
      "o": [
        "₦50",
        "₦100",
        "₦150",
        "₦200"
      ],
      "a": 0,
      "e": "C(10)=100-200+150=50.",
      "h": "Substitute x=10 back into the cost function.",
      "yr": "SS3"
    },
    {
      "q": "In capital markets, how might differentiation be applied to a stock price function P(t)?",
      "o": [
        "To find the rate of change (growth or decline) of the price with respect to time",
        "To find the stock's total historical price",
        "To determine the company's total revenue",
        "Differentiation has no application in capital markets"
      ],
      "a": 0,
      "e": "Differentiating a price function with respect to time gives the instantaneous rate of change (e.g., how fast the price is rising or falling), useful for trend analysis.",
      "h": "Think about what a derivative represents when applied to a quantity changing over time.",
      "yr": "SS3"
    },
    {
      "q": "If a function has a stationary point where f''(x)=0, what must be done to classify it?",
      "o": [
        "Further investigation is needed (e.g., checking the sign of f'(x) on either side, since it could be a point of inflection)",
        "It is always a maximum",
        "It is always a minimum",
        "It is automatically a point of inflection with certainty"
      ],
      "a": 0,
      "e": "When f''(x)=0, the second derivative test is inconclusive, requiring further analysis (such as examining f'(x) around the point) to determine the nature of the stationary point.",
      "h": "A zero second derivative doesn't automatically mean inflection — more checking is needed.",
      "yr": "SS3"
    },
    {
      "q": "A revenue function is R=100x-2x². Find the value of x that maximizes revenue.",
      "o": [
        "25",
        "50",
        "20",
        "100"
      ],
      "a": 0,
      "e": "R'=100-4x. Setting=0: x=25.",
      "h": "Differentiate, set equal to 0, and solve for x.",
      "yr": "SS3"
    },
    {
      "q": "Using R=100x-2x², find the maximum revenue at x=25.",
      "o": [
        "₦1,250",
        "₦1,000",
        "₦1,500",
        "₦2,000"
      ],
      "a": 0,
      "e": "R(25)=100(25)-2(625)=2500-1250=₦1,250.",
      "h": "Substitute x=25 back into the revenue function.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Integration of Algebraic Functions",
  "topicCode": "SS3-MTH-16",
  "module": "Calculus",
  "term": "Second Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  <span class=\"learn-keyword\">Integration</span> is the reverse process of differentiation, used to find areas, volumes, and to recover a function from its rate of change.\n</div>\n\n<h3 class=\"learn-subheading\">1. Standard Integral (Power Rule)</h3>\n<p class=\"learn-p\"><strong>&int;x<sup>n</sup> dx = x<sup>n+1</sup>/(n+1) + C</strong> (for n &ne; &minus;1), where C is the constant of integration.</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Integrate &int;(3x&sup2;+2x&minus;5) dx.<br>= 3(x&#179;/3) + 2(x&sup2;/2) &minus; 5x + C = <strong>x&#179;+x&sup2;&minus;5x+C</strong>.</p>\n\n<h3 class=\"learn-subheading\">2. Definite Integrals</h3>\n<p class=\"learn-p\">A definite integral &int;<sub>a</sub><sup>b</sup> f(x) dx evaluates the antiderivative at b, minus its value at a (no constant C needed).</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Evaluate &int;<sub>1</sub><sup>3</sup> 2x dx.<br>Antiderivative = x&sup2;. Evaluate: (3)&sup2;&minus;(1)&sup2; = 9&minus;1 = <strong>8</strong>.</p>\n\n<h3 class=\"learn-subheading\">3. Finding the Original Function (Given the Derivative)</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> If dy/dx=4x&minus;3 and y=5 when x=2, find y.<br>y = &int;(4x&minus;3)dx = 2x&sup2;&minus;3x+C. At x=2: 5=2(4)&minus;3(2)+C = 8&minus;6+C = 2+C. C=3. So <strong>y=2x&sup2;&minus;3x+3</strong>.</p>\n\n<h3 class=\"learn-subheading\">4. Application: Finding Area Under a Curve</h3>\n<p class=\"learn-p\">The area under y=f(x) between x=a and x=b is given by &int;<sub>a</sub><sup>b</sup> f(x) dx.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> Always add +C for indefinite integrals (no limits given), but NEVER include C for definite integrals (with limits) — the constant cancels out.\n</div>\n",
  "questions": [
    {
      "q": "Integrate ∫(3x²+2x-5) dx.",
      "o": [
        "x³+x²-5x+C",
        "3x³+2x²-5x+C",
        "x³+x²-5x",
        "3x+2-5x+C"
      ],
      "a": 0,
      "e": "∫3x²dx=x³, ∫2xdx=x², ∫-5dx=-5x. Sum: x³+x²-5x+C.",
      "h": "Apply the power rule term by term, adding 1 to each power and dividing by the new power.",
      "yr": "SS3"
    },
    {
      "q": "Evaluate ∫₁³ 2x dx.",
      "o": [
        "8",
        "9",
        "1",
        "6"
      ],
      "a": 0,
      "e": "Antiderivative=x². Evaluate: (3)²-(1)²=9-1=8.",
      "h": "Find the antiderivative, then evaluate at the upper limit minus the lower limit.",
      "yr": "SS3"
    },
    {
      "q": "If dy/dx=4x-3 and y=5 when x=2, find the full expression for y.",
      "o": [
        "y=2x²-3x+3",
        "y=2x²-3x+5",
        "y=4x²-3x+3",
        "y=2x²-3x"
      ],
      "a": 0,
      "e": "y=∫(4x-3)dx=2x²-3x+C. At x=2: 5=8-6+C=2+C, so C=3. y=2x²-3x+3.",
      "h": "Integrate first, then use the given condition to find C.",
      "yr": "SS3"
    },
    {
      "q": "Integrate ∫x³ dx.",
      "o": [
        "x⁴/4 + C",
        "x⁴ + C",
        "4x⁴ + C",
        "x²/2 + C"
      ],
      "a": 0,
      "e": "Using the power rule: ∫x³dx=x⁴/4+C.",
      "h": "Add 1 to the power, then divide by the new power.",
      "yr": "SS3"
    },
    {
      "q": "Integrate ∫(6x-4) dx.",
      "o": [
        "3x²-4x+C",
        "6x²-4x+C",
        "3x²-4x",
        "6x-4x+C"
      ],
      "a": 0,
      "e": "∫6xdx=3x², ∫-4dx=-4x. Sum: 3x²-4x+C.",
      "h": "Apply the power rule to each term.",
      "yr": "SS3"
    },
    {
      "q": "Evaluate ∫₀² (3x²) dx.",
      "o": [
        "8",
        "6",
        "4",
        "12"
      ],
      "a": 0,
      "e": "Antiderivative=x³. Evaluate: (2)³-(0)³=8-0=8.",
      "h": "Find the antiderivative, then apply the limits.",
      "yr": "SS3"
    },
    {
      "q": "Why is a constant of integration (C) added for indefinite integrals?",
      "o": [
        "Because differentiating any constant gives zero, so the original function could have had any constant term",
        "C represents the area under the curve",
        "C is always equal to zero",
        "C is only needed for definite integrals"
      ],
      "a": 0,
      "e": "Since the derivative of any constant is 0, integrating 'undoes' differentiation but can't recover information about a constant term — hence the general +C.",
      "h": "Think about what information is lost when you differentiate a function with a constant term.",
      "yr": "SS3"
    },
    {
      "q": "Evaluate ∫₁² (4x³) dx.",
      "o": [
        "15",
        "16",
        "14",
        "17"
      ],
      "a": 0,
      "e": "Antiderivative=x⁴. Evaluate: (2)⁴-(1)⁴=16-1=15.",
      "h": "Find the antiderivative, then evaluate at the limits.",
      "yr": "SS3"
    },
    {
      "q": "Integrate ∫(x²-4x+4) dx.",
      "o": [
        "x³/3-2x²+4x+C",
        "x³-2x²+4x+C",
        "x³/3-4x²+4x+C",
        "x²-4x+4x+C"
      ],
      "a": 0,
      "e": "∫x²dx=x³/3, ∫-4xdx=-2x², ∫4dx=4x. Sum: x³/3-2x²+4x+C.",
      "h": "Apply the power rule to each term carefully.",
      "yr": "SS3"
    },
    {
      "q": "Find the area under y=2x between x=0 and x=4.",
      "o": [
        "16",
        "8",
        "32",
        "4"
      ],
      "a": 0,
      "e": "∫₀⁴ 2x dx = x² evaluated from 0 to 4 = 16-0=16.",
      "h": "Set up and evaluate the definite integral representing area.",
      "yr": "SS3"
    },
    {
      "q": "If dy/dx=6x² and y=10 when x=1, find y.",
      "o": [
        "y=2x³+8",
        "y=2x³+10",
        "y=6x³+8",
        "y=2x²+8"
      ],
      "a": 0,
      "e": "y=∫6x²dx=2x³+C. At x=1: 10=2+C, so C=8. y=2x³+8.",
      "h": "Integrate, then use the given point to solve for C.",
      "yr": "SS3"
    },
    {
      "q": "Evaluate ∫₋₁¹ (x²) dx.",
      "o": [
        "2/3",
        "0",
        "1",
        "4/3"
      ],
      "a": 0,
      "e": "Antiderivative=x³/3. Evaluate: (1)³/3-(-1)³/3=1/3-(-1/3)=2/3.",
      "h": "Find the antiderivative, then carefully evaluate at both limits, including negative values.",
      "yr": "SS3"
    },
    {
      "q": "What is integration primarily used for, in relation to a rate function?",
      "o": [
        "Recovering the original function (e.g., total distance) from its rate of change (e.g., velocity)",
        "Finding only the gradient of a curve",
        "Finding the y-intercept only",
        "Solving simultaneous equations"
      ],
      "a": 0,
      "e": "Integration reverses differentiation, allowing us to recover quantities like position from velocity, or total cost from marginal cost.",
      "h": "Think about the inverse relationship between integration and differentiation.",
      "yr": "SS3"
    },
    {
      "q": "Integrate ∫5 dx.",
      "o": [
        "5x + C",
        "5 + C",
        "x + C",
        "5x"
      ],
      "a": 0,
      "e": "∫5dx=5x+C (integrating a constant gives the constant times x).",
      "h": "A constant integrates to (constant)×x.",
      "yr": "SS3"
    },
    {
      "q": "Evaluate ∫₀¹ (x³) dx.",
      "o": [
        "1/4",
        "1",
        "1/3",
        "1/2"
      ],
      "a": 0,
      "e": "Antiderivative=x⁴/4. Evaluate: (1)⁴/4-(0)⁴/4=1/4-0=1/4.",
      "h": "Find the antiderivative, then evaluate at the limits.",
      "yr": "SS3"
    },
    {
      "q": "Find the total distance traveled if velocity v=2t+3 (m/s), from t=0 to t=4 seconds.",
      "o": [
        "28 m",
        "24 m",
        "20 m",
        "32 m"
      ],
      "a": 0,
      "e": "Distance=∫₀⁴(2t+3)dt=[t²+3t]₀⁴=(16+12)-(0)=28m.",
      "h": "Integrate the velocity function and evaluate between the time limits.",
      "yr": "SS3"
    },
    {
      "q": "Integrate ∫(2x-1)² dx by first expanding the square.",
      "o": [
        "(4x³)/3-2x²+x+C",
        "4x²-4x+1+C",
        "(4x³)/3+C",
        "2x³-2x²+x+C"
      ],
      "a": 0,
      "e": "Expand: (2x-1)²=4x²-4x+1. Integrate: 4x³/3-2x²+x+C.",
      "h": "Expand the squared expression first, then integrate term by term.",
      "yr": "SS3"
    },
    {
      "q": "If the marginal cost (derivative of cost) is MC=3x²+2, and fixed cost is ₦50, find the total cost function C(x).",
      "o": [
        "C(x)=x³+2x+50",
        "C(x)=x³+2x",
        "C(x)=3x³+2x+50",
        "C(x)=x³+2x+C (unspecified)"
      ],
      "a": 0,
      "e": "C(x)=∫(3x²+2)dx=x³+2x+K. Since fixed cost (x=0) is 50: C(0)=K=50. So C(x)=x³+2x+50.",
      "h": "Integrate the marginal cost, then use the fixed cost as the value when x=0.",
      "yr": "SS3"
    },
    {
      "q": "Why must definite integrals NOT include the constant C?",
      "o": [
        "Because C cancels out when subtracting the antiderivative evaluated at the lower limit from the upper limit",
        "C is always zero in definite integrals",
        "Definite integrals don't have antiderivatives",
        "C is only used for negative functions"
      ],
      "a": 0,
      "e": "In a definite integral, [F(x)+C] evaluated at b minus [F(x)+C] evaluated at a results in the C terms canceling: [F(b)+C]-[F(a)+C]=F(b)-F(a).",
      "h": "Think about what happens when you subtract F(a)+C from F(b)+C.",
      "yr": "SS3"
    },
    {
      "q": "Find the area bounded by y=x², the x-axis, between x=1 and x=3.",
      "o": [
        "26/3",
        "9",
        "8",
        "27/3"
      ],
      "a": 0,
      "e": "Area=∫₁³x²dx=[x³/3]₁³=(27/3)-(1/3)=26/3.",
      "h": "Set up the definite integral and evaluate at both limits.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "Functions and Mapping",
  "topicCode": "SS3-MTH-17",
  "module": "Functions and Relations",
  "term": "Second Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  A <span class=\"learn-keyword\">function</span> is a special relation that maps each input to exactly one output. This topic covers domain, co-domain, range, and inverse functions.\n</div>\n\n<h3 class=\"learn-subheading\">1. Key Definitions</h3>\n<div class=\"learn-table-wrap\">\n  <table class=\"learn-table\">\n    <thead><tr><th>Term</th><th>Meaning</th></tr></thead>\n    <tbody>\n      <tr><td>Function</td><td>A mapping where each input has exactly ONE output</td></tr>\n      <tr><td>Domain</td><td>The set of all possible input values</td></tr>\n      <tr><td>Co-domain</td><td>The set of values the function could possibly map to</td></tr>\n      <tr><td>Range</td><td>The set of actual output values produced</td></tr>\n      <tr><td>Inverse function f&#8315;&sup1;</td><td>A function that \"undoes\" f, mapping outputs back to inputs</td></tr>\n    </tbody>\n  </table>\n</div>\n\n<h3 class=\"learn-subheading\">2. Finding the Inverse of a Function</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Find the inverse of f(x)=2x+3.<br>Let y=2x+3. Swap x and y: x=2y+3. Solve for y: y=(x&minus;3)/2. So f&#8315;&sup1;(x) = <strong>(x&minus;3)/2</strong>.</p>\n\n<h3 class=\"learn-subheading\">3. Composite Functions</h3>\n<p class=\"learn-p\">fg(x) means apply g first, then f: fg(x) = f(g(x)).</p>\n<p class=\"learn-p\"><strong>Worked Example:</strong> If f(x)=x+1 and g(x)=2x, find fg(3).<br>g(3)=2(3)=6. f(6)=6+1=<strong>7</strong>.</p>\n\n<h3 class=\"learn-subheading\">4. Types of Mapping</h3>\n<p class=\"learn-p\"><strong>One-to-one:</strong> each input maps to a unique output, and vice versa. <strong>Many-to-one:</strong> multiple inputs can map to the same output. <strong>One-to-many:</strong> NOT a function (an input would have multiple outputs).</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> To find an inverse function, always swap x and y first, THEN solve for y — doing it in the wrong order leads to errors.\n</div>\n",
  "questions": [
    {
      "q": "Find the inverse of f(x)=2x+3.",
      "o": [
        "(x-3)/2",
        "(x+3)/2",
        "2x-3",
        "(x-2)/3"
      ],
      "a": 0,
      "e": "y=2x+3. Swap: x=2y+3. Solve: y=(x-3)/2.",
      "h": "Swap x and y, then solve for y.",
      "yr": "SS3"
    },
    {
      "q": "If f(x)=x+1 and g(x)=2x, find fg(3).",
      "o": [
        "7",
        "8",
        "6",
        "9"
      ],
      "a": 0,
      "e": "g(3)=6. f(6)=6+1=7.",
      "h": "Apply g first, then f, to the input.",
      "yr": "SS3"
    },
    {
      "q": "What is a function?",
      "o": [
        "A mapping where each input has exactly one output",
        "A mapping where each input can have multiple outputs",
        "Any relation between two sets",
        "A set of numbers"
      ],
      "a": 0,
      "e": "A function requires each input (domain element) to map to exactly one output.",
      "h": "The key restriction is exactly ONE output per input.",
      "yr": "SS3"
    },
    {
      "q": "What is the domain of a function?",
      "o": [
        "The set of all possible input values",
        "The set of all output values",
        "The set the function could map to",
        "The inverse function"
      ],
      "a": 0,
      "e": "The domain is the set of all valid input (x) values for the function.",
      "h": "Domain = inputs.",
      "yr": "SS3"
    },
    {
      "q": "What is the range of a function?",
      "o": [
        "The set of actual output values produced",
        "The set of all possible input values",
        "The co-domain exactly",
        "The inverse function"
      ],
      "a": 0,
      "e": "The range is the set of actual output (y) values the function produces.",
      "h": "Range = actual outputs produced, which can be a subset of the co-domain.",
      "yr": "SS3"
    },
    {
      "q": "Find the inverse of f(x)=3x-5.",
      "o": [
        "(x+5)/3",
        "(x-5)/3",
        "3x+5",
        "(x-3)/5"
      ],
      "a": 0,
      "e": "y=3x-5. Swap: x=3y-5. Solve: y=(x+5)/3.",
      "h": "Swap x and y, then isolate y.",
      "yr": "SS3"
    },
    {
      "q": "If f(x)=x² and g(x)=x+3, find fg(2).",
      "o": [
        "25",
        "13",
        "7",
        "16"
      ],
      "a": 0,
      "e": "g(2)=2+3=5. f(5)=5²=25.",
      "h": "Apply g first to get an intermediate value, then apply f to that result.",
      "yr": "SS3"
    },
    {
      "q": "If f(x)=x² and g(x)=x+3, find gf(2).",
      "o": [
        "7",
        "25",
        "13",
        "4"
      ],
      "a": 0,
      "e": "f(2)=2²=4. g(4)=4+3=7.",
      "h": "Apply f first this time, then g.",
      "yr": "SS3"
    },
    {
      "q": "What type of mapping has multiple inputs mapping to the same output?",
      "o": [
        "Many-to-one",
        "One-to-one",
        "One-to-many",
        "Not a function"
      ],
      "a": 0,
      "e": "Many-to-one mapping occurs when several different inputs produce the same output.",
      "h": "'Many' inputs map to 'one' output.",
      "yr": "SS3"
    },
    {
      "q": "Why is 'one-to-many' mapping NOT considered a function?",
      "o": [
        "Because a single input would produce multiple outputs, violating the definition of a function",
        "One-to-many mappings are always functions",
        "Functions must always be one-to-one",
        "There is no such thing as one-to-many mapping"
      ],
      "a": 0,
      "e": "A function requires each input to have exactly ONE output; one-to-many mapping violates this by giving an input multiple possible outputs.",
      "h": "Recall the core definition requiring a single output per input.",
      "yr": "SS3"
    },
    {
      "q": "Find f⁻¹(x) for f(x)=(x-1)/4.",
      "o": [
        "4x+1",
        "4x-1",
        "(x+1)/4",
        "x/4+1"
      ],
      "a": 0,
      "e": "y=(x-1)/4. Swap: x=(y-1)/4. Solve: 4x=y-1, y=4x+1.",
      "h": "Swap x and y, then solve the equation for y.",
      "yr": "SS3"
    },
    {
      "q": "If f(x)=2x+1, find f(3).",
      "o": [
        "7",
        "6",
        "8",
        "5"
      ],
      "a": 0,
      "e": "f(3)=2(3)+1=7.",
      "h": "Substitute x=3 into the function.",
      "yr": "SS3"
    },
    {
      "q": "Using f(x)=2x+1 and its inverse f⁻¹(x)=(x-1)/2, verify f⁻¹(7).",
      "o": [
        "3 (confirming f⁻¹ correctly reverses f)",
        "7",
        "5",
        "1"
      ],
      "a": 0,
      "e": "f⁻¹(7)=(7-1)/2=6/2=3, correctly reversing f(3)=7.",
      "h": "Substitute 7 into the inverse function and check it returns the original input (3).",
      "yr": "SS3"
    },
    {
      "q": "What is the co-domain of a function?",
      "o": [
        "The set of values the function could possibly map to (a superset of or equal to the range)",
        "The same as the domain always",
        "The set of actual outputs only",
        "The inverse of the range"
      ],
      "a": 0,
      "e": "The co-domain is the complete set the function's outputs are defined to belong to, which may include values never actually achieved (unlike the range).",
      "h": "Co-domain is the 'potential' output set; range is the 'actual' output set.",
      "yr": "SS3"
    },
    {
      "q": "If f(x)=x+5 and g(x)=x-5, what is fg(x)?",
      "o": [
        "x (since the operations cancel out)",
        "x+10",
        "x-10",
        "2x"
      ],
      "a": 0,
      "e": "fg(x)=f(g(x))=f(x-5)=(x-5)+5=x. The functions are inverses of each other.",
      "h": "Substitute g(x) into f, then simplify.",
      "yr": "SS3"
    },
    {
      "q": "A function f(x)=x² has domain all real numbers. What is its range?",
      "o": [
        "All non-negative real numbers (y≥0)",
        "All real numbers",
        "Only positive numbers",
        "Only integers"
      ],
      "a": 0,
      "e": "Since squaring any real number gives a non-negative result, the range of f(x)=x² is y≥0.",
      "h": "Think about what values x² can actually produce.",
      "yr": "SS3"
    },
    {
      "q": "If f(x)=5 for all x (a constant function), is this a function?",
      "o": [
        "Yes, since each input still maps to exactly one output (5)",
        "No, constant functions are not valid",
        "Only if x is restricted to one value",
        "Cannot be determined"
      ],
      "a": 0,
      "e": "A constant function is still valid since every input maps to exactly one output (even if that output is always the same value).",
      "h": "Check against the definition: one output per input, regardless of whether outputs repeat.",
      "yr": "SS3"
    },
    {
      "q": "Find fg(x) if f(x)=3x and g(x)=x-2.",
      "o": [
        "3x-6",
        "3x-2",
        "3x+2",
        "x-6"
      ],
      "a": 0,
      "e": "fg(x)=f(g(x))=f(x-2)=3(x-2)=3x-6.",
      "h": "Substitute g(x) into f(x), then simplify.",
      "yr": "SS3"
    },
    {
      "q": "Why must a function pass the 'vertical line test' on its graph to be valid?",
      "o": [
        "Because any vertical line should cross the graph at most once, confirming each x has only one y value",
        "The vertical line test checks if the function is increasing",
        "It verifies the domain only",
        "It has no real mathematical purpose"
      ],
      "a": 0,
      "e": "The vertical line test visually confirms the defining property of a function: each input (x) corresponds to exactly one output (y), shown by a vertical line crossing the graph at most once.",
      "h": "Think about what it would mean if a vertical line crossed the graph twice.",
      "yr": "SS3"
    },
    {
      "q": "Why is understanding inverse functions useful in real-world applications?",
      "o": [
        "They allow us to 'reverse' a process, such as converting Celsius back from Fahrenheit, or finding input values from known outputs",
        "Inverse functions have no practical use",
        "They only apply to linear functions",
        "They replace the need for the original function entirely"
      ],
      "a": 0,
      "e": "Inverse functions let us work backward from a known result to find the original input, useful in conversions, decoding, and solving for unknowns in applied contexts.",
      "h": "Think about situations where you know the output and need to find the corresponding input.",
      "yr": "SS3"
    }
  ]
},
{
  "topic": "General Review of Calculus",
  "topicCode": "SS3-MTH-18",
  "module": "Calculus",
  "term": "Second Term",
  "contentHTML": "\n<div class=\"learn-intro\">\n  This topic consolidates <span class=\"learn-keyword\">differentiation</span> and <span class=\"learn-keyword\">integration</span> through mixed practice, highlighting their real-life applications in physics, engineering, and economics.\n</div>\n\n<h3 class=\"learn-subheading\">1. Differentiation vs. Integration: Key Relationship</h3>\n<p class=\"learn-p\">Differentiation and integration are <strong>inverse operations</strong>. If F'(x)=f(x), then &int;f(x)dx = F(x)+C.</p>\n\n<h3 class=\"learn-subheading\">2. Mixed Practice: Differentiate then Integrate</h3>\n<p class=\"learn-p\"><strong>Worked Example:</strong> Given y=x&#179;&minus;2x&sup2;+x, find dy/dx, then verify by integrating dy/dx back.<br>dy/dx = 3x&sup2;&minus;4x+1.<br>&int;(3x&sup2;&minus;4x+1)dx = x&#179;&minus;2x&sup2;+x+C, which matches the original y (plus a constant), confirming the inverse relationship.</p>\n\n<h3 class=\"learn-subheading\">3. Applications in Physics</h3>\n<p class=\"learn-p\">Position &rarr; (differentiate) &rarr; Velocity &rarr; (differentiate) &rarr; Acceleration. Reverse: Acceleration &rarr; (integrate) &rarr; Velocity &rarr; (integrate) &rarr; Position.</p>\n\n<h3 class=\"learn-subheading\">4. Applications in Economics</h3>\n<p class=\"learn-p\">Marginal cost/revenue = derivative of total cost/revenue. Total cost/revenue = integral of marginal cost/revenue (plus fixed costs as the constant).</p>\n\n<h3 class=\"learn-subheading\">5. Applications in Engineering</h3>\n<p class=\"learn-p\">Calculus is used to model rates of heat flow, structural stress, electrical circuits, and optimize material usage.</p>\n\n<div class=\"learn-tip-box\">\n  <span class=\"learn-tip-icon\">💡</span>\n  <strong>Exam Tip:</strong> When a problem gives you a rate (derivative) and asks for a total (original function), you need to INTEGRATE; when given a total and asked for a rate, DIFFERENTIATE.\n</div>\n",
  "questions": [
    {
      "q": "Given y=x³-2x²+x, find dy/dx.",
      "o": [
        "3x²-4x+1",
        "3x²-4x",
        "x²-2x+1",
        "3x³-4x+1"
      ],
      "a": 0,
      "e": "Differentiate term by term: d/dx(x³)=3x², d/dx(-2x²)=-4x, d/dx(x)=1. Sum: 3x²-4x+1.",
      "h": "Apply the power rule to each term.",
      "yr": "SS3"
    },
    {
      "q": "Integrate ∫(3x²-4x+1) dx to verify it relates back to the original function.",
      "o": [
        "x³-2x²+x+C",
        "3x³-4x²+x+C",
        "x³-2x²+x",
        "x²-2x+1+C"
      ],
      "a": 0,
      "e": "∫3x²dx=x³, ∫-4xdx=-2x², ∫1dx=x. Sum: x³-2x²+x+C, confirming the inverse relationship with differentiation.",
      "h": "Apply the power rule for integration to each term.",
      "yr": "SS3"
    },
    {
      "q": "If position s=t²-4t+5, find the velocity v=ds/dt.",
      "o": [
        "2t-4",
        "2t",
        "t-4",
        "2t-4t"
      ],
      "a": 0,
      "e": "v=ds/dt=2t-4.",
      "h": "Differentiate the position function once to get velocity.",
      "yr": "SS3"
    },
    {
      "q": "Using v=2t-4, find the acceleration a=dv/dt.",
      "o": [
        "2",
        "2t",
        "-4",
        "2t-4"
      ],
      "a": 0,
      "e": "a=dv/dt=2 (a constant, since v is linear in t).",
      "h": "Differentiate the velocity function to get acceleration.",
      "yr": "SS3"
    },
    {
      "q": "If acceleration a=6t and initial velocity v=0 at t=0, find the velocity function v(t).",
      "o": [
        "v=3t²",
        "v=3t²+C (C=0)",
        "v=6t²",
        "v=3t"
      ],
      "a": 0,
      "e": "v=∫6t dt=3t²+C. At t=0, v=0: 0=0+C, so C=0. v=3t².",
      "h": "Integrate acceleration to get velocity, then use the initial condition to find C.",
      "yr": "SS3"
    },
    {
      "q": "A company's marginal cost is MC=4x+10. Find the total cost function if fixed costs are ₦100.",
      "o": [
        "C(x)=2x²+10x+100",
        "C(x)=4x²+10x+100",
        "C(x)=2x²+10x",
        "C(x)=2x²+100"
      ],
      "a": 0,
      "e": "C(x)=∫(4x+10)dx=2x²+10x+K. Fixed cost (x=0) is 100, so K=100. C(x)=2x²+10x+100.",
      "h": "Integrate the marginal cost, then use fixed cost as the constant of integration.",
      "yr": "SS3"
    },
    {
      "q": "A company's total revenue is R=50x-x². Find the marginal revenue function.",
      "o": [
        "50-2x",
        "50-x",
        "50x-2x",
        "-2x"
      ],
      "a": 0,
      "e": "MR=dR/dx=50-2x.",
      "h": "Differentiate the total revenue function to get marginal revenue.",
      "yr": "SS3"
    },
    {
      "q": "Using MR=50-2x, find the value of x where marginal revenue is zero.",
      "o": [
        "25",
        "50",
        "0",
        "10"
      ],
      "a": 0,
      "e": "Setting 50-2x=0: 2x=50, x=25.",
      "h": "Set the marginal revenue equal to 0 and solve for x.",
      "yr": "SS3"
    },
    {
      "q": "If y=4x³ and we differentiate then integrate the result, what do we get (ignoring constants)?",
      "o": [
        "4x³ (the original function, up to a constant)",
        "12x²",
        "x⁴",
        "4x⁴"
      ],
      "a": 0,
      "e": "Differentiating gives 12x². Integrating 12x² gives 4x³+C — the original function (plus a possible constant), confirming differentiation and integration are inverse processes.",
      "h": "Think about how differentiation and integration undo each other.",
      "yr": "SS3"
    },
    {
      "q": "A heat engineering model has temperature rate dT/dt=5-0.5t. If T=20 at t=0, find T(t).",
      "o": [
        "T=5t-0.25t²+20",
        "T=5t-0.25t²",
        "T=5t-0.5t²+20",
        "T=0.5t-0.25t²+20"
      ],
      "a": 0,
      "e": "T=∫(5-0.5t)dt=5t-0.25t²+C. At t=0, T=20: C=20. T=5t-0.25t²+20.",
      "h": "Integrate the rate function, then use the initial condition to find C.",
      "yr": "SS3"
    },
    {
      "q": "In physics, if s(t) represents position, what does ∫v(t)dt represent?",
      "o": [
        "The change in position (displacement) over the given time interval",
        "The acceleration",
        "The initial velocity",
        "The maximum speed"
      ],
      "a": 0,
      "e": "Integrating velocity with respect to time gives displacement (change in position), since integration reverses the differentiation that produced velocity from position.",
      "h": "Think about the inverse relationship: differentiating position gives velocity, so integrating velocity gives position (or displacement).",
      "yr": "SS3"
    },
    {
      "q": "Find the stationary points of y=2x³-3x²-12x+5.",
      "o": [
        "x=-1 and x=2",
        "x=1 and x=-2",
        "x=-1 and x=-2",
        "x=1 and x=2"
      ],
      "a": 0,
      "e": "y'=6x²-6x-12=6(x²-x-2)=6(x-2)(x+1). Setting=0: x=2 or x=-1.",
      "h": "Differentiate, factor the resulting quadratic, and set equal to 0.",
      "yr": "SS3"
    },
    {
      "q": "Classify the stationary point x=-1 for y=2x³-3x²-12x+5 using y''=12x-6.",
      "o": [
        "Maximum (since y''=-18, negative)",
        "Minimum (since y''=-18, negative)",
        "Point of inflection",
        "Cannot be determined"
      ],
      "a": 0,
      "e": "y''=12(-1)-6=-18, which is negative, indicating a maximum.",
      "h": "Substitute x=-1 into the second derivative and check its sign.",
      "yr": "SS3"
    },
    {
      "q": "Classify the stationary point x=2 for y=2x³-3x²-12x+5 using y''=12x-6.",
      "o": [
        "Minimum (since y''=18, positive)",
        "Maximum (since y''=18, positive)",
        "Point of inflection",
        "Cannot be determined"
      ],
      "a": 0,
      "e": "y''=12(2)-6=18, which is positive, indicating a minimum.",
      "h": "Substitute x=2 into the second derivative and check its sign.",
      "yr": "SS3"
    },
    {
      "q": "Why is calculus (differentiation and integration) considered foundational in engineering?",
      "o": [
        "It models how physical quantities change (rates) and accumulate (totals), essential for designing systems, structures, and circuits",
        "Calculus is only theoretical and rarely used in practice",
        "Engineering only uses algebra, not calculus",
        "Calculus is only relevant to pure mathematics"
      ],
      "a": 0,
      "e": "Calculus allows engineers to model and predict how quantities like stress, heat, current, and material usage change and accumulate, making it indispensable for design and analysis.",
      "h": "Think about real engineering problems involving changing quantities (loads, currents, flows).",
      "yr": "SS3"
    },
    {
      "q": "Find ∫(3x²+2x) dx evaluated from x=0 to x=2.",
      "o": [
        "12",
        "10",
        "8",
        "14"
      ],
      "a": 0,
      "e": "Antiderivative=x³+x². At x=2: 8+4=12. At x=0: 0. Result=12−0=12.",
      "h": "Find the antiderivative, then evaluate at the upper and lower limits.",
      "yr": "SS3"
    },
    {
      "q": "If a car's velocity is v=2t (m/s), find the displacement from t=0 to t=3 seconds.",
      "o": [
        "9 m",
        "12 m",
        "15 m",
        "6 m"
      ],
      "a": 0,
      "e": "Displacement=∫₀³2t dt=[t²]₀³=9−0=9m.",
      "h": "Integrate the velocity function and evaluate between the time limits.",
      "yr": "SS3"
    },
    {
      "q": "In economics, if total profit P(x) has a maximum, what must be true about marginal profit (P'(x)) at that point?",
      "o": [
        "Marginal profit equals zero at the maximum point",
        "Marginal profit is always positive",
        "Marginal profit is undefined",
        "Marginal profit equals total profit"
      ],
      "a": 0,
      "e": "At a maximum (a stationary point), the derivative (marginal profit) equals zero, consistent with general calculus optimization principles.",
      "h": "Recall that stationary points (including maxima) occur where the derivative equals zero.",
      "yr": "SS3"
    },
    {
      "q": "A ball is thrown with height h=30t-5t². Find the maximum height reached.",
      "o": [
        "45 m",
        "30 m",
        "25 m",
        "50 m"
      ],
      "a": 0,
      "e": "h'=30-10t. Setting=0: t=3. h(3)=30(3)-5(9)=90-45=45m.",
      "h": "Differentiate to find the time of maximum height, then substitute back into the height function.",
      "yr": "SS3"
    },
    {
      "q": "Why do differentiation and integration together form the foundation of 'calculus'?",
      "o": [
        "They provide complementary tools for analyzing instantaneous rates of change and accumulated totals, covering the two fundamental questions about continuously changing quantities",
        "They are unrelated branches of mathematics",
        "Only differentiation is considered 'true' calculus",
        "Integration was developed independently with no connection to differentiation"
      ],
      "a": 0,
      "e": "Differentiation answers 'how fast is something changing' while integration answers 'what is the total accumulation' — together, as proven by the Fundamental Theorem of Calculus, they form a complete framework for studying continuous change.",
      "h": "Think about how these two operations complement each other as inverse processes.",
      "yr": "SS3"
    }
  ]
}
];
