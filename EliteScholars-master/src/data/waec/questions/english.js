// ============================================================================
// WAEC English — Question Bank & Learn Content
// ============================================================================

export const WAEC_ENGLISH = [
  {
    q: 'Choose the word nearest in meaning to GARRULOUS.',
    o: ['Talkative', 'Silent', 'Aggressive', 'Timid'],
    a: 0,
    e: 'Garrulous means excessively talkative, especially on trivial matters.',
    h: 'Think of someone who talks non-stop.',
    yr: '2023',
  },
  {
    q: 'In the sentence "The committee have reached their decision", the subject is:',
    o: ['Singular', 'Plural', 'Collective', 'Abstract'],
    a: 2,
    e: 'The committee is a collective noun. It can take a plural verb when members act individually.',
    h: 'Collective nouns name a group.',
    yr: '2022',
  },
  {
    q: 'Which of the following is a rhetorical question?',
    o: ['Where are you going?', 'Is the sky not blue?', 'What time is it?', 'Who told you that?'],
    a: 1,
    e: 'A rhetorical question is asked for effect, not to get an answer.',
    h: 'No answer is expected.',
    yr: '2022',
  },
  {
    q: 'Identify the correct spelling.',
    o: ['Accomodation', 'Accommodation', 'Acommodation', 'Accommodaton'],
    a: 1,
    e: 'Accommodation has double "c" and double "m".',
    h: "Two c's, two m's.",
    yr: '2021',
  },
  {
    q: 'The figure of speech in "the road swallowed him" is:',
    o: ['Simile', 'Hyperbole', 'Personification', 'Irony'],
    a: 2,
    e: 'Giving the road a human action (swallowing) is personification.',
    h: 'Is a non-human thing doing a human action?',
    yr: '2023',
  },
  {
    q: 'Choose the word that is OPPOSITE in meaning to LOQUACIOUS.',
    o: ['Verbose', 'Taciturn', 'Boisterous', 'Eloquent'],
    a: 1,
    e: 'Loquacious means very talkative. Taciturn means reserved or untalkative — the opposite.',
    h: 'Think of someone who rarely speaks.',
    yr: '2022',
  },
  {
    q: 'Which of the following sentences contains a dangling modifier?',
    o: [
      'Running fast, he reached the bus.',
      'Running fast, the bus was missed.',
      'He ran fast and caught the bus.',
      'Fast as he ran, he caught the bus.',
    ],
    a: 1,
    e: '"Running fast" has no clear subject in option B. The modifier "dangling" refers to the bus, not the person running.',
    h: 'What is actually running fast?',
    yr: '2023',
  },
  {
    q: 'The word "ephemeral" means:',
    o: ['Eternal', 'Short-lived', 'Mysterious', 'Powerful'],
    a: 1,
    e: 'Ephemeral means lasting for a very short time (e.g. "the ephemeral beauty of a sunset").',
    h: 'Think "here today, gone tomorrow".',
    yr: '2021',
  },
  {
    q: 'Identify the type of clause: "When the rain falls, rivers flood."',
    o: ['Independent clause', 'Adverbial clause', 'Noun clause', 'Relative clause'],
    a: 1,
    e: '"When the rain falls" is an adverbial clause of time modifying the main verb "flood".',
    h: 'It tells us when something happens.',
    yr: '2022',
  },
  {
    q: 'Which sentence uses the apostrophe correctly?',
    o: [
      'Its raining outside.',
      "The dog wagged it's tail.",
      'The dog wagged its tail.',
      "Its' a lovely day.",
    ],
    a: 2,
    e: '"Its" (possessive, no apostrophe) is correct here. "It\'s" = "it is" — a contraction, not possessive.',
    h: 'Possessive "its" never has an apostrophe.',
    yr: '2023',
  },
];

// ============================================================================
// WAEC English Learn Content — Topic 1 is RICH with HTML/SVG illustrations
// ============================================================================

