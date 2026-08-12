import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RosetteDivider } from '../components/RosetteDivider.jsx';

const GALLERY_IMAGES = [
  {
    id: 1,
    url: 'https://ytjfeemeohmgtsvhavkm.supabase.co/storage/v1/object/public/site-media/home_gallery_photo_0/1777218939588.jpeg?v=1777218941420',
    title: 'Majestic Leopard on Granite',
    caption: 'A wild Indian leopard resting atop the ancient granite kopjes of Jawai.',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    id: 2,
    url: 'https://jawaileopardsafritravel.co.in/assets/client-sunset-lake-DNa9Tcsb.webp',
    title: 'Sunset Lake View',
    caption: 'Serene reflections of golden hour across the Jawai dam reservoir.',
    span: 'sm:col-span-1 sm:row-span-1',
  },
  {
    id: 3,
    url: 'https://ytjfeemeohmgtsvhavkm.supabase.co/storage/v1/object/public/site-media/home_gallery_photo_8/1777274468989.jpeg?v=1777274471112',
    title: 'Wilderness Exploration',
    caption: 'Tracking cat pugmarks along the rugged stone terrain.',
    span: 'sm:col-span-1 sm:row-span-1',
  },
  {
    id: 4,
    url: 'https://jawaileopardsafritravel.co.in/assets/client-sunset-jeeps-DBGCH9HM.webp',
    title: 'Sunset Safari Jeeps',
    caption: 'Guests taking in the dramatic horizon from open-top 4x4 safaris.',
    span: 'sm:col-span-2 sm:row-span-1',
  },
  {
    id: 5,
    url: 'https://jawaileopardsafritravel.co.in/assets/jawai-granite-DBS9NKTH.webp',
    title: 'Granite Formations',
    caption: 'Billion-year-old rock formations that shelter Jawai\'s resident cat population.',
    span: 'sm:col-span-1 sm:row-span-2',
  },
  {
    id: 6,
    url: 'https://ytjfeemeohmgtsvhavkm.supabase.co/storage/v1/object/public/site-media/home_gallery_photo_17/1777299507581.jpeg?v=1777299509704',
    title: 'Leopard in Natural Cave',
    caption: 'A quiet encounter with a leopard denning in open rock shelters.',
    span: 'sm:col-span-2 sm:row-span-1',
  },
  {
    id: 7,
    url: 'https://jawaileopardsafritravel.co.in/assets/jawai-landscape-CR2MyNvR.webp',
    title: 'Jawai Landscape',
    caption: 'Expansive wilderness where pastoral Rabari villages and big cats coexist.',
    span: 'sm:col-span-1 sm:row-span-1',
  },
  {
    id: 8,
    url: 'https://jawaileopardsafritravel.co.in/assets/jawai-birds-flying-kjo26_0V.webp',
    title: 'Demoiselle Cranes Flying',
    caption: 'Thousands of migratory cranes soaring over the Jawai reservoir in winter.',
    span: 'sm:col-span-2 sm:row-span-1',
  },
  {
    id: 9,
    url: 'https://ytjfeemeohmgtsvhavkm.supabase.co/storage/v1/object/public/site-media/home_gallery_photo_25/1777217392408.jpeg?v=1777217394576',
    title: 'Unforgettable Safari Moments',
    caption: 'Memories created in Rajasthan\'s leopard sanctuary.',
    span: 'sm:col-span-1 sm:row-span-1',
  },
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const activeImage = selectedIndex !== null ? GALLERY_IMAGES[selectedIndex] : null;

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? 0 : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length));
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % GALLERY_IMAGES.length));
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (selectedIndex === null) return;
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setSelectedIndex(null);
  }, [selectedIndex, handlePrev, handleNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section id="gallery" className="relative bg-void-soft px-6 py-24 sm:px-10 lg:py-32" aria-label="Gallery of Jawai">
      <div className="mx-auto max-w-7xl">
        <RosetteDivider label="Gallery" />
        <h2 className="mt-4 max-w-2xl font-display text-4xl uppercase leading-[0.9] tracking-tightest text-sand sm:text-6xl">
          The Gallery of Jawai
        </h2>
        <p className="mt-5 max-w-2xl text-sand/70 text-base leading-relaxed sm:text-lg">
          A cinematic window into our wilderness — leopards, hills, dams, birds and the moments our guests carry home forever.
        </p>

        {/* Gallery Grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[220px]">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setSelectedIndex(i)}
              data-cursor-hover
              className={`group relative overflow-hidden rounded-2xl border border-sand/10 bg-void cursor-pointer ${img.span}`}
            >
              <img
                src={img.url}
                alt={img.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display text-lg uppercase tracking-tight text-sand sm:text-xl">
                  {img.title}
                </p>
                <p className="text-xs text-sand/60 line-clamp-1 font-sans">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
              className="absolute inset-0 bg-void/95 backdrop-blur-md"
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              data-cursor-hover
              className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-sand/20 bg-void-soft/80 text-2xl text-sand hover:border-gold hover:text-gold transition-colors"
              aria-label="Close image modal"
            >
              ✕
            </button>

            {/* Image Counter */}
            <div className="absolute top-7 left-6 z-50 font-mono text-sm uppercase tracking-widest text-gold/80">
              {selectedIndex + 1} / {GALLERY_IMAGES.length}
            </div>

            {/* Left Nav Button */}
            <button
              type="button"
              onClick={handlePrev}
              data-cursor-hover
              className="absolute left-4 sm:left-8 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-sand/20 bg-void-soft/80 text-2xl text-sand hover:border-gold hover:text-gold transition-all"
              aria-label="Previous image"
            >
              ←
            </button>

            {/* Right Nav Button */}
            <button
              type="button"
              onClick={handleNext}
              data-cursor-hover
              className="absolute right-4 sm:right-8 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-sand/20 bg-void-soft/80 text-2xl text-sand hover:border-gold hover:text-gold transition-all"
              aria-label="Next image"
            >
              →
            </button>

            {/* Active Image Container */}
            <motion.div
              key={activeImage.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative z-40 max-h-[82vh] max-w-[90vw] overflow-hidden rounded-2xl border border-sand/15 bg-void p-2 shadow-2xl"
            >
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain"
              />
              <div className="p-4 text-center">
                <h3 className="font-display text-xl uppercase tracking-tight text-sand sm:text-2xl">
                  {activeImage.title}
                </h3>
                <p className="mt-1 text-sm text-sand/60">
                  {activeImage.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
