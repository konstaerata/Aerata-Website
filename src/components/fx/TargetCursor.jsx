// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const TARGETS = 'a, button, [role="button"], input, select, textarea, summary, label[for]';
const PAD = 6;      // gap between a locked element and its brackets
const IDLE = 9;     // half-size of the idle reticle around the pointer
const SPRING = { stiffness: 520, damping: 38, mass: 0.5 };

/** One corner bracket; position is a spring-driven transform only. */
function Corner({ x, y, cls }) {
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  return <motion.span style={{ x: sx, y: sy }} className={`absolute left-0 top-0 w-2.5 h-2.5 border-lime ${cls}`} />;
}

/**
 * Target-lock cursor accent (desktop pointers only, off under reduced
 * motion). A small reticle trails the pointer; over links, buttons and form
 * fields its four corners snap into HUD brackets around the element. The
 * native cursor stays visible — this is decoration only (pointer-events:
 * none, aria-hidden). Remove by deleting <TargetCursor /> from SiteLayout.
 */
export default function TargetCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const rootRef = useRef(null);

  // Corner targets (top-left x/y of each 10px corner box).
  const c = {
    tlx: useMotionValue(-100), tly: useMotionValue(-100),
    trx: useMotionValue(-100), try: useMotionValue(-100),
    blx: useMotionValue(-100), bly: useMotionValue(-100),
    brx: useMotionValue(-100), bry: useMotionValue(-100),
  };
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const sDotX = useSpring(dotX, { stiffness: 900, damping: 50, mass: 0.3 });
  const sDotY = useSpring(dotY, { stiffness: 900, damping: 50, mass: 0.3 });

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) { setEnabled(false); return; }
    setEnabled(true);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    let locked = null;
    let px = -100;
    let py = -100;
    const S = 10; // corner box size

    const frame = (l, t, r, b) => {
      c.tlx.set(l); c.tly.set(t);
      c.trx.set(r - S); c.try.set(t);
      c.blx.set(l); c.bly.set(b - S);
      c.brx.set(r - S); c.bry.set(b - S);
    };
    const place = () => {
      if (locked && locked.isConnected) {
        const r = locked.getBoundingClientRect();
        frame(r.left - PAD, r.top - PAD, r.right + PAD, r.bottom + PAD);
      } else {
        frame(px - IDLE, py - IDLE, px + IDLE, py + IDLE);
      }
    };

    const onMove = (e) => {
      px = e.clientX; py = e.clientY;
      dotX.set(px); dotY.set(py);
      const next = e.target instanceof Element ? e.target.closest(TARGETS) : null;
      if (next !== locked) {
        locked = next;
        root.dataset.locked = locked ? '1' : '';
      }
      root.dataset.visible = '1';
      place();
    };
    const onLeave = () => { root.dataset.visible = ''; };
    const onScroll = () => { if (locked) place(); };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!enabled) return null;

  return (
    <div ref={rootRef} aria-hidden="true" className="target-cursor fixed inset-0 z-[150] pointer-events-none">
      <motion.span style={{ x: sDotX, y: sDotY }} className="target-cursor__dot absolute left-0 top-0 -ml-[2px] -mt-[2px] w-1 h-1 rounded-full bg-lime" />
      <Corner x={c.tlx} y={c.tly} cls="border-l-[1.5px] border-t-[1.5px]" />
      <Corner x={c.trx} y={c.try} cls="border-r-[1.5px] border-t-[1.5px]" />
      <Corner x={c.blx} y={c.bly} cls="border-l-[1.5px] border-b-[1.5px]" />
      <Corner x={c.brx} y={c.bry} cls="border-r-[1.5px] border-b-[1.5px]" />
    </div>
  );
}
