"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type PanInfo,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, MapPin, MessageCircle, X } from "lucide-react";

/* ═══════════════════════ EDIT THESE ═══════════════════════ */
const PHONE_TEL = "+918885988845"; // tel: link (keep + and country code)
const PHONE_DISPLAY = "+91 88859 88845"; // what visitors see
const WHATSAPP_NUMBER = "918885988845"; // digits only: country code + number
const EMAIL = "info@sentaraprojects.com";
const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=17.385758%2C78.5539181&travelmode=driving";
const WHATSAPP_MESSAGE = "Hi Sentara Group, I'd like to know more about your projects.";
const PANEL_TITLE = "Talk to our team";
const STATUS_TEXT = "Villas, pricing & site visits";

/** One-tap WhatsApp openers. Each chip pre-fills its own message. */
const QUICK_TOPICS = [
  { label: "Book a site visit", message: "Hi Sentara Group, I'd like to schedule a site visit." },
  { label: "Villa pricing", message: "Hi Sentara Group, could you share villa availability and pricing at Anvita Parkside?" },
  { label: "Landspace Elite", message: "Hi Sentara Group, I'd like details about Landspace Elite." },
  { label: "Kakatiya", message: "Hi Sentara Group, I'd like to know more about Kakatiya by Sentara." },
];

/** Auto-open behaviour */
const AUTO_OPEN = true; // open the card on page load and after every page navigation
const AUTO_OPEN_DELAY_FIRST = 2000; // ms after first load
const AUTO_OPEN_DELAY_NAV = 700; // ms after each client-side navigation

/** Touch behaviour (phones + tablets), modelled on iOS AssistiveTouch */
const SNAP_EDGE = 12; // px gap between the toggle and the left/right screen edge
const SNAP_TOP_OFFSET = 88; // px kept clear at the top so the toggle never covers your navbar
const IDLE_MS = 3000; // after this long untouched the toggle fades back
const IDLE_OPACITY = 0.45; // how faint it gets while idle
const POS_KEY = "sentara:contact-pos";

/*
  PALETTE (Tailwind needs literal values, so find & replace these to re-theme):
    ink / forest   #10231c  ·  #1f4a38
    brass / light  #b8935a  ·  #e8d3a4
    ivory          #fbf8f1  ·  #f3ede0
*/
/* ══════════════════════════════════════════════════════════ */

const EASE = [0.22, 1, 0.36, 1] as const;

type Side = "l" | "r";

const waLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const PHONE_HREF = `tel:${PHONE_TEL}`;

/* ───────────────────────── icons ───────────────────────── */

/** WhatsApp glyph (lucide has no brand icons). */
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/** Solid phone handset so the Call row reads clearly at small sizes. */
function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

/* ───────────────────────── hooks ───────────────────────── */

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

const buzz = () => {
  try {
    navigator.vibrate?.(10);
  } catch {
    /* unsupported */
  }
};

/* ───────────────────────── variants ───────────────────────── */

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      mass: 0.8,
      staggerChildren: 0.075,
      delayChildren: 0.08,
    },
  },
  exit: { opacity: 0, y: 18, scale: 0.95, transition: { duration: 0.22, ease: EASE } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: EASE } },
};

/* ───────────────────────── action row ───────────────────────── */

interface Ripple {
  id: number;
  x: number;
  y: number;
}

