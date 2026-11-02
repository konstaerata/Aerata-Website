// @ts-nocheck
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Reveal, Spotlight, EASE_OUT } from '../components/motion';
import { Search, ArrowRight } from 'lucide-react';
import { Link } from '@/components/LocalizedLink';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import SEO from '../components/SEO';
import SectionHeading from '../components/shared/SectionHeading';
import { useLang } from '../lib/LanguageContext';
import { SAMPLE_ARTICLES } from '../lib/sampleArticles';
import { breadcrumbSchema } from '../lib/schemas';

export default function News() {
  const { t, lang } = useLang();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const reduce = useReducedMotion();

  const CATEGORIES = [
    { value: 'all', label: t('news.catAll') },
    { value: 'renewable_energy', label: t('news.catRenewable') },
    { value: 'infrastructure', label: t('news.catInfrastructure') },
    { value: 'surveying', label: t('news.catSurveying') },
    { value: 'oil_gas', label: t('news.catOilGas') },
    { value: 'environmental', label: t('news.catEnvironmental') },
    { value: 'company_news', label: t('news.catCompanyNews') },
    { value: 'technology', label: t('news.catTechnology') },
  ];

  const posts = SAMPLE_ARTICLES;

  const filteredPosts = posts.filter(p => {
    if (!p.published) return false;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <SEO
        title="Drone Industry News & Insights — Aerata B.V."
        description="Latest news on drone inspections, aerial surveying, renewable energy, and industrial technology from Aerata's team of enterprise drone operators."
        path="/news"
        jsonLd={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'News' },
        ], lang)}
      />
      {/* Page title — navy brand background */}
      <section className="relative pt-44 pb-24 overflow-hidden bg-navy-dark grain">
        <div aria-hidden="true" className="absolute inset-0 hud-grid" />
        <div aria-hidden="true" className="absolute -right-32 -top-32 w-[560px] h-[560px] rounded-full bg-lime/10 blur-3xl" />
        {!reduce && <div className="scanline z-10" aria-hidden="true" />}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 [&_h1]:text-4xl [&_h1]:md:text-6xl [&_h1]:lg:text-7xl">
          <SectionHeading label={t('news.label')} title={t('news.title')} align="left" light as="h1" />
        </div>
      </section>

      <section className="py-16 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <Reveal className="flex flex-col lg:flex-row lg:items-center gap-5 mb-14">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t('news.search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 bg-card border-border transition-shadow focus-visible:shadow-[0_0_0_4px_hsl(88_48%_52%/0.15)]"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button key={c.value} onClick={() => setCategory(c.value)} aria-pressed={category === c.value}
                  className={`relative px-3.5 py-2 text-xs font-display font-semibold tracking-wide rounded-full transition-colors duration-300 ${
                    category === c.value
                      ? 'text-white'
                      : 'border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/40'
                  }`}
                >
                  {category === c.value && (
                    <motion.span layoutId="news-chip" className="absolute inset-0 rounded-full bg-primary" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">{t('news.noResults')}</p>
              <p className="text-sm text-muted-foreground mt-2">{t('news.noResultsDesc')}</p>
            </div>
          ) : (
            <motion.div layout={!reduce} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              <AnimatePresence mode="popLayout" initial={false}>
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  layout={!reduce}
                  className="h-full"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.39, delay: Math.min(i * 0.03, 0.3), ease: EASE_OUT }}
                >
                  {(() => {
                    const CATEGORY_META = {
                      renewable_energy: { label: 'Renewable Energy', accent: '#7ec247', dot: 'bg-lime' },
                      oil_gas:          { label: 'Oil & Gas',         accent: '#e06c1a', dot: 'bg-ember' },
                      surveying:        { label: 'Surveying',         accent: '#4a9eb5', dot: 'bg-navy-light' },
                      infrastructure:   { label: 'Infrastructure',    accent: '#4a9eb5', dot: 'bg-navy-light' },
                      environmental:    { label: 'Environmental',     accent: '#7ec247', dot: 'bg-lime' },
                      company_news:     { label: 'Company News',      accent: '#7ec247', dot: 'bg-lime' },
                      technology:       { label: 'Technology',        accent: '#4a9eb5', dot: 'bg-navy-light' },
                    };
                    const meta = CATEGORY_META[post.category] ?? CATEGORY_META.technology;

                    const cardContent = (
                      <div className="flex flex-col h-full">
                        {/* Brand header band — no image, pure style */}
                        <div className="relative flex-shrink-0 h-[88px] bg-navy-dark overflow-hidden">
                          {/* Subtle grid lines */}
                          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <pattern id={`grid-${post.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
                                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5"/>
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill={`url(#grid-${post.id})`}/>
                          </svg>
                          {/* Accent glow blob */}
                          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{ backgroundColor: meta.accent }} />
                          {/* Category label */}
                          <div className="absolute bottom-3 left-4 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                            <span className="text-[10px] font-semibold tracking-widest uppercase text-white/70">
                              {meta.label}
                            </span>
                          </div>
                          {/* Scan sweep on hover */}
                          <div aria-hidden="true" className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[420%]" />
                          {/* Accent bar along top */}
                          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: meta.accent }} />
                        </div>

                        {/* Body */}
                        <div className="flex flex-col flex-1 p-5">
                          <p className="text-[10px] text-muted-foreground mb-3 tabular-nums">
                            {post.created_date ? format(new Date(post.created_date), 'MMM d, yyyy') : ''}
                          </p>
                          <h2 className="font-display font-semibold text-foreground text-lg leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-3">
                            {post.title}
                          </h2>
                          <p className="text-sm text-muted-foreground line-clamp-3 flex-1 leading-relaxed">{post.excerpt}</p>
                          <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                              {t('news.readMore')} <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                            </span>
                            {post.is_external && (
                              <span className="text-[10px] text-muted-foreground tracking-wide">↗ {t('news.external')}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );

                    const cardClass = "flex flex-col h-full rounded-xl border border-border/60 bg-card overflow-hidden transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_22px_44px_-20px_hsl(210_35%_12%/0.3)]";
                    return post.is_external
                      ? <Spotlight as="a" tone="navy" href={post.source_url} target="_blank" rel="noopener noreferrer" className={`block group h-full ${cardClass}`}>{cardContent}</Spotlight>
                      : <Spotlight as={Link} tone="navy" to={`/news/${post.id}`} className={`block group h-full ${cardClass}`}>{cardContent}</Spotlight>;
                  })()}
                </motion.div>
              ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}