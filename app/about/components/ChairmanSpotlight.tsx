import Image from "next/image";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";
import { chairman } from "@/lib/data";

/**
 * The ONE component on the About page that is about Rajendra Prasad
 * personally — portrait, bio, personal stats, current roles, core
 * competencies, education and direct contact. Everything else on the
 * page speaks about Sentara Group as an institution; this section is
 * where the page introduces the person leading it.
 */
export default function ChairmanSpotlight() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow !text-green-300">Leadership</p>
          <h2 className="heading-lg mt-3 !text-white">
            The chairman behind the group.
          </h2>
        </div>

        {/* Portrait, bio and personal stats */}
        <div className="mt-14 grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal
            delay={80}
            className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl shadow-premium"
          >
            <Image
              src={chairman.photo}
              alt={chairman.name}
              fill
              className="object-cover"
              sizes="400px"
            />
          </Reveal>

          <Reveal delay={160}>
            <h3 className="font-display text-3xl text-white">
              {chairman.name}
            </h3>
            <p className="mt-2 text-lg font-medium text-white/70">
              {chairman.subtitle}
            </p>
            <p className="mt-1 text-sm font-medium text-green-300">
              {chairman.title}
            </p>
            <div className="divider-gold my-6" />
            <p className="leading-relaxed text-white/70">
              {chairman.overview[0]}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {chairman.stats.map((s) => (
                <StatCounter
                  key={s.label}
                  value={s.value}
                  label={s.label}
                  dark
                />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Current roles */}
        <div className="mt-16 border-t border-white/10 pt-14">
          <h4 className="text-center font-display text-2xl text-white">
            Current corporate leadership
          </h4>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {chairman.roles.map((r, i) => (
              <Reveal
                key={r.order}
                delay={i * 90}
                className="card-premium flex flex-col items-start gap-4 border-none bg-white/5 p-6 backdrop-blur sm:flex-row sm:items-center"
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-navy-gradient font-display text-lg text-white">
                  {r.order}
                </span>
                <div className="flex-1">
                  <p className="font-display text-xl text-white">{r.title}</p>
                  <p className="text-sm text-white/60">{r.org}</p>
                </div>
                <span className="chip border-white/15 !bg-white/10 !text-white">
                  Since {r.since}
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Core competencies */}
        <div className="mt-16 border-t border-white/10 pt-14">
          <h4 className="text-center font-display text-2xl text-white">
            Core competencies
          </h4>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {chairman.strengths.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 90}
                className="card-premium border-none bg-white/5 p-6 backdrop-blur"
              >
                <h5 className="font-display text-base text-white">
                  {s.title}
                </h5>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Education + direct contact */}
        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-white/10 pt-14 lg:grid-cols-2">
          <Reveal className="card-premium border-none bg-white/5 p-10 backdrop-blur">
            <p className="eyebrow !text-green-300 mb-3">Education</p>
            <h3 className="font-display text-2xl text-white">
              {chairman.education.degree}
            </h3>
            <p className="mt-2 text-white/60">{chairman.education.institution}</p>
          </Reveal>
          <Reveal delay={120} className="card-premium border-none bg-white/5 p-10 backdrop-blur">
            <p className="eyebrow !text-green-300 mb-3">Contact</p>
            <h3 className="font-display text-2xl text-white">{chairman.name}</h3>
            <p className="mt-1 text-white/60">{chairman.title}</p>
            <div className="mt-5 space-y-2 text-sm">
              <p>
                <a
                  href={`tel:+91${chairman.phone}`}
                  className="text-green-300 hover:underline"
                >
                  +91 {chairman.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${chairman.email}`}
                  className="text-green-300 hover:underline"
                >
                  {chairman.email}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}