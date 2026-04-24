"use client";
import { useRef, useEffect, useState } from 'react';
import AuroraEffect from '../effects/AuroraEffect';

interface SkylineLayer {
  depth: number;
  buildings: Array<{
    x: number;
    width: number;
    height: number;
    opacity: number;
    isLandmark?: boolean;
  }>;
}

export default function LondonSkylineParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const layers: SkylineLayer[] = [
    {
      depth: 0.1,
      buildings: [
        { x: 5, width: 60, height: 200, opacity: 0.3 },
        { x: 20, width: 40, height: 150, opacity: 0.2 },
        { x: 40, width: 80, height: 180, opacity: 0.25 },
        { x: 65, width: 50, height: 160, opacity: 0.22 },
        { x: 85, width: 70, height: 190, opacity: 0.28 },
      ]
    },
    {
      depth: 0.3,
      buildings: [
        { x: 2, width: 45, height: 280, opacity: 0.5 },
        { x: 18, width: 55, height: 320, opacity: 0.55 },
        { x: 35, width: 35, height: 250, opacity: 0.45 },
        { x: 55, width: 75, height: 350, opacity: 0.6 },
        { x: 75, width: 50, height: 290, opacity: 0.5 },
        { x: 92, width: 40, height: 260, opacity: 0.48 },
      ]
    },
    {
      depth: 0.6,
      buildings: [
        { x: 0, width: 50, height: 400, opacity: 0.7 },
        { x: 15, width: 65, height: 450, opacity: 0.75 },
        { x: 32, width: 45, height: 380, opacity: 0.65 },
        { x: 50, width: 80, height: 500, opacity: 0.8, isLandmark: true },
        { x: 70, width: 60, height: 420, opacity: 0.7 },
        { x: 88, width: 55, height: 360, opacity: 0.68 },
      ]
    },
    {
      depth: 1,
      buildings: [
        { x: 8, width: 70, height: 500, opacity: 0.9, isLandmark: true },
        { x: 35, width: 90, height: 550, opacity: 0.95, isLandmark: true },
        { x: 65, width: 85, height: 520, opacity: 0.85, isLandmark: true },
        { x: 90, width: 65, height: 480, opacity: 0.8, isLandmark: true },
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <AuroraEffect colors={['#00F1F1', '#7B61FF', '#00FF88']} speed={0.5} />
      
      {/* Stars */}
      <div className="absolute inset-0 opacity-50">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle at 30% 30%, #f0f0f0 0%, #d0d0d0 40%, #a0a0a0 100%)',
          boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
          top: '8%',
          right: '12%',
          transform: `translateY(${scrollY * 0.15}px)`
        }}
      />

      {/* Skyline layers */}
      {layers.map((layer, layerIndex) => {
        const parallaxOffset = scrollY * layer.depth;
        
        return (
          <div
            key={layerIndex}
            className="absolute bottom-0 w-full"
            style={{
              transform: `translateY(${parallaxOffset}px)`,
              height: '45vh',
              minHeight: '250px'
            }}
          >
            {layer.buildings.map((building, i) => (
              <Building
                key={i}
                {...building}
              />
            ))}
          </div>
        );
      })}

      {/* Foreground fog */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(10,12,20,0.95) 0%, rgba(10,12,20,0.6) 70%, transparent 100%)',
          transform: `translateY(${scrollY * 0.08}px)`
        }}
      />
    </div>
  );
}

function Building({ 
  x, width, height, opacity, isLandmark = false
}: {
  x: number;
  width: number;
  height: number;
  opacity: number;
  isLandmark?: boolean;
}) {
  const windowsCount = Math.floor(height / 20);
  const windowRows = Math.floor(height / 35);

  return (
    <div
      className="absolute bottom-0"
      style={{
        left: `${x}%`,
        width: `${width}%`,
        height: `${height}px`,
        opacity,
        background: isLandmark
          ? 'linear-gradient(to top, #1a2a4a 0%, #2a3a5a 30%, #3a4a6a 100%)'
          : 'linear-gradient(to top, #0a0c14 0%, #1a1d2e 50%, #2a2d42 100%)',
        boxShadow: `
          ${isLandmark ? '0 0 40px rgba(0, 241, 241, 0.25)' : ''},
          inset -8px 0 15px rgba(0,0,0,0.4),
          inset 8px 0 15px rgba(255,255,255,0.03)
        `,
        borderRadius: '2px 2px 0 0'
      }}
    >
      {/* Windows */}
      <div className="absolute inset-0 p-2 pointer-events-none">
        {[...Array(Math.min(windowsCount, 30))].map((_, wi) => {
          const row = Math.floor(wi / 6);
          const col = wi % 6;
          
          return (
            <div
              key={wi}
              className="absolute"
              style={{
                left: `${10 + col * 15}%`,
                top: `${8 + row * 20}%`,
                width: '8%',
                height: '15%',
                opacity: Math.random() * 0.4 + 0.15
              }}
            >
              <div
                className="w-full h-full rounded-sm"
                style={{
                  background: `rgba(255, 255, 220, ${Math.random() * 0.4 + 0.2})`,
                  boxShadow: '0 0 4px rgba(255, 255, 200, 0.2)'
                }}
              />
            </div>
          );
        })}
      </div>
      
      {/* Landmark highlight */}
      {isLandmark && (
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: '15px',
            background: 'linear-gradient(to right, transparent, rgba(0, 241, 241, 0.4), transparent)',
            animation: 'glow 3s ease-in-out infinite'
          }}
        />
      )}
    </div>
  );
}
