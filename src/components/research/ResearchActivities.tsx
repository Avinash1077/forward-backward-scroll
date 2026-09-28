import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "@/lib/motion";
import { useSectionScroll } from "@/components/home/useSectionScroll";

const activities = [
  {
    title: "Workshops & Bootcamps",
    body: "Hands-on sessions that take you from zero to a working model, tool or demo in an afternoon.",
  },
  {
    title: "Paper Reading Circles",
    body: "We meet, read a paper together and argue about the parts that matter — no prior expertise needed.",
  },
  {
    title: "Hackathons & Competitions",
    body: "Form a team, pick a problem and build under pressure with mentors on hand to unblock you.",
  },
  {
    title: "Research Mentorship",
    body: "Senior members and faculty guide small teams through scope, method and honest evaluation.",
  },
  {
    title: "Project Showcases",
    body: "Every project ends in a demo — a poster, a talk or a live build shared with the department.",
  },
];

function Row({
  p,
  index,
  title,
  body,
}: {
  p: MotionValue<number>;
  index: number;
  title: string;
  body: string;
}) {
  const start = 0.25 + index * 0.09;
  const opacity = useTransform(p, [start, start + 0.12], [0, 1]);
  const x = useTransform(p, [start, start + 0.16], [40, 0]);

  return (
    <motion.li
      style={{ opacity, x }}
      className="flex gap-5 border-t border-border pt-6 will-change-transform"
    >
      <span className="font-display text-2xl font-bold text-primary/70 sm:text-3xl">
        0{index + 1}
      </span>
      <div>
        <h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{body}</p>
      </div>
    </motion.li>
  );
}

export function ResearchActivities() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref);

  const headingOpacity = useTransform(p, [0, 0.2], [0, 1]);
  const headingY = useTransform(p, [0, 0.2], [30, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          style={{ opacity: headingOpacity, y: headingY }}
          className="max-w-2xl will-change-transform"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-accent">How it works</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">What actually happens here</h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Research can feel intimidating. We make it a routine instead — structured, social and
            something you can start this week.
          </p>
        </motion.div>

        <ul className="mt-12 space-y-6">
          {activities.map((a, i) => (
            <Row key={a.title} p={p} index={i} title={a.title} body={a.body} />
          ))}
        </ul>
      </div>
    </section>
  );
}

