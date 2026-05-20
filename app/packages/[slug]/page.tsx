import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { TravelPackage, type TravelPackageType } from "@/lib/models/TravelPackage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Params = { slug: string };

export default async function PackageDetailsPage({ params }: { params: Promise<Params> }) {
  await connectToDatabase();
  const { slug } = await params;

  const travelPackage = (await TravelPackage.findOne({ slug }).lean()) as TravelPackageType | null;

  if (!travelPackage) notFound();

  const nights = Math.max((travelPackage.durationDays ?? 1) - 1, 0);

  return (
    <>
      {/* ── Global Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy:   #0e1f4d;
          --gold:   #f5a623;
          --gold2:  #f97316;
          --cream:  #fdf9f3;
          --sand:   #f5f0e8;
          --border: #e8e2d8;
          --muted:  #8c8070;
          --text:   #1c1612;
          --green:  #10b981;
          --red:    #ef4444;
        }

        .pd-root {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          background: var(--cream);
          min-height: 100vh;
          color: var(--text);
        }

        /* ── Navbar ── */
        .pd-nav {
          background: white;
          border-bottom: 1px solid var(--border);
          padding: 0 40px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 20px rgba(14,31,77,0.05);
        }
        .pd-logo {
          font-family: 'Lora', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--navy);
          display: flex;
          align-items: center;
          gap: 4px;
          text-decoration: none;
        }
        .pd-logo em { color: var(--gold); font-style: normal; }
        .pd-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
        }
        .pd-breadcrumb a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .pd-breadcrumb a:hover { color: var(--navy); }
        .pd-breadcrumb-sep { font-size: 10px; color: #c4b8a8; }
        .pd-breadcrumb-current { color: var(--navy); font-weight: 600; }
        .pd-nav-right { display: flex; align-items: center; gap: 10px; }
        .pd-nav-btn {
          padding: 9px 20px;
          border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.22s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1.5px solid var(--border);
          background: white;
          color: var(--muted);
        }
        .pd-nav-btn:hover { border-color: var(--gold); color: var(--navy); }
        .pd-nav-btn.primary {
          background: linear-gradient(135deg, var(--gold), var(--gold2));
          border-color: transparent;
          color: var(--navy);
          box-shadow: 0 4px 16px rgba(245,166,35,0.32);
        }
        .pd-nav-btn.primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(245,166,35,0.4); }

        /* ── Hero ── */
        .pd-hero {
          position: relative;
          height: 520px;
          overflow: hidden;
        }
        .pd-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 8s ease;
        }
        .pd-hero:hover .pd-hero-img { transform: scale(1.04); }
        .pd-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(14,31,77,0.82) 0%,
            rgba(14,31,77,0.3) 45%,
            rgba(14,31,77,0.05) 100%
          );
        }
        .pd-hero-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px 56px 48px;
        }
        .pd-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--gold);
          margin-bottom: 14px;
          background: rgba(245,166,35,0.15);
          border: 1px solid rgba(245,166,35,0.3);
          border-radius: 40px;
          padding: 5px 14px;
        }
        .pd-hero-title {
          font-family: 'Lora', Georgia, serif;
          font-size: clamp(36px, 5vw, 62px);
          font-weight: 700;
          color: white;
          line-height: 1.1;
          margin-bottom: 16px;
          max-width: 800px;
        }
        .pd-hero-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .pd-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 40px;
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
        }
        .pd-hero-pill.gold {
          background: rgba(245,166,35,0.25);
          border-color: rgba(245,166,35,0.4);
          color: #fde68a;
        }

        /* ── Layout ── */
        .pd-body {
          max-width: 1240px;
          margin: 0 auto;
          padding: 48px 40px;
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 28px;
          align-items: start;
        }

        /* ── Cards ── */
        .pd-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(14,31,77,0.06);
          transition: box-shadow 0.3s;
          margin-bottom: 24px;
        }
        .pd-card:last-child { margin-bottom: 0; }
        .pd-card:hover { box-shadow: 0 8px 32px rgba(14,31,77,0.10); }
        .pd-card-head {
          padding: 22px 28px;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(135deg, #fffcf7 0%, white 100%);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pd-card-icon {
          width: 38px; height: 38px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(245,166,35,0.14), rgba(249,115,22,0.09));
          border: 1px solid rgba(245,166,35,0.22);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; flex-shrink: 0;
        }
        .pd-card-title {
          font-family: 'Lora', serif;
          font-size: 17px;
          font-weight: 600;
          color: var(--navy);
        }
        .pd-card-count {
          margin-left: auto;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          background: var(--sand);
          border-radius: 40px;
          padding: 3px 10px;
        }
        .pd-card-body { padding: 24px 28px; }

        /* ── Overview ── */
        .pd-overview-text {
          font-size: 15px;
          line-height: 1.85;
          color: #4a4238;
          font-weight: 400;
        }

        /* ── Highlights ── */
        .pd-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .pd-highlight-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          border-radius: 40px;
          background: linear-gradient(135deg, rgba(245,166,35,0.09), rgba(249,115,22,0.06));
          border: 1.5px solid rgba(245,166,35,0.22);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--navy);
          transition: all 0.22s;
        }
        .pd-highlight-chip:hover {
          border-color: var(--gold);
          background: rgba(245,166,35,0.14);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(245,166,35,0.18);
        }
        .pd-highlight-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }

        /* ── Itinerary ── */
        .pd-itin { position: relative; padding-left: 40px; }
        .pd-itin::before {
          content: '';
          position: absolute;
          left: 16px; top: 20px; bottom: 20px;
          width: 2px;
          background: linear-gradient(180deg, var(--gold) 0%, rgba(245,166,35,0.15) 100%);
          border-radius: 2px;
        }
        .pd-itin-item { position: relative; margin-bottom: 18px; }
        .pd-itin-item:last-child { margin-bottom: 0; }
        .pd-itin-dot {
          position: absolute;
          left: -40px;
          top: 20px;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: white;
          border: 3px solid var(--gold);
          box-shadow: 0 0 0 4px rgba(245,166,35,0.12);
          z-index: 2;
          transition: all 0.3s;
        }
        .pd-itin-item:hover .pd-itin-dot {
          background: var(--gold);
          box-shadow: 0 0 0 6px rgba(245,166,35,0.15);
        }
        .pd-itin-card {
          background: var(--cream);
          border: 1.5px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          transition: all 0.28s;
        }
        .pd-itin-item:hover .pd-itin-card {
          border-color: rgba(245,166,35,0.35);
          background: white;
          box-shadow: 0 6px 24px rgba(14,31,77,0.08);
          transform: translateX(4px);
        }
        .pd-itin-head {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border);
        }
        .pd-day-badge {
          background: linear-gradient(135deg, var(--navy), #1a3a7a);
          color: white;
          font-family: 'Lora', serif;
          font-size: 11px;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 40px;
          white-space: nowrap;
          flex-shrink: 0;
          letter-spacing: 0.04em;
        }
        .pd-itin-title-text {
          font-size: 15px;
          font-weight: 700;
          color: var(--navy);
          flex: 1;
        }
        .pd-itin-body {
          padding: 14px 20px;
        }
        .pd-itin-desc {
          font-size: 14px;
          line-height: 1.78;
          color: #5a4e42;
        }

        /* ── Aside card: quick facts ── */
        .pd-facts-list { display: flex; flex-direction: column; gap: 10px; }
        .pd-fact-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 13px 16px;
          border-radius: 14px;
          border: 1.5px solid var(--border);
          background: var(--cream);
          transition: all 0.22s;
        }
        .pd-fact-row:hover { border-color: rgba(245,166,35,0.3); background: rgba(245,166,35,0.03); }
        .pd-fact-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .pd-fact-icon { font-size: 15px; }
        .pd-fact-value {
          font-size: 14px;
          font-weight: 700;
          color: var(--navy);
          text-align: right;
        }
        .pd-fact-value.price {
          font-family: 'Lora', serif;
          font-size: 18px;
          color: var(--gold2);
        }
        .pd-featured-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg, rgba(245,166,35,0.14), rgba(249,115,22,0.09));
          border: 1px solid rgba(245,166,35,0.28);
          border-radius: 40px;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 700;
          color: #92400e;
        }

        /* ── Inclusions / Exclusions ── */
        .pd-inc-list { display: flex; flex-direction: column; gap: 8px; }
        .pd-inc-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 14px;
          border: 1.5px solid;
          font-size: 13.5px;
          font-weight: 500;
          transition: all 0.22s;
        }
        .pd-inc-item.green {
          border-color: rgba(16,185,129,0.2);
          background: rgba(16,185,129,0.04);
          color: #065f46;
        }
        .pd-inc-item.green:hover { border-color: rgba(16,185,129,0.4); background: rgba(16,185,129,0.08); }
        .pd-inc-item.red {
          border-color: rgba(239,68,68,0.18);
          background: rgba(239,68,68,0.03);
          color: #991b1b;
        }
        .pd-inc-item.red:hover { border-color: rgba(239,68,68,0.35); background: rgba(239,68,68,0.07); }
        .pd-inc-dot-green { width: 8px; height: 8px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
        .pd-inc-dot-red { width: 8px; height: 8px; border-radius: 50%; background: var(--red); flex-shrink: 0; }

        /* ── Book Now sticky card ── */
        .pd-book-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(14,31,77,0.11);
          position: sticky;
          top: 84px;
          margin-bottom: 24px;
        }
        .pd-book-top {
          background: linear-gradient(135deg, var(--navy) 0%, #1a3a7a 100%);
          padding: 28px 24px;
          position: relative;
          overflow: hidden;
        }
        .pd-book-top::before {
          content: '';
          position: absolute;
          top: -30px; right: -30px;
          width: 130px; height: 130px;
          border-radius: 50%;
          background: rgba(245,166,35,0.12);
        }
        .pd-book-top::after {
          content: '';
          position: absolute;
          bottom: -20px; left: -20px;
          width: 90px; height: 90px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
        }
        .pd-book-price-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.5);
          margin-bottom: 6px;
          position: relative;
          z-index: 1;
        }
        .pd-book-price {
          font-family: 'Lora', serif;
          font-size: 46px;
          font-weight: 700;
          color: var(--gold);
          line-height: 1;
          position: relative;
          z-index: 1;
        }
        .pd-book-price sub { font-size: 18px; vertical-align: super; font-weight: 500; color: rgba(245,166,35,0.7); }
        .pd-book-price-per {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          font-weight: 500;
          margin-top: 4px;
          position: relative;
          z-index: 1;
        }
        .pd-book-dur {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 14px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 40px;
          padding: 5px 14px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          position: relative;
          z-index: 1;
        }
        .pd-book-body { padding: 22px 24px; display: flex; flex-direction: column; gap: 12px; }
        .pd-book-btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 16px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.25s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
        }
        .pd-book-btn.primary {
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%);
          color: var(--navy);
          box-shadow: 0 6px 24px rgba(245,166,35,0.35);
        }
        .pd-book-btn.primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(245,166,35,0.45); }
        .pd-book-btn.outline {
          background: white;
          color: var(--navy);
          border: 1.5px solid var(--border);
        }
        .pd-book-btn.outline:hover { border-color: var(--gold); background: rgba(245,166,35,0.04); }
        .pd-trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding-top: 6px;
          border-top: 1px solid var(--border);
        }
        .pd-trust-item { display: flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 600; color: var(--muted); }

        /* ── Gallery ── */
        .pd-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .pd-gallery-item {
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 4/3;
          position: relative;
          cursor: pointer;
        }
        .pd-gallery-item:first-child {
          grid-column: span 2;
          grid-row: span 1;
          aspect-ratio: 16/9;
        }
        .pd-gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .pd-gallery-item:hover .pd-gallery-img { transform: scale(1.06); }
        .pd-gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(14,31,77,0) 50%, rgba(14,31,77,0.3) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .pd-gallery-item:hover .pd-gallery-overlay { opacity: 1; }

        /* ── Rating summary ── */
        .pd-rating-bar { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .pd-rating-stars { display: flex; gap: 2px; }
        .pd-star { font-size: 18px; }
        .pd-rating-number { font-family: 'Lora', serif; font-size: 48px; font-weight: 700; color: var(--navy); line-height: 1; }
        .pd-rating-count { font-size: 13px; color: var(--muted); font-weight: 500; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .pd-body { grid-template-columns: 1fr; padding: 32px 24px; }
          .pd-book-card { position: static; }
          .pd-hero-content { padding: 28px 24px 36px; }
          .pd-hero { height: 420px; }
          .pd-nav { padding: 0 20px; }
        }
        @media (max-width: 640px) {
          .pd-gallery-grid { grid-template-columns: 1fr 1fr; }
          .pd-gallery-item:first-child { grid-column: span 2; }
          .pd-hero { height: 340px; }
          .pd-hero-title { font-size: 28px; }
        }

        /* ── Entrance animations ── */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pd-animate { animation: fadeSlideUp 0.55s ease both; }
        .pd-delay-1 { animation-delay: 0.08s; }
        .pd-delay-2 { animation-delay: 0.16s; }
        .pd-delay-3 { animation-delay: 0.24s; }
        .pd-delay-4 { animation-delay: 0.32s; }
        .pd-delay-5 { animation-delay: 0.40s; }
      `}</style>

      <div className="pd-root">

        {/* ── Navbar ── */}
        <nav className="pd-nav">
          <a href="/" className="pd-logo">Raj<em>Rup</em> ✈</a>
          <div className="pd-breadcrumb">
            <a href="/">Home</a>
            <span className="pd-breadcrumb-sep">›</span>
            <a href="/packages">Packages</a>
            <span className="pd-breadcrumb-sep">›</span>
            <span className="pd-breadcrumb-current">{travelPackage.name}</span>
          </div>
          <div className="pd-nav-right">
            <a href="/packages" className="pd-nav-btn">← All Packages</a>
            <a href="#book" className="pd-nav-btn primary">Book Now ✈</a>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="pd-hero pd-animate">
          <img
            src={travelPackage.coverImage}
            alt={travelPackage.name}
            className="pd-hero-img"
          />
          <div className="pd-hero-overlay" />
          <div className="pd-hero-content">
            <div className="pd-hero-eyebrow">
              📍 {travelPackage.state} &nbsp;·&nbsp; {travelPackage.category} Package
            </div>
            <h1 className="pd-hero-title">{travelPackage.name}</h1>
            <div className="pd-hero-meta">
              <span className="pd-hero-pill">🗺️ {travelPackage.destination}</span>
              <span className="pd-hero-pill">🗓️ {travelPackage.durationDays} Days / {nights} Nights</span>
              <span className="pd-hero-pill gold">⭐ {travelPackage.rating} ({travelPackage.reviews} reviews)</span>
              {travelPackage.featured && (
                <span className="pd-hero-pill" style={{ background: "rgba(245,166,35,0.3)", borderColor: "rgba(245,166,35,0.5)", color: "#fde68a" }}>
                  🏅 Featured
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ── Body ── */}
        <div className="pd-body">

          {/* ── LEFT COLUMN ── */}
          <div>

            {/* Overview */}
            <div className="pd-card pd-animate pd-delay-1">
              <div className="pd-card-head">
                <div className="pd-card-icon">📖</div>
                <div className="pd-card-title">Overview</div>
              </div>
              <div className="pd-card-body">
                <p className="pd-overview-text">{travelPackage.description}</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="pd-card pd-animate pd-delay-2">
              <div className="pd-card-head">
                <div className="pd-card-icon">✨</div>
                <div className="pd-card-title">Highlights</div>
                <span className="pd-card-count">{travelPackage.highlights.length} spots</span>
              </div>
              <div className="pd-card-body">
                <div className="pd-highlights">
                  {travelPackage.highlights.map((item) => (
                    <div key={item} className="pd-highlight-chip">
                      <div className="pd-highlight-dot" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <div className="pd-card pd-animate pd-delay-3">
              <div className="pd-card-head">
                <div className="pd-card-icon">🗓️</div>
                <div className="pd-card-title">Day-by-Day Itinerary</div>
                <span className="pd-card-count">{travelPackage.durationDays} days</span>
              </div>
              <div className="pd-card-body">
                <div className="pd-itin">
                  {travelPackage.itinerary.map((item) => (
                    <div key={item.day} className="pd-itin-item">
                      <div className="pd-itin-dot" />
                      <div className="pd-itin-card">
                        <div className="pd-itin-head">
                          <div className="pd-day-badge">Day {item.day}</div>
                          <div className="pd-itin-title-text">{item.title}</div>
                        </div>
                        <div className="pd-itin-body">
                          <p className="pd-itin-desc">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery */}
            {travelPackage.gallery.length > 0 && (
              <div className="pd-card pd-animate pd-delay-4">
                <div className="pd-card-head">
                  <div className="pd-card-icon">🖼️</div>
                  <div className="pd-card-title">Gallery</div>
                  <span className="pd-card-count">{travelPackage.gallery.length} photos</span>
                </div>
                <div className="pd-card-body">
                  <div className="pd-gallery-grid">
                    {travelPackage.gallery.map((image, idx) => (
                      <div key={image} className="pd-gallery-item">
                        <img src={image} alt={`${travelPackage.name} photo ${idx + 1}`} className="pd-gallery-img" />
                        <div className="pd-gallery-overlay" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT COLUMN / ASIDE ── */}
          <aside id="book">

            {/* Book Now Card */}
            <div className="pd-book-card pd-animate pd-delay-2">
              <div className="pd-book-top">
                <div className="pd-book-price-label">Starting from</div>
                <div className="pd-book-price">
                  <sub>₹</sub>{travelPackage.price.toLocaleString("en-IN")}
                </div>
                <div className="pd-book-price-per">per person, all taxes included</div>
                <div className="pd-book-dur">
                  🗓️ {travelPackage.durationDays} Days &nbsp;/&nbsp; {nights} Nights
                </div>
              </div>
              <div className="pd-book-body">
                <a href="#enquire" className="pd-book-btn primary">
                  ✈️ Book This Package
                </a>
                <a href="#enquire" className="pd-book-btn outline">
                  💬 Send Enquiry
                </a>
                <div className="pd-trust-row">
                  <div className="pd-trust-item">🔒 Secure</div>
                  <div style={{ width: 1, height: 14, background: "var(--border)" }} />
                  <div className="pd-trust-item">✅ Best Price</div>
                  <div style={{ width: 1, height: 14, background: "var(--border)" }} />
                  <div className="pd-trust-item">🎧 24/7 Help</div>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="pd-card pd-animate pd-delay-3">
              <div className="pd-card-head">
                <div className="pd-card-icon">📋</div>
                <div className="pd-card-title">Quick Facts</div>
              </div>
              <div className="pd-card-body">
                <div className="pd-facts-list">
                  <FactRow icon="💰" label="Price" value={`₹${travelPackage.price.toLocaleString("en-IN")}`} isPrice />
                  <FactRow icon="🌏" label="State" value={travelPackage.state} />
                  <FactRow icon="🗓️" label="Duration" value={`${travelPackage.durationDays} Days / ${nights} Nights`} />
                  <FactRow icon="🧳" label="Category" value={travelPackage.category} />
                  <FactRow icon="⭐" label="Rating" value={`${travelPackage.rating} / 5`} />
                  <FactRow icon="💬" label="Reviews" value={`${travelPackage.reviews} reviews`} />
                  {travelPackage.featured && (
                    <div className="pd-fact-row">
                      <div className="pd-fact-label"><span className="pd-fact-icon">🏅</span> Featured</div>
                      <span className="pd-featured-badge">⭐ Featured Package</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Inclusions */}
            <div className="pd-card pd-animate pd-delay-4">
              <div className="pd-card-head">
                <div className="pd-card-icon">✅</div>
                <div className="pd-card-title">Inclusions</div>
                <span className="pd-card-count" style={{ color: "#065f46", background: "rgba(16,185,129,0.1)" }}>
                  {travelPackage.inclusions.length}
                </span>
              </div>
              <div className="pd-card-body">
                <div className="pd-inc-list">
                  {travelPackage.inclusions.map((item) => (
                    <div key={item} className="pd-inc-item green">
                      <div className="pd-inc-dot-green" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Exclusions */}
            <div className="pd-card pd-animate pd-delay-5">
              <div className="pd-card-head">
                <div className="pd-card-icon">❌</div>
                <div className="pd-card-title">Exclusions</div>
                <span className="pd-card-count" style={{ color: "#991b1b", background: "rgba(239,68,68,0.08)" }}>
                  {travelPackage.exclusions.length}
                </span>
              </div>
              <div className="pd-card-body">
                <div className="pd-inc-list">
                  {travelPackage.exclusions.map((item) => (
                    <div key={item} className="pd-inc-item red">
                      <div className="pd-inc-dot-red" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </aside>
        </div>

        {/* ── Footer strip ── */}
        <footer style={{
          borderTop: "1px solid var(--border)",
          background: "white",
          padding: "28px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontFamily: "'Lora',serif", fontSize: 18, fontWeight: 700, color: "#0e1f4d" }}>Raj</span>
            <span style={{ fontFamily: "'Lora',serif", fontSize: 18, fontWeight: 700, color: "#f5a623" }}>Rup</span>
            <span style={{ color: "#f5a623", fontSize: 14, marginLeft: 2 }}>✈</span>
            <span style={{ fontSize: 13, color: "#8c8070", marginLeft: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 500 }}>
              Your Journey, Our Priority
            </span>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {["📞 +91 98765 43210", "📧 hello@rajruptravels.com"].map(item => (
              <span key={item} style={{ fontSize: 13, fontWeight: 600, color: "#8c8070", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{item}</span>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}

/* ── Sub-components ── */
function FactRow({ icon, label, value, isPrice }: { icon: string; label: string; value: string; isPrice?: boolean }) {
  return (
    <div className="pd-fact-row">
      <div className="pd-fact-label">
        <span className="pd-fact-icon">{icon}</span>
        {label}
      </div>
      <div className={`pd-fact-value${isPrice ? " price" : ""}`}>{value}</div>
    </div>
  );
}