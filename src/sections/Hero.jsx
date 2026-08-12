import { useState } from 'react';
import { motion } from 'framer-motion';
import useParallax from '../hooks/useParallax.js';
import useReducedMotion from '../hooks/useReducedMotion.js';
import MagneticButton from '../components/MagneticButton.jsx';

const LEOPARD_SUBJECT =
  'https://images.unsplash.com/photo-1534759846116-5799c33ce22a?q=80&w=1400&auto=format&fit=crop';

const SEASONS = [
  {
    id: 'monsoon',
    label: 'MONSOON',
    bg: 'https://images.unsplash.com/photo-1742107939655-4f8af7484dfa?q=80&w=1800&auto=format&fit=crop',
    subject: LEOPARD_SUBJECT,
    copy: 'Rain-washed granite and grass thick enough to hide a hunt.',
  },
  {
    id: 'winter',
    label: 'WINTER',
    bg: 'https://jawaisafari.org/wp-content/uploads/2025/11/Jawai-in-december.webp',
    subject: LEOPARD_SUBJECT,
    copy: 'Cool mornings, long light, and the highest odds of a sighting.',
  },
  {
    id: 'summer',
    label: 'SUMMER',
    bg: 'https://images.unsplash.com/photo-1780228725489-a4365c63f707?q=80&w=1800&auto=format&fit=crop',
    subject: LEOPARD_SUBJECT,
    copy: 'Cats retreat to shaded caves — patience pays off at the water\'s edge.',
  },
];

export default function Hero({ onBook }) {
  const reducedMotion = useReducedMotion();
  const { ref, bgY, subjectY, textY, heroOpacity, heroScale } = useParallax({ disabled: reducedMotion });
  const [seasonIdx, setSeasonIdx] = useState(0);
  const season = SEASONS[seasonIdx];

  const cycle = (dir) => setSeasonIdx((i) => (i + dir + SEASONS.length) % SEASONS.length);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden bg-void"
      aria-label="Jawai Wild — leopard safaris in Rajasthan"
    >
      {/* Layer 1: background hills — slowest */}
      <motion.div
        style={{ y: reducedMotion ? 0 : bgY, scale: reducedMotion ? 1 : heroScale }}
        className="absolute inset-0"
      >
        <motion.img
          key={season.bg}
          src={season.bg}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/30 to-void" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
      </motion.div>

      {/* Layer 2: headline typography — mid speed */}
      <motion.div
        style={{ y: reducedMotion ? 0 : textY, opacity: heroOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="font-display leading-[0.85] tracking-tightest text-sand flex flex-col items-center">
          <motion.span
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[18vw] sm:text-[13vw] lg:text-[10vw]"
          >
            JAWAI
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="my-3 pl-[0.35em] text-xs font-semibold uppercase tracking-widest2 text-gold sm:text-sm font-sans"
          >
            Leopard Country · Rajasthan
          </motion.p>
          <motion.span
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-outline block text-[9vw] sm:text-[6vw] lg:text-[4.2vw]"
          >
            WILD RAJASTHAN
          </motion.span>
        </h1>
      </motion.div>

      {/* Caption + CTA */}
      <div className="absolute bottom-28 left-6 z-10 max-w-xs sm:bottom-32 sm:left-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mb-5 text-sm text-sand/80"
        >
          {season.copy}
        </motion.p>
        <MagneticButton label="Book Your Safari" onClick={onBook} />
      </div>

      {/* Season slider, bottom-right */}
      <div className="absolute bottom-8 right-6 z-10 flex items-center gap-4 sm:right-10">
        <button
          type="button"
          aria-label="Previous season"
          data-cursor-hover
          onClick={() => cycle(-1)}
          className="text-sand/60 transition-colors hover:text-gold"
        >
          ←
        </button>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wideish">
          {SEASONS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              data-cursor-hover
              onClick={() => setSeasonIdx(i)}
              className={i === seasonIdx ? 'text-gold' : 'text-sand/40 hover:text-sand/70'}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Next season"
          data-cursor-hover
          onClick={() => cycle(1)}
          className="text-sand/60 transition-colors hover:text-gold"
        >
          →
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-sand/40 sm:flex">
        <span className="text-[10px] uppercase tracking-widest2">Scroll</span>
        <motion.span
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="h-8 w-px bg-sand/30"
        />
      </div>
    </section>
  );
}
