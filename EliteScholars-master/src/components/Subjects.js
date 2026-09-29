import React, { useState, useEffect } from 'react';
import { QB, JAMB_LEARN } from '../data/jamb';
import { POST_UTME, POSTUTME_LEARN } from '../data/postutme';
import { WAEC_SUBJECTS, WAEC_QB, WAEC_LEARN } from '../data/waec/index';
import { NECO_SUBJECTS, NECO_QB, NECO_LEARN } from '../data/neco/index';
import { GST_SUBJECTS, GST_QB, GST_LEARN } from '../data/gst/index';
import { getFlashcardsForSubject } from '../data/flashcards';
import { SUBJ } from '../data/subjects';
import { LGRAY, GRAY } from '../utils/colors';
import { SFX } from '../utils/sounds';
import { useTheme } from '../context/ThemeContext';
import Icon, { EmojiIcon } from './Icon';

const MODES = [
  { id: 'learn',    label: 'Learn' },
  { id: 'cbt',      label: 'CBT' },
  // { id: 'flashcard',label: 'Flash' },
];

const MODE_DESC = {
  cbt:      'Practice past questions',
  learn:    'Study notes & key concepts',
  flashcard:'Quick card revision',
  game:     'Play & earn XP',
};

// Grid exams always use grid layout regardless of mode
const GRID_EXAMS = ['waec', 'neco', 'gst'];

// ── Count total questions (QB + embedded topic questions, deduped) ───────────
function countTotalQuestions(qbArr = [], learnTopics = []) {
  const qbSet = new Set(qbArr.map((q) => q.q));
  let total = qbArr.length;
  learnTopics.forEach((topic) => {
    (topic.questions || []).forEach((q) => {
      if (!qbSet.has(q.q)) { qbSet.add(q.q); total++; }
    });
  });
  return total;
}

