// @ts-nocheck
import React, { useRef, useState } from 'react';
import { Link } from '@/components/LocalizedLink';
import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { useElementProgress, LEAVING_TOP } from '../../lib/scroll';
import { ArrowRight } from 'lucide-react';
import { useOffscreenPause, HERO_VIDEO_PAUSE_BELOW } from '../../hooks/useOffscreenPause';
import { useLang } from '../../lib/LanguageContext';
import { MEDIA, mediaUrl } from '../../lib/media';
import OptimizedImage from '../shared/OptimizedImage';
import { MaskLines, Scramble, Magnetic, EASE_OUT } from '../motion';

export default function HeroSection({ heroImage, heroVideo }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const { t } = useLang();
  const reduce = useReducedMotion();
  // Phones get the 720p rendition; decided once on mount.
  const [src] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
      ? MEDIA.home_hero_video_mobile
      : heroVideo
  );
  const [videoReady, setVideoReady] = useState(false);

  const scrollYProgress = useElementProgress(sectionRef, LEAVING_TOP);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-28%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const hudOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Explicitly trigger play — autoPlay attribute alone is unreliable
  // when React commits it after the browser's initial autoplay window.
  // Plays only while the hero is on screen — a video decoding behind the
  // rest of the page was the main cause of dropped frames while scrolling.
  // …and freezes as soon as the visitor scrolls, so it slides away as a still frame.
  useOffscreenPause(videoRef, !reduce, { pauseBelow: HERO_VIDEO_PAUSE_BELOW });

  const brackets = [
    'top-24 left-6 md:left-12 border-l-2 border-t-2',
    'top-24 right-6 md:right-12 border-r-2 border-t-2',
    'bottom-12 left-6 md:left-12 border-l-2 border-b-2',
    'bottom-12 right-6 md:right-12 border-r-2 border-b-2',
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-obsidian grain">
      {!reduce && <div className="scanline z-10" aria-hidden="true" />}

      {/* Background — poster paints first, compressed video fades in over it */}
      <motion.div className="absolute inset-0 scale-[1.06] will-change-transform" style={reduce ? undefined : { y: mediaY }}>
        {heroVideo ? (
          <>
            <img src={mediaUrl(MEDIA.home_hero_poster, { width: 1600 })} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" {...{ fetchpriority: 'high' }} />
            <video
              ref={videoRef}
              src={reduce ? undefined : src}
              poster={mediaUrl(MEDIA.home_hero_poster, { width: 1600 })}
              autoPlay={!reduce}
              muted
              loop
              playsInline
              preload="metadata"
              onPlaying={() => setVideoReady(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden="true"
            />
          </>
        ) : (
          <OptimizedImage src={heroImage} alt="" role="presentation" width={1920} height={1080} priority fill sizes="100vw" />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />
      <div aria-hidden="true" className="absolute inset-0 hud-grid opacity-60" />

      {/* HUD brackets draw in after the scanline */}
      {brackets.map((pos, i) => (
        <motion.span
          key={pos}
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.6 + i * 0.04, ease: EASE_OUT }}
          className={`absolute w-12 h-12 border-lime/35 ${pos}`}
        />
      ))}

      {/* Coordinate markers — decorative only */}
      <motion.div aria-hidden="true" style={reduce ? undefined : { opacity: hudOpacity }} className="absolute inset-0 pointer-events-none hidden md:block">
        <motion.span
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.39, delay: 0.78 }}
          className="absolute top-28 right-10 md:right-16 text-[10px] font-mono text-white/45 tabular-nums tracking-[0.15em]"
        >
          <Scramble text="52.0116° N, 4.3571° E" delay={1.3} duration={900} />
        </motion.span>
        <motion.span
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.39, delay: 0.87 }}
          className="absolute bottom-16 left-10 md:left-16 flex items-center gap-2 text-[10px] font-mono text-white/45 tabular-nums tracking-[0.15em]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-lime" />
          <Scramble text="ALT: 120M | SPD: 12M/S" delay={1.45} duration={900} />
        </motion.span>
      </motion.div>

      {/* Content */}
      <motion.div
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
        className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-32"
      >
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <motion.span
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.52, delay: 0.12, ease: EASE_OUT }}
              className="block w-16 h-px bg-lime origin-left"
            />
            <Scramble text={t('hero.badge')} delay={0.3} className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-lime" />
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] text-white leading-[1.0] mb-8 tracking-[-0.02em]">
            <MaskLines
              delay={0.35}
              stagger={0.12}
              lines={[
                t('hero.title1'),
                <span key="hl" className="text-lime">{t('hero.titleHighlight')}</span>,
                t('hero.title2'),
              ]}
            />
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.59, delay: 0.48, ease: EASE_OUT }}
            className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mb-11 font-body font-light tracking-wide"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Dual CTA */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.59, delay: 0.57, ease: EASE_OUT }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Magnetic>
              <Link
                to="/contact?source=hero-primary"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 py-4 font-display font-semibold text-sm tracking-wider uppercase bg-lime text-obsidian hover:bg-lime/90 btn-shine transition-colors duration-300 rounded shadow-[0_10px_40px_-10px_hsl(88_48%_52%/0.6)]"
              >
                {t('hero.cta')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.18}>
              <Link
                to="/#sectors"
                className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 font-display font-semibold text-sm tracking-wider uppercase border border-white/30 text-white/90 hover:border-lime/60 hover:text-white hover:bg-white/5 transition-colors duration-300 rounded"
              >
                {t('hero.ctaSecondary')}
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue: a lit segment travels down a hairline */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.96, duration: 0.39 }}
        style={reduce ? undefined : { opacity: hudOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-mono text-white/45 tracking-[0.3em]">SCROLL</span>
        <span className="relative block h-12 w-px bg-white/15 overflow-hidden">
          {!reduce && <span className="absolute inset-x-0 top-0 h-1/2 bg-lime animate-[scrollcue_1.8s_cubic-bezier(0.65,0,0.35,1)_4]" />}
        </span>
      </motion.div>
    </section>
  );
}
