"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

// ── Themes ──────────────────────────────────────────────────────
type Theme = {
  s: string;
  d: string;
  f: string;
  g: string;
  grad: string;
};

const TH: Record<"teal" | "orange" | "violet" | "pink" | "blue", Theme> = {
  teal:   { s: "rgba(94,234,212,0.9)",  d: "rgba(94,234,212,0.4)",  f: "rgba(20,184,166,0.14)",  g: "rgba(94,234,212,0.5)",  grad: "#5EEAD4,#0EA5E9" },
  orange: { s: "rgba(255,159,67,0.9)",  d: "rgba(255,122,53,0.4)",  f: "rgba(249,115,22,0.14)",  g: "rgba(255,159,67,0.5)",  grad: "#FB923C,#EF4444" },
  violet: { s: "rgba(167,139,250,0.9)", d: "rgba(139,92,246,0.4)",  f: "rgba(139,92,246,0.14)",  g: "rgba(167,139,250,0.5)", grad: "#A78BFA,#7C3AED" },
  pink:   { s: "rgba(244,114,182,0.9)", d: "rgba(236,72,153,0.4)",  f: "rgba(236,72,153,0.14)",  g: "rgba(244,114,182,0.5)", grad: "#F472B6,#A855F7" },
  blue:   { s: "rgba(125,211,252,0.9)", d: "rgba(96,165,250,0.4)",  f: "rgba(59,130,246,0.14)",  g: "rgba(125,211,252,0.5)", grad: "#7DD3FC,#3B82F6" },
};

const W  = "rgba(255,255,255,0.55)";
const WD = "rgba(255,255,255,0.18)";
const PANEL = "rgba(6,10,18,0.72)";

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
// Fast zoom in, brief clarity, fade to face as scale approaches viewer
function Shell({
  children, style, on, theme, rot, dur,
}: {
  children: ReactNode;
  style: CSSProperties;
  on: boolean;
  theme: Theme;
  rot: number;
  dur: number;
}) {
  return (
    <AnimatePresence>
      {on && (
        <motion.div
          className="absolute"
          style={{
            ...style,
            willChange: "transform, opacity",
            filter: `drop-shadow(0 0 18px ${theme.g}) drop-shadow(0 8px 32px rgba(0,0,0,0.6))`,
          }}
          initial={{ scale: 0.18, y: 60, rotate: 0, opacity: 0 }}
          animate={{
            scale:   [0.18, 0.65, 1.0, 1.55, 2.2],
            y:       [60,   22,   0,   -22,  -70],
            rotate:  [0,    rot * 0.5, rot, rot * 0.6, rot * 0.1],
            opacity: [0,    0.65, 0.65, 0.5, 0],
          }}
          transition={{
            duration: dur,
            times:    [0, 0.15, 0.42, 0.76, 1],
            ease:     [0.22, 0.0, 0.58, 1.0] as [number, number, number, number],
          }}
          exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.18 } }}
        >
          <motion.div
            initial={{ filter: "blur(16px)" }}
            animate={{ filter: ["blur(16px)", "blur(2px)", "blur(0px)", "blur(6px)", "blur(22px)"] }}
            transition={{
              duration: dur,
              times:    [0, 0.15, 0.42, 0.76, 1],
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

// build-up: shapes that assemble during entry (delay-based reveal)
const BUILD = { ease: "easeOut" as const, duration: 0.5 };

// ════════════════════════════════════════════════════════════════
// 1 · Mobile phone — 80×148
// ════════════════════════════════════════════════════════════════
function WFMobile({ t }: { t: Theme }) {
  return (
    <svg width="80" height="148" viewBox="0 0 80 148" fill="none">
      <defs><GradientDef id="mg" grad={t.grad} /></defs>
      <rect x="1" y="1" width="78" height="146" rx="14" fill={PANEL} stroke={t.d} strokeWidth="1"/>
      {/* notch */}
      <rect x="28" y="5" width="24" height="7" rx="3.5" fill={t.d}/>
      {/* screen area */}
      <rect x="5" y="16" width="70" height="112" rx="5" fill="rgba(0,0,0,0.5)"/>
      {/* gradient hero card — builds up */}
      <motion.rect x="8" y="20" width="64" height="48" rx="6"
        fill="url(#mg)" opacity="0.85"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.85 }}
        style={{ transformOrigin: "40px 20px" }}
        transition={{ ...BUILD, delay: 0.08 }}
      />
      {/* text lines */}
      <motion.rect x="8" y="76" width="44" height="3" rx="1.5" fill={t.s}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: "8px 77.5px" }}
        transition={{ ...BUILD, delay: 0.16 }}
      />
      <motion.rect x="8" y="83" width="58" height="2.4" rx="1.2" fill={W}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: "8px 84.2px" }}
        transition={{ ...BUILD, delay: 0.22 }}
      />
      {/* CTA button */}
      <motion.rect x="8" y="96" width="64" height="18" rx="9" fill="url(#mg)"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: "40px 105px" }}
        transition={{ ...BUILD, delay: 0.3 }}
      />
      <rect x="26" y="103" width="28" height="3" rx="1.5" fill="white" opacity="0.9"/>
      {/* home bar */}
      <rect x="28" y="139" width="24" height="3" rx="1.5" fill={t.d}/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 2 · Browser — 200×128
