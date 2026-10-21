import React from 'react';
import Icon from './Icon';
import { GOLD } from '../utils/colors';

export default function GameHud({ score, lives, timer, maxTimer, combo }) {
  const timerPct = (timer / maxTimer) * 100;
  return (
    <div className="game-hud">
      <div className="game-hud-lives">{Array.from({ length: 3 }).map((_, i) => (
        <Icon key={i} name="heart" size={17} style={{ opacity: i < lives ? 1 : 0.2, color: '#EF4444' }} />
      ))}</div>
      <div className="game-hud-center">
        <div className="game-timer-bar">
          <div className="game-timer-fill" style={{ width: `${timerPct}%`, background: timerPct < 30 ? '#EF4444' : GOLD }} />
        </div>
      </div>
      <div className="game-hud-score">
        <span className="game-score-num">{score}</span>
        {combo > 1 && <span className="game-combo">×{combo}</span>}
      </div>
    </div>
  );
}
