import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";

const links = [
  { label: "Home", to: "/" },
  { label: "Research Club", to: "/research-club" },
  { label: "Editing Club", to: "/editing-club" },
  { label: "Gallery", to: "/gallery" },
  { label: "Events", to: "/events" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 240], ["oklch(0.16 0.03 250 / 0)", "oklch(0.16 0.03 250 / 0.82)"]);
  const borderOpacity = useTransform(scrollY, [0, 240], [0, 1]);

  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-md"
    >
      <motion.div style={{ opacity: borderOpacity }} className="absolute inset-x-0 bottom-0 h-px bg-border" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="/" className="font-display text-sm font-semibold tracking-tight sm:text-base">
          Computer Science &amp; Engineering
        </a>
        <ul className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <a
                href={l.to}
                className="story-link transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <Link
          to="/"
          className="rounded-full border border-primary/40 px-4 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10 md:text-sm"
        >
          Join us
        </Link>
      </nav>
    </motion.header>
  );
}
