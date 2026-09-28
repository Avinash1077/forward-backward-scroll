import { useRef } from "react";
import { motion, useTransform } from "@/lib/motion";
import { ArrowDown, ArrowRight, Mouse } from "lucide-react";
import { useSectionScroll } from "@/components/home/useSectionScroll";

export function EditingHero() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref, ["start start", "end start"]);

  const titleScale = useTransform(p, [0, 1], [1, 0.72]);
  const titleY = useTransform(p, [0, 1], ["0vh", "-20vh"]);
  const titleOpacity = useTransform(p, [0, 0.8, 1], [1, 0.55, 0]);
  const subtitleOpacity = useTransform(p, [0, 0.32], [1, 0]);
  const subtitleY = useTransform(p, [0, 0.42], [0, -36]);
  const imageScale = useTransform(p, [0, 1], [1, 1.18]);
  const imageOpacity = useTransform(p, [0, 1], [1, 0.7]);
  const statsY = useTransform(p, [0.2, 0.7], [30, 0]);
  const statsOpacity = useTransform(p, [0.15, 0.55], [0, 1]);

  return (
    <section ref={ref} className="editing-hero relative h-[200vh] overflow-hidden">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.img
          src="/researchhero.png"
          alt="Editing Club hero image"
          width={1920}
          height={1080}
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="editing-hero-background absolute inset-0 h-full w-full object-cover brightness-125 contrast-110 saturate-[1.3] will-change-transform"
        />
        <div aria-hidden="true" className="editing-hero-earth editing-earth">
          <div className="earth-track animate-earth-rotate">
            <img src="/earth.png" alt="" width={2048} height={1024} />
            <img src="/earth.png" alt="" width={2048} height={1024} />
          </div>
        </div>
        <motion.div
          style={{ y: titleY, scale: titleScale }}
          className="editing-hero-lockup editing-lockup absolute left-[6vw] top-[24%] z-3 will-change-transform"
        >
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
            <motion.img
              src="/editngclub.jpeg"
              alt="Creative Minds"
              width={520}
              height={130}
              initial={{ opacity: 0, x: -18, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="editing-hero-title editing-title-image"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="editing-hero-club-name editing-club-name"
            >
              EDITING & CREATIVE CLUB
            </motion.p>
          </motion.div>

          <motion.div style={{ opacity: subtitleOpacity, y: subtitleY }}>
            <motion.p
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.0, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="editing-hero-tagline editing-tagline"
            >
              Creativity fuels innovation.
              <br />
              Together we craft visual stories.
            </motion.p>
            <motion.a
              href="#editing-about"
              initial={{ opacity: 0, y: 28, x: -12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
              className="editing-hero-button editing-hero-action"
            >
              <span>Explore our work</span>
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </motion.a>
          </motion.div>

          <motion.div
            style={{ opacity: statsOpacity, y: statsY }}
            className="editing-hero-stats editing-hero-highlights"
            aria-label="Editing Club highlights"
          >
            <motion.div className="editing-hero-stat" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.46 }}>
              <strong>5+</strong>
              <span>Creative domains</span>
            </motion.div>
            <motion.div className="editing-hero-stat" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.54 }}>
              <strong>100+</strong>
              <span>Projects delivered</span>
            </motion.div>
            <motion.div className="editing-hero-stat" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.62 }}>
              <strong>15</strong>
              <span>Creative minds</span>
            </motion.div>
            <motion.div className="editing-hero-stat" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.7 }}>
              <strong>1</strong>
              <span>Shared vision</span>
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="editing-hero-rail editing-hero-navigation backdrop-blur-md" aria-label="Editing Club navigation">
          <div className="editing-hero-rail-brand">
            <strong>Creative Minds</strong>
            <span>Editing & Creative Club</span>
          </div>
          <a href="#editing-about" className="editing-hero-scroll animate-scroll-cue">
            <Mouse aria-hidden="true" className="h-6 w-6" />
            <span>Scroll to explore</span>
            <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
          <div className="editing-hero-rail-message">
            <span>Creativity drives change</span>
          </div>
        </div>
      </div>
    </section>
  );
}