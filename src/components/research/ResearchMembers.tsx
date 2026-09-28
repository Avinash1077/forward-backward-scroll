import { useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useTransform } from "@/lib/motion";
import { ArrowDown, BarChart3, Lightbulb, Target, UsersRound } from "lucide-react";
import { useSectionScroll } from "@/components/home/useSectionScroll";

const members = [
  {
    name: "Varshaa B",
    role: "President",
    image: "/VARSHAA.png",
    statement: ["Guiding the vision", "Driving the mission"],
    body: "Leading Promethean Minds towards a culture of curiosity, research and innovation.",
  },
  {
    name: "Jasmine A",
    role: "Vice President",
    image: "/JASMINE.png",
    statement: ["Ideas grow stronger", "Together"],
    body: "Creating the space, rhythm and support that help every member move from interest to impact.",
  },
  {
    name: "Kannan S",
    role: "Secretary",
    image: "/kannan.png",
    statement: ["Curiosity is", "a team sport"],
    body: "Connecting people, projects and opportunities across the research community.",
  },
  {
    name: "Lokith V",
    role: "Treasurer",
    image: "/lokith.png",
    statement: ["Build the work", "that lasts"],
    body: "Helping promising experiments become focused, responsible and repeatable research.",
  },
  { name: "Shyam S", role: "Joint Secretary", image: "/shyam.png", statement: ["Make the question", "matter"], body: "Turning thoughtful questions into shared projects and meaningful conversations." },
  { name: "Gopika G.S", role: "Joint Treasurer", image: "/gopika.png", statement: ["Make room", "for possibility"], body: "Keeping the community open, organized and ready for the next idea." },
  { name: "Avinash R.P", role: "Student Secretary", image: "/avinash.png", statement: ["Move curiosity", "forward"], body: "Helping members find the tools, people and confidence to begin." },
  { name: "Deepika S", role: "Student Secretary", image: "/deepika.png", statement: ["Learn", "in public"], body: "Making research feel collaborative, practical and welcoming for everyone." },
  { name: "Manju M", role: "Student Secretary", image: "/manju.png", statement: ["Build", "with care"], body: "Supporting projects that connect technical ambition with real-world needs." },
  { name: "Prathima G", role: "Student Secretary", image: "/prathima.png", statement: ["Share", "the work"], body: "Bringing teams together around honest experiments and useful outcomes." },
  { name: "Lilly V", role: "Student Secretary", image: "/lilly.png", statement: ["Shape", "tomorrow"], body: "Growing the next generation of research-minded creators." },
];

export function ResearchMembers() {
  const ref = useRef<HTMLElement | null>(null);
  const progress = useSectionScroll(ref, ["start start", "end end"]);
  const sectionInView = useInView(ref, { amount: 0.01 });
  const [activeIndex, setActiveIndex] = useState(0);
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(progress, "change", (value) => {
    setActiveIndex(Math.min(members.length - 1, Math.floor(value * members.length)));
  });

  return (
    <section id="research-members" ref={ref} className="team-page research-members">
      <main className="members-stage">
        {members.map((member, index) => (
          <article id={`member-${index + 1}`} key={member.name} className={`member-panel ${activeIndex === index ? "is-active" : ""}`}>
            <div className="portrait-zone">
              <div className={`main-photo ${index === 0 ? "president-main" : index === 6 ? "avinash-main" : `crop-${(index % 10) + 1}`}`}><img src={member.image} alt={member.name} /></div>
            </div>
            <div className="profile-zone">
              <div className="profile-copy">
                <span className="role-kicker">{member.role}</span>
                <h1 aria-label={member.name}>
                  {member.name.split("").map((letter, letterIndex) => (
                    <span className="member-letter" key={`${member.name}-${letterIndex}`}>
                      {letter === " " ? "\u00a0" : letter}
                    </span>
                  ))}
                </h1>
                <p className="display-role">{member.role}</p>
                <span className="gold-rule" />
                <h2>{member.statement.map((line) => <span key={line}>{line}</span>)}</h2>
                <p className="statement">{member.body}</p>
                <div className="values">
                  <div><Lightbulb /><span>Unite<br />people</span></div>
                  <div><UsersRound /><span>Enable<br />opportunities</span></div>
                  <div><Target /><span>Strengthen<br />initiatives</span></div>
                  <div><BarChart3 /><span>Move<br />forward</span></div>
                </div>
              </div>
              <div className="library-art" style={{ backgroundImage: "url('/images/research.jpg')" }} aria-hidden="true" />
              <p className="closing-line">Igniting curiosity.<br />Investigating possibilities.<br />Shaping tomorrow.</p>
            </div>
            <footer><span>11 minds</span><i /> <span>1 research community</span><i /> <span>1 shared purpose</span></footer>
          </article>
        ))}
      </main>
      <div className={`team-progress ${sectionInView ? "members-ui-visible" : ""}`} aria-hidden="true"><motion.span style={{ width: progressWidth }} /></div>
    </section>
  );
}
