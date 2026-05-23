"use client";
import React, { useEffect, useState } from "react";

export default function AboutUs() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Home", "About Us", "Packages", "Destinations", "Services", "Blog", "Contact Us"];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", backgroundColor: "#f8f7f4" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        :root { --navy: #0e1f4d; --gold: #f5a623; --cream: #f8f7f4; }
        .font-display { font-family: 'Playfair Display', Georgia, serif !important; }
        .font-sans-dm { font-family: 'DM Sans', system-ui, sans-serif !important; }
        .shimmer-text { background: linear-gradient(90deg, var(--gold) 0%, #fff9c4 40%, var(--gold) 60%, #f97316 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 3s linear infinite; }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .btn-primary { background: linear-gradient(135deg, var(--gold) 0%, #f97316 100%); color: #0e1f4d; font-weight: 700; border-radius: 14px; padding: 12px 26px; font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.4s ease", background: scrolled ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.08)" : "none", borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, userSelect: "none" }}>
            <span className="font-display" style={{ fontSize: 28, fontWeight: 900, color: "#0e1f4d" }}>Raj</span>
            <span className="font-display" style={{ fontSize: 28, fontWeight: 900, color: "#f5a623" }}>Rup</span>
            <span style={{ fontSize: 18, marginLeft: 2, color: "#f5a623" }}>✈</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="hidden lg:flex">
            {navLinks.map((link) => (
              <a key={link} href="#" className="font-sans-dm" style={{ padding: "8px 14px", borderRadius: 10, fontSize: 14, fontWeight: 600, color: link === "About Us" ? "#f5a623" : "#0e1f4d", textDecoration: "none" }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "60vh", paddingTop: 120, display: "flex", alignItems: "center", background: "linear-gradient(180deg,#0e1f4d 0%, #1a3a7a 50%, #0a0f1e 100%)", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px", width: "100%", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2">
            <div>
              <span className="font-sans-dm" style={{ fontSize: 12, fontWeight: 800, color: "#fde68a", textTransform: "uppercase", letterSpacing: "0.12em" }}>About RajRup</span>
              <h1 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 900, margin: "12px 0" }}>
                Our Story
                <br />
                <span className="shimmer-text">Passion for Travel</span>
              </h1>
              <p className="font-sans-dm" style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", maxWidth: 600, lineHeight: 1.8 }}>
                Since 2008, RajRup Travels has crafted meaningful journeys across India and beyond. We combine local expertise, handpicked experiences and a personal touch to make each trip unforgettable.
              </p>
              <div style={{ marginTop: 24 }}>
                <button className="btn-primary">Explore Packages →</button>
              </div>
            </div>

            <div style={{ color: "white" }}>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: 28 }}>
                <h3 className="font-display" style={{ margin: 0, fontSize: 20 }}>Our Mission</h3>
                <p className="font-sans-dm" style={{ color: "rgba(255,255,255,0.85)", marginTop: 8 }}>To bring effortless, curated travel to every explorer — responsibly and with heart.</p>
                <hr style={{ border: "none", height: 1, background: "rgba(255,255,255,0.06)", margin: "18px 0" }} />
                <h3 className="font-display" style={{ margin: 0, fontSize: 20 }}>Values</h3>
                <ul style={{ marginTop: 10, paddingLeft: 18 }} className="font-sans-dm">
                  <li>Customer-first service</li>
                  <li>Local partnerships</li>
                  <li>Transparent pricing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY / TEAM */}
      <section style={{ background: "white", padding: "80px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: 0, color: "#0e1f4d" }}>Our Journey</h2>
            <p className="font-sans-dm" style={{ color: "#6b7280", maxWidth: 720, margin: "12px auto 0" }}>From a small local operator to a nationwide travel curator — our growth is driven by travelers' trust and relentless curiosity.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            <div className="feature-card" style={{ padding: 24 }}>
              <div style={{ fontSize: 30 }}>🏁</div>
              <h4 className="font-display" style={{ marginTop: 12 }}>Humble Beginnings</h4>
              <p className="font-sans-dm" style={{ color: "#6b7280" }}>Started by travel enthusiasts with a single mission: make travel feel effortless.</p>
            </div>
            <div className="feature-card" style={{ padding: 24 }}>
              <div style={{ fontSize: 30 }}>🤝</div>
              <h4 className="font-display" style={{ marginTop: 12 }}>Trusted Partnerships</h4>
              <p className="font-sans-dm" style={{ color: "#6b7280" }}>We work with local experts and vetted suppliers to ensure consistent quality.</p>
            </div>
            <div className="feature-card" style={{ padding: 24 }}>
              <div style={{ fontSize: 30 }}>🌿</div>
              <h4 className="font-display" style={{ marginTop: 12 }}>Responsible Travel</h4>
              <p className="font-sans-dm" style={{ color: "#6b7280" }}>Sustainable practices are embedded into our itineraries and partner choices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA and Footer (kept consistent with Homepage) */}
      <section style={{ padding: "80px 0", background: "linear-gradient(135deg, #f5a623 0%, #f97316 50%, #fbbf24 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", textAlign: "center", color: "#0e1f4d" }}>
          <h2 className="font-display" style={{ color: "#0e1f4d", margin: 0 }}>Ready to travel with us?</h2>
          <p className="font-sans-dm" style={{ marginTop: 8 }}>Explore curated packages or talk to our travel experts today.</p>
          <div style={{ marginTop: 20 }}>
            <button className="btn-primary">Contact Us →</button>
          </div>
        </div>
      </section>

      <footer style={{ background: "#0a0f1e", color: "white", padding: "80px 0 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 20 }}>
                <span className="font-display" style={{ fontSize: 28, fontWeight: 900, color: "white" }}>Raj</span>
                <span className="font-display" style={{ fontSize: 28, fontWeight: 900, color: "#f5a623" }}>Rup</span>
                <span style={{ color: "#f5a623", fontSize: 18, marginLeft: 4 }}>✈</span>
              </div>
              <p className="font-sans-dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 28, maxWidth: 260 }}>
                India's most trusted travel partner — crafting unforgettable journeys since 2008.
              </p>
            </div>

            <div>
              <h4 className="font-sans-dm" style={{ fontSize: 11, fontWeight: 800, color: "#f5a623", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 20 }}>Quick Links</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {['Home','About Us','Packages','Destinations','Services','Blog'].map(l => (
                  <li key={l}><a href="#" className="font-sans-dm" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-sans-dm" style={{ fontSize: 11, fontWeight: 800, color: "#f5a623", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 20 }}>Contact</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                <li className="font-sans-dm" style={{ color: "rgba(255,255,255,0.45)" }}>📞 +91 98765 43210</li>
                <li className="font-sans-dm" style={{ color: "rgba(255,255,255,0.45)" }}>📧 hello@rajruptravels.com</li>
                <li className="font-sans-dm" style={{ color: "rgba(255,255,255,0.45)" }}>📍 Mumbai, Maharashtra</li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans-dm" style={{ fontSize: 11, fontWeight: 800, color: "#f5a623", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 20 }}>Destinations</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {['Manali','Goa','Kerala','Rajasthan','Andaman','Leh Ladakh'].map(d => (
                  <li key={d}><a href="#" className="font-sans-dm" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>{d}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p className="font-sans-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>© 2025 RajRup Travels. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {['Privacy Policy','Terms of Service','Cookie Policy'].map(item => (
                <a key={item} href="#" className="font-sans-dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
