import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap } from "@/lib/gsap-setup";
import { useGsapReveal } from "@/hooks/useGsapScroll";

type GsRevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  once?: boolean;
  as?: "div" | "section" | "span";
};

/**
 * Drop-in scroll-triggered entrance powered by GSAP ScrollTrigger.
 * - Scroll down → plays. Scroll back up → reverses (unless `once`).
 * - Fully Lenis-compatible (ScrollTrigger is synced globally).
 * Use for non-pinned content; keep Framer Motion for pinned scrub sections.
 */
export function GsReveal({ children, className, y = 48, delay = 0, once = false, as = "div" }: GsRevealProps) {
  const ref = useGsapReveal<HTMLDivElement>({ y, delay, once });
  if (as === "section") return <section ref={ref as never} className={className}>{children}</section>;
  if (as === "span") return <span ref={ref as never} className={className}>{children}</span>;
  return <div ref={ref} className={className}>{children}</div>;
}

/**
 * Auto-batch: animates every `[data-gs-reveal]` descendant of the container.
 * Add `data-gs-reveal` + optional `data-gs-delay="0.1"` in JSX, wrap the page
 * section with <GsBatch>, done. Reverses on scroll-up.
 */
export function GsBatch({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerGsap();
    const root = ref.current;
    if (!root || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-gs-reveal]");
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        const delay = Number(el.dataset.gsDelay ?? 0) || 0;
        gsap.fromTo(
          el,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
