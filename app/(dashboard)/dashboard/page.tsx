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
} from "lucide-react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Trader";
  const firstName = userName.split(" ")[0];

  return (
    <>
      {/* Welcome Section */}
      <section className="mb-8">
        <p className="mb-2 text-sm font-medium text-emerald-400">
          Your trading workspace
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome back, {firstName}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Review your trading process, record your decisions, analyze your
          performance, and build better trading habits.
        </p>
      </section>

      {/* Quick Action Cards */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/journal/new"
          className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-emerald-500/40 hover:bg-slate-900 hover:scale-[1.02]"
        >
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-110">
            <Plus size={21} />
          </div>
          <h2 className="font-semibold">Record a Trade</h2>
          <p className="mt-1 text-sm leading-5 text-slate-500">
            Add a completed trade to your journal.
          </p>
          <div className="mt-4 flex items-center text-sm font-medium text-emerald-400">
            Open journal
            <ChevronRight
              size={16}
              className="ml-1 transition-transform group-hover:translate-x-1"
            />
          </div>
        </Link>

        <Link
          href="/analytics"
          className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-blue-500/40 hover:bg-slate-900 hover:scale-[1.02]"
        >
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-transform group-hover:scale-110">
            <LineChart size={21} />
          </div>
          <h2 className="font-semibold">Analyze Performance</h2>
          <p className="mt-1 text-sm leading-5 text-slate-500">
            Understand your trading results and patterns.
          </p>
          <div className="mt-4 flex items-center text-sm font-medium text-blue-400">
            View analytics
            <ChevronRight
              size={16}
              className="ml-1 transition-transform group-hover:translate-x-1"
            />
          </div>
        </Link>

        <Link
          href="/backtesting"
          className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-purple-500/40 hover:bg-slate-900 hover:scale-[1.02]"
        >
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 transition-transform group-hover:scale-110">
            <TrendingUp size={21} />
          </div>
          <h2 className="font-semibold">Backtest a Strategy</h2>
          <p className="mt-1 text-sm leading-5 text-slate-500">
            Test your trading rules against historical data.
          </p>
          <div className="mt-4 flex items-center text-sm font-medium text-purple-400">
            Start backtesting
            <ChevronRight
              size={16}
              className="ml-1 transition-transform group-hover:translate-x-1"
            />
          </div>
        </Link>

        <Link
          href="/ai"
          className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-purple-500/40 hover:bg-slate-900 hover:scale-[1.02]"
        >
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 transition-transform group-hover:scale-110">
            <Sparkles size={21} />
          </div>
          <h2 className="font-semibold">AI Trading Analyst</h2>
          <p className="mt-1 text-sm leading-5 text-slate-500">
            Get personalized insights from your trading data.
          </p>
          <div className="mt-4 flex items-center text-sm font-medium text-purple-400">
            Chat with AI
            <ChevronRight
              size={16}
              className="ml-1 transition-transform group-hover:translate-x-1"
            />
          </div>
        </Link>
      </section>

      {/* Main Grid */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">Your workspace</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your trading activity will appear here as you use TradeLab.
              </p>
            </div>
            <BarChart3 className="text-slate-600" size={22} />
          </div>

          <div className="mt-8 flex min-h-64 items-center justify-center rounded-xl border border-dashed border-slate-800">
            <div className="max-w-sm px-6 text-center">
              <ClipboardCheck
                size={32}
                className="mx-auto mb-4 text-slate-600"
              />
              <h3 className="font-medium text-slate-300">
                Start building your trading record
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Once you record trades and journal entries, TradeLab will use
                your real data to help you understand your performance.
              </p>
              <Link
                href="/journal/new"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 hover:scale-105"
              >
                <Plus size={17} />
                Add your first trade
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">Trading discipline</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your personal review area
              </p>
            </div>
            <Target className="text-slate-600" size={22} />
          </div>

          <div className="mt-8 rounded-xl bg-slate-950 p-5">
            <p className="text-sm font-medium text-slate-300">
              No review data yet
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Complete journal and psychology entries to identify patterns in
              your trading behavior.
            </p>
          </div>

          <Link
            href="/trading-plan"
            className="mt-5 flex items-center justify-between rounded-xl border border-slate-800 px-4 py-3 text-sm text-slate-400 transition hover:border-slate-700 hover:text-white"
          >
            <span>Review trading plan</span>
            <ChevronRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}