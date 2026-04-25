"use client";
import { useEffect, useRef, useState } from 'react';

export interface PanoMarker {
  id: string;
  latitude: number;
  longitude: number;
  tooltip: string;
  navigatesTo?: string; // room id to navigate to on click
}

interface PanoViewer360Props {
  imageUrl: string;
  markers?: PanoMarker[];
  height?: number;
  onNavigate?: (roomId: string) => void;
}

const FALLBACK_URL =
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&h=600&fit=crop';

export default function PanoViewer360({
  imageUrl,
  markers = [],
  height = 500,
  onNavigate,
}: PanoViewer360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const translateRef = useRef(0);
  const autoRafRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => { setIsClient(true); }, []);

  // Reset strip + error state when the panorama image changes
  useEffect(() => {
    setImgFailed(false);
    setActiveMarker(null);
    translateRef.current = 0;
    lastTimeRef.current = null;
    if (stripRef.current) stripRef.current.style.transform = 'translateX(0px)';
  }, [imageUrl]);

  useEffect(() => {
    if (!containerRef.current || !stripRef.current || !isClient) return;
    const container = containerRef.current;
    const strip = stripRef.current;
    const getW = () => container.offsetWidth;

    const wrap = (t: number) => {
      const w = getW();
      if (!w) return t;
      if (t > 0) t -= w;
      if (t < -w) t += w;
      return t;
    };

    const apply = (t: number) => { strip.style.transform = `translateX(${t}px)`; };

    const autoLoop = (time: number) => {
      if (!isDraggingRef.current) {
        if (lastTimeRef.current !== null) {
          translateRef.current = wrap(translateRef.current - (getW() / 30000) * (time - lastTimeRef.current));
          apply(translateRef.current);
        }
        lastTimeRef.current = time;
      } else {
        lastTimeRef.current = null;
      }
      autoRafRef.current = requestAnimationFrame(autoLoop);
    };
    autoRafRef.current = requestAnimationFrame(autoLoop);

    const onDown = (e: MouseEvent) => {
      isDraggingRef.current = true; setIsDragging(true);
      startXRef.current = e.clientX - translateRef.current;
      container.style.cursor = 'grabbing';
    };
    const onMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      translateRef.current = wrap(e.clientX - startXRef.current);
      apply(translateRef.current);
    };
    const onUp = () => {
      isDraggingRef.current = false; setIsDragging(false);
      container.style.cursor = 'grab';
    };
    const onTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true; setIsDragging(true);
      startXRef.current = e.touches[0].clientX - translateRef.current;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      translateRef.current = wrap(e.touches[0].clientX - startXRef.current);
      apply(translateRef.current);
    };
    const onTouchEnd = () => { isDraggingRef.current = false; setIsDragging(false); };

    container.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    container.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(autoRafRef.current);
      container.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isClient]);

  const resolvedUrl = imgFailed ? FALLBACK_URL : imageUrl;

  const handleMarkerClick = (marker: PanoMarker) => {
    if (marker.navigatesTo && onNavigate) {
      onNavigate(marker.navigatesTo);
    } else {
      setActiveMarker(activeMarker === marker.id ? null : marker.id);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden select-none"
      style={{ height: `${height}px`, background: 'var(--bg-secondary)', cursor: isDragging ? 'grabbing' : 'grab' }}
      aria-label={`Interactive 360° panorama. ${markers.length} points of interest available.`}
    >
      {/* Panorama strip — 3 copies for seamless looping */}
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
            onError={() => { if (!imgFailed) setImgFailed(true); }}
          />
        ))}
      </div>

      {/* Depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

      {/* Markers */}
      {isClient && markers.map((marker) => {
        const isPinned = activeMarker === marker.id;
        const isNav = !!marker.navigatesTo;
        return (
          <div
            key={marker.id}
            className="absolute w-10 h-10 cursor-pointer group/marker z-10"
            style={{
              left: `${50 + 40 * Math.sin((marker.longitude * Math.PI) / 180)}%`,
              top: `${50 - 30 * Math.sin((marker.latitude * Math.PI) / 180)}%`,
              transform: 'translate(-50%, -50%)',
            }}
            role="button"
            tabIndex={0}
            aria-label={isNav ? `Navigate to ${marker.tooltip}` : marker.tooltip}
            onClick={() => handleMarkerClick(marker)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleMarkerClick(marker); } }}
          >
            {/* Ping ring */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/25 animate-ping" />
            {/* Border ring */}
            <div className={`absolute inset-0 rounded-full border-2 transition-colors duration-150 ${isPinned || isNav ? 'border-cyan-300' : 'border-cyan-400/60'}`} />
            {/* Inner dot — arrow icon for nav markers */}
            <div className={`absolute inset-[5px] rounded-full flex items-center justify-center transition-colors duration-150 ${isPinned || isNav ? 'bg-cyan-300' : 'bg-cyan-400/80'}`}>
              {isNav ? (
                <svg className="w-3 h-3 text-[#141620]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>

            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap pointer-events-none
              ${isPinned ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 group-hover/marker:opacity-100 group-hover/marker:translate-y-0'}`}>
              {isNav ? `→ ${marker.tooltip}` : marker.tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
            </div>
          </div>
        );
      })}

      {!isClient && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white/60 text-sm pointer-events-none">
        <span>Drag to look around</span>
        <span className="hidden sm:inline">Click arrows to explore rooms</span>
      </div>
    </div>
  );
}
