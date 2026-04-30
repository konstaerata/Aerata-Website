// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import SectionHeading from '../components/shared/SectionHeading';
import CTABanner from '../components/shared/CTABanner';
import { MEDIA } from '../lib/media';

const caseStudies = [
  {
    industry: 'Renewable Energy',
    title: 'Solar Farm Thermographic Inspection — Netherlands',
    desc: 'Deployed thermal drone surveys across a 45-hectare solar park in Zuid-Holland to identify underperforming panels and hotspots. Delivered a full defect report within 48 hours.',
    metrics: ['45 ha surveyed in 1 day', '320+ defects identified', '€180k estimated savings'],
    image: MEDIA.lidar,
    tag: 'Energy',
  },
  {
    industry: 'Critical Infrastructure',
    title: 'High-Voltage Powerline Corridor Inspection — Greece',
    desc: 'Inspected 120 km of 150kV transmission lines in mountainous terrain using LiDAR and RGB sensors. Reduced inspection time by 60% versus traditional rope-access methods.',
    metrics: ['120 km inspected', '60% faster than manual', 'Zero safety incidents'],
    image: MEDIA.infrastructure,
    tag: 'Infrastructure',
  },
  {
    industry: 'Aerial Surveying',
    title: 'Archaeological Site Documentation — Peloponnese',
    desc: 'Generated centimeter-accurate orthomosaics and 3D models of a 12-hectare archaeological dig site, providing researchers with GIS-ready data for excavation planning.',
    metrics: ['12 ha, <1 cm GSD', 'Full 3D point cloud', 'GIS & CAD deliverables'],
    image: MEDIA.agriculture,
    tag: 'Surveying',
  },
  {
    industry: 'Construction Monitoring',
    title: 'Real-Time Progress Tracking — Residential Development',
    desc: 'Weekly drone surveys of a large residential construction project near Delft provided automated volume calculations and as-built vs. design comparisons throughout the 18-month build.',
    metrics: ['18 months of weekly data', 'Automated volume reports', '30% reduction in rework'],
    image: MEDIA.construction,
    tag: 'Construction',
  },
  {
    industry: 'Environmental',
    title: 'Wetland Habitat Mapping — Delta Region',
    desc: 'Multi-spectral and RGB drone surveys mapped vegetation density, water quality indicators, and biodiversity zones across a 200-hectare protected wetland reserve.',
    metrics: ['200 ha mapped', 'Multi-spectral NDVI', 'Biodiversity report delivered'],
    image: MEDIA.lidar,
    tag: 'Environmental',
  },
  {
    industry: 'Oil & Gas',
    title: 'Offshore Platform Visual Inspection — North Sea',
    desc: 'Conducted close-visual inspection of structural components on an offshore platform, replacing the need for scaffolding and rope access with a safer, faster drone-based workflow.',
    metrics: ['4x faster than rope access', 'Full corrosion mapping', 'Zero platform downtime'],
    image: MEDIA.infrastructure,
    tag: 'Oil & Gas',
  },
];

const team = [
  { name: 'Konstantinos Konstantinopoulos', role: 'Co-Founder', linkedin: '#' },
  { name: 'Michalis Michalas', role: 'Co-Founder', linkedin: '#' },
  { name: 'Spyridon Konstantinopoulos', role: 'Director of Operations', linkedin: '#' },
  { name: 'Evie Varthi', role: 'Team Member', linkedin: '#' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={MEDIA.infrastructure} alt="About Aerata" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-obsidian/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-obsidian/30" />
        </div>
        {/* HUD corners */}
        <div className="absolute top-24 left-6 md:left-12 w-10 h-10 border-l-2 border-t-2 border-lime/30" />
        <div className="absolute bottom-8 right-6 md:right-12 w-10 h-10 border-r-2 border-b-2 border-lime/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-px bg-lime" />
              <span className="text-xs font-oxanium font-semibold tracking-[0.25em] uppercase text-lime">About Aerata</span>
            </div>
            <h1 className="font-oxanium font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight max-w-3xl mb-8">
              Passionate Experts.<br />
              <span className="text-lime">Next-Level</span> Drone Solutions.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
              We are a team of passionate and experienced drone specialists dedicated to delivering next-level 
              drone solutions. Through innovation and collaboration, we leverage the power of aerial technology 
              to provide unmatched accuracy, efficiency, and safety across various industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Case Studies" title="Our Work" description="Real-world projects where aerial intelligence delivered measurable results." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col rounded-lg border border-border/50 bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={cs.image} alt={cs.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-oxanium font-semibold tracking-wider uppercase bg-lime text-white rounded">
                      {cs.tag}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 text-[9px] font-mono text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    AERATA // PROJECT
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <p className="text-[10px] font-oxanium font-semibold tracking-[0.2em] uppercase text-lime mb-1">{cs.industry}</p>
                  <h3 className="font-oxanium font-bold text-foreground text-base leading-snug mb-3">{cs.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{cs.desc}</p>
                  {/* Metrics */}
                  <div className="border-t border-border pt-4 grid grid-cols-1 gap-1.5">
                    {cs.metrics.map((m, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-lime shrink-0" />
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading label="Team" title="Meet the Team" description="Aviation specialists, engineers, and data scientists driving aerial innovation." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-lg border border-border/50 bg-card/50 hover:border-primary/30 transition-all text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary border border-border flex items-center justify-center">
                  <span className="font-barlow font-bold text-2xl text-primary/60">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-barlow font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                  className="inline-flex text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="Ready to Elevate Your Operations?" subtitle="Schedule a consultation with our drone specialists today." />
    </div>
  );
}