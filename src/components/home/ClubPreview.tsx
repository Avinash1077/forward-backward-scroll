import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useSectionScroll } from "./useSectionScroll";

function Card({
  p,
  index,
  title,
}: {
  p: MotionValue<number>;
  index: number;
  title: string;
}) {
  const start = 0.35 + index * 0.06;
  const opacity = useTransform(p, [start, start + 0.09], [0, 1]);
  const y = useTransform(p, [start, start + 0.12], [36, 0]);

  return (
    <motion.li
      style={{ opacity, y }}
      className="rounded-full border border-border bg-card/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm will-change-transform sm:text-sm"
    >
      {title}
    </motion.li>
  );
}

export function ClubPreview({
  eyebrow,
  backdropWord,
  tagline,
  description,
  topics,
  image,
  imageAlt,
  href,
  cta,
  reversed = false,
}: {
  eyebrow: string;
  backdropWord: string;
  tagline: string;
  description: string;
  topics: string[];
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
  reversed?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref);

  const wordX = useTransform(p, [0, 1], reversed ? ["18%", "-18%"] : ["-18%", "18%"]);
  const wordOpacity = useTransform(p, [0, 0.5, 1], [0.03, 0.12, 0.03]);
  const imgScale = useTransform(p, [0, 0.55, 1], [1.2, 1, 1.06]);
  const imgOpacity = useTransform(p, [0, 0.25], [0.4, 1]);
  const textY = useTransform(p, [0, 0.55], [90, 0]);
  const textOpacity = useTransform(p, [0.05, 0.35, 0.9, 1], [0, 1, 1, 0.35]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <motion.span
        style={{ x: wordX, opacity: wordOpacity }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-center font-display text-[22vw] font-bold leading-none will-change-transform"
      >
        {backdropWord}
      </motion.span>

      <div
        className={`relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-border">
          <motion.img
            src={image}
            alt={imageAlt}
            width={1600}
            height={1000}
            loading="lazy"
            style={{ scale: imgScale, opacity: imgOpacity }}
            className="h-full w-full object-cover will-change-transform"
          />
        </div>

        <motion.div style={{ y: textY, opacity: textOpacity }} className="will-change-transform">
          <h2 className="text-3xl font-bold sm:text-5xl">{eyebrow}</h2>
          <p className="mt-3 text-sm uppercase tracking-[0.3em] text-primary">{tagline}</p>
          <p className="mt-6 text-base text-muted-foreground sm:text-lg">{description}</p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {topics.map((t, i) => (
              <Card key={t} p={p} index={i} title={t} />
            ))}
          </ul>
          <a
            href={href}
            className="mt-9 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            {cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
