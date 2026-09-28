import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "@/lib/motion";
import { Brain, LineChart, FlaskConical, Cpu, Lightbulb, type LucideIcon } from "lucide-react";
import { useSectionScroll } from "@/components/home/useSectionScroll";

const areas: { title: string; body: string; Icon: LucideIcon }[] = [
  {
    title: "Artificial Intelligence",
    body: "Large language models, computer vision, agents and the systems built on top of them.",
    Icon: Brain,
  },
  {
    title: "Machine Learning",
    body: "From classic models to deep learning — training, evaluating and understanding why they work.",
    Icon: LineChart,
  },
  {
    title: "Research & Publications",
    body: "Paper reading circles, literature reviews, experiments and writing up what we find.",
    Icon: FlaskConical,
  },
  {
    title: "Emerging Technologies",
    body: "Following the frontier — new frameworks, hardware and tools while they are still new.",
    Icon: Cpu,
  },
  {
    title: "Innovation & Prototyping",
    body: "Turning concepts into working demos, hackathon builds and real, testable products.",
    Icon: Lightbulb,
  },
];

function AreaCard({
  p,
  index,
  area,
}: {
  p: MotionValue<number>;
  index: number;
  area: (typeof areas)[number];
}) {
  const start = 0.3 + index * 0.07;
  const opacity = useTransform(p, [start, start + 0.1], [0, 1]);
  const y = useTransform(p, [start, start + 0.13], [34, 0]);

  return (
    <motion.li
      style={{ opacity, y }}
      className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm will-change-transform"
    >
      <area.Icon className="h-7 w-7 text-primary" aria-hidden />
      <h3 className="mt-4 text-lg font-semibold">{area.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{area.body}</p>
    </motion.li>
  );
}

export function ResearchFocus() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref);

  const headingOpacity = useTransform(p, [0.05, 0.3], [0, 1]);
  const headingY = useTransform(p, [0.05, 0.3], [30, 0]);
  const wordX = useTransform(p, [0, 1], ["-12%", "12%"]);
  const wordOpacity = useTransform(p, [0, 0.5, 1], [0.03, 0.1, 0.03]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <motion.span
        style={{ x: wordX, opacity: wordOpacity }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-8 whitespace-nowrap text-center font-display text-[20vw] font-bold leading-none will-change-transform"
      >
        FOCUS
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          style={{ opacity: headingOpacity, y: headingY }}
          className="mx-auto max-w-2xl text-center will-change-transform"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-accent">What we focus on</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">Five directions, one club</h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Pick a direction that pulls you in — or mix them. Every project starts with a question
            worth asking.
          </p>
        </motion.div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
            <AreaCard key={area.title} p={p} index={i} area={area} />
          ))}
        </ul>
      </div>
    </section>
  );
}

