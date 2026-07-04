"use client";

import { useLenis } from "@/hooks/useLenis";
import PaperTexture from "./PaperTexture";
import Cursor from "./Cursor";
import Preloader from "./Preloader";
import HeartsBackground from "./three/HeartsBackground";

/**
 * Pembungkus client untuk seluruh halaman:
 * - smooth scroll Lenis (sinkron GSAP ScrollTrigger)
 * - background Three.js (bintang + hati melayang) di belakang semua konten
 * - overlay tekstur kertas, custom cursor, dan preloader
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  useLenis();

  return (
    <>
      <Preloader />
      <HeartsBackground />
      <PaperTexture />
      <Cursor />
      {children}
    </>
  );
}
