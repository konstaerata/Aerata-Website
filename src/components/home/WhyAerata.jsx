// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Brain, Lock, Globe } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const reasons = [
  { icon: Shield, title: 'Certified Pilots & Engineers', desc: 'Fully licensed and experienced team with aviation authority certifications.' },
  { icon: Cpu, title: 'Advanced DJI Technology', desc: 'Enterprise-grade DJI platforms with thermal, LiDAR, and multi-spectral sensors.' },
  { icon: Brain, title: 'AI-Powered Analytics', desc: 'Machine learning algorithms for anomaly detection and predictive maintenance.' },
  { icon: Lock, title: 'GDPR-Compliant Data Handling', desc: 'End-to-end data security aligned with European privacy regulations.' },
  { icon: Globe, title: 'Offices in Netherlands & Greece', desc: 'Strategic presence serving European and Mediterranean markets.' },
];

export default function WhyAerata() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          label="Why Aerata" 
          title="Why Choose Aerata?" 
          description="We combine expertise, technology, and reliability to deliver exceptional aerial assessment solutions across Europe."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-lg border border-border bg-white hover:border-primary/40 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-barlow font-semibold text-foreground text-sm mb-2">{r.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}