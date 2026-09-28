import { motion } from "@/lib/motion";

export function ClubInCharge({
  profiles = [
    {
      image: "/images/leadership/club-incharge.jpg",
      imageAlt: "Club In-Charge",
      name: "Name Here",
      title: "Club In-Charge",
    },
  ],
}: {
  profiles?: Array<{
    image: string;
    imageAlt: string;
    imageFit?: "cover" | "contain";
    name: string;
    title: string;
  }>;
}) {

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-secondary/20 p-3 sm:gap-8 sm:p-6">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.image}
              initial={{ x: index === 0 ? -96 : 96, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="min-w-0 text-center"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl border border-border bg-background">
                <img
                  src={profile.image}
                  alt={profile.imageAlt}
                  width={1100}
                  height={1300}
                  loading="lazy"
                  className={`h-full w-full ${profile.imageFit === "contain" ? "object-contain" : "object-cover"}`}
                />
              </div>
              <div className="px-2 pt-4">
                <p className="text-sm font-semibold sm:text-base">{profile.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {profile.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

