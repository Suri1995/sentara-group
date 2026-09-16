import Image from "next/image";
import { Building2, HeartPulse, ConciergeBell } from "lucide-react";
import Reveal from "@/components/Reveal";

/**
 * The Group's narrative — reworded from chairman.overview to speak about
 * Sentara Group as an institution rather than "he/his career", since the
 * facts (banking-grade discipline, entrepreneurial delivery across
 * residential/healthcare/hospitality) describe how the Group operates,
 * not just one person's biography.
 *
 * Layout is a two-part structure: a story block paired with a photo of
 * the team at work, followed by a connected, horizontally-linked row of
 * the Group's three pillars — each pillar sits on a shared line like
 * milestones, rather than three disconnected cards.
 */

const PILLARS = [
  {
    label: "Residential",
    detail: "Premium living, high-growth corridors",
    icon: Building2,
  },
  {
    label: "Healthcare",
    detail: "Institutional-grade, long-life assets",
    icon: HeartPulse,
  },
  {
    label: "Hospitality",
    detail: "Experience-led, built for the long term",
    icon: ConciergeBell,
  },
];

export default function CompanyStory() {
  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-20">
      {/* Faint textured backdrop — same restrained language used elsewhere
          on the site, toned down for a light section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(18,33,58,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,33,58,0.7) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 45% 40% at 100% 0%, rgba(139,107,61,0.06), transparent 60%)",
        }}
      />

      {/* Plain CSS keyframes only — this stays a server component with no
          client JS. Reveal (imported above) handles the scroll-in timing
          for each block via its delay prop; these keyframes handle the
          motion itself. */}
      <style>{`
        @keyframes storyMarkIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .story-mark {
          opacity: 0;
          animation: storyMarkIn 1s ease-out forwards;
          animation-delay: 0.3s;
        }

        @keyframes storyRuleGrow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        .story-rule {
          transform-origin: top;
          animation: storyRuleGrow 0.9s ease-out forwards;
          animation-delay: 0.15s;
        }

        @keyframes storyImageIn {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        .story-image-in {
          opacity: 0;
          animation: storyImageIn 1s ease-out forwards;
          animation-delay: 0.1s;
        }

        @keyframes storyBadgeDrop {
          0% { opacity: 0; transform: translateY(-18px); }
          60% { opacity: 1; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .story-badge-drop {
          opacity: 0;
          animation: storyBadgeDrop 0.7s cubic-bezier(.34,1.4,.64,1) forwards;
          animation-delay: 0.7s;
        }

        /* Horizontal connecting line (sm and up) grows left to right */
        @keyframes storyLineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .story-line {
          transform-origin: left;
          animation: storyLineGrow 1.1s ease-out forwards;
          animation-delay: 0.5s;
        }

        /* Each node pops in with a slight overshoot, staggered via
           --node-delay set inline per item */
        @keyframes storyNodeIn {
          0% { opacity: 0; transform: scale(0.5); }
          70% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        .story-node {
          opacity: 0;
          animation: storyNodeIn 0.6s cubic-bezier(.34,1.4,.64,1) forwards;
          animation-delay: var(--node-delay, 0.6s);
        }

        @media (prefers-reduced-motion: reduce) {
          .story-mark, .story-image-in, .story-badge-drop, .story-node {
            animation: none; opacity: 1; transform: none;
          }
          .story-rule, .story-line { animation: none; transform: none; }
        }
      `}</style>

      <div className="container-page relative">
        {/* ---------------- Story + photo ---------------- */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="relative">
            <span
              aria-hidden
              className="story-mark pointer-events-none absolute -left-3 -top-14 hidden select-none font-display text-[7rem] leading-none text-[#12213A]/[0.04] xl:block"
            >
              &ldquo;
            </span>

            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#8B6B3D]/60 sm:w-10" aria-hidden />
              <p className="eyebrow !text-[#8B6B3D]">Our Story</p>
            </div>

            <h2 className="heading-lg mt-4 text-[#12213A]">
              A group built on discipline and long-term vision.
            </h2>

            <div className="relative mt-6 space-y-5 border-l-2 border-[#8B6B3D]/40 pl-6 sm:space-y-6 sm:pl-8">
              <span
                aria-hidden
                className="story-rule absolute -left-[2px] top-0 h-full w-[2px] bg-[#8B6B3D]"
              />
              <p className="body-lg text-[#23262B]">
                Sentara Group brings together the risk discipline and
                financial rigour of two decades in banking with the
                entrepreneurial agility of a real estate developer —
                repeatedly identifying, structuring and delivering premium
                residential, healthcare and hospitality assets across
                Hyderabad&rsquo;s high-growth corridors.
              </p>
              <p className="body-lg text-[#23262B]/90">
                Every venture in the portfolio, from concept through to
                high-value completion, is guided by the same principles:
                institutionalised professionalism, rigorous financial
                discipline, and a steady commitment to quality, timelines
                and long-term value for every stakeholder.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150} className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
            <div className="story-image-in relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl shadow-[#12213A]/15">
              <Image
                src="/images/team/team-model-review.png"
                alt="Sentara Group team reviewing a project model"
                fill
                className="object-cover grayscale-[6%] transition-all duration-700 ease-out hover:scale-[1.03] hover:grayscale-0"
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 480px, 100vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#12213A]/25 via-transparent to-transparent"
              />
            </div>

            {/* Floating accent badge — echoes the reference's hanging pin
                detail, restyled as a brand-toned plate */}
            <div className="story-badge-drop absolute -top-5 left-6 flex items-center gap-2 rounded-full border border-[#12213A]/10 bg-white px-4 py-2 shadow-lg sm:left-10">
              <span className="flex size-2 rounded-full bg-[#8B6B3D]" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#12213A] sm:text-xs">
                Built on trust
              </span>
            </div>
          </Reveal>
        </div>

        {/* ---------------- Pillars — connected timeline row ---------------- */}
        {/* Each pillar draws its own connector to the next node, sized
            relative to its own grid cell. On desktop the node column is
            left-aligned (sm:items-start), so the node's visual center
            sits at 1.75rem (half of size-14 / 56px) from the cell's
            left edge — NOT at 50%. The connector is anchored there
            (left-7, i.e. left: 1.75rem) rather than left-1/2, so it
            starts exactly at this node's center and, combined with
            "100% + gap" width, lands precisely on the next node's
            center — no matter the container's actual width, padding,
            or a future change in PILLARS.length. (On mobile the layout
            switches to items-center, where the separate vertical
            connector below already uses left-1/2 correctly since the
            node really is centered there.) */}
        <div className="relative mt-10 sm:mt-16">
          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              const isLast = i === PILLARS.length - 1;
              return (
                <Reveal
                  key={pillar.label}
                  delay={i * 130}
                  className="group relative flex flex-col items-center text-center sm:items-start sm:text-left"
                >
                  {/* Mobile-only vertical connector between stacked nodes */}
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="absolute -top-6 left-1/2 h-6 w-px -translate-x-1/2 bg-[#12213A]/15 sm:hidden"
                    />
                  )}

                  {/* Connector to the next node — anchored to this node's
                      actual center (left-7 = 1.75rem, half of size-14),
                      not the cell's midpoint, so it can't drift */}
                  {!isLast && (
                    <span
                      aria-hidden
                      className="story-line pointer-events-none absolute left-7 top-7 z-0 hidden border-t-2 border-dashed border-[#12213A]/15 sm:block"
                      style={{
                        width: "calc(100% + 1.5rem)",
                        animationDelay: `${0.5 + i * 0.2}s`,
                      }}
                    />
                  )}

                  <span
                    className="story-node relative z-10 flex size-14 items-center justify-center rounded-full border-4 border-white bg-[#12213A] text-white shadow-md ring-1 ring-[#12213A]/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#8B6B3D]"
                    style={{ ["--node-delay" as any]: `${0.5 + i * 0.15}s` }}
                  >
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>

                  <dl className="mt-5">
                    <dt className="text-[15px] font-semibold tracking-tight text-[#12213A]">
                      {pillar.label}
                    </dt>
                    <dd className="mx-auto mt-1.5 max-w-xl text-[13.5px] leading-snug text-[#23262B]/60 sm:mx-0">
                      {pillar.detail}
                    </dd>
                  </dl>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}