// @ts-nocheck
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import IndustryCards from '../components/home/IndustryCards';
import StatsBar from '../components/home/StatsBar';
import WhyAerata from '../components/home/WhyAerata';
import ROICalculator from '../components/home/ROICalculator';
import PartnersSection from '../components/home/PartnersSection';
import { MEDIA } from '../lib/media';

export default function Home() {
  return (
    <div>
      <HeroSection heroImage={MEDIA.home_hero_image} heroVideo={MEDIA.home_hero_video} />
      <IndustryCards />
      <StatsBar />
      <WhyAerata />
      <ROICalculator />
      <PartnersSection />
    </div>
  );
}