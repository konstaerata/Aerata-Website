// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, CircleDollarSign } from 'lucide-react';
import ServicePageHero from '../../components/shared/ServicePageHero';
import SectionHeading from '../../components/shared/SectionHeading';
import CTABanner from '../../components/shared/CTABanner';

const TELECOM_IMG = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774/460f7d297_generated_f4efa52d.png';
const POWER_IMG = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774/bea0ea3d1_generated_5b243c29.png';
const LIDAR_IMG = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774/c8d2cb737_generated_7a5a50ca.png';

const telecomServices = [
  { title: 'Tower Inspections', desc: 'High-resolution imagery for early identification of structural issues, corrosion, and equipment damage.' },
  { title: 'Line-of-Sight Surveys', desc: 'Optimal new tower placement analysis using accurate terrain and obstruction data.' },
  { title: 'Network Planning & Optimization', desc: '3D modeling and coverage analysis for efficient network expansion and optimization.' },
  { title: 'Emergency Response', desc: 'Rapid damage assessment after natural disasters for quick restoration planning.' },
];

const powerlineServices = [
  { title: 'Visual Inspections', desc: 'Comprehensive damage, corrosion, and vegetation encroachment detection along power corridors.' },
  { title: 'Infrared Inspections', desc: 'Thermal hot spot detection for identifying equipment failure risks before they escalate.' },
  { title: 'LiDAR Surveys', desc: '3D corridor modeling for clearance analysis and vegetation management planning.' },
  { title: 'Vegetation Management', desc: 'Automated vegetation encroachment detection and clearance zone monitoring.' },
];

const whyChoose = [
  { icon: Shield, title: 'Enhanced Safety', desc: 'Eliminate the need for dangerous manual inspections at height.' },
  { icon: Zap, title: 'Increased Efficiency', desc: 'Complete inspections up to 5x faster than traditional methods.' },
  { icon: Target, title: 'Improved Accuracy', desc: 'Centimeter-level precision with advanced sensors and AI.' },
  { icon: CircleDollarSign, title: 'Cost Savings', desc: 'Reduce inspection costs by up to 50% while improving data quality.' },
];

function ServiceGrid({ title, image, services }) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-barlow font-bold text-3xl text-foreground mb-8">{title}</h2>
            <div className="space-y-6">
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 shrink-0 rounded bg-primary/10 border border-primary/20 flex items-center justify-center mt-1">
                    <span className="font-barlow font-bold text-xs text-primary">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 className="font-barlow font-semibold text-foreground mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <img src={image} alt={title} className="w-full h-96 object-cover rounded-lg border border-border/50 transition-transform duration-700 group-hover:scale-[1.02]" />
            <div className="absolute -top-2 -left-2 w-6 h-6 border-l border-t border-primary/30" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r border-b border-primary/30" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Infrastructure() {
  return (
    <div>
      <ServicePageHero
        title="Critical Infrastructure Inspections"
        subtitle="Streamline inspections for powerlines, gas pipelines, telecom towers and more. Safer, faster, more accurate."
        image={POWER_IMG}
        ctaText="Get in Touch"
      />

      <ServiceGrid title="Telecom Tower Inspections" image={TELECOM_IMG} services={telecomServices} />
      <div className="border-t border-border/30" />
      <ServiceGrid title="Power Line Inspections" image={POWER_IMG} services={powerlineServices} />

      {/* Why Choose Aerata */}
      <section className="py-20 bg-secondary/30 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Advantages" title="Why Choose Aerata" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-lg border border-border/50 bg-card/30 text-center"
                >
                  <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-barlow font-semibold text-foreground mb-2">{w.title}</h3>
                  <p className="text-sm text-muted-foreground">{w.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner title="Get in Touch to Learn More" subtitle="Discover how drone inspections can transform your infrastructure operations." />
    </div>
  );
}