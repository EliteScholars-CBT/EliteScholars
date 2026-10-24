// Word / text checks for anything students post (statuses, replies, chat, and the words read out of photos).
// No AI: plain rules that are hard to dodge. Text is first cleaned so tricks do not work:
//   capital letters, accents, look-alike letters (а in Cyrillic), numbers for letters (p0rn, s3x),
//   letters stretched (fuuuck), spaces or dots between letters (f u c k, s.e.x), words written in digits.
// modes: "status" (default, strictest: no links or phone numbers), "chat" (private squads: explicit + scam only),
//        "image" (words OCR-read from a picture).

const HOMO = { "а": "a", "е": "e", "о": "o", "р": "p", "с": "c", "х": "x", "у": "y", "і": "i", "ѕ": "s", "ɡ": "g", "ο": "o", "ν": "v", "ı": "i", "ⅼ": "l" };
const LEET = { "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "8": "b", "@": "a", "$": "s", "!": "i", "|": "i", "€": "e", "£": "l", "+": "t" };

const strip = (t) => String(t || "").normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[​-‏⁠﻿­]/g, "").toLowerCase().replace(/[а-яіѕɡοινı]/g, (c) => HOMO[c] || c);
const leet = (s) => s.replace(/[01345878@$!|€£+]/g, (c) => LEET[c] || c);

// "f u c k", "s . e . x" -> "fuck", "sex" (only runs of single characters are joined)
const joinSingles = (s) => s.replace(/(?:^|\s)((?:[a-z][\s._\-*]+){2,}[a-z])(?=\s|$)/g, (m, g) => ` ${g.replace(/[\s._\-*]+/g, "")}`);

// a pattern for a word that survives stretched letters, masked vowels (f*ck) and 1-2 separators between letters
const VOW = "aeiou";
const flex = (w) => "(?<![a-z])" + w.split("").map((c) => (VOW.includes(c) ? `[${c}*#]+` : `${c}+`)).join("[\\s._\\-*]{0,2}") + "(?![a-z])";
const flexAll = (words) => new RegExp(words.map(flex).join("|"));

const EXPLICIT = flexAll(["nude", "nudes", "naked", "porn", "porno", "pornhub", "xvideos", "xxx", "onlyfans", "sexting", "sext", "sextape", "horny", "sexy", "erotic", "escort", "escorts", "hookup", "boobs", "tits", "dick", "pussy", "fuck", "fucking", "fucker", "motherfucker", "bitch", "bitches", "whore", "slut", "ashawo", "oloshi", "blowjob", "handjob", "cumshot", "nigger", "nigga", "faggot", "masturbate", "masturbation", "rape", "rapist", "milf", "nsfw", "stripper", "hentai"]);
const EXPLICIT_PLAIN = /(?<![a-z])(sex ?(tape|chat|video|vid|cam)|sugar (daddy|mummy|mommy)|send nudes?|naked pic(ture)?s?|nude pic(ture)?s?|runs girl|hook ?up|adult (video|content)|sleep with me|kill (your|my)self)(?![a-z])/;

