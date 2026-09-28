import { useRef } from "react";
import { motion, useTransform } from "@/lib/motion";
import { Camera, Film, Palette } from "lucide-react";
import { useSectionScroll } from "@/components/home/useSectionScroll";

const milestones = [
  { number: "01", title: "Inspiration", body: "We draw from stories around us.", Icon: Camera },
  { number: "02", title: "Creation", body: "We shape ideas into visuals.", Icon: Palette },
  { number: "03", title: "Impact", body: "We share stories that matter.", Icon: Film },
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
  const y = useTransform(p, [start, start + 0.18], [46, 0]);
  const filter = useTransform(p, [start, start + 0.18], ["blur(14px)", "blur(0px)"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, x: 28, scale: 0.9, rotateX: -18, filter: "blur(16px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.2, delay: index * 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{ opacity, y, filter }}
      className="editing-philosophy-milestone will-change-transform"
    >
      <div className="editing-philosophy-milestone-copy">
        <strong>{milestone.number}</strong>
        <h3>{milestone.title}</h3>
        <p>{milestone.body}</p>
      </div>
      <div className="editing-philosophy-milestone-circle">
        <milestone.Icon aria-hidden="true" strokeWidth={1.5} />
      </div>
    </motion.div>
  );
}

export function EditingPhilosophy() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref, ["start start", "end end"]);

  const imageScale = useTransform(p, [0, 1], [1, 1.04]);
  const imageY = useTransform(p, [0, 1], [0, -18]);
  const contentY = useTransform(p, [0, 0.62], [120, 0]);
  const contentOpacity = useTransform(p, [0.12, 0.48], [0, 1]);

  return (
    <section id="editing-about" ref={ref} className="editing-philosophy relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="editing-philosophy-image absolute inset-0 will-change-transform"
          aria-hidden="true"
        />
        <div className="editing-philosophy-overlay absolute inset-0" aria-hidden="true" />
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 py-24 sm:px-10 lg:px-16 will-change-transform"
        >
          <div className="editing-philosophy-composition">
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, y: 64, x: -24, rotateX: -14, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, x: 0, rotateX: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.25, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity: contentOpacity }}
            >
              <div className="editing-philosophy-eyebrow">
                <span aria-hidden="true" />
                <p>Our philosophy</p>
                <span aria-hidden="true" />
              </div>
              <h2 className="editing-philosophy-title">
                A spectrum
                <span>of creativity</span>
              </h2>
              <p className="editing-philosophy-copy">
                We find inspiration in the world, create with purpose, and share stories that inspire change.
              </p>
              <span className="editing-philosophy-rule" aria-hidden="true" />
            </motion.div>
            <div className="editing-philosophy-milestones">
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