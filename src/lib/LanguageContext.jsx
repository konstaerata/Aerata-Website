// @ts-nocheck
import React, { createContext, useContext, useState } from 'react';
import en from '../locales/en.json';
import nl from '../locales/nl.json';
import el from '../locales/el.json';

const translations = { en, nl, el };

export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'nl', label: 'NL', name: 'Nederlands' },
  { code: 'el', label: 'EL', name: 'Ελληνικά' },
];

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('aerata-lang') || 'en'; } catch { return 'en'; }
  });

  const switchLang = (code) => {
    setLang(code);
    try { localStorage.setItem('aerata-lang', code); } catch {}
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

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
