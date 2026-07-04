"use client";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Stiker tunggal yang bisa digenggam & dilempar dengan inersia ringan —
 * tanpa engine physics penuh (cocok untuk satu elemen di section lain).
 * Bekerja di mouse maupun touch. Statis bila prefers-reduced-motion.
 */
export default function Sticker({
  children,
  rotate = 0,
  className = "",
}: {
  children: ReactNode;
  rotate?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 280, friction: 18 },
  }));

  const bind = useDrag(
    ({ down, movement: [mx, my], velocity: [vx, vy], direction: [dx, dy] }) => {
      api.start({
        x: down ? mx : mx + dx * vx * 90,
        y: down ? my : my + dy * vy * 90,
        immediate: down,
      });
    },
    { from: () => [x.get(), y.get()] },
  );

  if (reduced) {
    return (
      <div className={className} style={{ transform: `rotate(${rotate}deg)` }}>
        {children}
      </div>
    );
  }

  return (
    <animated.div
      {...bind()}
      data-cursor="genggam aku ✿"
      className={`cursor-grab touch-none select-none active:cursor-grabbing ${className}`}
      style={{ x, y, rotate, touchAction: "none" }}
    >
      {children}
    </animated.div>
  );
}
