import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Cool Romantic" palette — nilai warna hidup di app/globals.css sebagai
        // CSS variable triplet "R G B" per tema (data-theme="dark" | "light").
        // Catatan: `paper` & `ink` adalah PASANGAN KONTRAS. `paper` = warna
        // background & teks-di-atas-aksen, `ink` = warna teks utama.
        paper: {
          DEFAULT: "rgb(var(--paper) / <alpha-value>)",
          2: "rgb(var(--paper-2) / <alpha-value>)",
        },
        ink: "rgb(var(--ink) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        blush: "rgb(var(--blush) / <alpha-value>)",
        butter: "rgb(var(--butter) / <alpha-value>)",
        sky: "rgb(var(--sky) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      fontSize: {
        // skala kontras-ekstrem & percaya diri
        hero: ["clamp(3rem, 12vw, 11rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        h2: ["clamp(2rem, 5vw, 4rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        label: ["0.75rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      boxShadow: {
        // bayangan stiker — pekat untuk kedalaman di atas latar gelap
        sticker: "0 10px 28px -10px rgba(0, 0, 0, 0.55)",
        "sticker-lg": "0 18px 44px -14px rgba(0, 0, 0, 0.6)",
        // glow blush lembut untuk elemen penting
        lift: "0 14px 50px -16px rgba(255, 143, 177, 0.5)",
      },
      keyframes: {
        bob: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--tw-rotate, 0))" },
          "50%": { transform: "translateY(-8px) rotate(var(--tw-rotate, 0))" },
        },
      },
      animation: {
        bob: "bob 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
