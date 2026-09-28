import { useRef } from "react";
import { motion, useTransform } from "@/lib/motion";
import { Atom, BarChart3, Search, Users, type LucideIcon } from "lucide-react";
import { useSectionScroll } from "@/components/home/useSectionScroll";

const principles: { title: string; body: string; Icon: LucideIcon }[] = [
  { title: "Student Driven", body: "Curiosity led by students.", Icon: Users },
  { title: "Research Focused", body: "Questions backed by evidence.", Icon: Search },
  { title: "Interdisciplinary", body: "Ideas crossing domains.", Icon: Atom },
  { title: "Impact Oriented", body: "Research that moves beyond theory.", Icon: BarChart3 },
];

function PrincipleCard({
  principle,
  index,
  progress,
}: {
  principle: (typeof principles)[number];
  index: number;
  progress: ReturnType<typeof useSectionScroll>;
}) {
  const start = 0.28 + index * 0.08;
  const opacity = useTransform(progress, [start, start + 0.16], [0, 1]);
  const y = useTransform(progress, [start, start + 0.16], [30, 0]);

  return (
    <motion.article style={{ opacity, y }} className="research-who-we-are-card">
      <div className="research-who-we-are-card-icon">
        <principle.Icon aria-hidden="true" />
      </div>
      <h3>{principle.title}</h3>
      <p>{principle.body}</p>
      <span aria-hidden="true" />
    </motion.article>
  );
}

export function ResearchWhoWeAre() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref, ["start start", "end end"]);
  const contentOpacity = useTransform(p, [0.12, 0.48], [0, 1]);
  const eyebrowOpacity = useTransform(p, [0.12, 0.24], [0, 1]);
  const eyebrowY = useTransform(p, [0.12, 0.24], [24, 0]);
  const titleOpacity = useTransform(p, [0.2, 0.32], [0, 1]);
  const titleY = useTransform(p, [0.2, 0.32], [24, 0]);
  const subtitleOpacity = useTransform(p, [0.28, 0.4], [0, 1]);
  const subtitleY = useTransform(p, [0.28, 0.4], [24, 0]);
  const copyOpacity = useTransform(p, [0.36, 0.48], [0, 1]);
  const copyY = useTransform(p, [0.36, 0.48], [24, 0]);
  const keywordsOpacity = useTransform(p, [0.44, 0.56], [0, 1]);
  const keywordsY = useTransform(p, [0.44, 0.56], [24, 0]);

  return (
    <section ref={ref} className="research-who-we-are relative h-[280vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="research-who-we-are-image absolute inset-0"
          aria-label="Research Club community"
          role="img"
        />
        <div className="research-who-we-are-overlay absolute inset-0" aria-hidden="true" />
        <motion.div
          style={{ opacity: contentOpacity }}
          className="research-who-we-are-content relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-24 sm:px-10 lg:px-16"
        >
          <div className="research-who-we-are-intro">
            <motion.div
              style={{ opacity: eyebrowOpacity, y: eyebrowY }}
              className="research-who-we-are-eyebrow will-change-transform"
            >
              <span aria-hidden="true" />
              <p>About</p>
              <span aria-hidden="true" />
            </motion.div>
            <motion.h2 style={{ opacity: titleOpacity, y: titleY }} className="will-change-transform">
              Who we are
            </motion.h2>
            <motion.p
              style={{ opacity: subtitleOpacity, y: subtitleY }}
              className="research-who-we-are-subtitle will-change-transform"
            >
              A community built around curiosity
            </motion.p>
            <motion.p
              style={{ opacity: copyOpacity, y: copyY }}
              className="research-who-we-are-copy will-change-transform"
            >
              Promethean Minds is a student-driven research and innovation club focused on exploring
              meaningful problems, developing interdisciplinary solutions, and transforming ideas into
              research, technology, and real-world impact.
            </motion.p>
            <motion.div
              style={{ opacity: keywordsOpacity, y: keywordsY }}
              className="research-who-we-are-keywords will-change-transform"
              aria-label="Club values"
            >
              <span>Ideas</span>
              <span>People</span>
              <span>Research</span>
              <span>Impact</span>
            </motion.div>
          </div>
          <div className="research-who-we-are-principles">
            {principles.map((principle, index) => (
              <PrincipleCard key={principle.title} principle={principle} index={index} progress={p} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
