// @ts-nocheck
import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

/**
 * ServiceProjects — horizontal project showcase strip for service pages.
 *
 * Props:
 *   projects  — array from src/lib/projects.js
 *   heading   — section label (default "Project Experience")
 *   title     — section title
 *   total     — total number of projects in this category (for overflow indicator)
 *   linkTo    — About page anchor to link "View all" button (default "/about#projects")
 *   dark      — if true, renders on #1B2025 background (default false = light bg)
 */
export default function ServiceProjects({
  projects = [],
  heading = 'Project Experience',
  title = 'Work Completed in This Sector',
  total,
  linkTo = '/about#projects',
  dark = false,
}) {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const CARD_W = 288; // px — matches min-w on cards

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * CARD_W * 2, behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const overflow = total && total > projects.length ? total - projects.length : 0;

  const tagColors = [
    'bg-lime/15 text-lime border-lime/30',
    'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
    'bg-amber-500/15 text-amber-400 border-amber-500/25',
    'bg-blue-500/15 text-blue-400 border-blue-500/25',
    'bg-purple-500/15 text-purple-400 border-purple-500/25',
    'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  ];

  // Assign consistent colour per tag value
  const tagColorMap = {};
  projects.forEach((p) => {
    if (!tagColorMap[p.tag]) {
      const idx = Object.keys(tagColorMap).length % tagColors.length;
      tagColorMap[p.tag] = tagColors[idx];
    }
  });

  const bg = dark ? 'bg-[#1B2025]' : 'bg-secondary/30';
  const borderY = 'border-y border-border/30';
  const textMain = dark ? 'text-white' : 'text-foreground';
  const textMuted = dark ? 'text-[#9AA8A2]/80' : 'text-muted-foreground';
  const cardBg = dark ? 'bg-white/[0.03] border-[#9AA8A2]/10 hover:border-lime/30 hover:bg-white/[0.06]' : 'bg-card border-border/50 hover:border-primary/40 hover:shadow-md';
  const labelColor = dark ? 'text-lime' : 'text-primary';

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0.3, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`py-20 ${bg} ${borderY}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-px ${dark ? 'bg-lime' : 'bg-primary'}`} />
              <span className={`text-xs font-display font-semibold tracking-[0.25em] uppercase ${labelColor}`}>
                {heading}
              </span>
            </div>
            <h2 className={`font-display font-bold text-2xl md:text-3xl ${textMain}`}>{title}</h2>
          </div>

          {/* Scroll arrows — desktop */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll projects left"
              disabled={!canScrollLeft}
              className={`w-9 h-9 rounded border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? dark
                    ? 'border-[#9AA8A2]/30 text-[#9AA8A2] hover:border-lime hover:text-lime'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                  : 'border-border/30 text-muted-foreground/30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Scroll projects right"
              disabled={!canScrollRight}
              className={`w-9 h-9 rounded border flex items-center justify-center transition-all ${
                canScrollRight
                  ? dark
                    ? 'border-[#9AA8A2]/30 text-[#9AA8A2] hover:border-lime hover:text-lime'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                  : 'border-border/30 text-muted-foreground/30 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={prefersReducedMotion ? false : { opacity: 0.3, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.25), ease: 'easeOut' }}
              className={`flex-none w-72 snap-start rounded-xl border p-5 transition-all duration-300 ${cardBg} ${
                project.featured
                  ? dark
                    ? 'border-lime/25 bg-lime/[0.03]'
                    : 'border-primary/30 bg-primary/[0.02]'
                  : ''
              }`}
            >
              {/* Tag row */}
              <div className="flex items-center justify-between mb-3 gap-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-display font-semibold tracking-wider uppercase shrink-0 ${
                  tagColorMap[project.tag] || tagColors[0]
                }`}>
                  {project.tag}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {project.spec && (
                    <span className={`text-[10px] font-mono ${dark ? 'text-[#9AA8A2]/60' : 'text-muted-foreground/60'}`}>
                      {project.spec}
                    </span>
                  )}
                  {project.year && (
                    <span className={`text-[10px] font-mono ${dark ? 'text-[#9AA8A2]/40' : 'text-muted-foreground/40'}`}>
                      {project.year}
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className={`font-display font-semibold text-sm leading-snug mb-2 ${textMain}`}>
                {project.name}
              </h3>

              {/* Description */}
              <p className={`text-xs leading-relaxed ${textMuted}`}>{project.desc}</p>

              {/* Country */}
              {project.country && (
                <p className={`mt-3 text-[10px] font-mono ${dark ? 'text-[#9AA8A2]/40' : 'text-muted-foreground/40'}`}>
                  {project.country}
                </p>
              )}
            </motion.div>
          ))}

          {/* Overflow card */}
          {overflow > 0 && (
            <div className={`flex-none w-72 snap-start rounded-xl border ${
              dark ? 'border-[#9AA8A2]/10 bg-white/[0.02]' : 'border-border/30 bg-secondary/50'
            } p-5 flex flex-col items-center justify-center text-center`}>
              <p className={`font-display font-bold text-3xl mb-1 ${dark ? 'text-lime' : 'text-primary'}`}>
                +{overflow}
              </p>
              <p className={`text-xs mb-4 ${textMuted}`}>
                additional projects completed in this sector
              </p>
              <Link
                to={linkTo}
                className={`inline-flex items-center gap-1.5 text-xs font-display font-semibold transition-colors ${
                  dark ? 'text-lime hover:text-lime/80' : 'text-primary hover:text-primary/80'
                }`}
              >
                View full portfolio
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>

        {/* Footer link */}
        <div className="mt-6 flex items-center justify-between">
          <p className={`text-xs font-mono ${dark ? 'text-[#9AA8A2]/40' : 'text-muted-foreground/50'}`}>
            {total ? `${total}+ projects completed in this sector` : `${projects.length} projects shown`}
          </p>
          <Link
            to={linkTo}
            className={`inline-flex items-center gap-1.5 text-xs font-display font-semibold transition-colors ${
              dark ? 'text-[#9AA8A2] hover:text-lime' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            View all projects
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
