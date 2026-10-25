// Tiny image store for statuses and squad chat. Images are compressed in the
// browser; the server only checks type and size, then keeps them in `media`.
const MAX_BYTES = 230 * 1024;
const RE = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/;

export function checkImage(dataUrl) {
  const m = RE.exec(String(dataUrl || ""));
  if (!m) return { ok: false, error: "That image isn't supported." };
  const bytes = Math.floor((m[2].length * 3) / 4);
  if (bytes > MAX_BYTES) return { ok: false, error: "That image is too big. Try a smaller one." };
  return { ok: true };
}

export async function saveMedia(sb, email, dataUrl) {
  const c = checkImage(dataUrl);
  if (!c.ok) return { error: c.error };
  const { data, error } = await sb.from("media").insert({ email, data: dataUrl }).select("id").single();
  if (error) { console.error("[media] insert", error.message); return { error: "Could not save the image." }; }
  return { id: data.id };
}

// Voice notes: small compressed audio (about 3 KB per second, 90 s max), stored in the same table.
const MAX_AUDIO = 420 * 1024;
const AUDIO_RE = /^data:audio\/(webm|mp4|ogg|mpeg|aac|x-m4a)(;codecs=[A-Za-z0-9.,=_-]+)?;base64,([A-Za-z0-9+/=]+)$/;
export async function saveAudio(sb, email, dataUrl) {
  const m = AUDIO_RE.exec(String(dataUrl || ""));
  if (!m) return { error: "That voice note isn't supported." };
  if (Math.floor((m[3].length * 3) / 4) > MAX_AUDIO) return { error: "That voice note is too long. Keep it under 90 seconds." };
  const { data, error } = await sb.from("media").insert({ email, data: dataUrl }).select("id").single();
  if (error) { console.error("[media] audio insert", error.message); return { error: "Could not save the voice note." }; }
  return { id: data.id };
}
