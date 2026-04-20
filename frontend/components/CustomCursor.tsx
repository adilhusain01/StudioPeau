"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorVariant = "default" | "hover" | "drag" | "cta";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { stiffness: 150, damping: 22, mass: 0.5 };
  const dotSpringConfig = { stiffness: 600, damping: 40, mass: 0.1 };

  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const dotXSpring = useSpring(dotX, dotSpringConfig);
  const dotYSpring = useSpring(dotY, dotSpringConfig);

  const [variant, setVariant] = useState<CursorVariant>("default");
  const [label, setLabel] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 24);
      cursorY.set(e.clientY - 24);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect element types for cursor variant
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest(
        "button, a, [data-cursor], input, textarea"
      ) as HTMLElement | null;

      if (!closest) {
        setVariant("default");
        setLabel("");
        return;
      }

      const cursorType = closest.getAttribute("data-cursor");
      if (cursorType === "drag") {
        setVariant("drag");
        setLabel("Drag");
      } else if (cursorType === "cta") {
        setVariant("cta");
        setLabel("Book");
      } else if (
        closest.tagName === "BUTTON" ||
        closest.tagName === "A" ||
        closest.getAttribute("role") === "button"
      ) {
        setVariant("hover");
        setLabel("");
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  const cursorVariants = {
    default: {
      width: 48,
      height: 48,
      backgroundColor: "transparent",
      border: "1px solid rgba(201, 169, 110, 0.6)",
      opacity: 1,
    },
    hover: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(201, 169, 110, 0.15)",
      border: "1px solid rgba(201, 169, 110, 0.9)",
      opacity: 1,
    },
    drag: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(201, 169, 110, 0.1)",
      border: "1px solid rgba(201, 169, 110, 0.8)",
      opacity: 1,
    },
    cta: {
      width: 72,
      height: 72,
      backgroundColor: "rgba(201, 169, 110, 0.2)",
      border: "1px solid var(--gold)",
      opacity: 1,
    },
  };

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Outer ring */}
          <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
            style={{ x, y }}
            animate={variant}
            variants={cursorVariants}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            {label && (
              <span
                className="text-[0.6rem] font-dm-sans font-medium tracking-widest uppercase"
                style={{ color: "var(--gold)" }}
              >
                {label}
              </span>
            )}
          </motion.div>

          {/* Dot */}
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]"
            style={{
              x: dotXSpring,
              y: dotYSpring,
              backgroundColor: "var(--gold)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
