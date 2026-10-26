import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import GameMode from '../components/GameMode';
import { captureTrafficSource } from '../utils/trafficSource';
import { trackGame } from '../utils/gameApi';
import logo from '../assets/elite-scholars-logo.png';
import '../styles/gamemode.css';

// Public game page (/game): only the games. Guests get 2 free games per visit, then a sign-up prompt.
export default function GamePage() {
  const nav = useNavigate();
  const member = useMemo(() => { try { return !!(JSON.parse(localStorage.getItem('ep_user') || 'null') || {}).email; } catch { return false; } }, []);
  useEffect(() => {
    captureTrafficSource();
    trackGame('game_view');
    document.title = 'Play free study games | EliteScholars';
  }, []);
  const signup = () => {
    try { localStorage.setItem('es_via_game', '1'); localStorage.removeItem('es_has_account'); } catch { /* ignore */ }
    nav('/app');
  };
  return (
    <div className="gp-page">
      <header className="gp-head">
        <a href="/" className="gp-logo" aria-label="EliteScholars home"><img src={logo} alt="" width="34" height="34" /></a>
        <b className="gp-title">Game</b>
        <button type="button" className="gp-signup" onClick={member ? () => nav('/app') : signup}>{member ? 'Open app' : 'Sign up'}</button>
      </header>
      <GameMode guest onSignup={signup} onBack={() => nav('/')} email="" name="" />
    </div>
  );
}
