import React, { useState, useEffect, useRef, useCallback } from 'react';
import { addXP } from '../utils/xpManager';
import { GOLD } from '../utils/colors';
import { loadSubjectPerformance } from '../utils/storage';
import { EmojiIcon } from './Icon';

const STORY = {
  world: 'The EliteScholars Academy is under siege by the Fog of Ignorance.',
  hero: 'Kemi, a brilliant student from Lagos, must answer questions correctly to restore knowledge and defeat the fog.',
};

function pickQuestions(email) {
  const perf = loadSubjectPerformance(email) || {};
  const subjects = Object.keys(perf).filter(k => (perf[k]?.total || 0) > 0);
  if (subjects.length === 0) return null;
  return subjects;
}

function GameHud({ score, lives, timer, maxTimer, combo }) {
  const timerPct = (timer / maxTimer) * 100;
  return (
    <div className="game-hud">
      <div className="game-hud-lives">{Array.from({length: 3}).map((_,i) => (
        <span key={i} style={{fontSize:18, opacity: i < lives ? 1 : 0.2}}><EmojiIcon emoji="❤️" size="1.1em" /></span>
      ))}</div>
      <div className="game-hud-center">
        <div className="game-timer-bar">
          <div className="game-timer-fill" style={{width:`${timerPct}%`, background: timerPct < 30 ? '#EF4444' : GOLD}} />
        </div>
      </div>
      <div className="game-hud-score">
        <span className="game-score-num">{score}</span>
        {combo > 1 && <span className="game-combo">×{combo}</span>}
      </div>
    </div>
  );
}

