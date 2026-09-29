// ============================================================================
// voices.js — Curated 7-voice selection for TTS (3 male, 4 female)
// Maps device voices to named characters with English names.
// Falls back gracefully if specific voices aren't available.
// ============================================================================

// Named characters: 4 female, 3 male
export const VOICE_CHARACTERS = [
  // Female voices
  { id: 'sophia',   name: 'Sophia',   gender: 'female', keywords: ['Samantha', 'Google UK English Female', 'Microsoft Zira', 'Karen', 'Victoria', 'female', 'girl', 'woman', 'en-GB', 'en-AU', 'Fiona', 'Moira'] },
  { id: 'emily',    name: 'Emily',    gender: 'female', keywords: ['Google US English', 'Microsoft Aria', 'Susan', 'Allison', 'Ava', 'en-US'] },
  { id: 'olivia',   name: 'Olivia',   gender: 'female', keywords: ['Google Australian English', 'Karen', 'Catherine', 'Veena', 'en-AU'] },
  { id: 'charlotte',name: 'Charlotte', gender: 'female', keywords: ['Microsoft Hazel', 'Alice', 'en-GB', 'UK', 'British'] },
  // Male voices
  { id: 'james',    name: 'James',    gender: 'male',   keywords: ['Google UK English Male', 'Microsoft David', 'Daniel', 'Tom', 'en-GB', 'UK', 'British', 'male'] },
  { id: 'oliver',   name: 'Oliver',   gender: 'male',   keywords: ['Microsoft Mark', 'Alex', 'Fred', 'Ralph', 'en-US', 'Thomas'] },
  { id: 'william',  name: 'William',  gender: 'male',   keywords: ['Google US English Male', 'Jorge', 'Bruce', 'male', 'en-AU'] },
];

/**
 * Given the list of available SpeechSynthesisVoice objects,
 * return an array of up to 7 mapped character voices.
 *
 * @param {SpeechSynthesisVoice[]} availableVoices
 * @returns {{ id, name, gender, voice: SpeechSynthesisVoice|null }[]}
 */
export function mapToCharacterVoices(availableVoices) {
  if (!availableVoices?.length) return [];

  // Only English voices
  const englishVoices = availableVoices.filter((v) =>
    v.lang?.startsWith('en') || !v.lang
  );
  const allVoices = englishVoices.length > 0 ? englishVoices : availableVoices;

  const usedVoiceNames = new Set();
  const result = [];

  for (const char of VOICE_CHARACTERS) {
    // Try to find a matching voice by keyword
    let matched = null;
    for (const kw of char.keywords) {
      const found = allVoices.find(
        (v) => v.name.toLowerCase().includes(kw.toLowerCase()) && !usedVoiceNames.has(v.name)
      );
      if (found) { matched = found; break; }
    }

    // If no match, pick any unused English voice that roughly matches gender
    if (!matched) {
      const fallback = allVoices.find(
        (v) => !usedVoiceNames.has(v.name)
      );
      matched = fallback || null;
    }

    if (matched) usedVoiceNames.add(matched.name);
    result.push({ ...char, voice: matched || null });
  }

  return result;
}

/**
 * Get the SpeechSynthesisVoice for a character ID.
 */
export function getVoiceForCharacter(characterId, characterVoices) {
  return characterVoices.find((c) => c.id === characterId)?.voice || null;
}
