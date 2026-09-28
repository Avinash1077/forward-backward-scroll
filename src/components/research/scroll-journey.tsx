import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import {
  BrainCircuit,
  Cloud,
  Dna,
  Factory,
  LockKeyhole,
  Orbit,
  Palette,
  RadioTower,
  Github,
  Instagram,
  Linkedin,
  UsersRound,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import "./styles.css";

const stages = [
  { title: "Cybersecurity", detail: "", Icon: LockKeyhole },
  { title: "Artificial Intelligence & Data Science", detail: "", Icon: BrainCircuit },
  { title: "Space & Aerospace", detail: "", Icon: Orbit },
  { title: "Robotics & IoT", detail: "", Icon: Factory },
  { title: "Biotechnology & Health", detail: "", Icon: Dna },
  { title: "Sustainability & Environment", detail: "", Icon: RadioTower },
  { title: "Cloud Computing & Systems", detail: "", Icon: Cloud },
  { title: "Product Design & Innovation", detail: "", Icon: Palette },
  { title: "Human-Centric Technologies & Society", detail: "", Icon: UsersRound },
] as const;

type Point = { x: number; y: number };

const DESKTOP_PATH =
  "M 72 310 C 165 190, 270 155, 385 225 C 495 292, 585 342, 710 230 C 825 125, 940 145, 1045 255 C 1155 365, 1260 325, 1368 170";
const MOBILE_PATH =
  "M 108 45 C 260 115, 276 205, 150 272 C 40 330, 52 430, 190 490 C 326 548, 332 652, 185 708 C 45 765, 46 875, 195 932 C 304 974, 310 1065, 188 1135";

function useMobilePath() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return mobile;
}

function JourneyPath({ d, progress }: { d: string; progress: MotionValue<number> }) {
  return (
    <>
      <path className="journey-path-base" d={d} pathLength={1} />
      <motion.path
        className="journey-path-progress"
        d={d}
        pathLength={progress}
      />
    </>
  );
}

function JourneyProgress({
  progress,
  points,
}: {
  progress: MotionValue<number>;
  points: Point[];
}) {
  const x = useTransform(progress, (value) => {
    const point = points[Math.round(value * (points.length - 1))];
    return point?.x ?? points[0]?.x ?? 0;
  });
  const y = useTransform(progress, (value) => {
    const point = points[Math.round(value * (points.length - 1))];
    return point?.y ?? points[0]?.y ?? 0;
  });

  if (points.length === 0) return null;

  return (
    <motion.g style={{ x, y }} aria-hidden="true">
      <circle className="journey-progress-halo" r="14" />
      <circle className="journey-progress-point" r="4" />
    </motion.g>
  );
}

function JourneyNode({
  point,
  index,
  activeIndex,
  mobile,
  progress,
}: {
  point: Point;
  index: number;
  activeIndex: number;
  mobile: boolean;
  progress: MotionValue<number>;
}) {
  const stage = stages[index];
  if (!stage) return null;

  const start = index / (stages.length - 1);
  const opacity = useTransform(progress, [start, start + 0.02], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.04], [0.7, 1]);
  const labelOpacity = useTransform(progress, [start + 0.015, start + 0.055], [0, 1]);
  const labelY = useTransform(progress, [start + 0.015, start + 0.055], [8, 0]);

  const state = index === activeIndex ? "active" : index < activeIndex ? "complete" : "future";
  const radius = mobile ? 22 : 25;
  const labelX = mobile ? (point.x > 195 ? point.x - 38 : point.x + 38) : point.x;
  const anchor = mobile ? (point.x > 195 ? "end" : "start") : "middle";

  const Icon = stage.Icon;

  return (
    <motion.g
      style={{ opacity, scale }}
      className={`journey-node journey-node--${state}`}
    >
      <circle className="journey-node-aura" cx={point.x} cy={point.y} r={radius + 9} />
      <circle className="journey-node-ring" cx={point.x} cy={point.y} r={radius} />
      <foreignObject
        x={point.x - radius}
        y={point.y - radius}
        width={radius * 2}
        height={radius * 2}
        className="journey-node-icon-container"
      >
        <div className="flex items-center justify-center w-full h-full journey-loading">
          <Icon size={radius} strokeWidth={2} />
        </div>
      </foreignObject>
      <JourneyLabels
        anchor={anchor}
        detail={stage.detail}
        mobile={mobile}
        title={stage.title}
        x={labelX}
        y={mobile ? point.y - 4 : point.y + radius + 26}
        opacity={labelOpacity}
        yOffset={labelY}
      />
    </motion.g>
  );
}

function JourneyLabels({
  anchor,
  detail,
  mobile,
  title,
  x,
  y,
  opacity,
  yOffset,
}: {
  anchor: "start" | "middle" | "end";
  detail: string;
  mobile: boolean;
  title: string;
  x: number;
  y: number;
  opacity: MotionValue<number>;
  yOffset: MotionValue<number>;
}) {
  return (
    <motion.text
      className="journey-label"
      textAnchor={anchor}
      x={x}
      y={y}
      style={{ opacity, y: yOffset }}
    >
      <tspan className="journey-label-title" x={x} dy="0">
        {title}
      </tspan>
      {detail ? (
        <tspan className="journey-label-detail" x={x} dy={mobile ? 16 : 17}>
          {detail}
        </tspan>
      ) : null}
    </motion.text>
  );
}