function FlashGame({ questions, onEnd, email, name }) {
  const [idx, setIdx]       = useState(0);
  const [lives, setLives]   = useState(3);
  const [score, setScore]   = useState(0);
  const [combo, setCombo]   = useState(1);
  const [timer, setTimer]   = useState(8);
  const [flash, setFlash]   = useState(null);
  const [done, setDone]     = useState(false);
  const timerRef = useRef(null);
  const MAX_TIMER = 8;

  const q = questions[idx];

  const nextQ = useCallback((correct) => {
    clearInterval(timerRef.current);
    if (correct) {
      const pts = 10 * combo;
      setScore(s => s + pts);
      setCombo(c => Math.min(c + 1, 5));
      setFlash('correct');
    } else {
      setLives(l => {
        const nl = l - 1;
        if (nl <= 0) { setTimeout(() => setDone(true), 500); }
        return nl;
      });
      setCombo(1);
      setFlash('wrong');
    }
    setTimeout(() => {
      setFlash(null);
      if (idx + 1 >= questions.length) { setDone(true); return; }
      setIdx(i => i + 1);
      setTimer(MAX_TIMER);
    }, 600);
  }, [combo, idx, questions.length]);

  useEffect(() => {
    if (done) return;
    setTimer(MAX_TIMER);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { nextQ(false); return MAX_TIMER; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [idx, done, nextQ]);

  useEffect(() => {
    if (done) {
      addXP(email, name, Math.round(score / 2), 'game_flash');
      onEnd(score, questions.length);
    }
  }, [done]);

  if (done) return null;

  return (
    <div className={`game-arena flash-game ${flash || ''}`}>
      <GameHud score={score} lives={lives} timer={timer} maxTimer={MAX_TIMER} combo={combo} />
      <div className="game-story-bar">
        <span className="game-story-icon"><EmojiIcon emoji="⚔️" size="1.1em" /></span>
        <span className="game-story-text">{STORY.hero}</span>
      </div>
      <div className="game-question-card">
        <div className="game-q-counter">{idx + 1} / {questions.length}</div>
        <div className="game-q-text">{q.q}</div>
      </div>
      <div className="game-options">
        {q.o.map((opt, i) => (
          <button key={i} className="game-option-btn" onClick={() => nextQ(i === q.a)}>
            <span className="game-opt-letter">{String.fromCharCode(65+i)}</span>
            <span>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MemoryGame({ questions, onEnd, email, name }) {
  const PAIRS = 6;
  const pickedQs = questions.slice(0, PAIRS);
  const initCards = () => {
    const cards = [];
    pickedQs.forEach((q, qi) => {
      cards.push({ id: `q${qi}`, type: 'question', text: q.q.slice(0, 60) + (q.q.length > 60 ? '…' : ''), pairId: qi });
      cards.push({ id: `a${qi}`, type: 'answer',   text: q.o[q.a],                                              pairId: qi });
    });
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const [cards, setCards]       = useState(initCards);
  const [flipped, setFlipped]   = useState([]);
  const [matched, setMatched]   = useState([]);
  const [score, setScore]       = useState(0);
  const [moves, setMoves]       = useState(0);
  const [done, setDone]         = useState(false);
  const [flash, setFlash]       = useState(null);
  const lockRef = useRef(false);

  const flip = (card) => {
    if (lockRef.current) return;
    if (flipped.length === 1 && flipped[0].id === card.id) return;
    if (matched.includes(card.pairId)) return;
    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      lockRef.current = true;
      const [a, b] = newFlipped;
      if (a.pairId === b.pairId && a.type !== b.type) {
        setMatched(m => { const nm = [...m, a.pairId]; if (nm.length === PAIRS) setTimeout(() => setDone(true), 600); return nm; });
        setScore(s => s + 20);
        setFlash('correct');
        setTimeout(() => { setFlipped([]); setFlash(null); lockRef.current = false; }, 700);
      } else {
        setFlash('wrong');
        setTimeout(() => { setFlipped([]); setFlash(null); lockRef.current = false; }, 900);
      }
    }
  };

  useEffect(() => {
    if (done) {
      const bonus = Math.max(0, 60 - moves * 2);
      const total = score + bonus;
      addXP(email, name, Math.round(total / 2), 'game_memory');
      onEnd(total, PAIRS);
    }
  }, [done]);

  if (done) return null;

  return (
    <div className={`game-arena memory-game ${flash || ''}`}>
      <div className="game-hud">
        <div className="game-hud-lives"><span style={{fontSize:13,color:GOLD}}>Pairs: {matched.length}/{PAIRS}</span></div>
        <div className="game-hud-center"><span style={{fontSize:12,color:'#9CA3AF'}}>Moves: {moves}</span></div>
        <div className="game-hud-score"><span className="game-score-num">{score}</span></div>
      </div>
      <div className="game-story-bar">
        <span className="game-story-icon"><EmojiIcon emoji="🧠" size="1.1em" /></span>
        <span className="game-story-text">Match each question with its correct answer to clear the Fog!</span>
      </div>
      <div className="memory-grid">
        {cards.map(card => {
          const isFlipped = flipped.find(f => f.id === card.id) || matched.includes(card.pairId);
          return (
            <button key={card.id} className={`memory-card ${isFlipped ? 'flipped' : ''} ${matched.includes(card.pairId) ? 'matched' : ''}`} onClick={() => flip(card)}>
              <div className="memory-card-inner">
                <div className="memory-card-back">?</div>
                <div className={`memory-card-front ${card.type}`}>{card.text}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const GAME_TYPES = ['flash', 'memory'];
const DIFFICULTIES = [
  { id: 'easy',   label: 'Easy',   icon: '😊', desc: 'More time, fewer questions' },
  { id: 'medium', label: 'Medium', icon: '😤', desc: 'Standard — like the real exam' },
  { id: 'hard',   label: 'Hard',   icon: '🔥', desc: 'Less time, tough questions, max XP' },
];

const SAMPLER_QS = [
  { q: 'Which of the following is a primary source of energy for plants?', o: ['Oxygen', 'Sunlight', 'Water', 'Carbon dioxide'], a: 1 },
  { q: 'The body responsible for registering businesses in Nigeria is:', o: ['NAFDAC', 'CAC', 'FIRS', 'SMEDAN'], a: 1 },
  { q: 'The process by which water changes from liquid to gas is called:', o: ['Condensation', 'Sublimation', 'Evaporation', 'Precipitation'], a: 2 },
  { q: 'In mathematics, the value of π (pi) is approximately:', o: ['2.71', '3.14', '1.41', '1.73'], a: 1 },
  { q: 'Newton\'s Second Law of Motion states that F = ?', o: ['mv', 'ma', 'mv²', 'm/a'], a: 1 },
  { q: 'Which Nigerian state is known as the "Centre of Excellence"?', o: ['Abuja', 'Kano', 'Lagos', 'Rivers'], a: 2 },
  { q: 'The chemical symbol for Gold is:', o: ['Go', 'Gd', 'Au', 'Ag'], a: 2 },
  { q: 'Which organ produces insulin in the human body?', o: ['Liver', 'Kidney', 'Pancreas', 'Heart'], a: 2 },
  { q: 'JAMB stands for:', o: ['Joint Admissions and Matriculation Board', 'Joint Academic and Matriculation Bureau', 'Joint Assessment and Marking Board', 'Junior Academics Matriculation Board'], a: 0 },
  { q: 'The process of breaking down glucose to release energy in cells is called:', o: ['Photosynthesis', 'Respiration', 'Digestion', 'Excretion'], a: 1 },
  { q: 'Which gas is most abundant in the Earth\'s atmosphere?', o: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], a: 2 },
  { q: 'The capital of Nigeria is:', o: ['Lagos', 'Kano', 'Abuja', 'Ibadan'], a: 2 },
];

export default function GameMode({ onBack, email, name }) {
  const [phase, setPhase]       = useState('menu');
  const [difficulty, setDiff]   = useState('medium');
  const [gameType, setGameType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [result, setResult]     = useState(null);
  const [totalXP, setTotalXP]   = useState(0);

  const startGame = () => {
    const type = GAME_TYPES[Math.floor(Math.random() * GAME_TYPES.length)];
    setGameType(type);
    const count = difficulty === 'easy' ? 6 : difficulty === 'hard' ? 12 : 8;
    const shuffled = [...SAMPLER_QS].sort(() => Math.random() - 0.5).slice(0, count);
    setQuestions(shuffled);
    setPhase('playing');
  };

  const handleEnd = (score, total) => {
    const xp = Math.round(score / 2);
    setTotalXP(xp);
    setResult({ score, total, xp });
    setPhase('result');
  };

  if (phase === 'playing') {
    if (gameType === 'flash')  return <FlashGame  questions={questions} onEnd={handleEnd} email={email} name={name} />;
    if (gameType === 'memory') return <MemoryGame questions={questions} onEnd={handleEnd} email={email} name={name} />;
  }

  if (phase === 'result') {
    return (
      <div className="game-result-screen">
        <div className="game-result-card">
          <div className="game-result-icon">{result.score >= result.total * 15 ? '🏆' : result.score >= result.total * 8 ? '⭐' : '💪'}</div>
          <div className="game-result-title">{result.score >= result.total * 15 ? 'Legendary!' : result.score >= result.total * 8 ? 'Well played!' : 'Keep going!'}</div>
          <div className="game-result-score">{result.score} pts</div>
          <div className="game-result-xp">+{result.xp} XP earned</div>
          <div className="game-result-story">The Fog retreats a little further. Kemi grows stronger.</div>
          <div style={{display:'flex',gap:10,marginTop:8}}>
            <button className="game-result-btn" onClick={startGame}><EmojiIcon emoji="🔄" size="1.15em" /> Play Again</button>
            <button className="game-result-btn" style={{background:'transparent',border:`2px solid ${GOLD}`,color:GOLD}} onClick={onBack}>← Exit</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scr fd game-menu-screen">
      <div className="game-menu-header">
        <button className="game-back-btn" onClick={onBack}>← Back</button>
        <div className="game-menu-title"><EmojiIcon emoji="🎮" size="1.15em" /> Game Mode</div>
        <div className="game-menu-sub">Battle the Fog of Ignorance with your knowledge</div>
      </div>

      <div className="game-story-intro">
        <div className="game-story-world">{STORY.world}</div>
        <div className="game-hero-tag">🦸 You play as: <strong>Kemi, Scholar of Lagos</strong></div>
      </div>

      <div className="game-diff-label">Choose Difficulty:</div>
      <div className="game-diff-grid">
        {DIFFICULTIES.map(d => (
          <button key={d.id} className={`game-diff-card ${difficulty === d.id ? 'selected' : ''}`} onClick={() => setDiff(d.id)}>
            <span className="game-diff-icon">{d.icon}</span>
            <span className="game-diff-name">{d.label}</span>
            <span className="game-diff-desc">{d.desc}</span>
          </button>
        ))}
      </div>

      <div className="game-modes-preview">
        <div className="game-mode-preview-card">
          <span className="game-mode-preview-icon"><EmojiIcon emoji="⚡" size="1.1em" /></span>
          <div>
            <div className="game-mode-preview-name">Flash Quiz</div>
            <div className="game-mode-preview-desc">Answer fast — timer runs. Combos multiply your XP.</div>
          </div>
        </div>
        <div className="game-mode-preview-card">
          <span className="game-mode-preview-icon"><EmojiIcon emoji="🧠" size="1.1em" /></span>
          <div>
            <div className="game-mode-preview-name">Memory Match</div>
            <div className="game-mode-preview-desc">Match questions to answers. Fewest moves wins.</div>
          </div>
        </div>
      </div>

      <div className="game-random-note">🎲 Game type is selected randomly each round</div>

      <button className="game-start-btn" onClick={startGame}>
        ⚔️ Enter the Battle
      </button>
    </div>
  );
}
