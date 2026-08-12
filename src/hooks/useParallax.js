import { useRef } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Drives the hero's 3-layer depth parallax: background moves slowest,
 * the leopard cut-out moves fastest, headline text sits in between.
 * Distances are expressed in vh-equivalent px offsets and springed for
 * inertia so the motion doesn't feel like it's snapping to the scrollbar.
 */
export default function useParallax({ disabled = false } = {}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  const bgY = useTransform(smooth, [0, 1], disabled ? [0, 0] : [0, 120]);
  const subjectY = useTransform(smooth, [0, 1], disabled ? [0, 0] : [0, 320]);
  const textY = useTransform(smooth, [0, 1], disabled ? [0, 0] : [0, 200]);
  const heroOpacity = useTransform(smooth, [0, 0.85], [1, 0]);
  const heroScale = useTransform(smooth, [0, 1], disabled ? [1, 1] : [1, 1.12]);

  return { ref, bgY, subjectY, textY, heroOpacity, heroScale, scrollYProgress: smooth };
}
