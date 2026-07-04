"use client";

import { Heart, MessageCircle } from "lucide-react";
import { waLink, DEFAULT_WA_MESSAGE } from "@/lib/whatsapp";
import Reveal from "./Reveal";
import Sticker from "./physics/Sticker";

export default function CTASection() {
  return (
    <section className="px-5 py-16 sm:px-8 md:py-24">
      <Reveal className="container-max">
        <div className="relative overflow-hidden rounded-[2rem] bg-accent px-6 py-16 text-center text-paper sm:px-14">
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
          </div>
        </div>
      </Reveal>
    </section>
  );
}
