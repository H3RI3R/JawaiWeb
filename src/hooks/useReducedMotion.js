import { useEffect, useState } from 'react';

/**
 * Tracks the user's prefers-reduced-motion setting live, so components can
 * branch away from parallax / scroll-linked / decorative motion.
 */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const listener = (e) => setReduced(e.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);

  return reduced;
}
