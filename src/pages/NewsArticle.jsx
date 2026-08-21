// @ts-nocheck
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
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
    <div className="pt-32 pb-20">
      <SEO
        title={`${post.title} — Aerata B.V.`}
        description={post.excerpt || `Read about ${post.title} from Aerata B.V., enterprise drone service provider.`}
        path={`/news/${post.id}`}
        type="article"
        jsonLd={postJsonLd}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>

        {/* Header band matching the card style */}
        <div className="relative h-[120px] rounded-t-xl bg-navy-dark overflow-hidden mb-0">
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
        </div>

        <div className="rounded-b-xl border border-t-0 border-border/50 bg-card p-8 mb-10">
          <p className="text-xs text-muted-foreground mb-4 tabular-nums">
            {post.created_date ? format(new Date(post.created_date), 'MMMM d, yyyy') : ''}
          </p>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4 mb-8 italic">
            {post.excerpt}
          </p>
          <div className="prose max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>,
                h2: ({ children }) => <h2 className="font-display font-bold text-xl text-foreground mt-8 mb-4">{children}</h2>,
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
          <div className="mb-10 p-5 rounded-lg border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 justify-between">
            <p className="text-sm text-muted-foreground">
              Learn more about our <span className="font-semibold text-foreground">{relatedService.name}</span> services.
            </p>
            <Link
              to={relatedService.path}
              className="inline-flex items-center gap-1.5 shrink-0 text-sm font-semibold text-primary hover:underline"
            >
              View {relatedService.name} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        <RelatedArticles current={post} articles={SAMPLE_ARTICLES} categoryLabel={CATEGORY_LABELS[post.category]} />

        <div className="flex items-center justify-between">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold font-display tracking-wide bg-lime text-white hover:bg-lime/90 transition-all duration-300 rounded"
          >
            Book a 15-Min Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}
