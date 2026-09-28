import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events | CSE Department" },
      {
        name: "description",
        content: "CSE Department events are coming soon.",
      },
    ],
  }),
  component: Events,
});

function Events() {
  return (
    <div className="flex min-h-screen flex-col bg-[#080808] text-white">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-32">
        <div className="text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-amber-300">
            CSE Department
          </p>
          <h1 className="font-display text-5xl uppercase tracking-[0.16em] text-white sm:text-7xl">
            Coming Soon
          </h1>
          <Link
            to="/"
            className="mt-10 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-amber-300"
          >
            Back to home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
