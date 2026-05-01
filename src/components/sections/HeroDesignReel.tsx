"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

// ── Themes ──────────────────────────────────────────────────────
type Theme = {
  s: string;   // bright accent
  d: string;   // dim accent
  f: string;   // soft fill
  g: string;   // colored glow
  grad: string; // gradient pair (start → end)
};

const TH: Record<"teal" | "orange" | "violet" | "pink" | "blue", Theme> = {
  teal:   { s: "rgba(94,234,212,0.95)",  d: "rgba(94,234,212,0.55)",  f: "rgba(20,184,166,0.18)",  g: "rgba(94,234,212,0.65)",  grad: "#5EEAD4,#0EA5E9" },
  orange: { s: "rgba(255,159,67,0.95)",  d: "rgba(255,122,53,0.55)",  f: "rgba(249,115,22,0.18)",  g: "rgba(255,159,67,0.65)",  grad: "#FB923C,#EF4444" },
  violet: { s: "rgba(167,139,250,0.95)", d: "rgba(139,92,246,0.55)",  f: "rgba(139,92,246,0.18)",  g: "rgba(167,139,250,0.65)", grad: "#A78BFA,#7C3AED" },
  pink:   { s: "rgba(244,114,182,0.95)", d: "rgba(236,72,153,0.55)",  f: "rgba(236,72,153,0.18)",  g: "rgba(244,114,182,0.65)", grad: "#F472B6,#A855F7" },
  blue:   { s: "rgba(125,211,252,0.95)", d: "rgba(96,165,250,0.55)",  f: "rgba(59,130,246,0.18)",  g: "rgba(125,211,252,0.65)", grad: "#7DD3FC,#3B82F6" },
};

