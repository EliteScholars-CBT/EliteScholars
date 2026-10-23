// Animated sticker packs, drawn in code (no image files). Each sticker is a round character with a
// face, an optional prop and a caption ribbon. Sent in chat as the text "st:<id>" so it stays tiny.
const INK = '#2B1B4E';

const PAL = {
  gold: ['#FFE9A0', '#F5A623'], violet: ['#DDD0FF', '#7C3AED'], teal: ['#A7F3E4', '#0D9488'], rose: ['#FFD3E8', '#DB2777'],
  green: ['#C6F6D5', '#16A34A'], orange: ['#FFD9B3', '#EA580C'], blue: ['#CBE2FF', '#2563EB'], red: ['#FFD0D0', '#DC2626'],
  slate: ['#E5EAF2', '#64748B'], lime: ['#EAFBC2', '#65A30D'],
};

const stroke = (w = 4.2) => `fill="none" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const heartD = (cx, cy, s) => `M${cx} ${cy + 6 * s} C${cx - 14 * s} ${cy - 4 * s} ${cx - 6 * s} ${cy - 12 * s} ${cx} ${cy - 5 * s} C${cx + 6 * s} ${cy - 12 * s} ${cx + 14 * s} ${cy - 4 * s} ${cx} ${cy + 6 * s}Z`;
const starD = (cx, cy, r) => `M${cx} ${cy - r} L${cx + r * 0.3} ${cy - r * 0.3} L${cx + r} ${cy} L${cx + r * 0.3} ${cy + r * 0.3} L${cx} ${cy + r} L${cx - r * 0.3} ${cy + r * 0.3} L${cx - r} ${cy} L${cx - r * 0.3} ${cy - r * 0.3}Z`;
const flameAt = (x, y, s, d = 0) => `<path class="pa-flick" style="animation-delay:${d}s" transform="translate(${x} ${y}) scale(${s})" d="M0 0 C-12 -12 -6 -24 -2 -34 C2 -26 12 -20 10 -8 C14 -10 12 -2 0 0 Z" fill="url(#sk-fl)" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/>`;

const EYES = {
  open: (x) => `<ellipse cx="${x}" cy="50" rx="8" ry="10" fill="#fff"/><circle cx="${x}" cy="52" r="4.6" fill="${INK}"/><circle cx="${x + 1.6}" cy="49.6" r="1.7" fill="#fff"/>`,
  wide: (x) => `<ellipse cx="${x}" cy="49" rx="9.5" ry="12" fill="#fff"/><circle cx="${x}" cy="50" r="3.3" fill="${INK}"/><circle cx="${x + 1}" cy="48.6" r="1.2" fill="#fff"/>`,
  happy: (x) => `<path d="M${x - 7} 53 Q${x} 41 ${x + 7} 53" ${stroke()}/>`,
  closed: (x) => `<path d="M${x - 7} 49 Q${x} 58 ${x + 7} 49" ${stroke()}/>`,
  x: (x) => `<path d="M${x - 6} 43 L${x + 6} 57 M${x + 6} 43 L${x - 6} 57" ${stroke(4.4)}/>`,
  heart: (x) => `<path class="pa-pulse" d="${heartD(x, 50, 1.15)}" fill="#EF2B5B" stroke="#fff" stroke-width="1.5"/>`,
  star: (x) => `<path class="pa-twinkle" d="${starD(x, 50, 11)}" fill="#FFC53D" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`,
  side: (x) => `<ellipse cx="${x}" cy="50" rx="8" ry="9" fill="#fff"/><circle cx="${x + 4}" cy="51" r="4.4" fill="${INK}"/><circle cx="${x + 5.4}" cy="49" r="1.4" fill="#fff"/><path d="M${x - 9} 43 H${x + 9}" ${stroke(3)}/>`,
  sleepy: (x, b) => `<ellipse cx="${x}" cy="51" rx="8" ry="9" fill="#fff"/><circle cx="${x}" cy="54" r="4.2" fill="${INK}"/><path d="M${x - 9} 51 a9 10 0 0 1 18 0 Z" fill="${b}"/><path d="M${x - 9} 51 H${x + 9}" ${stroke(3.2)}/>`,
  naira: (x) => `<circle cx="${x}" cy="50" r="10" fill="#FFD34D" stroke="#B45309" stroke-width="2.4"/><text x="${x}" y="56" font-size="15" font-weight="900" fill="#92400E" text-anchor="middle" font-family="system-ui,Arial,sans-serif">&#8358;</text>`,
};
const eyesSvg = (kind, b) => {
  if (kind === 'shades') return `<rect x="31" y="41" width="25" height="17" rx="7" fill="${INK}"/><rect x="64" y="41" width="25" height="17" rx="7" fill="${INK}"/><rect x="54" y="45" width="12" height="4" rx="2" fill="${INK}"/><path d="M36 46 l7 -2 M69 46 l7 -2" stroke="#fff" stroke-opacity=".55" stroke-width="2.6" stroke-linecap="round"/>`;
  if (kind === 'wink') return EYES.open(45, b) + EYES.happy(75, b);
  return EYES[kind](45, b) + EYES[kind](75, b);
};

