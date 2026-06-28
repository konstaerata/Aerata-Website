// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, ShieldCheck, Gauge, FileSearch } from 'lucide-react';
import SEO from '../../components/SEO';
import ServicePageHero from '../../components/shared/ServicePageHero';
import ServiceSection from '../../components/shared/ServiceSection';
import CTABanner from '../../components/shared/CTABanner';
import { MEDIA } from '../../lib/media';
import { useLang } from '../../lib/LanguageContext';
import { serviceSchema, breadcrumbSchema } from '../../lib/schemas';

export default function OilGas() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  const stats = [
    { value: '40 km', label: t('oilgas.stat0Label'), sub: t('oilgas.stat0Sub') },
    { value: '0', label: t('oilgas.stat1Label'), sub: t('oilgas.stat1Sub') },
    { value: 'IP45', label: t('oilgas.stat2Label'), sub: t('oilgas.stat2Sub') },
    { value: '48h', label: t('oilgas.stat3Label'), sub: t('oilgas.stat3Sub') },
  ];

  const process = [
    { n: '01', title: t('oilgas.p0Title'), desc: t('oilgas.p0Desc') },
    { n: '02', title: t('oilgas.p1Title'), desc: t('oilgas.p1Desc') },
    { n: '03', title: t('oilgas.p2Title'), desc: t('oilgas.p2Desc') },
    { n: '04', title: t('oilgas.p3Title'), desc: t('oilgas.p3Desc') },
  ];

  const trustPoints = [
    { icon: ShieldCheck, title: t('oilgas.t0Title'), desc: t('oilgas.t0Desc') },
    { icon: Gauge, title: t('oilgas.t1Title'), desc: t('oilgas.t1Desc') },
    { icon: FileSearch, title: t('oilgas.t2Title'), desc: t('oilgas.t2Desc') },
    { icon: Cpu, title: t('oilgas.t3Title'), desc: t('oilgas.t3Desc') },
  ];

  return (
    <div>
      <SEO
        title="Oil & Gas Drone Inspections — Pipeline & Flare Stack"
        description="Thermal and visual drone inspections for oil and gas pipelines, flare stacks, and offshore platforms. IP45-rated all-weather operations with 48-hour report delivery."
        path="/services/oil-gas"
        jsonLd={[
          serviceSchema({ name: 'Oil & Gas Drone Inspection', description: 'Thermal, visual, and gas-detection drone inspections for pipelines, refineries, flare stacks, and offshore platforms.' }),
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services' }, { name: 'Oil & Gas' }]),
        ]}
      />
      <ServicePageHero
        title={t('oilgas.heroTitle')}
        subtitle={t('oilgas.heroSubtitle')}
        image={MEDIA.oilgas_hero_image}
        ctaText={t('oilgas.heroCta')}
      />

      <section className="border-b border-border/30 bg-[#1B2025]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? false : { opacity: 0.3, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
                className="px-6 py-8"
              >
                <p className="font-display font-bold text-3xl text-lime mb-1">{s.value}</p>
                <p className="text-sm font-semibold text-white/90 mb-0.5">{s.label}</p>
                <p className="text-xs text-[#9AA8A2]/70">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceSection
          title={t('oilgas.s0Title')}
          description={t('oilgas.s0Desc')}
          features={[t('oilgas.s0F0'), t('oilgas.s0F1'), t('oilgas.s0F2'), t('oilgas.s0F3'), t('oilgas.s0F4')]}
          image={MEDIA.oilgas_section_cost_image}
        />
        <ServiceSection
          title={t('oilgas.s1Title')}
          description={t('oilgas.s1Desc')}
          features={[t('oilgas.s1F0'), t('oilgas.s1F1'), t('oilgas.s1F2'), t('oilgas.s1F3'), t('oilgas.s1F4')]}
          image={MEDIA.oilgas_section_safety_image}
          reversed
        />
      </div>

      <section className="py-20 bg-secondary/30 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">{t('oilgas.workflowLabel')}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-10">{t('oilgas.workflowTitle')}</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute left-[19px] top-8 bottom-8 w-px bg-primary/15 hidden sm:block" aria-hidden="true" />
              <div className="space-y-0">
                {process.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={prefersReducedMotion ? false : { opacity: 0.3, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.09, ease: 'easeOut' }}
                    className="flex gap-5 pb-8 last:pb-0"
                  >
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center z-10 relative">
                        <span className="font-mono font-bold text-xs text-primary">{step.n}</span>
                      </div>
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-display font-semibold text-foreground mb-1.5">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0.3, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-xl border border-border/50">
                <img src={MEDIA.oilgas_workflow_image} alt="Gas pipeline aerial inspection corridor" loading="lazy" className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {['PERMIT PLANNING', 'MULTI-SENSOR CAPTURE', '48H REPORT'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 text-[10px] font-display font-semibold border border-white/30 text-white rounded bg-[#1B2025]/75 tracking-widest backdrop-blur-sm">{tag}</span>
                ))}
              </div>
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l border-t border-primary/30" aria-hidden="true" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r border-b border-primary/30" aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">{t('oilgas.whyLabel')}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-10">{t('oilgas.whyTitle')}</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0.3, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-xl border border-border/50">
                <img src={MEDIA.oilgas_why_aerata_image} alt="Drone inspection of offshore platform" loading="lazy" className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l border-t border-primary/30" aria-hidden="true" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r border-b border-primary/30" aria-hidden="true" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {trustPoints.map((tp, i) => {
                const Icon = tp.icon;
                return (
                  <motion.div
                    key={i}
                    initial={prefersReducedMotion ? false : { opacity: 0.3, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                    className="p-5 rounded-xl border border-border/50 bg-card/40 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground text-sm leading-tight">{tp.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tp.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            {['DJI MATRICE 300RTK', 'DJI MATRICE 350RTK', 'IP45 WEATHER RATING', '55 MIN FLIGHT TIME', 'THERMAL IR', 'LIDAR', 'DAM COMPATIBLE'].map(tag => (
              <span key={tag} className="px-3 py-1.5 text-xs font-mono border border-primary/20 text-primary/60 rounded tracking-wider">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title={t('oilgas.ctaTitle')} subtitle={t('oilgas.ctaSub')} />
    </div>
  );
}
