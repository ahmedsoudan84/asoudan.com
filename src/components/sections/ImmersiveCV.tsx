"use client";

import { useRef, useEffect, useState, Fragment, useMemo } from "react";
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

/* ─── data ─────────────────────────────────────────────────────── */

const jobs = [
  {
    role: "Digital Product Designer",
    company: "Oxford University Press",
    period: "2022 — 2025",
    location: "Oxford, England, United Kingdom",
    highlights: [
      "Maintained and enhanced a sustainable design system serving multiple product teams across Oxford English Hub — OUP's largest ELT platform",
      "Worked in agile cross-functional squads to ship features from discovery through to production release",
      "Conducted usability tests using Maze and moderated live sessions, synthesising findings into actionable design improvements",
      "Led end-to-end projects from discovery/define phase through iterative design sprints to final handoff and production QA",
      "Collaborated closely with product managers, engineers, and content specialists to align design decisions with business and learner outcomes",
      "Championed accessibility standards and responsive design patterns across the platform",
    ],
    collapsedCount: 4,
  },
  {
    role: "Senior UX/UI Designer",
    company: "Reward Lion",
    period: "2020 — 2022",
    location: "United States (Remote)",
    highlights: [
      "Boosted revenue growth by 14% through a user interview-driven redesign of the core product experience",
      "Drove 137% increase in annual revenue by designing and launching new platform verticals from zero to market",
      "Reduced bounce rate by 8% through data-informed landing page optimisation and improved onboarding flows",
      "Achieved 90% positive feedback across 25 completed projects through systematic user testing and iteration",
      "Established a component library and design guidelines that accelerated the team's delivery velocity",
    ],
    collapsedCount: 4,
  },
  {
    role: "UX/UI & Visual Designer",
    company: "Salam Software",
    period: "2017 — 2020",
    location: "Denmark / Serbia",
    highlights: [
      "Developed user-friendly mobile app concepts from initial research through high-fidelity prototypes",
      "Collaborated with front-end and back-end developers on websites and mobile applications",
      "Won two logo design competitions showcasing strong visual identity and branding skills",
      "Created marketing collateral and brand guidelines for multiple client accounts",
    ],
    collapsedCount: 3,
  },
  {
    role: "Architect",
    company: "Soudan Engineering & Consulting",
    period: "2013 — 2017",
    location: "Alexandria, Egypt",
    highlights: [
      "Delivered user-centric architectural projects combining functional design with aesthetic vision",
      "Increased revenue by 24% through client recommendations and repeat business",
      "Worked closely with site engineers to ensure accurate design implementation and quality control",
    ],
    collapsedCount: 3,
  },
  {
    role: "Graphic Designer",
    company: "Various Companies",
    period: "2010 — 2013",
    location: "Alexandria, Egypt",
    highlights: [
      "Created a widely distributed city booklet that became a key tourism marketing asset",
      "Designed over 50 logos for clients across industries — hospitality, retail, tech, and education",
      "Contributed to successful marketing campaigns spanning print, digital, and outdoor media",
    ],
    collapsedCount: 3,
  },
  {
    role: "Freelance Web & Brand Designer",
    company: "Freelancer.com",
    period: "2007 — 2010",
    location: "Remote",
    highlights: [
      "Maintained a 4.6/5 rating while serving 30+ clients across web design, branding, and print",
      "Built a network of long-term clients through consistent quality and reliable delivery",
    ],
    collapsedCount: 2,
  },
];

const designSkills = [
  {
    name: "Design Systems",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    name: "User Research",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <circle cx="11" cy="8" r="2" />
        <path d="M7 14c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" />
      </svg>
    ),
  },
  {
    name: "Usability Testing",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    name: "Wireframing",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    name: "Prototyping",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    name: "Interaction Design",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3l14 9-14 9V3z" />
        <path d="M19 12h2" />
        <circle cx="22" cy="12" r="1" />
      </svg>
    ),
  },
  {
    name: "Responsive Design",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    name: "Accessibility",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="4" r="2" />
        <path d="M4 8h16" />
        <path d="M12 8v6" />
        <path d="M8 20l4-6 4 6" />
      </svg>
    ),
  },
  {
    name: "Agile / Scrum",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 2.1l4 4-4 4" />
        <path d="M3 12.2v-2a4 4 0 014-4h12.8" />
        <path d="M7 21.9l-4-4 4-4" />
        <path d="M21 11.8v2a4 4 0 01-4 4H4.2" />
      </svg>
    ),
  },
  {
    name: "Design Thinking",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
      </svg>
    ),
  },
  {
    name: "Art Direction",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: "Information Architecture",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" />
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="12" r="2" />
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
        <line x1="12" y1="7" x2="6" y2="10" />
        <line x1="12" y1="7" x2="18" y2="10" />
        <line x1="6" y1="14" x2="6" y2="17" />
        <line x1="18" y1="14" x2="18" y2="17" />
      </svg>
    ),
  },
];

