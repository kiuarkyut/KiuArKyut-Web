"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad">
      <div className="container-max">
        <SectionHeading
          eyebrow="masih ragu?"
          title="pertanyaan yang sering ditanya"
          subtitle="kalau jawabanmu belum ada di sini, langsung chat kami saja ya."
        />

        <div className="mt-12 max-w-3xl">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.question} delay={i * 0.04}>
                <div className="border-b border-ink/12">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-semibold lowercase text-ink sm:text-xl">
                      {faq.question.toLowerCase()}
                    </span>
                    <span
                      className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border border-ink/15 transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-accent text-paper" : "text-accent-c"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-12 text-base leading-relaxed text-ink/70">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
