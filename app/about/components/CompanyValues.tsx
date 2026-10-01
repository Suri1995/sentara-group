"use client";

import { Compass, Gem, Landmark, ShieldCheck, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

/**
 * Four pillars paraphrased from language already used elsewhere in the
 * copy (chairman.overview), re-attributed to the Group rather than the
 * individual. Kept local to this component rather than lib/data.ts since
 * it's About-page-specific framing copy, not reused elsewhere — move it
 * into lib/data.ts as `companyValues` if another page ends up needing it.
 *
 * Each pillar now carries its own icon and a grid span, which gives the
 * section an asymmetric "bento" rhythm on large screens (wide / narrow,
 * narrow / wide) instead of four identical tiles.
 */
const values: {
  title: string;
  desc: string;
  icon: LucideIcon;
  span: string;
}[] = [
  {
    title: "Financial Discipline",
    desc: "Two decades of risk discipline and financial rigour inform every decision across the portfolio.",
    icon: ShieldCheck,
    span: "lg:col-span-7",
  },
  {
    title: "Entrepreneurial Vision",
    desc: "An instinct for identifying, structuring and delivering premium assets across residential, healthcare and hospitality.",
    icon: Compass,
    span: "lg:col-span-5",
  },
  {
    title: "Institutional Professionalism",
    desc: "A steady commitment to institutionalising professionalism across every venture in the Group.",
    icon: Landmark,
    span: "lg:col-span-5",
  },
  {
    title: "Long-Term Value",
    desc: "Quality, timelines and long-term value for every stakeholder, from concept through to delivery.",
    icon: Gem,
    span: "lg:col-span-7",
  },
];

const EASE = "cubic-bezier(.22,1,.36,1)";

/**
 * Motion layer — plain CSS, no dependencies, every rule `cv-` prefixed.
 *
 * Ambient: two blurred light fields drift slowly behind the cards.
 * Responsive to the person: the card tilts a few degrees, a gold light
 * follows the cursor along the border and across the surface, the icon
 * redraws itself, and the rule beneath the title extends.
 * All of it is disabled under reduced-motion.
 */
const css = `
@keyframes cv-drift-a{0%{transform:translate3d(0,0,0) scale(1)}100%{transform:translate3d(-8%,10%,0) scale(1.15)}}
@keyframes cv-drift-b{0%{transform:translate3d(0,0,0) scale(1.1)}100%{transform:translate3d(10%,-8%,0) scale(.95)}}
.cv-aurora-a{animation:cv-drift-a 18s ease-in-out infinite alternate}
.cv-aurora-b{animation:cv-drift-b 22s ease-in-out infinite alternate}

.cv-card{transform:perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
  transition:transform .6s ${EASE},box-shadow .6s ${EASE},background-color .6s ease;}
.cv-card:hover{background-color:rgba(255,255,255,.07);box-shadow:0 40px 80px -40px rgba(0,0,0,.7)}

/* light that follows the cursor along the 1px border */
.cv-card::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;
  background:radial-gradient(380px circle at var(--mx,50%) var(--my,50%),rgba(217,178,106,.95),transparent 45%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  opacity:0;transition:opacity .5s ease}
.cv-card:hover::before{opacity:1}

/* soft glow across the surface */
.cv-glow{opacity:0;transition:opacity .5s ease;pointer-events:none;
  background:radial-gradient(460px circle at var(--mx,50%) var(--my,50%),rgba(217,178,106,.12),transparent 60%)}
.cv-card:hover .cv-glow{opacity:1}

/* icon: ring pulses outward once, strokes redraw */
.cv-icon-box{transition:background-color .5s ease,border-color .5s ease,transform .6s ${EASE}}
.cv-card:hover .cv-icon-box{background-color:rgba(217,178,106,.16);border-color:rgba(217,178,106,.55);transform:translateY(-2px)}
.cv-card:hover .cv-icon *{stroke-dasharray:80;animation:cv-draw 1.2s ${EASE} forwards}
@keyframes cv-draw{from{stroke-dashoffset:80}to{stroke-dashoffset:0}}
.cv-ring{opacity:0}
.cv-card:hover .cv-ring{animation:cv-ring 1.4s ease-out}
@keyframes cv-ring{0%{opacity:.7;transform:scale(1)}100%{opacity:0;transform:scale(1.7)}}

/* oversized watermark icon gives each card depth */
.cv-mark{transition:transform 1s ${EASE},opacity .6s ease;opacity:.05}
.cv-card:hover .cv-mark{transform:translate(-6px,-6px) rotate(-8deg) scale(1.06);opacity:.1}

/* rule under the title grows; footer light sweeps across the bottom edge */
.cv-rule{transform:scaleX(.3);transform-origin:left;transition:transform .7s ${EASE}}
.cv-card:hover .cv-rule{transform:scaleX(1)}
.cv-sweep{transform:translateX(-101%);transition:transform 1.2s ${EASE}}
.cv-card:hover .cv-sweep{transform:translateX(101%)}

@media (prefers-reduced-motion:reduce){
  .cv-aurora-a,.cv-aurora-b{animation:none}
  .cv-card{transform:none!important;transition:none}
  .cv-card:hover .cv-icon *,.cv-card:hover .cv-ring{animation:none}
  .cv-mark,.cv-rule,.cv-sweep,.cv-icon-box{transition:none}
}
`;

export default function CompanyValues() {
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
    card.style.setProperty("--ry", `${(x - 0.5) * 4}deg`);
    card.style.setProperty("--rx", `${(0.5 - y) * 3}deg`);
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Navy base */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0b2452 0%, #0a1f46 55%, #071a3d 100%)",
        }}
      />

      {/* Drifting light fields: green from the lower right, gold from the upper left */}
      <div
        aria-hidden
        className="cv-aurora-a pointer-events-none absolute -bottom-40 -right-32 size-[38rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(15,122,60,0.38), transparent 65%)",
          filter: "blur(70px)",
        }}
      />
      <div
        aria-hidden
        className="cv-aurora-b pointer-events-none absolute -left-40 -top-40 size-[34rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(217,178,106,0.16), transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Blueprint grid, faded toward the edges so it never feels boxed in */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 80%)",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 80%)",
        }}
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="What Guides Us"
          title="The principles behind every venture"
          description="Four commitments that shape how Sentara Group plans, builds and delivers."
          align="center"
          light
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 110} className={`h-full ${v.span}`}>
                <div
                  onPointerMove={onPointerMove}
                  onPointerLeave={onPointerLeave}
                  className="cv-card group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md sm:p-9"
                >
                  <span aria-hidden className="cv-glow absolute inset-0" />

                  {/* watermark */}
                  <Icon
                    aria-hidden
                    className="cv-mark pointer-events-none absolute -bottom-8 -right-6 size-48 text-white sm:size-56"
                    strokeWidth={0.8}
                  />

                  <div className="relative">
                    <span className="relative inline-flex">
                      <span
                        aria-hidden
                        className="cv-ring absolute inset-0 rounded-2xl border border-[#D9B26A]/60"
                      />
                      <span className="cv-icon-box relative flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-[#D9B26A]">
                        <Icon className="cv-icon size-6" strokeWidth={1.6} aria-hidden />
                      </span>
                    </span>

                    <h3 className="mt-7 max-w-[20ch] text-balance font-display text-xl leading-snug text-white sm:text-2xl">
                      {v.title}
                    </h3>

                    <span
                      aria-hidden
                      className="cv-rule mt-4 block h-px w-14 bg-gradient-to-r from-[#D9B26A] to-transparent"
                    />

                    <p className="mt-4 max-w-[46ch] text-[15px] leading-7 text-white/70">
                      {v.desc}
                    </p>
                  </div>

                  {/* light sweeping along the bottom edge on hover */}
                  <span
                    aria-hidden
                    className="cv-sweep absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D9B26A] to-transparent"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}