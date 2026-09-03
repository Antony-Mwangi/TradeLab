// app/analytics/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Brain,
  CalendarDays,
  LineChart as LineChartIcon,
  LogOut,
  Menu,
  Target,
  TrendingUp,
  X,
  Sparkles,
  Settings,
  User,
  DollarSign,
  Percent,
  Award,
  AlertCircle,
} from "lucide-react";
import { signOut } from "next-auth/react";
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
  setupPerformance: { setup: string; trades: number; winRate: string; pnl: number }[];
  sessionPerformance: { session: string; pnl: number }[];
  psychologyPerformance: { emotion: string; pnl: number }[];
  riskAnalysis: {
    avgRisk: string;
    maxDd: string;
    lossStreak: number;
  };
  insights: string[];
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

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
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-400"></div>
          <p className="text-slate-400 text-sm">Loading analytics...</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  const userName = session.user?.name || "Trader";
  const firstName = userName.split(" ")[0];

  // Prepare chart data
  const equityData = {
    labels: analytics?.equityCurve.map((item) => item.date) || [],
    datasets: [
      {
        label: "Equity Curve",
        data: analytics?.equityCurve.map((item) => item.pnl) || [],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointBackgroundColor: "#10b981",
      },
    ],
  };

  const winLossData = {
    labels: ["Winning Trades", "Losing Trades"],
    datasets: [
      {
        data: [analytics?.winningTrades || 0, analytics?.losingTrades || 0],
        backgroundColor: ["rgba(16, 185, 129, 0.8)", "rgba(239, 68, 68, 0.8)"],
        borderColor: ["#10b981", "#ef4444"],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#94a3b8",
          font: { size: 11 },
        },
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
    plugins: {
      legend: {
        labels: {
          color: "#94a3b8",
          font: { size: 11 },
        },
      },
    },
  };

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
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
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
            className="flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400"
          >
            <LineChartIcon size={19} />
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
          <a
            href="/ai"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            <Sparkles size={19} />
            TradeLab AI Analyst
          </a>
        </nav>

        <div className="border-t border-slate-800 p-4">
          <a
            href="/profile"
            className="mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            <User size={19} />
            Profile
          </a>
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
          {/* Header */}
          <section className="mb-8">
            <p className="mb-2 text-sm font-medium text-emerald-400">
              Performance Analytics
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trading Analytics, {firstName}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Analyze your trading performance with real data from your journal.
            </p>
          </section>

          {/* Key Metrics */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Total Trades</p>
                <BarChart3 className="text-emerald-400" size={18} />
              </div>
              <p className="mt-2 text-2xl font-bold">{analytics?.totalTrades || 0}</p>
              <p className="text-xs text-slate-500">
                {analytics?.winningTrades || 0} wins · {analytics?.losingTrades || 0} losses
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Win Rate</p>
                <Percent className="text-blue-400" size={18} />
              </div>
              <p className="mt-2 text-2xl font-bold">{analytics?.winRate || 0}%</p>
              <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
                <div
                  className="h-1.5 rounded-full bg-blue-400"
                  style={{ width: `${Math.min(analytics?.winRate || 0, 100)}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Net P&L</p>
                <DollarSign className="text-emerald-400" size={18} />
              </div>
              <p
                className={`mt-2 text-2xl font-bold ${
                  (analytics?.netPnl || 0) >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                ${(analytics?.netPnl || 0).toFixed(2)}
              </p>
              <p className="text-xs text-slate-500">Profit Factor: {analytics?.profitFactor || 0}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Expectancy</p>
                <Award className="text-purple-400" size={18} />
              </div>
              <p
                className={`mt-2 text-2xl font-bold ${
                  parseFloat(analytics?.expectancy || "0") >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                ${analytics?.expectancy || "0.00"}
              </p>
              <p className="text-xs text-slate-500">per trade</p>
            </div>
          </section>

          {/* Main Charts - Equity Curve & Win/Loss */}
          <section className="mb-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 lg:col-span-2">
              <h2 className="mb-4 text-lg font-semibold">Equity Curve</h2>
              <div className="h-72">
                {analytics?.equityCurve && analytics.equityCurve.length > 0 ? (
                  <Line data={equityData} options={chartOptions} />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-500 text-sm">
                    No trade data to display
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-4 text-lg font-semibold">Win/Loss Distribution</h2>
              <div className="h-72">
                {analytics?.totalTrades ? (
                  <Doughnut data={winLossData} options={doughnutOptions} />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-500 text-sm">
                    No trade data to display
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Risk Analysis - Full Width */}
          <section className="mb-8">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-4 text-lg font-semibold">Risk Analysis</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs text-slate-400">Avg Risk Per Trade</p>
                  <p className="mt-1 text-lg font-semibold text-yellow-400">
                    {analytics?.riskAnalysis.avgRisk || "1.0%"}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs text-slate-400">Max Drawdown</p>
                  <p className="mt-1 text-lg font-semibold text-red-400">
                    {analytics?.riskAnalysis.maxDd || "$0.00"}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs text-slate-400">Loss Streak</p>
                  <p className="mt-1 text-lg font-semibold text-orange-400">
                    {analytics?.riskAnalysis.lossStreak || 0} trades
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs text-slate-400">Best Trade</p>
                  <p className="mt-1 text-lg font-semibold text-emerald-400">
                    ${(analytics?.bestTrade || 0).toFixed(2)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs text-slate-400">Worst Trade</p>
                  <p className="mt-1 text-lg font-semibold text-red-400">
                    ${(analytics?.worstTrade || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Insights */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="text-emerald-400" size={20} />
              <h2 className="text-lg font-semibold">Performance Insights</h2>
            </div>
            <div className="space-y-2">
              {analytics?.insights && analytics.insights.length > 0 ? (
                analytics.insights.map((insight, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300"
                  >
                    {insight}
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-500">
                  No insights available yet. Start logging more trades to get personalized insights.
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}