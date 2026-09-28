import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Register GSAP plugins exactly once (safe for HMR + SSR).
 * Call this at module scope of any client-only scroll component.
 */
export function registerGsap() {
  if (typeof window === "undefined") return;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export { gsap, ScrollTrigger };
