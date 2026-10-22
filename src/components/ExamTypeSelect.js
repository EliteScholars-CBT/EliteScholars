import React from 'react';
import { EXAM_TYPES } from '../utils/constants';
import { GOLD } from '../utils/colors';
import Icon, { EmojiIcon } from './Icon';
import FileStudyHub from './FileStudy';
import StatusBar from './StatusBar';
import SquadShortcut from './SquadShortcut';
import { getSessionToken } from '../utils/sessionFetch';

// ============================================================================
// ExamTypeSelect — Compact grid layout (3 cols / 2 cols alternating)
// Icon + label only, keyboard navigable
// ============================================================================

export default function ExamTypeSelect({ onSelectExam, email = '', onOpenSquad }) {
  // Keyboard navigation
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectExam(id);
    }
  };

  return (
    <div className="scr fd exam-type-page">
      <div className="exam-type-header-section">
        <div className="exam-type-header-content">
          <div className="exam-type-icon"><Icon name="cap" size={40} stroke={1.7} /></div>
          <h1>
            What are you <span style={{ color: GOLD }}>studying</span> for?
          </h1>
        </div>
      </div>

      {/* Statuses are visible as soon as the app opens, plus a one-tap way into your squads */}
      {getSessionToken() ? <StatusBar /> : null}
      {getSessionToken() && onOpenSquad ? <SquadShortcut email={email} onOpen={onOpenSquad} /> : null}

      {/* Compact grid — 3 columns, wraps to 2 for even items */}
      <div className="exam-type-compact-grid">
        {EXAM_TYPES.map((exam, idx) => (
          <div
            key={exam.id}
            className={`exam-type-compact-card ${idx % 2 === 0 ? 'span-three' : 'span-two'}`}
            style={{ '--exam-color': exam.color }}
            role="button"
            tabIndex={0}
            onClick={() => onSelectExam(exam.id)}
            onKeyDown={(e) => handleKeyDown(e, exam.id)}
            aria-label={`Select ${exam.label}`}
          >
            <span className="exam-type-compact-icon"><EmojiIcon emoji={exam.icon} size={28} /></span>
            <span className="exam-type-compact-label">{exam.label}</span>
            <span className="exam-type-compact-desc">{exam.desc}</span>
          </div>
        ))}
      </div>

      {/* Study from your own files — upload, save locally, learn any way you like */}
      <FileStudyHub />
    </div>
  );
}
