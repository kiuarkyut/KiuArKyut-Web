"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Custom cursor "genggam aku …".
 * Elemen dengan atribut data-cursor="..." akan memunculkan label saat di-hover.
 * Hanya aktif di perangkat pointer halus (desktop) — disembunyikan di touch.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || prefersReduced) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      setLabel(el ? el.getAttribute("data-cursor") : null);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <AnimatePresence mode="wait">
          {label ? (
            <motion.span
              key="label"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              className="whitespace-nowrap rounded-full bg-ink px-3 py-1.5 font-hand text-base text-paper shadow-sticker"
            >
              {label}
            </motion.span>
          ) : (
            <motion.span
              key="dot"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: down ? 0.7 : 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              className="block h-4 w-4 rounded-full border-2 border-accent bg-accent/20"
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
