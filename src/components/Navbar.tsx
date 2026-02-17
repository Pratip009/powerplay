"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Facilities", href: "#facilities" },
  { label: "Sports", href: "#sports" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-blur py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-sm flex items-center justify-center pulse-glow"
            style={{ background: "var(--turf)", flexShrink: 0 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polygon points="3,17 10,3 17,17" fill="white" opacity="0.9" />
              <polygon points="6,17 10,9 14,17" fill="rgba(0,0,0,0.3)" />
            </svg>
          </div>
          <span
            className="font-display font-900 tracking-wider text-xl"
            style={{ color: "var(--white)", fontWeight: 800, letterSpacing: "0.06em" }}
          >
            POWER<span style={{ color: "var(--turf)" }}>PLAY</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display font-600 hover-underline transition-colors duration-200"
              style={{
                color: "var(--mist)",
                fontSize: "0.95rem",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--white)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--mist)")
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 font-display font-700 text-sm px-5 py-2 rounded-sm transition-all duration-300 hover:scale-105"
          style={{
            background: "var(--turf)",
            color: "var(--night)",
            fontWeight: 700,
            letterSpacing: "0.1em",
            fontSize: "0.8rem",
          }}
        >
          GET IN TOUCH
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "var(--white)",
              transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "",
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "var(--white)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "var(--white)",
              transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden transition-all duration-400 overflow-hidden"
        style={{
          maxHeight: menuOpen ? "400px" : "0",
          background: "rgba(5,10,14,0.98)",
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display font-600 text-lg"
              style={{
                color: "var(--mist)",
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="font-display font-700 text-sm px-5 py-3 rounded-sm text-center mt-2"
            style={{
              background: "var(--turf)",
              color: "var(--night)",
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
            onClick={() => setMenuOpen(false)}
          >
            GET IN TOUCH
          </a>
        </div>
      </div>
    </nav>
  );
}