// ════════════════════════════════════════════════════════════════
function WFBrowser({ t }: { t: Theme }) {
  return (
    <svg width="200" height="128" viewBox="0 0 200 128" fill="none">
      <defs>
        <GradientDef id="bg" grad={t.grad} />
        <clipPath id="bload"><rect x="1" y="26" width="198" height="2"/></clipPath>
      </defs>
      <rect x="1" y="1" width="198" height="126" rx="8" fill={PANEL} stroke={t.d} strokeWidth="1"/>
      {/* chrome bar */}
      <rect x="1" y="1" width="198" height="25" rx="8" fill="rgba(255,255,255,0.03)"/>
      <line x1="1" y1="26" x2="199" y2="26" stroke={t.d} strokeWidth="0.5"/>
      {/* loading sweep */}
      <g clipPath="url(#bload)">
        <motion.rect y="26" height="2" width="70" fill={t.s}
          initial={{ x: -70 }} animate={{ x: [-70, 200] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
        />
      </g>
      <circle cx="12" cy="13" r="3.5" fill="#FF5F57"/>
      <circle cx="23" cy="13" r="3.5" fill="#FFBD2E"/>
      <circle cx="34" cy="13" r="3.5" fill="#28C840"/>
      <rect x="48" y="6" width="104" height="14" rx="4" fill="rgba(0,0,0,0.4)" stroke={t.d} strokeWidth="0.4"/>
      <rect x="56" y="11" width="60" height="2.6" rx="1.3" fill={W}/>
      {/* main hero panel — builds up */}
      <motion.rect x="8" y="34" width="118" height="66" rx="5"
        fill="url(#bg)" opacity="0.8"
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 0.8 }}
        style={{ transformOrigin: "8px 67px" }}
        transition={{ ...BUILD, delay: 0.1 }}
      />
      {/* right column text */}
      <motion.rect x="134" y="36" width="56" height="3.6" rx="1.8" fill={t.s}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: "134px 37.8px" }}
        transition={{ ...BUILD, delay: 0.18 }}
      />
      <motion.rect x="134" y="46" width="50" height="2.4" rx="1.2" fill={W}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: "134px 47.2px" }}
        transition={{ ...BUILD, delay: 0.24 }}
      />
      <motion.rect x="134" y="53" width="42" height="2.4" rx="1.2" fill={WD}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: "134px 54.2px" }}
        transition={{ ...BUILD, delay: 0.28 }}
      />
      <motion.rect x="134" y="70" width="56" height="14" rx="7" fill="url(#bg)"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: "162px 77px" }}
        transition={{ ...BUILD, delay: 0.34 }}
      />
      <rect x="148" y="75" width="28" height="3" rx="1.5" fill="white" opacity="0.9"/>
      {/* bottom bar */}
      <rect x="8" y="108" width="60" height="2.2" rx="1.1" fill={WD}/>
      <rect x="8" y="115" width="42" height="2.2" rx="1.1" fill={WD}/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 3 · Toggles — 160×112
