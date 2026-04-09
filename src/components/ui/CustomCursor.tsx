"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 800, damping: 50, mass: 0.08 });
  const sy = useSpring(y, { stiffness: 800, damping: 50, mass: 0.08 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 10);
      y.set(e.clientY - 10);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
      style={{ x: sx, y: sy }}
    >
      <div className="w-5 h-5 rounded-full border" style={{ borderColor: "var(--accent)", opacity: 0.6 }} />
    </motion.div>
  );
}
