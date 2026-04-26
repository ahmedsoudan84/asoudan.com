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
  onMarkerClick?: (markerId: string) => void;
}

export default function PanoViewer360({
  imageUrl,
  markers = [],
  height = 500,
  onMarkerClick,
}: PanoViewer360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Refs for animation state — avoids stale closure bugs in event listeners
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const translateRef = useRef(0);
  const autoRafRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !stripRef.current || !isClient) return;

    const container = containerRef.current;
    const strip = stripRef.current;

    const getWidth = () => container.offsetWidth;

    // Wrap translate so it always stays within one image-width cycle
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

    // Auto-rotation loop — pauses while dragging
    const autoLoop = (time: number) => {
      if (!isDraggingRef.current) {
        if (lastTimeRef.current !== null) {
          const delta = time - lastTimeRef.current;
          const w = getWidth();
          // 30 s per full revolution
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
      // Don't capture drag if the press started on an interactive marker.
      if ((e.target as HTMLElement).closest('[data-pano-marker]')) return;
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
      if ((e.target as HTMLElement).closest('[data-pano-marker]')) return;
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
            src={imageUrl}
            alt=""
            draggable={false}
            className="pointer-events-none object-cover"
            style={{ width: '33.333%', height: '100%', flexShrink: 0 }}
          />
        ))}
      </div>

      {/* Depth gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

      {/* Interactive markers — wrapper handles positioning so the inner
          button is free to use transform: scale(...) on hover without
          fighting the centering translate. */}
      {isClient && markers.map((marker) => (
        <div
          key={marker.id}
          className="absolute pointer-events-none"
          style={{
            left: `${50 + 40 * Math.sin((marker.longitude * Math.PI) / 180)}%`,
            top: `${50 - 30 * Math.sin((marker.latitude * Math.PI) / 180)}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <button
            type="button"
            data-pano-marker
            aria-label={marker.tooltip}
            onClick={(e) => {
              e.stopPropagation();
              onMarkerClick?.(marker.id);
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="pointer-events-auto relative block w-8 h-8 rounded-full cursor-pointer group/marker focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 transition-transform duration-200 hover:scale-125 active:scale-110"
          >
            <span className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping pointer-events-none" />
            <span className="absolute inset-0 rounded-full border-2 border-cyan-400/60 group-hover/marker:border-cyan-300 pointer-events-none" />
            <span className="absolute inset-2 rounded-full bg-cyan-400/80 group-hover/marker:bg-cyan-300 flex items-center justify-center pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg opacity-0 group-hover/marker:opacity-100 translate-y-1 group-hover/marker:translate-y-0 transition-all duration-200 whitespace-nowrap pointer-events-none">
              {marker.tooltip}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
            </span>
          </button>
        </div>
      ))}

      {/* Spinner before hydration */}
      {!isClient && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* HUD */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white/60 text-sm pointer-events-none">
        <span>Drag to look around</span>
        <span>Scroll to zoom</span>
      </div>
    </div>
  );
}
