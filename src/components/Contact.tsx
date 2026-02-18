"use client";
import { useState, useRef, useEffect } from "react";

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 2C7.23858 2 5 4.23858 5 7C5 11.5 10 18 10 18C10 18 15 11.5 15 7C15 4.23858 12.7614 2 10 2Z"/>
        <circle cx="10" cy="7" r="2"/>
      </svg>
    ),
    label: "Location",
    value: "PowerPlay Turf Arena, Main Road, Your City",
    accent: "#22c55e",
    emoji: "📍",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 5.5C2 4.67 2.67 4 3.5 4H7L8.5 7.5L7 9C7.85 10.72 9.28 12.15 11 13L12.5 11.5L16 13V16.5C16 17.33 15.33 18 14.5 18C7.59 18 2 12.41 2 5.5Z"/>
      </svg>
    ),
    label: "Phone",
    value: "+91 98765 43210",
    accent: "#38bdf8",
    emoji: "📞",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="16" height="12" rx="2"/>
        <path d="M2 7L10 12L18 7"/>
      </svg>
    ),
    label: "Email",
    value: "hello@powerplayturf.com",
    accent: "#a78bfa",
    emoji: "✉️",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="8"/>
        <path d="M10 6V10L13 13"/>
      </svg>
    ),
    label: "Hours",
    value: "6:00 AM – 11:00 PM, 7 days a week",
    accent: "#f59e0b",
    emoji: "⏰",
  },
];

/* Reusable styled input */
function Field({
  label,
  children,
  visible,
  delay,
}: {
  label: string;
  children: React.ReactNode;
  visible: boolean;
  delay: number;
}) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(14px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
    }}>
      <label style={{
        display: "block",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        fontSize: "0.62rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "rgba(143,170,191,0.6)",
        marginBottom: "0.45rem",
      }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "clamp(0.65rem,1.5vw,0.85rem) clamp(0.85rem,2vw,1.1rem)",
  borderRadius: "8px",
  outline: "none",
  background: "rgba(255,255,255,0.038)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#f0f6ff",
  fontSize: "clamp(0.82rem,1.4vw,0.9rem)",
  fontFamily: "inherit",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
  boxSizing: "border-box",
};

function StyledInput({ placeholder, type = "text" }: { placeholder: string; type?: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        ...inputStyle,
        border: `1px solid ${focused ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: focused ? "0 0 0 3px rgba(34,197,94,0.08), 0 0 20px rgba(34,197,94,0.1)" : "none",
        background: focused ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.038)",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function StyledTextarea({ placeholder }: { placeholder: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      rows={4}
      placeholder={placeholder}
      style={{
        ...inputStyle,
        resize: "none",
        lineHeight: 1.65,
        border: `1px solid ${focused ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: focused ? "0 0 0 3px rgba(34,197,94,0.08), 0 0 20px rgba(34,197,94,0.1)" : "none",
        background: focused ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.038)",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function StyledSelect() {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        style={{
          ...inputStyle,
          appearance: "none",
          WebkitAppearance: "none",
          background: focused ? "rgba(34,197,94,0.04)" : "rgba(8,15,24,0.9)",
          border: `1px solid ${focused ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.08)"}`,
          boxShadow: focused ? "0 0 0 3px rgba(34,197,94,0.08)" : "none",
          cursor: "pointer",
          color: "rgba(143,170,191,0.85)",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <option>Group Session</option>
        <option>Tournament Hosting</option>
        <option>Corporate Event</option>
        <option>Training Program</option>
        <option>General Enquiry</option>
      </select>
      {/* Custom chevron */}
      <div style={{
        position: "absolute", right: "14px", top: "50%",
        transform: `translateY(-50%) rotate(${focused ? "180deg" : "0deg"})`,
        transition: "transform 0.25s ease",
        color: "#22c55e", pointerEvents: "none", fontSize: "0.7rem",
      }}>▾</div>
    </div>
  );
}

