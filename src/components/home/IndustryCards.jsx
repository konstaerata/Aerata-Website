// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Radio, Map, Droplets, Leaf, ArrowRight } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const industries = [
  {
    icon: Sun,
    title: 'Renewable Energy',
    description: 'Boost Efficiency & Savings: Drone Inspections for Solar & Wind',
    link: '/services/renewable-energy',
    color: 'from-amber-500/20 to-transparent',
  },
  {
    icon: Radio,
    title: 'Critical Infrastructure',
    description: 'Streamline inspections for powerlines, gas pipelines, telecom towers & more',
    link: '/services/infrastructure',
    color: 'from-blue-500/20 to-transparent',
  },
  {
    icon: Map,
    title: 'Aerial Surveying & Mapping',
    description: 'Precision Aerial Mapping with Centimeter Accuracy',
    link: '/services/surveying',
    color: 'from-cyan-500/20 to-transparent',
  },
  {
    icon: Droplets,
    title: 'Oil & Gas',
    description: 'Efficient Oil & Gas Network Inspections',
    link: '/services/oil-gas',
    color: 'from-orange-500/20 to-transparent',
  },
  {
    icon: Leaf,
    title: 'Environmental Monitoring',
    description: 'Gain precise insights into ecosystems and crop health',
    link: '/services/environmental',
    color: 'from-green-500/20 to-transparent',
  },
];

export default function IndustryCards() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Industries"
          title="Aerial Intelligence Across Industries"
          description="From renewable energy to critical infrastructure, our drone solutions deliver precision where it matters most."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            const isHovered = hoveredIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Link to={ind.link}
                  className={`block relative p-6 rounded-lg border transition-all duration-500 overflow-hidden h-full ${
                    isHovered ? 'border-primary/40 bg-primary/5 scale-[1.02] shadow-md' : 'border-border bg-white hover:border-primary/20'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${ind.color} opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />
                  <div className="relative z-10">
                    <Icon className={`w-8 h-8 mb-4 transition-colors duration-300 ${isHovered ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h3 className="font-oxanium font-semibold text-foreground text-base mb-2 tracking-wide">{ind.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{ind.description}</p>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${isHovered ? 'text-primary' : 'text-muted-foreground'}`}>
                      Learn More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}