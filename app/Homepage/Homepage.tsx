"use client";

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────── DATA ─────────────────────────────── */

const destinations = [
  { name: "Manali", nights: "4 Nights / 5 Days", price: "₹12,999", accent: "#60a5fa", dark: "#1e3a5f", emoji: "🏔️", tag: "Snow Peak" },
  { name: "Goa",    nights: "3 Nights / 4 Days", price: "₹9,999",  accent: "#34d399", dark: "#064e3b", emoji: "🏖️", tag: "Beach Bliss" },
  { name: "Agra",   nights: "2 Nights / 3 Days", price: "₹6,499",  accent: "#fbbf24", dark: "#451a03", emoji: "🕌", tag: "Heritage" },
  { name: "Kerala", nights: "4 Nights / 5 Days", price: "₹13,999", accent: "#4ade80", dark: "#052e16", emoji: "🌴", tag: "Backwaters" },
  { name: "Ladakh", nights: "5 Nights / 6 Days", price: "₹18,999", accent: "#a78bfa", dark: "#2e1065", emoji: "🏜️", tag: "High Altitude" },
];

const packages = [
  { title: "Golden Triangle", sub: "Delhi · Agra · Jaipur", price: "₹15,999", dur: "5N/6D", tag: "Best Seller", accent: "#f59e0b", emoji: "🏰" },
  { title: "Kerala Backwaters", sub: "Houseboat · Munnar · Kochi", price: "₹18,499", dur: "6N/7D", tag: "Trending", accent: "#10b981", emoji: "⛵" },
  { title: "Himalayan Escape", sub: "Manali · Rohtang · Solang", price: "₹22,999", dur: "7N/8D", tag: "Adventure", accent: "#3b82f6", emoji: "🏔️" },
  { title: "Goa Beach Bliss", sub: "North Goa · South Goa · Cruise", price: "₹10,499", dur: "4N/5D", tag: "Popular", accent: "#06b6d4", emoji: "🌊" },
  { title: "Rajasthan Royale", sub: "Jaipur · Jodhpur · Udaipur", price: "₹24,999", dur: "8N/9D", tag: "Premium", accent: "#f43f5e", emoji: "🏯" },
  { title: "Andaman Islands", sub: "Port Blair · Havelock · Neil", price: "₹29,999", dur: "6N/7D", tag: "Luxury", accent: "#8b5cf6", emoji: "🐠" },
];

const testimonials = [
  { name: "Priya Sharma", city: "Mumbai", init: "PS", stars: 5, color: "#f59e0b",
    text: "Seamless from start to finish. Our Goa trip felt curated just for us — every transfer, every hotel, perfectly timed." },
  { name: "Arjun Mehta", city: "Delhi", init: "AM", stars: 5, color: "#3b82f6",
    text: "Leh Ladakh was a bucket-list dream. RajRup made the impossible feel effortless. The mountain guides were outstanding." },
  { name: "Sneha Patel", city: "Ahmedabad", init: "SP", stars: 5, color: "#10b981",
    text: "Kerala on a houseboat — pure, unfiltered magic. The family package was tailored beautifully. Already planning trip two!" },
];

const navLinks = ["Home", "About Us", "Packages", "Destinations", "Services", "Blog", "Contact Us"];
const tabs = ["Flights", "Hotels", "Holidays", "Bus"];
const tabIcons: Record<string, string> = { Flights: "✈️", Hotels: "🏨", Holidays: "🌴", Bus: "🚌" };

/* ─────────────────────────────── COMPONENT ─────────────────────────────── */

