"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

// ── Themes ──────────────────────────────────────────────────────
type Theme = { s: string; d: string; f: string; g: string };

const TH: Record<"teal" | "orange" | "violet" | "pink" | "blue", Theme> = {
  teal:   { s: "rgba(61,155,155,0.95)",  d: "rgba(61,155,155,0.50)",  f: "rgba(61,155,155,0.10)",  g: "rgba(61,155,155,0.55)" },
  orange: { s: "rgba(255,122,53,0.95)",  d: "rgba(255,122,53,0.50)",  f: "rgba(255,122,53,0.10)",  g: "rgba(255,122,53,0.55)" },
  violet: { s: "rgba(139,92,246,0.95)",  d: "rgba(139,92,246,0.50)",  f: "rgba(139,92,246,0.10)",  g: "rgba(139,92,246,0.55)" },
  pink:   { s: "rgba(236,72,153,0.95)",  d: "rgba(236,72,153,0.50)",  f: "rgba(236,72,153,0.10)",  g: "rgba(236,72,153,0.55)" },
  blue:   { s: "rgba(96,165,250,0.95)",  d: "rgba(96,165,250,0.50)",  f: "rgba(96,165,250,0.10)",  g: "rgba(96,165,250,0.55)" },
};

const W  = "rgba(255,255,255,0.40)";
const WD = "rgba(255,255,255,0.18)";

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

// ── Cinematic flythrough ─────────────────────────────────────
// Each element does ONE continuous arc while mounted: appears far
// away (small, heavily blurred), focuses as it approaches, then
// rockets past the camera (huge scale, heavy blur, fade). No
// static hold, no separate entry/exit phases — it's one shot.
const glow = (g: string) =>
  `drop-shadow(0 0 18px ${g}) drop-shadow(0 10px 32px rgba(0,0,0,0.55))`;

// Per-element directional drift toward the face anchor in the
// hero photo (right-center of viewport on desktop). dx negative
// = drifts left, dy negative = drifts up. Tuned by element
// position so each one converges on the face.
type Drift = { dx: number; dy: number };

