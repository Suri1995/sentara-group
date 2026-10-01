"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import { brand, navLinks, projects } from "@/lib/data";

const EASE = "cubic-bezier(.22,1,.36,1)";
const RING_R = 20;
const RING_C = 2 * Math.PI * RING_R;

// Fixed values (no Math.random) so server and client render identically
const particles = [
  { left: "6%", size: 3, dur: 16, delay: 0, dx: 24 },
  { left: "14%", size: 2, dur: 21, delay: 5, dx: -18 },
  { left: "23%", size: 4, dur: 18, delay: 9, dx: 30 },
  { left: "34%", size: 2, dur: 24, delay: 2, dx: -26 },
  { left: "46%", size: 3, dur: 19, delay: 11, dx: 18 },
  { left: "57%", size: 2, dur: 22, delay: 7, dx: -22 },
  { left: "68%", size: 4, dur: 17, delay: 3, dx: 28 },
  { left: "77%", size: 2, dur: 25, delay: 13, dx: -16 },
  { left: "86%", size: 3, dur: 20, delay: 6, dx: 22 },
  { left: "94%", size: 2, dur: 23, delay: 10, dx: -24 },
];

/**
 * Motion layer — plain CSS, every rule `ft-` prefixed.
 *
 * Ambient (marks time): two light fields drift, a green light travels the
 * top edge, tiny motes rise slowly, and a shine passes across the brand
 * mark. Responsive to the person: a glow follows the cursor, the link
 * panel's border lights up where the cursor is, links slide, contact rows
 * light up and copy on tap, and the brand mark fills green under the
 * cursor. All of it is disabled under reduced motion.
 */
const css = `
@keyframes ft-drift-a{0%{transform:translate3d(0,0,0) scale(1)}100%{transform:translate3d(8%,12%,0) scale(1.18)}}
@keyframes ft-drift-b{0%{transform:translate3d(0,0,0) scale(1.1)}100%{transform:translate3d(-10%,-8%,0) scale(.95)}}
.ft-aurora-a{animation:ft-drift-a 20s ease-in-out infinite alternate}
.ft-aurora-b{animation:ft-drift-b 24s ease-in-out infinite alternate}

@keyframes ft-shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
.ft-shimmer{animation:ft-shimmer 7s ease-in-out infinite}

@keyframes ft-float{
  0%{transform:translate3d(0,0,0);opacity:0}
  12%{opacity:.85}
  88%{opacity:.4}
  100%{transform:translate3d(var(--dx,20px),-620px,0);opacity:0}}
.ft-mote{position:absolute;bottom:-12px;border-radius:9999px;background:#4CAF6D;
  box-shadow:0 0 14px 2px rgba(76,175,109,.7);opacity:0;
  animation:ft-float var(--dur,20s) linear infinite;animation-delay:var(--delay,0s)}

.ft-spot{opacity:0;transition:opacity .6s ease;
  background:radial-gradient(520px circle at var(--fx,50%) var(--fy,50%),rgba(76,175,109,.07),transparent 60%)}
.ft:hover .ft-spot{opacity:1}

/* link panel: border light + inner glow follow the cursor */
.ft-sheet::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;
  background:radial-gradient(420px circle at var(--sx,50%) var(--sy,50%),rgba(76,175,109,.95),transparent 45%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  opacity:0;transition:opacity .5s ease}
.ft-sheet:hover::before{opacity:1}
.ft-sheet-glow{opacity:0;transition:opacity .5s ease;
  background:radial-gradient(520px circle at var(--sx,50%) var(--sy,50%),rgba(76,175,109,.09),transparent 60%)}
.ft-sheet:hover .ft-sheet-glow{opacity:1}

/* brand mark: outline, idle shine, cursor fill */
.ft-mark{-webkit-text-stroke:1px rgba(255,255,255,.13);color:transparent}
.ft-mark-shine{color:transparent;
  background:linear-gradient(105deg,transparent 42%,rgba(76,175,109,.55) 50%,transparent 58%);
  background-size:250% 100%;background-position:150% 0;
  -webkit-background-clip:text;background-clip:text;animation:ft-shine 9s ease-in-out infinite}
@keyframes ft-shine{0%{background-position:150% 0}60%,100%{background-position:-50% 0}}
.ft-mark-fill{opacity:0;transition:opacity .5s ease;color:transparent;
  background:radial-gradient(320px circle at var(--mx,50%) var(--my,50%),#4CAF6D,rgba(76,175,109,.15) 60%,transparent 75%);
  -webkit-background-clip:text;background-clip:text}
.ft-markbox:hover .ft-mark-fill{opacity:1}

.ft-top .ft-ring{transition:stroke-dashoffset .2s linear}
.ft-top:hover .ft-arrow{animation:ft-bob .9s ${EASE} infinite}
@keyframes ft-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}

@keyframes ft-pop{0%{transform:scale(.6)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
.ft-pop{animation:ft-pop .4s ${EASE}}

@media (prefers-reduced-motion:reduce){
  .ft-aurora-a,.ft-aurora-b,.ft-shimmer,.ft-mote,.ft-mark-shine,.ft-top:hover .ft-arrow,.ft-pop{animation:none}
  .ft-mote{display:none}
  .ft-spot,.ft-sheet::before,.ft-sheet-glow,.ft-mark-fill{transition:none}
}
`;

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-1.5 text-sm text-white/60 transition-all duration-300 ease-out hover:translate-x-1 hover:text-white focus-visible:text-white focus-visible:outline-none"
    >
      <span
        aria-hidden
        className="h-px w-0 bg-[#4CAF6D] transition-all duration-300 group-hover:w-3 group-focus-visible:w-3"
      />
      {children}
      <ArrowUpRight
        className="size-3 -translate-x-1 translate-y-1 text-[#4CAF6D] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden
      />
    </Link>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-5 flex items-center gap-3 font-display text-base text-white">
      <span aria-hidden className="size-1.5 rounded-full bg-[#4CAF6D] shadow-[0_0_10px_2px_rgba(76,175,109,0.6)]" />
      {children}
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
    </h4>
  );
}

