"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { themes } from "@/lib/data";
import { waLink } from "@/lib/whatsapp";
import ThemePreview from "./ThemePreview";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function ThemeRevealList() {
  const [hovered, setHovered] = useState<number | null>(null);

  // Preview mengikuti kursor (desktop).
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <section id="tema" className="section-pad">
      <div className="container-max">
        <SectionHeading
          eyebrow="pilih yang paling kamu"
          title="tema"
          subtitle="tiap tema punya karakter sendiri. arahkan kursor untuk mengintip, lalu pesan yang paling pas dengan ceritamu."
        />

        {/* Daftar besar ala referensi — hover memunculkan preview & aksen. */}
        <div className="mt-12 border-t border-ink/12" onMouseMove={onMove}>
          {themes.map((theme, i) => {
            const active = hovered === i;
            return (
              <Reveal key={theme.id} delay={(i % 6) * 0.04}>
                <div
                  className="group relative border-b border-ink/12"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                >
                  <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      {/* Thumbnail kecil — selalu tampak di mobile. */}
                      <div className="h-16 w-24 flex-none lg:hidden">
                        <ThemePreview theme={theme} />
                      </div>
                      <div>
                        <h3
                          data-cursor="lihat ♥"
                          className={`font-display text-3xl font-bold lowercase transition-colors duration-200 sm:text-5xl ${
                            active ? "text-accent-c" : "text-ink"
                          }`}
                        >
                          {theme.name.toLowerCase()}
                        </h3>
                        <p className="mt-1 max-w-md text-sm text-ink/60">
                          {theme.description}
                        </p>
                      </div>
                    </div>

                    <a
                      href={waLink(
                        `Halo KiuArKyut! Aku tertarik dengan tema '${theme.name}'. Bisa dibantu? 💕`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="ayo pesan ♥"
                      className="inline-flex w-fit items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium lowercase text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent-c"
                    >
                      pesan tema ini
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Preview mengambang mengikuti kursor — hanya desktop (pointer halus). */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key="float-preview"
            className="pointer-events-none fixed left-0 top-0 z-40 hidden h-44 w-64 lg:block"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            <div className="-translate-x-1/2 -translate-y-[120%] shadow-sticker-lg">
              <ThemePreview theme={themes[hovered]} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
