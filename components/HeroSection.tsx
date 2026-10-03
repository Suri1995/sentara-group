'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  AnimatePresence,
  animate as animateValue,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react'
import Balancer from 'react-wrap-balancer'
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const AUTOPLAY_MS = 6500

/* The caption / subcaption are no longer shown on the slides; they are kept
   as the image alt text and as a screen-reader announcement. */
const heroSlides = [
  {
    image: '/images/parkside/street-view.jpeg',
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

const headlineWords: { w: string; hl?: boolean }[] = [
  { w: 'Building' },
  { w: 'Hyderabad’s' },
  { w: 'skyline' },
  { w: 'with' },
  { w: 'integrity,', hl: true },
  { w: 'precision', hl: true },
  { w: '&', hl: true },
  { w: 'vision.', hl: true },
]

const floatingStats = [
  { to: 270, suffix: '', label: 'Premium villas' },
  { to: 50, suffix: '', label: 'Acres of green living' },
  { to: 75, suffix: '+', label: 'Lifestyle amenities' },
]

/* Each category in the credentials strip links to its flagship project */
const categoryLinks = [
  { label: 'Hospitality', href: '/projects/parkside-villas' },
  { label: 'Residential', href: '/projects/landspace-elite' },
  { label: 'Healthcare', href: '/projects/arunjyothi-hospitals' },
]

/* ----------------------------- Variants ----------------------------- */

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
}

const headline: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const word: Variants = {
  hidden: { y: '115%', rotate: 5, opacity: 0 },
  visible: {
    y: '0%',
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: EASE },
  },
}

const stage: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE } },
}

/* The carousel unveils upward, like a curtain lifting */
const frameIn: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0% round 1.75rem)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0% round 1.75rem)',
    transition: { duration: 1.3, ease: EASE, delay: 0.35 },
  },
}

const plateIn: Variants = {
  hidden: { opacity: 0, rotate: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    rotate: 4,
    scale: 1,
    transition: { duration: 1.2, ease: EASE, delay: 0.2 },
  },
}

const strip: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.7 },
  },
}

/* Slide change: the incoming photo wipes over the outgoing one, which drifts away */
const slideVariants: Variants = {
  enter: (d: number) => ({
    clipPath: d > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)',
    zIndex: 2,
  }),
  center: {
    clipPath: 'inset(0% 0% 0% 0%)',
    zIndex: 2,
    transition: { duration: 1.1, ease: EASE },
  },
  exit: (d: number) => ({
    x: d > 0 ? '-10%' : '10%',
    scale: 1.06,
    opacity: 0.35,
    zIndex: 1,
    transition: { duration: 1.1, ease: EASE },
  }),
}

/* ---------------------------- Helpers ------------------------------- */

