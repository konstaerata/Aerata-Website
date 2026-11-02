import React, { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { motion, useReducedMotion, frame, cancelFrame } from 'framer-motion';
import { setPageY, usePageProgress } from '../../lib/scroll';
import Lenis from 'lenis';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../CookieConsent';
import PlanDock from './PlanDock';
import BootIntro from '../fx/BootIntro';
import TargetCursor from '../fx/TargetCursor';
import ScrollVelocity from '../fx/ScrollVelocity';
import AltitudeNav from '../fx/AltitudeNav';
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
  // Layout effect: scroll before paint, so a view transition captures the new page at the top.
  useLayoutEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

/**
 * Inertial wheel scrolling (Lenis) for mouse/trackpad users only. Touch
 * devices keep native momentum scrolling, and prefers-reduced-motion keeps
 * plain native scrolling. Scroll position stays native, so framer-motion's
 * useScroll, sticky sections and anchors keep working.
 */
function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, anchors: true, autoRaf: false });
    window.__lenis = lenis;
    // Feed the shared scroll value (lib/scroll) straight from Lenis, so no
    // scroll-linked effect has to read the DOM.
    lenis.on('scroll', (l) => setPageY(l.scroll));
    // Lenis runs in framer-motion's frame loop, in the update step — before
    // framer writes any styles that frame — so its window.scrollTo never has
    // to flush a dirty layout. (Its own rAF ran after framer's writes and
    // forced a full layout on every frame.)
    const update = ({ timestamp }) => lenis.raf(timestamp);
    frame.update(update, true);
    return () => {
      cancelFrame(update);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [reduce]);
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
  const { lang, t } = useLang();
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  // Scroll-linked values live in motion values, not React state, so
  // scrolling never re-renders the page. No spring on top: Lenis already
  // smooths the scroll, and a spring would start a new animation per frame.
  const scrollYProgress = usePageProgress();

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet htmlAttributes={{ lang }}>
        <script type="application/ld+json">{JSON.stringify(SITEWIDE_JSON_LD)}</script>
      </Helmet>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-3 focus:rounded focus:bg-lime focus:text-obsidian focus:font-display focus:font-semibold">
        {t('common.skipToContent')}
      </a>
      <SmoothScroll />
      <ScrollToTop />
      {/* Trial motion features — each can be removed independently */}
      <BootIntro />
      <TargetCursor />
      <ScrollVelocity />
      <Navbar />

      {/* Mobile/tablet read progress */}
      <motion.div aria-hidden="true" style={{ scaleX: scrollYProgress }} className="fixed top-0 inset-x-0 h-0.5 bg-lime origin-left z-[60] xl:hidden" />

      {/* Altitude gauge + section navigator (xl screens) */}
      <AltitudeNav progress={scrollYProgress} pathname={pathname} />

      {/* Route change: a scanline sweeps the viewport while the new page settles in */}
      {!reduce && !window.__vtNav && (
        <motion.div
          key={`scan-${pathname}`}
          aria-hidden="true"
          initial={{ y: '-2vh', opacity: 1 }}
          animate={{ y: '102vh', opacity: [1, 1, 0] }}
          transition={{ duration: 0.49, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-x-0 top-0 h-px bg-lime/70 shadow-[0_0_24px_4px_hsl(88_48%_52%/0.35)] z-[70] pointer-events-none"
        />
      )}

      <main id="main" tabIndex={-1} className="scroll-mt-20 outline-none">
        <motion.div
          key={pathname}
          initial={reduce || window.__vtNav ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.33, ease: [0.16, 1, 0.3, 1] }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <PlanDock />
      <CookieConsent />
    </div>
  );
}
