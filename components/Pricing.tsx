"use client";

import { Check, Star } from "lucide-react";
import { plans } from "@/lib/data";
import { waLink } from "@/lib/whatsapp";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Pricing() {
  return (
    <section id="harga" className="section-pad">
      <div className="container-max">
        <SectionHeading
          eyebrow="pilih paketmu"
          title="harga yang bersahabat"
          subtitle="mulai dari semanis rp 25.000. semua paket langsung terhubung ke whatsapp buat pesan."
        />

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-4">
          {plans.map((plan, i) => {
            const popular = plan.popular;
            return (
              <Reveal key={plan.id} delay={(i % 4) * 0.07} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-2xl p-6 transition-transform duration-200 ${
                    popular
                      ? "-rotate-1 bg-accent text-paper shadow-lift lg:scale-[1.04]"
                      : "border border-ink/12 bg-paper-2 text-ink shadow-sticker hover:-translate-y-1"
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-xs font-semibold lowercase text-paper">
                      <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                      paling populer
                    </span>
                  )}

                  <h3 className="font-display text-2xl font-bold lowercase">
                    {plan.name.toLowerCase()}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      popular ? "text-paper/80" : "text-ink/60"
                    }`}
                  >
                    {plan.tagline}
                  </p>

                  <div className="mt-5 font-display text-3xl font-extrabold">
                    {plan.price}
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <span
                          className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                            popular ? "bg-paper/25 text-paper" : "bg-accent/15 text-accent-c"
                          }`}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span className={popular ? "text-paper/90" : "text-ink/75"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={waLink(plan.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="ayo pesan ♥"
                    className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold lowercase transition-all duration-200 hover:-translate-y-0.5 ${
                      popular
                        ? "bg-paper text-accent-c shadow-sticker"
                        : "bg-accent text-paper shadow-sticker hover:shadow-lift"
                    }`}
                  >
                    {plan.cta.toLowerCase()}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-sm lowercase text-ink/60">
          harga bisa berubah sesuai kerumitan. bingung pilih yang mana?{" "}
          <a
            href={waLink(
              "Halo KiuArKyut! Aku bingung pilih paket, boleh dibantu? 💕",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent-c underline-offset-4 hover:underline"
          >
            tanya dulu, yuk
          </a>
          .
        </p>
      </div>
    </section>
  );
}
