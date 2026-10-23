// Looks at a photo with the AI key pool before it is shown to anyone: nudity, sexual content, scam / money-hook
// text inside the picture, graphic violence. Returns { checked, ok, reason }.
//   checked:false  -> no AI key answered, caller decides what to do (statuses refuse, chat lets it through)
import { generate, aiConfigured } from "./aiPool.js";

const SYSTEM = `You are a strict safety reviewer for a student exam-prep app used by teenagers in Nigeria.
Look at the picture and answer ONLY with JSON: {"nudity":bool,"sexual":bool,"scam":bool,"violence":bool,"reason":"short"}.
nudity = exposed genitals, breasts or buttocks, or see-through / underwear-only images. sexual = sexual poses or acts, even clothed.
scam = text in the picture that promotes get-rich-quick money, investment or crypto doubling, loans, "send money", betting, giveaways, hacking or fake jobs, or shows bank/phone/WhatsApp contact for such offers.
violence = graphic gore or weapons aimed at people. Normal selfies, school work, notes, books, food, memes, sport and fully clothed people are all fine (false).`;

const RE = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/;

export async function moderateImage(dataUrl) {
  const m = RE.exec(String(dataUrl || ""));
  if (!m || !aiConfigured()) return { checked: false, ok: false, reason: "no-ai" };
  try {
    let parsed = null;
    await generate({ system: SYSTEM, user: "Review this image now. JSON only.", maxTokens: 300, image: { mime: m[1], b64: m[2] } }, (txt) => {
      const j = /\{[\s\S]*\}/.exec(String(txt || ""));
      if (!j) return false;
      try { parsed = JSON.parse(j[0]); return typeof parsed === "object" && parsed !== null; } catch { return false; }
    });
    if (!parsed) return { checked: false, ok: false, reason: "unreadable" };
    const bad = parsed.nudity === true || parsed.sexual === true || parsed.scam === true || parsed.violence === true;
    const kind = parsed.nudity || parsed.sexual ? "adult" : parsed.scam ? "scam" : parsed.violence ? "violence" : "";
    return { checked: true, ok: !bad, reason: bad ? kind : "", detail: String(parsed.reason || "").slice(0, 120) };
  } catch (e) {
    console.error("[imageGuard]", e?.message);
    return { checked: false, ok: false, reason: "error" };
  }
}
