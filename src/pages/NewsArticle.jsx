// @ts-nocheck
import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '@/components/LocalizedLink';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageProgress } from '../lib/scroll';
import { Reveal, MaskLines, Magnetic, EASE_OUT } from '../components/motion';
import SEO from '../components/SEO';
import RelatedArticles from '../components/shared/RelatedArticles';
import { SAMPLE_ARTICLES } from '../lib/sampleArticles';
import { articleSchema, breadcrumbSchema } from '../lib/schemas';
import { SERVICES } from '../lib/services';

const CATEGORY_LABELS = {
  renewable_energy: 'Renewable Energy',
  infrastructure:   'Infrastructure',
  surveying:        'Surveying',
  oil_gas:          'Oil & Gas',
  environmental:    'Environmental',
  company_news:     'Company News',
  technology:       'Technology',
};

// Maps article categories onto the corresponding service page, where one
// exists — company_news/technology have no single matching service.
const CATEGORY_TO_SERVICE_KEY = {
  renewable_energy: 'renewable-energy',
  infrastructure:   'infrastructure',
  surveying:        'surveying',
  oil_gas:          'oil-gas',
  environmental:    'environmental',
};

export default function NewsArticle() {
  const { id } = useParams();
  const reduce = useReducedMotion();
  const readProgress = usePageProgress();

  const post = SAMPLE_ARTICLES.find(a => String(a.id) === String(id));
  const relatedServiceKey = post ? CATEGORY_TO_SERVICE_KEY[post.category] : undefined;
  const relatedService = relatedServiceKey ? SERVICES.find((s) => s.key === relatedServiceKey) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <p className="text-muted-foreground text-lg">Article not found.</p>
        <Link to="/news" className="text-primary hover:underline flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>
      </div>
    );
  }

  const postJsonLd = post.created_date ? [
    articleSchema({
      headline: post.title,
      excerpt: post.excerpt || '',
      datePublished: post.created_date,
      dateModified: post.created_date,
      url: `/news/${post.id}`,
    }),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'News', url: '/news' },
      { name: post.title },
    ]),
  ] : breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'News', url: '/news' },
    { name: post.title },
  ]);

  return (
    <div className="relative pt-36 pb-28">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[460px] data-trace opacity-70 pointer-events-none [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      {/* Reading progress */}
      <motion.div aria-hidden="true" style={{ scaleY: readProgress }} className="hidden xl:block fixed left-6 top-28 bottom-28 w-px bg-lime origin-top z-30" />
      <SEO
        title={`${post.title} — Aerata B.V.`}
        description={post.excerpt || `Read about ${post.title} from Aerata B.V., enterprise drone service provider.`}
        path={`/news/${post.id}`}
        type="article"
        translated={false}
        jsonLd={postJsonLd}
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={reduce ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.33, ease: EASE_OUT }}>
          <Link
            to="/news"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" /> Back to News
          </Link>
        </motion.div>

        {/* Header band matching the card style */}
        <motion.div
          initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
          className="relative h-[140px] rounded-t-xl bg-navy-dark overflow-hidden mb-0"
        >
          <div aria-hidden="true" className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-lime/15 blur-3xl" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-article" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-article)"/>
          </svg>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-lime" />
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-white/70">
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
          </div>
        </motion.div>

        <div className="rounded-b-xl border border-t-0 border-border/60 bg-card p-8 md:p-12 mb-12 shadow-[0_30px_60px_-30px_hsl(210_35%_12%/0.25)]">
          <p className="text-xs text-muted-foreground mb-4 tabular-nums">
            {post.created_date ? format(new Date(post.created_date), 'MMMM d, yyyy') : ''}
          </p>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-7 leading-[1.1] tracking-tight [text-wrap:balance]">
            <MaskLines lines={[post.title]} delay={0.35} />
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.33, ease: EASE_OUT }}
            className="text-lg text-muted-foreground leading-relaxed border-l-2 border-lime pl-5 mb-10"
          >
            {post.excerpt}
          </motion.p>
          <div className="prose max-w-[68ch] text-[15.5px] leading-[1.75]">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="text-muted-foreground leading-[1.75] mb-5">{children}</p>,
                h2: ({ children }) => <h2 className="font-display font-bold text-2xl text-foreground mt-12 mb-4 tracking-tight">{children}</h2>,
                h3: ({ children }) => <h3 className="font-display font-semibold text-lg text-foreground mt-6 mb-3">{children}</h3>,
                ul: ({ children }) => <ul className="space-y-2 ml-4 list-disc text-muted-foreground mb-4">{children}</ul>,
                ol: ({ children }) => <ol className="space-y-2 ml-4 list-decimal text-muted-foreground mb-4">{children}</ol>,
                li: ({ children }) => <li className="text-muted-foreground leading-relaxed">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                table: ({ children }) => <div className="overflow-x-auto mb-6"><table className="w-full text-sm border-collapse">{children}</table></div>,
                th: ({ children }) => <th className="text-left px-3 py-2 border border-border/50 bg-secondary/50 font-semibold text-foreground text-xs uppercase tracking-wider">{children}</th>,
                td: ({ children }) => <td className="px-3 py-2 border border-border/50 text-muted-foreground">{children}</td>,
                a: ({ children, ...props }) => <a {...props} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
              }}
            >
              {post.content || ''}
            </ReactMarkdown>
          </div>
        </div>

        {relatedService && (
          <Reveal className="mb-12 p-6 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 justify-between">
            <p className="text-sm text-muted-foreground">
              Learn more about our <span className="font-semibold text-foreground">{relatedService.name}</span> services.
            </p>
            <Link
              to={relatedService.path}
              className="inline-flex items-center gap-1.5 shrink-0 text-sm font-semibold text-primary hover:underline"
            >
              View {relatedService.name} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Reveal>
        )}

        <RelatedArticles current={post} articles={SAMPLE_ARTICLES} categoryLabel={CATEGORY_LABELS[post.category]} />

        <Reveal className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-5 pt-8 border-t border-border/60">
          <Link
            to="/news"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" /> Back to all articles
          </Link>
          <Magnetic>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 text-sm font-semibold font-display tracking-wide bg-lime text-obsidian hover:bg-lime/90 btn-shine transition-all duration-300 rounded"
          >
            Book a 15-Min Assessment
          </Link>
          </Magnetic>
        </Reveal>
      </div>
    </div>
  );
}
