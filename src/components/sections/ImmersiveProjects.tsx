"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
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

  const handleClick = () => {
    if (project.hasCaseStudy) {
      router.push(`/projects/${project.id}`);
    } else if (project.behanceUrl) {
      window.open(project.behanceUrl, "_blank");
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      {/* Full-width cover image */}
      <div
        className="relative aspect-[16/9] lg:aspect-[2.2/1] rounded-2xl lg:rounded-3xl overflow-hidden border transition-all duration-500 group-hover:shadow-[0_8px_60px_-12px_rgba(0,0,0,0.5)]"
        style={{ borderColor: `${project.color}15`, background: `linear-gradient(135deg, ${project.color}20, ${project.color}08)` }}
      >
        <Image
          src={project.cover}
          alt={`${project.title} — ${project.subtitle}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 1200px"
          loading={index < 2 ? undefined : "lazy"}
          priority={index < 2}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />

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
        className="text-[13px] lg:text-[14px] leading-[1.8] mt-4 lg:mt-5 max-w-[700px]"
        style={{ color: "var(--fg-40)" }}
      >
        {project.description}
      </p>
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
  return (
    <section id="projects" className="font-montserrat" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <ProjectsIntro />

        {/* Featured Case Studies */}
        <div className="flex flex-col gap-16 lg:gap-24 pb-20 lg:pb-28">
          {caseStudyProjects.map((project, i) => (
            <div key={project.id} id={`project-${project.id}`}>
              <FeaturedProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

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
