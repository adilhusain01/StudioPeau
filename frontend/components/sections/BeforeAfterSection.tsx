"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  const [sliderPos, setSliderPos] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);

  // ── Drag logic ──────────────────────────────────────────────────────────
  const calcPosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const rawPos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(3, Math.min(97, rawPos)));
  }, []);

  const onMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      calcPosition(e.clientX);
    };
    const onMouseUp = () => setIsDragging(false);
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      calcPosition(e.touches[0].clientX);
    };
    const onTouchEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, calcPosition]);

  return (
    <section
      id="before-after"
      ref={sectionRef}
      className="section-pad bg-[var(--ink)] px-6 md:px-16"
      aria-label="Before and After Results"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-16 max-w-xl"
        >
          <p className="label-tag mb-4">Real Results</p>
          <h2 className="display-lg text-[var(--stone)]">
            The transformation
            <br />
            <em className="italic" style={{ color: "var(--rose)" }}>
              speaks for itself.
            </em>
          </h2>
          <p className="font-dm-sans text-[var(--ash-light)] mt-4 text-sm leading-relaxed">
            No filters. No retouching. Drag the slider to compare real client
            results before and after a single lip blushing session.
          </p>
        </motion.div>

        {/* ── Slider ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          transition={{ delay: 0.2 }}
        >
          <div
            ref={containerRef}
            className="before-after-container relative w-full rounded-none overflow-hidden select-none"
            style={{ aspectRatio: "16/9", maxHeight: "70vh" }}
            onMouseDown={onMouseDown}
            onTouchStart={() => setIsDragging(true)}
            data-cursor="drag"
          >
            {/* AFTER — full width base */}
            <div className="absolute inset-0">
              <Image
                src="/images/after.webp"
                alt="After lip blushing treatment — fuller, defined lip colour"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover object-center"
                quality={80}
              />
              <div
                className="absolute top-6 right-6 label-tag px-3 py-1"
                style={{
                  background: "var(--rose-deep)",
                  color: "var(--stone)",
                }}
              >
                After
              </div>
            </div>

            {/* BEFORE — clipped by slider position */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <Image
                src="/images/before.webp"
                alt="Before lip blushing treatment — natural lips without pigmentation"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover object-center"
                quality={80}
                style={{ minWidth: "100vw" }}
              />
              <div
                className="absolute top-6 left-6 label-tag px-3 py-1"
                style={{
                  background: "var(--ash)",
                  color: "var(--stone)",
                }}
              >
                Before
              </div>
            </div>

            {/* ── Handle ── */}
            <div
              className="absolute top-0 bottom-0 z-10"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Vertical line */}
              <div
                className="absolute top-0 bottom-0 left-0 w-[2px] -translate-x-1/2"
                style={{ background: "var(--gold)" }}
              />

              {/* Drag circle */}
              <motion.div
                className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: "var(--gold)",
                  boxShadow:
                    "0 0 0 4px rgba(10,10,10,0.8), 0 4px 20px rgba(0,0,0,0.5)",
                }}
                animate={{ scale: isDragging ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Arrows icon */}
                <svg
                  width="20"
                  height="12"
                  viewBox="0 0 20 12"
                  fill="none"
                  style={{ color: "var(--ink)" }}
                >
                  <path
                    d="M1 6H19M1 6L5 2M1 6L5 10M19 6L15 2M19 6L15 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Caption */}
          <p className="font-dm-sans text-[var(--ash)] text-xs mt-4 text-center tracking-wide">
            Session 1 results · No retouching · Photo taken 4 weeks
            post-procedure
          </p>
        </motion.div>

        {/* ── Disclaimer row ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          transition={{ delay: 0.35 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-8"
          style={{ borderColor: "rgba(201,169,110,0.2)" }}
        >
          {[
            {
              title: "Colour Customised",
              body: "Matched to your skin undertone and personal preference.",
            },
            {
              title: "Minimal Downtime",
              body: "Light flaking for 5–7 days. Back to life immediately.",
            },
            {
              title: "Gradual Fading",
              body: "Colour softens beautifully over 2–3 years, never harsh.",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <span className="gold-line" />
              <h3 className="font-cormorant text-xl text-[var(--stone)] mt-3">
                {item.title}
              </h3>
              <p className="font-dm-sans text-[var(--ash-light)] text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
