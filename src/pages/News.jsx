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

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'renewable_energy', label: 'Renewable Energy' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'surveying', label: 'Surveying' },
  { value: 'oil_gas', label: 'Oil & Gas' },
  { value: 'environmental', label: 'Environmental' },
  { value: 'company_news', label: 'Company News' },
  { value: 'technology', label: 'Technology' },
];

const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: 'Revolutionary LiDAR Technology Transforms Solar Farm Inspections',
    excerpt: 'Discover how our advanced LiDAR sensors are revolutionizing solar farm inspections across Europe.',
    category: 'renewable_energy',
    featured_image: MEDIA.heroImage,
    created_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    published: true,
  },
  {
    id: 2,
    title: 'Critical Infrastructure: Reducing Inspection Time by 60%',
    excerpt: 'Learn how drone technology is dramatically reducing inspection times for critical infrastructure.',
    category: 'infrastructure',
    featured_image: MEDIA.construction,
    created_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    published: true,
  },
  {
    id: 3,
    title: 'Aerial Surveying: Centimeter-Accurate Mapping Now Standard',
    excerpt: 'Precision meets efficiency in our latest surveying solutions delivering centimeter accuracy.',
    category: 'surveying',
    featured_image: MEDIA.lidar,
    created_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    published: true,
  },
  {
    id: 4,
    title: 'AI-Powered Analytics: Anomaly Detection Explained',
    excerpt: 'Explore how machine learning algorithms detect anomalies with unprecedented accuracy.',
    category: 'technology',
    featured_image: MEDIA.agriculture,
    created_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    published: true,
  },
  {
    id: 5,
    title: 'Oil & Gas Pipeline Inspections: Safety and Efficiency',
    excerpt: 'Discover how drone technology enhances safety and efficiency in oil & gas operations.',
    category: 'oil_gas',
    featured_image: MEDIA.infrastructure,
    created_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    published: true,
  },
  {
    id: 6,
    title: 'Aerata Expands: Opening New Office in Athens',
    excerpt: 'We\'re thrilled to announce the expansion of our operations into the Mediterranean market.',
    category: 'company_news',
    featured_image: MEDIA.heroImage,
    created_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    published: true,
  },
];

export default function News() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      try {
        const result = await base44.entities.BlogPost.list('-created_date');
        return result && result.length > 0 ? result : SAMPLE_ARTICLES;
      } catch (error) {
        console.log('Using sample articles');
        return SAMPLE_ARTICLES;
      }
    },
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
            <SectionHeading label="News & Insights" title="Latest from Aerata" align="left" light />
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
                placeholder="Search articles..."
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
              <p className="text-muted-foreground text-lg">No articles found.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for the latest drone industry insights.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Link to={`/news/${post.id}`} className="block group rounded-lg border border-border/50 bg-card/30 overflow-hidden hover:border-primary/30 transition-all">
                    {post.featured_image && (
                      <div className="h-48 overflow-hidden">
                        <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-semibold tracking-wider uppercase text-primary">
                          {post.category?.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {post.created_date ? format(new Date(post.created_date), 'MMM d, yyyy') : ''}
                        </span>
                      </div>
                      <h3 className="font-barlow font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        Read More <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}