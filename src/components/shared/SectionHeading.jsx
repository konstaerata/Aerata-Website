// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MaskLines, Scramble, EASE_OUT } from '../motion';

const VIEWPORT = { once: true, margin: '0px 0px -6% 0px' };

export default function SectionHeading({ label, title, description, align = 'center', light = false, as = 'h2', spacing = 'mb-14' }) {
  const reduce = useReducedMotion();
  const HeadingTag = as;

  return (
    <div className={`${spacing} ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {label && (
        <div className={`flex items-center gap-3 mb-5 ${align === 'center' ? 'justify-center' : ''}`}>
          {/* Line draws in left-to-right */}
          <motion.span
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            style={{ transformOrigin: 'left' }}
            className={`block w-8 h-px shrink-0 ${light ? 'bg-lime' : 'bg-[hsl(88_55%_34%)]'}`}
          />
          <Scramble
            text={label}
            delay={0.1}
            className={`text-[11px] font-display font-semibold tracking-[0.3em] uppercase ${light ? 'text-lime' : 'text-[hsl(88_55%_24%)]'}`}
          />
        </div>
      )}

      <HeadingTag
        className={`font-display font-bold leading-[1.05] text-3xl md:text-4xl lg:text-5xl tracking-tight [text-wrap:balance] ${
          light ? 'text-white' : 'text-primary'
        }`}
      >
        <MaskLines lines={[title]} delay={label ? 0.15 : 0.05} onMount={false} />
      </HeadingTag>

      {description && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.52, delay: 0.18, ease: EASE_OUT }}
          className={`mt-5 text-base md:text-lg max-w-2xl leading-relaxed font-light ${
            light ? 'text-steelBlue' : 'text-muted-foreground'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