function Shell({
  children, style, on, theme, rot, dur, drift,
}: {
  children: ReactNode;
  style: CSSProperties;
  on: boolean;
  theme: Theme;
  rot: number;
  dur: number;        // seconds — full visible arc duration
  drift: Drift;       // direction toward face
}) {
  const g = glow(theme.g);
  const { dx, dy } = drift;
  return (
    <AnimatePresence>
      {on && (
        <motion.div
          className="absolute"
          style={{ ...style, willChange: "transform, filter, opacity" }}
          initial={{
            scale: 0.16, x: -dx * 0.35, y: -dy * 0.35 + 60, rotate: 0,
            opacity: 0, filter: `blur(20px) ${g}`,
          }}
          animate={{
            scale:   [0.16, 0.55, 1.0,   1.85,        4.0],
            x:       [-dx * 0.35, -dx * 0.15, 0, dx * 0.55, dx * 1.6],
            y:       [-dy * 0.35 + 60, -dy * 0.15 + 25, 0, dy * 0.55 - 30, dy * 1.6 - 90],
            rotate:  [0, rot * 0.5, rot, rot * 0.65, rot * 0.2],
            opacity: [0, 1, 1, 0.92, 0],
            filter: [
              `blur(20px) ${g}`,
              `blur(5px) ${g}`,
              `blur(0px) ${g}`,
              `blur(7px) ${g}`,
              `blur(34px) ${g}`,
            ],
          }}
          transition={{
            duration: dur,
            times:    [0, 0.22, 0.45, 0.78, 1],
            ease:     [0.4, 0, 0.6, 1] as [number, number, number, number],
          }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ════════════════════════════════════════════════════════════════
// WIREFRAME ELEMENTS  (each receives its own theme `t`)
// ════════════════════════════════════════════════════════════════

/* ── 1. Mobile ─────────────── progress fill + nav pulse — 72×132 */
function WFMobile({ t }: { t: Theme }) {
  return (
    <svg width="72" height="132" viewBox="0 0 72 132" fill="none">
      <rect x="1" y="1" width="70" height="130" rx="10" stroke={t.d} strokeWidth="1" fill={t.f}/>
      <rect x="24" y="5" width="24" height="7" rx="3.5" fill={t.d}/>
      <rect x="5" y="15" width="62" height="100" rx="2" stroke={t.d} strokeWidth="0.6"/>
      <rect x="26" y="123" width="20" height="3" rx="1.5" fill={t.d}/>
      <line x1="10" y1="22" x2="28" y2="22" stroke={W} strokeWidth="0.6"/>
      <circle cx="60" cy="22" r="2" stroke={W} strokeWidth="0.6"/>
      <line x1="52" y1="22" x2="56" y2="22" stroke={W} strokeWidth="0.6"/>
      <rect x="9" y="28" width="54" height="36" rx="2" stroke={t.d} strokeWidth="0.6" fill={t.f}/>
      <line x1="9"  y1="28" x2="63" y2="64" stroke={WD} strokeWidth="0.4"/>
      <line x1="63" y1="28" x2="9"  y2="64" stroke={WD} strokeWidth="0.4"/>
      <line x1="9" y1="72" x2="46" y2="72" stroke={t.s} strokeWidth="0.8"/>
      <line x1="9" y1="79" x2="60" y2="79" stroke={W}  strokeWidth="0.5"/>
      {/* progress bar (animated fill) */}
      <rect x="9" y="84" width="54" height="2.4" rx="1.2" fill={t.f} stroke={t.d} strokeWidth="0.3"/>
      <motion.rect
        x="9" y="84" height="2.4" rx="1.2" fill={t.s}
        initial={{ width: 0 }}
        animate={{ width: [0, 54, 54, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.55, 0.85, 1] }}
      />
      <rect x="9" y="93" width="54" height="14" rx="7" stroke={t.s} strokeWidth="0.8" fill={t.f}/>
      <line x1="26" y1="100" x2="46" y2="100" stroke={t.s} strokeWidth="1.2"/>
      <line x1="5" y1="110" x2="67" y2="110" stroke={WD} strokeWidth="0.4"/>
      <circle cx="18" cy="114" r="3.5" stroke={WD} strokeWidth="0.6"/>
      {/* pulsing center nav item */}
      <motion.rect
        x="32" y="110.5" width="8" height="7" rx="1.5"
        stroke={t.s} strokeWidth="0.7" fill={t.f}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.18, 1] }}
        style={{ transformOrigin: "36px 114px" }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="54" cy="114" r="3.5" stroke={WD} strokeWidth="0.6"/>
    </svg>
  );
}

/* ── 2. Browser ──────────── cursor blink + loading sweep — 172×112 */
function WFBrowser({ t }: { t: Theme }) {
  return (
    <svg width="172" height="112" viewBox="0 0 172 112" fill="none">
      <defs>
        <clipPath id="brTitleClip">
          <rect x="1" y="22" width="170" height="2"/>
        </clipPath>
      </defs>
      <rect x="1" y="1" width="170" height="110" rx="6" stroke={t.d} strokeWidth="1" fill={t.f}/>
      <rect x="1" y="1" width="170" height="22" rx="6" fill={t.f} stroke="none"/>
      <line x1="1" y1="23" x2="171" y2="23" stroke={t.d} strokeWidth="0.6"/>
      {/* loading bar sweep just under titlebar */}
      <g clipPath="url(#brTitleClip)">
        <motion.rect
          y="22" height="2" width="60" fill={t.s}
          initial={{ x: -60 }}
          animate={{ x: [-60, 172] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
        />
      </g>
      <circle cx="13" cy="12" r="3.5" stroke={t.d} strokeWidth="0.7"/>
      <circle cx="24" cy="12" r="3.5" stroke={t.d} strokeWidth="0.7"/>
      <circle cx="35" cy="12" r="3.5" stroke={t.s} strokeWidth="0.7" fill={t.f}/>
      <rect x="46" y="6" width="96" height="12" rx="4" stroke={t.d} strokeWidth="0.5" fill="rgba(0,0,0,0.18)"/>
      <line x1="56" y1="12" x2="118" y2="12" stroke={W} strokeWidth="0.5"/>
      {/* address bar cursor */}
      <motion.line
        x1="120" x2="120" y1="8" y2="16" stroke={t.s} strokeWidth="0.9"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.05, repeat: Infinity, ease: "linear" }}
      />
      <path d="M154 9 L159 12 L154 15" stroke={t.d} strokeWidth="0.7" fill="none"/>
      <rect x="8" y="30" width="100" height="56" rx="2" stroke={t.d} strokeWidth="0.5" fill={t.f}/>
      <line x1="8"   y1="30" x2="108" y2="86" stroke={WD} strokeWidth="0.4"/>
      <line x1="108" y1="30" x2="8"   y2="86" stroke={WD} strokeWidth="0.4"/>
      <line x1="116" y1="32" x2="164" y2="32" stroke={t.s} strokeWidth="0.8"/>
      <line x1="116" y1="40" x2="160" y2="40" stroke={W}  strokeWidth="0.5"/>
      <line x1="116" y1="48" x2="162" y2="48" stroke={W}  strokeWidth="0.5"/>
      <line x1="116" y1="56" x2="150" y2="56" stroke={WD} strokeWidth="0.5"/>
      <rect x="116" y="66" width="46" height="12" rx="6" stroke={t.s} strokeWidth="0.8" fill={t.f}/>
      <line x1="128" y1="72" x2="150" y2="72" stroke={t.s} strokeWidth="1.2"/>
      <line x1="8"   y1="96"  x2="80"  y2="96"  stroke={WD} strokeWidth="0.4"/>
      <line x1="8"   y1="103" x2="60"  y2="103" stroke={WD} strokeWidth="0.4"/>
      <line x1="116" y1="96"  x2="164" y2="96"  stroke={WD} strokeWidth="0.4"/>
    </svg>
  );
}

/* ── 3. Toggles ────────────── one toggle ON↔OFF loop — 132×92 */
function WFToggles({ t }: { t: Theme }) {
  return (
    <svg width="132" height="92" viewBox="0 0 132 92" fill="none">
      <rect x="1" y="1" width="130" height="90" rx="6" stroke={t.d} strokeWidth="0.8" fill={t.f}/>
      <line x1="10" y1="13" x2="56" y2="13" stroke={t.s} strokeWidth="0.9"/>
      <line x1="10" y1="36" x2="122" y2="36" stroke={WD} strokeWidth="0.4"/>
      <line x1="10" y1="58" x2="122" y2="58" stroke={WD} strokeWidth="0.4"/>
      {/* row 1 — ON */}
      <line x1="10" y1="27" x2="68" y2="27" stroke={W} strokeWidth="0.7"/>
      <rect x="91" y="21" width="31" height="14" rx="7" fill={t.f} stroke={t.s} strokeWidth="0.7"/>
      <circle cx="114" cy="28" r="5" fill={t.s}/>
      {/* row 2 — animated */}
      <line x1="10" y1="47" x2="72" y2="47" stroke={W} strokeWidth="0.7"/>
      <motion.rect
        x="91" y="41" width="31" height="14" rx="7" strokeWidth="0.7"
        animate={{
          fill: [t.f, t.f, t.f, t.f, t.f],
          stroke: [t.d, t.s, t.s, t.d, t.d],
        }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1, 1] }}
      />
      <motion.circle
        cy="48" r="5"
        animate={{ cx: [98, 98, 115, 115, 98], fill: [t.d, t.d, t.s, t.s, t.d] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.5, 0.85, 1] }}
      />
      {/* row 3 — ON */}
      <line x1="10" y1="69" x2="60" y2="69" stroke={W} strokeWidth="0.7"/>
      <rect x="91" y="63" width="31" height="14" rx="7" fill={t.f} stroke={t.s} strokeWidth="0.7"/>
      <circle cx="114" cy="70" r="5" fill={t.s}/>
      {/* row 4 — OFF */}
      <line x1="10" y1="81" x2="80" y2="81" stroke={WD} strokeWidth="0.5"/>
      <rect x="91" y="75" width="31" height="14" rx="7" stroke={WD} strokeWidth="0.6"/>
      <circle cx="98" cy="82" r="5" fill={WD}/>
    </svg>
  );
}

