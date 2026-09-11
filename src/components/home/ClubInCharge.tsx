import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { useSectionScroll } from "./useSectionScroll";

export function ClubInCharge() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref);

  const scale = useTransform(p, [0, 0.5, 1], [1.3, 1, 1.05]);
  const clip = useTransform(
    p,
    [0, 0.5],
    ["inset(35% 12% 35% 12% round 24px)", "inset(0% 0% 0% 0% round 24px)"],
  );
  const textX = useTransform(p, [0.15, 0.55], [120, 0]);
  const textOpacity = useTransform(p, [0.15, 0.45, 0.9, 1], [0, 1, 1, 0.3]);
  const bgOpacity = useTransform(p, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <motion.div
        style={{ opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 bg-secondary/40"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <motion.div style={{ clipPath: clip }} className="aspect-[4/5] overflow-hidden will-change-transform">
          <motion.img
            src="/images/leadership/club-incharge.jpg"
            alt="Club In-Charge"
            width={1100}
            height={1300}
            loading="lazy"
            style={{ scale }}
            className="h-full w-full object-cover will-change-transform"
          />
        </motion.div>
        <motion.div style={{ x: textX, opacity: textOpacity }} className="will-change-transform">
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Club In-Charge</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">Name Here</h2>
          <p className="mt-2 text-sm text-muted-foreground">Faculty Coordinator, CSE Clubs</p>
          <p className="mt-6 text-base text-muted-foreground sm:text-lg">
            Coordinating both the Research Club and the Editing Club, connecting students with
            projects, mentors and opportunities — and making sure every idea gets a chance to be
            built, tested and shared.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
