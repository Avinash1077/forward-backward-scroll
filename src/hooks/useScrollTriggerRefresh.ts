import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap-setup";

/**
 * Refresh GSAP ScrollTrigger measurements on route/content changes.
 * Mount inside each page component so triggers created by that page
 * re-measure after mount, images/fonts settle, and on unmount cleanup.
 */
export function useScrollTriggerRefresh(deps: unknown[] = []) {
  useEffect(() => {
    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
