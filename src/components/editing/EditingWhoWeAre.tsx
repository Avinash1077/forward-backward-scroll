import { useRef, useState } from "react";
import { motion, useTransform } from "@/lib/motion";
import { useSectionScroll } from "@/components/home/useSectionScroll";
import { Camera, Film, Palette, Music } from "lucide-react";

const teamGroups = {
  leadership: [
    {
      id: "magesh",
      name: "Dr. Magesh Balakrishnan",
      role: "Vice Principal",
      focus: "Strategy & mentorship",
      bio: "Guides the club with a vision that blends leadership, creativity, and academic excellence.",
      image: "/images/leadership/vice-principal.jpg",
    },
    {
      id: "dharma",
      name: "Dharma Prakash",
      role: "Head of Department",
      focus: "Academic direction",
      bio: "Supports every creative initiative with structure, encouragement, and long-term thinking.",
      image: "/images/leadership/hod.jpg",
    },
    {
      id: "suganya",
      name: "Suganya",
      role: "Club In-Charge",
      focus: "Operations & coordination",
      bio: "Keeps the creative energy aligned with planning, communication, and team momentum.",
      image: "/images/leadership/club-incharge.jpg",
    },
    {
      id: "mohammad-salmon",
      name: "Mohammad Salmon K",
      role: "Creative Member",
      focus: "Visual storytelling",
      bio: "Brings a thoughtful eye and creative energy to the stories, visuals, and productions shaped by the club.",
      image: "/Mohammad Salmon K (1).png",
    },
  ],
  secretarial: [
    {
      id: "arun",
      name: "Arun Joseph",
      role: "Student Secretary",
      focus: "Content planning",
      bio: "Turns ideas into clear production plans, team schedules, and polished storytelling experiences.",
      image: "/images/leadership/head-of-club.jpg",
    },
    {
      id: "sneha",
      name: "Sneha Raman",
      role: "Documentation Lead",
      focus: "Creative records",
      bio: "Captures the process, manages visuals, and keeps the club’s story documented with clarity.",
      image: "/images/leadership/hod.jpg",
    },
    {
      id: "vishal",
      name: "Vishal Menon",
      role: "Event Coordinator",
      focus: "Program execution",
      bio: "Coordinates events, visuals, and live execution so every release feels impactful and seamless.",
      image: "/images/leadership/vice-principal.jpg",
    },
  ],
  treasury: [
    {
      id: "ananya",
      name: "Ananya Rao",
      role: "Treasurer",
      focus: "Resource planning",
      bio: "Manages budgets, sponsorship coordination, and resource planning with a practical creative mindset.",
      image: "/images/leadership/club-incharge.jpg",
    },
    {
      id: "nithya",
      name: "Nithya S.",
      role: "Finance Support",
      focus: "Budget tracking",
      bio: "Helps monitor spending, organize materials, and support sustainable club operations.",
      image: "/images/leadership/hod.jpg",
    },
    {
      id: "sam",
      name: "Sam Daniel",
      role: "Resource Coordinator",
      focus: "Inventory & logistics",
      bio: "Ensures tools, setup, and support materials are ready for every club activity and production.",
      image: "/images/leadership/head-of-club.jpg",
    },
  ],
} as const;

const principles = [
  { title: "Visual Storytelling", icon: Film, desc: "Crafting narratives through lens and timeline" },
  { title: "Design Excellence", icon: Palette, desc: "Pixels with purpose, aesthetics with intent" },
  { title: "Creative Collaboration", icon: Camera, desc: "Ideas grow when minds work together" },
  { title: "Technical Mastery", icon: Music, desc: "Tools serve vision, skills amplify art" },
];

function PrincipleCard({
  p,
  index,
  title,
  icon: Icon,
  desc,
}: {
  p: ReturnType<typeof useSectionScroll>;
  index: number;
  title: string;
  icon: React.ElementType;
  desc: string;
}) {
  const step = 1 / principles.length;
  const start = index * step;
  const end = start + step;
  const inPoint = start + step * 0.2;
  const outPoint = end - step * 0.1;

  const opacity = useTransform(p, [start, inPoint, outPoint, end], [0, 1, 1, 0]);
  const y = useTransform(p, [start, inPoint, outPoint, end], [60, 0, 0, -60]);
  const blur = useTransform(p, [start, inPoint, outPoint, end], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 110, scale: 0.82, rotateX: -24, filter: "blur(18px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 1.25,
        delay: index * 0.18,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ opacity, y, filter: blur }}
      className="editing-who-we-are-card will-change-transform"
    >
      <div className="editing-who-we-are-card-icon">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="editing-who-we-are-card-title">{title}</h3>
      <p className="editing-who-we-are-card-desc">{desc}</p>
      <span className="editing-who-we-are-card-bar" aria-hidden="true" />
    </motion.div>
  );
}

