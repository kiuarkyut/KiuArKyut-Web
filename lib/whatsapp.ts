// Nomor WhatsApp pemilik jasa (format internasional: 0 depan diganti 62).
export const WHATSAPP_NUMBER = "6285657075953";

/**
 * Membuat link wa.me dengan pesan yang sudah terisi.
 * Dipakai semua tombol CTA agar konsisten.
 */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Pesan default yang sering dipakai (navbar / hero / CTA umum).
export const DEFAULT_WA_MESSAGE =
  "Halo KiuArKyut! Aku mau pesan website surprise untuk orang spesial 💕";
