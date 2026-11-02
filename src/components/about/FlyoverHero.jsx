// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { useElementProgress, LEAVING_TOP } from '../../lib/scroll';
import { MaskLines, Scramble, EASE_OUT } from '../motion';
import { HERO_VIDEO_PAUSE_BELOW } from '../../hooks/useOffscreenPause';
import AutoVideo from '../shared/AutoVideo';

/**
 * About hero: the Sitia flyover playing as a calm background loop, with the
 * shared hero entrance (decoding label, masked headline lines) and a light
 * parallax as the page scrolls away. Reduced motion gets the still poster.
 */
export default function FlyoverHero({ video, poster, badge, title, highlight, description }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const scrollYProgress = useElementProgress(ref, LEAVING_TOP);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center overflow-hidden bg-obsidian grain">
      {!reduce && <div className="scanline z-20" aria-hidden="true" />}
      <motion.div className="absolute inset-0 scale-[1.08] will-change-transform" style={reduce ? undefined : { y: mediaY }} aria-hidden="true">
        <AutoVideo src={video} poster={poster} pauseBelow={HERO_VIDEO_PAUSE_BELOW} className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B2025] via-[#1B2025]/80 to-[#1B2025]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B2025]/70 via-transparent to-[#1B2025]/30" />
      <div aria-hidden="true" className="absolute inset-0 hud-grid opacity-60" />

      {['top-24 left-6 md:left-12 border-l-2 border-t-2', 'bottom-8 right-6 md:right-12 border-r-2 border-b-2'].map((p, i) => (
        <motion.span
          key={p}
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.39, delay: 0.48 + i * 0.05, ease: EASE_OUT }}
          className={`absolute w-10 h-10 border-lime/30 ${p}`}
        />
      ))}

      <motion.div
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
        className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-40"
      >
        <div className="flex items-center gap-3 mb-7">
          <motion.span
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="block w-16 h-px bg-lime origin-left"
          />
          <Scramble text={badge} className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-lime" />
        </div>
        <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight max-w-4xl mb-8">
          <MaskLines lines={[title, <span key="h" className="text-lime">{highlight}</span>]} delay={0.15} />
        </h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 0.3, ease: EASE_OUT }}
          className="text-lg md:text-xl text-[#9AA8A2] leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
      </motion.div>
    </section>
  );
}
