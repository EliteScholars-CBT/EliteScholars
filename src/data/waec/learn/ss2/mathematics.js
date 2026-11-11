// ============================================================================
// WAEC/NECO Learn — SS2/MATHEMATICS (NERDC 2025 scheme) — 23 topics
// ============================================================================

export const WAEC_MATHEMATICS_LEARN_SS2 = [
  {
    "topic": "Numbers and Approximation",
    "topicCode": "SS2-MATH-01",
    "module": "Numbers and Numeration",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\">A <span class=\"learn-keyword\">number</span> can be big, like the number of people in a big city, or very small, like the thickness of a sheet of paper. In this topic you learn how to describe numbers that are <span class=\"learn-keyword\">greater than 1</span> and <span class=\"learn-keyword\">less than 1</span>, how to write very big and very small numbers in a short way called <span class=\"learn-keyword\">standard form</span>, and how to shorten a number by <span class=\"learn-keyword\">approximation</span> (rounding). You also learn how to measure how wrong an approximation is, using <span class=\"learn-keyword\">percentage error</span>. In a Lagos market, a trader who says \"the bag of garri is about 50 kg\" is approximating. If the scale really shows 49.2 kg, she can say how big her error was. That is what we study here.</div>\n<h3 class=\"learn-subheading\">1. Numbers Greater Than 1 and Less Than 1</h3>\n<p class=\"learn-p\">Every number sits somewhere on the number line. A number <span class=\"learn-keyword\">greater than 1</span> is to the right of 1. Examples are 2, 7.5, 120 and 4,500. A number <span class=\"learn-keyword\">less than 1</span> (but more than 0) lies between 0 and 1. Examples are 0.5, 0.07 and 0.003. These are called <span class=\"learn-keyword\">decimals</span> (or decimal fractions) because they use a <span class=\"learn-keyword\">decimal point</span> to separate the whole part from the part that is smaller than 1.</p>\n<p class=\"learn-p\">The value of each digit depends on its <span class=\"learn-keyword\">place value</span>. Moving one place to the left makes the value 10 times bigger. Moving one place to the right makes it 10 times smaller.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Place</th><th>Thousands</th><th>Hundreds</th><th>Tens</th><th>Units</th><th>.</th><th>Tenths</th><th>Hundredths</th><th>Thousandths</th></tr></thead><tbody><tr><td>Value</td><td>1000</td><td>100</td><td>10</td><td>1</td><td>.</td><td>1/10 = 0.1</td><td>1/100 = 0.01</td><td>1/1000 = 0.001</td></tr><tr><td>Digits of 352.847</td><td></td><td>3</td><td>5</td><td>2</td><td>.</td><td>8</td><td>4</td><td>7</td></tr></tbody></table></div>\n<p class=\"learn-p\">So 352.847 means 3 hundreds + 5 tens + 2 units + 8 tenths + 4 hundredths + 7 thousandths. Notice that 0.5 is half of 1, so it is less than 1. And 0.05 is smaller than 0.5, because the 5 is now in the hundredths place.</p>\n<h4 class=\"learn-subsubheading\">Comparing and ordering decimals</h4>\n<p class=\"learn-p\">To compare decimals, line up the decimal points and compare digit by digit from the left. You may add zeros on the right of a decimal without changing its value. For example, 0.5 = 0.50 = 0.500. To order 0.5, 0.055, 0.505 and 0.05, write them with three decimal places: 0.500, 0.055, 0.505, 0.050. From smallest to biggest: 0.050, 0.055, 0.500, 0.505. So the order is 0.05, 0.055, 0.5, 0.505.</p>\n<h3 class=\"learn-subheading\">2. Powers of 10</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">power</span> tells you how many times a number is multiplied by itself. 10³ means 10 × 10 × 10 = 1000. The small raised number (3) is called the <span class=\"learn-keyword\">index</span> (plural: indices) or exponent. Powers of 10 are very important in this topic.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Power of 10</th><th>Value</th><th>Meaning</th></tr></thead><tbody><tr><td>10⁴</td><td>10,000</td><td>1 followed by 4 zeros</td></tr><tr><td>10³</td><td>1,000</td><td>1 followed by 3 zeros</td></tr><tr><td>10²</td><td>100</td><td>1 followed by 2 zeros</td></tr><tr><td>10¹</td><td>10</td><td>10 itself</td></tr><tr><td>10⁰</td><td>1</td><td>any number to the power 0 is 1</td></tr><tr><td>10⁻¹</td><td>0.1</td><td>1/10</td></tr><tr><td>10⁻²</td><td>0.01</td><td>1/100</td></tr><tr><td>10⁻³</td><td>0.001</td><td>1/1000</td></tr></tbody></table></div>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">negative index</span> means \"one divided by\". So 10⁻² = 1/10² = 1/100 = 0.01. Big numbers use positive indices. Small numbers (less than 1) use negative indices. Always remember this link: it is the key to standard form.</p>\n<h3 class=\"learn-subheading\">3. Standard Form (Scientific Notation)</h3>\n<p class=\"learn-p\">Writing a number like 300,000,000 or 0.000004 takes a lot of space and it is easy to miss a zero. <span class=\"learn-keyword\">Standard form</span> is a short, neat way to write such numbers. A number is in standard form when it is written as</p>\n<p class=\"learn-p\"><strong>A × 10ⁿ</strong> where A is at least 1 but less than 10 (1 ≤ A &lt; 10), and n is a whole number (positive, negative or zero).</p>\n<p class=\"learn-p\">So 4.5 × 10⁴ is in standard form, but 45 × 10³ is not (45 is bigger than 10) and 0.45 × 10⁵ is not (0.45 is less than 1).</p>\n<h4 class=\"learn-subsubheading\">Writing a big number (greater than 1) in standard form</h4>\n<ol class=\"learn-ordered\"><li>Step 1: Place the decimal point after the first non-zero digit. This gives A.</li><li>Step 2: Count how many places the decimal point moved to the left. This count is n (positive).</li><li>Step 3: Write A × 10ⁿ.</li></ol>\n<p class=\"learn-p\">Example: 45,000. The decimal point is at the end: 45000. Put it after the 4: 4.5000. It moved 4 places to the left. So 45,000 = 4.5 × 10⁴. Another example: the speed of light is about 300,000,000 m/s = 3 × 10⁸ m/s.</p>\n<h4 class=\"learn-subsubheading\">Writing a small number (less than 1) in standard form</h4>\n<ol class=\"learn-ordered\"><li>Step 1: Place the decimal point after the first non-zero digit. This gives A.</li><li>Step 2: Count how many places the decimal point moved to the right. This count is n, and the index is negative: −n.</li><li>Step 3: Write A × 10⁻ⁿ.</li></ol>\n<p class=\"learn-p\">Example: 0.00032. Put the point after the 3: 3.2. It moved 4 places to the right. So 0.00032 = 3.2 × 10⁻⁴. Another example: a sheet of paper is about 0.0001 m thick = 1 × 10⁻⁴ m.</p>\n<h4 class=\"learn-subsubheading\">Changing back from standard form</h4>\n<p class=\"learn-p\">For a positive index, move the decimal point to the right by n places (add zeros if needed). So 6.2 × 10⁵ = 620,000. For a negative index, move it to the left by n places. So 7.5 × 10⁻³ = 0.0075.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Write (a) 0.0000508 and (b) 3,750,000 in standard form. Then write 2.9 × 10⁻² as an ordinary number.<br>(a) 0.0000508: place the point after the first non-zero digit 5, giving 5.08. The point moved 5 places to the right. So 0.0000508 = 5.08 × 10⁻⁵.<br>(b) 3,750,000: put the point after 3, giving 3.75. It moved 6 places to the left. So 3,750,000 = 3.75 × 10⁶.<br>(c) 2.9 × 10⁻²: move the point 2 places to the left: 0.029.<br><strong>Answers:</strong> 5.08 × 10⁻⁵; 3.75 × 10⁶; 0.029.</div>\n<h3 class=\"learn-subheading\">4. Calculations with Standard Form</h3>\n<p class=\"learn-p\">To multiply, multiply the A parts and ADD the indices. To divide, divide the A parts and SUBTRACT the indices. The rule is: 10ᵐ × 10ⁿ = 10ᵐ⁺ⁿ and 10ᵐ ÷ 10ⁿ = 10ᵐ⁻ⁿ. If the answer's A part is not between 1 and 10, adjust it so the answer is back in standard form. To add or subtract, first write both numbers with the same power of 10 (or change them to ordinary numbers).</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> Calculate, leaving the answers in standard form. (a) (3 × 10⁴) × (2.5 × 10³) (b) (6 × 10⁸) ÷ (2 × 10³) (c) (5 × 10⁻³) × (4 × 10⁶) (d) (4.2 × 10³) + (3 × 10²).<br>(a) Multiply A parts: 3 × 2.5 = 7.5. Add indices: 4 + 3 = 7. Answer: 7.5 × 10⁷.<br>(b) Divide: 6 ÷ 2 = 3. Subtract indices: 8 − 3 = 5. Answer: 3 × 10⁵.<br>(c) 5 × 4 = 20. Indices: −3 + 6 = 3. So we have 20 × 10³. But 20 is not between 1 and 10, so write 20 = 2 × 10¹. Then 2 × 10¹ × 10³ = 2 × 10⁴.<br>(d) Change 3 × 10² to 0.3 × 10³. Then 4.2 × 10³ + 0.3 × 10³ = 4.5 × 10³. Check: 4200 + 300 = 4500 = 4.5 × 10³. <br><strong>Answers:</strong> 7.5 × 10⁷; 3 × 10⁵; 2 × 10⁴; 4.5 × 10³.</div>\n<h3 class=\"learn-subheading\">5. Decimal Places and Significant Figures</h3>\n<p class=\"learn-p\">Sometimes we do not need every digit of a number. We <span class=\"learn-keyword\">round</span> it to make it shorter. This is called <span class=\"learn-keyword\">approximation</span>. There are two common ways to say how much we have rounded.</p>\n<h4 class=\"learn-subsubheading\">Decimal places (d.p.)</h4>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Decimal places</span> count the digits after the decimal point. To round to 2 d.p., keep two digits after the point and look at the third digit. If it is 5 or more, increase the second digit by 1. If it is 4 or less, leave the second digit as it is. Example: 3.4672 to 2 d.p. = 3.47. And 0.06048 to 2 d.p. = 0.06.</p>\n<h4 class=\"learn-subsubheading\">Significant figures (s.f.)</h4>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Significant figures</span> count the digits that carry real meaning, starting from the first non-zero digit on the left. Use these rules:</p>\n<ul class=\"learn-list\"><li>All non-zero digits are significant. (4.826 has 4 s.f.)</li><li>Zeros between non-zero digits are significant. (3,005 has 4 s.f.)</li><li>Zeros at the beginning of a decimal are NOT significant. They only show the position of the point. (0.00472 has 3 s.f.: 4, 7, 2.)</li><li>Zeros at the end of a decimal ARE significant. (0.004050 has 4 s.f.: 4, 0, 5, 0.)</li><li>Zeros at the end of a whole number, such as 25,000, are only place holders unless the question says otherwise.</li></ul>\n<h4 class=\"learn-subsubheading\">How to round to a given number of significant figures</h4>\n<ol class=\"learn-ordered\"><li>Step 1: Count from the first non-zero digit and mark the last digit you will keep.</li><li>Step 2: Look at the next digit. If it is 5 or more, add 1 to the last digit you keep. If it is 4 or less, leave it.</li><li>Step 3: Replace the dropped digits with zeros if they are before the decimal point. If they come after the decimal point, just remove them.</li></ol>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Number</th><th>Rounded to</th><th>Answer</th><th>Reason</th></tr></thead><tbody><tr><td>3.14159</td><td>3 s.f.</td><td>3.14</td><td>next digit is 1, so keep 4</td></tr><tr><td>25,678</td><td>2 s.f.</td><td>26,000</td><td>next digit is 6, so 5 becomes 6; fill with zeros</td></tr><tr><td>0.0047582</td><td>2 s.f.</td><td>0.0048</td><td>first 2 s.f. are 4 and 7; next digit 5, so 7 becomes 8</td></tr><tr><td>1.9996</td><td>3 s.f.</td><td>2.00</td><td>999 rounds up to 1000, so we get 2.00</td></tr></tbody></table></div>\n<h3 class=\"learn-subheading\">6. Solving Problems on Approximation</h3>\n<p class=\"learn-p\">In real problems we round the final answer, not the numbers in the middle of the working. If you round too early, your answer may be slightly wrong. A good habit is to also make a quick <span class=\"learn-keyword\">estimate</span> first by rounding every number to 1 significant figure. The estimate tells you if your final answer is sensible.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> Evaluate 4.26 × 3.8 correct to 2 significant figures, and estimate (49.7 × 2.03) ÷ 9.8 first, then give the exact value to 3 s.f.<br>(a) 4.26 × 3.8: 4.26 × 3.8 = 16.188. The first two s.f. are 1 and 6. The next digit is 1 (less than 5), so we keep 6. Answer: 16.<br>(b) Estimate: 49.7 ≈ 50, 2.03 ≈ 2, 9.8 ≈ 10. So (50 × 2) ÷ 10 = 100 ÷ 10 = 10.<br>Exact: 49.7 × 2.03 = 100.891. Then 100.891 ÷ 9.8 = 10.295 (approximately). To 3 s.f. we look at the 4th digit, which is 5, so round up: 10.3. This is close to our estimate of 10, so the answer is sensible.<br><strong>Answers:</strong> 16; estimate 10; exact value 10.3 (3 s.f.).</div>\n<h3 class=\"learn-subheading\">7. Error and Percentage Error</h3>\n<p class=\"learn-p\">When we approximate or measure, the result is usually a little different from the true (exact) value. The difference is the <span class=\"learn-keyword\">error</span>.</p>\n<p class=\"learn-p\"><strong>Error = |approximate value − exact value|</strong> (we ignore any minus sign, so the error is always positive).</p>\n<p class=\"learn-p\">An error of 1 kg is serious if you weigh a baby, but tiny if you weigh a truck. So we compare the error with the size of the exact value. This gives the <span class=\"learn-keyword\">percentage error</span>:</p>\n<p class=\"learn-p\"><strong>Percentage error = (error ÷ exact value) × 100%</strong></p>\n<p class=\"learn-p\">Always divide by the exact (true) value, not by the approximate one, unless the question tells you otherwise.</p>\n<h4 class=\"learn-subsubheading\">Where percentage error is used</h4>\n<ul class=\"learn-list\"><li>Weighing and measuring: a trader's scale reads 49.2 kg for a bag that is truly 50 kg.</li><li>Rounding: 4,876 rounded to the nearest hundred becomes 4,900.</li><li>Science practicals: comparing your measured value with the accepted value.</li><li>Building and tailoring: a tape reads 20 cm to the nearest centimetre, so the true length may be up to 0.5 cm different.</li></ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> (a) A bag of rice is truly 50 kg but the scale reads 49.2 kg. Find the percentage error. (b) A student measures a table's length as 12.2 m but the true length is 12.5 m. Find the percentage error. (c) 4,876 is rounded to the nearest hundred. Find the percentage error to 2 s.f.<br>(a) Error = 50 − 49.2 = 0.8 kg. Percentage error = 0.8 ÷ 50 × 100 = 1.6%.<br>(b) Error = 12.5 − 12.2 = 0.3 m. Percentage error = 0.3 ÷ 12.5 × 100 = 2.4%.<br>(c) Rounded value = 4,900. Error = 4,900 − 4,876 = 24. Percentage error = 24 ÷ 4,876 × 100 = 0.4922...% = 0.49% (2 s.f.).<br><strong>Answers:</strong> 1.6%; 2.4%; 0.49%.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> <br>1. Writing 45 × 10³ or 0.45 × 10⁵ and calling it standard form. The first part must be at least 1 and less than 10.<br>2. Counting leading zeros as significant figures. In 0.00472 the zeros are not significant, so it has 3 s.f., not 5.<br>3. Mixing up the sign of the index. Big numbers have positive indices (3 × 10⁸) and numbers less than 1 have negative indices (3 × 10⁻⁸).<br>4. Dividing by the approximate value instead of the exact value when finding percentage error.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC and NECO often ask: \"Express 0.00045 in standard form\", \"Correct 0.04052 to 2 significant figures\" or \"Find the percentage error if 3.14 is used for 3.142\". Always show the step where you divide the error by the exact value, because method marks are given. Write your final answer to the number of s.f. or d.p. asked. If the question does not say, a safe choice is 3 s.f.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> <br>• A number greater than 1 has a value above 1; a number less than 1 lies between 0 and 1.<br>• Standard form is A × 10ⁿ with 1 ≤ A &lt; 10.<br>• Big numbers use positive n; small numbers use negative n.<br>• Multiply: add indices. Divide: subtract indices.<br>• Round to d.p. by looking at the digit after the last one kept; count s.f. from the first non-zero digit.<br>• Percentage error = (|approximate − exact| ÷ exact) × 100%.</div>",
    "questions": [
      {
        "q": "What is 45,000 in standard form?",
        "o": [
          "4.5 × 10⁴",
          "45 × 10³",
          "0.45 × 10⁵",
          "4.5 × 10³"
        ],
        "a": 0,
        "e": "The decimal point moves 4 places to the left to give 4.5, so 45,000 = 4.5 × 10⁴. The forms 45 × 10³ and 0.45 × 10⁵ are not standard form because the first number is not between 1 and 10.",
        "h": "Move the point until only one non-zero digit is before it.",
        "yr": "SS2"
      },
      {
        "q": "Write 0.00032 in standard form.",
        "o": [
          "3.2 × 10⁻³",
          "3.2 × 10⁻⁴",
          "3.2 × 10⁴",
          "32 × 10⁻⁵"
        ],
        "a": 1,
        "e": "The decimal point moves 4 places to the right to get 3.2, so the index is −4. Hence 0.00032 = 3.2 × 10⁻⁴. 3.2 × 10⁻³ would be 0.0032, and 32 × 10⁻⁵ is not in standard form.",
        "h": "Numbers less than 1 need a negative index.",
        "yr": "SS2"
      },
      {
        "q": "How many significant figures are in 0.004050?",
        "o": [
          "3",
          "5",
          "4",
          "6"
        ],
        "a": 2,
        "e": "Zeros at the beginning of a decimal are not significant. The significant digits are 4, 0, 5 and 0, because the last zero after the decimal point is significant. So there are 4 s.f., not 3 and not 6.",
        "h": "Start counting at the first non-zero digit.",
        "yr": "SS2"
      },
      {
        "q": "Percentage error is calculated as",
        "o": [
          "(exact value ÷ error) × 100%",
          "(error ÷ approximate value) × 10%",
          "error × exact value ÷ 100%",
          "(error ÷ exact value) × 100%"
        ],
        "a": 3,
        "e": "Percentage error compares the size of the error with the exact (true) value and changes it to a percentage: (error ÷ exact value) × 100%. Dividing by the approximate value or turning it upside down gives a wrong result.",
        "h": "Which number is the \"true\" one?",
        "yr": "SS2"
      },
      {
        "q": "Which of these is written in standard form?",
        "o": [
          "6.7 × 10⁻²",
          "67 × 10⁻³",
          "0.67 × 10⁻¹",
          "10 × 10⁻³"
        ],
        "a": 0,
        "e": "In standard form the first number must be at least 1 and less than 10. Only 6.7 fits. 67, 0.67 and 10 do not fit that rule.",
        "h": "Check the first number only: is it between 1 and 10?",
        "yr": "SS2"
      },
      {
        "q": "Correct 25,678 to 2 significant figures.",
        "o": [
          "25,000",
          "26,000",
          "25,700",
          "26,700"
        ],
        "a": 1,
        "e": "The first 2 s.f. are 2 and 5. The next digit is 6, which is 5 or more, so 5 rises to 6. The remaining digits become zeros, giving 26,000. 25,700 is 3 s.f., not 2.",
        "h": "Look at the third digit to decide whether to round up.",
        "yr": "SS2"
      },
      {
        "q": "Correct 0.0047582 to 2 significant figures.",
        "o": [
          "0.0047",
          "0.005",
          "0.0048",
          "0.00476"
        ],
        "a": 2,
        "e": "The zeros at the start do not count. The first 2 s.f. are 4 and 7. The next digit is 5, so 7 rises to 8, giving 0.0048. 0.0047 forgets to round up, and 0.00476 has 3 s.f.",
        "h": "Ignore the zeros at the front when counting.",
        "yr": "SS2"
      },
      {
        "q": "Arrange 0.5, 0.055, 0.505 and 0.05 from the smallest to the biggest.",
        "o": [
          "0.5, 0.505, 0.055, 0.05",
          "0.055, 0.05, 0.5, 0.505",
          "0.05, 0.5, 0.055, 0.505",
          "0.05, 0.055, 0.5, 0.505"
        ],
        "a": 3,
        "e": "Write all as three decimal places: 0.500, 0.055, 0.505, 0.050. The order is 0.050, 0.055, 0.500, 0.505. Many students think 0.055 is bigger than 0.5 because 55 is bigger than 5, but that is wrong.",
        "h": "Give every number the same number of decimal places.",
        "yr": "SS2"
      },
      {
        "q": "What is 6.2 × 10⁵ as an ordinary number?",
        "o": [
          "620,000",
          "62,000",
          "6,200,000",
          "0.000062"
        ],
        "a": 0,
        "e": "A positive index of 5 means move the decimal point 5 places to the right: 6.2 becomes 620000. 62,000 comes from 10⁴ and 6,200,000 from 10⁶.",
        "h": "Move the point to the right by the index.",
        "yr": "SS2"
      },
      {
        "q": "Correct 1.9996 to 3 significant figures.",
        "o": [
          "1.99",
          "2.00",
          "2.0",
          "1.90"
        ],
        "a": 1,
        "e": "The first 3 s.f. are 1, 9, 9. The next digit is 9, so we round up. 1.99 + 0.01 = 2.00. We write 2.00 to show 3 s.f. The answer 1.99 forgets to round up.",
        "h": "Rounding up 199 gives 200.",
        "yr": "SS2"
      },
      {
        "q": "Evaluate (3 × 10⁴) × (2.5 × 10³) in standard form.",
        "o": [
          "7.5 × 10¹²",
          "5.5 × 10⁷",
          "7.5 × 10⁷",
          "7.5 × 10¹"
        ],
        "a": 2,
        "e": "Multiply the first parts: 3 × 2.5 = 7.5. Add the indices: 4 + 3 = 7. So the answer is 7.5 × 10⁷. Multiplying the indices (giving 10¹²) is a common mistake.",
        "h": "When multiplying powers of 10, add the indices.",
        "yr": "SS2"
      },
      {
        "q": "Calculate 4.26 × 3.8 and give the answer to 2 significant figures.",
        "o": [
          "16.2",
          "17",
          "1.6",
          "16"
        ],
        "a": 3,
        "e": "4.26 × 3.8 = 16.188. The first 2 s.f. are 1 and 6, and the next digit 1 is less than 5, so we keep 16. The value 16.2 is 3 s.f.",
        "h": "Work out the exact product first, then round once.",
        "yr": "SS2"
      },
      {
        "q": "A student measures a length as 12.2 m. The true length is 12.5 m. What is the percentage error?",
        "o": [
          "2.4%",
          "2.5%",
          "0.3%",
          "3.0%"
        ],
        "a": 0,
        "e": "Error = 12.5 − 12.2 = 0.3 m. Percentage error = 0.3 ÷ 12.5 × 100 = 2.4%. If you divide by the measured 12.2 you get about 2.5%, which is wrong because we divide by the exact value.",
        "h": "Divide the error by the true length.",
        "yr": "SS2"
      },
      {
        "q": "4,876 is rounded to the nearest hundred. Find the percentage error to 2 significant figures.",
        "o": [
          "0.24%",
          "0.49%",
          "4.9%",
          "24%"
        ],
        "a": 1,
        "e": "The rounded value is 4,900, so the error is 4,900 − 4,876 = 24. Percentage error = 24 ÷ 4,876 × 100 = 0.492...%, which is 0.49% to 2 s.f. The value 24% forgets to divide by 4,876.",
        "h": "First find the error, then divide by 4,876.",
        "yr": "SS2"
      },
      {
        "q": "A scale reads 49.2 kg for a bag of rice whose true mass is 50 kg. What is the percentage error?",
        "o": [
          "0.8%",
          "16%",
          "1.6%",
          "0.16%"
        ],
        "a": 2,
        "e": "The error is 50 − 49.2 = 0.8 kg. Percentage error = 0.8 ÷ 50 × 100 = 1.6%. The answer 0.8% forgets to divide correctly, while 16% has the decimal point in the wrong place.",
        "h": "Error = 0.8 kg; now divide by 50.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Use of Logarithm Tables and Calculators",
    "topicCode": "SS2-MATH-02",
    "module": "Numbers and Numeration",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\">Before calculators became common, people used <span class=\"learn-keyword\">logarithm</span> tables to do long multiplication, division, powers and roots quickly. A logarithm turns hard work like multiplying into easy work like adding. Imagine a trader in Onitsha market who must multiply 3.84 by 25.6 without a calculator. With logarithms she only needs to add two small numbers and look up one answer. WAEC still asks questions on logarithm tables, and the same ideas help you understand the <span class=\"learn-keyword\">log</span> button on your calculator.</div>\n<h3 class=\"learn-subheading\">1. What Is a Logarithm?</h3>\n<p class=\"learn-p\">Remember that 10² = 100. We say that the <span class=\"learn-keyword\">logarithm</span> of 100 to base 10 is 2. We write log 100 = 2. In the same way, log 1000 = 3 because 10³ = 1000, and log 10 = 1 because 10¹ = 10. So the logarithm of a number is the <span class=\"learn-keyword\">index</span> (power) to which 10 must be raised to give that number.</p>\n<p class=\"learn-p\">In general: if N = 10ˣ, then log N = x. In this topic every logarithm is to base 10, and we simply write log N.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Number</th><th>Written as a power of 10</th><th>Logarithm</th></tr></thead><tbody><tr><td>1,000</td><td>10³</td><td>3</td></tr><tr><td>100</td><td>10²</td><td>2</td></tr><tr><td>10</td><td>10¹</td><td>1</td></tr><tr><td>1</td><td>10⁰</td><td>0</td></tr><tr><td>0.1</td><td>10⁻¹</td><td>−1</td></tr><tr><td>0.01</td><td>10⁻²</td><td>−2</td></tr></tbody></table></div>\n<p class=\"learn-p\">For numbers that are not exact powers of 10, such as 4.37, the logarithm is a decimal number. Since 4.37 is between 1 and 10, its logarithm is between 0 and 1. We will find it in the table: log 4.37 = 0.6405.</p>\n<h3 class=\"learn-subheading\">2. The Laws of Logarithms</h3>\n<p class=\"learn-p\">These three laws are the reason logarithms make calculations easy. They come from the laws of indices.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Operation</th><th>Law</th><th>Meaning in words</th></tr></thead><tbody><tr><td>Multiplication</td><td>log (a × b) = log a + log b</td><td>to multiply, ADD the logs</td></tr><tr><td>Division</td><td>log (a ÷ b) = log a − log b</td><td>to divide, SUBTRACT the logs</td></tr><tr><td>Power</td><td>log (aⁿ) = n × log a</td><td>for a power, MULTIPLY the log by the index</td></tr><tr><td>Root</td><td>log (ⁿ√a) = (log a) ÷ n</td><td>for a root, DIVIDE the log by the root number</td></tr></tbody></table></div>\n<h3 class=\"learn-subheading\">3. Characteristic and Mantissa</h3>\n<p class=\"learn-p\">Every logarithm has two parts. The whole-number part is the <span class=\"learn-keyword\">characteristic</span>. The decimal part is the <span class=\"learn-keyword\">mantissa</span>. In log 4.37 = 0.6405, the characteristic is 0 and the mantissa is 0.6405. In log 437 = 2.6405, the characteristic is 2 and the mantissa is 0.6405. Notice that 4.37, 43.7, 437 and 4370 all have the same mantissa. Only the characteristic changes.</p>\n<h4 class=\"learn-subsubheading\">How to find the characteristic</h4>\n<p class=\"learn-p\">Write the number in standard form, A × 10ⁿ. The characteristic is n. For a number greater than 1, n is one less than the number of digits before the decimal point. For a number less than 1, n is negative and we write it with a <span class=\"learn-keyword\">bar</span> sign over the number, for example 2̅ (read as \"bar 2\").</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Number</th><th>Standard form</th><th>Characteristic</th><th>Logarithm</th></tr></thead><tbody><tr><td>4,370</td><td>4.37 × 10³</td><td>3</td><td>3.6405</td></tr><tr><td>43.7</td><td>4.37 × 10¹</td><td>1</td><td>1.6405</td></tr><tr><td>4.37</td><td>4.37 × 10⁰</td><td>0</td><td>0.6405</td></tr><tr><td>0.437</td><td>4.37 × 10⁻¹</td><td>1̅</td><td>1̅.6405</td></tr><tr><td>0.0437</td><td>4.37 × 10⁻²</td><td>2̅</td><td>2̅.6405</td></tr></tbody></table></div>\n<p class=\"learn-p\">The bar means that only the characteristic is negative. The mantissa is always positive. So 2̅.6405 means −2 + 0.6405 = −1.3595. Do not read it as −2.6405.</p>\n<h3 class=\"learn-subheading\">4. Reading the Logarithm Table</h3>\n<p class=\"learn-p\">A four-figure logarithm table gives the mantissa only. Follow these steps to find log 4.372:</p>\n<ol class=\"learn-ordered\"><li>Step 1: Ignore the decimal point and any zeros at the front. Use the digits 4, 3, 7, 2.</li><li>Step 2: Look down the left column for the first two digits (43).</li><li>Step 3: Move along that row to the column headed by the third digit (7). You read 6405.</li><li>Step 4: Move further to the \"mean difference\" (add) columns and find the column for the fourth digit (2). Read the small number there (2) and ADD it to 6405. This gives 6407.</li><li>Step 5: Write the mantissa as .6407 and put the characteristic in front. Since 4.372 has one digit before the point, the characteristic is 0. So log 4.372 = 0.6407.</li></ol>\n<h4 class=\"learn-subsubheading\">Antilogarithm</h4>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">antilogarithm</span> (antilog) is the opposite step. It changes a logarithm back to an ordinary number. Use the antilog table with the mantissa only, then use the characteristic to place the decimal point. For example, antilog 0.6405 = 4.37. If the characteristic is 2, the number is 437. If the characteristic is 1̅, the number is 0.437. In standard form the antilog of n.xxxx is (digits found) × 10ⁿ.</p>\n<h3 class=\"learn-subheading\">5. Multiplication and Division</h3>\n<p class=\"learn-p\">Always set out your work in a table with columns for Number and Log. This avoids mistakes and earns method marks.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Use logarithm tables to evaluate 3.84 × 25.6.<br>Number | Log<br>3.84 → 0.5843<br>25.6 → 1.4082<br>Add the logs (multiplication): 0.5843 + 1.4082 = 1.9925.<br>Antilog of 1.9925: the mantissa 0.9925 gives the digits 9.83 and the characteristic 1 makes it 9.83 × 10¹ = 98.3.<br><strong>Answer:</strong> 98.3 (3 s.f.). Check: 3.84 × 25.6 = 98.304. ✓</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> Evaluate 78.4 ÷ 3.25 using logarithm tables.<br>log 78.4 = 1.8943 and log 3.25 = 0.5119.<br>Subtract the logs (division): 1.8943 − 0.5119 = 1.3824.<br>Antilog of 1.3824 = 24.1 (the mantissa 0.3824 gives 2.41 and the characteristic 1 gives 2.41 × 10¹).<br><strong>Answer:</strong> 24.1 (3 s.f.). Check: 78.4 ÷ 3.25 = 24.12. ✓</div>\n<h3 class=\"learn-subheading\">6. Powers and Roots</h3>\n<p class=\"learn-p\">For a power, multiply the logarithm by the index. For a root, divide the logarithm by the root number. When the logarithm has a bar, be very careful: keep the negative whole part and the positive decimal part separate.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> Evaluate (a) 2.35³ and (b) √0.0529 using logarithm tables.<br>(a) log 2.35 = 0.3711. Multiply by 3: 3 × 0.3711 = 1.1133. Antilog of 1.1133 = 12.98 (digits 1.298 × 10¹). <strong>Answer:</strong> 13.0 (3 s.f.). Check: 2.35 × 2.35 × 2.35 = 12.978. ✓<br>(b) 0.0529 = 5.29 × 10⁻², so log 0.0529 = 2̅.7235.<br>To divide 2̅.7235 by 2: write it as −2 + 0.7235. Divide each part by 2. We get −1 and 0.7235 ÷ 2 = 0.36175. So the answer is −1 + 0.3618 = 1̅.3618.<br>Antilog of 1̅.3618 = 0.2300.<br><strong>Answer:</strong> 0.23. Check: 0.23 × 0.23 = 0.0529. ✓</div>\n<h4 class=\"learn-subsubheading\">A trick for bar logarithms</h4>\n<p class=\"learn-p\">When you divide a bar number and the characteristic does not divide evenly, add and subtract the same number first. For example, to divide 3̅.6000 by 2, write it as 4̅ + 1.6000 (we added 1 to the decimal part and subtracted 1 from the whole part). Now divide: 4̅ ÷ 2 = 2̅ and 1.6000 ÷ 2 = 0.8000. The answer is 2̅.8000.</p>\n<h3 class=\"learn-subheading\">7. Mixed Problems and Approximation</h3>\n<p class=\"learn-p\">Most WAEC questions combine several operations. Write every number's logarithm in the table. Add the logs of numbers on top (numerator). Subtract the logs of numbers at the bottom (denominator). Then take the antilog. The answer is usually given to 3 significant figures because a four-figure table is accurate only to about that level.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Use logarithm tables to evaluate (4.56 × 0.0832) ÷ 7.9, correct to 3 significant figures.<br>Number | Log<br>4.56 → 0.6590<br>0.0832 → 2̅.9201<br>7.9 → 0.8976<br>Add the top logs: 0.6590 + 2̅.9201. The decimals add to 1.5791 and the whole parts: 1 (carried) + (−2) = −1. So the sum is 1̅.5791.<br>Subtract log 7.9: 1̅.5791 − 0.8976. Think of 1̅.5791 as −1 + 0.5791 = −0.4209. Then −0.4209 − 0.8976 = −1.3185 = 2̅.6815.<br>Antilog of 2̅.6815 = 4.80 × 10⁻² = 0.0480.<br><strong>Answer:</strong> 0.0480 (3 s.f.). Check: 4.56 × 0.0832 ÷ 7.9 = 0.04803. ✓</div>\n<p class=\"learn-p\">To check any answer, make a quick estimate first. In Worked Example 4, 4.56 ≈ 5, 0.0832 ≈ 0.08 and 7.9 ≈ 8. So 5 × 0.08 ÷ 8 = 0.05. Our answer 0.0480 is close, so it is sensible.</p>\n<h3 class=\"learn-subheading\">8. Using a Calculator</h3>\n<p class=\"learn-p\">A scientific calculator has a \"log\" key (base 10) and a \"10ˣ\" key (the antilog, often pressed with SHIFT). To find log 4.37, press log, then 4.37, then =. You get 0.64048... To find the antilog of 1.9925, press SHIFT then log (10ˣ), type 1.9925 and press =. You get 98.28... The calculator gives more decimal places than the table, so your answer may differ slightly in the last figure. That is acceptable. The calculator also does the bar logarithms automatically: log 0.0437 shows −1.3595, which is the same as 2̅.6405. Remember that in the exam you must still show the table method if the question says \"use logarithm tables\".</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> 1. Reading 2̅.7235 as −2.7235. The bar is only over the characteristic: it means −2 + 0.7235.<br>2. Adding the logs when you should subtract (division) or the other way round.<br>3. Using the wrong characteristic for numbers less than 1. 0.0529 has characteristic 2̅, not 2.<br>4. Forgetting the mean difference (add) column for the fourth digit, and rounding the final answer to the wrong number of figures.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC says \"Using logarithm tables, evaluate ...\" and expects a neat table of Number and Log with the characteristic correct. Show each step: the logs, the addition or subtraction, and the antilog. Give the answer to 3 significant figures unless told otherwise. Method marks are given even if one table value is misread.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> • log N is the power of 10 that gives N. log 100 = 2.<br>• Multiply: add logs. Divide: subtract logs. Power: multiply the log by the index. Root: divide the log by the root number.<br>• Characteristic = the power of 10 in standard form; mantissa = the decimal part from the table.<br>• A bar like 2̅ means only the whole part is negative: 2̅.7235 = −2 + 0.7235.<br>• Antilog changes a log back to a number; the characteristic places the decimal point.<br>• A calculator uses log and 10ˣ keys, and its answer may differ slightly from the table.</div>",
    "questions": [
      {
        "q": "What is the value of log 1000 (to base 10)?",
        "o": [
          "3",
          "1",
          "10",
          "1000"
        ],
        "a": 0,
        "e": "10 to the power 3 is 1000, so log 1000 = 3. The logarithm is the index, not the number 1000 itself.",
        "h": "What power of 10 gives 1000?",
        "yr": "SS2"
      },
      {
        "q": "Which law of logarithms is correct?",
        "o": [
          "log (a × b) = log a × log b",
          "log (a × b) = log a + log b",
          "log (a ÷ b) = log a ÷ log b",
          "log (a × b) = log a − log b"
        ],
        "a": 1,
        "e": "Multiplying numbers means adding their logarithms. Students often multiply the logarithms by mistake, which is wrong.",
        "h": "Multiplication becomes something easier.",
        "yr": "SS2"
      },
      {
        "q": "What is the characteristic of log 437?",
        "o": [
          "3",
          "0",
          "2",
          "4"
        ],
        "a": 2,
        "e": "437 = 4.37 × 10², so the characteristic is 2. It is one less than the 3 digits before the decimal point, not 3.",
        "h": "Write 437 in standard form.",
        "yr": "SS2"
      },
      {
        "q": "What is the characteristic of log 0.0437?",
        "o": [
          "2",
          "1̅",
          "3̅",
          "2̅"
        ],
        "a": 3,
        "e": "0.0437 = 4.37 × 10⁻², so the characteristic is −2, written as 2̅. The positive 2 is for numbers like 437.",
        "h": "Count the places the point moves to the right.",
        "yr": "SS2"
      },
      {
        "q": "In log 4,370 = 3.6405, what is the mantissa?",
        "o": [
          "0.6405",
          "3.6405",
          "3",
          "0.3"
        ],
        "a": 0,
        "e": "The mantissa is the decimal part, 0.6405. The characteristic is the whole-number part, 3.",
        "h": "The mantissa is the part after the point.",
        "yr": "SS2"
      },
      {
        "q": "To divide 78.4 by 3.25 using logarithms, you should",
        "o": [
          "add log 78.4 and log 3.25",
          "subtract log 3.25 from log 78.4",
          "divide log 78.4 by log 3.25",
          "multiply log 78.4 by log 3.25"
        ],
        "a": 1,
        "e": "Division of numbers corresponds to subtraction of logarithms. Adding the logs would give a multiplication.",
        "h": "Division is the opposite of multiplication.",
        "yr": "SS2"
      },
      {
        "q": "What does 2̅.7235 mean?",
        "o": [
          "−2.7235",
          "2 − 0.7235",
          "−2 + 0.7235",
          "−2 − 0.7235"
        ],
        "a": 2,
        "e": "Only the characteristic is negative. The mantissa 0.7235 is positive, so 2̅.7235 = −2 + 0.7235 = −1.2765, not −2.7235.",
        "h": "Which part carries the bar?",
        "yr": "SS2"
      },
      {
        "q": "Using the antilog table, if log N = 1.9925 and the digits for 0.9925 are 9.83, then N is",
        "o": [
          "9.83",
          "983",
          "0.983",
          "98.3"
        ],
        "a": 3,
        "e": "The characteristic 1 means N = 9.83 × 10¹ = 98.3. A characteristic of 0 would give 9.83 and 2 would give 983.",
        "h": "Characteristic 1 means multiply by 10¹.",
        "yr": "SS2"
      },
      {
        "q": "Evaluate 3.84 × 25.6 using logarithms, given log 3.84 = 0.5843 and log 25.6 = 1.4082. Give the answer to 3 s.f.",
        "o": [
          "98.3",
          "9.83",
          "0.983",
          "1.99"
        ],
        "a": 0,
        "e": "Add the logs: 0.5843 + 1.4082 = 1.9925. The antilog of 1.9925 is 98.3. The value 1.99 is the log, not the answer.",
        "h": "Add, then take the antilog.",
        "yr": "SS2"
      },
      {
        "q": "Given log 2.35 = 0.3711, the value of log (2.35³) is",
        "o": [
          "0.1237",
          "1.1133",
          "1.0711",
          "3.3711"
        ],
        "a": 1,
        "e": "For a power, multiply the log by the index: 3 × 0.3711 = 1.1133. Adding 3 to the log or cubing it is wrong.",
        "h": "Multiply the log by 3.",
        "yr": "SS2"
      },
      {
        "q": "Given log 5.29 = 0.7235, the log of √0.0529 is",
        "o": [
          "2̅.3618",
          "1̅.7235",
          "1̅.3618",
          "0.3618"
        ],
        "a": 2,
        "e": "log 0.0529 = 2̅.7235 = −2 + 0.7235. Dividing by 2 gives −1 + 0.36175 = 1̅.3618. The characteristic −2 becomes −1, not −2.",
        "h": "Halve both the −2 and the 0.7235.",
        "yr": "SS2"
      },
      {
        "q": "Evaluate (4.56 × 0.0832) ÷ 7.9 to 3 s.f., given log 4.56 = 0.6590, log 0.0832 = 2̅.9201 and log 7.9 = 0.8976.",
        "o": [
          "0.480",
          "0.00480",
          "4.80",
          "0.0480"
        ],
        "a": 3,
        "e": "log of top = 0.6590 + 2̅.9201 = 1̅.5791. Subtract 0.8976 to get 2̅.6815. The antilog is 4.80 × 10⁻² = 0.0480. A wrong characteristic changes the position of the decimal point.",
        "h": "Subtract the denominator's log at the end.",
        "yr": "SS2"
      },
      {
        "q": "The characteristic of the logarithm of 0.0006 is",
        "o": [
          "4̅",
          "3̅",
          "4",
          "3"
        ],
        "a": 0,
        "e": "0.0006 = 6 × 10⁻⁴, so the characteristic is −4, written 4̅. Students often write 3̅ by counting zeros instead of moving the point past the first non-zero digit.",
        "h": "Write it in standard form.",
        "yr": "SS2"
      },
      {
        "q": "Using a calculator, log 4.37 is approximately",
        "o": [
          "4.37",
          "0.6405",
          "1.4748",
          "0.4370"
        ],
        "a": 1,
        "e": "The log key gives log 4.37 = 0.64048..., which rounds to 0.6405. Pressing ln instead would give 1.4748, which is natural logarithm and not base 10.",
        "h": "Use the log key, not ln.",
        "yr": "SS2"
      },
      {
        "q": "Which of these is a sensible quick estimate of (49.7 × 2.03) ÷ 9.8 before using logarithms?",
        "o": [
          "100",
          "1",
          "10",
          "0.1"
        ],
        "a": 2,
        "e": "Round to 50 × 2 ÷ 10 = 10. If your logarithm answer is not near 10, something is wrong in the working. The exact answer is 10.3.",
        "h": "Round every number to 1 s.f.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Sequences and Series",
    "topicCode": "SS2-MATH-03",
    "module": "Sequences and Series",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\">A <span class=\"learn-keyword\">sequence</span> is a list of numbers that follow a pattern, one after another. When you climb stairs, count danfo buses at a bus stop or watch the amount in your savings box grow by the same amount each week, you meet sequences. If a trader saves ₦500 in week 1, ₦700 in week 2, ₦900 in week 3 and so on, her savings form a sequence with a clear rule. In this topic you learn what a sequence is, the main types, and the special type called an <span class=\"learn-keyword\">arithmetic progression</span> (AP). You also learn the formulae that let you find any term, or the total of many terms, without writing them all out.</div>\n<h3 class=\"learn-subheading\">1. Meaning of a Sequence</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">sequence</span> is a set of numbers arranged in order according to a rule. Each number in the sequence is called a <span class=\"learn-keyword\">term</span>. We write the terms as T₁, T₂, T₃, ... where T₁ is the first term, T₂ is the second term, and Tₙ is the <span class=\"learn-keyword\">nth term</span> (the term in position n). The three dots mean the sequence continues.</p>\n<p class=\"learn-p\">Example: 2, 4, 6, 8, 10, ... The first term T₁ = 2, the second term T₂ = 4, and the rule is \"add 2 to the last term\". So the next term is 10 + 2 = 12.</p>\n<h3 class=\"learn-subheading\">2. Types of Sequences</h3>\n<p class=\"learn-p\">Sequences are named by their rule. You should know these common types.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Type</th><th>Rule</th><th>Example</th></tr></thead><tbody><tr><td>Arithmetic progression (AP)</td><td>add the same number each time</td><td>3, 7, 11, 15, ...</td></tr><tr><td>Geometric progression (GP)</td><td>multiply by the same number each time</td><td>2, 6, 18, 54, ...</td></tr><tr><td>Square numbers</td><td>1², 2², 3², 4², ...</td><td>1, 4, 9, 16, 25, ...</td></tr><tr><td>Odd numbers</td><td>start at 1, add 2</td><td>1, 3, 5, 7, ...</td></tr><tr><td>Even numbers</td><td>start at 2, add 2</td><td>2, 4, 6, 8, ...</td></tr><tr><td>Triangular numbers</td><td>add 2, then 3, then 4, ...</td><td>1, 3, 6, 10, 15, ...</td></tr></tbody></table></div>\n<p class=\"learn-p\">In this topic our main concern is the arithmetic progression. A geometric progression is only shown so you can tell the two apart. In 2, 6, 18, 54 we multiply by 3 each time, so it is not an AP.</p>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">series</span> is what you get when you add the terms of a sequence. For the sequence 2, 4, 6, 8, the series is 2 + 4 + 6 + 8, and its total (sum) is 20. So a sequence is a list; a series is a sum.</p>\n<h3 class=\"learn-subheading\">3. Arithmetic Progression and the Common Difference</h3>\n<p class=\"learn-p\">An <span class=\"learn-keyword\">arithmetic progression</span> (AP) is a sequence in which the difference between any term and the one before it is always the same. This fixed number is called the <span class=\"learn-keyword\">common difference</span>, written d.</p>\n<p class=\"learn-p\"><strong>d = any term − the term before it</strong>, for example d = T₂ − T₁ = T₃ − T₂.</p>\n<ul class=\"learn-list\"><li>In 3, 7, 11, 15: d = 7 − 3 = 4 (also 11 − 7 = 4). The terms are increasing.</li><li>In 12, 9, 6, 3: d = 9 − 12 = −3. The terms are decreasing, so d is negative.</li><li>In 5, 5, 5, 5: d = 0. Every term is the same.</li><li>In 1, 2, 4, 8: the differences are 1, 2, 4. They are not equal, so this is NOT an AP.</li></ul>\n<p class=\"learn-p\">The first term is called a. So an AP looks like: a, a + d, a + 2d, a + 3d, ... Notice that the number multiplied by d is always one less than the position of the term. The 2nd term is a + 1d, the 3rd term is a + 2d, the 4th term is a + 3d.</p>\n<h3 class=\"learn-subheading\">4. The Formula for the nth Term</h3>\n<p class=\"learn-p\">From the pattern above, the term in position n is a + (n − 1)d. So:</p>\n<p class=\"learn-p\"><strong>Tₙ = a + (n − 1)d</strong></p>\n<p class=\"learn-p\">where a = first term, d = common difference, n = position of the term (number of the term). Use this formula to find any term, or to find a, d or n when the others are known.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Find the 20th term of the AP 3, 7, 11, 15, ...<br>Step 1: a = 3, d = 7 − 3 = 4, n = 20.<br>Step 2: Tₙ = a + (n − 1)d = 3 + (20 − 1) × 4 = 3 + 19 × 4 = 3 + 76 = 79.<br><strong>Answer:</strong> The 20th term is 79.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> How many terms are in the AP 5, 9, 13, ..., 101?<br>Step 1: a = 5, d = 9 − 5 = 4, and the last term Tₙ = 101.<br>Step 2: 101 = 5 + (n − 1) × 4. So 101 − 5 = (n − 1) × 4, that is 96 = 4(n − 1).<br>Step 3: n − 1 = 96 ÷ 4 = 24. So n = 25.<br><strong>Answer:</strong> There are 25 terms. Check: 5 + 24 × 4 = 5 + 96 = 101. ✓</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> The 7th term of an AP is 20 and the 12th term is 35. Find the first term and the common difference.<br>Step 1: Use Tₙ = a + (n − 1)d. For the 7th term: a + 6d = 20 ... (i). For the 12th term: a + 11d = 35 ... (ii).<br>Step 2: Subtract (i) from (ii): 5d = 15, so d = 3.<br>Step 3: Put d = 3 in (i): a + 18 = 20, so a = 2.<br><strong>Answer:</strong> a = 2 and d = 3. Check: T₁₂ = 2 + 11 × 3 = 35. ✓</div>\n<h3 class=\"learn-subheading\">5. The Sum of the First n Terms</h3>\n<p class=\"learn-p\">Adding a long list of terms is slow. A famous story says a young pupil called Gauss added the numbers 1 to 100 quickly by pairing them: 1 + 100 = 101, 2 + 99 = 101, 3 + 98 = 101, and so on. There are 50 such pairs, so the sum is 50 × 101 = 5,050. This is the idea behind the sum formula.</p>\n<p class=\"learn-p\">The sum of the first n terms is written Sₙ. Write the series forwards and backwards. Each pair of terms adds up to the same number (the first term plus the last term). This gives:</p>\n<p class=\"learn-p\"><strong>Sₙ = (n/2)[2a + (n − 1)d]</strong></p>\n<p class=\"learn-p\">If you know the last term l (the nth term), you can also use a simpler form:</p>\n<p class=\"learn-p\"><strong>Sₙ = (n/2)(a + l)</strong></p>\n<p class=\"learn-p\">Use the first form when you know a, d and n. Use the second form when you know the first and last terms.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Find the sum of the first 20 terms of 3, 7, 11, 15, ...<br>Step 1: a = 3, d = 4, n = 20.<br>Step 2: Sₙ = (n/2)[2a + (n − 1)d] = (20/2)[2 × 3 + 19 × 4] = 10 × [6 + 76] = 10 × 82 = 820.<br>Step 3: Check using the last term. From Example 1, T₂₀ = 79. So S₂₀ = (20/2)(3 + 79) = 10 × 82 = 820. ✓<br><strong>Answer:</strong> 820.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 5:</strong> Find the sum of the first 15 terms of the AP in Example 3 (a = 2, d = 3).<br>Step 1: n = 15, a = 2, d = 3.<br>Step 2: S₁₅ = (15/2)[2 × 2 + 14 × 3] = 7.5 × [4 + 42] = 7.5 × 46 = 345.<br><strong>Answer:</strong> 345.</div>\n<h4 class=\"learn-subsubheading\">Finding a term from the sum</h4>\n<p class=\"learn-p\">If you are given a formula for Sₙ, then the nth term is the difference between two sums: Tₙ = Sₙ − Sₙ₋₁. For example, if Sₙ = 3n² − 2n then T₅ = S₅ − S₄ = (75 − 10) − (48 − 8) = 65 − 40 = 25.</p>\n<h3 class=\"learn-subheading\">6. Applications in Problem Solving</h3>\n<p class=\"learn-p\">Whenever something increases or decreases by the same amount each time, an AP can be used. Read the story carefully and write down a, d and n. Then choose the correct formula.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 6:</strong> A trader saves ₦500 in week 1. Each week after that she saves ₦200 more than the week before. (a) How much does she save in week 12? (b) How much has she saved in total after 12 weeks?<br>Step 1: This is an AP with a = 500, d = 200, n = 12.<br>(a) T₁₂ = a + 11d = 500 + 11 × 200 = 500 + 2,200 = ₦2,700.<br>(b) S₁₂ = (12/2)[2 × 500 + 11 × 200] = 6 × [1,000 + 2,200] = 6 × 3,200 = ₦19,200.<br>Check: S₁₂ = (12/2)(500 + 2,700) = 6 × 3,200 = 19,200. ✓<br><strong>Answers:</strong> (a) ₦2,700; (b) ₦19,200.</div>\n<p class=\"learn-p\">Other common situations include seats in a hall where each row has 2 more seats than the one before, a worker whose yearly salary rises by a fixed amount, and a person who pays back a loan with a fixed increase each month.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> 1. Using Tₙ = a + nd instead of a + (n − 1)d. Remember the 1st term has no d added, so only (n − 1) lots of d are added.<br>2. Making d positive when the terms are falling. For 12, 9, 6, d = −3.<br>3. Calling a sequence an AP without checking that ALL the differences are equal.<br>4. Mixing up Tₙ (one term) and Sₙ (the total of n terms), or forgetting to halve n in the sum formula.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC often asks: \"The nth term of an AP is ...; find the first term and common difference\", or \"Find the number of terms\", or \"the sum of the first n terms\". Write down a, d and n first, then substitute. When two terms are given, form two equations and subtract to find d. Always show the formula you are using, because method marks are awarded.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> • A sequence is a list of numbers in a pattern; a series is their sum.<br>• In an AP the common difference d = (any term) − (term before it).<br>• The nth term is Tₙ = a + (n − 1)d.<br>• The sum of the first n terms is Sₙ = (n/2)[2a + (n − 1)d] = (n/2)(a + l).<br>• Tₙ = Sₙ − Sₙ₋₁.<br>• To solve word problems, find a, d and n first, then pick the right formula.</div>",
    "questions": [
      {
        "q": "What is the next term in the sequence 2, 4, 6, 8, ...?",
        "o": [
          "10",
          "9",
          "12",
          "16"
        ],
        "a": 0,
        "e": "The rule is add 2 each time, so the next term after 8 is 10. The value 12 would skip a term.",
        "h": "Add the same number to 8.",
        "yr": "SS2"
      },
      {
        "q": "Which of these is an arithmetic progression?",
        "o": [
          "1, 2, 4, 8, ...",
          "2, 5, 8, 11, ...",
          "1, 4, 9, 16, ...",
          "2, 6, 18, 54, ..."
        ],
        "a": 1,
        "e": "In 2, 5, 8, 11 the difference is always 3, so it is an AP. The others multiply or follow squares, so their differences are not equal.",
        "h": "Check that the differences are all equal.",
        "yr": "SS2"
      },
      {
        "q": "The common difference of the AP 12, 9, 6, 3, ... is",
        "o": [
          "3",
          "−4",
          "−3",
          "9"
        ],
        "a": 2,
        "e": "d = 9 − 12 = −3. The terms are decreasing, so d is negative; writing +3 is a common mistake.",
        "h": "Subtract the first term from the second.",
        "yr": "SS2"
      },
      {
        "q": "The formula for the nth term of an AP is",
        "o": [
          "a + nd",
          "a − (n + 1)d",
          "(n/2)(a + d)",
          "a + (n − 1)d"
        ],
        "a": 3,
        "e": "The first term has no d added, the second has one d, and so on, so the nth term has (n − 1) lots of d. a + nd would give the (n + 1)th term.",
        "h": "The first term needs zero d's.",
        "yr": "SS2"
      },
      {
        "q": "A series is",
        "o": [
          "the sum of the terms of a sequence",
          "a list of numbers in order",
          "the common difference",
          "the last term of a sequence"
        ],
        "a": 0,
        "e": "A series is formed by adding the terms of a sequence together. A list of numbers in order is the sequence itself.",
        "h": "Think of adding.",
        "yr": "SS2"
      },
      {
        "q": "Find the 10th term of the AP 4, 7, 10, ...",
        "o": [
          "34",
          "31",
          "30",
          "27"
        ],
        "a": 1,
        "e": "a = 4, d = 3, so T₁₀ = 4 + 9 × 3 = 31. Using 10 × 3 gives 34 which is wrong because it is a + nd.",
        "h": "Use (n − 1) = 9.",
        "yr": "SS2"
      },
      {
        "q": "What is the sum formula for the first n terms of an AP?",
        "o": [
          "n[a + (n − 1)d]",
          "(n/2)[a + (n − 1)d]",
          "(n/2)[2a + (n − 1)d]",
          "(n/2)[2a + nd]"
        ],
        "a": 2,
        "e": "The correct formula is Sₙ = (n/2)[2a + (n − 1)d]. The other choices leave out the 2 in front of a or use n in place of (n − 1).",
        "h": "Remember the 2a.",
        "yr": "SS2"
      },
      {
        "q": "The first term of an AP is −3 and the common difference is 4. Find the 5th term.",
        "o": [
          "17",
          "−7",
          "9",
          "13"
        ],
        "a": 3,
        "e": "T₅ = −3 + 4 × 4 = −3 + 16 = 13. Using 5 × 4 gives 17, which is wrong.",
        "h": "Add (5 − 1) lots of 4 to −3.",
        "yr": "SS2"
      },
      {
        "q": "How many terms are in the AP 5, 9, 13, ..., 101?",
        "o": [
          "25",
          "24",
          "26",
          "96"
        ],
        "a": 0,
        "e": "101 = 5 + (n − 1) × 4 gives n − 1 = 24, so n = 25. The answer 24 forgets to add 1 for the first term.",
        "h": "Solve 101 = 5 + (n − 1) × 4.",
        "yr": "SS2"
      },
      {
        "q": "The 7th term of an AP is 20 and the 12th term is 35. The common difference is",
        "o": [
          "2",
          "3",
          "5",
          "15"
        ],
        "a": 1,
        "e": "Subtract the equations: (a + 11d) − (a + 6d) = 35 − 20, so 5d = 15 and d = 3. The value 2 is the first term.",
        "h": "Subtract the two equations.",
        "yr": "SS2"
      },
      {
        "q": "Find the sum of the first 20 terms of the AP 3, 7, 11, 15, ...",
        "o": [
          "79",
          "1,640",
          "820",
          "410"
        ],
        "a": 2,
        "e": "S₂₀ = (20/2)[2 × 3 + 19 × 4] = 10 × 82 = 820. The answer 79 is only the 20th term, and 1,640 forgets to halve n.",
        "h": "Use the sum formula with a = 3, d = 4, n = 20.",
        "yr": "SS2"
      },
      {
        "q": "Find the sum of the first 10 even numbers 2, 4, 6, ..., 20.",
        "o": [
          "100",
          "220",
          "55",
          "110"
        ],
        "a": 3,
        "e": "a = 2, d = 2, n = 10, so S₁₀ = (10/2)(2 + 20) = 5 × 22 = 110. The value 100 is the sum of the first 10 odd numbers.",
        "h": "Use Sₙ = (n/2)(a + l).",
        "yr": "SS2"
      },
      {
        "q": "The sum of the first n terms of a sequence is Sₙ = 3n² − 2n. Find the 5th term.",
        "o": [
          "25",
          "65",
          "40",
          "22"
        ],
        "a": 0,
        "e": "T₅ = S₅ − S₄. S₅ = 75 − 10 = 65 and S₄ = 48 − 8 = 40. So T₅ = 65 − 40 = 25. The value 65 is the sum of 5 terms, not the 5th term.",
        "h": "Subtract the sum of 4 terms from the sum of 5 terms.",
        "yr": "SS2"
      },
      {
        "q": "A trader saves ₦500 in week 1 and ₦200 more each week than the week before. How much has she saved in total after 12 weeks?",
        "o": [
          "₦2,700",
          "₦19,200",
          "₦9,600",
          "₦6,000"
        ],
        "a": 1,
        "e": "This is an AP with a = 500, d = 200, n = 12. S₁₂ = 6 × [1,000 + 2,200] = 6 × 3,200 = ₦19,200. The value ₦2,700 is only the amount saved in week 12.",
        "h": "The question asks for the total, so use Sₙ.",
        "yr": "SS2"
      },
      {
        "q": "Find the sum of the first 50 terms of the AP 2, 5, 8, ...",
        "o": [
          "7,550",
          "151",
          "3,775",
          "3,725"
        ],
        "a": 2,
        "e": "a = 2, d = 3, n = 50. S₅₀ = 25 × [4 + 49 × 3] = 25 × 151 = 3,775. The value 151 is the bracket only.",
        "h": "Use a = 2, d = 3 and n = 50.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Quadratic Equations I",
    "topicCode": "SS2-MATH-04",
    "module": "Quadratic Equations",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\">A <span class=\"learn-keyword\">quadratic equation</span> is an equation in which the highest power of the unknown (x) is 2, such as x² + 5x + 6 = 0. Quadratic equations appear in daily life whenever area is involved. If a farmer in Kwara wants a rectangular farm plot with a known area, and one side is longer than the other by a known amount, he must solve a quadratic equation to find the sides. In this topic you learn how to build quadratic equations from their roots, how to make a table of values, how to solve by completing the square and by formula, and how to use quadratic equations to solve real problems.</div>\n<h3 class=\"learn-subheading\">1. What Is a Quadratic Equation?</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">standard form</span> of a quadratic equation is <strong>ax² + bx + c = 0</strong>, where a, b and c are numbers and a is not zero. The number a is the coefficient of x², b is the coefficient of x, and c is the constant term. Examples: x² − 5x + 6 = 0 (a = 1, b = −5, c = 6) and 2x² + 3x − 4 = 0 (a = 2, b = 3, c = −4).</p>\n<p class=\"learn-p\">The values of x that make the equation true are called the <span class=\"learn-keyword\">roots</span> (or solutions) of the equation. A quadratic equation has at most two roots. For example, in x² − 5x + 6 = 0 the roots are x = 2 and x = 3, because 2² − 5(2) + 6 = 4 − 10 + 6 = 0 and 3² − 5(3) + 6 = 9 − 15 + 6 = 0.</p>\n<h3 class=\"learn-subheading\">2. Sum and Product of Roots: Forming Equations</h3>\n<p class=\"learn-p\">If the roots are α (alpha) and β (beta), then the quadratic equation with these roots is (x − α)(x − β) = 0. When you expand this, you get:</p>\n<p class=\"learn-p\"><strong>x² − (α + β)x + αβ = 0</strong>, that is, x² − (sum of roots)x + (product of roots) = 0.</p>\n<p class=\"learn-p\">So to build an equation, find the sum of the roots and the product of the roots, then put them in the form above. Be careful with the signs: the sum has a minus sign in front of it.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Form the quadratic equation whose roots are (a) 2 and 3, (b) 3 and −4, (c) 2/3 and −1/2.<br>(a) Sum = 2 + 3 = 5. Product = 2 × 3 = 6. Equation: x² − 5x + 6 = 0.<br>(b) Sum = 3 + (−4) = −1. Product = 3 × (−4) = −12. Equation: x² − (−1)x + (−12) = 0, that is x² + x − 12 = 0.<br>(c) Sum = 2/3 + (−1/2) = 4/6 − 3/6 = 1/6. Product = (2/3) × (−1/2) = −1/3. Equation: x² − (1/6)x − 1/3 = 0. Multiply every term by 6 to remove fractions: 6x² − x − 2 = 0.<br>Check (c): put x = 2/3: 6(4/9) − 2/3 − 2 = 8/3 − 2/3 − 2 = 2 − 2 = 0. ✓<br><strong>Answers:</strong> x² − 5x + 6 = 0; x² + x − 12 = 0; 6x² − x − 2 = 0.</div>\n<h3 class=\"learn-subheading\">3. Constructing a Table of Values</h3>\n<p class=\"learn-p\">To study a quadratic expression like y = x² − 2x − 3, we build a <span class=\"learn-keyword\">table of values</span>. We choose several values of x, work out y for each one, and write them in a table. The values of x for which y = 0 are the roots of the equation x² − 2x − 3 = 0.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>x</th><th>−2</th><th>−1</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody><tr><td>x²</td><td>4</td><td>1</td><td>0</td><td>1</td><td>4</td><td>9</td><td>16</td></tr><tr><td>−2x</td><td>4</td><td>2</td><td>0</td><td>−2</td><td>−4</td><td>−6</td><td>−8</td></tr><tr><td>−3</td><td>−3</td><td>−3</td><td>−3</td><td>−3</td><td>−3</td><td>−3</td><td>−3</td></tr><tr><td>y = x² − 2x − 3</td><td>5</td><td>0</td><td>−3</td><td>−4</td><td>−3</td><td>0</td><td>5</td></tr></tbody></table></div>\n<p class=\"learn-p\">Look at the last row. It becomes 0 when x = −1 and when x = 3. So the roots of x² − 2x − 3 = 0 are x = −1 and x = 3. Check: (−1)² − 2(−1) − 3 = 1 + 2 − 3 = 0 ✓. Notice also that the values of y go down and then up again (5, 0, −3, −4, −3, 0, 5). The lowest value is −4 at x = 1. The table is symmetrical about x = 1, which is halfway between the two roots.</p>\n<h3 class=\"learn-subheading\">4. Solving by Completing the Square</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Completing the square</span> means rewriting the equation so that one side is a perfect square, such as (x + 3)². Remember that (x + p)² = x² + 2px + p². So to make x² + bx a perfect square, add (b/2)². Follow these steps:</p>\n<ol class=\"learn-ordered\"><li>Step 1: Make sure the coefficient of x² is 1. If not, divide every term by it.</li><li>Step 2: Move the constant term to the right-hand side.</li><li>Step 3: Add (half of the coefficient of x)² to BOTH sides.</li><li>Step 4: Write the left side as a perfect square and simplify the right side.</li><li>Step 5: Take the square root of both sides. Remember ±.</li><li>Step 6: Solve for x.</li></ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> Solve (a) x² + 6x − 7 = 0 and (b) x² − 4x − 3 = 0 (to 2 decimal places) by completing the square.<br>(a) Move the constant: x² + 6x = 7. Half of 6 is 3 and 3² = 9. Add 9 to both sides: x² + 6x + 9 = 7 + 9. So (x + 3)² = 16. Take roots: x + 3 = ±4. So x = −3 + 4 = 1 or x = −3 − 4 = −7.<br>Check: 1 + 6 − 7 = 0 ✓; 49 − 42 − 7 = 0 ✓.<br>(b) Move the constant: x² − 4x = 3. Half of −4 is −2 and (−2)² = 4. Add 4: x² − 4x + 4 = 3 + 4. So (x − 2)² = 7. Then x − 2 = ±√7 = ±2.6458. So x = 2 + 2.6458 = 4.65 or x = 2 − 2.6458 = −0.65.<br><strong>Answers:</strong> (a) x = 1 or x = −7; (b) x = 4.65 or x = −0.65.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> Solve 2x² − 8x + 3 = 0 by completing the square, giving answers to 2 decimal places.<br>Step 1: Divide by 2: x² − 4x + 3/2 = 0, i.e. x² − 4x + 1.5 = 0.<br>Step 2: Move the constant: x² − 4x = −1.5.<br>Step 3: Add (−2)² = 4 to both sides: x² − 4x + 4 = −1.5 + 4 = 2.5. So (x − 2)² = 2.5.<br>Step 4: x − 2 = ±√2.5 = ±1.5811. So x = 2 + 1.5811 = 3.58 or x = 2 − 1.5811 = 0.42.<br><strong>Answers:</strong> x = 3.58 or x = 0.42 (2 d.p.).</div>\n<h3 class=\"learn-subheading\">5. Solving by the Quadratic Formula</h3>\n<p class=\"learn-p\">If you complete the square on the general equation ax² + bx + c = 0, you get a formula that works for every quadratic equation:</p>\n<p class=\"learn-p\"><strong>x = [−b ± √(b² − 4ac)] ÷ 2a</strong></p>\n<p class=\"learn-p\">The part b² − 4ac under the square root is called the <span class=\"learn-keyword\">discriminant</span>. If it is positive, there are two different real roots. If it is zero, there is one repeated root. If it is negative, there are no real roots, because you cannot take the square root of a negative number.</p>\n<ol class=\"learn-ordered\"><li>Step 1: Write the equation in the form ax² + bx + c = 0 and list a, b and c with their signs.</li><li>Step 2: Work out the discriminant b² − 4ac.</li><li>Step 3: Put the values in the formula. Use brackets for negative numbers.</li><li>Step 4: Work out the two answers (+ and −).</li></ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Solve (a) 3x² − 5x − 2 = 0 and (b) 2x² + 3x − 4 = 0 (2 d.p.) using the formula.<br>(a) a = 3, b = −5, c = −2. b² − 4ac = (−5)² − 4(3)(−2) = 25 + 24 = 49. √49 = 7. x = [5 ± 7] ÷ 6. So x = 12/6 = 2 or x = −2/6 = −1/3.<br>Check x = 2: 12 − 10 − 2 = 0 ✓.<br>(b) a = 2, b = 3, c = −4. b² − 4ac = 9 − 4(2)(−4) = 9 + 32 = 41. √41 = 6.4031. x = [−3 ± 6.4031] ÷ 4. So x = 3.4031/4 = 0.85 or x = −9.4031/4 = −2.35.<br><strong>Answers:</strong> (a) x = 2 or x = −1/3; (b) x = 0.85 or x = −2.35.</div>\n<h3 class=\"learn-subheading\">6. Applications of Quadratic Equations in Daily Life</h3>\n<p class=\"learn-p\">Many word problems lead to quadratic equations. Use these steps: let x stand for the unknown, write an equation from the story, rearrange it into ax² + bx + c = 0, solve it, then reject any root that makes no sense (such as a negative length).</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 5:</strong> The length of a rectangular farm plot is 3 m more than its width. Its area is 40 m². Find the width, the length and the perimeter.<br>Step 1: Let the width = x m. Then the length = (x + 3) m.<br>Step 2: Area = length × width, so x(x + 3) = 40. That is x² + 3x − 40 = 0.<br>Step 3: Factorise: find two numbers with product −40 and sum +3. They are 8 and −5. So (x + 8)(x − 5) = 0, giving x = −8 or x = 5.<br>Step 4: A width cannot be negative, so x = 5 m. The length = 5 + 3 = 8 m.<br>Step 5: Perimeter = 2(8 + 5) = 26 m. Check: 8 × 5 = 40 ✓.<br><strong>Answers:</strong> width = 5 m, length = 8 m, perimeter = 26 m.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 6:</strong> The product of two consecutive positive whole numbers is 156. Find the numbers.<br>Let the numbers be x and x + 1. Then x(x + 1) = 156, so x² + x − 156 = 0.<br>Use the formula: a = 1, b = 1, c = −156. b² − 4ac = 1 + 624 = 625, and √625 = 25. So x = (−1 ± 25) ÷ 2, giving x = 12 or x = −13.<br>The numbers are positive, so x = 12 and the numbers are 12 and 13. Check: 12 × 13 = 156 ✓.<br><strong>Answer:</strong> 12 and 13.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> 1. Getting the sign wrong in the sum of roots. The equation is x² − (sum)x + product = 0. For roots 3 and −4 the sum is −1, so the middle term is +x, not −x.<br>2. In completing the square, adding (b/2)² to only one side. Add it to both sides.<br>3. Forgetting the ± when taking a square root, so that one root is lost.<br>4. Using wrong signs of a, b and c in the formula. Write them out first, and put negative values in brackets.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC asks: \"Form a quadratic equation whose roots are ...\", \"Solve x² − 4x − 3 = 0 correct to 2 decimal places\" or \"Solve by completing the square\". When the answer is not a whole number, the formula or completing the square is needed, not factorisation. Show each step, and for word problems state which root you reject and why.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> • Standard form: ax² + bx + c = 0; the roots are the values of x that satisfy it.<br>• Equation from roots: x² − (sum)x + (product) = 0.<br>• A table of values lets you find roots where y = 0.<br>• Completing the square: add (half the coefficient of x)² to both sides, then take ± square roots.<br>• Formula: x = [−b ± √(b² − 4ac)] ÷ 2a.<br>• In word problems, reject roots that make no sense, such as negative lengths.</div>",
    "questions": [
      {
        "q": "Which of these is a quadratic equation?",
        "o": [
          "x² − 5x + 6 = 0",
          "2x + 6 = 0",
          "x³ − 5x = 0",
          "x/2 + 6 = 0"
        ],
        "a": 0,
        "e": "A quadratic equation has x² as the highest power. 2x + 6 = 0 is linear and x³ − 5x = 0 is cubic.",
        "h": "Look for the highest power of x.",
        "yr": "SS2"
      },
      {
        "q": "In 2x² + 3x − 4 = 0, the values of a, b and c are",
        "o": [
          "a = 2, b = −3, c = 4",
          "a = 2, b = 3, c = −4",
          "a = 3, b = 2, c = −4",
          "a = 2, b = 3, c = 4"
        ],
        "a": 1,
        "e": "Compare with ax² + bx + c = 0. The coefficient of x² is 2, of x is 3 and the constant is −4. Keep the sign with each number.",
        "h": "Match each term with ax², bx and c.",
        "yr": "SS2"
      },
      {
        "q": "The quadratic equation with roots 2 and 3 is",
        "o": [
          "x² + 5x + 6 = 0",
          "x² − 6x + 5 = 0",
          "x² − 5x + 6 = 0",
          "x² + x − 6 = 0"
        ],
        "a": 2,
        "e": "Sum = 5 and product = 6, so x² − 5x + 6 = 0. A plus sign in front of 5x would give roots −2 and −3.",
        "h": "Use x² − (sum)x + product = 0.",
        "yr": "SS2"
      },
      {
        "q": "The discriminant of ax² + bx + c = 0 is",
        "o": [
          "b² + 4ac",
          "4ac − b",
          "−b ± 2a",
          "b² − 4ac"
        ],
        "a": 3,
        "e": "The discriminant is the part under the square root in the quadratic formula: b² − 4ac. It tells us how many real roots there are.",
        "h": "It is under the square root sign.",
        "yr": "SS2"
      },
      {
        "q": "To make x² + 8x a perfect square we must add",
        "o": [
          "16",
          "8",
          "64",
          "4"
        ],
        "a": 0,
        "e": "Half of 8 is 4, and 4² = 16. So x² + 8x + 16 = (x + 4)². Adding 64 is wrong because that is 8², not (8/2)².",
        "h": "Add (half of the coefficient of x) squared.",
        "yr": "SS2"
      },
      {
        "q": "For the equation x² + x − 12 = 0, the sum and product of the roots are",
        "o": [
          "1 and −12",
          "−1 and −12",
          "−1 and 12",
          "1 and 12"
        ],
        "a": 1,
        "e": "Here sum = −b/a = −1 and product = c/a = −12. The roots are 3 and −4, and 3 + (−4) = −1, 3 × (−4) = −12.",
        "h": "Sum = −(coefficient of x) when a = 1.",
        "yr": "SS2"
      },
      {
        "q": "Find the quadratic equation whose roots are 3 and −4.",
        "o": [
          "x² − x − 12 = 0",
          "x² + x + 12 = 0",
          "x² + x − 12 = 0",
          "x² − x + 12 = 0"
        ],
        "a": 2,
        "e": "Sum = 3 + (−4) = −1 and product = −12. So x² − (−1)x − 12 = x² + x − 12 = 0. Be careful with the sign in front of x.",
        "h": "Work out the sum carefully.",
        "yr": "SS2"
      },
      {
        "q": "From the table of y = x² − 2x − 3, y = 0 when x = −1 and x = 3. These values are the",
        "o": [
          "coefficients of the equation",
          "minimum values of y",
          "values of the discriminant",
          "roots of x² − 2x − 3 = 0"
        ],
        "a": 3,
        "e": "A root is a value of x that makes the expression equal to 0. Here both −1 and 3 do that, as 1 + 2 − 3 = 0 and 9 − 6 − 3 = 0.",
        "h": "What does y = 0 mean for the equation?",
        "yr": "SS2"
      },
      {
        "q": "Solve x² + 6x − 7 = 0 by completing the square.",
        "o": [
          "x = 1 or x = −7",
          "x = −1 or x = 7",
          "x = 3 or x = −3",
          "x = 1 or x = 7"
        ],
        "a": 0,
        "e": "x² + 6x + 9 = 16, so (x + 3)² = 16 and x + 3 = ±4. Then x = 1 or x = −7. Choosing −1 and 7 is a sign error.",
        "h": "Add 9 to both sides.",
        "yr": "SS2"
      },
      {
        "q": "Solve x² − 4x − 3 = 0, correct to 2 decimal places.",
        "o": [
          "x = 4.65 or x = 0.65",
          "x = 4.65 or x = −0.65",
          "x = 3.00 or x = −1.00",
          "x = 2.65 or x = −2.65"
        ],
        "a": 1,
        "e": "Completing the square: (x − 2)² = 7, so x = 2 ± 2.6458 = 4.65 or −0.65. The answer 2.65 forgets that 2 must be added.",
        "h": "Complete the square: (x − 2)² = 7.",
        "yr": "SS2"
      },
      {
        "q": "For 3x² − 5x − 2 = 0, the discriminant is",
        "o": [
          "1",
          "−1",
          "49",
          "25"
        ],
        "a": 2,
        "e": "b² − 4ac = (−5)² − 4(3)(−2) = 25 + 24 = 49. Students who write 25 − 24 = 1 have wrongly taken −4ac as negative.",
        "h": "−4 × 3 × (−2) is positive.",
        "yr": "SS2"
      },
      {
        "q": "Solve 3x² − 5x − 2 = 0.",
        "o": [
          "x = −2 or x = 1/3",
          "x = 2 or x = 1/3",
          "x = 7 or x = −1/3",
          "x = 2 or x = −1/3"
        ],
        "a": 3,
        "e": "x = (5 ± √49) ÷ 6 = (5 ± 7) ÷ 6, so x = 2 or x = −1/3. The value 7 comes from not dividing by 2a.",
        "h": "Use x = [−b ± √(b² − 4ac)] ÷ 2a.",
        "yr": "SS2"
      },
      {
        "q": "Solve 2x² + 3x − 4 = 0, correct to 2 decimal places.",
        "o": [
          "x = 0.85 or x = −2.35",
          "x = 2.35 or x = −0.85",
          "x = 1.70 or x = −4.70",
          "x = 0.85 or x = 2.35"
        ],
        "a": 0,
        "e": "x = (−3 ± √41) ÷ 4 = (−3 ± 6.4031) ÷ 4, so x = 0.85 or x = −2.35. The signs of the answers cannot be swapped because the numerator starts with −3.",
        "h": "Discriminant = 9 + 32 = 41.",
        "yr": "SS2"
      },
      {
        "q": "The length of a rectangle is 3 m more than its width and its area is 40 m². The width is",
        "o": [
          "8 m",
          "5 m",
          "−8 m",
          "13 m"
        ],
        "a": 1,
        "e": "x(x + 3) = 40 gives x² + 3x − 40 = 0, so (x + 8)(x − 5) = 0. The width is 5 m because −8 m is impossible. The length is 8 m.",
        "h": "Reject the negative root.",
        "yr": "SS2"
      },
      {
        "q": "The product of two consecutive positive whole numbers is 156. The smaller number is",
        "o": [
          "13",
          "11",
          "12",
          "14"
        ],
        "a": 2,
        "e": "x(x + 1) = 156 gives x² + x − 156 = 0 and (x − 12)(x + 13) = 0. So x = 12 (since x is positive). The numbers are 12 and 13.",
        "h": "Try writing x and x + 1 as the numbers.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Quadratic Equations II",
    "topicCode": "SS2-MATH-05",
    "module": "Quadratic Equations",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\">In the last topic you solved quadratic equations to find their roots. Now we work the other way round: if we know something about the <span class=\"learn-keyword\">roots</span>, can we build the equation? This is very useful. For example, a builder in Ibadan may know that the two sides of a plot add up to 9 m and multiply to 20 m², and from this he can form an equation and find the sides. In this topic you learn the link between the roots and the coefficients of a quadratic equation, how to form equations from given conditions, and how to verify (check) that roots are correct.</div>\n<h3 class=\"learn-subheading\">1. Roots and Coefficients: Sum and Product</h3>\n<p class=\"learn-p\">A quadratic equation ax² + bx + c = 0 has two roots, which we call α (alpha) and β (beta). The <span class=\"learn-keyword\">sum of the roots</span> is α + β and the <span class=\"learn-keyword\">product of the roots</span> is α × β. There is a simple link between them and the numbers a, b and c:</p>\n<p class=\"learn-p\"><strong>α + β = −b/a</strong> and <strong>αβ = c/a</strong></p>\n<p class=\"learn-p\">Here is why. Dividing ax² + bx + c = 0 by a gives x² + (b/a)x + c/a = 0. We know that an equation with roots α and β is x² − (α + β)x + αβ = 0. Comparing the two, the coefficient of x is −(α + β) = b/a, so α + β = −b/a. The constant term is αβ = c/a.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Equation</th><th>a, b, c</th><th>Sum = −b/a</th><th>Product = c/a</th></tr></thead><tbody><tr><td>x² − 5x + 6 = 0</td><td>1, −5, 6</td><td>5</td><td>6</td></tr><tr><td>2x² − 7x + 3 = 0</td><td>2, −7, 3</td><td>7/2</td><td>3/2</td></tr><tr><td>x² + 4x − 12 = 0</td><td>1, 4, −12</td><td>−4</td><td>−12</td></tr><tr><td>3x² + x − 2 = 0</td><td>3, 1, −2</td><td>−1/3</td><td>−2/3</td></tr></tbody></table></div>\n<p class=\"learn-p\">Notice that you can find the sum and the product without solving the equation at all. This saves time in the exam.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Find the sum and the product of the roots of 2x² − 7x + 3 = 0. Then verify by solving the equation.<br>Step 1: a = 2, b = −7, c = 3.<br>Step 2: Sum = −b/a = −(−7)/2 = 7/2 = 3.5. Product = c/a = 3/2 = 1.5.<br>Step 3: Verify. Factorise: 2x² − 7x + 3 = (2x − 1)(x − 3) = 0. So x = 1/2 or x = 3.<br>Sum of the roots: 1/2 + 3 = 3.5 ✓. Product: 1/2 × 3 = 1.5 ✓.<br><strong>Answers:</strong> sum = 7/2, product = 3/2.</div>\n<h3 class=\"learn-subheading\">2. Forming an Equation from Given Roots</h3>\n<ol class=\"learn-ordered\"><li>Step 1: Find the sum of the roots (α + β).</li><li>Step 2: Find the product of the roots (αβ).</li><li>Step 3: Write x² − (α + β)x + αβ = 0.</li><li>Step 4: If there are fractions, multiply every term by the common denominator so that all coefficients are whole numbers.</li></ol>\n<p class=\"learn-p\">The roots may be whole numbers, fractions, or contain square roots (surds). For roots like 1 + √2 and 1 − √2, the square roots cancel in the sum and product.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> Form the quadratic equation whose roots are 1 + √2 and 1 − √2.<br>Sum = (1 + √2) + (1 − √2) = 2.<br>Product = (1 + √2)(1 − √2) = 1 − (√2)² = 1 − 2 = −1.<br>Equation: x² − 2x + (−1) = 0, that is x² − 2x − 1 = 0.<br>Check by formula: a = 1, b = −2, c = −1. x = [2 ± √(4 + 4)] ÷ 2 = [2 ± 2√2] ÷ 2 = 1 ± √2 ✓.<br><strong>Answer:</strong> x² − 2x − 1 = 0.</div>\n<h3 class=\"learn-subheading\">3. Forming an Equation from Given Conditions</h3>\n<p class=\"learn-p\">Sometimes the roots are not given directly. Instead you are told their sum and product, or how they are related to the roots of another equation. In every case, find the new sum and the new product, then use x² − (sum)x + product = 0.</p>\n<h4 class=\"learn-subsubheading\">Case A: the sum and product are given</h4>\n<p class=\"learn-p\">If the sum of two numbers is 7 and their product is 12, the equation is x² − 7x + 12 = 0. This factorises as (x − 3)(x − 4) = 0, so the numbers are 3 and 4.</p>\n<h4 class=\"learn-subsubheading\">Case B: the roots are related to the roots of another equation</h4>\n<p class=\"learn-p\">Suppose α and β are the roots of a given equation. First find α + β and αβ from the given equation. Then use these useful results:</p>\n<ul class=\"learn-list\"><li>α² + β² = (α + β)² − 2αβ</li><li>(α − β)² = (α + β)² − 4αβ</li><li>1/α + 1/β = (α + β) ÷ αβ</li><li>(α + 1)(β + 1) = αβ + (α + β) + 1</li></ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> If α and β are the roots of x² − 5x + 3 = 0, find (a) α² + β², (b) the equation with roots α + 1 and β + 1, (c) the equation with roots 1/α and 1/β.<br>Step 1: α + β = 5 and αβ = 3.<br>(a) α² + β² = (α + β)² − 2αβ = 25 − 6 = 19.<br>(b) New sum = (α + 1) + (β + 1) = (α + β) + 2 = 7. New product = (α + 1)(β + 1) = αβ + (α + β) + 1 = 3 + 5 + 1 = 9. Equation: x² − 7x + 9 = 0.<br>(c) New sum = 1/α + 1/β = (α + β)/αβ = 5/3. New product = 1/(αβ) = 1/3. Equation: x² − (5/3)x + 1/3 = 0. Multiply by 3: 3x² − 5x + 1 = 0.<br><strong>Answers:</strong> (a) 19; (b) x² − 7x + 9 = 0; (c) 3x² − 5x + 1 = 0.</div>\n<h4 class=\"learn-subsubheading\">Case C: finding an unknown in the equation</h4>\n<p class=\"learn-p\">If you are told one root of an equation that contains an unknown letter such as k, put that root into the equation. You get a simple equation to solve for k. Then use the sum or product to find the other root.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> One root of x² + kx − 10 = 0 is 2. Find k and the other root.<br>Step 1: Substitute x = 2: 2² + k(2) − 10 = 0, so 4 + 2k − 10 = 0, so 2k = 6 and k = 3.<br>Step 2: The equation is x² + 3x − 10 = 0. Product of the roots = −10, so 2 × (other root) = −10 and the other root is −5.<br>Step 3: Verify using the sum. Sum of roots = −b/a = −3. And 2 + (−5) = −3 ✓.<br>Step 4: Factorise to confirm: (x − 2)(x + 5) = x² + 3x − 10 ✓.<br><strong>Answer:</strong> k = 3 and the other root is −5.</div>\n<h3 class=\"learn-subheading\">4. Verification of Roots</h3>\n<p class=\"learn-p\">To <span class=\"learn-keyword\">verify</span> a root means to check that it is correct. There are two methods.</p>\n<ul class=\"learn-list\"><li><strong>Substitution:</strong> put each root in the original equation. If the left side becomes 0, the root is correct.</li><li><strong>Sum and product:</strong> add the two roots and compare with −b/a. Multiply the two roots and compare with c/a. If both match, the roots are correct.</li></ul>\n<p class=\"learn-p\">You should use the sum and product check at the end of every quadratic equation you solve. It takes only seconds and catches sign errors.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 5:</strong> Two numbers add up to 9 and multiply to give 20. Form an equation and find the numbers. Then verify.<br>Step 1: Sum = 9 and product = 20. The equation is x² − 9x + 20 = 0.<br>Step 2: Factorise: two numbers with product 20 and sum −9 are −4 and −5. So (x − 4)(x − 5) = 0 and x = 4 or x = 5.<br>Step 3: Verify by substitution. x = 4: 16 − 36 + 20 = 0 ✓. x = 5: 25 − 45 + 20 = 0 ✓.<br>Verify by sum and product: 4 + 5 = 9 ✓ and 4 × 5 = 20 ✓.<br><strong>Answer:</strong> the numbers are 4 and 5.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 6:</strong> Show that x = 3 and x = −2 are the roots of x² − x − 6 = 0.<br>Substitute x = 3: 9 − 3 − 6 = 0 ✓. Substitute x = −2: 4 − (−2) − 6 = 4 + 2 − 6 = 0 ✓.<br>Sum: 3 + (−2) = 1 and −b/a = −(−1)/1 = 1 ✓. Product: 3 × (−2) = −6 and c/a = −6 ✓.<br><strong>Conclusion:</strong> both values satisfy the equation, so they are the roots.</div>\n<h3 class=\"learn-subheading\">5. Putting It Together: Form, Solve and Check</h3>\n<p class=\"learn-p\">Many exam questions join all the ideas above. You form an equation, solve it, and then check the roots with the sum and product. This is a good habit because it proves your answer is right before you leave the question.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 7:</strong> Form the equation whose roots are 1/2 and 1/3, with whole-number coefficients. Then check the roots.<br>Step 1: Sum = 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Product = 1/2 × 1/3 = 1/6.<br>Step 2: Equation: x² − (5/6)x + 1/6 = 0.<br>Step 3: Multiply every term by 6: 6x² − 5x + 1 = 0.<br>Step 4: Check. Here a = 6, b = −5, c = 1. Sum = −b/a = 5/6 ✓. Product = c/a = 1/6 ✓.<br>Step 5: Substitute x = 1/2: 6(1/4) − 5(1/2) + 1 = 1.5 − 2.5 + 1 = 0 ✓.<br><strong>Answer:</strong> 6x² − 5x + 1 = 0.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> 1. Writing the sum as +b/a. It is −b/a. For x² + 4x − 12 = 0 the sum is −4, not +4.<br>2. Writing x² + (sum)x + product = 0 when forming the equation. The sum must have a minus sign in front of it.<br>3. Forgetting to multiply by the common denominator to clear fractions, or doing it to only some of the terms.<br>4. Stopping after finding k. Remember to use k to write the full equation and then find the other root.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC asks: \"If α and β are the roots of 2x² − 5x + 1 = 0, find the equation whose roots are ...\" or \"One root of x² + kx − 10 = 0 is 2; find k\". Write α + β and αβ first. Then find the new sum and product, and write x² − (sum)x + product = 0. Always check with a quick sum or product test.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> • For ax² + bx + c = 0: sum of roots = −b/a, product of roots = c/a.<br>• An equation with roots α and β is x² − (α + β)x + αβ = 0.<br>• For related roots, find the new sum and product using α² + β² = (α + β)² − 2αβ and similar results.<br>• To find an unknown letter such as k, substitute the given root.<br>• Verify roots by substitution, or by checking sum and product.<br>• Clear fractions by multiplying every term by the common denominator.</div>",
    "questions": [
      {
        "q": "For the equation ax² + bx + c = 0, the sum of the roots is",
        "o": [
          "−b/a",
          "b/a",
          "c/a",
          "−c/a"
        ],
        "a": 0,
        "e": "The sum of the roots is −b/a, and the product is c/a. A plus sign instead of a minus sign is the most common mistake.",
        "h": "Remember the minus sign.",
        "yr": "SS2"
      },
      {
        "q": "For the equation ax² + bx + c = 0, the product of the roots is",
        "o": [
          "−c/a",
          "c/a",
          "b/a",
          "−b/a"
        ],
        "a": 1,
        "e": "The product of the roots is c/a. For x² − 5x + 6 = 0 it is 6/1 = 6, which equals 2 × 3.",
        "h": "It uses the constant term.",
        "yr": "SS2"
      },
      {
        "q": "The sum of the roots of x² + 4x − 12 = 0 is",
        "o": [
          "4",
          "12",
          "−4",
          "−12"
        ],
        "a": 2,
        "e": "Sum = −b/a = −4/1 = −4. The roots are 2 and −6, and 2 + (−6) = −4. The value −12 is the product.",
        "h": "Use −b/a.",
        "yr": "SS2"
      },
      {
        "q": "The product of the roots of 3x² + x − 2 = 0 is",
        "o": [
          "2/3",
          "−1/3",
          "−2",
          "−2/3"
        ],
        "a": 3,
        "e": "Product = c/a = −2/3. Forgetting to divide by a = 3 would give −2.",
        "h": "Divide c by a.",
        "yr": "SS2"
      },
      {
        "q": "The equation with roots α and β is",
        "o": [
          "x² − (α + β)x + αβ = 0",
          "x² + (α + β)x + αβ = 0",
          "x² − (α + β)x − αβ = 0",
          "x² − αβx + (α + β) = 0"
        ],
        "a": 0,
        "e": "Expanding (x − α)(x − β) gives x² − (α + β)x + αβ. The sum has a minus sign and the product is added.",
        "h": "Expand (x − α)(x − β).",
        "yr": "SS2"
      },
      {
        "q": "The equation whose roots are 2 and 3 is",
        "o": [
          "x² + 5x + 6 = 0",
          "x² − 5x + 6 = 0",
          "x² − 6x + 5 = 0",
          "x² − x − 6 = 0"
        ],
        "a": 1,
        "e": "Sum = 5, product = 6, so x² − 5x + 6 = 0. The equation x² + 5x + 6 = 0 has roots −2 and −3.",
        "h": "Find the sum and product first.",
        "yr": "SS2"
      },
      {
        "q": "A quadratic equation has roots with sum 7/6 and product −1. Written with whole-number coefficients, the equation is",
        "o": [
          "6x² + 7x − 6 = 0",
          "6x² − 7x + 6 = 0",
          "6x² − 7x − 6 = 0",
          "x² − 7x − 6 = 0"
        ],
        "a": 2,
        "e": "x² − (7/6)x − 1 = 0, and multiplying all terms by 6 gives 6x² − 7x − 6 = 0. Every term must be multiplied, including the −1.",
        "h": "Multiply every term by 6.",
        "yr": "SS2"
      },
      {
        "q": "The equation with roots 1 + √2 and 1 − √2 is",
        "o": [
          "x² − 2x + 1 = 0",
          "x² + 2x − 1 = 0",
          "x² − 2x − 3 = 0",
          "x² − 2x − 1 = 0"
        ],
        "a": 3,
        "e": "Sum = 2 and product = 1 − 2 = −1, so x² − 2x − 1 = 0. The product is (1 + √2)(1 − √2) = 1 − 2, not 1 + 2.",
        "h": "Use (a + b)(a − b) = a² − b².",
        "yr": "SS2"
      },
      {
        "q": "If α and β are roots of x² − 5x + 3 = 0, then α² + β² =",
        "o": [
          "19",
          "25",
          "31",
          "16"
        ],
        "a": 0,
        "e": "α² + β² = (α + β)² − 2αβ = 25 − 6 = 19. The value 25 forgets to subtract 2αβ.",
        "h": "Use (α + β)² − 2αβ.",
        "yr": "SS2"
      },
      {
        "q": "If α and β are roots of x² − 5x + 3 = 0, the equation with roots α + 1 and β + 1 is",
        "o": [
          "x² − 7x + 3 = 0",
          "x² − 7x + 9 = 0",
          "x² − 5x + 9 = 0",
          "x² − 6x + 4 = 0"
        ],
        "a": 1,
        "e": "New sum = 5 + 2 = 7. New product = αβ + (α + β) + 1 = 3 + 5 + 1 = 9. So x² − 7x + 9 = 0.",
        "h": "The new product is (α + 1)(β + 1).",
        "yr": "SS2"
      },
      {
        "q": "If α and β are roots of x² − 5x + 3 = 0, the equation with roots 1/α and 1/β is",
        "o": [
          "x² − 5x + 3 = 0",
          "3x² + 5x + 1 = 0",
          "3x² − 5x + 1 = 0",
          "x² − 3x + 5 = 0"
        ],
        "a": 2,
        "e": "New sum = (α + β)/αβ = 5/3 and new product = 1/αβ = 1/3. So x² − (5/3)x + 1/3 = 0, which is 3x² − 5x + 1 = 0.",
        "h": "Reverse the roles of the sum and product, then clear fractions.",
        "yr": "SS2"
      },
      {
        "q": "One root of x² + kx − 10 = 0 is 2. The value of k is",
        "o": [
          "−3",
          "4",
          "−4",
          "3"
        ],
        "a": 3,
        "e": "Put x = 2: 4 + 2k − 10 = 0, so 2k = 6 and k = 3. Putting −10 on the wrong side gives a wrong sign.",
        "h": "Substitute x = 2.",
        "yr": "SS2"
      },
      {
        "q": "One root of x² + kx − 10 = 0 is 2. The other root is",
        "o": [
          "−5",
          "5",
          "−2",
          "8"
        ],
        "a": 0,
        "e": "The product of the roots is −10, so 2 × (other) = −10 and the other root is −5. Check the sum: 2 + (−5) = −3 = −k. ✓",
        "h": "Use the product of roots.",
        "yr": "SS2"
      },
      {
        "q": "Two numbers add up to 9 and multiply to give 20. The numbers are",
        "o": [
          "3 and 6",
          "4 and 5",
          "2 and 10",
          "1 and 20"
        ],
        "a": 1,
        "e": "The equation is x² − 9x + 20 = 0, so (x − 4)(x − 5) = 0 and the numbers are 4 and 5. Check: 4 + 5 = 9 and 4 × 5 = 20.",
        "h": "Form x² − (sum)x + product = 0.",
        "yr": "SS2"
      },
      {
        "q": "Which pair of values are the roots of x² − x − 6 = 0?",
        "o": [
          "−3 and 2",
          "6 and −1",
          "3 and −2",
          "3 and 2"
        ],
        "a": 2,
        "e": "Their sum is 3 + (−2) = 1 = −b/a, and their product is −6 = c/a. The pair −3 and 2 has sum −1, which does not match.",
        "h": "Check both the sum and the product.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Simultaneous Equations",
    "topicCode": "SS2-MATH-06",
    "module": "Simultaneous Equations and Graphs",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\">A <span class=\"learn-keyword\">simultaneous equation</span> problem gives you two equations that are true at the same time, and two unknown letters (like x and y) to find. Think of a trader in Mile 12 market in Lagos. She sells 3 kg of rice and 2 kg of beans for one price, and 2 kg of rice and 3 kg of beans for another price. From these two facts you can work out the price of one kg of rice and one kg of beans. In this topic you will learn two methods, <span class=\"learn-keyword\">elimination</span> and <span class=\"learn-keyword\">substitution</span>, and how to use them to solve word problems.</div>\n<h3 class=\"learn-subheading\">1. What Is a Simultaneous Equation?</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">linear equation</span> in two variables is an equation like 2x + 3y = 12. A <span class=\"learn-keyword\">variable</span> is a letter that stands for an unknown number. One equation with two letters has many answers. For example, x = 3, y = 2 works, and so does x = 6, y = 0.</p>\n<p class=\"learn-p\">When we have two linear equations together, they are called <span class=\"learn-keyword\">simultaneous equations</span>. \"Simultaneous\" means \"at the same time\". We look for the one pair of values of x and y that makes BOTH equations true. This pair is called the <span class=\"learn-keyword\">solution</span>.</p>\n<p class=\"learn-p\">Example: x + y = 5 and x − y = 1. The pair x = 3, y = 2 works in both: 3 + 2 = 5 and 3 − 2 = 1. So it is the solution.</p>\n<h3 class=\"learn-subheading\">2. The Elimination Method</h3>\n<p class=\"learn-p\">To <span class=\"learn-keyword\">eliminate</span> means to remove. In this method we remove one of the letters by adding or subtracting the two equations. We are then left with one equation and one letter, which is easy to solve.</p>\n<ol class=\"learn-ordered\"><li>Step 1: Write both equations one under the other, with x under x, y under y and numbers under numbers. Label them (1) and (2).</li><li>Step 2: Make the numbers in front of one letter (the <span class=\"learn-keyword\">coefficients</span>) the same size in both equations. Multiply an equation by a number if needed.</li><li>Step 3: If the two matching terms have the SAME sign, subtract the equations. If they have OPPOSITE signs, add the equations. The letter disappears.</li><li>Step 4: Solve the remaining equation.</li><li>Step 5: Put your answer into one of the original equations to find the other letter.</li><li>Step 6: Check in the other original equation.</li></ol>\n<p class=\"learn-p\">A simple memory rule: <strong>Same signs subtract, different signs add.</strong></p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Solve 2x + 3y = 12 and 4x − 3y = 6.<br>Step 1: (1) 2x + 3y = 12 and (2) 4x − 3y = 6.<br>Step 2: The y terms are +3y and −3y. They are the same size already, with opposite signs, so we add.<br>Step 3: (1) + (2): 2x + 4x + 3y − 3y = 12 + 6, so 6x = 18, so x = 3.<br>Step 4: Put x = 3 into (1): 2(3) + 3y = 12, so 6 + 3y = 12, so 3y = 6, so y = 2.<br>Step 5: Check in (2): 4(3) − 3(2) = 12 − 6 = 6 ✓.<br><strong>Answer:</strong> x = 3, y = 2.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> Solve 3x + 2y = 13 and 5x − 3y = 9.<br>Step 1: (1) 3x + 2y = 13 and (2) 5x − 3y = 9. The coefficients are not equal, so we change them.<br>Step 2: To make the y terms equal in size (6y), multiply (1) by 3 and (2) by 2.<br>(1) × 3: 9x + 6y = 39. (2) × 2: 10x − 6y = 18.<br>Step 3: The y terms have opposite signs (+6y and −6y), so add: 19x = 57, so x = 3.<br>Step 4: Put x = 3 into (1): 3(3) + 2y = 13, so 9 + 2y = 13, so 2y = 4, so y = 2.<br>Step 5: Check in (2): 5(3) − 3(2) = 15 − 6 = 9 ✓.<br><strong>Answer:</strong> x = 3, y = 2.</div>\n<h3 class=\"learn-subheading\">3. The Substitution Method</h3>\n<p class=\"learn-p\">To <span class=\"learn-keyword\">substitute</span> means to replace one thing with another. In this method we write one letter in terms of the other, then replace it in the second equation. This method is best when one equation is already written as x = ... or y = ..., or when a letter has a coefficient of 1.</p>\n<ol class=\"learn-ordered\"><li>Step 1: Pick the equation where one letter is easiest to make the subject (for example y = 2x − 1).</li><li>Step 2: Replace that letter in the OTHER equation with the expression you found. Use brackets.</li><li>Step 3: Solve the new equation, which has only one letter.</li><li>Step 4: Put the value back into the expression from Step 1 to find the other letter.</li><li>Step 5: Check in both equations.</li></ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> Solve y = 2x − 1 and 3x + 2y = 12.<br>Step 1: (1) y = 2x − 1 and (2) 3x + 2y = 12.<br>Step 2: Replace y in (2) with (2x − 1): 3x + 2(2x − 1) = 12.<br>Step 3: Expand: 3x + 4x − 2 = 12, so 7x = 14, so x = 2.<br>Step 4: Put x = 2 into (1): y = 2(2) − 1 = 3.<br>Step 5: Check in (2): 3(2) + 2(3) = 6 + 6 = 12 ✓.<br><strong>Answer:</strong> x = 2, y = 3.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Solve x − 2y = 4 and 3x + y = 19.<br>Step 1: From (1), make x the subject: x = 4 + 2y.<br>Step 2: Replace x in (2): 3(4 + 2y) + y = 19.<br>Step 3: Expand: 12 + 6y + y = 19, so 7y = 7, so y = 1.<br>Step 4: Put y = 1 into x = 4 + 2y: x = 4 + 2 = 6.<br>Step 5: Check in (2): 3(6) + 1 = 19 ✓. Check in (1): 6 − 2(1) = 4 ✓.<br><strong>Answer:</strong> x = 6, y = 1.</div>\n<h3 class=\"learn-subheading\">4. Which Method Should I Use?</h3>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Situation</th><th>Best method</th></tr></thead><tbody><tr><td>Both equations look like ax + by = c</td><td>Elimination</td></tr><tr><td>One letter already alone, like y = 2x − 1</td><td>Substitution</td></tr><tr><td>One letter has coefficient 1 (like x or −y)</td><td>Substitution is easy</td></tr><tr><td>The numbers in front of a letter are equal or opposite</td><td>Elimination straight away</td></tr></tbody></table></div>\n<p class=\"learn-p\">Both methods give the same answer. In WAEC, the question may tell you which method to use. If it does not, choose the one you are most comfortable with.</p>\n<h3 class=\"learn-subheading\">5. Solving Word Problems</h3>\n<p class=\"learn-p\">Many exam questions are stories. The steps are always the same.</p>\n<ol class=\"learn-ordered\"><li>Step 1: Read the problem slowly. Decide what two things are unknown.</li><li>Step 2: Give each unknown a letter, and say what it means (for example, \"Let x be the price of 1 kg of rice\").</li><li>Step 3: Turn each sentence of facts into one equation.</li><li>Step 4: Solve the equations by elimination or substitution.</li><li>Step 5: Answer the question in words with the units, and check with the story.</li></ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 5:</strong> At a market, 3 kg of rice and 2 kg of beans cost ₦8,000. 2 kg of rice and 3 kg of beans cost ₦7,000. Find the price of 1 kg of each.<br>Step 1: Let rice cost ₦x per kg and beans cost ₦y per kg.<br>Step 2: (1) 3x + 2y = 8000 and (2) 2x + 3y = 7000.<br>Step 3: Make the y terms equal: (1) × 3 gives 9x + 6y = 24000. (2) × 2 gives 4x + 6y = 14000.<br>Step 4: The y terms have the same sign, so subtract: 5x = 10000, so x = 2000.<br>Step 5: Put x = 2000 into (1): 3(2000) + 2y = 8000, so 6000 + 2y = 8000, so y = 1000.<br>Step 6: Check in (2): 2(2000) + 3(1000) = 4000 + 3000 = 7000 ✓.<br><strong>Answer:</strong> rice is ₦2,000 per kg and beans is ₦1,000 per kg.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 6:</strong> The sum of the ages of a father and his son is 50 years. The father is 4 times as old as his son. Find their ages.<br>Step 1: Let the father be x years and the son y years.<br>Step 2: (1) x + y = 50 and (2) x = 4y.<br>Step 3: Substitute (2) into (1): 4y + y = 50, so 5y = 50, so y = 10.<br>Step 4: x = 4 × 10 = 40.<br>Step 5: Check: 40 + 10 = 50 ✓ and 40 = 4 × 10 ✓.<br><strong>Answer:</strong> the father is 40 years old and the son is 10 years old.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 7:</strong> A rectangular plot has a perimeter of 38 m. Its length is 5 m more than its width. Find the length, the width and the area.<br>Step 1: Let length = l metres and width = w metres.<br>Step 2: Perimeter = 2(l + w) = 38, so (1) l + w = 19. Also (2) l − w = 5.<br>Step 3: Add (1) and (2): 2l = 24, so l = 12.<br>Step 4: Put l = 12 into (1): 12 + w = 19, so w = 7.<br>Step 5: Check: 2(12 + 7) = 38 ✓ and 12 − 7 = 5 ✓. Area = 12 × 7 = 84.<br><strong>Answer:</strong> length 12 m, width 7 m, area 84 m².</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> 1. Adding when the signs are the same, or subtracting when they are different. Remember: same signs subtract, different signs add.<br>2. Multiplying only one term of an equation. When you multiply an equation by a number, multiply EVERY term, including the number on the right.<br>3. Forgetting brackets in substitution. 3x + 2(2x − 1) must give 4x − 2 inside, not 4x − 1.<br>4. Finding only x and stopping. Always find BOTH letters, and check in the original equations.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC often writes: \"Solve the simultaneous equations ...\" or gives a story and says \"Form two equations and solve them\". Marks are given for defining your letters, for each correct equation, for the working and for the final answer with units. Always write \"Let x = ...\" at the start of a word problem and check your answer in the story.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> • Simultaneous equations have two letters and two equations true together.<br>• The solution is the one pair of values that fits both equations.<br>• Elimination: make coefficients equal, then subtract (same signs) or add (different signs).<br>• Substitution: write one letter in terms of the other, then replace it in the second equation.<br>• For word problems: define letters, form two equations, solve, answer in words.<br>• Always check your answer in the original equations.</div>",
    "questions": [
      {
        "q": "The pair of values of x and y that makes BOTH simultaneous equations true is called the",
        "o": [
          "solution",
          "coefficient",
          "variable",
          "constant"
        ],
        "a": 0,
        "e": "The solution is the one pair of values that fits both equations at the same time. A coefficient is the number in front of a letter, and a variable is the letter itself.",
        "h": "It is the answer you are looking for.",
        "yr": "SS2"
      },
      {
        "q": "In the elimination method, when the two terms you want to remove have the SAME sign, you should",
        "o": [
          "add the equations",
          "subtract the equations",
          "multiply the equations together",
          "divide the equations"
        ],
        "a": 1,
        "e": "Same signs subtract and different signs add. For example 3y and 3y have the same sign, so subtracting gives 3y − 3y = 0 and the letter is eliminated. Adding would give 6y and the letter would stay.",
        "h": "Same signs subtract, different signs add.",
        "yr": "SS2"
      },
      {
        "q": "Which pair of values satisfies both x + y = 5 and x − y = 1?",
        "o": [
          "x = 2, y = 3",
          "x = 4, y = 1",
          "x = 3, y = 2",
          "x = 1, y = 4"
        ],
        "a": 2,
        "e": "Test x = 3, y = 2: 3 + 2 = 5 and 3 − 2 = 1, so both are true. The pair x = 2, y = 3 gives 2 − 3 = −1, so it fails the second equation.",
        "h": "Substitute each pair into both equations.",
        "yr": "SS2"
      },
      {
        "q": "Solving 2x + 3y = 12 and 4x − 3y = 6, the value of x is",
        "o": [
          "1",
          "2",
          "6",
          "3"
        ],
        "a": 3,
        "e": "The y terms are +3y and −3y (opposite signs), so add the equations: 6x = 18 and x = 3. Then 2(3) + 3y = 12 gives y = 2.",
        "h": "Add the two equations to remove y.",
        "yr": "SS2"
      },
      {
        "q": "Which method is easiest for the equations y = 2x − 1 and 3x + 2y = 12?",
        "o": [
          "Substitution",
          "Adding the equations straight away",
          "Factorisation",
          "Completing the square"
        ],
        "a": 0,
        "e": "Since y is already alone in the first equation, you can replace y in the second equation with (2x − 1). Adding the equations straight away does not remove any letter here.",
        "h": "One letter is already the subject.",
        "yr": "SS2"
      },
      {
        "q": "To eliminate y from 3x + 2y = 13 and 5x − 3y = 9, you should multiply",
        "o": [
          "the first by 2 and the second by 3",
          "the first by 3 and the second by 2",
          "the first by 5 and the second by 3",
          "the first by 3 and the second by 5"
        ],
        "a": 1,
        "e": "Multiplying the first by 3 gives 6y and the second by 2 gives −6y, so the y terms are equal in size and can be added. Multiplying by 5 and 3 would make the x terms equal instead.",
        "h": "Make the y coefficients equal in size (the LCM of 2 and 3).",
        "yr": "SS2"
      },
      {
        "q": "If x + y = 10 and x − y = 4, then x is",
        "o": [
          "3",
          "4",
          "7",
          "6"
        ],
        "a": 2,
        "e": "Add the equations: 2x = 14, so x = 7. Then y = 10 − 7 = 3. The value 3 is y, not x.",
        "h": "Add the equations; y cancels.",
        "yr": "SS2"
      },
      {
        "q": "Solve y = 2x − 1 and 3x + 2y = 12. The value of y is",
        "o": [
          "1",
          "2",
          "5",
          "3"
        ],
        "a": 3,
        "e": "Substitute: 3x + 2(2x − 1) = 12, so 7x − 2 = 12, so x = 2. Then y = 2(2) − 1 = 3. The value 2 is x, not y.",
        "h": "Find x first, then use y = 2x − 1.",
        "yr": "SS2"
      },
      {
        "q": "Solve 2x + y = 7 and x − y = 2. The value of y is",
        "o": [
          "1",
          "3",
          "5",
          "2"
        ],
        "a": 0,
        "e": "The y terms are +y and −y, so add: 3x = 9, giving x = 3. Then 3 − y = 2 gives y = 1. Check in the first equation: 2(3) + 1 = 7 ✓.",
        "h": "Add the equations to get x first.",
        "yr": "SS2"
      },
      {
        "q": "The sum of two numbers is 25 and their difference is 7. The larger number is",
        "o": [
          "9",
          "16",
          "18",
          "14"
        ],
        "a": 1,
        "e": "Let the numbers be x and y: x + y = 25 and x − y = 7. Adding gives 2x = 32, so x = 16 and y = 9. The number 9 is the smaller one.",
        "h": "Write x + y = 25 and x − y = 7.",
        "yr": "SS2"
      },
      {
        "q": "The sum of the ages of a father and son is 60 years, and the father is 5 times as old as the son. The son's age is",
        "o": [
          "12",
          "15",
          "10",
          "5"
        ],
        "a": 2,
        "e": "Let the son be y and the father 5y. Then 5y + y = 60, so 6y = 60 and y = 10. The father is 50 years old.",
        "h": "Write the father's age as 5 times the son's age.",
        "yr": "SS2"
      },
      {
        "q": "2 pens and 1 book cost ₦700. 1 pen and 1 book cost ₦500. The price of one book is",
        "o": [
          "₦200",
          "₦400",
          "₦250",
          "₦300"
        ],
        "a": 3,
        "e": "Let a pen be ₦p and a book ₦b: 2p + b = 700 and p + b = 500. Subtracting gives p = 200, so b = 500 − 200 = 300. ₦200 is the price of a pen, not a book.",
        "h": "Subtract the second equation from the first.",
        "yr": "SS2"
      },
      {
        "q": "Multiplying the equation 2x − y = 4 by 3 gives",
        "o": [
          "6x − 3y = 12",
          "6x − y = 12",
          "6x − 3y = 4",
          "6x − 3y = 7"
        ],
        "a": 0,
        "e": "Every term must be multiplied by 3, including the number on the right: 6x − 3y = 12. Leaving out y or the 4 is a common mistake.",
        "h": "Multiply every single term.",
        "yr": "SS2"
      },
      {
        "q": "A rectangle has a perimeter of 30 m and its length is 3 m more than its width. Its area is",
        "o": [
          "45 m²",
          "54 m²",
          "18 m²",
          "63 m²"
        ],
        "a": 1,
        "e": "l + w = 15 (half the perimeter) and l − w = 3. Adding gives 2l = 18, so l = 9 and w = 6. Area = 9 × 6 = 54 m².",
        "h": "Half the perimeter is l + w.",
        "yr": "SS2"
      },
      {
        "q": "Solve 5x + 2y = 23 and 3x − 2y = 1. The value of the product xy is",
        "o": [
          "7",
          "1",
          "12",
          "24"
        ],
        "a": 2,
        "e": "The y terms are +2y and −2y, so add: 8x = 24, so x = 3. Then 15 + 2y = 23 gives y = 4. So xy = 3 × 4 = 12. The value 7 is x + y.",
        "h": "Find x and y separately, then multiply.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Graphical Solutions",
    "topicCode": "SS2-MATH-07",
    "module": "Simultaneous Equations and Graphs",
    "term": "First Term",
    "contentHTML": "<div class=\"learn-intro\">A <span class=\"learn-keyword\">graph</span> is a picture of an equation. Instead of only using algebra, we can draw the equation on graph paper and read the answer from the picture. For example, when a footballer kicks a ball in a school field, the height of the ball is described by a quadratic equation, and the graph shows the path of the ball and the highest point it reaches. In this topic you will learn to draw graphs of linear and quadratic equations, to solve simultaneous equations by graph, and to interpret (explain the meaning of) what the graph shows.</div>\n<h3 class=\"learn-subheading\">1. Axes, Coordinates and Scale</h3>\n<p class=\"learn-p\">A graph is drawn on two lines called <span class=\"learn-keyword\">axes</span>. The horizontal line is the x-axis and the vertical line is the y-axis. They cross at the <span class=\"learn-keyword\">origin</span>, which is the point (0, 0). A point is written as a pair of <span class=\"learn-keyword\">coordinates</span> (x, y): first how far across, then how far up or down.</p>\n<p class=\"learn-p\">Before you draw, you must choose a <span class=\"learn-keyword\">scale</span>. This tells how many centimetres on the paper stand for one unit on the axis. A good scale uses most of the graph paper. WAEC usually states the scale, for example \"2 cm to 1 unit on the x-axis and 2 cm to 5 units on the y-axis\". Always use the scale given, and label both axes.</p>\n<h3 class=\"learn-subheading\">2. Drawing the Graph of a Linear Equation</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">linear equation</span> such as y = 2x − 1 gives a <strong>straight line</strong> when drawn. The steps are:</p>\n<ol class=\"learn-ordered\"><li>Step 1: Make a table of values. Choose several x values and work out each y value.</li><li>Step 2: Write each pair as a point (x, y).</li><li>Step 3: Plot the points on the graph paper using the scale.</li><li>Step 4: Join the points with a ruler and a sharp pencil. Extend the line a little and label it with its equation.</li></ol>\n<p class=\"learn-p\">Two points are enough to fix a straight line, but plot at least three. If the third point does not lie on the line, you have made a mistake.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Draw up a table of values for y = 2x − 1 for x from −2 to 4.<br>Step 1: x = −2: y = 2(−2) − 1 = −5. x = −1: y = −2 − 1 = −3. x = 0: y = −1.<br>Step 2: x = 1: y = 2 − 1 = 1. x = 2: y = 4 − 1 = 3. x = 3: y = 6 − 1 = 5. x = 4: y = 8 − 1 = 7.<br>Table: x = −2, −1, 0, 1, 2, 3, 4 and y = −5, −3, −1, 1, 3, 5, 7.<br>Step 3: Plot (−2, −5), (−1, −3), (0, −1), (1, 1), (2, 3), (3, 5), (4, 7) and join with a ruler. Notice that y goes up by 2 every time x goes up by 1, so the points lie in a straight line.<br><strong>Answer:</strong> a straight line passing through (0, −1) and (1, 1).</div>\n<h3 class=\"learn-subheading\">3. Drawing the Graph of a Quadratic Equation</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">quadratic equation</span> in graph form looks like y = ax² + bx + c, where a is not zero. Its graph is not a straight line. It is a smooth U-shaped curve called a <span class=\"learn-keyword\">parabola</span>.</p>\n<ul class=\"learn-list\"><li>If a is positive (like x²), the curve opens upward (U shape) and has a lowest point called the <span class=\"learn-keyword\">minimum point</span>.</li><li>If a is negative (like −x²), the curve opens downward (∩ shape) and has a highest point called the <span class=\"learn-keyword\">maximum point</span>.</li><li>The curve is symmetrical about a vertical line through its turning point. This line is the <span class=\"learn-keyword\">axis of symmetry</span>.</li></ul>\n<p class=\"learn-p\">Use more points than for a straight line, so the curve is smooth. Join the points with a <strong>smooth freehand curve</strong>, not with a ruler. Do not make the curve pointed at the bottom or top.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> Copy and complete the table for y = x² − 2x − 3 for −2 ≤ x ≤ 4, and describe the graph.<br>x = −2: y = 4 + 4 − 3 = 5.<br>x = −1: y = 1 + 2 − 3 = 0.<br>x = 0: y = 0 − 0 − 3 = −3.<br>x = 1: y = 1 − 2 − 3 = −4.<br>x = 2: y = 4 − 4 − 3 = −3.<br>x = 3: y = 9 − 6 − 3 = 0.<br>x = 4: y = 16 − 8 − 3 = 5.<br>Table: x = −2, −1, 0, 1, 2, 3, 4 and y = 5, 0, −3, −4, −3, 0, 5.<br>Plot the points and join with a smooth curve. The curve opens upward. The lowest point is (1, −4). The axis of symmetry is x = 1, because the y values repeat on both sides of x = 1 (for example y = 5 at x = −2 and x = 4).<br><strong>Answer:</strong> a U-shaped curve with minimum point (1, −4).</div>\n<h3 class=\"learn-subheading\">4. Solving Simultaneous Equations by Graph</h3>\n<p class=\"learn-p\">Each equation draws a line or curve. The point where the two graphs <span class=\"learn-keyword\">intersect</span> (cross each other) is a point that lies on BOTH graphs. So its coordinates satisfy both equations. That means the coordinates of the intersection point are the solution of the simultaneous equations.</p>\n<ol class=\"learn-ordered\"><li>Step 1: Make a table of values for each equation.</li><li>Step 2: Draw both graphs on the SAME axes with the same scale.</li><li>Step 3: Read the x and y coordinates of each point where they cross.</li><li>Step 4: Check by putting the values into both equations.</li></ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> Solve y = x + 1 and y = 5 − x by the graphical method.<br>Step 1: Table for y = x + 1: x = 0 gives y = 1; x = 2 gives y = 3; x = 4 gives y = 5.<br>Table for y = 5 − x: x = 0 gives y = 5; x = 2 gives y = 3; x = 4 gives y = 1.<br>Step 2: Plot both lines on the same axes.<br>Step 3: The lines cross at the point (2, 3), so x = 2 and y = 3.<br>Step 4: Check. y = x + 1: 2 + 1 = 3 ✓. y = 5 − x: 5 − 2 = 3 ✓.<br><strong>Answer:</strong> x = 2, y = 3.</div>\n<h4 class=\"learn-subsubheading\">A line and a curve</h4>\n<p class=\"learn-p\">A straight line can cut a curve at two points, so there can be two solutions. This is how we solve a quadratic equation using a graph that is already drawn. We write the equation so that one side is the curve's equation, and the other side is a straight line.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Using the graph of y = x² − 2x − 3, find the roots of x² − 3x − 4 = 0.<br>Step 1: Write x² − 3x − 4 = 0 as x² − 2x − 3 = x + 1. To check: subtract x and subtract 1 from both sides, x² − 2x − 3 − x − 1 = 0 gives x² − 3x − 4 = 0 ✓.<br>Step 2: So draw the straight line y = x + 1 on the same axes as the curve. For the line: x = −1 gives y = 0; x = 0 gives y = 1; x = 4 gives y = 5.<br>Step 3: The line cuts the curve at (−1, 0) and (4, 5). Both points are in the table of Example 2.<br>Step 4: The x values of these points are the roots: x = −1 and x = 4.<br>Step 5: Check: (−1)² − 3(−1) − 4 = 1 + 3 − 4 = 0 ✓. 4² − 3(4) − 4 = 16 − 12 − 4 = 0 ✓.<br><strong>Answer:</strong> x = −1 or x = 4.</div>\n<h3 class=\"learn-subheading\">5. Interpreting Graphs</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Interpreting</span> a graph means reading information from it and saying what it means. For a quadratic graph:</p>\n<ul class=\"learn-list\"><li><strong>Roots of ax² + bx + c = 0:</strong> the x values where the curve y = ax² + bx + c cuts the x-axis (where y = 0). These are the x-intercepts.</li><li><strong>Minimum or maximum value:</strong> the y value of the turning point.</li><li><strong>Axis of symmetry:</strong> the vertical line x = (the x value of the turning point).</li><li><strong>Value of y for a given x:</strong> go up from x on the x-axis to the curve, then across to the y-axis.</li><li><strong>Value of x for a given y:</strong> go across from y to the curve, then down to the x-axis. There are usually two answers.</li></ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 5:</strong> The height h metres of a football t seconds after it is kicked is h = 6t − t². Complete the table and interpret the graph.<br>t = 0: h = 0. t = 1: h = 6 − 1 = 5. t = 2: h = 12 − 4 = 8. t = 3: h = 18 − 9 = 9. t = 4: h = 24 − 16 = 8. t = 5: h = 30 − 25 = 5. t = 6: h = 36 − 36 = 0.<br>Table: t = 0, 1, 2, 3, 4, 5, 6 and h = 0, 5, 8, 9, 8, 5, 0.<br>Interpretation: the ball is highest at t = 3 seconds, and the maximum height is 9 m. The ball is on the ground (h = 0) at t = 0 and t = 6, so it stays in the air for 6 seconds. The curve is symmetrical about t = 3.<br><strong>Answer:</strong> maximum height 9 m, reached after 3 s; the ball lands after 6 s.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> 1. Joining quadratic points with a ruler. The graph must be a smooth curve.<br>2. Calculation errors in the table, especially with negative numbers. Remember (−2)² = 4, not −4, and −2 × (−2) = +4.<br>3. Using different scales for the two graphs when solving simultaneous equations. Both graphs must be on the same axes.<br>4. Giving only the y value of the intersection point, or writing the point instead of the roots. For a quadratic equation, the roots are the x values only.<br>5. Not labelling the axes, the scale or the graphs.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC often says: \"Copy and complete the table of values ... Using a scale of 2 cm to 1 unit ... draw the graph ... Use your graph to find (i) the roots of ... (ii) the minimum value ... (iii) the values of x when y = ...\". Marks are given for correct table entries, correct plotting, a smooth curve and the readings. Show your reading lines lightly on the graph, and write the answer clearly. The readings should be close to the exact values.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> • Always make a table of values, plot the points and join them.<br>• A linear equation gives a straight line (use a ruler). A quadratic equation gives a smooth parabola.<br>• For simultaneous equations, draw both graphs on the same axes. The intersection point gives the solution.<br>• The roots of a quadratic equation are the x values where the curve crosses the x-axis.<br>• The turning point gives the minimum or maximum value and the axis of symmetry.<br>• Use the given scale and label everything.</div>",
    "questions": [
      {
        "q": "The graph of a linear equation such as y = 2x − 1 is",
        "o": [
          "a straight line",
          "a parabola",
          "a circle",
          "a smooth U-shaped curve"
        ],
        "a": 0,
        "e": "A linear equation has no x² term, so its graph is a straight line. A U-shaped curve (parabola) is the graph of a quadratic equation.",
        "h": "Think about whether the equation has an x² term.",
        "yr": "SS2"
      },
      {
        "q": "The graph of y = ax² + bx + c (a not zero) is called a",
        "o": [
          "straight line",
          "parabola",
          "scale",
          "gradient"
        ],
        "a": 1,
        "e": "The graph of a quadratic equation is a smooth curve called a parabola. It opens upward if a is positive and downward if a is negative.",
        "h": "It is a smooth U-shaped curve.",
        "yr": "SS2"
      },
      {
        "q": "For y = x² − 2x − 3, the value of y when x = −2 is",
        "o": [
          "−3",
          "3",
          "5",
          "−5"
        ],
        "a": 2,
        "e": "Put x = −2: y = (−2)² − 2(−2) − 3 = 4 + 4 − 3 = 5. A common error is to write (−2)² as −4, which would give a wrong answer.",
        "h": "(−2)² is positive 4.",
        "yr": "SS2"
      },
      {
        "q": "For y = 2x − 1, the value of y when x = −2 is",
        "o": [
          "−3",
          "3",
          "5",
          "−5"
        ],
        "a": 3,
        "e": "Put x = −2: y = 2(−2) − 1 = −4 − 1 = −5. The answer −3 comes from forgetting to subtract the 1.",
        "h": "Multiply first, then subtract 1.",
        "yr": "SS2"
      },
      {
        "q": "When two graphs are drawn on the same axes to solve simultaneous equations, the solution is",
        "o": [
          "the coordinates of the point where they cross",
          "the point where each graph cuts the y-axis",
          "the gradient of each line",
          "the origin"
        ],
        "a": 0,
        "e": "The intersection point lies on both graphs, so its x and y values satisfy both equations. That is exactly what a solution means.",
        "h": "Which point lies on both graphs?",
        "yr": "SS2"
      },
      {
        "q": "The straight lines y = x + 1 and y = 5 − x meet at the point",
        "o": [
          "(3, 2)",
          "(2, 3)",
          "(1, 4)",
          "(4, 1)"
        ],
        "a": 1,
        "e": "At the meeting point x + 1 = 5 − x, so 2x = 4 and x = 2. Then y = 2 + 1 = 3, so the point is (2, 3). The point (3, 2) has x and y in the wrong order.",
        "h": "Set the two right-hand sides equal.",
        "yr": "SS2"
      },
      {
        "q": "The roots of a quadratic equation ax² + bx + c = 0 are shown on the graph of y = ax² + bx + c where the curve cuts the",
        "o": [
          "y-axis",
          "line y = 1",
          "x-axis",
          "origin only"
        ],
        "a": 2,
        "e": "The roots are the values of x for which y = 0, and y = 0 is the x-axis. So we read the x values where the curve crosses the x-axis.",
        "h": "At the roots, y equals zero.",
        "yr": "SS2"
      },
      {
        "q": "From the table for y = x² − 2x − 3 (y = 0 at x = −1 and x = 3), the roots of x² − 2x − 3 = 0 are",
        "o": [
          "1 and −3",
          "−1 and −3",
          "1 and 3",
          "−1 and 3"
        ],
        "a": 3,
        "e": "The roots are the x values where y = 0, which are x = −1 and x = 3. Check: (x + 1)(x − 3) = x² − 2x − 3 ✓.",
        "h": "Look at the x values in the columns where y = 0.",
        "yr": "SS2"
      },
      {
        "q": "The minimum value of y = x² − 2x − 3 is",
        "o": [
          "−4",
          "1",
          "−3",
          "−1"
        ],
        "a": 0,
        "e": "The table gives y = −4 at x = 1, which is the lowest point of the curve. The value 1 is the x coordinate of the turning point, not the minimum value of y.",
        "h": "The minimum value is a y value.",
        "yr": "SS2"
      },
      {
        "q": "The axis of symmetry of the curve y = x² − 2x − 3 is the line",
        "o": [
          "x = −1",
          "x = 1",
          "x = 3",
          "x = −3"
        ],
        "a": 1,
        "e": "The turning point is (1, −4), and the curve is symmetrical about the vertical line through it, x = 1. For example, y = 5 at both x = −2 and x = 4, which are equally far from 1.",
        "h": "It passes through the turning point.",
        "yr": "SS2"
      },
      {
        "q": "The graph of y = x² − 2x − 3 is drawn. Which straight line should be drawn on the same axes to solve x² − 3x − 4 = 0?",
        "o": [
          "y = x − 1",
          "y = 3x + 4",
          "y = x + 1",
          "y = 4 − x"
        ],
        "a": 2,
        "e": "Set x² − 2x − 3 = x + 1. Moving everything to one side gives x² − 3x − 4 = 0, which is the required equation. The other lines would give different equations.",
        "h": "Subtract the new equation from the curve's equation.",
        "yr": "SS2"
      },
      {
        "q": "The height of a ball is h = 6t − t² metres after t seconds. Its maximum height is",
        "o": [
          "6 m",
          "3 m",
          "8 m",
          "9 m"
        ],
        "a": 3,
        "e": "The table gives the highest value at t = 3: h = 6(3) − 9 = 18 − 9 = 9 m. The number 3 is the time, not the height.",
        "h": "Find h at t = 3.",
        "yr": "SS2"
      },
      {
        "q": "For h = 6t − t², the ball returns to the ground after",
        "o": [
          "6 s",
          "3 s",
          "9 s",
          "12 s"
        ],
        "a": 0,
        "e": "h = 0 when 6t − t² = 0, so t(6 − t) = 0, so t = 0 or t = 6. The ball is back on the ground after 6 seconds. At t = 3 it is at its highest point.",
        "h": "Find the second time when h = 0.",
        "yr": "SS2"
      },
      {
        "q": "For y = x² − 2x − 3, the value of y when x = 2.5 is",
        "o": [
          "1.75",
          "−1.75",
          "−2.25",
          "−3.25"
        ],
        "a": 1,
        "e": "y = (2.5)² − 2(2.5) − 3 = 6.25 − 5 − 3 = −1.75. This is between y = −3 at x = 2 and y = 0 at x = 3, so a negative value is sensible.",
        "h": "Use brackets for 2.5² = 6.25.",
        "yr": "SS2"
      },
      {
        "q": "The lines y = 2x − 1 and y = 2x + 3 are drawn on the same axes. How many solutions do the simultaneous equations have?",
        "o": [
          "One solution",
          "Two solutions",
          "No solution, because the lines are parallel and never meet",
          "Infinitely many solutions"
        ],
        "a": 2,
        "e": "Both lines have the same slope (the coefficient of x is 2), so they are parallel and never cross. With no intersection point, there is no solution. Algebra agrees: 2x − 1 = 2x + 3 would mean −1 = 3, which is false.",
        "h": "Compare the coefficients of x.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Straight Line Graphs",
    "topicCode": "SS2-MATH-08",
    "module": "Simultaneous Equations and Graphs",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">Look at a road going up a hill near Jos. Some roads are steep and some are gentle. The measure of how steep a line is, is called its <span class=\"learn-keyword\">gradient</span> (also called slope). A straight line also cuts the axes at certain points called <span class=\"learn-keyword\">intercepts</span>. Together, the gradient and the intercept tell us the <span class=\"learn-keyword\">equation of a straight line</span>. In this topic you will learn to find the gradient, the intercepts and the equation of a line, and how to draw a tangent to a curve to find how steep the curve is at one point.</div>\n<h3 class=\"learn-subheading\">1. The Gradient of a Straight Line</h3>\n<p class=\"learn-p\">The gradient tells us how much y changes when x increases by 1. It is found by dividing the <strong>rise</strong> (change in y, going up or down) by the <strong>run</strong> (change in x, going across).</p>\n<p class=\"learn-p\"><strong>Gradient m = (y₂ − y₁) ÷ (x₂ − x₁)</strong>, where (x₁, y₁) and (x₂, y₂) are two points on the line.</p>\n<ul class=\"learn-list\"><li>A line going UP from left to right has a <strong>positive</strong> gradient.</li><li>A line going DOWN from left to right has a <strong>negative</strong> gradient.</li><li>A horizontal line has gradient <strong>0</strong>.</li><li>A vertical line has no gradient (the idea does not apply).</li><li><span class=\"learn-keyword\">Parallel lines</span> (lines that never meet) have the <strong>same gradient</strong>.</li></ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Find the gradient of the line through (1, 2) and (4, 11).<br>Step 1: Let (x₁, y₁) = (1, 2) and (x₂, y₂) = (4, 11).<br>Step 2: Rise = 11 − 2 = 9. Run = 4 − 1 = 3.<br>Step 3: Gradient = 9 ÷ 3 = 3.<br>Check with the other order: (2 − 11) ÷ (1 − 4) = (−9) ÷ (−3) = 3 ✓.<br><strong>Answer:</strong> gradient = 3.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> Find the gradient of the line through (0, 5) and (2, 1).<br>Step 1: Rise = 1 − 5 = −4. Run = 2 − 0 = 2.<br>Step 2: Gradient = −4 ÷ 2 = −2.<br>The gradient is negative because the line goes down from left to right.<br><strong>Answer:</strong> gradient = −2.</div>\n<h3 class=\"learn-subheading\">2. The Equation of a Straight Line: y = mx + c</h3>\n<p class=\"learn-p\">Every straight line (that is not vertical) can be written as <strong>y = mx + c</strong>.</p>\n<ul class=\"learn-list\"><li><strong>m</strong> is the gradient of the line.</li><li><strong>c</strong> is the <span class=\"learn-keyword\">y-intercept</span>: the value of y where the line cuts the y-axis (where x = 0).</li></ul>\n<p class=\"learn-p\">So in y = 3x − 7 the gradient is 3 and the line cuts the y-axis at −7. If an equation is not in this form, make y the subject first. For example, 2y − 4x = 6 gives 2y = 4x + 6, so y = 2x + 3. The gradient is 2 and the y-intercept is 3.</p>\n<h4 class=\"learn-subsubheading\">Finding the equation of a line</h4>\n<ol class=\"learn-ordered\"><li>Step 1: Find the gradient m (from two points, or it is given).</li><li>Step 2: Put one known point (x₁, y₁) in the formula y − y₁ = m(x − x₁).</li><li>Step 3: Expand and make y the subject to get y = mx + c.</li><li>Step 4: Check with the other point.</li></ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> Find the equation of the line with gradient 2 that passes through (1, 5).<br>Step 1: m = 2 and the point is (1, 5).<br>Step 2: y − 5 = 2(x − 1).<br>Step 3: y − 5 = 2x − 2, so y = 2x + 3.<br>Step 4: Check: x = 1 gives y = 2 + 3 = 5 ✓.<br><strong>Answer:</strong> y = 2x + 3.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Find the equation of the line through (2, 3) and (4, 9).<br>Step 1: Gradient = (9 − 3) ÷ (4 − 2) = 6 ÷ 2 = 3.<br>Step 2: Use the point (2, 3): y − 3 = 3(x − 2).<br>Step 3: y − 3 = 3x − 6, so y = 3x − 3.<br>Step 4: Check with (4, 9): 3(4) − 3 = 12 − 3 = 9 ✓.<br><strong>Answer:</strong> y = 3x − 3.</div>\n<h3 class=\"learn-subheading\">3. The x- and y-Intercepts</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">y-intercept</span> is where the line cuts the y-axis. On the y-axis, x = 0. So put x = 0 in the equation and solve for y.</p>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">x-intercept</span> is where the line cuts the x-axis. On the x-axis, y = 0. So put y = 0 in the equation and solve for x.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Intercept</th><th>Where the line cuts</th><th>What to put in the equation</th></tr></thead><tbody><tr><td>x-intercept</td><td>x-axis</td><td>y = 0</td></tr><tr><td>y-intercept</td><td>y-axis</td><td>x = 0</td></tr></tbody></table></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 5:</strong> For the line 3x + 2y = 12, find the x-intercept, the y-intercept and the gradient. Then say how to draw it.<br>Step 1: x-intercept: put y = 0. 3x + 0 = 12, so x = 4. The line cuts the x-axis at (4, 0).<br>Step 2: y-intercept: put x = 0. 0 + 2y = 12, so y = 6. The line cuts the y-axis at (0, 6).<br>Step 3: Gradient: make y the subject. 2y = −3x + 12, so y = −(3/2)x + 6. So m = −3/2 and c = 6.<br>Step 4: Check with the points: gradient = (6 − 0) ÷ (0 − 4) = 6 ÷ (−4) = −3/2 ✓.<br>Step 5: To draw it, plot (4, 0) and (0, 6) and join them with a ruler.<br><strong>Answer:</strong> x-intercept 4, y-intercept 6, gradient −3/2.</div>\n<h3 class=\"learn-subheading\">4. Drawing a Straight Line from Its Equation</h3>\n<p class=\"learn-p\">You can draw a line in three ways.</p>\n<ul class=\"learn-list\"><li><strong>Table of values:</strong> choose 3 values of x, find y, plot and join.</li><li><strong>Intercepts:</strong> find where the line cuts the two axes, plot the two points and join.</li><li><strong>Gradient and intercept:</strong> start at (0, c) on the y-axis, then use the gradient. For m = 2, move 1 across and 2 up to find another point.</li></ul>\n<p class=\"learn-p\">Always extend the line past the plotted points, and label it with its equation.</p>\n<h3 class=\"learn-subheading\">5. Drawing a Tangent to a Curve at a Point</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">tangent</span> is a straight line that just touches a curve at one point, without cutting through the curve at that point. The tangent has the same steepness as the curve at that point. So the <strong>gradient of the tangent is the gradient of the curve at that point.</strong></p>\n<ol class=\"learn-ordered\"><li>Step 1: Draw the curve neatly on graph paper.</li><li>Step 2: Mark the point on the curve where you want the tangent.</li><li>Step 3: Place a transparent ruler so that it touches the curve only at this point and the curve lies equally on both sides of the ruler near the point.</li><li>Step 4: Draw the straight line along the ruler and extend it both ways.</li><li>Step 5: Choose two clear points on the tangent line far apart from each other, and read their coordinates.</li><li>Step 6: Work out the gradient = rise ÷ run.</li></ol>\n<p class=\"learn-p\">At the lowest or highest point of a curve (the turning point) the tangent is horizontal, so the gradient there is 0.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 6:</strong> The curve y = x² − 2x − 3 passes through (3, 0). A tangent is drawn at x = 3 and it passes through the points (2, −4) and (4, 4). Find the gradient of the curve at x = 3 and the equation of the tangent.<br>Step 1: Gradient = (4 − (−4)) ÷ (4 − 2) = 8 ÷ 2 = 4.<br>Step 2: The tangent touches the curve at (3, 0). So y − 0 = 4(x − 3), which gives y = 4x − 12.<br>Step 3: Check the points: x = 2 gives y = 8 − 12 = −4 ✓. x = 4 gives y = 16 − 12 = 4 ✓.<br>The gradient is positive because the curve is going upward at x = 3.<br><strong>Answer:</strong> gradient = 4 and the tangent is y = 4x − 12. (Readings from a hand-drawn tangent may differ a little from 4, which is allowed in the exam.)</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 7:</strong> Show that the line 2y − 4x = 6 is parallel to y = 2x − 5.<br>Step 1: Make y the subject in the first line: 2y = 4x + 6, so y = 2x + 3. Gradient = 2.<br>Step 2: The second line y = 2x − 5 has gradient 2.<br>Step 3: The gradients are equal, so the lines are parallel. Their y-intercepts are different (3 and −5), so they are not the same line.<br><strong>Conclusion:</strong> the lines are parallel.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> 1. Subtracting the coordinates in different orders on top and bottom. If you use y₂ − y₁ on top, use x₂ − x₁ at the bottom.<br>2. Reading the gradient straight from 3x + 2y = 12 as 3. First make y the subject.<br>3. Mixing up the intercepts: for the x-intercept put y = 0, and for the y-intercept put x = 0.<br>4. Drawing a tangent that cuts through the curve, or choosing two points too close together. This makes the gradient inaccurate.<br>5. Forgetting the negative sign when a line goes down from left to right.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC asks: \"Find the gradient of the line joining ...\", \"Find the equation of the line ...\", \"Find the x- and y-intercepts\" or \"Draw a tangent to the curve at x = ... and find its gradient\". Show the formula and every substitution, and give the answer as an equation y = mx + c if the question says \"equation\". For a tangent, show the two points you used on the tangent line, and mark them clearly on your graph.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> • Gradient = (y₂ − y₁) ÷ (x₂ − x₁) = rise ÷ run.<br>• The equation of a straight line is y = mx + c, where m is the gradient and c is the y-intercept.<br>• For the x-intercept put y = 0. For the y-intercept put x = 0.<br>• Parallel lines have equal gradients.<br>• A tangent touches a curve at one point, and its gradient is the gradient of the curve there.<br>• To find a gradient from a tangent, use two points far apart on the tangent line.</div>",
    "questions": [
      {
        "q": "In the equation y = mx + c, the letter m stands for the",
        "o": [
          "gradient of the line",
          "y-intercept",
          "x-intercept",
          "origin"
        ],
        "a": 0,
        "e": "In y = mx + c, m is the gradient (slope) of the line. The letter c is the y-intercept.",
        "h": "It is the number multiplying x.",
        "yr": "SS2"
      },
      {
        "q": "In the equation y = mx + c, the letter c stands for",
        "o": [
          "the gradient",
          "the y-intercept",
          "the x-intercept",
          "the midpoint"
        ],
        "a": 1,
        "e": "When x = 0, y = c, so c is where the line cuts the y-axis. It is called the y-intercept.",
        "h": "Put x = 0 and see what is left.",
        "yr": "SS2"
      },
      {
        "q": "The gradient of the line through (1, 2) and (4, 11) is",
        "o": [
          "9",
          "1/3",
          "3",
          "2"
        ],
        "a": 2,
        "e": "Gradient = (11 − 2) ÷ (4 − 1) = 9 ÷ 3 = 3. The answer 9 forgets to divide by the change in x.",
        "h": "Rise divided by run.",
        "yr": "SS2"
      },
      {
        "q": "The gradient of the line through (0, 5) and (2, 1) is",
        "o": [
          "2",
          "1/2",
          "−1/2",
          "−2"
        ],
        "a": 3,
        "e": "Gradient = (1 − 5) ÷ (2 − 0) = −4 ÷ 2 = −2. It is negative because y falls as x increases. The value −1/2 turns the fraction upside down.",
        "h": "y decreases as x increases.",
        "yr": "SS2"
      },
      {
        "q": "The gradient of the line y = 3x − 7 is",
        "o": [
          "3",
          "−7",
          "7",
          "−3"
        ],
        "a": 0,
        "e": "The line is already in the form y = mx + c, so m = 3. The number −7 is the y-intercept.",
        "h": "Look at the number in front of x.",
        "yr": "SS2"
      },
      {
        "q": "The y-intercept of the line y = 3x − 7 is",
        "o": [
          "3",
          "−7",
          "7",
          "7/3"
        ],
        "a": 1,
        "e": "Put x = 0: y = 3(0) − 7 = −7. So the line cuts the y-axis at (0, −7).",
        "h": "Put x = 0.",
        "yr": "SS2"
      },
      {
        "q": "The x-intercept of the line 3x + 2y = 12 is",
        "o": [
          "6",
          "12",
          "4",
          "2"
        ],
        "a": 2,
        "e": "On the x-axis y = 0, so 3x = 12 and x = 4. The value 6 is the y-intercept, found by putting x = 0.",
        "h": "Put y = 0.",
        "yr": "SS2"
      },
      {
        "q": "The y-intercept of the line 3x + 2y = 12 is",
        "o": [
          "4",
          "12",
          "−6",
          "6"
        ],
        "a": 3,
        "e": "On the y-axis x = 0, so 2y = 12 and y = 6. The value 4 is the x-intercept.",
        "h": "Put x = 0.",
        "yr": "SS2"
      },
      {
        "q": "The gradient of the line 3x + 2y = 12 is",
        "o": [
          "−3/2",
          "3/2",
          "−2/3",
          "6"
        ],
        "a": 0,
        "e": "Make y the subject: 2y = −3x + 12, so y = −(3/2)x + 6. The gradient is −3/2. You can check using the intercepts (4, 0) and (0, 6): (6 − 0) ÷ (0 − 4) = −3/2.",
        "h": "Rearrange to y = mx + c first.",
        "yr": "SS2"
      },
      {
        "q": "The equation of the line with gradient 2 passing through (1, 5) is",
        "o": [
          "y = 2x + 5",
          "y = 2x + 3",
          "y = 2x − 3",
          "y = x + 3"
        ],
        "a": 1,
        "e": "Use y − 5 = 2(x − 1), which gives y = 2x − 2 + 5 = 2x + 3. Check with (1, 5): 2 + 3 = 5 ✓.",
        "h": "Use y − y₁ = m(x − x₁).",
        "yr": "SS2"
      },
      {
        "q": "The equation of the line through (2, 3) and (4, 9) is",
        "o": [
          "y = 3x + 3",
          "y = 2x − 3",
          "y = 3x − 3",
          "y = 6x − 9"
        ],
        "a": 2,
        "e": "Gradient = (9 − 3) ÷ (4 − 2) = 3. Then y − 3 = 3(x − 2) gives y = 3x − 3. Check (4, 9): 12 − 3 = 9 ✓. The line y = 6x − 9 fits (2, 3) but not (4, 9).",
        "h": "Find the gradient first, then use one point.",
        "yr": "SS2"
      },
      {
        "q": "A line parallel to y = 2x + 3 must have gradient",
        "o": [
          "−2",
          "1/2",
          "3",
          "2"
        ],
        "a": 3,
        "e": "Parallel lines have equal gradients. The gradient of y = 2x + 3 is 2, so any parallel line also has gradient 2. A gradient of −1/2 would give a perpendicular line, which is not asked here.",
        "h": "Parallel lines have the same steepness.",
        "yr": "SS2"
      },
      {
        "q": "A tangent to a curve at a point is",
        "o": [
          "a straight line that touches the curve at that point",
          "a line that cuts the curve at two points",
          "the x-axis",
          "a line joining any two points on the curve"
        ],
        "a": 0,
        "e": "A tangent just touches the curve at one point and has the same steepness as the curve there. A line cutting the curve at two points is a chord or a secant, not a tangent.",
        "h": "It only touches, it does not cross.",
        "yr": "SS2"
      },
      {
        "q": "The gradient of the tangent at the lowest point of a U-shaped curve is",
        "o": [
          "1",
          "0",
          "−1",
          "2"
        ],
        "a": 1,
        "e": "At the turning point the curve is neither rising nor falling, so the tangent is horizontal. A horizontal line has gradient 0.",
        "h": "What does a horizontal line look like?",
        "yr": "SS2"
      },
      {
        "q": "A tangent to the curve y = x² − 2x − 3 at (3, 0) also passes through (4, 4). Its gradient is",
        "o": [
          "1/4",
          "3",
          "4",
          "−4"
        ],
        "a": 2,
        "e": "Gradient = (4 − 0) ÷ (4 − 3) = 4 ÷ 1 = 4. It is positive because the curve is rising at x = 3. The value 1/4 turns the fraction upside down.",
        "h": "Use the two points on the tangent line.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Circle Geometry I",
    "topicCode": "SS2-MATH-09",
    "module": "Circle Geometry",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">A circle is a round shape. Every point on its edge is the same distance from the middle point, called the <span class=\"learn-keyword\">centre</span>. In this topic we study a straight line that just touches a circle, called a <span class=\"learn-keyword\">tangent</span>, and some very useful angle rules that come from it. These rules help you find missing angles without a protractor, and they appear in WAEC and NECO almost every year. Think of a danfo wheel standing on the road: the road touches the wheel at only one point. That road is like a tangent to the wheel, and the spoke from the wheel centre to that point is the radius.</div>\n<h3 class=\"learn-subheading\">1. Words you must know first</h3>\n<p class=\"learn-p\">Before the rules, learn the parts of a circle. Each word is explained in simple English.</p>\n<ul class=\"learn-list\"><li><span class=\"learn-keyword\">Centre</span> (O): the fixed point in the middle of the circle.</li><li><span class=\"learn-keyword\">Radius</span>: a straight line from the centre to any point on the circle. All radii of one circle are equal.</li><li><span class=\"learn-keyword\">Chord</span>: a straight line that joins two points on the circle.</li><li><span class=\"learn-keyword\">Diameter</span>: a chord that passes through the centre. It is the longest chord and equals two radii.</li><li><span class=\"learn-keyword\">Arc</span>: a part of the circle's edge.</li><li><span class=\"learn-keyword\">Segment</span>: the region between a chord and an arc. A chord cuts a circle into two segments. The bigger one is the major segment and the smaller one is the minor segment.</li><li><span class=\"learn-keyword\">Semicircle</span>: half of a circle, cut off by a diameter.</li><li><span class=\"learn-keyword\">Tangent</span>: a straight line that touches the circle at exactly one point. That point is called the <span class=\"learn-keyword\">point of contact</span>.</li></ul>\n<h3 class=\"learn-subheading\">2. What is a tangent?</h3>\n<p class=\"learn-p\">A tangent touches the circle at one point only. It does not cut through the circle. A line that cuts the circle at two points is a <span class=\"learn-keyword\">secant</span>, not a tangent. If you roll a ball along a flat floor, the floor is a tangent to the ball at the place where they touch.</p>\n<p class=\"learn-p\">Two important facts about tangents are given below. They are the starting point for all the other rules.</p>\n<h3 class=\"learn-subheading\">3. Tangent and radius are perpendicular</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Perpendicular</span> means meeting at a right angle (90°). The rule says:</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Rule 1:</strong> A tangent to a circle is perpendicular to the radius drawn to the point of contact. So if OT is the radius and PT is the tangent at T, then angle OTP = 90°.</div>\n<p class=\"learn-p\">This rule lets you form a right-angled triangle, so you can use Pythagoras' theorem: (hypotenuse)² = (one side)² + (other side)². The hypotenuse is the longest side, opposite the right angle.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> A tangent PT is drawn from a point P to a circle with centre O. The radius OT = 5 cm and PT = 12 cm. Find OP.<br>Step 1: OT is perpendicular to PT, so triangle OTP has a right angle at T. OP is the hypotenuse.<br>Step 2: OP² = OT² + PT² = 5² + 12² = 25 + 144 = 169.<br>Step 3: OP = √169 = 13.<br><strong>Answer: OP = 13 cm.</strong></div>\n<h3 class=\"learn-subheading\">4. Two tangents from one outside point</h3>\n<p class=\"learn-p\">Suppose P is a point outside the circle. You can draw exactly two tangents from P. Let them touch the circle at A and B. Then:</p>\n<ul class=\"learn-list\"><li>The two tangents are equal in length: PA = PB.</li><li>The line OP (from the centre to P) bisects the angle APB. <span class=\"learn-keyword\">Bisects</span> means cuts into two equal parts.</li><li>OP also bisects the angle AOB at the centre.</li><li>Triangle PAB is isosceles (two equal sides), so angle PAB = angle PBA.</li><li>Angles OAP and OBP are both 90° because of Rule 1. So OAPB is a <span class=\"learn-keyword\">kite</span> with two right angles, and its four angles add up to 360°.</li></ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> Tangents PA and PB are drawn from P to a circle with centre O, touching it at A and B. Angle APB = 50°. Find (a) angle AOB, (b) angle OAB.<br>(a) Angle OAP = 90° and angle OBP = 90° (tangent ⟂ radius). The four angles of quadrilateral OAPB add up to 360°.<br>Angle AOB = 360° − 90° − 90° − 50° = 130°.<br>(b) Triangle OAB is isosceles because OA = OB (radii). So angle OAB = (180° − 130°) ÷ 2 = 25°.<br>Check: PA = PB, so angle PAB = (180° − 50°) ÷ 2 = 65°. Then angle OAB = 90° − 65° = 25°. ✓<br><strong>Answer: (a) 130°, (b) 25°.</strong></div>\n<h3 class=\"learn-subheading\">5. Angle in a semicircle</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">semicircle</span> is cut off by a diameter. If you pick any point C on the circle (not at the ends of the diameter) and join it to the two ends A and B of the diameter, you form the angle ACB. The rule says:</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Rule 2:</strong> The angle in a semicircle is a right angle. If AB is a diameter and C is any point on the circle, then angle ACB = 90°.</div>\n<p class=\"learn-p\">Why is it true? Join C to the centre O. Then OA = OC = OB (all radii). Triangles OAC and OBC are isosceles. Let angle OAC = x and angle OBC = y. Then angle OCA = x and angle OCB = y. The three angles of triangle ABC are x, y and (x + y). They add up to 180°, so 2(x + y) = 180° and x + y = 90°. That is angle ACB.</p>\n<p class=\"learn-p\">The reverse is also true: if angle ACB = 90°, then AB must be a diameter of the circle that passes through A, B and C.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> AB is a diameter of a circle and C is a point on the circle. Angle CAB = 35°. Find angle ABC.<br>Step 1: Angle ACB is the angle in a semicircle, so it is 90°.<br>Step 2: The angles of triangle ABC add up to 180°.<br>Angle ABC = 180° − 90° − 35° = 55°.<br><strong>Answer: angle ABC = 55°.</strong></div>\n<h3 class=\"learn-subheading\">6. Angles in the alternate segment</h3>\n<p class=\"learn-p\">A chord drawn from the point of contact of a tangent splits the circle into two segments. The tangent makes an angle with the chord. The segment on the other side of the chord from this angle is called the <span class=\"learn-keyword\">alternate segment</span>. (\"Alternate\" means \"the other one\".)</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Rule 3 (Alternate Segment Theorem):</strong> The angle between a tangent and a chord, at the point of contact, is equal to the angle in the alternate segment. If a tangent at T meets chord TA, then the angle between the tangent and TA equals the angle that TA makes at any point S on the circle in the alternate segment, that is, angle TSA.</div>\n<h4 class=\"learn-subsubheading\">How to use it step by step</h4>\n<ol class=\"learn-ordered\"><li>Step 1: Find the point of contact (where the tangent touches the circle).</li><li>Step 2: Locate the chord that starts from that point and the angle between the tangent and this chord.</li><li>Step 3: Go to the other side of the chord. Any point on the circle there lies in the alternate segment.</li><li>Step 4: The angle made at that point by the two ends of the chord is equal to the angle from Step 2.</li></ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> A triangle ABC is drawn inside a circle. The tangent at A makes an angle of 48° with AB and 67° with AC (on the other side of the triangle). Find the angles of the triangle.<br>Step 1: The angle between the tangent and chord AB is 48°. By the alternate segment theorem it equals angle ACB, so angle ACB = 48°.<br>Step 2: The angle between the tangent and chord AC is 67°. It equals angle ABC, so angle ABC = 67°.<br>Step 3: Angle BAC = 180° − 48° − 67° = 65°.<br>Check: the tangent is a straight line, so 48° + 65° + 67° = 180°. ✓<br><strong>Answer: A = 65°, B = 67°, C = 48°.</strong></div>\n<h3 class=\"learn-subheading\">7. Putting the rules together</h3>\n<p class=\"learn-p\">Many exam questions mix the three rules. Draw the diagram, write each angle you know on it, and give a reason for every step. A good habit is to write a short reason such as \"tangent ⟂ radius\", \"angle in a semicircle\", \"alternate segment\" or \"angles of a triangle add up to 180°\".</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Rule</th><th>Statement</th><th>What it gives you</th></tr></thead><tbody><tr><td>Tangent ⟂ radius</td><td>Angle between tangent and radius at the point of contact = 90°</td><td>A right-angled triangle; Pythagoras</td></tr><tr><td>Equal tangents</td><td>Tangents from one outside point are equal</td><td>Isosceles triangle; equal base angles</td></tr><tr><td>Angle in a semicircle</td><td>Angle at the circumference on a diameter = 90°</td><td>A right angle in triangle ABC</td></tr><tr><td>Alternate segment</td><td>Tangent-chord angle = angle in the alternate segment</td><td>A link between the tangent and the triangle angles</td></tr></tbody></table></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong> <br>1. Using the wrong segment for the alternate segment theorem. The angle must be on the opposite side of the chord from the tangent-chord angle. Always ask: \"which side of the chord is this?\"<br>2. Forgetting that the radius is perpendicular to the tangent, so you miss the 90° angles in quadrilateral OAPB.<br>3. Saying the angle in a semicircle is 180°. It is 90°, because 180° is the angle on a straight line (the diameter).<br>4. Calling a line a tangent when it cuts the circle at two points. A tangent touches at one point only.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC and NECO often say \"PT is a tangent to the circle at T\" or \"AB is a diameter\" in the question. These words are clues. \"Tangent\" tells you to look for 90° with the radius and for the alternate segment. \"Diameter\" tells you to look for 90° at the circumference. Always write the reason beside each step to win method marks, and never measure with a protractor.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> <br>• A tangent touches a circle at one point only.<br>• A tangent is perpendicular to the radius at the point of contact (90°).<br>• Two tangents from an outside point are equal, and OP bisects the angle between them.<br>• The angle in a semicircle is 90°.<br>• Tangent-chord angle = angle in the alternate segment.<br>• Always give a reason for each angle you find.</div>",
    "questions": [
      {
        "q": "What is a tangent to a circle?",
        "o": [
          "A straight line that touches the circle at exactly one point",
          "A straight line that cuts the circle at two points",
          "A line that passes through the centre",
          "A line joining two points on the circle"
        ],
        "a": 0,
        "e": "A tangent touches the circle at one point only, called the point of contact. A line cutting the circle at two points is a secant. A line joining two points on the circle is a chord.",
        "h": "Think of a wheel touching the road.",
        "yr": "SS2"
      },
      {
        "q": "A tangent meets the radius at the point of contact at an angle of",
        "o": [
          "45°",
          "90°",
          "180°",
          "60°"
        ],
        "a": 1,
        "e": "A tangent is always perpendicular to the radius drawn to the point of contact, so the angle is 90°. 180° would mean they lie on one straight line, which is not the case.",
        "h": "Perpendicular means a right angle.",
        "yr": "SS2"
      },
      {
        "q": "The angle in a semicircle is",
        "o": [
          "180°",
          "60°",
          "90°",
          "45°"
        ],
        "a": 2,
        "e": "The angle at the circumference standing on a diameter is always 90°. Students sometimes say 180° because a straight line (the diameter) makes 180°, but the angle in the semicircle is at the point C on the edge.",
        "h": "It is a right angle.",
        "yr": "SS2"
      },
      {
        "q": "Two tangents PA and PB are drawn from P to a circle. Which statement is always true?",
        "o": [
          "PA = AB",
          "PA is perpendicular to PB",
          "PA is parallel to PB",
          "PA = PB"
        ],
        "a": 3,
        "e": "Tangents drawn from the same outside point are equal in length. They are not parallel because they meet at P, and they are only perpendicular for a special size of circle.",
        "h": "Think of a kite shape OAPB.",
        "yr": "SS2"
      },
      {
        "q": "The angle between a tangent and a chord at the point of contact is equal to the",
        "o": [
          "angle at the centre",
          "angle in the alternate segment",
          "angle in the same segment",
          "exterior angle of the circle"
        ],
        "a": 1,
        "e": "This is the alternate segment theorem. The angle in the same segment (the side where the tangent-chord angle is) is not used. The angle at the centre would be double the circumference angle.",
        "h": "The word \"alternate\" means \"the other one\".",
        "yr": "SS2"
      },
      {
        "q": "PT is a tangent to a circle, centre O, radius 6 cm. If PT = 8 cm, find OP.",
        "o": [
          "14 cm",
          "7 cm",
          "10 cm",
          "2 cm"
        ],
        "a": 2,
        "e": "Angle OTP = 90°, so OP² = 6² + 8² = 36 + 64 = 100 and OP = 10 cm. Adding 6 + 8 = 14 is wrong because OP is the hypotenuse, not the sum of the two sides.",
        "h": "Use Pythagoras in triangle OTP.",
        "yr": "SS2"
      },
      {
        "q": "AB is a diameter of a circle and C lies on the circle. If angle CAB = 40°, find angle ABC.",
        "o": [
          "40°",
          "90°",
          "140°",
          "50°"
        ],
        "a": 3,
        "e": "Angle ACB = 90° (angle in a semicircle). Angle ABC = 180° − 90° − 40° = 50°. The answer 90° is the angle at C, not at B.",
        "h": "First find angle ACB.",
        "yr": "SS2"
      },
      {
        "q": "Tangents PA and PB touch a circle, centre O, at A and B. If angle APB = 70°, find angle AOB.",
        "o": [
          "110°",
          "70°",
          "140°",
          "90°"
        ],
        "a": 0,
        "e": "Angles OAP and OBP are 90° each. Angle AOB = 360° − 90° − 90° − 70° = 110°. It is not 70° because angle AOB and angle APB are different angles.",
        "h": "Quadrilateral OAPB has angles adding up to 360°.",
        "yr": "SS2"
      },
      {
        "q": "A tangent at T makes an angle of 58° with chord TA. S is a point on the circle in the alternate segment. Find angle TSA.",
        "o": [
          "32°",
          "116°",
          "58°",
          "122°"
        ],
        "a": 2,
        "e": "By the alternate segment theorem, angle TSA equals the tangent-chord angle, which is 58°. Doubling it (116°) is the rule for the angle at the centre, which is a different theorem.",
        "h": "Tangent-chord angle equals alternate segment angle.",
        "yr": "SS2"
      },
      {
        "q": "Tangents PA and PB touch a circle at A and B. If angle PAB = 62°, find angle APB.",
        "o": [
          "62°",
          "118°",
          "124°",
          "56°"
        ],
        "a": 3,
        "e": "Since PA = PB, triangle PAB is isosceles, so angle PBA = 62°. Angle APB = 180° − 62° − 62° = 56°. Using only one 62° gives the wrong answer 118°.",
        "h": "Triangle PAB is isosceles.",
        "yr": "SS2"
      },
      {
        "q": "If the angle between a tangent and a chord is 65°, which angle is equal to it?",
        "o": [
          "The angle the chord makes at the circumference in the alternate segment",
          "The angle at the centre standing on the chord",
          "The angle on the same side of the chord as the tangent angle",
          "The angle between the radius and the chord"
        ],
        "a": 0,
        "e": "The equal angle is on the opposite side of the chord from the tangent-chord angle, in the alternate segment. The centre angle would be 130°, which is double 65°.",
        "h": "Look at the other side of the chord.",
        "yr": "SS2"
      },
      {
        "q": "O is the centre of a circle of radius 8 cm. A tangent touches the circle at T and passes through P, where OP = 17 cm. Find the length of the tangent PT.",
        "o": [
          "9 cm",
          "15 cm",
          "25 cm",
          "13 cm"
        ],
        "a": 1,
        "e": "Triangle OTP has a right angle at T. PT² = OP² − OT² = 17² − 8² = 289 − 64 = 225, so PT = 15 cm. Adding the numbers (25) would treat OP as a leg instead of the hypotenuse.",
        "h": "OP is the hypotenuse; subtract squares.",
        "yr": "SS2"
      },
      {
        "q": "A, B and C are points on a circle and angle ACB = 90°. What must be true about AB?",
        "o": [
          "AB is a tangent",
          "AB is shorter than the radius",
          "AB is a radius",
          "AB is a diameter"
        ],
        "a": 3,
        "e": "The converse of the angle in a semicircle theorem says that if the angle at the circumference is 90°, the chord opposite it is a diameter. A tangent touches at one point and cannot join two points on the circle.",
        "h": "Think about the reverse of the semicircle rule.",
        "yr": "SS2"
      },
      {
        "q": "Tangents from P touch a circle, centre O, at A and B. Angle OAB = 20°. Find angle APB.",
        "o": [
          "40°",
          "20°",
          "70°",
          "140°"
        ],
        "a": 0,
        "e": "Triangle OAB is isosceles, so angle OBA = 20° and angle AOB = 180° − 40° = 140°. In quadrilateral OAPB, angle APB = 360° − 90° − 90° − 140° = 40°. Using 140° as the answer confuses the centre angle with the angle at P.",
        "h": "Find angle AOB first.",
        "yr": "SS2"
      },
      {
        "q": "A tangent at A makes an angle of 40° with chord AB and an angle of 75° with chord AC on the other side. What is angle BAC in triangle ABC inside the circle?",
        "o": [
          "115°",
          "65°",
          "35°",
          "105°"
        ],
        "a": 1,
        "e": "The tangent is a straight line, so 40° + angle BAC + 75° = 180°, which gives angle BAC = 65°. Check using the alternate segment theorem: angle C = 40° and angle B = 75°, and 40° + 75° + 65° = 180°. ✓",
        "h": "Angles on a straight line add up to 180°.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Circle Geometry II",
    "topicCode": "SS2-MATH-10",
    "module": "Circle Geometry",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">A <span class=\"learn-keyword\">chord</span> is a straight line that joins two points on a circle. In this topic you will learn the rules that connect chords, the centre of the circle and the angles inside the circle. These rules let you find lengths and angles without measuring. Think of a round table at a Lagos party: the tablecloth edge is the circle, and a straight string stretched from one edge to another is a chord. You will also meet the <span class=\"learn-keyword\">cyclic quadrilateral</span>, a four-sided shape whose corners all sit on one circle. WAEC and NECO ask about these rules almost every year.</div>\n<h3 class=\"learn-subheading\">1. Parts of a circle you need</h3>\n<p class=\"learn-p\">Let us first recall the words we will use. The <span class=\"learn-keyword\">centre</span> (O) is the middle point. The <span class=\"learn-keyword\">radius</span> is a line from O to the edge, and all radii of one circle are equal. The <span class=\"learn-keyword\">circumference</span> is the edge of the circle. A <span class=\"learn-keyword\">chord</span> joins two points on the circumference. A <span class=\"learn-keyword\">diameter</span> is a chord through the centre, and it is the longest chord. An <span class=\"learn-keyword\">arc</span> is a part of the circumference. A <span class=\"learn-keyword\">segment</span> is the region between a chord and an arc.</p>\n<p class=\"learn-p\">Because every radius is the same length, a triangle made by two radii and a chord is always <span class=\"learn-keyword\">isosceles</span> (two equal sides). The angles opposite the equal sides are equal. We use this fact again and again.</p>\n<h3 class=\"learn-subheading\">2. Chord properties: the perpendicular from the centre</h3>\n<p class=\"learn-p\">Take a chord AB in a circle with centre O. Draw a line from O that meets AB at a right angle (90°) at point M. The word <span class=\"learn-keyword\">perpendicular</span> means \"meeting at 90°\". Two facts hold:</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Rule 1:</strong> The perpendicular from the centre of a circle to a chord bisects the chord. (<span class=\"learn-keyword\">Bisects</span> means cuts into two equal parts.) So AM = MB.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Rule 2 (the reverse):</strong> The line joining the centre of a circle to the midpoint of a chord is perpendicular to the chord. So if M is the midpoint of AB, then angle OMA = 90°.</div>\n<p class=\"learn-p\">Why is Rule 1 true? Triangle OAB is isosceles because OA = OB. The line OM is perpendicular to the base AB, so it splits the base into two equal halves. Also, the distance from the centre to a chord means the shortest distance, which is this perpendicular line OM.</p>\n<p class=\"learn-p\">The right-angled triangle OMA has hypotenuse OA (the radius). So Pythagoras' theorem gives: OA² = OM² + AM². Here the <span class=\"learn-keyword\">hypotenuse</span> is the longest side, opposite the right angle.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> A chord AB of length 16 cm is drawn in a circle of radius 10 cm. Find the distance of the chord from the centre.<br>Step 1: Let M be the midpoint of AB. OM is perpendicular to AB, so AM = 16 ÷ 2 = 8 cm.<br>Step 2: In right-angled triangle OMA, OA = 10 cm (radius) and AM = 8 cm.<br>Step 3: OM² = OA² − AM² = 10² − 8² = 100 − 64 = 36.<br>Step 4: OM = √36 = 6.<br><strong>Answer: the distance is 6 cm.</strong></div>\n<h3 class=\"learn-subheading\">3. Properties of equal chords</h3>\n<p class=\"learn-p\">When two chords of the same circle have the same length, they behave in the same way. The rules are:</p>\n<ul class=\"learn-list\"><li>Equal chords are the same distance from the centre (they are <span class=\"learn-keyword\">equidistant</span> from the centre).</li><li>Equal chords make equal angles at the centre.</li><li>Equal chords cut off equal arcs.</li></ul>\n<p class=\"learn-p\">The reverse is also true. Chords that are the same distance from the centre are equal. A chord that is closer to the centre is longer. The diameter is the longest chord because its distance from the centre is zero.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> In a circle of radius 10 cm, two equal chords AB and CD are each 12 cm long. Find the distance of each chord from the centre.<br>Step 1: Half of each chord = 12 ÷ 2 = 6 cm.<br>Step 2: Distance² = 10² − 6² = 100 − 36 = 64.<br>Step 3: Distance = √64 = 8.<br>Because the chords are equal, both are 8 cm from the centre.<br><strong>Answer: 8 cm each.</strong></div>\n<h3 class=\"learn-subheading\">4. Angle at the centre and angle at the circumference</h3>\n<p class=\"learn-p\">Pick an arc AB. The angle that AB makes at the centre O is the <span class=\"learn-keyword\">angle at the centre</span>. The angle that AB makes at a point P on the circumference (on the edge) is the <span class=\"learn-keyword\">angle at the circumference</span>. We say both angles are \"standing on\" the same arc AB.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Rule 3:</strong> The angle that an arc subtends at the centre of a circle is twice the angle it subtends at any point on the remaining part of the circumference. So angle AOB = 2 × angle APB.</div>\n<p class=\"learn-p\">\"Subtends\" simply means \"makes\". The point P must be on the other side of the chord from the arc you are using. For example, if the angle at the circumference is 35°, the angle at the centre is 70°. If the angle at the centre is 124°, the angle at the circumference is 62°.</p>\n<p class=\"learn-p\">Why? Join P to O. Triangles OAP and OBP are isosceles because OA = OP = OB. The outside angle of an isosceles triangle equals the sum of the two base angles, which is twice one base angle. Adding the two parts gives angle AOB = 2 × angle APB.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> A, B and C are points on a circle with centre O. Angle ACB = 35°. Find (a) angle AOB, (b) angle OAB.<br>(a) The angle at the centre is twice the angle at the circumference: angle AOB = 2 × 35° = 70°.<br>(b) Triangle OAB is isosceles (OA = OB). Angle OAB = (180° − 70°) ÷ 2 = 110° ÷ 2 = 55°.<br><strong>Answer: (a) 70°, (b) 55°.</strong></div>\n<h3 class=\"learn-subheading\">5. Cyclic quadrilaterals</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">cyclic quadrilateral</span> is a four-sided shape whose four corners (vertices) all lie on a circle. Its sides are chords of the circle. It has three main properties:</p>\n<ul class=\"learn-list\"><li>Opposite angles add up to 180°. We say they are <span class=\"learn-keyword\">supplementary</span>. So angle A + angle C = 180° and angle B + angle D = 180°.</li><li>An exterior angle equals the interior opposite angle. If you extend one side, the angle formed outside is equal to the inside angle at the opposite corner.</li><li>The reverse is also true: if opposite angles of a quadrilateral add up to 180°, it is cyclic.</li></ul>\n<p class=\"learn-p\">Why do opposite angles add up to 180°? The arc that gives angle A at the circumference also gives a centre angle of 2A. The arc for angle C gives a centre angle of 2C. These two arcs together make the whole circle, so 2A + 2C = 360°. Then A + C = 180°.</p>\n<p class=\"learn-p\">For the exterior angle: if BC is extended to E, then angle BCD + angle DCE = 180° (angles on a straight line). Also angle BCD + angle A = 180°. So angle DCE = angle A.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> ABCD is a cyclic quadrilateral. Angle DAB = 105° and angle ABC = 88°. Side BC is extended to E. Find (a) angle BCD, (b) angle ADC, (c) angle DCE.<br>(a) Angle BCD is opposite to angle DAB. Angle BCD = 180° − 105° = 75°.<br>(b) Angle ADC is opposite to angle ABC. Angle ADC = 180° − 88° = 92°.<br>(c) Angle DCE is the exterior angle at C. It equals the interior opposite angle DAB = 105°. Check: angle BCD + angle DCE = 75° + 105° = 180° (angles on a straight line). ✓<br>Check all four angles: 105° + 88° + 75° + 92° = 360°. ✓<br><strong>Answer: (a) 75°, (b) 92°, (c) 105°.</strong></div>\n<h3 class=\"learn-subheading\">6. Putting the rules together</h3>\n<p class=\"learn-p\">In many exam questions you will use more than one rule. Follow these steps.</p>\n<ol class=\"learn-ordered\"><li>Step 1: Draw the diagram and mark every angle and length you are given.</li><li>Step 2: Look for the centre O. If you see O, look for radii and isosceles triangles.</li><li>Step 3: Look for a chord and a perpendicular from the centre (Pythagoras).</li><li>Step 4: Look for four points on a circle forming a quadrilateral (opposite angles add to 180°).</li><li>Step 5: Write a reason beside each step, for example \"angle at centre = 2 × angle at circumference\".</li></ol>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Rule</th><th>Statement</th><th>Use it to find</th></tr></thead><tbody><tr><td>Perpendicular from centre</td><td>Bisects the chord</td><td>Half-chord, distance from centre</td></tr><tr><td>Equal chords</td><td>Equal distance from centre, equal angles at centre</td><td>Missing length or angle</td></tr><tr><td>Angle at centre</td><td>Angle at centre = 2 × angle at circumference</td><td>Angle AOB or angle APB</td></tr><tr><td>Cyclic quadrilateral</td><td>Opposite angles = 180°</td><td>The opposite angle</td></tr><tr><td>Exterior angle</td><td>Equals interior opposite angle</td><td>Angle outside the quadrilateral</td></tr></tbody></table></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong> <br>1. Forgetting to halve the chord. The right-angled triangle uses half the chord (AM), not the whole chord.<br>2. Using \"angle at centre = 2 × angle at circumference\" when the angle is not standing on the same arc. Check that both angles are drawn from the same chord.<br>3. Adding adjacent angles of a cyclic quadrilateral to get 180°. Only the opposite angles add up to 180°.<br>4. Giving the answer for OM when the question asks for the length of the chord, or the other way round. Read the question twice.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC and NECO often say \"O is the centre of the circle\" or \"ABCD is a cyclic quadrilateral\". These phrases are clues. \"Centre\" tells you to look for radii, isosceles triangles and the double angle rule. \"Cyclic\" tells you opposite angles add up to 180°. Always show the reason for each step to win method marks.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> <br>• A perpendicular from the centre to a chord bisects the chord.<br>• A line from the centre to the midpoint of a chord is perpendicular to it.<br>• Equal chords are equally far from the centre and make equal angles at the centre.<br>• Angle at the centre = 2 × angle at the circumference.<br>• In a cyclic quadrilateral, opposite angles add up to 180°.<br>• An exterior angle of a cyclic quadrilateral equals the interior opposite angle.</div>",
    "questions": [
      {
        "q": "A perpendicular is drawn from the centre of a circle to a chord. What does it do to the chord?",
        "o": [
          "It doubles the chord",
          "It bisects the chord",
          "It makes the chord a tangent",
          "It makes the chord equal to the radius"
        ],
        "a": 1,
        "e": "The perpendicular from the centre cuts the chord into two equal halves, so it bisects the chord. It does not change the chord's length or turn it into a tangent.",
        "h": "Think of the isosceles triangle OAB.",
        "yr": "SS2"
      },
      {
        "q": "The angle at the circumference of a circle is 40°. What is the angle at the centre standing on the same arc?",
        "o": [
          "20°",
          "40°",
          "80°",
          "160°"
        ],
        "a": 2,
        "e": "The angle at the centre is twice the angle at the circumference: 2 × 40° = 80°. The answer 20° comes from halving instead of doubling.",
        "h": "Centre angle is the bigger one.",
        "yr": "SS2"
      },
      {
        "q": "The opposite angles of a cyclic quadrilateral add up to",
        "o": [
          "90°",
          "360°",
          "270°",
          "180°"
        ],
        "a": 3,
        "e": "The opposite angles of a cyclic quadrilateral are supplementary, so they add up to 180°. The sum of all four angles is 360°, which is why 360° is wrong for one pair.",
        "h": "Supplementary means 180°.",
        "yr": "SS2"
      },
      {
        "q": "A chord of length 24 cm is drawn in a circle of radius 13 cm. How far is the chord from the centre?",
        "o": [
          "5 cm",
          "6 cm",
          "10 cm",
          "11 cm"
        ],
        "a": 0,
        "e": "Half the chord is 12 cm. The distance² = 13² − 12² = 169 − 144 = 25, so the distance is 5 cm. Using the whole chord (24) in the triangle would give a wrong answer.",
        "h": "Use half the chord in Pythagoras.",
        "yr": "SS2"
      },
      {
        "q": "Two chords of the same circle are equal in length. Which statement is true?",
        "o": [
          "They must be parallel",
          "They must meet at the centre",
          "They are the same distance from the centre",
          "One of them must be a diameter"
        ],
        "a": 2,
        "e": "Equal chords are equidistant from the centre and make equal angles at the centre. They need not be parallel, and only a diameter passes through the centre.",
        "h": "Equal chords look the same from the centre.",
        "yr": "SS2"
      },
      {
        "q": "ABCD is a cyclic quadrilateral. If angle A = 110°, find angle C.",
        "o": [
          "110°",
          "250°",
          "90°",
          "70°"
        ],
        "a": 3,
        "e": "Opposite angles add up to 180°, so angle C = 180° − 110° = 70°. The answer 110° wrongly assumes opposite angles are equal.",
        "h": "A + C = 180°.",
        "yr": "SS2"
      },
      {
        "q": "O is the centre of a circle. If angle AOB = 130°, find the angle APB at the circumference, where P is on the major arc.",
        "o": [
          "65°",
          "130°",
          "260°",
          "50°"
        ],
        "a": 0,
        "e": "The angle at the circumference is half the angle at the centre: 130° ÷ 2 = 65°. Doubling gives 260°, which is the wrong direction for this question.",
        "h": "Halve the centre angle.",
        "yr": "SS2"
      },
      {
        "q": "ABCD is a cyclic quadrilateral and BC is extended to E. If angle DAB = 84°, find angle DCE.",
        "o": [
          "96°",
          "84°",
          "42°",
          "168°"
        ],
        "a": 1,
        "e": "The exterior angle of a cyclic quadrilateral equals the interior opposite angle. So angle DCE = angle DAB = 84°. The value 96° is angle BCD, the interior angle at C.",
        "h": "Exterior angle = interior opposite angle.",
        "yr": "SS2"
      },
      {
        "q": "Why is the diameter the longest chord of a circle?",
        "o": [
          "It is the shortest chord",
          "It is perpendicular to every radius",
          "It touches the circle at one point only",
          "It passes through the centre, so its distance from the centre is zero"
        ],
        "a": 3,
        "e": "Chords closer to the centre are longer, and the diameter is at distance zero, so it is the longest. It equals two radii. A line touching the circle at one point is a tangent, not a chord.",
        "h": "Closer to the centre means longer.",
        "yr": "SS2"
      },
      {
        "q": "A chord of length 8 cm is drawn in a circle of radius 5 cm. Find the distance of the chord from the centre.",
        "o": [
          "3 cm",
          "4 cm",
          "5 cm",
          "1 cm"
        ],
        "a": 0,
        "e": "Half the chord is 4 cm. Distance² = 5² − 4² = 25 − 16 = 9, so the distance is 3 cm. The number 4 is the half-chord, not the distance.",
        "h": "The triangle with sides 3, 4, 5.",
        "yr": "SS2"
      },
      {
        "q": "A, B, C lie on a circle with centre O. If angle ACB = 28°, find angle OAB.",
        "o": [
          "56°",
          "62°",
          "28°",
          "152°"
        ],
        "a": 1,
        "e": "Angle AOB = 2 × 28° = 56° (angle at centre). Triangle OAB is isosceles, so angle OAB = (180° − 56°) ÷ 2 = 62°. The answer 56° is the centre angle, not angle OAB.",
        "h": "Find angle AOB first.",
        "yr": "SS2"
      },
      {
        "q": "Two opposite angles of a cyclic quadrilateral are in the ratio 2 : 3. Find the larger one.",
        "o": [
          "72°",
          "90°",
          "108°",
          "120°"
        ],
        "a": 2,
        "e": "Let the angles be 2x and 3x. Then 2x + 3x = 180°, so x = 36°. The larger angle is 3 × 36° = 108° and the smaller is 72°. We use 180° because opposite angles of a cyclic quadrilateral are supplementary.",
        "h": "Set 2x + 3x = 180°.",
        "yr": "SS2"
      },
      {
        "q": "Which of these quadrilaterals can always be drawn with all four corners on a circle?",
        "o": [
          "A rectangle",
          "A rhombus that is not a square",
          "A parallelogram that is not a rectangle",
          "A trapezium with unequal angles"
        ],
        "a": 0,
        "e": "In a rectangle, opposite angles are 90° and 90°, which add up to 180°, so it is cyclic. In a non-square rhombus or a non-rectangle parallelogram, opposite angles are equal but not 90°, so they add up to less or more than 180°.",
        "h": "Check if opposite angles add to 180°.",
        "yr": "SS2"
      },
      {
        "q": "Chords AB and CD of a circle with centre O are equal. If angle AOB = 70°, find angle COD.",
        "o": [
          "35°",
          "70°",
          "140°",
          "110°"
        ],
        "a": 1,
        "e": "Equal chords make equal angles at the centre, so angle COD = 70°. The angle is not halved or doubled, because both angles are at the centre.",
        "h": "Equal chords, equal centre angles.",
        "yr": "SS2"
      },
      {
        "q": "A chord AB = 30 cm is 8 cm from the centre of a circle. Find the radius.",
        "o": [
          "15 cm",
          "22 cm",
          "17 cm",
          "23 cm"
        ],
        "a": 2,
        "e": "Half the chord is 15 cm. Radius² = 15² + 8² = 225 + 64 = 289, so the radius is 17 cm. Adding 15 + 8 = 23 is wrong because the radius is the hypotenuse.",
        "h": "Radius is the hypotenuse.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Circle Geometry III",
    "topicCode": "SS2-MATH-11",
    "module": "Circle Geometry",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">In earlier lessons you met tangents, chords and the angle rules of a circle. In this topic we meet more angle rules and learn to combine them to solve problems. The main ideas are: angles in the <span class=\"learn-keyword\">same segment</span> are equal, the angle in a <span class=\"learn-keyword\">semicircle</span> is 90°, and the <span class=\"learn-keyword\">exterior angle</span> of a cyclic quadrilateral equals the opposite interior angle. Imagine a football pitch with a circle at the centre. Two players standing at different places on the same side of a line look at the same two goalposts and see the same angle. That is the same segment rule in real life.</div>\n<h3 class=\"learn-subheading\">1. Quick recall of circle words</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">chord</span> is a straight line joining two points on the circle. It cuts the circle into two parts called <span class=\"learn-keyword\">segments</span>. The bigger part is the <span class=\"learn-keyword\">major segment</span>, and the smaller part is the <span class=\"learn-keyword\">minor segment</span>. A <span class=\"learn-keyword\">diameter</span> is a chord through the centre O, and it cuts the circle into two equal semicircles. An angle made by two chords meeting at a point on the circle is called an <span class=\"learn-keyword\">angle at the circumference</span>.</p>\n<p class=\"learn-p\">The rule we already know: the angle at the centre is twice the angle at the circumference when both stand on the same arc. We will use it again here.</p>\n<h3 class=\"learn-subheading\">2. Angles in the same segment</h3>\n<p class=\"learn-p\">Take a chord AB. Choose two points C and D on the circle, both on the same side of AB. Join them to A and B. You get two angles, angle ACB and angle ADB.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Rule 1:</strong> Angles in the same segment of a circle (standing on the same chord or arc) are equal. So angle ACB = angle ADB.</div>\n<p class=\"learn-p\">Why is it true? Each angle at the circumference is half of the angle AOB at the centre. Both are half of the same angle, so they must be equal. The picture looks like a bow-tie when two chords cross inside the circle, or like two arrowheads pointing at the same chord.</p>\n<p class=\"learn-p\">To use this rule, ask two questions. First: which chord are the two angles standing on? Second: are both points on the same side of that chord? If yes, the angles are equal.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> A, B, C and D are points on a circle. Angle ACB = 42°. Find angle ADB, where C and D are on the same side of chord AB.<br>Step 1: Angles ACB and ADB both stand on chord AB.<br>Step 2: C and D are on the same side of AB, so they are in the same segment.<br>Step 3: Angles in the same segment are equal.<br><strong>Answer: angle ADB = 42°.</strong></div>\n<h3 class=\"learn-subheading\">3. Angle in a semicircle</h3>\n<p class=\"learn-p\">A semicircle is half a circle, cut off by a diameter. Suppose AB is a diameter and C is any other point on the circle.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Rule 2:</strong> The angle in a semicircle is a right angle. If AB is a diameter, then angle ACB = 90°.</div>\n<p class=\"learn-p\">This is a special case of the angle at the centre rule. The diameter makes a straight angle of 180° at the centre. The angle at the circumference is half of that, which is 90°. The reverse is also true: if angle ACB = 90°, then AB is a diameter.</p>\n<p class=\"learn-p\">Once you have a 90° angle, you can use the angle sum of a triangle (180°) or Pythagoras' theorem to continue.</p>\n<h3 class=\"learn-subheading\">4. Exterior angle of a cyclic quadrilateral</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">cyclic quadrilateral</span> has all four corners on a circle. Its opposite angles add up to 180°. If you extend one side outside the circle, you make an <span class=\"learn-keyword\">exterior angle</span>.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Rule 3:</strong> The exterior angle of a cyclic quadrilateral is equal to the interior opposite angle. If side BC of ABCD is extended to E, then angle DCE = angle DAB.</div>\n<p class=\"learn-p\">The reason: angle BCD + angle DCE = 180° (angles on a straight line). Also angle BCD + angle DAB = 180° (opposite angles of a cyclic quadrilateral). Both angles equal 180° minus angle BCD, so angle DCE = angle DAB.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> ABCD is a cyclic quadrilateral with angle ADC = 78° and angle DAB = 95°. The side BC is extended to E. Find (a) angle ABC, (b) angle BCD, (c) angle DCE.<br>(a) Angle ABC is opposite to angle ADC. Angle ABC = 180° − 78° = 102°.<br>(b) Angle BCD is opposite to angle DAB. Angle BCD = 180° − 95° = 85°.<br>(c) Angle DCE is the exterior angle at C. It equals the interior opposite angle DAB, so angle DCE = 95°.<br>Check: angle BCD + angle DCE = 85° + 95° = 180° (angles on a straight line). ✓<br><strong>Answer: (a) 102°, (b) 85°, (c) 95°.</strong></div>\n<p class=\"learn-p\">Notice that the exterior angle at C is equal to the interior angle at A, the corner that is opposite to C. It is not equal to the neighbouring angles at B or D.</p>\n<h3 class=\"learn-subheading\">5. Solving combined problems</h3>\n<p class=\"learn-p\">Most exam questions use two or more rules. Here is a good method.</p>\n<ol class=\"learn-ordered\"><li>Step 1: Read the question and mark every given angle on your diagram.</li><li>Step 2: Look for a diameter (angle 90°), the centre (isosceles triangles, double angle), and four points forming a cyclic quadrilateral.</li><li>Step 3: Find angles that stand on the same chord on the same side. Mark them equal.</li><li>Step 4: Use the angle sum of a triangle (180°) or angles on a straight line (180°) to fill the gaps.</li><li>Step 5: Write the reason beside each step.</li></ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> AB is a diameter of a circle. C and D are points on opposite sides of AB, so that ACBD is a cyclic quadrilateral. Angle CAB = 25°. Find (a) angle ABC, (b) angle CDB, (c) angle ADC.<br>(a) Angle ACB = 90° (angle in a semicircle). Angle ABC = 180° − 90° − 25° = 65°.<br>(b) Angle CDB and angle CAB both stand on chord CB, and A and D are on the same side of CB. So angle CDB = angle CAB = 25°.<br>(c) Angle ADC and angle ABC both stand on chord AC, and B and D are on the same side of AC. So angle ADC = angle ABC = 65°.<br>Check: angle ADB is also an angle in a semicircle = 90°, and angle ADC + angle CDB = 65° + 25° = 90°. ✓<br><strong>Answer: (a) 65°, (b) 25°, (c) 65°.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> A and B are points on a circle with centre O. Angle AOB = 110°. C is a point on the major arc and D is a point on the minor arc. Find (a) angle ACB, (b) angle ADB.<br>(a) Angle at circumference = half the angle at the centre. Angle ACB = 110° ÷ 2 = 55°.<br>(b) ACBD is a cyclic quadrilateral, so opposite angles add up to 180°. Angle ADB = 180° − 55° = 125°.<br>Check: the minor arc subtends a reflex angle of 360° − 110° = 250° at the centre. Half of 250° is 125°. ✓<br><strong>Answer: (a) 55°, (b) 125°.</strong></div>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Rule</th><th>What to look for</th><th>Result</th></tr></thead><tbody><tr><td>Same segment</td><td>Two angles on the same chord, same side</td><td>Equal angles</td></tr><tr><td>Semicircle</td><td>A diameter as one side</td><td>90° at the circumference</td></tr><tr><td>Angle at centre</td><td>Centre O and an arc</td><td>Centre angle = 2 × circumference angle</td></tr><tr><td>Cyclic quadrilateral</td><td>Four points on a circle</td><td>Opposite angles add to 180°</td></tr><tr><td>Exterior angle</td><td>A side of the quadrilateral extended</td><td>Exterior angle = interior opposite angle</td></tr></tbody></table></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong> <br>1. Saying two angles are equal when they are on opposite sides of the chord. Angles on opposite sides add up to 180° instead.<br>2. Forgetting that the angle in a semicircle needs the diameter. If the line does not pass through the centre, the angle is not 90°.<br>3. Choosing the wrong interior angle for the exterior angle rule. Choose the angle at the corner opposite the extended side, not the neighbour.<br>4. Giving answers without reasons. Write short reasons such as \"angles in the same segment\".</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> In WAEC and NECO, a diagram often looks crowded. Redraw it larger, name each angle and work one step at a time. Look first for a diameter, then for the centre, then for equal angles in the same segment. Questions often begin \"Find the value of x\" or \"Calculate angle ...\". Show each step with its reason to collect method marks.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> <br>• Angles in the same segment are equal.<br>• The angle in a semicircle is 90°.<br>• Angle at the centre = 2 × angle at the circumference.<br>• Opposite angles of a cyclic quadrilateral add up to 180°.<br>• The exterior angle equals the interior opposite angle.<br>• In problems, mark angles, find the rule, and give a reason for each step.</div>",
    "questions": [
      {
        "q": "Angles in the same segment of a circle are",
        "o": [
          "supplementary",
          "equal",
          "complementary",
          "double each other"
        ],
        "a": 1,
        "e": "Angles standing on the same chord and on the same side of it are equal. Supplementary angles add up to 180°, which applies to opposite angles of a cyclic quadrilateral, not to the same segment.",
        "h": "Same chord, same side.",
        "yr": "SS2"
      },
      {
        "q": "AB is a diameter of a circle and C is a point on the circle. Angle ACB is",
        "o": [
          "180°",
          "45°",
          "90°",
          "60°"
        ],
        "a": 2,
        "e": "The angle in a semicircle is 90°. The diameter itself makes 180° at the centre, but the angle at the circumference is half of that.",
        "h": "Half of 180°.",
        "yr": "SS2"
      },
      {
        "q": "The exterior angle of a cyclic quadrilateral is equal to",
        "o": [
          "the adjacent interior angle",
          "twice the interior opposite angle",
          "180° plus the opposite angle",
          "the interior opposite angle"
        ],
        "a": 3,
        "e": "The exterior angle equals the interior angle at the opposite corner. The adjacent interior angle adds up with it to 180° on a straight line, so they are not equal.",
        "h": "Opposite corner, not neighbour.",
        "yr": "SS2"
      },
      {
        "q": "A, B, C, D lie on a circle with C and D on the same side of AB. If angle ACB = 37°, find angle ADB.",
        "o": [
          "37°",
          "53°",
          "74°",
          "143°"
        ],
        "a": 0,
        "e": "C and D are in the same segment and both angles stand on chord AB, so they are equal: angle ADB = 37°. Doubling gives 74°, the angle at the centre, which is not asked.",
        "h": "Use the same segment rule.",
        "yr": "SS2"
      },
      {
        "q": "AB is a diameter and C is on the circle. If angle CAB = 52°, find angle ABC.",
        "o": [
          "52°",
          "90°",
          "38°",
          "128°"
        ],
        "a": 2,
        "e": "Angle ACB = 90° (angle in a semicircle). Angle ABC = 180° − 90° − 52° = 38°. The answer 90° is angle C, not angle B.",
        "h": "Find angle ACB first.",
        "yr": "SS2"
      },
      {
        "q": "ABCD is a cyclic quadrilateral. BC is extended to E. If angle DAB = 100°, find angle DCE.",
        "o": [
          "80°",
          "200°",
          "50°",
          "100°"
        ],
        "a": 3,
        "e": "The exterior angle DCE equals the interior opposite angle DAB, so angle DCE = 100°. The value 80° is the interior angle BCD, which is 180° − 100°.",
        "h": "Exterior angle = interior opposite.",
        "yr": "SS2"
      },
      {
        "q": "O is the centre of a circle. Angle AOB = 110°. C is on the major arc. Find angle ACB.",
        "o": [
          "55°",
          "110°",
          "220°",
          "70°"
        ],
        "a": 0,
        "e": "The angle at the circumference is half the angle at the centre: 110° ÷ 2 = 55°. The answer 220° doubles instead of halves.",
        "h": "Halve the centre angle.",
        "yr": "SS2"
      },
      {
        "q": "In the same circle, A, B, C, D are points with angle ACB = 42° and C, D on the same side of AB. A point E is on the opposite side of AB. Find angle AEB.",
        "o": [
          "42°",
          "138°",
          "48°",
          "84°"
        ],
        "a": 1,
        "e": "E is on the opposite side of AB from C, so ACBE is a cyclic quadrilateral and its opposite angles add up to 180°. Angle AEB = 180° − 42° = 138°. The angle 42° is only correct for points in the same segment.",
        "h": "Opposite sides add up to 180°.",
        "yr": "SS2"
      },
      {
        "q": "Which statement is true about angles in a semicircle?",
        "o": [
          "They are all 60°",
          "They are all equal to the angle at the centre",
          "They depend on the radius of the circle",
          "They are all right angles"
        ],
        "a": 3,
        "e": "Every angle in a semicircle is 90°, whatever the size of the circle. The angle at the centre on the diameter is 180°, which is double, not equal.",
        "h": "Think of the diameter as the base.",
        "yr": "SS2"
      },
      {
        "q": "In a cyclic quadrilateral PQRS, angle P = 3x and angle R = 2x + 20°. Find x.",
        "o": [
          "32",
          "20",
          "36",
          "40"
        ],
        "a": 0,
        "e": "P and R are opposite angles, so 3x + 2x + 20 = 180. Then 5x = 160, so x = 32. Using 360 instead of 180 would give x = 68, which is wrong because only one pair is used.",
        "h": "Opposite angles add up to 180°.",
        "yr": "SS2"
      },
      {
        "q": "AB is a diameter of a circle with centre O. C is on the circle and angle OCB = 28°. Find angle CAB.",
        "o": [
          "28°",
          "62°",
          "56°",
          "90°"
        ],
        "a": 1,
        "e": "Triangle OBC is isosceles since OB = OC, so angle OBC = 28°. Angle ACB = 90° (angle in a semicircle), so angle CAB = 180° − 90° − 28° = 62°. The answer 28° is angle ABC, not angle CAB.",
        "h": "Triangle OBC is isosceles.",
        "yr": "SS2"
      },
      {
        "q": "ABCD is a cyclic quadrilateral with angle ABC = 4x and angle ADC = 5x. Find the value of angle ADC.",
        "o": [
          "80°",
          "90°",
          "100°",
          "120°"
        ],
        "a": 2,
        "e": "Angles ABC and ADC are opposite, so 4x + 5x = 180°, giving x = 20°. Angle ADC = 5 × 20° = 100°. The value 80° is angle ABC.",
        "h": "Set 4x + 5x = 180°.",
        "yr": "SS2"
      },
      {
        "q": "PQ is a chord of a circle. R and S are points on the circle on the same side of PQ. Angle PRQ = 3x and angle PSQ = x + 40°. Find x.",
        "o": [
          "20°",
          "10°",
          "40°",
          "80°"
        ],
        "a": 0,
        "e": "R and S are in the same segment, so angle PRQ = angle PSQ. Then 3x = x + 40°, so 2x = 40° and x = 20°. If you add them to 180° you get the wrong value, because that rule is for opposite sides of the chord.",
        "h": "Same segment means equal angles.",
        "yr": "SS2"
      },
      {
        "q": "Triangle ABC is inscribed in a circle with AB as a diameter. If AC = 8 cm and BC = 6 cm, find the radius.",
        "o": [
          "10 cm",
          "5 cm",
          "7 cm",
          "14 cm"
        ],
        "a": 1,
        "e": "Angle ACB = 90° (angle in a semicircle), so AB² = 8² + 6² = 64 + 36 = 100 and AB = 10 cm. The radius is half of the diameter, so 5 cm. The answer 10 cm is the diameter.",
        "h": "Find the diameter first.",
        "yr": "SS2"
      },
      {
        "q": "O is the centre. Angle AOB = 130° and C is on the major arc. D is on the minor arc. Find angle ADB.",
        "o": [
          "65°",
          "130°",
          "115°",
          "230°"
        ],
        "a": 2,
        "e": "Angle ACB = 130° ÷ 2 = 65°. ACBD is cyclic, so angle ADB = 180° − 65° = 115°. The answer 65° is for the major arc only.",
        "h": "Use the cyclic quadrilateral.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Trigonometry I",
    "topicCode": "SS2-MATH-12",
    "module": "Trigonometry",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">In a right-angled triangle we use sine, cosine and tangent. But many triangles in real life do not have a right angle. A surveyor measuring land in Abuja, or a pilot flying between Lagos and Kano, often works with such triangles. The <span class=\"learn-keyword\">sine rule</span> and the <span class=\"learn-keyword\">cosine rule</span> let us find missing sides and angles in any triangle. These two rules are very important in WAEC and NECO, so learn them carefully, step by step.</div>\n<h3 class=\"learn-subheading\">1. Naming the sides and angles</h3>\n<p class=\"learn-p\">In triangle ABC, we use capital letters for the angles (A, B, C) and small letters for the sides. Side <strong>a</strong> is the side opposite angle A, side <strong>b</strong> is opposite angle B, and side <strong>c</strong> is opposite angle C. \"Opposite\" means the side that does not touch the angle. This rule is the key to everything in this topic.</p>\n<p class=\"learn-p\">Remember also that the three angles of any triangle add up to 180°. So if two angles are known, the third is easy to find. The bigger angle is always opposite the longer side.</p>\n<h3 class=\"learn-subheading\">2. The sine rule</h3>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Sine Rule:</strong> a / sin A = b / sin B = c / sin C. To find an angle, we can turn it upside down: sin A / a = sin B / b = sin C / c.</div>\n<p class=\"learn-p\">It says that the ratio of a side to the sine of its opposite angle is the same for all three sides. We use two parts of the rule at a time, as a pair.</p>\n<h4 class=\"learn-subsubheading\">When to use the sine rule</h4>\n<ul class=\"learn-list\"><li>You know two angles and one side (then you can find the other sides).</li><li>You know two sides and an angle that is opposite one of them (then you can find another angle).</li></ul>\n<p class=\"learn-p\">In both cases you need a \"matching pair\": one side and its opposite angle, both known.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1 (finding a side):</strong> In triangle ABC, angle A = 40°, angle B = 65° and a = 10 cm. Find b and c correct to 1 decimal place.<br>Step 1: Angle C = 180° − 40° − 65° = 75°.<br>Step 2: Use b / sin B = a / sin A. So b = a × sin B ÷ sin A = 10 × sin 65° ÷ sin 40°.<br>Step 3: sin 65° = 0.9063 and sin 40° = 0.6428. So b = 10 × 0.9063 ÷ 0.6428 = 14.1 cm.<br>Step 4: c = a × sin C ÷ sin A = 10 × sin 75° ÷ sin 40° = 10 × 0.9659 ÷ 0.6428 = 15.0 cm.<br><strong>Answer: b = 14.1 cm and c = 15.0 cm.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2 (finding an angle):</strong> In triangle ABC, a = 10 cm, b = 8 cm and angle A = 50°. Find angle B and angle C.<br>Step 1: sin B / b = sin A / a. So sin B = b × sin A ÷ a = 8 × sin 50° ÷ 10.<br>Step 2: sin 50° = 0.7660. So sin B = 8 × 0.7660 ÷ 10 = 0.6128.<br>Step 3: B = sin⁻¹(0.6128) = 37.8°. (Side b is shorter than side a, so angle B must be smaller than angle A, so B is acute.)<br>Step 4: C = 180° − 50° − 37.8° = 92.2°.<br><strong>Answer: B = 37.8° and C = 92.2°.</strong></div>\n<h3 class=\"learn-subheading\">3. The cosine rule</h3>\n<p class=\"learn-p\">Sometimes you do not have a matching pair. For example, you may know two sides and the angle between them, or all three sides. Then you use the cosine rule.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Cosine Rule (for a side):</strong> a² = b² + c² − 2bc cos A. Similarly b² = a² + c² − 2ac cos B and c² = a² + b² − 2ab cos C.<br><strong>Cosine Rule (for an angle):</strong> cos A = (b² + c² − a²) / (2bc).</div>\n<p class=\"learn-p\">In the first form, the angle A is the angle <em>between</em> sides b and c, and a is the side opposite A. Notice that if A = 90°, then cos A = 0 and the rule becomes Pythagoras' theorem: a² = b² + c². So the cosine rule is a bigger form of Pythagoras.</p>\n<h4 class=\"learn-subsubheading\">When to use the cosine rule</h4>\n<ul class=\"learn-list\"><li>You know two sides and the angle between them (SAS). You find the third side.</li><li>You know all three sides (SSS). You find an angle.</li></ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3 (finding a side):</strong> In triangle ABC, b = 7 cm, c = 9 cm and angle A = 60°. Find a.<br>Step 1: a² = b² + c² − 2bc cos A = 7² + 9² − 2 × 7 × 9 × cos 60°.<br>Step 2: 7² = 49, 9² = 81 and 2 × 7 × 9 = 126. cos 60° = 0.5, so 126 × 0.5 = 63.<br>Step 3: a² = 49 + 81 − 63 = 67.<br>Step 4: a = √67 = 8.19 cm (2 d.p.).<br><strong>Answer: a ≈ 8.19 cm.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4 (finding an angle):</strong> A triangle has sides a = 7 cm, b = 8 cm and c = 9 cm. Find angle A.<br>Step 1: cos A = (b² + c² − a²) ÷ (2bc) = (8² + 9² − 7²) ÷ (2 × 8 × 9).<br>Step 2: 8² = 64, 9² = 81, 7² = 49. So the top is 64 + 81 − 49 = 96. The bottom is 2 × 8 × 9 = 144.<br>Step 3: cos A = 96 ÷ 144 = 0.6667.<br>Step 4: A = cos⁻¹(0.6667) = 48.2° (1 d.p.).<br><strong>Answer: angle A ≈ 48.2°.</strong></div>\n<h3 class=\"learn-subheading\">4. How to choose the correct rule</h3>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>What you are given</th><th>What to find</th><th>Use</th></tr></thead><tbody><tr><td>Two angles and one side</td><td>Another side</td><td>Sine rule</td></tr><tr><td>Two sides and an angle opposite one of them</td><td>Another angle</td><td>Sine rule</td></tr><tr><td>Two sides and the angle between them</td><td>Third side</td><td>Cosine rule</td></tr><tr><td>Three sides</td><td>An angle</td><td>Cosine rule</td></tr></tbody></table></div>\n<p class=\"learn-p\">A quick check: ask \"do I have a side and its opposite angle?\" If yes, use the sine rule. If not, use the cosine rule.</p>\n<h3 class=\"learn-subheading\">5. Problem solving with the two rules</h3>\n<p class=\"learn-p\">Real problems are written in words. Follow these steps:</p>\n<ol class=\"learn-ordered\"><li>Step 1: Draw a clear diagram of the triangle and mark the given sides and angles.</li><li>Step 2: Name the sides and angles with the standard letters.</li><li>Step 3: Decide which rule fits (use the table above).</li><li>Step 4: Write the rule, substitute the numbers, and work carefully.</li><li>Step 5: Round only at the end, and write the units.</li></ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 5:</strong> Two straight paths meet at a junction J at an angle of 70°. Ada walks 300 m along one path to point A, and Bola walks 450 m along the other path to point B. Find the distance AB to the nearest metre.<br>Step 1: In triangle JAB, the angle at J is 70° and the two sides next to it are JA = 300 m and JB = 450 m. This is two sides and the angle between them, so use the cosine rule.<br>Step 2: AB² = 300² + 450² − 2 × 300 × 450 × cos 70°.<br>Step 3: 300² = 90,000 and 450² = 202,500. 2 × 300 × 450 = 270,000. cos 70° = 0.3420, so 270,000 × 0.3420 = 92,345.<br>Step 4: AB² = 90,000 + 202,500 − 92,345 = 200,155 (approximately).<br>Step 5: AB = √200,155 ≈ 447 m.<br><strong>Answer: AB ≈ 447 m.</strong></div>\n<p class=\"learn-p\">Note: for the angles in the cosine rule, if cos A is negative, then angle A is obtuse (more than 90°). Your calculator will give you the correct obtuse angle automatically.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong> <br>1. Pairing a side with the wrong angle in the sine rule. Always pair a side with the angle <em>opposite</em> it.<br>2. Wrong order in the cosine rule. Work out b² + c² and 2bc cos A separately, then subtract. Do not work out (b² + c² − 2bc) and then multiply by cos A.<br>3. Forgetting the square root at the end when finding a side from a².<br>4. Having the calculator in radian mode. Set it to degrees (DEG).</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often says \"Calculate, correct to 3 significant figures, the length of ...\" or \"Find the largest angle of the triangle\". The largest angle is opposite the longest side, so use the cosine rule with that side as a. Keep at least 4 figures in the middle of your working and round only at the end.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> <br>• Side a is opposite angle A, and so on.<br>• Sine rule: a / sin A = b / sin B = c / sin C.<br>• Cosine rule: a² = b² + c² − 2bc cos A, and cos A = (b² + c² − a²) / (2bc).<br>• Use the sine rule when you have a side and its opposite angle.<br>• Use the cosine rule for SAS or SSS.<br>• Draw, label, choose the rule, substitute, and round at the end.</div>",
    "questions": [
      {
        "q": "In triangle ABC, the side opposite angle B is written as",
        "o": [
          "a",
          "b",
          "c",
          "sin B"
        ],
        "a": 1,
        "e": "Side b is opposite angle B, side a is opposite angle A and side c is opposite angle C. The capital B is the angle, not the side.",
        "h": "Small letter for the side.",
        "yr": "SS2"
      },
      {
        "q": "Which of these is the sine rule?",
        "o": [
          "a² = b² + c²",
          "a sin A = b sin B",
          "a / sin A = b / sin B",
          "a / cos A = b / cos B"
        ],
        "a": 2,
        "e": "The sine rule states that a / sin A = b / sin B = c / sin C. The expression a² = b² + c² is Pythagoras' theorem, and the cosine rule has the form a² = b² + c² − 2bc cos A.",
        "h": "Side divided by the sine of its opposite angle.",
        "yr": "SS2"
      },
      {
        "q": "Which rule should you use to find the third side of a triangle when two sides and the angle between them are known?",
        "o": [
          "Sine rule",
          "Pythagoras' theorem only",
          "Area rule",
          "Cosine rule"
        ],
        "a": 3,
        "e": "With two sides and the angle between them there is no side-and-opposite-angle pair, so the sine rule cannot start. The cosine rule works. Pythagoras works only for right angles.",
        "h": "Is there a matching pair?",
        "yr": "SS2"
      },
      {
        "q": "In triangle ABC, A = 40°, B = 65° and a = 10 cm. Find b, correct to 1 decimal place.",
        "o": [
          "14.1 cm",
          "6.4 cm",
          "11.0 cm",
          "15.0 cm"
        ],
        "a": 0,
        "e": "b = a sin B ÷ sin A = 10 × sin 65° ÷ sin 40° = 10 × 0.9063 ÷ 0.6428 = 14.1 cm. The value 15.0 cm is side c, found using angle C = 75°.",
        "h": "b / sin B = a / sin A.",
        "yr": "SS2"
      },
      {
        "q": "The cosine rule for angle A is cos A =",
        "o": [
          "(a² + b² + c²) / (2bc)",
          "(b² + c² + a²) / 2",
          "(b² + c² − a²) / (2bc)",
          "(a² − b² − c²) / (2bc)"
        ],
        "a": 2,
        "e": "Rearranging a² = b² + c² − 2bc cos A gives cos A = (b² + c² − a²) / (2bc). The side a, opposite angle A, is the one that is subtracted.",
        "h": "The side opposite A is subtracted.",
        "yr": "SS2"
      },
      {
        "q": "In triangle ABC, b = 7 cm, c = 9 cm and A = 60°. Find a, correct to 2 decimal places.",
        "o": [
          "8.00 cm",
          "11.40 cm",
          "67.00 cm",
          "8.19 cm"
        ],
        "a": 3,
        "e": "a² = 7² + 9² − 2 × 7 × 9 × cos 60° = 49 + 81 − 63 = 67, so a = √67 = 8.19 cm. The answer 67 forgets to take the square root.",
        "h": "Remember cos 60° = 0.5.",
        "yr": "SS2"
      },
      {
        "q": "A triangle has sides 7 cm, 8 cm and 9 cm. Find the angle opposite the 7 cm side, to 1 decimal place.",
        "o": [
          "48.2°",
          "41.4°",
          "60.0°",
          "58.4°"
        ],
        "a": 0,
        "e": "cos A = (8² + 9² − 7²) ÷ (2 × 8 × 9) = 96 ÷ 144 = 0.6667, so A = 48.2°. The cosine rule is used because all three sides are known.",
        "h": "Three sides given: use the cosine rule.",
        "yr": "SS2"
      },
      {
        "q": "In triangle ABC, a = 10 cm, b = 8 cm and A = 50°. Find angle B, to the nearest 0.1°.",
        "o": [
          "50.0°",
          "37.8°",
          "42.2°",
          "52.2°"
        ],
        "a": 1,
        "e": "sin B = b sin A ÷ a = 8 × 0.7660 ÷ 10 = 0.6128, so B = 37.8°. B must be less than A because b is shorter than a.",
        "h": "sin B / b = sin A / a.",
        "yr": "SS2"
      },
      {
        "q": "In triangle ABC, A = 30°, B = 45° and a = 6 cm. Find b, to 2 decimal places.",
        "o": [
          "4.24 cm",
          "6.00 cm",
          "12.00 cm",
          "8.49 cm"
        ],
        "a": 3,
        "e": "b = a sin B ÷ sin A = 6 × sin 45° ÷ sin 30° = 6 × 0.7071 ÷ 0.5 = 8.49 cm. The answer 4.24 cm comes from switching the sines.",
        "h": "Divide by sin of the known angle.",
        "yr": "SS2"
      },
      {
        "q": "If cos A is negative in a triangle, then angle A is",
        "o": [
          "obtuse",
          "acute",
          "a right angle",
          "zero"
        ],
        "a": 0,
        "e": "When cos A is negative, A is more than 90°, so it is obtuse. A right angle has cos 90° = 0, and an acute angle has a positive cosine.",
        "h": "Think of the cosine of 120°.",
        "yr": "SS2"
      },
      {
        "q": "Two paths meet at 70°. Ada walks 300 m on one and Bola walks 450 m on the other. Find the distance between them, to the nearest metre.",
        "o": [
          "750 m",
          "447 m",
          "292 m",
          "200,155 m"
        ],
        "a": 1,
        "e": "AB² = 300² + 450² − 2 × 300 × 450 × cos 70° = 90,000 + 202,500 − 92,345 ≈ 200,155, so AB ≈ 447 m. Adding 300 + 450 = 750 ignores the angle, and 200,155 forgets the square root.",
        "h": "Use the cosine rule with the angle between the sides.",
        "yr": "SS2"
      },
      {
        "q": "In triangle PQR, p = 12 cm, q = 9 cm and R = 90°. Which is correct?",
        "o": [
          "r = 21 cm",
          "r = 3 cm",
          "r = 15 cm",
          "r = 108 cm"
        ],
        "a": 2,
        "e": "With R = 90°, cos R = 0, so r² = p² + q² = 144 + 81 = 225 and r = 15 cm. This shows the cosine rule becomes Pythagoras' theorem.",
        "h": "What is cos 90°?",
        "yr": "SS2"
      },
      {
        "q": "A triangle has sides 5 cm, 6 cm and 10 cm. Which is true about its largest angle?",
        "o": [
          "It is opposite the 10 cm side and is obtuse",
          "It is opposite the 5 cm side",
          "It is exactly 90°",
          "It is acute because all sides are short"
        ],
        "a": 0,
        "e": "The largest angle lies opposite the longest side. cos = (5² + 6² − 10²) ÷ (2 × 5 × 6) = (25 + 36 − 100) ÷ 60 = −39 ÷ 60 = −0.65, which is negative, so the angle is obtuse (about 130.5°).",
        "h": "The largest angle faces the longest side.",
        "yr": "SS2"
      },
      {
        "q": "In triangle ABC, A = 35°, C = 75° and b = 8 cm. Find a, to 1 decimal place.",
        "o": [
          "8.0 cm",
          "4.9 cm",
          "13.1 cm",
          "6.2 cm"
        ],
        "a": 1,
        "e": "B = 180° − 35° − 75° = 70°. Then a = b sin A ÷ sin B = 8 × 0.5736 ÷ 0.9397 = 4.9 cm. The answer 13.1 cm comes from switching the two sines.",
        "h": "Find angle B first.",
        "yr": "SS2"
      },
      {
        "q": "A ship sails 12 km from A to B and then 8 km from B to C so that angle ABC = 100°. Which expression gives AC²?",
        "o": [
          "12² + 8² − 2 × 12 × 8 × sin 100°",
          "12² + 8² + 2 × 12 × 8",
          "12² + 8² − 2 × 12 × 8 × cos 100°",
          "12² − 8² − 2 × 12 × 8 × cos 100°"
        ],
        "a": 2,
        "e": "Angle B lies between the sides 12 and 8 and AC is opposite B, so the cosine rule gives AC² = 12² + 8² − 2 × 12 × 8 × cos 100°. The sine would not appear in this rule, and the squares are added, not subtracted.",
        "h": "B is between the two known sides.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Trigonometry II",
    "topicCode": "SS2-MATH-13",
    "module": "Trigonometry",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">Many things around us form right-angled triangles: a ladder leaning on a wall, a pole with its shadow, or a kite on its string. In this topic we use <span class=\"learn-keyword\">Pythagoras' theorem</span> and the trigonometric ratios to find lengths and angles in such real-life situations. We also learn the <span class=\"learn-keyword\">angle of elevation</span> and the <span class=\"learn-keyword\">angle of depression</span>. A surveyor who wants to know how tall an NEPA pole is, without climbing it, uses exactly these ideas.</div>\n<h3 class=\"learn-subheading\">1. Pythagoras' theorem</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">right-angled triangle</span> has one angle of 90°. The longest side is opposite the right angle. It is called the <span class=\"learn-keyword\">hypotenuse</span>. The other two sides are the legs.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Pythagoras' theorem:</strong> In a right-angled triangle, (hypotenuse)² = (one leg)² + (other leg)². If the hypotenuse is c and the legs are a and b, then c² = a² + b².</div>\n<p class=\"learn-p\">To find the hypotenuse, add the squares and then take the square root. To find a leg, subtract the square of the known leg from the square of the hypotenuse, then take the square root. Some whole-number sets that work are called Pythagorean triples: 3, 4, 5; 5, 12, 13; 8, 15, 17; and 7, 24, 25.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> A rectangular football field is 120 m long and 50 m wide. Find the length of the diagonal.<br>Step 1: The diagonal is the hypotenuse of a right-angled triangle with legs 120 m and 50 m.<br>Step 2: d² = 120² + 50² = 14,400 + 2,500 = 16,900.<br>Step 3: d = √16,900 = 130.<br><strong>Answer: the diagonal is 130 m.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> A ladder 5 m long leans against a vertical wall. Its foot is 1.4 m from the wall. How high up the wall does it reach?<br>Step 1: The ladder is the hypotenuse (5 m). The distance from the wall (1.4 m) is one leg. The height h is the other leg.<br>Step 2: h² = 5² − 1.4² = 25 − 1.96 = 23.04.<br>Step 3: h = √23.04 = 4.8.<br><strong>Answer: the ladder reaches 4.8 m up the wall.</strong></div>\n<h3 class=\"learn-subheading\">2. The trigonometric ratios</h3>\n<p class=\"learn-p\">Pythagoras gives lengths when we know two sides. When an angle is involved, we use the ratios sine, cosine and tangent. Pick one of the acute angles, call it θ. Label the sides in relation to θ:</p>\n<ul class=\"learn-list\"><li><span class=\"learn-keyword\">Hypotenuse</span>: the longest side, opposite the right angle.</li><li><span class=\"learn-keyword\">Opposite</span>: the side facing θ.</li><li><span class=\"learn-keyword\">Adjacent</span>: the side next to θ (not the hypotenuse).</li></ul>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Ratio</th><th>Formula</th><th>Memory word</th></tr></thead><tbody><tr><td>sin θ</td><td>opposite ÷ hypotenuse</td><td>SOH</td></tr><tr><td>cos θ</td><td>adjacent ÷ hypotenuse</td><td>CAH</td></tr><tr><td>tan θ</td><td>opposite ÷ adjacent</td><td>TOA</td></tr></tbody></table></div>\n<p class=\"learn-p\">Together, SOH-CAH-TOA helps you remember all three. To find a side, multiply or divide. To find an angle, use the inverse button on the calculator (sin⁻¹, cos⁻¹ or tan⁻¹).</p>\n<ol class=\"learn-ordered\"><li>Step 1: Draw the right-angled triangle and mark the angle θ.</li><li>Step 2: Label the sides opposite, adjacent and hypotenuse from θ.</li><li>Step 3: Choose the ratio that uses the side you know and the side you want.</li><li>Step 4: Write the equation, and solve it.</li></ol>\n<h3 class=\"learn-subheading\">3. Angles of elevation and depression</h3>\n<p class=\"learn-p\">Imagine you stand on the ground and look at the top of a tree. Your eyes first look straight ahead along a <span class=\"learn-keyword\">horizontal line</span> (a level line). You then lift your eyes upward to the top of the tree.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Angle of elevation:</strong> the angle between the horizontal line and the line of sight when you look UP at an object.<br><strong>Angle of depression:</strong> the angle between the horizontal line and the line of sight when you look DOWN at an object.</div>\n<p class=\"learn-p\">Both angles are measured from the horizontal, never from the vertical. Here is a very useful fact. If you stand at A and look up at B, the angle of elevation of B from A is equal to the angle of depression of A from B. This is because the horizontal lines at A and B are parallel, and the two angles are alternate angles.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3 (elevation):</strong> A student stands 20 m from the foot of a tree on level ground. The angle of elevation of the top of the tree is 35°. Find the height of the tree, to 1 decimal place. (Ignore the height of the student.)<br>Step 1: The horizontal distance 20 m is the adjacent side. The height h is the opposite side to the 35° angle.<br>Step 2: Opposite and adjacent: use tan. tan 35° = h ÷ 20.<br>Step 3: h = 20 × tan 35° = 20 × 0.7002 = 14.0.<br><strong>Answer: the tree is about 14.0 m high.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4 (depression):</strong> From the top of a building 30 m high, the angle of depression of a car on the road is 25°. How far is the car from the foot of the building, to 1 decimal place?<br>Step 1: The angle of depression 25° is measured from the horizontal at the top. By alternate angles, the angle at the car looking up at the top is also 25°.<br>Step 2: In the right-angled triangle, the building (30 m) is opposite the 25° angle at the car. The distance d is the adjacent side.<br>Step 3: tan 25° = 30 ÷ d, so d = 30 ÷ tan 25° = 30 ÷ 0.4663 = 64.3.<br><strong>Answer: the car is about 64.3 m from the building.</strong></div>\n<h3 class=\"learn-subheading\">4. Real-life problems: putting it together</h3>\n<p class=\"learn-p\">Real problems are given in words. First, draw a simple picture. Mark the right angle, the given lengths and angles, and the quantity you want. Second, decide: do I have two sides only (use Pythagoras), or an angle too (use trigonometry)? Third, solve and give the answer with units.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 5:</strong> A pole 12 m high casts a shadow 16 m long on level ground. Find (a) the distance from the top of the pole to the tip of the shadow, (b) the angle of elevation of the sun, to the nearest degree.<br>(a) The pole and shadow are the legs. Distance² = 12² + 16² = 144 + 256 = 400, so the distance is 20 m.<br>(b) The angle θ at the tip of the shadow has opposite = 12 and adjacent = 16. tan θ = 12 ÷ 16 = 0.75. θ = tan⁻¹(0.75) = 36.87°, which is 37° to the nearest degree.<br><strong>Answer: (a) 20 m, (b) 37°.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 6:</strong> A boy whose eyes are 1.5 m above the ground stands 40 m from a tower. The angle of elevation of the top of the tower from his eyes is 52°. Find the height of the tower, to 1 decimal place.<br>Step 1: The height of the tower above his eye level is h = 40 × tan 52° = 40 × 1.2799 = 51.2 m.<br>Step 2: The tower stands from the ground, so add his eye height. Height = 51.2 + 1.5 = 52.7 m.<br><strong>Answer: the tower is about 52.7 m high.</strong></div>\n<h3 class=\"learn-subheading\">5. Choosing the right method</h3>\n<p class=\"learn-p\">Use this quick guide. If two sides are known and you want the third side, use Pythagoras. If one side and one acute angle are known, use sine, cosine or tangent. If two sides are known and you want an angle, use the inverse ratio (sin⁻¹, cos⁻¹ or tan⁻¹). Remember that the angles in a triangle add up to 180°, so in a right-angled triangle the two acute angles add up to 90°.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 7:</strong> A ladder 6 m long leans against a wall and makes an angle of 70° with the level ground. Find (a) how high up the wall it reaches, (b) how far the foot of the ladder is from the wall. Give answers to 1 decimal place.<br>(a) The ladder is the hypotenuse. The height is opposite the 70° angle. sin 70° = h ÷ 6, so h = 6 × 0.9397 = 5.6 m.<br>(b) The distance from the wall is adjacent to the 70° angle. cos 70° = d ÷ 6, so d = 6 × 0.3420 = 2.1 m.<br>Check with Pythagoras: 5.64² + 2.05² = 31.8 + 4.2 = 36.0, and 6² = 36. It is correct.<br><strong>Answer: (a) 5.6 m, (b) 2.1 m.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong> <br>1. Using Pythagoras with c² = a² − b² for the hypotenuse. The hypotenuse is always found by adding the squares.<br>2. Forgetting to take the square root, and giving 16,900 instead of 130.<br>3. Measuring the angle of elevation or depression from the vertical. It is always measured from the horizontal line.<br>4. Forgetting to add the height of the observer's eye when the question tells you the observer's height.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC and NECO often write: \"From the top of a tower 40 m high, the angle of depression of a boat is 30°. Calculate the distance of the boat from the foot of the tower.\" Always draw the right-angled triangle first. Put the angle at the boat, not at the top, when you use alternate angles. Check that your calculator is in degree mode, and write units in your answer.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> <br>• Pythagoras: hypotenuse² = sum of the squares of the other two sides.<br>• sin = opposite ÷ hypotenuse, cos = adjacent ÷ hypotenuse, tan = opposite ÷ adjacent.<br>• Angle of elevation: looking up from the horizontal.<br>• Angle of depression: looking down from the horizontal.<br>• Elevation from A to B = depression from B to A (alternate angles).<br>• Draw a diagram, choose the method, solve, and write the units.</div>",
    "questions": [
      {
        "q": "In a right-angled triangle, the hypotenuse is",
        "o": [
          "the longest side, opposite the right angle",
          "the shortest side",
          "the side next to the right angle only",
          "any side we choose"
        ],
        "a": 0,
        "e": "The hypotenuse is always opposite the 90° angle and it is the longest side. The other two sides are the legs.",
        "h": "Think of the biggest angle.",
        "yr": "SS2"
      },
      {
        "q": "Which set of numbers is a Pythagorean triple?",
        "o": [
          "4, 5, 6",
          "5, 12, 13",
          "6, 7, 8",
          "2, 3, 4"
        ],
        "a": 1,
        "e": "5² + 12² = 25 + 144 = 169 = 13², so it works. For 4, 5, 6: 16 + 25 = 41, which is not 36.",
        "h": "Check a² + b² = c².",
        "yr": "SS2"
      },
      {
        "q": "In a right-angled triangle, sin θ is equal to",
        "o": [
          "adjacent ÷ hypotenuse",
          "opposite ÷ adjacent",
          "opposite ÷ hypotenuse",
          "hypotenuse ÷ opposite"
        ],
        "a": 2,
        "e": "SOH means Sine = Opposite over Hypotenuse. Adjacent over hypotenuse is cosine, and opposite over adjacent is tangent.",
        "h": "SOH-CAH-TOA.",
        "yr": "SS2"
      },
      {
        "q": "The angle of elevation is measured from",
        "o": [
          "the vertical line",
          "the hypotenuse",
          "the ground to the vertical",
          "the horizontal line"
        ],
        "a": 3,
        "e": "The angle of elevation is between the horizontal line and the line of sight when we look up. It is never measured from the vertical.",
        "h": "Level eye line.",
        "yr": "SS2"
      },
      {
        "q": "A man at A sees the top B of a tower at an angle of elevation of 28°. The angle of depression of A from B is",
        "o": [
          "28°",
          "62°",
          "152°",
          "90°"
        ],
        "a": 0,
        "e": "The horizontal lines at A and B are parallel, so the two angles are alternate angles and are equal. Both are 28°. The number 62° would be 90° − 28°, which is a different angle.",
        "h": "Alternate angles.",
        "yr": "SS2"
      },
      {
        "q": "The legs of a right-angled triangle are 9 cm and 12 cm. The hypotenuse is",
        "o": [
          "21 cm",
          "15 cm",
          "3 cm",
          "17 cm"
        ],
        "a": 1,
        "e": "c² = 9² + 12² = 81 + 144 = 225, so c = 15 cm. Adding 9 + 12 = 21 is wrong because we must add the squares first and then take the square root.",
        "h": "Add the squares.",
        "yr": "SS2"
      },
      {
        "q": "A ladder 13 m long has its foot 5 m from a wall. How high up the wall does it reach?",
        "o": [
          "18 m",
          "8 m",
          "12 m",
          "14 m"
        ],
        "a": 2,
        "e": "h² = 13² − 5² = 169 − 25 = 144, so h = 12 m. The ladder is the hypotenuse, so we subtract.",
        "h": "Ladder = hypotenuse.",
        "yr": "SS2"
      },
      {
        "q": "The hypotenuse of a right-angled triangle is 17 cm and one leg is 8 cm. The other leg is",
        "o": [
          "9 cm",
          "25 cm",
          "12 cm",
          "15 cm"
        ],
        "a": 3,
        "e": "x² = 17² − 8² = 289 − 64 = 225, so x = 15 cm. To find a leg, subtract the squares.",
        "h": "Subtract for a leg.",
        "yr": "SS2"
      },
      {
        "q": "A pole 6 m high casts a shadow 8 m long on level ground. The angle of elevation of the sun, to the nearest degree, is",
        "o": [
          "53°",
          "37°",
          "42°",
          "30°"
        ],
        "a": 1,
        "e": "tan θ = opposite ÷ adjacent = 6 ÷ 8 = 0.75, so θ = tan⁻¹(0.75) = 36.87°, which is 37° to the nearest degree. The value 53° is the other acute angle.",
        "h": "Use tan.",
        "yr": "SS2"
      },
      {
        "q": "A boy stands 50 m from a tree on level ground. The angle of elevation of the top of the tree is 40°. The height of the tree, to 1 decimal place, is (ignore the boy's height)",
        "o": [
          "38.3 m",
          "59.6 m",
          "42.0 m",
          "32.1 m"
        ],
        "a": 2,
        "e": "The height is opposite and the 50 m is adjacent, so tan 40° = h ÷ 50. Then h = 50 × 0.8391 = 41.95, which is 42.0 m to 1 decimal place. Using 50 ÷ tan 40° gives 59.6 m, which is wrong.",
        "h": "tan = opposite ÷ adjacent.",
        "yr": "SS2"
      },
      {
        "q": "From the top of a tower 40 m high, the angle of depression of a boat is 30°. The distance of the boat from the foot of the tower, to 1 decimal place, is",
        "o": [
          "20.0 m",
          "34.6 m",
          "80.0 m",
          "69.3 m"
        ],
        "a": 3,
        "e": "The angle at the boat is 30° (alternate angles). The tower is opposite and the distance d is adjacent, so tan 30° = 40 ÷ d. Then d = 40 ÷ 0.5774 = 69.3 m.",
        "h": "Divide by tan.",
        "yr": "SS2"
      },
      {
        "q": "A girl whose eyes are 1.6 m above the ground stands 30 m from a building. The angle of elevation of the top of the building from her eyes is 45°. The height of the building is",
        "o": [
          "31.6 m",
          "30 m",
          "28.4 m",
          "48.4 m"
        ],
        "a": 0,
        "e": "The height above her eyes is 30 × tan 45° = 30 × 1 = 30 m. The building starts at the ground, so we add her eye height: 30 + 1.6 = 31.6 m.",
        "h": "Add the eye height.",
        "yr": "SS2"
      },
      {
        "q": "From a boat the angle of elevation of the top of a cliff is 20°. What is the angle of depression of the boat from the top of the cliff?",
        "o": [
          "70°",
          "20°",
          "160°",
          "40°"
        ],
        "a": 1,
        "e": "Alternate angles are equal because the two horizontal lines are parallel. The angle of depression is therefore also 20°.",
        "h": "Alternate angles.",
        "yr": "SS2"
      },
      {
        "q": "The two shorter sides of a right-angled triangle are 7 cm and 24 cm. The longest side is",
        "o": [
          "31 cm",
          "23 cm",
          "25 cm",
          "17 cm"
        ],
        "a": 2,
        "e": "c² = 7² + 24² = 49 + 576 = 625, so c = 25 cm. The sum 31 is wrong because it is 7 + 24 without squaring.",
        "h": "This is a known triple.",
        "yr": "SS2"
      },
      {
        "q": "A kite string 50 m long is taut and makes an angle of 30° with level ground. The height of the kite above the ground is",
        "o": [
          "43.3 m",
          "50 m",
          "86.6 m",
          "25 m"
        ],
        "a": 3,
        "e": "The string is the hypotenuse and the height is opposite 30°, so sin 30° = h ÷ 50. Then h = 50 × 0.5 = 25 m. The value 43.3 m uses cosine, which gives the horizontal distance.",
        "h": "Opposite and hypotenuse.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Fractions",
    "topicCode": "SS2-MATH-14",
    "module": "Fractions and Number Operations",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">A <span class=\"learn-keyword\">fraction</span> is a part of a whole. When you share a loaf of bread into 4 equal parts and take 1 part, you have 1/4 of the bread. Fractions are everywhere in daily life: a trader sells 3/5 of a bag of garri, a family spends 1/3 of its money on rent, and a student scores 7/10 in a test. In this topic we learn to add, subtract, multiply and divide fractions, to solve equations that contain fractions, and to use fractions to solve real-life problems.</div>\n<h3 class=\"learn-subheading\">1. Meaning and types of fractions</h3>\n<p class=\"learn-p\">A fraction is written as one number over another, like 3/4. The number on top is the <span class=\"learn-keyword\">numerator</span>. It tells how many parts we have. The number at the bottom is the <span class=\"learn-keyword\">denominator</span>. It tells how many equal parts the whole is divided into. The denominator can never be 0.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Type</th><th>Meaning</th><th>Example</th></tr></thead><tbody><tr><td>Proper fraction</td><td>Numerator is smaller than denominator (less than 1)</td><td>3/5</td></tr><tr><td>Improper fraction</td><td>Numerator is bigger than or equal to denominator (1 or more)</td><td>7/4</td></tr><tr><td>Mixed number</td><td>A whole number and a proper fraction together</td><td>1 3/4</td></tr><tr><td>Equivalent fractions</td><td>Different fractions with the same value</td><td>1/2 = 2/4 = 3/6</td></tr></tbody></table></div>\n<p class=\"learn-p\">To change a mixed number to an improper fraction: multiply the whole number by the denominator, add the numerator, and keep the same denominator. So 2 3/5 = (2 × 5 + 3)/5 = 13/5. To change an improper fraction to a mixed number, divide the numerator by the denominator. The quotient is the whole number and the remainder is the new numerator. So 17/5 = 3 remainder 2, which is 3 2/5.</p>\n<p class=\"learn-p\">To make equivalent fractions, multiply or divide the top and the bottom by the same number. <span class=\"learn-keyword\">Simplifying</span> (or reducing) a fraction means dividing the top and bottom by their highest common factor. For example, 18/24 = 3/4 after dividing both by 6.</p>\n<h3 class=\"learn-subheading\">2. Adding and subtracting fractions</h3>\n<p class=\"learn-p\">You can only add or subtract fractions when the denominators are the same. If they are different, first find the <span class=\"learn-keyword\">lowest common multiple (LCM)</span> of the denominators. This is the smallest number that all the denominators divide into. Change each fraction to an equivalent fraction with this denominator.</p>\n<ol class=\"learn-ordered\"><li>Step 1: Find the LCM of the denominators.</li><li>Step 2: Change each fraction to an equivalent fraction with that denominator.</li><li>Step 3: Add or subtract the numerators. Keep the denominator.</li><li>Step 4: Simplify, and change to a mixed number if the answer is improper.</li></ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Find 2/3 + 3/4.<br>Step 1: The LCM of 3 and 4 is 12.<br>Step 2: 2/3 = 8/12 (multiply top and bottom by 4). 3/4 = 9/12 (multiply top and bottom by 3).<br>Step 3: 8/12 + 9/12 = 17/12.<br>Step 4: 17/12 = 1 5/12.<br><strong>Answer: 1 5/12.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> Find 3 1/2 − 1 3/4.<br>Step 1: Change to improper fractions. 3 1/2 = 7/2 and 1 3/4 = 7/4.<br>Step 2: The LCM of 2 and 4 is 4. So 7/2 = 14/4.<br>Step 3: 14/4 − 7/4 = 7/4.<br>Step 4: 7/4 = 1 3/4.<br><strong>Answer: 1 3/4.</strong></div>\n<h3 class=\"learn-subheading\">3. Multiplying and dividing fractions</h3>\n<p class=\"learn-p\">To multiply fractions, multiply the numerators together and multiply the denominators together. You do not need a common denominator. Change mixed numbers to improper fractions first. It is easier to <span class=\"learn-keyword\">cancel</span> (divide a top number and a bottom number by the same factor) before multiplying.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> Find 2 2/5 × 1 1/4.<br>Step 1: 2 2/5 = 12/5 and 1 1/4 = 5/4.<br>Step 2: 12/5 × 5/4. Cancel 5 with 5, and cancel 12 with 4 (12 ÷ 4 = 3).<br>Step 3: This leaves 3/1 = 3.<br>Check: 12 × 5 = 60 and 5 × 4 = 20, and 60/20 = 3.<br><strong>Answer: 3.</strong></div>\n<p class=\"learn-p\">To divide by a fraction, turn the second fraction upside down (this gives its <span class=\"learn-keyword\">reciprocal</span>) and then multiply. The reciprocal of 9/16 is 16/9. Remember to leave the first fraction as it is.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Find 3/4 ÷ 9/16.<br>Step 1: Turn the second fraction upside down and change ÷ to ×. 3/4 × 16/9.<br>Step 2: Cancel 3 with 9 (gives 1 and 3). Cancel 16 with 4 (gives 4 and 1).<br>Step 3: 1/1 × 4/3 = 4/3 = 1 1/3.<br><strong>Answer: 1 1/3.</strong></div>\n<p class=\"learn-p\">When a problem has several operations, follow BODMAS: Brackets, Of, Division and Multiplication, then Addition and Subtraction. The word \"of\" means multiply. So 3/5 of 50 kg = 3/5 × 50 = 30 kg.</p>\n<h3 class=\"learn-subheading\">4. Solving equations involving fractions</h3>\n<p class=\"learn-p\">An equation with fractions is easier to solve if we first remove the fractions. To do this, multiply every term on both sides by the LCM of all the denominators. This is called <span class=\"learn-keyword\">clearing the fractions</span>. Then solve the simple equation that is left.</p>\n<ol class=\"learn-ordered\"><li>Step 1: Find the LCM of all the denominators.</li><li>Step 2: Multiply every term on both sides by the LCM.</li><li>Step 3: Open the brackets, collect like terms, and solve for the unknown.</li><li>Step 4: Check your answer by putting it back into the original equation.</li></ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 5:</strong> Solve x/3 + 1/2 = 5/6.<br>Step 1: The LCM of 3, 2 and 6 is 6.<br>Step 2: Multiply every term by 6. 6 × x/3 + 6 × 1/2 = 6 × 5/6. This gives 2x + 3 = 5.<br>Step 3: 2x = 5 − 3 = 2, so x = 1.<br>Check: 1/3 + 1/2 = 2/6 + 3/6 = 5/6. It is correct.<br><strong>Answer: x = 1.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 6:</strong> Solve (2x − 1)/3 = (x + 4)/2.<br>Step 1: The LCM of 3 and 2 is 6. Multiply both sides by 6.<br>Step 2: 2(2x − 1) = 3(x + 4). Note that the whole top is multiplied.<br>Step 3: 4x − 2 = 3x + 12.<br>Step 4: 4x − 3x = 12 + 2, so x = 14.<br>Check: left side (28 − 1)/3 = 27/3 = 9. Right side (14 + 4)/2 = 18/2 = 9. It is correct.<br><strong>Answer: x = 14.</strong></div>\n<h3 class=\"learn-subheading\">5. Fractions in daily life</h3>\n<p class=\"learn-p\">In word problems, read slowly and find the whole amount. Fractions of the same whole can be added. Always find out what the \"whole\" is. If a fraction of the money is left, the whole is 1, so you can write the left-over fraction as 1 minus the fractions already used.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 7:</strong> Mr Bello spends 1/4 of his salary on food and 1/3 on rent. He has ₦15,000 left. Find his salary and the amount he spent on food.<br>Step 1: Fraction spent = 1/4 + 1/3 = 3/12 + 4/12 = 7/12.<br>Step 2: Fraction left = 1 − 7/12 = 12/12 − 7/12 = 5/12.<br>Step 3: 5/12 of the salary = ₦15,000. So 1/12 = 15,000 ÷ 5 = ₦3,000.<br>Step 4: Salary = 12 × ₦3,000 = ₦36,000.<br>Step 5: Food = 1/4 × ₦36,000 = ₦9,000.<br>Check: rent = 1/3 × 36,000 = 12,000. Then 9,000 + 12,000 + 15,000 = 36,000. It is correct.<br><strong>Answer: salary ₦36,000; food ₦9,000.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 8:</strong> A trader has 50 kg of garri. On Monday she sells 3/5 of it. On Tuesday she sells 1/4 of what is left. How many kilograms remain?<br>Step 1: Monday: 3/5 × 50 = 30 kg sold.<br>Step 2: Left after Monday = 50 − 30 = 20 kg.<br>Step 3: Tuesday: 1/4 × 20 = 5 kg sold.<br>Step 4: Remaining = 20 − 5 = 15 kg.<br><strong>Answer: 15 kg.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong> <br>1. Adding the denominators, such as 1/2 + 1/3 = 2/5. Wrong! Find the common denominator: 3/6 + 2/6 = 5/6.<br>2. Turning the wrong fraction upside down in a division. Only the second fraction (the divisor) is turned.<br>3. Multiplying only one term by the LCM when clearing fractions. Every term on both sides must be multiplied.<br>4. Forgetting that the bar under a long numerator works like a bracket, as in (x + 4)/2.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC usually asks \"Simplify ...\", \"Evaluate ...\" or \"Solve for x ...\" with mixed numbers, and a word problem such as \"A man spent 1/3 of his money on ... Find ...\". Show every step, because method marks are awarded. Give the final answer in its simplest form, and check it where you can.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> <br>• Numerator is the top and denominator is the bottom. The denominator is never 0.<br>• Add and subtract with a common denominator (the LCM).<br>• Multiply: top × top, bottom × bottom. Divide: multiply by the reciprocal of the second fraction.<br>• Change mixed numbers to improper fractions before multiplying or dividing.<br>• To solve equations with fractions, multiply every term by the LCM.<br>• In word problems, find the whole, and use 1 minus the used fractions to get what is left.</div>",
    "questions": [
      {
        "q": "In the fraction 5/8, the number 8 is called the",
        "o": [
          "denominator",
          "numerator",
          "quotient",
          "reciprocal"
        ],
        "a": 0,
        "e": "The bottom number is the denominator. It tells how many equal parts the whole is divided into. The top number, 5, is the numerator.",
        "h": "Bottom number.",
        "yr": "SS2"
      },
      {
        "q": "Which of these is an improper fraction?",
        "o": [
          "3/5",
          "7/4",
          "1 3/4",
          "2/9"
        ],
        "a": 1,
        "e": "7/4 has a numerator bigger than its denominator, so it is more than 1. 3/5 and 2/9 are proper fractions and 1 3/4 is a mixed number.",
        "h": "Top is bigger than bottom.",
        "yr": "SS2"
      },
      {
        "q": "17/5 written as a mixed number is",
        "o": [
          "2 3/5",
          "3 1/5",
          "3 2/5",
          "3 3/5"
        ],
        "a": 2,
        "e": "17 ÷ 5 = 3 remainder 2. The whole number is 3 and the remainder 2 becomes the numerator, so 17/5 = 3 2/5.",
        "h": "Divide 17 by 5.",
        "yr": "SS2"
      },
      {
        "q": "To divide one fraction by another, we",
        "o": [
          "multiply the first by the second",
          "turn the first fraction upside down and multiply",
          "add the numerators and denominators",
          "multiply the first by the reciprocal of the second"
        ],
        "a": 3,
        "e": "Division by a fraction means multiplication by its reciprocal. Only the second fraction (the divisor) is turned upside down.",
        "h": "Which one is turned?",
        "yr": "SS2"
      },
      {
        "q": "Find 1/2 + 1/3.",
        "o": [
          "5/6",
          "2/5",
          "1/6",
          "3/6 only"
        ],
        "a": 0,
        "e": "The LCM of 2 and 3 is 6. So 1/2 = 3/6 and 1/3 = 2/6, and the sum is 5/6. Adding tops and bottoms to get 2/5 is a common mistake.",
        "h": "Common denominator 6.",
        "yr": "SS2"
      },
      {
        "q": "Simplify 3/4 − 1/6.",
        "o": [
          "2/2",
          "7/12",
          "1/2",
          "5/12"
        ],
        "a": 1,
        "e": "The LCM of 4 and 6 is 12. So 3/4 = 9/12 and 1/6 = 2/12. Then 9/12 − 2/12 = 7/12.",
        "h": "LCM of 4 and 6.",
        "yr": "SS2"
      },
      {
        "q": "Evaluate 2 1/2 × 1 1/5.",
        "o": [
          "2 1/10",
          "3 1/10",
          "3",
          "2 1/2"
        ],
        "a": 2,
        "e": "2 1/2 = 5/2 and 1 1/5 = 6/5. Then 5/2 × 6/5 = 30/10 = 3. Multiplying only the whole numbers (2 × 1 = 2) and the fractions separately gives a wrong answer.",
        "h": "Make both improper.",
        "yr": "SS2"
      },
      {
        "q": "Evaluate 5/6 ÷ 5/12.",
        "o": [
          "1/2",
          "25/72",
          "1 1/2",
          "2"
        ],
        "a": 3,
        "e": "5/6 ÷ 5/12 = 5/6 × 12/5 = 60/30 = 2. The answer 1/2 comes from turning the wrong fraction upside down.",
        "h": "Turn the second one.",
        "yr": "SS2"
      },
      {
        "q": "Find 3/8 of 64 kg of rice.",
        "o": [
          "24 kg",
          "8 kg",
          "40 kg",
          "21 kg"
        ],
        "a": 0,
        "e": "The word 'of' means multiply. 3/8 × 64 = (64 ÷ 8) × 3 = 8 × 3 = 24 kg.",
        "h": "Divide by 8, then multiply by 3.",
        "yr": "SS2"
      },
      {
        "q": "Solve x/2 + x/3 = 10.",
        "o": [
          "x = 6",
          "x = 12",
          "x = 25",
          "x = 10"
        ],
        "a": 1,
        "e": "The LCM of 2 and 3 is 6. Multiply every term by 6: 3x + 2x = 60, so 5x = 60 and x = 12. Check: 6 + 4 = 10.",
        "h": "Multiply by 6.",
        "yr": "SS2"
      },
      {
        "q": "Solve (x + 1)/3 = (x − 1)/2.",
        "o": [
          "x = 1",
          "x = −5",
          "x = 5",
          "x = 7"
        ],
        "a": 2,
        "e": "Multiply both sides by 6: 2(x + 1) = 3(x − 1). This gives 2x + 2 = 3x − 3, so x = 5. Check: 6/3 = 2 and 4/2 = 2.",
        "h": "Multiply both sides by 6.",
        "yr": "SS2"
      },
      {
        "q": "Ada spends 1/5 of her money on transport and 2/5 on food. She has ₦6,000 left. How much did she have at first?",
        "o": [
          "₦10,000",
          "₦30,000",
          "₦9,000",
          "₦15,000"
        ],
        "a": 3,
        "e": "Fraction spent = 1/5 + 2/5 = 3/5, so the fraction left = 2/5. Then 2/5 of the money = ₦6,000, so 1/5 = ₦3,000 and the whole = 5 × ₦3,000 = ₦15,000.",
        "h": "Left = 1 minus spent.",
        "yr": "SS2"
      },
      {
        "q": "A tank that is 3/4 full holds 60 litres of water. The tank holds a total of",
        "o": [
          "80 litres",
          "45 litres",
          "75 litres",
          "90 litres"
        ],
        "a": 0,
        "e": "3/4 of the tank = 60 litres, so 1/4 = 20 litres. The full tank = 4 × 20 = 80 litres. The answer 45 litres comes from wrongly finding 3/4 of 60.",
        "h": "Find 1/4 first.",
        "yr": "SS2"
      },
      {
        "q": "Simplify 2/3 ÷ 4/9.",
        "o": [
          "8/27",
          "3/2",
          "2/3",
          "6/5"
        ],
        "a": 1,
        "e": "2/3 ÷ 4/9 = 2/3 × 9/4. Cancel to get (1 × 3)/(1 × 2) = 3/2, which is 1 1/2.",
        "h": "Cancel before multiplying.",
        "yr": "SS2"
      },
      {
        "q": "Evaluate 1 3/4 + 2 2/3.",
        "o": [
          "3 5/7",
          "4 1/2",
          "4 5/12",
          "3 5/12"
        ],
        "a": 2,
        "e": "1 3/4 = 7/4 = 21/12 and 2 2/3 = 8/3 = 32/12. The sum is 53/12 = 4 5/12. Another way: whole numbers 1 + 2 = 3, fractions 3/4 + 2/3 = 17/12 = 1 5/12, and 3 + 1 5/12 = 4 5/12. The answer 3 5/12 forgets to carry the extra 1.",
        "h": "Use 12 as the denominator.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Further Application of Trigonometry",
    "topicCode": "SS2-MATH-15",
    "module": "Trigonometry",
    "term": "Second Term",
    "contentHTML": "<div class=\"learn-intro\">When a pilot flies from Lagos to Abuja, or a ship leaves Apapa port, they must know the <span class=\"learn-keyword\">direction</span> to follow and the <span class=\"learn-keyword\">distance</span> to travel. In Mathematics we describe direction with <span class=\"learn-keyword\">bearings</span>. In this topic we use bearings together with the right-angled triangle, the sine rule and the cosine rule to find distances and directions. We also study the chord and the arc of a circle and use trigonometry to find their lengths. A hunter walking from his village to a stream, then to a farm, uses the same ideas.</div>\n<h3 class=\"learn-subheading\">1. What is a bearing?</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">bearing</span> is the direction of one point from another. We measure it as an angle. These three rules must always be followed:</p>\n<ol class=\"learn-ordered\"><li>Step 1: Start from the North line at the point you are measuring from.</li><li>Step 2: Measure clockwise (the way the hands of a clock move) until you reach the line to the other point.</li><li>Step 3: Write the angle with three figures, such as 045°, 060° or 270°. Add zeros in front if needed.</li></ol>\n<p class=\"learn-p\">The bearing of B from A means: stand at A, face North, and turn clockwise to face B. Always start at the point named after the word \"from\".</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Direction</th><th>Bearing</th></tr></thead><tbody><tr><td>North (N)</td><td>000° (or 360°)</td></tr><tr><td>North-East (NE)</td><td>045°</td></tr><tr><td>East (E)</td><td>090°</td></tr><tr><td>South-East (SE)</td><td>135°</td></tr><tr><td>South (S)</td><td>180°</td></tr><tr><td>South-West (SW)</td><td>225°</td></tr><tr><td>West (W)</td><td>270°</td></tr><tr><td>North-West (NW)</td><td>315°</td></tr></tbody></table></div>\n<p class=\"learn-p\">Sometimes a direction is given as a compass bearing, such as N 40° E. This means start at North and turn 40° towards the East. It is the same as the three-figure bearing 040°. Also, S 30° W means start at South and turn 30° towards West, so the three-figure bearing is 180° + 30° = 210°.</p>\n<h3 class=\"learn-subheading\">2. Back bearings</h3>\n<p class=\"learn-p\">If the bearing of B from A is known, the bearing of A from B is called the <span class=\"learn-keyword\">back bearing</span>. The two North lines at A and B are parallel, so we can use the angle rules for parallel lines. The rule is easy:</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">📌</span><strong>Back bearing rule:</strong> If the bearing is less than 180°, add 180°. If the bearing is 180° or more, subtract 180°.</div>\n<p class=\"learn-p\">For example, if the bearing of B from A is 065°, the bearing of A from B is 065° + 180° = 245°. If the bearing of Q from P is 290°, then the bearing of P from Q is 290° − 180° = 110°.</p>\n<h3 class=\"learn-subheading\">3. Bearings with right-angled triangles</h3>\n<p class=\"learn-p\">Suppose a ship sails a distance d on a bearing θ (with θ between 0° and 90°). The angle θ is measured from North. The distance moved North is the side adjacent to θ, and the distance moved East is the side opposite to θ. So:</p>\n<ul class=\"learn-list\"><li>Distance North = d cos θ</li><li>Distance East = d sin θ</li></ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> A ship sails 80 km on a bearing of 060°. How far North and how far East of its starting point is it? Give the answers to 1 decimal place.<br>Step 1: The angle from North is 60°. The distance sailed, 80 km, is the hypotenuse.<br>Step 2: Distance North = 80 × cos 60° = 80 × 0.5 = 40.0 km.<br>Step 3: Distance East = 80 × sin 60° = 80 × 0.8660 = 69.3 km.<br><strong>Answer: 40.0 km North and 69.3 km East.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> A boat leaves port P and travels 50 km on a bearing of 120°. How far East and how far South is it from P?<br>Step 1: A bearing of 120° lies between East (090°) and South (180°). The angle from the East line is 120° − 90° = 30°. The angle from the South line is 180° − 120° = 60°.<br>Step 2: Distance East = 50 × sin 60° = 50 × 0.8660 = 43.3 km (the angle from South is 60°, and East is opposite that angle).<br>Step 3: Distance South = 50 × cos 60° = 50 × 0.5 = 25 km.<br><strong>Answer: 43.3 km East and 25 km South.</strong></div>\n<h3 class=\"learn-subheading\">4. Bearings with the sine and cosine rules</h3>\n<p class=\"learn-p\">When the triangle is not right-angled, use the rules from Trigonometry I. For a triangle ABC with sides a, b, c opposite the angles A, B, C:</p>\n<ul class=\"learn-list\"><li><span class=\"learn-keyword\">Sine rule:</span> a/sin A = b/sin B = c/sin C. Use it when you know a side and its opposite angle.</li><li><span class=\"learn-keyword\">Cosine rule:</span> a² = b² + c² − 2bc cos A. Use it when you know two sides and the angle between them.</li></ul>\n<p class=\"learn-p\">The key work is to find the angle inside the triangle from the bearings. Draw the North line at each point. Use parallel lines and the back bearing to find the angle at the turning point.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> A ship sails from A to B, 12 km on a bearing of 040°. It then sails from B to C, 9 km on a bearing of 130°. Find (a) the distance AC, (b) the bearing of C from A.<br>(a) Step 1: The back bearing of A from B is 040° + 180° = 220°. The angle ABC is the difference between the bearing of A from B (220°) and the bearing of C from B (130°). So angle ABC = 220° − 130° = 90°.<br>Step 2: Triangle ABC is right-angled at B. AC² = 12² + 9² = 144 + 81 = 225.<br>Step 3: AC = √225 = 15 km.<br>(b) Step 4: In the right-angled triangle, tan(angle BAC) = 9/12 = 0.75, so angle BAC = 36.87°.<br>Step 5: AB is on a bearing of 040°, and C is turned a further 36.87° clockwise from AB. So the bearing of C from A = 40° + 36.87° = 76.87°, which is 077° to the nearest degree.<br><strong>Answer: (a) 15 km, (b) 077°.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> A ship leaves port A and sails 8 km on a bearing of 030° to B. It then sails 5 km on a bearing of 110° to C. Find the distance AC, to 1 decimal place.<br>Step 1: The back bearing of A from B is 030° + 180° = 210°. Angle ABC = 210° − 110° = 100°.<br>Step 2: We know two sides (8 km and 5 km) and the angle between them (100°). Use the cosine rule.<br>Step 3: AC² = 8² + 5² − 2 × 8 × 5 × cos 100° = 64 + 25 − 80 × (−0.1736) = 89 + 13.89 = 102.89.<br>Step 4: AC = √102.89 = 10.1 km.<br><strong>Answer: AC = 10.1 km.</strong> (Note that cos 100° is negative, so we add.)</div>\n<h3 class=\"learn-subheading\">5. Chord and arc properties of a circle</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">chord</span> is a straight line joining two points on a circle. An <span class=\"learn-keyword\">arc</span> is a part of the circumference. The angle at the centre made by the two radii that meet the ends of a chord or arc is the <span class=\"learn-keyword\">angle subtended</span> at the centre. Here are the properties we need:</p>\n<ul class=\"learn-list\"><li>A line from the centre of the circle, perpendicular to a chord, bisects (cuts into two equal halves) the chord.</li><li>The perpendicular from the centre to a chord, the radius, and half the chord form a right-angled triangle. We can use Pythagoras or trigonometry in it.</li><li>Length of arc = (θ/360) × 2πr, where θ is the angle at the centre in degrees and r is the radius.</li><li>Length of chord = 2r sin(θ/2), where θ is the angle at the centre.</li></ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 5:</strong> A chord of length 16 cm is in a circle of radius 10 cm. Find (a) the distance of the chord from the centre, (b) the angle the chord subtends at the centre, (c) the length of the minor arc. (Use π = 22/7.)<br>(a) Step 1: The perpendicular from the centre cuts the chord into two halves of 8 cm. The radius (10 cm) is the hypotenuse.<br>Step 2: Distance² = 10² − 8² = 100 − 64 = 36. Distance = 6 cm.<br>(b) Step 3: In the right-angled triangle, sin(half-angle) = 8/10 = 0.8. Half-angle = 53.13°. The angle at the centre = 2 × 53.13° = 106.26°.<br>(c) Step 4: Arc = (106.26/360) × 2 × (22/7) × 10 = 0.2952 × 62.857 = 18.6 cm.<br><strong>Answer: (a) 6 cm, (b) 106.3°, (c) 18.6 cm.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 6:</strong> The radius of a circle is 10 cm. A chord subtends an angle of 60° at the centre. Find the length of the chord and the length of the minor arc. (Use π = 22/7.)<br>Step 1: The two radii and the chord make a triangle with two equal sides (10 cm) and an angle of 60° between them. The other two angles are equal, and (180° − 60°) ÷ 2 = 60° each. So the triangle is equilateral.<br>Step 2: The chord = 10 cm. (Check: 2 × 10 × sin 30° = 2 × 10 × 0.5 = 10 cm.)<br>Step 3: Arc = (60/360) × 2 × (22/7) × 10 = (1/6) × 62.857 = 10.5 cm.<br><strong>Answer: chord = 10 cm, arc = 10.5 cm.</strong></div>\n<h3 class=\"learn-subheading\">6. Problems on distances and directions</h3>\n<p class=\"learn-p\">For any problem on distances and directions, follow this plan. First, draw a clear sketch with the North line at every point. Second, use bearings and parallel lines to find the angles inside the triangle. Third, choose Pythagoras, SOH-CAH-TOA, the sine rule or the cosine rule. Fourth, give the answer with units and, for a direction, as a three-figure bearing. If the question asks \"how far is X from Y\", the answer is a distance. If it asks \"what is the bearing of X from Y\", the answer is an angle written with three figures.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong> <br>1. Measuring the bearing from the wrong point. \"Bearing of B from A\" starts at A, not B.<br>2. Measuring anticlockwise, or from East or South. Bearings are always clockwise from North.<br>3. Forgetting the back bearing rule, or adding 180° when the bearing is already more than 180°.<br>4. Using the sine rule when only two sides and the included angle are given. Use the cosine rule.<br>5. Writing 45° instead of 045°. A bearing has three figures.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC often says \"A ship sails from P on a bearing of 050° for 20 km to Q, then ... Calculate the distance PR and the bearing of R from P.\" Draw the figure first and mark every angle you find. Write the three-figure bearing in the final answer. For arc and chord questions, check whether the question tells you to use π = 22/7 or π = 3.142.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> <br>• A bearing is measured clockwise from North and written with three figures.<br>• Back bearing: add 180° if less than 180°, subtract 180° if 180° or more.<br>• North = d cos θ and East = d sin θ when θ is the bearing from North (θ below 90°).<br>• Use the sine rule for a side and its opposite angle, and the cosine rule for two sides and the angle between.<br>• A perpendicular from the centre bisects a chord. Arc = (θ/360) × 2πr and chord = 2r sin(θ/2).<br>• Always draw a sketch with North lines first.</div>",
    "questions": [
      {
        "q": "A bearing is always measured",
        "o": [
          "clockwise from the North line",
          "anticlockwise from the North line",
          "clockwise from the East line",
          "anticlockwise from the South line"
        ],
        "a": 0,
        "e": "By convention, bearings start at North and turn clockwise, and they are written with three figures. Measuring anticlockwise gives the wrong angle.",
        "h": "Think of a clock.",
        "yr": "SS2"
      },
      {
        "q": "The bearing of due East is",
        "o": [
          "000°",
          "090°",
          "180°",
          "270°"
        ],
        "a": 1,
        "e": "North is 000°, East is 090°, South is 180° and West is 270°. They go round clockwise.",
        "h": "A quarter turn from North.",
        "yr": "SS2"
      },
      {
        "q": "The bearing of B from A is 065°. The bearing of A from B is",
        "o": [
          "115°",
          "025°",
          "245°",
          "295°"
        ],
        "a": 2,
        "e": "The bearing is less than 180°, so add 180°. 065° + 180° = 245°. Subtracting 65° from 180° (115°) is a common mistake.",
        "h": "Add 180°.",
        "yr": "SS2"
      },
      {
        "q": "The bearing of Q from P is 290°. The bearing of P from Q is",
        "o": [
          "70°",
          "200°",
          "250°",
          "110°"
        ],
        "a": 3,
        "e": "The bearing is more than 180°, so subtract 180°. 290° − 180° = 110°.",
        "h": "Subtract 180°.",
        "yr": "SS2"
      },
      {
        "q": "The compass bearing S 30° W is the same as the three-figure bearing",
        "o": [
          "210°",
          "150°",
          "240°",
          "330°"
        ],
        "a": 0,
        "e": "Start from South (180°) and turn 30° towards West, which is further clockwise. So the bearing is 180° + 30° = 210°.",
        "h": "South is 180°.",
        "yr": "SS2"
      },
      {
        "q": "A ship sails 60 km on a bearing of 030°. How far North has it moved, to 1 decimal place?",
        "o": [
          "30.0 km",
          "52.0 km",
          "34.6 km",
          "60.0 km"
        ],
        "a": 1,
        "e": "The angle from North is 30°, and North is the adjacent side. Distance North = 60 × cos 30° = 60 × 0.8660 = 52.0 km. The value 30.0 km is the distance East (60 × sin 30°).",
        "h": "North uses cosine.",
        "yr": "SS2"
      },
      {
        "q": "A boat travels 40 km on a bearing of 150°. How far East of its start is it?",
        "o": [
          "34.6 km",
          "40 km",
          "20 km",
          "30 km"
        ],
        "a": 2,
        "e": "The angle from the South line is 180° − 150° = 30°. East is opposite that angle, so East = 40 × sin 30° = 40 × 0.5 = 20 km. The distance 34.6 km is the distance South.",
        "h": "Angle from South is 30°.",
        "yr": "SS2"
      },
      {
        "q": "Which rule is used to find the third side of a triangle when two sides and the angle between them are given?",
        "o": [
          "the sine rule",
          "the back bearing rule",
          "the arc rule",
          "the cosine rule"
        ],
        "a": 3,
        "e": "The cosine rule a² = b² + c² − 2bc cos A uses two sides and the angle between them. The sine rule needs a side and its opposite angle.",
        "h": "Two sides plus the angle between.",
        "yr": "SS2"
      },
      {
        "q": "A chord 24 cm long is in a circle of radius 13 cm. The distance of the chord from the centre is",
        "o": [
          "5 cm",
          "11 cm",
          "12 cm",
          "7 cm"
        ],
        "a": 0,
        "e": "The perpendicular from the centre bisects the chord, so half the chord is 12 cm. Distance² = 13² − 12² = 169 − 144 = 25, so the distance is 5 cm.",
        "h": "Half the chord is 12 cm.",
        "yr": "SS2"
      },
      {
        "q": "Using π = 22/7, the length of an arc that subtends 60° at the centre of a circle of radius 21 cm is",
        "o": [
          "44 cm",
          "22 cm",
          "132 cm",
          "11 cm"
        ],
        "a": 1,
        "e": "Arc = (60/360) × 2 × (22/7) × 21 = (1/6) × 132 = 22 cm. The number 132 is the whole circumference, not the arc.",
        "h": "60° is one-sixth of a full turn.",
        "yr": "SS2"
      },
      {
        "q": "A chord subtends 90° at the centre of a circle of radius 5 cm. Its length, to 2 decimal places, is",
        "o": [
          "5.00 cm",
          "10.00 cm",
          "7.07 cm",
          "3.54 cm"
        ],
        "a": 2,
        "e": "The two radii and the chord form a right-angled triangle, so chord² = 5² + 5² = 50. Chord = √50 = 7.07 cm. (Check: 2 × 5 × sin 45° = 7.07.)",
        "h": "Use Pythagoras.",
        "yr": "SS2"
      },
      {
        "q": "A ship sails 6 km due North from A to B. It then sails 8 km due East from B to C. The distance AC is",
        "o": [
          "14 km",
          "2 km",
          "7 km",
          "10 km"
        ],
        "a": 3,
        "e": "Due North and due East meet at a right angle at B. AC² = 6² + 8² = 36 + 64 = 100, so AC = 10 km. Adding 6 + 8 = 14 is wrong.",
        "h": "Right angle at B.",
        "yr": "SS2"
      },
      {
        "q": "For the ship in the last question (6 km due North, then 8 km due East), the bearing of C from A, to the nearest degree, is",
        "o": [
          "053°",
          "037°",
          "127°",
          "143°"
        ],
        "a": 0,
        "e": "Angle BAC has opposite 8 and adjacent 6, so tan θ = 8/6 = 1.333, giving θ = 53.13°. This angle is measured from North, so the bearing is 053°. The value 037° is the angle at C.",
        "h": "tan = East ÷ North.",
        "yr": "SS2"
      },
      {
        "q": "A ship sails 10 km on a bearing of 000° from A to B, then 10 km on a bearing of 060° from B to C. The distance AC, to 1 decimal place, is",
        "o": [
          "14.1 km",
          "17.3 km",
          "20.0 km",
          "10.0 km"
        ],
        "a": 1,
        "e": "The back bearing of A from B is 180°, so angle ABC = 180° − 60° = 120°. By the cosine rule, AC² = 100 + 100 − 2 × 10 × 10 × cos 120° = 200 + 100 = 300. AC = √300 = 17.3 km.",
        "h": "Angle ABC is 120°.",
        "yr": "SS2"
      },
      {
        "q": "A line drawn from the centre of a circle perpendicular to a chord",
        "o": [
          "is longer than the radius",
          "is parallel to the chord",
          "bisects the chord",
          "touches the circle at one point"
        ],
        "a": 2,
        "e": "The perpendicular from the centre cuts the chord into two equal parts. It is shorter than the radius, and it is at right angles to the chord, not parallel.",
        "h": "It cuts the chord in half.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Introduction to Linear Programming",
    "topicCode": "SS2-MATH-16",
    "module": "Linear Programming",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">Every business person must make choices with limited resources. A baker has only so much flour and so many hours at the oven. A farmer has only so much land and so much money for feed. <span class=\"learn-keyword\">Linear programming</span> is a mathematical method for finding the best choice, such as the most profit or the lowest cost, when there are limits. In this topic we learn what linear programming means, how to turn a word problem into mathematical statements (this is called formulation), and where it is used in real life. Think of a \"mama put\" cook in Lagos who must decide how many plates of rice and how many plates of beans to cook with a limited amount of gas and money.</div>\n<h3 class=\"learn-subheading\">1. Meaning of linear programming</h3>\n<p class=\"learn-p\">Linear programming is a method of finding the <span class=\"learn-keyword\">maximum</span> (largest) or the <span class=\"learn-keyword\">minimum</span> (smallest) value of a quantity, when the quantities involved must obey certain limits. It is called \"linear\" because every expression is a straight-line (first-degree) expression. There are no squares, like x², and no products, like xy. The word \"programming\" here means planning.</p>\n<p class=\"learn-p\">Every linear programming problem has these four parts:</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Part</th><th>Meaning</th><th>Example</th></tr></thead><tbody><tr><td>Decision variables</td><td>The unknown amounts we must decide, written as x and y</td><td>x = number of loaves, y = number of cakes</td></tr><tr><td>Objective function</td><td>The quantity we want to make as large as possible (profit) or as small as possible (cost)</td><td>P = 3x + 4y</td></tr><tr><td>Constraints</td><td>The limits or conditions, written as inequalities</td><td>2x + y ≤ 10</td></tr><tr><td>Non-negativity conditions</td><td>The variables cannot be less than zero</td><td>x ≥ 0 and y ≥ 0</td></tr></tbody></table></div>\n<h3 class=\"learn-subheading\">2. Inequalities: the language of limits</h3>\n<p class=\"learn-p\">A constraint is an <span class=\"learn-keyword\">inequality</span>. It compares two quantities using one of these signs:</p>\n<ul class=\"learn-list\"><li>&lt; means \"is less than\"</li><li>&gt; means \"is greater than\"</li><li>≤ means \"is less than or equal to\" (at most, not more than, maximum of)</li><li>≥ means \"is greater than or equal to\" (at least, not less than, minimum of)</li></ul>\n<p class=\"learn-p\">Learn to change words into signs. \"At most 10 kg\" gives ≤ 10. \"At least 12 units\" gives ≥ 12. \"Not more than 25 items\" gives ≤ 25. \"Not less than 5\" gives ≥ 5. \"A maximum of 8 hours\" gives ≤ 8.</p>\n<h3 class=\"learn-subheading\">3. How to formulate a problem</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Formulation</span> means writing the problem in mathematical form. Follow these steps:</p>\n<ol class=\"learn-ordered\"><li>Step 1: Read the problem carefully. Find what must be decided. Let x and y stand for these amounts. Write down clearly what x and y mean.</li><li>Step 2: Find the quantity to be maximised or minimised (profit, cost, and so on). Write it as an objective function using x and y.</li><li>Step 3: For each limited resource (money, time, materials, space), write an inequality. It is helpful to organise the facts in a table first.</li><li>Step 4: Write the non-negativity conditions x ≥ 0 and y ≥ 0, because we cannot make a negative number of things.</li></ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> A baker makes two kinds of products: batches of bread and batches of cake. A batch of bread uses 2 kg of flour and 1 hour of oven time. A batch of cake uses 1 kg of flour and 2 hours of oven time. Each day the baker has 10 kg of flour and 8 hours of oven time. The profit is ₦3,000 on a batch of bread and ₦4,000 on a batch of cake. Formulate the problem.<br>Step 1: Let x = number of batches of bread and y = number of batches of cake.<br>Step 2: Organise the facts in a table: Bread needs 2 kg flour and 1 hour. Cake needs 1 kg flour and 2 hours. Available: 10 kg and 8 hours.<br>Step 3: Flour: 2x + y ≤ 10. Oven time: x + 2y ≤ 8.<br>Step 4: Non-negativity: x ≥ 0, y ≥ 0.<br>Step 5: Objective function: maximise P = 3000x + 4000y.<br><strong>Answer: Maximise P = 3000x + 4000y subject to 2x + y ≤ 10, x + 2y ≤ 8, x ≥ 0, y ≥ 0.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> A tailor makes shirts and trousers. A shirt needs 2 m of cloth and a pair of trousers needs 3 m of cloth. The tailor has 60 m of cloth and can make at most 25 items in a week. The profit is ₦1,500 on a shirt and ₦2,000 on a pair of trousers. Formulate the problem.<br>Step 1: Let x = number of shirts and y = number of pairs of trousers.<br>Step 2: Cloth: 2x + 3y ≤ 60.<br>Step 3: Number of items: x + y ≤ 25.<br>Step 4: Non-negativity: x ≥ 0, y ≥ 0.<br>Step 5: Objective function: maximise P = 1500x + 2000y.<br><strong>Answer: Maximise P = 1500x + 2000y subject to 2x + 3y ≤ 60, x + y ≤ 25, x ≥ 0, y ≥ 0.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3 (minimising cost):</strong> A poultry farmer mixes two types of feed, A and B. A bag of A contains 3 units of protein and 1 unit of vitamins. A bag of B contains 1 unit of protein and 2 units of vitamins. Each day the birds need at least 12 units of protein and at least 9 units of vitamins. A bag of A costs ₦2,000 and a bag of B costs ₦3,000. Formulate the problem.<br>Step 1: Let x = number of bags of A and y = number of bags of B.<br>Step 2: Protein (at least 12): 3x + y ≥ 12.<br>Step 3: Vitamins (at least 9): x + 2y ≥ 9.<br>Step 4: Non-negativity: x ≥ 0, y ≥ 0.<br>Step 5: Objective function: minimise C = 2000x + 3000y.<br><strong>Answer: Minimise C = 2000x + 3000y subject to 3x + y ≥ 12, x + 2y ≥ 9, x ≥ 0, y ≥ 0.</strong></div>\n<p class=\"learn-p\">Notice that in this example the signs are ≥, because the birds need AT LEAST a certain amount. In Examples 1 and 2 the signs are ≤, because resources are limited.</p>\n<h3 class=\"learn-subheading\">4. Feasible solutions and the best solution</h3>\n<p class=\"learn-p\">A pair of values (x, y) that satisfies ALL the constraints is called a <span class=\"learn-keyword\">feasible solution</span>. The set of all feasible solutions is the <span class=\"learn-keyword\">feasible region</span>. On a graph, we draw each constraint as a boundary line and shade the part that satisfies it. The feasible region is the part where all the conditions are true together. The best feasible solution, which gives the largest profit or the smallest cost, is called the <span class=\"learn-keyword\">optimal solution</span>.</p>\n<p class=\"learn-p\">To test if a point is feasible, put its values into every constraint. If even one constraint is false, the point is not feasible.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> In Worked Example 1, is (4, 2) feasible? Is (3, 3) feasible?<br>Test (4, 2): Flour 2(4) + 2 = 10 ≤ 10, true. Oven time 4 + 2(2) = 8 ≤ 8, true. Also 4 ≥ 0 and 2 ≥ 0. So (4, 2) is feasible.<br>Test (3, 3): Flour 2(3) + 3 = 9 ≤ 10, true. Oven time 3 + 2(3) = 9 ≤ 8, FALSE. So (3, 3) is not feasible.<br><strong>Answer: (4, 2) is feasible; (3, 3) is not feasible.</strong></div>\n<p class=\"learn-p\">A very important fact: for a linear programming problem, the best value of the objective function is always found at a <span class=\"learn-keyword\">corner point</span> (vertex) of the feasible region. So after drawing the graph, we find the coordinates of the corners and put each one into the objective function. We shall study this graphical method fully later. Here is a short preview using Worked Example 1. The corners of its feasible region are (0, 0), (5, 0), (0, 4) and (4, 2). The point (4, 2) comes from solving 2x + y = 10 and x + 2y = 8 together.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Corner (x, y)</th><th>P = 3000x + 4000y</th></tr></thead><tbody><tr><td>(0, 0)</td><td>₦0</td></tr><tr><td>(5, 0)</td><td>3000 × 5 = ₦15,000</td></tr><tr><td>(0, 4)</td><td>4000 × 4 = ₦16,000</td></tr><tr><td>(4, 2)</td><td>3000 × 4 + 4000 × 2 = 12,000 + 8,000 = ₦20,000</td></tr></tbody></table></div>\n<p class=\"learn-p\">The largest profit is ₦20,000, when the baker makes 4 batches of bread and 2 batches of cake. The decision is now clear.</p>\n<h3 class=\"learn-subheading\">5. Real-life applications</h3>\n<p class=\"learn-p\">Linear programming is used by many people and organisations to make the best use of limited resources:</p>\n<ul class=\"learn-list\"><li><strong>Manufacturing and trade:</strong> deciding how many of each product to make to get the highest profit, such as bakeries, tailors, soap and garri producers.</li><li><strong>Farming:</strong> deciding how much land to use for each crop, or how to mix animal feeds at the lowest cost.</li><li><strong>Transport:</strong> planning routes and the number of buses or lorries to use so that the cost of moving goods is lowest.</li><li><strong>Diet and health:</strong> choosing foods that give the needed nutrients at the lowest price.</li><li><strong>Schools and offices:</strong> arranging timetables, classrooms and staff.</li><li><strong>Government and the oil industry:</strong> sharing limited resources among competing needs.</li></ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes:</strong> <br>1. Using the wrong inequality sign. \"At most\" and \"not more than\" mean ≤. \"At least\" and \"not less than\" mean ≥.<br>2. Forgetting to write x ≥ 0 and y ≥ 0. These conditions are part of the formulation and carry marks.<br>3. Not saying clearly what x and y stand for. Always begin with \"Let x = ... and y = ...\".<br>4. Mixing units, such as hours in one place and minutes in another. Use the same unit for every item.<br>5. Putting the profit or cost into a constraint. The objective function is a separate expression.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip:</strong> WAEC and NECO often ask: \"Write down the inequalities that represent the above information\" or \"Formulate the problem\". Start with \"Let x = ... and y = ...\", use a small table when there are many numbers, and write each inequality on its own line. Then write the objective function. If asked for the maximum or minimum, test the corner points of the feasible region.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary:</strong> <br>• Linear programming finds the best (maximum or minimum) value of a quantity under given limits.<br>• Its parts are decision variables, objective function, constraints and non-negativity conditions.<br>• \"At most\" means ≤ and \"at least\" means ≥.<br>• To formulate, define x and y, write the constraints, write x ≥ 0 and y ≥ 0, then write the objective function.<br>• A feasible solution satisfies all constraints. The best one is the optimal solution.<br>• The optimal value is found at a corner point of the feasible region.</div>",
    "questions": [
      {
        "q": "Linear programming is a method of",
        "o": [
          "finding the maximum or minimum value of a quantity under given limits",
          "solving only quadratic equations",
          "drawing circles and chords",
          "measuring angles of elevation"
        ],
        "a": 0,
        "e": "Linear programming helps us find the best (largest or smallest) value of something, such as profit or cost, when there are limits on the resources. It uses straight-line (linear) expressions.",
        "h": "Best choice with limits.",
        "yr": "SS2"
      },
      {
        "q": "The phrase 'not more than 25 items' is written as",
        "o": [
          "x + y ≥ 25",
          "x + y ≤ 25",
          "x + y > 25",
          "x + y = 25 only"
        ],
        "a": 1,
        "e": "'Not more than' means at most, which is ≤. The sign ≥ would mean at least 25 items.",
        "h": "At most.",
        "yr": "SS2"
      },
      {
        "q": "The phrase 'at least 12 units of protein' is written as",
        "o": [
          "protein ≤ 12",
          "protein < 12",
          "protein ≥ 12",
          "protein = 0"
        ],
        "a": 2,
        "e": "'At least' means the amount can be 12 or more, which is ≥. The sign ≤ would mean 12 or less.",
        "h": "12 or more.",
        "yr": "SS2"
      },
      {
        "q": "In linear programming, the objective function is",
        "o": [
          "a list of the limits on the resources",
          "the set of all feasible points",
          "the condition x ≥ 0",
          "the expression to be maximised or minimised"
        ],
        "a": 3,
        "e": "The objective function is the quantity, such as profit or cost, which we want to make as large or as small as possible. The limits are the constraints.",
        "h": "Profit or cost.",
        "yr": "SS2"
      },
      {
        "q": "Why do we write x ≥ 0 and y ≥ 0 in a formulation?",
        "o": [
          "because we cannot make a negative number of items",
          "because profit must be zero",
          "because the constraints are equal to zero",
          "because x and y must be equal"
        ],
        "a": 0,
        "e": "These non-negativity conditions are needed because the amounts of products, bags or hours cannot be less than zero.",
        "h": "Can you make −3 loaves?",
        "yr": "SS2"
      },
      {
        "q": "Which of these is NOT allowed in a linear programming constraint?",
        "o": [
          "2x + y ≤ 10",
          "x² + y ≤ 5",
          "x + 3y ≥ 6",
          "x ≤ 4"
        ],
        "a": 1,
        "e": "Linear expressions are first-degree only. The term x² is a square, so x² + y ≤ 5 is not linear.",
        "h": "Look for a power.",
        "yr": "SS2"
      },
      {
        "q": "A farmer keeps x cows and y goats. He can keep at most 30 animals. This is written as",
        "o": [
          "x + y ≥ 30",
          "x + y ≤ 30 only if x = y",
          "x + y ≤ 30",
          "xy ≤ 30"
        ],
        "a": 2,
        "e": "The total number of animals is x + y, and 'at most 30' means ≤ 30. The product xy is wrong because we add the numbers of animals.",
        "h": "Add, then use ≤.",
        "yr": "SS2"
      },
      {
        "q": "A shop owner buys x pens at ₦50 each and y books at ₦200 each. She can spend at most ₦2,000. The constraint is",
        "o": [
          "50x + 200y ≤ 2000",
          "50x + 200y ≥ 2000",
          "200x + 50y ≤ 2000",
          "x + y ≤ 2000"
        ],
        "a": 0,
        "e": "The money spent on pens is 50x and on books is 200y. The total cost must not be more than ₦2,000, so 50x + 200y ≤ 2000. Swapping the prices (200x + 50y) is wrong.",
        "h": "Price × quantity.",
        "yr": "SS2"
      },
      {
        "q": "The constraints are x + y ≤ 6, 2x + y ≤ 8, x ≥ 0 and y ≥ 0. Which point is feasible?",
        "o": [
          "(4, 3)",
          "(2, 4)",
          "(5, 1)",
          "(1, 6)"
        ],
        "a": 1,
        "e": "For (2, 4): 2 + 4 = 6 ≤ 6 and 2(2) + 4 = 8 ≤ 8, so it is feasible. (4, 3) gives 7 ≤ 6, which is false. (5, 1) gives 2(5) + 1 = 11 ≤ 8, which is false. (1, 6) gives 7 ≤ 6, which is false.",
        "h": "Test every constraint.",
        "yr": "SS2"
      },
      {
        "q": "The profit is P = 200x + 300y naira. What is the profit at the point (3, 5)?",
        "o": [
          "₦1,100",
          "₦1,800",
          "₦2,100",
          "₦1,500"
        ],
        "a": 2,
        "e": "P = 200(3) + 300(5) = 600 + 1,500 = ₦2,100. The value ₦1,500 is only the profit from y.",
        "h": "Substitute x = 3, y = 5.",
        "yr": "SS2"
      },
      {
        "q": "The corner points of a feasible region are (0, 0), (4, 0), (2, 2) and (0, 3). The maximum value of P = 2x + 3y is",
        "o": [
          "8",
          "9",
          "13",
          "10"
        ],
        "a": 3,
        "e": "At (0, 0): 0. At (4, 0): 8. At (2, 2): 4 + 6 = 10. At (0, 3): 9. The largest value is 10, at (2, 2).",
        "h": "Test all four corners.",
        "yr": "SS2"
      },
      {
        "q": "The corner points of a feasible region are (0, 12), (3, 3) and (9, 0). The minimum value of C = 2000x + 3000y is",
        "o": [
          "₦15,000",
          "₦18,000",
          "₦36,000",
          "₦12,000"
        ],
        "a": 0,
        "e": "At (0, 12): 36,000. At (3, 3): 6,000 + 9,000 = 15,000. At (9, 0): 18,000. The smallest value is ₦15,000.",
        "h": "Pick the smallest.",
        "yr": "SS2"
      },
      {
        "q": "A tailor makes x shirts and y pairs of trousers. A shirt needs 2 m of cloth and a pair of trousers needs 3 m. He has 60 m of cloth. The constraint is",
        "o": [
          "3x + 2y ≤ 60",
          "2x + 3y ≤ 60",
          "2x + 3y ≥ 60",
          "5xy ≤ 60"
        ],
        "a": 1,
        "e": "The cloth used is 2x for shirts plus 3y for trousers, and it cannot be more than 60 m. So 2x + 3y ≤ 60. Swapping the numbers (3x + 2y) gives the wrong amounts.",
        "h": "Cloth per item × number of items.",
        "yr": "SS2"
      },
      {
        "q": "A diet must contain not less than 60 units of vitamins. Rice gives 4 units per kg and beans give 5 units per kg. If x kg of rice and y kg of beans are used, the constraint is",
        "o": [
          "4x + 5y ≤ 60",
          "5x + 4y ≥ 60",
          "4x + 5y ≥ 60",
          "4x + 5y = 0"
        ],
        "a": 2,
        "e": "The vitamins are 4x + 5y. 'Not less than 60' means at least 60, so the sign is ≥. Using ≤ would mean at most 60.",
        "h": "Not less than.",
        "yr": "SS2"
      },
      {
        "q": "The best value of the objective function in a linear programming problem is found at",
        "o": [
          "the middle of the feasible region",
          "any point outside the feasible region",
          "the origin only",
          "a corner point of the feasible region"
        ],
        "a": 3,
        "e": "For linear problems the maximum or minimum always occurs at a vertex (corner point) of the feasible region. We test each corner in the objective function.",
        "h": "Think of corners.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Linear Programming Graphical Solutions",
    "topicCode": "SS2-MATH-17",
    "module": "Linear Programming",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\"><span class=\"learn-keyword\">Linear programming</span> is a method for making the best choice when you have limits. A baker in Ikeja has only so much flour and so many hours in a day. She must decide how many loaves of bread and how many cakes to bake to earn the most money. We write the limits as <span class=\"learn-keyword\">inequalities</span>, draw them on a graph, and find the best answer from the shaded area. Businesses, farms and factories use this idea every day to save money or to increase profit.</div>\n<h3 class=\"learn-subheading\">1. Inequalities: the idea</h3>\n<p class=\"learn-p\">An <span class=\"learn-keyword\">inequality</span> compares two quantities that are not necessarily equal. We use these signs:</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Sign</th><th>Meaning</th><th>Example</th></tr></thead><tbody>\n<tr><td>&lt;</td><td>less than</td><td>x &lt; 5 (x can be 4, 3, 0 …, but not 5)</td></tr>\n<tr><td>&gt;</td><td>greater than</td><td>y &gt; 2</td></tr>\n<tr><td>≤</td><td>less than or equal to</td><td>x + y ≤ 10 (can equal 10)</td></tr>\n<tr><td>≥</td><td>greater than or equal to</td><td>x ≥ 1 (can equal 1)</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Words in a problem turn into signs. \"At most\", \"not more than\" and \"maximum\" mean ≤. \"At least\", \"not less than\" and \"minimum\" mean ≥. For example, \"a trader buys at most 10 bags in total of rice (x) and beans (y)\" becomes x + y ≤ 10.</p>\n<h3 class=\"learn-subheading\">2. Drawing the boundary line</h3>\n<p class=\"learn-p\">Every inequality has a <span class=\"learn-keyword\">boundary line</span>. You get it by replacing the inequality sign with an equals sign. For 2x + y ≤ 8 the boundary line is 2x + y = 8.</p>\n<p class=\"learn-p\">The easiest way to draw a line is to find its two <span class=\"learn-keyword\">intercepts</span>, the points where it cuts the axes.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Put x = 0 and find y. This is where the line cuts the y-axis.</li>\n<li>Step 2: Put y = 0 and find x. This is where the line cuts the x-axis.</li>\n<li>Step 3: Plot the two points and join them with a ruler.</li>\n</ol>\n<p class=\"learn-p\">For 2x + y = 8: when x = 0, y = 8, so the point is (0, 8). When y = 0, 2x = 8, so x = 4, and the point is (4, 0).</p>\n<p class=\"learn-p\">Now choose the kind of line. If the sign is ≤ or ≥, the points on the line are allowed, so draw a <span class=\"learn-keyword\">solid line</span>. If the sign is &lt; or &gt;, the points on the line are not allowed, so draw a <span class=\"learn-keyword\">dashed (broken) line</span>.</p>\n<p class=\"learn-p\">Special lines: x = 3 is a vertical line through 3 on the x-axis. y = 2 is a horizontal line through 2 on the y-axis.</p>\n<h3 class=\"learn-subheading\">3. Deciding which side to shade: the test point</h3>\n<p class=\"learn-p\">A line cuts the graph paper into two sides. Only one side satisfies the inequality. To find it, use a <span class=\"learn-keyword\">test point</span>. The origin (0, 0) is the easiest, provided the line does not pass through it.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Put the coordinates of the test point into the inequality.</li>\n<li>Step 2: If the statement is true, shade the side containing the test point.</li>\n<li>Step 3: If it is false, shade the other side.</li>\n</ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Show on a graph the region 2x + y ≤ 8.<br>Boundary line: 2x + y = 8. If x = 0, y = 8, giving (0, 8). If y = 0, x = 4, giving (4, 0).<br>The sign is ≤, so draw a solid line through (0, 8) and (4, 0).<br>Test (0, 0): 2(0) + 0 = 0, and 0 ≤ 8 is true.<br>So shade the side of the line that contains the origin. Every point there, such as (1, 1) (2 + 1 = 3 ≤ 8), satisfies the inequality.</div>\n<p class=\"learn-p\">Tip: when the inequality is written as y ≥ (something) or y ≤ (something), you can also remember that ≥ means shade above the line and ≤ means shade below the line. The test point method always works, so use it when unsure.</p>\n<h3 class=\"learn-subheading\">4. Several inequalities together: the feasible region</h3>\n<p class=\"learn-p\">A real problem has many limits at the same time. We draw all the lines on one graph. Each inequality is satisfied on one side of its line. The part of the graph that satisfies ALL the inequalities together is the <span class=\"learn-keyword\">feasible region</span>. \"Feasible\" means \"possible\". Any point inside it, or on its edge, is a possible choice.</p>\n<p class=\"learn-p\">A good habit is to shade the side that is NOT wanted, so that the feasible region is left clean and unshaded. Either way, label it clearly (write R).</p>\n<p class=\"learn-p\">Almost every problem has two <span class=\"learn-keyword\">non-negativity conditions</span>: x ≥ 0 and y ≥ 0. They say we cannot make a negative number of items. They keep the feasible region in the first quadrant, where both x and y are positive or zero.</p>\n<p class=\"learn-p\">The corners of the feasible region are called <span class=\"learn-keyword\">vertices</span>. We find each vertex by reading the graph or by solving the equations of the two lines that meet there. For example, x + y = 10 and x = 6 meet where x = 6 and y = 10 − 6 = 4, so the vertex is (6, 4).</p>\n<p class=\"learn-p\">Sometimes the lines give no common region at all. For example x + y ≤ 6 and x + y ≥ 8 cannot both be true, so there is no feasible region and the problem has no solution.</p>\n<h3 class=\"learn-subheading\">5. The objective function and the best answer</h3>\n<p class=\"learn-p\">The quantity we want to make as large as possible (such as profit) or as small as possible (such as cost) is called the <span class=\"learn-keyword\">objective function</span>. For example, P = 50x + 40y means each loaf (x) gives ₦50 profit and each cake (y) gives ₦40 profit.</p>\n<p class=\"learn-p\">The key fact is this: the maximum or minimum value of the objective function always happens at a vertex (corner) of the feasible region. So we do not need to test every point. We only test the vertices.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Let x and y stand for the two things to be decided.</li>\n<li>Step 2: Write each limit as an inequality (include x ≥ 0 and y ≥ 0).</li>\n<li>Step 3: Draw the lines and shade to find the feasible region.</li>\n<li>Step 4: Write down the coordinates of every vertex.</li>\n<li>Step 5: Put each vertex into the objective function.</li>\n<li>Step 6: Choose the largest value (for a maximum) or the smallest (for a minimum). State the answer in words with units.</li>\n</ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> A baker makes x loaves and y cakes a day. She can make at most 10 items in total, at most 6 loaves, and at most 7 cakes. Profit is P = 50x + 40y naira. Find the number of each that gives the greatest profit.<br>Inequalities: x + y ≤ 10, x ≤ 6, y ≤ 7, x ≥ 0, y ≥ 0.<br>Vertices of the feasible region: (0, 0), (6, 0), (6, 4), (3, 7), (0, 7). (Check: (6, 4) is where x = 6 meets x + y = 10, and (3, 7) is where y = 7 meets x + y = 10.)<br>P at (0, 0) = 0<br>P at (6, 0) = 50(6) + 40(0) = ₦300<br>P at (6, 4) = 50(6) + 40(4) = 300 + 160 = ₦460<br>P at (3, 7) = 50(3) + 40(7) = 150 + 280 = ₦430<br>P at (0, 7) = 40(7) = ₦280<br>The greatest value is ₦460 at (6, 4).<br><strong>Answer: 6 loaves and 4 cakes, giving a maximum profit of ₦460.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> A school feeds pupils with two foods, x packs of rice and y packs of beans. The conditions are: x + y ≥ 4, 1 ≤ x ≤ 5 and 1 ≤ y ≤ 5. The cost in naira (hundreds) is C = 3x + 2y. Find the minimum cost.<br>The region is bounded by x + y = 4 on one side and the lines x = 1, x = 5, y = 1, y = 5.<br>Vertices: (1, 3) (where x = 1 meets x + y = 4), (3, 1) (where y = 1 meets x + y = 4), (1, 5), (5, 1), (5, 5).<br>C at (1, 3) = 3(1) + 2(3) = 9<br>C at (3, 1) = 3(3) + 2(1) = 11<br>C at (1, 5) = 3 + 10 = 13<br>C at (5, 1) = 15 + 2 = 17<br>C at (5, 5) = 15 + 10 = 25<br>The smallest value is 9 at (1, 3).<br><strong>Answer: 1 pack of rice and 3 packs of beans, with a minimum cost of 9 (hundreds of naira) = ₦900.</strong></div>\n<h3 class=\"learn-subheading\">6. Translating a word problem into inequalities</h3>\n<p class=\"learn-p\">This is the step students find hardest, so go slowly. Read the problem, decide what x and y are, and then handle each sentence one by one.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Sentence in the problem</th><th>Inequality</th></tr></thead><tbody>\n<tr><td>The total number of items is not more than 20</td><td>x + y ≤ 20</td></tr>\n<tr><td>At least 5 of the first item are needed</td><td>x ≥ 5</td></tr>\n<tr><td>The second item is at most 8</td><td>y ≤ 8</td></tr>\n<tr><td>The first item is at least twice the second</td><td>x ≥ 2y</td></tr>\n<tr><td>Total is at least 12</td><td>x + y ≥ 12</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Always check your inequality with a simple number from the story before you draw.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> <ul class=\"learn-list\">\n<li>Using a solid line for &lt; or &gt;, or a dashed line for ≤ or ≥. Remember: solid line means the line is included.</li>\n<li>Shading the wrong side. Always test a point such as (0, 0). Do not guess.</li>\n<li>Forgetting x ≥ 0 and y ≥ 0, so the region wrongly goes into other quadrants.</li>\n<li>Testing only some vertices, or choosing the largest value when the question asks for the minimum. Read the question again before you answer.</li>\n</ul>\n</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC often says: \"Represent the inequalities on a graph and shade the region which satisfies all of them\" or \"Find the maximum value of …\". Show the table of vertices and the value of the objective function at each one; marks are given for each step. Use a sharp pencil and a ruler, label every line, and mark the feasible region clearly. Write a final sentence that answers the question in words, with units.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> <ul class=\"learn-list\">\n<li>An inequality compares quantities using &lt;, &gt;, ≤, ≥.</li>\n<li>Draw the boundary line (replace the sign with =); solid for ≤ or ≥, dashed for &lt; or &gt;.</li>\n<li>Use a test point such as (0, 0) to decide which side to shade.</li>\n<li>The feasible region satisfies all inequalities at once.</li>\n<li>The objective function is what we maximise or minimise.</li>\n<li>The best value is found at a vertex of the feasible region, so test every vertex.</li>\n</ul>\n</div>",
    "questions": [
      {
        "q": "The boundary line of the inequality 3x + 2y ≤ 12 cuts the x-axis at",
        "o": [
          "(4, 0)",
          "(6, 0)",
          "(12, 0)",
          "(2, 0)"
        ],
        "a": 0,
        "e": "On the x-axis y = 0, so 3x = 12 and x = 4. The point is (4, 0). The point (6, 0) is the y-intercept value 6 written the wrong way round: when x = 0, 2y = 12 and y = 6.",
        "h": "Put y = 0 into 3x + 2y = 12.",
        "yr": "SS2"
      },
      {
        "q": "A dashed boundary line is drawn when the inequality sign is",
        "o": [
          "≤ or ≥",
          "< or >",
          "= only",
          "≤ and ≥ together"
        ],
        "a": 1,
        "e": "With < or > the points on the line itself are not allowed, so the line is drawn dashed. With ≤ or ≥ the points on the line are included, so it is drawn solid.",
        "h": "Think about whether points ON the line are allowed.",
        "yr": "SS2"
      },
      {
        "q": "In linear programming, the feasible region is",
        "o": [
          "the region where only one inequality is satisfied",
          "the line with the largest value",
          "the region where all the inequalities are satisfied together",
          "the region outside all the lines"
        ],
        "a": 2,
        "e": "Each inequality is true on one side of its line. The feasible region is the overlap of all of those sides. A single inequality alone does not make the region, which is why the second option is wrong.",
        "h": "\"Feasible\" means possible under every condition.",
        "yr": "SS2"
      },
      {
        "q": "To graph x + y ≥ 3, the test point (0, 0) gives 0 ≥ 3, which is false. You should therefore shade",
        "o": [
          "the side that contains the origin",
          "the line only",
          "both sides of the line",
          "the side of the line that does not contain the origin"
        ],
        "a": 3,
        "e": "A false result means the test point does not satisfy the inequality, so its side is not wanted. We shade the other side of the line instead.",
        "h": "False means the origin is on the wrong side.",
        "yr": "SS2"
      },
      {
        "q": "The conditions x ≥ 0 and y ≥ 0 in a linear programming problem mean that",
        "o": [
          "x and y must both be equal to zero",
          "the quantities cannot be negative, so the region is in the first quadrant",
          "the region must lie below the x-axis",
          "the objective function is zero"
        ],
        "a": 1,
        "e": "x and y stand for numbers of items, which cannot be negative. Therefore the feasible region lies where x and y are zero or positive, the first quadrant.",
        "h": "Can you make −3 loaves of bread?",
        "yr": "SS2"
      },
      {
        "q": "A trader buys x bags of rice and y bags of beans. She buys at most 10 bags in total. This is written as",
        "o": [
          "x + y ≥ 10",
          "x + y = 10",
          "x + y ≤ 10",
          "x − y ≤ 10"
        ],
        "a": 2,
        "e": "\"At most\" means the total cannot be more than 10, so we use ≤. \"At least\" would be ≥, and \"exactly\" would be =.",
        "h": "\"At most\" means 10 is the upper limit.",
        "yr": "SS2"
      },
      {
        "q": "Which of these points lies in the region x + y ≤ 8, x ≥ 1, y ≤ 4?",
        "o": [
          "(1, 8)",
          "(9, 0)",
          "(0, 2)",
          "(3, 4)"
        ],
        "a": 3,
        "e": "For (3, 4): 3 + 4 = 7 ≤ 8, 3 ≥ 1 and 4 ≤ 4, so all three conditions hold. (1, 8) fails y ≤ 4. (9, 0) fails x + y ≤ 8. (0, 2) fails x ≥ 1.",
        "h": "Check each point in all three inequalities.",
        "yr": "SS2"
      },
      {
        "q": "The maximum or minimum value of an objective function over a feasible region occurs at",
        "o": [
          "a vertex (corner) of the region",
          "the middle of the region",
          "the origin always",
          "any point on the x-axis"
        ],
        "a": 0,
        "e": "For a linear objective function the best value is always reached at a corner of the feasible region. That is why we only test the vertices instead of every point.",
        "h": "Where are the \"sharp points\" of the region?",
        "yr": "SS2"
      },
      {
        "q": "The solid line passes through (0, 4) and (4, 0), and the region containing the origin is shaded. The inequality shown is",
        "o": [
          "x + y ≥ 4",
          "x + y < 4",
          "x + y ≤ 4",
          "x − y ≤ 4"
        ],
        "a": 2,
        "e": "The line is x + y = 4. It is solid, so the sign includes equals. The origin gives 0 + 0 = 0 ≤ 4, which is true, so the shaded side is ≤. The option x + y < 4 would need a dashed line.",
        "h": "Check the line type and test the origin.",
        "yr": "SS2"
      },
      {
        "q": "The feasible region has vertices (0, 0), (4, 0), (4, 1), (2, 3) and (0, 3). The maximum value of P = 3x + 2y is",
        "o": [
          "12",
          "16",
          "6",
          "14"
        ],
        "a": 3,
        "e": "P at the vertices: 0, 12, 3(4) + 2(1) = 14, 3(2) + 2(3) = 12, and 6. The greatest is 14 at (4, 1). Choosing 12 means missing the vertex (4, 1). The value 16 would come from (4, 2), which is not a vertex.",
        "h": "Put each vertex into 3x + 2y.",
        "yr": "SS2"
      },
      {
        "q": "The vertices of a feasible region are (1, 6), (3, 2) and (6, 1). The minimum value of C = 2x + 5y is",
        "o": [
          "16",
          "17",
          "32",
          "11"
        ],
        "a": 0,
        "e": "C at (1, 6) = 2 + 30 = 32. C at (3, 2) = 6 + 10 = 16. C at (6, 1) = 12 + 5 = 17. The smallest is 16. The value 17 is only the second smallest.",
        "h": "Compute C at all three vertices, then pick the smallest.",
        "yr": "SS2"
      },
      {
        "q": "The lines x + y = 9 and x − y = 1 meet at the point",
        "o": [
          "(4, 5)",
          "(5, 4)",
          "(5, 5)",
          "(8, 1)"
        ],
        "a": 1,
        "e": "Add the equations: 2x = 10, so x = 5. Then y = 9 − 5 = 4. The point is (5, 4). Check in the second equation: 5 − 4 = 1. The point (4, 5) has the numbers in the wrong order.",
        "h": "Add the two equations to remove y.",
        "yr": "SS2"
      },
      {
        "q": "A shop must sell at least 15 items in total, x shirts and y trousers. The inequality is",
        "o": [
          "x + y ≤ 15",
          "x + y < 15",
          "x + y = 15",
          "x + y ≥ 15"
        ],
        "a": 3,
        "e": "\"At least 15\" means 15 or more, so we use ≥. The sign ≤ would mean \"at most 15\", the opposite meaning.",
        "h": "\"At least\" means 15 is the smallest allowed total.",
        "yr": "SS2"
      },
      {
        "q": "The inequalities x + y ≤ 6 and x + y ≥ 8 are drawn on the same graph. The feasible region is",
        "o": [
          "empty, because no point satisfies both",
          "the strip between the two lines",
          "the region below x + y = 6",
          "the whole first quadrant"
        ],
        "a": 0,
        "e": "A number cannot be at most 6 and at least 8 at the same time. So no point satisfies both, and there is no feasible region. The strip between the lines is satisfied by neither inequality.",
        "h": "Can a sum be ≤ 6 and ≥ 8 together?",
        "yr": "SS2"
      },
      {
        "q": "A feasible region has vertices (0, 0), (5, 0), (5, 3), (2, 6) and (0, 6). The profit is P = 40x + 30y naira. The maximum profit is",
        "o": [
          "₦260",
          "₦290",
          "₦300",
          "₦200"
        ],
        "a": 1,
        "e": "P at the vertices: 0, 200, 40(5) + 30(3) = 290, 40(2) + 30(6) = 260, and 180. The greatest is ₦290 at (5, 3). Taking ₦260 means choosing (2, 6) without checking (5, 3).",
        "h": "Calculate P at every vertex.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Bearings",
    "topicCode": "SS2-MATH-18",
    "module": "Bearings, Heights and Distances",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">A <span class=\"learn-keyword\">bearing</span> tells you the direction of one place from another. Pilots, ship captains, soldiers, surveyors and even hunters use bearings so that they do not get lost. Imagine a danfo driver at Oshodi who must tell a new driver how to reach Ikeja. He can say \"go towards the north-east\". A bearing makes that instruction exact by using an angle. In this lesson you will learn the compass points, the two ways of writing a bearing, how to change from one to the other, and how to solve navigation problems.</div>\n<h3 class=\"learn-subheading\">1. What is a bearing?</h3>\n<p class=\"learn-p\">A bearing is the angle measured from the <span class=\"learn-keyword\">North line</span> to the line joining two places. The North line is an imaginary line that points to the north. Every bearing follows three rules:</p>\n<ol class=\"learn-ordered\">\n<li>Rule 1: Start from the North line at the place you are measuring FROM.</li>\n<li>Rule 2: Measure the angle in the clockwise direction (the same way the hands of a clock move) for a three-digit bearing.</li>\n<li>Rule 3: Say or write the place you are going TO and the place you are coming FROM in the correct order.</li>\n</ol>\n<p class=\"learn-p\">\"The bearing of B from A\" means: stand at A, face north, and turn until you face B. The words after \"from\" tell you where to stand. Many mistakes come from standing at the wrong place.</p>\n<h3 class=\"learn-subheading\">2. The compass points</h3>\n<p class=\"learn-p\">The four main directions are called the <span class=\"learn-keyword\">cardinal points</span>: North (N), East (E), South (S) and West (W). They are 90° apart. Between them are the in-between points North-East (NE), South-East (SE), South-West (SW) and North-West (NW). Their three-digit bearings are shown below.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Direction</th><th>Three-digit bearing</th></tr></thead><tbody>\n<tr><td>North (N)</td><td>000°</td></tr>\n<tr><td>North-East (NE)</td><td>045°</td></tr>\n<tr><td>East (E)</td><td>090°</td></tr>\n<tr><td>South-East (SE)</td><td>135°</td></tr>\n<tr><td>South (S)</td><td>180°</td></tr>\n<tr><td>South-West (SW)</td><td>225°</td></tr>\n<tr><td>West (W)</td><td>270°</td></tr>\n<tr><td>North-West (NW)</td><td>315°</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Notice that going once round the compass is 360°, so North is both 000° and 360°. Going from one cardinal point to the next adds 90°.</p>\n<h3 class=\"learn-subheading\">3. Two ways of writing a bearing</h3>\n<h4 class=\"learn-subsubheading\">(a) Compass (quadrant) bearing, such as N75°E</h4>\n<p class=\"learn-p\">This is the \"4-point\" style. It uses the four cardinal points N, S, E and W. You begin with N or S (whichever is nearer), write an acute angle (between 0° and 90°), and end with E or W. N75°E means: start at North, then turn 75° towards the East. S40°W means: start at South, then turn 40° towards the West.</p>\n<p class=\"learn-p\">Because the angle is measured from North or South towards East or West, it is never more than 90°. So something like \"S350°W\" is not a correct quadrant bearing. The number 350° can only be a three-digit bearing, written 350°.</p>\n<h4 class=\"learn-subsubheading\">(b) Three-digit bearing, such as 075°</h4>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">three-digit bearing</span> is measured clockwise from North, from 000° to 360°. It always uses three digits, so we write 7° as 007° and 45° as 045°. This style is the one WAEC prefers.</p>\n<h3 class=\"learn-subheading\">4. Changing between the two styles</h3>\n<p class=\"learn-p\">Draw a small sketch with the North line and mark the angle. Then use the quadrant rules.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Quadrant</th><th>Compass bearing</th><th>Three-digit bearing</th></tr></thead><tbody>\n<tr><td>North-East</td><td>N x° E</td><td>x°</td></tr>\n<tr><td>South-East</td><td>S x° E</td><td>180° − x°</td></tr>\n<tr><td>South-West</td><td>S x° W</td><td>180° + x°</td></tr>\n<tr><td>North-West</td><td>N x° W</td><td>360° − x°</td></tr>\n</tbody></table></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Change to three-digit bearings: (a) N75°E (b) S40°E (c) S30°W (d) N20°W.<br>(a) N75°E is in the North-East quadrant: bearing = 075°.<br>(b) S40°E is in the South-East: 180° − 40° = 140°, so 140°.<br>(c) S30°W is in the South-West: 180° + 30° = 210°, so 210°.<br>(d) N20°W is in the North-West: 360° − 20° = 340°, so 340°.<br>To go back, 320° is in the North-West, so it is N(360 − 320)°W = N40°W.</div>\n<h3 class=\"learn-subheading\">5. Back bearings</h3>\n<p class=\"learn-p\">If you walk from A to B, the way back from B to A points in exactly the opposite direction. The bearing of A from B is called the <span class=\"learn-keyword\">back bearing</span>. The two bearings differ by 180°, because the two lines are parallel and opposite.</p>\n<ul class=\"learn-list\">\n<li>If the bearing of B from A is less than 180°, add 180° to get the bearing of A from B.</li>\n<li>If the bearing of B from A is 180° or more, subtract 180°.</li>\n</ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> (a) The bearing of B from A is 065°. Find the bearing of A from B.<br>065° is less than 180°, so add 180°: 065° + 180° = 245°.<br>(b) The bearing of Q from P is 250°. Find the bearing of P from Q.<br>250° is more than 180°, so subtract 180°: 250° − 180° = 070°.<br>Answer: (a) 245°, (b) 070°.</div>\n<h3 class=\"learn-subheading\">6. Solving bearing problems: distance and direction</h3>\n<p class=\"learn-p\">Most bearing questions describe a journey. The trick is to draw a clear sketch. Mark North at every turning point. Use the North lines to find the angles inside the triangle. Then use the tools you already know: Pythagoras' theorem, the tangent ratio (tan θ = opposite/adjacent), sine and cosine.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Draw the starting point and the North line.</li>\n<li>Step 2: Draw the first leg using its bearing and distance.</li>\n<li>Step 3: At the new point draw another North line (parallel to the first) and draw the next leg.</li>\n<li>Step 4: Mark the known angles and lengths. Use parallel-line rules (co-interior angles add up to 180°).</li>\n<li>Step 5: Calculate the missing side or angle, then convert the angle back to a bearing.</li>\n</ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> A ship leaves a port and sails 12 km on a bearing of 090° (due east). It then sails 5 km on a bearing of 000° (due north). Find (a) how far it is from the port (b) the bearing of the ship from the port.<br>The two legs are at 90° to each other, so the path makes a right-angled triangle.<br>(a) Distance² = 12² + 5² = 144 + 25 = 169. Distance = √169 = 13 km.<br>(b) The ship is 12 km east and 5 km north of the port. The angle from North is found using tan θ = east/north = 12/5 = 2.4. θ = tan⁻¹(2.4) = 67.4°, which is 067° to the nearest degree.<br><strong>Answer: 13 km from the port, on a bearing of 067°.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> A boat travels 8 km on a bearing of 030°. How far north and how far east of its starting point is it?<br>The angle between the path and the North line is 30°. The north distance is the side next to the 30° angle, so north = 8 × cos 30° = 8 × 0.8660 = 6.93 km. The east distance is the side opposite the 30° angle, so east = 8 × sin 30° = 8 × 0.5 = 4.00 km.<br>Check: 6.93² + 4² = 48.0 + 16 = 64.0 = 8², so the working is correct.<br><strong>Answer: 6.93 km north and 4 km east.</strong></div>\n<h3 class=\"learn-subheading\">7. Applications in navigation</h3>\n<p class=\"learn-p\">Bearings are used wherever people must follow a direction. A pilot flying from Lagos to Abuja is given a bearing to follow. A ship's captain uses bearings and distances to move between ports. A surveyor measures the bearing of boundary lines of a plot of land. A hunter or scout with a compass walks on a given bearing to reach a village. Search-and-rescue teams use the bearing of a distress call to locate someone.</p>\n<p class=\"learn-p\">In many questions the journey has two or three legs. Two things to remember: first, the \"bearing of Y from X\" uses a North line at X. Second, if a plane sails towards a point due north of its starting place, its bearing is 000°; if due south, 180°; due east, 090°; due west, 270°.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> <ul class=\"learn-list\">\n<li>Measuring the angle anticlockwise. A three-digit bearing is always clockwise from North.</li>\n<li>Standing at the wrong place: \"the bearing of A from B\" means the North line is drawn at B, not at A.</li>\n<li>Forgetting the zero in 075° or 007°. A three-digit bearing must have three digits.</li>\n<li>Writing an impossible compass bearing such as S350°W. The angle in a compass bearing must be at most 90°.</li>\n</ul>\n</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC likes to ask: \"A ship sails from P on a bearing of … to Q, then …; find the distance and the bearing of Q from P\" and \"Find the bearing of P from Q\". Always make a neat sketch, draw the North line at each point, and show where the 180° rule comes from. Give final bearings as three digits and distances with units (km).</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> <ul class=\"learn-list\">\n<li>A bearing is an angle measured from North, clockwise.</li>\n<li>Compass bearings look like N75°E (angle at most 90°); three-digit bearings go from 000° to 360°.</li>\n<li>Conversion: NE: x°; SE: 180° − x°; SW: 180° + x°; NW: 360° − x°.</li>\n<li>Back bearing = bearing ± 180°.</li>\n<li>Draw a North line at every point and use Pythagoras or trigonometry.</li>\n<li>Bearings are used for navigation by ships, aircraft, surveyors and scouts.</li>\n</ul>\n</div>",
    "questions": [
      {
        "q": "A three-digit bearing is measured from",
        "o": [
          "the North line, clockwise",
          "the North line, anticlockwise",
          "the East line, clockwise",
          "the South line, anticlockwise"
        ],
        "a": 0,
        "e": "By rule, bearings begin at the North line and turn clockwise, the same way as the hands of a clock. Measuring anticlockwise gives a wrong angle.",
        "h": "Think of how clock hands turn.",
        "yr": "SS2"
      },
      {
        "q": "N75°E written as a three-digit bearing is",
        "o": [
          "285°",
          "075°",
          "105°",
          "165°"
        ],
        "a": 1,
        "e": "N75°E is in the North-East quadrant, so the angle from North is just 75°. As a three-digit bearing, we write 075°. The value 285° would be N75°W.",
        "h": "North-East bearings are the same number.",
        "yr": "SS2"
      },
      {
        "q": "S40°E written as a three-digit bearing is",
        "o": [
          "040°",
          "220°",
          "140°",
          "320°"
        ],
        "a": 2,
        "e": "S40°E is in the South-East quadrant, so the bearing is 180° − 40° = 140°. The value 220° would be S40°W (180° + 40°).",
        "h": "South is 180°; you are 40° back from it.",
        "yr": "SS2"
      },
      {
        "q": "The bearing of B from A is 065°. The bearing of A from B is",
        "o": [
          "115°",
          "295°",
          "025°",
          "245°"
        ],
        "a": 3,
        "e": "The back bearing differs by 180°. Since 065° is less than 180°, add 180°: 065° + 180° = 245°.",
        "h": "Add or subtract 180°.",
        "yr": "SS2"
      },
      {
        "q": "The three-digit bearing of 7° is correctly written as",
        "o": [
          "07°",
          "007°",
          "700°",
          "7°"
        ],
        "a": 1,
        "e": "Three-digit bearings must always have three digits, so zeros are placed in front: 007°. It is wrong to leave it as 7° or 07°.",
        "h": "Count the digits.",
        "yr": "SS2"
      },
      {
        "q": "S30°W written as a three-digit bearing is",
        "o": [
          "150°",
          "030°",
          "210°",
          "330°"
        ],
        "a": 2,
        "e": "S30°W lies in the South-West quadrant, so the bearing is 180° + 30° = 210°. The value 150° would be S30°E.",
        "h": "South-West bearings are between 180° and 270°.",
        "yr": "SS2"
      },
      {
        "q": "The bearing 320° written as a compass bearing is",
        "o": [
          "N320°W",
          "S40°W",
          "N40°E",
          "N40°W"
        ],
        "a": 3,
        "e": "320° lies between 270° and 360°, the North-West quadrant. The angle from North is 360° − 320° = 40°, to the west, so N40°W.",
        "h": "How far is 320° short of a full turn?",
        "yr": "SS2"
      },
      {
        "q": "The bearing of B from A is 130°. The bearing of A from B is",
        "o": [
          "310°",
          "050°",
          "230°",
          "130°"
        ],
        "a": 0,
        "e": "130° is less than 180°, so add 180°: 130° + 180° = 310°. The answer 050° comes from wrongly working out 180° − 130°.",
        "h": "The bearing is less than 180°.",
        "yr": "SS2"
      },
      {
        "q": "The bearing of Q from P is 250°. The bearing of P from Q is",
        "o": [
          "110°",
          "430°",
          "070°",
          "250°"
        ],
        "a": 2,
        "e": "250° is more than 180°, so subtract 180°: 250° − 180° = 070°. Adding 180° would give 430°, which is greater than 360° and not a bearing.",
        "h": "The bearing is greater than 180°.",
        "yr": "SS2"
      },
      {
        "q": "A boat travels 8 km on a bearing of 030°. How far north of its starting point is it, to 2 decimal places?",
        "o": [
          "4.00 km",
          "8.00 km",
          "13.86 km",
          "6.93 km"
        ],
        "a": 3,
        "e": "North distance = 8 cos 30° = 8 × 0.8660 = 6.93 km. The value 4.00 km is the east distance (8 sin 30°), a common mix-up of sine and cosine.",
        "h": "North is the side next to the 30° angle.",
        "yr": "SS2"
      },
      {
        "q": "A ship sails 12 km due east and then 5 km due north. How far is it from its starting point?",
        "o": [
          "13 km",
          "17 km",
          "7 km",
          "60 km"
        ],
        "a": 0,
        "e": "Distance² = 12² + 5² = 144 + 25 = 169, so distance = 13 km. Adding 12 + 5 = 17 would only be correct if the ship went in a straight line.",
        "h": "The legs form a right-angled triangle.",
        "yr": "SS2"
      },
      {
        "q": "For the ship in the last question, the bearing of its final position from the start is, to the nearest degree,",
        "o": [
          "023°",
          "067°",
          "157°",
          "090°"
        ],
        "a": 1,
        "e": "The ship is 12 km east and 5 km north. tan θ = 12/5 = 2.4, so θ = 67.4°, giving 067°. The value 023° comes from using 5/12 instead, which measures the angle from the East line.",
        "h": "The angle from North uses east ÷ north.",
        "yr": "SS2"
      },
      {
        "q": "Which of these is NOT a correct compass bearing?",
        "o": [
          "N75°E",
          "S45°W",
          "N20°W",
          "S350°W"
        ],
        "a": 3,
        "e": "The angle in a compass bearing is measured from North or South and cannot exceed 90°. S350°W breaks this rule. 350° is only valid as a three-digit bearing.",
        "h": "What is the largest angle allowed between North and East?",
        "yr": "SS2"
      },
      {
        "q": "Town X is due west of town Y. The bearing of Y from X is",
        "o": [
          "090°",
          "270°",
          "180°",
          "000°"
        ],
        "a": 0,
        "e": "Standing at X, town Y lies due east, and due east is 090°. The bearing 270° would be the bearing of X from Y, which is the back bearing.",
        "h": "Stand at X and look towards Y.",
        "yr": "SS2"
      },
      {
        "q": "A boat sails 20 km on a bearing of 150°. How far east of its starting point is it?",
        "o": [
          "17.3 km",
          "10 km",
          "20 km",
          "5 km"
        ],
        "a": 1,
        "e": "150° is S30°E, so the angle from the south line is 30°. East = 20 sin 30° = 20 × 0.5 = 10 km. The distance south is 20 cos 30° = 17.3 km, which is the other component.",
        "h": "150° is 30° from the South line.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Angles of Elevation and Depression",
    "topicCode": "SS2-MATH-19",
    "module": "Bearings, Heights and Distances",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">Have you ever looked up at a tall mast on a hill, or looked down from a bridge at the lagoon? In both cases your eyes make an angle with the flat ground. The <span class=\"learn-keyword\">angle of elevation</span> and the <span class=\"learn-keyword\">angle of depression</span> are these two angles. Surveyors and builders use them to find heights and distances that are too big to measure with a tape. For example, you can find the height of a tree on your school compound without climbing it. All you need is one angle, one distance and your knowledge of the tangent ratio.</div>\n<h3 class=\"learn-subheading\">1. The horizontal line and the line of sight</h3>\n<p class=\"learn-p\">Two ideas are needed first. The <span class=\"learn-keyword\">horizontal line</span> is the flat, level line from the observer's eye, parallel to the ground. The <span class=\"learn-keyword\">line of sight</span> is the straight line from the observer's eye to the object being looked at.</p>\n<h3 class=\"learn-subheading\">2. Angle of elevation</h3>\n<p class=\"learn-p\">When you look UP at an object that is higher than your eye, the angle between the horizontal line and your line of sight is called the angle of elevation. \"Elevation\" means \"going up\". For example, a boy stands on level ground and looks up at the top of a coconut tree. The angle his eyes turn up from the horizontal is the angle of elevation of the top of the tree.</p>\n<h3 class=\"learn-subheading\">3. Angle of depression</h3>\n<p class=\"learn-p\">When you look DOWN at an object that is lower than your eye, the angle between the horizontal line and your line of sight is called the angle of depression. \"Depression\" means \"going down\". Notice carefully: the angle of depression is measured from the horizontal line, NOT from the cliff or building wall.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th></th><th>Angle of elevation</th><th>Angle of depression</th></tr></thead><tbody>\n<tr><td>Direction of looking</td><td>Upwards</td><td>Downwards</td></tr>\n<tr><td>Measured from</td><td>The horizontal line at the observer</td><td>The horizontal line at the observer</td></tr>\n<tr><td>Object position</td><td>Higher than the observer</td><td>Lower than the observer</td></tr>\n<tr><td>Example</td><td>Looking up at the top of a mast</td><td>Looking down from a bridge at a boat</td></tr>\n</tbody></table></div>\n<h3 class=\"learn-subheading\">4. How the two angles are related</h3>\n<p class=\"learn-p\">Suppose a man is on top of a tower and sees a car on the ground at an angle of depression of 30°. A person in the car looks back up at the man on the tower. The angle of elevation of the man from the car is also 30°. This is because the horizontal line at the top and the ground line at the bottom are parallel. The two angles are alternate angles, and alternate angles between parallel lines are equal.</p>\n<p class=\"learn-p\">So: <span class=\"learn-keyword\">angle of depression from the top = angle of elevation from the bottom</span>. This fact is very useful, because it lets you place the angle inside the right-angled triangle formed by the tower, the ground and the line of sight.</p>\n<h3 class=\"learn-subheading\">5. Constructing the angles (scale drawing)</h3>\n<p class=\"learn-p\">When the question says \"by scale drawing\" or \"construct\", you draw the situation to scale and measure the answer. You need a ruler, a protractor and a sharp pencil.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Choose a scale, for example 1 cm to represent 5 m.</li>\n<li>Step 2: Draw a horizontal line for the level ground and mark the observer's position on it.</li>\n<li>Step 3: Mark off the horizontal distance to the base of the object, using the scale (for 20 m, draw 4 cm).</li>\n<li>Step 4: At the base of the object, draw a vertical line upwards (the object is upright, so it makes 90° with the ground).</li>\n<li>Step 5: At the observer, use the protractor to draw the angle of elevation above the ground line. Extend this line until it cuts the vertical line.</li>\n<li>Step 6: Measure the vertical line and multiply by the scale to get the real height.</li>\n</ol>\n<p class=\"learn-p\">Example of a construction: the observer is 20 m from a tree and the angle of elevation of the top is 35°. With a scale of 1 cm to 5 m, the base is 4 cm. After drawing the 35° line, the vertical side measures about 2.8 cm. The tree is about 2.8 × 5 = 14 m high. This matches the calculation in the first worked example below. For a depression question, draw the horizontal line from the top of the object and measure the angle DOWN from it.</p>\n<h3 class=\"learn-subheading\">6. Solving problems by calculation</h3>\n<p class=\"learn-p\">The tower, the ground and the line of sight form a right-angled triangle. Label the sides from the angle you use: the <span class=\"learn-keyword\">opposite</span> side is across from the angle, the <span class=\"learn-keyword\">adjacent</span> side is next to the angle (not the longest side), and the <span class=\"learn-keyword\">hypotenuse</span> is the longest side, opposite the right angle. The ratios are:</p>\n<ul class=\"learn-list\">\n<li>tan θ = opposite ÷ adjacent (use this when you have the height and the horizontal distance)</li>\n<li>sin θ = opposite ÷ hypotenuse (use this when the line of sight, rope or string is involved)</li>\n<li>cos θ = adjacent ÷ hypotenuse</li>\n</ul>\n<ol class=\"learn-ordered\">\n<li>Step 1: Draw a clear sketch. Mark the horizontal line, the angle, and the right angle.</li>\n<li>Step 2: Put in the numbers you know and a letter for the unknown.</li>\n<li>Step 3: Choose sin, cos or tan.</li>\n<li>Step 4: Solve. Use a calculator in degree mode.</li>\n<li>Step 5: Write the answer with the unit, and add the observer's height if it is given.</li>\n</ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> A girl stands 20 m from the foot of a tree on level ground. The angle of elevation of the top of the tree is 35°. (a) Find the height of the tree above her eye level. (b) If her eye is 1.6 m above the ground, find the full height of the tree.<br>(a) Opposite side = height h. Adjacent side = 20 m. tan 35° = h/20.<br>h = 20 × tan 35° = 20 × 0.7002 = 14.0 m.<br>(b) The full height = 14.0 + 1.6 = 15.6 m.<br><strong>Answer: 14.0 m above her eye level, so the tree is 15.6 m high.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> From the top of a cliff 30 m high, the angle of depression of a boat on the sea is 25°. Find (a) how far the boat is from the foot of the cliff (b) the length of the line of sight.<br>The angle of depression 25° equals the angle of elevation from the boat to the top (alternate angles). In the triangle, the cliff 30 m is opposite to 25°, and the distance d is adjacent.<br>(a) tan 25° = 30/d, so d = 30 ÷ tan 25° = 30 ÷ 0.4663 = 64.3 m.<br>(b) sin 25° = 30/L, so L = 30 ÷ sin 25° = 30 ÷ 0.4226 = 71.0 m.<br><strong>Answer: the boat is 64.3 m from the cliff, and the line of sight is 71.0 m long.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> A man standing at a point P sees the top of a building at an angle of elevation of 30°. He walks 20 m towards the building and the angle of elevation becomes 45°. Find the height of the building.<br>Let the building height be h and let the distance from the second position to the building be x.<br>From the second position: tan 45° = h/x, and tan 45° = 1, so h = x.<br>From P (distance x + 20): tan 30° = h/(x + 20), and tan 30° = 1/√3 = 0.5774.<br>So h = 0.5774(x + 20). Since h = x: x = 0.5774x + 11.548, so 0.4226x = 11.548, giving x = 27.3.<br>Check with exact values: x = 20/(√3 − 1) = 20/0.7321 = 27.32.<br><strong>Answer: the building is about 27.3 m high.</strong></div>\n<h3 class=\"learn-subheading\">7. Real-life applications</h3>\n<ul class=\"learn-list\">\n<li>Finding the height of a mast, a church tower, a building or a tree using only a tape and a clinometer (a simple instrument for measuring the angle of elevation).</li>\n<li>A pilot on approach to the airport uses the angle of depression to the runway.</li>\n<li>A lifeguard on a tall chair finds the distance of a swimmer.</li>\n<li>Engineers choose the angle of a ramp or a ladder so that it is safe and reaches the right height.</li>\n<li>Someone on a hill can find how far away a village or river is from the angle of depression.</li>\n</ul>\n<p class=\"learn-p\">For all of these, the pattern is the same: draw, label, choose the ratio, solve.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> <ul class=\"learn-list\">\n<li>Measuring the angle of depression from the wall of the cliff or from the vertical. It is always measured from the horizontal.</li>\n<li>Placing the angle in the wrong corner of the triangle. For a depression question, put the equal angle at the BOTTOM (alternate angles).</li>\n<li>Using a calculator in radian mode. Check it is in degrees.</li>\n<li>Forgetting to add the height of the observer's eye when the question gives it.</li>\n</ul>\n</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC usually says: \"From the top of a tower 40 m high, the angle of depression of a car is 28°. Calculate its distance from the foot of the tower.\" Always draw the sketch first. Show the equation (for example tan 28° = 40/d), then the working, then the answer to the degree of accuracy asked (usually 1 decimal place or 3 significant figures). Write the units.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> <ul class=\"learn-list\">\n<li>The angle of elevation is the angle UP from the horizontal to the line of sight.</li>\n<li>The angle of depression is the angle DOWN from the horizontal to the line of sight.</li>\n<li>Angle of depression from the top = angle of elevation from the bottom (alternate angles).</li>\n<li>Draw to scale with a protractor when asked to construct.</li>\n<li>Use tan for height and distance; use sin or cos when the line of sight is involved.</li>\n<li>Add the observer's height if given, and write units.</li>\n</ul>\n</div>",
    "questions": [
      {
        "q": "The angle of elevation of an object is the angle between the horizontal and the line of sight when the observer looks",
        "o": [
          "upwards at an object above eye level",
          "downwards at an object below eye level",
          "straight along the ground",
          "from the object back to the vertical"
        ],
        "a": 0,
        "e": "Elevation means going up. It is measured from the horizontal line at the observer's eye to the line of sight, up to the object. Looking downwards gives the angle of depression instead.",
        "h": "Elevation = rising upwards.",
        "yr": "SS2"
      },
      {
        "q": "The angle of depression is measured from",
        "o": [
          "the vertical wall, downwards",
          "the horizontal line at the observer, downwards to the line of sight",
          "the ground, upwards",
          "the line of sight, to the vertical"
        ],
        "a": 1,
        "e": "The angle of depression always starts at the horizontal line through the observer's eye. It is never measured from the vertical wall or tower.",
        "h": "Which line do both angles start from?",
        "yr": "SS2"
      },
      {
        "q": "A man on top of a tower sees a car at an angle of depression of 30°. The angle of elevation of the man from the car is",
        "o": [
          "60°",
          "150°",
          "30°",
          "90°"
        ],
        "a": 2,
        "e": "The horizontal line at the top and the ground are parallel, so the two angles are alternate angles and are equal. Both are 30°. The value 60° is 90° − 30°, which is the angle at the top inside the triangle.",
        "h": "Alternate angles between parallel lines.",
        "yr": "SS2"
      },
      {
        "q": "To find the height of a tree from the horizontal distance and the angle of elevation, which ratio is used?",
        "o": [
          "sin θ = adjacent/hypotenuse",
          "cos θ = opposite/adjacent",
          "tan θ = adjacent/opposite",
          "tan θ = opposite/adjacent"
        ],
        "a": 3,
        "e": "The height is the side opposite the angle and the horizontal distance is the side adjacent to it. They are linked by tan θ = opposite ÷ adjacent. The other options mix up the sides.",
        "h": "Height and distance are the two shorter sides.",
        "yr": "SS2"
      },
      {
        "q": "Which simple instrument is used to measure an angle of elevation?",
        "o": [
          "a thermometer",
          "a clinometer",
          "a barometer",
          "a voltmeter"
        ],
        "a": 1,
        "e": "A clinometer measures the angle at which the line of sight is raised above the horizontal. The other instruments measure temperature, pressure and electric potential.",
        "h": "The name suggests \"incline\".",
        "yr": "SS2"
      },
      {
        "q": "A girl stands 20 m from a tree. The angle of elevation of its top is 35°. The height of the tree above her eye level is (correct to 1 d.p.)",
        "o": [
          "28.6 m",
          "11.5 m",
          "14.0 m",
          "20.0 m"
        ],
        "a": 2,
        "e": "tan 35° = h/20, so h = 20 × 0.7002 = 14.0 m. The value 28.6 comes from dividing 20 by tan 35°, which gives the wrong side of the triangle.",
        "h": "Multiply 20 by tan 35°.",
        "yr": "SS2"
      },
      {
        "q": "From the top of a 30 m cliff, the angle of depression of a boat is 25°. The distance of the boat from the foot of the cliff is (nearest metre)",
        "o": [
          "14 m",
          "30 m",
          "71 m",
          "64 m"
        ],
        "a": 3,
        "e": "The 25° angle is at the boat, with 30 m opposite. tan 25° = 30/d, so d = 30 ÷ 0.4663 = 64.3, about 64 m. The value 71 m is the length of the line of sight (30 ÷ sin 25°), not the horizontal distance.",
        "h": "tan 25° = 30 ÷ distance.",
        "yr": "SS2"
      },
      {
        "q": "A man stands 40 m from the foot of a tower. The angle of elevation of its top is 60°. The height of the tower is (to 1 d.p.)",
        "o": [
          "69.3 m",
          "23.1 m",
          "40.0 m",
          "80.0 m"
        ],
        "a": 0,
        "e": "tan 60° = h/40, so h = 40 × 1.732 = 69.3 m. If you divided 40 by tan 60° you would get 23.1 m, which is wrong because the unknown is the opposite side.",
        "h": "tan 60° = √3 = 1.732.",
        "yr": "SS2"
      },
      {
        "q": "A kite is on a string 50 m long and the string makes an angle of elevation of 30° with the ground. The height of the kite is",
        "o": [
          "43.3 m",
          "50 m",
          "25 m",
          "86.6 m"
        ],
        "a": 2,
        "e": "The string is the hypotenuse and the height is opposite to 30°, so height = 50 × sin 30° = 50 × 0.5 = 25 m. The value 43.3 m is 50 × cos 30°, which is the horizontal distance.",
        "h": "The string is the hypotenuse, so use sine.",
        "yr": "SS2"
      },
      {
        "q": "The angle of elevation of the top of a tree from a point 20 m away is 35°. If the observer's eye is 1.6 m above the ground, the full height of the tree is (to 1 d.p.)",
        "o": [
          "14.0 m",
          "12.4 m",
          "1.6 m",
          "15.6 m"
        ],
        "a": 3,
        "e": "The height above eye level is 20 tan 35° = 14.0 m. We must add the eye height of 1.6 m: 14.0 + 1.6 = 15.6 m. Leaving out 1.6 m gives 14.0 m, which is a common mistake.",
        "h": "The tree starts at the ground, not at the eye.",
        "yr": "SS2"
      },
      {
        "q": "A pole 12 m high stands on level ground. An observer 16 m from its foot looks at the top. The angle of elevation is (nearest 0.1°)",
        "o": [
          "36.9°",
          "53.1°",
          "41.2°",
          "75.0°"
        ],
        "a": 0,
        "e": "tan θ = 12/16 = 0.75, so θ = tan⁻¹(0.75) = 36.9°. The value 53.1° is the other acute angle (90° − 36.9°) and would result from using 16/12.",
        "h": "tan θ = opposite ÷ adjacent = 12 ÷ 16.",
        "yr": "SS2"
      },
      {
        "q": "A man at point P sees the top of a building at an angle of elevation of 30°. He walks 20 m towards the building and the elevation becomes 45°. The height of the building is about",
        "o": [
          "47.3 m",
          "27.3 m",
          "20.0 m",
          "34.6 m"
        ],
        "a": 1,
        "e": "Let the nearer distance be x. Then h = x (tan 45° = 1) and h = (x + 20) tan 30°. So x = 0.5774x + 11.55, giving x = 27.3. So h = 27.3 m. The value 47.3 m is the original distance x + 20, not the height.",
        "h": "Use tan 45° = 1 to link h and x.",
        "yr": "SS2"
      },
      {
        "q": "From the top of a 50 m building, a car on level ground is seen at an angle of depression of 40°. The car is how far from the foot of the building (to 1 d.p.)?",
        "o": [
          "41.9 m",
          "32.1 m",
          "77.8 m",
          "59.6 m"
        ],
        "a": 3,
        "e": "The equal angle 40° is at the car. tan 40° = 50/d, so d = 50 ÷ 0.8391 = 59.6 m. The value 41.9 m is 50 × tan 40°, which uses the wrong side.",
        "h": "The unknown distance is the adjacent side.",
        "yr": "SS2"
      },
      {
        "q": "As an observer walks towards the foot of a tall tower, the angle of elevation of its top",
        "o": [
          "increases",
          "decreases",
          "stays the same",
          "becomes zero"
        ],
        "a": 0,
        "e": "The height stays the same but the horizontal distance becomes smaller, so tan θ = height ÷ distance gets bigger. A bigger tangent means a bigger angle, so the angle increases.",
        "h": "Think: closer means you must look more steeply upwards.",
        "yr": "SS2"
      },
      {
        "q": "A boy on a hill sees two boats in a line. The angle of depression of the nearer boat is 50° and of the farther boat is 30°. Which statement is correct?",
        "o": [
          "The farther boat has the larger angle of depression",
          "The nearer boat has the larger angle of depression",
          "Both boats have the same angle of depression",
          "The angle of depression cannot be compared"
        ],
        "a": 1,
        "e": "The nearer an object is below you, the more steeply you look down, so its angle of depression is greater. This is the same idea as the angle of elevation getting larger as you come closer.",
        "h": "Closer objects are looked at more steeply.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Frequency Distribution",
    "topicCode": "SS2-MATH-20",
    "module": "Statistics",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">Imagine a teacher in Ibadan who has the English scores of 100 pupils written one after another on a long sheet of paper. Can she quickly tell how many pupils scored between 50 and 59? No, because the numbers are mixed up. A <span class=\"learn-keyword\">frequency distribution</span> puts the numbers in a neat table so that the pattern can be seen at once. Traders in the market, the Federal Road Safety Corps and the National Population Commission all organise data this way before they draw any conclusion. In this lesson you will learn what frequency means, how to build tables for single values and for groups, and how to find cumulative frequency.</div>\n<h3 class=\"learn-subheading\">1. Data and frequency</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Data</span> means the facts or numbers we collect, such as the heights of pupils or the number of goals in a match. Data that has not been arranged is called <span class=\"learn-keyword\">raw data</span>.</p>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">frequency</span> of a value is the number of times it appears in the data. If 7 pupils scored 6 marks, then the frequency of the score 6 is 7. A <span class=\"learn-keyword\">frequency table</span> lists each value (or group of values) with its frequency.</p>\n<h3 class=\"learn-subheading\">2. Making a frequency table from raw data</h3>\n<p class=\"learn-p\">The method uses <span class=\"learn-keyword\">tally marks</span>. A tally mark is one short stroke ( | ) drawn for each item. We draw four strokes and cross them with a fifth stroke, so that counting in fives is easy.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Write down all the different values in order, from smallest to largest, in the first column.</li>\n<li>Step 2: Go through the raw data once. For each number, put one tally stroke in the row of that number. Strike off each number in the list as you do it, so that you do not miss any.</li>\n<li>Step 3: Count the strokes in each row and write the total in the frequency (f) column.</li>\n<li>Step 4: Add the frequencies. The total must be equal to the number of items in the raw data. This is your check.</li>\n</ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> The scores of 20 pupils in a short test are: 4, 6, 5, 7, 6, 8, 5, 6, 7, 6, 9, 5, 6, 7, 8, 6, 4, 5, 7, 6. Make a frequency table.<br>The scores are 4, 5, 6, 7, 8, 9. Tally each score:<br>Score 4: || → f = 2<br>Score 5: |||| → f = 4<br>Score 6: <s>||||</s> || → f = 7<br>Score 7: |||| → f = 4<br>Score 8: || → f = 2<br>Score 9: | → f = 1<br>Total: 2 + 4 + 7 + 4 + 2 + 1 = 20, which equals the 20 pupils, so the table is correct.<br><strong>Answer: the score 6 is the most frequent, with frequency 7.</strong></div>\n<h3 class=\"learn-subheading\">3. Grouped frequency distribution</h3>\n<p class=\"learn-p\">When the data has many different values (for example marks from 12 to 48), a table with one row for each value is too long. Then we put the values into groups called <span class=\"learn-keyword\">class intervals</span>. Each class interval has two ends, called the <span class=\"learn-keyword\">class limits</span>: the lower limit and the upper limit. For the class 11 – 20 the lower limit is 11 and the upper limit is 20.</p>\n<p class=\"learn-p\">Rules for choosing classes:</p>\n<ul class=\"learn-list\">\n<li>Use between about 5 and 10 classes.</li>\n<li>Make all the classes the same width, where possible.</li>\n<li>The classes must not overlap, and every value must fit into exactly one class.</li>\n<li>Start with a convenient number, for example 1, 11, 21 …, and make sure the first class includes the smallest value and the last class includes the largest value.</li>\n</ul>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">range</span> of the data is the largest value minus the smallest value. It helps you decide the class width: the range divided by the number of classes you want, rounded up to a convenient number.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> The marks of 20 pupils are: 12, 25, 37, 41, 18, 29, 33, 45, 22, 38, 27, 31, 15, 48, 36, 24, 42, 30, 19, 35. Group them in classes 11–20, 21–30, 31–40, 41–50.<br>11–20: 12, 18, 15, 19 → f = 4<br>21–30: 25, 29, 22, 27, 24, 30 → f = 6<br>31–40: 37, 33, 38, 31, 36, 35 → f = 6<br>41–50: 41, 45, 48, 42 → f = 4<br>Total = 4 + 6 + 6 + 4 = 20. ✔<br>Note that 30 belongs to the class 21–30 and 31 belongs to 31–40.</div>\n<h3 class=\"learn-subheading\">4. Class boundaries, class width and class mark</h3>\n<p class=\"learn-p\">In the class 11–20 the marks are whole numbers, but there is a small gap between 20 and the next class that starts at 21. To remove the gap we use <span class=\"learn-keyword\">class boundaries</span>. The lower class boundary is halfway between the upper limit of the class before and the lower limit of this class. For 11–20: lower boundary = (10 + 11) ÷ 2 = 10.5 and upper boundary = (20 + 21) ÷ 2 = 20.5. So the class is 10.5 – 20.5.</p>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">class width</span> (or class size) is the upper boundary minus the lower boundary: 20.5 − 10.5 = 10. The <span class=\"learn-keyword\">class mark</span> (also called the mid-value or midpoint) is the middle of the class: (lower limit + upper limit) ÷ 2 = (11 + 20) ÷ 2 = 15.5.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Class</th><th>Boundaries</th><th>Width</th><th>Class mark</th><th>Frequency</th></tr></thead><tbody>\n<tr><td>11 – 20</td><td>10.5 – 20.5</td><td>10</td><td>15.5</td><td>4</td></tr>\n<tr><td>21 – 30</td><td>20.5 – 30.5</td><td>10</td><td>25.5</td><td>6</td></tr>\n<tr><td>31 – 40</td><td>30.5 – 40.5</td><td>10</td><td>35.5</td><td>6</td></tr>\n<tr><td>41 – 50</td><td>40.5 – 50.5</td><td>10</td><td>45.5</td><td>4</td></tr>\n</tbody></table></div>\n<h3 class=\"learn-subheading\">5. Cumulative frequency</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">cumulative frequency</span> is a running total of the frequencies. It tells you how many items are less than or equal to the upper end of a class. To find it, add each frequency to the total of the ones before it. The last cumulative frequency must be equal to the total number of items (the sum of all frequencies).</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: The first cumulative frequency is equal to the first frequency.</li>\n<li>Step 2: Add the next frequency to the previous cumulative frequency.</li>\n<li>Step 3: Continue to the end. The last value is the total frequency n.</li>\n</ol>\n<p class=\"learn-p\">For the scores in Example 1, the cumulative frequency (cf) is:</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Score</th><th>Frequency (f)</th><th>Cumulative frequency (cf)</th></tr></thead><tbody>\n<tr><td>4</td><td>2</td><td>2</td></tr>\n<tr><td>5</td><td>4</td><td>2 + 4 = 6</td></tr>\n<tr><td>6</td><td>7</td><td>6 + 7 = 13</td></tr>\n<tr><td>7</td><td>4</td><td>13 + 4 = 17</td></tr>\n<tr><td>8</td><td>2</td><td>17 + 2 = 19</td></tr>\n<tr><td>9</td><td>1</td><td>19 + 1 = 20</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Read it like this: 13 pupils scored 6 marks or less. For grouped data we use the upper class boundary: for Example 2, the cumulative frequencies are 4, 10, 16 and 20.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Class</th><th>Frequency</th><th>Upper boundary</th><th>Cumulative frequency</th></tr></thead><tbody>\n<tr><td>11 – 20</td><td>4</td><td>less than 20.5</td><td>4</td></tr>\n<tr><td>21 – 30</td><td>6</td><td>less than 30.5</td><td>10</td></tr>\n<tr><td>31 – 40</td><td>6</td><td>less than 40.5</td><td>16</td></tr>\n<tr><td>41 – 50</td><td>4</td><td>less than 50.5</td><td>20</td></tr>\n</tbody></table></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> Using the grouped table above, find (a) how many pupils scored 30 or less (b) how many scored 31 or more (c) how many scored between 21 and 40.<br>(a) 30 is the end of the class 21–30, so the cumulative frequency is 10 pupils.<br>(b) Total = 20. Those who scored 30 or less = 10. So 31 or more = 20 − 10 = 10 pupils.<br>(c) Between 21 and 40 means the classes 21–30 and 31–40: 6 + 6 = 12 pupils. (Check with cumulative frequency: 16 − 4 = 12.)<br><strong>Answer: (a) 10 (b) 10 (c) 12 pupils.</strong></div>\n<h3 class=\"learn-subheading\">6. Why do we use frequency tables?</h3>\n<ul class=\"learn-list\">\n<li>They make large data short and easy to read.</li>\n<li>They show which value or class is most common.</li>\n<li>They are the first step before we draw bar charts, histograms and ogives, and before we find the mean, median and mode.</li>\n<li>Cumulative frequency lets us answer \"how many are below …?\" quickly.</li>\n</ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> <ul class=\"learn-list\">\n<li>Skipping a number while tallying. Always check that the total frequency equals the number of items.</li>\n<li>Making classes that overlap, such as 10–20 and 20–30. Use 11–20 and 21–30 for whole numbers.</li>\n<li>Confusing frequency with cumulative frequency. Frequency is the count in ONE class; cumulative is the running total.</li>\n<li>Using class limits instead of class boundaries when finding the class width or plotting a graph.</li>\n</ul>\n</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> In WAEC, you may be given a list of 40 or 50 marks and asked to \"construct a frequency table using class intervals 1–10, 11–20, …\". Use tally marks and show them; then give a cumulative frequency column. Check that the sum of the frequencies equals the number of items. Questions often follow with \"how many students scored above …?\", which is answered with 'total minus cumulative frequency'.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> <ul class=\"learn-list\">\n<li>Frequency is the number of times a value occurs.</li>\n<li>Use tally marks (fives crossed) to build a table from raw data; the total frequency must match the number of items.</li>\n<li>For many values, use grouped classes of equal width.</li>\n<li>Class boundaries remove gaps (e.g. 11–20 has boundaries 10.5 and 20.5); class mark = (lower + upper) ÷ 2.</li>\n<li>Cumulative frequency = running total; the last value equals n.</li>\n</ul>\n</div>",
    "questions": [
      {
        "q": "The frequency of a value in a set of data is",
        "o": [
          "the number of times it occurs",
          "the value itself",
          "the sum of all the values",
          "the difference between the largest and smallest values"
        ],
        "a": 0,
        "e": "Frequency means \"how often\". If the score 6 appears 7 times, its frequency is 7. The difference between the largest and smallest values is the range.",
        "h": "Think \"how often\".",
        "yr": "SS2"
      },
      {
        "q": "In tally marking, the fifth mark is",
        "o": [
          "drawn as a separate stroke",
          "drawn across the four marks already made",
          "left out",
          "drawn as a zero"
        ],
        "a": 1,
        "e": "Tally marks are grouped in fives. Four strokes are made and the fifth crosses them, which makes counting in fives easy.",
        "h": "Four strokes and a gate.",
        "yr": "SS2"
      },
      {
        "q": "Cumulative frequency is",
        "o": [
          "the highest frequency",
          "the frequency of the first class only",
          "a running total of the frequencies",
          "the average of the frequencies"
        ],
        "a": 2,
        "e": "We add each frequency to the total of those before it. The last cumulative frequency must be equal to the total frequency n.",
        "h": "Keep adding as you go down.",
        "yr": "SS2"
      },
      {
        "q": "The class width of the class 21 – 30 (boundaries 20.5 – 30.5) is",
        "o": [
          "9",
          "30",
          "5",
          "10"
        ],
        "a": 3,
        "e": "Class width = upper boundary − lower boundary = 30.5 − 20.5 = 10. The answer 9 comes from 30 − 21, which uses the limits and misses one value.",
        "h": "Subtract the boundaries.",
        "yr": "SS2"
      },
      {
        "q": "The class boundaries of the class interval 11 – 20 (whole numbers) are",
        "o": [
          "11 – 20",
          "10.5 – 20.5",
          "10 – 21",
          "11.5 – 19.5"
        ],
        "a": 1,
        "e": "The lower boundary is halfway between 10 and 11, which is 10.5. The upper boundary is halfway between 20 and 21, which is 20.5.",
        "h": "Go half a unit below and half a unit above.",
        "yr": "SS2"
      },
      {
        "q": "The class mark of the class 31 – 40 is",
        "o": [
          "35",
          "36",
          "35.5",
          "71"
        ],
        "a": 2,
        "e": "Class mark = (31 + 40) ÷ 2 = 71 ÷ 2 = 35.5. The value 71 forgets to divide by 2.",
        "h": "Add the limits and halve.",
        "yr": "SS2"
      },
      {
        "q": "In the table of 20 test scores (4: 2, 5: 4, 6: 7, 7: 4, 8: 2, 9: 1), how many pupils scored 6?",
        "o": [
          "13",
          "6",
          "4",
          "7"
        ],
        "a": 3,
        "e": "The frequency of the score 6 is 7. The number 13 is the cumulative frequency up to and including 6, which counts those who scored 6 or less.",
        "h": "Read the frequency column, not the cumulative one.",
        "yr": "SS2"
      },
      {
        "q": "In the same table, the cumulative frequency up to the score 7 is",
        "o": [
          "17",
          "4",
          "13",
          "19"
        ],
        "a": 0,
        "e": "Add frequencies up to 7: 2 + 4 + 7 + 4 = 17. So 17 pupils scored 7 or less. The value 13 is only the cumulative frequency up to 6.",
        "h": "Add 2, 4, 7 and 4.",
        "yr": "SS2"
      },
      {
        "q": "Marks are grouped as 11–20, 21–30, 31–40, 41–50. A pupil scoring 30 belongs to the class",
        "o": [
          "31 – 40",
          "11 – 20",
          "21 – 30",
          "41 – 50"
        ],
        "a": 2,
        "e": "The class 21–30 includes both 21 and 30. The next class starts at 31. So the mark 30 goes into the class 21–30.",
        "h": "Check which class limits include 30.",
        "yr": "SS2"
      },
      {
        "q": "A grouped table has frequencies 4, 6, 6 and 4 for four classes. The cumulative frequency column is",
        "o": [
          "4, 6, 6, 4",
          "4, 10, 12, 16",
          "20, 16, 10, 4",
          "4, 10, 16, 20"
        ],
        "a": 3,
        "e": "Add as you go: 4; 4 + 6 = 10; 10 + 6 = 16; 16 + 4 = 20. The last value, 20, is equal to the total number of items.",
        "h": "Running total.",
        "yr": "SS2"
      },
      {
        "q": "The marks of a class range from a lowest of 20 to a highest of 80. The range is",
        "o": [
          "60",
          "100",
          "50",
          "4"
        ],
        "a": 0,
        "e": "Range = highest − lowest = 80 − 20 = 60. Adding the values (100) is a mistake.",
        "h": "Subtract the smallest from the largest.",
        "yr": "SS2"
      },
      {
        "q": "The frequencies in a table are 5, 9, 14, 7 and x. The total frequency is 40. The value of x is",
        "o": [
          "35",
          "5",
          "9",
          "7"
        ],
        "a": 1,
        "e": "The known frequencies add up to 5 + 9 + 14 + 7 = 35. So x = 40 − 35 = 5. The value 35 is the sum of the known ones, not the missing one.",
        "h": "Total minus the known frequencies.",
        "yr": "SS2"
      },
      {
        "q": "From the grouped table (cumulative frequencies 4, 10, 16, 20 for classes ending 20, 30, 40, 50), how many pupils scored more than 30?",
        "o": [
          "6",
          "16",
          "4",
          "10"
        ],
        "a": 3,
        "e": "Total = 20 and 10 pupils scored 30 or less. So 20 − 10 = 10 pupils scored more than 30. The value 16 is the number scoring 40 or less.",
        "h": "Total minus cumulative frequency of 30.",
        "yr": "SS2"
      },
      {
        "q": "How many pupils scored between 21 and 40 (both included) in the same table?",
        "o": [
          "12",
          "16",
          "10",
          "6"
        ],
        "a": 0,
        "e": "The classes are 21–30 and 31–40, with frequencies 6 and 6, so 6 + 6 = 12. Using cumulative frequencies: 16 − 4 = 12. The value 16 includes the pupils who scored 20 or less.",
        "h": "Add the frequencies of the two classes.",
        "yr": "SS2"
      },
      {
        "q": "Why do we group data into class intervals?",
        "o": [
          "Because every value must appear in a different class",
          "Because there are many different values, and a short table is easier to read",
          "To make the total frequency larger",
          "To remove the smallest values"
        ],
        "a": 1,
        "e": "When data is spread over many values, one row per value makes a long table. Grouping gives a short table that shows the pattern. It does not change the total frequency or remove values.",
        "h": "Think of marks from 1 to 100.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Graphical Representation Ogive (cumulative frequency curve); estimating median, of Frequency",
    "topicCode": "SS2-MATH-21",
    "module": "Statistics",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">When WAEC results come out, a pupil may hear: \"You are in the top 10 percent of the class.\" How does anyone know this without counting every script again? One answer is a picture called the <span class=\"learn-keyword\">ogive</span>, also known as the <span class=\"learn-keyword\">cumulative frequency curve</span>. It is drawn from a cumulative frequency table, and it lets us read off the <span class=\"learn-keyword\">median</span>, the <span class=\"learn-keyword\">quartiles</span> and the <span class=\"learn-keyword\">percentiles</span> of a large set of marks. Schools, hospitals, the National Population Commission and market researchers all use it to answer questions such as \"How many people earn less than ₦50,000?\" In this lesson you will learn how to draw the curve and how to read it.</div>\n<h3 class=\"learn-subheading\">1. What you need before you start: the cumulative frequency table</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">frequency</span> is the number of times a value or class occurs. The <span class=\"learn-keyword\">cumulative frequency</span> is a running total of the frequencies. You met both in the last topic. The ogive is drawn from the cumulative frequency, so we must build that table first. We will use the marks of 50 pupils in a test.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Class (marks)</th><th>Frequency (f)</th><th>Upper class boundary</th><th>Cumulative frequency (cf)</th></tr></thead><tbody>\n<tr><td>1 – 10</td><td>3</td><td>10.5</td><td>3</td></tr>\n<tr><td>11 – 20</td><td>7</td><td>20.5</td><td>3 + 7 = 10</td></tr>\n<tr><td>21 – 30</td><td>12</td><td>30.5</td><td>10 + 12 = 22</td></tr>\n<tr><td>31 – 40</td><td>15</td><td>40.5</td><td>22 + 15 = 37</td></tr>\n<tr><td>41 – 50</td><td>8</td><td>50.5</td><td>37 + 8 = 45</td></tr>\n<tr><td>51 – 60</td><td>5</td><td>60.5</td><td>45 + 5 = 50</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">Check: the last cumulative frequency, 50, equals the total number of pupils. The upper class boundary is halfway between the top of one class and the bottom of the next class. For 1 – 10 and 11 – 20 it is (10 + 11) ÷ 2 = 10.5. The cumulative frequency 10 beside 20.5 means: 10 pupils scored 20.5 marks or less (that is, 20 or less).</p>\n<h3 class=\"learn-subheading\">2. How to draw the ogive</h3>\n<p class=\"learn-p\">An ogive is a graph. The cumulative frequency is plotted against the upper class boundary. Follow these steps.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Draw the horizontal axis (x-axis) for the marks and the vertical axis (y-axis) for the cumulative frequency. Choose scales that fill the paper, for example 2 cm for 10 marks and 2 cm for 10 pupils.</li>\n<li>Step 2: Add a starting point. Plot the lower boundary of the first class with cumulative frequency 0. Here that is (0.5, 0), because no pupil scored less than 0.5 marks.</li>\n<li>Step 3: Plot each pair (upper boundary, cumulative frequency): (10.5, 3), (20.5, 10), (30.5, 22), (40.5, 37), (50.5, 45), (60.5, 50).</li>\n<li>Step 4: Join the points with a smooth curve drawn freehand. It rises slowly, then faster, then slowly again, so it has an S-shape. Do not join with ruler lines unless the question says \"polygon\".</li>\n<li>Step 5: Label the axes and give the graph a title.</li>\n</ol>\n<p class=\"learn-p\">The curve never goes down, because a running total can only stay the same or go up. If your curve goes down, you have made a plotting error. Also, never plot at the class mark or at the lower boundary of a class (except the starting point). Always use the upper boundary.</p>\n<h3 class=\"learn-subheading\">3. Estimating the median from the ogive</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">median</span> is the middle value when the data is arranged in order. Half of the items are below it and half are above it. With n items in total, the median is at the position n/2 on the cumulative frequency axis.</p>\n<ol class=\"learn-ordered\">\n<li>Step 1: Find n/2 on the vertical axis.</li>\n<li>Step 2: Draw a horizontal line from that value across to the curve.</li>\n<li>Step 3: From the point where it meets the curve, draw a vertical line down to the horizontal axis.</li>\n<li>Step 4: Read the value on the horizontal axis. That is the median.</li>\n</ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Use the ogive for the 50 pupils to estimate the median mark.<br>n = 50, so n/2 = 25. Go up the vertical axis to 25 and draw a line across to the curve.<br>The curve passes through (30.5, 22) and (40.5, 37), so the point at height 25 lies between these two. Reading the graph gives about 32.5.<br>Check by calculation: the curve rises 15 pupils over 10 marks between those points. We need 25 − 22 = 3 more pupils, which takes 3 ÷ 15 × 10 = 2 marks. So median = 30.5 + 2 = 32.5.<br><strong>Answer: the median mark is about 32.5.</strong></div>\n<h3 class=\"learn-subheading\">4. Quartiles and the interquartile range</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Quartiles</span> cut the data into four equal parts. There are three of them:</p>\n<ul class=\"learn-list\">\n<li>The <span class=\"learn-keyword\">lower quartile</span> (Q₁) is at position n/4. One quarter of the items are below it.</li>\n<li>The <span class=\"learn-keyword\">middle quartile</span> (Q₂) is the median, at position n/2.</li>\n<li>The <span class=\"learn-keyword\">upper quartile</span> (Q₃) is at position 3n/4. Three quarters of the items are below it.</li>\n</ul>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">interquartile range</span> is Q₃ − Q₁. It tells us how widely the middle half of the data is spread. A small interquartile range means the middle marks are close together.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> From the same ogive (n = 50), estimate Q₁, Q₃ and the interquartile range.<br>Q₁ is at n/4 = 50/4 = 12.5. The curve passes through (20.5, 10) and (30.5, 22). Between them it rises 12 pupils over 10 marks. We need 12.5 − 10 = 2.5 more pupils: 2.5 ÷ 12 × 10 = 2.08 marks. Q₁ = 20.5 + 2.08 = 22.6 (approximately).<br>Q₃ is at 3n/4 = 3 × 50/4 = 37.5. The curve passes through (40.5, 37) and (50.5, 45). It rises 8 pupils over 10 marks. We need 37.5 − 37 = 0.5 more pupils: 0.5 ÷ 8 × 10 = 0.625 marks. Q₃ = 40.5 + 0.625 = 41.1 (approximately).<br>Interquartile range = 41.1 − 22.6 = 18.5.<br><strong>Answer: Q₁ ≈ 22.6, Q₃ ≈ 41.1, interquartile range ≈ 18.5 marks.</strong></div>\n<p class=\"learn-p\">Answers from a graph depend on how carefully you draw and read it. WAEC allows a small range of values, so a graph answer like 22 or 23 for Q₁ would be accepted.</p>\n<h3 class=\"learn-subheading\">5. Percentiles</h3>\n<p class=\"learn-p\">A <span class=\"learn-keyword\">percentile</span> cuts the data into 100 equal parts. The 40th percentile is the value below which 40% of the items lie. In general, the p-th percentile is at position p/100 × n on the cumulative frequency axis. Notice that the lower quartile is the 25th percentile, the median is the 50th percentile and the upper quartile is the 75th percentile.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> From the ogive of the 50 pupils, estimate (a) the 40th percentile (b) the number of pupils who scored below 35 marks (c) the pass mark if the top 10 pupils pass.<br>(a) Position = 40/100 × 50 = 20. The curve passes through (20.5, 10) and (30.5, 22): it rises 12 over 10 marks. We need 20 − 10 = 10 more pupils: 10 ÷ 12 × 10 = 8.33 marks. 40th percentile = 20.5 + 8.33 = 28.8 (approximately).<br>(b) Go up from 35 on the horizontal axis to the curve, then across to the vertical axis. Between (30.5, 22) and (40.5, 37): 35 − 30.5 = 4.5 marks, and 4.5 ÷ 10 × 15 = 6.75 pupils. So the cumulative frequency at 35 is 22 + 6.75 = 28.75, about 29 pupils scored below 35.<br>(c) The top 10 pupils means 50 − 10 = 40 pupils are below the pass mark. Position 40 lies between (40.5, 37) and (50.5, 45). We need 40 − 37 = 3 more pupils: 3 ÷ 8 × 10 = 3.75 marks. Pass mark = 40.5 + 3.75 = 44.25, so about 44 marks.<br><strong>Answer: (a) about 28.8 (b) about 29 pupils (c) about 44 marks.</strong></div>\n<h3 class=\"learn-subheading\">6. Real-life applications</h3>\n<p class=\"learn-p\">The ogive helps with many practical decisions.</p>\n<ul class=\"learn-list\">\n<li>A school finds the pass mark so that a fixed percentage of pupils pass, or the mark for distinction.</li>\n<li>A clinic uses percentiles to compare a child's weight with other children of the same age.</li>\n<li>A company finds the median salary of its workers. The median is often fairer than the mean when a few people earn very high pay.</li>\n<li>A transport union studies the waiting time of passengers at a bus stop and finds the time within which 90% of passengers are served.</li>\n<li>A trader studies daily sales to find the middle half of the days (between Q₁ and Q₃).</li>\n</ul>\n<p class=\"learn-p\">To count items ABOVE a value, subtract the cumulative frequency from the total. In the example, the number of pupils who scored 35 or above is about 50 − 29 = 21.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> <ul class=\"learn-list\">\n<li>Plotting the cumulative frequency at the class mark or the lower limit. Always use the upper class boundary.</li>\n<li>Forgetting the starting point (lower boundary of the first class, with cumulative frequency 0).</li>\n<li>Reading the median at n/2 on the horizontal axis. The position n/2 is found on the VERTICAL axis; the answer is read on the horizontal axis.</li>\n<li>Using straight ruler lines and sharp corners. An ogive is a smooth curve.</li>\n</ul>\n</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC often says: \"Draw a cumulative frequency curve (ogive) for the distribution. Use your graph to estimate (i) the median (ii) the interquartile range (iii) the number of students who scored more than …\". Draw the dotted guide lines on the graph, because they carry marks. Write down the position you used, such as n/2 = 25, before reading. Choose a sensible scale, label both axes, and give the final answers clearly.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> <ul class=\"learn-list\">\n<li>An ogive is a graph of cumulative frequency against upper class boundary.</li>\n<li>Start the curve at the lower boundary of the first class with cumulative frequency 0, and join the points with a smooth S-shaped curve.</li>\n<li>Median: read at n/2. Lower quartile Q₁: read at n/4. Upper quartile Q₃: read at 3n/4.</li>\n<li>Interquartile range = Q₃ − Q₁.</li>\n<li>The p-th percentile is read at p/100 × n.</li>\n<li>Items above a value = total n minus the cumulative frequency at that value.</li>\n</ul>\n</div>",
    "questions": [
      {
        "q": "An ogive is another name for a",
        "o": [
          "frequency polygon",
          "histogram",
          "cumulative frequency curve",
          "pie chart"
        ],
        "a": 2,
        "e": "An ogive is the graph of cumulative frequency, so it is called the cumulative frequency curve. A histogram uses bars for ordinary frequency, not running totals.",
        "h": "It is drawn from running totals.",
        "yr": "SS2"
      },
      {
        "q": "When drawing an ogive, the cumulative frequency is plotted against the",
        "o": [
          "class mark",
          "upper class boundary",
          "lower class limit",
          "class width"
        ],
        "a": 1,
        "e": "The cumulative frequency tells us how many items are at or below the upper end of a class, so we plot it at the upper class boundary. Plotting at the class mark is a common mistake.",
        "h": "Think: how many scored this much or less?",
        "yr": "SS2"
      },
      {
        "q": "The starting point of an ogive is",
        "o": [
          "(0, 0) always",
          "the class mark of the first class with frequency 1",
          "the upper boundary of the first class with cumulative frequency 0",
          "the lower boundary of the first class with cumulative frequency 0"
        ],
        "a": 3,
        "e": "Before the first class no item has been counted, so the cumulative frequency is 0 at the lower boundary of the first class. For example, the curve for the classes 1 – 10, 11 – 20 starts at (0.5, 0).",
        "h": "Nothing has been counted yet.",
        "yr": "SS2"
      },
      {
        "q": "For a distribution of n items, the median is read from the ogive at the cumulative frequency of",
        "o": [
          "n/2",
          "n/4",
          "3n/4",
          "n"
        ],
        "a": 0,
        "e": "The median is the middle value, so half of the items lie below it. That is position n/2 on the vertical axis. The positions n/4 and 3n/4 give the quartiles.",
        "h": "Half of the items.",
        "yr": "SS2"
      },
      {
        "q": "The lower quartile Q₁ is read at the cumulative frequency of",
        "o": [
          "n/2",
          "3n/4",
          "n/4",
          "n/100"
        ],
        "a": 2,
        "e": "The lower quartile has one quarter of the items below it, so its position is n/4. The position 3n/4 belongs to the upper quartile Q₃.",
        "h": "One quarter.",
        "yr": "SS2"
      },
      {
        "q": "The interquartile range is",
        "o": [
          "Q₁ + Q₃",
          "Q₂ − Q₁ only",
          "the largest value minus the smallest value",
          "Q₃ − Q₁"
        ],
        "a": 3,
        "e": "The interquartile range is the spread of the middle half of the data: Q₃ − Q₁. The largest minus the smallest value is the range, not the interquartile range.",
        "h": "Upper quartile minus lower quartile.",
        "yr": "SS2"
      },
      {
        "q": "An ogive is drawn for 80 pupils. At what cumulative frequency is the upper quartile Q₃ read?",
        "o": [
          "60",
          "20",
          "40",
          "80"
        ],
        "a": 0,
        "e": "Q₃ is at 3n/4 = 3 × 80/4 = 60. The value 20 is n/4 (the lower quartile) and 40 is the median position.",
        "h": "Use 3n/4.",
        "yr": "SS2"
      },
      {
        "q": "For 200 workers, the 40th percentile is read at the cumulative frequency of",
        "o": [
          "40",
          "80",
          "100",
          "160"
        ],
        "a": 1,
        "e": "The p-th percentile is at p/100 × n. So 40/100 × 200 = 80. The value 40 is wrong because it uses p alone and forgets to multiply by n/100.",
        "h": "p/100 × n.",
        "yr": "SS2"
      },
      {
        "q": "In an ogive for 50 pupils, the cumulative frequency at the upper boundary 30.5 is 20. How many pupils scored more than 30.5?",
        "o": [
          "20",
          "70",
          "30",
          "25"
        ],
        "a": 2,
        "e": "The cumulative frequency 20 counts those at or below 30.5. The number above is the total minus 20 = 50 − 20 = 30. Giving 20 reads the wrong side of the value.",
        "h": "Total minus the running total.",
        "yr": "SS2"
      },
      {
        "q": "Marks of 60 pupils are grouped. The ogive passes through (20.5, 12) and (30.5, 32), and the median lies between them. Estimate the median.",
        "o": [
          "25.5",
          "22.5",
          "30.5",
          "29.5"
        ],
        "a": 3,
        "e": "n/2 = 30. From (20.5, 12) we need 30 − 12 = 18 more pupils. The curve rises 20 pupils over 10 marks, so 18 pupils need 18 ÷ 20 × 10 = 9 marks. Median = 20.5 + 9 = 29.5.",
        "h": "Find n/2 first, then use the slope between the two points.",
        "yr": "SS2"
      },
      {
        "q": "Which statement is TRUE?",
        "o": [
          "The 25th percentile is the lower quartile",
          "The 50th percentile is the lower quartile",
          "The 75th percentile is the median",
          "The 100th percentile is the upper quartile"
        ],
        "a": 0,
        "e": "25% of the items lie below the lower quartile, so it is the 25th percentile. The median is the 50th percentile and the upper quartile is the 75th percentile.",
        "h": "25 out of 100 is one quarter.",
        "yr": "SS2"
      },
      {
        "q": "The ogive of 50 pupils passes through (40.5, 37). How many pupils scored above 40.5 marks?",
        "o": [
          "37",
          "50",
          "13",
          "87"
        ],
        "a": 2,
        "e": "The number above 40.5 is the total minus the cumulative frequency: 50 − 37 = 13. Reading 37 gives the number at or below 40.5, which is the other side.",
        "h": "Subtract from n.",
        "yr": "SS2"
      },
      {
        "q": "A school wants the top 20% of its 200 candidates to pass. The pass mark is read from the ogive at which cumulative frequency?",
        "o": [
          "40",
          "20",
          "80",
          "160"
        ],
        "a": 3,
        "e": "The top 20% is 40 candidates, so 200 − 40 = 160 candidates are below the pass mark. The pass mark is read at 160, which is the 80th percentile. Reading at 40 would give the bottom 20%.",
        "h": "How many candidates are below the pass mark?",
        "yr": "SS2"
      },
      {
        "q": "In the ogive, the quartiles and median are found by drawing",
        "o": [
          "a vertical line from the horizontal axis to the curve and across to the vertical axis",
          "a horizontal line from the vertical axis to the curve, then down to the horizontal axis",
          "a line along the horizontal axis only",
          "a line joining the first and last points"
        ],
        "a": 1,
        "e": "We start on the vertical axis at the position (such as n/2), go across to the curve, then go down to read the value on the horizontal axis. The position is never found on the horizontal axis.",
        "h": "Position on the vertical axis, answer on the horizontal axis.",
        "yr": "SS2"
      },
      {
        "q": "The cumulative frequency table of 40 items ends with the cumulative frequency",
        "o": [
          "40",
          "the highest frequency",
          "the mean",
          "1"
        ],
        "a": 0,
        "e": "The last cumulative frequency is the total number of items, n = 40. The ogive therefore ends at the top at height n. If it does not, an addition error was made.",
        "h": "It must match the total.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Measures from Frequency",
    "topicCode": "SS2-MATH-22",
    "module": "Statistics",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">A teacher marks a test for 50 pupils and wants one number that tells the class how a \"typical\" pupil did. A trader in Mile 12 market wants the \"typical\" price of a bag of tomatoes. One number that stands for a whole set of data is called a <span class=\"learn-keyword\">measure of central tendency</span>. The three main ones are the <span class=\"learn-keyword\">mean</span>, the <span class=\"learn-keyword\">median</span> and the <span class=\"learn-keyword\">mode</span>. When the data is large and is already put into classes (<span class=\"learn-keyword\">grouped data</span>), we cannot list every score, so we use special methods. In this lesson you will find the median from grouped data and compare it with the mean and the mode.</div>\n<h3 class=\"learn-subheading\">1. Grouped data and what we need from the table</h3>\n<p class=\"learn-p\"><span class=\"learn-keyword\">Grouped data</span> is data that has been sorted into classes, such as 40 – 49, 50 – 59 and so on. The <span class=\"learn-keyword\">frequency</span> (f) of a class is the number of items in it. The <span class=\"learn-keyword\">cumulative frequency</span> (cf) is the running total of the frequencies. The <span class=\"learn-keyword\">class boundaries</span> are the exact edges of a class. For whole numbers, the boundaries are half a unit below the lower limit and half a unit above the upper limit. So the class 40 – 49 has lower boundary 39.5 and upper boundary 49.5. The <span class=\"learn-keyword\">class width</span> (c) is upper boundary minus lower boundary. Here c = 49.5 − 39.5 = 10. The <span class=\"learn-keyword\">class mark</span> (midpoint) is the average of the two limits: (40 + 49) ÷ 2 = 44.5.</p>\n<p class=\"learn-p\">We will use this table for the marks of 50 pupils in a test.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Class (marks)</th><th>Frequency (f)</th><th>Cumulative frequency (cf)</th><th>Class mark (x)</th><th>f × x</th></tr></thead><tbody>\n<tr><td>40 – 49</td><td>6</td><td>6</td><td>44.5</td><td>267</td></tr>\n<tr><td>50 – 59</td><td>10</td><td>16</td><td>54.5</td><td>545</td></tr>\n<tr><td>60 – 69</td><td>18</td><td>34</td><td>64.5</td><td>1161</td></tr>\n<tr><td>70 – 79</td><td>12</td><td>46</td><td>74.5</td><td>894</td></tr>\n<tr><td>80 – 89</td><td>4</td><td>50</td><td>84.5</td><td>338</td></tr>\n<tr><td><strong>Total</strong></td><td><strong>50</strong></td><td></td><td></td><td><strong>3205</strong></td></tr>\n</tbody></table></div>\n<h3 class=\"learn-subheading\">2. The median: the middle value</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">median</span> is the middle value when the data is arranged in order. Half of the items are below it and half are above it. With 50 pupils, the median is at the position 50 ÷ 2 = 25. In grouped data we cannot see the exact 25th score. We can only find the class that contains it. This class is called the <span class=\"learn-keyword\">median class</span>. Then we estimate where the median lies inside that class.</p>\n<h3 class=\"learn-subheading\">3. The formula for the median of grouped data</h3>\n<p class=\"learn-p\">The formula is:</p>\n<p class=\"learn-p\"><strong>Median = L + ((n/2 − F) ÷ f) × c</strong></p>\n<ul class=\"learn-list\">\n<li><strong>L</strong> = lower class boundary of the median class.</li>\n<li><strong>n</strong> = total frequency (Σf).</li>\n<li><strong>F</strong> = cumulative frequency of the class BEFORE the median class.</li>\n<li><strong>f</strong> = frequency of the median class.</li>\n<li><strong>c</strong> = class width of the median class.</li>\n</ul>\n<p class=\"learn-p\">The idea is simple. We start at the lower boundary L. We still need (n/2 − F) more items to reach the middle. The class has f items spread over a width c, so each item takes up c ÷ f of the width. We multiply to find how far to go into the class.</p>\n<h3 class=\"learn-subheading\">4. Steps for finding the median</h3>\n<ol class=\"learn-ordered\">\n<li>Step 1: Add the frequencies to find n.</li>\n<li>Step 2: Work out n/2.</li>\n<li>Step 3: Build the cumulative frequency column. The median class is the first class whose cumulative frequency is greater than or equal to n/2.</li>\n<li>Step 4: Write down L, F, f and c.</li>\n<li>Step 5: Put the numbers in the formula and work it out.</li>\n</ol>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> Find the median mark of the 50 pupils in the table above.<br>Step 1: n = 6 + 10 + 18 + 12 + 4 = 50.<br>Step 2: n/2 = 25.<br>Step 3: The cumulative frequencies are 6, 16, 34, 46, 50. The first one that is 25 or more is 34, so the median class is 60 – 69.<br>Step 4: L = 59.5, F = 16 (the cf of the class before), f = 18, c = 10.<br>Step 5: Median = 59.5 + ((25 − 16) ÷ 18) × 10 = 59.5 + (9 ÷ 18) × 10 = 59.5 + 5 = 64.5.<br><strong>Answer: the median mark is 64.5.</strong></div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> The ages of 40 members of a youth club are shown below. Find the median age.<br>Classes: 5 – 9 (f = 4), 10 – 14 (f = 9), 15 – 19 (f = 14), 20 – 24 (f = 8), 25 – 29 (f = 5).<br>Step 1: n = 4 + 9 + 14 + 8 + 5 = 40.<br>Step 2: n/2 = 20.<br>Step 3: The cumulative frequencies are 4, 13, 27, 35, 40. The first one that is 20 or more is 27, so the median class is 15 – 19.<br>Step 4: L = 14.5, F = 13, f = 14, c = 5 (because 19.5 − 14.5 = 5).<br>Step 5: Median = 14.5 + ((20 − 13) ÷ 14) × 5 = 14.5 + (7 ÷ 14) × 5 = 14.5 + 2.5 = 17.<br><strong>Answer: the median age is 17 years.</strong></div>\n<h3 class=\"learn-subheading\">5. The mean of grouped data</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">mean</span> is the \"fair share\" value. For ungrouped data it is the sum of the items divided by the number of items. For grouped data we do not know the exact scores, so we use the class mark x of each class as its representative.</p>\n<p class=\"learn-p\"><strong>Mean = Σfx ÷ Σf</strong></p>\n<p class=\"learn-p\">We multiply each class mark by its frequency (fx), add these up (Σfx), then divide by the total frequency. For the 50 pupils: Σfx = 267 + 545 + 1161 + 894 + 338 = 3205. So mean = 3205 ÷ 50 = 64.1.</p>\n<p class=\"learn-p\">The mean uses every value, so it is affected by very large or very small values. A few very high salaries can pull the mean up. The median is not affected so much, because it only depends on the middle position.</p>\n<h3 class=\"learn-subheading\">6. The mode of grouped data</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">mode</span> is the value that occurs most often. In grouped data we first find the <span class=\"learn-keyword\">modal class</span>, which is the class with the highest frequency. Then we estimate the mode with this formula:</p>\n<p class=\"learn-p\"><strong>Mode = L + (d₁ ÷ (d₁ + d₂)) × c</strong></p>\n<ul class=\"learn-list\">\n<li><strong>L</strong> = lower boundary of the modal class.</li>\n<li><strong>d₁</strong> = frequency of the modal class minus the frequency of the class BEFORE it.</li>\n<li><strong>d₂</strong> = frequency of the modal class minus the frequency of the class AFTER it.</li>\n<li><strong>c</strong> = class width.</li>\n</ul>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> For the 50 pupils, find the mean, the median and the mode. Then compare them.<br>Mean = Σfx ÷ Σf = 3205 ÷ 50 = 64.1.<br>Median = 64.5 (from Worked Example 1).<br>Mode: the highest frequency is 18, so the modal class is 60 – 69. L = 59.5, d₁ = 18 − 10 = 8, d₂ = 18 − 12 = 6, c = 10. Mode = 59.5 + (8 ÷ (8 + 6)) × 10 = 59.5 + (8 ÷ 14) × 10 = 59.5 + 5.71 = 65.2 (to 1 decimal place).<br>Comparison: mean 64.1, median 64.5, mode 65.2. They are close to each other, so the marks are spread fairly evenly around the middle.<br><strong>Answer: mean = 64.1, median = 64.5, mode ≈ 65.2.</strong></div>\n<h3 class=\"learn-subheading\">7. Comparing the mean, median and mode</h3>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Measure</th><th>What it tells us</th><th>Strength</th><th>Weakness</th></tr></thead><tbody>\n<tr><td>Mean</td><td>The fair share; total divided by number</td><td>Uses every value; easy to use in further calculation</td><td>Pulled up or down by very large or very small values</td></tr>\n<tr><td>Median</td><td>The middle value</td><td>Not affected by extreme values</td><td>Does not use every value</td></tr>\n<tr><td>Mode</td><td>The most common value or class</td><td>Easy to see; useful for things like the most popular shoe size</td><td>May not exist, or there may be more than one; depends on the class chosen</td></tr>\n</tbody></table></div>\n<p class=\"learn-p\">When the data is balanced (symmetrical), the mean, median and mode are about equal. If a few very large values stretch the data to the high side, the mean becomes larger than the median. If a few very small values stretch it to the low side, the mean becomes smaller than the median. This is why news reports on household income often use the median.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> <ul class=\"learn-list\">\n<li>Using the class limit (such as 60) for L instead of the class boundary (59.5). Always use the lower boundary of the class.</li>\n<li>Using the cumulative frequency of the median class as F. F belongs to the class BEFORE the median class.</li>\n<li>Choosing the median class by looking at the highest frequency. The median class is found from n/2 and the cumulative frequency. The highest frequency gives the modal class.</li>\n<li>Mixing up d₁ and d₂ in the mode formula. d₁ uses the class before; d₂ uses the class after.</li>\n</ul>\n</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC often asks: \"The table shows the distribution of marks of some students. (a) Calculate the median. (b) Calculate the mean. (c) State the modal class.\" Always draw the cf column first and show n/2, L, F, f and c before putting them in the formula. These steps earn method marks even if your final arithmetic is wrong. If the question says \"compare\", say which value is larger and give a short reason.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> <ul class=\"learn-list\">\n<li>Grouped data is sorted into classes; use class boundaries and class marks.</li>\n<li>Median = L + ((n/2 − F) ÷ f) × c, where the median class is found from n/2 and the cf column.</li>\n<li>Mean = Σfx ÷ Σf, using the class mark x.</li>\n<li>Mode = L + (d₁ ÷ (d₁ + d₂)) × c, using the modal class (highest frequency).</li>\n<li>Mean uses all values but is affected by extremes; the median is not; the mode is the most common.</li>\n<li>For balanced data the three measures are close to each other.</li>\n</ul>\n</div>",
    "questions": [
      {
        "q": "In grouped data, the median class is the class that",
        "o": [
          "has the highest frequency",
          "has the largest class mark",
          "contains the n/2 th item",
          "is the first class in the table"
        ],
        "a": 2,
        "e": "The median is the middle item, at position n/2. We find the class that contains that position from the cumulative frequency column. The class with the highest frequency is the modal class, not necessarily the median class.",
        "h": "Use the position n/2.",
        "yr": "SS2"
      },
      {
        "q": "The median of grouped data is given by",
        "o": [
          "L + ((n/2 − F) ÷ f) × c",
          "Σfx ÷ Σf",
          "L + (d₁ ÷ (d₁ + d₂)) × c",
          "(highest + lowest) ÷ 2"
        ],
        "a": 0,
        "e": "The median formula is L + ((n/2 − F) ÷ f) × c. The formula Σfx ÷ Σf is for the mean and the one with d₁ and d₂ is for the mode.",
        "h": "Which formula has n/2 and F in it?",
        "yr": "SS2"
      },
      {
        "q": "In the median formula, F stands for",
        "o": [
          "frequency of the median class",
          "total frequency",
          "cumulative frequency of the median class",
          "cumulative frequency of the class before the median class"
        ],
        "a": 3,
        "e": "F is the cumulative frequency up to, but not including, the median class. It tells us how many items are already counted before we enter the median class. Using the cf of the median class itself is a common error.",
        "h": "It is the number of items counted before the median class.",
        "yr": "SS2"
      },
      {
        "q": "The mean of grouped data is found from",
        "o": [
          "Σf ÷ Σfx",
          "Σfx ÷ Σf",
          "Σf × Σx",
          "the highest class mark"
        ],
        "a": 1,
        "e": "Multiply each class mark x by its frequency f, add the results (Σfx), and divide by the total frequency Σf. Dividing the other way round gives a meaningless number.",
        "h": "Total of f × x over total of f.",
        "yr": "SS2"
      },
      {
        "q": "The modal class is the class with",
        "o": [
          "the highest frequency",
          "the highest class mark",
          "the highest cumulative frequency",
          "the widest class"
        ],
        "a": 0,
        "e": "The mode is the most common value, so the modal class is the class with the largest frequency. The class with the highest cumulative frequency is always the last class, which tells us nothing about the mode.",
        "h": "Which class has the most items?",
        "yr": "SS2"
      },
      {
        "q": "The class mark of the class 30 – 39 is",
        "o": [
          "35",
          "39",
          "34.5",
          "34"
        ],
        "a": 2,
        "e": "The class mark is the average of the lower and upper limits: (30 + 39) ÷ 2 = 34.5. The value 35 is the middle of the boundaries only when counting 30 to 40, which is wrong for whole-number classes.",
        "h": "Add the two limits and halve.",
        "yr": "SS2"
      },
      {
        "q": "The lower class boundary of the class 21 – 30 (whole numbers) is",
        "o": [
          "21",
          "20",
          "21.5",
          "20.5"
        ],
        "a": 3,
        "e": "Boundaries are half a unit beyond the limits. The lower limit 21 gives the boundary 21 − 0.5 = 20.5. Using 21 (the limit) in the formula is a common error.",
        "h": "Half a unit below the lower limit.",
        "yr": "SS2"
      },
      {
        "q": "Which measure is NOT strongly affected by a few very large values in the data?",
        "o": [
          "Mean",
          "Median",
          "Total",
          "Σfx"
        ],
        "a": 1,
        "e": "The median depends only on the middle position, so extreme values do not change it much. The mean uses every value, so a few very large values raise it.",
        "h": "Which one depends only on the middle?",
        "yr": "SS2"
      },
      {
        "q": "Frequencies for the classes 1 – 10, 11 – 20, 21 – 30, 31 – 40 are 4, 8, 12 and 6. The median class is",
        "o": [
          "11 – 20",
          "31 – 40",
          "21 – 30",
          "1 – 10"
        ],
        "a": 2,
        "e": "n = 30, so n/2 = 15. The cumulative frequencies are 4, 12, 24, 30. The first that is 15 or more is 24, so the median class is 21 – 30. The class 11 – 20 stops at 12, which is less than 15.",
        "h": "Build the cf column: 4, 12, ...",
        "yr": "SS2"
      },
      {
        "q": "Using the table 1 – 10 (4), 11 – 20 (8), 21 – 30 (12), 31 – 40 (6), the median is",
        "o": [
          "23",
          "20.5",
          "25.5",
          "24.5"
        ],
        "a": 0,
        "e": "n/2 = 15, L = 20.5, F = 12, f = 12, c = 10. Median = 20.5 + ((15 − 12) ÷ 12) × 10 = 20.5 + 2.5 = 23. The value 20.5 forgets to add the part inside the class.",
        "h": "Substitute L = 20.5, F = 12, f = 12, c = 10.",
        "yr": "SS2"
      },
      {
        "q": "For the same table, the modal class is 21 – 30. The mode is estimated as",
        "o": [
          "20.5 + (8 ÷ 14) × 10 = 26.2",
          "20.5 + (6 ÷ 10) × 10 = 26.5",
          "30.5 + (4 ÷ 10) × 10 = 34.5",
          "20.5 + (4 ÷ 10) × 10 = 24.5"
        ],
        "a": 3,
        "e": "d₁ = 12 − 8 = 4 (class before) and d₂ = 12 − 6 = 6 (class after). Mode = 20.5 + (4 ÷ (4 + 6)) × 10 = 24.5. Mixing up d₁ and d₂ would give 26.5.",
        "h": "d₁ uses the class before, d₂ the class after.",
        "yr": "SS2"
      },
      {
        "q": "The class marks of a distribution are 10, 20, 30 with frequencies 5, 10, 5 respectively. The mean is",
        "o": [
          "15",
          "20",
          "10",
          "30"
        ],
        "a": 1,
        "e": "Σfx = 5 × 10 + 10 × 20 + 5 × 30 = 50 + 200 + 150 = 400. Σf = 20. Mean = 400 ÷ 20 = 20. The data is balanced around 20, so this makes sense.",
        "h": "Find Σfx and Σf.",
        "yr": "SS2"
      },
      {
        "q": "A distribution has mean 64.1, median 64.5 and mode 65.2. What does this suggest about the data?",
        "o": [
          "The mean is wrong because it is smaller than the mode",
          "The data has one very large value",
          "The three values are close, so the data is spread fairly evenly about the middle",
          "The median is not possible"
        ],
        "a": 2,
        "e": "When the three measures are close, the data is balanced around the middle. It is normal for them to differ slightly in grouped data because each is only an estimate.",
        "h": "Look at how close the three values are.",
        "yr": "SS2"
      },
      {
        "q": "In a village most people earn small amounts but two people earn very large amounts. Compared with the median, the mean income will be",
        "o": [
          "smaller",
          "exactly equal",
          "impossible to compare",
          "larger"
        ],
        "a": 3,
        "e": "The two very high incomes pull the mean upwards, while the median stays near the middle. So the mean is larger than the median. This is why the median is often used to describe typical incomes.",
        "h": "Which measure is pulled by extreme values?",
        "yr": "SS2"
      },
      {
        "q": "In a grouped table, n = 60, the cumulative frequency before the median class is 22, the median class is 40 – 49 with frequency 16. Find the median.",
        "o": [
          "39.5 + (8 ÷ 16) × 10 = 44.5",
          "40 + (8 ÷ 16) × 10 = 45",
          "39.5 + (30 ÷ 16) × 10 = 58.25",
          "39.5 + (8 ÷ 16) × 9 = 44"
        ],
        "a": 0,
        "e": "n/2 = 30, L = 39.5, F = 22, f = 16, c = 10. Median = 39.5 + ((30 − 22) ÷ 16) × 10 = 39.5 + 5 = 44.5. Using 40 for L (the class limit) gives 45, which is wrong.",
        "h": "Use the boundary 39.5 and the width 10.",
        "yr": "SS2"
      }
    ]
  },
  {
    "topic": "Probability",
    "topicCode": "SS2-MATH-23",
    "module": "Probability",
    "term": "Third Term",
    "contentHTML": "<div class=\"learn-intro\">Will it rain tomorrow? Will NEPA bring light tonight? Will the coin land on heads when the referee tosses it before a football match? We cannot be sure about these things, but we can say how likely they are. The study of how likely something is to happen is called <span class=\"learn-keyword\">probability</span>. Farmers use it to plan planting, insurance companies use it to set prices, and the referee's coin toss is fair because both sides have the same chance. In this lesson you will learn what probability means, how to list all possible outcomes, and how to work with <span class=\"learn-keyword\">mutually exclusive</span>, <span class=\"learn-keyword\">independent</span> and <span class=\"learn-keyword\">complementary</span> events.</div>\n<h3 class=\"learn-subheading\">1. Meaning of probability</h3>\n<p class=\"learn-p\">An <span class=\"learn-keyword\">experiment</span> is any action whose result we observe, such as tossing a coin or throwing a die. A <span class=\"learn-keyword\">trial</span> is one performance of the experiment. An <span class=\"learn-keyword\">outcome</span> is one possible result, such as \"head\". An <span class=\"learn-keyword\">event</span> is an outcome or a group of outcomes that we are interested in, such as \"an even number on a die\".</p>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">probability</span> of an event is a number that measures how likely it is to happen. When all outcomes are equally likely:</p>\n<p class=\"learn-p\"><strong>P(event) = number of outcomes in the event ÷ total number of possible outcomes</strong></p>\n<p class=\"learn-p\">For a fair die, the chance of getting a 5 is 1 out of 6, so P(5) = 1/6. The probability of any event is always between 0 and 1.</p>\n<ul class=\"learn-list\">\n<li>Probability 0 means the event is impossible, such as getting a 7 on a normal die.</li>\n<li>Probability 1 means the event is certain, such as getting a number less than 7 on a normal die.</li>\n<li>A probability like 1/2 means the event is as likely to happen as not to happen.</li>\n</ul>\n<p class=\"learn-p\">A probability can be written as a fraction, a decimal or a percentage. For example, 1/4 = 0.25 = 25%. A probability can never be negative and can never be greater than 1.</p>\n<h3 class=\"learn-subheading\">2. Sample space</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">sample space</span> is the list of ALL possible outcomes of an experiment. It is usually written inside curly brackets and called S. The total number of outcomes is written n(S).</p>\n<ul class=\"learn-list\">\n<li>Toss one coin: S = {H, T}, so n(S) = 2.</li>\n<li>Throw one die: S = {1, 2, 3, 4, 5, 6}, so n(S) = 6.</li>\n<li>Toss two coins: S = {HH, HT, TH, TT}, so n(S) = 4.</li>\n</ul>\n<p class=\"learn-p\">For two dice we can use a table. There are 6 × 6 = 36 pairs, from (1, 1) to (6, 6). The pairs whose total is 7 are (1, 6), (2, 5), (3, 4), (4, 3), (5, 2) and (6, 1). That is 6 pairs, so P(total 7) = 6/36 = 1/6. Listing the sample space carefully stops us from missing outcomes.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 1:</strong> A bag contains 5 red balls, 3 blue balls and 2 green balls. One ball is picked at random. Find (a) P(red) (b) P(blue) (c) P(not green).<br>Total number of balls = 5 + 3 + 2 = 10. \"At random\" means each ball has the same chance of being picked.<br>(a) P(red) = 5/10 = 1/2.<br>(b) P(blue) = 3/10.<br>(c) Balls that are not green = 5 + 3 = 8, so P(not green) = 8/10 = 4/5.<br><strong>Answer: (a) 1/2 (b) 3/10 (c) 4/5.</strong></div>\n<h3 class=\"learn-subheading\">3. Complementary events</h3>\n<p class=\"learn-p\">The <span class=\"learn-keyword\">complement</span> of an event A is the event that A does NOT happen. We write it as A′ (read \"A prime\" or \"not A\"). Either A happens or it does not, and one of the two must occur. So the two probabilities add up to 1.</p>\n<p class=\"learn-p\"><strong>P(A) + P(A′) = 1, so P(A′) = 1 − P(A)</strong></p>\n<p class=\"learn-p\">This is very useful when it is easier to count the cases where the event does NOT happen. In Worked Example 1, P(green) = 2/10 = 1/5, so P(not green) = 1 − 1/5 = 4/5. This gives the same answer as before.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 2:</strong> The weather office says the probability that it rains in Lagos tomorrow is 0.35. What is the probability that it does not rain?<br>P(no rain) = 1 − P(rain) = 1 − 0.35 = 0.65.<br><strong>Answer: 0.65 (or 65%).</strong></div>\n<h3 class=\"learn-subheading\">4. Mutually exclusive events</h3>\n<p class=\"learn-p\">Two events are <span class=\"learn-keyword\">mutually exclusive</span> if they cannot happen at the same time. When you throw a die once, \"getting a 2\" and \"getting a 5\" are mutually exclusive, because one throw cannot show both. For mutually exclusive events A and B, the probability that A OR B happens is found by adding.</p>\n<p class=\"learn-p\"><strong>P(A or B) = P(A) + P(B)</strong></p>\n<p class=\"learn-p\">In Worked Example 1, picking a red ball and picking a blue ball cannot happen together (one pick gives one ball). So P(red or blue) = 5/10 + 3/10 = 8/10 = 4/5.</p>\n<p class=\"learn-p\">If the two events CAN happen together, they are not mutually exclusive, and we must not count the overlap twice. The rule becomes P(A or B) = P(A) + P(B) − P(A and B). For example, on one throw of a die let A be \"an even number\" {2, 4, 6} and B be \"a number greater than 3\" {4, 5, 6}. The outcomes 4 and 6 are in both. P(A or B) = 3/6 + 3/6 − 2/6 = 4/6 = 2/3. You can check: the outcomes in A or B are {2, 4, 5, 6}, which is 4 outcomes out of 6.</p>\n<h3 class=\"learn-subheading\">5. Independent events</h3>\n<p class=\"learn-p\">Two events are <span class=\"learn-keyword\">independent</span> if the result of one does not change the probability of the other. Tossing a coin and throwing a die are independent: the coin does not know what the die shows. For independent events A and B, the probability that A AND B both happen is found by multiplying.</p>\n<p class=\"learn-p\"><strong>P(A and B) = P(A) × P(B)</strong></p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 3:</strong> A fair coin is tossed and a fair die is thrown. Find the probability of a head and a 6.<br>P(head) = 1/2 and P(6) = 1/6. The two events are independent.<br>P(head and 6) = 1/2 × 1/6 = 1/12.<br>Check with the sample space: there are 2 × 6 = 12 equally likely outcomes, and only one of them is (H, 6).<br><strong>Answer: 1/12.</strong></div>\n<p class=\"learn-p\">Be careful with picking items one after another. If a ball is picked, put back, and the next ball is picked, we say <span class=\"learn-keyword\">with replacement</span>. The two picks are independent because the bag is the same each time. If the first ball is NOT put back (<span class=\"learn-keyword\">without replacement</span>), the bag changes, so the second pick depends on the first.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">✏️</span><strong>Worked Example 4:</strong> Using the bag of 5 red, 3 blue and 2 green balls (10 balls), two balls are picked one after the other. Find P(red first, then blue) (a) with replacement (b) without replacement.<br>(a) With replacement the bag is the same each time. P = 5/10 × 3/10 = 15/100 = 3/20.<br>(b) Without replacement, after a red ball is removed there are 9 balls left and still 3 are blue. P = 5/10 × 3/9 = 15/90 = 1/6.<br><strong>Answer: (a) 3/20 (b) 1/6.</strong></div>\n<h3 class=\"learn-subheading\">6. Solving probability problems: which rule?</h3>\n<p class=\"learn-p\">Many students lose marks because they do not know whether to add or multiply. Use this guide.</p>\n<div class=\"learn-table-wrap\"><table class=\"learn-table\"><thead><tr><th>Key word in the question</th><th>What to do</th><th>Rule</th></tr></thead><tbody>\n<tr><td>\"or\" (either one or the other, cannot both happen)</td><td>Add</td><td>P(A or B) = P(A) + P(B)</td></tr>\n<tr><td>\"and\", \"both\", \"then\" (independent events)</td><td>Multiply</td><td>P(A and B) = P(A) × P(B)</td></tr>\n<tr><td>\"not\", \"at least one\", \"fails to\"</td><td>Subtract from 1</td><td>P(A′) = 1 − P(A)</td></tr>\n</tbody></table></div>\n<ol class=\"learn-ordered\">\n<li>Step 1: Read the question and write down the events with their probabilities.</li>\n<li>Step 2: Decide if the events are mutually exclusive, independent or complementary.</li>\n<li>Step 3: Choose the rule from the table and calculate.</li>\n<li>Step 4: Give the answer as a fraction in its simplest form, and check that it lies between 0 and 1.</li>\n</ol>\n<p class=\"learn-p\">A quick example: the probability that a student passes Mathematics is 3/4 and the probability that the same student passes English is 2/3. If the two results are independent, P(passes both) = 3/4 × 2/3 = 6/12 = 1/2. The probability of failing Mathematics is 1 − 3/4 = 1/4.</p>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">⚠️</span><strong>Common Mistakes</strong> <ul class=\"learn-list\">\n<li>Adding when the word is \"and\". For independent events \"and\" means multiply, and the answer gets smaller, not bigger.</li>\n<li>Forgetting to change the total for the second pick when the first item is not replaced.</li>\n<li>Giving a probability greater than 1 or a negative one. Always check that your answer is between 0 and 1.</li>\n<li>Writing the probability as \"1 out of 6\" in a calculation without turning it into 1/6, or forgetting to simplify the fraction at the end.</li>\n</ul>\n</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">💡</span><strong>Exam Tip</strong> WAEC often asks: \"A bag contains 4 red and 6 white balls. Two balls are drawn one after the other (a) with replacement (b) without replacement. Find the probability that both are red.\" It also asks for the sum of two dice or for the probability of a student being chosen from a class list. Always write the total number first (for example n(S) = 36), write the formula, show the working and leave the answer as a simplified fraction unless the question asks for a decimal or percentage.</div>\n<div class=\"learn-tip-box\"><span class=\"learn-tip-icon\">🎯</span><strong>Summary</strong> <ul class=\"learn-list\">\n<li>Probability = number of favourable outcomes ÷ total number of outcomes. It lies between 0 and 1.</li>\n<li>The sample space S is the list of all possible outcomes.</li>\n<li>Complementary events: P(A′) = 1 − P(A).</li>\n<li>Mutually exclusive events cannot happen together: P(A or B) = P(A) + P(B).</li>\n<li>Independent events do not affect each other: P(A and B) = P(A) × P(B).</li>\n<li>Without replacement, the second probability changes because the total has changed.</li>\n</ul>\n</div>",
    "questions": [
      {
        "q": "The probability of an event that is certain to happen is",
        "o": [
          "0",
          "1",
          "1/2",
          "100"
        ],
        "a": 1,
        "e": "A certain event has probability 1. An impossible event has probability 0, and a probability can never be 100 because it is never greater than 1 (100% is the same as 1).",
        "h": "The largest possible probability.",
        "yr": "SS2"
      },
      {
        "q": "Which of these CANNOT be a probability?",
        "o": [
          "0.25",
          "1",
          "1.2",
          "0"
        ],
        "a": 2,
        "e": "A probability must lie between 0 and 1. The number 1.2 is greater than 1, so it cannot be a probability.",
        "h": "Check the limits 0 and 1.",
        "yr": "SS2"
      },
      {
        "q": "The sample space for tossing two coins is",
        "o": [
          "{HH, HT, TH, TT}",
          "{HH, TT}",
          "{H, T}",
          "{HH, HT, TT}"
        ],
        "a": 0,
        "e": "Each coin can show H or T, so there are 2 × 2 = 4 outcomes: HH, HT, TH and TT. HT and TH are different outcomes, so option {HH, HT, TT} misses one.",
        "h": "List the outcomes for coin 1 then coin 2.",
        "yr": "SS2"
      },
      {
        "q": "When two fair dice are thrown, the number of outcomes in the sample space is",
        "o": [
          "12",
          "30",
          "6",
          "36"
        ],
        "a": 3,
        "e": "Each die has 6 outcomes, so the pairs number 6 × 6 = 36. The number 12 comes from adding 6 + 6, which is the wrong operation.",
        "h": "Multiply, do not add.",
        "yr": "SS2"
      },
      {
        "q": "A fair die is thrown once. The probability of getting an even number is",
        "o": [
          "1/6",
          "1/2",
          "2/3",
          "1/3"
        ],
        "a": 1,
        "e": "The even numbers are 2, 4 and 6, which is 3 outcomes out of 6. P = 3/6 = 1/2. The value 1/6 is the chance of one particular number only.",
        "h": "Count the even numbers.",
        "yr": "SS2"
      },
      {
        "q": "Two events that cannot happen at the same time are called",
        "o": [
          "mutually exclusive events",
          "complementary events",
          "independent events",
          "equally likely events"
        ],
        "a": 0,
        "e": "Mutually exclusive events cannot occur together, such as getting a 2 and a 5 on one throw of a die. Independent events can happen together without affecting each other.",
        "h": "One throw gives only one result.",
        "yr": "SS2"
      },
      {
        "q": "A bag has 4 red and 6 white balls. One ball is picked at random. The probability that it is white is",
        "o": [
          "2/5",
          "6/4",
          "3/5",
          "1/6"
        ],
        "a": 2,
        "e": "The total is 4 + 6 = 10 balls, and 6 are white. P(white) = 6/10 = 3/5. The value 6/4 is greater than 1, so it cannot be a probability, and it divides by the red balls only.",
        "h": "Divide by the total number of balls.",
        "yr": "SS2"
      },
      {
        "q": "The probability that it rains tomorrow is 0.28. The probability that it does not rain is",
        "o": [
          "0.28",
          "0.82",
          "1.28",
          "0.72"
        ],
        "a": 3,
        "e": "The events are complementary, so P(no rain) = 1 − 0.28 = 0.72. The answer 0.82 comes from a subtraction slip, and 1.28 is impossible because it is greater than 1.",
        "h": "The two probabilities add up to 1.",
        "yr": "SS2"
      },
      {
        "q": "A fair die is thrown once. The probability of getting a 2 or a 5 is",
        "o": [
          "1/36",
          "1/3",
          "1/6",
          "2/3"
        ],
        "a": 1,
        "e": "Getting a 2 and getting a 5 are mutually exclusive, so we add: 1/6 + 1/6 = 2/6 = 1/3. Multiplying (1/36) is wrong, because the word is \"or\", not \"and\".",
        "h": "Add for \"or\" when events cannot occur together.",
        "yr": "SS2"
      },
      {
        "q": "A fair coin is tossed and a fair die is thrown. The probability of a head and an even number is",
        "o": [
          "1/12",
          "1/2",
          "1/4",
          "2/3"
        ],
        "a": 2,
        "e": "The events are independent, so we multiply: 1/2 × 3/6 = 1/2 × 1/2 = 1/4. Option 1/12 would be the chance of a head and one particular number.",
        "h": "Multiply the two separate probabilities.",
        "yr": "SS2"
      },
      {
        "q": "P(A) = 0.3 and P(B) = 0.5, where A and B are mutually exclusive. P(A or B) is",
        "o": [
          "0.8",
          "0.2",
          "0.15",
          "0.35"
        ],
        "a": 0,
        "e": "For mutually exclusive events we add the probabilities: 0.3 + 0.5 = 0.8. Multiplying gives 0.15, which is the rule for independent events with the word \"and\".",
        "h": "Which operation is used for \"or\"?",
        "yr": "SS2"
      },
      {
        "q": "Two fair dice are thrown. The probability that the total score is 7 is",
        "o": [
          "1/12",
          "1/7",
          "7/36",
          "1/6"
        ],
        "a": 3,
        "e": "The pairs with total 7 are (1,6), (2,5), (3,4), (4,3), (5,2), (6,1), which is 6 pairs out of 36. P = 6/36 = 1/6. The value 7/36 wrongly uses the number 7 as the count.",
        "h": "Count the pairs that add to 7.",
        "yr": "SS2"
      },
      {
        "q": "A bag has 4 red and 6 white balls. Two balls are drawn one after the other WITHOUT replacement. The probability that both are red is",
        "o": [
          "16/100",
          "2/15",
          "4/25",
          "2/5"
        ],
        "a": 1,
        "e": "The first red has probability 4/10. Then 3 red balls remain out of 9 balls, so the second is 3/9. P = 4/10 × 3/9 = 12/90 = 2/15. The value 16/100 is for the case WITH replacement.",
        "h": "The second total is 9, not 10.",
        "yr": "SS2"
      },
      {
        "q": "The same bag (4 red, 6 white) is used, but each ball is put back before the next is drawn. The probability that both are red is",
        "o": [
          "2/15",
          "3/10",
          "4/25",
          "16/10"
        ],
        "a": 2,
        "e": "The bag is the same each time, so the picks are independent: 4/10 × 4/10 = 16/100 = 4/25. The value 2/15 is for picking without replacement.",
        "h": "The total stays 10 each time.",
        "yr": "SS2"
      },
      {
        "q": "The probability that a student passes Mathematics is 3/4 and the probability that the same student passes English is 2/3. If the results are independent, the probability that the student passes Mathematics but fails English is",
        "o": [
          "1/4",
          "1/12",
          "5/12",
          "1/2"
        ],
        "a": 0,
        "e": "P(fails English) = 1 − 2/3 = 1/3. Then P(passes Maths and fails English) = 3/4 × 1/3 = 3/12 = 1/4. The answer 1/2 is the chance of passing both.",
        "h": "First find P(fails English), then multiply.",
        "yr": "SS2"
      }
    ]
  }
];
