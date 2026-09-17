import type { CSSProperties } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";
import { brand, heroStats, projects } from "@/lib/data";

/**
 * Company-level hero for the About page. Deliberately has no portrait —
 * the chairman gets his own dedicated section further down the page
 * (see ChairmanSpotlight). This hero introduces the Group itself, using
 * one of its built projects as a subdued, slowly-zooming background image
 * rather than a person, so the page opens on the company, not the
 * individual.
 *
 * The construction sequence now depicts a premium two-storey villa
 * (matching Sentara's low-rise residential portfolio rather than a
 * high-rise): a foundation slab is poured, a car-porch and its supporting
 * columns rise, a wooden chevron privacy screen draws in slat by slat on
 * the first floor, a glass balcony rail and rooftop pergola settle into
 * place, ornamental trees bloom on either side, dusk falls and every
 * window and landscape light warms up, temporary scaffolding recedes,
 * a soft sheen sweeps the façade, and the whole illustration
 * cross-dissolves into a real photograph of one of the Group's projects.
 * It plays at every screen size: from 360px up to 768px it sits stacked
 * underneath the copy (the grid's default single-column flow), and from
 * 769px up it sits beside the copy in a two-column row. The photo always
 * fills the full frame; it never depends on lining up with the
 * illustration's geometry, so there's nothing to misalign at any width.
 */