/* ── 4. Buttons ─────────────────── shimmer sweep — 152×48 */
function WFButtons({ t }: { t: Theme }) {
  return (
    <svg width="152" height="48" viewBox="0 0 152 48" fill="none">
      <defs>
        <clipPath id="btnPrimaryClip">
          <rect x="1" y="8" width="68" height="32" rx="16"/>
        </clipPath>
      </defs>
      {/* primary */}
      <rect x="1" y="8" width="68" height="32" rx="16" fill={t.f} stroke={t.s} strokeWidth="1"/>
      <g clipPath="url(#btnPrimaryClip)">
        <motion.rect
          y="8" height="32" width="14" fill={t.s} fillOpacity="0.45"
          initial={{ x: -16 }}
          animate={{ x: [-16, 70] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.4 }}
        />
      </g>
      <line x1="20" y1="24" x2="50" y2="24" stroke={t.s} strokeWidth="1.5"/>
      <circle cx="14" cy="24" r="2.5" fill={t.s}/>
      {/* secondary */}
      <rect x="83" y="8" width="68" height="32" rx="16" stroke={t.d} strokeWidth="1"/>
      <line x1="102" y1="24" x2="132" y2="24" stroke={W} strokeWidth="1"/>
      <circle cx="97" cy="24" r="2.5" stroke={t.d} strokeWidth="0.8"/>
      <line x1="22" y1="30" x2="50" y2="30" stroke={t.d} strokeWidth="0.5"/>
      <line x1="104" y1="30" x2="132" y2="30" stroke={WD} strokeWidth="0.5"/>
    </svg>
  );
}

