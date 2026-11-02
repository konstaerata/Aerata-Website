import { useEffect, useState } from 'react';

/**
 * Subscribes to a CSS media query. Reads the query synchronously on the
 * first render (this is a client-only SPA), so a component never paints the
 * wrong layout first and then swaps; false where matchMedia is missing.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return matches;
}
