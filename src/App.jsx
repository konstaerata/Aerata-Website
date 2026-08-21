// @ts-nocheck
import React, { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { useHubSpotTracking } from './lib/useHubSpotTracking';
import { useGA4Tracking, useGA4ClickTracking } from './lib/useGA4Tracking';

function HubSpotPageTracker() {
  useHubSpotTracking();
  return null;
}

function GA4PageTracker() {
  useGA4Tracking();
  useGA4ClickTracking();
  return null;
}

import SiteLayout from './components/layout/SiteLayout';
// Eagerly loaded — critical first-view routes
import Home from './pages/Home';
import About from './pages/About';

// Lazy-loaded — only downloaded when the user navigates there
const Surveying = lazy(() => import('./pages/services/Surveying'));
const RenewableEnergy = lazy(() => import('./pages/services/RenewableEnergy'));
const Infrastructure = lazy(() => import('./pages/services/Infrastructure'));
const Environment = lazy(() => import('./pages/services/Environment'));
const OilGas = lazy(() => import('./pages/services/OilGas'));
const Training = lazy(() => import('./pages/Training'));
const News = lazy(() => import('./pages/News'));
const NewsArticle = lazy(() => import('./pages/NewsArticle'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Fleet = lazy(() => import('./pages/Fleet'));
const ClientPortal = lazy(() => import('./pages/ClientPortal'));

// Shared route list — rendered once at the root (English, unprefixed, the
// original/canonical URLs) and once under the /:lang(nl|el) prefix. Keeping
// this as a single array (rather than hand-duplicating the <Route> tree)
// means the two mounts can never drift out of sync.
const PAGE_ROUTES = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/services/surveying', element: <Surveying /> },
  { path: '/services/renewable-energy', element: <RenewableEnergy /> },
  { path: '/services/infrastructure', element: <Infrastructure /> },
  { path: '/services/environmental', element: <Environment /> },
  { path: '/services/oil-gas', element: <OilGas /> },
  { path: '/training', element: <Training /> },
  { path: '/news', element: <News /> },
  { path: '/news/:id', element: <NewsArticle /> },
  { path: '/contact', element: <Contact /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/fleet', element: <Fleet /> },
];

// Strips a leading slash so a page path can be nested under a parent route
// (React Router v6 nested routes use relative paths).
const asChildPath = (path) => (path === '/' ? '' : path.replace(/^\//, ''));

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <HubSpotPageTracker />
        <GA4PageTracker />
        <Suspense fallback={null}>
          <Routes>
            {/* English — canonical, unprefixed URLs (unchanged from before) */}
            <Route element={<SiteLayout />}>
              {PAGE_ROUTES.map((r) => (
                <Route key={r.path} path={r.path} element={r.element} />
              ))}
              <Route path="/portal" element={<ClientPortal />} />
            </Route>

            {/* Dutch / Greek — same pages, mounted under /nl/* and /el/*.
                SiteLayout reads the :lang param (via LanguageProvider,
                mounted inside it) and renders PageNotFound for anything
                other than a known language code. */}
            <Route path=":lang" element={<SiteLayout />}>
              {PAGE_ROUTES.map((r) =>
                r.path === '/' ? (
                  <Route key={r.path} index element={r.element} />
                ) : (
                  <Route key={r.path} path={asChildPath(r.path)} element={r.element} />
                )
              )}
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
