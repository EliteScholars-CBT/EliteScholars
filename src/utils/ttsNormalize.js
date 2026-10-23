// Turns study text into something a speech engine reads the way a teacher would.
// Pure functions, no DOM. The SAME normalized sentence array is used for both
// speaking and highlighting, so the two can never drift apart.

const ABBREV = /\b(e\.g|i\.e|etc|vs|approx|Mr|Mrs|Dr|Prof|No|Fig|St)\.$/i;

export function splitIntoSentences(text) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  const raw = clean.replace(/([.!?])\s+(?=[A-Z0-9"'(\[])/g, '$1\u0001').split('\u0001');
  const out = [];
  for (const part of raw) {
    if (out.length && ABBREV.test(out[out.length - 1])) {
      out[out.length - 1] += ' ' + part;
    } else {
      out.push(part);
    }
  }
  return out.map((s) => s.trim()).filter(Boolean);
}

// ─────────────────────────────────────────────────────────────────────────────
// Everything below makes the text safe for a speech engine. It was written by scanning the real content
// (all subjects, Learn topics and questions) for what engines get wrong: phonetic symbols in English topics
// (/ʃ/, /uː/), chemical formulas with sub/superscripts (H₂SO₄, SO₄²⁻), units (m/s, kg/m³), Greek letters,
// Nigerian acronyms (WAEC, INEC, CBN), arrows, stress capitals (reCORD), blanks (____), ranges (1990–1995).
// ─────────────────────────────────────────────────────────────────────────────

const NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const SUPMAP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁺': '+', '⁻': '-', 'ⁿ': 'n' };
const SUBMAP = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9', '₊': '+', '₋': '-', 'ₙ': 'n', 'ₐ': 'a', 'ₑ': 'e', 'ₒ': 'o', 'ₓ': 'x', 'ₘ': 'm', 'ₜ': 't', 'ᵢ': 'i', 'ⱼ': 'j' };
const SUPCH = '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿ', SUBCH = '₀₁₂₃₄₅₆₇₈₉₊₋ₙₐₑₒₓₘₜᵢⱼ';
const digitsToWords = (str) => str.replace(/\d/g, (d) => ` ${NUM[Number(d)]} `).replace(/\s+/g, ' ').trim();

// ── phonetic (IPA) symbols → words a learner can follow ──
const IPA_CH = 'ɪʊəɜɔɑæʌŋθðʃʒɛɒɡɹɾʧʤːˈˌ̩̄';
const IPA_DESC = {
  'ʃ': 'sh, as in ship', 'ʒ': 'zh, as in measure', 'θ': 'th, as in think', 'ð': 'th, as in this', 'tʃ': 'ch, as in chair', 'ʧ': 'ch, as in chair',
  'dʒ': 'j, as in judge', 'ʤ': 'j, as in judge', 'ŋ': 'ng, as in sing', 'j': 'y, as in yes', 'uː': 'oo, as in food', 'iː': 'ee, as in see',
  'ɑː': 'ah, as in father', 'ɔː': 'aw, as in thought', 'ɜː': 'er, as in bird', 'ɪ': 'short i, as in sit', 'ʊ': 'short oo, as in put',
  'ə': 'uh, the schwa, as in about', 'æ': 'short a, as in cat', 'ʌ': 'short u, as in cup', 'e': 'short e, as in bed', 'ɛ': 'short e, as in bed', 'ɒ': 'short o, as in hot',
  'eɪ': 'ay, as in day', 'aɪ': 'eye, as in my', 'ɔɪ': 'oy, as in boy', 'əʊ': 'oh, as in go', 'aʊ': 'ow, as in now', 'ɪə': 'ear, as in here',
  'eə': 'air, as in hair', 'ʊə': 'oor, as in tour', 'ɡ': 'g, as in go', 'i': 'ee, as in see', 'u': 'oo, as in food',
};
const IPA_SPELL = [
  ['tʃ', 'ch'], ['dʒ', 'j'], ['eɪ', 'ay'], ['aɪ', 'eye'], ['ɔɪ', 'oy'], ['əʊ', 'oh'], ['aʊ', 'ow'], ['ɪə', 'ear'], ['eə', 'air'], ['ʊə', 'oor'],
  ['uː', 'oo'], ['iː', 'ee'], ['ɑː', 'ah'], ['ɔː', 'aw'], ['ɜː', 'er'], ['ʧ', 'ch'], ['ʤ', 'j'], ['ʃ', 'sh'], ['ʒ', 'zh'], ['θ', 'th'], ['ð', 'th'], ['ŋ', 'ng'],
  ['ɪ', 'ih'], ['ʊ', 'uu'], ['ə', 'uh'], ['æ', 'a'], ['ʌ', 'uh'], ['ɛ', 'eh'], ['ɒ', 'o'], ['ɔ', 'aw'], ['ɑ', 'ah'], ['ɡ', 'g'], ['ɹ', 'r'], ['ɾ', 'd'],
  ['j', 'y'], ['ː', ''], ['ˈ', ''], ['ˌ', ''], ['̩', ''], ['̄', ''],
];
const IPA_MAP = new Map(IPA_SPELL);
const IPA_RE = new RegExp(IPA_SPELL.map(([a]) => a).sort((x, y) => y.length - x.length).join('|'), 'g');
const ipaSpell = (str) => str.replace(IPA_RE, (m) => IPA_MAP.get(m));
const ipaSpeak = (inner) => {
  const bare = inner.replace(/[ˈˌ̩̄]/g, '');
  if (IPA_DESC[bare]) return ` the sound ${IPA_DESC[bare]} `;
  if (/^[a-z]$/i.test(bare)) return ` the ${bare} sound `;
  if (/^[b-df-hj-np-tv-z]{1,2}$/i.test(bare)) return ` the ${bare.toLowerCase()} sound `;
  return ` pronounced ${ipaSpell(bare)} `;
};
function speakPhonetics(s) {
  const IPA_ANY = new RegExp(`[${IPA_CH}]`);
  s = s.replace(/(^|[\s(,;:])\/([A-Za-zÀ-˿̀-ͯ\-ː]{1,14})\/(?=$|[\s),.;:!?])/g, (m, pre, inner) => {
    if (IPA_ANY.test(inner) || /^[a-z]{1,4}$/.test(inner)) return pre + ipaSpeak(inner);
    return m;
  });
  s = s.replace(/\[([^\]\n]{1,24})\]/g, (m, inner) => (IPA_ANY.test(inner) && !/[=+*]/.test(inner) ? ipaSpeak(inner.trim()) : m));
  return s.replace(new RegExp(`[${IPA_CH.replace('θ', '')}]+`, 'g'), (m) => ` ${ipaSpell(m)} `);
}

// ── sub/superscripts: charges, powers, chemical formulas ──
function speakScripts(s) {
  // ion charges: Na⁺  Cl⁻  SO₄²⁻  Fe³⁺
  s = s.replace(new RegExp(`([⁰¹²³⁴⁵⁶⁷⁸⁹]*)([⁺⁻])`, 'g'), (m, d, sign, off, str) => {
    const prev = str[off - 1] || '';
    if (!/[A-Za-z)\]₀-₉]/.test(prev) && !d) return m;
    const n = d ? ` ${digitsToWords([...d].map((c) => SUPMAP[c]).join(''))}` : '';
    return `${n} ${sign === '⁺' ? 'plus' : 'minus'} `;
  });
  // powers: x² x³ m⁻¹ 10⁵ xⁿ
  s = s.replace(new RegExp(`([⁺⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ]+)`, 'g'), (m) => {
    const t = [...m].map((c) => SUPMAP[c] || c).join('');
    if (t === '2') return ' squared ';
    if (t === '3') return ' cubed ';
    const neg = t.startsWith('-') ? 'negative ' : '';
    return ` to the power ${neg}${/^\d+$/.test(t.replace(/^[+-]/, '')) ? digitsToWords(t.replace(/^[+-]/, '')) : t.replace(/^[+-]/, '')} `;
  });
  // subscripts: after a capital letter or bracket it is a chemical count (H₂O → H two O); after a small letter it is "sub" (v₁ → v sub one)
  s = s.replace(new RegExp(`([A-Za-z)\\]]?)([${SUBCH}]+)`, 'g'), (m, prev, run) => {
    const t = [...run].map((c) => SUBMAP[c] || c).join('');
    const w = /^\d+$/.test(t) ? digitsToWords(t) : t;
    const chem = /[A-Z)\]]/.test(prev);
    return `${prev} ${chem ? '' : 'sub '}${w} `;
  });
  s = s.replace(/([ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ]+)/g, (m) => ` to the power ${[...m].map((c) => ({ ᵃ: 'a', ᵇ: 'b', ᶜ: 'c', ᵈ: 'd', ᵉ: 'e', ᶠ: 'f', ᵍ: 'g', ʰ: 'h', ⁱ: 'i', ʲ: 'j', ᵏ: 'k', ˡ: 'l', ᵐ: 'm', ⁿ: 'n', ᵒ: 'o', ᵖ: 'p', ʳ: 'r', ˢ: 's', ᵗ: 't', ᵘ: 'u', ᵛ: 'v', ʷ: 'w', ˣ: 'x', ʸ: 'y', ᶻ: 'z' }[c] || c)).join('')} `);
  s = s.replace(/[ᵣᵧ]/g, (c) => ` sub ${c === 'ᵣ' ? 'r' : 'y'} `);
  // ascii powers
  s = s.replace(/\^\s*2\b/g, ' squared ').replace(/\^\s*3\b/g, ' cubed ').replace(/\^\s*\(?(-?)\s*(\w+)\)?/g, (m, neg, p) => ` to the power ${neg ? 'negative ' : ''}${p} `);
  return s;
}

