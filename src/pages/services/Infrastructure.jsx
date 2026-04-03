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
                tag: 'Power Grid',
                title: 'HV Transmission Line Corridor — 210 km Survey, Netherlands',
                date: 'February 2025',
                excerpt: '210 km of 380 kV transmission line inspected using LiDAR and thermal payload. Vegetation encroachment flagged at 23 spans; clearance data integrated directly into the TSO\'s GIS platform.',
                img: '/media/powertransmissiontower.jpg',
              },
              {
                tag: 'Telecom',
                title: 'Tower Structural Audit — 38 Masts, Attica Region',
                date: 'December 2024',
                excerpt: 'Structural integrity survey of 38 telecom masts completed in 4 days. High-res photogrammetric models delivered to the client for remote review, eliminating the need for any rope-access climbers.',
                img: '/media/powertower.jpg',
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

      <CTABanner title="Get in Touch to Learn More" subtitle="Discover how drone inspections can transform your infrastructure operations." />
    </div>
  );
}