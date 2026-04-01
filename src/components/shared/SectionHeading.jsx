// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, description, align = 'center', light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {label && (
        <span className="inline-block text-xs font-rajdhani font-semibold tracking-[0.25em] uppercase text-lime mb-3">
          [{label}]
        </span>
      )}
      <h2 className="font-rajdhani font-bold leading-tight text-primary text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl leading-relaxed" style={align === 'center' ? { margin: '1rem auto 0' } : {}}>
          {description}
        </p>
      )}
    </motion.div>
  );
}