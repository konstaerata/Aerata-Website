// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import ServicePageHero from '../../components/shared/ServicePageHero';
import ServiceSection from '../../components/shared/ServiceSection';
import CTABanner from '../../components/shared/CTABanner';
import { MEDIA } from '../../lib/media';

export default function OilGas() {
  return (
    <div>
      <ServicePageHero
        title="Oil & Gas Network Inspections"
        subtitle="The Future of Oil & Gas Network Inspection: Why Choose Drones? Efficient, safe, and comprehensive aerial inspections for the energy sector."
        image={MEDIA.oilgas_hero_image}
        ctaText="Get in Touch"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceSection
          title="Reduced Cost and Downtime"
          description="Our aerial inspections via quick photo capture and off-site evaluation dramatically reduce operational downtime. Full reports with pictures and simulations allow decision-making without extended field visits."
          features={[
            'Rapid aerial data capture in minutes',
            'Off-site evaluation by certified specialists',
            'Full reports with high-res imagery and simulations',
            'Minimal operational disruption during inspections',
          ]}
          image={MEDIA.oilgas_section_cost_image}
        />
        <ServiceSection
          title="Increased Safety"
          description="Eliminate the need for personnel to work at height or in hazardous environments. Our drones safely inspect offshore rigs, power facilities, and pipeline networks, significantly reducing on-site accident risk."
          features={[
            'No personnel required in hazardous zones',
            'Offshore rig and platform inspections',
            'Pipeline corridor monitoring',
            'Confined space and hard-to-reach area access',
          ]}
          image={MEDIA.oilgas_section_safety_image}
          reversed
        />
      </div>

      {/* Technology Callout */}
      <section className="py-20 bg-secondary/30 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <Cpu className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-barlow font-bold text-3xl text-foreground mb-4">
              Enterprise-Grade Technology
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We deploy DJI Matrice 300RTK drones — operable in wind, rain, and cold conditions. 
              Our systems are compatible with digital asset management platforms, ensuring seamless 
              integration with your existing infrastructure monitoring workflows.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-primary/60">
              <span className="px-3 py-1 border border-primary/20 rounded">DJI MATRICE 300RTK</span>
              <span className="px-3 py-1 border border-primary/20 rounded">IP45 WEATHER RATING</span>
              <span className="px-3 py-1 border border-primary/20 rounded">55 MIN FLIGHT TIME</span>
              <span className="px-3 py-1 border border-primary/20 rounded">DAM COMPATIBLE</span>
            </div>
          </motion.div>
        </div>
      </section>


<CTABanner title="Modernize Your Inspections" subtitle="Learn how drones can reduce costs and improve safety for your oil & gas operations." />
    </div>
  );
}