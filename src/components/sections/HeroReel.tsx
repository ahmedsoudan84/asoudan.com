"use client";

import styles from "./HeroReel.module.css";

export function HeroReel() {
  return (
    <div className={styles.reel} aria-hidden="true">
      <svg viewBox="0 0 400 900" preserveAspectRatio="xMidYMid slice">
        {/* Falling mono-character streams */}
        <g fontFamily="'JetBrains Mono', monospace" fontSize="11" fill="var(--reel-stroke)">
          <text className={styles.stream} x="40"  y="0" style={{ animationDelay: "0s" }}>
            {"{ "}<tspan fill="var(--accent)">&lt;div&gt;</tspan>{" · 0 1 1 0 · ◇"}
          </text>
          <text className={styles.stream} x="100" y="0" style={{ animationDelay: ".6s" }}>
            px:8 · grid · 1fr 1fr · gap
          </text>
          <text className={styles.stream} x="160" y="0" style={{ animationDelay: "1.2s" }}>
            <tspan fill="var(--accent)">flex</tspan>{" · align · <span>"}
          </text>
          <text className={styles.stream} x="220" y="0" style={{ animationDelay: "1.9s" }}>
            --accent · #00F1F1 · ●
          </text>
          <text className={styles.stream} x="280" y="0" style={{ animationDelay: "2.6s" }}>
            tween 240ms · ease
          </text>
          <text className={styles.stream} x="60"  y="0" style={{ animationDelay: "3.4s" }}>
            {"{ build } { ship } ✱"}
          </text>
          <text className={styles.stream} x="320" y="0" style={{ animationDelay: "4.2s" }}>
            grid · 12 · gutter
          </text>
        </g>

        {/* Crystals: UI shapes that crystallise out of the rain */}
        <g>
          {/* Card skeleton */}
          <g className={styles.crystal} style={{ animationDelay: "1.4s" }}>
            <rect x="60" y="280" width="120" height="76" rx="3" fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="1"/>
            <rect x="72" y="294" width="64" height="6" rx="1" fill="var(--reel-stroke)" opacity=".8"/>
            <rect x="72" y="308" width="44" height="4" rx="1" fill="var(--reel-stroke)" opacity=".5"/>
            <rect x="72" y="332" width="40" height="14" rx="3" fill="var(--accent)" opacity=".9"/>
          </g>
          {/* Toggle */}
          <g className={styles.crystal} style={{ animationDelay: "2.2s" }}>
            <rect x="220" y="320" width="60" height="28" rx="14" fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="1"/>
            <circle cx="266" cy="334" r="9" fill="var(--accent)"/>
          </g>
          {/* Avatar */}
          <g className={styles.crystal} style={{ animationDelay: "3s" }}>
            <circle cx="320" cy="500" r="18" fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="1"/>
            <circle cx="320" cy="494" r="5" fill="var(--reel-stroke)" opacity=".8"/>
            <path d="M308,512 a12,8 0 0 1 24,0" fill="var(--reel-stroke)" opacity=".7"/>
          </g>
          {/* Input */}
          <g className={styles.crystal} style={{ animationDelay: "3.8s" }}>
            <rect x="60" y="600" width="200" height="32" rx="3" fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="1"/>
            <rect x="72" y="615" width="60" height="2" rx="1" fill="var(--accent)"/>
          </g>
          {/* Chart */}
          <g className={styles.crystal} style={{ animationDelay: "4.4s" }}>
            <rect x="220" y="700" width="120" height="60" rx="3" fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="1"/>
            <polyline
              points="232,740 248,726 264,734 280,714 296,720 312,708 328,714"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        </g>

        <defs>
          <radialGradient id="heroReelPulse" cx="50%" cy="50%" r="60%">
            <stop offset="0" stopColor="rgba(var(--accent-rgb),0.18)"/>
            <stop offset="1" stopColor="rgba(var(--accent-rgb),0)"/>
          </radialGradient>
        </defs>
        <rect className={styles.pulse} x="0" y="0" width="400" height="900" fill="url(#heroReelPulse)" opacity="0"/>
      </svg>
    </div>
  );
}
