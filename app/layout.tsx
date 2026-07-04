import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Caveat } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

// Display — grotesque modern yang sedikit "wonky" & berkarakter
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// Body — bersih, hangat, mudah dibaca
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Tulisan tangan — catatan stiker & mikro-copy iseng (pakai hemat)
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KiuArKyut — kejutan untuk dia yang spesial",
  description:
    "kami bikin website hadiah surprise yang bisa kamu genggam, lempar, dan kirim. pilih tema, racik kejutan, dan buat dia tersenyum — mulai dari Rp 25.000.",
  keywords: [
    "website surprise",
    "hadiah romantis",
    "kado anniversary",
    "website ucapan",
    "surprise pacar",
    "KiuArKyut",
  ],
  openGraph: {
    title: "KiuArKyut — kejutan untuk dia yang spesial",
    description:
      "papan kenangan penuh stiker yang bisa kamu genggam. bikin website hadiah surprise untuk orang tersayang.",
    type: "website",
    locale: "id_ID",
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💌</text></svg>',
          ),
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF1EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${bricolage.variable} ${hanken.variable} ${caveat.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
