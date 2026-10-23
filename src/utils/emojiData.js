// A full emoji keyboard, built from Unicode ranges (kept to real emoji glyphs) so we don't ship a giant list.
const EP = /\p{Emoji_Presentation}/u;
const range = (a, b) => { const out = []; for (let c = a; c <= b; c++) { const ch = String.fromCodePoint(c); if (EP.test(ch)) out.push(ch); } return out; };
const list = (...rs) => rs.flatMap(([a, b]) => range(a, b));

const SMILEYS = list([0x1F600, 0x1F64F], [0x1F910, 0x1F92F], [0x1F970, 0x1F97A], [0x1F9D0, 0x1F9D0]);
const GESTURES = ['👍', '👎', '👏', '🙌', '🤝', '🙏', '💪', '🤞', '✌️', '🤟', '🤘', '👌', '🤌', '👈', '👉', '👆', '👇', '☝️', '✋', '🤚', '🖐️', '👋', '🤙', '✍️', '🫶', '🫡', '🫰', '🫵', '👀', '🧠', '🫂', '👊', '✊'];
const HEARTS = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💯', '💢', '💥', '💫', '💦', '💨', '🔥', '✨', '⭐', '🌟', '⚡', '🎉', '🎊'];
const PEOPLE = list([0x1F466, 0x1F487], [0x1F9D1, 0x1F9DF]);
const ANIMALS = list([0x1F400, 0x1F43E], [0x1F980, 0x1F9AE]);
const NATURE = list([0x1F330, 0x1F37F].map((x, i) => (i ? 0x1F34F : x)), [0x1F300, 0x1F32C]);
const FOOD = list([0x1F345, 0x1F37F], [0x1F950, 0x1F96B], [0x1F9C0, 0x1F9CB]);
const ACTIVITY = list([0x1F383, 0x1F3CA], [0x1F93A, 0x1F94F], [0x26BD, 0x26BE]);
const TRAVEL = list([0x1F680, 0x1F6C5], [0x1F3E0, 0x1F3F0], [0x1F688, 0x1F69E]);
const OBJECTS = list([0x1F4A1, 0x1F4FF], [0x1F50A, 0x1F52E], [0x1F9E0, 0x1F9FF]).concat(['📚', '📝', '✏️', '📖', '🎓', '🏫', '🧮', '🔬', '🔭']);
const SYMBOLS = list([0x1F500, 0x1F53D], [0x2705, 0x2705], [0x274C, 0x274E], [0x2753, 0x2757]);
const FLAGS = ['🇳🇬', '🇬🇭', '🇿🇦', '🇰🇪', '🇬🇧', '🇺🇸', '🇨🇦', '🇫🇷', '🇩🇪', '🇧🇷', '🇮🇳', '🇨🇳', '🇯🇵', '🇦🇪', '🇸🇦', '🇪🇬', '🇲🇦', '🇸🇳', '🇨🇲', '🇪🇹', '🏁', '🚩', '🏳️', '🏴', '🏳️‍🌈'];

const uniq = (a) => [...new Set(a)];
export const EMOJI_GROUPS = [
  { id: 'smile', icon: '😀', name: 'Smileys', items: uniq(SMILEYS) },
  { id: 'hand', icon: '👍', name: 'Hands', items: uniq(GESTURES) },
  { id: 'heart', icon: '❤️', name: 'Hearts', items: uniq(HEARTS) },
  { id: 'people', icon: '🧑', name: 'People', items: uniq(PEOPLE) },
  { id: 'animal', icon: '🐶', name: 'Animals', items: uniq(ANIMALS) },
  { id: 'nature', icon: '🌳', name: 'Nature', items: uniq(NATURE) },
  { id: 'food', icon: '🍔', name: 'Food', items: uniq(FOOD) },
  { id: 'act', icon: '⚽', name: 'Activities', items: uniq(ACTIVITY) },
  { id: 'travel', icon: '🚗', name: 'Travel', items: uniq(TRAVEL) },
  { id: 'obj', icon: '💡', name: 'Objects', items: uniq(OBJECTS) },
  { id: 'sym', icon: '✅', name: 'Symbols', items: uniq(SYMBOLS) },
  { id: 'flag', icon: '🇳🇬', name: 'Flags', items: FLAGS },
].filter((g) => g.items.length);
export const REACTION_EMOJI = ['👍', '❤️', '😂', '😮', '😢', '🙏', '🔥', '👏'];
