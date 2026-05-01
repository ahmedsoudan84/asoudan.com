"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ── Themes & Colors ─────────────────────────────────────────────
const COLORS = {
  teal: "rgba(20, 184, 166, 1)",
  orange: "rgba(249, 115, 22, 1)",
  violet: "rgba(139, 92, 246, 1)",
  pink: "rgba(236, 72, 153, 1)",
  blue: "rgba(59, 130, 246, 1)",
};

// ── Animation Variants ──────────────────────────────────────────
const drawAnim = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.15;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.1 },
      },
    };
  },
};

const fillAnim = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15 + 0.6, duration: 0.6, ease: "easeOut" },
  }),
};

// ════════════════════════════════════════════════════════════════
// 1 · Mobile phone — 80×148
// ════════════════════════════════════════════════════════════════
function WFMobile({ delay, pX, pY }: { delay: number; pX: any; pY: any }) {
  return (
    <motion.div
      className="absolute bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden"
      style={{ width: 80, height: 148, x: pX, y: pY }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg width="80" height="148" viewBox="0 0 80 148" fill="none">
        {/* Notch */}
        <motion.rect x="28" y="5" width="24" height="7" rx="3.5" className="fill-black/20 dark:fill-white/20" custom={1} variants={fillAnim} initial="hidden" animate="visible" />
        
        {/* Image hero */}
        <motion.rect x="8" y="20" width="64" height="48" rx="6" className="fill-teal-500/80" custom={2} variants={fillAnim} initial="hidden" animate="visible" />
        
        {/* Lines */}
        <motion.path d="M8 77.5 L52 77.5" stroke={COLORS.teal} strokeWidth="3" strokeLinecap="round" custom={3} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M8 84.5 L66 84.5" className="stroke-black/30 dark:stroke-white/30" strokeWidth="2.4" strokeLinecap="round" custom={4} variants={drawAnim} initial="hidden" animate="visible" />
        
        {/* Button */}
        <motion.rect x="8" y="96" width="64" height="18" rx="9" className="fill-teal-500/80" custom={5} variants={fillAnim} initial="hidden" animate="visible" />
        <motion.path d="M26 105 L54 105" stroke="white" strokeWidth="3" strokeLinecap="round" custom={6} variants={drawAnim} initial="hidden" animate="visible" />
      </svg>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════
// 2 · Browser — 200×128
// ════════════════════════════════════════════════════════════════
function WFBrowser({ delay, pX, pY }: { delay: number; pX: any; pY: any }) {
  return (
    <motion.div
      className="absolute bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl shadow-xl overflow-hidden"
      style={{ width: 200, height: 128, x: pX, y: pY }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg width="200" height="128" viewBox="0 0 200 128" fill="none">
        {/* Chrome bar */}
        <rect x="0" y="0" width="200" height="25" className="fill-black/5 dark:fill-white/5" />
        <motion.path d="M0 25 L200 25" className="stroke-black/10 dark:stroke-white/10" strokeWidth="1" custom={1} variants={drawAnim} initial="hidden" animate="visible" />
        
        {/* Dots */}
        <circle cx="12" cy="13" r="3.5" fill="#FF5F57" opacity="0.8" />
        <circle cx="23" cy="13" r="3.5" fill="#FFBD2E" opacity="0.8" />
        <circle cx="34" cy="13" r="3.5" fill="#28C840" opacity="0.8" />
        
        {/* URL bar */}
        <motion.rect x="48" y="6" width="104" height="14" rx="4" className="fill-black/10 dark:fill-white/10" custom={1} variants={fillAnim} initial="hidden" animate="visible" />
        <motion.path d="M56 13 L116 13" className="stroke-black/30 dark:stroke-white/30" strokeWidth="2.6" strokeLinecap="round" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
        
        {/* Hero image */}
        <motion.rect x="8" y="34" width="118" height="66" rx="5" className="fill-orange-500/80" custom={3} variants={fillAnim} initial="hidden" animate="visible" />
        
        {/* Side text */}
        <motion.path d="M134 37.8 L190 37.8" stroke={COLORS.orange} strokeWidth="3.6" strokeLinecap="round" custom={4} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M134 47.2 L184 47.2" className="stroke-black/30 dark:stroke-white/30" strokeWidth="2.4" strokeLinecap="round" custom={5} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M134 54.2 L176 54.2" className="stroke-black/20 dark:stroke-white/20" strokeWidth="2.4" strokeLinecap="round" custom={6} variants={drawAnim} initial="hidden" animate="visible" />
        
        {/* Button */}
        <motion.rect x="134" y="70" width="56" height="14" rx="7" className="fill-orange-500/80" custom={7} variants={fillAnim} initial="hidden" animate="visible" />
        <motion.path d="M148 76.5 L176 76.5" stroke="white" strokeWidth="3" strokeLinecap="round" custom={8} variants={drawAnim} initial="hidden" animate="visible" />
      </svg>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════
// 3 · Card — 144×172
// ════════════════════════════════════════════════════════════════
function WFCard({ delay, pX, pY }: { delay: number; pX: any; pY: any }) {
  return (
    <motion.div
      className="absolute bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl shadow-xl overflow-hidden"
      style={{ width: 144, height: 172, x: pX, y: pY }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg width="144" height="172" viewBox="0 0 144 172" fill="none">
        <motion.rect x="8" y="8" width="128" height="80" rx="7" className="fill-blue-500/80" custom={1} variants={fillAnim} initial="hidden" animate="visible" />
        
        <motion.path d="M8 100.2 L114 100.2" stroke={COLORS.blue} strokeWidth="4.4" strokeLinecap="round" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M8 109.4 L132 109.4" className="stroke-black/30 dark:stroke-white/30" strokeWidth="2.8" strokeLinecap="round" custom={3} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M8 116.4 L106 116.4" className="stroke-black/20 dark:stroke-white/20" strokeWidth="2.8" strokeLinecap="round" custom={4} variants={drawAnim} initial="hidden" animate="visible" />
        
        <motion.path d="M8 142 L136 142" className="stroke-black/10 dark:stroke-white/10" strokeWidth="1" custom={5} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M8 153.4 L60 153.4" className="stroke-black/20 dark:stroke-white/20" strokeWidth="2.8" strokeLinecap="round" custom={6} variants={drawAnim} initial="hidden" animate="visible" />
        
        <motion.circle cx="122" cy="154" r="8" className="fill-blue-500/80" custom={7} variants={fillAnim} initial="hidden" animate="visible" />
      </svg>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════
// 4 · Form — 176×124
// ════════════════════════════════════════════════════════════════
function WFForm({ delay, pX, pY }: { delay: number; pX: any; pY: any }) {
  return (
    <motion.div
      className="absolute bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-[10px] shadow-xl overflow-hidden"
      style={{ width: 176, height: 124, x: pX, y: pY }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg width="176" height="124" viewBox="0 0 176 124" fill="none">
        <motion.path d="M12 11.6 L48 11.6" stroke={COLORS.violet} strokeWidth="3.2" strokeLinecap="round" custom={1} variants={drawAnim} initial="hidden" animate="visible" />
        
        <motion.rect x="12" y="20" width="152" height="22" rx="5" stroke={COLORS.violet} strokeWidth="1" className="fill-black/5 dark:fill-white/5" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M20 30.5 L90 30.5" className="stroke-black/30 dark:stroke-white/30" strokeWidth="3" strokeLinecap="round" custom={3} variants={drawAnim} initial="hidden" animate="visible" />
        
        <motion.rect x="12" y="50" width="152" height="22" rx="5" className="stroke-black/20 dark:stroke-white/20 fill-black/5 dark:fill-white/5" strokeWidth="1" custom={4} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M20 60.4 L72 60.4" className="stroke-black/20 dark:stroke-white/20" strokeWidth="2.8" strokeLinecap="round" custom={5} variants={drawAnim} initial="hidden" animate="visible" />
        
        <motion.rect x="12" y="84" width="152" height="28" rx="14" className="fill-violet-500/80" custom={6} variants={fillAnim} initial="hidden" animate="visible" />
        <motion.path d="M68 97.7 L108 97.7" stroke="white" strokeWidth="3.4" strokeLinecap="round" custom={7} variants={drawAnim} initial="hidden" animate="visible" />
      </svg>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════
// 5 · Checkboxes — 164×116
// ════════════════════════════════════════════════════════════════
function WFCheckboxes({ delay, pX, pY }: { delay: number; pX: any; pY: any }) {
  return (
    <motion.div
      className="absolute bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-[10px] shadow-xl overflow-hidden"
      style={{ width: 164, height: 116, x: pX, y: pY }}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg width="164" height="116" viewBox="0 0 164 116" fill="none">
        <motion.path d="M12 12.8 L72 12.8" stroke={COLORS.pink} strokeWidth="3.6" strokeLinecap="round" custom={1} variants={drawAnim} initial="hidden" animate="visible" />
        
        <motion.rect x="12" y="26" width="16" height="16" rx="3.5" className="fill-pink-500/80" custom={2} variants={fillAnim} initial="hidden" animate="visible" />
        <motion.path d="M15 34.5 L18 38.5 L24 31" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" custom={3} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M38 33.4 L138 33.4" className="stroke-black/30 dark:stroke-white/30" strokeWidth="2.8" strokeLinecap="round" custom={3} variants={drawAnim} initial="hidden" animate="visible" />
        
        <motion.rect x="12" y="54" width="16" height="16" rx="3.5" className="stroke-black/20 dark:stroke-white/20" strokeWidth="1" custom={4} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M38 61.4 L124 61.4" className="stroke-black/20 dark:stroke-white/20" strokeWidth="2.8" strokeLinecap="round" custom={5} variants={drawAnim} initial="hidden" animate="visible" />
        
        <motion.rect x="12" y="82" width="16" height="16" rx="3.5" className="fill-pink-500/80" custom={6} variants={fillAnim} initial="hidden" animate="visible" />
        <motion.path d="M15 90.5 L18 94.5 L24 87" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" custom={7} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M38 89.4 L138 89.4" className="stroke-black/30 dark:stroke-white/30" strokeWidth="2.8" strokeLinecap="round" custom={7} variants={drawAnim} initial="hidden" animate="visible" />
      </svg>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════════════════
export default function HeroDesignReel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Center based values for parallax
      const x = (window.innerWidth / 2 - e.clientX) / 25;
      const y = (window.innerHeight / 2 - e.clientY) / 25;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Use springs for buttery smooth following
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[25] hidden lg:block select-none overflow-hidden">
      {/* Container for continuous slow floating of the entire reel */}
      <motion.div 
        className="w-full h-full relative"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{ position: "absolute", right: "8%", top: "12%" }}>
          <WFMobile delay={0.2} pX={useTransform(smoothX, (v) => v * 1.2)} pY={useTransform(smoothY, (v) => v * 1.2)} />
        </div>

        <div style={{ position: "absolute", right: "28%", top: "8%" }}>
          <WFBrowser delay={0.4} pX={useTransform(smoothX, (v) => v * 0.8)} pY={useTransform(smoothY, (v) => v * 0.8)} />
        </div>

        <div style={{ position: "absolute", right: "15%", bottom: "15%" }}>
          <WFForm delay={0.6} pX={useTransform(smoothX, (v) => v * 1.5)} pY={useTransform(smoothY, (v) => v * 1.5)} />
        </div>

        <div style={{ position: "absolute", right: "38%", bottom: "12%" }}>
          <WFCard delay={0.8} pX={useTransform(smoothX, (v) => v * 0.5)} pY={useTransform(smoothY, (v) => v * 0.5)} />
        </div>

        <div style={{ position: "absolute", right: "4%", top: "45%" }}>
          <WFCheckboxes delay={1.0} pX={useTransform(smoothX, (v) => v * 1.8)} pY={useTransform(smoothY, (v) => v * 1.8)} />
        </div>
      </motion.div>
    </div>
  );
}
