"use client";
import { useEffect, useRef, useState, useCallback } from "react";

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
  height = 500,
}: PanoViewer360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // position in track-% space: 0 → start, −33.333 → one full image scrolled
  const posRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startPos: 0 });
  const autoTimeRef = useRef<number | undefined>(undefined);
  const rafRef = useRef<number | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  // Apply current posRef to the track element
  const flush = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${posRef.current}%)`;
    }
  }, []);

  // RAF loop — advances auto-rotation when not dragging
  useEffect(() => {
    const tick = (time: number) => {
      if (!dragRef.current.active) {
        if (autoTimeRef.current === undefined) autoTimeRef.current = time;
        const dt = time - autoTimeRef.current;
        autoTimeRef.current = time;
        // 30 s per full loop → 33.333% / 30000 ms per ms
        posRef.current -= (dt / 30000) * 33.333;
        if (posRef.current < -33.333) posRef.current += 33.333;
      } else {
        autoTimeRef.current = undefined;
      }
      flush();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [flush]);

  // Pointer / touch drag
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onDown = (clientX: number) => {
      dragRef.current = { active: true, startX: clientX, startPos: posRef.current };
      setIsDragging(true);
    };
    const onMove = (clientX: number) => {
      if (!dragRef.current.active) return;
      const w = el.offsetWidth;
      const delta = ((clientX - dragRef.current.startX) / w) * 33.333;
      posRef.current = dragRef.current.startPos - delta;
      // Keep in range [−33.333, 0]
      while (posRef.current < -33.333) posRef.current += 33.333;
      while (posRef.current > 0) posRef.current -= 33.333;
    };
    const onUp = () => {
      dragRef.current.active = false;
      setIsDragging(false);
    };

    const onMouseDown = (e: MouseEvent) => onDown(e.clientX);
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX);
    const onMouseUp = () => onUp();
    const onTouchStart = (e: TouchEvent) => onDown(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      onMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => onUp();

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden select-none"
      style={{
        height: `${height}px`,
        cursor: isDragging ? "grabbing" : "grab",
        background: "var(--bg-secondary)",
      }}
      role="img"
      aria-label={`Interactive 360° panorama. ${markers.length} points of interest.`}
    >
      {/* Panorama track — 3 × image width for seamless looping */}
      <div
        ref={trackRef}
        className="absolute inset-y-0 left-0 flex will-change-transform"
        style={{ width: "300%", height: "100%" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{ width: "33.333%", height: "100%", flexShrink: 0, overflow: "hidden" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Top-to-bottom gradient for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Left/right edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Markers */}
      {markers.map((marker) => {
        const left = 50 + 40 * Math.sin((marker.longitude * Math.PI) / 180);
        const top = 50 - 30 * Math.sin((marker.latitude * Math.PI) / 180);
        const isActive = activeMarker === marker.id;
        return (
          <button
            key={marker.id}
            className="absolute w-8 h-8 z-10"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => setActiveMarker(isActive ? null : marker.id)}
            aria-label={marker.tooltip}
          >
            <span className="absolute inset-0 rounded-full bg-cyan-400/25 animate-ping" />
            <span
              className="absolute inset-0 rounded-full border-2 border-cyan-400/70 backdrop-blur-sm"
              style={{ background: "rgba(0,0,0,0.3)" }}
            />
            <span className="absolute inset-2 rounded-full bg-cyan-400 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white block" />
            </span>
            {isActive && (
              <span
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg text-white text-xs font-montserrat font-semibold whitespace-nowrap pointer-events-none"
                style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)" }}
              >
                {marker.tooltip}
                <span
                  className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                  style={{ borderTopColor: "rgba(0,0,0,0.88)" }}
                />
              </span>
            )}
          </button>
        );
      })}

      {/* 360° badge */}
      <div
        className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full pointer-events-none"
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 block" />
        <span className="font-montserrat text-white text-xs font-bold tracking-wider">360°</span>
      </div>

      {/* Drag hint */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full pointer-events-none"
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
      >
        <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-montserrat text-white/60 text-xs tracking-wider">Drag to explore</span>
        <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  );
}
