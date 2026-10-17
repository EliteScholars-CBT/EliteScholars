import React, { useState, useEffect } from 'react';
import { getSubjectMeta } from '../data/subjectMeta';
import {
  SHOW_POPOVER_AD,
  SHARE_GATE_EVERY,
  WA_CHANNEL,
  VIBES,
  getStudentGCLinks,
} from '../utils/constants';
import { DPURP, PURPLE, BG, WHITE, GRAY, GOLD, GREEN } from '../utils/colors';
import { SFX } from '../utils/sounds';
import ScoreCard from './ScoreCard';
import Confetti from './Confetti';
import { EmojiIcon } from './Icon';

// ============================================================================
// Result — Clean score display + full question review (correct/incorrect)
// ============================================================================

export default function Result({
  name,
  subjectId,
  score,
  correct,
  totalQ,
  totalSessions,
  onHome,
  onProfile,
  onAdGateComplete,
  questionLog = [],
  userEmail = '',
  studentType = '',
  selectedExams = [],
}) {
  const [showCard, setShowCard] = useState(false);
  const [adCompleted, setAdCompleted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(null);

  const gcLinks = getStudentGCLinks(studentType, selectedExams);

  const meta = getSubjectMeta(subjectId);
  const pct = totalQ ? Math.round((correct / totalQ) * 100) : 0;
  const wrong = totalQ - correct;
  const vibe = VIBES[Math.floor(Math.random() * Math.min(10, VIBES.length))];

  const needAdGate = SHOW_POPOVER_AD && totalSessions > 0 && totalSessions % SHARE_GATE_EVERY === 0;
  const showGroup = !needAdGate && !SHOW_POPOVER_AD && totalSessions % 2 === 1;
  const showChannel = !needAdGate && !SHOW_POPOVER_AD && totalSessions % 2 === 0;

  const msgs = [
    [80, "Excellent! You're in the top league. Keep pushing! 💪"],
    [60, "Good work! A bit more practice and you're unstoppable."],
    [40, 'Not bad. Review the explanations and come back.'],
    [0, "Every session makes you sharper. Don't stop! 📚"],
  ];
  const msg = msgs.find(([t]) => pct >= t)[1];

  useEffect(() => {
    setTimeout(() => SFX.roundComplete(), 400);
  }, []);

  const handlePlayAgain = () => {
    if (needAdGate && !adCompleted) {
      onAdGateComplete(() => {
        setAdCompleted(true);
        onHome();
      });
    } else {
      onHome();
    }
  };

  // Grade colour
  const gradeColor = pct >= 80 ? '#22c55e' : pct >= 60 ? GOLD : pct >= 40 ? '#f97316' : '#ef4444';

  return (
    <div className="scr fd" style={{ background: BG }}>
      {pct >= 70 && <Confetti count={pct === 100 ? 100 : 70} />}
      {/* Hero */}
      <div
        className="result-hero"
        style={{ background: `linear-gradient(135deg,${DPURP},${meta.color || PURPLE})` }}
      >
        <div className="result-score-circle" style={{ borderColor: gradeColor }}>
          <div className="result-score-number">
            {correct}/{totalQ}
          </div>
          <div className="result-score-pct" style={{ color: gradeColor }}>
            {pct}%
          </div>
          <div className="result-score-label">SCORE</div>
        </div>
        <div className="result-name">{name}!</div>
        <div className="result-message">{msg}</div>
      </div>

      <div className="scroll" style={{ flex: 1, padding: '0 16px 24px', marginTop: -18 }}>
        {/* Stats row */}
        <div className="result-stats">
          {[
            ['✅ Correct', correct, '#22c55e'],
            ['❌ Wrong', wrong, '#ef4444'],
            ['⭐ Points', score, GOLD],
          ].map(([l, v, c]) => (
            <div key={l} className="result-stat-card">
              <div className="result-stat-value" style={{ color: c }}>
                {v}
              </div>
              <div className="result-stat-label">{l}</div>
            </div>
          ))}
        </div>

        {/* Vibe */}
        <div className="result-vibe-box">
          <span className="result-vibe-text">{vibe}</span>
        </div>

        {/* Review button */}
        {questionLog.length > 0 && (
          <button className="result-review-btn" onClick={() => setShowReview(true)}>
            📋 Review Questions & Corrections
          </button>
        )}

        {/* Score card */}
        <button
          className="result-scorecard-btn"
          onClick={() => {
            SFX.select();
            setShowCard(true);
          }}
          style={{ background: `linear-gradient(135deg,${meta.color},${DPURP})` }}
        >
          🖼️ Show Friends Your Score Card
        </button>

        {/* Ad gate */}
        {needAdGate && !adCompleted && (
          <div
            className="gate-container"
            style={{ background: `linear-gradient(135deg,${DPURP},#3d0070)` }}
          >
            <div className="gate-badge"><EmojiIcon emoji="🎬" size="1.15em" /> SUPPORT ELITESCHOLARS</div>
            <div className="gate-quote">Watch a quick ad to unlock your next quiz round!</div>
            <button
              className="gate-share-btn"
              style={{ background: GOLD, color: DPURP }}
              onClick={() => onAdGateComplete(handlePlayAgain)}
            >
              🎬 Watch Ad &amp; Continue
            </button>
          </div>
        )}
        {needAdGate && adCompleted && (
          <div className="su gate-success">
            <div className="gate-success-text"><EmojiIcon emoji="✅" size="1.15em" /> Thank you! Next round unlocked!</div>
            <button
              className="join-play-again"
              onClick={onHome}
              style={{ marginTop: 10, background: GOLD, color: DPURP }}
            >
              🔄 Play Again
            </button>
          </div>
        )}

        {/* Community links */}
        {!SHOW_POPOVER_AD && showGroup && (
          <div className="join-card">
            <div className="join-title">Join Your Study Group 💬</div>
            <div className="join-subtitle">Practise with serious exam candidates daily.</div>
            {gcLinks.map((gc) => (
              <button
                key={gc.key}
                className="join-button"
                onClick={() => window.open(gc.url, '_blank')}
              >
                {gc.emoji} Join {gc.label} WhatsApp Group
              </button>
            ))}
            <button className="join-play-again" onClick={onHome}>
              🔄 Play Again
            </button>
          </div>
        )}
        {!SHOW_POPOVER_AD && showChannel && (
          <div className="join-card">
            <div className="join-title">Follow Our WhatsApp Channel 📲</div>
            <div className="join-subtitle">Daily questions, tips &amp; serious exam community.</div>
            <button className="join-button" onClick={() => window.open(WA_CHANNEL, '_blank')}>
              📢 Follow EliteScholars Channel
            </button>
            <button className="join-play-again" onClick={onHome}>
              🔄 Play Again
            </button>
          </div>
        )}

        {!needAdGate && !showGroup && !showChannel && (
          <button
            className="join-play-again"
            onClick={onHome}
            style={{ background: GOLD, color: DPURP, marginBottom: 12 }}
          >
            🔄 Play Again
          </button>
        )}

        <button className="back-menu-btn" onClick={onHome}>
          ⌂ Back to Main Menu
        </button>
      </div>

      {/* Score card modal */}
      {showCard && (
        <ScoreCard
          name={name}
          subjectId={subjectId}
          score={score}
          correct={correct}
          totalQ={totalQ}
          onClose={() => setShowCard(false)}
        />
      )}

      {/* Question Review Modal */}
      {showReview && (
        <div
          className="review-modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowReview(false)}
        >
          <div className="review-modal">
            <div className="review-modal-header">
              <div className="review-modal-title"><EmojiIcon emoji="📋" size="1.15em" /> Question Review</div>
              <button className="review-modal-close" onClick={() => setShowReview(false)}>
                ✕
              </button>
            </div>
            <div className="review-modal-body">
              {reviewIdx !== null ? (
                // Detailed view of one question
                <div className="review-detail">
                  <button className="review-back-btn" onClick={() => setReviewIdx(null)}>
                    ← Back to list
                  </button>
                  <div className="review-detail-q">{questionLog[reviewIdx].q}</div>
                  <div className="review-detail-options">
                    {questionLog[reviewIdx].options?.map((opt, i) => {
                      const isAnswer = i === questionLog[reviewIdx].answer;
                      const isSelected = i === questionLog[reviewIdx].selected;
                      let cls = 'review-detail-opt';
                      if (isAnswer) cls += ' correct';
                      else if (isSelected && !isAnswer) cls += ' wrong';
                      return (
                        <div key={i} className={cls}>
                          <span className="review-opt-letter">{['A', 'B', 'C', 'D'][i]}</span>
                          {opt}
                          {isAnswer && <span className="review-correct-badge"><EmojiIcon emoji="✅" size="1.15em" /> Correct</span>}
                          {isSelected && !isAnswer && (
                            <span className="review-wrong-badge">Your answer</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="review-explanation">
                    <span className="review-exp-label"><EmojiIcon emoji="💡" size="1.15em" /> Explanation</span>
                    <p>{questionLog[reviewIdx].explanation}</p>
                  </div>
                </div>
              ) : (
                // List view
                <div className="review-list">
                  {questionLog.map((item, i) => (
                    <div
                      key={i}
                      className={`review-list-item ${item.correct ? 'review-item-correct' : 'review-item-wrong'}`}
                      onClick={() => setReviewIdx(i)}
                    >
                      <span className="review-item-num">Q{i + 1}</span>
                      <span className="review-item-q">
                        {item.q?.slice(0, 60)}
                        {item.q?.length > 60 ? '…' : ''}
                      </span>
                      <span className="review-item-badge">{item.correct ? '✅' : '❌'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