export function EditingWhoWeAre() {
  const ref = useRef<HTMLElement | null>(null);
  const p = useSectionScroll(ref, ["start start", "end end"]);
  const [activeGroup, setActiveGroup] = useState<keyof typeof teamGroups>("leadership");
  const [activeMemberId, setActiveMemberId] = useState<string>(teamGroups.leadership[0].id);

  const imageScale = useTransform(p, [0, 1], [1, 1.04]);
  const imageY = useTransform(p, [0, 1], [0, -18]);
  const contentY = useTransform(p, [0, 0.55], [100, 0]);
  const contentOpacity = useTransform(p, [0.1, 0.4], [0, 1]);

  const activeMembers = teamGroups[activeGroup];
  const activePerson = activeMembers.find((member) => member.id === activeMemberId) ?? activeMembers[0];

  const handleTabChange = (group: keyof typeof teamGroups) => {
    setActiveGroup(group);
    setActiveMemberId(teamGroups[group][0].id);
  };

  return (
    <section id="editing-who" ref={ref} className="editing-who-we-are relative h-[280vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="editing-who-we-are-image absolute inset-0 will-change-transform"
          aria-hidden="true"
        />
        <div className="editing-who-we-are-overlay absolute inset-0" aria-hidden="true" />
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 py-24 sm:px-10 lg:px-16 will-change-transform"
        >
          <div className="editing-who-we-are-content w-full" style={{ opacity: contentOpacity }}>
            <motion.div
              className="editing-who-we-are-intro"
              initial={{ opacity: 0, y: 68, x: -20, rotateX: -16, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, x: 0, rotateX: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.3, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="editing-who-we-are-eyebrow">
                <span aria-hidden="true" />
                <p>Who we are</p>
                <span aria-hidden="true" />
              </div>
              <h2 className="editing-who-we-are-title">
                Creative minds
                <span>united</span>
              </h2>
              <p className="editing-who-we-are-subtitle">
                Editors · Designers · Photographers · Filmmakers
              </p>
              <p className="editing-who-we-are-copy">
                We are a collective of creators who believe every frame tells a story. From concept to final cut, we bring ideas to life through video, design, photography, and motion graphics.
              </p>
              <div className="editing-who-we-are-keywords">
                <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }}>Video Editing</motion.span>
                <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.28 }}>Motion Graphics</motion.span>
                <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.36 }}>Photography</motion.span>
                <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.44 }}>Graphic Design</motion.span>
                <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.52 }}>Color Grading</motion.span>
                <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.6 }}>Sound Design</motion.span>
              </div>
            </motion.div>
            <div className="editing-who-we-are-principles">
              {principles.map((principle, index) => (
                <PrincipleCard key={principle.title} p={p} index={index} {...principle} />
              ))}
            </div>

            <div className="editing-team-spotlight">
              <motion.div
                className="editing-team-header"
                initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.0, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <p>Meet the crew</p>
                <h3>The People Behind Pixel Pirates.</h3>
              </motion.div>

              <motion.div
                className="editing-team-tabs"
                role="tablist"
                aria-label="Team categories"
                initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.05, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                {Object.keys(teamGroups).map((group) => (
                  <button
                    key={group}
                    type="button"
                    role="tab"
                    aria-selected={activeGroup === group}
                    className={`editing-team-tab ${activeGroup === group ? "is-selected" : ""}`}
                    onClick={() => handleTabChange(group as keyof typeof teamGroups)}
                  >
                    {group === "leadership" ? "Leadership" : group === "secretarial" ? "SECRETARIAL TEAM" : "TREASURY"}
                  </button>
                ))}
              </motion.div>

              <div className="editing-team-spotlight-stage">
                <motion.div
                  key={activePerson.id}
                  initial={{ opacity: 0, scale: 0.74, y: 96, rotateX: -22, filter: "blur(14px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
                  className="editing-member-featured"
                >
                  <div className="editing-member-featured-image-wrap">
                    <img src={activePerson.image} alt={activePerson.name} className="editing-member-featured-image" />
                  </div>
                  <div className="editing-member-featured-copy">
                    <span>{activePerson.role}</span>
                    <h4>{activePerson.name}</h4>
                    <p className="editing-member-focus">{activePerson.focus}</p>
                    <p>{activePerson.bio}</p>
                  </div>
                </motion.div>

                <div className="editing-team-strip">
                  {activeMembers.map((member, index) => {
                    const isActive = member.id === activePerson.id;
                    return (
                      <motion.button
                        type="button"
                        key={member.id}
                        initial={{ opacity: 0, y: 42, scale: 0.82, rotateX: -14, filter: "blur(12px)" }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: isActive ? 1.08 : 1,
                          rotateX: 0,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          duration: 0.95,
                          delay: 0.3 + index * 0.14,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`editing-member-card ${isActive ? "is-active" : "is-idle"}`}
                        onClick={() => setActiveMemberId(member.id)}
                        aria-pressed={isActive}
                      >
                        <img src={member.image} alt={member.name} />
                        <div className="editing-member-card-copy">
                          <strong>{member.name}</strong>
                          <span>{member.role}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}