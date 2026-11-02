// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { useElementProgress, LEAVING_TOP } from '../../lib/scroll';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/components/LocalizedLink';
import OptimizedImage from './OptimizedImage';
import { HERO_VT_NAME } from '../../lib/viewTransition';
import { MaskLines, Scramble, Magnetic, EASE_OUT } from '../motion';
import { HERO_VIDEO_PAUSE_BELOW } from '../../hooks/useOffscreenPause';
import AutoVideo from './AutoVideo';
import { SlotPlaceholder } from './MediaSlot';

// Pass `video` prop with a direct .mp4 URL for video background. With neither
// `image` nor `video`, `placeholder` ({ id, desc }) marks the photo still needed.
export default function ServicePageHero({ title, subtitle, image, video, poster, placeholder, eyebrow = 'AERATA SERVICES', ctaText = "Get a Free Consultation", ctaLink = "/contact" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const scrollYProgress = useElementProgress(ref, LEAVING_TOP);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14]);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      data-vt-hero
      style={{ viewTransitionName: HERO_VT_NAME }}
      className="relative min-h-[78vh] flex items-center overflow-hidden bg-obsidian grain"
    >
      {!reduce && !window.__vtNav && <div className="scanline z-20" aria-hidden="true" />}
      {/* Video heroes only slide: scaling a playing video every frame knocked
          it off the GPU's fast video path and dropped ~30% of frames. */}
      <motion.div
        className={`absolute inset-0 will-change-transform ${video ? 'scale-[1.08]' : ''}`}
        style={reduce ? undefined : video ? { y: mediaY } : { y: mediaY, scale: mediaScale }}
      >
        {video ? (
          <AutoVideo src={video} poster={poster} pauseBelow={HERO_VIDEO_PAUSE_BELOW} aria-hidden="true" className="w-full h-full object-cover" />
        ) : image ? (
          <OptimizedImage src={image} alt={title} width={1920} height={1080} priority fill sizes="100vw" />
        ) : null}
      </motion.div>
      {!video && !image && placeholder && (
        <div className="absolute right-6 md:right-16 bottom-16 z-10 w-72 h-48 hidden md:block">
          <SlotPlaceholder id={placeholder.id} desc={placeholder.desc} dark />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-obsidian/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-obsidian/30" />
      <div aria-hidden="true" className="absolute inset-0 hud-grid opacity-70" />

      <motion.div
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
        className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-28"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.26 }}
            className="flex items-center gap-3 mb-7"
          >
            <motion.span
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="block w-12 h-px bg-lime origin-left"
            />
            <Scramble text={eyebrow} className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-lime" />
          </motion.div>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight mb-7 [text-wrap:balance]">
            <MaskLines lines={[title]} delay={0.15} />
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.27, ease: EASE_OUT }}
            className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.36, ease: EASE_OUT }}
          >
            <Magnetic>
              <Link
                to={ctaLink}
                className="group inline-flex items-center gap-3 px-8 py-4 font-display font-semibold text-sm tracking-wide bg-lime text-obsidian hover:bg-lime/90 btn-shine transition-colors duration-300 rounded"
              >
                {ctaText}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* HUD corner brackets draw in */}
      {[
        'top-24 left-6 md:left-10 border-l border-t',
        'top-24 right-6 md:right-10 border-r border-t',
        'bottom-8 left-6 md:left-10 border-l border-b',
        'bottom-8 right-6 md:right-10 border-r border-b',
      ].map((pos, i) => (
        <motion.span
          key={pos}
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.39, delay: 0.42 + i * 0.04, ease: EASE_OUT }}
          className={`absolute w-8 h-8 border-lime/40 hidden md:block ${pos}`}
        />
      ))}
    </section>
  );
}
