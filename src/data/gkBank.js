import { GK_EXTRA } from './gkBankPlus';
// A broad general-knowledge bank — deliberately NOT tied to school subjects.
// Spans sports, geography, science, history, entertainment, nature and
// Nigeria-specific trivia. Items with an `emoji` are eligible for Picture
// Round; all items are eligible for Scramble and Memory Match.
export const GK_BANK = [
  // Sports
  { term: 'Football',   clue: 'The world\'s most popular sport, played with a round ball and two goals', category: 'Sports', emoji: '⚽' },
  { term: 'Basketball', clue: 'A sport where players score by shooting a ball through a hoop', category: 'Sports', emoji: '🏀' },
  { term: 'Tennis',     clue: 'A racket sport played across a net, scored in games and sets', category: 'Sports', emoji: '🎾' },
  { term: 'Boxing',     clue: 'A combat sport decided by punches, rounds and a referee', category: 'Sports', emoji: '🥊' },
  { term: 'Cricket',    clue: 'A bat-and-ball sport popular in England, India and the Caribbean', category: 'Sports', emoji: '🏏' },
  { term: 'Volleyball', clue: 'A sport where two teams hit a ball over a net without letting it touch the ground', category: 'Sports', emoji: '🏐' },
  { term: 'Marathon',   clue: 'A long-distance race of 42.195 kilometres', category: 'Sports' },
  { term: 'Olympics',   clue: 'A global multi-sport event held every four years', category: 'Sports', emoji: '🥇' },
  { term: 'Eagles',     clue: "Nickname of Nigeria's national football team", category: 'Sports', emoji: '🦅' },
  { term: 'Referee',    clue: 'The official who enforces the rules during a match', category: 'Sports' },
  { term: 'Wrestling',  clue: 'A combat sport where competitors try to pin their opponent', category: 'Sports', emoji: '🤼' },
  { term: 'Swimming',   clue: 'A sport and skill of moving through water using the arms and legs', category: 'Sports', emoji: '🏊' },

  // Science
  { term: 'Photosynthesis', clue: 'How green plants manufacture their own food using sunlight', category: 'Science' },
  { term: 'Evaporation', clue: 'The process by which water changes from liquid to gas', category: 'Science' },
  { term: 'Condensation', clue: 'The process by which gas changes back into liquid', category: 'Science' },
  { term: 'Osmosis',     clue: 'Movement of water across a semi-permeable membrane', category: 'Science' },
  { term: 'Respiration', clue: 'Breaking down glucose to release energy in cells', category: 'Science' },
  { term: 'Nitrogen',    clue: "The most abundant gas in the Earth's atmosphere", category: 'Science' },
  { term: 'Pancreas',    clue: 'The organ that produces insulin in the human body', category: 'Science' },
  { term: 'Gold',        clue: 'The metal with the chemical symbol Au', category: 'Science' },
  { term: 'Gravity',     clue: 'The force that pulls objects toward the Earth', category: 'Science' },
  { term: 'Volcano',     clue: 'A mountain that can erupt with lava, ash and gas', category: 'Science', emoji: '🌋' },
  { term: 'Robot',       clue: 'A programmable machine that can carry out tasks automatically', category: 'Technology', emoji: '🤖' },
  { term: 'Rocket',      clue: 'A vehicle powered by engines that can travel to space', category: 'Technology', emoji: '🚀' },
  { term: 'Telescope',   clue: 'An instrument used to see faraway objects like stars and planets', category: 'Technology', emoji: '🔭' },
  { term: 'Microscope',  clue: 'An instrument used to see extremely small objects', category: 'Science', emoji: '🔬' },

  // Geography / Nigeria
  { term: 'Abuja',       clue: 'The capital city of Nigeria', category: 'Nigeria' },
  { term: 'Lagos',       clue: 'The Nigerian state known as the "Centre of Excellence"', category: 'Nigeria' },
  { term: 'Naira',       clue: "Nigeria's official currency", category: 'Nigeria' },
  { term: 'Sahara',      clue: "The world's largest hot desert, found in Africa", category: 'Geography' },
  { term: 'Nile',        clue: 'The longest river in Africa', category: 'Geography' },
  { term: 'Everest',     clue: "The world's tallest mountain above sea level", category: 'Geography' },
  { term: 'Amazon',      clue: "The world's largest rainforest, found in South America", category: 'Geography' },
  { term: 'Pacific',     clue: "The largest and deepest of the world's oceans", category: 'Geography' },

  // History
  { term: 'Independence', clue: "Nigeria gained this from Britain in 1960", category: 'History' },
  { term: 'Colonization', clue: 'The act of settling among and taking control of another territory', category: 'History' },
  { term: 'Democracy',    clue: 'A system of government where citizens vote for their leaders', category: 'History' },

  // Entertainment
  { term: 'Nollywood',   clue: "The nickname for Nigeria's film industry", category: 'Entertainment' },
  { term: 'Guitar',      clue: 'A stringed musical instrument played by strumming or plucking', category: 'Entertainment', emoji: '🎸' },
  { term: 'Camera',      clue: 'A device used to capture photographs or videos', category: 'Entertainment', emoji: '📷' },

  // Nature & animals
  { term: 'Elephant',    clue: 'The largest land animal, known for its long trunk', category: 'Nature', emoji: '🐘' },
  { term: 'Giraffe',     clue: 'The tallest land animal, known for its long neck', category: 'Nature', emoji: '🦒' },
  { term: 'Crocodile',   clue: 'A large reptile that lives in rivers and lakes', category: 'Nature', emoji: '🐊' },
  { term: 'Butterfly',   clue: 'An insect known for its colourful wings and metamorphosis', category: 'Nature', emoji: '🦋' },
  { term: 'Tiger',       clue: 'A large striped wild cat found mostly in Asia', category: 'Nature', emoji: '🐯' },
  { term: 'Zebra',       clue: 'An African animal known for its black and white stripes', category: 'Nature', emoji: '🦓' },
  { term: 'Penguin',     clue: 'A flightless bird that swims well and lives in cold climates', category: 'Nature', emoji: '🐧' },
  { term: 'Dolphin',     clue: 'A highly intelligent marine mammal known for its playfulness', category: 'Nature', emoji: '🐬' },
  { term: 'Kangaroo',    clue: 'An Australian animal known for hopping and carrying its young in a pouch', category: 'Nature', emoji: '🦘' },
  { term: 'Rainbow',     clue: 'An arc of colours that appears in the sky after rain', category: 'Nature', emoji: '🌈' },
  { term: 'Cactus',      clue: 'A spiky plant that stores water and thrives in the desert', category: 'Nature', emoji: '🌵' },
];


// Everything, with the original simple items tagged easy.
export const GK_ALL = [...GK_BANK.map((x) => ({ ...x, lvl: 'e' })), ...GK_EXTRA];

// The pool a game draws from. Easy: simple + medium. Medium: everything. Hard: hard + medium (nothing easy).
export function bankFor(difficulty) {
  if (difficulty === 'easy') return GK_ALL.filter((x) => x.lvl !== 'h');
  if (difficulty === 'hard') return GK_ALL.filter((x) => x.lvl !== 'e');
  return GK_ALL;
}
