import { motion } from 'framer-motion';
import { useState } from 'react';
import useMagneticButton from '../hooks/useMagneticButton.js';
import useReducedMotion from '../hooks/useReducedMotion.js';

export default function MagneticButton({ label = 'Book Your Safari', onClick, className = '' }) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagneticButton({ strength: 0.3, radius: 90 });
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      ref={ref}
      type="button"
      data-cursor-hover
      onClick={onClick}
      onMouseMove={reducedMotion ? undefined : onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        onMouseLeave();
      }}
      style={reducedMotion ? {} : { x, y }}
      className={
        'group relative inline-flex h-16 min-w-[220px] items-center justify-center overflow-hidden rounded-full border border-gold/70 bg-gold px-8 text-sm font-semibold uppercase tracking-wideish text-void transition-colors duration-300 hover:bg-transparent hover:text-gold ' +
        className
      }
    >
      <span className="relative flex items-center gap-3">
        <span
          className={`transition-all duration-300 ${hovered ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'} overflow-hidden whitespace-nowrap`}
        >
          {label}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${hovered ? 'translate-x-0' : '-translate-x-6'}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.button>
  );
}