// ════════════════════════════════════════════════════════════════
function WFToggles({ t }: { t: Theme }) {
  return (
    <svg width="160" height="112" viewBox="0 0 160 112" fill="none">
      <defs><GradientDef id="tg" grad={t.grad} /></defs>
      <rect x="1" y="1" width="158" height="110" rx="10" fill={PANEL} stroke={t.d} strokeWidth="1"/>
      <rect x="12" y="12" width="60" height="3.6" rx="1.8" fill={t.s}/>
      {/* row 1 — ON, builds up */}
      <rect x="12" y="28" width="72" height="2.8" rx="1.4" fill={W}/>
      <motion.rect x="114" y="27" width="34" height="16" rx="8" fill="url(#tg)"
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        style={{ transformOrigin: "114px 35px" }}
        transition={{ ...BUILD, delay: 0.1 }}
      />
      <circle cx="140" cy="35" r="5" fill="white"/>
      {/* row 2 — animated toggle */}
      <rect x="12" y="58" width="80" height="2.8" rx="1.4" fill={W}/>
      <motion.rect x="114" y="55" width="34" height="16" rx="8"
        animate={{ fill: ["rgba(255,255,255,0.07)", t.s, t.s, "rgba(255,255,255,0.07)"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.85, 1] }}
      />
      <motion.circle cy="63" r="5"
        animate={{ cx: [123, 140, 140, 123], fill: ["rgba(255,255,255,0.45)", "white", "white", "rgba(255,255,255,0.45)"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.85, 1] }}
      />
      {/* row 3 — ON */}
      <rect x="12" y="88" width="64" height="2.8" rx="1.4" fill={W}/>
      <motion.rect x="114" y="85" width="34" height="16" rx="8" fill="url(#tg)"
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        style={{ transformOrigin: "114px 93px" }}
        transition={{ ...BUILD, delay: 0.2 }}
      />
      <circle cx="140" cy="93" r="5" fill="white"/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 4 · Buttons — 184×60
// ════════════════════════════════════════════════════════════════
function WFButtons({ t }: { t: Theme }) {
  return (
    <svg width="184" height="60" viewBox="0 0 184 60" fill="none">
      <defs>
        <GradientDef id="btg" grad={t.grad} />
        <clipPath id="btnclip"><rect x="6" y="11" width="82" height="38" rx="19"/></clipPath>
      </defs>
      <rect x="1" y="1" width="182" height="58" rx="10" fill={PANEL} stroke={t.d} strokeWidth="1"/>
      {/* primary */}
      <motion.rect x="6" y="11" width="82" height="38" rx="19" fill="url(#btg)"
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        style={{ transformOrigin: "6px 30px" }}
        transition={{ ...BUILD, delay: 0.08 }}
      />
      <g clipPath="url(#btnclip)">
        <motion.rect y="11" height="38" width="18" fill="white" fillOpacity="0.28"
          initial={{ x: -20 }} animate={{ x: [-20, 90] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.6 }}
        />
      </g>
      <rect x="28" y="28" width="36" height="3.2" rx="1.6" fill="white" opacity="0.9"/>
      {/* secondary */}
      <motion.rect x="96" y="11" width="82" height="38" rx="19"
        fill="rgba(255,255,255,0.03)" stroke={t.s} strokeWidth="1"
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        style={{ transformOrigin: "96px 30px" }}
        transition={{ ...BUILD, delay: 0.18 }}
      />
      <rect x="120" y="28" width="36" height="3.2" rx="1.6" fill={t.s}/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 5 · Form — 176×124
// ════════════════════════════════════════════════════════════════
function WFForm({ t }: { t: Theme }) {
  return (
    <svg width="176" height="124" viewBox="0 0 176 124" fill="none">
      <defs><GradientDef id="fg" grad={t.grad} /></defs>
      <rect x="1" y="1" width="174" height="122" rx="10" fill={PANEL} stroke={t.d} strokeWidth="1"/>
      <rect x="12" y="10" width="36" height="3.2" rx="1.6" fill={t.s}/>
      {/* input 1 — with cursor */}
      <motion.rect x="12" y="20" width="152" height="22" rx="5"
        fill="rgba(0,0,0,0.38)" stroke={t.s} strokeWidth="0.9"
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        style={{ transformOrigin: "12px 31px" }}
        transition={{ ...BUILD, delay: 0.08 }}
      />
      <rect x="20" y="29" width="70" height="3" rx="1.5" fill={W}/>
      <motion.line x1="94" x2="94" y1="26" y2="36" stroke={t.s} strokeWidth="1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.05, repeat: Infinity, ease: "linear" }}
      />
      {/* input 2 */}
      <motion.rect x="12" y="50" width="152" height="22" rx="5"
        fill="rgba(0,0,0,0.38)" stroke={t.d} strokeWidth="0.7"
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        style={{ transformOrigin: "12px 61px" }}
        transition={{ ...BUILD, delay: 0.16 }}
      />
      <rect x="20" y="59" width="52" height="2.8" rx="1.4" fill={WD}/>
      {/* submit */}
      <motion.rect x="12" y="84" width="152" height="28" rx="14" fill="url(#fg)"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.95 }}
        style={{ transformOrigin: "88px 98px" }}
        transition={{ ...BUILD, delay: 0.26 }}
      />
      <rect x="68" y="96" width="40" height="3.4" rx="1.7" fill="white" opacity="0.95"/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 6 · Card — 144×172
// ════════════════════════════════════════════════════════════════
function WFCard({ t }: { t: Theme }) {
  return (
    <svg width="144" height="172" viewBox="0 0 144 172" fill="none">
      <defs><GradientDef id="cg" grad={t.grad} /></defs>
      <rect x="1" y="1" width="142" height="170" rx="12" fill={PANEL} stroke={t.d} strokeWidth="1"/>
      {/* cover image */}
      <motion.rect x="8" y="8" width="128" height="80" rx="7" fill="url(#cg)" opacity="0.85"
        initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 0.85 }}
        style={{ transformOrigin: "72px 8px" }}
        transition={{ ...BUILD, delay: 0.08 }}
      />
      {/* title */}
      <motion.rect x="8" y="98" width="106" height="4.4" rx="2.2" fill={t.s}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: "8px 100.2px" }}
        transition={{ ...BUILD, delay: 0.18 }}
      />
      <motion.rect x="8" y="108" width="124" height="2.8" rx="1.4" fill={W}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: "8px 109.4px" }}
        transition={{ ...BUILD, delay: 0.24 }}
      />
      <motion.rect x="8" y="115" width="98" height="2.8" rx="1.4" fill={WD}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: "8px 116.4px" }}
        transition={{ ...BUILD, delay: 0.28 }}
      />
      {/* footer */}
      <line x1="8" y1="142" x2="136" y2="142" stroke={WD} strokeWidth="0.4"/>
      <rect x="8" y="152" width="52" height="2.8" rx="1.4" fill={WD}/>
      <motion.circle cx="122" cy="154" r="8" fill="url(#cg)"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: "122px 154px" }}
        transition={{ ...BUILD, delay: 0.34 }}
      />
      <rect x="118" y="153" width="8" height="2" rx="1" fill="white"/>
      <rect x="121" y="150" width="2" height="8" rx="1" fill="white"/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 7 · NavBar — 224×52
