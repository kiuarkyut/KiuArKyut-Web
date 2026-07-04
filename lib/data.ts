// =============================================================================
// DATA TEMA & PAKET HARGA
// -----------------------------------------------------------------------------
// Edit di file ini saja untuk menambah/mengubah tema atau paket harga.
// Komponen membaca data dari sini, jadi tidak perlu menyentuh file komponen.
// =============================================================================

export type Theme = {
  id: string;
  name: string;
  description: string;
  /** Kelas gradient Tailwind untuk mini-mockup & aksen kartu. */
  gradient: string;
  /** Warna glow lembut di belakang kartu saat hover. */
  glow: string;
  /** Menentukan bentuk mini-mockup CSS yang dirender (tanpa gambar eksternal). */
  preview:
    | "stars"
    | "polaroid"
    | "letter"
    | "countdown"
    | "slideshow"
    | "quotes";
};

export const themes: Theme[] = [
  {
    id: "starry-night",
    name: "Starry Night",
    description:
      "Langit malam berbintang dengan konstelasi yang mengeja nama kalian berdua.",
    gradient: "from-indigo-500 via-purple-500 to-slate-900",
    glow: "rgba(129, 140, 248, 0.45)",
    preview: "stars",
  },
  {
    id: "polaroid-memories",
    name: "Polaroid Memories",
    description:
      "Scrapbook foto polaroid yang menata kenangan terindah kalian satu per satu.",
    gradient: "from-amber-300 via-rose-300 to-pink-400",
    glow: "rgba(251, 191, 36, 0.4)",
    preview: "polaroid",
  },
  {
    id: "love-letter",
    name: "Love Letter",
    description:
      "Surat cinta digital yang terbuka perlahan, mengantar setiap kata dari hatimu.",
    gradient: "from-rose-400 via-pink-400 to-fuchsia-500",
    glow: "rgba(244, 114, 182, 0.45)",
    preview: "letter",
  },
  {
    id: "countdown-anniversary",
    name: "Countdown Anniversary",
    description:
      "Hitung mundur ke hari spesial atau hitung maju sejak hari jadian kalian.",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    glow: "rgba(56, 189, 248, 0.4)",
    preview: "countdown",
  },
  {
    id: "photo-slideshow",
    name: "Galeri Foto Slideshow",
    description:
      "Galeri foto yang bergulir lembut diiringi lagu kesayangan kalian berdua.",
    gradient: "from-fuchsia-500 via-purple-500 to-violet-600",
    glow: "rgba(192, 132, 252, 0.45)",
    preview: "slideshow",
  },
  {
    id: "quotes-puisi",
    name: "Quotes & Puisi",
    description:
      "Kumpulan kata-kata romantis dan puisi yang dirangkai khusus untuk dia.",
    gradient: "from-emerald-400 via-teal-400 to-cyan-500",
    glow: "rgba(45, 212, 191, 0.4)",
    preview: "quotes",
  },
];

// -----------------------------------------------------------------------------