const UNIT = { m: 'metre', km: 'kilometre', cm: 'centimetre', mm: 'millimetre', dm: 'decimetre', kg: 'kilogram', g: 'gram', mg: 'milligram', s: 'second', h: 'hour', min: 'minute', mol: 'mole', J: 'joule', kJ: 'kilojoule', N: 'newton', W: 'watt', kW: 'kilowatt', K: 'kelvin', L: 'litre', ml: 'millilitre', Pa: 'pascal', kPa: 'kilopascal', V: 'volt', Hz: 'hertz', kHz: 'kilohertz', MHz: 'megahertz', GHz: 'gigahertz', C: 'coulomb', A: 'ampere' };
const plural = (u, n) => (Number(n) === 1 ? u : /^(hertz)$/.test(u) ? u : `${u}s`);
function speakUnits(s) {
  const U = Object.keys(UNIT).sort((a, b) => b.length - a.length).join('|');
  const per = new RegExp(`(\\d)\\s*(${U})\\s*(?:/|\\s)\\s*(${U})\\s*(?:(?:[²³])|\\^?([23])|(?:⁻¹))?(?![A-Za-z])`, 'g');
  s = s.replace(new RegExp(`(\\d)\\s*(${U})\\s*/\\s*(${U})\\s*(²|³|\\^?[23])?(?![A-Za-z0-9])`, 'g'), (m, n, a, b, p) => {
    const pw = p ? (/[3³]/.test(p) ? 'cubic ' : 'square ') : '';
    return `${n} ${plural(UNIT[a], n)} per ${pw}${UNIT[b]} `;
  });
  s = s.replace(per, (m) => m); // (kept for clarity; the replacement above already handled "/" forms)
  s = s.replace(/(\bm|\bkm|\bcm|\bmm|\bdm)\s*s\s*⁻¹/g, (m, a) => `${UNIT[a]}s per second `);
  s = s.replace(/\b(mol|g|kg|J|N)\s*(?:\/|\s)\s*(dm|cm|m)\s*³/g, (m, a, b) => `${UNIT[a]}s per cubic ${UNIT[b]} `);
  s = s.replace(/(^|[^A-Za-z])(mm|cm|dm|km|m)\s*²/g, (m, p, u) => `${p}square ${UNIT[u]}s `);
  s = s.replace(/(^|[^A-Za-z])(mm|cm|dm|km|m)\s*³/g, (m, p, u) => `${p}cubic ${UNIT[u]}s `);
  s = s.replace(/(\d)\s*(kHz|MHz|GHz|Hz|kPa|Pa|kJ|kW|mol|N|J|W|V)\b(?!\s*[A-Za-z]{2,}\b[^.]*\bkeys?\b)/g, (m, n, u) => `${n} ${plural(UNIT[u], n)} `);
  s = s.replace(/(\d)\s*(cm|mm|km|kg|mg|ml|dm)\b/g, (m, n, u) => `${n} ${plural(UNIT[u], n).replace('metres', 'metres')} `);
  s = s.replace(/(\d)\s*Ω/g, '$1 ohms ').replace(/Ω/g, ' ohms ').replace(/µ|μ(?=[A-Za-z])/g, 'micro');
  return s;
}