export default function CompanyHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-gradient pt-24 text-white sm:min-h-[85vh] sm:pt-28 lg:min-h-[90vh]">
      {/* Background image — slow, single-run zoom on load; a plain CSS
          keyframe, so this stays a server component with no client JS */}
      <div aria-hidden className="absolute inset-0">
        <div className="hero-bg-zoom absolute inset-0">
          <Image
            src={projects[0].image}
            alt=""
            fill
            priority
            className="object-cover opacity-[0.22]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/85 to-navy-900" />
        <div className="absolute inset-0 bg-navy-900/40" />
      </div>

      {/* Faint blueprint grid + soft glow — same ambient texture used
          elsewhere on the site, so the hero opens in the same visual
          language the rest of the page continues in */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 60% at 85% 8%, rgba(76,175,109,0.14), transparent 60%)",
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes heroZoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        .hero-bg-zoom {
          animation: heroZoom 20s ease-out forwards;
        }

        /* --- Villa construction sequence --- */
        .bp-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: bpDraw var(--bp-dur, 0.7s) ease-out forwards;
          animation-delay: var(--bp-delay, 0s);
        }
        @keyframes bpDraw { to { stroke-dashoffset: 0; } }

        .bp-fadein {
          opacity: 0;
          transform: translateY(-4px);
          animation: bpFadeIn 0.5s ease-out forwards;
          animation-delay: var(--bp-delay, 0s);
        }
        @keyframes bpFadeIn { to { opacity: 1; transform: translateY(0); } }

        .bp-drop {
          opacity: 0;
          transform: translateY(-22px);
          animation: bpDrop var(--bp-dur, 0.5s) cubic-bezier(.34,1.4,.64,1) forwards;
          animation-delay: var(--bp-delay, 0s);
        }
        @keyframes bpDrop {
          60% { opacity: 1; transform: translateY(3px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Ornamental trees bloom in with a gentle overshoot, rather than
           just fading — reads as "growing" instead of "appearing" */
        .bp-bloom {
          opacity: 0;
          transform: scale(0.4);
          transform-origin: bottom center;
          animation: bpBloom var(--bp-dur, 0.7s) cubic-bezier(.34,1.56,.64,1) forwards;
          animation-delay: var(--bp-delay, 0s);
        }
        @keyframes bpBloom { to { opacity: 1; transform: scale(1); } }

        /* Warm window / landscape-light glow-up at dusk */
        .bp-glow {
          opacity: 0;
          filter: drop-shadow(0 0 4px rgba(245,193,119,0.85));
          animation: bpGlowIn 0.5s ease-out forwards;
          animation-delay: var(--bp-delay, 3s);
        }
        @keyframes bpGlowIn { to { opacity: 1; } }

        /* Temporary scaffolding around the shell, removed once the villa
           is finished */
        .bp-scaffold {
          opacity: 0.55;
          animation: bpScaffoldOut 0.8s ease-in forwards;
          animation-delay: var(--bp-delay, 3.4s);
        }
        @keyframes bpScaffoldOut { to { opacity: 0; } }

        .bp-dusk {
          opacity: 0;
          animation: bpDusk 1.4s ease-out forwards;
          animation-delay: 2.4s;
        }
        @keyframes bpDusk { to { opacity: 0.45; } }

        /* Illustration layer fades out entirely once the photo takes over */
        .bp-illustration {
          opacity: 1;
          animation: bpIllustrationOut 1s ease-in forwards;
          animation-delay: 4.6s;
        }
        @keyframes bpIllustrationOut { to { opacity: 0; } }

        /* Real photo cross-dissolves in, full-bleed, with a gentle settle
           from a slight zoom — this is the actual reveal, and it always
           covers the whole frame regardless of the illustration's shape */
        .bp-photo {
          opacity: 0;
          transform: scale(1.06);
          animation: bpPhotoIn 1.5s ease-out forwards;
          animation-delay: 4.3s;
        }
        @keyframes bpPhotoIn { to { opacity: 1; transform: scale(1); } }

        .bp-caption {
          opacity: 0;
          transform: translateY(8px);
          animation: bpCaptionIn 0.6s ease-out forwards;
          animation-delay: 5.7s;
        }
        @keyframes bpCaptionIn { to { opacity: 1; transform: translateY(0); } }

        .bp-sheen {
          position: absolute;
          inset: -20% -40%;
          background: linear-gradient(
            75deg,
            transparent 40%,
            rgba(255,255,255,0.18) 50%,
            transparent 60%
          );
          transform: translateX(-60%);
          opacity: 0;
          animation: bpSheen 1.3s ease-in-out forwards;
          animation-delay: 5.0s;
        }
        @keyframes bpSheen {
          0% { opacity: 1; }
          100% { opacity: 1; transform: translateX(60%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-bg-zoom { animation: none; }
          .bp-draw { animation: none; stroke-dashoffset: 0; }
          .bp-fadein, .bp-drop, .bp-bloom { animation: none; opacity: 1; transform: none; }
          .bp-glow { animation: none; opacity: 1; }
          .bp-scaffold { animation: none; opacity: 0; }
          .bp-dusk { animation: none; opacity: 0; }
          .bp-illustration { display: none; }
          .bp-photo { animation: none; opacity: 1; transform: none; }
          .bp-caption { animation: none; opacity: 1; transform: none; }
          .bp-sheen { display: none; }
        }
      `,
        }}
      />

      <div className="container-page relative w-full py-14 sm:py-16">
        {/*
          Below md (360–768px): default single-column grid, so the two
          children simply stack in DOM order — copy first, construction
          reveal underneath.
          md and up (769–1920px): two-column row via md:grid-cols, copy
          on the left, construction reveal on the right. The breakpoint
          is intentionally md (768px), not the previous lg (1024px), so
          the row layout starts right where the stacked mobile layout
          should end.
        */}
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <Reveal className="max-w-5xl">
            <p className="eyebrow !text-green-300 mb-3 text-[13px] sm:text-sm">
              {brand.tagline}
            </p>
            <h1 className="heading-xl text-balance text-white">
              About {brand.name}
            </h1>
            <p className="mt-5 max-w-5xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              A distinguished, professionally managed group delivering
              premium residential, healthcare and hospitality developments
              across Hyderabad&rsquo;s high-growth corridors built on
              financial discipline, entrepreneurial vision and a steady
              commitment to long-term value.
            </p>
          </Reveal>

          {/* No longer hidden below lg — renders at every breakpoint so
              the animation plays on mobile and tablet too, just stacked
              under the copy instead of beside it until md kicks in. */}
          <Reveal delay={150}>
            <ConstructionReveal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * A foundation is poured, porch columns rise, a wooden chevron privacy
 * screen draws in slat by slat, a glass balcony rail and rooftop pergola
 * settle into place, trees bloom on either side, dusk falls and every
 * window and landscape light warms up, scaffolding recedes, a soft sheen
 * sweeps the façade — and the entire illustration cross-dissolves into a
 * full-bleed photo of a real project — closing on "this is real."
 * The photo is a plain `object-cover` layer sized to the whole card, so it
 * always presents completely; nothing depends on matching the drawing's
 * geometry pixel-for-pixel. Sizing is fluid (`w-full max-w-[380px]`) so
 * the same illustration scales down cleanly on phones as small as 360px
 * without changing its aspect ratio or animation timing.
 */
function ConstructionReveal() {
  const t = (delay: number, duration = 0.6): CSSProperties =>
    ({ ["--bp-delay" as any]: `${delay}s`, ["--bp-dur" as any]: `${duration}s` });

  // Falls back gracefully if there's only one project in the data set.
  const revealProject = projects[1] ?? projects[0];

  return (
    <div className="relative mx-auto aspect-[400/470] w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-2xl shadow-black/40 sm:max-w-[360px] md:max-w-[380px]">
      {/* dusk ambience, rises behind the villa as it nears completion */}
      <div
        aria-hidden
        className="bp-dusk absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 78%, rgba(245,193,119,0.5), transparent 65%)",
        }}
      />

      {/* ---------------- Illustration layer ---------------- */}
      <div className="bp-illustration absolute inset-0">
        <svg viewBox="0 0 400 520" className="absolute inset-0 h-full w-full p-6" fill="none">
          <defs>
            <linearGradient id="villa-glass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(215,230,240,0.24)" />
              <stop offset="100%" stopColor="rgba(18,34,52,0.42)" />
            </linearGradient>
            <linearGradient id="villa-wood" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(245,193,119,0.55)" />
              <stop offset="100%" stopColor="rgba(190,140,80,0.4)" />
            </linearGradient>
          </defs>

          {/* driveway / ground line */}
          <line className="bp-draw" pathLength={1} x1="20" y1="452" x2="380" y2="452" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" style={t(0, 0.5)} />

          {/* foundation slab */}
          <rect className="bp-fadein" x="88" y="440" width="224" height="10" rx="1.5" fill="rgba(255,255,255,0.22)" style={t(0.25, 0.5)} />

          {/* temporary scaffolding, removed once the villa is complete */}
          <g className="bp-scaffold" style={t(3.4, 0.9)}>
            <line x1="94" y1="440" x2="94" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <line x1="306" y1="440" x2="306" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            {[400, 350, 300, 250, 200, 160].map((y) => (
              <line key={y} x1="94" y1={y} x2="306" y2={y} stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
            ))}
          </g>

          {/* ground-floor porch columns */}
          <g className="bp-drop" style={t(0.5, 0.45)}>
            <rect x="100" y="300" width="12" height="140" fill="rgba(255,255,255,0.28)" />
          </g>
          <g className="bp-drop" style={t(0.62, 0.45)}>
            <rect x="194" y="300" width="12" height="140" fill="rgba(255,255,255,0.28)" />
          </g>
          <g className="bp-drop" style={t(0.74, 0.45)}>
            <rect x="288" y="300" width="12" height="140" fill="rgba(255,255,255,0.28)" />
          </g>

          {/* car-porch roof slab, wood-clad soffit */}
          <g className="bp-drop" style={t(0.95, 0.45)}>
            <rect x="88" y="286" width="224" height="16" rx="1" fill="url(#villa-wood)" stroke="rgba(255,255,255,0.2)" />
          </g>

          {/* three cars sheltered under the porch — a nod to the real photo */}
          <g style={t(1.15, 0.35)}>
            <rect className="bp-fadein" x="108" y="410" width="52" height="20" rx="6" fill="rgba(255,255,255,0.18)" style={t(1.15, 0.35)} />
            <rect className="bp-fadein" x="174" y="410" width="52" height="20" rx="6" fill="rgba(210,120,90,0.28)" style={t(1.3, 0.35)} />
            <rect className="bp-fadein" x="240" y="410" width="52" height="20" rx="6" fill="rgba(20,26,34,0.4)" style={t(1.45, 0.35)} />
          </g>

          {/* entry door */}
          <rect className="bp-fadein" x="182" y="350" width="36" height="88" fill="rgba(120,84,52,0.4)" stroke="rgba(255,255,255,0.2)" style={t(1.05, 0.4)} />

          {/* first-floor volume */}
          <g className="bp-drop" style={t(1.55, 0.5)}>
            <rect x="96" y="150" width="208" height="150" fill="url(#villa-glass)" stroke="rgba(255,255,255,0.25)" />
          </g>

          {/* wooden chevron privacy screen, drawn slat by slat */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const x = 150 + i * 10;
            return (
              <polyline
                key={i}
                className="bp-draw"
                pathLength={1}
                points={`${x},290 ${x + 12},220 ${x},150`}
                stroke="rgba(245,193,119,0.7)"
                strokeWidth="3"
                style={t(1.9 + i * 0.08, 0.35)}
              />
            );
          })}

          {/* glass balcony rail along the first-floor front edge */}
          <g className="bp-fadein" style={t(2.35, 0.4)}>
            <rect x="100" y="204" width="204" height="4" fill="rgba(255,255,255,0.4)" />
            {[100, 118, 136, 154, 172, 190, 208, 226, 244, 262, 280, 298].map((x) => (
              <line key={x} x1={x} y1="150" x2={x} y2="204" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
            ))}
          </g>

          {/* first-floor windows, warming up at dusk */}
          {[
            [108, 170], [108, 200], [268, 170], [268, 200],
          ].map(([x, y], i) => (
            <rect key={i} className="bp-glow" x={x} y={y} width="14" height="18" rx="1" fill="rgb(245,193,119)" style={t(3.0 + i * 0.12, 0.4)} />
          ))}

          {/* rooftop parapet */}
          <g className="bp-drop" style={t(2.55, 0.4)}>
            <rect x="106" y="126" width="188" height="24" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.2)" />
          </g>

          {/* rooftop pergola, drawn bar by bar */}
          {[112, 140, 168, 196, 224, 252, 280].map((x, i) => (
            <line
              key={x}
              className="bp-draw"
              pathLength={1}
              x1={x} y1="126" x2={x} y2="102"
              stroke="rgba(245,193,119,0.6)"
              strokeWidth="2.5"
              style={t(2.85 + i * 0.05, 0.3)}
            />
          ))}
          <line className="bp-draw" pathLength={1} x1="106" y1="102" x2="294" y2="102" stroke="rgba(245,193,119,0.6)" strokeWidth="2.5" style={t(3.2, 0.35)} />

          {/* potted plants along the rooftop parapet */}
          {[116, 150, 250, 284].map((x, i) => (
            <circle key={x} className="bp-bloom" cx={x} cy="120" r="6" fill="rgba(76,175,109,0.55)" style={t(3.1 + i * 0.08, 0.45)} />
          ))}

          {/* ornamental trees flanking the villa, blooming in on either side */}
          <g className="bp-bloom" style={t(2.6, 0.6)}>
            <line x1="46" y1="440" x2="46" y2="392" stroke="rgba(120,84,52,0.5)" strokeWidth="4" />
            <circle cx="40" cy="370" r="22" fill="rgba(76,175,109,0.42)" />
            <circle cx="58" cy="382" r="16" fill="rgba(76,175,109,0.32)" />
          </g>
          <g className="bp-bloom" style={t(2.75, 0.6)}>
            <line x1="356" y1="440" x2="356" y2="386" stroke="rgba(120,84,52,0.5)" strokeWidth="4" />
            <circle cx="362" cy="362" r="26" fill="rgba(76,175,109,0.42)" />
            <circle cx="340" cy="378" r="15" fill="rgba(76,175,109,0.32)" />
          </g>
          <g className="bp-bloom" style={t(2.9, 0.5)}>
            <circle cx="70" cy="420" r="12" fill="rgba(76,175,109,0.3)" />
          </g>
          <g className="bp-bloom" style={t(3.0, 0.5)}>
            <circle cx="330" cy="418" r="12" fill="rgba(76,175,109,0.3)" />
          </g>

          {/* landscape lights glowing on along the driveway */}
          {[60, 130, 270, 340].map((x, i) => (
            <circle key={x} className="bp-glow" cx={x} cy="450" r="2.5" fill="rgb(245,193,119)" style={t(3.5 + i * 0.1, 0.35)} />
          ))}
        </svg>
      </div>

      {/* ---------------- Real photo layer ---------------- */}
      {/* Full-bleed, object-cover — always fills the entire card regardless
          of viewport or aspect ratio, with no dependency on the SVG's
          coordinate system above. */}
      <div className="bp-photo absolute inset-0">
        <Image
          src="/images/parkside/east-villa.jpg"
          alt={revealProject.name}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 380px, (min-width: 640px) 360px, 320px"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/5 to-transparent" />
        <div className="bp-sheen" aria-hidden />
      </div>
    </div>
  );
}