// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  'Sulzer Schmid Laboratories AG',
  'EYDAP',
  'DJI Enterprise',
];

export default function PartnersSection() {
  return (
    <section className="py-16 border-y border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-barlow font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-10">
          Trusted Partners & Collaborators
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {partners.map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-muted-foreground/60 hover:text-primary/80 transition-colors duration-300"
            >
              <span className="font-barlow font-semibold text-lg tracking-wide">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}