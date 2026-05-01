"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Animation Variants ──────────────────────────────────────────
// Smooth, elegant drawing of the wireframes
const drawAnim = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.12;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, duration: 1.4, ease: "easeOut" as const },
        opacity: { delay, duration: 0.1 },
      },
    };
  },
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
  children, style, on, dur,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
  on: boolean;
  dur: number;
}) {
  return (
    <AnimatePresence>
      {on && (
        <motion.div
          className="absolute flex items-center justify-center pointer-events-none"
          style={{
            ...style,
            willChange: "transform, opacity",
          }}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{
            scale:   [0.4, 2.4],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            scale: { duration: dur, ease: "linear" as const },
            opacity: { duration: dur, times: [0, 0.15, 0.8, 1], ease: "linear" as const }
          }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Shared Colors ────────────────────────────────────────────────
const PRIMARY_STROKE = "stroke-black/50 dark:stroke-white/50";
const SECONDARY_STROKE = "stroke-black/30 dark:stroke-white/30";
const TERTIARY_STROKE = "stroke-black/20 dark:stroke-white/20";

// ════════════════════════════════════════════════════════════════
// 1 · Mobile phone — 80×148 (Pure Wireframe)
// ════════════════════════════════════════════════════════════════
function WFMobile() {
  return (
    <svg width="80" height="148" viewBox="0 0 80 148" fill="none">
      {/* Phone chassis */}
      <motion.rect x="1" y="1" width="78" height="146" rx="12" className={TERTIARY_STROKE} strokeWidth="1.5" custom={1} variants={drawAnim} initial="hidden" animate="visible" />
      {/* Notch */}
      <motion.rect x="28" y="5" width="24" height="6" rx="3" className={SECONDARY_STROKE} strokeWidth="1" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
      
      {/* Image hero wire */}
      <motion.rect x="8" y="20" width="64" height="48" rx="6" className={PRIMARY_STROKE} strokeWidth="1.5" custom={3} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M8 20 L72 68 M8 68 L72 20" className={TERTIARY_STROKE} strokeWidth="0.5" custom={3} variants={drawAnim} initial="hidden" animate="visible" />
      
      {/* Text lines */}
      <motion.path d="M8 80 L52 80" className={PRIMARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={4} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M8 88 L66 88" className={SECONDARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={5} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M8 96 L40 96" className={TERTIARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={6} variants={drawAnim} initial="hidden" animate="visible" />
      
      {/* Button wire */}
      <motion.rect x="8" y="110" width="64" height="18" rx="9" className={PRIMARY_STROKE} strokeWidth="1.5" custom={7} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M30 119 L50 119" className={PRIMARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={8} variants={drawAnim} initial="hidden" animate="visible" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 2 · Browser — 200×128 (Pure Wireframe)
// ════════════════════════════════════════════════════════════════
function WFBrowser() {
  return (
    <svg width="200" height="128" viewBox="0 0 200 128" fill="none">
      {/* Browser window */}
      <motion.rect x="1" y="1" width="198" height="126" rx="8" className={TERTIARY_STROKE} strokeWidth="1.5" custom={1} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M1 25 L199 25" className={TERTIARY_STROKE} strokeWidth="1" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
      
      {/* Dots */}
      <motion.circle cx="12" cy="13" r="3.5" className={SECONDARY_STROKE} strokeWidth="1" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.circle cx="23" cy="13" r="3.5" className={SECONDARY_STROKE} strokeWidth="1" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.circle cx="34" cy="13" r="3.5" className={SECONDARY_STROKE} strokeWidth="1" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
      
      {/* URL bar */}
      <motion.rect x="48" y="6" width="104" height="14" rx="4" className={SECONDARY_STROKE} strokeWidth="1" custom={3} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M56 13 L116 13" className={TERTIARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={4} variants={drawAnim} initial="hidden" animate="visible" />
      
      {/* Hero image wire */}
      <motion.rect x="8" y="34" width="118" height="66" rx="5" className={PRIMARY_STROKE} strokeWidth="1.5" custom={5} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M8 34 L126 100 M8 100 L126 34" className={TERTIARY_STROKE} strokeWidth="0.5" custom={5} variants={drawAnim} initial="hidden" animate="visible" />
      
      {/* Side text */}
      <motion.path d="M134 40 L180 40" className={PRIMARY_STROKE} strokeWidth="3" strokeLinecap="round" custom={6} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M134 50 L184 50" className={SECONDARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={7} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M134 58 L170 58" className={TERTIARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={8} variants={drawAnim} initial="hidden" animate="visible" />
      
      {/* Button wire */}
      <motion.rect x="134" y="74" width="56" height="16" rx="8" className={PRIMARY_STROKE} strokeWidth="1.5" custom={9} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M148 82 L166 82" className={PRIMARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={10} variants={drawAnim} initial="hidden" animate="visible" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 3 · Card — 144×172 (Pure Wireframe)
// ════════════════════════════════════════════════════════════════
function WFCard() {
  return (
    <svg width="144" height="172" viewBox="0 0 144 172" fill="none">
      <motion.rect x="1" y="1" width="142" height="170" rx="8" className={TERTIARY_STROKE} strokeWidth="1.5" custom={1} variants={drawAnim} initial="hidden" animate="visible" />
      
      <motion.rect x="8" y="8" width="128" height="80" rx="4" className={PRIMARY_STROKE} strokeWidth="1.5" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M8 8 L136 88 M8 88 L136 8" className={TERTIARY_STROKE} strokeWidth="0.5" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
      
      <motion.path d="M8 104 L114 104" className={PRIMARY_STROKE} strokeWidth="3" strokeLinecap="round" custom={3} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M8 114 L132 114" className={SECONDARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={4} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M8 122 L106 122" className={TERTIARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={5} variants={drawAnim} initial="hidden" animate="visible" />
      
      <motion.path d="M8 142 L136 142" className={TERTIARY_STROKE} strokeWidth="1" custom={6} variants={drawAnim} initial="hidden" animate="visible" />
      
      <motion.path d="M8 156 L60 156" className={TERTIARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={7} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.circle cx="122" cy="156" r="6" className={PRIMARY_STROKE} strokeWidth="1.5" custom={8} variants={drawAnim} initial="hidden" animate="visible" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 4 · Form — 176×124 (Pure Wireframe)
// ════════════════════════════════════════════════════════════════
function WFForm() {
  return (
    <svg width="176" height="124" viewBox="0 0 176 124" fill="none">
      <motion.rect x="1" y="1" width="174" height="122" rx="8" className={TERTIARY_STROKE} strokeWidth="1.5" custom={1} variants={drawAnim} initial="hidden" animate="visible" />
      
      <motion.path d="M12 16 L48 16" className={PRIMARY_STROKE} strokeWidth="3" strokeLinecap="round" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
      
      <motion.rect x="12" y="24" width="152" height="22" rx="4" className={PRIMARY_STROKE} strokeWidth="1.5" custom={3} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M20 35 L90 35" className={SECONDARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={4} variants={drawAnim} initial="hidden" animate="visible" />
      
      <motion.rect x="12" y="54" width="152" height="22" rx="4" className={SECONDARY_STROKE} strokeWidth="1" custom={5} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M20 65 L72 65" className={TERTIARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={6} variants={drawAnim} initial="hidden" animate="visible" />
      
      <motion.rect x="12" y="88" width="152" height="24" rx="12" className={PRIMARY_STROKE} strokeWidth="1.5" custom={7} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M68 100 L108 100" className={PRIMARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={8} variants={drawAnim} initial="hidden" animate="visible" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 5 · Checkboxes — 164×116 (Pure Wireframe)
// ════════════════════════════════════════════════════════════════
function WFCheckboxes() {
  return (
    <svg width="164" height="116" viewBox="0 0 164 116" fill="none">
      <motion.rect x="1" y="1" width="162" height="114" rx="8" className={TERTIARY_STROKE} strokeWidth="1.5" custom={1} variants={drawAnim} initial="hidden" animate="visible" />
      
      <motion.path d="M12 16 L72 16" className={PRIMARY_STROKE} strokeWidth="3" strokeLinecap="round" custom={2} variants={drawAnim} initial="hidden" animate="visible" />
      
      {/* Checked box */}
      <motion.rect x="12" y="30" width="16" height="16" rx="2" className={PRIMARY_STROKE} strokeWidth="1.5" custom={3} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M15 38 L18 41 L24 34" className={PRIMARY_STROKE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" custom={4} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M38 38 L138 38" className={SECONDARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={4} variants={drawAnim} initial="hidden" animate="visible" />
      
      {/* Unchecked box */}
      <motion.rect x="12" y="58" width="16" height="16" rx="2" className={SECONDARY_STROKE} strokeWidth="1.5" custom={5} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M38 66 L124 66" className={TERTIARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={6} variants={drawAnim} initial="hidden" animate="visible" />
      
      {/* Checked box */}
      <motion.rect x="12" y="86" width="16" height="16" rx="2" className={PRIMARY_STROKE} strokeWidth="1.5" custom={7} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M15 94 L18 97 L24 90" className={PRIMARY_STROKE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" custom={8} variants={drawAnim} initial="hidden" animate="visible" />
      <motion.path d="M38 94 L108 94" className={SECONDARY_STROKE} strokeWidth="2" strokeLinecap="round" custom={8} variants={drawAnim} initial="hidden" animate="visible" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════════════════
// Extended durations to make the linear fly-through feel natural and give time for the draw
const SHOW = {
  mobile:     4500,
  browser:    4200,
  form:       4500,
  card:       4000,
  checkboxes: 4300,
};

export function HeroReel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const mobile     = useCycle(0,    SHOW.mobile,     1000);
  const browser    = useCycle(900,  SHOW.browser,    1200);
  const form       = useCycle(1800, SHOW.form,       1500);
  const card       = useCycle(2700, SHOW.card,       1400);
  const checkboxes = useCycle(3600, SHOW.checkboxes, 1300);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[25] hidden lg:block select-none overflow-hidden">
      <Shell on={mobile}     style={{ right: "12%",  top: "15%" }}     dur={SHOW.mobile     / 1000}>
        <WFMobile />
      </Shell>

      <Shell on={browser}    style={{ right: "30%", top: "8%" }}      dur={SHOW.browser    / 1000}>
        <WFBrowser />
      </Shell>

      <Shell on={form}       style={{ right: "20%", bottom: "18%" }}  dur={SHOW.form       / 1000}>
        <WFForm />
      </Shell>

      <Shell on={card}       style={{ right: "45%", bottom: "12%" }}  dur={SHOW.card       / 1000}>
        <WFCard />
      </Shell>

      <Shell on={checkboxes} style={{ right: "8%",  top: "35%" }}     dur={SHOW.checkboxes / 1000}>
        <WFCheckboxes />
      </Shell>
    </div>
  );
}
