import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

/** Judul section: eyebrow tulisan-tangan + heading raksasa lowercase. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      <p className="font-hand text-2xl text-accent-c">{eyebrow}</p>
      <h2 className="mt-1 font-display text-h2 font-extrabold lowercase text-ink">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-ink/65">{subtitle}</p>
      )}
    </Reveal>
  );
}
