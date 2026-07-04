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
        // "Cool Romantic" palette — midnight gelap + blush/lavender/gold.
        // Catatan: `paper` & `ink` adalah PASANGAN KONTRAS. Di tema gelap,
        // `paper` = warna gelap (background & teks-di-atas-aksen), `ink` = warna
        // terang (teks utama di atas background gelap).
        paper: {
          DEFAULT: "#0F0A1E", // background — midnight gelap
          2: "#1C1530", // surface terangkat / kartu (sedikit lebih terang)
        },
        ink: "#FAF7FF", // teks utama — putih kehangatan
        accent: "#FF8FB1", // blush/rose — aksen utama
        blush: "#F7A8C4", // rose lembut / stiker
        butter: "#F5D5A8", // soft gold / peach
        sky: "#A78BFA", // lavender (variasi stiker)
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
