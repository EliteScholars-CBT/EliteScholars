import React from 'react';
import { getSubjectMeta } from '../data/subjectMeta';
import { APP_URL } from '../utils/constants';
import { GOLD, LGOLD, GREEN, RED } from '../utils/colors';

export default function ScoreCard({ name, subjectId, score, correct, totalQ, onClose }) {
  const meta = getSubjectMeta(subjectId);
  const pct = totalQ ? Math.round((correct / totalQ) * 100) : 0;
  const wrong = totalQ - correct;
  const grade =
    pct >= 80
      ? { emoji: '🏆', label: 'ELITE', ac: '#F59E0B', bg: 'rgba(245,158,11,.18)' }
      : pct >= 60
        ? { emoji: '⭐', label: 'SHARP', ac: GOLD, bg: 'rgba(255, 197, 61,.18)' }
        : pct >= 40
          ? { emoji: '💪', label: 'RISING', ac: '#06B6D4', bg: 'rgba(6,182,212,.18)' }
          : { emoji: '📚', label: 'LEARNING', ac: LGOLD, bg: 'rgba(255,235,130,.12)' };

  const messages = {
    elite: [
      `${name} e choke!! 🔥 No be every person fit score like this — you be different breed!`,
      `Omo! ${name} don enter another level!`,
    ],
    sharp: [
      `${name} you dey gbadun!! Score like this no be beans — continue like this!`,
      `Oya ${name}, the momentum dey!`,
    ],
    rising: [
      `${name} you don start o! Small small e go reach top — no stop now!`,
      `${name} the hustle dey show — keep reading the explanations!`,
    ],
    learning: [
      `${name} no vex — everybody start from somewhere! Review every explanation 📖`,
      `${name} this na your beginning — great JAMB scores take practise!`,
    ],
  };
  const pool =
    pct >= 80
      ? messages.elite
      : pct >= 60
        ? messages.sharp
        : pct >= 40
          ? messages.rising
          : messages.learning;
  const msg = pool[Math.floor(Math.random() * pool.length)];
  const shareText = `${grade.emoji} ${msg}\n\nI scored ${correct}/${totalQ} (${pct}%) in ${meta.label} on EliteScholars CBT!\n\n🎓 Free JAMB practice at ${APP_URL} — by Elite JAMB & PUTME Clinic`;

  return (
    <div className="scorecard-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="scorecard-container">
        <div
          className="scorecard-header"
          style={{
            background: `linear-gradient(150deg, #0d001a 0%, ${meta.color}60 55%, #150028 100%)`,
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="scorecard-stars"
              style={{
                width: 3 + (i % 3),
                height: 3 + (i % 3),
                background: grade.ac,
                left: `${10 + i * 11}%`,
                top: `${15 + Math.sin(i) * 30}%`,
              }}
            />
          ))}
          <div className="scorecard-brand">
            <span className="scorecard-brand-name">EliteScholars CBT</span>
            <span
              className="scorecard-grade"
              style={{ background: grade.bg, border: `1px solid ${grade.ac}`, color: grade.ac }}
            >
              {grade.label}
            </span>
          </div>
          <div className="scorecard-center">
            <div className="scorecard-emoji">{grade.emoji}</div>
            <div className="scorecard-percent" style={{ color: grade.ac }}>
              {pct}
              <span className="scorecard-percent-small">%</span>
            </div>
            <div className="scorecard-fraction">
              {correct}/{totalQ} correct
            </div>
          </div>
          <div className="scorecard-user">
            <div className="scorecard-user-name">{name}</div>
            <div className="scorecard-user-subject">
              {meta.icon} {meta.label} · JAMB Practice
            </div>
          </div>
        </div>
        <div className="scorecard-stats">
          {[
            ['✅', correct, 'Correct', GREEN],
            ['❌', wrong, 'Wrong', RED],
            ['🏅', score, 'Points', grade.ac],
          ].map(([ico, v, l, c]) => (
            <div key={l} className="scorecard-stat">
              <div className="scorecard-stat-icon">{ico}</div>
              <div className="scorecard-stat-value" style={{ color: c }}>
                {v}
              </div>
              <div className="scorecard-stat-label">{l}</div>
            </div>
          ))}
        </div>
        <div className="scorecard-quote">
          <div className="scorecard-quote-text">"{msg}"</div>
        </div>
        <div className="scorecard-footer">
          <div className="scorecard-url">{APP_URL}</div>
          <button
            className="scorecard-share-btn"
            onClick={() => {
              window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
              onClose();
            }}
          >
            📤 Share My Score Card
          </button>
          <button className="scorecard-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
