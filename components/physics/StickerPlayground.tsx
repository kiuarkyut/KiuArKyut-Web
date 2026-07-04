"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Matter from "matter-js";
import { stickers, type StickerDef } from "@/lib/stickers";
import StickerVisual from "./StickerVisual";

// Dimensi body/elemen per jenis stiker (note lebih lebar, polaroid lebih tinggi).
function dims(def: StickerDef, scale: number): { w: number; h: number } {
  const s = def.size * scale;
  if (def.kind === "note") return { w: s, h: s * 0.55 };
  if (def.kind === "polaroid") return { w: s, h: s * 1.15 };
  return { w: s, h: s };
}

// Akses handler internal Matter.Mouse untuk mengganti perilaku touch.
type MouseInternal = Matter.Mouse & {
  mousewheel: EventListener;
  mousemove: EventListener;
  mousedown: EventListener;
  mouseup: EventListener;
};

/**
 * SIGNATURE — Sticker Playground (matter.js).
 * Stiker hati/kelopak/polaroid/catatan yang bisa digenggam, dilempar,
 * bertabrakan, lalu jatuh & menetap. Bunga/hati juga menyebar saat kursor dekat.
 *
 * - Desktop: genggam/lempar via mouse + dorongan saat kursor dekat.
 * - Mobile: genggam/lempar via touch. Scroll halaman tetap lancar karena drag
 *   hanya aktif saat jari benar-benar menyentuh stiker (hit-test); selain itu
 *   sentuhan diteruskan ke scroll. Jumlah stiker dikurangi demi performa.
 * - prefers-reduced-motion: stiker statis tertata rapi (tanpa physics).
 * - Loop di-pause saat keluar viewport / tab disembunyikan.
 */
export default function StickerPlayground({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [usePhysics, setUsePhysics] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setUsePhysics(!reduced);
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Mobile: pakai 7 stiker pertama & sedikit lebih kecil agar ringan & rapi.
  const list = useMemo(
    () => (isMobile ? stickers.slice(0, 7) : stickers),
    [isMobile],
  );
  const scale = isMobile ? 0.82 : 1;

  useEffect(() => {
    if (!usePhysics) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;
    if (W < 10 || H < 10) return;

    const {
      Engine,
      World,
      Bodies,
      Body,
      Mouse,
      MouseConstraint,
      Composite,
      Query,
    } = Matter;

    const fine = window.matchMedia("(pointer: fine)").matches;

    const engine = Engine.create();
    engine.gravity.y = 1;
    const world = engine.world;

    // Dinding pembatas (statis) di sekeliling area.
    const t = 240;
    const makeWalls = (w: number, h: number) => [
      Bodies.rectangle(w / 2, h + t / 2, w + 2 * t, t, { isStatic: true }),
      Bodies.rectangle(w / 2, -t / 2 - h * 0.4, w + 2 * t, t, { isStatic: true }),
      Bodies.rectangle(-t / 2, h / 2, t, h * 3, { isStatic: true }),
      Bodies.rectangle(w + t / 2, h / 2, t, h * 3, { isStatic: true }),
    ];
    let walls = makeWalls(W, H);
    World.add(world, walls);

    // Body per stiker — diseed di posisi awal, lalu dijatuhkan gravitasi.
    const bodies = list.map((def) => {
      const d = dims(def, scale);
      const px = (def.x / 100) * W;
      const py = (def.y / 100) * H * 0.4;
      return Bodies.rectangle(px, py, d.w, d.h, {
        restitution: 0.62,
        friction: 0.08,
        frictionAir: 0.02,
        angle: (def.rotate * Math.PI) / 180,
        chamfer: { radius: 10 },
      });
    });
    World.add(world, bodies);

    // Genggam & lempar.
    const mouse = Mouse.create(container);
    const mc = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    World.add(world, mc);

    // Buang capture wheel + handler touch bawaan Matter (yang selalu
    // preventDefault & memblok scroll). Kita kelola touch sendiri.
    const m = mouse as MouseInternal;
    container.removeEventListener("wheel", m.mousewheel);
    container.removeEventListener("touchmove", m.mousemove);
    container.removeEventListener("touchstart", m.mousedown);
    container.removeEventListener("touchend", m.mouseup);

    // Touch: hanya genggam (dan blok scroll) bila jari menyentuh stiker.
    const localPoint = (touch: Touch) => {
      const r = container.getBoundingClientRect();
      return { x: touch.clientX - r.left, y: touch.clientY - r.top };
    };
    let grabbing = false;
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      grabbing = Query.point(bodies, localPoint(touch)).length > 0;
      if (grabbing) m.mousedown(e); // preventDefault internal → blok scroll
    };
    const onTouchMove = (e: TouchEvent) => {
      if (grabbing) m.mousemove(e);
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (grabbing) m.mouseup(e);
      grabbing = false;
    };
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    // "Touch the flowers": dorong lembut stiker dekat kursor (desktop saja).
    const onPointerMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      for (const b of bodies) {
        const dx = b.position.x - mx;
        const dy = b.position.y - my;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 130) {
          const f = (1 - dist / 130) * 0.011 * b.mass;
          Body.applyForce(b, b.position, {
            x: (dx / dist) * f,
            y: (dy / dist) * f - 0.001 * b.mass,
          });
        }
      }
    };
    if (fine) container.addEventListener("pointermove", onPointerMove);

    // Loop manual + sinkron DOM. Bisa di-pause.
    let raf = 0;
    let running = true;
    const step = () => {
      Engine.update(engine, 1000 / 60);
      for (let i = 0; i < bodies.length; i++) {
        const el = elRefs.current[i];
        if (!el) continue;
        const b = bodies[i];
        const d = dims(list[i], scale);
        el.style.transform = `translate(${b.position.x - d.w / 2}px, ${
          b.position.y - d.h / 2
        }px) rotate(${b.angle}rad)`;
      }
      if (running) raf = requestAnimationFrame(step);
    };
    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(step);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(container);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      const nr = container.getBoundingClientRect();
      Composite.remove(world, walls);
      walls = makeWalls(nr.width, nr.height);
      World.add(world, walls);
    });
    ro.observe(container);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      World.clear(world, false);
      Engine.clear(engine);
    };
  }, [usePhysics, list, scale]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full ${className}`}
      aria-label="papan stiker yang bisa digenggam dan dilempar"
    >
      {list.map((def, i) => {
        const d = dims(def, scale);
        const staticStyle: React.CSSProperties = usePhysics
          ? { left: 0, top: 0, transform: "translate(-9999px,-9999px)" }
          : {
              left: `${def.x}%`,
              top: `${def.y}%`,
              transform: `translate(-50%, -50%) rotate(${def.rotate}deg)`,
            };
        return (
          <div
            key={def.id}
            ref={(el) => {
              elRefs.current[i] = el;
            }}
            data-cursor={usePhysics ? "genggam aku ✿" : undefined}
            className={`absolute select-none ${
              usePhysics ? "cursor-grab touch-none active:cursor-grabbing" : ""
            } ${!usePhysics && def.kind !== "polaroid" ? "animate-bob" : ""}`}
            style={{ width: d.w, height: d.h, ...staticStyle }}
            aria-hidden="true"
          >
            <StickerVisual def={def} />
          </div>
        );
      })}
    </div>
  );
}
