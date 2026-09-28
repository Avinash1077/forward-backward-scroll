import { Link } from "@tanstack/react-router";

const links = [
  { label: "Home", to: "/" },
  { label: "Research Club", to: "/research-club" },
  { label: "Editing Club", to: "/pixel_pirates_complete_website%20(1).html" },
  { label: "Gallery", to: "/gallery" },
  { label: "Events", to: "/events" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p className="font-display font-semibold text-foreground">
          Computer Science &amp; Engineering
        </p>
        <nav className="flex flex-wrap justify-center gap-5">
          {links.map((l) =>
            l.to.startsWith("/") && !l.to.endsWith(".html") ? (
              <Link key={l.to} to={l.to} className="hover:text-foreground">
                {l.label}
              </Link>
            ) : (
              <a key={l.to} href={l.to} className="hover:text-foreground">
                {l.label}
              </a>
            )
          )}
        </nav>
        <p>© {new Date().getFullYear()} CSE Department Clubs</p>
      </div>
    </footer>
  );
}