const MOUTH = {
  smile: `<path d="M45 66 Q60 81 75 66" ${stroke()}/>`,
  grin: `<path d="M43 64 Q60 92 77 64 Z" fill="${INK}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/><path d="M47 65.5 Q60 72 73 65.5 Q60 69 47 65.5Z" fill="#fff" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path d="M52 77 Q60 72.500 68 77 Q60 86 52 77Z" fill="#FB7185"/>`,
  o: `<ellipse cx="60" cy="73" rx="6" ry="7.5" fill="${INK}"/>`,
  gasp: `<ellipse cx="60" cy="74" rx="8.5" ry="11" fill="${INK}"/><ellipse cx="60" cy="80" rx="5" ry="4" fill="#FB7185"/>`,
  flat: `<path d="M49 73 H71" ${stroke()}/>`,
  frown: `<path d="M46 77 Q60 64 74 77" ${stroke()}/>`,
  tongue: `<path d="M45 66 Q60 81 75 66" ${stroke()}/><path class="pa-tongue" d="M53 73.500 q7 15 14 0 z" fill="#FB7185" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`,
  smirk: `<path d="M48 72 Q63 79 76 65" ${stroke()}/>`,
  wail: `<path d="M42 82 Q60 56 78 82 Q60 90 42 82Z" fill="${INK}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/><path d="M52 82 Q60 76 68 82 Q60 87 52 82Z" fill="#FB7185"/>`,
  clench: `<rect x="45" y="65" width="30" height="13" rx="6" fill="#fff" stroke="${INK}" stroke-width="3.2"/><path d="M52.500 65 v13 M60 65 v13 M67.500 65 v13" stroke="${INK}" stroke-width="2.4"/>`,
};
const HAPPY_MOUTH = new Set(['smile', 'grin', 'tongue', 'smirk']);

const BROWS = {
  none: '',
  up: `<path d="M37 35 Q45 29 53 35 M67 35 Q75 29 83 35" ${stroke(3.4)}/>`,
  angry: `<path d="M36 33 L54 41 M84 33 L66 41" ${stroke(4)}/>`,
  worried: `<path d="M36 40 L54 33 M84 40 L66 33" ${stroke(3.6)}/>`,
};

const rise = (txt, x, y, size, fill, d = 0) => `<text class="pa-rise" style="animation-delay:${d}s" x="${x}" y="${y}" font-size="${size}" font-weight="900" fill="${fill}" stroke="#fff" stroke-width="3" paint-order="stroke" font-family="system-ui,Arial,sans-serif">${txt}</text>`;
const sparkle = (cx, cy, r, d = 0) => `<path class="pa-twinkle" style="animation-delay:${d}s" d="${starD(cx, cy, r)}" fill="#FFE066" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>`;
const heartP = (cx, cy, s, d) => `<path class="pa-rise" style="animation-delay:${d}s" d="${heartD(cx, cy, s)}" fill="#F43F6E" stroke="#fff" stroke-width="1.6"/>`;

