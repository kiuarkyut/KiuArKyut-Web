"use client";

import Reveal from "./Reveal";

// Baris berlabel ala "about" di referensi.
const ROWS = [
  {
    label: "Untuk siapa",
    value: "pacar, sahabat, keluarga — siapa pun yang spesial",
  },
  {
    label: "Pengerjaan",
    value: "cepat, dibuat tangan, bukan template asal jadi",
  },
  {
    label: "Yang kamu dapat",
    value: "link website + QR code untuk dikejutkan",
  },
  { label: "Mulai dari", value: "Rp 25.000 — semanis itu" },
];

export default function WhyKiuArKyut() {
  return (
    <section className="section-pad">
      <div className="container-max">
        <Reveal>
          <p className="font-hand text-2xl text-accent-c">kenapa kiuarkyut</p>
        </Reveal>

        <div className="mt-8 border-t border-ink/12">
          {ROWS.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.06}>
              <div className="grid grid-cols-1 gap-1 border-b border-ink/12 py-6 sm:grid-cols-[200px_1fr] sm:gap-8 sm:py-7">
                <span className="label pt-1.5">{row.label}</span>
                <span className="font-display text-2xl font-semibold lowercase text-ink sm:text-3xl">
                  {row.value}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
