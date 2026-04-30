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
        image={MEDIA.oilRig}
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
          image={MEDIA.oilRig}
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
          image={MEDIA.infrastructure}
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

      {/* Recent Field Reports */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-barlow font-semibold tracking-[0.25em] uppercase text-primary">Mission Logs</span>
          </div>
          <h2 className="font-barlow font-bold text-3xl text-foreground mb-8">Recent Field Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                tag: 'Pipeline Corridor',
                title: 'Offshore Pipeline Integrity Scan — North Sea',
                date: 'March 2025',
                excerpt: 'A 42 km subsea pipeline corridor inspected in under 3 days using DJI Matrice 300RTK with H20T payload. Identified 7 anomalous sections requiring remediation, reducing manual dive operations by 80%.',
                img: MEDIA.oilGas,
              },
              {
                tag: 'Refinery Asset',
                title: 'Flare Stack & Storage Tank Visual Survey — Rotterdam',
                date: 'January 2025',
                excerpt: 'Full perimeter inspection of 14 storage tanks and 2 flare stacks completed in a single day. Thermal imaging revealed insulation degradation on 3 tanks ahead of a planned maintenance window.',
                img: MEDIA.powerTower,
              },
            ].map((report, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-lg border border-border/50 bg-card/30 overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={report.img} alt={report.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-1 text-[10px] font-mono font-semibold border border-primary/40 bg-primary/20 text-white rounded tracking-widest uppercase">
                    {report.tag}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-mono text-muted-foreground mb-2">{report.date}</p>
                  <h3 className="font-barlow font-semibold text-foreground mb-3 leading-snug">{report.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{report.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="Modernize Your Inspections" subtitle="Learn how drones can reduce costs and improve safety for your oil & gas operations." />
    </div>
  );
}