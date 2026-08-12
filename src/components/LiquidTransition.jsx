import { useEffect, useId, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion.js';

/**
 * A full-width organic warp band used between major sections. Uses an SVG
 * <filter> with feTurbulence + feDisplacementMap to distort a soft gold
 * gradient blob, animating the turbulence seed for a heat-wave / liquid
 * feel. This runs on the SVG/CSS compositor rather than WebGL — see
 * "Known trade-offs" in the project README for why, and how to swap in a
 * real fragment shader (ogl / react-three-fiber) later.
 */
export default function LiquidTransition({ height = 180 }) {
  const filterId = useId();
  const turbRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !turbRef.current) return;
    let frame;
    let seed = 0;
    const animate = () => {
      seed += 0.4;
      turbRef.current?.setAttribute('seed', String(seed % 100));
      frame = requestAnimationFrame(animate);
    };
    if (inView) frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height }} aria-hidden="true">
      <svg width="0" height="0">
        <filter id={filterId}>
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0.008 0.02"
            numOctaves="2"
            seed="1"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={reducedMotion ? 0 : 40} />
        </filter>
      </svg>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
        style={{
          filter: `url(#${filterId})`,
          background:
            'radial-gradient(60% 140% at 50% 50%, rgba(212,162,76,0.18) 0%, rgba(212,162,76,0.04) 45%, rgba(10,11,13,0) 75%)',
        }}
      />
    </div>
  );
}
