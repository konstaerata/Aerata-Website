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

export default function Home() {
  return (
    <div>
      <SEO
        title="Aerata B.V. — Enterprise Drone Inspection Services"
        description="Aerata delivers aerial intelligence across Europe — thermal, LiDAR, and photogrammetric drone inspections for renewable energy, infrastructure, surveying, and oil &amp; gas."
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