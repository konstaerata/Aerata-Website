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
import { MEDIA } from '../lib/media';
import { fetchIndustryNews } from '../hooks/useIndustryNews';
import { useLang } from '../lib/LanguageContext';

const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: 'How Thermal Drone Surveys Cut Solar Farm Revenue Loss by 35%',
    excerpt: 'IEC-compliant thermal inspections across Aerata\'s 237 MWp Isolar portfolio demonstrate how early fault detection translates directly into recovered energy yield and reduced maintenance cost.',
    category: 'renewable_energy',
    featured_image: MEDIA.news_article_lidar_tech_image,
    created_date: new Date('2025-04-12'),
    published: true,
  },
  {
    id: 2,
    title: 'Reducing Powerline Inspection Time by 60% Without Rope Access',
    excerpt: 'A 120 km transmission corridor in mountainous Greece — surveyed in days, not weeks. How LiDAR and RGB sensors are transforming linear infrastructure inspection across Europe.',
    category: 'infrastructure',
    featured_image: MEDIA.news_article_infrastructure_image,
    created_date: new Date('2025-03-28'),
    published: true,
  },
  {
    id: 3,
    title: 'LiDAR vs Photogrammetry: Choosing the Right Survey Method for Your Project',
    excerpt: 'Both technologies deliver engineering-grade spatial data — but the right choice depends on terrain, deliverable format, and budget. A practical guide for project managers and surveyors.',
    category: 'technology',
    featured_image: MEDIA.news_article_ai_analytics_image,
    created_date: new Date('2025-03-14'),
    published: true,
  },
  {
    id: 4,
    title: 'Centimetre-Accurate Archaeological Mapping in the Peloponnese',
    excerpt: 'Sub-centimetre GSD orthomosaics and 3D point clouds of a 12-hectare dig site gave archaeologists GIS-ready data for excavation planning — delivered in under two days.',
    category: 'surveying',
    featured_image: MEDIA.news_article_surveying_image,
    created_date: new Date('2025-02-24'),
    published: true,
  },
  {
    id: 5,
    title: 'EASA Specific Category: What It Means for Your Inspection Project',
    excerpt: 'Not all drone operators are equal. Understanding the EASA Specific Category authorisation — and why it matters for high-risk commercial operations over infrastructure and energy assets.',
    category: 'company_news',
    featured_image: MEDIA.news_article_company_news_image,
    created_date: new Date('2025-02-10'),
    published: true,
  },
  {
    id: 6,
    title: 'Offshore Platform Inspections: Eliminating Rope Access Risk in the North Sea',
    excerpt: 'Scaffold-free structural inspection of offshore assets using close-visual drone workflows. How Aerata delivered a complete corrosion mapping report with zero platform downtime.',
    category: 'oil_gas',
    featured_image: MEDIA.news_article_oil_gas_image,
    created_date: new Date('2025-01-30'),
    published: true,
  },
  {
    id: 7,
    title: 'Wetland Habitat Mapping: 200 Hectares Surveyed in Two Flights',
    excerpt: 'Multi-spectral and RGB drone surveys captured vegetation density, water quality indicators, and biodiversity zones across a protected delta reserve — producing compliance-ready reports.',
    category: 'environmental',
    featured_image: MEDIA.news_article_lidar_tech_image,
    created_date: new Date('2025-01-15'),
    published: true,
  },
  {
    id: 8,
    title: 'Drone Inspection ROI: Real Numbers from the Field',
    excerpt: 'Solar: 30× faster at 65% lower cost. Pipelines: 6× faster at 69% savings. Construction surveys: 40× faster at 90% cost reduction. The business case for drone-first inspection is now indisputable.',
    category: 'infrastructure',
    featured_image: MEDIA.news_article_infrastructure_image,
    created_date: new Date('2025-01-05'),
    published: true,
  },
  {
    id: 9,
    title: 'Night Operations and Beyond Visual Line of Sight: What Is Now Possible in Europe',
    excerpt: 'BVLOS and night-ops authorisations are changing what\'s achievable for infrastructure and energy operators. An overview of the current regulatory landscape and what Aerata\'s authorisations enable.',
    category: 'technology',
    featured_image: MEDIA.news_article_ai_analytics_image,
    created_date: new Date('2024-12-18'),
    published: true,
  },
  {
    id: 10,
    title: 'Construction Site Monitoring: How Weekly Drone Surveys Reduced Rework by 30%',
    excerpt: 'Automated volume calculations and as-built vs. design comparisons delivered weekly across an 18-month residential development in Delft. The measurable impact on project delivery timelines.',
    category: 'surveying',
    featured_image: MEDIA.news_article_surveying_image,
    created_date: new Date('2024-12-05'),
    published: true,
  },
  {
    id: 11,
    title: 'Aerata Partners with DroneLicense.eu for EU Drone Pilot Certification',
    excerpt: 'Aerata has formalised its training partnership with DroneLicense.eu to support EU-wide pilot certification. Together we provide end-to-end pathways from A1/A3 Open category to Specific category operations.',
    category: 'company_news',
    featured_image: MEDIA.news_article_company_news_image,
    created_date: new Date('2024-11-22'),
    published: true,
  },
  {
    id: 12,
    title: 'Wind Turbine Blade Inspections: From Hours to Minutes Per Turbine',
    excerpt: 'Working alongside Sulzer Schmid Laboratories, Aerata\'s drone-based blade inspection workflow identifies surface defects, lightning strike damage, and erosion at a fraction of traditional inspection time.',
    category: 'renewable_energy',
    featured_image: MEDIA.news_article_lidar_tech_image,
    created_date: new Date('2024-11-08'),
    published: true,
  },
  {
    id: 13,
    title: 'AI Anomaly Detection in Solar Thermography: How It Works',
    excerpt: 'Machine learning models trained on thousands of IEC thermal datasets now flag cell-level defects, soiling patterns, and bypass diode failures with greater consistency than manual review.',
    category: 'technology',
    featured_image: MEDIA.news_article_ai_analytics_image,
    created_date: new Date('2024-10-25'),
    published: true,
  },
  {
    id: 14,
    title: 'Lake Marathon Multispectral Survey: Monitoring Drinking Water from Above',
    excerpt: 'Commissioned by VITO and EYDAP, Aerata\'s multispectral drone surveys of Lake Marathon provided early indicators of algal bloom risk and turbidity changes in one of Athens\' primary water sources.',
    category: 'environmental',
    featured_image: MEDIA.news_article_lidar_tech_image,
    created_date: new Date('2024-10-10'),
    published: true,
  },
  {
    id: 15,
    title: 'Aerata Opens Athens Office to Serve Mediterranean and Southeast European Markets',
    excerpt: 'With a growing project pipeline across Greece and the broader Mediterranean region, Aerata has established a permanent operational base in Alimos, Athens, enabling faster mobilisation for regional projects.',
    category: 'company_news',
    featured_image: MEDIA.news_article_company_news_image,
    created_date: new Date('2024-09-20'),
    published: true,
  },
];

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

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      try {
        const result = await base44.entities.BlogPost.list('-created_date');
        if (result && result.length > 0) return result;
      } catch (_) {}
      // Fall back to live industry RSS feeds
      try {
        const industry = await fetchIndustryNews();
        if (industry.length > 0) return industry;
      } catch (_) {}
      return SAMPLE_ARTICLES;
    },
    staleTime: 1000 * 60 * 30,
    retry: false,
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
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-lg border border-border/50 bg-card/30 animate-pulse">
                  <div className="h-48 bg-secondary" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-secondary rounded w-3/4" />
                    <div className="h-3 bg-secondary rounded w-full" />
                    <div className="h-3 bg-secondary rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
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