"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export interface TeamMember {
  name: string;
  title: string;
  photo: string;
  /** One-paragraph bio. For the featured member this is the copy shown
   *  beside their portrait; for carousel cards it's clamped to 3 lines. */
  bio: string;
  /** Optional link to a full profile page (e.g. "/about"). */
  href?: string;
  /** Mark true for the person who gets the large spotlight treatment.
   *  If no member is marked featured, the first one in the array is used. */
  featured?: boolean;
}

function FeaturedMember({ member }: { member: TeamMember }) {
  return (
    <div
      className="
        relative rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-6
        sm:p-8
        md:p-10
      "
    >
      <div
        className="
          grid gap-10
          sm:gap-12
          md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-10
          lg:grid-cols-[0.8fr_1.2fr] lg:gap-14
        "
      >
        {/* ---------------- Image column ---------------- */}
        <Reveal
          className="
            relative mx-auto w-full
            max-w-[220px]
            sm:max-w-xs
            md:mx-0 md:max-w-[240px]
            lg:max-w-[300px]
          "
        >
          {/* Offset frame — sits behind the photo for an editorial, layered look */}
          <div
            aria-hidden
            className="
              absolute rounded-[1.25rem] border border-emerald-300/35
              -bottom-3 -right-3 -z-10
              sm:-bottom-4 sm:-right-4 sm:rounded-[1.75rem]
              lg:-bottom-5 lg:-right-5
            "
            style={{ inset: "12px -12px -12px 12px" }}
          />

          {/* Photo + nameplate share one container so the nameplate floats
              as an absolute overlay instead of adding height below the image */}
          <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:rounded-[1.75rem]">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover image-lift grayscale-[8%] transition-all duration-700 ease-out group-hover:grayscale-0"
              sizes="(min-width: 1024px) 300px, (min-width: 768px) 240px, (min-width: 640px) 320px, 220px"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent"
            />
          </div>
        </Reveal>

        {/* ---------------- Copy column ---------------- */}
        <Reveal delay={100} className="relative">
          {/* Oversized decorative mark — pulled well clear of the eyebrow row,
              and only shown once there's enough room (xl) to not crowd it */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-24 hidden select-none font-display text-[8rem] leading-none text-white/[0.05] xl:block"
          >
            &ldquo;
          </span>

          <div className="flex items-center justify-center gap-3 md:justify-start">
            <span className="h-px w-8 bg-emerald-300/60 sm:w-10" aria-hidden />
            <p className="eyebrow !text-green-300">{member.title}</p>
          </div>

          <h2
            className="
              mt-4 text-center font-display text-3xl leading-[1.15] tracking-tight text-white
              sm:mt-5 sm:text-4xl
              md:text-left md:text-4xl
              lg:text-5xl
            "
          >
            {member.name}
          </h2>

          <p
            className="
              mx-auto mt-5 max-w-md text-center text-base leading-7 text-white/70
              sm:mt-6 sm:max-w-xl sm:text-lg sm:leading-8
              md:mx-0 md:max-w-2xl md:text-left
            "
          >
            {member.bio}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const Wrapper = member.href ? Link : "div";
  const wrapperProps = member.href ? { href: member.href } : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.07] sm:p-6"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover grayscale-[10%] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 320px, 90vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"
        />
      </div>

      <h3 className="mt-4 font-display text-lg text-white sm:text-xl">
        {member.name}
      </h3>
      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-emerald-300/90 sm:text-xs">
        {member.title}
      </p>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-white/65">
        {member.bio}
      </p>

      {member.href && (
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View profile
          <ArrowUpRight className="size-3.5" aria-hidden />
        </span>
      )}
    </Wrapper>
  );
}

/** Horizontal, snap-scrolling carousel with prev/next controls. Only
 *  rendered by the parent when there are 2+ additional members — a
 *  single card doesn't need carousel machinery. */
function TeamCarousel({ members }: { members: TeamMember[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [members.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-item]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.9;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="
          -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          sm:gap-6
        "
      >
        {members.map((member, i) => (
          <Reveal
            key={member.name}
            delay={i * 100}
            data-carousel-item
            className="w-[82%] flex-none snap-start sm:w-[46%] lg:w-[31%]"
          >
            <TeamMemberCard member={member} />
          </Reveal>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          aria-label="Previous team member"
          className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:border-white/30 hover:bg-white/5 disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          aria-label="Next team member"
          className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:border-white/30 hover:bg-white/5 disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

export default function OurTeamSection({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;

  const featured = members.find((m) => m.featured) ?? members[0];
  const rest = members.filter((m) => m !== featured);

  return (
    <section className="relative overflow-hidden bg-navy py-8 text-white sm:py-20">
      {/* Ambient depth — soft radial glow + faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 65% 55% at 12% 10%, rgba(76,175,109,0.14), transparent 60%), radial-gradient(ellipse 55% 45% at 90% 85%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-page relative">
        {/* Section header */}
        <div className="mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-emerald-300/60 sm:w-10" aria-hidden />
            <p className="text-sm font-medium !text-green-300">Our Team</p>
            <span className="h-px w-8 bg-emerald-300/60 sm:w-10" aria-hidden />
          </div>
          <h2 className="heading-lg !text-white mt-4">
            The people steering our growth.
          </h2>
          <p className="body-lg mx-auto mt-4 !text-white/70 sm:mt-5">
            A leadership team defined by discipline, vision and an
            unwavering commitment to quality guiding every development
            from concept through to delivery.
          </p>
        </div>

        {/* Spotlight */}
        <div className="mt-10 sm:mt-14 md:mt-16">
          <FeaturedMember member={featured} />
        </div>

        {/* Additional members:
              0 → render nothing
              1 → a single centered card, no carousel controls
              2+ → carousel with prev/next buttons              */}
        {rest.length === 1 && (
          <div className="mt-8 flex justify-center sm:mt-10">
            <div className="w-full max-w-sm">
              <Reveal>
                <TeamMemberCard member={rest[0]} />
              </Reveal>
            </div>
          </div>
        )}

        {rest.length > 1 && (
          <div className="mt-8 sm:mt-10">
            <TeamCarousel members={rest} />
          </div>
        )}
      </div>
    </section>
  );
}