export type Plan = {
  id: string;
  name: string;
  /** Harga tampil apa adanya, mis. "Rp 25.000" atau "Menyesuaikan". */
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  /** Pesan WhatsApp khusus paket ini. */
  waMessage: string;
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "Rp 25.000",
    tagline: "Manis & simpel untuk kejutan kilat",
    features: [
      "1 halaman website statis",
      "1 tema pilihan (template)",
      "Teks pesan personal",
      "Link website siap dibagikan",
      "Revisi minor 1x",
    ],
    cta: "Pesan Basic",
    waMessage:
      "Halo KiuArKyut! Aku mau pesan paket Basic (Rp 25.000) untuk surprise 💕",
  },
  {
    id: "standar",
    name: "Standar",
    price: "Rp 50.000",
    tagline: "Lebih personal, lebih berkesan",
    features: [
      "Semua fitur Basic",
      "Upload beberapa foto kenangan",
      "Kustomisasi warna & teks",
      "Background music",
      "QR code untuk surprise",
      "Revisi 2x",
    ],
    cta: "Pesan Standar",
    waMessage:
      "Halo KiuArKyut! Aku mau pesan paket Standar (Rp 50.000) untuk surprise 💕",
  },
  {
    id: "premium",
    name: "Premium",
    price: "Rp 100.000",
    tagline: "Pengalaman penuh, bikin dia speechless",
    features: [
      "Semua fitur Standar",
      "Multi-section (galeri, countdown, surat, dll)",
      "Animasi & efek interaktif",
      "Galeri foto tanpa batas",
      "Domain custom-friendly",
      "Revisi 3x + prioritas pengerjaan",
    ],
    cta: "Pesan Premium",
    waMessage:
      "Halo KiuArKyut! Aku mau pesan paket Premium (Rp 100.000) untuk surprise 💕",
    popular: true,
  },
  {
    id: "full-custom",
    name: "Full Custom",
    price: "Menyesuaikan",
    tagline: "Wujudkan ide unikmu sebebas-bebasnya",
    features: [
      "Desain & fitur 100% sesuai keinginan",
      "Konsep eksklusif (bukan template)",
      "Fitur khusus (peta perjalanan, mini-game, dll)",
      "Konsultasi langsung",
      "Revisi sesuai kesepakatan",
    ],
    cta: "Konsultasi Custom",
    waMessage:
      "Halo KiuArKyut! Aku mau konsultasi paket Full Custom untuk surprise spesial 💕",
  },
];

// -----------------------------------------------------------------------------
// TESTIMONI — PLACEHOLDER.
// Ganti dengan testimoni asli nanti. Nama & cerita di bawah hanya contoh.
// -----------------------------------------------------------------------------

export type Testimonial = {
  name: string;
  handle: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Dina",
    handle: "Surprise anniversary",
    quote:
      "Pacarku sampai nangis pas buka linknya. Temanya Starry Night, persis kayak yang aku bayangin. Worth it banget!",
    rating: 5,
  },
  {
    name: "Reza",
    handle: "Hadiah ulang tahun",
    quote:
      "Prosesnya cepet dan ramai banget dibantu. QR code-nya aku tempel di kado, dia kaget pas scan. Keren!",
    rating: 5,
  },
  {
    name: "Putri",
    handle: "Kejutan jarak jauh",
    quote:
      "LDR jadi kerasa dekat. Galeri fotonya cantik dan ada lagu kita. Makasih KiuArKyut sudah bantu nyenengin dia 🥹",
    rating: 5,
  },
];

// -----------------------------------------------------------------------------

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Berapa lama pengerjaannya?",
    answer:
      "Rata-rata 1–3 hari tergantung paket dan kelengkapan detail yang kamu kirim. Paket Premium dapat prioritas pengerjaan.",
  },
  {
    question: "Apa yang perlu saya siapkan?",
    answer:
      "Cukup siapkan foto, pesan/teks personal, tanggal penting (mis. tanggal jadian), dan tema yang kamu suka. Sisanya kami yang rapikan.",
  },
  {
    question: "Apakah dapat link & QR code?",
    answer:
      "Iya! Kamu dapat link website yang bisa langsung dibagikan, plus QR code (mulai paket Standar) supaya momen kejutannya makin seru.",
  },
  {
    question: "Bisa custom request?",
    answer:
      "Sangat bisa. Pilih paket Full Custom untuk konsep eksklusif, atau diskusikan tambahan fitur di paket lain lewat chat WhatsApp.",
  },
  {
    question: "Bagaimana cara pembayarannya?",
    answer:
      "Pembayaran lewat transfer bank atau e-wallet. Detailnya kami kirim saat kamu konfirmasi pesanan di WhatsApp.",
  },
  {
    question: "Websitenya aktif berapa lama?",
    answer:
      "Website aktif minimal 1 tahun. Mau diperpanjang atau dipindah ke domain sendiri? Bisa banget, tinggal kabari kami.",
  },
];
