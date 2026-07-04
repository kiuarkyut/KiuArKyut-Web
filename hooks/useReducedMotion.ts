"use client";

import { useEffect, useState } from "react";

/**
 * Mengembalikan true bila pengguna memilih prefers-reduced-motion.
 * Dipakai untuk mematikan physics, marquee, & gerak berat.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
