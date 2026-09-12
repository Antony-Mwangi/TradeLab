// app/psychology/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  Award,
  AlertCircle,
  Info,
  Lightbulb,
  Heart,
  Zap,
  Percent,
  Activity,
  CheckCircle2,
  XCircle,
  Flame,
  Sparkles,
} from "lucide-react";

export default function PsychologyPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-400" />
        <p className="text-slate-400 text-sm">Analyzing trading psychology data...</p>
      </div>
    );
  }

  // Get trend color
  const getTrendColor = (trend: string) => {
    if (trend?.toLowerCase().includes("improv")) return "text-emerald-400";
    if (trend?.toLowerCase().includes("declin")) return "text-red-400";
    return "text-amber-400";
  };

  return (
    <>
      {/* Page Header */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="h-4 w-4 text-purple-400" />
          <p className="text-sm font-medium text-purple-400">
            Mindset & Discipline
          </p>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Trading Psychology
        </h1>
        <p className="mt-1 text-sm text-slate-400 max-w-2xl">
          Understand how your mindset, emotions, and rule discipline affect your trading results.
        </p>
      </section>

      {/* Insufficient Data State */}
      {data?.insufficientData ? (
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <Brain size={28} className="text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Not Enough Data Yet
          </h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            Journal at least 10 trades with emotional tags and rule checklists to start identifying behavioral patterns.
          </p>

          {/* Progress Bar */}
          <div className="mx-auto max-w-md mb-6">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-400">Progress</span>
              <span className="text-white font-semibold">
                {data.totalTrades || 0} / 10
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(((data.totalTrades || 0) / 10) * 100, 100)}%` }}
              />
            </div>
          </div>

          <Link
            href="/journal"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition hover:scale-105"
          >
            <BookOpenIcon />
            Go to Journal
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* ===== Core Psychology Metrics ===== */}
          <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {/* Discipline Score */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-emerald-500/30 transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Discipline Score
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-110">
                  <Shield size={16} />
                </div>
              </div>
              <p className="text-3xl font-bold text-emerald-400">
                {data.metrics.disciplineScore}%
              </p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${data.metrics.disciplineScore}%` }}
                />
              </div>
            </div>

            {/* Emotional Stability */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-blue-500/30 transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Emotional Stability
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-transform group-hover:scale-110">
                  <Heart size={16} />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">
                {data.metrics.emotionalStability}%
              </p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${data.metrics.emotionalStability}%` }}
                />
              </div>
            </div>

            {/* Rule Adherence */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-purple-500/30 transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Rule Adherence
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 transition-transform group-hover:scale-110">
                  <Target size={16} />
                </div>
              </div>
              <p className="text-3xl font-bold text-emerald-400">
                {data.metrics.ruleAdherence}%
              </p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${data.metrics.ruleAdherence}%` }}
                />
              </div>
            </div>

            {/* Psychology Trend */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-amber-500/30 transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Psychology Trend
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 transition-transform group-hover:scale-110">
                  <Activity size={16} />
                </div>
              </div>
              <p className={`text-2xl font-bold ${getTrendColor(data.metrics.psychologyTrend)}`}>
                {data.metrics.psychologyTrend}
              </p>
              <p className="text-xs text-slate-500 mt-2">vs previous period</p>
            </div>
          </section>

          {/* ===== Emotional Performance & FOMO Comparison ===== */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Emotional Performance */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Performance by Emotional State
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Which emotions lead to your best and worst trades
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <Brain size={18} />
                </div>
              </div>

              <div className="space-y-3">
                {data.emotionalPerformance.map((item: any) => (
                  <div
                    key={item.emotion}
                    className="group flex items-center gap-3 text-sm hover:translate-x-1 transition-transform"
                  >
                    <span className="w-20 shrink-0 font-medium text-slate-300 text-xs">
                      {item.emotion}
                    </span>
                    <div className="flex-1 bg-slate-800/80 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          item.netR >= 0
                            ? "bg-gradient-to-r from-emerald-500 to-cyan-500"
                            : "bg-gradient-to-r from-red-500 to-pink-500"
                        }`}
                        style={{
                          width: `${Math.min(Math.abs(item.netR) * 5, 100)}%`,
                        }}
                      />
                    </div>
                    <span
                      className={`w-16 text-right font-mono font-semibold text-xs ${
                        item.netR >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {item.netR >= 0 ? `+${item.netR}R` : `${item.netR}R`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FOMO Comparison */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    FOMO vs Planned Trades
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    How impulsive entries compare to planned ones
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <Zap size={18} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Planned Trades */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      Planned
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-400">
                    +{data.fomoComparison.plannedExpectancy}R
                  </p>
                  <div className="mt-3 pt-3 border-t border-emerald-500/20 space-y-1">
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Percent size={10} />
                      Win Rate: <span className="text-emerald-400 font-semibold">{data.fomoComparison.plannedWinRate}%</span>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {data.fomoComparison.plannedTrades} trades
                    </p>
                  </div>
                </div>

                {/* FOMO Trades */}
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle size={14} className="text-red-400" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                      FOMO
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-red-400">
                    {data.fomoComparison.fomoExpectancy}R
                  </p>
                  <div className="mt-3 pt-3 border-t border-red-500/20 space-y-1">
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Percent size={10} />
                      Win Rate: <span className="text-red-400 font-semibold">{data.fomoComparison.fomoWinRate}%</span>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {data.fomoComparison.fomoTrades} trades
                    </p>
                  </div>
                </div>
              </div>

              {/* Insight Callout */}
              <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Lightbulb size={14} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-400 mb-1">
                    Key Insight
                  </p>
                  <p className="text-xs text-emerald-300/90 leading-relaxed">
                    Your best results occur when calm. FOMO trades produce negative expectancy in your journal. Focus on waiting for your setup rather than chasing price.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== Additional Insights Row ===== */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Best Emotion */}
            <div className="group rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/40 to-slate-950/40 p-5 hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-emerald-400" />
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Best Performing Emotion
                </p>
              </div>
              <p className="text-xl font-bold text-white">
                {data.emotionalPerformance?.length > 0
                  ? [...data.emotionalPerformance].sort(
                      (a, b) => b.netR - a.netR
                    )[0].emotion
                  : "—"}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Highest net R-multiple
              </p>
            </div>

            {/* Worst Emotion */}
            <div className="group rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/40 to-slate-950/40 p-5 hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={16} className="text-red-400" />
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Worst Performing Emotion
                </p>
              </div>
              <p className="text-xl font-bold text-white">
                {data.emotionalPerformance?.length > 0
                  ? [...data.emotionalPerformance].sort(
                      (a, b) => a.netR - b.netR
                    )[0].emotion
                  : "—"}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Lowest net R-multiple
              </p>
            </div>

            {/* Total Analyzed */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-2 mb-3">
                <Flame size={16} className="text-amber-400" />
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Trades Analyzed
                </p>
              </div>
              <p className="text-2xl font-bold text-white">
                {data.totalTrades || 0}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Total journal entries
              </p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

// Helper icon component
function BookOpenIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}