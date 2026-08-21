// @ts-nocheck
import React, { createContext, useContext, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import en from '../locales/en.json';
import nl from '../locales/nl.json';
import el from '../locales/el.json';

const translations = { en, nl, el };

export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'nl', label: 'NL', name: 'Nederlands' },
  { code: 'el', label: 'EL', name: 'Ελληνικά' },
];

const LANGUAGE_CODES = LANGUAGES.map((l) => l.code);
const DEFAULT_LANG = 'en';

const LanguageContext = createContext(null);

/**
 * Language is derived entirely from the URL: /nl/... and /el/... render
 * the same routes with `lang` set accordingly (see src/App.jsx's second
 * route mount under the `:lang` param); every other URL (the original,
 * unprefixed paths) is English. This makes each language independently
 * crawlable/indexable — the previous localStorage-only implementation was
 * invisible to every crawler that doesn't execute JS.
 */
export function LanguageProvider({ children }) {
  const { lang: langParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const lang = LANGUAGE_CODES.includes(langParam) ? langParam : DEFAULT_LANG;

  const switchLang = (code) => {
    if (!LANGUAGE_CODES.includes(code)) return;

    // Strip the current locale prefix (if any) to get the unprefixed path,
    // then re-add the new one (or none, for English).
    const currentPrefix = LANGUAGE_CODES.includes(langParam) ? `/${langParam}` : '';
    const unprefixedPath = currentPrefix ? location.pathname.slice(currentPrefix.length) || '/' : location.pathname;
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
