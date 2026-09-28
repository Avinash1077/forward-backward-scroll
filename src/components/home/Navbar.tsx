import { Link, useRouterState } from "@tanstack/react-router";

const links = [
  { label: "Home", to: "/" },
  { label: "Research Club", to: "/research-club" },
  { label: "Editing Club", to: "/pixel_pirates_complete_website%20(1).html" },
  { label: "Events", to: "/events" },
];

export function Navbar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const lightPage = pathname === "/editing-club";
  const homePage = pathname === "/";

  return (
    <header className={`site-navbar ${lightPage ? "site-navbar-light" : "site-navbar-dark"} fixed inset-x-0 top-0 z-50`}>
      <nav className="site-navbar-inner relative mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 sm:px-8">
        <Link
          to="/"
          className={`site-navbar-brand absolute left-4 flex items-center gap-3 sm:left-8 ${homePage ? "site-navbar-brand-home" : ""}`}
        >
          <img
            src="/perilogo%20(1).png"
            alt="PERI Institute of Technology"
            width={homePage ? 150 : 44}
            height={homePage ? 150 : 44}
            className={homePage ? "h-[150px] w-[150px] object-contain" : "h-11 w-11 object-contain"}
          />
          {!homePage && <>Computer Science &amp; Engineering</>}
        </Link>
        <ul className="site-navbar-links flex items-center gap-5 text-sm sm:gap-8 sm:text-base">
          {links.map((l) => (
            <li key={l.to}>
              {l.to.startsWith("/") && !l.to.endsWith(".html") ? (
                <Link
                  to={l.to}
                  className={`site-navbar-link ${pathname === l.to ? "site-navbar-link-active" : ""}`}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  href={l.to}
                  className={`site-navbar-link ${pathname === l.to ? "site-navbar-link-active" : ""}`}
                >
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
