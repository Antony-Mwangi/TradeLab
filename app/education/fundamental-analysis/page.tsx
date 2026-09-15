// app/education/fundamental-analysis/page.tsx
'use client';

import { useState, useEffect } from "react";
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
  TrendingDown,
  Zap,
  Eye,
  Globe,
  Coins,
  Landmark,
  Building2,
  Users,
  Briefcase,
  Factory,
  ShoppingCart,
  Ship,
  DollarSign,
  Flame,
  Droplet,
  CloudLightning,
  Siren,
  Biohazard,
  Scale,
  Handshake,
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
              <p className="mt-1 text-xs text-zinc-600 font-mono">{src}</p>
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
  variant?: "info" | "tip" | "warning" | "key" | "remember" | "but";
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
      labelText: title || "Information",
    },
    tip: {
      bg: "bg-amber-500/[0.03]",
      border: "border-amber-500/15",
      icon: Lightbulb,
      text: "text-amber-400/90",
      label: "text-amber-400",
      labelText: title || "Tip",
    },
    warning: {
      bg: "bg-red-500/[0.03]",
      border: "border-red-500/15",
      icon: AlertTriangle,
      text: "text-red-400/90",
      label: "text-red-400",
      labelText: title || "Warning",
    },
    key: {
      bg: "bg-emerald-500/[0.03]",
      border: "border-emerald-500/15",
      icon: Target,
      text: "text-emerald-400/90",
      label: "text-emerald-400",
      labelText: title || "Key Idea",
    },
    remember: {
      bg: "bg-purple-500/[0.03]",
      border: "border-purple-500/15",
      icon: Brain,
      text: "text-purple-400/90",
      label: "text-purple-400",
      labelText: title || "Remember",
    },
    but: {
      bg: "bg-orange-500/[0.03]",
      border: "border-orange-500/15",
      icon: AlertTriangle,
      text: "text-orange-400/90",
      label: "text-orange-400",
      labelText: title || "BUT",
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
        <p
          className={`text-xs font-semibold uppercase tracking-wider ${config.label} mb-1.5`}
        >
          {config.labelText}
        </p>
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
// CONCEPT CARD (numbered)
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
// DATA CARD (economic indicator)
// ============================================
function DataCard({
  name,
  fullName,
  badge,
  badgeTone = "neutral",
  children,
}: {
  name: string;
  fullName: string;
  badge?: string;
  badgeTone?: "bullish" | "bearish" | "neutral" | "info";
  children: React.ReactNode;
}) {
  const toneMap = {
    bullish: "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-400",
    bearish: "border-red-500/20 bg-red-500/[0.06] text-red-400",
    neutral: "border-white/[0.08] bg-white/[0.03] text-zinc-400",
    info: "border-blue-500/20 bg-blue-500/[0.06] text-blue-400",
  };

  return (
    <div className="my-6 rounded-lg border border-white/[0.06] bg-white/[0.01] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.01]">
        <div className="flex items-baseline gap-3 min-w-0">
          <h3 className="text-base font-semibold text-white">{name}</h3>
          <span className="text-xs text-zinc-500 truncate">— {fullName}</span>
        </div>
        {badge && (
          <span
            className={`inline-flex items-center rounded-md border ${toneMap[badgeTone]} px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider shrink-0`}
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
// FLOW DIAGRAM
// ============================================
function FlowDiagram({
  title,
  steps,
  accent = "neutral",
}: {
  title?: string;
  steps: { label: string; note?: string; tone?: "up" | "down" | "neutral" }[];
  accent?: "neutral" | "bullish" | "bearish";
}) {
  const toneColor = (tone?: string) => {
    if (tone === "up") return "text-emerald-400 border-emerald-500/20 bg-emerald-500/[0.04]";
    if (tone === "down") return "text-red-400 border-red-500/20 bg-red-500/[0.04]";
    return "text-zinc-300 border-white/[0.08] bg-white/[0.02]";
  };

  const arrowColor =
    accent === "bullish"
      ? "text-emerald-500/50"
      : accent === "bearish"
      ? "text-red-500/50"
      : "text-zinc-700";

  return (
    <div className="my-8 rounded-lg border border-white/[0.06] bg-zinc-950/40 p-5 sm:p-6">
      {title && (
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-5">
          {title}
        </p>
      )}
      <div className="flex flex-col items-stretch gap-2">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-stretch">
            <div
              className={`rounded-md border px-4 py-2.5 text-center ${toneColor(step.tone)}`}
            >
              <p className="text-sm font-medium leading-snug">{step.label}</p>
              {step.note && (
                <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                  {step.note}
                </p>
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1.5">
                <ArrowDownRight
                  size={14}
                  className={`${arrowColor} rotate-45`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// FORMULA / HIGHLIGHT CARD
// ============================================
function HighlightCard({
  label,
  children,
  accent = "neutral",
}: {
  label: string;
  children: React.ReactNode;
  accent?: "neutral" | "emerald" | "red" | "blue" | "amber" | "gold";
}) {
  const accentMap = {
    neutral: "border-white/[0.08] bg-zinc-950",
    emerald: "border-emerald-500/20 bg-emerald-500/[0.03]",
    red: "border-red-500/20 bg-red-500/[0.03]",
    blue: "border-blue-500/20 bg-blue-500/[0.03]",
    amber: "border-amber-500/20 bg-amber-500/[0.03]",
    gold: "border-amber-500/25 bg-amber-500/[0.04]",
  };

  const labelColor =
    accent === "emerald"
      ? "text-emerald-400"
      : accent === "red"
      ? "text-red-400"
      : accent === "blue"
      ? "text-blue-400"
      : accent === "amber"
      ? "text-amber-400"
      : accent === "gold"
      ? "text-amber-400"
      : "text-zinc-500";

  return (
    <div className={`my-6 rounded-lg border ${accentMap[accent]} p-5`}>
      <p
        className={`text-[10px] font-semibold uppercase tracking-wider ${labelColor} mb-3`}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

// ============================================
// COMPARISON TABLE
// ============================================
function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-white/[0.06]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/[0.06]">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500"
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
                    className={`px-4 py-3 align-top ${
                      j === 0
                        ? "text-zinc-200 font-medium"
                        : "text-zinc-400"
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
export default function FundamentalAnalysisPage() {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [progress, setProgress] = useState(0);

  const sections = [
    { id: "intro", label: "What Is Fundamental Analysis?" },
    { id: "gdp", label: "Economic Growth & GDP" },
    { id: "inflation", label: "Inflation" },
    { id: "employment", label: "Employment Data" },
    { id: "interest-rates", label: "Interest Rates" },
    { id: "central-banks", label: "Central Banks" },
    { id: "fiscal-policy", label: "Government & Fiscal Policy" },
    { id: "consumer", label: "Retail Sales & Consumer" },
    { id: "pmi", label: "Manufacturing & Services" },
    { id: "trade", label: "Trade Balance & Current Account" },
    { id: "commodities", label: "Commodity Currencies" },
    { id: "calendar", label: "Economic Calendar & Expectations" },
    { id: "currencies", label: "Currency-Specific Fundamentals" },
    { id: "safe-havens", label: "Safe Havens & Risk Sentiment" },
    { id: "crises", label: "Global Crises & Reactions" },
    { id: "gold", label: "XAU/USD — Gold" },
    { id: "bias", label: "Building a Fundamental Bias" },
    { id: "limitations", label: "Limitations" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setProgress(scrolled);

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

      {/* TOP NAV */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
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
                  Fundamental Analysis
                </span>
              </nav>
            </div>

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
                {mobileTocOpen ? (
                  <ChevronUp size={13} />
                ) : (
                  <ChevronDown size={13} />
                )}
                Contents
              </button>
            </div>
          </div>
        </div>

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

      {/* HERO */}
      <section className="relative border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-emerald-500/[0.05] blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-blue-500/[0.04] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
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

              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Core Subject
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
                Fundamental Analysis
              </h1>

              <p className="mt-5 max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed">
                Understand the economic forces, monetary policies, market
                expectations and global events that drive currencies,
                commodities and financial markets.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-400">
                  <Clock size={12} className="text-zinc-500" />
                  45–60 min read
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-400">
                  <BookOpen size={12} className="text-zinc-500" />
                  18 sections
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-400">
                  <Award size={12} className="text-zinc-500" />
                  Intermediate → Advanced
                </span>
              </div>
            </div>

            {/* Hero flow diagram */}
            <div className="hidden lg:block">
              <div className="w-64 rounded-lg border border-white/[0.06] bg-white/[0.01] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-4">
                  The Fundamental Chain
                </p>
                <div className="space-y-2">
                  {[
                    "Economic Data",
                    "Central Bank",
                    "Yields",
                    "Currency",
                    "Markets",
                  ].map((label, i) => (
                    <div key={i}>
                      <div className="rounded-md border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-center">
                        <p className="text-[11px] text-zinc-400 font-medium">
                          {label}
                        </p>
                      </div>
                      {i < 4 && (
                        <div className="flex justify-center py-1">
                          <ArrowDownRight
                            size={12}
                            className="text-zinc-700 rotate-45"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN LAYOUT */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 py-12 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-4">
                On This Page
              </p>
              <nav className="space-y-0.5">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`flex w-full items-center gap-2.5 rounded-md px-3 py-1.5 text-left text-[13px] transition-all duration-150 ${
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

          {/* MAIN CONTENT */}
          <article className="min-w-0 py-12 lg:py-16 max-w-3xl">
            {/* ============================================
                SECTION 01 — WHAT IS FUNDAMENTAL ANALYSIS?
                ============================================ */}
            <section id="intro" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="01"
                title="What Is Fundamental Analysis?"
                icon={Globe}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Fundamental analysis is the study of the economic forces that
                drive currency values. Instead of studying price charts alone,
                fundamental analysis asks: what is happening in an economy, why
                is it happening, how might policymakers respond, and why could
                financial markets care?
              </p>

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                A currency is not just a number on a screen. It is the price of
                one economy relative to another. Behind every price movement
                there is data, expectations, policy, capital flows, and risk
                sentiment working together.
              </p>

              <Callout variant="key" title="Key Idea">
                Markets do not trade the number. Markets trade the difference
                between what was expected and what actually happened — and how
                that difference might change future policy.
              </Callout>

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                The Fundamental Chain
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Every fundamental analysis — from a single economic release to
                a global crisis — flows through the same logical sequence:
              </p>

              <FlowDiagram
                title="Data Flows Through the Financial System"
                accent="bullish"
                steps={[
                  { label: "Economic Data", note: "What happened in the economy", tone: "neutral" },
                  { label: "Market Expectations", note: "What the market anticipated", tone: "neutral" },
                  { label: "Central Bank Reaction", note: "How policy may respond", tone: "neutral" },
                  { label: "Interest Rate Expectations", note: "Future policy pricing", tone: "up" },
                  { label: "Bond Yields", note: "Return on government debt", tone: "up" },
                  { label: "Capital Flows", note: "Where money moves", tone: "up" },
                  { label: "Currency Demand", note: "Relative attractiveness", tone: "up" },
                  { label: "Asset Prices", note: "Broader market repricing", tone: "up" },
                ]}
              />

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                A Working Example
              </h3>

              <FlowDiagram
                title="Inflation Surprise"
                accent="bullish"
                steps={[
                  { label: "Higher Inflation", tone: "up" },
                  { label: "Central Bank May Maintain / Tighten Policy", tone: "neutral" },
                  { label: "Markets Price Higher Future Rates", tone: "up" },
                  { label: "Bond Yields May Rise", tone: "up" },
                  { label: "Currency May Become More Attractive", tone: "up" },
                  { label: "Currency Demand Can Increase", tone: "up" },
                ]}
              />

              <Callout variant="but" title="BUT — This Is Not Automatic">
                This chain is a teaching framework, not a guaranteed outcome.
                Markets trade expectations, not just the published number. And
                price has often already adjusted before the data was released.
                The reaction always depends on how the actual data compares to
                the market's expectations.
              </Callout>

              <EducationalImage
                title="Fundamental Analysis Overview"
                description="Visual illustration of the fundamental analysis framework"
                src="/images/education/fundamental-analysis-overview.png"
                priority
              />
            </section>

            {/* ============================================
                SECTION 02 — ECONOMIC GROWTH & GDP
                ============================================ */}
            <section id="gdp" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="02"
                title="Economic Growth & GDP"
                icon={BarChart3}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Gross Domestic Product measures the total value of goods and
                services produced in an economy over a specific period. It is
                the broadest measure of economic activity — and often the
                starting point for understanding how strong or weak an economy
                is.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 mb-6">
                {[
                  {
                    name: "Real GDP",
                    desc: "Adjusted for inflation — measures actual output growth.",
                  },
                  {
                    name: "Nominal GDP",
                    desc: "Not adjusted for inflation — includes price changes.",
                  },
                  {
                    name: "GDP Growth Rate",
                    desc: "Percentage change from prior period — the key market metric.",
                  },
                  {
                    name: "GDP per Capita",
                    desc: "GDP divided by population — a proxy for productivity.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
                  >
                    <p className="text-sm font-semibold text-white mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                How Traders Read GDP
              </h3>

              <FlowDiagram
                title="GDP Growth Chain"
                accent="bullish"
                steps={[
                  { label: "GDP Growth ↑", tone: "up" },
                  { label: "Stronger Economic Activity", tone: "up" },
                  { label: "Stronger Earnings / Employment", tone: "up" },
                  { label: "Central Bank Confidence", tone: "up" },
                  { label: "Higher Rate Expectations", tone: "up" },
                  { label: "Potentially Stronger Currency", tone: "up" },
                ]}
              />

              <Callout variant="but" title="BUT — Context Matters">
                Strong GDP combined with falling inflation may produce a
                different monetary-policy expectation than strong GDP combined
                with rising inflation. Always read growth alongside inflation
                and employment.
              </Callout>

              <DataCard
                name="GDP"
                fullName="Gross Domestic Product"
                badge="Growth"
                badgeTone="info"
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                      What It Measures
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Total value of goods and services produced in an economy.
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                      Why It Matters
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Growth influences employment, inflation, and central-bank
                      policy expectations.
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                      Watch With
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Inflation (CPI/PCE) · Employment (NFP) · Central Bank
                      Statements · Bond Yields
                    </p>
                  </div>
                </div>
              </DataCard>
            </section>

            {/* ============================================
                SECTION 03 — INFLATION
                ============================================ */}
            <section id="inflation" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="03"
                title="Inflation"
                icon={Flame}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Inflation is the rate at which prices for goods and services
                rise. It is one of the most important fundamental drivers of
                currency values because it directly influences central-bank
                policy. Rising inflation typically pressures central banks to
                tighten policy, while falling inflation can lead to easing.
              </p>

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Key Inflation Indicators
              </h3>

              <div className="space-y-3">
                <DataCard
                  name="CPI"
                  fullName="Consumer Price Index"
                  badge="Core Metric"
                  badgeTone="info"
                >
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        What It Measures
                      </p>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        Changes in the prices consumers pay for goods and services.
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        Why It Matters
                      </p>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        Inflation influences central-bank policy and therefore
                        interest-rate expectations.
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        Higher Than Expected
                      </p>
                      <p className="text-sm text-emerald-400/90 leading-relaxed">
                        Inflation concerns ↑ → Rate expectations ↑ → Bond yields
                        ↑ → Currency demand may ↑
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        Lower Than Expected
                      </p>
                      <p className="text-sm text-red-400/90 leading-relaxed">
                        Inflation pressure ↓ → Rate expectations ↓ → Bond yields
                        ↓ → Currency demand may ↓
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        Watch With
                      </p>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        Core CPI · PCE · Employment · Central-Bank Expectations
                      </p>
                    </div>
                  </div>
                </DataCard>

                <DataCard
                  name="Core CPI"
                  fullName="Core Consumer Price Index"
                  badge="Excludes Food & Energy"
                  badgeTone="neutral"
                >
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    Core CPI removes volatile food and energy prices to reveal
                    the underlying inflation trend. It is often watched more
                    closely than headline CPI because it is a better predictor
                    of persistent inflation.
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    <span className="font-semibold text-white">
                      Why It Matters:
                    </span>{" "}
                    Central banks often respond more to persistent core
                    inflation than to temporary swings in energy prices.
                  </p>
                </DataCard>

                <DataCard
                  name="PPI"
                  fullName="Producer Price Index"
                  badge="Leading Indicator"
                  badgeTone="info"
                >
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    Measures price changes at the producer level — before those
                    costs reach consumers. Rising PPI can signal future CPI
                    pressure.
                  </p>
                  <FlowDiagram
                    title="PPI Can Lead CPI"
                    steps={[
                      { label: "Producer Prices ↑", tone: "up" },
                      { label: "Production Costs ↑", tone: "up" },
                      { label: "Consumer Prices May Follow", tone: "up" },
                      { label: "Inflation Expectations ↑", tone: "up" },
                    ]}
                  />
                </DataCard>

                <DataCard
                  name="PCE"
                  fullName="Personal Consumption Expenditures"
                  badge="Fed's Preferred"
                  badgeTone="info"
                >
                  <div className="space-y-4">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      The Federal Reserve's preferred inflation gauge. It
                      measures price changes in consumer spending across a
                      broader basket than CPI.
                    </p>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        Core PCE
                      </p>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        Excludes food and energy. The single most important
                        inflation number for the Fed's policy decisions.
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        Inflation Expectations
                      </p>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        Surveys of what consumers and businesses expect future
                        inflation to be. Central banks watch these closely — if
                        expectations rise, policy may tighten.
                      </p>
                    </div>
                  </div>
                </DataCard>
              </div>

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                The Inflation Chain
              </h3>

              <FlowDiagram
                title="Higher Inflation Scenario"
                accent="bullish"
                steps={[
                  { label: "Higher Inflation", tone: "up" },
                  { label: "Inflation Risk", tone: "up" },
                  { label: "Central Bank Pressure", tone: "up" },
                  { label: "Higher Rate Expectations", tone: "up" },
                  { label: "Higher Yield Expectations", tone: "up" },
                  { label: "Potential Currency Support", tone: "up" },
                ]}
              />

              <Callout variant="key" title="ACTUAL vs FORECAST vs PREVIOUS">
                The market reaction depends less on the number itself and more
                on the surprise. If the forecast was 3.0% and the actual was
                3.4%, the reaction is usually driven by the 0.4% surprise — not
                by the raw 3.4% figure.
              </Callout>

              <EducationalImage
                title="Inflation Cycle"
                description="Visual illustration of the inflation chain and its market impact"
                src="/images/education/inflation-cycle.png"
              />
            </section>

            {/* ============================================
                SECTION 04 — EMPLOYMENT DATA
                ============================================ */}
            <section id="employment" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="04"
                title="Employment Data"
                icon={Briefcase}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Employment data shows the health of the labor market. Strong
                employment often signals economic strength, which can support
                rate expectations and therefore currency demand. Weak
                employment can pressure policymakers to ease, weakening the
                currency or shifting rate expectations downward.
              </p>

              <div className="space-y-3">
                <DataCard
                  name="NFP"
                  fullName="Nonfarm Payrolls"
                  badge="Highest Impact"
                  badgeTone="info"
                >
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        What It Measures
                      </p>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        The number of new jobs created in the US economy each
                        month, excluding farm workers.
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        Why It Matters
                      </p>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        Strong NFP often supports Fed rate expectations and the
                        USD; weak NFP can do the opposite.
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        Watch With
                      </p>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        Unemployment Rate · Average Hourly Earnings · Labor
                        Force Participation
                      </p>
                    </div>
                  </div>
                </DataCard>

                <DataCard
                  name="Unemployment Rate"
                  fullName="Percentage of the Labor Force Without Jobs"
                  badge="Key Metric"
                  badgeTone="neutral"
                >
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Measures the percentage of the labor force actively seeking
                    work. Falling unemployment is generally positive; rising
                    unemployment can pressure policymakers toward easing.
                  </p>
                </DataCard>

                <DataCard
                  name="Average Hourly Earnings"
                  fullName="Wage Growth"
                  badge="Inflation Signal"
                  badgeTone="info"
                >
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    Measures wage growth. Rising wages can feed inflation if
                    businesses pass higher costs onto consumers.
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    <span className="font-semibold text-white">
                      Why It Matters:
                    </span>{" "}
                    Central banks watch wage growth closely because it can
                    signal future inflation pressure.
                  </p>
                </DataCard>

                <DataCard
                  name="Initial Jobless Claims"
                  fullName="Weekly New Unemployment Filings"
                  badge="Weekly"
                  badgeTone="neutral"
                >
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    A high-frequency weekly indicator of layoffs. Rising claims
                    can signal labor-market weakening before it appears in
                    monthly data.
                  </p>
                </DataCard>

                <DataCard
                  name="Continuing Claims"
                  fullName="Ongoing Unemployment Filings"
                  badge="Weekly"
                  badgeTone="neutral"
                >
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Measures people still receiving unemployment benefits.
                    Rising continuing claims can signal difficulty finding new
                    work.
                  </p>
                </DataCard>
              </div>

              <Callout variant="key" title="Read the Whole Report">
                A strong NFP headline combined with weak wages and rising
                unemployment produces a different market reaction than strong
                NFP with strong wages and falling unemployment. Traders should
                interpret the entire employment report — not just one headline
                number.
              </Callout>

              <EducationalImage
                title="Employment Report Anatomy"
                description="Breakdown of key employment metrics and their relationships"
                src="/images/education/employment-report.png"
              />
            </section>

            {/* ============================================
                SECTION 05 — INTEREST RATES
                ============================================ */}
            <section id="interest-rates" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="05"
                title="Interest Rates"
                icon={Percent}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Interest rates are one of the most powerful fundamental drivers
                of currency values. Higher interest rates can attract foreign
                capital seeking higher returns, potentially increasing demand
                for that currency. But what matters most in FX is not the
                absolute rate — it is the relative rate between two economies.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 mb-6">
                {[
                  {
                    name: "Policy Rate",
                    desc: "The central bank's target interest rate.",
                  },
                  {
                    name: "Nominal Rate",
                    desc: "The headline rate before inflation adjustment.",
                  },
                  {
                    name: "Real Rate",
                    desc: "Nominal rate minus inflation — the true return.",
                  },
                  {
                    name: "Rate Differential",
                    desc: "The gap between two economies' rates — key for FX.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
                  >
                    <p className="text-sm font-semibold text-white mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <FlowDiagram
                title="Why Interest Rates Matter"
                accent="bullish"
                steps={[
                  { label: "Higher Expected Returns", tone: "up" },
                  { label: "Greater Demand for Currency-Denominated Assets", tone: "up" },
                  { label: "Greater Currency Demand", tone: "up" },
                  { label: "Potentially Stronger Currency", tone: "up" },
                ]}
              />

              <Callout variant="but" title="BUT — FX Is Relative">
                The question is not simply: "Are US rates high?" The question
                is: "Are US rates expected to be more attractive relative to
                other economies?" A currency can weaken even with high rates if
                the other economy's rates are rising faster.
              </Callout>

              <HighlightCard label="Relative Comparison" accent="blue">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-zinc-400">USD Rate Expectations</span>
                    <span className="text-zinc-600">vs</span>
                    <span className="text-zinc-400">EUR Rate Expectations</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-zinc-400">GBP Rate Expectations</span>
                    <span className="text-zinc-600">vs</span>
                    <span className="text-zinc-400">USD Rate Expectations</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-zinc-400">JPY Rate Expectations</span>
                    <span className="text-zinc-600">vs</span>
                    <span className="text-zinc-400">CHF Rate Expectations</span>
                  </div>
                </div>
              </HighlightCard>
            </section>

            {/* ============================================
                SECTION 06 — CENTRAL BANKS
                ============================================ */}
            <section id="central-banks" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="06"
                title="Central Banks"
                icon={Landmark}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Central banks set monetary policy. Their decisions on interest
                rates, bond purchases, and forward guidance are the single most
                important fundamental driver of currency markets. When a
                central bank changes policy expectations, currencies respond —
                often before the policy is actually implemented.
              </p>

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                HAWKISH vs DOVISH
              </h3>

              <div className="grid gap-3 sm:grid-cols-2 mb-8">
                <div className="rounded-lg border border-emerald-500/15 bg-emerald-500/[0.02] p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                    <h4 className="text-sm font-semibold text-emerald-400">
                      Hawkish
                    </h4>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Higher rates / tighter policy expectations. Typically
                    supportive for the currency.
                  </p>
                </div>

                <div className="rounded-lg border border-red-500/15 bg-red-500/[0.02] p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <ArrowDownRight className="h-4 w-4 text-red-400" />
                    <h4 className="text-sm font-semibold text-red-400">
                      Dovish
                    </h4>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Lower rates / easier policy expectations. Typically
                    pressure on the currency.
                  </p>
                </div>
              </div>

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Major Central Banks
              </h3>

              <div className="space-y-2">
                {[
                  { name: "Federal Reserve", region: "United States", currency: "USD" },
                  { name: "European Central Bank", region: "Eurozone", currency: "EUR" },
                  { name: "Bank of England", region: "United Kingdom", currency: "GBP" },
                  { name: "Bank of Japan", region: "Japan", currency: "JPY" },
                  { name: "Swiss National Bank", region: "Switzerland", currency: "CHF" },
                  { name: "Bank of Canada", region: "Canada", currency: "CAD" },
                  { name: "Reserve Bank of Australia", region: "Australia", currency: "AUD" },
                  { name: "Reserve Bank of New Zealand", region: "New Zealand", currency: "NZD" },
                ].map((cb, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 rounded-lg border border-white/[0.06] bg-white/[0.01] px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">
                        {cb.name}
                      </p>
                      <p className="text-xs text-zinc-500">{cb.region}</p>
                    </div>
                    <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-zinc-400 shrink-0">
                      {cb.currency}
                    </span>
                  </div>
                ))}
              </div>

              <Callout variant="key" title="What Central Banks Do">
                <ul className="space-y-1.5 mt-1">
                  <li>• Set the policy interest rate</li>
                  <li>• Manage money supply and liquidity</li>
                  <li>• Provide forward guidance on future policy</li>
                  <li>• Purchase or sell government bonds (QE / QT)</li>
                  <li>• Manage inflation and employment objectives</li>
                </ul>
              </Callout>

              <EducationalImage
                title="Central Bank Policy Cycle"
                description="How policy moves through tightening and easing cycles"
                src="/images/education/central-bank-cycle.png"
              />
            </section>

            {/* ============================================
                SECTION 07 — FISCAL POLICY
                ============================================ */}
            <section id="fiscal-policy" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="07"
                title="Government & Fiscal Policy"
                icon={Building2}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Fiscal policy is the government's use of spending and taxation
                to influence the economy. Unlike monetary policy, which is set
                by central banks, fiscal policy is set by governments. Fiscal
                policy can affect growth, inflation, bond yields, investor
                confidence, and currency demand.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 mb-6">
                {[
                  { name: "Government Spending", desc: "Public investment and services." },
                  { name: "Taxation", desc: "Revenue collection from citizens and businesses." },
                  { name: "Budget Deficit", desc: "When spending exceeds revenue." },
                  { name: "Government Debt", desc: "Accumulated borrowing over time." },
                  { name: "Fiscal Stimulus", desc: "Expansionary policy — more spending, lower taxes." },
                  { name: "Fiscal Tightening", desc: "Contractionary policy — less spending, higher taxes." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
                  >
                    <p className="text-sm font-semibold text-white mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <Callout variant="but" title="BUT — Fiscal Concerns Can Weigh on a Currency">
                Large deficits and rising debt can weaken investor confidence
                in a currency, even when government spending is stimulating
                growth. Markets can punish fiscal irresponsibility by demanding
                higher yields to hold the currency's debt.
              </Callout>
            </section>

            {/* ============================================
                SECTION 08 — RETAIL SALES & CONSUMER
                ============================================ */}
            <section id="consumer" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="08"
                title="Retail Sales & Consumer Spending"
                icon={ShoppingCart}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Consumer spending drives the majority of activity in most
                developed economies. Retail sales, consumer confidence, and
                personal spending data reveal how willing consumers are to
                spend — and how strong the underlying demand in the economy is.
              </p>

              <div className="space-y-3">
                {[
                  { name: "Retail Sales", desc: "Total sales in the retail sector." },
                  { name: "Consumer Confidence", desc: "Surveys of consumer sentiment." },
                  { name: "Consumer Spending", desc: "Personal expenditures on goods and services." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
                  >
                    <p className="text-sm font-semibold text-white mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <FlowDiagram
                title="Strong Consumer Demand Chain"
                accent="bullish"
                steps={[
                  { label: "Strong Consumer Demand", tone: "up" },
                  { label: "Stronger Economic Activity", tone: "up" },
                  { label: "Potentially Stronger Growth", tone: "up" },
                  { label: "Possible Inflation Pressure", tone: "up" },
                  { label: "Possible Tighter Monetary Policy", tone: "up" },
                  { label: "Potential Currency Support", tone: "up" },
                ]}
              />

              <p className="text-sm text-zinc-400 leading-relaxed">
                Weak consumption produces the opposite chain: falling demand,
                slower growth, potential disinflation, easing expectations, and
                potential currency weakness.
              </p>
            </section>

            {/* ============================================
                SECTION 09 — MANUFACTURING & SERVICES
                ============================================ */}
            <section id="pmi" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="09"
                title="Manufacturing & Services"
                icon={Factory}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Purchasing Managers' Index (PMI) data is one of the most
                forward-looking indicators of economic activity. Businesses are
                surveyed about orders, output, employment, and inventories —
                giving markets an early read on where the economy is heading.
              </p>

              <HighlightCard label="PMI Reading Scale" accent="blue">
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-md border border-red-500/20 bg-red-500/[0.03] p-3 text-center">
                    <p className="text-xs font-semibold text-red-400 mb-1">
                      Below 50
                    </p>
                    <p className="text-[11px] text-zinc-500 uppercase tracking-wider">
                      Contraction
                    </p>
                  </div>
                  <div className="rounded-md border border-white/[0.08] bg-white/[0.02] p-3 text-center">
                    <p className="text-xs font-semibold text-zinc-300 mb-1">
                      50
                    </p>
                    <p className="text-[11px] text-zinc-500 uppercase tracking-wider">
                      Neutral
                    </p>
                  </div>
                  <div className="rounded-md border border-emerald-500/20 bg-emerald-500/[0.03] p-3 text-center">
                    <p className="text-xs font-semibold text-emerald-400 mb-1">
                      Above 50
                    </p>
                    <p className="text-[11px] text-zinc-500 uppercase tracking-wider">
                      Expansion
                    </p>
                  </div>
                </div>
              </HighlightCard>

              <div className="space-y-3">
                {[
                  { name: "Manufacturing PMI", desc: "Industrial sector activity." },
                  { name: "Services PMI", desc: "Service sector activity." },
                  { name: "Composite PMI", desc: "Combined economic activity." },
                  { name: "Industrial Production", desc: "Actual output of factories and mines." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
                  >
                    <p className="text-sm font-semibold text-white mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <Callout variant="key" title="Why PMI Surprises Matter">
                PMI data is released early and reflects business sentiment.
                Large surprises versus expectations can trigger sharp currency
                moves because they can shift growth and policy expectations
                quickly.
              </Callout>
            </section>

            {/* ============================================
                SECTION 10 — TRADE BALANCE
                ============================================ */}
            <section id="trade" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="10"
                title="Trade Balance & Current Account"
                icon={Ship}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                The trade balance measures the difference between a country's
                exports and imports. The current account is a broader measure
                that includes trade, income flows, and transfers. These
                indicators reflect how goods, services, and capital are moving
                between an economy and the rest of the world.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 mb-6">
                {[
                  { name: "Exports", desc: "Goods and services sold abroad." },
                  { name: "Imports", desc: "Goods and services purchased from abroad." },
                  { name: "Trade Surplus", desc: "Exports exceed imports." },
                  { name: "Trade Deficit", desc: "Imports exceed exports." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
                  >
                    <p className="text-sm font-semibold text-white mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <Callout variant="but" title="BUT — Not Simply Surplus = Strong">
                Exchange rates are affected by many capital-flow and financial
                factors. A trade surplus does not automatically mean a stronger
                currency. In practice, capital flows, interest-rate
                differentials, and risk sentiment often dominate trade balances
                in the short term.
              </Callout>
            </section>

            {/* ============================================
                SECTION 11 — COMMODITY CURRENCIES
                ============================================ */}
            <section id="commodities" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="11"
                title="Commodity Currencies"
                icon={Coins}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Some currencies are closely tied to commodity exports. When
                commodity prices rise, these economies can benefit from higher
                export revenues, supporting growth and currency demand.
              </p>

              <div className="grid gap-3 sm:grid-cols-3 mb-8">
                {[
                  { currency: "CAD", commodity: "Oil", note: "Canada is a major oil exporter." },
                  { currency: "AUD", commodity: "Iron Ore & Metals", note: "Australia is a major commodity exporter." },
                  { currency: "NZD", commodity: "Agriculture", note: "New Zealand is agriculture-dependent." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-semibold text-white">
                        {item.currency}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-zinc-300 mb-1">
                      {item.commodity}
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>

              <FlowDiagram
                title="Commodity Price Channel"
                accent="bullish"
                steps={[
                  { label: "Commodity Prices ↑", tone: "up" },
                  { label: "Export Revenues ↑", tone: "up" },
                  { label: "Trade / Income Effects ↑", tone: "up" },
                  { label: "Growth Expectations ↑", tone: "up" },
                  { label: "Potential Currency Support", tone: "up" },
                ]}
              />

              <Callout variant="but" title="BUT — Not Guaranteed">
                The relationship between commodities and currencies is not
                guaranteed. Global risk sentiment, interest-rate differentials,
                and domestic factors can override commodity price effects.
              </Callout>
            </section>

            {/* ============================================
                SECTION 12 — ECONOMIC CALENDAR
                ============================================ */}
            <section id="calendar" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="12"
                title="Economic Calendar & Market Expectations"
                icon={Calendar}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                The economic calendar is where upcoming data releases are
                scheduled. Traders use it to plan ahead of major releases. Each
                event shows Previous, Forecast, and Actual values — and each of
                these matters for the market reaction.
              </p>

              <ComparisonTable
                headers={["Field", "Meaning"]}
                rows={[
                  ["Previous", "The prior period's actual value."],
                  ["Forecast", "The consensus expectation of economists."],
                  ["Actual", "The released figure. The difference vs forecast drives reaction."],
                  ["Impact", "Expected market impact — Low / Medium / High."],
                ]}
              />

              <Callout variant="key" title="The Surprise Is What Matters">
                The market was positioned for the forecast. When actual data
                comes in different from the forecast, the market reprices. The
                size and direction of the surprise usually determines the size
                and direction of the immediate reaction.
              </Callout>

              <HighlightCard label="Example — CPI Release" accent="amber">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                      Forecast
                    </p>
                    <p className="font-mono text-zinc-300">3.1%</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                      Actual
                    </p>
                    <p className="font-mono text-white">3.5%</p>
                  </div>
                </div>
                <div className="mt-4 rounded-md border border-amber-500/20 bg-amber-500/[0.04] p-3">
                  <p className="text-xs text-amber-400/90 leading-relaxed">
                    Surprise: +0.4 percentage points above forecast. Traders may
                    reassess rate expectations higher.
                  </p>
                </div>
              </HighlightCard>

              <Callout variant="but" title="BUT — Price Can Move Opposite">
                Even after a surprise, price can move in the opposite direction
                if the market was already positioned for the surprise, or if
                another dominant factor (risk sentiment, geopolitical news)
                overrides the data.
              </Callout>
            </section>

            {/* ============================================
                SECTION 13 — CURRENCY FUNDAMENTALS
                ============================================ */}
            <section id="currencies" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="13"
                title="Currency-Specific Fundamentals"
                icon={DollarSign}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Each currency has its own central bank, economic drivers, and
                market role. Understanding what moves each currency is
                essential for building a fundamental bias.
              </p>

              <div className="space-y-3">
                {[
                  {
                    code: "USD",
                    name: "US Dollar",
                    cbank: "Federal Reserve",
                    drivers: ["Interest rates", "Treasury yields", "CPI / PCE", "NFP", "GDP", "Risk sentiment"],
                  },
                  {
                    code: "EUR",
                    name: "Euro",
                    cbank: "European Central Bank",
                    drivers: ["ECB policy", "Eurozone CPI", "German data", "EU growth", "Energy prices"],
                  },
                  {
                    code: "GBP",
                    name: "British Pound",
                    cbank: "Bank of England",
                    drivers: ["BoE policy", "UK CPI", "UK wages", "GDP", "Brexit dynamics"],
                  },
                  {
                    code: "JPY",
                    name: "Japanese Yen",
                    cbank: "Bank of Japan",
                    drivers: ["BoJ policy", "Yield curve control", "Risk sentiment", "US-Japan rate differential"],
                  },
                  {
                    code: "CHF",
                    name: "Swiss Franc",
                    cbank: "Swiss National Bank",
                    drivers: ["SNB policy", "Safe-haven flows", "European stability", "Global risk"],
                  },
                  {
                    code: "CAD",
                    name: "Canadian Dollar",
                    cbank: "Bank of Canada",
                    drivers: ["BoC policy", "Oil prices", "US trade", "Employment"],
                  },
                  {
                    code: "AUD",
                    name: "Australian Dollar",
                    cbank: "Reserve Bank of Australia",
                    drivers: ["RBA policy", "Iron ore & metals", "China growth", "Risk appetite"],
                  },
                  {
                    code: "NZD",
                    name: "New Zealand Dollar",
                    cbank: "Reserve Bank of New Zealand",
                    drivers: ["RBNZ policy", "Agriculture exports", "China demand", "Risk sentiment"],
                  },
                ].map((cur) => (
                  <DataCard
                    key={cur.code}
                    name={cur.code}
                    fullName={cur.name}
                    badge={cur.cbank}
                    badgeTone="neutral"
                  >
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                        Major Drivers
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {cur.drivers.map((d, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 text-[11px] text-zinc-400"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </DataCard>
                ))}
              </div>

              <Callout variant="info">
                Currencies do not always behave in fixed patterns. Their
                behavior <em>often</em> depends on market conditions, and can
                change depending on the dominant narrative at the time.
              </Callout>
            </section>

            {/* ============================================
                SECTION 14 — SAFE HAVENS
                ============================================ */}
            <section id="safe-havens" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="14"
                title="Safe Havens & Risk Sentiment"
                icon={Shield}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                A safe-haven asset is generally sought during periods of
                uncertainty because investors value characteristics such as
                perceived security, liquidity, and resilience during stress.
                Safe-haven behavior is not absolute — it varies depending on the
                nature of the shock.
              </p>

              <ComparisonTable
                headers={["Safe Haven", "Why It Matters"]}
                rows={[
                  ["USD", "Liquidity, global financial role, demand during stress"],
                  ["JPY", "Safe-haven characteristics, funding-currency dynamics, risk-off flows"],
                  ["CHF", "Swiss financial stability, strong safe-haven reputation"],
                  ["Gold", "Store-of-value characteristics, no issuer credit risk"],
                ]}
              />

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                RISK-ON vs RISK-OFF
              </h3>

              <div className="grid gap-3 sm:grid-cols-2 mb-8">
                <div className="rounded-lg border border-emerald-500/15 bg-emerald-500/[0.02] p-5">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-3">
                    RISK-ON
                  </h4>
                  <p className="text-xs text-zinc-500 mb-3">
                    Investors generally become more comfortable with risk.
                  </p>
                  <ul className="space-y-1.5">
                    {["Equities", "Higher-yielding assets", "Growth-sensitive currencies", "Some commodities"].map(
                      (item, i) => (
                        <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-emerald-400 shrink-0" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="rounded-lg border border-red-500/15 bg-red-500/[0.02] p-5">
                  <h4 className="text-sm font-semibold text-red-400 mb-3">
                    RISK-OFF
                  </h4>
                  <p className="text-xs text-zinc-500 mb-3">
                    Investors become more defensive.
                  </p>
                  <ul className="space-y-1.5">
                    {["Liquidity", "Perceived safety", "Capital preservation", "Safe-haven assets"].map(
                      (item, i) => (
                        <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-red-400 shrink-0" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <Callout variant="key">
                Risk sentiment can overpower individual economic indicators in
                the short term. This is why a currency can fall despite good
                domestic data — if global risk sentiment deteriorates sharply.
              </Callout>
            </section>

            {/* ============================================
                SECTION 15 — GLOBAL CRISES
                ============================================ */}
            <section id="crises" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="15"
                title="Global Crises & Market Reactions"
                icon={Siren}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Major global events — wars, financial crises, recessions,
                pandemics, and natural disasters — can dramatically shift market
                behavior. Each produces its own combination of risk aversion,
                policy response, and capital flows.
              </p>

              <div className="space-y-3">
                {[
                  {
                    name: "War / Geopolitical Shock",
                    icon: Siren,
                    chain: [
                      "Geopolitical escalation",
                      "Risk aversion ↑",
                      "Investors reduce risky exposure",
                      "Demand for safe-haven assets ↑",
                      "Potential flows toward USD / JPY / CHF / Gold",
                    ],
                    note: "Reaction depends on which countries are involved, energy supply disruption, and inflation impact.",
                  },
                  {
                    name: "Natural Disaster",
                    icon: CloudLightning,
                    chain: [
                      "Supply disruption",
                      "Commodity prices may change",
                      "Inflation expectations may change",
                      "Growth expectations may change",
                      "Currency may react depending on scale and location",
                    ],
                  },
                  {
                    name: "Financial Crisis",
                    icon: Landmark,
                    chain: [
                      "Bank failures / credit stress",
                      "Liquidity shortages",
                      "Risk assets fall",
                      "Funding pressures increase",
                      "Safe-haven demand may increase",
                    ],
                    note: "Safe havens can behave differently depending on the source of the crisis.",
                  },
                  {
                    name: "Global Recession",
                    icon: TrendingDown,
                    chain: [
                      "Falling growth",
                      "Lower corporate activity",
                      "Employment pressure",
                      "Central banks may consider easing",
                      "Rate expectations change; currency relationships become relative",
                    ],
                  },
                  {
                    name: "Pandemic",
                    icon: Biohazard,
                    chain: [
                      "Demand shock + supply disruption",
                      "Policy response",
                      "Risk aversion",
                      "Currency reaction depends on which economy is perceived stronger",
                    ],
                  },
                ].map((event, i) => {
                  const Icon = event.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-5"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Icon size={16} className="text-zinc-400" />
                        <h3 className="text-sm font-semibold text-white">
                          {event.name}
                        </h3>
                      </div>
                      <div className="space-y-1.5 pl-7">
                        {event.chain.map((step, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-600 shrink-0" />
                            <span className="text-sm text-zinc-400 leading-relaxed">
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                      {event.note && (
                        <p className="mt-3 pl-7 text-xs text-zinc-500 italic leading-relaxed">
                          {event.note}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <Callout variant="but" title="Not Guaranteed Reactions">
                These are possible market responses, not guaranteed outcomes.
                The actual reaction depends on the scale, location, duration,
                policy response, and existing market positioning.
              </Callout>
            </section>

            {/* ============================================
                SECTION 16 — XAU/USD GOLD
                ============================================ */}
            <section id="gold" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="16"
                title="XAU/USD — Gold Fundamentals"
                icon={Coins}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Gold is a unique asset. It has no yield, no cash flow, and no
                issuing government. Its value comes from scarcity, historical
                store-of-value characteristics, and its role as a hedge against
                uncertainty. Understanding gold requires understanding the
                forces that make it attractive or unattractive at any given
                moment.
              </p>

              <HighlightCard label="Core Relationships" accent="gold">
                <div className="space-y-2">
                  {[
                    "USD",
                    "Real Yields",
                    "Interest Rates",
                    "Inflation",
                    "Federal Reserve Policy",
                    "Geopolitical Risk",
                    "Risk Sentiment",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-zinc-300"
                    >
                      <span className="text-amber-500/60">←</span>
                      {item}
                    </div>
                  ))}
                </div>
              </HighlightCard>

              <FlowDiagram
                title="Real Yields Channel"
                accent="neutral"
                steps={[
                  { label: "Real Yields ↑", tone: "up" },
                  { label: "Opportunity Cost of Holding Gold ↑", tone: "up" },
                  { label: "Gold Demand May ↓", tone: "down" },
                ]}
              />

              <FlowDiagram
                title="Geopolitical Risk Channel"
                accent="bullish"
                steps={[
                  { label: "Geopolitical Risk ↑", tone: "up" },
                  { label: "Uncertainty ↑", tone: "up" },
                  { label: "Safe-Haven Demand ↑", tone: "up" },
                  { label: "Gold Demand May ↑", tone: "up" },
                ]}
              />

              <Callout variant="but" title="Gold Does NOT Simply Rise on Bad News">
                Gold can fall during certain liquidity shocks if investors are
                forced to sell assets to raise cash. Not all crises produce the
                same gold reaction. This distinction matters.
              </Callout>
            </section>

            {/* ============================================
                SECTION 17 — BUILDING A FUNDAMENTAL BIAS
                ============================================ */}
            <section id="bias" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="17"
                title="Building a Fundamental Bias"
                icon={Target}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                A fundamental bias is a directional view of a currency built
                from economic analysis. It is the result of a systematic
                process — not a single indicator.
              </p>

              <FlowDiagram
                title="The Fundamental Bias Workflow"
                accent="bullish"
                steps={[
                  { label: "Identify the Economic Environment", tone: "neutral" },
                  { label: "Check Inflation", tone: "neutral" },
                  { label: "Check Employment", tone: "neutral" },
                  { label: "Check Growth", tone: "neutral" },
                  { label: "Check Central Bank Policy", tone: "neutral" },
                  { label: "Check Rate Expectations", tone: "neutral" },
                  { label: "Check Bond Yields", tone: "neutral" },
                  { label: "Check Risk Sentiment", tone: "neutral" },
                  { label: "Check Geopolitical Conditions", tone: "neutral" },
                  { label: "Build a Currency Bias", tone: "up" },
                  { label: "Combine With Technical Analysis", tone: "up" },
                ]}
              />

              <Callout variant="key" title="Combine — Don't Isolate">
                Fundamental bias alone is not a signal. It should be combined
                with technical analysis. When fundamental and technical align,
                conviction can increase. When they conflict, the best action is
                often to wait.
              </Callout>

              <HighlightCard label="Example — Conflicting Signals" accent="amber">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-wider text-zinc-500 w-32">
                      Fundamental bias
                    </span>
                    <span className="text-emerald-400">Bullish USD</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-wider text-zinc-500 w-32">
                      Technical setup
                    </span>
                    <span className="text-red-400">Bearish USD chart</span>
                  </div>
                  <div className="mt-4 rounded-md border border-amber-500/20 bg-amber-500/[0.04] p-3">
                    <p className="text-xs text-amber-400/90 leading-relaxed">
                      <span className="font-semibold">NO AUTOMATIC TRADE.</span>{" "}
                      Wait for alignment or reassess the thesis. Conflicting
                      signals are a reason to wait, not a reason to force a
                      trade.
                    </p>
                  </div>
                </div>
              </HighlightCard>
            </section>

            {/* ============================================
                SECTION 18 — LIMITATIONS
                ============================================ */}
            <section id="limitations" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="18"
                title="Fundamental Analysis Limitations"
                icon={AlertTriangle}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Fundamental analysis provides essential context, but it is not
                a complete trading system on its own. Understanding its
                limitations is just as important as understanding its strengths.
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  {
                    title: "Timing",
                    desc: "Fundamentals explain direction over time, not exact timing of moves.",
                  },
                  {
                    title: "Positioning",
                    desc: "The market may already be positioned for the fundamental outcome.",
                  },
                  {
                    title: "Narrative Shifts",
                    desc: "Dominant market narratives can shift suddenly and override fundamentals.",
                  },
                  {
                    title: "Second-Order Effects",
                    desc: "Complex global interconnections can produce unexpected currency reactions.",
                  },
                  {
                    title: "Data Revisions",
                    desc: "Initial data releases are often revised, changing the picture.",
                  },
                  {
                    title: "Relative Complexity",
                    desc: "FX is relative — two economies must be analyzed, not one.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
                  >
                    <h4 className="text-sm font-semibold text-zinc-200 mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <Callout variant="remember" title="Remember">
                Fundamental analysis is about understanding why prices move — it
                is not a prediction tool. Combined with technical analysis and
                risk management, it forms part of a complete framework.
              </Callout>
            </section>

            {/* CONTINUE LEARNING */}
            <section className="mt-24 border-t border-white/[0.06] pt-12">
              <div className="mb-6">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-2">
                  Next Step
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Continue Learning
                </h2>
                <p className="mt-2 text-sm text-zinc-400 max-w-lg">
                  You've covered the framework of fundamental analysis. Next,
                  explore risk management to see how risk is structured in
                  professional trading.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/education/risk-management"
                  className="group rounded-lg border border-white/[0.06] bg-white/[0.01] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.02] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] text-purple-400">
                      <Shield size={16} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400">
                      Primary
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

                <Link
                  href="/education/technical-analysis"
                  className="group rounded-lg border border-white/[0.06] bg-white/[0.01] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.02] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] text-blue-400">
                      <LineChart size={16} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                      Revisit
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    Technical Analysis
                  </h3>
                  <p className="text-xs text-zinc-500 mb-4">
                    Combine with fundamentals
                  </p>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Review</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </div>
            </section>

            {/* FOOTER */}
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