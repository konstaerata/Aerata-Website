import React, { useState, useMemo } from 'react';
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
 * The wrapper only reserves an aspect-ratio box when the caller isn't
 * already sizing the box itself (e.g. `absolute inset-0` hero fills, or a
 * fixed-height parent) — otherwise the two sizing rules fight and force
 * extra layout/paint work, which is especially visible on scroll-tied or
 * hover-scale animations (framer-motion parallax, group-hover:scale-*).
 * Pass `fill` explicitly to force absolute-fill mode.
 *
 * Usage:
 *   <OptimizedImage src={MEDIA.renewable_hero_image} alt="Solar farm" width={1920} height={1080} priority fill />
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
  fill = false,
  className = '',
  imgClassName = '',
  style = undefined,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);

  const finalSrc = useMemo(() => mediaUrl(src, { width }), [src, width]);
  const srcSet = useMemo(() => mediaSrcSet(src), [src]);

  const wrapperClassName = fill
    ? `absolute inset-0 overflow-hidden ${className}`
    : `relative block overflow-hidden ${className}`;

  // Passed via spread rather than a direct JSX attribute: eslint-plugin-react
  // and @types/react both expect the camelCase `fetchPriority`, but the
  // installed react-dom (18.3.1) warns on that at runtime and expects the
  // lowercase DOM attribute name instead (verified via live browser render).
  // Spreading an untyped object sidesteps both static tools while still
  // rendering the attribute the actual runtime wants.
  const fetchPriorityProp = { fetchpriority: priority ? 'high' : 'low' };

  return (
    <span
      className={wrapperClassName}
      style={{
        backgroundColor: placeholderColor,
        aspectRatio: !fill && width && height ? `${width} / ${height}` : undefined,
        ...style,
      }}
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
        {...fetchPriorityProp}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        {...rest}
      />
    </span>
  );
}

export { MEDIA_TRANSFORMS_ENABLED };
