// @ts-nocheck
import React, { useState, useRef, useCallback } from 'react';
import { SlotPlaceholder } from './MediaSlot';

/**
 * Before/after comparison: drag (or use arrow keys) to reveal the `before`
 * image over the `after` image. Same interaction as the original thermal
 * slider. When either image is missing, shows the two placeholder boxes
 * describing the pair that is wanted.
 */
export default function CompareSlider({ pair, title }) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef(null);

  const updatePos = useCallback((clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onKeyDown = useCallback((e) => {
    const step = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 }[e.key];
    if (step !== undefined) { e.preventDefault(); setPos((p) => Math.min(100, Math.max(0, p + step))); }
    if (e.key === 'Home') { e.preventDefault(); setPos(0); }
    if (e.key === 'End') { e.preventDefault(); setPos(100); }
  }, []);

  if (!pair) return null;
  const { before, after } = pair;

  if (!before.src || !after.src) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[before, after].map((side, i) => (
          <div key={i} className="aspect-[16/10]">
            <SlotPlaceholder
              id={`${pair.id} · ${i ? 'After' : 'Before'} slider`}
              desc={`${side.label}: ${side.desc}`}
            />
          </div>
        ))}
      </div>
    );
  }

  const tag = 'absolute bottom-3 px-2 py-1 rounded text-[10px] font-mono font-semibold text-white tracking-wider uppercase';

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label={title}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-valuetext={`${Math.round(pos)}% ${before.label}`}
      onKeyDown={onKeyDown}
      onMouseDown={(e) => updatePos(e.clientX)}
      onMouseMove={(e) => { if (e.buttons === 1) updatePos(e.clientX); }}
      onTouchStart={(e) => updatePos(e.touches[0].clientX)}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
      className="relative w-full aspect-[16/7] max-h-[480px] rounded-xl overflow-hidden border border-border/50 cursor-col-resize select-none touch-pan-y shadow-[0_24px_50px_-24px_hsl(210_35%_12%/0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
    >
      <div className="absolute inset-0">
        <img src={after.src} alt={after.label} className="w-full h-full object-cover" draggable={false} />
        <div className={`${tag} right-3 bg-orange-500/80`}>{after.label}</div>
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before.src} alt={before.label} className="w-full h-full object-cover" draggable={false} />
        <div className={`${tag} left-3 bg-primary/80`}>{before.label}</div>
      </div>
      <div className="absolute top-0 bottom-0 w-px bg-white/90 pointer-events-none shadow-[0_0_12px_2px_hsl(0_0%_100%/0.35)]" style={{ left: `${pos}%` }} />
      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white border-2 border-lime flex items-center justify-center pointer-events-none shadow-[0_8px_24px_-6px_hsl(210_35%_12%/0.5)]" style={{ left: `${pos}%` }}>
        <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-primary" aria-hidden="true">
          <path d="M6 10H14M6 10L3 7M6 10L3 13M14 10L17 7M14 10L17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
