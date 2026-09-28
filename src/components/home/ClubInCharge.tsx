import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useSectionScroll } from "./useSectionScroll";

const people = [
  {
    img: "/images/leadership/club-incharge.jpg",
    name: "Name Here",
    role: "Faculty Coordinator, CSE Clubs",
    giant: "MENTOR",
    description:
      "Coordinating both the Research Club and the Editing Club, connecting students with projects, mentors and opportunities — and making sure every idea gets a chance to be built, tested and shared.",
  },
  {
    img: "/images/leadership/club-incharge-2.jpg",
    name: "Name Here",
    role: "Assistant Faculty Coordinator, CSE Clubs",
    giant: "GUIDE",
    description:
      "Supporting club operations, workshops and events — bridging student creativity with faculty guidance and helping turn early concepts into polished outcomes.",
  },
];

/**
 * Style 1 — cinematic slide-in from the left:
 * image reveals upward with a clip-path wipe, text lines rise one by one,
 * card drifts out to the right as the next person takes over.
 */
function PersonOne({ p, person }: { p: MotionValue<number>; person: (typeof people)[number] }) {
  const wrapOpacity = useTransform(p, [0, 0.06, 0.42, 0.5], [0, 1, 1, 0]);
  const cardX = useTransform(p, [0, 0.12, 0.42, 0.52], ["-60vw", "0vw", "0vw", "55vw"]);
  const cardRotate = useTransform(p, [0, 0.12, 0.42, 0.52], [-10, 0, 0, 8]);
  const cardScale = useTransform(p, [0.42, 0.52], [1, 0.9]);
  const clip = useTransform(
    p,
    [0.06, 0.2],
    ["inset(100% 0% 0% 0% round 24px)", "inset(0% 0% 0% 0% round 24px)"],
  );
  const imgScale = useTransform(p, [0.06, 0.28], [1.35, 1]);
  const roleY = useTransform(p, [0.12, 0.22], [40, 0]);
  const roleOpacity = useTransform(p, [0.12, 0.22], [0, 1]);
  const nameY = useTransform(p, [0.16, 0.26], [60, 0]);
  const nameOpacity = useTransform(p, [0.16, 0.26], [0, 1]);
  const descY = useTransform(p, [0.2, 0.3], [50, 0]);
  const descOpacity = useTransform(p, [0.2, 0.3], [0, 1]);
  const giantX = useTransform(p, [0, 0.5], ["20%", "-25%"]);

  return (
    <motion.div style={{ opacity: wrapOpacity }} className="absolute inset-0">
      <motion.p
        style={{ x: giantX }}
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-[18vw] font-black whitespace-nowrap text-primary/10 select-none"
      >
        {person.giant}
      </motion.p>
      <div className="flex h-full items-center justify-center px-4">
        <motion.div
          style={{ x: cardX, rotate: cardRotate, scale: cardScale }}
          className="relative mx-auto grid w-full max-w-5xl items-center gap-8 rounded-3xl border border-border bg-card/70 p-6 shadow-2xl backdrop-blur-md will-change-transform sm:p-10 lg:grid-cols-2 lg:gap-12"
        >
          <motion.div
            style={{ clipPath: clip }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
          >
            <motion.img
              src={person.img}
              alt={person.name}
              width={1100}
              height={1300}
              loading="lazy"
              style={{ scale: imgScale }}
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="text-center lg:text-left">
            <motion.p
              style={{ y: roleY, opacity: roleOpacity }}
              className="text-xs uppercase tracking-[0.35em] text-accent"
            >
              {person.role}
            </motion.p>
            <motion.h3 style={{ y: nameY, opacity: nameOpacity }} className="mt-3 text-3xl font-bold sm:text-5xl">
              {person.name}
            </motion.h3>
            <motion.p
              style={{ y: descY, opacity: descOpacity }}
              className="mt-6 text-base text-muted-foreground sm:text-lg"
            >
              {person.description}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * Style 2 — dramatic flip-in from the right:
 * the image swings in like a card being dealt, a spotlight sweep crosses it,
 * text slides in from the right, giant text drifts the opposite way.
 */
function PersonTwo({ p, person }: { p: MotionValue<number>; person: (typeof people)[number] }) {
  const wrapOpacity = useTransform(p, [0.5, 0.56, 0.94, 1], [0, 1, 1, 0]);
  const cardX = useTransform(p, [0.5, 0.64], ["60vw", "0vw"]);
  const cardRotate = useTransform(p, [0.5, 0.64], [12, 0]);
  const cardScale = useTransform(p, [0.5, 0.64, 0.9, 1], [0.8, 1, 1, 1.06]);
  const clip = useTransform(
    p,
    [0.56, 0.72],
    ["inset(0% 0% 0% 100% round 24px)", "inset(0% 0% 0% 0% round 24px)"],
  );
  const imgScale = useTransform(p, [0.56, 0.8], [1.35, 1]);
  const sweepX = useTransform(p, [0.6, 0.78], ["-120%", "120%"]);
  const sweepOpacity = useTransform(p, [0.6, 0.68, 0.78], [0, 0.5, 0]);
  const roleX = useTransform(p, [0.62, 0.72], [60, 0]);
  const roleOpacity = useTransform(p, [0.62, 0.72], [0, 1]);
  const nameX = useTransform(p, [0.66, 0.76], [80, 0]);
  const nameOpacity = useTransform(p, [0.66, 0.76], [0, 1]);
  const descX = useTransform(p, [0.7, 0.8], [70, 0]);
  const descOpacity = useTransform(p, [0.7, 0.8], [0, 1]);
  const giantX = useTransform(p, [0.5, 1], ["-20%", "20%"]);

  return (
    <motion.div style={{ opacity: wrapOpacity }} className="absolute inset-0">
      <motion.p
        style={{ x: giantX }}
        className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-[18vw] font-black whitespace-nowrap text-accent/10 select-none"
      >
        {person.giant}
      </motion.p>
      <div className="flex h-full items-center justify-center px-4">
        <motion.div
          style={{ x: cardX, rotate: cardRotate, scale: cardScale }}
          className="relative mx-auto grid w-full max-w-5xl items-center gap-8 rounded-3xl border border-border bg-card/70 p-6 shadow-2xl backdrop-blur-md will-change-transform sm:p-10 lg:grid-cols-2 lg:gap-12"
        >
          <div className="text-center lg:order-2 lg:text-left">
            <motion.p
              style={{ x: roleX, opacity: roleOpacity }}
              className="text-xs uppercase tracking-[0.35em] text-accent"
            >
              {person.role}
            </motion.p>
            <motion.h3 style={{ x: nameX, opacity: nameOpacity }} className="mt-3 text-3xl font-bold sm:text-5xl">
              {person.name}
            </motion.h3>
            <motion.p
              style={{ x: descX, opacity: descOpacity }}
              className="mt-6 text-base text-muted-foreground sm:text-lg"
            >
              {person.description}
            </motion.p>
          </div>
          <motion.div
            style={{ clipPath: clip }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:order-1"
          >
            <motion.img
              src={person.img}
              alt={person.name}
              width={1100}
              height={1300}
              loading="lazy"
              style={{ scale: imgScale }}
              className="h-full w-full object-cover"
            />
            <motion.div
              style={{ x: sweepX, opacity: sweepOpacity }}
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ClubInCharge() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref, ["start start", "end end"]);

  const headingOpacity = useTransform(p, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);
  const headingY = useTransform(p, [0, 0.08, 0.94, 1], [30, 0, 0, -30]);
  const bgY = useTransform(p, [0, 1], ["0%", "30%"]);
  const dotOneScale = useTransform(p, [0, 0.1, 0.45, 0.55], [1, 1.4, 1.4, 1]);
  const dotTwoScale = useTransform(p, [0.45, 0.55, 0.9, 1], [1, 1.4, 1.4, 1.4]);
  const dotOneOpacity = useTransform(p, [0.45, 0.55], [1, 0.35]);
  const dotTwoOpacity = useTransform(p, [0.45, 0.55], [0.35, 1]);

  return (
    <section ref={ref} className="relative h-[380vh]">
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--accent)/0.12),transparent_55%)]"
      />
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.h2
          style={{ opacity: headingOpacity, y: headingY }}
          className="absolute inset-x-0 top-16 z-10 text-center text-2xl font-bold sm:top-20 sm:text-4xl"
        >
          Club In-Charge
        </motion.h2>
        <div className="absolute inset-0">
          <PersonOne p={p} person={people[0]!} />
          <PersonTwo p={p} person={people[1]!} />
        </div>
        <motion.div
          style={{ opacity: headingOpacity }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3"
        >
          <motion.span
            style={{ scale: dotOneScale, opacity: dotOneOpacity }}
            className="h-2 w-2 rounded-full bg-accent"
          />
          <motion.span
            style={{ scale: dotTwoScale, opacity: dotTwoOpacity }}
            className="h-2 w-2 rounded-full bg-accent"
          />
        </motion.div>
      </div>
    </section>
  );
}

