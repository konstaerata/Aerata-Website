import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../../lib/LanguageContext';

export default function HeroSection({ heroImage, heroVideo }) {
  const videoRef = useRef(null);
  const { t } = useLang();
  const prefersReducedMotion = useReducedMotion();
  const [hudVisible, setHudVisible] = useState(false);

  // Explicitly trigger play — autoPlay attribute alone is unreliable
  // when React commits it after the browser's initial autoplay window.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }
    const tryPlay = () => {
      video.play().catch(() => {
        // Blocked by browser policy — leave paused; overlay still looks fine
      });
    };
    // If data is already buffered, play immediately; otherwise wait for canplay
    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('canplay', tryPlay, { once: true });
      return () => video.removeEventListener('canplay', tryPlay);
    }
  }, [prefersReducedMotion]);

  // HUD brackets draw in after scanline completes
  useEffect(() => {
    if (prefersReducedMotion) { setHudVisible(true); return; }
    const timer = setTimeout(() => setHudVisible(true), 1000);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Scanline sweep — aria-hidden, CSS-only */}
      {!prefersReducedMotion && <div className="scanline z-10" aria-hidden="true" />}

      {/* Background — video or image */}
      <div className="absolute inset-0">
        {heroVideo ? (
          <video
            ref={videoRef}
            src={heroVideo}
            autoPlay={!prefersReducedMotion}
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        ) : (
          <img src={heroImage} alt="" role="presentation" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />
      </div>

      {/* HUD corner brackets — draw in after scanline */}
      <div
        aria-hidden="true"
        className={`absolute top-24 left-6 md:left-12 w-12 h-12 border-l-2 border-t-2 border-lime/30 transition-opacity duration-500 ${hudVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        aria-hidden="true"
        className={`absolute top-24 right-6 md:right-12 w-12 h-12 border-r-2 border-t-2 border-lime/30 transition-opacity duration-500 ${hudVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        aria-hidden="true"
        className={`absolute bottom-12 left-6 md:left-12 w-12 h-12 border-l-2 border-b-2 border-lime/30 transition-opacity duration-500 ${hudVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        aria-hidden="true"
        className={`absolute bottom-12 right-6 md:right-12 w-12 h-12 border-r-2 border-b-2 border-lime/30 transition-opacity duration-500 ${hudVisible ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Coordinate markers — decorative only */}
      <div aria-hidden="true" className="absolute top-28 right-10 md:right-16 text-[10px] font-mono text-white/40 hidden md:block">
        52.0116° N, 4.3571° E
      </div>
      <div aria-hidden="true" className="absolute bottom-16 left-10 md:left-16 text-[10px] font-mono text-white/40 hidden md:block">
        ALT: 120M | SPD: 12M/S
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0, 0, 1] }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-16 h-px bg-lime" />
            <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-lime">
              {t('hero.badge')}
            </span>
          </motion.div>

          <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6 tracking-tight">
            {t('hero.title1')}<br />
            <span className="text-lime drop-shadow-[0_0_24px_hsl(88_48%_52%/0.5)]">{t('hero.titleHighlight')}</span><br />
            {t('hero.title2')}
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mb-10 font-body font-light tracking-wide">
            {t('hero.subtitle')}
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact?source=hero-primary"
              className="inline-flex items-center justify-center px-8 py-4 font-display font-semibold text-sm tracking-wider uppercase bg-lime text-white hover:bg-lime/90 transition-all duration-300 rounded glow-pulse"
            >
              {t('hero.cta')}
            </Link>
            <Link
              to="/about#projects"
              className="inline-flex items-center justify-center px-8 py-4 font-display font-semibold text-sm tracking-wider uppercase border border-white/30 text-white/90 hover:border-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 rounded"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-white/40 tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}