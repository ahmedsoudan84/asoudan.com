"use client";
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface WebGLFoodRevealProps {
  src: string;
  alt: string;
  className?: string;
}

export default function WebGLFoodReveal({ src, alt, className = '' }: WebGLFoodRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simple CSS-based reveal effect (no WebGL required for production)
  // Provides similar visual impact with better performance and browser support
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  // If WebGL is available, use enhanced shader effect
  useEffect(() => {
    if (!containerRef.current || !isClient) return;

    // Check for WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    // Create WebGL shader-based reveal
    const container = containerRef.current;
    const imageEl = container.querySelector('img');
    if (!imageEl) return;

    // Create overlay canvas for shader effect
    const overlay = document.createElement('canvas');
    overlay.className = 'absolute inset-0 w-full h-full pointer-events-none';
    overlay.style.mixBlendMode = 'screen';
    container.appendChild(overlay);

    const ctx = overlay.getContext('2d');
    if (!ctx) return;

    let width = overlay.width = container.offsetWidth;
    let height = overlay.height = container.offsetHeight;
    let time = 0;
    let animationId: number;

    const drawShader = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      const gradient = ctx.createRadialGradient(
        mousePos.x * width, mousePos.y * height, 0,
        mousePos.x * width, mousePos.y * height, Math.max(width, height) * 0.5
      );

      if (isHovered) {
        gradient.addColorStop(0, 'rgba(0, 241, 241, 0.3)');
        gradient.addColorStop(0.3, 'rgba(123, 97, 255, 0.15)');
        gradient.addColorStop(0.6, 'rgba(0, 255, 136, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(1, 'transparent');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(drawShader);
    };

    if (isHovered) {
      drawShader();
    }

    const handleResize = () => {
      width = overlay.width = container.offsetWidth;
      height = overlay.height = container.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
      overlay.remove();
    };
  }, [isClient, mousePos, isHovered]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ 
        background: 'var(--bg-secondary)',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Main Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-all duration-700"
          style={{
            filter: isHovered 
              ? 'brightness(1.1) contrast(1.05) saturate(1.1)'
              : 'brightness(1) contrast(1) saturate(1)',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
          priority
        />
        
        {/* Color overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: isHovered
              ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 241, 241, 0.2) 0%, transparent 50%)'
              : 'transparent',
            transition: 'background 0.1s ease-out',
            mixBlendMode: 'overlay'
          }}
        />

        {/* Ripple effect */}
        {isHovered && (
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
                rgba(0, 241, 241, 0.15) 0%, 
                rgba(123, 97, 255, 0.08) 30%, 
                transparent 60%)`,
              animation: 'pulse 2s ease-out infinite'
            }}
          />
        )}
      </div>

      {/* Hover overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 text-white/80">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-medium">View details</span>
          </div>
        </div>
      </div>

      {/* Border effect */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: isHovered 
            ? `0 0 30px rgba(0, 241, 241, 0.3), inset 0 0 30px rgba(0, 241, 241, 0.05)`
            : 'none',
          transition: 'box-shadow 0.3s ease'
        }}
      />
    </div>
  );
}