// props drawn behind the body
const BACK = {
  flames: () => `<defs><linearGradient id="sk-fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE066"/><stop offset=".55" stop-color="#FF9A2E"/><stop offset="1" stop-color="#EF4444"/></linearGradient></defs>${flameAt(26, 34, .8, 0)}${flameAt(60, 20, 1.05, .2)}${flameAt(94, 34, .8, .4)}`,
  rays: () => `<g class="pa-spin">${Array.from({ length: 12 }, (_, i) => { const a = (i * 30 * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a); return `<path d="M${(60 + c * 50).toFixed(1)} ${(54 + s * 50).toFixed(1)} L${(60 + c * 62).toFixed(1)} ${(54 + s * 62).toFixed(1)}" stroke="#FFD34D" stroke-width="6" stroke-linecap="round"/>`; }).join('')}</g>`,
};

// props drawn in front of the body
const FRONT = {
  sweat: () => `<path class="pa-drop" d="M97 28 q-7 10 0 15 q7 -5 0 -15z" fill="#7DD3FC" stroke="#fff" stroke-width="1.8"/>`,
  tears: () => `<path class="pa-tear" d="M37 60 q-5 9 0 12 q5 -3 0 -12z" fill="#7DD3FC" stroke="#fff" stroke-width="1.5"/><path class="pa-tear" style="animation-delay:.5s" d="M83 60 q-5 9 0 12 q5 -3 0 -12z" fill="#7DD3FC" stroke="#fff" stroke-width="1.5"/>`,
  hearts: () => heartP(100, 24, 1.1, 0) + heartP(112, 46, .75, .6) + heartP(12, 30, .85, 1.1),
  sparkles: () => sparkle(100, 20, 10) + sparkle(14, 26, 8, .5) + sparkle(110, 60, 6, 1) + sparkle(8, 70, 6, 1.4),
  cap: () => `<path d="M38 18 v11 q22 12 44 0 v-11" fill="#3B2A8C" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/><path d="M60 -2 L100 13 L60 28 L20 13 Z" fill="#241466" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/><path d="M98 14 v20" stroke="#FFC53D" stroke-width="2.600" stroke-linecap="round"/><circle cx="98" cy="36" r="3.600" fill="#FFC53D"/>`,
  crown: () => `<path d="M34 20 L40 -2 L52 11 L60 -6 L68 11 L80 -2 L86 20 Z" fill="#FFC53D" stroke="#B45309" stroke-width="2.6" stroke-linejoin="round"/><circle cx="60" cy="9" r="3" fill="#EF4444"/><circle cx="43" cy="12" r="2.200" fill="#38BDF8"/><circle cx="77" cy="12" r="2.200" fill="#38BDF8"/>`,
  book: () => `<g transform="translate(4 62) rotate(-12)"><rect width="30" height="24" rx="3.500" fill="#2563EB" stroke="#fff" stroke-width="2.200"/><rect x="3" y="2.500" width="24" height="19" rx="1.500" fill="#fff"/><path d="M15 2.500 v19 M6 8 h6 M6 12 h6 M18 8 h6 M18 12 h6" stroke="#93C5FD" stroke-width="1.600"/></g>`,
  coffee: () => `<g transform="translate(86 64)"><path class="pa-steam" d="M6 0 q-4 -6 0 -10 M13 0 q-4 -6 0 -10" ${stroke(2.2).replace(INK, '#fff')}/><path d="M0 4 h22 v13 a7 7 0 0 1 -7 7 h-8 a7 7 0 0 1 -7 -7z" fill="#fff" stroke="${INK}" stroke-width="2.600"/><path d="M22 8 h3 a4.500 4.500 0 0 1 0 9 h-3" ${stroke(2.600)}/><path d="M3 9 h16" stroke="#C084FC" stroke-width="3" stroke-linecap="round"/></g>`,
  zzz: () => rise('Z', 88, 30, 20, '#7C3AED', 0) + rise('z', 100, 18, 14, '#7C3AED', .8),
  question: () => `<text class="pa-bob" x="92" y="36" font-size="36" font-weight="900" fill="#FFC53D" stroke="#fff" stroke-width="3.400" paint-order="stroke" font-family="system-ui,Arial,sans-serif">?</text>`,
  exclaim: () => `<text class="pa-bob" x="94" y="36" font-size="38" font-weight="900" fill="#FF5A36" stroke="#fff" stroke-width="3.400" paint-order="stroke" font-family="system-ui,Arial,sans-serif">!</text>`,
  bolt: () => `<path class="pa-twinkle" d="M98 4 l-15 24 h11 l-7 22 l20 -28 h-12 z" fill="#FFD34D" stroke="#fff" stroke-width="2.400" stroke-linejoin="round"/>`,
  trophy: () => `<g transform="translate(84 62)" class="pa-bob"><path d="M4 0 h20 v10 a10 10 0 0 1 -20 0z" fill="#FFC53D" stroke="#fff" stroke-width="2.200" stroke-linejoin="round"/><path d="M4 3 h-5 q0 9 6 9 M24 3 h5 q0 9 -6 9" ${stroke(2.400).replace(INK, '#F59E0B')}/><rect x="11" y="20" width="6" height="6" fill="#F59E0B"/><rect x="7" y="25" width="14" height="5" rx="2" fill="#B45309" stroke="#fff" stroke-width="1.600"/></g>`,
  money: () => ['M8 6', 'M96 2'].map((_, i) => `<g class="pa-rise" style="animation-delay:${i * 0.9}s" transform="translate(${i ? 90 : 4} ${i ? 14 : 24}) rotate(${i ? 12 : -14})"><rect width="26" height="15" rx="2.500" fill="#4ADE80" stroke="#fff" stroke-width="2"/><circle cx="13" cy="7.500" r="4.200" fill="#16A34A"/><text x="13" y="10.500" font-size="7.500" font-weight="900" fill="#fff" text-anchor="middle" font-family="system-ui,Arial,sans-serif">&#8358;</text></g>`).join(''),
  phone: () => `<g transform="translate(88 58) rotate(10)" class="pa-bob"><rect width="20" height="34" rx="4.500" fill="${INK}" stroke="#fff" stroke-width="2.200"/><rect x="2.500" y="4" width="15" height="24" rx="2" fill="#7DD3FC"/><circle cx="10" cy="31" r="1.400" fill="#fff"/></g>`,
  pencil: () => `<g transform="translate(6 64) rotate(-35)" class="pa-nib"><rect width="34" height="9" rx="1.500" fill="#FFC53D" stroke="#fff" stroke-width="2"/><path d="M34 0 l9 4.500 l-9 4.500z" fill="#FDE6B5" stroke="#fff" stroke-width="1.600"/><path d="M40 3.500 l3 1 l-3 1z" fill="${INK}"/><rect width="7" height="9" rx="1.500" fill="#F472B6"/></g>`,
  party: () => ['#EF4444:12:14:0', '#3B82F6:104:18:.3', '#22C55E:8:60:.6', '#F59E0B:110:56:.9', '#A855F7:22:6:1.2', '#EC4899:96:4:.4'].map((c) => { const [col, x, y, d] = c.split(':'); return `<rect class="pa-twinkle" style="animation-delay:${d}s" x="${x}" y="${y}" width="7" height="4" rx="1.500" fill="${col}" transform="rotate(${(Number(x) * 3) % 90} ${x} ${y})"/>`; }).join('') + `<path class="pa-twinkle" d="M96 24 l10 -4 l-3 10z" fill="#FFC53D" stroke="#fff" stroke-width="1.500" stroke-linejoin="round"/>`,
  anger: () => `<g class="pa-pulse"><path d="M88 16 l14 14 M102 16 l-14 14" stroke="#EF2B2B" stroke-width="5" stroke-linecap="round"/></g>`,
  flag: () => `<g class="pa-wave"><path d="M98 6 v44" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><rect x="100" y="8" width="7" height="20" fill="#008751" stroke="#fff" stroke-width="1.500"/><rect x="107" y="8" width="7" height="20" fill="#fff" stroke="#E5E7EB" stroke-width="1"/><rect x="114" y="8" width="7" height="20" fill="#008751" stroke="#fff" stroke-width="1.500"/></g>`,
  plane: () => `<g class="pa-fly"><path d="M88 22 L118 8 L106 36 L100 26 Z" fill="#fff" stroke="${INK}" stroke-width="2.200" stroke-linejoin="round"/><path d="M100 26 L118 8" ${stroke(2)}/></g>`,
  bulb: () => `<g class="pa-pulse"><circle cx="98" cy="20" r="11" fill="#FFE066" stroke="#fff" stroke-width="2.600"/><rect x="93" y="30" width="10" height="7" rx="2" fill="#94A3B8" stroke="#fff" stroke-width="1.800"/><path d="M98 8 v-5 M86 12 l-4 -3 M110 12 l4 -3 M84 22 h-5 M112 22 h5" stroke="#FFD34D" stroke-width="2.600" stroke-linecap="round"/></g>`,
  jollof: () => `<g transform="translate(82 62)" class="pa-bob"><path class="pa-steam" d="M10 0 q-4 -5 0 -9 M20 0 q-4 -5 0 -9" ${stroke(2).replace(INK, '#fff')}/><path d="M-1 8 Q15 -10 31 8 Z" fill="#E4572E" stroke="#fff" stroke-width="2"/><path d="M-4 8 h38 q-2 17 -19 17 q-17 0 -19 -17z" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.600"/><circle cx="8" cy="3.500" r="1.200" fill="#16A34A"/><circle cx="20" cy="2.500" r="1.200" fill="#FFC53D"/></g>`,
  phones: () => `<path d="M18 54 Q16 6 60 6 Q104 6 102 54" ${stroke(5.500)}/><rect x="10" y="46" width="14" height="26" rx="6" fill="#7C3AED" stroke="#fff" stroke-width="2.400"/><rect x="96" y="46" width="14" height="26" rx="6" fill="#7C3AED" stroke="#fff" stroke-width="2.400"/>${rise('&#9835;', 100, 24, 16, '#EC4899', 0.2)}`,
  lock: () => `<g transform="translate(86 62)" class="pa-bob"><path d="M5 12 V8 a7 7 0 0 1 14 0 V12" ${stroke(3.200)}/><rect y="11" width="24" height="19" rx="4.500" fill="#FFC53D" stroke="#fff" stroke-width="2.400"/><circle cx="12" cy="19.500" r="2.600" fill="${INK}"/><rect x="11" y="20" width="2" height="6" fill="${INK}"/></g>`,
  clock: () => `<g class="pa-shake"><circle cx="98" cy="22" r="13" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M98 14 v8 l6 4" ${stroke(2.800)}/><path d="M88 8 l-5 -4 M108 8 l5 -4" stroke="#EF4444" stroke-width="3.600" stroke-linecap="round"/></g>`,
};

