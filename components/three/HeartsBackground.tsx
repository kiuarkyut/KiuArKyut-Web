"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// =============================================================================
// Background Three.js seluruh halaman: taburan bintang + hati yang melayang.
// - Warna mengikuti tema (baca data-theme di <html>, ikut berubah saat toggle)
// - Parallax halus mengikuti mouse + ikut bergeser saat scroll
// - Hemat: DPR dibatasi, jeda saat tab tersembunyi, statis bila reduced-motion
// =============================================================================

type Palette = {
  colors: string[];
  starOpacity: number;
  heartOpacity: number;
  /** Additive menyala di latar gelap; normal agar tetap terlihat di latar krem. */
  blending: THREE.Blending;
};

const PALETTES: Record<"dark" | "light", Palette> = {
  dark: {
    colors: ["#FF8FB1", "#A78BFA", "#F5D5A8", "#F7A8C4"],
    starOpacity: 0.85,
    heartOpacity: 0.8,
    blending: THREE.AdditiveBlending,
  },
  light: {
    colors: ["#E2477A", "#7C5CE0", "#D68A2B", "#F082A5"],
    starOpacity: 0.5,
    heartOpacity: 0.55,
    blending: THREE.NormalBlending,
  },
};

function currentTheme(): "dark" | "light" {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Tekstur glow bulat lembut untuk partikel bintang. */
function makeGlowTexture(): THREE.Texture {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Tekstur hati putih (ditint lewat warna material sprite). */
function makeHeartTexture(): THREE.Texture {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.shadowColor = "rgba(255,255,255,0.9)";
  ctx.shadowBlur = s * 0.09;
  ctx.beginPath();
  ctx.moveTo(s * 0.5, s * 0.84);
  ctx.bezierCurveTo(s * 0.04, s * 0.52, s * 0.12, s * 0.14, s * 0.5, s * 0.32);
  ctx.bezierCurveTo(s * 0.88, s * 0.14, s * 0.96, s * 0.52, s * 0.5, s * 0.84);
  ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function HeartsBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.innerWidth < 768;

    // --- Setup dasar ---------------------------------------------------------
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 14;

    const world = new THREE.Group();
    scene.add(world);

    const glowTex = makeGlowTexture();
    const heartTex = makeHeartTexture();

    // --- Bintang: satu cloud per warna palet ---------------------------------
    const STAR_COUNT = isMobile ? 70 : 130;
    const starClouds: THREE.Points[] = [];
    for (let ci = 0; ci < 4; ci++) {
      const positions = new Float32Array(STAR_COUNT * 3);
      for (let i = 0; i < STAR_COUNT; i++) {
        positions[i * 3] = THREE.MathUtils.randFloatSpread(38);
        positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(24);
        positions[i * 3 + 2] = THREE.MathUtils.randFloat(-9, 3);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        map: glowTex,
        size: 0.16 + ci * 0.05,
        transparent: true,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const cloud = new THREE.Points(geo, mat);
      // Fase acak agar tiap cloud berputar/berkelip tidak seragam.
      cloud.userData.phase = Math.random() * Math.PI * 2;
      cloud.userData.speed = 0.008 + ci * 0.004;
      starClouds.push(cloud);
      world.add(cloud);
    }

    // --- Hati melayang --------------------------------------------------------
    const HEART_COUNT = isMobile ? 8 : 16;
    type HeartData = {
      baseX: number;
      rise: number;
      swayAmp: number;
      swayFreq: number;
      phase: number;
      rotSpeed: number;
    };
    const hearts: THREE.Sprite[] = [];
    for (let i = 0; i < HEART_COUNT; i++) {
      const mat = new THREE.SpriteMaterial({
        map: heartTex,
        transparent: true,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      const scale = THREE.MathUtils.randFloat(0.35, 1.05);
      sprite.scale.setScalar(scale);
      sprite.position.set(
        THREE.MathUtils.randFloatSpread(30),
        THREE.MathUtils.randFloatSpread(20),
        THREE.MathUtils.randFloat(-5, 2),
      );
      const data: HeartData = {
        baseX: sprite.position.x,
        rise: THREE.MathUtils.randFloat(0.25, 0.7) * (scale * 0.8 + 0.4),
        swayAmp: THREE.MathUtils.randFloat(0.4, 1.4),
        swayFreq: THREE.MathUtils.randFloat(0.15, 0.45),
        phase: Math.random() * Math.PI * 2,
        rotSpeed: THREE.MathUtils.randFloatSpread(0.5),
      };
      sprite.userData = data;
      hearts.push(sprite);
      world.add(sprite);
    }

    // --- Palet mengikuti tema -------------------------------------------------
    const applyPalette = () => {
      const p = PALETTES[currentTheme()];
      starClouds.forEach((cloud, i) => {
        const mat = cloud.material as THREE.PointsMaterial;
        mat.color.set(p.colors[i % p.colors.length]);
        mat.opacity = p.starOpacity;
        mat.blending = p.blending;
        mat.needsUpdate = true;
      });
      hearts.forEach((sprite, i) => {
        const mat = sprite.material as THREE.SpriteMaterial;
        mat.color.set(p.colors[i % p.colors.length]);
        mat.opacity = p.heartOpacity;
        mat.blending = p.blending;
        mat.needsUpdate = true;
      });
    };
    applyPalette();

    const themeObserver = new MutationObserver(() => {
      applyPalette();
      if (reduced) renderer.render(scene, camera); // refresh frame statis
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // --- Interaksi: mouse parallax + scroll ------------------------------------
    const pointerTarget = new THREE.Vector2(0, 0);
    const onPointerMove = (e: PointerEvent) => {
      pointerTarget.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      );
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (reduced) renderer.render(scene, camera);
    };
    window.addEventListener("resize", onResize);

    // --- Loop -------------------------------------------------------------------
    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // Kamera mengejar posisi mouse — parallax lembut.
      camera.position.x += (pointerTarget.x * 1.4 - camera.position.x) * 0.03;
      camera.position.y += (-pointerTarget.y * 0.9 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      // Dunia bergeser pelan mengikuti scroll — kesan kedalaman antar section.
      world.position.y = window.scrollY * 0.0012;

      starClouds.forEach((cloud) => {
        cloud.rotation.y = t * cloud.userData.speed + cloud.userData.phase;
        cloud.rotation.x = Math.sin(t * 0.05 + cloud.userData.phase) * 0.04;
      });

      hearts.forEach((sprite) => {
        const d = sprite.userData as HeartData;
        sprite.position.y += d.rise * dt;
        if (sprite.position.y > 11) sprite.position.y = -11; // wrap ke bawah
        sprite.position.x =
          d.baseX + Math.sin(t * d.swayFreq + d.phase) * d.swayAmp;
        (sprite.material as THREE.SpriteMaterial).rotation +=
          d.rotSpeed * dt;
      });

      renderer.render(scene, camera);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      clock.start();
      tick();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduced) {
      renderer.render(scene, camera); // satu frame statis sebagai hiasan
    } else {
      start();
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // --- Bersih-bersih ------------------------------------------------------------
    return () => {
      stop();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      starClouds.forEach((c) => {
        c.geometry.dispose();
        (c.material as THREE.Material).dispose();
      });
      hearts.forEach((h) => h.material.dispose());
      glowTex.dispose();
      heartTex.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
