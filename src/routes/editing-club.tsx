import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { EditingHero } from "@/components/editing/EditingHero";
import { EditingPhilosophy } from "@/components/editing/EditingPhilosophy";
import { EditingWhoWeAre } from "@/components/editing/EditingWhoWeAre";
import { EditingScrollJourney } from "@/components/editing/EditingScrollJourney";
import { EditingCTA } from "@/components/editing/EditingCTA";

export const Route = createFileRoute("/editing-club")({
  head: () => ({
    meta: [
      { title: "Editing Club | CSE Department" },
      {
        name: "description",
        content:
          "The CSE Department Editing Club — video editing, motion graphics, photography, graphic design and visual storytelling for every story we tell.",
      },
      { property: "og:title", content: "Editing Club | CSE Department" },
      {
        property: "og:description",
        content:
          "Create. Edit. Inspire. Join a community of creators crafting videos, designs, photos and motion graphics that tell the department's stories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EditingClub,
});

function EditingClub() {
  if (typeof window !== "undefined") {
    window.location.href = "/pixel_pirates_complete_website%20(1).html";
  }

  return (
    <div className="editing-page relative w-full bg-background">
      <Navbar />
      <main>
        <EditingHero />
        <div className="editing-content">
          <EditingPhilosophy />
          <EditingWhoWeAre />
          <EditingScrollJourney />
          <EditingCTA />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}