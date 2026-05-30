// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shield, Cpu, Brain, Lock, Globe, BadgeCheck, Umbrella } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';
import { useLang } from '../../lib/LanguageContext';

const reasons = [
  { icon: Shield, title: 'Certified Pilots & Engineers', desc: 'Fully licensed team with EASA aviation authority certifications.' },
  { icon: Cpu, title: 'Advanced DJI Technology', desc: 'Enterprise DJI platforms with thermal, LiDAR, and multi-spectral sensors.' },
  { icon: Brain, title: 'AI-Powered Analytics', desc: 'Machine learning for anomaly detection and predictive maintenance.' },
  { icon: Lock, title: 'GDPR-Compliant Data Handling', desc: 'End-to-end data security aligned with European privacy regulations.' },
  { icon: Globe, title: 'Offices in Netherlands & Greece', desc: 'Strategic presence serving European and Mediterranean markets.' },
];

const regulatoryPoints = [
  { icon: BadgeCheck, labelKey: 'whyAerata.easaLabel', textKey: 'whyAerata.easaText' },
  { icon: Umbrella, labelKey: 'whyAerata.insuredLabel', textKey: 'whyAerata.insuredText' },
];

export default function WhyAerata() {
  const { t } = useLang();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('whyAerata.label')}
          title={t('whyAerata.title')}
          description={t('whyAerata.description')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? false : { opacity: 0.3, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className="group p-6 rounded-xl border border-border/70 bg-card hover:border-primary/40 hover:shadow-[0_4px_24px_hsl(200_38%_28%/0.10)] transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-sm mb-2 tracking-wide">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Regulatory & Trust */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0.3, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          {regulatoryPoints.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div
                key={i}
                className="relative flex items-start gap-4 flex-1 pl-5 pr-6 py-5 rounded-xl border border-primary/25 bg-card overflow-hidden shadow-sm hover:shadow-[0_4px_24px_hsl(200_38%_28%/0.12)] hover:border-primary/45 transition-all duration-300"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-lime" aria-hidden="true" />
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-display font-bold tracking-[0.15em] uppercase text-primary mb-1">
                    {t(pt.labelKey)}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(pt.textKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
