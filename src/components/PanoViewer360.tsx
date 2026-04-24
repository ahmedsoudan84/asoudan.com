"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface PanoMarker {
  id: string;
  latitude: number;
  longitude: number;
  tooltip: string;
}

interface PanoViewer360Props {
  imageUrl: string;
  markers?: PanoMarker[];
  height?: number;
}

export default function PanoViewer360({ 
  imageUrl, 
  markers = [],
  height = 500 
}: PanoViewer360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Implement 360° rotation with mouse/touch drag
  useEffect(() => {
    if (!containerRef.current || !isClient) return;

    const container = containerRef.current;
    const img = container.querySelector('img');
    if (!img) return;

    let startX = 0;
    let startRotation = 0;
    let currentRotation = 0;
    let animationFrame: number;

    const updateRotation = () => {
      if (img) {
        img.style.transform = `translateX(${currentRotation}%)`;
      }
      animationFrame = requestAnimationFrame(updateRotation);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      startX = e.clientX;
      startRotation = currentRotation;
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      currentRotation = startRotation - deltaX * 0.5;
      // Wrap around
      if (currentRotation < -100) currentRotation += 100;
      if (currentRotation > 0) currentRotation -= 100;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      container.style.cursor = 'grab';
    };

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      startX = e.touches[0].clientX;
      startRotation = currentRotation;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].clientX - startX;
      currentRotation = startRotation - deltaX * 0.5;
      if (currentRotation < -100) currentRotation += 100;
      if (currentRotation > 0) currentRotation -= 100;
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    updateRotation();

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isClient, isDragging]);

  // Auto-rotation when not dragging
  useEffect(() => {
    if (!containerRef.current || !isClient || isDragging) return;

    const container = containerRef.current;
    const img = container.querySelector('img');
    if (!img) return;

    let startTime: number;
    const duration = 30000; // 30 seconds for full rotation

    const autoRotate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = ((timestamp - startTime) % duration) / duration;
      const autoRotation = -progress * 100;
      
      if (img && !isDragging) {
        img.style.transform = `translateX(${autoRotation}%)`;
      }
      
      requestAnimationFrame(autoRotate);
    };

    const id = requestAnimationFrame(autoRotate);

    return () => cancelAnimationFrame(id);
  }, [isClient, isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden"
      style={{ 
        height: `${height}px`,
        background: 'var(--bg-secondary)',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
      role="img"
      aria-label={`Interactive 360° panorama. ${markers.length} points of interest available.`}
    >
      {/* Main panorama image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="flex">
          {/* Triple the image for seamless looping */}
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-shrink-0 w-full h-full relative">
              <Image
                src={imageUrl}
                alt=""
                fill
                className="object-cover pointer-events-none"
                style={{ objectPosition: 'center center' }}
                priority={i === 1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
      
      {/* Interactive markers */}
      {isClient && markers.map((marker) => (
        <div
          key={marker.id}
          className="absolute w-8 h-8 cursor-pointer group/marker"
          style={{
            left: `${50 + 40 * Math.sin((marker.longitude * Math.PI) / 180)}%`,
            top: `${50 - 30 * Math.sin((marker.latitude * Math.PI) / 180)}%`,
            transform: 'translate(-50%, -50%)',
          }}
          role="button"
          tabIndex={0}
          aria-label={marker.tooltip}
        >
          <div className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/60" />
          <div className="absolute inset-2 rounded-full bg-cyan-400/80 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg opacity-0 group-hover/marker:opacity-100 group-hover/marker:translate-y-0 translate-y-1 transition-all duration-200 whitespace-nowrap pointer-events-none">
            {marker.tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
          </div>
        </div>
      ))}

      {/* Loading state */}
      {!isClient && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white/60 text-sm pointer-events-none">
        <span>Drag to look around</span>
        <span>Scroll to zoom</span>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-white text-lg flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Zoom in"
          onClick={() => {
            const img = containerRef.current?.querySelector('img');
            if (img) img.style.transform += ' scale(1.1)';
          }}
        >
          +
        </button>
        <button 
          className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-white text-lg flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Zoom out"
          onClick={() => {
            const img = containerRef.current?.querySelector('img');
            if (img) img.style.transform += ' scale(0.9)';
          }}
        >
          −
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        .cursor-grab:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}
