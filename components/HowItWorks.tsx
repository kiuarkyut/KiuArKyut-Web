"use client";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    n: "01",
    title: "pilih tema & paket",
    desc: "intip galeri tema dan paket harga, lalu pilih yang paling pas dengan ceritamu.",
  },
  {
    n: "02",
    title: "chat & kirim detail",
    desc: "kirim foto, pesan personal, tanggal jadian, dan detail lain lewat whatsapp.",
  },
  {
    n: "03",
    title: "kami buatkan websitenya",
    desc: "kami rangkai semuanya jadi website yang dibuat tangan — rapi dan berkarakter.",
  },
  {
    n: "04",
    title: "terima link + qr code",
    desc: "dapat link & qr code yang siap kamu pakai buat mengejutkan dia ✿",
  },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="section-pad">
      <div className="container-max">
        <SectionHeading
          eyebrow="semudah itu"
          title="cara kerja"
          subtitle="empat langkah santai, dari ide di kepalamu sampai jadi kejutan yang dia buka sambil senyum."
        />

        <div className="mt-14 space-y-2">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <div
                className={`flex flex-col gap-2 border-t border-ink/12 py-8 sm:flex-row sm:items-baseline sm:gap-10 ${
                  // drift kiri/kanan bergantian
                  i % 2 === 1 ? "sm:pl-[12%]" : "sm:pr-[12%]"
                }`}
              >
                <span className="font-display text-5xl font-extrabold text-accent-c sm:text-6xl">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold lowercase text-ink sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-base leading-relaxed text-ink/65">
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
