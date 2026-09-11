import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import departmentImg from "@/assets/department.jpg";
import { useSectionScroll } from "./useSectionScroll";

const stats = [
  { value: "2", label: "Clubs" },
  { value: "21+", label: "Members" },
  { value: "Multiple", label: "Events" },
  { value: "Innovation", label: "& Research" },
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
  const start = 0.35 + index * 0.08;
  const opacity = useTransform(p, [start, start + 0.1], [0, 1]);
  const y = useTransform(p, [start, start + 0.12], [40, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur-sm will-change-transform"
    >
      <div className="font-display text-2xl font-bold text-primary sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export function Department() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref);

  const imgScale = useTransform(p, [0, 0.5, 1], [1.25, 1, 1.08]);
  const imgY = useTransform(p, [0, 1], ["8%", "-8%"]);
  const textY = useTransform(p, [0, 0.6], [80, 0]);
  const textOpacity = useTransform(p, [0.05, 0.35, 0.9, 1], [0, 1, 1, 0.3]);
  const glowY = useTransform(p, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <motion.div style={{ y: glowY }} className="glow pointer-events-none absolute inset-0" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
          <motion.img
            src={departmentImg}
            alt="Computer Science and Engineering department atrium"
            width={1600}
            height={1000}
            loading="lazy"
            style={{ scale: imgScale, y: imgY }}
            className="h-full w-full object-cover will-change-transform"
          />
        </div>
        <motion.div style={{ y: textY, opacity: textOpacity }} className="will-change-transform">
          <h2 className="text-3xl font-bold sm:text-5xl">
            Computer Science &amp; Engineering Department
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            A department built around curiosity — where students learn by building, questioning and
            experimenting. From algorithms and artificial intelligence to visual storytelling, our
            clubs give every student a place to grow.
          </p>
          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {stats.map((s, i) => (
              <Stat key={s.label} p={p} index={i} value={s.value} label={s.label} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
