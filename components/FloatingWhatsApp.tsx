"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { waLink, DEFAULT_WA_MESSAGE } from "@/lib/whatsapp";

/**
 * Tombol WhatsApp mengambang — muncul setelah pengunjung melewati hero,
 * supaya jalur "pesan sekarang" selalu satu klik dari mana pun.
 */
export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7"
        >
          <a
            href={waLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="ayo pesan ♥"
            aria-label="Pesan sekarang via WhatsApp"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-paper shadow-lift transition-transform duration-200 hover:-translate-y-1 hover:scale-105"
            style={{ animation: "wa-pulse 2.4s ease-out infinite" }}
          >
            <MessageCircle className="h-6 w-6" fill="currentColor" strokeWidth={0} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
