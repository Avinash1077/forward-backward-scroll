import { useRef } from "react";
import { motion, useTransform } from "@/lib/motion";
import { useSectionScroll } from "@/components/home/useSectionScroll";

export function ResearchCTA() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref, ["start end", "end end"]);

  const scale = useTransform(p, [0, 1], [0.74, 1]);
  const opacity = useTransform(p, [0, 0.45], [0, 1]);
  const buttonsY = useTransform(p, [0.5, 0.85], [45, 0]);
  const buttonsOpacity = useTransform(p, [0.5, 0.85], [0, 1]);
  const glowScale = useTransform(p, [0, 1], [0.6, 1.35]);

  return (
    <section ref={ref} className="relative h-[150vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: glowScale }}
          className="glow absolute inset-0 will-change-transform"
        />
        <motion.div
          style={{ scale, opacity }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center will-change-transform"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Join us</p>
          <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-7xl">
            BRING A QUESTION.
            <span className="block text-primary">LEAVE WITH A RESULT.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            No experience required — just curiosity and a willingness to try. Come to a session,
            pick a direction and start building.
          </p>
          <motion.div
            style={{ y: buttonsY, opacity: buttonsOpacity }}
            className="mt-10 flex flex-wrap justify-center gap-3 will-change-transform"
          >
            <a
              href="/events"
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              See Upcoming Events
            </a>
            <a
              href="/"
              className="rounded-full border border-border px-7 py-3 text-sm font-semibold transition-transform hover:scale-105"
            >
              Back to Home
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

