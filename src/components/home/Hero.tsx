import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import heroImg from "@/assets/hero.jpg";
import { useSectionScroll } from "./useSectionScroll";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref, ["start start", "end start"]);

  const titleScale = useTransform(p, [0, 1], [1, 0.62]);
  const titleY = useTransform(p, [0, 1], ["0vh", "-26vh"]);
  const titleOpacity = useTransform(p, [0, 0.8, 1], [1, 0.5, 0]);
  const subOpacity = useTransform(p, [0, 0.35], [1, 0]);
  const subY = useTransform(p, [0, 0.5], [0, -60]);
  const bgScale = useTransform(p, [0, 1], [1, 1.35]);
  const bgOpacity = useTransform(p, [0, 1], [0.55, 0.1]);
  const veilOpacity = useTransform(p, [0, 1], [0.4, 1]);
  const orbA = useTransform(p, [0, 1], ["0%", "-40%"]);
  const orbB = useTransform(p, [0, 1], ["0%", "55%"]);
  const orbC = useTransform(p, [0, 1], ["0%", "-70%"]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.img
          src={heroImg}
          alt="Abstract circuitry representing computer science and engineering"
          width={1920}
          height={1080}
          style={{ scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
        <motion.div style={{ opacity: veilOpacity }} className="veil absolute inset-0" />
        <div className="glow absolute inset-0" />

        <motion.span
          style={{ y: orbA }}
          className="absolute left-[8%] top-[22%] h-24 w-24 rounded-full border border-primary/30 will-change-transform sm:h-40 sm:w-40"
        />
        <motion.span
          style={{ y: orbB }}
          className="absolute right-[10%] top-[30%] h-16 w-16 rounded-full bg-accent/20 blur-xl will-change-transform sm:h-28 sm:w-28"
        />
        <motion.span
          style={{ y: orbC }}
          className="absolute bottom-[18%] left-[20%] h-2 w-2 rounded-full bg-primary shadow-[0_0_30px] shadow-primary will-change-transform"
        />

        <motion.div
          style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center will-change-transform"
        >
          <h1 className="text-4xl font-bold leading-[0.95] sm:text-6xl lg:text-8xl">
            COMPUTER SCIENCE
            <span className="block text-primary">&amp; ENGINEERING</span>
          </h1>
          <motion.div style={{ opacity: subOpacity, y: subY }}>
            <p className="mt-6 text-xs uppercase tracking-[0.42em] text-muted-foreground sm:text-sm">
              Research • Creativity • Innovation
            </p>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Empowering students to explore technology, research, creativity and innovation.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/research-club"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                Explore Research Club
              </a>
              <a
                href="/editing-club"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-transform hover:scale-105"
              >
                Explore Editing Club
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