const SCAM_WORDS = flexAll(["forex", "bitcoin", "btc", "ethereum", "crypto", "binary", "ponzi", "mmm", "giveaway", "cashapp", "paypal", "bvn", "otp", "yahoo", "bet9ja", "sportybet", "1xbet", "betway", "nairabet", "msport", "baba ijebu", "runz", "expo"]);
const SCAM_PLAIN = [
  /(?<![a-z])invest(ing|ment|ments)? (now|today|with (me|us)|and (earn|get|win)|in (forex|crypto|bitcoin|my|our))/,
  /(?<![a-z])(double|triple|multiply|10x|5x) (your |ur )?(money|investment|capital|funds)/,
  /(?<![a-z])(get|become|be|go) rich(?![a-z])/, /(?<![a-z])(make|earn|making|earning) (money|cash|n\d|₦|\$|#)/,
  /(?<![a-z])(earn|win|get) ?[n₦#$]?\s?\d[\d,.]*\s?(k|m|000)?\s?(daily|weekly|monthly|every ?day|per day|a day|a week)/,
  /(?<![a-z])[n₦#]\s?\d[\d,.]*\s?(k|m)?\s?(daily|weekly|monthly|per day|a day|a week)/,
  /(?<![a-z])(send|transfer|dm|pay|give) (me|us)? ?(money|cash|₦|naira|your (account|bvn|otp|pin|password|details))/,
  /(?<![a-z])(quick|instant|easy|fast|urgent|cheap) loans?(?![a-z])|(?<![a-z])loans? (offer|available|approved|without|in \d)/,
  /(?<![a-z])(payment|payout|cashout|cash out) proofs?/, /(?<![a-z])(atm|card) pin|account (number|details)|bank details|(?<![a-z])cvv(?![a-z])/,
  /(?<![a-z])(dm|inbox|text|call|chat|whatsapp|message|contact) (me|us)( now| today| for| on| to| via)?(?![a-z])/,
  /(?<![a-z])(click|tap|check|open) (the )?(link|bio|below)|link in (my )?(bio|status|description|comment)/,
  /(?<![a-z])hack(ing|er|ers)? (service|your|any|whatsapp|facebook|instagram|account|phone|grades?|result)|hire a hacker|(?<![a-z])spy (app|on)/,
  /(?<![a-z])(sure|fixed|guaranteed|banker) (odds|match(es)?|games?|tips?|win)|betting (tips|code)|booking code/,
  /(?<![a-z])(free|win|claim|get) (data|airtime|recharge|\d+ ?gb)(?![a-z])|(?<![a-z])(cbn|fg|npower|n-power|nysc|federal government) (grant|loan|empowerment)|(?<![a-z])(verify|claim) (your )?(grant|prize|reward)/,
  /(?<![a-z])(jamb|waec|neco|nabteb|post ?utme|ssce)\s?(runs?|runz|expo|answers?|leak|leaked|questions? (for sale|leak)|special)|(?<![a-z])(exam|mock|lazy) ?(runs?|runz|expo)|(?<![a-z])leaked (questions|paper|answers?)|(?<![a-z])(answers?|questions?) (for sale|available|loading)|pay (for|to see) (answers|result)|(?<![a-z])(change|upgrade|increase) (your )?(jamb|waec|neco) (score|result)/,
  /(?<![a-z])(buy|sell|selling|buying) (followers|likes|accounts?|data|gift ?cards?|bitcoin|usdt)/, /(?<![a-z])(usdt|gift ?card|binance|trust ?wallet|airdrop|nft)(?![a-z])/,
  /(?<![a-z])(onlinebet|casino|jackpot|lottery|winner winner)(?![a-z])/,
];
const LINK_STRICT = /(https?:\/\/|www\.|\bt\.me\b|\bwa\.me\b|bit\.ly|tinyurl|chat\.whatsapp|telegram\.me|linktr\.ee|[a-z0-9-]{2,}\.(com|ng|net|org)(\/|\b))/;
const LINK_LOOSE = /(https?:\/\/|www\.|\bt\.me\b|\bwa\.me\b|bit\.ly|tinyurl|chat\.whatsapp|telegram\.me|linktr\.ee|[a-z0-9-]{2,}\.(com|net|org|ng|co|io|me|ly|gl|link|xyz|app|site|click|info|biz|top|vip|tk|cc)(\/|\b)|\bdot\s?(com|ng|net|org)\b|\bw\s?w\s?w\b)/;
const DIGIT_WORDS = { zero: "0", oh: "0", o: "0", one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7", eight: "8", nine: "9", double: "", triple: "" };

// digits written as words ("zero eight zero one ...") or with spaces/dots, then look for a phone number
const digitsOf = (lower) => {
  const words = lower.replace(/[^a-z0-9+\s]/g, " ").split(/\s+/).filter(Boolean);
  let out = "";
  let run = "";
  const flush = () => { out += (run.length >= 9 ? run + " " : " "); run = ""; };
  for (const w of words) {
    if (/^\+?\d+$/.test(w)) run += w.replace(/\D/g, "");
    else if (DIGIT_WORDS[w] !== undefined && w !== "o" && w !== "oh") run += DIGIT_WORDS[w];
    else flush();
  }
  flush();
  return out;
};
const PHONE = /(?:\+?234|0)[789][01]\d{8}|\b\d{10,13}\b/;

export function checkText(raw, { mode = "status" } = {}) {
  const original = String(raw || "");
  if (!original.trim()) return { ok: true };
  const lower = strip(original);
  const lt = leet(lower);
  const views = [...new Set([lower, lt, joinSingles(lower), joinSingles(lt)])];
  const nostretch = views.map((v) => v.replace(/(.)\1{2,}/g, "$1$1"));
  const all = [...views, ...nostretch];
  const bad = (re) => all.some((v) => re.test(v));

  if (bad(EXPLICIT) || bad(EXPLICIT_PLAIN)) return { ok: false, flag: "explicit", message: "That isn't allowed on EliteScholars. Please keep things clean and respectful." };
  const scam = bad(SCAM_WORDS) || SCAM_PLAIN.some((re) => all.some((v) => re.test(v)));
  if (scam) return { ok: false, flag: "scam", message: "Money offers, betting, investment hooks and exam-leak ads aren't allowed on EliteScholars." };
  if (mode !== "chat") {
    if (all.some((v) => (mode === "image" ? LINK_STRICT : LINK_LOOSE).test(v))) return { ok: false, flag: "link", message: "Links aren't allowed here. Share study wins and tips instead." };
    const d = digitsOf(lower);
    if (PHONE.test(d) || PHONE.test(original.replace(/[\s().-]/g, ""))) return { ok: false, flag: "phone", message: "Please don't put phone numbers here." };
  }
  return { ok: true };
}