const GREEK = { α: 'alpha', β: 'beta', γ: 'gamma', δ: 'delta', ε: 'epsilon', θ: 'theta', λ: 'lambda', μ: 'mu', π: 'pi', ρ: 'rho', σ: 'sigma', τ: 'tau', φ: 'phi', ω: 'omega', Δ: 'delta', Σ: 'sigma', Ω: 'omega', Φ: 'phi', Π: 'pi', η: 'eta', ν: 'nu' };
const SYMBOLS = {
  '→': ' gives ', '⟶': ' gives ', '⇒': ' implies ', '⇌': ' is in equilibrium with ', '↔': ' is equivalent to ', '⇔': ' if and only if ', '↑': ' increases ', '↓': ' decreases ',
  '∠': ' angle ', '∝': ' is proportional to ', '∩': ' intersection ', '∪': ' union ', '∈': ' is an element of ', '∉': ' is not an element of ', '⊂': ' is a subset of ', '∅': ' the empty set ',
  '∞': ' infinity ', '∑': ' the sum of ', '∫': ' the integral of ', '∴': ' therefore ', '∵': ' because ', '≡': ' is identical to ', '∘': ' composed with ', '¬': ' not ', '∧': ' and ', '∨': ' or ', '⊕': ' exclusive or ',
  '±': ' plus or minus ', '⟹': ' implies ', '⟺': ' if and only if ', '←': ' comes from ', '≅': ' is congruent to ', '∼': ' is similar to ', '⊆': ' is a subset of or equal to ', '∛': ' cube root of ', '∎': ' ', '─': ' ', '⃗': ' vector ', '↕': ' ', '°': ' degrees ', '₦': ' naira ', '—': ', ', '–': ' to ', '⁄': ' over ', '⁽': ' (', '⁾': ') ',
  '½': ' one half ', '⅓': ' one third ', '⅔': ' two thirds ', '¼': ' one quarter ', '¾': ' three quarters ', '⅕': ' one fifth ', '⅛': ' one eighth ', '·': ' dot ', '∥': ' is parallel to ', '⊥': ' is perpendicular to ', '△': ' triangle ', '′': ' prime ',
};

