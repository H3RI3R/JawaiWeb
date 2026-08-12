import { useState } from 'react';
import { motion } from 'framer-motion';
import seasons from '../data/seasons.js';
import { RosetteDivider } from '../components/RosetteDivider.jsx';

export default function MigrationMap() {
  const [activeId, setActiveId] = useState(seasons[0].id);
  const active = seasons.find((s) => s.id === activeId);

  return (
    <section id="map" className="bg-void-soft px-6 py-24 sm:px-10 lg:py-32" aria-label="Seasonal sighting routes">
      <div className="mx-auto max-w-6xl">
        <RosetteDivider label="Territory" />
        <h2 className="mt-4 max-w-xl font-display text-4xl uppercase leading-[0.9] tracking-tightest text-sand sm:text-6xl">
          Where the cats move
        </h2>
        <p className="mt-5 max-w-lg text-sand/60">
          Leopard movement through the hills shifts with heat and water. Pick a season to trace it.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="flex gap-3 lg:flex-col">
            {seasons.map((s) => (
              <button
                key={s.id}
                type="button"
                data-cursor-hover
                onClick={() => setActiveId(s.id)}
                aria-pressed={s.id === activeId}
                className={`flex-1 rounded-xl border px-5 py-4 text-left transition-colors lg:flex-none ${
                  s.id === activeId
                    ? 'border-gold/60 bg-void'
                    : 'border-sand/10 bg-void/40 hover:border-sand/30'
                }`}
              >
                <p className={`font-display text-lg uppercase tracking-tight ${s.id === activeId ? 'text-gold' : 'text-sand'}`}>
                  {s.label}
                </p>
                <p className="mt-1 font-mono text-[11px] text-sand/40">{s.months}</p>
              </button>
            ))}
            <p className="mt-2 hidden text-sm leading-relaxed text-sand/60 lg:block">{active.note}</p>
          </div>

          <div className="rounded-2xl border border-sand/10 bg-void p-4 sm:p-8">
            <svg viewBox="0 0 600 400" className="w-full" role="img" aria-label={`Sighting route for ${active.label}`}>
              <defs>
                <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8A6A32" />
                  <stop offset="100%" stopColor="#E8BE6E" />
                </linearGradient>
              </defs>
              {/* Static terrain contour lines for context */}
              {[80, 160, 240, 320].map((y) => (
                <path
                  key={y}
                  d={`M 20 ${y} Q 300 ${y - 30} 580 ${y}`}
                  stroke="#F4F1EA"
                  strokeOpacity="0.06"
                  fill="none"
                />
              ))}
              <motion.path
                stroke="url(#routeGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                initial={false}
                animate={{ d: active.path }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.circle
                r="6"
                fill="#E8BE6E"
                animate={{ offsetDistance: '100%' }}
                style={{ offsetPath: `path('${active.path}')` }}
                initial={{ offsetDistance: '0%' }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
              />
            </svg>
            <p className="mt-4 text-sm leading-relaxed text-sand/60 lg:hidden">{active.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
