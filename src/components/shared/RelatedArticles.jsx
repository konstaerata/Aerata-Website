// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

/**
 * Related-article links at the bottom of each article — same category
 * first, most recent otherwise. Gives each article page real contextual
 * outbound links beyond the single "back to all articles" link.
 */
export default function RelatedArticles({ current, articles, categoryLabel }) {
  const related = articles
    .filter((a) => a.published && String(a.id) !== String(current.id))
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 0 : 1;
      const bMatch = b.category === current.category ? 0 : 1;
      if (aMatch !== bMatch) return aMatch - bMatch;
      return new Date(b.created_date) - new Date(a.created_date);
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="font-display font-bold text-xl text-foreground mb-5">More {categoryLabel ? `on ${categoryLabel}` : 'Articles'}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((article) => (
          <Link
            key={article.id}
            to={`/news/${article.id}`}
            className="group block p-4 rounded-lg border border-border/50 bg-card/40 hover:border-primary/30 transition-colors"
          >
            <p className="text-[10px] text-muted-foreground mb-2 tabular-nums">
              {article.created_date ? format(new Date(article.created_date), 'MMM d, yyyy') : ''}
            </p>
            <h3 className="font-barlow font-semibold text-foreground text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
              Read <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
