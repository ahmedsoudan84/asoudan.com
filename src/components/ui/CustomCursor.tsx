"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      animate={{ x: pos.x - 10, y: pos.y - 10, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 2000, damping: 60, mass: 0.2 }}
    >
      <div className="w-5 h-5 rounded-full border" style={{ borderColor: "var(--accent)", opacity: 0.6 }} />
    </motion.div>
  );
}
