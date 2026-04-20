"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";

// Expose lenis instance globally for GSAP ScrollTrigger integration
declare global {
  interface Window {
    lenis: Lenis | undefined;
  }
}

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // RAF loop
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    // Emit scroll event for GSAP ScrollTrigger
    lenis.on("scroll", () => {
      if (typeof window !== "undefined" && (window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.update();
      }
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
