import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useTransform } from "@/lib/motion";
import {
  BrainCircuit,
  Cloud,
  Dna,
  Factory,
  LockKeyhole,
  Orbit,
  Palette,
  RadioTower,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useSectionScroll } from "@/components/home/useSectionScroll";

const domains: { title: string; Icon: LucideIcon }[] = [
  { title: "Cybersecurity", Icon: LockKeyhole },
  { title: "Artificial Intelligence & Data Science", Icon: BrainCircuit },
  { title: "Space & Aerospace", Icon: Orbit },
  { title: "Robotics & IoT", Icon: Factory },
  { title: "Biotechnology & Health", Icon: Dna },
  { title: "Sustainability & Environment", Icon: RadioTower },
  { title: "Cloud Computing & Systems", Icon: Cloud },
  { title: "Product Design & Innovation", Icon: Palette },
  { title: "Human-Centric Technologies & Society", Icon: UsersRound },
];

function DomainCard({
  domain,
  index,
  progress,
}: {
  domain: (typeof domains)[number];
  index: number;
  progress: ReturnType<typeof useSectionScroll>;
}) {
  const start = 0.13 + index * 0.085;
  const nodeScale = useTransform(progress, [start, start + 0.08], [0.7, 1]);
  const nodeOpacity = useTransform(progress, [start, start + 0.025], [0, 1]);

  return (
    <article className="research-domain-card">
      <motion.div
        style={{ opacity: nodeOpacity, scale: nodeScale }}
        className="research-domain-orb-mask"
      >
        <div className="research-domain-orb is-lit">
          <domain.Icon aria-hidden="true" />
        </div>
      </motion.div>
      <h3>{domain.title}</h3>
      <span aria-hidden="true" />
    </article>
  );
}

export function ResearchDomains() {
  const ref = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const p = useSectionScroll(ref, ["start start", "end end"]);
  const [penPosition, setPenPosition] = useState({ x: 50, y: 50 });
  const [penVisible, setPenVisible] = useState(false);
  const headingOpacity = useTransform(p, [0.08, 0.26], [0, 1]);
  const headingY = useTransform(p, [0.08, 0.26], [34, 0]);
  const pathProgress = useTransform(p, [0.16, 0.84], [0, 1]);
  const pathOpacity = useTransform(p, [0.12, 0.2], [0, 1]);

  useMotionValueEvent(p, "change", (value) => {
    const progress = Math.min(Math.max((value - 0.16) / 0.68, 0), 1);
    const path = pathRef.current;
    if (path) {
      const point = path.getPointAtLength(path.getTotalLength() * progress);
      setPenPosition({ x: point.x, y: point.y });
    }
    setPenVisible(progress > 0.02 && progress < 0.99);
  });

  return (
    <section ref={ref} className="research-domains relative h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="research-domains-image absolute inset-0" aria-hidden="true" />
        <div className="research-domains-overlay absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex h-full max-w-[90rem] flex-col px-6 py-24 sm:px-10 lg:px-12">
          <motion.div style={{ opacity: headingOpacity, y: headingY }} className="text-center">
            <div className="research-domains-eyebrow">
              <span aria-hidden="true" />
              <p>Our domains</p>
              <span aria-hidden="true" />
            </div>
            <h2 className="research-domains-title">Diverse fields. A shared purpose.</h2>
            <p className="research-domains-subtitle">Exploring today. Solving tomorrow.</p>
          </motion.div>

          <div className="research-domains-side research-domains-side-left" aria-label="Research values">
            <span>Exploration</span>
            <span>Collaboration</span>
            <span>Innovation</span>
            <span>Real-world impact</span>
          </div>
          <div className="research-domains-side research-domains-side-right" aria-label="Research outcomes">
            <span>Ideas</span>
            <span>People</span>
            <span>Technology</span>
            <span>A brighter tomorrow</span>
          </div>

          <div className="research-domains-grid">
            <motion.svg
              viewBox="0 0 900 100"
              preserveAspectRatio="none"
              className="research-domains-path"
              aria-hidden="true"
              style={{ opacity: pathOpacity }}
            >
              <motion.path
                ref={pathRef}
                d="M 50 50 C 75 25, 125 25, 150 50 S 225 75, 250 50 S 325 25, 350 50 S 425 75, 450 50 S 525 25, 550 50 S 625 75, 650 50 S 725 25, 750 50 S 825 75, 850 50"
                className="research-domains-draw-path"
                pathLength={1}
                style={{ pathLength: pathProgress }}
              />
              <circle
                className={`research-domains-pen ${penVisible ? "is-active" : ""}`}
                r="5"
                cx={penPosition.x}
                cy={penPosition.y}
              />
            </motion.svg>
            {domains.map((domain, index) => (
              <DomainCard key={domain.title} domain={domain} index={index} progress={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
