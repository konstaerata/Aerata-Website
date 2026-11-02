// @ts-nocheck
/**
 * Aerata motion primitives — one shared vocabulary so every page moves the
 * same way. All primitives start from a visible-enough state, animate only
 * transform/opacity/clip-path/filter, and collapse to instant or
 * opacity-only under prefers-reduced-motion.
 *
 *   <Reveal>            fade + rise (optionally blur) when scrolled into view
 *   <Stagger>/<Item>    children step in as a list
 *   <MaskLines>         headline lines rise out of a clipping mask
 *   <Scramble>          short HUD label "decodes" into place
 *   <CountUp>           animates the numeric part of "30+", "48h", "2.3+ GW"
 *   <Magnetic>          gentle pull toward the pointer (mouse only)
 *   <Spotlight>         card with a pointer-following glow
 *   <Marquee>           seamless horizontal loop (pauses on hover/offscreen)
 *   <ClipReveal>        image wipes open from one edge
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useMotionValue, useSpring, animate } from 'framer-motion';

export const EASE_OUT = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];
export const DUR = { micro: 0.14, ui: 0.22, reveal: 0.5, hero: 0.65 };
const VIEWPORT = { once: true, margin: '0px 0px -6% 0px' };

export function Reveal({ as = 'div', children, delay = 0, y = 16, blur = false, className, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? 0.2 : DUR.reveal, delay: reduce ? 0 : delay, ease: EASE_OUT }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const staggerParent = (gap, delay) => ({ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } });

export function Stagger({ as = 'div', children, gap = 0.05, delay = 0, className, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag variants={staggerParent(gap, delay)} initial="hidden" whileInView="show" viewport={VIEWPORT} className={className} {...rest}>
      {children}
    </Tag>
  );
}

export function Item({ as = 'div', children, y = 14, className, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.39, ease: EASE_OUT } } };
  return <Tag variants={variants} className={className} {...rest}>{children}</Tag>;
}

/**
 * Each child line rises from below a clip mask. Pass lines as an array of
 * nodes (each rendered as a block line). Text stays real DOM text.
 */
export function MaskLines({ lines, delay = 0, stagger = 0.07, onMount = true, className = '' }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);
  const play = onMount || inView;
  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            initial={reduce ? { opacity: 0 } : { y: '105%' }}
            animate={play ? (reduce ? { opacity: 1 } : { y: '0%' }) : undefined}
            transition={{ duration: reduce ? 0.2 : 0.62, delay: delay + i * stagger, ease: EASE_OUT }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>-_';
/** Short uppercase labels decode from random glyphs. Screen readers get the real text. */
export function Scramble({ text, delay = 0, duration = 420, className = '' }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);
  const [out, setOut] = useState(text);

  useEffect(() => {
    // Skipped during the card -> page morph: a re-render every frame there stutters it.
    if (reduce || !inView || !text || window.__vtNav) { setOut(text); return; }
    let raf; let start;
    const timer = setTimeout(() => {
      const step = (now) => {
        start ??= now;
        const p = Math.min((now - start) / duration, 1);
        const revealed = Math.floor(p * text.length);
        setOut(text.split('').map((ch, i) => (i < revealed || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(''));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay * 1000);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [inView, text, reduce, delay, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{out}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

/** Animates the first number found in a value like "30+", "48h", "2.3+ GW", "€10,000". */
export function CountUp({ value, duration = 1.1, className = '' }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  // Start as soon as the number is visible, so it never sits at "0" on screen.
  const inView = useInView(ref, { once: true });
  const str = String(value);
  const match = str.match(/-?\d[\d,]*(\.\d+)?/);
  const [display, setDisplay] = useState(match && !reduce ? str.replace(match[0], '0') : str);

  useEffect(() => {
    if (!match || reduce || !inView) { if (!match || reduce) setDisplay(str); return; }
    const target = parseFloat(match[0].replace(/,/g, ''));
    const decimals = (match[1] || '').length ? match[1].length - 1 : 0;
    const grouped = match[0].includes(',');
    const controls = animate(0, target, {
      duration, ease: EASE_OUT,
      onUpdate: (v) => {
        let n = v.toFixed(decimals);
        if (grouped) n = Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        setDisplay(str.replace(match[0], n));
      },
    });
    return () => controls.stop();
  }, [inView, str, reduce]);

  return <span ref={ref} className={`tabular-nums ${className}`}>{display}</span>;
}

/** Wrap a button/link; it leans toward the pointer within its bounds. Mouse only. */
export function Magnetic({ children, strength = 0.28, className = '' }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.span style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset} className={`inline-block ${className}`}>
      {children}
    </motion.span>
  );
}

/** Card surface with a soft lime glow that follows the pointer. */
export function Spotlight({ as: Tag = 'div', children, className = '', tone = 'lime', ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
  };
  return (
    <Tag onPointerMove={onMove} className={`spotlight spotlight--${tone} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/** Seamless loop of its children. Duplicates content once; second copy is aria-hidden. */
export function Marquee({ children, speed = 40, className = '' }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  // Runs only while on screen: an off-screen infinite animation still costs style work every frame.
  const onScreen = useInView(ref, { margin: '100px 0px' });
  if (reduce) return <div className={`flex flex-wrap justify-center gap-4 ${className}`}>{children}</div>;
  return (
    <div ref={ref} className={`marquee group relative overflow-hidden ${className}`} style={{ '--marquee-duration': `${speed}s` }}>
      <div className={`marquee__track flex w-max gap-4 group-hover:[animation-play-state:paused] ${onScreen ? '' : '[animation-play-state:paused]'}`}>
        <div className="flex shrink-0 gap-4">{children}</div>
        <div className="flex shrink-0 gap-4" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

/** Image/media wipes open from the given edge as it enters view. */
export function ClipReveal({ children, from = 'bottom', delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  const hidden = { bottom: 'inset(100% 0 0 0)', left: 'inset(0 100% 0 0)', right: 'inset(0 0 0 100%)', top: 'inset(0 0 100% 0)' }[from];
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { clipPath: hidden }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0 0)' }}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? 0.2 : 0.75, delay, ease: EASE_IN_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