/* ── 5. Form ──────────── input cursor + submit pulse — 152×104 */
function WFForm({ t }: { t: Theme }) {
  return (
    <svg width="152" height="104" viewBox="0 0 152 104" fill="none">
      <rect x="1" y="1" width="150" height="102" rx="6" stroke={t.d} strokeWidth="0.8" fill={t.f}/>
      <line x1="10" y1="16" x2="38" y2="16" stroke={W} strokeWidth="0.7"/>
      <rect x="10" y="22" width="132" height="18" rx="4" stroke={t.s} strokeWidth="0.8" fill="rgba(0,0,0,0.14)"/>
      <line x1="18" y1="31" x2="76" y2="31" stroke={W} strokeWidth="0.5"/>
      {/* blinking cursor */}
      <motion.line
        x1="78" x2="78" y1="26" y2="36" stroke={t.s} strokeWidth="0.9"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.05, repeat: Infinity, ease: "linear" }}
      />
      <circle cx="134" cy="31" r="3" stroke={t.d} strokeWidth="0.6"/>
      <line x1="10" y1="50" x2="46" y2="50" stroke={W} strokeWidth="0.7"/>
      <rect x="10" y="56" width="132" height="18" rx="4" stroke={t.d} strokeWidth="0.7" fill="rgba(0,0,0,0.14)"/>
      <line x1="18" y1="65" x2="58" y2="65" stroke={WD} strokeWidth="0.5"/>
      {/* submit — pulsing border */}
      <motion.rect
        x="10" y="82" width="132" height="16" rx="8" fill={t.f} stroke={t.s}
        animate={{ strokeWidth: [0.8, 1.8, 0.8], strokeOpacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <line x1="56" y1="90" x2="96" y2="90" stroke={t.s} strokeWidth="1.3"/>
    </svg>
  );
}

/* ── 6. Card ────────── X-lines draw + title sweep — 120×134 */
function WFCard({ t }: { t: Theme }) {
  return (
    <svg width="120" height="134" viewBox="0 0 120 134" fill="none">
      <rect x="1" y="1" width="118" height="132" rx="8" stroke={t.d} strokeWidth="0.8" fill={t.f}/>
      <rect x="8" y="8" width="104" height="62" rx="4" stroke={t.d} strokeWidth="0.6" fill={t.f}/>
      <motion.line
        x1="8" y1="8" x2="112" y2="70" stroke={t.s} strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0.3, 0.7, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.65, 1] }}
      />
      <motion.line
        x1="112" y1="8" x2="8" y2="70" stroke={t.s} strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0.3, 0.7, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.65, 1], delay: 0.25 }}
      />
      <rect x="8" y="77" width="36" height="12" rx="6" stroke={t.d} strokeWidth="0.6"/>
      <line x1="16" y1="83" x2="37" y2="83" stroke={t.d} strokeWidth="0.5"/>
      {/* title — grows from left */}
      <motion.line
        x1="8" y1="98" x2="80" y2="98" stroke={t.s} strokeWidth="0.9"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", times: [0, 0.5, 1] }}
      />
      <line x1="8" y1="106" x2="100" y2="106" stroke={W}  strokeWidth="0.5"/>
      <line x1="8" y1="113" x2="86"  y2="113" stroke={WD} strokeWidth="0.5"/>
      <line x1="8" y1="124" x2="44"  y2="124" stroke={WD} strokeWidth="0.5"/>
      <circle cx="101" cy="124" r="5" stroke={t.s} strokeWidth="0.7"/>
      <line x1="98"  y1="124" x2="104" y2="124" stroke={t.s} strokeWidth="0.9"/>
      <line x1="101" y1="121" x2="101" y2="127" stroke={t.s} strokeWidth="0.9"/>
    </svg>
  );
}

