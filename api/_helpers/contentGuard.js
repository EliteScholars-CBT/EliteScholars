// Simple, fast checks for text students post publicly (statuses). Not a replacement for human review:
// it blocks the obvious things (links, phone numbers, money/scam hooks, explicit words) and the rest
// goes to the Admin → Status monitor.
const LINK = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|ng|co|io|me|ly|gl|link|xyz|app|site|click|info|biz|top|vip)\b|\b(t\.me|wa\.me|bit\.ly|tinyurl|chat\.whatsapp|telegram\.me)\b)/i;
const PHONE = /(\+?\d[\d\s().-]{8,}\d)/;
const MONEY = /\b(invest(ment|ing)?|double (your )?(money|investment)|forex|bitcoin|btc|crypto( signals?)?|binary option|ponzi|mmm|giveaway|send (me )?(money|cash|₦|naira)|loan( offer)?|cashapp|paypal|payment proof|get rich|earn \$?\d+|₦\s?\d{3,}\s?(daily|weekly)|bvn|otp|atm pin|account number|dm (me )?(to|for)|whatsapp me|inbox me|hack(ing|er)?|cheat code|jamb (runz|expo)|exam (runz|expo|leak)|expo(sure)? (link|group)|leaked (questions|paper))\b/i;
const EXPLICIT = /\b(nude|nudes|naked|porn|sex ?tape|xxx|onlyfans|sext|horny|erotic|escort|hookup|hook-up|sugar (daddy|mummy|mommy)|boobs|dick|pussy|fuck|fucking|bitch)\b/i;

export function checkText(text) {
  const t = String(text || "");
  if (!t.trim()) return { ok: true };
  if (EXPLICIT.test(t)) return { ok: false, flag: "explicit", message: "That isn't allowed on EliteScholars. Please keep statuses clean and respectful." };
  if (MONEY.test(t)) return { ok: false, flag: "scam", message: "Statuses can't include money offers, investment hooks or exam-leak ads." };
  if (LINK.test(t)) return { ok: false, flag: "link", message: "Statuses can't include links. Share study wins and tips instead." };
  if (PHONE.test(t)) return { ok: false, flag: "phone", message: "Please don't put phone numbers in a status." };
  return { ok: true };
}
