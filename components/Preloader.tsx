"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const DROPS = [
  { left: "18%", color: "#FF8FB1", delay: 0 }, // blush
  { left: "38%", color: "#F5D5A8", delay: 0.08 }, // gold
  { left: "58%", color: "#A78BFA", delay: 0.16 }, // lavender
  { left: "78%", color: "#F7A8C4", delay: 0.24 }, // rose
];

/**
 * Satu momen orkestrasi: stiker "berjatuhan" ke tempatnya, lalu headline naik.
 * ~1.2s, skippable (klik). Dilewati bila prefers-reduced-motion.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), 1200);
    return () => clearTimeout(t);
  }, [reduced]);

  // Kunci scroll selama preloader tampil.
  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          onClick={() => setDone(true)}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-paper"
        >
          {/* Stiker berjatuhan */}
          <div className="absolute inset-0 overflow-hidden">
            {DROPS.map((d, i) => (
              <motion.span
                key={i}
                className="absolute top-0"
                style={{ left: d.left, color: d.color }}
                initial={{ y: -80, opacity: 0, rotate: -20 }}
                animate={{ y: "46vh", opacity: 1, rotate: 12 }}
                transition={{
                  delay: d.delay,
                  duration: 0.7,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <Heart className="h-8 w-8" fill="currentColor" strokeWidth={0} />
              </motion.span>
            ))}
          </div>

          {/* Wordmark naik */}
          <div className="relative overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl font-extrabold lowercase tracking-tight text-gradient sm:text-7xl"
            >
              kiuarkyut
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