const SPELLED = 'CBN GIS ATP USA UK UN GDP GNP IMF TV CV DNA RNA UV AI WHO WTO GPS POS RGB IQR TB PVC CAC NDIC NCC FCT LGA LGAS APC PDP SSS EMF NBV TSA FCCPC NLC UNSC NPC BOP AU UTME CBT GST NYSC NECO_ NNPC FIFA OPEC NGO NGOS MDG MDGS CFC CFCS RBC RBCS SDG SDGS EFCC ICPC NAN NTA FRCN NPF NSCDC FRSC PHCN NEPA IT ICT CEO MD PR VAT PAYE ERP SME SMES FAQ PDF ID PC USB LCD LED CPU RAM ROM SMS ATM PIN BVN NIN FG SS JSS ASUU NUT NANS'.split(' ');
const SAY = { WAEC: 'wayk', NECO: 'nehko', JAMB: 'jamb', INEC: 'eye neck', NAFDAC: 'naf dack', ECOWAS: 'eck oh wass', ECOMOG: 'eck oh mog', NAICOM: 'nay com', UNESCO: 'you nesko', UNICEF: 'you nisef', NCNC: 'N C N C', NEPAD: 'nee pad', AfCFTA: 'A F C F T A', AfDB: 'A F D B', EndSARS: 'End sars', IReV: 'I Rev', CorelDRAW: 'Corel draw', ArcGIS: 'Arc G I S', NaOH: 'N a O H', pH: 'P H' };

// How place names and people from the set books and history topics are said.
const NAMES = {
  Ananse: 'Ahnahnsay', Anansewa: 'Ahnahnsaywa', Fanama: 'Fanahma', Soyinka: 'Shoyinka', Ijaw: 'Eejaw', Ife: 'Eefay', Oyo: 'Ohyoh', Awolowo: 'Ahwohlohwoh', Azikiwe: 'Ahzeekeeway',
  Balewa: 'Bahlayway', Ojukwu: 'Ohjookwoo', Obasanjo: 'Ohbahsahnjoh', Gowon: 'Gohwon', Buhari: 'Boohahree', Nnamdi: 'Namdee', Sokoto: 'Sohkohtoh', Ibadan: 'Eebahdan', Enugu: 'Ehnoogoo',
  Ogun: 'Ohgoon', Osun: 'Ohshoon', Ekiti: 'Ehkeetee', Ebonyi: 'Ehbonyee', Igbo: 'Igboh', Yoruba: 'Yorubah', Hausa: 'Howsah', Fulani: 'Foolahnee', Tiv: 'Tiv', Efik: 'Efik', Nupe: 'Noopay',
  Kanem: 'Kahnem', Bornu: 'Bornoo', Songhai: 'Songhigh', Mali: 'Mahlee', Zaria: 'Zahria', Kwara: 'Kwahrah', Bayelsa: 'Bayelsah', Ahmadu: 'Ahmahdoo', Bello: 'Bellow', Lugard: 'Loogard',
  Okonkwo: 'Okonkwoh', Umuofia: 'Oomoofeeah', Achebe: 'Ahchaybay', Chinua: 'Chinwah', Ngugi: 'Ngoogee', Wole: 'Wohlay', Leone: 'Leeohn', Bendu: 'Bendoo', Kofi: 'Kofee', Ghanaian: 'Ganayan',
};

