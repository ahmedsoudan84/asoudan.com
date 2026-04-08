"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ProjectDetail, CaseStudySection, ImageRef, ScreenItem } from "@/lib/projects";

/* Resolve ImageRef to {src, alt} */
function resolveImage(img: ImageRef, fallbackAlt = ""): { src: string; alt: string } {
  if (typeof img === "string") return { src: img, alt: fallbackAlt };
  return { src: img.src, alt: img.alt };
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
function FullwidthImageSection({ section, color }: { section: CaseStudySection; color: string }) {
  if (!section.image) return null;
  return (
    <section className={cls("py-12", sectionBg(section.bg))}>
      <Reveal>
        <SectionLabel label={section.label} color={color} />
        <div className="max-w-6xl mx-auto px-6 lg:px-0">
          <SafeImage
            src={resolveImage(section.image!).src}
            alt={section.caption || "Full width image"}
            width={2400}
            height={900}
            className="w-full h-auto rounded-2xl"
          />
        </div>
        {section.caption && (
          <p className="[color:var(--fg-30)] text-sm mt-3 text-center px-6">{section.caption}</p>
        )}
      </Reveal>
    </section>
  );
}

/* ─── Split section ─── */
function SplitSection({ section, color }: { section: CaseStudySection; color: string }) {
  const imageLeft = section.imagePosition !== "right";
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <div
            className={cls(
              "flex flex-col lg:flex-row gap-10 lg:gap-16 items-center",
              !imageLeft && "lg:flex-row-reverse"
            )}
          >
            {section.image && (
              <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shrink-0">
                <SafeImage
                  src={resolveImage(section.image!).src}
                  alt={typeof section.image === "string" ? (section.caption || section.heading || "") : (section.image?.alt || section.caption || section.heading || "")}
                  width={700}
                  height={500}
                  className="w-full object-cover"
                />
                {section.caption && (
                  <p className="[color:var(--fg-30)] text-sm mt-2 text-center">{section.caption}</p>
                )}
              </div>
            )}
            <div className="w-full lg:w-1/2">
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
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          {section.stats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {section.stats.map((s, i) => (
                <div key={i}>
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
              src={resolveImage(section.image!).src}
              alt={section.caption || section.heading || "Showcase"}
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
  const [expandedPersona, setExpandedPersona] = useState<number | null>(null);
  const personas = section.personas || [];

  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        {/* Label + heading in their own Reveal so state changes never touch the motion wrapper */}
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
        </Reveal>
        {personas.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 items-start">
            {personas.map((persona, idx) => (
              <div
                key={idx}
                className="rounded-3xl border transition-colors duration-300 self-start"
                style={{
                  borderColor: expandedPersona === idx ? "var(--fg-20)" : "var(--border-card)",
                  background: expandedPersona === idx ? "var(--fg-08)" : "var(--fg-05)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedPersona(expandedPersona === idx ? null : idx)}
                  className="w-full text-left p-6 lg:p-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {persona.avatar && (
                      <div className="w-12 h-12 rounded-full overflow-hidden [background:var(--fg-05)]">
                        <SafeImage
                          src={persona.avatar}
                          alt={persona.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-montserrat font-bold [color:var(--fg)] text-lg">
                        {persona.name}
                      </div>
                      {persona.role && (
                        <div className="text-xs uppercase tracking-wider" style={{ color }}>
                          {persona.role}
                        </div>
                      )}
                    </div>
                  </div>
                  {persona.context && (
                    <p className="[color:var(--fg-50)] text-sm leading-relaxed">{persona.context}</p>
                  )}
                </button>
                {expandedPersona === idx && persona.painPoints && (
                  <div className="px-6 lg:px-8 pb-6 border-t [border-color:var(--border-subtle)]">
                    <div className="text-[10px] uppercase tracking-wider [color:var(--fg-30)] mb-2 mt-4">
                      Pain points
                    </div>
                    <ul className="space-y-2">
                      {persona.painPoints.map((item, pidx) => (
                        <li key={pidx} className="[color:var(--fg-50)] text-sm leading-relaxed flex gap-2">
                          <span style={{ color }}>•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    {persona.goals && (
                      <div className="mt-4">
                        <div className="text-[10px] uppercase tracking-wider [color:var(--fg-30)] mb-2">
                          Goals
                        </div>
                        <ul className="space-y-2">
                          {persona.goals.map((goal, gidx) => (
                            <li key={gidx} className="[color:var(--fg-50)] text-sm leading-relaxed flex gap-2">
                              <span style={{ color }}>•</span>
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Section dispatcher ─── */
function Section({ section, color, onImageClick }: { section: CaseStudySection; color: string; onImageClick?: (src: string) => void }) {
  switch (section.type) {
    case "tldr":
      return <TldrSection section={section} color={color} />;
    case "text":
      return <TextSection section={section} color={color} />;
    case "image":
      return <ImageSection section={section} color={color} />;
    case "fullwidth-image":
      return <FullwidthImageSection section={section} color={color} />;
    case "split":
      return <SplitSection section={section} color={color} />;
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
        href="/"
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

/* ─── Main component ─── */
interface Props {
  project: ProjectDetail;
  prevProject: ProjectDetail | null;
  nextProject: ProjectDetail | null;
}

export default function CaseStudyClient({ project, prevProject, nextProject }: Props) {
  const color = project.color || "#26A69A";
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
      <FloatingBackButton />
      <main className="min-h-screen [background:var(--bg-primary)]">
      {/* ── Hero ── */}
      <div className="relative h-[92vh] overflow-hidden">
        {/* Cover image */}
        {project.cover && (
          <>
            <SafeImage
              src={project.cover}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent" />
            <div
              className="absolute inset-0 mix-blend-color opacity-20"
              style={{ background: color }}
            />
          </>
        )}

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
              className="font-montserrat font-bold [color:var(--fg)]leading-[0.95]"
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
      <section className="border-b [border-color:var(--border-subtle)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-0 py-10 lg:py-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
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
                <div key={i}>
                  <div className="text-[9px] uppercase tracking-[3px] [color:var(--fg-30)] mb-1">
                    {m.label}
                  </div>
                  <div className="[color:var(--fg-70)] text-sm">{m.value}</div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── Case study sections ── */}
      {project.caseStudy?.map((section, i) => (
        <Section key={i} section={section} color={color} onImageClick={setLightboxImage} />
      ))}

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
            href="/"
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
