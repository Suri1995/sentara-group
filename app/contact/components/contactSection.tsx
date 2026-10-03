import Reveal from "@/components/Reveal";
import ContactInfoCards from "./contactInfoCards";
import EnquiryPanel from "./enquiryPanel";

const css = `
@keyframes cs-ping {
  0%   { transform: scale(1); opacity: 0.6; }
  80%, 100% { transform: scale(2.4); opacity: 0; }
}
.cs-ping { animation: cs-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; }

@media (prefers-reduced-motion: reduce) {
  .cs-ping { animation: none !important; }
}
`;

/**
 * Two-column layout: contact details on the left (sticky on desktop),
 * enquiry form on the right. The negative top margin lets the cards
 * overlap the hero's lower edge.
 */
export default function ContactSection() {
  return (
    <section className="relative -mt-24 pb-20 sm:-mt-28 sm:pb-28">
      <style>{css}</style>

      {/* Soft background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 size-96 rounded-full bg-green-500/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 size-96 rounded-full bg-navy-500/5 blur-3xl"
      />

      <div className="container-page relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        <aside className="space-y-5 lg:sticky lg:top-28 lg:col-span-1 lg:self-start">
          <ContactInfoCards />

          {/* Response promise */}
          <Reveal delay={350}>
            <div className="flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-50/70 px-5 py-4 backdrop-blur">
              <span className="relative flex size-2.5 flex-none">
                <span
                  aria-hidden
                  className="cs-ping absolute inset-0 rounded-full bg-green-500"
                />
                <span className="relative size-2.5 rounded-full bg-green-500" />
              </span>
              <p className="text-sm text-navy-900">
                <span className="font-semibold">Team online.</span>{" "}
                <span className="text-navy-500">
                  Enquiries are answered within 24 hours.
                </span>
              </p>
            </div>
          </Reveal>
        </aside>

        <div id="enquiry" className="scroll-mt-28 lg:col-span-2">
          <EnquiryPanel />
        </div>
      </div>
    </section>
  );
}