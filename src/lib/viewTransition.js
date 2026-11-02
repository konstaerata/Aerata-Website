import { flushSync } from 'react-dom';

/**
 * Shared-element page transition: the clicked image grows into the next
 * page's hero (the element marked `data-vt-hero`, which carries the same
 * view-transition-name). Falls back to a plain navigation where the View
 * Transitions API is missing or the visitor prefers reduced motion.
 *
 * The update callback waits for the new hero to be in the DOM with its
 * media painted, because service pages are lazy-loaded and would otherwise
 * be captured as an empty frame.
 */
export const HERO_VT_NAME = 'aerata-hero';

// Polls with setTimeout, not requestAnimationFrame: rendering (and with it
// rAF) is paused while a view transition's update callback is pending.
// The screen is frozen while this waits, so the cap is short: hovering a
// sector link preloads its hero (warmSectorHero), so it is usually instant.
const waitForHero = (timeout = 300) =>
  new Promise((resolve) => {
    const start = performance.now();
    const check = () => {
      const hero = document.querySelector('[data-vt-hero]');
      const img = hero?.querySelector('img');
      const video = hero?.querySelector('video');
      const ready = hero && (video ? video.readyState >= 2 : img && img.complete && img.classList.contains('opacity-100'));
      if (ready || performance.now() - start > timeout) resolve();
      else setTimeout(check, 16);
    };
    check();
  });

export function navigateWithMorph(event, { navigate, to, sourceEl }) {
  const canMorph =
    typeof document !== 'undefined' &&
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Let modified clicks (new tab, etc.) behave like normal links.
  if (!canMorph || !sourceEl || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

  event.preventDefault();
  // Coming from a service page, its own hero already carries the name; two
  // elements with one name would cancel the morph.
  document.querySelectorAll('[data-vt-hero]').forEach((h) => { if (h !== sourceEl) h.style.viewTransitionName = 'none'; });
  sourceEl.style.viewTransitionName = HERO_VT_NAME;
  window.__vtNav = true;

  const transition = document.startViewTransition(async () => {
    sourceEl.style.viewTransitionName = '';
    flushSync(() => navigate(to));
    await waitForHero();
  });
  transition.finished.finally(() => { window.__vtNav = false; });
}
