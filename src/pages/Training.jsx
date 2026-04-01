// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ExternalLink, Award, BookOpen, Users } from 'lucide-react';

export default function Training() {
  return (
    <div>
      <section className="relative py-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-px bg-primary" />
              <span className="text-xs font-barlow font-semibold tracking-[0.25em] uppercase text-primary">Training</span>
            </div>
            <h1 className="font-barlow font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-3xl mb-8">
              Drone Pilot<br /><span className="text-primary">Training & Licensing</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Get certified to fly commercially with EU-compliant drone pilot training. 
              Our partnership with DroneLicense.eu provides comprehensive courses from 
              beginner to advanced operations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Award, title: 'EU Certified', desc: 'Training aligned with EASA regulations for commercial drone operations across Europe.' },
              { icon: BookOpen, title: 'Comprehensive Curriculum', desc: 'From theory to practical flight training covering all aspects of professional drone piloting.' },
              { icon: Users, title: 'Expert Instructors', desc: 'Learn from experienced commercial pilots with thousands of flight hours.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="p-8 rounded-lg border border-border/50 bg-card/30"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-barlow font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-barlow font-bold text-3xl text-foreground mb-4">
              Start Your Drone Career Today
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Visit our training partner DroneLicense.eu to explore available courses, 
              schedules, and certification pathways.
            </p>
            <a href="https://www.dronelicense.eu/?ref=AERATA" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 font-barlow font-semibold text-sm tracking-wide border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded glow-pulse"
            >
              Visit DroneLicense.eu <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}