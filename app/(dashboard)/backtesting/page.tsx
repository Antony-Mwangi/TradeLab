// app/backtesting/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  TrendingUp,
  Plus,
  X,
  Target,
  Zap,
  Percent,
  BookOpen,
  FlaskConical,
  BarChart3,
  Award,
  Clock,
  TrendingDown,
  ArrowRight,
  AlertCircle,
  Play,
  Calendar,
} from "lucide-react";

interface Strategy {
  _id: string;
  strategyName: string;
  description?: string;
  market: string;
  symbol: string;
  timeframe: string;
  startDate?: string;
  endDate?: string;
  stopLossPips?: number;
  takeProfitPips?: number;
  riskPerTrade?: number;
  trades?: { resultR?: number }[];
  createdAt?: string;
}

export default function BacktestingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form state
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
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-400" />
        <p className="text-slate-400 text-sm">
          Loading backtesting workspace...
        </p>
      </div>
    );
  }

  // Calculate portfolio-wide stats
  const totalStrategies = strategies.length;
  const totalTradesAll = strategies.reduce(
    (sum, s) => sum + (s.trades?.length || 0),
    0
  );
  const totalNetR = strategies.reduce((sum, s) => {
    return (
      sum +
      (s.trades?.reduce((r, t) => r + (t.resultR || 0), 0) || 0)
    );
  }, 0);
  const totalWins = strategies.reduce((sum, s) => {
    return (
      sum +
      (s.trades?.filter((t) => (t.resultR || 0) > 0).length || 0)
    );
  }, 0);
  const overallWinRate =
    totalTradesAll > 0 ? ((totalWins / totalTradesAll) * 100).toFixed(1) : "0.0";

  return (
    <>
      {/* Page Header */}
      <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FlaskConical className="h-4 w-4 text-emerald-400" />
            <p className="text-sm font-medium text-emerald-400">
              Research & Validation
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Strategy Backtesting
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Test your trading ideas and rule models against historical data
            before risking real capital.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
        >
          <Plus size={16} />
          New Backtest
        </button>
      </section>

      {/* Summary Stats */}
      {totalStrategies > 0 && (
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-emerald-500/30 transition-all hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Strategies
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-110">
                <FlaskConical size={16} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{totalStrategies}</p>
            <p className="text-xs text-slate-500 mt-1">Active backtests</p>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-blue-500/30 transition-all hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total Trades Tested
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-transform group-hover:scale-110">
                <BarChart3 size={16} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{totalTradesAll}</p>
            <p className="text-xs text-slate-500 mt-1">Across all strategies</p>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-purple-500/30 transition-all hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Overall Win Rate
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 transition-transform group-hover:scale-110">
                <Percent size={16} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{overallWinRate}%</p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${overallWinRate}%` }}
              />
            </div>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-emerald-500/30 transition-all hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Net R Multiple
              </p>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${
                  totalNetR >= 0
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {totalNetR >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              </div>
            </div>
            <p
              className={`text-2xl font-bold ${
                totalNetR >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {totalNetR >= 0 ? "+" : ""}
              {totalNetR.toFixed(1)}R
            </p>
            <p className="text-xs text-slate-500 mt-1">Cumulative result</p>
          </div>
        </section>
      )}

      {/* Strategies Grid */}
      {strategies.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <FlaskConical size={28} className="text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No Backtest Strategies Yet
          </h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            Create your first strategy to test your ideas against historical
            data. Validate your edge before risking real capital.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 hover:scale-105"
          >
            <Plus size={16} />
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
            const winRate =
              totalTrades > 0
                ? ((wins / totalTrades) * 100).toFixed(1)
                : "0.0";
            const isProfitable = netR >= 0;

            return (
              <Link
                key={strat._id}
                href={`/backtesting/${strat._id}`}
                className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Card Header */}
                <div className="relative border-b border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      <Target size={10} />
                      {strat.market}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                      <Clock size={10} />
                      {strat.symbol} · {strat.timeframe}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition leading-snug line-clamp-2">
                    {strat.strategyName}
                  </h3>
                  {strat.description && (
                    <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {strat.description}
                    </p>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 divide-x divide-slate-800 border-b border-slate-800 bg-slate-950/50">
                  <div className="p-3 text-center">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      Trades
                    </p>
                    <p className="text-lg font-bold text-white mt-0.5">
                      {totalTrades}
                    </p>
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      Win Rate
                    </p>
                    <p className="text-lg font-bold text-blue-400 mt-0.5">
                      {winRate}%
                    </p>
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      Net R
                    </p>
                    <p
                      className={`text-lg font-bold mt-0.5 ${
                        isProfitable ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {isProfitable ? "+" : ""}
                      {netR.toFixed(1)}R
                    </p>
                  </div>
                </div>

                {/* Risk params preview */}
                {(strat.stopLossPips || strat.takeProfitPips || strat.riskPerTrade) && (
                  <div className="border-b border-slate-800 px-5 py-3 flex items-center gap-4 text-[10px] text-slate-500">
                    {strat.stopLossPips && (
                      <span className="flex items-center gap-1">
                        <TrendingDown size={10} className="text-red-400" />
                        SL: {strat.stopLossPips}p
                      </span>
                    )}
                    {strat.takeProfitPips && (
                      <span className="flex items-center gap-1">
                        <TrendingUp size={10} className="text-emerald-400" />
                        TP: {strat.takeProfitPips}p
                      </span>
                    )}
                    {strat.riskPerTrade && (
                      <span className="flex items-center gap-1">
                        <Zap size={10} className="text-amber-400" />
                        Risk: {strat.riskPerTrade}%
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="p-5 mt-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          isProfitable
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {isProfitable ? (
                          <Award size={14} />
                        ) : (
                          <AlertCircle size={14} />
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-semibold">
                          Status
                        </p>
                        <p
                          className={`text-xs font-bold ${
                            isProfitable
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {isProfitable ? "Profitable" : "Losing"}
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300 group-hover:border-emerald-500/30 group-hover:text-emerald-400 transition">
                      <Play size={11} />
                      Open
                      <ArrowRight
                        size={11}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* ===== Modal: Create New Strategy ===== */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 backdrop-blur px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <FlaskConical size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Create New Strategy
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Define parameters for your backtest
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateStrategy} className="p-6 space-y-5">
              {/* Strategy Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Strategy Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.strategyName}
                  onChange={(e) =>
                    setForm({ ...form, strategyName: e.target.value })
                  }
                  placeholder="e.g., London Breakout"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Brief overview of entry and exit triggers..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition resize-none"
                />
              </div>

              {/* Market / Symbol / Timeframe */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Market
                  </label>
                  <select
                    value={form.market}
                    onChange={(e) =>
                      setForm({ ...form, market: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none cursor-pointer"
                  >
                    <option value="Forex">Forex</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Indices">Indices</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Symbol
                  </label>
                  <input
                    type="text"
                    value={form.symbol}
                    onChange={(e) =>
                      setForm({ ...form, symbol: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Timeframe
                  </label>
                  <input
                    type="text"
                    value={form.timeframe}
                    onChange={(e) =>
                      setForm({ ...form, timeframe: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar size={10} />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar size={10} />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Risk Parameters */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Stop Loss (pips)
                  </label>
                  <input
                    type="number"
                    value={form.stopLossPips}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        stopLossPips: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Take Profit (pips)
                  </label>
                  <input
                    type="number"
                    value={form.takeProfitPips}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        takeProfitPips: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Risk per Trade (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={form.riskPerTrade}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        riskPerTrade: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Risk-Reward Preview */}
              {form.stopLossPips > 0 && form.takeProfitPips > 0 && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Zap size={14} />
                  </div>
                  <p className="text-xs text-emerald-400">
                    Risk-Reward Ratio:{" "}
                    <strong className="text-emerald-300">
                      1:{(form.takeProfitPips / form.stopLossPips).toFixed(2)}
                    </strong>
                    {form.takeProfitPips / form.stopLossPips >= 2
                      ? " — Healthy R:R"
                      : " — Consider increasing TP"}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-2.5 text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition hover:scale-105 active:scale-95"
                >
                  <Play size={13} />
                  Create & Run
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}