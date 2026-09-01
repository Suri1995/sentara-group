# Sentara Group — Corporate & Projects Website

A premium, professional Next.js 14 (App Router) + Tailwind CSS website for
**Sentara Group**, built from the company's executive profile, project
brochures and brand assets.

## Tech Stack

- **Next.js 14** (App Router, React Server Components)
- **TypeScript**
- **Tailwind CSS** — color palette derived directly from the Sentara logo
  (navy `#0b2452` + green `#0f7a3c`)
- Google Fonts: Playfair Display (headings) + Inter (body), loaded via
  `next/font`
- Zero external UI libraries — all carousels, lightboxes, animated counters
  and reveal-on-scroll effects are hand-built, dependency-free client
  components

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

To build for production:

```bash
npm run build
npm start
```

## Project Structure

```
app/
  layout.tsx              Root layout — fonts, Navbar, Footer, metadata
  globals.css             Design tokens + reusable component classes
  page.tsx                Home page
  about/page.tsx           Chairman executive profile
  projects/
    page.tsx               Filterable projects grid
    ProjectsGrid.tsx        Client component (All / Ongoing / Completed)
    parkside-villas/page.tsx
    landspace-elite/page.tsx
    arunjyothi-hospitals/page.tsx
  future-ventures/page.tsx
  contact/page.tsx
  not-found.tsx

components/
  Navbar.tsx               Sticky nav, scroll-aware, mobile menu
  Footer.tsx
  Carousel.tsx             Autoplay/swipe hero carousel
  GalleryLightbox.tsx      Image grid + keyboard-navigable lightbox
  StatCounter.tsx          Animated count-up on scroll into view
  Reveal.tsx               Fade/slide-up on scroll into view
  SectionHeading.tsx
  ProjectCard.tsx
  ContactForm.tsx          Client-side form (wire up to your API/CRM)

lib/
  data.ts                  ALL site content lives here — edit this file
                           to update copy, stats, specs, project details, etc.

public/images/
  brand/                   Sentara logo
  team/                    Chairman photo
  parkside/                Anvita Parkside renders & amenity photos
  landspace/                Landspace Elite building photo
  arunjyothi/               Arunjyothi Hospitals photo
```

## Editing Content

Almost everything text-based (stats, chairman bio, project specs,
amenities, future ventures, nav links, contact info) is centralized in
**`lib/data.ts`**. You generally won't need to touch page files just to
update copy or numbers.

## Wiring Up the Contact Form

`components/ContactForm.tsx` currently simulates a submission. To make it
functional, replace the `handleSubmit` body with a call to a Next.js API
route (`app/api/contact/route.ts`), a service like Resend/SendGrid, or your
CRM's REST API.

## Images

All imagery was sourced from the brand's own brochures/photos and has been
resized/compressed for the web. Replace any file in `public/images/` with
higher-resolution originals as they become available — filenames are
referenced directly in `lib/data.ts`.

## Notes

- All RERA numbers, disclaimers and "artistic impression" notices from the
  source brochures are preserved in the Footer and project pages — please
  keep these visible per RERA compliance requirements.
- The palette, spacing and type scale are defined in `tailwind.config.ts`
  and `app/globals.css` — adjust tokens there to restyle the entire site
  consistently.