export const WAEC_ENGLISH_LEARN = [
  {
    topic: 'Parts of Speech',
    // contentHTML is used by the WaecLearn component for rich rendering
    contentHTML: `
<div class="learn-intro">
  Every word in English belongs to one or more <span class="learn-keyword">parts of speech</span>. There are <strong>eight</strong> parts of speech — mastering them is essential for WAEC grammar questions.
</div>

<h3 class="learn-subheading">The Eight Parts of Speech</h3>

<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Part of Speech</th><th>Role</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td><span class="learn-keyword">Noun</span></td><td>Names a person, place, thing, or idea</td><td>Emeka, Lagos, book, love</td></tr>
      <tr><td><span class="learn-keyword">Pronoun</span></td><td>Replaces a noun</td><td>he, she, they, it, we</td></tr>
      <tr><td><span class="learn-keyword">Verb</span></td><td>Expresses action or state</td><td>run, is, think, become</td></tr>
      <tr><td><span class="learn-keyword">Adjective</span></td><td>Describes a noun or pronoun</td><td>tall, bright, Nigerian</td></tr>
      <tr><td><span class="learn-keyword">Adverb</span></td><td>Modifies a verb, adjective, or adverb</td><td>quickly, very, here, soon</td></tr>
      <tr><td><span class="learn-keyword">Preposition</span></td><td>Shows relationship between words</td><td>in, on, at, between, beside</td></tr>
      <tr><td><span class="learn-keyword">Conjunction</span></td><td>Connects words, phrases, or clauses</td><td>and, but, or, because, although</td></tr>
      <tr><td><span class="learn-keyword">Interjection</span></td><td>Expresses emotion or exclamation</td><td>Oh! Wow! Alas! Hurray!</td></tr>
    </tbody>
  </table>
</div>

<h3 class="learn-subheading">SVG Illustration — Sentence Anatomy</h3>

<div class="learn-svg-wrap">
  <svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg" class="learn-svg">
    <!-- Background -->
    <rect width="340" height="120" rx="12" fill="#f8faff" stroke="#dbeafe" stroke-width="1.5"/>
    <!-- Title -->
    <text x="170" y="18" text-anchor="middle" font-size="9" fill="#64748b" font-family="sans-serif" font-weight="600">SENTENCE: "Bright Emeka quickly ran to school."</text>
    <!-- Words with labels -->
    <!-- Bright -->
    <rect x="8" y="28" width="46" height="22" rx="6" fill="#dbeafe"/>
    <text x="31" y="43" text-anchor="middle" font-size="10" fill="#1d4ed8" font-family="sans-serif" font-weight="700">Bright</text>
    <text x="31" y="62" text-anchor="middle" font-size="8" fill="#7c3aed" font-family="sans-serif">Adjective</text>
    <!-- Emeka -->
    <rect x="60" y="28" width="48" height="22" rx="6" fill="#fef3c7"/>
    <text x="84" y="43" text-anchor="middle" font-size="10" fill="#b45309" font-family="sans-serif" font-weight="700">Emeka</text>
    <text x="84" y="62" text-anchor="middle" font-size="8" fill="#7c3aed" font-family="sans-serif">Noun</text>
    <!-- quickly -->
    <rect x="114" y="28" width="50" height="22" rx="6" fill="#dcfce7"/>
    <text x="139" y="43" text-anchor="middle" font-size="10" fill="#065f46" font-family="sans-serif" font-weight="700">quickly</text>
    <text x="139" y="62" text-anchor="middle" font-size="8" fill="#7c3aed" font-family="sans-serif">Adverb</text>
    <!-- ran -->
    <rect x="170" y="28" width="36" height="22" rx="6" fill="#fee2e2"/>
    <text x="188" y="43" text-anchor="middle" font-size="10" fill="#9a3412" font-family="sans-serif" font-weight="700">ran</text>
    <text x="188" y="62" text-anchor="middle" font-size="8" fill="#7c3aed" font-family="sans-serif">Verb</text>
    <!-- to -->
    <rect x="212" y="28" width="28" height="22" rx="6" fill="#ede9fe"/>
    <text x="226" y="43" text-anchor="middle" font-size="10" fill="#7c3aed" font-family="sans-serif" font-weight="700">to</text>
    <text x="226" y="62" text-anchor="middle" font-size="8" fill="#7c3aed" font-family="sans-serif">Preposition</text>
    <!-- school -->
    <rect x="246" y="28" width="46" height="22" rx="6" fill="#fce7f3"/>
    <text x="269" y="43" text-anchor="middle" font-size="10" fill="#831843" font-family="sans-serif" font-weight="700">school</text>
    <text x="269" y="62" text-anchor="middle" font-size="8" fill="#7c3aed" font-family="sans-serif">Noun</text>
    <!-- Legend -->
    <text x="170" y="90" text-anchor="middle" font-size="8" fill="#94a3b8" font-family="sans-serif">Colour-coded sentence anatomy — each box = a different part of speech</text>
    <!-- Arrows -->
    <line x1="84" y1="50" x2="84" y2="68" stroke="#b45309" stroke-width="1" marker-end="url(#arr)"/>
    <defs><marker id="arr" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4 Z" fill="#b45309"/></marker></defs>
  </svg>
</div>

<h3 class="learn-subheading">Nouns — Types</h3>
<p class="learn-p">Nouns are classified into five major types:</p>
<ul class="learn-list">
  <li><span class="learn-keyword">Proper Noun</span> — names a specific person, place, or thing (e.g., <em>Lagos, Chinua Achebe, Nike</em>). Always capitalised.</li>
  <li><span class="learn-keyword">Common Noun</span> — general name for a class (e.g., <em>city, writer, shoe</em>).</li>
  <li><span class="learn-keyword">Collective Noun</span> — names a group (e.g., <em>committee, flock, team</em>).</li>
  <li><span class="learn-keyword">Abstract Noun</span> — names a quality or idea (e.g., <em>beauty, justice, happiness</em>).</li>
  <li><span class="learn-keyword">Concrete Noun</span> — names a tangible thing (e.g., <em>table, rain, pen</em>).</li>
</ul>

<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>WAEC Tip:</strong> Collective nouns can take singular or plural verbs depending on whether members act as a unit or individually. "The team <em>is</em> winning" (unit) vs "The team <em>are</em> arguing" (individuals).</span>
</div>

<h3 class="learn-subheading">Verbs — Tense Overview</h3>
<p class="learn-p">Verbs indicate action and time. The main tense groups in WAEC are:</p>

<div class="learn-tense-grid">
  <div class="learn-tense-card learn-tense-past">
    <div class="learn-tense-title">Past</div>
    <div class="learn-tense-example">I <strong>ate</strong> rice.</div>
    <div class="learn-tense-note">Simple Past</div>
  </div>
  <div class="learn-tense-card learn-tense-present">
    <div class="learn-tense-title">Present</div>
    <div class="learn-tense-example">I <strong>eat</strong> rice.</div>
    <div class="learn-tense-note">Simple Present</div>
  </div>
  <div class="learn-tense-card learn-tense-future">
    <div class="learn-tense-title">Future</div>
    <div class="learn-tense-example">I <strong>will eat</strong> rice.</div>
    <div class="learn-tense-note">Simple Future</div>
  </div>
</div>

<div class="learn-tip-box learn-tip-warn">
  <span class="learn-tip-icon">⚠️</span>
  <span><strong>Common Error:</strong> "He <em>go</em> to school" is wrong. Third-person singular present requires: "He <em>goes</em> to school."</span>
</div>

<h3 class="learn-subheading">Conjunctions — Coordinators vs Subordinators</h3>
<p class="learn-p">Conjunctions join words, phrases, or clauses:</p>
<ul class="learn-list">
  <li><span class="learn-keyword">Coordinating</span> (FANBOYS): <em>For, And, Nor, But, Or, Yet, So</em></li>
  <li><span class="learn-keyword">Subordinating</span>: <em>because, although, when, since, unless, after, before, if</em></li>
  <li><span class="learn-keyword">Correlative</span>: <em>either…or, neither…nor, both…and, not only…but also</em></li>
</ul>
    `,
    content:
      'Every word in English belongs to one or more parts of speech. The eight parts of speech are: Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, and Interjection. Mastering them is essential for WAEC grammar questions.',
  },
  {
    topic: 'Figures of Speech',
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Figures of speech</span> are literary devices that convey meaning beyond the literal. WAEC consistently tests identification and effect of figures of speech.
</div>
<h3 class="learn-subheading">Major Figures of Speech</h3>
<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Figure</th><th>Definition</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td><span class="learn-keyword">Simile</span></td><td>Comparison using "like" or "as"</td><td>She is <em>as fast as</em> lightning.</td></tr>
      <tr><td><span class="learn-keyword">Metaphor</span></td><td>Direct comparison (no like/as)</td><td>Life is a <em>journey</em>.</td></tr>
      <tr><td><span class="learn-keyword">Personification</span></td><td>Human traits given to non-humans</td><td>The wind <em>whispered</em> through the trees.</td></tr>
      <tr><td><span class="learn-keyword">Hyperbole</span></td><td>Extreme exaggeration</td><td>I've told you a <em>million</em> times!</td></tr>
      <tr><td><span class="learn-keyword">Irony</span></td><td>Saying the opposite of what is meant</td><td>"What lovely weather!" (said in a storm)</td></tr>
      <tr><td><span class="learn-keyword">Oxymoron</span></td><td>Contradictory terms together</td><td><em>Bittersweet</em>, deafening silence</td></tr>
      <tr><td><span class="learn-keyword">Alliteration</span></td><td>Repetition of initial consonant sounds</td><td>Peter Piper picked a peck…</td></tr>
      <tr><td><span class="learn-keyword">Onomatopoeia</span></td><td>Words that imitate sounds</td><td>buzz, crash, hiss, sizzle</td></tr>
    </tbody>
  </table>
</div>
<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>Quick Test:</strong> Does it use "like" or "as"? → Simile. No like/as but still a comparison? → Metaphor. Non-human doing human things? → Personification.</span>
</div>
    `,
    content:
      'Simile compares using "like" or "as". Metaphor makes a direct comparison. Personification gives human traits to non-human things. Hyperbole uses exaggeration for emphasis. Irony says the opposite of what is meant. Oxymoron combines contradictory terms.',
  },
  {
    topic: 'Comprehension Skills',
    contentHTML: `
<div class="learn-intro">
  Comprehension questions test your ability to <span class="learn-keyword">read, understand, and analyse</span> a passage. They carry significant marks in WAEC English.
</div>
<h3 class="learn-subheading">Approach to Comprehension</h3>
<ol class="learn-list learn-ordered">
  <li><strong>Read the questions first</strong> — know what you're looking for before reading the passage.</li>
  <li><strong>Skim the passage</strong> — get the main idea, topic, and tone.</li>
  <li><strong>Read again carefully</strong> — pay attention to paragraphs and transitions.</li>
  <li><strong>Answer using the text</strong> — base your answers on evidence from the passage, not your general knowledge.</li>
  <li><strong>Vocabulary questions</strong> — use context clues, not just dictionary definitions.</li>
</ol>
<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>WAEC Tip:</strong> When asked for the "best title" of a passage, choose the one that covers the entire passage — not just one paragraph or detail.</span>
</div>
    `,
    content:
      'When reading a passage: identify the main idea first, then supporting details. Look for context clues for unfamiliar words. Pay attention to tone. Answer questions using evidence directly from the passage.',
  },
  {
    topic: 'Tenses & Concord',
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Concord</span> (subject-verb agreement) and correct <span class="learn-keyword">tense usage</span> are the most heavily tested grammar topics in WAEC.
</div>
<h3 class="learn-subheading">Key Concord Rules</h3>
<ul class="learn-list">
  <li>Singular subject → singular verb: "The <em>boy runs</em>."</li>
  <li>Plural subject → plural verb: "The <em>boys run</em>."</li>
  <li>Collective noun as unit → singular: "The <em>committee has</em> decided."</li>
  <li>Collective noun as individuals → plural: "The <em>committee are</em> divided."</li>
  <li>Neither/nor, Either/or → verb agrees with the nearer subject.</li>
</ul>
<h3 class="learn-subheading">The 12 Tenses</h3>
<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Tense</th><th>Form</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td>Simple Present</td><td>V / V+s</td><td>She reads books.</td></tr>
      <tr><td>Present Continuous</td><td>am/is/are + V-ing</td><td>She is reading.</td></tr>
      <tr><td>Present Perfect</td><td>has/have + V-ed</td><td>She has read it.</td></tr>
      <tr><td>Present Perfect Cont.</td><td>has/have been + V-ing</td><td>She has been reading.</td></tr>
      <tr><td>Simple Past</td><td>V-ed / irregular</td><td>She read it yesterday.</td></tr>
      <tr><td>Past Continuous</td><td>was/were + V-ing</td><td>She was reading.</td></tr>
      <tr><td>Past Perfect</td><td>had + V-ed</td><td>She had read it before.</td></tr>
      <tr><td>Past Perfect Cont.</td><td>had been + V-ing</td><td>She had been reading.</td></tr>
      <tr><td>Simple Future</td><td>will + V</td><td>She will read it.</td></tr>
      <tr><td>Future Continuous</td><td>will be + V-ing</td><td>She will be reading.</td></tr>
      <tr><td>Future Perfect</td><td>will have + V-ed</td><td>She will have read it.</td></tr>
      <tr><td>Future Perfect Cont.</td><td>will have been + V-ing</td><td>She will have been reading.</td></tr>
    </tbody>
  </table>
</div>
    `,
    content:
      'Subject-verb agreement (concord) is heavily tested. Singular subjects take singular verbs. Collective nouns can be singular or plural depending on context. Master all 12 tenses of English.',
  },
  {
    topic: 'Vocabulary — Synonyms & Antonyms',
    contentHTML: `
<div class="learn-intro">
  <span class="learn-keyword">Synonyms</span> are words with similar meanings. <span class="learn-keyword">Antonyms</span> are opposites. WAEC tests both in context — always choose the word that fits the sentence, not just any near-synonym.
</div>
<h3 class="learn-subheading">Common WAEC Vocabulary Pairs</h3>
<div class="learn-table-wrap">
  <table class="learn-table">
    <thead><tr><th>Word</th><th>Synonym</th><th>Antonym</th></tr></thead>
    <tbody>
      <tr><td>Garrulous</td><td>Talkative, Loquacious</td><td>Taciturn, Reserved</td></tr>
      <tr><td>Ephemeral</td><td>Transient, Fleeting</td><td>Eternal, Permanent</td></tr>
      <tr><td>Benevolent</td><td>Generous, Kind</td><td>Malevolent, Cruel</td></tr>
      <tr><td>Verbose</td><td>Wordy, Prolix</td><td>Concise, Succinct</td></tr>
      <tr><td>Audacious</td><td>Daring, Bold</td><td>Timid, Cowardly</td></tr>
      <tr><td>Amiable</td><td>Friendly, Affable</td><td>Hostile, Unfriendly</td></tr>
    </tbody>
  </table>
</div>
<div class="learn-tip-box">
  <span class="learn-tip-icon">💡</span>
  <span><strong>Strategy:</strong> When stuck between two synonyms, substitute each into the sentence and choose the one that fits the context most naturally.</span>
</div>
    `,
    content:
      'Synonyms are words with similar meanings. Antonyms are opposites. WAEC often tests near-synonyms — choose the word closest in meaning considering context, not just definition.',
  },
];
