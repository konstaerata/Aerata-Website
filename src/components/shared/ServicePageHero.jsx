// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Pass `video` prop with a direct .mp4 URL for video background
export default function ServicePageHero({ title, subtitle, image, video, ctaText = "Get a Free Consultation", ctaLink = "/contact" }) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {video ? (
          <video src={video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-obsidian/40" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-lime" />
            <span className="text-xs font-rajdhani font-semibold tracking-[0.25em] uppercase text-lime">Aerata Services</span>
          </div>
          <h1 className="font-rajdhani font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            {title}
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">{subtitle}</p>
          <Link to={ctaLink}
            className="inline-flex items-center px-8 py-3.5 font-rajdhani font-semibold text-sm tracking-wide bg-lime text-white hover:bg-lime/90 transition-all duration-300 rounded"
          >
            {ctaText}
          </Link>
        </motion.div>
      </div>
      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-primary/20 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-primary/20 hidden md:block" />
    </section>
  );
}