// @ts-nocheck
import React from 'react';
import { ArrowRight, ExternalLink, Check } from 'lucide-react';
import SEO from '../../components/SEO';
import ServicePageHero from '../../components/shared/ServicePageHero';
import SectionHeading from '../../components/shared/SectionHeading';
import MediaSlot from '../../components/shared/MediaSlot';
import CompareSlider from '../../components/shared/CompareSlider';
import ServiceProjects from '../../components/shared/ServiceProjects';
import CTABanner from '../../components/shared/CTABanner';
import { Reveal, Stagger, Item, Spotlight } from '../../components/motion';
import { Link } from '@/components/LocalizedLink';
import { mediaUrl } from '../../lib/media';
import { SECTOR_BY_PATH, relatedSectors, CONTENT_LANGUAGES } from '../../lib/sectors';
import { useHashScroll } from '../../hooks/useHashScroll';
// Industry findings (in-chapter cards or bottom band): remove these two imports and the marked lines below.
import Findings, { FindingCards } from '../../components/sectors/Findings';
import { getFindings, FINDINGS_LAYOUT } from '../../lib/findings';
import { useLang } from '../../lib/LanguageContext';
import { serviceSchema, breadcrumbSchema } from '../../lib/schemas';

const pad2 = (n) => String(n).padStart(2, '0');

/** Scrolls to a chapter through Lenis when it's running, natively otherwise. */
function jumpTo(e, id) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}

const GLANCE_COLS = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };

/** First real image of a chapter (photo slots, then the comparison pair), for thumbnails. */
const chapterThumb = (media) =>
  media?.media?.find((m) => m.src)?.src || media?.compare?.after?.src || media?.compare?.before?.src || null;

/**
 * Dark panel under the hero, same backdrop as the Home sectors: one card per
 * chapter with a photo header and every check listed. Each card jumps to its chapter.
 */
