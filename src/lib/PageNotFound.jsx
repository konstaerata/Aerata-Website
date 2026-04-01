// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-6">
        <div className="font-mono text-primary/30 text-sm mb-4">[ERROR // PAGE NOT FOUND]</div>
        <h1 className="font-barlow font-bold text-8xl text-foreground mb-4">404</h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          The coordinates you're looking for don't exist in our airspace.
        </p>
        <Link to="/"
          className="inline-flex items-center px-8 py-3 font-barlow font-semibold text-sm tracking-wide border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded"
        >
          Return to Base
        </Link>
      </div>
    </div>
  );
}