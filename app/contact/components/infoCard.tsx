import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500";

type InfoCardProps = {
  label: string;
  value: string;
  Icon: LucideIcon;
  href: string;
  /** Open the link in a new tab (use for maps, not tel: or mailto:) */
  external?: boolean;
  /** Stagger delay for the reveal, in ms */
  delay?: number;
};

export default function InfoCard({
  label,
  value,
  Icon,
  href,
  external = false,
  delay = 0,
}: InfoCardProps) {
  return (
    <Reveal
      delay={delay}
      className="group relative overflow-hidden card-premium p-6"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-green-500 to-navy-500 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <div className="flex items-start gap-4">
        <span className="flex size-12 flex-none items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-white">
          <Icon className="size-5" strokeWidth={1.6} aria-hidden />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-navy-500">{label}</p>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`group/link mt-1 inline-flex items-start gap-1 text-navy-900 transition-colors duration-200 hover:text-green-600 ${focusRing}`}
          >
            <span className="break-words">{value}</span>
            <ArrowUpRight
              className="mt-1 size-3.5 shrink-0 opacity-0 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:opacity-100"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </Reveal>
  );
}