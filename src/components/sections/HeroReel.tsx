"use client";

import styles from "./HeroReel.module.css";

const d = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });

export function HeroReel() {
  return (
    <div className={styles.reel} aria-hidden="true">
      <svg viewBox="0 0 400 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="reelGlow" cx="50%" cy="55%" r="35%">
            <stop offset="0" stopColor="rgba(var(--accent-rgb),0.18)" />
            <stop offset="1" stopColor="rgba(var(--accent-rgb),0)" />
          </radialGradient>
          <marker id="reelArrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0.5 L0,4.5 L4.5,2.5 z" fill="var(--reel-stroke)" opacity="0.45" />
          </marker>
        </defs>

        {/* ── Beat 1 · Sparse dot grid — far layer ── */}
        <g className={styles.layerFar}>
          <g className={styles.beatConstruct}>
            {([
              [136,216],[176,216],[216,216],[256,216],[296,216],
              [136,256],[296,256],
              [136,296],[176,296],[216,296],[256,296],[296,296],
              [136,376],[216,376],[296,376],
              [136,416],[176,416],[256,416],[296,416],
              [136,456],[216,456],[296,456],
              [136,496],[176,496],[216,496],[256,496],
              [136,536],[296,536],
              [176,576],[216,576],[256,576],
            ] as [number, number][]).map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1" fill="var(--reel-stroke)" opacity="0.22" />
            ))}
            {/* Two faint guide lines */}
            <line x1="90" y1="336" x2="310" y2="336"
                  stroke="var(--reel-stroke)" strokeWidth="0.3" strokeDasharray="2 9" opacity="0.16" />
            <line x1="216" y1="180" x2="216" y2="620"
                  stroke="var(--reel-stroke)" strokeWidth="0.3" strokeDasharray="2 9" opacity="0.16" />
          </g>
        </g>

        {/* ── Beat 2 · Scattered micro-elements — mid layer, staggered ── */}
        <g className={styles.layerMid}>

          {/* Toggle (off) */}
          <g className={styles.beatWireframe} style={d(0)}>
            <rect x="112" y="226" width="40" height="20" rx="10"
                  fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.85" />
            <circle cx="122" cy="236" r="7"
                    fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.75" />
          </g>

          {/* Input field with cursor */}
          <g className={styles.beatWireframe} style={d(0.28)}>
            <rect x="200" y="222" width="110" height="22" rx="3"
                  fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.85" />
            <line x1="212" y1="229" x2="212" y2="237"
                  stroke="var(--reel-stroke)" strokeWidth="1" opacity="0.55" />
          </g>

          {/* Chip */}
          <g className={styles.beatWireframe} style={d(0.48)}>
            <rect x="112" y="276" width="56" height="18" rx="9"
                  fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.8" />
            <rect x="124" y="284" width="32" height="3.5" rx="1"
                  fill="var(--reel-stroke)" opacity="0.32" />
          </g>

          {/* Small card (top-right cluster) */}
          <g className={styles.beatWireframe} style={d(0.18)}>
            <rect x="262" y="268" width="82" height="58" rx="4"
                  fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.85" />
            {/* thumbnail strip */}
            <rect x="272" y="277" width="62" height="16" rx="2"
                  fill="var(--reel-stroke)" opacity="0.14" />
            {/* title bar */}
            <rect x="272" y="300" width="44" height="5" rx="1"
                  fill="var(--reel-stroke)" opacity="0.38" />
            {/* sub bar */}
            <rect x="272" y="311" width="32" height="3.5" rx="1"
                  fill="var(--reel-stroke)" opacity="0.2" />
          </g>

          {/* Radio pair */}
          <g className={styles.beatWireframe} style={d(0.62)}>
            {/* selected */}
            <circle cx="116" cy="384" r="7"
                    fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.85" />
            <circle cx="116" cy="384" r="2.5"
                    fill="var(--reel-stroke)" opacity="0.65" />
            <rect x="129" y="381" width="34" height="4" rx="1"
                  fill="var(--reel-stroke)" opacity="0.28" />
            {/* unselected */}
            <circle cx="116" cy="404" r="7"
                    fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.85" />
            <rect x="129" y="401" width="26" height="4" rx="1"
                  fill="var(--reel-stroke)" opacity="0.28" />
          </g>

          {/* Progress bar */}
          <g className={styles.beatWireframe} style={d(0.14)}>
            {/* track */}
            <rect x="196" y="384" width="152" height="7" rx="3.5"
                  fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.7" />
            {/* 42% fill — wireframe hatch */}
            <rect x="196" y="384" width="64" height="7" rx="3.5"
                  fill="var(--reel-stroke)" opacity="0.28" />
          </g>

          {/* Avatar group — 3 overlapping */}
          <g className={styles.beatWireframe} style={d(0.52)}>
            <circle cx="194" cy="456" r="16"
                    fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.85" />
            <circle cx="210" cy="456" r="16"
                    fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.85" />
            <circle cx="226" cy="456" r="16"
                    fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.85" />
            {/* subtle head marks */}
            <circle cx="194" cy="450" r="5" fill="var(--reel-stroke)" opacity="0.16" />
            <circle cx="210" cy="450" r="5" fill="var(--reel-stroke)" opacity="0.16" />
            <circle cx="226" cy="450" r="5" fill="var(--reel-stroke)" opacity="0.16" />
          </g>

          {/* Flow — 3 nodes with connectors */}
          <g className={styles.beatWireframe} style={d(0.76)}>
            <circle cx="130" cy="516" r="9"
                    fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.85" />
            <line x1="139" y1="516" x2="172" y2="516"
                  stroke="var(--reel-stroke)" strokeWidth="0.65" opacity="0.4"
                  markerEnd="url(#reelArrow)" />
            <circle cx="181" cy="516" r="9"
                    fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.85" />
            <line x1="190" y1="516" x2="223" y2="516"
                  stroke="var(--reel-stroke)" strokeWidth="0.65" opacity="0.4"
                  markerEnd="url(#reelArrow)" />
            <circle cx="232" cy="516" r="9"
                    fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.85" />
          </g>

        </g>

        {/* ── Beat 2.5 · Spacing annotations — near layer ── */}
        <g className={styles.layerNear}>
          <g className={styles.beatMeasure}>
            {/* Gap bracket: toggle ↔ input */}
            <line x1="153" y1="236" x2="199" y2="236"
                  stroke="var(--reel-stroke)" strokeWidth="0.5" opacity="0.35" />
            <line x1="153" y1="233" x2="153" y2="239"
                  stroke="var(--reel-stroke)" strokeWidth="0.5" opacity="0.35" />
            <line x1="199" y1="233" x2="199" y2="239"
                  stroke="var(--reel-stroke)" strokeWidth="0.5" opacity="0.35" />
            <text x="167" y="231" fontFamily="'JetBrains Mono', monospace" fontSize="6.5"
                  fill="var(--reel-stroke)" opacity="0.4" letterSpacing="0.04em">8</text>

            {/* Gap bracket: radio rows */}
            <line x1="170" y1="384" x2="170" y2="404"
                  stroke="var(--reel-stroke)" strokeWidth="0.5" opacity="0.35" />
            <line x1="167" y1="384" x2="173" y2="384"
                  stroke="var(--reel-stroke)" strokeWidth="0.5" opacity="0.35" />
            <line x1="167" y1="404" x2="173" y2="404"
                  stroke="var(--reel-stroke)" strokeWidth="0.5" opacity="0.35" />
            <text x="175" y="396" fontFamily="'JetBrains Mono', monospace" fontSize="6.5"
                  fill="var(--reel-stroke)" opacity="0.4" letterSpacing="0.04em">20</text>

            {/* Center crosshair on avatar group */}
            <line x1="200" y1="446" x2="220" y2="446"
                  stroke="var(--reel-stroke)" strokeWidth="0.55" opacity="0.32" />
            <line x1="210" y1="436" x2="210" y2="466"
                  stroke="var(--reel-stroke)" strokeWidth="0.55" opacity="0.32" />
            <circle cx="210" cy="456" r="2"
                    fill="none" stroke="var(--reel-stroke)" strokeWidth="0.55" opacity="0.32" />
          </g>
        </g>

        {/* ── Beat 3 · Single accent: CTA pill ── */}
        <g className={styles.layerMid}>
          {/* Wireframe state */}
          <rect x="162" y="564" width="92" height="28" rx="14"
                fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.9"
                className={styles.beatWireframe} style={d(0.62)} />
          {/* The one cyan fill */}
          <rect x="162" y="564" width="92" height="28" rx="14"
                fill="var(--accent)"
                className={styles.beatAccentFill} />
          {/* Label bar */}
          <rect x="191" y="576" width="34" height="4" rx="1"
                fill="var(--bg-primary)"
                className={styles.beatAccentLabel} />
        </g>

        {/* Glow blooms at accent apex only */}
        <rect className={styles.beatAccentGlow}
              x="0" y="380" width="400" height="320"
              fill="url(#reelGlow)" />
      </svg>
    </div>
  );
}
