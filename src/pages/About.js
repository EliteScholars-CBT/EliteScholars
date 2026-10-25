import React from 'react';
import SiteShell from '../components/SiteShell';
import { WA_CHANNEL } from '../utils/constants';

const EXAMS = ['JAMB UTME', 'WAEC SSCE', 'NECO', 'GST'];
const SUBJECTS = ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Government', 'Accounting', 'Literature', 'Geography', 'Commerce', 'Civic Education'];

export default function About() {
  return (
    <SiteShell
      eyebrow="About us"
      title="Built for the student who refuses to fail"
      intro="EliteScholars is a free-to-start exam practice app for Nigerian students, made in Nigeria and designed for the phone in your hand."
    >
      <section className="sp-card">
        <h2>Our mission</h2>
        <p>Quality exam preparation should not depend on where you live or how much data you have. EliteScholars gives every student 50,000+ practice questions, clear explanations, timed CBT simulations and study tools, starting free.</p>
      </section>

      <section className="sp-card">
        <h2>Exams we cover</h2>
        <div className="sp-tags">{EXAMS.map((e) => <span key={e}>{e}</span>)}</div>
        <h3>Subjects include</h3>
        <div className="sp-tags">{SUBJECTS.map((s) => <span key={s}>{s}</span>)}</div>
      </section>

      <section className="sp-card">
        <h2>What you can do</h2>
        <ul>
          <li>Practise thousands of past-style questions with full explanations</li>
          <li>Take timed CBT mock exams that feel like the real thing</li>
          <li>Learn topics with notes and diagrams, and listen to them read aloud</li>
          <li>Play study games, keep streaks, earn XP and climb the leaderboard</li>
          <li>Challenge friends and study together in squads</li>
          <li>Install it like an app and keep practising even on weak networks</li>
        </ul>
      </section>

      <section className="sp-card">
        <h2>Free and Pro</h2>
        <p>You can start without paying: every day you get a set number of free topics, CBT tests and games. EliteScholars Pro is a single yearly plan that removes those limits. We also show advertising on our blog to help keep the free tier running.</p>
      </section>

      <section className="sp-card">
        <h2>Get in touch</h2>
        <p>Questions, feedback or a correction? Email <a href="mailto:elitescholars.site@gmail.com">elitescholars.site@gmail.com</a> or join our <a href={WA_CHANNEL} target="_blank" rel="noreferrer">WhatsApp Channel</a>.</p>
        <p className="sp-note">EliteScholars is an independent platform and is not affiliated with JAMB, WAEC or NECO.</p>
      </section>
    </SiteShell>
  );
}
