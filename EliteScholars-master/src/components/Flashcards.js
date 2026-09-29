import React, { useState, useEffect } from 'react';
import { SUBJ } from '../data/subjects';
import { getFlashcardsForSubject } from '../data/flashcards';
import { useTheme } from '../context/ThemeContext';
import Icon, { EmojiIcon } from './Icon';

export default function Flashcards({ subjectId, onBack }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { theme } = useTheme();
  
  const meta = SUBJ[subjectId] || SUBJ.english;
  const currentCard = cards[currentIndex];
  const totalCards = cards.length;
  const progress = ((currentIndex + 1) / totalCards) * 100;

  useEffect(() => {
    const flashcards = getFlashcardsForSubject(subjectId);
    setCards(flashcards.map(card => ({ ...card, known: false })));
  }, [subjectId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnown = () => {
    const updatedCards = [...cards];
    updatedCards[currentIndex].known = true;
    setCards(updatedCards);
    setKnownCount(knownCount + 1);
    handleNext();
  };

  const handleUnknown = () => {
    const updatedCards = [...cards];
    updatedCards[currentIndex].known = false;
    setCards(updatedCards);
    setUnknownCount(unknownCount + 1);
    handleNext();
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex + 1 < totalCards) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setKnownCount(0);
    setUnknownCount(0);
    setShowResult(false);
    setIsFlipped(false);
    setCards(cards.map(card => ({ ...card, known: false })));
  };

  if (showResult) {
    const percentage = totalCards > 0 ? Math.round((knownCount / totalCards) * 100) : 0;
    return (
      <div className="scr fd flashcards-page">
        <div className="flashcards-result-container">
          <button className="flashcards-back-btn" onClick={onBack} aria-label="Back"><Icon name="arrowLeft" size={16} /></button>
          <div className="flashcards-result-icon"><EmojiIcon emoji="📊" size="1.1em" /></div>
          <div className="flashcards-result-title">Session Complete!</div>
          <div className="flashcards-result-subtitle">You've reviewed all {totalCards} flashcards</div>
          
          <div className="flashcards-result-stats">
            <div className="flashcards-result-stat">
              <div className="flashcards-result-stat-value known">{knownCount}</div>
              <div className="flashcards-result-stat-label">Known</div>
            </div>
            <div className="flashcards-result-stat">
              <div className="flashcards-result-stat-value unknown">{unknownCount}</div>
              <div className="flashcards-result-stat-label">Review Again</div>
            </div>
          </div>
          
          <div className="flashcards-progress-wrapper">
            <div className="flashcards-progress-bar">
              <div className="flashcards-progress-fill" style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="flashcards-progress-text">{percentage}% Mastered</div>
          </div>
          
          <button className="flashcards-restart-btn" onClick={handleRestart}><EmojiIcon emoji="🔄" size="1.15em" /> Study Again</button>
          <button className="flashcards-back-subjects-btn" onClick={onBack}><EmojiIcon emoji="📚" size="1.15em" /> Back to Subjects</button>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="scr fd flashcards-page">
        <div className="flashcards-empty-container">
          <button className="flashcards-back-btn" onClick={onBack} aria-label="Back"><Icon name="arrowLeft" size={16} /></button>
          <div className="flashcards-empty-icon"><EmojiIcon emoji="📭" size="1.1em" /></div>
          <div className="flashcards-empty-title">No Flashcards Available</div>
          <div className="flashcards-empty-subtitle">
            No flashcards found for {meta.label}. Check back later!
          </div>
          <button className="flashcards-back-subjects-btn" onClick={onBack}><EmojiIcon emoji="📚" size="1.15em" /> Back to Subjects</button>
        </div>
      </div>
    );
  }

  return (
    <div className="scr fd flashcards-page">
      {/* Header */}
      <div className="flashcards-header" style={{ background: `linear-gradient(135deg, #2E1065, ${meta.color || '#7C3AED'})` }}>
        <button className="flashcards-header-back" onClick={onBack}><Icon name="arrowLeft" size={15} /> Back</button>
        <div className="flashcards-header-content">
          <div className="flashcards-header-icon">{meta.icon}</div>
          <div className="flashcards-header-title">{meta.label} Flashcards</div>
          <div className="flashcards-header-counter">Card {currentIndex + 1} of {totalCards}</div>
        </div>
        <div className="flashcards-header-progress">
          <div className="flashcards-header-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="flashcards-card-container">
        <div 
          className={`flashcards-card ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
        >
          {/* Front of card */}
          <div className="flashcards-card-front">
            <div className="flashcards-card-label"><EmojiIcon emoji="📖" size="1.15em" /> TERM</div>
            <div className="flashcards-card-term">{currentCard.term}</div>
            <div className="flashcards-card-tip">👆 Tap to flip</div>
          </div>
          
          {/* Back of card */}
          <div className="flashcards-card-back">
            <div className="flashcards-card-label"><EmojiIcon emoji="📝" size="1.15em" /> DEFINITION</div>
            <div className="flashcards-card-definition">{currentCard.definition}</div>
            {currentCard.example && (
              <>
                <div className="flashcards-card-sub-label"><EmojiIcon emoji="💡" size="1.15em" /> EXAMPLE</div>
                <div className="flashcards-card-example">{currentCard.example}</div>
              </>
            )}
            {currentCard.tip && (
              <>
                <div className="flashcards-card-sub-label"><EmojiIcon emoji="✨" size="1.15em" /> TIP</div>
                <div className="flashcards-card-tip-text">{currentCard.tip}</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flashcards-actions">
        <button className="flashcards-btn-need-review" onClick={handleUnknown}><EmojiIcon emoji="❌" size="1.15em" /> Need Review</button>
        <button className="flashcards-btn-know" onClick={handleKnown}><EmojiIcon emoji="✅" size="1.15em" /> I Know This</button>
      </div>
      
      <div className="flashcards-footer">
        Tap card to flip • {knownCount} known • {unknownCount} to review
      </div>
    </div>
  );
}
