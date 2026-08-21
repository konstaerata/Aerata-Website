// @ts-nocheck
import React, { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './lib/LanguageContext';
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

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <HubSpotPageTracker />
          <GA4PageTracker />
          <Suspense fallback={null}>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services/surveying" element={<Surveying />} />
                <Route path="/services/renewable-energy" element={<RenewableEnergy />} />
                <Route path="/services/infrastructure" element={<Infrastructure />} />
                <Route path="/services/environmental" element={<Environment />} />
                <Route path="/services/oil-gas" element={<OilGas />} />
                <Route path="/training" element={<Training />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsArticle />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/fleet" element={<Fleet />} />
                <Route path="/portal" element={<ClientPortal />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
