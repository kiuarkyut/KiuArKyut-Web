"use client";

import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  return (
    <section className="section-pad">
      <div className="container-max">
        <SectionHeading
          eyebrow="kata mereka"
          title="kejutan yang membekas"
          subtitle="cerita kecil dari mereka yang sudah bikin orang tersayang tersenyum."
        />

        {/* CATATAN: testimoni di bawah PLACEHOLDER (fiktif).
            Ganti dengan yang asli lewat array `testimonials` di lib/data.ts. */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure
                className={`flex h-full flex-col rounded-2xl border border-ink/12 bg-paper-2 p-6 shadow-sticker ${
                  i % 2 === 0 ? "sm:-rotate-1" : "sm:rotate-1"
                }`}
              >
                <Quote className="h-7 w-7 text-accent-c/50" />
                <div className="mt-3 flex gap-0.5">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 text-butter"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-base leading-relaxed text-ink/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display font-bold text-paper">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">
                      {t.name}
                    </span>
                    <span className="block text-xs lowercase text-ink/55">
                      {t.handle}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
