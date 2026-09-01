import Image from "next/image";
import Link from "next/link";
import type { ProjectSummary } from "@/lib/data";

const statusStyles: Record<string, string> = {
  ongoing: "bg-green-500 text-white",
  completed: "bg-navy-600 text-white",
  future: "bg-sand-300 text-navy-800",
};

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-premium group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${
            statusStyles[project.status]
          }`}
        >
          {project.statusLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
          {project.location}
        </p>
        <h3 className="mt-2 font-display text-2xl text-navy-900">{project.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-600">
          {project.description}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-navy-100 pt-4">
          {project.stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-lg text-navy-900">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wide text-navy-500">{s.label}</p>
            </div>
          ))}
        </div>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-green-600 transition-transform group-hover:translate-x-1">
          Explore Project
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
