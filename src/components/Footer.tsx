"use client";

export default function Footer() {
  return (
    <footer
      className="relative pt-16 pb-8 overflow-hidden"
      style={{ background: "var(--night)" }}
    >
      {/* Top glow line */}
      <div className="glow-line mb-12" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center"
                style={{ background: "var(--turf)" }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <polygon points="3,17 10,3 17,17" fill="white" opacity="0.9"/>
                  <polygon points="6,17 10,9 14,17" fill="rgba(0,0,0,0.3)"/>
                </svg>
              </div>
              <span
                className="font-display"
                style={{
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  fontSize: "1.2rem",
                  color: "var(--white)",
                }}
              >
                POWER<span style={{ color: "var(--turf)" }}>PLAY</span>
              </span>
            </div>
            <p
              style={{
                color: "var(--mist)",
                fontSize: "0.85rem",
                lineHeight: 1.75,
                fontWeight: 300,
                maxWidth: "300px",
              }}
            >
              Premium multi-sport turf facility for football and cricket
              enthusiasts. Where serious players come to train, compete, and grow.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p
              className="section-label mb-4"
              style={{ fontSize: "0.62rem" }}
            >
              Quick Links
            </p>
            {["Facilities", "Sports", "Gallery", "About", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="block mb-2 transition-colors duration-200 hover:text-green-400"
                style={{ color: "var(--mist)", fontSize: "0.88rem", fontWeight: 300 }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Sports */}
          <div>
            <p
              className="section-label mb-4"
              style={{ fontSize: "0.62rem" }}
            >
              Sports
            </p>
            {[
              "Football (5-a-side)",
              "Football (7-a-side)",
              "Cricket Nets",
              "Cricket Pitch",
              "Tournaments",
            ].map((s) => (
              <p
                key={s}
                className="mb-2"
                style={{ color: "var(--mist)", fontSize: "0.88rem", fontWeight: 300 }}
              >
                {s}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(34,197,94,0.1)" }}
        >
          <p style={{ color: "rgba(143,170,191,0.5)", fontSize: "0.78rem" }}>
            © 2025 PowerPlay Turf. All rights reserved.
          </p>
          <p
            className="font-display"
            style={{
              color: "rgba(34,197,94,0.3)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
            }}
          >
            PLAY HARDER. TRAIN SMARTER.
          </p>
        </div>
      </div>
    </footer>
  );
}