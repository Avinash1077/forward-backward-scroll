import { useRef } from "react";
import { motion, useTransform } from "@/lib/motion";
import { useSectionScroll } from "@/components/home/useSectionScroll";

const milestones = [
  { number: "01", title: "Knowledge", body: "We learn from what came before.", image: "/book.png" },
  { number: "02", title: "Research", body: "We question what exists today.", image: "/analysisimg.png" },
  { number: "03", title: "Innovation", body: "We build what comes next.", image: "/building.png" },
];

function Milestone({
  milestone,
  index,
  p,
}: {
  milestone: (typeof milestones)[number];
  index: number;
  p: ReturnType<typeof useSectionScroll>;
}) {
  const start = 0.2 + index * 0.08;
  const opacity = useTransform(p, [start, start + 0.18], [0, 1]);
  const y = useTransform(p, [start, start + 0.18], [30, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="research-philosophy-milestone will-change-transform"
    >
      <div className="research-philosophy-milestone-copy">
        <strong>{milestone.number}</strong>
        <h3>{milestone.title}</h3>
        <p>{milestone.body}</p>
      </div>
      <div className="research-philosophy-milestone-circle">
        <img src={milestone.image} alt="" aria-hidden="true" />
      </div>
    </motion.div>
  );
}

export function ResearchPhilosophy() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref, ["start start", "end end"]);

  const imageScale = useTransform(p, [0, 1], [1, 1.04]);
  const imageY = useTransform(p, [0, 1], [0, -18]);
  const contentY = useTransform(p, [0, 0.62], [120, 0]);
  const contentOpacity = useTransform(p, [0.12, 0.48], [0, 1]);

  return (
    <section id="research-about" ref={ref} className="research-philosophy relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="research-philosophy-image absolute inset-0 will-change-transform"
          aria-hidden="true"
        />
        <div className="research-philosophy-overlay absolute inset-0" aria-hidden="true" />
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 py-24 sm:px-10 lg:px-16 will-change-transform"
        >
          <div className="research-philosophy-composition">
            <div className="max-w-xl">
            <div className="research-philosophy-eyebrow">
              <span aria-hidden="true" />
              <p>Our philosophy</p>
              <span aria-hidden="true" />
            </div>
            <h2 className="research-philosophy-title">
              A continuum
              <span>of knowledge</span>
            </h2>
            <p className="research-philosophy-copy">
              We learn from the past, question the present, and build a brighter future through research,
              collaboration, and innovation.
            </p>
            <span className="research-philosophy-rule" aria-hidden="true" />
            </div>
            <div className="research-philosophy-milestones">
              {milestones.map((milestone, index) => (
                <Milestone key={milestone.number} milestone={milestone} index={index} p={p} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
