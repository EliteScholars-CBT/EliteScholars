// ============================================================================
// voices.js — six reading voices: 3 female, 3 male, each with its own pitch and pace.
// Phones only ship a few English voices, so a character = a device voice of the right
// gender + its own pitch/rate. Pitch ranges never overlap between the genders
// (female 0.98–1.4, male 0.5–0.88), so all six always sound different.
// ============================================================================

export const VOICE_CHARACTERS = [
  { id: 'sophia',    name: 'Sophia',    gender: 'female', pitch: 1.12, rate: 1.0,  trait: 'Clear and friendly' },
  { id: 'emily',     name: 'Emily',     gender: 'female', pitch: 1.38, rate: 1.06, trait: 'Bright and quick' },
  { id: 'charlotte', name: 'Charlotte', gender: 'female', pitch: 0.98, rate: 0.93, trait: 'Calm and warm' },
  { id: 'james',     name: 'James',     gender: 'male',   pitch: 0.86, rate: 1.0,  trait: 'Steady teacher' },
  { id: 'oliver',    name: 'Oliver',    gender: 'male',   pitch: 0.7,  rate: 0.94, trait: 'Deep and calm' },
  { id: 'william',   name: 'William',   gender: 'male',   pitch: 0.52, rate: 0.9,  trait: 'Very deep, slow' },
];

const F_HINT = /female|woman|girl|samantha|zira|karen|victoria|fiona|moira|aria|susan|allison|ava\b|hazel|catherine|veena|tessa|serena|jenny|libby|sonia|natasha|emma|amy|joanna|salli|kimberly|kendra|ivy|nicole|olivia|heera|neerja|ayanda|zira|siri.*female|google uk english female|google us english/i;
const M_HINT = /\bmale\b|\bman\b|david|daniel|tom\b|mark\b|alex\b|fred\b|ralph|guy\b|ryan|rishi|aaron|oliver|arthur|george|james|brian|matthew|joey|justin|russell|gordon|thomas|prabhat|ravi|christopher|eric|google uk english male/i;

const genderOf = (v) => {
  const n = v.name || '';
  if (/\bmale\b/i.test(n) && !/female/i.test(n)) return 'male';
  if (M_HINT.test(n) && !F_HINT.test(n)) return 'male';
  if (F_HINT.test(n)) return 'female';
  return 'unknown';
};

/** Map the device's voices onto the six characters. Every character gets a voice if the device has any English one. */
let _mapKey = '';
let _mapVal = [];
export function mapToCharacterVoices(availableVoices) {
  if (!availableVoices?.length) return [];
  const key = availableVoices.length + ':' + (availableVoices[0] && availableVoices[0].name) + ':' + (availableVoices[availableVoices.length - 1] && availableVoices[availableVoices.length - 1].name);
  if (key === _mapKey && _mapVal.length) return _mapVal; // cached: same voices, same mapping
  const out = mapToCharacterVoicesRaw(availableVoices);
  _mapKey = key; _mapVal = out;
  return out;
}
function mapToCharacterVoicesRaw(availableVoices) {
  const en = availableVoices.filter((v) => v.lang?.toLowerCase().startsWith('en') || !v.lang);
  const all = en.length ? en : availableVoices;
  const pool = { female: [], male: [], unknown: [] };
  all.forEach((v) => pool[genderOf(v)].push(v));
  const taken = new Set();
  const pick = (g) => {
    const lists = [pool[g], pool.unknown, g === 'female' ? pool.female : pool.male, all];
    for (const l of lists) { const v = l.find((x) => !taken.has(x.name)); if (v) { taken.add(x2(v)); return v; } }
    // device has fewer voices than characters: reuse one of the right gender (pitch still sets it apart)
    return pool[g][0] || pool.unknown[0] || all[0] || null;
  };
  const x2 = (v) => v.name;
  return VOICE_CHARACTERS.map((c) => ({ ...c, voice: pick(c.gender) }));
}

export function getVoiceForCharacter(characterId, characterVoices) {
  return characterVoices.find((c) => c.id === characterId)?.voice || null;
}
export const getCharacter = (id) => VOICE_CHARACTERS.find((c) => c.id === id) || VOICE_CHARACTERS[0];

/** Say a short sample so the student can hear a voice before choosing it. */
export function previewVoice(char, characterVoices) {
  try {
    const ss = window.speechSynthesis; if (!ss) return;
    ss.cancel();
    const u = new SpeechSynthesisUtterance(`Hi, I'm ${char.name}. Let's learn something new today.`);
    const v = getVoiceForCharacter(char.id, characterVoices);
    if (v) u.voice = v;
    u.lang = (v && v.lang) || 'en-GB';
    u.pitch = char.pitch; u.rate = 0.9 * char.rate;
    ss.speak(u);
  } catch { /* ignore */ }
}
