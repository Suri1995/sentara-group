import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { brand, navLinks, projects } from "@/lib/data";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center text-sm text-white/60 transition-all duration-300 hover:pl-3 hover:text-white"
    >
      <span
        aria-hidden
        className="absolute left-0 top-1/2 h-px w-0 -translate-y-1/2 bg-green-400 transition-all duration-300 group-hover:w-2"
      />
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      {/* Faint blueprint grid — ties the footer back to the same texture
          used behind the Ventures and CTA sections, closing the page out
          in the same visual language it opened in */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 60% at 10% 0%, rgba(76,175,109,0.08), transparent 60%)",
        }}
      />

      <div
        className="
          container-page relative grid grid-cols-1 gap-y-12 py-16
          sm:grid-cols-2 sm:gap-x-10
          lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:gap-x-0 lg:divide-x lg:divide-white/10
        "
      >
        <div className="lg:pr-10">
          <div className="relative mb-6 h-16 w-60 overflow-hidden rounded-lg bg-white p-2 ring-1 ring-white/10">
            <Image
              src="/images/brand/sentara-logo.png"
              alt={brand.name}
              fill
              className="object-contain p-1"
            />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            A distinguished, professionally managed group delivering premium
            residential, healthcare and hospitality developments across
            Hyderabad&rsquo;s high-growth corridors.
          </p>
        </div>

        <div className="lg:px-10">
          <h4 className="mb-5 border-b border-white/10 pb-3 font-display text-base text-white">
            Explore
          </h4>
          <ul className="flex flex-col gap-3.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <FooterLink href={l.href}>{l.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:px-10">
          <h4 className="mb-5 border-b border-white/10 pb-3 font-display text-base text-white">
            Projects
          </h4>
          <ul className="flex flex-col gap-3.5">
            {projects.map((p) => (
              <li key={p.slug}>
                <FooterLink href={`/projects/${p.slug}`}>{p.name}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pl-10">
          <h4 className="mb-5 border-b border-white/10 pb-3 font-display text-base text-white">
            Get in touch
          </h4>
          <ul className="flex flex-col gap-4 text-sm text-white/60">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-green-400/80" aria-hidden />
              <span className="leading-relaxed">{brand.addressHQ}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-green-400/80" aria-hidden />
              <a
                href={`tel:${brand.phoneRaw}`}
                className="transition-colors duration-300 hover:text-white"
              >
                {brand.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-green-400/80" aria-hidden />
              <a
                href={`mailto:${brand.email}`}
                className="transition-colors duration-300 hover:text-white"
              >
                {brand.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p className="text-center">
            Renderings are artistic impressions; all details are subject to final
            approvals and RERA disclosures.
          </p>
        </div>
      </div>
    </footer>
  );
}