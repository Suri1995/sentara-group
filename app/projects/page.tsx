import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ProjectsGrid from "./ProjectsGrid";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Sentara Group's portfolio — Anvita Parkside Villas, Landspace Elite and Arunjyothi Hospitals — across Hyderabad's high-growth corridors.",
};

export default function ProjectsPage() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Portfolio"
          title="Our Project Portfolio"
          description="From ultra-luxury villa communities to deluxe apartments and essential healthcare infrastructure — a portfolio engineered for structural quality, compliance and timely delivery."
          align="center"
        />
        <div className="mt-14">
          <ProjectsGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
