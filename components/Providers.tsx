"use client";

import { useLenis } from "@/hooks/useLenis";
import PaperTexture from "./PaperTexture";
import Cursor from "./Cursor";
import Preloader from "./Preloader";

/**
 * Pembungkus client untuk seluruh halaman:
 * - smooth scroll Lenis (sinkron GSAP ScrollTrigger)
 * - overlay tekstur kertas, custom cursor, dan preloader
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  useLenis();

  return (
    <>
      <Preloader />
      <PaperTexture />
      <Cursor />
      {children}
    </>
  );
}
