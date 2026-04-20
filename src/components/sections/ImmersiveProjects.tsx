"use client";
import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projectsData } from "@/lib/projects";

/* ── Unified project list ── */
const allProjects = projectsData
  .filter((p) => !p.hidden && ((p.caseStudy && p.caseStudy.length > 0) || p.behanceUrl))
  .map((p) => ({
    id: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category,
    description: p.description,
    tags: p.tags,
    color: p.color,
    cover: p.cover,
    behanceUrl: p.behanceUrl,
    hasCaseStudy: !!(p.caseStudy && p.caseStudy.length > 0),
  }));

type Project = typeof allProjects[0];

/* ── Card dimensions (base — scaled down for small viewports) ── */
const CARD_W = 200;
const CARD_H = 278;

/* ── Per-layer stacked offsets ── */
const S_X  = [0,   5,  -6,   4,  -4,   2,  -3];
const S_Y  = [0,  -5,  -10, -15, -20, -24, -28];
const S_Z  = [0, -20, -40, -60, -80, -100, -120];
const S_RZ = [0, -2,  1.6, -1.2, 1,  -0.7,  0.5];

/* ──────────────────────────────────────────────────────────────
   STACK CARD 3D
────────────────────────────────────────────────────────────── */
function StackCard3D({
  project,
  index,
  total,
  fanned,
  spacing,
  isHovered,
  onHover,
  onClick,
  onStackClick,
}: {
  project: Project;
  index: number;
  total: number;
  fanned: boolean;
  spacing: number;
  isHovered: boolean;
  onHover: (i: number | null) => void;
  onClick: () => void;
  onStackClick: () => void;
}) {
  const mid  = (total - 1) / 2;
  const rel  = index - mid;
  const norm = mid > 0 ? rel / mid : 0; // -1 … +1

  /* Fan transforms */
  const fanX  = rel * spacing;
  const fanY  = norm * norm * 14;            // gentle parabolic arc (center dips down)
  const fanRz = norm * -1.4;                 // slight lean follows position
  const fanRy = norm * -3;                   // 3-D perspective lean

  /* Stacked transforms */
  const si         = Math.min(index, 6);
  const stackVis   = index < 7;
  const stackScale = 1 - si * 0.028;
  const stackOp    = stackVis ? Math.max(0.05, 1 - si * 0.14) : 0;

  /* Z-index — center cards on top in fan; top card on top in stack */
  const zIndex = fanned
    ? isHovered ? 200 : Math.round((total - Math.abs(rel)) * 2)
    : total - index + 1;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (fanned) onClick();
      else if (index === 0) onStackClick();
    },
    [fanned, index, onClick, onStackClick],
  );

  return (
    <motion.div
      className="absolute select-none"
      style={{
        width: CARD_W,
        height: CARD_H,
        top: "50%",
        left: "50%",
        marginTop:  -(CARD_H / 2),
        marginLeft: -(CARD_W / 2),
        zIndex,
        cursor: fanned ? "pointer" : index === 0 ? "pointer" : "default",
      }}
      animate={{
        x:       fanned ? fanX               : S_X[si],
        y:       fanned ? (isHovered ? fanY - 20 : fanY) : S_Y[si],
        z:       fanned ? (isHovered ? 90 : 0)           : S_Z[si],
        rotateZ: fanned ? (isHovered ? fanRz * 0.3 : fanRz) : S_RZ[si],
        rotateY: fanned ? (isHovered ? 0 : fanRy)           : 0,
        scale:   fanned ? (isHovered ? 1.07 : 1)            : stackScale,
        opacity: fanned ? 1 : stackOp,
      }}
      transition={{
        type:      "spring",
        stiffness: 220,
        damping:   27,
        mass:      0.75,
        delay: fanned
          ? index * 0.022
          : (total - 1 - index) * 0.016,
      }}
      onHoverStart={() => { if (fanned) onHover(index); }}
      onHoverEnd={()  => { if (fanned) onHover(null);  }}
      onClick={handleClick}
    >
      {/* ── Card face ── */}
      <div
        className="w-full h-full rounded-[18px] overflow-hidden relative flex flex-col"
        style={{
          border: `1px solid ${project.color}${isHovered && fanned ? "55" : "28"}`,
          boxShadow: isHovered && fanned
            ? `0 28px 64px -14px ${project.color}65, 0 8px 24px rgba(0,0,0,0.55)`
            : `0 10px 32px -12px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Cover image */}
        <div className="absolute inset-0">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="220px"
            draggable={false}
            className="object-cover"
          />
        </div>

        {/* Colour-tinted gradient — bottom-up */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top,
              ${project.color}e8 0%,
              ${project.color}60 38%,
              ${project.color}22 60%,
              transparent 80%)`,
          }}
        />

        {/* Top-edge darkening so the card reads as depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, transparent 45%)",
          }}
        />

        {/* Project info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span
            className="block text-[7.5px] font-semibold uppercase tracking-[2px] mb-1.5"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            {project.category}
          </span>
          <h3
            className="font-bold text-[13px] leading-tight text-white"
            style={{
              fontFamily: "Montserrat, sans-serif",
              textShadow: "0 1px 4px rgba(0,0,0,0.45)",
            }}
          >
            {project.title}
          </h3>
        </div>

        {/* Behance badge */}
        {!project.hasCaseStudy && (
          <div
            className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[7px]
                       font-semibold uppercase tracking-[1.5px]"
            style={{
              background: "rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "white",
              backdropFilter: "blur(8px)",
            }}
          >
            Behance
          </div>
        )}

        {/* Hover ring */}
        <motion.div
          className="absolute inset-0 rounded-[18px] pointer-events-none"
          animate={{ opacity: isHovered && fanned ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          style={{ boxShadow: `inset 0 0 0 1.5px ${project.color}` }}
        />
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   CARD STACK 3D — orchestrates the stack + fan
────────────────────────────────────────────────────────────── */
function CardStack3D({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const stageRef = useRef<HTMLDivElement>(null);
  const [fanned, setFanned]           = useState(false);
  const [hoveredIdx, setHoveredIdx]   = useState<number | null>(null);
  const [containerW, setContainerW]   = useState(0);

  /* Measure container for responsive spacing */
  useEffect(() => {
    const update = () => {
      if (stageRef.current) setContainerW(stageRef.current.offsetWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  /* Dynamic spacing: fill the container evenly, capped at 68 px */
  const spacing = containerW > 0
    ? Math.max(22, Math.min(68, (containerW - CARD_W - 60) / Math.max(projects.length - 1, 1)))
    : 62;

  const N = projects.length;
  const STAGE_H = CARD_H + 80;

  const hoveredProject = hoveredIdx !== null ? projects[hoveredIdx] : null;

  const navigateTo = useCallback((p: Project) => {
    if (p.hasCaseStudy) router.push(`/projects/${p.id}`);
    else if (p.behanceUrl) window.open(p.behanceUrl, "_blank", "noopener,noreferrer");
  }, [router]);

  const handleHover = useCallback((idx: number | null) => {
    setHoveredIdx(idx);
    if (idx !== null && projects[idx]?.hasCaseStudy) {
      router.prefetch(`/projects/${projects[idx].id}`);
    }
  }, [projects, router]);

  const topProject = projects[0];

  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      {/* ── 3D stage ── */}
      <div
        ref={stageRef}
        onClick={() => { if (!fanned) setFanned(true); }}
        style={{
          position: "relative",
          width: "100%",
          height: STAGE_H,
          perspective: "1300px",
          perspectiveOrigin: "50% 50%",
          cursor: fanned ? "default" : "pointer",
        }}
      >
        {/* Ambient floor glow — pulses gently when stacked */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ bottom: 24, left: "50%", transform: "translateX(-50%)" }}
          animate={{
            width: fanned ? `${Math.min(80, (N * spacing + CARD_W) / (containerW || 1) * 100)}%` : 280,
            opacity: fanned ? 0.28 : 0.55,
          }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              height: 1,
              background: `radial-gradient(ellipse, ${topProject?.color ?? "var(--accent)"}90, transparent 72%)`,
              filter: "blur(14px)",
            }}
          />
        </motion.div>

        {/* Cards — rendered back-to-front so card 0 paints last (on top) */}
        {[...projects].reverse().map((p, ri) => {
          const i = N - 1 - ri;
          return (
            <StackCard3D
              key={p.id}
              project={p}
              index={i}
              total={N}
              fanned={fanned}
              spacing={spacing}
              isHovered={hoveredIdx === i}
              onHover={handleHover}
              onClick={() => navigateTo(p)}
              onStackClick={() => setFanned(true)}
            />
          );
        })}

        {/* "Click to expand" label — visible on stack, fades out when fanned */}
        <AnimatePresence>
          {!fanned && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="absolute inset-0 flex items-end justify-center pointer-events-none"
              style={{ paddingBottom: 6 }}
            >
              <span
                className="text-[9px] uppercase tracking-[2.5px]"
                style={{ color: "var(--fg-25)" }}
              >
                click to fan out
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Detail / hint panel ── */}
      <div className="mt-9 w-full max-w-[340px] min-h-[128px] flex flex-col items-center justify-start">
        <AnimatePresence mode="wait">
          {hoveredProject && fanned ? (
            /* Hovered project details */
            <motion.div
              key={hoveredProject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-2 px-4 text-center w-full"
            >
              <span
                className="text-[9px] font-semibold uppercase tracking-[2.5px]"
                style={{ color: hoveredProject.color }}
              >
                {hoveredProject.category}
              </span>
              <h3
                className="font-bold leading-tight"
                style={{
                  fontSize: "clamp(15px, 2vw, 20px)",
                  color: "var(--fg)",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {hoveredProject.title}
              </h3>
              <p
                className="text-[11px] leading-relaxed line-clamp-2"
                style={{ color: "var(--fg-50)" }}
              >
                {hoveredProject.subtitle}
              </p>
              <motion.button
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07 }}
                onClick={() => navigateTo(hoveredProject)}
                className="mt-1 inline-flex items-center gap-2 px-5 py-2 rounded-full
                           text-[10px] font-semibold uppercase tracking-[2.5px]
                           transition-transform hover:scale-105"
                style={{
                  color: "var(--bg-primary)",
                  background: hoveredProject.color,
                  boxShadow: `0 8px 24px -8px ${hoveredProject.color}88`,
                }}
              >
                {hoveredProject.hasCaseStudy ? "View Case Study" : "View on Behance"}
                <svg
                  width="11" height="11" viewBox="0 0 11 11"
                  fill="none" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M2 5.5h7M6 2l3.5 3.5L6 9" />
                </svg>
              </motion.button>
            </motion.div>
          ) : (
            /* Stack count / fan hint */
            <motion.div
              key={fanned ? "fan-hint" : "stack-hint"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-3 pt-1"
            >
              {!fanned ? (
                <>
                  <p
                    className="text-[10px] uppercase tracking-[3px]"
                    style={{ color: "var(--fg-30)" }}
                  >
                    {N} Projects
                  </p>
                  {/* Decorative dot row — project colours */}
                  <div className="flex items-center gap-1">
                    {projects.slice(0, 8).map((p, i) => (
                      <div
                        key={p.id}
                        className="rounded-full"
                        style={{
                          width: i === 0 ? 14 : 5,
                          height: 5,
                          background: p.color,
                          opacity: 0.6 - i * 0.06,
                        }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setFanned(true)}
                    className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full
                               text-[10px] font-semibold uppercase tracking-[2.5px]
                               transition-all hover:scale-105"
                    style={{
                      color: "var(--fg)",
                      border: "1px solid var(--border-card)",
                    }}
                  >
                    {/* Fan-out icon */}
                    <svg
                      width="15" height="12" viewBox="0 0 15 12"
                      fill="none" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round"
                    >
                      <path d="M7.5 11 1 2" opacity="0.5" />
                      <path d="M7.5 11 4 1.5" />
                      <path d="M7.5 11 7.5 1" />
                      <path d="M7.5 11 11 1.5" />
                      <path d="M7.5 11 14 2" opacity="0.5" />
                    </svg>
                    Explore all
                  </button>
                </>
              ) : (
                <p
                  className="text-[10px] uppercase tracking-[2px]"
                  style={{ color: "var(--fg-30)" }}
                >
                  Hover a card · Click to open
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse button */}
      <AnimatePresence>
        {fanned && (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, delay: 0.12 }}
            onClick={() => { setFanned(false); setHoveredIdx(null); }}
            className="mt-4 inline-flex items-center gap-2 text-[9px] uppercase
                       tracking-[2px] transition-opacity hover:opacity-60"
            style={{ color: "var(--fg-35)" }}
          >
            <svg
              width="10" height="10" viewBox="0 0 10 10"
              fill="none" stroke="currentColor"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 8V2M2 5l3-3 3 3" />
            </svg>
            Collapse stack
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SECTION INTRO
────────────────────────────────────────────────────────────── */
function ProjectsIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="text-center pt-24 lg:pt-32 pb-10 lg:pb-14">
      <motion.span
        initial={{ opacity: 0, letterSpacing: "0.2em" }}
        animate={isInView ? { opacity: 1, letterSpacing: "0.5em" } : {}}
        transition={{ duration: 1 }}
        className="text-[10px] font-medium uppercase mb-6 block"
        style={{ color: "var(--fg-30)" }}
      >
        Selected Work
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="font-montserrat font-bold text-center"
        style={{ fontSize: "clamp(40px, 6vw, 72px)", color: "var(--fg)" }}
      >
        Portfolio
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="text-[12px] tracking-[2px] uppercase mt-5"
        style={{ color: "var(--fg-30)" }}
      >
        Click to fan · Hover to explore
      </motion.p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MAIN EXPORT
────────────────────────────────────────────────────────────── */
export default function ImmersiveProjects() {
  const bucketOf = (cat: string): "Product Design" | "Campaign" | "Branding" => {
    const c = cat.toUpperCase();
    if (c.includes("BRAND")) return "Branding";
    if (c.includes("CAMPAIGN")) return "Campaign";
    return "Product Design";
  };

  const categories = ["All", "Product Design", "Campaign", "Branding"];
  const [activeCat, setActiveCat] = useState<string>("All");

  const filtered = useMemo(() => {
    const base =
      activeCat === "All"
        ? allProjects
        : allProjects.filter((p) => bucketOf(p.category) === activeCat);
    return [...base].sort((a, b) => Number(b.hasCaseStudy) - Number(a.hasCaseStudy));
  }, [activeCat]);

  return (
    <section className="font-montserrat relative" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="px-6 lg:px-12">
          <ProjectsIntro />

          {/* Scroll anchor for floating nav "Work" link */}
          <div id="projects" className="scroll-mt-28" />

          {/* Filter chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {categories.map((cat) => {
              const active = cat === activeCat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCat(cat)}
                  className="relative rounded-full px-4 py-1.5 text-[11px]
                             uppercase tracking-[2px] transition-colors"
                  style={{
                    color:      active ? "var(--bg-primary)" : "var(--fg-60)",
                    background: active ? "var(--accent)"     : "transparent",
                    border: "1px solid var(--border-card)",
                  }}
                >
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Card stack — key on activeCat resets fanned state on category switch */}
        {filtered.length > 0 ? (
          <CardStack3D key={activeCat} projects={filtered} />
        ) : (
          <p
            className="text-center py-20 text-[13px]"
            style={{ color: "var(--fg-30)" }}
          >
            No projects in this category.
          </p>
        )}

        <div className="mb-24" />
      </div>
    </section>
  );
}
