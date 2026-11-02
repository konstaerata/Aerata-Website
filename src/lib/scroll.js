// @ts-nocheck
import { useLayoutEffect, useRef } from 'react';
import { frame, motionValue, useMotionValue, useTransform } from 'framer-motion';

/**
 * One shared, layout-free source of scroll position for every scroll-linked
 * effect on the site.
 *
 * framer-motion's useScroll re-measures its target (offsetTop/offsetLeft up
 * the offsetParent chain, plus scrollHeight) on every scroll event, which
 * forced a layout per frame and was the main remaining cost while scrolling.
 * Here the scroll position is pushed in — by Lenis' scroll callback, or the
 * native scroll event on touch devices — and element positions are measured
 * only when the page's size changes, so a scrolling frame does arithmetic only.
 */
export const pageY = motionValue(0);
const pageMax = motionValue(1);
const remeasurers = new Set();

let started = false;
function start() {
  if (started || typeof window === 'undefined') return;
  started = true;
  pageY.set(window.scrollY);
  // Touch devices (no Lenis): native scroll events. With Lenis active, its
  // own callback below is the source, so the DOM isn't read here at all.
  window.addEventListener('scroll', () => { if (!window.__lenis) pageY.set(window.scrollY); }, { passive: true });

  const measureAll = () => {
    pageMax.set(Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    remeasurers.forEach((fn) => fn());
  };
  const schedule = () => frame.read(measureAll);
  new ResizeObserver(schedule).observe(document.body);
  window.addEventListener('resize', schedule);
  schedule();
}

/** Called by the Lenis instance in SiteLayout on every smooth-scroll step. */
export function setPageY(y) {
  pageY.set(y);
}

/** 0 → 1 over the whole page. */
export function usePageProgress() {
  start();
  return useTransform(() => Math.min(1, Math.max(0, pageY.get() / pageMax.get())));
}

/** Page scroll position in px. */
export function usePageY() {
  start();
  return pageY;
}

/**
 * 0 → 1 progress of an element through the viewport, like useScroll's
 * target/offset. `range(top, height, viewportHeight)` returns the page scroll
 * positions [start, end] where progress is 0 and 1; `top` is the element's
 * top in page coordinates.
 */
export function useElementProgress(ref, range) {
  start();
  const bounds = useMotionValue([0, 1]);
  const rangeRef = useRef(range);
  rangeRef.current = range;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const [s, e] = rangeRef.current(rect.top + window.scrollY, rect.height, window.innerHeight);
      bounds.set([s, Math.max(e, s + 1)]);
    };
    measure();
    remeasurers.add(measure);
    const ro = new ResizeObserver(() => frame.read(measure));
    ro.observe(el);
    return () => { remeasurers.delete(measure); ro.disconnect(); };
  }, [ref, bounds]);

  return useTransform(() => {
    const [s, e] = bounds.get();
    return Math.min(1, Math.max(0, (pageY.get() - s) / (e - s)));
  });
}

/** ['start start', 'end start']: from the element's top at the viewport top until its bottom leaves it. */
export const LEAVING_TOP = (top, height) => [top, top + height];