/** Counts up from 0 once it scrolls into view. */
function CountUp({
  to,
  suffix = '',
  reduce,
}: {
  to: number
  suffix?: string
  reduce: boolean
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = React.useState(reduce ? to : 0)

  React.useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    const controls = animateValue(0, to, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, reduce])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

/** Button wrapper that is gently pulled toward the cursor. */
function Magnetic({
  children,
  strength = 0.3,
  disabled = false,
}: {
  children: React.ReactNode
  strength?: number
  disabled?: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={disabled ? undefined : { x: sx, y: sy }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}

const carouselCss = `
.hc-fill{transform-origin:left;animation:hc-fill ${AUTOPLAY_MS}ms linear forwards}
@keyframes hc-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes hc-gloss{0%,68%{transform:translateX(-140%) skewX(-12deg)}100%{transform:translateX(560%) skewX(-12deg)}}
.hc-gloss{animation:hc-gloss 9s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){
  .hc-fill{animation:none;transform:scaleX(1)}
  .hc-gloss{animation:none;display:none}
}
`

/**
 * Portrait photo carousel built for this hero (replaces the shared Carousel
 * so the caption card is gone). Photos wipe in with a slow settle, a story-style
 * progress bar marks autoplay, and it responds to swipe, arrow keys and hover.
 */
function HeroCarousel({
  slides,
  canAnimate,
}: {
  slides: typeof heroSlides
  canAnimate: boolean
}) {
  const count = slides.length
  const [[index, dir], setPage] = React.useState<[number, number]>([0, 1])
  const [paused, setPaused] = React.useState(false)
  const startX = React.useRef<number | null>(null)

  const paginate = React.useCallback(
    (d: number) => setPage(([i]) => [(i + d + count) % count, d]),
    [count]
  )
  const goTo = (i: number) => setPage(([cur]) => [i, i > cur ? 1 : -1])

  const onDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
  }
  const onUp = (e: React.PointerEvent) => {
    if (startX.current === null) return
    const delta = e.clientX - startX.current
    if (Math.abs(delta) > 50) paginate(delta > 0 ? -1 : 1)
    startX.current = null
  }

  const slide = slides[index]

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured developments"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') paginate(-1)
        if (e.key === 'ArrowRight') paginate(1)
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={() => (startX.current = null)}
      className="relative h-full w-full touch-pan-y select-none overflow-hidden bg-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300/70"
    >
      <style dangerouslySetInnerHTML={{ __html: carouselCss }} />

      {/* Photos */}
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          variants={canAnimate ? slideVariants : undefined}
          initial={canAnimate ? 'enter' : false}
          animate="center"
          exit={canAnimate ? 'exit' : undefined}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            initial={canAnimate ? { scale: 1.16 } : false}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'easeOut' }}
          >
            <Image
              src={slide.image}
              alt={`${slide.subcaption} — ${slide.caption}`}
              fill
              priority={index === 0}
              draggable={false}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Light edge gradients so controls stay legible on any photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-navy-950/45 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-navy-950/50 to-transparent"
      />

      {/* Slow gloss that passes across the glass every few seconds */}
      <span
        aria-hidden
        className="hc-gloss pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 bg-white/10 blur-md"
      />

      {/* Story-style progress bars: done, running, upcoming */}
      <div className="absolute inset-x-5 bottom-1 z-20 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.image}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show slide ${i + 1}: ${s.subcaption}`}
            aria-current={i === index}
            className="group relative h-5 flex-1 focus-visible:outline-none"
          >
            <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/30 transition-all duration-300 group-hover:h-[5px]">
              {i < index && <span className="absolute inset-0 bg-white" />}
              {i === index && (
                <span
                  key={`${index}-${canAnimate}`}
                  className="hc-fill absolute inset-0 bg-white"
                  style={{ animationPlayState: paused ? 'paused' : 'running' }}
                  onAnimationEnd={canAnimate ? () => paginate(1) : undefined}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Screen-reader announcement (the visible caption card was removed) */}
      <p className="sr-only" aria-live="polite">
        {slide.subcaption}. {slide.caption}
      </p>
    </div>
  )
}

/* ------------------------------ Hero -------------------------------- */

