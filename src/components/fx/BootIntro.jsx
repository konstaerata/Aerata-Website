// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MEDIA, mediaUrl } from '../../lib/media';

const SEEN_KEY = 'aerata_boot_seen';
const READOUT = ['GNSS LOCK', 'IMU CALIBRATED', 'PAYLOAD ONLINE', 'LINK 100%'];
const HOLD_MS = 760; // overlay holds this long, then wipes away (~300 ms)
const EASE = [0.16, 1, 0.3, 1];

/**
 * First-visit HUD boot sequence (once per browser session). The page renders
 * normally underneath; the overlay is decorative (aria-hidden), skippable by
 * any click or key, and skipped entirely under prefers-reduced-motion.
 * Remove by deleting <BootIntro /> from SiteLayout.
 */
export default function BootIntro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem(SEEN_KEY); } catch { return false; }
  });

  useEffect(() => {
    if (!show) return;
    if (reduce) { setShow(false); return; }
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* private mode */ }
    const hide = () => setShow(false);
    const timer = setTimeout(hide, HOLD_MS);
    window.addEventListener('pointerdown', hide, { once: true });
    window.addEventListener('keydown', hide, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', hide);
      window.removeEventListener('keydown', hide);
    };
  }, [show, reduce]);

  return (
    <AnimatePresence>
      {show && !reduce && (
        <motion.div
          key="boot"
          aria-hidden="true"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.32, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[200] bg-obsidian flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 hud-grid" />

          {/* Scan line sweeps the screen once */}
          <motion.span
            initial={{ y: '-10vh' }}
            animate={{ y: '110vh' }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-x-0 top-0 h-px bg-lime shadow-[0_0_24px_4px_hsl(88_48%_52%/0.45)]"
          />

          <div className="relative flex flex-col items-center gap-6">
            {/* Logo assembles: brackets close in, logo sharpens */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {['top-0 left-0 border-l border-t', 'top-0 right-0 border-r border-t', 'bottom-0 left-0 border-l border-b', 'bottom-0 right-0 border-r border-b'].map((pos, i) => (
                <motion.span
                  key={pos}
                  initial={{ opacity: 0, scale: 1.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.04 * i, ease: EASE }}
                  className={`absolute w-5 h-5 border-lime ${pos}`}
                />
              ))}
              <motion.img
                src={mediaUrl(MEDIA.navbar_logo, { width: 240 })}
                alt=""
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
                className="w-16 h-auto"
              />
            </div>

            <div className="flex flex-col items-start gap-1 font-mono text-[10px] tracking-[0.25em] text-white/70">
              {READOUT.map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.18 + i * 0.09 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-lime" />
                  {line}
                  <span className="text-lime">OK</span>
                </motion.span>
              ))}
            </div>

            <div className="w-40 h-px bg-white/10 overflow-hidden">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
                className="block h-full bg-lime origin-left"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
