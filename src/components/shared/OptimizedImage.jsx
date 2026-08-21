import React, { useState } from 'react';
import { mediaUrl, mediaSrcSet, MEDIA_TRANSFORMS_ENABLED } from '@/lib/media';

/**
 * Drop-in replacement for <img> that:
 * - emits responsive AVIF/WebP srcset + sizes once MEDIA_TRANSFORMS_ENABLED
 *   is true (see src/lib/media.js), and degrades gracefully to a single
 *   <img src> until then
 * - always sets width/height to prevent layout shift
 * - defaults to lazy/async/low-priority loading unless marked `priority`
 * - fades in on load, optionally over a solid placeholder color
 *
 * Usage:
 *   <OptimizedImage src={MEDIA.renewable_hero_image} alt="Solar farm" width={1920} height={1080} priority />
 *   <OptimizedImage src={MEDIA.fleet_p1_image} alt="DJI P1" width={800} height={600} sizes="(min-width: 1024px) 33vw, 100vw" />
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  priority = false,
  placeholderColor = '#0a1a1f',
  className = '',
  imgClassName = '',
  style,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);

  const finalSrc = mediaUrl(src, { width });
  const srcSet = mediaSrcSet(src);

  return (
    <span
      className={`relative block overflow-hidden ${className}`}
      style={{ backgroundColor: placeholderColor, aspectRatio: width && height ? `${width} / ${height}` : undefined, ...style }}
    >
      <img
        src={finalSrc}
        srcSet={srcSet || undefined}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        {...rest}
      />
    </span>
  );
}

export { MEDIA_TRANSFORMS_ENABLED };