function AtAGlance({ sections, mediaFor, icon: Icon, label, jumpLabel }) {
  return (
    <nav aria-label={label} className="relative bg-obsidian">
      <div aria-hidden="true" className="absolute inset-0 hud-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <Stagger as="ol" gap={0.07} className={`grid grid-cols-1 sm:grid-cols-2 ${GLANCE_COLS[sections.length] || 'lg:grid-cols-3'} gap-4`}>
          {sections.map((sec, i) => {
            const thumb = chapterThumb(mediaFor(sec));
            return (
              <Item as="li" key={sec.id} className="h-full">
                <a
                  href={`#${sec.id}`}
                  onClick={(e) => jumpTo(e, sec.id)}
                  className="group relative flex h-full flex-col rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-lime/40 hover:bg-white/[0.06]"
                >
                  <span aria-hidden="true" className="absolute top-0 inset-x-0 z-10 h-0.5 origin-left scale-x-0 bg-lime transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                  <div className="relative h-36 overflow-hidden bg-[hsl(210_25%_12%)]">
                    {thumb ? (
                      <img src={mediaUrl(thumb, { width: 640 })} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-70 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-90" />
                    ) : (
                      <>
                        <span aria-hidden="true" className="absolute inset-0 hud-grid" />
                        {Icon && <Icon aria-hidden="true" className="absolute right-5 top-5 w-10 h-10 text-lime/25" />}
                      </>
                    )}
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                    <span className="absolute left-5 bottom-3 font-display font-bold text-5xl text-white/90 tabular-nums tracking-tight">{pad2(i + 1)}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 lg:p-6">
                    <h2 className="mb-4 font-display font-semibold text-lg text-white leading-snug">{sec.label}</h2>
                    <ul className="space-y-2 mb-6">
                      {sec.items.map((it) => (
                        <li key={it.lead} className="flex gap-2.5 text-sm text-white/70 leading-snug">
                          <Check aria-hidden="true" className="mt-0.5 w-3.5 h-3.5 shrink-0 text-lime" />
                          {it.lead}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-2 text-[11px] font-display font-semibold tracking-wider uppercase text-lime/80 group-hover:text-lime">
                      {jumpLabel}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              </Item>
            );
          })}
        </Stagger>
      </div>
    </nav>
  );
}

/**
 * How the checklist fills a 3-column grid without holes: the closing
 * statement takes the cells left over in the last row; without one, the
 * last card stretches. Four items use two columns instead.
 */
function checklistLayout(count, hasClosing) {
  if (count === 4 && !hasClosing) return { cols: 'lg:grid-cols-2', last: '', closing: '' };
  const rest = count % 3;
  const SPAN = { 1: 'lg:col-span-1', 2: 'lg:col-span-2', 3: 'lg:col-span-3' };
  if (hasClosing) return { cols: 'lg:grid-cols-3', last: '', closing: `sm:col-span-2 ${SPAN[3 - rest]}` };
  return { cols: 'lg:grid-cols-3', last: rest ? SPAN[4 - rest] : '', closing: '' };
}

/**
 * One chapter: compact header (number, label and title beside the intro), a
 * full-width row of two images, then the checklist as a card grid that the
 * closing statement completes. The before/after slider closes the chapter.
 */
function Chapter({ sec, media, index, common, findings }) {
  const tinted = index % 2 === 1;
  const flip = index % 2 === 1;
  const slots = media?.media || [];
  const layout = checklistLayout(sec.items.length, Boolean(sec.closing));
  const IMG_ROW = 'aspect-[16/10] lg:aspect-auto lg:h-[420px]';

  return (
    <section id={sec.id} className={`relative py-20 lg:py-24 scroll-mt-20 overflow-hidden ${tinted ? 'bg-secondary/40 border-y border-border/40' : ''}`}>
      <span aria-hidden="true" className="pointer-events-none select-none absolute -top-6 right-0 lg:right-8 font-display font-bold text-[12rem] lg:text-[16rem] leading-none tracking-tighter text-primary/[0.05]">
        {pad2(index + 1)}
      </span>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-5 items-end mb-10 lg:mb-12">
          <Reveal className="lg:col-span-6">
            <span className="flex items-center gap-3 mb-4 text-[11px] font-display font-semibold tracking-[0.3em] uppercase text-[hsl(88_55%_24%)]">
              <span className="font-mono tabular-nums">{pad2(index + 1)}</span>
              <span className="block w-8 h-px bg-[hsl(88_55%_34%)]" />
              {sec.label}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-primary leading-[1.05] tracking-tight [text-wrap:balance]">{sec.title}</h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{sec.intro}</p>
          </Reveal>
        </div>

        {slots.length === 1 && (
          <Reveal className="mb-12">
            <MediaSlot slot={slots[0]} alt={sec.title} ratio="aspect-[16/10] lg:aspect-auto lg:h-[460px]" sizes="100vw" />
          </Reveal>
        )}
        {slots.length === 2 && (
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-12">
            <MediaSlot slot={slots[0]} alt={sec.title} ratio={IMG_ROW} className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`} sizes="(min-width: 1024px) 58vw, 100vw" />
            <MediaSlot slot={slots[1]} alt={sec.title} ratio={IMG_ROW} className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`} sizes="(min-width: 1024px) 42vw, 100vw" />
          </Reveal>
        )}
        {/* Three images: equal columns. Four or more: a two-column grid. */}
        {slots.length >= 3 && (
          <Reveal className={`grid grid-cols-1 sm:grid-cols-2 ${slots.length === 3 ? 'lg:grid-cols-3' : ''} gap-4 mb-12`}>
            {slots.map((m) => (
              <MediaSlot
                key={m.id}
                slot={m}
                alt={sec.title}
                ratio={`aspect-[4/3] ${slots.length === 3 ? 'lg:aspect-auto lg:h-[340px]' : 'lg:aspect-auto lg:h-[380px]'}`}
                sizes={slots.length === 3 ? '(min-width: 1024px) 33vw, 50vw' : '50vw'}
              />
            ))}
          </Reveal>
        )}

        <p className="mb-5 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">{common.checkLabel}</p>
        <Stagger as="ol" gap={0.05} className={`grid grid-cols-1 sm:grid-cols-2 ${layout.cols} gap-4`}>
          {sec.items.map((it, k) => (
            <Item as="li" key={k} className={`h-full ${k === sec.items.length - 1 ? layout.last : ''}`}>
              <div className="group relative h-full p-6 rounded-xl border border-border/70 bg-card overflow-hidden transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_40px_-18px_hsl(210_35%_12%/0.3)]">
                <span aria-hidden="true" className="absolute top-0 inset-x-0 h-0.5 origin-left scale-x-0 bg-lime transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                <span className="font-mono text-xs text-muted-foreground tabular-nums group-hover:text-[hsl(88_55%_24%)] transition-colors">{pad2(k + 1)}</span>
                <h3 className="mt-3 font-display font-semibold text-lg text-foreground leading-snug group-hover:text-primary transition-colors">{it.lead}</h3>
                {it.text && <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{it.text}</p>}
              </div>
            </Item>
          ))}
          {sec.closing && (
            <Item as="li" className={`h-full ${layout.closing}`}>
              <div className="relative h-full flex items-center p-7 lg:p-9 rounded-xl bg-obsidian overflow-hidden">
                <span aria-hidden="true" className="absolute inset-0 hud-grid opacity-70" />
                <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1 bg-lime" />
                <p className="relative font-display font-medium text-xl lg:text-2xl text-white leading-snug [text-wrap:balance]">{sec.closing}</p>
              </div>
            </Item>
          )}
        </Stagger>

        {sec.partner && (
          <Reveal className="mt-12">
            <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center p-8 lg:p-10 rounded-2xl bg-obsidian text-white overflow-hidden">
              <div aria-hidden="true" className="absolute inset-0 hud-grid opacity-70" />
              <div className="relative">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-lime mb-2">{common.partnerLabel}</p>
                <p className="font-display font-bold text-4xl tracking-tight">{sec.partner.name}</p>
              </div>
              <p className="relative text-[15px] text-steelBlue leading-relaxed max-w-2xl">{sec.partner.text}</p>
              <a
                href={sec.partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 text-xs font-display font-semibold tracking-wider uppercase text-lime hover:text-white transition-colors"
              >
                {common.partnerLink} <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        )}

        <FindingCards items={findings} />

        {media?.compare && (
          <Reveal className="mt-12 lg:mt-16">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[hsl(88_55%_24%)] mb-1">{common.compareLabel}</p>
                <h3 className="font-display font-semibold text-xl text-foreground">{sec.compareTitle}</h3>
              </div>
              {media.compare.before.src && media.compare.after.src && (
                <span className="font-mono text-[11px] text-muted-foreground">{common.compareHint}</span>
              )}
            </div>
            <CompareSlider pair={media.compare} title={sec.compareTitle} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

/** How we work as a horizontal timeline: a lime rail draws across, steps sit on it. */
function HowWeWork({ steps, common }) {
  const cols = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }[steps.length] || 'lg:grid-cols-4';
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label={common.howLabel} title={common.howTitle} align="left" />
        <div className="relative">
          <Reveal className="hidden lg:block absolute top-5 left-5 right-5 h-px bg-primary/10" aria-hidden="true">
            <span className="block h-full w-full origin-left bg-gradient-to-r from-lime via-lime/60 to-lime/10" />
          </Reveal>
          <Stagger as="ol" gap={0.1} className={`relative grid grid-cols-1 sm:grid-cols-2 ${cols} gap-8 lg:gap-10`}>
            {steps.map((s) => (
              <Item as="li" key={s.n} className="group">
                <span className="relative z-10 flex w-10 h-10 items-center justify-center rounded-full bg-lime font-mono font-bold text-xs text-obsidian tabular-nums shadow-[0_0_0_6px_hsl(var(--background))] transition-transform duration-500 group-hover:scale-110">
                  {s.n}
                </span>
                <h3 className="mt-5 font-display font-semibold text-lg text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/** Deliverables on a dark HUD panel, each with its file formats as chips. */
function Deliverables({ items, common }) {
  return (
    <section className="relative py-24 lg:py-28 bg-obsidian overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 hud-grid opacity-70" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label={common.receiveLabel} title={common.receiveTitle} description={common.receiveDesc} align="left" light />
        <Stagger gap={0.07} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {items.map((d, i) => (
            <Item key={i} className="h-full">
              <Spotlight tone="lime" className="group h-full p-8 lg:p-10 bg-obsidian flex flex-col">
                <span className="font-mono text-[11px] tracking-[0.2em] text-lime/70 tabular-nums mb-6">{pad2(i + 1)}</span>
                <h3 className="font-display font-semibold text-xl lg:text-2xl text-white mb-3 tracking-tight">{d.title}</h3>
                <p className="text-[15px] text-steelBlue leading-relaxed mb-8">{d.desc}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {d.formats.map((f) => (
                    <span key={f} className="px-2.5 py-1 rounded border border-lime/30 bg-lime/10 font-mono text-[11px] tracking-wider text-lime">{f}</span>
                  ))}
                </div>
              </Spotlight>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function RelatedSectors({ current, t }) {
  const items = relatedSectors(current);
  return (
    <section className="py-24 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t('sectorPages.common.relatedLabel')} title={t('sectorPages.common.relatedTitle')} align="left" />
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((s) => {
            const Icon = s.icon;
            return (
              <Item key={s.key}>
                <Link to={s.path} className="group relative block h-72 rounded-xl overflow-hidden bg-obsidian">
                  {s.card && (
                    <img src={mediaUrl(s.card, { width: 800 })} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-80" />
                  )}
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
                  <div className="absolute inset-0 p-7 flex flex-col">
                    <Icon className="w-6 h-6 text-lime" aria-hidden="true" />
                    <h3 className="mt-auto font-display font-semibold text-2xl text-white tracking-tight">{t(`sectorPages.${s.key}.name`)}</h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">{t(`sectorPages.${s.key}.menu`)}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-display font-semibold tracking-wider uppercase text-lime">
                      {t('sectorPages.common.learnMore')} <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Item>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

export default function SectorPage({ path }) {
  const { t, lang } = useLang();
  const sector = SECTOR_BY_PATH[path];
  const copy = t(`sectorPages.${sector.key}`);
  const common = t('sectorPages.common');
  // A sector can bring its own workflow steps (environmental does); otherwise the shared four.
  const how = (copy.how || t('sectorPages.how')).map((s, i) => ({ ...s, n: pad2(i + 1) }));
  const hero = sector.hero;
  const findings = getFindings(sector.key, lang);
  useHashScroll();

  return (
    <div>
      {/* Only translated languages are indexed; the others stay out of search until done. */}
      <SEO
        title={copy.seoTitle}
        description={copy.seoDesc}
        path={path}
        noindex={!CONTENT_LANGUAGES.includes(lang)}
        languages={CONTENT_LANGUAGES}
        jsonLd={[
          serviceSchema({ name: copy.name, description: copy.seoDesc, areaServed: ['Netherlands', 'Greece', 'Balkans'], lang }),
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Sectors' }, { name: copy.name }], lang),
        ]}
      />
      <ServicePageHero
        eyebrow={common.eyebrow}
        title={copy.heroTitle}
        subtitle={copy.heroSub}
        image={hero.src}
        video={hero.video}
        poster={hero.poster}
        placeholder={hero.src || hero.video ? null : hero}
        ctaText={common.heroCta}
        ctaLink={`/contact?source=sector-${sector.key}`}
      />
      <AtAGlance
        sections={copy.sections}
        mediaFor={(sec) => sector.sections[sec.key || sec.id]}
        icon={sector.icon}
        label={common.onThisPage}
        jumpLabel={common.jumpTo}
      />

      {copy.sections.map((sec, i) => (
        <Chapter
          key={sec.id}
          sec={sec}
          media={sector.sections[sec.key || sec.id]}
          index={i}
          common={common}
          findings={FINDINGS_LAYOUT === 'inline' ? findings.filter((f) => f.chapter === sec.id) : null}
        />
      ))}

      {FINDINGS_LAYOUT === 'band' && <Findings items={findings} />}

      <Deliverables items={copy.receive} common={common} />

      <HowWeWork steps={how} common={common} />

      {sector.projects.length > 0 && (
        <ServiceProjects projects={sector.projects} heading={common.projectsLabel} title={common.projectsTitle} />
      )}

      <RelatedSectors current={sector.key} t={t} />

      <CTABanner title={common.ctaTitle} subtitle={common.ctaSub} buttonText={common.ctaButton} link={`/contact?source=sector-${sector.key}`} />
    </div>
  );
}
