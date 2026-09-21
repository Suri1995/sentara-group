import Reveal from "@/components/Reveal";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-navy-gradient pb-40 pt-40 text-center text-white sm:pb-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 editorial-grid" />
      <div aria-hidden className="pointer-events-none absolute inset-0 luxury-gradient" />

      <div className="container-page relative">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-green-300/60 sm:w-10" aria-hidden />
            <p className="eyebrow !text-green-300">Get in Touch</p>
            <span className="h-px w-8 bg-green-300/60 sm:w-10" aria-hidden />
          </div>
          <h1 className="heading-xl mt-4 text-white">
            We&rsquo;d Love to Hear From You
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