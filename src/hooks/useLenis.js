import { useEffect } from 'react';
import Lenis from 'lenis';
import useReducedMotion from './useReducedMotion.js';

/**
 * Site-wide inertia smooth scrolling. Skipped entirely under
 * prefers-reduced-motion so the browser's native (instant) scroll takes
 * over instead.
 */
export default function useLenis() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reducedMotion]);
}
