import { Metadata } from "next";
import CinematicEntrance from "@/components/sections/CinematicEntrance";
import ImmersiveProjects from "@/components/sections/ImmersiveProjects";
import ImmersiveCV from "@/components/sections/ImmersiveCV";
import Footer from "@/components/sections/Footer";
import FloatingNav from "@/components/layout/FloatingNav";

export const metadata: Metadata = {
  title: "Home",
  description: "Explore the portfolio of Ahmed Soudan, a Digital Product Designer with 20 years of experience. View case studies, projects, and expertise in UX research and EdTech design.",
  keywords: ["portfolio", "product design", "ux design", "case studies", "Ahmed Soudan"],
  openGraph: {
    title: "Ahmed Soudan — Digital Product Designer Portfolio",
    description: "Explore 20 years of product design experience through case studies and projects in UX research, EdTech, and digital product design.",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmed Soudan Portfolio - Digital Product Designer",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="relative">
      <div id="hero">
        <CinematicEntrance />
      </div>
      <section id="experience" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="sr-only">Professional Experience</h2>
        <ImmersiveCV />
      </section>
      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="sr-only">Featured Projects</h2>
        {/* The "projects" id is mounted inside ImmersiveProjects, anchored at the
            filter chips so the floating nav's "Work" link lands on the carousel. */}
        <ImmersiveProjects />
      </section>
      <div id="contact">
        <Footer />
      </div>
      <FloatingNav />
    </main>
  );
}
