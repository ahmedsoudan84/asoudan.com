"use client";
import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView, AnimatePresence, animate, useAnimationControls } from "framer-motion";
import { projectsData } from "@/lib/projects";

/* ── Unified project list — case studies + Behance flow together ── */
const allProjects = projectsData
  .filter((p) => !p.hidden && ((p.caseStudy && p.caseStudy.length > 0) || p.behanceUrl))
  .map((p) => ({
    id: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category,
    number: p.number,
    description: p.description,
    tags: p.tags,
    color: p.color,
    cover: p.cover,
    coverStyle: p.coverStyle ?? "fill",
    behanceUrl: p.behanceUrl,
    hasCaseStudy: !!(p.caseStudy && p.caseStudy.length > 0),
  }));

type Project = typeof allProjects[0];

/* ──────────────────────────────────────────────────────────────
   COVER — renders inside a fixed aspect-[16/11] image zone.
   No percentage-based padding — the parent provides the bounds.
────────────────────────────────────────────────────────────── */
function CoverMedia({ project }: { project: Project }) {
  const alt = `${project.title} — ${project.subtitle}`;
  const sizes = "(max-width: 640px) 380px, 520px";

  if (project.coverStyle === "browser") {
    return (
      // Fills the image zone, leaves 12px breathing room on all sides then renders
      // a full-height macOS chrome box — no bottom percentage hack needed.
      <div className="absolute inset-0 p-3">
        <div
          className="w-full h-full rounded-[10px] overflow-hidden flex flex-col
                     shadow-[0_16px_40px_-16px_rgba(0,0,0,0.55)]"
          style={{ border: `1px solid ${project.color}30` }}
        >
          {/* macOS chrome bar */}
          <div
            className="flex items-center gap-1.5 px-3 py-[7px] shrink-0 border-b"
            style={{
              background: `linear-gradient(180deg, ${project.color}1a, ${project.color}0d)`,
              borderColor: `${project.color}20`,
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
            <span className="ml-2 flex-1 h-[14px] rounded-[4px]"
              style={{ background: `${project.color}14` }} />
          </div>
          {/* Screenshot fills the remaining height */}
          <div className="relative flex-1 min-h-0">
            <Image
              src={project.cover}
              alt={alt}
              fill
              draggable={false}
              loading="eager"
              className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              sizes={sizes}
            />
          </div>
        </div>
      </div>
    );
  }

  if (project.coverStyle === "phone") {
    return (
      <div className="absolute inset-0 flex items-center justify-center py-3 px-16">
        <div
          className="relative h-full aspect-[9/18] rounded-[20px] overflow-hidden shrink-0"
          style={{
            border: `1.5px solid ${project.color}40`,
            boxShadow: `0 16px 40px -12px rgba(0,0,0,0.55)`,
            background: "#000",
          }}
        >
          <Image
            src={project.cover}
            alt={alt}
            fill
            draggable={false}
            loading="eager"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 40vw, 200px"
          />
        </div>
      </div>
    );
  }

  if (project.coverStyle === "contain") {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="relative w-full h-full">
          <Image
            src={project.cover}
            alt={alt}
            fill
            draggable={false}
            loading="eager"
            className="object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            sizes={sizes}
          />
        </div>
      </div>
    );
  }

  // Default "fill" — photographic / full-bleed composition
  return (
    <div className="absolute inset-0">
      <Image
        src={project.cover}
        alt={alt}
        fill
        draggable={false}
        loading="eager"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        sizes={sizes}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   CAROUSEL CARD — editorial layout: image zone on top, info panel
   below. Cover is NEVER obscured — no overlays on the image.
   Info panel is always readable and expands on hover.
────────────────────────────────────────────────────────────── */
function CarouselCard({ project, offset, wiggleTick }: { project: Project; offset: number; wiggleTick: number }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const active = offset === 0;

  // Idle attractor — when the parent increments `wiggleTick` after 15s of
  // no interaction, the card immediately to the right of the active one
  // (offset === 1) does a subtle 1px horizontal wiggle to hint "there's
  // more here." Anything else ignores the tick.
  const wiggle = useAnimationControls();
  useEffect(() => {
    if (wiggleTick === 0 || offset !== 1) return;
    if (typeof window !== "undefined"
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    wiggle.start({
      x: [0, -1, 1, -1, 1, 0],
      transition: { duration: 0.9, ease: "easeInOut" },
    });
  }, [wiggleTick, offset, wiggle]);

  // On touch/no-hover devices (phones, tablets) there is no hover state,
  // so project details are always expanded — users browse by scrolling,
  // not hovering. Click still navigates to the project as normal.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // showDetails: always true on touch devices; toggled by hover on desktop
  const showDetails = isMobile || hovered;

  const handleClick = () => {
    if (project.hasCaseStudy) router.push(`/projects/${project.id}`);
    else if (project.behanceUrl) window.open(project.behanceUrl, "_blank", "noopener,noreferrer");
  };
  const handleEnter = () => {
    setHovered(true);
    if (project.hasCaseStudy) router.prefetch(`/projects/${project.id}`);
  };

  const framed = project.coverStyle !== "fill" && project.coverStyle !== undefined;

  // Continuous distance-from-center → 3D coverflow spring physics
  const distance = Math.abs(offset);
  const clampedOffset = Math.max(-3, Math.min(3, offset));
  const rotateY = clampedOffset * -6;
  const scale = active ? 1 : Math.max(0.86, 1 - distance * 0.055);
  const opacity = active ? 1 : Math.max(0.5, 1 - distance * 0.2);
  const y = active ? 0 : Math.min(20, distance * 7);

  return (
    <motion.div
      animate={wiggle}
      className="shrink-0 snap-center
                 w-[78vw] sm:w-[460px] lg:w-[520px]"
    >
    <motion.article
      id={`project-${project.id}`}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
      animate={{ scale, opacity, rotateY, y }}
      transition={{
        scale:   { type: "spring", stiffness: 260, damping: 28, mass: 0.7 },
        rotateY: { type: "spring", stiffness: 200, damping: 26, mass: 0.7 },
        y:       { type: "spring", stiffness: 240, damping: 28 },
        opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
        border: `1px solid ${project.color}28`,
        boxShadow: active
          ? `0 32px 72px -24px ${project.color}50, 0 8px 32px -16px rgba(var(--bg-primary-rgb),0.5)`
          : `0 8px 28px -16px rgba(var(--bg-primary-rgb),0.4)`,
      }}
      className="group w-full cursor-pointer select-none flex flex-col
                 rounded-[24px] overflow-hidden"
    >
      {/* ── IMAGE ZONE ─────────────────────────────────────────
          Fixed aspect-[16/11] container — cover always 100% visible.
          For framed covers the branded tint shows in the padding area
          around the browser/phone chrome.
      ───────────────────────────────────────────────────────── */}
      <div
        className="relative aspect-[16/11] overflow-hidden shrink-0"
        style={{
          background: framed
            ? `radial-gradient(ellipse 140% 100% at 50% 0%, ${project.color}30 0%, ${project.color}14 55%, var(--bg-primary) 100%)`
            : `${project.color}10`,
        }}
      >
        <CoverMedia project={project} />

        {/* Subtle top-right Behance badge — stays within the image zone */}
        {!project.hasCaseStudy && (
          <span
            className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full text-[9px]
                       font-semibold uppercase tracking-[2px] backdrop-blur-sm"
            style={{
              color: "white",
              background: "rgba(0,0,0,0.38)",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
          >
            Behance
          </span>
        )}
      </div>

      {/* ── INFO PANEL ─────────────────────────────────────────
          Always visible below the image — never covers the cover.
          Base content (category + title + subtitle) is always shown.
          On hover a smooth expand reveals description + tags + CTA.
      ───────────────────────────────────────────────────────── */}
      <div
        className="flex flex-col px-6 pt-4 pb-5"
        style={{
          background: "var(--bg-primary)",
          borderTop: `1px solid ${project.color}20`,
        }}
      >
        {/* Category pill */}
        <motion.span
          className="self-start text-[9px] font-semibold uppercase tracking-[2px]
                     px-2.5 py-1 rounded-full mb-3 transition-shadow duration-300"
          animate={{
            background: showDetails ? `${project.color}38` : `${project.color}20`,
            boxShadow: showDetails ? `0 4px 14px -6px ${project.color}55` : "0 0 0 0 transparent",
          }}
          transition={{ duration: 0.3 }}
          style={{
            color: project.color,
            border: `1px solid ${showDetails ? project.color : `${project.color}45`}`,
          }}
        >
          {project.category}
        </motion.span>

        {/* Title — word-stagger slide-up when card becomes active */}
        <h3
          className="font-montserrat font-bold leading-[1.15] flex flex-wrap mb-1.5"
          style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
        >
          {project.title.split(" ").map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="overflow-hidden inline-block align-bottom mr-[0.28em] last:mr-0"
              style={{ paddingBottom: "0.05em" }}
            >
              <motion.span
                className="inline-block will-change-transform transition-colors duration-300"
                initial={{ y: "110%" }}
                animate={{
                  // Desktop: title slides up only when centred (active) — coverflow reveal.
                  // Mobile: always visible so title is readable while swiping.
                  y: (active || isMobile) ? "0%" : "110%",
                }}
                transition={{
                  duration: 0.65,
                  delay: active ? 0.06 + i * 0.055 : 0,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ color: showDetails ? project.color : "var(--fg)" }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h3>

        {/* Subtitle — always visible */}
        <p
          className="text-[12px] leading-[1.5] transition-colors duration-300"
          style={{ color: showDetails ? "var(--fg-80)" : "var(--fg-50)" }}
        >
          {project.subtitle}
        </p>

        {/* Hover-reveal — description + tags + CTA slides in below subtitle */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p
                className="text-[12px] leading-[1.65] mt-3 line-clamp-2"
                style={{ color: "var(--fg-70)" }}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-[1.5px] font-medium"
                    style={{ color: "var(--fg-50)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="inline-flex items-center gap-2 mt-4 rounded-full px-4 py-2
                           text-[10px] font-semibold uppercase tracking-[2.5px]
                           transition-all duration-300 hover:gap-3"
                style={{
                  color: "var(--fg)",
                  background: `${project.color}28`,
                  border: `1px solid ${project.color}`,
                  boxShadow: `0 6px 18px -8px ${project.color}80`,
                }}
              >
                {project.hasCaseStudy ? "View Project" : "View on Behance"}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover ring — full-card outline that hugs all four 24px corners.
          Previously the ring lived inside the image zone with rounded-[inherit]
          (inheriting nothing), so its corners were sharp and got clipped by the
          article's rounding — making it invisible on rounded edges. */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[24px]"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ boxShadow: `inset 0 0 0 1.5px ${project.color}` }}
      />
    </motion.article>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   CAROUSEL — drag + snap horizontal scroller
────────────────────────────────────────────────────────────── */
function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  // dragEndTime replaces the sticky `moved` boolean — see onClickCapture below.
  const dragState = useRef({ down: false, startX: 0, startScroll: 0, moved: false, dragEndTime: 0 });
  const scrollAnimRef = useRef<{ stop: () => void } | null>(null);

  // Idle attractor — after 15 s of no user interaction, increment wiggleTick so
  // the next-up card (offset === 1) nudges 1px to hint "keep going." The timer
  // re-arms after every fire, so long idle sessions keep getting gentle reminders.
  const [wiggleTick, setWiggleTick] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const arm = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setWiggleTick((t) => t + 1);
        arm();
      }, 15000);
    };
    const events: (keyof WindowEventMap)[] = [
      "scroll", "pointermove", "pointerdown", "keydown", "touchstart", "wheel",
    ];
    const reset = () => arm();
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    arm();
    return () => {
      if (timer) clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, []);

  // Track which card is centered
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const center = el.scrollLeft + el.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((child, i) => {
        const node = child as HTMLElement;
        const c = node.offsetLeft + node.offsetWidth / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      setActiveIdx(bestIdx);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [projects.length]);

  // Spring-driven scroll-to — cinematic ease beats native "smooth" which is linear-ish.
  // Uses framer-motion's `animate` to drive scrollLeft with physics, with reduced-motion fallback.
  const scrollToIdx = useCallback((idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(projects.length - 1, idx));
    const child = el.children[clamped] as HTMLElement | undefined;
    if (!child) return;
    const target = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;

    const reduce = typeof window !== "undefined"
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.scrollTo({ left: target, behavior: "auto" });
      return;
    }

    // Cancel any in-flight spring so rapid arrow taps don't stack
    scrollAnimRef.current?.stop();
    // Disable snap during programmatic scroll so the spring can settle, then restore
    const prevSnap = el.style.scrollSnapType;
    el.style.scrollSnapType = "none";
    const controls = animate(el.scrollLeft, target, {
      type: "spring",
      stiffness: 140,
      damping: 22,
      mass: 0.9,
      onUpdate: (v) => { el.scrollLeft = v; },
      onComplete: () => {
        el.style.scrollSnapType = prevSnap || "x mandatory";
        scrollAnimRef.current = null;
      },
    });
    scrollAnimRef.current = controls;
  }, [projects.length]);

  // Pointer drag — convert horizontal drag to scroll.
  //
  // We DO NOT use `setPointerCapture` on the scroller here. Capturing the
  // pointer to the scroller made the resulting click event target the
  // scroller instead of the card that the user actually tapped, so the
  // card's `onClick` (which navigates to the case study) never fired —
  // only the keyboard Enter path worked. Instead, when a drag starts we
  // attach `pointermove` / `pointerup` / `pointercancel` listeners to the
  // document, which keeps tracking the drag even if the pointer leaves the
  // scroller, while leaving the normal click pipeline untouched.
  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;
    dragState.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
      dragEndTime: dragState.current.dragEndTime,
    };

    // Touch fingers jitter a few pixels during a tap — use a larger drag
    // threshold for touch and only commit to "this is a drag" once it's
    // crossed, so light taps still register as clicks.
    const threshold = e.pointerType === "touch" ? 10 : 4;

    const onMove = (ev: PointerEvent) => {
      if (!dragState.current.down) return;
      const dx = ev.clientX - dragState.current.startX;
      if (!dragState.current.moved && Math.abs(dx) <= threshold) return;
      if (!dragState.current.moved) {
        dragState.current.moved = true;
        el.style.scrollSnapType = "none";
        el.style.cursor = "grabbing";
      }
      el.scrollLeft = dragState.current.startScroll - dx;
    };

    const onUp = () => {
      if (!dragState.current.down) return;
      dragState.current.down = false;
      if (dragState.current.moved) {
        dragState.current.dragEndTime = Date.now();
        dragState.current.moved = false;
        el.style.cursor = "grab";
        requestAnimationFrame(() => {
          if (el) el.style.scrollSnapType = "x mandatory";
        });
      }
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onUp);
  };

  // Suppress the click that fires immediately after a real drag release
  // (within 200ms). Clean taps never set `dragEndTime`, so their clicks
  // pass through untouched and the card's `onClick` runs normally.
  const onClickCapture = (e: React.MouseEvent) => {
    if (Date.now() - dragState.current.dragEndTime < 200) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Keyboard nav — ← →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      if (e.key === "ArrowRight") { e.preventDefault(); scrollToIdx(activeIdx + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); scrollToIdx(activeIdx - 1); }
      else if (e.key === "Enter") {
        const p = projects[activeIdx];
        if (!p) return;
        if (p.hasCaseStudy) window.location.assign(`/projects/${p.id}`);
        else if (p.behanceUrl) window.open(p.behanceUrl, "_blank", "noopener,noreferrer");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, projects, scrollToIdx]);

  return (
    <div className="relative">
      {/* Scroller */}
      <div
        ref={scrollerRef}
        role="region"
        aria-label="Projects carousel"
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
        className="flex gap-5 lg:gap-7 overflow-x-auto overflow-y-hidden pb-8 pt-2
                   px-[11vw] sm:px-[calc((100vw-460px)/2)] lg:px-[calc((100vw-520px)/2)]
                   snap-x snap-mandatory cursor-grab
                   [scrollbar-width:none] [-ms-overflow-style:none]
                   [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {projects.map((p, i) => (
          <CarouselCard key={p.id} project={p} offset={i - activeIdx} wiggleTick={wiggleTick} />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 px-6 lg:px-12 max-w-[1200px] mx-auto">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 text-[11px] tracking-[2px] uppercase" style={{ color: "var(--fg-40)" }}>
            <span style={{ color: "var(--fg)" }}>{String(activeIdx + 1).padStart(2, "0")}</span>
            <span className="h-px w-8" style={{ background: "var(--fg-15)" }} />
            <span>{String(projects.length).padStart(2, "0")}</span>
          </div>
          {/* Carousel dot track with per-project color */}
          <div className="flex items-center gap-1.5 h-1.5">
            {projects.map((p, i) => {
              const isActive = i === activeIdx;
              return (
                <motion.div
                  key={p.id}
                  className="rounded-full"
                  animate={{
                    width: isActive ? 20 : 6,
                    backgroundColor: isActive ? p.color : "var(--fg-15)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => scrollToIdx(activeIdx - 1)}
            disabled={activeIdx === 0}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
            style={{ border: "1px solid var(--border-card)", color: "var(--fg)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 8H3M7 13L2 8l5-5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => scrollToIdx(activeIdx + 1)}
            disabled={activeIdx === projects.length - 1}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
            style={{ border: "1px solid var(--accent)", color: "var(--accent)", background: "rgba(var(--accent-rgb),0.08)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 3l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
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
        Drag · Swipe · ← →
      </motion.p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MAIN EXPORT — unified carousel of all projects
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

  // Case studies first, then Behance — preserves a sensible narrative order
  const filtered = useMemo(() => {
    const base = activeCat === "All"
      ? allProjects
      : allProjects.filter((p) => bucketOf(p.category) === activeCat);
    return [...base].sort((a, b) => Number(b.hasCaseStudy) - Number(a.hasCaseStudy));
  }, [activeCat]);

  return (
    <section className="font-montserrat relative" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="px-6 lg:px-12">
          <ProjectsIntro />

          {/* Scroll anchor — clicking "Work" in the floating nav lands the viewport here,
              with the filter chips and carousel framed in view (not the big "Portfolio" intro). */}
          <div id="projects" className="scroll-mt-28" />

          {/* Filter chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => {
              const active = cat === activeCat;
return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCat(cat)}
                  className="relative rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[2px] transition-colors"
                  style={{
                    color: active ? "var(--bg-primary)" : "var(--fg-60)",
                    background: active ? "var(--accent)" : "transparent",
                    border: "1px solid var(--border-card)",
                  }}
                >
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel — key on activeCat forces remount + resets scroll position */}
        {filtered.length > 0 ? (
          <ProjectsCarousel key={activeCat} projects={filtered} />
        ) : (
          <p className="text-center py-20 text-[13px]" style={{ color: "var(--fg-30)" }}>
            No projects in this category.
          </p>
        )}

        <div className="mb-24" />
      </div>
    </section>
  );
}