function ContactRow({
  icon: Icon,
  href,
  external,
  copy,
  label,
  children,
}: {
  icon: typeof Mail;
  href: string;
  external?: boolean;
  copy?: string;
  label?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (!copy) return;
    try {
      await navigator.clipboard.writeText(copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the link itself still works */
    }
  };

  return (
    <div className="group relative -mx-2 flex items-center rounded-2xl transition-colors duration-300 hover:bg-white/[0.05] focus-within:bg-white/[0.05]">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex min-w-0 flex-1 items-center gap-3.5 rounded-2xl p-2 text-sm text-white/65 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4CAF6D]/60"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#4CAF6D] transition-all duration-500 group-hover:-rotate-6 group-hover:border-[#4CAF6D] group-hover:bg-[#4CAF6D] group-hover:text-navy-950">
          <Icon className="size-4" aria-hidden />
        </span>
        <span className="min-w-0 break-words leading-relaxed">{children}</span>
      </a>

      {copy && (
        <>
          <button
            type="button"
            onClick={onCopy}
            aria-label={`Copy ${label ?? "to clipboard"}`}
            className="mr-1.5 flex size-8 shrink-0 items-center justify-center rounded-lg text-white/50 opacity-0 transition-all duration-300 hover:bg-white/10 hover:text-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4CAF6D]/60 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
          >
            {copied ? (
              <Check key="done" className="ft-pop size-3.5 text-[#4CAF6D]" aria-hidden />
            ) : (
              <Copy className="size-3.5" aria-hidden />
            )}
          </button>
          <span role="status" className="sr-only">
            {copied ? `${label ?? "Text"} copied` : ""}
          </span>
        </>
      )}
    </div>
  );
}

