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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full px-4 pt-4 sm:px-6 sm:pt-6">
      {/* Floating rounded pill bar. bg-white/65 alone just renders as a
          flat, undefined white smear against the page — backdrop-blur
          is what actually makes it read as glass, and a hairline ring
          gives the pill a visible edge instead of bleeding into the
          background behind it. */}
      <div
        className={`container-page relative flex h-[4.5rem] items-center justify-between rounded-full bg-sand-50/90 px-5 ring-1 ring-navy-800/[0.08] backdrop-blur-xl transition-all duration-500 sm:px-6 lg:h-[5rem] lg:px-8 ${
          scrolled
            ? "shadow-[0_24px_48px_-20px_rgba(11,36,82,0.35)]"
            : "shadow-[0_16px_36px_-20px_rgba(11,36,82,0.2)]"
        }`}
      >
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-11 w-44 transition-transform duration-500 ease-out group-hover:scale-[1.02] sm:h-12 sm:w-52 lg:h-14 lg:w-60">
            <Image
              src="/images/brand/sentara-logo.png"
              alt={brand.name}
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* desktop nav — text recolored to navy since the pill is now
            light; active link keeps the underline treatment */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 pb-1 text-[15px] font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:ring-offset-2 ${
                  active
                    ? "border-green-500 text-navy"
                    : "border-transparent text-navy-800/65 hover:border-navy-800/20 hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* desktop CTA — solid navy so it stays legible against the
            light pill instead of a translucent white-on-white fill */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-navy px-6 py-3 text-[13px] font-semibold tracking-wide text-white shadow-[0_14px_28px_-14px_rgba(11,36,82,0.65)] transition-all duration-300 hover:-translate-y-px hover:bg-navy-700 hover:shadow-[0_18px_34px_-14px_rgba(11,36,82,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60 focus-visible:ring-offset-2"
          >
            Enquire Now
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              fill="none"
              className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
            >
              <path
                d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* mobile toggle — bars recolored to navy to match the light pill */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full transition-all duration-300 hover:bg-navy-800/5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60 lg:hidden"
        >
          <span
            className={`block h-[2px] w-5 rounded-full bg-navy transition-all duration-300 motion-reduce:transition-none ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-5 rounded-full bg-navy transition-all duration-300 motion-reduce:transition-none ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[2px] w-5 rounded-full bg-navy transition-all duration-300 motion-reduce:transition-none ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* mobile scrim */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 top-[5.5rem] z-40 bg-navy-900/30 backdrop-blur-[3px] transition-opacity duration-500 motion-reduce:transition-none lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* mobile panel — matches the light, blurred pill above it instead
          of the previous solid navy fill */}
      <div
        className={`container-page fixed inset-x-0 top-[5.25rem] z-40 origin-top overflow-hidden px-3 transition-all duration-500 ease-out motion-reduce:transition-none sm:px-4 lg:hidden ${
          open
            ? "max-h-[30rem] translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 rounded-3xl bg-white/85 p-3 ring-1 ring-navy-800/[0.06] backdrop-blur-xl shadow-[0_28px_56px_-24px_rgba(11,36,82,0.35)]">
          {navLinks.map((link, i) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                }}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-all duration-300 motion-reduce:transition-none ${
                  open
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-2 opacity-0"
                } ${
                  active
                    ? "bg-navy-800/5 text-navy"
                    : "text-navy-800/70 hover:bg-navy-800/5 hover:text-navy"
                }`}
              >
                {link.label}
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[13px] font-semibold tracking-wide text-white shadow-[0_14px_28px_-14px_rgba(11,36,82,0.65)] transition-colors duration-300 hover:bg-navy-700"
          >
            Enquire Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
