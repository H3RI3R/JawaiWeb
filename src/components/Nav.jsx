import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LINKS = [
  { label: 'Safaris', href: '#packages' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Wildlife', href: '#stats' },
  { label: 'Territory', href: '#map' },
  { label: 'Book', href: '#booking' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 transition-colors duration-300 sm:px-10 ${
        scrolled ? 'bg-void/80 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <a
        href="#hero"
        onClick={(e) => handleNavClick(e, '#hero')}
        data-cursor-hover
        className="font-display text-lg uppercase tracking-tight text-sand"
      >
        Jawai Wild
      </a>
      <nav aria-label="Primary" className="hidden gap-8 sm:flex">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={(e) => handleNavClick(e, l.href)}
            data-cursor-hover
            className="text-xs uppercase tracking-wideish text-sand/70 transition-colors hover:text-gold"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <a
        href="#booking"
        onClick={(e) => handleNavClick(e, '#booking')}
        data-cursor-hover
        className="rounded-full border border-gold/50 px-5 py-2 text-xs uppercase tracking-wideish text-gold transition-colors hover:bg-gold hover:text-void"
      >
        Book
      </a>
    </motion.header>
  );
}
