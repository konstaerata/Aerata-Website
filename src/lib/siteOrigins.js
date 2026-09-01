/**
 * siteOrigins.js — single source of truth for which domain each language's
 * canonical/hreflang URLs should point at.
 *
 * English and Dutch both live under aerata.com (English at the root,
 * unprefixed; Dutch under /nl/...). Greek's canonical home is aerata.gr,
 * at the root — NOT aerata.com/el/... The legacy /el/-prefixed routes under
 * aerata.com still render (see src/lib/LanguageContext.jsx), but their
 * canonical output resolves to the aerata.gr equivalent via this table,
 * since a page's canonical/hreflang should be determined by its LANGUAGE,
 * not by which hostname happened to serve a given request.
 *
 * Used by src/components/SEO.jsx, src/lib/schemas.js, and
 * scripts/generate-sitemap.js — kept in one place so those three never
 * drift out of sync on which origin a language maps to.
 */
export const SITE_ORIGINS = {
  en: 'https://aerata.com',
  nl: 'https://aerata.com',
  el: 'https://aerata.gr',
};

export const DEFAULT_LANG = 'en';

/**
 * Builds the absolute URL for a given (unprefixed) path in a given language.
 * Only `nl` still uses a path prefix — `en` and `el` are both origin-root.
 * @param {string} path
 * @param {string} lang
 */
export function localizedUrl(path, lang) {
  const prefix = lang === 'nl' ? '/nl' : '';
  const origin = SITE_ORIGINS[lang] ?? SITE_ORIGINS[DEFAULT_LANG];
  return `${origin}${prefix}${path}`;
}
