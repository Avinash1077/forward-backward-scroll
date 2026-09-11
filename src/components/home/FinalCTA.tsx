import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { useSectionScroll } from "./useSectionScroll";

export function FinalCTA() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref, ["start end", "end end"]);

  const scale = useTransform(p, [0, 1], [0.72, 1]);
  const opacity = useTransform(p, [0, 0.45], [0, 1]);
  const buttonsY = useTransform(p, [0.55, 0.9], [50, 0]);
  const buttonsOpacity = useTransform(p, [0.55, 0.9], [0, 1]);
  const glowScale = useTransform(p, [0, 1], [0.6, 1.4]);
  const particleA = useTransform(p, [0, 1], ["30%", "-30%"]);
  const particleB = useTransform(p, [0, 1], ["-40%", "40%"]);

  return (
    <section ref={ref} className="relative h-[160vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ scale: glowScale }} className="glow absolute inset-0 will-change-transform" />
        <motion.span
          style={{ y: particleA }}
          className="absolute left-[15%] top-1/3 h-32 w-32 rounded-full bg-primary/10 blur-2xl will-change-transform"
        />
        <motion.span
          style={{ y: particleB }}
          className="absolute right-[12%] bottom-1/4 h-40 w-40 rounded-full bg-accent/10 blur-2xl will-change-transform"
        />
        <motion.div
          style={{ scale, opacity }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center will-change-transform"
        >
          <h2 className="text-4xl font-bold leading-tight sm:text-7xl">
            EXPLORE. CREATE. <span className="text-primary">INNOVATE.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Discover the communities that turn ideas into technology, research and creativity.
          </p>
          <motion.div
            style={{ y: buttonsY, opacity: buttonsOpacity }}
            className="mt-10 flex flex-wrap justify-center gap-3 will-change-transform"
          >
            <a
              href="/research-club"
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              Research Club
            </a>
            <a
              href="/editing-club"
              className="rounded-full border border-border px-7 py-3 text-sm font-semibold transition-transform hover:scale-105"
            >
              Editing Club
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
