import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "@/lib/motion";
import { useSectionScroll } from "./useSectionScroll";

const people = [
  { name: "Dr.SUNDRA RAMAN K.A", role: "Principal", img: "/SUNDRARAMAN.jpeg" },
  { name: "Dr.Magesh Balakrishnan", role: "Vice Principal", img: "/magesh.jpeg" },
  { name: "Mrs.Pradeepa k", role: "Head of the Department", img: "/pradeepak.jpeg" },
  { name: "Dharma Prakash v", role: "Head of the Department", img: "/python.jpeg" },
  { name: "Suganya s", role: "Club In-Charge", img: "/suganya_mam (2).png" },
];

function Person({
  p,
  index,
  name,
  role,
  img,
}: {
  p: MotionValue<number>;
  index: number;
  name: string;
  role: string;
  img?: string;
}) {
  const step = 1 / people.length;
  const start = index * step;
  const end = start + step;
  const inPoint = start + step * 0.25;
  const outPoint = end - step * 0.1;

  const opacity = useTransform(p, [start, inPoint, outPoint, end], [0, 1, 1, 0]);
  const scale = useTransform(p, [start, inPoint, outPoint, end], [0.86, 1, 1, 1.1]);
  const y = useTransform(p, [start, inPoint, outPoint, end], [90, 0, 0, -90]);
  const blur = useTransform(
    p,
    [start, inPoint, outPoint, end],
    ["blur(14px)", "blur(0px)", "blur(0px)", "blur(14px)"],
  );

  return (
    <motion.div
      style={{ opacity, scale, y, filter: blur }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 will-change-transform sm:flex-row sm:gap-12"
    >
      {img ? (
        <img
          src={img}
          alt={role}
          width={900}
          height={1100}
          loading="lazy"
          className="h-52 w-44 rounded-2xl border border-border object-cover sm:h-96 sm:w-80"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-52 w-44 items-center justify-center rounded-2xl border border-border bg-secondary text-7xl font-bold text-muted-foreground sm:h-96 sm:w-80"
        >
          P
        </div>
      )}
      <div className="text-center sm:text-left">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">{role}</p>
        <h3 className="mt-3 text-3xl font-bold sm:text-6xl">{name}</h3>
      </div>
    </motion.div>
  );
}

export function Leadership() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref, ["start start", "end end"]);

  const headingOpacity = useTransform(p, [0, 0.06, 0.92, 1], [0.4, 1, 1, 0.2]);
  const barScale = useTransform(p, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="glow absolute inset-0" />
        <motion.h2
          style={{ opacity: headingOpacity }}
          className="absolute inset-x-0 top-24 z-10 text-center text-2xl font-bold sm:text-4xl"
        >
          Our Leadership
        </motion.h2>
        <div className="absolute inset-0">
          {people.map((person, i) => (
            <Person
              key={person.name}
              p={p}
              index={i}
              name={person.name}
              role={person.role}
              img={person.img}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-16 mx-auto h-px w-40 bg-border sm:w-64">
          <motion.div
            style={{ scaleX: barScale }}
            className="h-full w-full origin-left bg-primary"
          />
        </div>
      </div>
    </section>
  );
}
