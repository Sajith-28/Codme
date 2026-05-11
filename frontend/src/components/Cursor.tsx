import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type Burst = {
  id: number;
  x: number;
  y: number;
};

export default function Cursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const ringX = useSpring(cursorX, { stiffness: 260, damping: 28, mass: 0.55 });
  const ringY = useSpring(cursorY, { stiffness: 260, damping: 28, mass: 0.55 });
  const dotX = useSpring(cursorX, { stiffness: 700, damping: 32, mass: 0.25 });
  const dotY = useSpring(cursorY, { stiffness: 700, damping: 32, mass: 0.25 });
  const frameRef = useRef<number | null>(null);
  const latestRef = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const commitPosition = () => {
      cursorX.set(latestRef.current.x);
      cursorY.set(latestRef.current.y);
      frameRef.current = null;
    };

    const handleMove = (event: MouseEvent) => {
      latestRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(commitPosition);
      }
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const interactive = target.closest('button, a, input, textarea, [role="button"], .monaco-editor');
      setHovering(Boolean(interactive));
    };

    const handleClick = (event: MouseEvent) => {
      const id = Date.now();
      setBursts((current) => [...current, { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => setBursts((current) => current.filter((burst) => burst.id !== id)), 520);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('click', handleClick);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 bg-neon-blue rounded-full pointer-events-none z-50 mix-blend-screen shadow-[0_0_18px_rgba(0,240,255,0.8)]"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: hovering ? 0.25 : 1 }}
      />
      <motion.div
        className="fixed top-0 left-0 -ml-[22px] -mt-[22px] w-11 h-11 border border-neon-blue rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 1.75 : 1,
          opacity: hovering ? 0.85 : 0.42,
          boxShadow: hovering ? '0 0 34px rgba(57,255,20,0.45)' : '0 0 20px rgba(0,240,255,0.35)',
        }}
      />
      {bursts.map((burst) => (
        <motion.div
          key={burst.id}
          className="fixed pointer-events-none z-50 rounded-full border border-neon-green"
          initial={{ x: burst.x - 8, y: burst.y - 8, width: 16, height: 16, opacity: 0.9, scale: 0.4 }}
          animate={{ x: burst.x - 28, y: burst.y - 28, width: 56, height: 56, opacity: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}
