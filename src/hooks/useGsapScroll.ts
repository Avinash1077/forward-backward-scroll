import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap-setup";

export type GsaoRevealOptions = {
  /** Vertical travel in px (positive = rises from below). */
  y?: number;
  /** Start opacity. */
  fromOpacity?: number;
  /** Duration in seconds. */
  duration?: number;
  /** Extra delay in seconds. */
  delay?: number;
  /** GSAP ease string. */
  ease?: string;
  /** ScrollTrigger start, e.g. "top 85%". */
  start?: string;
  /** Play once and keep final state. */
  once?: boolean;
  /** Disable on small screens if true. */
  disableOnMobile?: boolean;
  /** ScrollTrigger scrub value (true/number) — drives tween directly by scroll. */
  scrub?: boolean | number;
  /** Scale from value. */
  scale?: number;
};

/**
 * useGsapReveal — scroll-triggered entrance for any element.
 *
 * Works forward AND backward:
 * - Without scrub: uses toggleActions "play none none reverse" so scrolling
 *   back up reverses the tween instead of leaving it stuck at the end state.
 * - With scrub: progress is fully bound to scroll position in both directions.
 *
 * Lenis-friendly: ScrollTrigger is kept in sync with Lenis in
 * `SmoothScrollProvider`, so no extra wiring is needed here — just refresh
 * on route/content changes (handled automatically via ScrollTrigger.refresh
 * on resize; call `ScrollTrigger.refresh()` after async content if needed).
 */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options: GsaoRevealOptions = {},
) {
  const {
    y = 48,
    fromOpacity = 0,
    duration = 1,
    delay = 0,
    ease = "power3.out",
    start = "top 85%",
    once = false,
    disableOnMobile = false,
    scrub = false,
    scale,
  } = options;

  const ref = useRef<T | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (disableOnMobile && window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          y,
          opacity: fromOpacity,
          ...(typeof scale === "number" ? { scale } : {}),
        },
        {
          y: 0,
          opacity: 1,
          ...(typeof scale === "number" ? { scale: 1 } : {}),
          duration,
          delay,
          ease,
          ...(scrub
            ? {
                scrollTrigger: {
                  trigger: el,
                  start,
                  end: "top 35%",
                  scrub: typeof scrub === "number" ? scrub : 1,
                },
              }
            : {
                scrollTrigger: {
                  trigger: el,
                  start,
                  toggleActions: once
                    ? "play none none none"
                    : "play none none reverse",
                },
              }),
        },
      );
    }, el);

    // Re-measure after fonts/images settle (prevents mis-aligned triggers).
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, [y, fromOpacity, duration, delay, ease, start, once, disableOnMobile, scrub, scale]);

  return ref;
}

/**
 * useGsapParallax — classic data-speed style parallax in both scroll directions.
 * Attach to an element; it drifts by `speed * viewportHeight` across its trigger range.
 */
export function useGsapParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 0.15,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * useGsapScrubProgress — binds a tween's progress 1:1 to section scroll.
 * Useful for pinned storytelling / horizontal scroll sections.
 * Returns the container ref; animate `.gsap-scrub-target` children inside.
 */
export function useGsapPinnedScrub<T extends HTMLElement = HTMLDivElement>(opts?: {
  end?: string;
  pin?: boolean;
}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return; // keep mobile simple & fast

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll<HTMLElement>(".gsap-scrub-target");
      if (targets.length === 0) return;
      gsap.fromTo(
        targets,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: opts?.end ?? "+=150%",
            scrub: 1,
            pin: opts?.pin ?? false,
            anticipatePin: 1,
          },
        },
      );
    }, el);

    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, [opts?.end, opts?.pin]);

  return ref;
}
