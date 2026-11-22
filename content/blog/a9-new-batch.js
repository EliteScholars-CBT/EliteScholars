BLOG_POSTS.push({
  id: "heat-temperature-and-gas-laws-solved-for-waec-neco-and-jamb",
  title: "Heat, Temperature and Gas Laws Solved for WAEC, NECO and JAMB Physics",
  category: "lessons",
  categoryLabel: "Lessons",
  author: "Michael Joseph",
  authorAvatar: "avatar_1",
  publishAt: "2026-12-31T07:00:00+01:00",
  readTime: 9,
  scene: "calculator",
  tags: ["heat", "temperature", "gas laws", "specific heat capacity", "latent heat", "thermal expansion", "WAEC Physics", "NECO Physics", "JAMB Physics"],
  excerpt: "Temperature scales, expansion, specific heat capacity, latent heat, heat transfer and the gas laws, with ten worked numericals, common mistakes and a practice set with answers.",
  seo: {
    title: "Heat, Temperature and Gas Laws: WAEC, NECO, JAMB",
    description: "Temperature scales, expansion, specific heat, latent heat, Boyle's, Charles' and pressure laws with ten worked examples and answers.",
    keywords: "heat and temperature WAEC physics, gas laws JAMB, specific heat capacity calculation, latent heat numericals, Boyle's law, Charles' law, general gas equation"
  },
  faq: [
    { q: "What is the difference between heat and temperature?", a: "Heat is energy transferred because of a temperature difference, measured in joules. Temperature measures how hot or cold something is, which relates to the average kinetic energy of its particles, and is measured in kelvin or degrees Celsius." },
    { q: "Why must I use kelvin in gas law questions?", a: "The gas laws are proportional to the absolute temperature. Zero kelvin is the point where an ideal gas would have zero volume or pressure, while 0 degrees Celsius is not. Using Celsius gives wrong answers. Convert with T = t + 273." },
    { q: "Does the temperature change during melting or boiling?", a: "No. While a substance changes state, the heat supplied goes into breaking bonds between particles, not into raising kinetic energy, so the temperature stays constant. This is shown as a flat part on a heating curve." },
    { q: "Why is evaporation a cooling process?", a: "The fastest, most energetic molecules escape from the liquid surface, so the average kinetic energy of those left behind falls, and the liquid cools. Latent heat of vaporisation is taken from the liquid itself." },
    { q: "What is the difference between specific heat capacity and heat capacity?", a: "Heat capacity is the heat needed to raise the temperature of a whole object by 1 K, measured in J/K. Specific heat capacity is the heat needed per kilogram, measured in J/kg K, so it belongs to the material and not the object." }
  ],
  content: `
<h2>Heat and temperature: what is the difference</h2>
<p>Heat and temperature are tested every year in WAEC, NECO and JAMB Physics, in objective and theory papers. Most of the marks come from a few formulas and careful units, so this guide gives you both with worked numericals.</p>
<p><strong>Heat</strong> is energy that flows from a hotter body to a colder one, measured in joules (J). <strong>Temperature</strong> tells you how hot a body is, and relates to the average kinetic energy of its particles. A bucket of warm water holds more heat than a cup of boiling water, but the cup has the higher temperature.</p>
<p>Constants used in this post, which are the values commonly given in exams: specific heat capacity of water = 4200 J/kg K, specific latent heat of fusion of ice = 3.34 x 10<sup>5</sup> J/kg, specific latent heat of vaporisation of steam = 2.26 x 10<sup>6</sup> J/kg. Always use the values printed in your question paper if they differ.</p>

<h2>Temperature scales and Kelvin conversions</h2>
<p>A thermometer needs two fixed points. On the Celsius scale the <strong>lower fixed point</strong> is the melting point of pure ice (0 degrees) and the <strong>upper fixed point</strong> is the temperature of steam above boiling water at standard pressure (100 degrees). The Kelvin scale starts at absolute zero, so T (kelvin) = t (Celsius) + 273.</p>
<table>
<tr><th>Event</th><th>Celsius</th><th>Kelvin</th></tr>
<tr><td>Absolute zero</td><td>-273</td><td>0</td></tr>
<tr><td>Ice melts</td><td>0</td><td>273</td></tr>
<tr><td>Room temperature</td><td>27</td><td>300</td></tr>
<tr><td>Water boils</td><td>100</td><td>373</td></tr>
</table>
<p>A change of 1 degree Celsius equals a change of 1 kelvin, so temperature differences are the same on both scales. The Fahrenheit conversion, if asked, is F = (9/5)C + 32; normal body temperature of 37 degrees Celsius is 98.6 degrees Fahrenheit.</p>
<p>Liquid-in-glass thermometers work because liquids expand evenly. Mercury suits high temperatures and is easy to see, while alcohol suits very low ones because it freezes at a much lower temperature. A clinical thermometer has a constriction so the reading stays after you remove it.</p>

<h2>Thermal expansion</h2>
<p>Most solids, liquids and gases expand on heating because the particles vibrate or move more and take up more room. For a solid rod, the <strong>linear expansivity</strong> alpha is the increase in length per unit original length per kelvin rise.</p>
[[formula Linear expansion|change in length = alpha x L x change in temperature|alpha is in per kelvin (K<sup>-1</sup>), L is the original length, and the temperature change is in K or degrees Celsius.]]
[[qa A steel rail 30 m long has linear expansivity 1.2 x 10<sup>-5</sup> per K. By how much does it lengthen when the temperature rises by 40 K|Change in length = alpha x L x change in temperature ; = 1.2 x 10<sup>-5</sup> x 30 x 40 = 0.0144 m|The rail lengthens by 0.0144 m, which is 14.4 mm]]
<p>This is why railway lines have gaps, bridges have rollers and power lines sag in hot weather. A <strong>bimetallic strip</strong> joins two metals with different expansivities; on heating it bends towards the metal that expands less, and it is used in thermostats and fire alarms. Water is unusual: it contracts as it warms from 0 to 4 degrees Celsius, so it is densest at 4 degrees, which is why lakes freeze from the top and fish survive underneath.</p>

<h2>Specific heat capacity and latent heat</h2>
<p>The <strong>specific heat capacity</strong> c of a substance is the heat needed to raise the temperature of 1 kg by 1 K. The <strong>specific latent heat</strong> l is the heat needed to change the state of 1 kg without changing its temperature.</p>
[[formula Heat equations|Q = m c (change in T)   and   Q = m l   and   electrical Q = P x t|Q is heat in J, m is mass in kg, c is in J/kg K, l is in J/kg, P is power in W and t is time in s.]]
<p>Remember that Q = mc(change in T) applies when the temperature changes, and Q = ml applies when the state changes at constant temperature. Many questions need both, one after the other.</p>
[[qa How much heat is needed to warm 0.5 kg of water from 30 degrees Celsius to 100 degrees Celsius (c = 4200 J/kg K)|Q = m c (change in T) ; = 0.5 x 4200 x (100 - 30) = 0.5 x 4200 x 70|Q = 147,000 J, or 1.47 x 10<sup>5</sup> J]]
[[qa A 2 kW electric kettle heats 1.5 kg of water from 25 degrees Celsius to 100 degrees Celsius. Ignoring losses, how long does it take (c = 4200 J/kg K)|Heat needed Q = 1.5 x 4200 x 75 = 472,500 J ; Electrical energy = P x t, so t = Q / P = 472,500 / 2000|t = 236 s, about 3.9 minutes]]
[[qa 0.3 kg of water at 60 degrees Celsius is mixed with 0.2 kg of water at 20 degrees Celsius. Find the final temperature, ignoring heat losses|Heat lost by hot water = heat gained by cold water ; 0.3 x 4200 x (60 - T) = 0.2 x 4200 x (T - 20) ; 18 - 0.3T = 0.2T - 4, so 22 = 0.5T|T = 44 degrees Celsius]]
[[qa Find the heat needed to turn 0.1 kg of ice at 0 degrees Celsius into water at 30 degrees Celsius (l = 3.34 x 10<sup>5</sup> J/kg, c = 4200 J/kg K)|Stage 1, melting: Q1 = m l = 0.1 x 3.34 x 10<sup>5</sup> = 33,400 J ; Stage 2, warming: Q2 = 0.1 x 4200 x 30 = 12,600 J ; Total = 33,400 + 12,600|Total heat = 46,000 J]]
<p>Notice that melting needs more than twice the heat of warming the same mass by 30 degrees. For steam, taking l = 2.26 x 10<sup>6</sup> J/kg, boiling 0.05 kg of water at 100 degrees Celsius into steam needs 0.05 x 2.26 x 10<sup>6</sup> = 113,000 J. Steam burns badly because it releases this large latent heat when it condenses on skin.</p>
[[callout key|Method for mixed-state questions|Split the problem into stages. Calculate each stage separately with the correct formula, then add. Draw the heating curve if it helps: slopes use mc(change in T), flat parts use ml.]]

<h2>Heat transfer: conduction, convection and radiation</h2>
<table>
<tr><th>Mode</th><th>How it works</th><th>Needs a medium</th><th>Examples</th></tr>
<tr><td>Conduction</td><td>Vibrating particles pass energy on; free electrons help in metals</td><td>Yes (mainly solids)</td><td>A metal spoon heating in hot soup</td></tr>
<tr><td>Convection</td><td>Hot fluid expands, becomes less dense and rises; cooler fluid sinks</td><td>Yes (liquids, gases)</td><td>Sea breeze, boiling water, ventilation</td></tr>
<tr><td>Radiation</td><td>Infrared waves carry energy</td><td>No</td><td>Sunlight, a hot stove felt from a distance</td></tr>
</table>
<p>Dull black surfaces are good absorbers and emitters of radiation; shiny white surfaces are poor absorbers and good reflectors. That is why the inside of a vacuum flask is silvered. The flask stops conduction and convection with a vacuum between double walls, stops radiation with the silvering, and the stopper limits losses at the top.</p>

<h2>The gas laws and the general gas equation</h2>
<p>For a fixed mass of gas, three variables are linked: pressure P, volume V and absolute temperature T. Each law holds one variable constant. <strong>Always convert Celsius to kelvin first.</strong></p>
<table>
<tr><th>Law</th><th>Kept constant</th><th>Statement</th><th>Equation</th></tr>
<tr><td>Boyle's</td><td>Temperature</td><td>Pressure is inversely proportional to volume</td><td>P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub></td></tr>
<tr><td>Charles'</td><td>Pressure</td><td>Volume is directly proportional to T</td><td>V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub></td></tr>
<tr><td>Pressure law</td><td>Volume</td><td>Pressure is directly proportional to T</td><td>P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub></td></tr>
</table>
[[formula General gas equation|P1 V1 / T1 = P2 V2 / T2|Combines all three laws for a fixed mass of gas. T must be in kelvin; P and V can use any consistent units on both sides.]]
<p>Graphs: for Boyle's law, P against V is a curve and P against 1/V is a straight line through the origin. For Charles' law and the pressure law, a graph of V or P against Celsius temperature is a straight line that meets the temperature axis at -273 degrees Celsius, which is how absolute zero is found.</p>
[[qa A gas of volume 200 cm<sup>3</sup> is at pressure 100 kPa. Its temperature is constant and the volume is compressed to 50 cm<sup>3</sup>. Find the new pressure|Boyle's law: P1 V1 = P2 V2 ; 100 x 200 = P2 x 50|P2 = 400 kPa]]
[[qa A gas occupies 300 cm<sup>3</sup> at 27 degrees Celsius. Find its volume at 87 degrees Celsius if the pressure is constant|T1 = 27 + 273 = 300 K and T2 = 87 + 273 = 360 K ; V2 = V1 x T2 / T1 = 300 x 360 / 300|V2 = 360 cm<sup>3</sup>]]
[[qa A sealed container holds gas at 2.0 atm and 27 degrees Celsius. It is heated to 127 degrees Celsius. Find the new pressure|T1 = 300 K and T2 = 400 K ; P2 = P1 x T2 / T1 = 2.0 x 400 / 300|P2 = 2.67 atm]]
[[qa A gas has volume 500 cm<sup>3</sup> at 100 kPa and 27 degrees Celsius. What is its pressure when the volume is 750 cm<sup>3</sup> and the temperature 87 degrees Celsius|T1 = 300 K, T2 = 360 K ; P2 = P1 V1 T2 / (T1 V2) = 100 x 500 x 360 / (300 x 750)|P2 = 80 kPa]]
<p>The kinetic theory explains these laws: gas pressure comes from molecules hitting the container walls. Squeezing the gas into a smaller volume makes collisions more frequent (Boyle's). Heating makes molecules faster, so they hit harder and more often (Charles' and pressure laws).</p>

<h2>Common mistakes and practice set</h2>
<ul>
<li>Using Celsius instead of kelvin in any gas law question.</li>
<li>Forgetting that the mass must be in kilograms: 500 g is 0.5 kg, not 500.</li>
<li>Using mc(change in T) during a change of state, or ml when the temperature is changing.</li>
<li>Mixing units of pressure or volume between the two sides. Keep both sides the same.</li>
<li>Stating that temperature rises while a substance melts or boils. It stays constant.</li>
</ul>
<p><strong>Practice questions.</strong></p>
<ol>
<li>Convert 50 degrees Celsius to kelvin, and 400 K to degrees Celsius.</li>
<li>Find the heat needed to raise 2 kg of water from 20 degrees Celsius to 70 degrees Celsius.</li>
<li>Find the heat needed to melt 0.5 kg of ice already at 0 degrees Celsius.</li>
<li>A gas at 100 kPa has volume 600 cm<sup>3</sup>. Find its volume at 300 kPa and constant temperature.</li>
<li>A gas of volume 250 cm<sup>3</sup> at 300 K is heated to 450 K at constant pressure. Find the new volume.</li>
<li>A gas at 1.5 x 10<sup>5</sup> Pa and 27 degrees Celsius in a rigid tank is heated to 87 degrees Celsius. Find the new pressure.</li>
</ol>
<p><strong>Answers.</strong> (1) 50 + 273 = 323 K; 400 - 273 = 127 degrees Celsius. (2) Q = 2 x 4200 x 50 = 420,000 J. (3) Q = 0.5 x 3.34 x 10<sup>5</sup> = 1.67 x 10<sup>5</sup> J. (4) V2 = 100 x 600 / 300 = 200 cm<sup>3</sup>. (5) V2 = 250 x 450 / 300 = 375 cm<sup>3</sup>. (6) P2 = 1.5 x 10<sup>5</sup> x 360 / 300 = 1.8 x 10<sup>5</sup> Pa.</p>

<h2>What to do today</h2>
[[checklist Memorise T = t + 273 and the three gas law equations ; Write the constants 4200, 3.34 x 10^5 and 2.26 x 10^6 on a card ; Redo the ice-to-water and mixing examples without looking ; Draw a heating curve and label the flat parts ; Attempt one past WAEC heat question on the EliteScholars app]]
`
});
