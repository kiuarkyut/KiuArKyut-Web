"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, Instagram, MessageCircle } from "lucide-react";
import { waLink, DEFAULT_WA_MESSAGE } from "@/lib/whatsapp";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/socials";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import Sticker from "./physics/Sticker";

export default function CTASection() {
  const reduced = useReducedMotion();

  return (
    <section className="px-5 py-16 sm:px-8 md:py-24">
      <Reveal className="container-max">
        <div className="relative overflow-hidden rounded-[2rem] bg-accent px-6 py-16 text-center text-paper sm:px-14">
          {/* Blob cahaya yang bernafas — hidup tapi tidak mengganggu teks. */}
          {!reduced && (
            <>
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full bg-paper/15 blur-3xl"
                animate={{ x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -right-14 h-80 w-80 rounded-full bg-butter/25 blur-3xl"
                animate={{ x: [0, -32, 0], y: [0, -20, 0], scale: [1.1, 1, 1.1] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}

          {/* Stiker hati yang bisa digenggam & dilempar (touch-friendly). */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            <div className="pointer-events-auto absolute left-[8%] top-10">
              <Sticker rotate={-12}>
                <Heart className="h-12 w-12 text-butter" fill="currentColor" strokeWidth={0} />
              </Sticker>
            </div>
            <div className="pointer-events-auto absolute right-[10%] top-20">
              <Sticker rotate={10}>
                <Heart className="h-9 w-9 text-blush" fill="currentColor" strokeWidth={0} />
              </Sticker>
            </div>
            <div className="pointer-events-auto absolute bottom-8 left-[18%]">
              <Sticker rotate={6}>
                <div className="rotate-3 rounded-md bg-paper px-3 py-1.5 font-hand text-lg text-ink shadow-sticker">
                  genggam aku ✿
                </div>
              </Sticker>
            </div>
          </div>

          <p className="relative font-hand text-2xl text-paper/90">
            yuk, bikin satu kejutan kecil hari ini
          </p>
          <h2 className="relative mx-auto mt-2 max-w-2xl font-display text-h2 font-extrabold lowercase">
            buat dia merasa paling dicinta ♥
          </h2>

          <div className="relative mt-9 flex justify-center">
            <Magnetic>
              <a
                href={waLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="ayo pesan ♥"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-paper px-7 py-3.5 font-semibold lowercase text-accent-c shadow-sticker transition-transform duration-200 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                pesan sekarang via whatsapp
              </a>
            </Magnetic>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="intip dulu ♥"
            className="relative mt-5 inline-flex items-center gap-1.5 text-sm lowercase text-paper/85 underline-offset-4 transition-colors hover:text-paper hover:underline"
          >
            <Instagram className="h-4 w-4" />
            masih mikir? intip hasil karya kami di {INSTAGRAM_HANDLE}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
