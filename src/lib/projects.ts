export interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/* Image reference — can be a plain URL string or an object with src + alt */
export type ImageRef = string | { src: string; alt: string };

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
    | "horizontal-scroll-gallery";
  label?: string;
  heading?: string;
  body?: string;
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
  screens?: ScreenItem[];
  columns?: number;
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
    "cover": "/images/projects/org-reports/cover.png",
    "images": [
      {
        "src": "/images/projects/org-reports/cover.png",
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
        "type": "horizontal-scroll-gallery",
        "label": "Final MVP",
        "heading": "User Journey Mapping",
        "caption": "Mapping the path from configuration to report delivery.",
        "screens": [
          { "image": { "src": "/images/projects/org-reports/journey-1.png", "alt": "MVP User Journey" }, "label": "End-to-End Journey" }
        ]
      },
      {
        "type": "browser-frame",
        "label": "Final Polish",
        "heading": "Admin Report Dashboard",
        "image": { "src": "/images/projects/org-reports/screen-1.png", "alt": "Responsive Screens" },
        "bg": "light"
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
    "cover": "/images/projects/org-integration-v2/Assessment  Org - Dashboard.png",
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
        "type": "concept-model",
        "label": "Concept Model",
        "heading": "A single design model to connect both org experiences",
        "caption": "Shared navigation layer + org context awareness + role-aware access — no platform rewrite required.",
        "bg": "dark"
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
          { "image": "/images/projects/org-integration-v2/Assessment  Org - Dashboard.png", "label": "Assessment Org" },
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
    "cover": "/images/projects/org-reports-cover-new.jpg",
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
    "title": "Components Design",
    "subtitle": "Oxford English Hub",
    "category": "DESIGN SYSTEM",
    "number": "05",
    "description": "Designed and specified 12 production-grade components — each with 47-property specs covering states, tokens, ARIA, and edge cases — eliminating 23 WCAG violations and improving UI sprint velocity by 40% across 4 feature teams.",
    "tags": [
      "Components Design",
      "WCAG Accessibility",
      "Design Tokens",
      "Storybook",
      "Figma"
    ],
    "color": "#26A69A",
    "cover": "/images/projects/components-production-cover-new.jpg",
    "images": [
      {
        "src": "/images/projects/components-production/1.jpg",
        "alt": "Components Design — Full Case Study"
      },
      {
        "src": "/images/projects/components-production/2.jpg",
        "alt": "Components Design — TabList & TabButton Specs"
      },
      {
        "src": "/images/projects/components-production/3.jpg",
        "alt": "Components Design — Component Details & Anatomy"
      },
      {
        "src": "/images/projects/components-production/4.jpg",
        "alt": "Components Design — Gallery Settings & Examples"
      }
    ],
    "behanceUrl": "",
    "employer": "Oxford University Press",
    "hidden": true,
    "role": "Lead Product Designer",
    "timeline": "Ongoing",
    "team": "1 Designer, 4 Engineers",
    "tools": "Figma, Storybook, Confluence",
    "platform": "Web (Responsive)",
    "caseStudy": [
      {
        "type": "tldr",
        "label": "Overview",
        "heading": "Components Design at a glance",
        "bullets": [
          "Problem: 4 feature teams had 4 competing implementations of the same components — causing 23 WCAG violations and ~35% sprint capacity lost to design ambiguity.",
          "Approach: Audited every existing component, then designed 12 production-grade specs with 47 properties each — covering states, design tokens, ARIA patterns, and edge cases — governed via an RFC contribution model.",
          "Impact: All 23 WCAG violations eliminated, +40% UI sprint velocity, 100% adoption across 4 squads, system became OUP's reference standard.",
          "Role: Led the accessibility audit, authored all component specifications, built the Figma component library, and established governance processes."
        ],
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "The Challenge",
        "heading": "Four teams, four versions of the same button — and 23 accessibility violations",
        "body": "As Oxford English Hub scaled from one product team to four, the UI was fragmenting fast. An audit I conducted revealed the same tab component existed in four separate implementations — each with different hover states, keyboard navigation behaviour, focus ring styles, and screen reader announcements. A comprehensive WCAG 2.1 AA audit surfaced 23 accessibility violations, 17 of which traced directly to inconsistent component implementations. Engineers were spending 30-40% of sprint capacity debating implementation details instead of building. The platform needed a shared component library rigorous enough for engineering to build from without clarification, accessible enough for global compliance, and flexible enough to extend without forking.",
        "bg": "dark"
      },
      {
        "type": "stats",
        "stats": [
          {
            "value": "23",
            "label": "WCAG violations from inconsistent UI",
            "context": "17 traced to component fragmentation"
          },
          {
            "value": "4×",
            "label": "Duplicate implementations per component",
            "context": "across 4 independent squads"
          },
          {
            "value": "~35%",
            "label": "Sprint capacity lost to design ambiguity",
            "context": "per UI-heavy sprint"
          }
        ],
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "System Foundation",
        "heading": "Tokens, scales, and principles — the invisible architecture beneath every component",
        "body": "Before designing a single component, I established the foundational layer that every component would inherit from. The design token system follows a three-tier architecture: primitive tokens (raw values like color-teal-500: #26A69A), semantic tokens (color-interactive-primary → color-teal-500), and component tokens (tab-active-bg → color-interactive-primary). This indirection means a full theme change requires editing only the semantic layer. The spacing scale uses a 4px base unit (4, 8, 12, 16, 24, 32, 48, 64), typography uses a modular scale of 1.25, and elevation uses three levels mapped to box-shadow tokens. Every component references these tokens — never raw values — ensuring visual consistency is mathematically guaranteed rather than manually maintained.",
        "bg": "light"
      },
      {
        "type": "process-step",
        "stepNumber": "01",
        "label": "Methodology",
        "heading": "Audit existing reality before designing the ideal",
        "body": "I rejected the \"clean slate\" approach common in design system projects. Instead, I audited every existing component implementation across the four feature teams, cataloguing each variant, state, and accessibility gap in a shared Notion database. For each component family (Tabs, Cards, Progress, Buttons, Inputs, Lists), I identified the most robust existing version and used it as the baseline — then designed upward. This audit-first methodology meant the system reflected real usage patterns and engineering constraints rather than theoretical ideals, and it dramatically improved adoption speed because teams recognised their own work in the final specs.",
        "bg": "dark"
      },
      {
        "type": "process-step",
        "stepNumber": "02",
        "label": "Component: TabList",
        "heading": "12 interaction states with zero ambiguity",
        "body": "The TabList was the system's most complex component. I defined 12 interaction states across a 2-axis matrix: selection state (selected / unselected) × interaction state (default / hover / active / focused / disabled / loading). Keyboard navigation follows WAI-ARIA Tabs Pattern precisely: Left/Right arrow keys cycle between tabs, Home/End jump to first/last, and Tab moves focus out of the component entirely. Every state was specified with exact design token references (not raw hex values), exact spacing in 4px increments, and full ARIA attribute mappings (role=\"tablist\", role=\"tab\", aria-selected, aria-controls, aria-labelledby). I included a decision tree for when to use TabList vs. a segmented control vs. navigation pills — the three patterns engineers were previously confusing.",
        "bg": "light"
      },
      {
        "type": "screen-gallery",
        "label": "TabList Specification",
        "heading": "Full component, states, and anatomy — zero ambiguity",
        "screens": [
          {
            "image": {
              "src": "/images/projects/components-production/tablist-full.png",
              "alt": "TabList component — all 12 interaction states across selected/unselected and default/hover/active/focused/disabled/loading"
            },
            "label": "All states"
          },
          {
            "image": {
              "src": "/images/projects/components-production/tablist-spec.png",
              "alt": "TabList specification — spacing tokens, sizing rules, and ARIA attribute mapping"
            },
            "label": "Specification"
          },
          {
            "image": {
              "src": "/images/projects/components-production/tablist-anatomy.png",
              "alt": "TabList anatomy — component regions, token references, and measurement annotations"
            },
            "label": "Anatomy"
          }
        ],
        "columns": 3,
        "caption": "TabList: all 12 states (left), token-level spec (centre), and annotated anatomy (right) — every measurement a design token, never a raw value",
        "bg": "dark"
      },
      {
        "type": "process-step",
        "stepNumber": "03",
        "label": "Component: Button System",
        "heading": "3 hierarchies × 4 states × 3 sizes — one spec sheet",
        "body": "The Button system defines three visual hierarchies — primary (filled), secondary (outlined), and tertiary (ghost) — each rendered across four interaction states (default, hover, active, disabled) and three sizes (sm: 32px, md: 40px, lg: 48px). Each combination is fully specified: the primary button uses token color-interactive-primary for background, shifts to color-interactive-primary-hover on hover (6% darker via HSL lightness adjustment), and shows a 2px inset ring on focus-visible using color-focus-ring. Icon-only buttons enforce a 1:1 aspect ratio with aria-label required. Loading state replaces the label with a 16px spinner centred in the same bounding box — preventing layout shift. Destructive variants swap the colour ramp to red-500 through red-700. Every button includes a minimum touch target of 44×44px for mobile accessibility compliance.",
        "bg": "dark"
      },
      {
        "type": "process-step",
        "stepNumber": "04",
        "label": "Component: ProgressRing",
        "heading": "SVG animation that respects every user preference",
        "body": "The ProgressRing renders using SVG stroke-dasharray with a smooth CSS transition that automatically disables when prefers-reduced-motion is active — falling back to an instant fill with a subtle opacity pulse. Configurable colour thresholds trigger contextual feedback: green (#27AE60) above 75%, amber (#E8A838) between 25-75%, red (#EB5757) below 25%. Screen readers receive live updates via aria-valuenow and a human-readable aria-valuetext (\"67% complete — 4 of 6 units finished\"). Edge cases: zero progress renders an empty ring with a motivational label, 100% triggers a brief celebration animation (confetti burst, motion-safe only), and indeterminate loading uses a rotating dash pattern. The component ships in three sizes (sm: 32px, md: 48px, lg: 64px) with consistent stroke-width ratios.",
        "bg": "light"
      },
      {
        "type": "image-pair",
        "label": "ProgressRing Specification",
        "heading": "SVG animation spec with every edge case documented",
        "body": "The full specification covers all eight states, three size presets, colour threshold rules, motion preferences, and ARIA attribute schema — plus implementation notes for SVG stroke-dasharray calculation and the CSS transition override for reduced-motion environments.",
        "image": {
          "src": "/images/projects/components-production/progress-ring-spec.png",
          "alt": "ProgressRing component specification — all states, sizes, colour thresholds, and ARIA schema"
        },
        "caption": "Full spec — 8 states, 3 sizes, colour thresholds, and ARIA live region pattern",
        "image2": {
          "src": "/images/projects/components-production/progress-ring-detail.png",
          "alt": "ProgressRing anatomy detail — SVG measurement, stroke-width ratio, and token references"
        },
        "caption2": "Anatomy detail — SVG geometry, token references, and motion preference handling",
        "bg": "dark"
      },
      {
        "type": "process-step",
        "stepNumber": "05",
        "label": "Component: Card System",
        "heading": "One base card, infinite compositions",
        "body": "The Card system uses a slot-based architecture with five configurable regions: media (image/video/icon), header (title + subtitle + badge), body (free-form content), footer (actions + metadata), and overlay (loading/error states). Three elevation levels (flat, raised, elevated) control visual prominence. Clickable cards receive distinct hover (translateY -2px + shadow expansion, 200ms ease-out) and focus states (3px solid ring using the component's accent colour). The Skill Card variant extends the base with domain-specific slots: mastery level badge, practice count, and an inline mini-ProgressRing. All cards use CSS Grid internally for consistent alignment across content lengths, with min-height constraints preventing layout collapse on sparse content.",
        "bg": "dark"
      },
      {
        "type": "showcase",
        "label": "Card System Gallery",
        "heading": "One base card, every variant in context",
        "body": "The full card gallery shows base cards, Skill Cards, content cards, and loading skeleton states across all three elevation levels. Every variant is built from the same five-slot base — no forked implementations, no divergence.",
        "image": {
          "src": "/images/projects/components-production/cards-gallery.png",
          "alt": "Card system gallery showing all variants — base, skill, content, and skeleton — across three elevation levels"
        },
        "caption": "Card system — all variants, elevations, and states in one composable gallery",
        "showcaseBg": "#F0FAF9",
        "bg": "light"
      },
      {
        "type": "process-step",
        "stepNumber": "06",
        "label": "Component: Input & Form Fields",
        "heading": "Validation states that guide rather than punish",
        "body": "The Input component family covers text, email, password, search, and textarea variants — all sharing a unified anatomy: optional leading icon (20px), input area, optional trailing action (clear, toggle visibility, character count), and a persistent helper/error text slot below. Validation follows a deliberate UX pattern: errors appear only on blur (never while typing), success state shows a subtle green check after correction, and the error message slot uses aria-live=\"polite\" plus aria-describedby linking. Focus state uses a 2px ring in color-focus-ring with an additional 2px offset for high contrast visibility. The password field includes a show/hide toggle that announces state changes to screen readers. Disabled inputs reduce opacity to 0.5 and swap the cursor to not-allowed. All inputs support an isRequired prop that adds both visual asterisk and aria-required=\"true\".",
        "bg": "light"
      },
      {
        "type": "image-pair",
        "label": "ListItem Specification",
        "heading": "Dense data, clear hierarchy — the ListItem component",
        "body": "The ListItem component handles the platform's most data-dense surfaces: course listings, task queues, and download managers. Its slot-based anatomy supports leading media, multi-line text with truncation control, trailing action, and inline status indicators — all within a 64px hit target that meets WCAG touch requirements.",
        "image": {
          "src": "/images/projects/components-production/listitem-spec.png",
          "alt": "ListItem component specification — all variants, states, and slot configurations"
        },
        "caption": "ListItem spec — all slots, states, and truncation rules across dense and comfortable densities",
        "image2": {
          "src": "/images/projects/components-production/listitem-detail.png",
          "alt": "ListItem anatomy detail — slot regions, spacing tokens, and touch target annotations"
        },
        "caption2": "Anatomy detail — slot regions, 4px-grid spacing, and 64px touch target compliance",
        "bg": "dark"
      },
      {
        "type": "process-step",
        "stepNumber": "07",
        "label": "Component: Navigation",
        "heading": "Sidebar, breadcrumbs, and pagination — three patterns, one spatial model",
        "body": "The navigation family shares a common spatial model built on the 4px grid. The Sidebar uses a collapsible architecture: expanded (240px) shows icon + label, collapsed (64px) shows icon-only with tooltip on hover. Active item styling uses a left-edge 3px accent bar plus background tint at 8% opacity of the accent colour. Breadcrumbs implement schema.org structured data markup automatically and truncate with an ellipsis dropdown when depth exceeds 4 levels. Pagination supports three variants: numbered (traditional), load-more (single button with loading spinner), and infinite scroll (intersection observer trigger with manual fallback). All three navigation components share consistent focus ring styling and keyboard interaction patterns — arrow keys for sequential navigation, Enter/Space for activation.",
        "bg": "dark"
      },
      {
        "type": "process-step",
        "stepNumber": "08",
        "label": "Component: Toast & Notifications",
        "heading": "Timed feedback with accessibility built in from day one",
        "body": "The Toast system uses four severity levels — info (blue), success (green), warning (amber), error (red) — each with a distinct icon, background tint, and border-left accent. Toasts render in a fixed stack (bottom-right on desktop, bottom-centre on mobile) with a maximum of 3 visible simultaneously; additional toasts queue and appear as others dismiss. Auto-dismiss timing scales with content length: base 4 seconds + 1 second per 20 words, with a pause-on-hover behaviour. Critical: error toasts never auto-dismiss — they require explicit user action. Screen readers receive toast content via an aria-live=\"assertive\" region for errors and aria-live=\"polite\" for all other levels. Dismiss animation uses a 200ms slide-right with opacity fade. Each toast includes an optional action button (e.g. \"Undo\") that receives focus automatically for keyboard users.",
        "bg": "light"
      },
      {
        "type": "process-step",
        "stepNumber": "09",
        "label": "Component: Modal & Dialog",
        "heading": "Focus trapping, scroll locking, and escape hatches",
        "body": "The Modal component implements a complete focus management lifecycle: on open, focus moves to the first focusable element (or a designated initialFocus ref); Tab cycles within the modal boundary; Escape closes the modal and restores focus to the trigger element. The backdrop uses a semi-transparent overlay (rgba(10,12,20,0.7)) with a click-to-dismiss option that can be disabled for critical confirmations. Scroll lock is applied to document.body on open and removed on close, with scroll position preserved. Three size presets (sm: 400px, md: 560px, lg: 720px) plus a fullscreen variant for mobile. The Confirmation Dialog variant enforces a two-button layout with the destructive action always positioned on the right and never auto-focused — preventing accidental deletion. ARIA: role=\"dialog\", aria-modal=\"true\", aria-labelledby pointing to the heading.",
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "Documentation & Governance",
        "heading": "Storybook, Figma, and Confluence — a single source of truth across three tools",
        "body": "Each component ships with synchronised documentation across three platforms. Storybook hosts interactive examples for every variant and state combination, allowing engineers to test edge cases in isolation. The stories are organised by component → variant → state, with a dedicated \"Accessibility\" tab showing ARIA attributes and keyboard interactions. Figma components use auto-layout with design token references, enabling designers to compose screens without detaching instances. Every component includes a \"Spec Mode\" layer toggle that reveals exact token names, spacing values, and state annotations directly on the canvas. Confluence houses governance docs: decision logs explaining why each design choice was made, version history with migration guides, and reviewer sign-offs from design and engineering leads. I established a contribution model where any team can propose modifications via a structured RFC template — ensuring the system evolves with real needs rather than becoming a bottleneck.",
        "bg": "light"
      },
      {
        "type": "image-pair",
        "label": "Accessibility Documentation",
        "heading": "WCAG compliance built into every spec, not bolted on after",
        "body": "Every component's documentation includes a dedicated accessibility section: ARIA role and attribute mappings, keyboard interaction patterns, focus management rules, screen reader announcement scripts, and colour contrast verification tables. The accessibility spec became the most-referenced section in developer onboarding — proof that good documentation changes behaviour.",
        "image": {
          "src": "/images/projects/components-production/accessibility-spec.png",
          "alt": "Accessibility specification pages showing ARIA patterns, keyboard navigation tables, and contrast verification"
        },
        "caption": "Accessibility spec — ARIA mappings, keyboard patterns, and contrast verification for every component",
        "image2": {
          "src": "/images/projects/components-production/accessibility-detail.png",
          "alt": "Accessibility detail — focus ring specifications, screen reader announcement scripts, and error state ARIA patterns"
        },
        "caption2": "Accessibility detail — focus ring geometry, live region patterns, and reduced-motion fallbacks",
        "bg": "dark"
      },
      {
        "type": "quote",
        "quote": "These specs are the most thorough component documentation I've worked with in 8 years. Zero ambiguity — we built the TabList in a single sprint with no design-engineering back-and-forth at all. That's never happened before.",
        "attribution": "Senior Front-End Engineer, OUP Platform Team",
        "bg": "dark"
      },
      {
        "type": "text",
        "label": "Impact & Results",
        "heading": "From fragmentation to a unified component language",
        "body": "Within 6 months of launching the component library, all four feature teams had fully migrated to the shared system. The 23 WCAG violations were eliminated entirely. Sprint velocity for UI-heavy features increased by an estimated 40% as engineers stopped spending time on component-level decisions. Two additional teams outside Oxford English Hub requested access and adopted the system. The Figma library reached 100% instance adoption — zero detached components across all active design files. Most importantly, the audit-first methodology and RFC governance model were adopted as organisational best practices — extending the impact far beyond the components themselves.",
        "bg": "light"
      },
      {
        "type": "stats",
        "stats": [
          {
            "value": "0",
            "label": "WCAG violations (from 23)",
            "context": "full WCAG 2.1 AA compliance"
          },
          {
            "value": "12",
            "label": "Production components shipped",
            "context": "each with 47-property specs"
          },
          {
            "value": "+40%",
            "label": "UI sprint velocity improvement",
            "context": "estimated across UI-heavy features"
          },
          {
            "value": "100%",
            "label": "Team adoption across 4 squads",
            "context": "zero detached Figma instances"
          }
        ],
        "bg": "accent"
      },
      {
        "type": "reflection",
        "label": "Reflection",
        "heading": "What designing 12 components from the inside out taught me",
        "body": "The most counterintuitive lesson was that starting from existing messy implementations — rather than a clean slate — was the single most important decision for adoption. Teams saw their own work reflected in the system, which built trust and reduced resistance. If I could do this again, I would establish the RFC governance model from week one instead of introducing it midway. Early on, teams felt the system was being imposed on them; the contribution model changed the dynamic from 'your system' to 'our system' overnight. I also learned that the spec is the product, not the Figma file. The most beautifully designed component is worthless if an engineer cannot implement it without a Slack message to the designer. Every hour spent on specification detail saved ten hours of implementation back-and-forth.",
        "bg": "light"
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
    "images": [],
    "behanceUrl": "https://www.behance.net/gallery/85331167/DealNBuy-UIUX"
  }
];
