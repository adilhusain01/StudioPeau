"use client";

import { useEffect, useRef, RefObject } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Hook: Mouse magnetic effect ─────────────────────────────────────────────

interface UseMagneticOptions {
  strength?: number;
  ease?: number;
}

export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T>,
  options: UseMagneticOptions = {}
) {
  const { strength = 0.3, ease = 0.15 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      targetX = (e.clientX - centerX) * strength;
      targetY = (e.clientY - centerY) * strength;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      gsap.set(el, { x: currentX, y: currentY });
      animId = requestAnimationFrame(animate);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, strength, ease]);
}

// ─── Hook: GSAP ScrollTrigger fade-in for a list of elements ─────────────────

interface UseScrollRevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
}

export function useScrollReveal(
  containerRef: RefObject<HTMLElement>,
  selector: string,
  options: UseScrollRevealOptions = {}
) {
  const {
    y = 40,
    duration = 0.9,
    stagger = 0.12,
    start = "top 85%",
    once = true,
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start,
            once,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [containerRef, selector, y, duration, stagger, start, once]);
}

// ─── Hook: Smooth mouse-tracking motion values ────────────────────────────────

export function useMousePosition(): {
  x: MotionValue<number>;
  y: MotionValue<number>;
} {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 120, damping: 20 });
  const y = useSpring(rawY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [rawX, rawY]);

  return { x, y };
}

// ─── Hook: Section in-view tracker for nav highlighting ──────────────────────

export function useSectionObserver(
  sectionIds: string[],
  onEnter: (id: string) => void
) {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) onEnter(id);
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [sectionIds, onEnter]);
}

// ─── Hook: Lenis scroll-to utility ───────────────────────────────────────────

export function useLenisScrollTo() {
  const scrollTo = (target: string | HTMLElement | number, options = {}) => {
    if (typeof window !== "undefined" && window.lenis) {
      window.lenis.scrollTo(target, {
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    }
  };

  return scrollTo;
}