// ---- the catalogue: id|caption|eyes|mouth|brows|prop|palette|animation -------------------------------
const rows = (txt) => txt.trim().split('\n').map((l) => { const [id, cap, eyes, mouth, brows, prop, pal, anim] = l.trim().split('|'); return { id, cap, eyes, mouth, brows, prop, pal, anim }; });

export const PACKS = [
  { id: 'n', name: 'Naija Vibes', icon: 'N', items: rows(`
n-omo|OMO!|wide|o|up|exclaim|orange|shake
n-wahala|WAHALA|open|frown|worried|sweat|slate|wiggle
n-nowahala|NO WAHALA|shades|smile|none|none|green|nod
n-abeg|ABEG|open|wail|worried|sparkles|rose|bounce
n-chai|CHAI!|x|wail|worried|tears|blue|shake
n-nawa|NA WA O|side|flat|up|sweat|violet|nod
n-edondo|E DON DO|closed|flat|angry|anger|red|shake
n-gbam|GBAM!|happy|grin|up|sparkles|gold|pop
n-oya|OYA NOW|open|smirk|up|bolt|teal|bounce
n-japa|JAPA!|wide|grin|up|plane|blue|float
n-jollof|JOLLOF|closed|tongue|none|jollof|orange|bounce
n-sharp|SHARP SHARP|wink|grin|none|bolt|lime|pop
n-ehen|EHEN?|open|smirk|up|question|violet|nod
n-oga|OGA!|naira|smirk|none|money|gold|bounce
n-echoke|E CHOKE!|star|grin|none|sparkles|gold|pop
n-naija|NAIJA NO DEY SMALL|happy|grin|none|flag|green|wiggle`) },
  { id: 'e', name: 'Exam Szn', icon: 'E', items: rows(`
e-locked|LOCKED IN|open|flat|angry|lock|violet|pulse
e-cooked|WE'RE COOKED|x|wail|worried|flames|red|shake
e-pastq|PAST QS TIME|open|smile|none|book|teal|nod
e-cbt|CBT LOADING|open|o|up|clock|blue|pulse
e-panic|DON'T PANIC|wide|clench|worried|sweat|slate|shake
e-pass|PASS LOADING|closed|smile|none|sparkles|green|float
e-tomorrow|TOMORROW?!|wide|gasp|up|clock|orange|shake
e-oil|MIDNIGHT OIL|sleepy|flat|none|coffee|violet|float
e-allnight|ALL-NIGHTER|sleepy|o|none|zzz|slate|float
e-full|FULL MARKS|star|grin|none|trophy|gold|bounce
e-cram|CRAM MODE|open|clench|angry|pencil|red|wiggle
e-fried|BRAIN FRIED|x|tongue|none|flames|orange|wiggle
e-result|RESULT DAY|wide|clench|worried|exclaim|blue|shake
e-sleep|NEED SLEEP|sleepy|frown|none|zzz|blue|float`) },
  { id: 'g', name: 'Gen Z', icon: 'G', items: rows(`
g-nocap|NO CAP|shades|smirk|none|none|teal|nod
g-slay|SLAY|wink|grin|none|sparkles|rose|pop
g-bet|BET|open|smirk|up|none|blue|nod
g-aura|AURA +1000|shades|smile|none|rays|gold|float
g-rizz|RIZZ|wink|smirk|up|hearts|rose|wiggle
g-ate|ATE!|closed|tongue|none|sparkles|lime|pop
g-delulu|DELULU|heart|smile|none|hearts|rose|float
g-giving|IT'S GIVING|open|smirk|up|sparkles|violet|nod
g-lowkey|LOWKEY|side|flat|none|none|slate|nod
g-frfr|FR FR|open|flat|angry|none|violet|nod
g-w|W|star|grin|none|party|green|bounce
g-l|TAKE THE L|x|frown|none|none|red|wiggle
g-based|BASED|shades|grin|none|none|gold|pop
g-vibes|VIBES|closed|smile|none|phones|teal|float
g-mid|MID|open|flat|none|none|slate|nod
g-bruh|BRUH|side|flat|up|none|orange|nod`) },
  { id: 'r', name: 'Mood', icon: 'M', items: rows(`
r-lol|LOL|happy|grin|none|tears|gold|shake
r-cry|CRYING|closed|wail|worried|tears|blue|shake
r-shook|SHOOK|wide|gasp|up|sweat|violet|shake
r-smh|SMH|closed|flat|worried|sweat|orange|nod
r-think|THINKING|side|flat|up|question|teal|nod
r-mind|MIND BLOWN|wide|gasp|up|sparkles|rose|pop
r-side|SIDE EYE|side|smirk|angry|none|slate|nod
r-vibing|VIBING|closed|smile|none|phones|violet|float
r-cringe|CRINGE|closed|clench|worried|sweat|lime|shake
r-blush|BLUSH|closed|smile|up|hearts|rose|float
r-smug|SMUG|shades|smirk|none|sparkles|blue|nod
r-dead|I'M DEAD|x|grin|none|tears|gold|shake
r-hmm|HMMM|open|flat|up|question|slate|wiggle
r-awk|AWKWARD|side|clench|worried|sweat|orange|wiggle`) },
  { id: 'h', name: 'Hype', icon: 'H', items: rows(`
h-gg|GG|star|grin|none|party|green|bounce
h-champ|CHAMPION|happy|grin|none|trophy|gold|pop
h-streak|STREAK!|open|grin|angry|flames|orange|pulse
h-level|LEVEL UP!|star|grin|up|bolt|violet|pop
h-fire|ON FIRE|shades|grin|none|flames|red|pulse
h-clap|CLAP CLAP|happy|smile|none|sparkles|gold|bounce
h-royal|ROYALTY|shades|smirk|none|crown|gold|float
h-genius|GENIUS|open|grin|up|bulb|teal|pop
h-goat|THE GOAT|shades|grin|none|crown|violet|bounce
h-mvp|MVP|star|smile|none|trophy|blue|bounce
h-cook|LET HIM COOK|closed|smirk|none|flames|orange|wiggle
h-win|W RESULT|happy|tongue|none|party|green|pop`) },
  { id: 's', name: 'Study Life', icon: 'S', items: rows(`
s-reading|READING|open|flat|none|book|blue|nod
s-coffee|COFFEE TIME|closed|smile|none|coffee|orange|float
s-nap|NEED A NAP|sleepy|o|none|zzz|slate|float
s-notes|NOTES DONE|happy|smile|none|pencil|green|nod
s-brain|BIG BRAIN|open|smirk|up|sparkles|violet|pop
s-idea|IDEA!|wide|grin|up|bulb|gold|pop
s-lecture|LECTURE MODE|sleepy|flat|none|clock|slate|nod
s-library|LIBRARY SZN|open|flat|none|book|teal|nod
s-tired|TIRED|sleepy|frown|worried|sweat|blue|wiggle
s-focus|FOCUS|open|flat|angry|lock|violet|pulse
s-playlist|STUDY PLAYLIST|closed|smile|none|phones|rose|float
s-done|DONE!|happy|grin|none|sparkles|green|pop`) },
  { id: 'l', name: 'Support', icon: 'L', items: rows(`
l-thanks|THANK YOU|happy|smile|none|hearts|rose|bounce
l-love|LOVE IT|heart|smile|none|hearts|rose|pulse
l-proud|PROUD OF YOU|happy|grin|none|sparkles|gold|pop
l-hug|SENDING HUGS|closed|smile|up|hearts|violet|float
l-respect|RESPECT|shades|smile|none|none|slate|nod
l-bless|BLESS UP|closed|smile|none|rays|gold|float
l-gotthis|YOU GOT THIS|open|grin|angry|bolt|orange|pop
l-sorry|SORRY|open|frown|worried|sweat|blue|wiggle
l-welcome|WELCOME|happy|grin|none|party|teal|bounce
l-congrats|CONGRATS!|star|grin|none|party|rose|bounce`) },
  { id: 'q', name: 'Squad', icon: 'Q', items: rows(`
q-up|SQUAD UP|shades|grin|none|bolt|violet|pop
q-challenge|CHALLENGE ME|open|smirk|angry|flames|red|shake
q-online|I'M ONLINE|open|smile|none|phone|green|bounce
q-turn|YOUR TURN|open|smirk|up|exclaim|blue|nod
q-study|LET'S STUDY|happy|smile|none|book|teal|bounce
q-where|WHERE YOU DEY?|side|o|up|question|orange|wiggle
q-join|JOIN US|wink|grin|none|party|rose|bounce
q-help|HELP!|wide|wail|worried|sweat|red|shake
q-present|PRESENT!|open|grin|none|exclaim|gold|pop
q-late|I'M LATE|wide|clench|worried|clock|orange|shake`) },
  { id: 'f', name: 'Feels', icon: 'F', items: rows(`
f-happy|HAPPY|happy|grin|up|sparkles|gold|bounce
f-lol|LOL|closed|grin|up|tears|teal|shake
f-love|LOVE|heart|smile|none|hearts|rose|pulse
f-sad|SAD|open|frown|worried|tears|blue|float
f-cry|CRYING|closed|wail|worried|tears|blue|shake
f-mad|MAD|open|clench|angry|anger|red|shake
f-shock|SHOCKED|wide|gasp|up|exclaim|orange|pop
f-sleepy|SLEEPY|sleepy|flat|none|zzz|slate|float
f-cool|COOL|shades|smirk|none|none|blue|nod
f-shy|SHY|closed|smile|worried|sparkles|rose|wiggle
f-confused|CONFUSED|side|flat|up|question|violet|wiggle
f-hype|HYPE!|star|grin|up|sparkles|gold|bounce
f-proud|PROUD|happy|smile|up|trophy|green|pop
f-tired|TIRED|sleepy|frown|worried|coffee|slate|float
f-scared|SCARED|wide|clench|worried|sweat|slate|shake
f-silly|SILLY|wink|tongue|none|none|lime|wiggle
f-blush|AWWW|closed|smile|none|hearts|rose|pulse
f-bored|BORED|side|flat|none|none|slate|nod
f-nervous|NERVOUS|wide|clench|worried|sweat|orange|shake
f-vibing|VIBING|closed|smile|none|sparkles|violet|nod`) },
];

