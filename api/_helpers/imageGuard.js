// Photo rules on the server. No AI is used.
// The photo itself is checked on the student's phone (skin-colour check + NSFWJS + Tesseract OCR, see src/utils/imageGuard.js).
// The phone sends back its verdict (`scan`) and the words it read from the picture (`ocr`). Here we:
//   - refuse anything the phone flagged,
//   - run the words read from the picture through the same word filter as statuses (a second, server-side check),
//   - keep photos the phone could NOT check ("unchecked") to the poster's squads only, and mark them so the admin sees "not scanned".
import { checkText } from "./contentGuard.js";

export function judgePhoto(b) {
  const claim = ["clean", "unchecked", "flagged"].includes(b && b.scan) ? b.scan : "unchecked";
  if (claim === "flagged") return { ok: false, error: "That photo can't be posted on EliteScholars. Please choose a different one.", flag: "photo:flagged" };
  const ocr = String((b && b.ocr) || "").slice(0, 1500);
  if (ocr) {
    const g = checkText(ocr, { mode: "image" });
    if (!g.ok) return { ok: false, error: g.flag === "scam" ? "That photo has words that look like a money, betting or exam-leak offer. It can't be posted." : "That photo can't be posted on EliteScholars. Please choose a different one.", flag: `photo:${g.flag}` };
  }
  return { ok: true, scan: claim, forceSquad: claim !== "clean" };
}
