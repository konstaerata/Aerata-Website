// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useMotionValueEvent } from 'framer-motion';

const MIN_GAP = 0.03; // drop ticks closer than 3% of the bar to a previous one

/** Every main section that carries an h2, with its position along the page. */
function scanSections() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return [];
  const out = [];
  document.querySelectorAll('main section').forEach((section) => {
    const h2 = section.querySelector('h2');
    const label = h2?.textContent.replace(/\s+/g, ' ').trim();
    if (!label) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const at = Math.min(1, Math.max(0, (top - 80) / max));
    if (out.length && at - out[out.length - 1].at < MIN_GAP) return;
    out.push({ label, at, section });
  });
  return out;
}

const flyTo = (el) => {
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
};

/**
 * Right-edge altitude gauge (xl screens) that doubles as a section
 * navigator: a tick per titled section, a HUD tooltip on hover/focus, click
 * to fly there. Progress fill and the altitude readout are motion-value
 * driven, so scrolling never re-renders. Sections are re-scanned on route
 * change (twice, to catch lazy pages and late images) and on resize.
 */
export default function AltitudeNav({ progress, pathname }) {
  const [ticks, setTicks] = useState([]);
  const altitudeRef = useRef(null);
  // A full-height layer translated by its own height: transform-only, so the
  // readout moves without triggering layout each frame.
  const altitudeY = useTransform(progress, (v) => `${v * 100}%`);
  const lastAltitude = useRef(400);
  useMotionValueEvent(progress, 'change', (v) => {
    const ft = Math.round(400 - v * 400);
    if (ft !== lastAltitude.current && altitudeRef.current) { lastAltitude.current = ft; altitudeRef.current.textContent = `${ft}ft`; }
  });

  useEffect(() => {
    const rescan = () => setTicks(scanSections());
    const t1 = setTimeout(rescan, 700);
    const t2 = setTimeout(rescan, 2200);
    let rt;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(rescan, 250); };
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(rt); window.removeEventListener('resize', onResize); };
  }, [pathname]);

  return (
    <nav aria-label="Page sections" className="fixed right-3 top-24 bottom-24 w-px z-30 hidden xl:block">
      <div aria-hidden="true" className="absolute inset-0 bg-border" />
      <motion.div aria-hidden="true" className="absolute inset-x-0 top-0 h-full bg-lime origin-top" style={{ scaleY: progress }} />
      <motion.div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ y: altitudeY }}>
        <span ref={altitudeRef} className="absolute top-0 w-8 -left-3.5 text-[9px] font-mono tabular-nums text-primary">400ft</span>
      </motion.div>

      {ticks.map((tick) => (
        <button
          key={`${pathname}-${tick.label}`}
          type="button"
          aria-label={tick.label}
          onClick={() => flyTo(tick.section)}
          style={{ top: `${tick.at * 100}%` }}
          className="group absolute -left-3 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-sm"
        >
          <span className="block w-[7px] h-px bg-primary/50 transition-[transform,background-color] duration-200 group-hover:bg-lime group-hover:scale-x-[2.2] group-focus-visible:bg-lime group-focus-visible:scale-x-[2.2]" />
          <span
            aria-hidden="true"
            className="absolute right-6 top-1/2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded px-2 py-1 bg-obsidian text-white text-[10px] font-mono tracking-[0.12em] uppercase opacity-0 pointer-events-none transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 shadow-[0_8px_24px_-8px_hsl(210_35%_12%/0.5)]"
          >
            <span className="text-lime mr-1.5">{Math.round(400 - tick.at * 400)}ft</span>
            {tick.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
