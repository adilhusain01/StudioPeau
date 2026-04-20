# Studio Peau — Lip Blushing in Delhi

Premium Korean-inspired landing page for a lip blushing studio in Delhi.

---

## Tech Stack

| Layer            | Technology                                      |
| ---------------- | ----------------------------------------------- |
| Framework        | Next.js 14 (App Router)                         |
| Styling          | Tailwind CSS + CSS Variables                    |
| UI Components    | shadcn/ui + Radix UI                            |
| State            | Zustand                                         |
| Forms            | React Hook Form + Zod                           |
| Smooth Scroll    | Lenis (@studio-freight/lenis)                   |
| Scroll Effects   | GSAP + ScrollTrigger                            |
| Motion           | Framer Motion                                   |
| Backend          | Next.js App Router API Route                    |
| Database         | None (static landing / serverless lead capture) |
| Validation       | Zod (shared schema)                             |
| Containerisation | Docker + Docker Compose                         |

---

## Quick Start

### Option A — Local (without Docker)

```bash
# 1. Clone and enter the repo
git clone <your-repo-url> lip-blushing-delhi
cd lip-blushing-delhi

# 2. Frontend setup
cd frontend
cp .env.local.example .env.local   # Edit values
npm install
npm run dev                        # Starts on http://localhost:3000
```

### Option B — Docker Compose

```bash
cp .env.example .env   # Set WHATSAPP_NUMBER as needed
docker compose up --build
```

Frontend: http://localhost:3000

---

## Environment Variables

### `frontend/.env.local`

| Variable                      | Description                           | Example        |
| ----------------------------- | ------------------------------------- | -------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number without `+` or spaces | `919999999999` |

---

## Project Structure

```
lip-blushing-delhi/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx              ← Root layout: Lenis + JSON-LD + fonts
│   │   ├── page.tsx                ← Main page assembling all sections
│   │   ├── globals.css             ← Design tokens + base styles
│   │   └── api/lead/route.ts       ← Next.js API fallback route
│   ├── components/
│   │   ├── providers/
│   │   │   └── LenisProvider.tsx   ← Lenis smooth scroll + RAF loop
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx     ← Parallax + Framer Motion
│   │   │   ├── BeforeAfterSection  ← Custom drag comparison slider
│   │   │   ├── BenefitsSection     ← Staggered scroll reveal grid
│   │   │   ├── ProcedureSection    ← GSAP ScrollTrigger horizontal scroll
│   │   │   ├── PricingSection      ← Microinteraction pricing cards
│   │   │   ├── TestimonialsSection ← Dual-row infinite marquee
│   │   │   └── LeadFormSection     ← RHF + Zod inline form
│   │   ├── ui/                     ← shadcn/ui: dialog, button, card, input...
│   │   ├── CustomCursor.tsx        ← Framer Motion magnetic cursor
│   │   ├── StickyNav.tsx           ← WhatsApp + Book Now sticky bar
│   │   └── BookingModal.tsx        ← shadcn Dialog + RHF booking form
│   ├── hooks/
│   │   └── useScrollAnimation.ts  ← useMagnetic, useScrollReveal, useLenisScrollTo
│   ├── lib/
│   │   ├── schema.ts              ← Shared Zod validation schema
│   │   ├── store.ts               ← Zustand global UI store
│   │   └── utils.ts               ← cn(), formatCurrency(), slugify()
│   └── public/
│       └── images/                ← See Image Guide below
```

---

## Image Guide

Place the following WebP images in `frontend/public/images/`:

| Filename      | Dimensions | Usage                    | Priority             |
| ------------- | ---------- | ------------------------ | -------------------- |
| `hero-bg.jpg` | 1920×1080  | Hero section background  | LCP — use `priority` |
| `before.jpg`  | 1200×800   | Before/After left panel  | —                    |
| `after.jpg`   | 1200×800   | Before/After right panel | —                    |

**Recommended sources:**

- Licensed stock: Shutterstock, Getty, Adobe Stock
- Search: "lip blushing before after", "semi permanent lips close up"
- Always secure model release rights for medical/cosmetic procedures

**Optimisation checklist:**

- Export as WebP at 85% quality
- Use `next/image` with `fill` + `sizes` (already configured)
- Hero image: compress to under 250 KB for Core Web Vitals LCP

---

## SEO Configuration

The following is pre-configured and production-ready:

**Metadata (layout.tsx)**

- Title: `Lip Blushing in Delhi | Semi-Permanent Lip Color by Studio Peau`
- Description optimised for the keyword `lip blushing in delhi`
- OpenGraph, Twitter Card, canonical URL
- robots: `index: true, follow: true`

**JSON-LD Schema (layout.tsx)**

- Type: `LocalBusiness`
- Includes: name, address, coordinates, phone, hours, services, aggregate rating

**Update before launch:**

- Replace placeholder coordinates with real Delhi GPS coordinates
- Update phone, address, email
- Replace `studiopeau.in` with real domain
- Add real `aggregateRating.reviewCount`

---

## API Reference

### `POST /api/lead`

Handles lead submissions from the landing page. The route validates form input and returns a JSON success response.

**Request body:**

```json
{
  "name": "Priya Mehta",
  "phone": "9811234567",
  "package": "Bloom"
}
```

**Response 201:**

```json
{
  "success": true,
  "message": "Your enquiry has been received. We will contact you shortly.",
  "leadId": "clxyz123..."
}
```

**Response 400 (validation failure):**

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": { "phone": ["Must be a valid 10-digit Indian mobile number."] }
}
```

---

## Performance Targets

| Metric     | Target   | Implementation                             |
| ---------- | -------- | ------------------------------------------ |
| LCP        | < 2.5s   | `priority` on hero image, WebP, next/image |
| FID / INP  | < 100ms  | No blocking scripts, Lenis passive scroll  |
| CLS        | < 0.1    | Fixed dimensions on all images             |
| TTFB       | < 800ms  | Static generation + CDN                    |
| Lighthouse | > 90 all | Metadata, semantics, alt text              |

---

## Production Deployment

### Vercel (Frontend)

```bash
cd frontend
vercel --prod

# Set environment variables in Vercel dashboard:
# NEXT_PUBLIC_WHATSAPP_NUMBER
```

---

## License

Private — all rights reserved. Studio Peau.
