"use client";
import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const EcomIcons = {
  Search: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Cart: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  ),
  Bag: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  Heart: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Star: (p: IconProps) => (
    <svg {...base} fill="currentColor" strokeWidth={0} {...p}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Sparkles: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  Plus: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  ),
  Minus: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M5 12h14" />
    </svg>
  ),
  Send: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  ),
  X: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  Menu: (p: IconProps) => (
    <svg {...base} {...p}>
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),
  ChevronRight: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  ArrowRight: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  Layout: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <line x1="9" x2="9" y1="21" y2="9" />
    </svg>
  ),
  Truck: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M5 18H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v12" />
      <path d="M14 9h4l4 4v4a1 1 0 0 1-1 1h-2" />
      <circle cx="7.5" cy="18" r="2" />
      <circle cx="17.5" cy="18" r="2" />
    </svg>
  ),
  Shield: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Leaf: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M11 20A7 7 0 0 1 4 13V6a2 2 0 0 1 2-2h5a7 7 0 0 1 7 7v4" />
      <path d="M2 22c5-4 7-9 7-13" />
    </svg>
  ),
  Trash: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),
  Check: (p: IconProps) => (
    <svg {...base} {...p}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Filter: (p: IconProps) => (
    <svg {...base} {...p}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  Mail: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  MapPin: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Lock: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
};
