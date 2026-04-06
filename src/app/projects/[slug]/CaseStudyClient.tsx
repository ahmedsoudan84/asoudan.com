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
  return bg === "light"
    ? "bg-white/[0.03] border-t border-b border-white/5"
    : "bg-transparent";
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
        className="text-[9px] font-semibold uppercase tracking-[4px]"
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
    <h2 className="font-montserrat font-bold text-white mb-6 text-2xl lg:text-4xl leading-tight">
      {heading}
    </h2>
  );
}

/* ─── TL;DR ─── */
function TldrSection({ section, color }: { section: CaseStudySection; color: string }) {
  return (
    <section className={cls("py-16 lg:py-24 border-t border-white/5", sectionBg(section.bg))}>
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
                  <p className="text-white/60 text-base leading-relaxed">{b}</p>
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
            <p className="text-white/60 text-base lg:text-lg leading-relaxed">{section.body}</p>
          )}
          {section.bullets && (
            <ul className="space-y-3 mt-4">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  <p className="text-white/60 leading-relaxed">{b}</p>
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
            <p className="text-white/30 text-sm mt-3 text-center">{section.caption}</p>
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
        <div className="relative w-full" style={{ aspectRatio: "16/7" }}>
          <SafeImage
            src={resolveImage(section.image!).src}
            alt={section.caption || "Full width image"}
            fill
            className="object-cover"
          />
        </div>
        {section.caption && (
          <p className="text-white/30 text-sm mt-3 text-center px-6">{section.caption}</p>
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
                  <p className="text-white/30 text-sm mt-2 text-center">{section.caption}</p>
                )}
              </div>
            )}
            <div className="w-full lg:w-1/2">
              <SectionLabel label={section.label} color={color} />
              <SectionHeading heading={section.heading} />
              {section.body && (
                <p className="text-white/60 leading-relaxed">{section.body}</p>
              )}
              {section.bullets && (
                <ul className="space-y-3 mt-4">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-2 w-1 h-1 rounded-full shrink-0"
                        style={{ background: color }}
                      />
                      <p className="text-white/60 text-sm leading-relaxed">{b}</p>
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
    <section className={cls("py-16 lg:py-24 border-t border-b border-white/5", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          {section.stats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {section.stats.map((s, i) => (
                <div key={i}>
                  <div
                    className="font-montserrat font-bold text-4xl lg:text-5xl mb-2"
                    style={{ color }}
                  >
                    {s.value}
                  </div>
                  <div className="text-white/60 text-sm">{s.label}</div>
                  {s.note && <div className="text-white/30 text-xs mt-1">{s.note}</div>}
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
              className="font-montserrat font-bold text-2xl lg:text-3xl text-white leading-snug border-l-2 pl-6"
              style={{ borderColor: color }}
            >
              &ldquo;{section.quote}&rdquo;
            </blockquote>
          )}
          {section.attribution && (
            <p className="text-white/40 text-sm mt-4 pl-6">{section.attribution}</p>
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
                    <div className="font-montserrat font-bold text-white text-sm leading-tight mt-1">
                      {step.title}
                    </div>
                    <div className="text-white/40 text-xs leading-relaxed mt-1">
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
            <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-white/10" />
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
                      className="relative w-2.5 h-2.5 rounded-full border-2 border-white/80" 
                      style={{ 
                        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                        boxShadow: `0 0 10px ${color}60` 
                      }} 
                    />
                  </div>
                  {/* Content */}
                  <div className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <div className="text-[10px] font-semibold uppercase tracking-[2px]" style={{ color }}>
                      {step.phase}
                    </div>
                    <div className="font-montserrat font-bold text-white text-sm leading-tight mt-1">
                      {step.title}
                    </div>
                    <div className="text-white/40 text-xs leading-relaxed mt-1">
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
                  <div className="flex justify-between text-sm text-white/60 mb-1.5">
                    <span>{item.label}</span>
                    <span style={{ color }}>{item.value}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
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
                    <p className="text-white/30 text-xs mt-1">{item.note}</p>
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
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black">
            <video
              src={section.videoSrc}
              controls
              className="w-full h-full object-cover"
            />
          </div>
          {section.caption && (
            <p className="text-white/30 text-sm mt-3 text-center">{section.caption}</p>
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
            className="rounded-2xl overflow-hidden border border-white/10"
            style={{
              boxShadow:
                "0 25px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            {/* Browser chrome */}
            <div className="bg-[#1a1c26] px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white/5 rounded-md h-5 px-3 flex items-center">
                  <span className="text-white/20 text-[10px]">oxfordenglishhub.com</span>
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
            <p className="text-white/30 text-sm mt-3 text-center">{section.caption}</p>
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
              background: section.showcaseBg || "#0a0c14",
              boxShadow:
                "0 25px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            <div className="p-4 lg:p-6">
              <SafeImage
                src={resolveImage(section.image!).src}
                alt={section.caption || section.heading || "Showcase"}
                width={1200}
                height={800}
                className="w-full rounded-lg"
              />
            </div>
          </div>
          {section.caption && (
            <p className="text-white/30 text-sm mt-3 text-center">{section.caption}</p>
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
                return (
                  <div 
                    key={i} 
                    className="relative rounded-xl overflow-hidden bg-[#0f1729] border border-white/[0.08] cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_0_30px_-8px_rgba(0,0,0,0.5)] group"
                    onClick={() => onImageClick?.(resolved.src)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                    <div className="aspect-video relative">
                      <SafeImage
                        src={resolved.src}
                        alt={resolved.alt}
                        fill
                        className="object-contain"
                      />
                    </div>
                    {('label' in resolved) && resolved.label && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-3 px-3">
                        <p className="text-white/70 text-xs text-center font-medium">{resolved.label}</p>
                      </div>
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
    <section className={cls("py-16 lg:py-24 border-t border-white/5", sectionBg(section.bg))}>
      <div className="max-w-3xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          {section.body && (
            <p className="text-white/60 text-lg leading-relaxed">{section.body}</p>
          )}
          {section.bullets && (
            <ul className="space-y-4 mt-6">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  <p className="text-white/60 leading-relaxed">{b}</p>
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
                <p className="text-white/60 leading-relaxed">{section.body}</p>
              )}
              {section.bullets && (
                <ul className="space-y-3 mt-4">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-2 w-1 h-1 rounded-full shrink-0"
                        style={{ background: color }}
                      />
                      <p className="text-white/60 text-sm leading-relaxed">{b}</p>
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
                <p className="text-white/30 text-sm mt-2 text-center">{section.caption}</p>
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
                  <p className="text-white/30 text-xs mt-2 text-center">{section.caption}</p>
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
                  <p className="text-white/30 text-xs mt-2 text-center">{section.caption2}</p>
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
  const canvasItems = [
    { num: "01", label: "Problem", items: ["Users in both T&L and Assessment Orgs hit an invisible wall", "Two separate interfaces, no shared context"] },
    { num: "02", label: "Solution", items: ["Unified navigation", "Shared context switching", "Consistent UI"] },
    { num: "03", label: "Users", items: ["Students in both orgs", "Org Admins", "Class Admins"] },
    { num: "04", label: "Metrics", items: ["T&L adoption of OPT", "User satisfaction", "Reduced support tickets"] },
    { num: "05", label: "Hypothesis", items: ["Seamless navigation reduces friction", "Unified view increases engagement", "Clear context improves orientation"] },
    { num: "06", label: "Assumptions", items: ["Users want single sign-on", "Orgs will share data", "Navigation is the root cause"] },
  ];
  return (
    <section className={cls("py-16 lg:py-24", sectionBg(section.bg))}>
      <div className="max-w-5xl mx-auto px-6 lg:px-0">
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
            {canvasItems.map((item, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-white/80">{item.num}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>{item.label}</span>
                </div>
                <ul className="space-y-1">
                  {item.items.map((txt, j) => (
                    <li key={j} className="text-white/50 text-xs">{txt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {section.body && <p className="text-white/60 mt-6 text-sm">{section.body}</p>}
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
                <div className="font-bold text-white mb-3">{r.role}</div>
                <ul className="space-y-2">
                  {r.items.map((item, j) => (
                    <li key={j} className="text-white/70 text-sm flex gap-2">
                      <span style={{ color: r.color }}>•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {section.caption && <p className="text-white/30 text-sm mt-4 text-center">{section.caption}</p>}
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
                className="rounded-xl p-5 border transition-all duration-300 hover:border-white/20"
                style={{ 
                  borderColor: color + '30',
                  background: `linear-gradient(135deg, ${color}08, ${color}12)`,
                  boxShadow: `0 4px 20px -4px ${color}20`
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color }}>{note.icon}</span>
                  <div className="font-semibold text-white text-sm">{note.title}</div>
                </div>
                <p className="text-white/60 text-xs leading-relaxed pl-5">{note.desc}</p>
              </div>
            ))}
          </div>
          {section.caption && <p className="text-white/30 text-sm mt-4 text-center">{section.caption}</p>}
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
            <p className="text-white/60 leading-relaxed mb-6">{section.body}</p>
          )}
          {section.bullets && (
            <ul className="space-y-3">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                  <p className="text-white/60 text-sm leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
          )}
          {section.image && (
            <div className="mt-8 relative rounded-2xl overflow-hidden bg-[#0a0c14] p-4 lg:p-6">
              <SafeImage
                src={resolveImage(section.image!).src}
                alt={typeof section.image === "string" ? (section.caption || section.heading || "") : (section.image?.alt || section.caption || section.heading || "")}
                width={1200}
                height={700}
                className="w-full rounded-xl"
              />
              {section.caption && (
                <p className="text-white/30 text-sm mt-2 text-center">{section.caption}</p>
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
        <Reveal>
          <SectionLabel label={section.label} color={color} />
          <SectionHeading heading={section.heading} />
          {section.personas && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {personas.map((persona, i) => (
                  <div
                    key={i}
                    className={cls(
                      "rounded-3xl border transition-all duration-300",
                      expandedPersona === i
                        ? "border-white/20 bg-white/[0.07]"
                        : "border-white/10 bg-white/[0.03]"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedPersona(expandedPersona === i ? null : i)}
                      className="w-full text-left p-6 lg:p-8"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        {persona.avatar && (
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5">
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
                          <div className="font-montserrat font-bold text-white text-lg">
                            {persona.name}
                          </div>
                          {persona.role && (
                            <div className="text-xs uppercase tracking-wider text-white/40" style={{ color }}>
                              {persona.role}
                            </div>
                          )}
                        </div>
                      </div>
                      {persona.context && (
                        <p className="text-white/50 text-sm leading-relaxed">{persona.context}</p>
                      )}
                    </button>
                    {expandedPersona === i && persona.painPoints && (
                      <div className="px-6 lg:px-8 pb-6 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-wider text-white/30 mb-2 mt-4">
                          Pain points
                        </div>
                        <ul className="space-y-2">
                          {persona.painPoints.map((item, idx) => (
                            <li key={idx} className="text-white/50 text-sm leading-relaxed flex gap-2">
                              <span style={{ color }}>•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        {persona.goals && (
                          <div className="mt-4">
                            <div className="text-[10px] uppercase tracking-wider text-white/30 mb-2">
                              Goals
                            </div>
                            <ul className="space-y-2">
                              {persona.goals.map((goal, idx) => (
                                <li key={idx} className="text-white/50 text-sm leading-relaxed flex gap-2">
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
            </>
          )}
        </Reveal>
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
  }
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
    <main className="min-h-screen bg-[#0a0c14]">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] via-[#0a0c14]/60 to-transparent" />
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
              className="font-montserrat font-bold text-white leading-[0.95]"
              style={{ fontSize: "clamp(44px, 8vw, 100px)" }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-montserrat text-white/30 mt-3"
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
          <span className="text-[9px] uppercase tracking-[3px] text-white/20">Scroll</span>
        </div>
      </div>

      {/* ── Project metadata ── */}
      <section className="border-b border-white/5">
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
                  <div className="text-[9px] uppercase tracking-[3px] text-white/30 mb-1">
                    {m.label}
                  </div>
                  <div className="text-white/70 text-sm">{m.value}</div>
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
        <section className="border-t border-white/5 py-16 px-6 lg:px-20">
          <div className="max-w-5xl mx-auto flex justify-between items-start gap-8">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col gap-2 max-w-[45%]"
              >
                <span className="text-[9px] uppercase tracking-[3px] text-white/30 flex items-center gap-2">
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
                <span className="font-montserrat font-bold text-white group-hover:text-white/70 transition-colors">
                  {prevProject.title}
                </span>
                <span className="text-white/30 text-sm">{prevProject.subtitle}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col gap-2 text-right max-w-[45%]"
              >
                <span className="text-[9px] uppercase tracking-[3px] text-white/30 flex items-center gap-2 justify-end">
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
                <span className="font-montserrat font-bold text-white group-hover:text-white/70 transition-colors">
                  {nextProject.title}
                </span>
                <span className="text-white/30 text-sm">{nextProject.subtitle}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      )}

      {/* ── Back to work ── */}
      <section className="py-12 px-6 lg:px-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-white/30 hover:text-white/70 transition-colors text-sm group"
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
            className="absolute top-4 right-4 text-white/60 hover:text-white text-4xl"
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
  );
}
