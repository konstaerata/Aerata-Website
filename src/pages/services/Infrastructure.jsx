// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shield, Zap, Target, CircleDollarSign, Radio, Bolt } from 'lucide-react';
import SEO from '../../components/SEO';
import ServicePageHero from '../../components/shared/ServicePageHero';
import SectionHeading from '../../components/shared/SectionHeading';
import CTABanner from '../../components/shared/CTABanner';
import OptimizedImage from '../../components/shared/OptimizedImage';
import { MEDIA } from '../../lib/media';
import { useLang } from '../../lib/LanguageContext';
import { serviceSchema, breadcrumbSchema } from '../../lib/schemas';

function ServiceGrid({ title, image, services, icon: Icon, desc }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">{title}</h2>
            </div>
            {desc && <p className="text-muted-foreground mb-8 leading-relaxed">{desc}</p>}
            <div className="space-y-5">
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={prefersReducedMotion ? false : { opacity: 0.3, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 shrink-0 rounded bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5">
                    <span className="font-display font-bold text-xs text-primary">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <OptimizedImage
              src={image}
              alt={title}
              width={800}
              height={384}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-96 rounded-xl border border-border/50"
              imgClassName="transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute -top-2 -left-2 w-6 h-6 border-l border-t border-primary/30" aria-hidden="true" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r border-b border-primary/30" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Infrastructure() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  const stats = [
    { value: '5×', label: t('infra.stat0Label'), sub: t('infra.stat0Sub') },
    { value: '40 km', label: t('infra.stat1Label'), sub: t('infra.stat1Sub') },
    { value: '0', label: t('infra.stat2Label'), sub: t('infra.stat2Sub') },
    { value: 'GPS', label: t('infra.stat3Label'), sub: t('infra.stat3Sub') },
  ];

  const telecomServices = [
    { title: t('infra.tc0Title'), desc: t('infra.tc0Desc') },
    { title: t('infra.tc1Title'), desc: t('infra.tc1Desc') },
    { title: t('infra.tc2Title'), desc: t('infra.tc2Desc') },
    { title: t('infra.tc3Title'), desc: t('infra.tc3Desc') },
  ];

  const powerlineServices = [
    { title: t('infra.pl0Title'), desc: t('infra.pl0Desc') },
    { title: t('infra.pl1Title'), desc: t('infra.pl1Desc') },
    { title: t('infra.pl2Title'), desc: t('infra.pl2Desc') },
    { title: t('infra.pl3Title'), desc: t('infra.pl3Desc') },
  ];

  const whyChoose = [
    { icon: Shield, title: t('infra.w0Title'), desc: t('infra.w0Desc') },
    { icon: Zap, title: t('infra.w1Title'), desc: t('infra.w1Desc') },
    { icon: Target, title: t('infra.w2Title'), desc: t('infra.w2Desc') },
    { icon: CircleDollarSign, title: t('infra.w3Title'), desc: t('infra.w3Desc') },
  ];

  return (
    <div>
      <SEO
        title="Infrastructure Drone Inspections — Towers & Power Lines"
        description="Drone inspections for telecom towers, power lines, and critical infrastructure. 5x faster than rope access with centimetre-accurate GPS-tagged imagery."
        path="/services/infrastructure"
        jsonLd={[
          serviceSchema({ name: 'Critical Infrastructure Drone Inspection', description: 'Drone-based visual and thermal inspections for telecom towers, power transmission lines, and critical infrastructure assets.' }),
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services' }, { name: 'Infrastructure' }]),
        ]}
      />
      <ServicePageHero
        title={t('infra.heroTitle')}
        subtitle={t('infra.heroSubtitle')}
        image={MEDIA.infra_hero_image}
        ctaText={t('infra.heroCta')}
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

      <ServiceGrid
        title={t('infra.telecomTitle')}
        image={MEDIA.infra_section_telecom_image}
        services={telecomServices}
        icon={Radio}
        desc={t('infra.telecomDesc')}
      />

      <div className="border-t border-border/30" />

      <ServiceGrid
        title={t('infra.powerTitle')}
        image={MEDIA.infra_section_powerlines_image}
        services={powerlineServices}
        icon={Bolt}
        desc={t('infra.powerDesc')}
      />

      <section className="py-20 bg-secondary/30 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">{t('infra.whyLabel')}</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-10">{t('infra.whyTitle')}</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0.3, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-xl border border-border/50">
                <img src={MEDIA.infra_why_aerata_image} alt="Drone inspection of power transmission lines" loading="lazy" className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l border-t border-primary/30" aria-hidden="true" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r border-b border-primary/30" aria-hidden="true" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {whyChoose.map((w, i) => {
                const Icon = w.icon;
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
                      <h3 className="font-display font-semibold text-foreground text-sm leading-tight">{w.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTABanner title={t('infra.ctaTitle')} subtitle={t('infra.ctaSub')} />
    </div>
  );
}
