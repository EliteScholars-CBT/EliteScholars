import React, { StrictMode, Suspense, lazy } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import Landing from './pages/Landing';
import About from './pages/About';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import SchoolLanding from './pages/SchoolLanding';
import CentreLanding from './pages/CentreLanding';
import { installSessionFetch } from './utils/sessionFetch';
import { installLoginPersistence } from './utils/persistLogin';
import { installContentGuard } from './utils/contentGuard';
import { applyDataSaver } from './utils/dataSaver';

installLoginPersistence();
installSessionFetch();
installContentGuard();
applyDataSaver();

// Loaded on demand so students never download the admin dashboard code.
const Admin = lazy(() => import('./pages/Admin'));
const Partner = lazy(() => import('./pages/Partner'));
const GamePage = lazy(() => import('./pages/GamePage'));
const SchoolPortal = lazy(() => import('./pages/SchoolPortal'));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          {/* Marketing site — root domain */}
          <Route path="/" element={<Landing />} />

          {/* The actual product lives under /app from here on. Flutterwave's
              payment redirect and the service worker's notification/reminder
              URLs were updated to match (see api/payment/verify.js,
              api/payment/webhook.js and public/sw.js). */}
          <Route path="/app/about" element={<About />} />
          <Route path="/app/terms" element={<TermsOfService />} />
          <Route path="/app/privacy" element={<PrivacyPolicy />} />
          <Route path="/app/*" element={<App />} />

          {/* Private owner dashboard (password protected on the server) */}
          <Route path="/admin" element={<Suspense fallback={null}><Admin /></Suspense>} />

          {/* Public games page: guests get 2 free games, then sign up */}
          <Route path="/game" element={<Suspense fallback={null}><GamePage /></Suspense>} />

          {/* School portal: school admins and teachers */}
          <Route path="/school-portal" element={<Suspense fallback={null}><SchoolPortal /></Suspense>} />

          {/* Affiliate partner portal */}
          <Route path="/partner" element={<Suspense fallback={null}><Partner /></Suspense>} />

          {/* Old top-level links kept alive so nothing already shared or
              indexed 404s. */}
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          <Route path="/school" element={<SchoolLanding />} />
          <Route path="/schools" element={<SchoolLanding />} />
          <Route path="/centre" element={<CentreLanding />} />
          <Route path="/centres" element={<CentreLanding />} />

          {/* Anything else */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

