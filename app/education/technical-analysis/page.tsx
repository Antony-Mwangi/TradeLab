// app/education/technical-analysis/page.tsx
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
  CheckCircle2,
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
} from "lucide-react";

// ===== Image Component (renders real image or fallback placeholder) =====
function ChartImage({
  title,
  description,
  src,
  aspect = "aspect-video",
}: {
  title: string;
  description?: string;
  src: string;
  aspect?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`relative ${aspect} w-full overflow-hidden rounded-2xl border-2 border-dashed border-gray-700 bg-gradient-to-br from-gray-900/60 to-gray-950/60 flex items-center justify-center`}
      >
        <div className="text-center px-6">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Video className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-sm font-semibold text-gray-300">{title}</p>
          {description && (
            <p className="mt-1 text-xs text-gray-500 max-w-md">{description}</p>
          )}
          <p className="mt-2 text-[10px] text-red-400 uppercase tracking-wider font-bold">
            Add image: {src}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/40 group`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={title}
        onError={() => setErrored(true)}
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
      />
      {description && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-xs text-gray-300">{description}</p>
        </div>
      )}
    </div>
  );
}

// ===== Section Heading =====
function SectionHeading({
  number,
  title,
  icon: Icon,
  color = "emerald",
}: {
  number?: string;
  title: string;
  icon: any;
  color?: "emerald" | "blue" | "amber" | "purple" | "rose";
}) {
  const colorMap = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${colorMap[color]}`}
      >
        <Icon size={22} />
      </div>
      <div>
        {number && (
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-0.5">
            Section {number}
          </p>
        )}
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
    </div>
  );
}

// ===== Info Box =====
function InfoBox({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: React.ReactNode;
}) {
  const typeMap = {
    info: {
      bg: "bg-blue-500/5",
      border: "border-blue-500/30",
      icon: Info,
      text: "text-blue-400",
    },
    warning: {
      bg: "bg-amber-500/5",
      border: "border-amber-500/30",
      icon: AlertTriangle,
      text: "text-amber-400",
    },
    tip: {
      bg: "bg-purple-500/5",
      border: "border-purple-500/30",
      icon: Lightbulb,
      text: "text-purple-400",
    },
    danger: {
      bg: "bg-red-500/5",
      border: "border-red-500/30",
      icon: AlertTriangle,
      text: "text-red-400",
    },
  };
  const config = typeMap[type];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-2xl border ${config.border} ${config.bg} p-5 flex gap-4`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.bg} border ${config.border}`}
      >
        <Icon size={16} className={config.text} />
      </div>
      <div className="flex-1">
        {title && (
          <p className={`text-sm font-bold ${config.text} mb-1.5`}>{title}</p>
        )}
        <div className="text-sm text-gray-300 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// ===== Bullet List =====
