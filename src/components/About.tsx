"use client";

const values = [
  {
    num: "01",
    title: "Premium Quality",
    desc: "We invest in the finest synthetic turf and infrastructure so every player experiences a professional-grade surface from day one.",
  },
  {
    num: "02",
    title: "All Skill Levels",
    desc: "Whether you're a beginner picking up a bat for the first time or a seasoned footballer — PowerPlay is your home.",
  },
  {
    num: "03",
    title: "Community Focus",
    desc: "We believe sport brings people together. Our facility hosts tournaments, training camps, and community events throughout the year.",
  },
  {
    num: "04",
    title: "Evening Play Ready",
    desc: "Floodlit courts mean your schedule never has to compromise. Play at 7pm or 10pm — the lights stay on for you.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, var(--night-3) 0%, var(--night) 100%)`,
      }}
    >
      {/* Decorative large text */}
      <div
        className="absolute bottom-10 right-0 pointer-events-none select-none"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "20vw",
          fontWeight: 900,
          fontStyle: "italic",
          color: "rgba(34,197,94,0.025)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        POWERPLAY
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            <div className="reveal">
              <p className="section-label mb-4">Our Story</p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
                  fontWeight: 900,
                  color: "var(--white)",
                  lineHeight: 0.95,
                }}
              >
                MORE THAN
                <br />A PLAYING
                <br />
                <span style={{ color: "var(--turf)", fontStyle: "italic" }}>SURFACE.</span>
              </h2>
            </div>

            <p
              className="reveal mt-8"
              style={{
                color: "var(--mist)",
                fontSize: "1rem",
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: "480px",
              }}
            >
              PowerPlay was built with a singular purpose: to give every player
              — amateur or elite — access to the kind of facility that was once
              reserved for professional clubs. We&lsquo;ve spent years obsessing over
              the details: pitch materials, lighting quality, drainage, run-off
              zones, and every inch of player experience.
            </p>

            <p
              className="reveal mt-4"
              style={{
                color: "var(--mist)",
                fontSize: "1rem",
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: "480px",
              }}
            >
              The result is an arena that feels alive the moment you walk in —
              where the smell of synthetic turf and the buzz of floodlights tell
              you that it&lsquo;s game time.
            </p>

            {/* Big quote */}
            <div
              className="reveal mt-10 pl-5"
              style={{
                borderLeft: "3px solid var(--turf)",
              }}
            >
              <p
                className="font-display"
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  fontStyle: "italic",
                  color: "var(--white)",
                  lineHeight: 1.3,
                }}
              >
                &ldquo;Play harder. Train smarter. Live the game.&rdquo;
              </p>
              <p
                className="mt-2"
                style={{ color: "var(--turf)", fontSize: "0.78rem", fontWeight: 500 }}
              >
                — The PowerPlay Philosophy
              </p>
            </div>
          </div>

          {/* Right column — values */}
          <div className="flex flex-col gap-5">
            {values.map((v, i) => (
              <div
                key={v.num}
                className="reveal hover-lift rounded-sm p-6 group"
                style={{
                  background: "rgba(10,21,32,0.6)",
                  border: "1px solid rgba(34,197,94,0.08)",
                  transitionDelay: `${i * 0.08}s`,
                  display: "flex",
                  gap: "1.2rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  className="font-display flex-shrink-0"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    color: "rgba(34,197,94,0.25)",
                    lineHeight: 1.1,
                    minWidth: "2.5rem",
                  }}
                >
                  {v.num}
                </span>
                <div>
                  <h3
                    className="font-display mb-1"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--white)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--mist)",
                      fontSize: "0.85rem",
                      lineHeight: 1.65,
                      fontWeight: 300,
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}