// ════════════════════════════════════════════════════════════════
function WFNavBar({ t }: { t: Theme }) {
  return (
    <svg width="224" height="52" viewBox="0 0 224 52" fill="none">
      <defs><GradientDef id="ng" grad={t.grad} /></defs>
      <rect x="1" y="1" width="222" height="50" rx="9" fill={PANEL} stroke={t.d} strokeWidth="1"/>
      {/* logo mark */}
      <motion.rect x="12" y="14" width="28" height="24" rx="5" fill="url(#ng)"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: "26px 26px" }}
        transition={{ ...BUILD, delay: 0.06 }}
      />
      <rect x="18" y="24" width="16" height="3" rx="1.5" fill="white" opacity="0.9"/>
      {/* nav links — stagger */}
      {([
        [54, "nl1"],
        [92, "nl2"],
        [130, "nl3"],
      ] as [number, string][]).map(([x, key], i) => (
        <motion.rect key={key} x={x} y="24" width="26" height="3" rx="1.5" fill={W}
          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
          transition={{ ...BUILD, delay: 0.12 + i * 0.07 }}
        />
      ))}
      {/* sliding underline */}
      <motion.rect y="38" height="2" rx="1" fill={t.s}
        animate={{ x: [54, 92, 130, 92, 54], width: [26, 26, 26, 26, 26] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
      />
      {/* CTA */}
      <motion.rect x="174" y="14" width="40" height="24" rx="12" fill="url(#ng)"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: "194px 26px" }}
        transition={{ ...BUILD, delay: 0.3 }}
      />
      <rect x="182" y="23" width="24" height="3" rx="1.5" fill="white" opacity="0.9"/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 8 · Checkboxes — 164×116
