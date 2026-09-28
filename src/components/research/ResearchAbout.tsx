import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "@/lib/motion";
import researchImg from "@/assets/research.jpg";
import { useSectionScroll } from "@/components/home/useSectionScroll";

const stats = [
  { value: "12+", label: "Research Projects" },
  { value: "8", label: "Papers & Posters" },
  { value: "20+", label: "Active Members" },
  { value: "5", label: "Focus Areas" },
];

function Stat({
  p,
  index,
  value,
  label,
}: {
  p: MotionValue<number>;
  index: number;
  value: string;
  label: string;
}) {
  const step = 0.1;
  const start = 0.35 + index * step;
  const opacity = useTransform(p, [start, start + 0.12], [0, 1]);
  const y = useTransform(p, [start, start + 0.14], [30, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="rounded-2xl border border-border bg-card/50 p-5 text-center backdrop-blur-sm will-change-transform"
    >
      <p className="font-display text-3xl font-bold text-primary sm:text-4xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export function ResearchAbout() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref);

  const imgScale = useTransform(p, [0, 0.55, 1], [1.18, 1, 1.05]);
  const imgOpacity = useTransform(p, [0, 0.25], [0.35, 1]);
  const textY = useTransform(p, [0, 0.5], [70, 0]);
  const textOpacity = useTransform(p, [0.05, 0.35, 0.9, 1], [0, 1, 1, 0.35]);

  return (
    <section id="research-about" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-border">
          <motion.img
            src={researchImg}
            alt="Researchers collaborating around a glowing data visualisation"
            width={1600}
            height={1000}
            loading="lazy"
            style={{ scale: imgScale, opacity: imgOpacity }}
            className="h-full w-full object-cover will-change-transform"
          />
        </div>

        <motion.div style={{ y: textY, opacity: textOpacity }} className="will-change-transform">
          <p className="text-xs uppercase tracking-[0.35em] text-accent">About the Club</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">Curiosity, turned into results.</h2>
          <p className="mt-6 text-base text-muted-foreground sm:text-lg">
            The Research Club brings together students who want to go beyond the syllabus. We read
            papers, form small teams around real problems, and build the prototypes, experiments and
            write-ups that make an idea stand on its own.
          </p>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Whether you are starting with your first notebook or already deep into a model, there is
            a place here to learn how research actually gets done — together.
          </p>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Stat key={s.label} p={p} index={i} value={s.value} label={s.label} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

