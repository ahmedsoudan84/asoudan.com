"use client";

import type { ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";

/* ── Entrance wrapper + continuous float ── */
function FloatShell({
  children,
  style,
  enterDelay,
  distance = 7,
  duration = 5.5,
  enterFrom = { opacity: 0, x: 20, scale: 0.92 },
}: {
  children: ReactNode;
  style: CSSProperties;
  enterDelay: number;
  distance?: number;
  duration?: number;
  enterFrom?: Record<string, number>;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ ...style, willChange: "transform" }}
      initial={enterFrom}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ delay: enterDelay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -distance, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: enterDelay * 0.15,
        }}
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ── Shared glass card shell ── */
function GlassCard({
  children,
  className = "",
  borderColor = "rgba(255,255,255,0.09)",
  glowColor,
}: {
  children: ReactNode;
  className?: string;
  borderColor?: string;
  glowColor?: string;
}) {
  return (
    <div
      className={`rounded-2xl backdrop-blur-xl ${className}`}
      style={{
        background: "rgba(12, 10, 20, 0.62)",
        border: `1px solid ${borderColor}`,
        boxShadow: `0 10px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)${glowColor ? `, 0 0 24px ${glowColor}` : ""}`,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p
      className="text-[8px] uppercase tracking-[3px] font-medium"
      style={{ color: "rgba(255,255,255,0.25)" }}
    >
      {children}
    </p>
  );
}

/* ── 1. Color System card ── */
function ColorSystemCard() {
  const swatches = [
    { hex: "#3D9B9B", label: "Teal" },
    { hex: "#FF7A35", label: "Orange" },
    { hex: "#E8E3DB", label: "Sand" },
    { hex: "#252535", label: "Navy" },
    { hex: "#7A7A96", label: "Slate" },
  ];

  return (
    <GlassCard className="px-3.5 pt-2.5 pb-3" borderColor="rgba(255,255,255,0.09)">
      <Label>Colour System</Label>
      <div className="flex gap-2 mt-2">
        {swatches.map((s, i) => (
          <motion.div
            key={s.hex}
            className="flex flex-col items-center gap-1.5"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 + i * 0.07, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div
              className="w-6 h-6 rounded-lg shadow-md"
              style={{ background: s.hex }}
            />
            <span
              className="text-[6.5px] font-medium uppercase tracking-wide"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

/* ── 2. Experience ring stat ── */
function ExperienceStat() {
  return (
    <GlassCard
      className="px-4 py-3"
      borderColor="rgba(61,155,155,0.22)"
      glowColor="rgba(61,155,155,0.05)"
    >
      <Label>Experience</Label>
      <div className="flex items-end gap-1 mt-1.5 mb-2">
        <span
          className="text-[36px] font-light leading-none"
          style={{ color: "var(--accent)", lineHeight: 1 }}
        >
          22
        </span>
        <span
          className="text-sm mb-0.5"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          yrs
        </span>
      </div>
      {/* Progress track */}
      <div
        className="h-px w-full rounded-full"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--accent)", opacity: 0.7 }}
          initial={{ width: 0 }}
          animate={{ width: "88%" }}
          transition={{ delay: 2.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </GlassCard>
  );
}

/* ── 3. Project counter with sparkline ── */
function ProjectCounter() {
  const bars = [3, 5, 4, 6, 5, 7, 6, 8, 9, 10];

  return (
    <GlassCard className="px-4 py-3" borderColor="rgba(255,255,255,0.08)">
      <div className="flex items-start justify-between gap-10">
        <div>
          <div className="flex items-baseline gap-0.5">
            <span
              className="text-[30px] font-light leading-none"
              style={{ color: "var(--fg)" }}
            >
              300
            </span>
            <span
              className="text-lg font-light ml-0.5"
              style={{ color: "var(--accent)" }}
            >
              +
            </span>
          </div>
          <Label>Projects Delivered</Label>
        </div>

        {/* Sparkline */}
        <div className="flex gap-[3px] items-end self-end pb-0.5" style={{ height: 26 }}>
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-sm flex-shrink-0"
              style={{
                background:
                  i >= 7
                    ? "var(--accent)"
                    : "rgba(255,255,255,0.14)",
              }}
              initial={{ height: 0 }}
              animate={{ height: `${h * 2.3}px` }}
              transition={{
                delay: 2.4 + i * 0.04,
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

/* ── 4. Current role pill ── */
function CurrentRolePill() {
  return (
    <div
      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full backdrop-blur-xl"
      style={{
        background: "rgba(12, 10, 20, 0.62)",
        border: "1px solid rgba(255,122,53,0.22)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 20px rgba(255,122,53,0.06)",
      }}
    >
      {/* Pulsing status dot */}
      <div className="relative flex-shrink-0">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ background: "#FF7A35" }}
          animate={{ opacity: [1, 0.35, 1], scale: [1, 1.35, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "#FF7A35" }}
          animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div>
        <p
          className="text-[11px] font-medium leading-tight"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          Oxford University Press
        </p>
        <p
          className="text-[8px] uppercase tracking-[2px] mt-0.5"
          style={{ color: "rgba(255,122,53,0.6)" }}
        >
          Currently Active
        </p>
      </div>
    </div>
  );
}

/* ── 5. Subtle annotation line + dot connector ── */
function AnnotationLine() {
  return (
    <motion.div
      className="absolute hidden xl:block pointer-events-none"
      style={{ right: "10.2%", top: "11%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.2, duration: 1 }}
    >
      <svg width="1" height="120" fill="none">
        <motion.line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="120"
          stroke="rgba(61,155,155,0.18)"
          strokeWidth="1"
          strokeDasharray="3 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 3.2, duration: 1.2, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}

/* ── Main export ── */
export default function HeroDesignReel() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[25] hidden lg:block select-none">
      <AnnotationLine />

      {/* 1. Color system — top-right corner, above head */}
      <FloatShell
        style={{ right: "5%", top: "7%" }}
        enterDelay={1.5}
        distance={6}
        duration={5.8}
        enterFrom={{ opacity: 0, x: 16, scale: 0.9 }}
      >
        <ColorSystemCard />
      </FloatShell>

      {/* 2. Experience — right edge, mid-body (below neck) */}
      <FloatShell
        style={{ right: "5%", top: "51%" }}
        enterDelay={1.85}
        distance={5}
        duration={6.4}
        enterFrom={{ opacity: 0, x: 16, scale: 0.9 }}
      >
        <ExperienceStat />
      </FloatShell>

      {/* 3. Project counter — lower area */}
      <FloatShell
        style={{ right: "19%", bottom: "12%" }}
        enterDelay={2.15}
        distance={8}
        duration={5.0}
        enterFrom={{ opacity: 0, y: 16, scale: 0.9 }}
      >
        <ProjectCounter />
      </FloatShell>

      {/* 4. Current role — right edge, lower-mid */}
      <FloatShell
        style={{ right: "5%", bottom: "27%" }}
        enterDelay={2.45}
        distance={6}
        duration={6.0}
        enterFrom={{ opacity: 0, x: 16, scale: 0.9 }}
      >
        <CurrentRolePill />
      </FloatShell>
    </div>
  );
}
