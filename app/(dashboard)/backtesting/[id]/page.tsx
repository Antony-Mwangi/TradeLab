// app/backtesting/[id]/page.tsx
"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  X,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Award,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Percent,
  DollarSign,
  Activity,
  Clock,
  Brain,
  Shield,
  Flame,
  Snowflake,
  Calculator,
  Play,
  Calendar,
  FlaskConical,
} from "lucide-react";

// ===== Metric Card =====
function MetricCard({
  label,
  value,
  subtitle,
  icon: Icon,
  color = "emerald",
}: {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: any;
  color?: "emerald" | "blue" | "amber" | "purple" | "rose" | "cyan";
}) {
  const colorMap = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-400" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-400" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400" },
  };
  const c = colorMap[color];

  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${c.bg} ${c.text} transition-transform group-hover:scale-110`}
        >
          <Icon size={13} />
        </div>
      </div>
      <p className={`text-xl font-bold font-mono ${c.text}`}>{value}</p>
      {subtitle && (
        <p className="text-[10px] text-slate-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

const EMOTIONS = [
  "Calm",
  "Confident",
  "Neutral",
  "Anxious",
  "Fearful",
  "Greedy",
  "Impatient",
  "Frustrated",
  "Excited",
  "Overconfident",
];

export default function BacktestWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const strategyId = resolvedParams.id;

  const { data: session, status } = useSession();
  const router = useRouter();
  const [strategy, setStrategy] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const fetchStrategy = () => {
    if (status === "authenticated") {
      fetch(`/api/backtest/${strategyId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.strategy) {
            setStrategy(data.strategy);
            setTradeForm((prev) => ({
              ...prev,
              setup: data.strategy.strategyName,
            }));
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
    setSaving(true);
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
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-400" />
        <p className="text-slate-400 text-sm">
          Loading strategy workspace...
        </p>
      </div>
    );
  }

  if (!strategy) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
          <AlertCircle size={28} className="text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Strategy not found
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          This backtest workspace may have been deleted or doesn't exist.
        </p>
        <Link
          href="/backtesting"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
        >
          <ArrowLeft size={14} />
          Back to Strategies
        </Link>
      </div>
    );
  }

  // ===== Analytics computation =====
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
  let currentLossStreak = 0;
  let maxLossStreak = 0;

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
      currentLossStreak = 0;
    } else if (r < 0) {
      losses++;
      totalLossR += Math.abs(r);
      currentLossStreak++;
      if (currentLossStreak > maxLossStreak) maxLossStreak = currentLossStreak;
    }
  });

  const winRate =
    totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : "0.0";
  const profitFactor =
    totalLossR === 0 ? totalWinR.toFixed(2) : (totalWinR / totalLossR).toFixed(2);
  const expectancy = totalTrades > 0 ? (netR / totalTrades).toFixed(2) : "0.00";
  const avgWin = wins > 0 ? (totalWinR / wins).toFixed(2) : "0.00";
  const avgLoss = losses > 0 ? (totalLossR / losses).toFixed(2) : "0.00";
  const isProfitable = netR >= 0;

  return (
    <>
      {/* Header Actions */}
      <section className="mb-6 flex items-center justify-between">
        <Link
          href="/backtesting"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Strategies
        </Link>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
        >
          <Plus size={15} />
          Record Trade
        </button>
      </section>

      {/* ===== Strategy Header Card ===== */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-6 mb-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Target size={10} />
                {strategy.market}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <Clock size={10} />
                {strategy.symbol} · {strategy.timeframe}
              </span>
              {strategy.startDate && strategy.endDate && (
                <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <Calendar size={10} />
                  {strategy.startDate} → {strategy.endDate}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              {strategy.strategyName}
            </h1>
            {strategy.description && (
              <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                {strategy.description}
              </p>
            )}
          </div>

          {/* Status Badge */}
          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${
                isProfitable
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "bg-red-500/10 text-red-400 border border-red-500/30"
              }`}
            >
              {isProfitable ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {isProfitable ? "Profitable" : "Losing"}
            </span>
            <div className="text-right">
              <p
                className={`text-3xl font-bold font-mono ${
                  isProfitable ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {isProfitable ? "+" : ""}
                {netR.toFixed(1)}R
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                Net Result
              </p>
            </div>
          </div>
        </div>

        {/* Risk Parameters Row */}
        {(strategy.stopLossPips ||
          strategy.takeProfitPips ||
          strategy.riskPerTrade) && (
          <div className="mt-5 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-5 text-xs">
            {strategy.stopLossPips && (
              <span className="flex items-center gap-1.5 text-slate-400">
                <TrendingDown size={12} className="text-red-400" />
                Stop Loss:{" "}
                <span className="font-mono text-white">
                  {strategy.stopLossPips} pips
                </span>
              </span>
            )}
            {strategy.takeProfitPips && (
              <span className="flex items-center gap-1.5 text-slate-400">
                <TrendingUp size={12} className="text-emerald-400" />
                Take Profit:{" "}
                <span className="font-mono text-white">
                  {strategy.takeProfitPips} pips
                </span>
              </span>
            )}
            {strategy.riskPerTrade && (
              <span className="flex items-center gap-1.5 text-slate-400">
                <Zap size={12} className="text-amber-400" />
                Risk per Trade:{" "}
                <span className="font-mono text-white">
                  {strategy.riskPerTrade}%
                </span>
              </span>
            )}
          </div>
        )}
      </section>

      {/* ===== Core Metrics Grid ===== */}
      <section className="mb-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <BarChart3 size={16} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              Performance Metrics
            </h2>
            <p className="text-xs text-slate-500">
              Key stats from your simulated backtest trades
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
          <MetricCard
            label="Net Result"
            value={`${isProfitable ? "+" : ""}${netR.toFixed(1)}R`}
            icon={DollarSign}
            color={isProfitable ? "emerald" : "rose"}
          />
          <MetricCard
            label="Total Trades"
            value={totalTrades}
            icon={BarChart3}
            color="blue"
          />
          <MetricCard
            label="Win Rate"
            value={`${winRate}%`}
            icon={Percent}
            color="emerald"
          />
          <MetricCard
            label="Profit Factor"
            value={profitFactor}
            icon={Award}
            color="cyan"
          />
          <MetricCard
            label="Expectancy"
            value={`${parseFloat(expectancy) >= 0 ? "+" : ""}${expectancy}R`}
            subtitle="per trade"
            icon={Activity}
            color="purple"
          />
          <MetricCard
            label="Max Drawdown"
            value={`-${maxDrawdownR.toFixed(1)}R`}
            icon={Snowflake}
            color="rose"
          />
          <MetricCard
            label="Avg Win"
            value={`+${avgWin}R`}
            icon={TrendingUp}
            color="emerald"
          />
          <MetricCard
            label="Avg Loss"
            value={`-${avgLoss}R`}
            icon={TrendingDown}
            color="rose"
          />
        </div>
      </section>

      {/* ===== Additional Stats (Win/Loss + Streak) ===== */}
      {totalTrades > 0 && (
        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Win / Loss
              </p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Target size={14} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-400">
                {wins}
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-2xl font-bold text-red-400">{losses}</span>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
              {wins > 0 && (
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                  style={{ width: `${(wins / totalTrades) * 100}%` }}
                />
              )}
              {losses > 0 && (
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-pink-500"
                  style={{ width: `${(losses / totalTrades) * 100}%` }}
                />
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Max Loss Streak
              </p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                <Flame size={14} />
              </div>
            </div>
            <p className="text-2xl font-bold text-orange-400">
              {maxLossStreak}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Consecutive losing trades
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total R Won / Lost
              </p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Calculator size={14} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-emerald-400 font-mono">
                +{totalWinR.toFixed(1)}
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-lg font-bold text-red-400 font-mono">
                -{totalLossR.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Cumulative R</p>
          </div>
        </section>
      )}

      {/* ===== Recorded Trades Table ===== */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
        <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-500/10 text-slate-300 border border-slate-700">
              <FlaskConical size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Simulated Backtest Trades
              </h3>
              <p className="text-xs text-slate-500">
                {totalTrades} trade{totalTrades !== 1 ? "s" : ""} recorded
              </p>
            </div>
          </div>
        </div>

        {trades.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/50 border border-slate-700">
              <Play size={28} className="text-slate-500" />
            </div>
            <h4 className="text-base font-semibold text-white mb-2">
              No Trades Recorded Yet
            </h4>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              Start simulating trades to build performance metrics for this
              strategy. Record your first backtest trade to see stats come
              alive.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition hover:scale-105"
            >
              <Plus size={16} />
              Log First Trade
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-semibold text-[10px]">#</th>
                  <th className="px-6 py-3 font-semibold text-[10px]">
                    Symbol
                  </th>
                  <th className="px-6 py-3 font-semibold text-[10px]">
                    Direction
                  </th>
                  <th className="px-6 py-3 font-semibold text-[10px]">
                    Entry
                  </th>
                  <th className="px-6 py-3 font-semibold text-[10px]">
                    SL / TP
                  </th>
                  <th className="px-6 py-3 font-semibold text-[10px]">
                    Result
                  </th>
                  <th className="px-6 py-3 font-semibold text-[10px]">
                    Emotion
                  </th>
                  <th className="px-6 py-3 font-semibold text-[10px]">
                    Rules
                  </th>
                  <th className="px-6 py-3 font-semibold text-[10px]">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {trades.map((t: any, idx: number) => (
                  <tr
                    key={t._id || idx}
                    className="hover:bg-slate-900/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono font-semibold text-slate-400">
                      #{t.tradeNumber || idx + 1}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {t.symbol || strategy.symbol}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.direction === "BUY"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {t.direction === "BUY" ? (
                          <TrendingUp size={10} />
                        ) : (
                          <TrendingDown size={10} />
                        )}
                        {t.direction}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-300">
                      {t.entryPrice}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-400">
                      {t.stopLoss} / {t.takeProfit}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-bold font-mono ${
                          t.resultR >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {t.resultR >= 0 ? "+" : ""}
                        {t.resultR}R
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                        <Brain size={11} className="text-purple-400" />
                        {t.emotion}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {t.rulesFollowed ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-[10px] font-semibold">
                          <CheckCircle2 size={11} />
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-400 text-[10px] font-semibold">
                          <AlertCircle size={11} />
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-400 max-w-xs truncate">
                      {t.notes || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ===== Modal: Record Backtest Trade ===== */}
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
                  <Plus size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Record Backtest Trade
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Add a simulated trade to your strategy
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleLogTrade} className="p-6 space-y-5">
              {/* Direction + Result */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Direction
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["BUY", "SELL"].map((dir) => (
                      <button
                        key={dir}
                        type="button"
                        onClick={() =>
                          setTradeForm({ ...tradeForm, direction: dir })
                        }
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition ${
                          tradeForm.direction === dir
                            ? dir === "BUY"
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                              : "border-red-500/40 bg-red-500/10 text-red-400"
                            : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {dir === "BUY" ? (
                          <TrendingUp size={12} />
                        ) : (
                          <TrendingDown size={12} />
                        )}
                        {dir}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Result (R)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={tradeForm.resultR}
                    onChange={(e) =>
                      setTradeForm({ ...tradeForm, resultR: e.target.value })
                    }
                    placeholder="e.g. 2, -1, 0.5"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Prices */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Entry
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={tradeForm.entryPrice}
                    onChange={(e) =>
                      setTradeForm({ ...tradeForm, entryPrice: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Stop Loss
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={tradeForm.stopLoss}
                    onChange={(e) =>
                      setTradeForm({ ...tradeForm, stopLoss: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full rounded-xl border border-red-500/30 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-red-500/50 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Take Profit
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={tradeForm.takeProfit}
                    onChange={(e) =>
                      setTradeForm({ ...tradeForm, takeProfit: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full rounded-xl border border-emerald-500/30 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Emotion + Rules */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Emotion
                  </label>
                  <select
                    value={tradeForm.emotion}
                    onChange={(e) =>
                      setTradeForm({ ...tradeForm, emotion: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none cursor-pointer"
                  >
                    {EMOTIONS.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Rules Followed
                  </label>
                  <select
                    value={tradeForm.rulesFollowed ? "yes" : "no"}
                    onChange={(e) =>
                      setTradeForm({
                        ...tradeForm,
                        rulesFollowed: e.target.value === "yes",
                      })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none cursor-pointer"
                  >
                    <option value="yes">✅ Yes</option>
                    <option value="no">❌ No</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                  Notes
                </label>
                <textarea
                  rows={3}
                  value={tradeForm.notes}
                  onChange={(e) =>
                    setTradeForm({ ...tradeForm, notes: e.target.value })
                  }
                  placeholder="Observation on setup execution..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500/50 focus:outline-none resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-900 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition hover:scale-105 active:scale-95"
                >
                  {saving ? (
                    <>
                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus size={13} />
                      Save Trade
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}