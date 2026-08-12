import { motion } from 'framer-motion';
import species from '../data/species.js';
import CountUp from '../components/CountUp.jsx';
import { RosetteDivider } from '../components/RosetteDivider.jsx';

export default function StatsSection() {
  return (
    <section id="stats" className="bg-void px-6 py-24 sm:px-10 lg:py-32" aria-label="Species facts">
      <div className="mx-auto max-w-6xl">
        <RosetteDivider label="Field notes" />
        <h2 className="mt-4 max-w-xl font-display text-4xl uppercase leading-[0.9] tracking-tightest text-sand sm:text-6xl">
          Know what you're looking at
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {species.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-sand/10 bg-void-soft transition-all duration-300 hover:border-gold/40"
            >
              {/* Species Image Header */}
              {s.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void-soft via-transparent to-transparent" />
                </div>
              )}

              <div className="flex flex-1 flex-col justify-between p-6 pt-3">
                <div>
                  <p className="font-mono text-[11px] italic text-sand/40">{s.latin}</p>
                  <h3 className="mt-1 font-display text-xl uppercase tracking-tight text-sand">{s.name}</h3>

                  <dl className="mt-6 space-y-3">
                    <div className="flex items-baseline justify-between border-t border-sand/10 pt-3">
                      <dt className="text-xs uppercase tracking-wideish text-sand/40">Top speed</dt>
                      <dd className="font-mono text-base text-gold">
                        <CountUp value={s.stats.speed} suffix={` ${s.stats.speedUnit}`} />
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-sand/10 pt-3">
                      <dt className="text-xs uppercase tracking-wideish text-sand/40">Population</dt>
                      <dd className="font-mono text-base text-gold">
                        <CountUp value={s.stats.population} suffix={` ${s.stats.populationUnit}`} />
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-sand/10 pt-3">
                      <dt className="text-xs uppercase tracking-wideish text-sand/40">Lifespan</dt>
                      <dd className="font-mono text-base text-gold">
                        <CountUp value={s.stats.lifespan} suffix={` ${s.stats.lifespanUnit}`} />
                      </dd>
                    </div>
                  </dl>
                </div>

                <p className="mt-6 text-xs leading-relaxed text-sand/60">{s.fact}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
