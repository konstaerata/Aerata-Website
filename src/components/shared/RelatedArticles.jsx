// @ts-nocheck
import React from 'react';
import { Link } from '@/components/LocalizedLink';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, Item, Spotlight } from '../motion';

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
    <div className="mb-12">
      <Reveal as="h2" className="font-display font-bold text-2xl text-foreground mb-6 tracking-tight">More {categoryLabel ? `on ${categoryLabel}` : 'Articles'}</Reveal>
      <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((article) => (
          <Item key={article.id} className="h-full">
          <Spotlight
            as={Link}
            tone="navy"
            to={`/news/${article.id}`}
            className="group flex flex-col h-full p-5 rounded-xl border border-border/60 bg-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_18px_36px_-18px_hsl(210_35%_12%/0.28)]"
          >
            <p className="text-[10px] text-muted-foreground mb-2 tabular-nums">
              {article.created_date ? format(new Date(article.created_date), 'MMM d, yyyy') : ''}
            </p>
            <h3 className="font-display font-semibold text-foreground text-sm leading-snug mb-4 flex-1 line-clamp-3 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
              Read <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Spotlight>
          </Item>
        ))}
      </Stagger>
    </div>
  );
}