/* ── 7. NavBar ─────────────── sliding active underline — 182×46 */
function WFNavBar({ t }: { t: Theme }) {
  return (
    <svg width="182" height="46" viewBox="0 0 182 46" fill="none">
      <rect x="1" y="1" width="180" height="44" rx="6" stroke={t.d} strokeWidth="0.8" fill={t.f}/>
      <rect x="10" y="14" width="24" height="18" rx="3" stroke={t.s} strokeWidth="0.8" fill={t.f}/>
      <line x1="15" y1="23" x2="29" y2="23" stroke={t.s} strokeWidth="1.2"/>
      <line x1="48"  y1="23" x2="68"  y2="23" stroke={W} strokeWidth="0.7"/>
      <line x1="82"  y1="23" x2="102" y2="23" stroke={W} strokeWidth="0.7"/>
      <line x1="116" y1="23" x2="136" y2="23" stroke={W} strokeWidth="0.7"/>
      {/* sliding underline */}
      <motion.rect
        y="29" height="1.6" rx="0.8" fill={t.s}
        animate={{ x: [48, 82, 116, 82, 48], width: [20, 20, 20, 20, 20] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
      />
      <rect x="152" y="13" width="22" height="20" rx="4" stroke={t.d} strokeWidth="0.7"/>
      <line x1="156" y1="20" x2="170" y2="20" stroke={W} strokeWidth="0.6"/>
      <line x1="156" y1="26" x2="170" y2="26" stroke={W} strokeWidth="0.6"/>
    </svg>
  );
}

/* ── 8. Checkboxes ────────── self-drawing checkmarks — 134×96 */
function WFCheckboxes({ t }: { t: Theme }) {
  return (
    <svg width="134" height="96" viewBox="0 0 134 96" fill="none">
      <rect x="1" y="1" width="132" height="94" rx="6" stroke={t.d} strokeWidth="0.8" fill={t.f}/>
      <line x1="10" y1="13" x2="54" y2="13" stroke={t.s} strokeWidth="0.9"/>
      {/* row 1 checked */}
      <rect x="10" y="22" width="13" height="13" rx="2" fill={t.f} stroke={t.s} strokeWidth="0.8"/>
      <motion.path
        d="M13 28.5 L16.5 32 L22.5 24" stroke={t.s} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut", times: [0, 0.25, 0.85, 1] }}
      />
      <line x1="30" y1="28.5" x2="90" y2="28.5" stroke={W} strokeWidth="0.6"/>
      {/* row 2 unchecked */}
      <rect x="10" y="42" width="13" height="13" rx="2" stroke={t.d} strokeWidth="0.7"/>
      <line x1="30" y1="48.5" x2="82" y2="48.5" stroke={W} strokeWidth="0.6"/>
      {/* row 3 checked */}
      <rect x="10" y="62" width="13" height="13" rx="2" fill={t.f} stroke={t.s} strokeWidth="0.8"/>
      <motion.path
        d="M13 68.5 L16.5 72 L22.5 64" stroke={t.s} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut", times: [0, 0.25, 0.85, 1], delay: 0.6 }}
      />
      <line x1="30" y1="68.5" x2="95" y2="68.5" stroke={W} strokeWidth="0.6"/>
      {/* row 4 unchecked */}
      <rect x="10" y="78" width="13" height="13" rx="2" stroke={t.d} strokeWidth="0.7"/>
      <line x1="30" y1="84.5" x2="74" y2="84.5" stroke={WD} strokeWidth="0.5"/>
      <line x1="10" y1="38" x2="124" y2="38" stroke={WD} strokeWidth="0.3"/>
      <line x1="10" y1="58" x2="124" y2="58" stroke={WD} strokeWidth="0.3"/>
      <line x1="10" y1="76" x2="124" y2="76" stroke={WD} strokeWidth="0.3"/>
    </svg>
  );
}

/* ── 9. Slider ───────────────── thumb travels track — 148×54 */
function WFSlider({ t }: { t: Theme }) {
  return (
    <svg width="148" height="54" viewBox="0 0 148 54" fill="none">
      <rect x="1" y="1" width="146" height="52" rx="6" stroke={t.d} strokeWidth="0.8" fill={t.f}/>
      <line x1="10"  y1="14" x2="44"  y2="14" stroke={t.s} strokeWidth="0.9"/>
      <line x1="128" y1="14" x2="138" y2="14" stroke={W}   strokeWidth="0.7"/>
      {/* track */}
      <rect x="10" y="30" width="128" height="4" rx="2" fill={WD}/>
      {/* animated fill (matches thumb) */}
      <motion.rect
        x="10" y="30" height="4" rx="2" fill={t.d}
        animate={{ width: [0, 128, 128, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 0.5, 1] }}
      />
      {/* thumb */}
      <motion.circle
        cy="32" r="8" fill="rgba(12,10,20,0.7)" stroke={t.s} strokeWidth="1.2"
        animate={{ cx: [10, 138, 138, 10] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 0.5, 1] }}
      />
      <motion.circle
        cy="32" r="3" fill={t.s}
        animate={{ cx: [10, 138, 138, 10] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 0.5, 1] }}
      />
      <line x1="10"  y1="42" x2="24"  y2="42" stroke={WD} strokeWidth="0.5"/>
      <line x1="120" y1="42" x2="138" y2="42" stroke={WD} strokeWidth="0.5"/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════════════════
// Per-element flythrough timing (visible duration in ms) and the
// drift vector pointing toward the face anchor (right-center of
// the photo). dx/dy are the px offset added at the END of the arc;
// the keyframes interpolate from -dx*0.35 → +dx*1.6.
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

      <Shell on={mobile}     style={{ right: "4.5%", top: "6%" }}     theme={TH.teal}   rot={-3} dur={SHOW.mobile     / 1000} drift={{ dx: -110, dy:  60 }}>
        <WFMobile t={TH.teal} />
      </Shell>

      <Shell on={browser}    style={{ right: "22%",  top: "3%" }}     theme={TH.orange} rot={2}  dur={SHOW.browser    / 1000} drift={{ dx:   30, dy:  80 }}>
        <WFBrowser t={TH.orange} />
      </Shell>

      <Shell on={toggles}    style={{ right: "4.5%", top: "49%" }}    theme={TH.violet} rot={-4} dur={SHOW.toggles    / 1000} drift={{ dx: -140, dy:   0 }}>
        <WFToggles t={TH.violet} />
      </Shell>

      <Shell on={buttons}    style={{ right: "4.5%", bottom: "24%" }} theme={TH.pink}   rot={3}  dur={SHOW.buttons    / 1000} drift={{ dx: -130, dy: -50 }}>
        <WFButtons t={TH.pink} />
      </Shell>

      <Shell on={form}       style={{ right: "18%",  bottom: "9%" }}  theme={TH.blue}   rot={-2} dur={SHOW.form       / 1000} drift={{ dx:    0, dy:-130 }}>
        <WFForm t={TH.blue} />
      </Shell>

      <Shell on={card}       style={{ right: "38%",  bottom: "7%" }}  theme={TH.teal}   rot={4}  dur={SHOW.card       / 1000} drift={{ dx:   60, dy:-140 }}>
        <WFCard t={TH.teal} />
      </Shell>

      <Shell on={navbar}     style={{ right: "34%",  top: "2%" }}     theme={TH.orange} rot={-3} dur={SHOW.navbar     / 1000} drift={{ dx:   30, dy: 130 }}>
        <WFNavBar t={TH.orange} />
      </Shell>

      <Shell on={checkboxes} style={{ right: "4.5%", top: "22%" }}    theme={TH.violet} rot={2}  dur={SHOW.checkboxes / 1000} drift={{ dx: -140, dy:  30 }}>
        <WFCheckboxes t={TH.violet} />
      </Shell>

      <Shell on={slider}     style={{ right: "52%",  bottom: "12%" }} theme={TH.pink}   rot={-4} dur={SHOW.slider     / 1000} drift={{ dx:  130, dy:-100 }}>
        <WFSlider t={TH.pink} />
      </Shell>
    </div>
  );
}
