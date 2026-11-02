// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from '@/components/LocalizedLink';
import { useLang } from '../lib/LanguageContext';
import { getConsent, setConsent, CONSENT_EVENTS } from '../lib/consent';

/**
 * Cookie banner. Shown until the visitor chooses; reopened from the footer's
 * "Cookie settings" link. Accept all and Reject all carry equal weight on the
 * first layer; Settings opens per-category switches. Nothing non-essential
 * loads before a choice (see lib/consent.js).
 */
function Switch({ checked, onChange, disabled, label, id }) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 ${checked ? 'bg-primary' : 'bg-border'}`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  );
}

export default function CookieConsent() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [choice, setChoice] = useState({ analytics: false, marketing: false });
  const panelRef = useRef(null);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
    const open = () => {
      const c = getConsent();
      setChoice({ analytics: !!c?.analytics, marketing: !!c?.marketing });
      setSettings(true);
      setVisible(true);
    };
    window.addEventListener(CONSENT_EVENTS.open, open);
    return () => window.removeEventListener(CONSENT_EVENTS.open, open);
  }, []);

  // Move focus into the banner when it is reopened from the footer.
  useEffect(() => {
    if (visible && settings) panelRef.current?.querySelector('button, [href]')?.focus();
  }, [visible, settings]);

  const save = (c) => {
    setVisible(false);
    setSettings(false);
    setConsent(c);
  };

  const btn = 'min-h-11 flex-1 px-4 py-2.5 text-sm font-semibold rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
  const primary = `${btn} bg-primary text-white hover:bg-primary/90`;
  const secondary = `${btn} border border-primary/40 text-primary hover:bg-primary/5`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-text"
          initial={reduce ? false : { y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 40, opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.33, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 inset-x-0 md:bottom-6 md:left-auto md:right-6 md:max-w-md z-[60] bg-white border-t md:border border-border md:rounded-lg p-4 md:p-6 shadow-[0_-8px_30px_-12px_hsl(210_35%_12%/0.25)] md:shadow-2xl max-h-[85vh] overflow-y-auto"
        >
          <h2 id="cookie-title" className="font-display font-semibold text-base text-foreground mb-2">{t('cookies.title')}</h2>
          <p id="cookie-text" className="text-xs md:text-sm text-foreground/80 mb-4 leading-relaxed">
            {t('cookies.text')}{' '}
            <Link to="/privacy" className="text-primary underline underline-offset-2 hover:no-underline">{t('cookies.policyLink')}</Link>
          </p>

          {settings && (
            <ul className="mb-4 divide-y divide-border border-y border-border">
              {[
                { key: 'necessary', on: true, disabled: true },
                { key: 'analytics', on: choice.analytics },
                { key: 'marketing', on: choice.marketing },
              ].map((c) => (
                <li key={c.key} className="flex items-start justify-between gap-4 py-3">
                  <div>
                    <label htmlFor={`consent-${c.key}`} className="block text-sm font-semibold text-foreground">{t(`cookies.${c.key}`)}</label>
                    <p className="text-xs text-foreground/75 leading-relaxed mt-0.5">{t(`cookies.${c.key}Desc`)}</p>
                  </div>
                  <Switch
                    id={`consent-${c.key}`}
                    checked={c.on}
                    disabled={c.disabled}
                    label={t(`cookies.${c.key}`)}
                    onChange={(v) => setChoice((s) => ({ ...s, [c.key]: v }))}
                  />
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => save({ analytics: true, marketing: true })} className={primary}>{t('cookies.acceptAll')}</button>
            <button type="button" onClick={() => save({ analytics: false, marketing: false })} className={primary}>{t('cookies.rejectAll')}</button>
            {settings ? (
              <button type="button" onClick={() => save(choice)} className={`${secondary} basis-full`}>{t('cookies.save')}</button>
            ) : (
              <button type="button" onClick={() => setSettings(true)} className={`${secondary} basis-full`}>{t('cookies.settings')}</button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
