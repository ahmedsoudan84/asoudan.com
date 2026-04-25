"use client";
import { useEffect, useRef, useState } from 'react';

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

const FALLBACK_URL =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&h=600&fit=crop';

export default function PanoViewer360({
  imageUrl,
  markers = [],
  height = 500,
}: PanoViewer360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  // Refs for animation state — avoids stale closure bugs in event listeners
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const translateRef = useRef(0);
  const autoRafRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset position and error state when switching to a different panorama
  useEffect(() => {
    setImgFailed(false);
    setActiveMarker(null);
    translateRef.current = 0;
    lastTimeRef.current = null;
    if (stripRef.current) {
      stripRef.current.style.transform = 'translateX(0px)';
    }
  }, [imageUrl]);

  useEffect(() => {
    if (!containerRef.current || !stripRef.current || !isClient) return;

    const container = containerRef.current;
    const strip = stripRef.current;

    const getWidth = () => container.offsetWidth;

    // Keep translate within one image-width cycle for seamless looping
    const wrap = (t: number) => {
      const w = getWidth();
      if (w === 0) return t;
      if (t > 0) t -= w;
      if (t < -w) t += w;
      return t;
    };

    const applyTranslate = (t: number) => {
      strip.style.transform = `translateX(${t}px)`;
    };

    // Auto-rotation loop — pauses while the user is dragging
    const autoLoop = (time: number) => {
      if (!isDraggingRef.current) {
        if (lastTimeRef.current !== null) {
          const delta = time - lastTimeRef.current;
          const w = getWidth();
          translateRef.current = wrap(translateRef.current - (w / 30000) * delta);
          applyTranslate(translateRef.current);
        }
        lastTimeRef.current = time;
      } else {
        lastTimeRef.current = null;
      }
      autoRafRef.current = requestAnimationFrame(autoLoop);
    };

    autoRafRef.current = requestAnimationFrame(autoLoop);

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      setIsDragging(true);
      startXRef.current = e.clientX - translateRef.current;
      container.style.cursor = 'grabbing';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      translateRef.current = wrap(e.clientX - startXRef.current);
      applyTranslate(translateRef.current);
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      container.style.cursor = 'grab';
    };

    const onTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true;
      setIsDragging(true);
      startXRef.current = e.touches[0].clientX - translateRef.current;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      translateRef.current = wrap(e.touches[0].clientX - startXRef.current);
      applyTranslate(translateRef.current);
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(autoRafRef.current);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isClient]);

  const resolvedUrl = imgFailed ? FALLBACK_URL : imageUrl;

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden select-none"
      style={{
        height: `${height}px`,
        background: 'var(--bg-secondary)',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      role="img"
      aria-label={`Interactive 360° panorama. ${markers.length} points of interest available.`}
    >
      {/* Panorama strip — 3 copies side by side for seamless looping */}
      <div
        ref={stripRef}
        className="absolute inset-y-0 left-0 flex"
        style={{ width: '300%', willChange: 'transform' }}
      >
        {[0, 1, 2].map((i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={resolvedUrl}
            alt=""
            draggable={false}
            className="pointer-events-none object-cover"
            style={{ width: '33.333%', height: '100%', flexShrink: 0 }}
            onError={() => {
              if (!imgFailed) setImgFailed(true);
            }}
          />
        ))}
      </div>

      {/* Depth gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

      {/* Interactive markers — click to pin/dismiss tooltip, hover also works */}
      {isClient && markers.map((marker) => {
        const isPinned = activeMarker === marker.id;
        return (
          <div
            key={marker.id}
            className="absolute w-8 h-8 cursor-pointer group/marker z-10"
            style={{
              left: `${50 + 40 * Math.sin((marker.longitude * Math.PI) / 180)}%`,
              top: `${50 - 30 * Math.sin((marker.latitude * Math.PI) / 180)}%`,
              transform: 'translate(-50%, -50%)',
            }}
            role="button"
            tabIndex={0}
            aria-label={marker.tooltip}
            aria-pressed={isPinned}
            onClick={() => setActiveMarker(isPinned ? null : marker.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveMarker(isPinned ? null : marker.id);
              }
            }}
          >
            <div className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />
            <div className={`absolute inset-0 rounded-full border-2 transition-colors duration-150 ${isPinned ? 'border-cyan-300' : 'border-cyan-400/60'}`} />
            <div className={`absolute inset-2 rounded-full flex items-center justify-center transition-colors duration-150 ${isPinned ? 'bg-cyan-300' : 'bg-cyan-400/80'}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            {/* Tooltip — shows on hover OR when pinned via click */}
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap pointer-events-none
                ${isPinned ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 group-hover/marker:opacity-100 group-hover/marker:translate-y-0'}`}
            >
              {marker.tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
            </div>
          </div>
        );
      })}

      {/* Spinner before hydration */}
      {!isClient && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* HUD */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white/60 text-sm pointer-events-none">
        <span>Drag to look around</span>
        <span className="hidden sm:inline">Click markers to explore</span>
      </div>
    </div>
  );
}
