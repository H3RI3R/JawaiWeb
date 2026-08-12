import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Swappable ambient nature sound loop
const AMBIENT_SRC = 'https://raw.githubusercontent.com/karthiknvd/noctune/master/sounds/forest.mp3';

const BARS = [0.4, 0.9, 0.6, 1, 0.5, 0.8, 0.45];

export default function AudioToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.volume = 0.35;
      audio.play().catch(() => {});
    }
    setPlaying((p) => !p);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} src={AMBIENT_SRC} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        data-cursor-hover
        aria-pressed={playing}
        aria-label={playing ? 'Mute ambient nature audio' : 'Play ambient nature audio'}
        className="flex h-14 w-14 items-center justify-center gap-[3px] rounded-full border border-gold/40 bg-void-soft/80 backdrop-blur-sm transition-colors hover:border-gold"
      >
        {BARS.map((h, i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-gold"
            animate={
              playing
                ? { height: [`${h * 6}px`, `${h * 18}px`, `${h * 6}px`] }
                : { height: '4px' }
            }
            transition={
              playing
                ? { duration: 0.9 + i * 0.07, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
          />
        ))}
      </button>
    </div>
  );
}
