import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

/**
 * Four pillars paraphrased from language already used elsewhere in the
 * copy (chairman.overview), re-attributed to the Group rather than the
 * individual. Kept local to this component rather than lib/data.ts since
 * it's About-page-specific framing copy, not reused elsewhere — move it
 * into lib/data.ts as `companyValues` if another page ends up needing it.
 */
const values = [
  {
    title: "Financial Discipline",
    desc: "Two decades of risk discipline and financial rigour inform every decision across the portfolio.",
  },
  {
    title: "Entrepreneurial Vision",
    desc: "An instinct for identifying, structuring and delivering premium assets across residential, healthcare and hospitality.",
  },
  {
    title: "Institutional Professionalism",
    desc: "A steady commitment to institutionalising professionalism across every venture in the Group.",
  },
  {
    title: "Long-Term Value",
    desc: "Quality, timelines and long-term value for every stakeholder, from concept through to delivery.",
  },
];

export default function CompanyValues() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Layered gradient background built from the brand palette:
          navy base, a soft green ambient glow rising from the lower
          right, and a faint sand wash at the top edge so the section
          reads warm and premium rather than flat-dark. All inline
          styles, so this stays a server component with no client JS. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0b2452 0%, #0a1f46 55%, #071a3d 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 85% 95%, rgba(15,122,60,0.28), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 10% 0%, rgba(251,249,244,0.06), transparent 60%)",
        }}
      />
      {/* Faint blueprint grid — same ambient texture used elsewhere on
          the site, at very low opacity so it stays subtle over navy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes valueSparkIn {
          0% { opacity: 0; transform: scale(0.4) rotate(-25deg); }
          65% { opacity: 1; transform: scale(1.12) rotate(4deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .value-spark {
          opacity: 0;
          animation: valueSparkIn 0.7s cubic-bezier(.34,1.4,.64,1) forwards;
          animation-delay: var(--spark-delay, 0.15s);
        }

        @keyframes valueRuleGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .value-rule {
          transform-origin: left;
          animation: valueRuleGrow 0.6s ease-out forwards;
          animation-delay: var(--rule-delay, 0.35s);
        }

        .value-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, background-color 0.35s ease;
        }
        .value-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px -22px rgba(0, 0, 0, 0.55);
          border-color: rgba(15,122,60,0.55);
        }
        .value-card:hover .value-icon-box {
          transform: rotate(-6deg) scale(1.06);
          background-color: #0f7a3c;
          color: #ffffff;
        }
        .value-card:hover .value-rule-inner {
          transform: scaleX(1);
        }
        .value-icon-box {
          transition: transform 0.4s cubic-bezier(.34,1.4,.64,1), background-color 0.35s ease, color 0.35s ease;
        }
        .value-rule-inner {
          transform: scaleX(0.35);
          transform-origin: left;
          transition: transform 0.4s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .value-spark {
            animation: none; opacity: 1; transform: none;
          }
          .value-rule {
            animation: none; transform: none;
          }
          .value-card, .value-icon-box, .value-rule-inner {
            transition: none;
          }
          .value-card:hover {
            transform: none;
          }
          .value-card:hover .value-icon-box {
            transform: none;
          }
        }
      `,
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
        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 100}
              className="value-card flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm sm:p-8"
            >
              <div
                className="value-icon-box value-spark mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/15 text-green-300"
                style={{ ["--spark-delay" as any]: `${0.15 + i * 0.1}s` }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg text-white">{v.title}</h3>
              <span
                aria-hidden
                className="value-rule value-rule-inner mt-3 h-px w-10 bg-[#8B6B3D]/70"
                style={{ ["--rule-delay" as any]: `${0.35 + i * 0.1}s` }}
              />
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {v.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}