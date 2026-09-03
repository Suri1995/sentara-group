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

// Choreography, borrowed from the hero-10 pattern: a soft blur+rise stagger
// for text, and a slightly slower settle for the visual side.
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

const badge: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
}

const media: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
}

export default function HeroSection({ tagline }: { tagline: string }) {
  const reduce = useReducedMotion()
  const animate = !reduce

  return (
    <section className="bg-navy relative min-h-[min(820px,100vh)] pt-20 text-white">
      {/* Layered premium backdrop: grid texture + soft radial glow */}
      <div className="editorial-grid absolute inset-0 opacity-20" />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(74,222,128,0.35) 0%, rgba(74,222,128,0) 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/30 to-transparent"
        aria-hidden
      />

      <motion.div
        className="container-page relative z-10 grid min-h-[min(740px,calc(100vh-80px))] items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20"
        variants={animate ? container : undefined}
        initial={animate ? 'hidden' : false}
        whileInView={animate ? 'visible' : undefined}
        animate={animate ? undefined : 'visible'}
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="relative max-w-xl">
          <motion.p
            variants={animate ? item : undefined}
            className="eyebrow !text-green-300"
          >
            {tagline}
          </motion.p>

          <motion.h1
            variants={animate ? item : undefined}
            className="mt-6 font-display text-5xl leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-8xl"
          >
            <Balancer>
              Building Hyderabad&apos;s skyline with integrity, precision
              &amp; vision.
            </Balancer>
          </motion.h1>

          <motion.p
            variants={animate ? item : undefined}
            className="mt-7 max-w-lg text-base leading-7 text-white/70 sm:text-lg"
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

          <motion.div
            variants={animate ? item : undefined}
            className="mt-14 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/45"
          >
            Hyderabad · Telangana · India
          </motion.div>
        </div>

        <div className="relative lg:-mr-24">
          <motion.div
            variants={animate ? badge : undefined}
            className="border-white/20 bg-navy/70 text-green-200 absolute -top-4 -left-4 z-10 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.24em] backdrop-blur"
          >
            25+ years of leadership
          </motion.div>

          <motion.div variants={animate ? media : undefined}>
            <Carousel
              slides={heroSlides}
              aspect="aspect-[4/5] sm:aspect-[16/10]"
              rounded="rounded-[2rem]"
            />
          </motion.div>

          {/* Fine gold-free accent frame for a premium, editorial finish */}
          <div
            className="border-white/10 pointer-events-none absolute -inset-3 -z-10 rounded-[2.5rem] border"
            aria-hidden
          />
        </div>
      </motion.div>
    </section>
  )
}