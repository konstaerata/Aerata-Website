// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, FileText } from 'lucide-react';
import ServicePageHero from '../../components/shared/ServicePageHero';
import ServiceSection from '../../components/shared/ServiceSection';
import CTABanner from '../../components/shared/CTABanner';

const SOLAR_IMG = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774/861fc5002_generated_b0e7bfe4.png';
const WIND_IMG = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774/df75bc794_generated_9231243b.png';

const trustPoints = [
  { icon: Shield, title: 'Advanced Technology', desc: 'Enterprise DJI platforms with thermal and multi-spectral sensors.' },
  { icon: Zap, title: 'Unmatched Expertise', desc: 'Certified pilots with deep renewable energy sector experience.' },
  { icon: FileText, title: 'Actionable Reports', desc: 'Comprehensive inspection reports with prioritized recommendations.' },
];

export default function RenewableEnergy() {
  return (
    <div>
      <ServicePageHero
        title="Renewable Energy Inspections"
        subtitle="Maximize efficiency, minimize downtime, and ensure safety. Unlock the power of your renewable energy assets."
        image={SOLAR_IMG}
        ctaText="Get a Free Consultation Now"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceSection
          title="Solar Panel Inspections"
          description="Our thermal imaging drone inspections detect hot spots, cell damage, vegetation encroachment, and panel misalignment with up to 50% reduction in cost and inspection time. Each inspection delivers comprehensive reports with actionable insights."
          features={[
            'Thermal hot spot detection and classification',
            'Cell-level damage identification',
            'Vegetation encroachment monitoring',
            'Panel alignment and soiling analysis',
            'Up to 50% reduction in inspection cost and time',
          ]}
          image={SOLAR_IMG}
        />
        <ServiceSection
          title="Wind Turbine Inspections"
          description="Advanced drone technology for comprehensive wind turbine inspections, detecting blade damage, structural issues, and lightning strike impacts. In collaboration with Sulzer Schmid Laboratories AG using 3DX technology for proactive maintenance."
          features={[
            'Blade surface defect detection',
            'Lightning strike damage assessment',
            'Structural integrity analysis',
            '3DX technology in collaboration with Sulzer Schmid',
            'Proactive maintenance recommendations',
          ]}
          image={WIND_IMG}
          reversed
        />
      </div>

      {/* Trust Section */}
      <section className="py-20 bg-secondary/30 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-barlow font-bold text-3xl text-center text-foreground mb-12">
            Advanced Technology, Unmatched Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustPoints.map((tp, i) => {
              const Icon = tp.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center p-8 rounded-lg border border-border/50 bg-card/30"
                >
                  <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-barlow font-semibold text-foreground mb-2">{tp.title}</h3>
                  <p className="text-sm text-muted-foreground">{tp.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner title="Get a Free Consultation Now" subtitle="Discover how drone inspections can optimize your renewable energy assets." />
    </div>
  );
}