// Order matters: earlier rules run first.
const RULES = [
  [/_{2,}/g, ' blank '],
  [/\.{3}|…/g, ', '],
  [/\bMr\.\s/g, 'Mister '], [/\bMrs\.\s/g, 'Missus '], [/\bDr\.\s/g, 'Doctor '], [/\bProf\.\s/g, 'Professor '], [/\bFig\.\s*(\d)/g, 'Figure $1'], [/\bcf\.\s/g, 'compare '], [/\bviz\.\s/g, 'namely '], [/\bNB:?\s/g, 'Note: '],
  [/\bLtd\b\.?/g, 'Limited'], [/\bPlc\b\.?/gi, 'P L C'], [/\bInc\.(?=\s|$)/g, 'Incorporated'],
  [/\b(\d{1,2})[:.](00)\s*([ap])\.?m\.?/gi, (m, h, mm, ap) => `${h} ${ap.toUpperCase()} M`],
  [/\b(\d{1,2}):(\d{2})\s*([ap])\.?m\.?/gi, (m, h, mm, ap) => `${h} ${mm} ${ap.toUpperCase()} M`],
  [/\b(\d{1,2})\s*([ap])\.m\./gi, (m, h, ap) => `${h} ${ap.toUpperCase()} M`],
  [/(\d{4})\s*[–—-]\s*(\d{4})/g, '$1 to $2'],
  [/(\d)\s*[–—]\s*(\d)/g, '$1 to $2'],
  [/\s[—–]\s/g, ', '],
  [/(^|[\s(=×*/+])[−–-]\s?(?=\d)/g, '$1negative '],
  [/−/g, ' minus '],
  [/\s\+\s/g, ' plus '],
  [/(^|\s)#\s?(?=\d)/g, '$1number '], [/[#*~{}\\]/g, ' '], [/\|/g, ', '],
  [/\b1\/2\b/g, 'one half'], [/\b1\/4\b/g, 'one quarter'], [/\b3\/4\b/g, 'three quarters'], [/\b1\/3\b/g, 'one third'], [/\b2\/3\b/g, 'two thirds'],
  [/(\d)\s*°\s*C\b/g, '$1 degrees Celsius'],
  [/(\d)\s*°\s*F\b/g, '$1 degrees Fahrenheit'],
  [/(\d)\s*°/g, '$1 degrees'],
  [/\be\.g\.,?/gi, 'for example,'],
  [/\bi\.e\.,?/gi, 'that is,'],
  [/\betc\./gi, 'and so on'],
  [/\bapprox\./gi, 'approximately'],
  [/\bvs\.?/gi, 'versus'],
  [/\bNo\.\s*(\d+)/g, 'Number $1'],
  [/₦\s*([\d,]+(?:\.\d+)?)/g, '$1 naira'],
  [/\$\s*([\d,]+(?:\.\d+)?)/g, '$1 dollars'],
  [/(\d+(?:\.\d+)?)\s*%/g, '$1 percent'],
  [/(\d)\.(\d)/g, '$1 point $2'],
  [/(^|[\s(=])-(\d)/g, '$1negative $2'],
  [/(\d)\s*[×xX]\s*(\d)/g, '$1 times $2'],
  [/×/g, ' times '],
  [/÷/g, ' divided by '],
  [/(\d)\s*\/\s*(\d)/g, '$1 over $2'],
  [/√\s*/g, 'square root of '],
  [/π/g, 'pi'],
  [/≈/g, ' is approximately equal to '],
  [/≠/g, ' is not equal to '],
  [/≤/g, ' is less than or equal to '],
  [/≥/g, ' is greater than or equal to '],
  [/=/g, ' equals '],
  [/(\d|\))\s*\+\s*(?=[\d(a-zA-Z])/g, '$1 plus '],
  [/(\d|[a-zA-Z)])\s+-\s+(?=[\d(a-zA-Z])/g, '$1 minus '],
  [/</g, ' is less than '],
  [/>/g, ' is greater than '],
  [/&/g, ' and '],
  [/@/g, ' at '],
  [/(\d)\s*(cm|mm|km|kg|ml)\b/gi, (m, n, u) =>
    `${n} ${{ cm: 'centimetres', mm: 'millimetres', km: 'kilometres', kg: 'kilograms', ml: 'millilitres' }[u.toLowerCase()]}`],
  [/(\d)\s*g\b/g, '$1 grams'],
];

export function normalizeForSpeech(text) {
  let s = String(text || '');
  // decorative emoji and bullets are not read out
  s = s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}▪►◄•✓✔]/gu, ' ');
  s = speakPhonetics(s);
  // chemical formulas: put a space between the symbols (H₂SO₄ → H₂ S O₄, NaCl → N A C L) so "CO" is not read as a word
  const spellUnit = (u) => u.replace(/([A-Z][a-z]?)/g, (x) => ` ${x.toUpperCase().split('').join(' ')} `);
  s = s.replace(/(?:[A-Z][a-z]?[₀-₉]*|[()][₀-₉]*){2,}/g, (m) => (/[₀-₉a-z]/.test(m) && !/^[A-Z][a-z]+$/.test(m) ? m.replace(/([A-Z][a-z]?)([₀-₉]*)/g, (x, el, sub) => ` ${el.toUpperCase().split('').join(' ')}${sub} `) : m));
  s = speakUnits(s);
  s = speakScripts(s);
  s = s.replace(/(\d)\s*(?:×|x|X|\*)\s*10\b/g, '$1 times 10');
  // names and acronyms (whole words only)
  s = s.replace(/\b(WAEC|NECO|JAMB|INEC|NAFDAC|ECOWAS|ECOMOG|NAICOM|UNESCO|UNICEF|NCNC|NEPAD|AfCFTA|AfDB|EndSARS|IReV|CorelDRAW|ArcGIS|NaOH|pH)\b/g, (m) => SAY[m] || m);
  s = s.replace(new RegExp(`\\b(${Object.keys(NAMES).join('|')})\\b`, 'g'), (m) => NAMES[m]);
  s = s.replace(/\b(SS|JSS)\s?([123])\b/g, (m, a, n) => `${a.split('').join(' ')} ${NUM[Number(n)]}`);
  s = s.replace(new RegExp(`\\b(${SPELLED.filter((x) => !x.endsWith('_')).join('|')})\\b`, 'g'), (m) => m.split('').join(' '));
  // plural acronyms: LGAs, NGOs, CFCs
  s = s.replace(/\b([A-Z]{2,5})s\b/g, (m, a) => `${a.split('').join(' ')} s`);
  // chemical formulas: NaCl, HCl, CO2, CaCO3 → letters one by one so "CO" is not read as a word
  s = s.replace(/\b(?:[A-Z][a-z]?\d*){2,}\b/g, (m) => (/[a-z\d]/.test(m) && !/^[A-Z][a-z]+$/.test(m) ? m.replace(/([A-Z][a-z]?)/g, (x) => ` ${x.toUpperCase().split('').join(' ')} `).replace(/\s+/g, ' ').trim() : m));
  // stress capitals in English questions (reCORD, INcrease): read as the plain word
  s = s.replace(/\b(?:[a-z]{2,}[A-Z]{2,}[a-z]*|[A-Z]{2,}[a-z]{2,})\b/g, (m) => (m.length >= 5 ? m.toLowerCase() : m));
  for (const [re, rep] of RULES) s = s.replace(re, rep);
  for (const [k, v] of Object.entries(GREEK)) if (s.includes(k)) s = s.split(k).join(` ${v} `);
  for (const [k, v] of Object.entries(SYMBOLS)) if (s.includes(k)) s = s.split(k).join(v);
  s = s.replace(/\b(angle|triangle|line|arc|quadrilateral)\s+([A-Z]{2,4})\b/g, (m, w, l) => `${w} ${l.split('').join(' ')}`);
  s = s.replace(/([a-zA-Z0-9)])\s?\/\s?([0-9(])/g, '$1 over $2');
  return s.replace(/\s+/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim();
}
