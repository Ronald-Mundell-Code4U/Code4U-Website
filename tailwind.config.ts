import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand — lime green
        primary: {
          DEFAULT: "#81d742",
          50: "#f3fbe9",
          100: "#e4f6cc",
          200: "#c9ed9c",
          300: "#a9e063",
          400: "#92d843",
          500: "#81d742",
          600: "#6fc530",
          700: "#54aa15",
          800: "#447f17",
          900: "#3a6917",
        },
        accent: {
          DEFAULT: "#81d742",
          bright: "#92d843",
        },
        // Surfaces
        "bg-dark": "#0d1410",
        "bg-dark-card": "#14201a",
        "bg-light": "#FFFFFF",
        "bg-light-card": "#F8FAF6",
        // Text
        "text-heading": "#131A18",
        "text-body": "#4B5563",
        "text-dark-h": "#F1FBE8",
        "text-dark-b": "#B7C9B0",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        input: "8px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(20, 30, 16, 0.06)",
        "card-hover": "0 12px 36px rgba(129, 215, 66, 0.18)",
        glow: "0 0 40px rgba(129, 215, 66, 0.25)",
        soft: "0 2px 12px rgba(0, 0, 0, 0.04)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(129, 215, 66, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(129, 215, 66, 0.5)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      backgroundImage: {
        "mesh-dark":
          "radial-gradient(at 20% 30%, rgba(129, 215, 66, 0.12) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(146, 216, 67, 0.08) 0px, transparent 50%), radial-gradient(at 40% 90%, rgba(169, 224, 99, 0.06) 0px, transparent 50%)",
        "mesh-light":
          "radial-gradient(at 20% 30%, rgba(129, 215, 66, 0.10) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(146, 216, 67, 0.06) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
