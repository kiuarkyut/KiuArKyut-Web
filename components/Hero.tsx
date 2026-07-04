"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Heart } from "lucide-react";
import StickerPlayground from "./physics/StickerPlayground";
import { gsap, registerGsap } from "@/lib/gsap";
import { waLink, DEFAULT_WA_MESSAGE } from "@/lib/whatsapp";

// Kata headline; sebagian diberi warna aksen.
const WORDS = [
  { t: "kejutan" },
  { t: "untuk" },
  { t: "dia" },
  { t: "yang" },
  { t: "spesial.", accent: true },
];

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    registerGsap();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        yPercent: 110,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.3,
      });
    }, headlineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="beranda"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      {/* Playground stiker mengisi hero; teks di atasnya (pointer pass-through). */}
      <div className="absolute inset-0 z-0">
        <StickerPlayground />
      </div>

      {/* Sorot midnight lembut agar headline terbaca di atas stiker warna-warni. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 z-[1] h-[38rem] w-[44rem] -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(15,10,30,0.9) 0%, rgba(15,10,30,0) 70%)",
        }}
      />

      <div className="container-max pointer-events-none relative z-10">
        <div className="max-w-3xl">
          <p className="font-hand text-2xl text-accent-c sm:text-3xl">
            kejutan untuk dia yang spesial
          </p>

          <h1
            ref={headlineRef}
            className="mt-2 font-display text-hero font-extrabold lowercase text-ink"
          >
            {WORDS.map((w, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden">
                <span
                  className={`hero-word inline-block ${
                    w.accent ? "text-gradient" : ""
                  }`}
                >
                  {w.t}
                </span>
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            kami racik website hadiah surprise yang bisa kamu genggam, lempar,
            lalu kirim ke orang tersayang. kamu cukup cerita — sisanya kami yang
            rangkai jadi kejutan manis.
          </p>

          <p className="mt-3 font-hand text-xl text-ink/55">
            (sentuh bunganya, lalu genggam hatinya)
          </p>

          <div className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="ayo pesan ♥"
              className="btn-primary lowercase"
            >
              pesan sekarang
              <Heart className="h-4 w-4" fill="currentColor" strokeWidth={0} />
            </a>
            <a
              href="#tema"
              data-cursor="lihat ♥"
              className="btn-outline lowercase"
            >
              lihat tema
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-6 text-sm lowercase text-ink/50">
            mulai dari rp 25.000 · jadi dalam 1–3 hari
          </p>
        </div>
      </div>
    </section>
  );
}
