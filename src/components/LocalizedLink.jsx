// @ts-nocheck
import React, { forwardRef } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { prefetchRoute } from '@/lib/serviceRoutes';

// Routes that exist only at the root, never under /:lang.
const UNPREFIXED = ['/portal'];

/**
 * Returns a function that keeps internal paths inside the current language
 * prefix (/nl/…), so Dutch visitors aren't dropped back to English on every
 * click. English and aerata.gr (Greek at the domain root) have no prefix,
 * so paths pass through unchanged there.
 */
export function useLocalePath() {
  const { lang } = useParams();
  return (to) => {
    if (!lang || typeof to !== 'string' || !to.startsWith('/')) return to;
    if (to === `/${lang}` || to.startsWith(`/${lang}/`) || UNPREFIXED.includes(to)) return to;
    return to === '/' ? `/${lang}` : `/${lang}${to}`;
  };
}

/**
 * Drop-in replacement for react-router's Link that preserves the language
 * prefix and fetches the target page's code on hover, focus or touch, so the
 * click renders without a loading gap.
 */
export const Link = forwardRef(function LocalizedLink({ to, onPointerEnter, onFocus, onTouchStart, ...rest }, ref) {
  const localePath = useLocalePath();
  const warm = () => prefetchRoute(typeof to === 'string' ? to : to?.pathname);
  return (
    <RouterLink
      ref={ref}
      to={localePath(to)}
      onPointerEnter={(e) => { warm(); onPointerEnter?.(e); }}
      onFocus={(e) => { warm(); onFocus?.(e); }}
      onTouchStart={(e) => { warm(); onTouchStart?.(e); }}
      {...rest}
    />
  );
});
