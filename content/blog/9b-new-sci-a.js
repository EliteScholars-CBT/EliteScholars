BLOG_POSTS.push({
  id: "acids-bases-salts-ph-and-titration-solved-for-waec-and-jamb",
  title: "Acids, Bases, Salts, pH and Titration Solved for WAEC and JAMB Chemistry",
  category: "lessons",
  categoryLabel: "Lessons",
  author: "Michael Joseph",
  authorAvatar: "avatar_1",
  publishAt: "2026-12-02T07:00:00+01:00",
  readTime: 9,
  scene: "flask",
  tags: ["acids bases and salts", "pH calculation", "titration calculation", "WAEC Chemistry", "JAMB Chemistry", "neutralisation", "salt preparation", "volumetric analysis"],
  excerpt: "A complete walk through acids, bases, indicators, pH, types of salts and titration, with seven fully worked calculations, the practical errors that cost marks, and a practice set with answers.",
  seo: {
    title: "Acids, Bases, Salts, pH and Titration: WAEC and JAMB",
    description: "Learn acids, bases, pH and titration with seven worked calculations, salt preparation methods, practical errors and a practice set with answers.",
    keywords: "acids bases and salts WAEC, pH calculation examples, titration calculation WAEC, how to prepare salts, volumetric analysis JAMB chemistry, neutralisation"
  },
  faq: [
    { q: "How do I calculate pH from concentration?", a: "For a strong monobasic acid, [H+] equals the acid concentration, so pH = -log[H+]. For example, 0.01 mol/dm3 HCl has [H+] = 10<sup>-2</sup>, so pH = 2. For a dibasic acid such as H<sub>2</sub>SO<sub>4</sub>, double the acid concentration first." },
    { q: "What is the difference between a strong acid and a concentrated acid?", a: "Strength is about how much of the acid ionises in water. Concentration is about how much acid is dissolved per dm3. You can have a dilute solution of a strong acid or a concentrated solution of a weak acid." },
    { q: "Which indicator should I use for a strong acid against a strong base?", a: "Methyl orange and phenolphthalein both work. For a weak acid against a strong base use phenolphthalein, and for a strong acid against a weak base use methyl orange." },
    { q: "Why is the burette rinsed with the solution it will hold?", a: "Leftover water would dilute the solution and make the titre read too large. Rinsing with the solution itself removes this error. The conical flask, however, is rinsed with water only, because extra water does not change the number of moles in it." },
    { q: "How do I know which salt preparation method to use?", a: "Ask whether the salt is soluble and whether the reactants are soluble. Soluble salt from an insoluble base or metal: add excess solid, filter, crystallise. Soluble salt from a soluble base: titrate. Insoluble salt: precipitation by mixing two soluble salts." },
    { q: "Is the mole ratio important in titration questions?", a: "Yes, it is the step most students skip. Always write the balanced equation first. HCl reacts 1:1 with NaOH, but H<sub>2</sub>SO<sub>4</sub> reacts 1:2, and getting this wrong ruins the whole answer." }
  ],
  content: `
<h2>Acids and bases: the definitions examiners accept</h2>
<p>Acids, bases and salts appear every year in WAEC and JAMB Chemistry, in theory, objective and practical papers. The good news is that the topic follows a small set of repeating patterns: definitions, pH, salt types, preparation methods and titration arithmetic. Learn the patterns and the marks are yours.</p>
<p>The <strong>Arrhenius definition</strong> says an acid produces hydrogen ions, H<sup>+</sup> (really H<sub>3</sub>O<sup>+</sup>), when dissolved in water, and a base is a substance whose solution produces hydroxide ions, OH<sup>-</sup>. An <strong>alkali</strong> is a base that dissolves in water, such as NaOH and KOH. Every alkali is a base, but not every base is an alkali: CuO and MgO are bases that do not dissolve.</p>
<p>The <strong>Bronsted-Lowry definition</strong> is wider. An acid is a proton donor and a base is a proton acceptor. In NH<sub>3</sub> + H<sub>2</sub>O gives NH<sub>4</sub><sup>+</sup> + OH<sup>-</sup>, water donates a proton so it acts as the acid, and ammonia accepts it so it is the base. This is why ammonia is basic even though its formula has no OH.</p>
[[callout key|Strong versus concentrated|Strong and weak describe how completely an acid ionises. Concentrated and dilute describe how much solute is in each dm3. These are independent ideas, and examiners love to test the difference.]]
<table>
<tr><th>Type</th><th>Behaviour in water</th><th>Examples</th></tr>
<tr><td>Strong acid</td><td>Ionises almost completely</td><td>HCl, HNO<sub>3</sub>, H<sub>2</sub>SO<sub>4</sub></td></tr>
<tr><td>Weak acid</td><td>Ionises only slightly, equilibrium</td><td>Ethanoic acid, carbonic acid, citric acid</td></tr>
<tr><td>Strong base</td><td>Dissociates almost completely</td><td>NaOH, KOH</td></tr>
<tr><td>Weak base</td><td>Reacts only slightly with water</td><td>NH<sub>3</sub> solution</td></tr>
</table>
<p>Basicity is the number of replaceable hydrogen atoms per molecule: HCl is monobasic, H<sub>2</sub>SO<sub>4</sub> is dibasic, H<sub>3</sub>PO<sub>4</sub> is tribasic. Ethanoic acid, CH<sub>3</sub>COOH, is monobasic, because only the hydrogen in the COOH group is replaceable.</p>

<h2>Indicators and the pH scale</h2>
<p>An indicator is a substance that changes colour depending on whether the solution is acidic or basic. Know these four colours cold.</p>
<table>
<tr><th>Indicator</th><th>In acid</th><th>In alkali</th></tr>
<tr><td>Litmus</td><td>Red</td><td>Blue</td></tr>
<tr><td>Methyl orange</td><td>Red</td><td>Yellow</td></tr>
<tr><td>Phenolphthalein</td><td>Colourless</td><td>Pink</td></tr>
<tr><td>Bromothymol blue</td><td>Yellow</td><td>Blue</td></tr>
</table>
<p>The pH scale runs from 0 to 14 at 25 degrees Celsius. Below 7 is acidic, 7 is neutral, above 7 is alkaline. Universal indicator gives a rough value by colour; a pH meter gives a precise one. Each step on the scale is a factor of ten in hydrogen ion concentration, so pH 3 is ten times more acidic than pH 4.</p>
[[formula pH and pOH|pH = -log[H+]   pOH = -log[OH-]   pH + pOH = 14|[H+] and [OH-] are in mol/dm3. At 25 degrees Celsius, [H+] x [OH-] = 10<sup>-14</sup>.]]
[[qa Calculate the pH of 0.01 mol/dm3 HCl and of 0.005 mol/dm3 H2SO4|HCl is a strong monobasic acid, so [H+] = 0.01 = 10<sup>-2</sup> mol/dm3 ; pH = -log(10<sup>-2</sup>) = 2 ; H<sub>2</sub>SO<sub>4</sub> is strong and dibasic: H<sub>2</sub>SO<sub>4</sub> gives 2H<sup>+</sup> + SO<sub>4</sub><sup>2-</sup> ; [H+] = 2 x 0.005 = 0.010 = 10<sup>-2</sup> mol/dm3 ; pH = 2|Both solutions have pH = 2. Half the concentration of the dibasic acid gives the same [H+].]]
[[qa Find the pH of 0.001 mol/dm3 NaOH|NaOH is a strong monoacidic base so [OH-] = 0.001 = 10<sup>-3</sup> mol/dm3 ; pOH = -log(10<sup>-3</sup>) = 3 ; pH = 14 - 3 = 11|pH = 11]]
<p>Two more pH skills come up often. First, working backwards: if pH = 4, then [H+] = 10<sup>-4</sup> mol/dm3. Second, dilution: a strong acid of pH 3 diluted 100 times has [H+] fall from 10<sup>-3</sup> to 10<sup>-5</sup>, so its pH becomes 5. Dilution can push an acid towards pH 7 but never past it, since water itself is neutral.</p>

<h2>Neutralisation and the reactions of acids</h2>
<p>Neutralisation is the reaction of an acid with a base to form a salt and water. The ionic equation is the same for every strong acid and strong alkali: H<sup>+</sup> + OH<sup>-</sup> gives H<sub>2</sub>O. Memorise the four general reactions of dilute acids:</p>
<ul>
<li>Acid + metal gives salt + hydrogen (for example Mg + 2HCl gives MgCl<sub>2</sub> + H<sub>2</sub>).</li>
<li>Acid + base or metal oxide gives salt + water.</li>
<li>Acid + carbonate gives salt + water + carbon dioxide.</li>
<li>Acid + alkali gives salt + water.</li>
</ul>
<p>The carbon dioxide test is a favourite practical point: bubble the gas through limewater and it turns milky because insoluble calcium carbonate forms.</p>

<h2>Types of salts</h2>
<p>A salt is formed when the replaceable hydrogen of an acid is wholly or partly replaced by a metal or ammonium ion.</p>
<table>
<tr><th>Salt type</th><th>How it forms</th><th>Example</th></tr>
<tr><td>Normal</td><td>All replaceable H replaced</td><td>NaCl, Na<sub>2</sub>SO<sub>4</sub></td></tr>
<tr><td>Acid</td><td>Only part of the H replaced</td><td>NaHSO<sub>4</sub>, NaHCO<sub>3</sub></td></tr>
<tr><td>Basic</td><td>Contains OH or O along with a base</td><td>Zn(OH)Cl, basic lead carbonate</td></tr>
<tr><td>Double</td><td>Two different cations, one crystal</td><td>Alum, KAl(SO<sub>4</sub>)<sub>2</sub>.12H<sub>2</sub>O</td></tr>
<tr><td>Complex</td><td>Contains a complex ion</td><td>Na<sub>3</sub>Al(OH)<sub>6</sub>, K<sub>4</sub>Fe(CN)<sub>6</sub></td></tr>
<tr><td>Hydrated</td><td>Has water of crystallisation</td><td>CuSO<sub>4</sub>.5H<sub>2</sub>O</td></tr>
</table>

<h2>Preparing salts: choose the method from the solubility</h2>
<p>Learn the solubility rules first: all nitrates, all sodium, potassium and ammonium salts, and most chlorides and sulphates are soluble. Exceptions: AgCl, PbCl<sub>2</sub>, BaSO<sub>4</sub>, PbSO<sub>4</sub> and CaSO<sub>4</sub> (slightly) are insoluble. Most carbonates, except those of sodium, potassium and ammonium, are insoluble.</p>
[[flow Is the salt soluble? ; Yes: is the base or metal insoluble? ; Yes: add excess solid, filter, crystallise ; No (soluble alkali): titrate, then crystallise ; Salt insoluble: precipitate and filter]]
<h3>Method 1: excess solid (for example CuSO<sub>4</sub> or ZnSO<sub>4</sub>)</h3>
<p>Warm dilute H<sub>2</sub>SO<sub>4</sub>, add copper(II) oxide a little at a time until no more dissolves, so the acid is completely used up. Filter off the excess oxide, heat the filtrate to saturation, cool to crystallise, then dry between filter papers.</p>
<h3>Method 2: titration (for example NaCl or Na<sub>2</sub>SO<sub>4</sub>)</h3>
<p>Sodium salts cannot be made with excess solid because the alkali is soluble and cannot be filtered out. So measure exact volumes by titration with an indicator, then repeat without the indicator, and evaporate to crystallise.</p>
<h3>Method 3: precipitation (for example BaSO<sub>4</sub> or PbCl<sub>2</sub>)</h3>
<p>Mix two soluble salts, such as BaCl<sub>2</sub> and Na<sub>2</sub>SO<sub>4</sub>. The insoluble salt forms immediately; filter, wash with distilled water and dry.</p>

<h2>Titration: the method and the calculation</h2>
<p>Titration (volumetric analysis) finds an unknown concentration by reacting a measured volume of one solution with a solution of known concentration. The apparatus: a burette for the variable volume, a pipette for the fixed volume, a conical flask, a white tile and a funnel. The end point is the point of sharp colour change.</p>
[[formula Titration formulas|n = C x V (V in dm3) ; CaVa / CbVb = na / nb|C is concentration in mol/dm3, V volume (cm3 values may be used on both sides), na and nb are the coefficients from the balanced equation. Mass concentration (g/dm3) = molar concentration x molar mass.]]
<p>Atomic masses used throughout this post: H = 1, C = 12, O = 16, Na = 23, Cl = 35.5.</p>
[[qa 25.0 cm3 of NaOH solution required 20.0 cm3 of 0.100 mol/dm3 HCl for complete neutralisation. Find the concentration of the NaOH in mol/dm3 and g/dm3|Equation: NaOH + HCl gives NaCl + H<sub>2</sub>O, ratio 1:1 ; Moles of HCl = 0.100 x 20.0 / 1000 = 0.00200 mol ; Moles of NaOH = 0.00200 mol in 25.0 cm3 ; Concentration = 0.00200 / 0.0250 = 0.0800 mol/dm3 ; Molar mass NaOH = 23 + 16 + 1 = 40 g/mol ; Mass concentration = 0.0800 x 40 = 3.2 g/dm3|0.0800 mol/dm3, or 3.2 g/dm3]]
[[qa 25.0 cm3 of NaOH neutralised 18.0 cm3 of 0.0500 mol/dm3 H2SO4. Find the concentration of the NaOH|Equation: H<sub>2</sub>SO<sub>4</sub> + 2NaOH gives Na<sub>2</sub>SO<sub>4</sub> + 2H<sub>2</sub>O, ratio acid:base = 1:2 ; Moles of acid = 0.0500 x 18.0 / 1000 = 0.000900 mol ; Moles of NaOH = 2 x 0.000900 = 0.00180 mol ; Concentration = 0.00180 / 0.0250 = 0.0720 mol/dm3|0.0720 mol/dm3]]
[[qa A sample of impure NaOH weighing 2.0 g was dissolved in water to make 250 cm3 of solution. 25.0 cm3 of this needed 22.5 cm3 of 0.100 mol/dm3 HCl. Calculate the percentage purity of the sample|Moles of HCl = 0.100 x 22.5 / 1000 = 0.00225 mol ; Ratio 1:1 so NaOH in 25.0 cm3 = 0.00225 mol ; In 250 cm3 there are ten times as much: 0.0225 mol ; Mass of NaOH = 0.0225 x 40 = 0.90 g ; Purity = 0.90 / 2.0 x 100 = 45 percent|45 percent pure]]
[[qa 5.30 g of anhydrous Na2CO3 was dissolved to make 500 cm3 of solution. 25.0 cm3 of it required 20.0 cm3 of HCl. Find the concentration of the HCl|Molar mass Na<sub>2</sub>CO<sub>3</sub> = 2(23) + 12 + 3(16) = 106 g/mol ; Moles in 500 cm3 = 5.30 / 106 = 0.0500 mol ; Concentration = 0.0500 / 0.500 = 0.100 mol/dm3 ; Equation: Na<sub>2</sub>CO<sub>3</sub> + 2HCl gives 2NaCl + H<sub>2</sub>O + CO<sub>2</sub>, ratio 1:2 ; Moles of carbonate in 25.0 cm3 = 0.100 x 0.0250 = 0.00250 mol ; Moles of HCl = 2 x 0.00250 = 0.00500 mol ; Concentration of HCl = 0.00500 / 0.0200 = 0.250 mol/dm3|0.250 mol/dm3]]
<p>Notice the habit that links every one of these: balanced equation, moles of the known substance, ratio, moles of the unknown, then concentration. If you follow that order you cannot lose the method marks even if the arithmetic slips.</p>

<h2>Choosing an indicator and avoiding practical errors</h2>
<p>The indicator must change colour at the pH of the equivalence point. Strong acid with strong base: either methyl orange or phenolphthalein. Weak acid (ethanoic) with strong base: phenolphthalein, because the end point lies above pH 7. Strong acid with weak base (ammonia): methyl orange, because the end point lies below pH 7. Weak acid with weak base: no indicator gives a sharp end point.</p>
[[compare Practical errors|Good technique|Rinsing the pipette or burette with water only ; Reading the meniscus from above or at an angle ; Leaving a bubble in the burette tip ; Adding the indicator in large amounts ; Rinsing the flask with the solution|Rinse pipette and burette with the solution they will hold ; Read the bottom of the meniscus at eye level ; Run some liquid through to fill the tip before starting ; Use only two or three drops ; Rinse the flask with distilled water only]]
<p>Other points that earn marks: swirl the flask continually, add the titrant dropwise near the end point, put the flask on a white tile to see the colour change, and read the burette to two decimal places ending in 0 or 5 (for example 21.45 cm<sup>3</sup>). Do the rough titration first, then three accurate ones. A common theory question asks why the conical flask can be wet but the pipette cannot: the moles in the flask do not change when water is added, but a wet pipette dilutes the solution it measures.</p>

<h2>Common mistakes and exam patterns</h2>
<ul>
<li>Forgetting that H<sub>2</sub>SO<sub>4</sub> gives two H<sup>+</sup> when calculating pH.</li>
<li>Using cm<sup>3</sup> with mol/dm3 in the n = CV equation without dividing by 1000.</li>
<li>Skipping the balanced equation and assuming a 1:1 ratio.</li>
<li>Calling NH<sub>3</sub> a strong base, or saying an acid is strong because it is concentrated.</li>
<li>Mixing up the colours of methyl orange (red in acid, yellow in alkali).</li>
</ul>
<p>Typical exam patterns: an objective item on salt classification or indicator colour; a 5-mark preparation question asking for a named soluble salt and the steps; a titration table where you average the titres and calculate a concentration; and a practical-alternative question on sources of error. If you are asked to average titres, discard any outlier that differs by more than 0.20 cm<sup>3</sup> from the others.</p>

<h2>Practice set with answers</h2>
<ol>
<li>Find the pH of 0.1 mol/dm3 HCl.</li>
<li>What is the pH of 0.0005 mol/dm3 H<sub>2</sub>SO<sub>4</sub>?</li>
<li>A solution has pH 12. State [OH-].</li>
<li>20.0 cm3 of 0.200 mol/dm3 NaOH is neutralised by HCl; what volume of 0.100 mol/dm3 HCl is needed?</li>
<li>Name the method for preparing barium sulphate and give the reagents.</li>
<li>Calculate the mass of NaCl formed when 25.0 cm3 of 0.200 mol/dm3 NaOH is neutralised with excess HCl.</li>
</ol>
<p><strong>Answers.</strong> (1) pH = 1. (2) [H+] = 2 x 0.0005 = 0.001, so pH = 3. (3) pOH = 2, so [OH-] = 10<sup>-2</sup> mol/dm3. (4) Moles NaOH = 0.200 x 0.0200 = 0.00400; volume of HCl = 0.00400 / 0.100 = 0.0400 dm3 = 40.0 cm3. (5) Precipitation: mix aqueous BaCl<sub>2</sub> and Na<sub>2</sub>SO<sub>4</sub>, filter, wash, dry. (6) Moles = 0.200 x 0.0250 = 0.00500; molar mass NaCl = 58.5 g/mol; mass = 0.00500 x 58.5 = 0.2925 g, about 0.29 g.</p>
[[checklist Write the pH formulas and four indicator colours from memory ; Redo the four titration examples without looking ; List three soluble and three insoluble salts and the method for each ; Practise reading a burette to two decimal places ; Attempt practice questions 4 and 6 on the EliteScholars app]]
`
},
{
  id: "waves-sound-and-light-reflection-refraction-solved-for-waec-and-jamb",
  title: "Waves, Sound and Light: Reflection and Refraction Solved for WAEC and JAMB Physics",
  category: "lessons",
  categoryLabel: "Lessons",
  author: "Michael Joseph",
  authorAvatar: "avatar_1",
  publishAt: "2026-12-08T07:00:00+01:00",
  readTime: 9,
  scene: "calculator",
  tags: ["waves", "sound waves", "reflection of light", "refraction", "lenses", "curved mirrors", "WAEC Physics", "JAMB Physics"],
  excerpt: "Wave basics, echoes, resonance, mirrors, Snell's law, total internal reflection and lenses explained with a clear sign convention, ten worked numerical examples and a practice set with answers.",
  seo: {
    title: "Waves, Sound, Reflection and Refraction: WAEC, JAMB",
    description: "Waves, echo, resonance, mirrors, Snell's law, critical angle and lenses with a clear sign convention, ten worked examples and answers.",
    keywords: "waves sound and light WAEC physics, refraction calculation, lens formula examples, critical angle, echo calculation, resonance tube experiment"
  },
  faq: [
    { q: "What is the difference between a transverse and a longitudinal wave?", a: "In a transverse wave the particles vibrate at right angles to the direction the wave travels, as in light and water ripples. In a longitudinal wave they vibrate along the direction of travel, as in sound, forming compressions and rarefactions." },
    { q: "Why can sound not travel through a vacuum?", a: "Sound is a longitudinal wave that passes energy from particle to particle. With no particles to compress and expand, there is nothing to carry it. Light does not need a medium, which is why sunlight reaches us across space." },
    { q: "Does the frequency of a wave change when it enters a new medium?", a: "No. Frequency is set by the source and stays the same. The speed and the wavelength change, and v = f x wavelength links the three." },
    { q: "What are the conditions for total internal reflection?", a: "Light must travel from a denser to a less dense medium, and the angle of incidence must be larger than the critical angle. At exactly the critical angle the refracted ray grazes along the boundary." },
    { q: "How do I handle signs in the lens formula?", a: "Use the real-is-positive convention: real object and image distances are positive, virtual ones negative, and the focal length of a converging lens or concave mirror is positive. A negative answer for v simply means the image is virtual." },
    { q: "Why does a pool look shallower than it really is?", a: "Light from the bottom bends away from the normal as it leaves the water, so the rays appear to come from a higher point. Apparent depth equals real depth divided by the refractive index." }
  ],
  content: `
<h2>Wave basics: the one equation that does the work</h2>
<p>A wave transfers energy without transferring matter. Waves, sound and light make up a large block of WAEC and JAMB Physics, and nearly every numerical question reduces to a handful of formulas used with the right units.</p>
<p>The key quantities: <strong>amplitude</strong> is the maximum displacement from the rest position; <strong>wavelength</strong> (the Greek letter lambda, written here as L) is the distance between two successive points in phase, such as crest to crest; <strong>frequency</strong> f is the number of complete waves per second, in hertz; <strong>period</strong> T = 1/f. The wave equation is v = fL.</p>
[[formula Wave equation|v = f L   and   T = 1/f|v is wave speed in m/s, f is frequency in Hz, L is wavelength in m.]]
<p>A <strong>transverse wave</strong> vibrates at right angles to its direction of travel: light, all electromagnetic waves, ripples on water and waves on a string. A <strong>longitudinal wave</strong> vibrates along the direction of travel, producing compressions (high pressure) and rarefactions (low pressure): sound is the standard example.</p>
[[qa A tuning fork of frequency 500 Hz produces sound of wavelength 0.66 m. Find the speed of the sound and the period|Use v = f L ; v = 500 x 0.66 = 330 m/s ; Period T = 1/f = 1/500 = 0.002 s|Speed = 330 m/s and period = 0.002 s]]
<p>Constants used in this post: speed of sound in air = 340 m/s (use the value the question gives), speed of light in air or vacuum = 3.0 x 10<sup>8</sup> m/s, g is not needed here.</p>

<h2>Sound: echoes, speed and resonance</h2>
<p>Sound needs a material medium and travels fastest in solids, slower in liquids and slowest in gases. In air its speed increases with temperature, and it is not affected by changes in pressure at constant temperature.</p>
<p>An <strong>echo</strong> is sound reflected from a distant surface. The sound goes to the wall and comes back, so it covers the distance twice. Therefore distance to the reflector d = (v x t) / 2. For an echo to be heard separately, the reflecting surface must be at least about 17 m away, because the ear holds a sound for roughly 0.1 s and 340 x 0.1 / 2 = 17 m.</p>
[[qa A man claps near a cliff and hears the echo 1.5 s later. If the speed of sound is 340 m/s, how far is the cliff|Total distance covered = v x t = 340 x 1.5 = 510 m ; This is there and back, so the cliff is 510 / 2 = 255 m away|The cliff is 255 m away]]
<h3>Resonance tube experiment</h3>
<p>Resonance happens when an object is forced to vibrate at its natural frequency and responds with large amplitude. In the resonance-tube experiment a vibrating tuning fork of known frequency is held above a tube partly filled with water in a tall cylinder, and the air column is lengthened by raising the tube. A loud sound is heard at the first resonance, when the air column length l<sub>1</sub> plus an end correction e equals one quarter of the wavelength, and again at the second resonance when l<sub>2</sub> + e = three quarters of the wavelength. Subtracting removes e: L = 2(l<sub>2</sub> - l<sub>1</sub>).</p>
[[qa In a resonance experiment with a 500 Hz fork, the first resonance occurs at an air column length of 16.0 cm and the second at 50.0 cm. Find the speed of sound and the end correction|L = 2(l<sub>2</sub> - l<sub>1</sub>) = 2(50.0 - 16.0) = 68.0 cm = 0.680 m ; v = f L = 500 x 0.680 = 340 m/s ; For the first resonance, l<sub>1</sub> + e = L/4 = 17.0 cm ; e = 17.0 - 16.0 = 1.0 cm|Speed = 340 m/s and end correction = 1.0 cm]]

<h2>Reflection and plane mirrors</h2>
<p>The two laws of reflection: the incident ray, the reflected ray and the normal all lie in the same plane, and the angle of incidence equals the angle of reflection. Both angles are measured from the normal, not from the surface; this is the most common slip in ray questions.</p>
<p>A plane mirror forms an image that is virtual, upright, the same size as the object, laterally inverted and as far behind the mirror as the object is in front. If you walk toward a mirror at 2 m/s, your image also moves toward the mirror at 2 m/s, so the two of you approach at 4 m/s.</p>
<p>Rotating a plane mirror through an angle turns the reflected ray (with a fixed incident ray) through twice that angle. If the mirror turns by 15 degrees the reflected ray turns by 30 degrees.</p>

<h2>Curved mirrors and the sign convention</h2>
<p>A concave mirror converges parallel rays to a real principal focus F. A convex mirror diverges them, so its focus is virtual, behind the mirror. The focal length is half the radius of curvature, f = R/2.</p>
<p><strong>Sign convention used here (real-is-positive).</strong> Distances to real objects and real images are positive. Distances to virtual images are negative. The focal length is positive for a concave mirror or a convex (converging) lens, and negative for a convex mirror or a concave (diverging) lens. Then the same formula serves mirrors and lenses.</p>
[[formula Mirror and lens formula|1/f = 1/u + 1/v   and   m = v / u (use the size only)|u is object distance, v is image distance, f is focal length, m is magnification = image height / object height. Negative v means a virtual image.]]
<p>For ray diagrams in words, three rays are enough. A ray parallel to the axis passes through F after reflection or refraction (for diverging devices, it appears to come from F). A ray through the optical centre of a lens goes straight on, and a ray through the pole of a mirror reflects at equal angles. Where two of these rays meet, the image forms.</p>
<p>Concave mirror images: object beyond C gives a real, inverted, diminished image between F and C. Object between F and C gives a real, inverted, magnified image beyond C. Object inside F gives a virtual, upright, magnified image, which is how a shaving mirror works. A convex mirror always gives a virtual, upright, diminished image, which is why it is used as a driving mirror with a wide field of view.</p>
[[qa An object is 30 cm from a concave mirror of focal length 10 cm. Find the image position and magnification|1/v = 1/f - 1/u = 1/10 - 1/30 = 3/30 - 1/30 = 2/30 ; v = 15 cm, positive so the image is real, in front of the mirror ; m = v / u = 15 / 30 = 0.5|Image is 15 cm from the mirror, real, inverted and diminished (m = 0.5)]]
[[qa An object is 30 cm from a convex mirror of focal length 15 cm. Describe the image|For a convex mirror f = -15 cm ; 1/v = 1/f - 1/u = -1/15 - 1/30 = -2/30 - 1/30 = -3/30 ; v = -10 cm, so the image is virtual, 10 cm behind the mirror ; m = 10 / 30 = 1/3|Virtual, upright, diminished, 10 cm behind the mirror, one third the object size]]

<h2>Refraction, Snell's law and critical angle</h2>
<p>Refraction is the bending of light as it passes from one medium to another because its speed changes. The frequency stays the same. Entering a denser medium (air to glass), light slows down, its wavelength shortens and it bends toward the normal. Leaving, it bends away.</p>
<p>Snell's law: sin i / sin r = constant, called the refractive index n for light going from air into the medium. Also n = speed of light in air / speed in the medium, and n = real depth / apparent depth.</p>
[[qa A ray of light enters glass of refractive index 1.5 from air at an angle of incidence of 30 degrees. Find the angle of refraction and the speed of light in the glass|n = sin i / sin r so sin r = sin 30 / 1.5 = 0.5 / 1.5 = 0.3333 ; r = 19.5 degrees (to 1 decimal place) ; Speed in glass = c / n = 3.0 x 10<sup>8</sup> / 1.5 = 2.0 x 10<sup>8</sup> m/s|Angle of refraction = 19.5 degrees and speed = 2.0 x 10<sup>8</sup> m/s]]
[[qa In an experiment a ray enters a glass block with i = 60 degrees and r = 35 degrees. Find the refractive index (sin 60 = 0.866, sin 35 = 0.574)|n = sin i / sin r = 0.866 / 0.574 = 1.51|Refractive index is about 1.51]]
<h3>Real and apparent depth</h3>
<p>A swimming pool of real depth 4.0 m filled with water of n = 4/3 appears to have depth = real depth / n = 4.0 / (4/3) = 3.0 m. The bottom looks raised because rays bend away from the normal as they leave the water.</p>
<h3>Total internal reflection</h3>
<p>When light goes from a denser to a less dense medium, the angle of refraction exceeds the angle of incidence. At the critical angle c the refracted ray travels along the boundary (90 degrees). Beyond c all the light reflects back inside: total internal reflection. The relation is sin c = 1/n.</p>
<p>For glass of n = 1.5, sin c = 1/1.5 = 0.6667 and c = 41.8 degrees. For water with n = 1.33, sin c = 0.7519 and c = 48.8 degrees.</p>
[[callout key|Two conditions for TIR|Light must be going from the denser to the less dense medium, and the angle of incidence must be greater than the critical angle. Missing either condition loses the mark.]]

<h2>Lenses and magnification</h2>
<p>A convex (converging) lens is thicker at the centre and has a real focus. A concave (diverging) lens is thinner at the centre and its focus is virtual. The lens formula is the same as the mirror formula, 1/f = 1/u + 1/v, with the same real-is-positive convention. The power of a lens in dioptres is P = 1/f with f in metres, so a lens of f = 25 cm has P = 1/0.25 = 4 dioptres.</p>
<p>Convex lens images: object beyond 2F gives a real, inverted, diminished image between F and 2F, which is the camera. Object at 2F gives a real, inverted image the same size at 2F. Object between F and 2F gives a real, inverted, magnified image beyond 2F, the projector. Object inside F gives a virtual, upright, magnified image, the simple magnifying glass.</p>
[[qa An object 4 cm tall is placed 30 cm from a convex lens of focal length 20 cm. Find the image distance and height|1/v = 1/f - 1/u = 1/20 - 1/30 = 3/60 - 2/60 = 1/60 ; v = 60 cm, real and on the other side ; m = v / u = 60 / 30 = 2 ; Image height = 2 x 4 = 8 cm|Image is 60 cm from the lens, real, inverted, 8 cm tall]]
[[qa A convex lens of focal length 20 cm is used as a magnifying glass with the object 8 cm away. Find the image position and magnification|1/v = 1/20 - 1/8 = 2/40 - 5/40 = -3/40 ; v = -13.3 cm (virtual, same side as the object) ; m = 13.3 / 8 = 1.67|Virtual, upright image 13.3 cm from the lens, magnified 1.67 times]]
<p>A concave lens always gives a virtual, upright, diminished image. For an object 60 cm from a concave lens of f = -20 cm: 1/v = -1/20 - 1/60 = -4/60, v = -15 cm, and m = 15/60 = 0.25.</p>

<h2>Common mistakes and practice set</h2>
<ul>
<li>Measuring angles from the mirror or boundary instead of from the normal.</li>
<li>Forgetting that an echo covers the distance twice.</li>
<li>Treating the frequency as changing when light enters glass; only the speed and wavelength change.</li>
<li>Applying total internal reflection to light going from less dense to denser.</li>
<li>Dropping the sign of f or v, then misreading a negative image distance as an error.</li>
</ul>
<p><strong>Practice questions.</strong></p>
<ol>
<li>A wave has frequency 50 Hz and wavelength 4 m. Find its speed.</li>
<li>A ship sends a sound pulse down and receives the echo 0.8 s later. Taking the speed of sound in water as 1500 m/s, find the depth.</li>
<li>A concave mirror has f = 12 cm and the object is 36 cm away. Find v.</li>
<li>Find the critical angle for a material of refractive index 2.0.</li>
<li>A convex lens of focal length 10 cm forms an image of an object 15 cm away. Find v and m.</li>
<li>Find the power of a lens with f = 50 cm.</li>
</ol>
<p><strong>Answers.</strong> (1) v = 50 x 4 = 200 m/s. (2) Distance there and back = 1500 x 0.8 = 1200 m, so depth = 600 m. (3) 1/v = 1/12 - 1/36 = 3/36 - 1/36 = 2/36, so v = 18 cm, real. (4) sin c = 1/2 = 0.5, so c = 30 degrees. (5) 1/v = 1/10 - 1/15 = 3/30 - 2/30 = 1/30, so v = 30 cm and m = 30 / 15 = 2. (6) P = 1/0.5 = 2 dioptres.</p>
[[checklist Memorise v = fL and the echo formula d = vt/2 ; Write the real-is-positive sign rules on one card ; Redo the mirror and lens examples without looking ; Draw the three principal rays for each image position ; Try one past WAEC optics question on the EliteScholars app]]
`
});
