// Voice notes: record with the phone's microphone (MediaRecorder), small and compressed (about 3 KB per second).
const TYPES = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus', 'audio/webm'];
export const MAX_VOICE_SECS = 90;

export const voiceSupported = () => typeof window !== 'undefined' && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);

const toDataUrl = (blob) => new Promise((res, rej) => { const r = new FileReader(); r.onloadend = () => res(String(r.result)); r.onerror = rej; r.readAsDataURL(blob); });

// Starts recording. Returns { stop(): Promise<{dataUrl, secs}|null>, cancel() } or throws if the mic is blocked.
export async function startRecording(onTick, onAutoStop) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  const type = TYPES.find((t) => { try { return window.MediaRecorder.isTypeSupported(t); } catch { return false; } }) || '';
  const rec = new window.MediaRecorder(stream, type ? { mimeType: type, audioBitsPerSecond: 24000 } : { audioBitsPerSecond: 24000 });
  const chunks = [];
  rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
  const t0 = Date.now();
  let timer = setInterval(() => {
    const s = Math.floor((Date.now() - t0) / 1000);
    if (onTick) onTick(s);
    if (s >= MAX_VOICE_SECS && onAutoStop) onAutoStop();
  }, 250);
  rec.start(250);
  const release = () => { clearInterval(timer); timer = null; try { stream.getTracks().forEach((t) => t.stop()); } catch { /* ignore */ } };
  return {
    stop: () => new Promise((resolve) => {
      rec.onstop = async () => {
        release();
        const secs = Math.max(1, Math.round((Date.now() - t0) / 1000));
        if (!chunks.length || Date.now() - t0 < 600) { resolve(null); return; }
        try { resolve({ dataUrl: await toDataUrl(new Blob(chunks, { type: rec.mimeType || type || 'audio/webm' })), secs: Math.min(secs, MAX_VOICE_SECS) }); } catch { resolve(null); }
      };
      try { rec.stop(); } catch { release(); resolve(null); }
    }),
    cancel: () => { try { rec.onstop = null; rec.stop(); } catch { /* ignore */ } release(); },
  };
}
