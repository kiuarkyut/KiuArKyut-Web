import { Heart, Music, Play, Quote } from "lucide-react";
import type { Theme } from "@/lib/data";

/**
 * Mini-mockup CSS untuk tiap tema (tanpa gambar/asset eksternal).
 * Dipakai sebagai preview mengambang di galeri tema.
 */
export default function ThemePreview({ theme }: { theme: Theme }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br ${theme.gradient}`}
      role="img"
      aria-label={`Pratinjau tema ${theme.name}`}
    >
      <div className="absolute inset-0 bg-black/15" />
      <div className="relative h-full p-4">{renderVariant(theme)}</div>
    </div>
  );
}

function renderVariant(theme: Theme) {
  switch (theme.preview) {
    case "stars":
      return (
        <div className="relative h-full">
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${(i * 41) % 100}%`,
                  left: `${(i * 67) % 100}%`,
                  width: `${1 + (i % 3)}px`,
                  height: `${1 + (i % 3)}px`,
                  opacity: 0.5 + (i % 3) * 0.2,
                }}
              />
            ))}
          </div>
          <div className="relative flex h-full flex-col items-center justify-center text-center">
            <p className="font-hand text-xl text-white">Rafa &amp; Sena</p>
            <div className="mt-2 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="h-3 w-3 text-white/90"
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>
          </div>
        </div>
      );

    case "polaroid":
      return (
        <div className="flex h-full items-center justify-center gap-2">
          {[-8, 4, -3].map((rot, i) => (
            <div
              key={i}
              className="rounded-md bg-white/95 p-1.5 pb-4 shadow-md"
              style={{ transform: `rotate(${rot}deg)` }}
            >
              <div
                className={`h-14 w-12 rounded-sm bg-gradient-to-br ${
                  [
                    "from-rose-300 to-pink-400",
                    "from-amber-200 to-rose-300",
                    "from-pink-300 to-fuchsia-400",
                  ][i]
                }`}
              />
            </div>
          ))}
        </div>
      );

    case "letter":
      return (
        <div className="flex h-full items-center justify-center">
          <div className="w-44 rounded-md bg-[#fdf6ec] p-3 shadow-lg">
            <div className="mb-2 flex items-center gap-1">
              <Heart
                className="h-3 w-3 text-rose-400"
                fill="currentColor"
                strokeWidth={0}
              />
              <span className="font-hand text-base text-rose-500">Untukmu,</span>
            </div>
            <div className="space-y-1.5">
              <span className="block h-1.5 w-full rounded-full bg-rose-200" />
              <span className="block h-1.5 w-5/6 rounded-full bg-rose-200" />
              <span className="block h-1.5 w-2/3 rounded-full bg-rose-200" />
            </div>
          </div>
        </div>
      );

    case "countdown":
      return (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/80">
            menuju hari spesial
          </p>
          <div className="mt-2 flex gap-1.5">
            {[
              ["12", "Hari"],
              ["08", "Jam"],
              ["45", "Mnt"],
            ].map(([n, l]) => (
              <div
                key={l}
                className="flex w-12 flex-col items-center rounded-lg bg-white/15 py-1.5 backdrop-blur"
              >
                <span className="font-display text-lg font-semibold text-white">
                  {n}
                </span>
                <span className="text-[9px] text-white/70">{l}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "slideshow":
      return (
        <div className="flex h-full flex-col items-center justify-center">
          <div className="relative flex h-24 w-36 items-center justify-center rounded-lg bg-white/10 backdrop-blur">
            <div className="absolute inset-2 rounded-md bg-gradient-to-br from-fuchsia-300/80 to-violet-400/80" />
            <Play
              className="relative h-7 w-7 text-white"
              fill="currentColor"
              strokeWidth={0}
            />
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur">
            <Music className="h-3 w-3 text-white" />
            <span className="text-[10px] text-white/90">lagu kita ♪</span>
          </div>
        </div>
      );

    case "quotes":
      return (
        <div className="flex h-full items-center justify-center px-2">
          <div className="text-center">
            <Quote className="mx-auto h-5 w-5 text-white/80" />
            <p className="mt-1.5 font-display text-sm italic leading-snug text-white">
              &ldquo;kamu adalah puisi terbaik yang pernah kutulis.&rdquo;
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}
