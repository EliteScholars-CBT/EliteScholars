import React, { useEffect, useState } from 'react';

// The "Games" slide on the landing page: it opens on the real games screen, then plays quick looks at
// five of the games (one second each) so visitors see what playing actually feels like.
const SCENES = ['scramble', 'memory', 'highlow', 'math', 'tf'];

function Scramble() {
  const word = 'BIOLOGY';
  return (
    <div className="gp-body">
      <div className="gp-title">Word Scramble</div>
      <div className="gp-clue">The study of living things</div>
      <div className="gp-slots">{word.split('').map((c, i) => <b key={i} style={{ animationDelay: `${0.12 + i * 0.1}s` }}>{c}</b>)}</div>
      <div className="gp-tiles">{'GYBOILO'.split('').map((c, i) => <i key={i} style={{ animationDelay: `${0.05 + i * 0.1}s` }}>{c}</i>)}</div>
    </div>
  );
}

function Memory() {
  const cards = ['⚽', '🧪', '⚽', '🌍', '🧪', '🌍', '📐', '📐'];
  const hit = { 0: 0.15, 2: 0.15, 1: 0.5, 4: 0.5 };
  return (
    <div className="gp-body">
      <div className="gp-title">Memory Match</div>
      <div className="gp-grid">{cards.map((c, i) => <div key={i} className={`gp-card ${hit[i] !== undefined ? 'flip' : ''}`} style={hit[i] !== undefined ? { animationDelay: `${hit[i]}s` } : undefined}><span>{c}</span></div>)}</div>
      <div className="gp-combo">Combo x2</div>
    </div>
  );
}

function HighLow() {
  return (
    <div className="gp-body">
      <div className="gp-title">Higher or Lower</div>
      <div className="gp-hl">
        <div className="gp-hlc win"><small>Height of Mount Kilimanjaro (m)</small><b>5,895</b></div>
        <div className="gp-vs">VS</div>
        <div className="gp-hlc lose"><small>Year of the Amalgamation</small><b>1914</b></div>
      </div>
      <div className="gp-ok">Correct! +15</div>
    </div>
  );
}

function Maths() {
  return (
    <div className="gp-body">
      <div className="gp-title">Speed Maths</div>
      <div className="gp-sum">17 × 6 = <span><i>1</i><i>0</i><i>2</i></span></div>
      <div className="gp-pad">{'123456789⌫0✓'.split('').map((k) => <b key={k}>{k}</b>)}</div>
      <div className="gp-ok">Combo x3</div>
    </div>
  );
}

function TrueFalse() {
  return (
    <div className="gp-body">
      <div className="gp-title">True or False</div>
      <div className="gp-clue">A scaly mammal that curls into a ball</div>
      <div className="gp-big">Pangolin</div>
      <div className="gp-tf"><b className="t">✓ True</b><b className="f">✗ False</b></div>
      <div className="gp-ok">Correct! +15</div>
    </div>
  );
}

const VIEW = { scramble: Scramble, memory: Memory, highlow: HighLow, math: Maths, tf: TrueFalse };

export default function LandingGamePreview({ active, base }) {
  const [step, setStep] = useState(-1); // -1 = the real screen, then 0..4 = the mini games
  useEffect(() => {
    if (!active) { setStep(-1); return undefined; }
    let alive = true;
    let t;
    const go = (s) => {
      if (!alive) return;
      setStep(s);
      t = setTimeout(() => go(s + 1 >= SCENES.length ? -1 : s + 1), s === -1 ? 1500 : 1000);
    };
    go(-1);
    return () => { alive = false; clearTimeout(t); };
  }, [active]);

  const Scene = step >= 0 ? VIEW[SCENES[step]] : null;
  return (
    <div className={`gp ${active ? 'on' : ''}`} aria-hidden={!active}>
      <img className={`gp-base ${step === -1 ? 'show' : ''}`} src={base} alt="Games" draggable="false" />
      {Scene && (
        <div className="gp-scene" key={step}>
          <div className="gp-hud"><span>❤️❤️❤️</span><span>⏱ 0:09</span><span>⭐ {40 + step * 15}</span></div>
          <Scene />
        </div>
      )}
    </div>
  );
}
