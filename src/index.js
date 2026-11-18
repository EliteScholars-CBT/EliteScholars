import React, { StrictMode, Suspense } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import ContactTab from './components/ContactTab';
import { installChannelClicks } from './utils/channelClicks';
import { installSessionFetch } from './utils/sessionFetch';
import { installLoginPersistence } from './utils/persistLogin';
import { installContentGuard } from './utils/contentGuard';
import { applyDataSaver } from './utils/dataSaver';
import { lazyRetry, prefetchWhenIdle, RouteFallback, RouteBoundary } from './utils/lazyRetry';
import { installNetworkRecovery } from './utils/networkRecover';
import './styles/admin-bg.css';

installLoginPersistence();
installSessionFetch();
installContentGuard();
applyDataSaver();
installChannelClicks();
installNetworkRecovery();

// Every page except the landing page is downloaded only when it is opened (and retried on a weak connection), so the
// first screen is small and fast. The app itself is fetched quietly in the background once the landing page is idle.
const appImport = () => import('./App');
const App = lazyRetry(appImport);
const About = lazyRetry(() => import('./pages/About'));
const Contact = lazyRetry(() => import('./pages/Contact'));
const TermsOfService = lazyRetry(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazyRetry(() => import('./pages/PrivacyPolicy'));
const NotFound = lazyRetry(() => import('./pages/NotFound'));
const SchoolLanding = lazyRetry(() => import('./pages/SchoolLanding'));
const CentreLanding = lazyRetry(() => import('./pages/CentreLanding'));
if (window.location.pathname === '/') prefetchWhenIdle(appImport);

// Loaded on demand so students never download the admin dashboard code.
const Admin = lazyRetry(() => import('./pages/Admin'));
const Partner = lazyRetry(() => import('./pages/Partner'));
const HireApply = lazyRetry(() => import('./pages/Hire').then((m) => ({ default: m.HireApply })));
const HireResearch = lazyRetry(() => import('./pages/Hire').then((m) => ({ default: m.HireResearch })));
const GamePage = lazyRetry(() => import('./pages/GamePage'));
const SchoolPortal = lazyRetry(() => import('./pages/SchoolPortal'));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <RouteBoundary><Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Marketing site — root domain */}
          <Route path="/" element={<Landing />} />

          {/* The actual product lives under /app from here on. Flutterwave's
              payment redirect and the service worker's notification/reminder
              URLs were updated to match (see api/payment/verify.js,
              api/payment/webhook.js and public/sw.js). */}
          <Route path="/app/about" element={<About />} />
          <Route path="/app/contact" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/app/terms" element={<TermsOfService />} />
          <Route path="/app/privacy" element={<PrivacyPolicy />} />
          <Route path="/app/*" element={<App />} />

          {/* Private owner dashboard (password protected on the server) */}
          <Route path="/admin" element={<Admin />} />

          {/* Public games page: guests get 2 free games, then sign up */}
          <Route path="/game" element={<GamePage />} />

          {/* School portal: school admins and teachers */}
          <Route path="/school-portal" element={<SchoolPortal />} />

          {/* Affiliate partner portal */}
          {/* Hiring: public application link and the research page sent by email */}
          <Route path="/hire/r/:token" element={<HireResearch />} />
          <Route path="/hire/:slug" element={<HireApply />} />
          <Route path="/partner" element={<Partner />} />

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
        </Suspense></RouteBoundary>
        <ContactTab />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
