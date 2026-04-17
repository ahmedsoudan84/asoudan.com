"use client";

import { useEffect } from "react";

/**
 * Drives the `--motion-scale` CSS variable on :root based on current scroll
 * velocity. Fast scrollers get tighter transitions; at rest the value relaxes
 * back to 1 (normal easings).
 *
 *   velocity (px/ms)  →  normalised 0..1  →  scale 1 → 0.35
 *
 * Reduced-motion users are opted out entirely — the variable stays at 1.
 */
export default function ScrollSpeedTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let scale = 1;
    let target = 1;
    let raf = 0;

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const v = Math.abs(window.scrollY - lastY) / dt;   // px/ms
      const norm = Math.min(1, v / 2.5);                 // 2.5 px/ms ≈ flick
      target = 1 - norm * 0.65;                          // 1 → 0.35
      lastY = window.scrollY;
      lastT = now;
    };

    const tick = () => {
      // Smooth current toward target, and let target drift back to rest.
      scale += (target - scale) * 0.12;
      target += (1 - target) * 0.04;
      document.documentElement.style.setProperty("--motion-scale", scale.toFixed(3));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      document.documentElement.style.removeProperty("--motion-scale");
    };
  }, []);

  return null;
}
