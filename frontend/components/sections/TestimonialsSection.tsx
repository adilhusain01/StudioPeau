"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Testimonial data ─────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Priya Mehta",
    location: "South Delhi",
    rating: 5,
    text: "I was nervous about anything semi-permanent on my face. The consultation took away every doubt. Six weeks later, my lips look like the best version of themselves — every single morning.",
    procedure: "Bloom Package · Rosewood Ombre",
  },
  {
    name: "Ananya Sharma",
    location: "Gurugram",
    rating: 5,
    text: "The technician spent 40 minutes on colour alone. I have quite dark natural pigment and was told by another studio they couldn't help. Studio Peau found my exact shade. Genuinely life-changing.",
    procedure: "Lumiere Package · Nude Mauve",
  },
  {
    name: "Rhea Kapoor",
    location: "Vasant Kunj",
    rating: 5,
    text: "Worth every rupee. My lips were always uneven — nobody told me lip blushing could fix asymmetry. Now I wake up, look in the mirror, and feel like myself but better.",
    procedure: "Petal Package · Dusty Rose",
  },
  {
    name: "Naina Joshi",
    location: "Noida",
    rating: 5,
    text: "Completely painless. I was reading on my phone during the procedure. The aftercare kit is proper — not just a lip balm and a prayer. Results lasted through my wedding and honeymoon.",
    procedure: "Bloom Package · Berry Stain",
  },
  {
    name: "Ishita Bose",
    location: "Defence Colony",
    rating: 5,
    text: "I am a makeup artist myself and I know what good technique looks like. Studio Peau is exceptional. The strokes are precise, the pigment sits beautifully, and they understand skin.",
    procedure: "Lumiere Package · Sienna Flush",
  },
  {
    name: "Meera Vyas",
    location: "Greater Kailash",
    rating: 5,
    text: "Coming up on 2 years post-session and the colour is still beautiful. Slightly softer but honestly more wearable. I have recommended Studio Peau to every woman I know.",
    procedure: "Bloom Package · Coral Blush",
  },
];

// ─── Duplicate for seamless loop ──────────────────────────────────────────────
const allTestimonials = [...testimonials, ...testimonials];

// ─── Single card ──────────────────────────────────────────────────────────────
function TestimonialCard({ item }: { item: (typeof testimonials)[number] }) {
  return (
    <div
      className="flex-shrink-0 w-[340px] md:w-[400px] flex flex-col gap-4 p-7 mx-3"
      style={{
        background: "var(--ink-soft)",
        border: "1px solid rgba(201,169,110,0.12)",
      }}
    >
      {/* Stars */}
      <div className="flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
        {Array.from({ length: item.rating }).map((_, i) => (
          <svg
            key={i}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="var(--gold)"
          >
            <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="font-cormorant text-xl text-[var(--stone)] leading-snug flex-1">
        &ldquo;{item.text}&rdquo;
      </blockquote>

      {/* Divider */}
      <div
        className="h-px w-8"
        style={{ background: "var(--gold)", opacity: 0.4 }}
      />

      {/* Author */}
      <div>
        <p className="font-dm-sans text-sm font-medium text-[var(--stone)]">
          {item.name}
        </p>
        <p className="font-dm-sans text-xs text-[var(--ash-light)]">
          {item.location}
        </p>
        <p
          className="font-dm-sans text-xs mt-1"
          style={{ color: "var(--gold)", opacity: 0.7 }}
        >
          {item.procedure}
        </p>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      className="section-pad overflow-hidden"
      style={{ background: "var(--ink-soft)" }}
      aria-label="Client Testimonials"
    >
      {/* ── Header ── */}
      <div className="px-6 md:px-16 max-w-7xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="label-tag mb-4">Client Stories</p>
            <h2 className="display-lg text-[var(--stone)]">
              127 women who woke up
              <br />
              <em className="italic" style={{ color: "var(--rose)" }}>
                differently.
              </em>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <p
                className="font-cormorant text-5xl"
                style={{ color: "var(--gold)" }}
              >
                4.9
              </p>
              <p className="label-tag mt-1">Google Rating</p>
            </div>
            <div
              className="w-px h-12"
              style={{ background: "rgba(201,169,110,0.3)" }}
            />
            <div>
              <p
                className="font-cormorant text-5xl"
                style={{ color: "var(--gold)" }}
              >
                127
              </p>
              <p className="label-tag mt-1">Verified Reviews</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Marquee row 1 (left) ── */}
      <div className="relative overflow-hidden mb-4" aria-hidden="true">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, var(--ink-soft), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, var(--ink-soft), transparent)",
          }}
        />

        <div
          className="flex"
          style={{
            animation: "marquee-left 55s linear infinite",
            width: "max-content",
          }}
        >
          {allTestimonials.map((t, i) => (
            <TestimonialCard key={`a-${i}`} item={t} />
          ))}
        </div>
      </div>

      {/* ── Marquee row 2 (right — reverse) ── */}
      <div className="relative overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, var(--ink-soft), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, var(--ink-soft), transparent)",
          }}
        />

        <div
          className="flex"
          style={{
            animation: "marquee-right 65s linear infinite",
            width: "max-content",
          }}
        >
          {[...allTestimonials].reverse().map((t, i) => (
            <TestimonialCard key={`b-${i}`} item={t} />
          ))}
        </div>
      </div>

      {/* ── Platform badges ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="px-6 md:px-16 max-w-7xl mx-auto mt-12 flex items-center gap-6"
      >
        <span className="font-dm-sans text-xs text-[var(--ash)]">
          Reviews from:
        </span>
        {["Google", "Justdial", "Practo", "Instagram"].map((platform) => (
          <span
            key={platform}
            className="font-dm-sans text-xs px-3 py-1"
            style={{
              border: "1px solid rgba(201,169,110,0.2)",
              color: "var(--ash-light)",
            }}
          >
            {platform}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
