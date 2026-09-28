import { ArrowDown, ArrowRight, Mouse } from "lucide-react";

export function ResearchHero() {
  return (
    <section className="research-hero relative h-screen overflow-hidden">
      <img
        src="/researchhero.png"
        alt="Research Club hero image"
        width={1920}
        height={1080}
        className="research-hero-background absolute inset-0 h-full w-full object-cover brightness-125 contrast-110 saturate-[1.3]"
      />
      <div aria-hidden="true" className="research-hero-earth research-earth">
        <div className="earth-track animate-earth-rotate">
          <img src="/earth.png" alt="" width={2048} height={1024} />
          <img src="/earth.png" alt="" width={2048} height={1024} />
        </div>
      </div>
      <img
        src="/boys.png"
        alt=""
        aria-hidden="true"
        width={1600}
        height={900}
        className="research-hero-boy research-boy absolute bottom-0 h-[92vh] w-auto max-w-none object-contain object-bottom"
      />
      <div className="research-hero-lockup research-lockup absolute left-[6vw] top-[24%] z-3">
        <img
          src="/TEXT.png"
          alt="Promethean Minds"
          width={520}
          height={130}
          className="research-hero-title research-title-image"
        />
        <p className="research-hero-club-name research-club-name">RESEARCH &amp; INNOVATION CLUB</p>
        <p className="research-hero-tagline research-tagline">
          Knowledge ignites minds.
          <br />
          Together we build a brighter tomorrow.
        </p>
        <a href="#research-about" className="research-hero-button research-hero-action">
          <span>Explore our research</span>
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </a>
        <div className="research-hero-stats research-hero-highlights" aria-label="Research Club highlights">
          <div className="research-hero-stat">
            <strong>6+</strong>
            <span>Research domains</span>
          </div>
          <div className="research-hero-stat">
            <strong>3+</strong>
            <span>Ideas explored</span>
          </div>
          <div className="research-hero-stat">
            <strong>11</strong>
            <span>Dedicated minds</span>
          </div>
          <div className="research-hero-stat">
            <strong>1</strong>
            <span>Brighter tomorrow</span>
          </div>
        </div>
      </div>
      <div className="research-hero-rail research-hero-navigation backdrop-blur-md" aria-label="Research Club navigation">
        <div className="research-hero-rail-brand">
          <strong>Promethean Minds</strong>
          <span>Research &amp; Innovation Club</span>
        </div>
        <a href="#research-about" className="research-hero-scroll animate-scroll-cue">
          <Mouse aria-hidden="true" className="h-6 w-6" />
          <span>Scroll to explore</span>
          <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
        <div className="research-hero-rail-message">
          <span>Curiosity drives change</span>
        </div>
      </div>
    </section>
  );
}
