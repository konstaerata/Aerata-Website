// @ts-nocheck
import React, { lazy, Suspense, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { useHubSpotTracking } from './lib/useHubSpotTracking';
import { useGA4Tracking, useGA4ClickTracking } from './lib/useGA4Tracking';

function HubSpotPageTracker() {
  useHubSpotTracking();
  return null;
}

function RoutePrefetcher() {
  useEffect(() => prefetchAllRoutesWhenIdle(), []);
  return null;
}

function GA4PageTracker() {
  useGA4Tracking();
  useGA4ClickTracking();
  return null;
}

import SiteLayout from './components/layout/SiteLayout';
import { PAGE_IMPORTS, SECTOR_PATHS, prefetchAllRoutesWhenIdle } from './lib/serviceRoutes';
import { LEGACY_REDIRECTS } from './lib/sectors';
// Eagerly loaded — critical first-view routes
import Home from './pages/Home';


// Lazy-loaded — only downloaded when the user navigates there
// Importers are shared with the prefetcher (lib/serviceRoutes): links warm a
// page's chunk on hover, and every chunk is fetched once the first page settles.
const SectorPage = lazy(PAGE_IMPORTS['/sectors/renewable-energy']);
const Services = lazy(PAGE_IMPORTS['/services']);
const Training = lazy(PAGE_IMPORTS['/training']);
const News = lazy(PAGE_IMPORTS['/news']);
const NewsArticle = lazy(PAGE_IMPORTS['/news/:id']);
const Contact = lazy(PAGE_IMPORTS['/contact']);
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(PAGE_IMPORTS['/privacy']);
const Fleet = lazy(PAGE_IMPORTS['/fleet']);
const ClientPortal = lazy(PAGE_IMPORTS['/portal']);

// Shared route list — rendered once at the root (English, unprefixed, the
// original/canonical URLs) and once under the /:lang(nl|el) prefix. Keeping
// this as a single array (rather than hand-duplicating the <Route> tree)
// means the two mounts can never drift out of sync.
const PAGE_ROUTES = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  ...SECTOR_PATHS.map((path) => ({ path, element: <SectorPage key={path} path={path} /> })),
  { path: '/services', element: <Services /> },
  // Old service URLs (also 301'd in public/_redirects); relative so /nl stays /nl.
  ...LEGACY_REDIRECTS.map((r) => ({ path: r.from, element: <Navigate to={`../..${r.to}`} relative="path" replace /> })),
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
    <>
      <Router>
        <HubSpotPageTracker />
        <GA4PageTracker />
        <RoutePrefetcher />
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
    </>
  );
}

export default App;