/* Tool logo types: "cdn" uses Simple Icons CDN, "svg" uses an inline SVG */
type ToolEntry =
  | { name: string; type: "cdn"; slug: string }
  | { name: string; type: "svg"; svg: React.ReactNode };

/* Inline SVGs for tools not on Simple Icons (Adobe suite removed for legal reasons) */
const adobeSvg = (letters: string) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="12" y="18" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="700" fontFamily="Montserrat, sans-serif" letterSpacing="-0.05em">{letters}</text>
  </svg>
);

const tools: ToolEntry[] = [
  { name: "Figma", type: "cdn", slug: "figma" },
  { name: "Sketch", type: "cdn", slug: "sketch" },
  { name: "Adobe XD", type: "svg", svg: adobeSvg("Xd") },
  { name: "Photoshop", type: "svg", svg: adobeSvg("Ps") },
  { name: "Illustrator", type: "svg", svg: adobeSvg("Ai") },
  { name: "After Effects", type: "svg", svg: adobeSvg("Ae") },
  { name: "InDesign", type: "svg", svg: adobeSvg("Id") },
  { name: "InVision", type: "svg", svg: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="12" y="18" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="700" fontFamily="Montserrat, sans-serif" letterSpacing="-0.05em">In</text>
    </svg>
  )},
  { name: "Miro", type: "cdn", slug: "miro" },
  { name: "Maze", type: "cdn", slug: "maze" },
  { name: "Jira", type: "cdn", slug: "jira" },
  { name: "Confluence", type: "cdn", slug: "confluence" },
  { name: "HTML5", type: "cdn", slug: "html5" },
  { name: "CSS3", type: "cdn", slug: "css" },
  { name: "Tailwind CSS", type: "cdn", slug: "tailwindcss" },
  { name: "React", type: "cdn", slug: "react" },
  { name: "3ds Max", type: "svg", svg: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="12" y="17" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="700" fontFamily="Montserrat, sans-serif" letterSpacing="-0.05em">3ds</text>
    </svg>
  )},
  { name: "AutoCAD", type: "cdn", slug: "autodesk" },
];

const stats = [
  { value: 20, label: "Years of Experience" },
  { value: 300, label: "Projects", suffix: "+" },
  { value: 100, label: "Clients", suffix: "+" },
];

const certs = [
  { name: "Google UX Design Certificate", org: "Google" },
  { name: "Interaction Design Foundation", org: "IxDF" },
  { name: "Nielsen Norman Group UX", org: "NN/g" },
  { name: "Agile & Scrum Certified", org: "Scrum.org" },
  { name: "RIBA Part 1", org: "Royal Institute of British Architects" },
  { name: "Designing iOS and Android Apps", org: "LinkedIn Learning" },
  { name: "Interaction Design: Structure", org: "LinkedIn Learning" },
  { name: "User Experience for Web Design", org: "LinkedIn Learning" },
  { name: "Super Mentor", org: "ADPList" },
];

/* ─── counter hook ─────────────────────────────────────────────── */

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      start = Math.floor(eased * end);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return { ref, count };
}

/* ─── variants ─────────────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const highlightItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const skillPill: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

/* ─── timeline entry ───────────────────────────────────────────── */

