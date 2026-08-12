import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import packages from '../data/packages.js';
import { RosetteDivider } from '../components/RosetteDivider.jsx';

export default function Packages() {
  const [activeId, setActiveId] = useState(null);
  const active = packages.find((p) => p.id === activeId);

  const handleScrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="packages" className="relative bg-void px-6 py-24 sm:px-10 lg:py-32" aria-label="Safari packages">
      <div className="mx-auto max-w-7xl">
        <RosetteDivider label="Safaris" />
        <h2 className="mt-4 max-w-2xl font-display text-4xl uppercase leading-[0.9] tracking-tightest text-sand sm:text-6xl">
          Choose your window into the hills
        </h2>
        <p className="mt-5 max-w-lg text-sand/60">
          Every drive is capped at a small group size and led by a naturalist who tracks these cats year-round.
        </p>

        {/* Portrait Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-sand/10 bg-void-soft transition-all duration-300 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/5"
            >
              {/* Card Image Header */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-soft via-void-soft/20 to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4">
                  <span className="rounded-full border border-gold/40 bg-void/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold backdrop-blur-md">
                    {pkg.badge}
                  </span>
                </div>
              </div>

              {/* Card Main Content */}
              <div className="flex flex-1 flex-col justify-between p-6 pt-2">
                <div>
                  {/* Timing Pill */}
                  <div className="mb-3 flex items-center gap-2 text-xs font-mono text-gold/90">
                    <span>{pkg.duration}</span>
                    <span>·</span>
                    <span>{pkg.time}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display text-2xl uppercase tracking-tight text-sand">
                    {pkg.name}
                  </h3>
                  {pkg.subtitle && (
                    <p className="text-xs text-sand/50 uppercase tracking-wider font-mono mt-0.5">
                      {pkg.subtitle}
                    </p>
                  )}

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-1.5 border-b border-sand/10 pb-4">
                    <span className="font-mono text-2xl font-bold text-sand">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-sand/50">{pkg.unit}</span>
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="mt-4 space-y-2 text-xs text-sand/75">
                    {pkg.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-0.5 text-gold shrink-0">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions Footer */}
                <div className="mt-6 border-t border-sand/10 pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleScrollToBooking}
                      data-cursor-hover
                      className="flex-1 rounded-xl bg-gold py-2.5 text-center text-xs font-bold uppercase tracking-wider text-void transition-colors hover:bg-gold-bright"
                    >
                      Book Now
                    </button>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      title="Chat on WhatsApp"
                      className="rounded-xl border border-sand/15 bg-void px-3 py-2.5 text-xs font-semibold text-sand transition-colors hover:border-gold hover:text-gold"
                    >
                      WA
                    </a>
                    <a
                      href="tel:+919876543210"
                      data-cursor-hover
                      title="Call Us"
                      className="rounded-xl border border-sand/15 bg-void px-3 py-2.5 text-xs font-semibold text-sand transition-colors hover:border-gold hover:text-gold"
                    >
                      Call
                    </a>
                    <button
                      type="button"
                      onClick={handleScrollToBooking}
                      data-cursor-hover
                      title="Pay Deposit"
                      className="rounded-xl border border-sand/15 bg-void px-3 py-2.5 text-xs font-semibold text-sand transition-colors hover:border-gold hover:text-gold"
                    >
                      Pay
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
