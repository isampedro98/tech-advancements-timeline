import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./packages/chronovis-react-kit/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f5f1e8",
        ink: "#1f2933",
        line: "#d8d3c8",
        panel: "#fcfaf6"
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "Segoe UI", "sans-serif"],
        serif: ["Source Serif 4", "Georgia", "serif"]
      },
      boxShadow: {
        panel: "0 18px 40px rgba(54, 61, 67, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
