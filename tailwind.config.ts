import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-black": "#000000",
        "brand-gray": "#161617",
        "brand-card": "#1d1d1f",
        "brand-subtle": "#86868b",
        "brand-blue": "#2997ff",
        "brand-text": "#f5f5f7",
        "surface-dark": "#161617",
        "card-surface": "#1d1d1f",
        "text-subtle": "#86868b",
        "text-primary": "#f5f5f7",
        "canvas-black": "#000000",
        "accent-blue": "#2997ff",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "tight-editorial": "-0.02em",
        "tighter-editorial": "-0.03em",
        "tightest-editorial": "-0.05em",
      },
      borderRadius: {
        "radius-sm": "12px",
        "radius-md": "18px",
        "radius-lg": "28px",
        "radius-xl": "40px",
      },
      backgroundImage: {
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
      },
      boxShadow: {
        "accent-glow": "0 0 60px -15px rgba(41, 151, 255, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
