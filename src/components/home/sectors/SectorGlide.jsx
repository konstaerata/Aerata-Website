// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useElementProgress } from '../../../lib/scroll';
import { useLocalePath } from '@/components/LocalizedLink';
import { mediaUrl } from '../../../lib/media';
import { navigateWithMorph } from '../../../lib/viewTransition';
import PreviewVideo from './PreviewVideo';
import { prefetchRoute } from '../../../lib/serviceRoutes';

const NAV_H = 64;
const VH_PER_SECTOR = 75;
// The glide between sectors: a fixed-feel spring, independent of scroll speed.
const GLIDE = { stiffness: 85, damping: 20, mass: 1, restDelta: 0.001 };
// How much wider the open sector is than a closed strip.
const OPEN_RATIO = 5.5;
const pad2 = (n) => String(n).padStart(2, '0');

/** One rail segment: fills as the scroll passes through its sector. */
function RailSegment({ progress, i, n, label, on, onSelect }) {
  const fill = useTransform(progress, [i / n, (i + 1) / n], [0, 1], { clamp: true });
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={label}
      className="group flex-1 min-w-0 pt-3 pb-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-sm"
    >
      <span className="block h-[2px] bg-white/10 overflow-hidden">
        <motion.span style={{ scaleX: fill }} className="block h-full bg-lime origin-left" />
      </span>
      <span className={`mt-2.5 block truncate font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${on ? 'text-lime' : 'text-white/40 group-hover:text-white/70'}`}>
        {String(i + 1).padStart(2, '0')} · {label}
      </span>
    </button>
  );
}

