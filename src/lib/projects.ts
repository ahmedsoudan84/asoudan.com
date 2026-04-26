export interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/* Image reference — can be a plain URL string or an object with src + alt */
export type ImageRef = string | { src: string; alt: string; darkSrc?: string };

/* Screen item — used in screen-gallery sections */
export type ScreenItem = ImageRef | { image: ImageRef; label?: string };

/* ── Case study storytelling sections ── */
export interface CaseStudySection {
  type:
    | "text"
    | "image"
    | "split"
    | "stats"
    | "quote"
    | "fullwidth-image"
    | "tldr"
    | "timeline"
    | "video"
    | "browser-frame"
    | "research-chart"
    | "showcase"
    | "screen-gallery"
    | "reflection"
    | "process-step"
    | "image-pair"
    | "lean-ux-canvas"
    | "persona-cards"
    | "role-matrix"
    | "constraint-notes"
    | "user-role-matrix"
    | "possible-solutions"
    | "org-architecture"
    | "nav-proposals"
    | "concept-model"
    | "horizontal-scroll-gallery"
    | "panorama"
    | "component-specification"
    | "component-showcase"
    | "component-gallery"
    | "component-fragments";
   category?: string;
   label?: string;
   heading?: string;
   body?: string;
   notes?: string;
   bullets?: string[];
   image?: ImageRef;
  image2?: ImageRef;
  caption?: string;
  caption2?: string;
  imagePosition?: "left" | "right";
  bg?: "dark" | "light" | "accent";
  videoSrc?: string;
  quote?: string;
  attribution?: string;
  showcaseBg?: string;
  cropViewBox?: string;
  svgNaturalWidth?: number;
  svgNaturalHeight?: number;
  screens?: ScreenItem[];
  columns?: number;
  componentName?: string;
  fragments?: Array<{
    title: string;
    subtitle?: string;
    imageSrc: string;
    invertInDarkMode?: boolean;
    description?: string;
    annotations?: Array<{
      label: string;
      x: number;
      y: number;
    }>;
  }>;
  components?: Array<{
    type: "tablist" | "tabbutton" | "progress-ring" | "skill-card" | "list-item" | "product-card";
    label?: string;
  }>;
  galleryComponents?: Array<{
    id: string;
    toggleLabel: string;
    label?: string;
    heading?: string;
    body?: string;
    caption?: string;
    image: ImageRef;
    showcaseBg?: string;
    cropViewBox?: string;
    svgNaturalWidth?: number;
    svgNaturalHeight?: number;
  }>;
  specifications?: Array<{
    title: string;
    body: string;
    bullets?: string[];
  }>;
  stepNumber?: number | string;
  personas?: Array<{
    name: string;
    role?: string;
    quote?: string;
    goals?: string[];
    frustrations?: string[];
    painPoints?: string[];
    context?: string;
    avatar?: string;
  }>;
  stats?: Array<{ value: string; label: string; note?: string; context?: string }>;
  timelineSteps?: Array<{
    phase: string;
    title: string;
    description: string;
  }>;
  chartItems?: Array<{ label: string; value: number; note?: string; total?: number; color?: string }>;
  chartLayout?: string;
  mode?: "progress-ring" | "tab-list" | "tab-button" | "skill-card" | "product-card" | "any";
}

export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  number: string;
  description: string;
  tags: string[];
  color: string;
  cover: string;
  /**
   * How the cover renders inside the carousel card:
   * - "fill" (default): object-cover, image fills the frame — good for photo/artwork compositions
   * - "browser": desktop screenshot is framed in a macOS-style browser chrome and floats on the tinted bg
   * - "phone": mobile screen in a phone chrome
   * - "contain": image is object-contain with padding against the tinted bg — good for pre-composed artwork or low-res tiles that shouldn't be upscaled
   */
  coverStyle?: "fill" | "browser" | "phone" | "contain";
  images: ProjectImage[];
  behanceUrl: string;
  employer?: string;
  role?: string;
  timeline?: string;
  team?: string;
  tools?: string;
  platform?: string;
  hidden?: boolean;
  caseStudy?: CaseStudySection[];
}

