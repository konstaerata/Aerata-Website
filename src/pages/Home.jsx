// @ts-nocheck
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import IndustryCards from '../components/home/IndustryCards';
import StatsBar from '../components/home/StatsBar';
import WhyAerata from '../components/home/WhyAerata';
import ROICalculator from '../components/home/ROICalculator';
import PartnersSection from '../components/home/PartnersSection';

const HERO_IMG = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774/65a98b32e_generated_a74332b5.png';

const HERO_VIDEO = '/media/promovideo.mp4';

export default function Home() {
  return (
    <div>
      <HeroSection heroImage={HERO_IMG} heroVideo={HERO_VIDEO} />
      <IndustryCards />
      <StatsBar />
      <WhyAerata />
      <ROICalculator />
      <PartnersSection />
    </div>
  );
}