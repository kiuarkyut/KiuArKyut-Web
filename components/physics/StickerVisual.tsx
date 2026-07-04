import { Heart, Sparkles } from "lucide-react";
import type { StickerDef } from "@/lib/stickers";

const COLOR: Record<StickerDef["color"], string> = {
  accent: "#FF8FB1", // blush/rose
  blush: "#F7A8C4", // rose lembut
  butter: "#F5D5A8", // soft gold
  sky: "#A78BFA", // lavender
};

/**
 * Tampilan visual satu stiker (dipakai physics & fallback statis).
 * Ukuran mengisi penuh kontainer induk (induk yang mengatur w/h).
 */
export default function StickerVisual({ def }: { def: StickerDef }) {
  const color = COLOR[def.color];

  switch (def.kind) {
    case "heart":
      return (
        <div className="grid h-full w-full place-items-center drop-shadow-[0_8px_12px_rgba(26,20,16,0.25)]">
          <Heart
            className="h-full w-full"
            style={{ color }}
            fill="currentColor"
            strokeWidth={0}
          />
        </div>
      );

    case "spark":
      return (
        <div className="grid h-full w-full place-items-center">
          <Sparkles className="h-full w-full" style={{ color }} strokeWidth={2} />
        </div>
      );

    case "petal":
      // Kelopak bunga sederhana: empat oval ditata membentuk bunga.
      return (
        <div className="relative h-full w-full">
          {[0, 45, 90, 135].map((deg) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2 h-[46%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: color, transform: `translate(-50%,-50%) rotate(${deg}deg)` }}
            />
          ))}
          <span className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-butter" />
        </div>
      );

    case "polaroid":
      return (
        <div className="flex h-full w-full flex-col rounded-[6px] bg-white p-1.5 pb-3 shadow-sticker">
          <div
            className="flex-1 rounded-[3px]"
            style={{ background: `linear-gradient(135deg, ${color}, #ffffff66)` }}
          />
          <span className="mt-1 block h-1.5 w-2/3 rounded-full bg-black/15" />
        </div>
      );

    case "note":
      return (
        <div
          className="flex h-full w-full items-center justify-center rounded-[4px] px-2 text-center shadow-sticker"
          style={{ background: color }}
        >
          {/* Note selalu berwarna pastel terang → teks gelap TETAP (tidak ikut
              tema, karena di light mode text-paper jadi krem dan hilang). */}
          <span className="font-hand text-lg leading-tight text-[#241733]">
            {def.text}
          </span>
        </div>
      );

    default:
      return null;
  }
}
