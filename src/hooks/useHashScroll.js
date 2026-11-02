import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the element named by the URL hash once the page has rendered
 * (SiteLayout resets to the top on every route change). Uses Lenis when it
 * is running so the scroll position stays in sync.
 */
export function useHashScroll(offset = -80) {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      if (window.__lenis) window.__lenis.scrollTo(el, { offset });
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(raf);
  }, [hash, pathname, offset]);
}