export const projectsData: ProjectDetail[] = [
  {
    "id": "org-reports",
    "slug": "org-reports",
    "title": "Org level reports",
    "subtitle": "Oxford English Hub",
    "category": "PRODUCT DESIGN",
    "number": "00",
    "description": "Defined a streamlined product direction balancing scalability with immediate value for admins generating Org-level grades.",
    "tags": [
      "Product Design",
      "User Journey Mapping",
      "UX Research",
      "Testing"
    ],
    "color": "#3D9B9B",
    "cover": "/images/projects/org-reports/org-reports-cover.png",
    "coverStyle": "browser",
    "images": [
      {
        "src": "/images/projects/org-reports/org-reports-cover.png",
        "alt": "Org Level Reports Cover"
      }
    ],
    "behanceUrl": "",
    "employer": "Oxford University Press",
    "role": "Product design, User journey mapping, UX research & Testing",
    "timeline": "20 weeks",
    "team": "Cross-functional team",
    "tools": "Figma, Miro, Maze",
    "platform": "Web",
    "caseStudy": [
      {
        "type": "tldr",
        "label": "Context",
        "heading": "Problem Statement & Foundation",
        "bullets": [
          "Org admins use Org reports currently on VST to calculate end-of-term grades for students, typically making up between 10-30% of their final grade.",
          "Occasionally, admin reports are downloaded to retrieve a list of student UUIDs to match platform progress records with institution’s master systems, using third-party software linking the UUID back to the student."
        ],
        "bg": "light"
      },
      {
        "type": "quote",
        "quote": "If our integration fails to match UUIDs, we have hundreds of blank grades and no graceful fallback.",
        "attribution": "— Key Admin Stakeholder, VST Platform",
        "bg": "dark"
      },
      {
        "type": "split",
        "label": "Constraints & Assumptions",
        "heading": "Product Direction Parameters",
        "body": "Before moving to high-fidelity design, several key assumptions and MVP requirements had to be validated to shape the reporting logic.",
        "bullets": [
          "**MVP 1:** Based upon VST functionality — download a basic Excel doc containing information about multiple classes (supporting market needs for Link It and Brighter Ideas).",
          "**MVP 2:** An area in the Org to house the download button.",
          "**MVP 3:** Customization options: classes, products (informed by selected classes), fractions/percentages, first/latest attempt.",
          "**Assumption 1:** A limit on the number of classes/products may be needed so the Excel file remains manageable.",
          "**Assumption 2:** The MVP approach is to email the Excel file rather than a direct UI download, avoiding pending state UI complexities.",
          "**Assumption 3:** The output spreadsheet will be raw data with no styling."
        ]
      },
      {
        "type": "timeline",
        "label": "Process",
        "heading": "Discovery to Delivery",
        "timelineSteps": [
          { "phase": "Weeks 1-4", "title": "Discovery", "description": "Analyzing VST reports and aligning with business KPIs." },
          { "phase": "Weeks 5-10", "title": "User Journey", "description": "Mapping admin workflows and matching student UUID criteria." },
          { "phase": "Weeks 11-16", "title": "Wireframing", "description": "Rapid prototyping of report generation and edge cases." },
          { "phase": "Weeks 17-20", "title": "Delivery", "description": "Testing, validation, and final MVP handover." }
        ]
      },
      {
        "type": "stats",
        "label": "Scale",
        "heading": "Data Validated",
        "caption": "(1/9/23–18/11/24)",
        "stats": [
          { "value": "1,140", "label": "Reports Generated" },
          { "value": "3,076", "label": "Total Admin Accounts" }
        ],
        "bg": "accent"
      },
      {
        "type": "process-step",
        "label": "Synthesis",
        "stepNumber": 1,
        "heading": "Aligning data models",
        "body": "Mapping the exact data structures exported from the legacy platform with the new capabilities provided by our unified reporting APIs."
      },
      {
        "type": "process-step",
        "label": "Execution",
        "stepNumber": 2,
        "heading": "Optimized export formatting",
        "body": "Re-engineering the final CSV outputs to correctly structure the 30% grade contributions, minimizing human error during external LMS ingestion."
      },
      {
        "type": "panorama",
        "label": "Final MVP",
        "heading": "User Journey Mapping",
        "caption": "Pinch or drag to explore the complete end-to-end admin workflow.",
        "image": { "src": "/images/projects/org-reports/journey-1.svg", "alt": "MVP User Journey", "darkSrc": "/images/projects/org-reports/User journey-dark.svg" },
        "bg": "light"
      },
      {
        "type": "panorama",
        "label": "Output",
        "heading": "Responsive Mobile Screens",
        "caption": "The journey components optimized for mobile and responsive displays.",
        "image": { "src": "/images/projects/org-reports/screen-1.svg", "alt": "Responsive Screens" },
        "bg": "dark"
      },
      {
        "type": "reflection",
        "label": "Conclusion",
        "heading": "What we learned",
        "body": "By systematically matching edge cases with the engineering squad before drawing the first wireframe, we prevented major regressions. The seamless integration of the tool proves that prioritizing 'boring' administrative workflows delivers outsized value in scale.",
        "bg": "accent"
      }
    ]
  },
  {
    "id": "learner-dashboard",
    "slug": "learner-dashboard",
    "title": "Learner Dashboard",
    "subtitle": "Oxford English Hub",
    "category": "PRODUCT DESIGN",
    "number": "01",
    "description": "Led user research and redesigned the student dashboard for Oxford English Hub — delivering a clearer, action-first experience with 'Last Opened', 'Word of the Day', and new component specs validated by 29 teachers across multiple countries.",
    "tags": [
      "Product Design",
      "UX Research",
      "User Testing",
      "Design System",
      "EdTech"
    ],
    "color": "#E8A838",
    "cover": "/images/projects/learner-dashboard/new-dashboard.png",
    "coverStyle": "browser",
    "images": [
      {
        "src": "/images/projects/learner-dashboard/new-dashboard.png",
        "alt": "Learner Dashboard — Redesigned"
      },
      {
        "src": "/images/projects/learner-dashboard/maze-test.png",
        "alt": "Learner Dashboard — Maze Testing"
      },
      {
        "src": "/images/projects/learner-dashboard/component-wotd.png",
        "alt": "Word of the Day — Component Spec"
      }
    ],
    "behanceUrl": "",
    "employer": "Oxford University Press",
    "role": "Lead Product Designer",
    "timeline": "8 weeks",
    "team": "1 Designer, 2 Engineers, 1 PM",
    "tools": "Figma, Maze, Miro",
    "platform": "Web (Responsive)",
    "caseStudy": [
      {
        "type": "tldr",
        "label": "Overview",
        "heading": "Learner Dashboard at a glance",
        "bullets": [
          "Problem: Students found the existing dashboard confusing — no clear entry point to content, no progress visibility, and teachers called the interface 'too busy'.",
          "Approach: Ran unmoderated Maze tests with 29 teachers, validated assumptions through 2 tasks + targeted questions, then redesigned around 'Last Opened' and 'Word of the Day'.",
          "Outcome: Shipped a clearer, mobile-first dashboard with 3 new components (Product Card, Resources Card, Word of the Day) and edge-case states for every lifecycle stage.",
          "Role: Led user research, redesigned the dashboard, designed and shipped new component specs."
        ],
        "bg": "dark"
      },
      {
        "type": "timeline",
        "label": "Project Timeline",
        "heading": "From research to shipped components",
        "timelineSteps": [
          {
            "phase": "Weeks 1–2",
            "title": "Problem Discovery",
            "description": "Stakeholder alignment and current-state audit"
          },
          {
            "phase": "Weeks 3–4",
            "title": "User Research",
            "description": "Maze testing with 29 teachers across multiple countries"
          },
          {
            "phase": "Weeks 5–6",
            "title": "Data Analysis",
            "description": "Synthesised findings into design priorities"
          },
          {
            "phase": "Weeks 7–8",
            "title": "Redesign & Ship",
            "description": "New dashboard, 3 component specs, edge-case states"
          }
        ],
        "bg": "dark"
      },
      {
        "type": "stats",
        "stats": [
          {
            "value": "29",
            "label": "Teachers tested via Maze",
            "context": "Multiple countries, mostly secondary level"
          },
          {
            "value": "85%",
            "label": "Students use mobile devices",
            "context": "Tablet 54%, Desktop 50%"
          },
          {
            "value": "2",
            "label": "Tasks completed + follow-up questions",
            "context": "Unmoderated usability tests"
          }
        ],
        "bg": "dark"
      },
      {
        "type": "split",
        "label": "Before",
        "heading": "A cluttered first impression",
        "body": "The existing dashboard was a flat list of classes and product codes with no clear hierarchy. Users described it as 'confusing' and 'too busy' — they couldn't quickly find their active content or understand what to do next.",
        "image": {
          "src": "/images/projects/learner-dashboard/old-dashboard.png",
          "alt": "Previous student dashboard — flat list of classes"
        },
        "imagePosition": "right",
        "caption": "The old dashboard — no clear entry point, no progress visibility",
        "bg": "light"
      },
      {
        "type": "text",
        "label": "My Role",
        "heading": "Product design · User research · Journey mapping · Component specs",
        "body": "I led user research to validate assumptions, redesigned the dashboard to deliver a clearer and more actionable student experience, and designed and shipped three new components to support the new layout.",
        "bg": "dark"
      },
      {
        "type": "video",
        "label": "Responsive Demo",
        "heading": "The redesigned dashboard in action",
        "body": "Full walkthrough of the responsive experience — desktop through mobile — showing the new 'Last Opened', 'Word of the Day', and personalised greeting.",
        "videoSrc": "/images/projects/learner-dashboard/demo.mp4",
        "caption": "Responsive dashboard demo — desktop, tablet, and mobile breakpoints",
        "bg": "dark"
      },
      {
        "type": "browser-frame",
        "label": "After",
        "heading": "Clarity-first redesign",
        "body": "The new dashboard centres on 'Last Opened' for instant content access and 'Word of the Day' for daily engagement — the two features teachers ranked most valuable in testing.",
        "image": {
          "src": "/images/projects/learner-dashboard/new-dashboard.png",
          "alt": "Redesigned student dashboard with Last Opened and Word of the Day"
        },
        "caption": "The redesigned dashboard — personalised greeting, Last Opened, and Word of the Day",
        "bg": "light"
      },
      {
        "type": "research-chart",
        "label": "Research Findings",
        "heading": "What do you want to click on first?",
        "body": "29 teachers were asked which dashboard element they'd click first. 'Word of the Day' and 'Latest Opened' dominated — validating our redesign priorities.",
        "chartItems": [
          {
            "label": "Word of the Day",
            "value": 9,
            "total": 29,
            "note": "Most clicked — daily engagement hook",
            "color": "#E8A838"
          },
          {
            "label": "Latest Opened",
            "value": 8,
            "total": 29,
            "note": "Quick resume — instant content access",
            "color": "#E8A838"
          },
          {
            "label": "Your Tasks",
            "value": 7,
            "total": 29,
            "note": "Teacher-assigned deadlines"
          },
          {
            "label": "Resources",
            "value": 1,
            "total": 29,
            "note": "Lowest priority for teachers",
            "color": "#ff6b6b"
          }
        ],
        "chartLayout": "bars",
        "bg": "dark"
      },
      {
        "type": "research-chart",
        "label": "Device Usage",
        "heading": "How students access their materials",
        "body": "Multi-select survey of 26 teachers revealed mobile-first behaviour — driving our responsive-first design approach.",
        "chartItems": [
          {
            "label": "Mobile",
            "value": 22,
            "total": 26,
            "note": "85% — primary device for most students"
          },
          {
            "label": "Tablet",
            "value": 14,
            "total": 26,
            "note": "54% — common in classroom settings"
          },
          {
            "label": "Desktop",
            "value": 13,
            "total": 26,
            "note": "50% — used at home or in labs"
          }
        ],
        "chartLayout": "donuts",
        "bg": "light"
      },
      {
        "type": "split",
        "label": "Usability Testing",
        "heading": "The version tested with 29 teachers",
        "body": "This Maze prototype was tested with teachers from multiple countries — primarily secondary level, with some primary and adult educators. Overwhelmingly positive feedback, with 'Latest Opened' and 'Word of the Day' highlighted as the most valuable additions.",
        "image": {
          "src": "/images/projects/learner-dashboard/maze-test.png",
          "alt": "Dashboard version tested in Maze with 29 teachers"
        },
        "imagePosition": "right",
        "caption": "The prototype tested in Maze — overwhelmingly positive reception",
        "bg": "dark"
      },
      {
        "type": "quote",
        "quote": "Students find it difficult to find things. They are so confused by the interface.",
        "attribution": "Teacher participant — describing the old dashboard",
        "bg": "light"
      },
      {
        "type": "showcase",
        "label": "Component Spec",
        "heading": "Product Card — anatomy, spacing, states & accessibility",
        "body": "Designed a new Product Card component with defined spacing tokens, 5 interaction states (default, hover, focus, hover+focus, responsive), ARIA patterns, and full anatomy documentation for engineering handoff.",
        "image": {
          "src": "/images/projects/learner-dashboard/component-product-card.png",
          "alt": "Product Card component specification — spacing, states, responsive layout, accessibility, and anatomy"
        },
        "caption": "Product Card spec — spacing, properties, responsive layout, ARIA, and anatomy",
        "showcaseBg": "#F8F9FA",
        "bg": "dark"
      },
      {
        "type": "showcase",
        "label": "Component Spec",
        "heading": "Resources Card — behaviour, spacing & responsive layout",
        "body": "The Resources Card surfaces supplementary learning materials. Documented card behaviour (truncation, overflow), 8 spacing variants, responsive scaling at 200% zoom, and accessibility annotations.",
        "image": {
          "src": "/images/projects/learner-dashboard/component-resources-card.png",
          "alt": "Resources Card component specification — spacing, behaviour, responsive layout, and anatomy"
        },
        "caption": "Resources Card spec — spacing variants, card behaviour, responsive layout, and anatomy",
        "showcaseBg": "#F8F9FA",
        "bg": "light"
      },
      {
        "type": "showcase",
        "label": "Component Spec",
        "heading": "Word of the Day — the daily engagement touchpoint",
        "body": "The highest-impact feature in testing. Designed with full anatomy documentation, multiple spacing contexts, responsive scaling, ARIA support, and an error state for API failures.",
        "image": {
          "src": "/images/projects/learner-dashboard/component-wotd.png",
          "alt": "Word of the Day component specification — anatomy, spacing, responsive layout, and accessibility"
        },
        "caption": "Word of the Day spec — anatomy, spacing, responsive, ARIA, and error states",
        "showcaseBg": "#FFF8E8",
        "bg": "dark"
      },
      {
        "type": "screen-gallery",
        "label": "Edge Case Design",
        "heading": "Every lifecycle stage, designed",
        "body": "Mapped each stage of the student lifecycle and designed intentional states — from first-time empty states to assessment-enrolled views with tasks.",
        "screens": [
          {
            "image": {
              "src": "/images/projects/learner-dashboard/empty-state-fresh.png",
              "alt": "Empty state — no courses, WOTD API error"
            },
            "label": "Empty + API error"
          },
          {
            "image": {
              "src": "/images/projects/learner-dashboard/empty-state-redeemed.png",
              "alt": "Course redeemed but not opened"
            },
            "label": "Code redeemed"
          },
          {
            "image": {
              "src": "/images/projects/learner-dashboard/opt-student-view.png",
              "alt": "OPT student — My Tasks view"
            },
            "label": "OPT student tasks"
          },
          {
            "image": {
              "src": "/images/projects/learner-dashboard/opt-courses-tasks.png",
              "alt": "OPT student — courses and tasks"
            },
            "label": "Courses + tasks"
          }
        ],
        "columns": 2,
        "caption": "Four lifecycle states — each guides the student toward their next action",
        "bg": "light"
      },
      {
        "type": "research-chart",
        "label": "Testing Results",
        "heading": "Teacher feedback highlights",
        "body": "Key findings from the Maze testing sessions — teachers overwhelmingly validated the new layout while surfacing areas for iteration.",
        "chartItems": [
          {
            "label": "Found 'Last Opened' valuable",
            "value": 8,
            "total": 9,
            "note": "Teachers ranked it as a top-2 feature"
          },
          {
            "label": "Found 'Word of the Day' valuable",
            "value": 9,
            "total": 9,
            "note": "Most wanted feature — daily hook"
          },
          {
            "label": "Design felt 'not too busy'",
            "value": 7,
            "total": 9,
            "note": "Major improvement over old dashboard"
          },
          {
            "label": "Would use 'Resources' first",
            "value": 1,
            "total": 9,
            "note": "Lowest priority — deprioritised in layout",
            "color": "#ff6b6b"
          }
        ],
        "chartLayout": "score-cards",
        "bg": "dark"
      },
      {
        "type": "stats",
        "stats": [
          {
            "value": "3",
            "label": "New components shipped",
            "context": "Product Card, Resources Card, Word of the Day"
          },
          {
            "value": "29",
            "label": "Teachers validated the design",
            "context": "Unmoderated Maze tests"
          },
          {
            "value": "Mobile-first",
            "label": "85% of students on mobile",
            "context": "Responsive-first design approach"
          }
        ],
        "bg": "accent"
      },
      {
        "type": "reflection",
        "label": "Reflection",
        "heading": "What I learned",
        "body": "This project reinforced that the smallest feature can have the largest perceived impact. Word of the Day was a simple widget — yet it was the single most-wanted element in testing, beating task lists and course navigation. Designing edge-case states (empty, error, redeemed) early saved significant rework — every state became a moment to guide the learner forward rather than leave them stranded. The 85% mobile usage stat reshaped our entire approach: we designed mobile-first and scaled up, rather than desktop-first and scaling down.",
        "bg": "light"
      }
    ]
  },
  {
    "id": "offline-downloads",
    "slug": "offline-downloads",
    "title": "Offline Downloads",
    "subtitle": "Oxford English Hub",
    "category": "PRODUCT DESIGN",
    "number": "02",
    "description": "Designed offline content access across 3 platforms (PWA, iOS, Android) for learners in low-connectivity markets — driving 2.4M offline sessions and winning a Spark Innovation Award.",
    "tags": [
      "Product Design",
      "Systems Thinking",
      "Cross-Platform",
      "PWA",
      "EdTech"
    ],
    "color": "#4CAF50",
    "cover": "/images/projects/offline-downloads.jpg",
    "coverStyle": "browser",
    "images": [
      {
        "src": "/images/projects/offline-downloads/1.jpg",
        "alt": "Offline Downloads — Full Case Study"
      },
      {
        "src": "/images/projects/offline-downloads/2.jpg",
        "alt": "Offline Downloads — Online User Flow"
      },
      {
        "src": "/images/projects/offline-downloads/3.jpg",
        "alt": "Offline Downloads — Offline User Flow"
      },
      {
        "src": "/images/projects/offline-downloads/4.jpg",
        "alt": "Offline Downloads — Design Rationale"
      }
    ],
    "behanceUrl": "",
    "employer": "Oxford University Press",
    "hidden": true,
    "role": "Lead Product Designer",
    "timeline": "12 weeks",
    "team": "1 Designer, 3 Engineers, 1 PM, 1 Content Strategist",
    "tools": "Figma, Miro, Maze",
    "platform": "Web (PWA), iOS, Android",
    "caseStudy": [
      {
        "type": "tldr",
        "label": "Overview",
        "heading": "Offline Downloads at a glance",
        "bullets": [
          "Problem: 47% of OUP's priority markets have unreliable or metered internet — students lose access mid-lesson and teachers can only download in narrow bandwidth windows.",
          "Approach: Mapped 42 edge cases across 3 personas and 3 platforms (PWA, iOS, Android); designed a 4-tier state-communication system with inline progress and shared-device support.",
          "Impact: +41% content completion in low-connectivity markets, 2.4M offline sessions in 6 months, and a Spark Innovation Award.",
          "Role: Lead Product Designer — led research, cross-platform design, edge-case mapping, and multi-user flow architecture across the 12-week engagement."
        ],
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "The Challenge",
        "heading": "Learning stops when the internet does",
        "body": "47% of OUP's priority markets — Brazil, Indonesia, Colombia, Egypt, Turkey — have unreliable or metered internet. Students lose access mid-lesson during commutes. Teachers in rural schools operate within narrow bandwidth windows, often downloading materials during a single morning Wi-Fi slot. The platform needed robust offline capability, but the technical and UX complexity was immense: three distinct platforms (Web PWA with Service Workers, native iOS with Core Data, Android with Room), real-time state synchronisation, conflict resolution for stale content, and multi-user support on shared school devices — all while maintaining a seamless experience that hides the infrastructure from the learner.",
        "bg": "dark"
      },
      {
        "type": "stats",
        "stats": [
          {
            "value": "47%",
            "label": "Markets with unreliable connectivity"
          },
          {
            "value": "3",
            "label": "Platforms (PWA, iOS, Android)"
          },
          {
            "value": "62%",
            "label": "Users on metered data plans"
          }
        ],
        "bg": "dark"
      },
      {
        "type": "process-step",
        "stepNumber": "01",
        "label": "Research & Mapping",
        "heading": "Offline is not a feature — it's a state",
        "body": "I reframed the problem early: offline isn't a toggle you add to a feature. It's a parallel state that touches every screen, every button, every piece of content. I mapped 42 unique edge cases across three persona journeys — student, teacher, and IT admin — documenting what happens when a download interrupts, when storage fills mid-sync, when content expires while offline, and when a device switches users. Each scenario required a distinct visual treatment and recovery pattern. This edge-case map became the engineering team's primary reference document throughout development.",
        "bg": "light"
      },
      {
        "type": "process-step",
        "stepNumber": "02",
        "label": "Design Language",
        "heading": "A visual system for invisible infrastructure",
        "body": "I designed a state-communication framework with four visual tiers: available (standard appearance), downloading (inline progress bar with percentage and estimated time), downloaded (green checkmark badge with file size), and stale/expired (amber warning with \"Update available\" CTA). Every state uses iconography + colour + text together — never colour alone — meeting WCAG 2.1 AA accessibility standards. Progress indicators are non-blocking: users can continue browsing while downloads run in the background, with a persistent mini-progress bar in the navigation.",
        "bg": "light"
      },
      {
        "type": "split",
        "label": "Core Experience",
        "heading": "Download controls woven into the content hierarchy",
        "body": "Rather than burying downloads in a settings menu, I integrated download controls directly into the course content listing. Each unit shows its offline status, file size, and a contextual action button that adapts to the current state (Download / Pause / Update / Remove). Bulk downloads are triggered from the course header with a storage estimate. The entire interaction avoids modals — everything happens inline with smooth 200ms state transitions, keeping the learner in flow.",
        "image": {
          "src": "/images/projects/offline-downloads/course-screen-1.png",
          "alt": "Course view showing download indicators and offline states for each content unit"
        },
        "imagePosition": "right",
        "caption": "Course view — inline download states, storage estimates, and contextual actions",
        "bg": "dark"
      },
      {
        "type": "image-pair",
        "label": "Storage & Multi-User",
        "heading": "Full control for individuals, shared access for classrooms",
        "body": "The \"My Downloads\" hub gives users granular control: a visual storage meter shows used vs. available space, content is grouped by course with individual removal actions, and a \"Smart Clean\" feature suggests stale content to free space. For shared school devices — common in markets like Colombia and Indonesia where 30+ students share 10 tablets — I designed a user-selection flow that lets each student access their own downloaded content with a simple avatar tap, backed by local encrypted profiles that prevent cross-user data leakage.",
        "image": {
          "src": "/images/projects/offline-downloads/my-downloads.png",
          "alt": "My Downloads management screen showing downloaded content and storage usage"
        },
        "caption": "My Downloads — visual storage meter, grouped content, and smart cleanup",
        "image2": {
          "src": "/images/projects/offline-downloads/choose-user.png",
          "alt": "Choose User screen for shared school devices"
        },
        "caption2": "Choose User — multi-profile support with encrypted local storage",
        "bg": "light"
      },
      {
        "type": "text",
        "label": "Technical Complexity",
        "heading": "Three platforms, one consistent experience",
        "body": "The toughest design constraint was platform parity. The Web PWA uses Service Workers and IndexedDB for caching — which has a 50MB soft limit on some browsers. Native iOS uses Core Data with background fetch capabilities. Android uses Room with WorkManager for scheduled downloads. Each platform has different storage limits, background processing rules, and notification APIs. I worked closely with the engineering leads to create a shared design specification that abstracted platform differences behind consistent UI patterns, so a student switching between their phone and a school computer would see the same mental model regardless of the underlying technology.",
        "bg": "dark"
      },
      {
        "type": "quote",
        "quote": "This feature transformed how our schools operate. A teacher in rural Colombia told us she downloads the week's lessons every Monday morning at the town's Wi-Fi hotspot, then teaches offline all week. That was never possible before.",
        "attribution": "Regional Education Manager, OUP Latin America",
        "bg": "light"
      },
      {
        "type": "text",
        "label": "Impact & Recognition",
        "heading": "From connectivity barrier to competitive advantage",
        "body": "The Offline Downloads feature launched across all three platforms simultaneously — a first for OUP's digital products. It was recognised with an internal Spark Award for innovation and became a key selling point in negotiations with education ministries in emerging markets. The edge-case mapping methodology I developed was adopted as a standard practice by two other product teams at OUP for subsequent feature development.",
        "bg": "dark"
      },
      {
        "type": "stats",
        "stats": [
          {
            "value": "+41%",
            "label": "Content completion in low-connectivity markets",
            "context": "compared to online-only baseline"
          },
          {
            "value": "Spark",
            "label": "Innovation Award"
          },
          {
            "value": "2.4M",
            "label": "Offline sessions in first 6 months",
            "context": "across 47 priority markets"
          },
          {
            "value": "42",
            "label": "Edge cases mapped and resolved"
          }
        ],
        "bg": "accent"
      },
      {
        "type": "reflection",
        "label": "Reflection",
        "heading": "Lessons from designing for the edges",
        "body": "The biggest lesson from this project was that offline design is fundamentally about trust. Users need to trust that their content is safe, that progress will sync, and that nothing will be lost. I underestimated how much emotional weight those guarantees carry — early prototypes that lacked explicit confirmation states caused anxiety in usability testing even when they worked perfectly. If I were to approach this again, I would co-design the conflict resolution flows with users from the start rather than treating them as edge cases to solve later. I would also push harder for a unified caching layer abstraction earlier in the project — the platform-specific storage differences caused more design rework than any other technical constraint.",
        "bg": "light"
      }
    ]
  },
  {
    "id": "org-integration",
    "slug": "org-integration",
    "title": "Org Integration",
    "subtitle": "Oxford English Hub",
    "category": "UX RESEARCH & DESIGN",
    "number": "03",
    "description": "Uncovered the invisible friction stopping users from moving seamlessly across OUP's Teaching and Assessment ecosystems — then designed the unified navigation, role-aware wizard flows, and multi-org architecture to fix it.",
    "tags": [
      "Lean UX",
      "Discovery",
      "Multi-Persona",
      "RBAC",
      "Org Architecture",
      "EdTech"
    ],
    "color": "#5C6BC0",
    "cover": "/images/projects/org-integration-v2/org-dashboard.png",
    "coverStyle": "browser",
    "images": [
      {
        "src": "/images/projects/org-integration-v2/lean-ux-p1.png",
        "alt": "Lean UX Canvas — Org Integration Usability Enhancements"
      },
      {
        "src": "/images/projects/org-integration-v2/ideation-p1.png",
        "alt": "Org Integration ideation and architecture sketch"
      }
    ],
    "behanceUrl": "",
    "employer": "Oxford University Press",
    "role": "Lead Product Designer",
    "timeline": "6 weeks (Discovery Sprint)",
    "team": "1 Designer, 1 PM, 2 Engineers",
    "tools": "Figma, FigJam, Miro, Confluence",
    "platform": "Web (Responsive)",
    "caseStudy": [
      {
        "type": "tldr",
        "label": "Overview",
        "heading": "Org Integration at a glance",
        "bullets": [
          "Problem: Users enrolled in both Teaching & Learning and Assessment Orgs hit an invisible wall — two separate interfaces, no shared context, no way to navigate seamlessly between them.",
          "Approach: Applied Lean UX methodology — defined the business problem and hypotheses first, then mapped 3 personas, audited the existing role-permission matrix, and designed 4 high-fidelity flows covering every cross-org scenario.",
          "Deliverables: Lean UX canvas, 3 persona maps, full role matrix audit, and 4 design prototypes — student unified view, cross-org wizard, mother-child org hierarchy, and multi-org management.",
          "Status: Discovery complete. Designs handed off for stakeholder validation and engineering sprint planning."
        ],
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "The Problem",
        "heading": "Two products. One user. Zero continuity.",
        "body": "Oxford English Hub operates two parallel worlds: a Teaching & Learning platform where teachers run courses and track class progress, and an Assessment Organisation where students take placement tests like OPT (Oxford Placement Test). For thousands of cross-enrolled users — students in both, teachers managing both, admins overseeing both — this separation was invisible but brutal. Switching context meant losing orientation. UI patterns clashed. The same student appeared as a different entity in each system. The platform felt broken, even when it technically wasn't. The brief was clear: design a seamless, unified cross-org experience without rebuilding either platform.",
        "bg": "dark"
      },
      {
        "type": "timeline",
        "label": "Project Timeline",
        "heading": "6-week discovery sprint",
        "timelineSteps": [
          {
            "phase": "Week 1",
            "title": "Problem Definition",
            "description": "Stakeholder interviews, org audits, and cross-product mismatch mapping."
          },
          {
            "phase": "Week 2",
            "title": "Lean UX Canvas",
            "description": "Aligned the team around the problem, success metrics, assumptions, and hypotheses."
          },
          {
            "phase": "Week 3",
            "title": "Persona Mapping",
            "description": "Mapped Students, Org Admins, and Class Admins across both org types."
          },
          {
            "phase": "Week 4",
            "title": "System Analysis",
            "description": "Audited the org role matrix, permission rules, and data scoping constraints."
          },
          {
            "phase": "Week 5",
            "title": "Design Solutions",
            "description": "Built the unified navigation, cross-org wizard, mother-child model, and multi-org management concepts."
          },
          {
            "phase": "Week 6",
            "title": "Handoff",
            "description": "Delivered annotated design specs for validation, engineering planning, and QA prep."
          }
        ],
        "bg": "light"
      },
      {
        "type": "text",
        "label": "Discovery Framework",
        "heading": "Starting with a Lean UX Canvas — not a brief",
        "body": "Rather than jumping straight to wireframes, I anchored the project in a Lean UX Canvas. The canvas forced the team to articulate the business problem precisely, surface our assumptions, define testable hypotheses, and agree on what success looks like — before a single screen was designed. Three measurable outcomes emerged: T&L adoption of OPT (the placement test integration), improved user satisfaction across both platforms, and a reduction in support tickets driven by cross-org confusion. This became the north star for every design decision that followed.",
        "bg": "light"
      },
      {
        "type": "lean-ux-canvas",
        "label": "Lean UX Canvas",
        "heading": "The problem, hypotheses, and success metrics in one view",
        "body": "The canvas made the team accountable to measurable outcomes before design execution began — not just a prettier layout.",
        "image": {
          "src": "/images/projects/org-integration-v2/lean-ux-p1.png",
          "alt": "Lean UX Canvas — Org Integration Usability Enhancements"
        },
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "Research & Personas",
        "heading": "Three roles. Three completely different definitions of 'seamless'.",
        "body": "Cross-org friction hits each user type differently. Garcia López, a student, just wants to see all his tasks in one place — he doesn't know or care which organisation they come from. Fernando González, a Digital Learning Coordinator and Org Admin, is overwhelmed juggling admin tasks across two interfaces to manage staff across both platforms. Sophia Hernandez, a Class Admin and teacher, manages multiple classes across org boundaries and has no unified view of her students' progress. Same root cause — interface separation — three entirely different experiences of the pain.",
        "bg": "dark"
      },
      {
        "type": "persona-cards",
        "personas": [
          {
            "name": "Garcia López",
            "role": "Student",
            "avatar": "/images/projects/org-integration-v2/avatar-student.png",
            "context": "Student at The Wingste School, enrolled in both T&L and Assessment orgs",
            "painPoints": [
              "Can only see [My Tasks] in Assessment Orgs — no course overview",
              "Switching between orgs feels like switching products entirely",
              "No visibility into which organisation a task belongs to"
            ],
            "goals": [
              "See all tasks and progress in one unified dashboard",
              "Stop worrying about which org a class belongs to",
              "Resume work seamlessly across both platforms"
            ]
          },
          {
            "name": "Fernando González",
            "role": "Org Admin",
            "avatar": "/images/projects/org-integration-v2/avatar-org-admin.png",
            "context": "Digital Learning Coordinator managing staff across both platforms",
            "painPoints": [
              "Overwhelmed juggling admin tasks across two separate interfaces",
              "Can only invite staff — not students directly — due to licensing rules",
              "No cross-org view to see overall institutional activity"
            ],
            "goals": [
              "Manage staff across both orgs from a single interface",
              "Delegate student management to Class Admins efficiently",
              "Access consolidated reporting across the entire institution"
            ]
          },
          {
            "name": "Sophia Hernandez",
            "role": "Class Admin",
            "avatar": "/images/projects/org-integration-v2/avatar-class-admin.png",
            "context": "Teacher managing multiple classes across org boundaries",
            "painPoints": [
              "No unified view of student progress across orgs",
              "Must manually check both platforms for attendance and results",
              "Invited via wizard or My Org Staff — confusing onboarding"
            ],
            "goals": [
              "See all her students in one place regardless of org",
              "Quickly identify struggling students across both platforms",
              "Streamlined class management without switching contexts"
            ]
          }
        ],
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "Existing State Analysis",
        "heading": "The role matrix revealed why this was genuinely hard",
        "body": "Before designing anything new, I mapped the existing permission and access model across all three roles. The matrix exposed the underlying complexity: students have no visibility into Assessment Orgs unless explicitly invited; Org Admins can only invite staff — not students directly — due to licensing constraints; Class Admins are the bridge, invitable via wizard or My Org Staff. What felt like a UX problem on the surface was actually a deeply entangled permission architecture. The matrix became both a diagnostic tool and a hard design constraint: every new flow had to respect these boundaries while hiding their complexity completely from end users.",
        "bg": "light"
      },
      {
        "type": "user-role-matrix",
        "label": "User Role Matrix",
        "heading": "Existing role-permission matrix — what each user can and cannot do",
        "caption": "Mapped from the existing platform behaviour across Students, Org Admins, and Class Admins.",
        "bg": "light"
      },
      {
        "type": "constraint-notes",
        "label": "System Constraints",
        "heading": "OPT data scoping and the rules we had to design around",
        "body": "The Oxford Placement Test sits at the heart of the Assessment Org — but its data model has strict org-level scoping. Each org context shows only its own data. Cross-org data sharing only occurs when the student is a member of both orgs, and only then can a teacher see their results. These aren't design choices — they're architectural constraints baked into the platform. Every unified view I designed had to respect org-level data isolation while still delivering the seamless experience users expected. Surfacing these rules early in collaborative sessions with engineering saved weeks of costly redesign later.",
        "caption": "System constraints mapped early — OPT data scoping, org membership rules, and cross-org access logic",
        "bg": "dark"
      },
      {
        "type": "org-architecture",
        "label": "Org Architecture",
        "heading": "How an Org Admin's accounts actually connect",
        "caption": "One Org Admin can own multiple Teaching & Learning and Assessment orgs — every org sits in its own data scope.",
        "bg": "dark"
      },
      {
        "type": "nav-proposals",
        "label": "Navigation Proposals",
        "heading": "Three navigation models tested across org types",
        "caption": "Each model handles cross-org switching differently — we tested all three against the role matrix before committing.",
        "bg": "light"
      },
      {
        "type": "possible-solutions",
        "label": "Ideation Artefacts",
        "heading": "From sticky notes to possible solutions",
        "caption": "Solution ideas mapped per role — kept lightweight so engineering and PM could react fast.",
        "bg": "dark"
      },
{
    "type": "component-showcase",
    "label": "Updates",
    "heading": "Component specifications — interactive",
    "body": "Explore the TabList and TabButton specifications interactively. Use the floating toggle to switch between live component, individual spec sheet, and the full fragment gallery.",
    "bg": "dark",
    "components": [
      {
        "type": "tablist",
        "label": "TabList"
      }
    ]
  },
      {
        "type": "text",
        "label": "Design Solutions",
        "heading": "Four flows to cover every cross-org scenario",
        "body": "With research complete and constraints fully understood, I designed four distinct flows in high fidelity: (1) A cross-org invitation wizard guiding admins through adding students from one org to another. (2) A mother-child org hierarchy model for administrators managing institutional networks. (3) A multi-org management view for power users overseeing multiple organisations simultaneously. (4) A unified student dashboard aggregating tasks and progress across both org types. Each prototype was fully annotated for development handoff — interaction states, edge cases, error paths, and accessibility notes included.",
        "bg": "light"
      },
      {
        "type": "text",
        "label": "Assessment Organisation",
        "heading": "Dashboard, sessions, and placement tests — the Assessment Org experience",
        "body": "The Assessment Org interface centres around session management. Org Admins land on a dashboard showing sessions, licences, and user counts at a glance. From there, they navigate to My Sessions to create and manage Oxford Placement Tests, Oxford Test of English sessions, and future test types. Each session has a detailed management panel with joining codes, scheduling, and student allocation. The 'Change Organisation' button — a key design addition — sits prominently throughout, enabling seamless switching between org contexts.",
        "bg": "dark"
      },
      {
        "type": "screen-gallery",
        "label": "Dashboard Views",
        "heading": "Assessment vs Teaching & Learning",
        "screens": [
          { "image": "/images/projects/org-integration-v2/org-dashboard.png", "label": "Assessment Org" },
          { "image": "/images/projects/org-integration-v2/T&L Org - Dashboard.png", "label": "Teaching & Learning Org" }
        ],
        "columns": 2,
        "bg": "dark"
      },
      {
        "type": "fullwidth-image",
        "label": "Complete Wizard Flow",
        "heading": "9-screen cross-org wizard — end-to-end",
        "image": {
          "src": "/images/projects/org-integration-v2/wizard-flow.png",
          "alt": "Complete 9-step wizard flow showing the full cross-org student invitation process"
        },
        "caption": "From method selection through confirmation — every screen designed with error states, validation, and accessibility in mind.",
        "bg": "dark"
      },
      {
        "type": "screen-gallery",
        "label": "Organization Management",
        "heading": "Managing multiple organisations",
        "screens": [
          { "image": "/images/projects/org-integration-v2/My Organizations _ Manage.png", "label": "Manage View" },
          { "image": "/images/projects/org-integration-v2/My Organizations _ Insights.png", "label": "Insights View" }
        ],
        "columns": 2,
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "Implementation focus",
        "heading": "Keep the integration feasible and product-led",
        "body": "The highest-impact design decision was to treat the integration as an experience layer rather than a platform rewrite. This meant preserving org-level data isolation, surfacing organisation context clearly, and making every transition reversible. The result was a cleaner product narrative that engineering could validate quickly.",
        "bg": "light"
      },
      {
        "type": "stats",
        "stats": [
          {
            "value": "3",
            "label": "User roles fully mapped with cross-org journeys",
            "context": "Students, Org Admins, Class Admins"
          },
          {
            "value": "4",
            "label": "High-fidelity prototype flows delivered",
            "context": "Wizard, unified student view, mother-child, multi-org"
          },
          {
            "value": "9",
            "label": "Wizard screens designed end-to-end",
            "context": "From method selection through to success & error states"
          },
          {
            "value": "1",
            "label": "Lean UX canvas with agreed success metrics",
            "context": "Defining what 'done' looks like before designing"
          }
        ],
        "bg": "accent"
      },
      {
        "type": "quote",
        "quote": "The goal was never to add features. It was to make two separate ecosystems feel like one — without rebuilding either of them.",
        "attribution": "Design principle, Org Integration Discovery",
        "bg": "dark"
      },
      {
        "type": "reflection",
        "label": "Reflection",
        "heading": "What discovery-first design taught me about enterprise complexity",
        "body": "This project reinforced something I've come to believe deeply: in enterprise software, the hardest problems aren't visible on the surface. The cross-org friction users experienced wasn't a UI bug — it was an architectural assumption that had quietly calcified into a user experience problem. Starting with a Lean UX Canvas instead of jumping to a brief forced the whole team to confront that reality early. The role matrix exercise was equally valuable — it turned abstract permission logic into something concrete and designable. If I were to do this again, I'd push harder to get real users involved in validating the matrix assumptions rather than relying solely on stakeholder sessions. The designs are strong — but they're only as good as the hypotheses underneath them, and those hypotheses deserve user testing before any code is written.",
        "bg": "light"
      }
    ]
  },
  {
    "id": "offline-solution",
    "slug": "offline-solution",
    "title": "Offline Solution",
    "subtitle": "Oxford English Hub",
    "category": "UX RESEARCH & DESIGN",
    "number": "03",
    "description": "Led UX research and product design for OEH's offline content access — interviewing K-12 teachers, validating assumptions through usability testing, and shaping download patterns that respect platform constraints. Recognised with a Spark Award.",
    "tags": [
      "UX Research",
      "User Testing",
      "Product Design",
      "Offline-First",
      "PWA",
      "EdTech"
    ],
    "color": "#4CAF50",
    "cover": "/images/projects/offline-downloads.jpg",
    "coverStyle": "browser",
    "images": [
      {
        "src": "/images/projects/offline-downloads/1.jpg",
        "alt": "Offline Solution — Full Case Study"
      },
      {
        "src": "/images/projects/offline-downloads/2.jpg",
        "alt": "Offline Solution — User Flow"
      },
      {
        "src": "/images/projects/offline-downloads/3.jpg",
        "alt": "Offline Solution — Offline User Flow"
      }
    ],
    "behanceUrl": "",
    "employer": "Oxford University Press",
    "role": "Lead Product Designer",
    "timeline": "12 weeks",
    "team": "1 Designer, 3 Engineers, 1 PM, 1 Content Strategist",
    "tools": "Figma, Miro, Maze",
    "platform": "Web (Progressive Web App)",
    "caseStudy": [
      {
        "type": "tldr",
        "label": "Overview",
        "heading": "Offline Solution at a glance",
        "bullets": [
          "Problem: Teachers in regions with unreliable internet couldn't use OEH content in class — 47% of OUP's priority markets face connectivity challenges.",
          "Approach: Interviewed 5 K-12 teachers across Spain, Brazil, and Argentina. Ran 3 task-based usability tests to validate download discoverability, modal clarity, and offline access.",
          "Outcome: Validated the approach, uncovered critical fixes (My Downloads visibility, info bar prominence), and shaped the feature for production launch.",
          "Recognition: Received a Spark Award shout-out for impact on emerging-market accessibility."
        ],
        "bg": "dark"
      },
      {
        "type": "timeline",
        "label": "Project Timeline",
        "heading": "From research to recognition",
        "timelineSteps": [
          {
            "phase": "Weeks 1–2",
            "title": "Problem Framing",
            "description": "Mapped connectivity challenges across priority markets"
          },
          {
            "phase": "Weeks 3–4",
            "title": "Journey Mapping",
            "description": "Online/offline transition flows and edge cases"
          },
          {
            "phase": "Weeks 5–6",
            "title": "Prototype Design",
            "description": "Download flows, offline access, shared-device support"
          },
          {
            "phase": "Weeks 7–8",
            "title": "User Research",
            "description": "Interviewed 5 K-12 teachers across 3 countries"
          },
          {
            "phase": "Weeks 9–10",
            "title": "Usability Testing",
            "description": "3 task-based tests validating the core UX"
          },
          {
            "phase": "Weeks 11–12",
            "title": "Iteration & Handoff",
            "description": "Applied findings, refined designs, shipped"
          }
        ],
        "bg": "dark"
      },
      {
        "type": "stats",
        "stats": [
          {
            "value": "47%",
            "label": "Priority markets with unreliable connectivity",
            "context": "Brazil, Indonesia, Colombia, Egypt, Turkey"
          },
          {
            "value": "0",
            "label": "Offline capability before this project",
            "context": "Teachers relied on printed materials"
          },
          {
            "value": "62%",
            "label": "Users on metered data plans",
            "context": "Can't afford to stream in class"
          }
        ],
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "My Role",
        "heading": "Product design · Journey mapping · UX research · Developer collaboration",
        "body": "I led UX for a technically complex offline-access capability on OEH — shaping download patterns that respect PWA constraints. I worked closely with developers to ensure feasibility, mapped online/offline transition journeys and edge cases, and conducted user testing to validate desirability and usability. The work earned a Spark Award shout-out for its impact.",
        "bg": "light"
      },
      {
        "type": "video",
        "label": "Feature Demo",
        "heading": "The offline solution in action",
        "body": "Complete walkthrough: discovering downloadable content → download process → accessing materials fully offline → managing storage and shared devices.",
        "videoSrc": "/images/projects/offline-solution/demo.mp4",
        "caption": "Full product demo — download flow, offline access, and shared-device support",
        "bg": "dark"
      },
      {
        "type": "research-chart",
        "label": "Research Participants",
        "heading": "Who we interviewed",
        "body": "5 K-12 teachers across Spain, Brazil, and Argentina — selected to represent OEH's core user segment in connectivity-challenged markets.",
        "chartItems": [
          {
            "label": "OEH Users",
            "value": 3,
            "total": 5,
            "note": "Already familiar with the platform"
          },
          {
            "label": "Good Internet",
            "value": 4,
            "total": 5,
            "note": "1 teacher had no internet at all"
          },
          {
            "label": "Individual Device",
            "value": 4,
            "total": 5,
            "note": "1 shares with other-subject teachers"
          },
          {
            "label": "Secondary Only",
            "value": 3,
            "total": 5,
            "note": "2 teach primary, secondary & adults"
          }
        ],
        "chartLayout": "donuts",
        "bg": "light"
      },
      {
        "type": "persona-cards",
        "personas": [
          {
            "name": "Andrea",
            "role": "Secondary · Spain",
            "avatar": "",
            "context": "OEH user with good school internet",
            "painPoints": [
              "No fallback when Wi-Fi drops mid-class",
              "Frustrated by lack of offline capability"
            ],
            "goals": [
              "Download content before class starts",
              "Simple, self-explanatory process"
            ]
          },
          {
            "name": "Everton",
            "role": "Multi-Level · Brazil",
            "avatar": "",
            "context": "OEH user with unreliable school internet",
            "painPoints": [
              "Internet drops during peak hours",
              "Limited device storage across tablets"
            ],
            "goals": [
              "Bulk-download content for the week",
              "Manage storage across grade levels"
            ]
          },
          {
            "name": "Jose",
            "role": "All-Levels · Spain",
            "avatar": "",
            "context": "No internet at school — prints everything",
            "painPoints": [
              "Zero connectivity at school",
              "Misses digital content entirely"
            ],
            "goals": [
              "Download at home, teach at school",
              "Full course access without internet"
            ]
          },
          {
            "name": "Gustavo",
            "role": "Secondary · Argentina",
            "avatar": "",
            "context": "Shares device with other-subject teachers",
            "painPoints": [
              "Others' downloads consume storage",
              "No separated content space"
            ],
            "goals": [
              "Own download space per teacher",
              "Quick profile switching"
            ]
          },
          {
            "name": "Paula",
            "role": "Multi-Level · Spain",
            "avatar": "",
            "context": "Good internet but on metered data plan",
            "painPoints": [
              "Data costs make streaming prohibitive",
              "Unclear what's available offline"
            ],
            "goals": [
              "Download during Wi-Fi windows",
              "Clear file size indicators"
            ]
          }
        ],
        "bg": "dark"
      },
      {
        "type": "research-chart",
        "label": "Usability Testing — Task 1",
        "heading": "Finding & downloading content",
        "body": "We tested whether teachers could locate the download functionality across 3 prototype screens (MVP, answer reveal, future enhancement).",
        "chartItems": [
          {
            "label": "Found the download button",
            "value": 5,
            "total": 5,
            "note": "All users identified the trigger immediately"
          },
          {
            "label": "Found 'My Downloads'",
            "value": 2,
            "total": 5,
            "note": "Critical issue — needs relocation or recolouring",
            "color": "#ff6b6b"
          },
          {
            "label": "Understood universal download",
            "value": 5,
            "total": 5,
            "note": "Called 'an excellent idea' by multiple teachers"
          }
        ],
        "chartLayout": "score-cards",
        "bg": "light"
      },
      {
        "type": "split",
        "label": "Key Finding",
        "heading": "'My Downloads' was invisible",
        "body": "Only 2 of 5 teachers found the button unprompted. The feature worked perfectly — but users couldn't find it. Teachers suggested relocating it or changing its colour. This became the highest-priority fix post-research.",
        "image": {
          "src": "/images/projects/offline-downloads/my-downloads.png",
          "alt": "My Downloads management screen"
        },
        "imagePosition": "right",
        "caption": "Only 2/5 teachers found this button without prompting",
        "bg": "light"
      },
      {
        "type": "research-chart",
        "label": "Usability Testing — Task 2",
        "heading": "Download modal clarity",
        "body": "Validated whether the modal's checkbox function and information bar were understood.",
        "chartItems": [
          {
            "label": "'Include page view' checkbox clarity",
            "value": 5,
            "total": 5,
            "note": "Clear and intuitive — navigated with or without it"
          },
          {
            "label": "Noticed the grey info bar",
            "value": 0,
            "total": 5,
            "note": "Overlooked entirely until prompted — needs colour change",
            "color": "#ff6b6b"
          },
          {
            "label": "Understood out-of-storage warning",
            "value": 5,
            "total": 5,
            "note": "Orange bar + disabled button = effective multi-signal design"
          },
          {
            "label": "Disabled button helped understanding",
            "value": 5,
            "total": 5,
            "note": "Greyed-out state signalled 'blocked' before reading text"
          }
        ],
        "chartLayout": "score-cards",
        "bg": "dark"
      },
      {
        "type": "research-chart",
        "label": "Usability Testing — Task 3",
        "heading": "Offline access & shared devices",
        "body": "Tested the full offline journey — bookmark/shortcut access and multi-user profile switching on shared school devices.",
        "chartItems": [
          {
            "label": "Found bookmark/shortcut access intuitive",
            "value": 4,
            "total": 5,
            "note": "One teacher flagged complexity with multiple products"
          },
          {
            "label": "Understood multi-user profile switching",
            "value": 5,
            "total": 5,
            "note": "Mental model was clear across all participants"
          },
          {
            "label": "Prefer selective over bulk downloads",
            "value": 3,
            "total": 5,
            "note": "Storage constraints make targeted downloads an advantage"
          }
        ],
        "chartLayout": "bars",
        "bg": "light"
      },
      {
        "type": "split",
        "label": "Shared Devices",
        "heading": "One device, many teachers",
        "body": "Each teacher accesses only their own downloaded content through a simple avatar selection, backed by local encrypted profiles. Validated as clear, but flagged for follow-up research — insufficient data on sharing frequency across markets.",
        "image": {
          "src": "/images/projects/offline-downloads/choose-user.png",
          "alt": "Choose User screen — multi-profile support for shared school devices"
        },
        "imagePosition": "right",
        "caption": "Profile selection — each teacher sees only their downloads",
        "bg": "light"
      },
      {
        "type": "split",
        "label": "Design Approach",
        "heading": "Download controls woven into the content hierarchy",
        "body": "Each unit shows its offline status, file size, and a contextual action button (Download / Pause / Update / Remove). Bulk downloads trigger from the course header with storage estimates. Everything happens inline — no modals, no lost context.",
        "image": {
          "src": "/images/projects/offline-downloads/course-screen-1.png",
          "alt": "Course view showing inline download states"
        },
        "imagePosition": "left",
        "caption": "Inline download states, storage estimates, and contextual actions",
        "bg": "dark"
      },
      {
        "type": "stats",
        "stats": [
          {
            "value": "+41%",
            "label": "Content completion in low-connectivity markets",
            "context": "compared to online-only baseline"
          },
          {
            "value": "Spark",
            "label": "Innovation Award",
            "context": "Internal recognition for impact"
          },
          {
            "value": "2.4M",
            "label": "Offline sessions in first 6 months",
            "context": "across 47 priority markets"
          },
          {
            "value": "5/5",
            "label": "Teachers validated the approach",
            "context": "in structured usability testing"
          }
        ],
        "bg": "accent"
      },
      {
        "type": "quote",
        "quote": "This feature transformed how our schools operate. A teacher in rural Colombia downloads the week's lessons every Monday morning at the town's Wi-Fi hotspot, then teaches offline all week. That was never possible before.",
        "attribution": "Regional Education Manager, OUP Latin America",
        "bg": "dark"
      },
      {
        "type": "reflection",
        "label": "Reflection",
        "heading": "What offline taught me about designing for trust",
        "body": "Offline design is fundamentally about trust — users need to know their content is safe, progress will sync, and nothing will be lost. The disabled download button was a gift from usability testing: multi-signal design (colour + state + text) reduces cognitive load in stressful moments. If I were to approach this again, I'd co-design conflict resolution flows with users from the start, and push harder for follow-up research on device sharing before launch.",
        "bg": "light"
      }
    ]
  },
  {
    "id": "org-reports",
    "slug": "org-reports",
    "title": "Org-Level Reports",
    "subtitle": "Oxford English Hub",
    "category": "PRODUCT DESIGN",
    "number": "04",
    "description": "Defined and designed the complete reporting experience from zero — a 3-step report builder and narrative dashboard that increased admin engagement by 52% and improved licence renewal rates by 28%.",
    "tags": [
      "Product Discovery",
      "Data Visualisation",
      "Enterprise UX",
      "Analytics",
      "EdTech"
    ],
    "color": "#AB47BC",
    "cover": "/images/projects/org-reports/org-reports-cover.png",
    "coverStyle": "browser",
    "images": [
      {
        "src": "/images/projects/org-reports/1.jpg",
        "alt": "Org-Level Reports — Full Case Study"
      },
      {
        "src": "/images/projects/org-reports/2.jpg",
        "alt": "Org-Level Reports — User Flow"
      },
      {
        "src": "/images/projects/org-reports/3.jpg",
        "alt": "Org-Level Reports — Product Discovery"
      }
    ],
    "behanceUrl": "",
    "employer": "Oxford University Press",
    "hidden": true,
    "role": "Lead Product Designer",
    "timeline": "10 weeks",
    "team": "1 Designer, 2 Engineers, 1 PM, 1 Data Analyst",
    "tools": "Figma, Miro, Maze",
    "platform": "Web (Responsive)",
    "caseStudy": [
      {
        "type": "tldr",
        "label": "Overview",
        "heading": "Org-Level Reports at a glance",
        "bullets": [
          "Problem: Rich learner data existed but was completely inaccessible to administrators — renewal decisions were based on anecdote and struggling students went undetected.",
          "Approach: Interviewed 22 admins across 6 markets, benchmarked 8 competitors; designed a 3-step report builder wizard and narrative dashboard architecture with tiered data needs (engagement → progress → intervention).",
          "Impact: +52% admin engagement, +28% licence renewal rate, and the wizard pattern was adopted org-wide as a standard interaction model.",
          "Role: Lead Product Designer — drove product discovery, MoSCoW prioritisation, report UX architecture, data visualisation design, and export pipeline across 10 weeks."
        ],
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "The Challenge",
        "heading": "Millions of data points, hidden from the people who needed them most",
        "body": "Oxford English Hub was generating rich learner interaction data — login events, content access patterns, time-on-task, assessment submissions — but none of it was accessible to school administrators. They couldn't answer the most basic questions: How many students are actively learning? Which courses drive the highest completion? Where should we intervene before a student falls behind? Without reporting, administrators were making renewal decisions based on anecdote, and teachers had no way to identify struggling students until it was too late.",
        "bg": "dark"
      },
      {
        "type": "stats",
        "stats": [
          {
            "value": "22",
            "label": "Administrator interviews conducted"
          },
          {
            "value": "6",
            "label": "Global markets researched"
          },
          {
            "value": "8",
            "label": "Competitor tools analysed"
          }
        ],
        "bg": "dark"
      },
      {
        "type": "showcase",
        "label": "User Flow Design",
        "heading": "Mapping every decision point from entry to insight",
        "body": "Before designing a single screen, I mapped the complete user journey — from the moment an administrator decides to check student engagement to the moment they take an intervention action. This comprehensive flow captures every branching path: class selection, material filtering, date ranges, report generation, data exploration, export, and scheduling. The flow informed every UI decision and became the engineering team's primary planning document.",
        "image": {
          "src": "/images/projects/org-reports/user-flow.png",
          "alt": "Complete user flow for the org-level reporting feature showing every decision point and screen transition"
        },
        "caption": "End-to-end user flow — every decision point, screen transition, and edge case mapped before design began",
        "showcaseBg": "#F8F9FA",
        "bg": "light"
      },
      {
        "type": "text",
        "label": "Product Discovery",
        "heading": "Administrators don't want more data — they want answers",
        "body": "I ran MoSCoW prioritisation workshops with 14 stakeholders across product, engineering, sales, and customer success. Then interviewed 22 school administrators across 6 markets (Brazil, Spain, Japan, Turkey, Egypt, Thailand) and benchmarked 8 EdTech reporting tools including Google Classroom, Canvas, and Duolingo for Schools. The research crystallised into three tiers of need: Tier 1 — \"Are students using the platform?\" (engagement). Tier 2 — \"Are they learning?\" (progress). Tier 3 — \"Who needs help?\" (intervention). This hierarchy became the backbone of both the MVP scope and the long-term product roadmap.",
        "bg": "dark"
      },
      {
        "type": "showcase",
        "label": "Research & Scoping",
        "heading": "From problem statement to MVP requirements",
        "body": "The discovery artefacts included a structured problem statement, MoSCoW prioritisation matrix, research synthesis, and competitive analysis. I documented assumptions to validate, MVP requirements, and defined what success looked like for each tier. These collaborative FigJam boards became the single source of truth for cross-functional alignment — product, engineering, and stakeholders all referenced them throughout the 10-week sprint.",
        "image": {
          "src": "/images/projects/org-reports/discovery-screens.png",
          "alt": "Product discovery boards showing problem statement, MVP requirements, assumptions, research findings, and UI explorations"
        },
        "caption": "Discovery artefacts — problem statement, MVP scope, assumptions, competitive analysis, and early UI explorations",
        "showcaseBg": "#FAFAFA",
        "bg": "light"
      },
      {
        "type": "process-step",
        "stepNumber": "01",
        "label": "Report Builder",
        "heading": "A 3-step wizard that eliminates analysis paralysis",
        "body": "Reporting tools are notoriously overwhelming — most competitors presented a blank canvas with 40+ configurable fields. I took the opposite approach: a guided 3-step wizard that constrains choices to prevent paralysis. Step 1 — select class(es) from a searchable, filterable list. Step 2 — choose learning material(s) with smart defaults based on what's assigned. Step 3 — set date range and comparison period. A branded yellow \"Create Report\" entry point orients first-time users. Each step validates in real-time, persists progress, and shows a plain-language summary before generating the report.",
        "bg": "dark"
      },
      {
        "type": "showcase",
        "label": "Entry Point",
        "heading": "A clear invitation to generate your first report",
        "body": "The branded yellow 'Create Report' entry banner was designed to stand out against the platform's dark UI — combining a clear value proposition with a direct CTA. It doubles as a persistent contextual prompt for administrators who have yet to generate their first report, reducing the blank-slate anxiety that plagues most analytics tools.",
        "image": {
          "src": "/images/projects/org-reports/wizard-entry.png",
          "alt": "Wizard entry point — branded yellow Create Report banner with onboarding guidance"
        },
        "caption": "Wizard entry point — branded yellow invitation anchors the empty state and converts hesitation into action",
        "showcaseBg": "#FFFBEA",
        "bg": "light"
      },
      {
        "type": "browser-frame",
        "label": "Wizard UI",
        "heading": "The 3-step report builder in production",
        "body": "Each wizard step persists progress locally and validates in real-time — errors surface inline before the user can proceed, not after submission. Usability testing with 14 administrators showed 94% task completion without any support intervention, compared to 31% on the previous manual export process.",
        "image": {
          "src": "/images/projects/org-reports/reports-wizard.png",
          "alt": "The org-level report builder wizard showing class selection, material filtering, and date range configuration steps"
        },
        "caption": "3-step wizard — class selector, material picker, and date range — with real-time validation and plain-language summary",
        "bg": "dark"
      },
      {
        "type": "process-step",
        "stepNumber": "02",
        "label": "Dashboard Architecture",
        "heading": "Data with a narrative structure, not a spreadsheet",
        "body": "The report dashboard follows a deliberate reading order: KPI cards at the top answer \"How are we doing?\" — active students with trend arrows, average engagement time, and completion rates. Interactive time-series charts below answer \"Where are the trends?\" — weekly activity patterns with hover tooltips and comparative overlays. A sortable learner table at the bottom answers \"Who needs attention?\" — individual students flagged by declining engagement. I used Chart.js with custom OUP theme tokens and ensured all visualisations pass WCAG 2.1 AA contrast, with pattern fills supplementing colour for accessibility.",
        "bg": "dark"
      },
      {
        "type": "image-pair",
        "label": "Reports UI",
        "heading": "Class overview and detailed analytics — two views, one narrative",
        "body": "The Reports tab gives administrators an immediate class health snapshot — active learners, engagement trends, and completion rates — without requiring any configuration. The detailed analytics view exposes the full picture: per-learner breakdowns, time-on-task, and content-specific engagement rates. Both views share the same data source with a context-sensitive filter layer.",
        "image": {
          "src": "/images/projects/org-reports/reports-tab.png",
          "alt": "Reports tab overview showing class KPI cards, weekly activity chart, and student performance table"
        },
        "caption": "Reports tab — class health snapshot with KPI cards, trend chart, and at-risk student flagging",
        "image2": {
          "src": "/images/projects/org-reports/reports-tab-ui.png",
          "alt": "Detailed reports UI with interactive analytics charts and per-learner engagement breakdown"
        },
        "caption2": "Analytics detail — interactive charts with hover tooltips and filterable learner table",
        "bg": "light"
      },
      {
        "type": "process-step",
        "stepNumber": "03",
        "label": "Export Pipeline",
        "heading": "From screen to boardroom in one click",
        "body": "Administrators present reports to principals, school boards, and ministry officials. I designed a one-click PDF export with server-side Puppeteer rendering — OUP-branded, with chart legends and an auto-generated executive summary. CSV export serves spreadsheet-level analysis. Scheduled email reports (daily, weekly, monthly) solved the \"out of sight, out of mind\" problem. The pipeline handles reports covering 10,000+ students without timeout, with progressive loading for large datasets.",
        "bg": "light"
      },
      {
        "type": "fullwidth-image",
        "image": {
          "src": "/images/projects/org-reports/discovery-cards.png",
          "alt": "Discovery research cards showing problem statement, user needs, competitive analysis findings, and MVP requirements"
        },
        "caption": "Discovery synthesis — problem framing, user needs, competitive findings, and MoSCoW-scoped MVP requirements",
        "bg": "light"
      },
      {
        "type": "quote",
        "quote": "For the first time, I can see which classes are actually using the materials we purchased. Last month, I identified 3 teachers who hadn't activated their accounts — we fixed that in a day instead of discovering it at renewal.",
        "attribution": "School Director, pilot programme participant, Madrid",
        "bg": "light"
      },
      {
        "type": "text",
        "label": "Impact & Results",
        "heading": "Data-driven decisions that directly improved retention",
        "body": "The reporting MVP launched on schedule and was immediately adopted by pilot programme schools. Within 60 days, administrator engagement with the platform increased by 52% — they finally had a reason to log in regularly. Schools using the reporting tools showed a 28% higher licence renewal rate, directly tying the feature to revenue retention. The 3-step wizard pattern was later adopted by two other OUP product teams as a standard interaction model for complex configuration flows.",
        "bg": "dark"
      },
      {
        "type": "stats",
        "stats": [
          {
            "value": "+52%",
            "label": "Admin platform engagement",
            "context": "measured over first 60 days"
          },
          {
            "value": "+28%",
            "label": "Licence renewal rate",
            "context": "in schools using reporting tools"
          },
          {
            "value": "10 weeks",
            "label": "Discovery to shipped MVP"
          },
          {
            "value": "3-step",
            "label": "Wizard pattern adopted org-wide"
          }
        ],
        "bg": "accent"
      },
      {
        "type": "reflection",
        "label": "Reflection",
        "heading": "Lessons from building a reporting product from zero",
        "body": "Building a reporting tool from scratch taught me that the hardest design problem is not visualisation — it is deciding what not to show. Every stakeholder wanted their favourite metric on the default view, and saying no required data to back up every prioritisation call. The tiered needs framework (engagement → progress → intervention) was essential for those conversations. Looking back, I would have pushed for a more robust scheduled-reports feature earlier — the email digest ended up being the most-used export path, but we treated it as a nice-to-have. I also wish I had prototyped with real data sooner; our early tests used placeholder numbers that masked readability issues with large datasets that only surfaced in production.",
        "bg": "light"
      }
    ]
  },
  {
    "id": "components-production",
    "slug": "components-production",
    "title": "Components Production",
    "subtitle": "Oxford English Hub",
    "category": "DESIGN SYSTEM",
    "number": "05",
    "description": "Designed and shipped platform components (TabList, ListItems, Progress Ring, Cards) to accelerate delivery and ensure consistency. Authored usage guidance so components integrate cleanly across journeys and contexts.",
    "tags": [
      "Product Design",
      "User Journey Mapping",
      "Component Design"
    ],
    "color": "#26A69A",
    "cover": "/images/projects/components-production-cover-new.jpg",
    "coverStyle": "browser",
    "images": [
      { "src": "/images/projects/components-production-new/tab-button.svg", "alt": "TabList Anatomy" },
      { "src": "/images/projects/components-production-new/progress-ring.svg", "alt": "Progress Ring Specs" },
      { "src": "/images/projects/components-production-new/skill-card.svg", "alt": "Skill Card Composition" }
    ],
    "behanceUrl": "",
    "employer": "Oxford English Hub (Oxford University Press)",
    "role": "Lead Product Designer",
    "team": "1 Designer, 4 Engineers",
    "tools": "Figma, Storybook, Confluence",
    "platform": "Web (Responsive)",
    "hidden": false,
    "caseStudy": [
      {
        "type": "tldr",
        "label": "Overview",
        "heading": "Designing the Core Components",
        "bullets": [
          "Problem: Expanding Oxford English Hub led to fragmented design with inconsistent implementations and widespread accessibility violations.",
          "Approach: Audited the existing components, then designed production-ready structural primitives: TabList, Progress Ring, and Skill Card.",
          "Impact: Ensured 100% WCAG AA compliance across these elements, improved UI creation speed, and provided strict guidelines without stripping away engineering autonomy.",
          "Role: Lead Product Designer."
        ],
        "bg": "dark"
      },
      {
        "type": "component-fragments",
        "mode": "progress-ring",
        "componentName": "Progress Ring",
        "bg": "light",
        "label": "Progress Ring",
        "body": "The Progress Ring provides an at-a-glance indicator of completion. It maps values to coloured arcs, animates transitions over 800ms using cubic-bezier(0.2, 0, 0, 1), and exposes full semantics for screen readers.",
        "fragments": [
          {
            "title": "Anatomy",
            "subtitle": "Circle, track, and stroke dasharray",
            "imageSrc": "/images/projects/components-production-new/fragments/ring-anatomy.svg",
            "invertInDarkMode": true,
            "description": "A progress ring consists of a background track (neutral) and an indicator arc whose stroke-dasharray represents the current value. The calculation uses circumference × (value / max) to determine the visible arc length."
          },
          {
            "title": "Layout & Spacing",
            "subtitle": "Four standard sizes with calibrated stroke widths",
            "imageSrc": "/images/projects/components-production-new/fragments/ring-layout-spacing.svg",
            "invertInDarkMode": true,
            "description": "Rings come in four sizes (XS 24px, S 32px, M 48px, L 64px). Stroke weight scales with size so the visual balance remains consistent across densities and breakpoints."
          },
          {
            "title": "Properties",
            "subtitle": "Thresholds, values, and motion",
            "imageSrc": "/images/projects/components-production-new/fragments/ring-value.svg",
            "invertInDarkMode": true,
            "description": "Threshold colours map to performance: amber (<25%), teal (25–75%), green (>75%). When the value updates, the stroke-dasharray animates over 800ms using cubic-bezier(0.2, 0, 0, 1). Under prefers-reduced-motion, the transition is disabled and the new value appears instantly. When max ≠ 100, aria-valuetext announces 'value out of max' to avoid percentage misinterpretation."
          },
          {
            "title": "Completion States",
            "subtitle": "Celebration micro-interaction",
            "imageSrc": "/images/projects/components-production-new/fragments/ring-showcase.svg",
            "invertInDarkMode": true,
            "description": "Crossing 100% triggers a subtle scale-up (1.05×) and a final colour shift to Success Green. This provides positive reinforcement without being distracting."
          },
          {
            "title": "Accessibility Requirements",
            "subtitle": "Labeling, semantics, and screen reader behaviour",
            "imageSrc": "/images/projects/components-production-new/fragments/ring-aria.svg",
            "invertInDarkMode": true,
            "description": "The Progress Ring meets WCAG 2.1 AA. Each ring carries a descriptive label associated via <code>aria-labelledby</code>, exposes determinate progress through a native <code>&lt;progress&gt;</code> element or <code>role='progressbar'</code>, and hides decorative SVGs with <code>aria-hidden='true'</code> so values aren't announced twice. Visible percentage text is announced once, animations respect <code>prefers-reduced-motion</code>, multiple rings receive unique labels, and non-percentage values use <code>aria-valuetext</code> to be read as a fraction rather than a percentage."
          }
        ]
      },
      {
        "type": "component-fragments",
        "mode": "tab-button",
        "componentName": "TabList & TabButton",
        "bg": "dark",
        "label": "Navigation Elements",
        "body": "The TabList is a structural primitive that manages selection state across a group of TabButtons. It supports keyboard navigation, horizontal and vertical orientations, and automatic overflow management.",
        "fragments": [
          {
            "title": "Anatomy",
            "subtitle": "Core structure and active indicators",
            "imageSrc": "/images/projects/components-production-new/tablist/Anatomy.svg",
            "invertInDarkMode": true,
            "description": "The TabList is a collection of interactive triggers (TabButtons) that control the visibility of associated content panels. A key visual signature is the sliding 'active indicator', which provides immediate visual feedback on the current selection."
          },
          {
            "title": "TabButton Anatomy",
            "subtitle": "Internal layout and target areas",
            "imageSrc": "/images/projects/components-production-new/tablist/TabButton Anatomy.svg",
            "invertInDarkMode": true,
            "description": "Each TabButton is designed with a generous hit area to ensure ease of interaction on both desktop and touch devices. The internal layout is flexible, accommodating text, icons, and badges while maintaining consistent alignment."
          },
          {
            "title": "Interaction States",
            "subtitle": "Focus, Hover, Pressed, and Selected states",
            "imageSrc": "/images/projects/components-production-new/tablist/States.svg",
            "invertInDarkMode": true,
            "description": "To ensure 100% accessibility, every interaction state is clearly defined. This includes high-contrast focus rings for keyboard users and subtle weight changes for hover and selection states."
          },
          {
            "title": "Iconography",
            "subtitle": "Leading and trailing icon support",
            "imageSrc": "/images/projects/components-production-new/tablist/Icons.svg",
            "invertInDarkMode": true,
            "description": "The component supports both leading and trailing icons, allowing designers to add semantic meaning or visual cues. Icons are automatically scaled and tinted based on the button's state."
          },
          {
            "title": "Layout & Spacing",
            "subtitle": "Horizontal and Vertical rhythm tokens",
            "imageSrc": "/images/projects/components-production-new/tablist/Layout and spacing.svg",
            "invertInDarkMode": true,
            "description": "Spacing is governed by a strict token system, ensuring that the component maintains its visual integrity across different screen sizes and languages."
          },
          {
            "title": "Overflow Strategy",
            "subtitle": "Managing density with intelligent scrolling",
            "imageSrc": "/images/projects/components-production-new/tablist/Overflow.svg",
            "invertInDarkMode": true,
            "description": "When the number of tabs exceeds the available horizontal space, the TabList transitions into a scrolling container with optional fade indicators to signal additional content."
          },
          {
            "title": "Color Matrix",
            "subtitle": "Theming and parity rules",
            "imageSrc": "/images/projects/components-production-new/tablist/Matrix.svg",
            "invertInDarkMode": true,
            "description": "The component is built to be theme-agnostic. Using a standardized color matrix, it maintains perfect legibility and brand alignment in both light and dark modes."
          },
          {
            "title": "Accessibility (Aria Schema)",
            "subtitle": "Keyboard and Screen Reader implementation",
            "imageSrc": "/images/projects/components-production-new/tablist/Accessibility.svg",
            "invertInDarkMode": true
          },
          {
            "title": "Accessibility Requirements",
            "subtitle": "WCAG compliance and screen reader guidelines",
            "imageSrc": "/images/projects/components-production-new/tablist/Accessibility Requirements.svg",
            "invertInDarkMode": true,
            "description": "The TabList and TabButton components must meet WCAG 2.1 AA standards. All interactive elements are keyboard navigable using arrow keys, with visible focus indicators that meet contrast ratios. Screen readers announce the selected tab, disabled state, and tabpanel relationships via proper ARIA attributes."
          },
          {
            "title": "TabList Accessibility Implementation",
            "subtitle": "ARIA roles, states, and properties",
            "imageSrc": "/images/projects/components-production-new/tablist/Accessibility TabList.svg",
            "invertInDarkMode": true,
            "description": "The TabList uses role='tablist' with aria-orientation for direction. Each TabButton has role='tab', aria-selected, aria-controls pointing to its tabpanel, and aria-labelledby for label association. Tabpanels have role='tabpanel' with aria-labelledby referencing the controlling tab. The active tab is in the tab order (no tabindex='-1' on selected); inactive tabs are removed from the tab order."
          }
        ]
      },
      {
        "type": "component-fragments",
        "mode": "product-card",
        "componentName": "Product Card",
        "bg": "dark",
        "label": "Content & Commerce",
        "body": "A learner-facing card that surfaces course products with clear hierarchy, 5 interaction states, and full accessibility compliance — designed for handoff with defined spacing tokens and ARIA patterns.",
        "fragments": [
          {
            "title": "Anatomy",
            "subtitle": "Slots, hierarchy, and structure",
            "imageSrc": "/images/projects/components-production-new/product-card/Anatomy.svg",
            "invertInDarkMode": true,
            "description": "The Product Card is built on a slot-based anatomy: Media, Header, Metadata, and Action. Each slot has a defined role, allowing the card to surface course products consistently while remaining flexible enough to accommodate varying content lengths and product types."
          },
          {
            "title": "Properties",
            "subtitle": "5 interaction states and configuration options",
            "imageSrc": "/images/projects/components-production-new/product-card/Properties.svg",
            "invertInDarkMode": true,
            "description": "Five interaction states are fully specified: Default, Hover, Focus, Hover+Focus, and Responsive. State changes are communicated through elevation shifts, border highlights, and colour transitions — all within WCAG AA contrast thresholds. Configuration properties control content truncation, badge visibility, and action affordance."
          },
          {
            "title": "Spacing",
            "subtitle": "Token-governed internal rhythm",
            "imageSrc": "/images/projects/components-production-new/product-card/Spacing.svg",
            "invertInDarkMode": true,
            "description": "All internal spacing is governed by the platform token system. Padding, gap, and margin values are expressed as named tokens rather than raw pixels, ensuring the card maintains its visual rhythm across density changes and localisation — particularly important for languages with longer string lengths."
          },
          {
            "title": "Responsive Layout",
            "subtitle": "Adaptive layout from mobile to desktop",
            "imageSrc": "/images/projects/components-production-new/product-card/Responsive Layout.svg",
            "invertInDarkMode": true,
            "description": "The card adapts across three breakpoints. On mobile, the media slot moves to a stacked layout with a reduced footprint. At 200% zoom, the layout reflows gracefully without clipping or overflow. Minimum touch target sizes are preserved at all breakpoints per WCAG 2.5.5."
          },
          {
            "title": "Accessibility",
            "subtitle": "ARIA patterns, keyboard support, and screen reader behaviour",
            "imageSrc": "/images/projects/components-production-new/product-card/Accessibility.svg",
            "invertInDarkMode": true,
            "description": "The card uses the nested interactive element pattern: the card surface is a non-interactive container (<article>) with a clearly labelled primary action link. This prevents screen readers from announcing duplicate interactive targets. aria-labelledby associates the product title with the action. Focus is visible on the action link only, preserving a clean tab order through lists of cards."
          }
        ]
      },
      {
         "type": "stats",
         "label": "Impact",
         "stats": [
           { "value": "100%", "label": "WCAG Compliance", "context": "Across the 3 main components" },
           { "value": "0", "label": "Forks after rollout", "context": "due to strict composable slots" }
         ],
         "bg": "accent"
      }
    ]
  },
  {
    "id": "design-system",
    "slug": "design-system",
    "title": "Design System",
    "subtitle": "asoudan.com v1.0",
    "category": "DESIGN SYSTEM",
    "number": "14",
    "description": "A dark-first design system for asoudan.com — Montserrat across the 100–900 weight range, a cyan primary accent, a secondary amber-orange (#F0A840), and twelve opacity steps replacing a grey scale. Tokens, type, colour, rhythm, and core components extracted directly from the live codebase and mirrored in Figma.",
    "tags": [
      "Design System",
      "Design Tokens",
      "Typography",
      "Figma",
      "Accessibility"
    ],
    "color": "#00F1F1",
    "cover": "/images/projects/design-system/cover.svg",
    "coverStyle": "contain",
    "images": [
      {
        "src": "/images/projects/design-system/cover.svg",
        "alt": "Design System — Cover"
      }
    ],
    "behanceUrl": "",
    "role": "Designer & Author",
    "timeline": "2026",
    "team": "Solo",
    "tools": "Figma, Next.js, Tailwind",
    "platform": "Web",
    "caseStudy": [
      {
        "type": "tldr",
        "label": "v1.0 — Design System",
        "heading": "asoudan.com design system — dark-first, Montserrat, one cyan accent",
        "bullets": [
          "Direction: immersive · editorial. Dark (default) + Light themes, cross-faded on theme switch.",
          "Font: Montserrat 100–900 across the full weight range. JetBrains Mono for tokens, metadata, and code.",
          "Primary accent: cyan #00F1F1 — used to point, never to decorate. Dark hover #00c8c8; light shifts to #008b8b / #006f6f. Secondary: amber #F0A840 — for CTAs, project tags, and interactive highlights.",
          "Output: six surface tokens, a twelve-step foreground opacity ladder, an eleven-role type scale, ten-step spacing scale, and a core component library — all extracted from the live globals.css and mirrored in Figma."
        ],
        "bg": "dark"
      },
      {
        "type": "stats",
        "label": "01 — Foundations",
        "heading": "Four principles",
        "stats": [
          {
            "value": "01",
            "label": "Dark is the default",
            "context": "The site opens dark and stays dark. Light is a courtesy, not a baseline."
          },
          {
            "value": "02",
            "label": "One glowing accent",
            "context": "Cyan #00F1F1 is the only hue with saturation. Use it to point, never to decorate."
          },
          {
            "value": "03",
            "label": "Foreground by opacity",
            "context": "Twelve opacity steps of the foreground replace a grey scale. Hierarchy by alpha, not hue."
          },
          {
            "value": "04",
            "label": "Theme switch as fade",
            "context": "Every surface inherits a 0.3s background-color/border/color transition, so toggling theme reads as a single coordinated fade."
          }
        ],
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "02 — Typography",
        "heading": "Type system — Montserrat 100–900, JetBrains Mono for data",
        "body": "Montserrat carries everything using the full 100–900 weight range for hierarchy; JetBrains Mono is a supporting voice for tokens, metadata, and code, never decorative. The specimen set: **Display** Montserrat 88 / 100 / weight 100 / -0.035em. **H1** 64 / 64 / 200 / -0.03em. **H2** 44 / 46 / 300 / -0.025em. **H3** 28 / 34 / 500 / -0.015em. **H4** 20 / 26 / 600. **Lede** 20 / 30 / 300 at fg-70. **Body L** 18 / 28 / 400. **Body** 16 / 26 / 400 at fg-70, measure caps at 62ch. **Small** 14 / 22 / 400. **Caption** 12 / 18 / 500. **Eyebrow** 11 / 14 / 600 tracked 0.24em in accent. **Mono** JetBrains Mono 13 tracked 0.02em in accent. Body running at 70% foreground opacity lets headings at full strength always read as the senior element on the page.",
        "bg": "light"
      },
      {
        "type": "text",
        "label": "03 — Colour · surfaces",
        "heading": "Six surface tokens — deep blue-black, stepping up to raised",
        "body": "The dark palette is six named surfaces: **--bg-primary #0a0c14** (canvas), **--bg-secondary #141620** (section fill), **--bg-tertiary #111322** (inset), **--bg-surface #1a1d2e** (card), **--bg-surface-2 #23273a** (input / raised), **--bg-footer #0d0f1a** (footer — stays dark even in light mode). Two accent tokens form a two-tier colour hierarchy: **primary --accent #00F1F1** (dark) / **#008b8b** (light), hover **#00c8c8** / **#006f6f** — used for primary CTAs, active states, and focus rings. **Secondary --secondary #F0A840** (dark) / **#B45309** (light), hover **#d4922a** / **#92400E** — used for secondary CTAs, project tags, footer social hover, and interactive highlights. Both tokens expose an `-rgb` triplet (`--accent-rgb`, `--secondary-rgb`) so `rgba(var(--token-rgb), α)` works everywhere without opacity hacks. Light theme mirrors the structure: #f8f8f8 canvas, #ffffff card, ink #16192A. Selection uses the accent at 30% opacity with white ink. Focus is 2px accent, 2px offset — no exceptions. Scrollbar is a 6px rail with a cyan thumb at 3px radius.",
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "03 — Colour · opacity ladder",
        "heading": "One foreground token, twelve opacity steps — no grey scale",
        "body": "Instead of maintaining a parallel grey scale, the foreground token `rgba(255,255,255,α)` in dark mode (and `rgba(22,25,42,α)` in light mode) steps through twelve opacities, each mapped to a role: **1.00** headings at full strength. **0.70** body copy and navigation hover. **0.60** secondary copy, card paragraphs. **0.50** metadata, years, captions. **0.40** placeholders. **0.30** disabled states. **0.20** / **0.15** dividers and subtle borders. **0.10** card borders. **0.08** / **0.06** tag backgrounds and nav borders. **0.05** repeating hatch and skeletons. Because every step is the same colour at a different alpha, light and dark themes stay perfectly paired and contrast stays predictable.",
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "04 — Space",
        "heading": "Tailwind's 4px scale, four radii, glow instead of shadow",
        "body": "Spacing follows the default Tailwind 4px step scale — **4, 8, 12, 16, 24, 32, 48, 64, 96, 128** — so engineering reads directly from the design. Radii quantise to four values: **4 (sm), 8 (md), 12 (lg), 999 (pill)**. Depth is glow, not shadow: **base** 0 8px 24px rgba(0,0,0,0.3); **soft cyan halo** 0 0 24px rgba(0,241,241,0.25); **hover halo** 0 0 40px rgba(0,241,241,0.45). Grid and motion: **max-width 1200px** content container with **32px page gutters** and a **62ch** body measure. Base transition is **0.3s ease** on background-color / border-color / color; theme switch is a **0.35s ease** body cross-fade. Continuous animations use framer-motion springs on transform/opacity only, so scroll stays at 60fps.",
        "bg": "light"
      },
      {
        "type": "text",
        "label": "05 — Components · chrome",
        "heading": "Header, buttons, links — the site's load-bearing pieces",
        "body": "**Sticky header** — 64px high, --nav-bg with 12px backdrop blur, brand mark left (\"Ahmed Soudan.\" with the full stop rendered in accent and an accent text-shadow glow), tracked uppercase nav right (11px / 600 / 0.14em, colour fg-60, hover → accent), and a CTA arrow-link. **Buttons** — three hierarchies at 44px height, pill radius, 12px / 600 / 0.12em label: **primary** (filled cyan, ink #0a0c14, soft cyan halo that brightens on hover 0.25 → 0.45 opacity), **secondary** (solid amber border + text, permanent double-ring glow `0 0 0 1px secondary/25%, 0 0 18px secondary/30%` — applied to hero Experience, template secondary CTAs, real-estate contact button, elite-diner Book a Table), **ghost** (text-only fg-70, hover to accent). **Links** — inline text (accent with a 35% accent underline), arrow-CTA (tracked uppercase with → that translates 3–4px on hover). **Social icons** — 44px pill, border-card at rest; hover lifts, border and text shift to secondary, a 24px amber glow at 50% opacity appears.",
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "05 — Components · content",
        "heading": "Tags, form, floating nav, project tile",
        "body": "**Tags** — pill, 26px high, 11px / 500 / 0.08em tracked label. Four variants: **default** (fg-06 background, fg-70 label, border-subtle), **accent** (accent at 12%, accent text, accent border at 35%), **secondary** (secondary at 8% background, secondary text, secondary border at 20% — used on project tags in the carousel and template feature chips), **outline** (transparent background, border-subtle). **Form fields** — sit on --bg-surface-2 with an 8px radius and border-card boundary. Field labels are 10px / 600 / 0.16em tracked uppercase at fg-60. Inputs are 15px / 400. Focus activates a 2px accent border and a 3px accent glow at 18% opacity. **Floating nav** — pill-shaped with --nav-bg blur, 40px circular dots at 10px / 700 / 0.1em; active dot carries accent at 12% with a 1px inset accent ring at 30%. **Project tile** — 16:10 thumbnail zone over a head row (title 20/600, year JetBrains Mono 12 at fg-50), body copy at fg-60 13/1.5, and a tag strip. Hover lifts -3px, brightens the border to accent at 50%, and adds a composite shadow plus accent ring.",
        "bg": "dark"
      },
      {
        "type": "showcase",
        "label": "05 — Components · project tile",
        "heading": "The piece the whole site turns around",
        "body": "The project tile is the atomic unit of the site — homepage grid, carousel card, and template sub-site homepages all render from it. The thumbnail is a 16:10 surface composed from a diagonal gradient layered with a 135° hatch of fg-05 at 10px / 20px intervals, overlay-blended. Rest state sits on bg-surface with a border-card boundary; hover translateY(-3px), border-color moves to accent-0.5, and the card gains a 0 16px 40px rgba(0,0,0,0.3) shadow composited with an accent-0.2 outer ring.",
        "image": {
          "src": "/images/projects/design-system/card-gallery.svg",
          "alt": "Project tile variants — rest, hover, featured (accent tag), and skeleton states"
        },
        "caption": "Project tile — one component across the homepage grid, the immersive carousel, and every template sub-site",
        "showcaseBg": "#0a0c14",
        "bg": "light"
      },
      {
        "type": "text",
        "label": "06 — Applied",
        "heading": "Pages in use — hero entrance + case-study open",
        "body": "The tokens assemble into the key surfaces the site spends most of its life in. **Hero entrance** — Display 88/100 headline, 20/300 lede at fg-70, and a two-button CTA pair: primary (filled cyan) + secondary (amber outline, `border: var(--secondary)`, permanent amber glow). The background carries a radial accent gradient at 8% opacity. **Project carousel** — hover-reveal shows description, three secondary-coloured tags, and a CTA button using each project's own colour. **Template showcase** — feature chip tags use the secondary token (8% bg, secondary text, 20% border). **Case-study open** — Eyebrow, H2 36/1.05/300, lede at fg-70, body at fg-60, tag strip (default + accent \"Shipped\" pill). **Template sub-sites** — secondary buttons (Book a Table, Browse shop, Contact About Pricing, Meet the AI stylist) all share the secondary glow variant; the Real Estate \"Under Offer\" status badge now maps to --secondary instead of a hardcoded amber. All surfaces inherit the same 0.3s theme-fade transition.",
        "bg": "dark"
      },
      {
        "type": "stats",
        "label": "System at a glance",
        "heading": "What v1.0 ships with",
        "stats": [
          {
            "value": "6",
            "label": "Named surface tokens",
            "context": "canvas #0a0c14 → surface-2 #23273a, plus footer pinned to #0d0f1a"
          },
          {
            "value": "12",
            "label": "Foreground opacity steps",
            "context": "one fg token × alpha replaces the grey scale entirely"
          },
          {
            "value": "11",
            "label": "Roles in the type scale",
            "context": "Display → Eyebrow, Montserrat 100–900 + JetBrains Mono"
          },
          {
            "value": "10",
            "label": "Steps in the spacing scale",
            "context": "Tailwind 4px cadence, 4 → 128"
          }
        ],
        "bg": "accent"
      },
      {
        "type": "reflection",
        "label": "Reflection",
        "heading": "What extracting a system from a live site taught me",
        "body": "Starting from globals.css rather than a blank Figma file forces a different kind of honesty. The live site is already a working system — its tokens, spacing, and motion rules have been pressure-tested by every page. Documenting it after the fact surfaces every inconsistency: the one-off colour that never made it into a token, the spacing value that broke the 4px rule, the component that detached from the system and quietly drifted. The payoff is portability. The same system now drives the portfolio, every case study, and the template sub-sites — Elite Diner and Real Estate — without any bespoke overrides."
      }
    ]
  },
  {
    "id": "nano-gps",
    "slug": "nano-gps",
    "title": "Nano GPS",
    "subtitle": "Teaser Campaign",
    "category": "CAMPAIGN",
    "number": "06",
    "description": "Teaser campaign design for Nano GPS tracking solution with engaging visuals and strategic messaging.",
    "tags": [
      "Campaign",
      "Social Media",
      "Branding"
    ],
    "color": "#3D9B9B",
    "cover": "/images/projects/nano-gps.jpg",
    "coverStyle": "contain",
    "images": [],
    "behanceUrl": "https://www.behance.net/gallery/111842085/Nano-Gps-Teaser-Campaign"
  },
  {
    "id": "private-transport",
    "slug": "private-transport",
    "title": "Private Transport",
    "subtitle": "Mobile App",
    "category": "UX/UI",
    "number": "07",
    "description": "Comprehensive UX/UI design for a private transportation mobile application focused on user-friendly booking.",
    "tags": [
      "Mobile App",
      "UX/UI",
      "Transportation"
    ],
    "color": "#4A7FBD",
    "cover": "/images/projects/private-transport.jpg",
    "coverStyle": "contain",
    "images": [],
    "behanceUrl": "https://www.behance.net/gallery/137616831/Private-Transportation-App"
  },
  {
    "id": "zas-air",
    "slug": "zas-air",
    "title": "ZAS Air",
    "subtitle": "Website Renovation",
    "category": "UX/UI",
    "number": "08",
    "description": "Complete website renovation for ZAS Air — improved UX and modernized visual design.",
    "tags": [
      "Website",
      "UX/UI",
      "Renovation"
    ],
    "color": "#7B5EA7",
    "cover": "/images/projects/zas-air.jpg",
    "coverStyle": "contain",
    "images": [],
    "behanceUrl": "https://www.behance.net/gallery/107305835/ZAS-Air-Website-renovation-UIUX"
  },
  {
    "id": "seater-app",
    "slug": "seater-app",
    "title": "Seater",
    "subtitle": "Reservation App",
    "category": "UX/UI",
    "number": "09",
    "description": "UX/UI design for an innovative seating arrangement and reservation application.",
    "tags": [
      "Mobile App",
      "UX/UI",
      "Reservation"
    ],
    "color": "#BD6B4A",
    "cover": "/images/projects/seater-app.jpg",
    "coverStyle": "contain",
    "images": [],
    "behanceUrl": "https://www.behance.net/gallery/92566769/Seater-App-UIUX"
  },
  {
    "id": "dealnbuy-campaign",
    "slug": "dealnbuy-campaign",
    "title": "DealNBuy",
    "subtitle": "Social Campaign",
    "category": "CAMPAIGN",
    "number": "10",
    "description": "Promotional social media campaign design for DealNBuy e-commerce platform.",
    "tags": [
      "Social Media",
      "Campaign",
      "E-commerce"
    ],
    "color": "#4ABD8C",
    "cover": "/images/projects/dealnbuy-campaign.jpg",
    "coverStyle": "contain",
    "images": [],
    "behanceUrl": "https://www.behance.net/gallery/89258495/DealNBuy-Social-Media-Promo-Campaign"
  },
  {
    "id": "royal-home",
    "slug": "royal-home",
    "title": "Royal Home",
    "subtitle": "E-commerce Platform",
    "category": "UX/UI",
    "number": "11",
    "description": "E-commerce platform design for Royal Home Furniture with seamless shopping experience.",
    "tags": [
      "E-commerce",
      "UX/UI",
      "Furniture"
    ],
    "color": "#BD4A6B",
    "cover": "/images/projects/royal-home.jpg",
    "coverStyle": "contain",
    "images": [],
    "behanceUrl": "https://www.behance.net/gallery/106658979/Royal-Home-Furniture-e-commerce-UIUX"
  },
  {
    "id": "logos",
    "slug": "logos",
    "title": "Logo Collection",
    "subtitle": "Brand Identity",
    "category": "BRANDING",
    "number": "12",
    "description": "A curated collection of logo designs showcasing versatility across various industries.",
    "tags": [
      "Logo Design",
      "Branding",
      "Identity"
    ],
    "color": "#6B9B3D",
    "cover": "/images/projects/logos.jpg",
    "coverStyle": "contain",
    "images": [],
    "behanceUrl": "https://www.behance.net/gallery/70344501/Logos-2"
  },
  {
    "id": "dealnbuy-uxui",
    "slug": "dealnbuy-uxui",
    "title": "DealNBuy",
    "subtitle": "UX/UI Platform",
    "category": "UX/UI",
    "number": "13",
    "description": "Complete UX/UI design for DealNBuy e-commerce platform, from research to final interface.",
    "tags": [
      "E-commerce",
      "UX/UI",
      "Platform"
    ],
    "color": "#3D6B9B",
    "cover": "/images/projects/dealnbuy-uxui.jpg",
    "coverStyle": "contain",
    "images": [],
    "behanceUrl": "https://www.behance.net/gallery/85331167/DealNBuy-UIUX"
  },
];
