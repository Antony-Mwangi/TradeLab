// app/education/technical-analysis/page.tsx
'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BarChart3,
  Brain,
  Shield,
  Target,
  Clock,
  GraduationCap,
  LineChart,
  Activity,
  Award,
  Video,
  Lightbulb,
  Rocket,
  Compass,
  X,
  Menu,
  Home,
  Info,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  MousePointer,
  Layers,
  Hash as HashIcon,
  Waves,
  Percent,
  Gauge,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Zap,
  EyeOff,
  Timer,
  Ban,
  Calendar,
} from "lucide-react";

// ============================================
// EDUCATIONAL IMAGE COMPONENT
// ============================================
function EducationalImage({
  title,
  description,
  src,
  aspect = "aspect-video",
  priority = false,
}: {
  title: string;
  description?: string;
  src: string;
  aspect?: string;
  priority?: boolean;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <figure className="my-8 group">
      <div
        className={`relative ${aspect} w-full overflow-hidden rounded-lg border border-white/[0.06] bg-zinc-950/50`}
      >
        {errored ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <Video className="h-4 w-4 text-zinc-500" />
              </div>
              <p className="text-sm font-medium text-zinc-400">{title}</p>
              <p className="mt-1 text-xs text-zinc-600 font-mono">
                {src}
              </p>
            </div>
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={title}
            loading={priority ? "eager" : "lazy"}
            onError={() => setErrored(true)}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
          />
        )}
      </div>
      <figcaption className="mt-3 flex items-start gap-2 text-xs">
        <span className="shrink-0 text-zinc-600 font-mono">Fig.</span>
        <span className="text-zinc-500">
          <span className="font-medium text-zinc-400">{title}</span>
          {description && ` — ${description}`}
        </span>
      </figcaption>
    </figure>
  );
}

// ============================================
// SECTION HEADER
// ============================================
function SectionHeader({
  number,
  title,
  icon: Icon,
}: {
  number: string;
  title: string;
  icon: any;
}) {
  return (
    <header className="mb-8 pb-5 border-b border-white/[0.06]">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-xs text-zinc-600 tracking-wider">
          SECTION {number}
        </span>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-zinc-400">
          <Icon size={19} />
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug pt-1.5">
          {title}
        </h2>
      </div>
    </header>
  );
}

// ============================================
// CALLOUT
// ============================================
function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: "info" | "tip" | "warning";
  title?: string;
  children: React.ReactNode;
}) {
  const variantMap = {
    info: {
      bg: "bg-blue-500/[0.03]",
      border: "border-blue-500/15",
      icon: Info,
      text: "text-blue-400/90",
      label: "text-blue-400",
    },
    tip: {
      bg: "bg-amber-500/[0.03]",
      border: "border-amber-500/15",
      icon: Lightbulb,
      text: "text-amber-400/90",
      label: "text-amber-400",
    },
    warning: {
      bg: "bg-red-500/[0.03]",
      border: "border-red-500/15",
      icon: AlertTriangle,
      text: "text-red-400/90",
      label: "text-red-400",
    },
  };
  const config = variantMap[variant];
  const Icon = config.icon;

  return (
    <div
      className={`my-6 rounded-lg border ${config.border} ${config.bg} p-4 flex gap-3`}
    >
      <Icon size={16} className={`${config.label} shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        {title && (
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${config.label} mb-1.5`}
          >
            {title}
          </p>
        )}
        <div className={`text-sm ${config.text} leading-relaxed`}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ============================================
// BULLET LIST
// ============================================
function BulletList({
  items,
  className = "",
}: {
  items: (string | React.ReactNode)[];
  className?: string;
}) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[9px] h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
          <span className="text-sm text-zinc-400 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ============================================
// CONCEPT CARD (for numbered assumptions)
// ============================================
function ConceptCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group rounded-lg border border-white/[0.06] bg-white/[0.01] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.02] hover:-translate-y-0.5">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-xs text-zinc-600">{number}</span>
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>
      <div className="pl-7">{children}</div>
    </div>
  );
}