function BulletList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TechnicalAnalysisPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [progress, setProgress] = useState(0);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setProgress(scrolled);

      // Update active section based on scroll
      const sections = [
        "intro",
        "assumptions",
        "dow-theory",
        "charting",
        "elliott-wave",
        "greater-fool",
        "price-charts",
        "support-resistance",
        "patterns",
        "gaps",
        "triangles",
        "indicators",
        "weaknesses",
      ];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===== Sidebar navigation =====
  const sidebarNav = [
    { id: "intro", label: "Introduction", color: "emerald" },
    { id: "assumptions", label: "Assumptions", color: "emerald" },
    { id: "dow-theory", label: "Dow Theory", color: "blue" },
    { id: "charting", label: "Charting Basics", color: "blue" },
    { id: "elliott-wave", label: "Elliott Wave Theory", color: "blue" },
    { id: "greater-fool", label: "Greater Fool Theory", color: "blue" },
    { id: "price-charts", label: "Price Charts", color: "amber" },
    { id: "support-resistance", label: "Support & Resistance", color: "amber" },
    { id: "patterns", label: "Reversal & Continuation Patterns", color: "purple" },
    { id: "gaps", label: "Gaps", color: "purple" },
    { id: "triangles", label: "Triangles & Flags", color: "purple" },
    { id: "indicators", label: "Indicators", color: "rose" },
    { id: "weaknesses", label: "Weaknesses", color: "rose" },
  ];

  const getColorClasses = (color: string) => {
    const map: Record<string, { bg: string; text: string; border: string }> = {
      emerald: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
      },
      blue: {
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        border: "border-blue-500/20",
      },
      amber: {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/20",
      },
      purple: {
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        border: "border-purple-500/20",
      },
      rose: {
        bg: "bg-rose-500/10",
        text: "text-rose-400",
        border: "border-rose-500/20",
      },
    };
    return map[color] || map.emerald;
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated background orbs */}
      <div className="fixed -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 blur-3xl animate-float pointer-events-none" />
      <div className="fixed -bottom-48 -right-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-emerald-500/10 blur-3xl animate-float animation-delay-600 pointer-events-none" />

      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      <div className="relative">
        {/* MOBILE HEADER */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-800 bg-black/95 px-4 backdrop-blur-lg lg:hidden">
          <Link href="/education" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Trade<span className="text-emerald-400">Lab</span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-900 hover:text-white transition"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        {/* SIDEBAR */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-gray-800 bg-black transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-20 items-center justify-between border-b border-gray-800 px-6">
            <Link href="/education" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20 transition-all group-hover:scale-110">
                <LineChart className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Technical<span className="text-emerald-400">Analysis</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <p className="px-4 mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
              On This Page
            </p>
            <div className="space-y-1">
              {sidebarNav.map((item) => {
                const colors = getColorClasses(item.color);
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition text-left ${
                      isActive
                        ? `${colors.bg} ${colors.text} font-medium`
                        : "text-gray-400 hover:bg-gray-900 hover:text-white"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                        isActive ? "bg-current" : "bg-gray-700"
                      }`}
                    />
                    <span className="flex-1">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="px-4 mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Quick Links
              </p>
              <Link
                href="/education"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 hover:bg-gray-900 hover:text-white transition"
              >
                <GraduationCap size={19} />
                Education Hub
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 hover:bg-gray-900 hover:text-white transition"
              >
                <Home size={19} />
                Dashboard
              </Link>
            </div>
          </nav>

          <div className="border-t border-gray-800 p-4">
            <Link
              href="/education/learning-path"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 text-sm font-bold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/30"
            >
              <Compass className="h-4 w-4" />
              Learning Path
            </Link>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:pl-72">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            {/* PAGE HEADER */}
            <section className="mb-10">
              <Link
                href="/education"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition group mb-4"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Back to Education
              </Link>

              <div className="flex items-center gap-2 mb-3">
                <LineChart className="h-4 w-4 text-blue-400" />
                <p className="text-sm font-medium text-blue-400">
                  Core Subject · Technical Analysis
                </p>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                <span className="text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text">
                  Technical Analysis
                </span>
              </h1>

              <p className="mt-4 max-w-3xl text-base text-gray-400 leading-relaxed">
                A complete guide to understanding how price action, chart
                patterns, and technical indicators help traders forecast market
                movements using historical data.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  45 min read
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen size={12} />
                  13 sections
                </span>
                <span className="flex items-center gap-1.5">
                  <Award size={12} />
                  Intermediate
                </span>
              </div>
            </section>

            {/* SECTION 01 — INTRODUCTION */}
            <section id="intro" className="mb-12 scroll-mt-24">
              <SectionHeading
                number="01"
                title="What is Technical Analysis?"
                icon={LineChart}
                color="emerald"
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

              <div className="mt-6">
                <ChartImage
                  title="Technical Analysis Overview Diagram"
                  description="Visual illustration of technical analysis concepts"
                  src="/images/education/technical-analysis-overview.png"
                />
              </div>
            </section>

            {/* SECTION 02 — ASSUMPTIONS */}
            <section id="assumptions" className="mb-12 scroll-mt-24">
              <SectionHeading
                number="02"
                title="Assumptions of Technical Analysis"
                icon={Brain}
                color="emerald"
              />

              <div className="space-y-4">
                {[
                  {
                    num: "1",
                    title: "Market discounts everything",
                    points: [
                      "Only considers price movements, ignores fundamental factors.",
                      "Assumes stock price reflects everything.",
                      "All fundamentals are priced into the stock.",
                    ],
                  },
                  {
                    num: "2",
                    title: "Prices move in trends",
                    points: [
                      "Price movements are assumed to follow particular trend.",
                      "Most technical strategies are based on this assumption.",
                    ],
                  },
                  {
                    num: "3",
                    title: "History tends to repeat itself",
                    points: [
                      "Market participants provide consistent reaction to similar market stimuli over time.",
                    ],
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-bold">
                        {item.num}
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {item.title}
                      </h3>
                    </div>
                    <BulletList items={item.points} />
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 03 — DOW THEORY */}
            <section id="dow-theory" className="mb-12 scroll-mt-24">
              <SectionHeading
                number="03"
                title="Dow Theory"
                icon={Waves}
                color="blue"
              />

              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                The Dow theory on stock price movement is a form of technical
                analysis. The theory was derived from 255 Wall Street Journal
                editorials written by Charles H. Dow, journalist, founder and
                first editor of the Wall Street Journal and co-founder of Dow
                Jones and Company.
              </p>

              <InfoBox type="info" title="Hypothesis">
                Dow Theory is based on the hypothesis that the stock market does
                not perform on a random basis. Rather, it is guided by some
                specific trends.
              </InfoBox>

              <h3 className="text-lg font-bold text-white mt-6 mb-4">
                Three Types of Specific Trends
              </h3>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Primary Trend",
                    desc: "Primary movement or major trend may last from less than a year to several years. It can be bullish or bearish.",
                    color: "emerald",
                  },
                  {
                    title: "Secondary Trend",
                    desc: "Primary movement or major trend may last from less than a year to several years. It can be bullish or bearish.",
                    color: "blue",
                  },
                  {
                    title: "Minor Trend",
                    desc: "Day to day trend or movements in prices over few days. It is of very short duration.",
                    color: "amber",
                  },
                ].map((trend, i) => {
                  const colors = getColorClasses(trend.color);
                  return (
                    <div
                      key={i}
                      className={`rounded-2xl border ${colors.border} ${colors.bg} p-5`}
                    >
                      <h4 className={`text-base font-bold ${colors.text} mb-2`}>
                        {trend.title}
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {trend.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <ChartImage
                  title="Dow Theory Trends Diagram"
                  description="Illustration of primary, secondary, and minor trends"
                  src="/images/education/dow-theory-trends.png"
                />
              </div>

              <h3 className="text-lg font-bold text-white mt-8 mb-4">
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

            {/* SECTION 04 — CHARTING BASICS */}
            <section id="charting" className="mb-12 scroll-mt-24">
              <SectionHeading
                number="04"
                title="Charting: The Basic Tool"
                icon={BarChart3}
                color="blue"
              />

              <BulletList
                items={[
                  "Motive of identifying price trends based on historical data.",
                  "Trend used to forecast future behavior.",
                  "Used for either a particular security or market in general.",
                  "Both price and volume data are studied simultaneously for both the security as well as the market.",
                ]}
              />

              <div className="mt-6">
                <ChartImage
                  title="Charting Example Diagram"
                  description="Sample chart showing price and volume analysis"
                  src="/images/education/charting-example.png"
                />
              </div>
            </section>

            {/* SECTION 05 — ELLIOTT WAVE THEORY */}
            <section id="elliott-wave" className="mb-12 scroll-mt-24">
              <SectionHeading
                number="05"
                title="Elliott Wave Theory"
                icon={Waves}
                color="blue"
              />

              <BulletList
                items={[
                  "Developed by Ralph Nelson Elliott.",
                  "Theory states that the long term major patterns may consist of five successive steps or five waves.",
                  <>
                    Types of market:{" "}
                    <span className="text-emerald-400 font-semibold">
                      Bull market
                    </span>{" "}
                    and{" "}
                    <span className="text-red-400 font-semibold">
                      Bear market
                    </span>
                    .
                  </>,
                ]}
              />

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="text-base font-bold text-emerald-400 mb-3">
                    Elliott Wave Theory in Bull Market
                  </h4>
                  <ChartImage
                    title="Bull Market Elliott Wave Diagram"
                    description="5-wave bullish pattern illustration"
                    src="/images/education/elliott-wave-bull.png"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-red-400 mb-3">
                    Elliott Wave Theory in Bear Market
                  </h4>
                  <ChartImage
                    title="Bear Market Elliott Wave Diagram"
                    description="5-wave bearish pattern illustration"
                    src="/images/education/elliott-wave-bear.png"
                  />
                </div>
              </div>

              <h4 className="text-base font-bold text-white mt-8 mb-3">
                Real Life Example
              </h4>
              <ChartImage
                title="Real Life Elliott Wave Example"
                description="Actual chart showing Elliott Wave pattern"
                src="/images/education/elliott-wave-reallife.png"
              />
            </section>

            {/* SECTION 06 — GREATER FOOL THEORY */}
            <section id="greater-fool" className="mb-12 scroll-mt-24">
              <SectionHeading
                number="06"
                title="Greater Fool Theory"
                icon={Lightbulb}
                color="blue"
              />

              <InfoBox type="tip">
                The belief that we can always buy investments at any given
                price, setting aside valuations, and eventually turning them
                into a profit because there will always be a "Greater Fool"
                willing to pay the higher price.
              </InfoBox>

              <div className="mt-6">
                <ChartImage
                  title="Greater Fool Theory Illustration"
                  description="Conceptual diagram of the greater fool theory"
                  src="/images/education/greater-fool-theory.png"
                />
              </div>
            </section>

            {/* SECTION 07 — PRICE CHARTS */}
            <section id="price-charts" className="mb-12 scroll-mt-24">
              <SectionHeading
                number="07"
                title="Price Charts"
                icon={Activity}
                color="amber"
              />

              <h3 className="text-lg font-bold text-white mb-3">
                Key Price Points
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  "Opening Price",
                  "High Price",
                  "Low Price",
                  "Closing Price",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-800 bg-gray-900/40 p-4 text-center"
                  >
                    <p className="text-sm font-semibold text-amber-400">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bar Charts */}
              <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <BarChart3 size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-white">Bar Charts</h3>
                </div>
                <BulletList
                  items={[
                    "This is a popular technique of showing the price variation and volume on a particular day.",
                    "The chart is made up of a series of vertical lines that represent each data point.",
                    "This vertical line represents the high and low for the trading period, along with the closing price.",
                    "The close and open are represented on the vertical line by a horizontal dash.",
                  ]}
                />
                <div className="mt-4">
                  <ChartImage
                    title="Bar Chart Example"
                    description="Sample bar chart showing OHLC data"
                    src="/images/education/bar-chart.png"
                  />
                </div>
              </div>

              {/* Line Chart */}
              <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <LineChart size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-white">Line Chart</h3>
                </div>
                <BulletList
                  items={[
                    "Line chart represents any variable over a set period of time.",
                    "The line is formed by connecting value of represented variable over the time frame.",
                    "Line charts do not provide visual information of the trading range for the individual points such as the high, low and opening prices and closing price.",
                    "They depict any variable like volume of a security, index number, price etc.",
                  ]}
                />
                <div className="mt-4">
                  <ChartImage
                    title="Line Chart Example"
                    description="Sample line chart showing price over time"
                    src="/images/education/line-chart.png"
                  />
                </div>
              </div>

              {/* Point and Figure */}
              <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <HashIcon size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Point and Figure Chart
                  </h3>
                </div>
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
                <div className="mt-4">
                  <ChartImage
                    title="Point and Figure Chart Example"
                    description="Sample P&F chart with X and O columns"
                    src="/images/education/point-figure-chart.png"
                  />
                </div>
              </div>

              {/* Candlestick Chart */}
              <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Layers size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Candlestick Chart
                  </h3>
                </div>
                <BulletList
                  items={[
                    "Similar to the bar chart, the candlestick also has a thin vertical line showing the period's trading range.",
                    "Candlesticks rely heavily on the use of colors to explain what has happened during the trading period. There are two color constructs for days up and one for days that the price falls.",
                    "When the price of the stock is up and closes above the opening trade, the candlestick will usually be white or clear. If the stock has traded down for the period, then the candlestick will usually be red or black.",
                    "If the stock's price has closed above the previous day's close but below the day's open, the candlestick will be black or filled with the color that is used to indicate an up day.",
                  ]}
                />
                <div className="mt-4">
                  <ChartImage
                    title="Candlestick Chart Example"
                    description="Sample candlestick chart with bullish and bearish candles"
                    src="/images/education/candlestick-chart.png"
                  />
                </div>

                {/* Data table */}
                <div className="mt-6">
                  <h4 className="text-sm font-bold text-white mb-3">
                    Example Data Table
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-gray-800">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-950 border-b border-gray-800">
                        <tr>
                          <th className="px-3 py-2 text-left text-gray-400 font-semibold">
                            Date
                          </th>
                          <th className="px-3 py-2 text-right text-gray-400 font-semibold">
                            Open
                          </th>
                          <th className="px-3 py-2 text-right text-gray-400 font-semibold">
                            High
                          </th>
                          <th className="px-3 py-2 text-right text-gray-400 font-semibold">
                            Low
                          </th>
                          <th className="px-3 py-2 text-right text-gray-400 font-semibold">
                            Close
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/50 text-gray-300">
                        {[
                          ["22 March, 2016", "196.8", "198.25", "194.5", "197.5"],
                          ["23 March, 2016", "196.9", "197.6", "195.3", "196.6"],
                          ["24 March, 2016", "196.6", "196.6", "196.6", "196.6"],
                          ["25 March, 2016", "196.6", "196.6", "196.6", "196.6"],
                          ["28 March, 2016", "195.8", "198.25", "187.65", "188.3"],
                          ["29 March, 2016", "188.5", "191.25", "186.65", "189.5"],
                          ["30 March, 2016", "192.25", "198.3", "190.5", "197.55"],
                          ["31 March, 2016", "197.85", "198.75", "192.35", "194.25"],
                          ["1 April, 2016", "193.7", "197.25", "192", "195.65"],
                        ].map((row, i) => (
                          <tr key={i} className="hover:bg-gray-900/40">
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className={`px-3 py-2 ${
                                  j === 0
                                    ? "font-medium text-white"
                                    : "text-right font-mono"
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
              </div>
            </section>

            {/* SECTION 08 — SUPPORT & RESISTANCE */}
            <section id="support-resistance" className="mb-12 scroll-mt-24">
              <SectionHeading
                number="08"
                title="Support and Resistance Levels"
                icon={Target}
                color="amber"
              />

              <div className="grid gap-6 lg:grid-cols-2 mb-6">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <ArrowUpRight className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-lg font-bold text-emerald-400">
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

                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <ArrowDownRight className="h-5 w-5 text-red-400" />
                    <h3 className="text-lg font-bold text-red-400">
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

              <ChartImage
                title="Support and Resistance Diagram"
                description="Chart showing support and resistance levels with price bouncing between them"
                src="/images/education/support-resistance.png"
              />
            </section>

            {/* SECTION 09 — PATTERNS */}
            <section id="patterns" className="mb-12 scroll-mt-24">
              <SectionHeading
                number="09"
                title="Reversal & Continuation Patterns"
                icon={Activity}
                color="purple"
              />

              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-5">
                  <h3 className="text-base font-bold text-purple-400 mb-3">
                    Reversal Patterns
                  </h3>
                  <BulletList
                    items={[
                      "Indicate a reversal of existing trend.",
                      "Can further be classified as bullish patterns or bearish patterns.",
                    ]}
                  />
                </div>
                <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-5">
                  <h3 className="text-base font-bold text-blue-400 mb-3">
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

              {/* Head and Shoulders */}
              <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  Head and Shoulders
                </h3>
                <BulletList
                  items={[
                    "The head-and-shoulders top signals to chart users that a security's price is likely to make a downward move, especially after it breaks below the neckline of the pattern.",
                    "Due to this pattern forming mostly at the peaks of upward trends, it is considered to be a trend-reversal pattern, as the security heads down after the pattern's completion.",
                  ]}
                />
                <div className="mt-4">
                  <ChartImage
                    title="Head and Shoulders Pattern"
                    description="Illustration of head and shoulders reversal pattern"
                    src="/images/education/head-shoulders.png"
                  />
                </div>
              </div>

              {/* Inverted Head and Shoulders */}
              <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  Inverted Head and Shoulder
                </h3>
                <BulletList
                  items={[
                    "The inverted head-and-shoulders pattern is the exact opposite of the head-and-shoulders top, as it signals that the security is set to make an upward move.",
                    "Often coming at the end of a downtrend, the inverse head and shoulders is considered to be a reversal pattern, as the security typically heads higher after the completion of the pattern.",
                  ]}
                />
                <div className="mt-4">
                  <ChartImage
                    title="Inverted Head and Shoulders Pattern"
                    description="Illustration of inverted head and shoulders pattern"
                    src="/images/education/inverted-head-shoulders.png"
                  />
                </div>
              </div>

              {/* Double Tops and Bottoms */}
              <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  Double Tops and Bottoms
                </h3>
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

                <div className="grid gap-6 lg:grid-cols-2 mt-6">
                  <div>
                    <h4 className="text-base font-bold text-red-400 mb-3">
                      Double Top
                    </h4>
                    <BulletList
                      items={[
                        "Found at the peaks of an upward trend and is a clear signal that the preceding upward trend is weakening.",
                        "Buyers are losing interest.",
                        "Upon completion of this pattern, the trend is considered to be reversed and the security is expected to move lower.",
                      ]}
                    />
                    <div className="mt-4">
                      <ChartImage
                        title="Double Top Pattern"
                        description="M-shaped double top pattern"
                        src="/images/education/double-top.png"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-emerald-400 mb-3">
                      Double Bottom
                    </h4>
                    <BulletList
                      items={[
                        "A double bottom appears when a share hits a low, comes higher, again pulls back.",
                        "Appears at the end of a bearish trend and indicates the start of the bullish trend.",
                      ]}
                    />
                    <div className="mt-4">
                      <ChartImage
                        title="Double Bottom Pattern"
                        description="W-shaped double bottom pattern"
                        src="/images/education/double-bottom.png"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-gray-800 bg-gray-950 p-4">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    <span className="font-bold text-white">Key Phases:</span>{" "}
                    Price Trend → First Trough → Peak → Second Trough → Advance
                    From Trough → Resistance Break → Resistance Turned Support
                    → Price Target.
                  </p>
                </div>
              </div>

              {/* Rounding Bottom */}
              <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  Rounding Bottom
                </h3>
                <BulletList
                  items={[
                    "The Rounding Bottom is a long-term reversal pattern that is best suited for weekly charts.",
                    "It is also referred to as a saucer bottom, and represents a long consolidation period that turns from a bearish bias to a bullish bias.",
                  ]}
                />
                <div className="mt-4">
                  <ChartImage
                    title="Rounding Bottom Pattern"
                    description="Saucer-shaped rounding bottom chart"
                    src="/images/education/rounding-bottom.png"
                  />
                </div>
              </div>

              {/* Cup and Handle */}
              <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  The Cup and the Handle
                </h3>
                <BulletList
                  items={[
                    "The Cup with Handle is a bullish continuation pattern that marks a consolidation period followed by a breakout.",
                    "As its name implies, there are two parts to the pattern: the cup and the handle.",
                    "The cup forms after an advance and looks like a bowl or rounding bottom.",
                    "As the cup is completed, a trading range develops on the right hand side and the handle is formed.",
                    "A subsequent breakout from the handle's trading range signals a continuation of the prior advance.",
                  ]}
                />
                <div className="mt-4">
                  <ChartImage
                    title="Cup and Handle Pattern"
                    description="Classic cup and handle formation"
                    src="/images/education/cup-handle.png"
                  />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-2">
                      Procter and Gamble Stock Chart
                    </h4>
                    <ChartImage
                      title="Procter and Gamble Stock Chart"
                      description="Real example chart"
                      aspect="aspect-square"
                      src="/images/education/pg-stock-chart.png"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-2">
                      Amazon Stock Price Chart
                    </h4>
                    <ChartImage
                      title="Amazon Stock Price Chart"
                      description="Real example chart"
                      aspect="aspect-square"
                      src="/images/education/amazon-stock-chart.png"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10 — GAPS */}
            <section id="gaps" className="mb-12 scroll-mt-24">
              <SectionHeading
                number="10"
                title="Gaps"
                icon={Activity}
                color="purple"
              />

              <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  Understanding Gaps
                </h3>
                <BulletList
                  items={[
                    "Gaps occur when a price opens much higher (gap higher) or lower (gap lower) than the previous day's close.",
                    "Once a gap occurs, the new price represents an important price level. Gaps higher create support that should allow the stock to move higher and gaps lower create resistance that should pressure the stock lower.",
                    "Until the gap is violated, we should assume the trend will continue in the gap's direction.",
                  ]}
                />
                <div className="mt-4">
                  <ChartImage
                    title="Gaps Diagram"
                    description="Chart showing gap up and gap down examples"
                    src="/images/education/gaps-diagram.png"
                  />
                </div>
              </div>

              {/* Breakaway Gaps */}
              <div className="mb-6 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="text-lg font-bold text-emerald-400 mb-3">
                  Breakaway Gaps
                </h3>
                <BulletList
                  items={[
                    "They occur when the price action is breaking out of their trading range or congestion area.",
                    "A congestion area is just a price range in which the market has traded for some period of time, usually a few weeks or so.",
                    "To break out of these areas requires market enthusiasm and, either, many more buyers than sellers for upside breakouts or more sellers than buyers for downside breakouts.",
                  ]}
                />
                <div className="mt-4">
                  <ChartImage
                    title="Breakaway Gaps Diagram"
                    description="Chart showing breakout from congestion"
                    src="/images/education/breakaway-gaps.png"
                  />
                </div>
              </div>

              {/* Runaway Gaps */}
              <div className="mb-6 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="text-lg font-bold text-blue-400 mb-3">
                  Runaway Gaps
                </h3>
                <BulletList
                  items={[
                    "Runaway gaps are also called measuring gaps, and are best described as gaps that are caused by increased interest in the stock.",
                    "For runaway gaps to the upside, it usually represents traders who did not get in during the initial move of the up trend and while waiting for a retracement in price, decided it was not going to happen.",
                    "Increased buying interest happens all of a sudden, and the price gaps above the previous day's close. This type of runaway gap represents an almost panic state in traders.",
                  ]}
                />
                <div className="mt-4">
                  <ChartImage
                    title="Runaway Gaps Diagram"
                    description="Chart showing mid-trend runaway gap"
                    src="/images/education/runaway-gaps.png"
                  />
                </div>
              </div>

              {/* Exhaustion Gaps */}
              <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="text-lg font-bold text-amber-400 mb-3">
                  Exhaustion Gaps
                </h3>
                <BulletList
                  items={[
                    "Exhaustion gaps are those that happen near the end of a good up- or downtrend. They are many times the first signal of the end of that move.",
                    "They are identified by high volume and large price difference between the previous day's close and the new opening price.",
                    "They can easily be mistaken for runaway gaps if one does not notice the exceptionally high volume.",
                  ]}
                />
                <div className="mt-4">
                  <ChartImage
                    title="Exhaustion Gaps Diagram"
                    description="Chart showing exhaustion gap at trend end"
                    src="/images/education/exhaustion-gaps.png"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 11 — TRIANGLES AND FLAGS */}
            <section id="triangles" className="mb-12 scroll-mt-24">
              <SectionHeading
                number="11"
                title="Triangles and Flags"
                icon={Activity}
                color="purple"
              />

              {/* Triangles */}
              <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  Triangles
                </h3>
                <BulletList
                  items={[
                    "A triangle is formed when each succeeding peak is lower than the previous peak.",
                    "Or each succeeding bottom is higher than the previous bottom.",
                    "The series of peaks and bottoms are joined by a line which converges and form a shape of triangle.",
                  ]}
                />

                <div className="grid gap-6 lg:grid-cols-3 mt-6">
                  <div>
                    <h4 className="text-sm font-bold text-blue-400 mb-3">
                      Symmetric Triangle
                    </h4>
                    <ChartImage
                      title="Symmetric Triangle Pattern"
                      description="Converging trendlines"
                      aspect="aspect-square"
                      src="/images/education/symmetric-triangle.png"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 mb-3">
                      Ascending Triangle (Bullish)
                    </h4>
                    <ChartImage
                      title="Ascending Triangle Pattern"
                      description="Bullish triangle with flat top"
                      aspect="aspect-square"
                      src="/images/education/ascending-triangle.png"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-400 mb-3">
                      Descending Triangle (Bearish)
                    </h4>
                    <ChartImage
                      title="Descending Triangle Pattern"
                      description="Bearish triangle with flat bottom"
                      aspect="aspect-square"
                      src="/images/education/descending-triangle.png"
                    />
                  </div>
                </div>
              </div>

              {/* Flags */}
              <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="text-lg font-bold text-white mb-3">Flags</h3>
                <BulletList
                  items={[
                    "A flag pattern appears when a bull rally or a bear phase is interrupted by a consolidation pattern appearing as a rectangle or a parallelogram.",
                    "As the flag formation indicates a pause before continuation of earlier trend, the prices move in the same direction after the flag as before.",
                  ]}
                />
                <div className="mt-4">
                  <h4 className="text-sm font-bold text-purple-400 mb-3">
                    Parallelogram Flag
                  </h4>
                  <ChartImage
                    title="Parallelogram Flag Pattern"
                    description="Flag formation during trend"
                    src="/images/education/parallelogram-flag.png"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 12 — INDICATORS */}
            <section id="indicators" className="mb-12 scroll-mt-24">
              <SectionHeading
                number="12"
                title="Indicator Analysis"
                icon={Gauge}
                color="rose"
              />

              <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 mb-6">
                <BulletList
                  items={[
                    "It's a mathematical examination of price and volume information over a given period.",
                    "Objective: To predict where and in which direction the price may move in near future.",
                    "Attempts to establish a mathematical relationship of current price past prices.",
                  ]}
                />
              </div>

              {/* Moving Averages */}
              <div className="mb-6 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Activity size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Moving Averages
                  </h3>
                </div>
                <BulletList
                  items={[
                    "It refers to average level of closing prices, calculated on regular basis.",
                    "A sequence of averages is calculated by calculating averages on daily basis.",
                  ]}
                />
                <div className="mt-4">
                  <ChartImage
                    title="Moving Average Example"
                    description="Chart showing moving average line over price"
                    src="/images/education/moving-average.png"
                  />
                </div>
              </div>

              {/* RSI */}
              <div className="mb-6 rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Percent size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Relative Strength Index (RSI)
                  </h3>
                </div>
                <BulletList
                  items={[
                    "Developed by J. Welles Wilder, the Relative Strength Index (RSI) is a momentum oscillator that measures the speed and change of price movements.",
                  ]}
                />

                <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                  <p className="text-xs font-bold text-blue-400 mb-2">
                    RSI Formula
                  </p>
                  <p className="text-sm font-mono text-white">
                    RSI = 100 - 100 / (1 + RS)
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    Where RS = average of x days' up closes / average of x days'
                    down closes.
                  </p>
                </div>

                <div className="mt-4">
                  <ChartImage
                    title="RSI Example Chart"
                    description="Chart showing RSI indicator below price"
                    src="/images/education/rsi-chart.png"
                  />
                </div>
              </div>

              {/* Crossover */}
              <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <MousePointer size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-white">Crossover</h3>
                </div>
                <BulletList
                  items={[
                    "Crossover is the point on a stock chart when a security and an indicator intersect.",
                    "Crossovers are used by technical analysts to aid in forecasting the future movements in the price of a stock.",
                  ]}
                />
                <div className="mt-4">
                  <ChartImage
                    title="Crossover Example"
                    description="Chart showing crossover point between price and indicator"
                    src="/images/education/crossover.png"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 13 — WEAKNESSES */}
            <section id="weaknesses" className="mb-12 scroll-mt-24">
              <SectionHeading
                number="13"
                title="Weaknesses of Technical Analysis"
                icon={AlertTriangle}
                color="rose"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Experience",
                    desc: "Careful identification and interpretation of pattern requires a lot of experience.",
                  },
                  {
                    title: "Biasness",
                    desc: "Must be free from biasness of technical analyst.",
                  },
                  {
                    title: "Quickness in Identification",
                    desc: "The technical analyst must be a quick identifier of the pattern.",
                  },
                  {
                    title: "Long Term Perspective",
                    desc: "Emphasis in the technical analysis should always be on the long term pattern.",
                  },
                  {
                    title: "Not Suitable for New Listings",
                    desc: "Cannot be applied to new securities without historical data.",
                  },
                  {
                    title: "Cannot Forecast New Phenomenon",
                    desc: "Cannot forecast unforeseen events like the 2008 financial crisis.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                      <h4 className="text-sm font-bold text-red-400">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* NEXT STEPS */}
            <section className="rounded-2xl border border-gray-800 bg-gradient-to-br from-blue-950/30 via-cyan-950/30 to-emerald-950/30 p-6 lg:p-8 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Rocket size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">
                    Continue Learning
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    You've covered the fundamentals of technical analysis. Next,
                    explore fundamental analysis to understand how economic
                    events drive currency prices.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/education/fundamental-analysis"
                  className="group rounded-xl border border-gray-800 bg-gray-900/40 p-4 hover:border-amber-500/30 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-amber-400" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white group-hover:text-amber-400 transition">
                        Fundamental Analysis
                      </p>
                      <p className="text-xs text-gray-500">
                        Next recommended topic
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

                <Link
                  href="/education/risk-management"
                  className="group rounded-xl border border-gray-800 bg-gray-900/40 p-4 hover:border-purple-500/30 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white group-hover:text-purple-400 transition">
                        Risk Management
                      </p>
                      <p className="text-xs text-gray-500">
                        Essential for live trading
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}