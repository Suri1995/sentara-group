"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, brand } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <div className={`mx-auto max-w-7xl rounded-full border px-4 transition-all duration-500 sm:px-6 ${scrolled || open ? "border-navy-100 bg-white/95 shadow-[0_20px_60px_-25px_rgba(11,36,82,0.45)] backdrop-blur-xl" : "border-white/15 bg-navy-950/55 backdrop-blur-md"}`}>
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-9 w-36 sm:h-10 sm:w-44">
            <Image
              src="/images/brand/sentara-logo.png"
              alt={brand.name}
              fill
              priority
              className={`object-contain object-left ${scrolled || open ? "" : "brightness-0 invert"}`}
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold uppercase tracking-widest transition-colors ${
                  scrolled || open ? "text-navy-800" : "text-white"
                } ${active ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-green-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className={`rounded-full px-6 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
              scrolled
                ? "bg-navy text-white hover:bg-navy-700"
                : "bg-white text-navy hover:bg-green hover:text-white"
            }`}
          >
            Enquire Now
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-0.5 w-6 rounded transition-all duration-300 ${
              "bg-navy"
            } ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 rounded transition-all duration-300 ${
              "bg-navy"
            } ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 rounded transition-all duration-300 ${
              "bg-navy"
            } ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>
      </div>

      <div
        className={`mx-auto max-w-7xl overflow-hidden rounded-b-[2rem] bg-white shadow-xl transition-all duration-500 lg:hidden ${
          open ? "max-h-96 border-x border-b border-navy-100" : "max-h-0"
        }}`}
      >
        <nav className="container-page flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-widest text-navy-800 hover:bg-sand-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 rounded-full bg-green px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider text-white"
          >
            Enquire Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
