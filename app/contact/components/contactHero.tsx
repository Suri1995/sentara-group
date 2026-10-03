import Reveal from "@/components/Reveal";


const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400";

const css = `
@keyframes ch-float-slow {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50%      { transform: translate3d(0, -24px, 0) scale(1.06); }
}
@keyframes ch-float-slower {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50%      { transform: translate3d(-18px, 20px, 0) scale(0.95); }
}
@keyframes ch-scroll-dot {
  0%   { transform: translateY(0); opacity: 0; }
  30%  { opacity: 1; }
  100% { transform: translateY(14px); opacity: 0; }
}
@keyframes ch-beam {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
@keyframes ch-shine {
  from { transform: translateX(-120%) skewX(-20deg); }
  to   { transform: translateX(420%) skewX(-20deg); }
}

.ch-float-slow   { animation: ch-float-slow 9s ease-in-out infinite; }
.ch-float-slower { animation: ch-float-slower 12s ease-in-out infinite; }
.ch-scroll-dot   { animation: ch-scroll-dot 1.8s ease-in-out infinite; }
.ch-beam         { background-size: 200% 100%; animation: ch-beam 6s linear infinite; }
.ch-chip:hover .ch-shine { animation: ch-shine 0.9s ease-out; }

@media (prefers-reduced-motion: reduce) {
  .ch-float-slow,
  .ch-float-slower,
  .ch-scroll-dot,
  .ch-beam,
  .ch-chip:hover .ch-shine { animation: none !important; }
}
`;

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient pb-44 pt-40 text-center text-white sm:pb-48">
      <style>{css}</style>

      {/* Background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 editorial-grid" />
      <div aria-hidden className="pointer-events-none absolute inset-0 luxury-gradient" />

      {/* Floating glow orbs */}
      <div
        aria-hidden
        className="ch-float-slow pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-green-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="ch-float-slower pointer-events-none absolute -right-20 bottom-10 size-80 rounded-full bg-navy-500/40 blur-3xl"
      />

      {/* Decorative rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]"
      />

      <div className="container-page relative">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-green-300/60 sm:w-10" aria-hidden />
            <p className="eyebrow !text-green-300">Get in Touch</p>
            <span className="h-px w-8 bg-green-300/60 sm:w-10" aria-hidden />
          </div>

          <h1 className="heading-xl mt-4 text-white">
            We&rsquo;d Love to{" "}
            <span className="ch-beam bg-gradient-to-r from-green-300 via-white to-green-300 bg-clip-text text-transparent">
              Hear From You
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Whether you&rsquo;re exploring a villa at Anvita Parkside, a home at
            Landspace Elite, or an investment opportunity in our future
            ventures, our team is here to help.
          </p>
        </Reveal>

      </div>
    </section>
  );
}