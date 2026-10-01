"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, MapPin } from "lucide-react";
import type { ProjectSummary } from "@/lib/data";

const EASE = "cubic-bezier(.22,1,.36,1)";

// Status dot colour; "ongoing" also pulses to signal live construction
const dotStyles: Record<string, string> = {
  ongoing: "bg-green-500 pc-pulse",
  completed: "bg-navy-600",
  future: "bg-[#D9B26A]",
};

/**
 * Motion layer — plain CSS, every rule `pc-` prefixed.
 *
 * Responds to the person: the card tilts a few degrees toward the cursor,
 * a green light follows the border and a soft glow crosses the surface,
 * the image zooms and a thin light sweeps its top edge, stats tint, and the
 * call-to-action line extends while its arrow button rotates.
 * Disabled under reduced motion.
 */
const css = `
.pc-wrap{perspective:1400px}
.pc-card{transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transform-style:preserve-3d;
  transition:transform .6s ${EASE},box-shadow .6s ${EASE},border-color .5s ease}
.pc-wrap:hover .pc-card{box-shadow:0 44px 80px -42px rgba(18,33,58,.5);border-color:rgba(18,33,58,.2)}

.pc-card::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;z-index:30;
  background:radial-gradient(380px circle at var(--mx,50%) var(--my,50%),rgba(76,175,109,.95),transparent 45%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  opacity:0;transition:opacity .5s ease}
.pc-wrap:hover .pc-card::before{opacity:1}

.pc-glow{opacity:0;transition:opacity .5s ease;
  background:radial-gradient(460px circle at var(--mx,50%) var(--my,50%),rgba(217,178,106,.13),transparent 60%)}
.pc-wrap:hover .pc-glow{opacity:1}

.pc-sweep{transform:translateX(-101%);transition:transform 1.1s ${EASE}}
.pc-wrap:hover .pc-sweep{transform:translateX(101%)}

.pc-stat{transition:background-color .35s ease,transform .5s ${EASE}}
.pc-wrap:hover .pc-stat{background-color:rgba(76,175,109,.07)}
.pc-wrap:hover .pc-stat:nth-child(2){transition-delay:.05s}
.pc-wrap:hover .pc-stat:nth-child(3){transition-delay:.1s}

.pc-line{transform:scaleX(0);transform-origin:left;transition:transform .6s ${EASE}}
.pc-wrap:hover .pc-line{transform:scaleX(1)}

.pc-pulse{animation:pc-pulse 2.4s ease-out infinite}
@keyframes pc-pulse{0%{box-shadow:0 0 0 0 rgba(76,175,109,.65)}100%{box-shadow:0 0 0 8px rgba(76,175,109,0)}}

@media (prefers-reduced-motion:reduce){
  .pc-card{transform:none!important;transition:none}
  .pc-glow,.pc-card::before,.pc-sweep,.pc-line,.pc-stat{transition:none}
  .pc-pulse{animation:none}
}
`;

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  const onPointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--ry", `${(x - 0.5) * 4}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 3}deg`);
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <Link
      href={`/projects/${project.slug}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="pc-wrap group block h-full rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60 focus-visible:ring-offset-4"
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="pc-card relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-navy-900/10 bg-white p-3 shadow-[0_24px_50px_-38px_rgba(18,33,58,0.45)]">
        <span aria-hidden className="pc-glow pointer-events-none absolute inset-0 z-20" />

        {/* ---------- Framed image ---------- */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-navy-900">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.07]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-navy-950/65 via-transparent to-navy-950/10"
          />
          <span
            aria-hidden
            className="pc-sweep absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
          />

          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/85 px-3 py-1.5 text-[12px] font-medium text-navy-900 shadow-sm backdrop-blur-md">
            <span className={`size-1.5 rounded-full ${dotStyles[project.status]}`} aria-hidden />
            {project.statusLabel}
          </span>

          {project.accolade && (
            <span className="absolute inset-x-4 bottom-4 inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-white/25 bg-navy-950/40 px-3 py-1.5 text-[11.5px] font-medium text-white backdrop-blur-md">
              <Award className="size-3.5 flex-none text-[#D9B26A]" aria-hidden />
              <span className="truncate">{project.accolade}</span>
            </span>
          )}
        </div>

        {/* ---------- Content ---------- */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <p className="flex items-center gap-1.5 text-[13px] text-navy-600">
            <MapPin className="size-3.5 flex-none text-green-600" aria-hidden />
            {project.location}
          </p>

          <h3 className="mt-2 text-balance font-display text-2xl leading-[1.15] text-navy-900">
            {project.name}
          </h3>

          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-navy-600">
            {project.description}
          </p>

          <div
            className="mt-6 grid gap-2"
            style={{ gridTemplateColumns: `repeat(${project.stats.length}, minmax(0, 1fr))` }}
          >
            {project.stats.map((s) => (
              <div
                key={s.label}
                className="pc-stat rounded-xl border border-navy-900/5 bg-[#F5F6F8] px-2.5 py-3 text-center"
              >
                <p className="font-display text-lg tabular-nums text-navy-900">{s.value}</p>
                <p className="mt-0.5 text-[11px] leading-4 text-navy-500">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-navy-900/10 pt-4">
            <span className="relative text-sm font-medium text-navy-900">
              Explore project
              <span
                aria-hidden
                className="pc-line absolute -bottom-1 left-0 h-px w-full bg-green-500"
              />
            </span>
            <span className="flex size-10 items-center justify-center rounded-full bg-navy-900 text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-green-500">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}