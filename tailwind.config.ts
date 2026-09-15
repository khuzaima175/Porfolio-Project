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
        "apple-black": "#000000",
        "apple-gray": "#161617",
        "apple-card": "#1d1d1f",
        "apple-subtle": "#86868b",
        "apple-blue": "#2997ff",
        "apple-text": "#f5f5f7",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "apple-tight": "-0.02em",
        "apple-tighter": "-0.03em",
        "apple-tightest": "-0.05em",
      },
      borderRadius: {
        "apple-sm": "12px",
        "apple-md": "18px",
        "apple-lg": "28px",
        "apple-xl": "40px",
      },
      backgroundImage: {
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
      },
      boxShadow: {
        "apple-glow": "0 0 60px -15px rgba(41, 151, 255, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
