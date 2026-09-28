import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ResearchHero } from "@/components/research/ResearchHero";
import { ResearchMembers } from "@/components/research/ResearchMembers";
import { ResearchPhilosophy } from "@/components/research/ResearchPhilosophy";
import { ResearchWhoWeAre } from "@/components/research/ResearchWhoWeAre";
import { ScrollJourney } from "@/components/research/scroll-journey";
import { ResearchCTA } from "@/components/research/ResearchCTA";

export const Route = createFileRoute("/research-club")({
  head: () => ({
    meta: [
      { title: "Research Club | CSE Department" },
      {
        name: "description",
        content:
          "The CSE Department Research Club — artificial intelligence, machine learning, emerging technologies and hands-on research that turns curiosity into results.",
      },
      { property: "og:title", content: "Research Club | CSE Department" },
      {
        property: "og:description",
        content:
          "Explore. Experiment. Discover. Join a community of students building AI and ML projects, reading papers and turning research into working prototypes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchClub,
});

function ResearchClub() {
  return (
    <div className="research-page relative w-full bg-background">
      <Navbar />
      <main>
        <ResearchHero />
        <div className="research-content">
          <ResearchPhilosophy />
          <ResearchWhoWeAre />
          <ResearchMembers />
          <ScrollJourney />
          <ResearchCTA />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
