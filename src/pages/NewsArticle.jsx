// @ts-nocheck
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

export default function NewsArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = window.location.pathname.split('/').pop();

  const { data: post, isLoading } = useQuery({
    queryKey: ['blogPost', id],
    queryFn: async () => {
      const posts = await base44.entities.BlogPost.list();
      return posts.find(p => String(p.id) === String(id));
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Article not found.</p>
        <Link to="/news" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link to="/news" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>
        {post.featured_image && (
          <img src={post.featured_image} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-lg border border-border/50 mb-8" />
        )}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold tracking-wider uppercase text-primary">
            {post.category?.replace(/_/g, ' ')}
          </span>
          <span className="text-xs text-muted-foreground">
            {post.created_date ? format(new Date(post.created_date), 'MMMM d, yyyy') : ''}
          </span>
        </div>
        <h1 className="font-barlow font-bold text-3xl md:text-4xl text-foreground mb-8">{post.title}</h1>
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>,
              h2: ({ children }) => <h2 className="font-barlow font-bold text-xl text-foreground mt-8 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="font-barlow font-semibold text-lg text-foreground mt-6 mb-3">{children}</h3>,
              ul: ({ children }) => <ul className="space-y-2 ml-4 list-disc text-muted-foreground">{children}</ul>,
              a: ({ children, ...props }) => <a {...props} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}