"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { waLink, DEFAULT_WA_MESSAGE } from "@/lib/whatsapp";

const NAV_LINKS = [
  { label: "beranda", href: "#beranda" },
  { label: "cara kerja", href: "#cara-kerja" },
  { label: "tema", href: "#tema" },
  { label: "harga", href: "#harga" },
  { label: "faq", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`container-max mt-3 flex items-center justify-between rounded-full transition-all duration-300 ${
          scrolled
            ? "border border-ink/10 bg-paper/80 py-2.5 shadow-sticker backdrop-blur-md"
            : "border border-transparent py-3"
        }`}
        aria-label="Navigasi utama"
      >
        <a
          href="#beranda"
          data-cursor="lihat ♥"
          className="px-2 font-display text-2xl font-extrabold lowercase tracking-tight"
        >
          <span className="text-gradient">kiuarkyut</span>
          <span className="text-accent-c">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium lowercase text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 pr-1">
          <a
            href={waLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="ayo pesan ♥"
            className="btn-primary hidden px-5 py-2.5 text-sm lowercase md:inline-flex"
          >
            pesan sekarang
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition-colors hover:bg-paper-2 md:hidden"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="container-max mt-2 overflow-hidden rounded-3xl border border-ink/10 bg-paper p-3 shadow-sticker-lg md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-lg font-semibold lowercase text-ink/80 transition-colors hover:bg-paper-2 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={waLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full lowercase"
            >
              pesan sekarang
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
