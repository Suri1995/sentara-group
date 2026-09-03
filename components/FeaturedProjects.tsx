import Link from "next/link";
import type { ProjectSummary } from "@/lib/data";
import FeaturedProjectTile from "./FeaturedProjectTile";

export default function FeaturedProjects({
  projects,
}: {
  projects: ProjectSummary[];
}) {
  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="bg-green-100 py-8 sm:py-20"
    >
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Our portfolio</p>

            <h2
              id="featured-projects-heading"
              className="heading-xl mt-4 max-w-2xl"
            >
              Projects that define our legacy.
            </h2>
          </div>

          <Link
            href="/projects"
            className="btn-dark min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2"
          >
            View all projects
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        </div>

        {/* Single column below 768px; exactly 3 equal columns from 768px (md:) up. */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-3">
          {projects.map((project, i) => (
            <FeaturedProjectTile
              key={project.slug}
              project={project}
              delay={i * 100}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}