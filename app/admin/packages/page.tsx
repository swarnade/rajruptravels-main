"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/* ─── types ─── */
type ItineraryItem = { day: number; title: string; description: string };
const emptyItem = (day: number): ItineraryItem => ({ day, title: "", description: "" });

/* ─── tiny icon helpers (inline SVG, no deps) ─── */
const Icon = {
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3.5h10M5.5 3.5V2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1M6 6.5v3M8 6.5v3M3 3.5l.667 7a1 1 0 0 0 .996.917h4.674a1 1 0 0 0 .996-.917L11 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Reset: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7A4.5 4.5 0 1 0 4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2.5 2v1.5H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Package: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="5" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 8h14" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 5V3.5a2.5 2.5 0 0 1 5 0V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Map: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2C5.8 2 4 3.8 4 6c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4Z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5l1.8 3.6 4 .58-2.9 2.82.68 3.98L8 10.5l-3.58 1.98.68-3.98L2.2 5.68l4-.58L8 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  Image: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="5.5" cy="6.5" r="1" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 11l3-3 2.5 2.5L10 8l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2 7h12M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  List: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 4h10M3 8h10M3 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function PackageForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [durationDays, setDurationDays] = useState(6);
  const [highlights, setHighlights] = useState(["Paro", "Tiger's Nest Monastery (Taktsang)"]);
  const [inclusions, setInclusions] = useState(["3 Star hotel accommodation", "Breakfast and dinner included"]);
  const [exclusions, setExclusions] = useState(["Flights/Train tickets", "Lunch"]);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(
    Array.from({ length: 6 }, (_, i) => emptyItem(i + 1))
  );
  const [activeSection, setActiveSection] = useState<string>("basic");

  const nights = useMemo(() => Math.max(durationDays - 1, 0), [durationDays]);

  const syncItineraryDays = (days: number) => {
    setItinerary((cur) =>
      Array.from({ length: days }, (_, i) => cur[i] ?? emptyItem(i + 1)).map((item, i) => ({
        ...item,
        day: i + 1,
      }))
    );
  };

  const addListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    setter((c) => [...c, ""]);
  const updateListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, idx: number, val: string) =>
    setter((c) => c.map((it, i) => (i === idx ? val : it)));
  const removeListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, idx: number) =>
    setter((c) => c.filter((_, i) => i !== idx));

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    try {
      const el = e.currentTarget;
      const fd = new FormData(el);
      fd.set("highlights", JSON.stringify(highlights.filter(Boolean)));
      fd.set("inclusions", JSON.stringify(inclusions.filter(Boolean)));
      fd.set("exclusions", JSON.stringify(exclusions.filter(Boolean)));
      fd.set("itinerary", JSON.stringify(itinerary.filter((it) => it.title && it.description)));
      const res = await fetch("/api/packages", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to create package.");
      setMessage("Package saved successfully.");
      el.reset();
      setDurationDays(6);
      setHighlights(["Paro", "Tiger's Nest Monastery (Taktsang)"]);
      setInclusions(["3 Star hotel accommodation", "Breakfast and dinner included"]);
      setExclusions(["Flights/Train tickets", "Lunch"]);
      setItinerary(Array.from({ length: 6 }, (_, i) => emptyItem(i + 1)));
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sections = [
    { id: "basic", label: "Basic Info", icon: <Icon.Package /> },
    { id: "media", label: "Media", icon: <Icon.Image /> },
    { id: "lists", label: "Highlights", icon: <Icon.List /> },
    { id: "itinerary", label: "Itinerary", icon: <Icon.Calendar /> },
  ];

  return (
    <>
      {/* ── global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --navy:    #0e1f4d;
          --gold:    #f5a623;
          --gold2:   #f97316;
          --cream:   #fdf9f3;
          --sand:    #f5f0e8;
          --border:  #e8e2d8;
          --muted:   #8c8070;
          --text:    #1c1612;
          --radius:  18px;
          --shadow:  0 2px 16px rgba(14,31,77,0.07);
          --shadow-md: 0 8px 32px rgba(14,31,77,0.10);
          --shadow-lg: 0 20px 60px rgba(14,31,77,0.13);
        }

        .pf-wrap {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          background: var(--cream);
          min-height: 100vh;
          color: var(--text);
        }

        /* ── Page header ── */
        .pf-header {
          background: white;
          border-bottom: 1px solid var(--border);
          padding: 24px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .pf-logo {
          font-family: 'Lora', Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--navy);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pf-logo span { color: var(--gold); }
        .pf-header-right { display: flex; align-items: center; gap: 12px; }
        .pf-badge {
          background: linear-gradient(135deg,#fff7ed,#fef3c7);
          border: 1px solid #fcd34d;
          color: #92400e;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 12px;
          border-radius: 40px;
        }

        /* ── Layout ── */
        .pf-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 0;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
          align-items: start;
        }

        /* ── Sidebar nav ── */
        .pf-sidenav {
          position: sticky;
          top: 100px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 12px;
          box-shadow: var(--shadow);
          margin-right: 28px;
        }
        .pf-sidenav-title {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
          padding: 8px 12px 4px;
        }
        .pf-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 2px;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
        }
        .pf-nav-item:hover { background: var(--sand); color: var(--navy); }
        .pf-nav-item.active {
          background: linear-gradient(135deg, rgba(245,166,35,0.12), rgba(249,115,22,0.08));
          color: var(--navy);
          border: 1px solid rgba(245,166,35,0.25);
        }
        .pf-nav-item.active .pf-nav-icon { color: var(--gold); }
        .pf-nav-icon { opacity: 0.7; flex-shrink: 0; }
        .pf-nav-item.active .pf-nav-icon { opacity: 1; }

        /* Progress bar */
        .pf-progress-wrap { padding: 16px 12px 4px; border-top: 1px solid var(--border); margin-top: 8px; }
        .pf-progress-label { font-size: 11px; color: var(--muted); font-weight: 600; margin-bottom: 6px; display: flex; justify-content: space-between; }
        .pf-progress-bar { height: 6px; background: var(--sand); border-radius: 6px; overflow: hidden; }
        .pf-progress-fill { height: 100%; background: linear-gradient(90deg, var(--gold), var(--gold2)); border-radius: 6px; transition: width 0.4s ease; }

        /* ── Form main area ── */
        .pf-main { display: flex; flex-direction: column; gap: 24px; }

        /* ── Section card ── */
        .pf-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: box-shadow 0.3s;
        }
        .pf-card:hover { box-shadow: var(--shadow-md); }

        .pf-card-header {
          padding: 22px 28px 20px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #fffcf7 0%, white 100%);
        }
        .pf-card-header-left { display: flex; align-items: center; gap: 12px; }
        .pf-card-icon {
          width: 38px; height: 38px; border-radius: 12px;
          background: linear-gradient(135deg, rgba(245,166,35,0.15), rgba(249,115,22,0.1));
          border: 1px solid rgba(245,166,35,0.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold2);
        }
        .pf-card-title {
          font-family: 'Lora', serif;
          font-size: 17px;
          font-weight: 600;
          color: var(--navy);
          margin: 0;
        }
        .pf-card-desc { font-size: 12.5px; color: var(--muted); margin: 2px 0 0; }
        .pf-card-body { padding: 24px 28px; }

        /* ── Grid ── */
        .pf-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .pf-col-2 { grid-column: span 2; }

        /* ── Field ── */
        .pf-field { display: flex; flex-direction: column; gap: 6px; }
        .pf-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--muted);
        }
        .pf-input, .pf-select, .pf-textarea {
          width: 100%;
          padding: 12px 16px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: var(--text);
          background: var(--cream);
          border: 1.5px solid var(--border);
          border-radius: 14px;
          outline: none;
          transition: all 0.22s;
          -webkit-appearance: none;
        }
        .pf-input::placeholder, .pf-textarea::placeholder { color: #c4b8a8; font-weight: 400; }
        .pf-input:focus, .pf-select:focus, .pf-textarea:focus {
          border-color: var(--gold);
          background: white;
          box-shadow: 0 0 0 4px rgba(245,166,35,0.1);
        }
        .pf-input[readonly] { color: var(--muted); cursor: default; background: var(--sand); }
        .pf-select { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%238c8070' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 38px; }
        .pf-textarea { resize: vertical; min-height: 110px; line-height: 1.7; }

        /* Duration special row */
        .pf-duration-row { display: flex; align-items: center; gap: 0; background: var(--cream); border: 1.5px solid var(--border); border-radius: 14px; overflow: hidden; transition: all 0.22s; }
        .pf-duration-row:focus-within { border-color: var(--gold); box-shadow: 0 0 0 4px rgba(245,166,35,0.1); background: white; }
        .pf-dur-btn { width: 44px; height: 44px; background: none; border: none; font-size: 20px; color: var(--navy); cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; transition: background 0.2s; }
        .pf-dur-btn:hover { background: rgba(245,166,35,0.1); color: var(--gold2); }
        .pf-dur-input { flex: 1; text-align: center; border: none; background: transparent; font-family: 'Lora', serif; font-size: 20px; font-weight: 700; color: var(--navy); width: 100%; outline: none; padding: 0; }
        .pf-dur-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); text-align: center; margin-top: 4px; }
        .pf-nights-pill { background: linear-gradient(135deg, rgba(245,166,35,0.12), rgba(249,115,22,0.08)); border: 1px solid rgba(245,166,35,0.25); color: #92400e; padding: 12px 20px; border-radius: 14px; font-size: 14px; font-weight: 700; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .pf-nights-num { font-family: 'Lora', serif; font-size: 22px; font-weight: 700; color: var(--navy); }

        /* File input */
        .pf-file-area {
          border: 2px dashed var(--border);
          border-radius: 14px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.22s;
          background: var(--cream);
          position: relative;
        }
        .pf-file-area:hover { border-color: var(--gold); background: rgba(245,166,35,0.03); }
        .pf-file-input {
          position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%;
        }
        .pf-file-icon { font-size: 28px; margin-bottom: 6px; }
        .pf-file-text { font-size: 13px; color: var(--muted); }
        .pf-file-hint { font-size: 11px; color: #c4b8a8; margin-top: 4px; }

        /* Checkbox */
        .pf-check-row {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 18px; border-radius: 14px;
          border: 1.5px solid var(--border);
          background: var(--cream); cursor: pointer;
          transition: all 0.22s;
        }
        .pf-check-row:hover { border-color: var(--gold); background: rgba(245,166,35,0.03); }
        .pf-check-box {
          width: 22px; height: 22px; border-radius: 8px;
          border: 2px solid var(--border); background: white;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.22s; color: white;
        }
        .pf-check-row input:checked ~ .pf-check-content .pf-check-box,
        .pf-check-row:has(input:checked) .pf-check-box {
          background: linear-gradient(135deg, var(--gold), var(--gold2));
          border-color: var(--gold);
        }
        .pf-check-content { flex: 1; }
        .pf-check-title { font-size: 14px; font-weight: 600; color: var(--navy); }
        .pf-check-sub { font-size: 12px; color: var(--muted); margin-top: 1px; }

        /* ── Dynamic list ── */
        .pf-list-item { display: flex; align-items: center; gap: 10px; }
        .pf-list-num { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, var(--gold), var(--gold2)); color: white; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pf-list-input { flex: 1; padding: 11px 15px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 500; color: var(--text); background: var(--cream); border: 1.5px solid var(--border); border-radius: 12px; outline: none; transition: all 0.22s; }
        .pf-list-input::placeholder { color: #c4b8a8; font-weight: 400; }
        .pf-list-input:focus { border-color: var(--gold); background: white; box-shadow: 0 0 0 3px rgba(245,166,35,0.1); }
        .pf-remove-btn { width: 34px; height: 34px; border-radius: 10px; border: 1.5px solid var(--border); background: white; color: #d1b8a0; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.22s; }
        .pf-remove-btn:hover { border-color: #fca5a5; background: #fff1f2; color: #ef4444; }
        .pf-add-btn { display: flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 40px; border: 1.5px dashed var(--border); background: transparent; color: var(--muted); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.22s; }
        .pf-add-btn:hover { border-color: var(--gold); color: var(--navy); background: rgba(245,166,35,0.05); }

        /* ── Itinerary ── */
        .pf-itin-timeline { position: relative; padding-left: 32px; }
        .pf-itin-timeline::before { content: ''; position: absolute; left: 14px; top: 24px; bottom: 24px; width: 2px; background: linear-gradient(180deg, var(--gold) 0%, var(--border) 100%); }
        .pf-itin-item { position: relative; margin-bottom: 20px; }
        .pf-itin-dot { position: absolute; left: -32px; top: 20px; width: 14px; height: 14px; border-radius: 50%; background: white; border: 3px solid var(--gold); z-index: 2; transition: all 0.3s; }
        .pf-itin-item:has(.pf-itin-title:not(:placeholder-shown)) .pf-itin-dot { background: var(--gold); }
        .pf-itin-card { background: var(--cream); border: 1.5px solid var(--border); border-radius: 18px; overflow: hidden; transition: all 0.25s; }
        .pf-itin-card:focus-within { border-color: var(--gold); background: white; box-shadow: 0 4px 20px rgba(245,166,35,0.1); }
        .pf-itin-head { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border-bottom: 1px solid var(--border); }
        .pf-day-badge { background: linear-gradient(135deg, var(--navy), #1a3a7a); color: white; font-family: 'Lora', serif; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 40px; white-space: nowrap; flex-shrink: 0; }
        .pf-itin-title { flex: 1; border: none; background: transparent; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; color: var(--text); outline: none; padding: 0; }
        .pf-itin-title::placeholder { color: #c4b8a8; font-weight: 400; }
        .pf-itin-body { padding: 14px 18px; }
        .pf-itin-desc { width: 100%; border: none; background: transparent; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13.5px; color: #5a4e42; line-height: 1.75; resize: none; outline: none; min-height: 80px; }
        .pf-itin-desc::placeholder { color: #c4b8a8; }

        /* ── Buttons ── */
        .pf-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 14px; border: none;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%);
          color: var(--navy); font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 700; cursor: pointer;
          box-shadow: 0 6px 24px rgba(245,166,35,0.35);
          transition: all 0.25s;
        }
        .pf-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(245,166,35,0.4); }
        .pf-btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }

        .pf-btn-ghost {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 11px 20px; border-radius: 12px;
          border: 1.5px solid var(--border); background: white;
          color: var(--muted); font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13.5px; font-weight: 600; cursor: pointer; text-decoration: none;
          transition: all 0.22s;
        }
        .pf-btn-ghost:hover { border-color: var(--gold); color: var(--navy); background: rgba(245,166,35,0.04); }

        .pf-btn-sm {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 8px 14px; border-radius: 10px;
          border: 1.5px solid var(--border); background: white;
          color: var(--muted); font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px; font-weight: 600; cursor: pointer;
          transition: all 0.22s;
        }
        .pf-btn-sm:hover { border-color: var(--gold); color: var(--navy); }

        /* Success/error message */
        .pf-msg { display: inline-flex; align-items: center; gap: 8px; padding: 11px 18px; border-radius: 12px; font-size: 13.5px; font-weight: 600; }
        .pf-msg.success { background: #f0fdf4; border: 1.5px solid #86efac; color: #166534; }
        .pf-msg.error { background: #fff1f2; border: 1.5px solid #fca5a5; color: #991b1b; }

        /* Section divider label */
        .pf-section-badge { display: inline-flex; align-items: center; gap: 6px; background: var(--sand); border: 1px solid var(--border); border-radius: 40px; padding: 4px 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); }

        @media (max-width: 860px) {
          .pf-layout { grid-template-columns: 1fr; padding: 20px 16px; }
          .pf-sidenav { position: static; margin-right: 0; display: flex; gap: 4px; flex-wrap: wrap; }
          .pf-sidenav-title, .pf-progress-wrap { display: none; }
          .pf-nav-item { width: auto; }
          .pf-grid-2 { grid-template-columns: 1fr; }
          .pf-col-2 { grid-column: span 1; }
          .pf-header { padding: 16px 20px; }
        }
      `}</style>

      <div className="pf-wrap">
        {/* ── Header ── */}
        <header className="pf-header">
          <div className="pf-logo">
            Raj<span>Rup</span> ✈
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#8c8070", marginLeft: 10 }}>
              / Add Package
            </span>
          </div>
          <div className="pf-header-right">
            <span className="pf-badge">Admin Panel</span>
          </div>
        </header>

        <form onSubmit={submitForm}>
          <div className="pf-layout">
            {/* ── Sidebar ── */}
            <aside className="pf-sidenav">
              <div className="pf-sidenav-title">Sections</div>
              {sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`pf-nav-item${activeSection === s.id ? " active" : ""}`}
                  onClick={() => {
                    setActiveSection(s.id);
                    document.getElementById(`section-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <span className="pf-nav-icon">{s.icon}</span>
                  {s.label}
                </button>
              ))}
              <div className="pf-progress-wrap">
                <div className="pf-progress-label">
                  <span>Progress</span><span style={{ color: "#f5a623" }}>65%</span>
                </div>
                <div className="pf-progress-bar"><div className="pf-progress-fill" style={{ width: "65%" }} /></div>
              </div>
            </aside>

            {/* ── Main ── */}
            <main className="pf-main">

              {/* ─── BASIC INFO ─── */}
              <div id="section-basic" className="pf-card">
                <div className="pf-card-header">
                  <div className="pf-card-header-left">
                    <div className="pf-card-icon"><Icon.Package /></div>
                    <div>
                      <h2 className="pf-card-title">Basic Information</h2>
                      <p className="pf-card-desc">Core details about the travel package</p>
                    </div>
                  </div>
                  <span className="pf-section-badge"><Icon.Map /> Package Info</span>
                </div>
                <div className="pf-card-body">
                  <div className="pf-grid-2">
                    {/* Name */}
                    <div className="pf-field">
                      <label className="pf-label">Package Name *</label>
                      <input name="name" required placeholder="Bhutan Serenity Escape" className="pf-input" />
                    </div>
                    {/* Destination */}
                    <div className="pf-field">
                      <label className="pf-label">Destination *</label>
                      <input name="destination" required placeholder="Bhutan" className="pf-input" />
                    </div>
                    {/* Category */}
                    <div className="pf-field">
                      <label className="pf-label">Package Type</label>
                      <select name="category" defaultValue="international" className="pf-select">
                        <option value="domestic">🇮🇳 Domestic</option>
                        <option value="international">🌍 International</option>
                      </select>
                    </div>
                    {/* Price */}
                    <div className="pf-field">
                      <label className="pf-label">Price (₹) *</label>
                      <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontFamily: "'Lora',serif", fontWeight: 700, fontSize: 15, color: "#f5a623" }}>₹</span>
                        <input name="price" type="number" min="0" step="1" required placeholder="24999" className="pf-input" style={{ paddingLeft: 30 }} />
                      </div>
                    </div>

                    {/* Duration — special control */}
                    <div className="pf-field">
                      <label className="pf-label">Duration</label>
                      <div className="pf-duration-row">
                        <button type="button" className="pf-dur-btn" onClick={() => {
                          const next = Math.max(durationDays - 1, 1);
                          setDurationDays(next); syncItineraryDays(next);
                        }}>−</button>
                        <input
                          name="durationDays"
                          type="number" min="1"
                          value={durationDays}
                          onChange={(e) => {
                            const v = Math.max(Number(e.target.value || 1), 1);
                            setDurationDays(v); syncItineraryDays(v);
                          }}
                          className="pf-dur-input"
                        />
                        <button type="button" className="pf-dur-btn" onClick={() => {
                          const next = durationDays + 1;
                          setDurationDays(next); syncItineraryDays(next);
                        }}>+</button>
                      </div>
                      <p className="pf-dur-label">Days</p>
                    </div>

                    {/* Nights preview */}
                    <div className="pf-field">
                      <label className="pf-label">Duration Summary</label>
                      <div className="pf-nights-pill">
                        <div className="pf-nights-num">{durationDays}D / {nights}N</div>
                        <div style={{ fontSize: 11, color: "#8c8070", marginTop: 2, fontWeight: 500 }}>{durationDays} Days, {nights} Nights</div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="pf-field">
                      <label className="pf-label">Rating (0–5)</label>
                      <input name="rating" type="number" step="0.1" min="0" max="5" defaultValue="4.8" className="pf-input" />
                    </div>
                    {/* Reviews */}
                    <div className="pf-field">
                      <label className="pf-label">No. of Reviews</label>
                      <input name="reviews" type="number" min="0" defaultValue="176" className="pf-input" />
                    </div>

                    {/* Description */}
                    <div className="pf-field pf-col-2">
                      <label className="pf-label">Description *</label>
                      <textarea
                        name="description" required
                        placeholder="Describe the trip, highlights, hotel quality, unique experiences, and what makes this package special..."
                        className="pf-textarea"
                        rows={5}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── MEDIA ─── */}
              <div id="section-media" className="pf-card">
                <div className="pf-card-header">
                  <div className="pf-card-header-left">
                    <div className="pf-card-icon"><Icon.Image /></div>
                    <div>
                      <h2 className="pf-card-title">Media & Visibility</h2>
                      <p className="pf-card-desc">Upload images and configure display settings</p>
                    </div>
                  </div>
                </div>
                <div className="pf-card-body">
                  <div className="pf-grid-2">
                    {/* Cover image */}
                    <div className="pf-field">
                      <label className="pf-label">Cover Image *</label>
                      <div className="pf-file-area">
                        <input type="file" name="coverImage" required accept="image/*" className="pf-file-input" />
                        <div className="pf-file-icon">🌄</div>
                        <div className="pf-file-text">Click or drag cover image here</div>
                        <div className="pf-file-hint">JPG, PNG, WEBP — Max 5MB</div>
                      </div>
                    </div>
                    {/* Gallery */}
                    <div className="pf-field">
                      <label className="pf-label">Gallery Images</label>
                      <div className="pf-file-area">
                        <input type="file" name="galleryFiles" accept="image/*" multiple className="pf-file-input" />
                        <div className="pf-file-icon">🖼️</div>
                        <div className="pf-file-text">Click or drag gallery images here</div>
                        <div className="pf-file-hint">Multiple files allowed</div>
                      </div>
                    </div>

                    {/* Featured checkbox */}
                    <label className="pf-check-row pf-col-2" style={{ cursor: "pointer" }}>
                      <input name="featured" type="checkbox" value="true" style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                      <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg,rgba(245,166,35,0.12),rgba(249,115,22,0.08))", border: "1px solid rgba(245,166,35,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                        ⭐
                      </div>
                      <div className="pf-check-content">
                        <div className="pf-check-title">Mark as Featured Package</div>
                        <div className="pf-check-sub">This package will appear in the Featured section on the public homepage</div>
                      </div>
                      <div style={{ width: 24, height: 24, borderRadius: 8, border: "2px solid #e8e2d8", background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "transparent" }}>
                        <Icon.Check />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* ─── HIGHLIGHTS / INCLUSIONS / EXCLUSIONS ─── */}
              <div id="section-lists" className="pf-card">
                <div className="pf-card-header">
                  <div className="pf-card-header-left">
                    <div className="pf-card-icon"><Icon.List /></div>
                    <div>
                      <h2 className="pf-card-title">Package Details</h2>
                      <p className="pf-card-desc">Highlights, inclusions and exclusions</p>
                    </div>
                  </div>
                </div>
                <div className="pf-card-body" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  <DynList
                    emoji="📍" title="Highlights" sub="Destinations, attractions, or key experiences"
                    accentColor="#f59e0b" items={highlights}
                    onAdd={() => addListItem(setHighlights)}
                    onChange={(i, v) => updateListItem(setHighlights, i, v)}
                    onRemove={(i) => removeListItem(setHighlights, i)}
                    placeholder={(i) => `e.g. Tiger's Nest Monastery`}
                  />
                  <div style={{ borderTop: "1.5px dashed #e8e2d8" }} />
                  <DynList
                    emoji="✅" title="Inclusions" sub="What's covered in this package"
                    accentColor="#10b981" items={inclusions}
                    onAdd={() => addListItem(setInclusions)}
                    onChange={(i, v) => updateListItem(setInclusions, i, v)}
                    onRemove={(i) => removeListItem(setInclusions, i)}
                    placeholder={(i) => `e.g. 3-star hotel accommodation`}
                  />
                  <div style={{ borderTop: "1.5px dashed #e8e2d8" }} />
                  <DynList
                    emoji="❌" title="Exclusions" sub="What's not included"
                    accentColor="#ef4444" items={exclusions}
                    onAdd={() => addListItem(setExclusions)}
                    onChange={(i, v) => updateListItem(setExclusions, i, v)}
                    onRemove={(i) => removeListItem(setExclusions, i)}
                    placeholder={(i) => `e.g. Flights / Train tickets`}
                  />
                </div>
              </div>

              {/* ─── ITINERARY ─── */}
              <div id="section-itinerary" className="pf-card">
                <div className="pf-card-header">
                  <div className="pf-card-header-left">
                    <div className="pf-card-icon"><Icon.Calendar /></div>
                    <div>
                      <h2 className="pf-card-title">Day-by-Day Itinerary</h2>
                      <p className="pf-card-desc">{durationDays} days · {nights} nights — auto-synced with duration</p>
                    </div>
                  </div>
                  <button type="button" className="pf-btn-sm" onClick={() => syncItineraryDays(durationDays)}>
                    <Icon.Reset /> Reset
                  </button>
                </div>

                {/* Day tabs strip */}
                <div style={{ padding: "12px 28px", borderBottom: "1px solid #e8e2d8", display: "flex", gap: 6, flexWrap: "wrap", background: "#fffcf7" }}>
                  {itinerary.map((item, i) => (
                    <button
                      type="button"
                      key={i}
                      style={{
                        padding: "6px 14px", borderRadius: 40, border: "1.5px solid",
                        borderColor: item.title ? "#f5a623" : "#e8e2d8",
                        background: item.title ? "rgba(245,166,35,0.1)" : "white",
                        color: item.title ? "#92400e" : "#8c8070",
                        fontSize: 12, fontWeight: 700, cursor: "pointer",
                        fontFamily: "'Plus Jakarta Sans',sans-serif",
                        transition: "all 0.2s",
                      }}
                      onClick={() => document.getElementById(`itin-${i}`)?.scrollIntoView({ behavior: "smooth", block: "center" })}
                    >
                      Day {item.day}
                    </button>
                  ))}
                </div>

                <div className="pf-card-body">
                  <div className="pf-itin-timeline">
                    {itinerary.map((item, idx) => (
                      <div key={item.day} id={`itin-${idx}`} className="pf-itin-item">
                        <div className="pf-itin-dot" />
                        <div className="pf-itin-card">
                          <div className="pf-itin-head">
                            <div className="pf-day-badge">Day {item.day}</div>
                            <input
                              value={item.title}
                              onChange={(e) =>
                                setItinerary((cur) => cur.map((r, i) => i === idx ? { ...r, title: e.target.value } : r))
                              }
                              placeholder={`Day ${item.day} — enter title, e.g. Arrival in Paro`}
                              className="pf-itin-title"
                            />
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#c4b8a8", whiteSpace: "nowrap" }}>
                              {item.title ? "✏️" : ""}
                            </div>
                          </div>
                          <div className="pf-itin-body">
                            <textarea
                              value={item.description}
                              onChange={(e) =>
                                setItinerary((cur) => cur.map((r, i) => i === idx ? { ...r, description: e.target.value } : r))
                              }
                              rows={3}
                              placeholder={`Describe the day's plan, activities, meals, transfers, and highlights for Day ${item.day}...`}
                              className="pf-itin-desc"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ─── ACTION BAR ─── */}
              <div style={{
                background: "white", border: "1px solid #e8e2d8", borderRadius: 20,
                padding: "20px 28px", display: "flex", alignItems: "center",
                gap: 14, flexWrap: "wrap", boxShadow: "0 -2px 20px rgba(14,31,77,0.05)",
              }}>
                <button type="submit" disabled={isSubmitting} className="pf-btn-primary">
                  {isSubmitting
                    ? <><span style={{ display: "inline-block", width: 16, height: 16, border: "2.5px solid rgba(14,31,77,0.2)", borderTopColor: "#0e1f4d", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />Saving…</>
                    : <><Icon.Check />Save Package</>
                  }
                </button>
                <a href="/packages" className="pf-btn-ghost">
                  <Icon.Arrow />View All Packages
                </a>
                {message && (
                  <span className={`pf-msg ${message.includes("success") ? "success" : "error"}`}>
                    {message.includes("success") ? "✅" : "⚠️"} {message}
                  </span>
                )}
              </div>

            </main>
          </div>
        </form>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </>
  );
}

/* ══════════════════════════════════════
   DynList — reusable dynamic list section
══════════════════════════════════════ */
function DynList({
  emoji, title, sub, accentColor, items, onAdd, onChange, onRemove, placeholder,
}: {
  emoji: string; title: string; sub: string; accentColor: string;
  items: string[]; onAdd: () => void;
  onChange: (i: number, v: string) => void;
  onRemove: (i: number) => void;
  placeholder: (i: number) => string;
}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `${accentColor}14`, border: `1.5px solid ${accentColor}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
            {emoji}
          </div>
          <div>
            <div style={{ fontFamily: "'Lora',serif", fontWeight: 600, fontSize: 15, color: "#0e1f4d" }}>{title}</div>
            <div style={{ fontSize: 12, color: "#8c8070" }}>{sub}</div>
          </div>
        </div>
        <button type="button" className="pf-add-btn" onClick={onAdd}
          style={{ color: accentColor, borderColor: `${accentColor}40` }}>
          <span style={{ display: "flex", alignItems: "center" }}><svg width="14" height="14" viewBox="0 0 16 16"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span>
          Add item
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <div key={i} className="pf-list-item">
            <div className="pf-list-num" style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)` }}>
              {i + 1}
            </div>
            <input
              value={item}
              onChange={(e) => onChange(i, e.target.value)}
              placeholder={placeholder(i)}
              className="pf-list-input"
              style={{ "--focus-color": accentColor } as React.CSSProperties}
            />
            <button type="button" className="pf-remove-btn" onClick={() => onRemove(i)} title="Remove">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 3.5h10M5.5 3.5V2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1M6 6.5v3M8 6.5v3M3 3.5l.667 7a1 1 0 0 0 .996.917h4.674a1 1 0 0 0 .996-.917L11 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px", color: "#c4b8a8", fontSize: 13, border: "1.5px dashed #e8e2d8", borderRadius: 12 }}>
            No items yet — click "Add item" to start
          </div>
        )}
      </div>
    </div>
  );
}