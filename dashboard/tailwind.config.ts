import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Node colors matching the 3D scene
        "um-blue": "#2563eb",
        "sl-amber": "#f59e0b",
        "ac-emerald": "#10b981",
        // Dark theme surface colors
        surface: {
          DEFAULT: "#0f172a",
          raised: "#1e293b",
          overlay: "#334155",
        },
      },
    },
  },
  plugins: [],
};

export default config;
