import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { initSyncQueue, flushSyncQueue, queueLength } from '../utils/syncQueue';

// ============================================================================
// OfflineBanner — thin status strip, not a blocking modal. Study content
// (question banks, flashcards, Learn, games) is bundled into the JS and
// already works with zero network once the app shell is cached by the
// service worker, so going offline doesn't stop studying — this banner is
// just honest feedback that live features (challenges, leaderboard, sync)
// are paused until the connection returns.
// ============================================================================

export default function OfflineBanner() {
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine);
  const [justReconnected, setJustReconnected] = useState(false);

  useEffect(() => {
    initSyncQueue();
    const goOffline = () => setOnline(false);
    const goOnline = () => {
      setOnline(true);
      if (queueLength() > 0) {
        setJustReconnected(true);
        flushSyncQueue();
        setTimeout(() => setJustReconnected(false), 2600);
      }
    };
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (online && !justReconnected) return null;

  return (
    <div className={`offline-banner ${online ? 'back' : ''}`}>
      <Icon name={online ? 'wifi' : 'wifiOff'} size={13} />
      <span>{online ? 'Back online — syncing your progress…' : "You're offline — study mode still works, live features will resume when you're back"}</span>
    </div>
  );
}
