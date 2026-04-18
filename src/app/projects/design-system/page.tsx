import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System — asoudan.com v1.0 | Ahmed Soudan",
  description:
    "A dark-first design system for asoudan.com — Montserrat across 100–900, a single cyan accent, and twelve opacity steps replacing a grey scale.",
};

export default function DesignSystemPage() {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#0a0c14", zIndex: 1 }}>
      <iframe
        src="/design-system-v1.html"
        title="asoudan.com — Design System v1.0"
        style={{ width: "100%", height: "100%", border: 0, display: "block" }}
      />
    </div>
  );
}
