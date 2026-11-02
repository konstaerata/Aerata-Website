// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Coins, FileCheck2, LineChart, Handshake, BadgeCheck, Umbrella } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';
import { useLang } from '../../lib/LanguageContext';
import { Stagger, Item, Spotlight, Reveal, EASE_OUT } from '../motion';

// Icons for whyAerata.benefits, in order: risk, cost, evidence, decisions, one partner.
const ICONS = [ShieldCheck, Coins, FileCheck2, LineChart, Handshake];

const regulatoryPoints = [
  { icon: BadgeCheck, labelKey: 'whyAerata.easaLabel', textKey: 'whyAerata.easaText' },
  { icon: Umbrella, labelKey: 'whyAerata.insuredLabel', textKey: 'whyAerata.insuredText' },
];

// Bento rhythm: two wide tiles, then three — not five identical cards.
const SPANS = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'];

/** Icon tile whose square outline draws itself in when scrolled into view. */
function IconTile({ icon: Icon, delay = 0, dark = false }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative w-14 h-14 flex items-center justify-center shrink-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 56 56" fill="none" aria-hidden="true">
        <motion.rect
          x="0.75" y="0.75" width="54.5" height="54.5" rx="11"
          stroke={dark ? 'hsl(88 48% 52% / 0.55)' : 'hsl(200 38% 28% / 0.45)'}
          strokeWidth="1.5"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.78, delay, ease: EASE_OUT }}
        />
      </svg>
      <span className={`absolute inset-[5px] rounded-lg transition-colors duration-500 ${dark ? 'bg-lime/10 group-hover:bg-lime/20' : 'bg-primary/5 group-hover:bg-primary/10'}`} />
      <Icon className={`relative w-6 h-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${dark ? 'text-lime' : 'text-primary'}`} aria-hidden="true" />
    </span>
  );
}

export default function WhyAerata() {
  const { t } = useLang();
  const reasons = (t('whyAerata.benefits') || []).map((b, i) => ({ ...b, icon: ICONS[i] }));

  return (
    <section className="relative py-28 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 data-trace opacity-70 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('whyAerata.label')}
          title={t('whyAerata.title')}
          description={t('whyAerata.description')}
        />

        <Stagger gap={0.09} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {reasons.map((r, i) => (
            <Item key={i} className={`${SPANS[i]} ${i === 4 ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
              <Spotlight
                tone="navy"
                className={`group h-full rounded-2xl border border-border/70 bg-card p-7 lg:p-8 flex flex-col transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_hsl(210_35%_12%/0.28)] ${i < 2 ? 'lg:min-h-[240px]' : ''}`}
              >
                <div className="flex items-start justify-between mb-8">
                  <IconTile icon={r.icon} delay={0.15 + i * 0.08} />
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className={`font-display font-semibold text-foreground mb-2 tracking-tight ${i < 2 ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
                  {r.title}
                </h3>
                <p className="text-sm lg:text-[15px] text-muted-foreground leading-relaxed max-w-md">{r.desc}</p>
              </Spotlight>
            </Item>
          ))}
        </Stagger>

        {/* Regulatory & Trust — dark HUD strip */}
        <Reveal delay={0.1} className="mt-4">
          <div className="relative rounded-2xl bg-obsidian overflow-hidden grid grid-cols-1 sm:grid-cols-2">
            <div aria-hidden="true" className="absolute inset-0 hud-grid" />
            {regulatoryPoints.map((pt, i) => (
              <Spotlight
                key={i}
                tone="lime"
                className={`group relative flex items-start gap-5 p-7 lg:p-8 ${i > 0 ? 'border-t sm:border-t-0 sm:border-l border-white/10' : ''}`}
              >
                <IconTile icon={pt.icon} delay={0.3 + i * 0.1} dark />
                <div>
                  <p className="text-[11px] font-display font-bold tracking-[0.18em] uppercase text-lime mb-2">
                    {t(pt.labelKey)}
                  </p>
                  <p className="text-sm text-steelBlue leading-relaxed">
                    {t(pt.textKey)}
                  </p>
                </div>
              </Spotlight>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
