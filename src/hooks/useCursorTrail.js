import { useEffect, useRef } from 'react';

/**
 * Paints a dissipating particle trail on a full-viewport canvas as the
 * cursor moves. Particles are small rotated "leaf" marks (simple ellipses)
 * rather than an image, so there's no extra asset request. Runs a plain
 * requestAnimationFrame loop and is fully torn down on unmount.
 */
export default function useCursorTrail({ enabled = true } = {}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      particles.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        rot: Math.random() * Math.PI,
        size: 4 + Math.random() * 4,
      });
      if (particles.length > 40) particles.shift();
    };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.life * 0.6;
        ctx.fillStyle = '#D4A24C';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        p.life -= 0.035;
      });
      particles = particles.filter((p) => p.life > 0);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [enabled]);

  return canvasRef;
}
