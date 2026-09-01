import Link from "next/link";
import Image from "next/image";
import { brand, navLinks, projects } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-page grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="relative mb-5 h-11 w-48 rounded bg-white/95 px-2 py-1">
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

        <div>
          <h4 className="mb-5 font-display text-lg text-white">Explore</h4>
          <ul className="space-y-3 text-sm text-white/60">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-green-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-display text-lg text-white">Projects</h4>
          <ul className="space-y-3 text-sm text-white/60">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="transition-colors hover:text-green-400"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-display text-lg text-white">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li>{brand.addressHQ}</li>
            <li>
              <a href={`tel:${brand.phoneRaw}`} className="transition-colors hover:text-green-400">
                {brand.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`} className="transition-colors hover:text-green-400">
                {brand.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
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
