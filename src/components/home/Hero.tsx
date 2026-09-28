import { useEffect, useRef } from "react";
import { motion, useTransform } from "@/lib/motion";
import { useSectionScroll } from "./useSectionScroll";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const p = useSectionScroll(ref, ["start start", "end start"]);

  const titleScale = useTransform(p, [0, 1], [1, 0.62]);
  const titleY = useTransform(p, [0, 1], ["0vh", "-26vh"]);
  const titleOpacity = useTransform(p, [0, 0.8, 1], [1, 0.5, 0]);
  const subOpacity = useTransform(p, [0, 0.35], [1, 0]);
  const subY = useTransform(p, [0, 0.5], [0, -60]);
  const veilOpacity = useTransform(p, [0, 1], [0.4, 1]);
  const orbB = useTransform(p, [0, 1], ["0%", "55%"]);
  const orbC = useTransform(p, [0, 1], ["0%", "-70%"]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = ref.current;
    if (!canvas || !hero) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 640;
    const count = mobile ? 60 : 110;
    const nodes: Array<{
      ox: number;
      oy: number;
      oz: number;
      link: boolean;
      radius: number;
    }> = [];
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let index = 0; index < count; index += 1) {
      const y = 1 - (index / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = golden * index;
      nodes.push({
        ox: Math.cos(theta) * radiusAtY,
        oy: y,
        oz: Math.sin(theta) * radiusAtY,
        link: Math.random() > 0.5,
        radius: 1.6 + Math.random() * 1.2,
      });
    }

    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;
    let rotationY = 0;
    let rotationX = 0.15;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollProgress = 0;
    let animationFrame = 0;
    let visible = true;

    const resize = () => {
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = hero.clientWidth;
      height = hero.clientHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      targetMouseX = (event.clientX - bounds.left) / bounds.width - 0.5;
      targetMouseY = (event.clientY - bounds.top) / bounds.height - 0.5;
    };

    const updateScroll = () => {
      const bounds = hero.getBoundingClientRect();
      const rawProgress = -bounds.top / (bounds.height || window.innerHeight);
      scrollProgress = Math.min(Math.max(rawProgress, 0), 1);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? visible;
    });

    const project = (node: (typeof nodes)[number], scrollPush: number) => {
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const rotatedX = node.ox * cosY - node.oz * sinY;
      const rotatedZ = node.ox * sinY + node.oz * cosY;
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const y = node.oy * cosX - rotatedZ * sinX;
      const z = node.oy * sinX + rotatedZ * cosX;
      const perspective = 1.7 - scrollPush;
      const scale = perspective / (perspective - z * 0.9);

      return {
        x: width / 2 + rotatedX * Math.min(width, height) * (mobile ? 0.34 : 0.4) * scale,
        y: height / 2 + y * Math.min(width, height) * (mobile ? 0.34 : 0.4) * scale,
        z,
        scale,
      };
    };

    const draw = () => {
      animationFrame = requestAnimationFrame(draw);
      if (!visible || width === 0 || height === 0) return;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      const scrollPush = scrollProgress * 0.5;
      const fade = 1 - scrollProgress * 0.8;
      rotationY += (reducedMotion ? 0 : 0.0022) + mouseX * 0.004;
      rotationX += (0.15 + mouseY * 0.3 - rotationX) * 0.03;

      context.clearRect(0, 0, width, height);
      const projected = nodes
        .map((node) => ({ node, point: project(node, scrollPush) }))
        .sort((a, b) => a.point.z - b.point.z);

      for (let first = 0; first < projected.length; first += 1) {
        const firstNode = projected[first];
        if (!firstNode || !firstNode.node.link) continue;
        for (let second = first + 1; second < projected.length; second += 1) {
          const secondNode = projected[second];
          if (!secondNode || !secondNode.node.link) continue;
          const a = firstNode.point;
          const b = secondNode.point;
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance >= 70) continue;
          const alpha = 0.16 * (1 - distance / 70) * ((a.scale + b.scale) / 2) * fade;
          context.strokeStyle = `rgba(120, 195, 255, ${alpha})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      projected.forEach(({ node, point }) => {
        const depthAlpha = Math.max(0.15, point.scale - 0.3);
        const radius = node.radius * point.scale;
        const gradient = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 5);
        gradient.addColorStop(0, `rgba(120, 195, 255, ${0.9 * depthAlpha * fade})`);
        gradient.addColorStop(0.4, `rgba(120, 195, 255, ${0.35 * depthAlpha * fade})`);
        gradient.addColorStop(1, "rgba(120, 195, 255, 0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(point.x, point.y, radius * 5, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = `rgba(255, 255, 255, ${Math.min(depthAlpha + 0.2, 1) * fade})`;
        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fill();
      });
    };

    resize();
    updateScroll();
    observer.observe(hero);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: veilOpacity }} className="veil absolute inset-0" />
        <div className="glow absolute inset-0" />

        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] opacity-80"
        />

        <motion.span
          style={{ y: orbB }}
          className="absolute right-[10%] top-[30%] h-16 w-16 rounded-full bg-accent/20 blur-xl animate-hero-twinkle will-change-transform sm:h-28 sm:w-28"
        />
        <motion.span
          style={{ y: orbC }}
          className="absolute bottom-[18%] left-[20%] h-2 w-2 rounded-full bg-primary shadow-[0_0_30px] shadow-primary animate-hero-twinkle will-change-transform"
        />

        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[28%] right-[24%] h-3 w-3 rounded-full bg-primary shadow-[0_0_24px] shadow-primary animate-hero-twinkle will-change-transform"
        />
        <span
          aria-hidden
          style={{ animationDelay: "-1.7s" }}
          className="pointer-events-none absolute bottom-[22%] left-[30%] h-3 w-3 rounded-full bg-accent/70 shadow-[0_0_24px] shadow-accent/70 animate-hero-twinkle will-change-transform"
        />

        <motion.div
          style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center will-change-transform"
        >
          <h1 className="text-4xl font-bold leading-[0.95] sm:text-6xl lg:text-8xl">
            COMPUTER SCIENCE
            <span className="block text-primary">&amp; ENGINEERING</span>
          </h1>
          <motion.div style={{ opacity: subOpacity, y: subY }}>
            <p className="mt-6 text-xs uppercase tracking-[0.42em] text-muted-foreground sm:text-sm">
              Research • Creativity • Innovation
            </p>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Empowering students to explore technology, research, creativity and innovation.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

