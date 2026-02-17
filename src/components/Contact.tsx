"use client";

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 2C7.23858 2 5 4.23858 5 7C5 11.5 10 18 10 18C10 18 15 11.5 15 7C15 4.23858 12.7614 2 10 2Z"/>
        <circle cx="10" cy="7" r="2"/>
      </svg>
    ),
    label: "Location",
    value: "PowerPlay Turf Arena, Main Road, Your City",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 5.5C2 4.67 2.67 4 3.5 4H7L8.5 7.5L7 9C7.85 10.72 9.28 12.15 11 13L12.5 11.5L16 13V16.5C16 17.33 15.33 18 14.5 18C7.59 18 2 12.41 2 5.5Z"/>
      </svg>
    ),
    label: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="16" height="12" rx="2"/>
        <path d="M2 7L10 12L18 7"/>
      </svg>
    ),
    label: "Email",
    value: "hello@powerplayturf.com",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="8"/>
        <path d="M10 6V10L13 13"/>
      </svg>
    ),
    label: "Hours",
    value: "6:00 AM – 11:00 PM, 7 days a week",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--night-2)" }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 pointer-events-none"
        style={{
          transform: "translateX(-50%)",
          width: "600px",
          height: "200px",
          background: "radial-gradient(ellipse at top, rgba(34,197,94,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: info */}
          <div>
            <div className="reveal">
              <p className="section-label mb-4">Get In Touch</p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: 900,
                  color: "var(--white)",
                  lineHeight: 0.95,
                }}
              >
                FIND US.
                <br />
                <span style={{ color: "var(--turf)", fontStyle: "italic" }}>PLAY WITH US.</span>
              </h2>
            </div>

            <p
              className="reveal mt-6 mb-10"
              style={{
                color: "var(--mist)",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                fontWeight: 300,
                maxWidth: "400px",
              }}
            >
              Ready to experience PowerPlay? Reach out to us for inquiries
              about group sessions, corporate events, or tournament hosting.
            </p>

            {/* Contact details */}
            <div className="reveal flex flex-col gap-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-sm"
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      color: "var(--turf)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      className="section-label"
                      style={{ fontSize: "0.6rem", marginBottom: "0.2rem" }}
                    >
                      {item.label}
                    </p>
                    <p style={{ color: "var(--white)", fontSize: "0.9rem", fontWeight: 400 }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: contact form (static/visual only) */}
          <div
            className="reveal rounded-sm p-8"
            style={{
              background: "rgba(10,21,32,0.8)",
              border: "1px solid rgba(34,197,94,0.12)",
            }}
          >
            <h3
              className="font-display mb-6"
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--white)",
                letterSpacing: "0.05em",
              }}
            >
              SEND US A MESSAGE
            </h3>

            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="section-label block mb-2"
                    style={{ fontSize: "0.6rem" }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Rohit"
                    className="w-full px-4 py-3 rounded-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(34,197,94,0.15)",
                      color: "var(--white)",
                      fontSize: "0.9rem",
                    }}
                    onFocus={(e) =>
                      ((e.target as HTMLInputElement).style.border =
                        "1px solid rgba(34,197,94,0.5)")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLInputElement).style.border =
                        "1px solid rgba(34,197,94,0.15)")
                    }
                  />
                </div>
                <div>
                  <label
                    className="section-label block mb-2"
                    style={{ fontSize: "0.6rem" }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Sharma"
                    className="w-full px-4 py-3 rounded-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(34,197,94,0.15)",
                      color: "var(--white)",
                      fontSize: "0.9rem",
                    }}
                    onFocus={(e) =>
                      ((e.target as HTMLInputElement).style.border =
                        "1px solid rgba(34,197,94,0.5)")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLInputElement).style.border =
                        "1px solid rgba(34,197,94,0.15)")
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  className="section-label block mb-2"
                  style={{ fontSize: "0.6rem" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(34,197,94,0.15)",
                    color: "var(--white)",
                    fontSize: "0.9rem",
                  }}
                  onFocus={(e) =>
                    ((e.target as HTMLInputElement).style.border =
                      "1px solid rgba(34,197,94,0.5)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLInputElement).style.border =
                      "1px solid rgba(34,197,94,0.15)")
                  }
                />
              </div>

              <div>
                <label
                  className="section-label block mb-2"
                  style={{ fontSize: "0.6rem" }}
                >
                  Enquiry Type
                </label>
                <select
                  className="w-full px-4 py-3 rounded-sm outline-none transition-all duration-200 appearance-none"
                  style={{
                    background: "rgba(10,21,32,0.9)",
                    border: "1px solid rgba(34,197,94,0.15)",
                    color: "var(--mist)",
                    fontSize: "0.9rem",
                  }}
                >
                  <option>Group Session</option>
                  <option>Tournament Hosting</option>
                  <option>Corporate Event</option>
                  <option>Training Program</option>
                  <option>General Enquiry</option>
                </select>
              </div>

              <div>
                <label
                  className="section-label block mb-2"
                  style={{ fontSize: "0.6rem" }}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us what you're looking for..."
                  className="w-full px-4 py-3 rounded-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(34,197,94,0.15)",
                    color: "var(--white)",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                  }}
                  onFocus={(e) =>
                    ((e.target as HTMLTextAreaElement).style.border =
                      "1px solid rgba(34,197,94,0.5)")
                  }
                  onBlur={(e) =>
                    ((e.target as HTMLTextAreaElement).style.border =
                      "1px solid rgba(34,197,94,0.15)")
                  }
                />
              </div>

              <button
                className="font-display font-800 w-full py-4 rounded-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  background: "var(--turf)",
                  color: "var(--night)",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  fontSize: "0.9rem",
                  boxShadow: "0 0 30px rgba(34,197,94,0.2)",
                }}
              >
                SEND MESSAGE →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}