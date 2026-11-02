// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, MaskLines, Scramble, EASE_OUT } from '../components/motion';
import SEO from '../components/SEO';
import { useLang } from '../lib/LanguageContext';
import { breadcrumbSchema } from '../lib/schemas';
import { PRIVACY } from '../lib/privacyContent';
import { openConsentSettings } from '../lib/consent';

/** Privacy & cookie policy. Text per language lives in lib/privacyContent.js. */
function Block({ b }) {
  if (b.p) return <p>{b.p}</p>;
  if (b.ul) return <ul className="list-disc pl-5 space-y-2 marker:text-[hsl(88_55%_24%)]">{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>;
  if (b.table) {
    return (
      <div className="overflow-x-auto rounded-lg border border-border" tabIndex={0} role="region" aria-label={b.table.head.join(', ')}>
        <table className="w-full text-sm text-left">
          <thead className="bg-secondary/60 text-foreground">
            <tr>{b.table.head.map((h) => <th key={h} scope="col" className="px-3 py-2.5 font-semibold align-top">{h}</th>)}</tr>
          </thead>
          <tbody>
            {b.table.rows.map((row) => (
              <tr key={row[0]} className="border-t border-border/70 align-top">
                {row.map((cell, i) => <td key={i} className={`px-3 py-2.5 ${i === 0 ? 'font-medium text-foreground' : ''}`}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

export default function Privacy() {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();
  const c = PRIVACY[lang] || PRIVACY.en;

  return (
    <div className="relative pt-40 pb-28">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[420px] data-trace opacity-70 pointer-events-none [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <SEO
        title={c.seoTitle}
        description={c.seoDesc}
        path="/privacy"
        jsonLd={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: c.title }], lang)}
      />
      <div className="relative max-w-[76ch] mx-auto px-4 sm:px-6">
        <div className="relative mb-14 pb-10 border-b border-border/60">
          <div className="flex items-center gap-3 mb-7">
            <motion.span
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="block w-16 h-px bg-[hsl(88_55%_30%)] origin-left"
            />
            <Scramble text={c.eyebrow} className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-[hsl(88_55%_24%)]" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-primary tracking-tight leading-[1.02] mb-6"><MaskLines lines={[c.title]} delay={0.1} /></h1>
          <p className="text-sm font-mono text-foreground/75 tabular-nums">{c.updated}</p>
        </div>

        <div className="space-y-12 text-foreground/85 leading-[1.75] text-[15.5px]">
          {c.sections.map((s, i) => (
            <Reveal as="section" key={s.title}>
              <h2 className="font-display font-semibold text-xl text-foreground mb-4 flex items-baseline gap-3">
                <span className="font-mono text-xs text-[hsl(88_55%_24%)] tabular-nums">{i + 1}.</span> {s.title}
              </h2>
              <div className="space-y-4">{s.blocks.map((b, k) => <Block key={k} b={b} />)}</div>
              {s.blocks.some((b) => b.table && b.table.rows[0]?.[0] === 'aerata_consent') && (
                <button type="button" onClick={openConsentSettings} className="mt-5 min-h-11 px-5 py-2.5 rounded border border-primary/40 text-primary text-sm font-semibold hover:bg-primary/5 transition-colors">
                  {t('cookies.footerLink')}
                </button>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
