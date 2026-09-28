import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap-setup";

type ScrollToTarget = number | string | HTMLElement;

type ScrollToOptions = {
  offset?: number;
  duration?: number;
  immediate?: boolean;
};

type SmoothScrollContextValue = {
  /** Direct access to the Lenis instance (null on server / before init). */
  lenis: Lenis | null;
  /** Smooth-scroll to a target (selector, element, or y position). */
  scrollTo: (target: ScrollToTarget, opts?: ScrollToOptions) => void;
  /** Stop / start the smoother (e.g. while a modal menu is open). */
  stop: () => void;
  start: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function useLenis() {
  return useContext(SmoothScrollContext).lenis;
}

function nativeScrollTo(target: ScrollToTarget, offset = 0) {
  if (typeof target === "number") {
    window.scrollTo({ top: target + offset, behavior: "smooth" });
  } else if (typeof target === "string") {
    const el = document.querySelector(target);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Global smooth-scroll provider.
 *
 * Division of labour across the three libraries:
 * - **Lenis** drives buttery inertia scrolling (works forward AND backward).
 * - **GSAP ScrollTrigger** handles scroll-linked pinning/scrub/entrances that
 *   need exact trigger positions — kept in sync via `lenis.on("scroll", ...)`.
 * - **Framer Motion (`motion/react`)** handles viewport-enter reveals
 *   (`whileInView`) and scroll-bound MotionValues (`useScroll`) — it listens
 *   to native scroll, which Lenis still performs (smoothed), so no changes
 *   to existing `useSectionScroll` sections are required.
 *
 * Mount once at the root (see `src/routes/__root.tsx`).
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    registerGsap();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Respect reduced-motion users: no smoothing, native scroll only.
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      // Buttery but controllable. Lower lerp = floatier.
      lerp: 0.1,
      // Keep native travel distance; smoothness comes from lerp.
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Keep GSAP + Lenis in lockstep:
    // Lenis emits native scroll; ScrollTrigger must re-measure on every tick.
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Also hook GSAP's ticker so ScrollTrigger scrub tweens render on the
    // same frame as Lenis updates (prevents 1-frame lag on pins).
    const onGsapTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onGsapTick);
    gsap.ticker.lagSmoothing(0);

    // Intercept same-page hash links (e.g. "#research-about") so they glide
    // through Lenis instead of jumping natively.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest?.('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, {
        offset: -70,
        duration: 1.4,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(onGsapTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: ScrollToTarget, opts?: ScrollToOptions) => {
    const { offset = 0, duration = 1.4, immediate = false } = opts ?? {};
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target as never, {
        offset,
        duration,
        immediate,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
      return;
    }
    // Fallback when Lenis isn't ready (or reduced motion).
    if (immediate && typeof target === "number") {
      window.scrollTo({ top: target, behavior: "auto" });
      return;
    }
    nativeScrollTo(target, offset);
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return (
    <SmoothScrollContext.Provider
      value={{ lenis: lenisRef.current, scrollTo, stop, start }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
