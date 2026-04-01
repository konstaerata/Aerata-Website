// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Shield } from 'lucide-react';

const stats = [
  { icon: MapPin, value: '1000+', label: 'Hectares Surveyed' },
  { icon: Clock, value: '50%', label: 'Reduction in Inspection Time' },
  { icon: Shield, value: '100%', label: 'Certified Pilots & Engineers' },
];

export default function StatsBar() {
  return (
    <section className="py-16 border-y border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-center gap-5 justify-center"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="block font-barlow font-bold text-3xl text-foreground">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}