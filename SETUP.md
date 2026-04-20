# Lip Blushing Delhi — Premium Landing Page

## Project Structure

```
lip-blushing-delhi/
├── frontend/                          # Next.js 14 App Router
│   ├── app/
│   │   ├── layout.tsx                 # Root layout: Lenis, metadata, JSON-LD
│   │   ├── page.tsx                   # Main page — all sections assembled
│   │   ├── globals.css                # Design tokens, base styles
│   │   └── api/
│   │       └── lead/
│   │           └── route.ts           # Next.js API route for lead submissions
│   ├── components/
│   │   ├── providers/
│   │   │   └── LenisProvider.tsx      # Lenis smooth scroll root provider
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx        # Hero: parallax, Framer cursor, CTA
│   │   │   ├── BeforeAfterSection.tsx # Custom drag-to-compare slider
│   │   │   ├── BenefitsSection.tsx    # Staggered scroll cards (Framer)
│   │   │   ├── ProcedureSection.tsx   # GSAP ScrollTrigger sticky/pin
│   │   │   ├── PricingSection.tsx     # Pricing tiers with microinteractions
│   │   │   ├── TestimonialsSection.tsx# Infinite marquee carousel
│   │   │   └── LeadFormSection.tsx    # Inline lead form section
│   │   ├── ui/                        # shadcn/ui components (auto-generated)
│   │   ├── CustomCursor.tsx           # Framer Motion magnetic cursor
│   │   ├── StickyNav.tsx              # Sticky bottom CTA bar
│   │   └── BookingModal.tsx           # shadcn Dialog + RHF + Zod form
│   ├── lib/
│   │   ├── schema.ts                  # Shared Zod schemas
│   │   └── store.ts                   # Zustand global store
│   ├── hooks/
│   │   └── useScrollAnimation.ts      # GSAP/Framer animation hooks
│   ├── tailwind.config.ts
│   ├── next.config.ts
│   └── package.json
```

````

---

## 1. Frontend Setup

```bash
# --- Bootstrap Next.js project ---
npx create-next-app@latest frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd frontend

# --- shadcn/ui init ---
npx shadcn@latest init
# Select: Default style, Slate base color, CSS variables: yes

# --- shadcn components used in this project ---
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add form
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add carousel

# --- Animation & Motion libraries ---
npm install framer-motion
npm install gsap
npm install @studio-freight/lenis
npm install @types/gsap --save-dev

# --- State & Forms ---
npm install zustand
npm install react-hook-form
npm install @hookform/resolvers
npm install zod

# --- Fonts (next/font) ---
# Cormorant Garant + DM Sans — loaded via next/font/google in layout.tsx
````

## 2. Environment Variables

```bash
# frontend/.env.local
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
```

## 3. Dev Start Commands

```bash
# Terminal 1 — Frontend
cd frontend && npm install
cd frontend && npm run dev
```
