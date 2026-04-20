import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Colors map to CSS variables ────────────────────────────────────
      colors: {
        ink:        "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        surface:    "var(--surface)",
        stone:      "var(--stone)",
        "stone-muted":"var(--stone-muted)",
        gold:       "var(--gold)",
        "gold-light":"var(--gold-light)",
        rose:       "var(--rose)",
        "rose-deep":"var(--rose-deep)",
        ash:        "var(--ash)",
        "ash-light":"var(--ash-light)",
      },

      // ── Font families ───────────────────────────────────────────────────
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        "dm-sans":  ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },

      // ── Animation ───────────────────────────────────────────────────────
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },

      // ── Keyframes ───────────────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
        shimmer:   "shimmer 2s infinite linear",
      },

      // ── Spacing ─────────────────────────────────────────────────────────
      spacing: {
        "section": "clamp(5rem, 10vw, 9rem)",
      },

      // ── Max widths ──────────────────────────────────────────────────────
      maxWidth: {
        content: "1280px",
        reading: "65ch",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

export default config;
