import React, { useEffect, useState } from 'react';
import Icon from './Icon';
import Confetti from './Confetti';
import { postScore, shareScore } from '../utils/gameApi';

// Shown only after a game: your score, who you beat, the top players and where you are, plus share buttons.
export default function GameBoard({ game, score, guest, onSignup }) {
  const [d, setD] = useState(undefined);
  useEffect(() => { let on = true; postScore(game, score).then((x) => on && setD(x)); return () => { on = false; }; }, [game, score]);
  const confetti = score > 0 && <Confetti count={26} duration={1900} />;
  if (d === undefined) return <>{confetti}<p className="gb-note">Checking the scoreboard…</p></>;
  if (!d) return <>{confetti}</>;
  const inTop = d.top.some((p) => p.you);
  return (
    <div className="gb">
      {confetti}
      <div className="gb-msg">
        {d.beat && d.beat.length ? <b>You beat {d.beat.map((p) => p.name).join(', ')}!</b> : d.newBest ? <b>New best this week!</b> : <b>Your best this week: {d.best}</b>}
        {d.nextUp && <span>{d.nextUp.gap} pts behind {d.nextUp.name}. One more round?</span>}
      </div>
      <div className="gb-title"><Icon name="trophy" size={16} /> Top players this week</div>
      {d.top.map((p) => <div key={p.rank} className={`gb-row ${p.you ? 'you' : ''}`}><i>{p.rank}</i><span>{p.name}{p.you ? ' (you)' : ''}</span><b>{p.score}</b></div>)}
      {!inTop && d.mine && <><div className="gb-gap">· · ·</div><div className="gb-row you"><i>{d.mine.rank}</i><span>{d.mine.name} (you)</span><b>{d.mine.score}</b></div></>}
      <div className="gb-share">
        <button type="button" className="wa" onClick={() => shareScore(score, 'whatsapp')}>Challenge on WhatsApp</button>
        <button type="button" onClick={() => shareScore(score, navigator.share ? 'native' : 'copy')}><Icon name="share" size={14} /> {navigator.share ? 'Share' : 'Copy'}</button>
      </div>
      {guest && onSignup && <button type="button" className="gb-signup" onClick={onSignup}>Sign up to save your score</button>}
    </div>
  );
}
