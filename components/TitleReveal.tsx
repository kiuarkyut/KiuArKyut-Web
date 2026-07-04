"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

type TitleRevealProps = {
  text: string;
  className?: string;
};

/**
 * Judul yang "naik" per karakter saat masuk viewport (GSAP + ScrollTrigger).
 * Tanpa JS / dengan reduced-motion, teks tampil normal — tidak ada yang hilang.
 */
export default function TitleReveal({ text, className = "" }: TitleRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".tr-char", {
        yPercent: 115,
        rotate: 6,
        duration: 0.7,
        stagger: 0.02,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [text]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, wi) => (
        <span
          key={wi}
          aria-hidden="true"
          className="mr-[0.28em] inline-block overflow-hidden pb-[0.08em] align-top"
        >
          <span className="inline-block">
            {word.split("").map((ch, ci) => (
              <span key={ci} className="tr-char inline-block">
                {ch}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
