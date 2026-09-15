// app/education/risk-management/page.tsx
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  BookOpen,
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
  TrendingDown,
  TrendingUp,
  Percent,
  DollarSign,
  Calculator,
  Layers,
  Zap,
  Lock,
  Gauge,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Scale,
  Ban,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";

// ============================================
// EDUCATIONAL IMAGE
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
  variant?: "info" | "tip" | "warning" | "success";
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
    success: {
      bg: "bg-emerald-500/[0.03]",
      border: "border-emerald-500/15",
      icon: Shield,
      text: "text-emerald-400/90",
      label: "text-emerald-400",
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
        <div className={`text-sm ${config.text} leading-relaxed`}>{children}</div>
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
// CONCEPT CARD
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
// RISK CARD
// ============================================
function RiskCard({
  title,
  tone = "neutral",
  icon: Icon,
  children,
}: {
  title: string;
  tone?: "bullish" | "bearish" | "neutral" | "warning";
  icon?: any;
  children: React.ReactNode;
}) {
  const toneMap = {
    bullish: "border-emerald-500/15 bg-emerald-500/[0.02]",
    bearish: "border-red-500/15 bg-red-500/[0.02]",
    warning: "border-amber-500/15 bg-amber-500/[0.02]",
    neutral: "border-white/[0.06] bg-white/[0.01]",
  };

  const iconTone = {
    bullish: "text-emerald-400",
    bearish: "text-red-400",
    warning: "text-amber-400",
    neutral: "text-zinc-400",
  };

  return (
    <div className={`rounded-lg border ${toneMap[tone]} p-5`}>
      <div className="flex items-center gap-2.5 mb-3">
        {Icon && <Icon size={16} className={iconTone[tone]} />}
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <div>{children}</div>
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
  highlightNegative,
}: {
  headers: string[];
  rows: string[][];
  highlightNegative?: boolean;
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
                        : `text-right font-mono tabular-nums ${
                            highlightNegative && j === row.length - 1
                              ? "text-red-400"
                              : "text-zinc-400"
                          }`
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
// RISK FLOW DIAGRAM
// ============================================
function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="my-8 rounded-lg border border-white/[0.06] bg-zinc-950/50 p-5">
      <div className="flex flex-col gap-2">
        {steps.map((step, i) => (
          <div key={i}>
            <div className="rounded-md border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-center">
              <span className="font-mono text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown size={14} className="text-zinc-700" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function RiskManagementPage() {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [progress, setProgress] = useState(0);

  const sections = [
    { id: "intro", label: "What is Risk Management?" },
    { id: "core-variables", label: "Three Core Variables" },
    { id: "risk-per-trade", label: "Risk Per Trade" },
    { id: "position-sizing", label: "Position Sizing" },
    { id: "stop-loss", label: "Stop Loss" },
    { id: "risk-reward", label: "Risk-Reward Ratio" },
    { id: "leverage", label: "Leverage" },
    { id: "margin", label: "Margin" },
    { id: "drawdown", label: "Drawdown" },
    { id: "math-of-loss", label: "Mathematics of Loss" },
    { id: "losing-streaks", label: "Losing Streaks" },
    { id: "daily-loss", label: "Daily Loss Limit" },
    { id: "weekly-monthly", label: "Weekly & Monthly Limits" },
    { id: "total-exposure", label: "Total Account Exposure" },
    { id: "correlation", label: "Correlation Risk" },
    { id: "volatility", label: "Volatility & Risk" },
    { id: "news-risk", label: "News & Event Risk" },
    { id: "slippage", label: "Slippage & Execution" },
    { id: "costs", label: "Trading Costs" },
    { id: "risk-of-ruin", label: "Risk of Ruin" },
    { id: "scaling", label: "Scaling & Compounding" },
    { id: "no-trade", label: "When Not to Trade" },
    { id: "psychology", label: "Risk & Psychology" },
    { id: "risk-plan", label: "Risk Management Plan" },
    { id: "framework", label: "Final Framework" },
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

      {/* ============================================
          TOP NAVIGATION
          ============================================ */}
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
                  Risk Management
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
                {mobileTocOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
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

      {/* ============================================
          HERO
          ============================================ */}
      <section className="relative border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-emerald-500/[0.05] blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-amber-500/[0.04] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl">
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
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Core Subject
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
              Risk Management
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed">
              Learn how to control position size, losses, leverage, drawdown
              and exposure so that no single trade can destroy your trading
              plan.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-400">
                <Clock size={12} className="text-zinc-500" />
                50 min read
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-400">
                <BookOpen size={12} className="text-zinc-500" />
                25 sections
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-400">
                <Award size={12} className="text-zinc-500" />
                Intermediate to Advanced
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
          {/* STICKY TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 py-12">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-4">
                On This Page
              </p>
              <nav className="space-y-0.5 max-h-[calc(100vh-160px)] overflow-y-auto pr-2">
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

          {/* MAIN CONTENT */}
          <article className="min-w-0 py-12 lg:py-16 max-w-3xl">
            {/* ============================================
                01 — WHAT IS RISK MANAGEMENT
                ============================================ */}
            <section id="intro" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="01"
                title="What Is Risk Management?"
                icon={Shield}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Trading risk is the uncertainty that the market will move
                against your position. Every trade carries this uncertainty —
                no analysis, no matter how strong, can remove it.
              </p>

              <BulletList
                items={[
                  "Every trade has uncertainty. No setup wins 100% of the time.",
                  "Protecting capital is more important than maximizing a single trade.",
                  "Risk is the amount you can lose. Reward is the amount you can gain. They are not symmetrical.",
                  "A profitable strategy can still destroy an account if risk is uncontrolled.",
                  "Risk management works independently of whether you use technical or fundamental analysis.",
                ]}
              />

              <Callout variant="success" title="Core Philosophy">
                Your first job as a trader is not to make money. Your first job
                is to control how much you can lose.
              </Callout>

              <p className="text-sm text-zinc-400 leading-relaxed">
                Risk management does not eliminate losses — it controls their
                size and their consequences. This single principle separates
                traders who survive hundreds of trades from those who blow up
                on one.
              </p>

              <EducationalImage
                title="Risk Management Overview"
                description="The relationship between capital, position size, and controlled loss"
                src="/images/education/risk-management-overview.png"
                priority
              />
            </section>

            {/* ============================================
                02 — THREE CORE VARIABLES
                ============================================ */}
            <section id="core-variables" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="02"
                title="The Three Core Variables of Risk"
                icon={Target}
              />

              <div className="space-y-3 mb-8">
                <ConceptCard number="01" title="Risk Per Trade">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    How much money can be lost if the stop is hit? This is the
                    maximum planned loss, expressed as a dollar amount.
                  </p>
                </ConceptCard>

                <ConceptCard number="02" title="Position Size">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    How large should the trade be given the account size and
                    stop distance? Position size is calculated — never chosen
                    first.
                  </p>
                </ConceptCard>

                <ConceptCard number="03" title="Stop-Loss Distance">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Where is the trade idea considered invalid? The stop
                    represents the market structure level that proves the setup
                    wrong.
                  </p>
                </ConceptCard>
              </div>

              <FlowDiagram
                steps={[
                  "Account Size",
                  "Risk Allocation",
                  "Stop Distance",
                  "Position Size",
                  "Maximum Loss",
                ]}
              />

              <p className="text-sm text-zinc-400 leading-relaxed">
                Position size should always be calculated from risk. Traders
                who choose a large position first, then look for a stop, are
                doing it backwards.
              </p>

              <EducationalImage
                title="The Risk Calculation Chain"
                description="How risk flows from account size to maximum loss"
                src="/images/education/risk-core-variables.png"
              />
            </section>

            {/* ============================================
                03 — RISK PER TRADE
                ============================================ */}
            <section id="risk-per-trade" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="03"
                title="Risk Per Trade"
                icon={Percent}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Risk per trade is usually expressed as a percentage of the
                account. The dollar amount is calculated from that percentage.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 mb-6">
                <RiskCard title="Example 1" tone="neutral" icon={Calculator}>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Account</span>
                      <span className="font-mono text-zinc-300">$1,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Risk</span>
                      <span className="font-mono text-zinc-300">1%</span>
                    </div>
                    <div className="pt-2 border-t border-white/[0.04] flex justify-between text-sm">
                      <span className="text-zinc-500">Max loss</span>
                      <span className="font-mono text-red-400 font-semibold">
                        $10
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-600 font-mono pt-1">
                      $1,000 × 0.01 = $10
                    </p>
                  </div>
                </RiskCard>

                <RiskCard title="Example 2" tone="neutral" icon={Calculator}>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Account</span>
                      <span className="font-mono text-zinc-300">$10,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Risk</span>
                      <span className="font-mono text-zinc-300">1%</span>
                    </div>
                    <div className="pt-2 border-t border-white/[0.04] flex justify-between text-sm">
                      <span className="text-zinc-500">Max loss</span>
                      <span className="font-mono text-red-400 font-semibold">
                        $100
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-600 font-mono pt-1">
                      $10,000 × 0.01 = $100
                    </p>
                  </div>
                </RiskCard>
              </div>

              <Callout variant="warning" title="Important">
                Do not treat risk percentage as a universal law. There is no
                single number every trader must use. The percentage is a
                risk-policy choice that should match your account, strategy,
                and psychology.
              </Callout>

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Three Risk Profiles
              </h3>

              <DataTable
                headers={["Profile", "Typical Range", "Suitable For"]}
                rows={[
                  ["Conservative", "0.5% – 1%", "Beginners, small accounts"],
                  ["Moderate", "1% – 2%", "Experienced traders"],
                  ["Aggressive", "2% – 5%+", "High-conviction, well-tested edges"],
                ]}
              />

              <p className="mt-6 text-sm text-zinc-400 leading-relaxed">
                Beginners usually start with smaller fixed percentages because
                the psychological impact of a loss is easier to manage. As
                experience grows, risk can be tuned to the edge and tolerance
                of the trader.
              </p>
            </section>

            {/* ============================================
                04 — POSITION SIZING
                ============================================ */}
            <section id="position-sizing" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="04"
                title="Position Sizing"
                icon={Calculator}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Position sizing is the single most important calculation in
                risk management. Every trade should be sized from the maximum
                money you are willing to risk and the distance to your stop.
              </p>

              <FormulaCard
                title="Position Sizing Formula"
                formula="Position Size = Maximum Money Risk ÷ Risk Per Unit"
                note="Where 'Risk Per Unit' is the loss per 1 unit if the stop is hit."
              />

              <h3 className="mt-8 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Step-by-Step Example
              </h3>

              <div className="space-y-3 mb-6">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Account</span>
                    <span className="font-mono text-sm text-zinc-300">
                      $5,000
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Risk per trade</span>
                    <span className="font-mono text-sm text-zinc-300">1%</span>
                  </div>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">
                      Maximum money risk
                    </span>
                    <span className="font-mono text-sm text-red-400">
                      $50
                    </span>
                  </div>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">
                      Loss per unit if stop hit
                    </span>
                    <span className="font-mono text-sm text-zinc-300">$25</span>
                  </div>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-300 font-medium">
                      Position size
                    </span>
                    <span className="font-mono text-sm text-emerald-400 font-semibold">
                      $50 ÷ $25 = 2 units
                    </span>
                  </div>
                </div>
              </div>

              <EducationalImage
                title="Position Sizing Diagram"
                description="Risk, stop distance, and position size relationship"
                src="/images/education/position-sizing.png"
              />

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Instrument-Specific Considerations
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { name: "Forex", note: "Pip value, lot size, contract size" },
                  { name: "XAU/USD", note: "Pip value differs, high volatility" },
                  { name: "Indices", note: "Tick value, contract multiplier" },
                  { name: "Stocks", note: "Share price, share quantity" },
                  { name: "Futures", note: "Tick value, contract spec" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
                  >
                    <p className="text-sm font-semibold text-white mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500">{item.note}</p>
                  </div>
                ))}
              </div>

              <Callout variant="info" title="Remember">
                Contract specifications, tick values, pip values, lot sizes,
                and broker specifications must be understood before
                calculating position size. A wrong assumption here means the
                actual risk is not what you intended.
              </Callout>
            </section>

            {/* ============================================
                05 — STOP LOSS
                ============================================ */}
            <section id="stop-loss" className="scroll-mt-24 mb-20">
              <SectionHeader number="05" title="Stop Loss" icon={Ban} />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                A stop-loss is the price at which your trade idea is proven
                wrong. It exists to limit how much you lose when the market
                moves against you.
              </p>

              <Callout variant="warning" title="Do Not Do This">
                Do not place stops at arbitrary distances like "20 pips away"
                without any structural reason. Random stops get triggered by
                normal market noise.
              </Callout>

              <h3 className="mt-8 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                How to Place Logical Stops
              </h3>

              <BulletList
                items={[
                  "Structural stops — placed beyond a swing high or swing low.",
                  "Support/resistance invalidation — placed where the level breaks.",
                  "Volatility-aware stops — adjusted for ATR or recent range.",
                  "Technical invalidation — placed where the pattern fails.",
                ]}
              />

              <Callout variant="success" title="Key Principle">
                The market structure should help determine where the trade is
                invalid — not an arbitrary pip distance.
              </Callout>

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Stop Distance → Position Size
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                <RiskCard title="Wider Stop" tone="bearish" icon={TrendingDown}>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Position size becomes <span className="text-red-400 font-semibold">smaller</span> to
                    keep the maximum money risk constant.
                  </p>
                </RiskCard>
                <RiskCard title="Tighter Stop" tone="bullish" icon={TrendingUp}>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Position size can become <span className="text-emerald-400 font-semibold">larger</span> under
                    the same risk limit.
                  </p>
                </RiskCard>
              </div>

              <EducationalImage
                title="Structural Stop Placement"
                description="Stops placed beyond market structure levels"
                src="/images/education/stop-loss-placement.png"
              />
            </section>

            {/* ============================================
                06 — RISK-REWARD RATIO
                ============================================ */}
            <section id="risk-reward" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="06"
                title="Risk-Reward Ratio"
                icon={Scale}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Risk-reward compares how much you risk to how much you stand to
                gain on a trade.
              </p>

              <DataTable
                headers={["Ratio", "Risk", "Reward"]}
                rows={[
                  ["1:1", "$50", "$50"],
                  ["1:2", "$50", "$100"],
                  ["1:3", "$50", "$150"],
                  ["1:5", "$50", "$250"],
                ]}
              />

              <Callout variant="warning" title="Important Truth">
                Risk-reward ratio does not guarantee profitability. A 1:5 trade
                can still lose. A 1:1 trade can still be profitable.
              </Callout>

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                What Actually Matters — Expectancy
              </h3>

              <FormulaCard
                title="Expectancy Formula"
                formula="Expectancy = (Win Rate × Average Win) − (Loss Rate × Average Loss)"
                note="This tells you the average profit or loss per trade."
              />

              <div className="mt-6 rounded-lg border border-white/[0.06] bg-zinc-950 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                  Example Calculation
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Win rate</p>
                    <p className="font-mono text-sm text-zinc-300">40%</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Average win</p>
                    <p className="font-mono text-sm text-emerald-400">$200</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Loss rate</p>
                    <p className="font-mono text-sm text-zinc-300">60%</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Average loss</p>
                    <p className="font-mono text-sm text-red-400">$100</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/[0.04] space-y-1">
                  <p className="font-mono text-sm text-zinc-400">
                    0.40 × 200 − 0.60 × 100
                  </p>
                  <p className="font-mono text-sm text-zinc-400">
                    = $80 − $60
                  </p>
                  <p className="font-mono text-base text-emerald-400 font-semibold">
                    = +$20 per trade
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm text-zinc-400 leading-relaxed">
                This is why win rate alone is not enough. A trader can win
                frequently and still lose money. A trader can lose frequently
                and still make money. Expectancy is the real edge.
              </p>

              <EducationalImage
                title="Risk-Reward vs Expectancy"
                description="How win rate, average win, and average loss combine"
                src="/images/education/risk-reward.png"
              />
            </section>

            {/* ============================================
                07 — LEVERAGE
                ============================================ */}
            <section id="leverage" className="scroll-mt-24 mb-20">
              <SectionHeader number="07" title="Leverage" icon={Zap} />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Leverage lets you control a larger position with a smaller
                amount of capital. It is a tool, not a strategy.
              </p>

              <BulletList
                items={[
                  "Leverage increases exposure to price movement.",
                  "Leverage amplifies both gains and losses.",
                  "Margin is the capital required to open a trade — it is not the same as risk.",
                  "Having enough margin does not mean the trade is appropriately sized.",
                  "Brokers offering high leverage does not mean you should use maximum leverage.",
                ]}
              />

              <Callout variant="warning" title="Critical Concept">
                Leverage is not the same as risk. A trader can use high
                leverage while keeping a small predefined account risk. A
                trader can also use no leverage and still have excessive risk
                from a badly sized position.
              </Callout>

              <EducationalImage
                title="Leverage vs Risk"
                description="How leverage amplifies exposure without changing planned risk"
                src="/images/education/leverage.png"
              />
            </section>

            {/* ============================================
                08 — MARGIN
                ============================================ */}
            <section id="margin" className="scroll-mt-24 mb-20">
              <SectionHeader number="08" title="Margin" icon={Layers} />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Margin is the capital required to open and maintain a leveraged
                position. It is a requirement, not a measure of risk.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { name: "Initial Margin", desc: "Capital required to open the position." },
                  { name: "Maintenance Margin", desc: "Minimum capital that must remain in the account." },
                  { name: "Free Margin", desc: "Capital available for new trades." },
                  { name: "Margin Utilization", desc: "Percentage of your account currently tied up." },
                  { name: "Margin Call", desc: "Notification that margin requirements are not met." },
                  { name: "Forced Liquidation", desc: "Broker closes positions to restore margin." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
                  >
                    <p className="text-sm font-semibold text-white mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Callout variant="info" title="Critical Distinction">
                Understand the difference between how much capital is required
                to open a trade and how much capital can actually be lost.
                These are not the same number.
              </Callout>
            </section>

            {/* ============================================
                09 — DRAWDOWN
                ============================================ */}
            <section id="drawdown" className="scroll-mt-24 mb-20">
              <SectionHeader number="09" title="Drawdown" icon={TrendingDown} />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Drawdown is the decline from your account's previous peak to a
                subsequent low. It measures how much ground you have to make up.
              </p>

              <div className="rounded-lg border border-white/[0.06] bg-zinc-950 p-5 mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                  Example
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Peak balance</span>
                    <span className="font-mono text-zinc-300">$10,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Subsequent low</span>
                    <span className="font-mono text-zinc-300">$8,000</span>
                  </div>
                  <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Drawdown</span>
                    <span className="font-mono text-red-400 font-semibold">
                      $2,000
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Percentage drawdown</span>
                    <span className="font-mono text-red-400 font-semibold">
                      20%
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                Drawdown matters for two reasons: mathematically, because
                recovery requires a larger percentage gain than the loss, and
                psychologically, because large drawdowns damage decision
                quality.
              </p>

              <EducationalImage
                title="Drawdown Visualization"
                description="Peak-to-trough decline on an equity curve"
                src="/images/education/drawdown.png"
              />
            </section>

            {/* ============================================
                10 — MATHEMATICS OF LOSS
                ============================================ */}
            <section id="math-of-loss" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="10"
                title="The Mathematics of Loss"
                icon={AlertTriangle}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Losses become increasingly difficult to recover from as they
                grow. This asymmetry is why capital preservation matters more
                than any single win.
              </p>

              <DataTable
                headers={["Loss", "Required Recovery"]}
                rows={[
                  ["10%", "11.11%"],
                  ["20%", "25%"],
                  ["30%", "42.86%"],
                  ["40%", "66.67%"],
                  ["50%", "100%"],
                ]}
                highlightNegative
              />

              <Callout variant="warning" title="Critical Insight">
                A 50% loss requires a 100% gain just to return to break-even.
                The deeper the loss, the more disproportionate the recovery
                must be.
              </Callout>

              <FlowDiagram
                steps={[
                  "Account 100%",
                  "10% Loss → 90%",
                  "20% Loss → 80%",
                  "30% Loss → 70%",
                  "Increasingly difficult recovery",
                ]}
              />

              <EducationalImage
                title="Loss Recovery Curve"
                description="Recovery requirement grows non-linearly with loss size"
                src="/images/education/math-of-loss.png"
              />
            </section>

            {/* ============================================
                11 — LOSING STREAKS
                ============================================ */}
            <section id="losing-streaks" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="11"
                title="Losing Streaks"
                icon={Activity}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Even a profitable strategy will produce losing streaks. The
                question is not whether they will happen — it is whether your
                risk model can survive them.
              </p>

              <div className="rounded-lg border border-white/[0.06] bg-zinc-950 p-5 mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                  Simulation — Starting Balance $10,000
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 rounded-md border border-white/[0.04]">
                    <p className="text-xs text-zinc-500 mb-1">1% Risk</p>
                    <p className="text-[10px] text-zinc-600">per trade</p>
                  </div>
                  <div className="text-center p-3 rounded-md border border-red-500/20 bg-red-500/[0.03]">
                    <p className="text-xs text-red-400 mb-1">5% Risk</p>
                    <p className="text-[10px] text-red-500/60">per trade</p>
                  </div>
                </div>
              </div>

              <DataTable
                headers={["Losses", "1% Risk", "5% Risk"]}
                rows={[
                  ["1 loss", "$9,900", "$9,500"],
                  ["2 losses", "$9,801", "$9,025"],
                  ["3 losses", "$9,703", "$8,574"],
                  ["5 losses", "$9,510", "$7,738"],
                  ["10 losses", "$9,044", "$5,987"],
                ]}
                highlightNegative
              />

              <Callout variant="warning">
                The difference between 1% and 5% risk becomes dramatic after
                only a handful of losses. Aggressive risk damages an account
                quickly and is very hard to recover from.
              </Callout>

              <EducationalImage
                title="Losing Streak Simulation"
                description="Account impact of 1% vs 5% risk across losses"
                src="/images/education/losing-streaks.png"
              />
            </section>

            {/* ============================================
                12 — DAILY LOSS LIMIT
                ============================================ */}
            <section id="daily-loss" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="12"
                title="Daily Loss Limit"
                icon={Clock}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                A daily loss limit is a ceiling on how much you can lose in a
                single trading day. When you hit it, you stop trading.
              </p>

              <div className="rounded-lg border border-white/[0.06] bg-zinc-950 p-5 mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                  Example — 2R Daily Loss Limit
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Trade 1</span>
                    <span className="font-mono text-red-400">−1R</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Trade 2</span>
                    <span className="font-mono text-red-400">−1R</span>
                  </div>
                  <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-sm">
                    <span className="text-zinc-300 font-medium">
                      Daily limit reached
                    </span>
                    <span className="font-mono text-red-400 font-semibold">
                      Stop trading
                    </span>
                  </div>
                </div>
              </div>

              <BulletList
                items={[
                  "Protects against revenge trading.",
                  "Protects against overtrading.",
                  "Protects against emotional decision making.",
                  "Protects against trying to recover losses immediately.",
                ]}
              />

              <Callout variant="info">
                The exact daily limit is a personal trading-plan parameter. It
                should match your strategy's typical daily variance and your
                psychological tolerance.
              </Callout>
            </section>

            {/* ============================================
                13 — WEEKLY & MONTHLY LIMITS
                ============================================ */}
            <section id="weekly-monthly" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="13"
                title="Weekly & Monthly Loss Limits"
                icon={CalendarDaysIcon}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Loss limits can extend beyond a single day. Each level acts as
                a circuit breaker, forcing you to review before continuing.
              </p>

              <DataTable
                headers={["Period", "Example Limit"]}
                rows={[
                  ["Daily", "2R"],
                  ["Weekly", "5R"],
                  ["Monthly", "10R"],
                  ["Maximum account drawdown", "20%"],
                ]}
              />

              <Callout variant="tip" title="Personal Parameter">
                These are examples, not universal rules. The trader should
                define limits appropriate to their own strategy and risk
                tolerance.
              </Callout>
            </section>

            {/* ============================================
                14 — TOTAL ACCOUNT EXPOSURE
                ============================================ */}
            <section id="total-exposure" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="14"
                title="Total Account Exposure"
                icon={Layers}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Risk is not only about one trade at a time. Multiple open
                positions can combine into a much larger total exposure.
              </p>

              <div className="rounded-lg border border-white/[0.06] bg-zinc-950 p-5 mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                  Example — Three Open Trades
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Trade A</span>
                    <span className="font-mono text-red-400">1% risk</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Trade B</span>
                    <span className="font-mono text-red-400">1% risk</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Trade C</span>
                    <span className="font-mono text-red-400">1% risk</span>
                  </div>
                  <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-sm">
                    <span className="text-zinc-300 font-medium">
                      Total potential loss
                    </span>
                    <span className="font-mono text-red-400 font-semibold">
                      3%
                    </span>
                  </div>
                </div>
              </div>

              <Callout variant="warning" title="Critical">
                If all three trades are strongly correlated, the effective
                portfolio risk may be much larger than 3%.
              </Callout>

              <BulletList
                items={[
                  "Correlation — how positions move together.",
                  "Multiple positions — how many trades are open at once.",
                  "Concentration — how much is in one instrument or theme.",
                  "Exposure — total capital at risk across all positions.",
                  "Portfolio risk — the combined effect, not the sum.",
                ]}
              />

              <Callout variant="info" title="Key Concept">
                3 trades are not necessarily 3 independent risks.
              </Callout>
            </section>

            {/* ============================================
                15 — CORRELATION RISK
                ============================================ */}
            <section id="correlation" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="15"
                title="Correlation Risk"
                icon={Activity}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Correlated trades can unintentionally multiply exposure. Two
                positions that look independent may both lose for the same
                reason.
              </p>

              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Common Correlation Examples
              </h3>

              <BulletList
                items={[
                  "EUR/USD and GBP/USD — often move together against the dollar.",
                  "Gold and USD — typically inversely correlated.",
                  "USD/JPY and risk sentiment — safe-haven flows.",
                  "AUD/USD and commodity/risk sentiment — commodity-driven currency.",
                ]}
              />

              <EducationalImage
                title="Correlation Matrix"
                description="Pairwise correlation between common instruments"
                src="/images/education/correlation-matrix.png"
              />

              <Callout variant="warning">
                Multiple correlated positions create hidden concentration. Your
                journal and analytics should track this — not just individual
                trades.
              </Callout>
            </section>

            {/* ============================================
                16 — VOLATILITY & RISK
                ============================================ */}
            <section id="volatility" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="16"
                title="Volatility & Risk"
                icon={Gauge}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Volatility describes how much the market moves. It is a
                structural property of the market — not a signal to avoid it.
              </p>

              <BulletList
                items={[
                  "Normal market movement — baseline volatility.",
                  "High-volatility periods — larger price swings in both directions.",
                  "News releases — sudden spikes in movement.",
                  "Economic announcements — scheduled volatility events.",
                  "ATR as a volatility reference — Average True Range measures recent movement.",
                  "Wider stops during volatility — structural stops need more room.",
                  "Position-size adjustment — smaller size when volatility is elevated.",
                ]}
              />

              <Callout variant="info" title="Rule of Thumb">
                Higher volatility → potentially larger price movement → risk
                parameters may need adjustment. But this does not mean "high
                volatility = don't trade." It means volatility changes the
                structure of risk.
              </Callout>

              <EducationalImage
                title="Volatility & Position Size"
                description="How ATR affects stop distance and position size"
                src="/images/education/volatility.png"
              />
            </section>

            {/* ============================================
                17 — NEWS & EVENT RISK
                ============================================ */}
            <section id="news-risk" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="17"
                title="News & Event Risk"
                icon={Zap}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Scheduled and unscheduled events can disrupt normal risk
                assumptions. Understanding when your normal parameters may
                become unreliable is part of risk management.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { name: "CPI", desc: "Inflation data — major currency mover." },
                  { name: "NFP", desc: "US employment — high volatility event." },
                  { name: "FOMC", desc: "Fed rate decisions — affects USD globally." },
                  { name: "Interest-rate decisions", desc: "Central bank policy shifts." },
                  { name: "Central-bank speeches", desc: "Surprise commentary risk." },
                  { name: "Geopolitical events", desc: "Unpredictable risk-off flows." },
                  { name: "Unexpected news", desc: "Earnings, crises, interventions." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4"
                  >
                    <p className="text-sm font-semibold text-white mb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              <Callout variant="warning" title="Event Risk Chain">
                Event risk → volatility → slippage / execution risk →
                potential loss.
              </Callout>
            </section>

            {/* ============================================
                18 — SLIPPAGE & EXECUTION
                ============================================ */}
            <section id="slippage" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="18"
                title="Slippage & Execution Risk"
                icon={Activity}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                A stop does not guarantee the exact exit price in all market
                conditions. This is a critical distinction.
              </p>

              <BulletList
                items={[
                  "Slippage — difference between expected and executed price.",
                  "Gaps — price jumps over your stop.",
                  "Fast markets — rapid movement overwhelms order flow.",
                  "Low liquidity — thin order books widen fills.",
                  "Spread expansion — cost increases when you need it most.",
                  "News releases — temporary disruptions in execution.",
                ]}
              />

              <Callout variant="warning" title="Critical Truth">
                Planned loss is not always equal to actual execution loss. A
                stop order generally becomes a market order once triggered —
                and market orders fill at whatever price is available.
              </Callout>
            </section>

            {/* ============================================
                19 — TRADING COSTS
                ============================================ */}
            <section id="costs" className="scroll-mt-24 mb-20">
              <SectionHeader number="19" title="Trading Costs" icon={DollarSign} />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Every trade has costs. A strategy that looks profitable before
                costs may not be profitable after.
              </p>

              <BulletList
                items={[
                  "Spread — the difference between bid and ask.",
                  "Commission — broker fee per trade.",
                  "Swap / financing — overnight holding cost.",
                  "Slippage — actual vs expected fill.",
                  "Transaction costs — regulatory, exchange, platform fees.",
                ]}
              />

              <Callout variant="info">
                Risk management should account for costs. A strategy needs to
                clear costs before it can produce a real edge.
              </Callout>
            </section>

            {/* ============================================
                20 — RISK OF RUIN
                ============================================ */}
            <section id="risk-of-ruin" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="20"
                title="Risk of Ruin"
                icon={TrendingDown}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Risk of ruin is the probability that your capital falls to a
                level from which continued trading becomes impossible or
                impractical.
              </p>

              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                What Affects Risk of Ruin
              </h3>

              <BulletList
                items={[
                  "Risk per trade — the largest single lever.",
                  "Win rate — how often your edge appears.",
                  "Reward/risk — how much you win when you win.",
                  "Losing streaks — the shape of variance.",
                  "Starting capital — how much you have to survive with.",
                  "Strategy edge — whether you actually have one.",
                  "Position sizing — whether size is disciplined.",
                ]}
              />

              <Callout variant="success" title="The Core Principle">
                Small controlled losses preserve the ability to continue
                trading. If you cannot survive a realistic losing streak, you
                do not have a durable edge — regardless of how good the setup
                looks.
              </Callout>

              <EducationalImage
                title="Risk of Ruin"
                description="Probability of account failure across different risk levels"
                src="/images/education/risk-of-ruin.png"
              />
            </section>

            {/* ============================================
                21 — SCALING & COMPOUNDING
                ============================================ */}
            <section id="scaling" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="21"
                title="Scaling & Compounding"
                icon={TrendingUp}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Risk sizing can be fixed or percentage-based. Each has
                different implications for growth and drawdown.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <RiskCard title="Fixed-Dollar Risk" tone="neutral" icon={DollarSign}>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    You risk the same dollar amount on every trade. Position
                    size grows or shrinks only with stop distance.
                  </p>
                </RiskCard>

                <RiskCard title="Fixed-Percentage Risk" tone="bullish" icon={Percent}>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    You risk a percentage of your account. Position size
                    scales automatically with balance.
                  </p>
                </RiskCard>
              </div>

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
                Adjusting as the Account Changes
              </h3>

              <FlowDiagram
                steps={[
                  "Account Growth",
                  "Position Size Adjustment",
                  "Account Drawdown",
                  "Position Size Reduction",
                ]}
              />

              <Callout variant="info">
                Position size should not automatically increase just because
                you had several winning trades. Increasing size after every
                win, without discipline, is a common path to blow-up.
              </Callout>
            </section>

            {/* ============================================
                22 — WHEN NOT TO TRADE
                ============================================ */}
            <section id="no-trade" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="22"
                title="When Not to Trade"
                icon={Ban}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Risk management also means recognizing conditions where the
                normal parameters do not apply. Avoid trading when:
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Risk limit already reached for the day.",
                  "Major news is approaching.",
                  "Volatility is excessive for your model.",
                  "Liquidity is poor.",
                  "Setup is unclear.",
                  "Revenge-trading mindset is present.",
                  "Already overexposed across positions.",
                  "Multiple correlated positions open.",
                  "Stop cannot be placed at a logical level.",
                  "Required position size is too large for the account.",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-red-500/15 bg-red-500/[0.02] p-4"
                  >
                    <Ban size={14} className="text-red-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================
                23 — RISK & PSYCHOLOGY
                ============================================ */}
            <section id="psychology" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="23"
                title="Risk Management & Psychology"
                icon={Brain}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Poor risk management creates psychological problems. Good risk
                management prevents them.
              </p>

              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-red-400">
                The Negative Cycle
              </h3>

              <FlowDiagram
                steps={[
                  "Large Position",
                  "Large Unrealized Loss",
                  "Fear",
                  "Moving the Stop",
                  "Holding the Loser",
                  "Larger Loss",
                  "Revenge Trade",
                ]}
              />

              <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                The Positive Cycle
              </h3>

              <FlowDiagram
                steps={[
                  "Controlled Risk",
                  "Small Loss",
                  "Acceptable Emotional Impact",
                  "Follow the Plan",
                  "Continue Trading",
                ]}
              />

              <Callout variant="success">
                Risk management is not just a mathematical discipline — it is
                a psychological one. Small, controlled losses keep you calm
                enough to execute your edge.
              </Callout>
            </section>

            {/* ============================================
                24 — RISK MANAGEMENT PLAN
                ============================================ */}
            <section id="risk-plan" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="24"
                title="Building a Risk Management Plan"
                icon={Target}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                A risk plan is a written document that defines your rules
                before you enter a trade. It removes emotion from the moment.
              </p>

              <div className="rounded-lg border border-white/[0.06] bg-zinc-950 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-5">
                  My Trading Risk Rules
                </p>
                <div className="space-y-3">
                  {[
                    { label: "Account size", value: "$10,000" },
                    { label: "Risk per trade", value: "1%" },
                    { label: "Maximum daily loss", value: "2R" },
                    { label: "Maximum weekly loss", value: "5R" },
                    { label: "Maximum monthly drawdown", value: "10R" },
                    { label: "Maximum open positions", value: "3" },
                    { label: "Maximum total exposure", value: "3%" },
                    { label: "Maximum correlated exposure", value: "2%" },
                    { label: "Maximum leverage", value: "5:1" },
                    { label: "Stop-loss rule", value: "Structural, below swing low" },
                    { label: "Profit-taking rule", value: "Scale at 2R, trail the rest" },
                    { label: "News-event rule", value: "No new positions ±15 min" },
                    { label: "When to stop trading", value: "Daily limit reached" },
                  ].map((rule, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0"
                    >
                      <span className="text-sm text-zinc-500">{rule.label}</span>
                      <span className="text-sm text-zinc-200 font-mono">
                        {rule.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Callout variant="info">
                Print this plan. Keep it visible. Review it weekly. Every
                deviation is a data point — log it in your journal.
              </Callout>
            </section>

            {/* ============================================
                25 — FINAL FRAMEWORK
                ============================================ */}
            <section id="framework" className="scroll-mt-24 mb-20">
              <SectionHeader
                number="25"
                title="The Final Risk Management Framework"
                icon={Shield}
              />

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                Risk management is a chain. Every link depends on the one
                before it. Break one, and the whole framework collapses.
              </p>

              <FlowDiagram
                steps={[
                  "Account Size",
                  "Risk Per Trade",
                  "Stop Location",
                  "Position Size",
                  "Total Exposure",
                  "Drawdown Control",
                  "Execution Risk",
                  "Psychological Control",
                  "Long-Term Survival",
                ]}
              />

              <Callout variant="success" title="The Final Philosophy">
                Don't focus on how much you can make on one trade. Focus on
                how well you can survive hundreds of trades.
              </Callout>
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
                  You've covered the fundamentals of risk management. Next,
                  explore trading psychology to understand how your mind
                  interacts with capital and process.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/education/trading-psychology"
                  className="group rounded-lg border border-white/[0.06] bg-white/[0.01] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.02] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] text-rose-400">
                      <Brain size={16} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-400">
                      Primary
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    Trading Psychology
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
                  href="/education/fundamental-analysis"
                  className="group rounded-lg border border-white/[0.06] bg-white/[0.01] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.02] hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] text-amber-400">
                      <BarChart3 size={16} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      Also Try
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    Fundamental Analysis
                  </h3>
                  <p className="text-xs text-zinc-500 mb-4">
                    Understand economic forces
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

// Helper icon for calendar (avoiding unused import issues)
function CalendarDaysIcon(props: any) {
  return <Clock {...props} />;
}