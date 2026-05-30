// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers, Crosshair, Clock, FileDown } from 'lucide-react';
import ServicePageHero from '../../components/shared/ServicePageHero';
import ServiceSection from '../../components/shared/ServiceSection';
import CTABanner from '../../components/shared/CTABanner';
import { MEDIA } from '../../lib/media';
import { useLang } from '../../lib/LanguageContext';

export default function Surveying() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  const stats = [
    { value: '<2 cm', label: t('surveying.stat0Label'), sub: t('surveying.stat0Sub') },
    { value: '15+', label: t('surveying.stat1Label'), sub: t('surveying.stat1Sub') },
    { value: '10+', label: t('surveying.stat2Label'), sub: t('surveying.stat2Sub') },
    { value: '.LAS', label: t('surveying.stat3Label'), sub: t('surveying.stat3Sub') },
  ];

  const capabilities = [
    { icon: Crosshair, title: t('surveying.cap0Title'), desc: t('surveying.cap0Desc') },
    { icon: Layers, title: t('surveying.cap1Title'), desc: t('surveying.cap1Desc') },
    { icon: Clock, title: t('surveying.cap2Title'), desc: t('surveying.cap2Desc') },
    { icon: FileDown, title: t('surveying.cap3Title'), desc: t('surveying.cap3Desc') },
  ];

  const process = [
    { n: '01', title: t('surveying.p0Title'), desc: t('surveying.p0Desc') },
    { n: '02', title: t('surveying.p1Title'), desc: t('surveying.p1Desc') },
    { n: '03', title: t('surveying.p2Title'), desc: t('surveying.p2Desc') },
    { n: '04', title: t('surveying.p3Title'), desc: t('surveying.p3Desc') },
  ];

  return (
    <div>
      <ServicePageHero
        title={t('surveying.heroTitle')}
        subtitle={t('surveying.heroSubtitle')}
        video={MEDIA.surveying_hero_video}
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
          title={t('surveying.s0Title')}
          description={t('surveying.s0Desc')}
          features={[t('surveying.s0F0'), t('surveying.s0F1'), t('surveying.s0F2'), t('surveying.s0F3')]}
          image={MEDIA.surveying_section_orthophotos_image}
        />
        <ServiceSection
          title={t('surveying.s1Title')}
          description={t('surveying.s1Desc')}
          features={[t('surveying.s1F0'), t('surveying.s1F1'), t('surveying.s1F2'), t('surveying.s1F3')]}
          image={MEDIA.surveying_section_lidar_image}
          reversed
        />
        <ServiceSection
          title={t('surveying.s2Title')}
          description={t('surveying.s2Desc')}
          features={[t('surveying.s2F0'), t('surveying.s2F1'), t('surveying.s2F2'), t('surveying.s2F3')]}
          image={MEDIA.surveying_section_construction_image}
        />
        <ServiceSection
          title={t('surveying.s3Title')}
          description={t('surveying.s3Desc')}
          features={[t('surveying.s3F0'), t('surveying.s3F1'), t('surveying.s3F2'), t('surveying.s3F3')]}
          image={MEDIA.surveying_section_ai_image}
          reversed
        />
      </div>

      <section className="py-20 bg-secondary/30 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">{t('surveying.capsLabel')}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-10">{t('surveying.capsTitle')}</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0.3, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-xl border border-border/50">
                <img src={MEDIA.surveying_capabilities_image} alt="LiDAR point cloud data over terrain" className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
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
            <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">{t('surveying.workflowLabel')}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-10">{t('surveying.workflowTitle')}</h2>

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
                <img src={MEDIA.surveying_workflow_image} alt="Drone survey in progress over a construction site" className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {['SITE PLANNING', 'DATA CAPTURE', 'CAD DELIVERY'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 text-[10px] font-display font-semibold border border-white/30 text-white rounded bg-[#1B2025]/75 tracking-widest backdrop-blur-sm">{tag}</span>
                ))}
              </div>
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l border-t border-primary/30" aria-hidden="true" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r border-b border-primary/30" aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        initial={prefersReducedMotion ? false : { opacity: 0.3, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="py-20 bg-secondary/30 border-y border-border/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">{t('surveying.demoLabel')}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-2">{t('surveying.demoTitle')}</h2>
          <p className="text-muted-foreground mb-8 max-w-xl">{t('surveying.demoDesc')}</p>
          <div className="relative rounded-lg overflow-hidden border border-border/50 bg-[#1B2025]" style={{ paddingTop: '56.25%' }}>
            <video
              src={MEDIA.surveying_demo_3d_video}
              autoPlay={!prefersReducedMotion}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded bg-primary/80 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" aria-hidden="true" />
              <span className="text-[10px] font-mono font-semibold text-white tracking-wider uppercase">3D Point Cloud — St Catherine's Site</span>
            </div>
            <div className="absolute bottom-3 right-3 flex flex-wrap gap-2">
              {['PHOTOGRAMMETRY', 'LIDAR FUSION', '2CM ACCURACY'].map(tag => (
                <span key={tag} className="px-2.5 py-1 text-[10px] font-display font-semibold border border-white/40 text-white rounded bg-[#1B2025]/80 tracking-widest backdrop-blur-sm">{tag}</span>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground/60 font-mono">{t('surveying.demoNote')}</p>
        </div>
      </motion.section>

      <CTABanner title={t('surveying.ctaTitle')} subtitle={t('surveying.ctaSub')} />
    </div>
  );
}
