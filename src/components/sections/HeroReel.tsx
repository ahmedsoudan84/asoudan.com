"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// ── Cycle visibility hook ────────────────────────────────────────
function useCycle(startMs: number, showMs: number, hideMs: number) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const show = () => { setOn(true);  t = setTimeout(hide, showMs); };
    const hide = () => { setOn(false); t = setTimeout(show, hideMs); };
    t = setTimeout(show, startMs);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return on;
}

// ── Cinematic flythrough Shell ───────────────────────────────────
function Shell({
  children, style, on, rot, dur,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
  on: boolean;
  rot: number;
  dur: number;
}) {
  return (
    <AnimatePresence>
      {on && (
        <motion.div
          className="absolute flex items-center justify-center pointer-events-none"
          style={{
            ...style,
            willChange: "transform, opacity, filter",
          }}
          initial={{ scale: 0.2, y: 60, rotate: 0, opacity: 0, filter: "blur(12px)" }}
          animate={{
            scale:   [0.2, 0.6, 1.0, 1.5, 2.2],
            y:       [60,  30,  0,   -30, -70],
            rotate:  [0,   rot * 0.5, rot, rot * 0.6, rot * 0.1],
            opacity: [0,   1,   1,   1,   0],
            filter:  ["blur(12px)", "blur(0px)", "blur(0px)", "blur(4px)", "blur(12px)"]
          }}
          transition={{
            duration: dur,
            times:    [0, 0.2, 0.5, 0.8, 1],
            ease:     "easeInOut",
          }}
          exit={{ opacity: 0, scale: 2.5, filter: "blur(16px)", transition: { duration: 0.4 } }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ════════════════════════════════════════════════════════════════
// 1 · Mobile phone — 80×148
// ════════════════════════════════════════════════════════════════
function WFMobile() {
  return (
    <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden" style={{ width: 80, height: 148 }}>
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
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 2 · Browser — 200×128
// ════════════════════════════════════════════════════════════════
function WFBrowser() {
  return (
    <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl shadow-xl overflow-hidden" style={{ width: 200, height: 128 }}>
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
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 3 · Card — 144×172
// ════════════════════════════════════════════════════════════════
function WFCard() {
  return (
    <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl shadow-xl overflow-hidden" style={{ width: 144, height: 172 }}>
      <svg width="144" height="172" viewBox="0 0 144 172" fill="none">
        <motion.rect x="8" y="8" width="128" height="80" rx="7" className="fill-blue-500/80" custom={1} variants={fillAnim} initial="hidden" animate="visible" />
        
        <motion.path d="M8 100.2 L114 100.2" stroke={COLORS.blue} strokeWidth="4.4" strokeLinecap="round" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M8 109.4 L132 109.4" className="stroke-black/30 dark:stroke-white/30" strokeWidth="2.8" strokeLinecap="round" custom={3} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M8 116.4 L106 116.4" className="stroke-black/20 dark:stroke-white/20" strokeWidth="2.8" strokeLinecap="round" custom={4} variants={drawAnim} initial="hidden" animate="visible" />
        
        <motion.path d="M8 142 L136 142" className="stroke-black/10 dark:stroke-white/10" strokeWidth="1" custom={5} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M8 153.4 L60 153.4" className="stroke-black/20 dark:stroke-white/20" strokeWidth="2.8" strokeLinecap="round" custom={6} variants={drawAnim} initial="hidden" animate="visible" />
        
        <motion.circle cx="122" cy="154" r="8" className="fill-blue-500/80" custom={7} variants={fillAnim} initial="hidden" animate="visible" />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 4 · Form — 176×124
// ════════════════════════════════════════════════════════════════
function WFForm() {
  return (
    <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-[10px] shadow-xl overflow-hidden" style={{ width: 176, height: 124 }}>
      <svg width="176" height="124" viewBox="0 0 176 124" fill="none">
        <motion.path d="M12 11.6 L48 11.6" stroke={COLORS.violet} strokeWidth="3.2" strokeLinecap="round" custom={1} variants={drawAnim} initial="hidden" animate="visible" />
        
        <motion.rect x="12" y="20" width="152" height="22" rx="5" stroke={COLORS.violet} strokeWidth="1" className="fill-black/5 dark:fill-white/5" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M20 30.5 L90 30.5" className="stroke-black/30 dark:stroke-white/30" strokeWidth="3" strokeLinecap="round" custom={3} variants={drawAnim} initial="hidden" animate="visible" />
        
        <motion.rect x="12" y="50" width="152" height="22" rx="5" className="stroke-black/20 dark:stroke-white/20 fill-black/5 dark:fill-white/5" strokeWidth="1" custom={4} variants={drawAnim} initial="hidden" animate="visible" />
        <motion.path d="M20 60.4 L72 60.4" className="stroke-black/20 dark:stroke-white/20" strokeWidth="2.8" strokeLinecap="round" custom={5} variants={drawAnim} initial="hidden" animate="visible" />
        
        <motion.rect x="12" y="84" width="152" height="28" rx="14" className="fill-violet-500/80" custom={6} variants={fillAnim} initial="hidden" animate="visible" />
        <motion.path d="M68 97.7 L108 97.7" stroke="white" strokeWidth="3.4" strokeLinecap="round" custom={7} variants={drawAnim} initial="hidden" animate="visible" />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 5 · Checkboxes — 164×116
// ════════════════════════════════════════════════════════════════
function WFCheckboxes() {
  return (
    <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-[10px] shadow-xl overflow-hidden" style={{ width: 164, height: 116 }}>
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
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════════════════
const SHOW = {
  mobile:     3500,
  browser:    3800,
  form:       3500,
  card:       3600,
  checkboxes: 3400,
};

export function HeroReel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const mobile     = useCycle(0,    SHOW.mobile,     1000);
  const browser    = useCycle(800,  SHOW.browser,    1200);
  const form       = useCycle(1600, SHOW.form,       1500);
  const card       = useCycle(2400, SHOW.card,       1400);
  const checkboxes = useCycle(3200, SHOW.checkboxes, 1300);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[25] hidden lg:block select-none overflow-hidden">
      <Shell on={mobile}     style={{ right: "12%",  top: "15%" }}     rot={-3} dur={SHOW.mobile     / 1000}>
        <WFMobile />
      </Shell>

      <Shell on={browser}    style={{ right: "30%", top: "8%" }}      rot={2}  dur={SHOW.browser    / 1000}>
        <WFBrowser />
      </Shell>

      <Shell on={form}       style={{ right: "20%", bottom: "18%" }}  rot={-2} dur={SHOW.form       / 1000}>
        <WFForm />
      </Shell>

      <Shell on={card}       style={{ right: "45%", bottom: "12%" }}  rot={4}  dur={SHOW.card       / 1000}>
        <WFCard />
      </Shell>

      <Shell on={checkboxes} style={{ right: "8%",  top: "35%" }}     rot={2}  dur={SHOW.checkboxes / 1000}>
        <WFCheckboxes />
      </Shell>
    </div>
  );
}
