"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

type RevealProps = {
  children: ReactNode;
  /** Delay tambahan (detik) untuk efek bertahap. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

/**
 * Pembungkus fade-up saat elemen masuk viewport.
 * Menghormati prefers-reduced-motion lewat Framer Motion + CSS global.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
