// Preset spring & Framer variants bersama — easing konsisten = tanda craft.
import type { Variants, Transition } from "framer-motion";

// Spring "bouncy" lembut (echo react-spring { tension: 280, friction: 18 }).
export const springSoft: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 18,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 26,
};

// Reveal-on-scroll ringan, naik + fade.
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// Stagger container untuk daftar kartu.
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};
