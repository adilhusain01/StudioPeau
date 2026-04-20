"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Step data ────────────────────────────────────────────────────────────────
const steps = [
  {
    number: "Step 01",
    title: "Colour Consultation",
    duration: "30 min",
    body: "We map your skin undertone, natural lip pigment, and face symmetry. Together we select the perfect custom pigment blend — from nude-rose to deep berry.",
    tag: "Day of Appointment",
  },
  {
    number: "Step 02",
    title: "Numbing & Preparation",
    duration: "45 min",
    body: "Medical-grade topical anaesthetic is applied to the lip surface and allowed to take full effect. Lips are then cleaned and prepped for maximum pigment retention.",
    tag: "Same Session",
  },
  {
    number: "Step 03",
    title: "Pigment Application",
    duration: "90 min",
    body: "Using a nano-blade technique, certified pigment is deposited in precise hair-thin strokes that mimic natural lip texture, building colour saturation gradually.",
    tag: "Core Procedure",
  },
  {
    number: "Step 04",
    title: "Aftercare Briefing",
    duration: "15 min",
    body: "You leave with a premium aftercare kit and a detailed protocol. Avoid water on lips for 48 hours. Colour peaks at day 3 and settles fully after 4–6 weeks.",
    tag: "Post Session",
  },
  {
    number: "Step 05",
    title: "Complimentary Touch-Up",
    duration: "60 min",
    body: "Included in every package at no extra charge. Held 6–8 weeks after the initial session to perfect colour density and correct any uneven saturation.",
    tag: "Week 6–8",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function ProcedureSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-10%" });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    // ScrollTrigger needs Lenis to emit scroll events
    // (handled in LenisProvider via lenis.on("scroll", ScrollTrigger.update))
    ScrollTrigger.config({ syncInterval: 40 });

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Pin the section and drive horizontal scroll with vertical scroll
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${totalScroll + window.innerHeight * 0.5}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate each panel as it enters
      const panels = track.querySelectorAll<HTMLElement>(".step-panel");
      panels.forEach((panel, i) => {
        if (i === 0) return;
        const content = panel.querySelector(".step-content");
        if (!content) return;

        gsap.fromTo(
          content,
          { opacity: 0.25, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById("hscroll") as gsap.core.Tween,
              start: "left 80%",
              end: "left 30%",
              scrub: 0.5,
            },
          }
        );
      });

      // Progress bar
      gsap.to(".procedure-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${totalScroll + window.innerHeight * 0.5}`,
          scrub: true,
        },
      });
    }, wrapper);

    // Store reference for container animation
    const hscrollAnim = gsap.getById("hscroll");

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="overflow-hidden"
      style={{ background: "var(--ink-soft)" }}
      aria-label="Lip Blushing Procedure Steps"
    >
      {/* ── Section header (outside scroll) ── */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 32 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 md:px-16 pt-20 pb-10 max-w-7xl mx-auto"
      >
        <p className="label-tag mb-4">The Process</p>
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-16">
          <h2 className="display-lg text-[var(--stone)] flex-1">
            From consultation
            <br />
            <em className="italic" style={{ color: "var(--rose)" }}>
              to perfect lips.
            </em>
          </h2>
          <p className="font-dm-sans text-[var(--ash-light)] text-sm max-w-xs leading-relaxed">
            Scroll horizontally through each stage of the procedure. Total
            session time: approximately 3 hours.
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="mt-8 h-px w-full overflow-hidden"
          style={{ background: "rgba(201,169,110,0.15)" }}
        >
          <div
            className="procedure-progress-bar h-full w-full origin-left"
            style={{
              background: "var(--gold)",
              transform: "scaleX(0)",
            }}
          />
        </div>
      </motion.div>

      {/* ── Horizontal scroll track ── */}
      <div
        ref={trackRef}
        className="h-scroll-container"
        style={{ willChange: "transform" }}
        id="hscroll-track"
      >
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="step-panel h-scroll-panel"
            style={{
              background: i % 2 === 0 ? "var(--ink-soft)" : "var(--ink)",
            }}
          >
            <div className="step-content max-w-lg w-full">
              {/* Number */}
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="font-cormorant text-7xl md:text-8xl font-light leading-none"
                  style={{ color: "rgba(201,169,110,0.2)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col">
                  <span className="label-tag">{step.number}</span>
                  <span
                    className="font-dm-sans text-xs mt-1"
                    style={{ color: "var(--ash)" }}
                  >
                    {step.tag}
                  </span>
                </div>
              </div>

              {/* Gold line */}
              <span className="gold-line mb-6" />

              {/* Title */}
              <h3 className="display-md text-[var(--stone)] mb-4">
                {step.title}
              </h3>

              {/* Duration badge */}
              <span
                className="inline-block font-dm-sans text-xs px-3 py-1 mb-6 tracking-widest uppercase"
                style={{
                  background: "rgba(201,169,110,0.12)",
                  color: "var(--gold)",
                  border: "1px solid rgba(201,169,110,0.25)",
                }}
              >
                {step.duration}
              </span>

              {/* Body */}
              <p className="font-dm-sans text-[var(--ash-light)] text-sm md:text-base leading-relaxed">
                {step.body}
              </p>

              {/* Step indicator dots */}
              <div className="flex gap-2 mt-10">
                {steps.map((_, j) => (
                  <div
                    key={j}
                    className="h-px flex-1 transition-all duration-500"
                    style={{
                      background:
                        j <= i
                          ? "var(--gold)"
                          : "rgba(201,169,110,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
