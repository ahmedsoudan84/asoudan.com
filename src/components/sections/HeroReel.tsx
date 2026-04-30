"use client";

import styles from "./HeroReel.module.css";

export function HeroReel() {
  return (
    <div className={styles.reel} aria-hidden="true">
      <svg viewBox="0 0 400 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="reelAccentGlow" cx="50%" cy="46%" r="38%">
            <stop offset="0" stopColor="rgba(var(--accent-rgb),0.16)" />
            <stop offset="1" stopColor="rgba(var(--accent-rgb),0)" />
          </radialGradient>
        </defs>

        {/* ── Beat 1 · Construction guides — far layer, slow drift ── */}
        <g className={styles.layerFar}>
          <g className={styles.beatConstruct}>
            {/* Center vertical axis */}
            <line x1="200" y1="0" x2="200" y2="900"
                  stroke="var(--reel-stroke)" strokeWidth="0.35"
                  strokeDasharray="3 11" opacity="0.3" />
            {/* Horizontal axis */}
            <line x1="0" y1="397" x2="400" y2="397"
                  stroke="var(--reel-stroke)" strokeWidth="0.35"
                  strokeDasharray="3 11" opacity="0.3" />
            {/* Diagonal gesture — rough sketch feel */}
            <line x1="22" y1="172" x2="378" y2="618"
                  stroke="var(--reel-stroke)" strokeWidth="0.25"
                  strokeDasharray="2 16" opacity="0.12" />
          </g>
        </g>

        {/* ── Beat 2 · Card wireframe — mid layer ── */}
        <g className={styles.layerMid}>
          {/* Card fill — fades in with wireframe beat */}
          <rect x="72" y="215" width="256" height="365" rx="6"
                fill="var(--reel-fill)"
                className={styles.beatWireframe} />
          {/* Card border — draws in along its perimeter */}
          <rect x="72" y="215" width="256" height="365" rx="6"
                fill="none" stroke="var(--reel-stroke)" strokeWidth="1"
                className={styles.drawIn} />

          <g className={styles.beatWireframe}>
            {/* Avatar circle */}
            <circle cx="200" cy="322" r="40"
                    fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="0.75" />
            {/* Head */}
            <circle cx="200" cy="311" r="13"
                    fill="var(--reel-stroke)" opacity="0.2" />
            {/* Shoulders */}
            <path d="M168,347 a32,22 0 0 1 64,0"
                  fill="var(--reel-stroke)" opacity="0.18" />

            {/* Name bar */}
            <rect x="153" y="378" width="94" height="7" rx="2"
                  fill="var(--reel-stroke)" opacity="0.5" />
            {/* Role bar */}
            <rect x="168" y="393" width="64" height="4" rx="1"
                  fill="var(--reel-stroke)" opacity="0.26" />

            {/* Divider */}
            <line x1="92" y1="418" x2="308" y2="418"
                  stroke="var(--reel-stroke)" strokeWidth="0.5" opacity="0.2" />

            {/* Content lines — two only, breathing room */}
            <rect x="92" y="432" width="172" height="4" rx="1"
                  fill="var(--reel-stroke)" opacity="0.18" />
            <rect x="92" y="444" width="128" height="4" rx="1"
                  fill="var(--reel-stroke)" opacity="0.18" />
          </g>
        </g>

        {/* ── Beat 2.5 · Anchor points + measurements — near layer ── */}
        <g className={styles.layerNear}>
          <g className={styles.beatMeasure}>
            {/* Corner crosshairs — TL */}
            <line x1="61" y1="215" x2="83" y2="215" stroke="var(--reel-stroke)" strokeWidth="0.7" opacity="0.6" />
            <line x1="72" y1="204" x2="72" y2="226" stroke="var(--reel-stroke)" strokeWidth="0.7" opacity="0.6" />
            <circle cx="72" cy="215" r="2.5" fill="none" stroke="var(--reel-stroke)" strokeWidth="0.7" opacity="0.6" />
            {/* TR */}
            <line x1="317" y1="215" x2="339" y2="215" stroke="var(--reel-stroke)" strokeWidth="0.7" opacity="0.6" />
            <line x1="328" y1="204" x2="328" y2="226" stroke="var(--reel-stroke)" strokeWidth="0.7" opacity="0.6" />
            <circle cx="328" cy="215" r="2.5" fill="none" stroke="var(--reel-stroke)" strokeWidth="0.7" opacity="0.6" />
            {/* BL */}
            <line x1="61" y1="580" x2="83" y2="580" stroke="var(--reel-stroke)" strokeWidth="0.7" opacity="0.6" />
            <line x1="72" y1="569" x2="72" y2="591" stroke="var(--reel-stroke)" strokeWidth="0.7" opacity="0.6" />
            <circle cx="72" cy="580" r="2.5" fill="none" stroke="var(--reel-stroke)" strokeWidth="0.7" opacity="0.6" />
            {/* BR */}
            <line x1="317" y1="580" x2="339" y2="580" stroke="var(--reel-stroke)" strokeWidth="0.7" opacity="0.6" />
            <line x1="328" y1="569" x2="328" y2="591" stroke="var(--reel-stroke)" strokeWidth="0.7" opacity="0.6" />
            <circle cx="328" cy="580" r="2.5" fill="none" stroke="var(--reel-stroke)" strokeWidth="0.7" opacity="0.6" />

            {/* Height dimension — right of card */}
            <line x1="350" y1="215" x2="350" y2="580" stroke="var(--reel-stroke)" strokeWidth="0.55" opacity="0.4" />
            <line x1="346" y1="215" x2="354" y2="215" stroke="var(--reel-stroke)" strokeWidth="0.55" opacity="0.4" />
            <line x1="346" y1="580" x2="354" y2="580" stroke="var(--reel-stroke)" strokeWidth="0.55" opacity="0.4" />
            <text x="357" y="400" fontFamily="'JetBrains Mono', monospace" fontSize="7.5"
                  fill="var(--reel-stroke)" opacity="0.45" letterSpacing="0.03em">365</text>

            {/* Width dimension — below card */}
            <line x1="72" y1="596" x2="328" y2="596" stroke="var(--reel-stroke)" strokeWidth="0.55" opacity="0.4" />
            <line x1="72" y1="592" x2="72" y2="600" stroke="var(--reel-stroke)" strokeWidth="0.55" opacity="0.4" />
            <line x1="328" y1="592" x2="328" y2="600" stroke="var(--reel-stroke)" strokeWidth="0.55" opacity="0.4" />
            <text x="188" y="612" fontFamily="'JetBrains Mono', monospace" fontSize="7.5"
                  fill="var(--reel-stroke)" opacity="0.45" letterSpacing="0.03em">256</text>
          </g>
        </g>

        {/* ── Beat 3 · Single accent moment: the CTA button ── */}
        <g className={styles.layerMid}>
          {/* Wireframe state */}
          <rect x="92" y="468" width="216" height="44" rx="22"
                fill="var(--reel-fill)" stroke="var(--reel-stroke)" strokeWidth="1"
                className={styles.beatWireframe} />
          {/* The ONE cyan fill — apex of the loop */}
          <rect x="92" y="468" width="216" height="44" rx="22"
                fill="var(--accent)"
                className={styles.beatAccentFill} />
          {/* Label bar on accent button */}
          <rect x="172" y="488" width="56" height="5" rx="2"
                fill="var(--bg-primary)"
                className={styles.beatAccentLabel} />
        </g>

        {/* Ambient glow — blooms only at accent apex */}
        <rect className={styles.beatAccentGlow}
              x="0" y="250" width="400" height="430"
              fill="url(#reelAccentGlow)" />
      </svg>
    </div>
  );
}
