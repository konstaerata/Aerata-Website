// @ts-nocheck
import React from 'react';
import SEO from '../components/SEO';
import HeroSection from '../components/home/HeroSection';
import IndustryCards from '../components/home/IndustryCards';
import StatsBar from '../components/home/StatsBar';
import WhyAerata from '../components/home/WhyAerata';
import ROICalculator from '../components/home/ROICalculator';
import PartnersSection from '../components/home/PartnersSection';
import { MEDIA } from '../lib/media';
import { useLang } from '../lib/LanguageContext';
import { useHashScroll } from '../hooks/useHashScroll';

export default function Home() {
  const { t } = useLang();
  useHashScroll(); // the "previous projects" links land on /#sectors
  return (
    <div>
      <SEO
        title={t('homePage.seoTitle')}
        description={t('homePage.seoDesc')}
        path="/"
      />
      <HeroSection heroImage={MEDIA.home_hero_image} heroVideo={MEDIA.home_hero_video} />
      <IndustryCards />
      <StatsBar />
      <WhyAerata />
      <ROICalculator />
      <PartnersSection />
    </div>
  );
}