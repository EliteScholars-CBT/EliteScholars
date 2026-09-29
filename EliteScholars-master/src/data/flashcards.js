// src/data/flashcards.js
// Based on official JAMB 2025/2026 syllabus [citation:3][citation:5][citation:8]

export const FLASHCARDS = {
  // ============================================================================
  // ENGLISH LANGUAGE (110 cards) - Based on JAMB Use of English syllabus
  // ============================================================================
  english: [
    // NOUNS (Cards 1-10)
    {
      id: 1,
      term: "Noun",
      definition: "A word that names a person, place, thing, or idea.",
      example: "The **student** read her **book** at the **library**.",
      tip: "Ask yourself: Can I put 'a', 'an', or 'the' before it?"
    },
    {
      id: 2,
      term: "Proper Noun",
      definition: "A specific name of a person, place, or thing, always capitalized.",
      example: "**John** lives in **Lagos**. He visited **Eiffel Tower**.",
      tip: "Proper nouns name unique entities and start with capital letters."
    },
    {
      id: 3,
      term: "Common Noun",
      definition: "A general name for a person, place, or thing.",
      example: "The **city** is busy. That **man** is a **teacher**.",
      tip: "Common nouns are not capitalized unless they start a sentence."
    },
    {
      id: 4,
      term: "Abstract Noun",
      definition: "Names an idea, feeling, quality, or concept you cannot touch.",
      example: "**Love**, **happiness**, **freedom**, and **courage** are abstract nouns.",
      tip: "If you cannot see, touch, or hear it, it's likely abstract."
    },
    {
      id: 5,
      term: "Collective Noun",
      definition: "A word that names a group of people, animals, or things.",
      example: "A **team** of players, a **flock** of sheep, a **committee** of experts.",
      tip: "Collective nouns can be singular or plural depending on context."
    },
    {
      id: 6,
      term: "Concrete Noun",
      definition: "Names something you can see, touch, hear, smell, or taste.",
      example: "**Table**, **apple**, **dog**, **music**, and **flower** are concrete nouns.",
      tip: "If you can experience it with your senses, it's concrete."
    },
    {
      id: 7,
      term: "Countable Noun",
      definition: "Nouns that can be counted and have plural forms.",
      example: "One **book**, two **books**, three **cars**, many **students**.",
      tip: "Countable nouns can be used with numbers and 'a/an'."
    },
    {
      id: 8,
      term: "Uncountable Noun",
      definition: "Nouns that cannot be counted and have no plural form.",
      example: "**Water**, **rice**, **information**, **advice**, **furniture**.",
      tip: "Uncountable nouns use 'some' not 'a/an'."
    },
    {
      id: 9,
      term: "Possessive Noun",
      definition: "Shows ownership or belonging, usually with an apostrophe.",
      example: "The **student's** book, the **teachers'** lounge, **Nigeria's** capital.",
      tip: "Add 's for singular, s' for plural nouns ending in s."
    },
    {
      id: 10,
      term: "Gerund",
      definition: "A verb form ending in -ing that functions as a noun.",
      example: "**Swimming** is good exercise. I enjoy **reading** novels.",
      tip: "Gerunds can be subjects, objects, or complements in sentences."
    },
    // PRONOUNS (Cards 11-20)
    {
      id: 11,
      term: "Pronoun",
      definition: "A word that takes the place of a noun to avoid repetition.",
      example: "**John** is here. **He** is my friend. (He replaces John)",
      tip: "Pronouns help make sentences less repetitive and smoother."
    },
    {
      id: 12,
      term: "Personal Pronoun",
      definition: "Refers to specific people or things (I, you, he, she, it, we, they).",
      example: "**I** am going. **She** called **me**. **They** saw **us**.",
      tip: "Personal pronouns change form based on case (subject/object)."
    },
    {
      id: 13,
      term: "Possessive Pronoun",
      definition: "Shows ownership without using an apostrophe.",
      example: "This book is **mine**. That bag is **hers**. The car is **ours**.",
      tip: "Possessive pronouns: mine, yours, his, hers, its, ours, theirs."
    },
    {
      id: 14,
      term: "Reflexive Pronoun",
      definition: "Refers back to the subject of the sentence, ends in -self or -selves.",
      example: "I taught **myself**. She hurt **herself**. They enjoyed **themselves**.",
      tip: "Reflexive pronouns show the action reflects back on the subject."
    },
    {
      id: 15,
      term: "Demonstrative Pronoun",
      definition: "Points to specific things (this, that, these, those).",
      example: "**This** is my car. **Those** are her shoes. **That** was amazing.",
      tip: "Use 'this/these' for nearby, 'that/those' for distant items."
    },
    {
      id: 16,
      term: "Interrogative Pronoun",
      definition: "Used to ask questions (who, whom, which, what, whose).",
      example: "**Who** is coming? **Which** do you prefer? **What** happened?",
      tip: "Interrogative pronouns help form questions."
    },
    {
      id: 17,
      term: "Relative Pronoun",
      definition: "Introduces a relative clause (who, whom, which, that, whose).",
      example: "The student **who** won is here. The book **that** I read was good.",
      tip: "Relative pronouns connect clauses and refer to a noun before them."
    },
    {
      id: 18,
      term: "Indefinite Pronoun",
      definition: "Refers to non-specific people or things (everyone, someone, anything).",
      example: "**Everyone** is here. **Someone** called. **Nothing** happened.",
      tip: "Indefinite pronouns are often singular (everyone, someone)."
    },
    {
      id: 19,
      term: "Reciprocal Pronoun",
      definition: "Shows mutual action or relationship (each other, one another).",
      example: "The teammates helped **each other**. The three friends loved **one another**.",
      tip: "Use 'each other' for two, 'one another' for three or more."
    },
    {
      id: 20,
      term: "Antecedent",
      definition: "The noun that a pronoun refers to or replaces.",
      example: "**Mary** lost **her** bag. (Mary is the antecedent of her)",
      tip: "Pronouns must agree with their antecedents in number and gender."
    },
    // VERBS (Cards 21-35)
    {
      id: 21,
      term: "Verb",
      definition: "An action word or state of being that tells what the subject does or is.",
      example: "She **runs** every morning. He **is** a teacher. They **were** happy.",
      tip: "Every complete sentence must have a verb."
    },
    {
      id: 22,
      term: "Action Verb",
      definition: "Shows a physical or mental action.",
      example: "She **runs** fast. He **thinks** deeply. They **build** houses.",
      tip: "Action verbs tell what the subject is doing."
    },
    {
      id: 23,
      term: "Linking Verb",
      definition: "Connects the subject to a word that describes or identifies it.",
      example: "She **is** a doctor. The food **tastes** good. He **seems** tired.",
      tip: "Common linking verbs: am, is, are, was, were, seem, become, feel."
    },
    {
      id: 24,
      term: "Helping Verb (Auxiliary)",
      definition: "Helps the main verb express time, mood, or voice.",
      example: "**She is running**. **They have gone**. **We will wait**.",
      tip: "Main helping verbs: be, am, is, are, was, were, have, has, had, do, does, did."
    },
    {
      id: 25,
      term: "Modal Verb",
      definition: "Expresses possibility, necessity, permission, or ability.",
      example: "You **must** study. I **can** swim. **May** I come in?",
      tip: "Modals: can, could, may, might, must, shall, should, will, would."
    },
    {
      id: 26,
      term: "Transitive Verb",
      definition: "Requires a direct object to complete its meaning.",
      example: "She **bought** a car. He **ate** the apple. They **built** a house.",
      tip: "Ask 'verb what?' If there's an answer, it's transitive."
    },
    {
      id: 27,
      term: "Intransitive Verb",
      definition: "Does not require a direct object to complete its meaning.",
      example: "She **slept**. He **arrived** late. The baby **cried**.",
      tip: "Intransitive verbs make complete sense without an object."
    },
    {
      id: 28,
      term: "Present Tense",
      definition: "Shows action happening now or habitual action.",
      example: "**I eat** breakfast daily. **She works** at a bank. **The sun rises** in the east.",
      tip: "Use present tense for facts, habits, and current situations."
    },
    {
      id: 29,
      term: "Past Tense",
      definition: "Shows action that happened and was completed in the past.",
      example: "**I ate** breakfast. **She worked** at a bank. **They arrived** yesterday.",
      tip: "Regular verbs add -ed; irregular verbs have special forms."
    },
    {
      id: 30,
      term: "Future Tense",
      definition: "Shows action that will happen in the future.",
      example: "**I will eat** breakfast. **She will work** tomorrow. **They will arrive** soon.",
      tip: "Use 'will' or 'shall' + base verb for simple future."
    },
    {
      id: 31,
      term: "Present Perfect Tense",
      definition: "Shows action that started in the past and continues or has results now.",
      example: "**I have eaten** already. **She has worked** here for 5 years.",
      tip: "Form: have/has + past participle."
    },
    {
      id: 32,
      term: "Past Perfect Tense",
      definition: "Shows action that was completed before another past action.",
      example: "**I had eaten** before they arrived. **She had left** when I called.",
      tip: "Form: had + past participle."
    },
    {
      id: 33,
      term: "Future Perfect Tense",
      definition: "Shows action that will be completed before a specific future time.",
      example: "**I will have finished** by noon. **She will have left** before you arrive.",
      tip: "Form: will have + past participle."
    },
    {
      id: 34,
      term: "Active Voice",
      definition: "The subject performs the action of the verb.",
      example: "**The boy kicked the ball**. **The teacher praised the student**.",
      tip: "Active voice is usually stronger and more direct."
    },
    {
      id: 35,
      term: "Passive Voice",
      definition: "The subject receives the action of the verb.",
      example: "**The ball was kicked by the boy**. **The student was praised**.",
      tip: "Passive voice: be + past participle. Use when the doer is unknown."
    },
    // ADJECTIVES & ADVERBS (Cards 36-45)
    {
      id: 36,
      term: "Adjective",
      definition: "A word that describes or modifies a noun or pronoun.",
      example: "The **beautiful** flower is **red**. She is a **smart** student.",
      tip: "Adjectives answer: What kind? Which one? How many?"
    },
    {
      id: 37,
      term: "Comparative Adjective",
      definition: "Compares two things, usually adding -er or using 'more'.",
      example: "She is **taller** than her brother. This book is **more interesting**.",
      tip: "Use -er for short adjectives, 'more' for longer ones."
    },
    {
      id: 38,
      term: "Superlative Adjective",
      definition: "Compares three or more things, showing the highest degree.",
      example: "She is the **tallest** in the class. This is the **most interesting** book.",
      tip: "Use -est for short adjectives, 'most' for longer ones."
    },
    {
      id: 39,
      term: "Adverb",
      definition: "Modifies a verb, adjective, or another adverb.",
      example: "She sings **beautifully**. He runs **very** fast. They arrived **late**.",
      tip: "Many adverbs end in '-ly', but not all (fast, hard, well)."
    },
    {
      id: 40,
      term: "Adverb of Manner",
      definition: "Tells how an action is performed.",
      example: "She danced **gracefully**. He spoke **loudly**. They worked **carefully**.",
      tip: "Adverbs of manner usually answer the question 'How?'"
    },
    {
      id: 41,
      term: "Adverb of Time",
      definition: "Tells when an action happens.",
      example: "**Yesterday**, we met. She will arrive **soon**. **Now** is the time.",
      tip: "Adverbs of time answer 'When?' or 'How often?'"
    },
    {
      id: 42,
      term: "Adverb of Place",
      definition: "Tells where an action happens.",
      example: "She looked **everywhere**. They sat **outside**. The book is **here**.",
      tip: "Adverbs of place answer the question 'Where?'"
    },
    {
      id: 43,
      term: "Adverb of Frequency",
      definition: "Tells how often an action occurs.",
      example: "She **always** studies. He **never** smokes. They **sometimes** travel.",
      tip: "Frequency adverbs: always, usually, often, sometimes, rarely, never."
    },
    {
      id: 44,
      term: "Adverb of Degree",
      definition: "Tells to what extent or how much.",
      example: "She is **very** smart. He is **too** tired. I **almost** finished.",
      tip: "Degree adverbs: very, too, quite, almost, extremely, barely."
    },
    {
      id: 45,
      term: "Conjunctive Adverb",
      definition: "Connects two independent clauses, showing logical relationship.",
      example: "She studied hard; **however**, she failed. **Therefore**, we must act.",
      tip: "Common conjunctive adverbs: however, therefore, moreover, consequently."
    },
    // PREPOSITIONS & CONJUNCTIONS (Cards 46-55)
    {
      id: 46,
      term: "Preposition",
      definition: "Shows relationship between a noun/pronoun and another word.",
      example: "The book is **on** the table. She walked **to** school. We met **after** lunch.",
      tip: "Prepositions often show position, direction, or time."
    },
    {
      id: 47,
      term: "Preposition of Place",
      definition: "Shows the position or location of something.",
      example: "The cat is **under** the table. She lives **in** Lagos. He stood **by** the door.",
      tip: "Common place prepositions: in, on, at, under, over, between, among."
    },
    {
      id: 48,
      term: "Preposition of Time",
      definition: "Shows when something happens.",
      example: "We will meet **at** 5 PM. She was born **in** 1990. He arrived **on** Monday.",
      tip: "Use 'at' for specific times, 'on' for days, 'in' for months/years."
    },
    {
      id: 49,
      term: "Preposition of Direction",
      definition: "Shows movement from one place to another.",
      example: "She walked **to** the store. He ran **into** the room. They traveled **across** the bridge.",
      tip: "Direction prepositions show movement: to, into, through, across, toward."
    },
    {
      id: 50,
      term: "Conjunction",
      definition: "Connects words, phrases, or clauses.",
      example: "**And**, **but**, **or**, **so**, **because**, **although** are conjunctions.",
      tip: "Conjunctions join similar grammatical elements."
    },
    {
      id: 51,
      term: "Coordinating Conjunction",
      definition: "Connects equal grammatical elements (FANBOYS).",
      example: "**For**, **and**, **nor**, **but**, **or**, **yet**, **so** (FANBOYS).",
      tip: "Use a comma before a coordinating conjunction joining two clauses."
    },
    {
      id: 52,
      term: "Subordinating Conjunction",
      definition: "Connects a dependent clause to an independent clause.",
      example: "**Because** she studied, she passed. **Although** it rained, we went out.",
      tip: "Subordinating conjunctions show cause, time, condition, or contrast."
    },
    {
      id: 53,
      term: "Correlative Conjunction",
      definition: "Pairs of conjunctions that work together.",
      example: "**Both** John **and** Mary came. **Either** you leave **or** I will.",
      tip: "Common pairs: both/and, either/or, neither/nor, not only/but also."
    },
    {
      id: 54,
      term: "Interjection",
      definition: "A word or phrase that expresses strong emotion.",
      example: "**Wow!** That's amazing. **Oh no!** We missed it. **Ouch!** That hurts.",
      tip: "Interjections are often followed by an exclamation mark."
    },
    {
      id: 55,
      term: "Article",
      definition: "A word that identifies a noun as specific or general (a, an, the).",
      example: "**The** book (specific). **A** book (general). **An** apple (vowel sound).",
      tip: "Use 'a' before consonant sounds, 'an' before vowel sounds."
    },
    // SENTENCE STRUCTURE (Cards 56-65)
    {
      id: 56,
      term: "Subject",
      definition: "The person, place, thing, or idea that performs the action or is described.",
      example: "**John** runs. **The dog** barks. **Happiness** is important.",
      tip: "The subject usually comes at the beginning of the sentence."
    },
    {
      id: 57,
      term: "Predicate",
      definition: "The part of the sentence that tells what the subject does or is.",
      example: "John **runs every morning**. The dog **barks loudly**.",
      tip: "The predicate contains the verb and tells about the subject."
    },
    {
      id: 58,
      term: "Direct Object",
      definition: "Receives the action of the verb directly.",
      example: "She kicked **the ball**. He read **the book**. They built **a house**.",
      tip: "Ask 'verb what?' to find the direct object."
    },
    {
      id: 59,
      term: "Indirect Object",
      definition: "Receives the direct object or benefits from the action.",
      example: "She gave **me** a gift. He told **us** a story. (me/us are indirect objects)",
      tip: "Indirect objects usually come between the verb and direct object."
    },
    {
      id: 60,
      term: "Subject Complement",
      definition: "Follows a linking verb and describes or renames the subject.",
      example: "She is **a doctor**. The food tastes **delicious**. He seems **tired**.",
      tip: "Subject complements can be nouns (renaming) or adjectives (describing)."
    },
    {
      id: 61,
      term: "Object Complement",
      definition: "Follows the direct object and describes or renames it.",
      example: "They named the baby **John**. She painted the house **blue**.",
      tip: "Object complements usually follow verbs like name, call, make, elect."
    },
    {
      id: 62,
      term: "Simple Sentence",
      definition: "Contains one independent clause with one subject and one predicate.",
      example: "**The dog barked**. **She studied hard**.",
      tip: "Simple sentences can have compound subjects or verbs."
    },
    {
      id: 63,
      term: "Compound Sentence",
      definition: "Contains two or more independent clauses joined by a conjunction.",
      example: "**She studied hard, so she passed**. **I came, I saw, I conquered**.",
      tip: "Use a comma before the conjunction joining independent clauses."
    },
    {
      id: 64,
      term: "Complex Sentence",
      definition: "Contains one independent clause and one or more dependent clauses.",
      example: "**Because she studied, she passed**. **When he arrived, we left**.",
      tip: "Dependent clauses begin with subordinating conjunctions."
    },
    {
      id: 65,
      term: "Compound-Complex Sentence",
      definition: "Contains two or more independent clauses and one or more dependent clauses.",
      example: "**Because she studied hard, she passed the exam, and her parents were proud**.",
      tip: "This is the most complex sentence type."
    },
    // PUNCTUATION (Cards 66-75)
    {
      id: 66,
      term: "Period (.)",
      definition: "Used at the end of declarative sentences and imperative sentences.",
      example: "**The sky is blue. Please close the door.**",
      tip: "Use a period for statements, commands, and indirect questions."
    },
    {
      id: 67,
      term: "Question Mark (?)",
      definition: "Used at the end of interrogative sentences (questions).",
      example: "**What is your name? Are you coming?**",
      tip: "Do not use a question mark for indirect questions (He asked what my name was)."
    },
    {
      id: 68,
      term: "Exclamation Mark (!)",
      definition: "Used to express strong emotion, surprise, or urgency.",
      example: "**Wow! That's amazing. Help! Watch out!**",
      tip: "Use exclamation marks sparingly in formal writing."
    },
    {
      id: 69,
      term: "Comma (,)",
      definition: "Indicates a pause, separates items in a list, or joins clauses.",
      example: "**I bought apples, bananas, and oranges. She studied, so she passed.**",
      tip: "Use the Oxford comma before 'and' in lists for clarity."
    },
    {
      id: 70,
      term: "Semicolon (;)",
      definition: "Connects closely related independent clauses without a conjunction.",
      example: "**She studied hard; she passed the exam. I came; I saw; I conquered.**",
      tip: "Use semicolons to connect related thoughts without a period."
    },
    {
      id: 71,
      term: "Colon (:)",
      definition: "Introduces a list, explanation, or quotation.",
      example: "**She brought three items: books, pens, and paper. Here's the truth: I was wrong.**",
      tip: "What comes before the colon must be a complete sentence."
    },
    {
      id: 72,
      term: "Apostrophe (')",
      definition: "Shows possession or indicates omitted letters in contractions.",
      example: "**John's book (possession). Don't (do not), It's (it is).**",
      tip: "Use 's for singular, s' for plural nouns ending in s."
    },
    {
      id: 73,
      term: "Quotation Marks (\" \")",
      definition: "Enclose direct speech, quotations, or titles of short works.",
      example: "**She said, 'Hello.' He yelled, 'Help!'**",
      tip: "Periods and commas go inside quotation marks in American English."
    },
    {
      id: 74,
      term: "Parentheses ( )",
      definition: "Enclose additional information, clarifications, or asides.",
      example: "**She finally passed (after many attempts) the exam. See page 10 (Figure 2).**",
      tip: "The sentence should make sense if you remove the parenthetical content."
    },
    {
      id: 75,
      term: "Dash (—)",
      definition: "Indicates a sudden break, emphasis, or interruption in thought.",
      example: "**He was—how can I say this—confused. She finally arrived—at last!**",
      tip: "Use an em dash (—) for emphasis, not a hyphen (-)."
    },
    // VOCABULARY & CONTEXT (Cards 76-85)
    {
      id: 76,
      term: "Synonym",
      definition: "Words that have the same or similar meanings.",
      example: "**Happy** and **joyful**, **big** and **large**, **fast** and **quick**.",
      tip: "Use synonyms to avoid repetition and add variety."
    },
    {
      id: 77,
      term: "Antonym",
      definition: "Words that have opposite meanings.",
      example: "**Hot** and **cold**, **good** and **bad**, **light** and **dark**.",
      tip: "Antonyms help create contrast and emphasis."
    },
    {
      id: 78,
      term: "Homonym",
      definition: "Words that sound the same but have different meanings and spellings.",
      example: "**Their/there/they're**, **to/too/two**, **flower/flour**.",
      tip: "Context helps determine which homonym is intended."
    },
    {
      id: 79,
      term: "Homograph",
      definition: "Words that are spelled the same but have different meanings and pronunciations.",
      example: "**Lead** (to guide) vs **lead** (the metal). **Wind** (air) vs **wind** (to twist).",
      tip: "Pronunciation often differs between homographs."
    },
    {
      id: 80,
      term: "Idiom",
      definition: "A phrase whose meaning is not literal and cannot be deduced from individual words.",
      example: "**It's raining cats and dogs** (raining heavily). **Break a leg** (good luck).",
      tip: "Idioms are culture-specific and must be memorized."
    },
    {
      id: 81,
      term: "Prefix",
      definition: "A letter or group added to the beginning of a word to change its meaning.",
      example: "**un**happy, **re**write, **pre**view, **mis**understand, **dis**like.",
      tip: "Prefixes can indicate negation, repetition, or direction."
    },
    {
      id: 82,
      term: "Suffix",
      definition: "A letter or group added to the end of a word to change its meaning or form.",
      example: "happy**ness**, teach**er**, quick**ly**, wonder**ful**, child**ish**.",
      tip: "Suffixes can change word class (noun, verb, adjective, adverb)."
    },
    {
      id: 83,
      term: "Root Word",
      definition: "The basic part of a word that carries its core meaning.",
      example: "**spect** (look): inspect, respect, spectator. **port** (carry): transport, porter.",
      tip: "Knowing root words helps decipher unfamiliar vocabulary."
    },
    {
      id: 84,
      term: "Context Clues",
      definition: "Hints in the surrounding text that help determine the meaning of an unknown word.",
      example: "The **arduous** journey—so difficult and tiring—lasted three days.",
      tip: "Look for definitions, examples, or contrasts as context clues."
    },
    {
      id: 85,
      term: "Denotation vs Connotation",
      definition: "Denotation is literal meaning; connotation is emotional or cultural association.",
      example: "**Cheap** (denotation: low cost; connotation: poor quality). **Inexpensive** (positive connotation).",
      tip: "Choose words with connotations that match your intended tone."
    },
    // COMPREHENSION & READING (Cards 86-95)
    {
      id: 86,
      term: "Main Idea",
      definition: "The central point or most important message of a passage.",
      example: "In a paragraph about the benefits of exercise, the main idea is that exercise is beneficial.",
      tip: "The main idea is often stated in the first or last sentence of a paragraph."
    },
    {
      id: 87,
      term: "Topic Sentence",
      definition: "The sentence that states the main idea of a paragraph.",
      example: "**Exercise offers numerous health benefits.** Then the paragraph explains them.",
      tip: "Topic sentences are often the first sentence of a paragraph."
    },
    {
      id: 88,
      term: "Supporting Details",
      definition: "Facts, examples, and evidence that explain or prove the main idea.",
      example: "Benefits of exercise: reduces disease risk, improves mood, increases energy.",
      tip: "Supporting details answer who, what, when, where, why, and how."
    },
    {
      id: 89,
      term: "Inference",
      definition: "A logical conclusion based on evidence and reasoning, not directly stated.",
      example: "If you see someone with an umbrella, you infer it might be raining.",
      tip: "Inferences use clues from the text plus your own knowledge."
    },
    {
      id: 90,
      term: "Author's Purpose",
      definition: "The reason an author writes a text: to inform, persuade, entertain, or express.",
      example: "**News article** (inform). **Advertisement** (persuade). **Novel** (entertain).",
      tip: "PIE: Persuade, Inform, Entertain."
    },
    {
      id: 91,
      term: "Author's Tone",
      definition: "The author's attitude toward the subject, conveyed through word choice.",
      example: "**Serious, humorous, sarcastic, formal, informal, critical, supportive**.",
      tip: "Tone affects how the reader interprets the message."
    },
    {
      id: 92,
      term: "Fact vs Opinion",
      definition: "Fact can be verified; opinion is a personal belief or judgment.",
      example: "**Fact: Lagos is in Nigeria. Opinion: Lagos is the best city.**",
      tip: "Opinions often contain value words like 'best,' 'worst,' 'should.'"
    },
    {
      id: 93,
      term: "Text Structure",
      definition: "The organizational pattern of a text.",
      example: "**Cause/effect, compare/contrast, problem/solution, chronological, sequence**.",
      tip: "Identifying text structure helps with comprehension."
    },
    {
      id: 94,
      term: "Summarizing",
      definition: "Restating the main points of a text in a shorter form.",
      example: "A summary of a news article includes who, what, where, when, and why.",
      tip: "Summaries omit minor details and examples."
    },
    {
      id: 95,
      term: "Paraphrasing",
      definition: "Restating a text in your own words while keeping the original meaning.",
      example: "Original: 'The cat sat on the mat.' Paraphrase: 'The feline rested on the rug.'",
      tip: "Paraphrasing is useful for incorporating sources without quoting."
    },
    // LITERARY TERMS (Cards 96-110)
    {
      id: 96,
      term: "Plot",
      definition: "The sequence of events in a story.",
      example: "Exposition → Rising Action → Climax → Falling Action → Resolution",
      tip: "Plot is WHAT happens in the story."
    },
    {
      id: 97,
      term: "Character",
      definition: "A person, animal, or figure represented in a literary work.",
      example: "**Protagonist** (main character), **antagonist** (opponent), **supporting characters**.",
      tip: "Characters can be round (complex) or flat (simple)."
    },
    {
      id: 98,
      term: "Setting",
      definition: "The time and place where a story occurs.",
      example: "**A small town in Nigeria during the 1990s**. **A futuristic spaceship**.",
      tip: "Setting can create mood and influence characters."
    },
    {
      id: 99,
      term: "Theme",
      definition: "The central message or insight about life revealed in a literary work.",
      example: "**Love conquers all. Justice prevails. Coming of age. Good vs evil.**",
      tip: "Theme is the deeper meaning, not just the story events."
    },
    {
      id: 100,
      term: "Conflict",
      definition: "The struggle between opposing forces in a story.",
      example: "**Person vs person, person vs self, person vs nature, person vs society**.",
      tip: "Conflict drives the plot forward."
    },
    {
      id: 101,
      term: "Simile",
      definition: "A comparison using 'like' or 'as'.",
      example: "**She is as brave as a lion. He runs like the wind.**",
      tip: "Similes use 'like' or 'as' to compare two different things."
    },
    {
      id: 102,
      term: "Metaphor",
      definition: "A direct comparison stating one thing IS another.",
      example: "**The world is a stage. Time is a thief. She has a heart of gold.**",
      tip: "Metaphors do not use 'like' or 'as.'"
    },
    {
      id: 103,
      term: "Personification",
      definition: "Giving human qualities to non-human things.",
      example: "**The wind whispered through the trees. The sun smiled down on us.**",
      tip: "Personification makes descriptions more vivid and engaging."
    },
    {
      id: 104,
      term: "Hyperbole",
      definition: "Extreme exaggeration used for emphasis or effect.",
      example: "**I've told you a million times. I'm so hungry I could eat a horse.**",
      tip: "Hyperbole is not meant to be taken literally."
    },
    {
      id: 105,
      term: "Irony",
      definition: "A contrast between expectation and reality.",
      example: "**A fire station burning down. A pilot afraid of heights.**",
      tip: "Types: verbal (saying opposite), situational, dramatic."
    },
    {
      id: 106,
      term: "Foreshadowing",
      definition: "Hints or clues about what will happen later in the story.",
      example: "**Dark clouds gathering before a tragic event. A character's ominous dream.**",
      tip: "Foreshadowing creates suspense and prepares readers."
    },
    {
      id: 107,
      term: "Flashback",
      definition: "An interruption in the present story to show a past event.",
      example: "**As he looked at the photo, he remembered his childhood...**",
      tip: "Flashbacks provide background information and context."
    },
    {
      id: 108,
      term: "Symbolism",
      definition: "Using an object, person, or event to represent a deeper meaning.",
      example: "**A dove symbolizes peace. A rose symbolizes love. A chains represents freedom.**",
      tip: "Symbols add layers of meaning to a text."
    },
    {
      id: 109,
      term: "Imagery",
      definition: "Language that appeals to the senses (sight, sound, smell, taste, touch).",
      example: "**The golden sun set over the sparkling blue ocean. The sweet scent of flowers filled the air.**",
      tip: "Imagery creates vivid mental pictures for readers."
    },
    {
      id: 110,
      term: "Mood",
      definition: "The emotional atmosphere or feeling created by a literary work.",
      example: "**Horror (scary), suspenseful (tense), joyful (happy), melancholic (sad)**.",
      tip: "Mood is how the reader feels; tone is the author's attitude."
    }
  ],

  // ============================================================================
  // MATHEMATICS (100 cards) - Based on JAMB Math syllabus [citation:6]
  // ============================================================================
  mathematics: [
    // NUMBER BASES (1-5)
    {
      id: 1,
      term: "Number Base",
      definition: "The number of unique digits used to represent numbers in a numeral system.",
      example: "Base 10 uses digits 0-9; Base 2 (binary) uses 0-1; Base 8 (octal) uses 0-7.",
      tip: "Base 10 is decimal (everyday numbers), Base 2 is binary (computers)."
    },
    {
      id: 2,
      term: "Converting from Other Bases to Base 10",
      definition: "Multiply each digit by its place value (base^position) and sum.",
      example: "101₂ = 1×2² + 0×2¹ + 1×2⁰ = 4 + 0 + 1 = 5₁₀",
      tip: "The rightmost digit is position 0, next is position 1, etc."
    },
    {
      id: 3,
      term: "Converting from Base 10 to Other Bases",
      definition: "Repeatedly divide by the new base and read remainders backward.",
      example: "25₁₀ to base 2: 25÷2=12 R1, 12÷2=6 R0, 6÷2=3 R0, 3÷2=1 R1, 1÷2=0 R1 → 11001₂",
      tip: "Read remainders from last to first (bottom to top)."
    },
    {
      id: 4,
      term: "Addition in Other Bases",
      definition: "Add digits column by column; when sum ≥ base, carry to next column.",
      example: "101₂ + 11₂ = 1000₂ (5 + 3 = 8 in decimal, 8 in binary is 1000)",
      tip: "In base b, carry when sum ≥ b, and carry value is sum ÷ b."
    },
    {
      id: 5,
      term: "Subtraction in Other Bases",
      definition: "Subtract digits column by column; borrow from higher place if needed.",
      example: "1000₂ - 101₂ = 11₂ (8 - 5 = 3 in decimal, 3 in binary is 11)",
      tip: "When borrowing, borrow the value of the base (e.g., borrow 2 in binary)."
    },
    // INDICES (6-10)
    {
      id: 6,
      term: "Index (Power/Exponent)",
      definition: "A number that indicates how many times to multiply the base by itself.",
      example: "2³ = 2 × 2 × 2 = 8. Here, 2 is base, 3 is index.",
      tip: "Any number to power 0 equals 1 (a⁰ = 1)."
    },
    {
      id: 7,
      term: "Laws of Indices: Multiplication",
      definition: "When multiplying same base, add the indices.",
      example: "aᵐ × aⁿ = aᵐ⁺ⁿ. Example: 2³ × 2⁴ = 2⁷ = 128.",
      tip: "This works only when bases are the same."
    },
    {
      id: 8,
      term: "Laws of Indices: Division",
      definition: "When dividing same base, subtract the indices.",
      example: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ. Example: 2⁵ ÷ 2² = 2³ = 8.",
      tip: "The result is 1 if the indices are equal (aᵐ ÷ aᵐ = a⁰ = 1)."
    },
    {
      id: 9,
      term: "Laws of Indices: Power of Power",
      definition: "When raising a power to another power, multiply the indices.",
      example: "(aᵐ)ⁿ = aᵐⁿ. Example: (2³)² = 2⁶ = 64.",
      tip: "This is also called the 'power rule.'"
    },
    {
      id: 10,
      term: "Negative Indices",
      definition: "A negative index indicates the reciprocal of the positive power.",
      example: "a⁻ⁿ = 1/aⁿ. Example: 2⁻³ = 1/8 = 0.125.",
      tip: "Negative indices turn large numbers into fractions."
    },
    // LOGARITHMS (11-15)
    {
      id: 11,
      term: "Logarithm",
      definition: "The inverse operation to exponentiation. log_b(a) = c means b^c = a.",
      example: "log₂(8) = 3 because 2³ = 8. log₁₀(100) = 2 because 10² = 100.",
      tip: "Log answers the question: 'What power must the base be raised to get the number?'"
    },
    {
      id: 12,
      term: "Laws of Logarithms: Multiplication",
      definition: "log_b(MN) = log_b(M) + log_b(N).",
      example: "log₂(4×8) = log₂(4) + log₂(8) = 2 + 3 = 5 (which equals log₂(32)=5).",
      tip: "This turns multiplication into addition."
    },
    {
      id: 13,
      term: "Laws of Logarithms: Division",
      definition: "log_b(M/N) = log_b(M) - log_b(N).",
      example: "log₂(16/4) = log₂(16) - log₂(4) = 4 - 2 = 2 (which equals log₂(4)=2).",
      tip: "This turns division into subtraction."
    },
    {
      id: 14,
      term: "Laws of Logarithms: Power Rule",
      definition: "log_b(Mⁿ) = n × log_b(M).",
      example: "log₂(8³) = 3 × log₂(8) = 3 × 3 = 9 (since 8³=512 and log₂512=9).",
      tip: "The power rule brings the exponent in front."
    },
    {
      id: 15,
      term: "Change of Base Formula",
      definition: "log_b(a) = log_c(a) / log_c(b) for any base c.",
      example: "log₂(5) = log₁₀(5) / log₁₀(2) ≈ 0.6990 / 0.3010 ≈ 2.322.",
      tip: "Use base 10 or e for calculator calculations."
    },
    // SURDS (16-20)
    {
      id: 16,
      term: "Surd",
      definition: "An irrational root of a rational number (cannot be simplified to remove the root).",
      example: "√2, √3, √5, ∛7 are surds. √4 = 2 is NOT a surd (it simplifies).",
      tip: "Surds are irrational numbers that never terminate or repeat."
    },
    {
      id: 17,
      term: "Simplifying Surds",
      definition: "Factor out perfect squares from under the square root.",
      example: "√18 = √(9×2) = √9 × √2 = 3√2. √50 = √(25×2) = 5√2.",
      tip: "Look for factors that are perfect squares (4, 9, 16, 25, 36, 49, 64, 81, 100)."
    },
    {
      id: 18,
      term: "Adding and Subtracting Surds",
      definition: "Only like surds (same root and same number under root) can be combined.",
      example: "3√2 + 5√2 = 8√2. 3√2 + 5√3 cannot be simplified further.",
      tip: "Simplify each surd first before adding or subtracting."
    },
    {
      id: 19,
      term: "Multiplying Surds",
      definition: "Multiply the numbers outside roots together and numbers inside roots together.",
      example: "3√2 × 4√3 = 12√6. √a × √b = √(ab).",
      tip: "√a × √a = a (the square root cancels)."
    },
    {
      id: 20,
      term: "Rationalizing the Denominator",
      definition: "Removing the surd from the denominator by multiplying numerator and denominator.",
      example: "1/√2 = (1×√2)/(√2×√2) = √2/2. 1/(a+√b) multiply by (a-√b)/(a-√b).",
      tip: "Use the conjugate (a-√b) to rationalize denominators with sums."
    },
    // SETS (21-25)
    {
      id: 21,
      term: "Set",
      definition: "A well-defined collection of distinct objects.",
      example: "A = {1, 2, 3, 4, 5} (set of first five natural numbers).",
      tip: "Elements of a set are unique (no repeats)."
    },
    {
      id: 22,
      term: "Union of Sets (∪)",
      definition: "The set containing all elements that are in either set A or set B (or both).",
      example: "A = {1,2,3}, B = {3,4,5}, A∪B = {1,2,3,4,5}.",
      tip: "Union combines elements, removing duplicates."
    },
    {
      id: 23,
      term: "Intersection of Sets (∩)",
      definition: "The set containing elements that are in both set A AND set B.",
      example: "A = {1,2,3}, B = {3,4,5}, A∩B = {3}.",
      tip: "Intersection finds common elements."
    },
    {
      id: 24,
      term: "Complement of a Set (')",
      definition: "The set of all elements in the universal set that are NOT in set A.",
      example: "U = {1,2,3,4,5}, A = {1,2,3}, A' = {4,5}.",
      tip: "The complement depends on the universal set defined."
    },
    {
      id: 25,
      term: "Venn Diagram",
      definition: "A visual representation of sets using overlapping circles.",
      example: "Two circles overlapping shows union (all area) and intersection (overlap area).",
      tip: "Venn diagrams help solve set problems visually."
    },
    // POLYNOMIALS (26-35)
    {
      id: 26,
      term: "Polynomial",
      definition: "An expression with variables, coefficients, and non-negative integer exponents.",
      example: "3x² + 2x - 5 is a polynomial. 2x⁻¹ is NOT (negative exponent).",
      tip: "Degree is the highest exponent in the polynomial."
    },
    {
      id: 27,
      term: "Quadratic Equation",
      definition: "An equation of the form ax² + bx + c = 0, where a ≠ 0.",
      example: "2x² + 3x - 5 = 0. x² - 4 = 0. 3x² + 2x = 0.",
      tip: "Quadratic equations have degree 2 (highest exponent 2)."
    },
    {
      id: 28,
      term: "Quadratic Formula",
      definition: "Formula for solving ax² + bx + c = 0: x = [-b ± √(b² - 4ac)] / 2a.",
      example: "x² - 5x + 6 = 0: a=1, b=-5, c=6 → x = [5 ± √(25-24)]/2 = [5 ± 1]/2 → x=3 or 2.",
      tip: "Always check if the discriminant (b²-4ac) is non-negative for real solutions."
    },
    {
      id: 29,
      term: "Discriminant",
      definition: "The part under the square root in quadratic formula: Δ = b² - 4ac.",
      example: "If Δ > 0: 2 real solutions; Δ = 0: 1 real solution; Δ < 0: no real solutions.",
      tip: "Discriminant tells the nature of roots without solving."
    },
    {
      id: 30,
      term: "Factorization Method",
      definition: "Writing a quadratic as a product of two binomials to find roots.",
      example: "x² - 5x + 6 = (x-2)(x-3) → roots are 2 and 3.",
      tip: "Find two numbers that multiply to c and add to b (when a=1)."
    },
    {
      id: 31,
      term: "Completing the Square",
      definition: "Rewriting quadratic as (x + p)² = q to solve for x.",
      example: "x² + 6x + 5 = 0 → x² + 6x = -5 → (x+3)² = 4 → x+3 = ±2 → x = -1 or -5.",
      tip: "Add (b/2)² to both sides to complete the square."
    },
    {
      id: 32,
      term: "Sum of Roots (Quadratic)",
      definition: "For ax² + bx + c = 0, sum of roots = -b/a.",
      example: "2x² - 6x + 4 = 0, sum = -(-6)/2 = 6/2 = 3.",
      tip: "Use Vieta's formulas without solving the equation."
    },
    {
      id: 33,
      term: "Product of Roots (Quadratic)",
      definition: "For ax² + bx + c = 0, product of roots = c/a.",
      example: "2x² - 6x + 4 = 0, product = 4/2 = 2.",
      tip: "For x² + bx + c = 0, product = c, sum = -b."
    },
    {
      id: 34,
      term: "Remainder Theorem",
      definition: "When polynomial P(x) is divided by (x-a), the remainder is P(a).",
      example: "P(x) = x² - 5x + 6, P(2) = 4 - 10 + 6 = 0, so remainder when divided by (x-2) is 0.",
      tip: "If P(a)=0, then (x-a) is a factor."
    },
    {
      id: 35,
      term: "Factor Theorem",
      definition: "(x-a) is a factor of polynomial P(x) if and only if P(a)=0.",
      example: "Since P(2)=0 for P(x)=x²-5x+6, (x-2) is a factor.",
      tip: "Use factor theorem to find factors and roots."
    },
    // SEQUENCES & SERIES (36-45)
    {
      id: 36,
      term: "Arithmetic Progression (AP)",
      definition: "A sequence where the difference between consecutive terms is constant (common difference d).",
      example: "2, 5, 8, 11, 14,... (d=3).",
      tip: "General term: aₙ = a₁ + (n-1)d."
    },
    {
      id: 37,
      term: "Arithmetic Mean",
      definition: "The average of two numbers, also the middle term of an AP.",
      example: "Arithmetic mean of 4 and 10 is (4+10)/2 = 7.",
      tip: "For three terms in AP: a, b, c → b = (a+c)/2."
    },
    {
      id: 38,
      term: "Sum of Arithmetic Series",
      definition: "Sum of first n terms of AP: Sₙ = n/2 [2a + (n-1)d] or Sₙ = n/2 (first + last).",
      example: "AP 2,5,8,11,14: S₅ = 5/2 (2+14) = 5/2 × 16 = 40.",
      tip: "Use first formula when first term and d are known."
    },
    {
      id: 39,
      term: "Geometric Progression (GP)",
      definition: "A sequence where each term is multiplied by a constant ratio (r).",
      example: "3, 6, 12, 24, 48,... (r=2).",
      tip: "General term: aₙ = a₁ × rⁿ⁻¹."
    },
    {
      id: 40,
      term: "Geometric Mean",
      definition: "The middle term of a GP, given by √(ab) for two terms a and b.",
      example: "Geometric mean of 4 and 9 is √(4×9) = √36 = 6 (GP: 4,6,9).",
      tip: "For three terms in GP: a, b, c → b² = ac."
    },
    {
      id: 41,
      term: "Sum of Geometric Series",
      definition: "Sum of first n terms: Sₙ = a(1-rⁿ)/(1-r) when r≠1.",
      example: "GP 2,4,8,16: a=2, r=2, n=4, S₄ = 2(1-16)/(1-2) = 2(-15)/(-1) = 30.",
      tip: "When r=1, Sₙ = n×a (all terms equal)."
    },
    {
      id: 42,
      term: "Sum to Infinity (GP)",
      definition: "For |r| < 1, the sum of infinite GP converges: S∞ = a/(1-r).",
      example: "GP 1, 1/2, 1/4, 1/8,... (a=1, r=1/2): S∞ = 1/(1-1/2) = 2.",
      tip: "Sum to infinity only exists when -1 < r < 1."
    },
    // ALGEBRA (46-55)
    {
      id: 46,
      term: "Inequality",
      definition: "A mathematical statement comparing two expressions using <, >, ≤, ≥, or ≠.",
      example: "2x + 3 > 7 means 2x > 4 → x > 2.",
      tip: "When multiplying or dividing by a negative number, flip the inequality sign."
    },
    {
      id: 47,
      term: "Linear Inequality",
      definition: "An inequality with variables raised to the first power only.",
      example: "3x - 5 ≤ 10 → 3x ≤ 15 → x ≤ 5.",
      tip: "Solution sets can be graphed on a number line."
    },
    {
      id: 48,
      term: "Quadratic Inequality",
      definition: "An inequality with variable raised to the second power.",
      example: "x² - 5x + 6 < 0 → (x-2)(x-3) < 0 → 2 < x < 3.",
      tip: "Solve by finding roots and testing intervals."
    },
    {
      id: 49,
      term: "Simultaneous Equations",
      definition: "Two or more equations with two or more variables solved together.",
      example: "x + y = 10, x - y = 4 → adding: 2x=14 → x=7, then y=3.",
      tip: "Methods: elimination (adding/subtracting) or substitution."
    },
    {
      id: 50,
      term: "Substitution Method",
      definition: "Solve one equation for one variable, then substitute into the other equation.",
      example: "x + y = 10, y = 2x → substitute: x + 2x = 10 → 3x=10 → x=10/3, y=20/3.",
      tip: "Choose the simplest equation to solve for a variable."
    },
    {
      id: 51,
      term: "Elimination Method",
      definition: "Add or subtract equations to eliminate one variable.",
      example: "2x + y = 7, x - y = 2 → adding eliminates y: 3x=9 → x=3, y=1.",
      tip: "Multiply equations if needed to make coefficients match."
    },
    {
      id: 52,
      term: "Partial Fractions",
      definition: "Decomposing a rational expression into a sum of simpler fractions.",
      example: "1/(x²-1) = 1/2(x-1) - 1/2(x+1).",
      tip: "Use for integration and solving certain equations."
    },
    // VARIATION (53-60)
    {
      id: 53,
      term: "Direct Variation",
      definition: "y varies directly as x: y = kx, where k is constant.",
      example: "If y=10 when x=2, then k=5, so y=5x.",
      tip: "When x increases, y increases proportionally."
    },
    {
      id: 54,
      term: "Inverse Variation",
      definition: "y varies inversely as x: y = k/x, where k is constant.",
      example: "If y=4 when x=3, then k=12, so y=12/x.",
      tip: "When x increases, y decreases proportionally."
    },
    {
      id: 55,
      term: "Joint Variation",
      definition: "y varies jointly as x and z: y = kxz.",
      example: "If y=24 when x=2 and z=3, then k=4, so y=4xz.",
      tip: "Multiple variables affect y together."
    },
    {
      id: 56,
      term: "Partial Variation",
      definition: "y is partly constant and partly varies with x: y = a + bx.",
      example: "If y=10 when x=2 and y=16 when x=4, then 10=a+2b, 16=a+4b → b=3, a=4, so y=4+3x.",
      tip: "Solve simultaneous equations to find a and b."
    },
    // GEOMETRY (61-75)
    {
      id: 61,
      term: "Triangle Angle Sum",
      definition: "Sum of interior angles of a triangle is 180°.",
      example: "If two angles are 50° and 60°, the third is 180-110=70°.",
      tip: "This is true for all triangles."
    },
    {
      id: 62,
      term: "Pythagorean Theorem",
      definition: "In a right triangle, a² + b² = c², where c is the hypotenuse.",
      example: "Legs 3 and 4 → hypotenuse = √(9+16)=5.",
      tip: "Only works for right-angled triangles."
    },
    {
      id: 63,
      term: "Similar Triangles",
      definition: "Triangles with same shape but different size; corresponding angles equal, sides proportional.",
      example: "If ΔABC ~ ΔDEF, then AB/DE = BC/EF = AC/DF.",
      tip: "Use similarity to find unknown lengths."
    },
    {
      id: 64,
      term: "Congruent Triangles",
      definition: "Triangles with same shape AND same size; all corresponding sides and angles equal.",
      example: "SSS (side-side-side), SAS, ASA, AAS, RHS criteria.",
      tip: "Congruent triangles can be mapped exactly onto each other."
    },
    {
      id: 65,
      term: "Circle Theorems: Angle at Center",
      definition: "The angle at the center is twice the angle at the circumference standing on the same arc.",
      example: "If inscribed angle is 30°, central angle is 60°.",
      tip: "Angles subtended by the same arc are equal."
    },
    {
      id: 66,
      term: "Circle Theorems: Angle in Semicircle",
      definition: "The angle in a semicircle is a right angle (90°).",
      example: "If a triangle is inscribed in a semicircle, the angle opposite the diameter is 90°.",
      tip: "The hypotenuse is the diameter."
    },
    {
      id: 67,
      term: "Circle Theorems: Tangent",
      definition: "The angle between a tangent and a radius is 90°.",
      example: "A tangent to a circle is perpendicular to the radius at the point of contact.",
      tip: "Tangents from the same external point are equal in length."
    },
    {
      id: 68,
      term: "Area of Triangle",
      definition: "A = ½ × base × height.",
      example: "Base 10 cm, height 6 cm → area = 30 cm².",
      tip: "Heron's formula can be used when height is unknown."
    },
    {
      id: 69,
      term: "Area of Circle",
      definition: "A = πr², where r is radius.",
      example: "Radius 7 cm → area = π×49 ≈ 153.94 cm².",
      tip: "Diameter = 2r, circumference = 2πr."
    },
    {
      id: 70,
      term: "Area of Sector",
      definition: "A = (θ/360) × πr², where θ is central angle in degrees.",
      example: "Radius 10 cm, angle 60° → area = (60/360)×π×100 ≈ 52.36 cm².",
      tip: "Arc length = (θ/360) × 2πr."
    },
    // TRIGONOMETRY (76-85)
    {
      id: 76,
      term: "Sine (sin)",
      definition: "In right triangle, sin θ = opposite/hypotenuse.",
      example: "sin 30° = 1/2 = 0.5. sin 45° = √2/2 ≈ 0.707.",
      tip: "SOH: Sine = Opposite/Hypotenuse."
    },
    {
      id: 77,
      term: "Cosine (cos)",
      definition: "In right triangle, cos θ = adjacent/hypotenuse.",
      example: "cos 60° = 1/2 = 0.5. cos 45° = √2/2 ≈ 0.707.",
      tip: "CAH: Cosine = Adjacent/Hypotenuse."
    },
    {
      id: 78,
      term: "Tangent (tan)",
      definition: "In right triangle, tan θ = opposite/adjacent = sin/cos.",
      example: "tan 45° = 1. tan 30° = 1/√3 ≈ 0.577.",
      tip: "TOA: Tangent = Opposite/Adjacent."
    },
    {
      id: 79,
      term: "SOH CAH TOA",
      definition: "Mnemonic for trigonometric ratios.",
      example: "SOH: Sine = Opposite/Hypotenuse; CAH: Cosine = Adjacent/Hypotenuse; TOA: Tangent = Opposite/Adjacent.",
      tip: "Remember: 'Some Old Horses Can Always Hear Their Owners Approach.'"
    },
    {
      id: 80,
      term: "Sine Rule",
      definition: "a/sin A = b/sin B = c/sin C for any triangle.",
      example: "If a=10, A=30°, B=45°, find b: 10/sin30 = b/sin45 → 10/0.5 = b/0.707 → 20 = b/0.707 → b=14.14.",
      tip: "Use when given two angles and one side."
    },
    {
      id: 81,
      term: "Cosine Rule",
      definition: "a² = b² + c² - 2bc cos A.",
      example: "If b=5, c=6, A=60°: a² = 25+36-2×5×6×0.5 = 61-30=31, a≈5.57.",
      tip: "Use when given two sides and included angle, or three sides."
    },
    {
      id: 82,
      term: "Angles of Elevation",
      definition: "Angle measured upward from the horizontal to a point above.",
      example: "Looking up at a tree top, the angle between your eye line and horizontal is angle of elevation.",
      tip: "Used in height and distance problems."
    },
    {
      id: 83,
      term: "Angles of Depression",
      definition: "Angle measured downward from the horizontal to a point below.",
      example: "From a tower looking down at a car, the angle between horizontal and your line of sight is angle of depression.",
      tip: "Angle of depression equals angle of elevation (alternate angles)."
    },
    // STATISTICS (86-95)
    {
      id: 86,
      term: "Mean (Average)",
      definition: "Sum of all values divided by the number of values.",
      example: "Numbers 2,4,6,8,10: mean = (2+4+6+8+10)/5 = 30/5 = 6.",
      tip: "Mean is affected by outliers (extreme values)."
    },
    {
      id: 87,
      term: "Median",
      definition: "The middle value when data is arranged in order.",
      example: "2,4,6,8,10 → median=6. 2,4,6,8 → median=(4+6)/2=5.",
      tip: "For odd n, median is middle number; for even n, average of two middle numbers."
    },
    {
      id: 88,
      term: "Mode",
      definition: "The value that appears most frequently in a dataset.",
      example: "2,3,3,4,5,5,5,6 → mode=5 (appears three times).",
      tip: "Data can have no mode, one mode (unimodal), or multiple modes (bimodal)."
    },
    {
      id: 89,
      term: "Range",
      definition: "The difference between the largest and smallest values.",
      example: "Data: 2,5,8,11,14 → range = 14-2 = 12.",
      tip: "Range measures spread but is sensitive to outliers."
    },
    {
      id: 90,
      term: "Variance",
      definition: "Average of squared deviations from the mean.",
      example: "σ² = Σ(x - μ)² / N for population; s² = Σ(x - x̄)² / (n-1) for sample.",
      tip: "Variance measures how spread out data is from the mean."
    },
    {
      id: 91,
      term: "Standard Deviation",
      definition: "Square root of variance; measures spread in same units as data.",
      example: "If variance = 4, standard deviation = 2.",
      tip: "Larger standard deviation = more spread out data."
    },
    {
      id: 92,
      term: "Probability",
      definition: "Likelihood of an event occurring: P(E) = favorable outcomes / total outcomes.",
      example: "P(heads) = 1/2 = 0.5. P(rolling a 4 on die) = 1/6 ≈ 0.1667.",
      tip: "Probability ranges from 0 (impossible) to 1 (certain)."
    },
    {
      id: 93,
      term: "Mutually Exclusive Events",
      definition: "Events that cannot occur at the same time.",
      example: "Drawing a king and drawing a queen from a deck are mutually exclusive.",
      tip: "P(A or B) = P(A) + P(B) for mutually exclusive events."
    },
    {
      id: 94,
      term: "Independent Events",
      definition: "Occurrence of one event does not affect probability of the other.",
      example: "Flipping a coin and rolling a die are independent.",
      tip: "P(A and B) = P(A) × P(B) for independent events."
    },
    // CALCULUS (96-100)
    {
      id: 96,
      term: "Derivative",
      definition: "Rate of change of a function; slope of tangent line at a point.",
      example: "dy/dx = 2x for y = x². Derivative at x=3 is 6.",
      tip: "Derivative = 'instantaneous rate of change.'"
    },
    {
      id: 97,
      term: "Differentiation Rules: Power Rule",
      definition: "d/dx (xⁿ) = n·xⁿ⁻¹.",
      example: "d/dx (x⁵) = 5x⁴. d/dx (x³) = 3x².",
      tip: "For constant, d/dx (c) = 0."
    },
    {
      id: 98,
      term: "Integration",
      definition: "Reverse process of differentiation; finds area under curve.",
      example: "∫ x² dx = x³/3 + C (C is constant of integration).",
      tip: "Indefinite integrals have +C; definite integrals give numerical area."
    },
    {
      id: 99,
      term: "Integration Rules: Power Rule",
      definition: "∫ xⁿ dx = xⁿ⁺¹/(n+1) + C, where n ≠ -1.",
      example: "∫ x³ dx = x⁴/4 + C. ∫ x dx = x²/2 + C.",
      tip: "Always add the constant of integration C for indefinite integrals."
    },
    {
      id: 100,
      term: "Area Under Curve",
      definition: "∫ₐᵇ f(x) dx gives area between curve and x-axis from x=a to x=b.",
      example: "∫₀² x² dx = [x³/3]₀² = 8/3 - 0 = 2.667 square units.",
      tip: "Area is always positive; integrate absolute value if curve crosses axis."
    }
  ],

  // ============================================================================
  // PHYSICS (100 cards) - Based on JAMB Physics syllabus [citation:1][citation:8]
  // ============================================================================
  physics: [
    // MEASUREMENTS & UNITS (1-8)
    {
      id: 1,
      term: "Measurement",
      definition: "The process of assigning a number to a physical quantity using a standard unit.",
      example: "Length measured in meters (m), mass in kilograms (kg), time in seconds (s).",
      tip: "Always include units with measurements."
    },
    {
      id: 2,
      term: "Fundamental Quantities",
      definition: "Base quantities that cannot be defined in terms of other quantities.",
      example: "Length, mass, time, temperature, electric current, luminous intensity, amount of substance.",
      tip: "There are 7 fundamental SI quantities."
    },
    {
      id: 3,
      term: "Derived Quantities",
      definition: "Quantities derived from fundamental quantities through mathematical relationships.",
      example: "Velocity (m/s), acceleration (m/s²), force (kg·m/s²), pressure (N/m²).",
      tip: "Derived quantities combine fundamental units."
    },
    {
      id: 4,
      term: "Dimensional Analysis",
      definition: "Using dimensions (M, L, T) to check equations and derive relationships.",
      example: "Force has dimensions MLT⁻². Velocity has dimensions LT⁻¹.",
      tip: "Dimensions on both sides of an equation must match."
    },
    {
      id: 5,
      term: "Vernier Calipers",
      definition: "Instrument for measuring length with precision up to 0.01 cm (0.1 mm).",
      example: "Measures external and internal diameters, depth.",
      tip: "Main scale reading + Vernier scale reading × least count."
    },
    {
      id: 6,
      term: "Micrometer Screw Gauge",
      definition: "Instrument for measuring very small lengths accurately (0.001 cm or 0.01 mm).",
      example: "Used to measure diameter of wire, thickness of paper.",
      tip: "Least count = pitch / number of divisions on thimble."
    },
    {
      id: 7,
      term: "Parallax Error",
      definition: "Error caused by viewing a scale from an angle instead of directly perpendicular.",
      example: "Reading a meter rule from the side gives wrong measurement.",
      tip: "Always position eye directly above the scale reading."
    },
    {
      id: 8,
      term: "Significant Figures",
      definition: "Digits in a measurement that are known with certainty plus one estimated digit.",
      example: "2.54 cm has 3 significant figures. 0.0025 has 2 significant figures.",
      tip: "Leading zeros are not significant; trailing zeros after decimal are significant."
    },
    // MOTION (9-25)
    {
      id: 9,
      term: "Distance",
      definition: "Total path length traveled, scalar quantity.",
      example: "Walking 10 m north then 5 m south → distance = 15 m.",
      tip: "Distance has magnitude only, no direction."
    },
    {
      id: 10,
      term: "Displacement",
      definition: "Straight-line distance from start to finish with direction, vector quantity.",
      example: "Walking 10 m north then 5 m south → displacement = 5 m north.",
      tip: "Displacement can be zero while distance is positive."
    },
    {
      id: 11,
      term: "Speed",
      definition: "Rate of change of distance; scalar quantity.",
      example: "v = distance/time. 100 m in 10 s → speed = 10 m/s.",
      tip: "Speed = |velocity|."
    },
    {
      id: 12,
      term: "Velocity",
      definition: "Rate of change of displacement; vector quantity.",
      example: "v = displacement/time. 50 m north in 10 s → velocity = 5 m/s north.",
      tip: "Velocity includes direction; speed does not."
    },
    {
      id: 13,
      term: "Acceleration",
      definition: "Rate of change of velocity; vector quantity.",
      example: "a = (v - u)/t. 0 to 20 m/s in 5 s → a = 4 m/s².",
      tip: "Deceleration is negative acceleration."
    },
    {
      id: 14,
      term: "First Equation of Motion",
      definition: "v = u + at (relates final velocity, initial velocity, acceleration, time).",
      example: "u=10 m/s, a=2 m/s², t=3 s → v = 10 + 6 = 16 m/s.",
      tip: "Use when acceleration is constant."
    },
    {
      id: 15,
      term: "Second Equation of Motion",
      definition: "s = ut + ½at² (relates displacement, initial velocity, acceleration, time).",
      example: "u=10 m/s, a=2 m/s², t=3 s → s = 30 + 9 = 39 m.",
      tip: "Derived from area under v-t graph."
    },
    {
      id: 16,
      term: "Third Equation of Motion",
      definition: "v² = u² + 2as (relates velocities, acceleration, displacement).",
      example: "u=10 m/s, a=2 m/s², s=39 m → v² = 100 + 156 = 256 → v=16 m/s.",
      tip: "Time-independent equation."
    },
    {
      id: 17,
      term: "Free Fall",
      definition: "Motion under gravity only, no air resistance. Acceleration = g ≈ 9.8 m/s² (10 m/s²).",
      example: "Object dropped from height h: time to fall t = √(2h/g).",
      tip: "All objects fall at same rate in vacuum."
    },
    {
      id: 18,
      term: "Projectile Motion",
      definition: "Motion of object thrown into the air under gravity.",
      example: "Ball kicked at an angle, bullet fired horizontally.",
      tip: "Horizontal motion: constant velocity; vertical motion: constant acceleration."
    },
    {
      id: 19,
      term: "Range of Projectile",
      definition: "Horizontal distance traveled before hitting ground.",
      example: "R = (u² sin 2θ)/g.",
      tip: "Maximum range at θ = 45°."
    },
    {
      id: 20,
      term: "Maximum Height of Projectile",
      definition: "Highest vertical distance reached.",
      example: "H = (u² sin²θ)/(2g).",
      tip: "At maximum height, vertical velocity = 0."
    },
    {
      id: 21,
      term: "Time of Flight",
      definition: "Total time projectile stays in air.",
      example: "T = (2u sin θ)/g.",
      tip: "Time up = time down for symmetric trajectory."
    },
    // FORCES & NEWTON'S LAWS (26-40)
    {
      id: 26,
      term: "Newton's First Law",
      definition: "An object remains at rest or in uniform motion unless acted by an external force.",
      example: "Book on table stays there until pushed.",
      tip: "Also called Law of Inertia."
    },
    {
      id: 27,
      term: "Newton's Second Law",
      definition: "Force equals mass times acceleration: F = ma.",
      example: "10 N force on 2 kg mass → a = F/m = 5 m/s².",
      tip: "Force and acceleration are in same direction."
    },
    {
      id: 28,
      term: "Newton's Third Law",
      definition: "Every action has an equal and opposite reaction.",
      example: "Rocket pushes gas down; gas pushes rocket up.",
      tip: "Action and reaction act on different bodies."
    },
    {
      id: 29,
      term: "Weight",
      definition: "Force due to gravity: W = mg.",
      example: "Mass 10 kg → weight = 10 × 10 = 100 N.",
      tip: "Weight changes with gravity; mass is constant."
    },
    {
      id: 30,
      term: "Momentum",
      definition: "Product of mass and velocity: p = mv.",
      example: "2 kg object at 3 m/s → p = 6 kg·m/s.",
      tip: "Momentum is a vector quantity."
    },
    {
      id: 31,
      term: "Impulse",
      definition: "Change in momentum; equals force × time: J = FΔt = Δp.",
      example: "10 N force for 2 s → impulse = 20 Ns, momentum change = 20 kg·m/s.",
      tip: "Impulse = area under force-time graph."
    },
    {
      id: 32,
      term: "Conservation of Momentum",
      definition: "Total momentum before collision equals total momentum after collision (no external forces).",
      example: "Two balls colliding: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂.",
      tip: "Used for both elastic and inelastic collisions."
    },
    {
      id: 33,
      term: "Elastic Collision",
      definition: "Collision where kinetic energy is conserved.",
      example: "Billiard balls colliding (approximately elastic).",
      tip: "Both momentum and KE conserved."
    },
    {
      id: 34,
      term: "Inelastic Collision",
      definition: "Collision where kinetic energy is NOT conserved (converted to heat, sound, deformation).",
      example: "Two cars crumpling together. Clay balls sticking together.",
      tip: "Perfectly inelastic: objects stick together after collision."
    },
    {
      id: 35,
      term: "Friction",
      definition: "Force resisting relative motion between surfaces in contact.",
      example: "Pushing a box across floor; friction opposes motion.",
      tip: "Static friction > kinetic friction (harder to start moving)."
    },
    {
      id: 36,
      term: "Coefficient of Friction",
      definition: "Ratio of frictional force to normal reaction: μ = F/R.",
      example: "Friction 40 N, normal force 100 N → μ = 0.4.",
      tip: "μ is dimensionless; depends on materials."
    },
    {
      id: 37,
      term: "Work",
      definition: "Force × displacement in direction of force: W = F × s × cos θ.",
      example: "50 N force moving 10 m in same direction → W = 500 J.",
      tip: "Work is energy transferred by force."
    },
    {
      id: 38,
      term: "Kinetic Energy",
      definition: "Energy of motion: KE = ½mv².",
      example: "2 kg object at 3 m/s → KE = ½×2×9 = 9 J.",
      tip: "KE is always positive or zero."
    },
    {
      id: 39,
      term: "Potential Energy",
      definition: "Stored energy due to position: PE = mgh (gravitational).",
      example: "5 kg mass at 10 m height → PE = 5×10×10 = 500 J.",
      tip: "Elastic PE = ½kx² (spring)."
    },
    {
      id: 40,
      term: "Power",
      definition: "Rate of doing work: P = W/t = Fv.",
      example: "1000 J work in 5 s → P = 200 W.",
      tip: "1 horsepower = 746 W ≈ 750 W."
    },
    // HEAT & THERMODYNAMICS (41-55)
    {
      id: 41,
      term: "Temperature",
      definition: "Measure of average kinetic energy of particles.",
      example: "Higher temperature = particles move faster.",
      tip: "Temperature ≠ heat."
    },
    {
      id: 42,
      term: "Heat",
      definition: "Energy transferred due to temperature difference.",
      example: "Heat flows from hot to cold objects.",
      tip: "Heat is transferred energy; temperature measures energy level."
    },
    {
      id: 43,
      term: "Specific Heat Capacity",
      definition: "Heat required to raise 1 kg of substance by 1 K (or 1°C).",
      example: "Water c = 4200 J/kg°C; requires 4200 J to heat 1 kg by 1°C.",
      tip: "High c means substance heats slowly."
    },
    {
      id: 44,
      term: "Latent Heat",
      definition: "Heat absorbed or released during phase change without temperature change.",
      example: "Melting ice at 0°C: latent heat of fusion.",
      tip: "Latent heat of vaporization > latent heat of fusion."
    },
    {
      id: 45,
      term: "Heat Transfer: Conduction",
      definition: "Heat transfer through direct contact without bulk movement.",
      example: "Metal spoon getting hot in soup.",
      tip: "Metals are good conductors; wood, air are insulators."
    },
    {
      id: 46,
      term: "Heat Transfer: Convection",
      definition: "Heat transfer through bulk movement of fluids (liquids or gases).",
      example: "Hot air rising, boiling water circulation.",
      tip: "Convection currents drive weather patterns."
    },
    {
      id: 47,
      term: "Heat Transfer: Radiation",
      definition: "Heat transfer through electromagnetic waves; no medium needed.",
      example: "Sun warming Earth, heat from fire.",
      tip: "Dark surfaces absorb more radiation; light surfaces reflect."
    },
    {
      id: 48,
      term: "Expansion",
      definition: "Increase in size when heated; decrease when cooled.",
      example: "Railway tracks have expansion gaps.",
      tip: "ΔL = αL₀ΔT (linear expansion)."
    },
    {
      id: 49,
      term: "Gas Laws: Boyle's Law",
      definition: "At constant temperature, pressure inversely proportional to volume: P₁V₁ = P₂V₂.",
      example: "Double volume → half pressure.",
      tip: "Use for gases at constant temperature."
    },
    {
      id: 50,
      term: "Gas Laws: Charles's Law",
      definition: "At constant pressure, volume directly proportional to absolute temperature: V₁/T₁ = V₂/T₂.",
      example: "T in Kelvin! V doubles when T doubles.",
      tip: "Convert °C to Kelvin: K = °C + 273."
    },
    {
      id: 51,
      term: "Gas Laws: Pressure Law",
      definition: "At constant volume, pressure directly proportional to absolute temperature: P₁/T₁ = P₂/T₂.",
      example: "Heating gas in closed container increases pressure.",
      tip: "Used in pressure cookers, car tires."
    },
    {
      id: 52,
      term: "Ideal Gas Equation",
      definition: "PV = nRT, where n = number of moles, R = gas constant.",
      example: "At STP (273 K, 1 atm), 1 mole occupies 22.4 L.",
      tip: "Combines all three gas laws."
    },
    // WAVES & OPTICS (56-75)
    {
      id: 56,
      term: "Wave",
      definition: "Disturbance that transfers energy without transferring matter.",
      example: "Sound waves, light waves, water waves.",
      tip: "Waves transfer energy, not particles."
    },
    {
      id: 57,
      term: "Transverse Wave",
      definition: "Particles vibrate perpendicular to wave direction.",
      example: "Light waves, water ripples, waves on string.",
      tip: "Crests and troughs."
    },
    {
      id: 58,
      term: "Longitudinal Wave",
      definition: "Particles vibrate parallel to wave direction.",
      example: "Sound waves, seismic P-waves.",
      tip: "Compressions and rarefactions."
    },
    {
      id: 59,
      term: "Frequency",
      definition: "Number of complete waves passing a point per second. Unit: Hertz (Hz).",
      example: "Radio station 100 MHz = 100 million waves per second.",
      tip: "Frequency = 1/period."
    },
    {
      id: 60,
      term: "Wavelength",
      definition: "Distance between successive crests or compressions.",
      example: "Radio waves have long wavelength; gamma rays very short.",
      tip: "λ = v/f."
    },
    {
      id: 61,
      term: "Wave Speed",
      definition: "Speed of wave propagation: v = fλ.",
      example: "Sound in air ≈ 340 m/s; light = 3×10⁸ m/s.",
      tip: "Speed depends on medium."
    },
    {
      id: 62,
      term: "Reflection",
      definition: "Bouncing of waves off a surface.",
      example: "Mirror reflects light, echo reflects sound.",
      tip: "Angle of incidence = angle of reflection."
    },
    {
      id: 63,
      term: "Refraction",
      definition: "Bending of waves as they enter a different medium due to speed change.",
      example: "Straw appearing bent in water, lens focusing light.",
      tip: "Light bends toward normal when entering denser medium."
    },
    {
      id: 64,
      term: "Snell's Law",
      definition: "n₁ sin θ₁ = n₂ sin θ₂, relating angles of incidence and refraction.",
      example: "Air (n=1) to water (n=1.33): sin i / sin r = 1.33.",
      tip: "n = c/v, where c is speed of light in vacuum."
    },
    {
      id: 65,
      term: "Critical Angle",
      definition: "Angle of incidence in denser medium where refraction angle = 90°.",
      example: "Water to air: θ_c = arcsin(1/1.33) ≈ 48.8°.",
      tip: "Total internal reflection occurs when i > θ_c."
    },
    {
      id: 66,
      term: "Diffraction",
      definition: "Spreading of waves when passing through a gap or around an obstacle.",
      example: "Sound bending around corners, light spreading through slit.",
      tip: "More diffraction when wavelength ≈ gap size."
    },
    {
      id: 67,
      term: "Interference",
      definition: "Superposition of two waves; constructive (in phase) or destructive (out of phase).",
      example: "Young's double slit experiment with light.",
      tip: "Constructive: waves add; destructive: waves cancel."
    },
    {
      id: 68,
      term: "Doppler Effect",
      definition: "Change in observed frequency due to relative motion between source and observer.",
      example: "Siren pitch higher as ambulance approaches, lower as it moves away.",
      tip: "Used in radar, ultrasound, astronomy (redshift)."
    },
    {
      id: 69,
      term: "Plane Mirror",
      definition: "Flat mirror; image is virtual, upright, same size, laterally inverted.",
      example: "Bathroom mirror, dressing mirror.",
      tip: "Image distance = object distance."
    },
    {
      id: 70,
      term: "Concave Mirror",
      definition: "Curved inward; converges light; used in telescopes, shaving mirrors.",
      example: "Can produce real or virtual images depending on object distance.",
      tip: "Focal length = R/2 (R = radius of curvature)."
    },
    {
      id: 71,
      term: "Convex Mirror",
      definition: "Curved outward; diverges light; always produces virtual, upright, diminished image.",
      example: "Side mirrors on cars (objects appear smaller but wider view).",
      tip: "Convex mirrors have wider field of view."
    },
    {
      id: 72,
      term: "Convex Lens",
      definition: "Thicker in middle; converges light; used in magnifying glasses, cameras.",
      example: "Can form real or virtual images.",
      tip: "Focal length positive for convex lens."
    },
    {
      id: 73,
      term: "Concave Lens",
      definition: "Thinner in middle; diverges light; always produces virtual, upright, diminished image.",
      example: "Used in some eyeglasses for nearsightedness.",
      tip: "Focal length negative for concave lens."
    },
    {
      id: 74,
      term: "Lens Formula",
      definition: "1/f = 1/u + 1/v (f = focal length, u = object distance, v = image distance).",
      example: "Convex lens f=10 cm, u=20 cm: 1/10 = 1/20 + 1/v → v=20 cm.",
      tip: "Sign conventions: real images have positive v."
    },
    {
      id: 75,
      term: "Magnification",
      definition: "Ratio of image height to object height: m = -v/u = hᵢ/hₒ.",
      example: "v=20 cm, u=10 cm → m = -2 (image inverted, twice size).",
      tip: "|m| > 1 means enlarged; |m| < 1 means diminished."
    },
    // ELECTRICITY (76-95)
    {
      id: 76,
      term: "Electric Charge",
      definition: "Property of matter causing electromagnetic force. Types: positive and negative.",
      example: "Electrons (negative), protons (positive).",
      tip: "Like charges repel; opposite charges attract."
    },
    {
      id: 77,
      term: "Coulomb's Law",
      definition: "Force between two charges: F = kq₁q₂/r², where k = 9×10⁹ Nm²/C².",
      example: "Doubling distance reduces force to 1/4.",
      tip: "Force is along line joining charges."
    },
    {
      id: 78,
      term: "Electric Field",
      definition: "Region where electric force acts on a charge: E = F/q.",
      example: "Field around a point charge: E = kq/r².",
      tip: "Direction: positive to negative."
    },
    {
      id: 79,
      term: "Potential Difference (Voltage)",
      definition: "Work done per unit charge: V = W/Q.",
      example: "12 V battery does 12 J of work per coulomb of charge.",
      tip: "Voltage drives current."
    },
    {
      id: 80,
      term: "Current",
      definition: "Rate of flow of charge: I = Q/t.",
      example: "2 A current means 2 C of charge flows per second.",
      tip: "Conventional current flows from + to - (opposite electron flow)."
    },
    {
      id: 81,
      term: "Resistance",
      definition: "Opposition to current flow: R = V/I.",
      example: "10 V, 2 A → R = 5 Ω.",
      tip: "Unit: ohm (Ω)."
    },
    {
      id: 82,
      term: "Ohm's Law",
      definition: "V = IR for ohmic conductors (constant resistance).",
      example: "Resistor 10 Ω with 2 A current → V = 20 V.",
      tip: "Graph of V vs I is straight line through origin."
    },
    {
      id: 83,
      term: "Resistivity",
      definition: "Material property: R = ρL/A, where ρ = resistivity, L = length, A = area.",
      example: "Longer wire = higher resistance; thicker wire = lower resistance.",
      tip: "Copper has low ρ (good conductor); rubber has high ρ (insulator)."
    },
    {
      id: 84,
      term: "Power (Electrical)",
      definition: "Rate of electrical energy conversion: P = VI = I²R = V²/R.",
      example: "100 W bulb at 200 V draws 0.5 A current.",
      tip: "Power in watts; energy in joules (J = W×s)."
    },
    {
      id: 85,
      term: "Resistors in Series",
      definition: "Total resistance = sum: R_T = R₁ + R₂ + R₃ + ...",
      example: "2 Ω + 3 Ω = 5 Ω.",
      tip: "Same current through each resistor."
    },
    {
      id: 86,
      term: "Resistors in Parallel",
      definition: "Reciprocal total: 1/R_T = 1/R₁ + 1/R₂ + 1/R₃ + ...",
      example: "2 Ω and 3 Ω: 1/R_T = 1/2 + 1/3 = 5/6 → R_T = 1.2 Ω.",
      tip: "Same voltage across each resistor."
    },
    {
      id: 87,
      term: "Electromotive Force (emf)",
      definition: "Maximum potential difference provided by a source (battery, generator).",
      example: "12 V battery has emf 12 V.",
      tip: "Terminal voltage = emf - Ir (internal resistance drop)."
    },
    {
      id: 88,
      term: "Internal Resistance",
      definition: "Resistance within a battery or power source.",
      example: "Battery with emf 12 V, internal resistance 1 Ω, current 2 A → terminal voltage = 10 V.",
      tip: "Internal resistance causes voltage drop when current flows."
    },
    {
      id: 89,
      term: "Kirchhoff's First Law (Current)",
      definition: "Total current entering a junction equals total current leaving.",
      example: "I₁ + I₂ = I₃.",
      tip: "Based on conservation of charge."
    },
    {
      id: 90,
      term: "Kirchhoff's Second Law (Voltage)",
      definition: "Sum of emfs = sum of potential drops around any closed loop.",
      example: "E = I(R₁ + R₂ + ...).",
      tip: "Based on conservation of energy."
    },
    // MODERN PHYSICS (96-100)
    {
      id: 96,
      term: "Photoelectric Effect",
      definition: "Emission of electrons from metal surface when light of sufficient frequency shines on it.",
      example: "UV light on zinc plate causes electron emission.",
      tip: "Threshold frequency f₀ = work function / h."
    },
    {
      id: 97,
      term: "Photon Energy",
      definition: "Energy of light quantum: E = hf = hc/λ.",
      example: "Green light (λ≈550 nm): E ≈ 2.25 eV.",
      tip: "h = 6.63×10⁻³⁴ J·s (Planck's constant)."
    },
    {
      id: 98,
      term: "Radioactivity",
      definition: "Spontaneous emission of particles/energy from unstable atomic nuclei.",
      example: "Uranium decaying to thorium emitting alpha particles.",
      tip: "Types: alpha (α), beta (β), gamma (γ) radiation."
    },
    {
      id: 99,
      term: "Half-Life",
      definition: "Time for half of radioactive sample to decay.",
      example: "Carbon-14 half-life = 5730 years.",
      tip: "Used in carbon dating of fossils."
    },
    {
      id: 100,
      term: "Nuclear Fission",
      definition: "Splitting of heavy nucleus into lighter nuclei, releasing energy.",
      example: "Uranium-235 splitting in nuclear reactors.",
      tip: "Chain reaction possible; used in nuclear power and bombs."
    }
  ],

  // ============================================================================
  // CHEMISTRY (100 cards) - Based on JAMB Chemistry syllabus [citation:1][citation:8]
  // ============================================================================
  chemistry: [
    // ATOMIC STRUCTURE (1-15)
    {
      id: 1,
      term: "Atom",
      definition: "The smallest unit of matter that retains properties of an element.",
      example: "Gold atom is still gold; cannot be further divided chemically.",
      tip: "Atoms consist of nucleus (protons + neutrons) and electrons."
    },
    {
      id: 2,
      term: "Proton",
      definition: "Positively charged particle in nucleus. Number of protons = atomic number (Z).",
      example: "Hydrogen has 1 proton; carbon has 6 protons.",
      tip: "Protons determine the element's identity."
    },
    {
      id: 3,
      term: "Neutron",
      definition: "Neutral particle in nucleus; mass similar to proton.",
      example: "Carbon-12 has 6 neutrons; carbon-14 has 8 neutrons.",
      tip: "Neutrons affect isotope and stability."
    },
    {
      id: 4,
      term: "Electron",
      definition: "Negatively charged particle orbiting nucleus in shells.",
      example: "Hydrogen has 1 electron; oxygen has 8 electrons.",
      tip: "Electrons determine chemical behavior."
    },
    {
      id: 5,
      term: "Atomic Number (Z)",
      definition: "Number of protons in nucleus; identifies element.",
      example: "Z=1 → hydrogen; Z=6 → carbon; Z=8 → oxygen.",
      tip: "In neutral atom, protons = electrons."
    },
    {
      id: 6,
      term: "Mass Number (A)",
      definition: "Total number of protons + neutrons.",
      example: "Carbon-12: 6 protons + 6 neutrons = 12.",
      tip: "A = Z + N (N = number of neutrons)."
    },
    {
      id: 7,
      term: "Isotopes",
      definition: "Atoms of same element with different numbers of neutrons (different mass numbers).",
      example: "Carbon-12, Carbon-13, Carbon-14 are isotopes of carbon.",
      tip: "Isotopes have same chemical properties but different physical properties."
    },
    {
      id: 8,
      term: "Electronic Configuration",
      definition: "Arrangement of electrons in energy levels (shells).",
      example: "2,8,8,2 for calcium (20 electrons).",
      tip: "2,8,8,18,18,32 are maximum electrons per shell."
    },
    {
      id: 9,
      term: "Valence Electrons",
      definition: "Electrons in outermost shell; determine chemical bonding.",
      example: "Oxygen (2,6) has 6 valence electrons; needs 2 more to fill shell.",
      tip: "Valence electrons are involved in reactions."
    },
    {
      id: 10,
      term: "Aufbau Principle",
      definition: "Electrons fill lowest energy orbitals first.",
      example: "1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p ...",
      tip: "Order: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ ..."
    },
    {
      id: 11,
      term: "Hund's Rule",
      definition: "Electrons occupy degenerate orbitals singly before pairing.",
      example: "p orbitals: one electron in each of px, py, pz before pairing.",
      tip: "Maximizes spin alignment and stability."
    },
    {
      id: 12,
      term: "Pauli Exclusion Principle",
      definition: "No two electrons in same atom can have all four quantum numbers identical.",
      example: "Each orbital holds max 2 electrons with opposite spins.",
      tip: "Electrons in same orbital have opposite spins (↑↓)."
    },
    {
      id: 13,
      term: "Periodic Law",
      definition: "Properties of elements are periodic functions of atomic number.",
      example: "Elements in same group have similar properties.",
      tip: "Mendeleev and Moseley contributed to periodic table."
    },
    {
      id: 14,
      term: "Period (Row)",
      definition: "Horizontal row in periodic table; elements have same number of shells.",
      example: "Period 2: Li, Be, B, C, N, O, F, Ne (2 shells).",
      tip: "There are 7 periods."
    },
    {
      id: 15,
      term: "Group (Column)",
      definition: "Vertical column; elements have same number of valence electrons.",
      example: "Group 1: alkali metals (Li, Na, K) have 1 valence electron.",
      tip: "Groups 1,2,13-18 (main groups); groups 3-12 (transition metals)."
    },
    // CHEMICAL BONDING (16-30)
    {
      id: 16,
      term: "Chemical Bond",
      definition: "Attractive force holding atoms together in compounds.",
      example: "H₂O: covalent bonds between H and O.",
      tip: "Bonds form to achieve stable electron configuration (usually octet)."
    },
    {
      id: 17,
      term: "Ionic Bond",
      definition: "Transfer of electrons from metal to non-metal; forms positive and negative ions.",
      example: "NaCl: Na⁺ and Cl⁻ attract electrostatically.",
      tip: "Ionic compounds: high melting points, soluble in water, conduct electricity when molten."
    },
    {
      id: 18,
      term: "Covalent Bond",
      definition: "Sharing of electrons between non-metals.",
      example: "H₂: H-H single bond; O₂: O=O double bond; N₂: N≡N triple bond.",
      tip: "Covalent compounds: low melting points, often insoluble, do not conduct electricity."
    },
    {
      id: 19,
      term: "Dative (Coordinate) Covalent Bond",
      definition: "Covalent bond where both shared electrons come from same atom.",
      example: "NH₄⁺ (ammonium ion): H⁺ bonds to NH₃ using lone pair on N.",
      tip: "Once formed, dative bond is indistinguishable from ordinary covalent bond."
    },
    {
      id: 20,
      term: "Metallic Bond",
      definition: "Sea of delocalized electrons around positive metal ions.",
      example: "Copper, iron, aluminum: electrons free to move.",
      tip: "Metals: malleable, ductile, good conductors of heat and electricity."
    },
    {
      id: 21,
      term: "Hydrogen Bond",
      definition: "Strong dipole-dipole attraction between H and F, O, or N.",
      example: "H₂O has hydrogen bonding (responsible for water's high boiling point).",
      tip: "H-bonding in DNA (base pairing) and proteins (secondary structure)."
    },
    {
      id: 22,
      term: "Van der Waals Forces",
      definition: "Weak intermolecular forces between all molecules.",
      example: "London dispersion forces (temporary dipoles).",
      tip: "Increase with molecular size and surface area."
    },
    {
      id: 23,
      term: "Octet Rule",
      definition: "Atoms tend to gain, lose, or share electrons to achieve 8 valence electrons.",
      example: "Na loses 1 e⁻ to become Na⁺ (2,8); Cl gains 1 e⁻ to become Cl⁻ (2,8,8).",
      tip: "Exceptions: H (2 electrons), Be (4), B (6), expanded octets (P, S, Cl)."
    },
    {
      id: 24,
      term: "Electronegativity",
      definition: "Ability of atom to attract shared electrons in covalent bond.",
      example: "F (4.0) most electronegative; O (3.5); N (3.0); Cl (3.0).",
      tip: "Electronegativity increases across period; decreases down group."
    },
    {
      id: 25,
      term: "Polar Covalent Bond",
      definition: "Unequal sharing of electrons due to electronegativity difference.",
      example: "H₂O: O more electronegative, pulls electrons → partial charges (δ⁺ and δ⁻).",
      tip: "Polar molecules have dipole moments."
    },
    {
      id: 26,
      term: "Non-polar Covalent Bond",
      definition: "Equal sharing of electrons; occurs in diatomic molecules of same element.",
      example: "H₂, Cl₂, O₂, N₂; also CCl₄ (symmetrical).",
      tip: "Molecules with symmetrical shape can be non-polar despite polar bonds."
    },
    {
      id: 27,
      term: "VSEPR Theory",
      definition: "Valence Shell Electron Pair Repulsion: electron pairs repel, determine molecular shape.",
      example: "CH₄: 4 bonding pairs → tetrahedral (109.5°).",
      tip: "Lone pairs repel more strongly than bonding pairs, reducing bond angles."
    },
    {
      id: 28,
      term: "Linear Shape",
      definition: "2 bonding pairs, 0 lone pairs; bond angle 180°.",
      example: "CO₂, BeCl₂, C₂H₂ (acetylene).",
      tip: "Central atom has 2 electron domains."
    },
    {
      id: 29,
      term: "Trigonal Planar Shape",
      definition: "3 bonding pairs, 0 lone pairs; bond angle 120°.",
      example: "BF₃, SO₃, CH₂O (formaldehyde).",
      tip: "Central atom has 3 electron domains."
    },
    {
      id: 30,
      term: "Tetrahedral Shape",
      definition: "4 bonding pairs, 0 lone pairs; bond angle 109.5°.",
      example: "CH₄, CCl₄, NH₄⁺, SiCl₄.",
      tip: "Most common shape for carbon compounds."
    },
    // STATES OF MATTER (31-40)
    {
      id: 31,
      term: "Kinetic Theory of Matter",
      definition: "Particles in matter are in constant random motion.",
      example: "Gas particles move fastest; solid particles vibrate in place.",
      tip: "Higher temperature = faster particle motion."
    },
    {
      id: 32,
      term: "Gas Pressure",
      definition: "Force exerted by gas particles colliding with container walls.",
      example: "Increasing temperature increases pressure (particles move faster).",
      tip: "P = F/A (force per unit area)."
    },
    {
      id: 33,
      term: "Boyle's Law",
      definition: "At constant temperature, P₁V₁ = P₂V₂.",
      example: "Double volume → half pressure.",
      tip: "Inverse relationship."
    },
    {
      id: 34,
      term: "Charles's Law",
      definition: "At constant pressure, V₁/T₁ = V₂/T₂ (T in Kelvin).",
      example: "Gas volume increases when heated.",
      tip: "Direct relationship."
    },
    {
      id: 35,
      term: "Avogadro's Law",
      definition: "Equal volumes of gases at same T and P contain equal number of molecules.",
      example: "1 mole of any gas at STP occupies 22.4 L.",
      tip: "Avogadro's number = 6.02×10²³ particles/mole."
    },
    {
      id: 36,
      term: "Ideal Gas Equation",
      definition: "PV = nRT, where R = 0.0821 L·atm/mol·K.",
      example: "1 mole at STP (273 K, 1 atm): V = nRT/P = 22.4 L.",
      tip: "R = 8.314 J/mol·K (SI units)."
    },
    {
      id: 37,
      term: "Melting Point",
      definition: "Temperature where solid turns to liquid.",
      example: "Ice melts at 0°C; iron melts at 1538°C.",
      tip: "Melting occurs when particles have enough energy to overcome lattice forces."
    },
    {
      id: 38,
      term: "Boiling Point",
      definition: "Temperature where liquid turns to gas throughout (vapor pressure = atmospheric pressure).",
      example: "Water boils at 100°C at sea level.",
      tip: "Boiling point decreases at higher altitudes (lower pressure)."
    },
    {
      id: 39,
      term: "Sublimation",
      definition: "Direct change from solid to gas without passing through liquid.",
      example: "Dry ice (CO₂), iodine, naphthalene (mothballs).",
      tip: "Deposition is reverse (gas to solid)."
    },
    {
      id: 40,
      term: "Diffusion",
      definition: "Movement of particles from high to low concentration.",
      example: "Perfume spreading across room.",
      tip: "Lighter gases diffuse faster (Graham's law)."
    },
    // CHEMICAL REACTIONS (41-55)
    {
      id: 41,
      term: "Chemical Equation",
      definition: "Symbolic representation of chemical reaction.",
      example: "2H₂ + O₂ → 2H₂O.",
      tip: "Must be balanced (same number of atoms each side)."
    },
    {
      id: 42,
      term: "Reactants",
      definition: "Starting substances on left side of equation.",
      example: "H₂ and O₂ are reactants in 2H₂ + O₂ → 2H₂O.",
      tip: "Reactants are consumed during reaction."
    },
    {
      id: 43,
      term: "Products",
      definition: "Substances formed on right side of equation.",
      example: "H₂O is product in 2H₂ + O₂ → 2H₂O.",
      tip: "Products are created during reaction."
    },
    {
      id: 44,
      term: "Combination Reaction",
      definition: "Two or more substances combine to form one product.",
      example: "2Mg + O₂ → 2MgO. N₂ + 3H₂ → 2NH₃.",
      tip: "A + B → C."
    },
    {
      id: 45,
      term: "Decomposition Reaction",
      definition: "One substance breaks down into two or more simpler substances.",
      example: "2HgO → 2Hg + O₂. CaCO₃ → CaO + CO₂.",
      tip: "Often requires heat, light, or electricity."
    },
    {
      id: 46,
      term: "Displacement Reaction",
      definition: "More reactive element displaces less reactive element from compound.",
      example: "Zn + CuSO₄ → ZnSO₄ + Cu (Zn displaces Cu).",
      tip: "Based on reactivity series."
    },
    {
      id: 47,
      term: "Double Displacement (Metathesis)",
      definition: "Two compounds exchange partners.",
      example: "AgNO₃ + NaCl → AgCl↓ + NaNO₃.",
      tip: "Often forms precipitate, gas, or weak electrolyte."
    },
    {
      id: 48,
      term: "Neutralization Reaction",
      definition: "Acid + base → salt + water.",
      example: "HCl + NaOH → NaCl + H₂O.",
      tip: "H⁺ + OH⁻ → H₂O."
    },
    {
      id: 49,
      term: "Oxidation",
      definition: "Loss of electrons; increase in oxidation number.",
      example: "Mg → Mg²⁺ + 2e⁻ (oxidation).",
      tip: "OIL RIG: Oxidation Is Loss, Reduction Is Gain."
    },
    {
      id: 50,
      term: "Reduction",
      definition: "Gain of electrons; decrease in oxidation number.",
      example: "Cu²⁺ + 2e⁻ → Cu (reduction).",
      tip: "Oxidation and reduction occur together (redox reactions)."
    },
    {
      id: 51,
      term: "Oxidizing Agent",
      definition: "Substance that causes oxidation; itself is reduced.",
      example: "O₂, Cl₂, KMnO₄, K₂Cr₂O₇.",
      tip: "Oxidizing agent gains electrons."
    },
    {
      id: 52,
      term: "Reducing Agent",
      definition: "Substance that causes reduction; itself is oxidized.",
      example: "H₂, CO, C, metals, NaBH₄.",
      tip: "Reducing agent loses electrons."
    },
    {
      id: 53,
      term: "Rate of Reaction",
      definition: "Change in concentration of reactant or product per unit time.",
      example: "Fast: explosion; slow: rusting.",
      tip: "Factors: concentration, temperature, surface area, catalyst."
    },
    {
      id: 54,
      term: "Catalyst",
      definition: "Substance that increases reaction rate without being consumed.",
      example: "Iron in Haber process (N₂ + 3H₂ → 2NH₃).",
      tip: "Enzymes are biological catalysts."
    },
    {
      id: 55,
      term: "Chemical Equilibrium",
      definition: "State where forward and reverse reaction rates are equal.",
      example: "N₂ + 3H₂ ⇌ 2NH₃.",
      tip: "Le Chatelier's principle: system responds to stress to restore equilibrium."
    },
    // ACIDS, BASES & SALTS (56-70)
    {
      id: 56,
      term: "Acid (Arrhenius)",
      definition: "Substance that produces H⁺ ions in water.",
      example: "HCl → H⁺ + Cl⁻. H₂SO₄ → 2H⁺ + SO₄²⁻.",
      tip: "Strong acids fully dissociate; weak acids partially dissociate."
    },
    {
      id: 57,
      term: "Base (Arrhenius)",
      definition: "Substance that produces OH⁻ ions in water.",
      example: "NaOH → Na⁺ + OH⁻. Ca(OH)₂ → Ca²⁺ + 2OH⁻.",
      tip: "Alkalis are soluble bases."
    },
    {
      id: 58,
      term: "Acid (Brønsted-Lowry)",
      definition: "Proton (H⁺) donor.",
      example: "HCl donates H⁺ to H₂O forming H₃O⁺ (hydronium).",
      tip: "Conjugate base: what remains after acid donates H⁺."
    },
    {
      id: 59,
      term: "Base (Brønsted-Lowry)",
      definition: "Proton (H⁺) acceptor.",
      example: "NH₃ accepts H⁺ forming NH₄⁺.",
      tip: "Conjugate acid: what forms when base accepts H⁺."
    },
    {
      id: 60,
      term: "pH Scale",
      definition: "Measure of acidity: pH = -log[H⁺].",
      example: "pH 7 = neutral (water); pH < 7 = acid; pH > 7 = base.",
      tip: "Each pH unit = 10× change in [H⁺]."
    },
    {
      id: 61,
      term: "Indicator",
      definition: "Substance that changes color depending on pH.",
      example: "Litmus: red in acid, blue in base. Phenolphthalein: colorless in acid, pink in base.",
      tip: "Universal indicator gives range of colors for different pH values."
    },
    {
      id: 62,
      term: "Salt",
      definition: "Ionic compound formed from acid-base neutralization.",
      example: "NaCl (table salt), KNO₃, CaCO₃.",
      tip: "Salts can be neutral, acidic, or basic depending on parent acid/base."
    },
    {
      id: 63,
      term: "Normal Salt",
      definition: "All H⁺ of acid replaced by metal/positive ion.",
      example: "Na₂SO₄ (from H₂SO₄ + 2NaOH).",
      tip: "No replaceable H⁺ remaining."
    },
    {
      id: 64,
      term: "Acid Salt",
      definition: "Some H⁺ of acid remain un-replaced.",
      example: "NaHCO₃ (sodium bicarbonate), NaHSO₄.",
      tip: "Acid salts can react with more base."
    },
    {
      id: 65,
      term: "Basic Salt",
      definition: "Contains OH⁻ groups in addition to anion.",
      example: "Basic copper carbonate Cu₂(OH)₂CO₃.",
      tip: "Less common; often insoluble."
    },
    {
      id: 66,
      term: "Hydrolysis",
      definition: "Reaction of salt ions with water to produce acidic or basic solution.",
      example: "Na₂CO₃ (basic): CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻.",
      tip: "Salt of strong acid + strong base → neutral solution."
    },
    {
      id: 67,
      term: "Hygroscopic",
      definition: "Absorbs water from air but does not dissolve (surface adsorption).",
      example: "Silica gel, CaCl₂, NaOH pellets.",
      tip: "Used as desiccants (drying agents)."
    },
    {
      id: 68,
      term: "Deliquescent",
      definition: "Absorbs so much water from air that it dissolves completely.",
      example: "CaCl₂, NaOH, KOH, MgCl₂.",
      tip: "Deliquescent substances form solutions when exposed to air."
    },
    {
      id: 69,
      term: "Efflorescent",
      definition: "Loses water of crystallization to air, forming powder.",
      example: "Na₂CO₃·10H₂O → Na₂CO₃ + 10H₂O (white powder).",
      tip: "Hydrated salts can effloresce in dry air."
    },
    {
      id: 70,
      term: "Titration",
      definition: "Quantitative technique to determine unknown concentration.",
      example: "Using NaOH to titrate HCl with phenolphthalein indicator.",
      tip: "Equivalence point = moles acid = moles base."
    },
    // ORGANIC CHEMISTRY (71-85)
    {
      id: 71,
      term: "Organic Chemistry",
      definition: "Study of carbon-containing compounds (excluding simple oxides, carbonates).",
      example: "Hydrocarbons (C,H), alcohols, acids, polymers.",
      tip: "Carbon can form 4 bonds (tetravalent)."
    },
    {
      id: 72,
      term: "Hydrocarbon",
      definition: "Compound containing only carbon and hydrogen.",
      example: "Methane (CH₄), ethane (C₂H₆), ethene (C₂H₄), benzene (C₆H₆).",
      tip: "Major component of fossil fuels."
    },
    {
      id: 73,
      term: "Alkanes",
      definition: "Saturated hydrocarbons with only single bonds; general formula CₙH₂ₙ₊₂.",
      example: "Methane (CH₄), ethane (C₂H₆), propane (C₃H₈).",
      tip: "Alkanes are relatively unreactive; undergo combustion and substitution."
    },
    {
      id: 74,
      term: "Alkenes",
      definition: "Unsaturated hydrocarbons with at least one C=C double bond; formula CₙH₂ₙ.",
      example: "Ethene (C₂H₄), propene (C₃H₆).",
      tip: "Alkenes undergo addition reactions; decolorize bromine water."
    },
    {
      id: 75,
      term: "Alkynes",
      definition: "Unsaturated hydrocarbons with at least one C≡C triple bond; formula CₙH₂ₙ₋₂.",
      example: "Ethyne (C₂H₂), propyne (C₃H₄).",
      tip: "Ethyne (acetylene) used in welding."
    },
    {
      id: 76,
      term: "Functional Group",
      definition: "Specific atom or group determining chemical properties.",
      example: "Alcohol (-OH), carboxylic acid (-COOH), amine (-NH₂), aldehyde (-CHO), ketone (C=O).",
      tip: "Compounds with same functional group react similarly."
    },
    {
      id: 77,
      term: "Alcohols",
      definition: "Contain -OH (hydroxyl) group; general formula CₙH₂ₙ₊₁OH.",
      example: "Methanol (CH₃OH), ethanol (C₂H₅OH).",
      tip: "Primary, secondary, tertiary based on C attached to OH."
    },
    {
      id: 78,
      term: "Aldehydes",
      definition: "Contain -CHO group (carbonyl at end).",
      example: "Methanal (HCHO), ethanal (CH₃CHO).",
      tip: "Aldehydes are easily oxidized to carboxylic acids."
    },
    {
      id: 79,
      term: "Ketones",
      definition: "Contain C=O group (carbonyl in middle).",
      example: "Propanone (CH₃COCH₃) - acetone.",
      tip: "Ketones are resistant to oxidation."
    },
    {
      id: 80,
      term: "Carboxylic Acids",
      definition: "Contain -COOH group.",
      example: "Methanoic acid (HCOOH), ethanoic acid (CH₃COOH).",
      tip: "Weak acids; react with alcohols to form esters (esterification)."
    },
    {
      id: 81,
      term: "Esters",
      definition: "Formed from alcohol + carboxylic acid (esterification).",
      example: "Ethyl ethanoate (CH₃COOC₂H₅) - fruity smell.",
      tip: "Used in perfumes, flavors, solvents."
    },
    {
      id: 82,
      term: "Polymers",
      definition: "Large molecules made of repeating monomer units.",
      example: "Polyethene (plastic), proteins (amino acids), DNA (nucleotides).",
      tip: "Addition polymers (alkenes); condensation polymers (with byproduct)."
    },
    {
      id: 83,
      term: "Cracking",
      definition: "Breaking large hydrocarbons into smaller, more useful ones.",
      example: "C₁₀H₂₂ → C₅H₁₂ + C₅H₁₀ (thermal or catalytic).",
      tip: "Catalytic cracking uses zeolite catalyst at ~500°C."
    },
    {
      id: 84,
      term: "Polymerization",
      definition: "Process of forming polymers from monomers.",
      example: "n C₂H₄ → (C₂H₄)ₙ (polyethene).",
      tip: "Addition: monomers add without byproduct; condensation: with byproduct (H₂O, HCl)."
    },
    {
      id: 85,
      term: "Fermentation",
      definition: "Conversion of sugar to ethanol by yeast.",
      example: "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.",
      tip: "Used in alcoholic beverages, biofuel production."
    },
    // ENVIRONMENTAL CHEMISTRY (86-100)
    {
      id: 86,
      term: "Air Pollution",
      definition: "Presence of harmful substances in air.",
      example: "CO (vehicle exhaust), SO₂ (industrial), NOₓ (combustion), particulates.",
      tip: "Causes respiratory illness, acid rain, global warming."
    },
    {
      id: 87,
      term: "Greenhouse Effect",
      definition: "Trapping of heat by gases in atmosphere (CO₂, CH₄, H₂O).",
      example: "CO₂ from burning fossil fuels traps heat.",
      tip: "Enhanced greenhouse effect leads to global warming."
    },
    {
      id: 88,
      term: "Ozone Layer Depletion",
      definition: "Destruction of stratospheric ozone (O₃) by CFCs.",
      example: "CFCs from refrigerants, aerosols rise and release chlorine.",
      tip: "Ozone hole over Antarctica; Montreal Protocol phased out CFCs."
    },
    {
      id: 89,
      term: "Acid Rain",
      definition: "Rain with pH < 5.6 from SO₂ and NOₓ dissolving in water.",
      example: "SO₂ + H₂O → H₂SO₃ (sulfurous acid); further oxidized to H₂SO₄.",
      tip: "Damages buildings (limestone), forests, aquatic life."
    },
    {
      id: 90,
      term: "Water Pollution",
      definition: "Contamination of water bodies by harmful substances.",
      example: "Industrial waste, sewage, agricultural runoff, oil spills.",
      tip: "Eutrophication: excess nutrients cause algal blooms, oxygen depletion."
    },
    {
      id: 91,
      term: "Biodegradable",
      definition: "Substance that can be broken down by microorganisms.",
      example: "Food waste, paper, untreated cotton.",
      tip: "Non-biodegradable: plastics, glass, metals (persist in environment)."
    },
    {
      id: 92,
      term: "Hard Water",
      definition: "Water containing dissolved Ca²⁺ and Mg²⁺ salts.",
      example: "Does not lather well with soap; forms scum.",
      tip: "Temporary hardness (bicarbonates) removed by boiling; permanent (sulfates, chlorides) by ion exchange."
    },
    {
      id: 93,
      term: "Soft Water",
      definition: "Water with low Ca²⁺ and Mg²⁺ concentration.",
      example: "Rainwater, distilled water.",
      tip: "Lathers easily with soap; preferred for laundry."
    },
    {
      id: 94,
      term: "Fertilizers",
      definition: "Substances added to soil to supply essential nutrients.",
      example: "NPK fertilizer: Nitrogen (N) for growth, Phosphorus (P) for roots, Potassium (K) for health.",
      tip: "Overuse leads to eutrophication of water bodies."
    },
    {
      id: 95,
      term: "Pesticides",
      definition: "Chemicals used to kill pests (insects, weeds, fungi).",
      example: "DDT (banned), organophosphates, glyphosate.",
      tip: "Can harm beneficial organisms and bioaccumulate in food chain."
    },
    {
      id: 96,
      term: "Green Chemistry",
      definition: "Design of chemical products/processes reducing hazardous substances.",
      example: "Using renewable feedstocks, less toxic solvents, energy efficiency.",
      tip: "Principles: prevention, atom economy, safer solvents, energy efficiency."
    },
    {
      id: 97,
      term: "Radioactive Waste",
      definition: "Waste containing radioactive isotopes.",
      example: "Nuclear reactor waste, medical isotopes.",
      tip: "High-level waste requires long-term storage (geological disposal)."
    },
    {
      id: 98,
      term: "Eutrophication",
      definition: "Excess nutrients (nitrates, phosphates) causing algal blooms and oxygen depletion.",
      example: "From fertilizer runoff, sewage discharge.",
      tip: "Leads to dead zones in lakes and coastal areas."
    },
    {
      id: 99,
      term: "Biomagnification",
      definition: "Increase in concentration of pollutants up the food chain.",
      example: "DDT in water → plankton → small fish → large fish → birds (eggshell thinning).",
      tip: "Top predators have highest concentrations."
    },
    {
      id: 100,
      term: "Sustainable Chemistry",
      definition: "Chemistry practices that meet present needs without compromising future.",
      example: "Recycling, renewable feedstocks, energy efficiency, waste reduction.",
      tip: "Part of circular economy: reduce, reuse, recycle."
    }
  ],

  // ============================================================================
  // BIOLOGY (100 cards) - Based on JAMB Biology syllabus [citation:1][citation:8]
  // ============================================================================
  biology: [
    // CELL BIOLOGY (1-15)
    {
      id: 1,
      term: "Cell",
      definition: "Basic structural and functional unit of all living organisms.",
      example: "Humans have billions of cells: skin cells, blood cells, nerve cells.",
      tip: "Cells are 'building blocks of life'."
    },
    {
      id: 2,
      term: "Prokaryotic Cell",
      definition: "Cell without nucleus or membrane-bound organelles.",
      example: "Bacteria and archaea.",
      tip: "Smaller, simpler, DNA in nucleoid region."
    },
    {
      id: 3,
      term: "Eukaryotic Cell",
      definition: "Cell with nucleus and membrane-bound organelles.",
      example: "Animal cells, plant cells, fungi, protists.",
      tip: "Larger, more complex than prokaryotes."
    },
    {
      id: 4,
      term: "Cell Membrane",
      definition: "Selectively permeable barrier surrounding cell.",
      example: "Controls entry/exit of substances.",
      tip: "Fluid mosaic model: phospholipid bilayer with proteins."
    },
    {
      id: 5,
      term: "Nucleus",
      definition: "Control center containing DNA.",
      example: "Stores genetic information; directs protein synthesis.",
      tip: "Contains nucleolus (ribosome production) and nuclear pores."
    },
    {
      id: 6,
      term: "Mitochondria",
      definition: "Powerhouse of cell; site of cellular respiration (ATP production).",
      example: "Cells with high energy needs have many mitochondria (muscle, nerve).",
      tip: "Has own DNA; double membrane (cristae increase surface area)."
    },
    {
      id: 7,
      term: "Chloroplast",
      definition: "Site of photosynthesis in plant cells.",
      example: "Converts light energy to chemical energy (glucose).",
      tip: "Contains chlorophyll (green pigment); has own DNA."
    },
    {
      id: 8,
      term: "Ribosomes",
      definition: "Site of protein synthesis.",
      example: "Free in cytoplasm or attached to rough ER.",
      tip: "Made of rRNA and protein; no membrane."
    },
    {
      id: 9,
      term: "Endoplasmic Reticulum (ER)",
      definition: "Membrane system for synthesis and transport.",
      example: "Rough ER (ribosomes) makes proteins; Smooth ER makes lipids.",
      tip: "Smooth ER also detoxifies and stores calcium."
    },
    {
      id: 10,
      term: "Golgi Apparatus",
      definition: "Modifies, sorts, and packages proteins for transport.",
      example: "Proteins from ER modified, packaged into vesicles.",
      tip: "Secretory vesicles carry proteins to cell membrane for export."
    },
    {
      id: 11,
      term: "Lysosomes",
      definition: "Contain digestive enzymes to break down waste.",
      example: "Destroy pathogens, recycle old organelles.",
      tip: "Called 'suicide bags' (can digest cell if ruptured)."
    },
    {
      id: 12,
      term: "Vacuole",
      definition: "Storage organelle for water, nutrients, waste.",
      example: "Plant cells have large central vacuole for water storage and turgor pressure.",
      tip: "Contractile vacuole in protists expels excess water."
    },
    {
      id: 13,
      term: "Cell Wall",
      definition: "Rigid outer layer providing support and protection.",
      example: "Plant cell wall: cellulose; bacterial: peptidoglycan; fungal: chitin.",
      tip: "Not present in animal cells."
    },
    {
      id: 14,
      term: "Diffusion",
      definition: "Passive movement from high to low concentration.",
      example: "Oxygen entering cells, CO₂ leaving.",
      tip: "No energy required (passive transport)."
    },
    {
      id: 15,
      term: "Osmosis",
      definition: "Diffusion of water across semi-permeable membrane.",
      example: "Water moving into/out of cells.",
      tip: "Hypotonic: water enters (cell swells); hypertonic: water leaves (cell shrinks)."
    },
    // GENETICS (16-30)
    {
      id: 16,
      term: "DNA",
      definition: "Deoxyribonucleic acid; genetic material.",
      example: "Double helix structure; stores genetic code.",
      tip: "Complementary base pairing: A-T, G-C."
    },
    {
      id: 17,
      term: "RNA",
      definition: "Ribonucleic acid; involved in protein synthesis.",
      example: "mRNA (messenger), tRNA (transfer), rRNA (ribosomal).",
      tip: "Single-stranded; U replaces T (A-U, G-C)."
    },
    {
      id: 18,
      term: "Gene",
      definition: "Segment of DNA coding for specific protein or trait.",
      example: "Gene for eye color, blood type.",
      tip: "Humans have ~20,000 genes."
    },
    {
      id: 19,
      term: "Chromosome",
      definition: "Thread-like structure of DNA and protein.",
      example: "Humans have 46 chromosomes (23 pairs).",
      tip: "22 pairs autosomes, 1 pair sex chromosomes (XX female, XY male)."
    },
    {
      id: 20,
      term: "Genotype",
      definition: "Genetic makeup of organism (alleles present).",
      example: "TT (homozygous dominant), Tt (heterozygous), tt (homozygous recessive).",
      tip: "Genotype determines potential traits."
    },
    {
      id: 21,
      term: "Phenotype",
      definition: "Physical expression of genotype.",
      example: "Tall plant (TT or Tt), short plant (tt).",
      tip: "Phenotype influenced by environment and genotype."
    },
    {
      id: 22,
      term: "Dominant Allele",
      definition: "Allele that is expressed when present (masks recessive).",
      example: "T (tall) dominant over t (short).",
      tip: "Represented by capital letter."
    },
    {
      id: 23,
      term: "Recessive Allele",
      definition: "Allele only expressed when two copies present.",
      example: "tt = short plant (both alleles recessive).",
      tip: "Represented by lowercase letter."
    },
    {
      id: 24,
      term: "Mendel's First Law (Segregation)",
      definition: "Alleles separate during gamete formation.",
      example: "Tt plant produces T and t gametes in equal proportion.",
      tip: "Explains 3:1 ratio in monohybrid cross."
    },
    {
      id: 25,
      term: "Mendel's Second Law (Independent Assortment)",
      definition: "Genes for different traits segregate independently.",
      example: "Seed shape and color inherited separately.",
      tip: "Only true for genes on different chromosomes."
    },
    {
      id: 26,
      term: "Punnett Square",
      definition: "Diagram predicting offspring genotypes.",
      example: "Tt × Tt: TT (25%), Tt (50%), tt (25%) → 3:1 phenotypic ratio.",
      tip: "Tool for visualizing inheritance patterns."
    },
    {
      id: 27,
      term: "Incomplete Dominance",
      definition: "Heterozygote shows intermediate phenotype.",
      example: "Red (RR) × White (WW) → Pink (RW).",
      tip: "No dominant/recessive; blending occurs."
    },
    {
      id: 28,
      term: "Codominance",
      definition: "Both alleles fully expressed in heterozygote.",
      example: "AB blood type (A and B both expressed).",
      tip: "Neither allele dominates; both contribute."
    },
    {
      id: 29,
      term: "Mutation",
      definition: "Change in DNA sequence.",
      example: "Sickle cell anemia (point mutation); Down syndrome (chromosomal).",
      tip: "Can be harmful, neutral, or beneficial (evolution)."
    },
    {
      id: 30,
      term: "Evolution",
      definition: "Change in allele frequencies in population over time.",
      example: "Antibiotic resistance in bacteria.",
      tip: "Driven by natural selection, mutation, gene flow, genetic drift."
    },
    // ECOLOGY (31-45)
    {
      id: 31,
      term: "Ecology",
      definition: "Study of interactions between organisms and environment.",
      example: "Food webs, nutrient cycles, population dynamics.",
      tip: "Levels: organism → population → community → ecosystem → biome → biosphere."
    },
    {
      id: 32,
      term: "Population",
      definition: "Group of same species in same area.",
      example: "All lions in Serengeti.",
      tip: "Population size changes with birth, death, immigration, emigration."
    },
    {
      id: 33,
      term: "Community",
      definition: "All populations of different species in same area.",
      example: "Forest community: trees, birds, insects, fungi.",
      tip: "Interactions: competition, predation, symbiosis."
    },
    {
      id: 34,
      term: "Ecosystem",
      definition: "Community + abiotic (non-living) environment.",
      example: "Pond ecosystem: water, soil, plants, fish, bacteria.",
      tip: "Energy flows; matter cycles."
    },
    {
      id: 35,
      term: "Habitat",
      definition: "Place where organism lives.",
      example: "Forest habitat for monkeys; pond habitat for frogs.",
      tip: "Habitat provides food, water, shelter, space."
    },
    {
      id: 36,
      term: "Niche",
      definition: "Organism's role in ecosystem (job + habitat).",
      example: "Bee's niche: pollinates flowers, makes honey, food source for birds.",
      tip: "Two species cannot occupy same niche (competitive exclusion)."
    },
    {
      id: 37,
      term: "Food Chain",
      definition: "Linear sequence of who eats whom.",
      example: "Grass → Grasshopper → Frog → Snake → Eagle.",
      tip: "Energy flows one direction; lost as heat at each level."
    },
    {
      id: 38,
      term: "Food Web",
      definition: "Interconnected food chains in ecosystem.",
      example: "Multiple pathways showing all feeding relationships.",
      tip: "More stable than simple food chain."
    },
    {
      id: 39,
      term: "Trophic Level",
      definition: "Position in food chain (producer, primary consumer, etc.).",
      example: "Producers (plants) → primary consumers (herbivores) → secondary consumers (carnivores).",
      tip: "Energy decreases at each level (10% transferred, 90% lost)."
    },
    {
      id: 40,
      term: "Producer (Autotroph)",
      definition: "Makes own food via photosynthesis or chemosynthesis.",
      example: "Plants, algae, cyanobacteria.",
      tip: "Base of all food chains."
    },
    {
      id: 41,
      term: "Consumer (Heterotroph)",
      definition: "Eats other organisms for energy.",
      example: "Herbivores (plants), carnivores (meat), omnivores (both).",
      tip: "Cannot make own food."
    },
    {
      id: 42,
      term: "Decomposer",
      definition: "Breaks down dead matter, recycling nutrients.",
      example: "Bacteria, fungi.",
      tip: "Essential for nutrient cycling."
    },
    {
      id: 43,
      term: "Symbiosis",
      definition: "Close, long-term interaction between species.",
      example: "Mutualism (+/+), commensalism (+/0), parasitism (+/-).",
      tip: "Parasitism: one benefits, other harmed."
    },
    {
      id: 44,
      term: "Nitrogen Cycle",
      definition: "Movement of nitrogen through environment.",
      example: "Nitrogen fixation (bacteria) → nitrification → assimilation → ammonification → denitrification.",
      tip: "Essential for proteins and nucleic acids."
    },
    {
      id: 45,
      term: "Carbon Cycle",
      definition: "Movement of carbon through environment.",
      example: "Photosynthesis (CO₂ to glucose), respiration (glucose to CO₂), combustion, decomposition.",
      tip: "Human activity (fossil fuel burning) increases atmospheric CO₂."
    },
    // HUMAN PHYSIOLOGY (46-65)
    {
      id: 46,
      term: "Homeostasis",
      definition: "Maintenance of stable internal environment.",
      example: "Body temperature (37°C), blood pH (7.35-7.45), blood glucose.",
      tip: "Negative feedback loops maintain balance."
    },
    {
      id: 47,
      term: "Digestive System",
      definition: "Breaks down food into absorbable nutrients.",
      example: "Mouth (mechanical) → esophagus → stomach (chemical) → small intestine (absorption) → large intestine (water).",
      tip: "Enzymes catalyze breakdown: amylase (starch), protease (protein), lipase (fat)."
    },
    {
      id: 48,
      term: "Respiratory System",
      definition: "Gas exchange: O₂ in, CO₂ out.",
      example: "Nose → trachea → bronchi → bronchioles → alveoli.",
      tip: "Alveoli are site of gas exchange (large surface area, thin walls, capillaries)."
    },
    {
      id: 49,
      term: "Circulatory System",
      definition: "Transports O₂, nutrients, hormones, waste.",
      example: "Heart pumps blood through arteries (away), veins (toward), capillaries (exchange).",
      tip: "Red blood cells carry O₂ (hemoglobin); white blood cells fight infection."
    },
    {
      id: 50,
      term: "Nervous System",
      definition: "Controls and coordinates body functions.",
      example: "Brain (control center), spinal cord (pathway), nerves.",
      tip: "Neurons transmit electrical signals (action potentials)."
    },
    {
      id: 51,
      term: "Endocrine System",
      definition: "Hormone-based regulation (slower than nervous).",
      example: "Pituitary (master gland), thyroid (metabolism), pancreas (insulin/glucagon).",
      tip: "Hormones are chemical messengers in blood."
    },
    {
      id: 52,
      term: "Excretory System",
      definition: "Removes metabolic wastes.",
      example: "Kidneys filter blood → ureters → bladder → urethra (urine).",
      tip: "Also skin (sweat), lungs (CO₂), liver (bile)."
    },
    {
      id: 53,
      term: "Heart Structure",
      definition: "Four-chambered muscular pump.",
      example: "Right atrium → right ventricle (to lungs); left atrium → left ventricle (to body).",
      tip: "Left ventricle has thicker wall (pumps to whole body)."
    },
    {
      id: 54,
      term: "Blood Vessels",
      definition: "Arteries (away from heart), veins (toward heart), capillaries (exchange).",
      example: "Arteries: thick walls, high pressure; veins: valves prevent backflow.",
      tip: "Capillaries: one cell thick, site of exchange."
    },
    {
      id: 55,
      term: "Brain Lobes",
      definition: "Frontal (decision, movement), parietal (sensory), temporal (hearing, memory), occipital (vision).",
      example: "Frontal lobe damage affects personality.",
      tip: "Cerebellum coordinates balance and movement."
    },
    // DISEASES & IMMUNITY (66-80)
    {
      id: 66,
      term: "Pathogen",
      definition: "Disease-causing microorganism.",
      example: "Bacteria (TB, cholera), viruses (flu, COVID), fungi (ringworm), protists (malaria).",
      tip: "Antibiotics work against bacteria, not viruses."
    },
    {
      id: 67,
      term: "Immune System",
      definition: "Defends against pathogens.",
      example: "White blood cells (phagocytes engulf; lymphocytes produce antibodies).",
      tip: "Vaccines stimulate immune memory without causing disease."
    },
    {
      id: 68,
      term: "Antigen",
      definition: "Molecule that triggers immune response.",
      example: "Surface proteins on bacteria, viruses, pollen.",
      tip: "Antibodies bind specifically to antigens."
    },
    {
      id: 69,
      term: "Antibody",
      definition: "Protein produced by B lymphocytes to neutralize pathogens.",
      example: "IgG, IgM, IgA, IgE, IgD.",
      tip: "Y-shaped; each binds specific antigen."
    },
    {
      id: 70,
      term: "Vaccination",
      definition: "Administration of antigen to produce immunity.",
      example: "Polio vaccine, measles vaccine, COVID vaccine.",
      tip: "Herd immunity protects vulnerable populations."
    },
    // REPRODUCTION (81-95)
    {
      id: 81,
      term: "Mitosis",
      definition: "Cell division producing two identical daughter cells (growth, repair).",
      example: "Skin cells divide to replace dead cells.",
      tip: "Stages: prophase, metaphase, anaphase, telophase (PMAT)."
    },
    {
      id: 82,
      term: "Meiosis",
      definition: "Cell division producing four genetically different gametes (sex cells).",
      example: "Sperm and egg production.",
      tip: "Reduces chromosome number by half (diploid → haploid)."
    },
    {
      id: 83,
      term: "Fertilization",
      definition: "Fusion of male and female gametes.",
      example: "Sperm + egg → zygote.",
      tip: "Restores diploid number; determines sex (XX or XY)."
    },
    {
      id: 84,
      term: "Pregnancy",
      definition: "Development of embryo/fetus in uterus.",
      example: "Implantation → embryo → fetus (8 weeks) → birth (~40 weeks).",
      tip: "Placenta provides O₂, nutrients, removes waste."
    },
    // BIOTECHNOLOGY (96-100)
    {
      id: 96,
      term: "Genetic Engineering",
      definition: "Direct manipulation of DNA.",
      example: "Insulin production in bacteria, GMO crops.",
      tip: "CRISPR-Cas9 is precise gene editing tool."
    },
    {
      id: 97,
      term: "Cloning",
      definition: "Creating genetically identical copy.",
      example: "Dolly the sheep (somatic cell nuclear transfer).",
      tip: "Therapeutic cloning: produce stem cells for treatment."
    },
    {
      id: 98,
      term: "GMO (Genetically Modified Organism)",
      definition: "Organism with foreign DNA inserted.",
      example: "Bt corn (insect resistant), golden rice (vitamin A).",
      tip: "Controversial due to safety, environmental, ethical concerns."
    },
    {
      id: 99,
      term: "Stem Cells",
      definition: "Undifferentiated cells that can become specialized.",
      example: "Embryonic stem cells (pluripotent), adult stem cells (multipotent).",
      tip: "Potential for regenerative medicine (repair damaged tissues)."
    },
    {
      id: 100,
      term: "Bioinformatics",
      definition: "Using computers to analyze biological data.",
      example: "DNA sequencing analysis, protein structure prediction.",
      tip: "Essential for genomics and personalized medicine."
    }
  ],

  // ============================================================================
  // ECONOMICS (100 cards) - Based on JAMB Economics syllabus [citation:9]
  // ============================================================================
  economics: [
    // BASIC CONCEPTS (1-10)
    {
      id: 1,
      term: "Economics",
      definition: "Study of how society allocates scarce resources to satisfy unlimited wants.",
      example: "Deciding how to use oil: fuel, plastics, heating.",
      tip: "Scarcity is fundamental problem."
    },
    {
      id: 2,
      term: "Scarcity",
      definition: "Limited resources vs unlimited wants.",
      example: "Not enough time, money, oil, water to do everything.",
      tip: "Scarcity forces choice."
    },
    {
      id: 3,
      term: "Opportunity Cost",
      definition: "Value of next best alternative given up.",
      example: "Choosing to study means giving up time with friends.",
      tip: "There's no free lunch."
    },
    {
      id: 4,
      term: "Factors of Production",
      definition: "Resources used to produce goods: Land, Labor, Capital, Entrepreneurship.",
      example: "Land (natural resources), Labor (workers), Capital (machines, tools), Entrepreneurship (management).",
      tip: "Rent (land), wages (labor), interest (capital), profit (entrepreneurship)."
    },
    {
      id: 5,
      term: "Land",
      definition: "Natural resources used in production.",
      example: "Oil, minerals, forests, water, land itself.",
      tip: "Reward: rent."
    },
    {
      id: 6,
      term: "Labor",
      definition: "Human effort (physical and mental) used in production.",
      example: "Factory workers, teachers, doctors.",
      tip: "Reward: wages/salary."
    },
    {
      id: 7,
      term: "Capital",
      definition: "Man-made goods used to produce other goods.",
      example: "Machinery, tools, buildings, computers.",
      tip: "Reward: interest."
    },
    {
      id: 8,
      term: "Entrepreneurship",
      definition: "Organizing other factors, bearing risk, making decisions.",
      example: "Business owner, CEO.",
      tip: "Reward: profit (or loss)."
    },
    {
      id: 9,
      term: "Production Possibility Frontier (PPF)",
      definition: "Maximum combinations of two goods an economy can produce with full employment.",
      example: "Guns vs butter trade-off.",
      tip: "Points inside PPF = inefficient; outside = unattainable."
    },
    {
      id: 10,
      term: "Economic Systems",
      definition: "How society answers: what, how, for whom to produce.",
      example: "Capitalism (market), socialism (planned), mixed (both).",
      tip: "Most economies are mixed."
    },
    // DEMAND & SUPPLY (11-25)
    {
      id: 11,
      term: "Demand",
      definition: "Quantity buyers are willing and able to buy at various prices.",
      example: "Lower price → higher quantity demanded.",
      tip: "Law of demand: inverse relationship with price."
    },
    {
      id: 12,
      term: "Law of Demand",
      definition: "Price increases → quantity demanded decreases (ceteris paribus).",
      example: "Higher price, people buy less.",
      tip: "Substitution and income effects explain."
    },
    {
      id: 13,
      term: "Supply",
      definition: "Quantity sellers are willing and able to sell at various prices.",
      example: "Higher price → higher quantity supplied.",
      tip: "Law of supply: direct relationship with price."
    },
    {
      id: 14,
      term: "Equilibrium Price",
      definition: "Price where quantity demanded = quantity supplied.",
      example: "Market clearing price; no surplus or shortage.",
      tip: "Disequilibrium causes price adjustment."
    },
    {
      id: 15,
      term: "Price Elasticity of Demand",
      definition: "Responsiveness of quantity demanded to price change.",
      example: "Elastic (>1): luxury goods; inelastic (<1): necessities (insulin).",
      tip: "PED = %ΔQd / %ΔP."
    },
    {
      id: 16,
      term: "Elastic Demand",
      definition: "Quantity demanded changes significantly with price.",
      example: "Restaurant meals, branded clothing.",
      tip: "Many substitutes → more elastic."
    },
    {
      id: 17,
      term: "Inelastic Demand",
      definition: "Quantity demanded changes little with price.",
      example: "Gasoline, electricity, insulin.",
      tip: "Few substitutes, necessities → inelastic."
    },
    {
      id: 18,
      term: "Income Elasticity of Demand",
      definition: "Responsiveness to income change.",
      example: "Normal goods (positive); inferior goods (negative).",
      tip: "YED = %ΔQd / %ΔY."
    },
    {
      id: 19,
      term: "Normal Goods",
      definition: "Demand increases as income increases.",
      example: "Restaurant meals, travel, new cars.",
      tip: "Income elasticity > 0."
    },
    {
      id: 20,
      term: "Inferior Goods",
      definition: "Demand decreases as income increases.",
      example: "Instant noodles, used cars, bus travel.",
      tip: "Income elasticity < 0."
    },
    {
      id: 21,
      term: "Substitute Goods",
      definition: "Goods used in place of each other.",
      example: "Coke and Pepsi, tea and coffee.",
      tip: "Price of one up → demand for other up."
    },
    {
      id: 22,
      term: "Complementary Goods",
      definition: "Goods used together.",
      example: "Cars and gasoline, printers and ink.",
      tip: "Price of one up → demand for other down."
    },
    {
      id: 23,
      term: "Consumer Surplus",
      definition: "Difference between what consumers are willing to pay and actual price.",
      example: "Willing to pay ₦50, pay ₦30 → surplus ₦20.",
      tip: "Area under demand curve above price."
    },
    {
      id: 24,
      term: "Producer Surplus",
      definition: "Difference between actual price and minimum acceptable price.",
      example: "Willing to sell for ₦20, receive ₦30 → surplus ₦10.",
      tip: "Area above supply curve below price."
    },
    {
      id: 25,
      term: "Price Ceiling",
      definition: "Maximum legal price (below equilibrium).",
      example: "Rent control causes shortage.",
      tip: "Creates excess demand."
    },
    // PRODUCTION & COSTS (26-40)
    {
      id: 26,
      term: "Production",
      definition: "Transformation of inputs into outputs.",
      example: "Turning flour, eggs, sugar into bread.",
      tip: "Adds value to resources."
    },
    {
      id: 27,
      term: "Short Run",
      definition: "At least one factor of production is fixed.",
      example: "Factory size fixed; can hire more workers.",
      tip: "Law of diminishing returns applies."
    },
    {
      id: 28,
      term: "Long Run",
      definition: "All factors of production are variable.",
      example: "Can build new factory, buy more machines.",
      tip: "Returns to scale (increasing, constant, decreasing)."
    },
    {
      id: 29,
      term: "Fixed Cost (FC)",
      definition: "Costs that do not change with output.",
      example: "Rent, insurance, salaries, loan interest.",
      tip: "FC incurred even if output = 0."
    },
    {
      id: 30,
      term: "Variable Cost (VC)",
      definition: "Costs that change with output level.",
      example: "Raw materials, wages, electricity.",
      tip: "VC increases as output increases."
    },
    {
      id: 31,
      term: "Total Cost (TC)",
      definition: "FC + VC.",
      example: "TC = ₦1000 (rent) + ₦500 (materials) = ₦1500.",
      tip: "TC increases with output."
    },
    {
      id: 32,
      term: "Average Cost (AC)",
      definition: "TC / Q (cost per unit).",
      example: "TC = ₦1500, Q = 100 units → AC = ₦15/unit.",
      tip: "U-shaped (decreases then increases)."
    },
    {
      id: 33,
      term: "Marginal Cost (MC)",
      definition: "Additional cost of producing one more unit.",
      example: "MC = ΔTC / ΔQ.",
      tip: "MC curve intersects AC at minimum point."
    },
    {
      id: 34,
      term: "Economies of Scale",
      definition: "Long-run average cost decreases as output increases.",
      example: "Bulk purchasing, specialization, technology.",
      tip: "Downward-sloping LRAC curve."
    },
    {
      id: 35,
      term: "Diseconomies of Scale",
      definition: "Long-run average cost increases as output increases.",
      example: "Coordination problems, bureaucracy, communication issues.",
      tip: "Upward-sloping LRAC curve."
    },
    {
      id: 36,
      term: "Law of Diminishing Returns",
      definition: "Adding more of one input (others fixed) eventually yields smaller output increases.",
      example: "Adding more workers to fixed-size factory.",
      tip: "Short-run concept."
    },
    // MARKET STRUCTURES (41-55)
    {
      id: 41,
      term: "Perfect Competition",
      definition: "Many firms, identical products, easy entry/exit, perfect information.",
      example: "Agricultural markets (wheat, corn).",
      tip: "Firms are price takers."
    },
    {
      id: 42,
      term: "Monopoly",
      definition: "Single seller, unique product, barriers to entry.",
      example: "Local water company, electricity distributor.",
      tip: "Price maker; can earn supernormal profit long-run."
    },
    {
      id: 43,
      term: "Monopolistic Competition",
      definition: "Many firms, differentiated products, easy entry/exit.",
      example: "Restaurants, hair salons, clothing brands.",
      tip: "Downward-sloping demand curve."
    },
    {
      id: 44,
      term: "Oligopoly",
      definition: "Few large firms, interdependent decisions.",
      example: "Telecom (MTN, Glo, Airtel), banking.",
      tip: "Game theory (Nash equilibrium)."
    },
    // MARKET FAILURE & GOVERNMENT (56-70)
    {
      id: 56,
      term: "Market Failure",
      definition: "Inefficient allocation of resources by free market.",
      example: "Externalities, public goods, monopoly.",
      tip: "Government intervention may improve."
    },
    {
      id: 57,
      term: "Positive Externality",
      definition: "Beneficial spillover effect on third parties.",
      example: "Education (educated people benefit society), vaccination.",
      tip: "Market under-produces; subsidy can help."
    },
    {
      id: 58,
      term: "Negative Externality",
      definition: "Harmful spillover effect on third parties.",
      example: "Pollution (factory), secondhand smoke.",
      tip: "Market over-produces; tax (Pigouvian) can help."
    },
    {
      id: 59,
      term: "Public Goods",
      definition: "Non-excludable and non-rivalrous.",
      example: "National defense, street lighting, lighthouses.",
      tip: "Free rider problem; government provides."
    },
    // MONEY & BANKING (71-85)
    {
      id: 71,
      term: "Money",
      definition: "Medium of exchange, unit of account, store of value.",
      example: "Naira notes, coins, digital currency.",
      tip: "Functions: exchange, measure, store."
    },
    {
      id: 72,
      term: "Central Bank",
      definition: "Country's main bank; controls monetary policy.",
      example: "Central Bank of Nigeria (CBN).",
      tip: "Functions: lender of last resort, issues currency, regulates banks."
    },
    {
      id: 73,
      term: "Monetary Policy",
      definition: "Central bank actions to control money supply and interest rates.",
      example: "Changing interest rates, reserve requirements, open market operations.",
      tip: "Expansionary (stimulate) vs contractionary (control inflation)."
    },
    {
      id: 74,
      term: "Inflation",
      definition: "Sustained increase in general price level.",
      example: "₦100 buys less today than last year.",
      tip: "Demand-pull (too much demand) or cost-push (higher costs)."
    },
    {
      id: 75,
      term: "Deflation",
      definition: "Sustained decrease in general price level.",
      example: "Prices falling (bad for economy, encourages waiting).",
      tip: "Can lead to recession (deflationary spiral)."
    },
    // INTERNATIONAL TRADE (86-100)
    {
      id: 86,
      term: "Absolute Advantage",
      definition: "Country produces more of good with same resources.",
      example: "Nigeria produces more oil than Ghana.",
      tip: "Produce where absolute advantage exists."
    },
    {
      id: 87,
      term: "Comparative Advantage",
      definition: "Country produces at lower opportunity cost.",
      example: "Even if absolute advantage in both, specialize in comparative.",
      tip: "Basis for international trade."
    },
    {
      id: 88,
      term: "Balance of Trade",
      definition: "Exports - Imports (goods only).",
      example: "Trade surplus (exports > imports); trade deficit (imports > exports).",
      tip: "Surplus favorable, deficit unfavorable."
    },
    {
      id: 89,
      term: "Balance of Payments",
      definition: "Record of all transactions between country and rest of world.",
      example: "Current account (goods, services, income) + capital/financial account.",
      tip: "Must balance (surplus/deficit offset)."
    },
    {
      id: 90,
      term: "Exchange Rate",
      definition: "Price of one currency in terms of another.",
      example: "₦1,500 = $1 USD.",
      tip: "Depreciation (₦ weaker), appreciation (₦ stronger)."
    },
    {
      id: 91,
      term: "Tariff",
      definition: "Tax on imported goods.",
      example: "25% tariff on imported cars.",
      tip: "Protects domestic industry, raises revenue, but raises prices."
    },
    {
      id: 92,
      term: "Quota",
      definition: "Physical limit on quantity of imports.",
      example: "Only 10,000 cars can be imported per year.",
      tip: "Restricts supply, raises prices."
    },
    {
      id: 93,
      term: "Subsidy",
      definition: "Government payment to domestic producers.",
      example: "Farming subsidy, export subsidy.",
      tip: "Lowers production cost, increases supply."
    },
    {
      id: 94,
      term: "Economic Integration",
      definition: "Countries reducing trade barriers between them.",
      example: "Free trade area (no tariffs), customs union (common external tariff), common market (free movement labor/capital).",
      tip: "ECOWAS (Economic Community of West African States)."
    },
    {
      id: 95,
      term: "Globalization",
      definition: "Increasing interconnectedness of economies.",
      example: "Global supply chains, multinational corporations, international capital flows.",
      tip: "Benefits: growth, lower prices; challenges: inequality, job loss."
    },
    // DEVELOPMENT ECONOMICS (96-100)
    {
      id: 96,
      term: "GDP (Gross Domestic Product)",
      definition: "Total value of goods/services produced within country's borders.",
      example: "C + I + G + (X-M).",
      tip: "Real GDP adjusted for inflation; nominal GDP current prices."
    },
    {
      id: 97,
      term: "GNI (Gross National Income)",
      definition: "GDP + income from abroad - income sent abroad.",
      example: "Includes profits from Nigerian companies overseas.",
      tip: "Better measure of national income for some countries."
    },
    {
      id: 98,
      term: "Economic Development",
      definition: "Broader than growth; includes health, education, quality of life.",
      example: "HDI (Human Development Index): life expectancy, education, income.",
      tip: "Growth without development possible (unequal distribution)."
    },
    {
      id: 99,
      term: "Unemployment",
      definition: "People willing and able to work but cannot find jobs.",
      example: "Frictional (between jobs), structural (skills mismatch), cyclical (recession).",
      tip: "Natural rate includes frictional + structural."
    },
    {
      id: 100,
      term: "Poverty",
      definition: "Lack of sufficient income/resources to meet basic needs.",
      example: "Absolute poverty (below $2.15/day), relative poverty (below societal average).",
      tip: "Causes: unemployment, low education, inequality, corruption."
    }
  ],

  // ============================================================================
  // ACCOUNTING (60 cards) - Based on JAMB Principles of Accounts syllabus [citation:5]
  // ============================================================================
  accounting: [
    {
      id: 1,
      term: "Bookkeeping",
      definition: "Systematic recording of financial transactions.",
      example: "Recording sales, purchases, payments in journals.",
      tip: "Bookkeeping is the foundation; accounting is broader (analysis, interpretation)."
    },
    {
      id: 2,
      term: "Accounting",
      definition: "Process of identifying, measuring, recording, classifying, summarizing, interpreting financial information.",
      example: "Preparing financial statements, analyzing performance.",
      tip: "Accounting communicates financial information to users."
    },
    {
      id: 3,
      term: "Double Entry System",
      definition: "Every transaction affects at least two accounts (debit and credit).",
      example: "Buying equipment: debit Equipment (asset), credit Cash (asset).",
      tip: "Total debits = total credits."
    },
    {
      id: 4,
      term: "Assets",
      definition: "Resources owned by business with future economic value.",
      example: "Cash, inventory, buildings, equipment, accounts receivable.",
      tip: "Assets = what business OWNS."
    },
    {
      id: 5,
      term: "Liabilities",
      definition: "Debts or obligations owed to others.",
      example: "Bank loans, accounts payable, mortgages.",
      tip: "Liabilities = what business OWES."
    },
    {
      id: 6,
      term: "Owner's Equity (Capital)",
      definition: "Owner's claim on business assets after liabilities paid.",
      example: "Equity = Assets - Liabilities.",
      tip: "Increases: profit, capital contribution; decreases: drawings, loss."
    },
    {
      id: 7,
      term: "Accounting Equation",
      definition: "Assets = Liabilities + Owner's Equity.",
      example: "If assets ₦100,000, liabilities ₦40,000 → equity ₦60,000.",
      tip: "Must always balance."
    },
    {
      id: 8,
      term: "Journal",
      definition: "Book of original entry; records transactions in chronological order.",
      example: "Sales journal, purchases journal, cash book, general journal.",
      tip: "Each entry has date, accounts, debit, credit, narration."
    },
    {
      id: 9,
      term: "Ledger",
      definition: "Book containing all accounts (T-accounts).",
      example: "Cash ledger, sales ledger (customers), purchases ledger (suppliers).",
      tip: "Posting: transferring journal entries to ledger accounts."
    },
    {
      id: 10,
      term: "Trial Balance",
      definition: "List of all ledger balances; tests arithmetic accuracy.",
      example: "Total debits = total credits.",
      tip: "Trial balance can balance even with errors (omission, wrong account)."
    },
    {
      id: 11,
      term: "Cash Book",
      definition: "Records all cash and bank transactions.",
      example: "Cash receipts (debit), cash payments (credit).",
      tip: "Two-column (cash, bank) or three-column (+ discount)."
    },
    {
      id: 12,
      term: "Petty Cash Book",
      definition: "Records small, routine cash payments.",
      example: "Tea, postage, stationery.",
      tip: "Imprest system: float restored to fixed amount."
    },
    {
      id: 13,
      term: "Bank Reconciliation Statement",
      definition: "Explains difference between cash book balance and bank statement.",
      example: "Unpresented cheques, uncredited deposits, bank charges.",
      tip: "Prepared to identify errors and timing differences."
    },
    {
      id: 14,
      term: "Unpresented Cheques",
      definition: "Cheques issued but not yet presented to bank.",
      example: "Recorded in cash book, not yet on bank statement.",
      tip: "Subtract from bank statement balance in reconciliation."
    },
    {
      id: 15,
      term: "Uncredited Deposits",
      definition: "Deposits made but not yet recorded by bank.",
      example: "Deposit made after bank cutoff time.",
      tip: "Add to bank statement balance in reconciliation."
    },
    {
      id: 16,
      term: "Suspense Account",
      definition: "Temporary account for difference in trial balance or unidentified items.",
      example: "Trial balance off by ₦500 → put in suspense.",
      tip: "Cleared when errors identified and corrected."
    },
    {
      id: 17,
      term: "Control Accounts",
      definition: "Summary accounts checking subsidiary ledger accuracy.",
      example: "Sales ledger control (total debtors), purchases ledger control (total creditors).",
      tip: "Control account balance = sum of individual subsidiary balances."
    },
    {
      id: 18,
      term: "Depreciation",
      definition: "Allocation of fixed asset cost over useful life.",
      example: "Machine ₦100,000, 5 years → ₦20,000/year (straight line).",
      tip: "Methods: straight line, reducing balance, units of production."
    },
    {
      id: 19,
      term: "Straight Line Depreciation",
      definition: "Equal annual depreciation: (Cost - Salvage Value) / Useful Life.",
      example: "Cost ₦100,000, salvage ₦10,000, 5 years → ₦18,000/year.",
      tip: "Simple; appropriate for assets with even benefit over life."
    },
    {
      id: 20,
      term: "Reducing Balance Depreciation",
      definition: "Fixed percentage applied to net book value each year.",
      example: "Cost ₦100,000, rate 20%: Year 1 ₦20,000, Year 2 ₦16,000.",
      tip: "Higher depreciation early; suitable for vehicles, computers."
    },
    {
      id: 21,
      term: "Bad Debts",
      definition: "Amounts owed by customers that are unlikely to be collected.",
      example: "Customer bankrupt, cannot be found.",
      tip: "Written off as expense in profit and loss account."
    },
    {
      id: 22,
      term: "Provision for Doubtful Debts",
      definition: "Estimate of future bad debts (prudence concept).",
      example: "2% of debtors estimated as doubtful.",
      tip: "Reduces debtors on balance sheet; expense in profit and loss."
    },
    {
      id: 23,
      term: "Trading Account",
      definition: "Calculates gross profit: Sales - Cost of Goods Sold.",
      example: "Sales ₦500,000, COGS ₦300,000 → gross profit ₦200,000.",
      tip: "First section of income statement."
    },
    {
      id: 24,
      term: "Cost of Goods Sold (COGS)",
      definition: "Direct cost of goods sold during period.",
      example: "Opening stock + Purchases - Closing stock.",
      tip: "Also includes carriage inwards, less returns outward."
    },
    {
      id: 25,
      term: "Profit and Loss Account",
      definition: "Calculates net profit: Gross Profit - Expenses + Other Income.",
      example: "Gross profit ₦200,000 - expenses ₦120,000 = net profit ₦80,000.",
      tip: "Shows operating performance over period."
    },
    {
      id: 26,
      term: "Balance Sheet",
      definition: "Snapshot of assets, liabilities, equity at specific date.",
      example: "As at 31 December 2023.",
      tip: "Assets = Liabilities + Equity."
    },
    {
      id: 27,
      term: "Current Assets",
      definition: "Assets expected to convert to cash within one year.",
      example: "Cash, debtors, stock, prepayments.",
      tip: "Listed in order of liquidity (cash last)."
    },
    {
      id: 28,
      term: "Current Liabilities",
      definition: "Debts due within one year.",
      example: "Creditors, overdraft, accruals, short-term loans.",
      tip: "Working capital = current assets - current liabilities."
    },
    {
      id: 29,
      term: "Non-Current Assets",
      definition: "Assets used in business for more than one year.",
      example: "Land, buildings, machinery, vehicles.",
      tip: "Shown at cost less accumulated depreciation (NBV)."
    },
    {
      id: 30,
      term: "Non-Current Liabilities",
      definition: "Debts due after more than one year.",
      example: "Long-term loans, mortgages, debentures.",
      tip: "Also called long-term liabilities."
    },
    {
      id: 31,
      term: "Working Capital",
      definition: "Current Assets - Current Liabilities.",
      example: "CA ₦200,000, CL ₦150,000 → WC ₦50,000.",
      tip: "Positive WC indicates ability to pay short-term debts."
    },
    {
      id: 32,
      term: "Partnership Accounts",
      definition: "Accounting for business owned by 2-20 partners.",
      example: "Partners share profits per agreement (ratio, salary, interest).",
      tip: "Appropriation account shows profit distribution."
    },
    {
      id: 33,
      term: "Goodwill",
      definition: "Intangible asset representing reputation, customer loyalty, brand value.",
      example: "Paying premium for established business.",
      tip: "Only recorded when purchased (not internally generated)."
    },
    {
      id: 34,
      term: "Revaluation Account",
      definition: "Records changes in asset values on partnership admission/retirement.",
      example: "Asset revalued up (credit revaluation), down (debit).",
      tip: "Profit/loss shared among old partners."
    },
    {
      id: 35,
      term: "Realisation Account",
      definition: "Used during partnership dissolution to close assets/liabilities.",
      example: "Assets transferred (debit), sold (credit).",
      tip: "Profit/loss on realisation shared among partners."
    },
    {
      id: 36,
      term: "Company Accounts",
      definition: "Accounting for limited liability companies.",
      example: "Share capital, share premium, retained earnings.",
      tip: "Separate legal entity from shareholders."
    },
    {
      id: 37,
      term: "Share Capital",
      definition: "Funds raised by issuing shares.",
      example: "Authorized (maximum), issued (sold), called-up (requested), paid-up (received).",
      tip: "Ordinary shares (voting, variable dividend) and preference shares (fixed dividend)."
    },
    {
      id: 38,
      term: "Share Premium",
      definition: "Excess received over nominal value of shares.",
      example: "Shares ₦1 nominal, issued at ₦1.50 → premium ₦0.50 per share.",
      tip: "Capital reserve (cannot distribute as dividend)."
    },
    {
      id: 39,
      term: "Retained Earnings",
      definition: "Cumulative profits not distributed as dividends.",
      example: "Profit ₦100,000, dividend ₦30,000 → retained ₦70,000.",
      tip: "Revenue reserve (can distribute as dividend)."
    },
    {
      id: 40,
      term: "Dividends",
      definition: "Distribution of profit to shareholders.",
      example: "Interim (during year), final (after year end).",
      tip: "Paid from retained earnings, not share capital."
    },
    {
      id: 41,
      term: "Manufacturing Account",
      definition: "Calculates cost of goods manufactured.",
      example: "Raw materials + Direct labor + Factory overhead ± WIP.",
      tip: "Used by manufacturing businesses (not trading)."
    },
    {
      id: 42,
      term: "Prime Cost",
      definition: "Direct materials + Direct labor + Direct expenses.",
      example: "Raw materials ₦100,000 + labor ₦80,000 + expenses ₦20,000 = ₦200,000.",
      tip: "Direct costs only (traceable to product)."
    },
    {
      id: 43,
      term: "Factory Overhead",
      definition: "Indirect manufacturing costs.",
      example: "Factory rent, supervisor salaries, depreciation, electricity.",
      tip: "Added to prime cost to get total production cost."
    },
    {
      id: 44,
      term: "Work in Progress (WIP)",
      definition: "Partially completed goods at period end.",
      example: "Goods started but not finished.",
      tip: "Adjusted in manufacturing account: + opening WIP - closing WIP."
    },
    {
      id: 45,
      term: "Public Sector Accounting",
      definition: "Accounting for government and public entities.",
      example: "Consolidated Revenue Fund, budget, appropriation.",
      tip: "Focus on accountability, not profit."
    },
    {
      id: 46,
      term: "Consolidated Revenue Fund",
      definition: "Main government account receiving all revenues.",
      example: "Taxes, fees, grants, loans paid into CRF.",
      tip: "Most government expenditures paid from CRF."
    },
    {
      id: 47,
      term: "Appropriation Act",
      definition: "Law authorizing government to withdraw funds from CRF.",
      example: "Annual budget approved by legislature.",
      tip: "No spending without appropriation."
    },
    {
      id: 48,
      term: "Value Added Tax (VAT)",
      definition: "Consumption tax on goods and services.",
      example: "7.5% VAT in Nigeria (some items exempt).",
      tip: "Business collects from customers, remits to government."
    },
    {
      id: 49,
      term: "Withholding Tax (WHT)",
      definition: "Tax deducted at source on specified payments.",
      example: "Interest, dividends, rent, contract payments.",
      tip: "Advance payment of income tax."
    },
    {
      id: 50,
      term: "Stock Valuation Methods",
      definition: "Determining value of closing inventory.",
      example: "FIFO (first-in-first-out), LIFO (last-in-first-out, not allowed IFRS), weighted average.",
      tip: "Affects COGS and profit."
    },
    {
      id: 51,
      term: "FIFO (First-In-First-Out)",
      definition: "Oldest stock used/sold first.",
      example: "During rising prices, FIFO gives higher profit, higher closing stock.",
      tip: "Common in perishable goods."
    },
    {
      id: 52,
      term: "Weighted Average Cost",
      definition: "Average cost of all units available.",
      example: "Total cost of purchases ÷ total units.",
      tip: "Smooths out price fluctuations."
    },
    {
      id: 53,
      term: "Accruals Concept",
      definition: "Transactions recorded when incurred, not when cash exchanged.",
      example: "Accrued salaries, prepaid rent.",
      tip: "Matches income/expenses to correct period."
    },
    {
      id: 54,
      term: "Prudence Concept",
      definition: "Conservatism: recognize losses immediately, gains only when realized.",
      example: "Provision for doubtful debts, write down obsolete stock.",
      tip: "Assets not overstated, liabilities not understated."
    },
    {
      id: 55,
      term: "Consistency Concept",
      definition: "Same accounting methods used year to year.",
      example: "Same depreciation method, same stock valuation.",
      tip: "Allows comparison between periods."
    },
    {
      id: 56,
      term: "Materiality Concept",
      definition: "Only significant items need separate disclosure.",
      example: "Small wastebasket expensed (not capitalized).",
      tip: "Immaterial items can be treated simply."
    },
    {
      id: 57,
      term: "Business Entity Concept",
      definition: "Business separate from owner's personal finances.",
      example: "Owner's drawings separate from business expenses.",
      tip: "Essential for limited liability."
    },
    {
      id: 58,
      term: "Going Concern Concept",
      definition: "Business assumed to continue operating indefinitely.",
      example: "Assets at cost less depreciation, not liquidation value.",
      tip: "If not going concern, different accounting basis needed."
    },
    {
      id: 59,
      term: "Matching Concept",
      definition: "Expenses matched with revenue they helped generate.",
      example: "Depreciation matched with revenue over asset life.",
      tip: "Ensures accurate period profit calculation."
    },
    {
      id: 60,
      term: "Realization Concept",
      definition: "Revenue recognized when goods delivered or service performed.",
      example: "Sale recorded when goods shipped, not when cash received.",
      tip: "Revenue not recognized until earned."
    }
  ],

  // ============================================================================
  // GOVERNMENT (50 cards) - Based on JAMB Government syllabus [citation:5][citation:8]
  // ============================================================================
  government: [
    {
      id: 1,
      term: "Government",
      definition: "Institution through which state exercises power and authority.",
      example: "Executive, legislature, judiciary.",
      tip: "Also refers to the group in power."
    },
    {
      id: 2,
      term: "State",
      definition: "Political organization with population, territory, government, sovereignty.",
      example: "Nigeria, USA, France.",
      tip: "Must have recognition from other states."
    },
    {
      id: 3,
      term: "Sovereignty",
      definition: "Supreme authority within territory; independence from external control.",
      example: "Nigeria makes own laws, not subject to other countries.",
      tip: "Internal (within) and external (international) sovereignty."
    },
    {
      id: 4,
      term: "Democracy",
      definition: "Government by the people, exercised through voting.",
      example: "Nigeria, USA, UK.",
      tip: "Features: periodic elections, universal suffrage, majority rule, minority rights."
    },
    {
      id: 5,
      term: "Constitution",
      definition: "Supreme law of the land; sets out government structure, powers, citizen rights.",
      example: "1999 Constitution of Nigeria.",
      tip: "Written (single document) or unwritten (UK)."
    },
    {
      id: 6,
      term: "Federalism",
      definition: "Division of powers between central and regional governments.",
      example: "Nigeria has federal, state, local governments.",
      tip: "Features: written constitution, supremacy of constitution, bicameral legislature (often)."
    },
    {
      id: 7,
      term: "Unitary Government",
      definition: "Central government holds all power; regional governments derive authority from center.",
      example: "UK, France, China.",
      tip: "Central government can create or abolish local units."
    },
    {
      id: 8,
      term: "Separation of Powers",
      definition: "Division of government into three branches: executive, legislature, judiciary.",
      example: "President (executive), National Assembly (legislature), courts (judiciary).",
      tip: "Prevents concentration of power."
    },
    {
      id: 9,
      term: "Checks and Balances",
      definition: "Each branch has power to limit other branches.",
      example: "President vetoes law; legislature impeaches president; court declares law unconstitutional.",
      tip: "Maintains balance between branches."
    },
    {
      id: 10,
      term: "Rule of Law",
      definition: "Everyone subject to law; no one above law.",
      example: "Government officials also accountable to law.",
      tip: "Principles: supremacy of law, equality before law, individual rights."
    },
    {
      id: 11,
      term: "Citizenship",
      definition: "Legal status with rights and duties.",
      example: "Right to vote, duty to pay taxes.",
      tip: "By birth (jus sanguinis, jus soli) or naturalization."
    },
    {
      id: 12,
      term: "Political Party",
      definition: "Organization seeking to gain power through elections.",
      example: "APC, PDP in Nigeria; Democrats, Republicans in USA.",
      tip: "Functions: interest aggregation, candidate selection, political education."
    },
    {
      id: 13,
      term: "Electoral System",
      definition: "Rules for conducting elections and translating votes into seats.",
      example: "First-past-the-post (UK, USA), proportional representation, mixed.",
      tip: "Nigeria uses first-past-the-post for presidential/legislative."
    },
    {
      id: 14,
      term: "Universal Adult Suffrage",
      definition: "All adult citizens right to vote regardless of property, education, gender, race.",
      example: "Nigeria: 18+ can vote.",
      tip: "Key feature of modern democracy."
    },
    {
      id: 15,
      term: "Executive Arm",
      definition: "Implements and enforces laws.",
      example: "President (chief executive), ministers, civil service.",
      tip: "Functions: policy implementation, foreign affairs, defense."
    },
    {
      id: 16,
      term: "Legislative Arm",
      definition: "Makes laws; represents citizens.",
      example: "National Assembly: Senate and House of Representatives.",
      tip: "Also approves budget, confirms appointments, oversight."
    },
    {
      id: 17,
      term: "Judicial Arm",
      definition: "Interprets laws; administers justice.",
      example: "Supreme Court, Court of Appeal, High Courts.",
      tip: "Independent judiciary essential for rule of law."
    },
    {
      id: 18,
      term: "Local Government",
      definition: "Government at local level (third tier in Nigeria).",
      example: "Local government councils.",
      tip: "Functions: primary education, health centers, markets, waste collection."
    },
    {
      id: 19,
      term: "Public Administration",
      definition: "Implementation of government policies by civil service.",
      example: "Ministries, departments, agencies.",
      tip: "Bureaucracy: hierarchical, rule-based, specialized."
    },
    {
      id: 20,
      term: "Civil Service",
      definition: "Permanent, professional body implementing government policies.",
      example: "Ministry of Education staff.",
      tip: "Neutral, anonymous, permanent (survives government changes)."
    },
    {
      id: 21,
      term: "Pre-Colonial Nigeria",
      definition: "Period before British colonization; various empires and kingdoms.",
      example: "Hausa states, Kanem-Bornu, Oyo Empire, Benin Kingdom.",
      tip: "Each had own political systems."
    },
    {
      id: 22,
      term: "Colonial Nigeria",
      definition: "Period of British rule (1900-1960).",
      example: "Amalgamation of Northern and Southern Nigeria (1914).",
      tip: "Indirect rule: British governed through traditional rulers."
    },
    {
      id: 23,
      term: "Nationalism",
      definition: "Movement for independence from colonial rule.",
      example: "NCNC (Nnamdi Azikiwe), Action Group (Obafemi Awolowo), NPC (Ahmadu Bello).",
      tip: "Led to independence in 1960."
    },
    {
      id: 24,
      term: "Nigeria Independence",
      definition: "October 1, 1960 - Nigeria became self-governing.",
      example: "Tafawa Balewa first Prime Minister; Nnamdi Azikiwe Governor-General.",
      tip: "Republic declared in 1963 (Azikiwe first President)."
    },
    {
      id: 25,
      term: "Military Rule in Nigeria",
      definition: "Periods when military controlled government (1966-1979, 1983-1999).",
      example: "Generals Gowon, Murtala Mohammed, Obasanjo, Buhari, Babangida, Abacha, Abubakar.",
      tip: "Returned to democracy in 1999."
    },
    {
      id: 26,
      term: "Fourth Republic",
      definition: "Current democratic era (1999-present).",
      example: "Presidents: Obasanjo, Yar'Adua, Jonathan, Buhari, Tinubu.",
      tip: "Based on 1999 Constitution."
    },
    {
      id: 27,
      term: "Political Parties in Nigeria",
      definition: "Major parties in Fourth Republic.",
      example: "PDP (People's Democratic Party), APC (All Progressives Congress), LP (Labour Party).",
      tip: "APC currently ruling party."
    },
    {
      id: 28,
      term: "Foreign Policy",
      definition: "Government's strategy in international relations.",
      example: "Nigeria's 'Africa as centerpiece' policy.",
      tip: "Key roles: ECOWAS, AU, UN peacekeeping."
    },
    {
      id: 29,
      term: "ECOWAS",
      definition: "Economic Community of West African States (founded 1975).",
      example: "15 member states promoting economic integration.",
      tip: "ECOMOG peacekeeping force (Liberia, Sierra Leone)."
    },
    {
      id: 30,
      term: "African Union (AU)",
      definition: "Continental organization (successor to OAU).",
      example: "Promotes unity, development, peace in Africa.",
      tip: "Based in Addis Ababa, Ethiopia."
    },
    {
      id: 31,
      term: "United Nations (UN)",
      definition: "Global organization for international peace and security.",
      example: "Nigeria joined 1960.",
      tip: "Security Council has 5 permanent members (US, UK, France, Russia, China)."
    },
    {
      id: 32,
      term: "OPEC",
      definition: "Organization of Petroleum Exporting Countries.",
      example: "Nigeria joined 1971.",
      tip: "Coordinates oil production and prices."
    },
    {
      id: 33,
      term: "Commonwealth",
      definition: "Voluntary association of former British colonies.",
      example: "Nigeria member (rejoined 1999 after suspension).",
      tip: "British monarch symbolic head."
    },
    {
      id: 34,
      term: "Citizen's Rights",
      definition: "Legal entitlements protected by constitution.",
      example: "Right to life, dignity, fair hearing, vote, free speech.",
      tip: "Some rights can be limited for public order."
    },
    {
      id: 35,
      term: "Citizen's Duties",
      definition: "Legal obligations to the state.",
      example: "Pay taxes, obey laws, defend nation, vote.",
      tip: "Duties essential for functioning society."
    },
    {
      id: 36,
      term: "Judicial Review",
      definition: "Court power to declare laws unconstitutional.",
      example: "Supreme Court striking down invalid law.",
      tip: "Key check on legislative/executive power."
    },
    {
      id: 37,
      term: "Presidential System",
      definition: "Executive separate from legislature; president elected directly.",
      example: "Nigeria, USA.",
      tip: "Fixed terms; president cannot dissolve legislature."
    },
    {
      id: 38,
      term: "Parliamentary System",
      definition: "Executive chosen from legislature; prime minister and cabinet.",
      example: "UK, Canada, India.",
      tip: "Prime minister can dissolve parliament; no fixed term."
    },
    {
      id: 39,
      term: "Political Ideologies",
      definition: "System of beliefs about politics and society.",
      example: "Democracy, socialism, communism, fascism.",
      tip: "Shape views on role of government, equality, freedom."
    },
    {
      id: 40,
      term: "Pressure Group",
      definition: "Organization seeking to influence policy without seeking office.",
      example: "Trade unions, business associations, environmental groups.",
      tip: "Use lobbying, protests, media campaigns."
    },
    {
      id: 41,
      term: "Public Opinion",
      definition: "Collective attitudes of citizens on political issues.",
      example: "Polling on government performance, policies.",
      tip: "Influenced by media, education, experience."
    },
    {
      id: 42,
      term: "Mass Media",
      definition: "Communication channels reaching large audiences.",
      example: "Television, radio, newspapers, social media.",
      tip: "Functions: inform, educate, entertain, watchdog."
    },
    {
      id: 43,
      term: "Lobbying",
      definition: "Attempting to influence government decisions.",
      example: "Meeting legislators, campaign contributions, advocacy.",
      tip: "Regulated in many countries (transparency)."
    },
    {
      id: 44,
      term: "Election",
      definition: "Process of choosing representatives through voting.",
      example: "Presidential election, legislative election, local election.",
      tip: "Free and fair elections essential for democracy."
    },
    {
      id: 45,
      term: "Referendum",
      definition: "Direct vote on specific policy question.",
      example: "Constitutional amendments, independence votes.",
      tip: "Form of direct democracy."
    },
    {
      id: 46,
      term: "Recall",
      definition: "Process to remove elected official before term ends.",
      example: "Citizens petition triggering new election.",
      tip: "Available in some states/countries, not in Nigeria nationally."
    },
    {
      id: 47,
      term: "INEC",
      definition: "Independent National Electoral Commission of Nigeria.",
      example: "Organizes federal and state elections.",
      tip: "Responsible for voter registration, polling, results."
    },
    {
      id: 48,
      term: "Civil Society",
      definition: "Organizations outside government and business.",
      example: "NGOs, community groups, religious organizations.",
      tip: "Advocates for citizens, holds government accountable."
    },
    {
      id: 49,
      term: "Human Rights",
      definition: "Basic rights and freedoms all humans possess.",
      example: "Right to life, liberty, expression, assembly.",
      tip: "Universal Declaration of Human Rights (1948)."
    },
    {
      id: 50,
      term: "Corruption",
      definition: "Abuse of public office for private gain.",
      example: "Bribery, embezzlement, nepotism, fraud.",
      tip: "Anti-corruption agencies: EFCC, ICPC in Nigeria."
    }
  ],

  // ============================================================================
  // LITERATURE (40 cards) - Based on JAMB Literature syllabus [citation:1][citation:8]
  // ============================================================================
  literature: [
    {
      id: 1,
      term: "Literature",
      definition: "Written works, especially those of artistic merit.",
      example: "Novels, poetry, plays, short stories.",
      tip: "Genres: prose, poetry, drama."
    },
    {
      id: 2,
      term: "Prose",
      definition: "Written or spoken language in ordinary form (not poetry).",
      example: "Novels, short stories, essays.",
      tip: "Fiction (imaginary) or non-fiction (factual)."
    },
    {
      id: 3,
      term: "Poetry",
      definition: "Literary form using aesthetic and rhythmic qualities of language.",
      example: "Sonnets, haiku, free verse, epic poems.",
      tip: "Uses meter, rhyme, imagery, figurative language."
    },
    {
      id: 4,
      term: "Drama",
      definition: "Literature intended for performance (plays).",
      example: "Tragedy, comedy, tragicomedy, melodrama.",
      tip: "Elements: dialogue, stage directions, acts, scenes."
    },
    {
      id: 5,
      term: "Plot",
      definition: "Sequence of events in a story.",
      example: "Exposition → rising action → climax → falling action → resolution.",
      tip: "Plot is WHAT happens."
    },
    {
      id: 6,
      term: "Character",
      definition: "Person, animal, or figure in literary work.",
      example: "Protagonist (main), antagonist (opponent), round (complex), flat (simple).",
      tip: "Characterization: how author reveals character traits."
    },
    {
      id: 7,
      term: "Setting",
      definition: "Time and place where story occurs.",
      example: "Lagos in the 1990s, a futuristic spaceship.",
      tip: "Setting creates mood, influences characters, affects plot."
    },
    {
      id: 8,
      term: "Theme",
      definition: "Central message or insight about life.",
      example: "Love, justice, coming of age, good vs evil.",
      tip: "Theme is the deeper meaning, not just story events."
    },
    {
      id: 9,
      term: "Conflict",
      definition: "Struggle between opposing forces.",
      example: "Person vs person, person vs self, person vs nature, person vs society.",
      tip: "Conflict drives plot forward."
    },
    {
      id: 10,
      term: "Point of View (POV)",
      definition: "Perspective from which story is told.",
      example: "First person (I), second person (you), third person (he/she/they).",
      tip: "Third person: omniscient (knows all), limited (one character), objective (only actions)."
    },
    {
      id: 11,
      term: "Narrator",
      definition: "Voice telling the story.",
      example: "Reliable (trustworthy) vs unreliable (misleading).",
      tip: "Narrator not same as author."
    },
    {
      id: 12,
      term: "Tone",
      definition: "Author's attitude toward subject.",
      example: "Serious, humorous, sarcastic, formal, informal, critical.",
      tip: "Tone affects reader's interpretation."
    },
    {
      id: 13,
      term: "Mood",
      definition: "Emotional atmosphere created for reader.",
      example: "Horror (scary), suspense (tense), joyful (happy), melancholic (sad).",
      tip: "Mood is how reader feels; tone is author's attitude."
    },
    {
      id: 14,
      term: "Simile",
      definition: "Comparison using 'like' or 'as'.",
      example: "She is as brave as a lion. He runs like the wind.",
      tip: "Compares two different things."
    },
    {
      id: 15,
      term: "Metaphor",
      definition: "Direct comparison stating one thing IS another.",
      example: "The world is a stage. Time is a thief.",
      tip: "Does not use 'like' or 'as'."
    },
    {
      id: 16,
      term: "Personification",
      definition: "Giving human qualities to non-human things.",
      example: "The wind whispered. The sun smiled.",
      tip: "Makes descriptions vivid and engaging."
    },
    {
      id: 17,
      term: "Hyperbole",
      definition: "Extreme exaggeration for effect.",
      example: "I've told you a million times. I'm so hungry I could eat a horse.",
      tip: "Not meant literally."
    },
    {
      id: 18,
      term: "Irony",
      definition: "Contrast between expectation and reality.",
      example: "Fire station burning down. Saying 'great weather' during storm.",
      tip: "Types: verbal (saying opposite), situational (events), dramatic (audience knows more)."
    },
    {
      id: 19,
      term: "Symbolism",
      definition: "Object representing deeper meaning.",
      example: "Dove = peace; rose = love; chains = freedom.",
      tip: "Adds layers of meaning."
    },
    {
      id: 20,
      term: "Imagery",
      definition: "Language appealing to senses.",
      example: "Golden sun over sparkling blue ocean. Sweet scent of flowers.",
      tip: "Creates vivid mental pictures."
    },
    {
      id: 21,
      term: "Alliteration",
      definition: "Repetition of initial consonant sounds.",
      example: "Peter picked pickled peppers. She sells sea shells.",
      tip: "Creates rhythm and emphasis."
    },
    {
      id: 22,
      term: "Assonance",
      definition: "Repetition of vowel sounds within words.",
      example: "The rain in Spain falls mainly on the plain.",
      tip: "Creates internal rhyme."
    },
    {
      id: 23,
      term: "Onomatopoeia",
      definition: "Word that imitates sound.",
      example: "Buzz, hiss, boom, crackle, splash.",
      tip: "Adds auditory dimension."
    },
    {
      id: 24,
      term: "Foreshadowing",
      definition: "Hints about future events.",
      example: "Dark clouds before tragedy. Ominous dream.",
      tip: "Creates suspense."
    },
    {
      id: 25,
      term: "Flashback",
      definition: "Interruption showing past event.",
      example: "Looking at photo triggers childhood memory.",
      tip: "Provides background information."
    },
    {
      id: 26,
      term: "Satire",
      definition: "Using humor, irony, exaggeration to criticize.",
      example: "Animal Farm (criticizes communism).",
      tip: "Aims to provoke change."
    },
    {
      id: 27,
      term: "Allegory",
      definition: "Story with hidden political/moral meaning.",
      example: "Animal Farm (Russian Revolution). The Pilgrim's Progress.",
      tip: "Characters/symbols represent abstract ideas."
    },
    {
      id: 28,
      term: "Tragedy",
      definition: "Drama with protagonist's downfall (often tragic hero).",
      example: "Shakespeare's Hamlet, Macbeth, King Lear.",
      tip: "Arouses pity and fear (catharsis)."
    },
    {
      id: 29,
      term: "Comedy",
      definition: "Light-hearted drama with happy ending.",
      example: "Shakespeare's A Midsummer Night's Dream, Twelfth Night.",
      tip: "Often involves mistaken identity, wordplay."
    },
    {
      id: 30,
      term: "Tragic Hero",
      definition: "Protagonist with fatal flaw (hamartia) leading to downfall.",
      example: "Oedipus (pride), Macbeth (ambition).",
      tip: "Arouses audience pity."
    },
    {
      id: 31,
      term: "Soliloquy",
      definition: "Character speaking thoughts aloud (alone on stage).",
      example: "Hamlet's 'To be or not to be'.",
      tip: "Reveals inner thoughts."
    },
    {
      id: 32,
      term: "Monologue",
      definition: "Long speech by one character (others present).",
      example: "Character explaining situation to others.",
      tip: "Different from soliloquy (others present)."
    },
    {
      id: 33,
      term: "Aside",
      definition: "Character's comment to audience (other characters not hear).",
      example: "Character whispering true thoughts while others speak.",
      tip: "Breaks fourth wall."
    },
    {
      id: 34,
      term: "Dramatic Irony",
      definition: "Audience knows more than characters.",
      example: "Audience knows Juliet not dead, Romeo does not.",
      tip: "Creates tension."
    },
    {
      id: 35,
      term: "Prose Fiction",
      definition: "Imaginary narrative written in prose.",
      example: "Novels, novellas, short stories.",
      tip: "Elements: plot, character, setting, theme, point of view."
    },
    {
      id: 36,
      term: "Novel",
      definition: "Long work of prose fiction.",
      example: "Things Fall Apart (Achebe), Purple Hibiscus (Adichie).",
      tip: "Usually 200+ pages."
    },
    {
      id: 37,
      term: "Short Story",
      definition: "Brief prose fiction (usually 1,000-20,000 words).",
      example: "The Tell-Tale Heart (Poe), The Gift of the Magi (Henry).",
      tip: "Focuses on single incident or character."
    },
    {
      id: 38,
      term: "African Literature",
      definition: "Literature from African continent and diaspora.",
      example: "Chinua Achebe, Wole Soyinka (Nobel 1986), Ngũgĩ wa Thiong'o.",
      tip: "Themes: colonialism, independence, tradition vs modernity, identity."
    },
    {
      id: 39,
      term: "Nigerian Literature",
      definition: "Literature from Nigeria (English, Yoruba, Hausa, Igbo).",
      example: "Achebe (Things Fall Apart), Soyinka (The Lion and the Jewel), Adichie (Half of a Yellow Sun).",
      tip: "Four generations: pre-independence, independence, post-civil war, contemporary."
    },
    {
      id: 40,
      term: "Oral Literature",
      definition: "Literature transmitted verbally (before writing).",
      example: "Folktales, myths, legends, proverbs, riddles, epic poetry.",
      tip: "Features: formulaic phrases, repetition, call-and-response."
    }
  ],

  // ============================================================================
  // DEFAULT FLASHCARDS for subjects without custom content
  // ============================================================================
  default: [
    {
      id: 1,
      term: "Study Tip: Active Recall",
      definition: "Testing yourself instead of just re-reading.",
      example: "Cover the answer and try to remember before revealing.",
      tip: "One of the most effective study methods!"
    },
    {
      id: 2,
      term: "Study Tip: Spaced Repetition",
      definition: "Reviewing at increasing intervals over time.",
      example: "Review today, tomorrow, then 3 days, then a week.",
      tip: "Helps move information to long-term memory."
    },
    {
      id: 3,
      term: "Study Tip: Pomodoro Technique",
      definition: "Study in focused 25-minute blocks with 5-minute breaks.",
      example: "25 min study → 5 min break → repeat. Long break after 4 cycles.",
      tip: "Prevents burnout and improves focus."
    },
    {
      id: 4,
      term: "Exam Strategy: JAMB Structure",
      definition: "180 multiple-choice questions in 2 hours.",
      example: "English (60 questions) + 3 other subjects (40 each).",
      tip: "Answer easier questions first, flag difficult ones."
    },
    {
      id: 5,
      term: "Exam Strategy: Time Management",
      definition: "Allocate time per question and stick to it.",
      example: "2 hours = 120 minutes for 180 questions ≈ 40 seconds per question.",
      tip: "Don't spend too long on one question."
    },
    {
      id: 6,
      term: "Exam Strategy: Eliminate Wrong Answers",
      definition: "Remove obviously wrong options to improve guessing odds.",
      example: "5 options → eliminate 2 → 1 in 3 chance (vs 1 in 5).",
      tip: "Even educated guessing improves scores."
    },
    {
      id: 7,
      term: "JAMB Scoring",
      definition: "Each question worth equal marks; no negative marking.",
      example: "Answer all questions; no penalty for wrong answers.",
      tip: "Never leave a question blank."
    },
    {
      id: 8,
      term: "CBT Tips",
      definition: "Computer-Based Test strategies.",
      example: "Practice with CBT apps before exam day.",
      tip: "Use 'Next' and 'Previous' buttons; flag questions."
    },
    {
      id: 9,
      term: "Health for Exams",
      definition: "Physical and mental preparation.",
      example: "Get enough sleep, eat well, stay hydrated.",
      tip: "Arrive early to reduce stress."
    },
    {
      id: 10,
      term: "JAMB Syllabus",
      definition: "Official document listing exam topics.",
      example: "Available for each subject on JAMB website.",
      tip: "Use syllabus to focus your study."
    }
  ]
};

// Helper function to get flashcards for a subject
export const getFlashcardsForSubject = (subjectId) => {
  if (FLASHCARDS[subjectId] && FLASHCARDS[subjectId].length > 0) {
    return FLASHCARDS[subjectId];
  }
  return FLASHCARDS.default;
};