function ResearchSilhouette({ mobile }: { mobile: boolean }) {
  if (mobile) return null;

  return (
    <g className="research-silhouette" aria-hidden="true">
      <ellipse cx="735" cy="225" rx="70" ry="92" />
      <path d="M 620 490 C 625 365, 655 315, 735 315 C 815 315, 848 365, 858 490 Z" />
      <path className="research-contour" d="M 697 208 C 716 179, 759 177, 780 214 M 686 247 C 718 270, 755 271, 790 243" />
    </g>
  );
}

function JourneySVG({
  activeIndex,
  mobile,
  progress,
}: {
  activeIndex: number;
  mobile: boolean;
  progress: MotionValue<number>;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [nodePoints, setNodePoints] = useState<Point[]>([]);
  const [progressPoints, setProgressPoints] = useState<Point[]>([]);
  const d = mobile ? MOBILE_PATH : DESKTOP_PATH;

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const measure = () => {
      const length = path.getTotalLength();
      setNodePoints(
        stages.map((_, index) => path.getPointAtLength((length * index) / (stages.length - 1))),
      );
      setProgressPoints(
        Array.from({ length: 241 }, (_, index) => path.getPointAtLength((length * index) / 240)),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(path.ownerSVGElement ?? path);
    return () => observer.disconnect();
  }, [d]);

  return (
    <svg
      className="journey-svg"
      viewBox={mobile ? "0 0 390 1180" : "0 0 1440 560"}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="journey-svg-title journey-svg-desc"
    >
      <title id="journey-svg-title">The path from knowledge to innovation</title>
      <desc id="journey-svg-desc">Nine connected stages illuminate as the page scrolls.</desc>
      <defs>
        <filter id="line-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="silhouette-fade">
          <stop offset="0" className="silhouette-stop-center" />
          <stop offset="1" className="silhouette-stop-edge" />
        </radialGradient>
      </defs>
      <ResearchSilhouette mobile={mobile} />
      <path ref={pathRef} className="journey-measure-path" d={d} />
      <JourneyPath d={d} progress={progress} />
      {nodePoints.map((point, index) => {
        const stage = stages[index];
        if (!stage) return null;
        return (
          <JourneyNode
            key={stage.title}
            activeIndex={activeIndex}
            index={index}
            mobile={mobile}
            point={point}
            progress={progress}
          />
        );
      })}
      <JourneyProgress points={progressPoints} progress={progress} />
    </svg>
  );
}

export function ScrollJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobile = useMobilePath();
  const reduceMotion = useReducedMotion();
  const staticProgress = useMotionValue(1);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const animatedProgress = useTransform(scrollYProgress, [0, 0.06, 1], [0, 0, 1]);
  const progress = reduceMotion ? staticProgress : animatedProgress;
  const [activeIndex, setActiveIndex] = useState(reduceMotion ? stages.length - 1 : 0);

 
 useMotionValueEvent(progress, "change", (latest) => {
    const nextIndex = Math.min(stages.length - 1, Math.floor(latest * stages.length));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <section ref={sectionRef} className="scroll-journey" aria-labelledby="journey-title">
      <div className="journey-sticky">
        <div className="journey-side journey-side-left" aria-label="Research values">
          <span>Exploration</span>
          <span>Collaboration</span>
          <span>Innovation</span>
          <span>Real-world impact</span>
        </div>
        <div className="journey-side journey-side-right" aria-label="Research outcomes">
          <span>Ideas</span>
          <span>People</span>
          <span>Technology</span>
          <span>A brighter tomorrow</span>
        </div>
        <header className="journey-heading">
          <p className="journey-kicker">OUR DOMAINS</p>
          <h1 id="journey-title">Diverse fields. A shared purpose.</h1>
          <p>Exploring today. Solving tomorrow.</p>
        </header>
        <div className="journey-visual">
          <JourneySVG activeIndex={activeIndex} mobile={mobile} progress={progress} />
        </div>
        <div className="journey-index" aria-live="polite">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <i aria-hidden="true" />
          <span>{String(stages.length).padStart(2, "0")}</span>
        </div>
        <div className="journey-side-note journey-side-note-left">Research connects worlds</div>
        <div className="journey-side-note journey-side-note-right">Curiosity builds tomorrow</div>
        <footer className="journey-footer">
          <div className="journey-footer-brand">
            <strong>Promethean Minds</strong>
            <span>Research &amp; Innovation Club</span>
          </div>
          <p>Ideas evolve. Minds build. Together, we create a brighter tomorrow.</p>
          <div className="journey-socials" aria-label="Social links">
            <a href="#instagram" aria-label="Instagram"><Instagram aria-hidden="true" /></a>
            <a href="#linkedin" aria-label="LinkedIn"><Linkedin aria-hidden="true" /></a>
            <a href="#github" aria-label="GitHub"><Github aria-hidden="true" /></a>
            <a href="#youtube" aria-label="YouTube"><Youtube aria-hidden="true" /></a>
          </div>
        </footer>
      </div>
    </section>
  );
}
