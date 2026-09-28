import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap-setup";

/**
 * Thin GSAP-driven page progress bar (gold gradient, 3px, top-fixed).
 * Replaces per-section width MotionValues with one global scrub trigger,
 * so forward + backward scrolling is perfectly symmetric.
 */
export function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerGsap();
    const bar = ref.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: 0.4,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <div
        ref={ref}
        className="h-full w-full origin-left bg-gradient-to-r from-primary via-amber-300 to-primary"
      />
    </div>
  );
}

/**
 * Lenis-aware back-to-top floating button.
 */
export function BackToTop() {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    registerGsap();
    const btn = btnRef.current;
    if (!btn) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        btn,
        { opacity: 0, y: 16, pointerEvents: "none" as never },
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto" as never,
          ease: "power2.out",
          duration: 0.4,
          scrollTrigger: {
            start: "top -35%",
            end: "max",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <button
      ref={btnRef}
      type="button"
      aria-label="Back to top"
      onClick={() => (document.querySelector("main") ?? document.body).scrollIntoView()}
      className="fixed bottom-6 right-6 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-lg shadow-lg backdrop-blur transition-transform hover:scale-110"
    >
      ↑
    </button>
  );
}

export function ScrollChrome() {
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <>
      <ScrollProgressBar />
      <BackToTop />
    </>
  );
}
