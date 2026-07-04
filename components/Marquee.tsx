"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

type MarqueeProps = {
  text: string;
  /** pemisah antar frasa (mis. ✿ atau ♥) */
  separator?: string;
  /** bila ada, seluruh marquee jadi tautan (WhatsApp) */
  href?: string;
  tone?: "accent" | "plain";
  /** durasi satu putaran (detik). Lebih besar = lebih pelan. Default 26. */
  durationSec?: number;
  /** kekuatan reaksi terhadap velocity scroll (0 = diam, 1 = normal). Default 1. */
  reactivity?: number;
  className?: string;
};

/**
 * Marquee infinite loop yang BEREAKSI pada velocity scroll —
 * scroll cepat = marquee melaju & sedikit miring (signature ala referensi).
 * Statis bila prefers-reduced-motion.
 */
export default function Marquee({
  text,
  separator = "✿",
  href,
  tone = "accent",
  durationSec = 26,
  reactivity = 1,
  className = "",
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        ease: "none",
        duration: durationSec,
      });

      const setSkew = gsap.quickSetter(track, "skewX", "deg");
      const proxy = { skew: 0, ts: 1 };

      const st = ScrollTrigger.create({
        trigger: track,
        onUpdate: (self) => {
          const v = self.getVelocity();
          const skew = gsap.utils.clamp(-9, 9, (v / 130) * reactivity);
          tl.timeScale(1 + Math.min(Math.abs(v) / 500, 5) * reactivity);
          setSkew(skew);
          gsap.killTweensOf(proxy);
          proxy.skew = skew;
          proxy.ts = tl.timeScale();
          gsap.to(proxy, {
            skew: 0,
            ts: 1,
            duration: 0.6,
            ease: "power3",
            onUpdate: () => {
              setSkew(proxy.skew);
              tl.timeScale(proxy.ts);
            },
          });
        },
      });

      return () => st.kill();
    }, track);

    return () => ctx.revert();
  }, [durationSec, reactivity]);

  // Satu kelompok frasa; dirender dua kali agar loop -50% mulus.
  const group = Array.from({ length: 5 }).map((_, i) => (
    <span key={i} className="flex items-center gap-6 pr-6">
      <span>{text}</span>
      <span className="opacity-70">{separator}</span>
    </span>
  ));

  const toneClass =
    tone === "accent"
      ? "bg-accent text-paper"
      : "border-y border-ink/10 bg-paper-2 text-ink";

  const inner = (
    <div className={`overflow-hidden py-5 ${toneClass} ${className}`}>
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap font-display text-2xl font-bold lowercase sm:text-4xl"
      >
        <div className="flex">{group}</div>
        <div className="flex" aria-hidden="true">
          {group}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="buat dia tersenyum ♥"
        className="block transition-opacity hover:opacity-95"
        aria-label="Hubungi via WhatsApp"
      >
        {inner}
      </a>
    );
  }
  return inner;
}
