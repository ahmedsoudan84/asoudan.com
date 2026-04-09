// Inline SVG icons for the real-estate template — no external deps needed.
// Each icon is a 20×20 SVG accepting className and style props.

type IconProps = { size?: number; className?: string; style?: React.CSSProperties };

function svg(
  d: string | string[],
  { size = 20, className, style }: IconProps = {},
  extras?: React.ReactNode
) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {paths.map((p, i) => (
        <path key={i} d={p} />
      ))}
      {extras}
    </svg>
  );
}

// ── Property card icons ─────────────────────────────────────────

export const BedIcon = (p: IconProps) =>
  svg(
    [
      "M3 7v11",
      "M21 7v11",
      "M3 18h18",
      "M3 11h18",
      "M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4",
    ],
    p
  );

export const BathIcon = (p: IconProps) =>
  svg(
    [
      "M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z",
      "M6 12V5a2 2 0 012-2h3v2.25",
    ],
    p
  );

export const RulerIcon = (p: IconProps) =>
  svg(
    [
      "M21.71 3.29a1 1 0 00-1.42 0l-18 18a1 1 0 001.42 1.42l18-18a1 1 0 000-1.42z",
      "M18 10l-1.5-1.5",
      "M14 6l-1.5-1.5",
    ],
    p
  );

export const TrainIcon = (p: IconProps) =>
  svg(
    [
      "M4 15.5V5a3 3 0 013-3h10a3 3 0 013 3v10.5",
      "M4 15.5A2.5 2.5 0 006.5 18h11a2.5 2.5 0 002.5-2.5",
      "M9 22l-2-4",
      "M15 22l2-4",
      "M4 11h16",
    ],
    p
  );

export const WalkIcon = (p: IconProps) =>
  svg(
    ["M13 4a1 1 0 100-2 1 1 0 000 2z", "M7 21l3-5", "M16 21l-2-4-3-1-1.5-4.5L13 9l4 1v3", "M10 5l-1 4"],
    p
  );

export const MapPinIcon = (p: IconProps) =>
  svg(
    ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"],
    p,
    <circle cx="12" cy="10" r="3" stroke="currentColor" fill="none" />
  );

export const PoundIcon = (p: IconProps) =>
  svg(["M18 7a4 4 0 00-7.5-1.5L7 17h11", "M6 12h8"], p);

export const HomeIcon = (p: IconProps) =>
  svg(["M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1V10.5z"], p);

export const SearchIcon = (p: IconProps) =>
  svg(["M11 19a8 8 0 100-16 8 8 0 000 16z", "M21 21l-4.35-4.35"], p);

export const FilterIcon = (p: IconProps) =>
  svg(["M22 3H2l8 9.46V19l4 2v-8.54L22 3z"], p);

export const XIcon = (p: IconProps) =>
  svg(["M18 6L6 18", "M6 6l12 12"], p);

export const CalendarIcon = (p: IconProps) =>
  svg(
    [
      "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z",
      "M16 2v4",
      "M8 2v4",
      "M3 10h18",
    ],
    p
  );

export const ClockIcon = (p: IconProps) =>
  svg(
    ["M12 22a10 10 0 100-20 10 10 0 000 20z", "M12 6v6l4 2"],
    p
  );

export const CheckIcon = (p: IconProps) =>
  svg(["M20 6L9 17l-5-5"], p);

export const StarIcon = (p: IconProps) =>
  svg(
    ["M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"],
    p
  );

export const SchoolIcon = (p: IconProps) =>
  svg(
    ["M22 10v6M2 10l10-5 10 5-10 5z", "M6 12v5c3 3 9 3 12 0v-5"],
    p
  );

export const ShoppingBagIcon = (p: IconProps) =>
  svg(
    [
      "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z",
      "M3 6h18",
      "M16 10a4 4 0 01-8 0",
    ],
    p
  );

export const TreeIcon = (p: IconProps) =>
  svg(
    ["M12 22v-7", "M17 8l-5-6-5 6h3v4h4V8h3z", "M19 14l-5-5-5 5h3v3h4v-3h3z"],
    p
  );

export const SparklesIcon = (p: IconProps) =>
  svg(
    [
      "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z",
      "M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z",
    ],
    p
  );

export const ChatIcon = (p: IconProps) =>
  svg(["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"], p);

export const TrendingUpIcon = (p: IconProps) =>
  svg(["M23 6l-9.5 9.5-5-5L1 18", "M17 6h6v6"], p);

export const EyeIcon = (p: IconProps) =>
  svg(
    ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"],
    p,
    <circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" />
  );

// ── Feature icon mapping ────────────────────────────────────────
// Maps common feature keywords to icons for property detail cards.

const FEATURE_ICON_MAP: Record<string, (p: IconProps) => React.ReactNode> = {
  garden: TreeIcon,
  "south-facing": TreeIcon,
  "west-facing": TreeIcon,
  "private garden": TreeIcon,
  terrace: TreeIcon,
  balcony: TreeIcon,
  "roof terrace": TreeIcon,
  "sedum roof": TreeIcon,
  parking: (p: IconProps) => svg(["M19 21H5V9l7-7 7 7v12z", "M9 21v-6h6v6"], p),
  garage: (p: IconProps) => svg(["M19 21H5V9l7-7 7 7v12z", "M9 21v-6h6v6"], p),
  concierge: StarIcon,
  gym: (p: IconProps) => svg(["M6 5v14", "M18 5v14", "M6 9h12", "M6 15h12"], p),
  pool: (p: IconProps) => svg(["M2 12c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0", "M2 17c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0"], p),
  fireplace: (p: IconProps) => svg(["M12 22c-4 0-7-3-7-7 0-5 7-11 7-11s7 6 7 11c0 4-3 7-7 7z", "M10 17c0 1.1.9 2 2 2s2-.9 2-2c0-2-2-4-2-4s-2 2-2 4z"], p),
  "smart home": SparklesIcon,
  ev: (p: IconProps) => svg(["M13 2L3 14h9l-1 8 10-12h-9l1-8z"], p),
  listed: StarIcon,
  heritage: StarIcon,
  views: EyeIcon,
  "river views": EyeIcon,
  "thames views": EyeIcon,
  "canal views": EyeIcon,
  lift: (p: IconProps) => svg(["M7 2v20", "M17 2v20", "M7 8h10", "M7 16h10", "M12 5v3", "M12 13v3"], p),
  furnished: (p: IconProps) => svg(["M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 8 12 8 12 8-7.6 8-12z"], p),
  "pet friendly": (p: IconProps) => svg(["M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z", "M4.93 4.93c-3.9 3.9-3.9 10.24 0 14.14", "M7.76 7.76c-2.34 2.34-2.34 6.14 0 8.49", "M16.24 7.76c2.34 2.34 2.34 6.14 0 8.49", "M19.07 4.93c3.9 3.9 3.9 10.24 0 14.14"], p),
};

export function getFeatureIcon(feature: string): ((p: IconProps) => React.ReactNode) | null {
  const lower = feature.toLowerCase();
  for (const [keyword, icon] of Object.entries(FEATURE_ICON_MAP)) {
    if (lower.includes(keyword)) return icon;
  }
  return null;
}
