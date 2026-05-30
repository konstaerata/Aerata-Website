// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';
import { MEDIA } from '../../lib/media';
import { useLang } from '../../lib/LanguageContext';

function SectorCard({ sector, index, prefersReducedMotion }) {
  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0.3, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0, 0, 1] }}
      className="h-full"
    >
      <Link
        to={sector.link}
        className={`sector-card group block rounded-xl overflow-hidden h-full min-h-[320px] ${
          sector.featured ? 'min-h-[380px]' : ''
        }`}
        style={{
          backgroundImage: `url(${sector.image()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#1B2025]/80 group-hover:bg-[#1B2025]/70 transition-colors duration-350" />
        <div className="relative z-10 h-full flex flex-col justify-end p-7">
          <span className="inline-flex self-start items-center px-2.5 py-1 rounded-full bg-lime/15 border border-lime/30 text-lime text-[11px] font-display font-semibold tracking-[0.12em] uppercase mb-4">
            {sector.tag}
          </span>
          <h3 className="font-display font-bold text-xl text-white mb-4 leading-tight">
            {sector.title}
          </h3>
          <ul className="space-y-2 mb-5">
            {sector.outcomes.map((outcome, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-lime shrink-0 mt-[3px]" aria-hidden="true" />
                <span className="text-[13px] text-steelBlue leading-snug">{outcome}</span>
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-1.5 text-xs font-display font-semibold tracking-wider uppercase text-lime group-hover:gap-3 transition-all duration-300">
            {sector.explore} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function IndustryCards() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  const sectors = [
    {
      title: t('industries.renewable.title'),
      tag: t('industries.renewable.tag'),
      image: () => MEDIA.sector_card_renewable_image,
      outcomes: [t('industries.renewable.o1'), t('industries.renewable.o2'), t('industries.renewable.o3')],
      link: '/services/renewable-energy',
      explore: t('industries.explore'),
      featured: true,
    },
    {
      title: t('industries.infrastructure.title'),
      tag: t('industries.infrastructure.tag'),
      image: () => MEDIA.sector_card_infrastructure_image,
      outcomes: [t('industries.infrastructure.o1'), t('industries.infrastructure.o2'), t('industries.infrastructure.o3')],
      link: '/services/infrastructure',
      explore: t('industries.explore'),
      featured: true,
    },
    {
      title: t('industries.surveying.title'),
      tag: t('industries.surveying.tag'),
      image: () => MEDIA.sector_card_surveying_image,
      outcomes: [t('industries.surveying.o1'), t('industries.surveying.o2'), t('industries.surveying.o3')],
      link: '/services/surveying',
      explore: t('industries.explore'),
      featured: false,
    },
    {
      title: t('industries.oilGas.title'),
      tag: t('industries.oilGas.tag'),
      image: () => MEDIA.sector_card_oilgas_image,
      outcomes: [t('industries.oilGas.o1'), t('industries.oilGas.o2'), t('industries.oilGas.o3')],
      link: '/services/oil-gas',
      explore: t('industries.explore'),
      featured: false,
    },
    {
      title: t('industries.environmental.title'),
      tag: t('industries.environmental.tag'),
      image: () => MEDIA.env_section_smart_agriculture_image,
      outcomes: [t('industries.environmental.o1'), t('industries.environmental.o2'), t('industries.environmental.o3')],
      link: '/services/environmental',
      explore: t('industries.explore'),
      featured: false,
    },
  ];

  const featured = sectors.filter(s => s.featured);
  const standard = sectors.filter(s => !s.featured);

  return (
    <section className="py-24 bg-[#1B2025]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={t('industries.label')}
          title={t('industries.title')}
          description={t('industries.description')}
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {featured.map((sector, i) => (
            <SectorCard key={sector.title} sector={sector} index={i} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {standard.map((sector, i) => (
            <SectorCard key={sector.title} sector={sector} index={i + 2} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
