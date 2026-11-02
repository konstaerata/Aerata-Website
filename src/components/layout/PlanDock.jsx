// @ts-nocheck
import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { usePageY } from '../../lib/scroll';
import { ClipboardList } from 'lucide-react';
import { useLang } from '../../lib/LanguageContext';
import { withEnglishFallback } from '../home/ROICalculator';

// The panel's dialog code loads on first use (or when the dock is hovered).
const loadPlanSheet = () => import('./PlanSheet');
const PlanSheet = lazy(loadPlanSheet);

// Pages where the dock would duplicate or get in the way of the page's own action.
const HIDDEN_ON = /^(\/(nl|el))?\/(contact|portal)(\/|$)/;

/**
 * Site-wide "Plan your inspection" button. Appears once the visitor has
 * scrolled past the first screen, and opens the quote builder in a side
 * panel from any page. Stays out of the way of the cookie banner, of the
 * contact and portal pages, and of the Home planner section itself.
 */
export default function PlanDock() {
  const { pathname } = useLocation();
  const { t: rawT } = useLang();
  const t = withEnglishFallback(rawT);
  const reduce = useReducedMotion();
  const scrollY = usePageY();
  const [past, setPast] = useState(false);
  const [plannerInView, setPlannerInView] = useState(false);
  const [cookiesDecided, setCookiesDecided] = useState(false);
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const buttonRef = useRef(null);
  useEffect(() => { if (open) setEverOpened(true); }, [open]);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > window.innerHeight * 0.6;
    if (next !== past) setPast(next);
    if (next && !cookiesDecided) setCookiesDecided(localStorage.getItem('aerata_cookies_accepted') !== null);
  });

  // Hide while the Home page's own planner is on screen.
  useEffect(() => {
    setPlannerInView(false);
    const el = document.getElementById('roi');
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setPlannerInView(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  // Smooth scroll would otherwise keep moving the page behind the panel.
  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return undefined;
    if (open) lenis.stop(); else lenis.start();
    return () => lenis.start();
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const show = past && cookiesDecided && !plannerInView && !HIDDEN_ON.test(pathname);
  const visible = show && !open;
  const label = t('quote.dockCta');

  return (
    <>
      {/* Always mounted and shown with a CSS transition: mounting it with a
          framer animation forced a style recalc mid-scroll (a dropped frame). */}
      {!HIDDEN_ON.test(pathname) && (
        <button
          type="button"
          ref={buttonRef}
          onClick={() => setOpen(true)}
          onPointerEnter={loadPlanSheet}
          onFocus={loadPlanSheet}
          aria-label={label}
          aria-hidden={!visible}
          tabIndex={visible ? 0 : -1}
          inert={visible ? undefined : ''}
          data-plan-dock
          className={`group fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 inline-flex items-center justify-center gap-3 h-12 w-12 sm:w-auto sm:pl-4 sm:pr-5 rounded-full bg-obsidian text-white border border-lime/30 shadow-[0_14px_40px_-12px_hsl(210_35%_8%/0.7)] font-display font-semibold text-sm tracking-wide hover:border-lime/70 focus:outline-none focus-visible:ring-4 focus-visible:ring-lime/40 ${
            reduce ? 'transition-[opacity,border-color] duration-200' : 'transition-[opacity,transform,border-color] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
          } ${visible ? 'opacity-100 translate-y-0 scale-100' : `opacity-0 pointer-events-none ${reduce ? '' : 'translate-y-6 scale-95'}`}`}
        >
          <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-lime text-obsidian">
            <ClipboardList className="w-4 h-4" aria-hidden="true" />
            {!reduce && visible && <span aria-hidden="true" className="absolute inset-0 rounded-full bg-lime/60 animate-ping [animation-iteration-count:3]" />}
          </span>
          {/* Phones: icon only, so the button never covers card content */}
          <span className="hidden sm:inline">{label}</span>
        </button>
      )}

      {everOpened && (
        <Suspense fallback={null}>
          <PlanSheet open={open} setOpen={setOpen} label={label} t={t} returnFocusTo={buttonRef} />
        </Suspense>
      )}
    </>
  );
}
