"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useUIStore } from "@/lib/store";

// ─── Animation variants ───────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.4, ease: "easeOut" },
  },
};

const lineReveal = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 },
  },
};

// ─── Component ────────────────────────────────────────────────────────────
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const openModal = useUIStore((s) => s.openModal);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const bgTransform = useMotionTemplate`translateY(${bgY}) scale(${bgScale})`;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden noise"
      aria-label="Hero"
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ transform: bgTransform, willChange: "transform" }}
      >
        <Image
          src="/images/hero-bg.webp"
          alt="Close-up of perfectly blush-toned lips — Studio Peau lip blushing Delhi"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: "brightness(0.45) saturate(0.8)" }}
        />
      </motion.div>

      {/* ── Gradient vignette ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.3) 55%, rgba(10,10,10,0.15) 100%)",
        }}
      />

      {/* ── Gold top border accent ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px z-[2]"
        style={{ background: "var(--gold)", transformOrigin: "left" }}
        variants={lineReveal}
        initial="hidden"
        animate="show"
      />

      {/* ── Nav brand ── */}
      <motion.div
        className="absolute top-8 left-6 md:left-16 z-10"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        <p className="font-cormorant text-xl md:text-2xl text-[var(--stone)] tracking-widest">
          Studio Peau
        </p>
      </motion.div>

      <motion.div
        className="absolute top-8 right-6 md:right-16 z-10"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        <a
          href="tel:+919999999999"
          className="label-tag hover:text-[var(--stone)] transition-colors duration-300"
        >
          +91 99999 99999
        </a>
      </motion.div>

      {/* ── Hero content ── */}
      <motion.div
        className="relative z-10 px-6 md:px-16 pb-16 md:pb-24 max-w-7xl w-full mx-auto"
        style={{ y: textY, opacity }}
        variants={containerVariants}
        initial={false}
        animate="show"
      >
        {/* Label */}
        {/* <motion.p variants={fadeUp} className="label-tag mb-6">
          Seoul · Delhi · Semi-Permanent Beauty
        </motion.p> */}

        {/* H1 — only one on the entire page */}
        <motion.h1
          variants={fadeUp}
          className="display-xl text-[var(--stone)] mb-4 max-w-4xl"
        >
          Lip Blushing
          <br />
          <em
            className="italic"
            style={{ color: "var(--rose)", fontWeight: 300 }}
          >
            in Delhi.
          </em>
        </motion.h1>

        {/* Gold line */}
        <motion.span
          className="block w-16 h-px mb-6"
          style={{ background: "var(--gold)", transformOrigin: "left" }}
          variants={lineReveal}
        />

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          className="font-dm-sans text-[var(--ash-light)] text-base md:text-lg max-w-xl leading-relaxed mb-10"
        >
          Wake up to perfectly pigmented lips, every day. Korean-trained
          technicians. Zero downtime. Results that last 2–3 years.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 items-start"
        >
          <button
            onClick={openModal}
            data-cursor="cta"
            className="group relative px-8 py-4 font-dm-sans text-sm font-medium tracking-[0.15em] uppercase overflow-hidden transition-all duration-500"
            style={{
              background: "var(--gold)",
              color: "var(--ink)",
            }}
          >
            <span className="relative z-10">Book a Consultation</span>
            <span
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out-expo"
              style={{ background: "var(--gold-light)" }}
            />
          </button>

          <a
            href="#before-after"
            className="group flex items-center gap-3 px-2 py-4 font-dm-sans text-sm tracking-[0.12em] uppercase text-[var(--ash-light)] hover:text-[var(--stone)] transition-colors duration-300"
          >
            See Results
            <span
              className="inline-block w-8 h-px transition-all duration-500 group-hover:w-14"
              style={{ background: "var(--gold)" }}
            />
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          className="mt-16 flex gap-10 md:gap-16 border-t pt-8"
          style={{ borderColor: "rgba(201,169,110,0.2)" }}
        >
          {[
            { value: "2,000+", label: "Clients Served" },
            { value: "4.9★", label: "Average Rating" },
            { value: "3 yrs", label: "Avg. Longevity" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="font-cormorant text-3xl md:text-4xl"
                style={{ color: "var(--gold)" }}
              >
                {stat.value}
              </p>
              <p className="label-tag mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-2"
        variants={fadeIn}
        initial="hidden"
        animate="show"
        style={{ opacity }}
      >
        <span className="label-tag" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-12"
          style={{ background: "var(--gold)" }}
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
