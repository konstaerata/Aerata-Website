import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../CookieConsent';
import PageNotFound from '../../lib/PageNotFound';
import { LanguageProvider, useLang, LANGUAGE_CODES, DEFAULT_LANG } from '../../lib/LanguageContext';
import { organizationSchema, delftLocalBusinessSchema, athensLocalBusinessSchema } from '../../lib/schemas';

// Sitewide Organization + LocalBusiness JSON-LD, present on every page via
// this shared layout — previously Organization only appeared on Home and
// LocalBusiness only on About, understating Aerata's local/NAP relevance
// for search on every other page. Both offices (Delft HQ, Athens) are
// included so each is equally discoverable, not just the HQ.
const SITEWIDE_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, delftLocalBusinessSchema, athensLocalBusinessSchema],
};

// Non-English codes only — the unprefixed English mount has no :lang param.
const PREFIXABLE_LANG_CODES = LANGUAGE_CODES.filter((c) => c !== DEFAULT_LANG);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function SiteLayout() {
  const { lang } = useParams();

  // SiteLayout is mounted twice: once unprefixed (no :lang param, always
  // English) and once under /:lang/*. In the second mount, anything other
  // than a real language code (e.g. someone hitting /xyz/about) should 404
  // rather than silently render as English content at a bogus URL.
  if (lang !== undefined && !PREFIXABLE_LANG_CODES.includes(lang)) {
    return <PageNotFound />;
  }

  return (
    <LanguageProvider>
      <SiteLayoutInner />
    </LanguageProvider>
  );
}

function SiteLayoutInner() {
  // Read lang from context (LanguageProvider), not from the :lang URL param
  // directly — the param is undefined on aerata.gr (Greek renders at that
  // domain's own root, no /el prefix there), so only the context's
  // hostname-aware resolution gives the correct value in every case.
  const { lang } = useLang();
  const [scrollY, setScrollY] = useState(0);
  const [docHeight, setDocHeight] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setDocHeight(document.documentElement.scrollHeight - window.innerHeight);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
  const altitude = Math.round(400 - (progress / 100) * 400);

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet htmlAttributes={{ lang }}>
        <script type="application/ld+json">{JSON.stringify(SITEWIDE_JSON_LD)}</script>
      </Helmet>
      <ScrollToTop />
      <Navbar />

      {/* Altitude Scroll Bar */}
      <div className="fixed right-3 top-24 bottom-24 w-px bg-border z-30 hidden xl:block">
        <div className="absolute top-0 w-px transition-all duration-100" style={{ height: `${progress}%`, background: 'hsl(88 48% 52%)' }} />
        <div className="absolute w-8 -left-3.5 text-[9px] font-mono transition-all duration-100" style={{ top: `${progress}%`, color: 'hsl(200 38% 28%)' }}>
          {altitude}ft
        </div>
      </div>

      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
