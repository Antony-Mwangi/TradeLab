// src/app/backtesting/page.tsx
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
  Plus,
  Trash2,
} from "lucide-react";

export default function BacktestingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [strategies, setStrategies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // New strategy form state
  const [form, setForm] = useState({
    strategyName: "",
    description: "",
    market: "Forex",
    symbol: "EUR/USD",
    timeframe: "15m",
    startDate: "2025-01-01",
    endDate: "2026-08-31",
    stopLossPips: 20,
    takeProfitPips: 40,
    riskPerTrade: 1.0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const fetchStrategies = () => {
    if (status === "authenticated") {
      fetch("/api/backtest")
        .then((res) => res.json())
        .then((data) => {
          if (data.strategies) setStrategies(data.strategies);
        })
        .catch((err) => console.error("Failed to load backtests", err))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchStrategies();
  }, [status]);

  const handleCreateStrategy = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/backtest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowModal(false);
        setForm({
          strategyName: "",
          description: "",
          market: "Forex",
          symbol: "EUR/USD",
          timeframe: "15m",
          startDate: "2025-01-01",
          endDate: "2026-08-31",
          stopLossPips: 20,
          takeProfitPips: 40,
          riskPerTrade: 1.0,
        });
        fetchStrategies();
      } else {
        alert("Failed to create backtest strategy.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading backtesting workspace...</p>
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
          <a href="/backtesting" className="flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400">
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
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Strategy Backtesting</h1>
              <p className="text-sm text-slate-400 mt-1">Test your trading ideas and rule models against historical data.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              <Plus size={16} /> New Backtest
            </button>
          </div>

          {/* Strategies Grid */}
          {strategies.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
              <p className="text-sm text-slate-400 mb-4">No backtest strategies created yet.</p>
              <button
                onClick={() => setShowModal(true)}
                className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950"
              >
                Create First Strategy
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {strategies.map((strat) => {
                const totalTrades = strat.trades?.length || 0;
                let netR = 0;
                let wins = 0;
                strat.trades?.forEach((t: any) => {
                  netR += t.resultR || 0;
                  if ((t.resultR || 0) > 0) wins++;
                });
                const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : "0";

                return (
                  <div key={strat._id} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-1 rounded text-xs font-semibold uppercase bg-slate-800 text-slate-300">
                          {strat.market}
                        </span>
                        <span className="text-xs text-slate-500">{strat.symbol} · {strat.timeframe}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{strat.strategyName}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-4">{strat.description || "No description provided."}</p>

                      <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-950 p-3 border border-slate-800/80 mb-6 text-center">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase">Trades</p>
                          <p className="text-sm font-semibold text-white mt-0.5">{totalTrades}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase">Win Rate</p>
                          <p className="text-sm font-semibold text-emerald-400 mt-0.5">{winRate}%</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase">Net R</p>
                          <p className={`text-sm font-semibold mt-0.5 ${netR >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                            {netR >= 0 ? `+${netR}R` : `${netR}R`}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => router.push(`/backtesting/${strat._id}`)}
                        className="flex-1 rounded-xl bg-slate-800 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-700 text-center"
                      >
                        Open Workspace
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Modal for New Strategy */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
              <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white">Create New Backtest Strategy</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleCreateStrategy} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Strategy Name</label>
                    <input
                      type="text"
                      required
                      value={form.strategyName}
                      onChange={(e) => setForm({ ...form, strategyName: e.target.value })}
                      placeholder="e.g. London Breakout"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Brief overview of entry and exit triggers..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Market</label>
                      <select
                        value={form.market}
                        onChange={(e) => setForm({ ...form, market: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none"
                      >
                        <option value="Forex">Forex</option>
                        <option value="Crypto">Crypto</option>
                        <option value="Stocks">Stocks</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Symbol</label>
                      <input
                        type="text"
                        value={form.symbol}
                        onChange={(e) => setForm({ ...form, symbol: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Timeframe</label>
                      <input
                        type="text"
                        value={form.timeframe}
                        onChange={(e) => setForm({ ...form, timeframe: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                    >
                      Save Strategy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}