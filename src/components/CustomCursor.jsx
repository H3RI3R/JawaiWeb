import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useIsTouchDevice from '../hooks/useIsTouchDevice.js';
import useReducedMotion from '../hooks/useReducedMotion.js';
import useCursorTrail from '../hooks/useCursorTrail.js';

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const active = !isTouch;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  const canvasRef = useCursorTrail({ enabled: active && !reducedMotion });

  useEffect(() => {
    if (!active) return;
    document.body.classList.add('custom-cursor-active');

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target.closest('a, button, [data-cursor-hover]');
      setHoveringInteractive(Boolean(el));
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <>
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-[90] mix-blend-screen"
          aria-hidden="true"
        />
      )}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] rounded-full border border-gold"
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hoveringInteractive ? 52 : 22,
          height: hoveringInteractive ? 52 : 22,
          backgroundColor: hoveringInteractive ? 'rgba(212,162,76,0.15)' : 'rgba(212,162,76,0)',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
