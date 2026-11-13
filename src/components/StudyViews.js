import React, { useState } from 'react';
import Icon from './Icon';
import { SFX } from '../utils/sounds';
import { sanitizeHtml, answersToText } from '../utils/studyEngine';

// ============================================================================
// Screens for what the study engine makes:
//   AnswerSheet — worked answers for a question or a whole question paper
//   NotesView   — written notes
//   SourcesFoot — where the information came from (always at the bottom, never on each item)
// ============================================================================

const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };

export function SourcesFoot({ sources }) {
  const list = (sources || []).filter((s) => s && /^https?:\/\//.test(s.url || ''));
  if (!list.length) return null;
  return (
    <div className="fs-sources">
      <div className="fs-h">Sources</div>
      <ul>
        {list.map((s, i) => (
          <li key={s.url + i}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              <span className="fs-src-title">{s.title || hostOf(s.url)}</span>
              <span className="fs-src-host">{s.label && !/^(notes|dictionary)$/i.test(s.label) ? `${s.label} · ` : ''}{hostOf(s.url)}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Notes ─────────────────────────────────────────────────────────────────────────────── */
function NoteLine({ x }) {
  const t = x && x.text ? x.text : '';
  const m = /^([^:]{2,40}):\s(.*)$/.exec(t);
  return m ? <><b>{m[1]}</b>: {m[2]}</> : <>{t}</>;
}

export function NotesView({ pack, onNext }) {
  const notes = pack.notes || [];
  const NextBtn = onNext && (
    <button className="fs-primary shine" onClick={() => { SFX.select?.(); onNext(); }}>
      Next mode <Icon name="arrowRight" size={18} />
    </button>
  );
  return (
    <div className="fs-scroll fs-notes">
      {notes.map((n, i) => {
        const it = n.items || {};
        return (
          <section className="fs-note" key={i}>
            <h3>{n.title}</h3>
            {(it.what || []).map((x, k) => <p key={k} className={k === 0 ? 'lead' : ''}><NoteLine x={x} /></p>)}
            {(it.how || []).length > 0 && (
              <ul className="fs-note-list">{it.how.map((x, k) => <li key={k}><NoteLine x={x} /></li>)}</ul>
            )}
            {(it.why || []).map((x, k) => <div className="fs-note-why" key={k}><NoteLine x={x} /></div>)}
            {(it.example || []).length > 0 && (
              <>
                <p className="fs-note-eg">For example</p>
                <ul className="fs-note-list">{it.example.map((x, k) => <li key={k}><NoteLine x={x} /></li>)}</ul>
              </>
            )}
            {(n.formulas || []).length > 0 && (
              <div className="fs-note-eq">{n.formulas.map((f, k) => <div key={k}>{typeof f === 'string' ? f : (f.eq || f.text || '')}</div>)}</div>
            )}
            {(n.worked || []).map((w, k) => (
              <div className="fs-note-worked" key={`w${k}`}>
                <div className="fs-note-wh">Worked example</div>
                <p className="fs-note-wp">{w.word ? '' : `${w.cmd || 'Solve'} `}{w.problem}</p>
                {(w.steps || []).slice(w.word ? 0 : 1, w.word ? undefined : -1).map((st, j) => <div className="fs-note-ws" key={j}>{st}</div>)}
                {w.answer && <div className="fs-note-wa">{w.answer}</div>}
              </div>
            ))}
            {(n.wordHelp || []).length > 0 && (
              <dl className="fs-note-words">
                {n.wordHelp.map((w, k) => <React.Fragment key={k}><dt>{w.word}</dt><dd><i>{w.pos}</i> {w.def}</dd></React.Fragment>)}
              </dl>
            )}
          </section>
        );
      })}
      {!notes.length && <p className="fs-empty">There wasn’t enough in this to write notes from.</p>}
      <SourcesFoot sources={pack.sources} />
      <div className="fs-actions">{NextBtn}</div>
    </div>
  );
}

/* ── Answers ─────────────────────────────────────────────────────────────────────── */
const STATE = {
  ok: null,
  low: 'Check this one. The working may have misread the question.',
  fail: 'This one couldn’t be solved automatically.',
  theory: null,
};

export function AnswerSheet({ entry, onClose, onNotes, onNotesFor }) {
  const [copied, setCopied] = useState(false);
  const items = entry.items || [];
  const multi = items.length > 1;
  const copy = async () => {
    try { await navigator.clipboard.writeText(answersToText(items)); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };
  return (
    <div className="fs-player" role="dialog" aria-modal="true">
      <div className="fs-player-head">
        <button className="fs-back" onClick={onClose} aria-label="Close"><Icon name="arrowLeft" size={20} /></button>
        <div className="fs-player-title">{entry.title}</div>
      </div>
      <div className="fs-player-body">
        <div className="fs-scroll">
          {multi && <div className="fs-qa-count">{items.length} questions</div>}
          {items.map((it) => (
            <article className="fs-qa" key={it.n}>
              <div className="fs-qa-head">
                {multi && <span className="fs-qa-n">{it.n}</span>}
                {it.marks ? <span className="fs-qa-marks">{it.marks} marks</span> : null}
              </div>
              <p className="fs-qa-q">{it.text}</p>
              {STATE[it.st] && <div className="fs-qa-warn"><Icon name="alert" size={14} /> {STATE[it.st]}</div>}
              <div className="fs-qa-body" dangerouslySetInnerHTML={{ __html: sanitizeHtml(it.html) }} />
              {it.st === 'theory' && onNotesFor && (
                <button className="fs-ghost sm" onClick={() => onNotesFor(it.text)}><Icon name="file" size={15} /> Make notes on this</button>
              )}
            </article>
          ))}
          <SourcesFoot sources={entry.sources} />
          <div className="fs-actions">
            {onNotes && (
              <button className="fs-primary shine" onClick={() => { SFX.select?.(); onNotes(); }}>
                <Icon name="bookOpen" size={18} /> Make study notes from this
              </button>
            )}
            <button className="fs-ghost" onClick={copy}><Icon name={copied ? 'check' : 'copy'} size={16} /> {copied ? 'Copied' : 'Copy answers'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
