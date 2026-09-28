import { useRef } from "react";
import { motion, useTransform } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import { useSectionScroll } from "@/components/home/useSectionScroll";

export function EditingCTA() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref, ["start end", "end end"]);

  const scale = useTransform(p, [0, 1], [0.82, 1]);
  const opacity = useTransform(p, [0, 0.45], [0, 1]);
  const contentY = useTransform(p, [0.2, 0.9], [70, 0]);
  const buttonY = useTransform(p, [0.45, 0.9], [40, 0]);
  const buttonOpacity = useTransform(p, [0.45, 0.85], [0, 1]);

  return (
    <section ref={ref} className="editing-cta relative h-[120vh] overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <motion.div
          style={{ scale, y: contentY }}
          className="relative mx-auto max-w-4xl px-6 text-center will-change-transform"
        >
          <motion.div initial={{ opacity: 0, y: 28, filter: "blur(14px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }} style={{ opacity }}>
            <p className="editing-cta-eyebrow uppercase tracking-[0.3em] text-sm font-medium text-accent">
              Ready to create?
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 42, filter: "blur(14px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.25, delay: 0.24, ease: [0.16, 1, 0.3, 1] }} style={{ opacity }}>
            <h2 className="mt-4 text-4xl font-bold leading-[1.1] sm:text-6xl lg:text-7xl">
              Join the creative
              <span className="block text-accent">collective</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 42, filter: "blur(14px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1.35, delay: 0.38, ease: [0.16, 1, 0.3, 1] }} style={{ opacity }}>
            <p className="mt-6 mx-auto max-w-xl text-lg text-muted-foreground">
              Whether you edit, design, shoot, or animate — there's a place for your craft here.
              Let's build something remarkable together.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.3, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: buttonY, opacity: buttonOpacity }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#"
              className="editing-cta-button inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-all hover:scale-105 hover:shadow-[0_0_30px]_accent"
            >
              Join the Club
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="editing-cta-button inline-flex items-center justify-center gap-2 rounded-full border-2 border-border bg-transparent px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-accent/10 hover:border-accent"
            >
              View Portfolio
            </a>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>
    </section>
  );
}