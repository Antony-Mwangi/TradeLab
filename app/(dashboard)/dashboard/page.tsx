// app/dashboard/page.tsx
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  BarChart3,
  BookOpen,
  LineChart,
  TrendingUp,
  Target,
  Plus,
  ChevronRight,
  ClipboardCheck,
  Sparkles,
  Brain,
  CalendarDays,
  ArrowRight,
  Activity,
  Award,
  Flame,
} from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Trader";
  const firstName = userName.split(" ")[0];

  // Primary actions — the four most important entry points
  const primaryActions = [
    {
      href: "/journal/new",
      label: "Record a Trade",
      desc: "Add a completed trade to your journal.",
      icon: Plus,
      color: "emerald",
      cta: "Open journal",
    },
    {
      href: "/analytics",
      label: "Analyze Performance",
      desc: "Understand your trading results and patterns.",
      icon: LineChart,
      color: "blue",
      cta: "View analytics",
    },
    {
      href: "/backtesting",
      label: "Backtest a Strategy",
      desc: "Test your trading rules against historical data.",
      icon: TrendingUp,
      color: "purple",
      cta: "Start backtesting",
    },
    {
      href: "/ai",
      label: "AI Trading Analyst",
      desc: "Get personalized insights from your trading data.",
      icon: Sparkles,
      color: "amber",
      cta: "Chat with AI",
    },
  ];

  // Secondary navigation — useful but less prominent
  const secondaryNav = [
    {
      href: "/journal",
      label: "Trading Journal",
      icon: BookOpen,
    },
    {
      href: "/psychology",
      label: "Trading Psychology",
      icon: Brain,
    },
    {
      href: "/trading-plan",
      label: "Trading Plan",
      icon: Target,
    },
    {
      href: "/calendar",
      label: "Trading Calendar",
      icon: CalendarDays,
    },
  ];

  // Color helper
  const getColorClasses = (color: string) => {
    const map: Record<
      string,
      { bg: string; text: string; border: string; shadow: string }
    > = {
      emerald: {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "hover:border-emerald-500/40",
        shadow: "hover:shadow-emerald-500/10",
      },
      blue: {
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        border: "hover:border-blue-500/40",
        shadow: "hover:shadow-blue-500/10",
      },
      purple: {
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        border: "hover:border-purple-500/40",
        shadow: "hover:shadow-purple-500/10",
      },
      amber: {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "hover:border-amber-500/40",
        shadow: "hover:shadow-amber-500/10",
      },
    };
    return map[color] || map.emerald;
  };

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      {/* ============================================
          WELCOME SECTION
          ============================================ */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 text-emerald-400" />
          <p className="text-sm font-medium text-emerald-400">
            Your trading workspace
          </p>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {getGreeting()}, {firstName}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Review your trading process, record your decisions, analyze your
          performance, and build better trading habits.
        </p>
      </section>

      {/* ============================================
          PRIMARY ACTIONS
          ============================================ */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              Quick Actions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Your most-used tools
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {primaryActions.map((action, i) => {
            const colors = getColorClasses(action.color);
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className={`group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900 ${colors.border} hover:shadow-2xl ${colors.shadow}`}
              >
                <div
                  className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg} ${colors.text} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-white">{action.label}</h3>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {action.desc}
                </p>
                <div
                  className={`mt-4 flex items-center text-sm font-medium ${colors.text}`}
                >
                  {action.cta}
                  <ChevronRight
                    size={16}
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================================
          MAIN GRID
          ============================================ */}
      <section className="mb-10 grid gap-6 lg:grid-cols-3">
        {/* Your Workspace */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Your workspace
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your trading activity will appear here as you use TradeLab.
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/50 text-slate-500">
              <BarChart3 size={18} />
            </div>
          </div>

          {/* Empty State */}
          <div className="mt-8 flex min-h-64 items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/30">
            <div className="max-w-sm px-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <ClipboardCheck size={26} className="text-slate-500" />
              </div>
              <h3 className="font-semibold text-slate-200">
                Start building your trading record
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Once you record trades and journal entries, TradeLab will use
                your real data to help you understand your performance.
              </p>
              <Link
                href="/journal/new"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:bg-emerald-400 hover:scale-105"
              >
                <Plus size={16} />
                Add your first trade
              </Link>
            </div>
          </div>
        </div>

        {/* Trading Discipline */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Trading discipline
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your personal review area
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/50 text-slate-500">
              <Target size={18} />
            </div>
          </div>

          {/* Empty State */}
          <div className="mt-8 rounded-xl bg-slate-950 border border-slate-800/50 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <Flame size={14} />
              </div>
              <p className="text-sm font-semibold text-slate-300">
                No review data yet
              </p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Complete journal and psychology entries to identify patterns in
              your trading behavior.
            </p>
          </div>

          <Link
            href="/trading-plan"
            className="mt-5 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/30 px-4 py-3 text-sm text-slate-400 transition-all hover:border-slate-700 hover:text-white hover:bg-slate-950"
          >
            <span className="flex items-center gap-2">
              <Award size={15} />
              Review trading plan
            </span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* ============================================
          EXPLORE SECTIONS
          ============================================ */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              Explore Sections
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Navigate to other areas of your workspace
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {secondaryNav.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={i}
                href={item.href}
                className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/70 hover:scale-[1.02]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800/50 text-slate-400 transition-all group-hover:bg-slate-800 group-hover:text-white">
                  <Icon size={17} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    {item.label}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-slate-600 transition-all group-hover:text-slate-400 group-hover:translate-x-0.5"
                />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}