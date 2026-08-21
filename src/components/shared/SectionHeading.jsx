// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function SectionHeading({ label, title, description, align = 'center', light = false, as = 'h2' }) {
  const prefersReducedMotion = useReducedMotion();
  const HeadingTag = motion[as];

  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {label && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`inline-flex items-center gap-2 mb-4 ${align === 'center' ? 'justify-center w-full' : ''}`}
        >
          {/* Line draws in left-to-right */}
          <motion.span
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            className="block w-8 h-px bg-lime shrink-0"
          />
          <motion.span
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.35, delay: 0.15, ease: 'easeOut' }}
            className="text-[11px] font-display font-semibold tracking-[0.3em] uppercase text-lime"
          >
            {label}
          </motion.span>
        </motion.div>
      )}

      <HeadingTag
        initial={prefersReducedMotion ? false : { opacity: 0.3, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: label ? 0.25 : 0.1, ease: [0.25, 0, 0, 1] }}
        className={`font-display font-bold leading-tight text-3xl md:text-4xl lg:text-5xl tracking-tight ${
          light ? 'text-white' : 'text-primary'
        }`}
      >
        {title}
      </HeadingTag>

      {description && (
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: label ? 0.35 : 0.2, ease: 'easeOut' }}
          className={`mt-4 text-base md:text-lg max-w-2xl leading-relaxed font-light ${
            light ? 'text-steelBlue' : 'text-muted-foreground/90'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