function GlideStrip({ s, i, n, pos, onActivate, isActive, playPreview, linkRef }) {
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const to = localePath(s.link);

  const open = useTransform(pos, (v) => Math.max(0, 1 - Math.abs(v - i)));
  const contentOpacity = useTransform(open, [0.55, 1], [0, 1]);
  const contentY = useTransform(open, [0.55, 1], [18, 0]);
  const labelOpacity = useTransform(open, [0, 0.35], [1, 0]);
  const scrim = useTransform(open, [0, 1], [0.72, 0.22]);
  const imageScale = useTransform(open, [0, 1], [1.12, 1]);
  // C's parallax: the picture drifts against the direction of travel.
  const imageX = useTransform(pos, (v) => `${(v - i) * -6}%`);

  // The open strip is the likely click: load its page code and hero picture now.
  useEffect(() => { if (isActive) prefetchRoute(s.link); }, [isActive, s.link]);

  const onClick = (e) => {
    // A closed strip opens (scrolls to) its sector; the open one goes to the page.
    if (!isActive) { e.preventDefault(); onActivate(i); return; }
    navigateWithMorph(e, { navigate, to, sourceEl: e.currentTarget });
  };

  return (
    <a
      ref={linkRef}
      href={to}
      onClick={onClick}
      onPointerEnter={() => prefetchRoute(s.link)}
      onFocus={(e) => { if (e.target.matches(':focus-visible')) onActivate(i); }}
      aria-label={`${s.title} — ${s.explore}`}
      aria-current={isActive ? 'true' : undefined}
      className="group relative block rounded-xl overflow-hidden min-w-0 bg-obsidian [contain:layout_paint] outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
    >
      {/* Fixed-width picture layer: the strip clips it, never resizes it */}
      <div aria-hidden="true" className="absolute inset-y-0 left-1/2 w-[760px] -translate-x-1/2">
        <motion.img
          src={mediaUrl(s.image, { width: 1400 })}
          alt=""
          loading="eager"
          decoding="async"
          {...{ fetchpriority: 'low' }}
          style={{ scale: imageScale, x: imageX }}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        {s.preview && <PreviewVideo src={s.preview} playing={playPreview} />}
      </div>
      <motion.div aria-hidden="true" style={{ opacity: scrim }} className="absolute inset-0 bg-obsidian" />
      <div aria-hidden="true" className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.06] transition-colors duration-300" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-transparent" />

      {/* Closed: index + vertical name */}
      <motion.span aria-hidden="true" style={{ opacity: labelOpacity }} className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[11px] tabular-nums tracking-[0.15em] text-lime/80">
        {pad2(i + 1)}
      </motion.span>
      <motion.span
        style={{ opacity: labelOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 font-display font-bold text-xl text-white whitespace-nowrap"
      >
        {s.title}
      </motion.span>

      {/* Open: C-sized panel content, fixed width so it never reflows */}
      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="absolute left-0 bottom-0 p-9 xl:p-10 w-[640px] pointer-events-none">
        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-lime/15 border border-lime/30 text-lime text-[11px] font-display font-semibold tracking-[0.12em] uppercase mb-5">
          <span className="font-mono tabular-nums text-lime/70">{pad2(i + 1)}/{pad2(n)}</span>
          {s.tag}
        </span>
        <h3 className="font-display font-bold text-4xl xl:text-5xl text-white leading-[1.05] tracking-tight mb-6">{s.title}</h3>
        <ul className="grid gap-2.5 mb-7">
          {s.outcomes.map((o, k) => (
            <li key={k} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-lime shrink-0 mt-[3px]" aria-hidden="true" />
              <span className="text-[15px] text-steelBlue leading-snug">{o}</span>
            </li>
          ))}
        </ul>
        <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-wider uppercase text-lime">
          {s.explore} <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </motion.div>
      <span aria-hidden="true" className="absolute top-5 right-5 w-6 h-6 border-r border-t border-lime/50" />
    </a>
  );
}

/**
 * Home sectors, desktop. B's layout (all five sectors visible as strips, names
 * always readable) with C's motion (pinned, sideways glide with image
 * parallax). Scrolling picks which sector is open; the panel then glides
 * there on a spring at one calm speed however fast the visitor scrolls, and
 * when scrolling stops the page eases onto that sector. The open panel is C-sized,
 * and its preview clip plays once the visitor stops on it. Clicking a closed
 * strip scrolls to it; clicking the open one opens the page with the morph.
 *
 * Performance: column widths follow the spring (5-item grid, cheap layout);
 * pictures are fixed-size composited layers, so nothing is re-rasterised.
 * The preview clip only runs while the scroll is at rest.
 */
export default function SectorGlide({ sectors, heading }) {
  const n = sectors.length;
  const trackRef = useRef(null);
  const gridRef = useRef(null);
  const linksRef = useRef([]);
  const [active, setActive] = useState(0);
  const [resting, setResting] = useState(false);
  const [pinned, setPinned] = useState(false);
  const restTimer = useRef(null);

  // Pinned stretch: from the track's top reaching the navbar to its end reaching the viewport bottom.
  const scrollYProgress = useElementProgress(trackRef, (top, h, vh) => [top - NAV_H, top + h - vh]);
  const reduce = useReducedMotion();
  // Scroll only picks the sector; the panel then glides there on a spring, so
  // a fast flick never whips the strips across — they move at one calm speed.
  const sectorAt = (p) => Math.min(n - 1, Math.max(0, Math.floor(p * n)));
  const target = useMotionValue(0);
  const spring = useSpring(target, GLIDE);
  const pos = reduce ? target : spring;
  const columns = useTransform(pos, (v) =>
    sectors.map((_, i) => `minmax(0,${(1 + (OPEN_RATIO - 1) * Math.max(0, 1 - Math.abs(v - i))).toFixed(3)}fr)`).join(' ')
  );

  useMotionValueEvent(pos, 'change', (v) => {
    const i = Math.round(v);
    setActive((a) => (a === i ? a : i));
  });
  // After the visitor stops inside the section, ease the page onto the
  // nearest sector's centre so it always rests on a settled layout.
  const snapToNearest = () => {
    const p = scrollYProgress.get();
    if (p <= 0.01 || p >= 0.99) return;
    const y = sectorCentreY(sectorAt(p));
    if (y != null && Math.abs(y - window.scrollY) > 4) {
      if (window.__lenis) window.__lenis.scrollTo(y, { duration: 0.8 });
      else window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = sectorAt(p);
    if (target.get() !== i) target.set(i);
    const inside = p > 0 && p < 1;
    setPinned((x) => (x === inside ? x : inside));
    setResting((r) => (r ? false : r));
    clearTimeout(restTimer.current);
    restTimer.current = setTimeout(() => { setResting(true); snapToNearest(); }, 450);
  });
  useEffect(() => () => clearTimeout(restTimer.current), []);

  // Page scroll position at the centre of sector i's stretch.
  function sectorCentreY(i) {
    const el = trackRef.current;
    if (!el) return null;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_H;
    const distance = el.offsetHeight - (window.innerHeight - NAV_H);
    return top + distance * ((i + 0.5) / n);
  }

  const scrollToIndex = (i) => {
    const y = sectorCentreY(i);
    if (y == null) return;
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (active + (e.key === 'ArrowRight' ? 1 : -1) + n) % n;
    linksRef.current[next]?.focus();
  };

  return (
    // overflow: clip (not hidden) so the sticky pin still works.
    <section className="relative bg-obsidian pb-16 [overflow:clip]">
      <div aria-hidden="true" className="absolute inset-0 hud-grid opacity-50 pointer-events-none" />

      <div ref={trackRef} className="relative" style={{ height: `calc(100vh + ${n * VH_PER_SECTOR}vh)` }}>
        {/* Heading pins with the strips, so they arrive and stay together. */}
        <div className="sticky flex flex-col justify-center py-8" style={{ top: NAV_H, height: `calc(100vh - ${NAV_H}px)` }}>
          <div className="w-full max-w-7xl mx-auto px-8 flex flex-col min-h-0 max-h-full">
            <div className="shrink-0 mb-8">{heading}</div>
            <motion.div
              ref={gridRef}
              className="grid gap-3 grow-0 shrink basis-[600px] min-h-[260px]"
              style={{ gridTemplateColumns: columns }}
              onKeyDown={onKeyDown}
            >
              {sectors.map((s, i) => (
                <GlideStrip
                  key={s.link}
                  s={s}
                  i={i}
                  n={n}
                  pos={pos}
                  isActive={i === active}
                  playPreview={i === active && resting && pinned}
                  onActivate={scrollToIndex}
                  linkRef={(el) => { linksRef.current[i] = el; }}
                />
              ))}
            </motion.div>

            <nav aria-label="Sectors" className="flex gap-3 mt-4">
              {sectors.map((s, i) => (
                <RailSegment key={s.link} progress={scrollYProgress} i={i} n={n} label={s.title} on={i === active} onSelect={() => scrollToIndex(i)} />
              ))}
            </nav>
          </div>
        </div>
      </div>

    </section>
  );
}
