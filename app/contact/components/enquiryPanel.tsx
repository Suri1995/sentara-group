import { Clock, Lock, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

const trust = [
  { Icon: Clock, text: "Reply within 24 hrs" },
  { Icon: Lock, text: "Your details stay private" },
  { Icon: ShieldCheck, text: "No spam, ever" },
];

const css = `
@keyframes ep-float {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50%      { transform: translate3d(0, -24px, 0) scale(1.06); }
}
@keyframes ep-beam {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
.ep-float { animation: ep-float 9s ease-in-out infinite; }
.ep-beam {
  background-image: linear-gradient(90deg, #22c55e, #3b5b8c, #0f2444, #22c55e);
  background-size: 200% 100%;
  animation: ep-beam 6s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .ep-float,
  .ep-beam { animation: none !important; }
}
`;

export default function EnquiryPanel() {
  return (
    <Reveal
      delay={100}
      className="group/panel relative overflow-hidden card-premium p-8 sm:p-12"
    >
      <style>{css}</style>

      {/* Animated gradient beam along the top edge */}
      <span aria-hidden className="ep-beam absolute inset-x-0 top-0 h-1" />

      {/* Same glow as the hero, dimmed so it never competes with the form */}
      <div
        aria-hidden
        className="luxury-gradient pointer-events-none absolute inset-0 opacity-40"
      />

      {/* Corner ornament */}
      <div
        aria-hidden
        className="ep-float pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-green-500/10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-6 size-16 rounded-tr-2xl border-r border-t border-navy-900/10 transition-all duration-500 group-hover/panel:size-20 group-hover/panel:border-green-500/40"
      />

      <div className="relative">
        <SectionHeading
          title="Send Us an Enquiry"
          description="Fill in your details and our sales team will get back to you within 24 hours."
        />

        {/* Trust row */}
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {trust.map(({ Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-2 text-xs font-medium text-navy-500"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-green-50 text-green-600">
                <Icon className="size-3.5" aria-hidden />
              </span>
              {text}
            </li>
          ))}
        </ul>

        <div
          aria-hidden
          className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-navy-900/10 to-transparent"
        />

        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </Reveal>
  );
}