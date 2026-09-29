// ============================================================================
// SOUND ENGINE
// ============================================================================

let _audioCtx = null;

function getAudioCtx() {
  if (!_audioCtx) {
    try {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {}
  }
  return _audioCtx;
}

function playTone(frequency, duration, type = 'sine', volume = 0.18, delay = 0) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.04);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + 0.05);
  } catch (e) {}
}

export const SFX = {
  intro: () => {
    playTone(80, 0.35, 'sine', 0.22, 0.0);
    playTone(120, 0.3, 'sine', 0.18, 0.1);
    [196, 246, 294, 349, 392, 494, 587, 698, 784].forEach((f, i) => {
      playTone(f, 0.1, 'sine', 0.14, 0.35 + i * 0.07);
    });
    playTone(784, 0.45, 'sine', 0.2, 1.05);
    playTone(988, 0.45, 'sine', 0.16, 1.05);
    playTone(1175, 0.45, 'sine', 0.12, 1.05);
    playTone(1568, 0.18, 'sine', 0.14, 1.52);
    playTone(1976, 0.22, 'sine', 0.1, 1.68);
  },
  select: () => playTone(600, 0.07, 'sine', 0.12),
  wrong: () => { playTone(300, 0.18, 'sawtooth', 0.14, 0); playTone(220, 0.28, 'sawtooth', 0.1, 0.15); },
  correct: () => { playTone(523, 0.12, 'sine', 0.16, 0); playTone(659, 0.12, 'sine', 0.16, 0.1); playTone(784, 0.22, 'sine', 0.18, 0.2); },
  roundComplete: () => {
    playTone(523, 0.1, 'sine', 0.2, 0.0);
    playTone(659, 0.1, 'sine', 0.2, 0.1);
    playTone(784, 0.1, 'sine', 0.2, 0.2);
    playTone(1047, 0.1, 'sine', 0.2, 0.3);
    playTone(1047, 0.4, 'sine', 0.18, 0.42);
    playTone(784, 0.3, 'sine', 0.15, 0.55);
  },
  timerWarn: () => playTone(880, 0.05, 'square', 0.08),
  submit: () => { playTone(440, 0.08, 'sine', 0.13); playTone(550, 0.08, 'sine', 0.1, 0.06); },
  splash: () => {
    playTone(1047, 0.5, 'sine', 0.06, 0.0);
    playTone(1319, 0.5, 'sine', 0.05, 0.1);
    playTone(1568, 0.5, 'sine', 0.05, 0.2);
    playTone(523, 0.4, 'sine', 0.1, 0.4);
    playTone(659, 0.4, 'sine', 0.11, 0.65);
    playTone(784, 0.4, 'sine', 0.12, 0.9);
    playTone(1047, 0.5, 'sine', 0.13, 1.15);
    playTone(523, 0.7, 'sine', 0.1, 1.4);
    playTone(659, 0.7, 'sine', 0.09, 1.42);
    playTone(784, 0.7, 'sine', 0.09, 1.44);
    playTone(1047, 1.0, 'sine', 0.14, 1.8);
    playTone(784, 0.9, 'sine', 0.08, 1.9);
  },
};

// Add speech functions here
export function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.95;
  utter.pitch = 1.0;
  utter.volume = 1;
  const trySpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = ['Google UK English Male', 'Microsoft David Desktop', 'Microsoft Mark Desktop', 'Daniel', 'Fred', 'Thomas', 'Arthur', 'Google US English', 'Alex'];
    const male = voices.find(v => preferred.some(p => v.name.includes(p))) || voices.find(v => v.name.toLowerCase().includes('male')) || null;
    if (male) utter.voice = male;
    window.speechSynthesis.speak(utter);
  };
  if (window.speechSynthesis.getVoices().length > 0) trySpeak();
  else window.speechSynthesis.onvoiceschanged = trySpeak;
  return utter;
}

export function stopSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}
