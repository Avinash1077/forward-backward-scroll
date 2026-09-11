import { useEffect, useState, type RefObject } from "react";
import { useScroll, useSpring, type MotionValue } from "motion/react";

/**
 * Scroll-position driven progress for a section.
 * Progress is a live motion value: scrolling up reverses it naturally.
 */
export function useSectionScroll(
  ref: RefObject<HTMLElement | null>,
  offset: [string, string] = ["start end", "end start"],
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset as any,
  });

  return useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0005,
  });
}

/** True on small screens; used to simplify heavy pinned animations. */
export function useIsCompact() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return compact;
}
