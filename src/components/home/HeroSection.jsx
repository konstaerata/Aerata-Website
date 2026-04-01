// @ts-nocheck
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

// To use a video background, pass heroVideo prop with a direct .mp4 URL
// e.g. heroVideo="https://your-cdn.com/drone-footage.mp4"
// If no video is provided, falls back to heroImage

export default function HeroSection({ heroImage, heroVideo }) {
  const videoRef = useRef(null);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background — video or image */}
      <div className="absolute inset-0">
        {heroVideo ? (
          <video
            ref={videoRef}
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={heroImage} alt="Drone aerial assessment" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />
      </div>

      {/* HUD corner brackets */}
      <div className="absolute top-24 left-6 md:left-12 w-12 h-12 border-l-2 border-t-2 border-lime/30" />
      <div className="absolute top-24 right-6 md:right-12 w-12 h-12 border-r-2 border-t-2 border-lime/30" />
      <div className="absolute bottom-12 left-6 md:left-12 w-12 h-12 border-l-2 border-b-2 border-lime/30" />
      <div className="absolute bottom-12 right-6 md:right-12 w-12 h-12 border-r-2 border-b-2 border-lime/30" />

      {/* Coordinate markers */}
      <div className="absolute top-28 right-10 md:right-16 text-[10px] font-mono text-white/40 hidden md:block">
        52.0116° N, 4.3571° E
      </div>
      <div className="absolute bottom-16 left-10 md:left-16 text-[10px] font-mono text-white/40 hidden md:block">
        ALT: 120M | SPD: 12M/S
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-px bg-lime" />
            <span className="text-xs font-exo font-semibold tracking-[0.3em] uppercase text-lime">
              Where Expertise Takes Flight
            </span>
          </div>
          <h1 className="font-exo font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
            Unlock the<br />
            <span className="text-lime">Potential</span> of Drones.
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mb-10 font-inter">
            Innovative and efficient Aerial Assessment Solutions for businesses and organizations.
          </p>
          <Link to="/contact"
            className="inline-flex items-center px-10 py-4 font-exo font-semibold text-sm tracking-wider uppercase bg-lime text-white hover:bg-lime/90 transition-all duration-300 rounded glow-pulse"
          >
            Schedule Your Drone Inspection Now
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-white/40 tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}