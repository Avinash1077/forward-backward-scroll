import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useSectionScroll } from "./useSectionScroll";

const people = [
  {
    img: clubInChargeImg,
    name: "Name Here",
    role: "Faculty Coordinator, CSE Clubs",
    description:
      "Coordinating both the Research Club and the Editing Club, connecting students with projects, mentors and opportunities — and making sure every idea gets a chance to be built, tested and shared.",
  },
  {
    img: clubInCharge2Img,
    name: "Name Here",
    role: "Assistant Faculty Coordinator, CSE Clubs",
    description:
      "Supporting club operations, workshops and events — bridging student creativity with faculty guidance and helping turn early concepts into polished outcomes.",
  },
];

function PersonCard({
  p,
  index,
  person,
}: {
  p: MotionValue<number>;
  index: number;
  person: (typeof people)[number];
}) {
  const entering = index === 0 ? 0 : 0.45;
  const exiting = index === 0 ? 0.55 : 1;
  const peak = index === 0 ? 0.25 : 0.75;

  const opacity = useTransform(p, [entering, entering + 0.1, exiting - 0.1, exiting], [0, 1, 1, 0]);
  const scale = useTransform(
    p,
    [entering, peak, exiting],
    index === 0 ? [1, 1, 0.86] : [0.86, 1, 1],
  );
  const y = useTransform(
    p,
    [entering, peak, exiting],
    index === 0 ? [0, 0, -140] : [140, 0, 0],
  );
  const rotate = useTransform(
    p,
    [entering, peak, exiting],
    index === 0 ? [0, 0, -4] : [4, 0, 0],
  );
  const blur = useTransform(
    p,
    [entering, entering + 0.08, exiting - 0.08, exiting],
    index === 0 ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(10px)"] : ["blur(10px)", "blur(0px)", "blur(0px)", "blur(0px)"],
  );

  return (
    <motion.div
      style={{ opacity, scale, y, rotate, filter: blur }}
      className="absolute inset-0 flex items-center justify-center px-4 will-change-transform"
    >
      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-8 overflow-hidden rounded-3xl border border-border bg-card/70 p-6 shadow-2xl backdrop-blur-md sm:p-10 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
          <img
            src={person.img}
            alt={person.name}
            width={1100}
            height={1300}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-center lg:text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-accent">{person.role}</p>
          <h3 className="mt-3 text-3xl font-bold sm:text-5xl">{person.name}</h3>
          <p className="mt-6 text-base text-muted-foreground sm:text-lg">{person.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ClubInCharge() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref, ["start start", "end end"]);

  const headingOpacity = useTransform(p, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const bgY = useTransform(p, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative h-[350vh]">
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--accent)/0.12),transparent_55%)]"
      />
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.h2
          style={{ opacity: headingOpacity }}
          className="absolute inset-x-0 top-20 z-10 text-center text-2xl font-bold sm:top-24 sm:text-4xl"
        >
          Club In-Charge
        </motion.h2>
        <div className="absolute inset-0 pt-32 sm:pt-36">
          {people.map((person, i) => (
            <PersonCard key={person.role} p={p} index={i} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
