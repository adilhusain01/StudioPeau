"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useUIStore } from "@/lib/store";

// ─── Pricing tiers ────────────────────────────────────────────────────────────
const tiers = [
  {
    name: "Petal",
    tagline: "Your first step",
    startingFrom: true,
    price: "18,000",
    currency: "₹",
    highlight: false,
    features: [
      "Single session (up to 3 hours)",
      "Colour consultation included",
      "Topical numbing cream",
      "Aftercare kit (10-day supply)",
      "One complimentary touch-up at 6 weeks",
    ],
    note: "Ideal for first-time clients",
  },
  {
    name: "Bloom",
    tagline: "Most popular",
    startingFrom: true,
    price: "24,000",
    currency: "₹",
    highlight: true,
    features: [
      "Everything in Petal",
      "Full ombre / gradient effect",
      "Priority weekend scheduling",
      "Aftercare kit (full 4-week supply)",
      "Two touch-up sessions (6 weeks + 6 months)",
      "Colour refresh at 18 months (50% off)",
    ],
    note: "Best value for long-term results",
  },
  {
    name: "Lumiere",
    tagline: "Complete transformation",
    startingFrom: false,
    price: "38,000",
    currency: "₹",
    highlight: false,
    features: [
      "Everything in Bloom",
      "Lip liner sculpting session",
      "Cupid's bow reshaping",
      "Personalised pigment batch reserved",
      "Lifetime complimentary consultations",
      "Annual refresh sessions (discounted)",
    ],
    note: "For total, lasting transformation",
  },
];

// ─── Card component ───────────────────────────────────────────────────────────
function PricingCard({
  tier,
  index,
  isInView,
}: {
  tier: (typeof tiers)[number];
  index: number;
  isInView: boolean;
}) {
  const openModal = useUIStore((s) => s.openModal);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={
        !tier.highlight
          ? {
              y: -8,
              boxShadow: "0 32px 64px -16px rgba(0,0,0,0.7)",
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }
          : {}
      }
      className="relative flex flex-col"
      style={{
        background: tier.highlight ? "var(--gold)" : "var(--ink-soft)",
        border: tier.highlight
          ? "none"
          : "1px solid rgba(201,169,110,0.15)",
        padding: "2.5rem",
        color: tier.highlight ? "var(--ink)" : "var(--stone)",
      }}
    >
      {/* Highlight badge */}
      {tier.highlight && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1"
          style={{
            background: "var(--rose-deep)",
            color: "var(--stone)",
          }}
        >
          <span className="label-tag" style={{ color: "var(--stone)" }}>
            Most Popular
          </span>
        </div>
      )}

      {/* Tier name */}
      <p
        className="label-tag mb-1"
        style={{ color: tier.highlight ? "var(--ink)" : "var(--gold)" }}
      >
        {tier.name}
      </p>
      <p
        className="font-dm-sans text-sm mb-6"
        style={{
          color: tier.highlight
            ? "rgba(10,10,10,0.6)"
            : "var(--ash-light)",
        }}
      >
        {tier.tagline}
      </p>

      {/* Price */}
      <div className="mb-8">
        {tier.startingFrom && (
          <span
            className="font-dm-sans text-xs uppercase tracking-widest block mb-1"
            style={{
              color: tier.highlight ? "rgba(10,10,10,0.55)" : "var(--ash)",
            }}
          >
            Starting from
          </span>
        )}
        <div className="flex items-baseline gap-1">
          <span
            className="font-cormorant text-5xl font-light"
            style={{ color: tier.highlight ? "var(--ink)" : "var(--stone)" }}
          >
            {tier.currency}
          </span>
          <span
            className="font-cormorant text-6xl font-light"
            style={{ color: tier.highlight ? "var(--ink)" : "var(--stone)" }}
          >
            {tier.price}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full mb-6"
        style={{
          background: tier.highlight
            ? "rgba(10,10,10,0.2)"
            : "rgba(201,169,110,0.15)",
        }}
      />

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 font-dm-sans text-sm"
            style={{
              color: tier.highlight ? "var(--ink)" : "var(--ash-light)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="mt-0.5 shrink-0"
            >
              <path
                d="M2 7L5.5 10.5L12 3.5"
                stroke={tier.highlight ? "var(--ink)" : "var(--gold)"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* Note */}
      <p
        className="font-dm-sans text-xs mb-6 italic"
        style={{
          color: tier.highlight ? "rgba(10,10,10,0.5)" : "var(--ash)",
        }}
      >
        {tier.note}
      </p>

      {/* CTA */}
      <motion.button
        onClick={openModal}
        data-cursor="cta"
        className="relative w-full py-4 font-dm-sans text-sm font-medium tracking-[0.12em] uppercase overflow-hidden"
        style={{
          background: tier.highlight ? "var(--ink)" : "transparent",
          color: tier.highlight ? "var(--gold)" : "var(--stone)",
          border: tier.highlight ? "none" : "1px solid rgba(201,169,110,0.4)",
        }}
        whileHover={{
          backgroundColor: tier.highlight
            ? "var(--ink-soft)"
            : "rgba(201,169,110,0.08)",
          borderColor: "var(--gold)",
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        Book {tier.name}
      </motion.button>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      className="section-pad px-6 md:px-16"
      style={{ background: "var(--ink)" }}
      aria-label="Lip Blushing Pricing"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="label-tag mb-4">Investment</p>
          <h2 className="display-lg text-[var(--stone)] mb-4">
            Choose your
            <br />
            <em className="italic" style={{ color: "var(--rose)" }}>
              transformation.
            </em>
          </h2>
          <p className="font-dm-sans text-[var(--ash-light)] text-sm max-w-md leading-relaxed">
            All packages include a pre-procedure patch test, custom pigment
            consultation, and a complimentary touch-up session. No hidden
            charges.
          </p>
        </motion.div>

        {/* ── Tier grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px"
          style={{ background: "rgba(201,169,110,0.08)" }}
        >
          {tiers.map((tier, i) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* ── Disclaimer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(201,169,110,0.15)" }}
        >
          <p className="font-dm-sans text-[var(--ash)] text-xs text-center md:text-left">
            Prices are indicative. Final pricing confirmed after consultation.
            EMI options available on orders above ₹20,000.
          </p>
          <div className="flex items-center gap-4">
            <span className="label-tag">Certified · Insured · KFDA Approved</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
