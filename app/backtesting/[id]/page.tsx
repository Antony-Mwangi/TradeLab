// src/app/backtesting/[id]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
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
  Target,
  TrendingUp,
  X,
  Plus,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function BacktestWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const strategyId = resolvedParams.id;

  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [strategy, setStrategy] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // New simulated trade form
  const [tradeForm, setTradeForm] = useState({
    direction: "BUY",
    entryPrice: "",
    stopLoss: "",
    takeProfit: "",
    resultR: "1",
    setup: "",
    emotion: "Calm",
    rulesFollowed: true,
    notes: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const fetchStrategy = () => {
    if (status === "authenticated") {
      fetch(`/api/backtest/${strategyId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.strategy) {
            setStrategy(data.strategy);
            setTradeForm((prev) => ({ ...prev, setup: data.strategy.strategyName }));
          }
        })
        .catch((err) => console.error("Failed to load strategy", err))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchStrategy();
  }, [status, strategyId]);

  const handleLogTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/backtest/${strategyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tradeForm),
      });
      if (res.ok) {
        setShowModal(false);
        setTradeForm({
          direction: "BUY",
          entryPrice: "",
          stopLoss: "",
          takeProfit: "",
          resultR: "1",
          setup: strategy?.strategyName || "",
          emotion: "Calm",
          rulesFollowed: true,
          notes: "",
        });
        fetchStrategy();
      } else {
        alert("Failed to record backtest trade.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading strategy workspace...</p>
      </main>
    );
  }

  if (!strategy) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <p className="text-sm text-red-400 mb-4">Strategy workspace not found.</p>
        <button onClick={() => router.push("/backtesting")} className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold">
          Return to Backtesting
        </button>
      </main>
    );
  }

  // Analytics computation for strategy trades
  const trades = strategy.trades || [];
  const totalTrades = trades.length;
  let netR = 0;
  let wins = 0;
  let losses = 0;
  let totalWinR = 0;
  let totalLossR = 0;
  let maxDrawdownR = 0;
  let peakR = 0;
  let cumulativeR = 0;

  trades.forEach((t: any) => {
    const r = t.resultR || 0;
    netR += r;
    cumulativeR += r;
    if (cumulativeR > peakR) peakR = cumulativeR;
    const dd = peakR - cumulativeR;
    if (dd > maxDrawdownR) maxDrawdownR = dd;

    if (r > 0) {
      wins++;
      totalWinR += r;
    } else if (r < 0) {
      losses++;
      totalLossR += Math.abs(r);
    }
  });

  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : "0";
  const profitFactor = totalLossR === 0 ? totalWinR : Number((totalWinR / totalLossR).toFixed(2));
  const expectancy = totalTrades > 0 ? (netR / totalTrades).toFixed(2) : "0";
  const avgWin = wins > 0 ? (totalWinR / wins).toFixed(2) : "0";
  const avgLoss = losses > 0 ? (totalLossR / losses).toFixed(2) : "0";

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
          <div className="mb-6">
            <button
              onClick={() => router.push("/backtesting")}
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-4"
            >
              <ArrowLeft size={14} /> Back to Strategies
            </button>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-800 text-slate-300">
                    {strategy.market}
                  </span>
                  <span className="text-xs text-slate-400">{strategy.symbol} · {strategy.timeframe}</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white">{strategy.strategyName}</h1>
                <p className="text-xs text-slate-400 mt-0.5">{strategy.description || "No description provided."}</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                <Plus size={16} /> Record Trade
              </button>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8 mb-8">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-[10px] text-slate-500 uppercase">Net Result</p>
              <p className={`text-lg font-bold mt-1 ${netR >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {netR >= 0 ? `+${netR}R` : `${netR}R`}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-[10px] text-slate-500 uppercase">Total Trades</p>
              <p className="text-lg font-bold mt-1 text-white">{totalTrades}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-[10px] text-slate-500 uppercase">Win Rate</p>
              <p className="text-lg font-bold mt-1 text-emerald-400">{winRate}%</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-[10px] text-slate-500 uppercase">Profit Factor</p>
              <p className="text-lg font-bold mt-1 text-white">{profitFactor}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-[10px] text-slate-500 uppercase">Expectancy</p>
              <p className="text-lg font-bold mt-1 text-white">+{expectancy}R</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-[10px] text-slate-500 uppercase">Max Drawdown</p>
              <p className="text-lg font-bold mt-1 text-red-400">-{maxDrawdownR.toFixed(1)}R</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-[10px] text-slate-500 uppercase">Average Win</p>
              <p className="text-lg font-bold mt-1 text-emerald-400">+{avgWin}R</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-[10px] text-slate-500 uppercase">Average Loss</p>
              <p className="text-lg font-bold mt-1 text-red-400">-{avgLoss}R</p>
            </div>
          </div>

          {/* Recorded Trades Table */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="border-b border-slate-800 px-6 py-4">
              <h3 className="text-base font-semibold text-white">Simulated Backtest Trades</h3>
            </div>
            {trades.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-sm text-slate-500 mb-3">No simulated trades recorded for this strategy yet.</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white"
                >
                  Log First Trade
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase">
                    <tr>
                      <th className="px-6 py-3">#</th>
                      <th className="px-6 py-3">Symbol</th>
                      <th className="px-6 py-3">Direction</th>
                      <th className="px-6 py-3">Entry</th>
                      <th className="px-6 py-3">SL / TP</th>
                      <th className="px-6 py-3">Result</th>
                      <th className="px-6 py-3">Emotion</th>
                      <th className="px-6 py-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {trades.map((t: any) => (
                      <tr key={t._id || t.tradeNumber} className="hover:bg-slate-900/40">
                        <td className="px-6 py-4 font-semibold text-white">#{t.tradeNumber}</td>
                        <td className="px-6 py-4">{t.symbol}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${t.direction === "BUY" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                            {t.direction}
                          </span>
                        </td>
                        <td className="px-6 py-4">{t.entryPrice}</td>
                        <td className="px-6 py-4 text-slate-400">{t.stopLoss} / {t.takeProfit}</td>
                        <td className="px-6 py-4">
                          <span className={`font-semibold ${t.resultR >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                            {t.resultR >= 0 ? `+${t.resultR}R` : `${t.resultR}R`}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400">{t.emotion}</td>
                        <td className="px-6 py-4 text-slate-400 truncate max-w-xs">{t.notes || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Modal for Recording Backtest Trade */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
              <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white">Record Backtest Trade</h3>
                  <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleLogTrade} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Direction</label>
                      <select
                        value={tradeForm.direction}
                        onChange={(e) => setTradeForm({ ...tradeForm, direction: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none"
                      >
                        <option value="BUY">BUY (Long)</option>
                        <option value="SELL">SELL (Short)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Result (R-Multiple)</label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={tradeForm.resultR}
                        onChange={(e) => setTradeForm({ ...tradeForm, resultR: e.target.value })}
                        placeholder="e.g. 2, -1, 0.5"
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Entry Price</label>
                      <input
                        type="number"
                        step="any"
                        required
                        value={tradeForm.entryPrice}
                        onChange={(e) => setTradeForm({ ...tradeForm, entryPrice: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Stop Loss</label>
                      <input
                        type="number"
                        step="any"
                        required
                        value={tradeForm.stopLoss}
                        onChange={(e) => setTradeForm({ ...tradeForm, stopLoss: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Take Profit</label>
                      <input
                        type="number"
                        step="any"
                        required
                        value={tradeForm.takeProfit}
                        onChange={(e) => setTradeForm({ ...tradeForm, takeProfit: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Emotion / Psychology</label>
                      <select
                        value={tradeForm.emotion}
                        onChange={(e) => setTradeForm({ ...tradeForm, emotion: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none"
                      >
                        <option value="Calm">Calm</option>
                        <option value="Confident">Confident</option>
                        <option value="Anxious">Anxious</option>
                        <option value="FOMO">FOMO</option>
                        <option value="Greedy">Greedy</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Rules Followed?</label>
                      <select
                        value={tradeForm.rulesFollowed ? "yes" : "no"}
                        onChange={(e) => setTradeForm({ ...tradeForm, rulesFollowed: e.target.value === "yes" })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Notes</label>
                    <textarea
                      rows={2}
                      value={tradeForm.notes}
                      onChange={(e) => setTradeForm({ ...tradeForm, notes: e.target.value })}
                      placeholder="Observation on setup execution..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-sm text-white focus:outline-none"
                    />
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
                      Save Trade
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