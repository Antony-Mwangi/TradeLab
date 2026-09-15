// app/education/page.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  TrendingUp,
  BarChart3,
  Brain,
  Shield,
  Target,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  LineChart,
  Activity,
  Zap,
  Award,
  Users,
  Video,
  FileText,
  BookMarked,
  Lightbulb,
  Rocket,
  Flame,
  Library,
  Compass,
  X,
  Menu,
  Home,
  LayoutDashboard,
} from "lucide-react";

export default function EducationPage() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ===== Sidebar navigation items — NOW WITH HREFS =====
  const sidebarNav = [
    {
      href: "/education",
      label: "Overview",
      icon: LayoutDashboard,
      color: "emerald",
    },
    {
      href: "/education/market-mechanics",
      label: "Market Mechanics",
      icon: BookOpen,
      color: "emerald",
    },
    {
      href: "/education/technical-analysis",
      label: "Technical Analysis",
      icon: LineChart,
      color: "blue",
    },
    {
      href: "/education/fundamental-analysis",
      label: "Fundamental Analysis",
      icon: BarChart3,
      color: "amber",
    },
    {
      href: "/education/risk-management",
      label: "Risk Management",
      icon: Shield,
      color: "purple",
    },
    {
      href: "/education/trading-psychology",
      label: "Trading Psychology",
      icon: Brain,
      color: "rose",
    },
    {
      href: "/education/learning-path",
      label: "Learning Path",
      icon: Compass,
      color: "cyan",
    },
  ];

  // ===== 5 Core Subject Categories =====
  const coreSubjects = [
    {
      icon: BookOpen,
      title: "Market Mechanics & Terminology",
      slug: "market-mechanics",
      description:
        "Understand how currency pairs work, major/minor/exotic pairs, and basic metrics like pips, spreads, lots, and leverage/margin.",
      topics: ["Currency Pairs", "Pips & Spreads", "Leverage & Margin", "Lot Sizes"],
      color: "emerald",
      duration: "2-3 weeks",
      level: "Beginner",
    },
    {
      icon: LineChart,
      title: "Technical Analysis",
      slug: "technical-analysis",
      description:
        "Learn how to read price charts, identify trends, support and resistance levels, and use technical indicators like Moving Averages, RSI, and MACD.",
      topics: ["Candlestick Patterns", "Support & Resistance", "Moving Averages", "RSI & MACD"],
      color: "blue",
      duration: "4-6 weeks",
      level: "Beginner to Intermediate",
    },
    {
      icon: BarChart3,
      title: "Fundamental Analysis",
      slug: "fundamental-analysis",
      description:
        "Study how global macroeconomics—central bank interest rates, inflation data, employment reports, and geopolitical events—drive currency valuations.",
      topics: ["Interest Rates", "Inflation Data", "Employment Reports", "Geopolitical Events"],
      color: "amber",
      duration: "3-4 weeks",
      level: "Intermediate",
    },
    {
      icon: Shield,
      title: "Risk Management",
      slug: "risk-management",
      description:
        "Master capital protection rules, position sizing, stop-loss and take-profit orders, and never risking more than 1% to 2% per trade.",
      topics: ["Position Sizing", "Stop-Loss Orders", "Risk-Reward Ratio", "Capital Protection"],
      color: "purple",
      duration: "1-2 weeks",
      level: "Essential",
    },
    {
      icon: Brain,
      title: "Trading Psychology",
      slug: "trading-psychology",
      description:
        "Develop emotional discipline to manage greed, fear, and impatience, recognizing that psychological control is the biggest hurdle to consistency.",
      topics: ["Emotional Control", "Discipline", "Patience", "Mindset Mastery"],
      color: "rose",
      duration: "Ongoing",
      level: "Advanced",
    },
  ];

  // ===== Color helper =====
  const getColorClasses = (color: string) => {
    const map: Record<
      string,
      { bg: string; text: string; border: string; gradient: string }
    > = {
      emerald: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
        gradient: "from-emerald-500 to-cyan-500",
      },
      blue: {
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        border: "border-blue-500/20",
        gradient: "from-blue-500 to-cyan-500",
      },
      amber: {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/20",
        gradient: "from-amber-500 to-orange-500",
      },
      purple: {
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        border: "border-purple-500/20",
        gradient: "from-purple-500 to-pink-500",
      },
      rose: {
        bg: "bg-rose-500/10",
        text: "text-rose-400",
        border: "border-rose-500/20",
        gradient: "from-rose-500 to-pink-500",
      },
      cyan: {
        bg: "bg-cyan-500/10",
        text: "text-cyan-400",
        border: "border-cyan-500/20",
        gradient: "from-cyan-500 to-emerald-500",
      },
    };
    return map[color] || map.emerald;
  };

  // ===== Check if a nav item is active based on current pathname =====
  const isActive = (href: string) => {
    if (href === "/education") {
      return pathname === "/education";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated background orbs */}
      <div className="fixed -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 blur-3xl animate-float" />
      <div className="fixed -bottom-48 -right-48 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-emerald-500/10 blur-3xl animate-float animation-delay-600" />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-emerald-400/5 to-cyan-400/5 blur-3xl animate-pulse-slow" />

      <div className="relative">
        {/* ============================================
            MOBILE HEADER
            ============================================ */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-800 bg-black/95 px-4 backdrop-blur-lg lg:hidden">
          <Link href="/" className="flex items-center gap-2">
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

        {/* ============================================
            SIDEBAR
            ============================================ */}
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
          {/* Sidebar header */}
          <div className="flex h-20 items-center justify-between border-b border-gray-800 px-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20 transition-all group-hover:scale-110">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Trade<span className="text-emerald-400">Lab</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar nav — NOW USES LINK */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <p className="px-4 mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Education Library
            </p>
            <div className="space-y-1">
              {sidebarNav.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                const colors = getColorClasses(item.color);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition group ${
                      active
                        ? `${colors.bg} ${colors.text} font-medium`
                        : "text-gray-400 hover:bg-gray-900 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={19}
                      className="shrink-0 transition-transform group-hover:scale-110"
                    />
                    <span className="flex-1 text-left">{item.label}</span>
                    {active && (
                      <span
                        className={`h-1.5 w-1.5 rounded-full bg-current`}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Back to dashboard */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="px-4 mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Quick Links
              </p>
              <Link
                href="/dashboard"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 hover:bg-gray-900 hover:text-white transition"
              >
                <Home size={19} />
                Dashboard
              </Link>
              <Link
                href="/blog"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 hover:bg-gray-900 hover:text-white transition"
              >
                <FileText size={19} />
                Blog
              </Link>
            </div>
          </nav>

          {/* Sidebar footer — CTA */}
          <div className="border-t border-gray-800 p-4">
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 text-sm font-bold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/30"
            >
              <Rocket className="h-4 w-4" />
              Start Trading
            </Link>
          </div>
        </aside>

        {/* ============================================
            MAIN CONTENT
            ============================================ */}
        <main className="lg:pl-72">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Page header */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-4 w-4 text-emerald-400" />
                <p className="text-sm font-medium text-emerald-400">
                  Forex Education Library
                </p>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Master the Art of{" "}
                <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">
                  Forex Trading
                </span>
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-gray-400 leading-relaxed">
                Pick a subject from the sidebar or click a card below. Each
                guide contains structured lessons, real examples, and key
                takeaways.
              </p>
            </section>

            {/* Quick stats */}
            <section className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5 hover:border-emerald-500/30 transition-all hover:scale-[1.02]">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Subjects
                </p>
                <p className="mt-2 text-2xl font-bold text-emerald-400">5</p>
                <p className="text-xs text-gray-500 mt-1">Complete guides</p>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5 hover:border-blue-500/30 transition-all hover:scale-[1.02]">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Lessons
                </p>
                <p className="mt-2 text-2xl font-bold text-blue-400">100+</p>
                <p className="text-xs text-gray-500 mt-1">Structured topics</p>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5 hover:border-amber-500/30 transition-all hover:scale-[1.02]">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Duration
                </p>
                <p className="mt-2 text-2xl font-bold text-amber-400">3-6</p>
                <p className="text-xs text-gray-500 mt-1">Months to mastery</p>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5 hover:border-purple-500/30 transition-all hover:scale-[1.02]">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Level
                </p>
                <p className="mt-2 text-2xl font-bold text-purple-400">All</p>
                <p className="text-xs text-gray-500 mt-1">Beginner to pro</p>
              </div>
            </section>

            {/* ============================================
                SUBJECTS GRID
                ============================================ */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Core Subjects
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Click any subject to open its guide
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {coreSubjects.map((subject, index) => {
                  const colors = getColorClasses(subject.color);
                  return (
                    <Link
                      key={index}
                      href={`/education/${subject.slug}`}
                      className="group relative bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl border border-gray-800 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                        >
                          <subject.icon className="h-6 w-6" />
                        </div>
                        <span
                          className={`rounded-full border ${colors.border} ${colors.bg} ${colors.text} px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider`}
                        >
                          {subject.level}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {subject.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-3">
                        {subject.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {subject.topics.slice(0, 3).map((topic, i) => (
                          <span
                            key={i}
                            className={`inline-block rounded-full border ${colors.border} ${colors.bg} px-2.5 py-0.5 text-[10px] ${colors.text}`}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 pt-4 border-t border-gray-800 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock className="h-3.5 w-3.5" />
                          {subject.duration}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold ${colors.text} group-hover:gap-2 transition-all`}
                        >
                          Open
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  );
                })}

                {/* Learning Path — 6th card */}
                <Link
                  href="/education/learning-path"
                  className="group relative bg-gradient-to-br from-emerald-950/40 via-cyan-950/30 to-black/50 rounded-2xl border border-emerald-500/20 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Compass className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                      Roadmap
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Complete Learning Path
                  </h3>

                  <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-3">
                    A structured 5-step roadmap from beginner to consistent
                    trader — with timeline, study plan, and milestones.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {["5 Steps", "3-6 Months", "Beginner"].map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-0.5 text-[10px] text-emerald-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-emerald-500/10 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Rocket className="h-3.5 w-3.5" />
                      Start here
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:gap-2 transition-all">
                      View
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </div>
            </section>

            {/* ============================================
                WHERE TO BEGIN
                ============================================ */}
            <section className="mb-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    New to Forex? Where to Begin
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Follow this simple order if you're just getting started.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    step: "01",
                    title: "Start with Theory",
                    desc: "Begin with Market Mechanics to understand the basics.",
                    href: "/education/market-mechanics",
                    color: "emerald",
                    icon: BookOpen,
                  },
                  {
                    step: "02",
                    title: "Learn to Read Charts",
                    desc: "Move to Technical Analysis to identify trends.",
                    href: "/education/technical-analysis",
                    color: "blue",
                    icon: LineChart,
                  },
                  {
                    step: "03",
                    title: "Master Risk First",
                    desc: "Learn Risk Management before risking real capital.",
                    href: "/education/risk-management",
                    color: "purple",
                    icon: Shield,
                  },
                ].map((item, i) => {
                  const colors = getColorClasses(item.color);
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      className="group rounded-xl border border-gray-800 bg-gray-950/60 p-5 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/30 hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-3xl font-extrabold ${colors.text}/40 group-hover:${colors.text} transition-colors`}
                        >
                          {item.step}
                        </span>
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors.bg} ${colors.text}`}
                        >
                          <item.icon className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* ============================================
                WHAT'S INSIDE
                ============================================ */}
            <section className="mb-8">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-white">
                  What's Inside Each Guide
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Every subject page contains structured, practical content.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: BookOpen,
                    title: "Structured Lessons",
                    desc: "Bite-sized lessons that build on each other.",
                    color: "emerald",
                  },
                  {
                    icon: Lightbulb,
                    title: "Real Examples",
                    desc: "Practical examples from live markets.",
                    color: "amber",
                  },
                  {
                    icon: Video,
                    title: "Visual Charts",
                    desc: "Annotated charts and diagrams.",
                    color: "blue",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Key Takeaways",
                    desc: "Summary points at the end.",
                    color: "purple",
                  },
                ].map((item, i) => {
                  const colors = getColorClasses(item.color);
                  return (
                    <div
                      key={i}
                      className="group rounded-2xl border border-gray-800 bg-gray-900/40 p-5 text-center transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/30 hover:shadow-xl"
                    >
                      <div
                        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-sm font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ============================================
                FINAL NOTE
                ============================================ */}
            <section className="rounded-2xl border border-gray-800 bg-gradient-to-br from-emerald-950/20 via-cyan-950/20 to-purple-950/20 p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white mb-2">
                    Remember
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Forex trading is a journey, not a destination. The most
                    successful traders are those who commit to{" "}
                    <span className="text-white font-semibold">
                      continuous learning
                    </span>
                    , maintain{" "}
                    <span className="text-white font-semibold">
                      disciplined risk management
                    </span>
                    , and develop{" "}
                    <span className="text-white font-semibold">
                      emotional resilience
                    </span>{" "}
                    through consistent practice and reflection.
                  </p>
                </div>
                <Link
                  href="/education/learning-path"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30 shrink-0"
                >
                  <Compass className="h-4 w-4" />
                  Learning Path
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}