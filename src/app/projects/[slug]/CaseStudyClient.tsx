"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ProjectDetail, CaseStudySection, ImageRef, ScreenItem } from "@/lib/projects";
import { useTheme } from "@/contexts/ThemeContext";

/* Resolve ImageRef to {src, alt, darkSrc?} */
function resolveImage(img: ImageRef, fallbackAlt = ""): { src: string; alt: string; darkSrc?: string } {
  if (typeof img === "string") return { src: img, alt: fallbackAlt };
  return { src: img.src, alt: img.alt, darkSrc: (img as { src: string; alt: string; darkSrc?: string }).darkSrc };
}

/* ─── helpers ─── */
/* Safe Image — hides broken images gracefully */
function SafeImage(props: React.ComponentProps<typeof Image>) {
  return (
    <Image
      {...props}
      onError={(e) => {
        const img = e.currentTarget as HTMLImageElement;
        img.style.display = "none";
      }}
    />
  );
}

function cls(...args: (string | undefined | false | null)[]): string {
  return args.filter(Boolean).join(" ");
}

function sectionBg(bg?: string) {
  if (bg === "light") return "cs-section-light";
  if (bg === "accent") return "cs-section-accent";
  return "cs-section-default";
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section label ─── */
function SectionLabel({ label, color }: { label?: string; color: string }) {
  if (!label) return null;
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-px" style={{ background: color }} />
      <span
        className="text-[9px] font-semibold uppercase tracking-[2px]"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Section heading ─── */
function SectionHeading({ heading }: { heading?: string }) {
  if (!heading) return null;
  return (
    <h2 className="font-montserrat font-bold [color:var(--fg)] mb-10 text-2xl lg:text-4xl leading-tight">
      {heading}
    </h2>
  );
}

/* ─── TL;DR ─── */
function TldrSection({ section, color }: { section: CaseStudySection; color: string }) {
  return (
    <section className={cls("py-16 lg:py-24 border-t [border-color:var(--border-subtle)]", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          {section.bullets && (
            <ul className="space-y-4">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  <p className="[color:var(--fg-60)] text-base leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Text section ─── */
function TextSection({ section, color }: { section: CaseStudySection; color: string }) {
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-3xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          {section.body && (
            <p className="[color:var(--fg-60)] text-base lg:text-lg leading-relaxed">{section.body}</p>
          )}
          {section.bullets && (
            <ul className="space-y-3 mt-4">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  <p className="[color:var(--fg-60)] leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Image section ─── */
function ImageSection({ section, color }: { section: CaseStudySection; color: string }) {
  if (!section.image) return null;
  return (
    <section className={cls("py-12 lg:py-16", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          {section.heading && <SectionHeading heading={section.heading} />}
          <div className="relative rounded-2xl overflow-hidden">
            <SafeImage
              src={resolveImage(section.image!).src}
              alt={section.caption || section.heading || "Case study image"}
              width={1200}
              height={700}
              className="w-full object-cover"
            />
          </div>
          {section.caption && (
            <p className="[color:var(--fg-30)] text-sm mt-3 text-center">{section.caption}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Full-width image ─── */
function FullwidthImageSection({ section, color, onImageClick }: { section: CaseStudySection; color: string; onImageClick?: (src: string) => void }) {
  if (!section.image) return null;
  const src = resolveImage(section.image!).src;
  return (
    <section className={cls("py-12", sectionBg(section.bg))}>
      <Reveal>
        <SectionLabel label={section.label} color={color} />
        <div className="max-w-6xl mx-auto px-6 lg:px-0">
          <button
            type="button"
            onClick={() => onImageClick?.(src)}
            className="block w-full rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
          >
            <SafeImage
              src={src}
              alt={section.caption || "Full width image"}
              width={2400}
              height={900}
              className="w-full h-auto block"
            />
          </button>
        </div>
        {section.caption && (
          <p className="[color:var(--fg-30)] text-sm mt-3 text-center px-6">{section.caption}</p>
        )}
      </Reveal>
    </section>
  );
}

/* ─── Split section ─── */
function SplitSection({ section, color, onImageClick }: { section: CaseStudySection; color: string; onImageClick?: (src: string) => void }) {
  const splitSrc = section.image ? resolveImage(section.image).src : null;
  return (
    <section className={cls("py-8 lg:py-12", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {section.image && (
              <div
                className="w-full lg:w-3/5 relative rounded-2xl overflow-hidden shrink-0 cursor-pointer transition-all duration-500 hover:shadow-2xl group/img"
                onClick={() => splitSrc && onImageClick?.(splitSrc)}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                }}
              >
                <div className="p-4 lg:p-6 flex items-center justify-center min-h-[260px] lg:min-h-[380px]">
                  <SafeImage
                    src={splitSrc!}
                    alt={typeof section.image === "string" ? (section.caption || section.heading || "") : (section.image?.alt || section.caption || section.heading || "")}
                    width={800}
                    height={600}
                    className="w-full h-auto max-h-[320px] lg:max-h-[360px] object-contain block drop-shadow-xl transition-transform duration-700 group-hover/img:scale-105"
                  />
                </div>
                {section.caption && (
                  <div className="absolute bottom-4 left-0 right-0">
                    <p className="[color:var(--fg-20)] text-[9px] uppercase tracking-[3px] text-center">{section.caption}</p>
                  </div>
                )}
              </div>
            )}
            <div className="w-full lg:w-2/5 pt-4">
              <SectionLabel label={section.label} color={color} />
              <h4 className="font-montserrat font-bold [color:var(--fg)] text-lg lg:text-xl leading-tight mb-4">
                {section.heading}
              </h4>
              {section.body && (
                <p className="[color:var(--fg-50)] text-sm leading-relaxed antialiased">
                  {section.body}
                </p>
              )}
              {section.bullets && (
                <ul className="space-y-2.5 mt-6">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                        style={{ background: color }}
                      />
                      <p className="[color:var(--fg-50)] text-[13px] leading-snug">{b}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Stats section ─── */
function StatsSection({ section, color }: { section: CaseStudySection; color: string }) {
  return (
    <section className={cls("py-16 lg:py-24 border-t border-b [border-color:var(--border-subtle)]", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <SectionLabel label={section.label} color={color} />
            <SectionHeading heading={section.heading} />
            {section.caption && (
              <p className="text-sm font-medium tracking-wide opacity-70 mb-10 mt-[-1rem]">{section.caption}</p>
            )}
            {section.stats && (
              <div className="flex flex-wrap justify-center gap-x-16 gap-y-10 text-center w-full">
                {section.stats.map((s, i) => (
                  <div key={i} className="flex flex-col items-center min-w-[140px] max-w-[220px]">
                    <div
                      className={cls("font-montserrat font-bold mb-2", s.value.length > 6 ? "text-2xl lg:text-3xl" : "text-4xl lg:text-5xl")}
                      style={{ color }}
                    >
                      {s.value}
                    </div>
                    <div className="[color:var(--fg-60)] text-sm">{s.label}</div>
                    {s.note && <div className="[color:var(--fg-30)] text-xs mt-1">{s.note}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Quote section ─── */
function QuoteSection({ section, color }: { section: CaseStudySection; color: string }) {
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-3xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          {section.quote && (
            <blockquote
              className="font-montserrat font-bold text-2xl lg:text-3xl [color:var(--fg)] leading-snug border-l-2 pl-6"
              style={{ borderColor: color }}
            >
              &ldquo;{section.quote}&rdquo;
            </blockquote>
          )}
          {section.attribution && (
            <p className="[color:var(--fg-40)] text-sm mt-4 pl-6">{section.attribution}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Timeline section ─── */
function TimelineSection({ section, color }: { section: CaseStudySection; color: string }) {
  if (!section.timelineSteps) return null;
  const steps = section.timelineSteps;
  
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-6xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          
          {/* Desktop: horizontal timeline with inline connector segments */}
          <div className="hidden lg:flex items-start mt-12">
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                {/* Timeline card with integrated dot */}
                <div className="flex flex-col items-center flex-1 min-w-0">
                  {/* Dot - part of the card, not separate */}
                  <div 
                    className="w-3 h-3 rounded-full mb-4 shrink-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                      boxShadow: `0 0 12px ${color}60`
                    }}
                  />
                  {/* Card content */}
                  <div className="text-center px-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[2px]" style={{ color }}>
                      {step.phase}
                    </div>
                    <div className="font-montserrat font-bold [color:var(--fg)]text-sm leading-tight mt-1">
                      {step.title}
                    </div>
                    <div className="[color:var(--fg-40)] text-xs leading-relaxed mt-1">
                      {step.description}
                    </div>
                  </div>
                </div>
                
                {/* Connector line BETWEEN items only - regular div, no absolute positioning */}
                {i < steps.length - 1 && (
                  <div 
                    className="w-16 h-[2px] shrink-0 mt-[6px]"
                    style={{ 
                      background: `linear-gradient(90deg, ${color}80, ${color}40)`
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="lg:hidden relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-3 bottom-3 w-[2px] [background:var(--fg-10)]" />
            {/* Timeline items */}
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div 
                  key={i} 
                  className="relative flex gap-4"
                >
                  {/* Dot */}
                  <div className="absolute left-0 -translate-x-1/2 z-10 mt-1.5">
                    <div 
                      className="absolute inset-0 rounded-full blur-md opacity-40" 
                      style={{ background: color }}
                    />
                    <div 
                      className="relative w-2.5 h-2.5 rounded-full border-2 [border-color:var(--fg-70)]"
                      style={{ 
                        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                        boxShadow: `0 0 10px ${color}60` 
                      }} 
                    />
                  </div>
                  {/* Content */}
                  <div className="flex-1 rounded-xl border [border-color:var(--fg-08)] [background:var(--fg-05)] p-4">
                    <div className="text-[10px] font-semibold uppercase tracking-[2px]" style={{ color }}>
                      {step.phase}
                    </div>
                    <div className="font-montserrat font-bold [color:var(--fg)]text-sm leading-tight mt-1">
                      {step.title}
                    </div>
                    <div className="[color:var(--fg-40)] text-xs leading-relaxed mt-1">
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Research chart section ─── */
function ResearchChartSection({ section, color }: { section: CaseStudySection; color: string }) {
  const max = Math.max(...(section.chartItems?.map((c) => c.value) ?? [100]));
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          {section.chartItems && (
            <div className="space-y-5 mt-6">
              {section.chartItems.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm [color:var(--fg-60)] mb-1.5">
                    <span>{item.label}</span>
                    <span style={{ color }}>{item.value}%</span>
                  </div>
                  <div className="h-1.5 [background:var(--fg-10)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.value / max) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  {item.note && (
                    <p className="[color:var(--fg-30)] text-xs mt-1">{item.note}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Video section ─── */
function VideoSection({ section, color }: { section: CaseStudySection; color: string }) {
  if (!section.videoSrc) return null;
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          <div className="relative rounded-2xl overflow-hidden aspect-video [background:var(--bg-surface)]">
            <video
              src={section.videoSrc}
              controls
              className="w-full h-full object-cover"
            />
          </div>
          {section.caption && (
            <p className="[color:var(--fg-30)] text-sm mt-3 text-center">{section.caption}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Browser frame section ─── */
function BrowserFrameSection({ section, color }: { section: CaseStudySection; color: string }) {
  if (!section.image) return null;
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          <div
            className="rounded-2xl overflow-hidden border [border-color:var(--border-card)]"
            style={{
              boxShadow:
                "0 25px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px var(--border-subtle)",
            }}
          >
            {/* Browser chrome */}
            <div className="[background:var(--bg-surface)] px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full [background:var(--fg-10)]" />
                <div className="w-3 h-3 rounded-full [background:var(--fg-10)]" />
                <div className="w-3 h-3 rounded-full [background:var(--fg-10)]" />
              </div>
              <div className="flex-1 mx-4">
                <div className="[background:var(--fg-05)] rounded-md h-5 px-3 flex items-center">
                  <span className="[color:var(--fg-20)] text-[10px]">oxfordenglishhub.com</span>
                </div>
              </div>
            </div>
            <SafeImage
              src={resolveImage(section.image!).src}
              alt={section.caption || "Browser frame"}
              width={1200}
              height={700}
              className="w-full"
            />
          </div>
          {section.caption && (
            <p className="[color:var(--fg-30)] text-sm mt-3 text-center">{section.caption}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Showcase section ─── */
function ShowcaseSection({ section, color }: { section: CaseStudySection; color: string }) {
  if (!section.image) return null;
  const src = resolveImage(section.image!).src;
  const alt = section.caption || section.heading || "Showcase";

  // SVG crop: CSS-based viewport into a larger SVG using cropViewBox "x y w h"
  if (section.cropViewBox && section.svgNaturalWidth && section.svgNaturalHeight) {
    const [cx, cy, cw, ch] = section.cropViewBox.split(" ").map(Number);
    const { svgNaturalWidth: svgW, svgNaturalHeight: svgH } = section;
    const imgWidthPct = (svgW / cw) * 100;
    const leftPct = -(cx / cw) * 100;
    const topPct = -(cy / ch) * 100;
    return (
      <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
        <div className="max-w-5xl mx-auto px-6 lg:px-0">
          <Reveal>
            <SectionLabel label={section.label} color={color} />
            <SectionHeading heading={section.heading} />
            {section.body && (
              <p className="[color:var(--fg-60)] leading-relaxed mb-8">{section.body}</p>
            )}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                aspectRatio: `${cw} / ${ch}`,
                background: section.showcaseBg || "var(--bg-secondary)",
                boxShadow: "0 25px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px var(--border-subtle)",
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                style={{
                  position: "absolute",
                  width: `${imgWidthPct}%`,
                  height: "auto",
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                }}
              />
            </div>
            {section.caption && (
              <p className="[color:var(--fg-30)] text-sm mt-3 text-center">{section.caption}</p>
            )}
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: section.showcaseBg || "var(--bg-secondary)",
              boxShadow:
                "0 25px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px var(--border-subtle)",
            }}
          >
            <SafeImage
              src={src}
              alt={alt}
              width={1200}
              height={800}
              className="block w-full h-auto"
            />
          </div>
          {section.caption && (
            <p className="[color:var(--fg-30)] text-sm mt-3 text-center">{section.caption}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Screen gallery ─── */
function ScreenGallerySection({ section, color, onImageClick }: { section: CaseStudySection; color: string; onImageClick?: (src: string) => void }) {
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          {section.screens && (
            <div
              className={`grid gap-4 ${
                section.columns === 3
                  ? "grid-cols-1 sm:grid-cols-3"
                  : section.columns === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {section.screens.map((screen, i) => {
                const resolved = typeof screen === 'string'
                  ? { src: screen, alt: `Screen ${i + 1}` }
                  : 'image' in (screen as { image?: ImageRef; label?: string })
                  ? (() => {
                      const s = screen as { image: ImageRef; label?: string };
                      const img = typeof s.image === 'string' ? { src: s.image, alt: s.label || `Screen ${i + 1}` } : s.image;
                      return { src: img.src, alt: img.alt, label: s.label };
                    })()
                  : { src: (screen as { src: string; alt: string }).src, alt: (screen as { src: string; alt: string }).alt };
                const frameBg = section.showcaseBg;
                const label = ('label' in resolved) ? resolved.label : undefined;
                return (
                  <div key={i} className="flex flex-col gap-2">
                    <div
                      className="relative rounded-xl overflow-hidden border cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6)]"
                      style={{
                        background: frameBg || "var(--bg-secondary)",
                        borderColor: frameBg ? "rgba(0,0,0,0.07)" : "var(--fg-08)",
                      }}
                      onClick={() => onImageClick?.(resolved.src)}
                    >
                      <SafeImage
                        src={resolved.src}
                        alt={resolved.alt}
                        width={1200}
                        height={900}
                        className="block w-full h-auto"
                      />
                    </div>
                    {label && (
                      <p className="[color:var(--fg-40)] text-xs text-center font-medium px-1">{label}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Reflection section ─── */
function ReflectionSection({ section, color }: { section: CaseStudySection; color: string }) {
  return (
    <section className={cls("py-16 lg:py-24 border-t [border-color:var(--border-subtle)]", sectionBg(section.bg))}>
      <div className="max-w-3xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          {section.body && (
            <p className="[color:var(--fg-60)] text-lg leading-relaxed">{section.body}</p>
          )}
          {section.bullets && (
            <ul className="space-y-4 mt-6">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  <p className="[color:var(--fg-60)] leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Process step ─── */
function ProcessStepSection({ section, color }: { section: CaseStudySection; color: string }) {
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <div className="flex gap-6">
            {section.stepNumber && (
              <div
                className="font-montserrat font-bold text-6xl shrink-0 leading-none"
                style={{ color: `${color}20` }}
              >
                {String(section.stepNumber).padStart(2, "0")}
              </div>
            )}
            <div>
              <SectionLabel label={section.label} color={color} />
              <SectionHeading heading={section.heading} />
              {section.body && (
                <p className="[color:var(--fg-60)] leading-relaxed">{section.body}</p>
              )}
              {section.bullets && (
                <ul className="space-y-3 mt-4">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-2 w-1 h-1 rounded-full shrink-0"
                        style={{ background: color }}
                      />
                      <p className="[color:var(--fg-60)] text-sm leading-relaxed">{b}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {section.image && (
            <div className="mt-8 relative rounded-2xl overflow-hidden">
              <SafeImage
                src={resolveImage(section.image!).src}
                alt={typeof section.image === "string" ? (section.caption || section.heading || "") : (section.image?.alt || section.caption || section.heading || "")}
                width={1200}
                height={700}
                className="w-full"
              />
              {section.caption && (
                <p className="[color:var(--fg-30)] text-sm mt-2 text-center">{section.caption}</p>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Image pair ─── */
function ImagePairSection({ section, color }: { section: CaseStudySection; color: string }) {
  return (
    <section className={cls("py-12 lg:py-16", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.image && (
              <div>
                <div className="relative rounded-2xl overflow-hidden">
                  <SafeImage
                    src={resolveImage(section.image!).src}
                    alt={section.caption || "Image 1"}
                    width={700}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
                {section.caption && (
                  <p className="[color:var(--fg-30)] text-xs mt-2 text-center">{section.caption}</p>
                )}
              </div>
            )}
            {section.image2 && (
              <div>
                <div className="relative rounded-2xl overflow-hidden">
                  <SafeImage
                    src={resolveImage(section.image2!).src}
                    alt={section.caption2 || "Image 2"}
                    width={700}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
                {section.caption2 && (
                  <p className="[color:var(--fg-30)] text-xs mt-2 text-center">{section.caption2}</p>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Lean UX canvas ─── */
function LeanUXCanvasSection({ section, color }: { section: CaseStudySection; color: string }) {
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          {section.body && <p className="[color:var(--fg-60)] text-base mb-8">{section.body}</p>}
          {section.image && (
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#ffffff",
                boxShadow: "0 24px 64px -12px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.06)",
              }}
            >
              <SafeImage
                src={resolveImage(section.image).src}
                alt={resolveImage(section.image).alt}
                width={1200}
                height={800}
                className="w-full"
              />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Role Matrix ─── */
function RoleMatrixSection({ section, color }: { section: CaseStudySection; color: string }) {
  const roles = [
    { role: "Students", color: "#6366f1", items: ["See [My Tasks] in Assessment Orgs", "Must be explicitly invited", "No cross-org visibility"] },
    { role: "Org Admin", color: "#8b5cf6", items: ["Invite staff only (not students)", "See [Sessions] tab", "No cross-org view"] },
    { role: "Class Admin", color: "#06b6d4", items: ["Invited via wizard", "Invited via My Org Staff", "Bridge between both"] },
  ];
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {roles.map((r, i) => (
              <div key={i} className="rounded-xl border p-5" style={{ borderColor: r.color + '40', background: r.color + '10' }}>
                <div className="font-bold [color:var(--fg)] mb-3">{r.role}</div>
                <ul className="space-y-2">
                  {r.items.map((item, j) => (
                    <li key={j} className="[color:var(--fg-70)] text-sm flex gap-2">
                      <span style={{ color: r.color }}>•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {section.caption && <p className="[color:var(--fg-30)] text-sm mt-4 text-center">{section.caption}</p>}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Constraint Notes (UI Solid Color Frames) ─── */
function ConstraintNotesSection({ section, color }: { section: CaseStudySection; color: string }) {
  const notes = [
    { title: "OPT Data Scoping", desc: "Each org shows only its own data", icon: "◈" },
    { title: "Cross-Org Sharing", desc: "Only when student is member of both orgs", icon: "◈" },
    { title: "Teacher Visibility", desc: "Only see results for students in their orgs", icon: "◈" },
  ];
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {notes.map((note, i) => (
              <div 
                key={i} 
                className="rounded-xl p-5 border transition-all duration-300 hover:[border-color:var(--fg-20)]"
                style={{ 
                  borderColor: color + '30',
                  background: `linear-gradient(135deg, ${color}08, ${color}12)`,
                  boxShadow: `0 4px 20px -4px ${color}20`
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color }}>{note.icon}</span>
                  <div className="font-semibold [color:var(--fg)]text-sm">{note.title}</div>
                </div>
                <p className="[color:var(--fg-60)] text-xs leading-relaxed pl-5">{note.desc}</p>
              </div>
            ))}
          </div>
          {section.caption && <p className="[color:var(--fg-30)] text-sm mt-4 text-center">{section.caption}</p>}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── User Role Matrix — native rebuild of the sticky-note board ─── */
function UserRoleMatrixSection({ section, color }: { section: CaseStudySection; color: string }) {
  const columns: Array<{
    role: string;
    tone: { tint: string; border: string; chip: string; accent: string };
    notes: Array<{ scope: string; text: string }>;
  }> = [
    {
      role: "Students",
      tone: { tint: "rgba(251, 191, 36, 0.10)", border: "rgba(251, 191, 36, 0.35)", chip: "rgba(251, 191, 36, 0.18)", accent: "#f59e0b" },
      notes: [
        { scope: "My Tasks", text: "Students can only see [My Tasks] in Assessment Orgs." },
        { scope: "Invitation", text: "Have to be invited to join an Assessment Org separately, even if both Orgs are owned by the same admin." },
        { scope: "Dashboard", text: "See a different empty-state message depending on the Org type." },
        { scope: "Dashboard", text: "See a [My Tasks] container in their Assessment Org dashboard alongside [Last Opened] and [WOTD] in their T&L Org." },
        { scope: "Dashboard", text: "Have to click the [Profile] button and toggle between Orgs through a dropdown." },
        { scope: "My Courses", text: "Owned learning materials are present across all Orgs owned by different or the same admin." },
        { scope: "My Progress", text: "Can see all their progress data across all Orgs when logged in to any of them." },
      ],
    },
    {
      role: "Org Admin",
      tone: { tint: "rgba(56, 189, 248, 0.10)", border: "rgba(56, 189, 248, 0.35)", chip: "rgba(56, 189, 248, 0.18)", accent: "#38bdf8" },
      notes: [
        { scope: "Org Creation Wizard", text: "Org Admins can only invite staff, not students, due to licensing rules." },
        { scope: "Dashboard", text: "Org Admins see a [Sessions] tab on their Assessment Org dashboard instead of [My Classes]." },
        { scope: "Progress", text: "Can see class progress in T&L Orgs, and OPT progress in Assessment Orgs only via My Org > Placement Tests." },
        { scope: "My Org", text: "Draft, active, upcoming and completed OPT sessions can be viewed after creation in a tab inside [My Org] called [Placement Tests]." },
        { scope: "My Org", text: "Available actions: Continue setup (Draft), View session info (All), Manage session (active/upcoming/completed), Copy joining code (active/upcoming), View progress (active), View results (completed), Download report card (completed)." },
        {
          scope: "Control",
          text: "Can: add students/teachers, import access codes, give a teacher Class Admin role, rename and edit org info, hand off Org Admin role, create classes, add students/teachers/materials to classes, edit class details and remove members.",
        },
      ],
    },
    {
      role: "Class Admin",
      tone: { tint: "rgba(74, 222, 128, 0.10)", border: "rgba(74, 222, 128, 0.35)", chip: "rgba(74, 222, 128, 0.18)", accent: "#4ade80" },
      notes: [
        { scope: "Dashboard", text: "Class Admins can be invited to an Assessment Org through the Org creation wizard or within My Org > Staff." },
        { scope: "Dashboard", text: "See a [Sessions] tab on their Assessment Org dashboard instead of [My Classes]." },
        { scope: "Progress", text: "Can see class progress in T&L Orgs and OPT progress in Assessment Orgs only via My Org > Placement Tests." },
        { scope: "My Org", text: "Draft, active, upcoming and completed OPT sessions can be viewed after creation in a tab inside [My Org] called [Placement Tests]." },
        { scope: "My Org", text: "Available actions: Continue setup (Draft), View session info (All), Manage session (active/upcoming/completed), Copy joining code (active/upcoming), View progress (active), View results (completed), Download report card (completed)." },
        {
          scope: "Control",
          text: "Can: create classes, add students/teachers/materials to any class, remove members and materials, rename classes and view student progress. Cannot: add teachers to the org, remove members from the org, import access codes, change org info, hand off Org/Class Admin role, or edit student/teacher profiles. Only the Org Admin can do those.",
        },
      ],
    },
  ];

  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-6xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 items-start">
            {columns.map((col, ci) => (
              <div
                key={ci}
                className="rounded-3xl p-5 border self-start"
                style={{ background: col.tone.tint, borderColor: col.tone.border }}
              >
                <div
                  className="font-montserrat font-bold text-base text-center py-2 px-4 rounded-full mb-4"
                  style={{ background: col.tone.chip, color: "var(--fg)" }}
                >
                  {col.role}
                </div>
                <div className="flex flex-col gap-3">
                  {col.notes.map((note, ni) => (
                    <div
                      key={ni}
                      className="rounded-2xl p-4 border"
                      style={{
                        background: "var(--bg-secondary)",
                        borderColor: "var(--border-card)",
                      }}
                    >
                      <div
                        className="text-[10px] uppercase tracking-[0.12em] font-semibold mb-1"
                        style={{ color: col.tone.accent }}
                      >
                        {note.scope}
                      </div>
                      <p className="[color:var(--fg-70)] text-sm leading-relaxed">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {section.caption && (
            <p className="[color:var(--fg-30)] text-sm mt-6 text-center">{section.caption}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Possible Solutions — native rebuild of the ideation sticky-note board ─── */
function PossibleSolutionsSection({ section, color }: { section: CaseStudySection; color: string }) {
  const columns: Array<{
    role: string;
    tone: { tint: string; border: string; chip: string; accent: string };
    notes: Array<{ scope: string; text: string }>;
  }> = [
    {
      role: "Students",
      tone: { tint: "rgba(251, 191, 36, 0.10)", border: "rgba(251, 191, 36, 0.35)", chip: "rgba(251, 191, 36, 0.18)", accent: "#f59e0b" },
      notes: [
        { scope: "My Tasks", text: "Students should not feel any change in experience." },
        { scope: "Org Change", text: "Adding a prominent toggle switch — potentially visible on all main screens — can be a seamless way for users to change orgs." },
        { scope: "Home", text: "Hero banners can be a great indication of which type of org the user is in." },
        {
          scope: "My Tasks",
          text: "Homework assignments should sit within [My Tasks], which now lives in Assessment Orgs only. Having it visible across Org types provides easy access and less confusion. It would be more confusing if homework sat within a testing Org, or if there were two different tasks areas with different content.",
        },
        {
          scope: "Invitation",
          text: "Change terminology: 'Invited', 'Org → Test', and make it feel more like a test invitation.",
        },
        {
          scope: "Org Views",
          text: "Remove [My Classes] and replace it with class badges on each task.",
        },
      ],
    },
    {
      role: "Org Admin",
      tone: { tint: "rgba(56, 189, 248, 0.10)", border: "rgba(56, 189, 248, 0.35)", chip: "rgba(56, 189, 248, 0.18)", accent: "#38bdf8" },
      notes: [
        {
          scope: "OPT Creation Wizard",
          text: "Org Admins should be able to invite students from other Orgs they created, even T&L ones. A filtering tool can be added.",
        },
        {
          scope: "Org Change",
          text: "Adding a prominent toggle switch — potentially visible on all main screens — can be a seamless way for users to change orgs.",
        },
        {
          scope: "My Org",
          text: "It would be less confusing with a prominent 'Change Org' button where they can choose from their different orgs created by the same account. Org Admins choose an org; the hero org title and a slight colour change with the Org type in the main menu button act as an indicator of where the user is.",
        },
        {
          scope: "Org Change",
          text: "Add a validation message on the orgs list to alert the Org Admin of any needed actions.",
        },
        {
          scope: "My Org",
          text: "Create a Dashboard tab within My Org that includes insights about the current org and quick actions to reduce click count.",
        },
      ],
    },
    {
      role: "Class Admin",
      tone: { tint: "rgba(74, 222, 128, 0.10)", border: "rgba(74, 222, 128, 0.35)", chip: "rgba(74, 222, 128, 0.18)", accent: "#4ade80" },
      notes: [
        {
          scope: "OPT Creation Wizard",
          text: "Class Admins should be able to invite students from other Classes they created, even T&L ones. A filtering tool can be added.",
        },
        {
          scope: "Org Change",
          text: "Adding a prominent toggle switch — potentially visible on all main screens — can be a seamless way for users to change orgs.",
        },
      ],
    },
  ];

  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-6xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 items-start">
            {columns.map((col, ci) => (
              <div
                key={ci}
                className="rounded-3xl p-5 border self-start"
                style={{ background: col.tone.tint, borderColor: col.tone.border }}
              >
                <div
                  className="font-montserrat font-bold text-base text-center py-2 px-4 rounded-full mb-4"
                  style={{ background: col.tone.chip, color: "var(--fg)" }}
                >
                  {col.role}
                </div>
                <div className="flex flex-col gap-3">
                  {col.notes.map((note, ni) => (
                    <div
                      key={ni}
                      className="rounded-2xl p-4 border"
                      style={{
                        background: "var(--bg-secondary)",
                        borderColor: "var(--border-card)",
                      }}
                    >
                      <div
                        className="text-[10px] uppercase tracking-[0.12em] font-semibold mb-1"
                        style={{ color: col.tone.accent }}
                      >
                        {note.scope}
                      </div>
                      <p className="[color:var(--fg-70)] text-sm leading-relaxed">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {section.caption && (
            <p className="[color:var(--fg-30)] text-sm mt-6 text-center">{section.caption}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Org Architecture — native hierarchy diagram ─── */
function OrgArchitectureSection({ section, color }: { section: CaseStudySection; color: string }) {
  const tlOrgs = [
    { name: "Springfield Primary", type: "T&L" },
    { name: "Riverside Academy", type: "T&L" },
  ];
  const aOrgs = [
    { name: "Springfield Assessment", type: "Assessment" },
    { name: "OPT Pilot 2025", type: "Assessment" },
  ];
  const tlColor = "#3b82f6";
  const assessColor = "#a855f7";

  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />

          <div
            className="rounded-3xl border p-8 lg:p-12 mt-8"
            style={{ borderColor: "var(--border-card)", background: "var(--bg-secondary)" }}
          >
            {/* Root Org Admin */}
            <div className="flex justify-center">
              <div
                className="rounded-2xl border px-6 py-4 text-center min-w-[220px]"
                style={{
                  borderColor: color + "55",
                  background: color + "12",
                  boxShadow: `0 8px 30px -12px ${color}55`,
                }}
              >
                <div className="text-[10px] uppercase tracking-[0.16em] font-semibold mb-1" style={{ color }}>
                  Org Admin
                </div>
                <div className="font-montserrat font-bold text-base [color:var(--fg)]">
                  Fernando González
                </div>
                <div className="[color:var(--fg-50)] text-xs mt-1">Owns 4 organisations</div>
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center">
              <div className="w-px h-8" style={{ background: "var(--border-card)" }} />
            </div>

            {/* Two columns: T&L | Assessment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Teaching & Learning", items: tlOrgs, accent: tlColor },
                { title: "Assessment", items: aOrgs, accent: assessColor },
              ].map((branch, bi) => (
                <div key={bi} className="flex flex-col items-center">
                  <div
                    className="rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.14em] font-semibold border"
                    style={{
                      color: branch.accent,
                      borderColor: branch.accent + "55",
                      background: branch.accent + "10",
                    }}
                  >
                    {branch.title}
                  </div>
                  <div className="w-px h-6" style={{ background: "var(--border-card)" }} />
                  <div className="flex flex-col gap-3 w-full">
                    {branch.items.map((org, oi) => (
                      <div
                        key={oi}
                        className="rounded-xl border px-4 py-3"
                        style={{
                          borderColor: branch.accent + "33",
                          background: branch.accent + "08",
                        }}
                      >
                        <div className="font-semibold [color:var(--fg)] text-sm">{org.name}</div>
                        <div className="[color:var(--fg-40)] text-[11px] mt-0.5">
                          Isolated data scope · own roster
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-6 border-t" style={{ borderColor: "var(--border-card)" }}>
              <LegendDot color={tlColor} label="Teaching & Learning org" />
              <LegendDot color={assessColor} label="Assessment org" />
              <LegendDot color={color} label="Org Admin (cross-platform)" />
            </div>
          </div>

          {section.caption && (
            <p className="[color:var(--fg-30)] text-sm mt-4 text-center">{section.caption}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      <span className="[color:var(--fg-50)] text-xs">{label}</span>
    </div>
  );
}

/* ─── Navigation Proposals — native side-by-side comparison ─── */
function NavProposalsSection({ section, color }: { section: CaseStudySection; color: string }) {
  const proposals = [
    {
      name: "Tab-based switcher",
      summary: "Top-level tabs swap the entire org context.",
      pros: ["Familiar pattern", "Clear active state"],
      cons: ["Context loss on switch", "Hides sibling orgs"],
      mock: ["Springfield Primary", "Riverside Academy", "OPT Pilot"],
    },
    {
      name: "Persistent dropdown",
      summary: "A single header control lists every org the user owns.",
      pros: ["Always reachable", "Scales to many orgs"],
      cons: ["Extra click to switch", "Easy to overlook"],
      mock: ["⌄ Choose organisation"],
    },
    {
      name: "Sidebar with org context",
      summary: "Sidebar shows the active org plus a quick-switch list.",
      pros: ["Spatial awareness", "Switching feels physical"],
      cons: ["Real estate cost", "Mobile collapse needed"],
      mock: ["● Springfield", "○ Riverside", "○ OPT Pilot"],
    },
  ];

  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-6xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 items-start">
            {proposals.map((p, i) => (
              <div
                key={i}
                className="rounded-3xl border p-6 self-start"
                style={{ background: "var(--bg-secondary)", borderColor: "var(--border-card)" }}
              >
                {/* Mini UI mockup */}
                <div
                  className="rounded-xl border p-3 mb-5"
                  style={{
                    background: "var(--fg-05)",
                    borderColor: "var(--border-card)",
                  }}
                >
                  <div className="flex flex-col gap-2">
                    {p.mock.map((m, mi) => (
                      <div
                        key={mi}
                        className="rounded-md px-3 py-2 text-xs font-medium"
                        style={{
                          background: mi === 0 ? color + "18" : "var(--bg-primary)",
                          color: mi === 0 ? color : "var(--fg-60)",
                          border: `1px solid ${mi === 0 ? color + "40" : "var(--border-card)"}`,
                        }}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="font-montserrat font-bold [color:var(--fg)] text-base mb-1">
                  {p.name}
                </div>
                <p className="[color:var(--fg-50)] text-xs leading-relaxed mb-4">{p.summary}</p>

                <div className="space-y-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-1" style={{ color: "#22c55e" }}>
                      Pros
                    </div>
                    <ul className="space-y-1">
                      {p.pros.map((pro, pi) => (
                        <li key={pi} className="[color:var(--fg-70)] text-xs flex gap-2">
                          <span style={{ color: "#22c55e" }}>+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-1" style={{ color: "#ef4444" }}>
                      Trade-offs
                    </div>
                    <ul className="space-y-1">
                      {p.cons.map((con, ci) => (
                        <li key={ci} className="[color:var(--fg-70)] text-xs flex gap-2">
                          <span style={{ color: "#ef4444" }}>−</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {section.caption && (
            <p className="[color:var(--fg-30)] text-sm mt-6 text-center">{section.caption}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Concept Model — native three-pillar diagram ─── */
function ConceptModelSection({ section, color }: { section: CaseStudySection; color: string }) {
  const pillars = [
    {
      title: "Shared navigation layer",
      desc: "One persistent control surface across both platforms — same anatomy, different content.",
      icon: "▤",
    },
    {
      title: "Org context awareness",
      desc: "Every screen knows which org you're in and exposes a single, predictable switch.",
      icon: "◎",
    },
    {
      title: "Role-aware access",
      desc: "Permissions resolved at the data layer — UI hides what the role can't touch.",
      icon: "◈",
    },
  ];

  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />

          <div
            className="rounded-3xl border p-8 lg:p-12 mt-8"
            style={{ borderColor: "var(--border-card)", background: "var(--bg-secondary)" }}
          >
            {/* Top platforms */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "Teaching & Learning", color: "#3b82f6" },
                { name: "Assessment", color: "#a855f7" },
              ].map((plat, i) => (
                <div
                  key={i}
                  className="rounded-2xl border px-4 py-5 text-center"
                  style={{
                    borderColor: plat.color + "55",
                    background: plat.color + "10",
                  }}
                >
                  <div className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-1" style={{ color: plat.color }}>
                    Platform
                  </div>
                  <div className="font-montserrat font-bold text-base [color:var(--fg)]">{plat.name}</div>
                </div>
              ))}
            </div>

            {/* Connector */}
            <div className="flex justify-center my-6">
              <div className="w-px h-10" style={{ background: "var(--border-card)" }} />
            </div>

            {/* Middle: shared layer */}
            <div
              className="rounded-2xl border px-6 py-5 text-center"
              style={{
                borderColor: color + "55",
                background: color + "12",
                boxShadow: `0 12px 40px -16px ${color}55`,
              }}
            >
              <div className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-1" style={{ color }}>
                Shared Experience Layer
              </div>
              <div className="font-montserrat font-bold text-lg [color:var(--fg)]">
                Org context · navigation · role resolution
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center my-6">
              <div className="w-px h-10" style={{ background: "var(--border-card)" }} />
            </div>

            {/* Bottom pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl border p-5"
                  style={{
                    borderColor: "var(--border-card)",
                    background: "var(--bg-primary)",
                  }}
                >
                  <div className="text-2xl mb-2" style={{ color }}>
                    {p.icon}
                  </div>
                  <div className="font-semibold [color:var(--fg)] text-sm mb-1">{p.title}</div>
                  <p className="[color:var(--fg-50)] text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {section.caption && (
            <p className="[color:var(--fg-30)] text-sm mt-4 text-center">{section.caption}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Lean UX canvas / Constraint notes / Role matrix (generic table-like) ─── */
function GenericSection({ section, color }: { section: CaseStudySection; color: string }) {
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          {section.body && (
            <p className="[color:var(--fg-60)] leading-relaxed mb-6">{section.body}</p>
          )}
          {section.bullets && (
            <ul className="space-y-3">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  <p className="[color:var(--fg-60)] text-sm leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
          )}
          {section.image && (
            <div className="mt-8 relative rounded-2xl overflow-hidden [background:var(--bg-secondary)] p-4 lg:p-6">
              <SafeImage
                src={resolveImage(section.image!).src}
                alt={typeof section.image === "string" ? (section.caption || section.heading || "") : (section.image?.alt || section.caption || section.heading || "")}
                width={1200}
                height={700}
                className="w-full rounded-xl"
              />
              {section.caption && (
                <p className="[color:var(--fg-30)] text-sm mt-2 text-center">{section.caption}</p>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Persona cards ─── */
function PersonaCardsSection({ section, color }: { section: CaseStudySection; color: string }) {
  const [activePersona, setActivePersona] = useState<number | null>(null);
  const personas = section.personas || [];
  const active = activePersona !== null ? personas[activePersona] : null;

  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
        </Reveal>
        {personas.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 items-stretch">
            {personas.map((persona, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePersona(idx)}
                className="rounded-3xl border h-full flex flex-col text-left p-6 lg:p-8 transition-colors duration-300 hover:[background:var(--fg-08)]"
                style={{ borderColor: "var(--border-card)", background: "var(--fg-05)" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  {persona.avatar && (
                    <div className="w-12 h-12 rounded-full overflow-hidden [background:var(--fg-05)]">
                      <SafeImage src={persona.avatar} alt={persona.name} width={48} height={48} className="object-cover" />
                    </div>
                  )}
                  <div>
                    <div className="font-montserrat font-bold [color:var(--fg)] text-lg">{persona.name}</div>
                    {persona.role && (
                      <div className="text-xs uppercase tracking-wider" style={{ color }}>{persona.role}</div>
                    )}
                  </div>
                </div>
                {persona.context && (
                  <p className="[color:var(--fg-50)] text-sm leading-relaxed">{persona.context}</p>
                )}
                {(persona.painPoints || persona.goals) && (
                  <span className="mt-auto pt-4 text-[11px] uppercase tracking-[0.15em] font-semibold" style={{ color }}>
                    View details →
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {active && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 [background:rgba(0,0,0,0.7)] backdrop-blur-sm"
            onClick={() => setActivePersona(null)}
          >
            <div
              className="relative max-w-lg w-full rounded-3xl border p-8 lg:p-10 max-h-[85vh] overflow-y-auto"
              style={{ background: "var(--bg-secondary)", borderColor: "var(--border-card)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActivePersona(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:[background:var(--fg-08)]"
                style={{ color: "var(--fg-60)" }}
              >
                ✕
              </button>
              <div className="flex items-center gap-4 mb-6">
                {active.avatar && (
                  <div className="w-14 h-14 rounded-full overflow-hidden [background:var(--fg-05)]">
                    <SafeImage src={active.avatar} alt={active.name} width={56} height={56} className="object-cover" />
                  </div>
                )}
                <div>
                  <div className="font-montserrat font-bold [color:var(--fg)] text-xl">{active.name}</div>
                  {active.role && (
                    <div className="text-xs uppercase tracking-wider" style={{ color }}>{active.role}</div>
                  )}
                </div>
              </div>
              {active.context && (
                <p className="[color:var(--fg-60)] text-sm leading-relaxed mb-6">{active.context}</p>
              )}
              {active.painPoints && (
                <div className="mb-5">
                  <div className="text-[10px] uppercase tracking-wider [color:var(--fg-30)] mb-2">Pain points</div>
                  <ul className="space-y-2">
                    {active.painPoints.map((item, pidx) => (
                      <li key={pidx} className="[color:var(--fg-60)] text-sm leading-relaxed flex gap-2">
                        <span style={{ color }}>•</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {active.goals && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider [color:var(--fg-30)] mb-2">Goals</div>
                  <ul className="space-y-2">
                    {active.goals.map((goal, gidx) => (
                      <li key={gidx} className="[color:var(--fg-60)] text-sm leading-relaxed flex gap-2">
                        <span style={{ color }}>•</span>{goal}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Horizontal Scroll Gallery ─── */
function HorizontalScrollGallerySection({ section, color, onImageClick }: { section: CaseStudySection; color: string; onImageClick?: (src: string) => void }) {
  if (!section.screens || section.screens.length === 0) return null;
  return (
    <section className={cls("py-16 lg:py-24 overflow-hidden", sectionBg(section.bg))}>
      <div className="max-w-[95vw] lg:max-w-max mx-auto px-6 lg:px-10">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 overflow-x-auto pb-8 snap-x snap-mandatory pt-4 lg:pr-[10vw] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {section.screens.map((screen, i) => {
              const res = typeof screen === 'string'
                ? { src: screen, alt: `Screen ${i + 1}` }
                : 'image' in (screen as any)
                ? (() => {
                    const s = screen as any;
                    const img = typeof s.image === 'string' ? { src: s.image, alt: s.label || `Screen ${i + 1}` } : s.image;
                    return { src: img.src, alt: img.alt, label: s.label };
                  })()
                : { src: (screen as any).src, alt: (screen as any).alt };
              
              return (
                <div key={i} className="flex-none w-full lg:w-auto lg:snap-center shadow-xl lg:shadow-[0_25px_80px_-20px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden cursor-pointer relative border [border-color:var(--border-subtle)] flex flex-col justify-center max-h-[85vh] transition-transform duration-300 hover:scale-[1.01]" onClick={() => onImageClick?.(res.src)}>
                  <SafeImage src={res.src} alt={res.alt} width={1200} height={1800} className="w-full lg:w-auto h-auto lg:max-h-full object-contain" />
                </div>
              );
            })}
          </div>
          {section.caption && (
            <p className="[color:var(--fg-30)] text-sm mt-3 text-center">{section.caption}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Panorama Section ─── */
function PanoramaSection({ section, color, onImageClick }: { section: CaseStudySection; color: string; onImageClick?: (src: string) => void }) {
  if (!section.image) return null;
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const imgRes = resolveImage(section.image);
  const isSvg = imgRes.src.toLowerCase().endsWith('.svg');
  const isJourney = imgRes.src.includes('journey');
  const activeSrc = isJourney && imgRes.darkSrc ? (isDark ? imgRes.darkSrc : imgRes.src) : imgRes.src;
  
  return (
    <section className={cls("py-16 lg:py-24 overflow-hidden relative", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0 mb-6 lg:mb-10 text-center lg:text-left">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          {section.caption && (
            <p className="[color:var(--fg-60)] text-sm mt-3 lg:mt-0 font-medium tracking-wide opacity-80">{section.caption}</p>
          )}
        </Reveal>
      </div>
      
      {/* Full Bleed Scroller */}
      <div className="relative w-full group">
        {/* Scroll hint icons - appears on hover, transparent */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-300">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.8">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-300">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.8">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
        
        <div className="overflow-x-auto overflow-y-hidden pb-8 pt-4 w-full cursor-grab active:cursor-grabbing no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="px-[5vw] lg:px-[10vw] inline-flex">
            <div 
              className="relative rounded-2xl overflow-hidden flex flex-col justify-center transition-transform hover:opacity-95" 
              onClick={() => onImageClick?.(activeSrc)}
            >
              {isSvg ? (
                <img 
                  src={activeSrc} 
                  alt={imgRes.alt} 
                  className={`${isJourney ? "h-[85vh] md:h-[90vh] lg:h-[95vh] w-auto max-w-none object-contain" : "h-[50vh] md:h-[65vh] lg:h-[80vh] w-auto max-w-none object-contain"}`}
                  style={{ minWidth: isJourney ? '150vw' : 'auto' }}
                />
              ) : (
                <SafeImage 
                  src={activeSrc} 
                  alt={imgRes.alt} 
                  width={3000} 
                  height={1200} 
                  className={`${isJourney ? "h-[85vh] md:h-[90vh] lg:h-[95vh] w-auto max-w-none object-contain" : "h-[50vh] md:h-[65vh] lg:h-[80vh] w-auto max-w-none object-contain"}`}
                  style={{ minWidth: isJourney ? '150vw' : 'auto' }}
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Visual Cue for Scrollability - drag indicator */}
        <div className="absolute right-0 top-0 bottom-8 w-24 pointer-events-none bg-gradient-to-l from-black/5 dark:from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Bottom scroll progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </section>
  );
}

/* ─── Component Showcase section ─── */
function ComponentShowcaseSection({ section, color }: { section: CaseStudySection; color: string }) {
  if (!section.components) return null;
  
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          {section.body && (
            <p className="[color:var(--fg-60)] text-base lg:text-lg leading-relaxed mb-8">{section.body}</p>
          )}
          <div className="grid gap-6">
            {section.components?.map((comp, i) => {
              const isTabList = comp.type === "tablist";
              return (
                <div
                  key={i}
                  className="rounded-2xl border p-6 lg:p-8 transition-all duration-300 hover:shadow-[0_25px_80px_-20px_rgba(0,0,0,0.5)]"
                  style={{ borderColor: "var(--border-card)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-montserrat font-bold text-lg lg:text-xl [color:var(--fg)] capitalize">
                      {comp.label || comp.type}
                    </h3>
                    <button
                      onClick={() => console.log(`Viewing ${comp.type} specifications`)}
                      className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] hover:opacity-80 transition-opacity"
                    >
                      View full spec →
                    </button>
                  </div>
                  {isTabList ? (
                    <div className="space-y-6">
                      <div
                        className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-card)] overflow-hidden"
                        role="tablist"
                        aria-label="Component specifications"
                      >
                        <div className="flex border-b border-[var(--border-card)]">
                          <button
                            role="tab"
                            aria-selected="true"
                            aria-controls="tabpanel-specs"
                            id="tab-btn-1"
                            className="flex-1 py-3 px-6 text-sm font-semibold text-[var(--fg-60)] hover:text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 transition-colors"
                          >
                            Structure
                          </button>
                          <button
                            role="tab"
                            aria-selected="false"
                            aria-controls="tabpanel-api"
                            id="tab-btn-2"
                            className="flex-1 py-3 px-6 text-sm font-semibold text-[var(--fg-40)] hover:text-[var(--fg-60)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 transition-colors"
                          >
                            API
                          </button>
                          <button
                            role="tab"
                            aria-selected="false"
                            aria-controls="tabpanel-accessibility"
                            id="tab-btn-3"
                            className="flex-1 py-3 px-6 text-sm font-semibold text-[var(--fg-40)] hover:text-[var(--fg-60)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 transition-colors"
                          >
                            Accessibility
                          </button>
                        </div>
                        <div className="p-6 space-y-6">
                          <div role="tabpanel" id="tabpanel-specs" aria-labelledby="tab-btn-1" className="space-y-4">
                            <h4 className="font-montserrat font-bold text-sm [color:var(--fg-50)] uppercase tracking-[0.15em]">Layout Structure</h4>
                            <div className="grid gap-3">
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--fg-05)] border border-[var(--fg-08)]">
                                <div className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
                                <span className="text-sm [color:var(--fg-60)]">TabList container with role="tablist"</span>
                              </div>
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--fg-05)] border border-[var(--fg-08)]">
                                <div className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
                                <span className="text-sm [color:var(--fg-60)]">Tab buttons with role="tab" and aria-selected</span>
                              </div>
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--fg-05)] border border-[var(--fg-08)]">
                                <div className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
                                <span className="text-sm [color:var(--fg-60)]">Associated tabpanels with aria-controls</span>
                              </div>
                            </div>
                          </div>
                          <div role="tabpanel" id="tabpanel-api" aria-labelledby="tab-btn-2" className="space-y-4 hidden">
                            <h4 className="font-montserrat font-bold text-sm [color:var(--fg-50)] uppercase tracking-[0.15em]">API Endpoints</h4>
                            <div className="font-mono text-xs [color:var(--fg-40)] bg-[var(--fg-05)] rounded-lg p-3 overflow-x-auto">
                              <code>
                                GET /api/components/production/tablist<br />
                                POST /api/components/production/tablist/activate<br />
                                GET /api/components/production/tablist/specs
                              </code>
                            </div>
                          </div>
                          <div role="tabpanel" id="tabpanel-accessibility" aria-labelledby="tab-btn-3" className="space-y-4 hidden">
                            <h4 className="font-montserrat font-bold text-sm [color:var(--fg-50)] uppercase tracking-[0.15em]">Accessibility Checklist</h4>
                            <div className="grid gap-2">
                              <div className="flex items-center gap-2 text-sm [color:var(--fg-60)]">
                                <span className="text-[var(--accent)]">✓</span> Keyboard navigable (← → Home End)
                              </div>
                              <div className="flex items-center gap-2 text-sm [color:var(--fg-60)]">
                                <span className="text-[var(--accent)]">✓</span> Focus indicators visible (2-4px outline)
                              </div>
                              <div className="flex items-center gap-2 text-sm [color:var(--fg-60)]">
                                <span className="text-[var(--accent)]">✓</span> ARIA live regions for state changes
                              </div>
                              <div className="flex items-center gap-2 text-sm [color:var(--fg-60)]">
                                <span className="text-[var(--accent)]">✓</span> Screen reader announcements
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-dashed border-[var(--border-card)] p-8 text-center">
                        <p className="[color:var(--fg-40)] text-sm">{comp.type} component specifications coming soon...</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Section dispatcher ─── */
/* ─── Component Specification (Native Deep Dive) ─── */
/* ─── Component Fragments (Premium Deep Dive) ─── */
function ProMaxFragment({ 
  frag, 
  color 
}: { 
  frag: any; 
  color: string;
}) {
  return (
    <div className="flex flex-col items-center w-full mb-32 last:mb-0">
      <div className="text-center mb-16 max-w-2xl px-6">
        <h3 className="font-montserrat font-bold [color:var(--fg)] text-2xl lg:text-3xl mb-4">
          {frag.title}
        </h3>
        {frag.subtitle && (
          <p className="[color:var(--fg-60)] text-[10px] uppercase tracking-[4px] font-bold">
            {frag.subtitle}
          </p>
        )}
      </div>

      <div className="w-full relative group flex justify-center">
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            src={frag.imageSrc}
            alt={frag.title}
            className={cls(
              "w-full h-auto object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_40px_100px_rgba(0,0,0,0.4)]",
              frag.invertInDarkMode && "dark:invert"
            )}
          />
          
        </div>

        {/* Technical context background decor */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center overflow-hidden">
           <div className="w-[150%] h-px bg-gradient-to-r from-transparent via-[var(--fg)] to-transparent rotate-12" />
           <div className="w-[150%] h-px bg-gradient-to-r from-transparent via-[var(--fg)] to-transparent -rotate-12" />
        </div>
      </div>

      {frag.description && (
        <div className="max-w-2xl mt-16 px-6 text-center">
          <p className="[color:var(--fg-70)] text-base lg:text-lg leading-relaxed font-light">
            {frag.description}
          </p>
        </div>
      )}
    </div>
  );
}

function ComponentExplorer({ 
  activeMode, 
  onModeChange, 
  sections, 
  color 
}: { 
  activeMode: string; 
  onModeChange: (id: string) => void; 
  sections: CaseStudySection[];
  color: string;
}) {
  const components = [
    { id: "progress-ring", label: "Progress Ring" },
    { id: "tab-button", label: "TabList & TabButton" },
    { id: "skill-card", label: "Skill Card" }
  ];

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-0 lg:gap-12 px-6 lg:px-12 py-12">
      {/* Sticky Sidebar Navigation */}
      <aside className="w-full lg:w-64 lg:shrink-0 mb-12 lg:mb-0">
        <div className="sticky top-32 space-y-8">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[4px] [color:var(--fg-30)] mb-6">Components</h4>
            <nav className="space-y-1">
              {components.map((comp) => {
                const isActive = activeMode === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => onModeChange(comp.id)}
                    className={cls(
                      "w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative group",
                      isActive 
                        ? "[color:var(--fg)] bg-[var(--fg-05)] shadow-sm" 
                        : "[color:var(--fg-60)] hover:[color:var(--fg)] hover:bg-[var(--fg-05)]"
                    )}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="sidebar-active"
                        className="absolute left-0 top-3 bottom-3 w-1 rounded-full"
                        style={{ background: color }}
                      />
                    )}
                    {comp.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-8 border-t [border-color:var(--border-subtle)]">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
               <span className="text-[10px] font-bold uppercase tracking-wider [color:var(--fg-50)]">Documentation</span>
            </div>
            <p className="text-[11px] [color:var(--fg-60)] leading-relaxed">
              Technical specifications, anatomy, and accessibility guidelines for production-ready design system components.
            </p>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 min-w-0">
        <div className="space-y-32">
          {sections.map((section, idx) => (
            <div key={idx}>
              {section.type === "component-fragments" && section.fragments ? (
                <div className="space-y-40">
                  {section.fragments.map((frag, fidx) => (
                    <ProMaxFragment key={fidx} frag={frag} color={color} />
                  ))}
                </div>
              ) : (
                <Section section={section} color={color} />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* ─── Component Fragments (Cutout Design) ─── */
function ComponentFragmentsSection({ section, color }: { section: CaseStudySection; color: string }) {
  if (!section.fragments) return null;
  return (
    <section className={cls("py-20 lg:py-32", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-24">
            <h2 className="font-montserrat font-bold [color:var(--fg)] mb-6 text-3xl lg:text-5xl">
              {section.componentName}
            </h2>
            {section.body && (
              <p className="[color:var(--fg-60)] text-lg max-w-2xl mx-auto leading-relaxed">{section.body}</p>
            )}
          </div>

          <div className="space-y-40">
            {section.fragments.map((frag, idx) => (
              <ProMaxFragment key={idx} frag={frag} color={color} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ComponentSpecificationSection({ section, color, onImageClick }: { section: CaseStudySection; color: string; onImageClick?: (src: string) => void }) {
  if (!section.image) return null;
  const src = resolveImage(section.image!).src;

  return (
    <section className={cls("py-20 lg:py-32 overflow-hidden", sectionBg(section.bg))}>
      <div className="max-w-6xl mx-auto px-6 lg:px-0">
        <Reveal>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            {/* Technical side (Text & Specs) */}
            <div className="w-full lg:w-2/5 pt-4">
              <SectionLabel label={section.label} color={color} />
              <h2 className="font-montserrat font-bold [color:var(--fg)] text-3xl lg:text-4xl leading-tight mb-6">
                {section.heading}
              </h2>
              {section.body && (
                <p className="[color:var(--fg-60)] text-base lg:text-lg leading-relaxed mb-12">
                  {section.body}
                </p>
              )}

              <div className="space-y-12">
                {section.specifications?.map((spec, i) => (
                  <div key={i} className="relative pl-8 border-l border-[var(--border-subtle)]">
                    <div 
                      className="absolute left-[-1px] top-0 w-[2px] h-6" 
                      style={{ background: color }} 
                    />
                    <h3 className="text-[11px] font-bold uppercase tracking-[3px] mb-3" style={{ color }}>
                      {spec.title}
                    </h3>
                    <p className="[color:var(--fg-50)] text-sm leading-relaxed antialiased">
                      {spec.body}
                    </p>
                    {spec.bullets && (
                      <ul className="mt-4 space-y-2">
                        {spec.bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-2 text-xs [color:var(--fg-40)]">
                            <span style={{ color }}>•</span> {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual side (Native Image) */}
            <div className="w-full lg:w-3/5 relative">
              <div 
                className="relative group/native cursor-zoom-in transition-all duration-700"
                onClick={() => onImageClick?.(src)}
              >
                {/* No background frame, just the component on the page background */}
                <div className="relative z-10 p-4 lg:p-8 flex items-center justify-center min-h-[400px]">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img
                    src={src}
                    alt={section.heading || "Component specification"}
                    className="w-full h-auto max-h-[600px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover/native:scale-[1.02]"
                  />
                </div>

                {/* Technical measurement lines (decorative) */}
                <div className="absolute inset-0 pointer-events-none opacity-20 group-hover/native:opacity-40 transition-opacity duration-700">
                  <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[var(--fg-30)] to-transparent" />
                  <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[var(--fg-30)] to-transparent" />
                  <div className="absolute left-0 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-[var(--fg-30)] to-transparent" />
                  <div className="absolute right-0 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-[var(--fg-30)] to-transparent" />
                </div>

                {/* Enlarge Trigger */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover/native:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color }}>
                      <path d="M9 1H13M13 1V5M13 1L8.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 13H1M1 13V9M1 13L5.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[9px] font-bold uppercase tracking-wider [color:var(--fg-70)]">Enlarge</span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              {section.caption && (
                <p className="[color:var(--fg-20)] text-[10px] uppercase tracking-[4px] text-center mt-8">
                  {section.caption}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Section({ section, color, onImageClick }: { section: CaseStudySection; color: string; onImageClick?: (src: string) => void }) {
  switch (section.type) {
    case "tldr":
      return <TldrSection section={section} color={color} />;
    case "text":
      return <TextSection section={section} color={color} />;
    case "image":
      return <ImageSection section={section} color={color} />;
    case "fullwidth-image":
      return <FullwidthImageSection section={section} color={color} onImageClick={onImageClick} />;
    case "split":
      return <SplitSection section={section} color={color} onImageClick={onImageClick} />;
    case "stats":
      return <StatsSection section={section} color={color} />;
    case "quote":
      return <QuoteSection section={section} color={color} />;
    case "timeline":
      return <TimelineSection section={section} color={color} />;
    case "research-chart":
      return <ResearchChartSection section={section} color={color} />;
    case "video":
      return <VideoSection section={section} color={color} />;
    case "browser-frame":
      return <BrowserFrameSection section={section} color={color} />;
    case "showcase":
      return <ShowcaseSection section={section} color={color} />;
    case "component-fragments":
      return <ComponentFragmentsSection section={section} color={color} />;
    case "component-specification":
      return <ComponentSpecificationSection section={section} color={color} onImageClick={onImageClick} />;
    case "component-showcase":
      return <ComponentShowcaseSection section={section} color={color} />;
    case "component-gallery":
      return null;
    case "screen-gallery":
      return <ScreenGallerySection section={section} color={color} onImageClick={onImageClick} />;
    case "reflection":
      return <ReflectionSection section={section} color={color} />;
    case "process-step":
      return <ProcessStepSection section={section} color={color} />;
    case "image-pair":
      return <ImagePairSection section={section} color={color} />;
    case "persona-cards":
      return <PersonaCardsSection section={section} color={color} />;
    case "lean-ux-canvas":
      return <LeanUXCanvasSection section={section} color={color} />;
    case "role-matrix":
      return <RoleMatrixSection section={section} color={color} />;
    case "constraint-notes":
      return <ConstraintNotesSection section={section} color={color} />;
    case "user-role-matrix":
      return <UserRoleMatrixSection section={section} color={color} />;
    case "possible-solutions":
      return <PossibleSolutionsSection section={section} color={color} />;
    case "org-architecture":
      return <OrgArchitectureSection section={section} color={color} />;
    case "nav-proposals":
      return <NavProposalsSection section={section} color={color} />;
    case "concept-model":
      return <ConceptModelSection section={section} color={color} />;
    case "horizontal-scroll-gallery":
      return <HorizontalScrollGallerySection section={section} color={color} onImageClick={onImageClick} />;
    case "panorama":
      return <PanoramaSection section={section} color={color} onImageClick={onImageClick} />;
  }
}

/* ─── Floating back button ─── */
function FloatingBackButton() {
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="fixed top-6 left-6 z-40"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium border backdrop-blur-md [background:var(--nav-bg)] [border-color:var(--nav-border)] [color:var(--fg-60)] hover:[color:var(--fg)] transition-colors"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M8.5 1.5L3.5 6.5L8.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </Link>
    </motion.div>
  );
}

/* ─── Component Gallery ─── */
function ComponentGallerySection({
  section,
  color,
  activeIndex,
}: {
  section: CaseStudySection;
  color: string;
  activeIndex: number;
  onIndexChange?: (i: number) => void;
}) {
  const comps = section.galleryComponents;
  if (!comps || comps.length === 0) return null;
  const active = comps[Math.min(activeIndex, comps.length - 1)];
  const { src, alt } = resolveImage(active.image);

  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel label={active.label} color={color} />
          <h2 className="font-montserrat font-bold [color:var(--fg)] mb-6 text-2xl lg:text-4xl leading-tight">
            {active.heading}
          </h2>
          {active.body && (
            <p className="[color:var(--fg-60)] text-base lg:text-lg leading-relaxed mb-10 max-w-3xl">
              {active.body}
            </p>
          )}
          {/* Showcase frame */}
          {(() => {
            if (active.cropViewBox && active.svgNaturalWidth && active.svgNaturalHeight) {
              const [cx, cy, cw, ch] = active.cropViewBox.split(" ").map(Number);
              const imgWidthPct = (active.svgNaturalWidth / cw) * 100;
              const leftPct = -(cx / cw) * 100;
              const topPct = -(cy / ch) * 100;
              return (
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    aspectRatio: `${cw} / ${ch}`,
                    background: active.showcaseBg || "#0F1E24",
                    boxShadow: "0 25px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px var(--border-subtle)",
                    position: "relative",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt}
                    style={{
                      position: "absolute",
                      width: `${imgWidthPct}%`,
                      height: "auto",
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                    }}
                  />
                </div>
              );
            }
            return (
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: active.showcaseBg || "#0F1E24",
                  boxShadow: "0 25px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px var(--border-subtle)",
                }}
              >
                <SafeImage src={src} alt={alt} width={1200} height={800} className="block w-full h-auto" />
              </div>
            );
          })()}
          {active.caption && (
            <p className="[color:var(--fg-30)] text-sm mt-3 text-center">{active.caption}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Floating component toggle ─── */
function FloatingComponentToggle({
  components,
  activeIndex,
  onChange,
  color,
  sectionRef,
}: {
  components: Array<{ toggleLabel: string; id: string }>;
  activeIndex: number;
  onChange: (i: number) => void;
  color: string;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-4"
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-label="Switch component deep-dive"
      role="group"
    >
      <div
        className="flex items-center gap-1.5 p-1.5 rounded-full border backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300"
        style={{
          background: "rgba(10, 12, 20, 0.7)",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        {components.map((comp, i) => {
          const active = activeIndex === i;
          return (
            <button
              key={comp.id}
              onClick={() => onChange(i)}
              aria-pressed={active}
              className="relative rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                color: active ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
              }}
            >
              {active && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full z-[-1]"
                  style={{
                    background: color,
                    boxShadow: `0 0 20px ${color}40`,
                  }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              {comp.toggleLabel}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Main component ─── */
interface Props {
  project: ProjectDetail;
  prevProject: ProjectDetail | null;
  nextProject: ProjectDetail | null;
}

export default function CaseStudyClient({ project, prevProject, nextProject }: Props) {
  const color = project.color || "#26A69A";
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeModeState, setActiveModeState] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Derive active mode for filtering sections
  const gallerySection = project.caseStudy?.find(s => s.type === "component-gallery");
  const isComponentsProd = project.id === "components-production";
  const activeMode = isComponentsProd 
    ? (activeModeState || "progress-ring") 
    : (gallerySection?.galleryComponents?.[activeGalleryIndex]?.id);

  const galleryComponents = gallerySection?.galleryComponents ?? [];

  const filteredSections = project.caseStudy?.filter(section => {
    if (!section.mode) return true;
    return section.mode === activeMode;
  });

  const handleComponentChange = (idx: number) => {
    setActiveGalleryIndex(idx);
    if (galleryRef.current) {
      const top = galleryRef.current.offsetTop;
      window.scrollTo({ top: top - 80, behavior: 'smooth' });
    }
  };

  const handleModeChange = (mode: string) => {
    setActiveModeState(mode);
    // When switching components, we want to stay within the explorer view, 
    // so we don't necessarily scroll to the very top of the page, but to the start of the explorer.
    if (galleryRef.current) {
      const top = galleryRef.current.offsetTop;
      window.scrollTo({ top: top - 100, behavior: 'smooth' });
    }
  };

  return (
    <>
      <FloatingBackButton />
      {galleryComponents.length > 0 && (
        <FloatingComponentToggle
          components={galleryComponents}
          activeIndex={activeGalleryIndex}
          onChange={handleComponentChange}
          color={color}
          sectionRef={galleryRef}
        />
      )}
      <main className="min-h-screen [background:var(--bg-primary)]">
      {/* ── Hero ── */}
      <div className="relative h-[92vh] overflow-hidden [background:var(--bg-primary)]">
        {/* Ambient color composition — replaces blurry cover overlay */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(900px 600px at 85% 20%, ${color}26, transparent 60%), radial-gradient(700px 500px at 15% 85%, ${color}1a, transparent 65%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
          style={{ background: color }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[var(--bg-primary)]"
        />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 lg:pb-24 px-6 lg:px-0">
          <div className="max-w-5xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6"
              style={{
                borderColor: `${color}30`,
                background: `${color}10`,
              }}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-[3px]"
                style={{ color }}
              >
                {project.employer || project.subtitle}
              </span>
            </motion.div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px" style={{ background: color }} />
              <span
                className="text-[10px] font-semibold uppercase tracking-[5px]"
                style={{ color }}
              >
                {project.category}
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-montserrat font-bold [color:var(--fg)] leading-[0.95]"
              style={{ fontSize: "clamp(44px, 8vw, 100px)" }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-montserrat [color:var(--fg-30)] mt-3"
              style={{ fontSize: "clamp(18px, 2.5vw, 32px)" }}
            >
              {project.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <div
            className="w-px h-6"
            style={{
              background: `linear-gradient(to bottom, ${color}60, transparent)`,
            }}
          />
          <span className="text-[9px] uppercase tracking-[3px] [color:var(--fg-20)]">Scroll</span>
        </div>
      </div>

      {/* ── Project metadata ── */}
      <section className="relative overflow-hidden">
        {/* Subtle accent glow behind the bar */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}, transparent 70%)` }}
        />
        <div className="max-w-5xl mx-auto px-6 lg:px-0 py-10 lg:py-14">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Role", value: project.role },
              { label: "Employer", value: project.employer },
              { label: "Timeline", value: project.timeline },
              { label: "Team", value: project.team },
              { label: "Tools", value: project.tools },
              { label: "Platform", value: project.platform },
            ]
              .filter((m) => m.value)
              .map((m, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center px-5 py-4 rounded-2xl min-w-[130px] max-w-[200px] flex-1 backdrop-blur-sm transition-colors duration-300"
                  style={{
                    background: "var(--fg-05)",
                    border: "1px solid var(--border-card)",
                  }}
                >
                  <div
                    className="text-[9px] uppercase tracking-[3px] mb-2 font-medium"
                    style={{ color }}
                  >
                    {m.label}
                  </div>
                  <div className="[color:var(--fg-70)] text-[13px] leading-snug">{m.value}</div>
                </div>
              ))}
          </div>
        </div>
        {/* Bottom border */}
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "var(--border-subtle)" }} />
      </section>

      {/* ── Case study sections ── */}
      <div ref={galleryRef}>
        {(() => {
          // 1. Gather all sections for the active mode
          const baseSections = project.caseStudy?.filter(section => {
            if (section.mode === "any") return true; 
            if (!section.mode) return true;
            return section.mode === activeMode;
          }) ?? [];

          // 2. Separate component-gallery and specific fragments
          const gallerySection = baseSections.find(s => s.type === "component-gallery");
          const remainingSections = baseSections.filter(s => s.type !== "component-gallery" && s.type !== "tldr" && s.type !== "stats");

          // 3. For components-production, use a linear flow. For others, group by category.
          const isLinear = project.id === "components-production";

          if (isLinear) {
            return (
              <div className="relative">
                {/* TLDR & Stats always at top */}
                {project.caseStudy?.filter(s => s.type === "tldr" || s.type === "stats").map((s, i) => (
                  <Section key={`top-${i}`} section={s} color={color} onImageClick={setLightboxImage} />
                ))}

                {/* The Explorer View */}
                <ComponentExplorer 
                  activeMode={activeMode as string}
                  onModeChange={handleModeChange}
                  sections={baseSections.filter(s => s.type !== "tldr" && s.type !== "stats")}
                  color={color}
                />
              </div>
            );
          }

          const categories = remainingSections.reduce((acc, s) => {
            const cat = s.category || "General";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(s);
            return acc;
          }, {} as Record<string, CaseStudySection[]>);

          return (
            <>
              {/* TLDR & Stats always at top */}
              {project.caseStudy?.filter(s => s.type === "tldr" || s.type === "stats").map((s, i) => (
                <Section key={`top-${i}`} section={s} color={color} onImageClick={setLightboxImage} />
              ))}

              {/* Toggle-driven Gallery (Hero) */}
              {gallerySection && (
                <ComponentGallerySection
                  section={gallerySection}
                  color={color}
                  activeIndex={activeGalleryIndex}
                  onIndexChange={handleComponentChange}
                />
              )}

              {/* Categorized Technical Fragments */}
              {Object.entries(categories).map(([category, sections], catIdx) => (
                <div key={category} className="border-t [border-color:var(--border-subtle)] overflow-hidden">
                  <div className="max-w-5xl mx-auto px-6 pt-20 pb-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="font-montserrat font-bold text-[14px] uppercase tracking-[6px] [color:var(--fg-30)] mb-10">
                        {category}
                      </h3>
                    </motion.div>
                  </div>
                  {sections.map((section, sIdx) => (
                    <Section key={`${category}-${sIdx}`} section={section} color={color} onImageClick={setLightboxImage} />
                  ))}
                </div>
              ))}
            </>
          );
        })()}
      </div>

      {/* ── Project navigation ── */}
      {(prevProject || nextProject) && (
        <section className="border-t [border-color:var(--border-subtle)] py-16 px-6 lg:px-20">
          <div className="max-w-5xl mx-auto flex justify-between items-start gap-8">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col gap-2 max-w-[45%]"
              >
                <span className="text-[9px] uppercase tracking-[3px] [color:var(--fg-30)] flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M7 1L2 6L7 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Previous
                </span>
                <span className="font-montserrat font-bold [color:var(--fg)]group-hover:[color:var(--fg-70)] transition-colors">
                  {prevProject.title}
                </span>
                <span className="[color:var(--fg-30)] text-sm">{prevProject.subtitle}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col gap-2 text-right max-w-[45%]"
              >
                <span className="text-[9px] uppercase tracking-[3px] [color:var(--fg-30)] flex items-center gap-2 justify-end">
                  Next
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M5 1L10 6L5 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="font-montserrat font-bold [color:var(--fg)]group-hover:[color:var(--fg-70)] transition-colors">
                  {nextProject.title}
                </span>
                <span className="[color:var(--fg-30)] text-sm">{nextProject.subtitle}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      )}

      {/* ── Back to work ── */}
      <section className="py-12 px-6 lg:px-20 border-t [border-color:var(--border-subtle)]">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-3 [color:var(--fg-30)] hover:[color:var(--fg-70)] transition-colors text-sm group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <path
                d="M10 3L5 8L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Work
          </Link>
        </div>
      </section>

      {/* ─── Lightbox modal ─── */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 [color:var(--fg-60)] hover:[color:var(--fg)] text-4xl"
            onClick={() => setLightboxImage(null)}
          >
            ×
          </button>
          <div className="max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxImage}
              alt="Enlarged view"
              width={1200}
              height={800}
              className="object-contain max-h-[90vh]"
            />
          </div>
        </div>
      )}
    </main>
    </>
  );
}
