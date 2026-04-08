"use client";
import React, { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence, LayoutGroup } from "framer-motion";
import { projectsData } from "@/lib/projects";

/* ── Build project list ── */
const caseStudyProjects = projectsData
  .filter((p) => !p.hidden && p.caseStudy && p.caseStudy.length > 0)
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
    behanceUrl: p.behanceUrl,
    hasCaseStudy: true,
  }));

const behanceProjects = projectsData
  .filter((p) => !p.hidden && !(p.caseStudy && p.caseStudy.length > 0) && p.behanceUrl)
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
    behanceUrl: p.behanceUrl,
    hasCaseStudy: false,
  }));

type Project = typeof caseStudyProjects[0];

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ──────────────────────────────────────────────────────────────
   FEATURED PROJECT CARD — full-width image-dominant card
────────────────────────────────────────────────────────────── */
function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Parallax: cover image drifts as card scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const coverY = useSpring(rawY, { stiffness: 120, damping: 30, mass: 0.3 });

  const handleClick = () => {
    if (project.hasCaseStudy) {
      router.push(`/projects/${project.id}`);
    } else if (project.behanceUrl) {
      window.open(project.behanceUrl, "_blank");
    }
  };
  const handleHoverPrefetch = () => {
    if (project.hasCaseStudy) router.prefetch(`/projects/${project.id}`);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay: (index % 3) * 0.08 }}
      layout
      className="group cursor-pointer [content-visibility:auto] [contain-intrinsic-size:800px]"
      onClick={handleClick}
      onMouseEnter={handleHoverPrefetch}
    >
      {/* Tinted MedDrop-style outer panel */}
      <div
        className="relative rounded-[32px] p-3 lg:p-5 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]"
        style={{
          background: `linear-gradient(135deg, ${project.color}1f, ${project.color}06)`,
          border: `1px solid ${project.color}1a`,
        }}
      >
        {/* Watermark number */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-4 right-6 lg:top-6 lg:right-10 font-montserrat font-black select-none"
          style={{
            fontSize: "clamp(60px, 9vw, 140px)",
            color: project.color,
            opacity: 0.08,
            lineHeight: 1,
          }}
        >
          {project.number}
        </span>

      {/* Full-width cover image */}
      <div
        className="relative aspect-[16/9] lg:aspect-[2.2/1] rounded-2xl lg:rounded-[24px] overflow-hidden transition-all duration-500"
        style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}08)` }}
      >
        <motion.div className="absolute inset-[-6%]" style={{ y: coverY }}>
          <Image
            src={project.cover}
            alt={`${project.title} — ${project.subtitle}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 1200px"
            loading={index < 2 ? undefined : "lazy"}
            priority={index < 2}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </motion.div>

        {/* Gradient overlay — fades into section background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 30%, ${project.color}08 50%, rgba(var(--vignette-rgb),0.8) 80%, rgba(var(--vignette-rgb),0.93) 100%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, rgba(var(--vignette-rgb),0.73) 0%, transparent 50%)`,
          }}
        />

        {/* Content overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          {/* Left — title + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-[10px] font-bold uppercase tracking-[4px]"
                style={{ color: project.color }}
              >
                {project.number}
              </span>
              <div className="h-px w-4" style={{ background: `${project.color}60` }} />
              <span className="text-[10px] font-semibold uppercase tracking-[3px]" style={{ color: "var(--fg-40)" }}>
                {project.category}
              </span>
            </div>
            <h3
              className="font-montserrat font-bold leading-[1.05]"
              style={{ fontSize: "clamp(24px, 3.5vw, 48px)", color: "var(--fg)" }}
            >
              {project.title}
            </h3>
            <p className="mt-1" style={{ fontSize: "clamp(13px, 1.2vw, 18px)", color: "var(--fg-30)" }}>
              {project.subtitle}
            </p>
            {/* Tags — desktop only */}
            <div className="hidden lg:flex flex-wrap gap-2 mt-3">
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="text-[10px] uppercase tracking-[1.5px]" style={{ color: "var(--fg-20)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — CTA */}
          <div className="shrink-0">
            <span
              className="inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-[10px] lg:text-[11px] font-semibold uppercase tracking-[3px] backdrop-blur-md transition-all duration-300 group-hover:gap-4"
              style={{
                color: "white",
                borderColor: `${project.color}30`,
                background: `${project.color}15`,
              }}
            >
              View Project
              <svg
                width="14" height="14" viewBox="0 0 16 16" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M3 8h10M9 3l5 5-5 5" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Description below image */}
      <p
        className="text-[13px] lg:text-[14px] leading-[1.8] mt-4 lg:mt-5 max-w-[700px] px-2 lg:px-3"
        style={{ color: "var(--fg-40)" }}
      >
        {project.description}
      </p>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   BEHANCE PROJECT CARD — compact grid card for external projects
────────────────────────────────────────────────────────────── */
function BehanceCard({ project }: { project: Project }) {
  return (
    <a
      href={project.behanceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-2xl overflow-hidden transition-all duration-400"
      style={{
        border: "1px solid var(--fg-05)",
        background: "var(--fg-05)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(var(--accent-rgb),0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--fg-05)";
      }}
    >
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden" style={{ background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)` }}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: "linear-gradient(to top, var(--bg-primary), transparent)",
          }}
        />
        {/* Category badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] tracking-[1px] uppercase backdrop-blur-md border"
          style={{
            color: project.color,
            borderColor: `${project.color}25`,
            background: `${project.color}10`,
          }}
        >
          {project.category}
        </span>
        {/* External arrow */}
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12L12 4M12 4H6M12 4v6" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h4
          className="text-[15px] font-semibold leading-tight transition-colors duration-300"
          style={{ color: "var(--fg)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
        >
          {project.title}
        </h4>
        <p className="text-[12px] leading-relaxed line-clamp-2 mt-1.5" style={{ color: "var(--fg-30)" }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] tracking-[0.5px]" style={{ color: "var(--fg-20)" }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

/* ──────────────────────────────────────────────────────────────
   SECTION INTRO
────────────────────────────────────────────────────────────── */
function ProjectsIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="text-center pt-24 lg:pt-32 pb-12 lg:pb-16">
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
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="w-12 h-px mt-5 mx-auto origin-center"
        style={{ background: "var(--fg-15)" }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MAIN EXPORT — unified project section (always dark background)
────────────────────────────────────────────────────────────── */
export default function ImmersiveProjects() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progressScale = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  // Filter chips — derive categories from project data
  const categories = useMemo(() => {
    const set = new Set<string>();
    caseStudyProjects.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, []);
  const [activeCat, setActiveCat] = useState("All");
  const filtered = useMemo(
    () => (activeCat === "All" ? caseStudyProjects : caseStudyProjects.filter((p) => p.category === activeCat)),
    [activeCat]
  );

  // Keyboard nav: J/K between projects, Enter/→ to open, filter with 1..9
  const [focused, setFocused] = useState(0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        setFocused((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        setFocused((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" || e.key === "ArrowRight") {
        const p = filtered[focused];
        if (p?.hasCaseStudy) router.push(`/projects/${p.id}`);
        else if (p?.behanceUrl) window.open(p.behanceUrl, "_blank");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, focused, router]);

  useEffect(() => {
    const el = document.getElementById(`project-${filtered[focused]?.id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [focused, filtered]);

  return (
    <section ref={sectionRef} id="projects" className="font-montserrat relative" style={{ background: "var(--bg-primary)" }}>
      {/* Reading-progress rail */}
      <motion.div
        className="sticky top-0 left-0 right-0 h-[2px] origin-left z-40"
        style={{ scaleX: progressScale, background: "var(--accent)" }}
      />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <ProjectsIntro />

        {/* Status pill */}
        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[2px]"
            style={{ border: "1px solid rgba(61,155,155,0.35)", background: "rgba(61,155,155,0.08)", color: "#3D9B9B" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3D9B9B] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3D9B9B]" />
            </span>
            Currently at Oxford University Press
          </span>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const active = cat === activeCat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => { setActiveCat(cat); setFocused(0); }}
                className="relative rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[2px] transition-colors"
                style={{
                  color: active ? "var(--bg-primary)" : "var(--fg-60)",
                  border: "1px solid var(--border-card)",
                }}
              >
                {active && (
                  <motion.span
                    layoutId="filter-chip-active"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--accent)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Case Studies */}
        <LayoutGroup>
          <div className="flex flex-col gap-16 lg:gap-24 pb-20 lg:pb-28">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  id={`project-${project.id}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className={focused === i ? "ring-1 ring-[#3D9B9B]/30 rounded-[32px]" : ""}
                >
                  <FeaturedProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>

        {/* Behance Projects */}
        {behanceProjects.length > 0 && (
          <div className="pb-20 lg:pb-28">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1" style={{ background: "var(--fg-06)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[4px] shrink-0"
                style={{ color: "var(--fg-20)" }}
              >
                More Projects
              </span>
              <div className="h-px flex-1" style={{ background: "var(--fg-06)" }} />
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {behanceProjects.map((project) => (
                <motion.div key={project.id} variants={fadeUp}>
                  <BehanceCard project={project} />
                </motion.div>
              ))}
            </motion.div>

            {/* View all on Behance */}
            <div className="text-center mt-12">
              <a
                href="https://www.behance.net/artlabsoudan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-[12px] tracking-[2px] uppercase transition-all duration-300"
                style={{
                  border: "1px solid rgba(var(--accent-rgb),0.2)",
                  color: "var(--accent)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(var(--accent-rgb),0.1)";
                  el.style.borderColor = "rgba(var(--accent-rgb),0.4)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.borderColor = "rgba(var(--accent-rgb),0.2)";
                }}
              >
                View all on Behance
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12L12 4M12 4H6M12 4v6" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