// ============================================
// PATTERN CARD (for chart patterns)
// ============================================
function PatternCard({
  title,
  badge,
  badgeTone = "neutral",
  children,
}: {
  title: string;
  badge?: string;
  badgeTone?: "bullish" | "bearish" | "neutral";
  children: React.ReactNode;
}) {
  const toneMap = {
    bullish: "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-400",
    bearish: "border-red-500/20 bg-red-500/[0.06] text-red-400",
    neutral: "border-white/[0.08] bg-white/[0.03] text-zinc-400",
  };

  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {badge && (
          <span
            className={`inline-flex items-center rounded-md border ${toneMap[badgeTone]} px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider`}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ============================================
// FORMULA CARD
// ============================================
function FormulaCard({
  title,
  formula,
  note,
}: {
  title: string;
  formula: string;
  note?: string;
}) {
  return (
    <div className="my-6 rounded-lg border border-white/[0.08] bg-zinc-950 p-5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-3">
        {title}
      </p>
      <div className="rounded-md border border-white/[0.04] bg-black px-4 py-3">
        <p className="font-mono text-sm text-white">{formula}</p>
      </div>
      {note && <p className="mt-3 text-xs text-zinc-500 leading-relaxed">{note}</p>}
    </div>
  );
}

// ============================================
// DATA TABLE
// ============================================
function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.06]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/[0.06]">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 ${
                    i === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.02] ${
                  i % 2 === 1 ? "bg-white/[0.008]" : ""
                }`}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 py-3 ${
                      j === 0
                        ? "text-zinc-300 font-medium"
                        : "text-right font-mono text-zinc-400 tabular-nums"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function TechnicalAnalysisPage() {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [progress, setProgress] = useState(0);

  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "assumptions", label: "Assumptions" },
    { id: "dow-theory", label: "Dow Theory" },
    { id: "charting", label: "Charting Basics" },
    { id: "elliott-wave", label: "Elliott Wave" },
    { id: "greater-fool", label: "Greater Fool Theory" },
    { id: "price-charts", label: "Price Charts" },
    { id: "support-resistance", label: "Support & Resistance" },
    { id: "patterns", label: "Patterns" },
    { id: "gaps", label: "Gaps" },
    { id: "triangles", label: "Triangles & Flags" },
    { id: "indicators", label: "Indicators" },
    { id: "weaknesses", label: "Weaknesses" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Reading progress
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setProgress(scrolled);

      // Active section detection
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileTocOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white antialiased">
      {/* Reading progress */}
      <div
        className="fixed top-0 left-0 z-50 h-px bg-white/40 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      {/* ============================================
          TOP NAVIGATION
          ============================================ */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            {/* Left: brand + breadcrumb */}
            <div className="flex items-center gap-3 min-w-0">
              <Link href="/" className="flex items-center gap-2 shrink-0 group">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.06] border border-white/[0.08] transition-colors group-hover:bg-white/[0.1]">
                  <TrendingUp size={14} className="text-emerald-400" />
                </div>
                <span className="text-sm font-semibold tracking-tight hidden sm:inline">
                  Trade<span className="text-emerald-400">Lab</span>
                </span>
              </Link>
              <div className="h-4 w-px bg-white/[0.08] hidden sm:block" />
              <nav className="flex items-center gap-2 text-xs text-zinc-500">
                <Link
                  href="/education"
                  className="hover:text-zinc-300 transition-colors hidden sm:inline"
                >
                  Education
                </Link>
                <span className="hidden sm:inline text-zinc-700">/</span>
                <span className="text-zinc-400 font-medium truncate">
                  Technical Analysis
                </span>
              </nav>
            </div>

            {/* Right: quick actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="hidden md:inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-white/[0.12] hover:text-white"
              >
                <Home size={13} />
                Dashboard
              </Link>
              <Link
                href="/education/learning-path"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-white text-zinc-950 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-zinc-200"
              >
                <Compass size={13} />
                Learning Path
              </Link>
              <button
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="lg:hidden inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-400"
              >
                {mobileTocOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                Contents
              </button>
            </div>
          </div>
        </div>

        {/* Mobile TOC dropdown */}
        {mobileTocOpen && (
          <div className="lg:hidden border-t border-white/[0.06] bg-zinc-950/95 backdrop-blur-xl">
            <div className="max-h-[60vh] overflow-y-auto px-4 py-3">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeSection === s.id
                      ? "bg-white/[0.06] text-white font-medium"
                      : "text-zinc-400 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  <span
                    className={`h-1 w-1 rounded-full shrink-0 ${
                      activeSection === s.id ? "bg-emerald-400" : "bg-zinc-700"
                    }`}
                  />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ============================================
          HERO
          ============================================ */}
      <section className="relative border-b border-white/[0.06] overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-emerald-500/[0.05] blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-blue-500/[0.04] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl">
            {/* Back link */}
            <Link
              href="/education"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-6 group"
            >
              <ArrowLeft
                size={13}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Back to Education
            </Link>

            {/* Category */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Core Subject
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              Technical Analysis
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed">
              A complete guide to understanding how price action, chart
              patterns, and technical indicators help traders forecast market
              movements using historical data.
            </p>

            {/* Meta pills */}
            <div className="mt-7 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-400">
                <Clock size={12} className="text-zinc-500" />
                45 min read
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-400">
                <BookOpen size={12} className="text-zinc-500" />
                13 sections
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-400">
                <Award size={12} className="text-zinc-500" />
                Intermediate
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TWO-COLUMN LAYOUT
          ============================================ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
          {/* ============ STICKY TOC ============ */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 py-12">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-4">
                On This Page
              </p>
              <nav className="space-y-0.5">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] transition-all duration-150 ${
                      activeSection === s.id
                        ? "bg-white/[0.05] text-white"
                        : "text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-300"
                    }`}
                  >
                    <span
                      className={`h-px shrink-0 transition-all duration-200 ${
                        activeSection === s.id
                          ? "w-4 bg-emerald-400"
                          : "w-2 bg-zinc-700"
                      }`}
                    />
                    <span className="truncate">{s.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ============ MAIN CONTENT ============ */}
          <article className="min-w-0 py-12 lg:py-16 max-w-3xl">
            {/* ============================================
                SECTION 01 — INTRODUCTION
                ============================================ */}
            <section id="intro" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="01"
                title="What is Technical Analysis?"
                icon={LineChart}
              />
              <BulletList
                items={[
                  "Studying stock price graphs and a few momentum oscillators.",
                  "Based entirely on prices.",
                  "Do not include Balance Sheets, P&L Accounts (fundamental analysis).",
                  "The assumption being that the markets are efficient and all possible price sensitive information is built into the price graph of a security/index.",
                  "Exclusive use of historical data.",
                ]}
              />
              <EducationalImage
                title="Technical Analysis Overview"
                description="Visual illustration of technical analysis concepts"
                src="/images/education/technical-analysis-overview.png"
                priority
              />
            </section>

            {/* ============================================
                SECTION 02 — ASSUMPTIONS
                ============================================ */}
            <section id="assumptions" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="02"
                title="Assumptions of Technical Analysis"
                icon={Brain}
              />
              <div className="space-y-3">
                {[
                  {
                    num: "01",
                    title: "Market discounts everything",
                    points: [
                      "Only considers price movements, ignores fundamental factors.",
                      "Assumes stock price reflects everything.",
                      "All fundamentals are priced into the stock.",
                    ],
                  },
                  {
                    num: "02",
                    title: "Prices move in trends",
                    points: [
                      "Price movements are assumed to follow particular trend.",
                      "Most technical strategies are based on this assumption.",
                    ],
                  },
                  {
                    num: "03",
                    title: "History tends to repeat itself",
                    points: [
                      "Market participants provide consistent reaction to similar market stimuli over time.",
                    ],
                  },
                ].map((item, i) => (
                  <ConceptCard key={i} number={item.num} title={item.title}>
                    <BulletList items={item.points} />
                  </ConceptCard>
                ))}
              </div>
            </section>

            {/* ============================================
                SECTION 03 — DOW THEORY
                ============================================ */}
            <section id="dow-theory" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="03"
                title="Dow Theory"
                icon={Waves}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                The Dow theory on stock price movement is a form of technical
                analysis. The theory was derived from 255 Wall Street Journal
                editorials written by Charles H. Dow, journalist, founder and
                first editor of the Wall Street Journal and co-founder of Dow
                Jones and Company.
              </p>

              <Callout variant="info" title="Hypothesis">
                Dow Theory is based on the hypothesis that the stock market does
                not perform on a random basis. Rather, it is guided by some
                specific trends.
              </Callout>

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Three Types of Specific Trends
              </h3>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    title: "Primary Trend",
                    desc: "Primary movement or major trend may last from less than a year to several years. It can be bullish or bearish.",
                  },
                  {
                    title: "Secondary Trend",
                    desc: "Primary movement or major trend may last from less than a year to several years. It can be bullish or bearish.",
                  },
                  {
                    title: "Minor Trend",
                    desc: "Day to day trend or movements in prices over few days. It is of very short duration.",
                  },
                ].map((trend, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
                  >
                    <h4 className="text-sm font-semibold text-white mb-2">
                      {trend.title}
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {trend.desc}
                    </p>
                  </div>
                ))}
              </div>

              <EducationalImage
                title="Dow Theory Trends"
                description="Illustration of primary, secondary, and minor trends"
                src="/images/education/dow-theory-trends.png"
              />

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Basic Assumptions
              </h3>
              <BulletList
                items={[
                  "Market price determined by demand and supply forces.",
                  "Prices move in trend for long periods.",
                  "Reversal or shift in price trends may occur.",
                  "Charts and graphs can predict change in demand and supply forces.",
                  "Price patterns tend to repeat themselves.",
                ]}
              />
            </section>

            {/* ============================================
                SECTION 04 — CHARTING
                ============================================ */}
            <section id="charting" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="04"
                title="Charting: The Basic Tool"
                icon={BarChart3}
              />
              <BulletList
                items={[
                  "Motive of identifying price trends based on historical data.",
                  "Trend used to forecast future behavior.",
                  "Used for either a particular security or market in general.",
                  "Both price and volume data are studied simultaneously for both the security as well as the market.",
                ]}
              />
              <EducationalImage
                title="Charting Example"
                description="Sample chart showing price and volume analysis"
                src="/images/education/charting-example.png"
              />
            </section>

            {/* ============================================
                SECTION 05 — ELLIOTT WAVE
                ============================================ */}
            <section id="elliott-wave" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="05"
                title="Elliott Wave Theory"
                icon={Waves}
              />
              <BulletList
                items={[
                  "Developed by Ralph Nelson Elliott.",
                  "Theory states that the long term major patterns may consist of five successive steps or five waves.",
                  <>
                    Types of market:{" "}
                    <span className="text-emerald-400 font-medium">
                      Bull market
                    </span>{" "}
                    and{" "}
                    <span className="text-red-400 font-medium">
                      Bear market
                    </span>
                    .
                  </>,
                ]}
              />

              <div className="mt-8 space-y-8">
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-emerald-400">
                    Elliott Wave Theory in Bull Market
                  </h4>
                  <EducationalImage
                    title="Bull Market Elliott Wave"
                    description="5-wave bullish pattern illustration"
                    src="/images/education/elliott-wave-bull.png"
                  />
                </div>
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-red-400">
                    Elliott Wave Theory in Bear Market
                  </h4>
                  <EducationalImage
                    title="Bear Market Elliott Wave"
                    description="5-wave bearish pattern illustration"
                    src="/images/education/elliott-wave-bear.png"
                  />
                </div>
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-white">
                    Real Life Example
                  </h4>
                  <EducationalImage
                    title="Real Life Elliott Wave Example"
                    description="Actual chart showing Elliott Wave pattern"
                    src="/images/education/elliott-wave-reallife.png"
                  />
                </div>
              </div>
            </section>

            {/* ============================================
                SECTION 06 — GREATER FOOL THEORY
                ============================================ */}
            <section id="greater-fool" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="06"
                title="Greater Fool Theory"
                icon={Lightbulb}
              />
              <Callout variant="tip">
                The belief that we can always buy investments at any given
                price, setting aside valuations, and eventually turning them
                into a profit because there will always be a "Greater Fool"
                willing to pay the higher price.
              </Callout>
              <EducationalImage
                title="Greater Fool Theory"
                description="Conceptual diagram of the greater fool theory"
                src="/images/education/greater-fool-theory.png"
              />
            </section>

            {/* ============================================
                SECTION 07 — PRICE CHARTS
                ============================================ */}
            <section id="price-charts" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="07"
                title="Price Charts"
                icon={Activity}
              />

              <h3 className="mt-4 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Key Price Points
              </h3>
              <div className="mb-10 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  "Opening Price",
                  "High Price",
                  "Low Price",
                  "Closing Price",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-md border border-white/[0.06] bg-white/[0.01] px-3 py-2.5 text-center"
                  >
                    <p className="text-xs font-medium text-zinc-300">{item}</p>
                  </div>
                ))}
              </div>

              {/* Bar Charts */}
              <PatternCard title="Bar Charts">
                <BulletList
                  items={[
                    "This is a popular technique of showing the price variation and volume on a particular day.",
                    "The chart is made up of a series of vertical lines that represent each data point.",
                    "This vertical line represents the high and low for the trading period, along with the closing price.",
                    "The close and open are represented on the vertical line by a horizontal dash.",
                  ]}
                />
                <EducationalImage
                  title="Bar Chart Example"
                  description="Sample bar chart showing OHLC data"
                  src="/images/education/bar-chart.png"
                />
              </PatternCard>

              <div className="h-3" />

              {/* Line Chart */}
              <PatternCard title="Line Chart">
                <BulletList
                  items={[
                    "Line chart represents any variable over a set period of time.",
                    "The line is formed by connecting value of represented variable over the time frame.",
                    "Line charts do not provide visual information of the trading range for the individual points such as the high, low and opening prices and closing price.",
                    "They depict any variable like volume of a security, index number, price etc.",
                  ]}
                />
                <EducationalImage
                  title="Line Chart Example"
                  description="Sample line chart showing price over time"
                  src="/images/education/line-chart.png"
                />
              </PatternCard>

              <div className="h-3" />

              {/* Point and Figure */}
              <PatternCard title="Point and Figure Chart">
                <BulletList
                  items={[
                    "The point and figure chart is not well known or used by the average investor but it has had a long history of use dating back to the first technical traders.",
                    "This type of chart reflects price movements and is not as concerned about time and volume in the formulation of the points.",
                    "In order to prepare this type of graph, the analyst has to decide as to what is a significant price change.",
                    <>
                      It uses a chart with "X"s and "O"s for predicting
                      financial asset prices. The "X"s are used to indicate
                      rising prices and "O"s to indicate falling prices.
                    </>,
                  ]}
                />
                <EducationalImage
                  title="Point and Figure Chart Example"
                  description="Sample P&F chart with X and O columns"
                  src="/images/education/point-figure-chart.png"
                />
              </PatternCard>

              <div className="h-3" />

              {/* Candlestick Chart */}
              <PatternCard title="Candlestick Chart">
                <BulletList
                  items={[
                    "Similar to the bar chart, the candlestick also has a thin vertical line showing the period's trading range.",
                    "Candlesticks rely heavily on the use of colors to explain what has happened during the trading period. There are two color constructs for days up and one for days that the price falls.",
                    "When the price of the stock is up and closes above the opening trade, the candlestick will usually be white or clear. If the stock has traded down for the period, then the candlestick will usually be red or black.",
                    "If the stock's price has closed above the previous day's close but below the day's open, the candlestick will be black or filled with the color that is used to indicate an up day.",
                  ]}
                />
                <EducationalImage
                  title="Candlestick Chart Example"
                  description="Sample candlestick chart with bullish and bearish candles"
                  src="/images/education/candlestick-chart.png"
                />

                <h4 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  Example Data Table
                </h4>
                <DataTable
                  headers={["Date", "Open", "High", "Low", "Close"]}
                  rows={[
                    ["22 March, 2016", "196.8", "198.25", "194.5", "197.5"],
                    ["23 March, 2016", "196.9", "197.6", "195.3", "196.6"],
                    ["24 March, 2016", "196.6", "196.6", "196.6", "196.6"],
                    ["25 March, 2016", "196.6", "196.6", "196.6", "196.6"],
                    ["28 March, 2016", "195.8", "198.25", "187.65", "188.3"],
                    ["29 March, 2016", "188.5", "191.25", "186.65", "189.5"],
                    ["30 March, 2016", "192.25", "198.3", "190.5", "197.55"],
                    ["31 March, 2016", "197.85", "198.75", "192.35", "194.25"],
                    ["1 April, 2016", "193.7", "197.25", "192", "195.65"],
                  ]}
                />
              </PatternCard>
            </section>

            {/* ============================================
                SECTION 08 — SUPPORT & RESISTANCE
                ============================================ */}
            <section id="support-resistance" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="08"
                title="Support and Resistance Levels"
                icon={Target}
              />

              <div className="grid gap-3 lg:grid-cols-2 mb-8">
                <div className="rounded-lg border border-emerald-500/15 bg-emerald-500/[0.02] p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                    <h3 className="text-sm font-semibold text-emerald-400">
                      Support
                    </h3>
                  </div>
                  <BulletList
                    items={[
                      "Support is the price level at which demand is thought to be strong enough to prevent the price from declining further.",
                      "The logic dictates that as the price declines towards support and gets cheaper, buyers become more inclined to buy and sellers become less inclined to sell.",
                    ]}
                  />
                </div>

                <div className="rounded-lg border border-red-500/15 bg-red-500/[0.02] p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <ArrowDownRight className="h-4 w-4 text-red-400" />
                    <h3 className="text-sm font-semibold text-red-400">
                      Resistance
                    </h3>
                  </div>
                  <BulletList
                    items={[
                      "Resistance is the price level at which selling is thought to be strong enough to prevent the price from rising further.",
                      "The logic dictates that as the price advances towards resistance, sellers become more inclined to sell and buyers become less inclined to buy.",
                    ]}
                  />
                </div>
              </div>

              <EducationalImage
                title="Support and Resistance Diagram"
                description="Chart showing support and resistance levels with price bouncing between them"
                src="/images/education/support-resistance.png"
              />
            </section>

            {/* ============================================
                SECTION 09 — PATTERNS
                ============================================ */}
            <section id="patterns" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="09"
                title="Reversal & Continuation Patterns"
                icon={Activity}
              />

              <div className="grid gap-3 sm:grid-cols-2 mb-10">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-5">
                  <h3 className="text-sm font-semibold text-purple-400 mb-3">
                    Reversal Patterns
                  </h3>
                  <BulletList
                    items={[
                      "Indicate a reversal of existing trend.",
                      "Can further be classified as bullish patterns or bearish patterns.",
                    ]}
                  />
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-5">
                  <h3 className="text-sm font-semibold text-blue-400 mb-3">
                    Continuation Patterns
                  </h3>
                  <BulletList
                    items={[
                      "Suggest that there is only a pause in the market.",
                      "The old trend will continue again after the pause.",
                    ]}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <PatternCard title="Head and Shoulders" badge="Bearish" badgeTone="bearish">
                  <BulletList
                    items={[
                      "The head-and-shoulders top signals to chart users that a security's price is likely to make a downward move, especially after it breaks below the neckline of the pattern.",
                      "Due to this pattern forming mostly at the peaks of upward trends, it is considered to be a trend-reversal pattern, as the security heads down after the pattern's completion.",
                    ]}
                  />
                  <EducationalImage
                    title="Head and Shoulders Pattern"
                    description="Illustration of head and shoulders reversal pattern"
                    src="/images/education/head-shoulders.png"
                  />
                </PatternCard>

                <PatternCard
                  title="Inverted Head and Shoulder"
                  badge="Bullish"
                  badgeTone="bullish"
                >
                  <BulletList
                    items={[
                      "The inverted head-and-shoulders pattern is the exact opposite of the head-and-shoulders top, as it signals that the security is set to make an upward move.",
                      "Often coming at the end of a downtrend, the inverse head and shoulders is considered to be a reversal pattern, as the security typically heads higher after the completion of the pattern.",
                    ]}
                  />
                  <EducationalImage
                    title="Inverted Head and Shoulders Pattern"
                    description="Illustration of inverted head and shoulders pattern"
                    src="/images/education/inverted-head-shoulders.png"
                  />
                </PatternCard>

                <PatternCard title="Double Tops and Bottoms">
                  <BulletList
                    items={[
                      "These two reversal patterns illustrate a security's attempt to continue an existing trend.",
                      "Upon several attempts to move higher, the trend is reversed and a new trend begins.",
                      <>
                        These chart patterns formed will often resemble what looks
                        like a "W" (for a double bottom) or an "M" (double top).
                      </>,
                    ]}
                  />

                  <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    <div>
                      <h4 className="mb-3 text-sm font-semibold text-red-400">
                        Double Top
                      </h4>
                      <BulletList
                        items={[
                          "Found at the peaks of an upward trend and is a clear signal that the preceding upward trend is weakening.",
                          "Buyers are losing interest.",
                          "Upon completion of this pattern, the trend is considered to be reversed and the security is expected to move lower.",
                        ]}
                      />
                      <EducationalImage
                        title="Double Top Pattern"
                        description="M-shaped double top pattern"
                        src="/images/education/double-top.png"
                      />
                    </div>

                    <div>
                      <h4 className="mb-3 text-sm font-semibold text-emerald-400">
                        Double Bottom
                      </h4>
                      <BulletList
                        items={[
                          "A double bottom appears when a share hits a low, comes higher, again pulls back.",
                          "Appears at the end of a bearish trend and indicates the start of the bullish trend.",
                        ]}
                      />
                      <EducationalImage
                        title="Double Bottom Pattern"
                        description="W-shaped double bottom pattern"
                        src="/images/education/double-bottom.png"
                      />
                    </div>
                  </div>

                  <div className="mt-6 rounded-md border border-white/[0.06] bg-zinc-950 px-4 py-3">
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      <span className="font-semibold text-zinc-300">
                        Key Phases:
                      </span>{" "}
                      Price Trend → First Trough → Peak → Second Trough →
                      Advance From Trough → Resistance Break → Resistance
                      Turned Support → Price Target.
                    </p>
                  </div>
                </PatternCard>

                <PatternCard title="Rounding Bottom" badge="Bullish" badgeTone="bullish">
                  <BulletList
                    items={[
                      "The Rounding Bottom is a long-term reversal pattern that is best suited for weekly charts.",
                      "It is also referred to as a saucer bottom, and represents a long consolidation period that turns from a bearish bias to a bullish bias.",
                    ]}
                  />
                  <EducationalImage
                    title="Rounding Bottom Pattern"
                    description="Saucer-shaped rounding bottom chart"
                    src="/images/education/rounding-bottom.png"
                  />
                </PatternCard>

                <PatternCard title="The Cup and the Handle" badge="Bullish" badgeTone="bullish">
                  <BulletList
                    items={[
                      "The Cup with Handle is a bullish continuation pattern that marks a consolidation period followed by a breakout.",
                      "As its name implies, there are two parts to the pattern: the cup and the handle.",
                      "The cup forms after an advance and looks like a bowl or rounding bottom.",
                      "As the cup is completed, a trading range develops on the right hand side and the handle is formed.",
                      "A subsequent breakout from the handle's trading range signals a continuation of the prior advance.",
                    ]}
                  />
                  <EducationalImage
                    title="Cup and Handle Pattern"
                    description="Classic cup and handle formation"
                    src="/images/education/cup-handle.png"
                  />

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Procter and Gamble Stock Chart
                      </h4>
                      <EducationalImage
                        title="Procter and Gamble Stock Chart"
                        description="Real example chart"
                        aspect="aspect-square"
                        src="/images/education/pg-stock-chart.png"
                      />
                    </div>
                    <div>
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Amazon Stock Price Chart
                      </h4>
                      <EducationalImage
                        title="Amazon Stock Price Chart"
                        description="Real example chart"
                        aspect="aspect-square"
                        src="/images/education/amazon-stock-chart.png"
                      />
                    </div>
                  </div>
                </PatternCard>
              </div>
            </section>

            {/* ============================================
                SECTION 10 — GAPS
                ============================================ */}
            <section id="gaps" className="scroll-mt-24 mb-20">
              <SectionHeader number="10" title="Gaps" icon={Activity} />

              <PatternCard title="Understanding Gaps">
                <BulletList
                  items={[
                    "Gaps occur when a price opens much higher (gap higher) or lower (gap lower) than the previous day's close.",
                    "Once a gap occurs, the new price represents an important price level. Gaps higher create support that should allow the stock to move higher and gaps lower create resistance that should pressure the stock lower.",
                    "Until the gap is violated, we should assume the trend will continue in the gap's direction.",
                  ]}
                />
                <EducationalImage
                  title="Gaps Diagram"
                  description="Chart showing gap up and gap down examples"
                  src="/images/education/gaps-diagram.png"
                />
              </PatternCard>

              <div className="h-3" />

              <PatternCard title="Breakaway Gaps" badge="Breakout" badgeTone="bullish">
                <BulletList
                  items={[
                    "They occur when the price action is breaking out of their trading range or congestion area.",
                    "A congestion area is just a price range in which the market has traded for some period of time, usually a few weeks or so.",
                    "To break out of these areas requires market enthusiasm and, either, many more buyers than sellers for upside breakouts or more sellers than buyers for downside breakouts.",
                  ]}
                />
                <EducationalImage
                  title="Breakaway Gaps Diagram"
                  description="Chart showing breakout from congestion"
                  src="/images/education/breakaway-gaps.png"
                />
              </PatternCard>

              <div className="h-3" />

              <PatternCard title="Runaway Gaps" badge="Mid-trend" badgeTone="neutral">
                <BulletList
                  items={[
                    "Runaway gaps are also called measuring gaps, and are best described as gaps that are caused by increased interest in the stock.",
                    "For runaway gaps to the upside, it usually represents traders who did not get in during the initial move of the up trend and while waiting for a retracement in price, decided it was not going to happen.",
                    "Increased buying interest happens all of a sudden, and the price gaps above the previous day's close. This type of runaway gap represents an almost panic state in traders.",
                  ]}
                />
                <EducationalImage
                  title="Runaway Gaps Diagram"
                  description="Chart showing mid-trend runaway gap"
                  src="/images/education/runaway-gaps.png"
                />
              </PatternCard>

              <div className="h-3" />

              <PatternCard title="Exhaustion Gaps" badge="Trend End" badgeTone="bearish">
                <BulletList
                  items={[
                    "Exhaustion gaps are those that happen near the end of a good up- or downtrend. They are many times the first signal of the end of that move.",
                    "They are identified by high volume and large price difference between the previous day's close and the new opening price.",
                    "They can easily be mistaken for runaway gaps if one does not notice the exceptionally high volume.",
                  ]}
                />
                <EducationalImage
                  title="Exhaustion Gaps Diagram"
                  description="Chart showing exhaustion gap at trend end"
                  src="/images/education/exhaustion-gaps.png"
                />
              </PatternCard>
            </section>

            {/* ============================================
                SECTION 11 — TRIANGLES AND FLAGS
                ============================================ */}
            <section id="triangles" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="11"
                title="Triangles and Flags"
                icon={Activity}
              />

              <PatternCard title="Triangles">
                <BulletList
                  items={[
                    "A triangle is formed when each succeeding peak is lower than the previous peak.",
                    "Or each succeeding bottom is higher than the previous bottom.",
                    "The series of peaks and bottoms are joined by a line which converges and form a shape of triangle.",
                  ]}
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      title: "Symmetric Triangle",
                      badge: "Neutral",
                      tone: "neutral" as const,
                      src: "/images/education/symmetric-triangle.png",
                      desc: "Converging trendlines",
                    },
                    {
                      title: "Ascending Triangle",
                      badge: "Bullish",
                      tone: "bullish" as const,
                      src: "/images/education/ascending-triangle.png",
                      desc: "Bullish triangle with flat top",
                    },
                    {
                      title: "Descending Triangle",
                      badge: "Bearish",
                      tone: "bearish" as const,
                      src: "/images/education/descending-triangle.png",
                      desc: "Bearish triangle with flat bottom",
                    },
                  ].map((t, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-semibold text-white">
                          {t.title}
                        </h4>
                        <span
                          className={`rounded-md border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                            t.tone === "bullish"
                              ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-400"
                              : t.tone === "bearish"
                              ? "border-red-500/20 bg-red-500/[0.06] text-red-400"
                              : "border-white/[0.08] bg-white/[0.03] text-zinc-400"
                          }`}
                        >
                          {t.badge}
                        </span>
                      </div>
                      <EducationalImage
                        title={t.title}
                        description={t.desc}
                        aspect="aspect-square"
                        src={t.src}
                      />
                    </div>
                  ))}
                </div>
              </PatternCard>

              <div className="h-3" />

              <PatternCard title="Flags">
                <BulletList
                  items={[
                    "A flag pattern appears when a bull rally or a bear phase is interrupted by a consolidation pattern appearing as a rectangle or a parallelogram.",
                    "As the flag formation indicates a pause before continuation of earlier trend, the prices move in the same direction after the flag as before.",
                  ]}
                />
                <h4 className="mt-6 mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Parallelogram Flag
                </h4>
                <EducationalImage
                  title="Parallelogram Flag Pattern"
                  description="Flag formation during trend"
                  src="/images/education/parallelogram-flag.png"
                />
              </PatternCard>
            </section>

            {/* ============================================
                SECTION 12 — INDICATORS
                ============================================ */}
            <section id="indicators" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="12"
                title="Indicator Analysis"
                icon={Gauge}
              />

              <div className="mb-6">
                <BulletList
                  items={[
                    "It's a mathematical examination of price and volume information over a given period.",
                    "Objective: To predict where and in which direction the price may move in near future.",
                    "Attempts to establish a mathematical relationship of current price past prices.",
                  ]}
                />
              </div>

              <PatternCard title="Moving Averages">
                <BulletList
                  items={[
                    "It refers to average level of closing prices, calculated on regular basis.",
                    "A sequence of averages is calculated by calculating averages on daily basis.",
                  ]}
                />
                <EducationalImage
                  title="Moving Average Example"
                  description="Chart showing moving average line over price"
                  src="/images/education/moving-average.png"
                />
              </PatternCard>

              <div className="h-3" />

              <PatternCard title="Relative Strength Index (RSI)">
                <BulletList
                  items={[
                    "Developed by J. Welles Wilder, the Relative Strength Index (RSI) is a momentum oscillator that measures the speed and change of price movements.",
                  ]}
                />

                <FormulaCard
                  title="RSI Formula"
                  formula="RSI = 100 - 100 / (1 + RS)"
                  note="Where RS = average of x days' up closes / average of x days' down closes."
                />

                <EducationalImage
                  title="RSI Example Chart"
                  description="Chart showing RSI indicator below price"
                  src="/images/education/rsi-chart.png"
                />
              </PatternCard>

              <div className="h-3" />

              <PatternCard title="Crossover">
                <BulletList
                  items={[
                    "Crossover is the point on a stock chart when a security and an indicator intersect.",
                    "Crossovers are used by technical analysts to aid in forecasting the future movements in the price of a stock.",
                  ]}
                />
                <EducationalImage
                  title="Crossover Example"
                  description="Chart showing crossover point between price and indicator"
                  src="/images/education/crossover.png"
                />
              </PatternCard>
            </section>

            {/* ============================================
                SECTION 13 — WEAKNESSES
                ============================================ */}
            <section id="weaknesses" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="13"
                title="Weaknesses of Technical Analysis"
                icon={AlertTriangle}
              />

              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  {
                    icon: Award,
                    title: "Experience",
                    desc: "Careful identification and interpretation of pattern requires a lot of experience.",
                  },
                  {
                    icon: EyeOff,
                    title: "Biasness",
                    desc: "Must be free from biasness of technical analyst.",
                  },
                  {
                    icon: Zap,
                    title: "Quickness in Identification",
                    desc: "The technical analyst must be a quick identifier of the pattern.",
                  },
                  {
                    icon: Timer,
                    title: "Long Term Perspective",
                    desc: "Emphasis in the technical analysis should always be on the long term pattern.",
                  },
                  {
                    icon: Ban,
                    title: "Not Suitable for New Listings",
                    desc: "Cannot be applied to new securities without historical data.",
                  },
                  {
                    icon: AlertTriangle,
                    title: "Cannot Forecast New Phenomenon",
                    desc: "Cannot forecast unforeseen events like the 2008 financial crisis.",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <Icon size={14} className="text-zinc-500 shrink-0" />
                        <h4 className="text-sm font-semibold text-zinc-200">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed pl-[22px]">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ============================================
                CONTINUE LEARNING
                ============================================ */}
            <section className="mt-24 border-t border-white/[0.06] pt-12">
              <div className="mb-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-2">
                  Next Step
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Continue Learning
                </h2>
                <p className="mt-2 text-sm text-zinc-400 max-w-lg">
                  You've covered the fundamentals of technical analysis. Next,
                  explore fundamental analysis to understand how economic
                  events drive currency prices.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/education/fundamental-analysis"
                  className="group rounded-lg border border-white/[0.06] bg-white/[0.01] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.02] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] text-amber-400">
                      <BarChart3 size={16} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      Primary
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    Fundamental Analysis
                  </h3>
                  <p className="text-xs text-zinc-500 mb-4">
                    Next recommended topic
                  </p>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Continue</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>

                <Link
                  href="/education/risk-management"
                  className="group rounded-lg border border-white/[0.06] bg-white/[0.01] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.02] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] text-purple-400">
                      <Shield size={16} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400">
                      Secondary
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    Risk Management
                  </h3>
                  <p className="text-xs text-zinc-500 mb-4">
                    Essential for live trading
                  </p>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Continue</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </div>
            </section>

            {/* ============================================
                FOOTER
                ============================================ */}
            <div className="mt-20 pt-8 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-600">
              <Link
                href="/education"
                className="inline-flex items-center gap-1.5 hover:text-zinc-400 transition-colors group"
              >
                <ArrowLeft
                  size={13}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
                All Subjects
              </Link>
              <span className="font-mono">TradeLab · Education</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}