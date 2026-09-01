// src/app/psychology/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Brain,
  CalendarDays,
  LineChart,
  LogOut,
  Menu,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function PsychologyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/psychology")
        .then((res) => res.json())
        .then((resData) => setData(resData))
        .catch((err) => console.error("Failed to load psychology analytics", err))
        .finally(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Analyzing trading psychology data...</p>
      </main>
    );
  }

  const userName = session?.user?.name || "Trader";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <a href="/dashboard" className="text-xl font-bold tracking-tight">
            Trade<span className="text-emerald-400">Lab</span>
          </a>
          <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-slate-400 lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          <a href="/dashboard" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <BarChart3 size={19} /> Dashboard
          </a>
          <a href="/journal" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <BookOpen size={19} /> Trading Journal
          </a>
          <a href="/analytics" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <LineChart size={19} /> Analytics
          </a>
          <a href="/backtesting" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <TrendingUp size={19} /> Backtesting
          </a>
          <a href="/psychology" className="flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400">
            <Brain size={19} /> Trading Psychology
          </a>
          <a href="/trading-plan" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <Target size={19} /> Trading Plan
          </a>
          <a href="/calendar" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <CalendarDays size={19} /> Trading Calendar
          </a>
        </nav>

        <div className="border-t border-slate-800 p-4">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-400 lg:hidden">
            <Menu size={22} />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm font-medium">{userName}</span>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white">Trading Psychology</h1>
            <p className="text-xs text-slate-400 mt-1">
              Understand how your mindset, emotions, and rule discipline affect your trading results.
            </p>
          </div>

          {data?.insufficientData ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
              <Brain size={36} className="mx-auto text-slate-600 mb-3" />
              <h3 className="text-base font-semibold text-white mb-1">Not enough data yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
                Journal at least 10 trades with emotional tags and rule checklists to start identifying behavioral patterns. ({data.totalTrades}/10 recorded)
              </p>
              <a href="/journal" className="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400">
                Go to Journal
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Core Psychology Score Cards */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <p className="text-[10px] text-slate-500 uppercase font-medium">Discipline Score</p>
                  <p className="text-2xl font-bold mt-1 text-emerald-400">{data.metrics.disciplineScore}%</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <p className="text-[10px] text-slate-500 uppercase font-medium">Emotional Stability</p>
                  <p className="text-2xl font-bold mt-1 text-white">{data.metrics.emotionalStability}%</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <p className="text-[10px] text-slate-500 uppercase font-medium">Rule Adherence</p>
                  <p className="text-2xl font-bold mt-1 text-emerald-400">{data.metrics.ruleAdherence}%</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <p className="text-[10px] text-slate-500 uppercase font-medium">Psychology Trend</p>
                  <p className="text-2xl font-bold mt-1 text-emerald-400">{data.metrics.psychologyTrend}</p>
                </div>
              </div>

              {/* Emotional Performance & FOMO Comparison */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                  <h3 className="text-base font-semibold text-white mb-4">Performance by Emotional State</h3>
                  <div className="space-y-3">
                    {data.emotionalPerformance.map((item: any) => (
                      <div key={item.emotion} className="flex items-center justify-between text-xs">
                        <span className="w-24 font-medium text-slate-300">{item.emotion}</span>
                        <div className="flex-1 mx-4 bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${item.netR >= 0 ? "bg-emerald-500" : "bg-red-500"}`}
                            style={{ width: `${Math.min(Math.abs(item.netR) * 5, 100)}%` }}
                          />
                        </div>
                        <span className={`w-16 text-right font-semibold ${item.netR >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {item.netR >= 0 ? `+${item.netR}R` : `${item.netR}R`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                  <h3 className="text-base font-semibold text-white mb-4">FOMO vs Planned Trades</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                      <p className="text-xs text-slate-400 font-medium mb-1">Planned Trades</p>
                      <p className="text-xl font-bold text-emerald-400">+{data.fomoComparison.plannedExpectancy}R</p>
                      <p className="text-[10px] text-slate-500 mt-1">Win Rate: {data.fomoComparison.plannedWinRate}% ({data.fomoComparison.plannedTrades} trades)</p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                      <p className="text-xs text-slate-400 font-medium mb-1">FOMO Trades</p>
                      <p className="text-xl font-bold text-red-400">{data.fomoComparison.fomoExpectancy}R</p>
                      <p className="text-[10px] text-slate-500 mt-1">Win Rate: {data.fomoComparison.fomoWinRate}% ({data.fomoComparison.fomoTrades} trades)</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-300">
                    💡 Your best results occur when calm. FOMO trades produce negative expectancy in your journal.
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}