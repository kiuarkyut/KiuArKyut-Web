import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import HowItWorks from "@/components/HowItWorks";
import ThemeRevealList from "@/components/ThemeRevealList";
import WhyKiuArKyut from "@/components/WhyKiuArKyut";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { waLink, DEFAULT_WA_MESSAGE } from "@/lib/whatsapp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee
          text="buat dia tersenyum"
          separator="✿"
          href={waLink(DEFAULT_WA_MESSAGE)}
          tone="accent"
          durationSec={22}
          reactivity={1.2}
        />
        <HowItWorks />
        <ThemeRevealList />
        <WhyKiuArKyut />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
