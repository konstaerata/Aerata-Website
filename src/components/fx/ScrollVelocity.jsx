import { useEffect } from 'react';
import { useReducedMotion, frame, cancelFrame } from 'framer-motion';

const MAX_SKEW = 2.5;   // degrees
const GAIN = 0.05;      // degrees per px/frame of scroll velocity
const EASE = 0.16;      // how quickly the skew follows / settles

/**
 * Scroll-speed response: a per-frame step (in framer-motion's frame loop) turns scroll velocity into a small,
 * clamped skewY on every `.vel-skew` element. The transform is written to
 * those elements directly (not via a custom property on <html>, which would
 * restyle the whole document each frame), and only while the value changes,
 * so an idle page does no work. Reads Lenis' velocity when smooth scrolling
 * is active, otherwise the scrollY delta per frame. Off under reduced motion.
 * Remove by deleting <ScrollVelocity /> from SiteLayout.
 */
export default function ScrollVelocity() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let last = window.scrollY;
    let skew = 0;
    let written = 0;
    let targets = [];
    let sinceScan = Infinity;

    let velocity = 0;
    // Reads in framer-motion's read step, writes in its render step, so the
    // skew never reads layout after a style write in the same frame.
    const read = () => {
      const lenis = window.__lenis;
      if (lenis) { velocity = lenis.velocity; return; }
      const y = window.scrollY;
      velocity = y - last;
      last = y;
    };
    const loop = () => {
      const v = velocity;
      const goal = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, v * GAIN));
      skew += (goal - skew) * EASE;
      if (Math.abs(skew) < 0.01) skew = 0;

      if (Math.abs(skew - written) > 0.005) {
        // Re-collect targets at most every ~30 frames while moving
        // (cheap, and picks up sections from lazily loaded pages).
        if (sinceScan > 30) { targets = Array.from(document.querySelectorAll('.vel-skew')); sinceScan = 0; }
        sinceScan++;
        written = skew;
        const t = skew === 0 ? '' : `skewY(${skew.toFixed(3)}deg)`;
        for (const el of targets) el.style.transform = t;
      } else {
        sinceScan = Infinity; // rescan on the next movement
      }
    };
    frame.read(read, true);
    frame.render(loop, true);
    return () => {
      cancelFrame(read);
      cancelFrame(loop);
      document.querySelectorAll('.vel-skew').forEach((el) => { el.style.transform = ''; });
    };
  }, [reduce]);

  return null;
}
