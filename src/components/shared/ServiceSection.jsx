// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

export default function ServiceSection({ title, description, features, image, reversed = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 ${reversed ? 'lg:flex-row-reverse' : ''}`}
    >
      <div className={reversed ? 'lg:order-2' : ''}>
        <h3 className="font-barlow font-bold text-2xl md:text-3xl text-foreground mb-4">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
        {features && (
          <ul className="space-y-3">
            {features.map((feat, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                <span className="text-muted-foreground text-sm leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={`relative group ${reversed ? 'lg:order-1' : ''}`}>
        <div className="overflow-hidden rounded-lg border border-border/50">
          <img src={image} alt={title} loading="lazy" className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105" />
          {/* Hover scan overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
            <div className="absolute top-3 left-3 text-[9px] font-mono text-primary/70">RESOLUTION: 8K | SENSOR: LI1</div>
            <div className="absolute bottom-3 right-3 text-[9px] font-mono text-primary/70">ACCURACY: &lt;2CM</div>
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(hsl(184 100% 50% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(184 100% 50% / 0.06) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} />
          </div>
        </div>
        {/* Corner accents */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-l border-t border-primary/30" aria-hidden="true" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r border-b border-primary/30" aria-hidden="true" />
      </div>
    </motion.div>
  );
}