// app/analytics/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  BarChart3,
  LineChart as LineChartIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
  DollarSign,
  Percent,
  Award,
  AlertCircle,
  Activity,
  Zap,
  Shield,
  Flame,
  Snowflake,
  BookOpen,
  Target,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

interface AnalyticsData {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  netPnl: number;
  profitFactor: number;
  expectancy: string;
  avgWin: string;
  avgLoss: string;
  bestTrade: number;
  worstTrade: number;
  equityCurve: { date: string; pnl: number }[];
  setupPerformance: {
    setup: string;
    trades: number;
    winRate: string;
    pnl: number;
  }[];
  sessionPerformance: { session: string; pnl: number }[];
  psychologyPerformance: { emotion: string; pnl: number }[];
  riskAnalysis: {
    avgRisk: string;
    maxDd: string;
    lossStreak: number;
  };
  insights: string[];
}

// ===== Metric Card Component =====
function MetricCard({
  label,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
  delay = 0,
  trend,
  progress,
}: {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: any;
  color?: "blue" | "emerald" | "amber" | "purple" | "rose";
  delay?: number;
  trend?: "up" | "down";
  progress?: number;
}) {
  const colorMap = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "hover:border-blue-500/40",
      shadow: "hover:shadow-blue-500/10",
      gradient: "from-blue-500 to-cyan-500",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "hover:border-emerald-500/40",
      shadow: "hover:shadow-emerald-500/10",
      gradient: "from-emerald-500 to-cyan-500",
    },
    amber: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "hover:border-amber-500/40",
      shadow: "hover:shadow-amber-500/10",
      gradient: "from-amber-500 to-orange-500",
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "hover:border-purple-500/40",
      shadow: "hover:shadow-purple-500/10",
      gradient: "from-purple-500 to-pink-500",
    },
    rose: {
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      border: "hover:border-rose-500/40",
      shadow: "hover:shadow-rose-500/10",
      gradient: "from-rose-500 to-pink-500",
    },
  };

  const c = colorMap[color];

  return (
    <div
      className={`group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-all duration-500 ${c.border} hover:bg-slate-900 ${c.shadow} hover:scale-[1.02] animate-fade-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.bg} ${c.text} transition-transform group-hover:scale-110`}
        >
          <Icon size={16} />
        </div>
      </div>

      <p className="text-2xl font-bold text-white">{value}</p>

      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}

      {progress !== undefined && (
        <div className="mt-3 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${c.gradient} rounded-full transition-all duration-1000`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}

      {trend && (
        <div className="mt-2 flex items-center gap-1 text-xs">
          {trend === "up" ? (
            <>
              <TrendingUpIcon size={12} className="text-emerald-400" />
              <span className="text-emerald-400 font-medium">Trending Up</span>
            </>
          ) : (
            <>
              <TrendingDown size={12} className="text-red-400" />
              <span className="text-red-400 font-medium">Trending Down</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ===== Risk Stat Item =====
function RiskStat({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-950 p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900/50 hover:border-${color}-500/30`}
    >
      <p className="text-xs text-slate-400 flex items-center gap-1.5">
        <Icon size={12} className={`text-${color}-400`} />
        {label}
      </p>
      <p className={`mt-1.5 text-lg font-bold text-${color}-400`}>{value}</p>
    </div>
  );
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetchAnalytics();
    }
  }, [status]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics");
      if (!response.ok) throw new Error("Failed to fetch analytics");
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-400" />
        <p className="text-slate-400 text-sm animate-pulse">
          Loading analytics...
        </p>
      </div>
    );
  }

  const userName = session?.user?.name || "Trader";
  const firstName = userName.split(" ")[0];

  // Prepare chart data
  const equityData = {
    labels: analytics?.equityCurve.map((item) => item.date) || [],
    datasets: [
      {
        label: "Equity Curve",
        data: analytics?.equityCurve.map((item) => item.pnl) || [],
        borderColor: "#3b82f6",
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "rgba(59, 130, 246, 0.1)";
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.4)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#60a5fa",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const winLossData = {
    labels: ["Winning Trades", "Losing Trades"],
    datasets: [
      {
        data: [analytics?.winningTrades || 0, analytics?.losingTrades || 0],
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: ["#10b981", "#ef4444"],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: "easeInOutQuart" as const,
    },
    plugins: {
      legend: {
        labels: {
          color: "#94a3b8",
          font: { size: 11 },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        borderColor: "rgba(59, 130, 246, 0.3)",
        borderWidth: 1,
        titleColor: "#fff",
        bodyColor: "#3b82f6",
        cornerRadius: 10,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(51, 65, 85, 0.3)",
        },
        ticks: {
          color: "#64748b",
          font: { size: 10 },
        },
      },
      y: {
        grid: {
          color: "rgba(51, 65, 85, 0.3)",
        },
        ticks: {
          color: "#64748b",
          font: { size: 10 },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: "easeInOutQuart" as const,
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#94a3b8",
          font: { size: 11 },
          padding: 15,
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        borderColor: "rgba(59, 130, 246, 0.3)",
        borderWidth: 1,
        titleColor: "#fff",
        cornerRadius: 10,
        padding: 12,
      },
    },
  };

  return (
    <>
      {/* Page Header */}
      <section className="mb-8 animate-fade-up">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-4 w-4 text-blue-400" />
          <p className="text-sm font-medium text-blue-400">
            Performance Analytics
          </p>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Trading Analytics, {firstName}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Analyze your trading performance with real data from your journal.
        </p>
      </section>

      {/* Key Metrics */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total Trades"
          value={analytics?.totalTrades || 0}
          subtitle={`${analytics?.winningTrades || 0} wins · ${analytics?.losingTrades || 0} losses`}
          icon={BarChart3}
          color="blue"
          delay={100}
        />

        <MetricCard
          label="Win Rate"
          value={`${analytics?.winRate || 0}%`}
          icon={Percent}
          color="emerald"
          delay={200}
          progress={analytics?.winRate || 0}
        />

        <MetricCard
          label="Net P&L"
          value={`${(analytics?.netPnl || 0) >= 0 ? "+" : "-"}$${Math.abs(analytics?.netPnl || 0).toFixed(2)}`}
          subtitle={`Profit Factor: ${analytics?.profitFactor || 0}`}
          icon={DollarSign}
          color={(analytics?.netPnl || 0) >= 0 ? "emerald" : "rose"}
          delay={300}
        />

        <MetricCard
          label="Expectancy"
          value={`${parseFloat(analytics?.expectancy || "0") >= 0 ? "+" : ""}$${analytics?.expectancy || "0.00"}`}
          subtitle="per trade"
          icon={Award}
          color="purple"
          delay={400}
        />
      </section>

      {/* Main Charts - Equity Curve & Win/Loss */}
      <section className="mb-8 grid gap-6 lg:grid-cols-3">
        <div
          className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-500 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 lg:col-span-2 animate-fade-up"
          style={{ animationDelay: "500ms" }}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <TrendingUpIcon size={16} />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Equity Curve</h2>
                <p className="text-xs text-slate-500">
                  Cumulative performance over time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-semibold text-emerald-400">
                LIVE
              </span>
            </div>
          </div>
          <div className="h-72">
            {analytics?.equityCurve && analytics.equityCurve.length > 0 ? (
              <Line data={equityData} options={chartOptions} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-slate-500">
                <LineChartIcon size={32} className="mb-2 opacity-50" />
                <p className="text-sm">No trade data to display</p>
                <Link
                  href="/journal/new"
                  className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 underline"
                >
                  Record your first trade →
                </Link>
              </div>
            )}
          </div>
        </div>

        <div
          className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-500 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <BarChart3 size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Win/Loss</h2>
              <p className="text-xs text-slate-500">Distribution</p>
            </div>
          </div>
          <div className="h-72 flex items-center justify-center">
            {analytics?.totalTrades ? (
              <Doughnut data={winLossData} options={doughnutOptions} />
            ) : (
              <div className="flex flex-col items-center text-slate-500 text-sm">
                <Target size={32} className="mb-2 opacity-50" />
                <p>No trades yet</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Risk Analysis */}
      <section className="mb-8">
        <div
          className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-500 hover:border-blue-500/20 animate-fade-up"
          style={{ animationDelay: "700ms" }}
        >
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Shield size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Risk Analysis</h2>
              <p className="text-xs text-slate-500">
                Key metrics to monitor your risk exposure
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <RiskStat
              icon={Zap}
              label="Avg Risk Per Trade"
              value={analytics?.riskAnalysis.avgRisk || "1.0%"}
              color="yellow"
            />
            <RiskStat
              icon={TrendingDown}
              label="Max Drawdown"
              value={analytics?.riskAnalysis.maxDd || "$0.00"}
              color="red"
            />
            <RiskStat
              icon={Flame}
              label="Max Loss Streak"
              value={`${analytics?.riskAnalysis.lossStreak || 0} trades`}
              color="orange"
            />
            <RiskStat
              icon={Award}
              label="Best Trade"
              value={`$${(analytics?.bestTrade || 0).toFixed(2)}`}
              color="emerald"
            />
            <RiskStat
              icon={Snowflake}
              label="Worst Trade"
              value={`$${(analytics?.worstTrade || 0).toFixed(2)}`}
              color="rose"
            />
          </div>
        </div>
      </section>

      {/* Performance Insights */}
      <section
        className="rounded-2xl border border-slate-800 bg-gradient-to-br from-blue-950/20 via-slate-900/40 to-slate-950/40 p-6 animate-fade-up"
        style={{ animationDelay: "800ms" }}
      >
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <Lightbulb size={16} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              Performance Insights
            </h2>
            <p className="text-xs text-slate-500">
              Actionable observations from your trading data
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {analytics?.insights && analytics.insights.length > 0 ? (
            analytics.insights.map((insight, index) => (
              <div
                key={index}
                className="group flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition-all duration-300 hover:border-amber-500/30 hover:bg-slate-900/50 hover:scale-[1.01]"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <CheckCircle2 size={12} />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed flex-1">
                  {insight}
                </p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/30 p-8 text-center">
              <BookOpen size={28} className="mb-3 text-slate-600" />
              <p className="text-sm text-slate-400 mb-1">
                No insights available yet
              </p>
              <p className="text-xs text-slate-500 mb-4">
                Log at least 5 trades to unlock personalized performance
                insights
              </p>
              <Link
                href="/journal/new"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition"
              >
                Record a Trade
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}