export default function RajRupTravels() {
  const [activeTab, setActiveTab] = useState("Flights");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDestIdx, setActiveDestIdx] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Auto-rotate destination showcase */
  useEffect(() => {
    const id = setInterval(() => setActiveDestIdx(i => (i + 1) % destinations.length), 3500);
    return () => clearInterval(id);
  }, []);

  const activeDest = destinations[activeDestIdx];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      backgroundColor: "#f8f7f4",
    }}>

      {/* ══════════════════════════ GLOBAL STYLES ══════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }
        :root {
          --navy: #0e1f4d;
          --gold: #f5a623;
          --gold-light: #fde68a;
          --cream: #f8f7f4;
          --dark: #0a0f1e;
        }
        .font-display { font-family: 'Playfair Display', Georgia, serif !important; }
        .font-sans-dm { font-family: 'DM Sans', system-ui, sans-serif !important; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%      { transform: translateY(-14px) rotate(1deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes planeFly {
          0%   { transform: translateX(-40px) translateY(8px) rotate(-10deg); opacity:0; }
          20%  { opacity: 1; }
          100% { transform: translateX(120px) translateY(-30px) rotate(-10deg); opacity:0; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes rotateGlobe {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .anim-fade-up   { animation: fadeUp 0.7s ease both; }
        .anim-scale-in  { animation: scaleIn 0.6s ease both; }
        .anim-float     { animation: floatY 5s ease-in-out infinite; }
        .anim-plane     { animation: planeFly 2.5s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        .shimmer-text {
          background: linear-gradient(90deg, var(--gold) 0%, #fff9c4 40%, var(--gold) 60%, #f97316 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        .glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.15);
        }
        .glass-white {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .card-hover {
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 60px -10px rgba(0,0,0,0.22);
        }

        .dest-pill {
          transition: all 0.4s cubic-bezier(.22,.68,0,1.2);
        }

        .noise-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.5;
          z-index: 1;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--gold) 0%, #f97316 100%);
          color: #0e1f4d;
          font-weight: 700;
          border-radius: 14px;
          padding: 14px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          letter-spacing: 0.01em;
          box-shadow: 0 8px 30px rgba(245,166,35,0.4);
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #fde68a 0%, var(--gold) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-primary:hover::before { opacity: 1; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(245,166,35,0.5); }
        .btn-primary > * { position: relative; z-index: 1; }

        .btn-outline {
          background: transparent;
          border: 2px solid rgba(255,255,255,0.35);
          color: white;
          border-radius: 14px;
          padding: 13px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-outline:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.6);
          transform: translateY(-2px);
        }

        .search-tab {
          font-family: 'DM Sans', sans-serif;
          padding: 10px 22px;
          border-radius: 40px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          border: none;
          background: transparent;
          color: #6b7280;
        }
        .search-tab.active {
          background: var(--navy);
          color: white;
          box-shadow: 0 4px 16px rgba(14,31,77,0.25);
        }
        .search-tab:not(.active):hover { background: #f3f4f6; color: var(--navy); }

        .field-box {
          border: 1.5px solid #e5e7eb;
          border-radius: 14px;
          padding: 14px 18px;
          background: #fafafa;
          cursor: pointer;
          transition: all 0.25s;
        }
        .field-box:hover { border-color: var(--gold); background: #fff; box-shadow: 0 0 0 4px rgba(245,166,35,0.08); }

        .dest-card {
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(.22,.68,0,1.2);
          height: 280px;
        }
        .dest-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 32px 64px -12px rgba(0,0,0,0.3); }
        .dest-card:hover .dest-card-overlay { opacity: 1 !important; }
        .dest-card:hover .dest-book-btn { opacity: 1 !important; transform: translateY(0) !important; }
        .dest-card:hover .dest-emoji { transform: scale(1.15) !important; }

        .pkg-card {
          border-radius: 24px;
          overflow: hidden;
          background: white;
          border: 1px solid #f1f0ed;
          transition: all 0.35s cubic-bezier(.22,.68,0,1.2);
          cursor: pointer;
        }
        .pkg-card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px -10px rgba(14,31,77,0.16); border-color: transparent; }

        .testi-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 24px;
          padding: 32px;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }
        .testi-card::before {
          content: '"';
          font-family: 'Playfair Display', serif;
          font-size: 120px;
          line-height: 1;
          position: absolute;
          top: -10px;
          right: 20px;
          color: rgba(255,255,255,0.04);
          pointer-events: none;
        }
        .testi-card:hover { background: rgba(255,255,255,0.12); transform: translateY(-6px); }

        .feature-card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          border: 1px solid #f0ede8;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          transform: scaleX(0);
          transition: transform 0.35s ease;
          border-radius: 0 0 24px 24px;
        }
        .feature-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.09); }
        .feature-card:hover::after { transform: scaleX(1); }
      `}</style>

      {/* ══════════════════════════ NAVBAR ══════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.08)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, userSelect: "none" }}>
            <span className="font-display" style={{ fontSize: 28, fontWeight: 900, color: "#0e1f4d" }}>Raj</span>
            <span className="font-display" style={{ fontSize: 28, fontWeight: 900, color: "#f5a623" }}>Rup</span>
            <span style={{ fontSize: 18, marginLeft: 2, color: "#f5a623" }}>✈</span>
            <div style={{ marginLeft: 6, display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span className="font-sans-dm" style={{ fontSize: 8, fontWeight: 800, color: "#0e1f4d", letterSpacing: "0.2em", textTransform: "uppercase" }}>Travels</span>
              <div style={{ height: 2, background: "linear-gradient(90deg, #f5a623, #f97316)", borderRadius: 2 }} />
            </div>
          </div>

          {/* Desktop Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden lg:flex">
            {navLinks.map((link) => (
              <a key={link} href="#" className="font-sans-dm" style={{
                padding: "8px 14px", borderRadius: 10, fontSize: 14, fontWeight: 600,
                color: link === "Home" ? "#f5a623" : scrolled ? "#0e1f4d" : "#0e1f4d",
                textDecoration: "none", transition: "all 0.2s",
                background: link === "Home" ? "rgba(245,166,35,0.1)" : "transparent",
              }}
                onMouseEnter={e => { if (link !== "Home") (e.target as HTMLElement).style.color = "#f5a623"; (e.target as HTMLElement).style.background = "rgba(245,166,35,0.08)"; }}
                onMouseLeave={e => { if (link !== "Home") (e.target as HTMLElement).style.color = "#0e1f4d"; (e.target as HTMLElement).style.background = "transparent"; }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Phone */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="hidden lg:flex">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#f5a623,#f97316)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 4px 14px rgba(245,166,35,0.4)" }}>
                📞
              </div>
              <div>
                <p className="font-sans-dm" style={{ fontSize: 10, color: "#9ca3af", margin: 0 }}>Call Us Anytime</p>
                <p className="font-sans-dm" style={{ fontSize: 15, fontWeight: 800, color: "#0e1f4d", margin: 0 }}>+91 98765 43210</p>
              </div>
            </div>
          </div>

          <button className="lg:hidden font-sans-dm" onClick={() => setMobileOpen(!mobileOpen)} style={{ fontSize: 22, background: "none", border: "none", color: "#0e1f4d", cursor: "pointer", padding: 8 }}>
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden font-sans-dm" style={{ background: "white", borderTop: "1px solid #f0ede8", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            {navLinks.map(link => (
              <a key={link} href="#" style={{ padding: "10px 0", color: "#0e1f4d", fontWeight: 600, fontSize: 15, textDecoration: "none", borderBottom: "1px solid #f9f8f6" }}>{link}</a>
            ))}
            <p style={{ marginTop: 12, fontWeight: 800, color: "#0e1f4d" }}>📞 +91 98765 43210</p>
          </div>
        )}
      </nav>

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section ref={heroRef} className="noise-overlay" style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, #0e1f4d 0%, #1a3a7a 40%, #0f3460 70%, #0a0f1e 100%)`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        {/* Background orbs */}
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Dotted grid pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }} />

        {/* Diagonal accent line */}
        <div style={{ position: "absolute", top: 0, right: "28%", width: 1, height: "100%", background: "linear-gradient(180deg, transparent, rgba(245,166,35,0.15), transparent)", transform: "skewX(-12deg)" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 24px 60px", width: "100%", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2">

            {/* LEFT */}
            <div className="anim-fade-up">
              <div className="anim-fade-up delay-100" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.3)", borderRadius: 40, padding: "6px 16px", marginBottom: 24 }}>
                <span style={{ fontSize: 14 }}>✈️</span>
                <span className="font-sans-dm" style={{ fontSize: 12, fontWeight: 700, color: "#fde68a", letterSpacing: "0.12em", textTransform: "uppercase" }}>India's Premier Travel Partner</span>
              </div>

              <h1 className="font-display anim-fade-up delay-200" style={{ fontSize: "clamp(48px, 6vw, 82px)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 12px", color: "white" }}>
                Explore the
                <br />
                <span className="shimmer-text">World with</span>
                <br />
                <span style={{ color: "white" }}>RajRup</span>
              </h1>

              <p className="font-sans-dm anim-fade-up delay-300" style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", marginBottom: 10, fontWeight: 300, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Your Journey, Our Priority
              </p>
              <p className="font-sans-dm anim-fade-up delay-300" style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 440, marginBottom: 40 }}>
                Meticulously crafted journeys across India's most breathtaking destinations — where every mile becomes a memory.
              </p>

              <div className="anim-fade-up delay-400" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
                <button className="btn-primary">
                  <span>Explore Packages</span>
                  <span>→</span>
                </button>
                <button className="btn-outline font-sans-dm">
                  View Destinations
                </button>
              </div>

              {/* Stats bar */}
              <div className="anim-fade-up delay-500" style={{ display: "flex", gap: 0 }}>
                {[["10K+", "Happy Travelers"], ["500+", "Tour Packages"], ["50+", "Destinations"], ["4.9★", "Avg Rating"]].map(([num, label], i) => (
                  <div key={label} style={{ paddingRight: 32, marginRight: 32, borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                    <p className="font-display" style={{ fontSize: 28, fontWeight: 900, color: "#f5a623", margin: 0 }}>{num}</p>
                    <p className="font-sans-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Destination Showcase Card */}
            <div className="anim-scale-in delay-300 hidden lg:flex" style={{ justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "relative", width: 440, height: 520 }}>

                {/* Main glowing card */}
                <div className="anim-float" style={{
                  width: "100%", height: "100%", borderRadius: 32,
                  background: `linear-gradient(135deg, ${activeDest.dark} 0%, #0e1f4d 100%)`,
                  border: `1px solid ${activeDest.accent}30`,
                  boxShadow: `0 0 80px ${activeDest.accent}25, 0 40px 80px rgba(0,0,0,0.5)`,
                  transition: "all 0.8s ease",
                  position: "relative", overflow: "hidden",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 36,
                }}>
                  {/* BIG emoji */}
                  <div className="dest-emoji" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-60%)", fontSize: 120, lineHeight: 1, transition: "transform 0.4s ease", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}>
                    {activeDest.emoji}
                  </div>

                  {/* Glow orb */}
                  <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${activeDest.accent}25 0%, transparent 70%)`, transition: "all 0.8s ease" }} />

                  {/* Tag pill */}
                  <div style={{ position: "absolute", top: 28, left: 28, background: `${activeDest.accent}22`, border: `1px solid ${activeDest.accent}44`, borderRadius: 40, padding: "5px 14px" }}>
                    <span className="font-sans-dm" style={{ fontSize: 11, fontWeight: 700, color: activeDest.accent, textTransform: "uppercase", letterSpacing: "0.12em" }}>{activeDest.tag}</span>
                  </div>

                  {/* Destination dots */}
                  <div style={{ position: "absolute", top: 28, right: 28, display: "flex", gap: 6 }}>
                    {destinations.map((_, i) => (
                      <button key={i} onClick={() => setActiveDestIdx(i)} style={{
                        width: i === activeDestIdx ? 24 : 8,
                        height: 8, borderRadius: 4,
                        background: i === activeDestIdx ? activeDest.accent : "rgba(255,255,255,0.25)",
                        border: "none", cursor: "pointer",
                        transition: "all 0.4s ease",
                      }} />
                    ))}
                  </div>

                  {/* Info */}
                  <div>
                    <p className="font-sans-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{activeDest.nights}</p>
                    <h3 className="font-display" style={{ fontSize: 40, fontWeight: 900, color: "white", margin: "0 0 8px" }}>{activeDest.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <span className="font-sans-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>From</span>
                        <p className="font-display" style={{ fontSize: 28, fontWeight: 900, color: activeDest.accent, margin: 0 }}>{activeDest.price}</p>
                        <span className="font-sans-dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>per person</span>
                      </div>
                      <button style={{
                        background: activeDest.accent, color: "#0e1f4d",
                        border: "none", borderRadius: 14, padding: "12px 22px",
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 14,
                        cursor: "pointer", boxShadow: `0 8px 24px ${activeDest.accent}50`,
                        transition: "all 0.3s ease",
                      }}>
                        Book Now →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div style={{
                  position: "absolute", top: -20, right: -20,
                  background: "linear-gradient(135deg,#f5a623,#f97316)",
                  borderRadius: 20, padding: "14px 18px",
                  boxShadow: "0 12px 30px rgba(245,166,35,0.45)",
                }}>
                  <p className="font-sans-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>Rated</p>
                  <p className="font-display" style={{ fontSize: 22, fontWeight: 900, color: "white", margin: 0 }}>4.9 ★</p>
                </div>

                {/* Floating mini card */}
                <div style={{
                  position: "absolute", bottom: -24, left: -24,
                  background: "white", borderRadius: 20,
                  boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
                  padding: "16px 20px",
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#0e1f4d,#1a3a7a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏆</div>
                  <div>
                    <p className="font-sans-dm" style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Industry Award</p>
                    <p className="font-sans-dm" style={{ fontSize: 14, fontWeight: 800, color: "#0e1f4d", margin: 0 }}>Best Travel Agency</p>
                    <p className="font-sans-dm" style={{ fontSize: 11, color: "#f5a623", margin: 0, fontWeight: 700 }}>India 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2 }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: 80 }}>
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#f8f7f4" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════ SEARCH BAR ══════════════════════════ */}
      <section style={{ background: "#f8f7f4", paddingBottom: 40, position: "relative", zIndex: 10, marginTop: -1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            background: "white", borderRadius: 28,
            boxShadow: "0 20px 80px rgba(0,0,0,0.1), 0 4px 20px rgba(0,0,0,0.06)",
            padding: 32, border: "1px solid #f0ede8",
          }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 28, padding: 4, background: "#f9f8f6", borderRadius: 50, width: "fit-content" }}>
              {tabs.map(tab => (
                <button key={tab} className={`search-tab font-sans-dm ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
                  <span style={{ marginRight: 6 }}>{tabIcons[tab]}</span>{tab}
                </button>
              ))}
            </div>

            {/* Fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
              {[
                { label: "From", placeholder: "Where from?", icon: "📍" },
                { label: "To", placeholder: "Where to?", icon: "🗺️" },
                { label: "Depart", placeholder: "Select Date", icon: "📅" },
                { label: "Return", placeholder: "Select Date", icon: "📅" },
                { label: "Travelers & Class", placeholder: "1 Traveler, Economy", icon: "👤" },
              ].map(({ label, placeholder, icon }) => (
                <div key={label}>
                  <p className="font-sans-dm" style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</p>
                  <div className="field-box" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16 }}>{icon}</span>
                    <span className="font-sans-dm" style={{ fontSize: 14, color: "#9ca3af", flex: 1 }}>{placeholder}</span>
                    <span style={{ color: "#d1d5db", fontSize: 10 }}>▼</span>
                  </div>
                </div>
              ))}
              <button className="btn-primary" style={{ whiteSpace: "nowrap", height: 52, borderRadius: 16, padding: "0 28px" }}>
                <span>🔍</span>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ DESTINATIONS ══════════════════════════ */}
      <section style={{ background: "#f8f7f4", padding: "80px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <span className="font-sans-dm" style={{ fontSize: 12, fontWeight: 800, color: "#f5a623", textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: 8 }}>✈ Explore India</span>
              <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#0e1f4d", margin: 0, lineHeight: 1.1 }}>
                Popular<br /><em style={{ color: "#f5a623" }}>Destinations</em>
              </h2>
            </div>
            <a href="#" className="font-sans-dm" style={{ color: "#0e1f4d", fontWeight: 700, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, borderBottom: "2px solid #f5a623", paddingBottom: 2 }}>
              View All Destinations →
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
            {destinations.map((dest, i) => (
              <div key={dest.name} className="dest-card" style={{
                background: `linear-gradient(160deg, ${dest.dark} 0%, #0a0f1e 100%)`,
                border: `1px solid ${dest.accent}20`,
              }}>
                {/* Glow */}
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 40%, ${dest.accent}18 0%, transparent 70%)` }} />

                {/* Emoji */}
                <div className="dest-emoji" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -58%)", fontSize: 70, lineHeight: 1, transition: "transform 0.4s ease" }}>
                  {dest.emoji}
                </div>

                {/* Tag */}
                <div style={{ position: "absolute", top: 16, left: 16, background: `${dest.accent}22`, border: `1px solid ${dest.accent}44`, borderRadius: 20, padding: "4px 10px" }}>
                  <span className="font-sans-dm" style={{ fontSize: 9, fontWeight: 800, color: dest.accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>{dest.tag}</span>
                </div>

                {/* Hover CTA */}
                <div className="dest-card-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)", opacity: 0, transition: "opacity 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <button className="dest-book-btn font-sans-dm" style={{
                    background: dest.accent, color: "#0e1f4d", border: "none",
                    borderRadius: 40, padding: "10px 20px", fontWeight: 800, fontSize: 13,
                    cursor: "pointer", opacity: 0, transform: "translateY(10px)", transition: "all 0.3s ease",
                    boxShadow: `0 8px 20px ${dest.accent}50`,
                  }}>
                    Book Now
                  </button>
                </div>

                {/* Bottom info */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)" }}>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <div>
                      <p className="font-sans-dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", margin: "0 0 2px" }}>📍 {dest.nights}</p>
                      <h3 className="font-display" style={{ fontSize: 22, fontWeight: 900, color: "white", margin: 0 }}>{dest.name}</h3>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p className="font-display" style={{ fontSize: 18, fontWeight: 900, color: dest.accent, margin: 0 }}>{dest.price}</p>
                      <p className="font-sans-dm" style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", margin: 0 }}>/Person</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ WHY CHOOSE US ══════════════════════════ */}
      <section style={{ background: "white", padding: "80px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="font-sans-dm" style={{ fontSize: 12, fontWeight: 800, color: "#f5a623", textTransform: "uppercase", letterSpacing: "0.15em" }}>Why Us</span>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900, color: "#0e1f4d", margin: "10px 0 0" }}>
              Travel With <em style={{ color: "#f5a623" }}>Confidence</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { icon: "🏆", title: "Best Price Guarantee", desc: "We match or beat any comparable package price. Your budget, our commitment.", accent: "#f59e0b" },
              { icon: "🎧", title: "24/7 Customer Support", desc: "Round-the-clock assistance, wherever your journey takes you in the world.", accent: "#3b82f6" },
              { icon: "🔒", title: "Safe & Secure Booking", desc: "Bank-level encryption protects every transaction. Book with complete peace of mind.", accent: "#10b981" },
              { icon: "✏️", title: "Customizable Packages", desc: "Tailor-made itineraries crafted exactly around your travel style and preferences.", accent: "#8b5cf6" },
            ].map(({ icon, title, desc, accent }) => (
              <div key={title} className="feature-card" >
                <style>{`.feature-card:hover::after { background: ${accent}; }`}</style>
                <div style={{ width: 60, height: 60, borderRadius: 18, background: `${accent}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>
                  {icon}
                </div>
                <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "#0e1f4d", margin: "0 0 10px" }}>{title}</h3>
                <p className="font-sans-dm" style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{desc}</p>
                <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 6, color: accent, fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  Learn more <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ PACKAGES ══════════════════════════ */}
      <section style={{ background: "#f8f7f4", padding: "80px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="font-sans-dm" style={{ fontSize: 12, fontWeight: 800, color: "#f5a623", textTransform: "uppercase", letterSpacing: "0.15em" }}>✈ Handpicked For You</span>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "#0e1f4d", margin: "10px 0 12px" }}>
              Featured <em style={{ color: "#f5a623" }}>Tour Packages</em>
            </h2>
            <p className="font-sans-dm" style={{ fontSize: 16, color: "#6b7280", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              Curated itineraries designed for every kind of traveler — from budget adventurers to luxury seekers.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {packages.map((pkg) => (
              <div key={pkg.title} className="pkg-card">
                {/* Color header */}
                <div style={{ height: 6, background: `linear-gradient(90deg, ${pkg.accent}, ${pkg.accent}88)` }} />

                <div style={{ padding: 28 }}>
                  {/* Top row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 14, background: `${pkg.accent}14`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                        {pkg.emoji}
                      </div>
                      <span className="font-sans-dm" style={{ fontSize: 11, fontWeight: 800, color: pkg.accent, textTransform: "uppercase", letterSpacing: "0.1em", background: `${pkg.accent}14`, padding: "4px 10px", borderRadius: 20 }}>
                        {pkg.tag}
                      </span>
                    </div>
                    <span className="font-sans-dm" style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600, background: "#f9f8f6", padding: "4px 10px", borderRadius: 20 }}>{pkg.dur}</span>
                  </div>

                  <h3 className="font-display" style={{ fontSize: 24, fontWeight: 900, color: "#0e1f4d", margin: "0 0 6px" }}>{pkg.title}</h3>
                  <p className="font-sans-dm" style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 20px", fontWeight: 500 }}>{pkg.sub}</p>

                  {/* Divider */}
                  <div style={{ height: 1, background: "#f0ede8", marginBottom: 20 }} />

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p className="font-sans-dm" style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Starting from</p>
                      <p className="font-display" style={{ fontSize: 26, fontWeight: 900, color: pkg.accent, margin: 0 }}>{pkg.price}</p>
                      <p className="font-sans-dm" style={{ fontSize: 10, color: "#9ca3af", margin: 0 }}>per person</p>
                    </div>
                    <button style={{
                      background: `linear-gradient(135deg, ${pkg.accent}, ${pkg.accent}cc)`,
                      color: "white", border: "none", borderRadius: 14, padding: "12px 22px",
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 14,
                      cursor: "pointer", boxShadow: `0 8px 20px ${pkg.accent}35`,
                      transition: "all 0.3s ease",
                    }}>
                      Book Now →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button style={{
              background: "transparent", border: "2px solid #0e1f4d", color: "#0e1f4d",
              borderRadius: 16, padding: "14px 40px",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 15,
              cursor: "pointer", transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#0e1f4d"; (e.currentTarget as HTMLElement).style.color = "white"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#0e1f4d"; }}
            >
              View All 500+ Packages →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ TESTIMONIALS ══════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg, #0e1f4d 0%, #1a3a7a 50%, #0a0f1e 100%)", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        {/* Decorative */}
        <div style={{ position: "absolute", top: "20%", left: "5%", fontSize: 160, opacity: 0.03, fontFamily: "serif", color: "white", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>"</div>
        <div style={{ position: "absolute", bottom: "10%", right: "5%", fontSize: 160, opacity: 0.03, fontFamily: "serif", color: "white", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>"</div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="font-sans-dm" style={{ fontSize: 12, fontWeight: 800, color: "#f5a623", textTransform: "uppercase", letterSpacing: "0.15em" }}>Real Stories</span>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: "white", margin: "10px 0 0" }}>
              What Our <em style={{ color: "#f5a623" }}>Travelers</em> Say
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {testimonials.map((t) => (
              <div key={t.name} className="testi-card">
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} style={{ color: "#f5a623", fontSize: 16 }}>★</span>
                  ))}
                </div>
                <p className="font-sans-dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 28, fontStyle: "italic" }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", fontWeight: 900, fontSize: 14, color: "white", flexShrink: 0, boxShadow: `0 8px 20px ${t.color}40` }}>
                    {t.init}
                  </div>
                  <div>
                    <p className="font-sans-dm" style={{ fontWeight: 800, color: "white", fontSize: 15, margin: 0 }}>{t.name}</p>
                    <p className="font-sans-dm" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>📍 {t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CTA / NEWSLETTER ══════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", padding: "100px 0" }}>
        {/* Gold gradient bg */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #f5a623 0%, #f97316 50%, #fbbf24 100%)" }} />
        {/* Pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        {/* Orb */}
        <div style={{ position: "absolute", right: "-5%", top: "50%", transform: "translateY(-50%)", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />

        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 2 }}>
          <span className="font-sans-dm" style={{ fontSize: 12, fontWeight: 800, color: "rgba(14,31,77,0.6)", textTransform: "uppercase", letterSpacing: "0.15em" }}>Stay in the Loop</span>
          <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#0e1f4d", margin: "12px 0 16px", lineHeight: 1.1 }}>
            Ready for Your<br />Next Adventure?
          </h2>
          <p className="font-sans-dm" style={{ fontSize: 17, color: "rgba(14,31,77,0.65)", marginBottom: 40, lineHeight: 1.7 }}>
            Get exclusive deals, secret destinations & early-bird offers — delivered straight to your inbox.
          </p>
          <div style={{ display: "flex", gap: 12, maxWidth: 500, margin: "0 auto" }}>
            <input
              type="email"
              placeholder="Your email address"
              className="font-sans-dm"
              style={{ flex: 1, padding: "16px 20px", borderRadius: 16, border: "none", fontSize: 15, outline: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", color: "#0e1f4d" }}
            />
            <button style={{
              background: "#0e1f4d", color: "white", border: "none",
              borderRadius: 16, padding: "16px 28px",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 15,
              cursor: "pointer", whiteSpace: "nowrap",
              boxShadow: "0 8px 24px rgba(14,31,77,0.4)",
              transition: "all 0.3s ease",
            }}>
              Subscribe ✨
            </button>
          </div>
          <p className="font-sans-dm" style={{ marginTop: 14, fontSize: 12, color: "rgba(14,31,77,0.5)" }}>No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ══════════════════════════ FOOTER ══════════════════════════ */}
      <footer style={{ background: "#0a0f1e", color: "white", padding: "80px 0 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 20 }}>
                <span className="font-display" style={{ fontSize: 28, fontWeight: 900, color: "white" }}>Raj</span>
                <span className="font-display" style={{ fontSize: 28, fontWeight: 900, color: "#f5a623" }}>Rup</span>
                <span style={{ color: "#f5a623", fontSize: 18, marginLeft: 4 }}>✈</span>
              </div>
              <p className="font-sans-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 28, maxWidth: 260 }}>
                India's most trusted travel partner — crafting unforgettable journeys since 2008.
              </p>
              {/* Social */}
              <div style={{ display: "flex", gap: 10 }}>
                {[{ icon: "f", color: "#1877f2" }, { icon: "in", color: "#e1306c" }, { icon: "t", color: "#1da1f2" }, { icon: "▶", color: "#ff0000" }].map(({ icon, color }, i) => (
                  <button key={i} style={{
                    width: 38, height: 38, borderRadius: 12,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 800,
                    cursor: "pointer", transition: "all 0.3s ease",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = color; (e.currentTarget as HTMLElement).style.color = "white"; (e.currentTarget as HTMLElement).style.borderColor = "transparent"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Columns */}
            {[
              { title: "Quick Links", links: ["Home", "About Us", "Packages", "Destinations", "Services", "Blog"] },
              { title: "Destinations", links: ["Manali", "Goa", "Kerala", "Rajasthan", "Andaman", "Leh Ladakh"] },
              { title: "Contact", links: ["📞 +91 98765 43210", "📧 hello@rajruptravels.com", "📍 Mumbai, Maharashtra", "🕐 Mon–Sat · 9AM–7PM"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="font-sans-dm" style={{ fontSize: 11, fontWeight: 800, color: "#f5a623", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 20 }}>{title}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="font-sans-dm" style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.target as HTMLElement).style.color = "white"}
                        onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)"}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p className="font-sans-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>
              © 2025 RajRup Travels. All rights reserved. Made with ❤️ in India
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
                <a key={item} href="#" className="font-sans-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = "white"}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)"}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}