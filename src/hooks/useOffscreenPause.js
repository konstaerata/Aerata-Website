import { useEffect } from 'react';
import { usePageY } from '../lib/scroll';

/** Scroll distance (px) after which hero videos freeze. */
export const HERO_VIDEO_PAUSE_BELOW = 24;

/**
 * Plays a background <video> only while it is on screen. A hero video that
 * keeps decoding after it has scrolled away competes with scrolling for the
 * GPU and is the main source of dropped frames on long pages.
 *
 * `pauseBelow` (px) also freezes the video once the page has scrolled past
 * that point and resumes it back above it. Used for hero videos: a ~30 fps
 * picture sliding with a 144 Hz scroll reads as judder, while a still frame
 * scrolls away cleanly.
 *
 * @param {React.RefObject<HTMLVideoElement>} ref
 * @param {boolean} enabled  pass false (e.g. under reduced motion) to never autoplay
 * @param {{ pauseBelow?: number }} [options]
 */
export function useOffscreenPause(ref, enabled = true, { pauseBelow } = {}) {
  const pageY = usePageY();

  useEffect(() => {
    const video = ref.current;
    if (!video || !enabled) return;
    let onScreen = false;
    let scrolledAway = pauseBelow != null && pageY.get() > pauseBelow;

    const play = () => { video.play().catch(() => {}); };
    const sync = () => {
      if (onScreen && !scrolledAway && !document.hidden) {
        if (video.readyState >= 2) play();
        else video.addEventListener('canplay', play, { once: true });
      } else {
        video.removeEventListener('canplay', play);
        video.pause();
      }
    };

    const obs = new IntersectionObserver(
      ([entry]) => { onScreen = entry.isIntersecting; sync(); },
      { threshold: 0.05 }
    );
    obs.observe(video);
    const unsubscribe = pauseBelow == null ? null : pageY.on('change', (y) => {
      const away = y > pauseBelow;
      if (away !== scrolledAway) { scrolledAway = away; sync(); }
    });
    document.addEventListener('visibilitychange', sync);
    return () => {
      obs.disconnect();
      unsubscribe?.();
      document.removeEventListener('visibilitychange', sync);
      video.removeEventListener('canplay', play);
    };
  }, [ref, enabled, pauseBelow, pageY]);
}