export default function Contact() {
  const [leftVisible, setLeftVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    [[leftRef, setLeftVisible], [formRef, setFormVisible]].forEach(([ref, setter]) => {
      const el = (ref as React.RefObject<HTMLDivElement>).current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) (setter as (v: boolean) => void)(true); },
        { threshold: 0.08 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #04090f 0%, #060e18 100%)",
        paddingTop: "clamp(4.5rem, 9vw, 8rem)",
        paddingBottom: "clamp(4.5rem, 9vw, 8rem)",
      }}
    >
      {/* ── Ambient background ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {/* Top center glow */}
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "min(900px,100%)", height: "400px",
          background: "radial-gradient(ellipse at top, rgba(34,197,94,0.09) 0%, transparent 70%)",
        }} />
        {/* Left blob */}
        <div style={{
          position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.055) 0%, transparent 70%)",
          top: "10%", left: "-20%", filter: "blur(60px)",
          animation: "ctBlob1 16s ease-in-out infinite",
        }} />
        {/* Right blob */}
        <div style={{
          position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
          bottom: "5%", right: "-15%", filter: "blur(60px)",
          animation: "ctBlob2 20s ease-in-out infinite",
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(34,197,94,0.011) 80px, rgba(34,197,94,0.011) 81px),
            repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(34,197,94,0.011) 80px, rgba(34,197,94,0.011) 81px)`,
        }} />
        {/* Noise */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px", opacity: 0.02, mixBlendMode: "overlay",
        }} />
      </div>

      {/* Ghost watermark */}
      <div style={{
        position: "absolute", bottom: "-1rem", left: "-1rem",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "clamp(10vw,18vw,20vw)",
        fontWeight: 900, fontStyle: "italic",
        color: "rgba(34,197,94,0.018)",
        letterSpacing: "-0.02em", lineHeight: 1,
        userSelect: "none", pointerEvents: "none", zIndex: 1,
        whiteSpace: "nowrap",
      }}>CONTACT</div>

      {/* ── Content ── */}
      <div className="relative" style={{
        zIndex: 10,
        maxWidth: "88rem", margin: "0 auto",
        paddingLeft: "clamp(1rem,5vw,2.5rem)",
        paddingRight: "clamp(1rem,5vw,2.5rem)",
      }}>
        <div className="contact-grid">

          {/* ── Left: info ── */}
          <div
            ref={leftRef}
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateX(0)" : "translateX(-45px)",
              transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            {/* Label */}
            <p style={{
              display: "flex", alignItems: "center", gap: "10px",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: "0.7rem",
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "#22c55e", marginBottom: "1rem",
            }}>
              <span style={{ width: "24px", height: "1px", background: "#22c55e", display: "inline-block" }} />
              Get In Touch
            </p>

            {/* Headline */}
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
              fontWeight: 900, color: "#f0f6ff",
              lineHeight: 0.88, letterSpacing: "-0.01em",
              marginBottom: "clamp(1.2rem,3vw,1.8rem)",
            }}>
              FIND US.
              <br />
              <span style={{
                color: "#22c55e", fontStyle: "italic",
                textShadow: "0 0 70px rgba(34,197,94,0.5)",
              }}>PLAY WITH US.</span>
            </h2>

            <p style={{
              color: "rgba(143,170,191,0.75)",
              fontSize: "clamp(0.82rem,1.5vw,0.95rem)",
              lineHeight: 1.78, fontWeight: 300,
              maxWidth: "400px",
              marginBottom: "clamp(2rem,4vw,3rem)",
            }}>
              Ready to experience PowerPlay? Reach out for group sessions,
              corporate events, or tournament hosting inquiries.
            </p>

            {/* Contact cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.6rem,1.5vw,0.85rem)" }}>
              {contactInfo.map((item, i) => (
                <ContactCard key={item.label} item={item} index={i} visible={leftVisible} />
              ))}
            </div>

            {/* Social row */}
            <div style={{
              marginTop: "clamp(2rem,4vw,2.8rem)",
              display: "flex", alignItems: "center", gap: "1rem",
            }}>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: "0.62rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(143,170,191,0.45)",
              }}>Follow Us</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
              {[
                {
                  key: "Instagram",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                },
                {
                  key: "Facebook",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ),
                },
                {
                  key: "YouTube",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                },
                {
                  key: "X / Twitter",
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                },
              ].map((s, i) => (
                <button
                  key={s.key}
                  title={s.key}
                  style={{
                    width: "38px", height: "38px", borderRadius: "9px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(143,170,191,0.55)",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.25s ease",
                    opacity: leftVisible ? 1 : 0,
                    transform: leftVisible ? "translateY(0)" : "translateY(10px)",
                    transitionDelay: `${0.7 + i * 0.07}s`,
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.12)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.35)";
                    (e.currentTarget as HTMLElement).style.color = "#22c55e";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(34,197,94,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(143,170,191,0.55)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: form ── */}
          <div
            ref={formRef}
            style={{
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? "translateX(0)" : "translateX(45px)",
              transition: "opacity 0.9s ease 0.1s, transform 0.9s cubic-bezier(0.23,1,0.32,1) 0.1s",
            }}
          >
            <div style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              background: "rgba(8,15,24,0.82)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
              padding: "clamp(1.6rem,4vw,2.5rem)",
            }}>
              {/* Top accent line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: "linear-gradient(90deg, transparent, #22c55e, #22c55e80, transparent)",
                boxShadow: "0 0 20px rgba(34,197,94,0.5)",
              }} />
              {/* Blob inside form */}
              <div style={{
                position: "absolute", top: "-60px", right: "-60px",
                width: "250px", height: "250px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
                filter: "blur(40px)", pointerEvents: "none",
              }} />

              {/* Form header */}
              <div style={{ marginBottom: "clamp(1.2rem,3vw,1.8rem)", position: "relative" }}>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900, fontSize: "clamp(1.4rem,2.8vw,1.9rem)",
                  color: "#f0f6ff", letterSpacing: "0.04em", lineHeight: 1,
                  marginBottom: "0.4rem",
                }}>SEND US A MESSAGE</h3>
                <p style={{
                  color: "rgba(143,170,191,0.5)",
                  fontSize: "clamp(0.74rem,1.3vw,0.82rem)",
                  fontWeight: 300,
                }}>We usually respond within 2 hours.</p>
              </div>

              {submitted ? (
                /* Success state */
                <div style={{
                  padding: "3rem 1rem",
                  textAlign: "center",
                  animation: "fadeIn 0.5s ease forwards",
                }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem", animation: "jumpA 0.6s ease forwards" }}>✅</div>
                  <h4 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900, fontSize: "1.8rem",
                    color: "#22c55e", letterSpacing: "0.05em", marginBottom: "0.6rem",
                  }}>MESSAGE SENT!</h4>
                  <p style={{ color: "rgba(143,170,191,0.7)", fontSize: "0.85rem", fontWeight: 300 }}>
                    We&lsquo;ll be in touch shortly. Time to get your kit ready.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      marginTop: "1.5rem",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700, fontSize: "0.72rem",
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      color: "#22c55e",
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      borderRadius: "6px", padding: "0.6rem 1.2rem",
                      cursor: "pointer",
                    }}
                  >Send Another →</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.9rem,2vw,1.2rem)", position: "relative" }}>

                  {/* Name row */}
                  <div className="name-grid">
                    <Field label="First Name" visible={formVisible} delay={0.2}>
                      <StyledInput placeholder="Rohit" />
                    </Field>
                    <Field label="Last Name" visible={formVisible} delay={0.25}>
                      <StyledInput placeholder="Sharma" />
                    </Field>
                  </div>

                  <Field label="Email Address" visible={formVisible} delay={0.3}>
                    <StyledInput type="email" placeholder="you@example.com" />
                  </Field>

                  <Field label="Phone (optional)" visible={formVisible} delay={0.35}>
                    <StyledInput type="tel" placeholder="+91 98765 43210" />
                  </Field>

                  <Field label="Enquiry Type" visible={formVisible} delay={0.4}>
                    <StyledSelect />
                  </Field>

                  <Field label="Message" visible={formVisible} delay={0.45}>
                    <StyledTextarea placeholder="Tell us what you're looking for — session size, dates, requirements..." />
                  </Field>

                  {/* Submit button */}
                  <div style={{
                    opacity: formVisible ? 1 : 0,
                    transform: formVisible ? "translateY(0)" : "translateY(14px)",
                    transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
                  }}>
                    <button
                      onMouseEnter={() => setBtnHovered(true)}
                      onMouseLeave={() => setBtnHovered(false)}
                      onClick={() => setSubmitted(true)}
                      style={{
                        width: "100%",
                        padding: "clamp(0.85rem,2vw,1.1rem)",
                        borderRadius: "8px",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 900,
                        fontSize: "clamp(0.8rem,1.5vw,0.92rem)",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#040a12",
                        background: btnHovered
                          ? "linear-gradient(135deg, #34d368, #22c55e)"
                          : "linear-gradient(135deg, #22c55e, #16a34a)",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: btnHovered
                          ? "0 0 50px rgba(34,197,94,0.55), 0 8px 30px rgba(34,197,94,0.3)"
                          : "0 0 28px rgba(34,197,94,0.25)",
                        transform: btnHovered ? "translateY(-2px) scale(1.01)" : "translateY(0) scale(1)",
                        transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                      }}
                    >
                      <span>SEND MESSAGE</span>
                      <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        style={{
                          transform: btnHovered ? "translateX(4px)" : "translateX(0)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* Privacy note */}
                  <p style={{
                    textAlign: "center",
                    color: "rgba(143,170,191,0.35)",
                    fontSize: "0.62rem",
                    fontWeight: 300,
                    letterSpacing: "0.05em",
                    opacity: formVisible ? 1 : 0,
                    transition: "opacity 0.6s ease 0.55s",
                  }}>
                    🔒 Your details are kept private and never shared.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes ctBlob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(80px,-60px) scale(1.1); }
        }
        @keyframes ctBlob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-60px,80px) scale(1.12); }
        }
        @keyframes fadeIn {
          from { opacity:0; transform: scale(0.96); } to { opacity:1; transform: scale(1); }
        }
        @keyframes jumpA {
          0% { transform: scale(0) rotate(-20deg); }
          70% { transform: scale(1.15) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        /* Grid */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: clamp(2.5rem, 6vw, 5rem);
          align-items: start;
        }
        .name-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(0.6rem,1.5vw,1rem);
        }

        /* Tablet */
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: clamp(2.5rem, 5vw, 3.5rem);
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .name-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Placeholder styling */
        input::placeholder, textarea::placeholder {
          color: rgba(143,170,191,0.3);
        }
        option {
          background: #06101a;
          color: #f0f6ff;
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: opacity 0.2s ease !important; }
        }
      `}</style>
    </section>
  );
}

