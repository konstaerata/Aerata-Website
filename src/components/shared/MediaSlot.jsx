// @ts-nocheck
import React from 'react';
import { ImagePlus } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { useLang } from '../../lib/LanguageContext';

/**
 * An image position on a page. With a `src` it renders the photo; without
 * one it renders a placeholder box naming the slot id and the photo it
 * wants, so missing images are visible and easy to brief. Slots are
 * defined in lib/sectors.js and pages/Services.jsx.
 */
export function SlotPlaceholder({ id, desc, dark = false, className = '' }) {
  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center border-2 border-dashed rounded-xl ${
        dark ? 'border-lime/40 bg-obsidian text-white/80' : 'border-primary/25 bg-secondary/40 text-muted-foreground'
      } ${className}`}
    >
      <ImagePlus className={`w-7 h-7 ${dark ? 'text-lime' : 'text-primary/60'}`} aria-hidden="true" />
      {id && (
        <span className={`font-mono text-[11px] tracking-[0.2em] uppercase ${dark ? 'text-lime' : 'text-[hsl(88_55%_24%)]'}`}>
          Photo needed · {id}
        </span>
      )}
      {desc && <p className="text-sm leading-relaxed max-w-sm">{desc}</p>}
    </div>
  );
}

export default function MediaSlot({ slot, alt, ratio = 'aspect-[4/3]', className = '', sizes = '(min-width: 1024px) 40vw, 100vw' }) {
  const { t } = useLang();
  if (!slot) return null;
  return (
    <div className={`relative w-full ${ratio} rounded-xl overflow-hidden ${className}`}>
      {slot.src ? (
        <>
          <OptimizedImage src={slot.src} alt={slot.ai ? slot.desc : alt || slot.desc || ''} width={1200} height={900} fill sizes={sizes} />
          {/* AI-generated images are labelled visibly (EU AI Act art. 50). */}
          {slot.ai && <span className="absolute left-3 bottom-3 px-2 py-1 rounded bg-obsidian/85 text-white text-[11px] font-mono tracking-wide">{t('common.aiIllustration')}</span>}
        </>
      ) : (
        <SlotPlaceholder id={slot.id} desc={slot.desc} />
      )}
    </div>
  );
}
