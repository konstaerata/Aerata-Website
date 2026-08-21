// @ts-nocheck
import React, { useState, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shield, Zap, FileText } from 'lucide-react';
import SEO from '../../components/SEO';
import ServicePageHero from '../../components/shared/ServicePageHero';
import ServiceSection from '../../components/shared/ServiceSection';
import CTABanner from '../../components/shared/CTABanner';
import RelatedServices from '../../components/shared/RelatedServices';
import OptimizedImage from '../../components/shared/OptimizedImage';
import { MEDIA } from '../../lib/media';
import { useLang } from '../../lib/LanguageContext';
import { serviceSchema, breadcrumbSchema } from '../../lib/schemas';

function ThermalSlider({ t }) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const updatePos = useCallback((clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onMouseMove = useCallback((e) => { if (e.buttons !== 1) return; updatePos(e.clientX); }, [updatePos]);
  const onTouchMove = useCallback((e) => { e.preventDefault(); updatePos(e.touches[0].clientX); }, [updatePos]);

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0.3, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-primary" />
          <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">{t('renewable.thermalLabel')}</span>
        </div>
        <h2 className="font-display font-bold text-3xl text-foreground mb-2">{t('renewable.thermalTitle')}</h2>
        <p className="text-muted-foreground mb-8 max-w-xl">{t('renewable.thermalDesc')}</p>

        <div
          ref={trackRef}
          className="relative w-full aspect-[16/7] max-h-[480px] rounded-lg overflow-hidden border border-border/50 cursor-col-resize select-none"
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          onTouchStart={(e) => updatePos(e.touches[0].clientX)}
          onMouseDown={(e) => updatePos(e.clientX)}
        >
          <div className="absolute inset-0">
            <img src={MEDIA.renewable_thermal_slider_thermal} alt="Thermal view showing hotspots" className="w-full h-full object-cover" draggable={false} />
            <div className="absolute bottom-3 left-3 px-2 py-1 rounded text-[10px] font-mono font-semibold bg-orange-500/80 text-white tracking-wider">THERMAL IR</div>
          </div>
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src={MEDIA.renewable_thermal_slider_standard} alt="Standard RGB view" className="w-full h-full object-cover" draggable={false} />
            <div className="absolute bottom-3 left-3 px-2 py-1 rounded text-[10px] font-mono font-semibold bg-primary/80 text-white tracking-wider">STANDARD RGB</div>
          </div>
          <div className="absolute top-0 bottom-0 w-px bg-white/90 pointer-events-none" style={{ left: `${pos}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-primary flex items-center justify-center pointer-events-none shadow-lg" style={{ left: `${pos}%` }}>
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-primary" aria-hidden="true">
              <path d="M6 10H14M6 10L3 7M6 10L3 13M14 10L17 7M14 10L17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground/60 font-mono">{t('renewable.thermalNote')}</p>
      </div>
    </motion.section>
  );
}

export default function RenewableEnergy() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  const stats = [
    { value: '30+', label: t('renewable.stat0Label'), sub: t('renewable.stat0Sub') },
    { value: '237', label: t('renewable.stat1Label'), sub: t('renewable.stat1Sub') },
    { value: 'IEC', label: t('renewable.stat2Label'), sub: t('renewable.stat2Sub') },
    { value: '48h', label: t('renewable.stat3Label'), sub: t('renewable.stat3Sub') },
  ];

  const process = [
    { n: '01', title: t('renewable.p0Title'), desc: t('renewable.p0Desc') },
    { n: '02', title: t('renewable.p1Title'), desc: t('renewable.p1Desc') },
    { n: '03', title: t('renewable.p2Title'), desc: t('renewable.p2Desc') },
    { n: '04', title: t('renewable.p3Title'), desc: t('renewable.p3Desc') },
  ];

  const trustPoints = [
    { icon: Shield, title: t('renewable.t0Title'), desc: t('renewable.t0Desc') },
    { icon: Zap, title: t('renewable.t1Title'), desc: t('renewable.t1Desc') },
    { icon: FileText, title: t('renewable.t2Title'), desc: t('renewable.t2Desc') },
  ];

  return (
    <div>
      <SEO
        title="Solar & Wind Drone Inspections — Aerata B.V."
        description="IEC-compliant thermal drone inspections for solar farms and wind turbines. Detect hotspots, cracks, and defects 5x faster than ground crews. 48-hour report delivery."
        path="/services/renewable-energy"
        jsonLd={[
          serviceSchema({ name: 'Renewable Energy Drone Inspection', description: 'IEC-compliant thermal and visual drone inspections for solar farms and wind turbines across Europe.' }),
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services' }, { name: 'Renewable Energy' }]),
        ]}
      />
      <ServicePageHero
        title={t('renewable.heroTitle')}
        subtitle={t('renewable.heroSubtitle')}
        image={MEDIA.renewable_hero_image}
        ctaText={t('renewable.heroCta')}
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
          title={t('renewable.solarTitle')}
          description={t('renewable.solarDesc')}
          features={[t('renewable.solarF0'), t('renewable.solarF1'), t('renewable.solarF2'), t('renewable.solarF3'), t('renewable.solarF4')]}
          image={MEDIA.renewable_section_solar_image}
        />
        <ServiceSection
          title={t('renewable.windTitle')}
          description={t('renewable.windDesc')}
          features={[t('renewable.windF0'), t('renewable.windF1'), t('renewable.windF2'), t('renewable.windF3'), t('renewable.windF4')]}
          image={MEDIA.renewable_section_wind_image}
          reversed
        />
      </div>

      <ThermalSlider t={t} />

      <section className="py-20 bg-secondary/30 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">{t('renewable.workflowLabel')}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-10">{t('renewable.workflowTitle')}</h2>

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
                  src={MEDIA.renewable_workflow_image}
                  alt="Solar farm thermal inspection from above"
                  width={800}
                  height={420}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-[420px]"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {['SITE ASSESSMENT', 'THERMAL CAPTURE', '48H DELIVERY'].map(tag => (
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
            <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">{t('renewable.whyLabel')}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-10">{t('renewable.whyTitle')}</h2>

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
                  src={MEDIA.renewable_why_aerata_image}
                  alt="Wind turbine blade drone inspection"
                  width={800}
                  height={400}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-[400px]"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l border-t border-primary/30" aria-hidden="true" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r border-b border-primary/30" aria-hidden="true" />
            </motion.div>

            <div className="space-y-5">
              {trustPoints.map((tp, i) => {
                const Icon = tp.icon;
                return (
                  <motion.div
                    key={i}
                    initial={prefersReducedMotion ? false : { opacity: 0.3, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.09, ease: 'easeOut' }}
                    className="flex gap-4 p-5 rounded-xl border border-border/50 bg-card/40 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">{tp.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tp.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <RelatedServices current="renewable-energy" />

      <CTABanner title={t('renewable.ctaTitle')} subtitle={t('renewable.ctaSub')} />
    </div>
  );
}
