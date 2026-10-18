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

const SUP = { '²': ' squared', '³': ' cubed' };

// Order matters: earlier rules run first.
const RULES = [
  [/(\d)\s*°\s*C\b/g, '$1 degrees Celsius'],
  [/(\d)\s*°\s*F\b/g, '$1 degrees Fahrenheit'],
  [/(\d)\s*°/g, '$1 degrees'],
  [/[²³]/g, (m) => SUP[m]],
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
  for (const [re, rep] of RULES) s = s.replace(re, rep);
  return s.replace(/\s+/g, ' ').trim();
}
