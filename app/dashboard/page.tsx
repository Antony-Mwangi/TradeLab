"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  BarChart3,
  BookOpen,
  Brain,
  CalendarDays,
  ChevronRight,
  ClipboardCheck,
  LineChart,
  LogOut,
  Menu,
  Plus,
  Settings,
  Target,
  TrendingUp,
  X,
  Sparkles,
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/login";
    }
  }, [status]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading your dashboard...</div>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  const userName = session.user?.name || "Trader";
  const firstName = userName.split(" ")[0];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <a href="/dashboard" className="text-xl font-bold tracking-tight">
            Trade<span className="text-emerald-400">Lab</span>
          </a>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          <a
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400"
          >
            <BarChart3 size={19} />
            Dashboard
          </a>

          <a
            href="/journal"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            <BookOpen size={19} />
            Trading Journal
          </a>

          <a
            href="/analytics"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            <LineChart size={19} />
            Analytics
          </a>

          <a
            href="/backtesting"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            <TrendingUp size={19} />
            Backtesting
          </a>

          <a
            href="/psychology"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            <Brain size={19} />
            Trading Psychology
          </a>

          <a
            href="/trading-plan"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            <Target size={19} />
            Trading Plan
          </a>

          <a
            href="/calendar"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            <CalendarDays size={19} />
            Trading Calendar
          </a>

          {/* AI Analyst Link */}
          <a
            href="/ai"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            <Sparkles size={19} />
            TradeLab AI Analyst
            <span className="ml-auto rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
              NEW
            </span>
          </a>
        </nav>

        <div className="border-t border-slate-800 p-4">
          <a
            href="/settings"
            className="mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            <Settings size={19} />
            Settings
          </a>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} />
            Sign out
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-white">{userName}</p>
              <p className="text-xs text-slate-500">{session.user?.email}</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={userName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-emerald-400">
                  {userName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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

          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <a
              href="/journal/new"
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-emerald-500/40 hover:bg-slate-900"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
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
            </a>

            <a
              href="/analytics"
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-blue-500/40 hover:bg-slate-900"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
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
            </a>

            <a
              href="/backtesting"
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-purple-500/40 hover:bg-slate-900"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
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
            </a>

            <a
              href="/ai"
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-purple-500/40 hover:bg-slate-900"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
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
            </a>
          </section>

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
                    Once you record trades and journal entries, TradeLab will
                    use your real data to help you understand your performance.
                  </p>

                  <a
                    href="/journal/new"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                  >
                    <Plus size={17} />
                    Add your first trade
                  </a>
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
                  Complete journal and psychology entries to identify patterns
                  in your trading behavior.
                </p>
              </div>

              <a
                href="/trading-plan"
                className="mt-5 flex items-center justify-between rounded-xl border border-slate-800 px-4 py-3 text-sm text-slate-400 transition hover:border-slate-700 hover:text-white"
              >
                <span>Review trading plan</span>
                <ChevronRight size={17} />
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}