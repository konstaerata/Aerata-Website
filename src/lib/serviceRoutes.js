// @ts-nocheck
import { warmSectorHero } from './sectors';

/**
 * Lazy importers for the code-split pages — one source for App's React.lazy
 * routes and for prefetching, so a prefetch warms exactly the chunk the
 * route will render (dynamic imports are cached per module).
 */
const importSectorPage = () => import('../pages/sectors/SectorPage');

/** Sector paths rendered by the shared template (keep in sync with lib/sectors.js). */
export const SECTOR_PATHS = [
  '/sectors/renewable-energy',
  '/sectors/power-grids-telecom',
  '/sectors/construction-surveying',
  '/sectors/infrastructure-industry',
  '/sectors/security-public-safety',
  '/sectors/environmental-monitoring',
];

export const SERVICE_PAGE_IMPORTS = {
  ...Object.fromEntries(SECTOR_PATHS.map((p) => [p, importSectorPage])),
  '/services': () => import('../pages/Services'),
};

export const PAGE_IMPORTS = {
  ...SERVICE_PAGE_IMPORTS,
  '/about': () => import('../pages/About'),
  '/training': () => import('../pages/Training'),
  '/news': () => import('../pages/News'),
  '/news/:id': () => import('../pages/NewsArticle'),
  '/contact': () => import('../pages/Contact'),
  '/privacy': () => import('../pages/Privacy'),
  '/portal': () => import('../pages/ClientPortal'),
};

const warmed = new Set();

/** Maps a link target (with or without /nl|/el prefix, query or hash) to its importer key. */
function routeKey(to) {
  if (typeof to !== 'string' || !to.startsWith('/')) return null;
  const path = to.split(/[?#]/)[0].replace(/^\/(nl|el)(?=\/|$)/, '') || '/';
  if (PAGE_IMPORTS[path]) return path;
  if (/^\/news\/[^/]+$/.test(path)) return '/news/:id';
  return null;
}

/** Fire-and-forget fetch of a page's code. Safe to call on every hover. */
export function prefetchRoute(to) {
  const key = routeKey(to);
  if (key) warmSectorHero(key); // also preload a sector page's hero picture
  if (!key || warmed.has(key)) return;
  warmed.add(key);
  PAGE_IMPORTS[key]().catch(() => warmed.delete(key));
}

/** Kept for existing callers. */
export const prefetchServicePage = prefetchRoute;

/**
 * Once the current page has settled, quietly fetch every page's code so any
 * click renders instantly. Skipped for data-saver and slow connections, where
 * hover prefetching alone still covers the likely next page.
 */
export function prefetchAllRoutesWhenIdle() {
  if (typeof window === 'undefined') return () => {};
  const conn = navigator.connection;
  if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))) return () => {};
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
  const cancelIdle = window.cancelIdleCallback || clearTimeout;
  let idleId;
  const timer = setTimeout(() => {
    // Code only: hero pictures are warmed on hover (prefetchRoute), not for every page in the background.
    idleId = idle(() => Object.keys(PAGE_IMPORTS).forEach((k) => {
      if (k === '/portal' || warmed.has(k)) return;
      warmed.add(k);
      PAGE_IMPORTS[k]().catch(() => warmed.delete(k));
    }), { timeout: 4000 });
  }, 3500);
  return () => { clearTimeout(timer); if (idleId) cancelIdle(idleId); };
}
