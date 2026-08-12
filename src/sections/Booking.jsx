import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton.jsx';
import { RosetteDivider } from '../components/RosetteDivider.jsx';

const CONTACT_METHODS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    detail: '+91 98765 43210',
    href: 'https://wa.me/919876543210',
  },
  {
    id: 'call',
    label: 'Call the camp',
    detail: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    id: 'pay',
    label: 'Pay a deposit',
    detail: 'Secure online payment',
    href: '#',
  },
];

export default function Booking() {
  return (
    <section id="booking" className="relative overflow-hidden bg-void-soft px-6 py-24 sm:px-10 lg:py-32" aria-label="Book your safari">
      <div className="mx-auto max-w-5xl text-center">
        <div className="flex justify-center">
          <RosetteDivider label="Reserve your seat" />
        </div>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-5xl uppercase leading-[0.85] tracking-tightest text-sand sm:text-7xl">
          The hills are waiting
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sand/60">
          Vehicles are kept small and drives are timed around real leopard activity. Book a few days ahead in peak winter months.
        </p>

        <div className="mt-10 flex justify-center">
          <MagneticButton label="Book Your Safari" />
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {CONTACT_METHODS.map((m, i) => (
            <motion.a
              key={m.id}
              href={m.href}
              target={m.id === 'whatsapp' ? '_blank' : undefined}
              rel={m.id === 'whatsapp' ? 'noreferrer' : undefined}
              data-cursor-hover
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-xl border border-sand/10 bg-void px-6 py-6 text-left transition-colors hover:border-gold/50"
            >
              <p className="text-xs uppercase tracking-wideish text-gold">{m.label}</p>
              <p className="mt-2 font-mono text-sm text-sand/70">{m.detail}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
