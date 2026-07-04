// Overlay tekstur kertas menyeluruh — menggantikan "gradient flat AI"
// dengan permukaan analog. Murni SVG feTurbulence (tanpa file gambar).

const NOISE_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220">
     <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/></filter>
     <rect width="100%" height="100%" filter="url(#n)"/>
   </svg>`,
);

export default function PaperTexture() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.09] mix-blend-soft-light"
      style={{
        backgroundImage: `url("data:image/svg+xml,${NOISE_SVG}")`,
        backgroundSize: "220px 220px",
      }}
    />
  );
}
