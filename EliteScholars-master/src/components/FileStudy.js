import React, { useState, useEffect, useRef, useCallback } from 'react';
import Icon from './Icon';
import Confetti from './Confetti';
import { SFX } from '../utils/sounds';
import {
  extractTextFromFile,
  buildStudyPack,
  loadLibrary,
  saveToLibrary,
  updateInLibrary,
  removeFromLibrary,
  newFileId,
  SUPPORTED_HINT,
} from '../utils/studyEngine';
import '../styles/filestudy.css';

// ============================================================================
// FileStudy — "Study from your own files"
// Upload a PDF / DOCX / TXT → an on-device engine builds a summary, lessons,
// flashcards and questions → pick any mix of modes → study. Everything is
// saved to localStorage; nothing is uploaded anywhere.
// ============================================================================

const MODES = [
  { id: 'learn',   label: 'Learn',      icon: 'bookOpen',  desc: 'Bit-by-bit lessons' },
  { id: 'cards',   label: 'Flashcards', icon: 'cards',     desc: 'Flip and recall' },
  { id: 'cbt',     label: 'CBT',        icon: 'clipboard', desc: 'Exam-style practice' },
  { id: 'game',    label: 'Game',       icon: 'gamepad',   desc: 'Lives, streaks, score' },
  { id: 'summary', label: 'Summary',    icon: 'sparkles',  desc: 'Key points, fast' },
];
const MODE_BY_ID = Object.fromEntries(MODES.map((m) => [m.id, m]));

const shuffled = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
const MAX_BYTES = 25 * 1024 * 1024;
const LETTERS = ['A', 'B', 'C', 'D'];

/* ══════════════════════════════════════════════════════════════════════════
   HUB — sits on the home screen under the exam grid
   ══════════════════════════════════════════════════════════════════════════ */
