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
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          animate={{ scale: hovering ? 1.2 : 1, rotate: hovering ? -10 : 0 }}
          className="relative"
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            <path 
              d="M8 4V24.5858C8 25.1205 8.64645 25.3882 9.02426 25.0104L13.8787 20.1559C14.0662 19.9684 14.3205 19.8631 14.5858 19.8631H22C22.5348 19.8631 22.8025 19.2166 22.4247 18.8388L8.42474 4.83883C8.18185 4.59594 8 4.34794 8 4Z" 
              fill="white" 
              stroke="black" 
              strokeWidth="1.5" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 -ml-[20px] -mt-[20px] w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 1.8 : 1,
          opacity: hovering ? 0.6 : 0.2,
          borderColor: hovering ? 'rgba(0, 240, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
          boxShadow: hovering ? '0 0 30px rgba(0, 240, 255, 0.2)' : '0 0 15px rgba(255, 255, 255, 0.1)',
        }}
      />
      {bursts.map((burst) => (
        <motion.div
          key={burst.id}
          className="fixed pointer-events-none z-[9997] rounded-full border border-white/40"
          initial={{ x: burst.x - 8, y: burst.y - 8, width: 16, height: 16, opacity: 0.9, scale: 0.4 }}
          animate={{ x: burst.x - 28, y: burst.y - 28, width: 56, height: 56, opacity: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}
