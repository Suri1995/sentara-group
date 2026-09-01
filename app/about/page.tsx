import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";
import { chairman, brand } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — Executive Profile",
  description:
    "Meet Rangu Rajendra Prasad, Chairman & Managing Director of Sentara Group — a visionary leader bridging financial discipline with entrepreneurial vision.",
};

export default function AboutPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy-gradient pt-20">
        <div className="container-page grid grid-cols-1 items-center gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="order-2 text-white lg:order-1">
            <p className="eyebrow !text-green-300 mb-3">Executive Profile</p>
            <h1 className="heading-xl text-white">{chairman.name}</h1>
            <p className="mt-3 text-lg font-medium text-white/70">
              {chairman.subtitle}
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-green-300">
              {chairman.title}
            </p>
            <div className="divider-gold my-7" />
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {chairman.stats.map((s) => (
                <StatCounter key={s.label} value={s.value} label={s.label} dark />
              ))}
            </div>
          </Reveal>
          <Reveal
            delay={150}
            className="relative order-1 mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl shadow-premium lg:order-2"
          >
            <Image
              src={chairman.photo}
              alt={chairman.name}
              fill
              priority
              className="object-cover"
              sizes="400px"
            />
          </Reveal>
        </div>
      </section>

      {/* PROFILE OVERVIEW */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Profile Overview"
            title="A Leader Bridging Financial Discipline with Entrepreneurial Vision"
          />
          <Reveal delay={100} className="space-y-5">
            {chairman.overview.map((p) => (
              <p key={p.slice(0, 24)} className="body-lg">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CURRENT ROLES */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Current Roles"
            title="Current Corporate Leadership"
            description="Mr. Rangu Rajendra Prasad presently holds active leadership positions across a portfolio of real estate and investment entities, reflecting both the breadth of his enterprise and his hands-on involvement across every venture."
            align="center"
          />
          <div className="mx-auto mt-14 max-w-3xl space-y-4">
            {chairman.roles.map((r, i) => (
              <Reveal
                key={r.order}
                delay={i * 90}
                className="card-premium flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center"
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-navy-gradient font-display text-lg text-white">
                  {r.order}
                </span>
                <div className="flex-1">
                  <p className="font-display text-xl text-navy-900">{r.title}</p>
                  <p className="text-sm text-navy-600">{r.org}</p>
                </div>
                <span className="chip">Since {r.since}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STRENGTHS */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Strengths"
            title="Core Competencies"
            description="A leader who bridges financial discipline with entrepreneurial vision."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {chairman.strengths.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 100}
                className="card-premium p-8 text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-display text-lg text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION + CONTACT */}
      <section className="bg-navy-900 py-20 text-white sm:py-28">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal className="card-premium border-none bg-white/5 p-10 backdrop-blur">
            <p className="eyebrow !text-green-300 mb-3">Education</p>
            <h3 className="font-display text-2xl text-white">{chairman.education.degree}</h3>
            <p className="mt-2 text-white/60">{chairman.education.institution}</p>
          </Reveal>
          <Reveal delay={120} className="card-premium border-none bg-white/5 p-10 backdrop-blur">
            <p className="eyebrow !text-green-300 mb-3">Contact</p>
            <h3 className="font-display text-2xl text-white">{chairman.name}</h3>
            <p className="mt-1 text-white/60">{chairman.title}</p>
            <div className="mt-5 space-y-2 text-sm">
              <p>
                <a href={`tel:+91${chairman.phone}`} className="text-green-300 hover:underline">
                  +91 {chairman.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${chairman.email}`} className="text-green-300 hover:underline">
                  {chairman.email}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
