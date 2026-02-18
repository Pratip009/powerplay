"use client";
import { useState, useRef, useEffect } from "react";

const quickLinks = ["Facilities", "Sports", "Gallery", "About", "Contact"];
const sports = [
  "Football (5-a-side)",
  "Football (7-a-side)",
  "Cricket Nets",
  "Cricket Pitch",
  "Tournaments",
];
const socials = [
  {
    key: "Instagram",
    href: "#",
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
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    key: "YouTube",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    key: "X",
    href: "#",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #040a12 0%, #020609 100%)",
        paddingTop: "clamp(3.5rem, 7vw, 6rem)",
        paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)",
      }}
    >
      {/* ── Background atmosphere ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {/* Top separator glow */}
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "min(900px, 100%)", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), rgba(34,197,94,0.8), rgba(34,197,94,0.5), transparent)",
          boxShadow: "0 0 30px rgba(34,197,94,0.4), 0 0 60px rgba(34,197,94,0.15)",
        }} />
        {/* Top glow bloom */}
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "min(700px, 100%)", height: "300px",
          background: "radial-gradient(ellipse at top, rgba(34,197,94,0.07) 0%, transparent 70%)",
        }} />
        {/* Left ambient */}
        <div style={{
          position: "absolute", bottom: "-20%", left: "-15%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "ftBlob1 18s ease-in-out infinite",
        }} />
        {/* Right ambient */}
        <div style={{
          position: "absolute", top: "-10%", right: "-10%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.03) 0%, transparent 70%)",
          filter: "blur(55px)",
          animation: "ftBlob2 22s ease-in-out infinite",
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(34,197,94,0.009) 80px, rgba(34,197,94,0.009) 81px),
            repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(34,197,94,0.009) 80px, rgba(34,197,94,0.009) 81px)`,
        }} />
      </div>

      {/* Ghost watermark */}
      <div style={{
        position: "absolute", bottom: "0", right: "-1rem",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "clamp(10vw,16vw,18vw)",
        fontWeight: 900, fontStyle: "italic",
        color: "rgba(34,197,94,0.016)",
        letterSpacing: "-0.02em", lineHeight: 1,
        userSelect: "none", pointerEvents: "none", zIndex: 1,
        whiteSpace: "nowrap",
      }}>POWERPLAY</div>

      {/* ── Content ── */}
      <div className="relative" style={{
        zIndex: 10,
        maxWidth: "88rem", margin: "0 auto",
        paddingLeft: "clamp(1rem,5vw,2.5rem)",
        paddingRight: "clamp(1rem,5vw,2.5rem)",
      }}>

        {/* ── Main grid ── */}
        <div className="footer-grid">

          {/* Brand column */}
          <div
            className="footer-brand"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease 0.05s, transform 0.8s cubic-bezier(0.23,1,0.32,1) 0.05s",
            }}
          >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}>
              <div style={{
                width: "40px", height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 24px rgba(34,197,94,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <polygon points="3,17 10,3 17,17" fill="white" opacity="0.95"/>
                  <polygon points="6,17 10,9 14,17" fill="rgba(0,0,0,0.25)"/>
                </svg>
              </div>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, letterSpacing: "0.06em",
                fontSize: "clamp(1.1rem,2vw,1.3rem)",
                color: "#f0f6ff",
              }}>
                POWER<span style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.6)" }}>PLAY</span>
              </span>
            </div>

            <p style={{
              color: "rgba(143,170,191,0.68)",
              fontSize: "clamp(0.78rem,1.4vw,0.86rem)",
              lineHeight: 1.8, fontWeight: 300,
              maxWidth: "290px",
              marginBottom: "1.8rem",
            }}>
              Premium multi-sport turf facility for football and cricket
              enthusiasts. Where serious players train, compete, and grow.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {socials.map((s, i) => (
                <a
                  key={s.key}
                  href={s.href}
                  title={s.key}
                  style={{
                    width: "38px", height: "38px",
                    borderRadius: "9px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(143,170,191,0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(10px)",
                    transitionDelay: `${0.4 + i * 0.06}s`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(34,197,94,0.12)";
                    el.style.borderColor = "rgba(34,197,94,0.35)";
                    el.style.color = "#22c55e";
                    el.style.transform = "translateY(-3px)";
                    el.style.boxShadow = "0 8px 20px rgba(34,197,94,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(255,255,255,0.04)";
                    el.style.borderColor = "rgba(255,255,255,0.07)";
                    el.style.color = "rgba(143,170,191,0.5)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <FooterCol title="Quick Links" delay={0.15} visible={visible}>
            {quickLinks.map((l, i) => (
              <FooterLink key={l} href={`#${l.toLowerCase()}`} delay={0.2 + i * 0.05} visible={visible}>
                {l}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Sports */}
          <FooterCol title="Sports" delay={0.2} visible={visible}>
            {sports.map((s, i) => (
              <FooterLink key={s} href="#sports" delay={0.25 + i * 0.05} visible={visible}>
                {s}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Contact mini */}
          <FooterCol title="Contact Us" delay={0.25} visible={visible}>
            {[
              { icon: "📍", text: "Main Road, Your City" },
              { icon: "📞", text: "+91 98765 43210" },
              { icon: "✉️", text: "hello@powerplayturf.com" },
              { icon: "⏰", text: "6AM – 11PM · 7 days" },
            ].map((item, i) => (
              <div
                key={item.text}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "8px",
                  marginBottom: "0.6rem",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.5s ease ${0.3 + i * 0.06}s, transform 0.5s ease ${0.3 + i * 0.06}s`,
                }}
              >
                <span style={{ fontSize: "0.75rem", marginTop: "1px", flexShrink: 0 }}>{item.icon}</span>
                <span style={{
                  color: "rgba(143,170,191,0.6)",
                  fontSize: "clamp(0.76rem,1.3vw,0.83rem)",
                  fontWeight: 300, lineHeight: 1.5,
                }}>{item.text}</span>
              </div>
            ))}
          </FooterCol>

        </div>

        {/* ── Divider ── */}
        <div style={{
          margin: "clamp(2rem,4vw,3rem) 0 clamp(1.2rem,2.5vw,1.8rem)",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.15), rgba(34,197,94,0.08), transparent)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.5s",
        }} />

        {/* ── Bottom bar ── */}
        <div
          className="footer-bottom"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
          }}
        >
          <p style={{
            color: "rgba(143,170,191,0.35)",
            fontSize: "clamp(0.68rem,1.2vw,0.76rem)",
            fontWeight: 300,
          }}>
            © 2025 PowerPlay Turf. All rights reserved.
          </p>

          {/* Centre tagline */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
          }}>
            <span style={{
              width: "20px", height: "1px",
              background: "rgba(34,197,94,0.3)",
              display: "inline-block",
            }} />
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800, fontStyle: "italic",
              fontSize: "clamp(0.65rem,1.2vw,0.75rem)",
              letterSpacing: "0.2em",
              color: "rgba(34,197,94,0.4)",
              textTransform: "uppercase",
              textShadow: "0 0 16px rgba(34,197,94,0.3)",
            }}>
              PLAY HARDER. TRAIN SMARTER.
            </span>
            <span style={{
              width: "20px", height: "1px",
              background: "rgba(34,197,94,0.3)",
              display: "inline-block",
            }} />
          </div>

          <p style={{
            color: "rgba(143,170,191,0.25)",
            fontSize: "clamp(0.64rem,1.1vw,0.72rem)",
            fontWeight: 300,
          }}>
            Designed with ⚽ & 🏏
          </p>
        </div>

      </div>

      <style>{`
        /* Blobs */
        @keyframes ftBlob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(60px,-40px) scale(1.1); }
        }
        @keyframes ftBlob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-50px,60px) scale(1.08); }
        }

        /* Footer grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
          gap: clamp(1.5rem, 4vw, 3rem);
          align-items: start;
        }

        /* Bottom bar */
        .footer-bottom {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.8rem;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: clamp(1.5rem, 4vw, 2rem);
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
        }

        /* Mobile */
        @media (max-width: 520px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }

        @media (max-width: 360px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: opacity 0.2s ease !important; }
        }
      `}</style>
    </footer>
  );
}

/* ── Column wrapper ── */
function FooterCol({
  title,
  delay,
  visible,
  children,
}: {
  title: string;
  delay: number;
  visible: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
    }}>
      {/* Column title */}
      <p style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700, fontSize: "0.62rem",
        letterSpacing: "0.24em", textTransform: "uppercase",
        color: "rgba(34,197,94,0.7)",
        marginBottom: "1rem",
        display: "flex", alignItems: "center", gap: "7px",
      }}>
        <span style={{ width: "14px", height: "1px", background: "rgba(34,197,94,0.5)", display: "inline-block" }} />
        {title}
      </p>
      {children}
    </div>
  );
}

/* ── Animated link ── */
function FooterLink({
  href,
  delay,
  visible,
  children,
}: {
  href: string;
  delay: number;
  visible: boolean;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "6px",
        marginBottom: "0.55rem",
        color: hovered ? "#f0f6ff" : "rgba(143,170,191,0.55)",
        fontSize: "clamp(0.76rem,1.3vw,0.85rem)",
        fontWeight: 300,
        textDecoration: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-10px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s, color 0.2s ease`,
      }}
    >
      {/* Animated arrow */}
      <span style={{
        color: "#22c55e",
        fontSize: "0.6rem",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateX(0)" : "translateX(-4px)",
        transition: "all 0.2s ease",
        flexShrink: 0,
      }}>▸</span>
      {children}
    </a>
  );
}