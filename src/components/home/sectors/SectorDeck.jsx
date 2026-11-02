// @ts-nocheck
import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from '@/components/LocalizedLink';
import { mediaUrl } from '../../../lib/media';

const pad2 = (n) => String(n).padStart(2, '0');
const NAV_H = 64;
const STACK_STEP = 14;

/**
 * Phones and tablets: the sectors as a stacked deck. Each card is a tall,
 * full-bleed picture that sticks under the navbar while the next one slides
 * up over it, leaving a sliver of every earlier card visible. The stacking is
 * plain position: sticky, so scrolling runs no JavaScript at all.
 *
 * A row of all five sector names above the deck shows every sector at once
 * and jumps to its card.
 */
export default function SectorDeck({ sectors, heading }) {
  const n = sectors.length;
  return (
    <section className="relative bg-obsidian py-20 md:py-24">
      <div aria-hidden="true" className="absolute inset-0 hud-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        {heading}

        {/* Every sector at a glance */}
        <nav aria-label="Sectors" className="-mx-4 sm:mx-0 mb-8 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex sm:flex-wrap gap-2 px-4 sm:px-0 w-max sm:w-auto">
            {sectors.map((s, i) => (
              <li key={s.link}>
                <a
                  href={`#sector-${i + 1}`}
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-white/15 bg-white/[0.04] text-sm font-display font-semibold text-white/85 whitespace-nowrap active:scale-[0.97] transition-[transform,border-color] duration-150 hover:border-lime/60"
                >
                  <span className="font-mono text-[11px] text-lime/80 tabular-nums">{pad2(i + 1)}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ol className="relative">
          {sectors.map((s, i) => (
            <li
              key={s.link}
              id={`sector-${i + 1}`}
              className="sticky mb-5 last:mb-0"
              style={{ top: NAV_H + 12 + i * STACK_STEP, scrollMarginTop: NAV_H + 12 + i * STACK_STEP }}
            >
              <Link
                to={s.link}
                className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-obsidian border border-white/10 shadow-[0_-18px_40px_-20px_rgba(0,0,0,0.8)] h-[min(72svh,620px)] min-h-[440px] active:scale-[0.99] transition-transform duration-200"
              >
                <img
                  src={mediaUrl(s.image, { width: 900 })}
                  srcSet={`${mediaUrl(s.image, { width: 600 })} 600w, ${mediaUrl(s.image, { width: 900 })} 900w, ${mediaUrl(s.image, { width: 1300 })} 1300w`}
                  sizes="(min-width: 768px) 720px, 100vw"
                  alt=""
                  aria-hidden="true"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/5" />
                <span aria-hidden="true" className="absolute top-5 left-5 w-6 h-6 border-l border-t border-lime/60" />
                <span aria-hidden="true" className="absolute top-5 right-5 font-mono text-[11px] tracking-[0.2em] text-white/60 tabular-nums">
                  {pad2(i + 1)} / {pad2(n)}
                </span>

                <div className="relative p-6 sm:p-8">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-lime/15 border border-lime/30 text-lime text-[11px] font-display font-semibold tracking-[0.12em] uppercase mb-4">
                    {s.tag}
                  </span>
                  <h3 className="font-display font-bold text-3xl sm:text-4xl text-white leading-[1.05] tracking-tight mb-5">{s.title}</h3>
                  <ul className="grid gap-2 mb-6">
                    {s.outcomes.map((o, k) => (
                      <li key={k} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-lime shrink-0 mt-[3px]" aria-hidden="true" />
                        <span className="text-[15px] text-white/80 leading-snug">{o}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-lime text-obsidian text-xs font-display font-semibold tracking-wider uppercase">
                    {s.explore} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