// ════════════════════════════════════════════════════════════════
function WFCheckboxes({ t }: { t: Theme }) {
  return (
    <svg width="164" height="116" viewBox="0 0 164 116" fill="none">
      <defs><GradientDef id="kg" grad={t.grad} /></defs>
      <rect x="1" y="1" width="162" height="114" rx="10" fill={PANEL} stroke={t.d} strokeWidth="1"/>
      <rect x="12" y="11" width="60" height="3.6" rx="1.8" fill={t.s}/>
      {/* rows — stagger reveal */}
      {([
        [26, "c1", true, 0.1],
        [54, "c2", false, 0.18],
        [82, "c3", true, 0.26],
      ] as [number, string, boolean, number][]).map(([y, key, checked, delay]) => (
        <g key={key}>
          {checked ? (
            <motion.rect x="12" y={y} width="16" height="16" rx="3.5" fill="url(#kg)"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ transformOrigin: `20px ${y + 8}px` }}
              transition={{ ...BUILD, delay }}
            />
          ) : (
            <motion.rect x="12" y={y} width="16" height="16" rx="3.5"
              fill="rgba(255,255,255,0.04)" stroke={t.d} strokeWidth="0.9"
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ transformOrigin: `20px ${y + 8}px` }}
              transition={{ ...BUILD, delay }}
            />
          )}
          {checked && (
            <motion.path d={`M14 ${y + 8.5} L18.5 ${y + 12.5} L24 ${y + 5}`}
              stroke="white" strokeWidth="1.8" fill="none"
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: delay + 0.12 }}
            />
          )}
          <motion.rect x="38" y={y + 5} width={checked ? 100 : 86} height="2.8" rx="1.4"
            fill={checked ? W : WD}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            style={{ transformOrigin: `38px ${y + 6.4}px` }}
            transition={{ ...BUILD, delay: delay + 0.06 }}
          />
        </g>
      ))}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// 9 · Slider — 176×68