export const ALL_STICKERS = PACKS.flatMap((p) => p.items.map((s) => ({ ...s, pack: p.id })));
const BY_ID = Object.fromEntries(ALL_STICKERS.map((s) => [s.id, s]));
export const STICKER_PREFIX = 'st:';
export const isStickerMsg = (t) => typeof t === 'string' && t.startsWith(STICKER_PREFIX) && !!BY_ID[t.slice(STICKER_PREFIX.length)];
export const stickerById = (id) => BY_ID[id] || null;
export const stickerMsg = (id) => `${STICKER_PREFIX}${id}`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The sticker as an SVG string. `animate` adds the CSS classes that make it move (see styles/stickers.css).
const cache = {};
export function stickerSvg(id) {
  if (cache[id]) return cache[id];
  const s = BY_ID[id];
  if (!s) return '';
  const [light, dark] = PAL[s.pal] || PAL.violet;
  const cap = esc(s.cap);
  const fs = cap.length <= 7 ? 15 : cap.length <= 11 ? 13.5 : cap.length <= 14 ? 11.5 : cap.length <= 18 ? 10 : 8.8;
  const w = Math.min(118, Math.round(cap.length * fs * 0.64 + 18));
  const gid = `sk-g-${s.pal}`;
  const cheeks = HAPPY_MOUTH.has(s.mouth) || s.eyes === 'heart' ? `<ellipse cx="33" cy="64" rx="6.500" ry="4.500" fill="#FF6F91" opacity=".5"/><ellipse cx="87" cy="64" rx="6.500" ry="4.500" fill="#FF6F91" opacity=".5"/>` : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -14 124 134" class="stk-svg" role="img" aria-label="${cap}">`
    + `<defs><radialGradient id="${gid}" cx=".34" cy=".26" r=".85"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></radialGradient></defs>`
    + (BACK[s.prop] ? BACK[s.prop]() : '')
    + `<g class="sa sa-${s.anim}">`
    + `<circle cx="60" cy="54" r="44" fill="url(#${gid})" stroke="#fff" stroke-width="6"/>`
    + `<ellipse cx="42" cy="27" rx="15" ry="7" fill="#fff" opacity=".38" transform="rotate(-25 42 27)"/>`
    + cheeks + eyesSvg(s.eyes, dark) + (BROWS[s.brows] || '') + (MOUTH[s.mouth] || '')
    + (FRONT[s.prop] ? FRONT[s.prop]() : '')
    + `</g>`
    + `<g><rect x="${60 - w / 2}" y="93" width="${w}" height="21" rx="10.5" fill="${dark}" stroke="#fff" stroke-width="3.500"/>`
    + `<text x="60" y="${93 + 10.5 + fs * 0.35}" font-size="${fs}" font-weight="900" fill="#fff" text-anchor="middle" font-family="system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif" letter-spacing=".3">${cap}</text></g>`
    + `</svg>`;
  cache[id] = svg;
  return svg;
}

// A still copy for painting onto a canvas (animation classes do nothing there).
export const stickerDataUrl = (id) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(stickerSvg(id))}`;
