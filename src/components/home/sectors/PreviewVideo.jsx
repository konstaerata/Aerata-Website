import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Hover preview clip. Nothing is mounted until the first time `playing`
 * becomes true; afterwards the element stays mounted but is display:none
 * whenever it isn't playing, so idle previews cost no compositing layer.
 */
export default function PreviewVideo({ src, playing, className = 'absolute inset-0 w-full h-full object-cover' }) {
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (playing && src && !reduce) setArmed(true);
  }, [playing, src, reduce]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    if (playing) {
      v.style.display = 'block';
      v.play().catch(() => {});
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    setShown(false);
    v.pause();
    const id = setTimeout(() => { v.style.display = 'none'; v.currentTime = 0; }, 320);
    return () => clearTimeout(id);
  }, [playing, armed]);

  if (!armed) return null;
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      style={{ display: 'none' }}
      className={`${className} pointer-events-none transition-opacity duration-300 ${shown ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}
