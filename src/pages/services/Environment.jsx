// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import ServicePageHero from '../../components/shared/ServicePageHero';
import ServiceSection from '../../components/shared/ServiceSection';
import CTABanner from '../../components/shared/CTABanner';
import { MEDIA } from '../../lib/media';

export default function Environmental() {
  return (
    <div>
      <ServicePageHero
        title="Environmental Monitoring & Smart Agriculture"
        subtitle="Revolutionizing environmental monitoring with cutting-edge drone technology and AI-powered data analysis. Elevate your environmental insights."
        video={MEDIA.env_hero_image}
      />


<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceSection
          title="Precise Environmental Monitoring"
          description="Our drone-based environmental monitoring services provide accurate habitat mapping, pollution detection, and comprehensive ecosystem assessments. Using multi-spectral and thermal sensors, we deliver data that enables informed conservation decisions."
          features={[
            'Multi-spectral habitat mapping',
            'Water quality and pollution detection',
            'Coastal erosion monitoring',
            'Wetland and forest ecosystem assessments',
          ]}
          image={MEDIA.env_section_monitoring_image}
        />
        <ServiceSection
          title="Biodiversity Assessment"
          description="Advanced AI-driven analytics for species identification, population counting, and change detection. Our drone surveys provide detailed reports and maps that support biodiversity conservation efforts."
          features={[
            'AI-powered species identification',
            'Population density estimation',
            'Change detection over time',
            'Detailed conservation reports and maps',
          ]}
          image={MEDIA.env_section_biodiversity_image}
          reversed
        />
        <ServiceSection
          title="Smart Agriculture"
          description="Optimize crop health, irrigation, and nutrient management with AI-powered drone analytics. Our targeted intervention recommendations help maximize yields while minimizing resource usage."
          features={[
            'NDVI crop health analysis',
            'Irrigation efficiency mapping',
            'Nutrient deficiency detection',
            'AI-powered targeted intervention plans',
          ]}
          image={MEDIA.env_section_smart_agriculture_image}
        />
      </div>


<CTABanner title="Elevate Your Environmental Insights" subtitle="Contact us for a consultation on environmental monitoring solutions." />
    </div>
  );
}