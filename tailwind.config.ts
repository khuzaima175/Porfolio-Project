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
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        line: "var(--line)",
        "line-heavy": "var(--line-heavy)",
        signal: "var(--signal)",
        "signal-subtle": "var(--signal-subtle)",
      },
      fontFamily: {
        sans: ["'General Sans'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "'JetBrains Mono'", "monospace"],
      },
      transitionTimingFunction: {
        "e-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "e-io": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
      },
    },
  },
  plugins: [],
};

export default config;
