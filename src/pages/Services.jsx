// @ts-nocheck
import React from 'react';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import ServicePageHero from '../components/shared/ServicePageHero';
import MediaSlot from '../components/shared/MediaSlot';
import CTABanner from '../components/shared/CTABanner';
import { Reveal } from '../components/motion';
import { Link } from '@/components/LocalizedLink';
import { MEDIA } from '../lib/media';
import { SECTORS, CONTENT_LANGUAGES } from '../lib/sectors';
import { useHashScroll } from '../hooks/useHashScroll';
import { useLang } from '../lib/LanguageContext';
import { breadcrumbSchema } from '../lib/schemas';

/** Image slot and related sector pages per service id (copy: servicesPage.list). */
export const SERVICE_META = {
  'pv-thermal': { sectors: ['renewables'], slot: { id: 'SRV-01', desc: 'Thermal view of PV strings.', src: MEDIA.renewable_thermal_slider_thermal } },
  wind: { sectors: ['renewables'], slot: { id: 'SRV-02', desc: 'Wind turbine blade inspection.', src: MEDIA.renewable_why_aerata_image } },
  'power-line': { sectors: ['grid'], slot: { id: 'SRV-03', desc: 'Power line inspection.', src: MEDIA.infra_report_tower_audit_image } },
  lidar: { sectors: ['grid', 'build', 'infra'], slot: { id: 'SRV-04', desc: 'LiDAR point cloud.', src: MEDIA.surveying_section_lidar_image } },
  mapping: { sectors: ['build', 'renewables', 'environmental'], slot: { id: 'SRV-05', desc: 'Orthophoto map.', src: MEDIA.surveying_section_orthophotos_image } },
  security: { sectors: ['safety', 'build', 'renewables'], slot: { id: 'SRV-06', desc: 'AI-generated illustration of a Kooi camera unit with a DJI drone on a site.', src: MEDIA.photo_saf_02, ai: true, aiBadge: false } },
};

const SECTOR_BY_KEY = Object.fromEntries(SECTORS.map((s) => [s.key, s]));
const pad2 = (n) => String(n).padStart(2, '0');

export default function Services() {
  const { t, lang } = useLang();
  const list = t('servicesPage.list');
  useHashScroll();

  return (
    <div>
      <SEO
        title={t('servicesPage.seoTitle')}
        description={t('servicesPage.seoDesc')}
        path="/services"
        noindex={!CONTENT_LANGUAGES.includes(lang)}
        languages={CONTENT_LANGUAGES}
        jsonLd={[breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services' }], lang)]}
      />
      <ServicePageHero
        title={t('servicesPage.heroTitle')}
        subtitle={t('servicesPage.heroSub')}
        image={MEDIA.home_hero_poster}
        eyebrow={t('servicesPage.eyebrow')}
        ctaText={t('sectorPages.common.heroCta')}
        ctaLink="/contact?source=services"
      />

      {list.map((s, i) => {
        const meta = SERVICE_META[s.id] || { sectors: [] };
        const flip = i % 2 === 1;
        return (
          <section key={s.id} id={s.id} className={`py-20 lg:py-28 scroll-mt-20 ${flip ? 'bg-secondary/40 border-y border-border/40' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <Reveal className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
                <MediaSlot slot={meta.slot} alt={s.title} ratio="aspect-[4/3]" />
              </Reveal>
              <Reveal delay={0.08} className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
                <span className="font-mono text-xs tracking-[0.2em] text-[hsl(88_55%_24%)] tabular-nums">{pad2(i + 1)} / {pad2(list.length)}</span>
                <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl text-primary tracking-tight leading-[1.05]">{s.title}</h2>
                <p className="mt-5 text-lg text-foreground/90 leading-relaxed">{s.desc}</p>
                <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">{s.detail}</p>

                <dl className="mt-8 grid gap-5 border-t border-border/70 pt-6">
                  <div>
                    <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">{t('servicesPage.equipmentLabel')}</dt>
                    <dd className="text-sm text-foreground">{s.equipment}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">{t('servicesPage.outputsLabel')}</dt>
                    <dd className="flex flex-wrap gap-2">
                      {s.outputs.map((o) => (
                        <span key={o} className="px-2.5 py-1 rounded border border-primary/20 bg-primary/5 text-xs text-primary">{o}</span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">{t('servicesPage.sectorsLabel')}</dt>
                    <dd className="flex flex-wrap gap-x-5 gap-y-2">
                      {meta.sectors.map((k) => (
                        <Link key={k} to={SECTOR_BY_KEY[k].path} className="group inline-flex items-center gap-1.5 text-sm font-display font-semibold text-primary hover:text-[hsl(88_55%_24%)] transition-colors">
                          {t(`sectorPages.${k}.name`)}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </section>
        );
      })}

      <CTABanner
        title={t('sectorPages.common.ctaTitle')}
        subtitle={t('sectorPages.common.ctaSub')}
        buttonText={t('sectorPages.common.ctaButton')}
        link="/contact?source=services"
      />
    </div>
  );
}
