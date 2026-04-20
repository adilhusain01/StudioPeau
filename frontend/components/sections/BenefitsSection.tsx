"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────
const benefits = [
  {
    number: "01",
    title: "Zero Daily Lip Makeup",
    body: "Wake up with colour. Skip the liner, the gloss, the reapplication. Perfect lips, all day, every day.",
    accent: "var(--rose)",
  },
  {
    number: "02",
    title: "Korean Pigment Technology",
    body: "We use Seoul-imported, KFDA-approved organic pigments — engineered for dark undertones in Indian skin.",
    accent: "var(--gold)",
  },
  {
    number: "03",
    title: "Barely-There Discomfort",
    body: "Topical numbing cream applied for 45 minutes ensures a near-painless, fully relaxed session experience.",
    accent: "var(--rose)",
  },
  {
    number: "04",
    title: "Symmetry Correction",
    body: "Asymmetry, thin lips, undefined borders — all addressed through precise pigment placement technique.",
    accent: "var(--gold)",
  },
  {
    number: "05",
    title: "Safe for All Skin Tones",
    body: "Bespoke colour formulation for every complexion. We account for melanin concentration before mixing.",
    accent: "var(--rose)",
  },
  {
    number: "06",
    title: "Lasts 2–3 Years",
    body: "One session plus a complimentary touch-up at 6 weeks. Refresher sessions available every 18 months.",
    accent: "var(--gold)",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Benefit card ─────────────────────────────────────────────────────────────
function BenefitCard({
  item,
}: {
  item: (typeof benefits)[number];
}) {
  return (
    <motion.article
      variants={cardVariants}
      className="group relative flex flex-col gap-4 p-8 border transition-all duration-500 hover:border-[var(--gold)]"
      style={{
        background: "var(--ink-soft)",
        border: "1px solid rgba(201,169,110,0.12)",
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 24px 48px -12px rgba(0,0,0,0.6)",
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Number */}
      <span
        className="font-cormorant text-5xl font-light leading-none select-none"
        style={{ color: item.accent, opacity: 0.35 }}
      >
        {item.number}
      </span>

      {/* Gold line */}
      <motion.span
        className="block h-px w-8 transition-all duration-500 group-hover:w-full"
        style={{ background: item.accent, opacity: 0.5 }}
      />

      {/* Title */}
      <h3 className="font-cormorant text-2xl text-[var(--stone)] leading-tight">
        {item.title}
      </h3>

      {/* Body */}
      <p className="font-dm-sans text-[var(--ash-light)] text-sm leading-relaxed flex-1">
        {item.body}
      </p>

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          borderTop: `1px solid ${item.accent}`,
          borderRight: `1px solid ${item.accent}`,
        }}
      />
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-10%" });
  const isGridInView = useInView(gridRef, { once: true, margin: "-5%" });

  return (
    <section
      ref={sectionRef}
      className="section-pad px-6 md:px-16 relative"
      style={{ background: "var(--ink)" }}
      aria-label="Lip Blushing Benefits"
    >
      {/* ── Background number watermark ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-cormorant text-[30vw] font-light opacity-[0.025] leading-none"
          style={{ color: "var(--gold)" }}
        >
          06
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={isHeaderInView ? "show" : "hidden"}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="label-tag mb-4">Why Lip Blushing</p>
            <h2 className="display-lg text-[var(--stone)]">
              Six reasons this changes
              <br />
              <em className="italic" style={{ color: "var(--rose)" }}>
                your morning.
              </em>
            </h2>
          </div>

          <p className="font-dm-sans text-[var(--ash-light)] text-sm max-w-xs leading-relaxed md:text-right">
            Lip blushing is not just a treatment — it is the elimination of
            a 15-minute daily ritual, permanently.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isGridInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(201,169,110,0.08)" }}
        >
          {benefits.map((item) => (
            <BenefitCard key={item.number} item={item} />
          ))}
        </motion.div>

        {/* ── Footnote ── */}
        <motion.p
          variants={headerVariants}
          initial="hidden"
          animate={isHeaderInView ? "show" : "hidden"}
          transition={{ delay: 0.6 }}
          className="font-dm-sans text-[var(--ash)] text-xs mt-8 text-center tracking-wide"
        >
          Individual results may vary · Patch test included in every consultation · 
          KFDA-approved pigments used exclusively
        </motion.p>
      </div>
    </section>
  );
}
