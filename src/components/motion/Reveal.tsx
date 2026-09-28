import { motion, type Variants } from "@/lib/motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: (delay: number = 0) => ({
    opacity: 0,
    y: 48,
    filter: "blur(8px)",
  }),
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Run once (true) or replay when scrolling back into view (false). */
  once?: boolean;
  as?: "div" | "span" | "li";
};

/**
 * Framer Motion (motion/react) scroll-triggered reveal.
 * - Plays forward when entering viewport, reverses when `once={false}`.
 * - Works seamlessly under Lenis smoothing because it uses IntersectionObserver,
 *   not raw scroll offsets.
 * - Pair with GSAP scrub/parallax for scroll-linked (vs viewport-enter) motion.
 */
export function Reveal({ children, delay = 0, className, once = true, as = "div" }: RevealProps) {
  const Tag = as === "span" ? motion.span : as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25, margin: "0px 0px -8% 0px" }}
      custom={delay}
    >
      {children}
    </Tag>
  );
}
