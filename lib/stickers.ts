// Data stiker untuk Sticker Playground (matter.js) & fallback statis.
// x/y dalam persen relatif area playground; rotate kecil = kesan ditempel tangan.

export type StickerKind = "heart" | "petal" | "polaroid" | "note" | "spark";

export type StickerDef = {
  id: string;
  kind: StickerKind;
  /** ukuran sisi (px) pada desktop */
  size: number;
  /** warna isian (token palet) */
  color: "accent" | "blush" | "butter" | "sky";
  /** posisi awal (persen) untuk layout statis & seed physics */
  x: number;
  y: number;
  rotate: number;
  /** teks untuk stiker catatan (font tangan) */
  text?: string;
};

// Urutan PENTING: 7 stiker pertama dipakai sebagai subset di mobile
// (lebih sedikit body = scroll & physics tetap ringan). Lihat StickerPlayground.
export const stickers: StickerDef[] = [
  { id: "h1", kind: "heart", size: 72, color: "accent", x: 12, y: 18, rotate: -8 },
  { id: "p1", kind: "petal", size: 58, color: "blush", x: 30, y: 10, rotate: 6 },
  { id: "n1", kind: "note", size: 128, color: "butter", x: 8, y: 60, rotate: -5, text: "genggam aku ✿" },
  { id: "pl1", kind: "polaroid", size: 100, color: "blush", x: 60, y: 14, rotate: 7 },
  { id: "h2", kind: "heart", size: 50, color: "sky", x: 78, y: 30, rotate: 10 },
  { id: "s1", kind: "spark", size: 46, color: "butter", x: 48, y: 40, rotate: 0 },
  { id: "pl2", kind: "polaroid", size: 92, color: "sky", x: 24, y: 70, rotate: -7 },
  { id: "n2", kind: "note", size: 118, color: "blush", x: 70, y: 64, rotate: 5, text: "buat dia ♥" },
  { id: "h3", kind: "heart", size: 60, color: "accent", x: 88, y: 54, rotate: -10 },
  { id: "p2", kind: "petal", size: 52, color: "butter", x: 44, y: 74, rotate: -4 },
  { id: "s2", kind: "spark", size: 38, color: "sky", x: 36, y: 30, rotate: 0 },
  { id: "s3", kind: "spark", size: 34, color: "accent", x: 64, y: 44, rotate: 0 },
  { id: "h4", kind: "heart", size: 48, color: "blush", x: 52, y: 22, rotate: 8 },
  { id: "p3", kind: "petal", size: 54, color: "accent", x: 16, y: 40, rotate: -6 },
];
