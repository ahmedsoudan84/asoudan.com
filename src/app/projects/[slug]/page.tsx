import { notFound } from "next/navigation";
import { Metadata } from "next";
import CaseStudyClient from "./CaseStudyClient";
import { projectsData } from "@/lib/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

const visibleProjects = projectsData.filter((p) => p.caseStudy && p.caseStudy.length > 0 && !p.hidden);

export async function generateStaticParams() {
  return visibleProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  const projectKeywords = [
    project.tags.join(", "),
    "product design",
    "ux design",
    "case study",
    "Ahmed Soudan"
  ].join(", ");

  return {
    title: `${project.title} — ${project.subtitle} | Ahmed Soudan`,
    description: project.description,
    keywords: projectKeywords,
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.description,
      images: project.images?.length ? [
        {
          url: project.images[0].src,
          width: 1200,
          height: 630,
          alt: project.images[0].alt,
        },
      ] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.subtitle}`,
      description: project.description,
      images: project.images?.length ? [project.images[0].src] : [],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug && !p.hidden);
  if (!project || !project.caseStudy || project.caseStudy.length === 0) {
    notFound();
  }

  const currentIndex = visibleProjects.findIndex((p) => p.slug === slug);
  const prevProject =
    currentIndex > 0 ? visibleProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < visibleProjects.length - 1
      ? visibleProjects[currentIndex + 1]
      : null;

  return (
    <CaseStudyClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