// ════════════════════════════════════════════════════════════════
function WFSlider({ t }: { t: Theme }) {
  return (
    <svg width="176" height="68" viewBox="0 0 176 68" fill="none">
      <defs><GradientDef id="sg" grad={t.grad} /></defs>
      <rect x="1" y="1" width="174" height="66" rx="10" fill={PANEL} stroke={t.d} strokeWidth="1"/>
      <rect x="12" y="11" width="48" height="3.4" rx="1.7" fill={t.s}/>
      <rect x="148" y="11" width="16" height="3.4" rx="1.7" fill={W}/>
      {/* track bg */}
      <motion.rect x="12" y="36" width="152" height="5" rx="2.5" fill="rgba(255,255,255,0.07)"
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        style={{ transformOrigin: "12px 38.5px" }}
        transition={{ ...BUILD, delay: 0.1 }}
      />
      {/* fill track */}
      <motion.rect x="12" y="36" height="5" rx="2.5" fill="url(#sg)"
        animate={{ width: [0, 152, 152, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.48, 0.52, 1] }}
      />
      {/* thumb */}
      <motion.circle cy="38.5" r="10" fill="white"
        animate={{ cx: [12, 164, 164, 12] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.48, 0.52, 1] }}
      />
      <motion.circle cy="38.5" r="4.5" fill="url(#sg)"
        animate={{ cx: [12, 164, 164, 12] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.48, 0.52, 1] }}
      />
      <rect x="12"  y="54" width="18" height="2.6" rx="1.3" fill={WD}/>
      <rect x="146" y="54" width="18" height="2.6" rx="1.3" fill={WD}/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════════════════
const SHOW = {
  mobile:     2800,
  browser:    3200,
  toggles:    2600,
  buttons:    2400,
  form:       2800,
  card:       3000,
  navbar:     2600,
  checkboxes: 2600,
  slider:     2400,
};

export default function HeroDesignReel() {
  const mobile     = useCycle(1400, SHOW.mobile,     2800);
  const browser    = useCycle(1900, SHOW.browser,    2400);
  const toggles    = useCycle(3000, SHOW.toggles,    2800);
  const buttons    = useCycle(1600, SHOW.buttons,    3400);
  const form       = useCycle(3800, SHOW.form,       2600);
  const card       = useCycle(2400, SHOW.card,       2200);
  const navbar     = useCycle(3400, SHOW.navbar,     3000);
  const checkboxes = useCycle(4800, SHOW.checkboxes, 2600);
  const slider     = useCycle(5800, SHOW.slider,     3000);

  return (
    <div className="absolute inset-0 pointer-events-none z-[25] hidden lg:block select-none">

      <Shell on={mobile}     style={{ right: "6%",  top: "10%" }}     theme={TH.teal}   rot={-3} dur={SHOW.mobile     / 1000}>
        <WFMobile t={TH.teal} />
      </Shell>

      <Shell on={browser}    style={{ right: "24%", top: "6%" }}      theme={TH.orange} rot={2}  dur={SHOW.browser    / 1000}>
        <WFBrowser t={TH.orange} />
      </Shell>

      <Shell on={toggles}    style={{ right: "5%",  top: "42%" }}     theme={TH.violet} rot={-4} dur={SHOW.toggles    / 1000}>
        <WFToggles t={TH.violet} />
      </Shell>

      <Shell on={buttons}    style={{ right: "6%",  bottom: "28%" }}  theme={TH.pink}   rot={3}  dur={SHOW.buttons    / 1000}>
        <WFButtons t={TH.pink} />
      </Shell>

      <Shell on={form}       style={{ right: "20%", bottom: "13%" }}  theme={TH.blue}   rot={-2} dur={SHOW.form       / 1000}>
        <WFForm t={TH.blue} />
      </Shell>

      <Shell on={card}       style={{ right: "38%", bottom: "10%" }}  theme={TH.teal}   rot={4}  dur={SHOW.card       / 1000}>
        <WFCard t={TH.teal} />
      </Shell>

      <Shell on={navbar}     style={{ right: "30%", top: "4%" }}      theme={TH.orange} rot={-3} dur={SHOW.navbar     / 1000}>
        <WFNavBar t={TH.orange} />
      </Shell>

      <Shell on={checkboxes} style={{ right: "6%",  top: "24%" }}     theme={TH.violet} rot={2}  dur={SHOW.checkboxes / 1000}>
        <WFCheckboxes t={TH.violet} />
      </Shell>

      <Shell on={slider}     style={{ right: "50%", bottom: "15%" }}  theme={TH.pink}   rot={-4} dur={SHOW.slider     / 1000}>
        <WFSlider t={TH.pink} />
      </Shell>
    </div>
  );
}
