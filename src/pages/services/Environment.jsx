// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Leaf, Droplets, ScanLine, BarChart3 } from 'lucide-react';
import SEO from '../../components/SEO';
import ServicePageHero from '../../components/shared/ServicePageHero';
import ServiceSection from '../../components/shared/ServiceSection';
import CTABanner from '../../components/shared/CTABanner';
import OptimizedImage from '../../components/shared/OptimizedImage';
import { MEDIA } from '../../lib/media';
import { useLang } from '../../lib/LanguageContext';
import { serviceSchema, breadcrumbSchema } from '../../lib/schemas';

export default function Environmental() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  const stats = [
    { value: '200+', label: t('environment.stat0Label'), sub: t('environment.stat0Sub') },
    { value: 'NDVI', label: t('environment.stat1Label'), sub: t('environment.stat1Sub') },
    { value: 'GIS', label: t('environment.stat2Label'), sub: t('environment.stat2Sub') },
    { value: '3', label: t('environment.stat3Label'), sub: t('environment.stat3Sub') },
  ];

  const capabilities = [
    { icon: Droplets, title: t('environment.cap0Title'), desc: t('environment.cap0Desc') },
    { icon: Leaf, title: t('environment.cap1Title'), desc: t('environment.cap1Desc') },
    { icon: ScanLine, title: t('environment.cap2Title'), desc: t('environment.cap2Desc') },
    { icon: BarChart3, title: t('environment.cap3Title'), desc: t('environment.cap3Desc') },
  ];

  const process = [
    { n: '01', title: t('environment.p0Title'), desc: t('environment.p0Desc') },
    { n: '02', title: t('environment.p1Title'), desc: t('environment.p1Desc') },
    { n: '03', title: t('environment.p2Title'), desc: t('environment.p2Desc') },
    { n: '04', title: t('environment.p3Title'), desc: t('environment.p3Desc') },
  ];

  return (
    <div>
      <SEO
        title="Environmental Drone Monitoring — NDVI & Habitat Mapping"
        description="Multispectral drone surveys for environmental monitoring, NDVI vegetation analysis, biodiversity assessment, and precision agriculture across Europe."
        path="/services/environmental"
        jsonLd={[
          serviceSchema({ name: 'Environmental Drone Monitoring', description: 'Multispectral and thermal drone surveys for environmental monitoring, habitat mapping, biodiversity assessment, and precision agriculture.' }),
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services' }, { name: 'Environmental Monitoring' }]),
        ]}
      />
      <ServicePageHero
        title={t('environment.heroTitle')}
        subtitle={t('environment.heroSubtitle')}
        video={MEDIA.env_hero_image}
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
          title={t('environment.s0Title')}
          description={t('environment.s0Desc')}
          features={[t('environment.s0F0'), t('environment.s0F1'), t('environment.s0F2'), t('environment.s0F3'), t('environment.s0F4')]}
          image={MEDIA.env_section_monitoring_image}
        />
        <ServiceSection
          title={t('environment.s1Title')}
          description={t('environment.s1Desc')}
          features={[t('environment.s1F0'), t('environment.s1F1'), t('environment.s1F2'), t('environment.s1F3'), t('environment.s1F4')]}
          image={MEDIA.env_section_biodiversity_image}
          reversed
        />
        <ServiceSection
          title={t('environment.s2Title')}
          description={t('environment.s2Desc')}
          features={[t('environment.s2F0'), t('environment.s2F1'), t('environment.s2F2'), t('environment.s2F3'), t('environment.s2F4')]}
          image={MEDIA.env_section_smart_agriculture_image}
        />
      </div>

      <section className="py-20 bg-secondary/30 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">{t('environment.capsLabel')}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-10">{t('environment.capsTitle')}</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0.3, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-xl border border-border/50">
                <OptimizedImage
                  src={MEDIA.env_capabilities_image}
                  alt="Multispectral environmental data capture"
                  width={800}
                  height={96}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-96"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l border-t border-primary/30" aria-hidden="true" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r border-b border-primary/30" aria-hidden="true" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
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
                      <h3 className="font-display font-semibold text-foreground text-sm leading-tight">{cap.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">{t('environment.workflowLabel')}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-10">{t('environment.workflowTitle')}</h2>

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
                <OptimizedImage
                  src={MEDIA.env_workflow_image}
                  alt="Multispectral drone survey in progress"
                  width={800}
                  height={420}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-[420px]"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {['SENSOR CALIBRATION', 'SPECTRAL PROCESSING', 'GIS DELIVERY'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 text-[10px] font-display font-semibold border border-white/30 text-white rounded bg-[#1B2025]/75 tracking-widest backdrop-blur-sm">{tag}</span>
                ))}
              </div>
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l border-t border-primary/30" aria-hidden="true" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r border-b border-primary/30" aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </section>

      <CTABanner title={t('environment.ctaTitle')} subtitle={t('environment.ctaSub')} />
    </div>
  );
}
