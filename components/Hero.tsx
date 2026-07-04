"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, Heart } from "lucide-react";
import StickerPlayground from "./physics/StickerPlayground";
import Magnetic from "./Magnetic";
import { gsap, registerGsap } from "@/lib/gsap";
import { waLink, DEFAULT_WA_MESSAGE } from "@/lib/whatsapp";

// =============================================================================
// Frasa headline yang berganti otomatis (loop). Kata dengan `accent: true`
// diberi warna gradient. Tambah/ubah frasa cukup di daftar ini.
// =============================================================================
type Word = { t: string; accent?: boolean };

const PHRASES: Word[][] = [
  [{ t: "kejutan" }, { t: "untuk" }, { t: "dia" }, { t: "yang" }, { t: "spesial.", accent: true }],
  [{ t: "untuk" }, { t: "my" }, { t: "pretty" }, { t: "cute.", accent: true }],
  [{ t: "for" }, { t: "my" }, { t: "handsome" }, { t: "boy.", accent: true }],
  [{ t: "kamu," }, { t: "alasan" }, { t: "senyumku.", accent: true }],
  [{ t: "di" }, { t: "matamu," }, { t: "aku" }, { t: "pulang.", accent: true }],
  [{ t: "satu" }, { t: "senyummu," }, { t: "seribu" }, { t: "bintang.", accent: true }],
  [{ t: "kamu" }, { t: "puisi" }, { t: "terindah.", accent: true }],
  [{ t: "rindu" }, { t: "yang" }, { t: "jadi" }, { t: "hadiah.", accent: true }],
];

// Preloader tampil ~1.2s + exit 0.6s — orkestrasi hero masuk tepat setelahnya.
const ENTRANCE_DELAY = 1.45;
// Lama frasa "diam" sebelum berganti (detik).
const HOLD = 3;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const delayedRef = useRef<gsap.core.Tween | null>(null);
  const reducedRef = useRef(false);
  const [idx, setIdx] = useState(0);
  const firstRender = useRef(true);

  const chars = () =>
    headlineRef.current
      ? headlineRef.current.querySelectorAll<HTMLElement>(".hero-char")
      : [];

  // Jadwalkan pergantian frasa berikutnya: tahan → keluar ke atas → ganti state.
  const scheduleNext = () => {
    delayedRef.current?.kill();
    delayedRef.current = gsap.delayedCall(HOLD, () => {
      gsap.to(chars(), {
        yPercent: -118,
        rotate: -5,
        duration: 0.5,
        stagger: 0.012,
        ease: "power3.in",
        onComplete: () => setIdx((i) => (i + 1) % PHRASES.length),
      });
    });
  };

  // Orkestrasi masuk (sekali) + parallax keluar saat scroll.
  useEffect(() => {
    registerGsap();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    reducedRef.current = reduced;
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: ENTRANCE_DELAY,
        defaults: { ease: "power3.out" },
      });
      tl.from(".hero-char", {
        yPercent: 118,
        rotate: 8,
        duration: 0.75,
        stagger: 0.024,
        ease: "power4.out",
      })
        .from(
          ".hero-sub",
          { y: 26, opacity: 0, duration: 0.55, stagger: 0.09 },
          "-=0.45",
        )
        // Mulai loop pergantian frasa setelah entrance selesai.
        .call(scheduleNext);

      gsap.to(contentRef.current, {
        yPercent: -16,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 35%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => {
      delayedRef.current?.kill();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Frasa baru masuk dari bawah tiap kali idx berganti (kecuali render pertama).
  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (reducedRef.current) return;

    const tween = gsap.fromTo(
      chars(),
      { yPercent: 118, rotate: 8 },
      {
        yPercent: 0,
        rotate: 0,
        duration: 0.7,
        stagger: 0.02,
        ease: "power4.out",
        onComplete: scheduleNext,
      },
    );
    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <section
      id="beranda"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      {/* Playground stiker mengisi hero; teks di atasnya (pointer pass-through). */}
      <div className="absolute inset-0 z-0">
        <StickerPlayground />
      </div>

      {/* Sorot lembut warna paper (ikut tema) agar headline terbaca di atas stiker. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 z-[1] h-[38rem] w-[44rem] -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--paper) / 0.9) 0%, rgb(var(--paper) / 0) 70%)",
        }}
      />

      <div className="container-max pointer-events-none relative z-10">
        <div ref={contentRef} className="max-w-3xl">
          <h1
            ref={headlineRef}
            className="min-h-[2.8em] font-display text-hero font-extrabold lowercase text-ink"
          >
            {/* Teks tetap untuk screen reader & SEO; frasa berganti hanya visual. */}
            <span className="sr-only">kejutan untuk dia yang spesial.</span>
            {PHRASES[idx].map((w, i) => (
              <span
                key={`${idx}-${i}`}
                aria-hidden="true"
                className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-top"
              >
                <span
                  className={`inline-block ${w.accent ? "text-gradient" : ""}`}
                >
                  {w.t.split("").map((ch, j) => (
                    <span key={j} className="hero-char inline-block">
                      {ch}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            kami racik website hadiah surprise yang bisa kamu genggam, lempar,
            lalu kirim ke orang tersayang. kamu cukup cerita — sisanya kami yang
            rangkai jadi kejutan manis.
          </p>

          <p className="hero-sub mt-3 font-hand text-xl text-ink/55">
            (sentuh bunganya, lalu genggam hatinya)
          </p>

          <div className="hero-sub pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <a
                href={waLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="ayo pesan ♥"
                className="btn-primary w-full lowercase sm:w-auto"
              >
                pesan sekarang
                <Heart className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a
                href="#tema"
                data-cursor="lihat ♥"
                className="btn-outline w-full lowercase sm:w-auto"
              >
                lihat tema
                <ArrowDown className="h-4 w-4" />
              </a>
            </Magnetic>
          </div>

          <p className="hero-sub mt-6 text-sm lowercase text-ink/50">
            mulai dari rp 25.000 · jadi dalam 1–3 hari
          </p>
        </div>
      </div>
    </section>
  );
}
