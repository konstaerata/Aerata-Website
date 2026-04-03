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
        <span className="inline-block text-[11px] font-oxanium font-semibold tracking-[0.3em] uppercase text-lime mb-3">
          [{label}]
        </span>
      )}
      <h2 className={`font-oxanium font-bold leading-tight text-3xl md:text-4xl lg:text-5xl tracking-tight ${light ? 'text-white' : 'text-primary'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base md:text-lg max-w-2xl leading-relaxed font-light ${light ? 'text-white/70' : 'text-muted-foreground/90'}`} style={align === 'center' ? { margin: '1rem auto 0' } : {}}>
          {description}
        </p>
      )}
    </motion.div>
  );
}