function TimelineEntry({
  job,
  index,
}: {
  job: (typeof jobs)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);

  const needsSeeMore = job.highlights.length > job.collapsedCount;
  const visibleHighlights = expanded
    ? job.highlights
    : job.highlights.slice(0, job.collapsedCount);

  return (
    <div ref={cardRef} className="relative grid grid-cols-[20px_1fr] md:grid-cols-[140px_20px_1fr] gap-x-3 md:gap-x-6">
      {/* period label — desktop only */}
      <motion.div
        variants={fadeLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="hidden md:flex items-start pt-2 justify-end"
      >
        <span className="text-xs tracking-wider whitespace-nowrap text-right" style={{ color: "var(--accent)" }}>
          {job.period}
        </span>
      </motion.div>

      {/* timeline spine */}
      <div className="relative flex flex-col items-center col-start-1 md:col-start-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          className="relative z-10 w-3.5 h-3.5 rounded-full mt-2"
          style={{ backgroundColor: "#3D9B9B", boxShadow: "0 0 12px rgba(61,155,155,0.5)" }}
        />
        {index < jobs.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="w-px flex-1 origin-top"
            style={{ backgroundColor: "rgba(61,155,155,0.2)" }}
          />
        )}
      </div>

      {/* card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="relative rounded-xl p-5 md:p-6 mb-10 overflow-hidden col-start-2 md:col-start-3"
        style={{ backgroundColor: "var(--bg-surface)" }}
      >
        {/* teal left border */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="absolute left-0 top-0 w-[3px] h-full origin-top"
          style={{ backgroundColor: "#3D9B9B" }}
        />

        {/* period — mobile only */}
        <span className="block md:hidden text-xs tracking-wider mb-2" style={{ color: "var(--accent)" }}>
          {job.period}
        </span>

        <h3 className="text-lg md:text-xl font-bold" style={{ color: "var(--fg)" }}>{job.role}</h3>
        <p className="text-sm mt-1" style={{ color: "#3D9B9B" }}>
          {job.company}
        </p>
        <p className="text-xs mt-0.5 mb-4" style={{ color: "var(--fg-30)" }}>
          {job.location}
        </p>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-2"
        >
          {visibleHighlights.map((h, i) => (
            <motion.li
              key={i}
              variants={highlightItem}
              className="flex items-start gap-2 text-sm"
              style={{ color: "var(--fg-60)" }}
            >
              <span
                className="mt-1.5 block w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "#3D9B9B" }}
              />
              {h}
            </motion.li>
          ))}
        </motion.ul>

        {needsSeeMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-xs font-medium uppercase tracking-[2px] transition-colors duration-300 hover:opacity-80"
            style={{ color: "var(--accent)" }}
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </motion.div>
    </div>
  );
}

/* ─── stat card ────────────────────────────────────────────────── */

function StatCard({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const { ref, count } = useCountUp(value, 2000);
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-4 w-full sm:w-auto sm:min-w-[140px]">
      <span
        ref={ref}
        className="text-4xl md:text-5xl font-bold leading-none"
        style={{ color: "var(--accent)" }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="text-sm mt-3 tracking-wider uppercase leading-snug max-w-[10ch]"
        style={{ color: "var(--fg-40)" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── mentoring counter ────────────────────────────────────────── */

function MentoringCounter({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const { ref, count } = useCountUp(value, 2500);
  return (
    <div className="text-center">
      <span
        ref={ref}
        className="text-3xl md:text-4xl font-bold block"
        style={{ color: "var(--accent)" }}
      >
        {count.toLocaleString()}
      </span>
      <span className="text-sm mt-1 block" style={{ color: "var(--fg-40)" }}>{label}</span>
    </div>
  );
}

/* ─── main component ───────────────────────────────────────────── */

export default function ImmersiveCV() {
  useTheme();
  const logoColor = "3D9B9B";
  const skillDelays = useMemo(() => designSkills.map((_, i) => i * 0.1), []);
  const toolDelays = useMemo(() => tools.map((_, i) => i * 0.08), []);

  return (
    <section
      id="cv"
      className="font-montserrat relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        {/* ── section header ────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-[56px] font-bold theme-text leading-tight">
            Experience
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="h-[3px] w-24 mt-6 origin-left rounded-full"
            style={{ backgroundColor: "#3D9B9B" }}
          />
        </motion.div>

        {/* ── timeline ──────────────────────────────────────── */}
        <div className="relative">
          {jobs.map((job, i) => (
            <TimelineEntry key={i} job={job} index={i} />
          ))}
        </div>

        {/* ── skills ────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mt-24"
        >
          <h3 className="text-2xl md:text-3xl font-bold theme-text mb-8">
            Skills
          </h3>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {designSkills.map((skill, i) => (
              <motion.span
                key={skill.name}
                variants={skillPill}
                transition={{
                  duration: 0.4,
                  delay: skillDelays[i],
                }}
                whileHover={{
                  backgroundColor: "rgba(61,155,155,0.1)",
                  borderColor: "#3D9B9B",
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border cursor-default transition-colors"
                style={{ borderColor: "var(--border-card)", color: "var(--fg-60)" }}
              >
                <span style={{ color: "var(--accent)" }}>{skill.icon}</span>
                {skill.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── tools ─────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mt-24"
        >
          <h3 className="text-2xl md:text-3xl font-bold theme-text mb-8">
            Tools
          </h3>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {tools.map((tool, i) => (
              <motion.span
                key={tool.name}
                variants={skillPill}
                transition={{
                  duration: 0.4,
                  delay: toolDelays[i],
                }}
                whileHover={{
                  backgroundColor: "rgba(61,155,155,0.1)",
                  borderColor: "#3D9B9B",
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border cursor-default transition-colors"
                style={{ borderColor: "var(--border-card)", color: "var(--fg-60)" }}
              >
                {tool.type === "cdn" ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={`https://cdn.simpleicons.org/${tool.slug}/${logoColor}`}
                    alt={tool.name}
                    width={16}
                    height={16}
                    loading="lazy"
                    className="shrink-0"
                  />
                ) : (
                  <span className="shrink-0 inline-flex items-center justify-center" style={{ color: `#${logoColor}`, width: 16, height: 16 }}>
                    {tool.svg}
                  </span>
                )}
                {tool.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── stats banner ──────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mt-24 rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-stretch justify-center"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid rgba(61,155,155,0.15)",
          }}
        >
          {stats.map((stat, i) => (
            <Fragment key={stat.label}>
              {i > 0 && (
                <>
                  <div
                    className="hidden sm:block w-px mx-6 self-stretch"
                    style={{ backgroundColor: "rgba(61,155,155,0.3)" }}
                  />
                  <div
                    className="block sm:hidden h-px w-24 my-6"
                    style={{ backgroundColor: "rgba(61,155,155,0.3)" }}
                  />
                </>
              )}
              <StatCard
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
              />
            </Fragment>
          ))}
        </motion.div>

        {/* ── education & certs ─────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mt-24"
        >
          <h3 className="text-2xl md:text-3xl font-bold theme-text mb-8">
            Education &amp; Certifications
          </h3>

          <div
            className="rounded-2xl p-6 md:p-8 backdrop-blur-md"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-card)",
            }}
          >
            <h4 className="text-lg font-bold theme-text">
              Arab Academy for Science, Technology &amp; Maritime Transport
            </h4>
            <p className="text-sm mt-1" style={{ color: "#3D9B9B" }}>
              Bachelor&apos;s of Architectural Engineering
            </p>
            <p className="text-xs mt-0.5 mb-6" style={{ color: "var(--fg-30)" }}>
              2002 — 2010
            </p>

            <h5 className="text-sm font-semibold uppercase tracking-[2px] mb-4" style={{ color: "var(--fg-50)" }}>
              Certifications
            </h5>
            <div className="flex flex-wrap gap-2">
              {certs.map((cert) => (
                <span
                  key={cert.name}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{
                    color: "var(--fg-60)",
                    backgroundColor: "rgba(61,155,155,0.08)",
                    border: "1px solid rgba(61,155,155,0.2)",
                  }}
                >
                  {cert.name}
                  <span className="ml-1.5 opacity-50">· {cert.org}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── mentoring banner ──────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mt-24 rounded-2xl p-8 md:p-10 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(61,155,155,0.25) 0%, rgba(61,155,155,0.08) 50%, var(--bg-surface) 100%)",
            border: "1px solid rgba(61,155,155,0.35)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 40px rgba(61,155,155,0.06)",
          }}
        >
          <h3 className="text-2xl md:text-3xl font-bold theme-text mb-2">
            ADPList Super Mentor
          </h3>
          <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "var(--fg-40)" }}>
            Giving back to the design community through dedicated mentoring sessions
          </p>

          <div className="flex items-center justify-center gap-8 md:gap-16">
            <MentoringCounter value={7635} label="Minutes Mentored" />
            <div
              className="w-px h-12"
              style={{ backgroundColor: "rgba(61,155,155,0.3)" }}
            />
            <MentoringCounter value={82} label="Reviews" />
          </div>

          <a
            href="https://adplist.org/mentors/ahmed-soudan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 mt-8 px-6 py-3 rounded-full text-[12px] font-semibold uppercase tracking-[2px] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent)]/20 hover:border-[var(--accent)]/60 hover:shadow-[0_8px_30px_-10px_rgba(var(--accent-rgb),0.4)]"
            style={{
              color: "var(--accent)",
              border: "1px solid rgba(var(--accent-rgb), 0.35)",
              background: "rgba(var(--accent-rgb), 0.1)",
            }}
          >
            Book a session
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12L12 4M12 4H6M12 4v6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