const W  = "rgba(255,255,255,0.62)";
const WD = "rgba(255,255,255,0.22)";
const PANEL = "rgba(8,12,20,0.78)";

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
// Outer: scale + position + rotation + opacity (one continuous arc)
// Inner: blur (animated separately so filter doesn't conflict with glow)
// Static drop-shadow glow stays on outer for the whole life.
function Shell({
  children, style, on, theme, rot, dur,
}: {
  children: ReactNode;
  style: CSSProperties;
  on: boolean;
  theme: Theme;
  rot: number;
  dur: number; // seconds
}) {
  return (
    <AnimatePresence>
      {on && (
        <motion.div
          className="absolute"
          style={{
            ...style,
            willChange: "transform, opacity",
            filter: `drop-shadow(0 0 24px ${theme.g}) drop-shadow(0 14px 44px rgba(0,0,0,0.7))`,
          }}
          initial={{ scale: 0.22, y: 70, rotate: 0, opacity: 0 }}
          animate={{
            scale:   [0.22, 0.7,  1.05, 1.6,  2.4],
            y:       [70,   30,   0,    -25,  -85],
            rotate:  [0,    rot * 0.45, rot, rot * 0.65, rot * 0.18],
            opacity: [0,    1,    1,    0.85, 0],
          }}
          transition={{
            duration: dur,
            times:    [0, 0.18, 0.45, 0.78, 1],
            ease:     [0.42, 0.0, 0.58, 1.0] as [number, number, number, number],
          }}
          exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.22 } }}
        >
          <motion.div
            initial={{ filter: "blur(18px)" }}
            animate={{ filter: ["blur(18px)", "blur(3px)", "blur(0px)", "blur(8px)", "blur(28px)"] }}
            transition={{
              duration: dur,
              times:    [0, 0.18, 0.45, 0.78, 1],
              ease:     "easeInOut",
            }}
            style={{ willChange: "filter" }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Helpers ──────────────────────────────────────────────────────
function GradientDef({ id, grad }: { id: string; grad: string }) {
  const [a, b] = grad.split(",");
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stopColor={a} />
      <stop offset="100%" stopColor={b} />
    </linearGradient>
  );
}

// Glass panel background helper (inlined per-element below).


// ════════════════════════════════════════════════════════════════
// 1 · Mobile phone — 96×176
// ════════════════════════════════════════════════════════════════
function WFMobile({ t }: { t: Theme }) {
  return (
    <svg width="96" height="176" viewBox="0 0 96 176" fill="none">
      <defs><GradientDef id="mg" grad={t.grad} /></defs>
      <rect x="1" y="1" width="94" height="174" rx="16" fill={PANEL} stroke={t.d} strokeWidth="1.2"/>
      <rect x="34" y="6" width="28" height="8" rx="4" fill={t.d}/>
      {/* screen */}
      <rect x="6" y="20" width="84" height="134" rx="6" fill="rgba(0,0,0,0.55)" stroke={t.d} strokeWidth="0.6"/>
      {/* status icons */}
      <rect x="12" y="28" width="22" height="3" rx="1.5" fill={t.s}/>
      <circle cx="80" cy="29.5" r="2" fill={W}/>
      <rect x="68" y="28" width="6" height="3" rx="1" fill={W}/>
      {/* hero card with gradient */}
      <rect x="12" y="38" width="72" height="48" rx="6" fill="url(#mg)" opacity="0.9"/>
      <rect x="12" y="38" width="72" height="48" rx="6" fill="none" stroke={t.s} strokeWidth="0.8"/>
      <circle cx="74" cy="48" r="3" fill="white" opacity="0.85"/>
      {/* text lines */}
      <rect x="12" y="94"  width="50" height="3.2" rx="1.6" fill={t.s}/>
      <rect x="12" y="102" width="68" height="2.4" rx="1.2" fill={W}/>
      <rect x="12" y="108" width="58" height="2.4" rx="1.2" fill={WD}/>
      {/* progress bar */}
      <rect x="12" y="116" width="72" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
      <motion.rect
        x="12" y="116" height="3" rx="1.5" fill={t.s}
        initial={{ width: 0 }}
        animate={{ width: [0, 72, 72, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.55, 0.85, 1] }}
      />
      {/* CTA */}
      <rect x="12" y="124" width="72" height="18" rx="9" fill="url(#mg)"/>
      <rect x="36" y="131" width="24" height="3" rx="1.5" fill="white" opacity="0.95"/>
      {/* bottom nav */}
      <line x1="6" y1="146" x2="90" y2="146" stroke={WD} strokeWidth="0.4"/>
      <circle cx="22" cy="150" r="3.6" fill={WD}/>
      <motion.rect
        x="44" y="146.5" width="8" height="7" rx="1.5"
        fill={t.s}
        animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.2, 1] }}
        style={{ transformOrigin: "48px 150px" }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="74" cy="150" r="3.6" fill={WD}/>
      {/* home bar */}
      <rect x="34" y="166" width="28" height="3" rx="1.5" fill={t.d}/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 2 · Browser — 232×148
// ════════════════════════════════════════════════════════════════
function WFBrowser({ t }: { t: Theme }) {
  return (
    <svg width="232" height="148" viewBox="0 0 232 148" fill="none">
      <defs>
        <GradientDef id="bg" grad={t.grad} />
        <clipPath id="bload"><rect x="1" y="29" width="230" height="2"/></clipPath>
      </defs>
      <rect x="1" y="1" width="230" height="146" rx="8" fill={PANEL} stroke={t.d} strokeWidth="1.2"/>
      {/* titlebar */}
      <rect x="1" y="1" width="230" height="28" rx="8" fill="rgba(255,255,255,0.04)"/>
      <line x1="1" y1="29" x2="231" y2="29" stroke={t.d} strokeWidth="0.6"/>
      {/* loading sweep */}
      <g clipPath="url(#bload)">
        <motion.rect y="29" height="2" width="80" fill={t.s}
          initial={{ x: -80 }} animate={{ x: [-80, 232] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
        />
      </g>
      <circle cx="14" cy="15" r="4" fill="#FF5F57"/>
      <circle cx="26" cy="15" r="4" fill="#FFBD2E"/>
      <circle cx="38" cy="15" r="4" fill="#28C840"/>
      <rect x="56" y="7" width="120" height="16" rx="5" fill="rgba(0,0,0,0.45)" stroke={t.d} strokeWidth="0.5"/>
      <rect x="64" y="13" width="76" height="3" rx="1.5" fill={W}/>
      <motion.line x1="146" x2="146" y1="9" y2="21" stroke={t.s} strokeWidth="1.1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.05, repeat: Infinity, ease: "linear" }}
      />
      <path d="M210 11 L218 15 L210 19" stroke={t.d} strokeWidth="1" fill="none"/>
      {/* hero panel */}
      <rect x="10" y="40" width="138" height="78" rx="6" fill="url(#bg)" opacity="0.85"/>
      <rect x="10" y="40" width="138" height="78" rx="6" fill="none" stroke={t.s} strokeWidth="0.6"/>
      <circle cx="134" cy="54" r="4" fill="white" opacity="0.9"/>
      <rect x="20" y="98" width="60" height="3.6" rx="1.8" fill="white" opacity="0.95"/>
      <rect x="20" y="107" width="40" height="2.4" rx="1.2" fill="white" opacity="0.6"/>
      {/* right column */}
      <rect x="156" y="42" width="64" height="4" rx="2" fill={t.s}/>
      <rect x="156" y="52" width="56" height="2.6" rx="1.3" fill={W}/>
      <rect x="156" y="60" width="60" height="2.6" rx="1.3" fill={W}/>
      <rect x="156" y="68" width="44" height="2.6" rx="1.3" fill={WD}/>
      <rect x="156" y="82" width="60" height="16" rx="8" fill="url(#bg)"/>
      <rect x="172" y="88" width="28" height="4" rx="2" fill="white" opacity="0.95"/>
      {/* footer */}
      <rect x="10"  y="128" width="80" height="2.4" rx="1.2" fill={WD}/>
      <rect x="10"  y="135" width="58" height="2.4" rx="1.2" fill={WD}/>
      <rect x="156" y="128" width="64" height="2.4" rx="1.2" fill={WD}/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 3 · Toggles — 180×128
// ════════════════════════════════════════════════════════════════
function WFToggles({ t }: { t: Theme }) {
  return (
    <svg width="180" height="128" viewBox="0 0 180 128" fill="none">
      <defs><GradientDef id="tg" grad={t.grad} /></defs>
      <rect x="1" y="1" width="178" height="126" rx="10" fill={PANEL} stroke={t.d} strokeWidth="1.2"/>
      <rect x="14" y="14" width="68" height="4" rx="2" fill={t.s}/>
      <rect x="14" y="22" width="40" height="2.4" rx="1.2" fill={WD}/>
      <line x1="14" y1="44"  x2="166" y2="44"  stroke={WD} strokeWidth="0.4"/>
      <line x1="14" y1="74"  x2="166" y2="74"  stroke={WD} strokeWidth="0.4"/>
      <line x1="14" y1="104" x2="166" y2="104" stroke={WD} strokeWidth="0.4"/>
      {/* row 1 ON */}
      <rect x="14" y="34" width="80" height="3.2" rx="1.6" fill={W}/>
      <rect x="132" y="32" width="38" height="18" rx="9" fill="url(#tg)"/>
      <circle cx="161" cy="41" r="6" fill="white"/>
      {/* row 2 — animated */}
      <rect x="14" y="64" width="92" height="3.2" rx="1.6" fill={W}/>
      <motion.rect x="132" y="62" width="38" height="18" rx="9"
        animate={{ fill: ["rgba(255,255,255,0.08)","rgba(255,255,255,0.08)", t.s, t.s, "rgba(255,255,255,0.08)"] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.55, 0.9, 1] }}
      />
      <motion.circle cy="71" r="6"
        animate={{ cx: [141, 141, 161, 161, 141], fill: ["rgba(255,255,255,0.5)","rgba(255,255,255,0.5)","white","white","rgba(255,255,255,0.5)"] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.55, 0.9, 1] }}
      />
      {/* row 3 ON */}
      <rect x="14" y="94" width="76" height="3.2" rx="1.6" fill={W}/>
      <rect x="132" y="92" width="38" height="18" rx="9" fill="url(#tg)"/>
      <circle cx="161" cy="101" r="6" fill="white"/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 4 · Buttons — 208×72
// ════════════════════════════════════════════════════════════════
function WFButtons({ t }: { t: Theme }) {
  return (
    <svg width="208" height="72" viewBox="0 0 208 72" fill="none">
      <defs>
        <GradientDef id="btg" grad={t.grad} />
        <clipPath id="btnclip"><rect x="6" y="14" width="92" height="44" rx="22"/></clipPath>
      </defs>
      <rect x="1" y="1" width="206" height="70" rx="10" fill={PANEL} stroke={t.d} strokeWidth="1.2"/>
      {/* primary */}
      <rect x="6" y="14" width="92" height="44" rx="22" fill="url(#btg)"/>
      <g clipPath="url(#btnclip)">
        <motion.rect y="14" height="44" width="22" fill="white" fillOpacity="0.32"
          initial={{ x: -24 }} animate={{ x: [-24, 100] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.4 }}
        />
      </g>
      <circle cx="22" cy="36" r="3.2" fill="white"/>
      <rect x="32" y="34" width="40" height="3.6" rx="1.8" fill="white" opacity="0.95"/>
      {/* secondary */}
      <rect x="110" y="14" width="92" height="44" rx="22" fill="rgba(255,255,255,0.04)" stroke={t.s} strokeWidth="1.2"/>
      <circle cx="126" cy="36" r="3.2" fill={t.s}/>
      <rect x="136" y="34" width="40" height="3.6" rx="1.8" fill={t.s}/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 5 · Form — 200×148
// ════════════════════════════════════════════════════════════════
function WFForm({ t }: { t: Theme }) {
  return (
    <svg width="200" height="148" viewBox="0 0 200 148" fill="none">
      <defs><GradientDef id="fg" grad={t.grad} /></defs>
      <rect x="1" y="1" width="198" height="146" rx="10" fill={PANEL} stroke={t.d} strokeWidth="1.2"/>
      <rect x="14" y="12" width="40" height="3.6" rx="1.8" fill={t.s}/>
      {/* input 1 */}
      <rect x="14" y="22" width="172" height="24" rx="6" fill="rgba(0,0,0,0.4)" stroke={t.s} strokeWidth="1"/>
      <rect x="22" y="32" width="80" height="3.6" rx="1.8" fill={W}/>
      <motion.line x1="106" x2="106" y1="28" y2="40" stroke={t.s} strokeWidth="1.2"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.05, repeat: Infinity, ease: "linear" }}
      />
      <circle cx="174" cy="34" r="3.6" fill="none" stroke={t.d} strokeWidth="0.8"/>
      {/* label 2 */}
      <rect x="14" y="56" width="52" height="3.6" rx="1.8" fill={W}/>
      {/* input 2 */}
      <rect x="14" y="66" width="172" height="24" rx="6" fill="rgba(0,0,0,0.4)" stroke={t.d} strokeWidth="0.8"/>
      <rect x="22" y="76" width="60" height="3.2" rx="1.6" fill={WD}/>
      {/* submit */}
      <motion.rect x="14" y="100" width="172" height="32" rx="16" fill="url(#fg)"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <rect x="80" y="114" width="40" height="4" rx="2" fill="white" opacity="0.95"/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 6 · Card — 168×196
// ════════════════════════════════════════════════════════════════
function WFCard({ t }: { t: Theme }) {
  return (
    <svg width="168" height="196" viewBox="0 0 168 196" fill="none">
      <defs><GradientDef id="cg" grad={t.grad} /></defs>
      <rect x="1" y="1" width="166" height="194" rx="14" fill={PANEL} stroke={t.d} strokeWidth="1.2"/>
      {/* cover */}
      <rect x="10" y="10" width="148" height="92" rx="8" fill="url(#cg)" opacity="0.9"/>
      <rect x="10" y="10" width="148" height="92" rx="8" fill="none" stroke={t.s} strokeWidth="0.6"/>
      <circle cx="138" cy="28" r="5" fill="white" opacity="0.85"/>
      <rect x="20" y="78" width="56" height="3.6" rx="1.8" fill="white" opacity="0.95"/>
      {/* tag pill */}
      <rect x="10" y="112" width="56" height="18" rx="9" fill="rgba(255,255,255,0.06)" stroke={t.s} strokeWidth="0.8"/>
      <rect x="22" y="120" width="32" height="3" rx="1.5" fill={t.s}/>
      {/* title */}
      <motion.rect x="10" y="140" width="120" height="5" rx="2.5" fill={t.s}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1] }}
        style={{ transformOrigin: "10px 142px" }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", times: [0, 0.5, 1] }}
      />
      <rect x="10" y="151" width="140" height="3.2" rx="1.6" fill={W}/>
      <rect x="10" y="159" width="124" height="3.2" rx="1.6" fill={WD}/>
      {/* footer */}
      <rect x="10" y="176" width="60" height="3.2" rx="1.6" fill={WD}/>
      <circle cx="146" cy="178" r="8" fill="url(#cg)"/>
      <rect x="142" y="177" width="8" height="2" rx="1" fill="white"/>
      <rect x="145" y="174" width="2" height="8" rx="1" fill="white"/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 7 · NavBar — 256×64
// ════════════════════════════════════════════════════════════════
function WFNavBar({ t }: { t: Theme }) {
  return (
    <svg width="256" height="64" viewBox="0 0 256 64" fill="none">
      <defs><GradientDef id="ng" grad={t.grad} /></defs>
      <rect x="1" y="1" width="254" height="62" rx="10" fill={PANEL} stroke={t.d} strokeWidth="1.2"/>
      {/* logo */}
      <rect x="14" y="20" width="32" height="24" rx="5" fill="url(#ng)"/>
      <rect x="22" y="30" width="16" height="3.4" rx="1.7" fill="white" opacity="0.95"/>
      {/* links */}
      <rect x="64"  y="30" width="28" height="3.4" rx="1.7" fill={W}/>
      <rect x="108" y="30" width="28" height="3.4" rx="1.7" fill={W}/>
      <rect x="152" y="30" width="28" height="3.4" rx="1.7" fill={W}/>
      {/* sliding underline */}
      <motion.rect y="42" height="2.2" rx="1.1" fill={t.s}
        animate={{ x: [64, 108, 152, 108, 64], width: [28, 28, 28, 28, 28] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
      />
      {/* CTA */}
      <rect x="200" y="18" width="40" height="28" rx="14" fill="url(#ng)"/>
      <rect x="210" y="30" width="20" height="3.4" rx="1.7" fill="white" opacity="0.95"/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 8 · Checkboxes — 188×136
// ════════════════════════════════════════════════════════════════
function WFCheckboxes({ t }: { t: Theme }) {
  return (
    <svg width="188" height="136" viewBox="0 0 188 136" fill="none">
      <defs><GradientDef id="kg" grad={t.grad} /></defs>
      <rect x="1" y="1" width="186" height="134" rx="10" fill={PANEL} stroke={t.d} strokeWidth="1.2"/>
      <rect x="14" y="14" width="68" height="4" rx="2" fill={t.s}/>
      {/* row 1 checked */}
      <rect x="14" y="30" width="18" height="18" rx="4" fill="url(#kg)"/>
      <motion.path d="M18 39.5 L23 44.5 L29 35"
        stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut", times: [0, 0.25, 0.85, 1] }}
      />
      <rect x="42" y="36" width="120" height="3.2" rx="1.6" fill={W}/>
      <rect x="42" y="43" width="86"  height="2.6" rx="1.3" fill={WD}/>
      {/* row 2 unchecked */}
      <rect x="14" y="58" width="18" height="18" rx="4" fill="rgba(255,255,255,0.04)" stroke={t.d} strokeWidth="1"/>
      <rect x="42" y="64" width="106" height="3.2" rx="1.6" fill={W}/>
      <rect x="42" y="71" width="64"  height="2.6" rx="1.3" fill={WD}/>
      {/* row 3 checked */}
      <rect x="14" y="86" width="18" height="18" rx="4" fill="url(#kg)"/>
      <motion.path d="M18 95.5 L23 100.5 L29 91"
        stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut", times: [0, 0.25, 0.85, 1], delay: 0.6 }}
      />
      <rect x="42" y="92"  width="124" height="3.2" rx="1.6" fill={W}/>
      <rect x="42" y="99"  width="78"  height="2.6" rx="1.3" fill={WD}/>
      {/* row 4 unchecked */}
      <rect x="14" y="114" width="18" height="18" rx="4" fill="rgba(255,255,255,0.04)" stroke={t.d} strokeWidth="1"/>
      <rect x="42" y="120" width="92" height="3.2" rx="1.6" fill={WD}/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 9 · Slider — 200×80
// ════════════════════════════════════════════════════════════════
function WFSlider({ t }: { t: Theme }) {
  return (
    <svg width="200" height="80" viewBox="0 0 200 80" fill="none">
      <defs><GradientDef id="sg" grad={t.grad} /></defs>
      <rect x="1" y="1" width="198" height="78" rx="10" fill={PANEL} stroke={t.d} strokeWidth="1.2"/>
      <rect x="14" y="14" width="56" height="3.8" rx="1.9" fill={t.s}/>
      <rect x="170" y="14" width="16" height="3.4" rx="1.7" fill={W}/>
      {/* track */}
      <rect x="14" y="44" width="172" height="6" rx="3" fill="rgba(255,255,255,0.08)"/>
      <motion.rect x="14" y="44" height="6" rx="3" fill="url(#sg)"
        animate={{ width: [0, 172, 172, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 0.5, 1] }}
      />
      {/* thumb */}
      <motion.circle cy="47" r="11" fill="white"
        animate={{ cx: [14, 186, 186, 14] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 0.5, 1] }}
      />
      <motion.circle cy="47" r="5" fill="url(#sg)"
        animate={{ cx: [14, 186, 186, 14] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 0.5, 1] }}
      />
      <rect x="14"  y="62" width="20" height="3" rx="1.5" fill={WD}/>
      <rect x="166" y="62" width="20" height="3" rx="1.5" fill={WD}/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════════════════
const SHOW = {
  mobile:     5500,
  browser:    6500,
  toggles:    5500,
  buttons:    4500,
  form:       5200,
  card:       6000,
  navbar:     5000,
  checkboxes: 5000,
  slider:     4500,
};

export default function HeroDesignReel() {
  const mobile     = useCycle(1500, SHOW.mobile,     3500);
  const browser    = useCycle(2000, SHOW.browser,    2800);
  const toggles    = useCycle(3200, SHOW.toggles,    3200);
  const buttons    = useCycle(1800, SHOW.buttons,    4000);
  const form       = useCycle(4200, SHOW.form,       3000);
  const card       = useCycle(2700, SHOW.card,       2500);
  const navbar     = useCycle(3800, SHOW.navbar,     3500);
  const checkboxes = useCycle(5200, SHOW.checkboxes, 3000);
  const slider     = useCycle(6500, SHOW.slider,     3500);

  return (
    <div className="absolute inset-0 pointer-events-none z-[25] hidden lg:block select-none">

      <Shell on={mobile}     style={{ right: "8%",  top: "8%" }}      theme={TH.teal}   rot={-3} dur={SHOW.mobile     / 1000}>
        <WFMobile t={TH.teal} />
      </Shell>

      <Shell on={browser}    style={{ right: "26%", top: "5%" }}      theme={TH.orange} rot={2}  dur={SHOW.browser    / 1000}>
        <WFBrowser t={TH.orange} />
      </Shell>

      <Shell on={toggles}    style={{ right: "7%",  top: "44%" }}     theme={TH.violet} rot={-4} dur={SHOW.toggles    / 1000}>
        <WFToggles t={TH.violet} />
      </Shell>

      <Shell on={buttons}    style={{ right: "8%",  bottom: "26%" }}  theme={TH.pink}   rot={3}  dur={SHOW.buttons    / 1000}>
        <WFButtons t={TH.pink} />
      </Shell>

      <Shell on={form}       style={{ right: "22%", bottom: "11%" }}  theme={TH.blue}   rot={-2} dur={SHOW.form       / 1000}>
        <WFForm t={TH.blue} />
      </Shell>

      <Shell on={card}       style={{ right: "40%", bottom: "9%" }}   theme={TH.teal}   rot={4}  dur={SHOW.card       / 1000}>
        <WFCard t={TH.teal} />
      </Shell>

      <Shell on={navbar}     style={{ right: "32%", top: "3%" }}      theme={TH.orange} rot={-3} dur={SHOW.navbar     / 1000}>
        <WFNavBar t={TH.orange} />
      </Shell>

      <Shell on={checkboxes} style={{ right: "7%",  top: "22%" }}     theme={TH.violet} rot={2}  dur={SHOW.checkboxes / 1000}>
        <WFCheckboxes t={TH.violet} />
      </Shell>

      <Shell on={slider}     style={{ right: "52%", bottom: "14%" }}  theme={TH.pink}   rot={-4} dur={SHOW.slider     / 1000}>
        <WFSlider t={TH.pink} />
      </Shell>
    </div>
  );
}
