// src/app/analytics/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Brain,
  CalendarDays,
  LineChart,
  LogOut,
  Menu,
  Settings,
  Target,
  TrendingUp,
  X,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/analytics")
        .then((res) => res.json())
        .then((data) => setAnalytics(data))
        .catch((err) => console.error("Failed to load analytics", err))
        .finally(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Computing performance metrics...</p>
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
          <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden">
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
          <a href="/analytics" className="flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400">
            <LineChart size={19} /> Analytics
          </a>
          <a href="/backtesting" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
            <TrendingUp size={19} /> Backtesting
          </a>
          <a href="/psychology" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
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
            <h1 className="text-2xl font-bold tracking-tight text-white">Performance Analytics</h1>
            <p className="text-sm text-slate-400 mt-1">Actionable metric insights extracted from your journal logs.</p>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 mb-8">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-xs text-slate-400">Total Trades</p>
              <p className="text-xl font-bold mt-1 text-white">{analytics?.totalTrades || 0}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-xs text-slate-400">Win Rate</p>
              <p className="text-xl font-bold mt-1 text-emerald-400">{analytics?.winRate || 0}%</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-xs text-slate-400">Net P&L</p>
              <p className={`text-xl font-bold mt-1 ${(analytics?.netPnl || 0) >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {(analytics?.netPnl || 0) >= 0 ? `+$${analytics?.netPnl}` : `-$${Math.abs(analytics?.netPnl)}`}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-xs text-slate-400">Profit Factor</p>
              <p className="text-xl font-bold mt-1 text-white">{analytics?.profitFactor || 0}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-xs text-slate-400">Expectancy</p>
              <p className="text-xl font-bold mt-1 text-white">{analytics?.expectancy || 0}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-xs text-slate-400">Max Loss Streak</p>
              <p className="text-xl font-bold mt-1 text-red-400">{analytics?.riskAnalysis?.lossStreak || 0}</p>
            </div>
          </div>

          {/* Breakdown Grids */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
            {/* Setup Performance */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="text-base font-semibold text-white mb-4">Setup Performance</h3>
              {analytics?.setupPerformance?.length === 0 ? (
                <p className="text-xs text-slate-500">No setups logged yet.</p>
              ) : (
                <div className="space-y-3">
                  {analytics?.setupPerformance?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                      <div>
                        <p className="text-sm font-medium text-white">{item.setup}</p>
                        <p className="text-xs text-slate-500">{item.trades} trades recorded</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-emerald-400">{item.winRate}</p>
                        <p className={`text-xs ${item.pnl >= 0 ? "text-emerald-500" : "text-red-400"}`}>
                          {item.pnl >= 0 ? `+$${item.pnl}` : `-$${Math.abs(item.pnl)}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Psychology / Emotional Performance */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="text-base font-semibold text-white mb-4">Psychology Impact</h3>
              {analytics?.psychologyPerformance?.length === 0 ? (
                <p className="text-xs text-slate-500">No emotional states tracked yet.</p>
              ) : (
                <div className="space-y-3">
                  {analytics?.psychologyPerformance?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                      <p className="text-sm font-medium text-white">{item.emotion}</p>
                      <p className={`text-sm font-semibold ${item.pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {item.pnl >= 0 ? `+$${item.pnl}` : `-$${Math.abs(item.pnl)}`}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Automated Insights */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="text-base font-semibold text-white mb-4">Automated Insights</h3>
            <div className="space-y-3">
              {analytics?.insights?.map((insight: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-950 p-4 text-sm text-slate-300">
                  {insight.startsWith("✓") ? <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} /> : <ShieldAlert className="text-amber-400 shrink-0 mt-0.5" size={18} />}
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}