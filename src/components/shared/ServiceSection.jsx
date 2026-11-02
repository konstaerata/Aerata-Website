// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { CountUp, EASE_OUT, EASE_IN_OUT } from '../motion';

const VIEWPORT = { once: true, margin: '0px 0px -6% 0px' };

/** Feeds the pointer position to `.spotlight` cards (see index.css). */
export function trackSpot(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
}

/** Card classes for icon+text points: spotlight glow, lit border, gentle lift. */
export const POINT_CARD =
  'spotlight spotlight--navy rounded-xl border border-border/60 bg-card transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_40px_-18px_hsl(210_35%_12%/0.3)]';

/**
 * Dark stats band under a service hero. Numeric values count up; text
 * values ("IEC", ".LAS", "GPS") stay as written. Dividers draw in.
 */
export function ServiceStats({ stats }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative border-b border-white/5 bg-obsidian overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 hud-grid opacity-70" />
      <motion.span
        aria-hidden="true"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.78, ease: EASE_IN_OUT }}
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lime/50 to-transparent origin-left"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.52, delay: i * 0.05, ease: EASE_OUT }}
              className={`relative px-6 py-10 ${i % 2 ? '' : ''}`}
            >
              {i > 0 && (
                <motion.span
                  aria-hidden="true"
                  initial={reduce ? false : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.59, delay: 0.12 + i * 0.05, ease: EASE_OUT }}
                  className={`absolute left-0 top-6 bottom-6 w-px bg-white/10 origin-top ${i === 2 ? 'hidden lg:block' : ''}`}
                />
              )}
              <p className="font-display font-bold text-3xl lg:text-4xl text-lime mb-2 tracking-tight">
                <CountUp value={s.value} />
              </p>
              <p className="text-sm font-semibold text-white/90 mb-1">{s.label}</p>
              <p className="text-xs text-steelBlue/70 leading-snug">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Numbered workflow. The connector line draws downward as the list enters
 * view and each marker lights up lime in turn.
 */
export function ProcessSteps({ steps }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      <div className="absolute left-[19px] top-6 bottom-6 w-px bg-primary/10 hidden sm:block" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.91, ease: EASE_IN_OUT }}
        className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-lime via-lime/60 to-lime/10 origin-top hidden sm:block"
      />
      <div>
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.49, delay: 0.09 + i * 0.1, ease: EASE_OUT }}
            className="group flex gap-5 pb-9 last:pb-0"
          >
            <div className="relative shrink-0">
              <motion.div
                initial={reduce ? false : { backgroundColor: 'hsl(200 38% 28% / 0.08)', borderColor: 'hsl(200 38% 28% / 0.25)' }}
                whileInView={{ backgroundColor: 'hsl(88 48% 52% / 1)', borderColor: 'hsl(88 48% 52% / 1)' }}
                viewport={VIEWPORT}
                transition={{ duration: 0.33, delay: 0.21 + i * 0.1, ease: EASE_OUT }}
                className="relative z-10 w-10 h-10 rounded-full border flex items-center justify-center shadow-[0_0_0_6px_hsl(var(--background))] transition-transform duration-500 group-hover:scale-110"
              >
                <span className="font-mono font-bold text-xs text-obsidian tabular-nums">{step.n}</span>
              </motion.div>
            </div>
            <div className="pt-1.5">
              <h3 className="font-display font-semibold text-lg text-foreground mb-1.5">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * Framed media block: wipes open from the side it sits on, keeps the HUD
 * corner accents, optional tag chips. Children replace the default image
 * (e.g. a custom media element).
 */
export function FramedMedia({ src, alt, height = 420, from = 'left', tags, children, className = '' }) {
  const reduce = useReducedMotion();
  const hidden = from === 'left' ? 'inset(-12px 100% -12px -12px)' : 'inset(-12px -12px -12px 100%)';
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { clipPath: hidden }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(-12px -12px -12px -12px)' }}
      viewport={VIEWPORT}
      transition={{ duration: 0.75, ease: EASE_IN_OUT }}
      className={`relative group ${className}`}
    >
      <div className="vel-skew overflow-hidden rounded-xl border border-border/50 shadow-[0_24px_50px_-24px_hsl(210_35%_12%/0.35)]">
        {children || (
          <motion.div
            initial={reduce ? false : { scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <OptimizedImage
              src={src}
              alt={alt}
              width={800}
              height={height}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full"
              style={{ height }}
              imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          </motion.div>
        )}
      </div>
      {tags && (
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 pointer-events-none">
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.39, delay: 0.48 + i * 0.05, ease: EASE_OUT }}
              className="px-2.5 py-1 text-[10px] font-display font-semibold border border-white/30 text-white rounded bg-[#1B2025]/75 tracking-widest backdrop-blur-sm"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      )}
      <div className="absolute -top-2 -left-2 w-6 h-6 border-l border-t border-lime/50" aria-hidden="true" />
      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r border-b border-lime/50" aria-hidden="true" />
    </motion.div>
  );
}

export default function ServiceSection({ title, description, features, image, reversed = false }) {
  const reduce = useReducedMotion();
  const fromSide = reversed ? 'left' : 'right';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">
      <div className={reversed ? 'lg:order-2' : ''}>
        <motion.h3
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.52, ease: EASE_OUT }}
          className="font-display font-bold text-2xl md:text-4xl text-foreground leading-tight tracking-tight mb-5 [text-wrap:balance]"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.52, delay: 0.06, ease: EASE_OUT }}
          className="text-muted-foreground text-[17px] leading-relaxed mb-7 max-w-xl"
        >
          {description}
        </motion.p>
        {features && (
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
            className="space-y-3"
          >
            {features.map((feat, i) => (
              <motion.li
                key={i}
                variants={reduce
                  ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
                  : { hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.39, ease: EASE_OUT } } }}
                className="group/feat flex items-start gap-3"
              >
                <span className="relative mt-[7px] w-2 h-2 shrink-0" aria-hidden="true">
                  <span className="absolute inset-0 rotate-45 border border-lime/70 transition-colors duration-300 group-hover/feat:bg-lime" />
                </span>
                <span className="text-muted-foreground text-sm leading-relaxed transition-colors duration-300 group-hover/feat:text-foreground">{feat}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
      <div className={reversed ? 'lg:order-1' : ''}>
        {(
          <FramedMedia from={fromSide} height={320}>
            <motion.div
              initial={reduce ? false : { scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="relative"
            >
              <OptimizedImage
                src={image}
                alt={title}
                width={800}
                height={320}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-80"
                imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              {/* Hover scan overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                <div className="absolute top-3 left-3 text-[9px] font-mono text-white/80">RESOLUTION: 8K | SENSOR: LI1</div>
                <div className="absolute bottom-3 right-3 text-[9px] font-mono text-white/80">ACCURACY: &lt;2CM</div>
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(hsl(88 48% 52% / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(88 48% 52% / 0.08) 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }} />
              </div>
            </motion.div>
          </FramedMedia>
        )}
      </div>
    </div>
  );
}
