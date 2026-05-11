import { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

const DustParticles = memo(function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let lastTime = 0;
    const fpsInterval = 1000 / 60;

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      depth: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.5 + 0.5;
        this.depth = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * (0.2 / this.depth);
        this.speedY = (Math.random() - 0.5) * (0.2 / this.depth);
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update(mouseX: number, mouseY: number) {
        // Natural movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Interaction logic
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceRadius = 120;

        if (distance < forceRadius) {
          const force = (forceRadius - distance) / forceRadius;
          const directionX = dx / distance;
          const directionY = dy / distance;
          // Pushing away effect
          this.x -= directionX * force * 4;
          this.y -= directionY * force * 4;
        }

        // Screen wrap
        if (this.x > window.innerWidth) this.x = 0;
        else if (this.x < 0) this.x = window.innerWidth;
        
        if (this.y > window.innerHeight) this.y = 0;
        else if (this.y < 0) this.y = window.innerHeight;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / this.depth, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity / this.depth})`;
        ctx.fill();
      }
    }

    const init = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      
      particles = [];
      const densityCount = Math.floor((window.innerWidth * window.innerHeight) / 600);
      const particleCount = Math.max(5000, densityCount);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      
      const elapsed = time - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = time - (elapsed % fpsInterval);

      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      const { x: mouseX, y: mouseY } = mouseRef.current;
      
      particles.forEach((particle) => {
        particle.update(mouseX, mouseY);
        particle.draw();
      });
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    init();
    animationFrameId = requestAnimationFrame(animate);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ filter: 'blur(0.3px)', width: '100vw', height: '100vh' }}
    />
  );
});

export default DustParticles;
