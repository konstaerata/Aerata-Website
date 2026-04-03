// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Brain, Lock, Globe, BadgeCheck, Umbrella } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';
import { useLang } from '../../lib/LanguageContext';

const reasons = [
  { icon: Shield, title: 'Certified Pilots & Engineers', desc: 'Fully licensed and experienced team with aviation authority certifications.' },
  { icon: Cpu, title: 'Advanced DJI Technology', desc: 'Enterprise-grade DJI platforms with thermal, LiDAR, and multi-spectral sensors.' },
  { icon: Brain, title: 'AI-Powered Analytics', desc: 'Machine learning algorithms for anomaly detection and predictive maintenance.' },
  { icon: Lock, title: 'GDPR-Compliant Data Handling', desc: 'End-to-end data security aligned with European privacy regulations.' },
  { icon: Globe, title: 'Offices in Netherlands & Greece', desc: 'Strategic presence serving European and Mediterranean markets.' },
];

const regulatoryPoints = [
  { icon: BadgeCheck, text: 'EASA Approved Specific Category Operator for complex and high-risk missions.' },
  { icon: Umbrella, text: 'Fully Insured under Industry Standard Aviation Policy for all commercial drone operations.' },
];

export default function WhyAerata() {
  const { t } = useLang();
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-xl border border-border/70 bg-white hover:border-primary/40 hover:shadow-[0_4px_24px_hsl(200_38%_28%/0.10)] transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-oxanium font-semibold text-foreground text-sm mb-2 tracking-wide">{r.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Regulatory & Trust — prominently highlighted */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          {regulatoryPoints.map((pt, i) => {
            const Icon = pt.icon;
            const labels = [t('whyAerata.easaLabel'), t('whyAerata.insuredLabel')];
            const texts  = [t('whyAerata.easaText'),  t('whyAerata.insuredText')];
            return (
              <div
                key={i}
                className="relative flex items-start gap-4 flex-1 pl-5 pr-6 py-5 rounded-xl border border-primary/25 bg-white overflow-hidden shadow-sm hover:shadow-[0_4px_24px_hsl(200_38%_28%/0.12)] hover:border-primary/45 transition-all duration-300"
              >
                {/* Lime left-accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-lime" />

                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] font-oxanium font-bold tracking-[0.15em] uppercase text-primary mb-1">
                    {labels[i]}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {texts[i]}
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