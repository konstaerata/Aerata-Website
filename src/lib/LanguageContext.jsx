// @ts-nocheck
import React, { createContext, useContext, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import en from '../locales/en.json';
import nl from '../locales/nl.json';
import el from '../locales/el.json';
import { SITE_ORIGINS } from './siteOrigins';

const translations = { en, nl, el };

export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'nl', label: 'NL', name: 'Nederlands' },
  { code: 'el', label: 'EL', name: 'Ελληνικά' },
];

const LANGUAGE_CODES = LANGUAGES.map((l) => l.code);
const DEFAULT_LANG = 'en';

// Languages whose canonical home is a domain other than the default
// (aerata.com). Only 'el' today (aerata.gr) — 'nl' stays a path prefix
// under aerata.com. Used to detect "am I currently on that domain" and to
// know when switchLang must do a real cross-origin navigation.
const DOMAIN_LANGS = Object.keys(SITE_ORIGINS).filter(
  (code) => code !== DEFAULT_LANG && SITE_ORIGINS[code] !== SITE_ORIGINS[DEFAULT_LANG]
);

function hostnameLang() {
  if (typeof window === 'undefined') return null;
  const hostname = window.location.hostname;
  return DOMAIN_LANGS.find((code) => hostname === new URL(SITE_ORIGINS[code]).hostname || hostname.endsWith(`.${new URL(SITE_ORIGINS[code]).hostname}`)) ?? null;
}

const LanguageContext = createContext(null);

/**
 * Language is derived from, in order: (1) the current hostname, if it's one
 * of DOMAIN_LANGS' own domains (e.g. aerata.gr -> 'el' — that domain serves
 * Greek at its OWN root, with no :lang URL param at all, so the param alone
 * can't distinguish it from English); otherwise (2) the :lang URL param, as
 * before (/nl/... and the legacy /el/... still work under aerata.com,
 * rendering the same routes). This makes each language independently
 * crawlable/indexable — the previous localStorage-only implementation was
 * invisible to every crawler that doesn't execute JS.
 */
export function LanguageProvider({ children }) {
  const { lang: langParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = hostnameLang() ?? (LANGUAGE_CODES.includes(langParam) ? langParam : DEFAULT_LANG);

  const switchLang = (code) => {
    if (!LANGUAGE_CODES.includes(code)) return;

    // Strip the current locale prefix (if any) to get the unprefixed path,
    // then re-add the new one (or none, for English).
    const currentPrefix = LANGUAGE_CODES.includes(langParam) ? `/${langParam}` : '';
    const unprefixedPath = currentPrefix ? location.pathname.slice(currentPrefix.length) || '/' : location.pathname;

    const targetOrigin = SITE_ORIGINS[code] ?? SITE_ORIGINS[DEFAULT_LANG];
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : SITE_ORIGINS[DEFAULT_LANG];

    if (targetOrigin !== currentOrigin) {
      // Cross-origin (e.g. .com -> .gr, or .gr -> .com) — React Router's
      // navigate() can't cross origins, so this is a real page load. The
      // target language never needs a path prefix on its own domain-root
      // language (en, el); only nl still prefixes under aerata.com.
      const targetPrefix = code === 'nl' ? '/nl' : '';
      window.location.href = `${targetOrigin}${targetPrefix}${unprefixedPath}${location.search}`;
      return;
    }

    const nextPath = code === DEFAULT_LANG ? unprefixedPath : `/${code}${unprefixedPath}`;
    navigate(nextPath + location.search);
  };

  /** Resolve a dot-notation key like "nav.home" */
  const t = (key) => {
    const parts = key.split('.');
    let val = translations[lang] || translations.en;
    for (const p of parts) {
      if (val == null) return key;
      val = val[p];
    }
    // Fallback to English if key missing in selected language
    if (val == null) {
      let fallback = translations.en;
      for (const p of parts) {
        if (fallback == null) return key;
        fallback = fallback[p];
      }
      return fallback ?? key;
    }
    return val;
  };

  const value = useMemo(() => ({ lang, switchLang, t }), [lang, location.pathname, location.search]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}

export { LANGUAGE_CODES, DEFAULT_LANG };
