// src/app/trading-plan/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
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
  Edit,
  ArrowLeft,
} from "lucide-react";

export default function ViewTradingPlanPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && id) {
      fetch(`/api/trading-plan/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized or not found");
          return res.json();
        })
        .then((data) => {
          if (data.plan) setPlan(data.plan);
        })
        .catch((err) => {
          console.error("Failed to load plan", err);
          router.push("/trading-plan");
        })
        .finally(() => setLoading(false));
    }
  }, [status, id, router]);

  if (status === "loading" || loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading trading plan...</p>
      </main>
    );
  }

  const userName = session?.user?.name || "Trader";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <a href="/dashboard" className="text-xl font-bold tracking-tight">
            Trade<span className="text-emerald-400">Lab</span>
          </a>
          <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-slate-400 lg:hidden"><X size={20} /></button>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-6">
          <a href="/dashboard" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"><BarChart3 size={19} /> Dashboard</a>
          <a href="/journal" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"><BookOpen size={19} /> Trading Journal</a>
          <a href="/analytics" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"><LineChart size={19} /> Analytics</a>
          <a href="/backtesting" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"><TrendingUp size={19} /> Backtesting</a>
          <a href="/psychology" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"><Brain size={19} /> Trading Psychology</a>
          <a href="/trading-plan" className="flex items-center gap-3 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400"><Target size={19} /> Trading Plan</a>
          <a href="/calendar" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"><CalendarDays size={19} /> Trading Calendar</a>
        </nav>
        <div className="border-t border-slate-800 p-4">
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"><LogOut size={19} /> Sign out</button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-400 lg:hidden"><Menu size={22} /></button>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm font-medium">{userName}</span>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          {plan && (
            <div className="space-y-8 font-mono text-slate-300 bg-slate-900/30 border border-slate-800 p-8 rounded-2xl">
              <div>
                <p className="text-xs tracking-widest uppercase text-emerald-400 font-bold mb-1">Trading Plan Document</p>
                <h1 className="text-2xl font-bold text-white font-sans">{plan.planName}</h1>
                <p className="text-xs text-slate-500 mt-1 font-sans">
                  Created: {new Date(plan.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </div>

              {plan.markets?.length > 0 && (
                <div className="space-y-1">
                  <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold">Markets & Instruments</h3>
                  <p className="text-sm text-white">{plan.markets.join(" • ")}</p>
                  {plan.instruments?.length > 0 && <p className="text-xs text-slate-400">{plan.instruments.join(", ")}</p>}
                </div>
              )}

              {plan.preferredSessions?.length > 0 && (
                <div className="space-y-1">
                  <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold">Trading Session & Hours</h3>
                  <p className="text-sm text-white">{plan.preferredSessions.join(" & ")} Session ({plan.tradingHours?.start} – {plan.tradingHours?.end})</p>
                </div>
              )}

              {plan.strategies?.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold">Strategy</h3>
                  {plan.strategies.map((strat: any, idx: number) => (
                    <div key={idx} className="text-sm text-white">
                      <p className="font-semibold text-emerald-400">{strat.name}</p>
                      {strat.entryConditions?.length > 0 && <p className="text-xs text-slate-400">Entry: {strat.entryConditions.join(", ")}</p>}
                    </div>
                  ))}
                </div>
              )}

              {plan.entryRules?.length > 0 && (
                <div className="space-y-1">
                  <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold">Entry Rules</h3>
                  <ul className="list-decimal list-inside text-sm space-y-1 text-slate-200">
                    {plan.entryRules.map((rule: string, i: number) => (
                      <li key={i}>{rule}</li>
                    ))}
                  </ul>
                </div>
              )}

              {plan.riskManagement && (
                <div className="space-y-1">
                  <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold">Risk Management</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-300 pt-1">
                    <p>Risk per trade: <span className="text-white font-bold">{plan.riskManagement.maxRiskPerTrade}%</span></p>
                    <p>Maximum daily loss: <span className="text-white font-bold">{plan.riskManagement.maxDailyLoss}%</span></p>
                    <p>Max trades per day: <span className="text-white font-bold">{plan.riskManagement.maxTradesPerDay}</span></p>
                    <p>Min risk/reward: <span className="text-white font-bold">{plan.riskManagement.minRiskReward}</span></p>
                  </div>
                </div>
              )}

              {plan.psychologyRules?.beforeTrading?.length > 0 && (
                <div className="space-y-1">
                  <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold">Psychology Rules</h3>
                  <ul className="list-decimal list-inside text-sm space-y-1 text-slate-200">
                    {plan.psychologyRules.beforeTrading.map((rule: string, i: number) => (
                      <li key={i}>{rule}</li>
                    ))}
                  </ul>
                </div>
              )}

              {plan.noTradeConditions?.length > 0 && (
                <div className="space-y-1">
                  <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold">No-Trade Conditions</h3>
                  <ul className="list-decimal list-inside text-sm space-y-1 text-slate-200">
                    {plan.noTradeConditions.map((cond: string, i: number) => (
                      <li key={i}>{cond}</li>
                    ))}
                  </ul>
                </div>
              )}

              <hr className="border-slate-800 my-6" />

              <div className="flex items-center gap-4 pt-2 font-sans">
                <button
                  onClick={() => router.push("/trading-plan")}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  <Edit size={14} /> Edit Plan
                </button>
                <button
                  onClick={() => router.push("/trading-plan")}
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-900"
                >
                  <ArrowLeft size={14} /> Back to Trading Plans
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}