// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Quote } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';
import { Stagger, Item, EASE_OUT } from '../motion';
import { getFindingsCopy } from '../../lib/findings';
import { useLang } from '../../lib/LanguageContext';

/** Card and chart labels in the page language. */
const useCopy = () => getFindingsCopy(useLang().lang);

/**
 * "Industry findings" band on the sector pages: third-party figures as a
 * bento of light cards, each with a small chart drawn to the real values.
 * Self-contained: remove the <Findings /> line in SectorPage.jsx to drop it.
 *
 * Colours (validated for the light card surface): drone #64962c,
 * older method #397cac. Text always uses text colours; every chart has a
 * screen-reader sentence (the card's `finding`).
 */
const DRONE = '#64962c';
const MANUAL = '#397cac';
const tone = (kind) => (kind === 'drone' ? DRONE : MANUAL);
const VIEW = { once: true, margin: '0px 0px -10% 0px' };
const fmt = (n) => new Intl.NumberFormat('en-GB').format(n);

/** Two rows of squares, one per `per` units: solid to the low end, light to the high end. */
function RateViz({ rows, per }) {
  const reduce = useReducedMotion();
  const max = Math.max(...rows.map((r) => r.high));
  const cells = Math.ceil(max / per);
  return (
    <div className="space-y-5" aria-hidden="true">
      {rows.map((r, ri) => {
        const solid = Math.round(r.low / per);
        const light = Math.round(r.high / per);
        return (
          <div key={r.label}>
            <div className="flex items-baseline justify-between mb-2 text-sm">
              <span className="font-display font-semibold text-foreground">{r.label}</span>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">{fmt(r.low)}–{fmt(r.high)}</span>
            </div>
            <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${Math.min(cells, 25)}, minmax(0, 1fr))` }}>
              {Array.from({ length: cells }, (_, i) => {
                const on = i < light;
                return (
                  <motion.span
                    key={i}
                    className="block aspect-square rounded-[3px]"
                    style={{ backgroundColor: on ? tone(r.kind) : 'hsl(210 20% 90%)', opacity: on && i >= solid ? 0.4 : 1 }}
                    initial={reduce || !on ? false : { scale: 0.3, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: on && i >= solid ? 0.4 : 1 }}
                    viewport={VIEW}
                    transition={{ duration: 0.25, delay: 0.15 + ri * 0.1 + i * 0.022, ease: EASE_OUT }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Horizontal bars on one shared scale; a lighter band covers a range's upper part. */
function RaceViz({ rows }) {
  const reduce = useReducedMotion();
  const max = Math.max(...rows.map((r) => r.high));
  return (
    <div className="space-y-4" aria-hidden="true">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between mb-1.5 text-sm">
            <span className="font-display font-semibold text-foreground">{r.label}</span>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">{r.text}</span>
          </div>
          <div className="relative h-3 rounded bg-[hsl(210_20%_92%)] overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 origin-left"
              style={{ width: `${Math.max((r.high / max) * 100, 1.2)}%` }}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEW}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE_OUT }}
            >
              <span className="absolute inset-y-0 left-0 rounded-l" style={{ width: `${(r.low / r.high) * 100}%`, backgroundColor: tone(r.kind) }} />
              <span className="absolute inset-y-0 right-0 rounded-r" style={{ left: `${(r.low / r.high) * 100}%`, backgroundColor: tone(r.kind), opacity: 0.4 }} />
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Ring arc out of `max` (e.g. hours in a day): solid to `low`, light to `high`. */
function DialViz({ low, high, max }) {
  const reduce = useReducedMotion();
  const R = 52;
  const arc = (to, color, opacity, delay) => (
    <motion.circle
      cx="64" cy="64" r={R} fill="none" stroke={color} strokeOpacity={opacity} strokeWidth="12" strokeLinecap="round"
      transform="rotate(-90 64 64)"
      initial={reduce ? { pathLength: to / max } : { pathLength: 0 }}
      whileInView={{ pathLength: to / max }}
      viewport={VIEW}
      transition={{ duration: 1, delay, ease: EASE_OUT }}
    />
  );
  return (
    <svg viewBox="0 0 128 128" className="w-36 h-36 lg:w-40 lg:h-40" aria-hidden="true">
      <circle cx="64" cy="64" r={R} fill="none" stroke="hsl(210 20% 90%)" strokeWidth="12" />
      {arc(high, DRONE, 0.4, 0.25)}
      {arc(low, DRONE, 1, 0.15)}
      {[0, 6, 12, 18].map((h) => {
        const a = (h / max) * 2 * Math.PI - Math.PI / 2;
        return <text key={h} x={64 + Math.cos(a) * 33} y={64 + Math.sin(a) * 33 + 3} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 8, fontFamily: 'monospace' }}>{h}h</text>;
      })}
    </svg>
  );
}

function DonutViz({ value }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 160 160" className="w-40 h-40 lg:w-48 lg:h-48" aria-hidden="true">
      <circle cx="80" cy="80" r="64" fill="none" stroke="hsl(210 20% 90%)" strokeWidth="16" />
      <motion.circle
        cx="80" cy="80" r="64" fill="none" stroke={DRONE} strokeWidth="16" strokeLinecap="round"
        transform="rotate(-90 80 80)"
        initial={reduce ? { pathLength: value / 100 } : { pathLength: 0 }}
        whileInView={{ pathLength: value / 100 }}
        viewport={VIEW}
        transition={{ duration: 1.2, delay: 0.15, ease: EASE_OUT }}
      />
    </svg>
  );
}

/** Pictogram: `in` coin(s) on the left, `out` coins appearing on the right. */
function RatioViz({ in: inN, out }) {
  const C = useCopy();
  const reduce = useReducedMotion();
  const coin = (key, color, delay) => (
    <motion.span
      key={key}
      className="flex w-9 h-9 lg:w-10 lg:h-10 items-center justify-center rounded-full border-2 font-display font-bold text-sm"
      style={{ borderColor: color, color }}
      initial={reduce ? false : { scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={VIEW}
      transition={{ duration: 0.35, delay, ease: EASE_OUT }}
    >
      $
    </motion.span>
  );
  return (
    <div className="flex flex-wrap items-center gap-4" aria-hidden="true">
      <div className="text-center">
        <div className="flex gap-1.5 justify-center">{Array.from({ length: inN }, (_, i) => coin(`i${i}`, MANUAL, 0.1))}</div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{C.cost}</p>
      </div>
      <ArrowUpRight className="w-5 h-5 text-muted-foreground rotate-45" />
      <div className="text-center">
        <div className="grid grid-cols-5 gap-1.5">{Array.from({ length: out }, (_, i) => coin(`o${i}`, DRONE, 0.3 + i * 0.08))}</div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{C.benefit}</p>
      </div>
    </div>
  );
}

/** Two stockpile outlines (GPS dashed, drone filled) and a 0–target tolerance scale. */
function OverlayViz({ value, target }) {
  const C = useCopy();
  const reduce = useReducedMotion();
  const pile = 'M10 110 C 60 108, 85 40, 140 30 C 190 22, 230 60, 260 75 C 290 90, 320 108, 350 110 Z';
  return (
    <div aria-hidden="true">
      <svg viewBox="0 0 360 120" className="w-full h-auto">
        <motion.path d={pile} fill={DRONE} fillOpacity="0.25" stroke={DRONE} strokeWidth="2"
          initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ duration: 0.7, ease: EASE_OUT }} />
        <motion.path d={pile} transform="translate(0 -1.6) scale(1 1.012)" fill="none" stroke={MANUAL} strokeWidth="2" strokeDasharray="5 4"
          initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEW} transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }} />
        <line x1="0" y1="111" x2="360" y2="111" stroke="hsl(210 15% 75%)" strokeWidth="1" />
      </svg>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2"><span className="w-4 h-2.5 rounded-sm" style={{ backgroundColor: DRONE, opacity: 0.6 }} />{C.droneSurvey}</span>
        <span className="inline-flex items-center gap-2"><span className="w-4 border-t-2 border-dashed" style={{ borderColor: MANUAL }} />{C.gpsSurvey}</span>
      </div>
      <div className="mt-5">
        <div className="relative h-2 rounded bg-[hsl(210_20%_90%)]">
          <motion.span
            className="absolute inset-y-0 left-0 rounded origin-left"
            style={{ width: `${(value / target) * 100}%`, backgroundColor: DRONE }}
            initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={VIEW} transition={{ duration: 0.9, delay: 0.6, ease: EASE_OUT }}
          />
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[11px] text-muted-foreground tabular-nums">
          <span>0%</span><span>{C.difference} {value}%</span><span>{C.goal} &lt; {target}%</span>
        </div>
      </div>
    </div>
  );
}

/** Grid of dots or squares that fill in (people, km²). */
function UnitGridViz({ count, cols, shape }) {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className={`block aspect-square ${shape === 'dot' ? 'rounded-full' : 'rounded-[3px]'}`}
          style={{ backgroundColor: DRONE }}
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={VIEW}
          transition={{ duration: 0.25, delay: 0.1 + i * (shape === 'dot' ? 0.008 : 0.025), ease: EASE_OUT }}
        />
      ))}
    </div>
  );
}

/** Plain columns per year: a sober chart, no brand colour. */
function YearsViz({ rows }) {
  const max = Math.max(...rows.map((r) => r[1]));
  return (
    <div className="flex items-end gap-3 h-28" aria-hidden="true">
      {rows.map(([year, n]) => (
        <div key={year} className="flex-1 flex flex-col items-center justify-end h-full">
          <span className="mb-1 font-mono text-xs text-foreground tabular-nums">{n}</span>
          <span className="w-full rounded-t bg-[hsl(205_15%_55%)]" style={{ height: `${(n / max) * 100}%` }} />
          <span className="mt-1.5 font-mono text-[11px] text-muted-foreground tabular-nums">{year}</span>
        </div>
      ))}
    </div>
  );
}

function Viz({ viz }) {
  switch (viz.type) {
    case 'rate': return <RateViz {...viz} />;
    case 'race': return <RaceViz {...viz} />;
    case 'dial': return <DialViz {...viz} />;
    case 'donut': return <DonutViz {...viz} />;
    case 'ratio': return <RatioViz {...viz} />;
    case 'overlay': return <OverlayViz {...viz} />;
    case 'dots': return <UnitGridViz count={viz.total / viz.per} cols={20} shape="dot" />;
    case 'area': return <UnitGridViz count={viz.km2} cols={15} shape="square" />;
    case 'years': return <YearsViz {...viz} />;
    default: return null;
  }
}

function SourceLine({ source }) {
  const C = useCopy();
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/src pt-5 border-t border-border/60 flex items-start gap-3 text-xs text-muted-foreground hover:text-primary transition-colors"
    >
      <span className="shrink-0 px-2 py-0.5 rounded border border-border bg-secondary/60 font-mono text-[10px] tracking-wider uppercase text-foreground/70">
        {C.sourceTypes[source.type]}
      </span>
      <span className="leading-snug">
        {source.name}{source.year ? ` · ${source.year}` : ''}
      </span>
      <ArrowUpRight className="ml-auto w-3.5 h-3.5 shrink-0 transition-transform group-hover/src:-translate-y-0.5 group-hover/src:translate-x-0.5" aria-hidden="true" />
    </a>
  );
}

/**
 * One finding. `wide` = full-width card (first of three): text left, chart
 * right. Otherwise the chart (or quote) takes the free height, centred, so
 * paired cards of different lengths don't leave a gap at the bottom.
 */
function Card({ f, wide, large }) {
  const isQuote = f.viz.type === 'quote';
  const round = f.viz.type === 'dial' || f.viz.type === 'donut';
  const figure = f.figure && (
    <p className={`font-display font-bold text-primary tracking-tight tabular-nums leading-none ${large ? 'text-6xl lg:text-7xl' : 'text-5xl'}`}>{f.figure}</p>
  );
  const finding = <p className="mt-4 text-[15px] text-foreground/85 leading-relaxed max-w-xl">{f.finding}</p>;
  const context = f.context && <p className="mt-4 text-xs text-muted-foreground leading-relaxed">{f.context}</p>;

  let body;
  if (isQuote) {
    body = (
      <div className="flex-1 flex flex-col justify-center py-4">
        <Quote className="w-8 h-8 text-lime" aria-hidden="true" />
        <p className={`mt-3 font-display font-medium text-primary leading-snug [text-wrap:balance] ${large ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'}`}>{f.finding}</p>
        {f.context && <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{f.context}</p>}
      </div>
    );
  } else if (wide) {
    body = (
      <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        <div>{figure}{finding}{context}</div>
        <div className="flex justify-center"><Viz viz={f.viz} /></div>
      </div>
    );
  } else {
    body = (
      <>
        <div className="mt-3">{figure}{finding}</div>
        <div className={`flex-1 flex flex-col justify-center py-7 ${round ? 'items-center' : ''}`}><Viz viz={f.viz} /></div>
        {context}
      </>
    );
  }

  return (
    <div className="group relative h-full flex flex-col rounded-2xl border border-border/70 bg-card p-6 lg:p-8 overflow-hidden transition-[box-shadow,border-color] duration-500 hover:border-primary/25 hover:shadow-[0_18px_40px_-18px_hsl(210_35%_12%/0.25)]">
      <span aria-hidden="true" className="absolute top-0 inset-x-0 h-0.5 origin-left scale-x-0 bg-lime transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[hsl(88_55%_24%)]">{f.eyebrow}</p>
      {body}
      <div className="mt-auto pt-6"><SourceLine source={f.source} /></div>
    </div>
  );
}

const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const findingId = (f) => `finding-${slug(f.idKey || f.eyebrow)}`;

/**
 * The cards for one chapter, placed inside it. One card runs full width
 * (text beside the chart); two share a 7/5 row.
 */
export function FindingCards({ items }) {
  const C = useCopy();
  if (!items || items.length === 0) return null;
  const one = items.length === 1;
  return (
    <div className="mt-12 lg:mt-16">
      <p className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
        {items.length > 1 ? C.cardLabelPlural : C.cardLabel}
        <span className="normal-case tracking-normal text-muted-foreground">· {C.description}</span>
      </p>
      <Stagger gap={0.08} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {items.map((f, i) => (
          <Item key={f.eyebrow} id={findingId(f)} className={`scroll-mt-28 ${one ? 'lg:col-span-12' : i === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}`}>
            <Card f={f} wide={one && f.viz.type !== 'quote'} large={i === 0} />
          </Item>
        ))}
      </Stagger>
    </div>
  );
}

export default function Findings({ items }) {
  const C = useCopy();
  if (!items || items.length === 0) return null;
  // Three findings: the first runs full width, the other two share a row.
  // Two: a 7/5 split.
  const three = items.length >= 3;
  const span = (i) => (three ? (i === 0 ? 'lg:col-span-12' : 'lg:col-span-6') : i === 0 ? 'lg:col-span-7' : 'lg:col-span-5');
  return (
    <section className="relative py-20 lg:py-24 border-t border-border/50" aria-label={C.title}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label={C.label} title={C.title} description={C.description} align="left" />
        <Stagger gap={0.08} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {items.map((f, i) => (
            <Item key={f.eyebrow} className={span(i)}>
              <Card f={f} wide={three && i === 0} large={i === 0} />
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
