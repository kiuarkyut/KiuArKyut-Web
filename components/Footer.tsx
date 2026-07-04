import { Heart, MessageCircle, Instagram } from "lucide-react";
import { waLink, WHATSAPP_NUMBER, DEFAULT_WA_MESSAGE } from "@/lib/whatsapp";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/socials";
import Marquee from "./Marquee";

const NAV_LINKS = [
  { label: "beranda", href: "#beranda" },
  { label: "cara kerja", href: "#cara-kerja" },
  { label: "tema", href: "#tema" },
  { label: "harga", href: "#harga" },
  { label: "faq", href: "#faq" },
];

const displayNumber = "0" + WHATSAPP_NUMBER.slice(2);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10">
      {/* Footer marquee — echo footer referensi. */}
      <Marquee
        text="kiuarkyut · bikin kejutan"
        separator="♥"
        tone="plain"
        durationSec={34}
        reactivity={0.7}
      />

      <div className="container-max py-14">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a
              href="#beranda"
              className="font-display text-2xl font-extrabold lowercase"
            >
              <span className="text-gradient">kiuarkyut</span>
              <span className="text-accent-c">.</span>
            </a>
            <p className="mt-3 max-w-xs text-base leading-relaxed text-ink/65">
              papan kenangan penuh stiker yang bisa kamu genggam — hadiah
              surprise romantis untuk orang tersayang.
            </p>
          </div>

          <div>
            <h3 className="label">jelajahi</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-base lowercase text-ink/70 transition-colors hover:text-accent-c"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label">hubungi kami</h3>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={waLink(DEFAULT_WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="ayo pesan ♥"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent-c"
              >
                <MessageCircle className="h-4 w-4" />
                {displayNumber}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="intip dulu ♥"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium lowercase text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent-c"
              >
                <Instagram className="h-4 w-4" />
                {INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink/12 pt-6 text-sm lowercase text-ink/55 sm:flex-row sm:items-center">
          <p>© {year} kiuarkyut. semua kenangan dibuat dengan hati.</p>
          <p className="inline-flex items-center gap-1.5">
            made with
            <Heart className="h-4 w-4 text-accent-c" fill="currentColor" strokeWidth={0} />
            untuk yang sedang jatuh cinta
          </p>
        </div>
      </div>
    </footer>
  );
}
