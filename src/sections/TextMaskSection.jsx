import { useEffect, useId, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../hooks/useReducedMotion.js';

gsap.registerPlugin(ScrollTrigger);

// Swappable — replace with a licensed 4K wildlife loop.
const VIDEO_SRC =
  'https://assets.mixkit.co/videos/preview/mixkit-leopard-lying-in-the-grass-4838-large.mp4';
const POSTER_SRC =
  'https://images.unsplash.com/photo-1534759846116-5799c33ce22a?q=80&w=1600&auto=format&fit=crop';

/**
 * Giant "INTO THE WILD" heading with looping video footage clipped inside
 * the letterforms. Real text-masking (not a background-image trick): the
 * video sits in normal flow and an SVG <clipPath> built from <text>
 * cuts it down to just the glyph shapes, so the footage is genuinely
 * visible only inside the type.
 */
export default function TextMaskSection() {
  const sectionRef = useRef(null);
  const scaleTargetRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const clipId = useId();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      // Pinning is the one thing Framer Motion can't do cleanly (locking
      // the section in the viewport while driving a separate scale
      // timeline), so GSAP + ScrollTrigger takes over here.
      gsap.to(scaleTargetRef.current, {
        scale: 3.2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 0.6,
          pin: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="into-the-wild"
      className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-void"
      aria-label="Into the wild"
    >
      <div ref={scaleTargetRef} className="relative h-[36vh] w-[92vw] max-w-5xl will-change-transform">
        <svg viewBox="0 0 1000 200" className="h-full w-full" aria-hidden="true">
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <text
                x="50%"
                y="72%"
                textAnchor="middle"
                fontFamily="Anton"
                fontSize="150"
                letterSpacing="4"
              >
                INTO THE WILD
              </text>
            </clipPath>
          </defs>
          <foreignObject width="1000" height="200" clipPath={`url(#${clipId})`}>
            <video
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              autoPlay
              preload="none"
              poster={POSTER_SRC}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          </foreignObject>
        </svg>
        <h2 className="sr-only">Into the Wild</h2>
      </div>
    </section>
  );
}
