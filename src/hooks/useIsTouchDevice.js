import { useEffect, useState } from 'react';

/**
 * True on touch / coarse-pointer devices. Used to disable the custom
 * cursor, cursor trail, and magnetic-hover effects, all of which assume a
 * mouse.
 */
export default function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsTouch(!query.matches);
    const listener = (e) => setIsTouch(!e.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);

  return isTouch;
}
