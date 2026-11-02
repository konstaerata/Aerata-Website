// @ts-nocheck
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useOffscreenPause } from '../../hooks/useOffscreenPause';
import { mediaUrl } from '../../lib/media';

/**
 * Muted, looping background video that only plays while on screen (and
 * never under prefers-reduced-motion, where it shows its poster instead).
 * Drop-in for `<video autoPlay muted loop playsInline …>`.
 * Heroes pass `pauseBelow` so the video freezes once the visitor scrolls.
 */
const AutoVideo = forwardRef(function AutoVideo({ src, poster, preload = 'metadata', pauseBelow, ...rest }, ref) {
  const reduce = useReducedMotion();
  const videoRef = useRef(null);
  useImperativeHandle(ref, () => videoRef.current);
  useOffscreenPause(videoRef, !reduce, { pauseBelow });

  return (
    <video
      ref={videoRef}
      src={reduce ? undefined : src}
      poster={poster ? mediaUrl(poster, { width: 1600 }) : undefined}
      muted
      loop
      playsInline
      preload={reduce ? 'none' : preload}
      {...rest}
    />
  );
});

export default AutoVideo;
