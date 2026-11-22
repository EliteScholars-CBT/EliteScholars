BLOG_POSTS.push({
  id: "work-energy-power-and-simple-machines-solved-for-waec-and-jamb",
  title: "Work, Energy, Power and Simple Machines Solved for WAEC, NECO and JAMB Physics",
  category: "lessons",
  categoryLabel: "Lessons",
  author: "Michael Joseph",
  authorAvatar: "avatar_1",
  publishAt: "2026-12-17T07:00:00+01:00",
  readTime: 9,
  scene: "calculator",
  tags: ["work energy and power", "simple machines", "WAEC Physics", "NECO Physics", "JAMB Physics", "mechanical advantage", "velocity ratio", "efficiency"],
  excerpt: "Formulas, kinetic and potential energy, conservation of energy, power, efficiency, levers, pulleys and inclined planes, with ten fully worked numericals, common mistakes and a practice set with answers.",
  seo: {
    title: "Work, Energy, Power and Simple Machines: WAEC, NECO, JAMB",
    description: "Learn work, energy, power, efficiency, mechanical advantage and velocity ratio with ten worked numericals, common mistakes and a practice set with answers.",
    keywords: "work energy and power WAEC, simple machines JAMB Physics, mechanical advantage velocity ratio, efficiency of a machine, kinetic energy potential energy, NECO Physics"
  },
  faq: [
    { q: "What is the difference between work and power?", a: "Work is the energy transferred when a force moves an object, measured in joules. Power is how fast that work is done, measured in watts. Doing the same work in less time needs more power." },
    { q: "Why is the efficiency of a machine always less than 100 percent?", a: "Some of the energy you put in is wasted as heat and sound through friction, and some is used to lift moving parts such as the pulley block. So the useful work you get out is always less than the work you put in." },
    { q: "What is the difference between mechanical advantage and velocity ratio?", a: "Mechanical advantage is load divided by effort, so it is measured from forces. Velocity ratio is distance moved by the effort divided by distance moved by the load, so it is measured from distances. Efficiency equals MA divided by VR, then multiplied by 100." },
    { q: "Do I use g = 10 or 9.8 in the exam?", a: "Use the value the question gives. If none is given, check the instruction at the top of the paper. In this lesson every calculation uses g = 10 m/s<sup>2</sup>, which is the value many past papers state." },
    { q: "Does a machine reduce the work I must do?", a: "No. A machine lets you use a smaller effort or change the direction of the force, but you must move the effort over a longer distance. The work put in is never less than the work got out." },
    { q: "Is a joule the same as a watt?", a: "No. A joule is a unit of energy or work. A watt is one joule per second, a unit of power. Mixing them up is a very common slip." }
  ],
  content: `
<h2>The big picture: work, energy and power</h2>
<p>Work, energy and power make up one of the most reliable topics in Physics for WAEC, NECO and JAMB. The three ideas are linked: <strong>work</strong> is energy being transferred, <strong>energy</strong> is the ability to do work, and <strong>power</strong> is how quickly the work is done. Simple machines then show how we use these ideas to make jobs easier.</p>
<p>In this lesson we use <strong>g = 10 m/s<sup>2</sup></strong> for every calculation. Always use the value of g given in your question, because some papers use 9.8 m/s<sup>2</sup>.</p>
[[callout key|Units to know|Work and energy are measured in joules (J). Power is measured in watts (W), where 1 W = 1 J/s. Force is in newtons (N), distance in metres (m), mass in kilograms (kg).]]

<h2>Work done</h2>
<p>Work is done when a force moves an object in the direction of the force. If you push a wall and it does not move, you may feel tired, but in physics you have done no work.</p>
[[formula Work done|W = F x d|W is work in joules, F is force in newtons, d is distance moved in the direction of the force in metres.]]
<p>Work done against gravity in lifting an object is W = mgh, because the force needed equals the weight, mg, and the distance is the height h.</p>
[[qa A girl pushes a trolley with a force of 50 N through 12 m. How much work does she do?|W = F x d ; W = 50 x 12|W = 600 J]]
[[qa A boy lifts a 20 kg box onto a shelf 1.5 m high. Find the work done. Take g = 10 m/s2|Force needed = weight = mg = 20 x 10 = 200 N ; W = F x d = 200 x 1.5|W = 300 J]]

<h2>Kinetic and potential energy</h2>
<p>Energy comes in many forms, but your syllabus focuses on mechanical energy, which has two parts.</p>
<table>
<tr><th>Type</th><th>Meaning</th><th>Formula</th></tr>
<tr><td>Kinetic energy (KE)</td><td>Energy of a body because of its motion</td><td>KE = 1/2 mv<sup>2</sup></td></tr>
<tr><td>Potential energy (PE)</td><td>Energy stored because of position or condition</td><td>PE = mgh (gravitational)</td></tr>
</table>
<p>Notice that KE depends on the <em>square</em> of the speed. Doubling the speed makes the kinetic energy four times larger. This is why a fast vehicle is so much harder to stop, and why speed limits matter on our roads.</p>
[[qa Find the kinetic energy of a 1200 kg car moving at 15 m/s|KE = 1/2 x m x v<sup>2</sup> ; KE = 0.5 x 1200 x 15 x 15 ; KE = 600 x 225|KE = 135 000 J (135 kJ)]]
[[qa What is the potential energy of a 5 kg stone at the top of an 8 m building? Take g = 10 m/s2|PE = mgh ; PE = 5 x 10 x 8|PE = 400 J]]
<p>Potential energy also includes <em>elastic</em> potential energy, such as the energy stored in a stretched spring or a drawn catapult. Chemical energy in food and fuel is another stored form. WAEC objective questions often ask you to name the energy change in a device, so learn a few: a generator changes kinetic energy to electrical energy, a battery changes chemical to electrical, and a solar panel changes light to electrical.</p>

<h2>The principle of conservation of energy</h2>
<p>Energy cannot be created or destroyed. It can only change from one form to another. The total energy of an isolated system stays the same. For a falling object with no air resistance, potential energy lost equals kinetic energy gained.</p>
[[flow Object at the top: all PE ; Falls: PE turns into KE ; Halfway: PE and KE share the energy ; Just before the ground: all KE]]
<p>This gives a very useful shortcut. If an object falls freely from height h, then mgh = 1/2 mv<sup>2</sup>. The mass cancels, so the final speed does not depend on the mass:</p>
[[formula Speed after a free fall|v<sup>2</sup> = 2gh|v is the speed just before landing, g = 10 m/s<sup>2</sup>, h is the height fallen in metres.]]
[[qa A ball is dropped from a height of 20 m. Find its speed just before it hits the ground. Take g = 10 m/s2|Loss in PE = gain in KE ; mgh = 1/2 mv<sup>2</sup> so v<sup>2</sup> = 2gh ; v<sup>2</sup> = 2 x 10 x 20 = 400 ; v = square root of 400|v = 20 m/s]]
[[qa For the same ball, find its speed when it is 5 m above the ground|Height fallen = 20 - 5 = 15 m ; v<sup>2</sup> = 2 x 10 x 15 = 300 ; v = square root of 300|v = 17.3 m/s (to 3 significant figures)]]
<p>Pay attention to the second question. The ball has fallen only 15 m, not 20 m. Students often use the starting height instead of the distance fallen.</p>

<h2>Work-energy link and stopping a vehicle</h2>
<p>When a force changes the speed of an object, the work done equals the change in kinetic energy. This helps with braking questions.</p>
[[qa A 1000 kg car moving at 20 m/s is brought to rest in 40 m. Find the average braking force|KE lost = 1/2 x 1000 x 20 x 20 = 200 000 J ; Work done by brakes = F x d = KE lost ; F x 40 = 200 000 ; F = 200 000 / 40|F = 5000 N]]

<h2>Power</h2>
<p>Power is the rate of doing work, or the rate of using energy. A strong person and a weak person may both carry a bag of rice up a staircase, doing the same work, but the one who finishes faster has more power.</p>
[[formula Power|P = W / t = E / t|P is power in watts, W is work (or energy) in joules, t is time in seconds. For a moving body, P = F x v.]]
<p>Two points to remember. First, always convert time to seconds: 2 minutes is 120 s. Second, larger units are common: 1 kW = 1000 W, and electrical energy bills use the kilowatt-hour, where 1 kWh = 3 600 000 J.</p>
[[qa A pump raises 600 kg of water through 10 m in 2 minutes. Find its power output. Take g = 10 m/s2|Work = mgh = 600 x 10 x 10 = 60 000 J ; Time = 2 x 60 = 120 s ; P = W / t = 60 000 / 120|P = 500 W]]
[[qa A student of mass 60 kg climbs a staircase 3 m high in 6 s. Calculate her power. Take g = 10 m/s2|Work = mgh = 60 x 10 x 3 = 1800 J ; P = 1800 / 6|P = 300 W]]
[[qa A car engine exerts a steady driving force of 2000 N at a constant speed of 20 m/s. Find the power|P = F x v ; P = 2000 x 20|P = 40 000 W = 40 kW]]

<h2>Simple machines: the key words</h2>
<p>A machine is a device that makes work easier by letting a small force (the effort) overcome a larger force (the load). The common simple machines are the lever, the pulley, the inclined plane, the wheel and axle, the screw, the wedge and the gear. Four quantities describe how a machine performs.</p>
<table>
<tr><th>Quantity</th><th>Formula</th><th>Unit</th></tr>
<tr><td>Mechanical advantage (MA)</td><td>Load / Effort</td><td>No unit</td></tr>
<tr><td>Velocity ratio (VR)</td><td>Distance moved by effort / Distance moved by load</td><td>No unit</td></tr>
<tr><td>Efficiency</td><td>(Work output / Work input) x 100, which equals (MA / VR) x 100</td><td>Percent</td></tr>
<tr><td>Work input</td><td>Effort x distance moved by effort</td><td>J</td></tr>
</table>
[[callout key|No machine is 100 percent efficient|Friction and the weight of moving parts waste some energy as heat. So work output is always less than work input, and MA is always less than VR for a real machine.]]
<p>Another important truth: a machine does not give you free work. If a machine lets you lift a 800 N load with only 250 N of effort, you must pull the effort through a longer distance. What you gain in force, you pay for in distance.</p>
[[qa A pulley system with VR = 4 is used to raise a load of 800 N with an effort of 250 N. Find the MA and the efficiency|MA = Load / Effort = 800 / 250 = 3.2 ; Efficiency = (MA / VR) x 100 = (3.2 / 4) x 100|MA = 3.2 and efficiency = 80 percent]]
[[qa Check the last answer using work: the load rises 1 m, so the effort moves 4 m|Work output = 800 x 1 = 800 J ; Work input = 250 x 4 = 1000 J ; Efficiency = 800 / 1000 x 100|Efficiency = 80 percent, the same result]]

<h2>Levers</h2>
<p>A lever is a rigid bar that turns about a fixed point called the fulcrum. There are three classes, defined by what lies in the middle.</p>
<table>
<tr><th>Class</th><th>Middle position</th><th>Everyday examples</th></tr>
<tr><td>First</td><td>Fulcrum</td><td>See-saw, scissors, crowbar</td></tr>
<tr><td>Second</td><td>Load</td><td>Wheelbarrow, bottle opener, nutcracker</td></tr>
<tr><td>Third</td><td>Effort</td><td>Tongs, fishing rod, the human forearm</td></tr>
</table>
<p>For an ideal lever in balance, use the principle of moments: effort x effort arm = load x load arm. The velocity ratio is the effort arm divided by the load arm.</p>
[[qa A crowbar has an effort arm of 1.2 m and a load arm of 0.3 m. What effort lifts a load of 600 N, ignoring friction?|VR = 1.2 / 0.3 = 4 ; Effort x 1.2 = 600 x 0.3 ; Effort = 180 / 1.2|Effort = 150 N, and MA = 600 / 150 = 4, equal to the VR because there is no friction]]

<h2>Pulleys and the inclined plane</h2>
<p>A single fixed pulley only changes the direction of the force, so its VR is 1. For a block and tackle, the VR equals the number of rope sections supporting the movable block. More supporting strings mean a bigger VR and a smaller effort, but you must pull more rope.</p>
<p>An inclined plane, such as a ramp for loading goods onto a truck, lets you raise a load with less effort over a longer path. Its velocity ratio is the length of the slope divided by the height.</p>
[[formula Inclined plane|VR = length of slope / vertical height|Ideal effort = load / VR. In a real plane, friction makes the effort larger.]]
[[qa A 5 m ramp rises 1 m. A 500 N load is pulled up with an effort of 160 N. Find the VR, MA and efficiency|VR = 5 / 1 = 5 ; MA = 500 / 160 = 3.125 ; Efficiency = (3.125 / 5) x 100 = 62.5 percent|VR = 5, MA = 3.125 (about 3.1) and efficiency = 62.5 percent]]
<p>You can confirm this with work: output = 500 x 1 = 500 J, input = 160 x 5 = 800 J, and 500 / 800 = 62.5 percent. When a question asks for efficiency, always check which route is easier from the data given.</p>

<h2>Common mistakes that cost marks</h2>
[[compare Common mistake|Better way|Using minutes or hours directly in P = W / t ; Using the starting height when the object has not fallen all the way ; Writing mass in grams in KE or PE ; Calling MA the ratio of distances ; Quoting efficiency above 100 percent ; Forgetting the unit or mixing J and W|Convert to seconds first ; Use the distance fallen for v<sup>2</sup> = 2gh ; Convert grams to kilograms before you start ; MA is load over effort and VR is the ratio of distances ; Check that output is less than input ; Write J for work and W for power]]
<p>Also remember to write the formula first, substitute with units, and then state the answer with its unit. In theory papers, the method earns marks even if arithmetic slips.</p>

<h2>Practice set</h2>
<p>Take g = 10 m/s<sup>2</sup>. Try each question before you look at the answers.</p>
<ol>
<li>A force of 40 N moves an object 6 m in its own direction. Find the work done.</li>
<li>Calculate the kinetic energy of a 2 kg mass moving at 6 m/s.</li>
<li>What is the potential energy of a 3 kg object 12 m above the ground?</li>
<li>A stone is dropped from a height of 45 m. Find its speed just before it lands.</li>
<li>A motor lifts a 250 kg load through 6 m in 30 s. Find its power.</li>
<li>A machine has MA = 6 and VR = 8. Find its efficiency.</li>
<li>A ramp has length 4 m and height 1 m. A load of 800 N is raised with an effort of 250 N. Find the VR, the MA and the efficiency.</li>
<li>An engine develops 50 kW and drives a vehicle at a steady 25 m/s. Find the driving force.</li>
</ol>
[[callout fact|Answers|1) 240 J. 2) 36 J. 3) 360 J. 4) 30 m/s. 5) 500 W. 6) 75 percent. 7) VR = 4, MA = 3.2, efficiency = 80 percent. 8) F = P / v = 50 000 / 25 = 2000 N.]]

<h2>What to do today</h2>
<p>Do not just read this lesson. Write each formula from memory and solve each worked question again on paper. Physics is learned by calculating.</p>
[[checklist Write W = Fd, KE, PE, P = W/t, MA, VR and efficiency on one card ; Redo the free-fall and pump examples without looking ; Draw the three classes of lever and name two examples of each ; Solve practice questions 4, 7 and 8 and check your answers ; Convert five times from minutes to seconds and five masses from grams to kilograms ; Try one past WAEC or NECO work, energy and power question on the EliteScholars app]]
`
},{
  id: "how-to-start-a-small-business-with-little-capital-in-nigeria",
  title: "How to start a small business with little capital in Nigeria: a practical guide",
  category: "study-tips",
  categoryLabel: "Study Tips",
  author: "Michael Joseph",
  authorAvatar: "avatar_1",
  publishAt: "2026-12-18T07:00:00+01:00",
  readTime: 9,
  scene: "chat",
  tags: ["small business Nigeria", "start a business with little money", "business ideas for graduates", "pricing", "record keeping", "first customers", "side hustle", "entrepreneurship"],
  excerpt: "You do not need millions to begin. Learn how to find a real problem, test your idea cheaply, work out your costs and price, keep your money separate, win your first customers and avoid the mistakes that sink small businesses.",
  seo: {
    title: "How to Start a Small Business With Little Capital in Nigeria",
    description: "A practical guide for graduates and school leavers: find a problem, test your idea cheaply, cost and price with a worked example, keep records and win customers.",
    keywords: "start a small business in Nigeria, business with little capital, business ideas for graduates, how to price products, business record keeping, side hustle Nigeria"
  },
  faq: [
    { q: "How much money do I need to start?", a: "It depends on the business, but many people begin with whatever they can spare for a first small batch or a first few customers. A service you already have skills for can start with almost nothing but your time and a phone. Start small, test, then grow from what you earn." },
    { q: "Should I quit my job or leave school work before starting?", a: "Usually it is safer to begin on the side while you still have another source of income. Run the business part-time until it pays you reliably and you understand your numbers, then decide about going full-time." },
    { q: "What if I have no idea what business to do?", a: "Start with problems. List the daily frustrations you and the people around you face, then match them with skills you already have or can learn quickly. A business built on a real problem is easier to sell than one built on a trend." },
    { q: "Should I borrow money to begin?", a: "Be very careful. Debt makes mistakes expensive, and a new business makes many mistakes. Try to begin with savings or a small gift, prove that customers will pay, and only then think about borrowing for growth, with a clear plan for repayment." },
    { q: "Do I need to register the business immediately?", a: "Rules and requirements change and differ by business type, so check the current official guidance or ask a qualified adviser when you are ready. You can often test an idea first, then formalise as the business becomes real." },
    { q: "How do I know the business is working?", a: "Check whether, after paying for everything including a fair amount for your own time, you have money left over, and whether customers come back or send others. Repeat customers and real profit are the best signals." }
  ],
  content: `
<h2>You do not need a lot of money to begin</h2>
<p>Many graduates, school leavers and young workers want to start something of their own, then stop at the first hurdle: <em>I do not have enough capital.</em> It is a fair worry. But a large part of what makes small businesses work is not money. It is choosing a real problem, testing quickly, counting carefully and serving people well.</p>
<p>This guide is for anyone who is waiting for results or a job, finishing school, working but wanting extra income, or simply tired of waiting. It is educational only. It will not promise riches, and nothing here is financial advice for your exact situation. What it will give you is a clear method that costs very little to try.</p>
[[callout key|The idea in one line|Start small, solve a real problem for a real person, count every naira, and let early customers teach you how to grow.]]

<h2>Step 1: Start with a problem, not a product</h2>
<p>Beginners often start with a product they like: <em>I want to sell shoes.</em> A better start is a problem that people already pay to solve. Walk around your own street, hostel, market or WhatsApp groups and listen to complaints. Where do people lose time, money or patience?</p>
<ul>
<li><strong>Time:</strong> busy workers who cannot cook, clean or run errands.</li>
<li><strong>Quality:</strong> people who cannot find a reliable tailor, barber, phone repairer or printer.</li>
<li><strong>Access:</strong> products that are hard to find in your area but easy to find elsewhere.</li>
<li><strong>Skills:</strong> small businesses that need help with posters, social media, bookkeeping or typing.</li>
</ul>
<p>Now compare your list with what you can already do. A skill you have, such as cooking, graphic design, hair, writing, tutoring, repairs, farming or selling, plus a problem you have seen, is a strong starting point. You will learn faster and spend less than if you begin from nothing.</p>
[[checklist Write ten problems you saw or heard about this week ; Circle the ones people already spend money on ; Tick the ones you could solve with skills you have ; Choose one problem and describe the customer in one sentence]]

<h2>Step 2: Test your idea cheaply before you spend</h2>
<p>The most expensive mistake is to buy a lot of stock or equipment before anyone has said yes. Instead, test first, with the smallest version of the idea that a real customer can pay for.</p>
[[steps Talk to ten people::Ask people who face the problem how they handle it now, what it costs them and what annoys them. Listen more than you speak. ; Offer before you build::Tell them what you plan to sell and the price. Ask if they would buy this week. A promise to pay or a small advance is better than a compliment. ; Make a small batch::Prepare only enough for a handful of customers, or offer the service to a few people. ; Watch what happens::Did they buy? Did they complain? Did they come back or tell others? ; Adjust::Change the product, price or way of selling, then test again.]]
<p>Be careful about asking only friends and family. They love you and may say yes to be kind. Ask people who are not afraid to say no. If ten strangers show interest and two actually pay, you have learned something real. If nobody pays, you have also learned something, and it cost you very little.</p>

<h2>Step 3: Work out your costs and your price</h2>
<p>Many small sellers set their price by copying the person next to them, or by guessing. That is how people work hard and still end the month with nothing. Your price must cover three things: what it costs you to make or buy, the costs of selling, and a fair reward for your effort.</p>
<p>Here are the main kinds of cost:</p>
<table>
<tr><th>Cost type</th><th>Meaning</th><th>Common examples</th></tr>
<tr><td>Direct cost</td><td>Money spent on each batch or job</td><td>Ingredients, materials, bottles, packaging</td></tr>
<tr><td>Running cost</td><td>Money spent to operate</td><td>Cooking gas, transport, data, electricity</td></tr>
<tr><td>Loss</td><td>Items you cannot sell</td><td>Spoilage, breakage, unsold stock</td></tr>
<tr><td>Your time</td><td>Hours you put in</td><td>Cooking, delivering, serving customers</td></tr>
</table>
[[callout warn|Do not forget your time|If you count only materials, you are working for free. Give your time a modest value, even if you cannot yet pay yourself that amount, so you see what the business really earns.]]

<h3>A worked example: a small zobo business</h3>
<p>Chinwe wants to sell bottled zobo to office workers. The prices below are for illustration only, so check your own local prices. She plans a batch of 100 bottles.</p>
<table>
<tr><th>Item in one batch</th><th>Cost in naira</th></tr>
<tr><td>Dried hibiscus leaves</td><td>4,000</td></tr>
<tr><td>Sugar</td><td>2,500</td></tr>
<tr><td>Ginger and pineapple</td><td>3,000</td></tr>
<tr><td>100 bottles at 100 each</td><td>10,000</td></tr>
<tr><td>Cooking gas</td><td>2,500</td></tr>
<tr><td>Transport</td><td>1,500</td></tr>
<tr><td>Total direct and running cost</td><td>23,500</td></tr>
</table>
<p>She also expects about 5 bottles to spoil or leak, so only 95 can be sold. And she spends 5 hours on each batch. She decides her time is worth 500 naira an hour, so that is 2,500 naira.</p>
[[qa What is Chinwe's cost per bottle sold, and what profit does she make at 400 naira a bottle?|Total cost including time = 23 500 + 2 500 = 26 000 naira ; Bottles sold = 100 - 5 = 95 ; Cost per bottle = 26 000 / 95 = about 274 naira ; Revenue at 400 = 95 x 400 = 38 000 naira ; Profit = 38 000 - 26 000 = 12 000 naira|Cost is about 274 naira per bottle and the profit is 12 000 naira per batch, about 32 percent of sales]]
[[qa How many bottles must she sell at 400 naira just to cover all her costs? And what if she lowers the price to 300 naira?|Break-even at 400 = 26 000 / 400 = 65 bottles ; At 300 naira, revenue = 95 x 300 = 28 500 naira ; Profit = 28 500 - 26 000 = 2 500 naira|She needs 65 bottles to break even at 400 naira. At 300 naira the profit falls from 12 000 to only 2 500 per batch]]
<p>This is why guessing is dangerous. A 100 naira drop in price looks small, but it cut her profit by almost four-fifths. Equally, if 95 bottles are not sold because she cannot find enough buyers, the maths changes again. Check your own numbers before you set a price.</p>
[[formula Simple pricing check|Cost per unit = total cost / units sold   Profit = revenue - total cost   Break-even units = total cost / price|Use units that you really expect to sell, not the number you hope for.]]
<p>Also compare your price with what customers can bear and with competitors. If your price is far above others, you need a clear reason, such as better quality, delivery or convenience. If it is far below, you may be leaving money on the table or attracting customers who will not stay.</p>

<h2>Step 4: Separate personal money from business money</h2>
<p>This is the habit that quietly decides whether a small business survives. When business money and personal money mix in one pocket, you cannot tell if the business is making a profit. You may spend your capital on rent or data and think the business has failed, or spend your profit and not notice.</p>
<ul>
<li>Open a separate account, or at least a separate wallet, used only for the business.</li>
<li>Pay business costs from the business money, and pay yourself a fixed amount at set times.</li>
<li>If you borrow from the business for personal needs, write it down and put it back.</li>
<li>Do not count your capital as income. Capital is the money you started with; profit is what is left after all costs.</li>
</ul>
[[compare Mixed money|Separate money|Everything in one account or pocket ; Spending whatever is in hand ; No idea whether the business made profit ; Taking money for family needs without a note|One account or wallet for the business only ; Paying yourself a fixed amount ; Knowing your profit each week ; Writing down every withdrawal and repaying it]]

<h2>Step 5: Keep simple records every day</h2>
<p>You do not need software or an accountant to start. A notebook or a phone note is enough, as long as you use it daily. Record three things: money in, money out and stock.</p>
<table>
<tr><th>Date</th><th>What happened</th><th>Money in</th><th>Money out</th></tr>
<tr><td>Monday</td><td>Sold 12 bottles at 400</td><td>4,800</td><td></td></tr>
<tr><td>Monday</td><td>Bought ice and transport</td><td></td><td>1,200</td></tr>
<tr><td>Tuesday</td><td>Sold 9 bottles at 400</td><td>3,600</td><td></td></tr>
</table>
<p>At the end of each week, add the money in, subtract the money out, and compare it with your target. The records also help you notice patterns, such as which day is busiest, which product sells best and which cost is quietly growing. Keep receipts or messages for large purchases. If you sell on credit, record who owes you, how much and by when.</p>

<h2>Step 6: Win your first customers</h2>
<p>Your first customers rarely come from adverts. They come from people who already know you, and from people you go to meet.</p>
<ul>
<li><strong>Tell your circle clearly.</strong> Instead of saying <em>I am doing a business</em>, say exactly what you sell, who it is for and how to order.</li>
<li><strong>Go where the problem is.</strong> Offices, markets, campuses, estates, churches and mosques, and online groups all hold people with problems you may solve.</li>
<li><strong>Give a small taste.</strong> A sample, a trial or a first small discount lets people try without risk. Do it on purpose and for a limited time.</li>
<li><strong>Use your phone well.</strong> Clear photos, a short description, a price and a contact number on WhatsApp or social media go a long way.</li>
<li><strong>Ask for referrals.</strong> After you serve someone well, politely ask them to tell one friend.</li>
</ul>
<p>Above all, deliver what you promised, on time. In a small business, trust is your biggest asset, and one reliable customer often becomes five.</p>
[[timeline Week 1::Pick the problem and talk to ten people ; Week 2::Make a small test batch and offer it to five customers ; Week 3::Record costs and sales, then set your price ; Week 4::Review what worked, fix one thing and sell again]]

<h2>Common mistakes to avoid</h2>
[[compare Common mistake|Better way|Spending all your money on stock before testing ; Copying a price without knowing your cost ; Mixing personal and business money ; Giving credit to everyone and not recording it ; Chasing every trend ; Hiding when a customer complains|Start with a small test batch ; Cost every item and then set the price ; Use a separate account and pay yourself ; Record each debt and follow up politely ; Stay with one problem until it works ; Listen, apologise and fix it]]
<p>Another mistake is growing too fast. When the first few weeks go well, it is tempting to expand at once. Grow in steps that your records can support. Finally, beware of schemes that promise quick money in exchange for a fee. A real business grows from customers who pay for something useful, not from recruiting other people.</p>

<h2>What to do today</h2>
<p>You do not have to wait for the perfect idea or a large sum. Begin with one small, honest step and let the results guide the next one.</p>
[[checklist Write down ten daily problems around you and pick one to study ; Talk to five people who face that problem and note what they say ; List every cost of a small first batch and calculate the cost per unit ; Set a test price and work out your break-even number ; Open a separate wallet or account for the business ; Start a notebook for money in, money out and stock ; Offer your first small batch to three real customers this week]]
`
});
