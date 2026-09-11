import { createFileRoute } from "@tanstack/react-router";
import researchImg from "@/assets/research.jpg";
import editingImg from "@/assets/editing.jpg";
import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { Department } from "@/components/home/Department";
import { Leadership } from "@/components/home/Leadership";
import { ClubInCharge } from "@/components/home/ClubInCharge";
import { ClubPreview } from "@/components/home/ClubPreview";
import { FinalCTA } from "@/components/home/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CSE Department Club | Research & Editing Clubs" },
      {
        name: "description",
        content:
          "The Computer Science & Engineering Department clubs — research, creativity and innovation through the Research Club and the Editing Club.",
      },
      { property: "og:title", content: "CSE Department Club | Research & Editing Clubs" },
      {
        property: "og:description",
        content:
          "Explore the CSE Department's Research Club and Editing Club — AI, research, video editing, design and visual storytelling.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative w-full bg-background">
      <Navbar />
      <main>
        <Hero />
        <Department />
        <Leadership />
        <ClubInCharge />
        <ClubPreview
          eyebrow="Research Club"
          backdropWord="RESEARCH"
          tagline="Explore. Experiment. Discover."
          description="A space for students who like hard questions — artificial intelligence, machine learning, emerging technologies and hands-on research projects that turn curiosity into published work and working prototypes."
          topics={["AI", "Machine Learning", "Research", "Emerging Tech", "Innovation"]}
          image={researchImg}
          imageAlt="Glowing neural network representing AI research"
          href="/research-club"
          cta="Explore Research Club →"
        />
        <ClubPreview
          eyebrow="Editing Club"
          backdropWord="EDITING"
          tagline="Create. Edit. Inspire."
          description="Where the department tells its stories — video editing, photography, graphic design, motion graphics and visual storytelling for every event, project and campaign we run."
          topics={[
            "Video Editing",
            "Photography",
            "Graphic Design",
            "Motion Graphics",
            "Visual Storytelling",
          ]}
          image={editingImg}
          imageAlt="Cinematic video editing and colour grading suite"
          href="/editing-club"
          cta="Explore Editing Club →"
          reversed
        />
        <FinalCTA />
      </main>
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p className="font-display font-semibold text-foreground">
            Computer Science &amp; Engineering
          </p>
          <nav className="flex flex-wrap justify-center gap-5">
            <a href="/" className="hover:text-foreground">Home</a>
            <a href="/research-club" className="hover:text-foreground">Research Club</a>
            <a href="/editing-club" className="hover:text-foreground">Editing Club</a>
            <a href="/gallery" className="hover:text-foreground">Gallery</a>
            <a href="/events" className="hover:text-foreground">Events</a>
          </nav>
          <p>© {new Date().getFullYear()} CSE Department Clubs</p>
        </div>
      </footer>
    </div>
  );
}