export default function FileStudyHub() {
  const [files, setFiles] = useState(() => loadLibrary());
  const [busy, setBusy] = useState(null);      // { name, stage, pct }
  const [error, setError] = useState('');
  const [setup, setSetup] = useState(null);    // entry awaiting mode choice
  const [studying, setStudying] = useState(null); // { entry, modes }
  const [drag, setDrag] = useState(false);
  const [confirmDel, setConfirmDel] = useState(null);
  const inputRef = useRef(null);

  const handleFile = useCallback(async (file) => {
    if (!file) return;
    setError('');
    if (file.size > MAX_BYTES) { setError('That file is over 25 MB. Try a smaller one.'); return; }
    try {
      SFX.select?.();
      setBusy({ name: file.name, stage: 'Reading your file', pct: 0.05 });
      const { text } = await extractTextFromFile(file, (p) => setBusy((b) => (b ? { ...b, pct: 0.05 + p * 0.55 } : b)));
      setBusy({ name: file.name, stage: 'Finding the key ideas', pct: 0.68 });
      await new Promise((r) => setTimeout(r, 120));
      const pack = buildStudyPack(text, file.name);
      setBusy({ name: file.name, stage: 'Building flashcards and questions', pct: 0.92 });
      await new Promise((r) => setTimeout(r, 260));
      const entry = { id: newFileId(), name: file.name, title: pack.title, size: file.size, addedAt: Date.now(), pack, best: {}, modes: ['learn', 'cards', 'cbt'] };
      setFiles(saveToLibrary(entry));
      setBusy(null);
      SFX.roundComplete?.();
      setSetup(entry);
    } catch (e) {
      setBusy(null);
      setError(e?.message || 'Something went wrong reading that file.');
      SFX.wrong?.();
    }
  }, []);

  const onDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    handleFile(e.dataTransfer?.files?.[0]);
  };

  const remove = (id) => {
    setFiles(removeFromLibrary(id));
    setConfirmDel(null);
  };

  const refreshFiles = () => setFiles(loadLibrary());

  return (
    <section className="fs-hub">
      <div className="fs-hub-head">
        <span className="fs-hub-badge"><Icon name="sparkles" size={14} /> NEW</span>
        <h2>Study from your own files</h2>
        <p>Upload notes, a textbook chapter or handout. We turn it into lessons, flashcards and practice questions, on your phone. Nothing leaves your device.</p>
      </div>

      <div
        className={`fs-drop${drag ? ' over' : ''}${busy ? ' busy' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        onClick={() => !busy && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !busy) { e.preventDefault(); inputRef.current?.click(); } }}
        aria-label="Upload a file to study"
      >
        <input
          ref={inputRef}
          type="file"
          hidden
          accept=".pdf,.docx,.txt,.md,.markdown,.csv,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ''; }}
        />
        {busy ? (
          <div className="fs-busy">
            <div className="fs-busy-orb"><Icon name="sparkles" size={26} /></div>
            <div className="fs-busy-title">{busy.stage}…</div>
            <div className="fs-busy-file">{busy.name}</div>
            <div className="fs-bar"><i style={{ width: `${Math.round(busy.pct * 100)}%` }} /></div>
          </div>
        ) : (
          <>
            <div className="fs-drop-icon"><Icon name="upload" size={28} /></div>
            <div className="fs-drop-title">Upload a file</div>
            <div className="fs-drop-sub">{SUPPORTED_HINT} · up to 25 MB</div>
            <span className="fs-drop-btn"><Icon name="plus" size={16} /> Choose file</span>
          </>
        )}
      </div>

      {error && (
        <div className="fs-error" role="alert">
          <Icon name="alert" size={18} />
          <span>{error}</span>
          <button onClick={() => setError('')} aria-label="Dismiss"><Icon name="x" size={16} /></button>
        </div>
      )}

      {files.length > 0 && (
        <>
          <div className="fs-list-title">My files <span>{files.length}</span></div>
          <div className="fs-grid">
            {files.map((f, i) => (
              <div
                key={f.id}
                className="fs-file"
                style={{ animationDelay: `${i * 60}ms` }}
                role="button"
                tabIndex={0}
                onClick={() => { SFX.select?.(); setSetup(f); }}
                onKeyDown={(e) => { if (e.key === 'Enter') setSetup(f); }}
              >
                <div className="fs-file-icon"><Icon name="file" size={22} /></div>
                <div className="fs-file-name">{f.title || f.name}</div>
                <div className="fs-file-meta">{f.pack.cards.length} cards · {f.pack.questions.length} Qs</div>
                {f.best?.cbt != null && <div className="fs-file-best"><Icon name="trophy" size={11} /> {f.best.cbt}%</div>}
                <button
                  className="fs-file-del"
                  aria-label={`Delete ${f.title}`}
                  onClick={(e) => { e.stopPropagation(); setConfirmDel(f.id); }}
                >
                  <Icon name="trash" size={14} />
                </button>
                {confirmDel === f.id && (
                  <div className="fs-confirm" onClick={(e) => e.stopPropagation()}>
                    <span>Delete?</span>
                    <button className="yes" onClick={() => remove(f.id)}>Yes</button>
                    <button onClick={() => setConfirmDel(null)}>No</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {setup && (
        <StudySetup
          entry={setup}
          onClose={() => setSetup(null)}
          onStart={(modes) => {
            updateInLibrary(setup.id, { modes });
            setStudying({ entry: setup, modes });
            setSetup(null);
          }}
        />
      )}

      {studying && (
        <StudyPlayer
          entry={studying.entry}
          modes={studying.modes}
          onClose={() => { setStudying(null); refreshFiles(); }}
        />
      )}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SETUP SHEET — pick any pills, then go
   ══════════════════════════════════════════════════════════════════════════ */
function StudySetup({ entry, onClose, onStart }) {
  const [picked, setPicked] = useState(() => (entry.modes?.length ? entry.modes : ['learn', 'cards', 'cbt']));
  const { pack } = entry;
  const allOn = picked.length === MODES.length;

  const toggle = (id) => {
    SFX.select?.();
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };
  const toggleAll = () => { SFX.select?.(); setPicked(allOn ? [] : MODES.map((m) => m.id)); };
  const ordered = MODES.filter((m) => picked.includes(m.id)).map((m) => m.id);

  const unavailable = {
    learn: !pack.sections.length,
    cards: !pack.cards.length,
    cbt: pack.questions.length < 4,
    game: pack.questions.length < 4,
  };

  return (
    <div className="fs-backdrop" onClick={onClose}>
      <div className="fs-sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Choose how to study">
        <div className="fs-sheet-grip" />
        <div className="fs-sheet-top">
          <div className="fs-file-icon lg"><Icon name="file" size={26} /></div>
          <div>
            <div className="fs-sheet-title">{pack.title}</div>
            <div className="fs-sheet-sub">{pack.stats.words.toLocaleString()} words · about {pack.stats.minutes} min read</div>
          </div>
        </div>

        <div className="fs-chips">
          <span><Icon name="bookOpen" size={13} /> {pack.sections.length} lessons</span>
          <span><Icon name="cards" size={13} /> {pack.cards.length} cards</span>
          <span><Icon name="clipboard" size={13} /> {pack.questions.length} questions</span>
        </div>

        <div className="fs-sheet-label">How do you want to study it?</div>
        <div className="fs-pills">
          {MODES.map((m, i) => {
            const off = unavailable[m.id];
            return (
              <button
                key={m.id}
                className={`fs-pill${picked.includes(m.id) ? ' on' : ''}`}
                style={{ animationDelay: `${i * 55}ms` }}
                disabled={off}
                onClick={() => toggle(m.id)}
                aria-pressed={picked.includes(m.id)}
              >
                <Icon name={m.icon} size={17} />
                <span>{m.label}</span>
                {picked.includes(m.id) && <Icon name="check" size={14} className="fs-pill-tick" stroke={2.6} />}
              </button>
            );
          })}
          <button className={`fs-pill combo${allOn ? ' on' : ''}`} onClick={toggleAll} aria-pressed={allOn}>
            <Icon name="layers" size={17} />
            <span>All in one</span>
          </button>
        </div>
        <div className="fs-pill-hint">
          {ordered.length === 0
            ? 'Pick one or mix several. They’ll line up as tabs.'
            : ordered.length === 1
              ? MODE_BY_ID[ordered[0]].desc
              : `Combo: ${ordered.map((id) => MODE_BY_ID[id].label).join(' + ')}`}
        </div>

        <button
          className="fs-go shine"
          disabled={!ordered.length}
          onClick={() => { SFX.submit?.(); onStart(ordered.filter((id) => !unavailable[id])); }}
        >
          Start studying <Icon name="arrowRight" size={18} />
        </button>
        <button className="fs-cancel" onClick={onClose}>Not now</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PLAYER — full-screen, tabs for each chosen mode
   ══════════════════════════════════════════════════════════════════════════ */
function StudyPlayer({ entry, modes, onClose }) {
  const [active, setActive] = useState(modes[0]);
  const { pack } = entry;

  const saveBest = (key, value) => {
    const prev = entry.best?.[key];
    if (prev == null || value > prev) {
      entry.best = { ...(entry.best || {}), [key]: value };
      try { updateInLibrary(entry.id, { best: entry.best }); } catch { /* ignore */ }
    }
  };

  const next = () => {
    const i = modes.indexOf(active);
    if (i < modes.length - 1) setActive(modes[i + 1]);
  };
  const hasNext = modes.indexOf(active) < modes.length - 1;

  return (
    <div className="fs-player" role="dialog" aria-modal="true">
      <div className="fs-player-head">
        <button className="fs-back" onClick={onClose} aria-label="Close"><Icon name="arrowLeft" size={20} /></button>
        <div className="fs-player-title">{pack.title}</div>
      </div>
      {modes.length > 1 && (
        <div className="fs-tabs">
          {modes.map((id) => (
            <button key={id} className={`fs-tab${active === id ? ' on' : ''}`} onClick={() => { SFX.select?.(); setActive(id); }}>
              <Icon name={MODE_BY_ID[id].icon} size={15} /> {MODE_BY_ID[id].label}
            </button>
          ))}
        </div>
      )}
      <div className="fs-player-body" key={active}>
        {active === 'summary' && <SummaryView pack={pack} onNext={hasNext ? next : null} />}
        {active === 'learn' && <LearnView pack={pack} onNext={hasNext ? next : null} />}
        {active === 'cards' && <CardsView pack={pack} onNext={hasNext ? next : null} />}
        {active === 'cbt' && <QuizView pack={pack} onNext={hasNext ? next : null} onScore={(p) => saveBest('cbt', p)} />}
        {active === 'game' && <GameView pack={pack} onNext={hasNext ? next : null} onScore={(s) => saveBest('game', s)} />}
      </div>
    </div>
  );
}

const NextBtn = ({ onNext, label = 'Next mode' }) =>
  onNext ? (
    <button className="fs-primary shine" onClick={() => { SFX.select?.(); onNext(); }}>
      {label} <Icon name="arrowRight" size={18} />
    </button>
  ) : null;

/* ── Summary ─────────────────────────────────────────────────────────────── */
function SummaryView({ pack, onNext }) {
  const { overview, points, terms } = pack.summary;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const txt = `${pack.title}\n\n${overview.join(' ')}\n\n${points.map((p) => `• ${p}`).join('\n')}`;
    try { await navigator.clipboard.writeText(txt); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };
  return (
    <div className="fs-scroll">
      <div className="fs-tldr">
        <div className="fs-tldr-tag"><Icon name="sparkles" size={13} /> IN SHORT</div>
        <p>{overview.join(' ')}</p>
      </div>
      <div className="fs-h">Key points</div>
      <ul className="fs-points">
        {points.map((p, i) => (
          <li key={i} style={{ animationDelay: `${i * 70}ms` }}><span>{i + 1}</span><p>{p}</p></li>
        ))}
      </ul>
      {terms.length > 0 && (
        <>
          <div className="fs-h">Key terms</div>
          <div className="fs-terms">
            {terms.map((t, i) => <span key={t} style={{ animationDelay: `${i * 40}ms` }}>{t}</span>)}
          </div>
        </>
      )}
      <div className="fs-actions">
        <button className="fs-ghost" onClick={copy}><Icon name={copied ? 'check' : 'share'} size={16} /> {copied ? 'Copied' : 'Copy summary'}</button>
        <NextBtn onNext={onNext} />
      </div>
    </div>
  );
}

/* ── Learn (bit by bit) ─────────────────────────────────────────────────── */
function LearnView({ pack, onNext }) {
  const secs = pack.sections;
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(1);     // points revealed so far
  const [pick, setPick] = useState(null);
  const [done, setDone] = useState(false);
  const sec = secs[i];

  useEffect(() => { setShown(1); setPick(null); }, [i]);

  if (done) {
    return (
      <div className="fs-center">
        <Confetti count={60} />
        <div className="fs-medal"><Icon name="trophy" size={40} /></div>
        <h3>Lesson complete</h3>
        <p>You worked through all {secs.length} parts. Lock it in with a quiz or flashcards.</p>
        <NextBtn onNext={onNext} label="Keep going" />
        <button className="fs-ghost" onClick={() => { setDone(false); setI(0); }}><Icon name="refresh" size={16} /> Start over</button>
      </div>
    );
  }
  const allShown = shown >= sec.points.length;
  const chk = sec.check;
  const answered = pick !== null;
  const canContinue = allShown && (!chk || answered);

  const go = () => {
    SFX.select?.();
    if (i < secs.length - 1) setI(i + 1); else { SFX.roundComplete?.(); setDone(true); }
  };

  return (
    <div className="fs-scroll">
      <div className="fs-progress">
        <div className="fs-progress-txt">Part {i + 1} of {secs.length}</div>
        <div className="fs-bar"><i style={{ width: `${((i + (canContinue ? 1 : 0.3)) / secs.length) * 100}%` }} /></div>
      </div>
      <h3 className="fs-lesson-title" key={`t${i}`}>{sec.title}</h3>

      <div className="fs-stack">
        {sec.points.slice(0, shown).map((p, k) => (
          <div className="fs-bit" key={`${i}-${k}`}>
            <span className="fs-bit-dot" />
            <p>{p}</p>
          </div>
        ))}
      </div>

      {!allShown && (
        <button className="fs-more shine" onClick={() => { SFX.select?.(); setShown((s) => s + 1); }}>
          <Icon name="plus" size={16} /> Show next point
        </button>
      )}

      {allShown && sec.terms.length > 0 && (
        <div className="fs-terms tight">{sec.terms.map((t) => <span key={t}>{t}</span>)}</div>
      )}

      {allShown && chk && (
        <div className="fs-check">
          <div className="fs-check-tag"><Icon name="bulb" size={14} /> Quick check</div>
          <div className="fs-check-q">{chk.q}</div>
          <div className="fs-opts">
            {chk.o.map((o, k) => {
              const state = !answered ? '' : k === chk.a ? 'right' : k === pick ? 'wrong' : 'dim';
              return (
                <button key={k} className={`fs-opt ${state}`} disabled={answered} onClick={() => { setPick(k); (k === chk.a ? SFX.correct : SFX.wrong)?.(); }}>
                  <b>{LETTERS[k]}</b><span>{o}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {canContinue && (
        <button className="fs-primary shine" onClick={go}>
          {i < secs.length - 1 ? 'Next part' : 'Finish'} <Icon name="arrowRight" size={18} />
        </button>
      )}
    </div>
  );
}

/* ── Flashcards ──────────────────────────────────────────────────────────── */
function CardsView({ pack, onNext }) {
  const [deck, setDeck] = useState(() => pack.cards.slice());
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const [known, setKnown] = useState(0);
  const [missed, setMissed] = useState([]);
  const [finished, setFinished] = useState(false);
  const total = deck.length;

  const answer = (gotIt) => {
    (gotIt ? SFX.correct : SFX.select)?.();
    if (gotIt) setKnown((k) => k + 1); else setMissed((m) => [...m, deck[i]]);
    setFlip(false);
    setTimeout(() => { if (i + 1 >= total) setFinished(true); else setI(i + 1); }, 180);
  };

  const restart = (cards) => { setDeck(shuffled(cards)); setI(0); setKnown(0); setMissed([]); setFinished(false); setFlip(false); };

  if (finished) {
    const pct = Math.round((known / total) * 100);
    return (
      <div className="fs-center">
        {pct >= 70 && <Confetti count={60} />}
        <div className="fs-ring" style={{ '--p': pct }}><b>{pct}%</b><span>knew it</span></div>
        <h3>{missed.length === 0 ? 'You know this deck' : `${missed.length} to review`}</h3>
        <p>{known} of {total} cards got a “Got it”.</p>
        {missed.length > 0 && <button className="fs-primary shine" onClick={() => restart(missed)}><Icon name="refresh" size={17} /> Review the {missed.length} you missed</button>}
        <button className="fs-ghost" onClick={() => restart(pack.cards)}><Icon name="refresh" size={16} /> Shuffle whole deck</button>
        <NextBtn onNext={onNext} />
      </div>
    );
  }
  const c = deck[i];
  return (
    <div className="fs-scroll fs-cards">
      <div className="fs-progress">
        <div className="fs-progress-txt">Card {i + 1} of {total}</div>
        <div className="fs-bar"><i style={{ width: `${(i / total) * 100}%` }} /></div>
      </div>
      <div className={`fs-flip${flip ? ' on' : ''}`} onClick={() => { SFX.select?.(); setFlip((f) => !f); }} role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlip((f) => !f); } }}>
        <div className="fs-flip-inner">
          <div className="fs-face front">
            <span className="fs-face-tag">{c.kind === 'cloze' ? 'FILL THE GAP' : 'TERM'}</span>
            <div className="fs-face-text">{c.front}</div>
            <span className="fs-face-hint">Tap to flip</span>
          </div>
          <div className="fs-face back">
            <span className="fs-face-tag">ANSWER</span>
            <div className="fs-face-text sm">{c.back}</div>
          </div>
        </div>
      </div>
      <div className={`fs-rate${flip ? ' show' : ''}`}>
        <button className="miss" onClick={() => answer(false)} disabled={!flip}><Icon name="refresh" size={17} /> Still learning</button>
        <button className="hit" onClick={() => answer(true)} disabled={!flip}><Icon name="check" size={17} stroke={2.6} /> Got it</button>
      </div>
    </div>
  );
}

/* ── CBT quiz ────────────────────────────────────────────────────────────── */
function QuizView({ pack, onNext, onScore }) {
  const all = pack.questions;
  const sizes = [10, 20, all.length].filter((n, k, a) => n <= all.length && a.indexOf(n) === k);
  const [size, setSize] = useState(null);
  const [qs, setQs] = useState([]);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const begin = (n) => { setQs(shuffled(all).slice(0, n)); setSize(n); setI(0); setPick(null); setChecked(false); setAnswers([]); setFinished(false); };

  if (size === null) {
    return (
      <div className="fs-center">
        <div className="fs-medal soft"><Icon name="clipboard" size={34} /></div>
        <h3>Practice quiz</h3>
        <p>Questions written from your file. How many do you want?</p>
        <div className="fs-sizes">
          {sizes.map((n) => (
            <button key={n} className="fs-size" onClick={() => { SFX.select?.(); begin(n); }}>
              <b>{n === all.length && sizes.length > 1 && n !== 10 && n !== 20 ? 'All' : n}</b>
              <span>{n === all.length && n !== 10 && n !== 20 ? `${n} questions` : 'questions'}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (finished) {
    const right = answers.filter((a) => a.ok).length;
    const pct = Math.round((right / qs.length) * 100);
    const wrong = answers.filter((a) => !a.ok);
    return (
      <div className="fs-scroll">
        {pct >= 70 && <Confetti count={pct === 100 ? 100 : 70} />}
        <div className="fs-result">
          <div className="fs-ring big" style={{ '--p': pct }}><b>{pct}%</b><span>{right}/{qs.length}</span></div>
          <h3>{pct >= 80 ? 'Excellent work' : pct >= 50 ? 'Getting there' : 'Keep practising'}</h3>
          <p>{pct >= 80 ? 'You really know this material.' : 'Review what you missed below, then try again.'}</p>
        </div>
        {wrong.length > 0 && (
          <>
            <div className="fs-h">Review ({wrong.length})</div>
            {wrong.map((w, k) => (
              <div className="fs-review" key={k}>
                <div className="fs-review-q">{w.q.q}</div>
                <div className="fs-review-a"><Icon name="check" size={14} stroke={2.6} /> {w.q.o[w.q.a]}</div>
                <div className="fs-review-e">{w.q.e}</div>
              </div>
            ))}
          </>
        )}
        <div className="fs-actions">
          <button className="fs-ghost" onClick={() => setSize(null)}><Icon name="refresh" size={16} /> Try again</button>
          <NextBtn onNext={onNext} />
        </div>
      </div>
    );
  }

  const q = qs[i];
  const submit = () => {
    setChecked(true);
    const ok = pick === q.a;
    (ok ? SFX.correct : SFX.wrong)?.();
    setAnswers((a) => [...a, { q, ok }]);
  };
  const advance = () => {
    if (i + 1 >= qs.length) {
      const right = answers.filter((a) => a.ok).length;
      onScore?.(Math.round((right / qs.length) * 100));
      SFX.roundComplete?.();
      setFinished(true);
    } else { setI(i + 1); setPick(null); setChecked(false); }
  };
  return (
    <div className="fs-scroll">
      <div className="fs-progress">
        <div className="fs-progress-txt">Question {i + 1} of {qs.length}</div>
        <div className="fs-bar"><i style={{ width: `${(i / qs.length) * 100}%` }} /></div>
      </div>
      <div className="fs-q" key={i}>{q.q}</div>
      <div className="fs-opts" key={`o${i}`}>
        {q.o.map((o, k) => {
          const state = !checked ? (pick === k ? 'sel' : '') : k === q.a ? 'right' : k === pick ? 'wrong' : 'dim';
          return (
            <button key={k} className={`fs-opt ${state}`} style={{ animationDelay: `${k * 60}ms` }} disabled={checked} onClick={() => { SFX.select?.(); setPick(k); }}>
              <b>{LETTERS[k]}</b><span>{o}</span>
            </button>
          );
        })}
      </div>
      {checked && <div className={`fs-explain ${pick === q.a ? 'ok' : 'no'}`}><Icon name={pick === q.a ? 'checkCircle' : 'bulb'} size={18} /><span>{q.e}</span></div>}
      {!checked
        ? <button className="fs-primary shine" disabled={pick === null} onClick={submit}>Check answer</button>
        : <button className="fs-primary shine" onClick={advance}>{i + 1 >= qs.length ? 'See results' : 'Next question'} <Icon name="arrowRight" size={18} /></button>}
    </div>
  );
}

/* ── Game: lives, streak multiplier, countdown ──────────────────────────── */
const GAME_SECONDS = 12;
function GameView({ pack, onNext, onScore }) {
  const [phase, setPhase] = useState('intro');
  const [order, setOrder] = useState([]);
  const [i, setI] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [right, setRight] = useState(0);
  const [picked, setPicked] = useState(null);
  const [gain, setGain] = useState(null);
  const startedAt = useRef(0);
  const timer = useRef(null);
  const best = useRef(0);

  const mult = Math.min(5, 1 + Math.floor(streak / 3));

  const start = () => {
    setOrder(shuffled(pack.questions).slice(0, 25));
    setI(0); setLives(3); setScore(0); setStreak(0); setBestStreak(0); setRight(0); setPicked(null); setGain(null);
    setPhase('play');
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  const finishOrNext = useCallback((nextI, livesLeft) => {
    if (livesLeft <= 0 || nextI >= order.length) {
      setPhase('over');
      SFX.roundComplete?.();
    } else { setI(nextI); setPicked(null); setGain(null); }
  }, [order.length]);

  const resolve = useCallback((choice, q) => {
    clearTimeout(timer.current);
    setPicked(choice === null ? -1 : choice);
    const ok = choice === q.a;
    if (ok) {
      const nextStreak = streak + 1;
      const m = Math.min(5, 1 + Math.floor(nextStreak / 3));
      const left = Math.max(0, GAME_SECONDS - (Date.now() - startedAt.current) / 1000);
      const pts = 100 * m + Math.round(left * 5);
      setScore((s) => { const n = s + pts; best.current = n; return n; });
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
      setRight((r) => r + 1);
      setGain(`+${pts}`);
      SFX.correct?.();
      timer.current = setTimeout(() => finishOrNext(i + 1, lives), 950);
    } else {
      const left = lives - 1;
      setLives(left);
      setStreak(0);
      setGain(null);
      SFX.wrong?.();
      timer.current = setTimeout(() => finishOrNext(i + 1, left), 1300);
    }
  }, [streak, lives, i, finishOrNext]);

  // Per-question countdown
  useEffect(() => {
    if (phase !== 'play' || picked !== null || !order[i]) return undefined;
    startedAt.current = Date.now();
    const q = order[i];
    timer.current = setTimeout(() => resolve(null, q), GAME_SECONDS * 1000);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, i, order]);

  useEffect(() => { if (phase === 'over') onScore?.(best.current); }, [phase]); // eslint-disable-line

  if (phase === 'intro') {
    return (
      <div className="fs-center">
        <div className="fs-medal soft"><Icon name="gamepad" size={36} /></div>
        <h3>Rapid fire</h3>
        <p>3 lives. {GAME_SECONDS} seconds a question. Chain correct answers to multiply your score up to ×5.</p>
        <button className="fs-primary shine" onClick={() => { SFX.submit?.(); start(); }}>Play <Icon name="play" size={16} /></button>
      </div>
    );
  }

  if (phase === 'over') {
    const acc = order.length ? Math.round((right / Math.min(order.length, i + 1)) * 100) : 0;
    return (
      <div className="fs-center">
        {score >= 1500 && <Confetti count={80} />}
        <div className="fs-scorebig">{score.toLocaleString()}</div>
        <div className="fs-scorelabel">POINTS</div>
        <div className="fs-chips center">
          <span><Icon name="flame" size={13} /> Best streak {bestStreak}</span>
          <span><Icon name="target" size={13} /> {acc}% accuracy</span>
        </div>
        <button className="fs-primary shine" onClick={() => { SFX.submit?.(); start(); }}><Icon name="refresh" size={17} /> Play again</button>
        <NextBtn onNext={onNext} />
      </div>
    );
  }

  const q = order[i];
  if (!q) return null;
  return (
    <div className="fs-scroll fs-game">
      <div className="fs-hud">
        <div className="fs-lives">{[0, 1, 2].map((k) => <Icon key={k} name="heart" size={20} className={k < lives ? 'on' : 'off'} />)}</div>
        <div className="fs-score">{score.toLocaleString()}</div>
        <div className={`fs-mult m${mult}`}><Icon name="zap" size={13} /> ×{mult}</div>
      </div>
      <div className="fs-timer"><i key={i} style={{ animationDuration: `${GAME_SECONDS}s`, animationPlayState: picked === null ? 'running' : 'paused' }} /></div>
      <div className="fs-q game" key={`q${i}`}>{q.q}</div>
      {gain && <div className="fs-gain" key={`g${i}`}>{gain}</div>}
      <div className="fs-opts">
        {q.o.map((o, k) => {
          const state = picked === null ? '' : k === q.a ? 'right' : k === picked ? 'wrong shake' : 'dim';
          return (
            <button key={`${i}-${k}`} className={`fs-opt ${state}`} style={{ animationDelay: `${k * 50}ms` }} disabled={picked !== null} onClick={() => resolve(k, q)}>
              <b>{LETTERS[k]}</b><span>{o}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