function ActionRow({
  href,
  external = false,
  title,
  subtitle,
  icon,
  iconClass,
  glowClass,
  onActivate,
  trailing,
  ariaLabel,
}: {
  href: string;
  external?: boolean;
  title: string;
  subtitle: string;
  icon: ReactNode;
  iconClass: string;
  glowClass: string;
  onActivate: () => void;
  trailing?: ReactNode;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // cursor-following spotlight (writes CSS vars directly: no re-render)
  const onMove = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const onDown = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
  };

  return (
    <motion.div variants={rowVariants} className="relative">
      <a
        ref={ref}
        href={href}
        onPointerMove={onMove}
        onPointerDown={onDown}
        onClick={() => {
          buzz();
          // let the ripple play before the card closes
          window.setTimeout(onActivate, 260);
        }}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`group relative flex items-center gap-3 overflow-hidden rounded-[18px] bg-white p-2.5 ring-1 ring-[#10231c]/[0.07] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-18px_rgba(16,35,28,.45)] hover:ring-[#b8935a]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b8935a] sm:gap-3.5 sm:rounded-[22px] sm:p-3 ${
          trailing ? "pr-[78px] sm:pr-[88px]" : "pr-3 sm:pr-4"
        }`}
      >
        {/* brass spotlight that follows the cursor */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(170px circle at var(--mx, 50%) var(--my, 50%), rgba(184,147,90,.2), transparent 70%)",
          }}
        />

        {/* ripples */}
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            aria-hidden="true"
            initial={{ scale: 0, opacity: 0.45 }}
            animate={{ scale: 16, opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            onAnimationComplete={() => setRipples((p) => p.filter((x) => x.id !== r.id))}
            className="pointer-events-none absolute h-6 w-6 rounded-full bg-[#e8d3a4]/60"
            style={{ left: r.x - 12, top: r.y - 12 }}
          />
        ))}

        <span
          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] text-white transition-transform duration-500 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] group-hover:-rotate-6 group-hover:scale-110 sm:h-12 sm:w-12 sm:rounded-2xl ${iconClass} ${glowClass}`}
        >
          <span aria-hidden="true" className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/35 to-transparent opacity-70" />
          <span className="relative">{icon}</span>
        </span>

        <span className="relative min-w-0 flex-1">
          <span className="block text-[14px] font-semibold leading-tight tracking-tight text-[#10231c] sm:text-[15px]">
            {title}
          </span>
          <span className="mt-0.5 block truncate text-[11.5px] font-medium text-[#10231c]/50 sm:mt-1 sm:text-[12.5px]">
            {subtitle}
          </span>
        </span>

        {!trailing && (
          <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#10231c]/[0.05] text-[#10231c]/50 transition-all duration-300 group-hover:bg-[#10231c] group-hover:text-[#e8d3a4] sm:h-8 sm:w-8">
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
              aria-hidden="true"
            />
          </span>
        )}
      </a>
      {trailing}
    </motion.div>
  );
}

/** Small secondary pill (Email / Directions). */
function PillLink({
  href,
  label,
  icon,
  external = false,
  onActivate,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  external?: boolean;
  onActivate: () => void;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => {
        buzz();
        window.setTimeout(onActivate, 160);
      }}
      className="group/pill flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#10231c]/10 bg-white/70 py-2 text-[11.5px] font-semibold text-[#10231c]/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b8935a]/60 hover:bg-white hover:text-[#10231c] hover:shadow-[0_10px_20px_-12px_rgba(16,35,28,.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b8935a] sm:py-2.5 sm:text-[12px]"
    >
      <span className="text-[#b8935a] transition-transform duration-300 group-hover/pill:scale-110">{icon}</span>
      {label}
    </a>
  );
}

/* ───────────────────────── main component ───────────────────────── */

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const autoRef = useRef(false);
  const autoTimer = useRef<number | null>(null);
  const firstLoad = useRef(true);
  const seenOpen = useRef(false);

  const pathname = usePathname();
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 639px)"); // bottom-sheet layout
  const canDrag = useMediaQuery("(max-width: 1023px)"); // phones + tablets get the draggable toggle

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  /* scroll-progress ring around the toggle */
  const { scrollYProgress } = useScroll();
  const ring = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  /* magnetic toggle (desktop mouse only) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const magnetX = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 });
  const magnetY = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 });
  const onMagnet = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const resetMagnet = () => {
    mx.set(0);
    my.set(0);
  };

  /* ───── phones & tablets: AssistiveTouch-style toggle ─────
     drag it anywhere, it glides to the nearest SIDE edge at the height you left it,
     and fades back when you stop touching it. */
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const sideRef = useRef<Side>("r");
  const yFracRef = useRef(0); // 0 = resting height (bottom), 1 = highest allowed point
  const draggedRef = useRef(false);
  const [side, setSide] = useState<Side>("r");
  const [bounds, setBounds] = useState({ left: 0, top: 0 });
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<number | null>(null);

  /** How far (px) the toggle can travel from its resting bottom-right spot to the left edge / top limit. */
  const measure = useCallback(() => {
    const el = rootRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const restLeft = r.left - dragX.get();
    const restTop = r.top - dragY.get();
    return {
      left: -Math.max(0, restLeft - SNAP_EDGE),
      top: -Math.max(0, restTop - SNAP_TOP_OFFSET),
    };
  }, [dragX, dragY]);

  // restore where the visitor last parked it
  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(POS_KEY) || "null");
      if (saved && (saved.s === "l" || saved.s === "r") && typeof saved.y === "number") {
        sideRef.current = saved.s;
        yFracRef.current = Math.min(1, Math.max(0, saved.y));
        setSide(saved.s);
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  // place it on mount, and keep the same side + relative height on resize / rotate
  useEffect(() => {
    if (!canDrag) {
      dragX.set(0);
      dragY.set(0);
      setSide("r");
      return;
    }
    const place = () => {
      const b = measure();
      if (!b) return;
      setBounds(b);
      dragX.set(sideRef.current === "l" ? b.left : 0);
      dragY.set(b.top * yFracRef.current);
      setSide(sideRef.current);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [canDrag, measure, dragX, dragY]);

  /* idle fade: faint when left alone, solid the moment it's touched */
  const dimEnabled = canDrag && !open;
  const wake = useCallback(() => {
    setIdle(false);
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), IDLE_MS);
  }, []);

  useEffect(() => {
    if (!dimEnabled) {
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      setIdle(false);
      return;
    }
    wake();
    return () => {
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [dimEnabled, wake]);

  const onDockDragStart = () => {
    draggedRef.current = true; // swallow the click that follows a drag
    wake();
  };

  const onDockDragEnd = (_: unknown, info: PanInfo) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const b = measure() ?? bounds;

    // side: whichever edge is nearer, nudged by the flick direction
    const cx = r.left + r.width / 2 + info.velocity.x * 0.18;
    const nextSide: Side = cx < window.innerWidth / 2 ? "l" : "r";

    // height: stay where the finger left it, with a little inertia, kept inside the allowed band
    const projY = dragY.get() + info.velocity.y * 0.12;
    const nextY = Math.min(0, Math.max(b.top, projY));

    animate(dragX, nextSide === "l" ? b.left : 0, { type: "spring", stiffness: 380, damping: 30, mass: 0.7 });
    animate(dragY, nextY, { type: "spring", stiffness: 240, damping: 28, mass: 0.8 });

    sideRef.current = nextSide;
    yFracRef.current = b.top === 0 ? 0 : nextY / b.top;
    setSide(nextSide);
    buzz();
    try {
      window.localStorage.setItem(POS_KEY, JSON.stringify({ s: nextSide, y: yFracRef.current }));
    } catch {
      /* ignore */
    }
    wake();
    window.setTimeout(() => {
      draggedRef.current = false;
    }, 80);
  };

  /* 3D tilt on the card (desktop mouse only) */
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const tiltSpring = { stiffness: 180, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(ty, [-1, 1], [4, -4]), tiltSpring);
  const rotateY = useSpring(useTransform(tx, [-1, 1], [-5, 5]), tiltSpring);
  const onTilt = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || isMobile || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    tx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    ty.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const resetTilt = () => {
    tx.set(0);
    ty.set(0);
  };

  /* open automatically on first load and after every page navigation */
  useEffect(() => {
    setOpen(false);
    if (!AUTO_OPEN) return;

    const delay = firstLoad.current ? AUTO_OPEN_DELAY_FIRST : AUTO_OPEN_DELAY_NAV;
    autoTimer.current = window.setTimeout(() => {
      firstLoad.current = false;
      autoRef.current = true; // opened by the page, not the visitor
      setOpen(true);
    }, delay);

    return () => {
      if (autoTimer.current) window.clearTimeout(autoTimer.current);
    };
  }, [pathname]);

  useEffect(() => {
    if (open) seenOpen.current = true;
  }, [open]);

  /* outside click / tap + Escape */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (rootRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        window.setTimeout(() => toggleRef.current?.focus(), 80);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    // move keyboard focus into the card, but only when the visitor opened it (never steal focus on auto-open)
    const f = window.setTimeout(() => {
      if (!autoRef.current) panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    }, 380);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(f);
    };
  }, [open]);

  const toggle = () => {
    if (draggedRef.current) return; // it was a drag, not a tap
    buzz();
    if (autoTimer.current) window.clearTimeout(autoTimer.current);
    autoRef.current = false;
    setOpen((v) => !v);
  };

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_DISPLAY);
      buzz();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const onSheetDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 90 || info.velocity.y > 600) close();
  };

  return (
    <>
      {/* ═════════ contact card (compact on phones, floating card on larger screens) ═════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            ref={panelRef}
            role="group"
            aria-label="Contact options"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onPointerMove={onTilt}
            onPointerLeave={resetTilt}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.55 }}
            dragSnapToOrigin
            onDragEnd={onSheetDragEnd}
            style={{
              rotateX: isMobile || reduced ? 0 : rotateX,
              rotateY: isMobile || reduced ? 0 : rotateY,
              transformPerspective: 1000,
              transformOrigin: side === "l" ? "bottom left" : "bottom right",
            }}
            className={`fixed w-[min(300px,calc(100vw-1.5rem))] bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-[905] overflow-hidden rounded-[24px] p-px shadow-[0_40px_90px_-28px_rgba(16,35,28,.6)] print:hidden sm:rounded-[30px] sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] ${
              side === "l" ? "left-3 sm:left-6" : "right-3 sm:right-6"
            } sm:w-[344px]`}
          >
            {/* rotating brass hairline border */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="h-[260%] w-[260%] shrink-0 bg-[conic-gradient(from_0deg,transparent_0deg,#b8935a_70deg,transparent_140deg,#e8d3a4_230deg,transparent_300deg)] opacity-90 motion-safe:animate-[spin_8s_linear_infinite]" />
            </span>

            {/* ivory glass body */}
            <div className="relative overflow-hidden rounded-[23px] bg-[linear-gradient(180deg,rgba(255,253,248,.97),rgba(243,237,224,.95))] p-2 backdrop-blur-2xl sm:rounded-[29px] sm:p-2.5">
              {/* ambient glows */}
              <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#b8935a]/25 blur-3xl" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-14 -left-12 h-40 w-40 rounded-full bg-[#1f4a38]/15 blur-3xl" />

              {/* one-time light sheen across the card as it opens */}
              {!reduced && (
                <motion.span
                  aria-hidden="true"
                  initial={{ x: "-130%", opacity: 0.9 }}
                  animate={{ x: "330%", opacity: 0 }}
                  transition={{ duration: 1.3, ease: "easeOut", delay: 0.35 }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                />
              )}

              {/* grab handle (phones) */}
              <div aria-hidden="true" className="relative mx-auto mb-0.5 mt-0 h-1 w-8 rounded-full bg-[#10231c]/15 sm:hidden" />

              {/* header */}
              <motion.div variants={rowVariants} className="relative flex items-start justify-between px-2 pb-2 pt-1.5 sm:px-2.5 sm:pb-3 sm:pt-2">
                <div>
                  <p className="flex flex-wrap text-[16px] font-semibold leading-tight tracking-tight text-[#10231c] sm:text-[18px]">
                    {PANEL_TITLE.split(" ").map((word, i, arr) => (
                      <span key={i} className="inline-block overflow-hidden align-bottom">
                        <motion.span
                          className="inline-block"
                          initial={{ y: "110%" }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.55, ease: EASE, delay: 0.14 + i * 0.07 }}
                        >
                          {word}
                          {i < arr.length - 1 ? "\u00A0" : ""}
                        </motion.span>
                      </span>
                    ))}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-[11px] font-medium text-[#10231c]/55 sm:mt-1.5 sm:text-[12px]">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    {STATUS_TEXT}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close contact options"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#10231c]/[0.05] text-[#10231c]/55 transition-all duration-300 hover:rotate-90 hover:bg-[#10231c]/10 hover:text-[#10231c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b8935a] sm:h-8 sm:w-8"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>

              <div className="relative flex flex-col gap-1.5 sm:gap-2">
                {/* WhatsApp */}
                <ActionRow
                  href={waLink(WHATSAPP_MESSAGE)}
                  external
                  title="Chat on WhatsApp"
                  subtitle="Usually a quick reply"
                  ariaLabel="Chat on WhatsApp"
                  onActivate={close}
                  icon={
                    <motion.span
                      className="flex"
                      animate={reduced ? undefined : { scale: [1, 1.12, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
                    >
                      <WhatsAppIcon className="h-[22px] w-[22px] sm:h-[26px] sm:w-[26px]" />
                    </motion.span>
                  }
                  iconClass="bg-[linear-gradient(135deg,#2be479,#12a150)]"
                  glowClass="shadow-[0_12px_24px_-8px_rgba(18,161,80,.75)]"
                />

                {/* quick topics */}
                <motion.div variants={rowVariants} className="px-1">
                  <p className="mb-1.5 px-1 text-[11px] font-semibold text-[#10231c]/45 sm:mb-2 sm:text-[11.5px]">
                    Ask about
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_TOPICS.map((t) => (
                      <a
                        key={t.label}
                        href={waLink(t.message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          buzz();
                          window.setTimeout(close, 120);
                        }}
                        className="group/chip inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#10231c]/70 ring-1 ring-[#10231c]/[0.08] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fbf3e1] hover:text-[#10231c] hover:ring-[#b8935a]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b8935a] sm:px-3 sm:py-1.5 sm:text-[12px]"
                      >
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#b8935a] transition-transform duration-300 group-hover/chip:scale-150" />
                        {t.label}
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Call */}
                <ActionRow
                  href={PHONE_HREF}
                  title="Call us now"
                  subtitle={PHONE_DISPLAY}
                  ariaLabel={`Call us now on ${PHONE_DISPLAY}`}
                  onActivate={close}
                  icon={
                    <motion.span
                      className="flex origin-center"
                      animate={reduced ? undefined : { rotate: [0, -16, 14, -10, 8, -4, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
                    >
                      <PhoneIcon className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
                    </motion.span>
                  }
                  iconClass="bg-[linear-gradient(135deg,#1f4a38,#10231c)]"
                  glowClass="shadow-[0_12px_24px_-8px_rgba(16,35,28,.8)]"
                  trailing={
                    <button
                      type="button"
                      onClick={copyNumber}
                      aria-label={copied ? "Number copied" : "Copy phone number"}
                      className={`absolute right-2.5 top-1/2 flex h-8 -translate-y-1/2 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b8935a] sm:right-3 sm:h-9 sm:px-3 sm:text-[11.5px] ${
                        copied
                          ? "bg-emerald-500 text-white"
                          : "bg-[#10231c]/[0.05] text-[#10231c]/60 hover:bg-[#10231c] hover:text-[#e8d3a4]"
                      }`}
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
                    </button>
                  }
                />

                {/* secondary: email + directions */}
                <motion.div variants={rowVariants} className="flex gap-1.5 pt-0.5 sm:gap-2">
                  <PillLink href={`mailto:${EMAIL}`} label="Email us" icon={<Mail className="h-3.5 w-3.5" />} onActivate={close} />
                  <PillLink
                    href={MAPS_URL}
                    external
                    label="Directions"
                    icon={<MapPin className="h-3.5 w-3.5" />}
                    onActivate={close}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═════════ dock: the toggle (AssistiveTouch-style on phones and tablets) ═════════ */}
      <motion.div
        ref={rootRef}
        drag={canDrag && !open}
        dragMomentum={false}
        dragElastic={0.08}
        dragConstraints={{ left: bounds.left, right: 0, top: bounds.top, bottom: 0 }}
        onDragStart={onDockDragStart}
        onDragEnd={onDockDragEnd}
        whileDrag={{ scale: 1.12 }}
        animate={{ opacity: dimEnabled && idle ? IDLE_OPACITY : 1 }}
        transition={{ opacity: { duration: 0.45, ease: "easeOut" } }}
        onPointerDown={wake}
        onFocus={wake}
        style={{
          x: dragX,
          y: dragY,
          bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
        }}
        className={`fixed right-4 z-[900] print:hidden sm:right-6 ${open ? "pointer-events-none" : ""}`}
      >
        {/* static hit-zone so the magnetic pull never fights its own measurement */}
        <div onPointerMove={onMagnet} onPointerLeave={resetMagnet} className="-m-3 p-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
            animate={open ? { opacity: 0, scale: 0.3, rotate: 40 } : { opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: open ? 24 : 16,
              delay: open || seenOpen.current ? 0 : 1.2,
            }}
            aria-hidden={open}
            style={{ x: magnetX, y: magnetY }}
            className="relative h-[64px] w-[64px]"
          >
            {/* breathing brass aura while idle */}
            {!open && !reduced && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[#b8935a]/45"
                animate={{ scale: [1, 1.5, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {/* deep-forest disc + scroll-progress ring */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[#10231c] shadow-[0_20px_44px_-12px_rgba(16,35,28,.85)] ring-1 ring-[#e8d3a4]/20"
            />
            <svg aria-hidden="true" viewBox="0 0 64 64" className="absolute inset-0 -rotate-90">
              <defs>
                <linearGradient id="sg-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e8d3a4" />
                  <stop offset="55%" stopColor="#b8935a" />
                  <stop offset="100%" stopColor="#e8d3a4" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="29.5" fill="none" stroke="rgba(232,211,164,.18)" strokeWidth="2.5" />
              <motion.circle
                cx="32"
                cy="32"
                r="29.5"
                fill="none"
                stroke="url(#sg-ring)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength: ring }}
              />
            </svg>

            <motion.button
              ref={toggleRef}
              type="button"
              onClick={toggle}
              aria-label="Open contact options"
              aria-expanded={open}
              tabIndex={open ? -1 : 0}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="absolute inset-[6px] flex items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#2a5a45,#10231c)] text-[#f3e6c4] ring-1 ring-[#e8d3a4]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8d3a4]"
            >
              {/* glossy highlight */}
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
              <span className="relative flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </span>
            </motion.button>

            {/* online badge */}
            <span
              aria-hidden="true"
              className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-[#10231c]"
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}