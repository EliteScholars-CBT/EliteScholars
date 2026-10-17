import React from 'react';
import { BG, PURPLE, GOLD, WHITE, LGRAY } from '../utils/colors';
import { EmojiIcon } from './Icon';

// Available universities with question banks
const AVAILABLE_UNIVERSITIES = [
  { id: 'unilag', name: 'UNILAG', shortName: 'University of Lagos', available: true, icon: '🎓' },
  { id: 'lasu', name: 'LASU', shortName: 'Lagos State University', available: true, icon: '🎓' },
  { id: 'unn', name: 'UNN', shortName: 'University of Nigeria, Nsukka', available: true, icon: '🎓' },
  { id: 'uniben', name: 'UNIBEN', shortName: 'University of Benin', available: true, icon: '🎓' },
  { id: 'abu', name: 'ABU', shortName: 'Ahmadu Bello University, Zaria', available: true, icon: '🎓' },
  { id: 'buk', name: 'BUK', shortName: 'Bayero University, Kano', available: true, icon: '🎓' },
  { id: 'funaab', name: 'FUNAAB', shortName: 'Federal University of Agriculture, Abeokuta', available: true, icon: '🎓' },
  { id: 'lautech', name: 'LAUTECH', shortName: 'Ladoke Akintola University of Technology', available: true, icon: '🎓' },
  { id: 'unical', name: 'UNICAL', shortName: 'University of Calabar', available: true, icon: '🎓' },
  { id: 'unilorin', name: 'UNILORIN', shortName: 'University of Ilorin', available: true, icon: '🎓' },
  { id: 'uniuyo', name: 'UNIUYO', shortName: 'University of Uyo', available: true, icon: '🎓' },
  // Coming Soon - Placeholders
  { id: 'oau', name: 'OAU', shortName: 'Obafemi Awolowo University, Ile-Ife', available: false, icon: '🔒' },
  { id: 'uniport', name: 'UNIPORT', shortName: 'University of Port Harcourt', available: false, icon: '🔒' },
  { id: 'ui', name: 'UI', shortName: 'University of Ibadan', available: false, icon: '🔒' },
];

export default function UniversitySelect({ onSelectUniversity, onBack }) {
  return (
    <div className="scr fd university-select-page">
      {/* Header */}
      <div className="university-header-section">
        <button className="university-back-btn" onClick={onBack}>
          ← Back
        </button>
        <div className="university-header-content">
          <div className="university-icon"><EmojiIcon emoji="🏛️" size="1.1em" /></div>
          <h1>Select <span style={{ color: GOLD }}>University</span></h1>
          <p>Choose your university for POST UTME practice</p>
        </div>
      </div>

      {/* University Grid */}
      <div className="university-grid-container">
        <div className="university-grid">
          {AVAILABLE_UNIVERSITIES.map((uni) => (
            <div
              key={uni.id}
              className={`university-card ${uni.available ? 'available' : 'coming-soon'}`}
              onClick={() => uni.available && onSelectUniversity(uni.id)}
              style={{ cursor: uni.available ? 'pointer' : 'default' }}
            >
              <div className="university-card-icon">{uni.icon}</div>
              <div className="university-card-name">{uni.name}</div>
              <div className="university-card-fullname">{uni.shortName}</div>
              {uni.available ? (
                <div className="university-card-badge available">Available</div>
              ) : (
                <div className="university-card-badge coming"><EmojiIcon emoji="🔒" size="1.15em" /> Coming Soon</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="university-footer">
        <p>More universities coming soon! 🚀</p>
      </div>
    </div>
  );
}
