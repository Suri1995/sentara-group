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
 * The construction sequence — a crane sets a glass tower's floor-tiers in
 * place, dusk settles and windows light up, the crane recedes, and the
 * whole illustration cross-dissolves into a real photograph of one of the
 * Group's projects — now plays at every screen size, not just on large
 * screens: from 360px up to 768px it sits stacked underneath the copy
 * (the grid's default single-column flow), and from 769px up it sits
 * beside the copy in a two-column row. The photo always fills the full
 * frame; it never depends on lining up with the illustration's geometry,
 * so there's nothing to misalign at any width.
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

        /* --- Construction sequence --- */
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
          transform: translateY(-26px);
          animation: bpDrop var(--bp-dur, 0.5s) cubic-bezier(.34,1.4,.64,1) forwards;
          animation-delay: var(--bp-delay, 0s);
        }
        @keyframes bpDrop {
          60% { opacity: 1; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .bp-hook {
          opacity: 0;
          animation: bpHook var(--bp-dur, 0.5s) ease-in-out forwards;
          animation-delay: var(--bp-delay, 0s);
        }
        @keyframes bpHook {
          0% { opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }

        .bp-glow {
          opacity: 0;
          filter: drop-shadow(0 0 4px rgba(245,193,119,0.85));
          animation: bpGlowIn 0.4s ease-out forwards;
          animation-delay: var(--bp-delay, 3s);
        }
        @keyframes bpGlowIn { to { opacity: 1; } }

        .bp-recede {
          animation: bpRecede 1s ease-in forwards;
          animation-delay: var(--bp-delay, 3.4s);
        }
        @keyframes bpRecede { to { opacity: 0; } }

        .bp-dusk {
          opacity: 0;
          animation: bpDusk 1.4s ease-out forwards;
          animation-delay: 2.6s;
        }
        @keyframes bpDusk { to { opacity: 0.4; } }

        /* Illustration layer fades out entirely once the photo takes over */
        .bp-illustration {
          opacity: 1;
          animation: bpIllustrationOut 1s ease-in forwards;
          animation-delay: 4.2s;
        }
        @keyframes bpIllustrationOut { to { opacity: 0; } }

        /* Real photo cross-dissolves in, full-bleed, with a gentle settle
           from a slight zoom — this is the actual reveal, and it always
           covers the whole frame regardless of the illustration's shape */
        .bp-photo {
          opacity: 0;
          transform: scale(1.06);
          animation: bpPhotoIn 1.4s ease-out forwards;
          animation-delay: 3.9s;
        }
        @keyframes bpPhotoIn { to { opacity: 1; transform: scale(1); } }

        .bp-caption {
          opacity: 0;
          transform: translateY(8px);
          animation: bpCaptionIn 0.6s ease-out forwards;
          animation-delay: 5.3s;
        }
        @keyframes bpCaptionIn { to { opacity: 1; transform: translateY(0); } }

        .bp-sheen {
          position: absolute;
          inset: -20% -40%;
          background: linear-gradient(
            75deg,
            transparent 40%,
            rgba(255,255,255,0.16) 50%,
            transparent 60%
          );
          transform: translateX(-60%);
          opacity: 0;
          animation: bpSheen 1.3s ease-in-out forwards;
          animation-delay: 4.6s;
        }
        @keyframes bpSheen {
          0% { opacity: 1; }
          100% { opacity: 1; transform: translateX(60%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-bg-zoom { animation: none; }
          .bp-draw { animation: none; stroke-dashoffset: 0; }
          .bp-fadein, .bp-drop { animation: none; opacity: 1; transform: none; }
          .bp-hook { display: none; }
          .bp-glow { animation: none; opacity: 1; }
          .bp-recede { animation: none; opacity: 0; }
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
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-green-300 mb-3 text-[13px] sm:text-sm">
              About {brand.name}
            </p>
            <h1 className="heading-xl text-balance text-white">
              {brand.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
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
 * A crane sets a glass tower's tiers in place, dusk falls and windows
 * light up, the crane recedes, and the entire illustration cross-dissolves
 * into a full-bleed photo of a real project — closing on "this is real."
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
    <div className="relative mx-auto aspect-[400/520] w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-2xl shadow-black/40 sm:max-w-[360px] md:max-w-[380px]">
      {/* dusk ambience, rises behind the scene as the tower nears completion */}
      <div
        aria-hidden
        className="bp-dusk absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 75%, rgba(245,193,119,0.5), transparent 65%)",
        }}
      />

      {/* ---------------- Illustration layer ---------------- */}
      <div className="bp-illustration absolute inset-0">
        <svg viewBox="0 0 400 520" className="absolute inset-0 h-full w-full p-6" fill="none">
          <defs>
            <linearGradient id="bp-glass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(215,230,240,0.22)" />
              <stop offset="100%" stopColor="rgba(18,34,52,0.4)" />
            </linearGradient>
          </defs>

          {/* ground */}
          <line className="bp-draw" pathLength={1} x1="30" y1="430" x2="300" y2="430" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" style={t(0, 0.4)} />

          {/* crane — mast, jib, counterweight, trolley; recedes once the tower is up */}
          <g className="bp-recede" style={t(3.4, 1)}>
            <line className="bp-draw" pathLength={1} x1="90" y1="460" x2="90" y2="40" stroke="rgba(255,255,255,0.55)" strokeWidth="2" style={t(0.1, 0.8)} />
            <line className="bp-draw" pathLength={1} x1="55" y1="40" x2="235" y2="40" stroke="rgba(255,255,255,0.55)" strokeWidth="2" style={t(0.55, 0.5)} />
            <rect className="bp-fadein" x="50" y="35" width="16" height="10" fill="rgba(255,255,255,0.3)" style={t(0.9, 0.3)} />
            <rect className="bp-fadein" x="196" y="35" width="14" height="10" fill="rgba(255,255,255,0.3)" style={t(1, 0.3)} />

            {[0.9, 1.4, 1.85, 2.25].map((d, i) => (
              <g key={i} className="bp-hook" style={t(d, 0.5)}>
                <line x1="200" y1="44" x2="200" y2="62" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                <rect x="195" y="60" width="10" height="6" fill="rgba(255,255,255,0.4)" />
              </g>
            ))}
          </g>

          {/* tower tiers — each drops into place, bottom to top */}
          <g className="bp-drop" style={t(1.1, 0.5)}>
            <rect x="140" y="250" width="120" height="180" fill="url(#bp-glass)" stroke="rgba(255,255,255,0.25)" />
            {[270, 300, 330, 360, 390, 410].map((y) => (
              <line key={y} x1="140" y1={y} x2="260" y2={y} stroke="rgba(255,255,255,0.15)" />
            ))}
          </g>
          <g className="bp-drop" style={t(1.6, 0.45)}>
            <rect x="150" y="150" width="100" height="100" fill="url(#bp-glass)" stroke="rgba(255,255,255,0.25)" />
            {[170, 190, 210, 230].map((y) => (
              <line key={y} x1="150" y1={y} x2="250" y2={y} stroke="rgba(255,255,255,0.15)" />
            ))}
          </g>
          <g className="bp-drop" style={t(2.05, 0.4)}>
            <rect x="162" y="80" width="76" height="70" fill="url(#bp-glass)" stroke="rgba(255,255,255,0.25)" />
            {[95, 110, 125].map((y) => (
              <line key={y} x1="162" y1={y} x2="238" y2={y} stroke="rgba(255,255,255,0.15)" />
            ))}
          </g>
          <g className="bp-drop" style={t(2.45, 0.35)}>
            <rect x="175" y="50" width="50" height="30" fill="url(#bp-glass)" stroke="rgba(255,255,255,0.25)" />
          </g>
          <line className="bp-draw" pathLength={1} x1="200" y1="50" x2="200" y2="20" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" style={t(2.8, 0.2)} />

          {/* windows warming up as dusk settles */}
          {[
            [150, 280], [230, 300], [170, 180], [220, 200], [185, 100],
          ].map(([x, y], i) => (
            <rect key={i} className="bp-glow" x={x} y={y} width="10" height="7" fill="rgb(245,193,119)" style={t(2.9 + i * 0.1, 0.3)} />
          ))}
        </svg>
      </div>

      {/* ---------------- Real photo layer ---------------- */}
      {/* Full-bleed, object-cover — always fills the entire card regardless
          of viewport or aspect ratio, with no dependency on the SVG's
          coordinate system above. */}
      <div className="bp-photo absolute inset-0">
        <Image
          src={revealProject.image}
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