export default function Footer() {
  const [progress, setProgress] = useState(0);

  // Scroll progress feeds the ring around the back-to-top button
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const trackPointer =
    (xVar: string, yVar: string) => (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "mouse") return;
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty(xVar, `${e.clientX - r.left}px`);
      e.currentTarget.style.setProperty(yVar, `${e.clientY - r.top}px`);
    };

  const backToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const markWord = brand.name.split(" ")[0];
  const markSize = { fontSize: "clamp(4.5rem, 21vw, 19rem)" };
  const markClass = "text-center font-display font-semibold leading-[0.82] tracking-tight";
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.addressHQ)}`;

  return (
    <footer
      onPointerMove={trackPointer("--fx", "--fy")}
      className="ft relative overflow-hidden bg-navy-900 text-white"
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ---------- Ambient layers ---------- */}
      <div
        aria-hidden
        className="ft-aurora-a pointer-events-none absolute -left-32 -top-40 size-[34rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(76,175,109,0.2), transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="ft-aurora-b pointer-events-none absolute -bottom-48 -right-32 size-[36rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(76,175,109,0.14), transparent 65%)",
          filter: "blur(90px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 85%)",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 85%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="ft-mote"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              ["--dur" as any]: `${p.dur}s`,
              ["--delay" as any]: `${p.delay}s`,
              ["--dx" as any]: `${p.dx}px`,
            }}
          />
        ))}
      </div>
      <span aria-hidden className="ft-spot pointer-events-none absolute inset-0" />

      {/* Green light travelling along the top edge */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px overflow-hidden bg-white/10">
        <span className="ft-shimmer block h-full w-1/2 bg-gradient-to-r from-transparent via-[#4CAF6D] to-transparent" />
      </div>

      {/* ---------- Link panel ---------- */}
      <div className="container-page relative pt-14 sm:pt-20">
        <div
          onPointerMove={trackPointer("--sx", "--sy")}
          className="ft-sheet relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 backdrop-blur-md sm:p-10 lg:p-12"
        >
          <span aria-hidden className="ft-sheet-glow pointer-events-none absolute inset-0" />

          <div className="relative grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1.4fr] lg:gap-12">
            <Reveal>
              <Link
                href="/"
                aria-label={`${brand.name} home`}
                className="group relative mb-6 block h-16 w-60 overflow-hidden rounded-xl bg-white p-2 ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_rgba(76,175,109,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF6D]/70"
              >
                <Image
                  src="/images/brand/sentara-logo.png"
                  alt={brand.name}
                  fill
                  className="object-contain p-1 transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-white/60">
                A distinguished, professionally managed group delivering premium
                residential, healthcare and hospitality developments across
                Hyderabad&rsquo;s high-growth corridors.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <ColumnHeading>Explore</ColumnHeading>
              <ul className="flex flex-col gap-3.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={160}>
              <ColumnHeading>Projects</ColumnHeading>
              <ul className="flex flex-col gap-3.5">
                {projects.map((p) => (
                  <li key={p.slug}>
                    <FooterLink href={`/projects/${p.slug}`}>{p.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={240}>
              <ColumnHeading>Get in touch</ColumnHeading>
              <div className="flex flex-col gap-1.5">
                <ContactRow icon={MapPin} href={mapsHref} external>
                  {brand.addressHQ}
                </ContactRow>
                <ContactRow icon={Phone} href={`tel:${brand.phoneRaw}`} copy={brand.phone} label="phone number">
                  {brand.phone}
                </ContactRow>
                <ContactRow icon={Mail} href={`mailto:${brand.email}`} copy={brand.email} label="email address">
                  {brand.email}
                </ContactRow>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---------- Oversized brand mark ---------- */}
      <div
        onPointerMove={trackPointer("--mx", "--my")}
        className="ft-markbox relative mt-6 select-none overflow-hidden sm:mt-10"
        aria-hidden
      >
        <div className="container-page relative">
          <p className={`ft-mark ${markClass}`} style={markSize}>
            {markWord}
          </p>
          <p className={`ft-mark-shine absolute inset-0 ${markClass}`} style={markSize}>
            {markWord}
          </p>
          <p className={`ft-mark-fill absolute inset-0 ${markClass}`} style={markSize}>
            {markWord}
          </p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-900 to-transparent" />
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="max-w-xl text-center sm:text-left">
            Renderings are artistic impressions; all details are subject to final
            approvals and RERA disclosures.
          </p>

          <button
            type="button"
            onClick={backToTop}
            aria-label="Back to top"
            className="ft-top group relative flex size-12 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-300 hover:text-[#4CAF6D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF6D]/70"
          >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden>
              <circle cx="24" cy="24" r={RING_R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
              <circle
                className="ft-ring"
                cx="24"
                cy="24"
                r={RING_R}
                fill="none"
                stroke="#4CAF6D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={RING_C * (1 - progress)}
              />
            </svg>
            <ArrowUp className="ft-arrow size-4" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}