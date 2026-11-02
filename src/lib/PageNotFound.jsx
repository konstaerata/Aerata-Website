// @ts-nocheck
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';
import { Scramble, MaskLines, Magnetic, EASE_OUT } from '../components/motion';

// Rendered outside the language provider for unknown URLs, so the language
// comes from the URL prefix (or aerata.gr) and the text lives here.
const TEXT = {
  en: { title: 'Page not found | Aerata', body: "The coordinates you're looking for don't exist in our airspace.", home: 'Return to Base' },
  nl: { title: 'Pagina niet gevonden | Aerata', body: 'De coördinaten die u zoekt bestaan niet in ons luchtruim.', home: 'Terug naar de homepage' },
  el: { title: 'Η σελίδα δεν βρέθηκε | Aerata', body: 'Οι συντεταγμένες που αναζητάτε δεν υπάρχουν στον εναέριο χώρο μας.', home: 'Επιστροφή στην αρχική' },
};

export default function PageNotFound() {
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const prefix = pathname.match(/^\/(nl|el)(?=\/|$)/)?.[1];
  const lang = prefix || (typeof window !== 'undefined' && /aerata\.gr$/.test(window.location.hostname) ? 'el' : 'en');
  const txt = TEXT[lang];
  return (
    <main id="main" className="relative min-h-screen bg-obsidian flex items-center justify-center overflow-hidden grain">
      <Helmet>
        <html lang={lang} />
        <title>{txt.title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div aria-hidden="true" className="absolute inset-0 hud-grid" />
      {!reduce && <div className="scanline z-10" aria-hidden="true" />}
      {/* Radar sweep */}
      <div aria-hidden="true" className="absolute w-[560px] h-[560px] rounded-full border border-lime/10">
        <div className="absolute inset-[18%] rounded-full border border-lime/10" />
        <div className="absolute inset-[36%] rounded-full border border-lime/10" />
        {!reduce && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'conic-gradient(from 0deg, hsl(88 48% 52% / 0.18), transparent 25%)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3.9, ease: 'linear', repeat: Infinity }}
          />
        )}
      </div>
      <div className="relative text-center px-6">
        <Scramble text="[ERROR // PAGE NOT FOUND]" className="block font-mono text-lime/60 text-sm mb-6" />
        <h1 className="font-display font-bold text-8xl md:text-9xl text-white tracking-tight mb-6">
          <MaskLines lines={['404']} delay={0.1} />
        </h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 0.21, ease: EASE_OUT }}
          className="text-steelBlue text-lg mb-10 max-w-md mx-auto"
        >
          {txt.body}
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 0.3, ease: EASE_OUT }}
        >
          <Magnetic>
            <Link to={prefix ? `/${prefix}` : '/'}
              className="inline-flex items-center px-9 py-4 font-display font-semibold text-sm tracking-wide bg-lime text-obsidian hover:bg-lime/90 btn-shine transition-colors duration-300 rounded"
            >
              {txt.home}
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </main>
  );
}
