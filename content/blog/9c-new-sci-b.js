BLOG_POSTS.push({
  id: "circle-theorems-and-mensuration-solved-for-waec-neco-and-jamb",
  title: "Circle Theorems and Mensuration Solved: WAEC, NECO and JAMB Maths",
  category: "lessons",
  categoryLabel: "Lessons",
  author: "Michael Joseph",
  authorAvatar: "avatar_1",
  publishAt: "2026-12-04T07:00:00+01:00",
  readTime: 10,
  scene: "calculator",
  tags: ["circle theorems", "mensuration", "arc length", "sector area", "cone volume", "WAEC maths", "NECO maths", "JAMB maths"],
  excerpt: "Every circle theorem you need, in plain words, with a quick way to decide which one a question wants, plus arc length, sector area, chords and the area and volume of cylinders, cones, spheres and frustums, all solved with real numbers.",
  seo: {
    title: "Circle Theorems and Mensuration Solved: WAEC, NECO, JAMB",
    description: "All circle theorems in words, how to spot the right one, arc length, sector area, cylinder, cone, sphere and frustum questions solved step by step.",
    keywords: "circle theorems WAEC, circle theorems with examples, mensuration WAEC, arc length and sector area, volume of cone and frustum, JAMB maths circle"
  },
  faq: [
    { q: "How many circle theorems do I need for WAEC, NECO and JAMB?", a: "Seven carry almost every question: angle at the centre, angles in the same segment, angle in a semicircle, opposite angles of a cyclic quadrilateral, tangent perpendicular to radius, alternate segment theorem, and equal tangents from an external point." },
    { q: "Which value of pi should I use in the exam?", a: "Use the value the question gives. If it says use 22/7 or 3.142, use exactly that. If nothing is stated, 22/7 is the usual choice for WAEC and NECO, and the answer options in JAMB will show which one was used." },
    { q: "How do I find the slant height of a cone?", a: "Use Pythagoras. The slant height l, the vertical height h and the base radius r form a right-angled triangle, so l is the square root of h squared plus r squared." },
    { q: "What is the difference between a chord, an arc and a sector?", a: "A chord is a straight line joining two points on a circle. An arc is the curved part of the circle between two points. A sector is the slice of the circle enclosed by two radii and the arc between them." },
    { q: "How do I find the volume of a frustum?", a: "Treat it as a big cone with a small cone cut off the top. Find the volume of the big cone, find the volume of the small cone using similar triangles, and subtract." },
    { q: "Why do I keep losing marks on circle theorem questions?", a: "Usually because the answer shows no reason. WAEC and NECO give marks for naming the theorem, so write a short reason beside every angle you find." }
  ],
  content: `
<h2>Why circles collect marks and lose marks</h2>
<p>Circle geometry and mensuration are reliable sources of marks in WAEC, NECO and JAMB Mathematics: the same seven theorems and the same few formulas keep returning. Students lose marks because they cannot tell which theorem applies, and because of slips with pi, radius and diameter.</p>
<p>This post fixes both, with every calculation checked. Wherever pi appears the working uses 22/7 and says so; in your exam use the value the question states.</p>

<h2>The seven circle theorems in plain words</h2>
<p>Picture a circle with centre O. Points A, B, C, D lie on the circumference.</p>
<table>
<tr><th>Theorem</th><th>Statement in words</th><th>Picture</th></tr>
<tr><td>1. Angle at the centre</td><td>The angle a chord makes at the centre is twice the angle it makes at the circumference, when both stand on the same arc.</td><td>Two lines from A and B meet at O, and two lines from A and B meet at a point C on the rim. Angle AOB is double angle ACB.</td></tr>
<tr><td>2. Same segment</td><td>Angles at the circumference standing on the same chord (same arc), on the same side, are equal.</td><td>Chord AB, and two points C and D on the same side. Angle ACB equals angle ADB.</td></tr>
<tr><td>3. Semicircle</td><td>The angle in a semicircle is 90 degrees.</td><td>AB is a diameter, C is any point on the rim. Angle ACB is a right angle.</td></tr>
<tr><td>4. Cyclic quadrilateral</td><td>Opposite angles of a four-sided figure with all corners on the circle add up to 180 degrees. An exterior angle equals the opposite interior angle.</td><td>ABCD around the rim. Angle A plus angle C is 180. Angle B plus angle D is 180.</td></tr>
<tr><td>5. Tangent and radius</td><td>A tangent meets the radius at the point of contact at 90 degrees.</td><td>A line touching the circle at T, and OT drawn to it. Angle OTP is a right angle.</td></tr>
<tr><td>6. Alternate segment</td><td>The angle between a tangent and a chord equals the angle in the alternate segment, on the other side of the chord.</td><td>Tangent at T, chord TB. The angle between them equals the angle TCB where C is on the far side of the chord.</td></tr>
<tr><td>7. Tangents from a point</td><td>Two tangents drawn from one outside point are equal in length, and the line from that point to the centre bisects the angle between them.</td><td>P outside the circle, touching at A and B. PA equals PB.</td></tr>
</table>
[[callout key|Three facts behind everything|Radii are equal, so a triangle of two radii is isosceles. Angles in a triangle add to 180. Angles on a straight line add to 180.]]

<h2>How to spot which theorem to use</h2>
<p>Do not search your memory for a theorem. Scan the diagram for a clue, and the clue names the theorem.</p>
<table>
<tr><th>What you see</th><th>Use</th></tr>
<tr><td>O the centre appears, and an angle at O and an angle on the rim share the same two end points</td><td>Angle at the centre is twice</td></tr>
<tr><td>Two angles on the rim looking at the same chord from the same side</td><td>Same segment, equal</td></tr>
<tr><td>A diameter is drawn, or a line passes through O</td><td>Semicircle, 90 degrees</td></tr>
<tr><td>Four points on the circle joined into a quadrilateral</td><td>Cyclic quadrilateral, 180</td></tr>
<tr><td>A line touching the circle at one point and a radius to that point</td><td>Tangent meets radius at 90</td></tr>
<tr><td>A tangent and a chord starting from the same point</td><td>Alternate segment</td></tr>
<tr><td>Two tangents leaving the same outside point</td><td>Equal tangents, isosceles triangle</td></tr>
</table>
<p>If stuck, draw in a radius: it creates an isosceles triangle.</p>

<h2>Circle theorem questions solved</h2>
[[qa A, B and C lie on a circle with centre O. Angle AOB is 100 degrees. Find angle ACB, where C is on the major arc|Angle at the centre is twice the angle at the circumference when both stand on arc AB ; Angle ACB = 100 divided by 2 = 50 degrees|50 degrees (reason: angle at the centre is twice the angle at the circumference)]]
[[qa ABCD is a cyclic quadrilateral. Angle ABC is 112 degrees. Find angle ADC|Opposite angles of a cyclic quadrilateral add up to 180 degrees ; Angle ADC = 180 - 112 = 68|68 degrees (reason: opposite angles of a cyclic quadrilateral)]]
[[qa PT is a tangent to a circle with centre O, touching at T. Angle TPO is 28 degrees. Find angle POT|The tangent meets the radius OT at 90 degrees so angle OTP = 90 ; Angles in triangle POT add up to 180 ; Angle POT = 180 - 90 - 28 = 62|62 degrees (reason: tangent perpendicular to radius, angle sum of a triangle)]]
[[qa PA and PB are tangents from P to a circle, touching at A and B. Angle APB is 50 degrees. Find angle PAB|Tangents from an outside point are equal so PA = PB and triangle PAB is isosceles ; Base angles are equal so each is (180 - 50) divided by 2 = 130 divided by 2 = 65|65 degrees (reason: equal tangents, isosceles triangle)]]
<p>One more that uses the alternate segment theorem. A tangent at T and a chord TB make an angle of 48 degrees on one side of the chord. C is a point on the circle in the opposite segment. Then angle TCB equals 48 degrees, because the angle between the tangent and the chord equals the angle in the alternate segment.</p>

<h2>Arc length, sector area and chords</h2>
<p>A sector is a fraction of the whole circle. The fraction is the angle at the centre divided by 360. Everything else is that fraction times the whole-circle formula.</p>
[[formula Arc length and sector area|Arc = (theta / 360) x 2 x pi x r ; Sector area = (theta / 360) x pi x r<sup>2</sup>|theta is the angle at the centre in degrees, r is the radius. Perimeter of a sector = arc + 2r.]]
<p>Circumference is 2 pi r and circle area is pi r<sup>2</sup> (square the radius, not the diameter). For a chord at distance d from the centre, half the chord, d and r form a right triangle, so chord = 2 sqrt(r<sup>2</sup> - d<sup>2</sup>).</p>
[[qa A sector of a circle of radius 14 cm has an angle of 60 degrees at the centre. Find its arc length and perimeter. Take pi = 22/7|Arc = 60/360 x 2 x 22/7 x 14 ; 2 x 22/7 x 14 = 88 so the whole circumference is 88 cm ; Arc = 88 divided by 6 = 14.67 cm (44/3 cm) ; Perimeter = arc + two radii = 14.67 + 28|Arc = 14.67 cm, perimeter = 42.67 cm]]
[[qa Find the area of a sector of radius 21 cm and angle 120 degrees. Take pi = 22/7|Fraction of circle = 120/360 = 1/3 ; Area of whole circle = 22/7 x 21 x 21 = 22 x 3 x 21 = 1386 ; Sector area = 1386 divided by 3 = 462|462 cm<sup>2</sup>]]
[[qa A chord is 5 cm from the centre of a circle of radius 13 cm. Find the length of the chord|A perpendicular from the centre to a chord bisects it, so draw it ; Half the chord = sqrt(13<sup>2</sup> - 5<sup>2</sup>) = sqrt(169 - 25) = sqrt(144) = 12 ; Chord = 2 x 12 = 24|24 cm]]
<p>Backwards version: radius 7 cm and arc 11 cm give (theta/360) x 44 = 11, so theta = 90 degrees.</p>

<h2>Cylinders, cones, spheres and frustums</h2>
<table>
<tr><th>Solid</th><th>Volume</th><th>Curved surface</th><th>Total surface</th></tr>
<tr><td>Cylinder</td><td>pi r<sup>2</sup> h</td><td>2 pi r h</td><td>2 pi r h + 2 pi r<sup>2</sup></td></tr>
<tr><td>Cone</td><td>(1/3) pi r<sup>2</sup> h</td><td>pi r l</td><td>pi r l + pi r<sup>2</sup></td></tr>
<tr><td>Sphere</td><td>(4/3) pi r<sup>3</sup></td><td>4 pi r<sup>2</sup></td><td>4 pi r<sup>2</sup></td></tr>
</table>
<p>In a cone, r is the base radius, h the vertical height and l the slant height, l<sup>2</sup> = r<sup>2</sup> + h<sup>2</sup>.</p>
[[qa A cylinder has radius 7 cm and height 10 cm. Find its volume and total surface area. Take pi = 22/7|Volume = 22/7 x 7 x 7 x 10 = 22 x 7 x 10 = 1540 ; Curved surface = 2 x 22/7 x 7 x 10 = 440 ; Each circular end = 22/7 x 49 = 154, two ends = 308 ; Total = 440 + 308 = 748|Volume = 1540 cm<sup>3</sup>, total surface area = 748 cm<sup>2</sup>]]
[[qa A cone has base radius 7 cm and vertical height 24 cm. Find the slant height, volume and curved surface area. Take pi = 22/7|Slant height l = sqrt(7<sup>2</sup> + 24<sup>2</sup>) = sqrt(49 + 576) = sqrt(625) = 25 ; Volume = 1/3 x 22/7 x 49 x 24 = 1/3 x 22 x 7 x 24 = 1232 ; Curved surface = 22/7 x 7 x 25 = 550|l = 25 cm, volume = 1232 cm<sup>3</sup>, curved surface area = 550 cm<sup>2</sup>]]
[[qa Find the volume and surface area of a sphere of radius 21 cm. Take pi = 22/7|Volume = 4/3 x 22/7 x 21 x 21 x 21 = 4/3 x 22/7 x 9261 ; 9261 divided by 7 = 1323 so 22 x 1323 = 29106 ; 29106 x 4/3 = 38808 ; Surface area = 4 x 22/7 x 441 = 4 x 22 x 63 = 5544|Volume = 38808 cm<sup>3</sup>, surface area = 5544 cm<sup>2</sup>]]
<h3>The frustum made simple</h3>
<p>A frustum is a cone with the top cut off parallel to the base, like a bucket. Method: full cone, minus small cone.</p>
[[qa A cone of base radius 6 cm and height 12 cm has a small cone of height 6 cm cut off from the top by a cut parallel to the base. Find the volume of the frustum left. Take pi = 22/7|The small cone is similar to the big one, and its height is half, so its radius is half of 6 = 3 cm ; Big cone = 1/3 x 22/7 x 36 x 12 = 1/3 x 22/7 x 432 ; Small cone = 1/3 x 22/7 x 9 x 6 = 1/3 x 22/7 x 54 ; Frustum = 1/3 x 22/7 x (432 - 54) = 1/3 x 22/7 x 378 = 22 x 18 = 396|396 cm<sup>3</sup>]]
<p>Check: heights and radii are in ratio 1 to 2, so volumes are 1 to 8 and the frustum is 7/8 of the big cone: 7/8 of 452.57 is 396.</p>

<h3>Sector bent into a cone</h3>
<p>WAEC likes to bend a sector into a cone. The arc of the sector becomes the circumference of the cone base, and the sector radius becomes the slant height.</p>
[[qa A sector of radius 10 cm and angle 216 degrees is bent to form a cone. Find the base radius, the height and the volume. Take pi = 22/7|Arc length = 216/360 x 2 x pi x 10 = 0.6 x 20 pi = 12 pi ; This is the base circumference, so 2 pi r = 12 pi and r = 6 ; Slant height = 10, so h = sqrt(100 - 36) = sqrt(64) = 8 ; Volume = 1/3 x 22/7 x 36 x 8 = 2112/7 = 301.7|r = 6 cm, h = 8 cm, volume = 301.7 cm<sup>3</sup>]]
<p>Pouring and recasting questions work the same way: volume is conserved, so set the two volumes equal.</p>

<h2>Common mistakes</h2>
[[compare Common mistake|Better way|Using diameter in pi r<sup>2</sup> ; Using h instead of l in the curved area of a cone ; Giving an angle with no reason|Halve the diameter first and write r = ; Find l by Pythagoras then use pi r l ; Write the theorem in brackets beside the angle]]
<ul>
<li><strong>Applying angle at the centre to the wrong arc.</strong> The doubling only works when both angles stand on the same arc. Check which side of the chord each angle sits.</li>
<li><strong>Rounding early.</strong> Keep fractions like 44/3 until the last line.</li>
</ul>

<h2>Practice set with answers</h2>
<p>Use pi = 22/7 where needed.</p>
<ol>
<li>The angle at the circumference on an arc is 37 degrees. Find the angle at the centre on the same arc.</li>
<li>In cyclic quadrilateral ABCD, angle A is 85 degrees. Find the opposite angle C.</li>
<li>Tangent PA and radius OA of a circle. Angle AOP is 54 degrees. Find angle APO.</li>
<li>Find the arc length of a sector of radius 21 cm and angle 40 degrees.</li>
<li>Find the area of a sector of radius 7 cm and angle 90 degrees.</li>
<li>Find the volume of a cone of base radius 7 cm and height 6 cm.</li>
<li>An open cylinder (no top) has radius 7 cm and height 12 cm. Find its total outside surface area including the base.</li>
<li>A chord of length 16 cm lies in a circle of radius 10 cm. How far is the chord from the centre?</li>
</ol>
<p><strong>Answers:</strong> 1. 74 degrees. 2. 95 degrees. 3. 36 degrees. 4. 14.67 cm (44/3). 5. 38.5 cm<sup>2</sup>. 6. 308 cm<sup>3</sup>. 7. 528 + 154 = 682 cm<sup>2</sup>. 8. Half chord is 8, so distance = sqrt(100 - 64) = 6 cm.</p>

<h2>What to do today</h2>
[[checklist Copy the seven theorems in your own words ; Redo the angle questions without looking ; Write the cone and sphere formulas from memory ; Do two past-question circle problems with a reason beside every angle]]
`
},{
  id: "digestive-system-and-food-tests-biology-for-waec-neco-and-jamb",
  title: "Digestive System and Food Tests: Biology for WAEC, NECO and JAMB",
  category: "lessons",
  categoryLabel: "Lessons",
  author: "Michael Joseph",
  authorAvatar: "avatar_1",
  publishAt: "2026-12-10T07:00:00+01:00",
  readTime: 10,
  scene: "flask",
  tags: ["digestive system", "food tests", "Benedict's test", "enzymes", "balanced diet", "deficiency diseases", "WAEC biology", "NECO biology", "JAMB biology"],
  excerpt: "Classes of food, the five food tests with exact colour changes, the digestive system part by part, a table of digestive enzymes, absorption, balanced diet and deficiency diseases, and how all of it is tested in theory and practical papers.",
  seo: {
    title: "Digestive System and Food Tests: WAEC, NECO, JAMB Biology",
    description: "Food tests with expected colours, digestive enzymes table, absorption, balanced diet and deficiency diseases explained for WAEC, NECO and JAMB Biology.",
    keywords: "food tests biology WAEC, Benedict's test, digestive enzymes table, digestive system WAEC, deficiency diseases, balanced diet biology"
  },
  faq: [
    { q: "What colour does Benedict's solution turn for a reducing sugar?", a: "Benedict's solution is blue. After heating with a reducing sugar it turns green, then yellow, then orange, and finally brick-red. The more sugar, the further along the colour sequence." },
    { q: "How do you test for a non-reducing sugar such as sucrose?", a: "Boil the sample with dilute hydrochloric acid, cool and neutralise with sodium hydrogencarbonate, then heat with Benedict's solution. A brick-red precipitate shows that sucrose was hydrolysed into reducing sugars." },
    { q: "Where does most digestion and absorption take place?", a: "In the small intestine. The duodenum receives bile and pancreatic juice, the ileum finishes digestion and has villi for absorption of digested food into the blood and lacteals." },
    { q: "What is the role of bile in digestion?", a: "Bile is made in the liver and stored in the gall bladder. It contains no enzymes. It neutralises acid from the stomach and emulsifies fats into small droplets so lipase can act faster." },
    { q: "Which deficiency disease is caused by lack of protein?", a: "Kwashiorkor. Typical signs are swollen abdomen, oedema, thin limbs and discoloured hair. Marasmus is a different condition, caused by lack of energy food and protein overall." },
    { q: "How is the vitamin C test using DCPIP interpreted?", a: "DCPIP is blue. Vitamin C turns it colourless. The sample that decolourises DCPIP using the smallest volume contains the most vitamin C." }
  ],
  content: `
<p>Nutrition and the digestive system appear in every Biology paper. Theory papers ask you to name parts, list enzymes and explain absorption. Practical papers (and the alternative-to-practical paper) ask you to carry out or interpret food tests. A student who can recall the observations accurately gains marks that many others lose.</p>
<p>This guide goes in the order a question tends to follow: classes of food, tests for them, the journey of food through the gut, enzymes, absorption, then diet and deficiency diseases. Learn the tables, because examiners ask the same facts in new wording.</p>

<h2>Classes of food and what they do</h2>
<table>
<tr><th>Class</th><th>Examples</th><th>Main functions</th></tr>
<tr><td>Carbohydrates</td><td>Yam, rice, bread, sugar</td><td>Supply energy quickly, stored as glycogen in animals</td></tr>
<tr><td>Proteins</td><td>Beans, meat, fish, egg, milk</td><td>Growth, repair of tissues, making enzymes and hormones</td></tr>
<tr><td>Fats and oils</td><td>Palm oil, groundnut, butter</td><td>Long-term energy store, insulation, protects organs, carries vitamins A, D, E and K</td></tr>
<tr><td>Vitamins</td><td>Fruits, vegetables, liver</td><td>Protect the body and regulate processes in small amounts</td></tr>
<tr><td>Mineral salts</td><td>Milk, fish, salt, green leaves</td><td>Bones, teeth, blood, nerve and muscle function</td></tr>
<tr><td>Water</td><td>Drinks, fruits</td><td>Solvent for reactions, transport, temperature control</td></tr>
<tr><td>Roughage (fibre)</td><td>Vegetables, whole grains</td><td>Adds bulk and keeps peristalsis moving, prevents constipation</td></tr>
</table>
<p>Carbohydrates, proteins and fats give energy and bulk, so they are the body-building and energy foods. Vitamins and minerals are needed in small amounts but are still essential.</p>

<h2>The food tests and what you should observe</h2>
<p>This is the most examined part of the topic. Learn each test as: reagent, method, positive result, what it shows.</p>
<table>
<tr><th>Food</th><th>Test and method</th><th>Positive result</th><th>Negative result</th></tr>
<tr><td>Reducing sugar (glucose, maltose)</td><td>Benedict's test: add Benedict's solution, heat in a hot water bath</td><td>Blue to green, yellow, orange, then brick-red precipitate</td><td>Stays blue</td></tr>
<tr><td>Starch</td><td>Iodine test: add a few drops of iodine solution</td><td>Brown or yellow to blue-black</td><td>Stays brown</td></tr>
<tr><td>Protein</td><td>Biuret test: add sodium hydroxide, then a few drops of dilute copper sulphate</td><td>Blue to purple or violet</td><td>Stays blue</td></tr>
<tr><td>Fat or oil</td><td>Emulsion test: shake with ethanol, then pour into water</td><td>Cloudy white emulsion</td><td>Remains clear</td></tr>
<tr><td>Vitamin C</td><td>DCPIP test: add the sample drop by drop to DCPIP</td><td>Blue DCPIP turns colourless</td><td>Stays blue</td></tr>
</table>
[[callout key|Benedict's needs heat, biuret does not|Benedict's test needs a hot water bath, and the brick-red colour is a precipitate. Iodine, biuret and emulsion tests work at room temperature. Writing that you heated for the biuret test is a common slip.]]
<h3>Testing for a non-reducing sugar</h3>
<p>Sucrose does not react with Benedict's solution directly. First test a sample with Benedict's: it stays blue. Then boil a fresh sample with dilute hydrochloric acid for a few minutes. This hydrolyses sucrose into glucose and fructose. Cool, neutralise with sodium hydrogencarbonate until fizzing stops, then add Benedict's and heat. A brick-red precipitate now means a non-reducing sugar was present. Neutralising matters, because Benedict's does not work in acid.</p>
<h3>Other tests and checks</h3>
<p>For fats, the grease-spot test is simple: rub the food on paper. A translucent mark that does not dry means fat. For solid foods such as yam or bread, crush the food in a little water first so the reagents can reach it. Never put iodine into a hot sample, because heat destroys the blue-black colour.</p>
[[qa A student adds Benedict's solution to a clear liquid and heats it. Nothing changes. She then boils a fresh sample with dilute acid, neutralises it and heats with Benedict's again, and it turns brick-red. What does the liquid contain?|The first test stayed blue, so no reducing sugar was present ; The sample only reacted after acid hydrolysis ; Acid splits a non-reducing sugar into reducing sugars|A non-reducing sugar such as sucrose]]
[[qa A food sample gives a violet colour with sodium hydroxide and copper sulphate, and a blue-black colour with iodine. Name two classes of food present|Violet with biuret shows protein ; Blue-black with iodine shows starch|Protein and starch]]

<h2>The digestive system part by part</h2>
<p>The alimentary canal is a long muscular tube from mouth to anus. Digestion is the breakdown of large insoluble food molecules into small soluble ones that can be absorbed.</p>
<table>
<tr><th>Part</th><th>What happens</th></tr>
<tr><td>Mouth</td><td>Teeth chew food (mechanical digestion). Saliva moistens it and salivary amylase begins starch digestion. The tongue rolls food into a bolus.</td></tr>
<tr><td>Oesophagus</td><td>Peristalsis, waves of muscle contraction, pushes the bolus to the stomach.</td></tr>
<tr><td>Stomach</td><td>Muscular churning mixes food with gastric juice. Hydrochloric acid kills germs and gives the right pH for pepsin. Protein digestion starts here.</td></tr>
<tr><td>Duodenum</td><td>Receives bile from the gall bladder and pancreatic juice from the pancreas.</td></tr>
<tr><td>Ileum</td><td>Final digestion by enzymes from the wall. Long, coiled, lined with villi for absorption.</td></tr>
<tr><td>Colon (large intestine)</td><td>Absorbs most of the remaining water and mineral salts.</td></tr>
<tr><td>Rectum and anus</td><td>Rectum stores faeces. The anus passes them out (egestion).</td></tr>
</table>
<p>The liver, gall bladder and pancreas are accessory organs. Food does not pass through them, but they secrete into the gut. The liver also processes absorbed nutrients, stores glycogen and makes bile.</p>

<h2>Digestive enzymes at a glance</h2>
<p>Enzymes are protein catalysts. Each works best at a particular pH, and each acts on one kind of substrate. Learn this table by rows.</p>
<table>
<tr><th>Enzyme</th><th>Source</th><th>Substrate</th><th>Product</th><th>Best pH</th></tr>
<tr><td>Salivary amylase</td><td>Salivary glands</td><td>Starch</td><td>Maltose</td><td>About 7 (near neutral)</td></tr>
<tr><td>Pepsin</td><td>Stomach wall</td><td>Proteins</td><td>Peptides</td><td>About 2 (acidic)</td></tr>
<tr><td>Rennin</td><td>Stomach of young mammals</td><td>Milk protein (casein)</td><td>Curdled milk</td><td>Acidic</td></tr>
<tr><td>Pancreatic amylase</td><td>Pancreas</td><td>Starch</td><td>Maltose</td><td>About 8 (alkaline)</td></tr>
<tr><td>Trypsin</td><td>Pancreas</td><td>Proteins</td><td>Peptides</td><td>About 8</td></tr>
<tr><td>Lipase</td><td>Pancreas and small intestine</td><td>Fats and oils</td><td>Fatty acids and glycerol</td><td>About 8</td></tr>
<tr><td>Maltase</td><td>Ileum wall</td><td>Maltose</td><td>Glucose</td><td>Alkaline</td></tr>
<tr><td>Sucrase</td><td>Ileum wall</td><td>Sucrose</td><td>Glucose and fructose</td><td>Alkaline</td></tr>
<tr><td>Peptidases (erepsin)</td><td>Ileum wall</td><td>Peptides</td><td>Amino acids</td><td>Alkaline</td></tr>
</table>
[[callout warn|Bile is not an enzyme|Bile has no enzymes. It emulsifies fat, which breaks large globules into tiny droplets and gives lipase a larger surface to work on. It also neutralises stomach acid so the pancreatic and intestinal enzymes have an alkaline medium.]]
<p>The pH pattern is a favourite objective question. Saliva is nearly neutral, the stomach is strongly acidic, and the small intestine is alkaline. If an experiment places pepsin in alkaline conditions it stops working, because the enzyme shape (its active site) is altered.</p>
[[qa Name the end products of the digestion of starch, protein and fat|Starch is broken down by amylase to maltose, then maltase converts maltose to glucose ; Proteins are broken to peptides by pepsin and trypsin, then to amino acids by peptidases ; Fats are emulsified by bile then lipase splits them|Glucose, amino acids, and fatty acids with glycerol]]

<h2>Absorption and assimilation</h2>
<p>Absorption is the passage of digested food into the blood or lymph. It takes place mostly in the ileum. The ileum is built for the job:</p>
<ul>
<li>It is long and coiled, which gives a large area.</li>
<li>Its inner wall has tiny finger-like villi, which increase the surface area further.</li>
<li>Each villus has a thin wall, one cell thick, and a network of blood capillaries.</li>
<li>Each villus also has a lacteal, a lymph vessel that absorbs fats.</li>
</ul>
<p>Glucose, amino acids, vitamins and mineral salts pass into the capillaries. Blood carries them by the hepatic portal vein to the liver. Fatty acids and glycerol enter the lacteals, join the lymph and eventually reach the blood. The colon absorbs water. Assimilation is when the body cells use the absorbed food, for energy, growth and repair.</p>
[[qa A boy eats only cassava and garri for months and develops a swollen belly, thin limbs and pale hair. Name the disease and a cure|Cassava and garri are mostly starch, so the diet lacks protein ; Swollen belly, thin limbs and pale hair are signs of protein lack|Kwashiorkor, cured by adding protein foods such as beans, eggs, fish or milk]]
[[qa In an emulsion test a student shakes oil with ethanol and pours it into water. Describe the positive result and explain it|Oil dissolves in ethanol but not in water ; Pouring into water leaves tiny oil droplets spread through the liquid|A cloudy white emulsion, showing fat or oil is present]]
[[qa State two ways in which the ileum is adapted for absorption|Villi greatly increase the surface area ; The wall is thin and richly supplied with capillaries so digested food moves quickly into the blood|Large surface area from villi and a thin, well-supplied wall]]

<h2>Balanced diet and deficiency diseases</h2>
<p>A balanced diet contains all the classes of food in the right proportions for a person's age, sex, activity and health. A pregnant woman, a growing child and a labourer all need different amounts. Malnutrition means eating too little, too much or the wrong mix.</p>
<table>
<tr><th>Disease</th><th>Missing nutrient</th><th>Signs</th><th>Prevention</th></tr>
<tr><td>Kwashiorkor</td><td>Protein</td><td>Swollen belly, oedema, thin limbs, pale hair</td><td>Beans, eggs, fish, milk</td></tr>
<tr><td>Marasmus</td><td>Energy foods and protein overall</td><td>Wasted body, wrinkled skin</td><td>Enough food of all classes</td></tr>
<tr><td>Rickets</td><td>Vitamin D or calcium</td><td>Soft, bent leg bones in children</td><td>Milk, fish oil, sunlight</td></tr>
<tr><td>Scurvy</td><td>Vitamin C</td><td>Bleeding gums, slow healing</td><td>Citrus fruits, tomatoes</td></tr>
<tr><td>Beriberi</td><td>Vitamin B1</td><td>Weak muscles, nerve problems</td><td>Whole grains, beans</td></tr>
<tr><td>Night blindness</td><td>Vitamin A</td><td>Poor vision in dim light</td><td>Carrots, liver, palm oil</td></tr>
<tr><td>Anaemia</td><td>Iron</td><td>Tiredness, pale skin</td><td>Liver, beans, green leaves</td></tr>
<tr><td>Goitre</td><td>Iodine</td><td>Swollen neck</td><td>Iodised salt, sea food</td></tr>
</table>
<p>Eating too much has costs as well: obesity and its risks come from taking in more energy than the body uses.</p>

<h2>How it is tested in theory and practical papers</h2>
<p>Theory questions commonly ask you to: list the classes of food and their functions, draw and label the alimentary canal, give the source, substrate and product of named enzymes, explain adaptations of the ileum, and name deficiency diseases with causes and cures.</p>
<p>In practical questions, you may be given specimens labelled A, B and C and asked to test them. A good answer table has four columns: test, procedure, observation, conclusion. For the vitamin C test, you may compare juices from orange, lime and pineapple using DCPIP. The juice that decolourises DCPIP with fewest drops has the most vitamin C. For fair comparison, keep the volume of DCPIP the same, and use drops from the same dropper.</p>
[[flow Choose the reagent for the food class ; Prepare the sample in solution or crushed in water ; Add reagent, heating only for Benedict's ; Record the exact colour change ; State what the colour shows]]
<p>When writing observations, state the starting colour as well as the end colour. Writing only that the solution changed colour earns no mark. Write that it changed from blue to brick-red.</p>

<h3>Common mistakes</h3>
[[compare Common mistake|Better way|Writing red for Benedict's with no sequence ; Saying biuret is heated ; Calling bile an enzyme ; Writing amino acids as the product of pepsin ; Mixing up kwashiorkor and marasmus|Blue, green, yellow, orange, brick-red precipitate ; Biuret works at room temperature ; Bile emulsifies, it has no enzyme ; Pepsin makes peptides, peptidases make amino acids ; Kwashiorkor is protein lack, marasmus is overall lack]]
<ul>
<li><strong>Confusing absorption with digestion.</strong> Digestion breaks food down. Absorption moves it into the blood.</li>
<li><strong>Saying most absorption is in the stomach.</strong> The ileum is the main site. The stomach absorbs very little.</li>
<li><strong>Forgetting the control.</strong> In a food test, a tube with distilled water in place of the sample shows the reagent colour that should not change.</li>
<li><strong>Poor labelling.</strong> Label the oesophagus, stomach, duodenum, ileum and colon in order, and draw lines that touch the part.</li>
</ul>

<h2>Practice set with answers</h2>
<ol>
<li>State the colour change when iodine is added to starch.</li>
<li>Name the enzyme that digests protein in the stomach and give its best pH.</li>
<li>Name the organ that makes bile and the organ that stores it.</li>
<li>What is the function of the lacteal in a villus?</li>
<li>A sample turns DCPIP colourless. Which vitamin is present?</li>
<li>Name the deficiency disease caused by lack of vitamin C.</li>
<li>Which test shows the presence of fat, and what is the positive result?</li>
<li>Why is sodium hydrogencarbonate added in the non-reducing sugar test?</li>
</ol>
<p><strong>Answers:</strong> 1. Brown or yellow to blue-black. 2. Pepsin, about pH 2. 3. The liver makes it and the gall bladder stores it. 4. It absorbs fatty acids and glycerol. 5. Vitamin C. 6. Scurvy. 7. The emulsion test, giving a cloudy white emulsion. 8. To neutralise the acid, since Benedict's does not work in acidic conditions.</p>

<h2>What to do today</h2>
[[checklist Write the five food tests with starting and ending colours from memory ; Rewrite the enzyme table covering the columns one at a time ; Draw and label the alimentary canal and name one function for each part ; Learn the eight deficiency diseases with the missing nutrient ; Answer the practice set and mark it]]
`
});