/* Contact info card */
function ContactCard({
  item,
  index,
  visible,
}: {
  item: typeof contactInfo[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(0.75rem,2vw,1rem)",
        padding: "clamp(0.75rem,2vw,1rem) clamp(1rem,2.5vw,1.3rem)",
        borderRadius: "10px",
        background: hovered ? "rgba(10,20,32,0.95)" : "rgba(8,14,22,0.75)",
        border: `1px solid ${hovered ? item.accent + "38" : "rgba(255,255,255,0.055)"}`,
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.4), 0 0 25px ${item.accent}12` : "none",
        backdropFilter: "blur(12px)",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.6s ease ${index * 0.08 + 0.15}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${index * 0.08 + 0.15}s, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease`,
      }}
    >
      {/* Icon */}
      <div style={{
        flexShrink: 0,
        width: "clamp(38px,5vw,46px)",
        height: "clamp(38px,5vw,46px)",
        borderRadius: "10px",
        background: hovered ? `${item.accent}1a` : `${item.accent}0d`,
        border: `1px solid ${hovered ? item.accent + "40" : item.accent + "1a"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: item.accent,
        boxShadow: hovered ? `0 0 22px ${item.accent}28` : "none",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        transition: "all 0.3s ease",
      }}>
        {item.icon}
      </div>
      {/* Text */}
      <div>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: "0.58rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: `${item.accent}90`,
          marginBottom: "2px",
        }}>{item.label}</p>
        <p style={{
          color: hovered ? "#f0f6ff" : "rgba(220,235,245,0.88)",
          fontSize: "clamp(0.8rem,1.4vw,0.9rem)",
          fontWeight: 400,
          transition: "color 0.25s ease",
        }}>{item.value}</p>
      </div>
      {/* Hover arrow */}
      <div style={{
        marginLeft: "auto",
        color: item.accent,
        fontSize: "0.9rem",
        opacity: hovered ? 0.7 : 0,
        transform: hovered ? "translateX(0)" : "translateX(-6px)",
        transition: "all 0.3s ease",
        flexShrink: 0,
      }}>›</div>
    </div>
  );
}