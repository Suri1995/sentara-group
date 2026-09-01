import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className={`heading-lg ${light ? "text-white" : ""}`}>{title}</h2>
      <div
        className={`divider-gold my-5 ${align === "center" ? "mx-auto" : ""}`}
      />
      {description && (
        <p className={`body-lg ${light ? "text-white/70" : ""}`}>{description}</p>
      )}
    </Reveal>
  );
}