export default function HeroSection({ tagline }: { tagline: string }) {
  const reduce = !!useReducedMotion()
  const canAnimate = !reduce

  const sectionRef = React.useRef<HTMLElement>(null)

  /* Scroll: text eases up, the carousel drifts the other way for depth */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const frameY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const stageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  /* Carousel frame: 3D tilt + cursor highlight */
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), {
    stiffness: 120,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), {
    stiffness: 120,
    damping: 18,
  })
  const spotX = useMotionValue(0)
  const spotY = useMotionValue(0)
  const glow = useSpring(0, { stiffness: 120, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${spotX}px ${spotY}px, rgba(255,255,255,0.14), transparent 60%)`

  const onFrameMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canAnimate || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    px.set(x / r.width)
    py.set(y / r.height)
    spotX.set(x)
    spotY.set(y)
  }
  const onFrameEnter = () => glow.set(1)
  const onFrameLeave = () => {
    px.set(0.5)
    py.set(0.5)
    glow.set(0)
  }

  /* Soft green light that follows the cursor across the whole outer frame */
  const onStageMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canAnimate || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--ox', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--oy', `${e.clientY - r.top}px`)
  }

  const v = (variants: Variants) => (canAnimate ? variants : undefined)

  return (
    <section
      ref={sectionRef}
      className="bg-navy-900 relative flex min-h-[100svh] items-center overflow-hidden py-24 text-white sm:py-28 lg:min-h-screen"
    >
      {/* Ambient light fields behind everything */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 size-[36rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(74,222,128,0.2), transparent 65%)',
          filter: 'blur(80px)',
        }}
        animate={canAnimate ? { x: [0, 60, 0], y: [0, 40, 0] } : undefined}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -right-40 size-[40rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(74,222,128,0.14), transparent 65%)',
          filter: 'blur(90px)',
        }}
        animate={canAnimate ? { x: [0, -50, 0], y: [0, -40, 0] } : undefined}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-page relative w-full">
        {/* ================= Outer frame ================= */}
        <motion.div
          variants={v(stage)}
          initial={canAnimate ? 'hidden' : false}
          animate="visible"
          onPointerMove={onStageMove}
          className="group/stage relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.01] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.6)] backdrop-blur-sm"
        >
          {/* blueprint grid, faded toward the edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
              WebkitMaskImage:
                'radial-gradient(ellipse 80% 70% at 70% 40%, #000 25%, transparent 80%)',
              maskImage:
                'radial-gradient(ellipse 80% 70% at 70% 40%, #000 25%, transparent 80%)',
            }}
          />
          {/* cursor-following green light */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/stage:opacity-100"
            style={{
              background:
                'radial-gradient(520px circle at var(--ox, 50%) var(--oy, 50%), rgba(74,222,128,0.10), transparent 60%)',
            }}
          />
          {/* slow rotating dashed ring, partly clipped by the frame */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-28 -top-28 size-[28rem] rounded-full border border-dashed border-green-300/25"
            animate={canAnimate ? { rotate: 360 } : undefined}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
          {/* top highlight line */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />

          <motion.div
            variants={v(container)}
            initial={canAnimate ? 'hidden' : false}
            animate="visible"
            className="relative p-6 sm:p-10 lg:p-14"
          >
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              {/* ================= LEFT — text area ================= */}
              <motion.div style={canAnimate ? { y: textY, opacity: stageOpacity } : undefined}>
                <motion.p
                  variants={v(item)}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-green-300"
                >
                  <span className="relative flex size-2">
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-ping rounded-full bg-green-300/70 motion-reduce:hidden"
                    />
                    <span className="relative size-2 rounded-full bg-green-300" />
                  </span>
                  {tagline}
                </motion.p>

                <motion.h1
                  variants={v(headline)}
                  aria-label="Building Hyderabad’s skyline with integrity, precision & vision."
                  className="mt-6 font-display leading-[1.1] tracking-tight text-balance"
                  style={{ fontSize: 'clamp(2rem, 1.2rem + 2.6vw, 3.7rem)' }}
                >
                  {headlineWords.map(({ w, hl }, i) => (
                    <span
                      key={`${w}-${i}`}
                      aria-hidden
                      className="mr-[0.26em] -mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
                    >
                      <motion.span variants={v(word)} className="inline-block origin-bottom-left">
                        {hl ? (
                          <motion.span
                            className="inline-block bg-gradient-to-r from-green-300 via-white to-green-300 bg-clip-text text-transparent"
                            style={{ backgroundSize: '200% 100%' }}
                            animate={
                              canAnimate
                                ? { backgroundPosition: ['0% 50%', '200% 50%'] }
                                : undefined
                            }
                            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                          >
                            {w}
                          </motion.span>
                        ) : (
                          w
                        )}
                      </motion.span>
                    </span>
                  ))}
                </motion.h1>

                <motion.p
                  variants={v(item)}
                  className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg"
                >
                  <Balancer>
                    A professionally managed group delivering premium residential,
                    healthcare and hospitality developments across
                    Hyderabad&apos;s high-growth corridors.
                  </Balancer>
                </motion.p>

                <motion.div
                  variants={v(item)}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <Magnetic disabled={!canAnimate}>
                    <Link href="/projects" className="btn-primary group relative overflow-hidden">
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/30 blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[620%] motion-reduce:hidden"
                      />
                      <span className="relative inline-flex items-center">
                        Explore our work
                        <ArrowRight
                          className="ml-2 inline-block size-4 transition-transform duration-300 group-hover:translate-x-1.5"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </Magnetic>

                  <Magnetic disabled={!canAnimate}>
                    <Link href="/contact" className="btn-outline group">
                      <span className="inline-flex items-center">
                        Start a conversation
                        <ArrowRight
                          className="ml-0 size-4 w-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </Magnetic>
                </motion.div>

                {/* Stats — now shown at every size, under the buttons */}
                <motion.div
                  variants={v(item)}
                  className="mt-9 grid max-w-xl grid-cols-3 gap-3"
                >
                  {floatingStats.map((s) => (
                    <motion.div
                      key={s.label}
                      whileHover={canAnimate ? { y: -4 } : undefined}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] px-3 py-4 text-center backdrop-blur-md transition-colors duration-300 hover:border-green-300/50 hover:bg-white/[0.1]"
                    >
                      <span
                        className="block font-display text-2xl leading-none text-green-300 tabular-nums sm:text-3xl"
                        aria-label={`${s.to}${s.suffix}`}
                      >
                        <CountUp to={s.to} suffix={s.suffix} reduce={reduce} />
                      </span>
                      <span className="mt-2 block text-[11px] leading-4 text-white/75">
                        {s.label}
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-green-300 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* ================= RIGHT — portrait image carousel ================= */}
              <motion.div style={canAnimate ? { y: frameY } : undefined} className="relative">
                <motion.div
                  onPointerMove={onFrameMove}
                  onPointerEnter={onFrameEnter}
                  onPointerLeave={onFrameLeave}
                  style={
                    canAnimate
                      ? { rotateX, rotateY, transformPerspective: 1200 }
                      : undefined
                  }
                  className="relative mx-auto aspect-[4/5] w-full max-w-md will-change-transform lg:ml-auto lg:aspect-auto lg:h-[min(72vh,640px)] lg:max-w-none"
                >
                  {/* tilted back plate for depth */}
                  <motion.span
                    aria-hidden
                    variants={v(plateIn)}
                    className="absolute inset-0 rounded-[1.75rem] border border-green-300/30 bg-green-300/[0.06]"
                    style={{ rotate: canAnimate ? undefined : 4 }}
                  />
                  {/* offset outline */}
                  <span
                    aria-hidden
                    className="absolute -inset-3 rounded-[2.1rem] border border-white/15"
                  />

                  {/* the carousel itself, unveiled upward */}
                  <motion.div
                    variants={v(frameIn)}
                    className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/25 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)]"
                  >
                    <HeroCarousel slides={heroSlides} canAnimate={canAnimate} />
                    {canAnimate && (
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-30"
                        style={{ background: spotlight, opacity: glow }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* ================= Credentials strip ================= */}
            <motion.div
              variants={v(strip)}
              className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.22em] text-white/70 sm:flex-row sm:items-center sm:justify-between lg:mt-14"
            >
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="flex items-center gap-2 text-white">
                  <span className="font-display text-lg tracking-normal text-green-300 tabular-nums">
                    <CountUp to={25} suffix="+" reduce={reduce} />
                  </span>
                  years of leadership
                </span>
                <span className="hidden h-3 w-px bg-white/25 sm:block" aria-hidden />

                {/* Category links — each goes to its flagship project */}
                <nav
                  aria-label="Project categories"
                  className="flex flex-wrap items-center gap-x-3 gap-y-1"
                >
                  {categoryLinks.map((c, i) => (
                    <React.Fragment key={c.href}>
                      {i > 0 && (
                        <span aria-hidden className="text-white/40">
                          ·
                        </span>
                      )}
                      <Link
                        href={c.href}
                        className="group/cat relative inline-block py-1 transition-colors duration-300 hover:text-green-300 focus-visible:text-green-300 focus-visible:outline-none"
                      >
                        {c.label}
                        <span
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-green-300 transition-transform duration-300 ease-out group-hover/cat:scale-x-100 group-focus-visible/cat:scale-x-100"
                        />
                      </Link>
                    </React.Fragment>
                  ))}
                </nav>
              </div>
              <span className="flex items-center gap-2">
                <MapPin className="size-3.5 text-green-300" aria-hidden />
                Hyderabad · Telangana · India
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}