export default function Subjects({
  name,
  examType = 'jamb',
  university = null,
  email = '',
  premiumUser = false,
  refreshTrigger,
  onStartCBT,
  onStartLearn,
  onStartFlashcard,
  onStartGame,
  onProfile,
  onBack,
}) {
  const { theme, toggleTheme } = useTheme();

  const [mode, setMode] = useState(() => localStorage.getItem('learn') || 'cbt');
  useEffect(() => { localStorage.setItem('learn', mode); }, [mode]);

  // ── Subject metadata, QB, and learn bank ─────────────────────────────────
  const getSubjectsAndQB = () => {
    switch (examType) {
      case 'waec':    return { subjects: WAEC_SUBJECTS, qb: WAEC_QB, learn: WAEC_LEARN };
      case 'neco':    return { subjects: NECO_SUBJECTS, qb: NECO_QB, learn: NECO_LEARN };
      case 'jamb':    return { subjects: WAEC_SUBJECTS, qb: QB,      learn: JAMB_LEARN };
      case 'postutme':return { subjects: WAEC_SUBJECTS, qb: POST_UTME, learn: POSTUTME_LEARN };
      case 'gst':     return { subjects: GST_SUBJECTS,  qb: GST_QB,  learn: GST_LEARN };
      default:        return { subjects: null, qb: null, learn: null };
    }
  };

  const { subjects: gridSubjects, qb: gridQB, learn: gridLearn } = getSubjectsAndQB();

  const isGridExam = GRID_EXAMS.includes(examType);

  // ── For JAMB/POSTUTME: fall back to WAEC_QB if subject not in JAMB QB ───
  const getQuestionPool = (subjectId) => {
    const jambPool = QB[subjectId] || [];
    if (jambPool.length > 0) return jambPool;
    return WAEC_QB[subjectId] || [];
  };

  const getJambTotalCount = (subjectId) => {
    const learnBank = examType === 'postutme' ? POSTUTME_LEARN : JAMB_LEARN;
    if (mode === 'flashcard') return getFlashcardsForSubject(subjectId).length;
    if (examType === 'postutme' && university) {
      const uniCount = POST_UTME[university?.toUpperCase()]?.[subjectId]?.length || 0;
      return countTotalQuestions(Array(uniCount).fill({ q: '' }), learnBank[subjectId] || []);
    }
    return countTotalQuestions(getQuestionPool(subjectId), (learnBank[subjectId] || []));
  };

  const hasLearnContent = (subjectId) => {
    const learnBank = examType === 'postutme' ? POSTUTME_LEARN : JAMB_LEARN;
    return (learnBank[subjectId] || []).length > 0;
  };

  const hasQuestions = (subjectId) => {
    if (examType === 'postutme' && university) {
      const uniData = POST_UTME[university?.toUpperCase()];
      return !!uniData?.[subjectId]?.length;
    }
    return getQuestionPool(subjectId).length > 0;
  };

  // ── Header label ─────────────────────────────────────────────────────────
  const examLabel = {
    jamb:    'JAMB',
    postutme: university ? `${university.toUpperCase()} POST UTME` : 'POST UTME',
    waec:    'WAEC',
    neco:    'NECO',
    gst:     'GST',
  }[examType] || 'Subjects';

  // ── Mode switch ───────────────────────────────────────────────────────────
  const handleModeSwitch = (m) => {
    SFX.select?.();
    if (m === 'game') { onStartGame?.(); return; }
    setMode(m);
  };

  // ── Subject click ─────────────────────────────────────────────────────────
  const handleSubjectClick = (subjectId) => {
    SFX.select?.(); SFX.submit?.();
    if (mode === 'learn')     { onStartLearn?.(subjectId); return; }
    if (mode === 'flashcard') { onStartFlashcard?.(subjectId); return; }
    onStartCBT?.(subjectId);
  };

  // ── Build JAMB subject list for grid (used in CBT + Learn modes) ─────────
  // Replaces the old flat-list card layout for JAMB CBT mode.
  const getJambGridSubjects = () => {
    const learnBank = examType === 'postutme' ? POSTUTME_LEARN : JAMB_LEARN;
    if (mode === 'learn') {
      // Learn mode: show subjects that have study notes
      return Object.entries(SUBJ)
        .filter(([id]) => id !== 'novel')
        .filter(([id]) => (learnBank[id] || []).length > 0)
        .map(([id, meta]) => ({ id, ...meta }));
    }
    if (mode === 'flashcard') {
      return Object.entries(SUBJ)
        .filter(([id]) => id !== 'novel')
        .filter(([id]) => getFlashcardsForSubject(id).length > 0)
        .map(([id, meta]) => ({ id, ...meta }));
    }
    // CBT mode: show subjects that have questions (jamb QB or waec QB fallback)
    const subs = Object.entries(SUBJ)
      .filter(([id]) => id !== 'novel')
      .filter(([id]) => hasQuestions(id))
      .map(([id, meta]) => ({ id, ...meta }));

    // POSTUTME may need university filter
    if (examType === 'postutme' && university) {
      const uniData = POST_UTME[university?.toUpperCase()] || {};
      return subs.filter(s => uniData[s.id]?.length > 0);
    }
    return subs;
  };

  // ── Lekki Headmaster novel card (CBT/Flash only) ──────────────────────────
  const novelCount = mode === 'flashcard'
    ? getFlashcardsForSubject('novel').length
    : (QB['novel'] || []).length;

  const showNovel = mode !== 'learn' && novelCount > 0;

  const flashUnavailable = mode === 'flashcard' && (examType === 'postutme' || isGridExam);

  // ── Whether to use grid layout ────────────────────────────────────────────
  // Grid exams (waec/neco/gst) always use grid.
  // JAMB/POSTUTME now ALSO use grid for CBT and Learn (not just Learn).
  // Flashcard for JAMB stays as the old card list since it's unavailable anyway.
  const useGridLayout = isGridExam || mode === 'learn' || mode === 'cbt';

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="scr fd subjects-wrapper">
      {/* ── Header ── */}
      <div className="subjects-header">
        <div className="subjects-header-curve" />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="subjects-welcome-label">{examLabel}</div>
            <div className="subjects-welcome-name">Hi {name || 'Student'} 👋</div>
            <div className="subjects-welcome-text">{MODE_DESC[mode]}</div>
          </div>
          <div className="settings-group">
            {onBack && (
              <button className="settings-group-btn theme-btn" onClick={onBack}>
                <span className="settings-group-icon"><Icon name="arrowLeft" size={16} /></span>
                <span className="settings-group-text">Back</span>
              </button>
            )}
            <button className="settings-group-btn theme-btn" onClick={toggleTheme}>
              <span className="settings-group-icon"><Icon name={theme === 'light' ? 'moon' : 'sun'} size={16} /></span>
              <span className="settings-group-text">{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mode toggle ── */}
      <div className="subjects-mode-toggle-wrap">
        <div className="subjects-mode-toggle">
          {MODES.map((m) => (
            <button
              key={m.id}
              className={`subjects-mode-btn ${mode === m.id ? 'active' : ''}`}
              onClick={() => handleModeSwitch(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="scroll subjects-body">

        {/* Flashcard unavailable for grid exams */}
        {flashUnavailable ? (
          <div className="subjects-empty-state">
            <div className="subjects-empty-icon"><Icon name="layers" size={40} /></div>
            <div className="subjects-empty-title">Flashcards Coming Soon</div>
            <div className="subjects-empty-sub">Flashcards are currently only available for JAMB. Check back later!</div>
            <button className="subjects-empty-btn" onClick={() => setMode('cbt')}>Switch to CBT</button>
          </div>

        ) : (isGridExam || useGridLayout) ? (
          /* ── GRID LAYOUT — used for all exam types in CBT and Learn mode ── */
          (() => {
            // For WAEC/NECO/GST use their dedicated subject list
            // For JAMB/POSTUTME build from SUBJ filtered by availability
            const cardSubjects = isGridExam ? (gridSubjects || []) : getJambGridSubjects();
            const cardQB       = isGridExam ? gridQB : (examType === 'postutme' ? POST_UTME : QB);
            const cardLearn    = isGridExam ? gridLearn : (examType === 'postutme' ? POSTUTME_LEARN : JAMB_LEARN);

            if (!cardSubjects.length) {
              return (
                <div className="subjects-empty-state">
                  <div className="subjects-empty-icon"><Icon name="file" size={40} /></div>
                  <div className="subjects-empty-title">
                    {mode === 'learn' ? 'No Study Notes Available Yet' : 'No Questions Available Yet'}
                  </div>
                  <div className="subjects-empty-sub">
                    {examType === 'postutme' && university
                      ? `We're adding ${mode === 'learn' ? 'study notes' : 'questions'} for ${university.toUpperCase()}. Check back soon!`
                      : `More ${mode === 'learn' ? 'study notes are' : 'questions are'} being added. Please check back later!`}
                  </div>
                  <button className="subjects-empty-btn" onClick={onProfile}>Go to Profile</button>
                </div>
              );
            }

            return (
              <>
                <div className="subjects-grid">
                  {cardSubjects.map((subj) => {
                    // For grid exams: count from QB array + topic questions
                    // For JAMB: use the helper that already handles fallback + topics
                    let qCount;
                    if (isGridExam) {
                      qCount = countTotalQuestions(
                        gridQB?.[subj.id] || [],
                        gridLearn?.[subj.id] || []
                      );
                    } else {
                      qCount = getJambTotalCount(subj.id);
                    }

                    return (
                      <div
                        key={subj.id}
                        className="subjects-grid-card"
                        style={{ '--subject-color': subj.color, '--subject-bg': subj.bg }}
                        onClick={() => handleSubjectClick(subj.id)}
                      >
                        <div className="subjects-grid-icon" style={{ background: subj.bg, color: subj.color }}>
                          <EmojiIcon emoji={subj.icon} size={24} />
                        </div>
                        <div className="subjects-grid-label">{subj.label}</div>
                        <div className="subjects-grid-meta">
                          {mode === 'learn'
                            ? 'Study notes'
                            : qCount > 0
                              ? `${qCount} questions`
                              : 'Coming soon'}
                        </div>
                        <div className="subjects-grid-badge" style={{ background: subj.bg, color: subj.color }}>
                          {mode === 'learn' ? 'STUDY' : 'READY'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* The Lekki Headmaster novel card — CBT only, below the grid */}
                {showNovel && !isGridExam && (
                  <div
                    onClick={() => handleSubjectClick('novel')}
                    className="lekki-card"
                    style={{ margin: '12px 0 0' }}
                  >
                    <div className="lekki-icon" style={{ background: '#FCE7F3', color: '#831843' }}><Icon name="book" size={24} /></div>
                    <div style={{ flex: 1 }}>
                      <div className="lekki-title">The Lekki Headmaster</div>
                      <div className="lekki-author">Kabir Alabi Garba · Literature</div>
                      <div className="lekki-badge" style={{ background: LGRAY, color: GRAY }}>NOVEL</div>
                    </div>
                    <div className="lekki-question-count">
                      <div className="lekki-question-number" style={{ color: GRAY }}>{novelCount}</div>
                      <div>{mode === 'flashcard' ? 'cards' : 'questions'}</div>
                    </div>
                  </div>
                )}
              </>
            );
          })()

        ) : (
          /* ── FLASHCARD mode for JAMB (keeps old card list style) ── */
          (() => {
            const subs = Object.entries(SUBJ)
              .filter(([id]) => id !== 'novel')
              .filter(([id]) => getFlashcardsForSubject(id).length > 0);

            if (!subs.length) {
              return (
                <div className="subjects-empty-state">
                  <div className="subjects-empty-icon"><Icon name="file" size={40} /></div>
                  <div className="subjects-empty-title">No Flashcards Available Yet</div>
                  <div className="subjects-empty-sub">Flashcard decks are being added. Check back later!</div>
                  <button className="subjects-empty-btn" onClick={() => setMode('cbt')}>Switch to CBT</button>
                </div>
              );
            }

            return (
              <div className="subjects-card-container">
                {subs.map(([id, meta]) => {
                  const count = getFlashcardsForSubject(id).length;
                  return (
                    <div
                      key={id}
                      onClick={() => handleSubjectClick(id)}
                      className="subject-card"
                      style={{ '--subject-bg': meta.bg, '--subject-color': meta.color }}
                    >
                      <div className="subject-icon" style={{ background: meta.bg, color: meta.color }}><EmojiIcon emoji={meta.icon} size={22} /></div>
                      <div className="subject-name">{meta.label}</div>
                      <div className="subject-question-count">{count} cards</div>
                      <div className="subject-status" style={{ background: LGRAY, color: GRAY }}>REVIEW</div>
                    </div>
                  );
                })}
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}