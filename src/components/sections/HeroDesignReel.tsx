"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

// ── Palette ─────────────────────────────────────────────────────
const T  = "rgba(61,155,155,0.85)";   // teal bright
const TD = "rgba(61,155,155,0.45)";   // teal dim
const TF = "rgba(61,155,155,0.07)";   // teal fill
const W  = "rgba(255,255,255,0.35)";  // white mid
const WD = "rgba(255,255,255,0.15)";  // white dim

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

// ── Zoom-spring variants ─────────────────────────────────────────
const V = {
  hidden:  { opacity: 0, scale: 0.38, y: 14 },
  visible: { opacity: 1, scale: 1,    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 20 } },
  exit:    { opacity: 0, scale: 0.5,  y: -10,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] as [number,number,number,number] } },
};

// ── Shell: AnimatePresence + float loop ──────────────────────────
function Shell({
  children, style, on,
  fy = 7, fd = 5.5,
}: {
  children: ReactNode;
  style: CSSProperties;
  on: boolean;
  fy?: number;
  fd?: number;
}) {
  return (
    <AnimatePresence>
      {on && (
        <motion.div
          className="absolute"
          style={{ ...style, willChange: "transform",
            filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.5))" }}
          variants={V} initial="hidden" animate="visible" exit="exit"
        >
          <motion.div
            animate={{ y: [0, -fy, 0] }}
            transition={{ duration: fd, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform" }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ════════════════════════════════════════════════════════════════
// WIREFRAME ELEMENTS
// ════════════════════════════════════════════════════════════════

/* ── 1. Mobile phone ──────────────────────────────────── 72×132 */
function WFMobile() {
  return (
    <svg width="72" height="132" viewBox="0 0 72 132" fill="none">
      {/* Body */}
      <rect x="1" y="1" width="70" height="130" rx="10" stroke={TD} strokeWidth="1" fill={TF}/>
      {/* Dynamic Island */}
      <rect x="24" y="5" width="24" height="7" rx="3.5" fill={TD}/>
      {/* Screen */}
      <rect x="5" y="15" width="62" height="100" rx="2" stroke={TD} strokeWidth="0.6"/>
      {/* Home bar */}
      <rect x="26" y="123" width="20" height="3" rx="1.5" fill={TD}/>
      {/* Status row */}
      <line x1="10" y1="22" x2="28" y2="22" stroke={W} strokeWidth="0.6"/>
      <circle cx="60" cy="22" r="2" stroke={W} strokeWidth="0.6"/>
      <line x1="52" y1="22" x2="56" y2="22" stroke={W} strokeWidth="0.6"/>
      {/* Hero image placeholder */}
      <rect x="9" y="28" width="54" height="36" rx="2" stroke={TD} strokeWidth="0.6" fill="rgba(61,155,155,0.05)"/>
      <line x1="9"  y1="28" x2="63" y2="64" stroke={WD} strokeWidth="0.4"/>
      <line x1="63" y1="28" x2="9"  y2="64" stroke={WD} strokeWidth="0.4"/>
      {/* Text lines */}
      <line x1="9" y1="72" x2="46" y2="72" stroke={T}  strokeWidth="0.8"/>
      <line x1="9" y1="79" x2="60" y2="79" stroke={W}  strokeWidth="0.5"/>
      <line x1="9" y1="85" x2="52" y2="85" stroke={WD} strokeWidth="0.5"/>
      {/* CTA */}
      <rect x="9" y="93" width="54" height="14" rx="7" stroke={T} strokeWidth="0.8" fill="rgba(61,155,155,0.12)"/>
      <line x1="26" y1="100" x2="46" y2="100" stroke={T} strokeWidth="1.2"/>
      {/* Bottom nav */}
      <line x1="5" y1="110" x2="67" y2="110" stroke={WD} strokeWidth="0.4"/>
      <circle cx="18" cy="114" r="3.5" stroke={WD} strokeWidth="0.6"/>
      <rect x="32" y="110.5" width="8" height="7" rx="1.5" stroke={T} strokeWidth="0.7"/>
      <circle cx="54" cy="114" r="3.5" stroke={WD} strokeWidth="0.6"/>
    </svg>
  );
}

/* ── 2. Browser window ────────────────────────────────── 172×112 */
function WFBrowser() {
  return (
    <svg width="172" height="112" viewBox="0 0 172 112" fill="none">
      <rect x="1" y="1" width="170" height="110" rx="6" stroke={TD} strokeWidth="1" fill={TF}/>
      {/* Titlebar */}
      <rect x="1" y="1" width="170" height="22" rx="6" fill="rgba(61,155,155,0.09)" stroke="none"/>
      <line x1="1" y1="23" x2="171" y2="23" stroke={TD} strokeWidth="0.6"/>
      {/* Traffic lights */}
      <circle cx="13" cy="12" r="3.5" stroke={TD} strokeWidth="0.7"/>
      <circle cx="24" cy="12" r="3.5" stroke={TD} strokeWidth="0.7"/>
      <circle cx="35" cy="12" r="3.5" stroke={T}  strokeWidth="0.7" fill="rgba(61,155,155,0.18)"/>
      {/* Address bar */}
      <rect x="46" y="6" width="96" height="12" rx="4" stroke={TD} strokeWidth="0.5" fill="rgba(0,0,0,0.18)"/>
      <line x1="56" y1="12" x2="118" y2="12" stroke={W} strokeWidth="0.5"/>
      {/* Nav arrow */}
      <path d="M154 9 L159 12 L154 15" stroke={TD} strokeWidth="0.7" fill="none"/>
      {/* Hero image area */}
      <rect x="8" y="30" width="100" height="56" rx="2" stroke={TD} strokeWidth="0.5" fill="rgba(61,155,155,0.04)"/>
      <line x1="8"   y1="30" x2="108" y2="86" stroke={WD} strokeWidth="0.4"/>
      <line x1="108" y1="30" x2="8"   y2="86" stroke={WD} strokeWidth="0.4"/>
      {/* Right panel */}
      <line x1="116" y1="32" x2="164" y2="32" stroke={T}  strokeWidth="0.8"/>
      <line x1="116" y1="40" x2="160" y2="40" stroke={W}  strokeWidth="0.5"/>
      <line x1="116" y1="48" x2="162" y2="48" stroke={W}  strokeWidth="0.5"/>
      <line x1="116" y1="56" x2="150" y2="56" stroke={WD} strokeWidth="0.5"/>
      <rect x="116" y="66" width="46" height="12" rx="6" stroke={T} strokeWidth="0.8" fill="rgba(61,155,155,0.12)"/>
      <line x1="128" y1="72" x2="150" y2="72" stroke={T} strokeWidth="1.2"/>
      {/* Footer row */}
      <line x1="8"   y1="96" x2="80"  y2="96" stroke={WD} strokeWidth="0.4"/>
      <line x1="8"   y1="103" x2="60" y2="103" stroke={WD} strokeWidth="0.4"/>
      <line x1="116" y1="96" x2="164" y2="96" stroke={WD} strokeWidth="0.4"/>
    </svg>
  );
}

/* ── 3. Toggle list ───────────────────────────────────── 132×92 */
function WFToggles() {
  return (
    <svg width="132" height="92" viewBox="0 0 132 92" fill="none">
      <rect x="1" y="1" width="130" height="90" rx="6" stroke={TD} strokeWidth="0.8" fill={TF}/>
      {/* Heading */}
      <line x1="10" y1="13" x2="56" y2="13" stroke={T} strokeWidth="0.9"/>
      {/* Dividers */}
      <line x1="10" y1="36" x2="122" y2="36" stroke={WD} strokeWidth="0.4"/>
      <line x1="10" y1="58" x2="122" y2="58" stroke={WD} strokeWidth="0.4"/>
      {/* Row 1 – ON */}
      <line x1="10" y1="27" x2="68" y2="27" stroke={W} strokeWidth="0.7"/>
      <rect x="91" y="21" width="31" height="14" rx="7" fill="rgba(61,155,155,0.2)" stroke={T} strokeWidth="0.7"/>
      <circle cx="114" cy="28" r="5" fill={T}/>
      {/* Row 2 – OFF */}
      <line x1="10" y1="47" x2="72" y2="47" stroke={W} strokeWidth="0.7"/>
      <rect x="91" y="41" width="31" height="14" rx="7" stroke={TD} strokeWidth="0.7" fill="rgba(0,0,0,0.15)"/>
      <circle cx="98" cy="48" r="5" fill={TD}/>
      {/* Row 3 – ON */}
      <line x1="10" y1="69" x2="60" y2="69" stroke={W} strokeWidth="0.7"/>
      <rect x="91" y="63" width="31" height="14" rx="7" fill="rgba(61,155,155,0.2)" stroke={T} strokeWidth="0.7"/>
      <circle cx="114" cy="70" r="5" fill={T}/>
      {/* Row 4 – OFF */}
      <line x1="10" y1="81" x2="80" y2="81" stroke={WD} strokeWidth="0.5"/>
      <rect x="91" y="75" width="31" height="14" rx="7" stroke={WD} strokeWidth="0.6"/>
      <circle cx="98" cy="82" r="5" fill={WD}/>
    </svg>
  );
}

/* ── 4. Button row ────────────────────────────────────── 152×48 */
function WFButtons() {
  return (
    <svg width="152" height="48" viewBox="0 0 152 48" fill="none">
      {/* Primary */}
      <rect x="1" y="8" width="68" height="32" rx="16"
        fill="rgba(61,155,155,0.14)" stroke={T} strokeWidth="1"/>
      <line x1="20" y1="24" x2="50" y2="24" stroke={T} strokeWidth="1.5"/>
      <circle cx="14" cy="24" r="2.5" fill={T}/>
      {/* Secondary */}
      <rect x="83" y="8" width="68" height="32" rx="16" stroke={TD} strokeWidth="1"/>
      <line x1="102" y1="24" x2="132" y2="24" stroke={W} strokeWidth="1"/>
      <circle cx="97" cy="24" r="2.5" stroke={TD} strokeWidth="0.8"/>
      {/* Label placeholders */}
      <line x1="22" y1="30" x2="50" y2="30" stroke="rgba(61,155,155,0.35)" strokeWidth="0.5"/>
      <line x1="104" y1="30" x2="132" y2="30" stroke={WD} strokeWidth="0.5"/>
    </svg>
  );
}

/* ── 5. Input form ────────────────────────────────────── 152×104 */
function WFForm() {
  return (
    <svg width="152" height="104" viewBox="0 0 152 104" fill="none">
      <rect x="1" y="1" width="150" height="102" rx="6" stroke={TD} strokeWidth="0.8" fill={TF}/>
      {/* Label 1 */}
      <line x1="10" y1="16" x2="38" y2="16" stroke={W} strokeWidth="0.7"/>
      {/* Input 1 */}
      <rect x="10" y="22" width="132" height="18" rx="4" stroke={T} strokeWidth="0.8" fill="rgba(0,0,0,0.14)"/>
      <line x1="18" y1="31" x2="76" y2="31" stroke={W} strokeWidth="0.5"/>
      <circle cx="134" cy="31" r="3" stroke={TD} strokeWidth="0.6"/>
      {/* Label 2 */}
      <line x1="10" y1="50" x2="46" y2="50" stroke={W} strokeWidth="0.7"/>
      {/* Input 2 */}
      <rect x="10" y="56" width="132" height="18" rx="4" stroke={TD} strokeWidth="0.7" fill="rgba(0,0,0,0.14)"/>
      <line x1="18" y1="65" x2="58" y2="65" stroke={WD} strokeWidth="0.5"/>
      {/* Submit */}
      <rect x="10" y="82" width="132" height="16" rx="8"
        fill="rgba(61,155,155,0.16)" stroke={T} strokeWidth="0.8"/>
      <line x1="56" y1="90" x2="96" y2="90" stroke={T} strokeWidth="1.3"/>
    </svg>
  );
}

/* ── 6. UI card ───────────────────────────────────────── 120×134 */
function WFCard() {
  return (
    <svg width="120" height="134" viewBox="0 0 120 134" fill="none">
      <rect x="1" y="1" width="118" height="132" rx="8" stroke={TD} strokeWidth="0.8" fill={TF}/>
      {/* Image placeholder */}
      <rect x="8" y="8" width="104" height="62" rx="4"
        stroke={TD} strokeWidth="0.6" fill="rgba(61,155,155,0.05)"/>
      <line x1="8"   y1="8"  x2="112" y2="70" stroke={WD} strokeWidth="0.4"/>
      <line x1="112" y1="8"  x2="8"   y2="70" stroke={WD} strokeWidth="0.4"/>
      {/* Tag pill */}
      <rect x="8" y="77" width="36" height="12" rx="6" stroke={TD} strokeWidth="0.6"/>
      <line x1="16" y1="83" x2="37" y2="83" stroke={TD} strokeWidth="0.5"/>
      {/* Title */}
      <line x1="8" y1="98" x2="80" y2="98" stroke={T}  strokeWidth="0.9"/>
      <line x1="8" y1="106" x2="100" y2="106" stroke={W}  strokeWidth="0.5"/>
      <line x1="8" y1="113" x2="86" y2="113" stroke={WD} strokeWidth="0.5"/>
      {/* Footer */}
      <line x1="8" y1="124" x2="44" y2="124" stroke={WD} strokeWidth="0.5"/>
      <circle cx="101" cy="124" r="5" stroke={T} strokeWidth="0.7"/>
      <line x1="98" y1="124" x2="104" y2="124" stroke={T} strokeWidth="0.9"/>
      <line x1="101" y1="121" x2="101" y2="127" stroke={T} strokeWidth="0.9"/>
    </svg>
  );
}

/* ── 7. Nav bar ───────────────────────────────────────── 182×46 */
function WFNavBar() {
  return (
    <svg width="182" height="46" viewBox="0 0 182 46" fill="none">
      <rect x="1" y="1" width="180" height="44" rx="6" stroke={TD} strokeWidth="0.8" fill={TF}/>
      {/* Logo mark */}
      <rect x="10" y="14" width="24" height="18" rx="3"
        stroke={T} strokeWidth="0.8" fill="rgba(61,155,155,0.12)"/>
      <line x1="15" y1="23" x2="29" y2="23" stroke={T} strokeWidth="1.2"/>
      {/* Nav links */}
      <line x1="48" y1="23" x2="68" y2="23" stroke={W} strokeWidth="0.7"/>
      <line x1="82" y1="23" x2="102" y2="23" stroke={W} strokeWidth="0.7"/>
      {/* Active link */}
      <rect x="116" y="16" width="24" height="14" rx="2" fill="rgba(61,155,155,0.1)" stroke="none"/>
      <line x1="120" y1="23" x2="136" y2="23" stroke={T} strokeWidth="0.9"/>
      <line x1="128" y1="27" x2="128" y2="29" stroke={T} strokeWidth="0.9"/>
      {/* CTA pill */}
      <rect x="152" y="13" width="22" height="20" rx="4" stroke={TD} strokeWidth="0.7"/>
      <line x1="156" y1="20" x2="170" y2="20" stroke={W} strokeWidth="0.6"/>
      <line x1="156" y1="26" x2="170" y2="26" stroke={W} strokeWidth="0.6"/>
    </svg>
  );
}

/* ── 8. Checkbox list ─────────────────────────────────── 134×96 */
function WFCheckboxes() {
  return (
    <svg width="134" height="96" viewBox="0 0 134 96" fill="none">
      <rect x="1" y="1" width="132" height="94" rx="6" stroke={TD} strokeWidth="0.8" fill={TF}/>
      {/* Title */}
      <line x1="10" y1="13" x2="54" y2="13" stroke={T} strokeWidth="0.9"/>
      {/* Row 1 — checked */}
      <rect x="10" y="22" width="13" height="13" rx="2"
        fill="rgba(61,155,155,0.18)" stroke={T} strokeWidth="0.8"/>
      <path d="M13 28.5 L16.5 32 L22.5 24" stroke={T} strokeWidth="1" fill="none" strokeLinecap="round"/>
      <line x1="30" y1="28.5" x2="90" y2="28.5" stroke={W} strokeWidth="0.6"/>
      {/* Row 2 — unchecked */}
      <rect x="10" y="42" width="13" height="13" rx="2" stroke={TD} strokeWidth="0.7"/>
      <line x1="30" y1="48.5" x2="82" y2="48.5" stroke={W} strokeWidth="0.6"/>
      {/* Row 3 — checked */}
      <rect x="10" y="62" width="13" height="13" rx="2"
        fill="rgba(61,155,155,0.18)" stroke={T} strokeWidth="0.8"/>
      <path d="M13 68.5 L16.5 72 L22.5 64" stroke={T} strokeWidth="1" fill="none" strokeLinecap="round"/>
      <line x1="30" y1="68.5" x2="95" y2="68.5" stroke={W} strokeWidth="0.6"/>
      {/* Row 4 — unchecked */}
      <rect x="10" y="78" width="13" height="13" rx="2" stroke={TD} strokeWidth="0.7"/>
      <line x1="30" y1="84.5" x2="74" y2="84.5" stroke={WD} strokeWidth="0.5"/>
      {/* Dividers */}
      <line x1="10" y1="38"  x2="124" y2="38"  stroke={WD} strokeWidth="0.3"/>
      <line x1="10" y1="58"  x2="124" y2="58"  stroke={WD} strokeWidth="0.3"/>
      <line x1="10" y1="76"  x2="124" y2="76"  stroke={WD} strokeWidth="0.3"/>
    </svg>
  );
}

/* ── 9. Slider / range component ──────────────────────── 148×54 */
function WFSlider() {
  return (
    <svg width="148" height="54" viewBox="0 0 148 54" fill="none">
      <rect x="1" y="1" width="146" height="52" rx="6" stroke={TD} strokeWidth="0.8" fill={TF}/>
      {/* Label */}
      <line x1="10" y1="14" x2="44" y2="14" stroke={T} strokeWidth="0.9"/>
      <line x1="128" y1="14" x2="138" y2="14" stroke={W} strokeWidth="0.7"/>
      {/* Track */}
      <rect x="10" y="30" width="128" height="4" rx="2" fill={WD}/>
      <rect x="10" y="30" width="80"  height="4" rx="2" fill={TD}/>
      {/* Thumb */}
      <circle cx="90" cy="32" r="8" fill="rgba(12,10,20,0.7)" stroke={T} strokeWidth="1.2"/>
      <circle cx="90" cy="32" r="3" fill={T}/>
      {/* Min / max labels */}
      <line x1="10" y1="42" x2="24" y2="42" stroke={WD} strokeWidth="0.5"/>
      <line x1="120" y1="42" x2="138" y2="42" stroke={WD} strokeWidth="0.5"/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════════════════
export default function HeroDesignReel() {
  // startMs, showMs, hideMs
  const mobile     = useCycle(1500,  5500, 3500);
  const browser    = useCycle(2000,  6500, 2800);
  const toggles    = useCycle(3200,  5500, 3200);
  const buttons    = useCycle(1800,  4500, 4000);
  const form       = useCycle(4200,  5200, 3000);
  const card       = useCycle(2700,  6000, 2500);
  const navbar     = useCycle(3800,  5000, 3500);
  const checkboxes = useCycle(5200,  5000, 3000);
  const slider     = useCycle(6500,  4500, 3500);

  return (
    <div className="absolute inset-0 pointer-events-none z-[25] hidden lg:block select-none">

      {/* Mobile — top-right corner, above head */}
      <Shell on={mobile} style={{ right: "4.5%", top: "6%" }} fy={6} fd={5.5}>
        <WFMobile />
      </Shell>

      {/* Browser — upper area, right of center */}
      <Shell on={browser} style={{ right: "22%", top: "3%" }} fy={5} fd={6.5}>
        <WFBrowser />
      </Shell>

      {/* Toggles — right edge, mid-body (below neck) */}
      <Shell on={toggles} style={{ right: "4.5%", top: "49%" }} fy={5} fd={6.2}>
        <WFToggles />
      </Shell>

      {/* Buttons — right edge, lower */}
      <Shell on={buttons} style={{ right: "4.5%", bottom: "24%" }} fy={7} fd={5.0}>
        <WFButtons />
      </Shell>

      {/* Form — lower right area */}
      <Shell on={form} style={{ right: "18%", bottom: "9%" }} fy={8} fd={5.5}>
        <WFForm />
      </Shell>

      {/* Card — lower, toward center */}
      <Shell on={card} style={{ right: "38%", bottom: "7%" }} fy={6} fd={6.0}>
        <WFCard />
      </Shell>

      {/* NavBar — upper area, wider sweep */}
      <Shell on={navbar} style={{ right: "34%", top: "2%" }} fy={4} fd={7.0}>
        <WFNavBar />
      </Shell>

      {/* Checkboxes — right edge, upper-mid (safe: far right of face) */}
      <Shell on={checkboxes} style={{ right: "4.5%", top: "22%" }} fy={6} fd={5.5}>
        <WFCheckboxes />
      </Shell>

      {/* Slider — lower left of photo area */}
      <Shell on={slider} style={{ right: "52%", bottom: "12%" }} fy={5} fd={6.5}>
        <WFSlider />
      </Shell>
    </div>
  );
}
