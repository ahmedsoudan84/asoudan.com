import Link from "next/link";

export function DemoBanner() {
  return (
    <div
      className="w-full px-6 py-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5"
      style={{
        background: "rgba(var(--accent-rgb), 0.07)",
        borderBottom: "1px solid rgba(var(--accent-rgb), 0.15)",
      }}
    >
      <p
        className="font-montserrat text-[11px] font-bold uppercase tracking-[2px] text-center"
        style={{ color: "var(--fg-50)" }}
      >
        <span style={{ color: "var(--accent)" }}>Live demo</span>
        {" — "}
        your version is personalised to your brand: logo, colours, content &amp; domain
      </p>
      <Link
        href="/buy"
        className="shrink-0 px-3.5 py-1.5 rounded-lg font-montserrat text-[10px] font-black uppercase tracking-[2px] transition-all hover:opacity-80 whitespace-nowrap"
        style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
      >
        Get yours →
      </Link>
    </div>
  );
}
