// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import SectionHeading from '../components/shared/SectionHeading';
import { useLang } from '../lib/LanguageContext';
import { SAMPLE_ARTICLES } from '../lib/sampleArticles';

export default function News() {
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

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

  const { data: posts = SAMPLE_ARTICLES } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      try {
        const result = await base44.entities.BlogPost.list('-created_date');
        if (Array.isArray(result) && result.length > 0) return result;
      } catch (_) {}
      return SAMPLE_ARTICLES;
    },
    staleTime: 1000 * 60 * 30,
    retry: false,
    initialData: SAMPLE_ARTICLES,
  });

  const filteredPosts = posts.filter(p => {
    if (!p.published) return false;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Page title — navy brand background */}
      <section className="relative py-32 pt-40 overflow-hidden bg-navy-dark">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <SectionHeading label={t('news.label')} title={t('news.title')} align="left" light />
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t('news.search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button key={c.value} onClick={() => setCategory(c.value)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all ${
                    category === c.value 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">{t('news.noResults')}</p>
              <p className="text-sm text-muted-foreground mt-2">{t('news.noResultsDesc')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
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
                          {/* Accent bar along top */}
                          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: meta.accent }} />
                        </div>

                        {/* Body */}
                        <div className="flex flex-col flex-1 p-5">
                          <p className="text-[10px] text-muted-foreground mb-3 tabular-nums">
                            {post.created_date ? format(new Date(post.created_date), 'MMM d, yyyy') : ''}
                          </p>
                          <h3 className="font-barlow font-semibold text-foreground text-base leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-3">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3 flex-1 leading-relaxed">{post.excerpt}</p>
                          <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                              {t('news.readMore')} <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                            </span>
                            {post.is_external && (
                              <span className="text-[10px] text-muted-foreground/40 tracking-wide">↗ {t('news.external')}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );

                    const cardClass = "flex flex-col h-full rounded-xl border border-border/50 bg-card/40 overflow-hidden hover:border-navy-light/60 hover:shadow-xl hover:shadow-navy/10 hover:-translate-y-0.5 transition-all duration-300";
                    return post.is_external
                      ? <a href={post.source_url} target="_blank" rel="noopener noreferrer" className={`block group h-full ${cardClass}`}>{cardContent}</a>
                      : <Link to={`/news/${post.id}`} className={`block group h-full ${cardClass}`}>{cardContent}</Link>;
                  })()}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}