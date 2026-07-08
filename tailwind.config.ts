import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Warm paper palette. Keys mirror the old scale so existing
        // class references (bg-base-800, etc.) flip automatically.
        base: {
          DEFAULT: "#FAF7F2", // page cream
          50: "#FFFDF9", // elevated surface / cards
          100: "#F3EDE4", // alternating section band
          200: "#E7DFD2", // hairline dividers / borders
          700: "#E7DFD2",
          800: "#FFFDF9",
          900: "#F3EDE4",
        },
        accent: {
          // Warm system palette. Legacy keys remapped to warm tones so
          // any lingering text-accent-teal etc. render on-brand.
          DEFAULT: "#E86A4A", // coral primary
          coral: "#E86A4A",
          orange: "#F4A261",
          sand: "#E9B949",
          clay: "#C15F3C",
          teal: "#E86A4A",
          mint: "#E86A4A",
          cyan: "#F4A261",
          violet: "#C15F3C",
          indigo: "#B5654A",
        },
        ink: {
          DEFAULT: "#1C1917", // charcoal text / headlines
          muted: "#57534E", // secondary text
          faint: "#A8A29E", // labels / meta
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "4px 4px 0 0 #1C1917",
        "card-sm": "3px 3px 0 0 #1C1917",
        "card-lg": "6px 6px 0 0 #1C1917",
        "card-coral": "4px 4px 0 0 #E86A4A",
        soft: "0 10px 30px -12px rgba(28,25,23,0.18)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        marquee: "marquee 34s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
