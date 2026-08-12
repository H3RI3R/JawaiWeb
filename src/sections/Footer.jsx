import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion.js';

const LINKS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
  { label: 'TripAdvisor', href: 'https://tripadvisor.com' },
];

export default function Footer() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const textureY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [40, -40]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-sand/10 bg-void px-6 py-16 sm:px-10">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          y: textureY,
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #F4F1EA 0 1px, transparent 2px), radial-gradient(circle at 60% 70%, #F4F1EA 0 1px, transparent 2px), radial-gradient(circle at 85% 20%, #F4F1EA 0 1px, transparent 2px)',
          backgroundSize: '140px 140px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl uppercase tracking-tight text-sand">Jawai Wild</p>
          <p className="mt-2 max-w-xs text-sm text-sand/50">
            Sumerpur Road, Jawai Bandh, Pali District, Rajasthan 306702
          </p>
        </div>

        <nav aria-label="Social links" className="flex gap-6">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="text-sm uppercase tracking-wideish text-sand/50 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="relative mx-auto mt-12 max-w-6xl border-t border-sand/10 pt-6 text-xs text-sand/30">
        © {new Date().getFullYear()} Jawai Wild. All sightings are wild and never guaranteed.
      </div>
    </footer>
  );
}
