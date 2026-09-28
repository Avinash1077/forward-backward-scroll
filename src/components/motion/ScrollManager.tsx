import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ScrollTrigger } from "@/lib/gsap-setup";

/**
 * Route-aware scroll manager:
 * - On every pathname change: instantly reset scroll to top (Lenis-aware),
 *   then refresh ScrollTrigger so new page triggers measure correctly.
 * - Also refreshes shortly after mount to catch late fonts/images.
 */
export function ScrollManager() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    // Kill stale triggers from the previous page before measuring the new one.
    const stale = ScrollTrigger.getAll();
    stale.forEach((t) => t.kill());

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
