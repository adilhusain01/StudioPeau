import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { StickyNav } from "@/components/StickyNav";
import { BookingModal } from "@/components/BookingModal";

// ─── Typography ─────────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Lip Blushing in Delhi | Semi-Permanent Lip Color by Studio Peau",
  description:
    "Discover premium lip blushing in Delhi at Studio Peau. Korean-inspired semi-permanent lip pigmentation for natural, long-lasting colour. Book your consultation today.",
  keywords: [
    "lip blushing in delhi",
    "semi permanent lip color delhi",
    "lip blushing treatment delhi",
    "permanent makeup delhi",
    "lip pigmentation delhi",
    "korean beauty delhi",
  ],
  authors: [{ name: "Studio Peau" }],
  creator: "Studio Peau",
  metadataBase: new URL("https://studio-peau.vercel.app"),
  alternates: {
    canonical: "https://studio-peau.vercel.app/",
  },
  openGraph: {
    title: "Lip Blushing in Delhi | Studio Peau",
    description:
      "Premium semi-permanent lip blushing in Delhi. Wake up with perfect lips every day.",
    url: "https://studio-peau.vercel.app/",
    siteName: "Studio Peau",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://studio-peau.vercel.app/images/og.png",
        secureUrl: "https://studio-peau.vercel.app/images/og.png",
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Studio Peau Lip Blushing in Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lip Blushing in Delhi | Studio Peau",
    description: "Premium semi-permanent lip blushing in Delhi.",
    images: [{ url: "https://studio-peau.vercel.app/images/og.png" }],
  },
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// ─── JSON-LD Local Business Schema ──────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://studio-peau.vercel.app/#business",
  name: "Studio Peau",
  description:
    "Premium lip blushing and semi-permanent makeup studio in Delhi, specialising in Korean beauty techniques.",
  url: "https://studio-peau.vercel.app",
  telephone: "+91-99999-99999",
  email: "hello@studiopeau.in",
  image: "https://studio-peau.vercel.app/images/og.png",
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, UPI",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-12, Ground Floor, Vasant Vihar",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110057",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "28.5574",
    longitude: "77.1602",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "17:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Lip Blushing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Lip Blushing — Full Treatment",
          description:
            "Complete semi-permanent lip blushing session with colour consultation and touch-up included.",
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "18000",
          priceCurrency: "INR",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
  },
  sameAs: [
    "https://www.instagram.com/studiopeau",
    "https://www.facebook.com/studiopeau",
  ],
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="bg-stone font-dm-sans antialiased">
        <LenisProvider>
          {children}
          <StickyNav />
          <BookingModal />
        </LenisProvider>
      </body>
    </html>
  );
}
