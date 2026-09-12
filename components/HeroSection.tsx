'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import Balancer from 'react-wrap-balancer'
import { ArrowRight } from 'lucide-react'

import Carousel from '@/components/Carousel'

const heroSlides = [
  {
    image: '/images/parkside/street-view.jpg',
    subcaption: 'Anvita Parkside · Ravalkole, Medchal',
    caption: '270 premium 4 BHK villas on 50 acres of green living',
  },
  {
    image: '/images/parkside/clubhouse-approach.jpg',
    subcaption: 'Resort-style clubhouse',
    caption: 'Over 75 amenities across five lifestyle zones',
  },
  {
    image: '/images/landspace/landspace-elite-building.jpg',
    subcaption: 'Landspace Elite · Medipally',
    caption: 'Deluxe 3 BHK residences with open natural ventilation',
  },
]

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const bgReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
  },
}

const strip: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
}

export default function HeroSection({ tagline }: { tagline: string }) {
  const reduce = useReducedMotion()
  const animate = !reduce

  return (
    <section className="bg-navy-900 relative min-h-[100svh] overflow-hidden text-white lg:min-h-screen">
      {/* Full-bleed image background */}
      <motion.div
        className="absolute inset-0 z-0"
        variants={animate ? bgReveal : undefined}
        initial={animate ? 'hidden' : false}
        animate="visible"
      >
        <Carousel slides={heroSlides} aspect="h-full w-full" rounded="rounded-none" />
      </motion.div>

      {/* Legibility scrims — diagonal on desktop, bottom-up on mobile */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] hidden bg-gradient-to-r from-navy-900/95 via-navy-900/60 to-navy-900/15 lg:block"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-t from-navy-900/95 via-navy-900/55 to-navy-900/15 lg:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[1] h-56 bg-gradient-to-t from-black/50 to-transparent"
      />

      {/* Signature brand glow, blended into the photo rather than floating above it */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-8%] z-[1] h-[480px] w-[480px] rounded-full opacity-40 mix-blend-screen blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, rgba(74,222,128,0.45) 0%, rgba(74,222,128,0) 70%)',
        }}
      />

      {/* Editorial inset frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 z-[2] rounded-[1.75rem] border border-white/10 sm:inset-5"
      />

      {/*
        Content is vertically CENTERED, not pinned to the bottom.
        On short/mobile viewports this still reads top-down naturally;
        on tall desktop viewports it no longer leaves a dead zone above
        an oversized headline.
      */}
      <motion.div
        className="container-page relative z-10 flex min-h-[100svh] flex-col justify-center gap-10 py-20 lg:min-h-screen lg:gap-12 lg:py-24"
        variants={animate ? container : undefined}
        initial={animate ? 'hidden' : false}
        whileInView={animate ? 'visible' : undefined}
        animate={animate ? undefined : 'visible'}
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Headline + description now stack in a single reading column.
            The previous 12-col split with items-end left the paragraph
            stranded beside an oversized headline; a single column with
            a capped headline size gives a much cleaner scan path. */}
        <div className="">
          <motion.p
            variants={animate ? item : undefined}
            className="eyebrow !text-green-300"
          >
            {tagline}
          </motion.p>

          <motion.h1
            variants={animate ? item : undefined}
            className="heading-display mt-6 max-w-5xl text-balance"
          >
            <Balancer>
              Building Hyderabad&apos;s skyline
              <br />
              with integrity, precision &amp; vision.
            </Balancer>
          </motion.h1>

          <motion.p
            variants={animate ? item : undefined}
            className="mt-6 max-w-3xl text-base leading-7 text-white/75 sm:text-lg"
          >
            <Balancer>
              A professionally managed group delivering premium residential,
              healthcare and hospitality developments across
              Hyderabad&apos;s high-growth corridors.
            </Balancer>
          </motion.p>

          <motion.div
            variants={animate ? item : undefined}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link href="/projects" className="btn-primary group">
              Explore our work
              <ArrowRight
                className="ml-2 inline-block size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <Link href="/contact" className="btn-outline">
              Start a conversation
            </Link>
          </motion.div>
        </div>

        {/* Bottom info strip spans the full width — a single quiet
            credentials bar, kept clearly separated from the CTAs above
            with its own top border and spacing */}
        <motion.div
          variants={animate ? strip : undefined}
          className="flex flex-col gap-4 border-t border-white/15 pt-6 text-xs uppercase tracking-[0.22em] text-white/60 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="text-white/85">25+ years of leadership</span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden />
            <span>Residential · Healthcare · Hospitality</span>
          </div>
          <span>Hyderabad · Telangana · India</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
