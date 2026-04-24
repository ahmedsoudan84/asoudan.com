"use client";
import { useRef, useEffect } from 'react';

interface AuroraEffectProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

export default function AuroraEffect({
  className = '',
  colors = ['#00F1F1', '#7B61FF', '#00FF88'],
  speed = 1
}: AuroraEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Static aurora background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.5, 'rgba(0, 241, 241, 0.1)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      return;
    }

    // Auroras configuration
    const auroras = colors.map((color, index) => ({
      color,
      y: height * (0.15 + index * 0.15),
      amplitude: 60 + Math.random() * 40,
      frequency: 0.0015 + Math.random() * 0.0015,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.2,
      opacity: 0.1 + Math.random() * 0.1,
      segments: 200
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      auroras.forEach((a, i) => {
        a.y = height * (0.15 + i * 0.15);
      });
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01 * speed;

      auroras.forEach((aurora) => {
        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          ctx.moveTo(0, aurora.y);

          for (let x = 0; x <= width; x += width / aurora.segments) {
            const y = aurora.y +
              Math.sin(x * aurora.frequency + time * aurora.speed + aurora.phase) * aurora.amplitude * (0.5 + layer * 0.25) +
              Math.sin(x * aurora.frequency * 2.3 + time * aurora.speed * 0.5) * aurora.amplitude * 0.15;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.closePath();

          const layerOpacity = aurora.opacity * (0.4 - layer * 0.1);
          const gradient = ctx.createLinearGradient(0, aurora.y - aurora.amplitude, 0, aurora.y + aurora.amplitude);
          gradient.addColorStop(0, 'transparent');
          gradient.addColorStop(0.5, aurora.color + Math.floor(layerOpacity * 255).toString(16).padStart(2, '0'));
          gradient.addColorStop(1, 'transparent');

          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
